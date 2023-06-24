import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { IoHome, IoBulbOutline } from 'react-icons/io5';
import { BsLightningChargeFill } from 'react-icons/bs';
import { CiMap, CiLock } from 'react-icons/ci';
import { CgLoadbarDoc } from 'react-icons/cg';
import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineTwitter } from 'react-icons/ai';
import { TfiWorld } from 'react-icons/tfi';
import { BsClockFill } from 'react-icons/bs';
import { MdOutlineContentCopy } from 'react-icons/md';
import $ from "jquery";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import moment from "moment";
import Config from '../../../core/config/index';
import "../assets/styles/ido-style.css"
import { Modal } from "react-bootstrap";
import { useContextData } from "../../../core/context";
import { toast } from "../../../core/lib/toastAlert";
import { makeRequest } from "../../../core/services/v1/request";
function Home() {
    const { state } = useLocation();
    const { siteSettings, myProfile, setUserProfile } = useContextData();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [cardStatus, setCardStatus] = useState('');
    const [copy, setCopy] = useState("Copy");
    const [blockNetwork, setBlockNetwork] = useState([]);
    const [showBuy, setShowBuy] = useState(false);
    const [buyData, setBuyData] = useState({
        buyAmount: "",
        numberOfToken: "",
        perCoinPrice: 0,
        totalUSD: ""
    });
    useEffect(() => {
        $("#ido-buy-enable-disable").addClass("ido-enable-disable");
    });
    useEffect(() => {
        if (state && state.userDetails) {
            setData(state.userDetails);
        }
        let v = state && state.userDetails.blockChainSelect[0];
        let vr = Object.keys(v).filter((key) => v[key] === true);
        setBlockNetwork(vr);
    }, [state]);

    useEffect(() => {
        switch (state.status) {
            case 'past':
                return setCardStatus('END')
            case 'present':
                return setCardStatus('ACTIVE')
            case 'future':
                return setCardStatus('UPCOMMING')
            default:
                break;
        }
    });

    const handleCopyClipboard = (text) => {
        let cpy = ""
        const ta = document.createElement("textarea");
        ta.innerText = text;
        document.body.appendChild(ta);
        ta.select();
        cpy = document.execCommand("copy");
        setCopy(cpy ? "Copied" : "Copy")
        ta.remove();
    };
    const handleBuyChange = (event) => {
        setBuyData((prevProp) => ({ ...prevProp, ["buyAmount"]: event.target.value }));
        if (event.target.name == "buyAmount") {
            let val = event.target.value;
            let coinPrice = val * data.token_price;
            setBuyData({
                numberOfToken: val,
                // perCoinPrice: data.token_price,
                totalUSD: coinPrice,
            });
        }
    };

    const handleBuyClick = async (event) => {
        event.preventDefault();
        try {
            var userId = "";
            if (myProfile && myProfile._id) {
                userId = myProfile._id;
            }
            const payload = {
                userId: userId,
                launchPadId: data._id,
                numberOfToken: buyData.numberOfToken,
                amountDeducted: buyData.totalUSD,
                purchaseDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss')
            };
            const params = {
                method: "POST",
                url: `${Config.V1_API_URL}ido-form/tokenBuy`,
                data: payload
            }
            const response = await makeRequest(params);
            if (response.status == 'error') toast({ type: response.status, message: response.message })
            else {
                toast({ type: "success", message: "Your token purchased successfully!" });
                response.code == 200 && setShowBuy(!showBuy); setBuyData({ totalUSD: "", numberOfToken: ""});
            }
        } catch (error) {
            console.log(error);
            toast({ type: "error", message: "Something went wrong" });
        }

    };
    //** invalid character blocked this function */
    const blockInvalidChar = (event) => {
        return ['e', 'E', '+', '-', '.'].includes(event.key) && event.preventDefault();
    };

    return (
        <div className="Ido-App-lanchpad">
            <Navbar />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="d-flex flex-lg-row flex-column gap-3 mb-3 align-items-center">
                            <div className="ido-active-image-1"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU"} className="" alt="logo" /></div>
                            <div className="">
                                <p className="ido-text-1 mb-0">{data.projectName}</p>
                            </div>
                            {/* <div className="ms-auto ido-active-image-2"><img src={Bnb} className="" alt="logo" /></div> */}
                            <div className="">
                                <button type="button" className="ido-active-button-1">{cardStatus}</button>
                            </div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="">
                                <p className="ido-active-text-2">{data.projectInfo}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-4">
                            <div className="">
                                <a className="" target="_blank" href={`${data.websiteLink}`} ><TfiWorld className="ido-icon-button-1" /> Website</a>
                            </div>
                            <div className="" >
                                <a className="" target="_blank" href={`${data.twitterLink}`}><AiOutlineTwitter className="ido-icon-button-1" name="twitter" /> Twitter</a>
                            </div>
                            <div className="" >
                                <a className="" target="_blank" href={`${data.telegramGrpLink}`}><FaTelegramPlane className="ido-icon-button-1" name="telegram" /> Telegram</a>
                            </div>
                            <div className="" >
                                <a className="" target="_blank" href={`${data.paper_link}`}><CgLoadbarDoc className="ido-icon-button-1" name="docs" /> Document</a>
                            </div>
                        </div>
                        <div className="mt-5 active-ido-background">
                            <p className="ido-active-text-3 mb-0">Fibit Details</p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p className="ido-active-text-4">Registration Start</p>
                                    <p className="ido-active-text-4">Registration End</p>
                                    <p className="ido-active-text-4">Swap Rate</p>
                                    <p className="ido-active-text-4">Hard Cap</p>
                                    <p className="ido-active-text-4">Total Whitelisted Users</p>
                                    <p className="ido-active-text-4">Total Users Participated</p>
                                    <p className="ido-active-text-4">Total Funds Swapped</p>
                                    <p className="ido-active-text-4">Access Type</p>
                                </div>
                                <div className="col-6">
                                    <p className="ido-active-text-4">: {moment(data.start_date).format("MM-DD-YYYY")}</p>
                                    <p className="ido-active-text-4">: {moment(data.end_date).format("MM-DD-YYYY")}</p>
                                    <p className="ido-active-text-4">: {`1 TNK = ${data.token_price} USDT`}</p>
                                    <p className="ido-active-text-4">: {data.hard_cap_value} USDT</p>
                                    <p className="ido-active-text-4">: {`${data.total_whitelisted_users}`}</p>
                                    <p className="ido-active-text-4">: {`${data.total_user_participated}`}</p>
                                    <p className="ido-active-text-4">: {`${data.total_funds_swapped}`}</p>
                                    <p className="ido-active-text-4">: {`${data.access_type_level} Levels`}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 active-ido-background">
                            <p className="ido-active-text-3 mb-0">Token information</p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p className="ido-active-text-4">Token</p>
                                    <p className="ido-active-text-4">Network</p>
                                    <p className="ido-active-text-4">Token Listing</p>
                                    <p className="ido-active-text-4">Contract Address (don't send money)</p>
                                    <p className="ido-active-text-4">Total Supply</p>
                                    <p className="ido-active-text-4">Initial Supply</p>
                                    <p className="ido-active-text-4">Market Cap at Listing</p>
                                </div>
                                <div className="col-6">
                                    <p className="ido-active-text-4">: TNK</p>
                                    <p className="ido-active-text-4">: {data.blockChainSelect}</p>
                                    <p className="ido-active-text-4">: {`${moment(data.token_listing_date).format('Do MMMM YYYY')}`}</p>
                                    <p className="ido-active-text-4">: <button
                                        className="ido-active-button-1" onClick={() => handleCopyClipboard(data.contact_address)}>
                                        <MdOutlineContentCopy className="me-2"
                                            values={data.contact_address}
                                        // onCopy={handleCopyClipboard} 
                                        />{copy}
                                    </button></p>
                                    <p className="ido-active-text-4">: {`${data.token_supply} TNK`}</p>
                                    <p className="ido-active-text-4">: {data.initial_supply} TNK</p>
                                    <p className="ido-active-text-4">: {`${data.market_cap_listing}`} $</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 active-ido-background">
                            <p className="ido-active-text-3 mb-0">Distribution</p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p className="ido-active-text-4">Distribution</p>
                                    <p className="ido-active-text-4">Vesting</p>
                                </div>
                                <div className="col-6">
                                    <p className="ido-active-text-4">: {`${data.distributed}`}</p>
                                    <p className="ido-active-text-4">: {`${data.vesting_unlock}% unlock on TGE, ${moment(data.vesting_end_date).diff(data.vesting_start_date, 'months', true)} months vesting`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mt-4 active-ido-background">
                            <div className="d-flex flex-row gap-3 mb-3 align-items-center">
                                <div className="ido-active-image-3"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qCKz9O8kcSbhK2f2kghHy5zEuWAyDVjUWQ&usqp=CAU"} className="" alt="logo" /></div>
                                <div className="">
                                    <p className="ido-active-text-5 mb-0">{data.projectName}</p>
                                    <p className="ido-active-text-6 mb-0">TNK / USDT</p>
                                </div>
                                <div className="ms-auto">
                                    <a className="ido-level-button-1 d-flex"><CiLock className="me-1 mt-1" />Level</a>
                                </div>
                            </div>
                            {/* <div className="d-flex flex-row gap-3 mb-3 align-items-center mt-4 id-active-background-bg">
                                <div className=""><BsClockFill className="me-2 ido-icon-button-1" /> IDO Open in</div>
                                <div className="ms-auto">TBA</div>
                            </div> */}



                            <div style={{ position: "relative" }}>
                                <div className="ido-active-buy-section" id="ido-buy-enable-disable">
                                    {/* <div className="d-flex flex-row">
                                        <div className="ido-active-buy-text-1">From</div>
                                        <div className="ms-auto ido-active-buy-text-1">Balance: 045764</div>
                                    </div> */}
                                    <div className="input-group input-group-sm mt-2">
                                        <input type="text" className="form-control" placeholder="0.00" />
                                        <button className="ido-active-buy-max" type="button" id="button-addon2">MAX</button>
                                        <span className="input-group-text bg-transparent text-white" id="inputGroup-sizing-sm"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png" alt="logo" />USD</span>
                                    </div>
                                    {/* <div className="d-flex flex-row mt-3">
                                        <div className="ido-active-buy-text-1">To</div>
                                    </div>
                                    <div className="input-group input-group-sm mt-2">
                                        <input type="text" className="form-control" placeholder="0.00" />
                                        <span className="input-group-text" id="inputGroup-sizing-sm"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png" alt="logo" />USD</span>
                                    </div> */}
                                    <div className="d-grid mt-3">
                                        <button className="ido-active-buy-approve" type="button">Approve</button>
                                    </div>

                                </div>
                                <div className="text-center mt-3 approve-connect-wallet-section">
                                    {/* <button
                                        type="button"
                                        className="get-start-1-connect-wallet"
                                        data-bs-toggle="modal"
                                        data-bs-target="#buyModal">BUY NOW</button> */}
                                    <button
                                        type="button"
                                        className="get-start-1-connect-wallet"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#buyModal"
                                        onClick={() => setShowBuy(true)}
                                    >BUY NOW</button>
                                </div>
                            </div>

                            <p className="ido-active-text-5 mt-3">We are preparing the sale</p>
                            {/* <div className="progress mb-4">
                                <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "15%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> */}
                            <p className="ido-active-text-8 mb-0">{`1 TNK = ${data.token_price} USDT`}</p>
                            {/* <p className="ido-active-text-8 mb-0">1 USD = 133.33 TNK</p> */}

                            <div className="d-flex flex-row gap-3 align-items-center mt-4 id-active-background-bg">
                                <div className="">Your Level:</div>
                                <div className="ms-auto" style={{ color: "#f4b844" }}>None</div>
                            </div>
                            {/* <div className="progress mt-4 mb-2">
                                <div className="progress-bar" 
                                role="progressbar" 
                                aria-label="Basic example" 
                                style={{ width: "2%" }} 
                                aria-valuenow="25" 
                                aria-valuemin="0" 
                                aria-valuemax="100"></div>
                            </div> */}
                            {/* <div className="d-flex flex-row gap-3 mb-2 align-items-center">
                                <div className=""><span className="ido-active-text-8">0.00%</span></div>
                                <div className="ms-auto"><span className="ido-active-text-8">0.00 / 30,000 USDT</span></div>
                            </div> */}


                            {/* <div className="progress mt-4">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    style={{ width: "25%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div> */}
                            <div className="d-flex flex-row gap-3 mt-2 mb-3">
                                <div className="">
                                    <p className="ido-text-7 mb-1">0.00 % </p>
                                </div>
                                <div className="ms-auto text-end">
                                    <p className="ido-text-7 mb-1">0 / 100,000 USDT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* {showBuy && (
                <div className="modal fade ido-active-buy-section-modal" id="buyModal" tabindex="-1" aria-labelledby="buyModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="buyModalLabel">BUY NOW</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-5">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" placeholder="0.00" />
                                    <span className="input-group-text bg-transparent text-white" id="inputGroup-sizing-sm">
                                        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png" alt="logo" />
                                        USD</span>
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        type="submit"
                                        className="btn get-start-1"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#buyModal"
                                        onClick={handleBuyClick}
                                    >BUY USDT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) } */}

            <Modal
                className="ido-active-buy-section-modal"
                size="md"
                centered
                aria-labelledby="example-modal-sizes-title-lg"
                show={showBuy}
                onHide={() => { setShowBuy(!showBuy); setBuyData({ buyAmount: "" }); }}
            // contentClassName="bg-transparent  border-0" // this one for content
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-white">BUY NOW</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="input-group input-group-sm">
                        {/* <div className="row mx-auto">
                            <div className='mt-3'>
                                <p>Number of Token</p>
                                <div className="">
                                    <input
                                        type="number"
                                        min="0"
                                        // pattern="[0-9]*\.?[0-9]*"
                                        className="form-control form-control-bg-css p-0 border-0 outline: none"
                                        placeholder="Enter Amount"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        name='buyAmount'
                                        value={buyData.buyAmount}
                                        onKeyDown={blockInvalidChar}
                                        onChange={handleBuyChange}
                                    />
                                    <span className="input-group-text bg-transparent text-white" id="inputGroup-sizing-sm">
                                        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png" alt="logo" />
                                        USDT</span>
                                </div>
                            </div>
                        </div> */}
                        <div className="row mx-auto">
                            <div className='mt-3'>
                                <p>Number of Token</p>
                                <div className='d-flex justify-content-between bg-grey p-2'>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control form-control-bg-css p-0 border-0 outline: none"
                                        placeholder=""
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        name='buyAmount'
                                        value={buyData.buyAmount}
                                        onKeyDown={blockInvalidChar}
                                        onChange={handleBuyChange}
                                    />
                                    {/* <div className='loan-line-bar'>|</div> */}
                                    <span className="input-group-text bg-transparent text-dark" id="inputGroup-sizing-sm">
                                        <img src="https://res.cloudinary.com/dweqs7aoz/image/upload/v1676625927/Images/xfhtlqkke8t0nxqe64zf.png" alt="logo" />
                                        USDT</span>
                                </div>
                                <div className="error">
                                    {/* {repay_data_err.repay_amount_err} */}
                                </div>
                            </div>
                            {/* <div className="row mx-auto"> */}
                            <div className="rate-list mt-4">
                                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                                    <span className='text-grey'>
                                        Per Coin Price
                                    </span>
                                    <span className=''>
                                        {`$ ${(data.token_price === undefined || data.token_price == 0 ? 0 : data.token_price)}`}
                                    </span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                                <span className='text-grey'>
                                    Total USD
                                </span>
                                <span className=''>
                                    {`$ ${parseFloat(buyData.totalUSD ? buyData.totalUSD : 0).toFixed(2)}`}
                                </span>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>

                    {/* <div className="text-center mt-4">
                        <button
                            // type="button"
                            className="btn get-start-1 text-black"
                            // data-bs-toggle="modal"
                            // data-bs-target="#buyModal"
                            onClick={handleBuyClick}
                        >BUY USDT</button>
                    </div> */}
                    <div className="row mt-3">
                        <div className="col text-center">
                            <button
                                className='btn get-start-1 text-black'
                                onClick={handleBuyClick}
                            >
                                BUY USDT
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Home;
