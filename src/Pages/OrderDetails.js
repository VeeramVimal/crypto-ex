import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import NavbarOne from "./siteTheme/NavbarOne";
import P2PHeader from "./separate/P2PHeader";
import ChatBox from "./ChatBox";
import user from '../assets/images/user.png';
import { RiFileCopyFill } from "react-icons/ri";
import { AiFillBank } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai"
import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { useContextData } from '../core/context';
import socketIOClient from "socket.io-client";
import { dateFormat } from '../core/helper/date-format';
import { getCookie } from '../core/helper/cookie';
import DefaultUpload from "../assets/images/cloud+upload+file.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import * as yup from 'yup';
import { useFormik, Formik } from 'formik';
import Countdown from 'react-countdown';
import {
  Box, Typography, InputLabel, FormControl, Select, MenuItem, TextareaAutosize,
  RadioGroup, FormControlLabel, Radio, CardContent, Card
} from '@mui/material';
import { useFileUpload } from "use-file-upload";
import { TbUpload } from 'react-icons/tb';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { Bars } from 'react-loader-spinner'
import '../assets/styledev.css'

const validationSchema = yup.object({
  phone: yup
    .number()
    .typeError('Enter the phone no')
    .required('Phone no is required'),
  reasonAppeal: yup
    .string('Enter the reason')
    .required('Reason appeal is required'),
  myfile1: yup
    .mixed().required('Upload proof is required'),
});
const otpvalidationSchema = yup.object({
  OTPCode: yup
    .string('Enter the 2FA')
    .required('2FA Code is required'),
});

