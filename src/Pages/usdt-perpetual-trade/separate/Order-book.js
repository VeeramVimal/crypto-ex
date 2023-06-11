import React, { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

const OrderBook = (props) => {

  const {
    viewOrderList = [],
    pairDetails = {}
  } = props;

  const {
    decimalValue: toDecimal = 2,
    fromCurrency = {},
    toCurrency = {},
    amountDecimal = 2,
    priceDecimal = 2,
  } = pairDetails;

  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);

  useEffect(() => {
    let getMinValue = 0;
    let getMaxValue = 0;
    viewOrderList.map((elmObj, index) => {
      const totalMin = (elmObj.amount - elmObj.filledAmount) * elmObj._id;
      if (totalMin != 0) {
        if (getMinValue > totalMin) {
          getMinValue = totalMin;
        }
      }
      const totalMax = (elmObj.amount - elmObj.filledAmount) * elmObj._id;
      if (getMaxValue < totalMax) {
        getMaxValue = totalMax;
      }
    });
    setMinVal(getMinValue);
    setMaxVal(getMaxValue);
  }, [viewOrderList]);

  return (
    <>
      {/* {props.reverse === "yes" ?
        <ReactTooltip id='tradingtabletooltipOne0' effect="solid" place="left" className="tooltip-text-Theme">
          <div className="d-flex flex-row">
            <div className="">
              <p className="tooltip-text-2">Avg.price:</p>
            </div>
            <div className="ms-auto">
              <span className="tooltip-text-3">1779456.33347</span>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="">
              <p className="tooltip-text-2">Sum BTC:</p>
            </div>
            <div className="ms-auto">
              <span className="tooltip-text-3">0.01587</span>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="">
              <p className="tooltip-text-2">Sum INR:</p>
            </div>
            <div className="ms-auto">
              <span className="tooltip-text-3">20070.53549</span>
            </div>
          </div>
        </ReactTooltip>
        :
        <ReactTooltip id='tradingtabletooltipTwo0' effect="solid" place="left" className="tooltip-text-Theme">
          <div className="d-flex flex-row">
            <div className="">
              <p className="tooltip-text-2">Avg.price:</p>
            </div>
            <div className="ms-auto">
              <span className="tooltip-text-3">1779456.33347</span>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="">
              <p className="tooltip-text-2">Sum BTC:</p>
            </div>
            <div className="ms-auto">
              <span className="tooltip-text-3">0.01587</span>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="">
              <p className="tooltip-text-2">Sum INR:</p>
            </div>
            <div className="ms-auto">
              <span className="tooltip-text-3">20070.53549</span>
            </div>
          </div>
        </ReactTooltip>} */}
      <ul>
        {
          props.viewOrderList && props.viewOrderList.length > 0
            ?
            props.viewOrderList.slice(0, props.viewLimit).map((elmObj, index) => {
              const total = (elmObj.amount - elmObj.filledAmount) * elmObj._id;
              const perVal = (total / maxVal) * 100;
              const classIndexbased = index === 0 ? "m-0 p-0" : "";
              const toDecimalOB = toDecimal > 5 ? 5 : toDecimal;
              const siteDecimalOB = fromCurrency.siteDecimal > 5 ? 5 : fromCurrency.siteDecimal;

              const clrBarClass = props.orderListType === 'all' || props.orderListType === 'sell' ? "ask-bar" : "bid_bar_imp";
              const clrClass = props.orderListType === 'all' || props.orderListType === 'sell' ? "color-red" : "color-green";
              return (
                <li className={classIndexbased} key={index}>
                  <div className="d-flex flex-row mobile-justify-content" onClick={() => props.clickOrderBook(elmObj)}>
                    <div className={"progress-bar " + (clrBarClass)} style={{ width: perVal + "%" }}></div>
                    <div className={"progress-table-1 " + (clrClass)}><span className={'orderbook-text-2'}>{props.decimalValueFunc(elmObj._id, priceDecimal)}</span></div>
                    <div className="progress-table-2"><span className='orderbook-text-2'>{props.decimalValueFunc(elmObj.amount - elmObj.filledAmount, amountDecimal)}</span></div>
                    <div className="progress-table-3"><span className='orderbook-text-2'>{props.decimalValueFunc((elmObj.amount - elmObj.filledAmount) * elmObj._id, priceDecimal)}</span></div>
                  </div>
                </li>
              )
            })
            :
            <></>
        }
      </ul>
    </>
  )
}

export default OrderBook;