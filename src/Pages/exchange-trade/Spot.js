import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import NavbarOne from '../siteTheme/NavbarOne';

import TradingView from './tradeChart/trading-view';
import PairListAndSearch from './separate/PairListAndSearch';
import MyOrders from './separate/My-Order';
import OrderBook from './separate/Order-book';
import RecentOrder from './separate/RecentOrder';
import TradeForm from './separate/Trade-buy-sell';
import $ from "jquery";

import Config from "../../core/config";
import { makeRequest } from "../../core/services/v1/request";

import { decimalCorrection, toFixedWithoutRound } from '../../core/helper/common';

import { useContextData } from '../../core/context';
import socketIOClient from "socket.io-client";
import { getCookie } from "../../core/helper/cookie";
import { toast } from "../../core/lib/toastAlert";
import { showNumber } from '../../core/helper/date-format';

import ReactTooltip from 'react-tooltip';

let orderCreate = 0;
let orderCreateType = "";
let pairData = {};
let userTokenChk = 0;
let createdOrder = 0;

export default function Spot(props) {

  const navigate = useNavigate();
  let { pairName } = useParams();

  const { myProfile, setUserProfile, p2pSettings } = useContextData();

  const [userDetails, setUserDetails] = useState({});
  const [socketOrdCreLoad, setSocketOrdCreLoad] = useState(false);
  const [marketList, setMarketList] = useState([]);
  const [pairDetails, setPairDetails] = useState({});
  const [socketConnection, setSocketConnection] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [advancedTrader, setAdvancedTrader] = useState(0);
  const [orderListType, setOrderListType] = useState("all");
  const [popupText, setPopupText] = useState("");
  const [tradeIndex, settradeIndex] = useState({ buy: "", sell: "" });
  const [orderData, setOrderData] = useState({
    price: "",
    amount: "",
    total: "",
    stopPrice: "",
    type: "buy",
    orderType: "limit",
  });
  const [userTradeDetails, setUserTradeDetails] = useState({
    activeOrders: [],
    stopOrders: [],
    tradeHistory: [],
    fromBalance: 0,
    toBalance: 0,
  });
  const recordsPerPage = 25;
  const [currentPage_tradeHis, setCurrentPage_tradeHis] = useState(1);

  function decimalValue(value, decimal = 0) {
    if(decimal === 0) {
      return showNumber(parseFloat(value));
    }
    return showNumber(parseFloat(value).toFixed(decimal));
  }

  function decimalValueNum(value, decimal) {
    return parseFloat(value).toFixed(decimal);
  }

  useEffect(() => {
    let socket = socketIOClient(Config.SOCKET_URL, {
      // transports: ["polling"],
      transports: ["websocket"],
      // rejectUnauthorized: false
    });
    let socketUnsubscribe;
    getMarkets();
    if (socket) {
      socket.on("connect", function () {
        console.log("socket connected");
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
    if (typeof pairName != "undefined") {
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
    if (typeof userId == "string" && userId) {
      getPairDetails();
    }
  }, [userId]);
  useEffect(() => {
    if (myProfile && myProfile._id) {
      setUserId(myProfile._id);
    }
  }, [myProfile]);
  function loadSocket() {
    console.log("loadSocket : ");
    let pairDetailsBk = {}
    const userJWT = getCookie("userToken");
    if (userJWT != null && userJWT != "") {
      userTokenChk = userJWT ? userJWT : "";
      setUserToken(userJWT);
      socketConnection.emit("join", { userId: userJWT });
      socketConnection.on("joined", function (data) {
        if (userJWT == data.token) {
          setUserId(data.userId);
          userTokenChk = data.userId;
          setUserToken(data.userId);
          setAdvancedTrader(data.advancedTrader);
        }
      });
      socketConnection.on("userResponse", function (data) {
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
            setUserTradeDetails(data);
          }
        } catch (e) {
          console.log("e : userResponse : ", e);
        }
      });
      socketConnection.on("createResponse", function (data) {
        if (userTokenChk == data.userId && pairData._id == data.pair) {
          // console.log("createOrder createResponse data : ", data);
          if (createdOrder == 1) {
            createdOrder = 0;
            setSocketOrdCreLoad(false);
            if (data.status == 1) {
              toast({ type: "success", message: data.msg });
              let orderValue = JSON.parse(JSON.stringify(orderData));
              orderValue.amount = "";
              orderValue.price = decimalValueNum(
                pairData.price,
                pairData.decimalValue
              );
              orderValue.total = "";
              orderValue.stopPrice = "";

              setOrderData(orderValue);
            } else {
              toast({ type: "error", message: data.msg });
            }
          }
        }
      });
    } else {
      getPairDetails();
    }
    socketConnection.on("pairResponse", function (data) {
      // console.log('socket pairResponse data : ', new Date(), data);
      // let oldData = _this.markets[data.pair.split('_')[1]].filter((market: any) => market.pair == data.pair)[0];
      // let oldIndex = _this.markets[data.pair.split('_')[1]].findIndex((market: any) => market.pair == data.pair);
      // let oldPrice = parseFloat(oldData.price).toFixed(oldData.decimalValue);
      // if(newPrice != oldPrice) {
      //   _this.markets[data.pair.split('_')[1]][oldIndex].lastPrice = parseFloat(oldPrice);
      //   _this.markets[data.pair.split('_')[1]][oldIndex].oldPrice = parseFloat(oldData.price);
      //   _this.markets[data.pair.split('_')[1]][oldIndex].price = parseFloat(data.price);
      //   _this.markets[data.pair.split('_')[1]][oldIndex].change = data.change;
      //   setTimeout(function(){
      //     _this.markets[data.pair.split('_')[1]][oldIndex].oldPrice = 0;
      //   });
      // }
      if (pairData._id == data._id) {
        let newPrice = data.price.toFixed(data.decimalValue);
        if (data.type == 1) {
          let tradeOrderData = [];
          data.tradeHistory.map((element) => {
            if (
              typeof element.type == "string" &&
              typeof element.price != "undefined" &&
              typeof element.price != undefined &&
              typeof element.volume != "undefined" &&
              typeof element.volume != undefined &&
              typeof element.time != "undefined" &&
              typeof element.time != undefined
            ) {
              tradeOrderData.push(element);
            }
          });
          data.tradeHistory = tradeOrderData;
          data.volume = (data.volume && parseFloat(data.volume) > 0) ? +data.volume : 0;
          pairData = data;

          data.volume = data.volume > 0 ? data.volume : pairDetailsBk.volume;
          setPairDetails(data);
          pairDetailsBk = data;
        } else {
          let pairDetail = JSON.parse(JSON.stringify(pairData));
          if (data.buyOrders.length > 0) {
            pairDetail.buyOrders = data.buyOrders;
          }
          if (data.sellOrders.length > 0) {
            pairDetail.sellOrders = data.sellOrders;
          }
          let tradeData = pairDetail.tradeHistory;
          if (typeof data.tradeHistory == "object") {
            tradeData = pairDetail.tradeHistory.reverse();
            tradeData.push(data.tradeHistory);
            tradeData = tradeData.reverse();
            tradeData.pop();
            pairDetail.lastPrice = pairDetail.price;
            pairDetail.price = parseFloat(data.price);
            pairDetail.change = data.change;
            pairDetail.volume = (data.volume && parseFloat(data.volume) > 0) ? +data.volume : 0;
          }
          let tradeOrderData = [];
          tradeData.map((element) => {
            if (
              typeof element.type == "string" &&
              typeof element.price != "undefined" &&
              typeof element.price != undefined &&
              typeof element.volume != "undefined" &&
              typeof element.volume != undefined &&
              typeof element.time != "undefined" &&
              typeof element.time != undefined
            ) {
              tradeOrderData.push(element);
            }
          });
          pairDetail.tradeHistory = tradeOrderData;
          pairDetail.volume = (pairDetail.volume != undefined &&  pairDetail.volume > 0) ? pairDetail.volume : pairDetailsBk.volume;
          pairData = pairDetail;
          setPairDetails(pairDetail);
          pairDetailsBk = pairDetail;
        }
        document.title =
          newPrice + " | " + data.pair.split("_").join("") + " | "+ Config.SITENAME;
      }
    });
  };

  async function submitCopytrade(){

    let orderValue = JSON.parse(JSON.stringify(orderData));
    const orderResponse = calculateValues(orderValue.type, "orderPlace");
    if (!userId) {
      toast({ type: "error", message: "Please login to continue" });
      return false;
    }
    if (orderResponse) {
      let getStop = 0;
      let formValue = orderValue;
      if (formValue.orderType == "stop") {
        getStop = formValue.stopPrice.toString();
        if (
          formValue.stopPrice == "" ||
          formValue.stopPrice < 0 ||
          isNaN(formValue.stopPrice) ||
          getStop.indexOf("e") > -1
        ) {
          toast({
            type: "error",
            message: "Please enter valid stop price!",
          });
          return false;
        }
      }
      if (orderValue.type == "buy") {
        if (
          parseFloat(formValue.total) > userTradeDetails.toBalance ||
          userTradeDetails.toBalance < 0.00000001
        ) {
          toast({ type: "error", message: "Insufficient balance" });
          return false;
        }
      } else {
        if (
          userTradeDetails.fromBalance < parseFloat(formValue.amount) ||
          userTradeDetails.fromBalance < 0.00000001
        ) {
          toast({ type: "error", message: "Insufficient balance" });
          return false;
        }
      }
      if (formValue.orderType == "market") {
        const countOrders =
          formValue.type == "buy"
            ? pairDetails.sellOrders.length
            : pairDetails.buyOrders.length;
        if (countOrders == 0) {
          toast({
            type: "error",
            message:
              "There is No Active Orders Available on " +
              (formValue.type == "buy" ? "Sell" : "Buy"),
          });
          return false;
        }
      }
      if (formValue.orderType != "market" && orderCreate == 0) {
        const curOrderPrice = parseFloat(formValue.price);
        const curMarketPrice = parseFloat(pairDetails.price);
        const curPerPrice = (curMarketPrice * 5) / 100;
        let text = "";
        if (
          formValue.type == "buy" &&
          curOrderPrice >= curMarketPrice + curPerPrice
        ) {
          text = "Buy Order Price is Greater Than 5% of Market Price";
        }
        if (
          formValue.type == "sell" &&
          curOrderPrice < curMarketPrice - curPerPrice
        ) {
          text = "Sell Order Price is Less Than 5% of Market Price";
        }
        setPopupText(text);
        if (text != "") {
          orderCreateType = formValue.type;
          if (window.confirm(text) == true) {
            orderCreate = 1;
            submitTrade();
            return false;
          } else {
            return false;
          }
        }
      }
      orderCreate = 0;
      createdOrder = 1;
      let data = {};
      data.amount = parseFloat(formValue.amount);
      data.price = parseFloat(formValue.price);
      data.stopPrice = parseFloat(getStop);
      data.pair = pairDetails._id;
      data.orderType = formValue.orderType;
      data.type = formValue.type;
      data.userId = userId;
      data.copyTrade = 1;
      data.copyTradeID = makeid(5);

      setSocketOrdCreLoad(true);
      socketConnection.emit("createOrder", data);
      createCopyUserTrade(data) // create copy order      
      return false;
    }
    else {
      toast({ type: "error", message: "Please enter valid values!" });
      return false;
    }  

  }


  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  async function createCopyUserTrade(data)
  {
    const getcopy_users = {
      url: `${Config.V1_API_URL}copyTrade/getAllCopyUsers`,
      method: "POST",
      data: {trader_id:myProfile._id},
    };
    const copy_user_response = await makeRequest(getcopy_users);    
    if (copy_user_response.data) {
      
      let ticker_call_options = copy_user_response.data.filter(ticker => {
        if (ticker.selected_pairs.includes(data.pair)) {
          return ticker;
        }
      });      

        const params = {
              url: `${Config.V1_API_URL}copyTrade/createOrder`,
              method: "POST",
              data: { leader_details:data,
              copy_user_details:ticker_call_options},
            };
            const response = await makeRequest(params);
            if (response.status && response.Msg) {
              //console.log('resssss....',response)
              toast({ type: "success", message: 'Copy user order created successfully' });
            }
            else
            {
              toast({ type: "error", message: "Please try again later" });
            }
    }
    else
    {
      toast({ type: "error", message: "Copy User Not Found" });
    }    
  };

  function submitTrade() {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    const orderResponse = calculateValues(orderValue.type, "orderPlace");
    if (!userId) {
      toast({ type: "error", message: "Please login to continue" });
      return false;
    }
    if (orderResponse) {
      let getStop = 0;
      let formValue = orderValue;
      if (formValue.orderType == "stop") {
        getStop = formValue.stopPrice.toString();
        if (
          formValue.stopPrice == "" ||
          formValue.stopPrice < 0 ||
          isNaN(formValue.stopPrice) ||
          getStop.indexOf("e") > -1
        ) {
          toast({
            type: "error",
            message: "Please enter valid stop price!",
          });
          return false;
        }
      }
      if (orderValue.type == "buy") {
        if (
          parseFloat(formValue.total) > userTradeDetails.toBalance ||
          userTradeDetails.toBalance < 0.00000001
        ) {
          toast({ type: "error", message: "Insufficient balance" });
          return false;
        }
      } else {
        if (
          userTradeDetails.fromBalance < parseFloat(formValue.amount) ||
          userTradeDetails.fromBalance < 0.00000001
        ) {
          toast({ type: "error", message: "Insufficient balance" });
          return false;
        }
      }
      if (formValue.orderType == "market") {
        const countOrders =
          formValue.type == "buy"
            ? pairDetails.sellOrders.length
            : pairDetails.buyOrders.length;
        if (countOrders == 0) {
          toast({
            type: "error",
            message:
              "There is No Active Orders Available on " +
              (formValue.type == "buy" ? "Sell" : "Buy"),
          });
          return false;
        }
      }
      if (formValue.orderType != "market" && orderCreate == 0) {
        const curOrderPrice = parseFloat(formValue.price);
        const curMarketPrice = parseFloat(pairDetails.price);
        const curPerPrice = (curMarketPrice * 5) / 100;
        let text = "";
        if (
          formValue.type == "buy" &&
          curOrderPrice >= curMarketPrice + curPerPrice
        ) {
          text = "Buy Order Price is Greater Than 5% of Market Price";
        }
        if (
          formValue.type == "sell" &&
          curOrderPrice < curMarketPrice - curPerPrice
        ) {
          text = "Sell Order Price is Less Than 5% of Market Price";
        }
        setPopupText(text);
        if (text != "") {
          orderCreateType = formValue.type;
          if (window.confirm(text) == true) {
            orderCreate = 1;
            submitTrade();
            return false;
          } else {
            return false;
          }
        }
      }
      orderCreate = 0;
      createdOrder = 1;
      let data = {};
      data.amount = parseFloat(formValue.amount);
      data.price = parseFloat(formValue.price);
      data.stopPrice = parseFloat(getStop);
      data.pair = pairDetails._id;
      data.orderType = formValue.orderType;
      data.type = formValue.type;
      data.userId = userId;

      setSocketOrdCreLoad(true);
      socketConnection.emit("createOrder", data);
      return false;
    }
    else {
      toast({ type: "error", message: "Please enter valid values!" });
      return false;
    }
  }

  function roundValues(num, precision) {
    if (num.toString().indexOf("e") > -1) {
      num = num.toLocaleString("fullwide", { useGrouping: false });
    }
    var num1 = num.toString().split(".");
    var num2 = num1[0];
    if (num1.length == 2) {
      num2 = num2 + "." + num1[1].substring(0, precision);
    }
    return parseFloat(num2).toFixed(precision);
  }

  function percentageChange(orderType, percentage) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    // orderValue = orderType == "buy" ? orderData.type : orderData.type;
    let getPrice = (orderValue.price && +orderValue.price) ? orderValue.price : 0;
    tradeIndex[orderType] = percentage;
    settradeIndex(tradeIndex);

    if (getPrice == 0) {
      const mPrice = getMarketOrderPrice(orderValue);
      orderValue.price = mPrice;
    }

    if (
      (userTradeDetails.toBalance > 0 && orderType == "buy") ||
      (userTradeDetails.fromBalance > 0 && orderType == "sell")
    ) {
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

      if (+orderData.price > 0) {
        orderData.amount =
          orderType == "buy"
            ? roundValues(
              (+userTradeDetails.toBalance * +percentage) /
              (+orderData.price * 100),
              pairDetails.fromCurrency.siteDecimal
            )
            : roundValues(
              (+userTradeDetails.fromBalance * +percentage) / 100,
              pairDetails.fromCurrency.siteDecimal
            );
      }
      else {
        orderData.amount = 0;
      }
    }
    else {
      orderData.price = 0;
      orderData.amount = 0;
      orderData.total = 0;
    }
    setOrderData(orderData);
    calculateValues(orderData.amount, "amount");
  }

  function setOrderDataBefore(OrderDataVal = {}) {
    let amountDecimal = pairDetails.amountDecimal > -1 ? pairDetails.amountDecimal : 2;
    let priceDecimal = pairDetails.priceDecimal > -1 ? pairDetails.priceDecimal : 2;
    let totalDecimal = pairDetails.totalDecimal > -1 ? pairDetails.totalDecimal : 2;

    if(OrderDataVal.stopPrice) {
      OrderDataVal.stopPrice = decimalCorrection({val: OrderDataVal.stopPrice, decimal: priceDecimal});
    }

    if(OrderDataVal.price) {
      OrderDataVal.price = decimalCorrection({val: OrderDataVal.price, decimal: priceDecimal});
    }

    if(OrderDataVal.amount) {
      OrderDataVal.amount = decimalCorrection({val: OrderDataVal.amount, decimal: amountDecimal});
    }

    if(OrderDataVal.total) {
      OrderDataVal.total = decimalCorrection({val: OrderDataVal.total, decimal: totalDecimal});
    }

    setOrderData(OrderDataVal);
  }

  function calculateValuesType(placeValue, placeType, orderDataRestore = {}, extData = {}) {
    let amountDecimal = pairDetails.amountDecimal > -1 ? pairDetails.amountDecimal : 2;
    let priceDecimal = pairDetails.priceDecimal > -1 ? pairDetails.priceDecimal : 2;
    let totalDecimal = pairDetails.totalDecimal > -1 ? pairDetails.totalDecimal : 2;

    if(placeType == "price" || placeType == "stopPrice") {
      placeValue = toFixedWithoutRound({val:placeValue, decimal: priceDecimal});
    }
    else if(placeType == "amount") {
      placeValue = toFixedWithoutRound({val:placeValue, decimal: amountDecimal});
    }
    else if(placeType == "total") {
      placeValue = toFixedWithoutRound({val:placeValue, decimal: totalDecimal});
    }

    calculateValues(placeValue, placeType, orderDataRestore = {}, extData = {})
  }

  function calculateValues(placeValue, placeType, orderDataRestore = {}, extData = {}) {
    const {
      priceChange = false
    } = extData;
    let orderValue = JSON.parse(JSON.stringify(orderData));

    if (Object.keys(orderDataRestore).length > 0) {
      orderValue = orderDataRestore;
    }

    if (placeType == "stopPrice") {
      orderValue.stopPrice = placeValue;
      setOrderDataBefore(orderValue);
      return false;
    }
    let getAmount =
      placeType == "amount"
        ? parseFloat(placeValue)
        : orderValue.amount > 0
          ? parseFloat(orderValue.amount)
          : 0;
    let getPrice =
      placeType == "price"
        ? parseFloat(placeValue)
        : orderValue.price > 0
          ? parseFloat(orderValue.price)
          : 0;

    let orderPrice = getPrice;
    if (orderValue.orderType == "market" && priceChange === false) {
      if (
        (orderValue.type == "buy" && pairDetails.sellOrders.length > 0) ||
        (orderValue.type == "sell" && pairDetails.buyOrders.length > 0)
      ) {
        orderPrice =
          orderValue.type == "buy"
            ? pairDetails.sellOrders[0]._id
            : pairDetails.buyOrders[0]._id;
      } else {
        orderPrice = +pairDetails.price;
      }
    }

    if (orderPrice == "" || isNaN(orderPrice) || orderPrice < 0) {
      orderPrice = pairDetails.price;
    }

    orderValue.price = orderPrice;

    if (
      isNaN(getAmount) ||
      getAmount < 0
    ) {
      orderValue.amount = placeType == "amount" ? "" : parseFloat(orderValue.amount);
      orderValue.total = "";
      setOrderDataBefore(orderValue);
      return false;
    }
    else if (
      isNaN(orderPrice) ||
      orderPrice < 0
    ) {
      orderValue.price = placeType == "price" ? "" : parseFloat(orderValue.price);
      orderValue.total = "";
      setOrderDataBefore(orderValue);
      return false;
    } else {

      let total =
        placeType == "total"
          ?
            parseFloat(placeValue)
          :
            (parseFloat(getAmount) > 0 ? parseFloat(getAmount) : 0)
              *
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
            orderValue.total = total;
            setOrderDataBefore(orderValue);
            return false;
          } else {
            orderValue.amount = parseFloat(getAmount);
            orderValue.price = parseFloat(orderPrice);
            orderValue.total = total;

            console.log({total, orderValue}, '223eeqfeqf');
            setOrderDataBefore(orderValue);
            return true;
          }
        }
        else {
          orderValue.amount = +parseFloat(getAmount);
          orderValue.price = +parseFloat(orderPrice);
          orderValue.total = +parseFloat(total);
          setOrderDataBefore(orderValue);
          return true;
        }
      }
      else {
        if(isNaN(total) == true) {
          orderValue.amount = placeType == "amount" ? placeValue : "";
          orderValue.total = "";
          orderValue.price = placeType == "price" ? placeValue : (orderValue && orderValue.price) ? parseFloat(orderValue.price) : "";
        }
        else if (total != 0 && total != "") {
          // this.notify.showError("Invalid Total!");
          // toast({ type: "error", message: "Invalid Total!" });
          orderValue.amount = placeType == "amount" ? placeValue : "";
          orderValue.total = "";
          orderValue.price = placeType == "price" ? placeValue : "";
        } else {
          orderValue.amount = placeType == "amount" ? placeValue : (orderValue && orderValue.amount) ? parseFloat(orderValue.amount) : "";
          orderValue.total = "";
          orderValue.price = placeType == "price" ? placeValue : (orderValue && orderValue.price) ? parseFloat(orderValue.price) : "";
        }
        setOrderDataBefore(orderValue);
        return false;
      }
    }
  }

  async function orderDetail(orderId) {
    try {
      // const params = {
      //   url: `${Config.V2_API_URL}trade/getOrderDetail`,
      //   method: "POST",
      //   data: { orderId: orderId },
      // };
      // const response = await makeRequest(params);
      // if (response.status && response.Msg) {
      //   // toast({ type: "success", message: response.Msg });
      // } else {
      //   // toast({ type: "error", message: response.Msg });
      // }
    } catch (err) { }
  }

  async function cancelOrder(orderId) {
    try {
      const params = {
        url: `${Config.V1_API_URL}trade/cancelOrder`,
        method: "POST",
        data: { orderId: orderId },
      };
      const response = await makeRequest(params);
      if (response.status && response.Msg) {
        toast({ type: "success", message: response.Msg });
      } else {
        toast({ type: "error", message: response.Msg });
      }
    } catch (err) { }
  }
  async function cancelCopyTradeOrder(copyTradeID){
    try{
        const getcopy_users = {
          url: `${Config.V1_API_URL}copyTrade/getCopyUserTrade`,
          method: "POST",
          data: {copyTradeID:copyTradeID},
        };
        const copy_user_response = await makeRequest(getcopy_users);    
        if (copy_user_response.data) {
          const params = {
            url: `${Config.V1_API_URL}copyTrade/cancelOrder`,
            method: "POST",
            data: { cancelOrderDetails: copy_user_response.data },
          };
          const response = await makeRequest(params);
          if (response.status && response.Msg) {
            toast({ type: "success", message: response.Msg });
          } else {
            toast({ type: "error", message: response.Msg });
          }
        }

    }
    catch(e){
      console.log(e);
    }
  };

  function getMarketOrderPrice(orderValue, pairDet = {}) {
    if (pairDet.sellOrders == undefined) {
      pairDet = pairDetails;
    }
    let orderPrice = orderValue.price;
    if (
      (orderValue.type === "buy" && pairDet.sellOrders.length > 0) ||
      (orderValue.type === "sell" && pairDet.buyOrders.length > 0)
    ) {
      orderPrice =
        orderValue.type === "buy"
          ? pairDet.sellOrders[0]._id
          : pairDet.buyOrders[0]._id;
    } else {
      orderPrice = +pairDet.price;
    }
    return orderPrice;
  }

  function setType(type) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    orderValue.type = type;
    const mPrice = getMarketOrderPrice(orderValue);
    if ((mPrice && orderValue.price == "") || (orderValue.orderType === "market")) { }
    if (mPrice) {
      orderValue.price = mPrice;
      calculateValues(mPrice, "price", orderValue);
    }
    setOrderData(orderValue);
  }

  function setOrderType(type) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    orderValue.orderType = type;
    const mPrice = getMarketOrderPrice(orderValue);
    if ((mPrice && orderValue.price == "") || (orderValue.orderType === "market")) { }
    if (mPrice) {
      orderValue.price = mPrice;
      calculateValues(mPrice, "price", orderValue);
    }
    setOrderData(orderValue);
  }

  async function getMarkets() {
    try {
      const params = {
        url: `${Config.V1_API_URL}trade/getMarketsTab?exchangeType=SPOT`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setMarketList(response.data);
      }
    } catch (err) { }
  }

  function setPrice(price) {
    let orderValue = JSON.parse(JSON.stringify(orderData));
    orderValue.price = price;
    if (orderValue.amount > 0) {
      calculateValues(price, "price", orderValue);
    } else {
      setOrderData(orderValue);
    }
  }

  async function getPairDetails() {
    try {
      const params = {
        url: `${Config.V1_API_URL}trade/checkPair`,
        method: "POST",
        data: { pair: pairName },
      };
      const response = await makeRequest(params);
      if (response.status && response.Message) {
        if (pairName == undefined && response.Message.pair) {
          navigate("/spot/" + response.Message.pair);
        }
        else {
          if (userId != null) {
            if (socketConnection != null) {
              let userObj = {
                userId: userId,
                pairId: response.Message._id,
                fromCurn: response.Message.fromCurrency.currencyId,
                toCurn: response.Message.toCurrency.currencyId
              };
              socketConnection.emit('userEmit', userObj);
            }
          }
          pairData = response.Message;
          setPairDetails(response.Message);
          afterPairDetailChange(response.Message);
        }
      }
      else {
        const params = {
          url: `${Config.V1_API_URL}trade/checkPair`,
          method: "POST",
          data: { pair: "" },
        };
        const response = await makeRequest(params);
        if (response.status && response.Message && response.Message.pair) {
          navigate("/spot/" + response.Message.pair);
        }
        else {
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
          calculateValues(mPrice, "price", orderDataCopy, { priceChange: true });
        }
        setOrderData(orderDataCopy);
      }
    }
  }

  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= recordsPerPage) {
      setCurrentPage_tradeHis(newCurrentPage);
      getPagination(newCurrentPage)
    }
  }

  async function getPagination(
    newCurrentPage
  ) {
    try {
      const data = {
        limit: recordsPerPage,
        offset: recordsPerPage * (newCurrentPage - 1)
      }
      const params = {
        url: `${Config.V2_API_URL}trade/profit/list`,
        method: "POST",
        body: data
      };
      const response = await makeRequest(params);
      if (response.status && response.list) {
        userTradeDetails.tradeHistory = response.list;
        setUserTradeDetails(userTradeDetails);
        loadSocket();
      }
    } catch (err) { }
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
  //         url: `${Config.V2_API_URL}trade/profit/list`,
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

  useEffect(() => {
    if (pairDetails && pairDetails.price) {
      if (orderData && !orderData.price) {
        let orderDataCopy = Object.assign(orderData, {});
        orderDataCopy.price = pairDetails.price;
        calculateValues(pairDetails.price, "price", orderDataCopy);
        setOrderData(orderDataCopy);
      }
    }
  }, [pairDetails]);

  useEffect(() => {
    getPairDetails();
    $(".status_change .dropdown-item").click(function () {
      var getStatusText = $(this).text();
      $(this)
        .closest(".status_dropdown")
        .find(".status__btn")
        .text(getStatusText);
      var generateStatusClass = `${$(this).attr("data-class")}-status`;
      $(this)
        .closest(".status_dropdown")
        .attr("data-color", `${generateStatusClass}`);
    });
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      $(".trading-table-total-height li").mouseenter(function () {
        $(this).addClass("divider");
      });
      $(".trading-table-total-height li").mouseleave(function () {
        $(this).removeClass("divider");
      });
    });
  }, []);

  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div>
        <div className='spot-page-top-banner'>
          <div className='container-fluid p-0 overflow-hidden'>
            <div className='col-lg-12 mx-auto trading-page-box'>
              <div className='row p-0'>
                <div className='col-lg-9 trading-page-box-left-inner-section pe-lg-0'>
                  <PairListAndSearch
                    decimalValue={decimalValue}
                    pairName={pairName}
                    pairDetails={pairDetails}
                    marketList={marketList}
                    toCurrencySymbol={(pairDetails && pairDetails.toCurrency) ? pairDetails.toCurrency.currencySymbol : ''}
                  />
                  <div className=''>
                    <div className='trading-inner-right-section'>
                      {pairDetails && pairDetails.pair &&
                        <div id="tradingviewwidget">
                          {/* className="light-new-widget" */}
                          {pairName && <TradingView
                            symbol={pairDetails.pair.split('_').join('/')}
                            theme={props.theme}
                          />}
                        </div>
                      }
                      <MyOrders
                        myProfile={myProfile}
                        cancelOrder={cancelOrder}
                        cancelCopyTradeOrder = {cancelCopyTradeOrder}
                        orderDetail={orderDetail}
                        userTradeDetails={userTradeDetails}
                        setCurrentPage_tradeHis={setCurrentPage_tradeHis}
                        currentPage_tradeHis={currentPage_tradeHis}
                        recordsPerPage={recordsPerPage}
                        getPagination={getPagination}
                        pageChange={pageChange}
                        decimalValue={decimalValue}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 trading-page-box-right-inner-section'>
                  <div className="row">
                    <div className="col-lg-6 px-lg-0">

                      <div>
                        <div className='p-0 trading-table-total-height'>
                          <div className="d-flex flex-row trading-page-top-section-2 align-items-center top-heading-total-height">
                            <div className="ps-2">
                              <p className="trade-text-5 mb-0">Orderbook</p>
                            </div>
                            <div className="ms-auto orderbook-grid-tabs">
                              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation" onClick={() => setOrderListType('buy')}>
                                  <button className="nav-link" id="pills-grid1-tab" data-bs-toggle="pill" data-bs-target="#pills-grid1" type="button" role="tab" aria-controls="pills-grid1" aria-selected="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12">
                                      <g id="Rectangle_9" data-name="Rectangle 9" fill="none" stroke="#20b958" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="12" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="11" fill="none" />
                                      </g>
                                      <g id="Rectangle_10" data-name="Rectangle 10" transform="translate(8 5) rotate(-90)" fill="none" stroke="#b3b7c2" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="12" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="11" fill="none" />
                                      </g>
                                      <g id="Rectangle_11" data-name="Rectangle 11" transform="translate(8 12) rotate(-90)" fill="none" stroke="#b3b7c2" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="12" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="11" fill="none" />
                                      </g>
                                    </svg>
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation" onClick={() => setOrderListType('sell')}>
                                  <button className="nav-link" id="pills-grid2-tab" data-bs-toggle="pill" data-bs-target="#pills-grid2" type="button" role="tab" aria-controls="pills-grid2" aria-selected="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12">
                                      <g id="Rectangle_9" data-name="Rectangle 9" fill="none" stroke="#ff5a5a" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="12" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="11" fill="none" />
                                      </g>
                                      <g id="Rectangle_10" data-name="Rectangle 10" transform="translate(8 5) rotate(-90)" fill="none" stroke="#b3b7c2" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="12" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="11" fill="none" />
                                      </g>
                                      <g id="Rectangle_11" data-name="Rectangle 11" transform="translate(8 12) rotate(-90)" fill="none" stroke="#b3b7c2" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="12" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="11" fill="none" />
                                      </g>
                                    </svg>
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation" onClick={() => setOrderListType('all')}>
                                  <button className="nav-link active" id="pills-grid3-tab" data-bs-toggle="pill" data-bs-target="#pills-grid3" type="button" role="tab" aria-controls="pills-grid3" aria-selected="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12">
                                      <g id="Rectangle_5" data-name="Rectangle 5" transform="translate(8)" fill="none" stroke="#b3b7c2" strokeLinecap="round" strokeWidth="1">
                                        <rect width="12" height="5" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="11" height="4" fill="none" />
                                      </g>
                                      <g id="Rectangle_7" data-name="Rectangle 7" transform="translate(8 7)" fill="none" stroke="#b3b7c2" strokeLinecap="round" strokeWidth="1">
                                        <rect width="12" height="5" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="11" height="4" fill="none" />
                                      </g>
                                      <g id="Rectangle_6" data-name="Rectangle 6" transform="translate(0 7)" fill="none" stroke="#20b958" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="5" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="4" fill="none" />
                                      </g>
                                      <g id="Rectangle_8" data-name="Rectangle 8" fill="none" stroke="#ff5a5a" strokeLinecap="round" strokeWidth="1">
                                        <rect width="5" height="5" rx="0.5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="4" height="4" fill="none" />
                                      </g>
                                    </svg>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className='trading-page-top-section-3 '>
                            <div className='trading-table-left-section progress-bar-bg-color'>
                              <div className="d-flex flex-row mb-1 mobile-justify-content orderbook-table-heading-section border-top-0">
                                <div className="progress-table-1"><span className='orderbook-text-1'>Price({pairDetails.toCurrency && pairDetails.toCurrency.currencySymbol})</span></div>
                                <div className="progress-table-2"><span className='orderbook-text-1'>Amount({pairDetails.fromCurrency && pairDetails.fromCurrency.currencySymbol})</span></div>
                                <div className="progress-table-3"><span className='orderbook-text-1'>Total({pairDetails.toCurrency && pairDetails.toCurrency.currencySymbol})</span></div>
                              </div>
                              <OrderBook
                                clickOrderBook={clickOrderBook}
                                decimalValue={decimalValue}
                                orderListType={(orderListType === "all" || orderListType === "sell") ? "sell" : "buy"}
                                // viewOrderList= {pairDetails.sellOrders}
                                // viewOrderList= {(orderListType === "all" || orderListType === "sell") ? pairDetails.sellOrders : pairDetails.buyOrders}
                                viewOrderList={
                                  pairDetails
                                    ?
                                    (orderListType === "all" || orderListType === "sell")
                                      ?
                                      pairDetails.sellOrders ? pairDetails.sellOrders.slice(0, orderListType === "all" ? 9 : 25).reverse() : []
                                      :
                                      pairDetails.buyOrders ? pairDetails.buyOrders : []
                                    :
                                    []
                                }
                                viewLimit={orderListType === "all" ? 9 : 25}
                                pairDetails={pairDetails}
                                // reverse={(orderListType === "all" || orderListType === "sell") ? "yes" : "no"}
                                reverse={"no"}
                              />
                            </div>
                            {orderListType == "all" &&
                              <div className="d-flex flex-row orderbook-table-heading-section">
                                {pairDetails ? <div className="ps-2">
                                  <span className={`trade-text-5 ${(pairDetails.lastPrice) > 0 ? ((pairDetails.lastPrice) < (pairDetails.price) ? 'color-green' : 'color-red') : ''}`}>
                                    {decimalValue((pairDetails.price) ? pairDetails.price : 0, pairDetails.priceDecimal)}
                                  </span>
                                </div> : ""}
                              </div>
                            }
                            {orderListType == "all" &&
                              <div className='trading-table-left-section progress-bar-bg-color '>
                                <OrderBook
                                  clickOrderBook={clickOrderBook}
                                  decimalValue={decimalValue}
                                  orderListType={"buy"}
                                  viewOrderList={pairDetails.buyOrders}
                                  viewLimit={10}
                                  pairDetails={pairDetails}
                                  reverse={"no"}
                                />
                              </div>
                            }
                          </div>
                        </div>
                        {pairDetails && pairDetails.fromCurrency &&
                          <RecentOrder
                            setPrice={setPrice}
                            decimalValue={decimalValue}
                            type={orderData.orderType}
                            fromCurrency={pairDetails.fromCurrency.currencySymbol}
                            toCurrency={pairDetails.toCurrency.currencySymbol}
                            toDecimal={pairDetails.decimalValue}
                            fromDecimal={pairDetails.fromCurrency.siteDecimal}
                            tradeHistory={pairDetails.tradeHistory}
                          />}
                      </div>

                    </div>
                    <div className="col-lg-6 place-order-section-top px-lg-0">
                      <TradeForm
                        setType={setType}
                        myProfile={myProfile}
                        setPrice={setPrice}
                        submitTrade={submitTrade}
                        submitCopytrade = {submitCopytrade}
                        pairDetails={pairDetails}
                        makerFee={pairDetails.makerFee}
                        takerFee={pairDetails.takerFee}
                        setOrderType={setOrderType}
                        fromBalance={userTradeDetails.fromBalance}
                        toBalance={userTradeDetails.toBalance}
                        calculateValues={calculateValues}
                        calculateValuesType={calculateValuesType}
                        percentageChange={percentageChange}
                        tradeIndex={tradeIndex}
                        orderData={orderData}
                        decimalValue={decimalValue}
                        fromCurrencyId={pairDetails && pairDetails.fromCurrency ? pairDetails.fromCurrency._id : ""}
                        toCurrencyId={pairDetails && pairDetails.toCurrency ? pairDetails.toCurrency._id : ""}
                        fromCurrency={pairDetails && pairDetails.fromCurrency ? pairDetails.fromCurrency.currencySymbol : ""}
                        toCurrency={pairDetails && pairDetails.toCurrency ? pairDetails.toCurrency.currencySymbol : ""}
                        toDecimal={pairDetails.decimalValue}
                        fromDecimal={pairDetails && pairDetails.fromCurrency ? pairDetails.fromCurrency.siteDecimal : ""}
                        tradeHistory={pairDetails.tradeHistory}
                        socketOrdCreLoad={socketOrdCreLoad}
                        userTradeDetails={userTradeDetails}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}

    </div>
  );
}
