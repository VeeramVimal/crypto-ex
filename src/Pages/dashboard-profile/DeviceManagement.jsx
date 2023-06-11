import React,{ useState, useEffect } from 'react'
import NavbarOne from "../siteTheme/NavbarOne";
import {FaArrowCircleLeft} from "react-icons/fa";

import Config from "../../core/config/";
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import { dateFormat } from '../../core/helper/date-format';

import noreplay from "../../assets/images/deposit/no-re.png";
import { BrowserRouter as Router,useNavigate } from "react-router-dom";
import Pagination from 'react-responsive-pagination';
import '../../pagination.css';

export default function DeviceManagement(props) {

  const navigate = useNavigate();
  const [loginActivities, setloginActivities] = useState([]);
  const [recordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesTotal, setactivitiesTotal] = useState(0);


  useEffect(() => {
    getLoginActivities();
  }, []);

  async function getLoginActivities(){
    try {
      const data = {
        limit: recordsPerPage,
        offset: 0
      }
      const params = {
        url: `${Config.V2_API_URL}user/loginHistory`,
        method: "POST",
        body: data
      };
      const response = await makeRequest(params);
      if (response.status && response.history) {
        setloginActivities(response.history);
        setactivitiesTotal(response.activitiesTotal)
      }
    } catch (err){}
  }
  const noOfPages = Math.ceil(activitiesTotal / recordsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= noOfPages; i++) {
    pageNumbers.push(i);
  }
  const prevPage = () => {
    pageChange(currentPage - 1);
  }
  const clickPageNo = (pgNumber) => {
    pageChange(pgNumber);
  }
  const nextPage = () => {
    pageChange(currentPage + 1);
  };
  const pageChange = (newCurrentPage) => {
    if (newCurrentPage >= 1 && newCurrentPage <= noOfPages) {
      setCurrentPage(newCurrentPage);
      getPagination(newCurrentPage)
    }
  }
  async function getPagination(
    newCurrentPage
  ) {
    try {
      const data = {
        limit: recordsPerPage,
        offset: recordsPerPage * (newCurrentPage - 1)
    }
      const params = {
        url: `${Config.V2_API_URL}user/loginHistory`,
        method: "POST",
        body: data
      };
      const response = await makeRequest(params);
      if (response.status && response.history) {
        setloginActivities(response.history);
      }
    } catch (err) {}
  }
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className='container device-management-table mt-5 pt-5'>
        <div className='row'>
        <div className='col-lg-12'>
          <h2><FaArrowCircleLeft onClick={()=>navigate("/my/profile")}/> Security</h2>
          <h1 className='mt-5'>Login Activites</h1>
          <p className='my-3'>Your login activites details listed</p>
          <table className="table mt-5 ">
            <thead className=''>
              <tr>
                <th scope="col">Device</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">IP Address</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
            {loginActivities.length > 0 ? 
              loginActivities.map((row,i)=>{
              return(
                <>
                  <tr>
                    <td>{row.browser}</td>
                    <td>{dateFormat(row.dateTime)}</td>
                    <td>{row.ipDetails != "" ? JSON.parse(row?.ipDetails)?.city : "-"}</td>
                    <td>{row?.ip !="" ? row.ip : "-" }</td>
                    {/* <td><button className='btn btn-outline-danger'>delete</button></td> */}
                  </tr>
                </>
                )
              })
              :
                <tr className="no-records-found">
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
                </tr>
            }
            </tbody>
          </table>
          <Pagination className="spot_history_pagination"
              total={Math.ceil(activitiesTotal / recordsPerPage)}
              current={currentPage}
              onPageChange={page => clickPageNo(page)}
            />
          {/* { activitiesTotal > recordsPerPage && 
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination bg-transparent">
                    <li className="page-item" isDisabled={true}>
                      <a className={"page-link bg-transparent text-success"+(currentPage == 1 ? " disabled" : "")} href="javascript:void(0)" onClick={prevPage}> {"<"} </a>
                    </li>
                    { pageNumbers.map((pgNumber,index) => (
                      <li key={index} className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                        <a onClick={() => clickPageNo(pgNumber)}  
                            className={'page-link bg-transparent text-success'} 
                            href='javascript:void(0);'
                          >
                            {pgNumber}
                          </a>
                        </li>
                      ))
                    }
                    <li className="page-item"><a className="page-link bg-transparent text-success " href="javascript:void(0)" onClick={nextPage}>{">"}</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          } */}
        {/* 
        <h4 className='text-center'>No authenticators added</h4>

        <p className='text-center'>
            To protect your account, add Biometric <br></br> Authenticator or a Security Key for  faster<br></br> and more secure verification.
        </p> */}

        </div>
        {/* <div className='d-flex justify-content-end mt-4'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
        </div> */}
        </div>
      </div>
    </div>
   
  )
}
