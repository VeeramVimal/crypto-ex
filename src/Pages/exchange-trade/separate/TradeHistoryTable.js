import React, { useEffect, useState } from "react";
import { dateFormat, showPhone, showPairName } from '../../../core/helper/date-format';
import { useParams, Link, useNavigate } from "react-router-dom";
import Config from "../../../core/config/";

export default function TradeHistoryTable(props) {
  return (
    <>
      <table className="table">
        <thead>
          {/* <th>S.no</th> */}
          <th>Date</th>
          <th>Pair</th>
          <th>Side</th>
          <th>Price</th>
          <th>Filled</th>
          <th>Total</th>
          <th>Fees</th>
          <th>Fee Type</th>
          {/* <th>Role</th> */}
          <th>Status</th>
        </thead>
        <tbody>
          {
          props.traHisData && props.traHisData.length > 0 &&
            props.traHisData.map((elem, i) => {
              const {
                _id: tradeId = "",
                MappingOrders = {},
                orderId = "",
                type: side = "",
              } = elem;
              const {
                pairName = "",
                pair = {},
                Profit = [],
                dateTime = "",
                orderType = "",
                tradePrice = 0,
                filledAmount = 0,
                role = "",
                status = "Filled",
              } = MappingOrders;
              const clrClassName = side == "buy" ? "color-green" : "color-red";

              const { amountDecimal = 0, priceDecimal = 0, totalDecimal = 0 } = pair;

              const { currency: profitCurrency = {}, totalFees = 0 } = Profit[0] ? Profit[0] : {};

              const {
                currencySymbol: profit_currencySymbol = "",
                siteDecimal: profit_siteDecimal = 2,
              } = profitCurrency;

              let userFeeReduced = (Profit && Profit[0]) ? Profit[0].userFeeReduced : "";
              const feesDecimal =
                userFeeReduced !== "tradeFeeVoucher" &&
                userFeeReduced !== "fanToken"
                  ? profit_siteDecimal
                  : side == "buy"
                  ? amountDecimal
                  : priceDecimal;

              if (userFeeReduced == "tradeFeeVoucher") {
                userFeeReduced = "Voucher";
              } else if (userFeeReduced == "fanToken") {
                userFeeReduced = Config.FanTknSymbol;
              } else if (userFeeReduced == "respective") {
                userFeeReduced = "Respective";
              }

              return (
                <tr key={i}>
                  {/* <td data-label="i">{i}</td> */}
                  <td data-label="Pair">{dateFormat(dateTime)}</td>
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
                    {side}
                  </td>
                  <td data-label="Price">{props.decimalValue(tradePrice, priceDecimal)}</td>
                  <td data-label="Filled">{filledAmount.toFixed(amountDecimal)}</td>
                  <td data-label="Total">{props.decimalValue((filledAmount * tradePrice), totalDecimal)}</td>
                  <td data-label="Fees">{props.decimalValue(totalFees, feesDecimal)} {profit_currencySymbol}</td>
                  <td data-label="Type">{userFeeReduced}</td>
                  {/* <td data-label="Role" className="capitalizeText">
                    {role}
                  </td> */}
                  <td data-label="Status">
                    <button
                      className="popup-modal-button-my-orders capitalizeText"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        props.getOrderDetail_call(tradeId);
                      }}
                    >
                      {status}
                    </button>
                  </td>
                </tr>
              );
            })
          }
          {props.traHisData && props.traHisData.length === 0 && (
            <tr colSpan={8}>
              <td className="color-white" colSpan="7">
                No Active Orders Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
