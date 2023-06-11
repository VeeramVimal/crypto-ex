import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";

import { useContextData } from "../core/context/index";
import {
  dateFormat,
  dateAddFormat,
  showEmail,
  showNumber
} from "../core/helper/date-format";

import { getProfitList_API } from "../core/services/all.api";

import { toast } from "../core/lib/toastAlert";
import Pagination from "react-responsive-pagination";
import "../pagination.css";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";

import { getOrderDetail_API } from "../core/services/all.api";
import TradeHistoryTable from "./exchange-trade/separate/TradeHistoryTable";
import TradeHistoryDetail from "./exchange-trade/separate/TradeHistoryDetail";

export default function SpotTradeHistory() {
  const { myProfile, setUserProfile, siteSettings } = useContextData();

  const navigate = useNavigate();

  const [tradeHistory, setTradeHistory] = useState([]);
  const [traHisDetails, setTraHisDetails] = useState({});

  const [isloadingData, setIsloadingData] = useState({});
  const [currentPage_SpostHistory, setCurrentPage_SpostHistory] = useState(1);
  const [totalHistory, settotalHistory] = useState(0);
  const [recordsPerPage] = useState(25);

  const loadingChange = (data = {}) => {
    const dataCopy = Object.assign({}, isloadingData);
    dataCopy[data.key] = data.value;
    setIsloadingData(dataCopy);
  };

  const getProfitList_Call = async () => {
    const apiData = {
      limit: currentPage_SpostHistory,
      offset: recordsPerPage * (currentPage_SpostHistory - 1),
    };
    loadingChange({ key: "getProfitList_API", value: true });
    const resp = await getProfitList_API(apiData);
    loadingChange({ key: "getProfitList_API", value: false });
    if (resp.status === true) {
      setTradeHistory(resp.list);
      settotalHistory(resp.count);
    } else {
      setTradeHistory([]);
    }
  };

  useEffect(() => {
    console.log("getProfitList_Call 1 : ");
    getProfitList_Call();
  }, []);

  async function handlePageChange(currentPage_tradeHis) {
    setCurrentPage_SpostHistory(currentPage_tradeHis);
    try {
      const data = {
        limit: recordsPerPage,
        offset: recordsPerPage * (currentPage_tradeHis - 1),
      };
      const params = {
        url: `${Config.V2_API_URL}trade/profit/list`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status && response.list) {
        settotalHistory(response.count);
        setTradeHistory(response.list);
      }
    } catch (err) {}
  }

  const getOrderDetail_call = async (orderId) => {
    setTraHisDetails({});
    const data = {
      payload: {
        orderId: orderId,
      },
    };
    const resp = await getOrderDetail_API(data);
    if (resp.status === true && resp.response) {
      setTraHisDetails(resp.response);
    }
  };

  function decimalValue(value, decimal) {
    return showNumber(parseFloat(value).toFixed(decimal));
  }

  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-12 referYourFriendsTable dashboard-spot-trade-history-section dashboard-spot-trade-width-section">
            <h3 className="head-profile">Trade History</h3>
            <TradeHistoryTable
              traHisData={tradeHistory}
              getOrderDetail_call= {getOrderDetail_call}
              decimalValue = {decimalValue}
            />
            <Pagination
              className="spot_history_pagination"
              total={Math.ceil(totalHistory / recordsPerPage)}
              current={currentPage_SpostHistory}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
        <TradeHistoryDetail
          traHisDetails={traHisDetails}
          decimalValue = {decimalValue}
        />
      </div>
    </div>
  );
}
