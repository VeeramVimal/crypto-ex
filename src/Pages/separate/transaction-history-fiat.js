import React, { useEffect, useState } from "react";

import { BsLink45Deg } from "react-icons/bs";
import noreplay from "../../assets/images/deposit/no-re.png";
import { makeRequest } from "../../core/services/v1/request";
import Config from "../../core/config/";
import { dateFormat } from '../../core/helper/date-format';
import { toast } from "../../core/lib/toastAlert";
import Pagination from 'react-responsive-pagination';
import '../../pagination.css';

import $ from "jquery";

export default function TransactionhistoryFiat(props) {

  const [transactionList, settransactionList] = useState([]);
  const [filter, setFilter] = useState({
    tab: 'Fiat',
    type: 'Deposit'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalorders, settotalorders] = useState(0);

  // useEffect(() => {
  //   getHistory();
  // }, []);

  useEffect(() => {
    $(".status_change .dropdown-item").click(function () {
      // const getStatusText = $(this).text();
      // $(this)
      //   .closest(".status_dropdown")
      //   .find(".status__btn")
      //   .text(getStatusText);
      const generateStatusClass = `${$(this).attr("data-class")}-status`;
      $(this)
        .closest(".status_dropdown")
        .attr("data-color", `${generateStatusClass}`);
    });
  }, []);

  useEffect(() => {
    getHistory();
  }, [filter]);

  async function filterChange(data) {
    const {
      target= "",
      value= ""
    } = data;
    let filterCopy = Object.assign({}, filter);
    if(target && value) {
      if(target == 'type') {
        filterCopy.type = value;
        setFilter(filterCopy);
      }
    }
  }

  async function getHistory() {
    try {
      const params = { 
        url: `${Config.V1_API_URL}wallet/getHistoryWithFilter`,
        method: 'POST',
        data: {filter}
      }
      const response = (await makeRequest(params));
      if (response.status) {
        settransactionList(response.data);
        settotalorders(response.total);
      }
    } catch(err){}
  }
  const noOfPages = Math.ceil(totalorders / recordsPerPage);

  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  }
  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
      setCurrentPage(newCurrentPage);
      getPagination( newCurrentPage)
    }
  }
  async function getPagination( page ) {
    try {
      const data = {
        filter,
        limit: recordsPerPage,
        offset: recordsPerPage * (page - 1)
      };
      const params = {
        url: `${Config.V1_API_URL}wallet/getHistoryWithFilter`,
        method: "POST",
        body: data,
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        settransactionList(response.data);
        settotalorders(response.total);
      }
    } catch (err) { }
  }
  function copyText(data = {}) {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.value = data.text;
    input.select();
    document.execCommand("Copy");
    input.remove();
    let message = "";
    if(data.type == "TxnId") {
      message = "Txn id copied successfully!";
    }
    toast({ type: 'success', message });
  }

  function bonusAmount(trxn) {
    try{
      if(typeof trxn.bonusData == 'object' && trxn.bonusData.bonusGiven > 0) {
        return trxn.bonusData.bonusGiven.toFixed(trxn.currencyId.siteDecimal);
      } else {
        if(trxn.depositType == 'Pre Booking') {
          return '-';
        } else {
          return 'NA';
        }
      }
    } catch(err){}
  }

  return (<>
    <div className="transaction-history-second-section py-3 ">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex flex-row mt-3 transaction-history-select-section flex-wrap gap-3">
              <div className="me-3">
                <span className="transaction-text-1">Type</span>
                <div className="custom-dropdown-trans-section">
                  <div
                    className="dropdown custom-dropdown status_dropdown"
                    data-color="created-status"
                  >
                    <button
                      className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-offset="0,12"
                    >
                      {filter.type}
                    </button>
                    <ul
                      className="dropdown-menu status_change"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="stoplimit"
                          href="#"
                          onClick={() => filterChange({
                            target: 'type',
                            value: "Deposit"
                          })}
                        >
                          Deposit
                        </a>
                      </li>
                      <li >
                        <a
                          className="dropdown-item"
                          data-class="trailingstop"
                          href="#"
                          onClick={() => filterChange({
                            target: 'type',
                            value: "Withdraw"
                          })}
                        >
                          Withdraw
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="me-3">
                <span className="transaction-text-1">Type</span>
                <div className="custom-dropdown-trans-section">
                  <div
                    className="dropdown custom-dropdown status_dropdown"
                    data-color="created-status"
                  >
                    <button
                      className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-offset="0,12"
                    >
                      Past 30 days
                    </button>
                    <ul
                      className="dropdown-menu status_change"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="stoplimit"
                          href="#"
                        >
                          Past 30 days
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="trailingstop"
                          href="#"
                        >
                          Past 15 days
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="trailingstop"
                          href="#"
                        >
                          Past 10 days
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="trailingstop"
                          href="#"
                        >
                          Past 5 days
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* <div className="me-3">
                <span className="transaction-text-1">Asset</span>
                <div className="custom-dropdown-trans-section">
                  <div
                    className="dropdown custom-dropdown status_dropdown"
                    data-color="created-status"
                  >
                    <button
                      className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-offset="0,12"
                    >
                      All
                    </button>
                    <ul
                      className="dropdown-menu status_change"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="stoplimit"
                          href="#"
                        >
                          Alls
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="trailingstop"
                          href="#"
                        >
                          All
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* <div className="me-3">
                <span className="transaction-text-1">Status</span>
                <div className="custom-dropdown-trans-section">
                  <div
                    className="dropdown custom-dropdown status_dropdown"
                    data-color="created-status"
                  >
                    <button
                      className="select-dropdown-btn dropdown-toggle w-100 d-flex align-items-center justify-content-between status__btn"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-offset="0,12"
                    >
                      All
                    </button>
                    <ul
                      className="dropdown-menu status_change"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="stoplimit"
                          href="#"
                        >
                          All
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-class="trailingstop"
                          href="#"
                        >
                          All
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* <div className="me-3">
                <span className="transaction-text-1">TxID</span>
                <input
                  type="text"
                  className="transaction-form-control"
                  placeholder="Enter TxID"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container deposit-fourth-section">
      <div className="row align-items-center">
        <div className="col-lg-12">
          {/* <h1 className="deposit-text-11">Recent Deposits</h1> */}
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Asset</th>
                <th>Amount</th>
                <th>Bonus</th>
                <th>Txn ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(transactionList && transactionList.length > 0) ? transactionList.map((item, i) => (
              <tr key={i}>
                <td data-label="Time">
                  {dateFormat(item.createdDate)}
                </td>
                <td data-label="Type">{item.type}</td>
                <td data-label="Asset">{item.currencyDet && item.currencyDet.currencySymbol}</td>
                <td data-label="Amount">{item.amount}</td>
                <td data-label="Amount">{bonusAmount(item)}</td>
                <td data-label="Amount">
                  { item.txnId != "" ? <p onClick={() => copyText({
                    type: "TxnId",
                    text: item.txnId
                  })}>
                    <BsLink45Deg className="dest-addres-link" />
                    <label className="dest-addres-ellipsis">
                      {/* <BsLink45Deg className="dest-addres-link" /> */}
                    {item.txnId}
                  </label></p> : "-"}
                </td>
                <td data-label="Amount">{item.status == 0 ? 'Pending' : item.status == 2 ? 'Rejected' :'Processing' }</td>
              </tr>
              )) : <tr className="no-records-found">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <img
                  className="no-record-image"
                  src={noreplay}
                  alt="no-record"
                />
                <br />
                <span className="text-center">No Records Found</span>
              </td>
              <td></td>
              <td></td>

            </tr> }
            </tbody>
          </table>
          {totalorders > recordsPerPage &&
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-end">
                <Pagination className="p2p-trade-pagination"
                  total={Math.ceil(totalorders / recordsPerPage)}
                  current={currentPage}
                  onPageChange={page => clickPageNo(page)}
                />
              </div>
            </div>
          }
          {/* {(transactionList && transactionList.length > 10) &&
          <div className="d-flex flex-row mt-4 mb-5">
            <div className="mx-auto">
              <button type="button" className="table-view-all-deposit-button-1">
                View More{" "}
                <BsFillArrowRightCircleFill className="view-more-icon" />
              </button>
              <button type="button" className="table-view-all-deposit-button-2">
                View Less{" "}
                <BsFillArrowRightCircleFill className="view-more-icon" />
              </button>
            </div>
          </div>} */}
        </div>
      </div>
      
    </div>
  </>
  );
}