import React, { useEffect, useState } from "react";
import "../../assets/style.css";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import $ from "jquery";
import { BsArrowRight } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import {
  AiFillEye,
  AiOutlineSearch,
  AiFillCaretDown,
  AiFillInfoCircle,
} from "react-icons/ai";
import { BiCaretDown } from "react-icons/bi";
import { BsXCircleFill } from "react-icons/bs";
import DataTable from "react-data-table-component";
import Multiselect from "multiselect-react-dropdown";
import Config from "../../core/config/index";
import { useContextData } from "../../core/context/index";
import axios from "axios";
import moment from "moment";
import { toast } from "../../core/lib/toastAlert";
import { makeRequest } from "../../core/services/v1/request";
import {
  BrowserRouter as Router,
  Link,
  useNavigate
} from "react-router-dom";

export default function Simpleearn(props) {
  const navigate = useNavigate();
  const [columns2, setcolumns2] = useState([]);
  const [currencymodal, setcurrencymodal] = useState([
    {
      currencyimage: "",
    },
  ]);
  const [rewardsapr, setrewardsapr] = useState([]);
  const { myProfile } = useContextData();
  const [userbalance, setuserbalance] = useState(0);
  const [stakeearnamt, setstakeearnamt] = useState("");
  const [daysapr, setdaysapr] = useState("");
  const [numberofdaysapr, setnumberofdaysapr] = useState("");
  const [Subscriptiondate, setSubscriptiondate] = useState("");
  const [inputbox, setinputbox] = useState("FALSE");
  const [Subscriptionenddate, setSubscriptionenddate] = useState("");
  const [Valuedate, setValuedate] = useState("");
  const [estimatedValue, setEstimatedValue] = useState({});
  const [estinterest,setestinterest] = useState('0')
  const [totalearnprofit,settotalearnprofit] = useState('0')

  async function getWalletCurrency() {
    const params = {
      url: `${Config.V2_API_URL}wallet/getWalletCurrency`,
      method: "GET",
    };
    const response = await makeRequest(params);
    if (response) {
      const {
        status = false,
        data = [],
        estimateINR = 0,
        estimateUSD = 0,
      } = response;
      setEstimatedValue({
        estimateINR,
        estimateUSD,
      });
    }
  }

  useEffect(() => {
    getWalletCurrency();
  }, []);

  const columns = [
    {
      id: 1,
      name: "Coin",
      selector: (row) => (
        <div className="">
          <img className="simpleearn-table-coin-img" src={row.currencyimage} />
          <span className="ms-2 simpleearn-text-9">{row.currencysymbol}</span>
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "15%",
    },
    {
      id: 2,
      name: "APR",
      selector: (row) => {
        const rewardspr = row.rewardsapr;
        return (
          <div className="simpleearn-text-10">
            <span className="me-2">{rewardspr && rewardspr?.length > 0 ? rewardspr[0].apr : 0 }%</span>
          </div>
        );
      },
      sortable: true,
      reorder: true,
      width: "15%",
    },
    {
      id: 3,
      name: "Duration(Days)",
      selector: (row) => {
        const rewardspr = row.rewardsapr;
        return (
          <ul
            class="simpleearn-table-tabs-duration nav nav-pills gap-2"
            id="pills-tab"
            role="tablist"
          >
            {rewardspr.map((ids, index) => (
              <li class="nav-item" role="presentation">
                <button
                  className={index === 0 ? "nav-link active" : "nav-link"}
                  id="pills-duration2-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-duration2"
                  type="button"
                  role="tab"
                  aria-controls="pills-duration3"
                  aria-selected="false"
                  onClick={() => aprselect(rewardspr)}
                >
                  {ids.days}
                </button>
              </li>
            ))}
          </ul>
        );
      },
      sortable: false,
      reorder: true,
      width: "40%",
    },
    {
      id: 4,
      name: "Auto-Subscribe",
      selector: (row) => (
        <div>
          <div class="form-check form-switch ps-5">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      ),
      sortable: true,
      reorder: true,
      width: "15%",
    },
    {
      id: 5,
      name: "",
      selector: (row) => (
        <div>
          <button
            type="button"
            class="btn-simpleearn-filter-table"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => subscribeearn(row)}
          >
            Subscribe
          </button>
        </div>
      ),
      sortable: false,
      reorder: false,
      width: "15%",
    },
  ];

  const aprselect = async (days) => {
    // console.log("fdsfs", days);
  };

  const subscribeearn = async (subsc) => {
    setrewardsapr(subsc.rewardsapr);
    setcurrencymodal(subsc);
    setdaysapr(subsc.rewardsapr[0].apr);
    setnumberofdaysapr(subsc.rewardsapr[0].days);
    const userids = myProfile?._id;
    const userdetails = {
      userId: userids,
      currId: subsc.currencyId,
    };
    const getuserbal = await axios.post(
      `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getuserbal`,
      userdetails
    );
    const usramount  = (getuserbal.data.data.simpleEarnAmount).toFixed(8);
    setuserbalance(usramount);
  };

  const getsimpleearncurr = async () => {
    const timeStringend = moment().format("YYYY-MM-DD HH:mm");
    const timevaluestart = moment().add("1", "day").format("YYYY-MM-DD HH:mm");
    const staketimeend = moment().add("15", "day").format("YYYY-MM-DD HH:mm");
    setSubscriptiondate(timeStringend);
    setValuedate(timevaluestart);
    setSubscriptionenddate(staketimeend);
    const axiosget = await axios.get(
      `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getfrontcurrency`
    );
    setcolumns2(axiosget.data.data);
  };

  const userbalancemax = async () => {
    setstakeearnamt(userbalance);
  };

  const aprselectchangemodal = async (event, days) => {
    // console.log("stakeearnamt",event, days);
    setdaysapr(event);
    setnumberofdaysapr(days);

    const staketimeend = moment().add(days, "day").format("YYYY-MM-DD HH:mm");
    setSubscriptionenddate(staketimeend);

    const stakettlrewards = ((((stakeearnamt * event) / 100) / 365) * days);
    setestinterest((stakettlrewards).toFixed(8))
  };

  const setinputamount = async (e) => {
    e.preventDefault();
    setstakeearnamt(e.target.value);
    // console.log("numberofdaysapr",numberofdaysapr);
    const stakettlrewards = ((((e.target.value * daysapr) / 100) / 365) * numberofdaysapr);
    // console.log("setIn",daysapr,numberofdaysapr,e.target.value);
    setestinterest((stakettlrewards).toFixed(8))
  }; 

  const clickinputbox = async () => {
    if (inputbox == "FALSE") {
      setinputbox("TRUE");
    } else {
      setinputbox("FALSE");
    }
  };

  const confirmstake = async () => {
    if (stakeearnamt == "") {
      let type = "error";
      toast({ type, message: "Enter amount" });
    } else if (inputbox == "FALSE") {
      let type = "error";
      toast({ type, message: "Agree to terms" });
    } else {
      const userids = myProfile?._id;
      const stakedyasrewards = (stakeearnamt * daysapr) / 100 / 365;
      const Subscriptiondate = new Date(Subscriptionenddate);
      const userdetails = {
        realapr: daysapr,
        userId: userids,
        currId: currencymodal.currencyId,
        currimage: currencymodal.currencyimage,
        amount: stakeearnamt,
        currencysymbol: currencymodal.currencysymbol,
        days: Subscriptiondate.toISOString(),
        enddate: numberofdaysapr,
        totalaprrewards: stakedyasrewards,
      };
      const getearnsucess = await axios.post(
        `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/userenterearn`,
        userdetails
      );
      if(getearnsucess.data.status === "True"){
        let type = "Success";
        //  $("#exampleModal").modal("hide");
        toast({ type, message: getearnsucess.data.message });
        window.location.href="/account-earn"
      }else{
        let type = "Error";
        toast({ type, message: getearnsucess.data.message });
      }
    }
  };

  const BuyNowClick = (event) => {
    var url = `${Config.FRONEND_URL}/spot/` + event + "_USDT";
    window.open(url, "_blank");
  };

  const searchbar = async (e) => {
    if (e.target.value == "") {
      const axiosget = await axios.get(
        `${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getfrontcurrency`
      );
      setcolumns2(axiosget.data.data);
    } else {
      const vals = e.target.value.toUpperCase();
      const filteredCurrency = columns2.filter((currency) =>
        currency.currencysymbol.includes(vals)
      );
      setcolumns2(filteredCurrency);
    }
  };

  const gettotalearnprofit = async() => {
    const userearnid = myProfile?._id;
      const usergetearn = {
        userid : userearnid
      }
      const getuserearnbal = await axios.post(`${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getWalletCurrency`,usergetearn);
      const usdsval = getuserearnbal.data;
      if(usdsval.estimatep2pUSD > 0) {
        settotalearnprofit((usdsval.estimatep2pUSD).toFixed(2))
      }
  }

  useEffect(() => {
    getsimpleearncurr();
    gettotalearnprofit();
  }, [myProfile]);

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="simpleearn-top-banner-section">
        <div className="simpleearn-top-value-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div class="d-flex flex-lg-row flex-column align-items-center">
                  <div>
                    <p className="simpleearn-text-1">Simple Earn</p>
                    <p className="simpleearn-text-2">
                      The simple way to Deposit & Earn
                    </p>
                  </div>
                  <div class="ms-auto">
                    <button class="btn-simpleearn-filter-table border-0" onClick={() => navigate("/account-earn")}>History</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div class="card">
                  <div className="d-flex flex-row">
                    <div className="ms-auto">
                      <AiFillEye className="simpleearn-text-3" />
                    </div>
                  </div>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <p className="simpleearn-text-4 mb-1">Total Balance</p>
                      {/* <p className="simpleearn-text-5 mb-0">0.01509438 BTC</p> */}
                      <p className="simpleearn-text-6 mb-0">
                        ≈ ${" "}
                        {estimatedValue.estimateUSD
                          ? estimatedValue.estimateUSD.toFixed(2)
                          : 0}{" "}
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p className="simpleearn-text-4 mb-1">
                        Cumulative Profit
                      </p>
                      {/* <p className="simpleearn-text-5 mb-0">+0.00033863 BTC</p> */}
                      <p className="simpleearn-text-6 mb-0">≈ $ {totalearnprofit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5 simpleearn-top-filter-section">
          <div className="row g-2">
            <div className="col-lg-4 col-12">
              <div class="input-group">
                <span
                  class="input-group-text input-group-text-1"
                  id="basic-addon1"
                >
                  <AiOutlineSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => searchbar(e)}
                />
                <span
                  class="input-group-text input-group-text-2"
                  id="basic-addon1"
                >
                  <BsXCircleFill style={{ cursor: "pointer" }} />
                </span>
              </div>
            </div>
            {/* <div className="col-lg-4 col-12">
              <Multiselect
                className="Multiselect-simple-earn"
                displayValue="key"
                onKeyPressFn={function noRefCheck() { }}
                onRemove={function noRefCheck() { }}
                onSearch={function noRefCheck() { }}
                onSelect={function noRefCheck() { }}
                options={[
                  {
                    cat: 'Group 1',
                    key: 'Option 1'
                  },
                  {
                    cat: 'Group 1',
                    key: 'Option 2'
                  },
                  {
                    cat: 'Group 1',
                    key: 'Option 3'
                  },
                  {
                    cat: 'Group 2',
                    key: 'Option 4'
                  },
                  {
                    cat: 'Group 2',
                    key: 'Option 5'
                  },
                  {
                    cat: 'Group 2',
                    key: 'Option 6'
                  },
                  {
                    cat: 'Group 2',
                    key: 'Option 7'
                  }
                ]}
                showCheckbox
              />
            </div> */}
          </div>
        </div>
        <div className="container pb-5">
          <div className="d-flex flex-lg-row flex-column align-items-lg-end gap-2 mb-4">
            <span className="simpleearn-text-7">Protected Products</span>
            <span className="simpleearn-text-8">
              Get stable earnings by depositing assets
            </span>
          </div>
          <div className="simpleearn-staking-subscribe-table">
            <DataTable
              columns={columns}
              data={columns2}
              defaultSortFieldId={1}
              sortIcon={<BiCaretDown />}
              pagination
            />
          </div>
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Subscribe{" "}
                  <img
                    className="simpleearn-subscribe-img"
                    src={currencymodal.currencyimage}
                  />
                  <span className="ms-2 fs-14">
                    {currencymodal.currencysymbol}
                  </span>
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-lg-6">
                    <p className="mb-1 simpleearn-text-11">Duration (Days)</p>
                    <ul
                      class="simpleearn-table-tabs-duration nav nav-pills gap-2 fs-12"
                      id="pills-tab"
                      role="tablist"
                    >
                      {rewardsapr.map((aprs, index) => (
                        <li key={aprs._id} class="nav-item" role="presentation">
                          <button
                            className={
                              index === 0 ? "nav-link active" : "nav-link"
                            }
                            id="pills-duration2-2-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-duration2-2"
                            type="button"
                            role="tab"
                            aria-controls="pills-duration2-3"
                            aria-selected="false"
                            onClick={() =>
                              aprselectchangemodal(aprs.apr, aprs.days)
                            }
                          >
                            {aprs.days}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-1 simpleearn-text-11 mt-3">
                      Subscription Amount
                    </p>
                    <div class="simpleearn-subscription-amount input-group mb-0">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Amount"
                        aria-label="Enter Amount"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setinputamount(e)}
                        value={stakeearnamt}
                      />
                      <span
                        class="input-group-text subscription-amount-group-1"
                        id="basic-addon2"
                      >
                        <button
                          className="simpleearn-max-button"
                          onClick={() => userbalancemax()}
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
                          src={currencymodal.currencyimage}
                        />
                        <span className="ms-1 fs-14">
                          {currencymodal.currencysymbol}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex flex-row">
                      <div>
                        <p className="fs-10 mb-0">
                          {userbalance} {currencymodal.currencysymbol}{" "}
                          <span className="text-muted">Available</span>
                        </p>
                      </div>
                      <div className="ms-auto">
                        <p className="fs-10 mb-0">
                          <a
                            className="simpleearn-text-12"
                            onClick={() =>
                              BuyNowClick(currencymodal.currencysymbol)
                            }
                          >
                            Buy Now
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-1 simpleearn-enough-crypto text-dark">
                      <div>
                        <AiFillInfoCircle className="simpleearn-text-13" />
                      </div>
                      <div>
                        <span className="fs-12">Don’t have enough crypto?</span>
                      </div>
                      <div className="ms-auto fs-12">
                        <a
                          className="simpleearn-text-14"
                          onClick={() =>
                            BuyNowClick(currencymodal.currencysymbol)
                          }
                        >
                          {" "}
                          convert <BsArrowRight />
                        </a>
                      </div>
                    </div>
                    <p className="mb-0 mt-3 fs-12">Amount Limits</p>
                    <p className="mb-0 simpleearn-text-15">
                      Minimum:{" "}
                      <span className="text-muted">
                        {currencymodal.minAmount} {currencymodal.currencysymbol}
                      </span>
                    </p>
                    <p className="mb-0 simpleearn-text-15">
                      Available Quota:{" "}
                      <span className="text-muted">
                        {currencymodal.maxAmount} {currencymodal.currencysymbol}
                      </span>
                    </p>
                    <div className="d-flex flex-row align-items-center gap-1 simpleearn-auto-Subscribe mt-3">
                      <div>
                        <div class="form-check form-switch ps-5">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="mb-0">Auto-Subscribe</p>
                        <p className="fs-12">
                          Enable Auto-Subscribe to resubscribe to the same
                          Locked Product upon expiry. If disabled, your assets
                          will be automatically transferred to the corresponding
                          Flexible Product upon expiry.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="container-timeline">
                      <div class="timeline-block timeline-block-right">
                        <div class="marker active">
                          <i class="fa fa-check active" aria-hidden="true"></i>
                        </div>
                        <div class="timeline-content d-flex align-items-center">
                          <h3 className="simpleearn-text-17">
                            Subscription Date
                          </h3>
                          <span className="ms-auto simpleearn-text-16">
                            {Subscriptiondate}
                          </span>
                        </div>
                      </div>

                      <div class="timeline-block timeline-block-left">
                        <div class="marker active">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <div class="timeline-content d-flex align-items-center">
                          <h3 className="simpleearn-text-17">Value Date</h3>
                          <span className="ms-auto simpleearn-text-16">
                            {Valuedate}
                          </span>
                        </div>
                      </div>

                      <div class="timeline-block timeline-block-right">
                        <div class="marker active">
                          <i class="fa fa-check active" aria-hidden="true"></i>
                        </div>
                        <div class="timeline-content d-flex align-items-center">
                          <h3 className="simpleearn-text-17">
                            Interest End Date
                          </h3>
                          <span className="ms-auto simpleearn-text-16">
                            {Subscriptionenddate}
                          </span>
                        </div>
                      </div>

                      <div class="timeline-block timeline-block-left">
                        <div class="marker active">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <div class="timeline-content d-flex align-items-center">
                          <h3 className="simpleearn-text-17">
                            Next Subscription Date
                          </h3>
                          <span className="ms-auto simpleearn-text-16">
                            {Subscriptionenddate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-3">
                      <div>
                        <p className="mb-0 simpleearn-text-15">Est. APR </p>
                      </div>
                      <div className="ms-auto">
                        <span className="simpleearn-text-15 text-muted">
                          {daysapr}%
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row">
                      <div>
                        <p className="mb-0 simpleearn-text-15">Est. Interest</p>
                      </div>
                      <div className="ms-auto">
                        <span className="simpleearn-text-15 text-muted">
                          {estinterest}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 simpleearn-auto-Subscribe mt-1 py-1">
                      <div>
                        <AiFillInfoCircle />
                      </div>
                      <div>
                        <p className="simpleearn-text-16 mb-0">
                          The APR is subject to change on a daily basis. Please
                          refer to the details on the page.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 simpleearn-auto-Subscribe py-1">
                      <div>
                        <AiFillInfoCircle />
                      </div>
                      <div>
                        <p className="simpleearn-text-16 mb-0">
                          APR does not mean the actual or predicted returns in
                          fiat currency.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 simpleearn-auto-Subscribe py-1">
                      <div>
                        <HiSpeakerphone />
                      </div>
                      <div>
                        <p className="simpleearn-text-16 mb-0">
                          Upon expiry, your digital assets will be automatically
                          subscribed to Flexible Products. If you choose to
                          redeem early, your digital assets will be returned to
                          the spot wallet.
                        </p>
                      </div>
                    </div>

                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={() => clickinputbox()}
                      />
                      <label
                        class="form-check-label fs-12"
                        for="flexCheckDefault"
                      >
                        I have read and agreed to{" "}
                        <span style={{ color: "#00dbae" }}>
                          Fibit Simple Earn Service Agreement
                        </span>
                      </label>
                    </div>

                    <div class="d-grid mt-3">
                      <button
                        class="simpleearn-subscribe-button"
                        type="button"
                        onClick={() => confirmstake()}
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
      </div>
      <Footer />
    </div>
  );
}
