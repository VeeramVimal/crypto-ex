import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";

import '../../assets/style.css';

import NavbarOne from '../siteTheme/NavbarOne';
import Footer from '../siteTheme/Footer';
import P2PHeader from './../separate/P2PHeader';

import { GoFile } from 'react-icons/go';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiErrorWarningFill } from 'react-icons/ri';
import { HiCurrencyDollar } from 'react-icons/hi';
import { GrFormAdd } from 'react-icons/gr';
import { TbReceipt } from 'react-icons/tb';


import { useFileUpload } from "use-file-upload";
import { TbUpload } from 'react-icons/tb';
import * as yup from 'yup';
import { useFormik, Formik } from 'formik';

import $ from "jquery";

import upload from "../../assets/images/p2p/Upload-image.png"
import { makeRequest } from "../../core/services/v1/request";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config/";
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
  bankName: yup
    .string('Enter enter the bank name')
    .matches(/[A-Z]/, "Please enter alphabets only.")
    .required('Bank name is required'),
  accountType: yup
    .string('Enter enter the account type')
    .required('Account type is required'),
  branch: yup
    .string('Enter bank branch information')
    .required('Branch information is required'),
});
const upivalidationSchema = yup.object({
  UPIID: yup
    .string('Enter your UPI ID')
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

export default function Updatepaymentmethod(props) {

  const defaultSrc = DefaultUpload;
  const { search } = useLocation();
  const paymentTypeUrl = search.replace(/\?/g, '');

  const navigate = useNavigate();
  const [files, selectFiles] = useFileUpload();
  let { paymentId } = useParams();
  const { myProfile, setUserProfile, p2pSettings } = useContextData();
  const [mypaymentDetails, setmypaymentDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [paymentformOpen, setpaymentformOpen] = useState(false);
  const [editpaymentformOpen, seteditpaymentformOpen] = useState(false);
  const [paymentverificationForm, setpaymentverificationForm] = useState(false);
  const [attachment, setattachment] = useState("");
  const [passData, setpassData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    geteditPayment_Det();
  }, []);
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
    if ((mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "UPI")) {
      return {
        UPIID: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].upiId),
        upifile: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].attachment)
      }
    } else if ((mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "Paytm")) {
      return {
        account: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].accountNo),
        paytmfile: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].attachment)
      }
    } else {
      return {
        accountNo: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].accountNo),
        ifscCode: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].ifscCode),
        bankName: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].bankName),
        accountType: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].accountType),
        branch: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].branch)
      }
    }
  }

  const onSubmit = async (values) => {
    setisLoading(true);
    let data = {};
    if (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "Paytm") {
      if (attachment == "") {
        data = {
          paymentId: paymentId,
          paymentmethodId: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymentmethodId),
          paymenttype: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype),
          attachment: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].attachment),
          holderName: myProfile?.username,
          userId: myProfile?._id,
          accountNo: values.account,
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
            paymentId: paymentId,
            paymentmethodId: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymentmethodId),
            paymenttype: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype),
            holderName: myProfile?.username,
            userId: myProfile?._id,
            accountNo: values.account,
            attachment: response.message[0].location
          }
        }
      }
    } else if ((mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "UPI")) {
      if (attachment == "") {
        data = {
          paymentId: paymentId,
          paymentmethodId: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymentmethodId),
          paymenttype: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype),
          attachment: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].attachment),
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
            paymentId: paymentId,
            paymentmethodId: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymentmethodId),
            paymenttype: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype),
            holderName: myProfile?.username,
            userId: myProfile?._id,
            UPIID: values.UPIID,
            attachment: response.message[0].location
          }
        }
      }
    } else {
      data = {
        paymentId: paymentId,
        paymentmethodId: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymentmethodId),
        paymenttype: (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype),
        holderName: myProfile?.username,
        userId: myProfile?._id,
        accountNo: values.accountNo,
        ifscCode: values.ifscCode,
        bankName: values.bankName,
        accountType: values.accountType,
        branch: values.branch,
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
      passData.OTPCode = values.OTPCode;
      const params = {
        url: `${Config.V1_API_URL}p2p/addPayment`,
        method: 'POST',
        body: passData
      }
      const response = (await makeRequest(params));
      let type = 'error';
      if (response.status) {
        type = 'success'
      }
      if (response.type == "KYC") {
        navigate("/identification");
      } else if (response.type == "TFA" || response.type == "2FA") {
        navigate("/google-authenticator");
      }
      toast({ type, message: response.message });
      setpaymentverificationForm(false);
      setisLoading(false);
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
                <span className="add-payment-method-heading-styling">Edit payment method</span>

              </div>
            </div>
          </div>
        </section>
        <section>

          {(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "UPI") &&
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
                        <div className="col-lg-5 ">
                          <h4 className='mb-3'>{(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype)}</h4>
                          <div>
                            <span className='add-payment-method-text-1'>Name</span>
                            <h5>{(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].holderName)}</h5>
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
                              </button> &nbsp; {console.log("files:", files)}
                              {files && files.source ?
                                <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" />
                                :
                                values?.upifile && <img src={values?.upifile} className="payment-qrcode-optional-image" alt="preview" />
                              }
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
          {(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "Paytm") &&
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
                        <div className="col-lg-5 ">
                          <h4 className='mb-3'>{(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype)}</h4>
                          <div>
                            <span className='add-payment-method-text-1'>Name</span>
                            <h5>{(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].holderName)}</h5>
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
                              {/* <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" /><br /> */}
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
                              </button> &nbsp;
                              {files && files.source ?
                                <img className='payment-qrcode-optional-image' src={files?.source || defaultSrc} alt="preview" />
                                :
                                values?.paytmfile && <img src={values?.paytmfile} className="payment-qrcode-optional-image" alt="preview" />
                              }
                              {errors.paytmfile ? <small className="invalid-UPIID error">{errors.paytmfile}</small> : null}
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
          {((mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "IMPS") || (mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype == "Bank")) &&
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
                        <div className="col-lg-5 ">
                          <h4 className='mb-3'>{(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].paymenttype)}</h4>
                          <div>
                            <span className='add-payment-method-text-1'>Name</span>
                            <h5>{(mypaymentDetails && mypaymentDetails[0] && mypaymentDetails[0].holderName)}</h5>
                          </div>
                          <div className='mt-4'>
                            <span className='add-payment-method-text-1'>Bank account number</span>
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
                            <span className='add-payment-method-text-1'>IFSC code</span>
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
                          <div className='mt-4'>
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
                          </div>
                          <div className='mt-4'>
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
                    <button className="add-payment-method-confirm-button" type="submit" >Confirm</button>
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
