import React, { useState, useEffect } from "react";
import { IoHome, IoBulbOutline } from 'react-icons/io5';
import { BsLightningChargeFill } from 'react-icons/bs';
import { CiMap } from 'react-icons/ci';
import { AiOutlineTeam } from 'react-icons/ai';
import logo from "../assets/images/Logo.png";
import { HashLink } from 'react-router-hash-link';
// import WalletConnection from "../../connector/wallet-connection";
import "../assets/styles/ido-style.css";
import { useNavigate } from "react-router-dom";
// import "../../../assets/ido-style.css";
function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="App Ido-Navbar">
            <nav className="navbar navbar-expand-lg bg-transparent mt-2">
                <div className="container-fluid">
                    <a className="navbar-brand ps-lg-5" href="/"><img src={logo} alt="logo" /></a>
                    <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <HashLink className="nav-link" to='/launch-pad' onClick={() => navigate('/launch-pad')}>
                                    <IoHome className="navbar-navlink-icon" />Home</HashLink>
                            </li>
                            {/* <li className="nav-item">
                                <HashLink className="nav-link" to="/active-ido" onClick={() => navigate('/active-ido')}>
                                    <IoBulbOutline className="navbar-navlink-icon" />ActiveIdo</HashLink>
                            </li> */}
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/ido-form" onClick={() => navigate('/ido-form')}>
                                    <BsLightningChargeFill className="navbar-navlink-icon" />Form</HashLink>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/ido-lanch" onClick={() => navigate('/ido-lanch')}>
                                    <CiMap className="navbar-navlink-icon" />Launch</HashLink>
                            </li>
                            {/* <li className="nav-item">
                                <HashLink className="nav-link" to="/#team" onClick={() => navigate('')}>
                                    <AiOutlineTeam className="navbar-navlink-icon" />Team</HashLink>
                            </li> */}
                            <li className="nav-item">
                                {/* <WalletConnection/> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
