import React, { useEffect, useState } from "react";

import "../../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";

import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import slide1 from "../../assets/images/competition/slide1.jpg";
import $ from "jquery"
import axios from "axios";
import DataTable, { createTheme } from 'react-data-table-component';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import tradingcompetitionbg from '../../assets/images/trading-competition-bg.png';


export default function Withdraw(props) {


    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secondsEl = document.getElementById("seconds");

    const newYears = "1 sep 2023";
    function countdown() {
        const newYearsDate = new Date(newYears);
        const currentDate = new Date();

        const totalSeconds = (newYearsDate - currentDate) / 1000;

        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const mins = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;
        $("#days").html(days);
        $("#hours").html(formatTime(hours));
        $("#mins").html(formatTime(mins));
        $("#seconds").html(formatTime(seconds));
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    countdown();

    setInterval(countdown, 1000);
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

            <section className="trading-competition-banner-section pt-5"  style={{background: `url(${tradingcompetitionbg})`}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="trading-competition-text-1">Take part in the tournament and get a chance to win a cash prize</h1>
                            <p className="trading-competition-text-2 my-5 fw-600">
                                On the Dex-Trade website, you can take part in tournaments and win cash prizes by fulfilling the conditions of the contests. More and more participants participate in tournaments and increase the number of their victories. Be among them</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="trading-competion-section py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-12">

                            <div className="trading-competion-section-1">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img src={slide1} alt="slide1" />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="d-flex flex-lg-row align-items-center">
                                            <div>
                                                <span className="trading-competition-text-3">Investo</span>

                                            </div>
                                            <div class="countdown-el ms-auto">
                                                <p class="big-text w-100">Finished</p>
                                            </div>

                                        </div>




                                        <div className="row mt-4">
                                            <div className="col-lg-6">
                                                <div class="d-flex flex-row px-lg-4 px-2 ">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Places</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">50</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3 mt-lg-0">
                                                <div class="d-flex flex-row px-lg-4 px-2">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">-</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">53</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>


                        </div>

                        <div className="col-lg-12">

                            <div className="trading-competion-section-1">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img src={slide1} alt="slide1" />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="d-flex flex-lg-row align-items-center">
                                            <div>
                                                <span className="trading-competition-text-3">Investo</span>

                                            </div>
                                            <div class="countdown-el ms-auto">
                                                <p class="big-text w-100">Finished</p>
                                            </div>

                                        </div>




                                        <div className="row mt-4">
                                            <div className="col-lg-6">
                                                <div class="d-flex flex-row px-lg-4 px-2 ">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Places</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">50</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3 mt-lg-0">
                                                <div class="d-flex flex-row px-lg-4 px-2">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">-</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">53</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>


                        </div>

                        <div className="col-lg-12">

                            <div className="trading-competion-section-1">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img src={slide1} alt="slide1" />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="d-flex flex-lg-row align-items-center">
                                            <div>
                                                <span className="trading-competition-text-3">Investo</span>

                                            </div>
                                            <div class="countdown-el ms-auto">
                                                <p class="big-text w-100">Finished</p>
                                            </div>

                                        </div>




                                        <div className="row mt-4">
                                            <div className="col-lg-6">
                                                <div class="d-flex flex-row px-lg-4 px-2 ">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Places</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">50</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3 mt-lg-0">
                                                <div class="d-flex flex-row px-lg-4 px-2">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">-</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                                                    <div class="steps-section-image">
                                                        <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p class="trading-competition-text-4 mb-1">53</p>
                                                    </div>
                                                </div>
                                            </div>
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
