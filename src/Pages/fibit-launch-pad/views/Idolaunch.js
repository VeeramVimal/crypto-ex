import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import {
    AiOutlineTeam,
    AiOutlineInstagram,
    AiOutlineTwitter,
    AiFillFacebook,
    AiOutlineSearch
} from 'react-icons/ai';
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
// import "../../../assets/ido-style.css";
import "../assets/styles/ido-style.css";
import Config from '../../../core/config/index';

function IdoLaunch() {
    const navigate = useNavigate();
    const currentDate = moment(new Date);
    const maxProjectInfo = 80; //** get the project information that is shorter than desired length */
    const [userData, setUserData] = useState([]);
    const [pastData, setPastData] = useState([]);
    const [presentData, setPersentData] = useState([]);
    const [futureData, setFutureData] = useState([]);
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        axios({
            method: "GET",
            url: `${Config.V1_API_URL}ido-form`
        }).then((data) => {
            const { past, present, future } = data.data.data
            setUserData(data.data.data);
            setPastData(past);
            setPersentData(present);
            setFutureData(future);
        }).catch((err) => console.log(err))
    }, [userData.length]);

    const handleChangeSearch = (event) => {

    };

    const handleClick = (userId, status) => {
        if (userId) axios({
            method: "GET",
            url: `${Config.V1_API_URL}ido-form/${userId}`
        }).then((res) => {
            const { data } = res;
            if (data) navigate("/active-ido", { state: { userDetails: data.data, status } })
        }).catch((err) => console.log(err))
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
                                            onChange={handleChangeSearch}
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
                                                        <div className="card border-0" onClick={() => handleClick(past._id, 'past')}>
                                                            <div className="card-body py-4">
                                                                <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                    <div className="steps-section-image"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU"} className="ido-image-1" alt="logo" /></div>
                                                                    <div className="">
                                                                        <p className="ido-text-5 mb-0">{past.projectName}</p>
                                                                        <p className="ido-text-6 mb-1">Price USD : 200 USD</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row">
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
                                                                        <p className="ido-text-6 mb-1">Hard Cap : </p>
                                                                        <p className="ido-text-6 mb-1">Access  : </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-6 mb-1">{`1 TNK = ${past.token_price} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${past.hard_cap_value} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">Levels</p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="progress mt-4">
                                                                    <div
                                                                        className="progress-bar"
                                                                        role="progressbar"
                                                                        aria-label="Basic example"
                                                                        style={{ width: "25%" }}
                                                                        aria-valuenow="25"
                                                                        aria-valuemin="0"
                                                                        aria-valuemax="100"
                                                                    ></div>
                                                                </div>
                                                                <div className="d-flex flex-row gap-3 mt-2 mb-3">
                                                                    <div className="">
                                                                        <p className="ido-text-7 mb-1">0.00 % </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-7 mb-1">0 / 100,000 USDT</p>
                                                                    </div>
                                                                </div> */}
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
                                                return (
                                                    <div className="col" onClick={() => handleClick(present._id, 'present')}>
                                                        <div className="card border-0">
                                                            <div className="card-body py-4">
                                                                <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                    <div className="steps-section-image"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU"} className="ido-image-1" alt="logo" /></div>
                                                                    <div className="">
                                                                        <p className="ido-text-5 mb-0">{present.projectName}</p>
                                                                        <p className="ido-text-6 mb-1">Price USD : 200 USD</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row">
                                                                    <p className="ido-text-6 mb-1">
                                                                        {/* {present.projectInfo} */}
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
                                                                                `${moment(present.end_date).diff(moment(new Date), "days")} DAYS LEFT`
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                                    <div className="">
                                                                        <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                        <p className="ido-text-6 mb-1">Hard Cap : </p>
                                                                        <p className="ido-text-6 mb-1">Access  : </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-6 mb-1">{`1 TNK = ${present.token_price} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${present.hard_cap_value} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">Levels</p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="progress mt-4">
                                                                    <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                                <div className="d-flex flex-row gap-3 mt-2 mb-3">
                                                                    <div className="">
                                                                        <p className="ido-text-7 mb-1">0.00 % </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-7 mb-1">0 / 100,000 USDT</p>
                                                                    </div>
                                                                </div> */}
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
                                                return (
                                                    <div className="col" onClick={() => handleClick(future._id, 'future')}>
                                                        <div className="card border-0">
                                                            <div className="card-body py-4">
                                                                <div className="d-flex flex-row gap-3 px-3 mb-3">
                                                                    <div className="steps-section-image"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU"} className="ido-image-1" alt="logo" /></div>
                                                                    <div className="">
                                                                        <p className="ido-text-5 mb-0">{future.projectName}</p>
                                                                        <p className="ido-text-6 mb-1">Price USD : 200 USD</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row">
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
                                                                                `${moment(future.start_date).diff(moment(new Date), 'days')} DAYS TO GO`
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row gap-3 mt-3 active-ido-section-1">
                                                                    <div className="">
                                                                        <p className="ido-text-6 mb-1">Swap rate : </p>
                                                                        <p className="ido-text-6 mb-1">Hard Cap : </p>
                                                                        <p className="ido-text-6 mb-1">Access  : </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-6 mb-1">{`1 TNK = ${future.token_price} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">{`${future.hard_cap_value} USDT`}</p>
                                                                        <p className="ido-text-6 mb-1">Levels</p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="progress mt-4">
                                                                    <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                                <div className="d-flex flex-row gap-3 mt-2 mb-3">
                                                                    <div className="">
                                                                        <p className="ido-text-7 mb-1">0.00 % </p>
                                                                    </div>
                                                                    <div className="ms-auto text-end">
                                                                        <p className="ido-text-7 mb-1">0 / 100,000 USDT</p>
                                                                    </div>
                                                                </div> */}
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
