import React, { useState, useEffect } from "react";
import { BiIdCard } from "react-icons/bi";
import { BsInfoCircle, BsFillTrashFill } from "react-icons/bs";
import { useFileUpload } from "use-file-upload";
import { TbUpload } from "react-icons/tb";
import { MdOutlineDeleteForever, MdDone } from "react-icons/md";
import Aadhaarfront from "../assets/images/verification/aadhaarfront.png";
import Aadhaarback from "../assets/images/verification/aadhaarback.png";
import Pan from "../assets/images/verification/pan.png";
import Selfie from "../assets/images/verification/selfie.png";
import loaderImage3 from "..//assets/images/loadingGif.gif";

import { FileUploader } from "react-drag-drop-files";

import KycStatusComp from "./separate/kycStatusComp";
import { isEmpty } from "../core/helper/common";

import { useFormik,Formik } from 'formik';
import * as yup from "yup";

import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid
} from '@mui/material';

import { useContextData } from '../core/context/';
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function Identification(props) {

  const navigate = useNavigate();

  const { siteSettings, myProfile, setUserProfile } = useContextData();

  const [onlineKYCPan, setonlineKYCPan] = useState({
    pan_number: "",
    step: "getNumber"
  });
  const [offlineKYCPan, setofflineKYCPan] = useState({
    pan_number: "",
    pan_name: "",
    step: "getNumber"
  });

  const [onlineKYCAadhaar, setonlineKYCAadhaar] = useState({
    aadhaar_number: "",
    otp: "",
    step: "getNumber"
  });
  const [offlineKYCAadhaar, setofflineKYCAadhaar] = useState({
    aadhaar_number: "",
    aadhaar_name: "",
    aadhaar_address: "",
    aadhaar_pincode: "",
    step: "getNumber"
  });

  const [isLoading, setisLoading] = useState(false);
  const [isLoading_sec, setisLoading_sec] = useState(false);
  const [onlineKYCSelfieUpl, setOnlineKYCSelfieUpl] = useState(false);

  const [tabnameNewSave, settabnameNewSave] = useState("");
  const [KycMode, setKycMode] = useState("Offline");

  const [filesOnlineSelfie, setfilesOnlineSelfie] = useState({});
  const [kycDocsOnlineSelfie, setkycDocsOnlineSelfie] = useState("");

  const [filesOffline, setfilesOffline] = useState({});

  const [kycDocsOfflinePan, setkycDocsOfflinePan] = useState("");
  const [kycDocsOfflineAadhaar, setkycDocsOfflineAadhaar] = useState("");
  const [kycDocsOfflineAadhaarBack, setkycDocsOfflineAadhaarBack] = useState("");
  const [kycDocsOfflineSelfie, setkycDocsOfflineSelfie] = useState("");

  const [clickAccCol, setClickAccCol] = useState({no:false});

  const [files1, setfiles1] = useState({});
  const [kycUserType, setkycUserType] = useState("");

  const [KYCSteps, setKYCSteps] = useState({
    offline: {
      "IND": {
        step1: {
          header: "Pan verification",
          field1: {
            label: "Enter pan number",
            errMsg: {
              required: "Please enter your pan number"
            }
          },
          field2: {
            label: "Enter pan name",
            errMsg: {
              required: "Please enter your pan name"
            }
          },
          field3: {
            label: "Select pan image",
            errMsg: {
              required: "Please select pan image"
            }
          }
        },
        step2: {
          header: "Aadhaar verification",
          field1: {
            label: "Enter aadhaar number",
            errMsg: {
              required: "Please enter your aadhaar number"
            }
          },
          field2: {
            label: "Enter aadhaar name",
            errMsg: {
              required: "Please enter your aadhaar name"
            }
          },
          field3: {
            label: "Enter your address",
            errMsg: {
              required: "Please enter your address"
            }
          },
          field4: {
            label: "Enter your pincode",
            errMsg: {
              required: "Please enter your pincode"
            }
          },
          field5: {
            label: "Aadhaar Front side",
            errMsg: {
              required: "Please select front side image"
            }
          },
          field6: {
            label: "Aadhaar Back side",
            errMsg: {
              required: "Please select back side image"
            }
          },
        },
        step3: {
          header: "Selfie verification",
          errMsg: {
            required: "Please select your selfie image"
          }
        }
      },
      "International": {
        step1: {
          header: "Passport verification (Driving licence verification)",
          field1: {
            label: "Enter verification number",
            errMsg: {
              required: "Please enter verification number"
            }
          },
          field2: {
            label: "Enter verification name",
            errMsg: {
              required: "Please enter verification name"
            }
          }
        },
        step2: {
          header: "Identification verification (National ID)",
          field1: {
            label: "Enter identification number",
            errMsg: {
              required: "Please enter identification name"
            }
          },
          field2: {
            label: "Enter identification name",
            errMsg: {
              required: "Please enter identification name"
            }
          },
          field3: {
            label: "Enter your address",
            errMsg: {
              required: "Please enter address"
            }
          },
          field4: {
            label: "Enter your pincode",
            errMsg: {
              required: "Please enter pincode"
            }
          },
          field5: {
            label: "Identification Front side",
            errMsg: {
              required: "Please select front side identification image"
            }
          },
          field6: {
            label: "Identification Back side",
            errMsg: {
              required: "Please select back side identification image"
            }
          },
        },
        step3: {
          header: "Selfie verification",
          errMsg: {
            required: "Please select selfie image"
          }
        }
      },
    }
  });

  function handleChangesOffline(event, name = "") {
    if (event) {
      const file = event[0];
      if (file) {
        let files1_copy = Object.assign({}, filesOffline);
        files1_copy[name] = file;
        setfilesOffline(files1_copy)
  
        var reader = new FileReader();
        reader.onload = function (e) {
          if(name == "pan") {
            setkycDocsOfflinePan(e.target.result);
          }
          else if(name == "aadhaar") {
            setkycDocsOfflineAadhaar(e.target.result);
          }
          else if(name == "aadhaarBack") {
            setkycDocsOfflineAadhaarBack(e.target.result);
          }
          else if(name == "selfie") {
            setkycDocsOfflineSelfie(e.target.result);
          }
        }
        reader.readAsDataURL(file);
      }
    }
  }

  function handleChangesOnlineSelfie(event, name) {
    if (event) {
      const file = event[0];
      if (file) {
        let files1_copy = Object.assign({}, files1);
        files1_copy[name] = file;
        setfilesOnlineSelfie(files1_copy);
        setOnlineKYCSelfieUpl(false);
        var reader = new FileReader();
        reader.onload = function (e) {
          setkycDocsOnlineSelfie(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  function onlineKYCAadhaar_handleChange(event) {
    if (event){
      const {
        name = "",
        value = ""
      } = event.target;
  
      if(name === 'aadhaar_number' || name === 'otp') {
        let onlineKYCAadhaarCopy = Object.assign({}, onlineKYCAadhaar);
        onlineKYCAadhaarCopy[name] = value;
        if (name === "aadhaar_number") {
          if(!(value.match(/^[0-9]{0,12}$/))) {
            let msg = "error";
            toast({ type: msg, message: "Please enter 12 digits number only" });
            return false;          
          } 
        } 
        setonlineKYCAadhaar(onlineKYCAadhaarCopy);          
      }
    }
  }

  function offlineKYCAadhaar_handleChange(event) {
    if (event) {
      const {
        name = "",
        value = ""
      } = event.target;
  
      if(name === 'aadhaar_number' || name === 'aadhaar_name' || name === 'aadhaar_address' || name === 'aadhaar_pincode') {
        let offlineKYCAadhaarCopy = Object.assign({}, offlineKYCAadhaar);
        offlineKYCAadhaarCopy[name] = value;
        if (value !== "") {
          if (name === "aadhaar_number") {
            if(!(value.match(/^[0-9]{0,12}$/))) {
              let msg = "error";
              toast({ type: msg, message: "Please enter 12 digits number only" });
              return false;          
            } 
          } 
          if (name === "aadhaar_pincode") {
            if(!(value.match(/^[0-9]+$/))) {
              let msg = "error";
              toast({ type: msg, message: "Please enter numeric values only" });
              return false;
            }
          }
        }
        setofflineKYCAadhaar(offlineKYCAadhaarCopy);
      }
    }
  }

  function onlineKYCPan_handleChange(event) {
    if (event) {
      const {
        name = "",
        value = ""
      } = event.target;
  
      if(name == 'pan_number') {
        let onlineKYCPanCopy = Object.assign({}, onlineKYCPan);
        onlineKYCPanCopy[name] = value;
        if(value.match(/^[0-9 A-Z]{0,10}$/)) {
          setonlineKYCPan(onlineKYCPanCopy);
        } else {
          let msg = "error";
          toast({ type: msg, message: "Please enter 10 digits alphanumeric only" });
          return false;
        }
      }
    }
  }

  function offlineKYCPan_handleChange(event) {
    if (event) {
      const {
        name = "",
        value = ""
      } = event.target;
  
      if(name == 'pan_number' || name == 'pan_name') {
        let offlineKYCPanCopy = Object.assign({}, offlineKYCPan);
        if (name == 'pan_number') {
          if(value.match(/^[0-9 A-Z]{0,10}$/)) {
            offlineKYCPanCopy[name] = value;
            setofflineKYCPan(offlineKYCPanCopy);
          } else {
            let msg = "error";
            toast({ type: msg, message: "Please enter 10 digits alphanumeric only" });
            return false;
          }
        } else {
          offlineKYCPanCopy[name] = value;
          setofflineKYCPan(offlineKYCPanCopy);
        }
      }
    }
  }

  const offlineKYCPanSubmit = async(type = "submit") => {
    if(KYCSteps.offline[kycUserType].step1.field1) {
      if(type == "submit") {
        const step1 = KYCSteps.offline[kycUserType].step1;
        if(isEmpty(offlineKYCPan.pan_number)) {
          toast({ type, message: step1.field1.errMsg.required });
        }
        else if(isEmpty(offlineKYCPan.pan_name)) {
          toast({ type, message: step1.field2.errMsg.required });
        }
        else {
          if(offlineKYCPan.step == "getNumber") {
            let formData = new FormData();
            for (var key in filesOffline) {
              if(key == "pan") {
                let fileToUpload = filesOffline[key];
                let fileName = key;
                let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
                formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
              }
            }

            formData.append('type', "panVerify");
            formData.append('pan_number', offlineKYCPan.pan_number);
            formData.append('pan_name', offlineKYCPan.pan_name);

            const params = {
              url: `${Config.V2_API_URL}kyc/offline/verify/pan`,
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            setisLoading(true);
            const response = await makeRequest(params);
            setisLoading(false);

            let type = 'error';
            if (response.status) {
              type = 'success';
              setUserProfile();
            }
            toast({ type, message: response.message });
          }
        }
      }
    }
  }

  const onlineKYCPanSubmit = async(type = "submit") => {
    if(type == "submit") {
      if(onlineKYCPan.pan_number == "") {
        toast({ type, message: "Please enter your pan number" });
      }
      else {
        if(onlineKYCPan.step == "getNumber") {
          const payload = {
            type: "panVerify",
            pan_number: onlineKYCPan.pan_number
          }
          const params = {
            url: `${Config.V2_API_URL}kyc/online/verify/pan`,
            method: 'POST',
            body: payload,
          }
          setisLoading(true);
          const response = await makeRequest(params);
          setisLoading(false);
          if (response.status) {
            const type = 'success';
            toast({ type, message: response.message });
            setUserProfile();
          } else {
            const type = 'error';
            toast({ type, message: response.message });
          }
        }
      }
    }
  }

  const offlineKYCAadhaarSubmit = async(type = "submit") => {
    if(type == "submit") {
      const step2 = KYCSteps.offline[kycUserType].step2;
      if(isEmpty(offlineKYCAadhaar.aadhaar_number)) {
        toast({ type, message: step2.field1.errMsg.required });
      }
      else if(isEmpty(offlineKYCAadhaar.aadhaar_name)) {
        toast({ type, message: step2.field2.errMsg.required });
      }
      else if(isEmpty(offlineKYCAadhaar.aadhaar_address)) {
        toast({ type, message: step2.field3.errMsg.required });
      }
      else if(isEmpty(offlineKYCAadhaar.aadhaar_pincode)) {
        toast({ type, message: step2.field4.errMsg.required });
      }
      else {
        if(offlineKYCAadhaar.step == "getNumber") {
          let formData = new FormData();
          for (var key in filesOffline) {
            if(key == "aadhaar" || key == "aadhaarBack") {
              let fileToUpload = filesOffline[key];
              let fileName = key;
              let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
              formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
            }
          }

          formData.append('type', "aadhaarVerify");
          formData.append('aadhaar_number', offlineKYCAadhaar.aadhaar_number);
          formData.append('aadhaar_name', offlineKYCAadhaar.aadhaar_name);
          formData.append('aadhaar_address', offlineKYCAadhaar.aadhaar_address);
          formData.append('aadhaar_pincode', offlineKYCAadhaar.aadhaar_pincode);

          const params = {
            url: `${Config.V2_API_URL}kyc/offline/verify/aadhaar?type=aadhaarVerify`,
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          setisLoading(true);
          const response = await makeRequest(params);
          setisLoading(false);
          let type = 'error';
          if (response.status) {
            type = 'success';
            setUserProfile();
          }
          toast({ type, message: response.message });
        }
      }
    }
  }

  const onlineKYCAadhaarSubmit = async(type = "submit") => {
    if(type == "submit") {
      if(onlineKYCAadhaar.aadhaar_number == "") {
        toast({ type, message: "Please enter your aadhaar number" });
      }
      else {
        if(onlineKYCAadhaar.step == "getNumber") {
          const payload = {
            type: "generateOtp",
            aadhaar_number: onlineKYCAadhaar.aadhaar_number
          }
          const params = {
            url: `${Config.V2_API_URL}kyc/online/verify/aadhaar`,
            method: 'POST',
            body: payload,
          }
          setisLoading(true);
          const response = await makeRequest(params);
          setisLoading(false);
          console.log({response});
          if (response.status) {
            const type = 'success';
            toast({ type, message: response.message });
            let onlineKYCAadhaarCopy = Object.assign({}, onlineKYCAadhaar);
            onlineKYCAadhaarCopy["step"] = "generateOtp";
            setonlineKYCAadhaar(onlineKYCAadhaarCopy);
          } else {
            const type = 'error';
            toast({ type, message: response.message });
          }
        }
        else if(onlineKYCAadhaar.step == "generateOtp") {
          if(onlineKYCAadhaar.otp == "") {
            toast({ type, message: "Please enter valid OTP" });
          }
          else {
            const payload = {
              type: "submitOtp",
              aadhaarOtp: onlineKYCAadhaar.otp
            }
            const params = {
              url: `${Config.V2_API_URL}kyc/online/verify/aadhaar`,
              method: 'POST',
              body: payload
            }
            setisLoading(true);
            const response = await makeRequest(params);
            setisLoading(false);
            console.log({response});
            if (response.status) {
              const type = 'success';
              toast({ type, message: response.message });
              setUserProfile();
              let onlineKYCAadhaarCopy = Object.assign({}, onlineKYCAadhaar);
              onlineKYCAadhaarCopy["step"] = "submitOtp";
              setonlineKYCAadhaar(onlineKYCAadhaarCopy);
            } else {
              const type = 'error';
              toast({ type, message: response.message });
            }
          }
        }
      }
    }
    else {
      let onlineKYCAadhaarCopy = Object.assign({}, onlineKYCAadhaar);
      onlineKYCAadhaarCopy["step"] = "getNumber";
      setonlineKYCAadhaar(onlineKYCAadhaarCopy);
    }
  }

  const offlineKYCSelfieSubmit = async(target = "submit") => {
    let formData = new FormData();
    for (var key in filesOffline) {
      if(key == "selfie") {
        let fileToUpload = filesOffline[key];
        let fileName = key;
        let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
        formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
      }
    }

    const params = {
      url: `${Config.V2_API_URL}kyc/offline/verify/selfie?type=selfieVerify`,
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    setisLoading(true);
    const response = await makeRequest(params);
    setisLoading(false);
    let type = 'error';
    setUserProfile();
    if (response.status) {
      type = 'success';
    }
    toast({ type, message: response.message });
  }

  const onlineKYCSelfieSubmit = async(subType = "selfieSubmit") => {
    if (kycDocsOnlineSelfie) {
      let formData = new FormData();
      for (var key in filesOnlineSelfie) {
        let fileToUpload = filesOnlineSelfie[key];
        let fileName = key;
        let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
        formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
      }
      const params = {
        url: `${Config.V2_API_URL}kyc/online/verify/selfie?type=`+subType,
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      setisLoading(true);
      const response = await makeRequest(params);
      setisLoading(false);
      // if(subType == "checkSelfieVerify") {|
      if(response.uploadedChk) {
        setOnlineKYCSelfieUpl(true);
      }
      else {
        setOnlineKYCSelfieUpl(false);
      }
      let type = 'error';
      if (response.status) {
        type = 'success';
        setUserProfile();
      }
      toast({ type, message: response.message });
    }
    else {
      toast({ type: "error", message: "Please choose your selfie image to submit for selfie verification" });
      setisLoading(false);
    }
  }

  const onlineKYCSelfieSubmitToAdmin = async() => {
    const params = {
      url: `${Config.V2_API_URL}kyc/online/verify/selfie/fromAdmin`,
      method: 'GET'
    }
    setisLoading_sec(true);
    const response = await makeRequest(params);
    setisLoading_sec(false);
    let type = 'error';
    if (response.status) {
      type = 'success';
      setUserProfile();
    }
    toast({ type, message: response.message });
  }
  async function changeKycMode(mode){
    if(mode == "Online"){
      toast({ type: "success", message: "Instant KYC will be Done..!" });
    } else {
      toast({ type: "success", message: "Max 24Hrs will required to complete your KYC...!" });
    }
  }

  useEffect(() => {
    if(props && props.tabnameNew == "identification" && tabnameNewSave != props.tabnameNew) {
      settabnameNewSave(props.tabnameNew)
      setUserProfile();
    }
  }, [props]);

  useEffect(() => {
    if(props && props.tabnameNew == "identification") {
      if(myProfile && myProfile._id) {
        if(isEmpty(myProfile.email) === false && isEmpty(myProfile.email) === false) {
          if(myProfile && myProfile.kycMode && myProfile.kycMode != KycMode) {
            setKycMode(myProfile.kycMode);
          } 
        }
        setkycUserType(myProfile.country == "IND" ? myProfile.country : "International");
      }
    }
  }, [myProfile]);

  return (
    <div>
      <div className="container-fluid" >
        <div className="row">
          <div className="col-lg-12">
            <h3 className="head-profile mb-4">Personal Verification</h3>
          </div>
          <div className="col-lg-8 mb-3">

            <div className="d-flex flex-row align-items-center personal-verification-section-1 mt-3 bg-card">
              <div className="">
                <span className="personal-verification-text-1 d-block">
                  KYC Status
                </span>
              </div>
              <div className="ms-auto">
                <span className="personal-verification-icon-1 fc-g">
                  {myProfile && <span className="d-block" style={{fontSize: "18px"}}><KycStatusComp
                    status={myProfile.kycstatus}
                  /></span>}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container-fluid">
        <nav className="personal-verify">
          {kycUserType != ""?
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {kycUserType === "IND" ? <button
              className={"nav-link "+(KycMode === "Online" ? " active" : "")}
              type="button"
              onClick={() => { setKycMode("Online"); setClickAccCol({no:true}); changeKycMode("Online"); }}
            >
              Online
            </button>:""}
            <button
              className={"nav-link "+(KycMode === "Offline" ? " active" : "")}
              type="button"
              onClick={() => { setKycMode("Offline"); setClickAccCol({no:true}); changeKycMode("Offline");}}
            >
              Offline
            </button>
          </div>:""}
        </nav>
      </div>

      {KYCSteps && kycUserType != "" ?
      <>
      {/* Online */}
      {KycMode === "Online" &&
      <section className="py-5">
        <div className="container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                {/* <h5>KYC verification</h5> */}
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nihil obcaecati impedit quis similique tempore harum voluptas, quae temporibus necessitatibus.</p> */}
              </div>
            </div>
            <div className="col-lg-12 ">
              {/* <h6 className="mt-3">level 1</h6> */}
              {myProfile && myProfile.kycOnline &&
              <div className="accordion accordion-flush shadow-lg" id="accordionFlushExample">

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingTwo">
                    <div className="accordion-button bg-transparent" >
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div>
                              <p>Pan verification</p>
                              {
                              myProfile.kycOnline.pan.status === myProfile.kycOffline.pan.status
                              ||
                              myProfile.kycOnline.pan.status < myProfile.kycOffline.pan.status
                              ?
                              <p> 
                                <KycStatusComp
                                  status= {myProfile.kycOnline.pan.status}
                                />
                              </p>
                              :
                              <p>Offline - 
                                <KycStatusComp
                                  status= {myProfile.kycOffline.pan.status}
                                />
                              </p>}
                              {
                              (
                                (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                                &&
                                (
                                  myProfile.kycStatusDetail.pan.status === 2 || myProfile.kycStatusDetail.pan.status === 3
                                )
                              ) ?
                                myProfile.kycOnline.pan.reject_reason?<p><small className="text-danger">Reason : </small>{myProfile.kycOnline.pan.reject_reason}</p>:""
                              :
                                ""
                              }
                            </div>
                            {
                            (
                              (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                              &&
                              (
                                myProfile.kycStatusDetail.pan.status === 2 || myProfile.kycStatusDetail.pan.status === 3
                              )
                            ) ?
                            <>
                            <div className="my-auto">
                              <button
                                type="button"
                                className={"nav-link nav-register-button "+(clickAccCol && clickAccCol.collapseOnPV ? "opacity1" : "")}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOnPV"
                                aria-expanded="false"
                                disabled={clickAccCol && clickAccCol.collapseOnPV ? true : false}
                                onClick={() => { setClickAccCol({collapseOnPV:true})}}
                                aria-controls="flush-collapseOnPV"
                              >Verify</button>
                            </div>
                            </>
                            :""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </h2>
                  <div id="flush-collapseOnPV" className="accordion-collapse collapse" aria-labelledby="flush-headingOnPV" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      {(
                        (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                        &&
                        (
                          myProfile.kycStatusDetail.pan.status === 2 || myProfile.kycStatusDetail.pan.status === 3
                        )
                      ) ?
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="pan-input-text f-14" fullWidth
                                label={"Enter pan number"}
                                name="pan_number"
                                value={onlineKYCPan.pan_number}
                                autoComplete="off"
                                onChange={onlineKYCPan_handleChange}
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-6 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => onlineKYCPanSubmit("submit")} disabled={isLoading}>{isLoading?"Loading...":"Submit"}</button>
                            </div>
                          </div>
                        </div>
                      </form>:""}
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingOne">
                    <div className="accordion-button bg-transparent">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div>
                              <p>Aadhaar verification</p>
                              {
                              myProfile.kycOnline.aadhaar.status === myProfile.kycOffline.aadhaar.status
                              ||
                              myProfile.kycOnline.aadhaar.status < myProfile.kycOffline.aadhaar.status
                              ?
                              <p> 
                                <KycStatusComp
                                  status= {myProfile.kycOnline.aadhaar.status}
                                />
                              </p>
                              :
                              <p>Offline - 
                                <KycStatusComp
                                  status= {myProfile.kycOffline.aadhaar.status}
                                />
                              </p>}
                              {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && myProfile.kycStatusDetail.pan.status === 1 && (myProfile.kycStatusDetail.aadhaar.status === 2 || myProfile.kycStatusDetail.aadhaar.status === 3)) ?
                                myProfile.kycOnline.aadhaar.reject_reason ?<p><small className="text-danger">Reason : </small>{myProfile.kycOnline.aadhaar.reject_reason}</p>:""
                              :""}
                            </div>
                            {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && myProfile.kycStatusDetail.pan.status === 1 && (myProfile.kycStatusDetail.aadhaar.status === 2 || myProfile.kycStatusDetail.aadhaar.status === 3)) ?
                            <div className="my-auto">
                              <button
                                type="button"
                                className={"nav-link nav-register-button "+(clickAccCol && clickAccCol.collapseOnAV ? "opacity1" : "")}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOnAV"
                                aria-expanded="false"
                                disabled={clickAccCol && clickAccCol.collapseOnAV ? true : false}
                                onClick={() => { setClickAccCol({collapseOnAV:true})}}
                                aria-controls="flush-collapseOnAV"
                              >Verify</button>
                            </div>:""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </h2>
                  <div id="flush-collapseOnAV" className="accordion-collapse collapse" aria-labelledby="flush-headingOnAV" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && myProfile.kycStatusDetail.pan.status == 1 && (myProfile.kycStatusDetail.aadhaar.status === 2 || myProfile.kycStatusDetail.aadhaar.status === 3)) ?
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            {onlineKYCAadhaar.step == "getNumber" &&
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="color-white f-14" fullWidth
                                label={"Enter aadhaar number"}
                                name="aadhaar_number"
                                value={onlineKYCAadhaar.aadhaar_number}
                                autoComplete="off"
                                onChange={onlineKYCAadhaar_handleChange}
                              />
                            </div>}
                            {onlineKYCAadhaar.step == "generateOtp" &&
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="color-white f-14" fullWidth
                                label={"OTP"}
                                name="otp"
                                value={onlineKYCAadhaar.otp}
                                autoComplete="off"
                                onChange={onlineKYCAadhaar_handleChange}
                              />
                            </div>}
                          </div>
                          <div className='row'>
                            {onlineKYCAadhaar.step == "generateOtp" &&
                            <div className='col-lg-2 col-12 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => onlineKYCAadhaarSubmit("cancel")}>Cancel</button>
                            </div>}
                            <div className='col-lg-10 col-12 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => onlineKYCAadhaarSubmit("submit")} disabled={isLoading}>{isLoading?"Loading...":"Submit"}</button>
                            </div>
                          </div>
                        </div>
                      </form>:""
                      }
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingThree">
                    <div className="accordion-button bg-transparent">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div>
                              <p>Selfie verification</p>
                              {(myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && 
                                <p className="notes-image-size text-success">{`(Size < 500 KB) "Selfie image should match with Aadhar....!"`} </p>
                              }
                              {
                              myProfile.kycOnline.selfie.status === myProfile.kycOffline.selfie.status
                              ||
                              myProfile.kycOnline.selfie.status < myProfile.kycOffline.selfie.status
                              ?
                              <p> 
                                <KycStatusComp
                                  status= {myProfile.kycOnline.selfie.status}
                                />
                              </p>
                              :
                              <p>Offline - 
                                <KycStatusComp
                                  status= {myProfile.kycOffline.selfie.status}
                                />
                              </p>}
                              {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycStatusDetail.pan.status == 1 && myProfile.kycStatusDetail.aadhaar.status === 1) && (myProfile.kycStatusDetail.selfie.status === 2 || myProfile.kycStatusDetail.selfie.status === 3)) ?
                                myProfile.kycOnline.selfie.reject_reason ?<p><small className="text-danger">Reason : </small>{myProfile.kycOnline.selfie.reject_reason}</p>:""
                                :""}
                            </div>
                            <div className="my-auto">
                              {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycStatusDetail.pan.status == 1 && myProfile.kycStatusDetail.aadhaar.status === 1) && (myProfile.kycStatusDetail.selfie.status === 2 || myProfile.kycStatusDetail.selfie.status === 3)) ?
                              <button
                                type="button"
                                className={"nav-link nav-register-button "+(clickAccCol.collapseOnSV ? "opacity1" : "")}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOnSV"
                                aria-expanded="false"
                                disabled={clickAccCol.collapseOnSV ? true : false}
                                onClick={() => { setClickAccCol({collapseOnSV:true})}}
                                aria-controls="flush-collapseOnSV"
                              >Verify</button>:""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </h2>
                  <div id="flush-collapseOnSV" className="accordion-collapse collapse" aria-labelledby="flush-headingOnSV" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                    {
                    (
                      (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                      &&
                      (myProfile.kycStatusDetail.pan.status == 1 && myProfile.kycStatusDetail.aadhaar.status === 1)
                      &&
                      (myProfile.kycStatusDetail.selfie.status === 2 || myProfile.kycStatusDetail.selfie.status === 3)
                    ) &&
                      <form>
                        <div className="col-12">
                          <div className='row '>
                            <div className='col-lg-6 my-2'>
                              <FileUploader className="ui-fs"
                                multiple={true}
                                handleChange={(e) => handleChangesOnlineSelfie(e, "selfie")}
                                name={"selfie"}
                                types={fileTypes}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              {kycDocsOnlineSelfie ? <>
                                <img src={kycDocsOnlineSelfie} alt="kycImg" className="imagee cusImagee"/>
                              </>:
                              myProfile.kycOnline.selfie.status != 0 && myProfile.kycOnline.selfie.image && 
                              <>
                                <img src={myProfile.kycOnline.selfie.image} alt="kycImg" className="imagee cusImagee"/> 
                              </>}
                            </div>
                          </div>
                          <div className='row'>
                            {onlineKYCSelfieUpl ?
                            <div className='col-lg-10 col-12 my-2'>
                              <button
                                type='button'
                                disabled={(kycDocsOnlineSelfie && !isLoading) ? false : true}
                                className="nav-link nav-register-button"
                                onClick={() => onlineKYCSelfieSubmit("selfieSubmit")}>{isLoading?"Loading...":"Verification Submit To Admin"}</button>
                            </div>:
                            <div className='col-lg-2 col-12 my-2'>
                              <button
                                type='button'
                                disabled={(kycDocsOnlineSelfie && !isLoading) ? false : true}
                                className="nav-link nav-register-button"
                                onClick={() => onlineKYCSelfieSubmit("checkSelfieVerify")}>{isLoading?"Loading...":"Submit"}</button>
                            </div>}
                          </div>
                        </div>
                      </form>}
                    </div>
                  </div>
                </div>

              </div>}
              
              {/* <div className="card bg-transparent border-0">
              <div className="card-body bg-card rounded-1 mb-3">
              
              </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      }

      {/* Offline */}
      {KycMode === "Offline" &&
      <section className="py-5">
        <div className="container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                {/* <h5>KYC verification</h5> */}
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nihil obcaecati impedit quis similique tempore harum voluptas, quae temporibus necessitatibus.</p> */}
              </div>
            </div>
            <div className="col-lg-12 ">
              {myProfile && myProfile.kycOffline &&
              <div className="accordion accordion-flush shadow-lg" id="accordionFlushExampleOff">

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingTwo">
                    <div className="accordion-button bg-transparent">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div>
                              {/* <p>Pan verification</p> */}
                              <p>{KYCSteps.offline[kycUserType].step1.header}</p>
                              {
                              myProfile.kycOnline.pan.status === myProfile.kycOffline.pan.status
                              ||
                              myProfile.kycOnline.pan.status > myProfile.kycOffline.pan.status
                              ?
                              <p> 
                                <KycStatusComp
                                  status= {myProfile.kycOffline.pan.status}
                                />
                              </p>
                              :
                              <p>Online - 
                                <KycStatusComp
                                  status= {myProfile.kycOnline.pan.status}
                                />
                              </p>}
                              {
                              (
                                (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                                &&
                                (
                                  myProfile.kycStatusDetail.pan.status === 2 || myProfile.kycStatusDetail.pan.status === 3
                                )
                              ) ?
                                myProfile.kycOffline.pan.reject_reason ?<p><small className="text-danger">Reason : </small>{myProfile.kycOffline.pan.reject_reason}</p>:""
                              :""}
                            </div>
                            {
                            (
                              (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                              &&
                              (
                                myProfile.kycStatusDetail.pan.status === 2 || myProfile.kycStatusDetail.pan.status === 3
                              )
                            ) ?
                            <div className="my-auto">
                              <button
                                type="button"
                                className={"nav-link nav-register-button "+(clickAccCol && clickAccCol.collapseOfPV ? "opacity1" : "")}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOfPV"
                                aria-expanded="false"
                                disabled={clickAccCol && clickAccCol.collapseOfPV ? true : false}
                                onClick={() => { setClickAccCol({collapseOfPV:true})}}
                                aria-controls="flush-collapseOfPV"
                              >Verify</button>
                            </div>:""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </h2>
                  <div id="flush-collapseOfPV" className="accordion-collapse collapse" aria-labelledby="flush-headingOfPV" data-bs-parent="#accordionFlushExampleOff">
                    <div className="accordion-body">
                      {(
                        (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                        &&
                        (
                          myProfile.kycStatusDetail.pan.status === 2 || myProfile.kycStatusDetail.pan.status === 3
                        )
                      ) &&
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            <div className='col-lg-6  my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="pan-input-text f-14" fullWidth
                                label={KYCSteps.offline[kycUserType].step1.field1.label}
                                name="pan_number"
                                value={offlineKYCPan.pan_number}
                                autoComplete="off"
                                onChange={offlineKYCPan_handleChange}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="pan-input-text f-14" fullWidth
                                label={KYCSteps.offline[kycUserType].step1.field2.label}
                                name="pan_name"
                                value={offlineKYCPan.pan_name}
                                autoComplete="off"
                                onChange={offlineKYCPan_handleChange}
                              />
                            </div>
                            <div className='col-lg-6  my-2'>
                              <FileUploader className="ui-fs"
                                multiple={true}
                                handleChange={(e) => handleChangesOffline(e, "pan")}
                                name={"pan"}
                                types={fileTypes}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              {kycDocsOfflinePan ? <>
                                <img src={kycDocsOfflinePan} alt="kycImg" className="imagee cusImagee"/>
                              </>:
                              ""}
                              {/* <div>
                                <div className="show-image">
                                  <img src="http://i.imgur.com/egeVq.png" />
                                  <input className="the-buttons btn btn-danger" type="button" value=" Click " />
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-6 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => offlineKYCPanSubmit("submit")} disabled={isLoading}>{isLoading?"Loading...":"Submit"}</button>
                            </div>
                          </div>
                        </div>
                      </form>}
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingOne">
                    <div className="accordion-button bg-transparent">
                      <div className="card w-100 bg-transparent border-0">
                        {/* rounded-1 my-3 */}
                        <div className="card-body mb-3">
                          <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div>
                              <p>{KYCSteps.offline[kycUserType].step2.header}</p>
                              {
                              myProfile.kycOnline.aadhaar.status === myProfile.kycOffline.aadhaar.status
                              ||
                              myProfile.kycOnline.aadhaar.status > myProfile.kycOffline.aadhaar.status
                              ?
                              <p> 
                                <KycStatusComp
                                  status= {myProfile.kycOffline.aadhaar.status}
                                />
                              </p>
                              :
                              <p>Online - 
                                <KycStatusComp
                                  status= {myProfile.kycOnline.aadhaar.status}
                                />
                              </p>}
                              {
                              (
                                (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                                &&
                                myProfile.kycStatusDetail.pan.status === 1 &&
                                (myProfile.kycStatusDetail.aadhaar.status === 2 || myProfile.kycStatusDetail.aadhaar.status === 3)
                              ) ?
                                myProfile.kycOffline.aadhaar.reject_reason ?<p><small className="text-danger">Reason : </small>{myProfile.kycOffline.aadhaar.reject_reason}</p>:""
                              :""}
                            </div>
                            {
                            (
                              (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                              &&
                              myProfile.kycStatusDetail.pan.status === 1 &&
                              (myProfile.kycStatusDetail.aadhaar.status === 2 || myProfile.kycStatusDetail.aadhaar.status === 3)
                            ) ?
                            <div className="my-auto">
                              <button
                                type="button"
                                className={"nav-link nav-register-button "+(clickAccCol.collapseOfAV ? "opacity1" : "")}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOfAV"
                                aria-expanded="false"
                                disabled={clickAccCol.collapseOfAV ? true : false}
                                onClick={() => { setClickAccCol({collapseOfAV:true})}}
                                aria-controls="flush-collapseOfAV"
                              >Verify</button>
                            </div>:""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </h2>
                  <div id="flush-collapseOfAV" className="accordion-collapse collapse" aria-labelledby="flush-headingOfAV" data-bs-parent="#accordionFlushExampleOff">
                    <div className="accordion-body">
                      {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && myProfile.kycStatusDetail.pan.status == 1 && (myProfile.kycStatusDetail.aadhaar.status === 2 || myProfile.kycStatusDetail.aadhaar.status === 3)) ?
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            {offlineKYCAadhaar.step == "getNumber" &&
                            <>
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="color-white f-14" fullWidth
                                label={KYCSteps.offline[kycUserType].step2.field1.label}
                                name="aadhaar_number"
                                value={offlineKYCAadhaar.aadhaar_number}
                                autoComplete="off"
                                onChange={offlineKYCAadhaar_handleChange}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="color-white f-14" fullWidth
                                label={KYCSteps.offline[kycUserType].step2.field2.label}
                                name="aadhaar_name"
                                value={offlineKYCAadhaar.aadhaar_name}
                                autoComplete="off"
                                onChange={offlineKYCAadhaar_handleChange}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="color-white f-14" fullWidth
                                label={KYCSteps.offline[kycUserType].step2.field3.label}
                                name="aadhaar_address"
                                value={offlineKYCAadhaar.aadhaar_address}
                                autoComplete="off"
                                onChange={offlineKYCAadhaar_handleChange}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              <TextField
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                className="color-white f-14" fullWidth
                                label={KYCSteps.offline[kycUserType].step2.field4.label}
                                name="aadhaar_pincode"
                                value={offlineKYCAadhaar.aadhaar_pincode}
                                autoComplete="off"
                                onChange={offlineKYCAadhaar_handleChange}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              <label>{KYCSteps.offline[kycUserType].step2.field5.label}</label>
                              <FileUploader className="ui-fs"
                                multiple={true}
                                handleChange={(e) => handleChangesOffline(e, "aadhaar")}
                                name={"aadhaar"}
                                types={fileTypes}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              {kycDocsOfflineAadhaar ? <>
                                <img src={kycDocsOfflineAadhaar} alt="kycImg" className="imagee cusImagee"/>
                              </>:
                              <></>}
                            </div>
                            <div className='col-lg-6 my-2'>
                              <label>{KYCSteps.offline[kycUserType].step2.field6.label}</label>
                              <FileUploader className="ui-fs"
                                multiple={true}
                                handleChange={(e) => handleChangesOffline(e, "aadhaarBack")}
                                name={"aadhaarBack"}
                                types={fileTypes}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              {kycDocsOfflineAadhaarBack ? <>
                                <img src={kycDocsOfflineAadhaarBack} alt="kycImg" className="imagee cusImagee"/>
                              </>:
                              <></>}
                            </div>
                            </>
                            }
                          </div>
                          <div className='row'>
                            <div className='col-lg-6 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => offlineKYCAadhaarSubmit("submit")} disabled={isLoading}>{isLoading?"Loading...":"Submit"}</button>
                            </div>
                          </div>
                        </div>
                      </form>:""
                      }
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingThree">
                    <div className="accordion-button bg-transparent">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div>
                              <p>{KYCSteps.offline[kycUserType].step3.header}</p>
                              {(myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && 
                                <p className="notes-image-size text-success">{`(Size <= 500 KB) "Selfie image should match with Aadhar....!"`} </p>
                              }
                              {
                              myProfile.kycOnline.selfie.status === myProfile.kycOffline.selfie.status
                              ||
                              myProfile.kycOnline.selfie.status > myProfile.kycOffline.selfie.status
                              ?
                              <p> 
                                <KycStatusComp
                                  status= {myProfile.kycOffline.selfie.status}
                                />
                              </p>
                              :
                              <p>Online - 
                                <KycStatusComp
                                  status= {myProfile.kycOnline.selfie.status}
                                />
                              </p>}
                              {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycStatusDetail.pan.status == 1 && myProfile.kycStatusDetail.aadhaar.status === 1) && (myProfile.kycStatusDetail.selfie.status === 2 || myProfile.kycStatusDetail.selfie.status === 3)) ?
                                myProfile.kycOffline.selfie.reject_reason ?<p><small className="text-danger">Reason : </small>{myProfile.kycOffline.selfie.reject_reason}</p>:""
                              :""}
                            </div>
                            {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycStatusDetail.pan.status == 1 && myProfile.kycStatusDetail.aadhaar.status === 1) && (myProfile.kycStatusDetail.selfie.status === 2 || myProfile.kycStatusDetail.selfie.status === 3)) ?
                            <div className="my-auto">
                              <button
                                type="button"
                                className={"nav-link nav-register-button "+(clickAccCol.collapseOfSV ? "opacity1" : "")}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOfSV"
                                aria-expanded="false"
                                disabled={clickAccCol.collapseOfSV ? true : false}
                                onClick={() => { setClickAccCol({collapseOfSV:true})}}
                                aria-controls="flush-collapseOfSV"
                              >Verify</button>
                            </div>:""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </h2>
                  <div id="flush-collapseOfSV" className="accordion-collapse collapse" aria-labelledby="flush-headingOfSV" data-bs-parent="#accordionFlushExampleOff">
                    <div className="accordion-body">
                    {
                    (
                      (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                      &&
                      (myProfile.kycStatusDetail.pan.status == 1 && myProfile.kycStatusDetail.aadhaar.status === 1)
                      &&
                      (myProfile.kycStatusDetail.selfie.status === 2 || myProfile.kycStatusDetail.selfie.status === 3)
                    ) &&
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            <div className='col-lg-6 my-2'>
                              <FileUploader className="ui-fs"
                                multiple={true}
                                handleChange={(e) => handleChangesOffline(e, "selfie")}
                                name={"selfie"}
                                types={fileTypes}
                              />
                            </div>
                            <div className='col-lg-6 my-2'>
                              {kycDocsOnlineSelfie ? <>
                                <img src={kycDocsOnlineSelfie} alt="kycImg" className="imagee"/>
                              </>:
                              myProfile.kycOnline.selfie.status != 0 && myProfile.kycOnline.selfie.image && 
                              <>
                                <img src={myProfile.kycOnline.selfie.image} alt="kycImg" className="imagee"/>
                              </>}
                              {kycDocsOfflineSelfie ? <>
                                <img src={kycDocsOfflineSelfie} alt="kycImg" className="imagee cusImagee"/>
                              </>:
                              <></>}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-6 my-2'>
                              <button
                                type='button'
                                disabled={(kycDocsOfflineSelfie && !isLoading) ? false : true}
                                className="nav-link nav-register-button"
                                onClick={() => offlineKYCSelfieSubmit("submit")}>{isLoading?"Loading...":"Submit"}</button>
                            </div>
                          </div>
                        </div>
                      </form>}
                    </div>
                  </div>
                </div>

              </div>}
            </div>
          </div>
        </div>
      </section>
      }
      </>:""}
    </div>
  );
}
