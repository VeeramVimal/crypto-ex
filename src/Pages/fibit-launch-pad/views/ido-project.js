import {useNavigate} from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
// import "../../../assets/ido-style.css";
import { useContextData } from "../../../core/context";
import "../assets/styles/ido-style.css";
import Config from '../../../core/config/index';
import $ from 'jquery'

function IdoProject() {
    const navigate = useNavigate();
    const { myProfile } = useContextData();
    const currentDate = moment(new Date);
    const maxProjectInfo = 80; //** get the project information that is shorter than desired length */
    const [userData, setUserData] = useState([]);
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (window.location.pathname === "/ido-project") {
            $("#classy-navbar-mobile").css("background-color", "transparent");
            $(".theme-mode-dropdown").hide();
        }
    }, []);
    useEffect(() => {
        if(myProfile && myProfile._id) {
            axios({
                method: "GET",
                url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/project/${myProfile._id}`
            }).then((data) => {
                setUserData(data.data.data.msg);
            }).catch((err) => console.log(err))
        }
    }, [myProfile]);
    const handleClick = (userId) => {
        if (userId) axios({
            method: "GET",
            url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/launchTokenHistory/${userId}`
        }).then((res) => {
            const { data } = res;
            if (data) navigate("/ido-project-info", { state: { userDetails: data.data } })
        }).catch((err) => console.log(err))
    };
    
    return (
        <div className="Ido-App-lanchpad">
            <Navbar/>
            <div className="hero-section-ido-launchpad-tabs-banner py-5 mt-5">
                <div className="container">
                    <div className="row g-4 justify-content-around">
                        <div className="col-lg-12">
                            <div className="row row-cols-lg-3 g-4">
                                {
                                    userData && userData?.length > 0 ? (userData).map((past) => {
                                        let showDate;
                                        let image = past.image == null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU" : past.image;
                                        if(past.token_listing_to != null) {
                                            if(moment(past.token_listing_to).diff(moment(new Date), "days") == 0) {
                                                if(moment(past.token_listing_to).diff(moment(new Date), "hours") == 0) {
                                                    if(moment(past.token_listing_to).diff(moment(new Date), "minutes") >= 0 ) {
                                                        showDate = `${moment(past.token_listing_to).diff(moment(new Date), "minutes")} MINUTES LEFT`;
                                                    } else {
                                                        showDate = `END`;
                                                    }
                                                } else {
                                                    if(moment(past.token_listing_to).diff(moment(new Date), "hours") < 0) {
                                                        showDate = `END`
                                                    } else {
                                                        showDate = `${moment(past.token_listing_to).diff(moment(new Date), "hours")} HOURS LEFT`;
                                                    }
                                                }
                                            } else {
                                                if(moment(past.token_listing_to).diff(moment(new Date), "days") < 0) {
                                                    showDate = 'END';
                                                } else {
                                                    showDate = `${moment(past.token_listing_to).diff(moment(new Date), "days")} DAYS LEFT`;
                                                }
                                            }
                                        } else {
                                            showDate = `WAITING FOR ADMIN APPROVAL`
                                        }
                                        return (
                                            <div className="col" >
                                                <div className="card border-0 h-100" onClick={() => handleClick(past._id)}>
                                                    <div className="card-body py-4" style={{ cursor: 'pointer' }} >
                                                        <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                            <div className="steps-section-image"><img src={image} className="ido-image-1" alt="logo" /></div>
                                                            <div className="">
                                                                <p className="ido-text-5 mb-0">{past.projectName}</p>
                                                                <p className="ido-text-6 mb-1">Price USD : {past.token_price} USD</p>
                                                            </div>
                                                        </div>
                                                        <div className="" style={{height:"60px"}}>
                                                            <p className="ido-text-6 mb-1">
                                                                {/* {past.projectInfo} */}
                                                                {
                                                                    !showMore &&
                                                                        past.projectInfo?.length > maxProjectInfo ?
                                                                        past.projectInfo.slice(0, maxProjectInfo) + '...' :
                                                                        past.projectInfo
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mt-2">
                                                            <div className="active-ido-section-2">
                                                                <span className=" fs-14">{showDate}</span>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                            <div className="">
                                                                <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                <p className="ido-text-6 mb-1">Total Token : </p>
                                                                <p className="ido-text-6 mb-1">Access  : </p>
                                                            </div>
                                                            <div className="ms-auto text-end">
                                                                <p className="ido-text-6 mb-1">{`1 ${past.token_symbol} = ${past.token_price} USDT`}</p>
                                                                <p className="ido-text-6 mb-1">{`${past.initial_supply}  ${past.token_symbol}`}</p>
                                                                <p className="ido-text-6 mb-1">{`${past.access_type_level == 1 ? 'Tier - 2 Levels' : past.access_type_level == 2 ? 'Both Levels' : 'Tier - 1 Level'}`}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : (
                                        <div className="justify-content-center col-12 col-lg-12 text-center" style={{ marginTop: "124px" }}>
                                            <span>No Data Available</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default IdoProject