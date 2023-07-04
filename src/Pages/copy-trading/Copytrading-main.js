import React, { useEffect, useState } from "react";
import "../../assets/style.css";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import { GoChevronLeft } from "react-icons/go";
import tradingswiperimg from '../../assets/images/trading-swiper-image.png';
import tradinglogo from '../../assets/images/tradinglogo.png';
import $ from "jquery"
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdArrowDropright } from "react-icons/io";
// import { TbBrandDrops } from "react-icons/tb";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCommentDollar } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import { GoSettings } from "react-icons/go";
import { BiLike } from "react-icons/bi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation } from "swiper";
import Config from "../../core/config";
import { makeRequest } from "../../core/services/v1/request";
// import Swal from "sweetalert2"
import { useContextData } from '../../core/context';
import { toast } from "../../core/lib/toastAlert";
import { useNavigate } from "react-router-dom";

export default function Maincopytrading(props) {
    const navigate = useNavigate();
    const [traderDetails, setTraderDetails] = useState();
    const { myProfile } = useContextData();
    const [userBalance, setUserBalance] = useState();

    async function getAllLeadTraders() {
        try {
            const params = {
                url: `${Config.V1_API_URL}copyTrade/getAllLeadTrader`,
                method: "POST",
                data: { trader_status: 1, userId: myProfile._id },
            };
            const response = await makeRequest(params);
            if (response) {
                setTraderDetails(response.data)
            }
            else toast({ type: "error", message: 'Leader Not Found' });
        } catch (err) {
            console.log("lead-trader error", err);
        }
    }

    async function create_lead_trader() {
        const params = {
            url: `${Config.V1_API_URL}copyTrade/addLeadTrader`,
            method: "POST",
            data: {
                name: 'isakki',
                email: 'isakkimuthu@clarisco.com',
                discription: 'hello i am a software developer',
                trader_id: '6453550ca9a6dd29f823498c',
            },
        };
        const response = await makeRequest(params);
        if (response.status && response.Msg) {
            console.log('hhhhhhhh')
        } else console.log('ssssss')
    }

    async function getUserBalance() {
        const params = {
            url: `${Config.V1_API_URL}copyTrade/getUserBalance`,
            method: "POST",
            data: { userId: myProfile._id, currency_id: '61330e0fedf7c88c84357055' },
        };
        const response = await makeRequest(params);
        if (response) {
            setUserBalance(response.data);
        } else console.log('bbbbbbbbb');

    }

    async function copyTrader(data) {

        // const { value: formValues } = await Swal.fire({
        //     title: 'Copy Portfolio',
        //     confirmButtonText: 'Submit',
        //     html:

        //     //  Cost per Order  <input id="swal_cost_per_order" type="number" step="0.5" class="swal2-input"><br>
        //      `Fixed Amount  <input id="swal_copy_amt" type="number" step="0.5" class="swal2-input"><br>
        //      Take Profit <input id="swal_take_profit" type="number" step="0.5" class="swal2-input"><br>
        //      Stop Loss   <input id="swal_stop_loss" type="number" step="0.5" class="swal2-input">`,
        //     focusConfirm: false,
        //     preConfirm: async() => {

        //         let cost_per_order = document.getElementById('swal_cost_per_order').value;
        //         let copy_amt = document.getElementById('swal_copy_amt').value;
        //         let take_profit = document.getElementById('swal_take_profit').value;
        //         let stop_loss = document.getElementById('swal_stop_loss').value;
        //         if (!cost_per_order || !copy_amt || !take_profit || !stop_loss) {
        //             Swal.showValidationMessage(`Please enter all details`)
        //           }
        //           else
        //           {
        //             const params = {
        //                 url: `${Config.V1_API_URL}copyTrade/createCopyTraderRequest`,
        //                 method: "POST",
        //                 data: { 
        //                     cost_per_order:cost_per_order,
        //                     copy_amt:copy_amt,
        //                     take_profit:take_profit,
        //                     stop_loss:stop_loss,
        //                     trader_id:data.trader_id,
        //                     copy_user_id:myProfile._id,
        //                    },
        //               };
        //               const response = await makeRequest(params);
        //               if (response.status) {
        //                 toast({ type: "success", message: 'Request send successfully' });
        //               }
        //               else
        //               {
        //                 toast({ type: "error", message: 'Request send faild' });
        //               }
        //           }
        //     }
        //   })

        //   if (formValues) {
        //     Swal.fire(JSON.stringify(formValues))
        //   }

    }

    useEffect(() => {
        //getUserBalance();
        getAllLeadTraders();
        //create_lead_trader();
    }, [myProfile]);

    //console.log('traderDetailstraderDetails...',traderDetails)
    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />
            <div className="deposit-page-top-banner">
                <div className="deposit-hero-section">
                    <div className="container">
                        <div className="row align-items-center justify-content-center text-center">
                            <div className="col">
                                <span className="deposit-text-1">Copy trades with one click
                                    <img className="vertical-line-css mx-3" src={tradinglogo} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container   py-5">
                <div className="row align-items-center g-4">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}

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
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >

                        <SwiperSlide>
                            <img src={tradingswiperimg} alt="swiper" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={tradingswiperimg} alt="swiper" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={tradingswiperimg} alt="swiper" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={tradingswiperimg} alt="swiper" />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>

            <div className="container p2puser-center-scrollspy-styling ">
                <div className="row row-cols-1 row-cols-lg-3 g-4">
                    <div className="col">
                        <nav className="p2p-user-center-nav-tabs-styling">
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="spotlight-tab" data-bs-toggle="tab" data-bs-target="#spotlight" type="button" role="tab" aria-controls="spotlight" aria-selected="true">
                                    <HiOutlineSquares2X2 className="loan-page-icon-image-table mx-2" />In The Spotlight
                                </button>
                                <button class="nav-link" id="portfolio-tab" data-bs-toggle="tab" data-bs-target="#portfolio" type="button" role="tab" aria-controls="portfolio" aria-selected="false">
                                    <HiOutlineSquares2X2 className="loan-page-icon-image-table mx-2" />Portfolio List
                                </button>
                            </div>
                        </nav>
                    </div>
                    <div className="col copytrading-search-css">
                        <form class="d-flex align-items-center favorites-css">
                            <BiSearchAlt2 className='text-grey mx-2' />
                            <input class="form-control me-2" type="search" placeholder="Search Coin" aria-label="Search" />
                        </form>
                    </div>
                    <div className="col-lg-2 ">
                        <div className="d-flex align-items-center favorites-css">
                            <BiStar className="loan-page-icon-image-table mx-2" />
                            <p className="mb-0">My Favorites</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-3">
                <div className="row">
                    <div className="col">
                        <div class="tab-content" id="nav-tabContent">
                            {/* ===================================TAB-1================================================================== */}

                            <div class="tab-pane fade show active" id="spotlight" role="tabpanel" aria-labelledby="spotlight-tab">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="deposit-text-1 mb-1">Top Portfolios by PNL</p>
                                        <p className="text-grey">All Portfolios Ranked By 30D PNL</p>
                                    </div>
                                    <div className="d-flex align-items-center fc-g">
                                        <p className="mb-0">View More</p>
                                        <IoMdArrowDropright className="f-22" />
                                    </div>
                                </div>
                                <div className="container  px-0 pb-5">
                                    <div className="row g-4 row-cols-lg-4 row-cols-1">
                                        {traderDetails ?
                                            traderDetails.map((res) => {
                                                return (<div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">{res.name}</p>
                                                                {/* <p className="text-grey mb-0">{res.email}</p> */}
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">

                                                                <button className='btn  banner-top-button-copy' onClick={() => navigate("/copy-trade-port?id=" + btoa(res.trader_id))}> {/* onClick={()=>copyTrader(res)} */}
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)
                                            })
                                            : ''}


                                        {/* <div className="col ">
                                            <div className="copytrading-card-css-styling">
                                                <div className="d-flex align-items-center">
                                                    <div className="">
                                                        <CgProfile className="trading-page-profile-icon-image me-3" />
                                                    </div>
                                                    <div className="">
                                                        <p className="mb-0">ABCDEF</p>
                                                        <p className="text-grey mb-0">ABCDEF</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-2 align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="">
                                                            <FaCommentDollar className="text-grey" />
                                                            <span className="mx-1 f-13 fw-500">USD-M</span>
                                                        </div>
                                                        <div className="">
                                                            <AiFillApi className="text-grey" />
                                                            <span className="mx-1 f-13 fw-500">API</span>
                                                        </div>
                                                        <div className="mx-1">
                                                            <CgProfile className="text-grey" />
                                                            <span className="mx-1 f-13 fw-500">180/250</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-3 justify-content-between align-items-center">
                                                    <div className="">
                                                        <p className="mb-0 fc-g f-20">113.14%</p>
                                                        <p className="text-grey">30D ROI</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="mb-0 fc-g f-20">21,272.51</p>
                                                        <p className="text-grey">30D PNL</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-3 justify-content-between align-items-center">
                                                    <div className="">
                                                        <p className="mb-0 f-20">38.14%</p>
                                                        <p className="text-grey">30D ROI</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="mb-0 f-20">80.80%</p>
                                                        <p className="text-grey">30D PNL</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-2 justify-content-between align-items-center">
                                                    <div className="">
                                                        <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                        <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                    </div>
                                                    <div className="mx-1">
                                                        <button className='btn  banner-top-button-copy-full'>
                                                            Full
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}


                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="deposit-text-1 mb-1">7-Day New Portfolios</p>
                                        <p className="text-grey">7-Day New Portfolios Ranked By 7D ROI</p>
                                    </div>
                                    <div className="d-flex align-items-center fc-g">
                                        <p className="mb-0">View More</p>
                                        <IoMdArrowDropright className="f-22" />
                                    </div>
                                </div>
                                <div className="container-fluid px-0 pb-5">
                                    <div className="row align-items-center g-4">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            loop={true}

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
                                            navigation={true}
                                            modules={[Navigation]}

                                            className="mySwiper px-5  glass-effects-swiper-styling-right "
                                        >

                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        </Swiper>
                                    </div>
                                </div>
                                <div>
                                    <p className="deposit-text-1 mb-1">Most Liked Lead Traders</p>
                                    <p className="text-grey">Lead traders ranked by No. of copy traders in 30 Days</p>
                                </div>
                                <div className="container-fluid px-0 pb-5">
                                    <div className="row align-items-center g-4">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            loop={true}


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
                                            navigation={true}
                                            modules={[Navigation]}

                                            className="mySwiper px-5 glass-effects-swiper-styling-right "
                                        >
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className=" align-items-center justify-content-center text-center">
                                                            <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            <p className="mb-0 mt-1">ABCDEF</p>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><CgProfile /></span>Copy trader:</span>4917</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><BiLike /></span>Likes:</span>131</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">PNL Rank:</span>2307</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Liq Orders:</span>11</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className=" align-items-center justify-content-center text-center">
                                                            <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            <p className="mb-0 mt-1">ABCDEF</p>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><CgProfile /></span>Copy trader:</span>4917</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><BiLike /></span>Likes:</span>131</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">PNL Rank:</span>2307</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Liq Orders:</span>11</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className=" align-items-center justify-content-center text-center">
                                                            <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            <p className="mb-0 mt-1">ABCDEF</p>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><CgProfile /></span>Copy trader:</span>4917</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><BiLike /></span>Likes:</span>131</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">PNL Rank:</span>2307</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Liq Orders:</span>11</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className=" align-items-center justify-content-center text-center">
                                                            <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            <p className="mb-0 mt-1">ABCDEF</p>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><CgProfile /></span>Copy trader:</span>4917</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><BiLike /></span>Likes:</span>131</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">PNL Rank:</span>2307</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Liq Orders:</span>11</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className=" align-items-center justify-content-center text-center">
                                                            <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            <p className="mb-0 mt-1">ABCDEF</p>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><CgProfile /></span>Copy trader:</span>4917</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><BiLike /></span>Likes:</span>131</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">PNL Rank:</span>2307</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Liq Orders:</span>11</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className=" align-items-center justify-content-center text-center">
                                                            <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            <p className="mb-0 mt-1">ABCDEF</p>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><CgProfile /></span>Copy trader:</span>4917</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey"><span className="me-1 f-12 fc-g "><BiLike /></span>Likes:</span>131</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">PNL Rank:</span>2307</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Liq Orders:</span>11</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        </Swiper>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="deposit-text-1 mb-1">Top Portfolios By 30D ROI</p>
                                        <p className="text-grey">All Portfolios Ranked By 30D ROI</p>
                                    </div>
                                    <div className="d-flex align-items-center fc-g">
                                        <p className="mb-0">View More</p>
                                        <IoMdArrowDropright className="f-22" />
                                    </div>
                                </div>
                                <div className="container-fluid px-0 pb-5">
                                    <div className="row align-items-center g-4">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            loop={true}

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
                                            navigation={true}
                                            modules={[Navigation]}

                                            className="mySwiper px-5  glass-effects-swiper-styling-right "
                                        >

                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        </Swiper>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="deposit-text-1 mb-1">Most Active Portfolios</p>
                                        <p className="text-grey">All Portfolios Ranked By No. Of 30D Orders</p>
                                    </div>
                                    <div className="d-flex align-items-center fc-g">
                                        <p className="mb-0">View More</p>
                                        <IoMdArrowDropright className="f-22" />
                                    </div>
                                </div>
                                <div className="container-fluid px-0 pb-5">
                                    <div className="row align-items-center g-4">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            loop={true}

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
                                            navigation={true}
                                            modules={[Navigation]}

                                            className="mySwiper px-5  glass-effects-swiper-styling-right "
                                        >

                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        </Swiper>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="deposit-text-1 mb-1">Battle Portfolios</p>
                                        <p className="text-grey">Participating Portfolios Of Trading Battle</p>
                                    </div>
                                    <div className="d-flex align-items-center fc-g">
                                        <p className="mb-0">View More</p>
                                        <IoMdArrowDropright className="f-22" />
                                    </div>
                                </div>
                                <div className="container-fluid px-0 pb-5">
                                    <div className="row align-items-center g-4">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            loop={true}

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
                                            navigation={true}
                                            modules={[Navigation]}

                                            className="mySwiper px-5  glass-effects-swiper-styling-right "
                                        >

                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="navigation-slide-styling text-start">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <CgProfile className="trading-page-profile-icon-image me-3" />
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0">ABCDEF</p>
                                                                <p className="text-grey mb-0">ABCDEF</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            {/* ===================================TAB-2================================================================== */}

                            <div class="tab-pane fade copy-tradings-tab-2-active" id="portfolio" role="tabpanel" aria-labelledby="portfolio-tab">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div class="dropdown">
                                        <button class="btn dropdown-bg-styling dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            7D
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">7D</a></li>
                                            <li><a class="dropdown-item" href="#">30D</a></li>
                                            <li><a class="dropdown-item" href="#">90D</a></li>
                                        </ul>
                                    </div>
                                    <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-roi-tab" data-bs-toggle="pill" data-bs-target="#pills-roi" type="button" role="tab" aria-controls="pills-roi" aria-selected="true">7D ROI</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-pnl-tab" data-bs-toggle="pill" data-bs-target="#pills-pnl" type="button" role="tab" aria-controls="pills-pnl" aria-selected="false">7D PNL</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-winrate-tab" data-bs-toggle="pill" data-bs-target="#pills-winrate" type="button" role="tab" aria-controls="pills-winrate" aria-selected="false">7D Win Rate</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-mdd-tab" data-bs-toggle="pill" data-bs-target="#pills-mdd" type="button" role="tab" aria-controls="pills-mdd" aria-selected="false">7D MDD</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-orders-tab" data-bs-toggle="pill" data-bs-target="#pills-orders" type="button" role="tab" aria-controls="pills-orders" aria-selected="false">7D Orders</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-copytraders-tab" data-bs-toggle="pill" data-bs-target="#pills-copytraders" type="button" role="tab" aria-controls="pills-copytraders" aria-selected="false">Copy Traders</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-aum-tab" data-bs-toggle="pill" data-bs-target="#pills-aum" type="button" role="tab" aria-controls="pills-aum" aria-selected="false">AUM</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-runtime-tab" data-bs-toggle="pill" data-bs-target="#pills-runtime" type="button" role="tab" aria-controls="pills-runtime" aria-selected="false">Run Time</button>
                                        </li>
                                    </ul>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Basic Portfolios
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Lite Portfolios
                                        </label>
                                    </div>
                                    <GoSettings className="f-22 fc-g cursor-poniter" data-bs-toggle="modal" data-bs-target="#tradingsettingsModal" />

                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane py-5 fade show active" id="pills-roi" role="tabpanel" aria-labelledby="pills-roi-tab">
                                        <div className="container  px-0">
                                            <div className="row g-4 row-cols-lg-4 row-cols-2">
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ">
                                                    <div className="copytrading-card-css-styling">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <CgProfile className="trading-page-profile-icon-image me-3" />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">ABCDEF</p>
                                                                    <p className="text-grey mb-0">ABCDEF</p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <BiStar className="loan-page-icon-image-table mx-2" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <div className="">
                                                                    <FaCommentDollar className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">USD-M</span>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <CgProfile className="text-grey" />
                                                                    <span className="mx-1 f-13 fw-500">180/250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">113.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 fc-g f-20">21,272.51</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-20">38.14%</p>
                                                                <p className="text-grey">30D ROI</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 f-20">80.80%</p>
                                                                <p className="text-grey">30D PNL</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between align-items-center">
                                                            <div className="">
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">AUM:</span>197,635.12 USD</p>
                                                                <p className="mb-0 f-13 fw-500"><span className="me-2 text-grey">Runtime:</span>65 days</p>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button className='btn  banner-top-button-copy'>
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row mt-4 align-items-center">
                                                <div className="col">
                                                    <p className="mb-0">Updated every 10 minutes.</p>
                                                </div>
                                                <div className="col">
                                                    <nav aria-label="Page navigation example">
                                                        <ul class="pagination">
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" aria-label="Previous">
                                                                    <span aria-hidden="true">&laquo;</span>
                                                                </a>
                                                            </li>
                                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" aria-label="Next">
                                                                    <span aria-hidden="true">&raquo;</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-pnl" role="tabpanel" aria-labelledby="pills-pnl-tab"></div>
                                    <div class="tab-pane fade" id="pills-winrate" role="tabpanel" aria-labelledby="pills-winrate-tab"></div>
                                    <div class="tab-pane fade" id="pills-mdd" role="tabpanel" aria-labelledby="pills-mdd-tab"></div>
                                    <div class="tab-pane fade" id="pills-orders" role="tabpanel" aria-labelledby="pills-orders-tab"></div>
                                    <div class="tab-pane fade" id="pills-copytraders" role="tabpanel" aria-labelledby="pills-copytraders-tab"></div>
                                    <div class="tab-pane fade" id="pills-aum" role="tabpanel" aria-labelledby="pills-aum-tab"></div>
                                    <div class="tab-pane fade" id="pills-runtime" role="tabpanel" aria-labelledby="pills-runtime-tab"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />



            <div class="modal fade" id="tradingsettingsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content border-radius-1em">
                        <div class="modal-header">
                            <h5 class="modal-title f-20" id="exampleModalLabel">More Filters</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="border-bottom pb-3 mb-3 copy-tradings-tab-2-active-modal">
                                <p className="text-black-grey">Margin Assets</p>
                                <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-usdt-tab" data-bs-toggle="pill" data-bs-target="#pills-usdt" type="button" role="tab" aria-controls="pills-usdt" aria-selected="false">USDT</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-busd-tab" data-bs-toggle="pill" data-bs-target="#pills-busd" type="button" role="tab" aria-controls="pills-busd" aria-selected="false">BUSD</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-btc-tab" data-bs-toggle="pill" data-bs-target="#pills-btc" type="button" role="tab" aria-controls="pills-btc" aria-selected="false">BTC</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-eth-tab" data-bs-toggle="pill" data-bs-target="#pills-eth" type="button" role="tab" aria-controls="pills-eth" aria-selected="false">ETH</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-bnb-tab" data-bs-toggle="pill" data-bs-target="#pills-bnb" type="button" role="tab" aria-controls="pills-bnb" aria-selected="false">BNB</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-other-tab" data-bs-toggle="pill" data-bs-target="#pills-other" type="button" role="tab" aria-controls="pills-other" aria-selected="false">Other Coins</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="text-black-grey">Available Portfolios</p>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="text-black-grey">Hide Private Portfolios</p>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                                <p className="text-black-grey">API Trading</p>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                </div>
                            </div>
                            <div className="  copy-tradings-tab-2-active-modal">
                                <p className="text-black-grey">Tags</p>
                                <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="pills-battle-tab" data-bs-toggle="pill" data-bs-target="#pills-battle" type="button" role="tab" aria-controls="pills-battle" aria-selected="true">Trading Battle</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-portfolios-tab" data-bs-toggle="pill" data-bs-target="#pills-portfolios" type="button" role="tab" aria-controls="pills-portfolios" aria-selected="false">7-Day New Portfolios</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex text-center py-3 justify-content-evenly align-items-center">
                                <button className='btn   banner-top-button-reset '>
                                    Reset
                                </button>
                                <button className='btn  banner-top-button-copy'>
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
