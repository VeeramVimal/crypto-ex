import React,{ useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import * as yup from 'yup';
import { useFormik,Formik,Form } from 'formik';
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config/";
import { makeRequest } from "../core/services/v1/request";
import { useContextData } from '../core/context/index';

import {
  MenuItem,
  Grid,
  Select,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel
} from '@mui/material';
import { Modal, Button } from "react-bootstrap";

export default function Payment() {

  const navigate = useNavigate();

  const { myProfile,setUserProfile } = useContextData();
  const [bankStatus, setbankStatus] = useState(false);
  const [updatedStatus, setupdatedStatus] = useState(false);
  const [addbankfromOpen, setaddbankfromOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const validationSchema = yup.object({
    // accountName: yup
    //   .string('Enter enter the account name')
    //   .required('Account holder name is required'),
    // accountType: yup
    //   .string('Please enter the account type')
    //   .required('Account type is required'),
    bankAccount: yup
      .string('Please enter the bank account number')
      .required('Bank account number is required'),
    bankName: yup
      .string('Please enter the bank name')
      .required('Bank name is required'),
    ifscCode: yup
      .string('Please enter the ifsc code')
      .required('IFSC code is required'),
  });

  const initialValues = () => {
    return {
      // accountName: myProfile?.bankdetails?.['Beneficiary Name'],
      accountType: myProfile?.bankdetails?.['Account Type'],
      bankAccount: myProfile?.bankdetails?.['Account Number'],
      bankName: myProfile?.bankdetails?.['Bank Name'],
      ifscCode: myProfile?.bankdetails?.['IFSC Code'],
    }
  }
  const onSubmit = async(values) => {
    setisLoading(true);
    setupdatedStatus(true)
    const data  = {
      // beneficiaryName : values.accountName,
      accountType : values.accountType,
      accountNumber : values.bankAccount,
      bankName  : values.bankName,
      ifscCode  : values.ifscCode,
    }

    const bankDetail=([
      // {
      //   name: 'Beneficiary Name',
      //   type: 'beneficiaryName'
      // },
      {
        name: 'Bank Name',
        type: 'bankName'
      },
      {
        name: 'Account Number',
        type: 'accountNumber'
      },
      {
        name: 'IFSC Code',
        type: 'ifscCode'
      },
      {
        name: 'Account Type',
        type: 'accountType'
      }
  ])
    let bankdetailss = typeof data == 'object' ? data : {};
    let objValue = {};
    bankDetail.forEach((detail) => {
      if(typeof bankdetailss[detail.type] == 'string' || typeof bankdetailss[detail.type] == 'number') {
        objValue[detail.name] = bankdetailss[detail.type];
      }
    });

    console.log({data, values, bankdetailss, objValue});
    
    const params = { 
      url: `${Config.V1_API_URL}user/updateMyBank`,
      method: 'POST',
      body: {bankdetails: objValue}
    }
    const response = (await makeRequest(params));
    setisLoading(false);
    let type = 'error';
    if (response.status) {
      type = 'success';
      setUserProfile();
      setupdatedStatus(false);
      setaddbankfromOpen(false);
    }
    toast({ type, message: response.message });
  }
  return (
    <div>
      <div className="container-fluid px-0 mx-0">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-lg-row flex-column">
            <div className="text w-75 ">
            <p>When you sell your cryptocurrency, the added payment method will be shown to the buyer during the transaction. To accept cash transfer, please make sure the information is correct.
            </p>
            </div>
          <div>
            <div className="dropdown">
              {/* dropdown-toggle */}
              <button className="btn-next my-4 btn-unset" type="button"  onClick={()=>setaddbankfromOpen(true)} aria-expanded="false">
                + {!(myProfile && myProfile.bankdetails) ? "Add Bank" : "Update bank"}
              </button>
              {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li data-bs-toggle="modal" data-bs-target="#staticBackdrop"><a className="dropdown-item" href="#">UPI</a></li>
              <li data-bs-toggle="modal" data-bs-target="#staticBackdrop1"><a className="dropdown-item" href="#">Bank</a></li>
              </ul> */}
            </div>
            {/* <button className="btn-next my-4 btn-unset" data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Add a payment method</button> */}
          </div>
            </div>
          </div>
          { myProfile && myProfile.bankdetails && 
            <>
              <div className="col-lg-6 mt-3">
                <h5 className="border-left mobile-bank-h">bank Transfer (India)</h5>
              </div>
              <div className="col-lg-6 text-end">
                <button className="btn btn-Dmode  font-mobile" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setaddbankfromOpen(true)}> Edit</button>{" "}
                {/* <button className="btn btn-Dmode  font-mobile "> Delete</button> */}
              </div>
              <div className="col-lg-4">
                <p className="text-muted mt-2">
                  <b className="sub-h-payment">Account holder Name</b>
                </p>
                <p className="text-muted my-0">
                  <small className="small-font">{myProfile?.bankdetails?.['Beneficiary Name']}</small>
                </p>
              </div>
              <div className="col-lg-4">
                <p className="text-muted mt-2">
                  <b className="sub-h-payment">Account No</b>
                </p>
                <p className="text-muted my-0">
                  <small className="small-font">{myProfile?.bankdetails?.['Account Number']}</small>
                </p>
              </div>
              <div className="col-lg-4">
                <p className="text-muted mt-2 y-0">
                  <b className="sub-h-payment">Bank Name</b>
                </p>
                <p className="text-muted my-0">
                  <small className="small-font">{myProfile?.bankdetails?.['Bank Name']}</small>
                </p>
              </div>
              <div className="col-lg-4">
                <p className="text-muted mt-2">
                  <b className="sub-h-payment">IFSC code</b>
                </p>
                <p className="text-muted my-0">
                  <small className="small-font">{myProfile?.bankdetails?.['IFSC Code']}</small>
                </p>
              </div>
              <div className="col-lg-4">
                <p className="text-muted mt-2">
                  <b className="sub-h-payment">Account Type</b>
                </p>
                <p className="text-muted my-0">
                  <small className="small-font">{myProfile?.bankdetails?.['Account Type']}</small>
                </p>
              </div>
            </>
          }
          {/* <div className="col-lg-6 mt-4">
            <h5 className="border-left">UPI </h5>
          </div>
          <div className="col-lg-6 mt-4 text-end">
            <button className="btn btn-Dmode  font-mobile" data-bs-toggle="modal" data-bs-target="#staticBackdrop1"> Edit</button>{" "}
            <button className="btn btn-Dmode  font-mobile"> Delete</button>
          </div>
          <div className="col-lg-4">
            <p className="text-muted mt-2">
              <b className="sub-h-payment">Name</b>
            </p>
            <p className="text-muted my-0">
              <small className="small-font">P.venkatesh</small>
            </p>
          </div>
          <div className="col-lg-4">
            <p className="text-muted mt-2">
              <b className="sub-h-payment">UPI id</b>
            </p>
            <p className="text-muted my-0">
              <small className="small-font">919894324458</small>
            </p>
          </div> */}
        </div>
      </div>

      {/* models of this page  */}
      {/* models upi  */}
      {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Add a UPI id</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control"  placeholder="venkatesh"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Upi ID</label>
                <input type="text" className="form-control"  placeholder="9894324458@PAYTM"/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div> */}
    {/* models bank  */}
      <Modal show={addbankfromOpen} onHide={()=>setaddbankfromOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{!(myProfile && myProfile.bankdetails) ? "Add" : " Update"} a bank account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> */}
          {/* <div className="modal-dialog modal-dialog-centered"> */}
          { myProfile && 
              <Formik
                initialValues = {initialValues()}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onSubmit(values)
                }}
              >
              {(formikProps) => {
              const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProps;
              return (
                <>
                  {/* <div className="mb-3">
                    <label className="form-label">Account Holder Name</label>
                    <input type="text" className="form-control"  
                      id="accountName"
                      name='accountName'
                      autoComplete='off'
                      value={values.accountName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.accountName && Boolean(errors.accountName)}
                      helperText={touched.accountName && errors.accountName}
                    />
                    {errors.accountName ? <small className="invalid-accountName error">{errors.accountName}</small> : null}
                  </div> */}
                  <div className="mb-3">
                    <label className="form-label">Account No</label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.bankAccount}
                      id="bankAccount"
                      name='bankAccount'
                      autoComplete='off'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bankAccount && Boolean(errors.bankAccount)}
                      helperText={touched.bankAccount && errors.bankAccount}
                    />
                  {errors.bankAccount ? <small className="invalid-bankAccount error">{errors.bankAccount}</small> : null}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bank Name</label>
                    <input type="text" className="form-control"
                      value={values.bankName}
                      id="bankName"
                      name='bankName'
                      autoComplete='off'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bankName && Boolean(errors.bankName)}
                      helperText={touched.bankName && errors.bankName}
                    />
                  {errors.bankName ? <small className="invalid-bankName error">{errors.bankName}</small> : null}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">IFSC code</label>
                    <input type="text" className="form-control" 
                      value={values.ifscCode}
                      id="ifscCode"
                      name='ifscCode'
                      autoComplete='off'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.ifscCode && Boolean(errors.ifscCode)}
                      helperText={touched.ifscCode && errors.ifscCode}
                    />
                  {errors.ifscCode ? <small className="invalid-ifscCode error">{errors.ifscCode}</small> : null}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Account Type</label>
                    <Select fullWidth
                      id="accountType" name='accountType' className="color-white f-17"
                      label="Select account type"
                      value={values.accountType}
                      onChange={e => {handleChange(e)}}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={values.accountType=="Savings"?values.accountType:"Savings"}>{values.accountType=="Savings"?values.accountType:"Savings"}</MenuItem>
                      <MenuItem value={values.accountType=="Current"?values.accountType:"Current"}>{values.accountType=="Current"?values.accountType:"Current"}</MenuItem>
                    </Select>

                  {errors.accountType ? <small className="invalid-accountType error">{errors.accountType}</small> : null}
                  </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={()=>setaddbankfromOpen(false)} data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" disabled={isLoading} onClick={() => handleSubmit(values)}>Submit</button>
                </div>
                </>
                )
              }}
              </Formik>
            }
          {/* </div> */}
        {/* </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}
