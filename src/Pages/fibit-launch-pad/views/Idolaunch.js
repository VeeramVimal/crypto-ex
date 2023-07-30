import { useNavigate } from "react-router-dom";
import { AiOutlineSearch} from 'react-icons/ai';
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import "../assets/styles/ido-style.css";
import Config from '../../../core/config/index';
import { userLoginChk } from '../../../core/helper/cookie';
import $ from 'jquery';

function IdoLaunch() {
    useEffect(() => {
        if (window.location.pathname === "/ido-lanch") {
            $("#classy-navbar-mobile").css("background-color", "transparent");
            $(".theme-mode-dropdown").hide();
        }
    }, []);
    const navigate = useNavigate();
    const currentDate = moment(new Date);
    const maxProjectInfo = 80; //** get the project information that is shorter than desired length */
    const [userData, setUserData] = useState([]);
    const [pastData, setPastData] = useState([]);
    const [presentData, setPersentData] = useState([]);
    const [futureData, setFutureData] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log("search", search);
        getLaunchPadDetails()
    }, [userData.length]);

    const getLaunchPadDetails = (event) => {
        const data = event == undefined || event.target.value == '' ? null : event.target.value;
        axios({
            method: "GET",
            url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/idoProject/${data}`
        }).then((data) => {
            const { past, present, future } = data.data.data
            setUserData(data.data.data);
            setPastData(past);
            setPersentData(present);
            setFutureData(future);
        }).catch((err) => console.log(err))
    }

    const handleChangeSearch = (event) => {
        console.log("event", event.target.value);
        setSearch(event.target.value);
    };

    const handleClick = (userId, status) => {
        console.log("userId", userId);
        if(userLoginChk() == true) {
            if (userId) axios({
                method: "GET",
                url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/singleProject/${userId}`
            }).then((res) => {
                const { data } = res;
                if (data) navigate("/active-ido", { state: { userDetails: data.data, status } })
            }).catch((err) => console.log(err))
        } else {
            navigate("/login")
        }
    };
    return (
        <div className="Ido-App-lanchpad">
            <Navbar />
            <div className="hero-section-ido-launchpad-tabs-banner py-5">
                <div className="container">
                    <div className="row g-4 justify-content-around">
                        <div className="col-lg-12">
                            <div className="d-flex flex-lg-row flex-column gap-3 mt-5">
                                <div className="">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <span
                                                className="nav-link"
                                                style={{ color: 'white' }}
                                                id="pills-finished-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-finished"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-finished"
                                                aria-selected="true">Finished</span>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <span
                                                className="nav-link active"
                                                style={{ color: 'white' }}
                                                id="pills-active-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-active"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-active"
                                                aria-selected="false">Active</span>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <span
                                                className="nav-link"
                                                style={{ color: 'white' }}
                                                id="pills-upcoming-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-upcoming"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-upcoming"
                                                aria-selected="false">Upcoming</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms-lg-auto">
                                    <div className="input-group">
                                        <span className="input-group-text border-end-0" id="basic-addon1"><AiOutlineSearch /></span>
                                        <input
                                            type="text"
                                            className="form-control ps-0"
                                            placeholder="Search..."
                                            onChange={getLaunchPadDetails}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content mt-5" id="pills-tabContent">
                                <div className="tab-pane fade" id="pills-finished" role="tabpanel" aria-labelledby="pills-finished-tab" tabindex="0">
                                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                                        {
                                            pastData && pastData?.length > 0 ? (pastData).map((past) => {
                                                return (
                                                    <div className="col" >
                                                        <div className="card border-0 h-100" onClick={() => handleClick(past._id, 'past')}>
                                                            <div className="card-body py-4">
                                                                <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                    <div className="steps-section-image"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU"} className="ido-image-1" alt="logo" /></div>
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
                                                                        <span className=" fs-14">END</span>
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                                    <div className="">
                                                                        <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                        <p className="ido-text-6 mb-1">Total tokens : </p>
                                                                        <p className="ido-text-6 mb-1">Access  : </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-6 mb-1">{`1 ${past.token_symbol} = ${past.token_price} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${past.initial_supply} ${past.token_symbol}`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${past.access_type_level == 1 ? 'Tier - 2 Levels' : past.access_type_level == 2 ? 'Both Levels' : 'Tier - 1 Level'}`}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : (
                                                <div className="col mx-3" >
                                                    No more records found
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane fade show active" id="pills-active" role="tabpanel" aria-labelledby="pills-active-tab" tabindex="0">
                                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                                        {
                                            presentData && presentData?.length > 0 ? (presentData).map((present) => {
                                                let sum = 0;
                                                // Running the for loop
                                                for (let i = 0; i < present.CalculatedData.length; i++) {
                                                    if(present.CalculatedData[i].launchPadId == present._id) {
                                                        sum += Number(present.CalculatedData[i].amountDeducted);
                                                    }                                                    
                                                }
                                                let usdtValue = present.initial_supply * present.token_price;
                                                let percent = sum / usdtValue * 100;
                                                let showDate;
                                                let image = present.image == null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU" : present.image;
                                                if(moment(present.token_listing_to).diff(moment(new Date), "days") == 0) {
                                                    if(moment(present.token_listing_to).diff(moment(new Date), "hours") == 0) {
                                                        if(moment(present.token_listing_to).diff(moment(new Date), "minutes") >= 0 ) {
                                                            showDate = `${moment(present.token_listing_to).diff(moment(new Date), "minutes")} MINUTES LEFT`;
                                                        }
                                                    } else {
                                                        showDate = `${moment(present.token_listing_to).diff(moment(new Date), "hours")} HOURS LEFT`;
                                                    }
                                                } else {
                                                    showDate = `${moment(present.token_listing_to).diff(moment(new Date), "days")} DAYS LEFT`;
                                                }                                                
                                                return (
                                                    <div className="col" onClick={() => handleClick(present._id, 'present')}>
                                                        <div className="card border-0 h-100">
                                                            <div className="card-body py-4">
                                                                <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                    <div className="steps-section-image"><img src={image} className="ido-image-1" alt="logo" /></div>
                                                                    <div className="">
                                                                        <p className="ido-text-5 mb-0">{present.projectName}</p>
                                                                        <p className="ido-text-6 mb-1">Price USD : {present.token_price} USD</p>
                                                                    </div>
                                                                </div>
                                                                <div className="" style={{height:"60px"}}>
                                                                    <p className="ido-text-6 mb-1">
                                                                        {
                                                                            !showMore &&
                                                                                present.projectInfo?.length > maxProjectInfo ?
                                                                                present.projectInfo.slice(0, maxProjectInfo) + '...' :
                                                                                present.projectInfo
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center mt-2">
                                                                    <div className="active-ido-section-2">
                                                                        <span className=" fs-14">
                                                                            {
                                                                                `${showDate}`
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                                    <div className="">
                                                                        <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                        <p className="ido-text-6 mb-1">Total Tokens : </p>
                                                                        <p className="ido-text-6 mb-1">Access  : </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-6 mb-1">{`1 ${present.token_symbol} = ${present.token_price} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${present.initial_supply} ${present.token_symbol}`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${present.access_type_level == 1 ? 'Tier - 2 Level' : present.access_type_level == 2 ? 'Both Level' : 'Tier - 1 Level'}`}</p>
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
                                            }) : (
                                                <div className="col mx-3" >
                                                    No more records found
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-upcoming" role="tabpanel" aria-labelledby="pills-upcoming-tab" tabindex="0">
                                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                                        {
                                            futureData && futureData?.length > 0 ? (futureData).map((future) => {
                                                let showDate;
                                                let image = !future.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU" : future.image;
                                                if(moment(future.token_listing_from).diff(moment(new Date), "days") == 0) {
                                                    if(moment(future.token_listing_from).diff(moment(new Date), "hours") == 0) {
                                                        if(moment(future.token_listing_from).diff(moment(new Date), "minutes") >= 0 ) {
                                                            showDate = `${moment(future.token_listing_from).diff(moment(new Date), "minutes")} MINUTES LEFT`;
                                                        }
                                                    } else {
                                                        showDate = `${moment(future.token_listing_from).diff(moment(new Date), "hours")} HOURS LEFT`;
                                                    }
                                                } else {
                                                    showDate = `${moment(future.token_listing_from).diff(moment(new Date), "days")} DAYS LEFT`;
                                                }        
                                                return (
                                                    <div className="col" onClick={() => handleClick(future._id, 'future')}>
                                                        <div className="card border-0 h-100">
                                                            <div className="card-body py-4">
                                                                <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                    <div className="steps-section-image"><img src={image} className="ido-image-1" alt="logo" /></div>
                                                                    <div className="">
                                                                        <p className="ido-text-5 mb-0">{future.projectName}</p>
                                                                        <p className="ido-text-6 mb-1">Price USD : {future.token_price} USD</p>
                                                                    </div>
                                                                </div>
                                                                <div className="" style={{height:"60px"}}>
                                                                    <p className="ido-text-6 mb-1">
                                                                        {/* {future.projectInfo} */}
                                                                        {
                                                                            !showMore &&
                                                                                future.projectInfo?.length > maxProjectInfo ?
                                                                                future.projectInfo.slice(0, maxProjectInfo) + '...' :
                                                                                future.projectInfo
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center mt-2">
                                                                    <div className="active-ido-section-2">
                                                                        <span className=" fs-14">
                                                                            {
                                                                                `${showDate}`
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                                    <div className="">
                                                                        <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                        <p className="ido-text-6 mb-1">Total tokens : </p>
                                                                        <p className="ido-text-6 mb-1">Access  : </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-6 mb-1">{`1 ${future.token_symbol} = ${future.token_price} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${future.initial_supply} ${future.token_symbol}`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${future.access_type_level == 1 ? 'Tier - 2 Level' : future.access_type_level == 2 ? 'Both Level' : 'Tier - 1 Level'}`}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : (
                                                <div className="col mx-3" >
                                                    No more records found
                                                </div>
                                            )
                                        }
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

export default IdoLaunch;
