import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { GoChevronLeft } from 'react-icons/go';
import { HiArrowNarrowRight } from 'react-icons/hi';
// import { RiArrowDownSFill, RiFileCopyFill } from 'react-icons/ri';
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
import { TbUpload } from 'react-icons/tb';
import { useFileUpload } from "use-file-upload";
import * as yup from 'yup';
import { useFormik } from 'formik';
// import Upload from "../assets/images/cloud+upload+file.png";
import DefaultUpload from "../assets/images/cloud+upload+file.png";
import { pageAllowCheck, clickNavigate } from "../core/helper/common";

import "../assets/style.css";
import Pagination from 'react-responsive-pagination';
import '../pagination.css';

const validationSchema = yup.object({
  amount: yup
    .number()
    .integer('Please enter the valid amount')
    .typeError('Please enter the valid amount')
    .required('Amount is required')
    // .test(
    //   "maxDigitsAfterDecimal",
    //   "Please enter the valid amount",
    //   (number) => /^\d+(\.\d{1,2})?$/.test(number)
    // )
    ,
  transactionNumber: yup
    .number()
    .integer('Please enter the valid UTR number')
    .typeError('Please enter the valid UTR number')
    .required('UTR number is required')
    // .test(
    //   "maxDigitsAfterDecimal",
    //   "Please enter the valid UTR number",
    //   (number) => /^\d+(\.\d{1,2})?$/.test(number)
    // )
    ,
  myfile1: yup
    .mixed().required('Attachment is required')
});

