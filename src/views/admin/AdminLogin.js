import React, { useContext, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "context/newContext";
import { emailRegex } from "utils/emailRegex";

// firebase
import { authentication } from "firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { defaultAPIErrorHandler } from "api/api";
//

function AdminLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);

  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [hidePassword, setHidePassword] = useState(true);

  //firebase
  const [disableOTP, setDisableOTP] = useState(false);
  const [disableOTPPhone, setDisableOTPPhone] = useState(false);
  const [showOTPPhoneDiv, setShowOTPPhoneDiv] = useState(true);
  const [showOTPDiv, setShowOTPDiv] = useState(false);
  const [showNewPasswordDiv, setShowNewPasswordDiv] = useState(false);

  const handleCopyCredentials = () => {
    setUserDetails((prev) => ({
      ...prev,
      mobile: "1234567890",
      mobileErr: "",
      password: "123123123",
      passwordErr: "",
    }));
  };

  const resetModalState = () => {
    setDisableOTP(false);
    setDisableOTPPhone(false);
    setShowNewPasswordDiv(false);
    setShowOTPDiv(false);
    setShowOTPPhoneDiv(true);
  };

  const validateVerifyOTP = () => {
    let isError = false;

    // otp_phone
    if (!userDetails.otp) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        otpErr: "OTP can't be empty.",
      }));
    } else if (userDetails.otp.length !== 6) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        otpErr: "OTP must be of 6 digits.",
      }));
    }

    return isError;
  };

  const verifyOTP = (e) => {
    const isError = validateVerifyOTP();
    if (isError) {
      return;
    }

    if (userDetails.otp.toString().length === 6) {
      setDisableOTP(true);
      let confirmationResult = window.confirmationResult;
      console.log("vertufOTP called");

      confirmationResult
        .confirm(userDetails.otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          setShowNewPasswordDiv(true);
          setShowOTPDiv(false);
          setShowOTPPhoneDiv(false);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setUserDetails((prev) => ({
            ...prev,
            otpErr: "Invalid Verification Code. Try Again",
          }));
        });
    } else {
      alert("OTP Code must be of 6 digits");
    }
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      },
      authentication
    );
  };

  const validateRequestOTP = () => {
    let isError = false;

    // otp_phone
    if (!userDetails.otp_phone) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        otp_phoneErr: "OTP Mobile Number can't be empty.",
      }));
    } else if (userDetails.otp_phone.length !== 10) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        otp_phoneErr: "OTP Mobile Number must be of 10 digits.",
      }));
    }

    return isError;
  };

  const requestOTP = () => {
    const isError = validateRequestOTP();
    if (isError) {
      return;
    }

    setUserDetails((prev) => ({ ...prev, otp: "", otpErr: "" }));

    if (userDetails.otp_phone.toString().length === 10) {
      setDisableOTPPhone(true);
      setShowOTPDiv(true);

      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(
        authentication,
        `+91${userDetails.otp_phone}`,
        appVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          // Error sms not sent
          console.log(error);
        });
    } else {
      alert("Phone Number must be of 10 digits");
    }
  };
  //

  const toggleEyeButton = () => {
    if (hidePassword) {
      setHidePassword(!hidePassword);
      setInputTypePassword("text");
    } else {
      setHidePassword(!hidePassword);
      setInputTypePassword("password");
    }
  };

  const [userDetails, setUserDetails] = useState({
    mobile: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && e.target.value.toString().length > 10) {
      alert("Mobile No. must be of 10 digits");
      return;
    } else if (name === "mobile") {
      const validNumberRegex = /^\d*$/;
      console.log(3, validNumberRegex.test(value));

      if (!!validNumberRegex.test(value)) {
        setUserDetails((prev) => ({
          ...prev,
          [`${name}Err`]: "",
          [name]: e.target.value,
        }));
        return;
      } else {
        return;
      }
    } else if (name === "password") {
      if (value === "") {
        setUserDetails((previous) => {
          return {
            ...previous,
            [`${name}Err`]: "Password is required",
            [name]: e.target.value,
          };
        });
      } else {
        setUserDetails((previous) => {
          return {
            ...previous,
            [`${name}Err`]: "",
            [name]: e.target.value,
          };
        });
      }
    } else if (name === "otp_phone") {
      if (value === "") {
        setUserDetails((previous) => {
          return {
            ...previous,
            [`${name}Err`]: "OTP Mobile No. is required",
            [name]: e.target.value,
          };
        });
      } else if (value.length > 10) {
      } else {
        setUserDetails((previous) => {
          return {
            ...previous,
            [`${name}Err`]: "",
            [name]: e.target.value,
          };
        });
      }
    } else if (name === "otp") {
      if (value.length > 6) {
      } else {
        setUserDetails((previous) => {
          return {
            ...previous,
            [`${name}Err`]: "",
            [name]: e.target.value,
          };
        });
      }
    } else {
      setUserDetails((previous) => {
        return {
          ...previous,
          [`${name}Err`]: "",
          [name]: e.target.value,
        };
      });
    }
  };

  const validateSignIn = () => {
    let isError = false;
    // mobile
    if (!userDetails.mobile) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        mobileErr: "Mobile Number can't be empty.",
      }));
    } else if (userDetails.mobile.length !== 10) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        mobileErr: "Mobile Number must be of 10 digits.",
      }));
    }
    // password
    if (!userDetails.password) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        passwordErr: `Password can't be empty.`,
      }));
    } else if (userDetails.password.length < 8) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        passwordErr: `Password must be greater than 8 characters.`,
      }));
    }

    return isError;
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const isError = validateSignIn();
    if (isError) {
      return;
    }

    console.log("handleSignIn");

    const data = JSON.stringify({
      mobile: userDetails.mobile,
      password: userDetails.password,
      role: "admin",
    });

    console.log(data);

    const config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/user/loginAll",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);

        dispatch({
          type: "ADMIN_LOGIN",
          adminToken: response.data.data.token,
        });

        navigate("/admin/dashboard", { replace: true });
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const validateForgotPassword = () => {
    let isError = false;

    if (!userDetails.otp_phone) {
      alert("otp_phone is invalid");
      return;
    } else if (!userDetails.newPassword) {
      alert("newPassword is invalid");
      return;
    } else if (!userDetails.confirmNewPassword) {
      alert("confirmNewPassword is invalid");
      return;
    } else if (userDetails.newPassword !== userDetails.confirmNewPassword) {
      alert("newPassword and confirmNewPassword does not match");
      return;
    }
    // otp_phone
    if (!userDetails.otp_phone) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        otp_phoneErr: "OTP Mobile Number can't be empty.",
      }));
    } else if (userDetails.otp_phone.length !== 10) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        otp_phoneErr: "OTP Mobile Number must be of 10 digits.",
      }));
    }
    // new password
    if (!userDetails.newPassword) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        newPasswordErr: `New Password can't be empty.`,
      }));
    } else if (userDetails.newPassword.length < 8) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        newPasswordErr: `New Password must be greater than 8 characters.`,
      }));
    }
    // confirm new password
    if (!userDetails.confirmNewPassword) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        confirmNewPasswordErr: `Confirm New Password can't be empty.`,
      }));
    } else if (userDetails.confirmNewPassword.length < 8) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        confirmNewPasswordErr: `Confirm New Password must be greater than 8 characters.`,
      }));
    }
    // match new password & confirm new password
    if (userDetails.confirmNewPassword !== userDetails.newPassword) {
      isError = true;
      setUserDetails((prev) => ({
        ...prev,
        confirmNewPasswordErr: `Confirm New Password does not match with New Password`,
      }));
    }

    return isError;
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const isError = validateForgotPassword();
    if (isError) {
      return;
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user/forgatepassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        role: "admin",
        contect_no: userDetails.otp_phone,
        new_password: userDetails.newPassword,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        alert("Your password has been reset successfully");
        setShowNewPasswordDiv(false);
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  return (
    <main id="content" role="main" className="main">
      <div
        className="position-fixed top-0 right-0 left-0 bg-img-hero"
        style={{
          height: "32rem",
          backgroundImage:
            "url(https://6.com/public/assets/admin/svg/components/abstract-bg-4.svg)",
        }}
      >
        <figure className="position-absolute right-0 bottom-0 left-0">
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1921 273"
          >
            <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
          </svg>
        </figure>
      </div>
      <div className="container py-5 py-sm-7">
        <label
          className="badge badge-soft-success float-right"
          style={{
            zIndex: 9,
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
          }}
        >
          Software version : 9.0
        </label>
        <a
          className="d-flex justify-content-center mb-5"
          href="javascript:"
          // style={{
          //   backgroundColor: "rgb(59, 113, 222)",
          // }}
        >
          <img
            className="z-index-2"
            src="/zambet_logo.png"
            alt="Logo"
            style={{ width: "8rem", backgroundColor: "rgb(59, 113, 222)" }}
          />
        </a>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg mb-5">
              <div className="card-body">
                <form id="form-id">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="uZbEP2qtrAjHtnhH8xgd64hqv57rKRb1IxErm17n"
                  />
                  <div className="text-center">
                    <div className="mb-5">
                      <h1 className="display-4">Sign in</h1>
                      {/* <br /> */}
                      {/* <span>(Admin or Employee Login)</span> */}
                    </div>
                  </div>
                  <div className="js-form-message form-group">
                    <label className="input-label" htmlFor="signInMobile">
                      Your Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg form-control-input"
                      name="mobile"
                      id="signInMobile"
                      style={{ textAlign: "left" }}
                      tabIndex={1}
                      placeholder="7623857496"
                      aria-label="7623857496"
                      required
                      data-msg="Please enter a valid mobile number."
                      onChange={handleInputChange}
                      value={userDetails.mobile}
                    />
                    {!!userDetails.mobileErr && (
                      <small style={{ color: "red" }}>
                        {userDetails.mobileErr}
                      </small>
                    )}
                  </div>
                  <div className="js-form-message form-group">
                    <label
                      className="input-label"
                      htmlFor="signupSrPassword"
                      tabIndex={0}
                    >
                      <span
                        className="d-flex justify-content-between align-items-center"
                        style={{ direction: "ltr" }}
                      >
                        Password
                        <Link
                          data-toggle="modal"
                          data-target="#forgot-password"
                          to=""
                          // to="/seller/auth/forgot-password"
                        >
                          Forgot password?
                        </Link>
                        <div
                          className="modal fade"
                          id="forgot-password"
                          tabIndex={-1}
                          style={{ display: "none" }}
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-body">
                                <form className="row">
                                  <div
                                    className="card mt-2 rest-part"
                                    style={{ width: "100%" }}
                                  >
                                    <div className="card-header">
                                      <h4>Forgot Password</h4>
                                    </div>
                                    <div className="card-body">
                                      <div className="form-group">
                                        <div className="row">
                                          {/*                         
                        <div
                          className="col-12 pt-4 sku_combination"
                          id="sku_combination"
                        >
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Variant
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Variant Price
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    SKU
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Quantity
                                  </label>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-s-a
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-s-a"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-s-a"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-s-a"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-s-a"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-s-a"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-s-b
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-s-b"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-s-b"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-s-b"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-s-b"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-s-b"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-l-a
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-l-a"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-l-a"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-l-a"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-l-a"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-l-a"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-l-b
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-l-b"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-l-b"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-l-b"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-l-b"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-l-b"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
 */}
                                        </div>
                                        {showOTPPhoneDiv && (
                                          <>
                                            <div className="row">
                                              <div className="col-6 p-2">
                                                <label className="control-label">
                                                  Enter Phone No.
                                                </label>
                                              </div>
                                              <div className="col-6 p-2">
                                                <input
                                                  type="number"
                                                  // min={0}
                                                  // defaultValue={4}
                                                  // step={1}
                                                  placeholder="Enter Phone No."
                                                  name="otp_phone"
                                                  className="form-control w-100"
                                                  onChange={handleInputChange}
                                                  value={userDetails.otp_phone}
                                                  disabled={disableOTPPhone}
                                                />
                                                {!!userDetails.otp_phoneErr && (
                                                  <small
                                                    style={{ color: "red" }}
                                                  >
                                                    {userDetails.otp_phoneErr}
                                                  </small>
                                                )}
                                                <button
                                                  className="mt-2 w-100 btn btn-primary"
                                                  // type="submit"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    requestOTP();
                                                    // window.alert("Success1");
                                                  }}
                                                >
                                                  Request OTP
                                                </button>
                                              </div>
                                            </div>
                                            {/* <div
                                              className="row"
                                              style={{
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <div className="col-6">
                                                <button
                                                  className="ml-1 btn btn-primary"
                                                  // type="submit"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    requestOTP();
                                                    // window.alert("Success1");
                                                  }}
                                                >
                                                  Request OTP
                                                </button>
                                              </div>
                                            </div> */}
                                          </>
                                        )}

                                        <div
                                          id="recaptcha-container"
                                          className="row pt-4"
                                        ></div>

                                        {showOTPDiv && (
                                          <>
                                            <div className="row pt-4">
                                              <div className="col-6 p-2">
                                                <label className="control-label">
                                                  Enter OTP
                                                </label>
                                              </div>
                                              <div className="col-6 p-2">
                                                <input
                                                  type="number"
                                                  // min={0}
                                                  // defaultValue={4}
                                                  // step={1}
                                                  placeholder="Enter OTP"
                                                  name="otp"
                                                  className="form-control w-100"
                                                  onChange={handleInputChange}
                                                  value={userDetails.otp}
                                                  disabled={disableOTP}
                                                />
                                                {!!userDetails.otpErr && (
                                                  <small
                                                    style={{ color: "red" }}
                                                  >
                                                    {userDetails.otpErr}
                                                  </small>
                                                )}
                                                <button
                                                  className="mt-2 w-100 btn btn-primary"
                                                  // type="submit"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    verifyOTP();
                                                    // window.alert("Success2");
                                                  }}
                                                >
                                                  Verify OTP
                                                </button>
                                              </div>
                                            </div>
                                            {/* <div
                                              className="row"
                                              style={{
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <div className="col-6">
                                                <button
                                                  className="ml-1 btn btn-primary"
                                                  // type="submit"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    verifyOTP();
                                                    // window.alert("Success2");
                                                  }}
                                                >
                                                  Verify OTP
                                                </button>
                                              </div>
                                            </div> */}
                                          </>
                                        )}

                                        {showNewPasswordDiv && (
                                          <>
                                            <div className="row pt-4">
                                              <div className="col-6 p-2">
                                                <label className="control-label">
                                                  New Password
                                                </label>
                                              </div>
                                              <div className="col-6 p-2">
                                                <input
                                                  type="text"
                                                  // min={0}
                                                  // defaultValue={4}
                                                  // step={1}
                                                  placeholder="Enter New Password"
                                                  name="newPassword"
                                                  className="form-control"
                                                  onChange={handleInputChange}
                                                  value={
                                                    userDetails.newPassword
                                                  }
                                                />
                                                {!!userDetails.newPasswordErr && (
                                                  <p>
                                                    <small
                                                      style={{ color: "red" }}
                                                    >
                                                      {
                                                        userDetails.newPasswordErr
                                                      }
                                                    </small>
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                            <div className="row pt-4">
                                              <div className="col-6 p-2">
                                                <label className="control-label">
                                                  Confirm Password
                                                </label>
                                              </div>
                                              <div className="col-6 p-2">
                                                <input
                                                  type="text"
                                                  // min={0}
                                                  // defaultValue={4}
                                                  // step={1}
                                                  placeholder="Enter Confirm Password"
                                                  name="confirmNewPassword"
                                                  className="form-control"
                                                  onChange={handleInputChange}
                                                  value={
                                                    userDetails.confirmNewPassword
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="row pt-4"
                                              style={{
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <div className="col-12">
                                                <button
                                                  className="ml-1 btn btn-primary w-100"
                                                  type="submit"
                                                  onClick={(e) => {
                                                    handleForgotPassword(e);
                                                  }}
                                                >
                                                  Submit
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <br />
                                    </div>
                                  </div>
                                  <div className="form-group col-sm-12 card card-footer">
                                    <button
                                      type="button"
                                      className="ml-1 btn btn-danger w-100"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      onClick={() => resetModalState()}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type={inputTypePassword}
                        //   type="password"
                        className="js-toggle-password form-control form-control-lg"
                        style={{ textAlign: "left" }}
                        name="password"
                        id="signupSrPassword"
                        placeholder="8+ characters required"
                        aria-label="8+ characters required"
                        required
                        data-msg="Your password is invalid. Please try again."
                        data-hs-toggle-password-options='{
                                               "target": "#changePassTarget",
                                      "defaultClass": "tio-hidden-outlined",
                                      "showClass": "tio-visible-outlined",
                                      "classChangeTarget": "#changePassIcon"
                                      }'
                        onChange={handleInputChange}
                        value={userDetails.password}
                      />
                      <div id="changePassTarget" className="input-group-append">
                        <a className="input-group-text" href="javascript:">
                          <i
                            id="changePassIcon"
                            className="tio-visible-outlined"
                            onClick={() => toggleEyeButton()}
                          />
                        </a>
                      </div>
                    </div>
                    {!!userDetails.passwordErr && (
                      <small style={{ color: "red" }}>
                        {userDetails.passwordErr}
                      </small>
                    )}
                  </div>
                  {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="termsCheckbox"
                        name="remember"
                      />
                      <label
                        className="custom-control-label text-muted"
                        htmlFor="termsCheckbox"
                      >
                        Remember me
                      </label>
                    </div>
                  </div> */}
                  {/* <div
                    id="recaptcha_element"
                    style={{ width: "100%" }}
                    data-type="image"
                  >
                    <div style={{ width: "304px", height: "78px" }}>
                      <div>
                        <iframe
                          title="reCAPTCHA"
                          src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LfMARoeAAAAAAITvA-le6X9IElSWX6CncicwEfY&co=aHR0cHM6Ly82dmFsbGV5LjZhbXRlY2guY29tOjQ0Mw..&hl=en&type=image&v=M-QqaF9xk6BpjLH22uHZRhXt&size=normal&cb=2v0bozfak26b"
                          width={304}
                          height={78}
                          role="presentation"
                          name="a-c3i6erfo6rk2"
                          frameBorder={0}
                          scrolling="no"
                          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                        />
                      </div>
                      <textarea
                        id="g-recaptcha-response"
                        name="g-recaptcha-response"
                        className="g-recaptcha-response"
                        style={{
                          width: "250px",
                          height: "40px",
                          border: "1px solid rgb(193, 193, 193)",
                          margin: "10px 25px",
                          padding: "0px",
                          resize: "none",
                          display: "none",
                        }}
                        defaultValue={""}
                      />
                    </div>
                    <iframe style={{ display: "none" }} />
                  </div> */}
                  {/* <br /> */}
                  <button
                    // type="submit"
                    onClick={handleSignIn}
                    className="btn btn-lg btn-block btn-primary"
                  >
                    Sign in
                  </button>
                </form>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-10">
                    <span>Mobile Number : 1234567890</span>
                    <br />
                    <span>OTP : 123456</span>
                    <br />
                    <span>Password : 123123123</span>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary"
                      onclick="copy_cred()"
                      onClick={() => handleCopyCredentials()}
                    >
                      <i className="tio-copy" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
