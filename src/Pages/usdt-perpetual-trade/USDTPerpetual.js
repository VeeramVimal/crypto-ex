import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import NavbarOne from "../siteTheme/NavbarOne";

import TradingView from "./tradeChart/trading-view";
import PairListAndSearch from "./separate/PairListAndSearch";
import MyOrders from "./separate/My-Order";
import OrderBook from "./separate/Order-book";
import RecentOrder from "./separate/RecentOrder";
import TradeForm from "./separate/Trade-buy-sell";
import $ from "jquery";

import Config from "../../core/config";
import { makeRequest } from "../../core/services/v1/request";

import { useContextData } from "../../core/context";
import socketIOClient from "socket.io-client";
import { getCookie } from "../../core/helper/cookie";
import { toast } from "../../core/lib/toastAlert";
import { showNumber } from "../../core/helper/date-format";

// import helper
import {
  orderCost,
  feeOpenAndClose,
} from "../../core/helper/bybit/usdtPerpetual";

let pairData = {};
let userTokenChk = 0;

export default function Futures(props) {
  const navigate = useNavigate();
  let { pairName = "" } = useParams();

  const leverageFutures = localStorage.getItem("leverageFutures")
    ? localStorage.getItem("leverageFutures")
    : 25;

  const { myProfile } = useContextData();

  // state
  const [socketOrdCreLoad, setSocketOrdCreLoad] = useState(false);
  const [marketList, setMarketList] = useState([]);
  const [pairDetails, setPairDetails] = useState({});
  const [socketConnection, setSocketConnection] = useState(null);
  const [userId, setUserId] = useState(null);
  const [orderListType, setOrderListType] = useState("all");
  const [tradeIndex, settradeIndex] = useState({ buy: "", sell: "" });
  const [orderData, serOrderData] = useState({
    leverage: [leverageFutures],
    price: "",
    amount: "",
    total: "",
    stopPrice: "",
    type: "buy",
    orderType: "limit",
    orderCost: "",
    orderValue: "",
    isTP: false,
    isSL: false,
    tpPrice: "",
    slPrice: "",
  });
  const [userTradeDetails, setUserTradeDetails] = useState({
    positionOrders: [],
    activeOrders: [],
    orderHistory: [],
    stopOrders: [],
    tradeHistory: [],
    fromBalance: 0,
    toBalance: 0,
  });
  const recordsPerPage = 25;
  const [currentPage_tradeHis, setCurrentPage_tradeHis] = useState(1);
  const [sellOB, setSellOB] = useState([]);
  const [buyOB, setBuyOB] = useState([]);
  const [recentTrade, setRecentTrade] = useState([]);
  const [range, setRange] = useState({
    leverage: [0],
  });

  // function
  function decimalValue(value, decimal = 0) {
    if (decimal === 0) {
      return showNumber(parseFloat(value));
    }
    return showNumber(parseFloat(value).toFixed(decimal));
  }

  function decimalValueNum(value, decimal) {
    return parseFloat(value).toFixed(decimal);
  }

  function loadSocket() {
    console.log("loadSocket");
    const userJWT = getCookie("userToken");
    if (userJWT != null && userJWT != "") {
      userTokenChk = userJWT ? userJWT : "";
      socketConnection.emit("join", { userId: userJWT });
      socketConnection.on("joined", function (data) {
        if (userJWT == data.token) {
          setUserId(data.userId);
          userTokenChk = data.userId;
        }
      });
      socketConnection.on("userResponseUSDTPerpetual", function (data) {
        try {
          if (userTokenChk == data.userId && currentPage_tradeHis === 1) {
            let tradeHistory = [];
            data.tradeHistory.map((tradeHis, i) => {
              if (
                tradeHis.sellerUserId == userTokenChk &&
                tradeHis.buyerUserId == userTokenChk
              ) {
                if (tradeHis.sellOrderId != tradeHis.buyOrderId) {
                  let data1 = JSON.parse(JSON.stringify(tradeHis));
                  data1.sellerUserId = "";
                  tradeHistory.push(data1);
                  let data2 = JSON.parse(JSON.stringify(tradeHis));
                  data2.buyerUserId = "";
                  tradeHistory.push(data2);
                } else {
                  if (tradeHis.orderType == "buy") {
                    let data1 = JSON.parse(JSON.stringify(tradeHis));
                    data1.sellerUserId = "";
                    tradeHistory.push(data1);
                  }
                  if (tradeHis.orderType == "sell") {
                    let data2 = JSON.parse(JSON.stringify(tradeHis));
                    data2.buyerUserId = "";
                    tradeHistory.push(data2);
                  }
                }
              } else {
                tradeHistory.push(tradeHis);
              }
            });
            data.tradeHistory = tradeHistory;
            console.log("setUserTradeDetails change 1");
            setUserTradeDetails(data);
          }
        } catch (e) {
          console.log("e : userResponseFutures : ", e);
        }
      });
      socketConnection.on("createResponseUSDTPerpetual", function (data) {
        console.log({ data, userTokenChk });
        if (userTokenChk == data.userId && data.message) {
          setSocketOrdCreLoad(false);
          if (data.status) {
            toast({ type: "success", message: data.message });
          } else {
            toast({ type: "error", message: data.message });
          }
        }
      });
    } else {
      if (pairDetails.pair === undefined) {
        getPairDetails();
      }
    }

    socketConnection.on("USDTPerpetualPairResp", function (data) {
      if (pairData._id == data._id) {
        setPairDetails((prev) => {
          return {
            ...prev,
            lastPrice: data.lastPrice,
            marketPrice: data.marketPrice,
            indexPrice: data.indexPrice,
            bidPrice: data.bidPrice,
            askPrice: data.askPrice,
            highPrice24h: data.highPrice24h,
            lowPrice24h: data.lowPrice24h,
            turnover_24h: data.turnover_24h,
            price_24h_pcnt: data.price_24h_pcnt,
          };
        });
        document.title =
          data.marketPrice +
          " | " +
          data.pair.split("_").join("") +
          " | " +
          Config.SITENAME;
      }
    });

    socketConnection.on("USDTPerpetualOrderBook", function (data) {
      if (
        pairData &&
        pairData.pair &&
        pairData.pair.replace("_", "") == data.pairName
      ) {
        setSellOB(data.sellOrder);
        setBuyOB(data.buyOrder);
      }
    });

    socketConnection.on("USDTPerpetualRecentTrade", function (data) {
      if (
        pairData &&
        pairData.pair &&
        pairData.pair.replace("_", "") == data.pairName
      ) {
        setRecentTrade(data.data);
      }
    });
  }

  function submitTrade() {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    // const orderResponse = calculateValues(orderValue.type, "orderPlace");

    if (!userId) {
      toast({ type: "error", message: "Please login to continue" });
      return false;
    }

    if (orderValue.price === "" || orderValue.price <= 0) {
      toast({ type: "error", message: "Please enter trade price" });
      return false;
    }

    if (orderValue.amount === "" || orderValue.amount <= 0) {
      toast({ type: "error", message: "Please enter trade amount" });
      return false;
    }

    if (
      orderValue.isTP &&
      (orderValue.tpPrice == "" || orderValue.tpPrice === 0)
    ) {
      toast({ type: "error", message: "Please enter valid take profit price" });
      return false;
    }

    if (
      orderValue.isSL &&
      (orderValue.slPrice == "" || orderValue.slPrice === 0)
    ) {
      toast({ type: "error", message: "Please enter valid stop loss price" });
      return false;
    }

    if (
      orderValue.orderCost < pairDetails.minOrderCost ||
      !pairDetails.minOrderCost
    ) {
      toast({
        type: "error",
        message:
          "Min order cost should not be less than " + pairDetails.minOrderCost,
      });
      return false;
    }

    let formValue = orderValue;
    let data = {};
    data.amount = parseFloat(formValue.amount);
    data.price = parseFloat(formValue.price);
    data.pair = pairDetails.pair;
    data.orderType = formValue.orderType;
    data.type = formValue.type;
    data.leverage = formValue.leverage[0] ? parseInt(formValue.leverage[0]) : 1;
    data.userId = userId;
    data.action = "open";
    data.method = "isolated";
    data.isTP = formValue.isTP;
    data.tpPrice = formValue.tpPrice;
    data.isSL = formValue.isSL;
    data.slPrice = formValue.slPrice;

    setSocketOrdCreLoad(true);
    socketConnection.emit("createOrderUSDTPerpetual", data);
    return false;
  }

  function roundValues(num, precision) {
    if (num.toString().indexOf("e") > -1) {
      num = num.toLocaleString("fullwide", { useGrouping: false });
    }
    const num1 = num.toString().split(".");
    let num2 = num1[0];
    if (num1.length == 2) {
      num2 = num2 + "." + num1[1].substring(0, precision);
    }
    return parseFloat(num2).toFixed(precision);
  }

  function percentageChange(orderType, percentage) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    const leverageVal =
      orderValue.leverage && orderValue.leverage[0]
        ? parseInt(orderValue.leverage[0])
        : 1;
    let getPrice = orderValue.price && +orderValue.price ? orderValue.price : 0;
    tradeIndex[orderType] = percentage;
    settradeIndex(tradeIndex);

    if (getPrice == 0) {
      const mPrice = getMarketOrderPrice(orderValue);
      orderValue.price = mPrice;
      getPrice = mPrice;
    }

    if (userTradeDetails.toBalance > 0) {
      if (
        getPrice == "" ||
        getPrice == 0 ||
        getPrice == null ||
        getPrice == "null"
      ) {
        orderData.price = +pairDetails.price;
      } else {
        orderData.price = +getPrice;
      }

      let curUserBalance = userTradeDetails.toBalance;

      if (
        orderData &&
        orderData.price &&
        orderData.amount &&
        orderData.leverage &&
        pairDetails.takerFee &&
        orderData.type
      ) {
        orderData.amount = roundValues(
          (+curUserBalance * +percentage * leverageVal) /
            (+orderData.price * 100),
          pairDetails.fromCurrency.siteDecimal
        );
        const feeOpenAndCloseVal = feeOpenAndClose(
          orderData.price,
          orderData.amount,
          orderData.leverage,
          pairDetails.takerFee,
          orderData.type
        );
        console.log({ feeOpenAndCloseVal });
        curUserBalance = +userTradeDetails.toBalance - feeOpenAndCloseVal;
      }

      if (+orderData.price > 0) {
        orderData.amount = roundValues(
          (+curUserBalance * +percentage * leverageVal) /
            (+orderData.price * 100),
          pairDetails.fromCurrency.siteDecimal
        );
      } else {
        orderData.amount = 0;
      }
    } else {
      orderData.price = 0;
      orderData.amount = 0;
      orderData.total = 0;
    }
    serOrderData(orderData);
    calculateValues(orderData.amount, "amount");
  }

  function calculateValues(
    placeValue,
    placeType,
    orderDataRestore = {},
    extData = {}
  ) {
    const { priceChange = false } = extData;
    let orderValue = JSON.parse(JSON.stringify(orderData));

    if (Object.keys(orderDataRestore).length > 0) {
      orderValue = orderDataRestore;
    }

    if (placeType == "leverage") {
      orderValue.leverage = placeValue;
      serOrderData(orderValue);
      return false;
    }

    if (placeType == "stopPrice") {
      orderValue.stopPrice = placeValue;
      serOrderData(orderValue);
      return false;
    }
    let getAmount =
      placeType == "amount"
        ? placeValue
        : orderValue.amount > 0
        ? orderValue.amount
        : 0;
    let getPrice =
      placeType == "price"
        ? placeValue
        : orderValue.price > 0
        ? orderValue.price
        : 0;

    let getTotal =
      placeType == "total"
        ? placeValue
        : orderValue.total > 0
        ? orderValue.total
        : 0;

    let orderPrice = getPrice;
    if (orderValue.orderType == "market" && priceChange === false) {
      if (
        (orderValue.type == "buy" && sellOB && sellOB.length > 0) ||
        (orderValue.type == "sell" && buyOB && buyOB.length > 0)
      ) {
        orderPrice = orderValue.type == "buy" ? sellOB[0]._id : buyOB[0]._id;
      } else {
        orderPrice = +pairDetails.price;
      }
    }

    if (orderPrice == "" || isNaN(orderPrice) || orderPrice < 0) {
      orderPrice = pairDetails.price;
    }
    orderValue.price = orderPrice;

    if (isNaN(getAmount) || getAmount < 0) {
      orderValue.amount = placeType == "amount" ? "" : orderValue.amount;
      orderValue.total = "";
      serOrderData(orderValue);
      return false;
    } else if (isNaN(orderPrice) || orderPrice < 0) {
      orderValue.price = placeType == "price" ? "" : orderValue.price;
      orderValue.total = "";
      serOrderData(orderValue);
      return false;
    } else {
      let total =
        placeType == "total"
          ? placeValue
          : (parseFloat(getAmount) > 0 ? parseFloat(getAmount) : 0) *
            (parseFloat(orderPrice) > 0 ? parseFloat(orderPrice) : 0);
      const totE = total.toString();

      if (total > 0 && totE.indexOf("e") == -1) {
        if (placeType == "total") {
          getAmount = total / orderPrice;
          const getAmountE = getAmount.toString();
          if (
            getAmount == "" ||
            getAmount < 0 ||
            isNaN(getAmount) ||
            getAmountE.indexOf("e") > -1
          ) {
            // orderValue.amount = "";
            orderValue.total = total;
            serOrderData(orderValue);
            return false;
          } else {
            orderValue.amount = parseFloat(getAmount).toFixed(
              pairDetails.fromCurrency.siteDecimal
            );
            orderValue.price = parseFloat(orderPrice).toFixed(
              pairDetails.decimalValue
            );
            orderValue.total =
              placeType == "total"
                ? placeValue
                : parseFloat(total).toFixed(pairDetails.decimalValue);
            serOrderData(orderValue);
            return true;
          }
        } else {
          orderValue.amount = +parseFloat(getAmount).toFixed(
            pairDetails.fromCurrency.siteDecimal
          );
          orderValue.price = +parseFloat(orderPrice).toFixed(
            pairDetails.decimalValue
          );
          orderValue.total = +parseFloat(total).toFixed(
            pairDetails.decimalValue
          );
          serOrderData(orderValue);
          return true;
        }
      } else {
        if (total != 0) {
          toast({ type: "error", message: "Invalid Total!" });
          orderValue.amount = placeType == "amount" ? placeValue : "";
          orderValue.total = "";
          orderValue.price = placeType == "price" ? placeValue : "";
        } else {
          orderValue.amount =
            placeType == "amount"
              ? placeValue
              : orderValue && orderValue.amount
              ? orderValue.amount
              : "";
          orderValue.total = "";
          orderValue.price =
            placeType == "price"
              ? placeValue
              : orderValue && orderValue.price
              ? orderValue.price
              : "";
        }
        serOrderData(orderValue);
        return false;
      }
    }
  }

  async function orderDetail(orderId) {
    try {
      // const params = {
      //   url: `${Config.USDM_V2_API_URL}trade/getOrderDetail`,
      //   method: "POST",
      //   data: { orderId: orderId },
      // };
      // const response = await makeRequest(params);
      // if (response.status && response.Msg) {
      //   // toast({ type: "success", message: response.Msg });
      // } else {
      //   // toast({ type: "error", message: response.Msg });
      // }
    } catch (err) {}
  }

  async function cancelOrder(orderId) {
    try {
      const params = {
        url: `${Config.USDM_V1_API_URL}usdt-perpetual/cancelOrder`,
        method: "POST",
        data: { orderId: orderId },
      };
      const response = await makeRequest(params);
      if (response.status && response.Msg) {
        toast({ type: "success", message: response.Msg });
      } else {
        toast({ type: "error", message: response.Msg });
      }
    } catch (err) {}
  }

  function getMarketOrderPrice(orderValue, pairDet = {}) {
    if (pairDet.sellOrders == undefined) {
      pairDet = pairDetails;
    }
    let orderPrice = orderValue.price;
    if (
      (orderValue.type === "buy" && sellOB && sellOB.length > 0) ||
      (orderValue.type === "sell" && buyOB && buyOB.length > 0)
    ) {
      orderPrice = orderValue.type === "buy" ? sellOB[0]._id : buyOB[0]._id;
    } else {
      orderPrice = +pairDet.price;
    }
    return orderPrice;
  }

  function setType(type) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    orderValue.type = type;
    const mPrice = getMarketOrderPrice(orderValue);
    if (
      (mPrice && orderValue.price == "") ||
      orderValue.orderType === "market"
    ) {
    }
    if (mPrice) {
      orderValue.price = mPrice;
      calculateValues(mPrice, "price", orderValue);
    }
    serOrderData(orderValue);
  }

  function setOrderType(type) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    orderValue.orderType = type;
    const mPrice = getMarketOrderPrice(orderValue);
    if (
      (mPrice && orderValue.price == "") ||
      orderValue.orderType === "market"
    ) {
    }
    if (mPrice) {
      orderValue.price = mPrice;
      calculateValues(mPrice, "price", orderValue);
    }
    serOrderData(orderValue);
  }

  async function getMarkets() {
    try {
      const params = {
        url: `${Config.USDM_V1_API_URL}usdt-perpetual/getMarketsTab`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setMarketList(response.data);
      }
    } catch (err) {}
  }

  function setPrice(price) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    orderValue.price = price;
    if (orderValue.amount > 0) {
      calculateValues(price, "price", orderValue);
    } else {
      serOrderData(orderValue);
    }
  }

  async function getPairDetails() {
    try {
      console.log("getPairDetails");
      const params = {
        url: `${Config.USDM_V1_API_URL}usdt-perpetual/checkPair`,
        method: "POST",
        data: { pair: pairName },
      };
      const response = await makeRequest(params);
      if (response.status && response.Message) {
        if (
          (pairName == undefined || pairName == "") &&
          response.Message.pair
        ) {
          navigate("/futures/" + response.Message.pair);
        } else {
          if (userId != null) {
            if (socketConnection != null) {
              let userObj = {
                userId: userId,
                pairId: response.Message._id,
                fromCurn: response.Message.fromCurrency.currencyId,
                toCurn: response.Message.toCurrency.currencyId,
              };
              socketConnection.emit("userEmitUSDTPerpetual", userObj);
            }
          }
          pairData = response.Message;
          setPairDetails(response.Message);
          afterPairDetailChange(response.Message);
        }
      } else {
        const params = {
          url: `${Config.USDM_V1_API_URL}usdt-perpetual/checkPair`,
          method: "POST",
          data: { pair: "", exchangeType: "FUTURES" },
        };
        const response = await makeRequest(params);
        if (response.status && response.Message && response.Message.pair) {
          navigate("/futures/" + response.Message.pair);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  const afterPairDetailChange = (chkpairData = {}) => {
    if (chkpairData && chkpairData.price) {
      if (orderData && orderData.price !== undefined) {
        let orderDataCopy = Object.assign(orderData, {});
        orderDataCopy.price = chkpairData.price;
        const mPrice = getMarketOrderPrice(orderDataCopy, chkpairData);
        if (mPrice && mPrice > 0) {
          orderDataCopy.price = mPrice;
          calculateValues(mPrice, "price", orderDataCopy, {
            priceChange: true,
          });
        }
        serOrderData(orderDataCopy);
      }
    }
  };

  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= recordsPerPage) {
      setCurrentPage_tradeHis(newCurrentPage);
      getPagination(newCurrentPage);
    }
  };

  async function getPagination(newCurrentPage) {
    try {
      const data = {
        limit: recordsPerPage,
        offset: recordsPerPage * (newCurrentPage - 1),
      };
      const params = {
        url: `${Config.USDM_V2_API_URL}usdt-perpetual/profit/list`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status && response.list) {
        userTradeDetails.tradeHistory = response.list;
        console.log("setUserTradeDetails change 2");
        setUserTradeDetails(userTradeDetails);
      }
    } catch (err) {}
  }

  // async function getPagination(currentPage_tradeHis) {
  //   console.log("getPagination",currentPage_tradeHis)
  //   try {
  //     if (currentPage_tradeHis != 1 ) {
  //       const data = {
  //         limit: recordsPerPage,
  //         offset: recordsPerPage * (currentPage_tradeHis - 1 )
  //       };
  //       const params = {
  //         url: `${Config.USDM_V2_API_URL}trade/profit/list`,
  //         method: "POST",
  //         body: data,
  //       };
  //       const response = await makeRequest(params);
  //       if (response.status && response.list) {
  //         userTradeDetails.tradeHistory = response.list;
  //         setUserTradeDetails(userTradeDetails)
  //       }
  //     }
  //   } catch (err) {}
  // }

  async function clickOrderBook(elem = {}) {
    const elem_id = elem._id;
    if (elem_id) {
      calculateValues(elem_id, "price");
    }
  }

  // async function PNLCalc(data = {}) {
  //   // Unrealized PNL = position size * direction of order * (mark price - entry price)
  //   // 1 = 10 * 1* (1.1 -1)
  // }

  async function initScriptCall() {
    $(".status_change .dropdown-item").click(function () {
      const getStatusText = $(this).text();
      $(this)
        .closest(".status_dropdown")
        .find(".status__btn")
        .text(getStatusText);
      const generateStatusClass = `${$(this).attr("data-class")}-status`;
      $(this)
        .closest(".status_dropdown")
        .attr("data-color", `${generateStatusClass}`);
    });
    $(document).ready(function () {
      $(".trading-table-total-height li").mouseenter(function () {
        $(this).addClass("divider");
      });
      $(".trading-table-total-height li").mouseleave(function () {
        $(this).removeClass("divider");
      });
    });
  }

  async function initSocketCall() {
    let socket = socketIOClient(Config.USDM_SOCKET_URL, {
      // transports: ["polling"],
      transports: ["websocket"],
      // rejectUnauthorized: false
    });
    let socketUnsubscribe;
    if (socket) {
      socket.on("connect", function () {
        console.log("socket connected : USDM");
        setSocketConnection(socket);
        socketUnsubscribe = socket;
      });
      socket.on("connect_error", (err) => {
        console.log("socket connect_error : USDM", err);
      });
      socket.on("disconnect", function () {
        console.log("socket disconnected : USDM");
      });
    }
    return () => {
      if (socketUnsubscribe) {
        socketUnsubscribe.disconnect();
      }
    };
  }

  async function initUseEffect() {
    getPairDetails();
    getMarkets();
    initScriptCall();
    initSocketCall();
  }

  useEffect(() => {
    initUseEffect();
  }, []);

  useEffect(() => {
    if (pairName != undefined || pairName != "") {
      if (Object.keys(pairDetails).length > 0) {
        getPairDetails();
      }
    }
  }, [pairName]);

  useEffect(() => {
    if (socketConnection != null) {
      loadSocket();
      if (typeof userId == "string" && userId) {
        getPairDetails();
      }
    }
  }, [socketConnection]);

  useEffect(() => {
    if (myProfile && myProfile._id) {
      setUserId(myProfile._id);
    }
  }, [myProfile]);

  useEffect(() => {
    if (typeof userId == "string" && userId) {
      getPairDetails();
    }
  }, [userId]);

  // useEffect(() => {
  //   console.log("pairDetails", {pairDetails}, "pairDetailspairDetails : ", pairDetails.price)
  //   if (pairDetails && pairDetails.lastPrice) {
  //     loadSocket();
  //     if (orderData && !orderData.price) {
  //       let orderDataCopy = Object.assign(orderData, {});
  //       orderDataCopy.price = pairDetails.price;
  //       calculateValues(pairDetails.price, "price", orderDataCopy);
  //       serOrderData(orderDataCopy);
  //     }
  //   }
  // }, [pairDetails]);

  useEffect(() => {
    if (
      orderData &&
      orderData.price &&
      orderData.amount &&
      orderData.leverage &&
      pairDetails.takerFee &&
      orderData.type
    ) {
      const feeOpenAndCloseVal = feeOpenAndClose(
        orderData.price,
        orderData.amount,
        orderData.leverage,
        pairDetails.takerFee,
        orderData.type
      );
      serOrderData((prev) => {
        return {
          ...prev,
          orderCost: orderCost(
            orderData.price,
            orderData.amount,
            orderData.leverage,
            pairDetails.takerFee,
            orderData.type
          ),
          orderValue:
            parseFloat(orderData.price) * parseFloat(orderData.amount),
        };
      });
    }
  }, [orderData, pairDetails]);

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div>
        <div className="spot-page-top-banner">
          <div className="container-fluid p-0 overflow-hidden">
            <div className="col-lg-12 mx-auto trading-page-box">
              <div className="row p-0">
                <div className="col-lg-9 trading-page-box-left-inner-section pe-lg-0">
                  <PairListAndSearch
                    decimalValue={decimalValue}
                    pairName={pairName}
                    pairDetails={pairDetails}
                    marketList={marketList}
                    toCurrencySymbol={
                      pairDetails && pairDetails.toCurrency
                        ? pairDetails.toCurrency.currencySymbol
                        : ""
                    }
                    socketConnection={socketConnection}
                  />
                  <div className="">
                    <div className="trading-inner-right-section">
                      {pairDetails && pairDetails.pair && (
                        <div id="tradingviewwidget">
                          {/* className="light-new-widget" */}
                          {pairName && (
                            <TradingView
                              symbol={pairDetails.pair.split("_").join("/")}
                              theme={props.theme}
                            />
                          )}
                        </div>
                      )}
                      <MyOrders
                        myProfile={myProfile}
                        cancelOrder={cancelOrder}
                        orderDetail={orderDetail}
                        userTradeDetails={userTradeDetails}
                        setCurrentPage_tradeHis={setCurrentPage_tradeHis}
                        currentPage_tradeHis={currentPage_tradeHis}
                        recordsPerPage={recordsPerPage}
                        getPagination={getPagination}
                        pageChange={pageChange}
                        decimalValue={decimalValue}
                        socketConnection={socketConnection}
                        userId={userId}
                        pairDetails={pairDetails}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 trading-page-box-right-inner-section">
                  <div className="row">
                    <div className="col-lg-6 px-lg-0">
                      <div>
                        <div className="p-0 trading-table-total-height">
                          <div className="d-flex flex-row trading-page-top-section-2 align-items-center top-heading-total-height">
                            <div className="ps-2">
                              <p className="trade-text-5 mb-0">Orderbook</p>
                            </div>
                            <div className="ms-auto orderbook-grid-tabs">
                              <ul
                                className="nav nav-pills"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li
                                  className="nav-item"
                                  role="presentation"
                                  onClick={() => setOrderListType("buy")}
                                >
                                  <button
                                    className="nav-link active"
                                    id="pills-grid1-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-grid1"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-grid1"
                                    aria-selected="true"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="12"
                                      viewBox="0 0 20 12"
                                    >
                                      <g
                                        id="Rectangle_9"
                                        data-name="Rectangle 9"
                                        fill="none"
                                        stroke="#20b958"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="12"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="11"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_10"
                                        data-name="Rectangle 10"
                                        transform="translate(8 5) rotate(-90)"
                                        fill="none"
                                        stroke="#b3b7c2"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="12"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="11"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_11"
                                        data-name="Rectangle 11"
                                        transform="translate(8 12) rotate(-90)"
                                        fill="none"
                                        stroke="#b3b7c2"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="12"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="11"
                                          fill="none"
                                        />
                                      </g>
                                    </svg>
                                  </button>
                                </li>
                                <li
                                  className="nav-item"
                                  role="presentation"
                                  onClick={() => setOrderListType("sell")}
                                >
                                  <button
                                    className="nav-link"
                                    id="pills-grid2-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-grid2"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-grid2"
                                    aria-selected="false"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="12"
                                      viewBox="0 0 20 12"
                                    >
                                      <g
                                        id="Rectangle_9"
                                        data-name="Rectangle 9"
                                        fill="none"
                                        stroke="#ff5a5a"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="12"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="11"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_10"
                                        data-name="Rectangle 10"
                                        transform="translate(8 5) rotate(-90)"
                                        fill="none"
                                        stroke="#b3b7c2"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="12"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="11"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_11"
                                        data-name="Rectangle 11"
                                        transform="translate(8 12) rotate(-90)"
                                        fill="none"
                                        stroke="#b3b7c2"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="12"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="11"
                                          fill="none"
                                        />
                                      </g>
                                    </svg>
                                  </button>
                                </li>
                                <li
                                  className="nav-item"
                                  role="presentation"
                                  onClick={() => setOrderListType("all")}
                                >
                                  <button
                                    className="nav-link"
                                    id="pills-grid3-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-grid3"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-grid3"
                                    aria-selected="false"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="12"
                                      viewBox="0 0 20 12"
                                    >
                                      <g
                                        id="Rectangle_5"
                                        data-name="Rectangle 5"
                                        transform="translate(8)"
                                        fill="none"
                                        stroke="#b3b7c2"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="12"
                                          height="5"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="11"
                                          height="4"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_7"
                                        data-name="Rectangle 7"
                                        transform="translate(8 7)"
                                        fill="none"
                                        stroke="#b3b7c2"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="12"
                                          height="5"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="11"
                                          height="4"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_6"
                                        data-name="Rectangle 6"
                                        transform="translate(0 7)"
                                        fill="none"
                                        stroke="#20b958"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="5"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="4"
                                          fill="none"
                                        />
                                      </g>
                                      <g
                                        id="Rectangle_8"
                                        data-name="Rectangle 8"
                                        fill="none"
                                        stroke="#ff5a5a"
                                        strokeLinecap="round"
                                        strokeWidth="1"
                                      >
                                        <rect
                                          width="5"
                                          height="5"
                                          rx="0.5"
                                          stroke="none"
                                        />
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="4"
                                          height="4"
                                          fill="none"
                                        />
                                      </g>
                                    </svg>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="trading-page-top-section-3 ">
                            <div className="trading-table-left-section progress-bar-bg-color">
                              <div className="d-flex flex-row mb-1 mobile-justify-content orderbook-table-heading-section border-top-0">
                                <div className="progress-table-1">
                                  <span className="orderbook-text-1">
                                    Price(
                                    {pairDetails.toCurrency &&
                                      pairDetails.toCurrency.currencySymbol}
                                    )
                                  </span>
                                </div>
                                <div className="progress-table-2">
                                  <span className="orderbook-text-1">
                                    Amount(
                                    {pairDetails.fromCurrency &&
                                      pairDetails.fromCurrency.currencySymbol}
                                    )
                                  </span>
                                </div>
                                <div className="progress-table-3">
                                  <span className="orderbook-text-1">
                                    Total(
                                    {pairDetails.toCurrency &&
                                      pairDetails.toCurrency.currencySymbol}
                                    )
                                  </span>
                                </div>
                              </div>
                              <OrderBook
                                clickOrderBook={clickOrderBook}
                                decimalValueFunc={decimalValue}
                                orderListType={
                                  orderListType === "all" ||
                                  orderListType === "sell"
                                    ? "sell"
                                    : "buy"
                                }
                                viewOrderList={
                                  pairDetails
                                    ? orderListType === "all" ||
                                      orderListType === "sell"
                                      ? sellOB
                                        ? sellOB
                                            .slice(
                                              0,
                                              orderListType === "all" ? 9 : 25
                                            )
                                            .reverse()
                                        : []
                                      : buyOB
                                      ? buyOB
                                      : []
                                    : []
                                }
                                viewLimit={orderListType === "all" ? 9 : 25}
                                pairDetails={pairDetails}
                                reverse={"yes"}
                              />
                            </div>
                            {orderListType == "all" && (
                              <div className="d-flex flex-row orderbook-table-heading-section">
                                {pairDetails ? (
                                  <div className="ps-2">
                                    <span
                                      className={`trade-text-5 ${
                                        pairDetails.lastPrice > 0
                                          ? pairDetails.lastPrice <
                                            pairDetails.marketPrice
                                            ? "color-green"
                                            : "color-red"
                                          : ""
                                      }`}
                                    >
                                      {decimalValue(
                                        pairDetails.marketPrice
                                          ? pairDetails.marketPrice
                                          : 0,
                                        pairDetails.priceDecimal
                                      )}
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                            {orderListType == "all" && (
                              <div className="trading-table-left-section progress-bar-bg-color ">
                                <OrderBook
                                  clickOrderBook={clickOrderBook}
                                  decimalValueFunc={decimalValue}
                                  orderListType={"buy"}
                                  viewOrderList={buyOB}
                                  viewLimit={10}
                                  pairDetails={pairDetails}
                                  reverse={"no"}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        {pairDetails && pairDetails.fromCurrency && (
                          <RecentOrder
                            setPrice={setPrice}
                            decimalValue={decimalValue}
                            type={orderData.orderType}
                            fromCurrency={
                              pairDetails.fromCurrency.currencySymbol
                            }
                            toCurrency={pairDetails.toCurrency.currencySymbol}
                            toDecimal={pairDetails.decimalValue}
                            fromDecimal={pairDetails.fromCurrency.siteDecimal}
                            tradeHistory={recentTrade}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 place-order-section-top px-lg-0">
                      <TradeForm
                        setType={setType}
                        myProfile={myProfile}
                        setPrice={setPrice}
                        submitTrade={submitTrade}
                        pairDetails={pairDetails}
                        makerFee={pairDetails.makerFee}
                        takerFee={pairDetails.takerFee}
                        setOrderType={setOrderType}
                        fromBalance={userTradeDetails.fromBalance}
                        toBalance={userTradeDetails.toBalance}
                        calculateValues={calculateValues}
                        percentageChange={percentageChange}
                        tradeIndex={tradeIndex}
                        orderData={orderData}
                        decimalValue={decimalValue}
                        fromCurrencyId={
                          pairDetails && pairDetails.fromCurrency
                            ? pairDetails.fromCurrency._id
                            : ""
                        }
                        toCurrencyId={
                          pairDetails && pairDetails.toCurrency
                            ? pairDetails.toCurrency._id
                            : ""
                        }
                        fromCurrency={
                          pairDetails && pairDetails.fromCurrency
                            ? pairDetails.fromCurrency.currencySymbol
                            : ""
                        }
                        toCurrency={
                          pairDetails && pairDetails.toCurrency
                            ? pairDetails.toCurrency.currencySymbol
                            : ""
                        }
                        toDecimal={pairDetails.decimalValue}
                        fromDecimal={
                          pairDetails && pairDetails.fromCurrency
                            ? pairDetails.fromCurrency.siteDecimal
                            : ""
                        }
                        tradeHistory={pairDetails.tradeHistory}
                        socketOrdCreLoad={socketOrdCreLoad}
                        userTradeDetails={userTradeDetails}
                        serOrderData={serOrderData}
                        range={range}
                        setRange={setRange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
