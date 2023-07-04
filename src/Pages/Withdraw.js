import React, { useEffect, useState } from "react";

import "../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import { HiArrowNarrowRight } from "react-icons/hi";
import { RiArrowDownSFill, RiFileCopyFill } from "react-icons/ri";
// import {
//   BsLink45Deg,
//   BsFillArrowRightCircleFill,
//   BsInfoCircleFill,
// } from "react-icons/bs";
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from "react-router-dom";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import noreplay from "../assets/images/deposit/no-re.png";

// import ReactTooltip from "react-tooltip";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";
import { useContextData } from '../core/context/index'
import { toast } from "../core/lib/toastAlert";
import { dateFormat } from '../core/helper/date-format';
import { shortAdrress } from '../core/helper/short-address';
import { copyText } from '../core/helper/common';

import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Enter enter the amount')
    .required('Amount is required'),
  address: yup
    .string('Please select the address')
    .required('Address is required'),
});
export default function Withdraw(props) {
  let query = useParams();
  let currencyId = (query && query.currencyId) ? query.currencyId.toUpperCase() : "";

  const navigate = useNavigate();
  const { siteSettings, myProfile } = useContextData();

  const [defaultCurrencyList, setdefaultCurrencyList] = useState({ currencySymbol: "", image: "" });
  const [defaultNetwork, setdefaultNetwork] = useState('');
  const [userbalance, setUserBalance] = useState(0);
  const [fees, setFeevalue] = useState(0);
  const [minwithamt, setminwithamt] = useState(0);
  const [currencyList, setCurrencyList] = useState({});
  const [particularcurrency, set_particularCurrency] = useState([]);
  const [networkName, setNetworkName] = useState("");
  const [withdrawshow, setWithdrawshow] = useState(0);
  const [withdrawcryptoList, setWithdrawCryptoList] = useState([]);
  const [networkList, setnetworkList] = useState([]);
  const [networkId, setnetworkId] = useState("");
  const [withdrawStatus, setwithdrawStatus] = useState(null);
  const [currencies, setCurrencies] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [passData, setpassData] = useState({});
  const [inrCurrencyList, setinrCurrencyList] = useState({});
  
  const [withdrawLevDet, setWithdrawLevDet] = useState({});
  const [levelBasedLimit, setLevelBasedLimit] = useState({});

  const [timer_resendOtp, setTimer_resendOtp] = useState(0);

  useEffect(() => {
    initCall();
  }, []);

  useEffect(() => {
    timer_resendOtp > 0 && setTimeout(() => setTimer_resendOtp(timer_resendOtp - 1), 1000);
  }, [timer_resendOtp]);

  // useEffect(() => {
  //   getWalletCurrency_func();
  //   getinrCurrency();
  // }, []);

  useEffect(() => {
    if(myProfile) {
      if(myProfile.email == "") {
        toast({ type: "error", message: "Please enable email verification" });
        navigate('/my/email-authenticator');
      }
      else if(myProfile.tfaenablekey == "") {
        toast({ type: "error", message: "Please completed 2FA to process withdraw." });
        navigate('/google-authenticator');
      }
      else if(myProfile.email) {
        getWalletCurrency_func();
        getinrCurrency();
      }
    }
  }, [myProfile]);

  async function initCall() {
    try {
      const params = {
        url: `${Config.V2_API_URL}transaction/withdrawLevelDetail`,
        method: 'GET'
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        setWithdrawLevDet(response.data);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  async function getWalletCurrency_func() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getWalletCurrency`,
        method: 'GET'
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        let currencyArray = [];
        let currencySymbol = '';
        let Network = '';
        let defaultNetwork = '';
        let findSymbol = '';
        let image = '';
        let NetworkId = '';
        response.data.map((item) => {
          let findOne = response.data.find(element => element.currencySymbol == currencyId);
          if (findOne.curnType == "Fiat") {
            findSymbol = response.data[0]._id
          } else {
            findSymbol = currencyId
          }
          if (item.currencySymbol == findSymbol) {
            setnetworkId(item.currencyId);
            NetworkId = item.currencyId;
            currencySymbol = item.currencySymbol;
            image = item.image;
            item.ids.map((item) => {
              // Network = item.basecoin;
              defaultNetwork = item._id;
              if (item.withdrawEnable == 0) {
                setwithdrawStatus(false)
              }
              if (item.withdrawEnable == 1) {
                setwithdrawStatus(true)
              }
            })
            setnetworkList(item.ids);
          }
          currencyArray.push({ value: item._id, label: item.currencySymbol, image: item.image, currencyName: item.currencyName, balance: item.balance });
        })
        setdefaultNetwork(defaultNetwork);
        // setNetworkName(Network);
        setCurrencyList(currencyArray);
        setdefaultCurrencyList({ currencySymbol: currencySymbol, image: image })

        getparticularHistory(currencySymbol)
        getParticularCurrency(defaultNetwork);
        getBalance(NetworkId);
        getFee(defaultNetwork);
      }
    } catch (err) { }
  }

  async function getParticularCurrency(defaultNetwork) {
    try {
      const value = { CurrencyID: defaultNetwork }
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setCurrencies(response.data);
        set_particularCurrency(response.data);
        setNetworkName(response.data.basecoin);
      }
    } catch (err) { }
  }

  async function getparticularHistory(Currency) {
    const value = { type: "Withdraw", currencyType: "Crypto", currencySymbol: Currency }
    const params = {
      url: `${Config.V1_API_URL}wallet/getHistory`,
      method: 'POST',
      body: value
    }
    const result = (await makeRequest(params));
    if (result.status) {
      const array = []
      result.data.map((item) => {
        if (Currency == item.currencyId.currencySymbol) {
          array.push({
            address: item.address,
            currencySymbol: item.currencyId.currencySymbol,
            image: item.currencyId.image,
            amount: item.amount,
            fees: item.fees,
            txnId: item.txnId,
            status: item.status,
            createdDate: item.createdDate
          })
        }
      })
      setWithdrawCryptoList(array)
    }
  }

  async function getFee(defaultNetwork) {
    const reqData = { CurrencyID: defaultNetwork }
    const params = {
      url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
      method: 'POST',
      body: reqData
    }
    const res = (await makeRequest(params));
    if (res.status) {
      setCurrencies(res.data);
      if (typeof res.data.withdrawLevel == 'object' && typeof res.data.withdrawLevel["level" + myProfile?.level] == 'object') {
        const data = res.data.withdrawLevel["level" + myProfile?.level];
        setFeevalue(data.fees);
        setminwithamt(data.minwithamt);
      }
    }
  }
  async function getBalance(currencyId) {
    if (currencyId != '') {
      const value = { currencyId: currencyId }
      const params = {
        url: `${Config.V1_API_URL}wallet/getCurrencyBalance`,
        method: 'POST',
        body: value
      }
      const result = (await makeRequest(params));
      if (result.status) {
        var amount = result.data.amount;
        setUserBalance(amount)
      }
    }
  }
  async function handleCurrencyChange(currencySymbol) {
    getSelectedCurrency(currencySymbol)
    window.history.pushState({},'', window.origin+"/withdraw/crypto/"+currencySymbol);
    getparticularHistory(defaultCurrencyList && defaultCurrencyList.currencySymbol);
  };
  async function getSelectedCurrency(findcurrencySymbol) {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getWalletCurrency`,
        method: 'GET'
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        let currencyArray = [];
        let currencySymbol = '';
        let Network = '';
        let NetworkId = networkId;
        let defaultNetwork = '';
        let image = '';
        response.data.map((item) => {
          if (item.currencySymbol == findcurrencySymbol) {
            setnetworkId(item.currencyId);
            NetworkId = item.currencyId;
            currencyId = item._id;
            currencySymbol = item.currencySymbol;
            image = item.image;
            item.ids.map((item) => {
              Network = item.basecoin;
              defaultNetwork = item._id;
              if (item.withdrawEnable == 0) {
                setwithdrawStatus(false)
              }
              if (item.withdrawEnable == 1) {
                setwithdrawStatus(true)
              }
            })
            setnetworkList(item.ids)
          }
          currencyArray.push({ value: item._id, label: item.currencySymbol, image: item.image, currencyName: item.currencyName, balance: item.balance });
        })
        setdefaultNetwork(defaultNetwork);
        setNetworkName(Network);
        setdefaultCurrencyList({ currencySymbol: currencySymbol, image: image })
        getparticularHistory(currencySymbol);
        getBalance(NetworkId);
        getFee(defaultNetwork);
      }
    } catch (err) { }
  }
  async function handlenetworkChange(networkId) {
    setnetworkId(networkId);
    getselectedNetwork(networkId);
    getFee(networkId);
  }
  async function getselectedNetwork(networkId) {
    try {
      const value = { CurrencyID: networkId }
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        let type = "error";
        if (response.data.withdrawEnable == 0) {
          setwithdrawStatus(false)
        } else {
          setwithdrawStatus(true);
        }
        setNetworkName(response.data.basecoin);
        setCurrencies(response.data);
      }
    } catch (err) { }
  }
  async function getinrCurrency() {
    try {
      const value = { CurrencyID: "" }
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setinrCurrencyList(response.data);
      }
    } catch (err) { }
  }

  const handleChange = (event) => {
    const { name = "", value, checked } = event.target;
    switch (name) {
      case "address":
      case "amount":
        passData[name] = value;
        setpassData(passData);
        break;
      default:
        break;
    }
  }

  const submitWithdraw = async(values = {}, target = "submit") => {
    let type = 'error';
    if (values.amount <= userbalance) {
      let data = {
        currencyId: (currencies && currencies._id),
        amount: values.amount,
        address: values.address,
        tag: "",
      }

      if(currencies && currencies.currencySymbol == "XRP" && currencies.basecoin == "Coin") {
        data.tag = values.tag;
        if(values.tag == "") {
          formik.errors.tag = "Tag is required";
          // toast({ type: "eroor", message: "Tag is required"});
          return false
        }
      }

      if(withdrawshow != 0 && target !== "resendOTP") {
        data.withdrawOTP = values.withdrawOTP ? values.withdrawOTP : "-";
        data.tfaCode = values.tfaCode;
      }

      const params = {
        url: `${Config.V1_API_URL}wallet/submitWithdraw`,
        method: 'POST',
        body: data
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      setisLoading(false);
      if (response.status) {
        type = 'success';
        setWithdrawshow(response.type);
        if (response.type == 3) {
          formik.resetForm();
          setWithdrawshow(0);
          getparticularHistory(defaultCurrencyList && defaultCurrencyList.currencySymbol);
          getBalance(networkId);
        }

        if(withdrawshow == 0 || target === "resendOTP") {
          setTimer_resendOtp(Config.timer.resendOtp);
        }
      } else {
        const errmsg = response.message.split(' ');
        if (response.type == 4 && (errmsg[2] == 'TFA' || errmsg[2] == '2FA')) {
          navigate('/my/google-authenticator')
        } else if (response.type == 4 && errmsg[2] == 'KYC') {
          navigate('/my/identification')
        } else if (response.type == 4 && errmsg[2] == 'BANK') {
          navigate('/my/payment')
        }
      }
      toast({ type, message: response.message });
    }
    else {
      toast({ type, message: 'Insufficient Balance on ' + currencies.currencySymbol });
    }
  }

  const formik = useFormik({
    initialValues: {
      amount: '',
      address: '',
      tag: '',
      withdrawOTP: '',
      tfaCode: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submitWithdraw(values);
    },
  });

  useEffect(() => {
    let levelBasedLimit_copy = Object.assign({}, levelBasedLimit);
    if(myProfile && myProfile.level) {
      levelBasedLimit_copy.level = myProfile.level;

      if(withdrawLevDet && withdrawLevDet.totalDailyVolume != undefined) {
        levelBasedLimit_copy.totalDailyVolume = withdrawLevDet.totalDailyVolume;
        levelBasedLimit_copy.totalMonthlyVolume = withdrawLevDet.totalMonthlyVolume;
      }
      
      if(siteSettings && siteSettings.withdrawLevel) {
        levelBasedLimit_copy.limit = siteSettings.withdrawLevel['level'+myProfile.level];
      }
      setLevelBasedLimit(levelBasedLimit_copy);
    }
  }, [myProfile, siteSettings, withdrawLevDet]);

  // useEffect(() => {
  //   console.log("formik useEffect : ");
  //   let tagError = "";
  //   if(currencies && currencies.currencySymbol == "XRP") {
  //     if(formik.values.tag == "") {
  //       tagError = "Tag is required";
  //     }
  //   }
  //   formik.errors.tag = tagError;
  // }, [formik]);

  const handleSearch = (e) =>{
    const searchval = e.target.value;
    if (searchval !== '') {
      let results =[]
      results = currencyList.filter((item) => {
        return(item.label && item.label.split('_').join('/').toLowerCase().indexOf(searchval.toLowerCase()) >= 0 || item.label.toLowerCase().indexOf(searchval.toLowerCase()) >= 0) 
      });
      if (results.length > 0) {
        setCurrencyList(results);
      } else {
        setCurrencyList([]);
      }
    } else {
      getWalletCurrency_func();
    }
  }

  function bonusAmount(trxn) {
    try {
      if (typeof trxn.bonusData == 'object' && trxn.bonusData.bonusGiven > 0) {
        return trxn.bonusData.bonusGiven.toFixed(trxn.currencyId.siteDecimal);
      } else {
        if (trxn.depositType == 'Pre Booking') {
          return '-';
        } else {
          return 'NA';
        }
      }
    } catch (err) { }
  }

  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6" onClick={() => navigate("/my/dashboard")}>
                <GoChevronLeft className="deposit-back-button-icon" />
                <span className="deposit-text-1">Withdraw Crypto</span>
              </div>
              <div className="col-6 text-end" onClick={() => navigate("/withdraw/fiat/" + inrCurrencyList._id)}>
                <button type="button" className="deposit-fiat-button">
                  Withdraw Fiat <HiArrowNarrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container deposit-third-section">
          <div className="row align-items-center">
            <div className="col-lg-7">
              {withdrawshow == 0 &&
              <div className="d-flex flex-lg-row flex-column mt-5">
                <div className="deposit-third-left-section">
                  <span className="deposit-text-3">Select coin</span>
                </div>
                <div className="deposit-third-right-section">
                  <span className="deposit-text-33">
                    Coin
                    {/* {defaultCurrencyList && defaultCurrencyList.currencySymbol} */}
                  </span>
                  <div
                    className="d-flex flex-row align-items-center deposit-select-coin-section"
                    data-bs-toggle="modal"
                    data-bs-target="#selectcoinModal"
                  >
                    <div className="">
                      <img
                        src={defaultCurrencyList && defaultCurrencyList.image}
                        className="deposit-logo-image"
                        alt="logo"
                      />
                      <span className="deposit-text-4">{defaultCurrencyList && defaultCurrencyList.currencySymbol}</span>
                      {/* <span className="deposit-text-5">Ethereum</span> */}
                    </div>
                    <div className="ms-auto">
                      <RiArrowDownSFill />
                    </div>
                  </div>
                </div>
              </div>
              }
              <form onSubmit={formik.handleSubmit}>
                {withdrawshow == 0 ?
                  <>
                    <div className="d-flex flex-lg-row flex-column mt-5">
                      <div className="deposit-third-left-section">
                        <span className="deposit-text-3">Send to</span>
                      </div>
                      <div className="deposit-third-right-section">
                        <div className="withdraw-nav-tabs">
                          <div className="deposit-third-right-section mb-4">
                            <span className="deposit-text-33">Address</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Address"
                              id="address"
                              name='address'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.address && Boolean(formik.errors.address)}
                              helperText={formik.touched.address && formik.errors.address}
                              value={formik.values.address}
                            />
                            {formik.errors.address ? <small className="invalid-address error">{formik.errors.address}</small> : null}
                          </div>

                          {/* {JSON.stringify(currencies)} */}

                          {
                          currencies && currencies.currencySymbol == "XRP" && currencies.basecoin == "Coin" ?
                          <div className="deposit-third-right-section mb-4">
                            <span className="deposit-text-33">Tag</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Destination TAG"
                              id="tag"
                              name='tag'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.tag && Boolean(formik.errors.tag)}
                              helperText={formik.touched.tag && formik.errors.tag}
                              value={formik.values.tag}
                            />
                            {formik.errors.tag ? <small className="invalid-tag error">{formik.errors.tag}</small> : null}
                          </div>:""}

                          <span className="deposit-text-33 ">Network</span>
                          <div
                            className="d-flex flex-row align-items-center deposit-select-coin-section"
                            data-bs-toggle="modal"
                            data-bs-target="#withdrawnetworkModal"
                          >
                            <div className="">
                              <span className="deposit-text-4"></span>
                              <span className="deposit-text-5">{
                                networkName == "Coin"
                                  ?
                                  defaultCurrencyList.currencySymbol
                                  :
                                  networkName
                              }</span>
                            </div>
                            <div className="ms-auto">
                              <RiArrowDownSFill />
                            </div>
                          </div>
                          <div className="deposit-third-right-section mb-4 mt-2">
                            <span className="deposit-text-33">Amount</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={"Minimum " + minwithamt.toFixed(currencies.siteDecimal) + " " + (defaultCurrencyList && defaultCurrencyList.currencySymbol)}
                              name="amount"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.amount && Boolean(formik.errors.amount)}
                              helperText={formik.touched.amount && formik.errors.amount}
                              value={formik.values.amount}
                            />
                            {formik.errors.amount ? <small className="invalid-amount error">{formik.errors.amount}</small> : null}
                          </div>
                          <div className="row mt-4">
                            <div className="col-6">
                              <span className="deposit-text-5">{defaultCurrencyList && defaultCurrencyList.currencySymbol} balance</span>
                              <br />
                              <span className="deposit-text-66">{userbalance?.toFixed(currencies?.siteDecimal)} {defaultCurrencyList && defaultCurrencyList.currencySymbol}</span>
                            </div>
                            <div className="col-6">
                              <span className="deposit-text-5">
                                Minimum withdrawal
                              </span>
                              <br />
                              <span className="deposit-text-66">{minwithamt.toFixed(currencies.siteDecimal)} {defaultCurrencyList && defaultCurrencyList.currencySymbol}</span>
                            </div>
                          </div>

                          <div className="row mt-3">
                            {levelBasedLimit && levelBasedLimit.totalDailyVolume != undefined && levelBasedLimit.limit && levelBasedLimit.limit.dailyVolume != undefined ?
                            <div className="col-6">
                              <span className="deposit-text-5">
                                24h remaining limit
                              </span>
                              <br />
                              <span className="deposit-text-66">
                                {
                                  levelBasedLimit.limit.dailyVolume == 0
                                  ?
                                    "No limit"
                                  :
                                    (levelBasedLimit.limit.dailyVolume - levelBasedLimit.totalDailyVolume)+" USD/"+levelBasedLimit.limit.dailyVolume+" USD"
                                }
                              </span>
                            </div>
                            :""}                            
                            {
                            levelBasedLimit && levelBasedLimit.totalMonthlyVolume != undefined && levelBasedLimit.limit && levelBasedLimit.limit.monthlyVolume != undefined
                            ?
                            <div className="col-6">
                              <span className="deposit-text-5">
                                Monthly remaining limit
                              </span>
                              <br />
                              <span className="deposit-text-66">
                                {
                                  levelBasedLimit.limit.monthlyVolume == 0
                                  ?
                                    "No limit"
                                  :
                                    (levelBasedLimit.limit.monthlyVolume - levelBasedLimit.totalMonthlyVolume)+" USD/"+levelBasedLimit.limit.monthlyVolume+" USD"
                                }
                              </span>
                            </div>:""}
                          </div>

                          <div className="row mt-3">
                            <div className="col-6">
                              <span className="deposit-text-5">Network fee</span>
                              <br />
                              <span className="deposit-text-66">
                                {fees.toFixed(currencies.siteDecimal)} {defaultCurrencyList && defaultCurrencyList.currencySymbol}
                                {/* 0.0000043 ~ 0.0002 BTC */}
                              </span>
                            </div>
                          </div>

                          {particularcurrency.withdrawNotes && particularcurrency.withdrawNotes!= "NA" ?
                          <div className="row mt-3">
                            <div className="col-12">
                              <span className="deposit-text-5">
                                Notes
                              </span>
                              <br />
                              <span className="deposit-text-66">
                                {particularcurrency.withdrawNotes}
                              </span>
                            </div>
                          </div>
                          :""}
                          <button
                            type="submit"
                            className="btn text-white btn-col w-100 mt-4"
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className="d-flex flex-lg-row flex-column mt-5">
                      <div className="deposit-third-right-section">
                        <div className="withdraw-nav-tabs">
                          <div className="deposit-third-right-section mb-4">
                            <div className="row">
                              <span className="deposit-text-33">Enter Email OTP</span>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  aria-describedby="button-addon2"
                                  placeholder="Enter Email OTP"
                                  id="withdrawOTP"
                                  name="withdrawOTP"
                                  autoComplete="off"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.withdrawOTP && Boolean(formik.errors.withdrawOTP)}
                                  helperText={formik.touched.withdrawOTP && formik.errors.withdrawOTP}
                                />
                                <button
                                  id="button-addon2"
                                  className="btn btn-phone-number-verification-code"
                                  type="button"
                                  disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                                  onClick={()=> submitWithdraw(formik.values, "resendOTP")}
                                >
                                  Resend OTP{ timer_resendOtp > 0 ? <span className="timeLeft">({timer_resendOtp}s)</span>:""}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="deposit-third-right-section mb-4">
                            <span className="deposit-text-33">Enter 2FA Code</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter 2FA Code"
                              id="tfaCode"
                              name="tfaCode"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.tfaCode && Boolean(formik.errors.tfaCode)}
                              helperText={formik.touched.tfaCode && formik.errors.tfaCode}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn text-white btn-col w-100 mt-4"
                            disabled={(isLoading) ? true : false}
                          >
                            Withdraw
                          </button>
                          <button 
                            type="button"
                            className="btn text-white btn-col w-100 mt-2"
                            onClick={() => setWithdrawshow(0)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </form>
            </div>
          </div>
        </div>

        <div className="container deposit-fourth-section mt-4">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="deposit-text-11">Recent Withdraw</h1>

              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Assets</th>
                    <th scope="col">Address{" "}<RiFileCopyFill /></th>
                    <th scope="col">Amount</th>
                    <th scope="col">Bonus</th>
                    <th scope="col">Fees</th>
                    <th scope="col">Txn.Id{" "}<RiFileCopyFill /></th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawcryptoList.length > 0 && withdrawcryptoList.map((row, i) => {
                    if(row) {
                      return (
                        <tr>
                          <td data-label="Assets">
                            <span className='tb-img'>
                              <img src={row?.image} alt="currencyImage" width="20px" height="20px" style={{ height: '20%', width: '20%' }} className="img-fluid img-res" />
                            </span> {row?.currencySymbol}
                          </td>
                          <td data-label="Address" onClick={() => copyText({
                            text: row.address != '' ? row.address : '-',
                            message: "Address copied successfully!"
                          })}>
                            {shortAdrress(row.address)}
                          </td>
                          <td data-label="Amount">
                            {row.amount}
                          </td>
                          <td data-label="Bonus">
                            {bonusAmount(row)}
                          </td>
                          <td data-label="Fees">
                            {row.fees}
                          </td>
                          <td data-label="Txn" onClick={() => copyText({
                            text: row.txnId != '' ? row.txnId : '',
                            message: "Txn ID copied successfully"
                          })}>
                            {shortAdrress(row.txnId != '' ? row.txnId : '-')}
                          </td>
                          <td data-label="Status">
                            {row.status == 0 ? 'Pending' : row.status == 1 ? "Approved" : row.status == 2 ? 'Rejected' :'Processing' }
                          </td>
                          <td data-label="Date">
                            {dateFormat(row.createdDate)}
                          </td>
                        </tr>
                      )
                    }
                  })
                  }
                  {withdrawcryptoList.length == 0 &&
                    <tr className="no-records-found">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <img
                          className="no-record-image"
                          src={noreplay}
                          alt="no-record"
                        />
                        <br />
                        <span className="text-center">No Records Found</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  }
                </tbody>
              </table>
              {/* { withdrawcryptoList.length > 0 && 
              <div className="d-flex flex-row mt-4 mb-5">
                <div className="mx-auto">
                  <button type="button" className="table-view-all-deposit-button-1">
                    View More{" "}
                    <BsFillArrowRightCircleFill className="view-more-icon" />
                  </button>
                  <button type="button" className="table-view-all-deposit-button-2">
                    View Less{" "}
                    <BsFillArrowRightCircleFill className="view-more-icon" />
                  </button>
                </div>
              </div>
              } */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade withdraw-crypto-modal"
        id="selectcoinModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header ">
              <h4 className="modal-title" id="exampleModalLabel">
                Select coin to withdraw
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-2-overflow-scroll">
              <input
                id="myInput2"
                type="text"
                placeholder="Search here..."
                autoComplete="off"
                onChange={handleSearch}
              />
              <ul className="withdraw-crypto-modal-list">
                {currencyList.length > 0 && currencyList.map((currency, i) => {
                  if (currency.label != 'INR') {
                    return (
                      <li onClick={() => handleCurrencyChange(currency.label)}>
                        <a data-bs-dismiss="modal">
                          <div className="d-flex flex-row align-items-center withdraw-crypto-list-items">
                            <div className="">
                              <img
                                src={currency.image}
                                alt="logo"
                                className="withdraw-crypto-modal-images"
                              />
                            </div>
                            <div className="">
                              <span className="withdraw-crypto-modal-text-1">
                                {currency.label}
                              </span>
                              <br />
                              <span className="withdraw-crypto-modal-text-2">
                                {currency.currencyName}
                              </span>
                            </div>
                            <div className="ms-auto">
                              <span className="withdraw-crypto-modal-text-3">
                                Spot
                              </span>
                              <span className="withdraw-crypto-modal-text-4">
                                {currency.balance}
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                    )
                  }
                })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade withdraw-crypto-network-modal"
        id="withdrawnetworkModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Select network
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-2-overflow-scroll">
              <p className="select-network-text-1">
                Please ensure your receiving platform supports the token and
                network you are withdrawing. If you are unsure, kindly check
                with the receiving platform first.
              </p>
              <ul className="withdraw-crypto-modal-list">
                {networkList.length > 0 && networkList.map((item, i) => {
                  // if (item._id == defaultNetwork) {
                    return (
                      <li selected={true} onClick={() => handlenetworkChange(item._id)}>
                        <a data-bs-dismiss="modal">
                          <div className="d-flex flex-row withdraw-modal-network-sizing">
                            <div>
                              <p className="deposit-modal-coin-heading">
                                {networkName == item.basecoin
                                  ?
                                  networkName == "Coin"
                                    ?
                                    defaultCurrencyList.currencySymbol
                                    :
                                    networkName
                                  :
                                  item.basecoin}
                              </p>
                              {/* <p className="withdraw-modal-coin-muted-text">
                              BNB Smart Chain (
                              <span className="withdraw-modal-coin-muted-text-1">
                                BEP20
                              </span>
                              )
                            </p> */}
                            </div>
                            <div className="ms-auto text-end">
                              {/* <p className="withdraw-modal-coin-muted-text">
                              Arrival time ≈{" "}
                              <span className="withdraw-modal-coin-muted-text-1">
                                {" "}
                                5 mins{" "}
                              </span>
                            </p>
                            <p className="withdraw-modal-coin-muted-text">
                              fee{" "}
                              <span className="withdraw-modal-coin-muted-text-1">
                                0.0000043 BTC( ≈ $0.08969783 )
                              </span>
                            </p> */}
                            </div>
                          </div>
                        </a>
                      </li>
                    )
                  // } 
                  // else {
                  //   return (
                  //     <li onClick={() => handlenetworkChange(networkName == item.basecoin ? networkName : item._id)}>
                  //       <a data-bs-dismiss="modal">
                  //         <div className="d-flex flex-row withdraw-modal-network-sizing">
                  //           <div>
                  //             <p className="deposit-modal-coin-heading">{networkName == item.basecoin ? networkName : item.basecoin}</p>
                  //             <p className="withdraw-modal-coin-muted-text">
                
                  //             </p>
                  //           </div>
                  //           <div className="ms-auto text-end">
                              
                  //           </div>
                  //         </div>
                  //       </a>
                  //     </li>
                  //   )
                  // }
                })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
