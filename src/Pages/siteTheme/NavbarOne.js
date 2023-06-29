import React, { useEffect, useState } from "react";
import $ from "jquery";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
    BrowserRouter as Router,
    Link,
    useNavigate
} from "react-router-dom";
import { BsBank2, BsArrowRight, BsShield, BsCurrencyExchange, BsCoin, BsCurrencyDollar, BsCodeSquare } from 'react-icons/bs';
import { AiFillWallet, AiFillApi, AiFillStop } from 'react-icons/ai';
import { ImArrowRight2 } from 'react-icons/im';
import { BsFillEnvelopeCheckFill, BsFillEnvelopeExclamationFill } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { BiLogOutCircle } from 'react-icons/bi';
import { useContextData } from '../../core/context/index';
import { getCookie, deleteCookie } from '../../core/helper/cookie';
import { FaUserAlt } from 'react-icons/fa';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { BsBellFill } from 'react-icons/bs';
import jwt_decode from 'jwt-decode';
import lightnew from "../../assets/images/mode-images/light-new.svg";
import Darknew from "../../assets/images/mode-images/Dark-new.svg";
import Config from "../../core/config/";
import { makeRequest } from "../../core/services/v1/request";
import socketIOClient from "socket.io-client";
import { Badge } from "react-bootstrap";
import moment from "moment/moment";


