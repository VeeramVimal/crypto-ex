import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getHomeMarkets
} from '../../core/services/all.api';

import { BsFillArrowRightCircleFill } from 'react-icons/bs';

function MarketTrends(props) {

    const navigate = useNavigate();

    const [marketValues, setMarketValues] = useState({
        "USDT": [],
        // "BTC": [],
        // "INR": [],
    });
    const [marketCurrency, setMarketCurrency] = useState("USDT");

    useEffect(() => {
        getHomeMarketsCall();
    }, [marketCurrency]);

    const getHomeMarketsCall = async() => {
        const payload = { marketCurrency };
        const resp = await getHomeMarkets({payload});
        if(resp) {
            const {
                data = {},
                status = false
            } = resp;
            if(status) {
                let marketValuesCopy = Object.assign({}, marketValues);
                marketValuesCopy[payload.marketCurrency] = data;
                setMarketValues(marketValuesCopy);
            }
        }
    }

    return (
        <div className="col-lg-12 ">
            <ul className="nav nav-pills market-trade-tabs" id="pills-tab" role="tablist">
                {
                    marketValues && Object.keys(marketValues).length > 0 ?
                    <>
                    {
                    Object.entries(marketValues).map(([key, value], index) => {
                        return <li className="nav-item" role="presentation">
                            <button className={"nav-link"+(index == 0 ? " active": "")} id={"pills-"+key+"-tab"} data-bs-toggle="pill" data-bs-target={"#pills-"+key} type="button" role="tab" aria-controls={"#pills-"+key} aria-selected="true" onClick={() => setMarketCurrency(key) }>{key}</button>
                        </li>
                    })}
                    </>
                    :""
                }
            </ul>
            {/* <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-usdt" role="tabpanel" aria-labelledby="pills-usdt-tab">...</div>
                <div className="tab-pane fade" id="pills-btc" role="tabpanel" aria-labelledby="pills-btc-tab">...</div>
                <div className="tab-pane fade" id="pills-inr" role="tabpanel" aria-labelledby="pills-inr-tab">...</div>
            </div> */}
            <div className="market-trade-tabs-banner-section">
            <table className="table mt-4">
                <thead>
                    <tr >
                        <th scope="col">Pair</th>
                        <th scope="col">Last Price</th>
                        <th scope="col">24h Change</th>
                        <th scope="col">24h Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    marketValues && marketValues[marketCurrency] && marketValues[marketCurrency].length > 0 ?
                    <>
                    {marketValues[marketCurrency].map((data, index) => (
                        <tr>
                            <td className="curPointer d-flex"
                                onClick={()=> navigate("/spot/"+data.pair)}
                            >
                                {data.fromCurrency && data.fromCurrency.image && <img src={data.fromCurrency.image} alt="logo" />} {data.pair && data.pair.split('_').join('/')}
                            </td>
                            <td>{data.lastPrice ? (data.lastPrice).toFixed(data.decimalValue): data.lastPrice}</td>
                            <td className={data.change >= 0 ?'color-green':'color-red'}>{ data.change >= 0 ? "+"+(data.change).toFixed(2) : (data.change).toFixed(2)} %</td>
                            <td>{data.volume ? (data.volume).toFixed(data.decimalValue) : data.volume}</td>
                        </tr>
                    ))}
                    </>
                    :
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Pair Not Found</td>
                        <td></td>
                    </tr>
                    }
                </tbody>
            </table>
            </div>
            {marketValues && marketValues[marketCurrency] && marketValues[marketCurrency].length > 10 &&
            <div className="d-flex flex-row">
                <div className="mx-auto">
                    <button type="button" className="table-view-all-button-1">View More <BsFillArrowRightCircleFill className='view-more-icon' /></button>
                    <button type="button" className="table-view-all-button-2">View Less <BsFillArrowRightCircleFill className='view-more-icon' /></button>
                </div>
            </div>}
        </div>
    )
}

export default MarketTrends;
