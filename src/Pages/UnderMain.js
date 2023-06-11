import React from 'react';
import NavbarOne from "./siteTheme/NavbarOne";
import undermainimg from "../assets/images/settings/undermainimg.jpeg";
import "../assets/styledev.css";


export default function Error404(props) {
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <center>
        <div className="container">
            <div className="row min-vh-100">
            <div className="col-lg-12 mt-5 pt-5">
                <h1 className='my-5'>Under Maintenance</h1>
                <img src={undermainimg} alt="comming soon" className='img-fluid-css' />
            </div>
            </div>
        </div>
        </center>
    </div>
  )
}
