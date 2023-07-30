import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { makeRequest } from '../../core/services/v1/request';
import Config from '../../core/config/';
import { AiOutlineSearch } from "react-icons/ai";

export default function AllMarkets(props) {

  const navigate = useNavigate();

  const [searchMarket, setSearchMarket] = useState("");
  const [socketConnection, setSocketConnection] = useState(null);
  const [marketCurrency, setMarketCurrency] = useState("USDT");
  const [markets, setMarkets] = useState({
    "USDT": [],
    // "BTC": [],
    // "INR": [],
  });

  useEffect(() => {
    getMarkets();
  }, [marketCurrency]);

  useEffect(() => {
    getMarkets();
    let socket = socketIOClient(Config.SOCKET_URL, {
      // transports: ["polling"],
      transports: ['websocket'],
      origin: '*',
      // rejectUnauthorized: false
    });
    let socketUnsubscribe;
    if (socket) {
      socket.on('connect', function () {
        setSocketConnection(socket);
        socketUnsubscribe = socket;
      });
      socket.on('connect_error', (err) => {
        console.log('socket connect_error', err)
      })
      socket.on('disconnect', function () {
        console.log('socket disconnected')
      });
    }
    return () => {
      if (socketUnsubscribe) {
        socketUnsubscribe.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socketConnection != null) {
      loadSocket(marketCurrency);
    }
  }, [socketConnection, marketCurrency]);

  function loadSocket(mcur) {
    if (socketConnection != null) {
      socketConnection.on("pairResponse", data => {
        let marketsCopy = Object.assign({}, markets);
        marketsCopy && marketsCopy[mcur] && marketsCopy[mcur].length > 0 && marketsCopy[mcur].map((market, i) => {
          if (data.pair === market.pair) {
            let newPrice = data.price.toFixed(data.decimalValue);
            let oldData = marketsCopy[mcur].filter((market) => market.pair == data.pair)[0];
            let oldIndex = marketsCopy[mcur].findIndex((market) => market.pair == data.pair);
            let oldPrice = oldData.price.toFixed(oldData.decimalValue);
            if (newPrice != oldPrice) {
              marketsCopy[mcur][oldIndex].price = data.price;
              marketsCopy[mcur][oldIndex].lastPrice = data.lastPrice;
              marketsCopy[mcur][oldIndex].change = data.change;
              marketsCopy[mcur][oldIndex].oldPrice = oldData.price;
            }
          }

          if(i === marketsCopy[mcur].length -1) {
            setMarkets(marketsCopy);
          }
        })
      })
    }
  }

  async function getMarkets() {
    try {
      const params = {
        url: `${Config.V1_API_URL}trade/getMarkets`,
        method: 'POST',
        data: { marketCurrency: marketCurrency }
      }
      const response = (await makeRequest(params));
      if (response.status) {
        let marketValuesCopy = Object.assign({}, markets);
        marketValuesCopy[marketCurrency] = response.data;
        setMarkets(marketValuesCopy);
      }
    } catch (err) { }
  }

  const handleSearch = (e) =>{
    try {
      let searchVal = e.target.value;
      if(searchVal!= "") {
        searchVal = searchVal.replace(/[^a-zA-Z0-9\.]/g,'');
        searchVal = searchVal !== "" ? searchVal.toUpperCase() : "";
      }
      setSearchMarket(searchVal);
    } catch (err) {}
  }

  return (
    <div>
      <div className="d-flex flex-lg-row flex-column g-4">
      <div className='top-banner-third-section mb-3'>
        <ul className="nav nav-pills market-trade-tabs" id="pills-tab" role="tablist">
          {/* <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-usdt-tab" data-bs-toggle="pill" data-bs-target="#pills-usdt" type="button" role="tab" aria-controls="pills-usdt" aria-selected="true" onClick={() => setMarketCurrency("USDT")}>USDT</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-btc-tab" data-bs-toggle="pill" data-bs-target="#pills-btc" type="button" role="tab" aria-controls="pills-btc" aria-selected="false" onClick={() => setMarketCurrency("BTC")}>BTC</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-inr-tab" data-bs-toggle="pill" data-bs-target="#pills-inr" type="button" role="tab" aria-controls="pills-inr" aria-selected="false" onClick={() => setMarketCurrency("INR")}>INR</button>
          </li> */}

          {
            markets && Object.keys(markets).length > 0 ?
            <>
            {
            Object.entries(markets).map(([key, value], index) => {
              return <li className="nav-item" role="presentation">
                <button className={"nav-link"+(index == 0 ? " active": "")} id={"pills-"+key+"-tab"} data-bs-toggle="pill" data-bs-target={"#pills-"+key} type="button" role="tab" aria-controls={"#pills-"+key} aria-selected="true" onClick={() => setMarketCurrency(key) }>{key}</button>
              </li>
            })}
            </>
            :""
          }
        </ul>
      </div>
        <div className="ms-auto me-lg-3 me-3 mb-3">
          <div className="input-group markets-search-group-section">
            <button type="submit" className="input-group-text"><AiOutlineSearch /></button>
            <input type="text" name="search" className="form-control" placeholder="Search Pair Name" autoComplete='off'
              value={searchMarket}
              onChange={(handleSearch)}
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col pb-5">
          <div className="market-place-table-section">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">24h Change</th>
                  <th scope="col">24h High</th>
                  <th scope="col">24h Low</th>
                  <th scope="col">24h Volume</th>
                  <th scope="col">Trade</th>
                </tr>
              </thead>
              <tbody>
                {markets && markets[marketCurrency] && markets[marketCurrency].length > 0 ?
                  markets[marketCurrency].map((data, i) => {
                    const withOutPairSym = data.pair.replace(/_/g, '');
                    if((searchMarket === "") || (searchMarket && withOutPairSym.includes(searchMarket))) {
                      return <tr key={i}>
                        <td onClick={() => navigate("/spot/" + data.pair)} className="cursor curPointer">
                          <span className='tb-img'><img src={data.fromCurrency.image} alt={Config.SITENAME} style={{ height: '35px', width: '35px' }} width="20px" height="20px" /></span>{" "}{data.pair.split('_').join('/')}
                        </td>
                        <td className={data.lastPrice > 0 ? ((data.lastPrice < data.price) ? 'blinkGreenColor' : 'blinkRedColor') : ''}>{(data.price).toFixed(data.decimalValue)}</td>
                        <td className={data.change >= 0 ? 'color-green' : 'color-red'}>{data.change >= 0 ? "+" + (data.change).toFixed(2) : (data.change).toFixed(2)} %</td>
                        <td>{data.high.toFixed(data.decimalValue)}</td>
                        <td>{data.low.toFixed(data.decimalValue)}</td>
                        <td>{data.volume.toFixed(data.decimalValue)}</td>
                        <td><button type="button" className="market-trade-button" onClick={() => navigate("/spot/" + data.pair)}>Trade</button></td>
                      </tr>
                    }
                  })
                  :
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Pair Not Found</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}