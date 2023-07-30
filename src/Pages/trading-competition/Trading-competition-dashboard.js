import React, { useEffect, useState } from "react";
import "../../assets/competition.css"
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import $ from "jquery";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import { useContextData } from "../../core/context/index";
import Config from "../../core/config/index";


export default function Tradingcompetitiondashboard(props) {

  const [currenciesSymbol, setcurrenciesSymbol] = useState("");
  const [arraymerge, setarraymerge] = useState([]);
  const [prizelistlength,setprizelistlength] = useState('0');
  const [abouttour, setabouttour] = useState("");
  const [totalsparticipant, settotalsparticipant] = useState("-");
  const { myProfile } = useContextData();
  const [tradedashboard, settradedashboard] = useState([]);
  const [cmsdisclaimer, setcmsdisclaimer] = useState("");
  const [uservolumetrade, setuservolumetrade] = useState("-");

  const columns = [
    {
      name: "sno",
      selector: row => {
        if(row.serial == 1 && prizelistlength >= row.serial ) return (<>
          <div className="d-flex align-items-center">
            <p className="mb-0">{row.serial}</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROpkKcSQoPHvpk4dVzcMNtGWQb5IbjfY5WXb3HzW8GY7vcuR8JyLgpsNpDLueVYruXjCA&usqp=CAU" />
          </div>
        </>)
         else if(prizelistlength >= row.serial) return (<>
          <div className="d-flex align-items-center">
            <p className="mb-0">{row.serial}</p>
            <img src="https://ih1.redbubble.net/image.1335564738.6679/st,small,507x507-pad,600x600,f8f8f8.jpg"/>
          </div>
        </>)
      },
      width: "140px"
    },
    {
      name: "Email",
      selector: row => row.useremail,
      width: "320px"
    },
    {
      name: "Trades",
      selector: row => row.count,
      width: "350px"
    },
    {
      name: "Volume",
      selector: row => row.totalvolumeuser
    }
  ];

  createTheme(
    "solarized",
    {
      context: {
        background: "red",
        text: "red"
      },
      divider: {
        default: "#ccc"
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)"
      },
      striped: {
        default: "red"
      }
    },
    "dark"
  );

  const getreferral = async () => {
    const splitpath = window.location.href.split("/");
    const currencySymbol = splitpath[4];

    const setdata = { currencySymbol };
    const getcompetiton = await axios.post(
      `${Config.TRADINGCOMPETITION_V1_URL}tradecompetion/getcurrencycompdash`,
      setdata
    );
    const firstarr = getcompetiton.data.comp;
    const secondarr = getcompetiton.data.curren;
    const mergedArr = firstarr.map(obj1 => {
      const obj2 = secondarr.find(
        obj2 => obj2.currencySymbol === obj1.tokensymbol
      );
      if (obj2) {
        return { ...obj1, ...obj2 };
      }
      return obj1;
    });
    const newYearsDate = new Date(mergedArr[0].tokenenddate);
    const currentDate = new Date();
    const totalSeconds = (newYearsDate - currentDate) / 1000;
    setprizelistlength((mergedArr[0].winnerslist).length)
    if (totalSeconds >= 0) {
      setarraymerge(mergedArr[0]);
      setcurrenciesSymbol(firstarr[0].prizetoken);
      setabouttour(mergedArr[0].tokendescription)
    } else {
      setarraymerge(mergedArr[0]);
      setcurrenciesSymbol(firstarr[0].prizetoken);
      setabouttour(mergedArr[0].tokendescription)
    }
  };

  useEffect(() => {
    const getpairvolume = async () => {
      try {
        const splitpath = window.location.href.split("/");
        const currencypair = splitpath[5];
        const tradepair = { currencypair }
        const tradespair = await axios.post(
          `${Config.TRADINGCOMPETITION_V1_URL}tradecompetion/gettotalvolumeemail`,
          tradepair
        );
        const arr3 = tradespair.data.countarrs;
        const sortedArr = arr3.sort((a, b) => b.totalvolumeuser - a.totalvolumeuser)
            .map((item, index) => ({ ...item, serial: index + 1 }));
          const foundObj = sortedArr.find(obj => obj.useremail === myProfile?.email);
        if (foundObj) {
          const index = sortedArr.indexOf(foundObj);
          sortedArr.splice(index, 1);
          sortedArr.unshift(foundObj);
        }
        settotalsparticipant(sortedArr.length)
        settradedashboard(sortedArr)
        const foundObjuservolume = arr3.find(obj => obj.useremail === myProfile?.email);
        setuservolumetrade((foundObjuservolume.totalvolumeuser).toFixed(2))
      } catch (e) {
        console.log("err")
      }
    }
    getpairvolume();
  }, [myProfile]);

  useEffect(() => {
    const getcmsdata = async () => {
      const getcms = await axios.get(`${Config.V1_API_URL}tradecompetion/getcmstandc`);
      setcmsdisclaimer(getcms.data[1].description)
    }
    getcmsdata();
    getreferral();
  }, []);

  return (
    <div>
      <NavbarOne setTheme={props.setTheme} theme={props.theme} />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <a href="/trading-competition-completion">
                  <GoChevronLeft className="deposit-back-button-icon" />
                  <span className="deposit-text-1">Back</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trading-competion-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="trading-competion-section-1">
                <div className="row">
                  <div className="col-lg-4">
                    <img
                      src={arraymerge.image}
                      style={{ width: 180, height: 180 }}
                      alt="slide1"
                    />
                  </div>
                  <div className="col-lg-8">
                    <div className="d-flex flex-lg-row align-items-center">
                      <div>
                        <span className="trading-competition-text-3">
                          {arraymerge.currencyName}
                        </span>
                      </div>
                      <div class="countdown-container bg-transparent d-flex gap-4 justify-content-center text-center ms-auto">
                        <div class="countdown-el days-c">
                          <p class="big-text">
                            COMPLETED
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-6">
                        <div class="d-flex flex-row px-lg-4 px-2 ">
                          <div class="steps-section-image">
                            <p class="trading-competition-text-4 mb-1">
                              Prize Pool
                            </p>
                          </div>
                          <div class="ms-auto">
                            <p class="trading-competition-text-4 mb-1">
                              {arraymerge.prizepool} {currenciesSymbol}
                            </p>
                          </div>
                        </div>
                        <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                          <div class="steps-section-image">
                            <p class="trading-competition-text-4 mb-1">
                              Places
                            </p>
                          </div>
                          <div class="ms-auto">
                            <p class="trading-competition-text-4 mb-1">
                              {arraymerge.totalwinners}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3 mt-lg-0">
                        <div class="d-flex flex-row px-lg-4 px-2">
                          <div class="steps-section-image">
                            <p class="trading-competition-text-4 mb-1">
                              My Trade Volume
                            </p>
                          </div>
                          <div class="ms-auto">
                            <p class="trading-competition-text-4 mb-1">{uservolumetrade}</p>
                          </div>
                        </div>
                        <div class="d-flex flex-row px-lg-4 px-2 mt-3">
                          <div class="steps-section-image">
                            <p class="trading-competition-text-4 mb-1">
                              Total participants
                            </p>
                          </div>
                          <div class="ms-auto">
                            <p class="trading-competition-text-4 mb-1">{totalsparticipant}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <p className="competion-text-1 mb-3 mt-5">LEADERBOARD</p>
              <div className="trading-competion-section-1">
                <div className="row">
                  <div className="col">
                    <DataTable
                      columns={columns}
                      data={tradedashboard}
                      defaultSortFieldId
                      noDataComponent=""
                      pagination={5}
                      paginationRowsPerPageOptions={[5,10,15,20,25]}
                      highlightOnHover
                      theme="solarized"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="trading-competion-section-1 mt-4">
                <p className="competion-text-1 mb-3">
                  About Tournament
                </p>
                <div className="row">
                  <div className="col-lg-6" dangerouslySetInnerHTML={{ __html: abouttour }}>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="trading-competion-section-1 mt-4">
                <div className="row">
                  <div className="col">
                    <p className="competion-text-1 mb-3">DISCLAIMER</p>

                    <div className="row" dangerouslySetInnerHTML={{ __html: cmsdisclaimer }}>
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