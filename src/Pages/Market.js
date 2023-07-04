import React from "react";

import "../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import AllMarkets from "./separate/AllMarkets";
import {
    BrowserRouter as Router, useNavigate
} from "react-router-dom";

export default function Withdraw(props) {

    const navigate = useNavigate();

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
            <div className="deposit-page-top-banner">
                <div className="deposit-hero-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                <GoChevronLeft className="deposit-back-button-icon" onClick={()=>backButton()}/>
                                <span className="deposit-text-1">Markets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="markets-second-section ">
                <div className="container"><br/>
                    <AllMarkets />
                </div>
            </div>
            <Footer />
        </div>
    );
}
