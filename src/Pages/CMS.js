import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router, useNavigate, useParams
} from "react-router-dom";
import "../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";

import Error404Content from './Error404Content';


export default function Withdraw(props) {

  const { dynCMS } = useParams()
  const navigate = useNavigate();

  const [cmsIdentifier, setCmsIdentifier] = useState("");
  const [cmsData, setCmsData] = useState([]);

  const [contentLoad, setContentLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getCmsData() {
      try {
        let identifyVal = props.identify;
        console.log("identifyVal : params dynCMS : ", identifyVal, dynCMS);

        let identifyType = "";
        if(identifyVal == "dyn") {
          identifyVal = "/"+dynCMS;
          identifyType = "dyn"
        }

        setCmsIdentifier(identifyVal);

        const value  = { identify: identifyVal, type: identifyType }
        const params = { 
          url: `${Config.V2_API_URL}cms/getCMS`,
          method: 'POST',
          body: value
        }
        const response = (await makeRequest(params)); 
        setContentLoad(true);
        if (response.status && response.getcmsDetails) {
          setCmsData(response.getcmsDetails);
        }
      } catch(err){
        setContentLoad(true);
      }
    }
    if(props.identify != cmsIdentifier) {
      getCmsData();
    }
  }, [props, dynCMS]);
  
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

      {
      (contentLoad === true && cmsData && cmsData.length === 0) ?
      <Error404Content />
      :
      <>
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              {cmsData && cmsData[0] && cmsData[0].title ?
              <div className="col">
                <GoChevronLeft className="deposit-back-button-icon" onClick={()=>backButton()}/>
                <span className="deposit-text-1">{cmsData[0].title}</span>
              </div>:""}
            </div>
          </div>
        </div>
      </div>
      <div className="terms-second-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              { cmsData && cmsData[0] && cmsData[0].description && <div dangerouslySetInnerHTML={{__html: cmsData && cmsData[0] && cmsData[0].description}} ></div>}
              {/* <div className="mb-4">
                <p className="terms-text-1">XI. Miscellaneous</p>
                <p className="terms-text-2">1. Independent Parties.</p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
              </div>
              <div className="mb-4">
                <p className="terms-text-1">XI. Miscellaneous</p>
                <p className="terms-text-2">1. Independent Parties.</p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
              </div>
              <div className="mb-4">
                <p className="terms-text-1">XI. Miscellaneous</p>
                <p className="terms-text-2">1. Independent Parties.</p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
              </div>
              <div className="mb-4">
                <p className="terms-text-1">XI. Miscellaneous</p>
                <p className="terms-text-2">1. Independent Parties.</p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
              </div>
              <div className="mb-4">
                <p className="terms-text-1">XI. Miscellaneous</p>
                <p className="terms-text-2">1. Independent Parties.</p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
              </div>
              <div className="mb-4">
                <p className="terms-text-1">XI. Miscellaneous</p>
                <p className="terms-text-2">1. Independent Parties.</p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
                <p className="terms-text-3">
                  Binance is an independent contractor but not an agent of you
                  in the performance of these Terms. These Terms shall not be
                  interpreted as facts or evidence of an association, joint
                  venture, partnership, or franchise between the parties.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      </>
      }


      <Footer />
    </div>
  );
}
