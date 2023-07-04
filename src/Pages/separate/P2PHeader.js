import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoFile } from "react-icons/go";
import { BsPersonBoundingBox } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";
import { TbReceipt } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiAddCircleFill } from 'react-icons/ri';
import { GrFormAdd } from "react-icons/gr";
import { useContextData } from "../../core/context";
import { isEmpty, pageAllowCheck } from "../../core/helper/common";
import { toast } from "../../core/lib/toastAlert";

const P2PHeaderComponent = () => {
  const navigate = useNavigate();
  const { myProfile, setUserProfile, p2pSettings } = useContextData();

  async function navigateTo(navigateUurl = "") {
    // navigate(navigateUurl);
    const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
    if (pageAllowCheckResp.type == "error") {
      toast({
        type: pageAllowCheckResp.type,
        message: pageAllowCheckResp.message,
      });
      navigate(pageAllowCheckResp.navigate);
    } else {
      navigate(navigateUurl);
    }
  }

  return (
    <section className="p2p-trade-hero-section-two-nav-bg">
      <div className="container col-lg-6">
        <div className="d-flex flex-row justify-content-end p2p-trade-hero-second-nav py-3">
          <div className=" align-items-center px-lg-4">
            <div className="">
              <a
                href="javascript:void(0)"
                onClick={() => navigate("/trade/all-payments")}
                className="p2p-second-nav-content-title"
              >
                P2P
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center px-4">
            <div className="">
              <GoFile className="p2p-second-nav-icons" />
            </div>
            <div className="ps-2">
              <a
                href="javascript:void(0)"
                onClick={() => navigate("/p2p-orders-list")}
                className="p2p-second-nav-content-title"
              >
                Orders
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center px-4">
            <div className="">
              <BsPersonBoundingBox className="p2p-second-nav-icons" />
            </div>
            <div className="ps-2">
              <a
                href="javascript:void(0)"
                onClick={() => navigate("/p2p-user-center")}
                className="p2p-second-nav-content-title"
              >
                P2P User Center
              </a>
            </div>
          </div>
          <div className="align-items-center px-4">
            <div className="ps-1">
              <div className="dropdown">
                <span
                  className=" p2p-second-nav-content-title dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsThreeDotsVertical className="p2p-second-nav-icons" /> More
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item align-items-center"
                      href="javascript:void(0)"
                      onClick={() => navigate("/p2p-user-center")}
                    >
                      <span className="align-items-center ">
                        <HiCurrencyDollar className="p2p-second-nav-icons-more-button" />
                      </span>
                      <span className="ps-1 align-items-center">
                        Payment Methods
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={() => navigateTo("/postAd")}
                    >
                      <span className="align-items-center ">
                        <RiAddCircleFill className="p2p-second-nav-icons-more-button" />
                      </span>
                      <span className="ps-1 align-items-center">
                        Post new Ad 
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={() => navigateTo("/myads")}
                    >
                      <span className="align-items-center ">
                        <TbReceipt className="p2p-second-nav-icons-more-button" />
                      </span>
                      <span className="ps-1 align-items-center">My ads</span>
                    </a>
                  </li>
                </ul>
                <IoMdArrowDropdown className="p2p-second-nav-icons" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default P2PHeaderComponent;
