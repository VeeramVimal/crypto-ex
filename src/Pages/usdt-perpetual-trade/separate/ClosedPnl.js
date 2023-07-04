// import package
import React from 'react'

// import Helper
import { dateFormat } from '../../../core/helper/date-format';

const ClosedPnl = (props) => {

    const {
        userTradeDetails = {},
    } = props;

    return (
        <table className="table">
            <thead>
                <th>Date</th>
                <th>Pair</th>
                <th>Amount</th>
                <th>Entry Price</th>
                <th>Exit Price</th>
                <th>Trade Type</th>
                <th>Closed P&L</th>
                <th>Fee</th>
                <th>Exit Type</th>
            </thead>
            <tbody>
                {
                (userTradeDetails.closedPnl && userTradeDetails.closedPnl.length > 0) ? userTradeDetails.closedPnl.map((elem, i) => {
                    const {
                        pair = {},
                        pairName = "",
                        closedAt = "",
                        closedDir = "",
                        amount = 0,
                        entryPrice = 0,
                        exitPrice = 0,
                        type = "",
                        tradeFee = 0,
                    } = elem;

                    const {
                        priceDecimal = 2,
                        amountDecimal = 2,
                    } = pair;

                    let {
                        pAndL = 0,
                    } = elem;

                    pAndL = props.decimalValue(pAndL, amountDecimal);
                    const clrClassName = closedDir == 'buy' ? 'color-green' : 'color-red';
                    
                    let profitLoss = elem.profitLoss ? elem.profitLoss : 0;
                    if(type == "liquidation" && profitLoss > 0) {
                        profitLoss = -(profitLoss);
                    }
                    
                    return <tr key={i}>
                        <td data-label="Date">{dateFormat(closedAt)}</td>
                        <td data-label="Pair">{pairName ? pairName.replace("_", "/") : ""}</td>
                        <td data-label="Type" className={clrClassName}>{amount}</td>
                        <td data-label="Entry Price">{props.decimalValue(entryPrice, priceDecimal)}</td>
                        <td data-label="Entry Price">{props.decimalValue(exitPrice, priceDecimal)}</td>
                        <td data-label="Type" className={"capitalizeText " + (clrClassName)}>{closedDir == 'buy' ? 'Close Long' : 'Close Short'}</td>
                        <td data-label={"closedPnl "+ ((pAndL < 0 || type == "liquidation") ? 'color-red': "color-green")} className={((pAndL < 0 || type == "liquidation") ? 'color-red': "color-green")}>{pAndL}</td>
                        <td data-label="Fee" className={"capitalizeText"}>{props.decimalValue(tradeFee, priceDecimal)}</td>
                        <td data-label="Type" className={"capitalizeText"}>{type}</td>
                    </tr>
                }) :
                    <tr colSpan={9}>
                        <td className='color-white' colSpan="7">No Closed P&L Found!</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default ClosedPnl