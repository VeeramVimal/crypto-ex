import React, { useState } from "react";
import "../../assets/style.css";
import NavbarOne from "../../Pages/siteTheme/NavbarOne";
import Footer from "../../Pages/siteTheme/Footer";

import { IoPersonCircle } from 'react-icons/io5';

import avatar1 from '../../assets/images/Avatar-1.png';
import avatar2 from '../../assets/images/Avatar-2.png';
import lapman from '../../assets/images/lap-man-image.png';
import { useFormik } from "formik";
import * as Yup from "yup";
import Config from "../../core/config";
import { makeRequest } from "../../core/services/v1/request";
import { useContextData } from '../../core/context';
import $ from "jquery"
import { toast } from "../../core/lib/toastAlert";

export default function Maincopytrading(props) {
    const { myProfile } = useContextData();
    const [traderAvatar, setTraderAvatar] = useState();

    $(document).ready(function () {
        $(".jqueryavatar").click(function () {
            $(".jqueryavatar").removeClass("active-opacity");
            $(".jqueryavatar").addClass("inactive-opacity");
            $(this).addClass("active-opacity");

        });
    });

    const validateTradeLeaderForm = useFormik({
        initialValues: {
            user_name: '',
            user_email: '',
            //user_intro: '',
        },
        validationSchema: Yup.object().shape({
            user_name: Yup.string().required(
                "Nickname is required"
            ),
            user_email: Yup.string().email('Please enter valid email').required(
                "Email is required"
            ),
            //   user_intro: Yup.string().required(
            //     "Email is required"
            //   )
        }),
        onSubmit: async (values) => {
            try {
                const payload = {
                    name: values.user_name,
                    email: values.user_email,
                    avatar: traderAvatar,
                    discription: values.user_intro ? values.user_intro : '',
                    trader_id: myProfile && myProfile._id,
                };
                const params = {
                    url: `${Config.V1_API_URL}copyTrade/addLeadTrader`,
                    method: "POST",
                    data: payload
                };
                const response = await makeRequest(params);
                if (response.status && response.message) {
                    validateTradeLeaderForm.resetForm();
                    $(".jqueryavatar").removeClass("inactive-opacity");
                    $(".jqueryavatar").removeClass("active-opacity");
                    toast({ type: "success", message: 'Lead Trade Add Successfully' });
                }
                else toast({ type: "error", message: 'Please try again later' });
            } catch (err) {
                toast({ type: "error", message: err });
                console.log(err);
            }
        }
    });

    return (
        <div className="bealead-section-styling">
            <NavbarOne
                setTheme={props.setTheme}
                theme={props.theme}
            />
            <div className="deposit-page-top-banner py-5">

                <div className="container ">
                    <div className="row row-cols-lg-2 row-cols-1  justify-content-center be-a-lead-row-bg-css">
                        <div className="col p-3">
                            <p className="deposit-text-1">Be a Lead Trader</p>
                            <p>Apply to be a lead trader and create your own portfolio. Please note the following:</p>
                            <ul>
                                <li>Once you become a lead trader, you cannot copy portfolios led by others</li>
                                <li>Application results will be sent via SMS/email within 14 business days</li>
                                <li>If your application was unsuccessful, you must wait at least 7 days before applying again</li>
                            </ul>
                            <img src={lapman} className="lapman-css-styling mt-5 text-center" />
                        </div>
                        <div className="col bealead-column-bg">

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                validateTradeLeaderForm.handleSubmit();
                                return false;
                            }}>

                                <div className=" ">
                                    <div className="container  mx-0 px-0">
                                        <p className="terms-text-1">Set your avatar</p>
                                        <div className="d-flex">
                                            <div>
                                                <img src={avatar1} onClick={() => setTraderAvatar('avatar1')} className="jqueryavatar " />
                                            </div>
                                            <div>
                                                <img src={avatar2} onClick={() => setTraderAvatar('avatar2')} className="jqueryavatar " />
                                            </div>
                                            <div>
                                                <img src={avatar1} onClick={() => setTraderAvatar('avatar1')} className="jqueryavatar " />
                                            </div>
                                            <div>
                                                <img src={avatar2} onClick={() => setTraderAvatar('avatar2')} className="jqueryavatar " />
                                            </div>
                                            <div>
                                                <img src={avatar1} onClick={() => setTraderAvatar('avatar1')} className="jqueryavatar " />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-3">
                                        <p className="terms-text-1 line-height-be-a-lead">Please enter your nickname</p>

                                        <div class="input-group form-control-sm">
                                            <input type="text" name="user_name" autoComplete="off" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={validateTradeLeaderForm.handleChange} onBlur={validateTradeLeaderForm.handleBlur} value={validateTradeLeaderForm.values.user_name || ""} invalid={validateTradeLeaderForm.touched.user_name && validateTradeLeaderForm.errors.user_name ? true : false} />
                                        </div>
                                        {validateTradeLeaderForm.touched.user_name && validateTradeLeaderForm.errors.user_name ? (
                                            <small className="invalid-email error password-text-33">{validateTradeLeaderForm.errors.user_name} </small>
                                        ) : null}
                                    </div>

                                    <div className="py-3">
                                        <p className="terms-text-1 ">Please enter your email address</p>
                                        <p className="mb-2 f-15">Official communication related to Fibitpro will be sent to this email.</p>
                                        <div class="input-group form-control-sm">
                                            <input type="text" name="user_email" autoComplete="off" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={validateTradeLeaderForm.handleChange} onBlur={validateTradeLeaderForm.handleBlur} value={validateTradeLeaderForm.values.user_email || ""} invalid={validateTradeLeaderForm.touched.user_email && validateTradeLeaderForm.errors.user_email ? true : false} />
                                        </div>
                                        {validateTradeLeaderForm.touched.user_email && validateTradeLeaderForm.errors.user_email ? (
                                            <small className="invalid-email error password-text-33">{validateTradeLeaderForm.errors.user_email} </small>
                                        ) : null}
                                    </div>

                                    <div className="py-3">
                                        <p className="terms-text-1  line-height-be-a-lead">Please enter your self-introduction</p>
                                        <div class="input-group form-control-sm">
                                            <textarea class="form-control" name="user_intro" id="exampleFormControlTextarea1" rows="6" onChange={validateTradeLeaderForm.handleChange} onBlur={validateTradeLeaderForm.handleBlur} value={validateTradeLeaderForm.values.user_intro || ""} ></textarea>
                                        </div>
                                        {/* <p className="mb-0 f-12">0/500 characters</p> */}
                                        {/* {validateTradeLeaderForm.touched.user_intro && validateTradeLeaderForm.errors.user_intro ? (
                                    <small className="invalid-email error password-text-33">{validateTradeLeaderForm.errors.user_intro} </small>
                                    ) : null} */}
                                    </div>

                                </div>
                                <div className="py-3">
                                    <button type="submit" className="btn banner-top-button-copy">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
