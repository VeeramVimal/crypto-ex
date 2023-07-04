import React, { useEffect, useState } from "react";

import '../assets/style.css';

import NavbarOne from './separate/NavbarOne';
import Footer from './separate/Footer';

import placeorder from '../assets/images/p2p/placeanorder.png';
import paytheseller from '../assets/images/p2p/paytheseller.png';
import getyourcrypto from '../assets/images/p2p/getyourcrypto.png';
import confirmthepayment from '../assets/images/p2p/confirmthepayment.png';
import releasecrypto from '../assets/images/p2p/releasecrypto.png';

import Lowcosttransactionfees from '../assets/images/p2p/Lowcosttransactionfees.jpg';
import Flexiblepaymentmethods from '../assets/images/p2p/Flexiblepaymentmethods.jpg';
import Tradeatyourpreferredprices from '../assets/images/p2p/Tradeatyourpreferredprices.jpg';
import Protectionforyourprivacy from '../assets/images/p2p/Protectionforyourprivacy.jpg';

import { GoFile } from 'react-icons/go';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';

import { HiCurrencyDollar } from 'react-icons/hi';
import { RiAddCircleFill } from 'react-icons/ri';
import { TbReceipt } from 'react-icons/tb';
import { IoMdSwap } from 'react-icons/io';
import Config from "../core/config/";




import $ from "jquery";


$(document).ready(function () {

    $(".jquery-red-tab-code").removeClass("red-tab-active");

    $(".jquery-green-tab-code").click(function () {
        $(".jquery-green-tab-code").addClass("green-tab-active");
        $(".jquery-red-tab-code").removeClass("red-tab-active");

    });

    $(".jquery-red-tab-code").click(function () {
        $(".jquery-red-tab-code").addClass("red-tab-active");
        $(".jquery-green-tab-code").removeClass("green-tab-active");

    });


});

