import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/competition.css";
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import $ from "jquery";
import axios from "axios";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Config from "../../core/config/index";
import { useContextData } from "../../core/context/index";

export default function Tradingcompetitioncompletion(props) {
  const [swipedata, setswipedata] = useState([]);
  const [cmsbannertitle, setcmsbannertitle] = useState("");
  const [cmsbannerdescription, setcmsbannerdescription] = useState("");
  const { myProfile } = useContextData();

  useEffect(() => {
    const gettotalvolume = async () => {
      const gettotalvol = await axios.get(
        `${Config.V1_API_URL}tradecompetion/gettotalvolume`
      );
      const getcompetiton = await axios.get(
        `${Config.V1_API_URL}tradecompetion/getcurrencycompetion`
      );
      const firstarr = gettotalvol.data;
      const secondarr = getcompetiton.data;
      const monthpush = [];
      for (var i = 0; i < secondarr.length; i++) {
        var car = {};
        const tokensuserstart = Number(
          (new Date(firstarr[i].dateTime).getTime() / 1000).toFixed()
        );
        const mytokenstartDate =
          new Date(secondarr[i].tokenstartdate).getTime() / 1000;
        const mytokenendDate =
          new Date(secondarr[i].tokenenddate).getTime() / 1000;
        const currentUnixTime = Math.floor(Date.now() / 1000);
        if (currentUnixTime >= mytokenendDate) {
          const currencypair = secondarr[i].currency;
          const tradepair = { currencypair };
          const tradespair = await axios.post(
            `${Config.V1_API_URL}tradecompetion/gettotalvolumeemail`,
            tradepair
          );
          const arr3 = tradespair.data.countarrs;
          if (arr3 == undefined) {
            car["tokensymbol"] = secondarr[i].tokensymbol;
            car["tradeamount"] = firstarr[i].amount;
            car["usdprice"] = firstarr[i].usdPrice;
            car["pairname"] = secondarr[i].currency;
            car["userid"] = firstarr[i].userId;
            car["totalparticipant"] = 0;
            monthpush.push(car);
          } else {
            const sortedArr = arr3
              .sort((a, b) => b.totalvolumeuser - a.totalvolumeuser)
              .map((item, index) => ({ ...item, serial: index + 1 }));
            car["tokensymbol"] = secondarr[i].tokensymbol;
            car["tradeamount"] = firstarr[i].amount;
            car["usdprice"] = firstarr[i].usdPrice;
            car["pairname"] = secondarr[i].currency;
            car["userid"] = firstarr[i].userId;
            car["totalparticipant"] = sortedArr.length;
            monthpush.push(car);
          }
        }
      }
      const countObj = monthpush.reduce((acc, obj) => {
        if (!acc[obj.pairname]) {
          acc[obj.pairname] = {
            ...obj,
            count: 0,
          };
        } else {
          acc[obj.pairname].count++;
        }
        return acc;
      }, {});
      const countArr = Object.values(countObj);
      const mergedArr = countArr.map((obj1) => {
        const obj2 = secondarr.find((obj2) => obj2.currency === obj1.pairname);
        if (obj2) {
          return { ...obj1, ...obj2 };
        }
        return obj1;
      });
      setswipedata(mergedArr);
    };
    const getcmsdata = async () => {
      const getcms = await axios.get(
        `${Config.V1_API_URL}tradecompetion/getcmstandc`
      );
      setcmsbannertitle(getcms.data[2].title);
      setcmsbannerdescription(getcms.data[2].description);
    };
    getcmsdata();
    gettotalvolume();
  }, [myProfile]);

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <a href="/">
                  <GoChevronLeft className="deposit-back-button-icon" />
                  <span className="deposit-text-1">Back</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="trading-competition-banner-section py-5"
        style={{
          background: `url(https://dex-trade.com/img/tournaments-bg.png)`,
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="trading-competition-text-1">{cmsbannertitle}</p>
              <div
                className="trading-competition-text-2 my-5"
                dangerouslySetInnerHTML={{ __html: cmsbannerdescription }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <div className="trading-competion-section py-5">
        <div className="container">
          <div className="row g-4">
            {swipedata.map((item) => (
              //   <Link
              //     to={`/trading-competition-dashboard/${item.tokensymbol}/${item.currency}`}
              //   >
              <div className="col-lg-12">
                <div className="trading-competion-section-1">
                  <div className="row align-items-center">
                    <div className="col-lg-3">
                      <div className="trading-competition-image-1-border-2  pt-2 ">
                        <img
                          className="trading-competition-image-2 "
                          src={item.image}
                          alt="slide1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="d-flex flex-lg-row justify-content-between align-items-center">
                        <div>
                          <span className="trading-competition-text-3">
                            {" "}
                            {item.currency}
                          </span>
                        </div>
                        <div class="countdown-el ms-auto">
                          <p class="big-text w-100">Finished</p>
                        </div>
                      </div>
                      <div className="row  mt-4">
                        <div className="col-lg-6">
                          <div class="row   ">
                            <div class="col steps-section-image">
                              <p class="trading-competition-text-4 mb-1">
                                Prize Pool
                              </p>
                            </div>
                            <div class="col ">
                              <p class="trading-competition-text-4 mb-1">
                                {item.prizepool} {item.prizetoken}
                              </p>
                            </div>
                          </div>
                          <div class="row  mt-3">
                            <div class="col steps-section-image">
                              <p class="trading-competition-text-4 mb-1">
                                Places
                              </p>
                            </div>
                            <div class="col ">
                              <p class="trading-competition-text-4 mb-1">
                                {item.totalwinners}
                              </p>
                            </div>
                          </div>

                          <div class="row mt-3">
                            <div class="col steps-section-image">
                              <p class="trading-competition-text-4 mb-1">
                                Total participants
                              </p>
                            </div>
                            <div class="col ms-auto">
                              <p class="trading-competition-text-4 mb-1">
                                {item.totalparticipant}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-end">
                      <a
                        href={`/trading-competition-dashboard/${item.tokensymbol}/${item.currency}`}
                        class="trading-competition-text-5 mb-1 "
                      >
                        View More <HiOutlineArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              //   </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
