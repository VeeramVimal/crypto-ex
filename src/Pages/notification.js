import React, { useEffect, useState } from "react";
import { makeRequest } from "../core/services/v1/request";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { useContextData } from '../core/context';
import socketIOClient from "socket.io-client";
import { dateFormat } from '../core/helper/date-format';
import { getCookie } from '../core/helper/cookie';
import { Modal, Button } from "react-bootstrap";
import NavbarOne from "./siteTheme/NavbarOne";
import Footer from './siteTheme/Footer';
import { useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import Accordion from 'react-bootstrap/Accordion';
import moment from "moment";

export default function Notification(props) {
    const navigate = useNavigate();
    const { myProfile, setUserProfile } = useContextData();
    const [isLoading, setisLoading] = useState(false);
    const [notification, setNotification] = useState([]);
	const [socketConnection, setSocketConnection] = useState(null);

    const getNotification = async () => {
        const params = {
            url: `${Config.V1_API_URL}notification/notification`,
            method: "POST",
            data: {
                userId: myProfile?._id
            }
        }
        setisLoading(true);
        const response = (await makeRequest(params));
        setisLoading(false);
    }

    useEffect(() => {
        // getNotification();
        window.scrollTo(0, 0);
        let socket = socketIOClient(Config.SOCKET_URL, {transports: ['websocket']});
        let socketUnsubscribe;
        if(socket) {
            socket.on('connect', function(){
                setSocketConnection(socket);
                socketUnsubscribe = socket
            });
            socket.on('connect_error', (err) => {
                console.log('socket connect_error',err)
            })
            socket.on('disconnect', function(){
                console.log('socket disconnected')
            });
        }
        return () => {
            if(socketUnsubscribe) {
                socketUnsubscribe.disconnect();
            }
        }
    }, [myProfile]);
    setTimeout(() => {
        socketConnection.emit('notificationBack', "send")
    }, 5000)
    useEffect(() => {
        if(socketConnection != null) {
            socketConnection.on('notificationSent', function(data) {
                setNotification(data.msg)
            })
        }
    }, [socketConnection]);

    async function backButton(){
        try {
         const length = window.history.length;
         if (length > 1) {
           window.history.back();
         } else {
           navigate("/");
         }
        } catch (err){}
    }
    return (
        <>
            <div>
                <NavbarOne
                    setTheme={props.setTheme}
                    theme={props.theme}
                />
                <div className="deposit-page-top-banner">
                    <div className="deposit-hero-section">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col">
                                    <GoChevronLeft className="deposit-back-button-icon" onClick={()=>backButton()}/>
                                    <span className="deposit-text-1">Notifications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-5 mb-5">
                    {
                        notification.map((data, i) => {
                            return (
                                <>
                                    <Accordion defaultActiveKey={i}>
                                        <Accordion.Item>
                                            <Accordion.Header>{ data.title }</Accordion.Header>
                                            <Accordion.Body className="d-flex justify-content-between">
                                                <p><a href={data.link}>{data.message}</a></p>
                                                <p>{moment(new Date(data.createdDate), "YYYYMMDD").fromNow()}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}