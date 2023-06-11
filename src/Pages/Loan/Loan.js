import "../../assets/style.css";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import { GoChevronLeft } from "react-icons/go";
import slide1 from "../../assets/images/competition/slide1.jpg";
import Datatable from "./Datatable.js";
import Searchbar from "../separate/Searchbar.js";


import stablechart from '../../assets/images/icons/stable-chart.png';

import $ from "jquery"

import { VscGraphLine } from "react-icons/vsc";
import { IoMdArrowDropright } from "react-icons/io";
// import { VscGraphLine } from "react-icons/vsc";
// import { IoMdArrowDropright } from "react-icons/io";

import { RiSecurePaymentFill } from "react-icons/ri";
import { TbTransformFilled } from "react-icons/tb";
import { BsFillBarChartFill } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";
import { GiFlexibleStar } from "react-icons/gi";
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';


export default function Withdraw(props) {

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
                            <div className="col">
                                <a href="/">
                                    <GoChevronLeft className="deposit-back-button-icon" />
                                    <span className="deposit-text-1">Back</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="trading-competion-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="trading-competion-section-1">
                                <div className="row flex-lg-row-reverse">
                                    <div className="col-lg-4">
                                        <img src={slide1} alt="slide1" />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="d-flex flex-lg-row align-items-center">
                                            <div>
                                                <span className=" banner-text-3 ">Crypto Loans</span>
                                                <p className="benefits-text-1 w-75">Borrow for Spot/Margin/Futures Trading or staking to earn high APY.</p>
                                            </div>
                                        </div>
                                        <div className="row row-cols-2 justify-content-between">
                                            <div className="col">
                                                <div className="d-flex align-items-center">
                                                    <RiSecurePaymentFill className="loan-page-icon" />
                                                    <p className="mb-0">Repay at any time</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex align-items-center">
                                                    <TbTransformFilled className="loan-page-icon" />
                                                    <p className="mb-0">No transaction fee</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex align-items-center">
                                                    <BsFillBarChartFill className="loan-page-icon" />
                                                    <p className="mb-0">Partial Liquidation</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex align-items-center">
                                                    <AiOutlinePercentage className="loan-page-icon" />
                                                    <p className="mb-0">Low rate loan staking</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="d-flex align-items-center">
                                                <GiFlexibleStar className="loan-page-icon" />
                                                <p className="mb-0">
                                                    Simple Earn (Flexible) asset can be used as collateral
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-5">
                        <div className="col">
                            <div className="d-flex align-items-center justify-content-between py-5">
                                <p className=" banner-text-3 mb-0">Borrow Market</p>
                                {/* <Searchbar /> */}
                            </div>
                            <Datatable />
                        </div>
                    </div>
                    <div className="container">
                        <p className=" banner-text-3 mb-0 py-5">FAQs</p>
                        <div className="row row-cols-lg-2 row-cols-1">
                            <div className="col">
                                <div className="trading-competion-section-1">
                                    <div className="d-flex ">
                                        <div className="">
                                            <VscGraphLine className="loan-page-icon-image" />
                                        </div>
                                        <div className="mx-3">
                                            <p>Flexible Rate Loan</p>
                                            <p>Learn More <span><IoMdArrowDropright className="coin-icon-sizing-data-table fc-g" /></span></p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col">
                                <div className="trading-competion-section-1">
                                    <div className="d-flex ">
                                        <div className="">
                                            <img className="loan-page-icon-image" src={stablechart} />

                                        </div>
                                        <div className="mx-3">
                                            <p>Stable Rate Loan</p>
                                            <p>Learn More <span><IoMdArrowDropright className="coin-icon-sizing-data-table fc-g" /></span></p>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
