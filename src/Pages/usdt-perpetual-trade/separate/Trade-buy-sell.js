import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import {
  Checkbox
} from "@mui/material";

import $ from "jquery";
import { FaMinusSquare, FaPlusSquare} from 'react-icons/fa';
import { useContextData } from '../../../core/context/index';
import { tradeFanTknFeesAuth_API } from "../../../core/services/all.api";
import { toast } from "../../../core/lib/toastAlert";
import Config from "../../../core/config/";

const STEP = 1;
const MIN = 1;

export default function Spot(props) {

  let {
    range = [0]
  } = props;

  const leverageFutures = localStorage.getItem('leverageFutures') ? localStorage.getItem('leverageFutures') : 25;

  const [MAX, setMAX] = useState(0);

  useEffect(() => {
    if ((props && props.pairDetails && props.pairDetails.maxLeverage) && MAX == 0) {
      let localLeve = localStorage.getItem('leverageFutures') ? parseInt(localStorage.getItem('leverageFutures')) : 2;

      if (localLeve > props.pairDetails.maxLeverage) {
        localLeve = 2;
      }
      console.log("---", props.pairDetails.maxLeverage, localLeve);
      setMAX(parseInt(props.pairDetails.maxLeverage));
      props.setRange({ leverage: [localLeve] });
    }
  }, [props]);

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

  const [orderPlacementPrefer, setOrderPlacementPrefer] = useState("Value");

  const navigate = useNavigate();

  const levValChangePlusMin = (val) => {
    let curLevVal = 0;
    if(props.range && props.range.leverage && props.range.leverage[0]) {
      curLevVal = props.range.leverage[0];
    }
    if(val == "min") {
      curLevVal = curLevVal -1;
    }

    if(val == "plus") {
      curLevVal = curLevVal +1;
    }

    if(curLevVal >= MIN && curLevVal <= MAX) {
      levValChange([curLevVal]);
    }
  }

  const levValChange = (val) => {
    props.setRange({ leverage: val });
    props.calculateValues(val, "leverage");
    if (val && val[0]) {
      localStorage.setItem('leverageFutures', val[0]);
    }
  }

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
                Buy/Long
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
                Sell/Short
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
                {/* <li><a className="dropdown-item" data-class="stopLimit" href="javascript:void(0)" onClick={(e) => props.setOrderType('stopLimit')}>Stop Limit</a></li>
                <li><a className="dropdown-item" data-class="stopMarket" href="javascript:void(0)" onClick={(e) => props.setOrderType('stopMarket')}>Stop Market</a></li>
                <li><a className="dropdown-item" data-class="trailingStop" href="javascript:void(0)" onClick={(e) => props.setOrderType('trailingStop')}>Trailing Stop</a></li>
                <li><a className="dropdown-item" data-class="postOnly" href="javascript:void(0)" onClick={(e) => props.setOrderType('postOnly')}>Post Only</a></li>
                <li><a className="dropdown-item" data-class="twap" href="javascript:void(0)" onClick={(e) => props.setOrderType('twap')}>TWAP</a></li> */}
              </ul>
            </div>

            {((props.range && props.range.leverage && props.range.leverage[0] > 0) && (MAX > 0)) ?
              <>
                <p className="trade-text-6 mt-3">Leverage </p>
                <div className="mx-1 d-flex align-items-center flex-row justify-content-between">
                  <FaMinusSquare className="plus-minus-css-styling" onClick={() => levValChangePlusMin("min")}/>
                  <div className="input-group  px-2">
                    <Range
                      className=""
                      values={props.range.leverage}
                      step={STEP}
                      min={MIN}
                      max={MAX}
                      onChange={(val) => {
                        levValChange(val);
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          onMouseDown={props.onMouseDown}
                          onTouchStart={props.onTouchStart}
                          style={{
                            ...props.style,
                            height: "36px",
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <div
                            ref={props.ref}
                            className="percentage-line-section"
                            style={{
                              background: getTrackBackground({
                                values: (range.leverage) ? range.leverage : [0],
                                colors: [
                                  "#00DBAE",
                                  "rgb(220, 224, 229)",
                                ],
                                min: MIN,
                                max: MAX,
                              }),
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      )}
                      renderThumb={({ props, isDragged }) => (
                        <div
                          className="percentage-display-section"
                          {...props}
                        >
                          <span className="total-value-price-section">
                            {range && range.leverage}{" "}X
                          </span>
                        </div>
                      )}
                    />

                  </div>
                  <FaPlusSquare className="plus-minus-css-styling" onClick={() => levValChangePlusMin("plus")}/>
                </div>
              </> : ""
            }

            {props.orderData.orderType == 'stop' &&
              <>
                <p className="trade-text-6 mt-3">Stop Price</p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={(event) => props.calculateValues(event.target.value, 'stopPrice')}
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
            {props.orderData.orderType != 'market' &&
              <>
                <p className="trade-text-6 mt-3">{props.orderData.orderType == 'stop' ? 'Limit Price' : 'Price'} ({props.toCurrency})</p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={(event) => props.calculateValues(event.target.value, 'price')}
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
                onChange={(event) => props.calculateValues(event.target.value, 'amount')}
                name='amount'
                id="amount"
                value={props.orderData.amount}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text" id="basic-addon1">{props.fromCurrency}</span>
            </div>

            {
              (myProfile && myProfile._id) &&
              <div className="place-order-buy-sell-percentage-tabs mb-3">
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
              </div>
            }

            <div className="input-group mb-3">
              <Checkbox
                checked={props.orderData.isTP}
                onChange={(e) => {
                  props.serOrderData((prev) => {
                    return {
                      ...prev,
                      isTP: e.target.checked
                    }
                  })
                }}
                inputProps={{
                  "aria-label": "controlled",
                }}
                label="Take Profit"
              />
              <p className="trade-text-6 mt-3">Take Profit</p>
            </div>

            {
              props.orderData.isTP == true && <>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={(e) => {
                      props.serOrderData((prev) => {
                        return {
                          ...prev,
                          tpPrice: e.target.value
                        }
                      })
                    }}
                    name='tpPrice'
                    id="tpPrice"
                    value={props.orderData.tpPrice}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text" id="basic-addon1">{props.toCurrency}</span>
                </div>
              </>
            }

            <div className="input-group mb-3">
              <Checkbox
                checked={props.orderData.isSL}
                onChange={(e) => {
                  props.serOrderData((prev) => {
                    return {
                      ...prev,
                      isSL: e.target.checked
                    }
                  })
                }}
                inputProps={{
                  "aria-label": "controlled",
                }}
                label="Stop Loss"
              />
              <p className="trade-text-6 mt-3">Stop Loss</p>
            </div>

            {
              props.orderData.isSL == true && <>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={(e) => {
                      props.serOrderData((prev) => {
                        return {
                          ...prev,
                          slPrice: e.target.value
                        }
                      })
                    }}
                    name='slPrice'
                    id="slPrice"
                    value={props.orderData.slPrice}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text" id="basic-addon1">{props.toCurrency}</span>
                </div>
              </>
            }

            {(myProfile && myProfile._id) ?
              <>
                {props.orderData.type === 'buy' ?
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
                      <>Buy/Long</>
                    }
                  </button>
                  :
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
                      <>Sell/Short</>
                    }
                  </button>
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

          {
            myProfile && myProfile._id && <div className="row">
              <div className="col-lg-12">
                <div className="d-flex flex-row">
                  <div className="d-flex">
                    <div className="ms-2">
                      <span className="d-block trade-text-7">Order Value</span>
                      <span className="d-block text-spot"></span>
                    </div>
                  </div>
                  <div className="ms-auto ">
                    <span className="d-block trade-text-7">{props.orderData.orderValue} USDT</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="d-flex">
                    <div className="ms-2">
                      <span className="d-block trade-text-7">Order Cost</span>
                      <span className="d-block text-spot"></span>
                    </div>
                  </div>
                  <div className="ms-auto ">
                    <span className="d-block trade-text-7">{props.orderData.orderCost} USDT</span>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="row">
            {
              (props.userTradeDetails && props.userTradeDetails.userId && props.pairDetails && props.pairDetails.fromCurrency) ?
                <div className="col-lg-12">
                  <h6 className="mt-3 trade-text-5 mb-2">Assets</h6>
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
                      <button className="place-order-buy-button" type="button" style={{ backgroundColor: "#14B269" }} onClick={() => { navigate('/deposit/crypto/' + props.pairDetails.toCurrency.currencySymbol) }} >DEPOSIT</button>
                    </div>
                    <div className="col-6 ps-1">
                      <button className="place-order-buy-button text-dark" type="button" style={{ backgroundColor: "#F5F8FB" }} onClick={() => { navigate('/withdraw/crypto/' + props.pairDetails.toCurrency.currencySymbol) }} >WITHDRAW</button>
                    </div>
                  </div>
                </div>
                :
                <div className="col-lg-12">
                </div>
            }
          </div>
          <hr />

          <div className="row" style={{ display: "none" }}>
            <div className="col-lg-12">
              <h6 className="mt-3 trade-text-5 mb-2">Margin Ratio</h6>
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <div className="ms-2">
                    <span className="d-block trade-text-7">Margin Ratio</span>
                    <span className="d-block text-spot"></span>
                  </div>
                </div>
                <div className="ms-auto ">
                  <span className="d-block trade-text-7">0.00%</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div className="d-flex">
                  <div className="ms-2">
                    <span className="d-block trade-text-7">Maintenance Margin</span>
                    <span className="d-block text-spot"></span>
                  </div>
                </div>
                <div className="ms-auto ">
                  <span className="d-block trade-text-7">0.0000 USDT</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div className="d-flex">
                  <div className="ms-2">
                    <span className="d-block trade-text-7">Margin Balance</span>
                    <span className="d-block text-spot"></span>
                  </div>
                </div>
                <div className="ms-auto ">
                  <span className="d-block trade-text-7">0.0000 USDT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
