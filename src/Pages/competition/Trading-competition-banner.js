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

            <section className="trading-competition-banner-section pt-5" style={{ background: `url(${tradingcompetitionbg})` }}>
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

            <section className="trading-competition-slide-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col">

                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                navigation={true}
                                pagination={{
                                    clickable: true,
                                }}
                                // autoplay={{
                                //     delay: 2500,
                                //     disableOnInteraction: false,
                                // }}
                                className="trading-card-swiper"
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                    },
                                    768: {
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                }}
                                modules={[Autoplay, Navigation]}
                            >
                                <SwiperSlide className="d-block">
                                    <div className="trading-card-box-design">
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center px-lg-4">
                                                <div className="">
                                                    <img className="trading-competition-image-1" src={slide1} alt="slide1" />
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="trading-competition-text-3">Investo</span>
                                                </div>
                                            </div>
                                            <div className="left-days-card-section mt-3">
                                                <div class="d-flex flex-row gap-1 justify-content-center">
                                                    <div class=""><span id="days">20</span><span>D</span></div>
                                                    <div class=""><span id="hours">12</span><span>H</span></div>
                                                    <div class=""><span id="mins">26</span><span>M</span></div>
                                                    <div class=""><span id="seconds">40</span><span>S</span></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4 mt-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Places</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">50</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">-</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">53</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="ms-auto">
                                                    <a href="/trading-competition-dashboard" class="trading-competition-text-5 mb-1">View More <HiOutlineArrowRight /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="d-block">
                                    <div className="trading-card-box-design">
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center px-lg-4">
                                                <div className="">
                                                    <img className="trading-competition-image-1" src={slide1} alt="slide1" />
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="trading-competition-text-3">Investo</span>
                                                </div>
                                            </div>
                                            <div className="left-days-card-section mt-3">
                                                <div class="d-flex flex-row gap-1 justify-content-center">
                                                    <div class=""><span id="days">20</span><span>D</span></div>
                                                    <div class=""><span id="hours">12</span><span>H</span></div>
                                                    <div class=""><span id="mins">26</span><span>M</span></div>
                                                    <div class=""><span id="seconds">40</span><span>S</span></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4 mt-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Places</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">50</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">-</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">53</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="ms-auto">
                                                    <a href="/trading-competition-dashboard" class="trading-competition-text-5 mb-1">View More <HiOutlineArrowRight /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="d-block">
                                    <div className="trading-card-box-design">
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center px-lg-4">
                                                <div className="">
                                                    <img className="trading-competition-image-1" src={slide1} alt="slide1" />
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="trading-competition-text-3">Investo</span>
                                                </div>
                                            </div>
                                            <div className="left-days-card-section mt-3">
                                                <div class="d-flex flex-row gap-1 justify-content-center">
                                                    <div class=""><span id="days">20</span><span>D</span></div>
                                                    <div class=""><span id="hours">12</span><span>H</span></div>
                                                    <div class=""><span id="mins">26</span><span>M</span></div>
                                                    <div class=""><span id="seconds">40</span><span>S</span></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4 mt-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Places</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">50</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">-</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">53</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="ms-auto">
                                                    <a href="/trading-competition-dashboard" class="trading-competition-text-5 mb-1">View More <HiOutlineArrowRight /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="d-block">
                                    <div className="trading-card-box-design">
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center px-lg-4">
                                                <div className="">
                                                    <img className="trading-competition-image-1" src={slide1} alt="slide1" />
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="trading-competition-text-3">Investo</span>
                                                </div>
                                            </div>
                                            <div className="left-days-card-section mt-3">
                                                <div class="d-flex flex-row gap-1 justify-content-center">
                                                    <div class=""><span id="days">20</span><span>D</span></div>
                                                    <div class=""><span id="hours">12</span><span>H</span></div>
                                                    <div class=""><span id="mins">26</span><span>M</span></div>
                                                    <div class=""><span id="seconds">40</span><span>S</span></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4 mt-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Places</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">50</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">-</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">53</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="ms-auto">
                                                    <a href="/trading-competition-dashboard" class="trading-competition-text-5 mb-1">View More <HiOutlineArrowRight /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="d-block">
                                    <div className="trading-card-box-design">
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center px-lg-4">
                                                <div className="">
                                                    <img className="trading-competition-image-1" src={slide1} alt="slide1" />
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="trading-competition-text-3">Investo</span>
                                                </div>
                                            </div>
                                            <div className="left-days-card-section mt-3">
                                                <div class="d-flex flex-row gap-1 justify-content-center">
                                                    <div class=""><span id="days">20</span><span>D</span></div>
                                                    <div class=""><span id="hours">12</span><span>H</span></div>
                                                    <div class=""><span id="mins">26</span><span>M</span></div>
                                                    <div class=""><span id="seconds">40</span><span>S</span></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4 mt-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Prize Pool</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">2,000 INS</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Places</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">50</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">My Trade Volume</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">-</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="steps-section-image">
                                                    <p class="trading-competition-text-4 mb-1">Total participants</p>
                                                </div>
                                                <div class="ms-auto">
                                                    <p class="trading-competition-text-4 mb-1">53</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row px-4">
                                                <div class="ms-auto">
                                                    <a href="/trading-competition-dashboard" class="trading-competition-text-5 mb-1">View More <HiOutlineArrowRight /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container pb-5">
                <div className="row">
                    <div className="col">
                        <div className="trading-competion-section-1 mt-4">
                            <p className="competion-text-1 mb-3">TRADING COMPETITION TERMS AND CONDITIONS</p>
                            <div className="row">
                                <div className="col-lg-6">

                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

                                </div>
                                <div className="col-lg-6">
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <p className="competion-text-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
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
