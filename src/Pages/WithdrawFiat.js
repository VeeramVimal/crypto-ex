import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { GoChevronLeft } from 'react-icons/go';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { RiArrowDownSFill } from 'react-icons/ri';
// import { BsLink45Deg, BsFillArrowRightCircleFill, BsInfoCircleFill } from 'react-icons/bs';
import {
  Grid,
  Card,
  CardContent,
} from '@mui/material';
// import { IoClose } from "react-icons/io5";
import $ from "jquery";

import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";

import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";

import { toast } from "../core/lib/toastAlert";

// import Depositimage from "../assets/images/deposit/Group.png";
import noreplay from "../assets/images/deposit/no-re.png";

// import ReactTooltip from "react-tooltip";
import { dateFormat, shortAdrress } from '../core/helper/date-format';
import { useContextData } from '../core/context/index'
// import { TbUpload } from 'react-icons/tb';
// import { useFileUpload } from "use-file-upload";
import * as yup from 'yup';
import { useFormik } from 'formik';
import DefaultUpload from "../assets/images/cloud+upload+file.png";
import { pageAllowCheck, clickNavigate } from "../core/helper/common";

import "../assets/style.css";

const validationSchema = yup.object({
  amount: yup
  .string()
  .typeError('Please enter the valid amount')
  .required('Amount is required')
  .test(
    "maxDigitsAfterDecimal",
    "Please enter the valid amount",
    (number) => /^\d+(\.\d{1,2})?$/.test(number)
  ),
});

