import React from "react";

export default function API() {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-lg-6">
            <h4 className="head-profile">API Management</h4>
          </div>
          <div className="col-lg-2">
            <a href="#" className="btn btn-selected-api para-h mt-3 head-profile">
              Create API
            </a>
          </div>
          <div className="col-lg-2">
            <a href="#" className="btn btn-unselected-api para-h mt-3 ">
              Invite Friends
            </a>
          </div>
          <div className="col-lg-2">
            <a href="#" className="btn btn-unselected-api para-h mt-3 ">
              Invite Friends
            </a>
          </div>
          <div className="col-lg-12 mt-5">
            <ul>
              <li className="mobile-para">
                Each can create up to 30 API keys.
              </li>
              <li className="mobile-para">
                Do not disclose your API Key to anyone to avoid asset losses. It
                is recommended to bind IP for API Key to increase your account
                security.
              </li>
              <li className="mobile-para">
                Be aware that your API Key may be disclosed by authorizing it to
                a third-party platform.
              </li>
              <li className="mobile-para">
                You will not be able to create an API if KYC is not completed.
              </li>
            </ul>
          </div>
          <div className="col-lg-12">
            <div className="card bg-transparent">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">
                      <h4 className="head-profile">craziee</h4>
                    </div>
                    <div className="col-lg-6">
                      <a href="#" className="btn btn-Referral para-h m-2  ">
                        Edit restriction
                      </a>
                      <a href="#" className="btn btn-Referral para-h m-2  ">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
