import React, { useEffect, useState } from "react";

import "../../assets/style.css";
import "../../assets/style-eoption.css";
import NavbarOne from "../siteTheme/NavbarOne";
import Footer from "../siteTheme/Footer";
import Eoptionleft from "./eoption-home-left";
import Eoptionright from "./eoption-home-right";
import socketIOClient from "socket.io-client"; // socket imported
import Config from "../../core/config"


export default function Eoption(props) {
    //==============Socket Io====
    const [socketConnection, setSocketConnection] = useState(null);
    const [ticker_index, setTicker_index] = useState([]);
    const [ticker_mp, setTicker_mp] = useState([]);
    const [ticker, setTicker] = useState([]);

    useEffect(() => {
        if (Config.OPTIONAL_TRADING_STATUS == "Enable") {
            let socket = socketIOClient(Config.OPTIONAL_TRADING_SOCKET_URL, {
                transports: ["websocket"],
            });
            let socketUnsubscribe;
            if (socket) {
                socket.on("connect", () => {
                    console.log("socket connection");
                    setSocketConnection(socket);
                    socketUnsubscribe = socket;
                })
                socket.on("connect_error", (err) => {
                    console.log("socket connect_error", err);
                });
                socket.on("disconnect", function () {
                    console.log("socket disconnected");
                });
            }
            return () => {
                if (socketUnsubscribe) {
                    socketUnsubscribe.disconnect();
                }
            };
        }
    }, []);
    const loadSocket = async () => {
        socketConnection.on("Optional_Index_Res", (indexData) => {
            if (indexData) setTicker_index(indexData);
        });
        socketConnection.on("Optional_MP_Res", (mpData) => {
            if (mpData) setTicker_mp(mpData);
        });
        socketConnection.on("Optional_Ticker_Res", (tickerData) => {
            if (tickerData) setTicker(tickerData);
        });
    }
    useEffect(() => {
        if (Config.OPTIONAL_TRADING_STATUS == "Enable") {
            if (socketConnection != null) {
                loadSocket()
            }
        }
    }, [socketConnection])
    return (
        <div>
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />
            <div className="deposit-page-top-banner">
                <div className="eoption-total-home-section">
                    <div className="container-fluid d-flex flex-lg-row flex-column p-0">
                        <div className="eoption-left-side-section">
                            <Eoptionleft
                                ticker_index={ticker_index}
                                ticker_mp={ticker_mp}
                                ticker={ticker}
                            />
                        </div>
                        <div id="eoption-right-side-section-id" className="eoption-right-side-section">
                            <Eoptionright
                                ticker_index={ticker_index}
                                ticker_mp={ticker_mp}
                                ticker={ticker}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
