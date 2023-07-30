import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { ToastContainer } from 'react-toastify';
import '../../assets/styles/ido-style.css';
import { toast } from '../../../../core/lib/toastAlert';
import Config from '../../../../core/config/index';
import moment from "moment/moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeRequest } from "../../../../core/services/v1/request";
import { useContextData } from "../../../../core/context/index";

function Home() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { myProfile } = useContextData();
    const [tokenData, setTokenData] = useState({
        token_name: "",
        token_symbol: "",
        token_supply: "",
        initial_supply: "",
        token_price: "",
        start_date: new Date(),
        end_date: new Date(),
        hard_cap_value: "",
        soft_cap_value: "",
        contact_address: "",
        token_contract_decimal: ""
    });
    const [validateDataErr, setValidateDataErr] = useState({
        token_name_err: "",
        token_symbol_err: "",
        token_supply_err: "",
        initial_supply_err: "",
        token_price_err: "",
        start_date_err: "",
        end_date_err: "",
        hard_cap_value_err: "",
        soft_cap_value_err: "",
        contact_address_err: "",
        token_contract_decimal_err: ""
    });
    const { handleChange, handleSubmit, handleBlur, touched, errors, values, resetForm } = useFormik({
        initialValues: {
            token_name: "",
            token_symbol: "",
            token_supply: "",
            initial_supply: "",
            token_price: "",
            start_date: new Date(),
            end_date: new Date(),
            hard_cap_value: "",
            soft_cap_value: "",
            contact_address: "",
            token_contract_decimal: ""
        },
        //** form validation functions */
        validationSchema: Yup.object().shape({
            token_name: Yup.string().required("Token Name is required!"),
            token_symbol: Yup.string().required("Token symbol is required!"),
            token_supply: Yup.number().required("Token supply is required!"),
            initial_supply: Yup.number().required("Initial supply is required!"),
            token_price: Yup.number().required("Total price is required!"),
            hard_cap_value: Yup.string().required("Hard cap field is required!"),
            soft_cap_value: Yup.string().required("Soft cap field is required!"),
            contact_address: Yup.string().required("Token contract address field is required!"),
            start_date: Yup.string().required("start date is required"),
            end_date: Yup.string().required("end date is required"),
            token_contract_decimal: Yup.number().required("Token Contract Decimal is required")
        }),
        //** submit functionality */
        onSubmit: async (values) => {
            if(myProfile && myProfile._id) {
                try {
                    const payload = {
                        userName: state.data.userName,
                        email: state.data.email,
                        projectName: state.data.projectName,
                        projectInfo: state.data.projectInfo,
                        blockChainSelect: state.data.blockChainSelect,
                        tokenName: state.data.tokenName,
                        userTeam: state.data.userTeam,
                        userId: myProfile._id,
                        investors: state.data.investors,
                        smartContractAudited: state.data.smartContractAudited,
                        paper_link: state.data.paper_link,
                        websiteLink: state.data.websiteLink,
                        gitLink: state.data.gitLink,
                        telegramGrpLink: state.data.telegramGrpLink,
                        telegramUserName: state.data.telegramUserName,
                        twitterLink: state.data.twitterLink,
                        image: state.data.image,
                        token_name: values.token_name,
                        token_symbol: values.token_symbol,
                        token_supply: values.token_supply,
                        initial_supply: values.initial_supply,
                        available_token: values.initial_supply,
                        token_price: values.token_price,
                        start_date: moment(start_date).format('YYYY-MM-DDTHH:mm:ss'),
                        end_date: moment(end_date).format('YYYY-MM-DDTHH:mm:ss'),
                        hard_cap_value: values.hard_cap_value,
                        soft_cap_value: values.soft_cap_value,
                        contact_address: values.contact_address,
                        token_contract_decimal: values.token_contract_decimal
                    };
                    const params = {
                        method: 'POST',
                        url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/create`,
                        data: payload
                    }
                    const response = await makeRequest(params);
                    const { data, code, errorMessage, error, success } = response;
                    if (success == true) {
                        resetForm();
                        toast({ type: "success", message: "Thanks For Joining our Community!!" });
                        navigate("/ido-project")
                    } else {
                        toast({ type: "error", message: errorMessage ? errorMessage : "Something went wrong" });
                    }
                
                } catch (error) {
                    toast({ type: "error", message: "Your form field is required!" });
                }
            } else {
                toast({ type: "error", message: "Please login to create project" });
            }
        }
    })
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
        if(tokenData.start_date == "" || tokenData.start_date === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, start_date_err: "Start Date is required" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, start_date_err: "" }))
        }
        if(tokenData.end_date == "" || tokenData.end_date === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, end_date_err: "Start Date is required" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, end_date_err: "" }))
        }
        if (tokenData.contact_address == "" || tokenData.contact_address === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, contact_address_err: "Token Contract address field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, contact_address_err: "" }))
        }
        if (tokenData.token_contract_decimal == "" || tokenData.token_contract_decimal === undefined) {
            setValidateDataErr((prevErr) => ({ ...prevErr, token_contract_decimal_err: "Token Contract decimal field is required!" }))
            isValid = false
        } else {
            setValidateDataErr((prevErr) => ({ ...prevErr, token_contract_decimal_err: "" }))
        }
        return isValid;
    };

    //** submit functionality */
    const { token_supply, initial_supply, token_price, start_date, end_date, hard_cap_value, soft_cap_value, contact_address, token_contract_decimal } = tokenData;
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
        contact_address: contact_address,
        token_contract_decimal: token_contract_decimal
    };

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
                                    <p className="ido-active-text-2 mb-1">Token Name <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="token_name"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a token name"
                                        name="token_name"
                                        value={values.token_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.token_name && errors.token_name ? true : false}
                                    />
                                    {
                                        touched.token_name && errors.token_name && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.token_name}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Token Supply</label> */}
                                    <p className="ido-active-text-2 mb-1">Token Symbol <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="token_symbol"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter a token symbol"
                                        name="token_symbol"
                                        value={values.token_symbol}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.token_symbol && errors.token_symbol ? true : false}
                                    />
                                    {
                                        touched.token_symbol && errors.token_symbol && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.token_symbol}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Token Supply</label> */}
                                    <p className="ido-active-text-2 mb-1">Token Supply <span className="text-danger">*</span></p>

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
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
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
                                    <p className="ido-active-text-2 mb-1">Initial Supply <span className="text-danger">*</span></p>

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
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
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
                                    <p className="ido-active-text-2 mb-1">Token Price <span className="text-danger">*</span></p>

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
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                                        invalid={touched.token_price && errors.token_price ? true : false}
                                    />
                                    {
                                        touched.token_price && errors.token_price && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.token_price}
                                            </small>
                                        )
                                    }
                                    <div className="form-text">1 {values.token_symbol} = {values.token_price ? values.token_price : 0} USDT</div>
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Start Date</label> */}
                                    <p className="ido-active-text-2 mb-1">Start Date <span className="text-danger">*</span></p>

                                    <DatePicker
                                        selected={tokenData.start_date}
                                        className="form-control"
                                        selectsStart
                                        startDate={tokenData.start_date}
                                        endDate={tokenData.end_date}
                                        minDate={new Date()}
                                        // name="start_date"
                                        // id="start_date"
                                        onChange={(date) => setTokenData((prevDate) => ({ ...prevDate, start_date: date }))}
                                    />
                                    {
                                        touched.start_date && errors.start_date && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.start_date}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">End Date</label> */}
                                    <p className="ido-active-text-2 mb-1">End Date <span className="text-danger">*</span></p>

                                    <DatePicker
                                        selected={tokenData.end_date}
                                        className="form-control"
                                        selectsEnd
                                        startDate={tokenData.start_date}
                                        endDate={tokenData.end_date}
                                        minDate={tokenData.start_date}
                                        // name="end_date"
                                        // id="end_date"
                                        onChange={(date) => setTokenData((prevDate) => ({ ...prevDate, end_date: date }))}
                                        // onChange={handleChange}
                                    />
                                    {
                                        touched.end_date && errors.end_date && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.end_date}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label className="form-label">Hard Cap Value</label> */}
                                    <p className="ido-active-text-2 mb-1">Hard Cap Value <span className="text-danger">*</span></p>

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
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
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
                                    <p className="ido-active-text-2 mb-1">Soft Cap Value <span className="text-danger">*</span></p>

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
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
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
                                    <p className="ido-active-text-2 mb-1">Token Contract Address <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact_address"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter the token contract address"
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
                                <div className="mb-4">
                                    {/* <label className="form-label">Contact Address</label> */}
                                    <p className="ido-active-text-2 mb-1">Token Contract Decimal <span className="text-danger">*</span></p>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="token_contract_decimal"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        placeholder="Please enter the token decimal"
                                        name="token_contract_decimal"
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                                        onKeyPress={(event) => {
                                            const keyCode = event.which || event.keyCode;
                                            const keyValue = String.fromCharCode(keyCode);
                                            // Allow only numeric values (0-9) and the backspace key (8)
                                            if (!/^[0-9\b]+$/.test(keyValue)) {
                                              event.preventDefault();
                                            }
                                        }}
                                        value={values.token_contract_decimal}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.token_contract_decimal && errors.token_contract_decimal ? true : false}
                                    />
                                    {
                                        touched.token_contract_decimal && errors.token_contract_decimal && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.token_contract_decimal}
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
