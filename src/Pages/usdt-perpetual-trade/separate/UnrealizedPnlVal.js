// import package
import React, { useEffect, useState } from 'react';

// import lib
import { unrealizedPnLVal } from '../../../core/helper/bybit/usdtPerpetual';
import { averagePrice, positionMargin } from '../../../core/helper/bybit/usdtPerpetual'

const UnrealizedPnlVal = (props) => {
    const { positionDoc, entryPrice, pairDetails, pair } = props;

    const {
        type = "",
        totalAmount = 0,
        leverage = 1,
    } = positionDoc;

    // state
    const [pnl, setPnl] = useState(0)
    const [marginVal, setMarginVal] = useState(0)

    // function    
    useEffect(() => {
        setMarginVal(positionMargin(entryPrice, totalAmount, leverage, pairDetails.takerFee, type));
        setPnl(unrealizedPnLVal(
            entryPrice,
            positionDoc.totalAmount,
            pairDetails.marketPrice,
            positionDoc.leverage,
            pairDetails.takerFee,
            positionDoc.type
        ))
    }, [positionDoc, entryPrice, pairDetails]);

    return (
        <small className={(pnl >=0) ? "positiveVal" : "negativeVal"}>
            {props.decimalValue(
                marginVal * (props.decimalValue(pnl, pair.amountDecimal) /100),
                pair.amountDecimal
            )}
        </small>
    )
}

export default UnrealizedPnlVal;