export default function P2P(props) {

    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />

            <div className="p2p-trade-top-section">
                <section className="p2p-trade-hero-section-two-nav-bg">
                    <div className="hero-top-section container-fluid py-4 text-white">
                        <div className="row">
                            <h1 className="hero-top-section-text-1 text-center">Buy and Sell TetherUS (USDT) with Your Preferred Payment Methods</h1>
                            <p className="hero-top-section-text-2">Buy and sell TetherUS safely and easily on {Config.SITENAME} P2P. Find the best offer below and buy and sell USDT with Your Preferred Payment Methods today.</p>
                        </div>
                    </div>
                    {/* ====================================P2P-SECOND-NAV-START================================== */}

                    <section className="p2p-trade-hero-section-two-nav-bg">
                        <div className="container col-lg-6">
                            <div className="d-flex flex-row justify-content-end p2p-trade-hero-second-nav py-3">
                                <div className=" align-items-center px-4">
                                    <div className="">
                                        <a href="/p2p" className="p2p-second-nav-content-title">P2P</a>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center px-4">
                                    <div className="">
                                        <GoFile className="p2p-second-nav-icons" />
                                    </div>
                                    <div className="ps-2">
                                        <a href="/orderp2ptrade" className="p2p-second-nav-content-title">Orders</a>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center px-4">
                                    <div className="">
                                        <BsPersonBoundingBox className="p2p-second-nav-icons" />
                                    </div>
                                    <div className="ps-2">
                                        <a href="/p2pusercenter" className="p2p-second-nav-content-title">P2P User Center</a>
                                    </div>
                                </div>
                                <div className="align-items-center px-4">

                                    <div className="ps-1">
                                        <div className="dropdown">
                                            <span className=" p2p-second-nav-content-title dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <BsThreeDotsVertical className="p2p-second-nav-icons" /> More
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                    <a className="dropdown-item align-items-center" href="/p2pusercenter">
                                                        <span className="align-items-center "><HiCurrencyDollar className="p2p-second-nav-icons-more-button" /></span>
                                                        <span className="ps-1 align-items-center">Payment Methods</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        <span className="align-items-center "><RiAddCircleFill className="p2p-second-nav-icons-more-button" /></span>
                                                        <span className="ps-1 align-items-center">Post new Ad</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="/myadspage">
                                                        <span className="align-items-center "><TbReceipt className="p2p-second-nav-icons-more-button" /></span>
                                                        <span className="ps-1 align-items-center">My ads</span>
                                                    </a>
                                                </li>

                                            </ul>
                                            <IoMdArrowDropdown className="p2p-second-nav-icons" />

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =====================================P2P-SECOND-NAV-END=================================== */}
                </section>
                <section className="p2p-top-section">
                    <div className="container pt-2 text-white">
                        <div className="row g-4 col-lg-12  mx-auto">
                            <div className="col-lg-2 col-6">
                                <nav className="nav-tabs-buy-sell-section">

                                    <div className="nav nav-tabs nav-tabs-buy-sell nav-justified" id="nav-tab" role="tablist">
                                        <button className="nav-link active jquery-green-tab-code green-tab-active" id="nav-buy-tab" data-bs-toggle="tab" data-bs-target="#nav-buy" type="button" role="tab" aria-controls="nav-buy" aria-selected="true">Buy</button>
                                        <button className="nav-link jquery-red-tab-code red-tab-active" id="nav-sell-tab" data-bs-toggle="tab" data-bs-target="#nav-sell" type="button" role="tab" aria-controls="nav-sell" aria-selected="false">Sell</button>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-lg-10 col-12">
                                <div className="nav-pills-buy-sell">
                                    <ul className="nav nav-pills  mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-usdt-tab" data-bs-toggle="pill" data-bs-target="#pills-usdt" type="button" role="tab" aria-controls="pills-usdt" aria-selected="true">USDT</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-btc-tab" data-bs-toggle="pill" data-bs-target="#pills-btc" type="button" role="tab" aria-controls="pills-btc" aria-selected="false">BTC</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-busd-tab" data-bs-toggle="pill" data-bs-target="#pills-busd" type="button" role="tab" aria-controls="pills-busd" aria-selected="false">BUSD</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-bnb-tab" data-bs-toggle="pill" data-bs-target="#pills-bnb" type="button" role="tab" aria-controls="pills-bnb" aria-selected="true">BNB</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-eth-tab" data-bs-toggle="pill" data-bs-target="#pills-eth" type="button" role="tab" aria-controls="pills-eth" aria-selected="false">ETH</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-ada-tab" data-bs-toggle="pill" data-bs-target="#pills-ada" type="button" role="tab" aria-controls="pills-ada" aria-selected="false">ADA</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-trx-tab" data-bs-toggle="pill" data-bs-target="#pills-trx" type="button" role="tab" aria-controls="pills-trx" aria-selected="true">TRX</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-shib-tab" data-bs-toggle="pill" data-bs-target="#pills-shib" type="button" role="tab" aria-controls="pills-shib" aria-selected="false">SHIB</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-matic-tab" data-bs-toggle="pill" data-bs-target="#pills-matic" type="button" role="tab" aria-controls="pills-matic" aria-selected="false">MATIC</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-wrx-tab" data-bs-toggle="pill" data-bs-target="#pills-wrx" type="button" role="tab" aria-controls="pills-wrx" aria-selected="true">WRX</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-xrp-tab" data-bs-toggle="pill" data-bs-target="#pills-xrp" type="button" role="tab" aria-controls="pills-xrp" aria-selected="false">XRP</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-sol-tab" data-bs-toggle="pill" data-bs-target="#pills-sol" type="button" role="tab" aria-controls="pills-sol" aria-selected="false">SOL</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="p2p-second-section py-3">
                    <div className="container">
                        <div className="row col-lg-12 mx-auto justify-content-center">
                            <div className="col-lg-3 col-11">
                                <span className="enter-amount-text-2">Amount</span>
                                <div className="row enter-amount-section">
                                    <div className="col">
                                        <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount" />
                                    </div>
                                    <div className="col">
                                        <div className="row align-items-center">
                                            <div className="col enter-amount-text-section text-end">
                                                <span className="enter-amount-text-1">INR</span>
                                            </div>
                                            <div className="col">
                                                <button type="button" className="btn">Search</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6">

                                <span className="enter-amount-heading">Fait</span>
                                <div className="f-group">
                                    <select className="f-control f-dropdown" placeholder="Select">
                                        <option value=""> </option>
                                        <option value="1" selected="selected" data-image="https://source.unsplash.com/50x50/?mazda">AED</option>
                                        <option value="2" data-image="https://source.unsplash.com/50x50/?mercedes">EED</option>
                                        <option value="3" data-image="https://source.unsplash.com/50x50/?skoda">FFF</option>
                                        <option value="4" data-image="https://source.unsplash.com/50x50/?renault">LED</option>
                                        <option value="5" data-image="https://source.unsplash.com/50x50/?jeep">PAD</option>
                                    </select>
                                </div>


                            </div>
                            <div className="col-lg-2 col-6">
                                <span className="enter-amount-heading">Payments</span>
                                <div className="f-group">
                                    <select className="f-control f-dropdown" placeholder="Select">
                                        <option value=""> </option>
                                        <option value="1" selected="selected" data-image="https://source.unsplash.com/50x50/?mazda">All Payments
                                        </option>
                                        <option value="2" data-image="https://source.unsplash.com/50x50/?mercedes">Bank Transfer</option>
                                        <option value="3" data-image="https://source.unsplash.com/50x50/?skoda">Wechat</option>
                                        <option value="4" data-image="https://source.unsplash.com/50x50/?renault">Alipay</option>
                                        <option value="5" data-image="https://source.unsplash.com/50x50/?jeep">PAD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6">

                                <span className="enter-amount-heading">Available Region(s)</span>
                                <div className="f-group">
                                    <select className="f-control f-dropdown" placeholder="Select">
                                        <option value=""> </option>
                                        <option value="1" selected="selected" data-image="https://source.unsplash.com/50x50/?mazda">AED</option>
                                        <option value="2" data-image="https://source.unsplash.com/50x50/?mercedes">EED</option>
                                        <option value="3" data-image="https://source.unsplash.com/50x50/?skoda">FFF</option>
                                        <option value="4" data-image="https://source.unsplash.com/50x50/?renault">LED</option>
                                        <option value="5" data-image="https://source.unsplash.com/50x50/?jeep">PAD</option>
                                    </select>
                                </div>


                            </div>
                            <div className="col-lg-1 col-6">

                                <span className="enter-amount-heading">
                                    Filter
                                </span>
                                <div className="f-group">
                                    <select className="f-control f-dropdown" placeholder="Select">
                                        <option value=""> </option>
                                        <option value="1" selected="selected" data-image="https://source.unsplash.com/50x50/?mazda">AED</option>

                                    </select>
                                </div>


                            </div>

                            <div className="col-lg-2 col-6 ">

                                <span className="enter-amount-heading">Refresh</span>
                                <div className="f-group">
                                    <select className="f-control f-dropdown" placeholder="Select">
                                        <option value=""> </option>
                                        <option value="1" selected="selected">Refresh</option>
                                        <option value="2">Refresh 1s</option>
                                        <option value="3">Refresh 5s</option>
                                        <option value="4">Refresh 10s</option>
                                    </select>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>
                <section className="container pt-3">
                    <div className="row col-lg-12 mx-auto">
                        <div className="tab-content" id="nav-tabContent">
                            {/* ===========================================P2P-TRADE-TABLE-BUY-START========================================= */}

                            <div className="tab-pane fade show active" id="nav-buy" role="tabpanel" aria-labelledby="nav-buy-tab">
                                {/* ===============================TABLE-1============================================ */}
                                <table className="p2p-trade-table">
                                    <thead className="p2p-trade-table-thead">
                                        <tr className="p2p-trade-table-tr">
                                            <th className="p2p-trade-table-th"><label>Advertisers (Completion rate)</label></th>
                                            <th className="p2p-trade-table-th"><label>Price<span className="table-lth-bg">lowest to highest</span></label></th>
                                            <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                                            <th className="p2p-trade-table-th"><label>Payment</label></th>
                                            <th className="p2p-trade-table-th"><label>Trade<span className="table-trade-bg">0 Fee</span></label></th>
                                        </tr>
                                    </thead>
                                    <tbody className="p2p-trade-table-tbody">
                                        <tr className="p2p-trade-table-tr">
                                            <td data-label="Invoice" className="p2p-trade-table-td">
                                                <span className="table-data-1"><img
                                                    src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                </span><br />
                                                <span className="table-data-2">15 orders | 100.00% completio</span>
                                            </td>
                                            <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">82.90</span><span className="table-data-4"> INR</span>
                                            </td>
                                            <td data-label="Due Date" className="p2p-trade-table-td">
                                                <span className="table-data-5"><span className="table-data-6">Available</span>309.18 USDT</span><br />
                                                <span className="table-data-5"><span className="table-data-6">Available</span>￥ 100,000.00 - ￥
                                                    186,843.64</span>
                                            </td>
                                            <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">Bank Transfer</span></td>
                                            <td data-label="Payment" className="p2p-trade-table-td">
                                                <button id="" className="btn-invoice" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample-1" aria-expanded="false" aria-controls="collapseExample" >
                                                    Buy USDT
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="collapse py-3" id="collapseExample-1">
                                    <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                            <div className="col-lg-7">
                                                <span>
                                                    <span className="table-data-1"><img
                                                        src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                    </span>
                                                    <span className="table-data-2 ms-3">15 orders | 100.00% completio</span>
                                                </span>

                                                <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">87 INR </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">15 minutes</span>
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">2.8458 USDT </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Sellers Payment Method: </span><span className="table-data-7 ms-2">IMPS</span><span className="table-data-7 ms-2">UPI</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <span className="table-data-2">I want to pay</span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="fc-g px-2 table-data-2">ALL</span>
                                                    <span className="table-data-2">INR</span>
                                                </div>

                                                <span className="table-data-2">I will receive</span>

                                                <div className="d-flex border px-2 align-items-center">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="table-data-2">USDT</span>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <button className="add-payment-method-confirm-button w-100 text-white fw-bold" type="button">Buy USDT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* ==================================TABLE-2========================================== */}
                                <table className="p2p-trade-table">
                                    {/* <thead className="p2p-trade-table-thead">
                                        <tr className="p2p-trade-table-tr">
                                            <th className="p2p-trade-table-th"><label>Advertisers (Completion rate)</label></th>
                                            <th className="p2p-trade-table-th"><label>Price<span className="table-lth-bg">lowest to highest</span></label></th>
                                            <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                                            <th className="p2p-trade-table-th"><label>Payment</label></th>
                                            <th className="p2p-trade-table-th"><label>Trade<span className="table-trade-bg">0 Fee</span></label></th>
                                        </tr>
                                    </thead> */}
                                    <tbody className="p2p-trade-table-tbody">
                                        <tr className="p2p-trade-table-tr">
                                            <td data-label="Invoice" className="p2p-trade-table-td">
                                                <span className="table-data-1"><img
                                                    src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                </span><br />
                                                <span className="table-data-2">15 orders | 100.00% completion</span>
                                            </td>
                                            <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">82.90</span><span className="table-data-4"> INR</span>
                                            </td>
                                            <td data-label="Due Date" className="p2p-trade-table-td">
                                                <span className="table-data-5"><span className="table-data-6">Available</span>309.18 USDT</span><br />
                                                <span className="table-data-5"><span className="table-data-6">Available</span>￥ 100,000.00 - ￥
                                                    186,843.64</span>
                                            </td>
                                            <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">Bank Transfer</span></td>
                                            <td data-label="Payment" className="p2p-trade-table-td">
                                                <button id="#collapseExample-2" className="btn-invoice" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample-2" aria-expanded="false" aria-controls="collapseExample" >
                                                    Buy USDT
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="collapse py-3" id="collapseExample-2">
                                    <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                            <div className="col-lg-7">
                                                <span>
                                                    <span className="table-data-1"><img
                                                        src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                    </span>
                                                    <span className="table-data-2 ms-3">15 orders | 100.00% completio</span>
                                                </span>

                                                <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">87 INR </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">15 minutes</span>
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">2.8458 USDT </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Sellers Payment Method: </span><span className="table-data-7 ms-2">IMPS</span><span className="table-data-7 ms-2">UPI</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <span className="table-data-2">I want to pay</span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="fc-g px-2 table-data-2">ALL</span>
                                                    <span className="table-data-2">INR</span>
                                                </div>

                                                <span className="table-data-2">I will receive</span>

                                                <div className="d-flex border px-2 align-items-center">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="table-data-2">USDT</span>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <button className="add-payment-method-confirm-button w-100 text-white fw-bold" type="button">Buy USDT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/*=======================================TABLE-3======================================*/}

                                <table className="p2p-trade-table">
                                    {/* <thead className="p2p-trade-table-thead">
                                        <tr className="p2p-trade-table-tr">
                                            <th className="p2p-trade-table-th"><label>Advertisers (Completion rate)</label></th>
                                            <th className="p2p-trade-table-th"><label>Price<span className="table-lth-bg">lowest to highest</span></label></th>
                                            <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                                            <th className="p2p-trade-table-th"><label>Payment</label></th>
                                            <th className="p2p-trade-table-th"><label>Trade<span className="table-trade-bg">0 Fee</span></label></th>
                                        </tr>
                                    </thead> */}
                                    <tbody className="p2p-trade-table-tbody">
                                        <tr className="p2p-trade-table-tr">
                                            <td data-label="Invoice" className="p2p-trade-table-td">
                                                <span className="table-data-1"><img
                                                    src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                </span><br />
                                                <span className="table-data-2">15 orders | 100.00% completion</span>
                                            </td>
                                            <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">82.90</span><span className="table-data-4"> INR</span>
                                            </td>
                                            <td data-label="Due Date" className="p2p-trade-table-td">
                                                <span className="table-data-5"><span className="table-data-6">Available</span>309.18 USDT</span><br />
                                                <span className="table-data-5"><span className="table-data-6">Available</span>￥ 100,000.00 - ￥
                                                    186,843.64</span>
                                            </td>
                                            <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">Bank Transfer</span></td>
                                            <td data-label="Payment" className="p2p-trade-table-td">
                                                <button id="" className="btn-invoice" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample-3" aria-expanded="false" aria-controls="collapseExample" >
                                                    Buy USDT
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="collapse py-3" id="collapseExample-3">
                                    <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                            <div className="col-lg-7">
                                                <span>
                                                    <span className="table-data-1"><img
                                                        src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                    </span>
                                                    <span className="table-data-2 ms-3">15 orders | 100.00% completio</span>
                                                </span>

                                                <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">87 INR </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">15 minutes</span>
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">2.8458 USDT </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Sellers Payment Method: </span><span className="table-data-7 ms-2">IMPS</span><span className="table-data-7 ms-2">UPI</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <span className="table-data-2">I want to pay</span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="fc-g px-2 table-data-2">ALL</span>
                                                    <span className="table-data-2">INR</span>
                                                </div>

                                                <span className="table-data-2">I will receive</span>

                                                <div className="d-flex border px-2 align-items-center">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="table-data-2">USDT</span>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <button className="add-payment-method-confirm-button w-100 text-white fw-bold" type="button">Buy USDT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            {/* ==================================P2P-TRADE-TABLE-BUY-END============================================ */}
                            {/* ==================================P2P-TRADE-TABLE-SELL-START========================================= */}

                            <div className="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-sell-tab">

                                {/* =============================TABLE-1================================================== */}
                                <table className="p2p-trade-table">
                                    <thead className="p2p-trade-table-thead">
                                        <tr className="p2p-trade-table-tr">
                                            <th className="p2p-trade-table-th"><label>Advertisers (Completion rate)</label></th>
                                            <th className="p2p-trade-table-th"><label>Price<span className="table-lth-bg">lowest to highest</span></label></th>
                                            <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                                            <th className="p2p-trade-table-th"><label>Payment</label></th>
                                            <th className="p2p-trade-table-th"><label>Trade<span className="table-trade-bg">0 Fee</span></label></th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody className="p2p-trade-table-tbody">
                                        <tr className="p2p-trade-table-tr">
                                            <td data-label="Invoice" className="p2p-trade-table-td">
                                                <span className="table-data-1"><img
                                                    src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                </span><br />
                                                <span className="table-data-2">15 orders | 100.00% completion</span>
                                            </td>
                                            <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">82.90</span><span className="table-data-4"> INR</span>
                                            </td>
                                            <td data-label="Due Date" className="p2p-trade-table-td">
                                                <span className="table-data-5"><span className="table-data-6">Available</span>309.18 USDT</span><br />
                                                <span className="table-data-5"><span className="table-data-6">Available</span>￥ 100,000.00 - ￥
                                                    186,843.64</span>
                                            </td>
                                            <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">Bank Transfer</span></td>
                                            <td data-label="Payment" className="p2p-trade-table-td"><button className="btn-invoice-sell" data-bs-toggle="collapse" data-bs-target="#collapseExample-1" aria-expanded="false" aria-controls="collapseExample">Sell USDT </button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="collapse py-3" id="collapseExample-1">
                                    <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                            <div className="col-lg-7">
                                                <span>
                                                    <span className="table-data-1"><img
                                                        src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                    </span>
                                                    <span className="table-data-2 ms-3">15 orders | 100.00% completio</span>
                                                </span>

                                                <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">87 INR </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">15 minutes</span>
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">2.8458 USDT </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Sellers Payment Method: </span><span className="table-data-7 ms-2">IMPS</span><span className="table-data-7 ms-2">UPI</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <span className="table-data-2">I want to pay</span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="fc-g px-2 table-data-2">ALL</span>
                                                    <span className="table-data-2">INR</span>
                                                </div>

                                                <span className="table-data-2">I will receive</span>

                                                <div className="d-flex border px-2 align-items-center">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="table-data-2">USDT</span>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <button className="add-payment-method-confirm-button w-100 text-white fw-bold" type="button">Sell USDT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* ======================================================TABLE-2=========================================== */}

                                <table className="p2p-trade-table">
                                    {/* <thead className="p2p-trade-table-thead">
                                        <tr className="p2p-trade-table-tr">
                                            <th className="p2p-trade-table-th"><label>Advertisers (Completion rate)</label></th>
                                            <th className="p2p-trade-table-th"><label>Price<span className="table-lth-bg">lowest to highest</span></label></th>
                                            <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                                            <th className="p2p-trade-table-th"><label>Payment</label></th>
                                            <th className="p2p-trade-table-th"><label>Trade<span className="table-trade-bg">0 Fee</span></label></th>
                                        </tr>
                                    </thead> */}
                                    <tbody className="p2p-trade-table-tbody">
                                        <tr className="p2p-trade-table-tr">
                                            <td data-label="Invoice" className="p2p-trade-table-td">
                                                <span className="table-data-1"><img
                                                    src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                </span><br />
                                                <span className="table-data-2">15 orders | 100.00% completion</span>
                                            </td>
                                            <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">82.90</span><span className="table-data-4"> INR</span>
                                            </td>
                                            <td data-label="Due Date" className="p2p-trade-table-td">
                                                <span className="table-data-5"><span className="table-data-6">Available</span>309.18 USDT</span><br />
                                                <span className="table-data-5"><span className="table-data-6">Available</span>￥ 100,000.00 - ￥
                                                    186,843.64</span>
                                            </td>
                                            <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">Bank Transfer</span></td>
                                            <td data-label="Payment" className="p2p-trade-table-td"><button className="btn-invoice-sell" data-bs-toggle="collapse" data-bs-target="#collapseExample-2" aria-expanded="false" aria-controls="collapseExample">Sell USDT </button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="collapse py-3" id="collapseExample-2">
                                    <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                            <div className="col-lg-7">
                                                <span>
                                                    <span className="table-data-1"><img
                                                        src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                    </span>
                                                    <span className="table-data-2 ms-3">15 orders | 100.00% completio</span>
                                                </span>

                                                <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">87 INR </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">15 minutes</span>
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">2.8458 USDT </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Sellers Payment Method: </span><span className="table-data-7 ms-2">IMPS</span><span className="table-data-7 ms-2">UPI</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <span className="table-data-2">I want to pay</span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="fc-g px-2 table-data-2">ALL</span>
                                                    <span className="table-data-2">INR</span>
                                                </div>

                                                <span className="table-data-2">I will receive</span>

                                                <div className="d-flex border px-2 align-items-center">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="table-data-2">USDT</span>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <button className="add-payment-method-confirm-button w-100 text-white fw-bold" type="button">Sell USDT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                {/*==========================================TABLE-3============================================*/}

                                <table className="p2p-trade-table">
                                    {/* <thead className="p2p-trade-table-thead">
                                        <tr className="p2p-trade-table-tr">
                                            <th className="p2p-trade-table-th"><label>Advertisers (Completion rate)</label></th>
                                            <th className="p2p-trade-table-th"><label>Price<span className="table-lth-bg">lowest to highest</span></label></th>
                                            <th className="p2p-trade-table-th"><label>Limit/Available</label></th>
                                            <th className="p2p-trade-table-th"><label>Payment</label></th>
                                            <th className="p2p-trade-table-th"><label>Trade<span className="table-trade-bg">0 Fee</span></label></th>
                                        </tr>
                                    </thead> */}
                                    <tbody className="p2p-trade-table-tbody">
                                        <tr className="p2p-trade-table-tr">
                                            <td data-label="Invoice" className="p2p-trade-table-td">
                                                <span className="table-data-1"><img
                                                    src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                </span><br />
                                                <span className="table-data-2">15 orders | 100.00% completion</span>
                                            </td>
                                            <td data-label="Details" className="p2p-trade-table-td"><span className="table-data-3">82.90</span><span className="table-data-4"> INR</span>
                                            </td>
                                            <td data-label="Due Date" className="p2p-trade-table-td">
                                                <span className="table-data-5"><span className="table-data-6">Available</span>309.18 USDT</span><br />
                                                <span className="table-data-5"><span className="table-data-6">Available</span>￥ 100,000.00 - ￥
                                                    186,843.64</span>
                                            </td>
                                            <td data-label="Amount" className="p2p-trade-table-td"><span className="table-data-7">Bank Transfer</span></td>
                                            <td data-label="Payment" className="p2p-trade-table-td"><button className="btn-invoice-sell" data-bs-toggle="collapse" data-bs-target="#collapseExample-3" aria-expanded="false" aria-controls="collapseExample">Sell USDT </button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="collapse py-3" id="collapseExample-3">
                                    <div className="card card-body container p2p-trade-buy-sell-collapse-container">
                                        <div className="row g-4 justify-content-around">
                                            <div className="col-lg-7">
                                                <span>
                                                    <span className="table-data-1"><img
                                                        src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />Bulk_Dealer
                                                    </span>
                                                    <span className="table-data-2 ms-3">15 orders | 100.00% completio</span>
                                                </span>

                                                <div className="row g-4 mt-3">
                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Price: </span><span className="table-data-5 ms-2 color-green">87 INR </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Payment Time Limit: </span><span className="table-data-5 ms-2">15 minutes</span>
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6">
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Available: </span><span className="table-data-5 ms-2 color-green">2.8458 USDT </span>
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="table-data-6">Sellers Payment Method: </span><span className="table-data-7 ms-2">IMPS</span><span className="table-data-7 ms-2">UPI</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <span className="table-data-2">I want to pay</span>

                                                <div className="d-flex border px-2 align-items-center mb-4">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="fc-g px-2 table-data-2">ALL</span>
                                                    <span className="table-data-2">INR</span>
                                                </div>

                                                <span className="table-data-2">I will receive</span>

                                                <div className="d-flex border px-2 align-items-center">
                                                    <input type="number" className="form-control no-border table-data-2" placeholder="12345" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <span className="table-data-2">USDT</span>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-4">
                                                        <button className="add-payment-method-confirm-button w-100 bg-secondary text-white fw-bold" type="button">Cancel</button>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <button className="add-payment-method-confirm-button w-100 text-white fw-bold" type="button">Sell USDT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* ==================================P2P-TRADE-TABLE-SELL-END=========================================== */}
                        </div>
                    </div>
                </section>
                {/* ==================================BOTTOM-SECTION-WORKS-START======================================== */}
                <section>
                    <div className="container p2p-bottom-section-container">
                        <div className="row">
                            <div className="col">
                                <p className="p2p-bottom-section-heading">HOW P2P WORKS</p>
                            </div>
                        </div>
                        <div className="row p2p-bottom-buy-sell-tabs">
                            <div className="col">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Buy Crypto</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sell Crypto</button>
                                    </li>

                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className="row row-cols-lg-3 row-cols-1">
                                            <div className="col">
                                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                                    <img src={placeorder} />
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                                    <p>Place an Order</p>
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                                    <p>Once you place a P2P order, the crypto asset will be escrowed by {Config.SITENAME} P2P.</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                                    <img src={paytheseller} />
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                                    <p>Pay the Seller</p>
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                                    <p>Send money to the seller via the suggested payment methods. Complete the fiat transaction and click "Transferred, notify seller" on {Config.SITENAME} P2P.</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                                    <img src={getyourcrypto} />
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                                    <p>Get your Crypto</p>
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                                    <p>Once the seller confirms receipt of money, the escrowed crypto will be released to you.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="row row-cols-lg-3 row-cols-1">
                                            <div className="col">
                                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                                    <img src={placeorder} />
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                                    <p>Place an Order</p>
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                                    <p>After you place an order, your crypto will be escrowed by {Config.SITENAME} P2P.</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                                    <img src={confirmthepayment} />
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                                    <p>Confirm the Payment</p>
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                                    <p>Check the transaction record in the given payment account, and make sure you receive the money sent by the buyer.</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row p2p-bottom-buy-sell-tabs-content-image">
                                                    <img src={releasecrypto} />
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title">
                                                    <p>Release Crypto</p>
                                                </div>
                                                <div className="row p2p-bottom-buy-sell-tabs-content-title-paragrah">
                                                    <p>Once you confirm the receipt of money, release crypto to the buyer on {Config.SITENAME} P2P.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ==================================BOTTOM-SECTION-WORKS-END======================================== */}
                {/* ==================================ADVANTAGES-P2P-START============================================*/}
                <section>
                    <div className="container py-5 ">
                        <div className="row mb-3">
                            <div className="col">
                                <p className="p2p-bottom-section-heading">Advantages of P2P Exchange</p>
                            </div>
                        </div>
                        <div className="row py-5 row-cols-lg-4 row-cols-1">
                            <div className="col">
                                <img src={Lowcosttransactionfees} className="advantage-p2p-images" />
                                <p className="advantages-p2p-section-text-1">
                                    Low cost transaction fees
                                </p>
                                <p className="advantages-p2p-section-text-2">
                                    As P2P exchange is a simple platform, the overhead costs are negligible for buyers and sellers.
                                </p>
                                <p className="advantages-p2p-section-text-2">
                                    On {Config.SITENAME} P2P, takers are charged zero trading fees, while makers are charged a small amount of transaction fees upon every completed order. We pledge to apply the lowest P2P transaction fees in all markets.
                                </p>
                            </div>
                            <div className="col">
                                <img src={Flexiblepaymentmethods} className="advantage-p2p-images" />
                                <p className="advantages-p2p-section-text-1">Flexible payment methods</p>
                                <p className="advantages-p2p-section-text-2">Peer-to-peer exchanges allow sellers freedom to define how they want to be paid.
                                </p>
                                <p className="advantages-p2p-section-text-2">On {Config.SITENAME} P2P, you can buy and sell crypto with over 150 payment methods, including bank transfer, cash, PayPal, M-Pesa and multiple e-wallets.
                                </p>
                            </div>
                            <div className="col">
                                <img src={Tradeatyourpreferredprices} className="advantage-p2p-images" />
                                <p className="advantages-p2p-section-text-1">
                                    Trade at your preferred prices
                                </p>
                                <p className="advantages-p2p-section-text-2">
                                    Peer-to-peer exchanges bring users freedom to trade crypto at the preferred prices.
                                </p>
                                <p className="advantages-p2p-section-text-2">
                                    On {Config.SITENAME} P2P, you can not just buy or sell crypto from the existing offers, but also create your trade advertisements to set your own prices.
                                </p>
                            </div>
                            <div className="col">
                                <img src={Protectionforyourprivacy} className="advantage-p2p-images" />
                                <p className="advantages-p2p-section-text-1">
                                    Protection for your privacy
                                </p>
                                <p className="advantages-p2p-section-text-2">
                                    Unlike credit card or bank transfers, peer-to-peer exchanges do not collect information about buyers and sellers.
                                </p>
                                <p className="advantages-p2p-section-text-2">
                                    So you can buy Bitcoin with cash on {Config.SITENAME} P2P and don't need to use any bank account or online wallet to make a crypto-fiat transaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================================ADVANTAGES-P2P-END============================================*/}
                {/* ==================================FAQ-START===================================================== */}
                <section>
                    <div className="container py-5 ">
                        <div className="row">
                            <div className="col">
                                <p className="p2p-bottom-section-heading">FAQS</p>
                            </div>
                        </div>
                        <section className="faq-section">
                            <div className="container">
                                <div className="row">
                                    <div className="faq" id="accordion">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <div className="card">
                                                    <div className="card-header" id="faqHeading-1">
                                                        <div className="mb-0">
                                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-1" data-aria-expanded="true" data-aria-controls="faqCollapse-1">
                                                                <span className="badge">1</span>What is Lorem Ipsum?
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div id="faqCollapse-1" className="collapse" aria-labelledby="faqHeading-1" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqHeading-2">
                                                        <div className="mb-0">
                                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-2" data-aria-expanded="false" data-aria-controls="faqCollapse-2">
                                                                <span className="badge">2</span> Where does it come from?
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div id="faqCollapse-2" className="collapse" aria-labelledby="faqHeading-2" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqHeading-3">
                                                        <div className="mb-0">
                                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-3" data-aria-expanded="false" data-aria-controls="faqCollapse-3">
                                                                <span className="badge">3</span>Why do we use it?
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div id="faqCollapse-3" className="collapse" aria-labelledby="faqHeading-3" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="card">
                                                    <div className="card-header" id="faqHeading-4">
                                                        <div className="mb-0">
                                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-4" data-aria-expanded="false" data-aria-controls="faqCollapse-4">
                                                                <span className="badge">4</span> Where can I get some?
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div id="faqCollapse-4" className="collapse" aria-labelledby="faqHeading-4" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqHeading-5">
                                                        <div className="mb-0">
                                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-5" data-aria-expanded="false" data-aria-controls="faqCollapse-5">
                                                                <span className="badge">5</span> What is Lorem Ipsum?
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div id="faqCollapse-5" className="collapse" aria-labelledby="faqHeading-5" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqHeading-6">
                                                        <div className="mb-0">
                                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-6" data-aria-expanded="false" data-aria-controls="faqCollapse-6">
                                                                <span className="badge">6</span> Where does it come from?
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div id="faqCollapse-6" className="collapse" aria-labelledby="faqHeading-6" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                {/* ==================================FAQ-END======================================================= */}

            </div>
            <Footer />
        </div>
    );
}
