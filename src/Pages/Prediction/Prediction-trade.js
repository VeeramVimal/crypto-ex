import React, { useState, useEffect } from "react";
import "../../assets/style.css";
import { FaAngleDoubleDown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { TbLink, TbCircleArrowDownFilled, TbCircleArrowUpFilled } from "react-icons/tb";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import $ from "jquery";
import { Range, getTrackBackground } from "react-range";
import ReactTooltip from "react-tooltip";
import TradingView from './tradeChart/trading-view';
import bullbear from '../../assets/images/bull-bear-article.png';
import Coin from "../../assets/images/coin-game.png";
import { makeRequest } from '../../core/services/v1/request'
import Config from '../../core/config'
import { useContextData } from "../../core/context";
import axios from "axios";
import { toast } from "../../core/lib/toastAlert";
import Pagination from 'react-responsive-pagination';
import '../../pagination.css';
import moment from "moment";
import socketIOClient from "socket.io-client";

let pairData = {};

export default function Prediction(props) {
  const multiplierRange = [
    { value: 0, label: 500 },
    { value: 1, label: 750 },
    { value: 2, label: 1000 }
  ]


  const values = [500, 750, 1000];
  const { myProfile } = useContextData();
  const [wager, setWager] = useState(0)
  const [direction, setDirection] = useState('Bull')
  const [errorMessage, setErrorMessage] = useState('')
  const [bustPrice, setBustPrice] = useState([0.00]);


  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeBets, setActiveBets] = useState([]);
  const [userId, setUserId] = useState('');
  //==============Socket Io====
  const [socketConnection, setSocketConnection] = useState(null);
  const [apiMarketPrice, setMarketPrice] = useState(0);
  const [highPrice24h, setHighPrice24h] = useState([]);
  const [lowPrice24h, setLowPrice24h] = useState([]);
  const [turnover24h, setTurnover24h] = useState([]);
  const [getUserGamePrediction, setGetUserGamePrediction] = useState([]);
  const [closeUserPrediction, setCloseUserPrediction] = useState([]);
  const [userGameWalletBal, setUserGameWalletBal] = useState(null)
  const [flatFeeCalculation, setFlatFeeCalculation] = useState(null)
  const [exactFeeAmt, setExactFeeAmt] = useState(null);
  const [playerRange, setPlayerRange] = useState([]);
  const [selectedRange, setSelectedRange] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const [activeBetData, setActiveBetData] = useState([]);
  const [closeBetData, setCloseBetData] = useState([]);

  const [activeBetTotal, setactiveBetTotal] = useState();
  const [closeBetTotal, setCloseBetTotal] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loaderStatus, setLoaderStatus] = useState(false);
  //const [clickedButton, setClickedButton] = useState('WagerBtn');

  //** user Id fetch to using useEffect */
  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      if (myProfile && myProfile._id) {
        setUserId(myProfile._id);
      }
    }
  }, [myProfile]);

  // socket load //
  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      if (socketConnection != null) {
        loadSocket();
      }
    }
  }, [socketConnection, playerRange, bustPrice, wager]);




  //**  pagination functionalities */
  const noOfPages = Math.ceil(activeBetTotal / recordsPerPage);
  // console.log("noOfPages--t--",noOfPages);
  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  };
  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
      setCurrentPage(newCurrentPage);
      //getPagination(newCurrentPage)
    }
  };

  const payoutMultiplierData = async (index) => {
    // console.log("payoutMultiplierData ---t---",index);
    if (index) {
      return values[index];
    } else return values[currentStepIndex]
  }

  const bustPriceCalc = async (newBustVal, index) => {
    // if (wager)
    let payoutMultiplier = await payoutMultiplierData(index);
    let newBustPrice = newBustVal ? (newBustVal * payoutMultiplier) : (wager * payoutMultiplier);
    let recentBust = newBustVal ? (newBustVal / newBustPrice) : (wager / newBustPrice);
    let findBitAmt = apiMarketPrice * recentBust;
    let total, val = "", newFlatFee;
    if (direction == 'Bull') {
      total = apiMarketPrice - findBitAmt;
    } else {
      total = apiMarketPrice + findBitAmt;
    }
    if (isNaN(Number(total)) || total == 0 || total == "") {
      val = 0.00;
    } else {
      val = total;
    };
    if (newBustVal == "") setBustPrice(0)
    setBustPrice(Number(val).toFixed(2));
  }

  //   const getPagination = async (page) => {
  //     var userId = "";
  //     if (myProfile) {
  //         userId = myProfile?._id;
  //     }
  //     try {
  //         setLoaderStatus(false);
  //         const data = {
  //             limit: recordsPerPage,
  //             offset: recordsPerPage * (page - 1),
  //             userId: userId,
  //             startDate: startDate ? startDate : "",
  //             endDate: endDate ? endDate : "",
  //         };
  //         const params = {
  //             method: "POST",
  //            url: `${Config.BEAR_AND_BULL_V1_API_URL}bear_bull/userGamePrediction`,
  //             body: data,
  //         }
  //         const response = await makeRequest(params);
  //         if (response.data.predictionStatus == 0) {
  //           var activeBetStatus = response.data;
  //           console.log("activeBet---uu--",activeBetStatus);
  //             // var loanData = response.data.loanHistory;
  //             // setLoanHistory(response.data.loanHistory);
  //             // setTotalLoan(response.data.total);
  //             // if (loanData?.length > 0) setLoaderStatus(true);
  //             // else if (loanData?.length == 0) setLoaderStatus(true);
  //             // else setLoaderStatus(false);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };


  const betDataSeperated = async () => {
    if (getUserGamePrediction && getUserGamePrediction?.length > 0) {
      let activeTable = await getUserGamePrediction.filter(
        (activeData) => activeData.predictionStatus == 0);
      let closeTable = await getUserGamePrediction.filter(
        (activeData) => activeData.predictionStatus == 1);
      setActiveBetData(activeTable);
      setactiveBetTotal(activeTable.length);
      setCloseBetData(closeTable);
      setCloseBetTotal(closeTable.length);
    }
  }
  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      betDataSeperated();
    }
  }, [getUserGamePrediction?.length])
  //** render calculation *//

  //===============For Click function=================//
  const handleHalfButtonClick = async () => {
    //setClickedButton('halfBtn');
    let decrementedValue = wager / 2; // Wager value divided by 2
    if (decrementedValue >= 1) {
      let roundedValue = decrementedValue.toFixed(2);
      setWager(roundedValue);  // 
      setErrorMessage('');
      let payoutMultiplier = await payoutMultiplierData();
      // let payoutMultiplier = values[currentStepIndex];
      // let newBustPrice = wager * payoutMultiplier;
      // let recentBust = wager / newBustPrice;
      // let findBitAmt = apiMarketPrice * recentBust;
      // let total, val = "", newFlatFee;
      // if (direction == 'Bull') {
      //   total = apiMarketPrice - findBitAmt;
      // } else {
      //   total = apiMarketPrice + findBitAmt;
      // }
      // if (isNaN(Number(total)) || total === 0 || total == "" ) {
      //   val = 0.00;
      // } else {
      //   val = total;
      // }
      // setBustPrice(Number(val).toFixed(2));

      await bustPriceCalc();
      //======Fee Calculcation========
      let findNewFeeCal = decrementedValue * payoutMultiplier
      let flatFeeAmt = ((findNewFeeCal * 0.04) / 100).toFixed(1);
      setExactFeeAmt(flatFeeAmt);
      let finalFlatFee = (Number(decrementedValue) + Number(flatFeeAmt)).toFixed(1);
      setFlatFeeCalculation(finalFlatFee);
    }

  };

  const handleDoubleButtonClick = async () => {
    //setClickedButton('doubleBtn');
    let doubledValue = wager * 2;
    setWager(doubledValue);
    setErrorMessage('');
    await bustPriceCalc();
    let payoutMultiplier = await payoutMultiplierData();
    // let payoutMultiplier = values[currentStepIndex];
    // let newBustPrice = wager * payoutMultiplier;
    // let recentBust = wager / newBustPrice;
    // let findBitAmt = apiMarketPrice * recentBust;
    // let total, val = "", newFlatFee;
    // if (direction == 'Bull') {
    //   total = apiMarketPrice - findBitAmt;
    // } else {
    //   total = apiMarketPrice + findBitAmt;
    // }
    // if (isNaN(Number(total)) || total == 0 || total == "") {
    //   val = 0.00;
    // } else {
    //   val = total;
    // }
    // setBustPrice(Number(val).toFixed(2));



    //=======Fee calculation==============

    let findNewFeeCal = doubledValue * payoutMultiplier
    let flatFeeAmt = ((findNewFeeCal * 0.04) / 100).toFixed(1);
    setExactFeeAmt(flatFeeAmt);
    let finalFlatFee = (Number(doubledValue) + Number(flatFeeAmt)).toFixed(1);
    setFlatFeeCalculation(finalFlatFee);
  };

  const handleWagerChange = async (e) => {
    // setClickedButton('WagerBtn');
    let newValue = e.target.value; // target value of wager

    if (newValue.includes('.')) {
      const parts = newValue.split('.');
      if (parts.length > 2) {
        return; // Do not set the value if it contains multiple dots
      }
    }
    setWager(newValue);
    await bustPriceCalc(newValue);
    var payoutMultiplier = await payoutMultiplierData();
    // console.log("payoutMultiplier==========", payoutMultiplier);
    // var payoutMultiplier = values[currentStepIndex];
    let newBustPrice = newValue * payoutMultiplier;
    // let recentBust = newValue / newBustPrice;
    // let findBitAmt = apiMarketPrice * recentBust;
    // let total, val = "", newFlatFee;
    // if (direction === 'Bull') {
    //   total = apiMarketPrice - findBitAmt;
    // } else {
    //   total = apiMarketPrice + findBitAmt;
    // }
    // if (isNaN(Number(total)) || total === 0 || total == "") {
    //   val = 0.00;
    // } else {
    //   val = total;
    // }
    // setBustPrice(Number(val).toFixed(2));

    //=======Flat Fee Calculation===========//
    let flatFeeAmt = ((newBustPrice * 0.04) / 100).toFixed(1);
    setExactFeeAmt(flatFeeAmt);
    let finalFlatFee = (Number(newValue) + Number(flatFeeAmt)).toFixed(1);
    setFlatFeeCalculation(finalFlatFee);
  };

  //change range value 
  const handleRangeChange = async (e) => {
    //setClickedButton('range');
    let index = parseInt(e.target.value);
    if (index) setCurrentStepIndex(index);
    else setCurrentStepIndex(0);
    await bustPriceCalc(index);
    let payoutMultiplier = await payoutMultiplierData(index);
    // let payoutMultiplier = values[index];
    let newBustPrice = wager * payoutMultiplier;
    // let recentBust = wager / newBustPrice;
    // let findBitAmt = apiMarketPrice * recentBust;
    // let total = apiMarketPrice - findBitAmt;
    // let val ="";
    // if (isNaN(Number(total)) || total === 0 || total == "") {
    //   val = 0.00;
    // } else {
    //   val = total;
    // }
    // setBustPrice(Number(val).toFixed(2));



    //setBustPrice(total.toFixed(2));
    let flatFeeAmt = ((newBustPrice * 0.04) / 100).toFixed(1);
    setExactFeeAmt(flatFeeAmt);
    let finalFlatFee = (Number(wager) + Number(flatFeeAmt)).toFixed(1);
    setFlatFeeCalculation(finalFlatFee);
  };

  // const handleWagerPaste = (e) => {
  //   const pastedValue = e.clipboardData.getData("text/plain");
  //   if (isNaN(pastedValue) || Number(pastedValue) < 0) {
  //     e.preventDefault();
  //   }
  // };

  const handleWagerPaste = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (direction) => {
    setDirection(direction);
  };

  // finally Placebet function 
  async function handlePlaceBet() {
    try {
      const payload = {
        wager: wager,
        direction: direction,
        userLoginId: userId,
        currencyId: `61330e0fedf7c88c84357055`,
        multiplier: values[currentStepIndex],
        bustprice: bustPrice,
        marketPrice: apiMarketPrice,
        betFeeAmt: exactFeeAmt
      }
      //** API CALL tefdefey*/ 
      const params = {
        url: `${Config.BEAR_AND_BULL_V1_API_URL}bear_bull/gamePrediction`,
        method: 'POST',
        body: payload
      }
      const { status, data, error, message } = await makeRequest(params)
      if (status == true) {
        toast({ status: true, message: message });
        profitCalcultion();
        userGameWalletBalance();
        // Reload the current page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast({ status: false, message: message });
      }
    } catch (err) { }
  };


  /// Prediction History //
  const profitCalcultion = async () => {
    var userID = "";
    if (myProfile && myProfile._id) userID = myProfile._id;
    const payload = {
      userLoginId: userID,
      currencyId: "61330e0fedf7c88c84357055"
    }
    const params = {
      url: `${Config.BEAR_AND_BULL_V1_API_URL}bear_bull/userGamePrediction`,
      method: 'POST',
      body: payload
    }
    const response = await makeRequest(params);
    if (response.status == true) {
      if (response.data.length > 0) setActiveBets(response.data);
    }
  };

  const userGameWalletBalance = async () => {
    var userID = "";
    if (myProfile && myProfile._id) userID = myProfile._id;
    const payload = {
      userLoginId: userID,
      currencyId: "61330e0fedf7c88c84357055"
    }
    const params = {
      url: `${Config.BEAR_AND_BULL_V1_API_URL}bear_bull/userGameWalletBalance`,
      method: 'POST',
      body: payload
    }
    const response = await makeRequest(params);
    if (response.status == true) {
      let balanceAmt = response.data ? response.data.gamePredictionAmount : 0
      setUserGameWalletBal(Number(balanceAmt).toFixed(2));
    }
  };

  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      profitCalcultion();
      userGameWalletBalance();
      findFlatFee();
    }
  }, [myProfile]);

  //=================Socket Connection================
  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      let socket = socketIOClient(Config.SOCKET_URL, {
        transports: ["websocket"],
      });
      let socketUnsubscribe;

      if (socket) {
        socket.on("connect", function () {
          console.log("socket connected");
          setSocketConnection(socket);
          socketUnsubscribe = socket;
          // getMarkets();

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
    }
  }, []);



  const setListData = async () => {
    if (activeBets && activeBets.length > 0) {
      var addData = [];
      var loss = [];
      for (let resData of activeBets) {
        let checkPrc = "";
        let newBustPrice = resData.predictionAmt * resData.multiplier;
        let profitAmt = newBustPrice / resData.marketprice; //userPrediction market price
        let calProfitPrc
        if (resData.direction == 'Bull') {
          calProfitPrc = profitAmt * (apiMarketPrice - resData.marketprice);

          if (Number(resData.bustprice) == Number(apiMarketPrice)) {
            loss.push(resData);
            if (loss && loss?.length > 0) {
              if (loss[0].predictionStatus == 0) {
                await handleClick(loss[0]._id, calProfitPrc, "autoClosed");
              }
            }
          }
        } else if (resData.direction == 'Bear') {
          calProfitPrc = profitAmt * (resData.marketprice - apiMarketPrice);
          if (Number(resData.bustprice) == Number(apiMarketPrice)) {
            loss.push(resData);
            if (loss && loss?.length > 0) {
              if (loss[0].predictionStatus == 0) {
                await handleClick(loss[0]._id, calProfitPrc, "autoClosed");
              }
            }
          }
        }
        resData.profitAndLosss = calProfitPrc.toFixed(2);
        Object.assign(resData);
        addData.push(resData);
      }
      if (addData && addData?.length > 0) setGetUserGamePrediction(addData);
    }
  };
  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      if (apiMarketPrice) {
        setListData();
      }
    }
  }, [apiMarketPrice]);

  const multiplayerRangeSet = async (data) => {
    // var selectPlayerRng = [];
    // selectPlayerRng = multiplierRange.filter((ele) => ele.value == currentStepIndex);
    // setPlayerRange(selectPlayerRng);
    let payoutMultiplier = await payoutMultiplierData();

    // console.log("currentStepIndex======->", currentStepIndex);
    // payoutMultiplier = values[currentStepIndex];
    let newBustPrice = wager * payoutMultiplier;
    // console.log("newBustPrice->",newBustPrice);
    let recentBust = wager / newBustPrice;
    // console.log("recentBust->",recentBust);
    let findBitAmt = Number(data.price) * recentBust;
    let total = Number(data.price) - findBitAmt;
    setBustPrice(total.toFixed(2));

  };

  async function loadSocket() {
    // console.log("currentStepIndex",currentStepIndex);
    socketConnection.on("pairResponse", function (data) {
      // console.log("hi-------",data);
      if (data.frompair.currencyName == "Bitcoin") {
        if (data.topair.currencyName == "Tether USD") {
          setMarketPrice(data.price);
          setHighPrice24h(data.buyOrders[0]._id);
          const sellorder = data.buyOrders.reverse();
          setLowPrice24h(sellorder[0]._id.toFixed(2));
          var turnover = data.volume
          setTurnover24h(data.volume.toFixed(2));
          if (currentStepIndex) multiplayerRangeSet(data)

          // if (playerRange && currentStepIndex && playerRange?.length) {
          // }
          // payoutMultiplier = values[currentStepIndex];
          // let newBustPrice = wager * payoutMultiplier;
          // // console.log("newBustPrice->",newBustPrice);
          // let recentBust = wager / newBustPrice;
          // // console.log("recentBust->",recentBust);
          // let findBitAmt = Number(data.price) * recentBust;
          // // console.log("findBitAmt->",findBitAmt);
          // let total = Number(data.price) - findBitAmt;
          // setBustPrice(total.toFixed(2));
          //  setTurnover24h((turnover * 1000000).toLocaleString('en-US', {
          //    style: 'currency',
          //    currency: 'USD',
          //  }))
          document.title =
            data.price + " | " + data.pair.split("_").join("") + " | " + Config.SITENAME;
        }
      }
    });


  };

  const handleRangeChanges = (e) => {
    setSelectedRange(parseInt(e.target.value));
    // console.log("selectedRange",SelectedRange);
  };

  const findFlatFee = async () => {
    let payoutMultiplier = await payoutMultiplierData();
    // let payoutMultiplier = values[currentStepIndex]
    let wagerAndMultiplier = wager * payoutMultiplier;
    let flatFeeCalc = ((wagerAndMultiplier * 0.04) / 100);
    let finalFlatFeeAmt = wager + flatFeeCalc;
    setFlatFeeCalculation(finalFlatFeeAmt)
  };

  const handleClick = async (id, value, positionStr) => {
    try {
      const payload = {
        predictionId: `${id}`,
        profitAndLoss: `${value}`,
        exitPrice: `${apiMarketPrice}`,
        userLoginId: `${userId}`,
        currencyId: `61330e0fedf7c88c84357055`,
      }

      const params = {
        url: `${Config.BEAR_AND_BULL_V1_API_URL}bear_bull/userClosedBet`,
        method: 'POST',
        body: payload
      }

      const { status, data, error, message } = await makeRequest(params);
      if (positionStr == "autoClosed" && status == true) {
        toast({ status: true, message: "your Prediction Bet is auto-closed" });
        profitCalcultion();
        userGameWalletBalance();
        betDataSeperated();

      } else if (positionStr == "handleClose" && status == true) {
        toast({ status: true, message: message });
        profitCalcultion();
        userGameWalletBalance();
        betDataSeperated();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast({ status: false, message: message });
      }
    } catch (err) { }
  };


  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      $(".status_change .dropdown-item").click(function () {
        var getStatusText = $(this).text();
        $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
        var generateStatusClass = `${$(this).attr('data-className')}-status`
        $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
      })
    }
  }, []);
  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      $(document).ready(function () {
        $(".prediction-trade-settings-section .dropdown-menu").click(function (e) {
          e.stopPropagation();
        })
        $("#features-dropdown-open").click(function () {
          $(".features-dropdown-hidden").hide();
          $("#features-dropdown-open").hide();
          $("#features-dropdown-close").show();
        });
        $("#features-dropdown-close").click(function () {
          $(".features-dropdown-hidden").show();
          $("#features-dropdown-open").show();
          $("#features-dropdown-close").hide();
        });
        $("#features-chats-section-close").click(function () {
          $(".prediction-page-right-section").css("width", "0%");
          $(".prediction-page-middle-section").css("width", "87%");
        });
      });
    }
  });
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="prediction-trade-top-banner">
        <div className="container-fluid p-0">
          <div className="d-flex flex-lg-row flex-column gap-4">
            <div className="container-fluid prediction-trade-right-section p-0">
              <div className=" d-flex flex-lg-row flex-column gap-3">
                <div className="prediction-trade-right-1 pt-4">
                  <div className="d-flex flex-lg-row flex-column align-items-center mb-3">
                    <div>
                      <img className="prediction-trade-image-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="btc" />
                    </div>
                    <div>
                      <span>BTC/USDT </span>
                      <span style={{ color: "lightgreen" }}><FaAngleDoubleDown className="prediction-trade-text-1" /><span className="">{apiMarketPrice}</span></span>
                    </div>
                    <div>
                      <span className="prediction-trade-text-2 mb-0 ms-lg-3"><span className="prediction-trade-text-3">24h Volume:</span> {turnover24h} </span>
                      <span className="prediction-trade-text-2 mb-0 ms-lg-3"><span className="prediction-trade-text-3">H:</span> <span style={{ color: "lightgreen" }}>{highPrice24h}</span> </span>
                      <span className="prediction-trade-text-2 mb-0 ms-lg-3"><span className="prediction-trade-text-3">L:</span> <span style={{ color: "red" }}>{lowPrice24h}</span> </span>
                    </div>
                  </div>
                  <div id="tradingviewwidget-linechart" className="position-relative" >

                    <TradingView
                      theme={props.theme}
                    />
                  </div>
                </div>
                <div className="prediction-trade-right-2">
                  <h4 className="benefits-text-1">MANUAL</h4>
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-manual-tabs" role="tabpanel" aria-labelledby="pills-manual-tabs-tab" tabindex="0">
                      <span className="prediction-trade-text-4">WILL THE PRICE GO UP OR DOWN?</span>
                      <div className="prediction-manual-updown-tabs">
                        <ul className="nav nav-pills mb-3 nav-fill mt-2" id="pills-tab" role="tablist">
                          <li className="nav-item" role="presentation" onClick={() => handleButtonClick('Bull')}>
                            <button className="nav-link manual-active-up active" id="pills-manual-up-tab" data-bs-toggle="pill" data-bs-target="#pills-manual-up" type="button" role="tab" aria-controls="pills-manual-up" aria-selected="true"><MdKeyboardDoubleArrowUp className="prediction-trade-text-5" />Bull</button>
                          </li>
                          <li className="nav-item" role="presentation" onClick={() => handleButtonClick('Bear')}>
                            <button className="nav-link manual-active-down" id="pills-manual-down-tab" data-bs-toggle="pill" data-bs-target="#pills-manual-down" type="button" role="tab" aria-controls="pills-manual-down" aria-selected="false"><MdKeyboardDoubleArrowDown className="prediction-trade-text-5" />Bear</button>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-manual-up" role="tabpanel" aria-labelledby="pills-manual-up-tab" tabindex="0">
                          <span className="prediction-trade-text-4">BET PRICE</span>
                          <div className="input-group my-2 prediction-trade-updown-input prediction-overrall-border">
                            <span className="input-group-text"><img className="prediction-manual-coin" src={Coin} alt="coin" /></span>
                            <input type="text"
                              className="form-control"
                              value={wager}
                              aria-label="Example text with button addon"
                              aria-describedby="button-addon1"
                              onChange={handleWagerChange}
                              onKeyPress={(event) => {
                                const keyCode = event.which || event.keyCode;
                                const keyValue = String.fromCharCode(keyCode);

                                // Allow only numeric values (0-9) and the backspace key (8)
                                if (!/^[0-9\b.]+$/.test(keyValue)) {
                                  event.preventDefault();
                                }
                              }} onPaste={handleWagerPaste} />
                            <button className="prediction-updown-button" type="button" id="button-addon1" onClick={handleHalfButtonClick}>1/2</button>
                            <button className="prediction-updown-button" type="button" id="button-addon1" onClick={handleDoubleButtonClick}>x2</button>
                          </div>
                          <span className="prediction-trade-text-4">MULTIPLIER</span>
                          <div className="row align-items-center mt-2 g-2">
                            <div className="col-lg-6">
                              <div className="input-group prediction-trade-updown-input py-1 prediction-overrall-border">
                                <span className="input-group-text"><img className="prediction-manual-coin" src={Coin} alt="coin" /></span>
                                <input type="text" className="form-control" value={values[currentStepIndex]} aria-label="Example text with button addon" aria-describedby="button-addon1" disabled />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <p className="mb-0 prediction-trade-text-6">Bust Price:</p>
                              <p className="mb-0 prediction-trade-text-6">{bustPrice}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="">
                              <input
                                className="form-range-prediction"
                                onInput={handleRangeChange}
                                type="range"
                                min="0"
                                value={currentStepIndex}
                                max="2"
                                step="1"
                                list="tick-list"
                              />
                            </div>
                            <div className="d-flex flex-row-reverse ">
                              <div>
                                {values[currentStepIndex] == 500 && (
                                  <span className="prediction-trade-text-6">
                                    <span style={{ color: "#0c491d" }}>Safe</span>: x500
                                  </span>
                                )}
                                {values[currentStepIndex] == 750 && (
                                  <span className="prediction-trade-text-6">
                                    <span style={{ color: "#f2a819" }}>Moderate</span>: x750
                                  </span>
                                )}
                                {values[currentStepIndex] == 1000 && (
                                  <span className="prediction-trade-text-6">
                                    <span style={{ color: "#f23838" }}>Risk</span>: x1000
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button type="button" className="prediction-bet-button-up mt-3" disabled={wager < 1}
                            onClick={handlePlaceBet}>PLACE BET</button>
                          {wager < 1 && <p className="error-message">* Wager must be at least $1</p>}
                          <div className="mt-3">
                            <span>Flat Fee : 0.04%</span>
                          </div>
                          <div>
                            <span className="prediction-trade-text-2">We need to deduct {flatFeeCalculation} USDT while placing bet</span>
                          </div>
                          <div>
                            <span className="prediction-trade-text-2 mb-0">
                              <span className="prediction-trade-text-3">Balance:</span> {userGameWalletBal} USDT </span>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="pills-manual-down" role="tabpanel" aria-labelledby="pills-manual-down-tab" tabindex="0">
                          <span className="prediction-trade-text-4">BET PRICE</span>
                          <div className="input-group my-2 prediction-trade-updown-input prediction-overrall-border">
                            <span className="input-group-text"><img className="prediction-manual-coin" src={Coin} alt="coin" /></span>
                            <input type="text" className="form-control" value={wager} aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={handleWagerChange}
                              onKeyPress={(event) => {
                                const keyCode = event.which || event.keyCode;
                                const keyValue = String.fromCharCode(keyCode);

                                // Allow only numeric values (0-9) and the backspace key (8)
                                if (!/^[0-9\b.]+$/.test(keyValue)) {
                                  event.preventDefault();
                                }
                              }} onPaste={handleWagerPaste} />
                            <button className="prediction-updown-button" type="button" id="button-addon1" onClick={handleHalfButtonClick}>1/2</button>
                            <button className="prediction-updown-button" type="button" id="button-addon1" onClick={handleDoubleButtonClick}>x2</button>
                          </div>
                          <span className="prediction-trade-text-4">MULTIPLIER</span>
                          <div className="row align-items-center mt-2 g-2">
                            <div className="col-lg-6">
                              <div className="input-group prediction-trade-updown-input py-1 prediction-overrall-border">
                                <span className="input-group-text"><img className="prediction-manual-coin" src={Coin} alt="coin" /></span>
                                <input type="text" className="form-control" value={values[currentStepIndex]} aria-label="Example text with button addon" aria-describedby="button-addon1" disabled />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <p className="mb-0 prediction-trade-text-6">Bust Price:</p>
                              <p className="mb-0 prediction-trade-text-6"> {bustPrice}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="">

                              <input
                                className="form-range-prediction"
                                onInput={handleRangeChange}
                                type="range"
                                min="0"
                                value={currentStepIndex}
                                max="2"
                                step="1"
                                list="tick-list"
                              />
                            </div>

                            <div className="d-flex flex-row-reverse ">
                              <div>
                                {values[currentStepIndex] == 500 && (
                                  <span className="prediction-trade-text-6">
                                    <span style={{ color: "#0c491d" }}>Safe</span>: x500
                                  </span>
                                )}
                                {values[currentStepIndex] == 750 && (
                                  <span className="prediction-trade-text-6">
                                    <span style={{ color: "#f2a819" }}>Moderate</span>: x750
                                  </span>
                                )}
                                {values[currentStepIndex] == 1000 && (
                                  <span className="prediction-trade-text-6">
                                    <span style={{ color: "#f23838" }}>Risk</span>: x1000
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button type="button" className="prediction-bet-button-down mt-3" disabled={wager < 1}
                            onClick={handlePlaceBet}>PLACE BET</button>
                          {wager < 1 && <p className="error-message">* Wager must be at least $1</p>}
                          <div className="mt-3">
                            <span>Flat Fee : 0.04%</span>
                          </div>
                          <div>
                            <span className="prediction-trade-text-2">We need to deduct {flatFeeCalculation} USDT while placing bet</span>
                          </div>
                          <div>
                            <span className="prediction-trade-text-2 mb-0">
                              <span className="prediction-trade-text-3">Game Wallet Balance:</span> {userGameWalletBal} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prediction-trade-right-section-table-section">
                <div className="row justify-content-center mt-4">
                  <div className="col">
                    <div className="d-flex flex-lg-row flex-column gap-2">
                      <div>
                        <div className="prediction-bets-tabs-section">
                          <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button className="nav-link fs-14 active" id="pills-all-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-all-bets" type="button" role="tab" aria-controls="pills-all-bets" aria-selected="true">Active Bets</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link fs-14" id="pills-lucky-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-lucky-bets" type="button" role="tab" aria-controls="pills-lucky-bets" aria-selected="false">Closed Bets</button>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>

                    <div className="mt-3 tab-content" id="nav-tabContent">
                      <div className="prediction-bets-table-section tab-pane fade show active" id="pills-all-bets" role="tabpanel">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col" className="bets-table-trade-1">Date</th>
                              <th scope="col" className="bets-table-trade-2">Pair</th>
                              <th scope="col" className="bets-table-trade-3">BULL / BEAR</th>
                              <th scope="col" className="bets-table-trade-4">FEE</th>
                              <th scope="col" className="bets-table-trade-5">Entry Price</th>
                              <th scope="col" className="bets-table-trade-6">multiplier</th>
                              <th scope="col" className="bets-table-trade-7">Wager</th>
                              <th scope="col" className="bets-table-trade-8">Bust Price</th>
                              <th scope="col" className="bets-table-trade-9">P & L</th>
                              <th scope="col" className="bets-table-trade-10">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              activeBetData &&
                                activeBetData.length > 0 ?
                                activeBetData.map((active) => {

                                  return (
                                    <tr>
                                      <td className="bets-trade-tablebd-1">
                                        {moment(active.dateTime).format("DD-MM-YYYY HH:mm:ss")}
                                      </td>
                                      <td className="bets-trade-tablebd-2">BTC/USDT</td>
                                      <td className="bets-trade-tablebd-3">{active.direction}</td>
                                      <td className="bets-trade-tablebd-4">{active.feeAmount}</td>
                                      <td className="bets-trade-tablebd-5">{active.marketprice}</td>
                                      <td className="bets-trade-tablebd-6">{active.multiplier}</td>
                                      <td className="bets-trade-tablebd-7">{active.predictionAmt}</td>
                                      <td className="bets-trade-tablebd-8">{active.bustprice}</td>
                                      <td className="bets-trade-tablebd-9">{active.profitAndLosss}</td>
                                      <td className="bets-trade-tablebd-10"> <button className="prediction-updown-button m-0 fs-10" type="button" id="button-addon1" onClick={() => handleClick(active._id, active.profitAndLosss, "handleClose")}>CLOSE</button></td>
                                    </tr>
                                  )
                                })
                                : (
                                  <tr>
                                    <td colSpan="10">Data Not Found</td>
                                  </tr>
                                )
                            }

                          </tbody>
                        </table>
                        {
                          (activeBetData > recordsPerPage) && (
                            <div className="row">
                              <div className="col-lg-12 d-flex justify-content-end">
                                <Pagination className="p2p-trade-pagination"
                                  total={Math.ceil(activeBetData / recordsPerPage)}
                                  current={currentPage}
                                  onPageChange={(page) => clickPageNo(page)}
                                />
                              </div>
                            </div>
                          )
                        }
                      </div>
                      <div className="prediction-bets-table-section tab-pane fade" id="pills-lucky-bets" role="tabpanel">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col" className="bets-table-trade-1">Date</th>
                              <th scope="col" className="bets-table-trade-2">Pair</th>
                              <th scope="col" className="bets-table-trade-3">Entry Price</th>
                              <th scope="col" className="bets-table-trade-4">BEAR / Bull</th>
                              <th scope="col" className="bets-table-trade-5">FEE</th>
                              <th scope="col" className="bets-table-trade-6">multiplier</th>
                              <th scope="col" className="bets-table-trade-7">Wager</th>
                              <th scope="col" className="bets-table-trade-8">Bust Price</th>
                              <th scope="col" className="bets-table-trade-9">Exit Price</th>
                              <th scope="col" className="bets-table-trade-10">P & L</th>
                            </tr>
                          </thead>
                          <tbody>
                            {closeBetData &&
                              closeBetData.length > 0 ?
                              closeBetData.map((active) => {

                                return (
                                  <tr key={active.id}>
                                    <td className="bets-trade-tablebd-1">
                                      {moment(active.dateTime).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                    <td className="bets-trade-tablebd-2">BTC/USDT</td>
                                    <td className="bets-trade-tablebd-3">{active.marketprice}</td>
                                    <td className="bets-trade-tablebd-4">{active.direction}</td>
                                    <td className="bets-trade-tablebd-5">{active.feeAmount}</td>
                                    <td className="bets-trade-tablebd-6">{active.multiplier}</td>
                                    <td className="bets-trade-tablebd-7">{active.predictionAmt}</td>
                                    <td className="bets-trade-tablebd-8">{active.bustprice}</td>
                                    <td className="bets-trade-tablebd-9">{active.exitMarketPrice}</td>
                                    <td className="bets-trade-tablebd-10">
                                      {active.winAmt == 0 ?
                                        <span className="positive-value">{active.lossAmt}</span>
                                        :
                                        <span className="negative-value">{active.winAmt}</span>
                                      }
                                    </td>
                                  </tr>
                                )
                              })
                              : (
                                <tr>
                                  <td colSpan="10">Data Not Found</td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>
                        {
                          (closeBetData > recordsPerPage) && (
                            <div className="row">
                              <div className="col-lg-12 d-flex justify-content-end">
                                <Pagination className="p2p-trade-pagination"
                                  total={Math.ceil(closeBetData / recordsPerPage)}
                                  current={currentPage}
                                  onPageChange={(page) => clickPageNo(page)}
                                />
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}