const reportvalidationSchema = yup.object({
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
export default function OrderDetails(props) {
  const defaultSrc = DefaultUpload;

  const { orderId } = useParams();
  const navigate = useNavigate();
  const { myProfile, setUserProfile } = useContextData();
  const [p2pOrdersList, setp2pOrdersList] = useState([]);
  const [p2pPaymentList, setp2pPaymentList] = useState([]);
  const [appealHistory, setappealHistory] = useState([]);
  const [chattingHistory, setchattingHistory] = useState([]);
  const [endtime, setEndtime] = useState(new Date());
  const [verifyStep, setverifyStep] = useState(0);
  const [confirmformOpen, setconfirmformOpen] = useState(false);
  const [acceptStatus, setacceptStatus] = useState(false);
  const [appealformOpen, setappealformOpen] = useState(false);
  const [cancelformOpen, setcancelformOpen] = useState(false);
  const [endtimeStatus, setendtimeStatus] = useState(false);
  const [paymentendtimeStatus, setpaymentendtimeStatus] = useState(false);
  const [paymentformOpen, setpaymentformOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [enableChat, setenableChat] = useState(true);
  const [defaultChatOpen, setdefaultChatOpen] = useState(true);
  const [paymentChecked, setpaymentChecked] = useState(false);
  const [reportformOpen, setreportformOpen] = useState(false);
  const [feedbackStatus, setfeedbackStatus] = useState(false);
  const [buyerFeedbackStatus, setbuyerFeedback] = useState(false);
  const [sellerFeedbaackStatus, setsellerFeedback] = useState(false);
  const [myfeedbackStatus, setmyfeedbackStatus] = useState(false);
  const [sellerFeedbaackData, setsellerFeedbackData] = useState({});
  const [buyerFeedbaackData, setbuyerFeedbackData] = useState({});
  const [socketConnection, setSocketConnection] = useState(null);
  const [attachment, setattachment] = useState("");
  const [chatattachment, setchatattachment] = useState("");
  const [changefile, setchangefile] = useState("");
  const [chattingMsg, setChatting] = useState("");
  const [feedBackType, setfeedBackType] = useState("");
  const [feedBack, setfeedBack] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [myorderList, setmyorderList] = useState([]);
  const [selectedPaymentData, setselectedPaymentData] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [feedbackDetails, setfeedBackDetails] = useState({});
  const [files, selectFiles] = useFileUpload();
  const [loaderStatus, setloaderStatus] = useState(false);
  const [chatisLoading, setchatisLoading] = useState(false);
  const [formOpen, setformOpen] = useState(false);


  const [appealReasonData, setappealReasonData] = useState({
    buyerReason: [
      { "id": 1, "name": "I have made a payment but the seller has not released the crypto." },
      { "id": 2, "name": "I paid extra money to the seller." },
      { "id": 3, "name": "I suspected the seller is scamming." },
      { "id": 4, "name": "Others" },
    ],
    sellReason: [
      { "id": 1, "name": "I did not receive payment from the buyer." },
      { "id": 2, "name": "I received payment from the buyer but the amount is incorrect." },
      { "id": 3, "name": "I received payment but the payment info does not match the buyer's name." },
      { "id": 4, "name": "I suspected the buyer is scamming." },
      { "id": 5, "name": "Others" },
    ]
  })
  const [reportReasonData, setreportReasonData] = useState([
    { "id": 1, "name": "Trading order fraud or scam", },
    { "id": 1, "name": "Advertisement conditions unreasonable", },
    { "id": 1, "name": "Other reasons", }
  ])

  useEffect(() => {
    let socket = socketIOClient(Config.SOCKET_URL, { transports: ['websocket'] });
    let socketUnsubscribe;
    getp2pOrders();
    if (socket) {
      socket.on('connect', function () {
        setSocketConnection(socket);
        socketUnsubscribe = socket;
      });
      socket.on('connect_error', (err) => {
        console.log('socket connect_error', err)
      })
      socket.on('disconnect', function () {
        console.log('socket disconnected')
      });
    }
    return () => {
      if (socketUnsubscribe) {
        socketUnsubscribe.disconnect();
      }
    };
  }, [myProfile]);
  useEffect(() => {
    const LoggedIn = getCookie('userToken');
    setisLoggedIn(LoggedIn);
    if (LoggedIn) {
      getp2pOrders();
      getmyFeedback();
      getAppealHistory();
    } else {
      navigate("/login");
    }
  }, [myProfile, orderId]);
  const scrollToBottom = () => {
    const reftp = document.getElementById("scroller");
    reftp.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    if (socketConnection != null) {
      socketConnection.on('chattingResponse', function (data) {
        if (data.orderNo == orderId) {
          let chatHistory = chattingHistory;
          chatHistory.push(data.chattingHistory);
          setchattingHistory(chatHistory => [...chatHistory, data.chattingHistory]);
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      });
      socketConnection.on('orderResponse', function (data) {
        setUserProfile();
        getp2pOrders();
        setp2pOrdersList(data);
      });
      socketConnection.on('p2pappealResponse', function (data) {
        getAppealHistory();
        setappealHistory(data)
      });
    }
  }, [socketConnection]);

  async function getp2pOrders() {
    try {
      if(myProfile && myProfile._id) {
        const data = { orderNo: orderId }
        const params = {
          url: `${Config.V1_API_URL}p2p/getp2puserOrders`,
          method: 'POST',
          body: data
        }
        setisLoading(true);
        const response = (await makeRequest(params));
        setisLoading(false);
        if (response.status && response.data) {
          let ownerId = "";
          response.data.map((item) => {
            if(item.orderDetails) {
              getTimerUpdation(item.orderDetails);
              getChattingDetails(item.orderDetails);
              if(item.orderDetails[0]) {
                setverifyStep(item.orderDetails[0].verifyStep);
              }
            }
            if (item.paymentDetails.length > 0) {
              setp2pPaymentList(item.paymentDetails);
            } else {
              setp2pPaymentList([]);
            }
            if (item.orderDetails.length > 0) {
              setp2pOrdersList(item.orderDetails);
              item.orderDetails.map(async (data) => {
                if (data.feedbackDet.length > 0) {
                  data.feedbackDet.map((row) => {
                    if (row.fromUserId != myProfile._id) {
                      setbuyerFeedbackData(row);
                      setbuyerFeedback(true);
                    } else if (row.fromUserId == myProfile._id) {
                      setsellerFeedbackData(row);
                      setsellerFeedback(true);
                    }
                  })
                } else {
                  setbuyerFeedback(false);
                  setsellerFeedback(false);
                }
                if (data?.userId == myProfile._id) {
                  ownerId = data?.ownerId;
                } else {
                  ownerId = data?.userId;
                }
                await getmyOrderDetails(ownerId);
                setloaderStatus(true);
              })
            } else {
              console.log(4)
              setp2pOrdersList([]);
              setloaderStatus(true);
            }
            item.orderDetails.length > 0 && item.orderDetails[0].ownerPaymentDet &&
              item.orderDetails[0].ownerPaymentDet.length > 0 &&
              item.orderDetails[0].ownerPaymentDet.map((row, i) => {
                if (response.data[0].orderDetails[0].verifyStep == 1) {
                  if (i == 0) {
                    setselectedPaymentData(row);
                    setpaymentChecked(true);
                  }
                } else {
                  if (response.data[0].orderDetails[0].paymentId == row._id) {
                    setselectedPaymentData(row);
                    setpaymentChecked(true);
                  }
                }
              })
          });
        }
      }
    } catch (err) { }
  }
  const handleCancelChange = (event) => {
    setCancelReason(event.target.value);
  }
  async function getmyOrderDetails(userId) {
    try {
      let data = { advertiserNo: userId }
      const params = {
        url: `${Config.V1_API_URL}p2p/getmyOrderDetails`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setmyorderList(response?.data)
      }
    } catch (err) { }
  }
  async function getChattingDetails(chatData) {
    chatData.length > 0 && chatData.map((item) => {
      if (item.chattingHistory.length > 0) {
        setchattingHistory(item.chattingHistory);
      } else {
        setchattingHistory([]);
      }
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    })
  }
  async function getTimerUpdation(txnDetails) {
    let currentDate = new Date().getTime();
    // if (currentDate < 0 && endtime != currentDate) clearInterval(interval);
    txnDetails.length > 0 && txnDetails.map((item) => {
      currentDate = new Date(item.orderEndDate).getTime();
    });
    if (currentDate !== endtime) {
      setEndtime(currentDate);
    }
  }
  async function getAppealHistory() {
    try {
      const data = { orderNo: orderId }
      const params = {
        url: `${Config.V1_API_URL}p2p/getappealHistory`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setappealHistory(response.data);
      }
    } catch (err) { }
  }
  async function getmyFeedback() {
    try {
      const data = { orderNo: orderId }
      const params = {
        url: `${Config.V1_API_URL}p2p/getmyFeedBack`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setfeedBackDetails(response?.data);
        let text = "";
        response?.data.length > 0 && response?.data.map((item) => {
          if (item?.fromUserId == myProfile?._id) {
            if (item.feedBackStatus == 1) {
              text = "positive";
            } else {
              text = "negative";
            }
            setfeedBackType(text);
            setfeedBack(item.description);
            setmyfeedbackStatus(true);
          }
        })
      }
    } catch (err) { }
  }
  async function confirmformClose() {
    setconfirmformOpen(false);
    setacceptStatus(false);
  }
  async function confirmPayment() {
    try {
      setconfirmformOpen(true);
      let paymentId = "";
      if ((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].orderType == "sell")) {
        paymentId = p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentId;
      } else {
        paymentId = selectedPaymentData._id
      }
      const data = { orderNo: orderId, userId: myProfile?._id, paymentId: paymentId }
      const params = {
        url: `${Config.V1_API_URL}p2p/submitOrder`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      let type = 'error';
      if (response.status && response.data) {
        setconfirmformOpen(false)
        type = 'success';
        toast({ type, message: response.message });
        socketConnection.emit('createp2pOrder', response.data);
        getp2pOrders();
        if (response.data.length > 0) {
          response.data.map((item) => {
            setverifyStep(item.verifyStep);
          });
        }
      } else {
        toast({ type, message: response.message });
      }
    } catch (err) { console.log("err:", err) }
  }
  const formik = useFormik({
    initialValues: {
      reasonAppeal: '',
      description: '',
      phone: '',
      myfile1: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setisLoading1(true);
      if (values.myfile1 == "") {
        const data = {
          orderNo: orderId,
          userId: myProfile?._id,
          reasonAppeal: values.reasonAppeal,
          description: values.description,
          phone: values.phone,
          attachment: ""
        }
        const params = {
          url: `${Config.V1_API_URL}p2p/createAppeal`,
          method: 'POST',
          body: data
        }
        const result = (await makeRequest(params));
        let type = 'error';
        if (result.status) {
          type = 'success';
        }
        toast({ type, message: result.message });
        setappealformOpen(false);
        getp2pOrders();
        getAppealHistory();
        socketConnection.emit('createp2pAppeal', result?.data);
        setisLoading1(false);
      } else {
        setisLoading1(true);
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
        setisLoading1(false);
        if (response.status) {
          const data = {
            orderNo: orderId,
            userId: myProfile?._id,
            reasonAppeal: values.reasonAppeal,
            description: values.description,
            phone: values.phone,
            attachment: response.message[0].location
          }
          const params = {
            url: `${Config.V1_API_URL}p2p/createAppeal`,
            method: 'POST',
            body: data
          }
          const result = (await makeRequest(params));
          let type = 'error';
          if (result.status) {
            type = 'success';
          }
          toast({ type, message: result.message });
          setappealformOpen(false);
          getp2pOrders();
          getAppealHistory();
          socketConnection.emit('createp2pAppeal', result?.data);
          setisLoading1(false);
        }
      }
    },
  });
  async function selectPayment(data) {
    setselectedPaymentData(data);
  }
  // const formik1 = useFormik({
  //   initialValues: {
  //     OTPCode: '',
  //   },
  //   validationSchema: otpvalidationSchema,
  //   onSubmit: async (values) => {
  //     const data = { orderNo: orderId, userId: myProfile?._id, OTPCode: values.OTPCode }
  //     const params = {
  //       url: `${Config.V1_API_URL}p2p/submitOrder`,
  //       method: 'POST',
  //       body: data
  //     }
  //     const response = (await makeRequest(params));
  //     let type = 'error';
  //     if (response.status) {
  //       type = 'success';
  //       setpaymentformOpen(false);
  //       getp2pOrders();
  //       socketConnection.emit('createp2pOrder', response?.data);
  //     }
  //     toast({ type, message: response.message });
  //   }
  // });
  async function confirmOrderRelease() {
    try{
      const data = { orderNo: orderId }
      const params = {
        url: `${Config.V1_API_URL}p2p/orderReleased`,
        method: 'POST',
        body: data
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      setisLoading(false);
      let type = 'error';
      if (response.status) {
        type = 'success';
        setpaymentformOpen(false);
        getp2pOrders();
        socketConnection.emit('createp2pOrder', response?.data);
      }
      toast({ type, message: response.message });
    } catch (err) {
      console.log("err",err)
    }
  }
  async function Transfer() {
    setconfirmformOpen(true);
  }
  async function appealForm() {
    setappealformOpen(true)
  }
  async function handleClose() {
    setpaymentformOpen(false);
    setcancelformOpen(false);
    setconfirmformOpen(false);
  }
  const handleStatusChange = (event) => {
    if (acceptStatus == false) {
      setacceptStatus(true);
    } else {
      setacceptStatus(false);
    }
  }
  const handlefeedChange = (event) => {
    setfeedBack(event.target.value);
  }
  async function submitMessage() {
    try {
      let uploadFile = chatattachment;
      setchatisLoading(true);
      if (chattingMsg == "" && uploadFile == "") {
        return false;
      }
      if (uploadFile == "") {
        setenableChat(true);
        const data = {
          orderNo: orderId,
          userId: myProfile?._id,
          chattingMsg: chattingMsg,
          attachment: "",
        }
        const params = {
          url: `${Config.V1_API_URL}p2p/submitChatMessage`,
          method: 'POST',
          body: data
        }
        const result = (await makeRequest(params));
        setformOpen(false);
        setenableChat(true);
        setchatisLoading(false);
        setchatattachment("");
        getp2pOrders();
        setChatting("");
      } else {
        const formData = new FormData();
        let sizeFile = 1;
        let fileToUpload = uploadFile;
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
        //Start Load
        setchatisLoading(true);
        const response = (await makeRequest(params));
        setformOpen(false);
        setenableChat(true);
        setchatisLoading(false);
        if (response.status) {
          const data = {
            orderNo: orderId,
            userId: myProfile?._id,
            chattingMsg: chattingMsg,
            attachment: response.message[0].location
          }
          const reqData = {
            url: `${Config.V1_API_URL}p2p/submitChatMessage`,
            method: 'POST',
            body: data
          }
          const result = (await makeRequest(reqData));
          getp2pOrders();
          setChatting("");
          setchatattachment("")
        }
      }
    } catch (err) {
      console.log('coming-here2', err)
    }
  }
  const handleFileUpload = (event) => {
    if (event.target.name == 'myfile1') {
      const file = event.currentTarget.files[0];
      if (file != "") {
        const url = URL.createObjectURL(file);
        formik.values.myfile1 = file;
        formik.errors.myfile1 = "";
        setattachment(file);
        setchangefile(url);
        setenableChat(false);
      } else {
        formik.errors.myfile1 = "";
        setattachment("");
        setenableChat(true);
      }
    } else {
      const file = event.currentTarget.files[0];
      if (file != "") {
        const url = URL.createObjectURL(file);
        formik.values.myfile1 = file;
        formik.errors.myfile1 = "";
        setchangefile(url);
        setenableChat(false);
        setattachment(file);
      } else {
        setattachment("");
        formik.errors.myfile1 = "";
        setenableChat(true);
      }
    }
  };
  function handleChatChange(event) {
    const value = event.target.value;
    if (value != "") {
      setChatting(event.target.value);
      setenableChat(false);
    } else {
      setenableChat(true);
      setChatting("")
    }
  }
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      submitMessage('');
    }
  }
  async function feedbackChange() {
    if (feedbackStatus == true) {
      setfeedbackStatus(false);
    } else {
      setfeedbackStatus(true);
    }
  }
  async function FeedBack(feedBackType) {
    try {
      setisLoading(true);
      let userId = (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0]?.userId);
      let ownerId = (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0]?.ownerId);
      let toUserId = "";
      if (feedbackDetails?.toUserId == undefined) {
        if (ownerId == myProfile?._id) {
          toUserId = userId;
        } else {
          toUserId = ownerId;
        }
      } else {
        if ((feedbackDetails?.toUserId) == (myProfile && myProfile?._id)) {
          toUserId = feedbackDetails?.fromUserId;
        } else {
          toUserId = feedbackDetails?.toUserId;
        }
      }
      const data = {
        orderNo: orderId,
        toUserId: toUserId,
        type: feedBackType,
        description: feedBack
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/createFeedback`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      let type = 'error';
      if (response.status) {
        type = 'success'
      }
      toast({ type, message: response.message });
      setisLoading(false);
      setfeedbackStatus(false);
      getmyFeedback();
      getp2pOrders();
    } catch (err) { }
  }
  async function handleLoadClose() {
    setisLoading(false);
    setdefaultChatOpen(true);
  }
  async function copyToCode(textToCopy, type) {
    try {
      var input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = textToCopy;
      input.select();
      document.execCommand("Copy");
      input.remove();
      toast({ type: "success", message: type + " copied successfully!" });
    } catch (err) { }
  }
  async function cancelOrder() {
    try {
      const data = {
        orderNo: orderId,
        userId: myProfile?._id,
        reason: cancelReason,
        type: "cancelorder",
      }
      const params = {
        url: `${Config.V1_API_URL}p2p/cancelOrder`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      let type = 'error';
      if (response.status) {
        type = 'success';
      }
      toast({ type, message: response.message });
      setcancelformOpen(false);

      socketConnection.emit('createp2pOrder', response?.data);
    } catch (err) { }
  }
  const formikReport = useFormik({
    initialValues: {
      reason: '',
      description: '',
      email: '',
      myfile1: ''
    },
    validationSchema: reportvalidationSchema,
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
          orderNo: orderId,
          userId: myProfile?._id,
          advertiserNo: (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].userId),
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
        setUserProfile();
        setisLoading(false);
        toast({ type, message: result.message });
      }
    },
  });
  const renderer = ({ hours, minutes, seconds, completed }) => {
    let hoursData = hours > 0 ? ((hours > 9 ? hours : "0" + hours) + ":") : '';
    let date = hoursData + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
    if (completed != false && hours == 0 && minutes == 0 && seconds == 0) {
      setendtimeStatus(true);
    } else {
      setendtimeStatus(false);
    }
    if (completed) {
      return <span></span>
    } else {
      return <span className="endtime">{date}</span>;
    }
  };
  const renderer1 = ({ hours, minutes, seconds, completed }) => {
    let hoursData = hours > 0 ? ((hours > 9 ? hours : "0" + hours) + ":") : '';
    let date = hoursData + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
    if (completed != false && hours == 0 && minutes == 0 && seconds == 0) {
      setpaymentendtimeStatus(true);
    } else {
      setpaymentendtimeStatus(false);
    }
    if (completed) {
      return <span></span>
    } else {
      return <span className="endtime">{date}</span>;
    }
  };
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
          <div className="d-flex justify-content-center height-css mt-5 pt-5">
            <center>
              <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperclassName="" visible={true} />
            </center>
          </div>
        }
        {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0]?.ownerId == (myProfile && myProfile?._id))
          ||
          (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0]?.userId == (myProfile && myProfile?._id)) ?
          <div className="deposit-hero-section min-vh-100">
            <div className="container">
              {loaderStatus &&
                <div className="row ">
                  <div className="col-lg-8">
                    {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) != 2 &&
                      <span className="deposit-text-1">
                        {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].buyerUserId == myProfile?._id) ?
                          "Buy " + (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].fromCurrencyDet && p2pOrdersList[0]?.fromCurrencyDet?.currencySymbol) + " From "
                          :
                          "Sell " + (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].fromCurrencyDet && p2pOrdersList[0]?.fromCurrencyDet?.currencySymbol) + " To "
                        }
                        {(p2pOrdersList && p2pOrdersList[0] && (p2pOrdersList[0].ownerId != myProfile?._id ?
                          p2pOrdersList[0].ownerName : p2pOrdersList[0].username
                        ))
                        }
                      </span>
                    }
                    <div className="row align-items-center ">
                      <div className="col-lg-6 mt-4">
                        {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 1 &&
                          <p>Order Matched Successfully, Please Check Your Wallet</p>
                        }
                        {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 2 &&
                          <>
                            <h4>Order Cancelled</h4>
                            <p>You have Cancelled the order.</p>
                          </>
                        }
                        {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 3 &&
                          <>
                            <p>The Order is Created, Please wait for system confirmation
                              {verifyStep == 1 && endtimeStatus == false &&
                                <>
                                  <button className="btn-next btn ms-3">
                                    <Countdown date={endtime} renderer={renderer} className="endtime" />
                                  </button>
                                </>
                              }
                            </p>
                          </>
                        }
                      </div>
                      <div className="col-lg-6 text-lg-end">
                        <span>
                          <b>Order number : </b>{(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].orderNo)} <RiFileCopyFill onClick={() => copyToCode((p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].orderNo), "Order number")} /><br />
                          <b>Time Created : </b>{dateFormat(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].createdDate)}
                        </span>
                      </div>
                      <div className="col-lg-6">
                        <div className="row mt-4  ">
                          <div className="col-lg-4">
                            <p>Amount</p>
                            <b className="d-block">
                              {p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].toCurrencyDet && p2pOrdersList[0].toCurrencyDet.currencySymbolCode} {" "}
                              {((p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].qunatity) * (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].orderPrice))?.toFixed(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].toCurrencyDet && p2pOrdersList[0].toCurrencyDet.siteDecimal)}</b>
                          </div>
                          <div className="col-lg-4">
                            <p>Price</p>
                            <small className="d-block">
                              {p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].toCurrencyDet && p2pOrdersList[0].toCurrencyDet.currencySymbolCode}{" "}
                              {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].orderPrice)?.toFixed(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].toCurrencyDet && p2pOrdersList[0].toCurrencyDet.siteDecimal)}</small>
                          </div>
                          <div className="col-lg-4">
                            <p>Quantity</p>
                            <small className="d-block">
                              {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].qunatity)?.toFixed(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].toCurrencyDet && p2pOrdersList[0].fromCurrencyDet.siteDecimal)} {" "}
                              {p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].fromCurrencyDet && p2pOrdersList[0]?.fromCurrencyDet?.currencySymbol}
                            </small>
                          </div>
                        </div>
                      </div>
                      {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 1 &&
                        <span className="d-block my-2 order-released">
                          Order released{" "}
                        </span>
                      }

                      <div className="col-lg-12 mt-4 border-top pt-3 border-bottom border-dark pb-3">
                        {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0]?.status) == 2 &&
                          <>
                            <div>
                              <span className="deposit-text-1">Payment Method :</span><br />
                              <p>Payment method can't be displayed for this order.</p>
                            </div>
                          </>
                        }
                        {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.orderType == "sell") &&
                          (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 2) &&
                          (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 1)
                          ?
                          <><br />
                            <span className="col-lg-6 text-lg-end">
                              <b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0]?.paymentDet.methods && p2pPaymentList[0].paymentDet.methods?.paymenttype)}</b>
                            </span>
                            {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0]?.paymentDet.methods && p2pPaymentList[0].paymentDet.methods?.paymenttype == "UPI") &&
                              <>
                                <span className="d-block my-2">
                                  <b>Name : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName)}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName), "Name")} />
                                </span>
                                <span className="d-block my-2">
                                  <b>UPI ID : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.upiId)}{" "}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.upiId), "UPI ID")} />
                                </span>
                              </>
                            }
                            {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0]?.paymentDet.methods && p2pPaymentList[0].paymentDet.methods?.paymenttype == "Paytm") &&
                              <>
                                <span className="d-block my-2">
                                  <b>Name : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName)}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName), "Name")} />
                                </span>
                                <span className="d-block my-2">
                                  <b>Paytm ID : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountNo)}{" "}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountNo), "Paytm ID")} />
                                </span>
                              </>
                            }
                            {((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.paymentDet && p2pPaymentList[0]?.paymentDet?.methods && p2pPaymentList[0]?.paymentDet?.methods?.paymenttype == "Bank")
                              ||
                              (p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.paymentDet && p2pPaymentList[0]?.paymentDet?.methods && p2pPaymentList[0]?.paymentDet?.methods?.paymenttype == "IMPS")) &&
                              <>
                                <span className="d-block my-2">
                                  <b>Name : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName)}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName), "Name")} />
                                </span>
                                {/* <span className="d-block my-2">
                                    <b>Account Type : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountType)}{" "}
                                    <RiFileCopyFill onClick={()=>copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountType),"Account Type")}/>
                                  </span> */}
                                <span className="d-block my-2">
                                  <b>Account No : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountNo)}{" "}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountNo), "Account Number")} />
                                </span>
                                {/* <span className="d-block my-2">
                                    <b>Bank Name : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.bankName)}{" "}
                                    <RiFileCopyFill onClick={()=>copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.bankName),"Bank Name")}/>
                                  </span> */}
                                <span className="d-block my-2">
                                  <b>IFSC Code : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.ifscCode)}{" "}
                                  <RiFileCopyFill onClick={() => copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.ifscCode), "IFSC Code")} />
                                </span>
                                {/* <span className="d-block my-2">
                                    <b>Branch : </b>{(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.branch)}{" "}
                                    <RiFileCopyFill onClick={()=>copyToCode((p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.branch),"Branch")}/>
                                  </span> */}
                              </>
                            }
                            <div className="row">
                              <center>
                                <div className="col-12">
                                  <div className="alert alert-warning text-start" role="alert">
                                    <small>Notes: Make sure you will receive the Funds in the above Bank beneficiary name only.</small>
                                  </div>
                                </div>
                              </center>
                            </div>
                          </>
                          :
                          (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 2) &&
                          (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 1) &&
                          <>
                            <div className="row">
                              <div className="col-lg-2  border-end border-dark">
                                {p2pOrdersList && p2pOrdersList[0].verifyStep == 1 &&
                                  <span className="d-block my-2">
                                    {p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerPaymentDet && p2pOrdersList[0].ownerPaymentDet.length > 0 &&
                                      p2pOrdersList[0].ownerPaymentDet.map((data) => {
                                        return (
                                          <div className="form-check">
                                            <input className="form-check-input"
                                              type="radio" name="priceType"
                                              onClick={() => selectPayment(data)}
                                              value={data.paymenttype}
                                              checked={selectedPaymentData._id == data._id ? paymentChecked : false}
                                            />
                                            <label className="form-check-label" for="flexRadioDefault122">
                                              {data.paymenttype}
                                            </label>
                                          </div>
                                        )
                                      })
                                    }
                                  </span>
                                }
                                {p2pOrdersList && p2pOrdersList[0].verifyStep == 2 &&
                                  <span className="d-block my-2">
                                    <div className="form-check">
                                      <label className="form-check-label" for="flexRadioDefault122">
                                        <h4>{selectedPaymentData && selectedPaymentData.paymenttype} </h4>
                                      </label>
                                    </div>
                                  </span>
                                }
                              </div>
                              <div className="col-lg-4">
                                {p2pOrdersList && p2pOrdersList[0]?.verifyStep != 1 && 
                                  <>
                                    <span className="deposit-text-1">
                                      Payment Details:
                                    </span><br />
                                  </>
                                }
                                {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].status) != 2 &&
                                  <>
                                    {(selectedPaymentData && selectedPaymentData.paymenttype == "UPI") &&
                                      <>
                                        <span className="deposit-text-1">
                                          {selectedPaymentData && selectedPaymentData.paymenttype}
                                        </span>
                                        <span className="d-block my-2">
                                          <b>Name : </b>{(selectedPaymentData && selectedPaymentData.holderName)}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.holderName), "Name")} />
                                        </span>
                                        <span className="d-block my-2">
                                          <b>UPI ID : </b>{(selectedPaymentData && selectedPaymentData.upiId)}{" "}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.upiId), "UPI ID")} />
                                        </span>
                                      </>
                                    }
                                    {(selectedPaymentData && selectedPaymentData.paymenttype == "Paytm") &&
                                      <>
                                        <span className="deposit-text-1">
                                          {selectedPaymentData && selectedPaymentData.paymenttype}
                                        </span>
                                        <span className="d-block my-2">
                                          <b>Name : </b>{(selectedPaymentData && selectedPaymentData.holderName)}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.holderName), "Name")} />
                                        </span>
                                        <span className="d-block my-2">
                                          <b>Paytm ID : </b>{(selectedPaymentData && selectedPaymentData.accountNo)}{" "}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.accountNo), "Paytm ID")} />
                                        </span>
                                      </>
                                    }
                                    {((selectedPaymentData && selectedPaymentData.paymenttype == "Bank")
                                      ||
                                      (selectedPaymentData && selectedPaymentData.paymenttype == "IMPS")) &&
                                      <>
                                        <span className="deposit-text-1">
                                          {selectedPaymentData && selectedPaymentData.paymenttype}
                                        </span>
                                        <span className="d-block my-2">
                                          <b>Name : </b>{(selectedPaymentData && selectedPaymentData.holderName)}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.holderName), "Name")} />
                                        </span>
                                        <span className="d-block my-2">
                                          <b>Account No : </b>{(selectedPaymentData && selectedPaymentData.accountNo)}{" "}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.accountNo), "Account No")} />
                                        </span>
                                        <span className="d-block my-2">
                                          <b>IFSC Code : </b>{(selectedPaymentData && selectedPaymentData.ifscCode)}{" "}
                                          <RiFileCopyFill onClick={() => copyToCode((selectedPaymentData && selectedPaymentData.ifscCode), "IFSC Code")} />
                                        </span>
                                      </>
                                    }
                                  </>
                                }
                                <div className="row">
                                  <center>
                                    <div className="col-12">
                                      <div className="alert alert-warning text-start" role="alert">
                                        <small>Notes: Please Deposit the Funds in above Bank/UPI only.</small>
                                      </div>
                                    </div>
                                  </center>
                                </div>
                              </div>
                            </div>
                          </>
                        }
                      </div>

                      <div className="col-lg-12 mt-4">
                        <div className="d-flex">
                          {
                            myProfile?._id == (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].sellerUserId) &&
                            (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 2) &&
                            (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 1) &&
                            (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].verifyStep == 2) &&
                            <button className="btn-next btn my-3" type="button" onClick={() => setpaymentformOpen(true)}>
                              Payment received
                            </button>
                          }{" "}
                          {verifyStep == 2 && (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 2) &&
                            <>
                              {paymentendtimeStatus == true && (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) != 1 && appealHistory.length == 0 &&
                                <button className="btn-next btn my-3 ms-3" type="button" onClick={() => appealForm()}>
                                  {p2pOrdersList[0].buyerUserId == myProfile?._id ? 'Not Received' : 'Transaction issue'},i want to appeal
                                </button>
                              }
                              {paymentendtimeStatus == false &&
                                <button className="btn-next btn my-3 ms-3" disabled={paymentendtimeStatus == true ? false : true} type="button">
                                  {p2pOrdersList && p2pOrdersList[0].buyerUserId == myProfile?._id ? 'Not Received' : 'Transaction issue'}, Appeal after
                                  (<Countdown date={new Date(p2pOrdersList && p2pOrdersList[0].paymentEndDate)} renderer={renderer1} className="endtime" />)</button>
                              }
                            </>
                          }
                          {verifyStep == 1 &&
                            (myProfile?._id == (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].buyerUserId)) &&
                            (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 2) &&
                            <button className="btn-next btn my-3 ms-3" type="button" onClick={() => Transfer()}>
                              Transferred,notify seller
                            </button>
                          }
                          {myProfile?._id == (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].buyerUserId) &&
                            (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 2) &&
                            (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status != 1) &&
                            <button className="btn-next btn my-3 ms-3" type="button" onClick={() => setcancelformOpen(true)} disabled={isLoading}>
                              Cancel Order
                            </button>
                          }
                          {appealHistory && appealHistory.length > 0 &&
                            <button className="btn-next btn my-3 ms-3" type="button" onClick={() => navigate("/appeal-history/" + orderId)}>
                              Appeal History
                            </button>
                          }
                          {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0]?.status == 1) && myfeedbackStatus == false &&
                            <>
                              <button className="btn btn-success btn-sm-css ms-3 mt-3" type="button" onClick={() => setfeedBackType("positive")}>
                                <AiFillLike />Positive
                              </button>
                              <button className="btn btn-danger ms-3 btn-sm-css mt-3" type="button" onClick={() => setfeedBackType('negative')}>
                                <AiFillDislike />Negative
                              </button>
                            </>
                          }
                        </div>
                        {feedBackType != "" && myfeedbackStatus == false &&
                          <form>
                            <div className='row'>
                              <div className='col-12 mb-2 mt-2'>
                                <TextareaAutosize
                                  aria-label="empty textarea"
                                  placeholder="Description"
                                  name='feedBack'
                                  style={{ width: 500, height: 100 }}
                                  value={feedBack}
                                  onChange={handlefeedChange}
                                />
                              </div>
                              <div className='col-8'>
                                <div className='text-end'>
                                  <Button className="add-payment-method-confirm-button" type="button" onClick={() => FeedBack(feedBackType)}>Submit</Button>
                                </div>
                              </div>
                            </div>
                          </form>
                        }
                        {sellerFeedbaackStatus && sellerFeedbaackData?.fromUserId == myProfile?._id &&
                          <div className='row'>
                            <div className='col-6'>
                              <div className='color-white'>
                                <h6 className='color-default f-14'>My FeedBack:</h6>
                                {feedBack}  &nbsp; &nbsp;
                                {feedBackType == "positive" &&
                                  <AiFillLike className="color-green" />
                                }     &nbsp;
                                {feedBackType == "negative" &&
                                  <AiFillDislike className="color-red" />
                                } &nbsp;&nbsp;
                                <br /><br />
                              </div>
                            </div>
                            <div className='col-6'>
                              <Button className="add-payment-method-confirm-button" onClick={() => feedbackChange()}>Edit</Button>
                            </div>
                          </div>
                        }
                        {feedbackStatus &&
                          <form>
                            <div className='row'>
                              <div className='col-12 mb-2 mt-2'>
                                <Button className={feedBackType == "positive" ? "btn btn-success" : "b-rd-feedback b-positive mb-2 mt-2"} type="button" onClick={() => setfeedBackType("positive")}><AiFillLike className={feedBackType == "positive" ? "color-green" : "color-green"} />Positive</Button> &nbsp;
                                <Button className={feedBackType == "negative" ? "btn btn-danger ms-3" : "b-rd-feedback b-negative mb-2 mt-2"} type="button" onClick={() => setfeedBackType('negative')}><AiFillDislike className={feedBackType == "negative" ? "color-red" : "color-red"} />Negative</Button> &nbsp;&nbsp;
                                <br />
                                <TextareaAutosize
                                  aria-label="empty textarea"
                                  placeholder="Description"
                                  name='feedBack'
                                  style={{ width: 500, height: 100 }}
                                  value={feedBack}
                                  onChange={handlefeedChange}
                                />
                              </div>
                              <div className='col-8'>
                                <div className='text-end'>
                                  <Button className='text-btn-ui m-top-14' type="button" onClick={() => FeedBack(feedBackType)}>Submit</Button>
                                </div>
                              </div>
                            </div>
                          </form>
                        }
                        {sellerFeedbaackStatus && sellerFeedbaackData?.fromUserId != myProfile?._id &&
                          <div className='row'>
                            <h6 className='color-default f-14 mt-2'>{sellerFeedbaackData.fromUserId != (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerId) ? "Feed Back" : "Counterparty Feed Back:"}</h6>
                            <div className='col-6'>
                              {sellerFeedbaackData.feedBackStatus == 1 ?
                                <Button className="btn btn-success" disabled={true} type="button" onClick={() => setfeedBackType("positive")}><AiFillLike className="color-green" />Positive</Button>
                                :
                                <Button className="btn btn-danger ms-3" disabled={true} type="button" onClick={() => setfeedBackType('negative')}><AiFillDislike className="color-red" />Negative</Button>
                              }
                            </div>
                            {sellerFeedbaackData.description != "" &&
                              <div className='col-12 mt-3'>
                                <TextareaAutosize
                                  aria-label="empty textarea"
                                  placeholder="Description"
                                  name='feedBack'
                                  style={{ width: 500, height: 100 }}
                                  value={sellerFeedbaackData.description}
                                  disabled={true}
                                  onChange={handlefeedChange}
                                />
                              </div>
                            }
                          </div>
                        }
                        {buyerFeedbackStatus && (buyerFeedbaackData?.fromUserId != myProfile?._id) && (buyerFeedbaackData?._id != undefined) && (buyerFeedbaackData?._id != "undefined") &&
                          <div className='row'>
                            <h6 className='color-default f-14 mt-2'>{buyerFeedbaackData.fromUserId != (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerId) ? "Feed Back" : "Counterparty Feed Back:"}</h6>
                            <div className='col-6'>
                              {buyerFeedbaackData.feedBackStatus == 1 ?
                                <Button className="btn btn-success btn-sm" disabled={true} type="button" onClick={() => setfeedBackType("positive")}><AiFillLike className="color-green" />Positive</Button>
                                :
                                <Button className="btn btn-danger ms-3" disabled={true} type="button" onClick={() => setfeedBackType('negative')}><AiFillDislike className="color-red" />Negative</Button>
                              }
                            </div>
                            {buyerFeedbaackData.description != "" &&
                              <div className='col-12 mt-3'>
                                <TextareaAutosize
                                  aria-label="empty textarea"
                                  placeholder="Description"
                                  name='feedBack'
                                  style={{ width: 500, height: 100 }}
                                  value={buyerFeedbaackData.description}
                                  disabled={true}
                                  onChange={handlefeedChange}
                                />
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  <ChatBox
                    chattingHistory={chattingHistory}
                    p2pOrdersList={p2pOrdersList}
                    myProfile={myProfile}
                    myorderList={myorderList}
                    reportformOpen={reportformOpen}
                    chattingMsg={chattingMsg}
                    handleChatChange={handleChatChange}
                    handleKeyPress={handleKeyPress}
                    submitMessage={submitMessage}
                    enableChat={enableChat}
                    chatisLoading={chatisLoading}
                    setchatisLoading={setchatisLoading}
                    defaultChatOpen={defaultChatOpen}
                    setdefaultChatOpen={setdefaultChatOpen}
                    setenableChat={setenableChat}
                    setChatting={setChatting}
                    setreportformOpen={setreportformOpen}
                    setmyorderList={setmyorderList}
                    setp2pOrdersList={setp2pOrdersList}
                    setchattingHistory={setchattingHistory}
                    selectFiles={selectFiles}
                    files={files}
                    chatattachment={chatattachment}
                    setchatattachment={setchatattachment}
                    changefile={changefile}
                    setchangefile={setchangefile}
                    setformOpen = {setformOpen}
                    formOpen = {formOpen}
                  />
                </div>
              }
            </div>
          </div>
          :
          loaderStatus == true &&
          <center>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mt-5 pt-5">
                  <h1 className='my-5'></h1>
                  <p>Invalid order number</p>
                  <p>Page unavailable due to invalid order number.</p>
                </div>
              </div>
            </div>
          </center>
        }
      </div>

      {/* Transter notify seller */}
      <Modal show={confirmformOpen} onHide={() => setconfirmformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='color-white'>
            Please confirm that you have successfully transferred the money to seller through the following payment method before clicking on the "Transferred ,notify seller" button</p>
          <div className="modal-body">
            {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.orderType == "sell") ?
              <>
                {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.paymentDet &&
                  p2pPaymentList[0]?.paymentDet?.methods &&
                  (p2pPaymentList[0]?.paymentDet?.methods?.paymenttype == "Bank" || p2pPaymentList[0]?.paymentDet?.methods?.paymenttype == "IMPS")) &&
                  <div className='bg-gray p-2'>
                    <div className='d-flex my-3 justify-content-between'>
                      {/* <div>{item.paymenttype}</div> */}
                      {/* <div><FaEdit></FaEdit></div> */}
                    </div>
                    <p><b>Account holder name :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName)}</p>
                    <p><b>Account number :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountNo)}</p>
                    <p><b>IFSC code:</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.ifscCode)}</p>
                    {/* <p><b>Account type :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountType)}</p> */}
                    {/* <p><b>Bank name :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.bankName)}</p> */}
                    {/* <p><b>Account opening branch :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.branch)}</p> */}
                  </div>
                }
                {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.paymentDet &&
                  p2pPaymentList[0]?.paymentDet?.methods && p2pPaymentList[0]?.paymentDet?.methods?.paymenttype == 'UPI') &&
                  <div className='bg-gray mt-2 p-2'>
                    <div className='d-flex my-3 justify-content-between'>
                      {/* <div>{item.paymenttype}</div> */}
                      {/* <div><FaEdit></FaEdit></div> */}
                    </div>
                    <p><b>Name :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName)}</p>
                    <p><b>UPI ID :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.upiId)}</p>
                  </div>
                }
                {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0]?.paymentDet &&
                  p2pPaymentList[0]?.paymentDet?.methods && p2pPaymentList[0]?.paymentDet?.methods?.paymenttype == 'Paytm') &&
                  <div className='bg-gray mt-2 p-2'>
                    <div className='d-flex my-3 justify-content-between'>
                      {/* <div>{item.paymenttype}</div> */}
                      {/* <div><FaEdit></FaEdit></div> */}
                    </div>
                    <p><b>Name :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.holderName)}</p>
                    <p><b>Account :</b> {(p2pPaymentList && p2pPaymentList[0] && p2pPaymentList[0].paymentDet && p2pPaymentList[0].paymentDet.methods && p2pPaymentList[0].paymentDet.methods.accountNo)}</p>
                  </div>
                }
              </>
              :
              <>
                {((selectedPaymentData && selectedPaymentData.paymenttype == "Bank") || (selectedPaymentData && selectedPaymentData.paymenttype == "IMPS")) &&
                  <div className='bg-gray p-2'>
                    <div className='d-flex my-3 justify-content-between'>
                      <h4>{selectedPaymentData && selectedPaymentData.paymenttype}</h4>
                    </div>
                    <p><b>Account holder name :</b> {(selectedPaymentData && selectedPaymentData.holderName)}</p>
                    <p><b>Account number :</b> {(selectedPaymentData && selectedPaymentData.accountNo)}</p>
                    <p><b>IFSC code:</b> {(selectedPaymentData && selectedPaymentData.ifscCode)}</p>
                    {/* <p><b>Account type :</b> {(selectedPaymentData && selectedPaymentData.accountType)}</p> */}
                    {/* <p><b>Bank name :</b> {(selectedPaymentData && selectedPaymentData.bankName)}</p> */}
                    {/* <p><b>Account opening branch :</b> {(selectedPaymentData && selectedPaymentData.branch)}</p> */}
                  </div>
                }
                {(selectedPaymentData && selectedPaymentData.paymenttype == 'UPI') &&
                  <div className='bg-gray mt-2 p-2'>
                    <div className='d-flex my-3 justify-content-between'>
                      <h4>{selectedPaymentData && selectedPaymentData.paymenttype}</h4>
                    </div>
                    <p><b>Name :</b> {(selectedPaymentData && selectedPaymentData.holderName)}</p>
                    <p><b>UPI ID :</b> {(selectedPaymentData && selectedPaymentData.upiId)}</p>
                  </div>
                }
                {(selectedPaymentData && selectedPaymentData.paymenttype == 'Paytm') &&
                  <div className='bg-gray mt-2 p-2'>
                    <div className='d-flex my-3 justify-content-between'>
                      <h4>{selectedPaymentData && selectedPaymentData.paymenttype}</h4>
                    </div>
                    <p><b>Name :</b> {(selectedPaymentData && selectedPaymentData.holderName)}</p>
                    <p><b>Account :</b> {(selectedPaymentData && selectedPaymentData.accountNo)}</p>
                  </div>
                }
              </>
            }
            <div className="col-lg-12 mt-4">
              <span className="deposit-text-1">Tips</span>
              <ul>
                <li>
                  When you sell your cryptocurrency, the added payment method will be shown to the buyer during the transaction. To accept cash transfer, please make sure the information is correct
                </li>
              </ul>
            </div>
            <div className="col-lg-12 mt-4">
              <input className="form-check-input"
                type="checkbox"
                id="checkedKyc"
                name="checkedKyc"
                // checked={passData.checkedKyc}
                onChange={handleStatusChange}
              />
              <label className="form-check-label" for="flexCheckDefault">
                I have made payment from my real-name verified payment account consistent with my registered name on {Config.SITENAME}.
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => confirmformClose()}>Cancel</button>
            <button className="add-payment-method-confirm-button px-3" type="button" disabled={acceptStatus == true ? false : true} onClick={() => confirmPayment()}>Confirm Payment</button>
            {/* <button type="button" className="btn btn-next">Refresh</button> */}
          </div>
        </Modal.Body>
      </Modal>
      {/* payment received */}
      {/* <Modal show={paymentformOpen} onHide={() => setpaymentformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik1.handleSubmit}>
            <div className="row justify-content-center align-items-center ">
              <div className="row mt-4">
                <span className="phonenumber-change-text-2">
                  Enter 2FA Verification Code
                </span>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete='off'
                    label="Enter 2FA Code"
                    id="OTPCode"
                    name='OTPCode'
                    onChange={formik1.handleChange}
                    onBlur={formik1.handleBlur}
                    error={formik1.touched.OTPCode && Boolean(formik1.errors.OTPCode)}
                    helperText={formik1.touched.OTPCode && formik1.errors.OTPCode} />
                </div>
                {formik1.errors.OTPCode ? <span className="phonenumber-change-text-3 text-muted error"> {formik1.errors.OTPCode}</span> : null}
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col'>
                <div className="d-grid">
                  <button className="add-payment-method-confirm-button px-3" type="submit" >Confirm</button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal> */}
      {/* order released */}
      <Modal show={paymentformOpen} onHide={() => setpaymentformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to order released?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row  ">
            <div className='row mt-5'>
              <div className='col'>
                <button type="submit" className="btn text-white btn-col w-100 mt-4" disabled={isLoading} onClick={()=>confirmOrderRelease()}>
                    Confirm
                </button>
                <button type="button" className="btn text-white btn-col w-100 mt-4" onClick={() => setpaymentformOpen(false)}>
                    Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Cancel order */}
      <Modal show={cancelformOpen} onHide={() => setcancelformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className='bg-gray p-2'>
              <div className='d-flex my-3 justify-content-between'>
                <div className="col-lg-12 mt-4">
                  <span className="deposit-text-1">Tips</span>
                  <p>1. If you have already paid the seller, please do not cancel the order.</p>
                  <p>2. Your account will be SUSPENDED for the day if you exceed<span className="innertext"> 3 accountable cancellations </span>in a day.</p>
                </div>
              </div>
            </div>
            <p>Who do you want to cancel the order?</p>
            <div className="form-check">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleCancelChange}
                  value={cancelReason}
                >
                  <FormControlLabel className='color-white' value="I do not want to trade anyone" control={<Radio />} label='I do not want to trade anyone' />
                  <FormControlLabel className='color-white' value="I do not meet the requirements of the advertisers trading terms and condition" control={<Radio />} label='I do not meet the requirements of the advertisers trading terms and condition' />
                  <FormControlLabel className='color-white' value="Seller is asking for extra fee" control={<Radio />} label='Seller is asking for extra fee' />
                  <FormControlLabel className='color-white' value="Problem with sellers payment method result in unsuccessful payments" control={<Radio />} label='Problem with sellers payment method result in unsuccessful payments' />
                  <FormControlLabel className='color-white' value="Other reasons" control={<Radio />} label='Other reasons' />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setcancelformOpen(false)}>Cancel</button>
            <button className="add-payment-method-confirm-button" type="button" disabled={cancelReason != "" ? false : true} onClick={() => cancelOrder()}>Confirm</button>
            {/* <button type="button" className="btn btn-next">Refresh</button> */}
          </div>
        </Modal.Body>
      </Modal>
      {/* appeal reaason form*/}
      <Modal show={appealformOpen} onHide={() => setappealformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reason for Appeal(Mandatory)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className=" justify-content-center align-items-center ">
              <div>
                {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].buyerUserId) == (myProfile?._id) ?
                  <>
                    <span className="phonenumber-change-text-2">
                      Please Select Reason(Mandatory)
                    </span>
                    <Select fullWidth
                      id="reasonAppeal" className="color-white f-17"
                      name="reasonAppeal"
                      label="Select currency"
                      onChange={formik.handleChange}
                    >
                      {(appealReasonData.buyerReason) && (appealReasonData.buyerReason.length) > 0 &&
                        appealReasonData.buyerReason.map((data, index) => {
                          return (
                            <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                    {formik.errors.reasonAppeal ? <small className="invalid-reasonAppeal error">{formik.errors.reasonAppeal}</small> : null}
                  </>
                  :
                  <>
                    <Select fullWidth
                      id="reasonAppeal" className="color-white f-17"
                      name="reasonAppeal"
                      label="Select currency"
                      onChange={formik.handleChange}
                    >
                      {(appealReasonData.sellReason) && (appealReasonData.sellReason.length) > 0 &&
                        appealReasonData.sellReason.map((row, index) => {
                          return (
                            <MenuItem key={index} value={row.name}>{row.name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                    {formik.errors.reasonAppeal ? <small className="invalid-reasonAppeal error">{formik.errors.reasonAppeal}</small> : null}
                  </>
                }
              </div>
              <div className=" mt-4">
                <span className="phonenumber-change-text-2">
                  description
                </span>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete='off'
                    label="description"
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className=" mt-4">
                <span className="phonenumber-change-text-2">
                  phone(Mandatory)
                </span>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete='off'
                    label="phone"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.phone ? <small className="invalid-terms error">{formik.errors.phone}</small> : null}
              </div>
              <span className="phonenumber-change-text-2">
                Upload Proof(Mandatory)
              </span>
              <div>

                <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" /><br />
                <button className='payment-qrcode-optional-button mt-3' name="myfile1" type="button"
                  onClick={() =>
                    selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                      console.log("Files Selected", { name, size, source, file });
                      setattachment(file);
                      formik.values.myfile1 = file;
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
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setappealformOpen(false)}>Cancel</button>
                  <button className="add-payment-method-confirm-button mt-3 px-3" type="submit" disabled={isLoading1}>Appeal</button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Report form*/}
      <Modal show={reportformOpen} onHide={() => setreportformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formikReport.handleSubmit}>
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
                    onChange={formikReport.handleChange}
                  >
                    {reportReasonData.length > 0 && reportReasonData.map((data, index) => {
                      return (
                        <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                      )
                    })}
                  </Select>
                  {formikReport.errors.reason ? <small className="invalid-terms error">{formikReport.errors.reason}</small> : null}

                </>
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
                    onChange={formikReport.handleChange}
                    onBlur={formikReport.handleBlur}
                    error={formikReport.touched.email && Boolean(formikReport.errors.email)}
                    helperText={formikReport.touched.email && formikReport.errors.email}
                  />
                </div>
                {formikReport.errors.email ? <small className="invalid-terms error">{formikReport.errors.email}</small> : null}
              </div>
              <span className="phonenumber-change-text-2">
                Description
              </span>
              <div>
                <textarea 
                  // className="form-control"
                  placeholder="Please provide as much details as possible"
                  className='form-control description description-width-styling'
                  autoComplete='off'
                  id="description"
                  name='description'
                  onChange={formikReport.handleChange}
                  onBlur={formikReport.handleBlur}
                  error={formikReport.touched.description && Boolean(formikReport.errors.description)}
                  helperText={formikReport.touched.description && formikReport.errors.description}
                ></textarea>
              </div>
              {formikReport.errors.description ? <small className="invalid-UPIID error">{formikReport.errors.description}</small> : null}
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
                      formikReport.values.myfile1 = file;
                      formikReport.errors.myfile1 = "";
                    })
                  }
                >
                  <TbUpload />Upload
                </button>
              </div>
              {formikReport.errors.myfile1 ? <small className="invalid-UPIID error">{formikReport.errors.myfile1}</small> : null}
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
    </div>
  );
}
