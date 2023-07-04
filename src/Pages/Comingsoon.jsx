import React from 'react';
import NavbarOne from "./siteTheme/NavbarOne";
import soon from "../assets/images/comingsoon.png";
import "../assets/styledev.css";
export default function commingsoon(props) {
  return (
    <div>
         <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <center>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-5 pt-5">
              <h1 className='my-5'>coming soon</h1>
              <img src={soon} alt="comming soon" className='img-fluid-css' />
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}
