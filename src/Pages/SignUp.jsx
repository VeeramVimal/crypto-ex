import React, { useState, useEffect, useRef } from "react";
import NavbarOne from "./siteTheme/NavbarOne";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import { Country } from "country-state-city";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

import signupImg from "../assets/images/register/register.png";

import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { showEmail, showPhone } from "../core/helper/date-format";

import { useContextData } from '../core/context/index';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// import validator from 'validator';
import phone from 'phone';

import ReactPasswordToggleIcon from "react-password-toggle-icon";

import ReCAPTCHA from "react-google-recaptcha";

const countries = Country.getAllCountries();
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  terms: yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

const validationSchemaPhNum = yup.object({
  // phoneno: yup
  //   .required('Phone number is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  terms: yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

export default function SignUp(props) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { siteSettings } = useContextData();
  let inputRef_em = useRef();
  let inputRef_ph = useRef();

  const reCaptchaRef = useRef();

  const showIcon = () => <AiOutlineEyeInvisible aria-hidden="true" />;
  const hideIcon = () => <AiOutlineEye aria-hidden="true" />;

  const email = new URLSearchParams(search).get('email');
  const refer = new URLSearchParams(search).get('refer');

  const [showReferral, setshowReferral] = useState(false);
  const [showRegister, setshowRegister] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [phoneno, setphoneno] = useState('');
  const [phoneno_err, setphonenoerr] = useState('');
  const [tabname, setTabname] = useState('email');
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

  const HaveReferralCode = () => {
    setshowReferral(!showReferral);
  };

  useEffect(() => {
    if (refer) {
      setshowReferral(!showReferral);
    }
  }, [refer])

  const tabNameChange = async (val = "email") => {
    if (tabname != val) {
      setshowRegister(true);
      setTabname(val);
    }
  }

  const registerSubmit = async (values) => {
    let payload = Object.assign(
      values,
      {
        confirmPassword: values.password,
      }
    );
    if(Config.CAPTCHA_STATUS == "Enable") {
      const reCatpchaVal = await reCaptchaRef.current.executeAsync();
      payload.reCatpchaVal = reCatpchaVal;
    }
    const params = {
      url: `${Config.V1_API_URL}user/register`,
      method: 'POST',
      data: payload,
      options: {toastShow: true}
    }
    setisLoading(true);
    const response = (await makeRequest(params));
    if(Config.CAPTCHA_STATUS == "Enable") {
      await reCaptchaRef.current.reset();
    }
    setisLoading(false);
    let type = 'error';
    if (response.status) {
      type = 'success'
      setshowRegister(false);
      if (response.type) {
        navigate('/login?'+tabname);
      }
      setTimer_resendOtp(Config.timer.resendOtp);
    }
    toast({ type, message: response.message });
  }

  const formik = useFormik({
    initialValues: {
      email: email ?? "",
      password: "",
      confirmPassword: "",
      country: "",
      name: "",
      otp: "",
      referralId: refer ?? "",
      terms: false,
    },
    validationSchema: validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (values) => {
      registerSubmit(values);
    },
  });

  const formikPhNum = useFormik({
    initialValues: {
      phoneno: '',
      // phonecode: '+91',
      password: '',
      confirmPassword: '',
      country: 'IND',
      name: '',
      otp: '',
      referralId: refer ?? '',
      terms: false
    },
    validationSchema: validationSchemaPhNum,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (values) => {
      values.phoneno = phoneno;
      if (phoneno == "" || typeof phoneno == undefined) {
        setphonenoerr("Enter your phone number");
        return false;
      }
      const phoneDetail = phone(phoneno, { country: "" });

      // if(validator.isMobilePhone(phoneno) === false){
      //   setphonenoerr("Invalid phone number, Please enter correct phone number");
      //   return false;
      // }
      if (phoneDetail.isValid === false) {
        setphonenoerr("Invalid phone number, Please enter correct phone number");
        return false;
      }
      setphonenoerr("");

      values.phonecode = phoneDetail.countryCode ? phoneDetail.countryCode : "";
      values.country = phoneDetail.countryIso3 ? phoneDetail.countryIso3 : phoneDetail.countryIso2;
      registerSubmit(values);
    },
  });

  useEffect(() => {
    // if ((phoneno == "") || (typeof phoneno == "undefined") || (typeof phoneno == undefined)) {
    //   // setphonenoerr("Enter your phone number");
    // } else if(validator.isMobilePhone(phoneno) === false){
    //   setphonenoerr("Invalid phone number, Please enter correct phone number");
    // }
    // else {
    //   setphonenoerr("");
    // }
  }, [phoneno])

  return (
    <div>
      {/* <div className='bg-login-nav'><Link className="navbar-brand " to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link></div> */}
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      {/* phone-number-verification-change-top-banner */}
      <div className="container mt-5 register-section-top">
        <div className="row height-container">
          <div className="col-lg-6 my-auto">
            <h2 className="mb-3">Create Account</h2>
            {reCAPTCHAShow ?
            <ReCAPTCHA
              sitekey={Config.google.recaptcha.SITE_KEY}
              ref={reCaptchaRef}
              size="invisible"
            />:""}
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item " role="presentation">
                <button
                  className="btn btn-light password-text-33 fw-bold active border-0"
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
                  className="btn ms-3 btn-light border-0 password-text-33 fw-bold"
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
                className="tab-pane fade show active"
                id="pills-Email"
                role="tabpanel"
                aria-labelledby="pills-Email-tab"
                tabindex="0"
              >
                <form onSubmit={formik.handleSubmit}>
                  {showRegister ?
                  <>
                    <label className="password-text-33">Email</label>
                    <input
                      className="form-control  input-dark"
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    {formik.errors.email ? <small className="invalid-email error password-text-33">{formik.errors.email} <br /></small> : null}

                    <label className="mt-3 password-text-33">Password</label>
                    <div
                      className="col"
                      style={{ position: "relative", display: "block" }}
                    >
                      <input
                        className="form-control  input-dark"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        ref={inputRef_em}
                      />
                      <ReactPasswordToggleIcon
                        inputRef={inputRef_em}
                        showIcon={showIcon}
                        hideIcon={hideIcon}
                      />
                    </div>
                    {formik.errors.password ? <small className="invalid-password error password-text-33">{formik.errors.password} <br /></small> : null}

                    <label className="mt-3 password-text-33">Referral Id (Optional)</label>
                    <input
                      className="form-control  input-dark"
                      type="text"
                      id="referralId"
                      name="referralId"
                      label="Referral Code"
                      value={formik.values.referralId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.referralId && Boolean(formik.errors.referralId)}
                      helperText={formik.touched.referralId && formik.errors.referralId}
                    />
                    {formik.errors.referralId ? <small className="invalid-referralId error password-text-33">{formik.errors.referralId} <br /></small> : null}

                    <label className="form-check-label mt-3 password-text-33" for="flexCheckDefault">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id='terms'
                        name='terms'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.terms && Boolean(formik.errors.terms)}
                        helperText={formik.touched.terms && formik.errors.terms}
                      /> I have read and Agree to {Config.SITENAME}'s <a className="text-col" href="/terms" target="_blank">Terms of Services</a> and <a className="text-col" href="/privacy-policy" target="_blank">Privacy Policy</a>
                    </label>
                    <br />
                    {formik.errors.terms ? <small className="invalid-terms error password-text-33">{formik.errors.terms}</small> : null}
                  </>
                  :
                  <>
                    <div className="row mt-4">
                      <label className="mt-3">OTP</label>
                      <div className="input-group resendOTP">
                        <input
                          className="form-control "
                          type="text"
                          id="otp"
                          name="otp"
                          value={formik.values.otp}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.otp && Boolean(formik.errors.otp)}
                          helperText={formik.touched.otp && formik.errors.otp}
                        />
                        <button
                          id="button-addon2"
                          className="btn btn-phone-number-verification-code"
                          type="button"
                          disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                          onClick={() =>
                            registerSubmit(formik.values, "resendOTP")
                          }
                        >
                          Resend OTP{timer_resendOtp > 0 ? <span className="timeLeft">({timer_resendOtp})</span> : ""}
                        </button>
                      </div>
                    </div>
                    <span className="phonenumber-change-text-3 text-muted">
                      {
                        tabname === "email"
                          ?
                          "Enter OTP Code sent to E-mail - " + showEmail(formik.values.email)
                          :
                          ""
                      }
                    </span>
                    {formik.errors.otp ? <small className="invalid-otp error">{formik.errors.otp} <br /></small> : null}
                  </>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn text-white btn-col w-100 mt-4"
                  >
                    Create Account
                  </button>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="pills-PhoneNumber"
                role="tabpanel"
                aria-labelledby="pills-PhoneNumber-tab"
                tabindex="0"
              >
                <form onSubmit={formikPhNum.handleSubmit}>
                  {showRegister ?
                  <>
                    <label className="password-text-33">Phone Number</label>
                    {/* <div className="input-group mb-3"> */}
                      <PhoneInput
                        international
                        className="px-0"
                        name="phoneno"
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        onChange={setphoneno}
                        value={formikPhNum.values.phoneno}
                        autoComplete="off"
                        onBlur={formikPhNum.handleBlur}
                        style={{ border: "none" }}
                      />
                    {/* </div> */}
                    {phoneno_err ? <small className="invalid-phoneno error password-text-33">{phoneno_err} <br /></small> : null}

                    <label className=" password-text-33">Password</label>
                    <div
                      className="col"
                      style={{ position: "relative", display: "block" }}
                    >
                      <input
                        className="form-control  input-dark"
                        type="password"
                        name="password"
                        value={formikPhNum.values.password}
                        onChange={formikPhNum.handleChange}
                        onBlur={formikPhNum.handleBlur}
                        error={formikPhNum.touched.password && Boolean(formikPhNum.errors.password)}
                        helperText={formikPhNum.touched.password && formikPhNum.errors.password}
                        ref={inputRef_ph}
                      />
                      <ReactPasswordToggleIcon
                        inputRef={inputRef_ph}
                        showIcon={showIcon}
                        hideIcon={hideIcon}
                      />
                    </div>
                    {formikPhNum.errors.password ? <small className="invalid-password error password-text-33">{formikPhNum.errors.password} <br /></small> : null}

                    <label className="mt-3 password-text-33">Referral Id (Optional)</label>
                    <input
                      className="form-control "
                      type="text"
                      id="referralId"
                      name="referralId"
                      label="Referral Code"
                      value={formikPhNum.values.referralId}
                      onChange={formikPhNum.handleChange}
                      onBlur={formikPhNum.handleBlur}
                      error={formikPhNum.touched.referralId && Boolean(formikPhNum.errors.referralId)}
                      helperText={formikPhNum.touched.referralId && formikPhNum.errors.referralId}
                    />
                    {formikPhNum.errors.email ? <small className="invalid-email error">{formikPhNum.errors.email} <br /></small> : null}

                    <label className="form-check-label mt-3 password-text-33" for="flexCheckDefault">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id='terms'
                        name='terms'
                        onChange={formikPhNum.handleChange}
                        onBlur={formikPhNum.handleBlur}
                        error={formikPhNum.touched.terms && Boolean(formikPhNum.errors.terms)}
                        helperText={formikPhNum.touched.terms && formikPhNum.errors.terms}
                      /> I have read and Agree to {Config.SITENAME}'s <a className="text-col" href="/terms" target="_blank">Terms of Services</a> and <a className="text-col" href="/privacy-policy" target="_blank">Privacy Policy</a>
                    </label><br />
                    {formikPhNum.errors.terms ? <small className="invalid-terms error password-text-33">{formikPhNum.errors.terms}</small> : null}
                  </>
                  :
                  <>
                    <div className="row mt-4">
                      <label className="mt-3">OTP</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          id="otp"
                          name="otp"
                          value={formikPhNum.values.otp}
                          onChange={formikPhNum.handleChange}
                          onBlur={formikPhNum.handleBlur}
                          error={formikPhNum.touched.otp && Boolean(formikPhNum.errors.otp)}
                          helperText={formikPhNum.touched.otp && formikPhNum.errors.otp}
                        />
                        <button
                          id="button-addon2"
                          className="btn btn-phone-number-verification-code"
                          type="button"
                          disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                          onClick={() =>
                            registerSubmit(formikPhNum.values, "resendOTP")
                          }
                        >
                          Resend OTP{timer_resendOtp > 0 ? <span className="timeLeft">({timer_resendOtp})</span> : ""}
                        </button>
                      </div>
                    </div>
                    <span className="phonenumber-change-text-3 text-muted">
                      {
                        tabname === "email"
                          ?
                          ""
                          :
                          "Enter OTP Code sent to Phone Number - " + showPhone(formikPhNum.values.phoneno)
                      }
                    </span>
                    {formikPhNum.errors.otp ? <small className="invalid-otp error">{formikPhNum.errors.otp} <br /></small> : null}
                  </>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn text-white btn-col w-100 mt-4"
                  >
                    Create Account
                  </button>
                  {/* <p className="w-75 mt-2">
                    <small>
                      Not looking for personal account?{" "}
                      <a href="" className="text-col ">
                        <u>Sign Up for an Entity account</u>
                      </a>
                    </small>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 my-auto d-lg-block d-none">
            <center>
              <img src={signupImg} alt="new" />
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
