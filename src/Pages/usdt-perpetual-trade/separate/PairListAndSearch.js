import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../../core/helper/cookie";
import { toast } from "../../../core/lib/toastAlert";
import { showPairName } from '../../../core/helper/date-format';

let initialFavs = getCookie("userPairs");

export default function PairListAndSearch(props) {
  const [isActive, setActive] = useState(false);

  const ToggleClass = () => {
    setActive(!isActive); 
  };

  useEffect(() => {
    $(".spot-page-pair-select-dropdown .dropdown-menu").click(function (e) {
      e.stopPropagation();
    })
  }, []);

  const navigate = useNavigate();
  const {
    decimalValue,
    pairDetails = {},
    marketList: markets = []
  } = props;

  const [favPairsList, setFavPairsList] = useState([]);
  const [favPairs, setFavPairs] = useState(getCookie("userPairs"));
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedTabCurrency, setSelectedTabCurrency] = useState("");
  const [listMarkets, setListMarkets] = useState([]);
  // const [toCurrencySymbolFinal, settoCurrencySymbolFinal] = useState("");
  const [searchVal, setsearchVal] = useState("");
  const [selectedMarkets, setSelectedMarkets] = useState((props.marketList && props.marketList.length > 0) ? props.marketList[0].pairs : []);

  // useEffect(() => {
  //   loadSocket()
  // }, []);
  
  // const loadSocket = () => {
  //   props.socketConnection && props.socketConnection.on("USDTPerpetualPairResp", function (data) {
  //     console.log("USDTPerpetualPairResp : 11 : ", data);
  //     if(data && data._id) {
  //       changeSocData(data);
  //     }
  //   });
  // }

  props.socketConnection && props.socketConnection.on("USDTPerpetualPairResp", function (data) {
    if(data && data._id) {
      changeSocData(data);
    }
  });

  function changeSocData(data) {
    const iDx = listMarkets.findIndex(e => (e._id == data._id));

    if(iDx > -1) {
      let listMarketsCopy = [...listMarkets, ...[]];
      let valChanged = false;

      if(listMarketsCopy[iDx].marketPrice != data.marketPrice) {
        valChanged = true;
        listMarketsCopy[iDx].marketPrice = data.marketPrice;
      }
      if(listMarketsCopy[iDx].price_24h_pcnt != data.price_24h_pcnt) {
        valChanged = true;
        listMarketsCopy[iDx].price_24h_pcnt = data.price_24h_pcnt;
      }
      if(valChanged == true) {
        setListMarkets(listMarketsCopy);
      }
    }
  }

  useEffect(() => {
    if (initialFavs != favPairs) {
      if (selectedCurrency == '') {
        setPairs('');
      }
    }
  }, [favPairs]);

  function checkFavourite(pairName) {
    const markedPairs = getCookie("userPairs");
    if (markedPairs != null && markedPairs != '') {
      let favPairs = markedPairs.split(',');
      if (favPairs.indexOf(pairName) >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function setFavourite(pairName) {
    const markedPairs = getCookie("userPairs");
    let favPairsNew = [];
    if (markedPairs != null && markedPairs != '') {
      favPairsNew = markedPairs.split(',');
    }
    if (favPairsNew.indexOf(pairName) >= 0) {
      favPairsNew.splice(favPairsNew.indexOf(pairName), 1);
      toast({ type: 'success', message: 'Favourite Pair Removed Successfully!' });
    } else {
      favPairsNew.push(pairName);
      toast({ type: 'success', message: 'Favourite Pair Added Successfully!' });
    }
    setNewFavList(favPairsNew);
    setFavPairs(favPairsNew.join(','));
    setCookie('userPairs', favPairsNew.join(','))
  }

  function setCurrency(currency) {
    console.log("setCurrency:", currency, selectedCurrency)
    if (currency != selectedCurrency) {
      setSelectedCurrency(currency);
      setPairs(currency);
    }
  }

  function setPairs(currency) {
    if (currency != '') {
      markets.map((item) => {
        if (item.currency == currency) {
          setSelectedMarkets(item.pairs);
        }
      });
    } else {
      const markedPairs = getCookie("userPairs");
      if (markedPairs != null && markedPairs != '') {
        let favouritePairs = [];
        let favPairs = markedPairs.split(',');
        markets.map((item) => {
          item.pairs.map((item1) => {
            if (favPairs.indexOf(item1.pair) >= 0) {
              favouritePairs.push(item1);
            }
          });
        });
        setSelectedMarkets(favouritePairs);
      } else {
        setSelectedMarkets([]);
      }
    }
  }

  useEffect(() => {
    if (props.toCurrencySymbol != selectedCurrency && selectedCurrency == "") {
      setSelectedCurrency(props.toCurrencySymbol);
    }
  }, [props]);


  function setNewFavList(favPairsUser = []) {
    if (selectedCurrency == "fav") {
      let newMarketList = []
      for (let i = 0; i < markets.length; i++) {
        const marketsPairGrp = markets[i].pairs;
        console.log({ marketsPairGrp });
        for (let j = 0; j < marketsPairGrp.length; j++) {
          const marketsRow = marketsPairGrp[j];
          const favPairChk = favPairsUser.indexOf(marketsRow.pair);
          if (favPairChk > -1) {
            newMarketList.push(marketsRow);
          }
        }
      }
      setListMarkets(newMarketList);
    }
  }

  useEffect(() => {
    if (selectedCurrency) {
      if (selectedCurrency == "fav") {
        let favPairsUser = favPairs ? favPairs.split(',') : [];
        setNewFavList(favPairsUser);
      }
      else {
        const idx = markets.findIndex(elem => elem.currency == selectedCurrency);
        if (idx > -1) {
          setListMarkets(markets[idx].pairs);
        }
        else {
          setListMarkets([]);
        }
      }
    }
  }, [selectedCurrency, markets]);

  const {
    fromCurrency = {},
    toCurrency = {}
  } = pairDetails;

  const {
    siteDecimal: siteDecimal_from = 2
  } = fromCurrency;

  const {
    siteDecimal: siteDecimal_to = 2
  } = toCurrency;

  return (
    <div>
      <div>
        <div className="d-flex flex-row flex-wrap gap-lg-0 gap-4 trading-page-top-section-1 align-items-center ps-2">
          <div className="trading-page-section-1">
            <div className="spot-page-pair-select-dropdown">
              <div className="dropdown">
                <div className="dropdown1">
                  <button className="dropbtn1" onClick={ToggleClass}>
                    {pairDetails && pairDetails.pair && showPairName(pairDetails.pair)}
                    { isActive === true
                    ?<FiChevronUp className="ms-2" />
                    :<FiChevronDown className="ms-2" />}
                    <br /> <b>Perpetual</b>
                  </button>
                  <div  className={isActive === false ? "dropdown-content1" : "dropdown-content1 dropdown-content1-onlick"}>
                    <span>
                      <div className="row paired-trade-dropdown-tabs px-3 pt-3 g-4">
                        <div className="col-7 paired-trade-dropdown-tabs-1 justify-content-between">
                          <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            {markets && markets.length > 0 && markets.map((market, idx) => {
                              return (
                                <li
                                  key={idx}
                                  // className="nav-item"
                                  role="presentation"
                                  onClick={() => setCurrency(market.currency)}
                                  className={"nav-item " + (market.currency === selectedCurrency && "color-yellow")}
                                >
                                  <button
                                    className={"nav-link " + (selectedCurrency == market.currency && " active")}
                                    id={"pills-" + market.currency + "-tab"}
                                    data-bs-toggle="pill"
                                    data-bs-target={"#pills-" + market.currency}
                                    type="button"
                                    role="tab"
                                    aria-controls={"pills-" + market.currency}
                                    aria-selected="false"
                                  >
                                    {market.currency}
                                  </button>
                                </li>
                              )
                            }
                            )
                            }
                          </ul>
                        </div>
                        <div className="col-4 paired-trade-dropdown-tabs-1 ms-2">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control p-0"
                              placeholder="S e a r c h . . ."
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              value={searchVal}
                              onChange={
                                (e) => {
                                  setsearchVal(e.target.value);
                                }
                              }
                            />
                            <span className="input-group-text p-0" id="basic-addon1"><AiOutlineSearch /></span>
                          </div>
                        </div>
                      </div>
                      <div className="paired-trade-dropdown-table mt-3">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Pair</th>
                              <th scope="col">Last Price</th>
                              <th scope="col">Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              listMarkets && listMarkets.length > 0 && listMarkets.map((market, i) => {
                                const searchValue = (searchVal && searchVal != "") ? searchVal.toUpperCase() : "";
                                if (market && market.pair) {
                                  const pairNameShow = showPairName(market.pair);
                                  if ((searchValue !== "" && pairNameShow.indexOf(searchValue) > -1) || searchValue === "") {
                                    return (
                                      <tr key={i}>
                                        <td>
                                          <span className="curPointer" onClick={() => { navigate('/spot/' + market.pair); ToggleClass(); }}>
                                            {pairNameShow}{" "}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="curPointer" onClick={() => { navigate('/spot/' + market.pair); ToggleClass(); }}>
                                            {decimalValue(market.marketPrice, market.decimalValue)}
                                          </span>
                                        </td>
                                        <td>
                                          <span className={"curPointer " + (market.price_24h_pcnt >= 0 ? 'color-green' : 'color-darkpink')} onClick={() => { navigate('/spot/' + market.pair); ToggleClass(); }}>
                                            {(market && market.price_24h_pcnt > 0 ? '+' : '') + decimalValue(market.price_24h_pcnt ? market && market.price_24h_pcnt : 0, 4)}%
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  }
                                }
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="trading-page-section-1">
            <p className='trade-text-4'>
              {pairDetails && pairDetails.marketPrice ? props.decimalValue(pairDetails.marketPrice, pairDetails.decimalValue) : 0}
            </p>
          </div>
          <div className="trading-page-section-1 ps-lg-4">
            <p className='trade-text-6'>High</p>
            <p className='trade-text-7'>
              {pairDetails && pairDetails.highPrice24h != undefined ? props.decimalValue(pairDetails.highPrice24h, pairDetails.decimalValue) : "-"}
            </p>
          </div>
          <div className="trading-page-section-1">
            <p className='trade-text-6'>Low</p>
            <p className='trade-text-7'>
              {pairDetails && pairDetails.lowPrice24h != undefined ? props.decimalValue(pairDetails.lowPrice24h, pairDetails.decimalValue) : "-"}
            </p>
          </div>
          <div className="trading-page-section-1">
            <p className='trade-text-6'>24H Turnover({pairDetails.toCurrency && pairDetails.toCurrency.currencySymbol})</p>
            <p className='trade-text-7'>
              {pairDetails && pairDetails.turnover_24h != undefined ? props.decimalValue(pairDetails.turnover_24h, siteDecimal_to) : "-"}
            </p>
          </div>
          <div className="trading-page-section-1 border-0">
            <p className='trade-text-6'>24h Change</p>
            <p className='trade-text-7 fc-r'>
              {pairDetails && pairDetails.price_24h_pcnt != undefined ? <><span className={pairDetails.price_24h_pcnt >= 0 ? 'color-green' : 'color-darkpink'}>{(pairDetails.price_24h_pcnt >= 0 ? '+' : '') + props.decimalValue(pairDetails.price_24h_pcnt, 4)}%</span></> : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
