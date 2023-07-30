import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Table } from 'react-bootstrap';
import socketIOClient from "socket.io-client";

import { getCookie } from '../../core/helper/cookie';
import { makeRequest } from '../../core/services/v1/request';
import Config from '../../core/config/';

export default function AllMarkets(props) {

  const navigate = useNavigate();

  const [markets, setMarkets] = useState({});
  const [topMarkets, settopMarkets] = useState({});
  const [socketConnection, setSocketConnection] = useState(null);

  useEffect(() => {
    let socket = socketIOClient(Config.SOCKET_URL, {
      // transports: ["polling"],
      transports: ['websocket'],
      origin: '*',
      // rejectUnauthorized: false
    });
    let socketUnsubscribe;
    getMarkets();
    getTopMarkets();
    if(socket){
      socket.on('connect', function(){
        setSocketConnection(socket);
        socketUnsubscribe = socket;
      });
      socket.on('connect_error', (err) => {
        console.log('socket connect_error',err)
      })
      socket.on('disconnect', function(){
        console.log('socket disconnected')
      });
    }
    return () => {
      if(socketUnsubscribe) {
        socketUnsubscribe.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if(socketConnection != null) {
      socketConnection.on("pairResponse", data => {
        // getMarkets();
        markets.length > 0  && markets.map((market)=> {
          if (data.pair == market.pair) {
            let newPrice = data.price.toFixed(data.decimalValue);
            let oldData = markets.filter((market) => market.pair == data.pair)[0];
            let oldIndex = markets.findIndex((market) => market.pair == data.pair);
            let oldPrice = oldData.price.toFixed(oldData.decimalValue);
            if(newPrice != oldPrice) {
              markets[oldIndex].price = data.price;
              markets[oldIndex].lastPrice = data.lastPrice;
              markets[oldIndex].change = data.change;
              markets[oldIndex].oldPrice = oldData.price;
            }
          }
        })
      })
      setMarkets(markets);
    }
  }, [socketConnection]);

  useEffect(() => {
    if(socketConnection != null) {
      getTopMarkets();
      socketConnection.on("pairResponse", data => {
        topMarkets.length > 0 && topMarkets.map((topmarket)=>{
          if (data.pair == topmarket.pair){
            let newPrice = data.price.toFixed(data.decimalValue);
            let oldData = topMarkets.filter((topmarket) => topmarket.pair == data.pair)[0];
            let oldIndex = topMarkets.findIndex((topmarket) => topmarket.pair == data.pair);
            let oldPrice = oldData.price.toFixed(oldData.decimalValue);
            if(newPrice != oldPrice) {
              topMarkets[oldIndex].price = data.price;
              topMarkets[oldIndex].lastPrice = data.lastPrice;
              topMarkets[oldIndex].change = data.change;
              topMarkets[oldIndex].oldPrice = oldData.price;
            }
          }
        })
        settopMarkets(topMarkets);
      })
    }
  },[socketConnection])

  async function getMarkets(){
    try { 
      const params = { 
        url: `${Config.V1_API_URL}trade/getMarkets`,
        method: 'GET',
      }
      const response = (await makeRequest(params));
      if (response.status) {
        console.log('markets response : ', {response});
        setMarkets(response.data);
        // markets = response.data;;
        console.log('markets markets : ', {markets});
        // if(socketConnection != null) {
        //   socketConnection && socketConnection.on("pairResponse", data => {
        //     markets.map((market)=>{
        //       if (data.pair == market.pair){
        //         let newPrice = data.price.toFixed(data.decimalValue);
        //         let oldData = markets.filter((market) => market.pair == data.pair)[0];
        //         let oldIndex = markets.findIndex((market) => market.pair == data.pair);
        //         let oldPrice = oldData.price.toFixed(oldData.decimalValue);
        //         if(newPrice != oldPrice) {
        //           markets[oldIndex].price = data.price;
        //           markets[oldIndex].lastPrice = data.lastPrice;
        //           markets[oldIndex].change = data.change;
        //           markets[oldIndex].oldPrice = oldData.price;
        //         }
        //       }
        //     })
        //     setMarkets(markets);
        //   });
        // }
      }
    } catch (err) {}
  }

  async function getTopMarkets(){
    try {
      const params = { 
        url: `${Config.V1_API_URL}trade/getHomeMarkets`,
        method: 'GET'
      }
      const response = (await makeRequest(params));  
      if (response.status) {
        const topGainers = response.data.topGainers;
        topMarkets = topGainers;
        socketConnection.on("pairResponse", data => {
          topGainers.map((market)=>{
            if (data.pair == market.pair){
              let newPrice = data.price.toFixed(data.decimalValue);
              let oldData = topMarkets.filter((market) => market.pair == data.pair)[0];
              let oldIndex = topMarkets.findIndex((market) => market.pair == data.pair);
              let oldPrice = oldData.price.toFixed(oldData.decimalValue);
              if(newPrice != oldPrice) {
                topMarkets[oldIndex].price = data.price;
                topMarkets[oldIndex].lastPrice = data.lastPrice;
                topMarkets[oldIndex].change = data.change;
                topMarkets[oldIndex].oldPrice = oldData.price;
              }
            }
          })
        settopMarkets(topMarkets);
        })
      }
    } catch (err) {}
  }

  return (
    <div className="row align-items-center">
      <div className="col py-5">
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
              {markets.length > 0 && markets.map((data,i) =>{
              return <tr>
                <td onClick={()=>navigate("/spot/"+data.pair)} className="cursor curPointer">
                  <span className='tb-img'><img src={data.fromCurrency.image} alt={Config.SITENAME} style={{ height:'35px', width: '35px' }} width="20px" height="20px"/></span>{" "}{data.pair.split('_').join('/')}
                </td>
                <td className={data.lastPrice > 0 ? ((data.lastPrice < data.price) ? 'blinkGreenColor' : 'blinkRedColor' ): ''}>{ (data.price).toFixed(data.decimalValue) }</td>
                <td className={data.change >= 0 ?'color-green':'color-red'}>{ data.change >= 0 ? "+"+(data.change).toFixed(2) : (data.change).toFixed(2)} %</td>
                <td>{data.high.toFixed(data.decimalValue)}</td>
                <td>{data.low.toFixed(data.decimalValue)}</td>
                <td>{data.volume.toFixed(data.decimalValue)}</td>
                <td><button type="button" className="market-trade-button" onClick={()=>navigate("/spot/"+data.pair)}>Trade</button></td>
              </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}