import React from 'react';
import NavbarOne from "../siteTheme/NavbarOne";
import error from "../../assets/images/404.png";
import "../../assets/styledev.css";

export default function Inner404() {
  return (
    <center>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className='my-5'>404</h1>
            <p>Sorry! The page you’re looking for cannot be found.</p>
            <p>404 is a status code that tells a web user that a requested page is not available.</p>
            <img src={error} alt="comming soon" className='img-fluid-css' />
          </div>
        </div>
      </div>
    </center>
  )
}
