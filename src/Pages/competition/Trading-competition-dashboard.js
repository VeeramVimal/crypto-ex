import React, { useEffect, useState } from "react";

import "../../assets/style.css";
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import TradingCompetition from "../../assets/images/Trading-Competition.gif";
import $ from "jquery"
import axios from "axios";
import DataTable, { createTheme } from 'react-data-table-component';
import slide1 from "../../assets/images/competition/slide1.jpg";





export default function Withdraw(props) {

    const [highesttrade, sethighesttrade] = useState([]);
    const [datatabletheme, setdatatabletheme] = useState("light");


    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secondsEl = document.getElementById("seconds");

    const newYears = "1 sep 2023";

    const columns = [
        {
            name: "Sno",
            selector: (row) => row.serial,
            sortable: true,
            width: "100px"
        },
        {
            name: "Email",
            selector: (row) => row.email,
            width: "280px"
        },
        {
            name: "Trades",
            selector: (row) => row.trades,
            sortable: true,
            width: "150px"
        },
        {
            name: "VOLUME",
            selector: (row) => row.amount,
            sortable: true,
        },
    ];

    createTheme('solarized', {
        context: {
            background: 'red',
            text: 'red',
        },
        divider: {
            default: '#ccc',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
        striped: {
            default: 'red'
        },
    }, 'dark');






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

    const getreferral = async () => {
        const tradecompetion = await axios.get("http://192.168.1.21:3004/api/v1/trade/gettotalTrades");
        const firstarr = tradecompetion.data.data
        const secondarr = tradecompetion.data.datatrades
        const mergedArr = firstarr.map((obj1) => {
            const obj2 = secondarr.find((obj2) => obj2.email === obj1.email);
            if (obj2) {
                return { ...obj1, ...obj2 };
            }
            return obj1;
        });
        const sortedArr = mergedArr
            .sort((a, b) => b.amount - a.amount)
            .map((item, index) => ({ ...item, serial: index + 1 }));
        sethighesttrade(sortedArr)
    }

    useEffect(() => {
        getreferral();
    }, [])

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

            <div className="trading-competion-section py-5">
                <div className="container">
                    <div className="row">
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
                                            <div class="countdown-container bg-transparent d-flex gap-4 justify-content-center text-center ms-auto">
                                                <div class="countdown-el days-c">
                                                    <p class="big-text" id="days">0</p>
                                                    <span>DAYS</span>
                                                </div>
                                                <div class="countdown-el hours-c">
                                                    <p class="big-text" id="hours">0</p>
                                                    <span>HOURS</span>
                                                </div>
                                                <div class="countdown-el mins-c">
                                                    <p class="big-text" id="mins">0</p>
                                                    <span>MINS</span>
                                                </div>
                                                <div class="countdown-el seconds-c">
                                                    <p class="big-text" id="seconds">0</p>
                                                    <span>SECONDS</span>
                                                </div>
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

                            <p className="competion-text-1 mb-3 mt-5">LEADERBOARD</p>
                            <div className="trading-competion-section-1">
                                <div className="row">
                                    <div className="col">
                                        <DataTable
                                            columns={columns}
                                            data={highesttrade}
                                            defaultSortFieldId
                                            noDataComponent=""
                                            pagination={5}
                                            highlightOnHover
                                            theme="solarized"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="trading-competion-section-1 mt-4">
                                <p className="competion-text-1 mb-3">TRADING COMPETITION TERMS AND CONDITIONS</p>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <p className="competion-text-6">By pressing ‘Take part’, you agree to the following terms and conditions.</p>

                                        <p className="competion-text-6">1. Each trading competition held on WhiteBIT starts at 12:00 pm UTC and ends at 11:59 am UTC on dates indicated for each competition.</p>
                                        <p className="competion-text-6">2. The table of Participants is refreshed every 30 minutes. The final Trading Volume data will be collected at 12:00 pm UTC on the last day of each Competition.</p>
                                        <p className="competion-text-6">3. For each Competition, users’ Trading Volume will be counted only on the Trading Pair(s) specified on the competition page.</p>
                                        <p className="competion-text-6">4. The Trading Volume is counted as the total sum of all user’s executed Buy and Sell orders on a specified Trading Pair(s) during the Competition period.</p>
                                        <p className="competion-text-6">5. WhiteBIT reserves the right to disqualify the User from the trading competition if they:</p>
                                        <p className="competion-text-6">- use wash trading (execute their own orders);</p>
                                        <p className="competion-text-6">- use accounts with 0% trading fee (except of special trading fee discounts provided to holders of the WhiteBIT Token);</p>
                                    </div>
                                    <div className="col-lg-6">
                                        <p className="competion-text-6">- use API bots;</p>
                                        <p className="competion-text-6">- use the corporate account (for example, those created for exchange services);</p>
                                        <p className="competion-text-6">- use multi-accounts (only one account per participant is allowed);</p>
                                        <p className="competion-text-6">- conduct any other illegal activity covered by WhiteBIT’s Terms and Conditions and User Agreement.</p>
                                        <p className="competion-text-6">Joint deliberate actions of a user with other affiliated users, utilizing their accounts to participate in the Competition with insider knowledge of such accounts' actions, strategies, and intentions in terms of order placement and execution is considered as operating a multi-account, is prohibited and, therefore, entails the disqualification of such users the Competition.</p>
                                        <p className="competion-text-6">6. The User will be considered a participant of the trading competition only after they press the ‘Take part’ button on the Competition page.</p>
                                        <p className="competion-text-6">7. Rewards for each tournament will be sent to the winners' e-mail in the form of WhiteBIT Codes during 5 business days after the end of the tournament (business day means day prescribed by the User agreement).</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="trading-competion-section-1 mt-4">
                                <div className="row">
                                    <div className="col">
                                        <p className="competion-text-1 mb-3">DISCLAIMER</p>

                                        <p className="competion-text-6">WhiteBIT informs that digital assets markets and trading transactions are the subject of significant risk. WhiteBIT does not recommend, endorse, protect or act as a guarantor of any digital asset, trading pair or transaction that is present or performed here on the Website. No content on our Website (Platform) is meant to be a solicitation or offer. WhiteBIT is not liable for any direct, indirect or consequential or special damages of any kind or losses as a result of the trading competition or any transaction.</p>
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
