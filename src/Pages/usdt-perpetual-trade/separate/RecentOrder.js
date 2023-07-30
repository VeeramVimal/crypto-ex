import React from "react";

const RecentOrder = (props) => {
  const {
    tradeHistory = []
  } = props;
  function setTime(timeValue) {
    let dateObj = new Date(timeValue);
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    return hours.toString().padStart(2, '0')
      + ':' + minutes.toString().padStart(2, '0')
      + ':' + seconds.toString().padStart(2, '0');
  }

  // test

  return (
    <div className='trading-page-top-section-3 '>
      <div className="d-flex flex-row trading-page-top-section-2 align-items-center ">
        <div className="ps-2">
          <p className="trade-text-5 mb-0">Recent Trades</p>
        </div>
      </div>
      <div className='trading-table-left-recent-trade progress-bar-bg-color '>
        <div className="d-flex flex-row mb-1 mobile-justify-content orderbook-table-heading-section">
          <div className="progress-table-1"><span className='orderbook-text-1'>Price({props.toCurrency})</span></div>
          <div className="progress-table-2"><span className='orderbook-text-1'>Amount({props.fromCurrency})</span></div>
          <div className="progress-table-3"><span className='orderbook-text-1'>Time</span></div>
        </div>
        <div className='trading-table-left-recent-trade-height progress-bar-bg-color '>
          {tradeHistory && tradeHistory.length > 0 && tradeHistory.map((tradeHistory, i) => {
            const toDecimal = props.toDecimal > 5 ? 5 : props.toDecimal;
            const fromDecimal = props.fromDecimal > 5 ? 5 : props.fromDecimal;
            const clrClass = tradeHistory.type === 'sell' ? "color-red" : "color-green";
            return (<div key={i} className="d-flex flex-row mobile-justify-content list-hover-tooltip">
              <div className={"progress-table-1 " + (clrClass)}><span className='orderbook-text-2'>
                {/* {JSON.stringify(tradeHistory)} */}
                {props.decimalValue(tradeHistory.price, toDecimal)}</span></div>
              <div className="progress-table-2"><span className='orderbook-text-2'>{props.decimalValue(tradeHistory.volume, fromDecimal)}</span></div>
              <div className="progress-table-3"><span className='orderbook-text-2'>{setTime(tradeHistory.time)}</span></div>
            </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default RecentOrder;