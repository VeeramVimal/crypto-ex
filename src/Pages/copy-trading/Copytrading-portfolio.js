import React, { useEffect, useState } from "react";
import "../../assets/style.css";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import $ from "jquery"
import { IoMdArrowDropright } from "react-icons/io";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { RiShareBoxLine } from "react-icons/ri";
import { BiStar } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCommentDollar } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import { GoSettings } from "react-icons/go";
import Areachartcopytrading from "../../Pages/copy-trading/Areachart-copytrading.js";
import Barchartcopytrading from "../../Pages/copy-trading/Barchart-copytrading.js";
import Doughnutchartcopytrading from "../../Pages/copy-trading/Doughnutchart-copytrading.js";
import Config from "../../core/config";
import { makeRequest } from "../../core/services/v1/request";
import Select from "react-select"
import { useContextData } from '../../core/context';
import { toast } from "../../core/lib/toastAlert";
import { useLocation } from "react-router-dom";


export default function Copytradingportfolio(props) {
    const { myProfile } = useContextData();
    let query = useQuery();    
    const [markets, setmarkets] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [fixedamt, setFixedamt] = useState();    
    const [userBalance, setUserBalance] = useState();

    async function GetMarkets() {
        try{        
            const params = {
            url: `${Config.V1_API_URL}trade/getMarkets`,
            method: 'GET'
            }
            const response = (await makeRequest(params));
            if (response.status) {
                const usersListResponse = response.data;            
                const result = usersListResponse.map(item => {
                return {
                    label: item.pair,
                    value: item._id
                }
                })
            setmarkets(result)
            }
        }
        catch(e)
        {
            
        }
      }      

      async function getUserBalance(){
        try{
            const params = {
            url: `${Config.V1_API_URL}copyTrade/getUserBalance`,
            method: "POST",
            data: {userId:myProfile._id,currency_id:'61330e0fedf7c88c84357055'},
            };
            const response = await makeRequest(params);
            if (response) {          
            setUserBalance(response.data);
        
            }
            else
            {
            console.log('bbbbbbbbb')
            }

        }
        catch(e)
        {

        }
    
      }

      const handleSelect = (selectedList, selectedItem) => {
        setSelectedUsers(selectedList);
      }  

      function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }


      async function sendRequest(){
        try
        {
            
            if(!fixedamt || selectedUsers.length <= 0)
            {
                toast({ type: "error", message: 'Please fill all details' });
            }
            else if(fixedamt > userBalance.amount)
            {
                toast({ type: "error", message: 'Insufficient balance' });
            }
            else if(userBalance.amount < 0.00000001)
            {
                toast({ type: "error", message: 'Insufficient balance' });
            }
            else
            {
                const trader_id = atob(query.get("id"));
                let selected_user_uids;
                let selected_user_uids_arr = selectedUsers.map(selected_user => selected_user.value);
                if (selected_user_uids_arr.length) {
                selected_user_uids = selected_user_uids_arr.join(",")
                }                
                const params = {
                    url: `${Config.V1_API_URL}copyTrade/createCopyTraderRequest`,
                    method: "POST",
                    data: { 
                        //cost_per_order:cost_per_order,
                        copy_amt:fixedamt,
                        //take_profit:take_profit,
                        //stop_loss:stop_loss,
                        trader_id:trader_id,
                        copy_user_id:myProfile._id,
                        selected_pairs:selected_user_uids
                    },
                };
                const response = await makeRequest(params);
                if (response.status) {
                    toast({ type: "success", message: 'Request send successfully' });
                }
                else
                {
                    toast({ type: "error", message: 'Request send faild' });
                }

            }

        }
          catch(e)
          {
            console.log('errorrrrrrr',e)
          }
      }          
      
      useEffect(() => {
        GetMarkets()
        getUserBalance()
    },[myProfile]);
    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />
            <div className="deposit-page-top-banner">
                <div className="deposit-hero-section">
                    <div className="container">
                        <div className="row align-items-center justify-content-center text-center">
                            <div className="col">
                                <div className="copytrading-card-css-styling ">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                            </div>
                                            <div className="">
                                                <p className="mb-0">ABCDEF</p>
                                                <p className="text-grey mb-0">ABCDEF</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center ">
                                                <RiShareBoxLine className="loan-page-icon-image-table mx-2" />
                                                <p className="mb-0">Share</p>
                                            </div>
                                            <div className="d-flex align-items-center ">
                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                <p className="mb-0">Add to Favorite</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-start mt-2">For more lead trader information, check the Binance Leaderboard.</p>
                                    <div className="d-flex mt-2 align-items-center">
                                        <div className="">
                                            <FaCommentDollar className="text-grey" />
                                            <span className="mx-1 f-13 fw-500">USD-M</span>
                                        </div>
                                        <div className="mx-1">
                                            <CgProfile className="text-grey" />
                                            <span className="mx-1 f-13 fw-500">180/250</span>
                                        </div>
                                        <div className="">
                                            <span className="text-grey  f-13 fw-500">| Min. Copy Amt: 10.00</span>
                                        </div>
                                    </div>
                                    <div className="row row-cols-lg-4 row-cols-2 py-4 text-start">
                                        <div className="col">
                                            <p className="mb-0 fc-g f-20">Select pair</p>
                                            <div class="dropdown">
                                                    <Select id="users_pairs" value={selectedUsers} isMulti={true} onChange={handleSelect} options={markets} className="basic-multi-select" ></Select>
                                                    {/* <Select
                                                        defaultValue={[markets[2], markets[3]]}
                                                        value={selectedUsers}
                                                        isMulti
                                                        name="colors"
                                                        options={markets}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                    /> */}
                                                
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fc-g f-20">Fixed amount</p>
                                            <div class="dropdown">
                                                {/* <p className="text-grey dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> */}
                                                <input id="swal_copy_amt" type="number" step="0.5" class="swal2-input" onChange={(e)=>setFixedamt(e.target.value)}/>
                                                {/* </p> */}
                                                {/* <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" href="#">7D</a></li>
                                                    <li><a class="dropdown-item" href="#">30D</a></li>
                                                    <li><a class="dropdown-item" href="#">90D</a></li>
                                                </ul> */}
                                            </div>
                                        </div>
                                        {/* <div className="col">
                                            <p className="mb-0 fc-g f-20">61.97%</p>
                                            <div class="dropdown">
                                                <p className="text-grey dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">7D MDD</p>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" href="#">7D</a></li>
                                                    <li><a class="dropdown-item" href="#">30D</a></li>
                                                    <li><a class="dropdown-item" href="#">90D</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col ms-auto">
                                            <p className="mb-0 fc-g f-20">41.38%</p>
                                            <div class="dropdown">
                                                <p className="text-grey dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">7D Win Rate</p>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" href="#">7D</a></li>
                                                    <li><a class="dropdown-item" href="#">30D</a></li>
                                                    <li><a class="dropdown-item" href="#">90D</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fc-g f-20">12.00</p>
                                            <div class="dropdown">
                                                <p className="text-grey dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">7D Win Orders</p>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" href="#">7D</a></li>
                                                    <li><a class="dropdown-item" href="#">30D</a></li>
                                                    <li><a class="dropdown-item" href="#">90D</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fc-g f-20">29.00</p>
                                            <div class="dropdown">
                                                <p className="text-grey dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">7D Total Orders</p>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" href="#">7D</a></li>
                                                    <li><a class="dropdown-item" href="#">30D</a></li>
                                                    <li><a class="dropdown-item" href="#">90D</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fc-g f-20">+522.78%</p>
                                            <p className="text-grey">Portfolio Margin Balance (USDT)</p>
                                        </div> */}
                                    </div>
                                    
                                    <div className="d-flex mt-2 text-start justify-content-between align-items-center">
                                        <div className="">
                                            {/* <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p> */}
                                            <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">USDT Balance:</span>{userBalance ? userBalance.amount:'0.00'}</p>
                                        </div>
                                        <div className="mx-1">
                                            <button className='btn  banner-top-button-copy' onClick={()=>sendRequest()}>
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-end my-1 text-grey f-13">Updated every 10 minutes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-4 copytrading-portfolio-nav-tabs-css p2puser-center-scrollspy-styling">
                <div className="row">
                    <div className="col">
                        <nav className="p2p-user-center-nav-tabs-styling">
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="nav-currentpositions-tab" data-bs-toggle="tab" data-bs-target="#nav-currentpositions" type="button" role="tab" aria-controls="nav-currentpositions" aria-selected="true">Current Positions</button>
                                <button class="nav-link" id="nav-tradehistory-tab" data-bs-toggle="tab" data-bs-target="#nav-tradehistory" type="button" role="tab" aria-controls="nav-tradehistory" aria-selected="false">Trade History</button>
                                <button class="nav-link" id="nav-statisticaldata-tab" data-bs-toggle="tab" data-bs-target="#nav-statisticaldata" type="button" role="tab" aria-controls="nav-statisticaldata" aria-selected="false">Statistical Data</button>
                                <button class="nav-link" id="nav-depositswithdrawals-tab" data-bs-toggle="tab" data-bs-target="#nav-depositswithdrawals" type="button" role="tab" aria-controls="nav-depositswithdrawals" aria-selected="false">Deposits and Withdrawals</button>
                            </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                            {/* ===================================TAB-1======================================================== */}

                            <div class="tab-pane py-4 fade show active" id="nav-currentpositions" role="tabpanel" aria-labelledby="nav-currentpositions-tab">
                                <div className="container">
                                    <div className="row ">
                                        <div className="col ">
                                            <div className="markets-second-section">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Symbol</th>
                                                            <th scope="col">Leverage | Direction</th>
                                                            <th scope="col">Size</th>
                                                            <th scope="col">Entry Price</th>
                                                            <th scope="col">Mark Price</th>
                                                            <th scope="col">Margin</th>
                                                            <th scope="col">PNL (ROE %)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td >XMRUSDT Perpetual</td>
                                                            <td >20X | <span className="fc-g">Long</span></td>
                                                            <td >-697.90 USDT</td>
                                                            <td >139.58</td>
                                                            <td >156.94</td>
                                                            <td >39.23 (Cross)</td>
                                                            <td ><span className="fc-r">-86.80 USDT (-221.23%)</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td >XMRUSDT Perpetual</td>
                                                            <td >20X | <span className="fc-g">Long</span></td>
                                                            <td >-697.90 USDT</td>
                                                            <td >139.58</td>
                                                            <td >156.94</td>
                                                            <td >39.23 (Cross)</td>
                                                            <td ><span className="fc-r">-86.80 USDT (-221.23%)</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td >XMRUSDT Perpetual</td>
                                                            <td >20X | <span className="fc-g">Long</span></td>
                                                            <td >-697.90 USDT</td>
                                                            <td >139.58</td>
                                                            <td >156.94</td>
                                                            <td >39.23 (Cross)</td>
                                                            <td ><span className="fc-r">-86.80 USDT (-221.23%)</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-lg-8">
                                            <nav className="mt-4 " aria-label="Page navigation example">
                                                <ul class="pagination">
                                                    <li class="page-item">
                                                        <a class="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">&laquo;</span>
                                                        </a>
                                                    </li>
                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item">
                                                        <a class="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">&raquo;</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================TAB-2======================================================== */}

                            <div class="tab-pane py-4 table-nav-tabs-css fade" id="nav-tradehistory" role="tabpanel" aria-labelledby="nav-tradehistory-tab">
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="pills-details-tab" data-bs-toggle="pill" data-bs-target="#pills-details" type="button" role="tab" aria-controls="pills-details" aria-selected="true">Details</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-summary-tab" data-bs-toggle="pill" data-bs-target="#pills-summary" type="button" role="tab" aria-controls="pills-summary" aria-selected="false">Summary</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-details" role="tabpanel" aria-labelledby="pills-details-tab">
                                        <div className="container">
                                            <div className="row ">
                                                <div className="col ">
                                                    <div className="markets-second-section">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Symbol</th>
                                                                    <th scope="col">Direction</th>
                                                                    <th scope="col">Entry Price	</th>
                                                                    <th scope="col">Closing Price</th>
                                                                    <th scope="col">Closing Time</th>
                                                                    <th scope="col">Quantity</th>
                                                                    <th scope="col">PNL</th>
                                                                    <th scope="col">Copy traders</th>
                                                                    <th scope="col">Copy traders’earnings</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td >GMXUSDT Perpetual</td>
                                                                    <td ><span className="fc-r">Short</span></td>
                                                                    <td >80.130699</td>
                                                                    <td >72.269722</td>
                                                                    <td >2023-04-24 04:54:55</td>
                                                                    <td >494.32 USDT</td>
                                                                    <td ><span className="fc-g">53.76</span></td>
                                                                    <td >5</td>
                                                                    <td >5.24 USDT</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >GMXUSDT Perpetual</td>
                                                                    <td ><span className="fc-r">Short</span></td>
                                                                    <td >80.130699</td>
                                                                    <td >72.269722</td>
                                                                    <td >2023-04-24 04:54:55</td>
                                                                    <td >494.32 USDT</td>
                                                                    <td ><span className="fc-g">53.76</span></td>
                                                                    <td >5</td>
                                                                    <td >5.24 USDT</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >GMXUSDT Perpetual</td>
                                                                    <td ><span className="fc-r">Short</span></td>
                                                                    <td >80.130699</td>
                                                                    <td >72.269722</td>
                                                                    <td >2023-04-24 04:54:55</td>
                                                                    <td >494.32 USDT</td>
                                                                    <td ><span className="fc-g">53.76</span></td>
                                                                    <td >5</td>
                                                                    <td >5.24 USDT</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >GMXUSDT Perpetual</td>
                                                                    <td ><span className="fc-r">Short</span></td>
                                                                    <td >80.130699</td>
                                                                    <td >72.269722</td>
                                                                    <td >2023-04-24 04:54:55</td>
                                                                    <td >494.32 USDT</td>
                                                                    <td ><span className="fc-g">53.76</span></td>
                                                                    <td >5</td>
                                                                    <td >5.24 USDT</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end">
                                                <div className="col-lg-8">
                                                    <nav className="mt-4 " aria-label="Page navigation example">
                                                        <ul class="pagination">
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" aria-label="Previous">
                                                                    <span aria-hidden="true">&laquo;</span>
                                                                </a>
                                                            </li>
                                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" aria-label="Next">
                                                                    <span aria-hidden="true">&raquo;</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-summary" role="tabpanel" aria-labelledby="pills-summary-tab">
                                        <div className="container ">
                                            <div className="row justify-content-between  align-items-center">
                                                <div className="col dropdown-after-effects-css">
                                                    <div class="dropdown">
                                                        <button class="btn  bg-grey border-radius-small dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span className="text-black-grey">Last 30 Days</span>
                                                        </button>
                                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            <li><a class="dropdown-item" href="#">Last 7 Days</a></li>
                                                            <li><a class="dropdown-item" href="#">Last 30 Days</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col text-end">
                                                    <p className="mb-0">Time Period: 2023-03-26 00:00 to 2023-04-24 23:59</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container pt-4">
                                            <div className="row ">
                                                <div className="col ">
                                                    <div className="markets-second-section">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Symbol</th>
                                                                    <th scope="col">Volume</th>
                                                                    <th scope="col">Trades</th>
                                                                    <th scope="col">Win Rate</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >1</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >1</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >1</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >1</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >1</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end">
                                                <div className="col-lg-8">
                                                    <nav className="mt-4 " aria-label="Page navigation example">
                                                        <ul class="pagination">
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" aria-label="Previous">
                                                                    <span aria-hidden="true">&laquo;</span>
                                                                </a>
                                                            </li>
                                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" aria-label="Next">
                                                                    <span aria-hidden="true">&raquo;</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================TAB-3======================================================== */}

                            <div class="tab-pane py-4 fade" id="nav-statisticaldata" role="tabpanel" aria-labelledby="nav-statisticaldata-tab">
                                <div className="copytrading-card-css-styling">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">

                                                <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                    <p className="mb-0 deposit-text-1">Performance</p>
                                                    <p className="mb-0"><span className="f-15 mx-2">Last 30 days</span><span className="f-25 fc-g">+30.19%</span></p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="container py-3 table-nav-tabs-css">
                                        <div className="row row-cols-2 row-cols-2 justify-content-between ">
                                            <div className="col">
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active" id="pills-graph-1-tab" data-bs-toggle="pill" data-bs-target="#pills-graph-1" type="button" role="tab" aria-controls="pills-graph-1" aria-selected="true">ROI</button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="pills-graph-2-tab" data-bs-toggle="pill" data-bs-target="#pills-graph-2" type="button" role="tab" aria-controls="pills-graph-2" aria-selected="false">Total PNL</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col text-end dropdown-after-effects-css">
                                                <div class="dropdown">
                                                    <button class="btn  bg-grey border-radius-small dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span className="text-black-grey">Last 30 Days</span>
                                                    </button>
                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li><a class="dropdown-item" href="#">Last 24 hours</a></li>
                                                        <li><a class="dropdown-item" href="#">Last 7 Days</a></li>
                                                        <li><a class="dropdown-item" href="#">Last 30 Days</a></li>
                                                        <li><a class="dropdown-item" href="#">Last 90 Days</a></li>
                                                        <li><a class="dropdown-item" href="#">Last 180 Days</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <div class="tab-content" id="pills-tabContent">
                                                    <div class="tab-pane fade show active" id="pills-graph-1" role="tabpanel" aria-labelledby="pills-graph-1-tab">
                                                        <Areachartcopytrading />
                                                    </div>
                                                    <div class="tab-pane fade" id="pills-graph-2" role="tabpanel" aria-labelledby="pills-graph-2-tab">
                                                        <Areachartcopytrading />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="container-fluid px-0 mx-0">
                                        <div className="row py-5 g-4">
                                            <div className="col-lg-7 ">
                                                <div className="copytrading-card-css-styling h-100">
                                                    <div className=" d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="mb-0 deposit-text-1">Trading Volume</p>
                                                        </div>
                                                        <div className="dropdown-after-effects-css">
                                                            <div class="dropdown">
                                                                <button class="btn  bg-grey border-radius-small dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <span className="text-black-grey">Last 30 Days</span>
                                                                </button>
                                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" href="#">Last 24 hours</a></li>
                                                                    <li><a class="dropdown-item" href="#">Last 7 Days</a></li>
                                                                    <li><a class="dropdown-item" href="#">Last 30 Days</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-3 pb-5">
                                                        <Barchartcopytrading />
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 deposit-text-1">Top 3 Symbols by Trading Volume</p>
                                                    </div>
                                                    <div className="markets-second-section copytrading-table-section-css py-4">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Symbol</th>
                                                                    <th scope="col">Trading Volume</th>
                                                                    <th scope="col">Win Rate</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td >1000SHIBUSDT Perpetual</td>
                                                                    <td >621.33 BUSD</td>
                                                                    <td >100.00%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 deposit-text-1 mt-3 mt-lg-0">Recently Traded</p>
                                                        <p>TOMOUSDT, BELUSDT, IDUSDT</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 ">
                                                <div className="copytrading-card-css-styling  h-100">
                                                    <div className=" d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="mb-0 deposit-text-1">Trading Volume</p>
                                                        </div>
                                                        <div className="dropdown-after-effects-css">
                                                            <div class="dropdown">
                                                                <button class="btn  bg-grey border-radius-small dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <span className="text-black-grey">Last 30 Days</span>
                                                                </button>
                                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" href="#">Last 24 hours</a></li>
                                                                    <li><a class="dropdown-item" href="#">Last 7 Days</a></li>
                                                                    <li><a class="dropdown-item" href="#">Last 30 Days</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-3 pb-5">
                                                        <Doughnutchartcopytrading />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ===================================TAB-4======================================================== */}

                            <div class="tab-pane fade py-4" id="nav-depositswithdrawals" role="tabpanel" aria-labelledby="nav-depositswithdrawals-tab">
                                <div className="container ">
                                    <div className="row ">
                                        <div className="col ">
                                            <div className="markets-second-section">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Time</th>
                                                            <th scope="col">Direction</th>
                                                            <th scope="col">Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td >2023-04-26 12:14:30</td>
                                                            <td >Withdraw</td>
                                                            <td >14 USDT</td>
                                                        </tr>
                                                        <tr>
                                                            <td >2023-04-26 12:14:30</td>
                                                            <td >Withdraw</td>
                                                            <td >14 USDT</td>
                                                        </tr>
                                                        <tr>
                                                            <td >2023-04-26 12:14:30</td>
                                                            <td >Withdraw</td>
                                                            <td >14 USDT</td>
                                                        </tr>
                                                        <tr>
                                                            <td >2023-04-26 12:14:30</td>
                                                            <td >Withdraw</td>
                                                            <td >14 USDT</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-lg-8">
                                            <nav className="mt-4 " aria-label="Page navigation example">
                                                <ul class="pagination">
                                                    <li class="page-item">
                                                        <a class="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">&laquo;</span>
                                                        </a>
                                                    </li>
                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item">
                                                        <a class="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">&raquo;</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    );
}
