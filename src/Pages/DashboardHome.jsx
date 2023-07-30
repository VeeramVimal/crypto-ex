import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import {
  AiFillEdit,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSearch,
} from "react-icons/ai";
import { Modal, Button, Form } from "react-bootstrap";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
import * as yup from "yup";
import { Formik } from "formik";
import $ from "jquery";
import { useContextData } from "../core/context/index";
import { dateFormat, showEmail } from "../core/helper/date-format";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";
import WalletListDashboardComp from "./separate/WalletListDashboardComp";
import PairListComp from "./separate/PairListComp";
import { toast } from "../core/lib/toastAlert";
import { getCookie, setCookie } from "../core/helper/cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

const validationSchema = yup.object({
  username: yup
    .string("Please enter the username")
    .required("Username is required"),
});

export default function Dashboard() {

  const navigate = useNavigate();
  const { myProfile, setUserProfile } = useContextData();

  const initialValues = () => {
    return {
      username: myProfile && myProfile.username,
    };
  };

  const [tabName, setTabName] = useState("All");
  const [walletData, setWalletData] = useState([]);
  const [spotWalletData, setSpotWalletData] = useState([]);
  const [favPairData, setFavPairData] = useState([]);
  const [estimatedValue, setEstimatedValue] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [nicknameformOpen, setnicknameformOpen] = useState(false);
  const [balShow, setBalShow] = useState(
    getCookie("userBalShow") ? getCookie("userBalShow") : false
  );
  const [searchWallet, setSearchWallet] = useState("");

  useEffect(() => {
    getWalletCurrency();
    depositETHTRX();
  }, []);

  async function depositETHTRX() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/depositETHTRX`,
        method: "GET",
      };
      const response = await makeRequest(params);
      getWalletCurrency();
    } catch (err) {}
  }

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
      setWalletData(data);
      setEstimatedValue({
        estimateINR,
        estimateUSD,
      });
    }
  }

  async function getSpotWalletCurrency(holdChk = "spot") {
    const params = {
      url: `${Config.V2_API_URL}wallet/getSpotHoldings?holdChk=` + holdChk,
      method: "GET",
    };
    const response = await makeRequest(params);
    if (response) {
      const { status = false, data = [] } = response;
      setWalletData(data);
    }
  }

  const onSubmit = async (values) => {
    setisLoading(true);
    const params = {
      url: `${Config.V1_API_URL}user/updateMyProfile`,
      method: "POST",
      body: values,
    };
    const response = await makeRequest(params);
    setisLoading(false);
    let type = "error";
    if (response.status) {
      type = "success";
      setnicknameformOpen(false);
      toast({ type, message: "Username Updated Successfully!" });
    } else {
      toast({ type, message: response.message });
    }
    setUserProfile();
    setisLoading(false);
  };

  const balShowHideCall = () => {
    if (balShow) {
      setCookie("userBalShow", false);
      setBalShow(false);
    } else {
      setCookie("userBalShow", true);
      setBalShow(true);
    }
  };

  const toNavigateFirstCurrency = (type = "") => {
    if (
      walletData &&
      walletData.length > 0 &&
      (type === "deposit" || type === "withdraw")
    ) {
      let firstData = walletData.filter((e) => e.curnType == "Crypto");
      if (firstData && firstData.length > 0) {
        navigate("/" + type + "/crypto/" + firstData[0].currencySymbol);
      }
    }
  };
  const handleSearch = (e) => {
    try {
      let searchVal = e.target.value;
      if (searchVal != "") {
        searchVal = searchVal.replace(/[^a-zA-Z0-9\.]/g, "");
        searchVal = searchVal !== "" ? searchVal.toUpperCase() : "";
      }
      setSearchWallet(searchVal);
    } catch (err) {}
  };
  return (
    <div>
      {/* tab one start  */}
      <div className="container-fluid px-0">
        <div className="row ">
          <div className="col-lg-1">
            <center>
              {" "}
              {myProfile &&
              myProfile.username &&
              myProfile &&
              myProfile.username.charAt(0) ? (
                <p className="custom-letterAvatar">
                  {myProfile.username.charAt(0).toUpperCase()}
                </p>
              ) : (
                <img
                  src={
                    myProfile && myProfile.profileimage != ""
                      ? myProfile.profileimage
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="logo"
                  className="img-user"
                />
              )}
            </center>
          </div>
          <div className="col-lg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <p className="password-text-44">
                    {" "}
                    <b>
                      Name :{" "}
                      {myProfile && myProfile.username
                        ? myProfile.username
                        : "--"}
                    </b>{" "}
                    {myProfile && myProfile.level ? (
                      <span className="btn-muted">
                        Level:{" "}
                        {myProfile.level === 1
                          ? "Un-Verified User"
                          : myProfile.level === 2
                          ? "Verified User"
                          : "Verified, Pro User"}
                      </span>
                    ) : (
                      <span className="btn-muted">Level: Un-Verified User</span>
                    )}
                    {/* <AiFillEdit onClick={()=>setnicknameformOpen(true)}
                      // data-bs-toggle="modal"
                      // data-bs-target="#selectcoinModal" 
                    /> */}
                  </p>
                </div>
                {myProfile && (
                  <div className="col-lg">
                    <small className="d-block tittle-text">
                      Two-Factor Authentication
                    </small>
                    <small
                      className={
                        "d-block data-info " +
                        (myProfile.tfaenablekey ? "color-green" : "color-red")
                      }
                    >
                      {myProfile.tfaenablekey ? "Enabled" : "Disabled"}
                    </small>
                  </div>
                )}
                <div className="col-lg">
                  <small className="d-block tittle-text">
                    Identity Verification
                  </small>
                  {myProfile && myProfile.kycstatus != undefined ? (
                    <>
                      {myProfile.kycstatus == 0 ? (
                        <small className="color-yellow d-block data-info">
                          Waiting for KYC approval
                        </small>
                      ) : myProfile.kycstatus == 1 ? (
                        <small className="color-green d-block data-info">
                          Verified
                        </small>
                      ) : myProfile.kycstatus == 2 ? (
                        <small className="color-red d-block data-info">
                          Rejected
                        </small>
                      ) : (
                        myProfile.kycstatus == 3 && (
                          <small className="color-red d-block data-info">
                            Not Verified
                          </small>
                        )
                      )}
                    </>
                  ) : (
                    <small className="color-green d-block data-info"></small>
                  )}
                </div>
                {/* <div className="col-lg ">
                  <small className="d-block tittle-text">Twitter</small>
                  <small className="d-block data-info">not linked</small>
                </div> */}
                {myProfile &&
                  myProfile.lastLoginBy &&
                  myProfile.lastLoginBy.from && (
                    <div className="col-lg ">
                      <small className="d-block tittle-text">
                        Last login by
                      </small>
                      <small className="d-block data-info">
                        {myProfile.lastLoginBy.from} -{" "}
                        {myProfile.lastLoginBy.from.toLowerCase() === "email"
                          ? showEmail(myProfile.lastLoginBy.val)
                          : myProfile.lastLoginBy.val}
                      </small>
                    </div>
                  )}
                <div className="col-lg ">
                  <small className="d-block tittle-text">Last login time</small>
                  <small className="d-block data-info">
                    {dateFormat(myProfile && myProfile?.lastLoginTime)}
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-5">
            <div className="conatiner-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <h4 className="password-text-55">
                    Estimated Balance{" "}
                    {balShow ? (
                      <AiFillEye onClick={() => balShowHideCall()} />
                    ) : (
                      <AiFillEyeInvisible onClick={() => balShowHideCall()} />
                    )}
                  </h4>
                </div>
                <div className="col-lg-6 ">
                  {/* onClick={() => navigate("/wallet")} */}
                  {/* <button className="unset btnfont mb-2 password-text-33 fw-bold">Wallet</button> */}
                  <a
                
                    className="unset-unselected btnfont mb-2 password-text-33 fw-bold"
                    onClick={() => navigate("/my/wallet")}
                  >
                    Wallet
                  </a>
                  <button
                    className="unset-unselected btnfont mb-2 password-text-33 fw-bold"
                    onClick={() => toNavigateFirstCurrency("deposit")}
                  >
                    Deposit
                  </button>
                  <button
                    className="unset-unselected btnfont mb-2 password-text-33 fw-bold"
                    onClick={() => toNavigateFirstCurrency("withdraw")}
                  >
                    Withdraw
                  </button>
                </div>

                <div>
                  {balShow ? (
                    <p>
                      <span>
                        <b className="border-dot password-text-44">
                          {estimatedValue.estimateUSD
                            ? estimatedValue.estimateUSD.toFixed(2)
                            : 0}{" "}
                          $
                        </b>
                      </span>
                      <span className="textCol">
                        {" "}
                        <b>
                          ≈ ₹
                          {estimatedValue.estimateINR
                            ? estimatedValue.estimateINR.toFixed(2)
                            : 0}
                        </b>
                      </span>
                    </p>
                  ) : (
                    <p>***Balance hidden***</p>
                  )}
                </div>
                {/* <div className="col-lg-6">
                  <span className="text-info-css">7 Days </span>
                  <span className="ms-4 text-info-css"> 30 Days</span>
                </div>
                <div className="col-lg-6 ">
                  <button className="unset-btn mb-2 ">
                    {" "}
                    <SlPieChart /> Portfolio
                  </button>
                  <button className="unset-btn mb-2 ">
                    <SlChart /> Wallet Overview
                  </button>
                </div> */}
                <div className="col-lg-12">
                  {/* <div className="text-muted para-small">
                    <small>
                      The daily asset change data will be updated before 08:00 UTC the next day.
                    </small>
                  </div>
                  <div className="col-lg-6 ">
                    <Line data={data} className="line-chart" />
                  </div> */}
                  <div className="col-lg-12 mt-4">
                    {/* <h4>Wallet</h4> */}
                    {/* nav and tab start  */}
                    <div className="d-flex flex-lg-row flex-column g-4">
                      <div className="">
                        <ul
                          className="nav nav-pills nav-tabs-dashboard mb-3 "
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item navTab" role="presentation">
                            <button
                              className="btn  btnfont nav-link px-0 mx-2 px-1 active"
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                              onClick={() => {
                                setTabName("All");
                                getWalletCurrency();
                              }}
                            >
                              All
                            </button>
                          </li>
                          <li className="nav-item navTab" role="presentation">
                            <button
                              className="btn  btnfont nav-link px-0 mx-2 px-1"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="false"
                              onClick={() => {
                                setTabName("spot");
                                getSpotWalletCurrency();
                              }}
                            >
                              Spot holdings
                            </button>
                          </li>
                          <li className="nav-item navTab" role="presentation">
                            <button
                              className="btn  btnfont nav-link px-0 mx-2 px-1"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="false"
                              onClick={() => {
                                setTabName("p2p");
                                getSpotWalletCurrency("p2p");
                              }}
                            >
                              P2P holdings
                            </button>
                          </li>
                          {/* <li className="nav-item navTab" role="presentation">
                        <button
                          className="btn text-dark btnfont nav-link px-0 mx-2 px-1"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          Favorite
                        </button>
                      </li> */}
                        </ul>
                      </div>
                      <div className="ms-auto me-lg-3 me-3 mb-3">
                        <div class="input-group markets-search-group-section">
                          <button type="submit" class="input-group-text">
                            <AiOutlineSearch />
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search Coin Name"
                            autoComplete="off"
                            name="search"
                            value={searchWallet}
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active "
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                        tabindex="0"
                      >
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-12 ">
                              <WalletListDashboardComp
                                order={"desc"}
                                orderBy={
                                  tabName == "p2p"
                                    ? "P2PBalance"
                                    : "MainWalletBalance"
                                }
                                tabName={tabName}
                                balShow={balShow}
                                walletData={walletData}
                                searchWallet={searchWallet}
                                setSearchWallet={setSearchWallet}
                                getWalletCurrency={getWalletCurrency}
                                getSpotWalletCurrency={getSpotWalletCurrency}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                        tabindex="0"
                      >
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-12 ">
                              <WalletListDashboardComp
                                tabName= {tabName}
                                balShow= {balShow}
                                walletData= {spotWalletData}
                                getWalletCurrency = {getWalletCurrency}
                                getSpotWalletCurrency = {getSpotWalletCurrency}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div
                        className="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                        tabindex="0"
                      >
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-12 ">
                              3
                              <PairListComp
                                tabName= {"favSpot"}
                                balShow= {balShow}
                                walletData= {favPairData}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    {/* nav and tab end  */}
                    <Modal
                      show={nicknameformOpen}
                      onHide={() => setnicknameformOpen(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Set Username</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Formik
                          initialValues={initialValues()}
                          validationSchema={validationSchema}
                          onSubmit={(values) => {
                            onSubmit(values);
                          }}
                        >
                          {(formikProps) => {
                            const {
                              values,
                              touched,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                            } = formikProps;
                            return (
                              <Form>
                                <div className="row  ">
                                  <div className="col-lg-12 ">
                                    <div className="mt-4">
                                      <input
                                        className="form-control w-100 mt-1"
                                        type="text"
                                        label="Username"
                                        id="username"
                                        name="username"
                                        autoComplete="off"
                                        value={
                                          values.username != null
                                            ? values.username
                                            : myProfile?.username
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.username &&
                                          Boolean(errors.username)
                                        }
                                        helperText={
                                          touched.username && errors.username
                                        }
                                      />
                                      {errors.username ? (
                                        <small className="invalid-username error">
                                          {errors.username}
                                        </small>
                                      ) : null}
                                      {myProfile && myProfile.username && (
                                        <p className="color-white f-14 mt-4 mb-0">
                                          Last edit time was{" "}
                                          {dateFormat(myProfile?.updatedOn)}.
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="col">
                                      <button
                                        type="button"
                                        className="btn text-white btn-col w-100 mt-4"
                                        onClick={() => handleSubmit(values)}
                                        disabled={isLoading}
                                      >
                                        Ok
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tab one end  */}
    </div>
  );
}
