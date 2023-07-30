import React, { useEffect, useState } from "react";

import '../assets/style.css';

import NavbarOne from './siteTheme/NavbarOne';
import Footer from './siteTheme/Footer';
import P2PHeader from './separate/P2PHeader';
import $, { data } from "jquery";
import { BrowserRouter as Router,useNavigate } from "react-router-dom";
import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config";
import { useContextData } from '../core/context/index'
import { dateFormat } from '../core/helper/date-format';
import { getCookie } from '../core/helper/cookie';
import { Modal, Button, Form } from "react-bootstrap";

export default function Myadspage(props) {

  useEffect(() => {
    $(".status_change .dropdown-item").click(function () {
        var getStatusText = $(this).text();
        $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
        var generateStatusClass = `${$(this).attr('data-class')}-status`
        $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
    })
  }, []);

  const { myProfile } = useContextData();
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [p2pOrdersList, setp2pOrdersList] = useState([]);
  const [allpairsList, setallpairsList] = useState([]);
  const [tradeType, settradeType] = useState("All Status");
  const [advStatus, setadvStatus] = useState("All Status");
  const [assetType, setassetType] = useState("All assets");
  const [recordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, settotalOrders] = useState(0);
  const [deleteformOpen, setdeleteformOpen] = useState(false);
  const [deleteRecords, setdeleteRecords] = useState({});


  
  useEffect(() => {
    const LoggedIn = getCookie('userToken');
    setisLoggedIn(LoggedIn);
    if (LoggedIn) {
      getp2pMyads();
      getallp2pPairs();
    } else {
      navigate("/login");
    }
  }, []);
  
  async function getp2pMyads() {
    try {
      const data = {tradeType: tradeType ,advStatus : advStatus, assetType: assetType}
      const params = { 
        url: `${Config.V1_API_URL}p2p/getallMyads`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {  
        setp2pOrdersList(response.data);
        settotalOrders(response.total);
      }
    } catch (err) {}
  }
  async function searchMyads(){
    const data = {tradeType: tradeType ,advStatus : advStatus, assetType: assetType}
    const params = { 
      url: `${Config.V1_API_URL}p2p/getallMyads`,
      method: 'POST',
      body: data
    }
    const response = (await makeRequest(params));
    if (response.status) {  
      setp2pOrdersList(response.data);
      settotalOrders(response.total);
    }
  }
  const noOfPages = Math.ceil(totalOrders / recordsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= noOfPages; i++) {
    pageNumbers.push(i);
  }
  const prevPage = () => {
    pageChange(currentPage - 1);
  }
  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  }
  const nextPage = () => {
    pageChange(currentPage + 1);
  };
  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
      setCurrentPage(newCurrentPage);
      getPagination(newCurrentPage)
    }
  }
  async function getPagination(newCurrentPage) {
    try {
      const data = { 
        tradeType: tradeType,
        advStatus : advStatus, 
        assetType: assetType,
        limit: recordsPerPage,
        offset: recordsPerPage * (newCurrentPage - 1)
      }
      const params = { 
        url: `${Config.V1_API_URL}p2p/getallMyads`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {  
        setp2pOrdersList(response.data);
        settotalOrders(response.total);
      }
    } catch (err) {}
  }
  async function getallp2pPairs(){
    try {
      const params = { 
        url: `${Config.V1_API_URL}p2p/getallPairs`,
        method: 'GET',
      }
      const response = (await makeRequest(params));
      if(response.status){
        let pairList = [];
        response.data.length > 0 && response.data.map((item)=>{
          item.pairs.length > 0 && item.pairs.map((data)=>{
            pairList.push(data.pair);
            setallpairsList(pairList)
          })
        })
      }
    } catch (err) {}
  }
  async function deleteOrder(deleteRecord) {
    try {
      const data = {orderId : deleteRecord?._id}
      const params = { 
        url: `${Config.V1_API_URL}p2p/deletemyAds`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      let type = 'error';
      if (response.status) {
        type = 'success'
        getp2pMyads();
      }
      setdeleteformOpen(false);
      toast({ type, message: response.message });
    } catch (err) {}
  }
  async function reset(){
    try {
      const data = {tradeType: "All Status" ,advStatus : "All Status", assetType: "All assets"}
      const params = { 
        url: `${Config.V1_API_URL}p2p/getallMyads`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {  
        setp2pOrdersList(response.data);
        settradeType("All Status");
        setadvStatus("All Status");
        setassetType("All assets");
      }
    } catch(err){}
  }
  function selectOrderType(type){
    settradeType(type);
  }
  function selectOrderStatus(type){
    setadvStatus(type);
  }
  function selectAsset(type){
    setassetType(type);
  }
  async function deleteAds(data){
    // if (data && (data.orderAmount - data.usdtPrice) <= 0){
      setdeleteformOpen(true);
      setdeleteRecords(data)
    // } else {
    //   let type = "error";
    //   toast({ type, message: "Trade quantity must be greather than zero" });
    // }
  }
  async function changeMode(Id){
    try {
      const params = { 
        url: `${Config.V1_API_URL}p2p/changeMode`,
        method: 'POST',
        body: { modeId : Id}
      }
      const response = (await makeRequest(params));
      let error = "error";
      if (response.status) {  
        error = "success";
        getp2pMyads();
      }
      toast({ type: error, message: response.message});
    } catch (err){}
  }

  return (
      <div>
          <NavbarOne
              setTheme={props.setTheme}
              theme={props.theme}
          />
          <div className="p2p-trade-top-section add-payment-method-p2p-user-center">
              {/* ====================================P2P-SECOND-NAV-START================================== */}
              { isLoggedIn &&
                <P2PHeader/>
              }
              <section>
                  <div className="container  order-p2p-trade-dropdowns py-lg-5 pt-5">
                      <div className="row  border-bottom row-cols-lg-7  row-cols-7">
                          <div className="col">
                              <p className="enter-amount-heading">Asset/type</p>
                              <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                  <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                      type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                      {assetType}
                                  </button>
                                  <ul className="dropdown-menu status_change " aria-labelledby="dropdownMenuButton1">
                                      <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectAsset("All assets")}>All assets</a></li>
                                      { allpairsList.length > 0 && allpairsList.map((pair,i) => {
                                          return(
                                              <li><a className="dropdown-item" data-class={pair} href="javascript:void(0)" key={i} onClick={()=>selectAsset(pair)}>{pair}</a></li>
                                          )
                                      }
                                      )}

                                  </ul>
                              </div>
                          </div>
                          <div className="col ">
                              <p className="enter-amount-heading">Type</p>
                              <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                  <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                      type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                      {tradeType}
                                  </button>
                                  <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                      <li><a className="dropdown-item" data-class="stoplimit" href="javascript:void(0)" onClick={()=>selectOrderType("All Status")}>All status</a></li>
                                      <li><a className="dropdown-item" data-class="trailingstop" href="javascript:void(0)" onClick={()=>selectOrderType("Buy")}>Buy</a></li>
                                      <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectOrderType("Sell")}>Sell</a></li>
                                  </ul>
                              </div>
                          </div>
                          <div className="col">
                              <p className="enter-amount-heading">Status</p>
                              <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                  <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                      type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                      {advStatus}
                                  </button>
                                  <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                      <li><a className="dropdown-item" data-class="stoplimit" href="javascript:void(0)" onClick={()=>selectOrderStatus("All Status")}>All Status</a></li>
                                      <li><a className="dropdown-item" data-class="trailingstop" href="javascript:void(0)" onClick={()=>selectOrderStatus("Published")}>Published</a></li>
                                      <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectOrderStatus("Offline")}>Offline</a></li>
                                  </ul>
                              </div>
                          </div>
                          <div className="col mt-3 pt-4">
                              <div className="align-items-center d-flex">
                                  <p className="order-p2p-reset-content-title cursorpointer" onClick={()=>reset()}>Reset</p>
                                  <p className="order-p2p-reset-content-title ms-3 cursorpointer" onClick={()=>searchMyads()}>Filter</p>
                              </div>
                          </div>

                      </div>
                  </div>
              </section>
              <section className="mb-5">
                <div className="container">
                  <div className="row">
                    <div className="row table-head-sticky">
                      <table className="p2p-trade-table">
                        <thead className="p2p-trade-table-thead">
                            <tr className="p2p-trade-table-tr">
                              <th className="p2p-trade-table-th"><label>Created Date</label></th>
                                <th className="p2p-trade-table-th"><label>Pair/Type</label></th>
                                <th className="p2p-trade-table-th"><label>Trade QTY(Completed/Total)</label></th>
                                <th className="p2p-trade-table-th"><label>Price/Limit</label></th>
                                <th className="p2p-trade-table-th"><label>Payment Method</label></th>
                                <th className="p2p-trade-table-th"><label>Status</label></th>
                                <th className="p2p-trade-table-th"><label>Actions</label></th>
                            </tr>
                        </thead>
                        <tbody className="p2p-trade-table-tbody">
                        { p2pOrdersList && p2pOrdersList.length > 0 &&
                            p2pOrdersList.map((row, index) => {
                                return (
                                  <tr className="p2p-trade-table-tr" key={index}>
                                    <td data-label="Created Date" className="p2p-trade-table-td">
                                      <span className="table-data-6"><b>{dateFormat(row?.createdDate) }</b> </span>
                                    </td>
                                    <td data-label="Pair/Type" className="p2p-trade-table-td">
                                        <span className="table-data-1 cursorpointer"> {row?.pairName }</span><br />
                                        <span className={row.orderType=='buy' ? 'color-green':'color-red'}>{row.orderType=='buy'?'BUY':'SELL'}</span>
                                    </td>
                                    <td data-label="Trade QTY(Completed/Total)" className="p2p-trade-table-td">
                                        <span className="table-data-3"> {((row.orderAmount-row.usdtPrice)?.toFixed(2))+'/'+((row.orderAmount)?.toFixed(2))}
                                        </span><span className="table-data-4"> {row?.fromCurrency}</span>
                                    </td>
                                    <td data-label="Price/Limit" className="p2p-trade-table-td">
                                        <span className="table-data-5"><span className="table-data-6"><b>{(row.price)?.toFixed(2)}</b></span>{(row.toCurrency)}</span>/ <br/>
                                        <span className="table-data-5"><span className="table-data-6"><b>Limit:</b> </span>{(row.minAmt)?.toFixed(2)+" " + row.toCurrency +'-' + (row.maxAmt)?.toFixed(2)+ " " + row.toCurrency}</span>
                                    </td>
                                    <td data-label="Payment Method" className="p2p-trade-table-td"><span className="table-data-7">{row?.paymentNames}</span></td>
                                    <td data-label="Status" className="p2p-trade-table-td">
                                    <span className="table-data-6">
                                    <div class="form-check form-switch">
                                    { row?.orderMode == 'Online' ?
                                      <input class="form-check-input" type="checkbox" role="switch" onClick={()=>changeMode(row?._id)} id="flexSwitchCheckDefault" defaultChecked/>
                                        :
                                      <input class="form-check-input" type="checkbox" role="switch" onClick={()=>changeMode(row?._id)} id="flexSwitchCheckDefault" />
                                    }
                                    <label class="form-check-label" for="flexSwitchCheckDefault"> {(row?.orderMode == "Online") ? "Online" : "Offline"}</label>
                                  </div>
                                     
                                    </span>
                                    </td>
                                    <td data-label="Actions" className="p2p-trade-table-td">
                                        <button  className="btn-invoice" onClick={()=>navigate("/edit-myads/"+row?._id)}> edit </button> &nbsp;
                                        <button  className="btn-invoice-sell" type="button" onClick={()=>deleteAds(row)}> delete </button>
                                    </td>
                                    </tr>
                                )
                            })
                            }
                            { p2pOrdersList && p2pOrdersList.length == 0 && 
                                <tr className="p2p-trade-table-tr">
                                  <td></td>
                                  <td></td>
                                  <td> 
                                  <p className="norecordmargin">No more ads.</p>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                            }
                        </tbody>
                      </table>
                      { totalOrders > recordsPerPage && 
                        <div className="row mt-3">
                          <div className="col-lg-12 d-flex justify-content-end">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination bg-transparent">
                                <li className="page-item" isDisabled={true}>
                                  <a className={"page-link bg-transparent text-success"+(currentPage == 1 ? " disabled" : "")} href="javascript:void(0)" onClick={prevPage}> {"<"} </a>
                                </li>
                                { pageNumbers.map((pgNumber,index) => (
                                  <li key={index} className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                                    <a onClick={() => clickPageNo(pgNumber)}  
                                        className={'page-link bg-transparent text-success'} 
                                        href='javascript:void(0);'
                                      >
                                        {pgNumber}
                                      </a>
                                    </li>
                                  ))
                                }
                                <li className="page-item"><a className="page-link bg-transparent text-success " href="javascript:void(0)" onClick={nextPage}>{">"}</a></li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      }
                      <Modal show={deleteformOpen} onHide={() => setdeleteformOpen(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Are you sure you want to delete this ads?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div className="row  ">
                          <div className='row mt-5'>
                              <div className='col'>
                                  <button type="button" className="btn text-white btn-col w-100 mt-4" onClick={()=>deleteOrder(deleteRecords)}>
                                      Confirm
                                  </button>
                                  <button type="button" className="btn text-white btn-col w-100 mt-4" onClick={()=>setdeleteformOpen(false)}>
                                      Cancel
                                  </button>
                              </div>
                          </div>
                        </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              </section>
              {/* =====================================ADD-PAYMENT-METHOD-END================================ */}
          </div >
          <Footer />
      </div >
  );
}
