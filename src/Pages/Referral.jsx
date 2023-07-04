import React, { useState, useEffect } from "react";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import ReferralIn from './ReferralIn';

import { useContextData } from '../core/context/';

export default function Referral() {

  const { siteSettings, myProfile, setUserProfile } = useContextData();

  return (
    <div className="referral-page-top-banner-section">
      <div className="card bg-card ">
        <div className="card-body">
          <Tabs defaultActiveKey="active" id="uncontrolled-tab-example" className="mb-3 mt-1">
            <Tab eventKey="active" title="Referral Details">
              <ReferralIn
                type="user"
                myProfile={myProfile}
              />
            </Tab>
            {
              myProfile && myProfile.userType == "promoted" &&
              <Tab eventKey="referredfriend" title="Promotion Referral Details">
                <ReferralIn
                  type="promoter"
                  myProfile={myProfile}
                />
              </Tab>
            }
          </Tabs>
        </div>
      </div>
    </div>
  );
}