export default function WithdrawFiat(props) {
  const defaultSrc = DefaultUpload;
  const navigate = useNavigate();
  const { myProfile } = useContextData();
  const { currencyId } = useParams();
  const [withdrawshow, setWithdrawshow] = useState(0);
  const [fee, setFeevalue] = useState(0);
  const [feeDetail, setFeeDetail] = useState({});
  const [userbalance, setUserBalance] = useState(0);
  const [withdrawfiatList, setWithdrawFiatList] = useState({});
  const [particularCurrencyList, setparticularCurrencyList] = useState({});
  const [fiat, setFiat] = useState('');
  const [currencies, setCurrencies] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [bankpaymentsList, setbankpaymentsList] = useState([]);
  const [bankDetails, setbankDetails] = useState({});

  const [timer_resendOtp, setTimer_resendOtp] = useState(0);

  useEffect(() => {
    timer_resendOtp > 0 && setTimeout(() => setTimer_resendOtp(timer_resendOtp - 1), 1000);
  }, [timer_resendOtp]);

  useEffect(() => {
    $(".crypto-workflow-section-close-button").click(function () {
      $(".deposit-second-section").hide();
    });
  }, []);

  useEffect(() => {
    getInrCurrency();
    getparticularCurrency_func();
    getHistory();
    getBankPaymentsDet();
  }, []);

  useEffect(() => {
    if(myProfile) {
      const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
      if(pageAllowCheckResp.type == "error") {
        toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
        navigate(pageAllowCheckResp.navigate);
      }
      else {
        const data = {type: "withdraw", row: {currencySymbol: "INR"} };
        clickNavigate(data, myProfile);
      }
    }
    getInrCurrency();
  }, [myProfile]);

  async function getInrCurrency() {
    try {
      const value = { currencyId: currencyId }
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setFiat(response.data?._id);
        setCurrencies(response.data);
        if (typeof response.data.withdrawLevel == 'object' && typeof response.data.withdrawLevel["level" + (myProfile ? myProfile.level : "")] == 'object') {
          const data = response.data.withdrawLevel["level" + (myProfile && myProfile.level)];
          const fee = data.fees;
          setFeevalue(fee);
          setFeeDetail(data);
        }
        const value = { currencyId: (response?.data?.currencyId) }
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
    } catch (err) { }
  }
  async function getparticularCurrency_func() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: "POST",
        body: { currencySymbol: "BNB" }
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setparticularCurrencyList(response.data);
      }
    } catch (err) { }
  }

  async function getHistory() {
    try {
      const value = { type: "Withdraw", currencyType: "Fiat" }
      const params = {
        url: `${Config.V1_API_URL}wallet/getHistory`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setWithdrawFiatList(response.data)
      }
    } catch (err) { }
  }

  async function submitWithdraw(values = {}, target = "submit") {
    let type = 'error';
    if (bankpaymentsList && bankpaymentsList.length == 0) {
      toast({ type, message: 'Please add bank details'});
      navigate('/my/payment')
      return false;
    }
    if (bankDetails == "" || bankDetails && bankDetails._id == undefined){
      toast({ type, message: 'Please select the account number'});
      return false;
    }
    if (values.amount <= userbalance) {
      let data = {
        currencyId: fiat,
        amount: values.amount,
        paymentId: bankDetails?._id
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
        setWithdrawshow(response.type)
        if (response.type == 3) {
          formik.resetForm();
          setWithdrawshow(0)
          getHistory();
        }
        if(withdrawshow == 0 || target === "resendOTP") {
          setTimer_resendOtp(Config.timer.resendOtp);
        }
      } else {
        const errmsg = response.message.split(' ');
        if (response.type == 4 && (errmsg[2] == 'TFA' || errmsg[2] == '2FA')) {
          navigate('/google-authenticator')
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
      withdrawOTP: '',
      tfaCode: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submitWithdraw(values);
    },
  });

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
  async function getBankPaymentsDet() {
    try {
      const params = {
        url: `${Config.V2_API_URL}customer/getBankPayments`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        let bankDet = [];
        if (response.data.length > 0) {
          response.data.map((data,i)=>{
            if (i == 0 && data.status == 1){
              setbankDetails(data);
            }
            if (data.status == 1) {
              bankDet.push(data)
            }
          })
          setbankpaymentsList(bankDet);
        } else {
          let type = 'error';
          toast({ type, message: 'Please add bank details'});
          setTimeout(() => navigate("/my/payment"), 500)
        }
      }
    } catch (err) {}
  }
  async function handleBankChange(type){
    setbankDetails(type);
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
                <span className="deposit-text-1">Withdraw Fiat</span>
              </div>
              <div className="col-6 text-end" onClick={() => navigate("/withdraw/crypto/" + particularCurrencyList?.currencySymbol)}>
                <button type="button" className="deposit-fiat-button">
                  Withdraw Crypto <HiArrowNarrowRight />
                </button>
              </div>

            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              {withdrawshow == 0 ?
                <form onSubmit={formik.handleSubmit}>
                  <div className="col-lg-12">
                    <div className=" mt-5">
                      <div className="">
                        <div className="withdraw-nav-tabs">
                          {/* <div className="deposit-third-right-section mb-4">
                            <span className="deposit-text-33">Bank Name</span>
                            <input
                              type="text"
                              className="form-control"
                              id="bankname"
                              name='bankname'
                              autoComplete='off'
                              value={myProfile?.bankdetails?.['Bank Name']}
                              disabled={true}
                            />
                          </div> */}
                          <div className="deposit-third-right-section">
                            <span className="deposit-text-33">
                              Account Number
                            </span>
                            <div
                              className="d-flex flex-row align-items-center deposit-select-coin-section"
                              data-bs-toggle="modal"
                              data-bs-target="#selectcoinModal"
                            >
                              <div className="">
                                <span className="deposit-text-4">{bankDetails.accountNo}</span>
                              </div>
                              <div className="ms-auto">
                                <RiArrowDownSFill />
                              </div>
                            </div>
                          </div>
                          <div className="deposit-third-right-section my-4">
                            <span className="deposit-text-33">Enter Amount</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Amount"
                              id="amount"
                              name='amount'
                              autoComplete='off'
                              value={formik.values.amount}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.amount && Boolean(formik.errors.amount)}
                              helperText={formik.touched.amount && formik.errors.amount}
                            />
                            {formik.errors.amount ? <small className="invalid-amount error">{formik.errors.amount}</small> : null}
                          </div>
                          <p className='color-white f-13'>Bal: {userbalance?.toFixed(currencies?.siteDecimal)} {currencies?.currencySymbol}</p>
                          <p className='color-white f-13'>
                            Fees: {(feeDetail && feeDetail.fees) ?
                              feeDetail.feetype === "0"
                                ?
                                  feeDetail.fees.toFixed(currencies?.siteDecimal)
                                :
                                  feeDetail.fees
                            :
                              0
                            }
                            {feeDetail.feetype === "0" ? " INR" : feeDetail.feetype === "1" ? "%" : "" }
                          </p>
                          <button type="submit" className="btn text-white btn-col w-100 my-4" disabled={isLoading}>
                            Submit Withdraw Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                :
                <form onSubmit={formik.handleSubmit} className="">
                  <div className="col-lg-12">
                    <div className="d-flex flex-lg-row flex-column mt-5">
                      <div className="">
                        {/* <span className="deposit-text-3">Send to</span> */}
                      </div>
                      <div className="">
                        <div className="withdraw-nav-tabs">
                          <div className="deposit-third-right-section mb-4">
                            <div className="row">
                              <span className="deposit-text-33">Enter E-mail OTP</span>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="withdrawOTP"
                                  name='withdrawOTP'
                                  autoComplete='off'
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.withdrawOTP}
                                  error={formik.touched.withdrawOTP && Boolean(formik.errors.withdrawOTP)}
                                  helperText={formik.touched.withdrawOTP && formik.errors.withdrawOTP}
                                  required
                                />
                                <button
                                  id="button-addon2"
                                  className="btn btn-phone-number-verification-code"
                                  type="button"
                                  disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                                  onClick={() => {
                                    submitWithdraw(formik.values, "resendOTP");
                                  }}
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
                              id="tfaCode"
                              name='tfaCode'
                              autoComplete='off'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.tfaCode}
                              error={formik.touched.tfaCode && Boolean(formik.errors.tfaCode)}
                              helperText={formik.touched.tfaCode && formik.errors.tfaCode}
                              required
                            />
                          </div>
                          <button type="submit" disabled={isLoading} className="btn text-white btn-col w-100 mt-4">
                            Withdraw amount
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              }
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
                      Select account number
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body modal-2-overflow-scroll">
                    <ul className="withdraw-crypto-modal-list">
                      { bankpaymentsList.length > 0 && bankpaymentsList.map((row, i) => {
                          return (
                            <li key={i} onClick={() => handleBankChange(row)}>
                              <a data-bs-dismiss="modal">
                                <div className="d-flex flex-row align-items-center withdraw-crypto-list-items">
                                  <div className="">
                                    <span className="withdraw-crypto-modal-text-1">
                                      {row.accountNo}
                                      {
                                        row.bankName ? 
                                        " - "+row.bankName
                                        : ""
                                      }
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </li>
                          )
                      })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 mt-4">
              <Grid item xs={12} sm={6} className="text-left-move">
                <div>
                  <p className='color-yellow password-text-44'>The amount would be transferred to
                  </p>
                  <p className='password-text-33'>
                    Fiat Withdraw can only be done to the default Account. Whereas deposits can be done from any of the linked bank acccounts
                  </p>
                </div>
                { bankDetails &&
                  <div className='ui-card m-top-21'>
                    <Card className='bg-white-card '>
                      <CardContent className='color-black'>
                        { bankDetails?.holderName && <p className="password-text-33"><b>Name: </b>{bankDetails?.holderName}</p>}
                        { bankDetails.accountNo && <p className="password-text-33"><b>Account Number: </b>{bankDetails.accountNo}</p>}
                        { bankDetails.bankName && <p className="password-text-33"><b>Bank Name: </b>{bankDetails.bankName}</p>}
                        { bankDetails.ifscCode &&<p className="password-text-33"><b>IFSC Code: </b>{bankDetails.ifscCode}</p>}
                        { bankDetails.accountType && <p className="password-text-33"><b>Account Type: </b>{bankDetails.accountType}</p>}
                      </CardContent>
                    </Card>
                  </div>
                }
                <div>
                  <div className='mt-4'>
                    <ul className='mt-12'>
                      <li className='password-text-33'>UPI bank transfers, IMPS, NEFT & RTGS are allowed for this account</li>
                      <li className='password-text-33'> UPI Apps like gPay, PhonePe, Paytm are not available.</li>
                    </ul>
                    <div>
                    </div>
                  </div>
                </div>
              </Grid>

            </div>
          </div>
        </div>
        {/* <div className="container deposit-third-section">
            <div className="row align-items-center">
              <form onSubmit={formik.handleSubmit}>
                  <div className="col-lg-7">
                      <div className="d-flex flex-lg-row flex-column mt-5">
                          <div className="deposit-third-left-section">
                          </div>
                          <div className="deposit-third-right-section">
                          <div className="withdraw-nav-tabs">
                              <div className="deposit-third-right-section mb-4">
                              <span className="deposit-text-33">Amount</span>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Amount"
                                  id="amount"
                                  name='amount'
                                  autoComplete='off'
                                  value={formik.values.amount}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                                  helperText={formik.touched.amount && formik.errors.amount}
                              />
                              {formik.errors.amount ? <small className="invalid-amount error">{formik.errors.amount}</small> : null}
                              </div>
                              <div className="deposit-third-right-section mb-4">
                              <span className="deposit-text-33">Transaction Number</span>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Transaction Number"
                                  id="transactionNumber"
                                  name='transactionNumber'
                                  autoComplete='off'
                                  value={formik.values.transactionNumber}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.transactionNumber && Boolean(formik.errors.transactionNumber)}
                                  helperText={formik.touched.transactionNumber && formik.errors.transactionNumber}
                              />
                              {formik.errors.transactionNumber ? <small className="invalid-transactionNumber error">{formik.errors.transactionNumber}</small> : null}
                              </div>
                              <div>
                                  <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" /><br />
                                  <button className='payment-qrcode-optional-button mt-3' name="myfile1" 
                                      onClick={() => selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                        console.log("Files Selected", { name, size, source, file });
                                        setattachment(file);
                                        formik.values.myfile1 = file;
                                        formik.errors.myfile1 = ''
                                    })}
                                  >
                                      <TbUpload />Upload
                                  </button>
                              </div>
                              {formik.errors.myfile1 ? <small className="invalid-myfile1 error">{formik.errors.myfile1}</small> : null}
                              <button
                              type="submit" disabled={isLoading}
                              className="btn text-white btn-col w-100 mt-4"
                              >
                              Submit Deposit Request
                          </button>
                          </div>
                          </div>
                      </div>
                  </div>
              </form>
            </div>
        </div>
        <Grid item xs={12} sm={6} className="text-left-move">
          <div>
            <p className='color-yellow f-15'>Send Money to this account
            </p>
            <p className='color-white f-14'>
              Fiat Withdraw can only be done to the default Account.
              Whereas deposits can be done from any of the linked bank
              acccounts
            </p>
          </div>
          <div className='ui-card m-top-21'>
            <Card className='bg-white-card '>
              <CardContent className='color-black'>
                <p><b>Minimum Deposit Amount: </b>{siteSettings?.minDeposit} INR</p>
                <p><b>Account Name: </b>{adminBankDetails.accountName}</p>
                <p><b>Account Number: </b>{adminBankDetails.accountNumber}</p>
                <p><b>Bank Name: </b>{adminBankDetails.bankName}</p>
                <p><b>Swift / IFSC Code: </b>{adminBankDetails.swiftIFSCCode}</p>
                <p><b>Deposit Type: </b>{adminBankDetails.type}</p>
                <p><b>Account Type: </b>{adminBankDetails.accountType}</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <div className='m-top-20'>
              <ul className='mt-12'>
                <li className='color-white f-14'>UPI bank transfers, IMPS, NEFT & RTGS are allowed for this
                  account</li>
                <li className='color-white f-14'> UPI Apps like gPay, PhonePe, Paytm are  not available.</li>
                <li className='color-white f-14'> INR Deposit and Withdrawal take upto 24 hours to Process</li>
              </ul>
              <div>
              </div>
            </div>
          </div>
        </Grid> */}

        <div className="container deposit-fourth-section">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="deposit-text-11">Recent Withdraw</h1>

              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Asset</th>
                    <th>Amount</th>
                    <th>Destination</th>
                    <th>TxID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawfiatList?.length > 0 && withdrawfiatList.map((row, i) => (
                    <tr>
                      <td data-label="Time" className='color-white color-borders'>{dateFormat(row.createdDate)}</td>
                      <td data-label="Type" className='color-white color-borders'>{row.type}</td>
                      <td data-label="Asset" className='color-white color-borders'><span className='tb-img'><img src={row.currencyId.image} alt={Config.SITENAME} style={{ width: "20px", height: "20px" }} className="img-fluid img-res" /> </span>&nbsp;{row.currencyId.currencySymbol}</td>
                      <td data-label="Amount" className='color-white color-borders'>{row.amount}</td>
                      <td data-label="Destination" className='color-white color-borders'>{bonusAmount(row)}</td>
                      <td data-label="TxID" className='color-white color-borders cursor' >{shortAdrress(row.txnId != '' ? row.txnId : '-')}</td>
                      <td data-label="Status" className='color-white color-borders'>
                        {row.status == 0 ? 'Pending' : row.status == 1 ? "Approved" : row.status == 2 ? 'Rejected' :'Processing' }
                      </td>
                    </tr>
                  ))}
                  {withdrawfiatList?.length == 0 &&
                    <tr className="no-records-found">
                      <td></td>
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
                    </tr>
                  }
                </tbody>
              </table>
              {/* {withdrawfiatList?.length > 0 &&
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


      <Footer />
    </div>
  );
}
