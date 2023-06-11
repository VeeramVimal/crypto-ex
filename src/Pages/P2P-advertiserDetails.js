import React, { useEffect, useState } from "react";
import '../assets/style.css';
import NavbarOne from './siteTheme/NavbarOne';
import Footer from './siteTheme/Footer';
import P2PHeader from './separate/P2PHeader';
import { getCookie } from '../core/helper/cookie';
import { dateFormat, yearmonthdateFormat, showEmail } from '../core/helper/date-format';
import { makeRequest } from "../core/services/v1/request";
import Config from "../core/config/";
import { toast } from "../core/lib/toastAlert";
import $ from "jquery";
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import noResponsibile from '../assets/images/deposit/no-re.png';
import * as yup from 'yup';
import { useFormik, Formik } from 'formik';
import { Modal, Form } from "react-bootstrap";
import { useContextData } from '../core/context';
import { useParams, useNavigate } from "react-router-dom";
import {
  FormControl, Select, MenuItem,
  RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { TbUpload } from 'react-icons/tb';
import { useFileUpload } from "use-file-upload";
import { Line } from 'rc-progress';
import DefaultUpload from "../assets/images/cloud+upload+file.png";
import { pageAllowCheck } from "../core/helper/common";
import { Bars } from "react-loader-spinner";

const currentDate = new Date();

const profilevalidationSchema = yup.object({
  username: yup
    .string('Please enter the username')
    .required('Username is required'),
});

const validationSchema = yup.object({
  orderNo: yup
    .number('Please enter the correct order number')
    .required('order number is required'),
  description: yup
    .string('Enter the description')
    .required('description is required'),
  reason: yup
    .string('Enter the reason')
    .required('Reason is required'),
  email: yup
    .string('Enter the email address')
    .email('Enter a valid email')
    .required('Email is required'),
  myfile1: yup
    .mixed().required('Upload proof is required'),
});

export default function P2pusercenter(props) {

  useEffect(() => {

    $("#nav-p2p-tab").addClass("p2puser-center-scrollspy-styling-active");
    $("#nav-p2p-tab").click(function () {
      $("#nav-p2p-tab").addClass("p2puser-center-scrollspy-styling-active");
      $("#nav-feedback-tab").removeClass("p2puser-center-scrollspy-styling-active");
      $("#nav-blocked-tab").removeClass("p2puser-center-scrollspy-styling-active");
      $('html, body').animate({
        scrollTop: $("#scrollspy-section-1-para").offset().top
      });
    });
    $("#nav-feedback-tab").click(function () {
      $("#nav-p2p-tab").removeClass("p2puser-center-scrollspy-styling-active");
      $("#nav-feedback-tab").addClass("p2puser-center-scrollspy-styling-active");
      $("#nav-blocked-tab").removeClass("p2puser-center-scrollspy-styling-active");
      $('html, body').animate({
        scrollTop: $("#scrollspy-section-2-para").offset().top
      });
    });
    $("#nav-blocked-tab").click(function () {
      $("#nav-p2p-tab").removeClass("p2puser-center-scrollspy-styling-active");
      $("#nav-feedback-tab").removeClass("p2puser-center-scrollspy-styling-active");
      $("#nav-blocked-tab").addClass("p2puser-center-scrollspy-styling-active");
      $('html, body').animate({
        scrollTop: $("#scrollspy-section-3-para").offset().top
      });
    });
    $(".status_change .dropdown-item").click(function () {
      var getStatusText = $(this).text();
      $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
      var generateStatusClass = `${$(this).attr('data-class')}-status`
      $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
    })
  }, []);
  const defaultSrc = DefaultUpload;
  const { advertiserNo } = useParams();
  const navigate = useNavigate();
  const { myProfile, setUserProfile, p2pSettings } = useContextData();
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [myorderList, setmyorderList] = useState([]);
  const [nicknameformOpen, setnicknameformOpen] = useState(false);
  const [registeredDays, setregisteredDays] = useState(0);
  const [feedbackDet, setfeedbackDet] = useState([]);
  const [blockusersDetails, setblockusersDetails] = useState([]);
  const [feedBackType, setfeedBackType] = useState('all');
  const [advertiserDet, setadvertiserDet] = useState("");
  const [buyerOrderList, setbuyerOrderList] = useState({});
  const [sellerOrderList, setsellerOrderList] = useState({});
  const [buyerPaymentList, setbuyerPaymentList] = useState([]);
  const [selectOrderDetails, setselectOrderDetails] = useState([]);
  const [orderData, serOrderData] = useState({ price: '', total: '' });
  const [currentPrice, sercurrentPrice] = useState(0);
  const [userWallet, setuserWallet] = useState(0);
  const [errors, seterrors] = useState({});
  const [buyerpaymentId, setbuyerpaymentId] = useState("");
  const [blockformOpen, setblockformOpen] = useState(false);
  const [reportformOpen, setreportformOpen] = useState(false);
  const [reasonval, setReasonval] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [expanded, setexpanded] = useState(false);
  const [attachment, setattachment] = useState("");
  const [files, selectFiles] = useFileUpload();
  const [loaderStatus, setloaderStatus] = useState(false);
  const [reportReasonData, setreportReasonData] = useState([
    { "id": 1, "name": "Trading order fraud or scam", },
    { "id": 1, "name": "Advertisement conditions unreasonable", },
    { "id": 1, "name": "Other reasons", }
  ])

  useEffect(() => {
    const LoggedIn = getCookie('userToken');
    setisLoggedIn(LoggedIn);
    if (LoggedIn) {
      getmyOrderList();
      myregisteredDays();
      getfeedBackDet();
      getblockUsersDet();
      getadvertiserDet();
      getadvertiserOrderDet();
    } else {
      navigate("/login");
    }
  }, [myProfile]);

  const initialValues = () => {
    return {
      username: myProfile && myProfile.username
    }
  }
  const handlereasonChange = (event) => {
    setReasonval(event.target.value);
  }

  const onSubmit = async (values) => {
    try {
      // setisLoading(true);
      const params = {
        url: `${Config.V1_API_URL}user/updateMyProfile`,
        method: 'POST',
        body: values
      }
      const response = (await makeRequest(params));
      // setisLoading(false);
      let type = "error";
      if (response.status) {
        type = 'success';
        setnicknameformOpen(false);
        toast({ type, message: "Username Updated Successfully!" });
      } else {
        toast({ type, message: response.message });
      }
      setUserProfile();
      // setisLoading(false);
    } catch (err) { }
  }
  async function getmyOrderList() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getmyOrderDetails`,
        method: 'POST',
        body: { userId: myProfile?._id }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setloaderStatus(true);
        setmyorderList(response?.data)
      }
    } catch (err) { }
  }
  async function myregisteredDays() {
    try {
      const registeredDate = new Date(myProfile?.registerOn);
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = (currentDate.getTime()) - (registeredDate.getTime());
      const diffInDays = Math.round(diffInTime / oneDay);
      setregisteredDays(diffInDays);
    } catch (err) { }
  }
  async function getfeedBackDet() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getfeedbackDetails`,
        method: 'POST',
        body: { userId: advertiserNo }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setloaderStatus(true);
        setfeedbackDet(response?.data)
      }
    } catch (err) { }
  }
  async function selectfeedBackType(type) {
    setfeedBackType(type);
  }
  async function getblockUsersDet() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getblockUsers`,
        method: 'POST',
        body: { userId: myProfile?._id }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setloaderStatus(true);
        setblockusersDetails(response?.data);
      }
    } catch (err) { }
  }
  async function blockUnblock(item) {
    try {
      const data = {
        status: item.status,
        advertiserNo: item?.advertiserNo,
        userId: myProfile?._id,
        type: "blockuser"
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/submitReport`,
        method: 'POST',
        body: data
      }
      const result = (await makeRequest(params));
      let type = 'error';
      if (result.status) {
        type = 'success';
        setTimeout(() => {
          getblockUsersDet()
          setUserProfile();
        }, 300)
      }
      toast({ type, message: result.message });
    } catch (err) { }
  }
  async function getadvertiserDet() {
    try {
      const data = { advertiserNo: advertiserNo }
      const params = {
        url: `${Config.V1_API_URL}p2p/advertiserDet`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setloaderStatus(true);
        setadvertiserDet(response?.data);
        const registeredDate = new Date(response?.data?.dateTime);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = (currentDate.getTime()) - (registeredDate.getTime());
        const diffInDays = Math.round(diffInTime / oneDay);
        setregisteredDays(diffInDays);
      }
    } catch (err) { }
  }
  async function getadvertiserOrderDet() {
    try {
      const data = { advertiserNo: advertiserNo }
      const params = {
        url: `${Config.V1_API_URL}p2p/advertiserOrderDet`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status && response.data) {
        let sellerArray = [];
        let buyerArray = [];
        response.data.length > 0 && response.data.map((item) => {
          if (item.orderType == "sell") {
            sellerArray.push(item);
            sellerArray = sellerArray.slice().sort((a, b) => a.price - b.price);
          } else {
            buyerArray.push(item);
            buyerArray = buyerArray.slice().sort((a, b) => b.price - a.price);
          }
          setbuyerOrderList(buyerArray);
          setsellerOrderList(sellerArray);
          setloaderStatus(true);
        })
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
  async function getCurrentPairPrice(selectedPair) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getCurrentpair`,
        method: 'POST',
        body: { pair: selectedPair }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        sercurrentPrice(response.data.lastPrice)
      }
    } catch (err) { }
  }

  async function orderClick(data) {
    setselectOrderDetails(data);
    if (expanded == false) {
      setexpanded(true)
    } else {
      setexpanded(false);
    }
    getCurrentPairPrice(data.fromCurrency + "_" + data.toCurrency)
    serOrderData({ price: "", total: "" });
    getBalance(data);
    getSelectedPayment(data);
  }
  async function getBalance(data) {
    try {
      const value = { currencyId: data.fromCurrencyId }
      const params1 = {
        url: `${Config.V1_API_URL}p2p/getBalance`,
        method: 'POST',
        body: value
      }
      const result = (await makeRequest(params1));
      if (result.status) {
        setuserWallet(result?.data?.p2pAmount)
      }
    } catch (err) { }
  }
  async function getSelectedPayment(data) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getbuyerPaymentMethods`,
        method: 'GET',
      }
      const response = (await makeRequest(params));
      if (response.status) {
        const paymentMethodArray = [];
        if (data.paymentmethodIdDetail && data.paymentmethodIdDetail.length > 0 && response.data.length > 0) {
          data.paymentmethodIdDetail.map((methodData) => {
            response.data.map((buyerData) => {
              if (buyerData.paymentmethodId === methodData._id) {
                const accountNo = (buyerData.paymenttype == "UPI") ? buyerData.upiId : buyerData.accountNo;
                paymentMethodArray.push({ _id: buyerData._id, name: buyerData.paymenttype, accountNo: accountNo });
              }
            })
            setbuyerPaymentList(paymentMethodArray);
          })
        } else {
          setbuyerPaymentList([])
        }
      }
    } catch (err) { }
  }
  const handlebuyerpaymentChange = (event) => {
    let value = event.target.value;
    setbuyerpaymentId(value);
  }
  const calculateValues = (placeValue, placeType) => {
    let price = selectOrderDetails.priceType == 'Fixed' ? selectOrderDetails.price : currentPrice;
    let orderValue = JSON.parse(JSON.stringify(orderData));
    let result = 0;
    if (placeType == 'price') {
      orderValue.price = placeValue;
      result = (orderValue.price / price);
      orderValue.total = decimalValue(result, selectOrderDetails.fromCurrencyDecimal);
    } else {
      orderValue.total = placeValue;
      result = (orderValue.total * price);
      orderValue.price = decimalValue(result, selectOrderDetails.toCurrencyDecimal);
    }
    if (isNaN(orderValue.price)) {
      orderValue.price = '';
      orderValue.total = '';
    }
    else {
      seterrors({})
    }
    if (orderValue.price < selectOrderDetails.minAmt || orderValue.price > selectOrderDetails.maxAmt) {
      seterrors({})
    }
    serOrderData(orderValue);
  }
  let errorType = 'error';
  async function handleSubmit() {
    try {
      if (myProfile) {
        const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
        if (pageAllowCheckResp.type == "error") {
          toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
          navigate(pageAllowCheckResp.navigate);
        }
      }
      setisLoading(true);
      let orderValue = JSON.parse(JSON.stringify(orderData));
      let errMsg = '';
      if(selectOrderDetails) {
        if (selectOrderDetails.orderType == "sell") {
          if (selectOrderDetails.usdtPrice < Number(orderValue.total)) {
            errMsg = "Available balance is " + selectOrderDetails.usdtPrice + " " + selectOrderDetails.fromCurrency;
          }
          if (Number(orderValue.price) < selectOrderDetails.minAmt) {
            errMsg = "The minimum order amount is " + selectOrderDetails.minAmt + " " + selectOrderDetails.toCurrency;
          }
          if (Number(orderValue.price) > selectOrderDetails.maxAmt) {
            errMsg = "The max order amount is " + selectOrderDetails.maxAmt + " " + selectOrderDetails.toCurrency;
          }
        } else {
          if (userWallet == 0) {
            errMsg = "Insufficient balance, please transfer first.";
          }
          if (userWallet < Number(orderValue.total)) {
            errMsg = "Insufficient balance, please transfer first.";
          }
          if (selectOrderDetails.usdtPrice < Number(orderValue.total)) {
            errMsg = "Available balance is " + selectOrderDetails.usdtPrice + " " + selectOrderDetails.fromCurrency;
          }
          if (Number(orderValue.price) < selectOrderDetails.minAmt) {
            errMsg = "The minimum order amount is " + selectOrderDetails.minAmt + " " + selectOrderDetails.toCurrency;
          }
          if (Number(orderValue.price) > selectOrderDetails.maxAmt) {
            errMsg = "The max order amount is " + selectOrderDetails.maxAmt + " " + selectOrderDetails.toCurrency;
          }
          if (buyerpaymentId == "") {
            errMsg = "Please select the payment method";
          }
        }
      }
      else {
        errMsg = "Error occured, Please try again";
      }
      if (errMsg) {
        setisLoading(false);
        toast({ type: errorType, message: errMsg });
        return false;
      }
      const data = {
        price: orderValue.price,
        totalPrice: orderValue.total,
        userId: myProfile?._id,
        orderId: selectOrderDetails?._id,
        ownerId: selectOrderDetails?.userId,
        pairId: selectOrderDetails?.pairId,
        paymentId: (selectOrderDetails.orderType == "sell") ? buyerpaymentId : (selectOrderDetails?.paymentId),
        orderLimit: selectOrderDetails?.timeLimit,
        orderType: selectOrderDetails.orderType,
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/submitOrder`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      setisLoading(false);
      if (response.status) {
        errorType = 'success';
        toast({ type: errorType, message: response.message });
        navigate('/order-details/' + response?.data?.orderNo);
      } else {
        setisLoading(false);
        errorType = "error";
        if (response.message) {
          toast({ type: errorType, message: response.message });
          return false;
        }
      }
    } catch (err) { console.log("err_err:", err) }
  }
  const formik1 = useFormik({
    initialValues: {
      reasonval: '',
      blockreport: ''
    },
    onSubmit: async (values) => {
      let type = 'error';
      if (reasonval == "Other") {
        if (values.blockreport == "") {
          toast({ type, message: "Please enter the reason for blocking" });
          return false;
        }
        reasonval = values.blockreport
      } else {
        if (reasonval == "") {
          toast({ type, message: "Please select the reason for blocking" });
          return false;
        }
      }
      const data = {
        userId: myProfile?._id,
        advertiserNo: advertiserNo,
        reason: reasonval,
        type: "blockuser"
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/submitReport`,
        method: 'POST',
        body: data
      }
      const result = (await makeRequest(params));
      if (result.status) {
        type = 'success';
      }
      setisLoading(false);
      setblockformOpen(false);
      getblockUsersDet();
      setReasonval("");
      formik1.values = "";
      toast({ type, message: result.message });
    },
  });
  const formik = useFormik({
    initialValues: {
      reason: '',
      orderNo: '',
      description: '',
      email: '',
      myfile1: ''
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
          orderNo: values.orderNo,
          userId: myProfile?._id,
          advertiserNo: advertiserNo,
          reason: values.reason,
          description: values.description,
          email: values.email,
          attachment: response.message[0].location,
          type: "report"
        }
        const params = {
          url: `${Config.V1_API_URL}p2p/submitReport`,
          method: 'POST',
          body: data
        }
        const result = (await makeRequest(params));
        let type = 'error';
        if (result.status) {
          type = 'success';
          setreportformOpen(false);
          formik.values.orderNo = "";
          formik.values.myfile1 = "";
        }
        getblockUsersDet();
        setisLoading(false);
        toast({ type, message: result.message });
      }
    },
  });
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />

      <div className="p2p-trade-top-section">
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
            <section>
              <div className="container-fluid col-11 border-bottom py-4">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div className="d-flex align-items-center" >
                      <div className="my-auto">
                        <span className="circles">
                          {(advertiserDet?.username) != "" ?
                            (advertiserDet?.username?.trim()?.charAt(0))
                            : (advertiserDet?.email?.trim()?.charAt(0))
                          }
                        </span>
                      </div>
                      <span className="ps-2">{(advertiserDet && advertiserDet?.username) != "" ? (advertiserDet && advertiserDet?.username) : showEmail(advertiserDet && advertiserDet?.email)}</span>&nbsp;
                      <span className="fc-g p-1 bg-light-green">Verified User</span>
                      {advertiserNo != "" && advertiserNo != undefined &&
                        <>|
                          {blockusersDetails.length > 0 ?
                            blockusersDetails.map((item) => {
                              if (item.userId == myProfile?._id && item.advertiserNo == advertiserNo && item.type == "blockuser") {
                                return (
                                  <>
                                    <span className='color-red padding-right-icon curPointer' onClick={(item?.status) == 1 ? () => blockUnblock(item) : () => setblockformOpen(true)}> {(item?.status) == 1 ? "Unblock" : "Block"}</span>
                                  </>
                                )
                              }
                            })
                            :
                            <span className='color-red padding-right-icon curPointer' onClick={() => setblockformOpen(true)}>Block</span>
                          }&nbsp;
                          <span className='color-red padding-right-icon curPointer' onClick={() => setreportformOpen(true)}> Report</span>
                        </>
                      }
                    </div>
                    <div className="mt-2 margin-left-css">
                      Joined on {yearmonthdateFormat(advertiserDet && advertiserDet?.registerOn)}
                    </div>

                  </div>
                  <div className="col-lg-4 ">
                    <div className="">
                      <span>Positive Feedback</span>
                    </div>
                    <div className="mt-2">
                      <span className=""><span className="font-size-style">{isNaN(feedbackDet && feedbackDet?.positivefeedback) == true ? 0 : (feedbackDet && feedbackDet.positivefeedback)?.toFixed(2)} %
                        ({isNaN(feedbackDet && feedbackDet?.totalfeedbackCount) == true ? 0 : (feedbackDet && feedbackDet?.totalfeedbackCount)})
                      </span> &nbsp;&nbsp;
                        <span className="font-size-style text-success">Positive &nbsp; {isNaN(feedbackDet && feedbackDet?.positiveCount) == true ? 0 : feedbackDet && feedbackDet.positiveCount}</span>

                        <span className="font-size-style text-danger ms-3">Negative &nbsp;  {isNaN(feedbackDet && feedbackDet?.negativeCount) == true ? 0 : feedbackDet && feedbackDet.negativeCount}</span>

                      </span>
                    </div>
                  </div>
                </div>
                <Modal show={nicknameformOpen} onHide={() => setnicknameformOpen(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Set Username</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Formik
                      initialValues={initialValues()}
                      validationSchema={profilevalidationSchema}
                      onSubmit={(values) => {
                        onSubmit(values)
                      }}
                    >
                      {(formikProps) => {
                        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
                        return (
                          <Form >
                            <div className="row  ">
                              <div className="col-lg-12 ">
                                <div className='mt-4'>
                                  <input
                                    className="form-control w-100 mt-1"
                                    type="text"
                                    label="Username"
                                    id="username"
                                    name='username'
                                    autoComplete='off'
                                    value={values.username != null ? values.username : myProfile?.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                  />
                                  {errors.username ? <small className="invalid-username error">{errors.username}</small> : null}
                                  <p className='color-white f-14 mt-4 mb-0'>Last edit time was {dateFormat(myProfile?.updatedOn)}.</p>
                                </div>
                              </div>
                              <div className='row mt-5'>
                                <div className='col'>
                                  <button type="submit"
                                    className="btn text-white btn-col w-100 mt-4"
                                    onClick={() => handleSubmit(values)}
                                  >
                                    Ok
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )
                      }}
                    </Formik>
                  </Modal.Body>
                </Modal>
              </div>
            </section>

            <section>
              <div className="container-fluid col-11 py-4">
                <div className="row row-cols-lg-6 row-cols-2">
                  <div className="col">
                    <span className="text-muted fs-14 ">All Trades</span>
                    <p className="py-2"><span className="font-size-style ">{isNaN(myorderList && myorderList?.totaltradesCounts) == true ? 0 : (myorderList && myorderList?.totaltradesCounts)}</span><span className="fs-14 mx-1">Time(s)</span></p>
                  </div>
                  <div className="col">
                    <span className="text-muted fs-14">30d Trades</span>
                    <p className="py-2"><span className="font-size-style">{isNaN(myorderList && myorderList?.monthtradeCounts) == true ? 0 : (myorderList && myorderList?.monthtradeCounts)}</span><span className="fs-14 mx-1">Time(s)</span></p>
                  </div>
                  <div className="col">
                    <span className="text-muted fs-14">30d Completion rate</span>
                    <p className="py-2"><span className="font-size-style">{isNaN(myorderList && myorderList?.completionRate) == true ? 0 : (myorderList && myorderList?.completionRate)}</span><span className="fs-14 mx-1">%</span></p>
                  </div>
                  <div className="col">
                    <span className="text-muted fs-14">First Trade</span>
                    <p className="py-2"><span className="font-size-style">{isNaN(myorderList && myorderList?.firstTradeDate) == true ? 0 : (myorderList && myorderList?.firstTradeDate)}</span><span className="fs-14 mx-1">Days</span></p>
                  </div>
                  <div className="col">
                    <span className="text-muted fs-14">Registered</span>
                    <p className="py-2"><span className="font-size-style">{isNaN(registeredDays) == true ? 0 : registeredDays}</span><span className="fs-14 mx-1">Days</span></p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================SCROLLSPY-STARTS==================================*/}
            <section className="p2puser-center-scrollspy-styling py-5">
              <div className="container-fluid col-11 py-4">

                <div className="d-flex p2puser-center-scrollsp-border">
                  <button className="p2puser-center-scrollspy-button " id="nav-p2p-tab" type="button" >Online Ads</button>
                  <button className="p2puser-center-scrollspy-button" id="nav-feedback-tab" type="button" >
                    <a href="#scrollspy-section-2-para">
                      Feedback ({(feedbackDet && feedbackDet?.totalfeedbackCount)})
                    </a>
                  </button>
                </div>
                <div id="scrollspy-section-3-para" className="row">
                  <div className="col py-3">
                    <div className="row p2p-user-center-scrollspy-tops-heading ">
                      <p>Buy from the user</p>
                    </div>
                    <div className="row row-cols-1  ">
                      <div className="col tableFixHead">
                        <table className="p2p-trade-table">
                          <thead className="p2p-trade-table-thead">
                            <tr className="p2p-trade-table-tr">
                              <th className="p2p-trade-table-th px-3"><label>Coin</label></th>
                              <th className="p2p-trade-table-th"><label>Price&nbsp;<span className="color-yellow1">lowest to highest</span></label></th>
                              <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                              <th className="p2p-trade-table-th"><label>Payment</label></th>
                              <th className="p2p-trade-table-th"><label>Trade</label></th>

                            </tr>
                          </thead>
                          <tbody className="p2p-trade-table-tbody" >
                            {sellerOrderList && sellerOrderList.length > 0 ?
                              sellerOrderList.map((row, index) => {
                                return (
                                  <>
                                    <tr className="p2p-trade-table-tr">
                                      <td data-label="Invoice" className="p2p-trade-table-td px-3">
                                        <span className="table-data-1 ">
                                          {row.fromCurrencyImage && <img src={row.fromCurrencyImage} />}
                                          {(row?.fromCurrency)}
                                        </span>
                                      </td>
                                      <td data-label="Invoice" className="p2p-trade-table-td">
                                        <span className="table-data-3">
                                          {(row?.price?.toFixed(2))} </span><span className="table-data-4"> {(row?.toCurrency)}</span>
                                      </td>
                                      <td data-label="Details" className="p2p-trade-table-td">
                                        <span className="table-data-5"><span className="table-data-6">Available</span>{decimalValue(row?.usdtPrice, 2)} {row?.fromCurrency}</span><br />
                                        <span className="table-data-5"><span className="table-data-6">Limit</span> {row?.toCurrencySymbolCode} {row.minAmt?.toFixed(2)} - {row?.toCurrencySymbolCode} {(row.maxAmt?.toFixed(2))} </span>
                                      </td>
                                      <td data-label="Due Date" className="p2p-trade-table-td">
                                        <span className="table-data-7">{row?.paymentNames}</span>
                                      </td>
                                      <td data-label="Amount" className="p2p-trade-table-td">
                                        <button
                                          onClick={() => orderClick(row)}
                                          data-bs-toggle="collapse" data-bs-target="#collapseExample-2"
                                          aria-expanded="false" aria-controls="collapseExample"
                                          className="add-payment-method-confirm-button w-50 text-white fw-bold"
                                        >
                                          Buy {" " + row.fromCurrency}
                                        </button>
                                      </td>

                                    </tr>
                                    {expanded === true && selectOrderDetails && selectOrderDetails._id === row._id && (
                                      <tr>
                                        <td colSpan={5}>
                                          <div className="collapsed py-3" id="collapseExample-2">
                                            <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                              <div className="row g-4 justify-content-around">
                                                <div className="col-lg-7">
                                                  <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                      <p className="mb-0">
                                                        <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">{(selectOrderDetails?.price)?.toFixed(2)} {selectOrderDetails?.toCurrency} </span>
                                                      </p>
                                                      <p className="mb-0">
                                                        <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">
                                                          {
                                                            (selectOrderDetails?.timeLimit != 15 && selectOrderDetails?.timeLimit != 30 && selectOrderDetails?.timeLimit != 45) ?
                                                              Math.floor(selectOrderDetails?.timeLimit / 60) + " hr"
                                                              :
                                                              selectOrderDetails?.timeLimit + " Minutes"
                                                          }
                                                        </span>
                                                      </p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <p className="mb-0">
                                                        <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">{(selectOrderDetails?.usdtPrice)?.toFixed(2)} {selectOrderDetails?.fromCurrency} </span>
                                                      </p>
                                                      <p className="mb-0">
                                                        <span className="table-data-6">{selectOrderDetails.orderType == "buy" ? "Seller's payment method" : "Buyer’s payment method"} </span>
                                                        <span className="table-data-7 ms-2">{selectOrderDetails?.paymentNames}</span>
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                {selectOrderDetails.orderType == "buy" &&
                                                  <div className="col-lg-4">
                                                    <span className="table-data-2">I want to sell</span>
                                                    <div className="d-flex border px-2 align-items-center mb-4">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        aria-describedby="emailHelp"
                                                        name="total"
                                                        placeholder="0.00"
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'total')}
                                                        value={orderData.total}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.fromCurrency}</span>
                                                    </div>

                                                    <span className="table-data-2">I will receive</span>
                                                    <div className="d-flex border px-2 align-items-center mb-4">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="price"
                                                        placeholder={(selectOrderDetails.minAmt + '-' + selectOrderDetails.maxAmt)}
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'price')}
                                                        value={orderData.price}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.toCurrency}</span>
                                                    </div>

                                                    <span className="table-data-2">payment Method</span>
                                                    <Form.Select aria-label="Default select example" onChange={handlebuyerpaymentChange}>
                                                      {(buyerPaymentList.length > 0) ? <option value=""> Select method </option> : <option> Set my payment method </option>}
                                                      {(buyerPaymentList && buyerPaymentList.length > 0 && buyerPaymentList.map((item, i) => {
                                                        return (
                                                          <>
                                                            <option value={item._id} key={i} >{item.name + " - " + item.accountNo} </option>
                                                          </>
                                                        )
                                                      })
                                                      )
                                                      }
                                                    </Form.Select>
                                                    {buyerPaymentList.length == 0 && <span onClick={() => navigate('/p2p-user-center')} className="color-black cursor f-14 mt-3 mb-3">Click here to add Payment Method</span>}
                                                    <div className="row mt-4">
                                                      <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                      </div>
                                                      <div className="col-lg-8">
                                                        <button className={selectOrderDetails.orderType == "buy" ? "add-payment-method-confirm-button w-100 text-white fw-bold" : "add-payment-method-confirm-button w-100 text-white fw-bold"} type="button" onClick={() => handleSubmit(orderData)}>{selectOrderDetails?.orderType == "buy" ? "Sell" : "Buy"} {selectOrderDetails?.fromCurrency}</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                                {selectOrderDetails.orderType == "sell" &&
                                                  <div className="col-lg-4">
                                                    <span className="table-data-2">I want to pay</span>
                                                    <div className="d-flex border px-2 align-items-center mb-4">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="price"
                                                        placeholder={(selectOrderDetails.minAmt + '-' + selectOrderDetails.maxAmt)}
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'price')}
                                                        value={orderData.price}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.toCurrency}</span>
                                                    </div>

                                                    <span className="table-data-2">I will receive</span>
                                                    <div className="d-flex border px-2 align-items-center">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="total"
                                                        placeholder={"0.00 " + selectOrderDetails?.fromCurrency}
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'total')}
                                                        value={orderData.total}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.fromCurrency}</span>
                                                    </div>
                                                    <div className="row mt-4">
                                                      <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button" onClick={() => setexpanded(false)}>Cancel</button>
                                                      </div>
                                                      <div className="col-lg-8">
                                                        <button disabled={isLoading} className={selectOrderDetails.orderType == "buy" ? "add-payment-method-confirm-button w-100 text-white fw-bold" : "add-payment-method-confirm-button w-100 text-white fw-bold"} type="button" onClick={() => handleSubmit(orderData)}>{selectOrderDetails?.orderType == "buy" ? "Sell" : "Buy"} {selectOrderDetails?.fromCurrency}</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                              </div>

                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                )
                              })
                              :
                              <>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <div className="col">
                                      <div className="text-center py-5">
                                        <img src={noResponsibile} className="noresponse-image-styling"></img>
                                        <p className="scrollspy-tops-heading-paragraph mt-3">No records</p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            }
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
                <div id="scrollspy-section-3-para" className="row">
                  <div className="col py-3">
                    <div className="row p2p-user-center-scrollspy-tops-heading ">
                      <p>Sell to the user</p>
                    </div>
                    <div className="row row-cols-1 ">
                      <div className="col tableFixHead">

                        <table className="p2p-trade-table">
                          <thead className="p2p-trade-table-thead">
                            <tr className="p2p-trade-table-tr">
                              <th className="p2p-trade-table-th px-3"><label>Coin</label></th>
                              <th className="p2p-trade-table-th"><label>Price&nbsp;<span className="color-yellow1">lowest to highest</span></label></th>
                              <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                              <th className="p2p-trade-table-th"><label>Payment</label></th>
                              <th className="p2p-trade-table-th"><label>Trade</label></th>
                            </tr>
                          </thead>
                          <tbody>
                            {buyerOrderList && buyerOrderList.length > 0 ?
                              buyerOrderList.map((row, index) => {
                                return (
                                  <>
                                    <tr className="p2p-trade-table-tr" key={index}>
                                      <td data-label="Invoice" className="p2p-trade-table-td px-3">
                                        <span className="table-data-1">
                                          {row.fromCurrencyImage && <img src={row.fromCurrencyImage} />}
                                          {(row?.fromCurrency)}
                                        </span>
                                      </td>
                                      <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">
                                        {(row?.price?.toFixed(2))} </span><span className="table-data-4"> {(row?.toCurrency)}</span>
                                      </td>
                                      <td data-label="Due Date" className="p2p-trade-table-td">
                                        <span className="table-data-5"><span className="table-data-6">Available</span>{decimalValue(row?.usdtPrice, 2)} {row?.fromCurrency}</span><br />
                                        <span className="table-data-5"><span className="table-data-6">Limit</span>{row?.toCurrencySymbolCode} {row.minAmt?.toFixed(2)} - {row?.toCurrencySymbolCode} {(row.maxAmt?.toFixed(2))}</span>
                                      </td>
                                      <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">{row?.paymentNames}</span></td>
                                      <td data-label="Payment" className="p2p-trade-table-td">
                                        <button
                                          onClick={() => orderClick(row)}
                                          // data-bs-toggle="collapse" data-bs-target="#collapseExample-1"
                                          // aria-expanded="false" aria-controls="collapseExample"
                                          className="btn btn-danger w-50 text-white fw-bold"
                                        >
                                          Sell{" " + row.fromCurrency}
                                        </button>
                                      </td>
                                    </tr>
                                    {expanded === true && selectOrderDetails && selectOrderDetails._id === row._id && (
                                      <tr>
                                        <td colSpan={5}>
                                          <div className="collapsed py-3" id="collapseExample-1">
                                            <div className=" card bg-transparent card-body container p2p-trade-buy-sell-collapse-container">
                                              <div className="row g-4 justify-content-around">
                                                <div className="col-lg-7">
                                                  <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                      <p className="mb-0">
                                                        <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">{(selectOrderDetails?.price)?.toFixed(2)} {selectOrderDetails?.toCurrency} </span>
                                                      </p>
                                                      <p className="mb-0">
                                                        <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">{selectOrderDetails?.timeLimit} Minutes</span>
                                                      </p>
                                                    </div>

                                                    <div className="col-lg-6">
                                                      <p className="mb-0">
                                                        <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">{(selectOrderDetails?.usdtPrice)?.toFixed(2)} {selectOrderDetails?.fromCurrency} </span>
                                                      </p>
                                                      <p className="mb-0">
                                                        <span className="table-data-6">{selectOrderDetails.orderType == "buy" ? "Seller's payment method" : "Buyer’s payment method"} </span>
                                                        <span className="table-data-7 ms-2">{selectOrderDetails?.paymentNames}</span>
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                {selectOrderDetails.orderType == "buy" &&
                                                  <div className="col-lg-4">
                                                    <span className="table-data-2">I want to sell</span>
                                                    <div className="d-flex border px-2 align-items-center mb-4">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        aria-describedby="emailHelp"
                                                        name="total"
                                                        placeholder="0.00"
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'total')}
                                                        value={orderData.total}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.fromCurrency}</span>
                                                    </div>
                                                    {selectOrderDetails.orderType == "buy" && (
                                                      <div className="mb-4">
                                                        <span className="table-data-2">
                                                          Balance :{" "}
                                                          {decimalValue(userWallet,selectOrderDetails.fromCurrencyDecimal)}{" "}
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
                                                    <span className="table-data-2">I will receive</span>

                                                    <div className="d-flex border px-2 align-items-center mb-4">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="price"
                                                        placeholder={(selectOrderDetails.minAmt + '-' + selectOrderDetails.maxAmt)}
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'price')}
                                                        value={orderData.price}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.toCurrency}</span>
                                                    </div>

                                                    <span className="table-data-2">payment Method</span>
                                                    <Form.Select aria-label="Default select example" onChange={handlebuyerpaymentChange}>
                                                      {(buyerPaymentList.length > 0) ? <option value=""> Select method </option> : <option> Set my payment method </option>}
                                                      {(buyerPaymentList && buyerPaymentList.length > 0 && buyerPaymentList.map((item, i) => {
                                                        return (
                                                          <>
                                                            <option value={item._id} key={i} >{item.name + " - " + item.accountNo} </option>
                                                          </>
                                                        )
                                                      })
                                                      )
                                                      }
                                                    </Form.Select>
                                                    {buyerPaymentList.length == 0 && <span onClick={() => navigate('/p2p-user-center')} className="color-black cursor f-14 mt-3 mb-3">Click here to add Payment Method</span>}
                                                    <div className="row mt-4">
                                                      <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button" onClick={() => setexpanded(false)}>Cancel</button>
                                                      </div>
                                                      <div className="col-lg-8">
                                                        <button className={selectOrderDetails.orderType == "buy" ? "btn btn-danger w-100 text-white fw-bold" : "btn btn-danger w-100 text-white fw-bold"} type="button" onClick={() => handleSubmit(orderData)}>{selectOrderDetails?.orderType == "buy" ? "Sell" : "Buy"} {selectOrderDetails?.fromCurrency}</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                                {selectOrderDetails.orderType == "sell" &&
                                                  <div className="col-lg-4">
                                                    <span className="table-data-2">I want to pay</span>
                                                    <div className="d-flex border px-2 align-items-center mb-4">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="price"
                                                        placeholder={(selectOrderDetails.minAmt + '-' + selectOrderDetails.maxAmt)}
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'price')}
                                                        value={orderData.price}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.toCurrency}</span>
                                                    </div>

                                                    <span className="table-data-2">I will receive</span>
                                                    <div className="d-flex border px-2 align-items-center">
                                                      <input
                                                        type="number"
                                                        className="form-control no-border table-data-2"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="total"
                                                        placeholder={"0.00 " + selectOrderDetails?.fromCurrency}
                                                        autoComplete='off'
                                                        onChange={(event) => calculateValues(event.target.value, 'total')}
                                                        value={orderData.total}
                                                      />
                                                      <span className="table-data-2">{selectOrderDetails?.fromCurrency}</span>
                                                    </div>
                                                    <div className="row mt-4">
                                                      <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button" onClick={() => setexpanded(false)}>Cancel</button>
                                                      </div>
                                                      <div className="col-lg-8">
                                                        <button disabled={isLoading} className={selectOrderDetails.orderType == "buy" ? "add-payment-method-confirm-button w-100 text-white fw-bold" : "add-payment-method-confirm-button w-100 text-white fw-bold"} type="button" onClick={() => handleSubmit(orderData)}>{selectOrderDetails?.orderType == "buy" ? "Sell" : "Buy"} {selectOrderDetails?.fromCurrency}</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                              </div>

                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                    }
                                  </>
                                )
                              })
                              :
                              <>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <div className="col">
                                      <div className="text-center py-5">
                                        <img src={noResponsibile} className="noresponse-image-styling"></img>
                                        <p className="scrollspy-tops-heading-paragraph mt-3">No records</p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>


                <div id="scrollspy-section-2-para" className="row">
                  <div className="col py-3">
                    <div className="row p2p-user-center-scrollspy-tops-heading ">
                      <p>Feedback</p>
                    </div>
                    <div className="d-flex">
                      <div className=" align-items-center">
                        <span className=""><b>{isNaN(feedbackDet && feedbackDet?.positivefeedback) == true ? 0 : (feedbackDet && feedbackDet?.positivefeedback)} %</b></span>
                        <h6 className="mt-1">{isNaN(feedbackDet && feedbackDet?.totalfeedbackCount) == true ? 0 : (feedbackDet && feedbackDet?.totalfeedbackCount)} Reviews</h6>
                      </div>
                      <div className="">
                        <div className="d-flex align-items-center">
                          <span className="ps-4 fc-g "><AiFillLike /></span>
                          <div className="align-items-center ps-2">
                            <div className="progress p2p-usercenter-progressbar-top">
                              <Line percent={(feedbackDet?.positivefeedback)} strokeColor="#0bb90b" />&nbsp;
                            </div>

                          </div>
                          <span className="ps-2">{feedbackDet && feedbackDet?.positiveCount}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="ps-4 fc-r"><AiFillDislike /></span>
                          <div className="align-items-center ps-2">
                            <div className="progress p2p-usercenter-progressbar-top">
                              <Line percent={(feedbackDet?.totalnegativeFeedback)} strokeColor="#ff004b" />&nbsp;
                            </div>
                          </div>
                          <span className="ps-2"> {feedbackDet && feedbackDet?.negativeCount}</span>
                        </div>
                      </div>
                    </div>

                    <nav className="p2p-user-center-nav-tabs-styling">
                      <div className="nav nav-tabs " id="nav-tab" role="tablist">
                        <button className={feedBackType == "all" ? "nav-link  active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => selectfeedBackType('all')}>All</button>
                        <button className={feedBackType == "positive" ? "nav-link active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="false" onClick={() => selectfeedBackType('positive')}>
                          Positive({isNaN(feedbackDet && feedbackDet?.positiveCount) == true ? 0 : (feedbackDet && feedbackDet?.positiveCount)})
                        </button>
                        <button className={feedBackType == "negative" ? "nav-link active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="false" onClick={() => selectfeedBackType('negative')}>
                          Negative({isNaN(feedbackDet && feedbackDet?.negativeCount) == true ? 0 : (feedbackDet && feedbackDet?.negativeCount)})
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content pt-4" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        {feedBackType == "all" ?
                          <>
                            {
                              feedbackDet.totalfeedback && feedbackDet.totalfeedback.length > 0 ?
                                feedbackDet.totalfeedback.map((data, i) => {
                                  return (
                                    <>
                                      <div className="row mb-4" key={i}>
                                        <div className="col-lg-3">
                                          <div className="d-flex mb-2 align-items-center">
                                            <div className="my-auto">
                                              <span className="circles">
                                                {data?.userDet?.email?.charAt(0)}
                                              </span>
                                            </div>
                                            <span className="ps-2">{showEmail(data?.userDet?.email)}</span>
                                          </div>
                                          <span className="text-muted px-4 scrollspy-tops-heading-paragraph">{dateFormat(data?.createdDate)}</span>
                                        </div>
                                        <div className="col-lg-9 text-start">
                                          {data?.feedBackStatus == 1 ?
                                            <span className=" fc-g "><AiFillLike /></span>
                                            :
                                            <span className=" fc-g "><AiFillDislike className="color-red" /></span>
                                          }
                                          <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                        </div>
                                      </div>
                                    </>
                                  )
                                })
                                :
                                <div className="text-center py-5">
                                  <img src={noResponsibile} className="noresponse-image-styling"></img>
                                  <p className="scrollspy-tops-heading-paragraph mt-3">No Feedback</p>
                                </div>
                            }
                          </>
                          :
                          feedBackType == "positive" ?
                            <>
                              {feedbackDet.postive && feedbackDet.postive.length > 0 ?
                                feedbackDet.postive.map((data) => {
                                  return (
                                    <>
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <div className="d-flex mb-2 align-items-center">
                                            <div className="my-auto">
                                              <span className="circles">
                                                {data?.userDet?.email?.charAt(0)}
                                              </span>
                                            </div>
                                            <span className="ps-2">{showEmail(data?.userDet?.email)}</span>
                                          </div>
                                          <span className="text-muted px-4 scrollspy-tops-heading-paragraph">{dateFormat(data?.createdDate)}</span>
                                        </div>
                                        {data?.feedBackStatus == 1 &&
                                          <div className="col-lg-9 text-start">
                                            <span className=" fc-g "><AiFillLike /></span>
                                            <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                          </div>
                                        }
                                      </div>
                                    </>
                                  )
                                })
                                :
                                <div className="text-center py-5">
                                  <img src={noResponsibile} className="noresponse-image-styling"></img>
                                  <p className="scrollspy-tops-heading-paragraph mt-3">No Feedback</p>
                                </div>
                              }
                            </>
                            :
                            feedbackDet.negative && feedbackDet.negative.length > 0 ?
                              feedbackDet.negative.map((data) => {
                                return (
                                  <>
                                    <div className="row">
                                      <div className="col-lg-3">
                                        <div className="d-flex mb-2 align-items-center">
                                          <div className="my-auto">
                                            <span className="circles">
                                              {data?.userDet?.email?.charAt(0)}
                                            </span>
                                          </div>
                                          <span className="ps-2">{showEmail(data?.userDet?.email)}</span>
                                        </div>
                                        <span className="text-muted px-4 scrollspy-tops-heading-paragraph">{dateFormat(data?.createdDate)}</span>
                                        {/* <p className="px-4 scrollspy-tops-heading-paragraph">GPay</p> */}
                                      </div>
                                      {data?.feedBackStatus != 1 &&
                                        <div className="col-lg-9 text-start">
                                          <span className=" fc-g "><AiFillDislike className="color-red" /></span>
                                          <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                        </div>
                                      }
                                    </div>
                                  </>
                                )
                              })
                              :
                              <div className="text-center py-5">
                                <img src={noResponsibile} className="noresponse-image-styling"></img>
                                <p className="scrollspy-tops-heading-paragraph mt-3">No Feedback</p>
                              </div>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        }

        {/* ========================================SCROLLSPY-ENDS====================================*/}

        {/* =====================================P2P-USER-CENTER-END==================================*/}
        <Modal show={blockformOpen} onHide={() => setblockformOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik1.handleSubmit}>
              <div className="modal-body">
                <p>You will not be able to trade with the user after blocking</p>
                <div className="form-check">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={handlereasonChange}
                    >
                      <FormControlLabel className='color-white' value="Harassment" control={<Radio className='color-yellow' />} label='Harassment' />
                      <FormControlLabel className='color-white' value="Bad credibility" control={<Radio />} label='Bad credibility' />
                      <FormControlLabel className='color-white' value="Seller is asking for extra fee" control={<Radio className='color-yellow' />} label='Seller is asking for extra fee' />
                      <FormControlLabel className='color-white' value="Malicious feedback" control={<Radio />} label='Malicious feedback' />
                      <FormControlLabel className='color-white' value="Scam suspicion" control={<Radio className='color-yellow' />} label='Scam suspicion' />
                      <FormControlLabel className='color-white' value="Other" control={<Radio className='color-yellow' />} label='Other' />
                    </RadioGroup>
                    {reasonval == "Other reasons" &&
                      <textarea className="form-control blockreport"
                        name='blockreport'
                        autoComplete='off'
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        error={formik1.touched.orderNo && Boolean(formik1.errors.orderNo)}
                        helperText={formik1.touched.orderNo && formik1.errors.orderNo}
                      ></textarea>
                    }
                  </FormControl>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setblockformOpen(false)}>Cancel</button>
                <button className="add-payment-method-confirm-button btn" type="submit" disabled={isLoading} >Submit</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/* report form*/}

        <Modal show={reportformOpen} onHide={() => setreportformOpen(false)} >

          <Modal.Header closeButton >
            <Modal.Title >Report Reason</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <form onSubmit={formik.handleSubmit}>
              <div className=" justify-content-center align-items-center ">
                <div>
                  <>
                    <span className="phonenumber-change-text-2">
                      Report Reason
                    </span>
                    <Select fullWidth
                      id="reason" className="color-white f-17"
                      name="reason"
                      label="Select currency"
                      onChange={formik.handleChange}
                    >
                      {reportReasonData.length > 0 && reportReasonData.map((data, index) => {
                        return (
                          <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                        )
                      })}
                    </Select>
                    {formik.errors.reason ? <small className="invalid-terms error">{formik.errors.reason}</small> : null}

                  </>
                </div>
                <div className=" mt-4">
                  <span className="phonenumber-change-text-2">
                    Order Number
                  </span>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete='off'
                      label="description"
                      id="orderNo"
                      name="orderNo"
                      placeholder="Enter order number"
                      value={formik.values.orderNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.errors.orderNo ? <small className="invalid-terms error">{formik.errors.orderNo}</small> : null}
                </div>
                <div className=" mt-4">
                  <span className="phonenumber-change-text-2">
                    Your Email
                  </span>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      autoComplete='off'
                      label="email"
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  {formik.errors.email ? <small className="invalid-terms error">{formik.errors.email}</small> : null}
                </div>
                <div className=" mt-4">
                  <span className="phonenumber-change-text-2">
                    Description
                  </span>
                  <div>
                    <textarea className="form-control description"
                      placeholder="Please provide as much details as possible"
                      autoComplete='off'
                      id="description"
                      name='description'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    ></textarea>
                  </div>
                </div>
                {formik.errors.description ? <small className="invalid-UPIID error">{formik.errors.description}</small> : null}
                <br /> <span className="phonenumber-change-text-2">
                  Upload Proof
                </span>
                <div>

                  <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" /><br />
                  <button className='payment-qrcode-optional-button mt-3' name="myfile1" type="button"
                    onClick={() =>
                      selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                        console.log("Files Selected", { name, size, source, file });
                        setattachment(file);
                        formik.values.myfile1 = file;
                        formik.errors.myfile1 = "";
                      })
                    }
                  >
                    <TbUpload />Upload
                  </button>
                </div>
                {formik.errors.myfile1 ? <small className="invalid-UPIID error">{formik.errors.myfile1}</small> : null}
              </div>
              <div className='row mt-5'>
                <div className='col'>
                  <div className="d-grid">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setreportformOpen(false)}>Cancel</button>
                    <button className="add-payment-method-confirm-button mt-3" type="submit" disabled={isLoading}>Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>

        </Modal>

      </div >
      <Footer />
    </div >
  );
}