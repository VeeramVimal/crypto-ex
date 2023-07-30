import React, { useEffect, useState } from "react";

import "../../assets/style.css";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowRight } from 'react-icons/bs';
import { AiFillCalendar } from 'react-icons/ai';
import DataTable from "react-data-table-component";
import { BiCaretDown } from 'react-icons/bi';
import { useContextData } from "../../core/context/index";
import axios from 'axios';
import Config from "../../core/config/index";
import moment from "moment";



export default function Simpleearn(props) {
  
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));
  const [userearnhistory,setuserearnhistory] = useState([]);
  const [dropdownvalues,setdropdownvalues] = useState([]);
  const [currencyearn,setcurrencyearn] = useState("");

  const { myProfile } = useContextData();

  const columns = [
    {
      id: 1,
      name: "Subscription Date",
      selector: (row) => <span>{moment(row.dateTime).format("YYYY-MM-DD HH:mm") }</span>,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Coin",
      selector: (row) => row.currencysymbol,
      sortable: false,
      reorder: true,
    },
    {
      id: 3,
      name: "Interest",
      selector: (row) => <span>{Number(row.distributeamount).toFixed(8)}</span>,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Locked Days",
      selector: (row) => <span>{row.lockedperioddays} {"Days"}</span>,
      sortable: true,
      reorder: false,
    }
  ];

  const earncurrset = async(event) => {
    if(event.target.value == "") {
      setcurrencyearn("ALL")
    }
    else {
      setcurrencyearn(event.target.value)
    }
  }

  const searchfilterbutton = async() => {
    if(userearnhistory.length == 0 || currencyearn == "ALL") {
      const userids = myProfile?._id;
      const userdetails = { 
        userId: userids
      }
      const vals = (currencyearn).toUpperCase();
      const getuserbal = await axios.post(`${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getusereearnhistory`,userdetails);
      
      const userearnhistory = getuserbal.data.data;
      const filteredearnCurrency = userearnhistory.filter((currency) => currency.currencysymbol.includes(vals));
      setuserearnhistory(filteredearnCurrency)
    } else {
      const vals = (currencyearn).toUpperCase();
      const filteredearnCurrency = userearnhistory.filter((currency) => currency.currencysymbol.includes(vals));
      setuserearnhistory(filteredearnCurrency)
    }
  }

  const getmyearndetails = async() => {
    const userids = myProfile?._id;
    const userdetails = { 
      userId: userids
    }
    const getuserbal = await axios.post(`${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getusereearnhistory`,userdetails);
    setuserearnhistory(getuserbal.data.data)
  }

  const getfrontcurr = async() => {
    const getdropdowncurr = await axios.get(`${Config.SIMPLEEARN_V1_API_URL}simpleEarn/getfrontcurrency`);
    setdropdownvalues(getdropdowncurr.data.data)

  }

  useEffect(() => {
    getmyearndetails()
    getfrontcurr()
  },[])

  useEffect(() => {
    $(".status_change .dropdown-item").click(function () {
      var getStatusText = $(this).text();
      $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
      var generateStatusClass = `${$(this).attr('data-class')}-status`
      $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
    })
  }, []);


  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="simpleearn-top-banner-section">
        <div className="simpleearn-top-value-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <p className="fs-14 mb-1">Earn</p>
                <p className="simpleearn-text-1">Simple Earn History</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-3">
          <div className="row">
            <div className="col-lg-12 accountearn-staking-tabs-section">
              <ul class="nav nav-pills" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-earn-staking-1-tab" data-bs-toggle="pill" data-bs-target="#pills-earn-staking-1" type="button" role="tab" aria-controls="pills-earn-staking-1" aria-selected="true">Locked</button>
                </li>               
              </ul>
            </div>
          </div>
        </div>

        <div className="container my-3">
          <div className="row">
            <div className="col-lg-2">
              <span className="enter-amount-heading">Coin</span>
              <div className="f-group">
                <select className="f-control f-dropdown" placeholder="Select" onChange={earncurrset}>
                  <option value="" selected="selected" className="bg-selection">
                    All
                  </option>
                  {dropdownvalues.map(item => (
                    <option key={item.value} value={item.currencysymbol} className="bg-selection">
                      {item.currencysymbol}
                    </option>
                  ))}
                  {/* <option value="" className="bg-selection">
                    1INCH
                  </option> */}
                </select>
              </div>
            </div>

            <div className="col-lg-2">
              <span className="enter-amount-heading">Type</span>
              <div className="f-group">
                <select className="f-control f-dropdown" placeholder="Select">
                  <option value="" selected="selected" className="bg-selection">
                    Subscription
                  </option>
                  <option value="" className="bg-selection">
                    Redemption
                  </option>
                  <option value="" className="bg-selection">
                    Interest
                  </option>
                </select>
              </div>
            </div>

            <div className="col-lg-4">
              <span className="enter-amount-heading">Type</span>
              <div className="d-flex flex-row p-2 border justify-content-center align-items-center">
                <DatePicker className="datepicker-css-styling"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <BsArrowRight className="mx-3" />
                <DatePicker className="datepicker-css-styling"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
                <AiFillCalendar className="fs-20" />
              </div>
            </div>
            <div className="col-lg-1">
              <div class="d-grid mt-lg-4">
                <button class="btn simpleearn-history-filter-1 mt-1" type="button" onClick={() => searchfilterbutton()}>Search</button>
              </div>
            </div>
            <div className="col-lg-1">
              <div class="d-grid mt-lg-4">
                <button class="btn simpleearn-history-filter-2 mt-1" type="button">Reset</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-3">
          <div className="row">
            <div className="col">
            <DataTable
              columns={columns}
              data={userearnhistory}
              defaultSortFieldId

              sortIcon={<BiCaretDown />}
              pagination
            />

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
