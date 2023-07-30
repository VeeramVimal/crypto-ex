import React from "react";
import { BsGoogle } from "react-icons/bs";
import { BsApple } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useContextData } from '../core/context/index'

import Logo from "../assets/images/Logo.png";
import Coinimg from "../assets/images/buy crypto.png";
import NavbarOne from "./separate/NavbarOne";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
export default function WelcomeToBinance(props) {
  const { siteSettings } = useContextData();

  return (
    <div>
      {/* <div className='bg-login-nav'><Link className="navbar-brand " to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link></div> */}
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="container mt-5 pt-5 ">
        <div className="row height-container">
          <div className="col-lg-6 my-auto">
            <h2 className="mt-5">Welcome Binance Login !</h2>
            <form>
              <button type="button" className="btn text-white btn-next w-100 mt-4">
                <AiOutlineUser /> Signup with phone or email
              </button>
              <p className="line mt-3">
                <span className="text-or mt-3">OR</span>
              </p>
              <button type="button" className="btn btn-Dmode mt-2 w-100">
                <BsGoogle /> Continue With Google
              </button>
              <button type="button" className="btn btn-Dmode mt-2 w-100">
                <BsApple /> Continue With Apple
              </button>
            </form>
            <p className="mt-3">
              <small>
                Already Registered ?{" "}
                <a href="" className="text-col ">
                  <u>Login</u>
                </a>
              </small>
            </p>
            <a href="" className="text-col mt-4 d-block">
              <u>SignUp for an entity account </u>
            </a>
          </div>
          <div className="col-lg-6 my-auto">
            <center>
              {/* <img className='resize-img '
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/2048px-QR_code_for_mobile_English_Wikipedia.svg.png"
      alt="new"
      /> */}
              <img className="resize-img " src={Coinimg} alt="Coinimg" />
              <p>
                <b>Log in with QR code</b>
              </p>
              <p className="w-75">
                <small>
                  Enjoy the World's largest cryptocurrency exchange at your
                  fingertips .
                </small>
              </p>
            </center>
          </div>
          <div className="col-12">
            <nav className="navbar mt-5 ">
              <div className="container-fluid d-flex justify-content-center">
                <small className="d-block ">
                  {siteSettings && siteSettings.copyRights}
                  {/* © 2017 - 2022 Binance.com. All rights reserved */}
                  <span className="ms-5">Cookie Preferences</span>
                </small>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
