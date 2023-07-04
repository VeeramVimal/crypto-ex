import React, { useState, useEffect, useRef } from "react";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import "react-phone-number-input/style.css";
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useContextData } from '../../core/context/index'
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config/";
import { showEmail,showPhone } from '../../core/helper/date-format';
import { BrowserRouter as Router,useNavigate } from "react-router-dom";
import { GoChevronLeft } from 'react-icons/go';

import ReCAPTCHA from "react-google-recaptcha";

export default function Phonenumberverificationchange(props) {
  const navigate = useNavigate();
  const reCaptchaRef = useRef();
  const { myProfile, setUserProfile, siteSettings } = useContextData();
  const [newPhoneno, setnewphoneNo] = useState('');
  const [newphoneno_err, setnewphonenoerr] = useState('');
  const [newphoneStatus, setnewphonenoStatus] = useState(true);
  const [emailStatus, setemailStatus] = useState(true);

  const [isLoading, setisLoading] = useState(false);

  const [timer_oldEmailOTP, setTimer_oldEmailOTP] = useState(0);
  const [timer_oldPhoneOTP, setTimer_oldPhoneOTP] = useState(0);
  const [timer_newEmailOTP, setTimer_newEmailOTP] = useState(0);
  const [timer_newPhoneOTP, setTimer_newPhoneOTP] = useState(0);

  const [reCAPTCHAShow, setReCAPTCHAShow] = useState(false);

  useEffect(() => {
    setTimeout(async() => {
      if(Config.CAPTCHA_STATUS == "Enable") {
        setReCAPTCHAShow(true);
        if(reCaptchaRef && reCaptchaRef.current) {
          await reCaptchaRef.current.reset();
        }
      }
    }, 2000);
  }, []);

  useEffect(() => {
    timer_oldEmailOTP > 0 && setTimeout(() => setTimer_oldEmailOTP(timer_oldEmailOTP - 1), 1000);
  }, [timer_oldEmailOTP]);

  useEffect(() => {
    timer_oldPhoneOTP > 0 && setTimeout(() => setTimer_oldPhoneOTP(timer_oldPhoneOTP - 1), 1000);
  }, [timer_oldPhoneOTP]);

  useEffect(() => {
    timer_newEmailOTP > 0 && setTimeout(() => setTimer_newEmailOTP(timer_newEmailOTP - 1), 1000);
  }, [timer_newEmailOTP]);

  useEffect(() => {
    timer_newPhoneOTP > 0 && setTimeout(() => setTimer_newPhoneOTP(timer_newPhoneOTP - 1), 1000);
  }, [timer_newPhoneOTP]);

  const validationSchema = yup.object().shape({
    newEmail: yup
      .string('Please enter your email')
      .email('Enter a valid email')
      .required('Please enter your email'),
    newEmailOTP: yup
      .string('Please enter a valid email verification code.')
      .required('Please enter a valid email verification code.'),
    oldEmailOTP: (myProfile && myProfile.email !== "" && myProfile.email !== undefined)
      ?
      yup
        .string('Please enter a 6-digit verification code.')
        .required('Enter the 6-digit code')
      :
      yup.string(),
    oldPhonenoOTP: (myProfile && myProfile.phoneno !== "" && myProfile.phoneno !== undefined)
      ?
      yup
        .string('Please enter a 6-digit verification code.')
        .required('Enter the 6-digit code')
        .max(6, 'Please enter the correct SMS code')
      :
      yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      newEmail: '',
      newEmailOTP: '',
      oldPhonenoOTP: '',
      oldEmailOTP: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let payload = {
        pageName: "changeEmail",
        newEmailOTP: values.newEmailOTP,
        newEmail: values.newEmail,
        oldEmailOTP: values.oldEmailOTP,
        oldPhonenoOTP: values.oldPhonenoOTP
      }

      if(Config.CAPTCHA_STATUS == "Enable") {
        const reCatpchaVal = await reCaptchaRef.current.executeAsync();
        payload.reCatpchaVal = reCatpchaVal;
      }
      const params = {
        url: `${Config.V2_API_URL}user/changeVerificationDetail`,
        method: 'POST',
        data: payload
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      if(Config.CAPTCHA_STATUS == "Enable") {
        await reCaptchaRef.current.reset();
      }
      setisLoading(false);
      let type = 'error';
      if (response.status) {
        type = "success";
        setUserProfile();
        navigate("/my/profile");
      }
      toast({ type, message: response.message });
    },
  });

  async function getCode(data) {
    try {
      let payload = {
        pageName: "changeEmail",
        target: data.target
      };
      if (data.target == "newEmailOTP") {
        payload.newEmail = data.value;
      }
      else if (data.target == "oldEmailOTP") {
        payload.oldEmailOTP = data.value;
      }
      const params = {
        url: `${Config.V2_API_URL}otp/getCode`,
        method: 'POST',
        data: payload
      }
      if(Config.CAPTCHA_STATUS == "Enable") {
        const reCatpchaVal = await reCaptchaRef.current.executeAsync();
        payload.reCatpchaVal = reCatpchaVal;
      }
      setisLoading(true);
      const response = (await makeRequest(params));
      if(Config.CAPTCHA_STATUS == "Enable") {
        await reCaptchaRef.current.reset();
      }
      setisLoading(false);
      let type = 'error';
      if (response.status) {
        type = "success";
        if (data.target == "oldEmailOTP") {
          setTimer_oldEmailOTP(Config.timer.resendOtp);
        }
        else if (data.target == "oldPhoneOTP") {
          setTimer_oldPhoneOTP(Config.timer.resendOtp);
        }
        else if (data.target == "newEmailOTP") {
          setTimer_newEmailOTP(Config.timer.resendOtp);
        }
      }
      toast({ type, message: response.message });
    } catch (err) { }
  }

  async function backButton(){
    try {
     const length = window.history.length;
     if (length > 1) {
       window.history.back();
     } else {
       navigate("/");
     }
    } catch (err){}
  }

  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <section className="py-5 phone-number-verification-change-top-banner">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-6" onClick={()=>backButton()}>
            <GoChevronLeft className="deposit-back-button-icon" />
            <span className="deposit-text-1">Security</span>
          </div>
        </div>
        </div>
        <div className="container-fluid">
          {reCAPTCHAShow ?
          <ReCAPTCHA
            sitekey={Config.google.recaptcha.SITE_KEY}
            ref={reCaptchaRef}
            size="invisible"
          />:""}
          <form onSubmit={formik.handleSubmit}>
            <div className="row align-items-center justify-content-center g-4">
              <div className="col-lg-4 bg-dnger">
                <h2 className="text-center mb-5"> {(myProfile && (myProfile.email === undefined || myProfile.email == '')) ? "Enable" : "Change"} Email Verification</h2>
                <h5 className="phonenumber-change-text-1 mb-4">
                  New Email Verification
                </h5>
                <div className="row mt-4">
                  <span className="phonenumber-change-text-2">
                    New Email
                  </span>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="button-addon2"
                      id="newEmail"
                      name='newEmail'
                      autoComplete='off'
                      value={formik.values.newEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
                      helperText={formik.touched.newEmail && formik.errors.newEmail}
                    />
                    <button
                      className="btn btn-phone-number-verification-code"
                      type="button"
                      id="button-addon2"
                      onClick={() => getCode({ target: "newEmailOTP", value: formik.values.newEmail })}
                      disabled={(isLoading || timer_newEmailOTP > 0 || formik.errors.newEmail || formik.values.newEmail == "") ? true : false}
                    >
                      Get Code{timer_newEmailOTP > 0 ? <span className="timeLeft">({timer_newEmailOTP})</span> : ""}
                    </button>
                  </div>
                  {formik.errors.newEmail ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.newEmail}</span> : null}
                </div>

                <div className="row mt-4">
                  <span className="phonenumber-change-text-2">
                    New Email Verification Code
                  </span>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-input"
                      aria-describedby="button-addon2"
                      id="newEmailOTP"
                      name='newEmailOTP'
                      autoComplete='off'
                      value={formik.values.newEmailOTP}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.newEmailOTP && Boolean(formik.errors.newEmailOTP)}
                      helperText={formik.touched.newEmailOTP && formik.errors.newEmailOTP}
                    />

                  </div>
                  {formik.errors.newEmailOTP ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.newEmailOTP}</span> : null}
                </div>

                {myProfile && myProfile._id && <h5 className="phonenumber-change-text-1 mb-4 mt-5">
                  Security Verification
                </h5>}
                {(myProfile && myProfile.phoneno !== "" && myProfile.phoneno !== undefined) &&
                  <div className="row mt-4">
                    <span className="phonenumber-change-text-2">
                      Phone Number Verification Code
                    </span>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="button-addon2"
                        id="oldPhonenoOTP"
                        name='oldPhonenoOTP'
                        autoComplete='off'
                        value={formik.values.oldPhonenoOTP}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldPhonenoOTP && Boolean(formik.errors.oldPhonenoOTP)}
                        helperText={formik.touched.oldPhonenoOTP && formik.errors.oldPhonenoOTP}
                      />
                      <button
                        className="btn btn-phone-number-verification-code"
                        type="button"
                        id="button-addon2"
                        onClick={() => getCode({ target: "oldPhoneOTP", value: myProfile && myProfile.phoneno })}
                        disabled={(isLoading || timer_oldPhoneOTP > 0) ? true : false}
                      >
                        Get Code{timer_oldPhoneOTP > 0 ? <span className="timeLeft">({timer_oldPhoneOTP})</span> : ""}
                      </button>
                    </div>
                    {myProfile && myProfile.phoneno &&
                      <span className="phonenumber-change-text-3 text-muted">
                        {"Enter the 6-digit code sent to " + showPhone(myProfile && myProfile.phoneno)}
                      </span>
                    }
                    {formik.errors.oldPhonenoOTP ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.oldPhonenoOTP}</span> : null}
                  </div>
                }
                {(myProfile && myProfile.email !== "" && myProfile.email !== undefined) &&
                  <div className="row mt-4">
                    <span className="phonenumber-change-text-2">
                      Email Verification Code
                    </span>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="button-addon2"
                        id="oldEmailOTP"
                        name='oldEmailOTP'
                        autoComplete='off'
                        // disabled={emailStatus}
                        value={formik.values.oldEmailOTP}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldEmailOTP && Boolean(formik.errors.oldEmailOTP)}
                        helperText={formik.touched.oldEmailOTP && formik.errors.oldEmailOTP}
                      />
                      <button
                        className="btn btn-phone-number-verification-code"
                        type="button"
                        id="button-addon2"
                        onClick={() => getCode({ target: "oldEmailOTP" })}
                        disabled={(isLoading || timer_oldEmailOTP > 0) ? true : false}
                      >
                        Get Code{timer_oldEmailOTP > 0 ? <span className="timeLeft">({timer_oldEmailOTP})</span> : ""}
                      </button>
                    </div>
                    <span className="phonenumber-change-text-3 text-muted">
                      {"Enter the 6-digit code sent to " + showEmail(myProfile && myProfile.email)}
                    </span>
                    {formik.errors.oldEmailOTP ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.oldEmailOTP}</span> : null}
                  </div>
                }

                <div className="d-grid mt-5">
                  <button
                    className="btn phone-number-verification-submit-button"
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
