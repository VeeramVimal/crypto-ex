import React, { useState, useEffect } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebookSquare, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
// import "../../../assets/ido-style.css";
import { useContextData } from '../../../core/context/index';
import "../assets/styles/ido-style.css";
function Navbar() {
    const { siteSettings } = useContextData();
    const [currentYear, setCurrentYear] = useState();
    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, [])
    return (
        <div className="App Ido-footer">
            <div className="footer-section-bottom">
                <div className="ninth-section-banner pb-5 pt-3">
                    <div className="container">
                        <p className="ido-text-2 mb-5 text-center">
                            FIND US ON SOCIAL MEDIA
                        </p>
                        <div className="footer-social-icons pt-3">
                            {siteSettings&&siteSettings.instagramLink && <a target="_blank" href={siteSettings.instagramLink}><FaInstagram /></a>}
                            {siteSettings&&siteSettings.twitterLink && <a target="_blank" href={siteSettings.twitterLink}><FaTwitter /></a>}
                            {siteSettings&&siteSettings.linkedinLink && <a target="_blank" href={siteSettings.linkedinLink}><FaLinkedin /></a>}
                            {siteSettings&&siteSettings.facebookLink && <a target="_blank" href={siteSettings.facebookLink}><FaFacebookSquare /></a>}
                            {siteSettings&&siteSettings.telegramLink && <a target="_blank" href={siteSettings.telegramLink}><FaTelegramPlane /></a>}
                            {siteSettings&&siteSettings.youtubeLink && <a target="_blank" href={siteSettings.youtubeLink}><FaYoutube /></a>}
                        </div>
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
                                    <a>© {currentYear} Copyright: Fibit Pro</a>
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
