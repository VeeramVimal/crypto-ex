import React, { useState, useEffect, createContext } from "react";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/ido-style.css';
import { toast } from '../../../../core/lib/toastAlert';
import Config from '../../../../core/config/index';
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { makeRequest } from "../../../../core/services/v1/request";
import * as Yup from "yup";
import $ from 'jquery';

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
    { value: 1, label: 'Anonymous', name: 'anonymous' },
    { value: 2, label: 'Mixed', name: 'mixed' },
];
const Options = [
    { value: 0, label: "Yes", name: "yes" },
    { value: 1, label: "No", name: "no" }
]
function Home(props) {
    const navigate = useNavigate();
    const userApplicationContext = createContext()
    const [userData, setUserData] = useState({
        blockChainSelected: "",
        userTermSelected: "",
    });
    const [imagePreview, setPreviewImage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [imageErr, setImageErr] = useState('');
    const [loader, setLoader] = useState(false);
    const [formValues, setFormValues] = useState();
    const [showform, setShowform] = useState();

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
        twitterLinkErr: "", 
        imageErr: ""
    });

    const imageUpload = async (values) => {
        if(touched.image == true) {
            touched.image = false;
        }
        let uploadFile = values
        if(uploadFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            };
            reader.readAsDataURL(uploadFile);
        }
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
        setLoader(true);
        const response = (await makeRequest(params));
        setLoader(false);
        setImageUrl(response.message[0].location);
    }
    const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
        initialValues: {
            email: "",
            userName: "",
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
            twitterLink: "",
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
                if(imageUrl == null) {
                    setImageErr("Image field in required");
                }
                const payload = {
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
                    twitterLink: values.twitterLink,
                    image: imageUrl ? imageUrl : formValues && formValues.image
                };
                setImageUrl(payload.image);
                navigate("/idoformtoken", { state: { data: payload } })
            } catch (error) {
                toast({ type: "error", message: "Your form field is required!" });
            }
        }
    });
    useEffect(() => {
        if (window.location.pathname === "/ido-form") {
            $("#classy-navbar-mobile").css("background-color", "transparent");
            $(".theme-mode-dropdown").hide();
        }
    }, []);
    return (
        <div className="Ido-App-lanchpad">
            <Navbar setTheme={props.setTheme} />
            <ToastContainer limit={1} />
            <div className="hero-section-ido-launchpad-banner py-5 mt-5">
                <div className="container">
                    <div className="row g-4 justify-content-around">
                        <div className="col-lg-8 application-form-ido-section">
                            <p className="ido-text-1 mb-2">Fibit Application Form</p>
                            <p className="ido-text-3 mb-4" style={{ textTransform: "capitalize" }}>
                                Welcome! Please apply to launch on Fibit Pro. so we can begin to review your project application.
                            </p>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }}>
                                <div className="mb-4">
                                    <p className="ido-active-text-2 mb-1">Your Name <span className="text-danger">*</span></p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="userName"
                                        value={values.userName || formValues && formValues.userName || ""}
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
                                    <p className="ido-active-text-2 mb-1">Email Address <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        placeholder="example@example.com"
                                        value={values.email || formValues && formValues.email || ""}
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
                                    <p className="ido-active-text-2 mb-1">Project Name <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="projectName"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="projectName"
                                        value={values.projectName || formValues && formValues.projectName || ""}
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
                                    <p className="ido-active-text-2 mb-1">
                                        Tell us more about your project, the more info you give us the more likely we will consider your application. <span className="text-danger">*</span>
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
                                        value={values.projectInfo || formValues && formValues.projectInfo || ""}
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
                                    <p className="ido-active-text-2 mb-1">Blockchain <span className="text-danger">*</span></p>

                                    <div className="form-group">
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
                                                            <option className="form-select" value={formValues && formValues.chain} disabled selected hidden>Select option...</option>
                                                            <option
                                                                className="form-select"
                                                                value={chain.value} selected={formValues && formValues.blockChainSelect == chain.name ? true : false} >
                                                                {chain.label}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    {
                                        touched.blockChainSelected && errors.blockChainSelected && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.blockChainSelected}
                                            </small>
                                        )
                                    }
                                </div>

                                <div className="mb-4">
                                    <p className="ido-active-text-2 mb-1">Is your team Public or Anonymous? <span className="text-danger">*</span></p>

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
                                                            <option className="form-select" value={formValues && formValues.term} disabled selected hidden>Select option...</option>
                                                            <option
                                                                className="form-select"
                                                                value={term.value} selected={formValues && formValues.userTeam == term.name ? true : false} >
                                                                {term.label}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    {
                                        touched.userTermSelected && errors.userTermSelected && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.userTermSelected}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    <p className="ido-active-text-2 mb-1">Advisors/Backers/Investors <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="investors"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="investors"
                                        value={values.investors || formValues && formValues.investors || ""}
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
                                    <p className="ido-active-text-2 mb-1">Your smart contract have been audited? <span className="text-danger">*</span></p>
                                    <select
                                        className="form-control form-dropdown"
                                        placeholder="Select"
                                        name="smartContractAudited"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        option={Options}
                                    >
                                        {
                                                Options.map((term) => {
                                                    return (
                                                        <>
                                                            <option className="form-select" value={formValues && formValues.term} disabled selected hidden>Select option...</option>
                                                            <option
                                                                className="form-select"
                                                                value={term.value} selected={formValues && formValues.smartContractAudited == term.value ? true : false} >
                                                                {term.label}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
                                    </select>
                                    {
                                        touched.smartContractAudited && errors.smartContractAudited && (
                                            <small className="invalid-email error password-text-33">
                                                {errors.smartContractAudited}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    <p className="ido-active-text-2 mb-1">Link to Whitepaper or Lite paper? <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="paper_link"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="paper_link"
                                        value={values.paper_link || formValues && formValues.paper_link || ""}
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
                                    <p className="ido-active-text-2 mb-1">Website Link (if any)? <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="websiteLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="websiteLink"
                                        value={values.websiteLink || formValues && formValues.websiteLink || ""}
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
                                    <p className="ido-active-text-2 mb-1">GitHub Link? <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gitLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="gitLink"
                                        value={values.gitLink || formValues && formValues.gitLink || ""}
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
                                    <p className="ido-active-text-2 mb-1">Twitter Link? <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="twitterLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="twitterLink"
                                        value={values.twitterLink || formValues && formValues.twitterLink || ""}
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
                                    <p className="ido-active-text-2 mb-1">Telegram Group Link? <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telegramGrpLink"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="telegramGrpLink"
                                        value={values.telegramGrpLink || formValues && formValues.telegramGrpLink || ""}
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
                                    <p className="ido-active-text-2 mb-1">Your Telegram handle (@username) <span className="text-danger">*</span></p>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telegramUserName"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="telegramUserName"
                                        value={values.telegramUserName || formValues && formValues.telegramUserName || ""}
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
                                <div className="mb-4">
                                    <p className="ido-active-text-2 mb-1">Image <span className="text-danger">*</span></p>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        autoComplete="off"
                                        aria-label="Sizing example input"
                                        aria-describedby="emailHelp"
                                        name="image"
                                        onChange={(event) => imageUpload(event.currentTarget.files[0])}
                                    />
                                    {
                                        loader == true ?
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        :
                                            ''
                                    }
                                    {
                                        imageErr && (
                                            <small className="invalid-email error password-text-33">
                                                {imageErr}
                                            </small>
                                        )
                                    }
                                    {imageUrl && (
                                        <img src={imageUrl} alt="Image Preview" style={{ maxWidth: '200px' }} />
                                    )}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn ido-launchpad-button"> NEXT </button>
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
