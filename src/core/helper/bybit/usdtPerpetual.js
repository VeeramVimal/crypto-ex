export const averagePrice = (contracts) => {
    try {
        if (contracts && Array.isArray(contracts)) {
            let totalAmt = 0, totalContract = 0;
            for (let item of contracts) {
                if (item.amount > 0 && item.price > 0) {
                    totalContract = totalContract + (item.amount * item.price);
                    totalAmt = totalAmt + item.amount;
                }
            }

            if (totalAmt > 0 && totalContract > 0) {
                return totalContract / totalAmt;
            }

            return 0;
        }
        return 0;
    } catch (err) {
        return 0;
    }
};

export const positionMargin = (price, amount, leverage, takerFee, type) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        leverage = parseFloat(leverage)
        takerFee = parseFloat(takerFee)

        return (
            initialMargin(price, amount, leverage)
            +
            feeToClose(price, amount, takerFee, leverage, type)
        )
    } catch (err) {
        return 0
    }
}

export const initialMargin = (price, amount, leverage) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        leverage = parseFloat(leverage)
        return (price * amount) / leverage
    } catch (err) {
        return 0
    }
}

export const feeToClose = (price, amount, takerFee, leverage, type) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        takerFee = parseFloat(takerFee)
        return amount * bankruptyPrice(price, amount, leverage, type) * (takerFee / 100)
    } catch (err) {
        return 0
    }
}

export const bankruptyPrice = (price, amount, leverage, type) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        if (type == 'buy') {
            return price * (leverage - 1) / leverage
        } else if (type == 'sell') {
            return price * (leverage + 1) / leverage
        }
        return 0
    } catch (err) {
        return 0
    }
}

export const feeToOpen = (price, amount, takerFee) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        takerFee = parseFloat(takerFee)
        return amount * price * (takerFee / 100)
    } catch (err) {
        return 0
    }
}

export const orderCost = (price, amount, leverage, takerFee, type) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        leverage = parseFloat(leverage)
        takerFee = parseFloat(takerFee)
        return (
            initialMargin(price, amount, leverage)
            +
            feeToOpen(price, amount, takerFee)
            +
            feeToClose(price, amount, takerFee, leverage, type)
        )
    } catch (err) {
        return 0
    }
}

export const feeOpenAndClose = (price, amount, leverage, takerFee, type) => {
    try {
        price = parseFloat(price)
        amount = parseFloat(amount)
        leverage = parseFloat(leverage)
        takerFee = parseFloat(takerFee)
        return (
            feeToOpen(price, amount, takerFee)
            +
            feeToClose(price, amount, takerFee, leverage, type)
        )
    } catch (err) {
        return 0
    }
}

export const pnl = (entryPrice, exitPrice, amount, type) => {
    try {
        entryPrice = parseFloat(entryPrice);
        exitPrice = parseFloat(exitPrice);
        amount = parseFloat(amount);
        if (entryPrice > 0 && exitPrice > 0 && amount > 0) {
            if (type == "buy") {
                return amount * (exitPrice - entryPrice);
            } else if (type == "sell") {
                return amount * (entryPrice - exitPrice);
            }
        }
        return 0;
    } catch (err) {
        return 0;
    }
}

export const unrealizedPnLPerc = (entryPrice, amount, exitPrice, leverage, takerFee, type) => {
    try {
        entryPrice = parseFloat(entryPrice)
        amount = parseFloat(amount)
        exitPrice = parseFloat(exitPrice)
        leverage = parseFloat(leverage)
        takerFee = parseFloat(takerFee)
        return (pnl(entryPrice, exitPrice, amount, type) / positionMargin(entryPrice, amount, leverage, takerFee, type)) * 100
    } catch (err) {
        return 0
    }
}

export const unrealizedPnLVal = (entryPrice, amount, exitPrice, leverage, takerFee, type) => {
    try {
        entryPrice = parseFloat(entryPrice)
        amount = parseFloat(amount)
        exitPrice = parseFloat(exitPrice)
        leverage = parseFloat(leverage)
        takerFee = parseFloat(takerFee)
        return (pnl(entryPrice, exitPrice, amount, type) / positionMargin(entryPrice, amount, leverage, takerFee, type)) * 100
    } catch (err) {
        return 0
    }
}