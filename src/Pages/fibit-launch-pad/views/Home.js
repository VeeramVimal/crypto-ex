
import { AiOutlineMinus } from 'react-icons/ai';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineInstagram, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import Banner from "../assets/images/banner.png";
import Banner2 from "../assets/images/banner2.png";
import Crew from "../assets/images/crew.png";
import Roadmap from "../assets/images/roadmap.png";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import React, {useState, useEffect } from "react";
import "../assets/styles/ido-style.css";
import $ from 'jquery';
import Config from '../../../core/config/index';
import axios from "axios";
import moment from "moment/moment";

function Home(props) {
    const [presentData, setPersentData] = useState([]);
    useEffect(() => {
        if (window.location.pathname === "/launch-pad") {
            $("#classy-navbar-mobile").css("background-color", "transparent");
            $(".theme-mode-dropdown").hide();
        }
        axios({
            method: "GET",
            url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/showActiveIdo`
        }).then((data) => {
            const { present } = data.data.data
            setPersentData(present);
        }).catch((err) => console.log(err))
    }, []);
    return (
        <div className="Ido-App-lanchpad">
            <Navbar setTheme={props.setTheme} />
            <div className="hero-section-ido-launchpad-tabs-banner py-5 mt-5">
                <div className="container">
                    <div className="row align-items-center g-4 min-vh-100">
                        <div className="col-lg-6">
                            <AiOutlineMinus className="ido-icon-1" />
                            <h1 className="ido-text-1">World’s First FIBIT LaunchPad</h1>
                            <p className="ido-text-2 mt-4">Built Your FIBIT LaunchPad</p>
                            <p className="ido-text-3 mt-4">The secure and hassle-free way to launch your projects on the Harmony Network.The secure and hassle-free way to launch your projects on the Harmony Network.</p>
                            <button type="button" className="ido-button-1 mt-3">Apply to Launch FIBIT</button>
                        </div>
                        <div className="col-lg-6">
                            <img src={Banner} className="Ido-banner-image-1 w-60" alt="home-img-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-section-2 py-5">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                            <img src={Banner2} className="Ido-banner-image-2" alt="home-img-1" />
                        </div>
                        <div className="col-lg-6">
                            <AiOutlineMinus className="ido-icon-1" />
                            <h1 className="ido-text-1">How To Participate</h1>
                            <p className="ido-text-2 mt-4">3 EASY STEPS</p>
                            <div className="d-flex flex-row gap-3 mt-4">
                                <div className="ido-text-1">1</div>
                                <div className="">
                                    <h5 className="ido-text-4">STEP 1</h5>
                                    <span className="">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-3 mt-4">
                                <div className="ido-text-1">2</div>
                                <div className="">
                                    <h5 className="ido-text-4">STEP 1</h5>
                                    <span className="">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-3 mt-4">
                                <div className="ido-text-1">3</div>
                                <div className="">
                                    <h5 className="ido-text-4">STEP 1</h5>
                                    <span className="">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="Ido-banner-section-3 py-5">
                <div className="container-fluid ps-0">
                    {/* <img src={Hand} className="floating-hand-image-1" /> */}
                    <div className="container">
                        <div className="row align-items-center g-4">
                            <h1 className="ido-text-1">Active FIBIT'S</h1>
                            <p className="ido-text-2 mt-2 mb-0">RECENT</p>
                            <div className="row row-cols-1 row-cols-lg-3 g-4"></div>
                                {
                                    presentData && presentData.length > 0 ?
                                        <div className="row row-cols-1 row-cols-lg-3 g-4">
                                            {
                                                presentData.map((data) => {
                                                    console.log("dtas", data);
                                                    let addition = [];
                                                    let sum = 0;
                                                    // Running the for loop
                                                    for (let i = 0; i < data.CalculatedData.length; i++) {
                                                        if(data.CalculatedData[i].launchPadId == data._id) {
                                                            sum += Number(data.CalculatedData[i].amountDeducted);
                                                        }                                                    
                                                    }
                                                    
                                                    let usdtValue = data.initial_supply * data.token_price;
                                                    let percent = sum / usdtValue * 100;
                                                    console.log("percent", percent);
                                                    let showDate;
                                                    let image = !data.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU" : data.image;
                                                    if(moment(data.token_listing_to).diff(moment(new Date), "days") == 0) {
                                                        if(moment(data.token_listing_to).diff(moment(new Date), "hours") == 0) {
                                                            if(moment(data.token_listing_to).diff(moment(new Date), "minutes") >= 0 ) {
                                                                showDate = `${moment(data.token_listing_to).diff(moment(new Date), "minutes")} MINUTES LEFT`;
                                                            }
                                                        } else {
                                                            showDate = `${moment(data.token_listing_to).diff(moment(new Date), "hours")} HOURS LEFT`;
                                                        }
                                                    } else {
                                                        showDate = `${moment(data.token_listing_to).diff(moment(new Date), "days")} DAYS LEFT`;
                                                    }  
                                                    return (
                                                        <div className="col">
                                                            <div className="card border-0">
                                                                <div className="card-body py-4">
                                                                    <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                        <div className="steps-section-image"><img src={image} className="ido-image-1" alt="logo" /></div>
                                                                            <div className="">
                                                                                <p className="ido-text-5 mb-0">{data.projectName}</p>
                                                                                <p className="ido-text-6 mb-1">Price USD : {data.token_price} {data.token_symbol}</p>
                                                                            </div>
                                                                    </div>
                                                                    <div className="d-flex flex-row">
                                                                        <p className="ido-text-6 mb-1">{data.projectInfo.slice(0,100)}....</p>
                                                                    </div>
                                                                    <div className="d-flex flex-row align-items-center mt-2">
                                                                        <div className="active-ido-section-2">
                                                                            <span className=" fs-14">{showDate}</span>
                                                                        </div>
                                                                    </div>
                        
                                                                    <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                                        <div className="">
                                                                            <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                            <p className="ido-text-6 mb-1">Total Tokens : </p>
                                                                            <p className="ido-text-6 mb-1">Access  : </p>
                                                                        </div>
                                                                        <div className="ms-auto text-end">
                                                                            <p className="ido-text-6 mb-1">{`1 ${data.token_symbol} = ${data.token_price} USDT`}</p>
                                                                            <p className="ido-text-6 mb-1">{`${data.initial_supply} ${data.token_symbol}`}</p>
                                                                            <p className="ido-text-6 mb-1">{`${data.access_type_level == 1 ? 'Tier - 2 Levels' : data.access_type_level == 2 ? 'Both Levels' : 'Tier - 1 Level'}`}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="progress mt-4">
                                                                        <div className="progress-bar-ido" role="progressbar" aria-label="Basic example" style={{ width: `${percent}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="d-flex flex-row gap-3 mt-2 mb-3">
                                                                        <div className="">
                                                                            <p className="ido-text-7 mb-1">{parseFloat(percent).toFixed(2)} % </p>
                                                                        </div>
                                                                        <div className="ms-auto text-end">
                                                                            <p className="ido-text-7 mb-1">{sum} / {usdtValue} USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    
                                                    )
                                                })
                                            }
                                        </div>
                                    :
                                        <p className="mt-5 mb-0 text-center">NO ACTIVE IDO'S</p>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner-section-4 py-5">
                <div className="container">
                    {/* <img src={thee} className="floating-hand-image-4" alt="skel" /> */}
                    <div className="row align-items-center g-4">
                        <h1 className="ido-text-1">Roadmap</h1>
                        <div className="row ">
                            <div className="col">
                                <img src={Roadmap} alt="roadmap" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className="banner-section-5 py-5">
                <div className="container">
                        <h1 className="ido-text-1">Coinomics</h1>
                        <div className="row align-items-center g-4 justify-content-around">
                            <div className="col-lg-5">
                                <img src={coinomics1} alt="coinomics" />
                            </div>
                            <div className="col-lg-5">
                                <img src={coinomics2} alt="coinomics" />
                            </div>
                        </div>
                </div>
            </div> */}

            <div className="banner-section-6 py-5">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="row align-items-center g-4">
                            <div className="col-lg-6">
                                <AiOutlineMinus className="ido-icon-1" />
                                <h1 className="ido-text-1">Meet The Crew</h1>
                                <p className="ido-text-2 mt-4">TEAM MEMBERS</p>
                                <div className="row row-cols-1 row-cols-lg-2 g-4 mt-3">
                                    <div className="col">
                                        <div className="card h-100 border-0">
                                            <div className="card-body text-center">
                                                <img className="team-image-1" src={"https://en.wiki.elvenar.com/images/7/78/AW5.png"} alt="character" />
                                                <h5 className="team-text-1 mt-4">June</h5>
                                                <h5 className="team-text-2 mt-2">Software Developer</h5>
                                                <p className="mb-1 d-flex justify-content-center mt-4">
                                                    <AiOutlineTwitter className="team-text-3" />
                                                    <FaDiscord className="team-text-3" />
                                                    <AiOutlineInstagram className="team-text-3" />
                                                    <AiFillFacebook className="team-text-3" />
                                                    <FaTelegramPlane className="team-text-3" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0">
                                            <div className="card-body text-center">
                                                <img className="team-image-1" src={"https://en.wiki.elvenar.com/images/7/78/AW5.png"} alt="character" />
                                                <h5 className="team-text-1 mt-4">June</h5>
                                                <h5 className="team-text-2 mt-2">Software Developer</h5>
                                                <p className="mb-1 d-flex justify-content-center mt-4">
                                                    <AiOutlineTwitter className="team-text-3" />
                                                    <FaDiscord className="team-text-3" />
                                                    <AiOutlineInstagram className="team-text-3" />
                                                    <AiFillFacebook className="team-text-3" />
                                                    <FaTelegramPlane className="team-text-3" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0">
                                            <div className="card-body text-center">
                                                <img className="team-image-1" src={"https://en.wiki.elvenar.com/images/7/78/AW5.png"} alt="character" />
                                                <h5 className="team-text-1 mt-4">June</h5>
                                                <h5 className="team-text-2 mt-2">Software Developer</h5>
                                                <p className="mb-1 d-flex justify-content-center mt-4">
                                                    <AiOutlineTwitter className="team-text-3" />
                                                    <FaDiscord className="team-text-3" />
                                                    <AiOutlineInstagram className="team-text-3" />
                                                    <AiFillFacebook className="team-text-3" />
                                                    <FaTelegramPlane className="team-text-3" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0">
                                            <div className="card-body text-center">
                                                <img className="team-image-1" src={"https://en.wiki.elvenar.com/images/7/78/AW5.png"} alt="character" />
                                                <h5 className="team-text-1 mt-4">June</h5>
                                                <h5 className="team-text-2 mt-2">Software Developer</h5>
                                                <p className="mb-1 d-flex justify-content-center mt-4">
                                                    <AiOutlineTwitter className="team-text-3" />
                                                    <FaDiscord className="team-text-3" />
                                                    <AiOutlineInstagram className="team-text-3" />
                                                    <AiFillFacebook className="team-text-3" />
                                                    <FaTelegramPlane className="team-text-3" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <img src={Crew} className="" alt="home-img-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
