import React, { useEffect, useState } from "react";
// import { TfiReload } from 'react-icons/tfi';
import $ from "jquery";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Nodates from '../../../assets/images/deposit/no-re.png';
import { dateFormat } from "../../../core/helper/date-format";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-responsive-pagination";
import "../../../pagination.css";
// import { AiFillCopy } from 'react-icons/ai';
// import { copyText } from '../../../core/helper/common';
// import { toast } from "../../../core/lib/toastAlert";

import { getOrderDetail_API } from "../../../core/services/all.api";
import TradeHistoryTable from "./TradeHistoryTable";
import TradeHistoryDetail from "./TradeHistoryDetail";
import PositionTab from "./PositionTab";
import ClosedPnl from "./ClosedPnl";

// import component
import OrderHistory from "./OrderHistory";

export default function MyOrder(props) {
  const {
    myProfile = {},
    userTradeDetails = {},
    setCurrentPage_tradeHis,
    currentPage_tradeHis,
    pageChange,
    recordsPerPage,
    socketConnection,
    userId,
    pairDetails,
  } = props;

  const navigate = useNavigate();

  const [traHisDetails, setTraHisDetails] = useState({});
  const [userHistoryTab, setUserHistoryTab] = useState("positions");
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));

  useEffect(() => {
    $(".status_change .dropdown-item").click(function () {
      var getStatusText = $(this).text();
      $(this)
        .closest(".status_dropdown")
        .find(".status__btn")
        .text(getStatusText);
      var generateStatusClass = `${$(this).attr("data-class")}-status`;
      $(this)
        .closest(".status_dropdown")
        .attr("data-color", `${generateStatusClass}`);
    });
  }, []);

  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  };

  // const copyText = (data = {}) => {
  //   if (data.text) {
  //     var input = document.createElement("input");
  //     document.body.appendChild(input);
  //     input.value = data.text;
  //     input.select();
  //     document.execCommand("Copy");
  //     input.remove();
  //     toast({ type: "success", message: data.message });
  //   }
  // }

  const getOrderDetail_call = async (orderId) => {
    setTraHisDetails({});
    const data = {
      payload: {
        orderId: orderId,
      },
    };
    const resp = await getOrderDetail_API(data);
    if (resp.status === true && resp.response) {
      setTraHisDetails(resp.response);
    }
  };

  return (
    <div>
      <div className="d-flex flex-row trading-page-order-details-section ">
        <div className=" col-12 ">
          <div className="d-flex flex-lg-row flex-column paired-trade-table-section px-3 align-items-center">
            <div className="">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setUserHistoryTab("positions")}
                >
                  <button
                    className="nav-link active"
                    id="pills-positions-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-positions"
                    type="button"
                    role="tab"
                    aria-controls="pills-positions"
                    aria-selected="false"
                  >
                    Positions(
                    {props.userTradeDetails.positionOrders
                      ? props.userTradeDetails.positionOrders.length
                      : 0}
                    )
                  </button>
                </li>
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setUserHistoryTab("open orders")}
                >
                  <button
                    className="nav-link"
                    id="pills-openorders-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-openorders"
                    type="button"
                    role="tab"
                    aria-controls="pills-openorders"
                    aria-selected="false"
                  >
                    Open Order(
                    {props.userTradeDetails.activeOrders &&
                      props.userTradeDetails.activeOrders.length}
                    )
                  </button>
                </li>
                {/* <li className="nav-item" role="presentation" onClick={() => setUserHistoryTab("Stop Limit Orders")}>
                  <button
                    className="nav-link"
                    id="pills-orderhistory-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-orderhistory"
                    type="button"
                    role="tab"
                    aria-controls="pills-orderhistory"
                    aria-selected="false"
                  >
                    Stop Limit Order({props.userTradeDetails.stopOrders && props.userTradeDetails.stopOrders.length})
                  </button>
                </li> */}
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setUserHistoryTab("Order History")}
                >
                  <button
                    className="nav-link"
                    id="pills-orderhistory-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-orderhistory"
                    type="button"
                    role="tab"
                    aria-controls="pills-orderhistory"
                    aria-selected="false"
                  >
                    Order History
                  </button>
                </li>

                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setUserHistoryTab("Trade History")}
                >
                  <button
                    className="nav-link"
                    id="pills-tradehistory-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-tradehistory"
                    type="button"
                    role="tab"
                    aria-controls="pills-tradehistory"
                    aria-selected="false"
                  >
                    Trade History
                  </button>
                </li>

                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setUserHistoryTab("Closed PnL")}
                >
                  <button
                    className="nav-link"
                    id="pills-closepnl-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-closepnl"
                    type="button"
                    role="tab"
                    aria-controls="pills-closepnl"
                    aria-selected="false"
                  >
                    Closed P&L
                  </button>
                </li>
                {/* <li className="nav-item">
                  <button className="popup-modal-button-my-orders" onClick={()=>copyText({
                    message: "Order ID copied successfully!",
                    text: "Zfadfad"
                  })}>
                    copy text
                  </button>
                </li> */}
                {/* <li className="nav-item">
                  <button className="popup-modal-button-my-orders" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Popup
                  </button>
                </li> */}
              </ul>
            </div>
            {/* <div className="ms-lg-auto d-flex align-items-center mt-lg-0 mt-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label trade-text-6 mb-0" for="flexCheckDefault">
                  Hide other pairs
                </label>
              </div>
              <div className="ms-3">
                <button type="button" className="paired-refresh-button"><TfiReload className="me-2" />Refresh</button>
              </div>
            </div> */}
          </div>

          {/* <div className="d-flex flex-lg-row flex-column fle mt-3 px-3 align-items-center gap-lg-0 gap-2">
            <div className="d-flex">
              <button type="button" className="paired-refresh-button me-3">1 Day</button>
              <button type="button" className="paired-refresh-button me-3">1 Week</button>
              <button type="button" className="paired-refresh-button me-3">1 Month</button>
              <button type="button" className="paired-refresh-button me-3">3 Months</button>
            </div>
            <div className="d-flex align-items-center mt-lg-1">
              <span className="trade-text-6 mt-lg-1 me-3">Time</span>
              <DatePicker className="datepicker-css-styling trade-text-6"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              /> <span className="trade-text-6 mt-lg-1 me-3">To</span>
              <DatePicker className="datepicker-css-styling trade-text-6"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
            <div className="me-3 d-flex">
              <button className="spot-table-search-button border-0 me-3" type="button" style={{ backgroundColor: "#14B269" }}>Search</button>
              <button className="spot-table-search-button text-dark" type="button" style={{ backgroundColor: "#F5F8FB" }}>Reset</button>
            </div>
          </div> */}
          {myProfile && myProfile._id ? (
            <>
              <div className="px-2 trading-page-order-table-details-section pt-3">
                {userHistoryTab == "positions" && (
                  <PositionTab
                    positionOrders={
                      props.userTradeDetails &&
                      props.userTradeDetails.positionOrders
                    }
                    decimalValue={props.decimalValue}
                    socketConnection={socketConnection}
                    userId={userId}
                    pairDetails={pairDetails}
                  />
                )}
                {userHistoryTab == "open orders" && (
                  <table className="table">
                    <thead>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>Order Type</th>
                      <th>Side</th>
                      {/* <th className="p-0">
                        <div className="dropdown custom-dropdown status_dropdown p-0" data-color="created-status">
                          <button className="select-dropdown-btn dropdown-toggle  d-flex align-items-center justify-content-between status__btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                            Side
                          </button>
                          <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" data-class="All" href="#">All</a></li>
                            <li><a className="dropdown-item" data-class="Buy" href="#">Buy</a></li>
                            <li><a className="dropdown-item" data-class="Sell" href="#">Sell</a></li>
                          </ul>
                        </div>
                      </th> */}
                      <th>Price</th>
                      <th>Conditions</th>
                      <th>Amount</th>
                      <th>Filled</th>
                      <th>Remaining</th>
                      <th>Total</th>
                      <th>Status</th>
                      {/* <th>Order ID</th> */}
                    </thead>
                    <tbody>
                      {userTradeDetails.activeOrders.length > 0 &&
                        userTradeDetails.activeOrders.map((elem, i) => {
                          const {
                            pair = {},
                            pairName = "",
                            dateTime = "",
                            orderType = "",
                            type = "",
                            filledAmount = 0,
                            amount = 0,
                            price = 0,
                            tpSl = "",
                          } = elem;
                          const clrClassName =
                            type == "buy" ? "color-green" : "color-red";
                          const tpshow =
                            tpSl == "tp"
                              ? "Mark price >="
                              : tpSl == "sl"
                              ? "Mark price <="
                              : "";

                          const {
                            decimalValue = 2,
                            priceDecimal = 2,
                            amountDecimal = 2,
                          } = pair;
                          return (
                            <tr key={i}>
                              <td data-label="Date">{dateFormat(dateTime)}</td>
                              <td data-label="Pair">
                                {pairName ? (
                                  <Link to={"/spot/" + pairName}>
                                    {pairName.replace("_", "/")}
                                  </Link>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td data-label="Type" className="capitalizeText">
                                {orderType}
                              </td>
                              <td
                                data-label="Type"
                                className={"capitalizeText " + clrClassName}
                              >
                                {type}
                              </td>
                              <td data-label="Price">
                                {props.decimalValue(price, decimalValue)}
                              </td>
                              <td data-label="Conditions">
                                {tpshow}
                                {tpshow
                                  ? props.decimalValue(price, decimalValue)
                                  : "-"}
                              </td>
                              <td data-label="Amount">
                                {props.decimalValue(amount, amountDecimal)}
                              </td>
                              <td data-label="Filled">
                                {props.decimalValue(
                                  filledAmount,
                                  amountDecimal
                                )}
                              </td>
                              <td data-label="Remaining">
                                {props.decimalValue(
                                  amount - filledAmount,
                                  amountDecimal
                                )}
                              </td>
                              <td data-label="Total">
                                {props.decimalValue(
                                  amount * price,
                                  priceDecimal
                                )}
                              </td>
                              <td data-label="Status">
                                <button
                                  type="button"
                                  className="market-trade-button"
                                  onClick={() => props.cancelOrder(elem._id)}
                                >
                                  Cancel
                                </button>
                              </td>
                              {/* <td data-label="OrderID"><button type="button" className="market-trade-button" onClick={() => props.orderDetail(elem._id)}>{elem._id}</button></td> */}
                            </tr>
                          );
                        })}
                      {props.userTradeDetails.activeOrders.length == 0 && (
                        <tr colSpan={9}>
                          <td className="color-white" colSpan="7">
                            No Active Orders Found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
                {userHistoryTab == "Order History" && (
                  <OrderHistory {...props} />
                )}
                {userHistoryTab == "Stop Limit Orders" && (
                  <table className="table">
                    <thead>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      {/* <th>Order ID</th> */}
                      <th>Status</th>
                    </thead>
                    <tbody>
                      {userTradeDetails.stopOrders.length > 0 &&
                        userTradeDetails.stopOrders.map((elem, i) => {
                          const {
                            pair = {},
                            pairName = "",
                            dateTime = "",
                            type = "",
                            price = 0,
                            amount = 0,
                            filledAmount = 0,
                          } = elem;
                          const clrClassName =
                            type == "buy" ? "color-green" : "color-red";
                          const {
                            amountDecimal = 2,
                            priceDecimal = 2,
                            decimalValue = 2,
                          } = pair;
                          return (
                            <tr key={i}>
                              <td data-label="date">{dateFormat(dateTime)}</td>
                              <td data-label="Pair">
                                {pairName ? (
                                  <Link to={"/spot/" + pairName}>
                                    {pairName.replace("_", "/")}
                                  </Link>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td
                                data-label="Type"
                                className={"capitalizeText " + clrClassName}
                              >
                                {type}
                              </td>
                              <td data-label="Price">
                                {props.decimalValue(price, priceDecimal)}
                              </td>
                              <td data-label="Amount">
                                {props.decimalValue(amount, amountDecimal)}
                              </td>
                              <td data-label="Filled">
                                {props.decimalValue(
                                  filledAmount,
                                  amountDecimal
                                )}
                              </td>
                              <td data-label="Total">
                                {props.decimalValue(
                                  amount * price,
                                  priceDecimal
                                )}
                              </td>
                              {/* <td data-label="OrderID"><button type="button" className="market-trade-button" onClick={() => props.orderDetail(elem._id)}>{elem._id}</button></td> */}
                              <td data-label="Status">
                                <button
                                  type="button"
                                  className="market-trade-button"
                                  onClick={() => props.cancelOrder(elem._id)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      {props.userTradeDetails.stopOrders.length == 0 && (
                        <tr colSpan={8}>
                          <td className="color-white" colSpan="7">
                            No Active Orders Found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
                {userHistoryTab == "Trade History" && (
                  <>
                    <TradeHistoryTable
                      traHisData={userTradeDetails.tradeHistory}
                      getOrderDetail_call={getOrderDetail_call}
                      decimalValue={props.decimalValue}
                    />
                    {userTradeDetails.count &&
                    userTradeDetails.count.tradeHistory &&
                    userTradeDetails.count.tradeHistory / recordsPerPage > 1 ? (
                      <Pagination
                        className="pagination"
                        total={Math.ceil(
                          userTradeDetails.count.tradeHistory / recordsPerPage
                        )}
                        current={currentPage_tradeHis}
                        onPageChange={(page) => clickPageNo(page)}
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
                {userHistoryTab == "Closed PnL" && <ClosedPnl {...props} />}
              </div>
            </>
          ) : (
            <div className="trading-page-order-tabs-section pt-5">
              <span className="trade-bottom-login-text-1">
                <span className="fc-g" onClick={() => navigate("/login")}>
                  Login{" "}
                </span>
                (or)
                <span className="fc-g" onClick={() => navigate("/register")}>
                  {" "}
                  Register Now
                </span>{" "}
                to trade
              </span>
            </div>
          )}
        </div>
      </div>

      <TradeHistoryDetail
        traHisDetails={traHisDetails}
        decimalValue={props.decimalValue}
      />
    </div>
  );
}
