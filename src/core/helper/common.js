import { toast } from "../lib/toastAlert";
import Config from "../../core/config";

export const isEmpty = (str) => {
  try {
    if (str && str != undefined && str != "") {
      return false;
    }
    return true;
  } catch (e) {
    return true;
  }
};

export const copyText = (data = {}) => {
  if (data.text) {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.value = data.text;
    input.select();
    document.execCommand("Copy");
    input.remove();
    toast({ type: "success", message: data.message });
  }
};

export const pageAllowCheck = (myProfile, pageName = "") => {
  let retData = {
    type: "success",
  };
  if(Config.P2P_STATUS == 'Disable') {
    retData = {
      type: "error",
      message: "P2P trade disabled. Kindly contact admin!",
      navigate: "/trade/all-payments",
    };
    return retData;
  }
  if (pageName === "final" && isEmpty(myProfile.email)) {
    retData = {
      type: "error",
      message: "Please update your email address.",
      navigate: "/my/email-authenticator",
    };
    return retData;
  }

  if ((pageName === "final" || pageName === "P2PList") && isEmpty(myProfile.phoneno)) {
    retData = {
      type: "error",
      message: "Please update your phone number.",
      navigate: "/my/sms-authenticator",
    };
    return retData;
  }

  if (
    pageName === "final" &&
    (isEmpty(myProfile.kycstatus) || myProfile.kycstatus != 1)
  ) {
    retData = {
      type: "error",
      message: "Please complete the kyc verification.",
      navigate: "/my/identification",
    };
    return retData;
  }

  if (
    pageName === "final" &&
    (isEmpty(myProfile.tfaStatus) || myProfile.tfaStatus === 0)
  ) {
    retData = {
      type: "error",
      message: "Please complete the 2FA process.",
      navigate: "/google-authenticator",
    };
    return retData;
  }

  return retData;
};

export const clickNavigate = (data = {}, myProfile = {}) => {
  const {
    type = "", row = {}, url = ""
  } = data;

  let kycUserType = "";

  if(myProfile && myProfile._id && myProfile.country) {
    kycUserType = myProfile.country === "IND" ? myProfile.country : "International";
  }

  if(type === "deposit" || type === "withdraw") {
    if(row.currencySymbol === "INR") {
      if(kycUserType === "International") {
        toast({ type : "error", message: "This facility is currently un-available for your country." });
        return {status: false};
      }
    }
  }
  if(url != "") {
    return {status: true, url };
  }
  return {status: true};
}

export const decimalCount = (num) => {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes('.')) {
     return numStr.split('.')[1].length;
  };
  // String Does Not Contain Decimal
  return 0;
}

export const showNumber = (x = 0) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const decimalValueFunc = (value, decimal = -1, target = "") => {
  if(decimal == -1) {
    return showNumber(parseFloat(value));
  }

  if(target === "removeZero") {
    let returnVal = parseFloat(parseFloat(value).toFixed(decimal));
    if(decimalCount(returnVal) >= 2) {
      return showNumber(returnVal);
    }
    else {
      return showNumber(parseFloat(returnVal).toFixed(2));
    }
  }
  else {
    return showNumber(parseFloat(value).toFixed(decimal));
  }
}

export const decimalCorrection = (data = {}) => {
  let {
    val = 0,
    decimal = 0
  } = data;

  let decimalCountVal = decimalCount(val);

  if(decimalCountVal > decimal) {
    return parseFloat(val).toFixed(decimal);
  }
  else {
    return val;
  }
}

export const toFixedWithoutRound = (data = {}) => {
  let {
    val = 0,
    decimal = 0
  } = data;
  if(val == "") {
    return "";
  }
  else {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimal || -1) + '})?');
    return val.toString().match(re)[0];
  }
}