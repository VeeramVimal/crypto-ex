import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie, deleteCookie } from "./core/helper/cookie";
import jwt_decode from 'jwt-decode';

const ProtectedRoute = (props) => {
  const {
    authChk = ''
  } = props;
  let isAllow;
  let navigateTo = "";

  if(authChk === "") {
    isAllow = true;
  }
  else {
    const token = getCookie("userToken");
    let decodedToken = "";
    try {
      decodedToken = token ? jwt_decode(token, { header: true }) : {};
    }
    catch(err) {
      deleteCookie('userToken');
    }

    if(authChk === 'beforeLoginOnly') {
      // login register
      if (decodedToken && decodedToken.typ === 'JWT') { 
        isAllow = false;
        navigateTo = "/my/dashboard";
      } else {
        isAllow = true;
      }
    }
    else if(authChk === 'afterLoginOnly') {
      // dashboard history
      if (decodedToken && decodedToken.typ === 'JWT') { 
        isAllow = true;
      } else {
        isAllow = false;
        navigateTo = "/login";
      }
    }
  }

  return (
    isAllow ? <Outlet/> : <Navigate to={navigateTo} />
  );
}

export default ProtectedRoute;
