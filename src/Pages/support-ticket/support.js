import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom'
import io from "socket.io-client"
import NavbarOne from "../siteTheme/NavbarOne";
import Accordion from 'react-bootstrap/Accordion';
import { makeRequest } from "../../core/services/v1/request";
import { useContextData } from "../../core/context/index";
import Footer from "../siteTheme/Footer";
import Config from "../../core/config/";
import "../../assets/style.css";
import SupportChatBox from "./supportChatbox";
import socketIOClient from "socket.io-client";
import { toast } from "../../core/lib/toastAlert";
import { BsDot } from "react-icons/bs";
import { GoChevronLeft } from "react-icons/go";
import { FileUploader } from "react-drag-drop-files";
import moment from "moment";
import { useFileUpload } from "use-file-upload";
import { FaUserAlt } from 'react-icons/fa';
import { GrAttachment } from "react-icons/gr";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function Support(props) {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const [socketConnection, setSocketConnection] = useState(null);
    const { myProfile, setUserProfile } = useContextData();
    const [issue, setIssue] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState('');
    const [filesOffline, setfilesOffline] = useState({});
    const [userId, setUserId] = useState("")
    const [viewTicket, setViewTicket] = useState([]);
    const [enableChat, setenableChat] = useState(true);
    const [id, setId] = useState("");
    const [ticketId, setTicketId] = useState("");
    const [chat, setChat] = useState("")
    const [chats, setChats] = useState([]);
    const [socket, setSocket] = useState(null);
    const [recipient, setRecipient] = useState("");
    const [chattingHistory, setchattingHistory] = useState([]);
    const [ticketChat, setTicketChat] = useState("");
    const [chatisLoading, setchatisLoading] = useState(false);
    const [chatattachment, setchatattachment] = useState("");
    const [changefile, setchangefile] = useState("");
    const [issueList, setIssueList] = useState([]);
    const [files, selectFiles] = useFileUpload();
    // const socket = socketIOClient.connect(Config.SOCKET_URL, { transports: ['websocket'] });
    // useEffect(() => {
    //     let socketUnsubscribe;
    //     viewTickets();
    //     if (socketed) {
    //         socketed.on('connect', () => {
    //             console.log('Socked is conencted');
    //             console.log("socket============", socket);
    //             setSocketConnection(socket);
    //             socketUnsubscribe = socket;
    //         });
    //         socketed.on('connect_error', (err) => {
    //             console.log('socket connect_error', err)
    //         })
    //         socketed.on('disconnect', function () {
    //             console.log('socket disconnected')
    //         });
    //     }
    //     return socketUnsubscribe && socketUnsubscribe.disconnect();

    // }, [myProfile]);

    useEffect(() => {
        issueListdisplay();
        viewTickets();
        let socket = socketIOClient(Config.SOCKET_URL, { transports: ['websocket'] });
        let socketUnsubscribe;
        // getp2pOrders();
        if (socket) {
            // console.log("socket===========", socket);
            socket.on('connect', function () {
                // console.log("socket=========is-connected",);
                // console.log("socket-===========", socket);
                setSocketConnection(socket);
                socketUnsubscribe = socket;
            });
            socket.on('connect_error', (err) => {
                // console.log('socket connect_error', err)
            })
            socket.on('disconnect', function () {
                // console.log('socket disconnected')
            });
        }
        return () => {
            if (socketUnsubscribe) {
                socketUnsubscribe.disconnect();
            }
        };
       
    }, [myProfile]);

    useEffect(() => {
        // console.log("socketconnection", socketConnection)
        if (socketConnection != null) {
            // console.log("socketConnection===========", socketConnection);
            socketConnection.on('chattingTicketResponse', (data) => {
                console.log("sdfoA[FafmA=====================>", data)
                if (data.ticketId == ticketId) {
                    let chatHistory = chattingHistory;
                    chatHistory.push(data.chatHistory)
                }
                // console.log("chattingTicketResponse==========", (chatHistory => [...chatHistory, data.chatHistory]));
                setchattingHistory(chatHistory => [...chatHistory, data.chatHistory]);
                // setTimeout(() => {
                //     scrollToBottom();
                // }, 100);
            })
            // console.log("chat hisghjkl========", chattingHistory);
        }
    }, [])
    const sendMessage = useCallback(() => {
        socket.emit("message", { recipient, message });
        setMessage("");
    }, [socket, recipient, message]);
    async function getChattingDetails(chatData) {
        chatData.length > 0 && chatData.map((item) => {
            if (item.chattingHistory.length > 0) {
                setchattingHistory(item.chattingHistory);
            } else {
                setchattingHistory([]);
            }
            // setTimeout(() => {
            //     scrollToBottom();
            // }, 100);
        })
    }

    async function issueListdisplay() {
        if(myProfile && myProfile._id) {
            const params = {
                url: `${Config.V1_API_URL}supportticket/issuelist`,
                method: "GET",
            }
            setisLoading(true);
            const response = await makeRequest(params);
            if(response.data) setIssueList(response.data); setisLoading(viewTicket);
            let type = 'error';
            if (response.status) {
                type = 'success';
                // setUserProfile();
            }
        }
    }

    async function viewTickets() {
        // console.log("userId=========", userId);
        if (myProfile && myProfile._id) {
            const params = {
                url: `${Config.V1_API_URL}supportticket/viewticket/${myProfile._id}`,
                method: "GET",
            };
            setisLoading(true);
            const response = await makeRequest(params);
            if(response.data) setViewTicket(response.data); setisLoading(viewTicket);
            let type = 'error';
            if (response.status) {
                type = 'success';
                // setUserProfile();
            }
        }
        // toast({ type, message: response.message });
    };
    // console.log("response.data======", viewTicket);

    async function backButton() {
        try {
            const length = window.history.length;
            if (length > 1) {
                window.history.back();
            } else {
                navigate("/");
            }
        } catch (err) { }
    }
    function handleChangesOffline(event, name = "") {
        if (event) {
            const file = event[0];
            if (file) {
                let files1_copy = Object.assign({}, filesOffline);
                files1_copy[name] = file;
                setfilesOffline(files1_copy)

                var reader = new FileReader();
                reader.onload = function (e) {
                    if (name == "attachment") {
                        console.log(e);
                        setAttachment(e.target.result);
                    }
                }
                reader.readAsDataURL(file);
            }
        }
    }
    async function createTicket(e) {
        e.preventDefault()
        let formdata = new FormData();
        for (var key in filesOffline) {
            let fileToUpload = filesOffline[key];
            let fileName = key;
            let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
            formdata.append('images', fileToUpload, fileName + '.' + fileExtension);
        }
        formdata.append("userId", myProfile._id);
        formdata.append("subject", issue);
        formdata.append("description", message);
        const params = {
            url: `${Config.V1_API_URL}supportticket/createticket`,
            method: "POST",
            body: formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        setisLoading(true);
        const response = await makeRequest(params);
        setisLoading(false);
        let type = 'error';
        if (response.status) {
            type = 'success';
            setUserProfile();
        }
        toast({ type, message: response.message });
    }
    const handleChattingChange = (event) => {
        const value = event.target.value;
        if (value != "") {
            setTicketChat(event.target.value);
            setenableChat(false);
        } else {
            setenableChat(true);
            setTicketChat("")
        }
    }
    async function reply(e) {
        e.preventDefault()
        let formData = new FormData();
        // formData.append("")
        // console.log("message", chat, "file", image, "id", id)
    }
    async function handleSubmit(id) {
        // event.preventDefault();
        try {
            let uploadFile = chatattachment;
            setchatisLoading(true);
            if (ticketChat == "" && uploadFile == "") {
                return false;
            }
            if (uploadFile == "") {
                setenableChat(true);
                const data = {
                    ticketId: id,
                    userId: myProfile._id,
                    ticketChat: ticketChat,
                    attachment: "",
                }
                const params = {
                    url: `${Config.V1_API_URL}supportticket/chat-ticket`,
                    method: 'POST',
                    body: data
                }
                const result = (await makeRequest(params));
                console.log(result)
                setchattingHistory(result)
                setchatisLoading(false);
                setchatattachment("");
                setTicketChat("");
            } else {
                console.log("file", uploadFile)
                const formData = new FormData();
                let sizeFile = 1;
                let fileToUpload = uploadFile;
                let fileName = 'attachment';
                let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
                formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
                const params = {
                    url: `${Config.V1_API_URL}admin/fileUpload?sizeFile=${sizeFile}&&type="attachment"`,
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                //Start Load
                setchatisLoading(true);
                const response = (await makeRequest(params));
                // Stop Loader 
                setchatisLoading(false);
                if (response.status) {
                    const data = {
                        ticketId: id,
                        userId: myProfile._id,
                        ticketChat: ticketChat,
                        attachment: response.message[0].location
                    }
                    const reqData = {
                        url: `${Config.V1_API_URL}supportticket/chat-ticket`,
                        method: 'POST',
                        body: data
                    }
                    const result = (await makeRequest(reqData));
                    console.log(result, "result");
                    // setChatting("");
                    setchatattachment("")
                    setTicketChat("")
                }
            }
        } catch (err) {
            console.log('coming-here2', err)
        }
    }
    // console.log(myProfile)
    return (
        <div>
            <NavbarOne setTheme={props.setTheme} theme={props.theme} />
            <div className="deposit-page-top-banner">
                <div className="deposit-hero-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                <GoChevronLeft className="deposit-back-button-icon" onClick={() => backButton()} />
                                <span className="deposit-text-1">Create Ticket Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row container-fluid mt-5">
                <div className="col-md-6">
                    <div className="card p-3 mb-5">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label>Ticket For</label>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setIssue(e.target.value)}>
                                        <option>Select issue</option>
                                        {
                                            issueList.map((data) => {
                                                return (
                                                    <>
                                                        <option value={data._id}>{data.issueTitle}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label>Message to support team</label>
                                    <textarea className="form-control" placeholder="Enter Message.." rows="8" onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                                <label for="inputGroupFile02">Attachment</label>
                                <div className="input-group mb-3">
                                    <FileUploader className="ui-fs"
                                        multiple={true}
                                        handleChange={(e) => handleChangesOffline(e, "attachment")}
                                        name={"attachment"}
                                        types={fileTypes}
                                    />
                                </div>
                                <div className='col-lg-6 my-2'>
                                    {attachment ? <>
                                        <img src={attachment} alt="kycImg" className="imagee cusImagee" />
                                    </> :
                                        ''
                                    }
                                </div>
                                <div class="col-12">
                                    <button type="submit" onClick={createTicket} class="btn btn-success">Create Ticket</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-3 mt-3">
                        <h4 className="card-title mt-3">More About Support</h4>
                        <hr></hr>
                        <ol>
                            <li>general</li>
                            <li>Login Problem</li>
                            <li>transaction issue</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="container-fluid mb-5">
                {
                    viewTicket && viewTicket?.length > 0 && viewTicket.map((data, index) => {
                        return (
                            <Accordion className="m-2" defaultActiveKey={index}>
                                <Accordion.Item>
                                    <Accordion.Header>
                                        <span>Ticket Id: #{data.ticketId}</span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex justify-content-between">
                                            <span>Subject: {data.subject?.issueTitle}</span>
                                            <span>Created At: {moment(data.date).format('MMM DD YYYY hh:mm a')} </span>
                                            <span>Status: {data.status == 1 ? <span className="text-success">Open</span> : <span className="text-danger">Resloved</span>}</span>
                                        </div>
                                        <hr></hr>
                                        <SupportChatBox
                                            myProfile={myProfile}
                                            description={data.description}
                                            ticketChat={ticketChat}
                                            chatHistory={data.chatHistory}
                                            handleChattingChange={handleChattingChange}
                                            submit={() => handleSubmit(data._id)}
                                            setenableChat={setenableChat}
                                            setchatisLoading={chatisLoading}
                                            chatattachment={chatattachment}
                                            setchatattachment={setchatattachment}
                                            changefile={changefile}
                                            setchangefile={setchangefile}
                                            selectFiles={selectFiles}
                                            files={files}
                                        />
                                        {/* <form onSubmit={reply}>
                                            <label>Reply To Admin</label>
                                            <input type="hidden" onChange={(e) => setId(data._id)}  value={data._id}></input>
                                            <input type="text" value={chat} className="form-control" onChange={(e) => setChat(e.target.value)} rows={4}></input>
                                            <label>Attachment</label>
                                            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files)} ></input>
                                            <button type="submit" className="btn btn-info">Reply</button>
                                        </form> */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    )
}