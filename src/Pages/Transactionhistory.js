import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link, useParams,useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { HiArrowNarrowRight } from "react-icons/hi";

import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import TransactionhistoryCrypto from "./separate/transaction-history-crypto";
import TransactionhistoryFiat from "./separate/transaction-history-fiat";
import TransactionhistoryTransfer from "./separate/transaction-history-transfer";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";

export default function Transactionhistory(props) {

  const navigate = useNavigate();
  let { tabName } = useParams();

  const [listTab, setListTab] = useState("crypto");
  const [inrCurrencyList, setinrCurrencyList] = useState({});

  useEffect(() => {
    if(tabName) {
      setListTab(tabName.toLowerCase());
    }
  }, [tabName]);

  useEffect(() => {
    getinrCurrency();
  }, []);

  async function getinrCurrency() {
    try {
      const value = { CurrencyID: "" }
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setinrCurrencyList(response.data);
      }
    } catch (err) { }
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
              <div className="col-6">
                <GoChevronLeft className="deposit-back-button-icon" onClick={()=>backButton()}/>
                <span className="deposit-text-1">Transactions History</span>
              </div>
              <div className="col-6 text-end">
                {Config.depositFiatStatus == "Enable" ?
                <button type="button" className="deposit-fiat-button" onClick={() => navigate("/deposit/fiat/" + inrCurrencyList._id)}>
                  Deposit Fiat <HiArrowNarrowRight />
                </button>:""}
              </div>
            </div>
          </div>
        </div>

        <div className="transaction-history-second-section py-3 ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="transaction-history-tabs-section">
                  <ul className="nav nav-pills " id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation" onClick={() => { setListTab("crypto"); }}>
                      <button
                        className={"nav-link "+(listTab === 'crypto' ? 'active' : '')}
                        id="pills-crypto-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-crypto"
                        type="button"
                        role="tab"
                        aria-controls="pills-crypto"
                        aria-selected="true"
                      >
                        Crypto
                      </button>
                    </li>
                    <li className="nav-item" role="presentation" onClick={() => { setListTab("fiat"); }}>
                      <button
                        className={"nav-link "+(listTab === 'fiat' ? 'active' : '')}
                        id="pills-fiat-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-fiat"
                        type="button"
                        role="tab"
                        aria-controls="pills-fiat"
                        aria-selected="false"
                      >
                        Fiat
                      </button>
                    </li>
                    <li className="nav-item" role="presentation" onClick={() => { setListTab("transfer"); }}>
                      <button
                        className={"nav-link "+(listTab === 'transfer' ? 'active' : '')}
                        id="pills-transfer-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-transfer"
                        type="button"
                        role="tab"
                        aria-controls="pills-transfer"
                        aria-selected="false"
                      >
                        Transfer
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation" onClick={() => { setListTab("distribution"); }}>
                      <button
                        className="nav-link"
                        id="pills-distribution-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-distribution"
                        type="button"
                        role="tab"
                        aria-controls="pills-distribution"
                        aria-selected="false"
                      >
                        Distribution
                      </button>
                    </li>
                    <li className="nav-item" role="presentation" onClick={() => { setListTab("bnb convert"); }}>
                      <button
                        className="nav-link"
                        id="pills-bnbconvert-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-bnbconvert"
                        type="button"
                        role="tab"
                        aria-controls="pills-bnbconvert"
                        aria-selected="false"
                      >
                        BNB Convert
                      </button>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          listTab && <>
            {listTab == "crypto" &&
            <TransactionhistoryCrypto
              tabName= "tabName"
            />}
            
            {listTab == "fiat" &&
            <TransactionhistoryFiat
              tabName= "tabName"
            />}
            {listTab == "transfer" &&
            <TransactionhistoryTransfer
              tabName= "tabName"
            />}
          </>
        }

      </div>
    <Footer />
    </div>
  );
}
