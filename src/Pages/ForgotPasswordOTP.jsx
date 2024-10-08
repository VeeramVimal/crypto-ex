import React from "react";
import NavbarOne from "./separate/NavbarOne";
import { useContextData } from '../core/context/index';

import { BsLockFill } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { BsApple } from "react-icons/bs";
import Logo from "../assets/images/Logo.png";
import OTPimg from "../assets/images/mail (1).png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
export default function ForgotPasswordOTP(props) {
  const { siteSettings } = useContextData();

  return (
    <div>
      {/* <div className='bg-login-nav'><Link className="navbar-brand " to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link></div> */}
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="container mt-5 ">
        <div className="row height-container">
          <div className="col-lg-6 my-auto text-center">
            <h4>Kindly check your email/mobile </h4>
            <img src={OTPimg} className="img-f-Pass mt-4" alt="OTPimg" />
          </div>
          <div className="col-lg-6 my-auto ">
            <center>
              <form>
                <label className="mt-3">Enter OTP</label>
                <input
                  className="form-control input-dark mt-1"
                  type="password"
                  name="password"
                />
                <button
                  type="button"
                  className="btn text-white btn-next w-100 mt-4"
                >
                  Generate OTP
                </button>
              </form>
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
