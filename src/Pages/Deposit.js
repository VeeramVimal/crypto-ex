import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { GoChevronLeft } from 'react-icons/go';
import { MdQrCode2 } from 'react-icons/md';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { RiArrowDownSFill, RiFileCopyFill } from 'react-icons/ri';
import { BsLink45Deg, BsFillArrowRightCircleFill,BsInfoCircleFill } from 'react-icons/bs';

import { IoClose } from "react-icons/io5";
import $ from "jquery";

import Config from "../core/config";
import { makeRequest } from "../core/services/v1/request";

import NavbarOne from "./siteTheme/NavbarOne";
import Footer from "./siteTheme/Footer";

import { toast } from "../core/lib/toastAlert";

import Depositimage from "../assets/images/deposit/Group.png";
import noreplay from "../assets/images/deposit/no-re.png";

import ReactTooltip from "react-tooltip";
import { dateFormat } from '../core/helper/date-format';
import { shortAdrress } from '../core/helper/short-address';

import { useContextData } from '../core/context/index';
import { Bars } from "react-loader-spinner";

import "../assets/style.css";

export default function Spot(props) {
  const navigate = useNavigate();

  let query = useParams();
  let currencyId = (query && query.currencyId) ? query.currencyId.toUpperCase() : "";
  const { siteSettings, myProfile } = useContextData();

  const [currencies, setCurrencies] = useState("");
  const [qrCode, setqrCode] = useState("");
  const [depositData, setdepositData] = useState({ address: "", tag: "" });
  const [depositStatus, setdepositStatus] = useState(null);
  const [networkName, setnetworkName] = useState("");
  const [networkList, setnetworkList] = useState([]);
  const [depositcryptoList, setdepositcryptoList] = useState([]);
  const [defaultNetwork, setdefaultNetwork] = useState("");
  const [defaultCurrency, setdefaultCurrency] = useState("");
  const [defaultCurrencyList, setdefaultCurrencyList] = useState({currencySymbol: "", image: ""});
  const [currencyList, setCurrencyList] = useState({});
  const [depositText, setDepositText] = useState("CLAIM DEPOSIT ?");
  const [particularCurrencyList, setparticularCurrencyList] = useState({});
  const [curCurrencySymbol, setCurCurrencySymbol] = useState("");
  const [loaderStatus, setloaderStatus] = useState(false);

  useEffect(() => {
    $(".crypto-workflow-section-close-button").click(function () {
      $(".deposit-second-section").hide();
    });
  }, []);

  useEffect(() => {
    if (myProfile && myProfile.email == ""){
      toast({ type:"error", message: "Please enable email verification" });
      navigate('/my/email-authenticator');
    }
    depositETHTRX();
  }, [currencyId, myProfile]);

  useEffect(() => {
    async function getWalletCurrency() {
    }
    getWalletCurrency();
    getWalletCurrency_func();
    getparticularCurrency_func()
  }, []);

  async function getparticularCurrency_func() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: "POST",
        body: { CurrencyID: ""}
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setparticularCurrencyList(response.data);
      }
    } catch (err) {}
  }

  async function getWalletCurrency_func() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getWalletCurrency`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        let currencyArray = [];
        let currencySymbol = "";
        let image = "";
        let networkName = "";
        let defaultNetwork = "";
        let networkId = "";
        response.data.map((item) => {
          let findSymbol = "";
          let findOne = response.data.find(
            (element) => element.currencySymbol == currencyId
          );
          if (findOne.curnType == "Fiat") {
            findSymbol = response.data[0].currencySymbol;
          } else {
            findSymbol = currencyId;
          }
          if (item.currencySymbol == findSymbol) {
            networkId = item.currencyId;
            currencySymbol = item.currencySymbol;
            image = item.image;
            item.ids.length > 0 && item.ids.map((item) => {
              networkName = item.basecoin;
              defaultNetwork = item._id;
              if (item.depositEnable == 0) {
                setdepositStatus(false);
              }
              if (item.depositEnable == 1) {
                setdepositStatus(true);
              }
            });
            setnetworkList(item.ids);
            setdefaultNetwork(defaultNetwork);
          }
          currencyArray.push({ 
            value: item._id, 
            currencySymbol: item.currencySymbol,
            image: item.image, 
            currencyName: item.currencyName 
          });
        });
        setCurrencyList(currencyArray);
        setdefaultCurrencyList({currencySymbol: currencySymbol, image : image})
        setnetworkName(networkName);
        setCurCurrencySymbol(currencySymbol);
        setloaderStatus(true);
        getparticularHistory(currencySymbol);
        createAddress(defaultNetwork);
        getparticularCurrencyDet(defaultNetwork);
      }
    } catch (err) {}
  }

  async function getparticularCurrencyDet(defaultNetwork) {
    try {
      const value = { CurrencyID: defaultNetwork };
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: "POST",
        data: value,
      };
      const result = await makeRequest(params);
      if (result.status) {
        setloaderStatus(false);
        if (result.data.depositEnable == 0) {
          setdepositStatus(false);
        }
        else {
          setdepositStatus(true);
        }
        setCurrencies(result.data);
        setnetworkName(result.data.basecoin);
      }
    } catch (err) {}
  }
  async function handlenetworkChange(networkId) {
    getselectedNetwork(networkId);
    createAddress(networkId);
  }
  async function getselectedNetwork(networkId) {
    try {
      setloaderStatus(true);
      const value = { CurrencyID: networkId };
      const params = {
        url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
        method: "POST",
        data: value,
      };
      const response = await makeRequest(params);
      if (response.status) {
        setloaderStatus(false);
        if (response.data.depositEnable == 0) {
          setdepositStatus(false);
        }
        else {
          setdepositStatus(true);
        }
        setCurrencies(response.data);
        setnetworkName(response.data.basecoin);
      } else {
        navigate("/my/dashboard");
      }
    } catch (err) {}
  }
  async function createAddress(networkId) {
    try {
      const value = { CurrencyID: networkId };
      const params = {
        url: `${Config.V1_API_URL}wallet/createAddress`,
        method: "POST",
        data: value,
      };
      const result = await makeRequest(params);
      if (result.status && result.data) {
        setdepositData(result.data);
        setloaderStatus(false);
        const qrCode =
          "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" +
          result.data.address +
          "&choe=UTF-8&chld=L";
        setqrCode(qrCode);
      }
    } catch (err) {}
  }
  async function handleCurrencyChange(currencySymbol) {
    window.history.pushState({},'', window.origin+"/deposit/crypto/"+currencySymbol);
    getSelectedCurrency(currencySymbol);
  }
  async function getSelectedCurrency(findcurrencySymbol) {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/getWalletCurrency`,
        method: "GET",
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        let currencyArray = [];
        let currencySymbol = "";
        let image = "";
        let network = "";
        let defaultNetwork = "";
        let networkId = "";
        response.data.map((item) => {
          if (item.currencySymbol === findcurrencySymbol) {
            networkId = item.currencyId;
            currencySymbol = item.currencySymbol;
            image = item.image;
            item.ids.map((item) => {
              network = item.basecoin;
              defaultNetwork = item._id;
              if (item.depositStatus == 0) {
                setdepositStatus(false);
              }
              if (item.depositStatus == 1) {
                setdepositStatus(true);
              }
            });
            setnetworkList(item.ids);
            setdefaultNetwork(defaultNetwork);
          }
          currencyArray.push({
            value: item._id, 
            currencySymbol: item.currencySymbol,
            image: item.image,currencyName: 
            item.currencyName 
          });
        });
        setCurrencyList(currencyArray);
        setdefaultCurrencyList({currencySymbol : currencySymbol, image : image});
        setnetworkName(network);
        setloaderStatus(true);
        createAddress(defaultNetwork);
        getparticularHistory(currencySymbol);
        getparticularCurrencyDet(defaultNetwork);

        setCurCurrencySymbol(currencySymbol);
      }
    } catch (err) {}
  }
  async function getparticularHistory(Currency = "") {
    try {
      if(Currency != "") {
        const value = {
          type: "Deposit",
          currencyType: "Crypto",
          currencySymbol: Currency
        };
        const params = {
          url: `${Config.V1_API_URL}wallet/getHistory`,
          method: "POST",
          data: value,
        };
        const result = await makeRequest(params);
        if (result.status) {
          const array = [];
          result.data.map((item) => {
            if (Currency == item.currencyId.currencySymbol) {
              array.push({
                currencySymbol: item.currencyId.currencySymbol,
                image: item.currencyId.image,
                amount: item.amount,
                fees: item.fees,
                txnId: item.txnId,
                status: item.status,
                createdDate: item.createdDate,
              });
            }
          });
          setdepositcryptoList(array);
        }
      }
    } catch (err) {}
  }
  async function depositETHTRX() {
    try {
      const params = {
        url: `${Config.V1_API_URL}wallet/depositETHTRX`,
        method: "GET",
      };
      const response = await makeRequest(params);
      getparticularHistory(curCurrencySymbol);
    } catch (err) {}
  }
  const missingDeposit = async() => {
    setDepositText('Loading...')
    const params = { 
      url: `${Config.V1_API_URL}wallet/depositETHTRX`,
      method: 'GET'
    }
    const response = (await makeRequest(params));
    if (response.status) {
      let type = 'success';
      toast({ type, message:"Success" });
      setDepositText('CLAIM DEPOSIT ?');
    } else {
      // let type = 'error';
      // toast({ type, message: response.msg });
      setDepositText('CLAIM DEPOSIT ?')
    }
    getparticularHistory(curCurrencySymbol);
  }

  function copyToColumn(data = {}) {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.value = data.text;
    input.select();
    document.execCommand("Copy");
    input.remove();
    toast({ type: "success", message: data.message });
  }

  const handleSearch = (e) =>{
    const searchval = e.target.value;
    if (searchval !== '') {
      let results =[]
      results = currencyList.filter((item) => {
        return(item.currencySymbol.split('_').join('/').toLowerCase().indexOf(searchval.toLowerCase()) >= 0 || item.currencySymbol.toLowerCase().indexOf(searchval.toLowerCase()) >= 0) 
      });
      if (results.length > 0) {
        setCurrencyList(results);
      } else {
        setCurrencyList([]);
      }
    } else {
      getWalletCurrency_func();
    }
  }

  function bonusAmount(trxn) {
    try{
      if(typeof trxn.bonusData == 'object' && trxn.bonusData.bonusGiven > 0) {
        return trxn.bonusData.bonusGiven.toFixed(trxn.currencyId.siteDecimal);
      } else {
        if(trxn.depositType == 'Pre Booking') {
          return '-';
        } else {
          return 'NA';
        }
      }
    } catch(err){}
  }

  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6" onClick={()=>navigate("/my/dashboard")}>
                <GoChevronLeft className="deposit-back-button-icon" />
                <span className="deposit-text-1">Deposit Crypto</span>
              </div>
              <div className="col-6 text-end">
                {Config.depositFiatStatus == "Enable" ?
                <button type="button" className="deposit-fiat-button" onClick={()=>navigate("/deposit/fiat/"+particularCurrencyList?._id)}>
                  Deposit Fiat <HiArrowNarrowRight/>
                </button>:""}
              </div>
            </div>
          </div>
        </div>

        <div className="container deposit-second-section">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex flex-row mb-2">
                <div className="ms-auto me-lg-5">
                  <IoClose className="crypto-workflow-section-close-button" />
                </div>
              </div>
              <div className="d-flex flex-row bd-highlight">
                <div className="d-lg-block d-none">
                  <img
                    className="deposit-crupto-explain-image"
                    src={Depositimage}
                    alt="Depositimage"
                  />
                </div>
                <div className="">
                  <ul className="base-timeline p-0 mb-0">
                    <li className="base-timeline__item">
                      <span className="base-timeline__summary-text">
                        Copy address
                      </span>
                      <br />
                      <span className="deposit-text-2">
                        Choose the crypto and its network on this page, and copy
                        the deposit address.
                      </span>
                    </li>
                    <li className="base-timeline__item">
                      <span className="base-timeline__summary-text">
                        Initiate a withdrawal
                      </span>
                      <br />
                      <span className="deposit-text-2">
                        Choose the crypto and its network on this page, and copy
                        the deposit address.
                      </span>
                    </li>
                    <li className="base-timeline__item">
                      <span className="base-timeline__summary-text">
                        Network confirmation
                      </span>
                      <br />
                      <span className="deposit-text-2">
                        Choose the crypto and its network on this page, and copy
                        the deposit address.
                      </span>
                    </li>
                    <li className="base-timeline__item">
                      <span className="base-timeline__summary-text">
                        Deposit successful
                      </span>
                      <br />
                      <span className="deposit-text-2">
                        Choose the crypto and its network on this page, and copy
                        the deposit address.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container deposit-third-section">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="d-flex flex-lg-row flex-column">
                <div className="deposit-third-left-section">
                  <span className="deposit-text-3">Select coin</span>
                </div>
                <div className="deposit-third-right-section">
                  <span className="deposit-text-33">Coin</span>
                  <div
                    className="d-flex flex-row align-items-center deposit-select-coin-section"
                    data-bs-toggle="modal"
                    data-bs-target="#selectcoinModal" 
                  >
                    <div className="">
                      {defaultCurrencyList && defaultCurrencyList.image ?
                      <img
                        src={defaultCurrencyList && defaultCurrencyList.image} 
                        className="deposit-logo-image"
                        alt="logo"
                      />:""}
                      <span key={'i'} className="deposit-text-4"> { defaultCurrencyList && defaultCurrencyList.currencySymbol} </span>
                    </div>
                    <div className="ms-auto">
                      <RiArrowDownSFill />
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-lg-row flex-column mt-5">
                <div className="deposit-third-left-section">
                  <span className="deposit-text-3">Deposit to</span>
                </div>
                <div className="deposit-third-right-section">
                  <span className="deposit-text-33">Network</span>
                  <div
                    className="d-flex flex-row align-items-center deposit-select-coin-section"
                    data-bs-toggle="modal"
                    data-bs-target="#depositnetworkModal"
                  >
                    <div className="">
                      {/* <img src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png" className='deposit-logo-image' alt="logo" /> */}
                      <span className="deposit-text-4"></span>
                      <span className="deposit-text-5">{networkName == "Coin"
                        ?
                        defaultCurrencyList.currencySymbol
                        :
                          networkName
                      }</span>
                    </div>
                    <div className="ms-auto">
                      <RiArrowDownSFill />
                    </div>
                  </div>
                </div>
              </div>

              { loaderStatus == true ?
                <div className="d-flex flex-row">
                  <div className="crypto-deposit-loading-loader mx-auto">
                    <Bars
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                      visible={true}
                    />
                   </div>
                </div>
                :
                <div className="d-flex flex-row mt-4">
                  <div className="deposit-third-left-section">
                    <span className="deposit-text-3 visually-hidden">
                      Deposit to
                    </span>
                  </div>
                  { defaultCurrency == "INR" ? 
                    <div className="deposit-third-right-section">
                      <span className="deposit-text-33">{(currencies?.depositEnable == 0)? defaultCurrency +"  Deposit Disabled" : ""}</span>
                    </div>
                    :
                    <div className="deposit-third-right-section">
                      <span className="deposit-text-33">{(currencies?.depositEnable == 0)? networkName +"  Deposit Disabled" : ""}</span>
                    </div>
                  }
                  { (currencies?.depositEnable!= 0 && depositStatus == true) && 
                    <div className="deposit-third-right-section">
                      { depositData && depositData.tag != '' ?
                      <>
                      <span className="deposit-text-33">Tag</span>
                      <div className="d-flex flex-row">
                        <div className="">
                          <span className="deposit-text-6">
                            {depositData && depositData.tag ? depositData.tag : <>&nbsp;</>}
                          </span>
                        </div>
                        <div className="ms-auto">
                          <span data-tip data-for="noOverridePosition">
                            <RiFileCopyFill className="deposit-icon-1" onClick={()=>copyToColumn({
                              message: "Destination Tag copied successfully!",
                              text: depositData && depositData.tag != '' ? depositData.tag : '-'
                            })}/>
                          </span>
                          <ReactTooltip
                            id="noOverridePosition"
                            place="top"
                            className="tooltip-text-Theme text-center"
                          >
                            <span className="tooltip-text-1">Click to Copy</span>
                          </ReactTooltip>
                        </div>
                      </div>
                      </>:""}
                    
                      { depositData && depositData.address ?
                        <>
                        <span className="deposit-text-33">Address</span>
                        <div className="d-flex flex-row">
                          <div className="">
                            <span className="deposit-text-6">
                              {depositData && depositData.address ? depositData.address : <>&nbsp;</>}
                            </span>
                          </div>
                          <div className="ms-auto">
                            <span data-tip data-for="noOverridePosition">
                              <RiFileCopyFill className="deposit-icon-1" onClick={()=>copyToColumn({
                                message: "Address copied successfully!",
                                text: depositData && depositData.address != '' ? depositData.address : '-'
                              })}/>
                            </span>
                            <ReactTooltip
                              id="noOverridePosition"
                              place="top"
                              className="tooltip-text-Theme text-center"
                            >
                              <span className="tooltip-text-1">Click to Copy</span>
                            </ReactTooltip>
                          </div>
                          <div className="">
                            <span data-tip data-for="noOverridePosition2">
                              <MdQrCode2 className="deposit-icon-1" />
                            </span>
                            <ReactTooltip
                              id="noOverridePosition2"
                              effect="solid"
                              place="bottom"
                              className="tooltip-text-Theme"
                            >
                              <span className="tooltip-text-1">
                                Scan the code on the withdrawal page of the platform APP or Wallet APP
                              </span>
                              <br />
                              {qrCode && <img className="qr-code-tooltip-image my-2" alt="qr-code" src={qrCode} /> }
                              <ul className="p-0 ps-2">
                                <li className="tooltip-text-1">
                                  Send only {currencies.currencySymbol} {currencies.basecoin != 'Coin' ? '- '+currencies.basecoin : '' } to this deposit address.
                                </li>
                                <li className="tooltip-text-1">
                                  Ensure the network is {networkName == "Coin"
                                  ?
                                    defaultCurrencyList.currencySymbol
                                  :
                                    networkName}
                                  {/* BNB Smart Chain (BEP20) */}
                                </li>
                                {/* <li className="tooltip-text-1">
                                  Do not send NFTs to this address. Learn how to
                                  deposit NFTs{" "}
                                </li> */}
                              </ul>
                            </ReactTooltip>
                          </div>
                        </div>
                        </>
                        : <>&nbsp;</>
                      }

                      <div className="row mt-3"></div>
                    
                      <div className="row mt-3">
                        <div className="col-12">
                          <ul>
                            {
                            currencies && currencies.minCurDeposit > 0 ?
                            <li>
                              <span className="deposit-text-3">
                                Minimum deposit More than <span className="deposit-text-9">{currencies.minCurDeposit} {currencies.currencySymbol}</span>, deposits below that cannot be recovered.
                              </span>
                            </li>:""}

                            {(currencies && currencies.currencySymbol && currencies.basecoin) ?
                            <li>
                              <span className="deposit-text-3">
                                Send only{" "}
                                <span className="deposit-text-9">{currencies.currencySymbol} {currencies.basecoin != 'Coin' ? '- '+currencies.basecoin : '' }</span> to this
                                deposit address.
                              </span>
                            </li> : ""}
                            {currencies && currencies.depositNotes != "NA" && <li>
                              <span className="deposit-text-3">
                                {currencies.depositNotes}
                              </span>
                            </li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>

        <div className="container deposit-fourth-section">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="deposit-text-11">Recent Deposits</h1>

              <p className='mt-12'>
                If your previous deposit is not reflecting, you can claim your deposit below &nbsp;
              </p>
              <small className='color-yellow f-15 m-top-20 cursor color-hover-res' onClick={() => missingDeposit()}>{depositText}</small>

              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Assets</th>
                    <th>Amount</th>
                    <th>Bonus</th>
                    <th>Txn.Id</th>
                    <th>Status&nbsp;</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {depositcryptoList.length > 0 && depositcryptoList.map((row,i) => {
                    if(row) {
                      return(
                        <tr>
                          <td data-label="currencySymbol">
                            <span className='tb-img'>
                              { row.image ? <img src={row?.image} alt={Config.SITENAME} width="20px" height="20px" className="img-fluid img-res" style={{ height:'20%', width: '20%' }}/> : ""}
                            </span> &nbsp; {row?.currencySymbol}
                          </td>
                          <td data-label="Amount">{row?.amount}</td>
                          <td data-label="Bonus">{bonusAmount(row)}</td>
                          <td data-label="TxID" onClick={()=>copyToColumn({
                            text: row?.txnId != '' ? row?.txnId : '-',
                            message: "Txn.Id copied successfully!"
                          })}>{shortAdrress(row?.txnId != "" ? row?.txnId : "-")}</td>
                          <td data-label="Status">
                            {row.status == 0 ? 'Pending' : row.status == 1 ? "Approved" : row.status == 2 ? 'Rejected' :'Processing' }
                          </td>
                          <td data-label="TxID">
                              {dateFormat(row?.createdDate)}
                          </td>
                          {/* <td data-label="Destination">
                            <label className="dest-addres-ellipsis">
                                {row.txnId}
                            </label>
                            <span>
                              <BsLink45Deg className="dest-addres-link" />
                            </span>
                            <MdQrCode2 className="dest-addres-link" />
                            <span></span>
                          </td> */}
                          {/* <td>
                            <label className="dest-addres-ellipsis">
                              {dateFormat(row?.createdDate)}
                            </label>
                            <span>
                              <BsLink45Deg className="dest-addres-link" />
                            </span>
                            <MdQrCode2 className="dest-addres-link" />
                            <span></span>
                          </td>
                          <td data-label="Status">{row?.status == 0 ? 'Pending' : row?.status == 2 ? 'Rejected' :'Processing' }</td> */}
                        </tr>
                      )
                    }
                  })}
                  { depositcryptoList.length == 0 &&
                    <tr className="no-records-found">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <img
                          className="no-record-image"
                          src={noreplay}
                          alt="no-record"
                        />
                        <br />
                        <span className="text-center">No Records Found</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  }
                </tbody>
              </table>
              {/* { depositcryptoList.length > 0 &&
                <div className="d-flex flex-row mt-4 mb-5">
                  <div className="mx-auto">
                    <button type="button" className="table-view-all-deposit-button-1">
                      View More{" "}
                      <BsFillArrowRightCircleFill className="view-more-icon" />
                    </button>
                    <button type="button" className="table-view-all-deposit-button-2">
                      View Less{" "}
                      <BsFillArrowRightCircleFill className="view-more-icon" />
                    </button>
                  </div>
                </div>
              } */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade deposit-crypto-modal"
        id="selectcoinModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header ">
              <h4 className="modal-title" id="exampleModalLabel">
                Select coin to deposit
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-2-overflow-scroll">
              <input
                id="myInput2"
                type="text"
                placeholder="Search here..."
                autoComplete="off"
                name="search"
                onChange={handleSearch}
              />
              <ul id="myUL2" >
              { currencyList.length > 0 && currencyList.map((currency, i)=>{ 
                if (currency.currencySymbol !='INR') {
                  return (
                    <li onClick={()=>handleCurrencyChange(currency.currencySymbol)}>
                      <a
                        data-bs-dismiss="modal"
                        className="deposit-modal-list-sizing"
                      >
                        <div className="row deposit-modal-row-sizing">
                          <div className="col-1">
                            <img
                              src={currency.image}
                              alt="logo"
                              className="me-1 deposit-modal-coin-images"
                            />
                          </div>
                          <div className="col">
                            <div className="row ps-2">
                              <span className="deposit-modal-coin-heading">
                                {currency.currencySymbol}
                              </span>
                              <span className="deposit-modal-coin-muted-text ">
                              {currency.currencyName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                }
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade deposit-crypto-modal"
        id="depositnetworkModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Select network
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-2-overflow-scroll">
              <p className="select-network-text-1">
                Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.
              </p>
              <ul id="myUL2">
              { networkList.length > 0 && networkList.map((item,i)=>{
                if(item._id == defaultNetwork){
                return (
                  // networkName == item.basecoin ? networkName : item._id
                  <li selected={true} onClick={()=>handlenetworkChange(item._id)}>
                  <a
                    data-bs-dismiss="modal"
                    className="deposit-modal-list-sizing"
                  >
                    <div className="row deposit-modal-network-sizing">
                      <span className="deposit-modal-coin-heading">
                        {/* {networkName == item.basecoin ? networkName : item.basecoin} */}
                        {networkName == item.basecoin
                          ?
                            networkName == "Coin"
                              ?
                                defaultCurrencyList.currencySymbol
                              :
                                networkName
                          :
                            item.basecoin}
                      </span>
                      <span className="deposit-modal-coin-muted-text ">
                        {/* BNB Smart Chain (BEP20) */}
                      </span>
                    </div>
                  </a>
                </li>
                )
                }else {
                  return (
                    <li onClick={()=>handlenetworkChange(networkName == item.basecoin ? networkName : item._id )}>
                    <a
                      data-bs-dismiss="modal"
                      className="deposit-modal-list-sizing"
                    >
                      <div className="row deposit-modal-network-sizing">
                        <span className="deposit-modal-coin-heading">{networkName == item.basecoin ? networkName : item.basecoin}</span>
                        <span className="deposit-modal-coin-muted-text ">
                          {/* BNB Smart Chain (BEP20) */}
                        </span>
                      </div>
                    </a>
                  </li>
                  )
                }
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
