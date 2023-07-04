import React, { useState, useEffect} from "react";
// import "../../../assets/ido-style.css";
import "../assets/styles/ido-style.css";
function Navbar() {
    return (
        <div className="App Ido-footer">
            {/* <div className="text-center">
                <img src={skel} className="floating-hand-image-2" alt="skel" />
                <img src={skel} className="floating-hand-image-3" alt="skel" />
            </div> */}

            <div className="footer-section-bottom">
                <div className="ninth-section-banner pb-5 pt-3">
                    <div className="container">
                        <p className="ido-text-2 mb-5 text-center">
                            FIND US ON SOCIAL MEDIA
                        </p>
                        {/* <div className="text-center gap-3 d-flex justify-content-center footer-social-icons">
                            <a><img src={twitter} alt="twitter" /></a>
                            <a><img src={github} alt="github" /></a>
                            <a><img src={facebook} alt="facebook" /></a>
                            <a><img src={linkedin} alt="linkedin" /></a>
                        </div> */}

                    </div>
                </div>

                <div className="tenth-section-banner py-5">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col">
                                {/* <a className="navbar-brand" href="#"><img src={logo} alt="logo" /></a> */}
                                <div className="footer-link-section mt-4">
                                    <a>Features</a>
                                    <a>How it works</a>
                                    <a>Team Info</a>
                                    <a>About us</a>
                                    <a>Terms of Services</a>
                                    <a>Privacy policy</a>
                                </div>
                                <div className="footer-link-section mt-4">
                                    <a>© 2021 Copyright: Fibit Pro</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
