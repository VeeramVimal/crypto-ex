import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  useNavigate,
} from "react-router-dom";
import { getCookie, deleteCookie } from "../helper/cookie";
import { getMyProfile, getSiteSettings, getP2PSettings } from "./helper";
import authReducer from "./reducer";

const initialState = {
  siteSettings: null,
  myProfile: null,
  p2pSettings: null
};

const AuthContext = createContext();

const useContextData = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`Context missing provider`);
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function apiForContext() {
      const settings = await getSiteSettings();
      if (settings.status) {
        dispatch({
          type: 'SET_SITE_SETTINGS',
          payload: settings.message
        });
      }
      const p2psettings = await getP2PSettings();
      if (p2psettings.status) {
        dispatch({
          type: 'SET_P2P_SETTINGS',
          payload: p2psettings.data
        });
      }
      if (getCookie('userToken')) {
        let userData = await setUserProfile();
        if(!userData) {
          await deleteCookie('userToken');
          window.location.reload();
        }
      }     
    }
    apiForContext();
  }, []);

  const setUserProfile = async () => {
    const profile = await getMyProfile();
    if (profile.status && profile.status!="error") {
      dispatch({
        type: 'SET_MY_PROFILE',
        payload: profile.data
      });
      return true;
    } else {
      return false;
    }
  }

  const stateInfo = {
    ...state,
    setUserProfile,
  };
  return (
    <AuthContext.Provider value={stateInfo}>{children}</AuthContext.Provider>
  );
}
export { useContextData, AuthProvider };
