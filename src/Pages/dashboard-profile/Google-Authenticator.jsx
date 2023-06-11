import React, { useState, useEffect } from 'react'
import NavbarOne from "../siteTheme/NavbarOne";
import { FaArrowCircleLeft } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { toast } from "../../core/lib/toastAlert";
import * as yup from 'yup';
import { Formik } from 'formik';
import { useFormik } from 'formik';
import { useContextData } from '../../core/context/index'
import Config from "../../core/config/";
import { makeRequest } from "../../core/services/v1/request";
import { Navigate, useNavigate } from 'react-router-dom';
import { RiFileCopyFill } from 'react-icons/ri';
import { getCookie, deleteCookie } from '../../core/helper/cookie';

const validationtfaSchema = yup.object({
  code: yup
    .string('Please enter the 2FA code')
    .required('2FA code is required'),
});

export default function GoogleAuthenticator(props) {

  const navigate = useNavigate();
  const { myProfile, setUserProfile, siteSettings } = useContextData();
  const [isLoading, setisLoading] = useState(false);
  const [TFAQRCode, setTFAQRCode] = useState("");

  useEffect(() => {
    getTFADetails();
  }, [myProfile, siteSettings])

  async function getTFADetails() {
    if (myProfile) {
      let displayName = siteSettings?.siteName+" - ";

      if (myProfile.username) {
        displayName = displayName+myProfile.username;
      }
      if (myProfile.email) {
        displayName = displayName ? displayName + "(" + myProfile.email + ")" : myProfile.email;
      }
      else if (myProfile.phoneno) {
        displayName = displayName ? displayName + "(" + myProfile.phoneno + ")" : myProfile.phoneno;
      }
      // displayName = displayName + " - " + siteSettings?.siteName;
      let urlencoded = encodeURI('otpauth://totp/' + displayName + '?secret=' + myProfile.secretKey + '&issuer=' + siteSettings?.siteName);
      setTFAQRCode('https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=' + urlencoded)
    }
  }

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: validationtfaSchema,
    onSubmit: async (values, { resetForm }) => {
      setisLoading(true)
      const data = {
        secret: myProfile?.secretKey,
        code: values.code
      }
      const params = {
        url: `${Config.V1_API_URL}user/updateTFA`,
        method: 'POST',
        body: data
      }
      const response = (await makeRequest(params));
      let type = 'error';
      if (response.status) {
        type = 'success';
        if (response.type == 1) {
          deleteCookie('userToken');
          setUserProfile();
          navigate('/login');
        }
        else {
          resetForm({ values: '' });
          setUserProfile();
        }
      }
      setisLoading(false)
      toast({ type, message: response.message });
    },
  });

  function copyText(data = {}) {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.value = data.text;
    input.select();
    document.execCommand("Copy");
    input.remove();
    let message = "";
    if (data.type == "referCode") {
      message = "Referral code copied successfully!";
    }
    else if (data.type == "referId") {
      message = "Referral link copied successfully!";
    }
    else if (data.type == "secretKey") {
      message = "2FA secret key copied successfully!";
    }
    toast({ type: 'success', message });
  }
  return (
    <div>

      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />
      <div className='container-fluid mt-5 pt-5'>
        <div className='row justify-content-center min-vh-100'>
          <div className='col-lg-12'>
            <h2 onClick={() => navigate("/my/profile")}><FaArrowCircleLeft /> Security</h2>
            <h1 className='mt-5 text-center'>Google Authenticator</h1>
            <h4 className='text-center my-4 password-text-55'>Download and install the Authenticator app</h4>
            <center>
              <div className="card bg-transparent card-width-style mt-5">
                <div className="card-body">
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <center>
                          <div onClick={() => window.open(Config.TFA.downLoadLink.googleApp, 'new_window')} className="cursor curPoiter">
                            <h1><BsApple /></h1>
                            <p className='password-text-33 mb-1'>Download from</p>
                            <h4 className='password-text-55'>App store</h4>
                          </div>
                          {myProfile?.tfaenablekey == '' ?
                            <>
                              {TFAQRCode &&
                                <img src={TFAQRCode} alt='qrcode' className='img-fluid' />
                              }
                              <p><small className='password-text-33 mb-3'>Scan this QR code in the Authenticator app</small></p>
                              <button
                                className='btn-next btn mb-3'
                                type="button"
                              >
                                {myProfile?.secretKey}
                                {" "}<RiFileCopyFill className='curPointer' onClick={() => copyText({ text: myProfile?.secretKey, type: "secretKey" })} />
                              </button>
                              <p><small className='password-text-33 fw-bold'>Save this key or you may lose access to your account.</small></p>
                            </>
                            :
                            <><div className="form-floating mt-5">Your 2FA is enabled right now.</div></>
                          }
                        </center>
                      </div>
                      <div className='col-lg-6'>
                        <form onSubmit={formik.handleSubmit}>
                          <center>
                            <div onClick={() => window.open(Config.TFA.downLoadLink.playstoreApp, 'new_window')} className="cursor curPoiter">
                              <h1><IoLogoGooglePlaystore /></h1>
                              <p className='password-text-33 mb-1'>Download from</p>
                              <h4 className='password-text-55'>Play store</h4>
                            </div>
                            <div className="form-floating mt-5">
                              <input type="text" className="form-control bg-transparent"
                                // placeholder="Enter 2FA code"
                                name="code"
                                id="code"
                                autoComplete='off'
                                onChange={formik.handleChange}
                                value={formik.values.code}
                                onBlur={formik.handleBlur}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
                              />
                              {formik.errors.code ? <small className="invalid-code error">{formik.errors.code}</small> : null}
                              <label for="floatingInput">Enter 2FA code</label>
                            </div>
                            <button
                              className={myProfile?.tfaenablekey != '' ? 'btn-next btn my-2' : 'btn-next btn mt-4'}
                              type='submit'
                              disabled={isLoading}
                            >
                              {myProfile?.tfaenablekey != '' ? 'Disable' : 'Enable'}
                            </button> <br></br>
                            {/* <button className='btn-next btn my-2 disabled'>Disable</button> */}
                          </center>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  )
}
