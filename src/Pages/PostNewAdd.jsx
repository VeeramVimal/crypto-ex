import React, { useEffect, useState } from 'react'
import NavbarOne from "./separate/NavbarOne";
import P2PHeader from "./separate/P2PHeader";
import "../assets/styledev.css";
import { FaEdit } from 'react-icons/fa'
import { AiOutlineArrowRight } from "react-icons/ai"
import { dateFormat, shortAdrress } from '../core/helper/date-format';
import { useContextData } from '../core/context/index'
import * as yup from 'yup';
import { useFormik, Form, Formik } from 'formik';
import { makeRequest } from "../core/services/v1/request";
import Config from "../core/config/";
import { toast } from "../core/lib/toastAlert";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const validationSchema = yup.object({
  total: yup
    .number()
    .typeError('Enter trading amount')
    .required('Enter trading amount'),
  minAmt: yup
    .number()
    .typeError('Please enter min order limit')
    .required('Please enter min order limit'),
  maxAmt: yup
    .number()
    .typeError('Please enter max order limit')
    .required('Please enter max order limit')
});
const authcodevalidationSchema = yup.object({
  authCode: yup
    .number()
    .typeError('Enter Google authentication code')
    .required('Google authentication code is required'),
});

export default function PostNewAdd(props) {

  const navigate = useNavigate();
  const { myProfile, siteSettings, p2pSettings } = useContextData();

  const defaultPassData = {
    registeredStatus: false,
    holdingStatus: false,
    checkedKyc: false,
    registeredDays: 0,
    holdingBTC: 0,
    remarks: "",
    autoreply: "",
    country: "",
  };
  const [step, setStep] = useState(1);
  const [currentInrPrice, setcurrentInrPrice] = useState(0);
  const [changeInrPrice, setchangeInrPrice] = useState(0);
  const [floatingPrice, setfloatingPrice] = useState(100);
  const [totalFloat, settotalFloat] = useState(0);
  const [minAmount, setminAmount] = useState(15);
  const [maxAmount, setmaxAmount] = useState(2000000);
  const [paymentTime, setpaymentTime] = useState(15);
  const [orderPrice, setorderPrice] = useState(0);
  const [priceType, setpriceType] = useState('Fixed');
  const [onlineOfflineStatus, setonlineOffline] = useState('Online');
  const [orderType, setorderType] = useState('buy');
  const [isLoading, setisLoading] = useState(false);
  const [payementOpen, setpayementOpen] = useState(false);
  const [verificationformOpen, setverificationformOpen] = useState(false);
  const [confirmformOpen, setconfirmformOpen] = useState(false);
  const [userWallet, setuserWallet] = useState([]);
  const [pairDetails, setpairDetails] = useState([]);
  const [selectValue, setselectValue] = useState([]);
  const [paymentNames, setpaymentNames] = useState({});
  const [myadsList, setmyadsList] = useState([]);
  const [passData, setpassData] = useState(defaultPassData);
  const [paymentDetails, setpaymentDetails] = useState({});
  const [total, settotal] = useState(0);
  const [minAmt, setminAmt] = useState(0);
  const [maxAmt, setmaxAmt] = useState(0);
  const [mypaymentNames, setmypaymentNames] = useState([]);
  const [allpaymentsList, setallpaymentsList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [currentTab, setCurrentTab] = useState("buy");
  const [allPairsList, setallPairsList] = useState([]);
  const [selectPair, setselectPair] = useState("");

  const [selectedData, setselectedData] = useState([]);
  const [selectedType, setselectedType] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('All Regions');

  const [errors, errors_set] = useState("");
  const [errors1, errors_set1] = useState("");
  const errorType = 'error';

  useEffect(() => {
    if (p2pSettings) {
      if (p2pSettings.minAmount) {
        setminAmount(p2pSettings.minAmount)
      }
      if (p2pSettings.maxAmount) {
        setmaxAmount(p2pSettings.maxAmount)
      }
    }
    getallPairs()
  }, [p2pSettings]);

  async function getallPairs() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getallPairs`,
        method: 'GET',
      }
      const response = (await makeRequest(params));
      if (response.status) {
        let pairsList = [];
        response.data.length > 0 && response.data.map(async (item, i) => {
          if (item && item.pairs) {
            const {
              pairs = []
            } = item;
            pairs.length > 0 && pairs.map((data, index) => {
              pairsList.push(data.pair);
              setallPairsList(pairsList);
            });
            if (i == 0 && pairs[0]) {
              setpairDetails(pairs[0])
              setselectPair(pairs[0].pair);
              // getCurrentPairPrice(pairs[0].pair);

              // getp2pPair(pairs[0].pair);
            }
          }
        })
      }
    } catch (err) { }
  }

  async function handleTabSelect(type) {
    formik.values = "";
    passData.orderType = type;
    setpassData(passData);

    setCurrentTab(type);
    setorderType(type);

    // getpriceRangeDet(type);
    // getp2pPair(selectPair);
    // getCurrentPairPrice(selectPair);
  };
  const formik = useFormik({
    initialValues: {
      authCode: '',
    },
    validationSchema: authcodevalidationSchema,
    onSubmit: async (values) => {
      setisLoading(true);
      const data = {
        userId: myProfile?._id,
        authCode: values.authCode,
        passData: passData
      }
      const params = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/p2p/submitVerification`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      if (response.status) {
        setconfirmformOpen(true);
        setverificationformOpen(false);
      } else {
        let type = 'error';
        toast({ type, message: response.message });
        if (response.type == "KYC") {
          navigate("/identification");
        } else if (response.type == "TFA" || response.type == "2FA") {
          navigate("/security");
        }
      }
      setisLoading(false);
    },
  });
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      {step == 1 &&
        <div className="container mt-5 pt-5">
          <div className="card bg-transparent border border-secondary">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8  css-tab-col">
                  <ul className="nav nav-pills mb-4 d-flex justify-content-center" id="pills-tab" role="tablist">
                    <li className="nav-item tab-css" role="presentation">
                      <button className="btn  btnfont nav-link px-0 mx-2 px-1 active " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => handleTabSelect("buy")}>I want to buy</button>
                    </li>
                    <li className="nav-item tab-css" role="presentation">
                      <button className="btn  btnfont nav-link px-0 mx-2 px-1 " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => handleTabSelect("sell")}>I want to sell</button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div className={currentTab == "sell" ? "tab-pane fade show active" : "tab-pane fade active"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between flex-column flex-lg-row align-items-center">
                            <div>
                              <label className='form-label'>asset</label>
                              <select className="form-select w-100" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            <div >
                              <h4><AiOutlineArrowRight /></h4>
                            </div>
                            <div>
                              <label className='form-label'>With cash</label>
                              <select className="form-select w-100" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 mt-5">
                          <h6>Your price</h6>
                          <h1>$20.05</h1>
                        </div>
                        <div className="col-lg-4 mt-5">
                          <h6>Lowest Order price</h6>
                          <h1>$20.05</h1>
                        </div>
                        <div className="col-lg-12 mt-5">
                          <h4>Price type</h4>
                          <div className='d-flex'>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label className="form-check-label" for="flexRadioDefault1">
                                Fixed
                              </label>
                            </div>
                            <div className="form-check ms-5">
                              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                              <label className="form-check-label" for="flexRadioDefault2">
                                Floating
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mt-5">
                            <div className="card bg-transparent border border-secondary">
                              <div className="card-body">
                                <div className="d-flex">
                                  <button className='btn btn-next'>+</button>
                                  <div className='w-100'><center><h3>81.35</h3></center></div>
                                  <button className='btn btn-next'>-</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between flex-column flex-lg-row align-items-center">
                        <div>
                        <label className='form-label'>asset</label>
                        <select className="form-select w-100" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                        </div>
                        <div >
                        <h4><AiOutlineArrowRight/></h4>
                        </div>
                        <div>
                        <label className='form-label'>With cash</label>
                        <select className="form-select w-100" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                        </div>
                        </div>
                      </div>
                      <div className="col-lg-4 mt-5">
                        <h6>Your price</h6>
                        <h1>$20.05</h1>
                      </div>
                      <div className="col-lg-4 mt-5">
                        <h6>Lowest Order price</h6>
                        <h1>$20.05</h1>
                      </div>
                      <div className="col-lg-12 mt-5">
                        <h4>Price type</h4>
                        <div className='d-flex'>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                            <label className="form-check-label" for="flexRadioDefault1">
                            Fixed
                            </label>
                          </div>  
                          <div className="form-check ms-5">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                            <label className="form-check-label" for="flexRadioDefault2">
                            Floating
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 mt-5">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex">
                                <button className='btn btn-next'>+</button>
                                <div className='w-100'><center><h3>81.35</h3></center></div>
                                <button className='btn btn-next'>-</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className="col-lg-12">
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {step == 2 &&
        <div className='container mt-5 pt-5'>
          <div className='row'>
            <div className='col-lg-12 '>
              <div className="card bg-transparent border border-secondary">
                <div className="card-body">
                  <label>total amount</label>
                  <div className="row ">
                    <div className="col-lg-8 ">
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                        <span className="input-group-text bg-white" id="basic-addon1">USDT</span>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div>
                          <p>available : 0 USDT</p>
                        </div>
                        <div>
                          <p>= 0 INR</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 ">
                      <div className='d-flex  flex-md-row justify-content-between'>
                        <div>
                          <label>Order Limit</label>
                          <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                            <span className="input-group-text bg-white" id="basic-addon1">USDT</span>
                          </div>
                        </div>
                        <div className=' mt-4 float-end'>
                          <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                            <span className="input-group-text bg-white" id="basic-addon1">INR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p><b>Payment method</b></p>
                    <p>Select up to 5</p>
                    <button className='btn btn-next mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add</button>
                    <p className='mt-3'>Payment time limit</p>
                    <select className="form-select w-25" aria-label="Default select example">
                      <option selected>15 Mins</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {step == 3 &&
        <div className="container mt-5 pt-5">
          <div className='card bg-transparent border border-secondary'>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  <div >
                    <label for="floatingTextarea">Remarks (optional)</label>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                  </div>
                  <div className=" mt-3">
                    <label for="floatingTextarea">Auto replay (optional)</label>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                  </div>

                  <select className="form-select mt-3" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className=" mt-4">
                    <label for="floatingTextarea">CounterParty Condition</label>
                  </div>
                  <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" for="flexCheckDefault">
                      Complete KYC
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                          Registered
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-2">
                        <input type="number" className="form-control" />
                        <label className="form-label"><small className='text-muted'>days ago</small></label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                          Holding more than
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-2">
                        <input type="number" className="form-control" />
                        <label className="form-label"><small className='text-muted'>USDT</small></label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className='d-flex'>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label className="form-check-label" for="flexRadioDefault1">
                            Online right now
                          </label>
                        </div>
                        <div className="form-check ms-4">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                          <label className="form-check-label" for="flexRadioDefault2">
                            Offline manually later
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className='d-flex justify-content-between mt-5'>
              <div>
                <p>Resived fee --USDT</p>
              </div>
              <div>
                <button className='btn btn-next'>Next</button>
                <button className='btn btn-next ms-2'>Previous</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Select payment method</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='bg-gray p-2 '>
                <div className='d-flex my-3 justify-content-between'>
                  <div>Bank transfer (india)</div>
                  <div><FaEdit></FaEdit></div>
                </div>
                <p><b>Account holder name :</b> venkatesh ponraj</p>
                <p><b>Account number :</b> 1234567890</p>
                <p><b>IFSC code:</b> qwe4567890</p>
                <p><b>Account type :</b> qwe4567890</p>
                <p><b>Bank name :</b> paytm</p>
              </div>

              <div className='bg-gray mt-2 p-2 '>
                <div className='d-flex my-3 justify-content-between'>
                  <div>UPI</div>
                  <div><FaEdit></FaEdit></div>
                </div>
                <p><b>Name :</b> venkatesh ponraj</p>
                <p><b>UPI ID :</b> 1234567890</p>
              </div>

              <div className='bg-gray p-2 mt-2'>
                <div className='d-flex my-3 justify-content-between'>
                  <div>IMPS</div>
                  <div><FaEdit></FaEdit></div>
                </div>
                <p><b>Name :</b> venkatesh ponraj</p>
                <p><b>Bank account number :</b> 1234567890</p>
                <p><b>IFSC code:</b> qwe4567890</p>
                <p><b>Bank name :</b> paytm</p>
              </div>

              <div className='bg-gray mt-2 p-2 '>
                <div className='d-flex my-3 justify-content-between'>
                  <div>UPI</div>
                  <div><FaEdit></FaEdit></div>
                </div>
                <p><b>Name :</b> venkatesh ponraj</p>
                <p><b>UPI ID :</b> 1234567890</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Add</button>
              <button type="button" className="btn btn-next">Refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
