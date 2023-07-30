import React, { useEffect, useState } from "react";
import { CiSliderHorizontal } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdSwapHoriz } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { TbArrowsCross } from 'react-icons/tb';
import { MdOutlineSwapVert } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { SiBinance } from 'react-icons/si';


import Linecharteoption from './chart/Linechart-eoption';

import $ from 'jquery'

import ReactTooltip from "react-tooltip";


$(document).ready(function () {


    // Hide all accordion content by default
    $('.accordion-content').hide();

    // Show the first accordion item content by default
    $('.accordion-item:first-child .accordion-content').show();
    $('.accordion-item:first-child').addClass('active');

    $('.accordion-header').click(function () {
        var accordionItem = $(this).closest('.accordion-item');
        var accordionContent = accordionItem.find('.accordion-content');

        // Toggle the accordion content
        accordionContent.slideToggle();

        // Toggle the active class on the accordion header
        accordionItem.toggleClass('active');
    });
});


$(document).ready(function () {
    var scrollContainer = $(".scroll-container");
    var scrollContent = $(".scroll-content");
    var scrollLeftButton = $(".scroll-left");
    var scrollRightButton = $(".scroll-right");

    // Handle click on left arrow button
    scrollLeftButton.click(function () {
        scrollContainer.animate({ scrollLeft: "-=200" });
    });

    // Handle click on right arrow button
    scrollRightButton.click(function () {
        scrollContainer.animate({ scrollLeft: "+=200" });
    });

    // Show/hide arrow buttons based on scroll position
    // scrollContainer.scroll(function () {
    //     var scrollLeft = scrollContainer.scrollLeft();
    //     scrollLeftButton.toggleClass("hidden", scrollLeft === 0);
    //     scrollRightButton.toggleClass(
    //         "hidden",
    //         scrollLeft + scrollContainer.innerWidth() >= scrollContent.outerWidth()
    //     );
    // });
});


