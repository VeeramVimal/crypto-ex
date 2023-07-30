import React, { useState, useEffect } from "react";
import "../../assets/style.css";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import { AiFillEye } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { BiCaretDown } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContextData } from "../../core/context/index";
import axios from "axios";
import Config from "../../core/config/index";
import moment from "moment";
import { toast } from "../../core/lib/toastAlert";

export default function Simpleearn(props) {
  const navigate = useNavigate();
  const { myProfile } = useContextData();
  const [userstakehistory, setuserstakehistory] = useState([]);
  const [redeemearlyimage, setredeemearlyimage] = useState("");
  const [redeemearlycurrency, setredeemearlycurrency] = useState("");
  const [totalusdvalue, settotalusdvalue] = useState([]);
  const [totalearnprofit, settotalearnprofit] = useState("0");
  const [userenterearn, setuserenterearn] = useState("0");
  const [userdailyprofit, setuserdailyprofit] = useState("0");
  const [redeemamtuser, setredeemamtuser] = useState("0");
  const [redeemamtvalue, setredeemamtvalue] = useState("0");
  const [totaluserfetch, settotaluserfetch] = useState([]);

  const columns = [
    {
      name: "Asset",
      selector: (row) => (
        <div className="">
          <img className="simpleearn-table-coin-img" src={row.currencyImage} />
          <span className="ms-2 simpleearn-text-9">{row.currencysymbol}</span>
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Total Amount",
      selector: (row) => (
        <span>
          {row.enterAmount} {row.currencysymbol}
        </span>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Auto-Subscribe",
      selector: (row) => (
        <div>
          {/* <div class="form-check form-switch ps-5">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
        </div> */}
          --
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Subscription Date",
      selector: (row) => (
        <span>{moment(row.startdate).format("YYYY-MM-DD HH:mm")}</span>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Accrue Days",
      selector: (row) => (
        <div>
          {moment(row.expirationDate).diff(moment(row.startdate), "days")} days
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Est. APR",
      selector: (row) => <div>{row.realtimeApr}%</div>,
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Locked Period(Days)",
      selector: (row) => <div>{row.lockedDays}</div>,
      sortable: true,
      reorder: true,
      width: "300px",
    },
    {
      name: "Yesterday's Real-Time APR Rewards",
      selector: (row) => <div>{row.yesterdayapr}</div>,
      sortable: true,
      reorder: true,
      width: "300px",
    },
    {
      name: "Cumulative Real-Time APR Rewards",
      selector: (row) => <div>{row.earnAmount}</div>,
      sortable: true,
      reorder: true,
      width: "300px",
    },
    {
      name: "Redemption Date",
      selector: (row) => (
        <div>{moment(row.expirationDate).format("YYYY-MM-DD")}</div>
      ),
      sortable: true,
      reorder: true,
      width: "300px",
    },
    {
      name: "BTC Value",
      selector: (row) => (
        <div>
          <p className="mb-0">{row.BTC_Value ? row.BTC_Value : 0}</p>
          <p className="mb-0 fs-10">{row.BTC_Value_to_dollar}</p>
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            type="button"
            class="bg-transparent border-0 simpleearn-redeem"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              redeemfunction(
                row.currencyImage,
                row.currencysymbol,
                row.currencyId,
                row.enterAmount,
                row
              )
            }
          >
            Redeem
          </button>
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "200px",
    },
  ];

  const redeemfunction = async (
    image,
    event,
    currId,
    redeemamt,
    totalfetch
  ) => {
    settotaluserfetch(totalfetch);
    setredeemearlyimage(image);
    setredeemamtuser(redeemamt);
    setredeemearlycurrency(event);
    const userids = myProfile?._id;
    const userdetails = {
      userId: userids,
      currId: currId,
    };
    const getuserbal = await axios.post(
      `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getuserbal`,
      userdetails
    );
  };

  const enterreddemamt = async (e) => {
    e.preventDefault();
    setredeemamtvalue(e.target.value);
  };

  const maxsetredeem = async () => {
    setredeemamtvalue(redeemamtuser);
  };

  const redeemtotalamtclick = async () => {
    const userids = myProfile?._id;
    if (redeemamtuser >= Number(redeemamtvalue)) {
      const userredeem = {
        Id: totaluserfetch.userId,
        currId: totaluserfetch.currencyId,
        userId: userids,
        amount: redeemamtvalue,
      };
      const getuserbal = await axios.post(
        `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/redeemuserstakeamt`,
        userredeem
      );
    } else {
      toast({ type: "success", message: "Something went wrong" });
    }
  };

  const cancelredeemclick = async () => {
    navigate("/account-earn");
    window.location.reload();
  };

  useEffect(() => {
    const getmyhistory = async () => {
      const userids = myProfile?._id;
      const userdetails = {
        userId: userids,
      };
      const getuserbal = await axios.post(
        `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getuserstakehistory`,
        userdetails
      );
      const getuserstake = getuserbal.data.data;
      setuserstakehistory(getuserstake);
      const userearnid = myProfile?._id;
      const usergetearn = {
        userid: userearnid,
      };
      const getuserearnbal = await axios.post(
        `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getWalletCurrency`,
        usergetearn
      );
      const usdsval = getuserearnbal.data;
      if (usdsval.estimatep2pUSD > 0) {
        setuserenterearn(usdsval.estimateUSD.toFixed(2));
        setuserdailyprofit(usdsval.estimateearnrewardsUSD.toFixed(2));
        settotalusdvalue(getuserearnbal.data);
        settotalearnprofit(usdsval.estimatep2pUSD.toFixed(2));
      }
    };
    getmyhistory();
  }, [myProfile]);

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="accountearn-top-banner-section">
        <div className="accountearn-top-value-section">
          <div className="container-fluid col-lg-10 mx-auto">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div class="d-flex flex-lg-row flex-column">
                  <div>
                    <p className="accountearn-text-1 mb-0">Earn</p>
                  </div>
                  <div class="ms-auto">
                    <button
                      type="button"
                      className="border-0 accountearn-all-assest"
                      onClick={() => navigate("/simple-earn-history")}
                    >
                      History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="accountearn-top-value-section-2 border-bottom">
          <div className="container-fluid col-lg-10 mx-auto ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <p className="accountearn-text-2 mb-2">
                  Est. Total Value{" "}
                  <button className="bg-transparent border-0">
                    <AiFillEye />
                  </button>
                </p>
                <span className="accountearn-text-3 mb-0">
                  {Number(userenterearn) +
                    Number(totalearnprofit) +
                    Number(userdailyprofit)}
                  usd{" "}
                </span>
                <a className="accountearn-all-assest ms-3">View All Assest</a>
              </div>
            </div>
          </div>
        </div>

        <div className="accountearn-top-value-section-3">
          <div className="container-fluid col-lg-10 mx-auto">
            <div className="row align-items-center">
              <div className="col-lg-12 accountearn-staking-tabs-section">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-earn-staking-1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-earn-staking-1"
                      type="button"
                      role="tab"
                      aria-controls="pills-earn-staking-1"
                      aria-selected="true"
                    >
                      Simple Earn
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-earn-staking-1"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-1-tab"
                    tabindex="0"
                  >
                    <div className="row py-3">
                      <div className="col-lg-3 col-6">
                        <p className="mb-1 mt-3 fs-12">Estimated Positions</p>
                        <p className="mb-0 accountearn-text-4">
                          {userenterearn} USD
                        </p>
                        {/* <p className="mb-0 fs-14">≈ $0</p> */}
                      </div>
                      <div className="col-lg-3 col-6">
                        <p className="mb-1 mt-3 fs-12">Total Profit</p>
                        <p className="mb-0 accountearn-text-4">
                          {totalearnprofit} USD
                        </p>
                        {/* <p className="mb-0 fs-14">≈ $0</p> */}
                      </div>
                      <div className="col-lg-3 col-6">
                        <p className="mb-1 mt-3 fs-12">Last Day Profit</p>
                        <p className="mb-0 accountearn-text-4">
                          {userdailyprofit} USD
                        </p>
                        {/* <p className="mb-0 fs-14">≈ $0.00</p> */}
                      </div>
                      {/* <div className="col-lg-3 col-6">
                        <p className="mb-1 mt-3 fs-12">Savings Trial Fund Bonus</p>
                        <p className="mb-0 accountearn-text-4">0 BTC</p>
                        <p className="mb-0 fs-14">≈ $0</p>
                      </div> */}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-earn-staking-2"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-2-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-earn-staking-3"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-3-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-earn-staking-4"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-4-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-earn-staking-5"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-5-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-earn-staking-6"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-6-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-earn-staking-7"
                    role="tabpanel"
                    aria-labelledby="pills-earn-staking-7-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                </div>
              </div>

              <div className="col-lg-12 accountearn-staking-table-tabs-section mt-3">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-earn-staking-table-1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-earn-staking-table-2"
                      type="button"
                      role="tab"
                      aria-controls="pills-earn-staking-table-2"
                      aria-selected="false"
                    >
                      Locked
                    </button>
                  </li>
                </ul>

                <div className="my-4">
                  <DataTable
                    columns={columns}
                    data={userstakehistory}
                    defaultSortFieldId={1}
                    sortIcon={<BiCaretDown />}
                    pagination
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Redeem {redeemearlycurrency}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="d-flex flex-row align-items-end">
                <p className="mb-1 simpleearn-text-11">Redemption Amount</p>
                <p className="fs-10 mb-1 ms-auto">
                  Available for Redemption :
                  <span className="text-muted">
                    {" "}
                    {redeemamtuser} {redeemearlycurrency}
                  </span>
                </p>
              </div>

              <div class="simpleearn-subscription-amount input-group mb-0">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Amount"
                  aria-label="Enter Amount"
                  aria-describedby="basic-addon2"
                  onChange={(e) => enterreddemamt(e)}
                  value={redeemamtvalue}
                />
                <span
                  class="input-group-text subscription-amount-group-1"
                  id="basic-addon2"
                >
                  <button
                    className="simpleearn-max-button"
                    onClick={() => maxsetredeem()}
                  >
                    Max
                  </button>
                </span>
                <span
                  class="input-group-text subscription-amount-group-2"
                  id="basic-addon2"
                >
                  <img
                    className="simpleearn-subscribe-img"
                    src={redeemearlyimage}
                  />
                  <span className="ms-1 fs-14">{redeemearlycurrency}</span>
                </span>
              </div>

              <p className="fs-12 my-3">
                A maximum of 20000000 {redeemearlycurrency} can be redeemed
                daily. Once redeemed, you will receive the proceeds on the same
                day.
              </p>
              <p className="fs-10 text-muted">
                * Holdings that are currently accruing rewards will be redeemed
                first.
              </p>

              <div class="form-check mt-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label fs-12" for="flexCheckDefault">
                  I have read and agreed to{" "}
                  <span style={{ color: "#00dbae" }}>
                    Binance Simple Earn Service Agreement
                  </span>
                </label>
              </div>

              <div className="row g-3 mt-2 mb-3">
                <div className="col-lg-6">
                  <div class="d-grid">
                    <button
                      class="accountearn-redeem-1"
                      type="button"
                      onClick={() => cancelredeemclick()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="d-grid">
                    <button
                      class="accountearn-redeem-1"
                      type="button"
                      onClick={() => redeemtotalamtclick()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
