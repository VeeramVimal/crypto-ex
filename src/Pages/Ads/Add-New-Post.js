import React, { useEffect, useState } from 'react'
import NavbarOne from "../siteTheme/NavbarOne";
import P2PHeader from "./../separate/P2PHeader";
import "../../assets/styledev.css";
import { FaEdit, FaParking } from 'react-icons/fa'
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
import { type } from 'jquery';
import { isEmpty, pageAllowCheck, toFixedWithoutRound } from "../../core/helper/common";
import { Bars } from "react-loader-spinner";
import jQuery from "jquery";
import { HiOutlineRefresh } from "react-icons/hi";

var jq = jQuery.noConflict();

const countries = Country.getAllCountries();

const validationSchema = yup.object({
  total: yup
    .number()
    .typeError('Enter trading amount')
    .required('Enter trading amount'),
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

export default function PostNewAdd(props) {

  const navigate = useNavigate();
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
  const [minAmount, setminAmount] = useState(0);
  const [maxAmount, setmaxAmount] = useState(0);
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
  const [passData, setpassData] = useState(defaultPassData);
  const [paymentDetails, setpaymentDetails] = useState({});
  const [total, settotal] = useState(0);
  const [minAmt, setminAmt] = useState(0);
  const [maxAmt, setmaxAmt] = useState(0);
  const [mypaymentNames, setmypaymentNames] = useState([]);
  const [allpaymentsList, setallpaymentsList] = useState([]);
  const [fromCurrencyList, setfromCurrencyList] = useState([]);
  const [pairList, setpairList] = useState({ fromCurrencyName: "", toCurrencyName: "", toCurrencySymbol: "" });
  const [fixedMinMaxData, setfixedMinMaxData] = useState({ min: "", max: "" });
  const [toCurrencyList, settoCurrencyList] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [refreshloader, setrefreshloader] = useState(0);

  const [countryList, setCountryList] = useState([]);
  const [selectedData, setselectedData] = useState([]);
  const [selectedType, setselectedType] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState([{ label: "", value: "" }]);
  const [loaderStatus, setloaderStatus] = useState(false);

  const [errors, errors_set] = useState("");
  const [errors1, errors_set1] = useState("");
  const [price_validation_errors, setprice_validation_errors] = useState({ minAmt_err: "", maxAmt_err: "", total_err: "" });
  const errorType = 'error';

  useEffect(() => {
    if (pairDetails) {
      if (pairDetails.minTrade) {
        setminAmount(pairDetails.minTrade)
      }
      if (pairDetails.maxTrade) {
        setmaxAmount(pairDetails.maxTrade)
      }
    }
  }, [pairDetails,p2pSettings]);

  useEffect(() => {
    const LoggedIn = getCookie('userToken');
    setisLoggedIn(LoggedIn);
    if (LoggedIn) {
      if (myProfile) {
        const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
        if (pageAllowCheckResp.type == "error") {
          toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
          navigate(pageAllowCheckResp.navigate);
        }
        getPayment();
        getallp2pPairs();

        getallPaymentsDet();
        getCountryList();
        getpriceRangeDet(orderType, pairList);
      }
    } else {
      navigate("/login");
    }
  }, [myProfile]);

  const initialValues = () => {
    return {
      total: '',
      minAmt: minAmount,
      maxAmt: maxAmount,
      accountType: '',
      branch: '',
      paymentTime: paymentTime,
    }
  }

  async function getallp2pPairs() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getallPairs`,
        method: 'GET',
      }
      const { status, data } = await makeRequest(params);
      if (status && data) {
        let fromCurrency = [];
        let toCurrency = [];
        if (data.length > 0) {
          data.map(async (item, i) => {
            if (item.pairs.length > 0) {
              item.pairs.map((data) => {
                fromCurrency.push(data.fromCurrency);
                toCurrency.push(data.toCurrency);
              });
              fromCurrency = fromCurrency.filter((arr, index, self) => index === self.findIndex((t) => (t.currencySymbol === arr.currencySymbol)))
              toCurrency = toCurrency.filter((arr, index, self) => index === self.findIndex((t) => (t.currencySymbol === arr.currencySymbol)))
            }
            if (i == 0 && item.pairs[0]) {
              let pairnames = item?.pairs[0]?.pair?.split(/[_]+/)
              setpairList({ fromCurrencyName: pairnames[0], toCurrencyName: pairnames[1], toCurrencySymbol: item.pairs[0].toCurrency.currencySymbolCode })
              setpairDetails(item.pairs[0])
              setTimeout(() => {
                getCurrentPairPrice(item.pairs[0].pair);
              }, 300)
              getp2pPair(item.pairs[0].pair);
              const data = {
                type: orderType,
                pair: pairnames[0] + "_" + pairnames[1]
              }
              const params = {
                url: `${Config.V1_API_URL}p2p/getpriceRange`,
                method: 'POST',
                body: data
              }
              const response = (await makeRequest(params));
              if (response.status) {
                setorderPrice(response?.data);
                setloaderStatus(true)
              }
            }
          })
        } else {
          navigate("/trade/all-payments");
          toast({ type: "error", message: "All pairs is De-Activated!" });
          return false;
        }
        setfromCurrencyList(fromCurrency);
        settoCurrencyList(toCurrency);
      } else {
        setloaderStatus(false);
      }
    } catch (err) {
      console.log('err : ', err);
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
        setloaderStatus(true);
        if (respData.status === 0) {
          toast({ type: "error", message: "This pair is De-Activated!" });
          return false;
        }
        var value = { userId: myProfile?._id, currencyId: respData.fromCurrency }
        const params = {
          url: `${Config.V1_API_URL}p2p/getBalance`,
          method: 'POST',
          body: value
        }
        const result = (await makeRequest(params));
        if (result.status && result.data) {
          setuserWallet(result.data)
        } else {
          setuserWallet(0)
        }
      } else {
        toast({ type: "error", message: "Invalid pair!" });
        return false;
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
      if (response.status && response.data) {
        const lastPrice = response.data?.lastPrice;
        const totalval = (floatingPrice * lastPrice / 100);
        setcurrentInrPrice(lastPrice);
        settotalFloat(totalval?.toFixed((pairDetails && pairDetails.toDecimal)));
        let minFixedVal = (lastPrice * (p2pSettings && p2pSettings.minPercentage)) / 100;
        let maxFixedVal = (lastPrice * (p2pSettings && p2pSettings.maxPercentage)) / 100;
        setfixedMinMaxData({ min: minFixedVal, max: maxFixedVal })
        setloaderStatus(true);
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
      if (response.status) {
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
      if (response.status) {
        setpaymentDetails(response?.data);
      }
    } catch (err) { }
  }
  async function handleTabSelect(type) {
    if (paymentDetails.length == 0) {
      let type = 'error';
      toast({ type, message: "Please add payment details.." });
      navigate("/p2p-user-center");
    }
    // formik.values = "";
    passData.orderType = type;
    setpassData(passData);
    setorderType(type);
    getpriceRangeDet(type, pairList);
    setpairList({ fromCurrencyName: pairList?.fromCurrencyName, toCurrencyName: pairList?.toCurrencyName, toCurrencySymbol: pairList?.toCurrencySymbol })
    getp2pPair(pairList?.fromCurrencyName + "_" + pairList?.toCurrencyName);
    getCurrentPairPrice(pairList?.fromCurrencyName + "_" + pairList?.toCurrencyName);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     authCode: '',
  //   },
  //   validationSchema: authcodevalidationSchema,
  //   onSubmit: async (values) => {
  //     setisLoading(true);
  //     const data = {
  //       userId: myProfile?._id,
  //       authCode: values.authCode,
  //       passData: passData
  //     }
  //     const params = {
  //       url: `${Config.V1_API_URL}p2p/submitVerification`,
  //       method: 'POST',
  //       body: data
  //     }
  //     const response = (await makeRequest(params));
  //     if (response.status) {
  //       setconfirmformOpen(true);
  //       setverificationformOpen(false);
  //     } else {
  //       let type = 'error';
  //       toast({ type, message: response.message });
  //       if (response.type == "KYC") {
  //         navigate("/my/identification");
  //       } else if (response.type == "TFA" || response.type == "2FA") {
  //         navigate("/google-authenticator");
  //       }
  //     }
  //     setisLoading(false);
  //   },
  // });

  async function confirmOrder(){
    try{
      const data = {
        userId: myProfile?._id,
        passData: passData
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/submitVerification`,
        method: 'POST',
        body: data
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      setisLoading(false);
      let type = 'error';
      if (response.status) {
        type = 'success';
        setverificationformOpen(false);
        navigate("/myAds");
      } else {
        if (response.type == "KYC") {
          navigate("/my/identification");
        } else if (response.type == "TFA" || response.type == "2FA") {
          navigate("/google-authenticator");
        }
      }
      toast({ type, message: response.message });
    } catch (err){}
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
  const handlecountryChange = (event) => {
    if (event.length > 0) {
      passData.country = event;
      setSelectedCountry(event);
      setpassData(passData);
    } else {
      setSelectedCountry([]);
    }
  }
  const handleinputChange = (event) => {
    const { name = "", value, checked } = event.target;
    console.log("value:", value, name)
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
      case "fromCurrency":
        pairList.fromCurrencyName = value;
        getp2pPair(value + "_" + pairList.toCurrencyName);
        getCurrentPairPrice(value + "_" + pairList.toCurrencyName);
        setpairList({ fromCurrencyName: value, toCurrencyName: pairList.toCurrencyName, toCurrencySymbol: pairList?.toCurrencySymbol });
        getpriceRangeDet(orderType, pairList)
        break;
      case "toCurrency":
        let symbol = ""
        toCurrencyList.find(function (data, index) {
          if (data.currencySymbol === value) {
            symbol = data.currencySymbolCode
          }
        })
        pairList.toCurrencyName = value;
        getp2pPair(pairList.fromCurrencyName + "_" + value);
        getCurrentPairPrice(pairList.fromCurrencyName + "_" + value);
        setpairList({ fromCurrencyName: pairList.fromCurrencyName, toCurrencyName: value, toCurrencySymbol: symbol });
        getpriceRangeDet(orderType, pairList);
        break;
      case "total":
        settotal(event.target.value);
        break;
      case "radio":
        setonlineOffline(event.target.value);
        passData.orderMode = event.target.value;
        setpassData(passData);
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
  function calculateValues(placeValue, placeType) {
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
        if ((fixedMinMaxData) && (fixedMinMaxData.min > getPrice || fixedMinMaxData.max < getPrice)) {
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
  let incNum = () => {
    if (priceType == "Fixed") {
      setcurrentInrPrice(Number(currentInrPrice) + incDecVal);
    } else {
      const newPrice = parseFloat(floatingPrice + incDecVal);
      const total = (newPrice * currentInrPrice) / 100;
      setfloatingPrice(Number(floatingPrice) + incDecVal);
      setchangeInrPrice(Number(currentInrPrice) + incDecVal)
      settotalFloat(Number(total))
    }
  };
  let decNum = () => {
    if (priceType == "Fixed") {
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
  async function selectPaymentType(selectpayment) {
    try {
      if (selectValue.length > p2pSettings?.selectionLimit) {
        let type = 'error'
        toast({ type, message: 'Select up to' + p2pSettings?.selectionLimit + 'methods' });
        return false;
      }
      selectValue.push(selectpayment);
      let uniqueChars = [];
      if (selectValue.length > 0) {
        uniqueChars = selectValue.filter((c, index) => {
          return selectValue.indexOf(c) === index;
        });
      }
      setp2ppayementOpen(false);
      const selectPaymentId = [];
      const paymentArray = [];
      const paymenttypes = [];
      if (orderType == "buy") {
        allpaymentsList.length > 0 && allpaymentsList.map((payment, i) => {
          uniqueChars.find(function (value, index) {
            if (value._id == payment._id) {
              paymentArray.push(payment);
              selectPaymentId.push(payment._id);
              paymenttypes.push(payment.name)
            }
            setmypaymentNames(paymenttypes);
            setselectedData(paymentArray);
            setselectedType(selectPaymentId);
            setpaymentNames(paymenttypes);
          });
        });
      }
      if (orderType == "sell") {
        paymentDetails.length > 0 && paymentDetails.map((payment, i) => {
          uniqueChars.find(function (value, index) {
            if (value._id == payment._id) {
              paymentArray.push(payment);
              selectPaymentId.push(payment._id);
              paymenttypes.push(payment.paymenttype)
            }
            setmypaymentNames(paymenttypes);
            setselectedData(paymentArray);
            setselectedType(selectPaymentId);
            setpaymentNames(paymenttypes);
          });
        });
      }
      setselectValue(uniqueChars);
    } catch (err) { }
  }
  async function removedData(type, n) {
    try {
      const index = selectValue.findIndex(prop => prop.key === type);
      if (selectValue.length > 0) {
        selectValue.splice(index, 1);
        setselectedData(selectValue);
        const paymenttypes = [];
        paymentDetails.length > 0 && paymentDetails.map((payment, i) => {
          selectValue.find(function (value, index) {
            if (value.paymenttype == payment.paymenttype) {
              paymenttypes.push(payment.paymenttype)
            }
            setmypaymentNames(paymenttypes);
          });
        });
      } else {
        setselectedData([]);
      }
    } catch (err) { }
  }
  async function getpriceRangeDet(type, pairList) {
    try {
      const data = {
        type: type,
        pair: pairList?.fromCurrencyName + "_" + pairList?.toCurrencyName
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/getpriceRange`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setorderPrice(response?.data);
      }
    } catch (err) { }
  }
  async function nextStep1(step) {
    try {
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
      errors_set("");
      const data = {
        step: step + 1,
        pairId: pairDetails?._id,
        price: currentInrPrice,
        highest: orderPrice,
        priceType: priceType,
        userId: myProfile?._id
      }
      setpassData(data);
      setStep(step + 1);
    } catch (err) { }
  }
  const nextStep2 = async (values) => {
    const availableBal = userWallet?.p2pAmount;
    const usdtBal = Number(values.total);
    const tradeFiatAmount = (currentInrPrice * usdtBal)?.toFixed(2);
    // values.maxAmt = Number(values.maxAmt) <=  (usdtBal * currentInrPrice) ? (usdtBal * currentInrPrice)?.toFixed(2) : Number(values.maxAmt)
    values.maxAmt = (usdtBal * currentInrPrice)?.toFixed(2);
    let errMsg = '';
    if (orderType == 'sell') {
      if (availableBal === 0) {
        errMsg = 'Insufficient Balance';
      }
    }
    if (errMsg) {
      toast({ type: errorType, message: errMsg });
      return false;
    }
    if (availableBal < Number(usdtBal) && orderType == 'sell') {
      setprice_validation_errors({ total_err: "The total amount should not exceed the available balance" });
      return false;
    } else if (pairDetails?.minTrade > Number(values.minAmt)) {
      setprice_validation_errors({ minAmt_err: "Min limit should not be less than " + minAmount +" "+ (pairDetails?.pair?.split(/[_]+/)[1])});
      return false;
    } else if (pairDetails?.maxTrade < Number(values.maxAmt)) {
      setprice_validation_errors({ maxAmt_err: "Max order limit " + pairDetails?.maxTrade });
      return false;
    }
    else if (tradeFiatAmount < Number(values.minAmt)) {
      toast({ type: errorType, message: "Min limit should not be less than " + minAmount +" "+ (pairDetails?.pair?.split(/[_]+/)[1]) });
      return false;
    } else if (tradeFiatAmount < Number(values.maxAmt) && orderType == 'sell') {
      setprice_validation_errors({ maxAmt_err: "Exceeds the maximum available amount" });
      return false;
    } else if (Number(values.maxAmt) < Number(values.minAmt)) {
      setprice_validation_errors({ maxAmt_err: "Max order should not be less than min amount" });
      return false;
    } else {
      setprice_validation_errors({ minAmt_err: "", maxAmt_err: "", total_err: "" });
    }
    if (selectedData.length != 0) {
      if (p2pSettings?.selectionLimit < selectValue.length) {
        let type = 'error'
        toast({ type, message: 'Select up to' + p2pSettings?.selectionLimit + 'methods' });
        return false;
      }
      setStep(3);
      const price = priceType == "Floating" ? (totalFloat) : (currentInrPrice);
      const floatingVal = priceType == "Floating" ? (floatingPrice) : 0;
      const buypriceRange = orderType == "buy" ? (orderPrice) : 0;
      const sellpriceRange = orderType == "sell" ? (orderPrice) : 0;
      const totalVal = values.total * price;
      const data = {
        totalPrice: totalVal,
        usdtPrice: values.total,
        price,
        highestPrice: (buypriceRange != 0) ? buypriceRange : 0,
        lowestPrice: (sellpriceRange != 0) ? sellpriceRange : 0,
        minAmt: values.minAmt,
        maxAmt: values.maxAmt,
        paymentId: selectedType,
        paymentNames: paymentNames,
        timeLimit: values.paymentTime,
        userId: myProfile?._id,
        pairId: pairDetails?._id,
        pairName: (pairList.fromCurrencyName + "_" + pairList.toCurrencyName),
        fromCurrency: pairDetails?.fromCurrency,
        toCurrency: pairDetails?.toCurrency,
        priceType,
        floatingPrice: floatingVal,
        country: selectedCountry == "All Regions" ? countryList : selectedCountry,
        orderType,
      }
      setpassData(data)
    } else {
      let type = 'error'
      toast({ type, message: 'Please select at least 1 payment method' });
    }
  }
  async function nextStep3(step) {
    let type = 'error';
    if (passData?.registeredStatus == true && (passData?.registeredDays == "" || passData?.registeredDays == undefined)) {
      toast({ type, message: "Please enter the registered time limit" });
      return false;
    }
    if (passData?.holdingStatus == true && (passData?.holdingBTC == "" || passData?.holdingBTC == undefined)) {
      toast({ type, message: "Please enter holdings" });
      return false;
    } else if (passData?.holdingStatus == true && (passData?.holdingBTC == 0)) {
      toast({ type, message: "Holdings more than 0" });
      return false;
    }
    setverificationformOpen(true);
  }

  async function Refresh(type) {
    try {
      if (type == 'refresh') {
        setrefreshloader(true);
        setTimeout(() => {
          setrefreshloader(false);
        }, 1000)
        getPayment();
      } else {
        setrefreshloader(false);
      }
    } catch (err) { }
  }

  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="deposit-page-top-banner min-vh-100">
        {isLoggedIn &&
          <P2PHeader />
        }
        {loaderStatus == false &&
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
        {loaderStatus == true &&
          <>
            {step == 1 &&
              <div className="container mt-5 pt-5 ">
                <div className="card bg-transparent border border-secondary">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-8  css-tab-col">
                        <ul className="nav nav-pills mb-4 d-flex justify-content-center" id="pills-tab" role="tablist">
                          <li className="nav-item tab-css" role="presentation">
                            <button className={orderType == "buy" ? "btn btnfont nav-link px-0 mx-2 px-1 active" : "btn btnfont nav-link px-0 mx-2 px-1"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => handleTabSelect("buy") }>I want to buy</button>
                          </li>
                          <li className="nav-item tab-css" role="presentation">
                            <button className={orderType == "sell" ? "btn  btnfont nav-link px-0 mx-2 px-1 active" : "btn  btnfont nav-link px-0 mx-2 px-1"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => handleTabSelect("sell")}>I want to sell</button>
                          </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                            <div className="row align-items-center">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between flex-row align-items-center">
                                  <div>
                                    <label className='form-label'>Asset</label>
                                    <select className="form-select w-100" aria-label="Default select example" name="fromCurrency" onChange={handleinputChange}>
                                      {fromCurrencyList && fromCurrencyList.length > 0 && fromCurrencyList.map((row) => {
                                        return (
                                          <option value={row?.currencySymbol}>{row?.currencySymbol}</option>
                                        )
                                      })}
                                    </select>
                                  </div>
                                  <div >
                                    <AiOutlineArrowRight className='mt-4' />
                                  </div>
                                  <div>
                                    <label className='form-label'>With Fiat</label>
                                    <select className="form-select w-100" aria-label="Default select example" name="toCurrency" onChange={handleinputChange}>
                                      {toCurrencyList && toCurrencyList.length > 0 && toCurrencyList.map((row) => {
                                        return (
                                          <option value={row?.currencySymbol}>{row?.currencySymbol}</option>
                                        )
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4 mt-5">
                                <h6>Your price</h6>
                                <h1 className='ads_price'>{pairList.toCurrencySymbol}
                                  {(priceType == "Floating" && totalFloat == 0) ?
                                    (decimalValue(currentInrPrice, (pairDetails && pairDetails.toDecimal)))
                                    :
                                    (priceType == "Floating" && totalFloat > 0) ?
                                      (decimalValue(totalFloat, (pairDetails && pairDetails.toDecimal)))
                                      :
                                      (decimalValue(currentInrPrice, (pairDetails && pairDetails.toDecimal)))
                                  }
                                </h1>
                              </div>
                              <div className="col-lg-4 mt-5">
                                <h6>{orderType == "buy" ? "Highest Order price" : "Lowest Order price"}</h6>
                                <h1 className='ads_price'>{pairList.toCurrencySymbol} {orderPrice != "" ? decimalValue(orderPrice, (pairDetails && pairDetails.toDecimal)) : 0}</h1>
                              </div>
                              <div className="col-lg-12 mt-5">
                                <h4>Price type</h4>
                                <div className='d-flex'>
                                  <div className="form-check">
                                    <input className="form-check-input"
                                      type="radio" name="priceType"
                                      onChange={handleinputChange}
                                      value="Fixed"
                                      checked={priceType === "Fixed" ? true : false}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault122">
                                      Fixed
                                    </label>
                                  </div>
                                  <div className="form-check ms-5">
                                    <input className="form-check-input"
                                      type="radio" name="priceType"
                                      onChange={handleinputChange}
                                      value="Floating"
                                      checked={priceType === "Floating" ? true : false}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault233">
                                      Floating
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-6 mt-5">
                                  <label className="form-check-label" for="flexRadioDefault233"> {priceType == "Fixed" ? priceType : priceType + " Price Margin"} </label>
                                  <div className="card bg-transparent border border-secondary">
                                    <div className="card-body">
                                      <div className="d-flex">
                                        <button className='btn btn-next' type="button" onClick={decNum}>-</button>
                                        <div className='w-100'><center>
                                          {/* <h3>81.35</h3> */}
                                          <h3>
                                            {priceType == "Fixed" ?
                                              <input type="text" name="priceInput"
                                                className="form-control addpostadin p2pg"
                                                value={decimalValue(currentInrPrice, (pairDetails && pairDetails.toDecimal))}
                                                onChange={(event) => calculateValues(event.target.value, 'price')}
                                              />
                                              :
                                              <input type="text" name="priceInput" className="form-control addpostadin p2pg"
                                                value={decimalValue(floatingPrice, (pairDetails && pairDetails.toDecimal))}
                                                onChange={(event) => calculateValues(event.target.value, 'floatingprice')}
                                              />
                                            }
                                          </h3>
                                        </center>
                                        </div>
                                        <button className='btn btn-next' type="button" onClick={incNum}>+</button>
                                      </div>
                                      {priceType == "Floating" &&
                                        <label className="form-check-label" for="flexRadioDefault233">
                                          Pricing formula  {" "}
                                          {decimalValue(currentInrPrice, (pairDetails && pairDetails.toDecimal)) + " * "
                                            + decimalValue(floatingPrice, (pairDetails && pairDetails.toDecimal)) + "% = "
                                            + decimalValue(totalFloat, (pairDetails && pairDetails.toDecimal)) + " "
                                            + (pairList && pairList?.toCurrencyName)
                                          }
                                        </label>
                                      }<br />
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
                            <div>{/* <p>Resived fee --USDT</p> */}</div>
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
                              <label>Total amount</label>
                              <div className="row ">
                                <div className="col-lg-8 ">
                                  <div className="input-group mb-3">
                                    <input type="text" className="form-control"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      name="total"
                                      autoComplete="off"
                                      value={decimalValue(values.total, pairDetails?.fromDecimal)}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={touched.total && Boolean(errors.total)}
                                      helperText={touched.total && errors.total}
                                    />
                                    <span className="input-group-text bg-white" id="basic-addon1">{(pairList && pairList?.fromCurrencyName)}</span>
                                  </div>
                                  {errors.total ? <small className="invalid-total error">{errors.total}</small> : null}
                                  {price_validation_errors.total_err && values.total > 0 ? <small className="invalid-total error">{price_validation_errors.total_err}</small> : null}
                                  <div className='d-flex justify-content-between'>
                                    {orderType == "sell" &&
                                      <div>
                                        <p>available : {decimalValue(userWallet?.p2pAmount, 2)} {(pairList && pairList?.fromCurrencyName)}</p>
                                      </div>
                                    }
                                    <div></div>
                                    <div>
                                      <p>= {(Number(values.total) * currentInrPrice)?.toFixed(2)} {(pairList && pairList?.toCurrencyName)}</p>
                                    </div>
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
                                          value={decimalValue(values.minAmt, pairDetails?.toDecimal)}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          autoComplete="off"
                                          error={touched.minAmt && Boolean(errors.minAmt)}
                                          helperText={touched.minAmt && errors.minAmt}
                                        />
                                        <span className="input-group-text bg-white" id="basic-addon1">{(pairList && pairList?.toCurrencyName)}</span>
                                      </div>
                                      {price_validation_errors.minAmt_err ? <small className="invalid-minAmt error">{price_validation_errors.minAmt_err}</small> : null}

                                      {errors.minAmt ? <small className="invalid-minAmt error">{errors.minAmt}</small> : null}
                                    </div>
                                    <div className='d-flex align-items-center'>
                                      <h4>~</h4>
                                    </div>
                                    <div className=' mt-4 float-end'>
                                      <div className="input-group mb-3">
                                        {(Number(values.total) > 0) ?
                                          <input
                                            type="text" className="form-control"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            name="maxAmt"
                                            autoComplete="off"
                                            value={decimalValue((values.total * currentInrPrice),pairDetails?.fromDecimal)}
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

                                        <span className="input-group-text bg-white" id="basic-addon1">{(pairList && pairList?.toCurrencyName)}</span>
                                      </div>
                                      {errors.maxAmt ? <small className="invalid-maxAmt error">{errors.maxAmt}</small> : null}
                                      {price_validation_errors.maxAmt_err ? <small className="invalid-maxAmt error">{price_validation_errors.maxAmt_err}</small> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p><b>Payment method</b></p>
                                <p>Select up to {p2pSettings?.selectionLimit}</p>
                                {orderType == "sell" && selectedData.length > 0 && selectedData.map((item, i) => {
                                  return (
                                    <>
                                      {(item.paymenttype == 'IMPS' || item.paymenttype == 'Bank') &&
                                        <div className='bg-gray p-2' >
                                          <div className='d-flex my-3 justify-content-between'>
                                            <div>{item.paymenttype}</div>
                                            <CloseIcon className='endtime f-13 float-right' onClick={() => removedData(item.paymenttype, i)} />
                                            {/* <div><FaEdit></FaEdit></div> */}
                                          </div>
                                          <p><b>Account holder name :</b> {item.holderName}</p>
                                          <p><b>Account number :</b> {item.accountNo}</p>
                                          <p><b>IFSC code:</b> {item.ifscCode}</p>
                                          {/* <p><b>Account type :</b> {item.accountType}</p> */}
                                          {/* <p><b>Bank name :</b> {item.bankName}</p>
                                          <p><b>Account opening branch :</b> {item.branch}</p> */}
                                        </div>
                                      }
                                      {(item.paymenttype == 'UPI') &&
                                        <div className='bg-gray mt-2 p-2'>
                                          <div className='d-flex my-3 justify-content-between'>
                                            <div>{item.paymenttype}</div>
                                            <CloseIcon className='endtime f-13 float-right' onClick={() => removedData(item.paymenttype, i)} />
                                            {/* <div><FaEdit></FaEdit></div> */}
                                          </div>
                                          <p><b>Name :</b> {item.holderName}</p>
                                          <p><b>UPI ID :</b> {item.upiId}</p>
                                        </div>
                                      }
                                      {(item.paymenttype == 'Paytm') &&
                                        <div className='bg-gray mt-2 p-2'>
                                          <div className='d-flex my-3 justify-content-between'>
                                            <div>{item.paymenttype}</div>
                                            <CloseIcon className='endtime f-13 float-right' onClick={() => removedData(item.paymenttype, i)} />
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
                                {orderType == "buy" && selectedData.length > 0 && selectedData.map((item, i) => {
                                  return (
                                    <>
                                      <div className='bg-gray mt-2 p-2'>
                                        <div className='d-flex my-3 justify-content-between'>
                                          <div>{item.name}</div>
                                          <CloseIcon className='endtime f-13 float-right' onClick={() => removedData(item.paymenttype, i)} />
                                          {/* <div><FaEdit></FaEdit></div> */}
                                        </div>
                                        {/* <p><b>Name :</b> {item.holderName}</p>
                                  <p><b>Account :</b> {item.accountNo}</p> */}
                                      </div>
                                    </>
                                  )
                                })
                                }
                                <button className='btn btn-next mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setp2ppayementOpen(true)}>+ Add</button>
                                <p className='mt-3'>Payment time limit</p>
                                <select className="form-select w-25"
                                  aria-label="Default select example"
                                  id="paymentTime"
                                  name="paymentTime" onChange={handleChange}
                                >
                                  <option value="15" > 15 min</option>
                                  <option value="30">30 min</option>
                                  <option value="45">45 min</option>
                                  <option value="1" selected>1 hr</option>
                                  <option value="2">2 hr</option>
                                  <option value="3">3 hr</option>
                                  <option value="4">4 hr</option>
                                  <option value="5">5 hr</option>
                                  <option value="6">6 hr</option>
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
                                  <button className='btn btn-next ms-2' type="submit" onClick={() => handleSubmit(values)}>Next</button>
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
            {step == 3 &&
              <form>
                <div className="container mt-5 pt-5">
                  <div className='card bg-transparent border border-secondary'>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-8">
                          <div >
                            <label for="floatingTextarea">Remarks (optional)</label>
                            <textarea className="form-control"
                              placeholder="Please do not include any crypto-related words,such as crypto,P2P,USDT etc."
                              id="remarks"
                              name='remarks'
                              autoComplete='off'
                              onChange={handleinputChange}
                            ></textarea>
                          </div>
                          <div className=" mt-3">
                            <label for="floatingTextarea">Auto replay (optional)</label>
                            <textarea className="form-control" placeholder="Auto reply message will be sent to the counterparty once the order is created"
                              id="floatingTextarea"
                              name='autoreply'
                              autoComplete='off'
                              onChange={handleinputChange}
                            ></textarea>
                          </div>
                          <div className=" mt-3">
                            <label for="floatingTextarea">Select Region(s) Availability</label>
                            <MultiSelect
                              options={countryList}
                              value={selectedCountry}
                              onChange={handlecountryChange}
                              labelledBy="Select"
                              className="f-ads-view bg-transparent dark "
                              setSelected={setSelectedCountry}
                            />
                          </div>
                          {/*  <select className="form-select mt-3" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option> 
                      </select>*/}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className=" mt-4">
                            <label for="floatingTextarea">CounterParty Condition</label>
                          </div>
                          <div className="form-check mt-3">
                            <input className="form-check-input"
                              type="checkbox"
                              id="checkedKyc"
                              name="checkedKyc"
                              onChange={handleinputChange}
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              Complete KYC
                            </label>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox"
                                  name="registeredStatus"
                                  id="registeredStatus"
                                  onChange={handleinputChange}
                                />
                                <label className="form-check-label" for="flexCheckDefault">
                                  Registered
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-2">
                                <input type="number" className="form-control"
                                  id="registeredDays"
                                  name="registeredDays"
                                  onChange={handleinputChange}
                                />
                                <label className="form-label"><small className='text-muted'>day(s) ago</small></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox"
                                  id="holdingStatus"
                                  name="holdingStatus"
                                  onChange={handleinputChange}
                                />
                                <label className="form-check-label" for="flexCheckDefault">
                                  Holding more than
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-2">
                                <input type="number" className="form-control"
                                  onChange={handleinputChange}
                                  name="holdingBTC"
                                  id="holdingBTC"
                                />
                                <label className="form-label"><small className='text-muted'>USDT</small></label>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className='d-flex'>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio"
                                    name="radio"
                                    id="flexRadioDefault1"
                                    onChange={handleinputChange}
                                    value="Online"
                                    checked={onlineOfflineStatus == "Online" ? true : false}
                                  />
                                  <label className="form-check-label" for="flexRadioDefault1">
                                    Online right now
                                  </label>
                                </div>
                                <div className="form-check ms-4">
                                  <input className="form-check-input"
                                    type="radio" name="radio"
                                    id="flexRadioDefault2"
                                    onChange={handleinputChange}
                                    checked={onlineOfflineStatus == "Offline" ? true : false}
                                    value="Offline"
                                  />
                                  <label className="form-check-label" for="flexRadioDefault2">
                                    Offline manually later
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
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
                            <button className='btn btn-next ms-2' type="button" onClick={() => nextStep3(step)}>Next</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
                    <div className='bg-gray p-2 mt-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                      <div className='d-flex my-3 justify-content-between'>
                        <div>{item.paymenttype}</div>
                      </div>
                      <p><b>Account holder name :</b> {item.holderName}</p>
                      <p><b>Account number :</b> {item.accountNo}</p>
                      <p><b>IFSC code:</b> {item.ifscCode}</p>
                      {/* <p><b>Account type :</b> {item.accountType}</p> */}
                      {/* <p><b>Bank name :</b> {item.bankName}</p> */}
                      {/* <p><b>Account opening branch :</b> {item.branch}</p> */}
                    </div>
                  }
                  {(item.paymenttype == 'UPI') &&
                    <div className='bg-gray mt-2 p-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                      <div className='d-flex my-3 justify-content-between'>
                        <div>{item.paymenttype}</div>
                      </div>
                      <p><b>Name :</b> {item.holderName}</p>
                      <p><b>UPI ID :</b> {item.upiId}</p>
                    </div>
                  }
                  {(item.paymenttype == 'Paytm') &&
                    <div className='bg-gray mt-2 p-2 curPointer' key={i} onClick={() => selectPaymentType(item)}>
                      <div className='d-flex my-3 justify-content-between'>
                        <div>{item.paymenttype}</div>
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
                  <div className='bg-gray mt-2 p-2' key={i} onClick={() => selectPaymentType(item)}>
                    <div className='d-flex my-3 justify-content-between'>
                      <div>{item.name}</div>
                    </div>
                  </div>
                </>
              )
            })
            }
            {/* <div className='bg-gray p-2 mt-2'>
              <div className='d-flex my-3 justify-content-between'>
                <div>IMPS</div>
                <div><FaEdit></FaEdit></div>
              </div>
              <p><b>Name :</b> venkatesh ponraj</p>
                <p><b>Bank account number :</b> 1234567890</p>
                <p><b>IFSC code:</b> qwe4567890</p>
                <p><b>Bank name :</b> paytm</p>
              </div>

              <div className='bg-gray mt-2 p-2 '>
              <div className='d-flex my-3 justify-content-between'>
                <div>UPI</div>
                <div><FaEdit></FaEdit></div>
              </div>
              <p><b>Name :</b> venkatesh ponraj</p>
                <p><b>UPI ID :</b> 1234567890</p>
              </div> */}
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate('/p2p-user-center')}>Add New</button> */}
            <a href={Config.FRONEND_URL + "/p2p-user-center"} target="_blank">
              <button className='btn btn-next px-2 py-0' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add New</button>
            </a>
            <button type="button" className="btn btn-secondary d-flex flex-row align-items-center px-2 py-0">
              {refreshloader === true ?
                <img src={'https://gifimage.net/wp-content/uploads/2018/04/refresh-gif-8.gif'} className="img-fluid-resize" onClick={() => Refresh('pause')} />
                :
                <h4 className="me-2" onClick={() => Refresh('refresh')}><HiOutlineRefresh className='mt-1' style={{ fontSize: "18px" }} /></h4>
              }
              Refresh
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal show={verificationformOpen} onHide={() => setverificationformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Google verification code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} data-backdrop="static">
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
                    helperText={formik.touched.authCode && formik.errors.authCode} />
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

      <Modal show={verificationformOpen} onHide={() => setverificationformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to post this ad?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row  ">
          <div className='row mt-5'>
            <div className='col'>
              <button type="submit" className="btn text-white btn-col w-100 mt-4" disabled={isLoading} onClick={()=>confirmOrder()}>
                Confirm
              </button>
              <button type="button" className="btn text-white btn-col w-100 mt-4" onClick={() => { setverificationformOpen(false); navigate('/p2p-user-center')}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        </Modal.Body>
      </Modal>
      <Modal className='successfullyposted-modal' show={confirmformOpen} onHide={() => setconfirmformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully posted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="custom-left color-white f-17 " htmlFor="FirstName">Your ad has been published and is now visible to other users once it goes online. Please pay attention to prompts for new orders</label>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>Type</span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className={passData && passData?.orderType == 'buy' ? 'color-green' : 'color-red'}>{(passData && passData?.orderType == 'buy' ? 'Buy' : 'Sell')}</b>
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>  Asset
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'> {pairList && pairList?.fromCurrencyName} </b>
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>  Currency
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'> {pairList && pairList?.toCurrencyName} </b>
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span> Price Type </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'> {passData && passData?.priceType} </b>
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>  Fixed
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'>
                    {(passData && passData?.totalPrice)?.toFixed(pairDetails && pairDetails.toDecimal)}{" "}
                    {pairList && pairList?.toCurrencyName} 
                  </b>&nbsp;&nbsp;
                  {/* <b className='color-yellow'>{(pairList && pairList?.toCurrencyName)}</b> */}
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span> Order Limit
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'>
                    {(passData && passData?.minAmt)}{" "}
                    {pairList && pairList?.toCurrencyName} -
                    {(passData && passData?.maxAmt)}{" "}
                    {pairList && pairList?.toCurrencyName}
                  </b>&nbsp;&nbsp;
                  {/* <b className='color-yellow'>{(pairList && pairList?.toCurrencyName)}</b> */}
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  Total Trading Amount
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'>
                    {(passData?.usdtPrice)}{" "} {pairList && pairList?.fromCurrencyName}
                  </b>
                </span>
              </label>
            </div>
          </div>
          {(passData?.registeredStatus || passData?.holdingStatus) &&
            <div className='row'>
              <div className='col-6'>
                <label className="custom-left color-white f-17 " htmlFor="FirstName">
                  <span>
                    Counterparty Conditions &nbsp;
                  </span>
                </label>
              </div>
              {((passData && passData.registeredStatus) && (passData && passData.registeredDays) >= 0) &&
                <div className='col-3'>
                  <label className="custom-left color-white f-17 " htmlFor="FirstName">
                    <span>
                      Registered {passData?.registeredDays} {" "}day(s) ago &nbsp;
                    </span>
                  </label>
                </div>
              }
              {(passData && passData.holdingStatus) && ((passData && passData.holdingBTC) >= 0) &&
                <div className='col-3'>
                  <label className="custom-left color-white f-17 " htmlFor="FirstName">
                    <span>
                      Holdings more than {(passData?.holdingBTC)}{" "} {pairList && pairList?.fromCurrencyName} &nbsp;
                    </span>
                  </label>
                </div>
              }
            </div>
          }
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  Payment Method
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  <b className='coloryelloe'>
                    {(passData?.paymentNames)?.toString()}
                  </b>
                </span>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>
                  Payment Time Limit
                </span>
              </label>
            </div>
            <div className='col-6'>
              <label className="custom-left color-white f-17 " htmlFor="FirstName">
                <span>   

                    <b className='coloryelloe'> 
                    {(passData?.timeLimit != 15 && passData?.timeLimit != 30 && passData?.timeLimit != 45) ?  passData?.timeLimit + " hr" :  passData?.timeLimit  +" min"} 
                    </b>
                </span>
              </label>
            </div>
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