export default function NavbarOne(props) {
    const navigate = useNavigate();
    const { siteSettings, myProfile, setUserProfile } = useContextData();
    const [socketConnection, setSocketConnection] = useState(null);
    const [currNotification, setCurrNotification] = useState([]);
    const [userLogin, setUserLogin] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [unread, setUnread] = useState(0);
    const [unreadData, setUnreadData] = useState([]);
    const [ids, setIds] = useState([]);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        if (myProfile && myProfile._id) {
            setUserId(myProfile._id);
            if (Config.NOTIFICATION_STATUS == "Enable") {
                fetchNotifications();
            } else {
                loginChk();
            }
        }
    }, [myProfile]);

    const modesetter = async (event) => {
        const mode = event.target.value;
        props.setTheme(mode);
        localStorage.setItem('mode', mode);
    }

    const loginChk = async (event) => {
        const token = getCookie("userToken");
        const decodedToken = token ? jwt_decode(token, { header: true }) : {};
        if (decodedToken.typ === 'JWT') {
            setUserLogin(true);
        }
    };
    const fetchNotifications = async () => {
        try {
            loginChk();
            let socket = socketIOClient(Config.SOCKET_URL, { transports: ['websocket'] });
            var socketConnection = socket;
            var storeIds = [];
            const params = {
                url: `${Config.V1_API_URL}notification/getAllNotification`,
                method: 'POST',
                body: { userId: userId }
            }
            const { status, data, error } = await makeRequest(params);
            if (status == true) {

                const example = data;
                setCurrNotification(example);
                let filterUnread = 0;
                if (data.length > 0) {
                    filterUnread = data.filter((noti) => (
                        noti.status == 0 && noti.userId == userId || noti.status == 0));
                    if (filterUnread?.length) {
                        setUnread(filterUnread.length);
                        setUnreadData(filterUnread);
                    }

                    filterUnread.map((send) => {
                        if (send.notificationType) {
                            storeIds.push(send._id);
                        }
                    })
                    setIds(storeIds);
                } else {
                    filterUnread = 0;
                    setUnread(filterUnread);
                }
            } else {
                console.log("Some error occur");
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        loginChk();
        window.scrollTo(0, 0);
        if (Config.NOTIFICATION_STATUS == "Enable") {
            let socket = socketIOClient(Config.SOCKET_URL, {
                transports: ["websocket"],
            });
            let socketUnsubscribe;

            if (socket) {
                socket.on("notification", (data) => {
                    console.log('socket---------',data);
                    fetchNotifications();
                });

                socket.on("connect_error", (err) => {
                    console.log("socket connect_error", err);
                });
                socket.on("disconnect", function () {
                    console.log("socket disconnected");
                });
            }
            return () => {
                if (socketUnsubscribe) {
                    socketUnsubscribe.disconnect();
                }
            }
        }
    }, [myProfile]);

    const markAsRead = async (content) => {
        if (content == "same") {
            let notifyId = [...new Set(ids)];
            let payLoad = {
                notifyId,
                userId
            }

            let params = {
                url: `${Config.V1_API_URL}notification/readNotification`,
                method: "POST",
                data: payLoad
            }
            setisLoading(true);
            const response = await makeRequest(params);
            console.log(response)
            if (response) {
                fetchNotifications();
            }
            setisLoading(false);
        } else if (content == "next") {
            window.location.href = "/notification"
        } else {

        }
    };
    return (
        <Navbar id='classy-navbar-mobile' className="fixed-top" key="lg" expand="lg">
            <Container fluid className="col-lg-12 px-4">
                <Link className="navbar-brand" to="/">
                    {(siteSettings && siteSettings.siteLogo) ? <img src={siteSettings.siteLogo} alt="logo" id="navbar-img" /> :
                        <img src={"https://res.cloudinary.com/dweqs7aoz/image/upload/v1669628230/Images/wxmoitm42j0zr12ur9ur.png"} alt="logo" id="navbar-img" />}
                </Link>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"

                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            <Link className="navbar-brand" to="/">
                                {(siteSettings && siteSettings.siteLogo) ?
                                    <img src={siteSettings.siteLogo} alt="logo" id="navbar-img" />
                                    :
                                    <img src={"https://res.cloudinary.com/dweqs7aoz/image/upload/v1669628230/Images/wxmoitm42j0zr12ur9ur.png"} alt="logo" id="navbar-img" />
                                }
                            </Link>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className="navbar-nav me-auto align-items-center text-lg-center">
                            <li className="nav-item dropdown ps-3" style={{ display: "none" }}>
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Deposit
                                </span>
                                <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                    <div className="row">
                                        <div className="col">
                                            <li><a className="dropdown-item dropdown-item-hover" href="/deposit">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Deposit</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Bank Deposit</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li className="nav-item ps-3">
                                <a href="javascript:void(0);" onClick={() => navigate("/markets")} rel="noopener noreferrer" alt="support" className="nav-link">Markets</a>
                            </li>
                            <li className="nav-item dropdown ps-3">
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Trade
                                </span>
                                <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                    <div className="row">
                                        <div className="col">
                                            <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/spot/BTC_USDT")}>
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsCurrencyExchange className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Spot</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Spot exchange</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            {Config.DERIVATIVES_STATUS == "Enable" ?
                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/futures/BTC_USDT")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <BsCoin className='top-nav-dropdown-item-icons-1' />
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>USD-M Futures</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Perpetual Contracts settled in USDT</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a></li> : ""}
                                            <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/trade/all-payments")}>
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>P2P</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Peer-To-Peer Exchange</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            {/* nav bar copy-trade */}
                            {Config.COPY_TRADING_STATUS == "Enable" && (
                                <li className="nav-item dropdown ps-3">
                                    <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Copy Trade
                                    </span>
                                    <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                        <div className="row">
                                            <div className="col">

                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/create-leader")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Create Leader</p>
                                                            <p className='top-nav-dropdown-item-text-2'>create lead trader</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a></li>
                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/copy-trade")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <BsCodeSquare className='top-nav-dropdown-item-icons-1' />
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Copy Trade</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Copy Trade</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a></li>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            )}

                            {Config.NFT_STATUS == "Enable" ?
                                <li className="nav-item ps-3">
                                    <a href={Config.nftLink} target={"_blank"} rel="noopener noreferrer" alt="nft" className="nav-link">NFT</a>
                                </li> : ""}
                            {Config.STAKING_STATUS == "Enable" ?
                                <li className="nav-item ps-3">
                                    <a href={Config.stakingLink} target={"_blank"} rel="noopener noreferrer" alt="staking" className="nav-link">Staking</a>
                                </li> : ""}
                            {Config.COMPETITION_STATUS == "Enable" ?
                                <li className="nav-item dropdown ps-3">
                                    <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Trading Competition
                                    </span>
                                    <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                        <div className="row">
                                            <div className="col">
                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/trading-competition")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <AiFillApi className='top-nav-dropdown-item-icons-1' />
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Live</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Tradingcompetition-live</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a>
                                                </li>
                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/trading-competition-completion")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <AiFillStop className='top-nav-dropdown-item-icons-1' />
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Completed</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Tradingcompetition-completed</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a></li>

                                            </div>
                                        </div>
                                    </ul>
                                </li> : ""}

                            {Config.CRYPTO_LOAN_STATUS == "Enable" ?
                                <li className="nav-item dropdown ps-3">
                                    <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Finance
                                    </span>
                                    <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                        <div className="row">
                                            <div className="col">
                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/loan")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <BsCoin className='top-nav-dropdown-item-icons-1' />
                                                            {/* <img className='mode-image-dropdown' src={CryptoLoan} alt="modes" /> */}
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Crypto Loans</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Get an instant loan secured by crypto assets</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a></li>
                                                <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={() => navigate("/loan/history")}>
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <BsCoin className='top-nav-dropdown-item-icons-1' />
                                                            {/* <img className='mode-image-dropdown' src={CryptoLoan} alt="modes" /> */}
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Loan History</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Get an instant loan secured by crypto assets</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a></li>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                : ""}
                            {Config.LAUNCHPAD_STATUS == "Enable" ? (
                                <li className="nav-item ps-3">
                                    <a href="javascript:void(0);" onClick={() => { navigate("/launch-pad") }} rel="noopener noreferrer" alt="nft" className="nav-link">Launchpad</a>
                                </li>
                            ) : ""}

                            <li className="nav-item ps-3">
                                <a href="javascript:void(0);" onClick={() => { navigate("/faq") }} rel="noopener noreferrer" alt="nft" className="nav-link">FAQs</a>
                            </li>
                            <li className="nav-item dropdown ps-3 theme-mode-dropdown">
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Theme
                                </span>
                                <ul className="dropdown-menu navbar-top-modes-dropdown" aria-labelledby="dappdrop">
                                    <div className='row themes-dropdown-top-section pb-2'>
                                        <div className='col'>
                                            <span className='themes-dropdown-text-1'>Themes</span>
                                        </div>
                                    </div>
                                    <div className="row switch-modes-section" onChange={modesetter}>
                                        <div className="col">
                                            <div className='d-flex align-items-center'>
                                                <img className='mode-image-dropdown-1' src={lightnew} alt="modes" />
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="colortheme" id="flexRadioDefault2" value='light-new' checked={props.theme == "light-new" ? "checked" : ""} />
                                                    <label className="form-check-label" for="flexRadioDefault2">
                                                        Light
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='d-flex align-items-center'>
                                                <img className='mode-image-dropdown-2' src={Darknew} alt="modes" />
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="colortheme" id="flexRadioDefault4" value='dark-new'
                                                        checked={props.theme == "dark-new" ? "checked" : ""}
                                                    />
                                                    <label className="form-check-label" for="flexRadioDefault4">
                                                        Dark
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto align-items-center text-lg-center">
                            {userLogin === false ?
                                <>
                                    <li className="nav-item ps-3">
                                        <a href="#" onClick={() => navigate('/login')} rel="noopener noreferrer" alt="support" className="nav-link">Log In</a>
                                    </li>
                                    <li className="nav-item ps-3 text-center">
                                        <a href="#" onClick={() => navigate('/register')} rel="noopener noreferrer" alt="support" className="nav-link nav-register-button">Register</a>
                                    </li>
                                </>
                                :
                                <>
                                    {Config.NOTIFICATION_STATUS == "Enable" ?
                                        (
                                            <li className="nav-item ps-3 bell-icon-dropdown-css">
                                                <div class="btn-group">
                                                    <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                        <BsBellFill className="fc-g f-25" /> {unread ? <Badge>{unread}</Badge> : ''}
                                                    </button>
                                                    <ul class="dropdown-menu ">
                                                        <li>
                                                            <button class="dropdown-item mb-4" type="button">
                                                                <div className="d-flex flex-row justify-content-between bell-icon-notification-bg p-3">
                                                                    <div className="">
                                                                        <p className="mb-0 text-dark">{unread} <span className="text-black-grey f-13">Pending Notifications</span></p>
                                                                    </div>
                                                                    <div>
                                                                        <p onClick={() => markAsRead("same")} className="mb-0 fc-g">Clear All</p>
                                                                    </div>
                                                                    <div>
                                                                        <p onClick={() => markAsRead("next")} className="mb-0 text-dark">View All <span><BsArrowRightShort /></span></p>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </li>
                                                        {
                                                            unreadData.map((data, n) => {
                                                                const truncate = data.message.substring(0, 40)
                                                                return (
                                                                    <li>
                                                                        <button class="dropdown-item  mb-4" type="button">
                                                                            <div className="d-flex flex-row ">
                                                                                <div>
                                                                                    <BsFillEnvelopeCheckFill className="fc-g  f-20 ms-2 me-2" />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="mb-0">{data.title}</p>
                                                                                    <p className="mb-0 text-grey f-15">{truncate}.... {moment(new Date(data.createdDate), "YYYYMMDD").fromNow()}</p>
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                        :
                                        ""}
                                    <li className="nav-item ps-3 d-lg-none d-blocktop-banner-third-section ">
                                        <a href="" onClick={() => navigate("/my/wallet")} rel="noopener noreferrer" alt="support" className="nav-link">Wallet</a>
                                    </li>
                                    <li className="nav-item ps-3">
                                        <a href="javascript:void(0);" className="nav-link remove">
                                            <div className="dropdown home-drop">
                                                <button className="dropdown-toggle btn-next-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {myProfile && <>{myProfile.email ? myProfile.email : myProfile.phoneno}{" "}</>}
                                                    <FaUserAlt />
                                                </button>
                                                <ul className="dropdown-menu drop" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" href="" onClick={() => navigate('/my/profile')}><ImProfile /> Profile</a></li>
                                                    <li><a className="dropdown-item" href="" onClick={() => navigate('/my/wallet')}><AiFillWallet /> Wallet</a></li>
                                                    <li><a className="dropdown-item" href="" onClick={() => navigate('/my/identification')}><BsShield /> Identification</a></li>
                                                    <li><a className="dropdown-item" href="" onClick={() => navigate('/my/referral')}><MdOutlineConnectWithoutContact /> Referral Program</a></li>
                                                    <li><a className="dropdown-item" href="" onClick={() => navigate('/my/wallet/history')}><HiClipboardDocumentList /> Transactions</a></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><a className="dropdown-item logout" href="javascript:void(0);"
                                                        onClick={() => {
                                                            deleteCookie('userToken');
                                                            setUserProfile();
                                                            navigate('/login');
                                                        }}
                                                    ><BiLogOutCircle /> Logout</a></li>
                                                </ul>
                                            </div>
                                        </a>
                                    </li>

                                </>}

                        </ul>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}