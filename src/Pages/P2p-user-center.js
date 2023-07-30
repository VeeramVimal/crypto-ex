import React, { useEffect, useState } from "react";
import '../assets/style.css';
import NavbarOne from './siteTheme/NavbarOne';
import Footer from './siteTheme/Footer';
import P2PHeader from './separate/P2PHeader';
import { getCookie, setCookie } from '../core/helper/cookie';
import { dateFormat, showEmail } from '../core/helper/date-format';
import { makeRequest } from "../core/services/v1/request";
import Config from "../core/config/";
import { toast } from "../core/lib/toastAlert";
import $ from "jquery";
import { isEmpty, pageAllowCheck } from "../core/helper/common";
import { FaCheckCircle } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import noResponsibile from '../assets/images/deposit/no-re.png';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Modal, Form } from "react-bootstrap";
import { useContextData } from '../core/context';
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Bars } from "react-loader-spinner";
import Payment from "./separate/Payment";

const currentDate = new Date();
const profilevalidationSchema = yup.object({
    username: yup
        .string('Please enter the username')
        .required('Username is required'),
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

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentPage = pathname; 

    const { myProfile, setUserProfile, p2pSettings } = useContextData();
    const [isLoggedIn, setisLoggedIn] = useState(null);
    const [allpaymentsList, setallpaymentsList] = useState([]);
    const [paymentDetails, setpaymentDetails] = useState([]);
    const [deleteRecords, setdeleteRecords] = useState({});
    const [myorderList, setmyorderList] = useState([]);
    const [deleteformOpen, setdeleteformOpen] = useState(false);
    const [nicknameformOpen, setnicknameformOpen] = useState(false);
    const [registeredDays, setregisteredDays] = useState(0);
    const [feedbackDet, setfeedbackDet] = useState([]);
    const [blockusersDetails, setblockusersDetails] = useState([]);
    const [feedBackType, setfeedBackType] = useState('all');
    const [estimatedValue, setEstimatedValue] = useState({});
    const [balShow, setBalShow] = useState(getCookie("userBalShow") ? getCookie("userBalShow") : false);
    const [enableAddStatus, setenableAddStatus] = useState(false);
    const [loaderStatus, setloaderStatus] = useState(false);

    useEffect(() => {
        const LoggedIn = getCookie('userToken');
        setisLoggedIn(LoggedIn);
        if (LoggedIn) {
            getPayment();
            getallPaymentsDet();
            getmyOrderList();
            myregisteredDays();
            getfeedBackDet();
            getblockUsersDet();
            getWalletCurrency();
        } else {
            navigate("/login");
        }
    }, [myProfile]);

    const initialValues = () => {
        return {
            username: myProfile && myProfile.username
        }
    }
    const balShowHideCall = () => {
        if (balShow) {
            setCookie('userBalShow', false);
            setBalShow(false);
        }
        else {
            setCookie('userBalShow', true);
            setBalShow(true);
        }
    }
    async function getWalletCurrency() {
        try {
            const params = {
                url: `${Config.V2_API_URL}wallet/getWalletCurrency`,
                method: 'GET'
            };
            const response = await makeRequest(params);
            if (response) {
                const {
                    status = false,
                    data = [],
                    estimatep2pINR = 0,
                    estimatep2pUSD = 0,
                } = response;
                setEstimatedValue({
                    estimatep2pINR,
                    estimatep2pUSD
                });
                setloaderStatus(true);
            } else {
                setloaderStatus(false);
            }
        } catch (err) { }
    }
    async function getPayment() {
        try {
            const data = { userId: myProfile?._id, }
            const params = {
                url: `${Config.V1_API_URL}p2p/getPayment`,
                method: 'POST',
                body: data
            }
            const response = (await makeRequest(params));
            if (response.status && response.data) {
                setloaderStatus(true);
                if (response.data.length > 0) {
                    let newEnableAddStatus = true;
                    response.data.map((data, i) => {
                        if (data.status == 0) {
                            newEnableAddStatus = false;
                        } else {
                            newEnableAddStatus = true;
                        }
                    })
                    setenableAddStatus(newEnableAddStatus);
                    setpaymentDetails(response.data);
                } else {
                    setenableAddStatus(true);
                }
            } else {
                setloaderStatus(false);
                setenableAddStatus(true);
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
                setallpaymentsList(response.data);
                setloaderStatus(true);
            }
        } catch (err) { }
    }
    async function selectpaymentType(methods) {
        if (myProfile) {
            const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
            if (pageAllowCheckResp.type == "error") {
                toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
                navigate(pageAllowCheckResp.navigate);
            }
            else {
                if (methods.name == 'Bank') {
                    const kycUserType = myProfile.country == "IND" ? myProfile.country : "International";
                    if (kycUserType == "International") {
                        toast({ type: "error", message: "This facility is currently un-available for your country." });
                        return false;
                    }
                }
                navigate("/payment/add/" + methods._id+"/?p2p-user-center");
            }
        }
    }
    async function deleteFrom(item) {
        try {
            setdeleteformOpen(true);
            setdeleteRecords(item)
        } catch (err) { }
    }
    async function deletePayment() {
        try {
            const params = {
                url: `${Config.V1_API_URL}p2p/deletePayemnt`,
                method: 'POST',
                body: deleteRecords
            }
            const response = (await makeRequest(params));
            let type = 'error';
            if (response.status) {
                type = 'success';
                getPayment();
                setUserProfile();
                setdeleteformOpen(false);
            }
            toast({ type, message: response.message });
        } catch (err) { }
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
                body: { userId: myProfile?._id }
            }
            const response = (await makeRequest(params));
            if (response.status) {
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
    async function enableDisableStatus(data) {
        try {
            const params = {
                url: `${Config.V1_API_URL}p2p/enableDisablP2PPayment`,
                method: 'POST',
                body: data
            }
            const result = (await makeRequest(params));
            let type = 'error';
            if (result.status) {
                type = 'success';
                setTimeout(() => {
                    getPayment()
                    setUserProfile();
                }, 300)
            }
            toast({ type, message: result.message });
        } catch (err) {
            console.log("err:", err)
        }
    }
    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />

            <div className="p2p-trade-top-section">
                {isLoggedIn && <P2PHeader />}
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
                        {/* =====================================P2P-USER-CENTER-START================================ */}
                        <section>
                            <div className="container-fluid col-11 border-bottom py-4">
                                <div className="row align-items-center g-4">
                                    <div className="col-lg-8">
                                        <div className="d-flex align-items-center" >
                                            <div className="my-auto">
                                                <span className="circles">
                                                    {(myProfile?.username) != "" ?
                                                        (myProfile?.username?.charAt(0))
                                                        : (myProfile?.email?.charAt(0))
                                                    }
                                                </span>
                                            </div>
                                            <span className="ps-2">{myProfile?.username}</span>&nbsp;
                                            {myProfile && myProfile.level ? (
                                                <>
                                                    {myProfile?.level == 1 ?
                                                        <span className="fc-g p-1 bg-light-red">Un-Verified User</span>
                                                        :
                                                        <span className="fc-g p-1 bg-light-green">Verified User</span>
                                                    }
                                                </>
                                            ) : (
                                                <span className="fc-g p-1 bg-light-red">Un-Verified User</span>
                                            )
                                            }
                                        </div>
                                        <div className="mt-2">
                                            <span className="password-text-33 fw-bold">Email</span>
                                            {isEmpty(myProfile && myProfile.email) == false ?
                                                <FaCheckCircle className="mx-2 fc-g" />
                                                :
                                                <FaCheckCircle className="mx-2 fc-g color-red" />
                                            }
                                            <span className="password-text-33 fw-bold">SMS</span>
                                            {myProfile && myProfile?.phoneno != "" ?
                                                <FaCheckCircle className="mx-2 fc-g" />
                                                :
                                                <FaCheckCircle className="mx-2 fc-g color-red" />
                                            }
                                            <span className="password-text-33 fw-bold">KYC</span>
                                            {myProfile && myProfile?.kycstatus == 1 ?
                                                <FaCheckCircle className="mx-2 fc-g" />
                                                :
                                                <FaCheckCircle className="mx-2 fc-g color-red" />
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-4 ">
                                        <div className="">
                                            <span className="password-text-44">P2P Estimated Value (INR)
                                                {balShow ? <AiFillEye
                                                    onClick={() => balShowHideCall()}
                                                /> : <AiFillEyeInvisible
                                                    onClick={() => balShowHideCall()}
                                                />}
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            {balShow ?
                                                <span className="">
                                                    <span className="password-text-77 fw-bold">{(estimatedValue?.estimatep2pINR)?.toFixed(2)} INR</span>
                                                    <span className="text-muted password-text-77 fw-bold">≈ ${(estimatedValue?.estimatep2pUSD)?.toFixed(2)}</span>
                                                </span>
                                                :
                                                <span>***Balance hidden***</span>
                                            }
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
                                                                    <button type="button"
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
                                <div className="row row-cols-2 row-cols-lg-4">
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">30d Trades</span>
                                        <p className="py-2"><span className="password-text-44 ">{isNaN(myorderList?.monthtradeCounts) == true ? 0 : myorderList?.monthtradeCounts}</span><span className="password-text-33 fw-bold mx-1">Time(s)</span></p>
                                    </div>
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">30d Completion Rate</span>
                                        <p className="py-2"><span className="password-text-44">{isNaN(myorderList?.completionRate) == true ? 0 : myorderList?.completionRate}</span><span className="password-text-33 mx-1">%</span></p>
                                    </div>
                                    {/* <div className="col">
                                    <span className="password-text-44 fw-bold">Avg.Release Time</span>
                                    <p className="py-2"><span className="password-text-44">0</span><span className="password-text-33 mx-1">Minute(s)</span></p>
                                </div>
                                <div className="col">
                                    <span className="password-text-44 fw-bold">Avg.Pay Time</span>
                                    <p className="py-2"><span className="password-text-44">0</span><span className="password-text-33 mx-1">Minute(s)</span></p>
                                </div> */}
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">Positive Feedback</span>
                                        <p className="py-2">
                                            <span className="password-text-44">{isNaN(feedbackDet?.positivefeedback) == true ? 0 : (feedbackDet && feedbackDet?.positivefeedback)?.toFixed(2)}</span>
                                            <span className="password-text-33 mx-1">% ({isNaN(feedbackDet?.totalfeedbackCount) == true ? 0 : (feedbackDet && feedbackDet?.totalfeedbackCount)})</span>
                                        </p>
                                    </div>
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">Positive</span>
                                        <p className="py-2"><span className="password-text-44">{isNaN(feedbackDet?.positiveCount) == true ? 0 : (feedbackDet && feedbackDet?.positiveCount)}</span></p>
                                    </div>
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">Negative</span>
                                        <p className="py-2"><span className="password-text-44">{isNaN(feedbackDet?.negativeCount) == true ? 0 : (feedbackDet && feedbackDet?.negativeCount)}</span></p>
                                    </div>
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">Registered</span>
                                        <p className="py-2"><span className="password-text-44">{isNaN(registeredDays) == true ? 0 : registeredDays}</span><span className="password-text-33 mx-1">Day(s)</span></p>
                                    </div>
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">First Trade</span>
                                        <p className="py-2"><span className="password-text-44">{isNaN(myorderList?.firstTradeDate) == true ? 0 : myorderList?.firstTradeDate}</span><span className="password-text-33 mx-1">Day(s)</span></p>
                                    </div>
                                    <div className="col">
                                        <span className="password-text-44 fw-bold">All Trades</span>
                                        <p className="py-2"><span className="password-text-44">{isNaN(myorderList?.totaltradesCounts) == true ? 0 : myorderList.totaltradesCounts}</span><span className="password-text-33 mx-1">Time(s)</span>
                                            <p className="text-muted f-12">(Buy {isNaN(myorderList?.totalbuyCounts) == true ? 0 : myorderList?.totalbuyCounts} | Sell {isNaN(myorderList?.totalsellCounts) == true ? 0 : myorderList?.totalsellCounts})</p>
                                        </p>
                                    </div>
                                    {/* <div className="col">
                                    <span className="text-muted fs-14">Approx. 30d Volume</span>
                                    <p className="py-2"><span className="password-text-44">{0}</span><span className="password-text-33 mx-1">BTC</span></p>
                                </div>
                                <div className="col">
                                    <span className="text-muted fs-14">Approx. Total Volume</span>
                                    <p className="py-2"><span className="password-text-44">{0}</span><span className="password-text-33 mx-1">BTC</span>
                                        <p className="text-muted f-12">(Buy 0 | Sell 0)</p>
                                    </p>
                                </div> */}
                                </div>
                            </div>
                        </section>

                        {/* ========================================SCROLLSPY-STARTS==================================*/}
                        <section className="p2puser-center-scrollspy-styling py-5">
                            <div className="container-fluid col-11 py-4">

                                <div className="d-flex p2puser-center-scrollsp-border">
                                    <button className="p2puser-center-scrollspy-button password-text-66" id="nav-p2p-tab" type="button" >

                                        P2P Payment Methods

                                    </button>
                                    <button className="p2puser-center-scrollspy-button password-text-66" id="nav-feedback-tab" type="button" >
                                        <a href="#scrollspy-section-2-para">
                                            {"Feedback(" + (feedbackDet && feedbackDet?.totalfeedbackCount) + ")"}

                                        </a>
                                    </button>
                                    <button className="p2puser-center-scrollspy-button password-text-66" id="nav-blocked-tab" type="button">
                                        <a href="#scrollspy-section-3-para">
                                            Blocked Users
                                        </a>
                                    </button>
                                </div>

                                <div className="container-fluid py-5 bg-container-color" >
                                    <Payment
                                        paymentDetails={paymentDetails}
                                        p2pSettings={p2pSettings}
                                        enableAddStatus={enableAddStatus}
                                        myProfile={myProfile}
                                        allpaymentsList={allpaymentsList}
                                        selectpaymentType={selectpaymentType}
                                        enableDisableStatus={enableDisableStatus}
                                        currentPage={currentPage}
                                    />
                                    <div id="scrollspy-section-2-para" className="row">
                                        <div className="col py-3">
                                            <div className="row p2p-user-center-scrollspy-tops-heading ">
                                                <p>Feedback</p>
                                            </div>
                                            <div className="d-flex">
                                                <div className=" align-items-center">
                                                    <span className=""><b>{isNaN(feedbackDet?.positivefeedback) == true ? 0 : feedbackDet?.positivefeedback} %</b></span>
                                                    <h6 className="mt-1">{isNaN(feedbackDet?.totalfeedbackCount) == true ? 0 : feedbackDet?.totalfeedbackCount} Reviews</h6>
                                                </div>
                                            </div>

                                            <nav className="p2p-user-center-nav-tabs-styling">
                                                <div className="nav nav-tabs " id="nav-tab" role="tablist">
                                                    <button className={feedBackType == "all" ? "nav-link  active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => selectfeedBackType('all')}>All</button>
                                                    <button className={feedBackType == "positive" ? "nav-link active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="false" onClick={() => selectfeedBackType('positive')}>Positive({feedbackDet?.positiveCount})</button>
                                                    <button className={feedBackType == "negative" ? "nav-link active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="false" onClick={() => selectfeedBackType('negative')}>Negative({feedbackDet?.negativeCount})</button>
                                                </div>
                                            </nav>
                                            <div className="tab-content pt-4" id="nav-tabContent">
                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                    {feedBackType == "all" ?
                                                        <>
                                                            {feedbackDet && feedbackDet.totalfeedback && feedbackDet.totalfeedback.length > 0 ?
                                                                feedbackDet.totalfeedback.map((data) => {
                                                                    return (
                                                                        <>
                                                                            <div className="row mb-4">
                                                                                <div className="col-lg-4">
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
                                                                                <div className="col-lg-8 text-start">
                                                                                    {data?.feedBackStatus == 1 ?
                                                                                        <div className="col-lg-9 text-start">
                                                                                            <span className=" fc-g "><AiFillLike /></span>
                                                                                            <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                                                                        </div>
                                                                                        :
                                                                                        <div className="col-lg-9 text-start">
                                                                                            <span className=" fc-g "><AiFillDislike className="color-red" /></span>
                                                                                            <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                                :
                                                                <div className="col">
                                                                    <div className="text-center py-5">
                                                                        <img src={noResponsibile} className="noresponse-image-styling"></img>
                                                                        <p className="scrollspy-tops-heading-paragraph mt-3">No Feedback</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </>
                                                        :
                                                        feedBackType == "positive" ?
                                                            <>
                                                                {feedbackDet && feedbackDet.postive && feedbackDet.postive.length > 0 ?
                                                                    feedbackDet.postive.map((data) => {
                                                                        return (
                                                                            <>
                                                                                <div className="row">
                                                                                    <div className="col-lg-4">
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
                                                                                    <div className="col-lg-8 text-start">
                                                                                        {data?.feedBackStatus == 1 ?
                                                                                            <div className="col-lg-9 text-start">
                                                                                                <span className=" fc-g "><AiFillLike /></span>
                                                                                                <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                                                                            </div>
                                                                                            :
                                                                                            <div className="col-lg-9 text-start">
                                                                                                <span className=" fc-g "><AiFillDislike className="color-red" /></span>
                                                                                                <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>

                                                                            </>
                                                                        )
                                                                    })
                                                                    :
                                                                    <div className="col">
                                                                        <div className="text-center py-5">
                                                                            <img src={noResponsibile} className="noresponse-image-styling"></img>
                                                                            <p className="scrollspy-tops-heading-paragraph mt-3">No Feedback</p>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </>
                                                            :
                                                            feedbackDet && feedbackDet.negative && feedbackDet.negative.length > 0 ?
                                                                feedbackDet.negative.map((data) => {
                                                                    return (
                                                                        <>
                                                                            <div className="row">
                                                                                <div className="col-lg-4">
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
                                                                                <div className="col-lg-8 text-start">
                                                                                    {data?.feedBackStatus == 1 ?
                                                                                        <div className="col-lg-9 text-start">
                                                                                            <span className=" fc-g "><AiFillLike /></span>
                                                                                            <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                                                                        </div>
                                                                                        :
                                                                                        <div className="col-lg-9 text-start">
                                                                                            <span className=" fc-g "><AiFillDislike className="color-red" /></span>
                                                                                            <span className="text-muted mx-2 scrollspy-tops-heading-paragraph">{data?.description != "" ? data?.description : "No feedback"}</span>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                                :
                                                                <div className="col">
                                                                    <div className="text-center py-5">
                                                                        <img src={noResponsibile} className="noresponse-image-styling"></img>
                                                                        <p className="scrollspy-tops-heading-paragraph mt-3">No Feedback</p>
                                                                    </div>
                                                                </div>
                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div id="scrollspy-section-3-para" className="row">
                                        <div className="col py-3">
                                            <div className="row p2p-user-center-scrollspy-tops-heading ">
                                                <p>Blocked Users</p>
                                            </div>
                                            <div className="row row-cols-1 p2p-user-center-blocked-user-table ">

                                                {/* =========================When there is blocked user-start=========================== */}

                                                <div className="col">
                                                    <table >
                                                        <thead className="bg-container-color">
                                                            <tr>
                                                                <th scope="col" className="text-muted f-12">Counterparty</th>
                                                                <th scope="col" className="text-muted f-12">Reason</th>
                                                                <th scope="col" className="text-muted f-12">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {blockusersDetails && blockusersDetails.length > 0 ?
                                                                blockusersDetails.map((row, i) => {
                                                                    if (row?.status == 1) {
                                                                        return (
                                                                            <>
                                                                                <tr>
                                                                                    <td data-label="Counterparty">
                                                                                        <div className="d-flex counterparty-text-styling">
                                                                                            <div className="my-auto">
                                                                                                <span className="circles">
                                                                                                    {(row?.username) != "" ?
                                                                                                        (row?.username?.charAt(0))
                                                                                                        : (row?.email?.charAt(0))
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                            <span className="ps-2">{(row?.username) != "" ? (row?.username) : showEmail(row?.email)}</span>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td data-label="Reason">{(row?.reason)}</td>
                                                                                    <td data-label="Action" onClick={() => blockUnblock(row)} >
                                                                                        <p className="order-p2p-reset-content-title curPointer">{row.status == 1 ? 'unblock' : 'block'}</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <tr>
                                                                                <td></td>
                                                                                <td>
                                                                                    <div className="col">
                                                                                        <div className="text-center py-5">
                                                                                            <img src={noResponsibile} className="noresponse-image-styling"></img>
                                                                                            <p className="scrollspy-tops-heading-paragraph mt-3">No Blocked Users</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td></td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })
                                                                :
                                                                <tr>
                                                                    <td></td>
                                                                    <td>
                                                                        <div className="col">
                                                                            <div className="text-center py-5">
                                                                                <img src={noResponsibile} className="noresponse-image-styling"></img>
                                                                                <p className="scrollspy-tops-heading-paragraph mt-3">No Blocked Users</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td></td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {/* =========================When there is blocked user-end=========================== */}

                                                {/* =========================When there is NO-blocked user-start=========================== */}



                                                {/* =========================When there is blocked user-end=========================== */}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Modal show={deleteformOpen} onHide={() => setdeleteformOpen(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want to delete this payment method?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row  ">
                                            <div className='row mt-5'>
                                                <div className='col'>
                                                    <button type="button" className="btn text-white btn-col w-100 mt-4" onClick={() => deletePayment()}>
                                                        Confirm
                                                    </button>
                                                    <button type="button" className="btn text-white btn-col w-100 mt-4" onClick={() => setdeleteformOpen(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </section>
                    </>
                }
                {/* ========================================SCROLLSPY-ENDS====================================*/}

                {/* =====================================P2P-USER-CENTER-END==================================*/}


            </div >
            <Footer />
        </div >
    );
}
