import React, { useEffect, useState } from "react";
import NavbarOne from './NavbarOne';
import Mainbanner from './Mainbanner';
import Footer from './Footer';
import $ from 'jquery';

export default function Home(props) {

    useEffect(() => {
        if (window.location.pathname === "/") {
          $("#classy-navbar-mobile").css("background-color", "transparent");
          $(".theme-mode-dropdown").hide();
        }
    }, []);

    return (
        <div>
            <NavbarOne
                setTheme = {props.setTheme}
            />
            <Mainbanner />
            <Footer />
        </div>
    )
}
