import React, { useEffect, useState } from "react";
import "../../assets/competition.css"
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import moment from 'moment';

import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import $ from "jquery";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { useContextData } from "../../core/context/index";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Config from "../../core/config/index";
import tradingcompetitionbg from '../../assets/images/trading-competition-bg.png';
import Countdown from 'react-countdown';

export default function Tradingcompetitionbanner(props) {

  const [swipedata, setswipedata] = useState([]);
  const [cmsdes, setcmsdes] = useState("");
  const [cmsbannertitle, setcmsbannertitle] = useState("");
  const [cmsbannerdescription, setcmsbannerdescription] = useState("");
  const { myProfile } = useContextData();
  const [emailaddress,setemailaddress] = useState("");
  const [enddatetimer,setenddatetimer] = useState("");

  const gettotalvolume = async () => {
    const gettotalvol = await axios.get(`${Config.V1_API_URL}tradecompetion/gettotalvolume`);
    const getcompetiton = await axios.get(`${Config.V1_API_URL}tradecompetion/getcurrencycompetion`)
    const firstarr = gettotalvol.data;
    const secondarr = getcompetiton.data;

      if(firstarr.length <= 0 ) {
        const monthpush = []
        for (var i = 0; i < secondarr.length; i++) {
          var car = {}
          const mytokenendDates = new Date(secondarr[i].tokenenddate);
          const mytokenstartDate = new Date(secondarr[i].tokenstartdate).getTime() / 1000;
          const mytokenendDate = new Date(secondarr[i].tokenenddate).getTime() / 1000;
          const currentUnixTime = Math.floor(Date.now() / 1000);
          const currencypair = secondarr[i].currency;
            const tradepair = { currencypair }
            const tradespair = await axios.post(
              `${Config.V1_API_URL}tradecompetion/gettotalvolumeemail`,
              tradepair
            );
          if (currentUnixTime >= mytokenstartDate && currentUnixTime <= mytokenendDate) {
            const arr3 = tradespair.data.countarrs;
            if(myProfile?.email == undefined) {
              car["setuservolumne"] = 0
            } else {
              const foundObjuservolume = arr3.find(obj => obj.useremail === myProfile?.email);
              car["setuservolumne"] = (foundObjuservolume.totalvolumeuser).toFixed(2)
            }
            if(arr3 == undefined) {
              car["totalparticipant"] = 0
            } 
            else {
              var sortedArr = arr3.sort((a, b) => b.totalvolumeuser - a.totalvolumeuser)
                .map((item, index) => ({ ...item, serial: index + 1 }));
                car["totalparticipant"] = sortedArr.length
            }
            const totalSeconds = (mytokenendDate - currentUnixTime);
            const endTime = moment(mytokenendDates).format('Do MMMM YYYY, h:mm:ss a');
            car["tokensymbol"] = secondarr[i].tokensymbol
            car["image"] = secondarr[i].image
            car["prizepool"] = secondarr[i].prizepool
            car["totalwinners"] = secondarr[i].totalwinners
            car["pairname"] = secondarr[i].currency
            car ["competitionimage"] = secondarr[i].competitionimage
            car["endtime"] = endTime
            car["status"] = "Active"
            car["totalparticipant"] = sortedArr.length
            car["enddatetimer"] = secondarr[i].tokenenddate
            monthpush.push(car)
          }
          else if (currentUnixTime <= mytokenstartDate) { 
            const currencypair = secondarr[i].currency;
            const tradepair = { currencypair }
            const tradespair = await axios.post(
              `${Config.V1_API_URL}tradecompetion/gettotalvolumeemail`,
              tradepair
            );
            const arr3 = tradespair.data.countarrs;
            const totalSeconds = (mytokenstartDate - currentUnixTime);
            const endTime = moment(mytokenendDates).format('Do MMMM YYYY, h:mm:ss a');
            car["tokensymbol"] = secondarr[i].tokensymbol
            car["image"] = secondarr[i].image
            car["prizepool"] = secondarr[i].prizepool
            car["totalwinners"] = secondarr[i].totalwinners
            car["pairname"] = secondarr[i].currency
            car ["competitionimage"] = secondarr[i].competitionimage
            car["endtime"] = endTime
            car["status"] = "Upcoming"
            car["totalparticipant"] = sortedArr.length
            car["enddatetimer"] = secondarr[i].tokenstartdate
            car["totalparticipant"] = 0
            car["setuservolumne"] = 0
            monthpush.push(car)
          }
        }
        setswipedata(monthpush)
      } 
      else {
        const monthpush = []
        for (var i = 0; i < secondarr.length; i++) {
          var car = {}
          const mytokenendDates = new Date(secondarr[i].tokenenddate);
          setenddatetimer(secondarr[i].tokenenddate)
          const tokensuserstart = Number((new Date(firstarr[i].dateTime).getTime() / 1000).toFixed());
          const mytokenstartDate = new Date(secondarr[i].tokenstartdate).getTime() / 1000;
          const mytokenendDate = new Date(secondarr[i].tokenenddate).getTime() / 1000;
          const currentUnixTime = Math.floor(Date.now() / 1000);
           
          if (currentUnixTime >= mytokenstartDate && currentUnixTime <= mytokenendDate) { 
            const totalSeconds = (mytokenendDate - currentUnixTime);
            if (totalSeconds > 0) {
              const currencypair = secondarr[i].currency;
              const tradepair = { currencypair }
              const tradespair = await axios.post(
                `${Config.V1_API_URL}tradecompetion/gettotalvolumeemail`,
                tradepair
              );
              const arr3 = tradespair.data.countarrs;
              if(myProfile?.email != undefined) {
                if(arr3 == undefined) {
                  car["setuservolumne"] = 0
                } else {
                  const foundObjuservolume = arr3.find(obj => obj.useremail === myProfile?.email);
                  if(foundObjuservolume) {
                    car["setuservolumne"] = (foundObjuservolume.totalvolumeuser).toFixed(2)
                  }
                }
              } 
              else {
                car["setuservolumne"] = 0
              }
              if(arr3 == undefined) {
                car["totalparticipant"] = 0
              } 
              else {
                var sortedArr = arr3.sort((a, b) => b.totalvolumeuser - a.totalvolumeuser)
                  .map((item, index) => ({ ...item, serial: index + 1 }));
                car["totalparticipant"] = sortedArr.length
              }
              const endTime = moment(mytokenendDates).format('Do MMMM YYYY, h:mm:ss a');
              car["tokensymbol"] = secondarr[i].tokensymbol
              car["tradeamount"] = firstarr[i].amount
              car["usdprice"] = firstarr[i].usdPrice
              car["pairname"] = secondarr[i].currency
              car ["competitionimage"] = secondarr[i].competitionimage
              car["userid"] = firstarr[i].userId
              car["endtime"] = endTime
              car["status"] = "Active"
              car["enddatetimer"] = secondarr[i].tokenenddate
              monthpush.push(car)
            }
          }
          else if (currentUnixTime <= mytokenstartDate) { 
            const mytokenstartDates = new Date(secondarr[i].tokenstartdate)
            const totalSeconds = (mytokenstartDate - currentUnixTime);
            const startTime = moment(mytokenstartDates).format('Do MMMM YYYY, h:mm:ss a');
            car["tokensymbol"] = secondarr[i].tokensymbol
            car["image"] = secondarr[i].image
            car["prizepool"] = secondarr[i].prizepool
            car["totalwinners"] = secondarr[i].totalwinners
            car["pairname"] = secondarr[i].currency
            car ["competitionimage"] = secondarr[i].competitionimage
            car["status"] = "Upcoming"
            car["startdate"] = startTime
            car["totalparticipant"] = 0
            car["setuservolumne"] = 0
            car["enddatetimer"] = secondarr[i].tokenstartdate
            monthpush.push(car)
          }
        }
        const countObj = monthpush.reduce((acc, obj) => {
          if (!acc[obj.pairname]) {
            acc[obj.pairname] = {
              ...obj,
              count: 0
            };
          } else {
            acc[obj.pairname].count++;
          }
          return acc;
        }, {});
        const countArr = Object.values(countObj);
        const mergedArr = countArr.map(obj1 => {
          const obj2 = secondarr.find(
            obj2 => obj2.currency === obj1.pairname
          );
          if (obj2) {
            return { ...obj1, ...obj2 };
          }
          return obj1;
        });
        const activeItems = mergedArr.filter((item) => item.status === "Active");
        const nonActiveItems = mergedArr.filter((item) => item.status !== "Active");
        const newmergedArr = [...activeItems, ...nonActiveItems];
        setswipedata(newmergedArr)
      }
  }

  useEffect(() => {
    gettotalvolume();
    const getcmsdata = async () => {
      const getcms = await axios.get(`${Config.V1_API_URL}tradecompetion/getcmstandc`);
      setcmsdes(getcms.data[0].description)
      setcmsbannertitle(getcms.data[2].title)
      setcmsbannerdescription(getcms.data[2].description)
    }
    getcmsdata();
  }, [myProfile])


  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>completed</span>
    } else {
      return (
        <div className="col ">
          <div className="ms-auto left-days-card-section ">
          <div class="d-flex flex-row gap-1 justify-content-center">
            <div class="">
              {days}
              <span>D</span>
            </div>
            <div class="">
              {hours}
              <span>H</span>
            </div>
            <div class="">
              {minutes}
              <span>M</span>
            </div>
            <div class="">
              {seconds}
              <span>S</span>
            </div>
          </div>
          </div>
        </div>)
    }
};

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

      <section className="trading-competition-banner-section pt-5" style={{ background: `url(${tradingcompetitionbg})` }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="trading-competition-text-1">
                {cmsbannertitle}
              </h1>
              <div className="trading-competition-text-2 my-5 fw-600" dangerouslySetInnerHTML={{ __html: cmsbannerdescription }}>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================DESIGN-CHANGE=========================================== */}
      {swipedata.map((item) =>
        <section key={item.i} >
          <div className="container col-10">
            <div className="trading-competion-section-1-box mb-4">
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-3 text-center align-items-start">
                  <div className="trading-competition-banner-column-2-bg " style={{ backgroundImage: `url(${item.competitionimage})` }}>
                    <p className="active-button-styling mb-0 mx-2">{item.status}</p>
                    {/* <img
                      className="trading-competition-image-1 mx-auto"
                      src={item.image}
                      alt="slide1"
                    /> */}
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="border-bottom py-4">
                    <div className="row row-cols-lg-2 row-cols-2 justify-content-between align-items-center">
                      <div className="col ps-0">
                       <span className="trading-competition-text-3">
                        {item.currency}
                      </span>
                      </div>
                      <Countdown
                          date={new Date(item.enddatetimer)}
                          renderer={renderer}
                      />
                    </div>
                    <div className="col-9 mt-4">
                      <div className="row row-cols-lg-2 row-cols-1  gx-5 justify-content-between align-items-center">
                        <div class="col row justify-content-between  align-items-center">
                          <div class="col">
                            <p class="f-12 mb-0">
                              Prize Pool
                            </p>
                          </div>
                          <div class="col">
                            <p class="f-16 fw-600  mb-0">
                              {item.prizepool} {item.prizetoken}
                            </p>
                          </div>
                        </div>
                        <div class="col row  justify-content-between  align-items-center">
                          <div class="col">
                            <p class="f-12 mb-0">
                              My Trade Volume
                            </p>
                          </div>
                          <div class="col">
                            <p class="f-16 fw-600 mb-0">
                              {item.setuservolumne?item.setuservolumne:'-'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row row-cols-lg-2 row-cols-1  gx-5 justify-content-between align-items-center">
                        <div class="col row justify-content-between  align-items-center">
                          <div class="col">
                            <p class="f-12 mb-0">
                              Places
                            </p>
                          </div>
                          <div class="col">
                            <p class="f-16 fw-600  mb-0">
                              {item.totalwinners}
                            </p>
                          </div>
                        </div>
                        <div class="col row justify-content-between  align-items-center">
                          <div class="col">
                            <p class="f-12 mb-0">
                              Total participants
                            </p>
                          </div>
                          <div class="col">
                            <p class="f-16 fw-600 mb-0">
                              {item.totalparticipant}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-lg-2 row-cols-1 px-0 mx-0 gx-5 justify-content-between align-items-center">
                  {item.status == "Active" ?
                    <div class="col ps-0 d-flex pt-4 flex-row   align-items-center">
                      <div class="">
                        <p class="f-14 mb-0">
                          Ends on:
                        </p>
                      </div>
                      <div class="mx-3">
                        <p class="f-12 fw-500  mb-0">
                          {item.endtime}
                        </p>
                      </div>
                    </div>
                    :
                      <div class="col ps-0 d-flex pt-4 flex-row justify-content-between  align-items-center">
                        <div class="">
                          <p class="f-14 mb-0">
                            Starts on:
                          </p>
                        </div>
                        <div class="">
                          <p class="f-12 fw-500  mb-0">
                            {item.startdate}
                          </p>
                        </div>
                      </div>
                    }
                    <div className="col text-lg-end ps-0">
                    {item.status == "Active" ?
                      <a href={`/trading-competition-dashboard-live/${item.tokensymbol}/${item.currency}`}
                        class="trading-competition-text-5 mb-1 ">
                        View More <HiOutlineArrowRight />
                      </a>
                      :""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container pb-5">
        <div className="row">
          <div className="col">
            <div className="trading-competion-section-1 mt-4">
              <p className="competion-text-1 mb-3">
                TRADING COMPETITION TERMS AND CONDITIONS
              </p>
              <div className="row">
                <div dangerouslySetInnerHTML={{ __html: cmsdes }}>
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