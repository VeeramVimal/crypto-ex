import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { Modal } from "react-bootstrap";

import "../assets/style.css";
import Select from 'react-select'
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import P2PHeader from "./separate/P2PHeader";
import { CgDanger } from 'react-icons/cg';
import { BsFillPauseFill } from "react-icons/bs";
import { useContextData } from "../core/context/index";
import { showEmail } from "../core/helper/date-format";
import { getCookie } from "../core/helper/cookie";
import { isEmpty, pageAllowCheck, toFixedWithoutRound } from "../core/helper/common";
import { HiOutlineRefresh } from "react-icons/hi";
import $ from "jquery";
import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import socketIOClient from "socket.io-client";
import Pagination from 'react-responsive-pagination';
import '../pagination.css';

// const colorStyles = {
//   option: (styles, { data }) => {
//     return {
//       ...styles,
//       backgroundColor: data.color
//     };
//   }
// };

const countries = Country.getAllCountries();

$(document).ready(function () {
  $(".jquery-red-tab-code").removeClass("red-tab-active");
  $(".jquery-green-tab-code").click(function () {
    $(".jquery-green-tab-code").addClass("green-tab-active");
    $(".jquery-red-tab-code").removeClass("red-tab-active");
  });
  $(".jquery-red-tab-code").click(function () {
    $(".jquery-red-tab-code").addClass("red-tab-active");
    $(".jquery-green-tab-code").removeClass("green-tab-active");
  });
});

