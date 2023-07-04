import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";

import '../../assets/style.css';

import NavbarOne from '../siteTheme/NavbarOne';
import Footer from '../siteTheme/Footer';
import P2PHeader from '../separate/P2PHeader';

import { GoFile } from 'react-icons/go';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiErrorWarningFill } from 'react-icons/ri';
import { HiCurrencyDollar } from 'react-icons/hi';
import { GrFormAdd } from 'react-icons/gr';
import { TbReceipt } from 'react-icons/tb';
import { AiOutlineWarning } from 'react-icons/ai'

import { useFileUpload } from "use-file-upload";
import { TbUpload } from 'react-icons/tb';
import * as yup from 'yup';
import { useFormik, Formik } from 'formik';

import $ from "jquery";

import upload from "../../assets/images/p2p/Upload-image.png"
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config";
import { useContextData } from '../../core/context';
import DefaultUpload from "../../assets/images/cloud+upload+file.png";

const currentDate = new Date();

const validationSchema = yup.object({
  orderNo: yup
    .number()
    .typeError('Please enter the correct order number')
    .required('order number is required'),
  description: yup
    .string('Enter the description')
    .required('description is required'),
  // reason: yup
  //   .string('Enter the reason')
  //   .required('Reason is required'),
  email: yup
    .string('Enter the email address')
    .required('Email is required'),
  myfile1: yup
    .mixed().required('Upload proof is required'),
});
const impsvalidationSchema = yup.object({
  accountNo: yup
    .number()
    .typeError('Enter enter the bank account number')
    .required('Bank account number is required'),
  ifscCode: yup
    .string('Enter enter the ifsc code')
    .matches(/^[A-Za-z0-9]*$/, 'Please enter alphanumeric only')
    .required('Ifsc code is required'),
  // bankName: yup
  //   .string('Enter enter the bank name')
  //   .matches(/[A-Z]/, "Please enter alphabets only." ),
    // .required('Bank name is required'),
  // accountType: yup
  //   .string('Enter enter the account type'),
    // .required('Account type is required'),
  // branch: yup
  //   .string('Enter bank branch information')
  //   .required('Branch information is required'),
});
const upivalidationSchema = yup.object({
  UPIID: yup
    .string()
    .matches(/^\S*$/, "UPI ID without spaces")
    .typeError('Enter enter the UPI ID')
    .required('UPI ID is required'),
});
const paytmvalidationSchema = yup.object({
  account: yup
    .string('Enter your account number')
    .required('Account number is required'),
});
const otpvalidationSchema = yup.object({
  OTPCode: yup
    .string('Enter the 2FA')
    .required('2FA Code is required'),
});

