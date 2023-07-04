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
import { makeRequest } from '../../core/services/v1/request'
import Config from '../../core/config'
import { useContextData } from "../../core/context";
import axios from "axios";
import { toast } from "../../core/lib/toastAlert";
import moment from "moment";
import socketIOClient from "socket.io-client";
let pairData = {};

export default function Prediction(props) {

  const values = [500, 750, 1000];
  const { myProfile } = useContextData();
  const [wager, setWager] = useState(10)
  const [direction, setDirection] = useState('Bull')
  const [errorMessage, setErrorMessage] = useState('')
  const [bustPrice, setBustPrice] = useState(0);
  const [flatFee, setFlatFee] = useState(0);
  const [showFlatFee, setShowFlatFee] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeBets, setActiveBets] = useState([]);
  const [userId, setUserId] = useState('');

  //==============Socket Io====
  const [socketConnection, setSocketConnection] = useState(null);
  const [apiMarketPrice, setMarketPrice] = useState([]);
  const [highPrice24h, setHighPrice24h] = useState([]);
  const [lowPrice24h, setLowPrice24h] = useState([]);
  const [turnover24h, setTurnover24h] = useState([]);
  const [getUserGamePrediction, setGetUserGamePrediction] = useState([]);
  /// Prediction History //
  const profitCalcultion = async () => {
    var userID = "";
    if (myProfile && myProfile._id) userID = myProfile._id;
    const payload = {
      userLoginId: userID
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
  }

  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      profitCalcultion();
    }
  }, [myProfile]);

  useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      if (myProfile && myProfile._id) {
        setUserId(myProfile._id);
      }
    }
  }, [myProfile])

   //=================Socket Connection================
   useEffect(() => {
    if (Config.BEAR_AND_BULL_STATUS == "Enable") {
      console.log("Config.SOCKET_URL=========", Config.SOCKET_URL);
      let socket = socketIOClient(Config.SOCKET_URL, {
        transports: ["websocket"],
      });
      let socketUnsubscribe;

      if (socket) {
        socket.on("connect", function () {
          console.log("socket connected");
          setSocketConnection(socket);
          socketUnsubscribe = socket;
          getMarkets();

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


   // socket load //
   useEffect(() => {

    if(Config.BEAR_AND_BULL_STATUS == "Enable") {
     
     if (socketConnection != null) {
       loadSocket();
     }
    }
 }, [socketConnection]);

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
               if(loss[0].predictionStatus == 0){ 
                 await handleClick(loss[0]._id, calProfitPrc, "autoClosed");
               }
             }
           }
         } else if (resData.direction == 'Bear')  {
           calProfitPrc = profitAmt * (resData.marketprice - apiMarketPrice);
           if (Number(resData.bustprice) == Number(apiMarketPrice)) {
             loss.push(resData);
             if (loss && loss?.length > 0) {
               if(loss[0].predictionStatus == 0){
                 await handleClick(loss[0]._id, calProfitPrc, "autoClosed");
                }
             }
           }
         }
          console.log("calProfitPrc---cvsacsac---",calProfitPrc);
         resData.profitAndLosss = calProfitPrc.toFixed(2);
         Object.assign(resData);
         addData.push(resData);
     }
     if (addData && addData?.length > 0) setGetUserGamePrediction(addData); console.log("addData=========", addData);
   }
 }
 useEffect(() => {
   if(Config.BEAR_AND_BULL_STATUS == "Enable"){
     if (apiMarketPrice) {
       setListData();
     }
   }
 }, [apiMarketPrice]);

 function loadSocket() {
   socketConnection.on("USDTPerpetualPairResp", function (data) {
    //  console.log("socdata=========", data);
     if (data) {
       setMarketPrice(data.marketPrice);
       setHighPrice24h(data.highPrice24h);
       setLowPrice24h(data.lowPrice24h);
       var turnover = data.turnover_24h

       setTurnover24h((turnover * 1000000).toLocaleString('en-US', {
         style: 'currency',
         currency: 'USD',
       }))
       document.title =
         data.marketPrice + " | " + data.pair.split("_").join("") + " | " + Config.SITENAME;
     }
   });
 }

  // half button click function
  const handleHalfButtonClick = () => {
    const decrementedValue = wager / 2; // Wager value divided by 2
    setWager(decrementedValue);  // 
    setErrorMessage('');
    const payoutMultiplier = values[currentStepIndex];
    const newBustPrice = wager * payoutMultiplier;
    const recentBust = wager / newBustPrice;
    const findBitAmt = apiMarketPrice * recentBust;
    let total 
    if(direction == 'Bull'){
      total = apiMarketPrice - findBitAmt;
    }else{
      total = apiMarketPrice + findBitAmt;
    }
    setBustPrice(total.toFixed(2));
    const newFlatFee = (total * 0.05).toFixed(2); // Calculate the flat fee as 5% of the bust price
    setFlatFee(newFlatFee);
  };


  // double button click function
  const handleDoubleButtonClick = () => {
    const doubledValue = wager * 2;
    setWager(doubledValue);
    setErrorMessage('');
    const payoutMultiplier = values[currentStepIndex];
    const newBustPrice = wager * payoutMultiplier;
    const recentBust = wager / newBustPrice;
    const findBitAmt = apiMarketPrice * recentBust;
    let total 
    if(direction == 'Bull'){
      total = apiMarketPrice - findBitAmt;
    }else{
      total = apiMarketPrice + findBitAmt;
    }
    setBustPrice(total.toFixed(2));
    const newFlatFee = (total * 0.05).toFixed(2); // Calculate the flat fee as 5% of the bust price
    setFlatFee(newFlatFee);
  };


  // user change wager value manually
  const handleWagerChange = (e) => {
    const newValue = e.target.value; // target value of wager
    setWager(newValue);
    const payoutMultiplier = values[currentStepIndex];
    const newBustPrice = wager * payoutMultiplier;
    const recentBust = wager / newBustPrice;
    const findBitAmt = apiMarketPrice * recentBust;
    let total 
    if(direction === 'Bull'){
      total = apiMarketPrice - findBitAmt;
    }else{
      total = apiMarketPrice + findBitAmt;      
    }
    setBustPrice(total.toFixed(2));
    const newFlatFee = (total * 0.05).toFixed(2); // Calculate the flat fee as 5% of the bust price
    setFlatFee(newFlatFee);
  };

  const handleButtonClick = (direction) => {
    setDirection(direction);
  }

  const handleFlatFeeSwitchChange = (e) => {
    setShowFlatFee(e.target.checked);
  };


  // change range value 
  const handleRangeChange = (e) => {
    const index = parseInt(e.target.value);
    setCurrentStepIndex(index);
    const payoutMultiplier = values[index];
    const newBustPrice = wager * payoutMultiplier;
    const recentBust = wager / newBustPrice;
    const findBitAmt = apiMarketPrice * recentBust;
    const total = apiMarketPrice - findBitAmt;
    setBustPrice(total.toFixed(2));
    const newFlatFee = (total * 0.05).toFixed(2); // Calculate the flat fee as 5% of the bust price
    setFlatFee(newFlatFee);
  };

  // finally Placebet function 
  async function handlePlaceBet() {
    try {
      const payload = {
        wager: wager, 
        direction: direction,
        userLoginId: userId,
        pairID:`6136485308c26b4025024ce1`, 
        multiplier : values[currentStepIndex],
        bustprice : bustPrice, 
        marketPrice : apiMarketPrice
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
      } else {
        toast({ status: false, message: message });
      }
    } catch (err) { }
  };

  /// Prediction History //
  async function getMarkets() {
    try {
      const params = {
        url: `${Config.V1_API_URL}usdt-perpetual/getMarketsTab`,
        method: "GET",
      };
      const response = await makeRequest(params);
      const marketLivePrice = response.data[0].pairs[0].marketPrice;
    } catch (err) { }
  }
 
 

  const handleClick = async (id, value, positionStr) => {
    try {
      const payload = {
        predictionId: `${id}`, 
        profitAndLoss : `${value}`,
        exitPrice : `${apiMarketPrice}`,
        userLoginId:`${userId}`, 
        pairID:`6136485308c26b4025024ce1`
      }

      const params = {
        url: `${Config.V1_API_URL}addplacebet/userClosedBet`,
        method: 'POST',
        body: payload
      }
  
      const { status, data, error, message } = await makeRequest(params);
      if (positionStr == "autoClosed" && status == true) {
        toast({ status: true, message: "your Prediction Bet is auto-closed" });
        profitCalcultion();
      } else if (positionStr == "handleClose" && status == true) {
        toast({ status: true, message: message });
        profitCalcultion();
      } else {
        toast({ status: false, message: message });
      }
    } catch (err) { }
  }

  useEffect(() => {
    if(Config.BEAR_AND_BULL_STATUS == "Enable"){
      $(".status_change .dropdown-item").click(function () {
        var getStatusText = $(this).text();
        $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
        var generateStatusClass = `${$(this).attr('data-class')}-status`
        $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
      })
    }
  }, []);
  useEffect(() => {
    if(Config.BEAR_AND_BULL_STATUS == "Enable") {
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
            <div className="prediction-trade-left-section">
              <div className="d-flex flex-row prediction-page-features-section">
                <div>
                  <TbLink className="me-1 prediction-page-text-1" /><span className="prediction-page-text-2">Crypto Futures</span>
                </div>
                <div className="ms-auto">
                  <TbCircleArrowDownFilled id="features-dropdown-close" style={{ cursor: "pointer" }} className="prediction-page-text-3" />
                  <TbCircleArrowUpFilled id="features-dropdown-open" style={{ cursor: "pointer" }} className="prediction-page-text-3" />
                </div>
              </div>
              <ul className="p-0 mt-3 features-dropdown-hidden">
                <li>
                  <div className="d-flex flex-row align-items-center prediction-features-list">
                    <div>
                      <img className="prediction-page-image-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="Futures" />
                    </div>
                    <div>
                      <span className="prediction-page-text-4">BTC</span>
                    </div>
                    <div className="ms-auto">
                      <span className="prediction-page-text-4">26.34554<MdKeyboardDoubleArrowDown className="prediction-page-text-5" style={{ color: "lightgreen" }} /></span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-row align-items-center prediction-features-list">
                    <div>
                      <img className="prediction-page-image-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="Futures" />
                    </div>
                    <div>
                      <span className="prediction-page-text-4">BTC</span>
                    </div>
                    <div className="ms-auto">
                      <span className="prediction-page-text-4">26.34554<MdKeyboardDoubleArrowDown className="prediction-page-text-5" style={{ color: "red" }} /></span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="container-fluid prediction-trade-right-section p-0">
              <div className=" d-flex flex-lg-row flex-column gap-3">
                <div className="prediction-trade-right-1 pt-4">
                  <div className="d-flex flex-lg-row flex-column align-items-center mb-3">
                    <div>
                      <img className="prediction-trade-image-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="btc" />
                    </div>
                    <div>
                      <span style={{ color: "lightgreen" }}><FaAngleDoubleDown className="prediction-trade-text-1" /><span className="">{apiMarketPrice}</span></span>
                    </div>
                    <div>
                      <span class="prediction-trade-text-2 mb-0 ms-lg-3"><span class="prediction-trade-text-3">24h Volume:</span> {turnover24h} </span>
                      <span class="prediction-trade-text-2 mb-0 ms-lg-3"><span class="prediction-trade-text-3">H:</span> <span style={{ color: "lightgreen" }}>{highPrice24h}</span> </span>
                      <span class="prediction-trade-text-2 mb-0 ms-lg-3"><span class="prediction-trade-text-3">L:</span> <span style={{ color: "red" }}>{lowPrice24h}</span> </span>
                    </div>
                    <div className="ms-lg-auto my-2 my-lg-0">
                      <div className="f-group">
                        <select className="f-control f-dropdown" placeholder="Select">
                          <option value="1" selected="selected">Tick</option>
                          <option value="2">5s</option>
                          <option value="3">10s</option>
                          <option value="4">15s</option>
                          <option value="5">20s</option>
                          <option value="6">25s</option>
                          <option value="7">30s</option>
                          <option value="8">35s</option>
                          <option value="9">40s</option>
                          <option value="10">45s</option>
                          <option value="11">50s</option>
                        </select>
                      </div>
                    </div>
                    <div className="mx-lg-3 prediction-trade-settings-section">
                      <div class="dropdown">
                        <button class="prediction-trade-tick-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                           <IoSettingsSharp />
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <div class="form-check form-switch mb-2">
                              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                              <label class="form-check-label" for="flexSwitchCheckDefault">Advanced chart</label>
                            </div>
                          </li>
                          <li>
                            <div class="form-check form-switch mb-2">
                              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                              <label class="form-check-label" for="flexSwitchCheckDefault">Show My Bets on chart</label>
                            </div>
                          </li>
                          <li>
                            <div class="form-check form-switch mb-2">
                              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                              <label class="form-check-label" for="flexSwitchCheckDefault">Show Public Bets on chart</label>
                            </div>
                          </li>
                          <li>
                            <div class="form-check form-switch">
                              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                              <label class="form-check-label" for="flexSwitchCheckDefault">Confirm Cash Out</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div id="tradingviewwidget-linechart" className="position-relative" >
                    <img id="tradingviewwidget-linechart-bg-image" src={bullbear} alt="bullbear" />
                    <TradingView
                      theme={props.theme}
                    />
                  </div>


                </div>
                <div className="prediction-trade-right-2">
                  <div className="prediction-manual-auto-tabs">
                    <ul class="nav nav-pills mb-2" id="pills-tab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-manual-tabs-tab" data-bs-toggle="pill" data-bs-target="#pills-manual-tabs" type="button" role="tab" aria-controls="pills-manual-tabs" aria-selected="true">Manual</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link " id="pills-auto-tabs-tab" data-bs-toggle="pill" data-bs-target="#pills-auto-tabs" type="button" role="tab" aria-controls="pills-auto-tabs" aria-selected="false">Auto</button>
                      </li>
                    </ul>
                  </div>
                  <div class="tab-content" id="pills-tabContent">

                    <div class="tab-pane fade show active" id="pills-manual-tabs" role="tabpanel" aria-labelledby="pills-manual-tabs-tab" tabindex="0">
                      <span className="prediction-trade-text-4">WILL THE PRICE GO UP OR DOWN?</span>
                      <div className="prediction-manual-updown-tabs">
                        <ul class="nav nav-pills mb-3 nav-fill mt-2" id="pills-tab" role="tablist">
                          <li class="nav-item" role="presentation" onClick={() => handleButtonClick('Bull')}>
                            <button class="nav-link manual-active-up active" id="pills-manual-up-tab" data-bs-toggle="pill" data-bs-target="#pills-manual-up" type="button" role="tab" aria-controls="pills-manual-up" aria-selected="true"><MdKeyboardDoubleArrowUp className="prediction-trade-text-5" />Bull</button>
                          </li>
                          <li class="nav-item" role="presentation" onClick={() => handleButtonClick('Bear')}>
                            <button class="nav-link manual-active-down" id="pills-manual-down-tab" data-bs-toggle="pill" data-bs-target="#pills-manual-down" type="button" role="tab" aria-controls="pills-manual-down" aria-selected="false"><MdKeyboardDoubleArrowDown className="prediction-trade-text-5" />Bear</button>
                          </li>
                        </ul>
                      </div>
                      <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-manual-up" role="tabpanel" aria-labelledby="pills-manual-up-tab" tabindex="0">
                          <span className="prediction-trade-text-4">BET PRICE</span>
                          <div class="input-group my-2 prediction-trade-updown-input">
                            <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                            <input type="text" class="form-control" value={wager} aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={handleWagerChange} />
                            <button class="prediction-updown-button" type="button" id="button-addon1" onClick={handleHalfButtonClick}>1/2</button>
                            <button class="prediction-updown-button" type="button" id="button-addon1" onClick={handleDoubleButtonClick}>x2</button>
                          </div>
                          <span className="prediction-trade-text-4">MULTIPLIER</span>
                          <div className="row align-items-center mt-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                                <input type="text" class="form-control" value={values[currentStepIndex]} aria-label="Example text with button addon" aria-describedby="button-addon1" disabled />
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
                            <div className="d-flex flex-row">
                              <div>
                                <span className="prediction-trade-text-6">x1 : <span style={{ color: "#72f238" }}>Safe</span></span>
                              </div>
                              <div className="ms-auto">
                                <span className="prediction-trade-text-6"><span style={{ color: "#ff4949" }}>Wild</span> : x1000 </span>
                              </div>
                            </div>
                          </div>
                          <button type="button" class="prediction-bet-button-up mt-3" disabled={wager < 1}
                            onClick={handlePlaceBet}>PLACE BET</button>
                          <div class="form-check form-switch my-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={handleFlatFeeSwitchChange} />
                            <label class="form-check-label fs-12" for="flexSwitchCheckDefault">Flat Fee</label>

                            <ReactTooltip
                              id="flexiablerate"
                              className="tooltip-text-Theme text-left"
                            />
                            <span className='mx-1'>
                              <HiQuestionMarkCircle
                                className='text-grey'
                                data-effect="solid"
                                data-multiline={true}
                                data-tip={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                                data-for="flexiablerate"
                              />

                            </span>
                          </div>
                          {showFlatFee && (
                            <div>
                              <span className="fs-14">{flatFee}</span>
                              <p className="fs-10 mb-0">
                                Per entry and exit trades of $200 including slippage
                              </p>
                            </div>
                          )}
                        </div>
                        <div class="tab-pane fade" id="pills-manual-down" role="tabpanel" aria-labelledby="pills-manual-down-tab" tabindex="0">
                          <span className="prediction-trade-text-4">BET PRICE</span>
                          <div class="input-group my-2 prediction-trade-updown-input">
                            <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                            <input type="text" class="form-control" value={wager} aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={handleWagerChange} />
                            <button class="prediction-updown-button" type="button" id="button-addon1" onClick={handleHalfButtonClick}>1/2</button>
                            <button class="prediction-updown-button" type="button" id="button-addon1" onClick={handleDoubleButtonClick}>x2</button>
                          </div>
                          <span className="prediction-trade-text-4">MULTIPLIER</span>
                          <div className="row align-items-center mt-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                                <input type="text" class="form-control" value={values[currentStepIndex]} aria-label="Example text with button addon" aria-describedby="button-addon1" disabled />
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
                            <div className="d-flex flex-row">
                              <div>
                                <span className="prediction-trade-text-6">x1 : <span style={{ color: "#72f238" }}>Safe</span></span>
                              </div>
                              <div className="ms-auto">
                                <span className="prediction-trade-text-6"><span style={{ color: "#ff4949" }}>Wild</span> : x1000 </span>
                              </div>
                            </div>
                          </div>
                          <button type="button" class="prediction-bet-button-down mt-3" disabled={wager < 1}
                            onClick={handlePlaceBet}>PLACE BET</button>
                          <div class="form-check form-switch my-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label class="form-check-label fs-12" for="flexSwitchCheckDefault">Flat Fee</label>

                            <ReactTooltip
                              id="flexiablerate"
                              className="tooltip-text-Theme text-left"
                            />
                            <span className='mx-1'>
                              <HiQuestionMarkCircle
                                className='text-grey'
                                data-effect="solid"
                                data-multiline={true}
                                data-tip={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                                data-for="flexiablerate"
                              />
                            </span>
                          </div>
                          {showFlatFee && (
                            <div>
                              <span className="fs-14">{flatFee}</span>
                              <p className="fs-10 mb-0">
                                Per entry and exit trades of $200 including slippage
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="pills-auto-tabs" role="tabpanel" aria-labelledby="pills-auto-tabs-tab" tabindex="0">
                      <span className="prediction-trade-text-4">WILL THE PRICE GO UP OR DOWN?</span>
                      <div className="prediction-manual-updown-tabs">
                        <ul class="nav nav-pills mb-3 nav-fill mt-2" id="pills-tab" role="tablist">
                          <li class="nav-item" role="presentation">
                            <button class="nav-link manual-active-up active" id="pills-auto-up-tab" data-bs-toggle="pill" data-bs-target="#pills-auto-up" type="button" role="tab" aria-controls="pills-auto-up" aria-selected="true"><MdKeyboardDoubleArrowUp className="prediction-trade-text-5" />Bear</button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button class="nav-link manual-active-down" id="pills-auto-down-tab" data-bs-toggle="pill" data-bs-target="#pills-auto-down" type="button" role="tab" aria-controls="pills-auto-down" aria-selected="false"><MdKeyboardDoubleArrowDown className="prediction-trade-text-5" />Bull</button>
                          </li>
                        </ul>
                      </div>
                      <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-auto-up" role="tabpanel" aria-labelledby="pills-auto-up-tab" tabindex="0">
                          <span className="prediction-trade-text-4">BET PRICE</span>
                          <div class="input-group my-2 prediction-trade-updown-input">
                            <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                            <input type="text" class="form-control" value="00.34543" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <button class="prediction-updown-button" type="button" id="button-addon1">1/2</button>
                            <button class="prediction-updown-button" type="button" id="button-addon1">x2</button>
                          </div>
                          <span className="prediction-trade-text-4">MULTIPLIER</span>
                          <div className="row align-items-center my-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                                <input type="text" class="form-control" value="10.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <p className="mb-0 prediction-trade-text-6">Bust Price:</p>
                              <p className="mb-0 prediction-trade-text-6">29,169.29</p>
                            </div>
                          </div>
                          <span className="prediction-trade-text-4">TAKE PROFIT AT PRICE / PROFIT</span>
                          <div className="row align-items-center my-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <input type="text" class="form-control" placeholder="Price" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text fs-12" style={{ color: "#72f238" }}>+$</span>
                                <input type="text" class="form-control" placeholder="Profit" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                          </div>
                          <span className="prediction-trade-text-4">CLOSE BET AT PRICE / LOSS</span>
                          <div className="row align-items-center my-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <input type="text" class="form-control" placeholder="Price" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text fs-12" style={{ color: "#ff4949" }}>-$</span>
                                <input type="text" class="form-control" placeholder="Profit" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="d-flex flex-row">
                              <div>
                                <span className="prediction-trade-text-6">x1 : <span style={{ color: "#72f238" }}>Safe</span></span>
                              </div>
                              <div className="ms-auto">
                                <span className="prediction-trade-text-6"><span style={{ color: "#ff4949" }}>Wild</span> : x1000 </span>
                              </div>
                            </div>
                          </div>
                          <button type="button" class="prediction-bet-button-up mt-3">PLACE BET</button>
                          <div class="form-check form-switch my-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label class="form-check-label fs-12" for="flexSwitchCheckDefault">Flat Fee</label>

                            <ReactTooltip
                              id="flexiablerate"
                              className="tooltip-text-Theme text-left"
                            />
                            <span className='mx-1'>
                              <HiQuestionMarkCircle
                                className='text-grey'
                                data-effect="solid"
                                data-multiline={true}
                                data-tip={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                                data-for="flexiablerate"
                              />

                            </span>
                            <span className="fs-14">0.040%</span>

                          </div>
                          <p className="fs-10 mb-0">Per entry and exit trades of $200 including slippage</p>
                        </div>
                        <div class="tab-pane fade" id="pills-auto-down" role="tabpanel" aria-labelledby="pills-auto-down-tab" tabindex="0">
                          <span className="prediction-trade-text-4">BET PRICE</span>
                          <div class="input-group my-2 prediction-trade-updown-input">
                            <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                            <input type="text" class="form-control" value="00.34543" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <button class="prediction-updown-button" type="button" id="button-addon1">1/2</button>
                            <button class="prediction-updown-button" type="button" id="button-addon1">x2</button>
                          </div>
                          <span className="prediction-trade-text-4">MULTIPLIER</span>
                          <div className="row align-items-center my-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text"><img className="prediction-manual-coin" src="https://rollbit.com/static/media/coin.c832c5bf7167a98755e1.webp" alt="coin" /></span>
                                <input type="text" class="form-control" value="10.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <p className="mb-0 prediction-trade-text-6">Bust Price:</p>
                              <p className="mb-0 prediction-trade-text-6">29,169.29</p>
                            </div>
                          </div>
                          <span className="prediction-trade-text-4">TAKE PROFIT AT PRICE / PROFIT</span>
                          <div className="row align-items-center my-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <input type="text" class="form-control" placeholder="Price" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text fs-12" style={{ color: "#72f238" }}>+$</span>
                                <input type="text" class="form-control" placeholder="Profit" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                          </div>
                          <span className="prediction-trade-text-4">CLOSE BET AT PRICE / LOSS</span>
                          <div className="row align-items-center my-2 g-2">
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <input type="text" class="form-control" placeholder="Price" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div class="input-group prediction-trade-updown-input py-1">
                                <span class="input-group-text fs-12" style={{ color: "#ff4949" }}>-$</span>
                                <input type="text" class="form-control" placeholder="Profit" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="d-flex flex-row">
                              <div>
                                <span className="prediction-trade-text-6">x1 : <span style={{ color: "#72f238" }}>Safe</span></span>
                              </div>
                              <div className="ms-auto">
                                <span className="prediction-trade-text-6"><span style={{ color: "#ff4949" }}>Wild</span> : x1000 </span>
                              </div>
                            </div>
                          </div>
                          <button type="button" class="prediction-bet-button-up mt-3">PLACE BET</button>
                          <div class="form-check form-switch my-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label class="form-check-label fs-12" for="flexSwitchCheckDefault">Flat Fee</label>

                            <ReactTooltip
                              id="flexiablerate"
                              className="tooltip-text-Theme text-left"
                            />
                            <span className='mx-1'>
                              <HiQuestionMarkCircle
                                className='text-grey'
                                data-effect="solid"
                                data-multiline={true}
                                data-tip={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                                data-for="flexiablerate"
                              />
                            </span>
                            <span className="fs-14">0.040%</span>
                          </div>
                          <p className="fs-10 mb-0">Per entry and exit trades of $200 including slippage</p>
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
                          <ul class="nav nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                              <button class="nav-link fs-14 active" id="pills-all-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-all-bets" type="button" role="tab" aria-controls="pills-all-bets" aria-selected="true">Active Bets</button>
                            </li>
                            <li class="nav-item" role="presentation">
                              <button class="nav-link fs-14" id="pills-lucky-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-lucky-bets" type="button" role="tab" aria-controls="pills-lucky-bets" aria-selected="false">Closed Bets</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="ms-lg-auto">
                        <a className="me-4 trade-right-section-table-anchor">How It Works</a>
                        <a className="trade-right-section-table-anchor">How It Works</a>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-3">
                      <div>
                        <div className="f-group">
                          <select className="f-control f-dropdown" placeholder="Select">
                            <option value="pnl" selected="selected">ALL INSTRUMENTS</option>
                            <option value="roi">BTC</option>
                          </select>
                        </div>
                      </div>
                      <div className="mx-2">
                        <div className="f-group">
                          <select className="f-control f-dropdown" placeholder="Select">
                            <option value="pnl" selected="selected">PNL</option>
                            <option value="roi">ROI</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="f-group">
                          <select className="f-control f-dropdown" placeholder="Select">
                            <option value="day" selected="selected">DAY</option>
                            <option value="week">WEEK</option>
                            <option value="month">MONTH</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 tab-content" id="nav-tabContent">
                      <div className="prediction-bets-table-section tab-pane fade show active" id="pills-all-bets" role="tabpanel">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col" className="bets-table-trade-1">Date</th>
                              <th scope="col" className="bets-table-trade-2">Pair</th>
                              <th scope="col" className="bets-table-trade-3">BULL / BEAR</th>
                              <th scope="col" className="bets-table-trade-4">Entry Price</th>
                              <th scope="col" className="bets-table-trade-5">multiplier</th>
                              <th scope="col" className="bets-table-trade-6">Wager</th>
                              <th scope="col" className="bets-table-trade-7">Bust Price</th>
                              <th scope="col" className="bets-table-trade-8">P & L</th>
                              <th scope="col" className="bets-table-trade-9">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getUserGamePrediction && 
                            getUserGamePrediction.length > 0 && 
                            getUserGamePrediction.map((active) => {
                              if(active.predictionStatus === 0)
                              {
                                return (
                                  <tr>
                                    <td className="bets-trade-tablebd-1">
                                      {moment(active.dateTime).format("DD-MM-YYYY")}
                                    </td>
                                    <td className="bets-trade-tablebd-2">USDT</td>
                                    <td className="bets-trade-tablebd-3">{active.direction}</td>
                                    <td className="bets-trade-tablebd-4">{active.marketprice}</td>
                                    <td className="bets-trade-tablebd-5">{active.multiplier}</td>
                                    <td className="bets-trade-tablebd-6">{active.predictionAmt}</td>
                                    <td className="bets-trade-tablebd-7">{active.bustprice}</td>
                                    <td className="bets-trade-tablebd-8">{active.profitAndLosss}</td>
                                    <td className="bets-trade-tablebd-9"> <button class="prediction-updown-button m-0 fs-10" type="button" id="button-addon1" onClick={() => handleClick(active._id, active.profitAndLosss, "handleClose")}>CLOSE</button></td>
                                  </tr>
                                )
                              }
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="prediction-bets-table-section tab-pane fade" id="pills-lucky-bets" role="tabpanel">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col" className="bets-table-trade-1">Date</th>
                              <th scope="col" className="bets-table-trade-2">Pair</th>
                              <th scope="col" className="bets-table-trade-3">Entry Price</th>
                              <th scope="col" className="bets-table-trade-4">multiplier</th>
                              <th scope="col" className="bets-table-trade-5">Wager</th>
                              <th scope="col" className="bets-table-trade-6">Bust Price</th>
                              <th scope="col" className="bets-table-trade-7">Exit Price</th>
                              <th scope="col" className="bets-table-trade-8">P & L</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getUserGamePrediction && 
                            getUserGamePrediction.length > 0 && 
                            getUserGamePrediction.map((active) => {
                              if(active.predictionStatus === 1)
                              {
                                return (
                                  <tr>
                                    <td className="bets-trade-tablebd-1">
                                      {moment(active.dateTime).format("DD-MM-YYYY")}
                                    </td>
                                    <td className="bets-trade-tablebd-2">USDT</td>
                                    <td className="bets-trade-tablebd-3">{active.marketprice}</td>
                                    <td className="bets-trade-tablebd-4">{active.multiplier}</td>
                                    <td className="bets-trade-tablebd-5">{active.predictionAmt}</td>
                                    <td className="bets-trade-tablebd-6">{active.bustprice}</td>
                                    <td className="bets-trade-tablebd-7">{active.exitMarketPrice}</td>
                                    <td className="bets-trade-tablebd-8">
                                      {active.winAmt == 0 ? 
                                        <span className="positive-value">{active.lossAmt}</span>
                                       : 
                                        <span className="negative-value">{active.winAmt}</span>
                                      }
                                    </td>
                                  </tr>
                                )
                              }
                            })}
                          </tbody>
                        </table>
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