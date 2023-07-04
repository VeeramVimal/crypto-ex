import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai"
import { dateFormat, showEmail } from '../core/helper/date-format';

import jQuery from "jquery";

import Config from "../core/config/";

import previewimage from "../assets/images/banner-image.png";

export default function ChatBox(props) {
  const {
    chattingHistory,
    p2pOrdersList,
    myProfile,
    myorderList,
    chattingMsg,
    handleChatChange,
    handleKeyPress,
    submitMessage,
    setenableChat,
    selectFiles,
    setchatFile,
    setchangefile,
    changefile,
    reportformOpen,
    setreportformOpen,
    setchatattachment,
    chatisLoading,
    enableChat,
    setchatisLoading,
    setformOpen,
    formOpen
  } = props;

  
  var jq = jQuery.noConflict();


  jq(document).ready(function () {
    jq('#chatboxModalToggle').modal('show');
    // jq('.modal-backdrop').remove();
  });

  jq(".close-function-chatbox").click(function () {

    jq("#chatboxmodal").css("display", "none");

  });

  jq(".close-function-chatbox-preview").click(function () {

    jq(".previewimagemodal-css").css("display", "none");

  });

  jq("#imagepreviewmodal").click(function () {

    jq(".previewimagemodal-css").show();
  });

  return (
    <div className="col-lg-4 card-bg-css">
      <div className="card">
        <div className="card-body p-0 card-bg-css">
          <div className="card chatbox-section-height">
            <div className="card-body ">
              <div className="d-flex ">
                <div className="my-auto">
                  <span className="circles">
                    {
                      (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].userId) == myProfile?._id ?
                        ((p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerName != "") ?
                          (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerName?.charAt(0))
                          : (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerEmail?.charAt(0)))
                        : (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].username?.charAt(0))
                    }
                  </span>

                </div>
                <div className="ms-2">
                  <span className="fs-12">
                    {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].userId) == myProfile?._id ?
                      ((p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerName != "") ?
                        (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerName)
                        :
                        showEmail(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].ownerEmail))
                      :
                      (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].username)
                    }
                  </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {myProfile && myProfile.level ? (
                    <>
                      {myProfile.level == 1 ?
                        <span className="fs-12 fc-g p-1 bg-light-red">Un-Verified User</span>
                        :
                        <span className="fs-12 fc-g p-1 bg-light-green">Verified User</span>
                      }
                    </>
                  ) : (
                    <span className="fs-12 fc-g p-1 bg-light-red">Un-Verified User</span>
                  )
                  } |
                  <span className='color-red fs-12 padding-right-icon curPointer' onClick={() => setreportformOpen(true)}> Report</span>
                  <span className="d-flex flex-row">
                    <div>
                      <span className="fs-12">30d Trades</span><br />
                      <span className="fs-12">{(myorderList?.monthtradeCounts)}</span>

                    </div>
                    <div className="ms-auto">
                      <span className="fs-12">30d Completion Rate</span><br />
                      <span className="fs-12">{(myorderList?.completionRate != null) ? (myorderList?.completionRate?.toFixed(2)) : 0} % </span>
                    </div>
                  </span>

                </div>
              </div>
            </div>
          </div>
          <div className="chart-box">
            <div className="row">
              {chattingHistory.length > 0 ?
                chattingHistory.map((data) => {
                  return (
                    <>
                      <div className="col-12">
                        {data.message && <p className={data.userId == myProfile?._id ? "chart-resived float-end" : "chart-send"}>{data.message}</p>}
                        {data?.chattingImage && <img src={data?.chattingImage} className= {data.userId == myProfile?._id ? "chart-resived float-end w-50 h-50" : "w-50 h-50 chart-send"} />}
                      </div>
                    </>
                  )
                })
                :
                <>
                  {(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 3 ?
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <p className="chart-resived float-center">{dateFormat(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].createdDate)}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p className="chart-resived float-start">Successfully placed an order, please pay within the time limit</p>
                      </div>
                    </div>
                    :
                    (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 2 ?
                      <div className="col-12">
                        <div className="d-flex justify-content-center">
                          <p className="chart-resived float-center">{dateFormat(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].createdDate)}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                          <p className="chart-resived float-start">The order has been cancelled. Please contact customer support if you have any questions.</p>
                        </div>
                      </div>
                      :
                      (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].status) == 1 ?
                        <div className="col-12">
                          <div className="d-flex justify-content-center">
                            <p className="chart-resived text-center">{dateFormat(p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].createdDate)}</p>
                          </div>
                          <div className="d-flex justify-content-center">
                            <p className="chart-resived float-start">The order has been completed.</p>
                          </div>
                        </div>
                        :
                        <></>
                  }

                </>
              }
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              className="form-control input-bg-css input-resize"
              aria-label="Dollar amount (with dot and two decimal places)"
              name="chatting"
              id="chatting"
              autoComplete='off'
              value={chattingMsg}
              onChange={handleChatChange}
              onKeyPress={handleKeyPress}
            />
            <span className="input-group-text input-bg-css"
              onClick={() =>
                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                  const url = URL.createObjectURL(file);
                  setchatattachment(file);
                  setchangefile(url);
                  setenableChat(false);
                  setformOpen(true);
                })}
                id ="imagepreviewmodal" 
            > + </span>

              { formOpen &&
                <div class="previewimagemodal-css">
                  <div className="text-end">
                    <button 
                      id="chatboxModalToggleclose" 
                      type="button" 
                      className="close-function-chatbox-preview btn-close" 
                      aria-label="Close"
                      onClick={()=> { setformOpen(false); setchatattachment(''); setchangefile(''); setenableChat(true)}}
                    >
                    </button>
                  </div>
                  <img src={changefile} />
                </div>
              }
              { enableChat == false && 
                <span 
                  className={"input-group-text input-bg-css" + (chatisLoading == false ? " curPointer" : "")} 
                  onClick={() => submitMessage('')}
                >
                  <AiOutlineSend disabled={chatisLoading} />
                </span>
              }
            </div>
        </div>
      </div>
      {
        (p2pOrdersList && p2pOrdersList[0] && p2pOrdersList[0].buyerUserId == myProfile?._id) ?
          <div id="chatboxmodal" className="chatbox-buy-modal-1-styling">
            <div className="text-end">
              <button id="chatboxModalToggleclose" type="button" className="close-function-chatbox btn-close" aria-label="Close"></button>
            </div>
            <p id="chatboxModalToggle" className="px-4 pb-2 pt-2">
              Reminder from {Config.SITENAME} P2P:
              <br />
              - DO NOT transfer money through payment methods not mentioned by the maker in his
              advertisement without confirming in the order chat.
              <br />
              - DO NOT cancel the order without getting the refund once you have made the payment for the order.
              <br />
              - Make sure to be alert while trading and report any suspicious activity to us immediately.
            </p>
          </div>
          :
          <div id="chatboxmodal" className="chatbox-sell-modal-1-styling">
            <div className="text-end">
              <button id="chatboxModalToggleclose" type="button" className="close-function-chatbox btn-close" aria-label="Close"></button>
            </div>
            <p id="chatboxModalToggle" className="px-4 pb-2 pt-2">
              Do not release the crypto without receiving the payment.Please be aware of scammers who share fake/spoofed proof of payments.Make sure to check your bank account and release the crypto only if you have received the payment.
            </p>
          </div>
      }

    </div>
  )
}