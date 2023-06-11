import React, { useState, useEffect } from "react";

import "../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";
import AllMarkets from "./separate/AllMarkets";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { makeRequest } from "../core/services/v1/request";
import { useContextData } from "../core/context/index";
import Config from "../core/config/";
import { BiCheck, BiX } from "react-icons/bi";

export default function CoinStatus(props) {
  const navigate = useNavigate();

  async function backButton() {
    try {
      const length = window.history.length;
      if (length > 1) {
        window.history.back();
      } else {
        navigate("/");
      }
    } catch (err) {}
  }
  const [currencies, setcurrencies] = useState([]);

  useEffect(() => {
    getCurrency();
  }, []);

  async function getCurrency() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getactiveCoinStatus`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status) {
        // const crypto = response.data.filter(coin => coin.curnType === 'Crypto');
        const crypto = response.data.filter((coin) => coin.curnType !== "");
        setcurrencies(crypto);
      }
    } catch (err) {}
  }

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <GoChevronLeft
                  className="deposit-back-button-icon"
                  onClick={() => backButton()}
                />
                <span className="deposit-text-1">Coin Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="markets-second-section ">
        <div className="container">
          <div className="p-2 flex-grow-1 bd-highlight">
            <p>
              Welcome to { Config.SITENAME } Coin status page. We use this page to
              communicate any issues with our products including planned and
              unplanned outages.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col py-5">
              <div className="market-place-table-section">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Coin</th>
                      <th scope="col">Network</th>
                      <th scope="col">Deposit</th>
                      <th scope="col">Withdraw</th>
                      {/* <th scope="col">TRADE</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currencies.length > 0 &&
                      currencies.map((currency, i) => {
                        return (
                          <tr>
                            <td className="cursor curPointer">
                              <span className="tb-img">
                                <img src={currency.image} alt="currencyImage" />
                              </span>{" "}
                              {currency.currencySymbol}
                              {/* {currency.basecoin != 'Coin' ? '- '+currency.basecoin : ''} */}
                            </td>
                            <td>{currency.basecoin}</td>
                            <td>
                              {" "}
                              {currency.depositEnable == 1 ? (
                                <span style={{ color: "green" }}>Enabled</span>
                              ) : (
                                <span style={{ color: "red" }}>Disabled</span>
                              )}
                            </td>
                            <td>
                              {currency.withdrawEnable == 1 ? (
                                <span style={{ color: "green" }}>Enabled</span>
                              ) : (
                                <span style={{ color: "red" }}>Disabled</span>
                              )}
                            </td>
                            {/* <td>
                              <span className="tb-img">
                                {currency.status == 1 ? (
                                  <BiCheck
                                    className="color-green"
                                    style={{ fontSize: "20px" }}
                                  />
                                ) : (
                                  <BiX
                                    className="color-red"
                                    style={{ fontSize: "20px" }}
                                  />
                                )}
                              </span>{" "}
                            </td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
