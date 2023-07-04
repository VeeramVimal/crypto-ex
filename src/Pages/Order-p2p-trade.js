import React, { useEffect, useState } from "react";

import '../assets/style.css';
import NavbarOne from './siteTheme/NavbarOne';
import Footer from './siteTheme/Footer';
import P2PHeader from './separate/P2PHeader';
import $ from "jquery";
import { GoFile } from 'react-icons/go';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GoDash } from 'react-icons/go';
import { RiDownload2Fill } from 'react-icons/ri';
import { GrDocumentTime } from 'react-icons/gr';
import { RiFileCopyFill } from 'react-icons/ri';
import Countdown from 'react-countdown';
import DatePicker,{ DateObject } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router,useNavigate } from "react-router-dom";
import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { useContextData } from '../core/context/index'
import { dateFormat,showEmail } from '../core/helper/date-format';
import { getCookie } from '../core/helper/cookie';
import noResponsibile from '../assets/images/deposit/no-re.png';
import Pagination from 'react-responsive-pagination';
import '../pagination.css';

const format = "DD/MM/YYYY";

export default function Orderp2p(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
    const [selectOrderType, setselectOrderType] = useState('processing');
    const [p2pOrdersList, setp2pOrdersList] = useState({});
    const [endtime, setEndtime] = useState(new Date());
    const [tradeType, settradeType] = useState("All Status");
    const [tradeStatus, settradeStatus] = useState("All Status");
    const [dates, setDates] = useState("");
    const [particularCurrency, setparticularCurrency] = useState([]);
    const [userId, setUserId] = useState("");
    const [recordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, settotalOrders] = useState(0);
  

    useEffect(() => {
        const LoggedIn = getCookie('userToken');
        setisLoggedIn(LoggedIn);
        if (LoggedIn) {
          getp2pOrders();
          getParticularCurrency();
          setTimeout(() => {
            getp2pOrders()
          },  500);
        } else {
          navigate("/login");
        }
      }, [myProfile]);
    
      async function getParticularCurrency() {
        try {
          var value = { 'CurrencyID' : ''}
          const params = { 
              url: `${Config.V1_API_URL}wallet/getParticularCurrency`,
              method: 'POST',
              body: value
          }
          const response = (await makeRequest(params));
          if(response.status) {
            setparticularCurrency(response.data)
          }
        } catch (err) {}
      }
      async function getp2pOrders() {
        try {
          const data  = { type : 'processing' }
          const params = { 
            url: `${Config.V1_API_URL}p2p/getp2puserAllOrders`,
            method: 'POST',
            body: data
          }
          const response = (await makeRequest(params));
          if (response.status) {  
            setp2pOrdersList(response.data);
            settotalOrders(response.total)
            getTimerUpdation(response.data);
            setUserId(response.userId);
          }
        } catch (err) {}
      }
      async function getTimerUpdation(txnDetails) {
        try {
          let currentDate = new Date().getTime();
          // if (currentDate < 0 && endtime != currentDate) clearInterval(interval);
          txnDetails.length > 0 && txnDetails.map((item) => {
            currentDate = new Date(item.orderEndDate).getTime();
          });
          if (currentDate !== endtime) {
            setEndtime(currentDate);
          }
        } catch (err) {}
      }
      async function selectOrder(type) {
        setselectOrderType(type);
        try {
          const data  = { type : type}
          const params = { 
            url: `${Config.V1_API_URL}p2p/getp2puserAllOrders`,
            method: 'POST',
            body: data
          }
          const response = (await makeRequest(params));
          if (response.status) {  
            if (response.data.length > 0) {
              settotalOrders(response.total);
              setp2pOrdersList(response.data);
              const last_element = response.data.length > 0 && response.data.findLast((item) => true);
              const firstItem = response.data.length > 0 && response.data.filter(x => typeof x!==undefined).shift();
              let fromDate = new Date(firstItem?.createdDate);
              let toDate = new Date(last_element?.createdDate)
              setStartDate(toDate);
              setEndDate(fromDate);
              setDates([
                new DateObject().set({ day: toDate, format }),
                new DateObject().set({ day:fromDate, format })
              ]);
            } else {
              setp2pOrdersList([]);
              let fromDate = new Date();
              let toDate = new Date()
              setStartDate(toDate);
              setEndDate(fromDate);
              setDates([
                new DateObject().set({ day: toDate, format }),
                new DateObject().set({ day:fromDate, format })
              ]);
            }
          }
        } catch (err) {}
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
        setselectOrderType(selectOrderType);
        try {
          const data  = { 
            type : selectOrderType,
            limit: recordsPerPage,
            offset: recordsPerPage * (newCurrentPage - 1)
          }
          const params = { 
            url: `${Config.V1_API_URL}p2p/getp2puserAllOrders`,
            method: 'POST',
            body: data
          }
          const response = (await makeRequest(params));
          if (response.status) {  
            if (response.data.length > 0) {
              setp2pOrdersList(response.data);
              settotalOrders(response.total)
              const last_element = response.data.length > 0 && response.data.findLast((item) => true);
              const firstItem = response.data.length > 0 && response.data.filter(x => typeof x!==undefined).shift();
              let fromDate = new Date(firstItem?.createdDate);
              let toDate = new Date(last_element?.createdDate)
              setStartDate(toDate);
              setEndDate(fromDate);
              setDates([
                new DateObject().set({ day: toDate, format }),
                new DateObject().set({ day:fromDate, format })
              ]);
            } else {
              setp2pOrdersList([]);
              let fromDate = new Date();
              let toDate = new Date()
              setStartDate(toDate);
              setEndDate(fromDate);
              setDates([
                new DateObject().set({ day: toDate, format }),
                new DateObject().set({ day:fromDate, format })
              ]);
            }
          }
        } catch (err) {}
      }
      const renderer = ({ hours, minutes, seconds, completed }) => {
        let hoursData = hours > 0 ? ((hours > 9 ? hours : "0" + hours) + ":") : '';
        let date = hoursData + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
        // if (completed != false && hours == 0 && minutes == 0 && seconds == 0) {
        //   setendtimeStatus(true);
        // } else {
        //   setendtimeStatus(false);
        // }
        if (completed) {
          return <span></span>
        } else {
          return <span className="endtime">{date}</span>;
        }
      };
      async function copyToCode(textToCopy) {
        try {
          var input = document.createElement('textarea');
          document.body.appendChild(input);
          input.value = textToCopy;
          input.select();
          document.execCommand("Copy");
          input.remove();
          toast({ type:"success", message: "Order copied successfully!" });
        } catch (err) {}
      }
      function selectOrderStatus(type){
        settradeType(type)
      }
      function selectTradeStatus(status){
        settradeStatus(status)
      }
      async function searchOrder(){
        try {
          let dates = [ new Date(startDate).getTime(), new Date(endDate).getTime()]
          const data = {type: selectOrderType, tradeType: tradeType ,tradeStatus : tradeStatus ,filterDates: dates}
          const params = { 
            url: `${Config.V1_API_URL}p2p/getp2puserAllOrders`,
            method: 'POST',
            body: data
          }
          const response = (await makeRequest(params));
          if (response.status) {  
            setp2pOrdersList(response.data);
          }
        } catch (err) {}
      }
      async function reset(){
        try {
          const data = {type: "", tradeType: "All Status" ,tradeStatus : "All Status", filterDates : dates}
          const params = { 
            url: `${Config.V1_API_URL}p2p/getp2puserAllOrders`,
            method: 'POST',
            body: data
          }
          const response = (await makeRequest(params));
          if (response.status) {  
            setp2pOrdersList(response.data);
            settradeType("All Status");
            settradeStatus("All Status");
          }
        } catch(err){}
      }
    return (
        <div>
            <NavbarOne
              setTheme={props.setTheme}
              theme={props.theme}
            />

            <div className="p2p-trade-top-section">
                <section className="p2p-trade-hero-section-two-nav-bg">
                    {/* ====================================P2P-SECOND-NAV-START================================== */}
                    { isLoggedIn &&
                      <P2PHeader/>
                    }
                    {/* =====================================P2P-SECOND-NAV-END=================================== */}
                </section>
                <div className="container-fluid col-11 pb-5">
                  <div className="p-2 flex-grow-1 bd-highlight">
                    <button 
                      className={selectOrderType =='processing' ? "add-payment-method-confirm-button px-2" : "add-payment-method-cancel-button px-2"} 
                      type="button" 
                      onClick={()=>selectOrder('processing')}
                    >
                      Processing</button>
                    &nbsp;&nbsp;
                    <button 
                      className={selectOrderType =='all' ? "add-payment-method-confirm-button px-2" : "add-payment-method-cancel-button px-2"} 
                      type="submit" 
                      onClick={()=>selectOrder('all')}
                    >
                      All Orders
                    </button>                               
                  </div>
                </div>
                {selectOrderType == "all" && 
                  <section>
                      <div className="container order-p2p-trade-dropdowns py-lg-5 pt-5">
                          <div className="row  row-cols-lg-7  row-cols-7">
                              <div className="col">
                                  <p className="enter-amount-heading">Order Type</p>
                                  <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                      <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                          type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                          {tradeType}
                                      </button>
                                      <ul className="dropdown-menu status_change " aria-labelledby="dropdownMenuButton1">
                                          <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectOrderStatus("All Status")}>All Status</a></li>
                                          <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectOrderStatus("Buy")}>Buy</a></li>
                                          <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectOrderStatus("Sell")}>Sell</a></li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="col">
                                  <p className="enter-amount-heading">Status</p>
                                  <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                      <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                          type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                         {tradeStatus}
                                      </button>
                                      <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                          <li><a className="dropdown-item" data-class="stoplimit" href="javascript:void(0)" onClick={()=>selectTradeStatus("All Status")}>All Status</a></li>
                                          <li><a className="dropdown-item" data-class="trailingstop" href="javascript:void(0)" onClick={()=>selectTradeStatus("Completed")}>Completed</a></li>
                                          <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectTradeStatus("Cancelled")}>Cancelled</a></li>
                                          <li><a className="dropdown-item" data-class="oco" href="javascript:void(0)" onClick={()=>selectTradeStatus("Processing")}>Processing</a></li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="col align-items-center">
                                  <p className="enter-amount-heading py-1 py-lg-0">Date</p>
                                  <div className="d-flex flex-row p-2 border justify-content-center align-items-center">
                                    <DatePicker className="datepicker-css-styling"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        sort
                                        format={format}
                                        // onChange={handleChange}
                                        // style={datepickerStyle}
                                        calendarPosition="bottom-center"
                                      />
                                      <GoDash className="mx-3" />
                                      <DatePicker className="datepicker-css-styling"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        sort
                                        format={format}
                                        // style={datepickerStyle}
                                        calendarPosition="bottom-center"
                                      />
                                      {/* <DatePicker className="datepicker-css-styling"
                                          selected={startDate}
                                          onChange={(date) => setStartDate(date)}
                                      />
                                      <GoDash className="mx-3" />
                                      <DatePicker className="datepicker-css-styling"
                                          selected={endDate}
                                          onChange={(date) => setEndDate(date)}
                                      /> */}
                                  </div>
                              </div>
                              <div className="col mt-3 pt-4">
                                  <div className="align-items-center d-flex">
                                      <p className="order-p2p-reset-content-title cursorpointer" onClick={()=>reset()}>Reset </p>
                                      <p className="order-p2p-reset-content-title ms-3 cursorpointer" onClick={()=>searchOrder()}>Filter</p>
                                  </div>
                              </div>
                              {/* <div className="col  mt-3 pt-3">
                                  <div className="d-flex  align-items-center">
                                      <RiDownload2Fill className="border p-2  order-p2p-trade-download-icon" />
                                      <GrDocumentTime className="border  p-2 mx-3 order-p2p-trade-download-icon" />
                                  </div>
                              </div> */}
                          </div>
                      </div>
                  </section>
                }
                {/* ===================================ORDER-P2P-TABLE-START============================================== */}
                <section>
                  <div className="container-fluid col-11 pb-5">
                    <div className="row ">
                      <table className="order-p2p-trade-table">
                        <thead className="order-p2p-trade-thead">
                          <tr className="order-p2p-trade-tr order-p2p-table-heading-styling">
                            <th className="order-p2p-trade-th  " scope="col">Created time</th>
                            <th className="order-p2p-trade-th " scope="col">Order number</th>
                            <th className="order-p2p-trade-th" scope="col">Type/Coin</th>
                            <th className="order-p2p-trade-th" scope="col">Fiat amount</th>
                            <th className="order-p2p-trade-th" scope="col">Price</th>
                            <th className="order-p2p-trade-th" scope="col">Crypto amount</th>
                            <th className="order-p2p-trade-th" scope="col">Counterparty</th>
                            <th className="order-p2p-trade-th" scope="col">Status</th>
                            <th className="order-p2p-trade-th" scope="col">Operation</th>
                          </tr>
                        </thead>
                        <tbody className="order-p2p-trade-tbody">
                          { p2pOrdersList.length > 0 && p2pOrdersList.map((row,index) => (
                            <tr className="order-p2p-trade-tr align-items-center" key={index}>
                                <td className="order-p2p-trade-td " data-label="Created time">{dateFormat(row?.createdDate)}</td>
                                <td className="order-p2p-trade-td" data-label="Order number">
                                  <div className="d-flex flex-row  justify-content-end justify-content-lg-center " >
                                    <a href="javascript:void(0)" onClick={()=>navigate("/order-details/"+row?.orderNo)} className="a-tag-link-styling order-number-copy-data-css">{row?.orderNo}</a>
                                    <div className="ps-2 curPointer">
                                      <RiFileCopyFill onClick={()=>copyToCode(row?.orderNo)}/>
                                    </div>
                                  </div>
                                </td>
                                <td className=" order-p2p-trade-td" data-label="Type/Coin">      
                                  <div className="d-flex flex-row justify-content-end justify-content-lg-center ">
                                    <p>{row?.orderType}/  {row.fromCurrency && row.fromCurrency.image != "" && <img src={row.fromCurrency.image} className="order-p2p-trade-table-coin-icon" />}
                                      {" "}
                                      {row?.fromCurrency?.currencySymbol}
                                    </p>
                                  </div>
                                </td>
                                <td className="order-p2p-trade-td" data-label="Fiat amount">{(row?.cryptoAmt * row?.orderPrice)?.toFixed(row?.toCurrency.siteDecimal)} {row?.toCurrency?.currencySymbol}</td>
                                <td className="order-p2p-trade-td" data-label="Price">{(row?.orderPrice)?.toFixed(row?.toCurrency.siteDecimal)}  {row?.toCurrency?.currencySymbol}</td>
                                <td className="order-p2p-trade-td" data-label="Crypto amount">{(row?.cryptoAmt)?.toFixed(row?.fromCurrency.siteDecimal)} {row?.fromCurrency?.currencySymbol}</td>
                                <td className="order-p2p-trade-td" data-label="Counterparty">
                                    <a href="javascript:void(0)" className="a-tag-link-styling" onClick={()=>navigate("/p2p-advertiser-user-center/"+(userId != row.ownerId ? row.ownerId : row.userId))}>{(userId != row.ownerId ? ((row?.ownerName) != "" ? (row?.ownerName) : showEmail(row?.ownerEmail)) : ((row?.userName) != "" ? (row?.userName) : showEmail(row?.userEmail)))}</a>
                                </td>
                                <td className="order-p2p-trade-td" data-label="Status">
                                  {row.status == 1 && 
                                      <span className='color-green'>Completed</span>
                                  }
                                  {row.status == 2 && 
                                      <span className='color-red'>Cancelled</span>
                                  }
                                  {row.status == 3 && 
                                    <>
                                      <span>
                                        {myProfile?._id == row.userId ? 'To be released' : 'Pending payment'} <br/>
                                      </span> 
                                      <Countdown date={new Date(row.orderEndDate).getTime()}  renderer={renderer} className="endtime color-white"/>
                                    </>
                                  }
                                </td>
                                <td className="order-p2p-trade-td" data-label="Operation"><span className="curPointer color-yellow" onClick={()=>navigate('/order-details/'+row.orderNo)}> Contact</span></td>
                            </tr>
                            ))
                          }
                          { p2pOrdersList && p2pOrdersList.length == 0 && 
                            <tr className="p2p-trade-table-tr">
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td> 
                                <div className="col">
                                  <div className="text-center py-5">
                                      <img src={noResponsibile} className="noresponse-image-styling"></img>
                                      <p className="scrollspy-tops-heading-paragraph mt-3">No Records Found!</p>
                                  </div>  
                                </div>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          }
                        </tbody>
                      </table>
                      { totalOrders > recordsPerPage && 
                        <div className="row">
                          <div className="col-lg-12 d-flex justify-content-end">
                          <Pagination className="p2p-trade-pagination"
                              total={Math.ceil(totalOrders / recordsPerPage)}
                              current={currentPage}
                              onPageChange={page => clickPageNo(page)}
                          />
                            {/* <nav aria-label="Page navigation example">
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
                            </nav> */}
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </section>
                {/* ===================================ORDER-P2P-TABLE-END================================================ */}
            </div>
            <Footer />
        </div>
    );
}
