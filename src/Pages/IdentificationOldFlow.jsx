import React, { useState, useEffect } from "react";
import { BiIdCard } from "react-icons/bi";
import { BsInfoCircle, BsFillTrashFill } from "react-icons/bs";
import { useFileUpload } from "use-file-upload";
import { TbUpload } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import Aadhaarfront from "../assets/images/verification/aadhaarfront.png";
import Aadhaarback from "../assets/images/verification/aadhaarback.png";
import Pan from "../assets/images/verification/pan.png";
import Selfie from "../assets/images/verification/selfie.png";
import loaderImage3 from "..//assets/images/loadingGif.gif";

import { FileUploader } from "react-drag-drop-files";

import KycStatusComp from "./separate/kycStatusComp";

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

const validationSchema_offlineKYC = yup.object({
  firstname: yup
    .string('Please enter your first name')
    .required('First name field is required'),
  lastname: yup
    .string('Please enter your last name')
    .required('Last name field is required'),
  aadhaar_number: yup
    .string('Please enter your aadhaar number')
    .required('Aadhaar number field is required'),
  pan_number: yup
    .string('Please enter your pan number')
    .required('Pan number field is required'),
  address: yup
    .string('Please enter your address')
    .required('Address field is required'),
});


export default function IdentificationOldFlow() {
  const navigate = useNavigate();

  const defaultaadhaarfront = Aadhaarfront;
  const defaultaadhaarback = Aadhaarback;
  const defaultpanfront = Pan;
  const defaultselfie = Selfie;

  const [aadhaarfront, selectaadhaarfront] = useFileUpload();
  const [aadhaarback, selectaadhaarback] = useFileUpload();
  const [panfront, selectpanfront] = useFileUpload();
  const [selfie, selectselfie] = useFileUpload();

  const { siteSettings, myProfile, setUserProfile } = useContextData();

  const [onlineKYCAadhaar, setonlineKYCAadhaar] = useState({
    aadhaar_number: "",
    otp: "",
    step: "getNumber"
  });
  const [onlineKYCPan, setonlineKYCPan] = useState({
    pan_number: "",
    step: "getNumber"
  });
  const [isLoading, setisLoading] = useState(false);
  const [isLoading_sec, setisLoading_sec] = useState(false);

  const [offlineKyc, setofflineKyc] = useState(false);

  // const [pan_number, setpan_number] = useState("");
  
  const [modePassportVerification, setmodePassportVerification] = useState("offline");
  const [placeHoldenForKYCInput, setplaceHoldenForKYCInput] = useState("Pan Number");
  
  const [filesOnlineSelfie, setfilesOnlineSelfie] = useState({});
  const [kycDocsOnlineSelfie, setkycDocsOnlineSelfie] = useState("");
  
  const [files1, setfiles1] = useState({});
  const [kycDocs0, setkycDocs0] = useState("");
  const [kycDocs1, setkycDocs1] = useState("");
  const [kycDocs2, setkycDocs2] = useState("");
  const [kycDocs3, setkycDocs3] = useState("");
  
  const [kycDocs, setkycDocs] = useState([{
      name: 'Aadhaar or Passport',
      type: '(Front)',
      value: defaultaadhaarfront,
    },
    {
      name: 'Aadhaar or Passport',
      type: '(Back)',
      value: defaultaadhaarback,
    },
    {
      name: 'Selfie',
      type: '(By holding aadhaar or Passport)',
      value: defaultselfie,
    },
    {
      name: 'Pan or Identity Card',
      type: '(Front)',
      value: defaultpanfront,
    }
  ]);

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setpan_number(value)
  // };

  const removeKYC = (inc = "", name= "") => {
    if(name) {
      if(inc == 0) {
        setkycDocs0("");
      }
      else if(inc == 1) {
        setkycDocs1("");
      }
      else if(inc == 2) {
        setkycDocs2("");
      }
      else if(inc == 3) {
        setkycDocs3("");
      }

      let files1Copy = Object.assign(files1, {});
      delete files1Copy[name];
      setfiles1(files1Copy);
    }
  }

  function handleChangesOnlineSelfie(event, name) {
    const file = event[0];
    if (file) {
      let files1_copy = Object.assign({}, files1);
      files1_copy[name] = file;
      setfilesOnlineSelfie(files1_copy)

      var reader = new FileReader();
      reader.onload = function (e) {
        setkycDocsOnlineSelfie(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  function handleChanges(event, name, inc) {
    const file = event[0];
    if (file) {
      if (inc >= 0) {
        let files1_copy = Object.assign({}, files1);
        files1_copy[name] = file;
        setfiles1(files1_copy)
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        if (inc >= 0) {
          if(inc == 0) {
            setkycDocs0(e.target.result);
          }
          else if(inc == 1) {
            setkycDocs1(e.target.result);
          }
          else if(inc == 2) {
            setkycDocs2(e.target.result);
          }
          else if(inc == 3) {
            setkycDocs3(e.target.result);
          }
        }
      }
      reader.readAsDataURL(file);
    }
  }

  async function kycSubmit(values = {}) {
    const type = 'error';
    let formData = new FormData();
    let sizeFile = 0;
    for (var key in files1) {
      let fileToUpload = files1[key];
      let fileName = key;
      let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
      formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
      sizeFile++;
    }
    setisLoading(true);
    const kycLength = typeof myProfile?.kyc == 'object' ? Object.keys(myProfile?.kyc).length : 0;
    const offilineForm = values;

    if ((kycLength == 0 && sizeFile == 4) || (kycLength > 0 && (sizeFile > 0 || myProfile?.pan_number != offilineForm.pan_number))) {
      const params = {
        url: `${Config.V1_API_URL}admin/fileUpload?sizeFile=${sizeFile}&&type=${'kyc&&pan_number='+offilineForm.pan_number+'&&aadhaar_number='+offilineForm.aadhaar_number+'&&firstname='+offilineForm.firstname+'&&lastname='+offilineForm.lastname+'&&address='+offilineForm.address}`,
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const response = await makeRequest(params);
      if (response.status) {
        const type = 'success';
        setUserProfile();
        toast({ type, message: response.message });
        setisLoading(false);
        // navigate("/my/dashboard");
      } else {
        const type = 'error';
        setisLoading(false);
        toast({ type, message: response.message });
      }
    } else {
      toast({ type, message: "Please select all required document to submit KYC" });
      setisLoading(false);
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
    else {
      let onlineKYCAadhaarCopy = Object.assign({}, onlineKYCAadhaar);
      onlineKYCAadhaarCopy["step"] = "getNumber";
      setonlineKYCAadhaar(onlineKYCAadhaarCopy);
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

  const onlineKYCSelfieSubmit = async(type = "submit") => {
    if (kycDocsOnlineSelfie) {
      let formData = new FormData();
      for (var key in filesOnlineSelfie) {
        let fileToUpload = filesOnlineSelfie[key];
        let fileName = key;
        let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
        formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
      }
      const params = {
        url: `${Config.V2_API_URL}kyc/online/verify/selfie`,
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
    else {
      toast({ type, message: "Please choose your selfie image to submit for selfie verification" });
      setisLoading(false);
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
          console.log({response});
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

  function onlineKYCAadhaar_handleChange(event) {
    const {
      name = "",
      value = ""
    } = event.target;

    if(name == 'aadhaar_number' || name == 'otp') {
      let onlineKYCAadhaarCopy = Object.assign({}, onlineKYCAadhaar);
      onlineKYCAadhaarCopy[name] = value;
      setonlineKYCAadhaar(onlineKYCAadhaarCopy);
    }
  }

  function onlineKYCPan_handleChange(event) {
    const {
      name = "",
      value = ""
    } = event.target;

    if(name == 'pan_number') {
      let onlineKYCPanCopy = Object.assign({}, onlineKYCPan);
      onlineKYCPanCopy[name] = value;
      setonlineKYCPan(onlineKYCPanCopy);
    }
  }

  useEffect(() => {
    if(myProfile && myProfile._id) {
      if(!myProfile.phoneno || myProfile.phoneno == "") {
        toast({ type: "error", message: "Please update your phone number" });
        navigate("/my/profile");
      }
      else {
        if(myProfile && myProfile.kycMode && myProfile.kycMode == "Online" && offlineKyc === true) {
          setofflineKyc(false);
        }
        else {
          setofflineKyc(true);
        }
      }
    }
  }, [myProfile]);

  const initialValues = () => {
    if(myProfile.kycOffline && myProfile.kycOffline.firstname) {
      return {
        firstname: myProfile.kycOffline.firstname,
        lastname: myProfile.kycOffline.lastname,
        aadhaar_number: myProfile.kycOffline.aadhaar_number,
        pan_number: myProfile.kycOffline.pan_number,
        address: myProfile.kycOffline.address,
      }
    }
    else {
      return {
        firstname: "",
        lastname: "",
        aadhaar_number: "",
        pan_number: "",
        address: "",
      }
    }
  }

  return (
    <div>
      <div className="container-fluid" >
        <div className="row">
          <div className="col-lg-12">
            <h3 className="head-profile mb-4">Personal Verification</h3>
          </div>
          <div className="col-lg-8 mb-3">

            {/* {myProfile && myProfile.kycMode && <div className="d-flex flex-row align-items-center personal-verification-section-1 bg-card">
              <div className="">
                <p className="mb-0">
                  <span className="personal-verification-text-1">
                    KYC Mode
                  </span>
                </p>
              </div>
              <div className="ms-auto">
                <span className="personal-verification-icon-1 fc-g" style={{fontSize: "18px"}}>
                  {myProfile.kycMode}
                </span>
              </div>
            </div>} */}

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

            {myProfile && myProfile.kycstatus == 2 && <div className="d-flex flex-row align-items-center personal-verification-section-1">
              <div className="">
                <p className="mb-0">
                  {/* <span className="icon-mob ">
                    <BsInfoCircle />
                  </span>{" "} */}
                  <span className="personal-verification-text-1">
                    Reject Reason
                  </span>
                </p>
              </div>
              <div className="ms-auto">
                <span className="personal-verification-icon-1 fc-g">
                  {/* {JSON.stringify(myProfile.kyc)} */}
                  <span style={{fontSize: "18px", color: "red"}}>
                    {
                    myProfile.kycMode == "Offline"
                    ?
                      myProfile.kyc && myProfile?.kyc['Reject Reason'].value
                    :
                      myProfile.kycOnline && myProfile?.kycOnline['reject_reason']
                    }
                  </span>
                </span>
              </div>
            </div>}

          </div>
        </div>
      </div>

      <div className="container-fluid">
        <nav className="personal-verify">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className={"nav-link "+(offlineKyc === false ? " active" : "")}
              type="button"
              onClick={() => setofflineKyc(false)}
            >
              Online
            </button>
            <button
              className={"nav-link "+(offlineKyc === true ? " active" : "")}
              type="button"
              onClick={() => setofflineKyc(true)}
            >
              Offline
            </button>
          </div>
        </nav>
      </div>

      {offlineKyc === false &&
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
                
                {/* myProfile.kycOnline : {JSON.stringify(myProfile.kycOnline)} */}

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingTwo">
                    {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycOnline.pan_status === 2 || myProfile.kycOnline.pan_status === 3)) ?
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <p>Pan verification</p>
                          <KycStatusComp
                            status= {myProfile.kycOnline.pan_status}
                          />
                        </div>
                      </div>
                    </button>
                    :
                    <button className="accordion-button collapsed bg-transparent" type="button" >
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <p>Pan verification</p>
                          <KycStatusComp
                            status= {myProfile.kycOnline.pan_status}
                          />
                        </div>
                      </div>
                    </button>
                    }
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycOnline.pan_status === 2 || myProfile.kycOnline.pan_status === 3)) &&
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            <div className='col-6 my-2'>
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
                            <div className='col-6 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => onlineKYCPanSubmit("submit")}>Submit</button>
                            </div>
                          </div>
                        </div>
                      </form>}
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingOne">
                    {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && myProfile.kycOnline.pan_status === 1 && (myProfile.kycOnline.aadhaar_status === 2 || myProfile.kycOnline.aadhaar_status === 3)) ?
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body  rounded-1 my-3">
                          <p>Aadhaar verification</p>
                          <KycStatusComp
                            status= {myProfile.kycOnline.aadhaar_status}
                          />
                        </div>
                      </div>
                    </button>
                    :
                    <button className="accordion-button collapsed bg-transparent" type="button">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body  rounded-1 my-3">
                          <p>Aadhaar verification</p>
                          <KycStatusComp
                            status= {myProfile.kycOnline.aadhaar_status}
                          />
                        </div>
                      </div>
                    </button>
                    }
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && myProfile.kycOnline.pan_status == 1 && (myProfile.kycOnline.aadhaar_status === 2 || myProfile.kycOnline.aadhaar_status === 3)) &&
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            {onlineKYCAadhaar.step == "getNumber" &&
                            <div className='col-6 my-2'>
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
                            <div className='col-6 my-2'>
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
                            <div className='col-6 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => onlineKYCAadhaarSubmit("cancel")}>Cancel</button>
                            </div>}
                            <div className='col-6 my-2'>
                              <button className="nav-link nav-register-button" type='button' onClick={() => onlineKYCAadhaarSubmit("submit")}>Submit</button>
                            </div>
                          </div>
                        </div>
                      </form>
                      }
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent">
                  <h2 className="accordion-header accordion-re-design" id="flush-headingThree">
                    {((myProfile.kycstatus === 2 || myProfile.kycstatus === 3) && (myProfile.kycOnline.pan_status == 1 && myProfile.kycOnline.aadhaar_status === 1) && (myProfile.kycOnline.selfie_status === 2 || myProfile.kycOnline.selfie_status === 3)) ?
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <p>Selfie verification</p>
                          <KycStatusComp
                            status= {myProfile.kycOnline.selfie_status}
                          />
                        </div>
                      </div>
                    </button>
                    :
                    <button className="accordion-button collapsed bg-transparent" type="button" >
                      <div className="card w-100 bg-transparent border-0">
                        <div className="card-body mb-3">
                          <p>Selfie verification</p>
                          <KycStatusComp
                            status= {myProfile.kycOnline.selfie_status}
                          />
                        </div>
                      </div>
                    </button>
                    }
                  </h2>
                  <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                    {
                    (
                      (myProfile.kycstatus === 2 || myProfile.kycstatus === 3)
                      &&
                      (myProfile.kycOnline.pan_status == 1 && myProfile.kycOnline.aadhaar_status === 1)
                      &&
                      (myProfile.kycOnline.selfie_status === 2 || myProfile.kycOnline.selfie_status === 3)
                    ) &&
                      <form>
                        <div className="col-12">
                          <div className='row'>
                            <div className='col-6 my-2'>
                              {kycDocsOnlineSelfie ? <>
                                <img src={kycDocsOnlineSelfie} alt="kycImg" className="imagee"/>
                              </>:
                              myProfile.kycOnline.selfie_status != 0 && myProfile.kycOnline.selfie_image && 
                              <>
                                <img src={myProfile.kycOnline.selfie_image} alt="kycImg" className="imagee"/>
                              </>}
                              <FileUploader className="ui-fs"
                                multiple={true}
                                handleChange={(e) => handleChangesOnlineSelfie(e, "selfie")}
                                name={"selfie"}
                                types={fileTypes}
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-6 my-2'>
                              <button
                                type='button'
                                disabled={(kycDocsOnlineSelfie && !isLoading) ? false : true}
                                className="nav-link nav-register-button"
                                onClick={() => onlineKYCSelfieSubmit("submit")}>{isLoading?"Loading...":"Submit"}</button>
                            </div>
                            {myProfile.kycOnline.selfie_status != 0 && myProfile.kycOnline.selfie_details && myProfile.kycOnline.selfie_details.confidence != undefined &&
                            <div className='col-6 my-2'>
                              <button
                                type='button'
                                disabled={((kycDocsOnlineSelfie || myProfile.kycOnline.selfie_image) && !isLoading_sec) ? false : true}
                                className="nav-link nav-register-button"
                                onClick={() => onlineKYCSelfieSubmitToAdmin()}>{isLoading_sec?"Loading...":"Verification submit to admin"}</button>
                            </div>}
                          </div>
                        </div>
                      </form>}
                    </div>
                  </div>
                </div>

              </div>}
              {/* 
              <div className="card bg-transparent border-0">
              <div className="card-body bg-card rounded-1 mb-3">
              <div className="d-flex justify-content-between">
              <div>
              <p>Mobile verification</p>
              <p><small className="text-success">Approved <MdDone /></small></p>
              </div>
              <div className="my-auto">
              <button type="button" className="btn btn-success">Success</button>
              </div>
              </div>
              </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      }

      {offlineKyc === true &&
      <section className="py-5">
        <div className="container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="row g-4">
                {kycDocs && kycDocs.map((kyc, i) => {
                  let kycImg = kycDocs[i].value;
                  const nameType = kyc.name + " - " + kyc.type;

                  let oldImgType = "";
                  let oldImgValue = "";

                  if(myProfile && myProfile.kyc && myProfile.kyc[nameType]?.type) {
                    oldImgType = myProfile?.kyc[nameType].type;
                    oldImgValue = myProfile?.kyc[nameType].value;
                  }

                  if(i === 0) {
                    if(kycDocs0) {
                      kycImg = kycDocs0;
                    }
                    else if(oldImgType == 'image' && oldImgValue) {
                      kycImg = oldImgValue
                    }
                  }

                  if(i === 1) {
                    if(kycDocs1) {
                      kycImg = kycDocs1;
                    }
                    else if(oldImgType == 'image' && oldImgValue) {
                      kycImg = oldImgValue
                    }
                  }

                  if(i === 2) {
                    if(kycDocs2) {
                      kycImg = kycDocs2;
                    }
                    else if(oldImgType == 'image' && oldImgValue) {
                      kycImg = oldImgValue
                    }
                  }

                  if(i === 3) {
                    if(kycDocs3) {
                      kycImg = kycDocs3;
                    }
                    else if(oldImgType == 'image' && oldImgValue) {
                      kycImg = oldImgValue
                    }
                  }

                  return <div className="col-lg-6">
                    <span className="personal-verification-text-2">
                      {kyc.name} {kyc.type}
                    </span>
                    <div className="mt-2">
                    {/* <div className="containerr">
                      <img  className="imgover-laye img-fluid" src="https://images.unsplash.com/photo-1488628075628-e876f502d67a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=" alt="" />
                      <div className="overlay"></div>
                      <div className="button-5"><a href="#"> BUTTON </a></div>
                    </div> */}
                    <div className="containerr">
                      <img src={kycImg} alt="kycImg" className="imagee"/>
                      {/* <img src="https://images.unsplash.com/photo-1488628075628-e876f502d67a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=" alt="Avatar" className="imagee"/> */}
                      {files1[kyc.name + " - " + kyc.type] != undefined &&
                      <div className="middle" onClick={() => removeKYC(i, kyc.name + " - " + kyc.type)}>
                        <div className="text">Remove <MdOutlineDeleteForever/> </div>
                      </div>}
                    </div>
                      <br />
                      {(myProfile && (myProfile.kycstatus == 2 || myProfile.kycstatus == 3)) && <FileUploader className="ui-fs"
                        multiple={true}
                        handleChange={(e) => handleChanges(e, kyc.name + ' - ' + kyc.type, i)}
                        name={kyc.name + ' - ' + kyc.type}
                        types={fileTypes}
                      />}
                      {
                      // files1[kyc.name + " - " + kyc.type] != undefined &&
                      //   <p className='color-white f-14'>
                      //     {typeof files1[kyc.name + " - " + kyc.type]?.name != "undefined" && <div onClick={() => removeKYC(i, kyc.name + " - " + kyc.type)}><BsFillTrashFill /><button className="btn">Remove</button></div>}
                      //   </p>
                      }
                    </div>{" "}
                  </div>
                })}
                {( (myProfile && myProfile.kycOffline && myProfile.kycOffline) && (myProfile?.kycstatus == 2 || myProfile?.kycstatus == 3) ) &&
                <>
                  {/* <div>&nbsp;</div> */}

                  <Formik
                    // enableReinitialize={true}
                    initialValues={initialValues()}
                    validationSchema={validationSchema_offlineKYC}
                    onSubmit={values => {
                      kycSubmit(values);
                    }}
                  >
                  {(formikProps) => {
                    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
                    return (
                    <form onSubmit={handleSubmit}>
                      <div className="col-12">
                        <div className='row'>
                          <div className='col-6 my-2'>
                            <TextField
                              InputLabelProps={{ style: { fontSize: '14px' } }}
                              className="color-white f-14" fullWidth
                              label={"First Name"}
                              id="firstname"
                              name="firstname"
                              value={values.firstname}
                              autoComplete="off"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.firstname ? <small className="invalid-firstname error">{errors.firstname} <br /></small> : null}
                          </div>
                          <div className='col-6 my-2'>
                            <TextField
                              InputLabelProps={{ style: { fontSize: '14px' } }}
                              className="color-white f-14" fullWidth
                              label={"Last Name"}
                              id="lastname"
                              name="lastname"
                              value={values.lastname}
                              autoComplete="off"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.lastname ? <small className="invalid-lastname error">{errors.lastname} <br /></small> : null}
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-6 my-2'>
                            <TextField
                              InputLabelProps={{ style: { fontSize: '14px' } }}
                              className="color-white f-14" fullWidth
                              label={"Aadhaar Number"}
                              id="aadhaar_number"
                              name="aadhaar_number"
                              value={values.aadhaar_number}
                              autoComplete="off"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.aadhaar_number ? <small className="invalid-aadhaar_number error">{errors.aadhaar_number} <br /></small> : null}
                          </div>
                          <div className='col-6 my-2'>
                            <TextField
                              InputLabelProps={{ style: { fontSize: '14px' } }}
                              className="color-white f-14" fullWidth
                              label={"Pan Number"}
                              id="pan_number"
                              name="pan_number"
                              value={values.pan_number}
                              autoComplete="off"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.pan_number ? <small className="invalid-pan_number error">{errors.pan_number} <br /></small> : null}
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-6 my-2'>
                            <TextField
                              InputLabelProps={{ style: { fontSize: '14px' } }}
                              className="color-white f-14" fullWidth
                              label={"Address"}
                              id="address"
                              name="address"
                              value={values.address}
                              autoComplete="off"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.address ? <small className="invalid-address error">{errors.address} <br /></small> : null}
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-6 my-2'>
                            {modePassportVerification == 'offline' &&
                              <div>
                                <button className="nav-link nav-register-button" type='submit' disabled={isLoading ? true : false}>{isLoading?"Loading...":"Submit KYC"}</button>
                              </div>
                            }
                          </div>
                        </div>
                        {/* {passportLoading &&
                        <div className='text-end'>
                        <img src={loaderImage3} alt={Config.SITENAME} className='ui-loder-identifi' width="70px" height="70px" />
                        </div>
                      } */}
                      </div>
                    </form>)
                  }}
                  </Formik>
                </>
              }
              </div>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
}
