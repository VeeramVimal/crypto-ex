import React from 'react';
import NavbarOne from "./siteTheme/NavbarOne";
import error from "../assets/images/404.png";
import "../assets/styledev.css";

import Error404Content from './Error404Content';

export default function Error404(props) {
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <Error404Content />
    </div>
  )
}
