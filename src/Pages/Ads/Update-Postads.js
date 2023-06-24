import React, { useEffect, useState } from 'react'
import NavbarOne from "../siteTheme/NavbarOne";
import P2PHeader from "../separate/P2PHeader";
import "../../assets/styledev.css";
import { FaEdit } from 'react-icons/fa'
import { AiOutlineArrowRight } from "react-icons/ai"
import { dateFormat, shortAdrress } from '../../core/helper/date-format';
import { useContextData } from '../../core/context/index'
import * as yup from 'yup';
import { useFormik, Form, Formik } from 'formik';
import { makeRequest } from "../../core/services/v1/request";
import Config from "../../core/config";
import { toast } from "../../core/lib/toastAlert";
import { getCookie } from '../../core/helper/cookie';
import CloseIcon from '@mui/icons-material/Close';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Country } from 'country-state-city';
import { MultiSelect } from "react-multi-select-component";
import { isEmpty, pageAllowCheck, toFixedWithoutRound } from "../../core/helper/common";
import { Bars } from 'react-loader-spinner';
import { data } from 'jquery';

const countries = Country.getAllCountries();

const validationSchema = yup.object({
  minAmt: yup
    .number()
    .typeError('Please enter min order limit')
    .required('Please enter min order limit'),
  maxAmt: yup
    .number()
    .typeError('Please enter max order limit')
    .required('Please enter max order limit')
});
const authcodevalidationSchema = yup.object({
  authCode: yup
    .number()
    .typeError('Enter Google authentication code')
    .required('Google authentication code is required'),
});

