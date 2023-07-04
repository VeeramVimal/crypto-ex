import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";

import FileCopyIcon from '@mui/icons-material/FileCopy';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

import Config from "../core/config/";
import { toast } from "../core/lib/toastAlert";
import { makeRequest } from "../core/services/v1/request";

import { dateFormat, showEmail, showPhone } from '../core/helper/date-format';

import KycStatusComp from "./separate/kycStatusComp";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';

export default function ReferralIn(props) {

  const navigate = useNavigate();

  const [referralData, setreferralData] = useState({});
  const [referId, setreferId] = useState('');
  const [referCode, setReferCode] = useState('');
  
  const [referPercentage, setReferPercentage] = useState(0);

  useEffect(() => {
    if(props.type) {
      getReferral();
    }
    if(props.myProfile && props.myProfile.referCommission) {
      setReferPercentage(props.myProfile.referCommission);
    }
  }, []);

  async function getReferral() {
    const params = {
      url: `${Config.V1_API_URL}user/getReferralData?userType=${props.type}`,
      method: 'GET'
    };
    const response = await makeRequest(params);
    if (response.status) {
      // if (!response?.data || response?.data?.profile?.kycstatus != 1) {
      //   if (response?.data && response?.data?.profile?.kycstatus != 1) {
      //     let type = 'error';
      //     toast({ type, message: 'Please verify KYC to refer users!' });
      //   }
      //   navigate('/my/identification');
      // }
      if(response.data && response.data.profile?._id) {
        const profileResp = response.data.profile;
        if(props.type === "user") {
          setreferId(Config.FRONEND_URL + '/register?refer=' + profileResp._id);
          setReferCode(profileResp._id);
          setReferPercentage(
            (response.data && response.data.referPercentage) ? response.data.referPercentage : 0
          );
        }
        else if(props.type === "promoter") {
          setreferId(Config.FRONEND_URL + '/register?refer=' + profileResp.referCode);
          setReferCode(profileResp.referCode);
          setReferPercentage(
            (props.myProfile && props.myProfile.referCommission) ? props.myProfile.referCommission : 0
          );
        }
        setreferralData(response.data);
      }
    }
  }

  function copyText(data = {}) {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.value = data.text;
    input.select();
    document.execCommand("Copy");
    input.remove();
    let message = "";
    if(data.type == "referCode") {
      message = "Referral code copied successfully!";
    }
    else if(data.type == "referId") {
      message = "Referral link copied successfully!";
    }
    toast({ type: 'success', message });
  }

  return (
    <>
      <div className="card bg-card-inner p-3">
        <div className="card-body">
          <div className="card bg-Dark-New">
            <div className="card-body d-lg-flex justify-content-between">
              <div className="text-referral">
                <p className="password-text-44">Referral Code</p>
              </div>
              <div className="text-referral">
                <p className="password-text-33 fw-bold">
                  {referCode} {" "}
                  <FileCopyIcon
                    className="color-yellow"
                    onClick={() => copyText({text: referCode, type: "referCode"})}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-Dark-New mt-3">
            <div className="card-body d-lg-flex justify-content-between">
              <div className="text-referral">
                <p className="password-text-44">Referral Link</p>
              </div>
              <div className="text-referral">
                <p className="password-text-33 fw-bold">
                  {referId} {" "}
                  <FileCopyIcon
                    className="color-yellow"
                    onClick={() => copyText({text: referId, type: "referId"})}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <WhatsAppIcon
              onClick={() => window.open('https://wa.me/?text=' + referId)}
              className="mt-3 me-3"
            />
            <FacebookRoundedIcon
              onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + referId)}
              className="mt-3 me-3"
            />
            <TelegramIcon
              onClick={() => window.open('https://telegram.me/share/url?url=' + referId + '&text=')}
              className="mt-3 me-3"
            />
            <TwitterIcon
              onClick={() => window.open( 'https://twitter.com/intent/tweet?url=' +referId +'&text=')}
              className="mt-3"
            />
          </div>
        </div>
      </div>
      {referPercentage ? <p className="mt-4 para-h password-text-55">
        <strong >Refer your Friends and earn {referPercentage}% of the trading fee</strong>
      </p>:""}
      <Tabs defaultActiveKey="active" id="uncontrolled-tab-example" className="mb-3 mt-1">
        <Tab eventKey="active" title="Commission History">
          <div className='mb-4 referYourFriendsTable dashboard-spot-trade-history-section'>
            <table className="table mt-4">
              <thead >
                <tr >
                  <th className="table-head">Date</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">Phone</th>
                  <th className="table-head">Commission</th>
                  <th className="table-head">Remark</th>
                </tr>
              </thead>
              <tbody>
                { referralData && referralData.commissionHistory && referralData.commissionHistory.length > 0 && referralData.commissionHistory.map((commission)=>{
                  const {
                    Currency = {}
                  } = commission;
                  const {
                    siteDecimal = 8
                  } = Currency;
                  const commissionAmount = commission.commissionAmount;
                  return(
                  <tr key={commission.dateTime} >
                  <td >{dateFormat(commission.dateTime)}</td>
                  <td >{showEmail(commission.refUser.email)}</td>
                  <td >{showPhone(commission.refUser.phoneno)}</td>
                  <td >{commissionAmount.toFixed(siteDecimal)} {commission.currencyName}</td>
                  <td >{commission.description}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='text-center'>
              { referralData && referralData.commissionHistory && referralData.commissionHistory.length == 0 && <p className='color-white f-13 m-top-20'>No Records Found!</p>}
            </div>
            <div className='clearfix'></div>
          </div>
        </Tab>
        <Tab eventKey="referredfriend" title="Referred Friends">
          <div className='mb-4 referYourFriendsTable dashboard-spot-trade-history-section'>
          <table className="table mt-4">
            <thead>
              <tr className="">
                <th className="table-head">Email</th>
                <th className="table-head">Phone</th>
                <th className="table-head">KYC</th>
                <th className="table-head">Date</th>
              </tr>
            </thead>
            <tbody>
              { referralData && referralData.referUsers && referralData.referUsers.length > 0 && referralData.referUsers.map((referUsers)=>{
              return(
                <tr key={referUsers.email} >
                  <td >{showEmail(referUsers.email)}</td>
                  <td >{showPhone(referUsers.phoneno)}</td>
                  <td >
                    <KycStatusComp
                      status= {referUsers.kycstatus}
                    />
                  </td>
                  <td >{dateFormat(referUsers.registerOn)}</td>
                </tr>
                )
              }
              )}
            </tbody>
          </table>
          </div>
          <div className='text-center'>
            { referralData && referralData.referUsers && referralData.referUsers.length == 0 && <p className='color-white f-13 m-top-20'>No Records Found!</p>}
          </div>
          <div className='clearfix'></div>
        </Tab>
      </Tabs>
    </>
  )
}