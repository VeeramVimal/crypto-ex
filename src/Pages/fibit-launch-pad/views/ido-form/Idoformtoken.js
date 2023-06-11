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

    const handleChange = async (event) => {
        // validationCheck(event.target.name, event.target.value)
        validationCheck()

        setTokenData((preState) => ({
            ...preState,
            [event.target.name]: event.target.value
        }));
        // switch (event.target.name) {
        //     case "token_supply":
        //         return setTokenData({ ...tokenData, ...{ "token_supply": event.target.value } });
        //     case "initial_supply":
        //         return setTokenData({ ...tokenData, ...{ "initial_supply": event.target.value } });
        //     case "start_date":
        //         return setTokenData({ ...tokenData, ...{ "start_date": event.target.value } });
        //     case "end_date":
        //         return setTokenData({ ...tokenData, ...{ "end_date": event.target.value } });
        //     case "hard_cap_value":
        //         return setTokenData({ ...tokenData, ...{ "hard_cap_value": event.target.value } });
        //     case "soft_cap_value":
        //         return setTokenData({ ...tokenData, ...{ "soft_cap_value": event.target.value } });
        //     case "contact_address":
        //         return setTokenData({ ...tokenData, ...{ "contact_address": event.target.value } })
        //     default:
        //         break;
        // }
    };
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
        blackChainSelect: state.data.blackChainSelect,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        var validateStatus = await validationCheck();
        if (validateStatus) {
            await axios({
                method: 'POST',
                url: `${Config.V1_API_URL}ido-form/create`,
                data: user_data
            }).then((response) => {
                var errmsg = response.data.errorMessage
                if(response.data.code == 500) toast({ type: "error", message: errmsg });
                if (response.data) {
                    toast({ type: "success", message: "Thanks For Joining our Community!!" });
                    window.location.reload();
                }
            }).catch((err) => console.log(err))
        } else {
            toast({ type: "error", message: "Your form field is required!" });
        }
    }
    return (
        <div className="Ido-App-lanchpad">
            <Navbar />
            <ToastContainer limit={1} />
            <div className="hero-section-ido-launchpad-banner py-5">
                <div className="container">
                    <div className="row g-4 justify-content-around">
                        <div className="col-lg-8 application-form-ido-section">
                            <p className="ido-text-1 mb-5">Fibit Application Form</p>
                            <form className="" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label">Token Supply</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="token_supply"
                                        placeholder="Please enter a number"
                                        value={tokenData.token_supply}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validateDataErr.token_supply_err}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Initial Supply</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="initial_supply"
                                        placeholder="Please enter a number"
                                        value={tokenData.initial_supply}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validateDataErr.initial_supply_err}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Token Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="token_price"
                                        placeholder="Please enter a number"
                                        value={tokenData.token_price}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validateDataErr.token_price_err}
                                    </div>
                                    <div className="form-text">1 TKN = 0.0034 USD</div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Start Date</label>
                                    <DatePicker
                                        selected={tokenData.start_date}
                                        className="react-datepicker-wrapper22 form-control"
                                        // name="start_date"
                                        onChange={(date) => setTokenData((prevDate) => ({ ...prevDate, start_date: date }))}
                                    // onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">End Date</label>
                                    <DatePicker
                                        selected={tokenData.end_date}
                                        className="react-datepicker-wrapper22 form-control"
                                        name="end_date"
                                        onChange={(date) => setTokenData((prevDate) => ({ ...prevDate, end_date: date }))}
                                    // onChange={handleChange}

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Hard Cap Value</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="hard_cap_value"
                                        placeholder="Please enter a number"
                                        value={tokenData.hard_cap_value}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validateDataErr.hard_cap_value_err}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Soft Cap Value</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="soft_cap_value"
                                        placeholder="Please enter a number"
                                        value={tokenData.soft_cap_value}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validateDataErr.soft_cap_value_err}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Contact Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contact_address"
                                        placeholder="Please enter the contact address"
                                        value={tokenData.contact_address}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validateDataErr.contact_address_err}
                                    </div>
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
