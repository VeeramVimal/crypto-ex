import React, { useEffect, useState } from "react";

import '../assets/style.css';

import NavbarOne from './separate/NavbarOne';
import Footer from './separate/Footer';
import P2PHeader from './separate/P2PHeader';

import { GoFile } from 'react-icons/go';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';

import { HiCurrencyDollar } from 'react-icons/hi';
import { GrFormAdd } from 'react-icons/gr';
import { TbReceipt } from 'react-icons/tb';

import { GoDash } from 'react-icons/go';
import { RiDownload2Fill } from 'react-icons/ri';
import { GrDocumentTime } from 'react-icons/gr';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import $ from "jquery";


export default function Myadspage(props) {

    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));

    useEffect(() => {
        $(".status_change .dropdown-item").click(function () {
            var getStatusText = $(this).text();
            $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
            var generateStatusClass = `${$(this).attr('data-class')}-status`
            $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
        })
    }, []);


    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />

            <div className="p2p-trade-top-section add-payment-method-p2p-user-center">
                {/* ====================================P2P-SECOND-NAV-START================================== */}
                <P2PHeader/>
                {/* <section className="p2p-trade-hero-section-two-nav-bg">
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
                                                    <span className="align-items-center "><GrFormAdd className="p2p-second-nav-icons-more-button" /></span>
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
                </section> */}

                {/* =====================================P2P-SECOND-NAV-END=================================== */}

                {/* =====================================ADD-PAYMENT-METHOD-START============================== */}

                <section>
                    <div className="container  order-p2p-trade-dropdowns py-lg-5 pt-5">
                        <div className="row  border-bottom row-cols-lg-7  row-cols-7">
                            <div className="col">
                                <p className="enter-amount-heading">Asset/type</p>
                                <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                    <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                        All assets
                                    </button>
                                    <ul className="dropdown-menu status_change " aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" data-class="oco" href="#">All assets</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">MATIC</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">BTC</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">BUSD</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">BNB</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">ETH</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">SLP</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">DAI</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">EOS</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">RUB</a></li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col ">
                                <p className="enter-amount-heading">Type</p>
                                <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                    <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                        All status
                                    </button>
                                    <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" data-class="stoplimit" href="#">All status</a></li>
                                        <li><a className="dropdown-item" data-class="trailingstop" href="#">Buy</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">Sell</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col">
                                <p className="enter-amount-heading">Status</p>
                                <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                    <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                        All Status
                                    </button>
                                    <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" data-class="stoplimit" href="#">All Status</a></li>
                                        <li><a className="dropdown-item" data-class="trailingstop" href="#">Published</a></li>
                                        <li><a className="dropdown-item" data-class="oco" href="#">Offline</a></li>


                                    </ul>
                                </div>
                            </div>
                            <div className="col align-items-center">
                                <p className="enter-amount-heading py-1 py-lg-0">Date</p>
                                <div className="d-flex flex-row p-2 border justify-content-center align-items-center">
                                    <DatePicker className="datepicker-css-styling"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                    />
                                    <GoDash className="mx-3" />
                                    <DatePicker className="datepicker-css-styling"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                            <div className="col w-100 mt-3 pt-4">
                                <div className="align-items-center">
                                    <p className="order-p2p-reset-content-title d-flex">Reset filter</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" for="flexCheckDefault">
                                           0 Ads
                                        </label>
                                </div>
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
