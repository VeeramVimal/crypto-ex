import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Swal from "sweetalert2";
import { ToastContainer } from 'react-toastify';
import '../../assets/styles/ido-style.css';
import { toast } from '../../../../core/lib/toastAlert';
import Config from '../../../../core/config/index';
import moment from "moment/moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeRequest } from "../../../../core/services/v1/request";
// import "../../../../assets/ido-style.css";

function Home() {
    const { state } = useLocation();
    const [userData, setUserData] = useState([]);
    const [endDate, setEndDate] = useState(new Date());
    const [tokenData, setTokenData] = useState({
        token_supply: "",
        initial_supply: "",
        token_price: "",
        start_date: new Date(),
        end_date: new Date(),
        hard_cap_value: "",
        soft_cap_value: "",
        contact_address: ""
    });
    const [validateDataErr, setValidateDataErr] = useState({
        token_supply_err: "",
        initial_supply_err: "",
        token_price_err: "",
        start_date_err: "",
        end_date_err: "",
        hard_cap_value_err: "",
        soft_cap_value_err: "",
        contact_address_err: ""
    });
    const { handleChange, handleSubmit, handleBlur, touched, errors, values, resetForm } = useFormik({
        initialValues: {
            token_supply: "",
            initial_supply: "",
            token_price: "",
            start_date: new Date(),
            end_date: new Date(),
            hard_cap_value: "",
            soft_cap_value: "",
            contact_address: ""
        },
        //** form validation functions */
        validationSchema: Yup.object().shape({
            token_supply: Yup.string().required("Token supply is required!"),
            initial_supply: Yup.string().required("Initial supply is required!"),
            token_price: Yup.string().required("Total price is required!"),
            hard_cap_value: Yup.string().required("Hard cap field is required!"),
            soft_cap_value: Yup.string().required("Soft cap field is required!"),
            contact_address: Yup.string().required("Contact address field is required!")
        }),
        //** submit functionality */
        onSubmit: async (values) => {
            try {
                const payload = {
                    userName: state.data.userName,
                    email: state.data.email,
                    projectName: state.data.projectName,
                    projectInfo: state.data.projectInfo,
                    blockChainSelect: state.data.blockChainSelect,
                    tokenName: state.data.tokenName,
                    userTeam: state.data.userTeam,
                    investors: state.data.investors,
                    smartContractAudited: state.data.smartContractAudited,
                    paper_link: state.data.paper_link,
                    websiteLink: state.data.websiteLink,
                    gitLink: state.data.gitLink,
                    telegramGrpLink: state.data.telegramGrpLink,
                    telegramUserName: state.data.telegramUserName,
                    twitterLink: state.data.twitterLink,
                    token_supply: values.token_supply,
                    initial_supply: values.initial_supply,
                    token_price: values.token_price,
                    start_date: moment(start_date).format('YYYY-MM-DDTHH:mm:ss'),
                    end_date: moment(end_date).format('YYYY-MM-DDTHH:mm:ss'),
                    hard_cap_value: values.hard_cap_value,
                    soft_cap_value: values.soft_cap_value,
                    contact_address: values.contact_address
                };
                const params = {
                    method: 'POST',
                    url: `${Config.V1_API_URL}ido-form/create`,
                    data: payload
                }
                const response = await makeRequest(params);
                const { data, code, errorMessage, error, success } = response;
                if (success == true) {
                    resetForm();
                    toast({ type: "success", message: "Thanks For Joining our Community!!" });
                } else {
                    toast({ type: "error", message: errorMessage ? errorMessage : "Something went wrong" });
                }
            } catch (error) {
                toast({ type: "error", message: "Your form field is required!" });
            }
        }
    })
    // const handleChange = async (event) => {
    //     // validationCheck(event.target.name, event.target.value)
    //     validationCheck()

    //     setTokenData((preState) => ({
    //         ...preState,
    //         [event.target.name]: event.target.value
    //     }));
    // };
    const validationCheck = (name, value) => {
        let isValid = true;
        if (!tokenData.token_supply.trim()) {
            setValidateDataErr((prevErr) => ({ ...prevErr, token_supply_err: "Token supply field is required!" }))
            // setValidateDataErr
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, token_supply_err: "" }))
        }
        if (tokenData.initial_supply == "" || tokenData.initial_supply === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, initial_supply_err: "Initial supply field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, initial_supply_err: "" }))
        }
        if (tokenData.token_price == "" || tokenData.token_price === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, token_price_err: "Initial supply field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, token_price_err: "" }))
        }
        if (tokenData.hard_cap_value == "" || tokenData.hard_cap_value === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, hard_cap_value_err: "Hard  field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, hard_cap_value_err: "" }))
        }
        if (tokenData.hard_cap_value == "" || tokenData.hard_cap_value === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, hard_cap_value_err: "Hard cap field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, hard_cap_value_err: "" }))

        }
        if (tokenData.soft_cap_value == "" || tokenData.soft_cap_value === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, soft_cap_value_err: "Soft cap field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, soft_cap_value_err: "" }))
        }
        if (tokenData.contact_address == "" || tokenData.contact_address === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, contact_address_err: "Contact address field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, contact_address_err: "" }))
        }
        return isValid;
    };

    //** submit functionality */
    const { token_supply, initial_supply, token_price, start_date, end_date, hard_cap_value, soft_cap_value, contact_address } = tokenData;
    const user_data = {
        userName: state.data.userName,
        email: state.data.email,
        projectName: state.data.projectName,
        projectInfo: state.data.projectInfo,
        blockChainSelect: state.data.blockChainSelect,
        userTeam: state.data.userTeam,
        investors: state.data.investors,
        smartContractAudited: state.data.smartContractAudited,
        paper_link: state.data.paper_link,
        websiteLink: state.data.websiteLink,
        gitLink: state.data.gitLink,
        telegramGrpLink: state.data.telegramGrpLink,
        telegramUserName: state.data.telegramUserName,
        twitterLink: state.data.twitterLink,
        token_supply: token_supply,
        initial_supply: initial_supply,
        token_price: token_price,
        start_date: moment(start_date).format('YYYY-MM-DDTHH:mm:ss'),
        end_date: moment(end_date).format('YYYY-MM-DDTHH:mm:ss'),
        hard_cap_value: hard_cap_value,
        soft_cap_value: soft_cap_value,
        contact_address: contact_address
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     var validateStatus = await validationCheck();
    //     if (validateStatus) {
    //         await axios({
    //             method: 'POST',
    //             url: `${Config.V1_API_URL}ido-form/create`,
    //             data: user_data
    //         }).then((response) => {
    //             var errmsg = response.data.errorMessage
    //             if(response.data.code == 500) toast({ type: "error", message: errmsg });
    //             if (response.data) {
    //                 toast({ type: "success", message: "Thanks For Joining our Community!!" });
    //                 window.location.reload();
    //             }
    //         }).catch((err) => console.log(err))
    //     } else {
    //         toast({ type: "error", message: "Your form field is required!" });
    //     }
    // }
    return (
        <div className="Ido-App-lanchpad">
            <Navbar />
            <ToastContainer limit={1} />
            <div className="hero-section-ido-launchpad-banner py-5">
                <div className="container">
                    <div className="row g-4 justify-content-around">
                        <div className="col-lg-8 application-form-ido-section">
                            <p className="ido-text-1 mb-5">Fibit Application Form</p>
                            <form className="" onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                                return false;
                            }}>
                                <div className="mb-4">
                                    {/* <label className="form-label">Token Supply</label> */}
                                    <p className="ido-active-text-2 mb-1">Token Supply</p>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="token_supply"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a number"
                                        name="token_supply"
                                        value={values.token_supply}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.token_supply && errors.token_supply ? true : false}
                                    />
                                    {
                                        touched.token_supply && errors.token_supply && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.token_supply}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Initial Supply</label> */}
                                    <p className="ido-active-text-2 mb-1">Initial Supply</p>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="initial_supply"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a number"
                                        name="initial_supply"
                                        value={values.initial_supply}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.initial_supply && errors.initial_supply ? true : false}
                                    />
                                    {
                                        touched.initial_supply && errors.initial_supply && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.initial_supply}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Token Price</label> */}
                                    <p className="ido-active-text-2 mb-1">Token Price</p>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="token_price"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a number"
                                        name="token_price"
                                        value={values.token_price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.token_price && errors.token_price ? true : false}
                                    />
                                    {
                                        touched.token_price && errors.token_price && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.token_price}
                                            </small>
                                        )
                                    }
                                    <div className="form-text">1 TKN = 0.0034 USD</div>
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Start Date</label> */}
                                    <p className="ido-active-text-2 mb-1">Start Date</p>

                                    <DatePicker
                                        selected={tokenData.start_date}
                                        className="react-datepicker-wrapper22 form-control"
                                        // name="start_date"
                                        onChange={(date) => setTokenData((prevDate) => ({ ...prevDate, start_date: date }))}
                                    // onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">End Date</label> */}
                                    <p className="ido-active-text-2 mb-1">End Date</p>

                                    <DatePicker
                                        selected={tokenData.end_date}
                                        className="react-datepicker-wrapper22 form-control"
                                        name="end_date"
                                        onChange={(date) => setTokenData((prevDate) => ({ ...prevDate, end_date: date }))}
                                    // onChange={handleChange}

                                    />
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Hard Cap Value</label> */}
                                    <p className="ido-active-text-2 mb-1">Hard Cap Value</p>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="hard_cap_value"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a number"
                                        name="hard_cap_value"
                                        value={values.hard_cap_value}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.hard_cap_value && errors.hard_cap_value ? true : false}
                                    />
                                    {
                                        touched.hard_cap_value && errors.hard_cap_value && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.hard_cap_value}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Soft Cap Value</label> */}
                                    <p className="ido-active-text-2 mb-1">Soft Cap Value</p>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="hard_cap_value"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a number"
                                        name="soft_cap_value"
                                        value={values.soft_cap_value}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.soft_cap_value && errors.soft_cap_value ? true : false}
                                    />
                                    {
                                        touched.soft_cap_value && errors.soft_cap_value && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.soft_cap_value}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Contact Address</label> */}
                                    <p className="ido-active-text-2 mb-1">Contact Address</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact_address"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter the contact address"
                                        name="contact_address"
                                        value={values.contact_address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.contact_address && errors.contact_address ? true : false}
                                    />
                                    {
                                        touched.contact_address && errors.contact_address && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.contact_address}
                                            </small>
                                        )
                                    }
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="ido-launchpad-button">Submit</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