export default function UpdateMyadspage(props) {

  const navigate = useNavigate();
  let { editId } = useParams();

  const { myProfile, siteSettings, p2pSettings } = useContextData();

  const defaultPassData = {
    registeredStatus: false,
    holdingStatus: false,
    checkedKyc: false,
    registeredDays: 0,
    holdingBTC: 0,
    remarks: "",
    autoreply: "",
    country: "",
  };
  const [step, setStep] = useState(1);
  const [currentInrPrice, setcurrentInrPrice] = useState(0);
  const [changeInrPrice, setchangeInrPrice] = useState(0);
  const [floatingPrice, setfloatingPrice] = useState(100);
  const [totalFloat, settotalFloat] = useState(0);
  const [minAmount, setminAmount] = useState(15);
  const [maxAmount, setmaxAmount] = useState(2000000);
  const [paymentTime, setpaymentTime] = useState(1);
  const [orderPrice, setorderPrice] = useState(0);
  const [priceType, setpriceType] = useState('Fixed');
  const [onlineOfflineStatus, setonlineOffline] = useState('Online');
  const [orderType, setorderType] = useState('buy');
  const [isLoading, setisLoading] = useState(false);
  const [p2ppayementOpen, setp2ppayementOpen] = useState(false);
  const [verificationformOpen, setverificationformOpen] = useState(false);
  const [confirmformOpen, setconfirmformOpen] = useState(false);
  const [userWallet, setuserWallet] = useState([]);
  const [pairDetails, setpairDetails] = useState({});
  const [selectValue, setselectValue] = useState([]);
  const [paymentNames, setpaymentNames] = useState({});
  const [myadsList, setmyadsList] = useState([]);
  const [passData, setpassData] = useState(defaultPassData);
  const [paymentDetails, setpaymentDetails] = useState({});
  const [total, settotal] = useState(0);
  const [minAmt, setminAmt] = useState(0);
  const [maxAmt, setmaxAmt] = useState(0);
  const [mypaymentNames, setmypaymentNames] = useState([]);
  const [allpaymentsList, setallpaymentsList] = useState([]);


  const [countryList, setCountryList] = useState([]);
  const [currentTab, setCurrentTab] = useState("buy");
  const [allPairsList, setallPairsList] = useState([]);
  const [selectPair, setselectPair] = useState("");

  const [selectedData, setselectedData] = useState([]);
  const [selectedType, setselectedType] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('All Regions');
  const [loaderStatus, setloaderStatus] = useState(false);
  const [fixedMinMaxData, setfixedMinMaxData] = useState({ min: "", max: "" });

  const [errors, errors_set] = useState("");
  const [errors1, errors_set1] = useState("");
  const errorType = 'error';
  const [price_validation_errors, setprice_validation_errors] = useState({ minAmt_err: "", maxAmt_err: "", total_err: "" });
  const [buyPaymentList, setbuyPaymentList] = useState([]);
  const [sellPaymentList, setsellPaymentList] = useState([]);
  const [changePriceStatus, setchangePriceStatus] = useState(false);


  useEffect(() => {
    if (pairDetails) {
      if (pairDetails.minTrade) {
        setminAmount(pairDetails.minTrade)
      }
      if (pairDetails.maxTrade) {
        setmaxAmount(pairDetails.maxTrade);
      }
    }
  }, [pairDetails]);

  useEffect(() => {
    const LoggedIn = getCookie('userToken');
    if (LoggedIn) {
      if (myProfile) {
        getPayment();
        getallPaymentsDet();
        getCountryList();
        getMyadsDet();
        getpriceRangeDet(orderType);
      }
    } else {
      navigate("/login");
    }
  }, [myProfile]);

  const initialValues = () => {
    return {
      total: total,
      minAmt: (pairDetails?.minTrade),
      maxAmt: (pairDetails?.maxTrade),
      accountType: '',
      branch: '',
      paymentTime: paymentTime,
    }
  }
  async function getp2pPair(selectPair) {
    try {
      const data = { pair: selectPair }
      const params = {
        url: `${Config.V1_API_URL}p2p/getp2pPair`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      const {
        status = false,
        data: respData = {}
      } = response;
      if (status) {
        setpairDetails(respData);
        if (respData.status === 0) {
          navigate("/myads");
          toast({ type: "error", message: respData.pair + " pair is De-Activated!" });
          return false;
        }
        var value = { userId: myProfile?._id, currencyId: respData.fromCurrency }
        const params = {
          url: `${Config.V1_API_URL}p2p/getBalance`,
          method: 'POST',
          body: value
        }
        const result = (await makeRequest(params));
        if (result && result.status) {
          setuserWallet(result.data)
        }
      }
    } catch (err) { }
  }
  async function getMyadsDet() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getMyads`,
        method: 'POST',
        body: { editId: editId }
      }
      const response = (await makeRequest(params));
      if (response && response.status && response.data) {
        setmyadsList(response.data);
        let paymenttypes = [];
        if (response.data.length > 0) {
          setloaderStatus(true);
          response.data.map((item) => {
            if (item) {
              paymenttypes.push(item.paymenttype);
              setfloatingPrice(item.floatingPrice);
              settotalFloat(currentInrPrice * item.floatingPrice / 100);
              settotal(item.usdtPrice);
              let timelimit = 0;
              if (item.timeLimit !== 15 && item.timeLimit !== 30 && item.timeLimit !== 45){
                timelimit = Math.floor(item.timeLimit/60);
              } else {
                timelimit = item.timeLimit;
              }
              setpaymentTime(timelimit);
              setselectedType(item.paymentId);
              setmypaymentNames(item.paymentNames);
              setorderType(item.orderType);
              setbuyPaymentList(item.buypaymentDet);
              setpairDetails(item.pairName)
              setselectPair(item.pairName);
              setsellPaymentList(item.sellpaymentDet);
              
              setTimeout(() => {
                getCurrentPairPrice(item.pairName);
                getpriceRangeDet(item.orderType, item.pairName)
              }, 300);
              setTimeout(() => {
                getp2pPair(item.pairName);
              }, 500);

              if (item.orderType == "sell") {
                setselectedData(item.sellpaymentDet)
              }
              if (item.orderType == "buy") {
                setselectedData(item.buypaymentDet)
              }
              
            }
          })
        } else {
          setloaderStatus(false);
        }
      }
    } catch (err) { }
  }
  async function getCountryList() {
    try {
      let countryArray = [];
      countries.length > 0 && countries.map((data) => {
        countryArray.push({ label: data.name, value: data.name })
      })
      setCountryList(countryArray)
      setSelectedCountry([{ label: "Select All", value: "*" }, ...countryArray]);
    } catch (err) { }
  }
  async function getCurrentPairPrice(selectPair) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getCurrentpair`,
        method: 'POST',
        body: { pair: selectPair }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        const lastPrice = response.data?.lastPrice;
        setcurrentInrPrice(lastPrice);
        settotalFloat(floatingPrice * lastPrice / 100);
        let minFixedVal = (lastPrice * (p2pSettings && p2pSettings.minPercentage)) / 100;
        let maxFixedVal = (lastPrice * (p2pSettings && p2pSettings.maxPercentage)) / 100;
        setfixedMinMaxData({ min: minFixedVal, max: maxFixedVal })
      }
    } catch (err) { }
  }
  async function getallPaymentsDet() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getallPayments`,
        method: 'GET',
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        setallpaymentsList(response?.data)
      }
    } catch (err) { }
  }
  async function getPayment() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getadsP2PPayment`,
        method: 'GET',
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        setpaymentDetails(response?.data);
      }
    } catch (err) { }
  }
  function decimalValue(value, decimal) {
    if (value != undefined) {
      value = value.toString();
      if (value.indexOf('.') >= 0) {
        let arrVal = value.split('.')[1].split('');
        value = value.split('.')[0] + '.';
        for (let inc = 0; inc < arrVal.length; inc++) {
          if (inc < decimal) {
            value = value + arrVal[inc];
          }
        }
      }
      return value;
    }
  }
  function calculateValues(placeValue, placeType) {
    setchangePriceStatus(true);
    const priceDecimal = (pairDetails && pairDetails.toDecimal) ? pairDetails.toDecimal : 2;
    placeValue = toFixedWithoutRound({val:placeValue, decimal: priceDecimal});
    let getPrice = placeType == 'price' ? placeValue : (changeInrPrice > 0 ? changeInrPrice : 0);
    let getfloatPrice = placeType == 'floatingprice' ? placeValue : (floatingPrice > 0 ? floatingPrice : 0);
    if (priceType == "Floating") {
      if (isNaN(getfloatPrice)) {
        setfloatingPrice("");
      } else {
        const newPrice = getfloatPrice > 0 ? parseFloat(getfloatPrice) : 0;
        const total = (newPrice * currentInrPrice) / 100;
        setfloatingPrice(Number(getfloatPrice));
        setchangeInrPrice(Number(currentInrPrice))
        settotalFloat(Number(total));
        if ((p2pSettings && p2pSettings.minPercentage) > getfloatPrice || (p2pSettings && p2pSettings.maxPercentage) < getfloatPrice) {
          setfloatingPrice(getfloatPrice);
          let floating_error = "Floating Price margin should be within [ " + (p2pSettings && p2pSettings.minPercentage) + "%," + (p2pSettings && p2pSettings.maxPercentage) + "%]";
          errors_set(floating_error);
          return false;
        }
        errors_set("");
      }
    } else {
      if (isNaN(getPrice)) {
        setcurrentInrPrice("");
      } else {
        if (fixedMinMaxData?.min > getPrice || fixedMinMaxData?.max < getPrice) {
          setcurrentInrPrice(getPrice);
          const priceDecimal = (pairDetails && pairDetails.toDecimal) ? pairDetails.toDecimal : 2;
          let fixed_error = "Fixed Price should be [ " + ( toFixedWithoutRound({val:fixedMinMaxData.min, decimal: priceDecimal}) ) + " , " + (toFixedWithoutRound({val:fixedMinMaxData.max, decimal: priceDecimal})) + "]";
          errors_set1(fixed_error);
          return false;
        }
        errors_set1("");
        setcurrentInrPrice(getPrice);
      }
    }
  }
  let incDecVal = 0.01;
  let editincNum = () => {
    if ((myadsList && myadsList[0] && myadsList[0].priceType) == "Fixed") {
      setcurrentInrPrice(Number(currentInrPrice) + incDecVal);
    } else {
      const newPrice = parseFloat(floatingPrice + incDecVal);
      const total = (newPrice * currentInrPrice) / 100;
      setfloatingPrice(Number(floatingPrice) + incDecVal);
      setchangeInrPrice(Number(currentInrPrice) + incDecVal)
      settotalFloat(Number(total))
    }
  }
  let editdecNum = () => {
    if ((myadsList && myadsList[0] && myadsList[0].priceType) == "Fixed") {
      if (currentInrPrice > 0) {
        setcurrentInrPrice(parseFloat(currentInrPrice - incDecVal));
      }
    } else {
      setfloatingPrice(Number(floatingPrice) - incDecVal);
      const value = Number(floatingPrice) - incDecVal;
      const total = (value * currentInrPrice) / 100;
      settotalFloat(Number(total));
    }
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  async function selectPaymentType(selectpayment) {
    try {
      if (selectValue.length > p2pSettings?.selectionLimit) {
        let type = 'error'
        toast({ type, message: 'Select up to' + p2pSettings?.selectionLimit + 'methods' });
        return false;
      }
      let selectPaymentId = [];
      let paymenttypes = [];
      let unique = [];
      if (orderType == "buy") {
        buyPaymentList.push(selectpayment);
        unique = buyPaymentList.filter(onlyUnique);
        setselectedData(unique);
        unique.length > 0 && unique.map((data) => {
          selectPaymentId.push(data._id);
          paymenttypes.push(data.name);
        })
      } else {
        sellPaymentList.push(selectpayment);
        unique = sellPaymentList.filter(onlyUnique);
        setselectedData(unique);
        unique.length > 0 && unique.map((data) => {
          selectPaymentId.push(data._id);
          paymenttypes.push(data.paymenttype);
        })
      }
      setp2ppayementOpen(false);
      setselectValue(unique);
      setmypaymentNames(paymenttypes);
      setselectedType(selectPaymentId);
      setpaymentNames(paymenttypes);
    } catch (err) { }
  }
  async function getpriceRangeDet(type,pair) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getpriceRange`,
        method: 'POST',
        body: { type: type, pair: pair }
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        setorderPrice(response.data);
      }
    } catch (err) { }
  }
  const handleinputChange = (event) => {
    const { name = "", value, checked } = event.target;
    switch (name) {
      case "checkedKyc":
      case "registeredDays":
      case "holdingBTC":
      case "remarks":
      case "autoreply":
      case "registeredStatus":
      case "holdingStatus":
        passData[name] = (name == "checkedKyc" || name == "registeredStatus" || name == "holdingStatus") ? checked : value;
        setpassData(passData);
        break;
      case "priceType":
        if (value == "Floating") {
          errors_set("");
        } else {
          errors_set1("");
        }
        setpriceType(value);
        break;
      case "selectPair":
        setselectPair(value);
        getp2pPair(value);
        getCurrentPairPrice(value);
        break;
      case "total":
        settotal(event.target.value);
        break;
      case "minAmt":
        setminAmt(event.target.value);
        break;
      case "maxAmt":
        setmaxAmt(event.target.value);
        break;
      case "paymentTime":
        setpaymentTime(event.target.value);
        break;
      default:
        break;
    }
  }
  async function nextStep1(step) {
    try {
      let priceRange = 0
      if ((myadsList && myadsList[0] && myadsList[0].priceType) == "Fixed") {
        priceRange = currentInrPrice;
      } else {
        priceRange = floatingPrice
      }
      console.log("error:", fixedMinMaxData, currentInrPrice, priceType)

      if (((p2pSettings && p2pSettings.minPercentage) > floatingPrice || (p2pSettings && p2pSettings.maxPercentage) < floatingPrice) && priceType == "Floating") {
        let floating_error = "Floating Price margin should be within [ " + (p2pSettings && p2pSettings.minPercentage) + "%," + (p2pSettings && p2pSettings.maxPercentage) + "%]";
        errors_set(floating_error);
        return false;
      }
      if (
        fixedMinMaxData &&
        priceType == "Fixed" &&
        (fixedMinMaxData.min > currentInrPrice || fixedMinMaxData.max < currentInrPrice)
      ) {
        let fixed_error = "Fixed Price should be [ " + (fixedMinMaxData.min) + " , " + (fixedMinMaxData.max) + "]";
        errors_set1(fixed_error);
        return false;
      }

      const data = {
        step: step + 1,
        price: priceRange,
        floatingPrice: floatingPrice,
      }
      setpassData(data);
      setStep(step + 1);
    } catch (err) { console.log("error:", err) }
  }
  const nextStep2 = async (values) => {
    let tradeFiatAmount = values.maxAmt;
    if (pairDetails?.minTrade > Number(values.minAmt)) {
      setprice_validation_errors({ minAmt_err: "Min limit should not be less than " + minAmount+" "+ (pairDetails?.pair?.split(/[_]+/)[1]) });
      return false;
    } else if (pairDetails?.maxTrade < Number(values.maxAmt)) {
      setprice_validation_errors({ maxAmt_err: values.maxAmt+"Max order limit " + pairDetails?.maxTrade });
      return false;
    } else if (tradeFiatAmount < Number(values.minAmt)) {
      setprice_validation_errors({ minAmt_err: "Min limit should not be less than " + minAmount +" "+ (pairDetails?.pair?.split(/[_]+/)[1])});
      return false;
    } else if (tradeFiatAmount < Number(values.maxAmt) && orderType === 'sell') {
      setprice_validation_errors({ maxAmt_err: "Exceeds the maximum available amount" });
      return false;
    } else if (Number(values.maxAmt) < Number(values.minAmt)) {
      setprice_validation_errors({ maxAmt_err: "Max order should not be less than min amount" });
      return false;
    }
    setprice_validation_errors({ minAmt_err: "", maxAmt_err: "", total_err: "" });
    if (orderType === "buy" && mypaymentNames === "") {
      let type = 'error'
      toast({ type, message: 'Please select at least 1 payment method' });
    }
    if (p2pSettings?.selectionLimit < selectValue.length) {
      let type = 'error'
      toast({ type, message: 'Select up to' + p2pSettings?.selectionLimit + 'methods' });
      return false;
    }
    values.maxAmt = (values.total * currentInrPrice)?.toFixed(pairDetails?.toDecimal)
    passData.minAmt = values.minAmt;
    passData.maxAmt = values.maxAmt;
    passData.timeLimit = paymentTime;
    passData.orderId = editId;
    passData.paymentId = selectedType;
    passData.paymentNames = mypaymentNames.toString();
    passData.orderType = orderType;
    const params = {
      url: `${Config.V1_API_URL}p2p/submitVerification`,
      method: 'POST',
      body: passData
    }
    setisLoading(true);
    const response = (await makeRequest(params));
    setisLoading(false);
    if (response.status) {
      setconfirmformOpen(true);
      setverificationformOpen(false);
      navigate("/myads")
    } else {
      let type = 'error';
      toast({ type, message: response.message });
      if (response.type == "KYC") {
        navigate("/my/identification");
      } else if (response.type == "TFA" || response.type == "2FA") {
        navigate("/google-authenticator");
      }
    }
    setpassData(passData);
    setverificationformOpen(true);
  }
  async function removedData(type, n) {
    try {
      const index = selectedData.findIndex(prop => prop._id === type);
      if (index > -1) {
        let unique = [];
        if (selectedData.length > 0) {
          selectedData.splice(index, 1);
          setselectedData(selectedData)
          unique = selectedData.filter(onlyUnique);
          let paymenttypes = [];
          let selectPaymentId = [];
          selectedData.length > 0 && selectedData.map((payment, i) => {
            unique.length > 0 && unique.map((data) => {
              if (data._id == payment._id) {
                paymenttypes.push(orderType == 'buy' ? payment.name : payment.paymenttype);
                selectPaymentId.push(payment._id);
              }
            })
          })
          setmypaymentNames(paymenttypes)
          setselectedType(selectPaymentId);
        } else {
          setselectedData([]);
        }
      }
    } catch (err) { }
  }
  async function selectPayment() {
    setp2ppayementOpen(true);
    getPayment();
  }
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="deposit-page-top-banner min-vh-100">
        <P2PHeader />
        { loaderStatus == false &&
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
        }
        {loaderStatus &&
          <>
            {step == 1 &&
              <div className="container mt-5 pt-5">
                <div className="card bg-transparent border border-secondary">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-8  css-tab-col">
                        <ul className="nav nav-pills mb-4 d-flex justify-content-center" id="pills-tab" role="tablist">
                          <li className="nav-item tab-css" role="presentation">
                            <h4>Edit Ad</h4>
                          </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                            <div className="row  ">
                              <div className="col-lg-12">
                                <div className='row'>
                                  <div className="col-lg-4 mt-3">
                                    <label className='form-label'>{(myadsList && myadsList[0] && myadsList[0].orderType) == "buy" ? "BUY" : "SELL"}</label>
                                    <p className="color-white ">
                                      {(myadsList && myadsList[0] && myadsList[0].fromCurrency) + "/" + (myadsList && myadsList[0] && myadsList[0].toCurrency)}
                                    </p>
                                  </div>
                                  <div className="col-lg-4 mt-5">
                                    <label className='form-label'>{(myadsList && myadsList[0] && myadsList[0].orderType == "buy" ? "Highest Order Price" : "Lowest Order price")}</label>
                                    <span className="color-white"> ₹ {" "}
                                      {(myadsList && myadsList[0] && myadsList[0].orderType == "buy") ?
                                        (orderPrice?.toFixed(2))
                                        :
                                        (orderPrice?.toFixed(2))
                                      }
                                    </span>
                                  </div>
                                  <div className="col-lg-4 mt-5">
                                    <label className='form-label'>Price</label>
                                    <span className="color-white"> ₹ {(myadsList && myadsList[0] && myadsList[0].price?.toFixed(2))}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 mt-5">
                                <div className='d-flex'></div>
                                <div className="col-lg-6 mt-5">
                                  <label className="form-check-label" for="flexRadioDefault233"> {(myadsList && myadsList[0] && myadsList[0].priceType) == "Fixed" ? (myadsList && myadsList[0] && myadsList[0].priceType) : (myadsList && myadsList[0] && myadsList[0].priceType) + " Price Margin"} </label>
                                  <div className="card bg-transparent border border-secondary">
                                    <div className="card-body">
                                      <div className="d-flex">
                                        <button className='btn btn-next' type="button" onClick={editdecNum}>-</button>
                                        <div className='w-100'><center>
                                          <h3>
                                            {(myadsList && myadsList[0] && myadsList[0].priceType) == "Fixed" &&
                                              <input type="text"
                                                name="priceInput"
                                                className="form-control addpostadin p2pg"
                                                value={decimalValue(currentInrPrice, 2)}
                                                onChange={(event) => calculateValues(event.target.value, 'price')}
                                              />
                                            }
                                            {(myadsList && myadsList[0] && myadsList[0].priceType) == "Floating" &&
                                              <input type="text"
                                                name="priceInput"
                                                className="form-control addpostadin p2pg"
                                                value={decimalValue(floatingPrice, 2)}
                                                onChange={(event) => calculateValues(event.target.value, 'floatingprice')}
                                              />
                                            }
                                          </h3>
                                        </center></div>
                                        <button className='btn btn-next' type="button" onClick={editincNum}>+</button>
                                      </div>
                                      {(myadsList && myadsList[0] && myadsList[0].priceType) == "Floating" &&
                                        <label className="form-check-label" for="flexRadioDefault233"> Pricing formula {decimalValue(currentInrPrice, 2) + " * " + decimalValue(floatingPrice, 2) + "% = " + decimalValue(totalFloat, 2) + " " + (myadsList && myadsList[0] && myadsList[0]?.toCurrency)} </label>
                                      }
                                      {errors && priceType == "Floating" && <span className='color-red f-14 error'>{errors}</span>}
                                      {errors1 && priceType == "Fixed" && <span className='color-red f-14 error'>{errors1}</span>}

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className='d-flex justify-content-between mt-5'>
                            <div>
                              {/* <p>Resived fee --USDT</p> */}
                            </div>
                            <div>
                              <button className='btn btn-next ms-2' type="submit" onClick={() => nextStep1(step)}>Next</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {step == 2 &&
              <div className='container mt-5 pt-5'>
                <Formik
                  initialValues={initialValues()}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    nextStep2(values)
                  }}
                >
                  {(formikProps) => {
                    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
                    return (
                      <div className='row'>
                        <div className='col-lg-12 '>
                          <div className="card bg-transparent border border-secondary">
                            <div className="card-body">
                              <label>total amount</label>
                              <div className="row ">
                                <div className="col-lg-8 ">
                                  <div className="input-group mb-3">
                                    <input type="text" className="form-control"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      name="total"
                                      autoComplete="off"
                                      value={(values.total)?.toFixed(2)}
                                      disabled={true}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <span className="input-group-text bg-white" id="basic-addon1">{(myadsList && myadsList[0] && myadsList[0]?.fromCurrency)}</span>
                                  </div>
                                  <div className='d-flex justify-content-between'>
                                    {(myadsList && myadsList[0] && myadsList[0].orderType) == 'sell' ?
                                      <div>
                                        <p>available : {decimalValue(userWallet?.p2pAmount, 2)} {(myadsList && myadsList[0] && myadsList[0]?.fromCurrency)}</p>
                                      </div>
                                      :
                                      <div><p></p></div>
                                    }
                              
                                    { (myadsList && myadsList[0] && myadsList[0].priceType) == "Fixed" ?
                                      <p>= {(values.total * currentInrPrice)?.toFixed(2)} {(myadsList && myadsList[0] && myadsList[0]?.toCurrency)}</p>
                                      :
                                      <p>= {(values.total * floatingPrice)?.toFixed(2)} {(myadsList && myadsList[0] && myadsList[0]?.toCurrency)}</p>
                                    }                              
                                    
                                  </div>


                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-8 ">
                                  <div className='d-flex  flex-md-row justify-content-between'>
                                    <div>
                                      <label>Order Limit</label>
                                      <div className="input-group mb-3">
                                        <input type="text" className="form-control"
                                          aria-label="Username"
                                          aria-describedby="basic-addon1"
                                          name="minAmt"
                                          value={values.minAmt}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          autoComplete="off"
                                          error={touched.minAmt && Boolean(errors.minAmt)}
                                          helperText={touched.minAmt && errors.minAmt}
                                        />
                                        <span className="input-group-text bg-white" id="basic-addon1">{(myadsList && myadsList[0] && myadsList[0]?.toCurrency)}</span>
                                      </div>
                                      {errors.minAmt ? <small className="invalid-minAmt error">{errors.minAmt}</small> : null}
                                      {price_validation_errors.minAmt_err ? <small className="invalid-maxAmt error">{price_validation_errors.minAmt_err}</small> : null}
                                    </div>
                                    <div className='d-flex align-items-center'>
                                      <h4>~</h4>
                                    </div>
                                    <div className=' mt-4 float-end'>
                                      <div className="input-group mb-3">
                                      {(Number(values.total) > 0) ?
                                        <input type="text" className="form-control"
                                          aria-label="Username" aria-describedby="basic-addon1"
                                          name="maxAmt"
                                          autoComplete="off"
                                          value={decimalValue(values.total * currentInrPrice, pairDetails?.toDecimal)}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={touched.maxAmt && Boolean(errors.maxAmt)}
                                          helperText={touched.maxAmt && errors.maxAmt}
                                        />
                                        :
                                        <input type="text" className="form-control"
                                          aria-label="Username" aria-describedby="basic-addon1"
                                          name="maxAmt"
                                          autoComplete="off"
                                          value={values.maxAmt}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={touched.maxAmt && Boolean(errors.maxAmt)}
                                          helperText={touched.maxAmt && errors.maxAmt}
                                        />
                                      }
                                        <span className="input-group-text bg-white" id="basic-addon1">{(myadsList && myadsList[0] && myadsList[0]?.toCurrency)}</span>
                                      </div>
                                      {errors.maxAmt ? <small className="invalid-maxAmt error">{errors.maxAmt}</small> : null}
                                      {price_validation_errors.maxAmt_err ? <small className="invalid-maxAmt error">{price_validation_errors.maxAmt_err}</small> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p><b>Payment method</b></p>
                                <p>Select up to {(p2pSettings?.selectionLimit) - (selectedType?.length)}</p>
                                {orderType == "sell" &&
                                  selectedData.length > 0 && selectedData.map((item, i) => {
                                    return (
                                      <>
                                        {(item.paymenttype == 'IMPS' || item.paymenttype == 'Bank') &&
                                          <div className='bg-gray p-2' key={i}>
                                            <div className='d-flex my-3 justify-content-between'>
                                              <div>{item.paymenttype}</div>
                                              <CloseIcon className='endtime f-13 float-right curPointer' onClick={() => removedData(item._id, i)} />
                                            </div>
                                            <p><b>Account holder name :</b> {item.holderName}</p>
                                            <p><b>Account number :</b> {item.accountNo}</p>
                                            <p><b>IFSC code:</b> {item.ifscCode}</p>
                                            {/* <p><b>Account type :</b> {item.accountType}</p>
                                            <p><b>Bank name :</b> {item.bankName}</p>
                                            <p><b>Account opening branch :</b> {item.branch}</p> */}
                                          </div>
                                        }
                                        {(item.paymenttype == 'UPI') &&
                                          <div className='bg-gray mt-2 p-2' key={i}>
                                            <div className='d-flex my-3 justify-content-between'>
                                              <div>{item.paymenttype}</div>
                                              <CloseIcon className='endtime f-13 float-right curPointer' onClick={() => removedData(item._id, i)} />
                                            </div>
                                            <p><b>Name :</b> {item.holderName}</p>
                                            <p><b>UPI ID :</b> {item.upiId}</p>
                                          </div>
                                        }
                                        {(item.paymenttype == 'Paytm') &&
                                          <div className='bg-gray mt-2 p-2' key={i}>
                                            <div className='d-flex my-3 justify-content-between'>
                                              <div>{item.paymenttype}</div>
                                              <CloseIcon className='endtime f-13 float-right curPointer' onClick={() => removedData(item._id, i)} />
                                            </div>
                                            <p><b>Name :</b> {item.holderName}</p>
                                            <p><b>Account :</b> {item.accountNo}</p>
                                          </div>
                                        }
                                      </>
                                    )
                                  })
                                }
                                {orderType == "buy" && selectedData.length > 0 && selectedData.map((item, i) => {
                                  return (
                                    <>
                                      <div className='bg-gray mt-2 p-2'>
                                        <div className='d-flex my-3 justify-content-between'>
                                          <div>{item.name}</div>
                                          <CloseIcon className='endtime f-13 float-right curPointer' onClick={() => removedData(item._id, i)} />
                                        </div>
                                      </div>
                                    </>
                                  )
                                })
                                }
                                {orderType == "sell" ?
                                  <button className='btn btn-next' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={paymentDetails.length > 0 ? () => selectPayment() : () => navigate('/p2p-user-center')}>+ Add</button>
                                  :
                                  <button className='btn btn-next' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectPayment()}>+ Add</button>
                                }
                                <p className='mt-3'>Payment time limit</p>
                                <select className="form-select w-25"
                                  aria-label="Default select example"
                                  id="paymentTime"
                                  name="paymentTime"
                                  onChange={handleinputChange}
                                  value={paymentTime}
                                >
                                  <option value={paymentTime == 15 ? paymentTime : 15} selected={paymentTime == 15 ? true : false}> 15 min</option>
                                  <option value={paymentTime == 30 ? paymentTime : 30} selected={paymentTime == 30 ? true : false}>30 min</option>
                                  <option value={paymentTime == 45 ? paymentTime : 45} selected={paymentTime == 45 ? true : false}>45 min</option>
                                  <option value={paymentTime == 1 ? paymentTime : 1} selected={paymentTime == 1 ? true : false}>1 hr</option>
                                  <option value={paymentTime == 2 ? paymentTime : 2} selected={paymentTime == 2 ? true : false}>2 hr</option>
                                  <option value={paymentTime == 3 ? paymentTime : 3} selected={paymentTime == 3 ? true : false}>3 hr</option>
                                  <option value={paymentTime == 4 ? paymentTime : 4} selected={paymentTime == 4 ? true : false}>4 hr</option>
                                  <option value={paymentTime == 5 ? paymentTime : 5} selected={paymentTime == 5 ? true : false}>5 hr</option>
                                  <option value={paymentTime == 5 ? paymentTime : 5} selected={paymentTime == 5 ? true : false}>6 hr</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className='d-flex justify-content-between mt-5'>
                                <div>
                                  {/* <p>Resived fee --USDT</p> */}
                                </div>
                                <div>
                                  <button className='btn btn-next ' type="button" onClick={() => setStep(step - 1)}>Previous</button>
                                  <button className='btn btn-next ms-2' type="button" onClick={() => navigate("/myads")}>Cancel</button>
                                  <button className='btn btn-next ms-2' type="submit" onClick={() => handleSubmit(values)}>Post</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                </Formik>
              </div>
            }
          </>
        }
      </div>
      {/* <!-- Modal --> */}
      <Modal show={p2ppayementOpen} onHide={() => setp2ppayementOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select payment method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            {orderType == 'sell' && paymentDetails.length > 0 && paymentDetails.map((item, i) => {
              return (
                <>
                  {(item.paymenttype == 'IMPS' || item.paymenttype == 'Bank') &&
                    <div className='bg-gray p-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                      <div className='d-flex my-3 justify-content-between'>
                        <div>{item.paymenttype}</div>
                        {/* <div><FaEdit></FaEdit></div> */}
                      </div>
                      <p><b>Account holder name :</b> {item.holderName}</p>
                      <p><b>Account number :</b> {item.accountNo}</p>
                      <p><b>IFSC code:</b> {item.ifscCode}</p>
                      {/* <p><b>Account type :</b> {item.accountType}</p>
                      <p><b>Bank name :</b> {item.bankName}</p>
                      <p><b>Account opening branch :</b> {item.branch}</p> */}
                    </div>
                  }
                  {(item.paymenttype == 'UPI') &&
                    <div className='bg-gray mt-2 p-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                      <div className='d-flex my-3 justify-content-between'>
                        <div>{item.paymenttype}</div>
                        {/* <div><FaEdit></FaEdit></div> */}
                      </div>
                      <p><b>Name :</b> {item.holderName}</p>
                      <p><b>UPI ID :</b> {item.upiId}</p>
                    </div>
                  }
                  {(item.paymenttype == 'Paytm') &&
                    <div className='bg-gray mt-2 p-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                      <div className='d-flex my-3 justify-content-between'>
                        <div>{item.paymenttype}</div>
                        {/* <div><FaEdit></FaEdit></div> */}
                      </div>
                      <p><b>Name :</b> {item.holderName}</p>
                      <p><b>Account :</b> {item.accountNo}</p>
                    </div>
                  }
                </>
              )
            })
            }
            {orderType == "buy" && allpaymentsList && allpaymentsList.length > 0 && allpaymentsList.map((item, i) => {
              return (
                <>
                  <div className='bg-gray mt-2 p-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                    <div className='d-flex my-3 justify-content-between'>
                      <div>{item.name}</div>
                      {/* <div><FaEdit></FaEdit></div> */}
                    </div>
                  </div>
                </>
              )
            })
            }

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate('/p2p-user-center')}>Add</button>
            {/* <button type="button" className="btn btn-next">Refresh</button> */}
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal show={verificationformOpen} onHide={()=>setverificationformOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Google verification code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={formik.handleSubmit}>   
        <div className="row justify-content-center align-items-center ">
        <div className="row mt-4">
            <span className="phonenumber-change-text-2">
            Google verification code
            </span>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    autoComplete='off'
                    label="Google verification code" 
                    id="authCode"
                    name='authCode'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.authCode && Boolean(formik.errors.authCode)}
                    helperText={formik.touched.authCode && formik.errors.authCode}                                />
            </div>
            {formik.errors.authCode ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.authCode}</span> : null}
            </div>
        </div>
        <div className='row mt-5'>
            <div className='col'>
                <div className="d-grid">
                    <button className="add-payment-method-confirm-button" type="submit" disabled={isLoading}>Confirm</button>
                </div>
            </div>
        </div>
      </form>
      </Modal.Body>
    </Modal> */}

      <Modal  className=' modal-dialog-centered py-5 mt-5'  show={confirmformOpen} onHide={() => setconfirmformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully posted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="custom-left color-white f-17 " htmlFor="FirstName">Your ad has been published and is now visible to other users once it goes online. Please pay attention to prompts for new orders</label>
          <div className='row'>
            <label className="custom-left color-white f-17 " htmlFor="FirstName"><span>{passData?.orderType == "buy" ? "Buy" : "Sell"} &nbsp;<b className='color-yellow'>{selectPair?.split("_")[0]}</b>&nbsp; with&nbsp;<b className='color-yellow'>{selectPair?.split("_")[1]}</b></span></label>
            <label className="custom-left color-white f-17 " htmlFor="FirstName">
              <b><span className='color-yellow'>₹ {((passData?.price != undefined) ? (decimalValue(passData?.price, 2)) : 0)}</span></b>
            </label>
            <label className="custom-left color-white f-17 " htmlFor="FirstName">Amount &nbsp;&nbsp;&nbsp;<span className='usdtprice'> {((passData?.usdtPrice != undefined) ? (passData?.usdtPrice) : 0)} {selectPair?.split("_")[0]}</span></label>
            <label className="custom-left color-white f-17 " htmlFor="FirstName">Limit &nbsp;&nbsp;&nbsp;<span className='usdtprice'> {(passData?.minAmt != undefined ? (passData?.minAmt) : 0) + '-' + ((passData?.maxAmt != undefined) ? (passData?.maxAmt) : 0)} {selectPair?.split("_")[1]}</span></label>
          </div>
          <div className='row mt-5'>
            <div className='col'>
              <div className="d-grid">
                <button className="add-payment-method-confirm-button" type="submit" onClick={() => navigate('/myads')}>Done</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
