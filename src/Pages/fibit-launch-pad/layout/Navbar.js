import React from "react";
import { IoHome } from 'react-icons/io5';
import { BsLightningChargeFill, BsFillProjectorFill } from 'react-icons/bs';
import { CiMap } from 'react-icons/ci';
import logo from "../assets/images/Logo.png";
import { HashLink } from 'react-router-hash-link';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../assets/styles/ido-style.css";
import { useNavigate, Link } from "react-router-dom";
import { userLoginChk } from '../../../core/helper/cookie';
import $ from "jquery"

function Navbars() {
    const navigate = useNavigate();
    $(function(){
        $(window).scroll(function() {
           if($(window).scrollTop() >= 100) {
             $('#classy-navbar-mobile').css("background-color", "rgb(17, 0, 59)");
           }
          else {
            $('#classy-navbar-mobile').css("background-color", "transparent");
          }
        });

        if (window.location.pathname === "/launch-pad") {
            $(".nav-link-fibitlaunchpad-home").addClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-form").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-lanch").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-project").removeClass("fibit-launchpad-active-link");
        }
        if (window.location.pathname === "/ido-form") {
            $(".nav-link-fibitlaunchpad-home").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-form").addClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-lanch").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-project").removeClass("fibit-launchpad-active-link");
        }
        if (window.location.pathname === "/ido-lanch") {
            $(".nav-link-fibitlaunchpad-home").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-form").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-lanch").addClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-project").removeClass("fibit-launchpad-active-link");
        }
        if (window.location.pathname === "/ido-project") {
            $(".nav-link-fibitlaunchpad-home").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-form").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-lanch").removeClass("fibit-launchpad-active-link");
            $(".nav-link-fibitlaunchpad-ido-project").addClass("fibit-launchpad-active-link");
        }

    });

    return (
        <div className="App Ido-Navbar">
            <Navbar id='classy-navbar-mobile' className="fixed-top" key="lg" expand="lg">
                <Container fluid className="col-lg-12 px-4">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" id="navbar-img" />
                    </Link>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                <Link className="navbar-brand" to="/">
                                    <img src={logo} alt="logo" id="navbar-img" />
                                </Link>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item ps-3">
                                    <HashLink className="nav-link nav-link-fibitlaunchpad-home" to='/launch-pad' onClick={() => navigate('/launch-pad')}>
                                        <IoHome className="navbar-navlink-icon" />Home</HashLink>
                                </li>
                                <li className="nav-item">
                                    <HashLink className="nav-link nav-link-fibitlaunchpad-ido-form" to="/ido-form" onClick={() => navigate('/ido-form')}>
                                        <BsLightningChargeFill className="navbar-navlink-icon" />Form</HashLink>
                                </li>
                                <li className="nav-item">
                                    <HashLink className="nav-link nav-link-fibitlaunchpad-ido-lanch" to="/ido-lanch" onClick={() => navigate('/ido-lanch')}>
                                        <CiMap className="navbar-navlink-icon" />Launch</HashLink>
                                </li>
                                {
                                    userLoginChk() == true ?
                                        <li className="nav-item">
                                            <HashLink className="nav-link nav-link-fibitlaunchpad-ido-project" to="/ido-project" onClick={() => navigate('/ido-project')}>
                                                <BsFillProjectorFill className="navbar-navlink-icon" />Project</HashLink>
                                        </li>
                                    :
                                        ''
                                }
                            </ul>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navbars;
