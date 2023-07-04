import React from "react";
import NavbarOne from "./separate/NavbarOne";
import user from '../assets/images/user.png';
import { RiFileCopyFill } from "react-icons/ri";
import { AiFillBank } from "react-icons/ai";
import {AiOutlineSend} from "react-icons/ai"
export default function SellUSDT(props) {
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className="deposit-page-top-banner">
        <div className="deposit-hero-section">
          <div className="container">
            <div className="row ">
              <div className="col-lg-8">
                {/* <GoChevronLeft className="deposit-back-button-icon" /> */}
                <span className="password-text-55">Buy USDT</span>
                <div className="row align-items-center ">
                  <div className="col-lg-6">
                    <span className="password-text-33">Created time: 2022-04</span>
                  </div>
                  <div className="col-lg-6 text-lg-end">
                    <span className="password-text-33">
                      <b className="password-text-33 fw-bold">Order number : </b>1234567890 <RiFileCopyFill />
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <div className="row mt-4  ">
                      <div className="col-lg-4">
                        <p className="password-text-44 mb-2">Amount</p>
                        <b className="password-text-33 fw-bold">₹ 3500.00</b>
                      </div>
                      <div className="col-lg-4">
                        <p className="password-text-44 mb-2">Price</p>
                        <small className="password-text-33 fw-bold">77.96 INR</small>
                      </div>
                      <div className="col-lg-4">
                        <p className="password-text-44 mb-2">Quality</p>
                        <small className="password-text-33 fw-bold">20.00 USDT</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-12 mt-4 border-bottom border-dark pb-3">
                    <span className="password-text-55">
                      Bank <AiFillBank />
                    </span>
                    <span className="d-block my-2 password-text-33">
                      <b className="password-text-33 fw-bold">Recipient : </b> UTIB40383 <RiFileCopyFill />
                    </span><span className="d-block my-2 password-text-33">
                      <b className="password-text-33 fw-bold">Contact : </b> 9894324458
                    </span>
                    <span className="d-block my-2 password-text-33">
                      <b className="password-text-33 fw-bold">Bank Information : </b>PAYTM ,UTIB40383
                    </span>
                    <span className="d-block my-2 password-text-33">
                      <b className="password-text-33 fw-bold">Card Number : </b>919894324458 <RiFileCopyFill />
                    </span>
                    <span className="d-block my-2 password-text-33">
                      <b className="password-text-33 fw-bold">Note : </b>919894324458 
                    </span>
                  </div>
                  <div className="col-lg-12 mt-4">
                    <span className="password-text-55">
                     To be released 02:59:35
                    </span>
                    <span className="d-block my-2 password-text-33">
                     Expected to resive asset in 15 mins
                    </span>
                    <div className="d-flex">
                      <button className="btn-next btn my-3">
                      Appeal
                      </button>
                      <button className="btn-next btn my-3 ms-3">
                      Cancel order
                      </button>
                    </div>
                  </div>
             
                  <div className="col-lg-12 mt-4">
                    <span className="password-text-55">Tips</span>
                    <ul>
                      <li className="password-text-33 mb-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </li>
                      <li className="password-text-33 mb-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </li>
                      <li className="password-text-33 mb-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </li>
                    </ul>
                  </div>

                 
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body p-0">
                  <div className="card ">
                  <div className="card-body ">
              <div className="d-flex text-dark">
                <div><img src={user} alt="user" className="chat-user" /></div>
                <div className="ms-2"><span>WiNGET</span>
                <span className="d-flex"><b>venkatesh</b></span>
                </div>
              </div>
                  </div>
                </div>
              <div className="chart-box">
              <div className="row">
                <div className="col-12">
                <p className="chart-send">hai</p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">hai</p>
                </div>
                <div className="col-12">
                <p className="chart-send">how are you</p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">i am fine</p>
                </div>
                <div className="col-12">
                <p className="chart-send">how about you</p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">good</p>
                </div>
                <div className="col-12">
                <p className="chart-send">how can i help you</p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">i want to learn about crypto trading</p>
                </div>
                <div className="col-12">
                <p className="chart-send">u can have look at drashboard </p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">ok there i am getting current values of the market</p>
                </div>
                <div className="col-12">
                <p className="chart-send">i need info about which will get</p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">that will be depends on market </p>
                </div>
                <div className="col-12">
                <p className="chart-send">give me some tips to predict</p>
                </div>
                <div className="col-12">
                <p className="chart-resived float-end">check in google you will get more tips about it</p>
                </div>
              </div>
           
              </div>
              <div className="input-group">
  <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
  <span className="input-group-text">+</span>
  <span className="input-group-text"><AiOutlineSend/></span>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
