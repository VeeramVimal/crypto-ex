import React, { useRef,useState } from "react";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import "react-phone-number-input/style.css";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config/";
import { getCookie, deleteCookie } from '../../core/helper/cookie';
import { useContextData } from '../../core/context/index';
import { GoChevronLeft } from 'react-icons/go';

const validationSchema = yup.object({
  oldPassword: yup
    .string('Enter your password')
    .required('Old Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  newPassword: yup
    .string('Enter your password')
    .required('New Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmNewPassword: yup
    .string('Please enter the Confirm Password')
    .required('Confirm Password is required'),
});


export default function Phonenumberverificationchange(props) {

  const { siteSettings, myProfile, setUserProfile } = useContextData();
  const [isLoading, setisLoading] = useState(false);

  let inputRef1 = useRef();
  let inputRef2 = useRef();
  let inputRef3 = useRef();
  const showIcon = () => <AiOutlineEyeInvisible aria-hidden="true" />;
  const hideIcon = () => <AiOutlineEye aria-hidden="true" />;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => { 
      setisLoading(true);
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }
      let type = 'error';
      if (values.newPassword == values.confirmNewPassword) {
        if (values.newPassword == values.oldPassword) {
          setisLoading(false);
          toast({ type, message: "New password cannot be the same as old password." });        
      } else {
          const params = { 
            url: `${Config.V1_API_URL}user/changePassword`,
            method: 'POST',
            data: payload
          }
          const response = (await makeRequest(params));
          setisLoading(false);
          let type = 'error';
          if (response.status) {
            type = "success";
            deleteCookie('userToken');
            setUserProfile();
            navigate('/login');
          }
          toast({ type, message: response.message });
        }
      } else {
        setisLoading(false);
        toast({ type, message: "New Password and Confirm New Password doesn't Match" });        
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <div className="row align-items-center justify-content-center g-4">
            <div className="col-lg-4 bg-dnger">
              <h2 className="text-center mb-5">Change Password</h2>
              <div className="row mt-4">
                <span className="phonenumber-change-text-2">Old Password</span>
                <div className="">
                  <div
                    className="col"
                    style={{ position: "relative", display: "block" }}
                  >
                    <input
                      ref={inputRef1}
                      name="oldPassword"
                      id="oldPassword"
                      type="password"
                      className="form-control form-control-input"
                      autoComplete='off'
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                      helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    />
                    <ReactPasswordToggleIcon
                      inputRef={inputRef1}
                      showIcon={showIcon}
                      hideIcon={hideIcon}
                    />
                  </div>
                  {formik.errors.oldPassword ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.oldPassword}</span> : null}
                </div>
              </div>

              <div className="row mt-4">
                <span className="phonenumber-change-text-2">New Password</span>

                <div className="">
                  <div
                    className="col"
                    style={{ position: "relative", display: "block" }}
                  >
                    <input
                      ref={inputRef2}
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="form-control form-control-input"
                      autoComplete='off'
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                      helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />
                    <ReactPasswordToggleIcon
                      inputRef={inputRef2}
                      showIcon={showIcon}
                      hideIcon={hideIcon}
                    />
                  </div>
                  {formik.errors.newPassword ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.newPassword}</span> : null}
                </div>
              </div>

              <div className="row mt-4">
                <span className="phonenumber-change-text-2">Confirm New Password</span>

                <div className="">
                  <div
                    className="col"
                    style={{ position: "relative", display: "block" }}
                  >
                    <input
                      ref={inputRef3}
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      className="form-control form-control-input"
                      autoComplete='off'
                      value={formik.values.confirmNewPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                      helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                    />
                    <ReactPasswordToggleIcon
                      inputRef={inputRef3}
                      showIcon={showIcon}
                      hideIcon={hideIcon}
                    />
                  </div>
                  {formik.errors.confirmNewPassword ? <span className="phonenumber-change-text-3 text-muted error"> {formik.errors.confirmNewPassword}</span> : null}
                </div>
              </div>

              <div className="d-grid mt-5">
                <button
                  className="btn phone-number-verification-submit-button"
                  type="submit"
                  disabled={isLoading}
                >
                  Confirm
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
