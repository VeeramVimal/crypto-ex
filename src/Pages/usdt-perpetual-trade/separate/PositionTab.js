// import package
import React, { Fragment, useRef } from 'react'

// import component
import PositionCloseModal from './PositionCloseModal'
import UnrealizedPnl from './UnrealizedPnl';
import UnrealizedPnlVal from './UnrealizedPnlVal';

// import helper
import { dateFormat } from '../../../core/helper/date-format';
import { averagePrice, positionMargin } from '../../../core/helper/bybit/usdtPerpetual'

const PositionTab = (props) => {
    const positionRef = useRef()

    const { positionOrders, socketConnection, userId, pairDetails } = props;

    return (
        <Fragment>
            <PositionCloseModal
                ref={positionRef}
                userId={userId}
                socketConnection={socketConnection}
            />
            <table className="table">
                <thead>
                    <th>Date</th>
                    <th>Pair</th>
                    <th>Side</th>
                    <th>Order Value</th>
                    <th>Market Price</th>
                    <th>Entry Price</th>
                    <th>Liq. Price</th>
                    <th>Amount</th>
                    <th>Margin</th>
                    <th>Unrealised P&L</th>
                    <th>Close By</th>
                </thead>
                <tbody>
                    {positionOrders && positionOrders.length == 0 ?
                        <tr colSpan={9}>
                            <td className='color-white' colSpan="7">No Active Orders Found!</td>
                        </tr> : ""
                    }
                    {positionOrders && positionOrders.length > 0 && positionOrders.map((elem, i) => {
                        const {
                            pair = {},
                            pairName = "",
                            createdAt = "",
                            orderType = "",
                            type = "",
                            filled = [],
                            totalAmount = 0,
                            leverage = 1,
                            liquidityPrice = 0,
                        } = elem;
                        const clrClassName = type == 'buy' ? 'color-green' : 'color-red';

                        const {
                            decimalValue = 2,
                            priceDecimal = 2,
                            amountDecimal = 2,
                        } = pair ? pair : {};

                        const price = averagePrice(filled)

                        return <tr key={i}>
                            <td data-label="Date">{dateFormat(createdAt)}</td>
                            <td data-label="Pair">
                                {pairName ? pairName.replace("_", "/") : ""} perpetual
                                <span className='trade-text-3'>{leverage}X</span>
                            </td>
                            <td data-label="Side" className={"capitalizeText " + (clrClassName)}>{type}</td>
                            <td data-label="Order_Value" className={"capitalizeText " + (clrClassName)}>{props.decimalValue(price * totalAmount, decimalValue)}</td>
                            <td data-label="Price">{props.decimalValue(pairDetails.marketPrice, decimalValue)}</td>
                            <td data-label="Price">{props.decimalValue(price, decimalValue)}</td>
                            <td data-label="Liquidity_Price">{props.decimalValue(liquidityPrice, decimalValue)}</td>
                            <td data-label="Amount">{props.decimalValue(totalAmount, amountDecimal)}</td>
                            <td data-label="Margin">{props.decimalValue(positionMargin(price, totalAmount, leverage, pairDetails.takerFee, type), decimalValue)}</td>
                            <td data-label="ProfitLoss" className="capitalizeText">
                                <div>
                                    <UnrealizedPnlVal
                                        positionDoc={elem}
                                        entryPrice={price}
                                        pairDetails={pairDetails}
                                        decimalValue={props.decimalValue}
                                        pair={pair}
                                    />
                                </div>
                                <UnrealizedPnl
                                    positionDoc={elem}
                                    entryPrice={price}
                                    pairDetails={pairDetails}
                                    decimalValue={props.decimalValue}
                                    pair={pair}
                                />
                            </td>
                            <td data-label="Action">
                                <button
                                    className="market-trade-button-small"
                                    onClick={() => positionRef.current.show({
                                        leverage: leverage,
                                        amount: totalAmount,
                                        pair: pairName,
                                        type: type == 'buy' ? 'sell' : 'buy',
                                        orderType: "market",
                                        pairDetails: pairDetails
                                    })}
                                >
                                    Market
                                </button>
                                &nbsp;
                                <button
                                    className="market-trade-button-small"
                                    onClick={() => positionRef.current.show({
                                        leverage: leverage,
                                        amount: totalAmount,
                                        pair: pairName,
                                        type: type == 'buy' ? 'sell' : 'buy',
                                        orderType: "limit",
                                        pairDetails: pairDetails
                                    })}
                                >
                                    Limit
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default PositionTab