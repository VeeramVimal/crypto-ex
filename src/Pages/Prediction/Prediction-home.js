import React from "react";
import { useEffect } from "react";
import "../../assets/style.css";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { TbLink, TbCircleArrowDownFilled, TbCircleArrowUpFilled } from "react-icons/tb";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";


export default function Prediction(props) {
  useEffect(() => {
    $(document).ready(function () {
      $("#features-dropdown-open").click(function () {
        $(".features-dropdown-hidden").hide();
        $("#features-dropdown-open").hide();
        $("#features-dropdown-close").show();
      });
      $("#features-dropdown-close").click(function () {
        $(".features-dropdown-hidden").show();
        $("#features-dropdown-open").show();
        $("#features-dropdown-close").hide();
      });
      $("#features-chats-section-close").click(function () {
        $(".prediction-page-right-section").css("width", "0%");
        $(".prediction-page-middle-section").css("width", "87%");
      });
    });
  });
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="prediction-page-top-banner">
        <div className="container-fluid p-0">
          <div className="d-flex flex-row">
            <div className="prediction-page-left-section">
              <div className="d-flex flex-row prediction-page-features-section">
                <div>
                  <TbLink className="me-1 prediction-page-text-1" /><span className="prediction-page-text-2">Crypto Futures</span>
                </div>
                <div className="ms-auto">
                  <TbCircleArrowDownFilled id="features-dropdown-close" style={{ cursor: "pointer" }} className="prediction-page-text-3" />
                  <TbCircleArrowUpFilled id="features-dropdown-open" style={{ cursor: "pointer" }} className="prediction-page-text-3" />
                </div>
              </div>
              <ul className="p-0 mt-3 features-dropdown-hidden">
                <li>
                  <div className="d-flex flex-row align-items-center prediction-features-list">
                    <div>
                      <img className="prediction-page-image-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="Futures" />
                    </div>
                    <div>
                      <span className="prediction-page-text-4">BTC</span>
                    </div>
                    <div className="ms-auto">
                      <span className="prediction-page-text-4">26.34554<MdKeyboardDoubleArrowDown className="prediction-page-text-5" style={{ color: "lightgreen" }} /></span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-row align-items-center prediction-features-list">
                    <div>
                      <img className="prediction-page-image-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="Futures" />
                    </div>
                    <div>
                      <span className="prediction-page-text-4">BTC</span>
                    </div>
                    <div className="ms-auto">
                      <span className="prediction-page-text-4">26.34554<MdKeyboardDoubleArrowDown className="prediction-page-text-5" style={{ color: "red" }} /></span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="prediction-page-middle-section">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="prediction-page-middle-slider">
                    <div className="prediction-page-middle-slider-inner text-white">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <h5 className="prediction-text-3 mb-3">Unranked</h5>
                          <div className="d-flex flex-row">
                            <p className="prediction-text-4"><span className="prediction-text-5">$0.00</span><span className="mx-1">/</span><span></span>$10k</p>
                            <p className="prediction-text-4 ms-4"><span className="prediction-text-5">Next:</span><span className="mx-2"><img className="prediction-image-medal" src="https://rollbit.com/static/media/Icon%201%20(bronze).bf32a24f82022f74e1b1.png" alt="medal" /></span><span></span>$10k</p>
                          </div>
                          <div className="prediction-total-rewards">
                            <span className="prediction-text-4">Total Rewarded: <span>$0.00</span></span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="d-flex flex-row align-items-end">
                            <div className="prediction-caro-1">
                              <BiLeftArrow className="prediction-caro-icon" data-bs-target="#carouselExampleControls" data-bs-slide="prev" />
                            </div>
                            <div className="prediction-caro-2">
                              <div id="carouselExampleControls" class="carousel slide text-center" data-bs-ride="carousel" data-interval="false">
                                <div class="carousel-inner">
                                  <div class="carousel-item active">
                                    <img src="https://rollbit.com/static/media/sidebets.4346476978708a536997.webp" alt="SIDEBETS" />
                                    <h5 className="prediction-text-6">CASINO SIDEBETS</h5>
                                    <p className="prediction-text-7 mb-0">Rollbit Exclusive, bet on outcome of slot spins</p>
                                  </div>
                                  <div class="carousel-item">
                                    <img src="https://rollbit.com/static/media/sidebets.4346476978708a536997.webp" alt="SIDEBETS" />
                                    <h5 className="prediction-text-6">CASINO SIDEBETS</h5>
                                    <p className="prediction-text-7 mb-0">Rollbit Exclusive, bet on outcome of slot spins</p>
                                  </div>
                                  <div class="carousel-item">
                                    <img src="https://rollbit.com/static/media/sidebets.4346476978708a536997.webp" alt="SIDEBETS" />
                                    <h5 className="prediction-text-6">CASINO SIDEBETS</h5>
                                    <p className="prediction-text-7 mb-0">Rollbit Exclusive, bet on outcome of slot spins</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="prediction-caro-3">
                              <BiRightArrow className="prediction-caro-icon" data-bs-target="#carouselExampleControls" data-bs-slide="next" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-lg-10">
                  <div className="d-flex flex-row">
                    <div>
                      <TbLink className="me-1 prediction-page-text-1" /><span className="prediction-page-text-2">Crypto Futures</span>
                    </div>
                    <div className="ms-auto">
                      <BiLeftArrow className="prediction-caro-icon prediction-caro-icon-2 me-2 image-swiper-button-prev" />
                      <BiRightArrow className="prediction-caro-icon prediction-caro-icon-2 image-swiper-button-next" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      navigation={{
                        nextEl: ".image-swiper-button-next",
                        prevEl: ".image-swiper-button-prev",
                        disabledClass: "swiper-button-disabled"
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 6,
                          spaceBetween: 10,
                        },
                      }}
                      modules={[Navigation]}
                      className="mySwiper">
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-card">
                        <div>
                          <div className="swiper-card-logo text-center"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="logo" /></div>
                          <p className="prediction-text-8">BTC</p>
                          <p className="prediction-text-9">26,430.84</p>
                          <p className="prediction-text-10">-2.4%</p>
                          <div className="prediction-swiper-card-button">
                            <span>1000x Leverage</span>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>


              <div className="row justify-content-center mt-4">
                <div className="col-lg-10">
                  <div className="d-flex flex-row">
                    <div>
                      <TbLink className="me-1 prediction-page-text-1" /><span className="prediction-page-text-2">BETS</span>
                    </div>
                    <div className="ms-auto">
                      <div className="prediction-bets-tabs-section">
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                          <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-all-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-all-bets" type="button" role="tab" aria-controls="pills-all-bets" aria-selected="true">All Bets</button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-high-rollers-tab" data-bs-toggle="pill" data-bs-target="#pills-high-rollers" type="button" role="tab" aria-controls="pills-high-rollers" aria-selected="false">High Rollers</button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-lucky-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-lucky-bets" type="button" role="tab" aria-controls="pills-lucky-bets" aria-selected="false">Lucky Bets</button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-Trades-tab" data-bs-toggle="pill" data-bs-target="#pills-Trades" type="button" role="tab" aria-controls="pills-Trades" aria-selected="false">Trades</button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-my-bets-tab" data-bs-toggle="pill" data-bs-target="#pills-my-bets" type="button" role="tab" aria-controls="pills-my-bets" aria-selected="false">My Bets</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="prediction-bets-table-section">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col" className="bets-table-1">Game</th>
                            <th scope="col" className="bets-table-2">Player/Clan</th>
                            <th scope="col" className="bets-table-3">Time</th>
                            <th scope="col" className="bets-table-4">Wager</th>
                            <th scope="col" className="bets-table-5">Multiplier</th>
                            <th scope="col" className="bets-table-6">Payout</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="bets-tablebd-1">
                              <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/game-images/pragmaticexternal_DragonHero.webp" alt="player logo" />
                              Toro Shogun
                              </div>
                            </td>
                            <td className="bets-tablebd-2">
                            <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/static/media/Icon%205%20(bronze).02a5b52e9243073e0204.png" alt="player logo" />
                              Happpyyyy
                              </div>
                            </td>
                            <td className="bets-tablebd-3">4s</td>
                            <td className="bets-tablebd-4">$30.00</td>
                            <td className="bets-tablebd-5">0.00x</td>
                            <td className="bets-tablebd-6">@$23.435</td>
                          </tr>
                          <tr>
                            <td className="bets-tablebd-1">
                              <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/game-images/pragmaticexternal_DragonHero.webp" alt="player logo" />
                              Toro Shogun
                              </div>
                            </td>
                            <td className="bets-tablebd-2">
                            <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/static/media/Icon%205%20(bronze).02a5b52e9243073e0204.png" alt="player logo" />
                              Happpyyyy
                              </div>
                            </td>
                            <td className="bets-tablebd-3">4s</td>
                            <td className="bets-tablebd-4">$30.00</td>
                            <td className="bets-tablebd-5">0.00x</td>
                            <td className="bets-tablebd-6">@$23.435</td>
                          </tr>
                          <tr>
                            <td className="bets-tablebd-1">
                              <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/game-images/pragmaticexternal_DragonHero.webp" alt="player logo" />
                              Toro Shogun
                              </div>
                            </td>
                            <td className="bets-tablebd-2">
                            <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/static/media/Icon%205%20(bronze).02a5b52e9243073e0204.png" alt="player logo" />
                              Happpyyyy
                              </div>
                            </td>
                            <td className="bets-tablebd-3">4s</td>
                            <td className="bets-tablebd-4">$30.00</td>
                            <td className="bets-tablebd-5">0.00x</td>
                            <td className="bets-tablebd-6">@$23.435</td>
                          </tr>
                          <tr>
                            <td className="bets-tablebd-1">
                              <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/game-images/pragmaticexternal_DragonHero.webp" alt="player logo" />
                              Toro Shogun
                              </div>
                            </td>
                            <td className="bets-tablebd-2">
                            <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/static/media/Icon%205%20(bronze).02a5b52e9243073e0204.png" alt="player logo" />
                              Happpyyyy
                              </div>
                            </td>
                            <td className="bets-tablebd-3">4s</td>
                            <td className="bets-tablebd-4">$30.00</td>
                            <td className="bets-tablebd-5">0.00x</td>
                            <td className="bets-tablebd-6">@$23.435</td>
                          </tr>
                          <tr>
                            <td className="bets-tablebd-1">
                              <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/game-images/pragmaticexternal_DragonHero.webp" alt="player logo" />
                              Toro Shogun
                              </div>
                            </td>
                            <td className="bets-tablebd-2">
                            <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/static/media/Icon%205%20(bronze).02a5b52e9243073e0204.png" alt="player logo" />
                              Happpyyyy
                              </div>
                            </td>
                            <td className="bets-tablebd-3">4s</td>
                            <td className="bets-tablebd-4">$30.00</td>
                            <td className="bets-tablebd-5">0.00x</td>
                            <td className="bets-tablebd-6">@$23.435</td>
                          </tr>
                          <tr>
                            <td className="bets-tablebd-1">
                              <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/game-images/pragmaticexternal_DragonHero.webp" alt="player logo" />
                              Toro Shogun
                              </div>
                            </td>
                            <td className="bets-tablebd-2">
                            <div className="d-flex flex-row align-items-center">
                                <img src="https://rollbit.com/static/media/Icon%205%20(bronze).02a5b52e9243073e0204.png" alt="player logo" />
                              Happpyyyy
                              </div>
                            </td>
                            <td className="bets-tablebd-3">4s</td>
                            <td className="bets-tablebd-4">$30.00</td>
                            <td className="bets-tablebd-5">0.00x</td>
                            <td className="bets-tablebd-6">@$23.435</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="prediction-page-right-section position-relative">
              <div className="prediction-padding-right">
                <div className="d-flex flex-row prediction-page-features-section align-items-center prediction-page-right-1">
                  <div>
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-chat-tab" data-bs-toggle="pill" data-bs-target="#pills-chat" type="button" role="tab" aria-controls="pills-chat" aria-selected="true">Chat</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-trades-tab" data-bs-toggle="pill" data-bs-target="#pills-trades" type="button" role="tab" aria-controls="pills-trades" aria-selected="false">Trades</button>
                      </li>
                    </ul>
                  </div>
                  <div className="ms-auto">
                    <AiOutlineCloseCircle id="features-chats-section-close" style={{ cursor: "pointer" }} className="prediction-page-text-3" />
                  </div>
                </div>
                <div className="prediction-page-right-2">
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab" tabindex="0">
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="pills-trades" role="tabpanel" aria-labelledby="pills-trades-tab" tabindex="0">
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                      <div className="prediction-chat-section">
                        <img className="prediction-image-1" src="https://rollbit.com/static/media/Icon%204%20(gold).f4e2ce04577a1bca3964.png" alt="user" /><span className="prediction-text-1">thud:</span><span className="prediction-text-2">Lorem ipsum is placeholder text commonly used in the graphic, print.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prediction-page-right-3">
                <div className="d-flex flex-row prediction-page-features-section-2 align-items-center">
                  <div>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="login to chat" aria-label="Username" aria-describedby="basic-addon1" />
                      <span class="input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Footer />
    </div>
  );
}
