import React, { useState } from "react";
import { HiPlus } from 'react-icons/hi';
import Config from "../../core/config/";
import { useNavigate, useLocation } from "react-router-dom";

export default function Payment(props) {
    const navigate = useNavigate();

    const {
        paymentDetails,
        p2pSettings,
        enableAddStatus,
        myProfile,
        allpaymentsList,
        selectpaymentType,
        enableDisableStatus,
        currentPage
    } = props;

return(
    <div id="scrollspy-section-1-para" className="row px-4 ">
        <div id="section-paymentmethods-scroll" className="col py-3">
            <div className="row p2p-user-center-scrollspy-tops-heading ">
                <p id="p2p-payment-id" className="password-text-66">
                    {currentPage == "/my/payment" ?  "Payment Methods" : "P2P Payment Methods" }
                </p>
            </div>
            <div className="row justify-content-between g-4" >
                <div className="col-lg-6">
                    { currentPage == "/my/payment"?
                        <p className="scrollspy-tops-heading-paragraph">
                           When you withdraw your fiat, the added payment method will
                                be shown to the buyer during the transaction. To accept
                                cash transfer, please make sure the information is
                                correct.
                        </p>
                        :
                        <p className="scrollspy-tops-heading-paragraph">
                            {"P2P payment methods: When you sell cryptocurrencies, the payment method added will be displayed to buyer as options to accept payment, please ensure that the account owner's name is consistent with your verified name on "+ Config.SITENAME +" . You can add up to "
                                + (isNaN(p2pSettings?.creationLimit) == true ? 0 : p2pSettings?.creationLimit) + " payment methods."
                            }
                        </p>
                    }
                </div>
                <div className="col-lg-6 text-end">
                    <div className="dropdown">
                        {(enableAddStatus && myProfile && myProfile.bankSuspend == 'active') &&
                            <a className="btn p2p-user-scrollspy-button dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <span><HiPlus /></span> Add a payment method
                            </a>
                        }
                        {(myProfile && myProfile.bankSuspend == "suspend" && myProfile && myProfile.bankSuspendReason != "") &&
                            <p className="scrollspy-tops-heading-paragraph color-red">
                                {myProfile && myProfile.bankSuspendReason}
                            </p>
                        }
                        {(myProfile && myProfile.bankSuspend == "suspend" && myProfile && myProfile.bankSuspendReason == "") &&
                            <p className="scrollspy-tops-heading-paragraph color-red">
                                You cant upload the Bank Details from User panel. To upload Document again, please Contact Support
                            </p>
                        }
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {allpaymentsList && allpaymentsList.length > 0 ?
                                allpaymentsList.map((row, i) => {
                                    return (
                                        <li>
                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => selectpaymentType(row)}>
                                                {row.name == "Bank" && <p>Bank <span className="color-blue">(IMPS,RTGS,NFT)</span></p>}
                                                {row.name == "UPI" && <p>UPI <span className="color-blue">(GPay,PhonePe,Paytm)</span></p>}
                                            </a>
                                        </li>
                                    )
                                })
                                :
                                <li><a className="dropdown-item" href="javascript:void(0)">No payment methods</a></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {paymentDetails && paymentDetails.length > 0 ?
                paymentDetails.map((item, i) => {
                    return (
                        <>
                            {item.status == 0 &&
                                <>
                                    <div className="row border mt-3">
                                        <div className="row align-items-center py-2 m-0 px-2 scrollspy-payments-row-bg-styling bg-container-color bg-container-color">
                                            <div className="col d-flex">
                                                <p className="border-line-styling mb-0 mt-1"></p>
                                                <p className="mb-0 p2p-user-center-scrollspy-tops-heading color-blue">Your Documents are Waiting for Approval...!</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            {(item.status == 1 || item.status == 2 || item.status == 5) &&
                                <>
                                    {(item.paymenttype == 'Paytm---') &&
                                        <div className="row border mt-3">
                                            <div className="row align-items-center py-2 m-0 px-2 scrollspy-payments-row-bg-styling bg-container-color bg-container-color">
                                                <div className="col d-flex">
                                                    <p className="border-line-styling mb-0 mt-1"></p>
                                                    <p className="mb-0 p2p-user-center-scrollspy-tops-heading">{item.paymenttype}</p>
                                                </div>
                                                <div className="col text-end">
                                                    <span className={item.status == 0 ? "scrollspy-tops-heading-paragraph color-yellow" : item.status == 1 ? "color-green" : item.status == 2 ? "color-darkpink" : "color-darkpink"}>
                                                        {item.status == 0 ? "Waiting for Approval" : item.status == 1 ? "Verified" : item.status == 2 ? "Rejected" : item.status == 5 ? "Disabled" : ""}
                                                    </span>
                                                    &nbsp;&nbsp;
                                                    {item.status == 1 &&
                                                        <button className="btn btn-Dmode  font-mobile btn-next  btn-unset" onClick={() => enableDisableStatus(item)}>
                                                            {" "}   Disabled
                                                        </button>
                                                    }
                                                    {item.status == 5 &&
                                                        <button className="btn btn-Dmode  font-mobile btn-next  btn-unset" onClick={() => enableDisableStatus(item)}>
                                                            {" "}   Enabled
                                                        </button>
                                                    }
                                                    {/* <span className="scrollspy-tops-heading-paragraph ps-3" onClick={()=>navigate("/payment/edit/" +item._id)}>Edit</span>
                                    <span className="scrollspy-tops-heading-paragraph ps-3" onClick={()=>deleteFrom(item)}>Delete</span> */}
                                                </div>
                                            </div>
                                            <div className="row pt-3 px-4 mb-0">
                                                <div className="col  ">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">Name</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.holderName}</p>
                                                </div>
                                                <div className="col">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">Account</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.accountNo}</p>
                                                </div>
                                                {item?.attachment &&
                                                    <div className="col">
                                                        <span className="text-muted scrollspy-tops-heading-paragraph">Payment QR code</span>
                                                        <img src={item?.attachment} alt="attachImg" className="w-50 h-50 d-block" />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {(item.paymenttype == 'UPI') &&
                                        <div className="row border mt-3">
                                            <div className="row align-items-center py-2 m-0 px-2 scrollspy-payments-row-bg-styling bg-container-color bg-container-color">
                                                { item.paymenttype && 
                                                    <div className="col d-flex">
                                                        <p className="border-line-styling mb-0 mt-1"></p>
                                                        <p className="mb-0 p2p-user-center-scrollspy-tops-heading">{item.paymenttype}</p>
                                                    </div>
                                                }
                                                <div className="col text-end">
                                                    <span className={item.status == 0 ? "scrollspy-tops-heading-paragraph color-yellow" : item.status == 1 ? "color-green" : item.status == 2 ? "color-darkpink" : "color-darkpink"}>
                                                        {item.status == 0 ? "Waiting for Approval" : item.status == 1 ? "Verified" : item.status == 2 ? "Rejected" : item.status == 5 ? "Disabled" : ""}
                                                    </span>
                                                    &nbsp;&nbsp;
                                                    {item.status == 1 &&
                                                        <button className="btn btn-Dmode  font-mobile btn-next  btn-unset" onClick={() => enableDisableStatus(item)}>
                                                            {" "}   Disabled
                                                        </button>
                                                    }
                                                    {item.status == 5 &&
                                                        <button className="btn btn-Dmode  font-mobile btn-next  btn-unset" onClick={() => enableDisableStatus(item)}>
                                                            {" "}   Enabled
                                                        </button>
                                                    }
                                                    { Config.PAYMENT_UPI_EDIT == 'Enable' &&
                                                        <span className="scrollspy-tops-heading-paragraph ps-3" onClick={()=>navigate("/payment/edit/" +item._id+"?p2p-user-center")}>Edit</span>
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row pt-3 px-4 mb-0">
                                                <div className="col  ">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">Name</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.holderName}</p>
                                                </div>
                                                <div className="col">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">UPI ID</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.upiId}</p>
                                                </div>
                                                <div className="col">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">Payment QR code</span>
                                                    {item?.attachment ?
                                                        <img src={item?.attachment} alt="attachImg" className="h-50 w-50 d-block" />
                                                        : <p>-</p>}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {(item.paymenttype == 'IMPS' || item.paymenttype == 'Bank') &&
                                        <div className="row border mt-3">
                                            <div className="row align-items-center py-2 m-0 px-2 scrollspy-payments-row-bg-styling bg-container-color">
                                                <div className="col d-flex">
                                                    <p className="border-line-styling mb-0 mt-1"></p>
                                                    <p className="mb-0 p2p-user-center-scrollspy-tops-heading">{item.paymenttype}</p>
                                                </div>
                                                <div className="col text-end">
                                                    <span className={item.status == 0 ? "scrollspy-tops-heading-paragraph color-yellow" : item.status == 1 ? "color-green" : item.status == 2 ? "color-darkpink" : "color-darkpink"}>
                                                        {item.status == 0 ? "Waiting for Approval" : item.status == 1 ? "Verified" : item.status == 2 ? "Rejected" : item.status == 5 ? "Disabled" : ""}
                                                    </span>
                                                    &nbsp;&nbsp;
                                                    {item.status == 1 &&
                                                        <button className="btn btn-Dmode  font-mobile btn-next  btn-unset" onClick={() => enableDisableStatus(item)}>
                                                            {" "}   Disabled
                                                        </button>
                                                    }
                                                    {item.status == 5 &&
                                                        <button className="btn btn-Dmode  font-mobile btn-next  btn-unset" onClick={() => enableDisableStatus(item)}>
                                                            {" "}   Enabled
                                                        </button>
                                                    }
                                                    { Config.PAYMENT_BANK_EDIT == 'Enable' &&
                                                        <span className="scrollspy-tops-heading-paragraph ps-3" onClick={()=>navigate("/payment/edit/" +item._id+"?p2p-user-center")}>Edit</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="row pt-3 px-4 mb-0">
                                                <div className="col  ">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">Name</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.holderName}</p>
                                                </div>
                                                <div className="col  ">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">Account No</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.accountNo}</p>
                                                </div>
                                                <div className="col  ">
                                                    <span className="text-muted scrollspy-tops-heading-paragraph">IFSC Code</span>
                                                    <p className="mt-2 scrollspy-tops-heading-paragraph">{item.ifscCode}</p>
                                                </div>
                                            </div>
                                            <div className="row pt-3 px-4 mb-0"></div>
                                        </div>
                                    }
                                </>
                            }

                        </>
                    )
                })
                :
                <div className='text-center color-white f-14 mt-2  mb-2'>You have not added any payment methods</div>
            }
        </div>
    </div>
    );
}