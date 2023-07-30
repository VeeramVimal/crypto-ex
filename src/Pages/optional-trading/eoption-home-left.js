
import Btclogo from "../../assets/images/coin-logos/btc.png";
import Ethlogo from "../../assets/images/coin-logos/eth.png";
import Bnblogo from "../../assets/images/coin-logos/bnb.png";
import Xrplogo from "../../assets/images/coin-logos/xrp.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import React, { useEffect } from "react";
import $, { data } from "jquery";

export default function Eoptionleft(props) {

    const { ticker_index, ticker_mp, ticker } = props; //** fetch the optional trade ticker */
    useEffect(() => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $(".eoption-left-table-puts").removeClass("show active");
            $(".eoption-left-table-puts-2").removeClass("show active");

        } else {
        }
        $(".eiption-table-row-data").click(function () {
            $(this).addClass("eiption-table-row-active");
        });
        $(".eiption-table-row-active-close").click(function () {
            $(".eiption-table-row-data").removeClass("eiption-table-row-active");
        });
    }, []);


    return (
        <div>
            <div className="eoption-left-tabs-1">
                <ul class="nav nav-pills gap-2" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-BTC-tab" data-bs-toggle="pill" data-bs-target="#pills-BTC" type="button" role="tab" aria-controls="pills-BTC" aria-selected="true">
                            <div className="d-flex flex-row gap-2">
                                <div>
                                    <img className="eoption-left-image-1" src={Btclogo} alt="Btclogo" />
                                </div>
                                <div>
                                    <p className="eoption-left-text-1 mb-0 text-start">BTCUSDT</p>
                                    <div className="d-flex flex-row eoption-left-flex-1">
                                        <div>
                                            <span className="eoption-left-text-2">30,299</span>
                                        </div>
                                        <div className="ms-auto">
                                            <span className="eoption-left-text-2">BVOL: 43.75</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-ETH-tab" data-bs-toggle="pill" data-bs-target="#pills-ETH" type="button" role="tab" aria-controls="pills-ETH" aria-selected="false">
                            <div className="d-flex flex-row gap-2">
                                <div>
                                    <img className="eoption-left-image-1" src={Ethlogo} alt="Ethlogo" />
                                </div>
                                <div>
                                    <p className="eoption-left-text-1 mb-0 text-start">ETHUSDT</p>
                                    <div className="d-flex flex-row eoption-left-flex-1">
                                        <div>
                                            <span className="eoption-left-text-2">30,299</span>
                                        </div>
                                        <div className="ms-auto">
                                            <span className="eoption-left-text-2">BVOL: 43.75</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-BNB-tab" data-bs-toggle="pill" data-bs-target="#pills-BNB" type="button" role="tab" aria-controls="pills-BNB" aria-selected="false">
                            <div className="d-flex flex-row gap-2">
                                <div>
                                    <img className="eoption-left-image-1" src={Bnblogo} alt="Bnblogo" />
                                </div>
                                <div>
                                    <p className="eoption-left-text-1 mb-0 text-start">BNBUSDT</p>
                                    <div className="d-flex flex-row eoption-left-flex-1">
                                        <div>
                                            <span className="eoption-left-text-2">30,299</span>
                                        </div>
                                        <div className="ms-auto">
                                            <span className="eoption-left-text-2">BVOL: 43.75</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-XRP-tab" data-bs-toggle="pill" data-bs-target="#pills-XRP" type="button" role="tab" aria-controls="pills-XRP" aria-selected="false">
                            <div className="d-flex flex-row gap-2">
                                <div>
                                    <img className="eoption-left-image-1" src={Xrplogo} alt="Xrplogo" />
                                </div>
                                <div>
                                    <p className="eoption-left-text-1 mb-0 text-start">XRPUSDT</p>
                                    <div className="d-flex flex-row eoption-left-flex-1">
                                        <div>
                                            <span className="eoption-left-text-2">30,299</span>
                                        </div>
                                        <div className="ms-auto">
                                            <span className="eoption-left-text-2">BVOL: 43.75</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="eoption-left-tabs-2">
                <ul class="nav nav-pills gap-2" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-date1-tab" data-bs-toggle="pill" data-bs-target="#pills-date1" type="button" role="tab" aria-controls="pills-date1" aria-selected="true">All</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-date2-tab" data-bs-toggle="pill" data-bs-target="#pills-date2" type="button" role="tab" aria-controls="pills-date2" aria-selected="false">2023-07-15</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-date3-tab" data-bs-toggle="pill" data-bs-target="#pills-date3" type="button" role="tab" aria-controls="pills-date3" aria-selected="false">2023-07-16</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-date4-tab" data-bs-toggle="pill" data-bs-target="#pills-date4" type="button" role="tab" aria-controls="pills-date4" aria-selected="false">2023-07-17</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-date5-tab" data-bs-toggle="pill" data-bs-target="#pills-date5" type="button" role="tab" aria-controls="pills-date5" aria-selected="false">2023-07-21</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-date6-tab" data-bs-toggle="pill" data-bs-target="#pills-date6" type="button" role="tab" aria-controls="pills-date6" aria-selected="false">2023-07-28</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-date7-tab" data-bs-toggle="pill" data-bs-target="#pills-date7" type="button" role="tab" aria-controls="pills-date7" aria-selected="false">2023-08-04</button>
                    </li>
                </ul>

            </div>

            <div className="eoption-left-tabs-3">
                <div className="d-flex flex-lg-row justify-content-lg-around justify-content-between align-items-center eoption-left-tabs-3-1 ">
                    <div className="text-center eiption-table-row-data-hidden order-lg-1">
                        <span className="eoption-left-text-3">Calls</span>
                    </div>
                    <div className="order-lg-2 order-2">
                        <span className="eoption-left-text-5 eiption-table-row-data-hidden">
                            Index Price: { ticker_index?.data && ticker_index.data.p}
                        </span>
                        <span className="eoption-left-text-4 mx-2">2023-07-16</span><span className="eoption-left-text-5 eiption-table-row-data-hidden">Index Price: 30,350</span>
                    </div>
                    <div className="text-center eiption-table-row-data-hidden order-lg-3">
                        <span className="eoption-left-text-3">Puts</span>
                    </div>

                    <ul class="mobile-hidden-tabs-option nav nav-pills d-lg-none order-lg-4 order-1 gap-2" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-calls-tab" data-bs-toggle="pill" data-bs-target="#pills-calls" type="button" role="tab" aria-controls="pills-calls" aria-selected="true">Calls</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-puts-tab" data-bs-toggle="pill" data-bs-target="#pills-puts" type="button" role="tab" aria-controls="pills-puts" aria-selected="false">Puts</button>
                        </li>
                    </ul>
                </div>

                <div class="tab-content d-flex flex-row" id="pills-tabContent">
                    <div class="tab-pane fade show active eoption-left-table-calls order-lg-1 order-2" id="pills-calls" role="tabpanel" aria-labelledby="pills-calls-tab">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col" className="eiption-table-row-data-hidden">Open (USDT)</th>
                                    <th scope="col">Delta</th>
                                    <th scope="col">Bid / IV</th>
                                    <th scope="col">Mark / IV</th>
                                    <th scope="col">Ask / IV</th>
                                    <th scope="col">Position</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className="eiption-table-row-data">
                                    <td style={{ verticalAlign: "middle" }} className="eiption-table-row-active-dropdown-data">
                                        <div class="dropdown">
                                            <button class="eiption-table-row-dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <BiChevronDown />
                                            </button>
                                            <ul class="dropdown-menu eiption-table-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="d-flex flex-row">
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Leverage</p>
                                                                <p className="eoption-left-text-6">6.0765x</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">IV (Bid)</p>
                                                                <p className="eoption-left-text-6">--%</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">IV (Ask)</p>
                                                                <p className="eoption-left-text-6">93.95%</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row mt-2">
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">24h High</p>
                                                                <p className="eoption-left-text-6">20</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">24h Low</p>
                                                                <p className="eoption-left-text-6">5</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">volume</p>
                                                                <p className="eoption-left-text-6">93.95%</p>
                                                            </div>
                                                        </div>
                                                        <p className="eoption-left-text-7 mt-2">The Greeks</p>
                                                        <div className="d-flex flex-row mt-1">
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Delta</p>
                                                                <p className="eoption-left-text-6">0.34324</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Gamma</p>
                                                                <p className="eoption-left-text-6">0.56546</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Theta</p>
                                                                <p className="eoption-left-text-6">-123213.54</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row mt-2">
                                                            <div className="col-12">
                                                                <p className="eoption-left-text-6 text-muted">Vega</p>
                                                                <p className="eoption-left-text-6">0.234234</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <p className="eoption-left-text-7 mt-2">Order Books</p>
                                                        <div class="d-flex flex-row mb-1 mobile-justify-content border-top-0 eoption-left-text-9 mt-3">
                                                            <div class="progress-table-1">Price(USDT)</div>
                                                            <div class="progress-table-2">Amount(BTC)</div>
                                                            <div class="progress-table-3">Total(USDT)</div>
                                                        </div>
                                                        <div class="d-flex flex-row mobile-justify-content position-relative eoption-left-text-8">
                                                            <div class="progress-bar ask-bar" style={{ width: "50%", height: "20px" }}></div>
                                                            <div class="progress-table-1 color-red"><span class="orderbook-text-2">30,268.2700</span></div>
                                                            <div class="progress-table-2"><span class="orderbook-text-2">0.03116</span></div>
                                                            <div class="progress-table-3"><span class="orderbook-text-2">943.12765</span></div>
                                                        </div>
                                                        <div class="d-flex flex-row mobile-justify-content position-relative eoption-left-text-8">
                                                            <div class="progress-bar ask-bar" style={{ width: "50%", height: "20px" }}></div>
                                                            <div class="progress-table-1 color-red"><span class="orderbook-text-2">30,268.2700</span></div>
                                                            <div class="progress-table-2"><span class="orderbook-text-2">0.03116</span></div>
                                                            <div class="progress-table-3"><span class="orderbook-text-2">943.12765</span></div>
                                                        </div>
                                                        <p className="eoption-left-text-7 mt-2">5</p>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </td>
                                    <td className="eiption-table-row-data-hidden">192,325.37</td>
                                    <td>0.95347</td>
                                    <td>
                                        <div>
                                            <p className="mb-0">1,780</p>
                                            <span style={{ opacity: "0.8" }}>0.00%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="mb-0">1,867</p>
                                            <span style={{ opacity: "0.8" }}>50.00%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="mb-0">1,867</p>
                                            <span style={{ opacity: "0.8" }}>50.00%</span>
                                        </div>
                                    </td>
                                    <td>---</td>
                                    <td style={{ verticalAlign: "middle" }} className="eiption-table-row-active-close-data"><button className="eiption-table-row-active-close"><AiFillCloseCircle /></button></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="eoption-left-table-strike order-lg-2 order-1 text-center">
                        <div className="d-flex flex-row align-items-center">
                            <table class="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="fw-bold">Strike</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <p className="mb-0 fw-bold">1,867</p>
                                                <span style={{ opacity: "0" }}>50.00%</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade show active eoption-left-table-puts order-lg-3 order-2" id="pills-puts" role="tabpanel" aria-labelledby="pills-puts-tab">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col" >Position</th>
                                    <th scope="col">Bid / IV</th>
                                    <th scope="col">Mark / IV</th>
                                    <th scope="col">Ask / IV</th>
                                    <th scope="col">Delta</th>
                                    <th scope="col" className="eiption-table-row-data-hidden">Open (USDT)</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="eiption-table-row-data">
                                    <td style={{ verticalAlign: "middle" }} className="eiption-table-row-active-close-data"><button className="eiption-table-row-active-close"><AiFillCloseCircle /></button></td>
                                    <td>---</td>
                                    <td>
                                        <div>
                                            <p className="mb-0">1,780</p>
                                            <span style={{ opacity: "0.8" }}>0.00%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="mb-0">1,867</p>
                                            <span style={{ opacity: "0.8" }}>50.00%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="mb-0">1,867</p>
                                            <span style={{ opacity: "0.8" }}>50.00%</span>
                                        </div>
                                    </td>
                                    <td>0.95347</td>
                                    <td className="eiption-table-row-data-hidden">192,325.37</td>
                                    <td style={{ verticalAlign: "middle" }} className="eiption-table-row-active-dropdown-data">
                                        <div class="dropdown">
                                            <button class="eiption-table-row-dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <BiChevronDown />
                                            </button>
                                            <ul class="dropdown-menu eiption-table-dropdown-menu eiption-table-dropdown-menu-2" aria-labelledby="dropdownMenuButton1">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="d-flex flex-row">
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Leverage</p>
                                                                <p className="eoption-left-text-6">6.0765x</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">IV (Bid)</p>
                                                                <p className="eoption-left-text-6">--%</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">IV (Ask)</p>
                                                                <p className="eoption-left-text-6">93.95%</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row mt-2">
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">24h High</p>
                                                                <p className="eoption-left-text-6">20</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">24h Low</p>
                                                                <p className="eoption-left-text-6">5</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">volume</p>
                                                                <p className="eoption-left-text-6">93.95%</p>
                                                            </div>
                                                        </div>
                                                        <p className="eoption-left-text-7 mt-2">The Greeks</p>
                                                        <div className="d-flex flex-row mt-1">
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Delta</p>
                                                                <p className="eoption-left-text-6">0.34324</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Gamma</p>
                                                                <p className="eoption-left-text-6">0.56546</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="eoption-left-text-6 text-muted">Theta</p>
                                                                <p className="eoption-left-text-6">-123213.54</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row mt-2">
                                                            <div className="col-12">
                                                                <p className="eoption-left-text-6 text-muted">Vega</p>
                                                                <p className="eoption-left-text-6">0.234234</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <p className="eoption-left-text-7 mt-2">Order Books</p>
                                                        <div class="d-flex flex-row mb-1 mobile-justify-content border-top-0 eoption-left-text-9 mt-3">
                                                            <div class="progress-table-1">Price(USDT)</div>
                                                            <div class="progress-table-2">Amount(BTC)</div>
                                                            <div class="progress-table-3">Total(USDT)</div>
                                                        </div>
                                                        <div class="d-flex flex-row mobile-justify-content position-relative eoption-left-text-8">
                                                            <div class="progress-bar ask-bar" style={{ width: "50%", height: "20px" }}></div>
                                                            <div class="progress-table-1 color-red"><span class="orderbook-text-2">30,268.2700</span></div>
                                                            <div class="progress-table-2"><span class="orderbook-text-2">0.03116</span></div>
                                                            <div class="progress-table-3"><span class="orderbook-text-2">943.12765</span></div>
                                                        </div>
                                                        <div class="d-flex flex-row mobile-justify-content position-relative eoption-left-text-8">
                                                            <div class="progress-bar ask-bar" style={{ width: "50%", height: "20px" }}></div>
                                                            <div class="progress-table-1 color-red"><span class="orderbook-text-2">30,268.2700</span></div>
                                                            <div class="progress-table-2"><span class="orderbook-text-2">0.03116</span></div>
                                                            <div class="progress-table-3"><span class="orderbook-text-2">943.12765</span></div>
                                                        </div>
                                                        <p className="eoption-left-text-7 mt-2">5</p>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <span className="eoption-left-text-3 ms-2">Recent Trades (BTC Options)</span>
            <div className="eoption-left-tabs-4 my-3">
                <div className="d-flex flex-lg-row justify-content-lg-around justify-content-between align-items-center eoption-left-tabs-3-1 ">
                    <div className="text-center eiption-table-row-data-hidden order-lg-1">
                        <span className="eoption-left-text-3">Calls</span>
                    </div>
                    <div className="order-lg-2 order-2">
                        <span className="eoption-left-text-5 eiption-table-row-data-hidden">Index Price: 30,350</span><span className="eoption-left-text-4 mx-2">2023-07-16</span><span className="eoption-left-text-5 eiption-table-row-data-hidden">Index Price: 30,350</span>
                    </div>
                    <div className="text-center eiption-table-row-data-hidden order-lg-3">
                        <span className="eoption-left-text-3">Puts</span>
                    </div>

                    <ul class="mobile-hidden-tabs-option nav nav-pills d-lg-none order-lg-4 order-1" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-calls-tab-2" data-bs-toggle="pill" data-bs-target="#pills-calls-2" type="button" role="tab" aria-controls="pills-calls-2" aria-selected="true">Calls</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-puts-tab-2" data-bs-toggle="pill" data-bs-target="#pills-puts-2" type="button" role="tab" aria-controls="pills-puts-2" aria-selected="false">Puts</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-content d-flex flex-row" id="pills-tabContent">
                    <div class="tab-pane fade show active eoption-left-table-calls-2 order-lg-1 order-2" id="pills-calls-2" role="tabpanel" aria-labelledby="pills-calls-tab-2">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Side</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className="">
                                    <td>Buy</td>
                                    <td>BTC-230718-30500-C</td>
                                    <td>120</td>
                                    <td>0.10</td>
                                    <td>2023-07-17 13:02:07</td>
                                </tr>
                                <tr className="">
                                    <td>Buy</td>
                                    <td>BTC-230718-30500-C</td>
                                    <td>120</td>
                                    <td>0.10</td>
                                    <td>2023-07-17 13:02:07</td>
                                </tr>
                                <tr className="">
                                    <td>Buy</td>
                                    <td>BTC-230718-30500-C</td>
                                    <td>120</td>
                                    <td>0.10</td>
                                    <td>2023-07-17 13:02:07</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade show active eoption-left-table-puts-2 order-lg-2 order-2" id="pills-puts-2" role="tabpanel" aria-labelledby="pills-puts-tab-2">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Side</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <td>Buy</td>
                                    <td>BTC-230718-30500-C</td>
                                    <td>120</td>
                                    <td>0.10</td>
                                    <td>2023-07-17 13:02:07</td>
                                </tr>
                                <tr className="">
                                    <td>Buy</td>
                                    <td>BTC-230718-30500-C</td>
                                    <td>120</td>
                                    <td>0.10</td>
                                    <td>2023-07-17 13:02:07</td>
                                </tr>
                                <tr className="">
                                    <td>Buy</td>
                                    <td>BTC-230718-30500-C</td>
                                    <td>120</td>
                                    <td>0.10</td>
                                    <td>2023-07-17 13:02:07</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="eoption-left-tabs-5 mt-4">
                <ul class="nav nav-pills mb-3 gap-2" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-option-tab-5-1-tab" data-bs-toggle="pill" data-bs-target="#pills-option-tab-5-1" type="button" role="tab" aria-controls="pills-option-tab-5-1" aria-selected="true">Position (0)</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-option-tab-5-2-tab" data-bs-toggle="pill" data-bs-target="#pills-option-tab-5-2" type="button" role="tab" aria-controls="pills-option-tab-5-2" aria-selected="false">Open Orders (0)</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-option-tab-5-3-tab" data-bs-toggle="pill" data-bs-target="#pills-option-tab-5-3" type="button" role="tab" aria-controls="pills-option-tab-5-3" aria-selected="false">Order History</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-option-tab-5-4-tab" data-bs-toggle="pill" data-bs-target="#pills-option-tab-5-4" type="button" role="tab" aria-controls="pills-option-tab-5-4" aria-selected="true">Trade History</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-option-tab-5-5-tab" data-bs-toggle="pill" data-bs-target="#pills-option-tab-5-5" type="button" role="tab" aria-controls="pills-option-tab-5-5" aria-selected="false">Exercise History</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-option-tab-5-6-tab" data-bs-toggle="pill" data-bs-target="#pills-option-tab-5-6" type="button" role="tab" aria-controls="pills-option-tab-5-6" aria-selected="false">Transaction History</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-option-tab-5-1" role="tabpanel" aria-labelledby="pills-option-tab-5-1-tab">
                        <div className="px-2 options-open-orders-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Pair</th>
                                        <th>Order Type</th>
                                        <th>Side</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                        <th>Filled</th>
                                        <th>Remaining</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="border-0">
                                    <tr>
                                        <th>324.9</th>
                                        <th>4</th>
                                        <th>sell</th>
                                        <th>323</th>
                                        <th>1</th>
                                        <th>23.657</th>
                                        <th>34</th>
                                        <th>3423</th>
                                        <th>24</th>
                                        <th><button type="button" className="market-trade-button">Cancel</button></th>
                                    </tr>
                                    <tr>
                                        <th>324.9</th>
                                        <th>4</th>
                                        <th>sell</th>
                                        <th>323</th>
                                        <th>1</th>
                                        <th>23.657</th>
                                        <th>34</th>
                                        <th>3423</th>
                                        <th>24</th>
                                        <th><button type="button" className="market-trade-button">Cancel</button></th>
                                    </tr>
                                    <tr>
                                        <th>324.9</th>
                                        <th>4</th>
                                        <th>sell</th>
                                        <th>323</th>
                                        <th>1</th>
                                        <th>23.657</th>
                                        <th>34</th>
                                        <th>3423</th>
                                        <th>24</th>
                                        <th><button type="button" className="market-trade-button">Cancel</button></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-option-tab-5-2" role="tabpanel" aria-labelledby="pills-option-tab-5-2-tab">...</div>
                    <div class="tab-pane fade" id="pills-option-tab-5-3" role="tabpanel" aria-labelledby="pills-option-tab-5-3-tab">...</div>
                    <div class="tab-pane fade" id="pills-option-tab-5-4" role="tabpanel" aria-labelledby="pills-option-tab-5-4-tab">...</div>
                    <div class="tab-pane fade" id="pills-option-tab-5-5" role="tabpanel" aria-labelledby="pills-option-tab-5-5-tab">...</div>
                    <div class="tab-pane fade" id="pills-option-tab-5-6" role="tabpanel" aria-labelledby="pills-option-tab-5-6-tab">...</div>
                </div>
            </div>
        </div>
    );
}
