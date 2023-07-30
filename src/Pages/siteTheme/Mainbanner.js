import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';

import { MdOutlineDoubleArrow, MdOutlineCropRotate } from 'react-icons/md';
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineSafety } from 'react-icons/ai';
import { GiBuyCard } from 'react-icons/gi';
import { RiCustomerServiceLine } from 'react-icons/ri';
import Banner from "../../assets/images/banner-image.png";
import nftcard from "../../assets/images/nft-card.png"
import Group from "../../assets/images/Group.png"
import App from "../../assets/images/app.png"
import googleplay from "../../assets/images/googleplay.png"
import appstore from "../../assets/images/appstore.png"
import staking from "../../assets/images/staking.png"
import Config from "../../core/config";
import { HiArrowNarrowRight } from 'react-icons/hi';
import { BsGiftFill } from 'react-icons/bs';

import scrollimagenft from '../../assets/images/homepage-popup.png';

import crossclose from '../../assets/images/red-cross.png';

import MarketTrends from '../separate/MarketTrends';

import { userLoginChk } from '../../core/helper/cookie';

import {
    getHomeCMS
} from '../../core/services/all.api';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";

function Mainbanner(props) {

    const navigate = useNavigate();

    const [cmsData, setCmsData] = useState({});

    useEffect(() => {

        // window.onscroll = function () {
        //     $("#popup").show();
        // };
        // $(document).ready(function () {
        //     $(window).scroll(function () {
        //         var wscroll = $(this).scrollTop();
        //         if (wscroll > 90) {
        //             $("#popup").show();
        //         }
        //     });
        // });
        // $(document).ready(function () {
        //     $("#crossclosescript").click(function () {
        //         $("#popup").hide();
        //     });
        // });

        // $("table tbody tr:nth-child(-n+6)").show();
        // $("table tbody tr").hide();
        $(document).ready(function () {
            $(".table-view-all-button-1").click(function () {
                $(".table-view-all-button-1").hide();
                $(".table-view-all-button-2").show();
                $(".top-banner-third-section table tbody tr").show();
            });
            $(".table-view-all-button-2").click(function () {
                $(".table-view-all-button-2").hide();
                $(".table-view-all-button-1").show();
                $(".top-banner-third-section table tbody tr").hide();
                $(".top-banner-third-section table tbody tr:nth-child(-n+6)").css("display", "table-row");
            });
        });
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

    useEffect(() => {
        getHomeCMSCall();
    }, []);

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

    const getHomeCMSCall = async () => {
        const payload = { from: "home" };
        const resp = await getHomeCMS({ payload });
        if (resp) {
            const {
                getcmsDetails = [],
                status = false
            } = resp;
            if (status) {
                const adBanner = getcmsDetails.filter((elem) => (elem.identify == "adBanner" && elem.image != ""));
                const homeIntro = getcmsDetails.filter((elem) => (elem.identify == "homeIntro"));
                const ourBenifit = getcmsDetails.filter((elem) => (elem.identify == "our-benefits"));
                let section1 = getcmsDetails.filter((elem) => (elem.identify == "section1"));
                let section2 = getcmsDetails.filter((elem) => (elem.identify == "section2"));
                let section3 = getcmsDetails.filter((elem) => (elem.identify == "section3"));
                let section4 = getcmsDetails.filter((elem) => (elem.identify == "section4"));
                let section5 = getcmsDetails.filter((elem) => (elem.identify == "section5"));
                let CMSList = getcmsDetails.filter((elem) => (elem.identify == "CMS"));
                // section1[0].loadIcon = "MdOutlineCropRotate";
                // section1[0].loadIconName = (section1[0] && section1[0].loadIcon) ? <section1.loadIcon className="banner-top-icons-1" /> : "";
                // section2[0].loadIconName = (section2[0] && section2[0].loadIcon) ? <section2.loadIcon className="banner-top-icons-1" /> : "";
                // section3[0].loadIconName = (section3[0] && section3[0].loadIcon) ? <section3.loadIcon className="banner-top-icons-1" /> : "";
                // section4[0].loadIconName = (section4[0] && section4[0].loadIcon) ? <section4.loadIcon className="banner-top-icons-1" /> : "";
                // section5[0].loadIconName = (section5[0] && section5[0].loadIcon) ? <section5.loadIcon className="banner-top-icons-1" /> : "";
                const updateCmdData = {
                    adBanner,
                    ourBenifit,
                    homeIntro: homeIntro[0] ? homeIntro[0] : {},
                    section1: section1[0] ? section1[0] : {},
                    section2: section2[0] ? section2[0] : {},
                    section3: section3[0] ? section3[0] : {},
                    section4: section4[0] ? section4[0] : {},
                    section5: section5[0] ? section5[0] : {},
                    CMSList: (CMSList && CMSList.length > 0) ? CMSList : []
                };
                setCmsData(updateCmdData);
            }
        }
    }

    return (
        <>
            <div className="main-banner-background-styling">
                <div className="top-banner-hero-section">
                    <div className="container-fluid col-lg-9">
                        <div className="row align-items-center g-4 flex-lg-row-reverse">
                            <div className="col-lg-6 banner-image-bg">
                                {/* <img src={Banner} alt="banner-usdt-img-1" /> */}
                                {/* Banner */}
                                {cmsData.homeIntro && cmsData.homeIntro.image && <img src={cmsData.homeIntro.image} alt={Config.SITENAME} />}
                            </div>
                            {cmsData.homeIntro && <div className="col-lg-6">
                                <h1 className="banner-text-1">{cmsData.homeIntro && cmsData.homeIntro.title}</h1>
                                <p className="banner-text-2 mt-4 mb-4" dangerouslySetInnerHTML={{ __html: cmsData.homeIntro && cmsData.homeIntro.description }}></p>
                                {cmsData.homeIntro.link && <span onClick={() => navigateTo(cmsData.homeIntro.link)} className="curPointer banner-top-button-1">VIEW EXCHANGE<MdOutlineDoubleArrow className="banner-top-icons-1" /></span>}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-banner-second-section">
                <div className="container  pt-5">
                    <div className="row align-items-center g-4">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >
                            {cmsData && cmsData.adBanner && cmsData.adBanner.map((data, index) => (
                                <SwiperSlide>
                                    {
                                        data.link ?
                                        <a href={data.link} target="_blank">
                                            <img src={data.image} alt="swiper" />
                                        </a>
                                        :
                                        <img src={data.image} alt="swiper" />
                                    }
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <div id="scrollactivatesection" className="top-banner-third-section my-5">
                <div className="container inner-third-section py-3">
                    <div className="row align-items-center g-4">
                        <h1 className='banner-text-3'><img className='banner-image-1' src={Config.BACKEND_URL + "gallery/Headings-design.png"} alt={Config.SITENAME} />Market Trends</h1>
                        <MarketTrends />
                        <p className='text-center'>
                            <Link to="markets">View More Markets <HiArrowNarrowRight /></Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="top-banner-fifth-section ">
                <div className="container top-inner-fifth-section">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                            <h1 className='banner-text-4'><img className='banner-image-1' src={Config.BACKEND_URL + "gallery/Headings-design.png"} alt={Config.SITENAME} />{cmsData.section1 && cmsData.section1.title}</h1>
                            {cmsData.section1 && cmsData.section1.description && <p className="banner-text-6 mt-4" dangerouslySetInnerHTML={{ __html: cmsData.section1.description }}></p>}
                            {cmsData.section1 && cmsData.section1.link && <a href="javascript:void(0);" onClick={() => navigateTo(cmsData.section1.link)} className="curPointer banner-top-button-2 mt-4">NFT Marketplace
                                <MdOutlineDoubleArrow className="banner-top-icons-1" />
                            </a>}
                        </div>
                        <div className="col-lg-6 top-inner-fifth-bg-image" >
                            {cmsData.section1 && cmsData.section1.image && <img src={cmsData.section1.image} alt={Config.SITENAME} />}
                            {/* nftcard */}
                        </div>
                    </div>
                </div>
            </div>

            {Config.STAKING_STATUS == "Enable" ?
                <div className="top-banner-fourth-section">
                    <div className="container ">
                        <div className="row align-items-center justify-content-between g-4">
                            <div className="col-lg-6">
                                <h1 className='banner-text-4'><img className='banner-image-1' src={Config.BACKEND_URL + "gallery/Headings-design.png"} alt={Config.SITENAME} />{cmsData.section2 && cmsData.section2.title}</h1>
                                {cmsData.section2 && cmsData.section2.description && <p className="banner-text-5 mt-4" dangerouslySetInnerHTML={{ __html: cmsData.section2.description }}></p>}
                                {cmsData.section2 && cmsData.section2.link && <a href="javascript:void(0);" onClick={() => navigateTo(cmsData.section2.link)} className="curPointer banner-top-button-2 mt-5">Farm and Stake<MdOutlineDoubleArrow className="banner-top-icons-1" /></a>}
                            </div>
                            <div className="col-lg-6">
                                {cmsData.section2 && cmsData.section2.image && <img className='staking-image-banner' src={cmsData.section2.image} alt="app-play-button" />}
                                {/* staking */}
                            </div>
                        </div>
                    </div>
                </div> : ""}

            <div className="top-banner-sixth-section py-5">
                <div className="container py-5">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-4">
                            <h1 className='banner-text-4'><img className='banner-image-1' src={Config.BACKEND_URL + "gallery/Headings-design.png"} alt={Config.SITENAME} />{cmsData.section3 && cmsData.section3.title}</h1>
                            {cmsData.section3 && cmsData.section3.description && <p className="banner-text-7 mt-4" dangerouslySetInnerHTML={{ __html: cmsData.section3.description }}></p>}
                            {cmsData.section3 && cmsData.section3.link && <a href="javascript:void(0);" onClick={() => navigateTo(cmsData.section3.link)} className="banner-top-button-2 mt-4">Explore Market<MdOutlineDoubleArrow className="banner-top-icons-1" /></a>}
                        </div>
                        <div className="col-lg-8">
                            {cmsData.section3 && cmsData.section3.image && <img src={cmsData.section3.image} alt={Config.SITENAME} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-banner-seventh-section">
                <div className="container ">
                    <div className="row align-items-center justify-content-between g-4">
                        <div className="col-lg-4">
                            <h1 className='banner-text-4'><img className='banner-image-1' src={Config.BACKEND_URL + "gallery/Headings-design.png"} alt={Config.SITENAME} />{cmsData.section4 && cmsData.section4.title}</h1>
                            {cmsData.section4 && cmsData.section4.description && <p className="banner-text-5 mt-4" dangerouslySetInnerHTML={{ __html: cmsData.section4.description }}></p>}
                            <a href={Config.appLinks.googlePlay} target={"_blank"}><img className='app-play-button mt-4' src={googleplay} alt="app-play-button" /></a>
                            <a href={Config.appLinks.appStore} target={"_blank"}><img className='app-play-button ms-3 mt-4' src={appstore} alt="app-play-button" /></a>
                        </div>
                        <div className="col-lg-4">
                            <img src={App} alt="app-play-button" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-banner-eight-section mt-5">
                <div className="container relative-ajustment">
                    <div className="row align-items-center justify-content-between g-4">
                        <div className="col-lg-12">
                            <h1 className='banner-text-4'><img className='banner-image-1' src={Config.BACKEND_URL + "gallery/Headings-design.png"} alt={Config.SITENAME} />{cmsData.section5 && cmsData.section5.title}</h1>
                            {cmsData.section5 && cmsData.section5.description && <p className="banner-text-5 mt-5" dangerouslySetInnerHTML={{ __html: cmsData.section5.description }}></p>}
                        </div>
                        <div className="col-lg-12">
                            <div className="row row-cols-1 row-cols-md-4 g-4">
                                {cmsData && cmsData.ourBenifit && cmsData.ourBenifit.map((row, i) => {
                                    if (row.identify == "our-benefits") {
                                        return (
                                            <div className="col" key={i}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex flex-column">
                                                            <div className="">
                                                                <center>
                                                                    {row.loaderIcon && row.loaderIcon == "secure" ?
                                                                        <AiOutlineSafety className='benefits-icons-1 up-down my-3' />
                                                                        :
                                                                        row.loaderIcon && row.loaderIcon == "toggle" ?
                                                                            <MdOutlineCropRotate className='benefits-icons-1 up-down my-3' />
                                                                            :
                                                                            row.loaderIcon && row.loaderIcon == "24/7" ?
                                                                                <RiCustomerServiceLine className='benefits-icons-1 up-down my-3' />
                                                                                :
                                                                                row.loaderIcon && row.loaderIcon == "discount" ?
                                                                                    <GiBuyCard className='benefits-icons-1 up-down my-3' />
                                                                                    : ""
                                                                    }
                                                                </center>
                                                            </div>
                                                            <div className="">
                                                                <h5 className='benefits-text-1'>{row.title}</h5>
                                                                {row && row.description != "" && <span className='benefits-text-2' dangerouslySetInnerHTML={{ __html: row?.description }} />}
                                                                {/* <p className='benefits-text-2'>{row.description}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                {/* <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column">
                                                <div className=""><center>
                                                <MdOutlineCropRotate className='benefits-icons-1 up-down my-3' />
                                                </center></div>
                                                <div className="">
                                                    <h5 className='benefits-text-1'>Toggle Button</h5>
                                                    <p className='benefits-text-2'>By enabling toggle button you can pay fees in Fan Token and get a 50% discount on fees.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column">
                                                <div className=""><center>
                                                <RiCustomerServiceLine className='benefits-icons-1 up-down my-3' />
                                                </center></div>
                                                <div className="">
                                                    <h5 className='benefits-text-1'>24/7 support</h5>
                                                    <p className='benefits-text-2'>Any kind of Problem. Get it resolved with our 24/7.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column">
                                                <div className=""><center>
                                                <GiBuyCard className='benefits-icons-1 up-down my-3' />
                                                </center></div>
                                                <div className="">
                                                    <h5 className='benefits-text-1'>Discount trading</h5>
                                                    <p className='benefits-text-2'>{Config.SITENAME} enables buy or sell Bitcoin and other cryptos in real time, 24/7 with only max $1 or 0.1% fees whichever is less</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row bg-poligon">
                    <div className="col-lg-12">
                        <div className="top-banner-eight-section py-5">
                            <div className="container ">
                                <div className="row text-center align-items-center justify-content-between g-4">
                                    <div className="col-lg-12">
                                        <h1 className='ready-text-1'>Ready to start trading?</h1>
                                        <p className="ready-text-2 mt-3 mb-5">Join us right now !</p>
                                        {(userLoginChk() === false) ? <>
                                            <span onClick={() => navigate("/register")} className="curPointer banner-top-button-3">Register</span>
                                            <span onClick={() => navigate("/login")} className="curPointer banner-top-button-4 ms-4">Log In</span>
                                        </> :
                                            <span onClick={() => navigate("/spot/BTC_USDT")} className="curPointer banner-top-button-3">Start Trading</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ====================================================SCROLL-MODAL======================================== */}

            {/* <div  id="popup"  class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <img id="scrollmodalopen" src={scrollimagenft} /> */}
            <div id="popup" class="popup text-center align-items-center">
                <div className="">
                    <div id="scrollmodalopen" className="text-center justify-content-center">
                        <div className=" d-flex flex-row text-end justify-content-end bg-white">
                            <div>
                                <img id="crossclosescript" src={crossclose} className="crossclose-img m-3 curPointer" />
                            </div>
                        </div>
                        <img className="scrollmodalopenimg" src={scrollimagenft} />
                        <div className="scrollmodal-bg mx-auto px-4 py-4">
                            <p className="f-35 fw-600 ">
                                Claim Your 100 USDT Reward
                            </p>
                            <p className="f-25">
                                Experience the thrill of crypto rewards
                                register today and start winning!
                            </p>
                            <button className="btn curPointer banner-top-button-1 align-items-center"onClick={() => navigate('/register')} >
                                <BsGiftFill className="f-25 fc-w mx-2" /><span className="pt-3 fc-w f-25">Claim Reward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default Mainbanner;
