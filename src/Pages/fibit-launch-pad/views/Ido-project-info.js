import { useLocation } from "react-router-dom";
import {AiOutlineSearch} from 'react-icons/ai';
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
// import "../../../assets/ido-style.css";
import { useContextData } from "../../../core/context";
import "../assets/styles/ido-style.css";
import Config from '../../../core/config/index';
import LaunchPadTableComp from "./launchPadSingleProject";
import $ from 'jquery';

function IdoProjectInfo() {
    const { state } = useLocation();
    const { myProfile } = useContextData();
    const maxProjectInfo = 80; //** get the project information that is shorter than desired length */
    const [userData, setUserData] = useState([]);
    const [tokenCount, setTokenCount] = useState(0);
    const [searchWallet, setSearchWallet] = useState("");
    
    useEffect(() => {
        if (state && state.userDetails) {
            let Count = [];
            setUserData(state.userDetails.msg);
            let totalCount = state.userDetails.msg;
            for(let i = 0; i < totalCount.length; i++) {
                let cnt = totalCount[i].numberOfToken;
                Count.push(Number(cnt));
            }
            let total = sumArray(Count);
            setTokenCount(total);
        }
    }, [myProfile]);
    function sumArray(array) {
        let sum = 0;
      
        /*loop over array and add each item to sum
         */
        array.forEach(item => {
            sum += item;
        });
        // return the result
        return sum;
    }

    const handleSearch = (e) =>{
        try {
          let searchVal = e.target.value;
          if(searchVal!= "") {
            searchVal = searchVal.replace(/[^a-zA-Z0-9\.]/g,'');
            searchVal = searchVal !== "" ? searchVal.toUpperCase() : "";
          }
          setSearchWallet(searchVal);
        } catch (err) {}
    }
    useEffect(() => {
        if (window.location.pathname === "/ido-project-info") {
            $("#classy-navbar-mobile").css("background-color", "transparent");
            $(".theme-mode-dropdown").hide();
        }
    }, []);
    return (
        <div className="Ido-App-lanchpad">
            <Navbar/>
            <div className="hero-section-ido-launchpad-tabs-banner py-5 mt-5">
                <div className="container">
                    <div className="ms-auto me-lg-3 me-3 mb-3">
                        <div className="input-group markets-search-group-section">
                          <button type="submit" className="input-group-text"><AiOutlineSearch /></button>
                          <input type="text" className="form-control" placeholder="Search Coin Name" autoComplete='off' name="search"
                            value={searchWallet}
                            onChange={handleSearch}
                          />
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <p className="text-center">Tokens Sold - {tokenCount}</p>
                        <div className="col-lg-12">
                            <LaunchPadTableComp 
                                order={"desc"}
                                searchWallet={searchWallet}
                                setSearchWallet={setSearchWallet}
                                userLaunchData={userData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default IdoProjectInfo