export default function Addpaymentmethod(props) {

  const defaultSrc = DefaultUpload;
  const { search } = useLocation();
  const paymentTypeUrl = search.replace(/\?/g, '');

  const navigate = useNavigate();
  const [files, selectFiles] = useFileUpload();
  let { paymentId } = useParams();
  const { myProfile, setUserProfile, p2pSettings } = useContextData();
  const [paymentDetails, setpaymentDetails] = useState({});
  const [mypaymentDetails, setmypaymentDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [paymentformOpen, setpaymentformOpen] = useState(false);
  const [editpaymentformOpen, seteditpaymentformOpen] = useState(false);
  const [paymentverificationForm, setpaymentverificationForm] = useState(false);
  const [attachment, setattachment] = useState("");
  const [passData, setpassData] = useState({});
  const [tfaisLoading, settfaisLoading] = useState(false);

  useEffect(() => {
    getPayment();
    geteditPayment_Det();
  }, []);
  async function getPayment() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getParticularPaymentList`,
        method: "POST",
        body: { paymentId: paymentId }
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setpaymentDetails(response.data);
      }
    } catch (err) { }
  }
  async function geteditPayment_Det() {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/getmyParticularPaymentList`,
        method: "POST",
        body: { paymentId: paymentId }
      };
      const response = await makeRequest(params);
      if (response.status && response.data) {
        setmypaymentDetails(response.data);
      }

    } catch (err) { }
  }
  const initialValues = () => {
    if (paymentDetails?.name == "UPI") {
      return {
        UPIID: "",
        upifile: ""
      }
    } else if (paymentDetails?.name == "Paytm") {
      return {
        account: "",
        paytmfile: ""
      }
    } else {
      return {
        accountNo: "",
        ifscCode: "",
        // bankName: "",
        // accountType: "",
        // branch: ""
      }
    }
  }

  const onSubmit = async (values) => {
    setisLoading(true);
    let data = {};
    if (paymentDetails?.name == "Paytm") {
      if (attachment == "") {
        data = {
          paymentmethodId: paymentId,
          paymenttype: paymentDetails?.name,
          holderName: myProfile?.username,
          userId: myProfile?._id,
          accountNo: values.account,
          attachment: ""
        }
      } else {
        const formData = new FormData();
        let sizeFile = 1;
        let fileToUpload = values.paytmfile;
        let fileName = 'attachment';
        let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
        formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
        const params = {
          url: `${Config.V1_API_URL}admin/fileUpload?sizeFile=${sizeFile}&&type="attachment"`,
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const response = (await makeRequest(params));
        if (response.status) {
          data = {
            paymentmethodId: paymentId,
            paymenttype: paymentDetails?.name,
            holderName: myProfile?.username,
            userId: myProfile?._id,
            accountNo: values.account,
            attachment: response.message[0].location
          }
        }
      }
    } else if (paymentDetails?.name == "UPI") {
      if (attachment == "") {
        data = {
          paymentmethodId: paymentId,
          paymenttype: paymentDetails?.name,
          holderName: myProfile?.username,
          userId: myProfile?._id,
          UPIID: values.UPIID,
        }
      } else {
        const formData = new FormData();
        let sizeFile = 1;
        let fileToUpload = values.upifile;
        let fileName = 'attachment';
        let fileExtension = fileToUpload.name.split('?')[0].split('.').pop();
        formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
        const params = {
          url: `${Config.V1_API_URL}admin/fileUpload?sizeFile=${sizeFile}&&type="attachment"`,
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const response = (await makeRequest(params));
        if (response.status) {
          data = {
            paymentmethodId: paymentId,
            paymenttype: paymentDetails?.name,
            holderName: myProfile?.username,
            userId: myProfile?._id,
            UPIID: values.UPIID,
            attachment: response.message[0].location
          }
        }
      }
    } else {
      data = {
        paymentmethodId: paymentId,
        paymenttype: paymentDetails?.name,
        holderName: myProfile?.username,
        userId: myProfile?._id,
        accountNo: values.accountNo,
        ifscCode: values.ifscCode,
        // bankName: values.bankName,
        // accountType: values.accountType,
        // branch: values.branch,
      }
    }
    setpassData(data);
    setpaymentverificationForm(true);
    seteditpaymentformOpen(false);
  }
  const formikTFAverify = useFormik({
    initialValues: {
      OTPCode: '',
    },
    validationSchema: otpvalidationSchema,
    onSubmit: async (values) => {
      settfaisLoading(true);
      passData.OTPCode = values.OTPCode;
      const params = {
        url: `${Config.V1_API_URL}p2p/addPayment`,
        method: 'POST',
        body: passData
      }
      const response = (await makeRequest(params));
      settfaisLoading(false);
      let type = 'error';
      if (response.status) {
        type = 'success';
        toast({ type, message: response.message });
        setpaymentverificationForm(false);
        if (paymentTypeUrl == 'profile') {
          navigate("/my/payment");
        } else if (paymentTypeUrl == 'p2p-user-center') {
          navigate("/p2p-user-center");
        } else {
          navigate("/my/payment");
        }
        setattachment("");
        passData = "";
        setpassData(passData);
      } else {
        if (response.type == "KYC") {
          navigate("/identification");
        } else if (response.type == "TFA" || response.type == "2FA") {
          navigate("/google-authenticator");
        }
        toast({ type, message: response.message });
      }
    }
  });
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />

      <div className="p2p-trade-top-section add-payment-method-p2p-user-center">
        {/* ====================================P2P-SECOND-NAV-START================================== */}
        <P2PHeader />
        {/* =====================================P2P-SECOND-NAV-END=================================== */}

        {/* =====================================ADD-PAYMENT-METHOD-START============================== */}

        <section>
          <div className="container py-3">
            <div className="row">
              <div className="col">
                <span className="add-payment-method-heading-styling">Add payment method</span>

              </div>
            </div>
          </div>
        </section>
        <section>

          {paymentDetails?.name == "UPI" &&
            <Formik
              initialValues={initialValues()}
              validationSchema={upivalidationSchema}
              onSubmit={(values) => {
                onSubmit(values)
              }}
            >
              {(formikProps) => {
                const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
                return (
                  <Form >
                    <div className='container add-payment-method-top-banner pb-5'>
                      <div className="row justify-content-center align-items-center ">
                        <div className="col-lg-12 my-3">
                          <div className="row">
                            <center>
                              <div className="col-lg-5">
                                <div className="alert alert-warning text-start" role="alert">
                                  <small><AiOutlineWarning /> Tips: The added payment method will be shown to the buyer during the transaction
                                    to accept fiat transfers. Please ensure that the information is correct, real, and
                                    matches your KYC information on {Config.SITENAME}.</small>
                                </div>
                              </div>
                            </center>
                          </div>
                        </div>
                        <div className="col-lg-5 ">
                          <h4 className='mb-3'>{paymentDetails?.name}</h4>
                          <div>
                            <span className='add-payment-method-text-1'>Name</span>
                            <h5>{myProfile?.username}</h5>
                          </div>
                          <div className='mt-4'>
                            <span className='add-payment-method-text-1'>UPI ID</span>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Enter your UPI ID"
                              name="UPIID"
                              autoComplete='off'
                              value={values.UPIID}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.UPIID && Boolean(errors.UPIID)}
                              helperText={touched.UPIID && errors.UPIID}
                            />
                            {errors.UPIID ? <small className="invalid-UPIID error">{errors.UPIID}</small> : null}
                          </div>
                          <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Payment QR code(optional)</span>
                            <div>
                              <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" /><br />
                              <button className='payment-qrcode-optional-button mt-3' name="upifile" type="button"
                                onClick={() =>
                                  selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                    console.log("Files Selected", { name, size, source, file });
                                    setattachment(file);
                                    values.upifile = file;
                                  })
                                }
                              >
                                <TbUpload />Upload
                              </button>
                              {errors.upifile ? <small className="invalid-UPIID error">{errors.upifile}</small> : null}
                            </div>
                            <span className='add-payment-method-text-2'>(JPG/JPEG/PNG/BMP, less than 1MB)</span>
                          </div>
                          <div className='row mt-5'>
                            <div className='col'>
                              <div className="d-grid">
                                <button className="add-payment-method-cancel-button" type="button" onClick={() => navigate("/p2p-user-center")}>Cancel</button>
                              </div>
                            </div>
                            <div className='col'>
                              <div className="d-grid">
                                <button className="add-payment-method-confirm-button" type="button" onClick={() => handleSubmit(values)}>Confirm</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          }
          {paymentDetails?.name == "Paytm" &&
            <Formik
              initialValues={initialValues()}
              validationSchema={paytmvalidationSchema}
              onSubmit={(values) => {
                onSubmit(values)
              }}
            >
              {(formikProps) => {
                const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
                return (
                  <Form >
                    <div className='container add-payment-method-top-banner pb-5'>
                      <div className="row justify-content-center align-items-center ">
                        <div className="col-lg-12 my-3">
                          <div className="row">
                            <center>
                              <div className="col-lg-5">
                                <div className="alert alert-warning text-start" role="alert">
                                  <small><AiOutlineWarning /> Tips: The added payment method will be shown to the buyer during the transaction
                                    to accept fiat transfers. Please ensure that the information is correct, real, and
                                    matches your KYC information on {Config.SITENAME}.</small>
                                </div>
                              </div>
                            </center>
                          </div>
                        </div>
                        <div className="col-lg-5 ">
                          <h4 className='mb-3'>{paymentDetails?.name}</h4>
                          <div>
                            <span className='add-payment-method-text-1'>Name</span>
                            <h5>{myProfile?.username}</h5>
                          </div>
                          <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Account</span>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Enter your Account Number"
                              name="account"
                              autoComplete='off'
                              value={values.account}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.account && Boolean(errors.account)}
                              helperText={touched.account && errors.account}
                            />
                            {errors.account ? <small className="invalid-account error">{errors.account}</small> : null}
                          </div>
                          <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Payment QR code(optional)</span>
                            <div>
                              <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" /><br />
                              <button className='payment-qrcode-optional-button mt-3' name="paytmfile" type="button"
                                onClick={() =>
                                  selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                    console.log("Files Selected", { name, size, source, file });
                                    setattachment(file);
                                    values.paytmfile = file;
                                  })
                                }
                              >
                                <TbUpload />Upload
                              </button>
                              {errors.upifile ? <small className="invalid-UPIID error">{errors.upifile}</small> : null}
                            </div>
                            <span className='add-payment-method-text-2'>(JPG/JPEG/PNG/BMP, less than 1MB)</span>
                          </div>
                          <div className='row mt-5'>
                            <div className='col'>
                              <div className="d-grid">
                                <button className="add-payment-method-cancel-button" type="button" onClick={() => navigate("/p2p-user-center")}>Cancel</button>
                              </div>
                            </div>
                            <div className='col'>
                              <div className="d-grid">
                                <button className="add-payment-method-confirm-button" type="button" disabled={isLoading} onClick={() => handleSubmit(values)}>Confirm</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          }
          {(paymentDetails?.name == "IMPS" || paymentDetails?.name == "Bank") &&
            <Formik
              initialValues={initialValues()}
              validationSchema={impsvalidationSchema}
              onSubmit={(values) => {
                onSubmit(values)
              }}
            >
              {(formikProps) => {
                const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
                return (
                  <Form >
                    <div className='container add-payment-method-top-banner pb-5'>
                      <div className="row justify-content-center align-items-center ">
                        <div className="col-lg-12 my-3">
                          <div className="row">
                            <center>
                              <div className="col-lg-5">
                                <div className="alert alert-warning text-start" role="alert">
                                  <small><AiOutlineWarning /> Tips: The added payment method will be shown to the buyer during the transaction
                                    to accept fiat transfers. Please ensure that the information is correct, real, and
                                    matches your KYC information on {Config.SITENAME}.</small>
                                </div>
                              </div>
                            </center>
                          </div>
                        </div>
                        <div className="col-lg-5 ">
                          <h4 className='mb-3'>{paymentDetails?.name}</h4>
                          <div>
                            <span className='add-payment-method-text-1'>Name</span>
                            <h5>{myProfile?.username}</h5>
                          </div>
                          <div className='mt-4'>
                            <p className='add-payment-method-text-1'>Bank account number</p>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Please enter your bank account number"
                              name="accountNo"
                              autoComplete='off'
                              value={values.accountNo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.accountNo && Boolean(errors.accountNo)}
                              helperText={touched.accountNo && errors.accountNo}
                            />
                            {errors.accountNo ? <small className="invalid-accountNo error">{errors.accountNo}</small> : null}
                          </div>
                          <div className='mt-4'>
                            <p className='add-payment-method-text-1'>IFSC code</p>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Enter your IFSC code"
                              name="ifscCode"
                              autoComplete='off'
                              value={values.ifscCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.ifscCode && Boolean(errors.ifscCode)}
                              helperText={touched.ifscCode && errors.ifscCode}
                            />
                            {errors.ifscCode ? <small className="invalid-ifscCode error">{errors.ifscCode}</small> : null}
                          </div>
                          {/* <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Bank Name</span>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Enter the name of your bank"
                              name="bankName"
                              autoComplete='off'
                              value={values.bankName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.bankName && Boolean(errors.bankName)}
                              helperText={touched.bankName && errors.bankName}
                            />
                            {errors.bankName ? <small className="invalid-bankName error">{errors.bankName}</small> : null}
                          </div>
                          <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Account Type</span>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Enter the name of your bank"
                              name="accountType"
                              autoComplete='off'
                              value={values.accountType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.accountType && Boolean(errors.accountType)}
                              helperText={touched.accountType && errors.accountType}
                            />
                            {errors.accountType ? <small className="invalid-accountType error">{errors.accountType}</small> : null}
                          </div> */}
                          {/* <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Account opening branch</span>
                            <input type="text" className="form-control-payment-method"
                              placeholder="Enter bank branch information"
                              name="branch"
                              autoComplete='off'
                              value={values.branch}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.branch && Boolean(errors.branch)}
                              helperText={touched.branch && errors.branch}
                            />
                            {errors.branch ? <small className="invalid-branch error">{errors.branch}</small> : null}
                          </div> */}

                          <div className='row mt-5'>
                            <div className='col'>
                              <div className="d-grid">
                                <button className="add-payment-method-cancel-button" type="button" onClick={() => navigate("/p2p-user-center")}>Cancel</button>
                              </div>
                            </div>
                            <div className='col'>
                              <div className="d-grid">
                                <button className="add-payment-method-confirm-button" type="button" disabled={isLoading} onClick={() => handleSubmit(values)}>Confirm</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          }
        </section>


        {/* =====================================ADD-PAYMENT-METHOD-END================================ */}

        <Modal show={paymentverificationForm} onHide={() => setpaymentverificationForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Security verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formikTFAverify.handleSubmit}>
              <div className="row justify-content-center align-items-center ">
                <div className="row mt-4">
                  <span className="phonenumber-change-text-2">
                    Enter 2FA Verification Code
                  </span>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete='off'
                      label="Enter 2FA Code"
                      id="OTPCode"
                      name='OTPCode'
                      onChange={formikTFAverify.handleChange}
                      onBlur={formikTFAverify.handleBlur}
                      error={formikTFAverify.touched.OTPCode && Boolean(formikTFAverify.errors.OTPCode)}
                      helperText={formikTFAverify.touched.OTPCode && formikTFAverify.errors.OTPCode} />
                  </div>
                  {formikTFAverify.errors.OTPCode ? <span className="phonenumber-change-text-3 text-muted error"> {formikTFAverify.errors.OTPCode}</span> : null}
                </div>

              </div>
              <div className='row mt-5'>
                <div className='col'>
                  <div className="d-grid">
                    <button className="add-payment-method-confirm-button" type="submit" disabled={tfaisLoading}>Confirm</button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>





      </div >
      <Footer />
    </div >
  );
}
