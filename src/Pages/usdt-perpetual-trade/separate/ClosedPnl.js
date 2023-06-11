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
                        profitLoss = 0,
                        pAndL = 0,
                        tradeFee = 0,
                    } = elem;
                    const clrClassName = closedDir == 'buy' ? 'color-green' : 'color-red';

                    const {
                        decimalValue = 2,
                        priceDecimal = 2,
                        amountDecimal = 2,
                    } = pair;
                    return <tr key={i}>
                        <td data-label="Date">{dateFormat(closedAt)}</td>
                        <td data-label="Pair">{pairName ? pairName.replace("_", "/") : ""}</td>
                        <td data-label="Type" className={clrClassName}>{amount}</td>
                        <td data-label="Entry Price">{props.decimalValue(entryPrice, amountDecimal)}</td>
                        <td data-label="Entry Price">{props.decimalValue(exitPrice, amountDecimal)}</td>
                        <td data-label="Type" className={"capitalizeText " + (clrClassName)}>{closedDir == 'buy' ? 'Close Long' : 'Close Short'}</td>
                        <td data-label={"closedPnl "+ (profitLoss > 0 ? 'color-green': "color-red")} className={(pAndL > 0 ? 'color-green': "color-red")}>{props.decimalValue(pAndL, amountDecimal)}</td>
                        <td data-label="Fee" className={"capitalizeText"}>{tradeFee}</td>
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