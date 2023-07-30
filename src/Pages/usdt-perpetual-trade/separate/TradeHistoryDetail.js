import React, { useEffect, useState } from "react";
import { getOrderDetail_API } from "../../../core/services/all.api";
import {
  dateFormat,
  showPhone,
  showPairName,
} from "../../../core/helper/date-format";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function TradeHistoryDetail(props) {
  let { traHisDetails } = props;
  return (
    <>
      <div
        className="modal fade order-bookexchange-modal"
        id="exampleModal"
        tabindex="1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-4" id="exampleModalLabel">
                Order Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-2">
              <div className="card">
                <div className="card-body">
                  {traHisDetails &&
                  traHisDetails.orderDetails &&
                  traHisDetails.orderDetails["Trade type"] ? (
                    <>
                      <span
                        className={
                          "order-bookexchange-modal-text-1 capitalizeText color-" +
                          traHisDetails.orderDetails["Trade type"]
                        }
                      >
                        {traHisDetails.orderDetails["Trade type"]}{" "}
                        {traHisDetails.orderDetails["Order type"]}
                      </span>
                      <span className="order-bookexchange-modal-text-2 ms-3">
                        {showPairName(traHisDetails.orderDetails["Pair name"])}
                      </span>
                      <div className="row my-3">
                        <div className="col-lg-6">
                          <div className="row">
                            <div className="col-6">
                              <p className="order-bookexchange-modal-text-3">
                                Trade type
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Amount
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Created at
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                From currency
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                To currency
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Before Debit
                              </p>
                            </div>
                            <div className="col-6">
                              <p
                                className={
                                  "order-bookexchange-modal-text-4 capitalizeText color-" +
                                  traHisDetails.orderDetails["Trade type"]
                                }
                              >
                                {traHisDetails.orderDetails["Trade type"]}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {props.decimalValue(traHisDetails.orderDetails["Amount"])}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {dateFormat(
                                  traHisDetails.orderDetails["Created at"]
                                )}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {traHisDetails.orderDetails["From currency"]}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {traHisDetails.orderDetails["To currency"]}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {props.decimalValue(traHisDetails.orderDetails["Before debit"])} {traHisDetails.orderDetails["Debit currency"]}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="row">
                            <div className="col-6">
                              <p className="order-bookexchange-modal-text-3">
                                Order ID
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Price
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Progress
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Updated at
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                Status
                              </p>
                              <p className="order-bookexchange-modal-text-3">
                                After Debit
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="order-bookexchange-modal-text-4">
                                {traHisDetails.orderDetails["Order ID"]}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {props.decimalValue(traHisDetails.orderDetails["Price"])}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {traHisDetails.orderDetails["Progress"]}
                              </p>
                              <p className="order-bookexchange-modal-text-4">
                                {dateFormat(
                                  traHisDetails.orderDetails["Updated at"]
                                )}
                              </p>
                              <p className="order-bookexchange-modal-text-4 capitalizeText">
                                {traHisDetails.orderDetails["Status"]}
                              </p>
                              <p className="order-bookexchange-modal-text-4 capitalizeText">
                                {props.decimalValue(traHisDetails.orderDetails["After debit"])} {traHisDetails.orderDetails["Debit currency"]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="order-bookexchange-modal-text-2 mb-3">
                        PARTIAL ORDERS (
                        {traHisDetails &&
                          traHisDetails.partialOrders &&
                          traHisDetails.partialOrders.length}
                        )
                      </span>
                      <table className="mt-3 ">
                        <thead>
                          <tr>
                            <th scope="col">Price</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Executed Date</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Role</th> */}
                            {/* <th scope="col">Order ID</th> */}
                            <th scope="col">Before Credit</th>
                            <th scope="col">After Credit</th>
                            <th scope="col">Credit Amount</th>
                            <th scope="col">Fees</th>
                            {/* <th scope="col">Type</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {traHisDetails.partialOrders &&
                          traHisDetails.partialOrders.length > 0
                            ? traHisDetails.partialOrders.map((elem, i) => {
                                return (
                                  <tr key={i}>
                                    <td data-label="Price">{elem["Price"]}</td>
                                    <td data-label="Amount">
                                      {props.decimalValue(elem["Amount"])}
                                    </td>
                                    <td data-label="Executed Date">
                                      {dateFormat(elem["Executed Date"])}
                                    </td>
                                    <td
                                      data-label="Status"
                                      className={
                                        "capitalizeText clr-" + elem["Status"]
                                      }
                                    >
                                      {elem["Status"]}
                                    </td>
                                    {/* <td className="capitalizeText">
                                      {elem["Role"]}
                                    </td> */}
                                    {/* <td data-label="Period">
                                      {showPhone(elem["Order ID"])} */}
                                      {/* <AiFillCopy style={{color:"#00DBAE"}} onClick={()=>copyText({
                                        message: "Order ID copied successfully!",
                                        text: elem['Order ID']
                                      })}/> */}
                                    {/* </td> */}
                                    {elem["execute"] ? (
                                      <>
                                        <td data-label="beforeExecuteBal">
                                          {props.decimalValue(elem["execute"].oldBalance)}
                                        </td>
                                        <td data-label="afterExecuteBal">
                                          {props.decimalValue(elem["execute"].amount)}
                                        </td>
                                        <td data-label="currency">
                                          {props.decimalValue(elem["execute"].difference)}{" "}
                                          {elem["execute"].currency}
                                        </td>
                                      </>
                                    ) : (
                                      <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </>
                                    )}
                                    {elem["fees"] ? (
                                      <>
                                        <td>
                                          {elem["fees"].value}{" "}
                                          {elem["fees"].currency}
                                        </td>
                                        {/* <td>{elem["fees"].type}</td> */}
                                      </>
                                    ) : (
                                      <>
                                        <td></td>
                                        {/* <td></td> */}
                                      </>
                                    )}
                                  </tr>
                                );
                              })
                            : ""}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <h5>Loading...</h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
