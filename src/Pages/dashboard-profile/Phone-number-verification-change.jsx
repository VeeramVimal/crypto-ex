import React, { useState, useEffect, useRef } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import * as yup from "yup";
import { useFormik } from "formik";

import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";

import { useContextData } from "../../core/context/index";
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config/";
import { showEmail, showPhone } from "../../core/helper/date-format";
import { useNavigate } from "react-router-dom";

import validator from "validator";
import phone from "phone";
import { GoChevronLeft } from "react-icons/go";

import ReCAPTCHA from "react-google-recaptcha";

// const validationSchema = yup.object({
//   newPhoneOTP: yup
//     .string('Please enter your SMS authentication code')
//     .required('Please enter your SMS authentication code')
//     .max(6, 'Please enter the correct SMS code'),
//   // oldEmailOTP: yup
//   // .string('Please enter a 6-digit verification code.')
//   // .required('Enter the 6-digit code'),
// });

export default function Phonenumberverificationchange(props) {
  const navigate = useNavigate();
  const reCaptchaRef = useRef();
  const { myProfile, setUserProfile } = useContextData();
  const [newPhoneno, setnewphoneNo] = useState("");
  const [newphoneno_err, setnewphonenoerr] = useState("");

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
    timer_oldEmailOTP > 0 &&
      setTimeout(() => setTimer_oldEmailOTP(timer_oldEmailOTP - 1), 1000);
  }, [timer_oldEmailOTP]);

  useEffect(() => {
    timer_oldPhoneOTP > 0 &&
      setTimeout(() => setTimer_oldPhoneOTP(timer_oldPhoneOTP - 1), 1000);
  }, [timer_oldPhoneOTP]);

  useEffect(() => {
    timer_newEmailOTP > 0 &&
      setTimeout(() => setTimer_newEmailOTP(timer_newEmailOTP - 1), 1000);
  }, [timer_newEmailOTP]);

  useEffect(() => {
    timer_newPhoneOTP > 0 &&
      setTimeout(() => setTimer_newPhoneOTP(timer_newPhoneOTP - 1), 1000);
  }, [timer_newPhoneOTP]);

  const validationSchema = yup.object().shape({
    newPhoneOTP: yup
      .string("Please enter your SMS authentication code")
      .required("Please enter your SMS authentication code")
      .max(6, "Please enter the correct SMS code"),
    oldEmailOTP:
      myProfile && myProfile.email !== "" && myProfile.email !== undefined
        ? yup
            .string("Please enter a 6-digit verification code.")
            .required("Enter the 6-digit code")
        : yup.string(),
    oldPhonenoOTP:
      myProfile && myProfile.phoneno !== "" && myProfile.phoneno !== undefined
        ? yup
            .string("Please enter a 6-digit verification code.")
            .required("Enter the 6-digit code")
            .max(6, "Please enter the correct SMS code")
        : yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      newPhoneno: "",
      newPhoneOTP: "",
      oldEmailOTP: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.newPhoneno = newPhoneno;
      let payload = {
        pageName: "changePhoneNumber",
        newPhonenoOTP: values.newPhoneOTP,
        newPhoneno: values.newPhoneno,
        oldPhonenoOTP: values.oldPhonenoOTP,
        oldEmailOTP: values.oldEmailOTP,
      };
      if (
        newPhoneno == "" ||
        typeof newPhoneno == "undefined" ||
        newPhoneno == undefined
      ) {
        setnewphonenoerr("Please enter a valid phone number.");
        return false;
      } else {
        const phoneDetail = phone(newPhoneno, { country: "" });
        if (phoneDetail.isValid === false) {
          setnewphonenoerr(
            "Invalid phone number, Please enter correct phone number"
          );
          return false;
        }
        payload.phonecode = phoneDetail.countryCode
          ? phoneDetail.countryCode
          : "";
        payload.country = phoneDetail.countryIso3
          ? phoneDetail.countryIso3
          : phoneDetail.countryIso2;
      }
      setnewphonenoerr("");
      if(Config.CAPTCHA_STATUS == "Enable") {
        const reCatpchaVal = await reCaptchaRef.current.executeAsync();
        payload.reCatpchaVal = reCatpchaVal;
      }
      const params = {
        url: `${Config.V2_API_URL}user/changeVerificationDetail`,
        method: "POST",
        data: payload,
      };
      setisLoading(true);
      const response = await makeRequest(params);
      if(Config.CAPTCHA_STATUS == "Enable") {
        await reCaptchaRef.current.reset();
      }
      setisLoading(false);
      if (response.status) {
        let type = "success";
        toast({ type, message: response.message });
        setUserProfile();
        navigate("/my/profile");
      } else {
        let type = "error";
        toast({ type, message: response.message });
      }
    },
  });

  async function getCode(data, code = "") {
    try {
      let payload = {
        pageName: "changePhoneNumber",
      };
      if (data.target == "newPhoneOTP") {
        const phoneDetail = phone(newPhoneno, { country: "" });
        if (phoneDetail.isValid === false) {
          setnewphonenoerr(
            "Invalid phone number, Please enter correct phone number"
          );
          return false;
        }
        payload.newPhoneno = newPhoneno;
        payload.newPhoneOTP = code;
      } else if (data.target == "newEmailOTP") {
        payload.oldEmailOTP = code;
      } else if (data.target == "oldEmailOTP") {
        payload.oldEmailOTP = code;
      }
      payload.target = data.target;
      if(Config.CAPTCHA_STATUS == "Enable") {
        const reCatpchaVal = await reCaptchaRef.current.executeAsync();
        payload.reCatpchaVal = reCatpchaVal;
      }
      const params = {
        url: `${Config.V2_API_URL}otp/getCode`,
        method: "POST",
        data: payload,
      };
      setisLoading(true);
      const response = await makeRequest(params);
      if(Config.CAPTCHA_STATUS == "Enable") {
        await reCaptchaRef.current.reset();
      }
      setisLoading(false);
      let type = "error";
      if (response.status) {
        type = "success";
        if (data.target == "oldEmailOTP") {
          setTimer_oldEmailOTP(Config.timer.resendOtp);
        } else if (data.target == "oldPhoneOTP") {
          setTimer_oldPhoneOTP(Config.timer.resendOtp);
        } else if (data.target == "newEmailOTP") {
          setTimer_newEmailOTP(Config.timer.resendOtp);
        } else if (data.target == "newPhoneOTP") {
          setTimer_newPhoneOTP(Config.timer.resendOtp);
        }
      }
      toast({ type, message: response.message });
    } catch (err) {}
  }

  useEffect(() => {
    if (
      newPhoneno == "" ||
      typeof newPhoneno == "undefined" ||
      newPhoneno == undefined
    ) {
      // setnewphonenoerr("Enter your phone number");
    }
    // if (newPhoneno == "") {
    //   setnewphonenoerr("Enter your phone number");
    // }
    else if (validator.isMobilePhone(newPhoneno) === false) {
      setnewphonenoerr(
        "Invalid phone number, Please enter correct phone number"
      );
    } else {
      setnewphonenoerr("");
    }
  }, [newPhoneno]);

  async function backButton() {
    try {
      const length = window.history.length;
      if (length > 1) {
        window.history.back();
      } else {
        navigate("/");
      }
    } catch (err) {}
  }

  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <section className="py-5 phone-number-verification-change-top-banner phone-number-verification-change-top-banner-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-6" onClick={() => backButton()}>
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
            {/* min-vh-100 */}
            <div className="row align-items-center justify-content-center g-4">
              <div className="col-lg-4 bg-dnger">
                <h2 className="text-center mb-5">{myProfile?.phoneno == '' ? "Enable" : "Change"} Phone Number Verification</h2>
                <h5 className="phonenumber-change-text-1 mb-4">
                  New Phone Number Verification
                </h5>
                <div className="row">
                  <span className="phonenumber-change-text-2">
                    New Phone Number
                  </span>
                  <div className=" ">
                    <div className="d-flex input-group border justify-content-between">
                      <PhoneInput
                        className=" form-control border-none"
                        international
                        name="newPhoneno"
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        onChange={setnewphoneNo}
                        value={formik.values.newPhoneno}
                        autoComplete="off"
                        onBlur={formik.handleBlur}
                      />
                      <button
                        className="btn btn-phone-number-verification-code border-none"
                        type="button"
                        id="button-addon2"
                        onClick={() => getCode({ target: "newPhoneOTP" })}
                        disabled={
                          (isLoading || timer_newPhoneOTP > 0 || newphoneno_err != "" || newPhoneno == "") ? true : false
                        }
                        //  disabled={isLoading}
                      >
                        Get Code
                        {timer_newPhoneOTP > 0 ? (
                          <span className="timeLeft">
                            ({timer_newPhoneOTP})
                          </span>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {newphoneno_err ? (
                  <span className="phonenumber-change-text-3 text-muted error">
                    {" "}
                    {newphoneno_err}
                  </span>
                ) : null}

                <div className="row mt-4">
                  <span className="phonenumber-change-text-2">
                    New Phone Number Verification Code
                  </span>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="button-addon2"
                      id="newPhoneOTP"
                      name="newPhoneOTP"
                      autoComplete="off"
                      value={formik.values.newPhoneOTP}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.newPhoneOTP &&
                        Boolean(formik.errors.newPhoneOTP)
                      }
                      helperText={
                        formik.touched.newPhoneOTP && formik.errors.newPhoneOTP
                      }
                    />
                    {/* <button
                      className="btn btn-phone-number-verification-code"
                      type="button"
                      id="button-addon2"
                      onClick={() => getCode({ target: "newPhoneOTP" })}
                      disabled={
                        isLoading ||
                        timer_newPhoneOTP > 0 ||
                        newphoneno_err != ""
                          ? true
                          : false
                      }
                    >
                      Get Code
                      {timer_newPhoneOTP > 0 ? (
                        <span className="timeLeft">({timer_newPhoneOTP})</span>
                      ) : (
                        ""
                      )}
                    </button> */}
                  </div>
                  <span className="phonenumber-change-text-3 text-muted">
                    Please enter sms authentication code
                  </span>
                  {formik.errors.newPhoneOTP ? (
                    <span className="phonenumber-change-text-3 text-muted error">
                      {" "}
                      {formik.errors.newPhoneOTP}
                    </span>
                  ) : null}
                </div>

                {myProfile && myProfile._id && (
                  <h5 className="phonenumber-change-text-1 mb-4 mt-5">
                    Security Verification
                  </h5>
                )}
                {myProfile &&
                  myProfile.phoneno !== "" &&
                  myProfile.phoneno !== undefined && (
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
                          name="oldPhonenoOTP"
                          autoComplete="off"
                          value={formik.values.oldPhonenoOTP}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.oldPhonenoOTP &&
                            Boolean(formik.errors.oldPhonenoOTP)
                          }
                          helperText={
                            formik.touched.oldPhonenoOTP &&
                            formik.errors.oldPhonenoOTP
                          }
                        />
                        <button
                          className="btn btn-phone-number-verification-code"
                          type="button"
                          id="button-addon2"
                          onClick={() =>
                            getCode({
                              target: "oldPhoneOTP",
                              values: myProfile && myProfile.phoneno,
                            })
                          }
                          disabled={
                            isLoading || timer_oldPhoneOTP > 0 ? true : false
                          }
                        >
                          Get Code
                          {timer_oldPhoneOTP > 0 ? (
                            <span className="timeLeft">
                              ({timer_oldPhoneOTP})
                            </span>
                          ) : (
                            ""
                          )}
                        </button>
                      </div>
                      {myProfile && myProfile.phoneno && (
                        <span className="phonenumber-change-text-3 text-muted">
                          {"Enter the 6-digit code sent to " +
                            showPhone(myProfile && myProfile.phoneno)}
                        </span>
                      )}
                      {formik.errors.oldPhonenoOTP ? (
                        <span className="phonenumber-change-text-3 text-muted error">
                          {" "}
                          {formik.errors.oldPhonenoOTP}
                        </span>
                      ) : null}
                    </div>
                  )}

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
                        {"Enter the 6-digit code sent to " +
                          showEmail(myProfile && myProfile.email)}
                      </span>

                      {formik.errors.oldEmailOTP ? (
                        <span className="phonenumber-change-text-3 text-muted error">
                          {" "}
                          {formik.errors.oldEmailOTP}
                        </span>
                      ) : null}
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
