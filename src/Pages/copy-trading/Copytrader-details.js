import "../../assets/style.css";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import React, { useEffect, useState } from "react";
import $ from "jquery"

import { FiSearch } from 'react-icons/fi';
import { GoDash } from 'react-icons/go';
import { IoCalendarSharp } from 'react-icons/io5';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Copytraderdetails(props) {

    const [startDate, setStartDate] = useState(new Date("2023/02/08"));
    const [endDate, setEndDate] = useState(new Date("2023/02/10"));

    return (
        <div className=" copytrader-details-section">
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />
            <div className="deposit-page-top-banner py-5">

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="deposit-text-1">Copy Traders Details</p>

                        </div>
                    </div>
                </div>

            </div>

            <div className="container p2puser-center-scrollspy-styling">
                <div className="row">
                    <div className="col">
                        <nav className="p2p-user-center-nav-tabs-styling">
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Ongoing Copy (0)</button>
                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Closed Copy (0)</button>
                            </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <section>
                                    <div className="container  order-p2p-trade-dropdowns py-lg-5 pt-5">
                                        <div className="row align-items-center pb-3 border-bottom row-cols-lg-7  row-cols-7">
                                            <div className="col ">
                                                <div className="d-flex flex-row  align-items-center border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                                    <input class="form-control me-2 border-none bg-none" type="search" placeholder="Search Copy ID" aria-label="Search" />
                                                    <FiSearch />
                                                </div>
                                            </div>
                                            <div className="col ">

                                                <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                                    <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                                        Portfolio Name
                                                    </button>
                                                    <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                                        <li><a className="dropdown-item" data-class="stoplimit" href="#">All status</a></li>
                                                        <li><a className="dropdown-item" data-class="trailingstop" href="#">Buy</a></li>
                                                        <li><a className="dropdown-item" data-class="oco" href="#">Sell</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="col align-items-center">

                                                <div className="d-flex flex-row px-2 border justify-content-between align-items-center">
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
                                                     <IoCalendarSharp className="f-40" />
                                                </div>
                                            </div>
                                            <div className="col w-100">
                                                <div className="align-items-center d-flex">
                                                    <p className="mb-0 btn-next-1 order-p2p-reset-content-title cursorpointer" >Search</p>
                                                    <p className="mb-0 border px-3 py-1 order-p2p-reset-content-title ms-3 cursorpointer">Reset</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col markets-second-section ">
                                                <div className="market-place-table-section">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Copy ID</th>
                                                                <th scope="col">Portfolio Name</th>
                                                                <th scope="col">Assets</th>
                                                                <th scope="col">Start Time</th>
                                                                <th scope="col">Initial Amount</th>
                                                                <th scope="col">Latest Amount</th>
                                                                <th scope="col">PNL</th>
                                                                <th scope="col">Total Unrealized Profit Spiltting</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>Pair Not Found</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <section>
                                    <div className="container  order-p2p-trade-dropdowns py-lg-5 pt-5">
                                        <div className="row align-items-center pb-3 border-bottom row-cols-lg-7  row-cols-7">
                                            <div className="col ">
                                                <div className="d-flex flex-row  align-items-center border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                                    <input class="form-control me-2 border-none bg-none" type="search" placeholder="Search Copy ID" aria-label="Search" />
                                                    <FiSearch />
                                                </div>
                                            </div>
                                            <div className="col ">

                                                <div className="border p-2 dropdown custom-dropdown status_dropdown" data-color="created-status">
                                                    <button className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,12">
                                                        Portfolio Name
                                                    </button>
                                                    <ul className="dropdown-menu status_change" aria-labelledby="dropdownMenuButton1">
                                                        <li><a className="dropdown-item" data-class="stoplimit" href="#">All status</a></li>
                                                        <li><a className="dropdown-item" data-class="trailingstop" href="#">Buy</a></li>
                                                        <li><a className="dropdown-item" data-class="oco" href="#">Sell</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="col align-items-center">

                                                <div className="d-flex flex-row px-2 border text-center justify-content-between align-items-center">
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
                                                    <IoCalendarSharp className="f-40" />
                                                </div>
                                            </div>
                                            <div className="col w-100">
                                                <div className="align-items-center d-flex">
                                                    <p className="mb-0 btn-next-1 order-p2p-reset-content-title cursorpointer" >Search</p>
                                                    <p className="mb-0 border px-3 py-1 order-p2p-reset-content-title ms-3 cursorpointer">Reset</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col markets-second-section ">
                                                <div className="market-place-table-section">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Copy ID</th>
                                                                <th scope="col">Portfolio Name</th>
                                                                <th scope="col">Assets</th>
                                                                <th scope="col">Start Time</th>
                                                                <th scope="col">Initial Amount</th>
                                                                <th scope="col">Latest Amount</th>
                                                                <th scope="col">PNL</th>
                                                                <th scope="col">Total Unrealized Profit Spiltting</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                                <td className="cursor curPointer">

                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>Pair Not Found</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />


        </div>
    );
}
