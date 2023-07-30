import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import $ from "jquery";
import { AiFillInfoCircle } from 'react-icons/ai';
import { useContextData } from '../../../core/context/index';
import { tradeFanTknFeesAuth_API } from "../../../core/services/all.api";
import { toast } from "../../../core/lib/toastAlert";
import Config from "../../../core/config/";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

export default function Spot(props) {

  useEffect(() => {
    $(".status_change .dropdown-item").click(function () {
      var getStatusText = $(this).text();
      $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
      var generateStatusClass = `${$(this).attr('data-class')}-status`
      $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
    })
  }, []);

  const { siteSettings, myProfile, setUserProfile } = useContextData();

  useEffect(() => {
    if (props && props.pairDetails && props.makerFee && siteSettings && siteSettings.tradeFeeDiscount && siteSettings.tradeFeeDiscountCurrency) {
      const mFee = (myProfile && myProfile.kycstatus === 1) ? props.pairDetails.makerFeeWithKYC : props.pairDetails.makerFee;
      const discount = props.decimalValue((mFee * (siteSettings.tradeFeeDiscount / 100)), 2);
      setTradeFanTknFees_info(discount + "% or 1$ worth of " + siteSettings.tradeFeeDiscountCurrency.currencySymbol + " in fees");
    }
  }, [siteSettings, props, myProfile]);

  const [isloadingData, setIsloadingData] = useState({});
  const [tradeFanTknFees_info, setTradeFanTknFees_info] = useState("");

  const navigate = useNavigate();

  const NavigateTo = (currency, id) => {
    let url = '/deposit-crypto/';
    if (currency == 'INR') {
      url = '/deposit-fiat/';
    }
    navigate(url + '' + id);
  }
  const loadingChange = (data = {}) => {
    const dataCopy = Object.assign({}, isloadingData);
    dataCopy[data.key] = data.value;
    setIsloadingData(dataCopy);
  }

  const NavigateToStaking = (url) => {
    navigate(url);
  }
  const [range, setRange] = useState({
    values1: [25],
    values2: [50],
  });

  const tradeFanTknFeesAuth_call = async () => {
    if (myProfile && myProfile.kycstatus != 1) {
      toast({ type: "error", message: "Please verify your KYC." });
      return false;
    }
    loadingChange({ key: "tradeFanTknFees", value: true });
    await tradeFanTknFeesAuth_API();
    loadingChange({ key: "tradeFanTknFees", value: false });
    setUserProfile();
  }
  return (
    <div>
      <div className="d-flex flex-row trading-page-top-section-2 align-items-center top-heading-total-height">
        <div className="ps-2">
          <p className="trade-text-5 mb-0">Place Order</p>
        </div>
      </div>
      <div className="">
        <div className="place-order-buy-sell-tabs">
          <ul className="nav nav-pills nav-justified mx-2 mt-2" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={props.orderData.type == "buy" ? "nav-link active" : "nav-link nav-link-buy"}
                id="pills-buy-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-buy"
                type="button"
                role="tab"
                aria-controls="pills-buy"
                aria-selected="true"
                onClick={() => props.setType('buy')}
              >
                Buy
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={props.orderData.type == "sell" ? "nav-link nav-link-sell active" : "nav-link nav-link-buy"}
                id="pills-buy-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-buy"
                type="button" role="tab"
                aria-controls="pills-buy"
                aria-selected="false"
                onClick={() => props.setType('sell')}
              >
                Sell
              </button>
            </li>
          </ul>
        </div>
        <div className="tab-content mx-2 mt-2" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-buy" role="tabpanel" aria-labelledby="pills-buy-tab">
            <div className="dropdown custom-dropdown status_dropdown" data-color="created-status">
              <button
                className="capitalizeText select-dropdown-btn-buysell dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-offset="0,12"
              >
                {props.orderData.orderType == "stop" ? "Stop Limit" : props.orderData.orderType}
              </button>
              <ul className="dropdown-menu status_change w-100" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" data-class="limit" href="javascript:void(0)" onClick={(e) => props.setOrderType('limit')}>Limit</a></li>
                <li><a className="dropdown-item" data-class="market" href="javascript:void(0)" onClick={(e) => props.setOrderType('market')}>Market</a></li>
                <li><a className="dropdown-item" data-class="stop" href="javascript:void(0)" onClick={(e) => props.setOrderType('stop')}>Stop Limit</a></li>
              </ul>
            </div>
            {props.orderData.orderType == 'stop' &&
              <>
                <p className="trade-text-6 mt-3">Stop Price</p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={(event) => props.calculateValuesType(event.target.value, 'stopPrice')}
                    name="stopPrice"
                    id="stopPrice"
                    value={props.orderData.stopPrice}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text" id="basic-addon1">{props.toCurrency}</span>
                </div>
              </>
            }
            {/* props.orderData : {props.orderData && JSON.stringify(props.orderData)} */}
            {props.orderData.orderType != 'market' &&
              <>
                <p className="trade-text-6 mt-3">{props.orderData.orderType == 'stop' ? 'Limit Price' : 'Price'} ({props.toCurrency})</p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={(event) => props.calculateValuesType(event.target.value, 'price')}
                    name="price"
                    id="price"
                    value={props.orderData.price}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text" id="basic-addon1">{props.toCurrency}</span>
                </div>
              </>
            }
            <p className="trade-text-6 mt-3">Amount ({props.fromCurrency})</p>
            <div className="input-group mb-3">
              <input
                type="number"
                onChange={(event) => props.calculateValuesType(event.target.value, 'amount')}
                name='amount'
                id="amount"
                value={props.orderData.amount}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text" id="basic-addon1">{props.fromCurrency}</span>
            </div>

            {(myProfile && myProfile._id) ?
              <div className="place-order-buy-sell-percentage-tabs">
                <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={props.tradeIndex.buy == '25' ? "nav-link active" : "nav-link"}
                      id="pills-25-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-25"
                      type="button"
                      role="tab" aria-controls="pills-25"
                      aria-selected="true"
                      onClick={(event) => props.percentageChange(props.orderData.type, '25')}
                    >
                      25%
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={props.tradeIndex.buy == '50' ? "nav-link active" : "nav-link"}
                      id="pills-50-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-50"
                      type="button" role="tab"
                      aria-controls="pills-50"
                      aria-selected="false"
                      onClick={(event) => props.percentageChange(props.orderData.type, '50')}
                    >
                      50%
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={props.tradeIndex.buy == '75' ? "nav-link active" : "nav-link"}
                      id="pills-75-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-75"
                      type="button" role="tab"
                      aria-controls="pills-75"
                      aria-selected="false"
                      onClick={(event) => props.percentageChange(props.orderData.type, '75')}
                    >
                      75%
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={props.tradeIndex.buy == '100' ? "nav-link active" : "nav-link"}
                      id="pills-100-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-100"
                      type="button" role="tab"
                      aria-controls="pills-100"
                      aria-selected="false"
                      onClick={(event) => props.percentageChange(props.orderData.type, '100')}
                    >
                      100%
                    </button>
                  </li>
                </ul>
              </div> : ""}

            <p className="trade-text-6 mt-3">Total ({props.toCurrency})</p>
            <div className="input-group mb-3">
              <input
                type="number"
                onChange={(event) => props.calculateValuesType(event.target.value, 'total')}
                id="total"
                name="total"
                value={props.orderData.total}
                className="form-control"
                placeholder="Total"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text" id="basic-addon1">{props.toCurrency}</span>
            </div>

            {(myProfile && myProfile._id) ?
              <>
                <div className="d-flex flex-row py-2 px-1 border-rounded" style={{ backgroundColor: "rgb(0 219 174 / 22%)" }}>
                  <div className=""><AiFillInfoCircle style={{ color: "#00DBAE" }} /> <span className="trade-text-6 mt-3">Fees in {Config.FanTknSymbol}</span></div>
                  <div className="ms-auto">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onClick={() => tradeFanTknFeesAuth_call()}
                        disabled={
                          (isloadingData && isloadingData.tradeFanTknFees) ? true : false
                        }
                        checked={(myProfile && myProfile.tradeFanTknFees === 1) ? true : false}
                      />
                    </div>
                  </div>
                </div>
                {props.orderData.type === 'buy' ?
                  <>

                    <button
                      className="place-order-buy-button mt-3"
                      type="button"
                      onClick={(event) => props.submitTrade()}
                      style={{ backgroundColor: "#14B269" }}
                      disabled={props.socketOrdCreLoad || Config.TRADE_STATUS == "Disable" ? true : false}
                    >
                      {props.socketOrdCreLoad
                        ?
                        <span className="trade-text-15">
                          Loading...
                        </span>
                        :
                        <>Buy {props.fromCurrency}</>
                      }
                    </button>


                    { Config.COPY_TRADING_STATUS == "Enable" && props.orderData.orderType === 'stop' ?
                      <button onClick={(event) => props.submitCopytrade()} className="place-order-buy-button mt-3">

                        {props.socketOrdCreLoad
                          ?
                          <span className="trade-text-15">
                            Loading...
                          </span>
                          :
                          <>copy trade Buy {props.fromCurrency}</>
                        }

                      </button>

                      :
                      ''
                    }
                  </>
                  :
                  <>
                    <button
                      className="place-order-buy-button mt-3"
                      type="button"
                      onClick={(event) => props.submitTrade()}
                      style={{ backgroundColor: "#FF4B5E" }}
                      disabled={props.socketOrdCreLoad || Config.TRADE_STATUS == "Disable" ? true : false}
                    >
                      {props.socketOrdCreLoad
                        ?
                        <span className="trade-text-15">
                          Loading...
                        </span>
                        :
                        <>Sell {props.fromCurrency}</>
                      }
                    </button>

                    { Config.COPY_TRADING_STATUS == "Enable" && props.orderData.orderType === 'stop' ?
                      <button onClick={(event) => props.submitCopytrade()} className="place-order-buy-button mt-3">
                        {props.socketOrdCreLoad
                          ?
                          <span className="trade-text-15">
                            Loading...
                          </span>
                          :
                          <>copy trade Sell {props.fromCurrency}</>
                        }

                      </button>
                      :
                      ''
                    }

                  </>
                }
              </>
              :
              <button className="place-order-login-button mt-3" type="button">
                <span>
                  <span className='fc-g' onClick={() => navigate('/login')}>Login </span>(or)
                  <span className='fc-g' onClick={() => navigate('/register')}> Register Now</span> to trade
                </span>
              </button>
            }
          </div>
          <div className="tab-pane fade" id="pills-sell" role="tabpanel" aria-labelledby="pills-sell-tab">
            <div className="dropdown custom-dropdown status_dropdown" data-color="created-status">
              <button className="select-dropdown-btn-buysell dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                Limit
              </button>
              <ul className="dropdown-menu status_change w-100" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" data-class="limit" href="#">Limit</a></li>
              </ul>
            </div>
            <p className="trade-text-6 mt-3">Price (INR)</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Price" aria-label="Username" aria-describedby="basic-addon1" />
              <span className="input-group-text" id="basic-addon1">INR</span>
            </div>

            <p className="trade-text-6 mt-3">Amount (BTC)</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Amount" aria-label="Username" aria-describedby="basic-addon1" />
              <span className="input-group-text" id="basic-addon1">BTC</span>
            </div>
            <div className="place-order-buy-sell-percentage-tabs">
              <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-25-tab" data-bs-toggle="pill" data-bs-target="#pills-25" type="button" role="tab" aria-controls="pills-25" aria-selected="true">25%</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-50-tab" data-bs-toggle="pill" data-bs-target="#pills-50" type="button" role="tab" aria-controls="pills-50" aria-selected="false">50%</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-75-tab" data-bs-toggle="pill" data-bs-target="#pills-75" type="button" role="tab" aria-controls="pills-75" aria-selected="false">75%</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-100-tab" data-bs-toggle="pill" data-bs-target="#pills-100" type="button" role="tab" aria-controls="pills-100" aria-selected="false">100%</button>
                </li>
              </ul>
            </div>

            <p className="trade-text-6 mt-3">Total (INR)</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Total" aria-label="Username" aria-describedby="basic-addon1" />
              <span className="input-group-text" id="basic-addon1">INR</span>
            </div>

            <div className="d-flex flex-row py-2 px-1 border-rounded" style={{ backgroundColor: "rgb(0 219 174 / 22%)" }}>
              <div className=""><AiFillInfoCircle style={{ color: "#00DBAE" }} />
                <span className="trade-text-6 mt-3">Fees in {Config.FanTknSymbol}</span></div>
              <div className="ms-auto">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </div>
              </div>
            </div>
            <button className="place-order-buy-button mt-3" type="button" style={{ backgroundColor: "#FF4B5E" }}>Sell</button>

            <button className="place-order-login-button mt-3" type="button">
              <span>
                <span className='fc-g' onClick={() => navigate('/login')}>Login </span>(or)
                <span className='fc-g' onClick={() => navigate('/register')}> Register Now</span> to trade
              </span>
            </button>

          </div>

          <div className="row">
            {
              (props.userTradeDetails && props.userTradeDetails.userId && props.pairDetails && props.pairDetails.fromCurrency) ?
                <div className="col-lg-12">
                  <h6 className="mt-3 trade-text-5 mb-2">Assets</h6>
                  <div className="d-flex flex-row">
                    <div className="d-flex">
                      <div>
                        <img
                          src={props.pairDetails.fromCurrency.image}
                          className="img-fluid-size"
                          alt=""
                        />
                      </div>
                      <div className="ms-2">
                        <span className="d-block trade-text-7">{props.pairDetails.fromCurrency.currencySymbol}</span>
                        <span className="d-block text-spot"></span>
                      </div>
                    </div>
                    <div className="ms-auto ">
                      <span className="d-block trade-text-7">{props.decimalValue((props.userTradeDetails.fromBalance), (props.pairDetails.fromCurrency.siteDecimal))}</span>
                      <span className="d-block text-spot text-end">{props.decimalValue((props.userTradeDetails.fromBalance * props.pairDetails.fromCurrency.USDvalue), 2)}$</span>
                      <span className="d-block text-spot text-end">{props.decimalValue(props.pairDetails.fromCurrency.USDvalue, 2)}$</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div className="d-flex">
                      <div>
                        <img
                          src={props.pairDetails.toCurrency.image}
                          className="img-fluid-size"
                          alt=""
                        />
                      </div>
                      <div className="ms-2">
                        <span className="d-block trade-text-7">{props.pairDetails.toCurrency.currencySymbol}</span>
                        <span className="d-block text-spot">{props.pairDetails.toCurrency.currencyName}</span>
                      </div>
                    </div>
                    <div>
                      <span className="d-block trade-text-7">{props.decimalValue(props.userTradeDetails.toBalance, props.pairDetails.toCurrency.siteDecimal)}</span>
                      <span className="d-block text-spot text-end">{props.decimalValue((props.userTradeDetails.toBalance * props.pairDetails.toCurrency.USDvalue), 2)}$</span>
                    </div>
                  </div>

                  <div className="row justify-content-between mt-4">
                    <div className="col-6 pe-1">
                      <button className="place-order-buy-button" type="button" style={{ backgroundColor: "#14B269" }} onClick={() => { navigate('/deposit/crypto/' + props.pairDetails.fromCurrency.currencySymbol) }} >DEPOSIT</button>
                    </div>
                    <div className="col-6 ps-1">
                      <button className="place-order-buy-button text-dark" type="button" style={{ backgroundColor: "#F5F8FB" }} onClick={() => { navigate('/withdraw/crypto/' + props.pairDetails.fromCurrency.currencySymbol) }} >WITHDRAW</button>
                    </div>
                  </div>
                </div>
                :
                <div className="col-lg-12">
                </div>
            }
          </div>
        </div>
      </div>

    </div>
  );
}
