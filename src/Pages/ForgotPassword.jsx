import React, { useState, useEffect, useRef } from "react";
import NavbarOne from "./siteTheme/NavbarOne";
import { useContextData } from '../core/context/index';

import Forgot_password from "../assets/images/password (1).png";
import OTPimg from "../assets/images/mail (1).png";
import PasswordChange from "../assets/images/change password.png";

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

import ReactPasswordToggleIcon from "react-password-toggle-icon";

import validator from 'validator';
import phone from 'phone';

import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config";

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { showEmail, showPhone } from '../core/helper/date-format';

import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = yup.object({
  email: yup
    .string('Enter your Email / Phone Number')
    // .email('Enter a valid email')
    .required('This field is required'),
});

const validationSchemaotp = yup.object({
  resetPasswordCode: yup
    .string('Enter your OTP')
    .required('OTP is required'),
});

const validationSchemaresetpwd = yup.object({
  // oldPassword: yup
  //   .string('Enter your old password')
  //   .required('Old Password is required'),
  newPassword: yup
    .string('Enter your new password')
    .required('New Password is required')
    // .oneOf([yup.ref('oldPassword'), !null], 'New password must be different than the old one')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string('Enter your confirm password')
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword'), null], 'Password and Confirm Passwords does not match')
});

const validationSchemaPhNum = yup.object({
  phoneno: yup
    .number()
    .typeError("Enter your phone number")
});
export default function ForgotPassword(props) {

  const { siteSettings, myProfile } = useContextData();
  const navigate = useNavigate();

  let inputRef_one = useRef();
  let inputRef_two = useRef();
  const reCaptchaRef = useRef();

  const showIcon = () => <AiOutlineEyeInvisible aria-hidden="true" />;
  const hideIcon = () => <AiOutlineEye aria-hidden="true" />;

  const [isLoading, setisLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const [phonenoerr, setphonenoerr] = useState('');
  const [phoneno_err, setphoneno_err] = useState('');
  const [phoneno, setphoneno] = useState('');
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

  const tabNameChange = async (val = "email") => {
    if (tabname != val) {
      setFormStep(1);
      setTabname(val);
    }
  }

  const forgotSubmit = async (values = {}, target = "submit") => {
    if(Config.CAPTCHA_STATUS == "Enable") {
      const reCatpchaVal = await reCaptchaRef.current.executeAsync();
      values.reCatpchaVal = reCatpchaVal;
    }

    const params = {
      url: `${Config.V2_API_URL}user/forgotPassword`,
      method: 'POST',
      body: values
    }
    setisLoading(true);
    const response = (await makeRequest(params));
    if(Config.CAPTCHA_STATUS == "Enable") {
      await reCaptchaRef.current.reset();
    }
    setisLoading(false);
    let type = 'error'
    if (response.status) {
      type = 'success';
      setFormStep(2);
      setTimer_resendOtp(Config.timer.resendOtp);
    }
    toast({ type, message: response.message });
  }

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      forgotSubmit(values);
    },
  });

  const formikPhNum = useFormik({
    initialValues: {
      phoneno: ""
    },
    validationSchema: validationSchemaPhNum,
    onSubmit: async (values) => {
      if (phoneno == "" || typeof phoneno == undefined) {
        setphoneno_err("Enter your phone number");
        return false;
      }
      const phoneDetail = phone(phoneno, { country: "" });
      if (phoneDetail.isValid === false) {
        setphoneno_err("Invalid phone number, Please enter correct phone number");
        return false;
      }
      values.phoneno = phoneno;
      setphoneno_err("");
      forgotSubmit(values);
    },
  });

  const formikotp = useFormik({
    initialValues: {
      resetPasswordCode: ''
    },
    validationSchema: validationSchemaotp,
    onSubmit: async (values) => {
      const params = {
        url: `${Config.V2_API_URL}user/forgotPasswordChk`,
        method: 'POST',
        body: {
          email: formik.values.email,
          phoneno: formikPhNum.values.phoneno,
          resetPasswordCode: formikotp.values.resetPasswordCode
        }
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      setisLoading(false);
      let type = 'error'
      if (response.status) {
        type = 'success';
        setFormStep(3);
      }
      toast({ type, message: response.message });
    },
  });

  const formikresetpwd = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchemaresetpwd,
    onSubmit: async (values) => {
      const params = {
        url: `${Config.V2_API_URL}user/resetPassword`,
        method: 'POST',
        body: {
          email: formik.values.email,
          phoneno: formikPhNum.values.phoneno,
          resetPasswordCode: formikotp.values.resetPasswordCode,
          newPassword: formikresetpwd.values.newPassword,
          confirmPassword: formikresetpwd.values.confirmPassword,
        }
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      setisLoading(false);
      let type = 'error';
      if (response.status === true) {
        type = 'success';
        navigate("/login");
      }
      toast({ type, message: response.message });
    },
  });

  useEffect(() => {
    // const emailVal = formik.values.email;
    // if(isNaN(emailVal) === false) {
    //   if ((emailVal == "") || (typeof emailVal == "undefined") || (typeof emailVal == undefined)) {
    //     // setphonenoerr("Enter your phone number");
    //   } else if(validator.isMobilePhone(emailVal) === false){
    //     setphonenoerr("Invalid phone number, Please enter correct phone number");
    //   }
    //   else {
    //     setphonenoerr("");
    //   }
    // }
    // else {
    //   setphonenoerr("");
    // }
  }, [formik.values]);

  return (
    <div>
      {/* <div className='bg-login-nav'><Link className="navbar-brand " to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link></div> */}
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="container mt-5">
        <div className="row height-container">
          {formStep === 1 &&
            <div className="col-lg-6 my-auto text-center">
              <h4>Forgot Password ? Don't Worry</h4>
              <img
                className="img-f-Pass mt-4"
                src={Forgot_password}
                alt="Forgot_password"
              />
            </div>
          }
          {formStep === 2 &&
            <div className="col-lg-6 my-auto">
              <h4>Kindly check your email/mobile</h4>
              <img
                className="img-f-Pass mt-4"
                src={PasswordChange}
                alt="OTPimg"
              />
            </div>
          }
          {formStep === 3 &&
            <div className="col-lg-6 my-auto">
              <h4 className="text-start">Change Password</h4>
              <img
                className="img-f-Pass mt-4"
                src={OTPimg}
                alt="PasswordChange"
              />
            </div>
          }
          <div className="col-lg-6 my-auto ">
            {reCAPTCHAShow ?
            <ReCAPTCHA
              sitekey={Config.google.recaptcha.SITE_KEY}
              ref={reCaptchaRef}
              size="invisible"
            />:""}
            <center>
              {formStep === 1 &&
                <>
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
                        <label className="mt-3 password-text-33">Email</label>
                        <input
                          className="form-control input-dark mt-1"
                          type="text"
                          name="email"
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
                            phonenoerr
                              ?
                              <small className="invalid-phoneno error password-text-33">{phonenoerr} <br /></small> : null}
                        <button
                          type="submit" disabled={isLoading}
                          className="btn text-white btn-next w-100 mt-4"
                        >
                          Generate OTP
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
                        <label className="mt-3 password-text-33"> Phone Number </label>
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
                        <button
                          type="submit" disabled={isLoading}
                          className="btn text-white btn-next w-100 mt-4"
                        >
                          Generate OTP
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              }

              {formStep === 2 &&
                <form onSubmit={formikotp.handleSubmit}>
                  <div className="row mt-4">
                    <label className="mt-3 password-text-33">Enter OTP</label>
                    <div className="input-group resendOTP">
                      <input
                        className="form-control input-dark"
                        type="text"
                        name="resetPasswordCode"
                        autoComplete="off"
                        value={formikotp.values.resetPasswordCode}
                        onChange={formikotp.handleChange}
                        onBlur={formikotp.handleBlur}
                        error={formikotp.touched.resetPasswordCode && Boolean(formikotp.errors.resetPasswordCode)}
                        helperText={formikotp.touched.resetPasswordCode && formikotp.errors.resetPasswordCode}
                      />
                      <button
                        id="button-addon2"
                        className="btn btn-phone-number-verification-code"
                        type="button"
                        disabled={(isLoading || timer_resendOtp > 0) ? true : false}
                        onClick={() =>
                          forgotSubmit(formik.values, "resendOTP")
                        }
                      >
                        Resend OTP{timer_resendOtp > 0 ? <span className="timeLeft">({timer_resendOtp})</span> : ""}
                      </button>
                    </div>
                  </div>
                  {
                    formik.values.email != "" ?
                      <>
                        <span>Enter OTP code sent to E-mail - {showEmail(formik.values.email)}</span><br />
                        {formikotp.errors.resetPasswordCode &&
                          <small className="invalid-resetPasswordCode error password-text-33">{"E-mail " + formikotp.errors.resetPasswordCode} <br /></small>
                        }
                      </>
                      :
                      formik.values.phoneno != "" ?
                        <>
                          <span>Enter OTP code sent to Phone number - {showPhone(formikPhNum.values.phoneno)}</span><br />
                          {formikotp.errors.resetPasswordCode &&
                            <small className="invalid-resetPasswordCode error password-text-33">{"Phone number " + formikotp.errors.resetPasswordCode} <br /></small>
                          }
                        </>
                        :
                        <>
                          <small className="invalid-resetPasswordCode error password-text-33">{formikotp.errors.resetPasswordCode} <br /></small>
                        </>
                  }
                  <button
                    type="submit" disabled={isLoading}
                    className="btn text-white btn-next w-100 mt-4"
                  >
                    Verify OTP
                  </button>
                </form>
              }

              {formStep === 3 &&
                <form onSubmit={formikresetpwd.handleSubmit}>
                  <label className="mt-3 password-text-33">New Password</label>
                  <div
                    className="col"
                    style={{ position: "relative", display: "block" }}
                  >
                    <input
                      className="form-control input-dark mt-1"
                      type="password"
                      name="newPassword"
                      autoComplete="off"
                      value={formikresetpwd.values.newPassword}
                      onChange={formikresetpwd.handleChange}
                      onBlur={formikresetpwd.handleBlur}
                      error={formikresetpwd.touched.newPassword && Boolean(formikresetpwd.errors.newPassword)}
                      helperText={formikresetpwd.touched.newPassword && formikresetpwd.errors.newPassword}
                      ref={inputRef_one}
                    />
                    <ReactPasswordToggleIcon
                      inputRef={inputRef_one}
                      showIcon={showIcon}
                      hideIcon={hideIcon}
                    />
                  </div>
                  {formikresetpwd.errors.newPassword ? <small className="invalid-newPassword error password-text-33">{formikresetpwd.errors.newPassword} <br /></small> : null}
                  <label className="mt-3">Confirm Password</label>
                  <div
                    className="col"
                    style={{ position: "relative", display: "block" }}
                  >
                    <input
                      className="form-control input-dark mt-1"
                      type="password"
                      name="confirmPassword"
                      autoComplete="off"
                      value={formikresetpwd.values.confirmPassword}
                      onChange={formikresetpwd.handleChange}
                      onBlur={formikresetpwd.handleBlur}
                      error={formikresetpwd.touched.confirmPassword && Boolean(formikresetpwd.errors.confirmPassword)}
                      helperText={formikresetpwd.touched.confirmPassword && formikresetpwd.errors.confirmPassword}
                      ref={inputRef_two}
                    />
                    <ReactPasswordToggleIcon
                      inputRef={inputRef_two}
                      showIcon={showIcon}
                      hideIcon={hideIcon}
                    />
                  </div>
                  {formikresetpwd.errors.confirmPassword ? <small className="invalid-confirmPassword error password-text-33">{formikresetpwd.errors.confirmPassword} <br /></small> : null}
                  <button
                    type="submit" disabled={isLoading}
                    className="btn text-white btn-next w-100 mt-4"
                  >
                    Reset Password
                  </button>
                </form>
              }
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
