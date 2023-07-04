import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik, Formik, Form } from "formik";
import { toast } from "../core/lib/toastAlert";
import Config from "../core/config";
import { makeRequest } from "../core/services/v1/request";
import { useContextData } from "../core/context/index";
import { isEmpty, pageAllowCheck } from "../core/helper/common";
import Payment from "./separate/Payment";
import { getCookie, setCookie } from '../core/helper/cookie';


import {
  MenuItem,
  Grid,
  Select,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Modal, Button } from "react-bootstrap";

export default function BankPayment(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pathname;
  const { myProfile, setUserProfile,p2pSettings } = useContextData();
  const [bankStatus, setbankStatus] = useState(false);
  const [updatedStatus, setupdatedStatus] = useState(false);
  const [addbankformOpen, setaddbankformOpen] = useState(false);
  const [updatebankfromOpen, setupdatebankfromOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [enableAddStatus, setenableAddStatus] = useState(false);
  const [bankpaymentsList, setbankpaymentsList] = useState([]);
  const [allpaymentsList, setallpaymentsList] = useState([]);
  const [paymentDetails, setpaymentDetails] = useState([]);

  const validationSchema = yup.object({
    // accountName: yup
    //   .string('Enter enter the account name')
    //   .required('Account holder name is required'),
    // accountType: yup
    // .string('Please enter the account type'),
    //   .required('Account type is required'),
    bankAccount: yup
      .number()
      .typeError("Please enter the bank account number")
      .required("Account number is required"),
    // bankName: yup
    //   .string()
    //   .matches(/[A-Z]/, "Please enter alphabets only."),
    ifscCode: yup
      .string("Please enter the ifsc code")
      .matches(/^[A-Za-z0-9]*$/, "Please enter alphanumeric only")
      .required("IFSC code is required"),
  });
  useEffect(() => {
    const LoggedIn = getCookie('userToken');
    if(LoggedIn) {
      getPayment();
      getallPaymentsDet();
    }
  }, [myProfile]);

  const initialAddbank = () => {
    return {
      accountType: "",
      bankAccount: "",
      bankName: "",
      ifscCode: "",
    };
  };
  const initialValues = () => {
    return {
      // accountName: myProfile?.bankdetails?.['Beneficiary Name'],
      // accountType: myProfile?.bankdetails?.['Account Type'],
      bankAccount: myProfile?.bankdetails?.["Account Number"],
      // bankName: myProfile?.bankdetails?.['Bank Name'],
      ifscCode: myProfile?.bankdetails?.["IFSC Code"],
    };
  };
  async function getPayment() {
    try {
        const data = { userId: myProfile?._id, }
        const params = {
            url: `${Config.V1_API_URL}p2p/getPayment`,
            method: 'POST',
            body: data
        }
        const response = (await makeRequest(params));
        if (response.status && response.data) {
            if (response.data.length > 0) {
                let newEnableAddStatus = true;
                response.data.map((data, i) => {
                    if (data.status == 0) {
                        newEnableAddStatus = false;
                    } else {
                        newEnableAddStatus = true;
                    }
                })
                setenableAddStatus(newEnableAddStatus);
                setpaymentDetails(response.data);
            } else {
                setenableAddStatus(true);
            }
        } else {
            setenableAddStatus(true);
        }
    } catch (err) { }
}
  async function getallPaymentsDet() {
    try {
        const params = {
            url: `${Config.V1_API_URL}p2p/getallPayments`,
            method: 'GET',
        }
        const response = (await makeRequest(params));
        if (response.status && response.data) {
            setallpaymentsList(response.data);
        }
    } catch (err) { }
}
  const onSubmit = async (values) => {
    setisLoading(true);
    setupdatedStatus(true);
    const data = {
      accountType: values.accountType,
      accountNumber: values.bankAccount,
      bankName: values.bankName,
      ifscCode: values.ifscCode,
    };

    const bankDetail = [
      // {
      //   name: 'Beneficiary Name',
      //   type: 'beneficiaryName'
      // },
      // {
      //   name: 'Bank Name',
      //   type: 'bankName'
      // },
      {
        name: "Account Number",
        type: "accountNumber",
      },
      {
        name: "IFSC Code",
        type: "ifscCode",
      },
      // {
      //   name: 'Account Type',
      //   type: 'accountType'
      // }
    ];
    let bankdetailss = typeof data == "object" ? data : {};
    let objValue = {};
    bankDetail.forEach((detail) => {
      if (
        typeof bankdetailss[detail.type] == "string" ||
        typeof bankdetailss[detail.type] == "number"
      ) {
        objValue[detail.name] = bankdetailss[detail.type];
      }
    });

    const params = {
      url: `${Config.V1_API_URL}user/updateMyBank`,
      method: "POST",
      body: { bankdetails: objValue },
    };
    const response = await makeRequest(params);
    setisLoading(false);
    let type = "error";
    if (response.status) {
      type = "success";
      setUserProfile();
      getPayment();
      setupdatedStatus(false);
      setaddbankformOpen(false);
    }
    toast({ type, message: response.message });
  };

  async function enableDisableStatus(data) {
    try {
      const params = {
        url: `${Config.V1_API_URL}p2p/enableDisablP2PPayment`,
        method: "POST",
        body: data,
      };
      const result = await makeRequest(params);
      let type = "error";
      if (result.status) {
        type = "success";
        setTimeout(() => {
          getPayment();
          setUserProfile();
        }, 300);
      }
      toast({ type, message: result.message });
    } catch (err) {
      console.log("err:", err);
    }
  }

  async function selectpaymentType(methods){
    if (myProfile) {
      const pageAllowCheckResp = pageAllowCheck(myProfile, "final");
      if (pageAllowCheckResp.type == "error") {
        toast({ type: pageAllowCheckResp.type, message: pageAllowCheckResp.message });
        navigate(pageAllowCheckResp.navigate);
      }
      else {
        if (methods.name == 'Bank') {
          const kycUserType = myProfile.country == "IND" ? myProfile.country : "International";
          if (kycUserType == "International") {
            toast({ type: "error", message: "This facility is currently un-available for your country." });
            return false;
          }
        }
        navigate("/payment/add/" + methods._id+"/?profile");
      }
  }
}

  return (
    <div>
      <div className="container-fluid px-0 mx-0">
        <div className="row">
          <div className="container-fluid py-5 bg-container-color" >
            <Payment
              paymentDetails={paymentDetails}
              p2pSettings={p2pSettings}
              enableAddStatus={enableAddStatus}
              myProfile={myProfile}
              allpaymentsList={allpaymentsList}
              selectpaymentType={selectpaymentType}
              enableDisableStatus={enableDisableStatus}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      {/* models bank  */}
      <Modal className={props.theme + " thememodal"} show={addbankformOpen} onHide={() => setaddbankformOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add bank account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialAddbank()}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(formikProps) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              } = formikProps;
              return (
                <>
                  <div className="mb-3">
                    <label className="form-label">Account No</label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.bankAccount}
                      id="bankAccount"
                      name="bankAccount"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bankAccount && Boolean(errors.bankAccount)}
                      helperText={touched.bankAccount && errors.bankAccount}
                    />
                    {errors.bankAccount ? (
                      <small className="invalid-bankAccount error">
                        {errors.bankAccount}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">IFSC code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.ifscCode}
                      id="ifscCode"
                      name="ifscCode"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.ifscCode && Boolean(errors.ifscCode)}
                      helperText={touched.ifscCode && errors.ifscCode}
                    />
                    {errors.ifscCode ? (
                      <small className="invalid-ifscCode error">
                        {errors.ifscCode}
                      </small>
                    ) : null}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setaddbankformOpen(false)}
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={isLoading}
                      onClick={() => handleSubmit(values)}
                    >
                      Submit
                    </button>
                  </div>
                </>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        show={updatebankfromOpen}
        onHide={() => setupdatebankfromOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!(myProfile && myProfile.bankdetails) ? "Add" : " Update"} a bank
            account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {myProfile && (
            <Formik
              initialValues={initialValues()}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              {(formikProps) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = formikProps;
                return (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Account No</label>
                      <input
                        type="text"
                        className="form-control"
                        value={values.bankAccount}
                        id="bankAccount"
                        name="bankAccount"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.bankAccount && Boolean(errors.bankAccount)
                        }
                        helperText={touched.bankAccount && errors.bankAccount}
                      />
                      {errors.bankAccount ? (
                        <small className="invalid-bankAccount error">
                          {errors.bankAccount}
                        </small>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Bank Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={values.bankName}
                        id="bankName"
                        name="bankName"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bankName && Boolean(errors.bankName)}
                        helperText={touched.bankName && errors.bankName}
                      />
                      {errors.bankName ? (
                        <small className="invalid-bankName error">
                          {errors.bankName}
                        </small>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">IFSC code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={values.ifscCode}
                        id="ifscCode"
                        name="ifscCode"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.ifscCode && Boolean(errors.ifscCode)}
                        helperText={touched.ifscCode && errors.ifscCode}
                      />
                      {errors.ifscCode ? (
                        <small className="invalid-ifscCode error">
                          {errors.ifscCode}
                        </small>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Account Type</label>
                      <Select
                        fullWidth
                        id="accountType"
                        name="accountType"
                        className="color-white f-17"
                        label="Select account type"
                        value={values.accountType}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      >
                        <MenuItem
                          value={
                            values.accountType == "Savings"
                              ? values.accountType
                              : "Savings"
                          }
                        >
                          {values.accountType == "Savings"
                            ? values.accountType
                            : "Savings"}
                        </MenuItem>
                        <MenuItem
                          value={
                            values.accountType == "Current"
                              ? values.accountType
                              : "Current"
                          }
                        >
                          {values.accountType == "Current"
                            ? values.accountType
                            : "Current"}
                        </MenuItem>
                      </Select>

                      {errors.accountType ? (
                        <small className="invalid-accountType error">
                          {errors.accountType}
                        </small>
                      ) : null}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setaddbankformOpen(false)}
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={() => handleSubmit(values)}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                );
              }}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