export default function DepositFiat(props) {
  const defaultSrc = DefaultUpload;
  const navigate = useNavigate();
  let { currencyId } = useParams();
  const { siteSettings, myProfile, setUserProfile } = useContextData();
  const [files, selectFiles] = useFileUpload();

  const [inrCurrencyList, setinrCurrencyList] = useState({});
  const [particularCurrencyList, setparticularCurrencyList] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [depositfiatlist, setdepositfiatList] = useState({});
  const [adminBankDetails, setadminBankDetails] = useState({});
  const [attachment, setattachment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalorders, settotalorders] = useState(0);

  useEffect(() => {
    $(".crypto-workflow-section-close-button").click(function () {
      $(".deposit-second-section").hide();
    });
  }, []);

  useEffect(() => {
    getparticularCurrency_func();
    getAdminBankDetails();
    getHistory();
  }, []);

  useEffect(() => {
    if(myProfile) {
      const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
      if(pageAllowCheckResp.type == "error") {
        toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
        navigate(pageAllowCheckResp.navigate);
      }
      else {
        const data = {type: "deposit", row: {currencySymbol: "INR"} };
        clickNavigate(data, myProfile);
      }
    }
  }, [myProfile]);

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

  const formik = useFormik({
    initialValues: {
      amount: '',
      transactionNumber: '',
      myfile1: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setisLoading(true);
      const formData = new FormData();
      let sizeFile = 1;
      let fileToUpload = values.myfile1;
      let fileName = 'attachment';
      let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
      formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
      const params = {
        url: `${Config.V1_API_URL}admin/fileUpload?sizeFile=${sizeFile}&&type="attachment"`,
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        const data = {
          currencyId: currencyId,
          amount: values.amount,
          transactionNumber: values.transactionNumber,
          attachment: response.message[0].location
        }
        const params = {
          url: `${Config.V1_API_URL}wallet/depositFiat`,
          method: 'POST',
          body: data
        }
        const result = (await makeRequest(params));
        let type = 'error';
        if (result.status) {
          type = 'success';
          toast({ type, message: result.message });
          formik.resetForm();
          formik.values.myfile1 = "";
          setattachment("")
          getHistory();
          setUserProfile();
          setisLoading(false);
        } else {
          setisLoading(false)
          type = 'error';
          const errmsg = result.message.split(' ');
          if (errmsg[0] == 'KYC') {
            navigate('/my/identification')
          } else if (errmsg[0] == 'Bank') {
            navigate('/my/payment')
          }
          setisLoading(false)
          toast({ type, message: result.message });
        }
      }
      setisLoading(false)
    },
  });

  async function getAdminBankDetails() {
    try {
      const params = {
        url: `${Config.V1_API_URL}admin/getBankDetails`,
        method: 'GET'
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setadminBankDetails(response.message)
      }
    } catch (err) { }
  }

  async function getHistory() {
    try {
      const value = { type: "Deposit", currencyType: "Fiat" }
      const params = {
        url: `${Config.V1_API_URL}wallet/getHistory`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setdepositfiatList(response.data)
        settotalorders(response.total);      }
    } catch (err) { }
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
  const noOfPages = Math.ceil(totalorders / recordsPerPage);

  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  }
  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
      setCurrentPage(newCurrentPage);
      getPagination( newCurrentPage)
    }
  }
  async function getPagination( page ) {
    try {
      const data = {
        type : "Deposit",
        currencyType : "Fiat",
        limit: recordsPerPage,
        offset: recordsPerPage * (page - 1)
      };
      const params = {
        url: `${Config.V1_API_URL}wallet/getHistory`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setdepositfiatList(response.data);
        settotalorders(response.total);
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
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-6" onClick={() => navigate("/my/dashboard")}>
                <GoChevronLeft className="deposit-back-button-icon" />
                <span className="deposit-text-1">Deposit Fiat</span>
              </div>
              <div className="col-6 text-end" onClick={() => navigate("/deposit/crypto/" + particularCurrencyList?.currencySymbol)}>
                <button type="button" className="deposit-fiat-button">
                  Deposit Crypto <HiArrowNarrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="col-lg-12">
                  <div className=" mt-5">

                    <div className="">
                      <div className="withdraw-nav-tabs">
                        <div className="mb-4">
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
                        <div className="mb-4">
                          <span className="deposit-text-33">UTR Number</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="UTR Number"
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
                        <button type="submit" disabled={isLoading} className="btn text-white btn-col w-100 mt-4">
                          Submit Deposit Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-7 mt-4">
              <Grid item xs={12} sm={6} className="text-left-move">
                <div>
                  <p className='color-yellow password-text-44'>Send Money to this account
                  </p>
                  <p className='password-text-33'>
                    Fiat Withdraw can only be done to the default Account.
                    Whereas deposits can be done from any of the linked bank
                    acccounts
                  </p>
                </div>
                <div className='ui-card m-top-21'>
                  <Card className='bg-white-card '>
                    <CardContent className='color-black'>
                      <p className="password-text-33"><b>Minimum Deposit Amount: </b>{siteSettings?.minDeposit} INR</p>
                      <p className="password-text-33"><b>Account Name: </b>{adminBankDetails.accountName}</p>
                      <p className="password-text-33"><b>Account Number: </b>{adminBankDetails.accountNumber}</p>
                      <p className="password-text-33"><b>Bank Name: </b>{adminBankDetails.bankName}</p>
                      <p className="password-text-33"><b>Swift / IFSC Code: </b>{adminBankDetails.swiftIFSCCode}</p>
                      <p className="password-text-33"><b>Deposit Type: </b>{adminBankDetails.type}</p>
                      <p className="password-text-33"><b>Account Type: </b>{adminBankDetails.accountType}</p>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <div className='mt-2'>
                    <ul className='mt-12'>
                      <li className='password-text-33'>UPI bank transfers, IMPS, NEFT & RTGS are allowed for this
                        account</li>
                      <li className='password-text-33'> UPI Apps like gPay, PhonePe, Paytm are  not available.</li>
                      <li className='password-text-33'> INR Deposit and Withdrawal take upto 24 hours to Process</li>
                    </ul>
                    <div>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>
          </div>
        </div>

        <div className="container deposit-fourth-section">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="deposit-text-11">Recent Deposits</h1>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Asset</th>
                    <th>Amount</th>
                    <th>Destination</th>
                    <th>UTR Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {depositfiatlist?.length > 0 && depositfiatlist.map((row, i) => (
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
                  {depositfiatlist?.length == 0 &&
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
              {/* { depositfiatlist?.length > 0 &&
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
