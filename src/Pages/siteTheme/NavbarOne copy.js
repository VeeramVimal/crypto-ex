import React, { useEffect, useState } from "react";
import Logo from '../../assets/images/Logo.png';
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
import { BsBank2, BsArrowRight, BsShield, BsCurrencyExchange, BsCoin, BsCurrencyDollar } from 'react-icons/bs';
import { AiFillWallet } from 'react-icons/ai';
import { ImArrowRight2 } from 'react-icons/im';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { BiLogOutCircle } from 'react-icons/bi';
import { useContextData } from '../../core/context/index';
import { getCookie, deleteCookie } from '../../core/helper/cookie';
import { FaUserAlt } from 'react-icons/fa';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import jwt_decode from 'jwt-decode';
import Bluewhale from "../../assets/images/mode-images/Blue-whale.svg";
import GraniteGray from "../../assets/images/mode-images/Granite-Gray.svg";
import lightnew from "../../assets/images/mode-images/light-new.svg";
import Darknew from "../../assets/images/mode-images/Dark-new.svg";
import Blackjungle from "../../assets/images/mode-images/Black-jungle.svg";
import MaastrichtBlue from "../../assets/images/mode-images/Maastricht-Blue.svg";
import Config from "../../core/config";

export default function NavbarOne(props) {

    const navigate = useNavigate();

    const { siteSettings, myProfile, setUserProfile } = useContextData();

    const [userLogin, setUserLogin] = useState(false);

    const handleToggle = () => {
    }

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
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        loginChk();
    }, []);

    return (
        <Navbar id='classy-navbar-mobile' className="fixed-top" key="lg" expand="lg">
            <Container fluid className="col-lg-12 px-4">
                {/* <a className="navbar-brand" href="javascript:void(0);"><img src={Logo} alt="logo" id="navbar-img" /></a> */}
                <Link className="navbar-brand" to="/">
                    {siteSettings && siteSettings.siteLogo && <img src={siteSettings.siteLogo} alt="logo" id="navbar-img" />}
                </Link>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            <Link className="navbar-brand" to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className="navbar-nav me-auto text-lg-center">
                            <li className="nav-item dropdown ps-3" style={{display: "none"}}>
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
                                            {/* <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Credit/Debit Card</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li> */}
                                            {/* <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Cash Balance</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li> */}
                                            {/* <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1' onClick={()=>navigate("/trade/all-payments")}>P2P Trading</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li> */}
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            {/* <li className="nav-item ps-3">
                                <a href="javascript:void(0);" onClick={() => navigate("/spot/BTC_USDT")} rel="noopener noreferrer" alt="support" className="nav-link">Exchange</a>
                            </li> */}
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
                                            {/* <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Binance Convert</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li> */}
                                            <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={()=>navigate("/spot/BTC_USDT")}>
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
                                            <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={()=>navigate("/futures/BTC_USDT")}>
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
                                            <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={()=>navigate("/trade/all-payments")}>
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
                                            <li><a className="dropdown-item dropdown-item-hover" href="javascript:void(0);" onClick={()=>navigate("/trading-competition")}>
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsCoin className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Competition</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Trading Competition</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            {/* <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Binance OTC</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li> */}
                                            {/* <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Copy Trade</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li> */}
                                        </div>
                                    </div>
                                </ul>
                            </li>

                            {/* <li className="nav-item dropdown ps-3">
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Earn
                                </span>
                                <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                    <div className="row">
                                        <div className="col">
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Binance Earn</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Simple Earn</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Margin</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Launchpad</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Dual Investment</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Copy Trade</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li> */}
                            {/* <li className="nav-item dropdown ps-3">
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Derivatives
                                </span>
                                <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                    <div className="row">
                                        <div className="col">
                                            <li>
                                                <a className="dropdown-item dropdown-item-hover" href="/">
                                                    <div className="d-flex flex-row align-items-center ">
                                                        <div className="">
                                                            <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                        </div>
                                                        <div className="">
                                                            <p className='top-nav-dropdown-item-text-1'>Leveraged Token</p>
                                                            <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                        </div>
                                                        <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                    </div>
                                                </a>
                                            </li>
                                        <li><a className="dropdown-item dropdown-item-hover" href="/">
                                            <div className="d-flex flex-row align-items-center ">
                                            <div className="">
                                                <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                            </div>
                                            <div className="">
                                                <p className='top-nav-dropdown-item-text-1'>VIP Portal</p>
                                                <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                            </div>
                                            <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                            </div>
                                        </a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li> */}
                            {/* <li className="nav-item dropdown ps-3">
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Finance
                                </span>
                                <ul className="dropdown-menu navbar-top-hover-dropdown" aria-labelledby="dappdrop">
                                    <div className="row">
                                        <div className="col">
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>Leveraged Token</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                            <li><a className="dropdown-item dropdown-item-hover" href="/">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1'>VIP Portal</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li> */}
                            <li className="nav-item ps-3">
                                <a href="https://fibitnft.com/" target={"_blank"} rel="noopener noreferrer" alt="nft" className="nav-link">NFT</a>
                            </li>
                            {Config.STAKING_STATUS == "Enable" ?
                            <li className="nav-item ps-3">
                                <a href="https://staking.fibitpro.com/" target={"_blank"} rel="noopener noreferrer" alt="staking" className="nav-link">Staking</a>
                            </li>:""}
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
                                            {/* <div className='d-flex align-items-center mt-5'>
                                                <img className='mode-image-dropdown-3' src={Bluewhale} alt="modes" />
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="colortheme" id="flexRadioDefault1" value='blue-whale' />
                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                    Blue Whale
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center mt-5'>
                                                <img className='mode-image-dropdown-5' src={GraniteGray} alt="modes" />
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="colortheme" id="flexRadioDefault3" value='brown' />
                                                    <label className="form-check-label" for="flexRadioDefault3">
                                                    Brown
                                                    </label>
                                                </div>
                                            </div> */}
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
                                            {/* <div className='d-flex align-items-center mt-5'>
                                                <img className='mode-image-dropdown-4' src={MaastrichtBlue} alt="modes" />
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="colortheme" id="flexRadioDefault5" value='blue-dark' />
                                                    <label className="form-check-label" for="flexRadioDefault5">
                                                        Blue Dark
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center mt-5'>
                                                <img className='mode-image-dropdown-6' src={Blackjungle} alt="modes" />
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="colortheme" id="flexRadioDefault6" value='dark-black' />
                                                    <label className="form-check-label" for="flexRadioDefault6">
                                                        Dark Black
                                                    </label>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto text-lg-center">
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
                            {/* <li className="nav-item dropdown ps-3">
                                <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    History
                                </span>
                                <ul className="dropdown-menu navbar-top-hover-dropdown transaction-history-dropdown" aria-labelledby="dappdrop">
                                    <div className="row">
                                        <div className="col">
                                            <li><a className="dropdown-item dropdown-item-hover" href="#">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <div className="">
                                                        <BsBank2 className='top-nav-dropdown-item-icons-1' />
                                                    </div>
                                                    <div className="">
                                                        <p className='top-nav-dropdown-item-text-1' onClick={() => navigate('/my/wallet/history')}>Transaction history</p>
                                                        <p className='top-nav-dropdown-item-text-2'>Deposit card</p>
                                                    </div>
                                                    <div className="ms-auto"><ImArrowRight2 className='top-nav-dropdown-item-icons-2' /></div>
                                                </div>
                                            </a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li> */}
                            {/* <li className="nav-item ps-3">
                                <a href="javascript:void(0);" onClick={() => navigate('/my/dashboard')} rel="noopener noreferrer" alt="dashboard" className="nav-link">Dashboard</a>
                            </li> */}
                            {/* <li className="nav-item ps-3">
                                <a href="#" onClick={() => {
                                    deleteCookie('userToken');
                                    navigate('/login');
                                }} rel="noopener noreferrer" alt="dashboard" className="nav-link">Logout</a>
                            </li> */}
                            <li className="nav-item ps-3 d-lg-none d-blocktop-banner-third-section ">
                                <a href="javascript:void(0);" onClick={() => navigate("/my/wallet")} rel="noopener noreferrer" alt="support" className="nav-link">Wallet</a>
                            </li>
                            <li className="nav-item ps-3">
                                <a href="javascript:void(0);" className="nav-link remove">
                                    <div className="dropdown home-drop">
                                        <button className="dropdown-toggle btn-next-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {myProfile && <>{myProfile.email ? myProfile.email : myProfile.phoneno}{" "}</>}
                                            <FaUserAlt />
                                        </button>
                                        <ul className="dropdown-menu drop" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="javascript:void(0);" onClick={() => navigate('/my/profile')}><ImProfile/> Profile</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);" onClick={() => navigate('/my/wallet')}><AiFillWallet/> Wallet</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);" onClick={() => navigate('/my/identification')}><BsShield/> Identification</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);" onClick={() => navigate('/my/referral')}><MdOutlineConnectWithoutContact/> Referral Program</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);" onClick={() => navigate('/my/wallet/history')}><HiClipboardDocumentList/> Transactions</a></li>
                                            <li><hr className="dropdown-divider"/></li>
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
