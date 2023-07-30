import React from 'react';

import Logo from './assets/images/Logo.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,

} from "react-router-dom";

class TopNav extends React.Component {

    render() {
        return (
            <div >
                <section className=''>
                    <Navbar id='classy-navbar-mobile' className="fixed-top" key="lg" expand="lg">
                        <Container fluid className="col-lg-11">
                        <Link className="navbar-brand" to="/"><img src={Logo} alt="logo" id="navbar-img" /></Link>
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

                                        <li className="nav-item dropdown ps-3">
                                            <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Buy Crypto
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="dappdrop">
                                                <div className="row">
                                                    <div className="col">
                                                        <li><a className="dropdown-item" href="/">Bank Deposit</a></li>
                                                        <li><a className="dropdown-item" href="/">Credit/Debit Card</a></li>
                                                        <li><a className="dropdown-item" href="/">Cash Balance</a></li>
                                                        <li><a className="dropdown-item" href="/">P2P Trading</a></li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>

                                        <li className="nav-item ps-3">
                                            <a href="/" rel="noopener noreferrer" alt="support" className="nav-link">Exchange</a>
                                        </li>
                                        <li className="nav-item ps-3">
                                            <a href="/" rel="noopener noreferrer" alt="support" className="nav-link">Markets</a>
                                        </li>
                                        <li className="nav-item dropdown ps-3">
                                            <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Trade
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="dappdrop">
                                                <div className="row">
                                                    <div className="col">
                                                        <li><a className="dropdown-item" href="/spot">Spot</a></li>
                                                        <li><a className="dropdown-item" href="/">Credit/Debit Card</a></li>
                                                        <li><a className="dropdown-item" href="/">Cash Balance</a></li>
                                                        <li><a className="dropdown-item" href="/">P2P Trading</a></li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown ps-3">
                                            <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Earn
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="dappdrop">
                                                <div className="row">
                                                    <div className="col">
                                                        <li><a className="dropdown-item" href="/">Bank Deposit</a></li>
                                                        <li><a className="dropdown-item" href="/">Credit/Debit Card</a></li>
                                                        <li><a className="dropdown-item" href="/">Cash Balance</a></li>
                                                        <li><a className="dropdown-item" href="/">P2P Trading</a></li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown ps-3">
                                            <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Derivatives
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="dappdrop">
                                                <div className="row">
                                                    <div className="col">
                                                        <li><a className="dropdown-item" href="/">Bank Deposit</a></li>
                                                        <li><a className="dropdown-item" href="/">Credit/Debit Card</a></li>
                                                        <li><a className="dropdown-item" href="/">Cash Balance</a></li>
                                                        <li><a className="dropdown-item" href="/">P2P Trading</a></li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown ps-3">
                                            <span className="nav-link dropdown-toggle" id="dappdrop" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Finance
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="dappdrop">
                                                <div className="row">
                                                    <div className="col">
                                                        <li><a className="dropdown-item" href="/">Bank Deposit</a></li>
                                                        <li><a className="dropdown-item" href="/">Credit/Debit Card</a></li>
                                                        <li><a className="dropdown-item" href="/">Cash Balance</a></li>
                                                        <li><a className="dropdown-item" href="/">P2P Trading</a></li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item ps-3">
                                            <a href="" rel="noopener noreferrer" alt="nft" className="nav-link">NFT</a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav ms-auto  text-lg-center">
                                        <li className="nav-item ps-3">
                                            <a href="/" rel="noopener noreferrer" alt="support" className="nav-link">Log In</a>
                                        </li>
                                        <li className="nav-item ps-3 text-center">
                                            <a href="/" rel="noopener noreferrer" alt="support" className="nav-link nav-register-button">Register</a>
                                        </li>
                                    </ul>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </section>
            </div >
        );
    }
}
export default TopNav;