export default function P2P(props) {
  const { myProfile } = useContextData();
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [socketConnection, setSocketConnection] = useState(null);
  const [orderType, setorderType] = useState("buy");
  const [pairType, setpairType] = useState("");
  const [p2pOrdersList, setp2pOrdersList] = useState([]);
  const [selectOrderDetails, setselectOrderDetails] = useState([]);
  const [buyerPaymentList, setbuyerPaymentList] = useState([]);
  const [sellerPaymentList, setsellerPaymentList] = useState([]);
  const [allpaymentsList, setallpaymentsList] = useState([]);
  const [errors, seterrors] = useState({});
  const [orderData, serOrderData] = useState({ price: "", total: "" });
  const [payTypes, setpayTypes] = useState("All payments");
  const [countryName, setcountryName] = useState("All Regions");
  const [fiatCurrency, setfiatCurrency] = useState("");
  const [userWallet, setuserWallet] = useState(0);
  const [searchprice, setsearchprice] = useState("");
  const [currentPrice, setcurrentPrice] = useState(0);
  const [expanded, setexpanded] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [fromCurrencyList, setfromCurrencyList] = useState([]);
  const [toCurrencyList, settoCurrencyList] = useState([]);
  const [currentTab, setCurrentTab] = useState("");
  const [cryptoCurrency, setcryptoCurrency] = useState("");
  const [buyerpaymentId, setbuyerpaymentId] = useState("");
  const [refresh, setRefresh] = useState("refresh");
  const [loaderStatus, setloaderStatus] = useState(false);
  const [refreshloader, setrefreshloader] = useState(0);
  const [faqList, setfaqList] = useState([]);
  const [cmsList, setcmsList] = useState([]);
  const [intervalFunc, setIntervalFunc] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalorders, settotalorders] = useState(0);
  const [particularCurrencyList, setparticularCurrencyList] = useState({});
  const [pendingOrderOpen, setpendingOrderOpen] = useState(false);

  useEffect(() => {
    $(".status_change .dropdown-item").click(function () {
      var getStatusText = $(this).text();
      $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
      var generateStatusClass = `${$(this).attr('data-class')}-status`
      $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
    })
  }, []);

  useEffect(() => {
    let socket = socketIOClient(Config.SOCKET_URL, {
      transports: ["websocket"],
    });
    let socketUnsubscribe;
    if (socket) {
      socket.on("connect", function () {
        setSocketConnection(socket);
        socketUnsubscribe = socket;
      });
      socket.on("connect_error", (err) => {
        console.log("socket connect_error", err);
      });
      socket.on("disconnect", function () {
        console.log("socket disconnected");
      });
    }
    return () => {
      if (socketUnsubscribe) {
        socketUnsubscribe.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    getFaq();
  }, []);
  useEffect(() => {
    if (myProfile && myProfile._id) {
      const pageAllowCheckResp = pageAllowCheck(myProfile, "P2PList");
      if (pageAllowCheckResp.type == "error") {
        toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
        navigate(pageAllowCheckResp.navigate);
      }
    }
    const LoggedIn = getCookie("userToken");
    setisLoggedIn(LoggedIn);
    getallp2pPairs();
    getallPaymentsDet();
    getp2pOrders(orderType, pairType, countryName, payTypes, searchprice);
    getCMS();
  }, [myProfile]);
  async function getFaq() {
    try {
      const params = {
        url: `${Config.V1_API_URL}faq/getfaq`,
        method: "POST",
        body: { type: "p2p" },
      };
      const { status, data } = await makeRequest(params);
      if (status && data) {
        setfaqList(data);
      }
    } catch (err) { }
  }
  async function selectOrder(type) {
    let pair = currentTab + "_" + fiatCurrency;
    setpairType(pair);
    setorderType(type);
    setCurrentTab(currentTab);
    getp2pOrders(type, pair, countryName, payTypes, searchprice);
    setloaderStatus(false);
  }
  async function getCMS() {
    try {
      const params = {
        url: `${Config.V2_API_URL}cms/getCMS`,
        method: "POST",
        body: { from: "p2p-home" },
      };
      const response = await makeRequest(params);
      if (response.status) {
        setcmsList(response.getcmsDetails);
      }
    } catch (err) { }
  }
  async function getallp2pPairs() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getallPairs`,
        method: "GET",
      };
      const { status, data } = await makeRequest(params);
      if (status && data) {
        let fromCurrency = [];
        let toCurrency = [];
        let defaultfromCurrency = "";
        let defaulttoCurrency = "";
        let defaultCurrenctTab = "";
        if (data.length > 0) {
          data.map((item) => {
            if (item.pairs.length > 0) {
              item.pairs.map((data) => {
                fromCurrency.push(data.fromCurrency);
                toCurrency.push(data.toCurrency);
                if (fromCurrency.length > 0) {
                  fromCurrency.map((currency, i) => {
                    if (i == 0 && currency) {
                      defaultCurrenctTab = currency.currencySymbol;
                      defaultfromCurrency = currency.currencySymbol;
                    }
                  });
                }
                if (toCurrency.length > 0) {
                  toCurrency.map((currency, i) => {
                    if (i == 0 && currency) {
                      defaulttoCurrency = currency.currencySymbol;
                    }
                  });
                }
                fromCurrency = fromCurrency.filter((arr, index, self) => index === self.findIndex((t) => (t.currencySymbol === arr.currencySymbol)))
                toCurrency = toCurrency.filter((arr, index, self) => index === self.findIndex((t) => (t.currencySymbol === arr.currencySymbol)))
              });
            }
          });
        }
        setCurrentTab(defaultCurrenctTab);
        setfiatCurrency(defaulttoCurrency);
        setfromCurrencyList(fromCurrency);
        settoCurrencyList(toCurrency);
        setpairType(defaultfromCurrency + "_" + defaulttoCurrency);
        getCurrentPairPrice(defaultfromCurrency + "_" + defaulttoCurrency);
        getparticularCurrency(defaultfromCurrency)
        getp2pOrders(orderType, defaultfromCurrency + "_" + defaulttoCurrency, countryName, payTypes, searchprice)
      }
    } catch (err) {
      console.log("err : ", err);
    }
  }
  async function getCurrentPairPrice(selectedPair) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getCurrentpair`,
        method: "POST",
        body: { pair: selectedPair },
      };
      const response = await makeRequest(params);
      if (response.status) {
        setcurrentPrice(response.data.lastPrice);
      }
    } catch (err) { }
  }
  async function getp2pOrders(
    orderType,
    pairType,
    countryName,
    payTypes,
    searchprice
  ) {
    try {
      const data = {
        orderType: orderType,
        pair: pairType,
        countryName: countryName,
        payTypes: payTypes,
        searchprice: searchprice,
      };
      const params = {
        url: `${Config.V1_API_URL}p2p/getallOrders`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setloaderStatus(true);
        setp2pOrdersList(response.data);
        settotalorders(response.total);
      } else {
        setloaderStatus(false);
        settotalorders(0);
      }
    } catch (err) { }
  }
  function decimalValue(value, decimal) {
    if (value != undefined) {
      value = value.toString();
      if (value.indexOf(".") >= 0) {
        let arrVal = value.split(".")[1].split("");
        value = value.split(".")[0] + ".";
        for (let inc = 0; inc < arrVal.length; inc++) {
          if (inc < decimal) {
            value = value + arrVal[inc];
          }
        }
      }
      return value;
    }
  }
  const handleinputChange = (event) => {
    const value = event.target.value;
    switch (true) {
      case event.target.name == "searchprice":
        if (isNaN(value) == true) {
          setsearchprice("");
          const errorType = "error";
          toast({ type: errorType, message: "Please enter valid amount!" });
          return false;
        }
        setsearchprice(value);
        break;
      default:
        break;
    }
  };
  async function search() {
    try {
      getp2pOrders(orderType, pairType, countryName, payTypes, searchprice);
    } catch (err) { }
  }
  const handlecurrencyChange = (event) => {
    let currency = event.target.value;
    setfiatCurrency(currency);
    let pair_currency = cryptoCurrency + "_" + currency;
    setpairType(pair_currency);
    getp2pOrders(orderType, pair_currency, countryName, payTypes, searchprice);
  };
  const handlepaymentChange = (event) => {
    let value = event.target.value;
    setpayTypes(value);
    setTimeout(() => {
      getp2pOrders(orderType, pairType, countryName, value, searchprice);
    }, 100);
  };
  const handlecountryChange = (event) => {
    let countryName = event.target.value;
    setcountryName(countryName);
    setTimeout(() => {
      getp2pOrders(orderType, pairType, countryName, payTypes, searchprice);
    }, 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function getallPaymentsDet() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getallPayments`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status) {
        setallpaymentsList(response?.data);
      }
    } catch (err) { }
  }
  async function orderClick(data) {
    if (isLoggedIn) {
      setselectOrderDetails(data);
      if (expanded == false) {
        setexpanded(true);
        setrefreshloader(false)
        setRefresh("pause")
      } else {
        setexpanded(false);
      }
      serOrderData({ price: "", total: "" });
      getBalance(data);
      getSelectedPayment(data);
    } else {
      navigate("/login")
    }
  }
  const calculateValues = (placeValue, placeType) => {
    let price =
      selectOrderDetails.priceType == "Fixed"
        ? selectOrderDetails.price
        : currentPrice;
    let orderValue = JSON.parse(JSON.stringify(orderData));
    let result = 0;
    if (placeType == "price") {
      placeValue = toFixedWithoutRound({ val: placeValue, decimal: selectOrderDetails.fromCurrencyDecimal });
      orderValue.price = placeValue;
      result = (orderValue.price / price);
      orderValue.total = decimalValue(result, selectOrderDetails.fromCurrencyDecimal);
    } else {
      placeValue = toFixedWithoutRound({ val: placeValue, decimal: selectOrderDetails.toCurrencyDecimal });
      orderValue.total = placeValue;
      result = (orderValue.total * price);
      orderValue.price = decimalValue(result, selectOrderDetails.toCurrencyDecimal);
    }
    if (isNaN(orderValue.price)) {
      orderValue.price = "";
      orderValue.total = "";
    } else {
      seterrors({});
    }
    if (
      orderValue.price < selectOrderDetails.minAmt ||
      orderValue.price > selectOrderDetails.maxAmt
    ) {
      seterrors({});
    }
    serOrderData(orderValue);
  };
  async function getBalance(data) {
    try {
      const value = { currencyId: data.fromCurrencyId };
      const params1 = {
        url: `${Config.V1_API_URL}p2p/getBalance`,
        method: "POST",
        body: value,
      };
      const result = await makeRequest(params1);
      if (result.status) {
        setuserWallet(result?.data?.p2pAmount);
      } else {
        setuserWallet(0);
      }
    } catch (err) { }
  }
  const handlebuyerpaymentChange = (event) => {
    let value = event.target.value;
    setbuyerpaymentId(value);
  };
  async function getSelectedPayment(data) {
    try {
      const reqData = {
        url: `${Config.V1_API_URL}p2p/getbuyerPaymentMethods`,
        method: "GET",
      };
      const response = await makeRequest(reqData);
      if (response.status) {
        setbuyerPaymentList(response.data);
        let paymentMethodArray = [];
        if (
          data.paymentmethodIdDetail &&
          data.paymentmethodIdDetail.length > 0 &&
          response.data.length > 0
        ) {
          data.paymentmethodIdDetail.map((methodData) => {
            response.data.map((buyerData) => {
              if (buyerData.paymentmethodId === methodData._id) {
                const accountNo =
                  buyerData.paymenttype == "UPI"
                    ? buyerData.upiId
                    : buyerData.accountNo;
                paymentMethodArray.push({
                  _id: buyerData._id,
                  name: buyerData.paymenttype,
                  accountNo: accountNo,
                });
              }
            });
            setsellerPaymentList(paymentMethodArray)
          });
        } else {
          setsellerPaymentList([]);
        }
      }
    } catch (err) { }
  };
  let errorType = "error";
  async function handleSubmit() {
    try {
      let orderValue = JSON.parse(JSON.stringify(orderData));
      let errMsg = "";
      if(selectOrderDetails) {
        if (selectOrderDetails.userId == (myProfile && myProfile?._id)) {
          errMsg = "You Can't Select Your Own Order";
          toast({ type: errorType, message: errMsg });
          return false;
        }
        if (selectOrderDetails.orderType == "sell") {
          if (buyerPaymentList.length === 0) {
            toast({ type: "error", message: "Please add payment details."});
            navigate("/p2p-user-center");
            return false;
          }
          if (selectOrderDetails.usdtPrice < Number(orderValue.total)) {
            errMsg =
              "Available balance is " +
              selectOrderDetails.usdtPrice +
              " " +
              selectOrderDetails.fromCurrency;
          }
          if (Number(orderValue.price) < selectOrderDetails.minAmt) {
            errMsg =
              "The minimum order amount is " +
              selectOrderDetails.minAmt +
              " " +
              selectOrderDetails.toCurrency;
          }
          if (Number(orderValue.price) > selectOrderDetails.maxAmt) {
            errMsg =
              "The max order amount is " +
              selectOrderDetails.maxAmt +
              " " +
              selectOrderDetails.toCurrency;
          }
        } else {
          if (userWallet == 0) {
            errMsg = "Insufficient balance, please transfer first.";
          }
          if (userWallet < Number(orderValue.total)) {
            errMsg = "Insufficient balance, please transfer first.";
          }
          if (selectOrderDetails.usdtPrice < Number(orderValue.total)) {
            errMsg =
              "Available balance is " +
              selectOrderDetails.usdtPrice +
              " " +
              selectOrderDetails.fromCurrency;
          }
          if (Number(orderValue.price) < selectOrderDetails.minAmt) {
            errMsg =
              "The minimum order amount is " +
              selectOrderDetails.minAmt +
              " " +
              selectOrderDetails.toCurrency;
          }
          if (Number(orderValue.price) > selectOrderDetails.maxAmt) {
            errMsg =
              "The max order amount is " +
              selectOrderDetails.maxAmt +
              " " +
              selectOrderDetails.toCurrency;
          }
          if (
            buyerpaymentId == "" &&
            selectOrderDetails?.userId != myProfile?._id
          ) {
            errMsg = "Please select the payment method";
          }
        }
      }
      else {
        errMsg = "Please select the payment method";
      }
      if (errMsg) {
        toast({ type: errorType, message: errMsg });
        return false;
      }
      setisLoading(true);
      const data = {
        price: orderValue.price,
        totalPrice: orderValue.total,
        userId: myProfile?._id,
        orderId: selectOrderDetails?._id,
        ownerId: selectOrderDetails?.userId,
        pairId: selectOrderDetails?.pairId,
        paymentId:
          orderType == "sell" ? buyerpaymentId : selectOrderDetails?.paymentId,
        orderLimit: selectOrderDetails?.timeLimit,
        orderType: orderType,
      };
      const params = {
        url: `${Config.V1_API_URL}p2p/submitOrder`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status) {
        setisLoading(false);
        errorType = "success";
        toast({ type: errorType, message: response.message });
        socketConnection.emit("createp2pOrder", response?.data);
        navigate("/order-details/" + response?.data?.orderNo);
      } else {
        setisLoading(false);
        if (response.type == 1) {
          toast({ type: errorType, message: response.message });
          navigate("/my/sms-authenticator");
          return false;
        } else if (response.type == 2) {
          toast({ type: errorType, message: response.message });
          navigate("/google-authenticator");
          return false;
        } else if (response.type == 3) {
          toast({ type: errorType, message: response.message });
          navigate("/my/identification");
          return false;
        } else if (response.type == 4) {
          setpendingOrderOpen(true);
          return false;
        }
        else {
          toast({ type: errorType, message: response.message });
          return false;
        }
      }
    } catch (err) {
      console.log("err_err:", err);
    }
  }
  async function selectTab(tab) {
    try {
      setCurrentTab(tab);
      setcryptoCurrency(tab);
      let pair_currency = tab + "_" + fiatCurrency;
      setfiatCurrency(fiatCurrency);
      getparticularCurrency(tab);
      getp2pOrders(
        orderType,
        pair_currency,
        countryName,
        payTypes,
        searchprice
      );
      let defaultfromCurrency = "";
      let defaulttoCurrency = "";
      fromCurrencyList.length > 0 &&
        fromCurrencyList.map((currency, i) => {
          defaultfromCurrency = currency.currencySymbol;
        });
      toCurrencyList.length > 0 &&
        toCurrencyList.map((currency, i) => {
          defaulttoCurrency = currency.currencySymbol;
        });
      setfromCurrencyList(fromCurrencyList);
      settoCurrencyList(toCurrencyList);
      setpairType(defaultfromCurrency + "_" + defaulttoCurrency);
    } catch (err) {
      console.log("err:", err);
    }
  }
  const handleRefresh = (event) => {
    let value = event.value;
    setRefresh(value);
    if (
      value !== "not_now" &&
      value !== "refresh" &&
      value !== "pause" &&
      expanded === false
    ) {
      clearInterval(intervalFunc);
      setexpanded(false);
      const intervalFuncNew = setInterval(async () => {
        setrefreshloader(true);
        const data = {
          orderType: orderType,
          pair: pairType,
          countryName: countryName,
          payTypes: payTypes,
          searchprice: searchprice,
        };
        const params = {
          url: `${Config.V1_API_URL}p2p/getallOrders`,
          method: "POST",
          body: data,
        };
        const response = await makeRequest(params);
        setrefreshloader(false);
        if (response.status && response.data) {
          setp2pOrdersList(response.data);
        } else {
          setp2pOrdersList([]);
        }
      }, 1000 * Number(value));
      setIntervalFunc(intervalFuncNew);
    } else {
      clearInterval(intervalFunc);
      setRefresh(value);
      setrefreshloader(false);
    }
  };

  const refreshOption = [
    {
      value: 'not_now',
      label:
        <div className="select-color-change">
          <span>Not now</span>
        </div>
    },
    {
      value: 5,
      label:
        <div className="select-color-change">
          <span>5s to refresh</span>
        </div>
    },
    {
      value: 10,
      label:
        <div className="select-color-change">
          <span>10s to refresh</span>
        </div>
    },
    {
      value: 15,
      label:
        <div className="select-color-change">
          <span>15s to refresh</span>
        </div>
    },
    {
      value: 20,
      label:
        <div className="select-color-change">
          <span>20s to refresh</span>
        </div>
    },

  ];
  const refreshPause = [
    {
      value: 'pause',
      label:
        <div className="select-color-change">
          <span>Pause</span>
        </div>
    },
  ]
  const noOfPages = Math.ceil(totalorders / recordsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= noOfPages; i++) {
    pageNumbers.push(i);
  }
  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  }
  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
      setCurrentPage(newCurrentPage);
      getPagination(orderType, pairType, countryName, payTypes, searchprice, newCurrentPage)
    }
  }
  async function getPagination(
    orderType,
    pairType,
    countryName,
    payTypes,
    searchprice,
    page
  ) {
    try {
      setloaderStatus(false);
      const data = {
        orderType: orderType,
        pair: pairType,
        countryName: countryName,
        payTypes: payTypes,
        searchprice: searchprice,
        limit: recordsPerPage,
        offset: recordsPerPage * (page - 1)
      };
      const params = {
        url: `${Config.V1_API_URL}p2p/getallOrders`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setloaderStatus(true);
        setp2pOrdersList(response.data);
        settotalorders(response.total);
      } else {
        setloaderStatus(false);
        settotalorders(0);
      }
    } catch (err) { }
  }
  async function getparticularCurrency(currency) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getParticularCurrency`,
        method: "POST",
        body: { currencySymbol: currency }
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setparticularCurrencyList(response.data);
      }
    } catch (err) { }
  }
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />

      <div className="p2p-trade-top-section">
        <section className="p2p-trade-hero-section-two-nav-bg">
          <div className="hero-top-section container-fluid py-4 text-white">
            <div className="row">
              <h1 className="hero-top-section-text-1 text-center">
                Buy and Sell {(particularCurrencyList && particularCurrencyList.currencyName)} {currentTab ? "(" + currentTab + ")" : ""} with Your Preferred Payment Methods
              </h1>
              <p className="hero-top-section-text-2">
                Buy and sell {(particularCurrencyList && particularCurrencyList.currencyName)} safely and easily on {Config.SITENAME} P2P. Find
                the best offer below and buy and sell {currentTab} with Your Preferred
                Payment Methods today.
              </p>
            </div>
          </div>
          {/* ====================================P2P-SECOND-NAV-START================================== */}
          {isLoggedIn && <P2PHeader />}
          {/* =====================================P2P-SECOND-NAV-END=================================== */}
        </section>
        <section className="p2p-top-section">
          <div className="container pt-2 text-white">
            <div className="row g-4 col-lg-12  mx-auto">
              <div className="col-lg-2 col-6">
                <nav className="nav-tabs-buy-sell-section">
                  <div
                    className="nav nav-tabs nav-tabs-buy-sell nav-justified"
                    id="nav-tab"
                    role="tablist"
                  >
                    <button
                      className={
                        orderType == "buy"
                          ? "nav-link active jquery-green-tab-code green-tab-active"
                          : "nav-link jquery-red-tab-code"
                      }
                      id="nav-buy-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-buy"
                      type="button"
                      role="tab"
                      aria-controls="nav-buy"
                      aria-selected="true"
                      onClick={() => selectOrder("buy")}
                    >
                      Buy
                    </button>
                    <button
                      className={
                        orderType == "sell"
                          ? "nav-link active jquery-red-tab-code red-tab-active"
                          : "nav-link jquery-red-tab-code"
                      }
                      id="nav-sell-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-sell"
                      type="button"
                      role="tab"
                      aria-controls="nav-sell"
                      aria-selected="false"
                      onClick={() => selectOrder("sell")}
                    >
                      Sell
                    </button>
                  </div>
                </nav>
              </div>
              <div className="col-lg-10 col-12">
                <div className="nav-pills-buy-sell">
                  <ul className="nav nav-pills  mb-3" id="pills-tab" role="tablist">
                    {fromCurrencyList &&
                      fromCurrencyList.length > 0 &&
                      fromCurrencyList.map((row, i) => {
                        return (
                          <li className="nav-item" role="presentation" key={i}>
                            <button
                              className={
                                row.currencySymbol == currentTab
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              id="pills-usdt-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-usdt"
                              type="button"
                              role="tab"
                              aria-controls="pills-usdt"
                              aria-selected="true"
                              onClick={() => selectTab(row.currencySymbol)}
                            >
                              {row?.currencySymbol}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="p2p-second-section py-3">
          <div className="container">
            <div className="row col-lg-12 mx-auto ms-lg-3">
              <div className="col-lg-3 col-11">
                <span className="enter-amount-text-2">Amount</span>
                <div className="row enter-amount-section">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="searchprice"
                      value={searchprice}
                      onChange={handleinputChange}
                      autoComplete="off"
                      placeholder="Enter Amount"
                    />
                  </div>
                  <div className="col">
                    <div className="row align-items-center">
                      <div className="col enter-amount-text-section text-end">
                        <span className="enter-amount-text-1">{fiatCurrency}</span>
                      </div>
                      <div className="col">
                        <button
                          type="submit"
                          onClick={() => search()}
                          className="btn"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-6">
                <span className="enter-amount-heading">Fiat</span>
                <div className="f-group">
                  <select
                    className="f-control f-dropdown"
                    placeholder="Select"
                    onChange={handlecurrencyChange}
                  >
                    {toCurrencyList.length > 0 ? (
                      toCurrencyList.map((data, i) => {
                        return (
                          <option
                            className="bg-selection"
                            value={data.currencySymbol}
                            selected={
                              data.currencySymbol == fiatCurrency ? true : false
                            }
                            data-image={data.image}
                          >
                            {data.currencySymbol}
                          </option>
                        );
                      })
                    ) : (
                      <option
                        value="No records"
                        selected="selected"
                        className="bg-selection"
                      >
                        No records
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-6">
                <span className="enter-amount-heading">Payments</span>
                <div className="f-group">
                  <select
                    className="f-control f-dropdown"
                    placeholder="Select"
                    onChange={handlepaymentChange}
                    value={payTypes}
                  >
                    <option
                      value="All payments"
                      selected="selected"
                      className="bg-selection"
                    >
                      All Payments
                    </option>
                    {allpaymentsList && allpaymentsList?.length > 0 ? (
                      allpaymentsList?.map((data, i) => {
                        return (
                          <option
                            className="bg-selection"
                            value={data?.name}
                            // selected={data?.name == payTypes ? true :false }
                            data-image="https://source.unsplash.com/50x50/?mazda"
                          >
                            {data?.name}
                          </option>
                        );
                      })
                    ) : (
                      <option
                        value="No records"
                        selected="selected"
                        className="bg-selection"
                      >
                        No records
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-6">
                <span className="enter-amount-heading">Available Region(s)</span>
                <div className="f-group">
                  <select
                    className="f-control f-dropdown"
                    placeholder="Select"
                    onChange={handlecountryChange}
                  >
                    <option
                      value="All Regions"
                      selected="selected"
                      className="bg-selection"
                    >
                      All Regions
                    </option>
                    {countries && countries?.length > 0 ? (
                      countries?.map((country) => {
                        return (
                          <option
                            className="bg-selection"
                            value={country?.name}
                            data-image="https://source.unsplash.com/50x50/?mazda"
                          >
                            {country?.name}
                          </option>
                        );
                      })
                    ) : (
                      <option
                        value="No records"
                        selected="selected"
                        className="bg-selection"
                      >
                        No records
                      </option>
                    )}
                  </select>
                </div>
              </div>
              {/* <div className="col-lg-1 col-6"> */}
              {/* <span className="enter-amount-heading">
                      Filter
                  </span>
                  <div className="f-group">
                      <select className="f-control f-dropdown" placeholder="Select">
                          <option value=""> </option>
                          <option value="1" selected="selected" data-image="https://source.unsplash.com/50x50/?mazda">AED</option>

                      </select>
                </div> */}
              {/* </div> */}
              <div className="col-lg-2 col-md-6 col-sm-12 ">
                <div className="d-flex mt-3">
                  {expanded == false &&
                    <div>
                      {refreshloader === true ?
                        <img src={'https://gifimage.net/wp-content/uploads/2018/04/refresh-gif-8.gif'} className="img-fluid-resize" />
                        :
                        <h4 className="me-2"><HiOutlineRefresh /></h4>
                      }
                    </div>
                  }
                  {expanded == true &&
                    <div>
                      <h4 className="me-2"><BsFillPauseFill /></h4>
                    </div>
                  }
                  <div>
                    <Select
                      className=" bg-transparent-css"
                      onChange={handleRefresh}
                      options={expanded == true ? refreshPause : refreshOption}
                      defaultValue={expanded == true ? { label: "Pause", value: 'pause' } : { label: "Refresh", value: 'refresh' }}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'grey' : 'grey',
                          backgroundColor: state.isSelected ? "transparent" : "transparent",
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container pt-3">
          <div className="row col-lg-12 mx-auto">
            <div className="tab-content" id="nav-tabContent">
              {/* ===========================================P2P-TRADE-TABLE-BUY-START========================================= */}
              <div
                className="tab-pane fade show active table-height table-head-sticky"
                id={"nav-" + (orderType == "buy" ? "buy" : "sell")}
                role="tabpanel"
                aria-labelledby={
                  "nav-" + (orderType == "buy" ? "buy" : "sell") + "-tab"
                }
              >
                <table className="p2p-trade-table ">
                  <thead className="p2p-trade-table-thead ">
                    <tr className="p2p-trade-table-tr">
                      <th className="p2p-trade-table-th ">
                        <label className="ps-2 ">Advertisers</label>
                      </th>
                      <th className="p2p-trade-table-th">
                        <label>
                          Price
                          <span className="table-lth-bg">
                            {orderType == "buy"
                              ? "lowest to highest"
                              : "highest to lowest"}
                          </span>
                        </label>
                      </th>
                      <th className="p2p-trade-table-th">
                        <label>Limit/Available</label>
                      </th>
                      <th className="p2p-trade-table-th">
                        <label>Payment</label>
                      </th>
                      <th className="p2p-trade-table-th">
                        <label>
                          Trade
                          {/* <span className="table-trade-bg">0 Fee</span> */}
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="p2p-trade-table-tbody">
                    {loaderStatus == false && (
                      <div className="d-flex flex-row">
                        <div className="bars-loading-loader mx-auto">
                          <Bars

                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperclassName=""
                            visible={true}
                          />
                        </div>
                      </div>
                      // <tr className="p2p-trade-table-tr dsfdsfdsf">
                      //   <td></td>
                      //   <td></td>
                      //   <td className="">
                      //     <Bars
                      //     className=""
                      //       height="80"
                      //       width="80"
                      //       color="#4fa94d"
                      //       ariaLabel="bars-loading"
                      //       wrapperStyle={{}}
                      //       wrapperclassName=""
                      //       visible={true}
                      //     />
                      //   </td>
                      //   <td></td>
                      //   <td></td>
                      // </tr>
                    )}
                    {selectOrderDetails && loaderStatus == true &&
                      p2pOrdersList &&
                      p2pOrdersList.length > 0 &&
                      p2pOrdersList.map((row, index) => {
                        return (
                          <>
                            <tr className="p2p-trade-table-tr" key={index}>
                              <td
                                data-label="Advertisers"
                                className="p2p-trade-table-td"
                              >
                                <div className="d-flex">
                                  <div className="trade-circle-flex d-flex">
                                    <div>
                                      <span className="circles d-block">
                                        {row?.username != ""
                                          ? row?.username?.trim()?.charAt(0)
                                          : row?.email?.trim()?.charAt(0)}
                                      </span>
                                    </div>
                                    {/* </div>
                                  <div className="dfgdfgf"> */}
                                    <div>
                                      <span
                                        className="table-data-1 d-block ms-2 mt-2 curPointer"
                                        onClick={() => navigate("/p2p-advertiser-user-center/" + row?.userId)}
                                      >
                                        <div>
                                          {row?.username != ""
                                            ? row?.username
                                            : showEmail(row?.email)}
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {/* <span className="table-data-2">15 orders | 100.00% completion</span> */}
                              </td>
                              <td
                                data-label="Price"
                                className="p2p-trade-table-td"
                              >
                                <span className="table-data-3">
                                  {row?.price?.toFixed(row?.toCurrencysiteDecimal)}
                                </span>
                                <span className="table-data-4">
                                  {" "}
                                  {row?.toCurrency}
                                </span>
                              </td>
                              <td
                                data-label="Limit/Available"
                                className="p2p-trade-table-td"
                              >
                                <span className="table-data-5">
                                  <span className="table-data-6">Available</span>
                                  {decimalValue(row?.usdtPrice, row?.fromCurrencysiteDecimal)}{" "}
                                  {row?.fromCurrency}
                                </span>
                                <br />
                                <span className="table-data-5">
                                  <span className="table-data-6">Limit</span>
                                  {row?.toCurrencySymbolCode} {row.minAmt?.toFixed(row?.toCurrencysiteDecimal)}  - {" "}
                                  {row?.toCurrencySymbolCode} {row.maxAmt?.toFixed(row?.toCurrencysiteDecimal)}
                                </span>
                              </td>
                              <td
                                data-label="Payment"
                                className="p2p-trade-table-td"
                              >
                                <span className="table-data-7">
                                  {row?.paymentNames}
                                </span>
                              </td>
                              <td
                                data-label="Trade"
                                className="p2p-trade-table-td"
                              >
                                <button
                                  type="button"
                                  onClick={() => orderClick(row)}
                                  // data-bs-toggle="collapse" data-bs-target="#collapseExample-1"
                                  // aria-expanded="false" aria-controls="collapseExample"
                                  className={
                                    orderType == "buy"
                                      ? "btn-invoice"
                                      : "btn-invoice-sell"
                                  }
                                >
                                  {row.orderType == "buy" ? "Sell" : "Buy"}{" "}
                                  {row.fromCurrency}
                                </button>
                              </td>
                            </tr>
                            {expanded === true &&
                              selectOrderDetails &&
                              selectOrderDetails._id === row._id && (
                                <tr>
                                  <td colSpan={5}>
                                    <div
                                      className="collapsed py-3"
                                      id="collapseExample-1"
                                    >
                                      <div className=" card bg-transparent card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                          <div className="col-lg-7">
                                            <div className="row g-4 mt-3">
                                              <div className="col-lg-6">
                                                <p className="mb-0">
                                                  <span className="table-data-6">
                                                    Price:
                                                  </span>
                                                  <span className="table-data-5 ms-2 color-green">
                                                    {selectOrderDetails?.price?.toFixed(selectOrderDetails?.toCurrencysiteDecimal)}{" "}
                                                    {
                                                      selectOrderDetails?.toCurrency
                                                    }
                                                  </span>
                                                </p>
                                                <p className="mb-0">
                                                  <span className="table-data-6">
                                                    Payment Time Limit:
                                                  </span>
                                                  <span className="table-data-5 ms-2">
                                                    {
                                                      (selectOrderDetails?.timeLimit != 15 && selectOrderDetails?.timeLimit != 30 && selectOrderDetails?.timeLimit != 45) ?
                                                        Math.floor(selectOrderDetails?.timeLimit / 60) + " hour"
                                                        :
                                                        selectOrderDetails?.timeLimit + " Minutes"
                                                    }{" "}

                                                  </span>
                                                </p>
                                              </div>

                                              <div className="col-lg-6">
                                                <p className="mb-0">
                                                  <span className="table-data-6">
                                                    Available:
                                                  </span>
                                                  <span className="table-data-5 ms-2 color-green">
                                                    {selectOrderDetails?.usdtPrice?.toFixed(selectOrderDetails?.fromCurrencysiteDecimal)}{" "}
                                                    {
                                                      selectOrderDetails?.fromCurrency
                                                    }
                                                  </span>
                                                </p>
                                                <p className="mb-0">
                                                  <span className="table-data-6">
                                                    {selectOrderDetails.orderType ==
                                                      "buy"
                                                      ? "Seller's payment method"
                                                      : "Buyer’s payment method"}
                                                  </span>{" "}
                                                  <span className="table-data-7 ms-2">
                                                    {
                                                      selectOrderDetails?.paymentNames
                                                    }
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row g-4 mt-3">
                                              <div className="col-lg-6">
                                                {selectOrderDetails?.registeredStatus ==
                                                  true &&
                                                  selectOrderDetails.registeredDays >
                                                  0 && (
                                                    <p className="mb-0">
                                                      <span className="table-data-6">
                                                        Registered Days:
                                                      </span>
                                                      <span className="table-data-5 ms-2 color-green">
                                                        {selectOrderDetails && selectOrderDetails?.registeredDays} days
                                                      </span>
                                                    </p>
                                                  )}
                                                {selectOrderDetails?.remarks !=
                                                  "" && (
                                                    <p className="mb-0">
                                                      <span className="table-data-6">
                                                        Terms and conditions:
                                                      </span>
                                                      <span className="table-data-5 ms-2">

                                                        {
                                                          selectOrderDetails?.remarks
                                                        }
                                                      </span>
                                                    </p>
                                                  )}
                                              </div>

                                              {selectOrderDetails?.holdingStatus ==
                                                true &&
                                                selectOrderDetails.holdingBTC >
                                                0 && (
                                                  <div className="col-lg-6">
                                                    <p className="mb-0">
                                                      <span className="table-data-6">
                                                        Holding:
                                                      </span>
                                                      <span className="table-data-5 ms-2 color-green">
                                                        {(
                                                          selectOrderDetails &&
                                                          selectOrderDetails?.holdingBTC
                                                        )?.toFixed(selectOrderDetails?.fromCurrencysiteDecimal)}{" "}
                                                        {
                                                          selectOrderDetails?.fromCurrency
                                                        }
                                                      </span>
                                                    </p>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                          {selectOrderDetails.orderType ==
                                            "buy" && (
                                              <div className="col-lg-4">
                                                <span className="table-data-2">
                                                  I want to sell
                                                </span>
                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                  <input
                                                    type="number"
                                                    className="form-control no-border table-data-2"
                                                    aria-describedby="emailHelp"
                                                    name="total"
                                                    min="0"
                                                    placeholder="0.00"
                                                    autoComplete="off"
                                                    onChange={(event) =>
                                                      calculateValues(
                                                        event.target.value,
                                                        "total"
                                                      )
                                                    }
                                                    value={orderData.total}
                                                  />
                                                  <span className="table-data-2">
                                                    {
                                                      selectOrderDetails?.fromCurrency
                                                    }
                                                  </span>
                                                </div>
                                                {selectOrderDetails.orderType ==
                                                  "buy" && (
                                                    <div className="mb-4">
                                                      <span className="table-data-2">
                                                        Balance :{" "}
                                                        {decimalValue(userWallet, selectOrderDetails.fromCurrencyDecimal)} {" "}
                                                        {
                                                          selectOrderDetails?.fromCurrency
                                                        }
                                                      </span>
                                                      <span
                                                        className="table-data-2 ms-2 color-green curPointer"
                                                        onClick={() =>
                                                          navigate("/my/dashboard")
                                                        }
                                                      >
                                                        Transfer
                                                      </span>
                                                    </div>
                                                  )}
                                                <div className="mb-4"></div>
                                                <span className="table-data-2 mb-4">
                                                  I will receive
                                                </span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                  <input
                                                    type="number"
                                                    className="form-control no-border table-data-2"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    name="price"
                                                    min="0"
                                                    placeholder={
                                                      selectOrderDetails.minAmt +
                                                      "-" +
                                                      selectOrderDetails.maxAmt
                                                    }
                                                    autoComplete="off"
                                                    onChange={(event) =>
                                                      calculateValues(
                                                        event.target.value,
                                                        "price"
                                                      )
                                                    }
                                                    value={orderData.price}
                                                  />
                                                  <span className="table-data-2">
                                                    {
                                                      selectOrderDetails?.toCurrency
                                                    }
                                                  </span>
                                                </div>

                                                <span className="table-data-2">
                                                  payment Method
                                                </span>
                                                <Form.Select
                                                  aria-label="Default select example"
                                                  onChange={
                                                    handlebuyerpaymentChange
                                                  }
                                                >
                                                  {sellerPaymentList.length > 0 ? (
                                                    <option value="">

                                                      Select method
                                                    </option>
                                                  ) : (
                                                    <option>

                                                      Set my payment method
                                                    </option>
                                                  )}
                                                  {sellerPaymentList &&
                                                    sellerPaymentList.length > 0 &&
                                                    sellerPaymentList.map(
                                                      (item, i) => {
                                                        return (
                                                          <>
                                                            <option
                                                              value={item._id}
                                                              key={i}
                                                            >
                                                              {item.name +
                                                                " - " +
                                                                item.accountNo}
                                                            </option>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                </Form.Select>
                                                {sellerPaymentList.length == 0 && (
                                                  <span
                                                    onClick={() =>
                                                      navigate("/p2p-user-center")
                                                    }
                                                    className="color-black cursor f-14 mt-3 mb-3"
                                                  >
                                                    Click here to add Payment
                                                    Method
                                                  </span>
                                                )}
                                                <div className="row mt-4">
                                                  <div className="col-lg-4">
                                                    <button
                                                      className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold"
                                                      type="button"
                                                      onClick={() =>
                                                        setexpanded(false)
                                                      }
                                                    >
                                                      Cancel
                                                    </button>
                                                  </div>
                                                  <div className="col-lg-8">
                                                    <button
                                                      className="btn btn-danger w-100 text-white fw-bold"
                                                      type="button"
                                                      disabled={isLoading}
                                                      onClick={() =>
                                                        handleSubmit(orderData)
                                                      }
                                                    >
                                                      Sell {" "}
                                                      {
                                                        selectOrderDetails?.fromCurrency
                                                      }
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          {selectOrderDetails.orderType ==
                                            "sell" && (
                                              <div className="col-lg-4">
                                                <span className="table-data-2">
                                                  I want to pay
                                                </span>
                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                  <input
                                                    type="number"
                                                    className="form-control no-border table-data-2"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    name="price"
                                                    min="0"
                                                    placeholder={
                                                      selectOrderDetails.minAmt +
                                                      "-" +
                                                      selectOrderDetails.maxAmt
                                                    }
                                                    autoComplete="off"
                                                    onChange={(event) =>
                                                      calculateValues(
                                                        event.target.value,
                                                        "price"
                                                      )
                                                    }
                                                    value={orderData.price}
                                                  />
                                                  {/* <span className="fc-g px-2 table-data-2">ALL</span> */}
                                                  <span className="table-data-2">
                                                    {
                                                      selectOrderDetails?.toCurrency
                                                    }
                                                  </span>
                                                </div>

                                                <span className="table-data-2">
                                                  I will receive
                                                </span>
                                                <div className="d-flex border px-2 align-items-center">
                                                  <input
                                                    type="number"
                                                    className="form-control no-border table-data-2"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    name="total"
                                                    min="0"
                                                    placeholder={
                                                      "0.00 " +
                                                      selectOrderDetails?.fromCurrency
                                                    }
                                                    autoComplete="off"
                                                    onChange={(event) =>
                                                      calculateValues(
                                                        event.target.value,
                                                        "total"
                                                      )
                                                    }
                                                    value={orderData.total}
                                                  />
                                                  <span className="table-data-2">
                                                    {
                                                      selectOrderDetails?.fromCurrency
                                                    }
                                                  </span>
                                                </div>
                                                <div className="row mt-4">
                                                  <div className="col-lg-4">
                                                    <button
                                                      className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold"
                                                      type="button"
                                                      onClick={() =>
                                                        setexpanded(false)
                                                      }
                                                    >
                                                      Cancel
                                                    </button>
                                                  </div>
                                                  <div className="col-lg-8">
                                                    <button
                                                      className="add-payment-method-confirm-button w-100 text-white fw-bold"
                                                      type="button"
                                                      disabled={isLoading}
                                                      onClick={() =>
                                                        handleSubmit(orderData)
                                                      }
                                                    >
                                                      Buy {" "}
                                                      {
                                                        selectOrderDetails?.fromCurrency
                                                      }
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                          </>
                        );
                      })}
                    {loaderStatus &&
                      p2pOrdersList &&
                      p2pOrdersList.length == 0 && (
                        <tr className="p2p-trade-table-tr">
                          <td></td>
                          <td></td>
                          <p className="norecordmargin">No more ads.</p>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                  </tbody>
                </table>
                {totalorders > recordsPerPage &&
                  <div className="row">
                    <div className="col-lg-12 d-flex justify-content-end">
                      <Pagination className="p2p-trade-pagination"
                        total={Math.ceil(totalorders / recordsPerPage)}
                        current={currentPage}
                        onPageChange={page => clickPageNo(page)}
                      />
                    </div>
                  </div>
                }
                {/* { totalorders > recordsPerPage && 
                  <div className="row">
                    <div className="col-lg-12 d-flex justify-content-end">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination bg-transparent">
                          <li className="page-item" isDisabled={true}>
                            <a className={"page-link bg-transparent text-success"+(currentPage == 1 ? " disabled" : "")} href="javascript:void(0)" onClick={prevPage}> {"<"} </a>
                          </li>
                          { pageNumbers.map((pgNumber,index) => (
                            <li key={index} className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                              <a onClick={() => clickPageNo(pgNumber)}  
                                  className={'page-link bg-transparent text-success'} 
                                  href='javascript:void(0);'
                                >
                                  {pgNumber}
                                </a>
                              </li>
                            ))
                          }
                          <li className="page-item"><a className="page-link bg-transparent text-success " href="javascript:void(0)" onClick={nextPage}>{">"}</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                } */}
              </div>
            </div>
          </div>
        </section>
        {/* ==================================BOTTOM-SECTION-WORKS-START======================================== */}
        <section>
          <div className="container p2p-bottom-section-container">
            <div className="row">
              {cmsList &&
                cmsList.map((row, i) => {
                  if (row.identify == "p2psection1") {
                    return (
                      <div className="col">
                        <p className="p2p-bottom-section-heading">
                          {row.title}
                        </p>
                      </div>
                    );
                  }
                })}
            </div>
            <div className="row p2p-bottom-buy-sell-tabs">
              <div className="col">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Buy Crypto
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Sell Crypto
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="row row-cols-lg-3 row-cols-1">
                      {cmsList &&
                        cmsList.map((row, i) => {
                          if (row.identify == "how-p2p-works-buy") {
                            return (
                              <div className="col">
                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                  {row.image && <img src={row.image} />}
                                </div>
                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                  <p>{row.title}</p>
                                </div>
                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                  {row && row.description != "" && (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: row?.description,
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div className="row row-cols-lg-3 row-cols-1">
                      {cmsList &&
                        cmsList.map((row, i) => {
                          if (row.identify == "how-p2p-works-sell") {
                            return (
                              <div className="col">
                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                  {row.image && <img src={row.image} />}
                                </div>
                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                  <p>{row.title}</p>
                                </div>
                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                  {row && row.description != "" && (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: row?.description,
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ==================================BOTTOM-SECTION-WORKS-END======================================== */}
        {/* ==================================ADVANTAGES-P2P-START============================================*/}
        <section>
          <div className="container py-5 ">
            <div className="row mb-3">
              {cmsList &&
                cmsList.map((row, i) => {
                  if (row.identify == "p2psection2") {
                    return (
                      <div className="col">
                        <p className="p2p-bottom-section-heading">
                          {row?.title}
                        </p>
                      </div>
                    );
                  }
                })}
            </div>
            <div className="row row-cols-lg-4 row-cols-1">
              {cmsList &&
                cmsList.map((row, i) => {
                  if (row.identify == "advantagesofP2P") {
                    return (
                      <div className="col" key={i}>
                        {row.image && (
                          <img
                            src={row?.image}
                            className="advantage-p2p-images"
                          />
                        )}
                        <p className="advantages-p2p-section-text-1">
                          {row?.title}
                        </p>
                        {row && row.description != "" && (
                          <span
                            className="benefits-text-2"
                            dangerouslySetInnerHTML={{
                              __html: row?.description,
                            }}
                          />
                        )}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </section>

        {/* ==================================ADVANTAGES-P2P-END============================================*/}
        {/* ==================================FAQ-START===================================================== */}
        <section>
          <div className="container py-5 ">
            <div className="row">
              <div className="col">
                <p className="p2p-bottom-section-heading">FAQS</p>
              </div>
            </div>
            <section className="faq-section">
              <div className="container">
                <div className="row">
                  <div className="faq" id="accordion">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        {faqList.length > 0 &&
                          faqList
                            .slice(0, Math.ceil(faqList.length / 2))
                            .map((row, i) => {
                              return (
                                <>
                                  <div className="card" key={i}>
                                    <div
                                      className="card-header"
                                      id={"faqHeading-1" + i}
                                    >
                                      <div className="mb-0">
                                        <h5
                                          className="faq-title"
                                          data-bs-toggle="collapse"
                                          data-bs-target={"#faqCollapse-1" + i}
                                          data-aria-expanded="true"
                                          data-aria-controls={
                                            "faqCollapse-1" + i
                                          }
                                        >
                                          <span className="badge">+</span>
                                          <p className="mt-2">{row.title}</p>
                                        </h5>
                                      </div>
                                    </div>
                                    <div
                                      id={"faqCollapse-1" + i}
                                      className="collapse"
                                      aria-labelledby={"faqHeading-1" + i}
                                      data-parent="#accordion"
                                    >
                                      <div className="card-body">
                                        <p>{row.description} </p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                      </div>

                      <div className="col-lg-6 col-12">
                        {faqList.length > 0 &&
                          faqList
                            .slice(
                              Math.ceil(faqList.length / 2),
                              faqList.length
                            )
                            .map((row, i) => {
                              return (
                                <>
                                  <div className="card">
                                    <div className="card-header" id="faqHeading-4">
                                      <div className="mb-0">
                                        <h5
                                          className="faq-title"
                                          data-bs-toggle="collapse"
                                          data-bs-target={"#faqCollapse-4" + i}
                                          data-aria-expanded="false"
                                          data-aria-controls={
                                            "faqCollapse-4" + i
                                          }
                                        >
                                          <span className="badge">+</span>
                                          <p className="mt-2">{row.title}</p>
                                        </h5>
                                      </div>
                                    </div>
                                    <div
                                      id={"faqCollapse-4" + i}
                                      className="collapse"
                                      aria-labelledby={"faqHeading-4" + i}
                                      data-parent="#accordion"
                                    >
                                      <div className="card-body">
                                        <p>{row.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        {/* ==================================FAQ-END======================================================= */}
      </div>
      <Modal show={pendingOrderOpen} onHide={() => setpendingOrderOpen(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Verification</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center align-items-center ">
            <CgDanger className="danger-icon-pending-order"/>
            <div className="row mt-4 text-center">
              You have a pending order.Please complete that order before making a new one.
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col'>
              <div className="d-grid">
                <button className="btn btn-secondary" type="submit" onClick={() => setpendingOrderOpen(false)}>Cancel</button>
                <button className="add-payment-method-confirm-button mt-3" type="submit" onClick={() => navigate("/p2p-orders-list")}>Check</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
}
