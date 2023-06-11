import "../assets/style.css";
import NavbarOne from "../Pages/siteTheme/NavbarOne";
import Footer from "../Pages/siteTheme/Footer";
import payload from "../assets/ApiJson/Payload"
import success from "../assets/ApiJson/Success"


import $ from "jquery";

export default function Apipage(props) {

    $(document).ready(function () {
        $(".sidenavbar-open").click(function () {
            $("#mySidenav").css("width", "100%");
        });
        $(".sidenavbar-close").click(function () {
            $("#mySidenav").css("width", "0px");
        });
    });

    return (
        <div className="">
            <NavbarOne setTheme={props.setTheme} theme={props.theme} />
            <div className="row mx-0 px-0 mt-lg-0  position-fixed-api-doc ">
                <a className="sidenavbar-open  three-dots-nav-styling ms-auto">&#9776;</a>
            </div>
            <section className="api-page-top-section">

                <div className="container-fluid">
                    <div className="row ">
                        <div className="col tab-main-column-color-theme ">
                            <div id="mySidenav" class=" sidenav top-nav-background-styling">
                                <div className="row mx-0 px-0">
                                    <a href="javascript:void(0)" className="sidenavbar-close mx-auto" onclick="closeNav()">&times;</a>
                                </div>
                                <nav
                                    id="navbar-example3"
                                    class="h-100 flex-column align-items-stretch"
                                >
                                    <nav class="nav nav-pills flex-column">
                                        <div class="accordion" id="accordionExample">
                                            <div class="accordion-item">

                                                <h2 class="accordion-header" id="heading1">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse1"
                                                        aria-expanded="false"
                                                        aria-controls="collapse1"
                                                    >
                                                        <a class="nav-link" href="#item-1-1">
                                                            Sign Up
                                                        </a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading2">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse2"
                                                        aria-expanded="false"
                                                        aria-controls="collapse2"
                                                    >
                                                        <a class="nav-link" href="#item-2-1">
                                                            Sign Up
                                                        </a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading3">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse3"
                                                        aria-expanded="false"
                                                        aria-controls="collapse3"
                                                    >
                                                        <a class="nav-link" href="#item-3-1">Forgot Password</a>
                                                    </button>
                                                </h2>

                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading4">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse4"
                                                        aria-expanded="false"
                                                        aria-controls="collapse4"
                                                    >
                                                        <a class="nav-link" href="#item-4-1">Forgot Password</a>
                                                    </button>
                                                </h2>

                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading5">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse5"
                                                        aria-expanded="false"
                                                        aria-controls="collapse5"
                                                    >
                                                        <a class="nav-link" href="#item-5-1">Reset Password</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading6">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse6"
                                                        aria-expanded="false"
                                                        aria-controls="collapse6"
                                                    >
                                                        <a class="nav-link" href="#item-6-1">Dashboard</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading7">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse7"
                                                        aria-expanded="false"
                                                        aria-controls="collapse7"
                                                    >
                                                        <a class="nav-link" href="#item-7-1">Site Settings</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading8">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse8"
                                                        aria-expanded="false"
                                                        aria-controls="collapse8"
                                                    >
                                                        <a class="nav-link" href="#item-8-1">Dashboard</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading9">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse9"
                                                        aria-expanded="false"
                                                        aria-controls="collapse9"
                                                    >
                                                        <a class="nav-link" href="#item-9-1">Dashboard</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading10">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse10"
                                                        aria-expanded="false"
                                                        aria-controls="collapse10"
                                                    >
                                                        <a class="nav-link" href="#item-10-1">Dashboard</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading11">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse11"
                                                        aria-expanded="false"
                                                        aria-controls="collapse11"
                                                    >
                                                        <a class="nav-link" href="#item-11-1">Profile </a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading12">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse12"
                                                        aria-expanded="false"
                                                        aria-controls="collapse12"
                                                    >
                                                        <a class="nav-link" href="#item-12-1">Change Phone Number Verification </a>
                                                    </button>
                                                </h2>

                                                <div id="collapse12" class="accordion-collapse collapse" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-12-2">={">"} Get Code-Old Phone</a>
                                                            <a class="nav-link ms-2" href="#item-12-3">={">"} Get Code-Old Email</a>
                                                            <a class="nav-link ms-2" href="#item-12-4">={">"} Submit</a>

                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading13">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse13"
                                                        aria-expanded="false"
                                                        aria-controls="collapse13"
                                                    >
                                                        <a class="nav-link" href="#item-13-1">Change Email Verification </a>
                                                    </button>
                                                </h2>
                                                <div id="collapse13" class="accordion-collapse collapse" aria-labelledby="heading13" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-13-2">={">"} Get Code-Old Phone</a>
                                                            <a class="nav-link ms-2" href="#item-13-3">={">"} Get Code-Old Email</a>
                                                            <a class="nav-link ms-2" href="#item-13-4">={">"} Submit</a>

                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading14">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse14"
                                                        aria-expanded="false"
                                                        aria-controls="collapse14"
                                                    >
                                                        <a class="nav-link" href="#item-14-1">Login Password</a>
                                                    </button>
                                                </h2>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading15">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse15"
                                                        aria-expanded="false"
                                                        aria-controls="collapse15"
                                                    >
                                                        <a class="nav-link" href="#item-15-1">Login Activities</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading16">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse16"
                                                        aria-expanded="false"
                                                        aria-controls="collapse16"
                                                    >
                                                        <a class="nav-link" href="#item-16-1">Identification</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse16" class="accordion-collapse collapse" aria-labelledby="heading16" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-16-2">={">"} Aadhar (Offline)</a>
                                                            <a class="nav-link ms-2" href="#item-16-3">={">"} Selfie (Offline)</a>
                                                            <a class="nav-link ms-2" href="#item-16-4">={">"} PAN (Online)</a>
                                                            <a class="nav-link ms-2" href="#item-16-5">={">"} AAdhar (Online) --- OTP</a>
                                                            <a class="nav-link ms-2" href="#item-16-6">={">"}  Aadhar (Online) --- Submit</a>
                                                            <a class="nav-link ms-2" href="#item-16-7">={">"} Selfie (Online)</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading17">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse17"
                                                        aria-expanded="false"
                                                        aria-controls="collapse17"
                                                    >
                                                        <a class="nav-link" href="#item-17-1">Payment(Bank)</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading18">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse18"
                                                        aria-expanded="false"
                                                        aria-controls="collapse18"
                                                    >
                                                        <a class="nav-link" href="#item-18-1">Referral</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading19">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse19"
                                                        aria-expanded="false"
                                                        aria-controls="collapse19"
                                                    >
                                                        <a class="nav-link" href="#item-19-1">Voucher</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse19" class="accordion-collapse collapse" aria-labelledby="heading19" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-19-2">={">"} Claim</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading20">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse20"
                                                        aria-expanded="false"
                                                        aria-controls="collapse20"
                                                    >
                                                        <a class="nav-link" href="#item-20-1">Trade History</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse20" class="accordion-collapse collapse" aria-labelledby="heading20" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-20-2">={">"} Table Pagination</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading21">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse21"
                                                        aria-expanded="false"
                                                        aria-controls="collapse21"
                                                    >
                                                        <a class="nav-link" href="#item-21-1">Deposit</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse21" class="accordion-collapse collapse" aria-labelledby="heading21" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-21-2">={">"} Particular currency list</a>
                                                            <a class="nav-link ms-2" href="#item-21-3">={">"} Deposit-Crypto(History Details)</a>
                                                            <a class="nav-link ms-2" href="#item-21-4">={">"} Deposit-fiat(submit)</a>
                                                            <a class="nav-link ms-2" href="#item-21-5">={">"} Deposit-fiat(submit)</a>
                                                            <a class="nav-link ms-2" href="#item-21-6">={">"} Admin bank details</a>
                                                            <a class="nav-link ms-2" href="#item-21-7">={">"} Deposit-fiat(History)</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading22">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse22"
                                                        aria-expanded="false"
                                                        aria-controls="collapse22"
                                                    >
                                                        <a class="nav-link" href="#item-22-1">Withdraw</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse22" class="accordion-collapse collapse" aria-labelledby="heading22" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-22-2">={">"} Withdraw-Crypto (Submit)</a>
                                                            <a class="nav-link ms-2" href="#item-22-3">={">"} Withdraw-Crypto (History)</a>
                                                            <a class="nav-link ms-2" href="#item-22-4">={">"} Withdraw-Fiat (OTP)</a>
                                                            <a class="nav-link ms-2" href="#item-22-5">={">"} Withdraw-Fiat (Submit)</a>
                                                            <a class="nav-link ms-2" href="#item-22-6">={">"} Bank details</a>
                                                            <a class="nav-link ms-2" href="#item-22-7">={">"} Currency Balance</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading23">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse23"
                                                        aria-expanded="false"
                                                        aria-controls="collapse23"
                                                    >
                                                        <a class="nav-link" href="#item-23-1">Coin Status</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading24">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse24"
                                                        aria-expanded="false"
                                                        aria-controls="collapse24"
                                                    >
                                                        <a class="nav-link" href="#item-24-1">Spot Trade</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse24" class="accordion-collapse collapse" aria-labelledby="heading26" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-24-2">={">"} Markets Pair  List</a>
                                                            <a class="nav-link ms-2" href="#item-24-3">={">"} Markets List</a>
                                                            <a class="nav-link ms-2" href="#item-24-4">={">"} Filled</a>
                                                            <a class="nav-link ms-2" href="#item-24-5">={">"} Trade Transaction history pagination</a>
                                                            <a class="nav-link ms-2" href="#item-24-6">={">"} Candles</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading25">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse25"
                                                        aria-expanded="false"
                                                        aria-controls="collapse25"
                                                    >
                                                        <a class="nav-link" href="#item-25-1">Home market List</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading26">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse26"
                                                        aria-expanded="false"
                                                        aria-controls="collapse26"
                                                    >
                                                        <a class="nav-link" href="#item-26-1">Home Page CMS List</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading27">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse27"
                                                        aria-expanded="false"
                                                        aria-controls="collapse27"
                                                    >
                                                        <a class="nav-link" href="#item-27-1">FAQ Details</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading28">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse28"
                                                        aria-expanded="false"
                                                        aria-controls="collapse28"
                                                    >
                                                        <a class="nav-link" href="#item-28-1">About Us</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading29">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse29"
                                                        aria-expanded="false"
                                                        aria-controls="collapse29"
                                                    >
                                                        <a class="nav-link" href="#item-29-1">Privacy Policy</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading30">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse30"
                                                        aria-expanded="false"
                                                        aria-controls="collapse30"
                                                    >
                                                        <a class="nav-link" href="#item-30-1">Terms & Conditions</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading31">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse31"
                                                        aria-expanded="false"
                                                        aria-controls="collapse31"
                                                    >
                                                        <a class="nav-link" href="#item-31-1">Contact Support</a>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading32">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse32"
                                                        aria-expanded="false"
                                                        aria-controls="collapse32"
                                                    >
                                                        <a class="nav-link" href="#item-32-1">Add P2P Payment</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse32" class="accordion-collapse collapse" aria-labelledby="heading32" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-32-2">={">"} UPI</a>
                                                            <a class="nav-link ms-2" href="#item-32-3">={">"} Submit</a>

                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading33">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse33"
                                                        aria-expanded="false"
                                                        aria-controls="collapse33"
                                                    >
                                                        <a class="nav-link" href="#item-33-1">Post New Ads</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse33" class="accordion-collapse collapse" aria-labelledby="heading33" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-33-2">={">"} P2P Pair Price Range</a>
                                                            <a class="nav-link ms-2" href="#item-33-3">={">"} P2P Settings</a>
                                                            <a class="nav-link ms-2" href="#item-33-4">={">"} Get Balance</a>
                                                            <a class="nav-link ms-2" href="#item-33-5">={">"} Get buyer Payment Methods</a>
                                                            <a class="nav-link ms-2" href="#item-33-6">={">"} Particular P2P Pair</a>
                                                            <a class="nav-link ms-2" href="#item-33-7">={">"} Current Pair Price</a>
                                                            <a class="nav-link ms-2" href="#item-33-8">={">"} All P2P Payment(Buy)</a>
                                                            <a class="nav-link ms-2" href="#item-33-9">={">"} P2P User Payments(Sell)</a>
                                                            <a class="nav-link ms-2" href="#item-33-10">={">"} Submit</a>
                                                        </nav>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading34">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse34"
                                                        aria-expanded="false"
                                                        aria-controls="collapse34"
                                                    >
                                                        <a class="nav-link" href="#item-34-1">Myads</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse34" class="accordion-collapse collapse" aria-labelledby="heading34" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-34-2">={">"} Edit ads </a>
                                                            <a class="nav-link ms-2" href="#item-34-3">={">"} Delete ads</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading35">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse35"
                                                        aria-expanded="false"
                                                        aria-controls="collapse35"
                                                    >
                                                        <a class="nav-link" href="#item-35-1">P2P All Orders</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse35" class="accordion-collapse collapse" aria-labelledby="heading35" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-35-2">={">"} All</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading36">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse36"
                                                        aria-expanded="false"
                                                        aria-controls="collapse36"
                                                    >
                                                        <a class="nav-link" href="#item-36-1">P2P Trade</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse34" class="accordion-collapse collapse" aria-labelledby="heading34" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-36-2">={">"} CMS</a>
                                                            <a class="nav-link ms-2" href="#item-36-3">={">"} P2P FAQS</a>
                                                            <a class="nav-link ms-2" href="#item-36-4">={">"} Submit Order</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading37">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse37"
                                                        aria-expanded="false"
                                                        aria-controls="collapse37"
                                                    >
                                                        <a class="nav-link" href="#item-37-1">Order details page</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse37" class="accordion-collapse collapse" aria-labelledby="heading37" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-37-2">={">"} Advertiser Order details</a>
                                                            <a class="nav-link ms-2" href="#item-37-3">={">"} Appeal History</a>
                                                            <a class="nav-link ms-2" href="#item-37-4">={">"} Transferred,notify seller</a>
                                                            <a class="nav-link ms-2" href="#item-37-5">={">"} Payment Received</a>
                                                            <a class="nav-link ms-2" href="#item-37-6">={">"} Cancel Order</a>
                                                            <a class="nav-link ms-2" href="#item-37-7">={">"} Appeal Form (file upload)</a>
                                                            <a class="nav-link ms-2" href="#item-37-8">={">"} Appeal Form (Submit)</a>
                                                            <a class="nav-link ms-2" href="#item-37-9">={">"} Appeal History</a>

                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading38">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse38"
                                                        aria-expanded="false"
                                                        aria-controls="collapse38"
                                                    >
                                                        <a class="nav-link" href="#item-38-1">P2P Appeal Detials list</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse38" class="accordion-collapse collapse" aria-labelledby="heading38" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-38-2">={">"} Appeal Form (Submit)</a>
                                                            <a class="nav-link ms-2" href="#item-38-3">={">"} Cancel Appeal</a>
                                                            <a class="nav-link ms-2" href="#item-38-4">={">"} Appeal Help Center</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="heading39">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse39"
                                                        aria-expanded="false"
                                                        aria-controls="collapse39"
                                                    >
                                                        <a class="nav-link" href="#item-39-1">P2P-User-Center</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse39" class="accordion-collapse collapse" aria-labelledby="heading39" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-39-2">={">"} Feed back details</a>
                                                            <a class="nav-link ms-2" href="#item-39-3">={">"} Blocked Users</a>
                                                            <a class="nav-link ms-2" href="#item-39-4">={">"} Un-Blocked User</a>
                                                            <a class="nav-link ms-2" href="#item-39-5">={">"} User Payment List</a>
                                                            <a class="nav-link ms-2" href="#item-39-6">={">"} Enable Disable Payment </a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="accordion-item ">
                                                <h2 class="accordion-header" id="heading40">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse40"
                                                        aria-expanded="false"
                                                        aria-controls="collapse40"
                                                    >
                                                        <a class="nav-link" href="#item-40-1">P2p-advertiser-user-center</a>
                                                    </button>
                                                </h2>
                                                <div id="collapse40" class="accordion-collapse collapse" aria-labelledby="heading40" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body p-2">
                                                        <nav class="nav nav-pills flex-column">
                                                            <a class="nav-link ms-2" href="#item-40-2">={">"} Order details(buy,sell)</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="accordion-item margin-bottom-api">
                                                <h2 class="accordion-header" id="heading41">
                                                    <button
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse41"
                                                        aria-expanded="false"
                                                        aria-controls="collapse41"
                                                    >
                                                        <a class="nav-link" href="#item-41-1">Markets Price</a>
                                                    </button>
                                                </h2>

                                            </div>

                                        </div>
                                    </nav>
                                </nav>
                            </div>
                        </div>
                        <div className="col py- py-lg-0  tab-main-column-2-css">
                            <div
                                data-bs-spy="scroll"
                                data-bs-target="#navbar-example3"
                                data-bs-smooth-scroll="true"
                                class="scrollspy-example-2"
                                tabindex="0"
                            >
                                <div id="item-1-1" className="">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5 api-second-column-background-styling">
                                            <h3>OTP</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/register">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/register
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">Post</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">FALSE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5 api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_1}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_1}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="item-2-1" className="">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Submit</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/register">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/register
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">FALSE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5 api-third-column-background-styling">
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>

                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_2}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_2}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="item-3-1" className="">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>OTP</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/forgotPassword">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/forgotPassword
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">FALSE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5 api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_3}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_3}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="item-4-1" className="">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Forgot Password</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/user/forgotPasswordChk">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/user/forgotPasswordChk
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">FALSE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5 api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_4}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_4}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="item-5-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/user/resetPassword">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/user/resetPassword
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">FALSE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_5}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_5}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-6-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>User Details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/getMyProfile">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/getMyProfile
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_6}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-7-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">

                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/common/siteSettings">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/common/siteSettings
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_7}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-8-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Wallet Details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/wallet/getWalletCurrency">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/wallet/getWalletCurrency
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_8}</code>
                                                    </pre>
                                                </span>
                                            </p>


                                        </div>
                                    </div>

                                </div>

                                <div id="item-9-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Spot Holding Details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/wallet/getSpotHoldings">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/wallet/getSpotHoldings
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_9}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-10-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Transfer Amount</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/submitTransfer">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/submitTransfer
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_10}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_10}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-11-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Two-Factor Authentication</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/updateTFA">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/updateTFA
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_11}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_11}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-12-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Get Code - New Phone</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/otp/getCode">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/otp/getCode
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_12}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_12}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-12-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Get Code - Old Phone</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/otp/getCode">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/otp/getCode
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_13}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_13}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-12-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Get Code - Old Email</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/otp/getCode">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/otp/getCode
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_14}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_14}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-12-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Submit</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/user/changeVerificationDetail">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/user/changeVerificationDetail
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_15}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_15}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-13-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Get Code - New Email</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/otp/getCode">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/otp/getCode
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_16}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_16}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-13-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Get Code - Old Phone</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/otp/getCode">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/otp/getCode
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_17}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_17}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-13-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Get Code - Old Email</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/otp/getCode">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/otp/getCode
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_18}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_18}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-13-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Submit</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/user/changeVerificationDetail">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/user/changeVerificationDetail
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_19}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_19}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-14-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Change Password</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/changePassword">
                                                        <p className="">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/changePassword
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_20}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_20}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-15-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Login Activities</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/user/loginHistory">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/user/loginHistory
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_21}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_21}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-16-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>PAN (Offline)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/kyc/offline/verify/pan">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/offline/verify/pan
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_22}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_22}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-16-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Aadhar (Offline)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/kyc/offline/verify/aadhaar?type=aadhaarVerify">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/offline/verify/aadhaar?type=aadhaarVerify
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_23}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_23}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-16-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Selfie (Offline)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="  https://fibitexchange-api.clarisco.com/api/v2/kyc/offline/verify/selfie?type=selfieVerify">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/offline/verify/selfie?type=selfieVerify
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_24}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_24}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-16-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>PAN (Online)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/pan">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/pan
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_25}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_25}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-16-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>AAdhar (Online) --- OTP</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/aadhaar">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/aadhaar
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_26}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_26}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-16-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Aadhar (Online) --- Submit</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/aadhaar">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/aadhaar
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_27}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_27}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-16-7">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Selfie (Online)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/selfie?type=selfieSubmit">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/kyc/online/verify/selfie?type=selfieSubmit
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_28}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_28}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-17-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Payment(Bank)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/updateMyBank">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/updateMyBank
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_29}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_29}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-18-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3></h3>
                                            <ul className="Referral">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/user/getReferralData?userType=user">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/user/getReferralData?userType=user
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_30}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>


                                <div id="item-19-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Voucher</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/voucher/get">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/voucher/get
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_31}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-19-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Claim</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/voucher/claim">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/voucher/claim
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_32}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_32}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <div id="item-20-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/trade/profit/list">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/trade/profit/list
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_33}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-20-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Table Pagination</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/trade/profit/list">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/trade/profit/list
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_34}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_34}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-21-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Deposit-Crypto</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/createAddress">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/createAddress
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_35}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_35}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-21-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Particular currency list</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getParticularCurrency">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getParticularCurrency
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_36}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_36}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-21-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Deposit-Crypto(History Details)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getHistory">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getHistory
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_37}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_37}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-21-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Deposit-fiat(submit)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_38}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_38}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-21-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Deposit-fiat(submit)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/depositFiat">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/depositFiat
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_39}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_39}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-21-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Admin bank details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/admin/getBankDetails">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/admin/getBankDetails
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">


                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_40}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-21-7">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Deposit-fiat(History)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getHistory">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getHistory
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_41}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_41}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>


                                <div id="item-22-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Withdraw-Crypto (Currency Balance)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getCurrencyBalance">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getCurrencyBalance
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_42}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_42}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-22-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Withdraw-Crypto (Submit)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/submitWithdraw">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/submitWithdraw
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_43}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_43}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-22-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Withdraw-Crypto (History)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getHistory">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getHistory
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_44}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_44}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-22-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Withdraw-Fiat (OTP)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/submitWithdraw">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/submitWithdraw
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_45}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_45}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-22-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Withdraw-Fiat (Submit)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/submitWithdraw">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/submitWithdraw
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_46}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_46}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-22-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Bank details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/customer/getBankPayments">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/customer/getBankPayments
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_47}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-22-7">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Currency Balance</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getCurrencyBalance">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getCurrencyBalance
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_48}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_48}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>


                                <div id="item-23-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Coin Status</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/wallet/getCurrency">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/wallet/getCurrency
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">


                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_50}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-24-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Particular pair list</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/trade/checkPair">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/trade/checkPair
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_51}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_51}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-24-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Markets Pair  List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/trade/getMarketsTab">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/trade/getMarketsTab
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_52}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-24-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Markets List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/trade/getMarkets">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/trade/getMarkets
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_53}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-24-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Filled</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/trade/getOrderDetail">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/trade/getOrderDetail
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_54}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_54}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-24-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Trade Transaction history pagination</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v2/trade/profit/list">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v2/trade/profit/list
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_55}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_55}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-24-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Candles</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/trade/market_data/candles">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/trade/market_data/candles
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                {/* <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1"></span>
                                                    </p>
                                                </li> */}
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_56}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_56}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-25-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Home market List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/trade/getHomeMarkets">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/trade/getHomeMarkets
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">


                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_57}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-26-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Home Page CMS List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_58}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_58}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-27-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>FAQ Details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/faq/getfaq">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/faq/getfaq
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_59}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_59}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-28-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>About Us</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_60}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_60}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-29-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Privacy Policy</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_61}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_61}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-30-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Terms & Conditions</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_62}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_62}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-31-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Contact Support</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_63}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_63}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-32-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Bank</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/addPayment">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/addPayment
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_64}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_64}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-32-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>UPI</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_65}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-32-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Submit</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/addPayment">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/addPayment
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">


                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_66}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-33-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>P2P All Pairs</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getallPairs">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getallPairs
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_67}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>P2P Pair Price Range</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getpriceRange">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getpriceRange
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_68}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_68}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>P2P Settings</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/admin/p2p/getP2PSettings">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/admin/p2p/getP2PSettings
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_69}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>getBalance</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getBalance">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getBalance
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_70}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_70}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>getbuyerPaymentMethods</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getbuyerPaymentMethods">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getbuyerPaymentMethods
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_71}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Particular P2P Pair</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2pPair">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2pPair
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_72}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_72}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-7">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Current Pair Price</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getCurrentpair">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getCurrentpair
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_73}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_73}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-8">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>All P2P Payment(Buy)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getallPayments">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getallPayments
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_74}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-9">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>P2P User Payments(Sell)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getadsP2PPayment">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getadsP2PPayment
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_75}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-33-10">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Submit</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/submitVerification">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/submitVerification
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_76}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_76}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-34-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Myads</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getallMyads">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getallMyads
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_77}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_77}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-34-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Edit ads </h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getMyads ">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getMyads
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_78}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_78}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-34-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Delete ads</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getPayment">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getPayment
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_79}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <div id="item-35-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Processing</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2puserAllOrders">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2puserAllOrders
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_80}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_80}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-35-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>All</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2puserAllOrders">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2puserAllOrders
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_81}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_81}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-36-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Trade List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getallOrders">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getallOrders
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_82}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_82}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-36-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>CMS</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/cms/getCMS
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_83}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_83}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-36-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>P2P FAQS</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/faq/getfaq">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/faq/getfaq
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_84}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_84}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-36-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Submit Order</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/submitOrder">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/submitOrder
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_85}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_85}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Order details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2puserOrders">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getp2puserOrders
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_86}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_86}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Advertiser Order details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getmyOrderDetails">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getmyOrderDetails
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_87}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_87}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal History</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getappealHistory">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getappealHistory
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_88}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_88}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Transferred,notify seller</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/submitOrder">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/submitOrder
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_89}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_89}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Payment Received</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/submitOrder">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/submitOrder
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_90}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_90}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Cancel Order</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/cancelOrder">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/cancelOrder
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_91}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_91}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-7">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal Form (file upload)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_92}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_92}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-8">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal Form (Submit)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/createAppeal">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/createAppeal
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_93}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_93}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-37-9">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal History</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getappealHistory">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getappealHistory
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_94}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_94}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-38-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal Form (file upload)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/admin/fileUpload?sizeFile=1&&type=%22attachment%22
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_95}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_95}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-38-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal Form (Submit)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/createAppeal">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/createAppeal
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_96}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_96}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-38-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Cancel Appeal</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/cancelAppeal">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/cancelAppeal
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_97}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_97}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-38-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Appeal Help Center</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/helpcenterAppeal">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/helpcenterAppeal
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_98}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_98}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-39-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>30d Trades,30d Completion Rate,Positive Feedback,....</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getmyOrderDetails">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getmyOrderDetails
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_99}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_99}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-39-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Feed back details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getfeedbackDetails">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getfeedbackDetails
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_100}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_100}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-39-3">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Blocked Users</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getblockUsers">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getblockUsers
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getblockUsers">
                                                            <p className=" ">
                                                                <span className="bg-grey p-1 ">
                                                                    https://fibitexchange-api.clarisco.com/api/v1/p2p/getblockUsers
                                                                </span>
                                                            </p>
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_101}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_101}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-39-4">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Un-Blocked User</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/submitReport">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/submitReport
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_102}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_102}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-39-5">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>User Payment List</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/getPayment">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/getPayment
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_103}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_103}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                                <div id="item-39-6">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Enable Disable Payment </h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/enableDisablP2PPayment">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/enableDisablP2PPayment
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_104}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_104}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-40-1">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>User Details</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/advertiserDet">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/advertiserDet
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_105}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_105}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-40-2">
                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Order details(buy,sell)</h3>
                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/p2p/advertiserOrderDet">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/p2p/advertiserOrderDet
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">POST</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Parameters </h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{payload.payload_106}</code>
                                                    </pre>
                                                </span>
                                            </p>
                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_106}</code>
                                                    </pre>
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                </div>

                                <div id="item-41-1" className="">

                                    <div className="row justify-content-between  min-vh-100">
                                        <div className="col py-5">
                                            <h3>Markets Price</h3>

                                            <ul className="">
                                                <li>
                                                    <h5>URL</h5>
                                                    <a href="https://fibitexchange-api.clarisco.com/api/v1/trade/getMarkets">
                                                        <p className=" ">
                                                            <span className="bg-grey p-1 ">
                                                                https://fibitexchange-api.clarisco.com/api/v1/trade/getMarkets
                                                            </span>
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <h5>METHOD</h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">GET</span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <h5>Bearer Authorization required </h5>

                                                    <p className="">
                                                        <span className="bg-grey p-1">TRUE</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col px-0 py-5  api-third-column-background-styling">

                                            <h5 className="column-heading-color p-3 mx-0 mb-0">Success Response</h5>
                                            <p className="column-heading-paragraph-color px-3 mx-0 ">
                                                <span className=" p-1">
                                                    <pre>
                                                        <code>{success.success_49}</code>
                                                    </pre>
                                                </span>
                                            </p>


                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 
            <Footer /> */}
        </div>
    );
}
