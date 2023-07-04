import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebookSquare, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from "react-router-dom";

import { useContextData } from '../../core/context/index';

import {
    getHomeCMS
} from '../../core/services/all.api';

import Config from "../../core/config/index";

const Footer = () => {
    const navigate = useNavigate();

    const { siteSettings } = useContextData();

    const [cmsDynData, setCmsDynData] = useState({});

    useEffect(() => {
        getFooterCMSCall();
    }, []);

    const isValidHttpUrl = async (val = "") => {
        let url;
        try {
            url = new URL(val);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
        // return val.search("http");
    }

    const navigateTo = async (linkVal) => {
        if (linkVal) {
            if (await isValidHttpUrl(linkVal)) {
                window.open(linkVal);
            }
            else {
                navigate(linkVal, true);
            }
        }
    }

    const getFooterCMSCall = async () => {
        const payload = { from: "footer" };
        const resp = await getHomeCMS({ payload });
        if (resp) {
            const {
                getcmsDetails = [],
                status = false
            } = resp;
            if (status) {
                let CMSList = getcmsDetails.filter((elem) => (elem.identify == "CMS"));
                const updateCmdData = {
                    CMSList: (CMSList && CMSList.length > 0) ? CMSList : []
                };
                setCmsDynData(updateCmdData);
            }
        }
    }

    return (
        <>
            <section className="footer-section">
                <div className="container pb-4">
                    <div className="row align-items-start justify-content-around g-3">

                        <div className="col-lg-2 text-center">
                            {(siteSettings && siteSettings.siteLogo) ?
                                <img className='footer-image-logo' src={siteSettings.siteLogo} alt="logo" onClick={() => navigate('/')} /> : ""
                            }
                        </div>
                        <div className="col-lg-2">
                            <div className="list-group footer-typo footer-typo-mb">
                                <h3 className="mb-lg-4">Services</h3>
                                <Link to={'/spot/BTC_USDT'}>Exchange</Link>
                                <Link to={'/markets'}>Market</Link>
                                <Link to={'/faq'}>Faq</Link>
                                <Link to={'/fee-structure'}>Fees</Link>
                                <Link to={'/coin-status'}>Coin Status</Link>
                                <Link to={'/my/referral'}>Refer & Earn</Link>
                                <a href={Config.coinListing} target={"_blank"}>Coin Listing</a>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="list-group footer-typo footer-typo-mb">
                                <h3 className="mb-lg-4">Informations</h3>
                                <a href="javascript:void(0)" onClick={() => navigate('/about')}>About us</a>
                                {/* <a href="javascript:void(0)">Whitepaper</a> */}
                                <Link to={'/whitepaper'}>Whitepaper</Link>
                                <Link to={'/privacy-policy'}>Privacy policy</Link>
                                <Link to={'/terms'}>Terms & conditions</Link>
                                <Link to={'/contact-support'}>Contact Support</Link>
                                {
                                    cmsDynData && cmsDynData.CMSList && cmsDynData.CMSList.length > 0 &&
                                    cmsDynData.CMSList.map((row, i) => {
                                        if (row.title && row.link) {
                                            return (
                                                <Link to={row.link}>
                                                    {row.title}
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        {siteSettings &&
                            <>
                                <div className="col-lg-4">
                                    <div className="footer-social-icons">
                                        <h3 className="mb-lg-4">Social media</h3>
                                        {siteSettings.instagramLink && <a target="_blank" href={siteSettings.instagramLink}><FaInstagram /></a>}
                                        {siteSettings.twitterLink && <a target="_blank" href={siteSettings.twitterLink}><FaTwitter /></a>}
                                        {siteSettings.linkedinLink && <a target="_blank" href={siteSettings.linkedinLink}><FaLinkedin /></a>}
                                        {siteSettings.facebookLink && <a target="_blank" href={siteSettings.facebookLink}><FaFacebookSquare /></a>}
                                        {siteSettings.telegramLink && <a target="_blank" href={siteSettings.telegramLink}><FaTelegramPlane /></a>}
                                        {siteSettings.youtubeLink && <a target="_blank" href={siteSettings.youtubeLink}><FaYoutube /></a>}
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="list-group footer-typo footer-typo-mb">
                                        <h3 className="mb-lg-3">Support</h3>
                                        {siteSettings.youtubeLink && <a href={"mailto:" + siteSettings.supportEmail}>{siteSettings.supportEmail}</a>}
                                    </div>
                                    {Config.APIDOC_STATUS == "Enable" ?
                                        <div className="list-group footer-typo footer-typo-mb">
                                            <a href="/apipage">API</a>
                                        </div> : ""}
                                </div>
                            </>}
                    </div>
                </div>
            </section>
            <div className="container-fluid footer-bottom-section py-2">
                <div className="row">
                    <div className='container w-75'>
                        <div className="row">
                            <div className="col-lg-12 my-1">
                                <center ><p><small className="text-danger">Disclaimer: Crypto products and NFTS are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions.
                                    The disclaimer is for all those who are using this platform whose age is above 18 years. Below 18 years age is not applicable to use this application.</small></p></center>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-lg-column flex-column justify-content-center">
                        {siteSettings &&
                        <div className="fs-14 text-center">
                            {siteSettings?.copyRights}
                        </div>
                        }

                        {/* <div className="fs-14 text-center">
                            <a href='#' target="_blank">Developed By </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
