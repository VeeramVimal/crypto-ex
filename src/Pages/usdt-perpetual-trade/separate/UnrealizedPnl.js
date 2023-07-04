// import package
import React, { useEffect, useState } from 'react';

// import lib
import { unrealizedPnLPerc } from '../../../core/helper/bybit/usdtPerpetual';

const UnrealizedPnl = (props) => {
    const { positionDoc, entryPrice, pairDetails, pair } = props;

    // state
    const [pnl, setPnl] = useState(0)

    // function
    useEffect(() => {
        setPnl(unrealizedPnLPerc(
            entryPrice,
            positionDoc.totalAmount,
            pairDetails.marketPrice,
            positionDoc.leverage,
            pairDetails.takerFee,
            positionDoc.type
        ))
    }, [positionDoc, entryPrice, pairDetails])

    return (
        <small className={(pnl >=0) ? "positiveVal" : "negativeVal"}>
            ({props.decimalValue(pnl, pair.decimalValue)}%)
        </small>
    )
}

export default UnrealizedPnl