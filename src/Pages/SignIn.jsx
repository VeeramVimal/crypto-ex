import React, { useState, useEffect, useRef } from "react";
// import React, { } from "react";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import password2 from "../assets/images/password2.png";
import { BsLockFill } from "react-icons/bs";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

// import { BsGoogle } from "react-icons/bs";
// import { BsApple } from "react-icons/bs";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { useFormik } from "formik";
import * as yup from "yup";

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import phone from 'phone';

// import PhoneInput, { isPossiblePhoneNumber, getCountries, getCountryCallingCode  } from 'react-phone-number-input'
// import en from 'react-phone-number-input/locale/en'
// import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
// import CountrySelect from './separate/pkg/CountrySelect';

import NavbarOne from "./siteTheme/NavbarOne";
import { useContextData } from "../core/context/index";
import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import { setCookie } from "../core/helper/cookie";
import Config from "../core/config/";
import { showEmail, showPhone } from "../core/helper/date-format";

import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    // .email('Enter a valid email')
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});
const validationSchemaPhNum = yup.object({
  password: yup
    .string("Enter your password")
    .required("Password is required"),
});

export default function SignIn(props) {
  let inputRef = useRef();
  let inputRef1 = useRef();
  const reCaptchaRef = useRef();

  const showIcon = () => <AiOutlineEyeInvisible aria-hidden="true" />;
  const hideIcon = () => <AiOutlineEye aria-hidden="true" />;

  const navigate = useNavigate();
  const { search } = useLocation();
  const currentTab = search.replace(/\?/g, '');

  const [country, setCountry] = useState("US");
  const [value, setValue] = useState();

  const { setUserProfile, siteSettings } = useContextData();

  const [showLogin, setshowLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [otpShow, setotpShow] = useState(0);
  const [phoneno_err, setphoneno_err] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [tabname, setTabname] = useState(currentTab !="" ? currentTab : 'email');
  const [timer_resendOtp, setTimer_resendOtp] = useState(0);

  const [reCAPTCHAShow, setReCAPTCHAShow] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      if(Config.CAPTCHA_STATUS == "Enable") {
        setReCAPTCHAShow(true);
        if(reCaptchaRef && reCaptchaRef.current) {
          await reCaptchaRef.current.reset();
        }
      }
    }, 2000);
  }, []);

  useEffect(() => {
    timer_resendOtp > 0 && setTimeout(() => setTimer_resendOtp(timer_resendOtp - 1), 1000);
  }, [timer_resendOtp]);

  const tabNameChange = async (val = "email") => {
    if (tabname != val) {
      setotpShow(0);
      setshowLogin(true);
      setTabname(val);
    }
  }

  const loginSubmit = async (values, target = "submit") => {
    if (target == "resendOTP") {
      let valuesCopy = Object.assign({}, values);
      valuesCopy.otp = "";
      values = valuesCopy;
    }

    if(Config.CAPTCHA_STATUS == "Enable") {    
      const reCatpchaVal = await reCaptchaRef.current.executeAsync();
      values.reCatpchaVal = reCatpchaVal;
    }

    setisLoading(true);
    const params = {
      url: `${Config.V1_API_URL}user/login`,
      method: "POST",
      body: values,
    };
    const response = await makeRequest(params);
    if(Config.CAPTCHA_STATUS == "Enable") {
      await reCaptchaRef.current.reset();
    }
    setisLoading(false);
    let type = "error";
    if (response.status) {
      type = "success";
      setotpShow(response.type);
      setshowLogin(false);
      if (!response.type) {
        setCookie("userToken", response.token);
        setUserProfile();
        navigate("/my/dashboard");
      }
      else {
        setTimer_resendOtp(Config.timer.resendOtp);
      }
    }
    toast({ type, message: response.message });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!showLogin) {
        if (formik.values.otp == "") {
          formik.errors.otp = "Please enter valid Code";
          return false;
        }
      }
      loginSubmit(values);
    },
  });

  const formikPhNum = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },
    validationSchema: validationSchemaPhNum,
    onSubmit: async (values) => {
      console.log("values=========", values);
      values.phoneno = phoneno;
      if (phoneno == "" || typeof phoneno == undefined) {
        setphoneno_err("Enter your phone number");
        return false;
      }
      const phoneDetail = phone(phoneno, { country: "" });
      if (phoneDetail.isValid === false) {
        setphoneno_err("Invalid phone number, Please enter correct phone number");
        return false;
      }
      setphoneno_err("");

      if (!showLogin) {
        if (formikPhNum.values.otp == "") {
          formikPhNum.errors.otp = "Please enter valid Code";
          return false;
        }
      }
      loginSubmit(values);
    },
  });

  return (
    <div>
      {/* <div className='bg-login-nav'><Link className="navbar-brand " to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link></div> */}
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <nav className="navbar  bg-login-nav mt-5">
        <div className="container-fluid d-flex justify-content-center mt-4">
          <span className=" d-block text-white my-2">
            <BsLockFill className="text-success mb-1" /><span className="password-text-33 fw-bold"> URL verification:</span>
            <small className="text-small password-text-33">
              {" "}
              <span className="text-success">https://</span>
              {""}
              {Config.FRONEND_URL_PRINT}
            </small>
          </span>
        </div>
      </nav>
      {/* phone-number-verification-change-top-banner */}
      <div className="container">
        <div className="row height-container">
          <div className="col-lg-6 my-auto">
            <h2 className="">{Config.SITENAME} Login</h2>
            {reCAPTCHAShow ?
            <ReCAPTCHA
              sitekey={Config.google.recaptcha.SITE_KEY}
              ref={reCaptchaRef}
              size="invisible"
            />:""}
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item " role="presentation">
                <button
                  className={"btn btn-light password-text-33 fw-bold"+ (tabname == "email" ? " active border-0": "border-0")}
                  id="pills-Email-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Email"
                  type="button"
                  role="tab"
                  aria-controls="pills-Email"
                  aria-selected="true"
                  onClick={() => tabNameChange("email")}
                >
                  Email
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={"btn ms-3 btn-light border-0 password-text-33 fw-bold" + (tabname == "phoneno" ? " active border-0": "border-0")}
                  id="pills-PhoneNumber-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-PhoneNumber"
                  type="button"
                  role="tab"
                  aria-controls="pills-PhoneNumber"
                  aria-selected="false"
                  onClick={() => tabNameChange("phoneno")}
                >
                  Phone Number
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className={ (tabname == "email" ? "tab-pane fade show active" :"tab-pane fade")}
                id="pills-Email"
                role="tabpanel"
                aria-labelledby="pills-Email-tab"
                tabindex="0"
              >
                <form onSubmit={formik.handleSubmit}>
                  {showLogin ? (
                    <>
                      <label className="mt-3 password-text-33">
                        Email
                      </label>
                      {formik.values.email === "" ||
                        !formik.values.email ||
                        (formik.values.email && isNaN(formik.values.email) === true)
                        ? ""
                        : ""}
                      <input
                        className="form-control "
                        type="text"
                        id="Email_Address"
                        name="email"
                        label="Email Address"
                        autoComplete="off"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      {
                        formik.errors.email
                          ?
                          <small className="invalid-email error password-text-33">{formik.errors.email} <br /></small>
                          :
                          null
                      }

                      <label className="mt-4 password-text-33">Password</label>
                      <div
                        className="col"
                        style={{ position: "relative", display: "block" }}
                      >
                        <input
                          className="form-control  input-dark"
                          type="password"
                          name="password"
                          label="Password"
                          autoComplete="off"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                          ref={inputRef}
                        />
                        <ReactPasswordToggleIcon
                          inputRef={inputRef}
                          showIcon={showIcon}
                          hideIcon={hideIcon}
                        />
                      </div>
                      {formik.errors.password ? (
                        <small className="invalid-password error password-text-33">
                          {formik.errors.password} <br />
                        </small>
                      ) : null}
                    </>
                  )
                    :
                    (
                      <>
                        <div className="row mt-4">
                          <span className="phonenumber-change-text-2">
                            {otpShow === 1 ? "Enter OTP Code" : "Enter 2FA Code"}
                          </span>
                          <div className={"input-group "+(otpShow === 1 ? "resendOTP" : "")}>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="button-addon2"
                              id="otp"
                              name="otp"
                              autoComplete="off"
                              value={formik.values.otp}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.otp && Boolean(formik.errors.otp)}
                              helperText={formik.touched.otp && formik.errors.otp}
                            />

                            {otpShow === 1 ? (
                              <button
                                id="button-addon2"
                                className="btn btn-phone-number-verification-code"
                                type="button"
                                disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                                onClick={() =>
                                  loginSubmit(formik.values, "resendOTP")
                                }
                              >
                                Resend OTP{timer_resendOtp > 0 ? <span className="timeLeft">({timer_resendOtp})</span> : ""}
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                          <span className="phonenumber-change-text-3 text-muted">
                            {otpShow === 1 ?
                              tabname === "email"
                                ?
                                "Enter OTP Code sent to E-mail - " + showEmail(formik.values.email)
                                :
                                ""
                              :
                              "Enter the 6-digit code from Google Authenticator"}
                          </span>
                          {formik.errors.otp ? (
                            <small className="invalid-otp error">
                              {formik.errors.otp} <br />
                            </small>
                          ) : null}
                        </div>
                      </>
                    )}
                  <button
                    type="submit"
                    className="btn text-white btn-col w-100 mt-4"
                    disabled={isLoading}
                  >
                    Login
                  </button>
                </form>
              </div>
              <div
                className={(tabname == "phoneno" ? "tab-pane fade show active" :"tab-pane fade")}
                id="pills-PhoneNumber"
                role="tabpanel"
                aria-labelledby="pills-PhoneNumber-tab"
                tabindex="0"
              >
                <form onSubmit={formikPhNum.handleSubmit}>
                  {showLogin ? (
                    <>
                      <label className="mt-3 password-text-33">
                        Phone Number
                      </label>
                      <PhoneInput
                        international
                        className="px-0"
                        name="phoneno"
                        id="phoneno"
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        onChange={setphoneno}
                        value={formikPhNum.values.phoneno}
                        autoComplete="off"
                        onBlur={formikPhNum.handleBlur}
                        style={{ border: "none" }}
                      />
                      {phoneno_err ? <small className="invalid-phoneno error password-text-33">{phoneno_err} <br /></small> : null}
                      <label className="mt-4 password-text-33">Password</label>
                      <div
                        className="col"
                        style={{ position: "relative", display: "block" }}
                      >
                        <input
                          className="form-control  input-dark"
                          type="password"
                          name="password"
                          id="password"
                          label="Password"
                          autoComplete="off"
                          value={formikPhNum.values.password}
                          onChange={formikPhNum.handleChange}
                          onBlur={formikPhNum.handleBlur}
                          error={formikPhNum.touched.password && Boolean(formikPhNum.errors.password)}
                          helperText={formikPhNum.touched.password && formikPhNum.errors.password}
                          ref={inputRef1}
                        />
                        <ReactPasswordToggleIcon
                          inputRef={inputRef1}
                          showIcon={showIcon}
                          hideIcon={hideIcon}
                        />
                      </div>
                      {formikPhNum.errors.password ? (
                        <small className="invalid-password error password-text-33">
                          {formikPhNum.errors.password} <br />
                        </small>
                      ) : null}
                    </>
                  )
                    :
                    (
                      <>
                        <div className="row mt-4">
                          <span className="phonenumber-change-text-2">
                            {otpShow === 1 ? "Enter OTP Code" : "Enter 2FA Code"}
                          </span>
                          <div className={"input-group "+(otpShow === 1 ? "resendOTP" : "")}>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="button-addon2"
                              id="otp"
                              name="otp"
                              autoComplete="off"
                              value={formikPhNum.values.otp}
                              onChange={formikPhNum.handleChange}
                              onBlur={formikPhNum.handleBlur}
                              error={formikPhNum.touched.otp && Boolean(formikPhNum.errors.otp)}
                              helperText={formikPhNum.touched.otp && formikPhNum.errors.otp}
                            />
                            {otpShow === 1 ? (
                              <button
                                id="button-addon2"
                                className="btn btn-phone-number-verification-code"
                                type="button"
                                disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                                onClick={() => {
                                  loginSubmit(formikPhNum.values, "resendOTP");
                                }}
                              >
                                Resend OTP{timer_resendOtp > 0 ? <span className="timeLeft">({timer_resendOtp}s)</span> : ""}
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                          <span className="phonenumber-change-text-3 text-muted">
                            {otpShow === 1 ?
                              tabname === "phoneno"
                                ?
                                "Enter OTP Code sent to Phone Number - " + showPhone(formikPhNum.values.phoneno)
                                :
                                ""
                              :
                              "Enter the 6-digit code from Google Authenticator"}
                          </span>
                          {formikPhNum.errors.otp ? (
                            <small className="invalid-otp error">
                              {formikPhNum.errors.otp} <br />
                            </small>
                          ) : null}
                        </div>
                      </>
                    )}
                  <button
                    type="submit"
                    className="btn text-white btn-col w-100 mt-4"
                    disabled={isLoading}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>

            <a
              href="javascript:void(0)"
              onClick={() => navigate("/register")}
              className="text-col mt-4 d-block"
            >
              <u className="password-text-33">Create a Exchange Site Account</u>
            </a>
          </div>
          <div className="col-lg-6 my-auto ">
            <center>
              <img className="resize-img " src={password2} alt="new" />
              <p>
                <b className="password-text-33 fw-bold">Forgot password Don't worry</b>
              </p>
              <p className="w-75">
                <small>
                  <a
                    href="javascript:void(0)"
                    onClick={() => navigate("/ForgotPassword")}
                    className="text-col mt-2 d-block"
                  >
                    <u className="password-text-33">Forgot password ?</u>
                  </a>
                </small>
              </p>
            </center>
          </div>
          <div className="col-12">
            <nav className="navbar mt-1 ">
              <div className="container-fluid justify-content-center">
                <div className="col-lg-6 text-lg-end text-center">
                  {/* © 2017 - 2022 ExchangeSite.com. All rights reserved */}
                  <b className="password-text-33 fw-bold">{siteSettings && siteSettings.copyRights}</b>
                </div>
                <div className="col-lg-6 text-lg-start text-center">
                  <span className="ms-lg-5 password-text-33 fw-bold">Cookie Preferences</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
