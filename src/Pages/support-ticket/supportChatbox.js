import React from "react";
import { AiOutlineSend } from "react-icons/ai"
import { dateFormat, showEmail } from '../../core/helper/date-format';
import { Button, Card } from 'react-bootstrap'
import jQuery from "jquery";
import { FaUserAlt } from 'react-icons/fa';
import axios from "axios";
import { GrAttachment } from "react-icons/gr";

export default function supportChatbox(props) {
    const {
        myProfile,
        description,
        handleChattingChange,
        ticketChat,
        chatisLoading,
        submit,
        setTicketId,
        chatHistory,
        selectFiles,
        setchatattachment,
        setchangefile,
        setenableChat
    } = props;
    // console.log("adscna", selectFiles)
    console.log("submit==============", submit);
    return (
        <>
            <Card className="p-3">
                <Card.Body>
                    <div className="row">
                        <div className="col">
                            <div className="float-start">
                                {/* <h4><FaUserAlt /> {myProfile.email}</h4>
                                <p>{description}</p> */}
                            </div>
                            {/* {
                                chatHistory && console.log("chatHistory==========", chatHistory)
                            } */}
                            {

                                chatHistory && chatHistory.length > 0 && chatHistory.map((data) => {
                                    // console.log(data)
                                    return (
                                        data.userType == "user" ?
                                            <div className="float-start col-12">
                                                <h5><FaUserAlt /> {myProfile.email}</h5>
                                                <p className="mb-0">{data.message}</p>
                                                {
                                                    data.chattingImage ?
                                                        <a className="" target="_blank" href={data.chattingImage}>
                                                            <GrAttachment />
                                                        </a>
                                                        :
                                                        ''
                                                }
                                            </div>
                                            :
                                            <div className="text-end col-12 ">
                                                <h5><FaUserAlt /> Admin</h5>
                                                <p className="">{data.message}</p>
                                                {
                                                    data.chattingImage ?
                                                        <a className="pe-auto" target="_blank" href={data.chattingImage}>
                                                            <GrAttachment />
                                                        </a>
                                                        :
                                                        ''
                                                }
                                            </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {/* <div className="float-end">
                                <h4><FaUserAlt /> Admin</h4>
                                <p>{description}</p>
                            </div> */}
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <div className="mt-3">
                <form>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Dollar amount (with dot and two decimal places)"
                            name="chatting"
                            id="chatting"
                            autoComplete='off'
                            placeholder="enter chat"
                            onChange={handleChattingChange}
                            value={ticketChat}
                        />
                        {/* {changefile && <img src={changefile} className="payment-qrcode-optional-image" alt="preview" /> } */}
                        <span className="input-group-text" onClick={() => selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                            const url = URL.createObjectURL(file);
                            setchatattachment(file);
                            setchangefile(url);
                            setenableChat(false);
                        })}> <GrAttachment /> </span>
                        <span className={"input-group-text" + (chatisLoading == false ? " curPointer" : "")} onClick={() =>submit("")} ><AiOutlineSend /></span>
                    </div>
                </form>
            </div>
        </>
    )
}