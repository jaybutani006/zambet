import { passwordStrength } from "check-password-strength";
import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { authentication } from "firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button, Modal } from "react-bootstrap";
import { signInWithFacebook, signInWithGoogle } from "config/firebase";
import { defaultAPIErrorHandler } from "api/api";
//

function CustomerRegistration() {
  const [modalState, setModalState] = useState({});
  const [providerName, setProviderName] = useState("");
  const [isOpenGoogleModal, setIsOpenGoogleModal] = useState(false);
  const [isOpenFacebookModal, setIsOpenFacebookModal] = useState(false);

  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const initialState = {
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    password: "",
    con_password: "",
    email: "",
  };
  const [mainState, setMainState] = useState(initialState);

  const [isDisabledSignUp, setIsDisabledSignUp] = useState(false);
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [hidePassword, setHidePassword] = useState(true);

  //firebase
  const [disableOTP, setDisableOTP] = useState(false);
  const [disableOTPPhone, setDisableOTPPhone] = useState(false);
  const [showOTPPhoneDiv, setShowOTPPhoneDiv] = useState(true);
  const [showOTPDiv, setShowOTPDiv] = useState(false);
  const [showNewPasswordDiv, setShowNewPasswordDiv] = useState(false);

  const resetModalState = () => {
    setDisableOTP(false);
    setDisableOTPPhone(false);
    setShowNewPasswordDiv(false);
    setShowOTPDiv(false);
    setShowOTPPhoneDiv(true);
  };

  const verifyOTP = (e) => {
    if (mainState.otp.toString().length === 6) {
      setDisableOTP(true);
      let confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(mainState.otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          setShowOTPDiv(false);
          setShowOTPPhoneDiv(false);
          // setShowNewPasswordDiv(true);
          !providerName 
          ? handleSignUp()
          : handleSignUpWithGooglePopUp(providerName);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    } else {
      alert("OTP Code must be of 6 digits");
    }
  };

  const generateRecaptcha = () => {
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
            console.log("prepared phone auth process",response);
            setShowOTPDiv(true);
            
          },
          'expired-callback': () => {
      
          }
        },
        authentication
        );
      }
  };

  const requestOTP = () => {
    if (`${mainState.otp_phone}`.length === 10) {
      setDisableOTPPhone(true);

      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(
        authentication,
        `+91${mainState.otp_phone}`,
        appVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent");
        })
        .catch((error) => {
          // Error sms not sent
          console.log(error);
          console.log("SMS not sent");
          window.recaptchaVerifier.recaptcha.reset();
          window.recaptchaVerifier.clear();
        });
    } else {
      alert("Phone Number must be of 10 digits");
    }
  };

  const resendOTP=()=>{
    signInWithPhoneNumber(`+91${mainState.otp_phone}`,window.recaptchaVerifier)
    .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    console.log(confirmationResult);
    window.confirmationResult  =  confirmationResult;
    console.log("OTP has been resent");
    }).catch((error) => {

    // Error; SMS not sent
    console.log(error);
    console.log("SMS not sent");
    });
}
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (value.toString().length > 10) {
        alert("phone number must be of 10 digits");
        return;
      }
      console.log(value);
      if (value == 0) {
        setMainState((prev) => ({
          ...prev,
          [name]: "",
          otp_phone:"",
          errors: {
            ...prev.errors,
            [name]: "",
            otp_phone:"",
          },
        }));
        return;
      }
      setMainState((prev) => ({
        ...prev,
        [name]: +value,
        'otp_phone': +value,
        errors: {
          ...prev.errors,
          [name]: "",
          'otp_phone': "",
        },
      }));
    } else if (name === "f_name" || name === "l_name") {
      if (e.target.value === "") {
        setMainState((previous) => ({
          ...previous,
          [name]: value,
          errors: {
            ...previous.errors,
            [name]: "",
          },
        }));
      } else {
        const validRegex = /^[A-Za-z]+$/;
        if (!validRegex.test(e.target.value)) {
          return;
        } else {
          setMainState((previous) => ({
            ...previous,
            [name]: value,
            errors: {
              ...previous.errors,
              [name]: "",
            },
          }));
          return;
        }
      }
    } else if (name === "password" || name === "con_password") {
      if (!value) {
        setMainState((prev) => ({
          ...prev,
          [name]: value,
          [`${name}passwordStrength`]: "",
        }));
      } else {
        setMainState((prev) => ({
          ...prev,
          [name]: value,
          [`${name}passwordStrength`]: passwordStrength(value).value,
        }));
      }
    } else {
      setMainState((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  const validateBeforeSignUp = () => {
    let errors = {};
    let formIsValid = true;
    const { f_name, l_name, password, con_password, email, phone } = mainState;

    if (!f_name) {
      formIsValid = false;
      errors["f_name"] = "Cannot be empty or invalid";
    } else if (f_name.length > 40) {
      formIsValid = false;
      errors["f_name"] = "Cannot be more than 40 characters";
    }
    if (!l_name) {
      formIsValid = false;
      errors["l_name"] = "Cannot be empty or invalid";
    } else if (l_name.length > 40) {
      formIsValid = false;
      errors["l_name"] = "Cannot be more than 40 characters";
    }
    if (!email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty or invalid";
    }
    if (!phone) {
      formIsValid = false;
      errors["phone"] = "Cannot be empty or invalid";
    } else if (typeof phone !== "number") {
      formIsValid = false;
      errors["phone"] = "Must be a number";
    } else if (phone.toString().length > 40) {
      formIsValid = false;
      errors["phone"] = "Cannot be more than 40 characters";
    }
    if (!password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty or invalid";
    } else if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "Cannot be less than 8 characters";
    }
    if (password !== con_password) {
      formIsValid = false;
      errors["con_password"] = "Does not match with Password";
    }
    if (!con_password) {
      formIsValid = false;
      errors["con_password"] = "Cannot be empty or invalid";
    } else if (con_password.length < 8) {
      formIsValid = false;
      errors["con_password"] = "Cannot be less than 8 characters";
    }

    setMainState((prev) => ({ ...prev, errors }));

    return formIsValid;
  };

  const handleSignUp = () => {
    console.log("handleSigup called");
    // e.preventDefault();
    const validated = validateBeforeSignUp();

    if (!validated) {
      // alert("Validation Failed");
      return;
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/user",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: mainState.email,
        password: mainState.password,
        phone: mainState.phone.toString(),
        f_name: mainState.f_name,
        l_name: mainState.l_name,
        social_id: "fb-testuser6",
        login_medium: "123",
      }),
    })
      .then(function (response) {
        console.log(response.data);
        alert("Registered Successfully: Please login to continue");
        setMainState(() => initialState);
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleSignUpWithGoogle = (providerName) => {
    setIsOpenGoogleModal(true);
    setProviderName(providerName);
  };
  // const handleOpenSignWithGoogleModal = () => {};
  const handleCloseSignWithGoogleModal = () => {
    setIsOpenGoogleModal(false);
    setProviderName("");
  };

  const handleSignUpWithGooglePopUp = async (providerName) => {
    let result;
    if (providerName === "google") {
      result = await signInWithGoogle();
    } else if (providerName === "facebook") {
      result = await signInWithFacebook();
    }
    console.log(99999999, result);

    if (!result) {
      return;
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/user",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        phone: mainState?.otp_phone,
        email: result?._tokenResponse?.email,
        idToken: result?._tokenResponse?.idToken,
        f_name: result?._tokenResponse?.displayName,
        // l_name: "",
        // password: "",
        operationType: result?.operationType,
        providerId: result?.providerId,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        alert("Registered Successfully: Please login to continue");
        // setMainState(() => initialState);
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-12"
            style={{
              width: "93%",
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div id="loading" style={{ display: "none" }}>
              <img
                width={200}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="container py-4 py-lg-5 my-4"
        style={{ textAlign: "left" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 box-shadow">
              <div className="card-body">
                <h2 className="h4 mb-1">No account</h2>
                <p className="font-size-sm text-muted mb-4">
                  Register control your order .
                </p>
                <form className="needs-validation_" id="sign-up-form">
                  {/* <input
                    type="hidden"
                    name="_token"
                    defaultValue="Vrk2Q73xmF98e0nHZ7pPXZ5W3AxkaYb5jmKvWwIH"
                  />{" "} */}
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-fn">First name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="f_name"
                          style={{ textAlign: "left" }}
                          value={mainState.f_name}
                          onChange={(e) => handleInputChange(e)}
                        />
                        {mainState?.errors?.f_name && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.f_name}
                          </small>
                        )}
                        <div className="invalid-feedback">
                          Please enter your first name!
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-ln">Last name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="l_name"
                          style={{ textAlign: "left" }}
                          value={mainState.l_name}
                          onChange={(e) => handleInputChange(e)}
                        />
                        {mainState?.errors?.l_name && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.l_name}
                          </small>
                        )}
                        <div className="invalid-feedback">
                          Please enter your last name!
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-email">Email address</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          style={{ textAlign: "left" }}
                          value={mainState.email}
                          onChange={(e) => handleInputChange(e)}
                        />
                        {mainState?.errors?.email && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.email}
                          </small>
                        )}
                        <div className="invalid-feedback">
                          Please enter valid email address!
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-phone">
                          Phone number
                          {/* <small className="text-primary">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          name="phone"
                          style={{ textAlign: "left" }}
                          value={mainState.phone}
                          onChange={(e) => handleInputChange(e)}
                        />
                        {mainState?.errors?.phone && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.phone}
                          </small>
                        )}
                        <div className="invalid-feedback">
                          Please enter your phone number!
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="si-password">Password</label>
                        <div className="password-toggle">
                          <input
                            className="form-control"
                            name="password"
                            type={inputTypePassword}
                            id="si-password"
                            style={{ textAlign: "left" }}
                            placeholder="Minimum 8 characters long"
                            value={mainState.password}
                            onChange={(e) => handleInputChange(e)}
                          />
                          <label className="password-toggle-btn">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              onClick={() => toggleEyeButton()}
                            />
                            <i className="czi-eye password-toggle-indicator" />
                            <span className="sr-only">Show Password </span>
                          </label>
                        </div>
                        <div>
                          <small
                            style={{
                              color:
                                mainState?.passwordpasswordStrength === "Strong"
                                  ? "green"
                                  : mainState?.passwordpasswordStrength ===
                                    "Medium"
                                  ? "yellow"
                                  : "red",
                            }}
                          >
                            {mainState?.passwordpasswordStrength}
                          </small>
                        </div>
                        {mainState?.errors?.password && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.password}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="si-password">Confirm password</label>
                        <div className="password-toggle">
                          <input
                            className="form-control"
                            name="con_password"
                            type={inputTypePassword}
                            style={{ textAlign: "left" }}
                            placeholder="Minimum 8 characters long"
                            id="si-password"
                            value={mainState.con_password}
                            onChange={(e) => handleInputChange(e)}
                          />
                          <label className="password-toggle-btn">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              style={{ textAlign: "left" }}
                              onClick={() => toggleEyeButton()}
                            />
                            <i className="czi-eye password-toggle-indicator" />
                            <span className="sr-only">Show Password </span>
                          </label>
                        </div>
                        {/* <div>
                          <small
                            style={{
                              color:
                                mainState?.con_passwordpasswordStrength ===
                                "Strong"
                                  ? "green"
                                  : mainState?.con_passwordpasswordStrength ===
                                    "Medium"
                                  ? "yellow"
                                  : "red",
                            }}
                          >
                            {mainState?.con_passwordpasswordStrength}
                          </small>
                        </div> */}
                        {mainState?.errors?.con_password && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.con_password}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between">
                    <div className="form-group mb-1">
                      <strong>
                        <input
                          type="checkbox"
                          className="mr-1"
                          name="remember"
                          id="inputCheckd"
                          checked={!isDisabledSignUp}
                          onChange={(e) =>
                            setIsDisabledSignUp(!e.target.checked)
                          }
                        />
                      </strong>
                      <label className htmlFor="remember">
                        {`I have read and agreed to the `}
                        <Link
                          className="font-size-sm"
                          target="_blank"
                          to="/terms"
                        >
                          {`terms and conditions.`}
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div
                    className="flex-between row"
                    style={{ direction: "ltr" }}
                  >
                    <div className="mx-1">
                      <div className="text-right">
                        <Link
                          to=""
                          className={
                            isDisabledSignUp
                              ? "btn btn-dark"
                              : "btn btn-primary"
                          }
                          id="sign-up"
                          // data-toggle="modal"
                          // data-target="#verify-otp"
                          onClick={(e) => {
                            handleSignUpWithGoogle("")
                            // if (isDisabledSignUp) {
                            //   e.stopPropagation();
                            // } else {
                            //   if (!validateBeforeSignUp()) {
                            //     // alert("Validation Failed");
                            //     e.stopPropagation();
                            //   }
                            // }
                          }}
                          // type="submit"
                          // disabled
                        >
                          <i className="czi-user mr-2 ml-n1" />
                          Sign up
                        </Link>
                        <div
                          className="modal fade"
                          id="verify-otp"
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
                                      <h4>Verify Phone Number</h4>
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
                                                  disabled={disableOTPPhone}
                                                  placeholder="Enter Phone No."
                                                  name="otp_phone"
                                                  className="form-control"
                                                  onChange={handleInputChange}
                                                  value={mainState.otp_phone}
                                                />
                                              </div>
                                            </div>
                                            <div
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
                                                    // window.alert("Success");
                                                  }}
                                                >
                                                  Request OTP
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        )}

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
                                                  className="form-control"
                                                  onChange={handleInputChange}
                                                  value={mainState.otp}
                                                />
                                              </div>
                                            </div>
                                            <div
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
                                                    // window.alert("Success");
                                                  }}
                                                >
                                                  Verify OTP
                                                </button>
                                              </div>
                                            </div>
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
                                                  value={mainState.newPassword}
                                                />
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
                                                    mainState.confirmNewPassword
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
                                                  // type="submit"
                                                  onClick={(e) => {
                                                    window.alert(
                                                      "handleForgotPass"
                                                    );
                                                    // handleForgotPassword(e);
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
                                      className="ml-1 btn btn-danger"
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
                      </div>
                    </div>
                    <div className="mx-1">
                      <Link
                        className="btn btn-outline-primary"
                        to="/customer/auth/login"
                      >
                        <i className="fa fa-sign-in" /> Sign in
                      </Link>
                    </div>
                    <div className="col-12 mt-3">
                      <div className="row">
                        <div className="col-sm-6 text-center mt-1">
                          <a
                            className="btn btn-outline-primary"
                            // href="/customer/auth/login/google"
                            href="javascript:"
                            style={{ width: "100%" }}
                            onClick={() => {
                              handleSignUpWithGoogle("google");
                              setMainState(prev=>({ 
                                ...prev,
                                phone:prev.otp_phone
                              }))
                            }}
                          >
                            <i className="czi-google mr-2 ml-n1" />
                            Sign up with google
                          </a>
                        </div>
                        <div className="col-sm-6 text-center mt-1">
                          <a
                            className="btn btn-outline-primary"
                            // href="/customer/auth/login/facebook"
                            href="javascript:"
                            style={{ width: "100%" }}
                            onClick={() => {
                              handleSignUpWithGoogle("facebook");
                              setMainState(prev=>({ 
                                ...prev,
                                phone:prev.otp_phone
                              }))
                            }}
                          >
                            <i className="czi-facebook mr-2 ml-n1" />
                            Sign up with facebook
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isOpenGoogleModal}
        size="lg"
        onHide={() => {
          handleCloseSignWithGoogleModal();
        }}
        centered
      >
        <Modal.Header>
          <Modal.Title>Verify Phone Number</Modal.Title>
          <Button
            onClick={() => {
              handleCloseSignWithGoogleModal();
            }}
            variant="outline-dark"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="form-group">
              <div className="row"></div>
              {showOTPPhoneDiv && (
                <>
                  <div className="row">
                    <div className="col-6 p-2">
                      <label className="control-label">Enter Phone No.</label>
                    </div>
                    <div className="col-6 p-2">
                      <input
                        type="number"
                        // min={0}
                        // defaultValue={4}
                        // step={1}
                        placeholder="Enter Phone No."
                        name="otp_phone"
                        className="form-control"
                        onChange={handleInputChange}
                        value={mainState.otp_phone}
                      />
                    </div>
                  </div>
                  <div
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
                          // window.alert("Success");
                        }}
                      >
                        Request OTP
                      </button>
                    </div>
                  </div>
                </>
              )}

              {showOTPDiv && (
                <>
                  <div className="row pt-4">
                    <div className="col-6 p-2">
                      <label className="control-label">Enter OTP</label>
                    </div>
                    <div className="col-6 p-2">
                      <input
                        type="number"
                        // min={0}
                        // defaultValue={4}
                        // step={1}
                        placeholder="Enter OTP"
                        name="otp"
                        className="form-control"
                        onChange={handleInputChange}
                        value={mainState.otp}
                      />
                    </div>
                  </div>
                  <div
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
                          // window.alert("Success");
                        }}
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="form-group col-sm-12 card card-footer">
              <button
                type="button"
                className="ml-1 btn btn-danger"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => resetModalState()}
              >
                Close
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div id="recaptcha-container" className="row pt-4"></div>
      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default CustomerRegistration;