export default function Eoptionright(props) {
    const { ticker_index, ticker_mp, ticker } = props; //** fetch the optional trade ticker */
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div>
            <div className=" p-3 d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                    <p className="eoption-right-heading-styling mb-0 ">BTC-230715-31250-C <RxCrossCircled className="end-cross-css" /></p>
                    <p className=" "><span className="green-bg-para-css p-1">15,406.67X</span></p>
                </div>
                <div className="">
                    <CiSliderHorizontal className="setting-icons-styling" />
                </div>
            </div>

            <div class="scroll-container border-bottom">
                <button class="btn scroll-left">&lt;</button>

                <div class="scroll-content ps-2">
                    <ul className="px-0 d-flex flex-row justify-content-between ">
                        <li>
                            <p className="li-heading-font-styling mb-0">24h High/Low/Vol</p>
                            <p className="li-heading-2-font-styling mb-0">280 / 5 / 18.63</p>
                        </li>
                        <li>
                            <p className="li-heading-font-styling mb-0">IV (Bid/Mark/Ask)</p>
                            <p className="li-heading-2-font-styling mb-0">--% / 110.00% / 311.87%</p>
                        </li>
                        <li>
                            <p className="li-heading-font-styling mb-0">Delta</p>
                            <p className="li-heading-2-font-styling mb-0">0.00000054</p>
                        </li>
                        <li>
                            <p className="li-heading-font-styling mb-0">Gamma</p>
                            <p className="li-heading-2-font-styling mb-0">0.00000001</p>
                        </li>
                        <li>
                            <p className="li-heading-font-styling mb-0">Theta</p>
                            <p className="li-heading-2-font-styling mb-0">-0.01296541</p>
                        </li>
                        <li>
                            <p className="li-heading-font-styling mb-0">Vega</p>
                            <p className="li-heading-2-font-styling mb-0">-0.01296541</p>
                        </li>
                    </ul>
                </div>
                <button class="btn scroll-right">&gt;</button>
            </div>

            <div className="container">
                <div className="row row-cols-1 row-cols-lg-2">
                    <div className="col-lg-5 px-lg-0  border-end">

                        <div className='p-0 trading-table-total-height-eoption'>
                            <div className="d-flex flex-row trading-page-top-section-2 align-items-center top-heading-total-height">
                                <div className="ps-2">
                                    <p className="trade-text-5 mb-0">Orderbook</p>
                                </div>
                            </div>
                            <div className='trading-page-top-section-3 '>
                                <div className='trading-table-left-section-eoption progress-bar-bg-color'>
                                    <div className="d-flex flex-row mb-1 justify-content-between orderbook-table-heading-section border-top-0">
                                        <div className="progress-table-1"><span className='orderbook-text-1'>Price<br />(USDT)</span></div>
                                        <div className="progress-table-2"><span className='orderbook-text-1'>Size(Cont)</span></div>
                                        <div className="progress-table-3"><span className='orderbook-text-1'>Sum</span></div>
                                    </div>
                                    <ul className="px-0">
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar ask-bar" style={{ width: "50%" }}></div>
                                                <div class="progress-table-1 color-red">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar ask-bar" style={{ width: "30%" }}></div>
                                                <div class="progress-table-1 color-red">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar ask-bar" style={{ width: "80%" }}></div>
                                                <div class="progress-table-1 color-red">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar ask-bar" style={{ width: "20%" }}></div>
                                                <div class="progress-table-1 color-red">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar ask-bar" style={{ width: "90%" }}></div>
                                                <div class="progress-table-1 color-red">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar ask-bar" style={{ width: "10%" }}></div>
                                                <div class="progress-table-1 color-red">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="d-flex flex-row orderbook-table-heading-section ">
                                    <div class="ps-2">
                                        <span class="trade-text-5 color-red">0.0</span>
                                        <span className="f-13"> -0.99%</span>
                                        <span className="f-13"> 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-0 trading-table-total-height-eoption'>
                            <div className="d-flex flex-row trading-page-top-section-2 align-items-center top-heading-total-height">
                                <div className="ps-2">
                                    <p className="trade-text-5 mb-0">Trade</p>
                                </div>
                            </div>
                            <div className='trading-page-top-section-3 '>
                                <div className='trading-table-left-section-eoption progress-bar-bg-color'>
                                    <div className="d-flex flex-row mb-1 justify-content-between orderbook-table-heading-section border-top-0">
                                        <div className="progress-table-1"><span className='orderbook-text-1'>Price<br />(USDT)</span></div>
                                        <div className="progress-table-2"><span className='orderbook-text-1'>Amount(Cont)</span></div>
                                        <div className="progress-table-3"><span className='orderbook-text-1'>Time</span></div>
                                    </div>
                                    <ul className="px-0">
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar bid_bar_imp" style={{ width: "50%" }}></div>
                                                <div class="progress-table-1 color-green">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar bid_bar_imp" style={{ width: "30%" }}></div>
                                                <div class="progress-table-1 color-green">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar bid_bar_imp" style={{ width: "80%" }}></div>
                                                <div class="progress-table-1 color-green">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar bid_bar_imp" style={{ width: "20%" }}></div>
                                                <div class="progress-table-1 color-green">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar bid_bar_imp" style={{ width: "90%" }}></div>
                                                <div class="progress-table-1 color-green">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="d-flex flex-row mobile-justify-content">
                                                <div class="progress-bar bid_bar_imp" style={{ width: "10%" }}></div>
                                                <div class="progress-table-1 color-green">
                                                    <span class="orderbook-text-2">10.0</span>
                                                </div>
                                                <div class="progress-table-2">
                                                    <span class="orderbook-text-2">2.50</span>
                                                </div>
                                                <div class="progress-table-3">
                                                    <span class="orderbook-text-2">3.96</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 eoption-open-close-tabs-1">
                        <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-open-eoption-tab" data-bs-toggle="pill" data-bs-target="#pills-open-eoption" type="button" role="tab" aria-controls="pills-open-eoption" aria-selected="true">Open</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-close-eoption-tab" data-bs-toggle="pill" data-bs-target="#pills-close-eoption" type="button" role="tab" aria-controls="pills-close-eoption" aria-selected="false">Close</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">

                            <div class="eoption-open-close-tabs-2 tab-pane fade show active" id="pills-open-eoption" role="tabpanel" aria-labelledby="pills-open-eoption-tab" tabindex="0">
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="">
                                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="pills-limit-eoption-tab" data-bs-toggle="pill" data-bs-target="#pills-limit-eoption" type="button" role="tab" aria-controls="pills-limit-eoption" aria-selected="true">Limit</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="pills-bbo-eoption-tab" data-bs-toggle="pill" data-bs-target="#pills-bbo-eoption" type="button" role="tab" aria-controls="pills-bbo-eoption" aria-selected="false">BBO</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="">
                                        <span data-tip data-for="noOverridePosition">
                                            <BsInfoCircleFill />
                                        </span>
                                        <ReactTooltip
                                            id="noOverridePosition"
                                            place="top"
                                            className="tooltip-text-Theme text-center"
                                        >
                                            <span className="tooltip-text-1">Set a limit price below Buy Price Cap or above Sell Price Floor to place order. Order will be filled at or better than the limit price set.</span>
                                        </ReactTooltip>

                                    </div>
                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-limit-eoption" role="tabpanel" aria-labelledby="pills-limit-eoption-tab" tabindex="0">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <div className="">
                                                <p className="f-13 mb-0">Avbl --</p>
                                            </div>
                                            <div className="green-color-icon-styling" data-bs-toggle="modal" data-bs-target="#eoption-right-side-modal">
                                                <MdSwapHoriz />
                                            </div>
                                        </div>
                                        <p class="trade-text-6 mt-3">Price</p>
                                        <div class="input-group mb-1">
                                            <input type="number" name="price" id="price" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value="30270.17" />
                                        </div>
                                        <p className="trade-text-8" data-tip data-for="noOverridePosition-2">Buy Price Cap: NaN</p>
                                        <ReactTooltip
                                            id="noOverridePosition-2"
                                            place="top"
                                            className="tooltip-text-Theme text-center"
                                        >
                                            <span className="tooltip-text-1">The maximum limit price to place a buy order.</span>
                                        </ReactTooltip>
                                        <p class="trade-text-6 mt-3">Amount</p>
                                        <div class="input-group mb-3">
                                            <input type="number" id="total" name="total" class="form-control" placeholder="1 Cont = 1 " aria-label="Username" aria-describedby="basic-addon1" value="" />
                                            <span class="input-group-text" id="basic-addon1">Contract</span>
                                        </div>
                                        <p className="trade-text-8 border-bottom pb-3">Max Amount: --</p>
                                        <div className="d-flex flex-row  pt-3">
                                            <p className="f-13 mb-0 pe-3" data-tip data-for="noOverridePosition-3">TIF</p>
                                            <ReactTooltip
                                                id="noOverridePosition-3"
                                                place="top"
                                                className="tooltip-text-Theme "
                                            >
                                                <span className="tooltip-text-1 tooltip-ul-list-style">
                                                    <div class="">Time in force (TIF) is an order parameter to specify how long an order will remain active or open before it’s executed or expired.
                                                        <ul className=""><li>Good Till Cancelled (GTC) order will remain valid until it is fully executed or manually cancelled.</li>
                                                            <li>Immediate or Cancel (IOC) order must be partially filled immediately at the limit price or better, and the unfilled amount will be cancelled.</li>
                                                            <li>Fill or Kill (FOK) order must be immediately and fully executed at the order price or better, otherwise, it will be completely cancelled.</li>
                                                        </ul>

                                                    </div>
                                                </span>
                                            </ReactTooltip>
                                            <select class="form-select w-25 pe-3 " aria-label="Default select example">
                                                <option selected>GTC</option>
                                                <option value="2">IOC</option>
                                                <option value="3">FOK</option>
                                            </select>
                                        </div>
                                        <div className="row p-3">
                                            <button className="col btn eoption-buy-button-css">
                                                Buy
                                            </button>
                                        </div>
                                        <div className="d-flex flex-row justify-content-between">
                                            <p className="trade-text-8 ">Cost: --</p>
                                            <p className="trade-text-8 border-bottom" data-tip data-for="noOverridePosition-13">Fee Rate</p>
                                            <ReactTooltip
                                                id="noOverridePosition-13"
                                                place="top"
                                                className="tooltip-text-Theme "
                                            >
                                                <span className="tooltip-text-1 tooltip-ul-list-style">
                                                    <div class=" py-3 row justify-content-between align-items-center">
                                                        <p className="col  mb-0">Fee Rate</p>
                                                        <p className="col f-12 text-end text-green mb-0">Learn More</p>
                                                    </div>
                                                    <div class=" row justify-content-between align-items-center">
                                                        <p className="col  mb-0">Transaction Fee Rate</p>
                                                        <p className="col f-12 text-end mb-0">0.02%</p>
                                                    </div>
                                                    <div class=" row justify-content-between align-items-center">
                                                        <p className="col  mb-0">Exercise Fee Rate</p>
                                                        <p className="col f-12 text-end mb-0">0.015%</p>
                                                    </div>
                                                </span>
                                            </ReactTooltip>
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="pills-bbo-eoption" role="tabpanel" aria-labelledby="pills-bbo-eoption-tab" tabindex="0">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <div className="">
                                                <p className="f-13 mb-0">Avbl --</p>
                                            </div>
                                            <div className="green-color-icon-styling" data-bs-toggle="modal" data-bs-target="#eoption-right-side-modal">
                                                <MdSwapHoriz />
                                            </div>
                                        </div>
                                        <p class="trade-text-6 mt-3">Price</p>
                                        <div class="input-group mb-1">
                                            <input type="number" name="price" id="price" class="form-control" placeholder="BBO" aria-label="Username" aria-describedby="basic-addon1" value="" />
                                        </div>
                                        <p className="trade-text-8">Buy Price Cap: NaN</p>
                                        <p class="trade-text-6 mt-3">Amount</p>
                                        <div class="input-group mb-3">
                                            <input type="number" id="total" name="total" class="form-control" placeholder="1 Cont = 1 " aria-label="Username" aria-describedby="basic-addon1" value="" />
                                            <span class="input-group-text" id="basic-addon1">Contract</span>
                                        </div>
                                        <p className="trade-text-8 border-bottom pb-3">Max Amount: --</p>
                                        <div className="d-flex flex-row  pt-3">
                                            <p className="f-13 mb-0 pe-3" data-tip data-for="noOverridePosition-3">TIF</p>
                                            <ReactTooltip
                                                id="noOverridePosition-3"
                                                place="top"
                                                className="tooltip-text-Theme "
                                            >
                                                <span className="tooltip-text-1 tooltip-ul-list-style">
                                                    <div class="">Time in force (TIF) is an order parameter to specify how long an order will remain active or open before it’s executed or expired.
                                                        <ul className=""><li>Good Till Cancelled (GTC) order will remain valid until it is fully executed or manually cancelled.</li>
                                                            <li>Immediate or Cancel (IOC) order must be partially filled immediately at the limit price or better, and the unfilled amount will be cancelled.</li>
                                                            <li>Fill or Kill (FOK) order must be immediately and fully executed at the order price or better, otherwise, it will be completely cancelled.</li>
                                                        </ul>

                                                    </div>
                                                </span>
                                            </ReactTooltip>
                                            <select class="form-select w-25 pe-3 " aria-label="Default select example">
                                                <option selected>GTC</option>
                                                <option value="2">IOC</option>
                                                <option value="3">FOK</option>
                                            </select>
                                        </div>
                                        <div className="row p-3">
                                            <button className="col btn eoption-buy-button-css">
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="eoption-open-close-tabs-2 tab-pane fade" id="pills-close-eoption" role="tabpanel" aria-labelledby="pills-close-eoption-tab" tabindex="0">
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="">
                                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="pills-limit-eoption-tab" data-bs-toggle="pill" data-bs-target="#pills-limit-eoption" type="button" role="tab" aria-controls="pills-limit-eoption" aria-selected="true">Limit</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="pills-bbo-eoption-tab" data-bs-toggle="pill" data-bs-target="#pills-bbo-eoption" type="button" role="tab" aria-controls="pills-bbo-eoption" aria-selected="false">BBO</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="">
                                        <BsInfoCircleFill />
                                    </div>
                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-limit-eoption" role="tabpanel" aria-labelledby="pills-limit-eoption-tab" tabindex="0">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <div className="">
                                                <p className="f-13 mb-0">Avbl --</p>
                                            </div>
                                            <div className="green-color-icon-styling" data-bs-toggle="modal" data-bs-target="#eoption-right-side-modal">
                                                <MdSwapHoriz />
                                            </div>
                                        </div>
                                        <p class="trade-text-6 mt-3">Price</p>
                                        <div class="input-group mb-1">
                                            <input type="number" name="price" id="price" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value="30270.17" />
                                        </div>
                                        <p className="trade-text-8">Buy Price Cap: NaN</p>
                                        <p class="trade-text-6 mt-3">Amount</p>
                                        <div class="input-group mb-3">
                                            <input type="number" id="total" name="total" class="form-control" placeholder="1 Cont = 1 " aria-label="Username" aria-describedby="basic-addon1" value="" />
                                            <span class="input-group-text" id="basic-addon1">Contract</span>
                                        </div>
                                        <p className="trade-text-8 border-bottom pb-3">Max Amount: --</p>
                                        <div className="d-flex flex-row  pt-3">
                                            <p className="f-13 mb-0 pe-3" data-tip data-for="noOverridePosition-3">TIF</p>
                                            <ReactTooltip
                                                id="noOverridePosition-3"
                                                place="top"
                                                className="tooltip-text-Theme "
                                            >
                                                <span className="tooltip-text-1 tooltip-ul-list-style">
                                                    <div class="">Time in force (TIF) is an order parameter to specify how long an order will remain active or open before it’s executed or expired.
                                                        <ul className=""><li>Good Till Cancelled (GTC) order will remain valid until it is fully executed or manually cancelled.</li>
                                                            <li>Immediate or Cancel (IOC) order must be partially filled immediately at the limit price or better, and the unfilled amount will be cancelled.</li>
                                                            <li>Fill or Kill (FOK) order must be immediately and fully executed at the order price or better, otherwise, it will be completely cancelled.</li>
                                                        </ul>

                                                    </div>
                                                </span>
                                            </ReactTooltip>
                                            <select class="form-select w-25 pe-3 " aria-label="Default select example">
                                                <option selected>GTC</option>
                                                <option value="2">IOC</option>
                                                <option value="3">FOK</option>
                                            </select>
                                        </div>
                                        <div className="row p-3">
                                            <button className="col btn eoption-sell-button-css">
                                                Sell
                                            </button>
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="pills-bbo-eoption" role="tabpanel" aria-labelledby="pills-bbo-eoption-tab" tabindex="0">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <div className="">
                                                <p className="f-13 mb-0">Avbl --</p>
                                            </div>
                                            <div className="green-color-icon-styling" data-bs-toggle="modal" data-bs-target="#eoption-right-side-modal">
                                                <MdSwapHoriz />
                                            </div>
                                        </div>
                                        <p class="trade-text-6 mt-3">Price</p>
                                        <div class="input-group mb-1">
                                            <input type="number" name="price" id="price" class="form-control" placeholder="BBO" aria-label="Username" aria-describedby="basic-addon1" value="" />
                                        </div>
                                        <p className="trade-text-8">Buy Price Cap: NaN</p>
                                        <p class="trade-text-6 mt-3">Amount</p>
                                        <div class="input-group mb-3">
                                            <input type="number" id="total" name="total" class="form-control" placeholder="1 Cont = 1 " aria-label="Username" aria-describedby="basic-addon1" value="" />
                                            <span class="input-group-text" id="basic-addon1">Contract</span>
                                        </div>
                                        <p className="trade-text-8 border-bottom pb-3">Max Amount: --</p>
                                        <div className="d-flex flex-row  pt-3">
                                            <p className="f-13 mb-0 pe-3" data-tip data-for="noOverridePosition-3">TIF</p>
                                            <ReactTooltip
                                                id="noOverridePosition-3"
                                                place="top"
                                                className="tooltip-text-Theme "
                                            >
                                                <span className="tooltip-text-1 tooltip-ul-list-style">
                                                    <div class="">Time in force (TIF) is an order parameter to specify how long an order will remain active or open before it’s executed or expired.
                                                        <ul className=""><li>Good Till Cancelled (GTC) order will remain valid until it is fully executed or manually cancelled.</li>
                                                            <li>Immediate or Cancel (IOC) order must be partially filled immediately at the limit price or better, and the unfilled amount will be cancelled.</li>
                                                            <li>Fill or Kill (FOK) order must be immediately and fully executed at the order price or better, otherwise, it will be completely cancelled.</li>
                                                        </ul>

                                                    </div>
                                                </span>
                                            </ReactTooltip>
                                            <select class="form-select w-25 pe-3 " aria-label="Default select example">
                                                <option selected>GTC</option>
                                                <option value="2">IOC</option>
                                                <option value="3">FOK</option>
                                            </select>
                                        </div>
                                        <div className="row p-3">
                                            <button className="col btn eoption-sell-button-css">
                                                Sell
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="accordion border-bottom py-3">
                    <div class="accordion-item py-2 px-1">
                        <div class=" chart-tabs-stylings  d-flex flex-row justify-content-between align-items-center">
                            <ul class="nav nav-pills mb-0" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-eoption-chart1-tab" data-bs-toggle="pill" data-bs-target="#pills-eoption-chart1" type="button" role="tab" aria-controls="pills-eoption-chart1" aria-selected="true">Estimated PnL chart</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-eoption-chart2-tab" data-bs-toggle="pill" data-bs-target="#pills-eoption-chart2" type="button" role="tab" aria-controls="pills-eoption-chart2" aria-selected="false">K-Line</button>
                                </li>
                            </ul>
                            <div className="accordion-header">
                                <IoMdArrowDropdown />
                            </div>

                        </div>
                        <div class="accordion-content">
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-eoption-chart1" role="tabpanel" aria-labelledby="pills-eoption-chart1-tab">
                                    <div className="row">
                                        <Linecharteoption />
                                    </div>

                                    <div className="pt-3 ">
                                        <div class=" row justify-content-between align-items-center">
                                            <p className="col according-title-css mb-0">Max Profit</p>
                                            <p className="col f-12 text-end mb-0">Unlimited</p>
                                        </div>
                                        <div class=" row justify-content-between align-items-center">
                                            <p className="col according-title-css mb-0">Max Loss</p>
                                            <p className="col f-12 text-end mb-0">--</p>
                                        </div>
                                        <div class=" row justify-content-between align-items-center">
                                            <p className="col according-title-css mb-0">Breakeven Price</p>
                                            <p className="col f-12 text-end mb-0">31250.000 USDT</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-eoption-chart2" role="tabpanel" aria-labelledby="pills-eoption-chart2-tab">...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="trade-text-5 mt-2 mb-0">Account</p>
                        <div className="green-color-icon-styling" data-bs-toggle="modal" data-bs-target="#eoption-right-side-modal">
                            <MdSwapHoriz />
                        </div>
                    </div>

                </div>
                <div class="accordion border-bottom py-3">
                    <div class="accordion-item py-2 px-1">
                        <div class="accordion-header row justify-content-between align-items-center">
                            <p className="col according-title-css mb-0" data-tip data-for="noOverridePosition-4">Total Equity</p>
                            <ReactTooltip
                                id="noOverridePosition-4"
                                place="top"
                                className="tooltip-text-Theme "
                            >
                                <span className="tooltip-text-1 tooltip-ul-list-style">
                                    Total nominal assets of Options account. Total Equity = Margin Balance + Options Market Value
                                </span>
                            </ReactTooltip>
                            <p className="col f-12 text-end mb-0">0.00000000 USDT <span><IoMdArrowDropdown /></span></p>

                        </div>
                        <div class="accordion-content">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <p className="f-12 mb-0 text-grey">Margin Balance</p>
                                <p className="f-12 mb-0">0.00000000 USDT</p>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <p className="f-12 mb-0 text-grey">Market Value</p>
                                <p className="f-12 mb-0">0.00000000 USDT</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-3  border-bottom ">
                    <div class=" row justify-content-between align-items-center">
                        <p className="col according-title-css mb-0" data-tip data-for="noOverridePosition-5">Unrealized PnL</p>
                        <ReactTooltip
                            id="noOverridePosition-5"
                            place="top"
                            className="tooltip-text-Theme "
                        >
                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                Unrealized PnL = (Mark Price - Average Price) * Size
                            </span>
                        </ReactTooltip>
                        <p className="col f-12 text-end mb-0">0.00000000 USDT</p>

                    </div>
                    <div className="">
                        <p className="green-color-text-styling">Options PNL Analysis <span><MdOutlineArrowDropDown /></span></p>
                    </div>
                </div>
                <div className="py-3  border-bottom ">
                    <div class=" row justify-content-between align-items-center">
                        <p className="col according-title-css mb-0" data-tip data-for="noOverridePosition-6">Available Margin</p>
                        <ReactTooltip
                            id="noOverridePosition-6"
                            place="top"
                            className="tooltip-text-Theme "
                        >
                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                Available Margin = Margin Balance – In Order
                            </span>
                        </ReactTooltip>
                        <p className="col f-12 text-end mb-0">0.00000000 USDT</p>
                    </div>
                    <div class=" row justify-content-between align-items-center">
                        <p className="col according-title-css mb-0" data-tip data-for="noOverridePosition-7">In Order</p>
                        <ReactTooltip
                            id="noOverridePosition-7"
                            place="top"
                            className="tooltip-text-Theme "
                        >
                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                When you cancel the order, it will release your locked Order Margin including transaction fee to open position.
                            </span>
                        </ReactTooltip>
                        <p className="col f-12 text-end mb-0">0.00000000 USDT</p>
                    </div>
                    <div class=" row justify-content-between align-items-center">
                        <p className="col according-title-css mb-0" data-tip data-for="noOverridePosition-8">Maintenance Margin</p>
                        <ReactTooltip
                            id="noOverridePosition-8"
                            place="top"
                            className="tooltip-text-Theme "
                        >
                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                The minimum amount of margin balance required to keep short selling positions.
                            </span>
                        </ReactTooltip>
                        <p className="col f-12 text-end mb-0">0.00000000 USDT</p>
                    </div>
                </div>
                <div class="accordion border-bottom py-3">
                    <div class="accordion-item py-2 px-1">
                        <div class="accordion-header row justify-content-between align-items-center">
                            <p className="col according-title-css mb-0">Account Greeks</p>
                            <p className="col f-12 text-end mb-0"><IoMdArrowDropdown /></p>

                        </div>
                        <div class="accordion-content eoption-open-close-tabs-3">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-BTCUSDT-tab" data-bs-toggle="pill" data-bs-target="#pills-BTCUSDT" type="button" role="tab" aria-controls="pills-BTCUSDT" aria-selected="true">BTCUSDT</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-ETHUSDT-tab" data-bs-toggle="pill" data-bs-target="#pills-ETHUSDT" type="button" role="tab" aria-controls="pills-ETHUSDT" aria-selected="false">ETHUSDT</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-BNBUSDT-tab" data-bs-toggle="pill" data-bs-target="#pills-BNBUSDT" type="button" role="tab" aria-controls="pills-BNBUSDT" aria-selected="false">BNBUSDT</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-XRPUSDT-tab" data-bs-toggle="pill" data-bs-target="#pills-XRPUSDT" type="button" role="tab" aria-controls="pills-XRPUSDT" aria-selected="false">XRPUSDT</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-BTCUSDT" role="tabpanel" aria-labelledby="pills-BTCUSDT-tab">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-9">Delta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-9"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Delta is the sum of symbol's Delta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-10">Gamma</p>
                                        <ReactTooltip
                                            id="noOverridePosition-10"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Gamma is the sum of symbol's Gamma of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-11">Theta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-11"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Theta is the sum of symbol's Theta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-12">Vega</p>
                                        <ReactTooltip
                                            id="noOverridePosition-12"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Vega is the sum of symbol's Vega of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-ETHUSDT" role="tabpanel" aria-labelledby="pills-ETHUSDT-tab">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-9">Delta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-9"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Delta is the sum of symbol's Delta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-10">Gamma</p>
                                        <ReactTooltip
                                            id="noOverridePosition-10"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Gamma is the sum of symbol's Gamma of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-11">Theta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-11"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Theta is the sum of symbol's Theta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-12">Vega</p>
                                        <ReactTooltip
                                            id="noOverridePosition-12"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Vega is the sum of symbol's Vega of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-BNBUSDT" role="tabpanel" aria-labelledby="pills-BNBUSDT-tab">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-9">Delta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-9"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Delta is the sum of symbol's Delta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-10">Gamma</p>
                                        <ReactTooltip
                                            id="noOverridePosition-10"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Gamma is the sum of symbol's Gamma of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-11">Theta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-11"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Theta is the sum of symbol's Theta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-12">Vega</p>
                                        <ReactTooltip
                                            id="noOverridePosition-12"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Vega is the sum of symbol's Vega of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-XRPUSDT" role="tabpanel" aria-labelledby="pills-XRPUSDT-tab">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-9">Delta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-9"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Delta is the sum of symbol's Delta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-10">Gamma</p>
                                        <ReactTooltip
                                            id="noOverridePosition-10"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Gamma is the sum of symbol's Gamma of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-11">Theta</p>
                                        <ReactTooltip
                                            id="noOverridePosition-11"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Theta is the sum of symbol's Theta of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <p className="f-12 mb-0 text-grey" data-tip data-for="noOverridePosition-12">Vega</p>
                                        <ReactTooltip
                                            id="noOverridePosition-12"
                                            place="top"
                                            className="tooltip-text-Theme "
                                        >
                                            <span className="tooltip-text-1 tooltip-ul-list-style">
                                                Account Vega is the sum of symbol's Vega of position owned multiply by position size.
                                            </span>
                                        </ReactTooltip>
                                        <p className="f-12 mb-0">-</p>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </div>



            {/* =====================Eoption-modal-starts======================= */}

            <div class="modal fade" id="eoption-right-side-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="eoption-right-side-modalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="eoption-right-side-modalLabel">Transfer</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p className="according-title-css">Internal transfers are free on Binance</p>
                            <div className="p-2 modal-from-to-bg-styling mb-4">
                                <div className="d-flex flex-row justify-content-between row-cols-2 align-items-center ">

                                    <div className="col-3 ">
                                        <p className="mb-0 according-title-css"> <FaFileInvoiceDollar /> From</p>
                                    </div>
                                    <div className="col-9 text-start">
                                        <select class="form-select according-title-css" aria-label="Default select example">
                                            <option selected>Fiat and Spot</option>
                                            <option value="1">USDⓈ-M Futures</option>
                                            <option value="2">COIN-M Futures</option>
                                            <option value="3">Isolated Margin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="my-2 row row-cols-lg-2 row-cols-2 justify-content-between">
                                    <div className="col">
                                        <AiOutlineArrowDown className="f-18 ms-3" />
                                    </div>
                                    <div className="col text-end ">
                                        <MdOutlineSwapVert className="green-color-icon-styling me-2" />
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between row-cols-2 align-items-center ">

                                    <div className="col-3 ">
                                        <p className="mb-0 according-title-css"> <TbArrowsCross /> To</p>
                                    </div>
                                    <div className="col-9 text-start">
                                        <select class="form-select according-title-css" aria-label="Default select example">
                                            <option selected>Options</option>
                                            <option value="1">Cross Margin</option>
                                            <option value="2">USDⓈ-M Futures</option>
                                            <option value="3">COIN-M Futures</option>
                                            <option value="4">Funding</option>
                                            <option value="5">Isolated Margin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p className="pt-3 border-top">Coin</p>
                            <select class="py-3 px-2 form-select according-title-css p-2" aria-label="Default select example">
                                <option selected>
                                    <SiBinance /> USDT TetherUS
                                </option>
                                <option value="1">Cross Margin</option>

                            </select>
                            <div class="mt-3 d-flex flex-row justify-content-between align-items-center">
                                <p className=" according-title-css mb-0">Amount</p>
                                <p className=" f-12 text-end mb-0">0.00000000 available / 0.00000000 in order</p>
                            </div>

                            <div class="input-group mb-3">
                                <input type="number" id="total" name="total" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value="" />
                                <span class="input-group-text" id="basic-addon1">MAX</span>
                            </div>

                            <div className="row justify-content-end p-3">
                                <button className="col-6 btn eoption-buy-button-css">
                                    Confirm
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* =====================Eoption-modal-ends========================= */}

        </div >
    );
}
