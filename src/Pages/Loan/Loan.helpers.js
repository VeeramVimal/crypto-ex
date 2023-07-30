//** convert interest rate to percentage for ex: (3.2/100 = 0.032) */
const interestCalc = async (interestRate) => {
    try {
        let interest = "";
        if(interestRate) interest = interestRate / 100 ;
        return interest;
    } catch (error) {
        return 0;
    }

};
const numperFieldAvoid = async () => {
    
};
const estimateOneHrInterest = async (price, loanType, interestRate) => {
    try {
        let interest = "";
        if(loanType == "wantBorrow"){
             interest = interestCalc(interestRate);
          let wantBorrowValue = (price * interest) / (365 * 24);
        } 

    } catch (error) {
        return 0;
    }
   
};
const estimateInterest = async () => {

};

const calculateValues = async (amtVal, loanType) => {
    let amtValue = amtVal.toString();
    if (loanType == "wantBorrow") {
        // amtValue = await amtVal ? amtVal.toString() : data.collateral ? data.collateral : "";
        if (amtValue == "" ||
            isNaN(amtValue) ||
            amtValue < 0 ||
            amtValue.indexOf("e") > -1) {
            return false;
        }
        return Number(amtValue);
    } else if (loanType == "collateral") {
        // amtValue = await amtVal ? amtVal.toString() : data.wantBorrow ? data.wantBorrow : "";
        if (amtValue == "" ||
            isNaN(amtValue) ||
            amtValue < 0 ||
            amtValue.indexOf("e") > -1) {
            return false;
        }
        return Number(amtValue);
    }
};


export {
    calculateValues,
    numperFieldAvoid,
    estimateOneHrInterest,
    estimateInterest,
    interestCalc
}