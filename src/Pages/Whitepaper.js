import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router, useNavigate, useParams
} from "react-router-dom";
import "../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import Config from "../core/config/";

export default function Whitepaper(props) {

  const { dynCMS } = useParams()
  const navigate = useNavigate();

  const [cmsIdentifier, setCmsIdentifier] = useState("");
  const [cmsData, setCmsData] = useState([]);

  const [contentLoad, setContentLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <span className="deposit-text-1">Whitepaper</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="terms-second-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <iframe src={Config.BACKEND_URL+"whitepaper/whitepaper.pdf"} width="100%" height="800px"></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
