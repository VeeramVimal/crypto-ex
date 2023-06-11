import React from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import "../assets/styledev.css";
import authentication from "../assets/images/icons/authentication.png";
import google from "../assets/images/icons/google.png";
import phone from "../assets/images/icons/phone.png";
import mail from "../assets/images/icons/mail.png";
import password from "../assets/images/icons/password.png";
import withdrawal from "../assets/images/icons/withdrawal copy.png";
import antiphusing from "../assets/images/icons/anti phusing code.png";
import account from "../assets/images/icons/account.png";
import device from "../assets/images/icons/device.png";
import { MdNotInterested } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useContextData } from '../core/context/index'
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";
import { showEmail, showPhone } from '../core/helper/date-format';

export default function Profile() {

  const { myProfile, setUserProfile, siteSettings } = useContextData();

  const navigate = useNavigate();
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row">
        
          <div className="col-12">
            <h3 className="head-profile">Security</h3>
            <h4 className="sub-head-profile mt-4">
              Two-Factor Authentication (2FA)
            </h4>
          </div>
          {/* section one start */}
          {/* <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-4">
              <div>
                <img
                  src={authentication}
                  alt="authentication"
                  className="authentication"
                />
              </div>
              <div>
                <p className="text-muted  mb-0">
                  <p className="para-h ">
                    Biometric Authentication/Security Key
                  </p>
                  <small className="mobile-para d-block">
                    Protect your account and withdrawals with a security key
                    such as Yubikey.
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8 mt-css">
            <p className="text-muted btn btn-mob-style">
              <MdNotInterested /> Not linked
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style">Enable</button>
          </div> */}
          {/* section one end */}

          {/* section two start */}
          <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-3">
              <div>
                {" "}
                <img
                  src={google}
                  alt="authentication"
                  className="authentication "
                />
              </div>
              <div>
                <p className="para-h password-text-66 mb-2"> Google Authenticator (Recommended)</p>{" "}
                <p className="text-muted  mb-0">
                  <small className="mobile-para password-text-33">
                    Protect your account and transactions.
                  </small>
                  {/* <div>
                    <a href="" className="text-col mt-3 d-block link-mob">
                      <u>Having trouble?</u>
                    </a>
                  </div> */}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8">
            <p className="text-muted btn btn-mob-style">
            { myProfile?.tfaenablekey == '' ? <> <MdNotInterested className="color-red"/> Not linked  </> : <> <IoCheckmarkDoneCircleOutline className="color-green"/>  On </> } 
            </p>
          </div>
          <div className="col-lg-2 col-4">
            <button className="btn btn-Dmode btn-mob-style" onClick={() => navigate('/google-authenticator')}>{myProfile?.tfaenablekey != '' ? 'Disable' : 'Enable'}</button>
          </div>
          {/* section two end */}

          {/* section 3 start  */}
          <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-5">
              <div>
                <img src={phone} alt="authentication" className="phone-img" />
              </div>
              <div>
                <p className="para-h password-text-66 mb-2"> Phone Number Verification</p>
                <p className="text-muted  mb-0">
                  <small className="mobile-para password-text-33">
                    Protect your account and transactions.
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8 mt-css">
            <p className="text-muted btn btn-mob-style">
            { myProfile && myProfile?.phoneno == '' ? <> <MdNotInterested className="color-red"/> Not linked  </> : <> <IoCheckmarkDoneCircleOutline className="color-green" />  {showPhone(myProfile && myProfile?.phoneno)} </> } 
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode  btn-sm  btn-mob-style" onClick={() => navigate('/my/sms-authenticator')}>
             {myProfile?.phoneno == '' ? "Enable" : "Change"}
            </button>
            {/* <button className="btn btn-Dmode btn-sm btn-mob-style">
              Remove
            </button> */}
          </div>
          {/* section 3 end  */}

          {/* section 4 start  */}
          <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-5">
              <div>
                {" "}
                <img src={mail} alt="authentication" className="mail-icon" />
              </div>
              <div>
                <p className="para-h password-text-66 mb-2"> Email Address Verification</p>
                <p className="text-muted  mb-0">
                  <small className="mobile-para password-text-33">
                    Protect your account and transactions.
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8 mt-5">
            <p className="text-muted btn btn-size btn-mob-style">
              { (myProfile && (myProfile.email === undefined || myProfile.email == '')) ? <> <MdNotInterested className="color-red"/> Not linked  </> : <> <IoCheckmarkDoneCircleOutline className="color-green"/> {showEmail(myProfile && myProfile.email)}</> } 
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-5">
            <button className="btn btn-Dmode btn-sm btn-mob-style" onClick={() => navigate('/my/email-authenticator')}>
              {(myProfile && (myProfile.email === undefined || myProfile.email == '')) ? "Enable" : "Change"}
            </button>
            {/* <button className="btn btn-Dmode btn-sm btn-mob-style">
              Remove
            </button> */}
          </div>
          {/* section 4 end  */}

          {/* section 5 start  */}
          <h4 className="mt-5 head-profile">Advanced Security</h4>
          <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-3">
              <div>
                <img
                  src={password}
                  alt="authentication"
                  className="authentication"
                />
              </div>
              <div>
                <p className="para-h password-text-66 mb-2"> Login Password</p>

                <p className="text-muted  mb-0">
                  <small className="mobile-para password-text-33">
                    Login password is used to log in to your account.
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8 mt-css">
            <p className="text-muted btn btn-mob-style">
              {/* <MdNotInterested /> Off */}
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style" onClick={() => navigate('/my/password')}>Change</button>
          </div>
          {/* section 5 end  */}

          {/* section 6 start  */}
          {/* <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-3">
              <div>
                {" "}
                <img
                  src={withdrawal}
                  alt="authentication"
                  className="authentication"
                />
              </div>

              <div>
                <p className="para-h "> Crypto Withdrawal</p>
                <p className="text-muted  mb-0">
                  <b className="para-h ">One-step Withdrawal</b>
                </p>
                <p className="text-muted  mb-0">
                  <small className="mobile-para">
                    When this function is turned on, you can withdraw small
                    amount crypto to whitelisted addresses without passing 2FA
                    verification
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8 mt-css">
            <p className="text-muted btn btn-mob-style">
              <MdNotInterested /> Off
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style">Enable</button>
          </div>

          <div className="col-lg-8 col-12 ms-css">
            <p className="text-muted  mb-0">
              <b className="para-h ">One-step Withdrawal</b>
            </p>
            <p className="text-muted  mb-0">
              <small className="mobile-para">
                When this function is turned on, you can withdraw small amount
                crypto to whitelisted addresses without passing 2FA verification
              </small>
            </p>
            <a href="" className="text-col link-mob">
              <u>Address Management</u>
            </a>
          </div>
          <div className="col-lg-2 col-8 mt-css">
            <p className="text-muted btn btn-mob-style">
              <MdNotInterested /> Off
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style">Enable</button>
          </div> */}
          {/* section 6 end  */}

          {/* section 7 start  */}
          {/* <div className="col-lg-8 col-12">
            <div className="d-flex flex-row mt-5">
              <div>
                <img
                  src={antiphusing}
                  alt="authentication"
                  className="authentication"
                />
              </div>
              <div>
                <p className="para-h "> Anti-Phishing Code</p>
                <p className="text-muted  mb-0">
                  <small className="mobile-para">
                    Protect your account from phishing attempts and ensure that
                    your notification emails are from Binance only.
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-8 mt-css">
            <p className="text-muted btn btn-mob-style">
              <MdNotInterested /> Off
            </p>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style">Enable</button>
          </div> */}
          {/* section 7 end  */}

          {/* section 8 start  */}
          <h4 className="mt-5">Activities</h4>
          <div className="col-lg-10 col-12">
            <div className="d-flex flex-row mt-4">
              <div>
                <img
                  src={device}
                  alt="authentication"
                  className="authentication"
                />
              </div>

              <div>
                <p className="para-h password-text-66 mb-2"> Login Activities</p>
                <p className="text-muted  mb-0">
                  <small className="mobile-para password-text-33">
                    Your login activites details
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style" onClick={() => navigate('/device-management')}> Manage</button>
          </div>
          {/* section 8 end  */}

          {/* section 9 start  */}
          {/* <div className="col-lg-10 col-12">
            <div className="d-flex flex-row mt-5">
              <div>
                <img
                  src={account}
                  alt="authentication"
                  className="authentication"
                />
              </div>

              <div>
                <p className="para-h "> Account Activity</p>
                <p className="text-muted  mb-0">
                  <small className="mobile-para">
                    Last login: 2022-11-02 09:50:20
                  </small>
                  <small className="d-block mobile-para">
                    Suspicious account activity?{" "}
                    <a href="" className="text-col link-mob">
                      <u>Having trouble?</u>
                    </a>
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-4 mt-css">
            <button className="btn btn-Dmode btn-mob-style"> More</button>
          </div> */}
          {/* section 9 start  */}
        </div>

      </div>
    </div>
  );
}
