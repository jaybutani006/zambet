import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { authentication } from "firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, signInWithFacebook, signInWithGoogle } from "config/firebase";
import { defaultAPIErrorHandler } from "api/api";
//

function CustomerLogin() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [mainState, setMainState] = useState({});

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
          setShowNewPasswordDiv(true);
          setShowOTPDiv(false);
          setShowOTPPhoneDiv(false);
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

  const requestOTP = () => {
    if (mainState.otp_phone.toString().length === 10) {
      setDisableOTPPhone(true);
      setShowOTPDiv(true);

      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(
        authentication,
        `+91${mainState.otp_phone}`,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "phone" && e.target.value.toString().length > 10) {
      alert("phone No. must be of 10 digits");
      return;
    } else if (name === "phone") {
      // const validNumberRegex = /^\d*$/;
      const validNumberRegex = /^[0-9]{0,10}$/;
      console.log(3, validNumberRegex.test(value));

      if (!!validNumberRegex.test(value)) {
        setMainState((prev) => ({
          ...prev,
          [name]: value,
        }));
        return;
      }
    } else {
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateBeforeSignIn = () => {
    let errors = {};
    let formIsValid = true;
    const { password, phone } = mainState;

    if (!phone) {
      formIsValid = false;
      errors["phone"] = "Cannot be empty or invalid";
      // } else if (typeof phone !== "number") {
      //   formIsValid = false;
      //   errors["phone"] = "Must be a number";
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

    setMainState((prev) => ({ ...prev, errors }));

    return formIsValid;
  };

  const handleSignIn = async (email, idToken, operationType, providerId) => {
    let data = {};

    if (!email && !idToken) {
      // REGULAR SIGN IN
      const { phone, password } = mainState;
      const validated = validateBeforeSignIn();

      if (!validated) {
        alert("Validation Failed");
        return;
      }

      data.mobile = phone;
      data.password = password;
    } else {
      // GOOGLE or FB SIGN IN
      data.email = email;
      data.idToken = idToken;
      data.operationType = operationType;
      data.providerId = providerId;

      await auth.currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          // Send token to your backend via HTTPS
          console.log(444, idToken);
          // ...
        })
        .catch(function (error) {
          // Handle error
        });
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/user/loginAll",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        ...data,
        role: "customer",
      }),
    })
      .then(function (response) {
        dispatch({
          type: "USER_LOGIN",
          userToken: response.data.data.token,
        });
        navigate("/", { replace: true });
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
        // console.log(error);
        // alert(error.response.data.message);
        // toast.error(error?.response?.data?.message || "Something went wrong!");
        // toast.error(error?.response?.data?.message || "Something went wrong!", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!mainState.otp_phone) {
      alert("otp_phone is invalid");
      return;
    } else if (!mainState.newPassword) {
      alert("newPassword is invalid");
      return;
    } else if (!mainState.confirmNewPassword) {
      alert("confirmNewPassword is invalid");
      return;
    } else if (mainState.newPassword !== mainState.confirmNewPassword) {
      alert("newPassword and confirmNewPassword does not match");
      return;
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user/forgatepassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        role: "customer",
        contect_no: mainState.otp_phone,
        new_password: mainState.newPassword,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        alert("Your password has been reset successfully");
        setShowNewPasswordDiv(false);
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
        // console.log(error);
        // alert("Something went wrong");
      });
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (!result) {
      console.log("!result");
    } else {
      handleSignIn(
        result._tokenResponse.email,
        result._tokenResponse.idToken,
        result.operationType,
        result.providerId
      );
    }
  };
  const handleFacebookSignIn = async () => {
    const result = await signInWithFacebook();
    if (!result) {
      console.log("!result");
    } else {
      handleSignIn(
        result._tokenResponse.email,
        result._tokenResponse.idToken,
        result.operationType,
        result.providerId
      );
    }
  };

  return (
    <>
      <div
        className="modal-quick-view modal fade "
        id="quick-view"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content" id="quick-view-modal"></div>
        </div>
      </div>

      <script
        type="text/javascript"
        async=""
        src="https://www.gstatic.com/recaptcha/releases/Y-cOIEkAqcfDdup_qnnmkxIC/recaptcha__en.js"
        crossorigin="anonymous"
        integrity="sha384-4lxttbm4ASVXW4ZX4IKy2kenct7iqJL/fFpl49ygcTzLZBXCYHmdpYFK+0hPn7bS"
      ></script>

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
                <div className="text-center mb-5">
                  <h2 className="h4 mb-1">Sign in</h2>
                </div>
                <hr className="mt-2" />
                <form
                  className="needs-validation mt-2"
                  autoComplete="off"
                  id="form-id"
                >
                  {/* <input
                    type="hidden"
                    name="_token"
                    defaultValue="QJSogEJtM1ZAMTFKgWK37wcpZkCVnwOGdYoBNcOS"
                  />{" "} */}
                  <div className="form-group">
                    <label htmlFor="si-email"> Phone</label>
                    <input
                      className="form-control"
                      type="tel"
                      name="phone"
                      // id="si-email"
                      style={{ textAlign: "left" }}
                      // defaultValue
                      placeholder=""
                      // required
                      value={mainState.phone}
                      onChange={handleInputChange}
                    />
                    <div className="invalid-feedback">
                      Please provide valid phone number .
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="si-password">Password</label>
                    <div className="password-toggle">
                      <input
                        className="form-control"
                        name="password"
                        type={inputTypePassword}
                        id="si-password"
                        style={{ textAlign: "left" }}
                        // required
                        value={mainState.password}
                        onChange={handleInputChange}
                      />
                      <label className="password-toggle-btn">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                        />
                        <i
                          className="czi-eye password-toggle-indicator"
                          onClick={() => toggleEyeButton()}
                        />
                        <span className="sr-only">Show Password </span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between">
                    {/* <div className="form-group">
                      <input
                        type="checkbox"
                        className="mr-1"
                        name="remember"
                        id="remember"
                      />
                      <label className htmlFor="remember">
                        Remember me
                      </label>
                    </div> */}

                    <Link
                      className="font-size-sm"
                      data-toggle="modal"
                      data-target="#forgot-password"
                      to=""
                      // to="/customer/auth/recover-password"
                      //   to="/seller/auth/forgot-password"
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
                  {/* <div
                    id="recaptcha_element"
                    style={{ width: "100%" }}
                    data-type="image"
                  >
                    <div style={{ width: "304px", height: "78px" }}>
                      <div>
                        <iframe
                          title="reCAPTCHA"
                          src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LdRxZMeAAAAAE9PRJOgJqCGDy9O2o-abXmZvtpw&co=aHR0cHM6Ly82dmFsbGV5LjZhbXRlY2guY29tOjQ0Mw..&hl=en&type=image&v=Y-cOIEkAqcfDdup_qnnmkxIC&size=normal&cb=i6we5jgfxuqq"
                          width={304}
                          height={78}
                          role="presentation"
                          name="a-xdqjp3vt026b"
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
                  <br />
                  <button
                    className="btn btn-primary btn-block btn-shadow"
                    // type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignIn();
                    }}
                  >
                    Sign in
                  </button>
                </form>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div
                    className="col-12 flex-between row p-0"
                    style={{ direction: "ltr" }}
                  >
                    <div className="mb-3 ml-2">
                      <h6>No account? Sign up now</h6>
                    </div>
                    <div className="mb-3 ">
                      <Link
                        className="btn btn-outline-primary"
                        to="/customer/auth/register"
                      >
                        <i className="fa fa-user-circle" /> Sign up
                      </Link>
                    </div>
                  </div>
                  <div className="col-sm-6 text-center mb-1">
                    <a
                      className="btn btn-outline-primary"
                      // href="/customer/auth/login/google"
                      href="javascript:"
                      style={{ width: "100%" }}
                      onClick={handleGoogleSignIn}
                    >
                      <i className="czi-google mr-2 ml-n1" />
                      Sign in with google
                    </a>
                  </div>
                  <div className="col-sm-6 text-center mb-1">
                    <a
                      className="btn btn-outline-primary"
                      // href="/customer/auth/login/facebook"
                      href="javascript:"
                      style={{ width: "100%" }}
                      onClick={handleFacebookSignIn}
                    >
                      <i className="czi-facebook mr-2 ml-n1" />
                      Sign in with facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default CustomerLogin;
