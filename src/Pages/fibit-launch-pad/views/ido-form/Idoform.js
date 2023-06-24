import React, { useState, useEffect, createContext } from "react";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import axios from "axios";
// import Swal from "sweetalert2";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/ido-style.css';
import { toast } from '../../../../core/lib/toastAlert';
import Config from '../../../../core/config/index';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const BlockChain = [
    { value: 0, label: 'Ethereum', name: 'Eth', token: "ERC-20" },
    { value: 1, label: 'Binance Smart Chain', name: 'btn', token: "BEP-20" },
    { value: 2, label: 'TRON', name: 'TRON', token: "TRC-20" },
    // { value: 3, label: 'OKExChain', name: 'OKEx' },
    // { value: 4, label: 'Polkadot', name: 'polkadot' },
    // { value: 5, label: 'Solana', name: 'solana' },
    // { value: 6, label: 'Other', name: 'other' },
];

const Terms = [
    { value: 0, label: 'Public', name: 'public' },
    { value: 1, label: 'Anon', name: 'anon' },
    { value: 2, label: 'Mixed', name: 'mixed' },
];
function Home() {
    const navigate = useNavigate();
    const userApplicationContext = createContext()
    const [userData, setUserData] = useState({
        blockChainSelected: "",
        userTermSelected: "",
    });
    const [validationErr, setValidationErr] = useState({
        userNameErr: "",
        emailErr: "",
        projectNameErr: "",
        projectInfoErr: "",
        blockChainSelectErr: "",
        userTeamErr: "",
        investorsErr: "",
        smartContractAuditedErr: "",
        paper_linkErr: "",
        websiteLinkErr: "",
        gitLinkErr: "",
        telegramGrpLinkErr: "",
        telegramUserNameErr: "",
        twitterLinkErr: ""
    });

    //** chain and user team select functionality */ 
    // const handleChainSelect = async (event) => {
    //     let chain = await BlockChain.filter((ele) => ele.value == event.target.value);
    //     setUserData((prevSelect) => ({ ...prevSelect, blockChainSelected: chain[0].name }))
    // };
    // const handleTeamSelect = async (event) => {
    //     let term = await Terms.filter((val) => val.value == event.target.value);
    //     setUserData((prevSelect) => ({ ...prevSelect, userTermSelected: term[0].name }))
    // };

    const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
        initialValues: {
            userName: "",
            email: "",
            projectName: "",
            projectInfo: "",
            investors: "",
            smartContractAudited: "",
            paper_link: "",
            websiteLink: "",
            gitLink: "",
            telegramGrpLink: "",
            telegramUserName: "",
            blockChainSelected: userData.blockChainSelected,
            userTermSelected: userData.userTermSelected,
            twitterLink: ""
        },
        //** form validation functions */
        validationSchema: Yup.object().shape({
            userName: Yup.string().required("User Name must be between 1 and 32 characters!"),
            email: Yup.string().email('Please enter valid email').required("Email field is required!"),
            projectName: Yup.string().required("Project Name field is required!"),
            projectInfo: Yup.string().required("Project information field is required!"),
            investors: Yup.string().required("Investors field is required!"),
            smartContractAudited: Yup.string().required("smart contract audited field is required!"),
            paper_link: Yup.string().required("Whitepaper field is required!"),
            websiteLink: Yup.string().required("Website link field is required!"),
            gitLink: Yup.string().required("GitHub link field is required!"),
            telegramGrpLink: Yup.string().required("Telegram group link field is required!"),
            telegramUserName: Yup.string().required("Telegram field is required!"),
            blockChainSelected: Yup.string().required("Select any one block chain"),
            userTermSelected: Yup.string().required("Select any one user team"),
            twitterLink: Yup.string().required("Twitter link field is required!"),
        }),
        //** enter the value to set state functions */
        onChange: async (event) => {
        },
        //** submit functionality */
        onSubmit: async (values) => {
            try {
                var chain = await BlockChain.filter((ele) => ele.value == Number(values.blockChainSelected));
                var term = await Terms.filter((val) => val.value == Number(values.userTermSelected)); 
                const data = {
                    userName: values.userName,
                    email: values.email,
                    projectName: values.projectName,
                    projectInfo: values.projectInfo,
                    blockChainSelect: chain[0].name,
                    tokenName: chain[0].token,
                    userTeam: term[0].name,
                    investors: values.investors,
                    smartContractAudited: values.smartContractAudited,
                    paper_link: values.paper_link,
                    websiteLink: values.websiteLink,
                    gitLink: values.gitLink,
                    telegramGrpLink: values.telegramGrpLink,
                    telegramUserName: values.telegramUserName,
                    twitterLink: values.twitterLink
                };
                navigate("/idoformtoken", { state: { data: data } })
            } catch (error) {
                toast({ type: "error", message: "Your form field is required!" });
            }
        }
    });
    // const handleChange = async (event) => {
    //     console.log("sdfghjk==========", event);
    // }
    return (
        <div className="Ido-App-lanchpad">
            <Navbar />
            <ToastContainer limit={1} />
            <div className="hero-section-ido-launchpad-banner py-5">
                <div className="container">
                    <div className="row g-4 justify-content-around">
                        <div className="col-lg-8 application-form-ido-section">
                            <p className="ido-text-1 mb-2">Fibit Application Form</p>
                            <p className="ido-text-3 mb-4" style={{ textTransform: "capitalize" }}>
                                Welcome! :) Please apply to launch on Fibit Pro so we can begin to review your project application.
                            </p>
                            <form className="" onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                                return false;
                            }}>
                                <div className="mb-4">
                                    {/* <label for="exampleInputEmail1" className="form-label">Your Name</label> */}
                                    <p className="ido-active-text-2 mb-1">Your Name</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="userName"
                                        value={values.userName || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.userName && errors.userName ? true : false}
                                    />
                                    {
                                        touched.userName && errors.userName && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.userName}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Email address</label> */}
                                    <p className="ido-active-text-2 mb-1">Email Address</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        placeholder="example@example.com"
                                        value={values.email || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.email && errors.email ? true : false}
                                    />
                                    {
                                        touched.email && errors.email && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.email}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Project Name</label> */}
                                    <p className="ido-active-text-2 mb-1">Project Name</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="projectName"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="projectName"
                                        value={values.projectName || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.projectName && errors.projectName ? true : false}
                                    />
                                    {
                                        touched.projectName && errors.projectName && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.projectName}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleFormControlTextarea1" className="form-label">Tell us more about your project, the more info you give us the more likely we will consider your application.</label> */}
                                    <p className="ido-active-text-2 mb-1">
                                        Tell us more about your project, the more info you give us the more likely we will consider your application.
                                    </p>

                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="projectInfo"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="projectInfo"
                                        rows="3"
                                        value={values.projectInfo || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.projectInfo && errors.projectInfo ? true : false}
                                    ></textarea>
                                    {
                                        touched.projectInfo && errors.projectInfo && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.projectInfo}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4" >
                                    {/* <label for="exampleFormControlTextarea1" className="form-label">Blockchain</label> */}
                                    <p className="ido-active-text-2 mb-1">Blockchain</p>

                                    <div className="form-group">
                                        {/* <select
                                            className="form-control form-dropdown"
                                            placeholder="Select"
                                            name="blockChainSelected"
                                            onChange={handleChainSelect}
                                            option={BlockChain}
                                        >
                                            {
                                                BlockChain.map((chain) => {
                                                    return (
                                                        <>
                                                            <option className="form-select" value="" disabled selected hidden>Select option...</option>
                                                            <option
                                                                className="form-select"
                                                                value={chain.value} >
                                                                {chain.label}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <select
                                            className="form-control form-dropdown"
                                            placeholder="Select"
                                            name="blockChainSelected"
                                            onChange={handleChange}
                                            option={BlockChain}
                                            onBlur={handleBlur}
                                        >
                                            {
                                                BlockChain.map((chain) => {
                                                    return (
                                                        <>
                                                            <option className="form-select" value="" disabled selected hidden>Select option...</option>
                                                            <option
                                                                className="form-select"
                                                                value={chain.value} >
                                                                {chain.label}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    {/* <div className="error">
                                        {validationErr.blockChainSelectErr}
                                    </div> */}
                                    {
                                        touched.blockChainSelected && errors.blockChainSelected && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.blockChainSelected}
                                            </small>
                                        )
                                    }
                                </div>

                                <div className="mb-4">
                                    {/* <label for="exampleFormControlTextarea1" className="form-label">Is your team Public or Anon?</label> */}
                                    <p className="ido-active-text-2 mb-1">Is your team Public or Anon?</p>

                                    <div className="form-group">
                                        <select
                                            className="form-control form-dropdown"
                                            placeholder="Select"
                                            name="userTermSelected"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            option={Terms}
                                        >
                                            {
                                                Terms.map((term) => {
                                                    return (
                                                        <>
                                                            <option className="form-select" value="" disabled selected hidden>Select option...</option>
                                                            <option
                                                                className="form-select"
                                                                value={term.value} >
                                                                {term.label}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    {/* <div className="error">
                                        {validationErr.userTeamErr}
                                    </div> */}
                                    {
                                        touched.userTermSelected && errors.userTermSelected && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.userTermSelected}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Advisors/Backers/Investors</label> */}
                                    <p className="ido-active-text-2 mb-1">Advisors/Backers/Investors</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="investors"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="investors"
                                        value={values.investors || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.investors && errors.investors ? true : false}
                                    />
                                    {
                                        touched.investors && errors.investors && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.investors}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Your smart contract have been audited?</label> */}
                                    <p className="ido-active-text-2 mb-1">Your smart contract have been audited?</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="smartContractAudited"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="smartContractAudited"
                                        value={values.smartContractAudited || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.smartContractAudited && errors.smartContractAudited ? true : false}
                                    />
                                    {
                                        touched.smartContractAudited && errors.smartContractAudited && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.smartContractAudited}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Link to Whitepaper or Lite paper?</label> */}
                                    <p className="ido-active-text-2 mb-1">Link to Whitepaper or Lite paper?</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="paper_link"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="paper_link"
                                        value={values.paper_link || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.paper_link && errors.paper_link ? true : false}
                                    />
                                    {
                                        touched.paper_link && errors.paper_link && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.paper_link}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Website Link (if any)?</label> */}
                                    <p className="ido-active-text-2 mb-1">Website Link (if any)?</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="websiteLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="websiteLink"
                                        value={values.websiteLink || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.websiteLink && errors.websiteLink ? true : false}
                                    />
                                    {
                                        touched.websiteLink && errors.websiteLink && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.websiteLink}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">GitHub Link?</label> */}
                                    <p className="ido-active-text-2 mb-1">GitHub Link?</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gitLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="gitLink"
                                        value={values.gitLink || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.gitLink && errors.gitLink ? true : false}
                                    />
                                    {
                                        touched.gitLink && errors.gitLink && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.gitLink}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Twitter Link?</label> */}
                                    <p className="ido-active-text-2 mb-1">Twitter Link?</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="twitterLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="twitterLink"
                                        value={values.twitterLink || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.twitterLink && errors.twitterLink ? true : false}
                                    />
                                    {
                                        touched.twitterLink && errors.twitterLink && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.twitterLink}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Telegram Group Link?</label> */}
                                    <p className="ido-active-text-2 mb-1">Telegram Group Link?</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telegramGrpLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="telegramGrpLink"
                                        value={values.telegramGrpLink || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.telegramGrpLink && errors.telegramGrpLink ? true : false}
                                    />
                                    {
                                        touched.telegramGrpLink && errors.telegramGrpLink && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.telegramGrpLink}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    {/* <label for="exampleInputPassword1" className="form-label">Your Telegram handle (@username)</label> */}
                                    <p className="ido-active-text-2 mb-1">Your Telegram handle (@username)</p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telegramUserName"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="telegramUserName"
                                        value={values.telegramUserName || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.telegramUserName && errors.telegramUserName ? true : false}
                                    />
                                    {
                                        touched.telegramUserName && errors.telegramUserName && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.telegramUserName}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="text-center">
                                    {/* <a href="/idoformtoken" type="submit" className=""> */}
                                    <button type="submit" className="btn ido-launchpad-button">
                                        NEXT
                                    </button>
                                    {/* </a> */}
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
