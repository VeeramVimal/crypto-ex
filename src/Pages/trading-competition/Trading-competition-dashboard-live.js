import React, { useEffect, useState } from "react";
import "../../assets/competition.css"
import { GoChevronLeft } from "react-icons/go";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";
import TradingCompetition from "../../assets/images/Trading-Competition.gif";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import { useContextData } from "../../core/context/index";
import Config from "../../core/config/index";
import sharewithfriends from '../../assets/images/sharewith friends.png';
import Countdown from 'react-countdown';
import moment from 'moment';


export default function TradingcompetitiondashboardLive(props) {

    const [currencyssymbol, setcurrencyssymbol] = useState("");
    const [currencyspair, setcurrencyspair] = useState("");
    const [winnerslist, setwinnerslist] = useState([]);
    const [prizelistlength,setprizelistlength] = useState('');
    const [tradedashboard, settradedashboard] = useState([]);
    const [abouttour, setabouttour] = useState("");
    const [timer, setTimer] = useState([0]);
    const [cmsdisclaimer, setcmsdisclaimer] = useState("");
    const [totalprizepool, settotalprizepool] = useState("");
    const [datepool, setdatepool] = useState([]);
    const [livebannerimage,setlivebannerimage] = useState("");
    const [enddatetimer,setenddatetimer] = useState("");
    const { myProfile } = useContextData();

    const columns = [
        {
            name: "Rank",
            selector: row => row.rank,
            sortable: true,
        },
        {
            name: "Rewards",
            selector: row => row.prizepool
        }
    ];

    const columnsdashboard = [
        {
            name: "Rank",
            selector: row => {
                if(row.serial == 1 && prizelistlength >= row.serial) return (<>
                <div className="d-flex align-items-center">
                    <p className="mb-0">{row.serial}</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROpkKcSQoPHvpk4dVzcMNtGWQb5IbjfY5WXb3HzW8GY7vcuR8JyLgpsNpDLueVYruXjCA&usqp=CAU" />
                    </div>
                </>)
                else if(prizelistlength >= row.serial) return (<>
                 <div className="d-flex align-items-center">
                    <p  className="mb-0">{row.serial}</p>
                    <img src="https://ih1.redbubble.net/image.1335564738.6679/st,small,507x507-pad,600x600,f8f8f8.jpg" />
                </div>
                </>)
              },
            width: "80px"
        },
        {
            name: "Email",
            selector: row => row.useremail,
            width: "240px"
        },
        {
            name: "Trades",
            selector: row => row.count
        },
        {
            name: "Volume",
            selector: row => (row.totalvolumeuser).toFixed(8)
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
        setcurrencyssymbol(getcompetiton.data.comp[0].prizetoken)
        const firstarr = getcompetiton.data.comp;
        const secondarr = getcompetiton.data.curren;

        setlivebannerimage(firstarr[0].tradingdashimage)
        const mergedArr = firstarr.map(obj1 => {
            const obj2 = secondarr.find(
                obj2 => obj2.currencySymbol === obj1.tokensymbol
            );
            if (obj2) {
                return { ...obj1, ...obj2 };
            }
            return obj1;
        });
        setprizelistlength((mergedArr[0].winnerslist).length)
        const newYearsDate = new Date(mergedArr[0].tokenenddate);
        const timeStringend = moment(newYearsDate).format("HH:mm");

        const newYearsstartDate = new Date(mergedArr[0].tokenstartdate);
            const timeStringstart = moment(newYearsstartDate).format("HH:mm");
        var userenddate = newYearsDate.getDate();
        var userstartdate = newYearsstartDate.getDate();
        const monthNumberstart = newYearsstartDate.getMonth();
        const monthNumberend = newYearsDate.getMonth();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthNamestart = monthNames[monthNumberstart];
        const monthNameend = monthNames[monthNumberend];
        const mytokenendDate = new Date(mergedArr[0].tokenenddate).getTime() / 1000;
        const currentUnixTime = Math.floor(Date.now() / 1000);
        const totalSeconds = (mytokenendDate - currentUnixTime);
        if (totalSeconds >= 0) {
            const days = Math.floor(totalSeconds / 3600 / 24);
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const mins = Math.floor(totalSeconds / 60) % 60;
            const seconds = Math.floor(totalSeconds) % 60;
            setTimer({ days, hours, mins, seconds });
            setwinnerslist(mergedArr[0].winnerslist)
            setenddatetimer(mergedArr[0].tokenenddate)
            setabouttour(mergedArr[0].tokendescription)
            settotalprizepool(mergedArr[0].prizepool)
            setdatepool({ userstartdate, userenddate, monthNamestart, monthNameend,timeStringend,timeStringstart })
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
                const arr1 = tradespair.data.winnerlist;
                const arr2 = tradespair.data.arraysvol;
                const arr3 = tradespair.data.countarrs;
                setcurrencyssymbol(arr2[0].prizetoken)        
                const sortedArr = arr3.sort((a, b) => b.totalvolumeuser - a.totalvolumeuser)
                    .map((item, index) => ({ ...item, serial: index + 1 }));
                 const foundObj = sortedArr.find(obj => obj.useremail === myProfile?.email);
                if (foundObj) {
                    const index = sortedArr.indexOf(foundObj);
                    sortedArr.splice(index, 1);
                    sortedArr.unshift(foundObj);
                }
                settradedashboard(sortedArr)
            } catch (e) {
                console.log("err")
            }
        }
        const getcmsdata = async () => {
            const getcms = await axios.get(`${Config.TRADINGCOMPETITION_V1_URL}tradecompetion/getcmstandc`);
            setcmsdisclaimer(getcms.data[1].description)
            const splitpath = window.location.href.split("/");
            const currencySymbol = splitpath[4];
            const currencyPair = splitpath[5];
            setcurrencyspair(currencyPair)
        }
        getpairvolume();
        getcmsdata();
    }, [myProfile]);

    useEffect(() => {
      getreferral()
    },[]);

    const handleClick = (event) => {
        var url = `${Config.FRONEND_URL}/spot/` + event.currencyspair
        window.open(url, '_blank');
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>completed</span>
        } else {
          return (
            <div class="countdown-container d-flex flex-wrap gap-4 justify-content-center text-center">
            <div class="countdown-el days-c">
                <p class="big-text">{days}</p>
                <span>DAYS</span>
            </div>
            <div class="countdown-el hours-c">
                <p class="big-text">{hours}</p>
                <span>HOURS</span>
            </div>
            <div class="countdown-el mins-c">
                <p class="big-text">{minutes}</p>
                <span>MINS</span>
            </div>
            <div class="countdown-el seconds-c">
                <p class="big-text">{seconds}</p>
                <span>SECONDS</span>
            </div>
        </div>)
        }
    };

    return (
        <div>
            <NavbarOne setTheme={props.setTheme} theme={props.theme}/>
            <div className="deposit-page-top-banner">
                <div className="deposit-hero-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                <a href="/trading-competition">
                                    <GoChevronLeft className="deposit-back-button-icon" />
                                    <span className="deposit-text-1">Back</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="trading-competion-section py-5">
                <div className="container-fluid col-xl-10 col-lg-12 col-md-12 col-sm-8">
                    <div className="row row-cols-lg-2 row-cols-1 justify-content-between">
                        <div className="col-lg-5">
                            <div className="trading-competion-section-1">
                                <p className="mb-0 competion-text-1">ENDS IN</p>
                                <Countdown
                                    date={new Date(enddatetimer)}
                                    renderer={renderer}
                                />
                                <p className="competion-text-2 my-4">{currencyssymbol} Token</p>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <p className="competion-text-3">Prize pool</p>
                                        <p className="competion-text-4">{totalprizepool} {currencyssymbol}</p>
                                    </div>
                                    <div className="col-lg-7">
                                        <p className="competion-text-3">Dates</p>
                                        <p className="competion-text-4">{datepool.monthNamestart} {datepool.userstartdate} {datepool.timeStringstart}- {datepool.monthNameend} {datepool.userenddate} {datepool.timeStringend}</p>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <p className="competion-text-3">Pairs</p>
                                        <p className="competion-text-5"><span  onClick={() => handleClick({currencyspair})}>{currencyspair}</span>
                                         <span><button className="btn click-here-button mx-2 " onClick={() => handleClick({currencyspair})}>Click Here</button></span>
                                        </p>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="trading-competion-section-1 mt-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <p className="competion-text-1 mb-0">PRIZE FUND</p>
                                    </div>
                                    <div className="col-lg-6 text-lg-end">
                                        <p className="competion-text-1 mb-0">{totalprizepool} {currencyssymbol}</p>
                                    </div>
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={winnerslist}
                                    defaultSortFieldId
                                    noDataComponent=""
                                    pagination={5}
                                    paginationRowsPerPageOptions={[5,10,15,20,25]}
                                    highlightOnHover
                                    theme="solarized"
                                />
                            </div>
                            <div className="trading-competion-section-1 mt-4">
                                <div className="row">
                                    <div className="col">
                                        <p className="competion-text-1 mb-3">ABOUT</p>
                                        <p className="competion-text-6 mb-0" dangerouslySetInnerHTML={{ __html: abouttour }}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="trading-competition-dashboard-column-2-bg" style={{ background: `url(${livebannerimage})` }}>
                                <div className="row align-items-center justify-content-start">
                                    <div className="col-lg-5 mx-4">
                                        {/* <p className="competion-text-7 mb-3">{currencyssymbol} Token ({currencyssymbol})</p> */}
                                        <div className="trading-competion-section-4">
                                            <h5 className="competion-text-2 mt-0 mb-2">Prize pool</h5>
                                            <h4 className="mb-0">{totalprizepool} <span>{currencyssymbol}</span></h4>
                                        
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <p className="competion-text-1 mb-3 mt-2">LEADERBOARD</p>
                            <div className="trading-competion-section-1">
                                <div className="row">
                                    <div className="col">
                                        <DataTable
                                            columns={columnsdashboard}
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