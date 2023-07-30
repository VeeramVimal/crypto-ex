import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import { CgMicrosoft } from "react-icons/cg";
import { GrConnect } from "react-icons/gr";
import { AiFillWallet } from "react-icons/ai";
import { BiUser, BiMoney, BiUserPlus, BiWallet } from "react-icons/bi";
import { VscDebugDisconnect, VscHistory } from "react-icons/vsc";
import { CgLock } from "react-icons/cg";

import NavbarOne from "./siteTheme/NavbarOne";

import DashboardHome from "./DashboardHome";
import Walletpage from "./Walletpage";
import Profile from "./Profile";
import Identification from "./Identification";
import BankPayment from "./BankPayment";
import Referral from "./Referral";
import Voucher from "./Voucher";
import SpotTradeHistory from "./SpotTradeHistory";
import $ from "jquery";
import Inner404 from "./separate/Inner404";

import { toast } from "../core/lib/toastAlert";
import { useContextData } from "../core/context/index";
import { isEmpty } from "../core/helper/common";

export default function Dashboard(props) {
  const { siteSettings, myProfile, setUserProfile } = useContextData();

  const navigate = useNavigate();
  let { tabName } = useParams();

  const [tabnameNew, setTabnameNew] = useState("");

  const statusChk = async () => {
    if (myProfile && myProfile._id) {
      if (isEmpty(myProfile.email)) {
        toast({ type: "error", message: "Please update your email address." });
        navigate("/my/email-authenticator");
      } else if (isEmpty(myProfile.phoneno)) {
        toast({ type: "error", message: "Please update your phone number." });
        navigate("/my/sms-authenticator");
      } else if (tabnameNew == "payment" && myProfile.kycstatus != 1) {
        toast({
          type: "error",
          message: "Please complete your KYC to continue.",
        });
        navigate("/my/identification");
      }
    }
  };

  useEffect(() => {
    setTabnameNew(tabName);
  }, [tabName]);

  useEffect(() => {
    if (
      tabnameNew == "identification" ||
      tabnameNew == "payment" ||
      tabnameNew == "voucher"
    ) {
      setUserProfile();
    }
  }, [tabnameNew]);

  useEffect(() => {
    if (tabnameNew == "identification" || tabnameNew == "payment") {
      statusChk();
    }
  }, [myProfile]);

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="mt-5 py-3 pb-css dashboard-top-banner-section">
        <div className="container-fluid ">
          <div className="row min-vh-100">
            <div className="col-2 bg-sidenav">
              <div
                className="nav  nav-pills me-3 position-fixed "
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "dashboard" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/dashboard");
                    window.scrollTo(0, 0);
                  }}
                >
                  <CgMicrosoft />{" "}
                  <span className="text-diaplay ">Dashboard</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "profile" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/profile");
                    window.scrollTo(0, 0);
                  }}
                >
                  <CgLock />{" "}
                  <span className="text-diaplay text-customize">Profile</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "identification" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/identification");
                    window.scrollTo(0, 0);
                  }}
                >
                  <BiUser />{" "}
                  <span className="text-diaplay ">Identification</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "payment" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/payment");
                    window.scrollTo(0, 0);
                  }}
                >
                  <BiWallet /> <span className="text-diaplay ">Payment</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "wallet" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/wallet");
                    window.scrollTo(0, 0);
                  }}
                >
                  <AiFillWallet /> <span className="text-diaplay ">Wallet</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "referral" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/referral");
                    window.scrollTo(0, 0);
                  }}
                >
                  <BiUserPlus /> <span className="text-diaplay ">Referral</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "voucher" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/voucher");
                    window.scrollTo(0, 0);
                  }}
                >
                  <BiMoney /> <span className="text-diaplay ">Voucher</span>
                </button>
                <button
                  className={
                    "btn w-100 bg-color-btn-D border-0 btn-light p-3 text-customize text-start " +
                    (tabnameNew === "SpotTradeHistory" ? "active" : "")
                  }
                  onClick={() => {
                    navigate("/my/SpotTradeHistory");
                    window.scrollTo(0, 0);
                  }}
                >
                  <VscHistory />{" "}
                  <span className="text-diaplay ">Trade History</span>
                </button>
              </div>
            </div>
            <div className="col-10 mt-3 ">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "dashboard" ? "show active" : "")
                  }
                >
                  {tabnameNew === "dashboard" && <DashboardHome />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "wallet" ? "show active" : "")
                  }
                >
                  {tabnameNew === "wallet" && <Walletpage />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "profile" ? "show active" : "")
                  }
                >
                  {tabnameNew === "profile" && <Profile />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "identification" ? "show active" : "")
                  }
                >
                  <Identification tabnameNew={tabnameNew} />
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "payment" ? "show active" : "")
                  }
                >
                  {tabnameNew === "payment" && <BankPayment />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "referral" ? "show active" : "")
                  }
                >
                  {tabnameNew === "referral" && <Referral />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew === "voucher" ? "show active" : "")
                  }
                >
                  {tabnameNew === "voucher" && <Voucher />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew &&
                    tabnameNew.toLowerCase() === "spottradehistory"
                      ? "show active"
                      : "")
                  }
                >
                  {tabnameNew === "SpotTradeHistory" && <SpotTradeHistory />}
                </div>
                <div
                  className={
                    "tab-pane fade " +
                    (tabnameNew &&
                    tabnameNew !== "dashboard" &&
                    tabnameNew !== "profile" &&
                    tabnameNew !== "identification" &&
                    tabnameNew !== "payment" &&
                    tabnameNew !== "referral" &&
                    tabnameNew !== "voucher" &&
                    tabnameNew !== "wallet" &&
                    tabnameNew.toLowerCase() !== "spottradehistory"
                      ? "show active"
                      : "")
                  }
                >
                  {tabnameNew &&
                    tabnameNew !== "dashboard" &&
                    tabnameNew !== "profile" &&
                    tabnameNew !== "identification" &&
                    tabnameNew !== "payment" &&
                    tabnameNew !== "referral" &&
                    tabnameNew !== "voucher" &&
                    tabnameNew !== "wallet" &&
                    tabnameNew.toLowerCase() !== "spottradehistory" && (
                      <Inner404 />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
