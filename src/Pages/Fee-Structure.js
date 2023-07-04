import React, { useState, useEffect } from "react";

import "../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import AllMarkets from "./separate/AllMarkets";
import {
  BrowserRouter as Router, useNavigate
} from "react-router-dom";
import { makeRequest } from "../core/services/v1/request";
import { useContextData } from '../core/context/index'
import Config from "../core/config/";

export default function FeeStructure(props) {

  const navigate = useNavigate();

  async function backButton() {
    try {
      const length = window.history.length;
      if (length > 1) {
        window.history.back();
      } else {
        navigate("/");
      }
    } catch (err) { }
  }

  const { myProfile, siteSettings } = useContextData();
  const [value, setValue] = useState('1');
  const [markets, setmarkets] = useState([]);
  const [currencies, setcurrencies] = useState([]);
  const [fee, setFeevalue] = useState(0);
  const [feeDetail, setFeeDetail] = useState({});
  const [particularData, setparticularData] = useState({});
  const [feetype, setFeetype] = useState("tradefee");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getMarkets() {
      const params = {
        url: `${Config.V1_API_URL}trade/getMarkets`,
        method: 'GET'
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setmarkets(response.data)
      }
    }
    getMarkets();
    getCurrency();
    if(myProfile && myProfile._id) {
      getParticularCurrency();
    }
  }, [myProfile, siteSettings]);

  async function getCurrency() {
    const params = {
      url: `${Config.V1_API_URL}wallet/getCurrency`,
      method: 'GET'
    }
    const response = (await makeRequest(params));
    if (response.status) {
      setcurrencies(response.data)
    }
  }

  async function getParticularCurrency() {
    try {
      const value = { CurrencyID: "", currencySymbol: "INR" }
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: 'POST',
        body: value
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setparticularData(response.data)
        if (typeof response.data.withdrawLevel == 'object' && typeof response.data.withdrawLevel["level" + myProfile?.level] == 'object') {
          const data = response.data.withdrawLevel["level" + myProfile?.level];
          const fee = data.fees;
          setFeevalue(fee);
          setFeeDetail(data);
        }
      }
    } catch (err) { }
  }
  async function selectFeeType(type) {
    setFeetype(type)
  }
  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <GoChevronLeft className="deposit-back-button-icon" onClick={() => backButton()} />
                <span className="deposit-text-1">Fee Structure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="markets-second-section ">
          {/*  {
        (siteSettings && siteSettings.minDeposit > 0) || (myProfile && myProfile._id && feeDetail && feeDetail.fees) ?
        <div className="container">
          <div className="p-2 flex-grow-1 bd-highlight">
            <span className="deposit-text-1">INR Fee</span><br /><br />
            <div className="row row-cols-lg-4">
              { siteSettings && siteSettings.minDeposit > 0 ?
              <div className="col">
                <p><b>INR’ Deposit</b></p>
                <span className="text-muted fs-14 ">Minimum Deposit: {siteSettings.minDeposit} {particularData?.currencySymbol}</span>
              </div>:""}
              {(myProfile && myProfile._id && feeDetail && feeDetail.fees) ?
              <div className="col">
                <p><b>INR’ Withdrawal Fees</b></p>
             <span className="text-muted fs-14">Withdrawals: {fee} % Fee</span> 
                <span className="text-muted fs-14">Withdrawals: {(feeDetail && feeDetail.fees) ?
                    feeDetail.feetype === "0"
                      ?
                        feeDetail.fees.toFixed(currencies?.siteDecimal)
                      :
                        feeDetail.fees
                  :
                    0
                  }
                  {feeDetail.feetype === "0" ? " INR" : feeDetail.feetype === "1" ? "%" : "" } Fees
                </span>
              </div> : ""}
            </div>
          </div>
        </div>
        : ""
        } */}
        <div className="container">
          <div className="p-2 flex-grow-1 bd-highlight">
            <button
              className={feetype == 'tradefee' ? "add-payment-method-confirm-button px-2" : "add-payment-method-cancel-button px-2"}
              type="button"
              onClick={() => selectFeeType('tradefee')}
            >
              Trade Fees</button>
            &nbsp;&nbsp;
            <button
              className={feetype == 'cryptowithdrawfee' ? "add-payment-method-confirm-button px-2" : "add-payment-method-cancel-button px-2"}
              type="submit"
              onClick={() => selectFeeType('cryptowithdrawfee')}
            >
              Crypto Withdaw Fees
            </button>
          </div>
          <div className="row align-items-center">
            <div className="col py-5">
              {feetype == "tradefee" &&
                <div className="market-place-table-section">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Pair</th>
                        <th scope="col">Maker Fees <br /> Un-Verified User</th>
                        <th scope="col">Taker Fees <br /> Un-Verified User</th>
                        <th scope="col">Maker Fees <br /> Verified User</th>
                        <th scope="col">Taker Fees <br /> Verified User</th>
                        <th scope="col">Maker Fees in { Config.FanTknSymbol } <br /> Verified User</th>
                        <th scope="col">Taker Fees in { Config.FanTknSymbol } <br /> Verified User</th>
                        <th scope="col">Minimum Trade Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markets.length > 0 && markets.map((data, i) => {
                        return <tr>
                          <td onClick={() => navigate("/spot/" + data.pair)} className="cursor curPointer">
                            <span className='tb-img'><img src={data.fromCurrency.image} alt={Config.SITENAME} /></span>{" "}{data.pair.split('_').join('/')}
                          </td>
                          <td>{data.feeType == 1 ? data.makerFee.toFixed(data.decimalValue) : data.makerFee.toFixed(2) + '%'}</td>
                          <td>{data.feeType == 1 ? data.takerFee.toFixed(data.decimalValue) : data.takerFee.toFixed(2) + '%'}</td>
                          <td>{data.feeType == 1 ? data.makerFeeWithKYC.toFixed(data.decimalValue) : data.makerFeeWithKYC.toFixed(2) + '%'}</td>
                          <td>{data.feeType == 1 ? data.takerFeeWithKYC.toFixed(data.decimalValue) : data.takerFeeWithKYC.toFixed(2) + '%'}</td>
                          <td>{data.feeType == 1 ? data.makerFeeWithKYC.toFixed(data.decimalValue) : (data.makerFeeWithKYC * (siteSettings?.tradeFeeDiscount/100)) + '%'} / Max $1</td>
                          <td>{data.feeType == 1 ? data.takerFeeWithKYC.toFixed(data.decimalValue) : (data.takerFeeWithKYC * (siteSettings?.tradeFeeDiscount/100)) + '%'} / Max $1</td>
                          <td>{data.minTrade.toFixed(data.decimalValue)}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              }
              {feetype == "cryptowithdrawfee" &&
                <div className="market-place-table-section">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Currency</th>
                        <th scope="col">Withdrawal Fee <br /> Un-Verified User</th>
                        <th scope="col">Min Withdrawal <br /> Un-Verified User	</th>
                        <th scope="col">Withdrawal Fee <br /> Verified User</th>
                        <th scope="col">Min Withdrawal <br /> Verified user</th>
                        <th scope="col">Withdrawal Fee <br /> Verified, Pro User</th>
                        <th scope="col">Min Withdrawal <br /> Verified, Pro User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currencies.length > 0 && currencies.map((data, i) => {
                        
                        const {
                          siteDecimal = 2,
                          withdrawLevel = {},
                          currencySymbol = ""
                        } = data;

                        const {
                          level1 = {},
                          level2 = {},
                          level3 = {}
                        } = withdrawLevel;

                        const {
                          feetype: level1feetype = 0,
                          fees: level1fees = 0,
                          minwithamt: level1minwithamt = 0
                        } = level1;

                        const {
                          feetype: level2feetype = 0,
                          fees: level2fees = 0,
                          minwithamt: level2minwithamt = 0
                        } = level2;

                        const {
                          feetype: level3feetype = 0,
                          fees: level3fees = 0,
                          minwithamt: level3minwithamt = 0
                        } = level3;

                        return <tr>
                          <td onClick={() => navigate("/spot/" + data.pair)} className="cursor curPointer">
                            <span className='tb-img'><img src={data.image} alt={Config.SITENAME} /></span>
                            {" "}{data.currencySymbol} {data.basecoin != 'Coin' ? '- ' + data.basecoin : ''}
                          </td>
                          <td>{level1feetype == 0 ? level1fees.toFixed(siteDecimal) + ' ' + currencySymbol : level1fees.toFixed(2) + '%'}</td>
                          <td>{level1minwithamt.toFixed(siteDecimal)}</td>
                          <td>{level2feetype == 0 ? level2fees.toFixed(siteDecimal) + ' ' + currencySymbol : level2fees.toFixed(2) + '%'}</td>
                          <td>{level2minwithamt.toFixed(siteDecimal)}</td>
                          <td>{level3feetype == 0 ? level3fees.toFixed(siteDecimal) + ' ' + currencySymbol : level3fees.toFixed(2) + '%'}</td>
                          <td>{level3minwithamt.toFixed(siteDecimal)}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
