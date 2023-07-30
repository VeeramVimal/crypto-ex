import React, { useEffect, useState } from "react";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config"
import $ from "jquery";
import Pagination from 'react-responsive-pagination';
import '../../pagination.css';
import { useContextData } from '../../core/context/index.js';
import { Bars } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { decimalValueFunc } from "../../core/helper/common";


const loanStatus = [
    { value: "", label: "All Status" },
    { value: 0, label: "Accuring Interest" },
    { value: 1, label: "Repaid" },
    { value: 2, label: "Auto Repaid" }
];
const repaidStatus = [
    { value: 0, label: "partially-repaid" },
    { value: 1, label: "repaid" }
];
const statusObj = {
    0: "warning",
    1: "success"
};
const statusTextColor = {
    0: "dark",
    1: "light"
}
export const listColumnObject = (options, value) => {
    const columnValue = options.filter((type) => type.value === value).map((orgs) => orgs.label).toString()
    return columnValue
}
const LoanHistory = (props) => {
    const { myProfile } = useContextData();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2);
    const [totalLoan, setTotalLoan] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loanHistory, setLoanHistory] = useState([]);
    const [repayShow, setRepayShow] = useState(false);
    const [repayData, setRepayData] = useState([]);
    const [percentBtnHide, setPercentBtnHide] = useState(false);
    const [hourInterest, setHourInterest] = useState("");
    // const [RepaiedHistory, setRepaiedHistory] = useState([]);
    const [loanHistoryShow, setLoanHistoryShow] = useState(false); //** show loan history state manage */
    const [repayDetails, setRepayDetails] = useState([]); //** repaid details state managed */
    const [buttonHide, setButtonHide] = useState(true);
    // const [loanStatusData, setLoanStatusData] = useState([]);
    const [loan_status, setLoan_status] = useState("");
    const [searchOrder, setSearchOrder] = useState("");
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [repay_data, setRepay_data] = useState({
        repay_amount: "",
        selectPercentAmt: "",
        remainingAmt: 0,
        due_status: "",
    });
    const [repay_data_err, setRepay_data_err] = useState({
        repay_amount_err: ""
    });

    //** get the loan history API integrate func*/
    const getLoanHistory = async () => {
        var userId = "";
        if (myProfile) {
            userId = myProfile?._id;
        }
        try {
            setLoaderStatus(false);
            const data = {
                userId: userId,
                startDate: startDate ? startDate : "",
                endDate: endDate ? endDate : "",
                loanStatus: loan_status ? loan_status : "",
                searchQuery: searchOrder ? searchOrder : ""
            };
            const params = {
                method: "POST",
                url: `${Config.CRYPTOLOAN_V1_API_URL}cryptoLoan/repaid/history`,
                body: data
            };
            const response = await makeRequest(params);

            if (response) {
                var loanData = response.data.loanHistory;
                setLoanHistory(response.data.loanHistory);
                setTotalLoan(response.data.total);
                if (loanData?.length > 0) setLoaderStatus(true);
                else if (loanData?.length == 0) setLoaderStatus(true);
                else setLoaderStatus(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // getLoanHistory(filterQuery);
     if(Config.CRYPTO_LOAN_STATUS == "Enable") getLoanHistory();
    }, [myProfile]);

    //** search filter functionality */
    const handleDateChange = async (dates) => {
        let searchQuery = ""
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const handleSearchFilter = async (event) => {
        await getLoanHistory();
    };
    //** select loan status filter functionalities */
    const handleStatusChange = async (event) => {
        setLoan_status(event.target.value);
    };

    //**  pagination functionalities */
    const noOfPages = Math.ceil(totalLoan / recordsPerPage);
    const clickPageNo = (pgNumber) => {
        pageChange(pgNumber);
    };
    const pageChange = (newCurrentPage) => {
        if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
            setCurrentPage(newCurrentPage);
            getPagination(newCurrentPage)
        }
    };
    const getPagination = async (page) => {
        var userId = "";
        if (myProfile) {
            userId = myProfile?._id;
        }
        try {
            setLoaderStatus(false);
            const data = {
                limit: recordsPerPage,
                offset: recordsPerPage * (page - 1),
                userId: userId,
                startDate: startDate ? startDate : "",
                endDate: endDate ? endDate : "",
                loanStatus: loan_status ? loan_status : "",
                searchQuery: searchOrder ? searchOrder : ""
            };
            const params = {
                method: "POST",
                url: `${Config.CRYPTOLOAN_V1_API_URL}cryptoLoan/repaid/history`,
                body: data,
            }
            const response = await makeRequest(params);
            if (response.data) {
                var loanData = response.data.loanHistory;
                setLoanHistory(response.data.loanHistory);
                setTotalLoan(response.data.total);
                if (loanData?.length > 0) setLoaderStatus(true);
                else if (loanData?.length == 0) setLoaderStatus(true);
                else setLoaderStatus(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //** enter the repay amt */
    const handleChangeRepay = (event) => {
        let USDTwalletAmt = repayData?.userWallet.amount;
        if (event.target.name == "repay_amount" || repay_data.repay_amount) {
            setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
        }
        // let remainAmt = parseFloat(Number((repayData.remainingPrinciple + hourInterest) - (event.target.value)).toFixed(8))
        let remAmount = (Number(repayData.remainingPrinciple) - (event.target.value));
        // let remainAmt = parseFloat(Number((repayData.remainingPrinciple) - (event.target.value)).toFixed(8))
        let remainAmt = parseFloat((remAmount < 0 ? 0 : remAmount).toFixed(8));
        setRepay_data((prevProp) => ({
            ...prevProp,
            ["repay_amount"]: event.target.value,
            ['remainingAmt']: remainAmt,
        }));
    };
    const blockInvalidChar = (event) => {
        return ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
    };


    //** validations func */
    const validationCheckErr = async () => {
        let isValid = true;
        let USDTwalletAmt = repayData?.userWallet.amount;
        let checkAmt = repayData.remainingPrinciple + hourInterest;
        let remindAmt = parseFloat(Number(checkAmt).toFixed(8)) || checkAmt;
        let min = ((repayData.remainingPrinciple) * (10 / 100));
        // parseFloat(Number(repayData.remainingPrinciple + hourInterest).toFixed(8))
        if (repay_data.repay_amount) {
            if (repay_data.repay_amount == "") {
                setButtonHide(true);
                setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "Repaid your loanable amount" }));
                isValid = false;
            }
            else if (USDTwalletAmt < repay_data.repay_amount) {
                setButtonHide(true);
                setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: `Your amount is ${parseFloat(Number(USDTwalletAmt).toFixed(8))}` }));
                isValid = false;
            }
            else if (remindAmt < repay_data.repay_amount) {
                setButtonHide(true);
                setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "Enter your loanable amount" }));
                isValid = false;
            }
            else if (min > repay_data.repay_amount) {
                setButtonHide(true);
                setRepay_data_err((prevErr) => ({
                    ...prevErr,
                    repay_amount_err: `Enter your minimum ${parseFloat(Number(min).toFixed(8))} loanable amount`
                }));
                isValid = false;
            } else {
                setButtonHide(false);
                setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
            };
        }
        else if (repay_data.remainingAmt) {
            setButtonHide(false);
            // if (repay_data.remainingAmt !== 0) {
            //     setButtonHide(true);
            //     setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "Enter your loanable amount" }));
            //     isValid = false;
            // } else {
            //     setButtonHide(false);
            //     setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
            // }
            // if (repay_data.remainingAmt == 0) {
            //     setButtonHide(false);
            //     setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
            // } 
        }
        else if (repay_data.selectPercentAmt) {
            setButtonHide(false);
            setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
        }
        else if (remindAmt == repay_data.repay_amount) {
            setButtonHide(false);
            setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
            // isValid = false;
        } else {
            setButtonHide(false);
            setRepay_data_err((prevErr) => ({ ...prevErr, repay_amount_err: "" }));
        };
        return isValid;
    };

    //** validation checked using render method*/
    useEffect(() => {
        if(Config.CRYPTO_LOAN_STATUS == "Enable"){
            if (repay_data.repay_amount) validationCheckErr();
        }
    }, [repay_data]);

    //** crypto-loan get single details in API integrate */
    const handleRepayDetails = async (loanData) => {
        setRepayShow(!repayShow);
        if (loanData) {
            try {
                const params = {
                    url: `${Config.CRYPTOLOAN_V1_API_URL}cryptoLoan/${loanData._id}`,
                    method: "GET"
                }
                const response = await makeRequest(params);
                if (response) {
                    setRepayData(response.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        var expireDate = new Date(loanData.expirationDate);
        var borrowDate = new Date(loanData.borrowDate);
        var RepaidDate = new Date(loanData.RepaidDate);
        var todayDate = new Date();
        var estimateOneHr = "", interst = ""
        // ${parseFloat(((row.borrowCoinDetails.sevenDaysFixedRate.annuallyRate) % 100) * 100).toFixed(8)}
        const days = parseInt((expireDate - todayDate) / (1000 * 60 * 60 * 24));
        var hours = parseInt(Math.abs(RepaidDate - todayDate) / 3600000);
        const minutes = parseInt(Math.abs(expireDate.getTime() - todayDate.getTime()) / (1000 * 60) % 60);
        // const seconds = parseInt(Math.abs(expireDate.getTime() - todayDate.getTime()) / (1000) % 60);
        interst = ((loanData.yearlyInterestRate) / 100) //** convert interest rate to percentage for ex: (3.2/100 = 0.032) */
        estimateOneHr = ((loanData.remainingPrinciple) * interst) / (365 * 24); //** convert the estimate one hour interest in repaid amount*/
        // var calc = (hours + 1) * parseFloat(loanData.hourlyInterestRate); //** convert the estimate one hour interest in repaid amount*/
        setHourInterest(estimateOneHr);
        if (days == 0) {
            // setPercentBtnHide(!percentBtnHide);
            setPercentBtnHide(true);
            await validationCheckErr();
        } else {
            setPercentBtnHide(false);
        }
    };

    //** loan repay amt based on percentage enter the amt */
    const handlePercentageClick = (event) => {
        let USDTwalletAmt = repayData?.userWallet.amount;
        switch (event.target.name) {
            case 'twentyFive':
                return (
                    repayData.remainingPrinciple ?
                        setRepay_data({
                            repay_amount: parseFloat(Number(((repayData.remainingPrinciple) * (25 / 100))).toFixed(8)),
                            // repay_amount: repayAmt(25),
                            remainingAmt: ((repayData.remainingPrinciple) - (repayData.remainingPrinciple * (25 / 100))),
                            selectPercentAmt: 25,
                            due_status: ""
                        }) : 0
                );
            case 'fifty':
                return (
                    repayData.remainingPrinciple ?
                        setRepay_data({
                            repay_amount: parseFloat(Number(((repayData.remainingPrinciple) * (50 / 100))).toFixed(8)),
                            remainingAmt: ((repayData.remainingPrinciple) - ((repayData.remainingPrinciple) * (50 / 100))),
                            selectPercentAmt: 50,
                            due_status: ""
                        }) : 0
                );
            case 'seventyFive':
                return (
                    repayData.remainingPrinciple ?
                        setRepay_data({
                            repay_amount: parseFloat(Number(((repayData.remainingPrinciple) * (75 / 100))).toFixed(8)),
                            remainingAmt: ((repayData.remainingPrinciple) - ((repayData.remainingPrinciple) * (75 / 100))),
                            selectPercentAmt: 75,
                            due_status: ""
                        }) : 0
                );
            case 'hundred':
                return (
                    repayData.remainingPrinciple ?
                        setRepay_data({
                            repay_amount: parseFloat(Number(repayData.remainingPrinciple).toFixed(8)),
                            remainingAmt: 0,
                            selectPercentAmt: 100,
                            due_status: "done"
                        }) : 0
                );
            default:
                break;
        }

    };
    const handleMaxClick = (event) => {
        if (repayData.remainingPrinciple) {
            setRepay_data({
                repay_amount: parseFloat(Number(repayData.remainingPrinciple).toFixed(8)),
                remainingAmt: 0,
                selectPercentAmt: 100,
                due_status: "done"
            });
        }
    };

    //** handle confirm repay functionality */
    const handleConfirmRepay = async (event) => {
        var hrIntrest = parseFloat(Number(hourInterest).toFixed(8))
        event.preventDefault();
        if (buttonHide) return true;
        setButtonHide(true);
        let calcPercentage = (repay_data.repay_amount / (repayData.remainingPrinciple)) * 100;
        const isValidation = await validationCheckErr();
        if (isValidation) {
            try {
                const payload = {
                    userId: repayData.userId,
                    loanOrderId: repayData._id,
                    repaymentAmount: repay_data.repay_amount,
                    due_detail: [{
                        due_percentage: parseInt(calcPercentage),
                        due_paid_amount: Number(repay_data.repay_amount) + hrIntrest,
                        due_date: new Date()
                    }],
                    expirationDate: repayData.expirationDate,
                    collateralAmount: repayData.collateralAmount,
                    due_status: (parseInt(calcPercentage) == 100) ? 1 : 0
                };
                const params = {
                    method: "POST",
                    url: `${Config.CRYPTOLOAN_V1_API_URL}cryptoLoan/repayment`,
                    data: payload
                };
                const response = await makeRequest(params);
                if (response.status == 'error') toast({ type: response.status, message: response.message })
                else {
                    toast({ type: "success", message: "Your crypto loan repayment is successfully" });
                    response.code == 200 && setRepayShow(!repayShow); setRepay_data({ repay_amount: "" }); await getLoanHistory();
                }
            } catch (error) {
                console.log(error);
                toast({ type: "error", message: "Something went wrong" });
            }
            setButtonHide(true);
        }
    };
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    const handleDebouncedSubmit = debounce(handleConfirmRepay, 1000)
    //** search the loan history details */
    const handleSearchChange = (e) => {
        setSearchOrder(e.target.value);
    };
    const handleSearchClick = async () => {
        await getLoanHistory();
    }
    //** collapse repaid history showing functionalities */
    function collapseLoanHistory(loanData) {
        if (loanData.loanRepaiedHistory?.length) {
            setRepayDetails(loanData.loanRepaiedHistory[0]);
        }
        // var x = document.getElementById("loanhistorycollapse");
        // if (x.style.display === "none") {
        //     x.style.display = "block";
        // } else {
        //     x.style.display = "none";
        // }
        setLoanHistoryShow(!loanHistoryShow);

    };

    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />

            <div className="p2p-trade-top-section">
                <section className="p2p-top-section">
                    <div className="container pt-2">
                        <div className="row g-4 col-lg-12  mx-auto">
                            <h1> Loan Orders </h1>
                        </div>
                    </div>
                </section>
                {/* search filter  */}
                <section className="p2p-second-section py-3">
                    <div className="container">
                        <div className="row col-lg-12 mx-auto ms-lg-3">
                            <div className="col-lg-3 col-11">
                                <span className="enter-amount-text-2">Order Number</span>
                                <div className="row enter-amount-section">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            name="searchprice"
                                            value={searchOrder}
                                            onChange={handleSearchChange}
                                            // autoComplete="off"
                                            placeholder="Enter Amount"
                                        />
                                    </div>
                                    <div className="col text-end">
                                        <button
                                            type="submit"
                                            onClick={handleSearchClick}
                                            className="btn"> Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6 ms-3">
                                <span className="enter-amount-text-2">Date</span>
                                <div className="row enter-amount-section ">
                                    <DatePicker
                                        className="border-0 form-control "
                                        inline={false}
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={handleDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="Select date range"
                                    // customInput={<DateIcon />}
                                    />
                                    {/* <span className="date-icon">
                                        <FaCalendarAlt />
                                    </span> */}
                                </div>
                            </div>
                            <div className="col-lg-2 col-6 ">
                                <span className="enter-amount-text-2 ms-1">Status</span>
                                <div className="f-group">
                                    <select
                                        className="f-control f-dropdown"
                                        placeholder="Select"
                                        name="loan_status"
                                        onChange={handleStatusChange}
                                        option={loanStatus}
                                    >
                                        {
                                            // loanHistory && loanHistory?.length > 0 ? (
                                            loanStatus.map((ele, index) => {
                                                return (
                                                    <>
                                                        {/* <option className="bg-selection" value="" disabled selected hidden>Select option...</option> */}
                                                        <option
                                                            className="bg-selection"
                                                            value={ele.value} >
                                                            {ele.label}
                                                        </option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-2 mt-4">
                                <div className="row f-group">
                                    <button
                                        className="f-control"
                                        type="submit"
                                        onClick={handleSearchFilter}> Search </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* loan history table list  */}
                <section className="container pt-3 loan-history-css-changes">
                    <div className="row col-lg-12 mx-auto">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active table-height table-head-sticky">
                                {
                                    !loaderStatus ? (
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
                                    ) : (loanHistory?.length == 0) && ""}
                                <table className="p2p-trade-table ">
                                    <tbody className="p2p-trade-table-tbody">

                                        {loaderStatus && loanHistory && (loanHistory?.length > 0) && loanHistory.map((loan) => {
                                            return (
                                                <>
                                                    <div className="trading-competion-section-1-box-loan-history mt-4">
                                                        <tr className="p2p-trade-table-tr ">
                                                            <td className="p2p-trade-table-td">
                                                                {/* top table content */}
                                                                <div className="container">
                                                                    <div className='row row-cols-lg-3 row-cols-1 g-4 justify-content-center align-items-center'>
                                                                        <div className='col text-start'>
                                                                            <p className='text-grey mb-0'>
                                                                                Order Id
                                                                            </p>
                                                                            <p className="">
                                                                                {loan._id}
                                                                            </p>
                                                                        </div>
                                                                        <div className='col text-start'>
                                                                            <p className='text-grey mb-0'>
                                                                                Date Borrowed
                                                                            </p>
                                                                            <p>
                                                                                {moment(loan.borrowDate).format("YYYY/MM/DD HH:mm:ss")}
                                                                            </p>
                                                                        </div>
                                                                        <div className='col text-start'>
                                                                            <div className="d-flex align-items-lg-center flex-lg-row flex-column justify-content-lg-between">
                                                                                <div>
                                                                                    <p className='text-grey mb-0'>
                                                                                        Expiration Time (Loan Term)
                                                                                    </p>
                                                                                    <p>
                                                                                        {moment(loan.expirationDate).format("YYYY/MM/DD HH:mm:ss")} ({loan.loanTermDays} Days)
                                                                                    </p>
                                                                                </div>
                                                                                <div>
                                                                                    <p className='mb-0'>
                                                                                        <Badge className='text-capitalize'
                                                                                            bg={statusObj[parseInt(loan.loanStatus)]}
                                                                                            text={statusTextColor[parseInt(loan.loanStatus)]}
                                                                                            pill>
                                                                                            {listColumnObject(loanStatus, loan.loanStatus)}
                                                                                        </Badge>
                                                                                        {/* Accuring Interest */}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="p2p-trade-table-tr border-top-0">
                                                            <td className="p2p-trade-table-td">
                                                                <div className="container">
                                                                    <div className="row row-cols-lg-3 row-cols-1 g-4 ">
                                                                        <div className='col text-start'>
                                                                            <p className="mb-0 ">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Coin Borrowed:
                                                                                    </p>
                                                                                    <p className="col table-data-1  color-green fw-bold">
                                                                                        {loan.borrowedCoin}
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                            <p className="mb-0 ">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Remaining Principle:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {(loan.remainingPrinciple == 0) ?
                                                                                            parseFloat(0).toFixed(8) :
                                                                                            `${parseFloat((loan.remainingPrinciple).toFixed(8))}`}
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Hourly Interest:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {/* {`${parseFloat((loan.hourlyInterestRate).toFixed(8))}`} */}
                                                                                        {
                                                                                            (loan.remainingPrinciple == 0) ?
                                                                                                `${parseFloat(0).toFixed(8)}` :
                                                                                                `${parseFloat((((loan.remainingPrinciple) * ((loan.yearlyInterestRate) / 100)) / (365 * 24)).toFixed(8))}`
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                        </div>
                                                                        <div className='col text-start'>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Total Debit:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {(loan.debtLoanableAmount == 0) ? parseFloat(0).toFixed(8) : `${parseFloat(Number(loan.debtLoanableAmount).toFixed(8))}`}

                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Residual Interest:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {(loan.yearlyInterestRate == 0) ? parseFloat(0).toFixed(8) : loan.yearlyInterestRate}

                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Accrued Interest Period:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        1 Hours
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                        </div>

                                                                        <div className='col  text-start'>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Collateral Coin:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {loan.collateralCoin}
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Collateral Account:
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {(loan.collateralAmount == 0) ? parseFloat(0).toFixed(8) : `${parseFloat(Number(loan.collateralAmount).toFixed(8))}`}
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                <div className="row  justify-content-between">
                                                                                    <p className="col text-grey">
                                                                                        Liquidation Price({loan.collateralCoin}/{loan.borrowedCoin}):
                                                                                    </p>
                                                                                    <p className="col table-data-5  color-green fw-bold">
                                                                                        {loan.liquidateLTV && `${parseFloat((loan.liquidateLTV).toFixed(8))}`}
                                                                                    </p>
                                                                                </div>
                                                                            </p>
                                                                        </div>
                                                                        <div className='col text-start '>
                                                                            <button
                                                                                type="submit"
                                                                                disabled={((loan.loanStatus == 1) || (loan.loanStatus == 2)) ? true : false}
                                                                                onClick={() => handleRepayDetails(loan)}
                                                                                className="btn banner-top-button-2-repay "> Repay
                                                                            </button>

                                                                            {/* <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                                                                                <button
                                                                                type="submit"
                                                                                //   onClick={() => search()}
                                                                                className="btn"> Renew</button>
                                                                            </div> */}

                                                                        </div>
                                                                        <div className="col text-start">
                                                                            <button
                                                                                id="loanhistorycollapsebutton"
                                                                                type="button"
                                                                                className="btn banner-top-button-2-repay "

                                                                                onClick={() => collapseLoanHistory(loan)}> Loan History

                                                                            </button>

                                                                        </div>
                                                                        <div className="col">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </div>
                                                    {/* ==============================collapse-start========================= */}
                                                    {
                                                        loanHistoryShow &&
                                                        repayDetails &&
                                                        (repayDetails._id === (loan.loanRepaiedHistory.length && loan.loanRepaiedHistory[0]._id)) && (
                                                            <div className="">
                                                                <div className="card border-0 card-body">
                                                                    <p className="text-center f-25"><RxDoubleArrowLeft className="f-22 mx-2" />Loan History<RxDoubleArrowRight className="f-22 mx-2" /></p>
                                                                    <tr className="p2p-trade-table-tr">
                                                                        <td className="p2p-trade-table-td">
                                                                            <div className="container">
                                                                                <div className="row row-cols-lg-3 row-cols-1 g-4 justify-content-center align-items-center">
                                                                                    <div className='col text-start '>
                                                                                        <p className='text-grey mb-0'>
                                                                                            Order Id
                                                                                        </p>
                                                                                        <p className="">
                                                                                            {`${repayDetails && repayDetails._id}`}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="col text-start">
                                                                                        <p className='text-grey mb-0'>
                                                                                            Repayment Amount
                                                                                        </p>
                                                                                        <p className="">
                                                                                            {repayDetails && `${parseFloat(Number(repayDetails.repaymentAmount).toFixed(8))}`}
                                                                                        </p>
                                                                                    </div>

                                                                                    <div className="col text-start">
                                                                                        <p className='text-grey mb-0'>
                                                                                            Due Status
                                                                                        </p>
                                                                                        <p className="">
                                                                                            <Badge
                                                                                                className='text-capitalize'
                                                                                                bg={statusObj[parseInt(repayDetails.due_status)]}
                                                                                                text={statusTextColor[parseInt(repayDetails.due_status)]}
                                                                                                pill>
                                                                                                {/* {repayDetails.due_status} */}
                                                                                                {listColumnObject(repaidStatus, repayDetails.due_status)}
                                                                                            </Badge>
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="p2p-trade-table-tr border-top-0">
                                                                        <td className="p2p-trade-table-td">
                                                                            <div className="container">
                                                                                {
                                                                                    repayDetails &&
                                                                                    repayDetails.due_detail.length &&
                                                                                    repayDetails.due_detail.map((loanData) => {
                                                                                        return (
                                                                                            <div className="row row-cols-lg-3 row-cols-1 g-4 justify-content-center align-items-center">
                                                                                                <div className='col text-start'>
                                                                                                    <div className="row  justify-content-between">
                                                                                                        <p className="col text-grey">
                                                                                                            Due Date:
                                                                                                        </p>
                                                                                                        <p className="col table-data-1  color-green fw-bold">
                                                                                                            {
                                                                                                                moment(loanData.due_date).format("YYYY/MM/DD hh:mm:ss")
                                                                                                            }
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='col text-start'>
                                                                                                    <div className="row  justify-content-between">
                                                                                                        <p className="col text-grey">
                                                                                                            Due Amount Paid:
                                                                                                        </p>
                                                                                                        <p className="col table-data-1  color-green fw-bold">
                                                                                                            {/* 34234234324 */}
                                                                                                            {loanData.due_paid_amount && `${parseFloat(Number(loanData.due_paid_amount).toFixed(8))}`}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col"></div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }


                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                </>
                                            )
                                        })}

                                        {loanHistory && loanHistory?.length == 0 && (
                                            <>
                                                <div className="trading-competion-section-1-box-loan-history mt-4">
                                                    <tr className="p2p-trade-table-tr ">
                                                        <td className="p2p-trade-table-td">
                                                            {/* top table content */}
                                                            <div className="container">
                                                                <div className='row row-cols-lg-3 row-cols-1 g-4 justify-content-center align-items-center'>
                                                                    <p className="norecordmargin">No Loan Orders..</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </div>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                                {
                                    (totalLoan > recordsPerPage) && (
                                        <div className="row">
                                            <div className="col-lg-12 d-flex justify-content-end">
                                                <Pagination className="p2p-trade-pagination"
                                                    total={Math.ceil(totalLoan / recordsPerPage)}
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
                </section>

                {/* repayment pop-up start */}
                <section>
                    <Modal
                        size="md"
                        centered
                        aria-labelledby="example-modal-sizes-title-lg"
                        show={repayShow}
                        onHide={() => { setRepayShow(!repayShow); setRepay_data({ repay_amount: "" }); setRepay_data_err({ repay_amount_err: "" }) }}>
                        <Modal.Header className='' closeButton>
                            <Modal.Title >Repay</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row mx-auto">
                                <div className='mt-3'>
                                    <p>Repayment Amount
                                        <ReactTooltip
                                            id="repay"
                                            place="top"
                                            className="tooltip-text-Theme text-left"
                                        />
                                        <span className='mx-1'>
                                            <HiQuestionMarkCircle
                                                className='text-grey '
                                                data-effect="solid"
                                                // data-place="right"
                                                data-multiline={true}
                                                data-tip={`Transfer from loan wallet to spot wallet for loan repayment`}
                                                data-for="repay"
                                            />
                                        </span>
                                    </p>
                                    <div className='crypto-loan-input-field'>
                                        <input
                                            type="number"
                                            min="0"
                                            // pattern="[0-9]*\.?[0-9]*"
                                            className="form-control form-control-bg-css p-0 border-0 outline: none"
                                            placeholder="Enter Amount"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            name='repay_amount'
                                            value={repay_data.repay_amount}
                                            onKeyDown={blockInvalidChar}
                                            onChange={handleChangeRepay}
                                        />
                                        {/* className="max-btn" */}
                                        <span
                                            className="color-red"
                                            data-bn-type="button"
                                            disabled={true}
                                            name="max"
                                            onClick={handleMaxClick}>MAX</span>
                                        {/* <span
                                            className="color-red"
                                            name="MAX"
                                            // type="submit"
                                            // disabled={percentBtnHide}
                                            onClick={handlePercentageClick}
                                        > MAX</span> */}
                                        {/* <div className='loan-line-bar'>|</div> */}
                                        <div className='d-flex flex-row align-items-center px-0 mx-0' name='collateral'>

                                            <div className='text-start mx-2'>
                                                <p className='mb-0'>
                                                    USDT
                                                </p>
                                            </div>
                                            {/* <MdArrowDropDown name='collateral' /> */}
                                        </div>
                                    </div>
                                    <div className="error">
                                        {repay_data_err.repay_amount_err}
                                    </div>
                                </div>
                            </div>
                            <div className="row col-lg-12 mx-auto">
                                <div className="col-lg-7 text-end mt-3">
                                    <div className='d-flex justify-content-between flex-column align-items-start mb-1 '>
                                        <span className="text-grey">Total Debt:</span>
                                        <span className="">{repayData.remainingPrinciple ?
                                            `${parseFloat(Number(repayData.remainingPrinciple + hourInterest).toFixed(8))} ${repayData.borrowedCoin}`
                                            : `0.00000000 ${repayData.borrowedCoin}`}</span>

                                    </div>
                                </div>
                                <div className="col-lg-5 mt-3">
                                    <div className='d-flex justify-content-between flex-column align-items-start mb-1'>
                                        {/* <p className="mb-0"> */}
                                        <span className="text-grey">
                                            Your free asset:
                                        </span>
                                        <span className="">
                                            {repayData.userWallet &&
                                                repayData?.userWallet.amount > 0 ?
                                                // `${parseFloat(Number(repayData?.userWallet.amount).toFixed(8))} ${repayData.borrowedCoin}` 
                                                `${decimalValueFunc(repayData?.userWallet.amount, 8, "removeZero")} ${repayData.borrowedCoin}` 
                                                : 0
                                            }
                                        </span>
                                        {/* </p> */}
                                    </div>
                                </div>
                            </div>
                            {/* percentage button */}
                            <div className="row col-lg-12 mx-auto">
                                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-end mb-1 mt-3'>
                                    <div className="col-3 f-group">
                                        <button
                                            className="f-control"
                                            name="twentyFive"
                                            type="submit"
                                            disabled={percentBtnHide}
                                            onClick={handlePercentageClick}
                                        > 25% </button>
                                    </div>
                                    <div className="col-3 f-group">
                                        <button
                                            className="f-control"
                                            name="fifty"
                                            type="submit"
                                            disabled={percentBtnHide}
                                            onClick={handlePercentageClick}

                                        > 50% </button>
                                    </div>
                                    <div className="col-3 f-group">
                                        <button
                                            className="f-control"
                                            name="seventyFive"
                                            type="submit"
                                            disabled={percentBtnHide}
                                            onClick={handlePercentageClick}
                                        > 75% </button>
                                    </div>
                                    <div className="col-3 f-group">
                                        <button
                                            className="f-control"
                                            name="hundred"
                                            type="submit"
                                            onClick={handlePercentageClick}
                                        > 100% </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mx-auto">
                                <div className='rate-list mt-4'>
                                    <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                                        <span className='text-grey '>
                                            Interest Repaid
                                        </span>
                                        <span className=''>
                                            {/* {hourInterest ? `${hourInterest} ${repayData.borrowedCoin}` : `0.00000000 ${repayData.borrowedCoin}`} */}
                                            {hourInterest ? `${parseFloat(Number(hourInterest).toFixed(8))} ${repayData.borrowedCoin}` : `0.00000000 ${repayData.borrowedCoin}`}

                                        </span>
                                    </div>
                                    <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1 mt-2'>
                                        <span className='text-grey '>
                                            Principal Repaid
                                        </span>
                                        <span className=''>
                                            {/* {repayData.remainingPrinciple ?
                                                `${parseFloat(Number(repayData.remainingPrinciple).toFixed(8))} ${repayData.borrowedCoin}` :
                                                `0.00000000 ${repayData.borrowedCoin}`} */}
                                            {repay_data.repay_amount ?
                                                `${parseFloat(Number(repay_data.repay_amount)).toFixed(8)} ${repayData.borrowedCoin}` :
                                                `0.00000000 ${repayData.borrowedCoin}`}

                                        </span>
                                    </div>

                                    <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1 mt-2'>
                                        <span className='text-grey '>
                                            Total Repayment
                                        </span>
                                        <span className=''>
                                            {/* {repayData.remainingPrinciple && hourInterest ?
                                                `${parseFloat(Number(repayData.remainingPrinciple + hourInterest).toFixed(8))}
                                                 ${repayData.borrowedCoin}` :
                                                `0.00000000 ${repayData.borrowedCoin}`} */}
                                            {repay_data.repay_amount && hourInterest ?
                                                `${parseFloat((Number(repay_data.repay_amount) + hourInterest)).toFixed(8)} ${repayData.borrowedCoin}` :
                                                `0.00000000 ${repayData.borrowedCoin}`}
                                        </span>
                                    </div>
                                    <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1 mt-2'>
                                        <span className='text-grey '>
                                            Principal Remaining
                                        </span>
                                        <span className=''>

                                            {(repay_data.remainingAmt) ?
                                                `${parseFloat(Number(repay_data.remainingAmt).toFixed(8))} ${repayData.borrowedCoin}` :
                                                `0.00000000 ${repayData.borrowedCoin}`}
                                        </span>
                                    </div>
                                    {/* <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1 mt-2'>
                                        <span className='text-grey '>
                                            LTV after Repayment
                                        </span>
                                        <span className=''>
                                            -
                                        </span>
                                    </div> */}
                                    {
                                        (repay_data.remainingAmt == 0) && (
                                            <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1 mt-2'>
                                                <span className='text-grey '>
                                                    Returned Collateral Amount
                                                </span>
                                                <span className=''>
                                                    {repayData.collateralAmount ?
                                                        `${parseFloat(Number(repayData.collateralAmount).toFixed(8))} ${repayData.collateralCoin}` :
                                                        `0.00000000`}
                                                </span>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <button
                                        className='btn  banner-top-button-login'
                                        onClick={handleDebouncedSubmit}
                                        disabled={buttonHide}
                                    >
                                        Confirm repayment
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </section>
            </div>
            <Footer />
        </div>
    )
};
export default LoanHistory;
