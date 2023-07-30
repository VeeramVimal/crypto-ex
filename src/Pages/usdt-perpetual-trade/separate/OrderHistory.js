// import package
import React from 'react'

// import Helper
import { dateFormat } from '../../../core/helper/date-format';

const OrderHistory = (props) => {

    const {
        userTradeDetails = {},
    } = props;

    return (
        <table className="table">
            <thead>
                <th>Date</th>
                <th>Pair</th>
                <th>Order Type</th>
                <th>Side</th>
                <th>Price</th>
                <th>Filled Price</th>
                <th>Amount</th>
                <th>Filled</th>
                <th>Remaining</th>
                <th>Total</th>
            </thead>
            <tbody>
                {userTradeDetails.orderHistory.length > 0 && userTradeDetails.orderHistory.map((elem, i) => {
                    const {
                        pair = {},
                        pairName = "",
                        dateTime = "",
                        orderType = "",
                        type = "",
                        filledAmount = 0,
                        amount = 0,
                        price = 0,
                    } = elem;
                    const clrClassName = type == 'buy' ? 'color-green' : 'color-red';

                    const {
                        decimalValue = 2,
                        priceDecimal = 2,
                        amountDecimal = 2,
                    } = pair;
                    return <tr key={i}>
                        <td data-label="Date">{dateFormat(dateTime)}</td>
                        <td data-label="Pair">{pairName.replace("_", "/")}</td>
                        <td data-label="Type" className="capitalizeText">{orderType}</td>
                        <td data-label="Type" className={"capitalizeText " + (clrClassName)}>{type}</td>
                        <td data-label="Filled Price">{orderType == 'market' ? 'Market' : props.decimalValue(price, amountDecimal)}</td>
                        <td data-label="Price">{props.decimalValue(price, decimalValue)}</td>
                        <td data-label="Amount">{props.decimalValue(amount, amountDecimal)}</td>
                        <td data-label="Filled">{props.decimalValue(filledAmount, amountDecimal)}</td>
                        <td data-label="Remaining">{props.decimalValue(amount - filledAmount, amountDecimal)}</td>
                        <td data-label="Total">{props.decimalValue((amount * price), priceDecimal)}</td>
                    </tr>
                })}
                {props.userTradeDetails.orderHistory.length == 0 &&
                    <tr colSpan={9}>
                        <td className='color-white' colSpan="7">No Orders Found!</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default OrderHistory