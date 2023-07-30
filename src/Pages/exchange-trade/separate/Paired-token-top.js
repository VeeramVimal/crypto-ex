import React, { useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import $ from "jquery";

export default function Spot(props) {

  useEffect(() => {
    $(".spot-page-pair-select-dropdown .dropdown-menu").click(function (e) {
      e.stopPropagation();
    })
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex flex-row flex-wrap gap-lg-0 gap-4 trading-page-top-section-1 align-items-center ps-2">
          <div className="trading-page-section-1">
            <div className="spot-page-pair-select-dropdown">
              <div className="dropdown"  >
                <span className="trade-text-1 dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  BTC/USDT
                </span>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li className="dropdown-item p-0">
                    <div className="row paired-trade-dropdown-tabs px-3 pt-3 g-4">
                      <div className="col-7 paired-trade-dropdown-tabs-1 justify-content-between">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-openorders-tab" data-bs-toggle="pill" data-bs-target="#pills-openorders" type="button" role="tab" aria-controls="pills-openorders" aria-selected="false">USDT</button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-orderhistory-tab" data-bs-toggle="pill" data-bs-target="#pills-btc" type="button" role="tab" aria-controls="pills-btc" aria-selected="false">BTC</button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-tradehistory-tab" data-bs-toggle="pill" data-bs-target="#pills-inr" type="button" role="tab" aria-controls="pills-inr" aria-selected="false">INR</button>
                          </li>
                          
                        </ul>
                      </div>
                      <div className="col-4 paired-trade-dropdown-tabs-1 ms-2">
                        <div className="input-group">
                          <input type="text" className="form-control p-0" placeholder="S e a r c h . . ." aria-label="Username" aria-describedby="basic-addon1" />
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
                          <tr onClick={() => alert('yes')}>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>  <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                          <tr>
                            <td>1INCH/USDT</td>
                            <td>0.913</td>
                            <td>0.00%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="trading-page-section-1">
            <p className='trade-text-4'>19,097.15</p>
          </div>
          <div className="trading-page-section-1 ps-lg-4">
            <p className='trade-text-6'>High</p>
            <p className='trade-text-7'>19,854.48</p>
          </div>
          <div className="trading-page-section-1">
            <p className='trade-text-6'>Low</p>
            <p className='trade-text-7'>19,037.39</p>
          </div>
          <div className="trading-page-section-1">
            <p className='trade-text-6'>24h Volume(BTC)</p>
            <p className='trade-text-7'>259,521.34</p>
          </div>
          <div className="trading-page-section-1 border-0">
            <p className='trade-text-6'>24h Change</p>
            <p className='trade-text-7 fc-r'>-483.30 -2.47%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
