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
const BlockChain = [
    { value: 0, label: 'Ethereum', name: 'Eth' },
    { value: 1, label: 'Binance Smart Chain', name: 'btn' },
    { value: 2, label: 'Polygon (Matic)', name: 'polygon' },
    { value: 3, label: 'OKExChain', name: 'OKEx' },
    { value: 4, label: 'Polkadot', name: 'polkadot' },
    { value: 5, label: 'Solana', name: 'solana' },
    { value: 6, label: 'Other', name: 'other' },
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
        userName: "",
        email: "",
        projectName: "",
        projectInfo: "",
        // blackChainSelect: [],
        // userTeam: [],
        investors: "",
        smartContractAudited: "",
        paper_link: "",
        websiteLink: "",
        gitLink: "",
        telegramGrpLink: "",
        telegramUserName: "",
        blockChainSelected: "",
        userTermSelected: "",
        twitterLink: ""
    });
    const [validationErr, setValidationErr] = useState({
        userNameErr: "",
        emailErr: "",
        projectNameErr: "",
        projectInfoErr: "",
        blackChainSelectErr: "",
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
    const handleChainSelect = async (event) => {
        let chain = await BlockChain.filter((ele) => ele.value == event.target.value);
        setUserData((prevSelect) => ({ ...prevSelect, blockChainSelected: chain[0].name }))
    };
    const handleTeamSelect = async (event) => {
        let term = await Terms.filter((val) => val.value == event.target.value);
        setUserData((prevSelect) => ({ ...prevSelect, userTermSelected: term[0].name }))
    };
    //** enter the value to set state functions */
    const handleChange = async (event) => {
        setUserData((preProp) => ({
            ...preProp,
            [event.target.name]: event.target.value
        }));
        ValidationCheckErr();
    };
    //** form validation functions */
    const ValidationCheckErr = async () => {
        let isValid = true;
        if (userData.userName == "" || userData.userName === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, userNameErr: "User Name must be between 1 and 32 characters!" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, userNameErr: "" }))
        }

        let emailReg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        if (userData.email == "" || userData.email === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, emailErr: "Email field is required" }))
            isValid = false
        } else if (!emailReg.test(userData.email)) {
            setValidationErr((prevErr) => ({ ...prevErr, emailErr: "Email Address does not appear to be valid" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, emailErr: "" }))
        }

        if (userData.projectName == "" || userData.projectName === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, projectNameErr: "Project Name field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, projectNameErr: "" }))
        }
        console.log("userData.projectInfo============", userData.projectInfo);
        if (userData.projectInfo == "" || userData.projectInfo === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, projectInfoErr: "Project information field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, projectInfoErr: "" }))
        }

        if (userData.blockChainSelected == "" || userData.blockChainSelected === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, blackChainSelectErr: "Select any one block chain" }));
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, blackChainSelectErr: "" }));
        }
        // let teamValidation = (Object.values(userTeams).includes(true));
        if (userData.userTermSelected == "" || userData.userTermSelected === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, userTeamErr: "Select any one user team" }));
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, userTeamErr: "" }));
        }
        if (userData.investors == "" || userData.investors === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, investorsErr: "Investors field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, investorsErr: "" }))
        }

        if (userData.smartContractAudited == "" || userData.smartContractAudited === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, smartContractAuditedErr: "smart contract audited field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, smartContractAuditedErr: "" }))
        }

        if (userData.paper_link == "" || userData.paper_link === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, paper_linkErr: "Whitepaper field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, paper_linkErr: "" }))
        }

        if (userData.websiteLink == "" || userData.websiteLink === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, websiteLinkErr: "Website link field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, websiteLinkErr: "" }))
        }

        if (userData.gitLink == "" || userData.gitLink === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, gitLinkErr: "GitHub link field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, gitLinkErr: "" }))
        }
        if (userData.twitterLink == "" || userData.twitterLink === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, twitterLinkErr: "twitter link field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, twitterLinkErr: "" }))
        }
        if (userData.telegramGrpLink == "" || userData.telegramGrpLink === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, telegramGrpLinkErr: "Telegram group link field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, telegramGrpLinkErr: "" }))
        }

        if (userData.telegramUserName == "" || userData.telegramUserName === undefined) {
            setValidationErr((prevErr) => ({ ...prevErr, telegramUserNameErr: "Telegram field is required" }))
            isValid = false
        } else {
            setValidationErr((prevErr) => ({ ...prevErr, telegramUserNameErr: "" }))
        }
        return isValid;
    }
    // //** submit functionality */
    const { userName, email, projectName, projectInfo, investors,
        smartContractAudited, paper_link, websiteLink, gitLink, telegramGrpLink, telegramUserName,
        userTermSelected, blockChainSelected, twitterLink
    } = userData;
    const data = {
        userName: userName,
        email: email,
        projectName: projectName,
        projectInfo: projectInfo,
        blackChainSelect: blockChainSelected,
        userTeam: userTermSelected,
        investors: investors,
        smartContractAudited: smartContractAudited,
        paper_link: paper_link,
        websiteLink: websiteLink,
        gitLink: gitLink,
        telegramGrpLink: telegramGrpLink,
        telegramUserName: telegramUserName,
        twitterLink: twitterLink
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        var validstatus = await ValidationCheckErr();
        // var validSelect = await ValidationSelectCheckErr();
        // console.log("data==========", data);
        if (validstatus) {
            //    await axios({
            //         method: 'POST',
            //         url: `${APP_API_URL}user/create`,
            //         data: data
            //     }).then((response) => {
            //         if (response) {
            //             Swal.fire({
            //                 // title: "Wow!",
            //                 text: "Thanks For Joining our Community!!",
            //                 icon: "success",
            //             }).then(() => {
            //                 window.location.reload()
            //             });
            //         }
            //     }).catch((err) => console.log(err))
            navigate("/idoformtoken", { state: { data: data } })
        } else {
            // toast.error("Your form field is required!", {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            // });
            toast({ type: "error", message: "Your form field is required!" });

        }

    };
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
                            <form className="" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label for="exampleInputEmail1" className="form-label">Your Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="userName"
                                        value={userData.userName}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.userNameErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="email"
                                        placeholder="example@example.com"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.emailErr}
                                    </div>
                                    {/* <div id="emailHelp" className="form-text">example@example.com</div> */}
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Project Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="projectName"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.projectNameErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleFormControlTextarea1" className="form-label">Tell us more about your project, the more info you give us the more likely we will consider your application.</label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        name="projectInfo"
                                        onChange={handleChange}
                                        rows="3"></textarea>
                                    <div className="error">
                                        {validationErr.projectInfoErr}
                                    </div>
                                </div>
                                <div className="mb-4" >
                                    <label for="exampleFormControlTextarea1" className="form-label">Blockchain</label>
                                    <div className="form-group">
                                        <select
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
                                        </select>
                                    </div>
                                    <div className="error">
                                        {validationErr.blackChainSelectErr}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label for="exampleFormControlTextarea1" className="form-label">Is your team Public or Anon?</label>
                                    <div className="form-group">
                                        <select
                                            className="form-control form-dropdown"
                                            placeholder="Select"
                                            name="userTermSelected"
                                            onChange={handleTeamSelect}
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

                                    <div className="error">
                                        {validationErr.userTeamErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Advisors/Backers/Investors</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="investors"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.investorsErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Your smart contract have been audited?</label>
                                    <input
                                        type="text"
                                        name="smartContractAudited"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.smartContractAuditedErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Link to Whitepaper or Lite paper?</label>
                                    <input
                                        type="text"
                                        name="paper_link"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.paper_linkErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Website Link (if any)?</label>
                                    <input
                                        type="text"
                                        name="websiteLink"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.websiteLinkErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">GitHub Link?</label>
                                    <input
                                        type="text"
                                        name="gitLink"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.gitLinkErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Twitter Link?</label>
                                    <input
                                        type="text"
                                        name="twitterLink"
                                        className="form-control"
                                        id="twitterLink"
                                        value={userData.twitterLink}
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.twitterLinkErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Telegram Group Link?</label>
                                    <input
                                        type="text"
                                        name="telegramGrpLink"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.telegramGrpLinkErr}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="exampleInputPassword1" className="form-label">Your Telegram handle (@username)</label>
                                    <input
                                        type="text"
                                        name="telegramUserName"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleChange}
                                    />
                                    <div className="error">
                                        {validationErr.telegramUserNameErr}
                                    </div>
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
