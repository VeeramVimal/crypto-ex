import React,{ useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import "../assets/style.css";
import { BsDot } from "react-icons/bs";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import { makeRequest } from "../core/services/v1/request";
import Config from "../core/config/";

export default function Withdraw(props) {

  const navigate = useNavigate();

  const [faqList, setfaqList] = useState([]);

  useEffect(() => {
    getFaq();
  }, []);

  async function getFaq() {
    try {
      const params = { 
        url: `${Config.V1_API_URL}faq/getfaq`,
        method: 'POST',
        body: {type: "common"}
      }
      const { status, data, error } = (await makeRequest(params));
      if (status && data ) {
        setfaqList(data)
      }
    } catch(err){}
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
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <GoChevronLeft className="deposit-back-button-icon" onClick={()=>backButton()}/>
                <span className="deposit-text-1">FAQs on Crypto Trading in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-second-section py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col">
              <div className="accordion" id="accordionExample">
                { faqList.length > 0 && faqList.map((row, i) =>{
                  if (row.type == "common") {
                    return (
                      <div className="accordion-item" key={i}>
                        <h2 className="accordion-header" id={"headingOne"+i}>
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne"+i} aria-expanded="true" aria-controls={"collapseOne"+i}>
                          <BsDot className="accordian-dot-icons" /> {row.title}
                          </button>
                        </h2>
                        <div id={"collapseOne"+i} className="accordion-collapse collapse" aria-labelledby={"headingOne"+i} data-bs-parent="#accordionExample">
                          <div className="accordion-body"> {row.description}</div>
                        </div>
                      </div>
                    )
                  }
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
