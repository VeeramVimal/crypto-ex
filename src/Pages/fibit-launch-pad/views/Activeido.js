import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { CiMap, CiLock } from 'react-icons/ci';
import { CgLoadbarDoc } from 'react-icons/cg';
import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { TfiWorld } from 'react-icons/tfi';
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
    const { myProfile } = useContextData();
    const [data, setData] = useState([]);
    const [cardStatus, setCardStatus] = useState('');
    const [copy, setCopy] = useState("Copy");
    const [blockNetwork, setBlockNetwork] = useState([]);
    const [showBuy, setShowBuy] = useState(false);
    const [usdt, setUsdt] = useState({});
    const [tokenCount, setTokenCount] = useState(0);
    const [history, setHistory] = useState([]);
    const [buyData, setBuyData] = useState({
        buyAmount: "",
        numberOfToken: "",
        perCoinPrice: 0,
        totalUSD: ""
    });
    const [balanceErr, setBalanceErr] = useState('');
    useEffect(() => {
        if (window.location.pathname === "/active-ido") {
            $("#classy-navbar-mobile").css("background-color", "transparent");
            $(".theme-mode-dropdown").hide();
        }
    }, []);
    useEffect(() => {
        $("#ido-buy-enable-disable").addClass("ido-enable-disable");
    });
    useEffect(() => {
        if(myProfile && myProfile._id) {
            History();
        }
    }, [myProfile])
    useEffect(() => {
        if(Config.LAUNCHPAD_STATUS == "Enable") {
        getUsdtBalance();
        console.log("details", state.userDetails);
        if (state && state.userDetails) {
            setData(state.userDetails.msg);
        }
        let v = state && state.userDetails.msg.blockChainSelect[0];
        let vr = Object.keys(v).filter((key) => v[key] === true);
        setBlockNetwork(vr);
        }
      
    }, [state]);
    const History = async () => {
        let Count = [];
        const params = {
            method: "POST",
            url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/history`,
            data: { userId: myProfile._id, padId: data._id }
        }
        const response = await makeRequest(params);
        setHistory(response.data.msg);
        let totalCount = response.data.msg;
        for(let i = 0; i < totalCount.length; i++) {
            let cnt = totalCount[i].numberOfToken;
            Count.push(Number(cnt));
        }
        let total = sumArray(Count);
        setTokenCount(total);
        
    }
    function sumArray(array) {
        let sum = 0;
      
        /*loop over array and add each item to sum
         */
        array.forEach(item => {
            sum += item;
        });
        // return the result
        return sum;
    }
    const getUsdtBalance = async () => {
        const params = {
            method: "GET",
            url: `${Config.LAUNCHPAD_V2_API_URL}launchPad/currency/getWalletCurrency` //new api not working
            // url: `${Config.V1_API_URL}wallet/getWalletCurrency` old api working
        }
        const response = await makeRequest(params);
        let filterUsdt = response.data.find(element => element.currencySymbol == "USDT");
        setUsdt(filterUsdt);
    } 
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
        let amount = event.target.value
        setBuyData({ buyAmount: event.target.value })
        // setBuyData((prevProp) => ({ ...prevProp, ["buyAmount"]: event.target.value }));
        if (event.target.name == "buyAmount") {
            let val = event.target.value;
            let coinPrice = val * data.token_price;
            setBuyData({
                numberOfToken: val,
                // perCoinPrice: data.token_price,
                totalUSD: coinPrice,
            });
            if(buyData.totalUSD < usdt.balance) {
                return
            } else {
                if(amount == '') {
                    setBalanceErr('')
                } else {
                    setBalanceErr("insufficient Balance");
                }
            }
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
                url: `${Config.LAUNCHPAD_V1_API_URL}launchPad/ido-form/tokenBuy`,
                data: payload
            }
            const payload1 = {
                currencyId: usdt.currencyId,
                userId: myProfile._id,
                amount: buyData.totalUSD,
                token: buyData.numberOfToken,
                launchPadId: data._id
            }
            const params1 = {
                method: "POST",
                url: `${Config.LAUNCHPAD_V2_API_URL}launchPad/currency/deductAmount`,
                data: payload1
            }
            const response = await makeRequest(params);
            const response1 = await makeRequest(params1);
            if (response.status == 'error') { 
                toast({ type: response.status, message: response.message })
                getUsdtBalance()
                History()
            }
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
    const restriction = () => {
        if(cardStatus == "ACTIVE") {
            setShowBuy(true)
        } else if(cardStatus == "UPCOMING") {
            toast({ type: "error", message: "Project not started" });
        } else {
            toast({ type: "error", message: "Project finished" });
        }
    }
    return (
        <div className="Ido-App-lanchpad">
            <Navbar />
            <div className="container py-5 mt-5">
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
                                    <p className="ido-active-text-4">Total Users Participated</p>
                                    <p className="ido-active-text-4">Total Funds Swapped</p>
                                    <p className="ido-active-text-4">Access Type</p>
                                </div>
                                <div className="col-6">
                                    <p className="ido-active-text-4">: {moment(data.start_date).format("MM-DD-YYYY")}</p>
                                    <p className="ido-active-text-4">: {moment(data.end_date).format("MM-DD-YYYY")}</p>
                                    <p className="ido-active-text-4">: {`1 ${data.token_symbol} = ${data.token_price} USDT`}</p>
                                    <p className="ido-active-text-4">: {data.hard_cap_value} USDT</p>
                                    <p className="ido-active-text-4">: {`${data.total_user_participated}`}</p>
                                    <p className="ido-active-text-4">: {`${data.total_funds_swapped}`}</p>
                                    <p className="ido-active-text-4">: {`${data.access_type_level == 1 ? 'Tier - 2 Level' : data.access_type_level == 2 ? 'Both Level' : 'Tier - 1 Level'}`}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 active-ido-background">
                            <p className="ido-active-text-3 mb-0">Token information</p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p className="ido-active-text-4">Token Name</p>
                                    <p className="ido-active-text-4">Token Symbol</p>
                                    <p className="ido-active-text-4">Network</p>
                                    <p className="ido-active-text-4">Token Listing From</p>
                                    <p className="ido-active-text-4">Token Listing To</p>
                                    <p className="ido-active-text-4">Contract Address (don't send money)</p>
                                    <p className="ido-active-text-4">Total Supply</p>
                                    <p className="ido-active-text-4">Initial Supply</p>
                                    <p className="ido-active-text-4">Available Token</p>
                                    {/* <p className="ido-active-text-4">Market Cap at Listing</p> */}
                                </div>
                                <div className="col-6">
                                    <p className="ido-active-text-4">: {data.token_name}</p>
                                    <p className="ido-active-text-4">: {data.token_symbol}</p>
                                    <p className="ido-active-text-4">: {data.blockChainSelect}</p>
                                    <p className="ido-active-text-4">: {`${moment(data.token_listing_date_from).format('Do MMMM YYYY')}`}</p>
                                    <p className="ido-active-text-4">: {`${moment(data.token_listing_date_to).format('Do MMMM YYYY')}`}</p>
                                    <p className="ido-active-text-4">: {data.contact_address != null ? data.contact_address.slice(0, 20) : ''} <button
                                        className="ido-active-button-1" onClick={() => handleCopyClipboard(data.contact_address)}>
                                        <MdOutlineContentCopy className="me-2"
                                            values={data.contact_address}
                                        // onCopy={handleCopyClipboard} 
                                        />{copy}
                                    </button></p>
                                    <p className="ido-active-text-4">: {`${data.token_supply} ${data.token_symbol}`}</p>
                                    <p className="ido-active-text-4">: {data.initial_supply} {data.token_symbol}</p>
                                    <p className="ido-active-text-4">: {data.available_token < 0 ? 0 : data.available_token} {data.token_symbol}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 active-ido-background">
                            <p className="ido-active-text-3 mb-0">Distribution</p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p className="ido-active-text-4">Distribution</p>
                                </div>
                                <div className="col-6">
                                    <p className="ido-active-text-4">: {`${data.distributed}`}</p>
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
                                    <p className="ido-active-text-6 mb-0">{data.token_symbol} / USDT</p>
                                </div>
                                <div className="ms-auto">
                                    <a className="ido-level-button-1 d-flex"><CiLock className="me-1 mt-1" />Level</a>
                                </div>
                            </div>
                            <div style={{ position: "relative" }}>
                                <div className="ido-active-buy-section" id="ido-buy-enable-disable">
                                    <div className="input-group input-group-sm mt-2">
                                        <input type="text" className="form-control" placeholder="0.00" />
                                        <button className="ido-active-buy-max" type="button" id="button-addon2">MAX</button>
                                        <span className="input-group-text bg-transparent text-white" id="inputGroup-sizing-sm"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png" alt="logo" />USD</span>
                                    </div>
                                    <div className="d-grid mt-3">
                                        <button className="ido-active-buy-approve" type="button">Approve</button>
                                    </div>

                                </div>
                                <div className="text-center mt-3 approve-connect-wallet-section">
                                    <button
                                        type="button"
                                        className="get-start-1-connect-wallet"
                                        onClick={() => restriction(true)}
                                    >BUY NOW</button>
                                </div>
                            </div>
                            <p className="ido-active-text-8 mb-0 text-center">{`1 TOKEN = ${data.token_price} USDT`}</p>
                        </div>
                        <div className="mt-4 active-ido-background">
                            <p className="ido-active-text-6 mb-0 text-center">Tokens Bought: {tokenCount}</p>
                            <p className="ido-active-text-6 mb-0 text-center">Transaction History</p>
                            <div className="row mt-4">
                                {
                                    history.length != 0 ?
                                        history.map((data) => {
                                            return (
                                                <>
                                                    <div className="col-md-6">
                                                        <p className="ido-active-text-4">Tokens Bought</p>
                                                        <p className="ido-active-text-4">Amount (USDT)</p>
                                                        <p className="ido-active-text-4">Date</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="ido-active-text-4">: {data.numberOfToken}</p>
                                                        <p className="ido-active-text-4">: {data.amountDeducted}</p>
                                                        <p className="ido-active-text-4">: { moment(data.purchaseDate).format("DD/MM/YYYY")}</p>
                                                    </div>
                                                    <hr></hr>
                                                </>
                                            )
                                        })
                                    : 
                                        <p className="text-center">No Data Available</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
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
                        <div className="row mx-auto">
                            <div className='mt-3'>
                                <p>USDT Balance: {usdt.balance < 0 ? 0 : usdt.balance}</p>
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
                                        {data.token_symbol}
                                    </span>
                                </div>
                                <small className="text-danger">{balanceErr.length !=0 ? balanceErr : ''}</small>
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
                    <div className="row mt-3">
                        {
                            balanceErr.length != 0 ?
                                <div className="col text-center">
                                    <button
                                        className='btn get-start-1 text-black'
                                        onClick={handleBuyClick}
                                        disabled
                                    >
                                        BUY
                                    </button>
                                </div>
                            :
                                usdt.balance < 0 ?
                                    <div className="col text-center">
                                        <button
                                            className='btn get-start-1 text-black'
                                            onClick={handleBuyClick}
                                            disabled
                                        >
                                            BUY
                                        </button>
                                    </div>
                                :
                                
                                    <div className="col text-center">
                                        <button
                                            className='btn get-start-1 text-black'
                                            onClick={handleBuyClick}
                                        >
                                            BUY
                                        </button>
                                    </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Home;
