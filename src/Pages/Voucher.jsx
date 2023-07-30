import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";

import { useContextData } from '../core/context/index';
import { dateFormat, dateAddFormat, showEmail } from '../core/helper/date-format';

import { getVoucher_API, claimVoucher_API } from "../core/services/all.api";

import { toast } from "../core/lib/toastAlert";

export default function Voucher() {

  const { myProfile, setUserProfile, siteSettings } = useContextData();

  const navigate = useNavigate();

  const [voucherData, setvoucherData] = useState([]);
  const [isloadingData, setIsloadingData] = useState({});

  const loadingChange = (data = {}) => {
    const dataCopy = Object.assign({}, isloadingData);
    dataCopy[data.key] = data.value;
    setIsloadingData(dataCopy);
  }
  
  const getVoucher_call = async() => {
    loadingChange({key: "getVoucher_API", value: true});
    const resp = await getVoucher_API();
    loadingChange({key: "getVoucher_API", value: false});
    if(resp.status === true) {
      setvoucherData(resp.list);
    }
    else {
      setvoucherData([]);
    }
  }

  const claimVoucher_call = async(data = {}) => {
    if(myProfile) {
      if(myProfile.kycstatus != 1) {
        toast({ type: "error", message: "Please complete your KYC to continue" });
      }
      else if(data && data._id) {
        loadingChange({key: "claimVoucher_API", value: data._id});
        const apiData = {
          payload: data
        }
        const resp = await claimVoucher_API(apiData);
        loadingChange({key: "claimVoucher_API",value: ""});
        if(resp.status === true) {
          getVoucher_call();
        }
      }
    }
  }

  useEffect(() => {
    getVoucher_call();
  }, []);

  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-12 referYourFriendsTable ">
            <h3 className="head-profile">Voucher</h3>
            <div className="dashboard-spot-trade-voucher-section-scroll">
            <table className="table mt-4">
              <thead >
                <tr >
                  <th className="table-head">Date</th>
                  <th className="table-head">Expires on</th>
                  <th className="table-head">Type</th>
                  <th className="table-head">Amount</th>
                  <th className="table-head">Balance</th>
                  <th className="table-head">Claim</th>
                </tr>
              </thead>
              <tbody>
                { (voucherData && voucherData.length > 0) ? voucherData.map((elem, i)=>{
                  const currencySymbol = (elem.currencyId && elem.currencyId.currencySymbol) ? elem.currencyId.currencySymbol : "";
                  const currencySymbolCode = (elem.currencyId && elem.currencyId.currencySymbolCode) ? elem.currencyId.currencySymbolCode : "";

                  const {
                    type = "",
                    givenDate = "",
                    expirePeriod = 0,
                    expirePeriodType = "",
                    amount = 0,
                    balance = 0,
                  } = elem;

                  return(
                  <tr key={i} >
                    <td>{dateFormat(givenDate)}</td>
                    <td>
                      {/* {elem.expirePeriod} {elem.expirePeriodType} */}
                      {dateAddFormat(givenDate, {
                        addCount: expirePeriod,
                        addType: expirePeriodType
                      })}
                    </td>
                    <td className="capitalizeText">{type}</td>
                    <td>{currencySymbolCode} {amount}</td>
                    <td>{currencySymbolCode} {balance}</td>
                    <td>
                      {
                        (elem.claim === 2 || new Date() > new Date(elem.expireDate))
                        ?
                        "Expired"
                        :
                        elem.claim === 0
                        ?
                        <button
                          type="button"
                          className="unset btnfont mb-2"
                          disabled={(isloadingData && isloadingData.claimVoucher_API && isloadingData.claimVoucher_API !== "") ? true : false}
                          onClick={() => { claimVoucher_call({
                            _id: elem._id
                          }) }}
                        >
                          {(isloadingData && isloadingData.claimVoucher_API === elem._id) ? "Loading..." : "Claim"}
                        </button>
                        :
                        elem.claim === 1 ? "Claimed" : "Expired"
                      }
                    </td>
                  </tr>
                  )
                }) : 
                  <tr>
                    <td colSpan={5}>
                      <center>No records found</center>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}