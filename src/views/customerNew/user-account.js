import { passwordStrength } from "check-password-strength";
import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyProfileThumbnail from "assets/dummyProfileThumbnail.png";
import { defaultAPIErrorHandler } from "api/api";

function UserAccounts() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [mainState, setMainState] = useState({ updatePassword: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (value.toString().length > 10) {
        // alert("phone number must be of 10 digits");
        return;
      }
      setMainState((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    } else if (name === "image") {
      if (e.target.files.length === 1) {
        setMainState((prev) => ({
          ...prev,
          imageFile: e.target.files[0],
        }));
        return;
      } else {
        alert("Please select only 1 file for upload");
        return;
      }
    } else if (name === "newPassword" || name === "confirmPassword") {
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

  const validateBeforeUpdateProfile = () => {
    let errors = {};
    let formIsValid = true;
    const { f_name, l_name, email, phone } = mainState;

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
      // } else if (typeof phone !== "number") {
      //   formIsValid = false;
      //   errors["phone"] = "Must be a number";
    } else if (phone.toString().length > 10) {
      formIsValid = false;
      errors["phone"] = "Cannot be more than 10 characters";
    }

    setMainState((prev) => ({ ...prev, errors }));

    return formIsValid;
  };

  const validateBeforeChangePasswordAPI = () => {
    // validation
    let errors = {};
    let formIsValid = true;
    const { oldPassword, newPassword, confirmPassword } = mainState;

    if (!oldPassword) {
      formIsValid = false;
      errors["oldPassword"] = "Cannot be empty or invalid";
    } else if (oldPassword.length < 8) {
      formIsValid = false;
      errors["oldPassword"] = "Cannot be less than 8 characters";
    }
    if (!newPassword) {
      formIsValid = false;
      errors["newPassword"] = "Cannot be empty or invalid";
    } else if (newPassword.length < 8) {
      formIsValid = false;
      errors["newPassword"] = "Cannot be less than 8 characters";
    }
    if (!confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Cannot be empty or invalid";
    } else if (confirmPassword.length < 8) {
      formIsValid = false;
      errors["confirmPassword"] = "Cannot be less than 8 characters";
    }
    if (newPassword !== confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Does not match with newPassword";
    }
    setMainState((prev) => ({ ...prev, errors }));

    return formIsValid;
  };

  const handleChangePasswordAPI = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword } = mainState;
    const validated = validateBeforeChangePasswordAPI();

    if (!validated) {
      // alert("Validation Failed");
      return;
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user/changepassword",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.userToken,
      },
      data: JSON.stringify({
        password: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        // console.log(response.data);
        alert("Password Changed Successfully");
        navigate("/customer/auth/logout");
      })
      .catch((error) => {
        // console.log(error);
        // alert("Password Change Failed");
        defaultAPIErrorHandler(error)
      });
  };

  const handleUpdateProfileInfoAPI = (e) => {
    e.preventDefault();
    const { f_name, l_name, email, phone, imageFile } = mainState;
    const validated = validateBeforeUpdateProfile();

    if (!validated) {
      // alert("Validation Failed");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", f_name);
    formData.append("last_name", l_name);
    formData.append("email_address", email);
    formData.append("contect_no", phone);
    if (imageFile) {
      formData.append("photo", imageFile);
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user",
      headers: {
        Authorization: state.userToken,
      },
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        alert("Profile Updated Successfully!");
        // dispatch({
        //   type: "USER_LOGIN",
        //   userToken: response.data.data.token,
        // });
        // navigate("/");
        getUserProfile();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
        // alert("Profile Update Failed!");
      });
  };

  const getUserProfile = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/user",
      headers: {
        Authorization: state.userToken,
      },
    })
      .then((response) => {
        console.log(JSON.stringify(response.data.data[0]));
        const res = response.data.data[0];
        const resObj = {
          firstName: res.User_Details.first_name,
          lastName: res.User_Details.last_name,
          f_name: res.User_Details.first_name,
          l_name: res.User_Details.last_name,
          phone: res.contect_no,
          email: res.email_address,
          photo: res.User_Details.user_photo,
        };
        setMainState((prev) => ({
          ...prev,
          firstName: res.User_Details.first_name,
          lastName: res.User_Details.last_name,
          f_name: res.User_Details.first_name,
          l_name: res.User_Details.last_name,
          phone: res.contect_no,
          email: res.email_address,
          photo: res.User_Details.user_photo,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    // setMainState((prev) => ({
    //   ...prev,
    //   phone: state.userProfile.contect_no,
    //   email: state.userProfile.email_address,
    //   f_name: state.userProfile.first_name,
    //   l_name: state.userProfile.last_name,
    //   photo: state.userProfile.user_photo,
    // }));

    if (!state.isUserLoggedIn) {
      navigate("/customer/auth/login", { replace: true });
      return;
    }
    getUserProfile();
  }, []);

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
              <img width={200} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container rtl" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-9 sidebar_heading">
            <h1 className="h3  mb-0 float-left headerTitle">Profile Info</h1>
          </div>
        </div>
      </div> */}

      <div
        className="container pb-5 mb-2 mb-md-4 mt-3 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n        font-family: 'Titillium Web', sans-serif\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    label {\n        font-size: 16px;\n    }\n\n    .divider-role {\n        border-bottom: 1px solid whitesmoke;\n    }\n\n    .sidebarL h3:hover + .divider-role {\n        border-bottom: 3px solid #f7931e    !important;\n        transition: .2s ease-in-out;\n    }\n\n    .price_sidebar {\n        padding: 20px;\n    }\n\n    @media (max-width: 600px) {\n\n        .sidebar_heading h1 {\n            text-align: center;\n            color: aliceblue;\n            padding-bottom: 17px;\n            font-size: 19px;\n        }\n\n        .sidebarR {\n            padding: 24px;\n        }\n\n        .price_sidebar {\n            padding: 20px;\n        }\n    }\n\n",
            }}
          />
          <div className="sidebarR col-lg-3 col-md-3">
            <div
              className="price_sidebar rounded-lg box-shadow-sm"
              id="shop-sidebar"
              style={{ marginBottom: "-10px", background: "white" }}
            >
              <div className="box-shadow-sm"></div>
              <div className="pb-0" style={{ paddingTop: "12px" }}>
                <div className="sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className to="/account-oder">
                      My order
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="sidebarL">
                <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                  <Link to="/account-service">My Services</Link>
                </h3>
                <div
                  className="divider-role"
                  style={{
                    border: "1px solid whitesmoke",
                    marginBottom: "14px",
                    marginTop: "-6px",
                  }}
                ></div>
              </div>
              <div className="pb-0">
                <div className="sidebarL">
                  <h3
                    className="widget-title btnF "
                    style={{ fontWeight: 700 }}
                  >
                    <Link className to="/wishlists">
                      Wish List
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className="active-menu" to="/user-account">
                      Profile Info
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className to="/account-address">
                      Address{" "}
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* <section className="col-lg-9 col-md-9">
            <div className="card box-shadow-sm">
              <div className="card-header">
                <form
                  className="mt-3"
                >
                  <div className="row photoHeader">
                    <img
                      id="blah"
                      style={{
                        borderRadius: "50px",
                        marginLeft: "30px",
                        width: "50px",
                        height: "50px",
                      }}
                      className="rounded-circle border"
                      src={mainState.photo}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyProfileThumbnail;
                      }}
                    />
                    <div className="col-md-10">
                      <h5 className="font-name">
                        {`${mainState.firstName} ${mainState.lastName}` ||
                          "..."}
                      </h5>
                      <label
                        htmlFor="files"
                        style={{ cursor: "pointer", color: "#1b7fed" }}
                        className="spandHeadO"
                      >
                        Change your profile photo
                      </label>
                      <span style={{ color: "red", fontSize: "10px" }}>
                        ( * Image ratio should be 1:1 )
                      </span>
                      <input
                        id="files"
                        name="image"
                        style={{ visibility: "hidden" }}
                        type="file"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="card-body ml-3">
                      <h3 className="font-nameA">Account information </h3>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="firstName">First name </label>
                          <input
                            type="text"
                            className="form-control"
                            id="f_name"
                            name="f_name"
                            // defaultValue={mainState.first_name || "Ashok"}
                            // required
                            value={mainState.f_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="lastName"> Last name </label>
                          <input
                            type="text"
                            className="form-control"
                            id="l_name"
                            name="l_name"
                            // defaultValue={
                            //   state?.userProfile?.last_name || "Sindhav"
                            // }
                            value={mainState.l_name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">Email </label>
                          <input
                            type="email"
                            className="form-control"
                            id="account-email"
                            name="email"
                            // defaultValue="sindhav88@gmail.com"
                            // defaultValue={
                            //   state?.userProfile?.email_address ||
                            //   "sindhav88@gmail.com"
                            // }
                            // disabled
                            value={mainState.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="phone">Phone name </label>
                          <small className="text-primary">
                            ( * Country code is must Like for BD 880 )
                          </small>
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            name="phone"
                            // defaultValue
                            // defaultValue={state?.userProfile?.contect_no || ""}
                            // required
                            value={mainState.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="si-password">Old password</label>
                          <div className="password-toggle">
                            <input
                              className="form-control"
                              name="password"
                              type="password"
                              id="password"
                              value={mainState.password}
                              onChange={handleInputChange}
                            />
                            <label className="password-toggle-btn">
                              <input
                                className="custom-control-input"
                                type="checkbox"
                                style={{ display: "none" }}
                              />
                              <i
                                className="czi-eye password-toggle-indicator"
                                onchange="checkPasswordMatch()"
                              />
                              <span className="sr-only">Show Password </span>
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="newPass">New password </label>
                          <div className="password-toggle">
                            <input
                              className="form-control"
                              name="con_password"
                              type="password"
                              id="confirm_password"
                              value={mainState.con_password}
                              onChange={handleInputChange}
                            />
                            <div>
                              <label className="password-toggle-btn">
                                <input
                                  className="custom-control-input"
                                  type="checkbox"
                                  style={{ display: "none" }}
                                />
                                <i
                                  className="czi-eye password-toggle-indicator"
                                  onchange="checkPasswordMatch()"
                                />
                                <span className="sr-only">Show Password </span>
                              </label>
                            </div>
                          </div>
                          <div id="message" />
                        </div>
                      </div>
                      <button
                        // type="submit"
                        onClick={handleUpdateProfile}
                        className="btn btn-primary float-right"
                      >
                        Update Informations{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section> */}
          <div className="col-lg-9">
            <form id="seller-profile-form">
              <div className="card mb-3 mb-lg-5" id="generalDiv">
                <div className="profile-cover">
                  <div className="profile-cover-img-wrapper" />
                </div>
                <label
                  className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar"
                  htmlFor="avatarUploader"
                >
                  <img
                    id="viewer"
                    src={mainState?.photo || dummyProfileThumbnail}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = dummyProfileThumbnail;
                    }}
                    className="avatar-img"
                    alt=""
                  />
                </label>
              </div>
              <div className="card mb-3 mb-lg-5">
                <div className="card-header">
                  <h2 className="card-title h4">Basic Information</h2>
                </div>
                <div className="card-body">
                  <div className="row form-group">
                    <label
                      htmlFor="firstNameLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Full Name
                      <i
                        className="tio-help-outlined text-body ml-1"
                        data-toggle="tooltip"
                        data-placement="top"
                        title
                        data-original-title="Display name"
                      />
                    </label>
                    <div className="col-sm-9 row">
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="col-form-label input-label"
                        >
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="f_name"
                          className="form-control"
                          id="name"
                          value={mainState.f_name}
                          onChange={handleInputChange}
                        />
                        {mainState?.errors?.f_name && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.f_name}
                          </small>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="col-form-label input-label"
                        >
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="l_name"
                          className="form-control"
                          id="name"
                          value={mainState.l_name}
                          onChange={handleInputChange}
                        />
                        {mainState?.errors?.l_name && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.l_name}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="phoneLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Phone{" "}
                      {/* <span className="input-label-secondary">(Optional)</span> */}
                    </label>
                    <div className="col-sm-9">
                      {/* <small className="text-danger">
                        ( * Country code is must Like for BD 880 )
                      </small> */}
                      <input
                        type="number"
                        className="js-masked-input form-control"
                        name="phone"
                        id="phoneLabel"
                        placeholder="7622336699"
                        // defaultValue={01632381820}
                        // data-hs-mask-options='{
                        //              "template": "+(880)00-000-00000"
                        //            }'
                        value={mainState.phone}
                        onChange={handleInputChange}
                      />
                      {mainState?.errors?.phone && (
                        <small style={{ color: "red" }}>
                          {mainState?.errors?.phone}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="newEmailLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="newEmailLabel"
                        defaultValue="test.seller@gmail.com"
                        placeholder="Enter new email address"
                        aria-label="Enter new email address"
                        value={mainState.email}
                        onChange={handleInputChange}
                      />
                      {mainState?.errors?.email && (
                        <small style={{ color: "red" }}>
                          {mainState?.errors?.email}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 col-form-label"></div>
                    <div className="form-group col-md-9" id="select-img">
                      <div className="custom-file">
                        <input
                          type="file"
                          name="image"
                          id="customFileUpload"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                          onChange={handleInputChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUpload"
                        >
                          Upload Profile Picture
                        </label>
                        {mainState?.errors?.image && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.image}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      onclick="call_demo()"
                      className="btn btn-primary"
                      onClick={(e) => handleUpdateProfileInfoAPI(e)}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div id="passwordDiv" className="card mb-3 mb-lg-5">
              <div className="card-header">
                <h4 className="card-title">Change Your Password</h4>
              </div>
              <div className="card-body">
                <form id="changePasswordForm">
                  <div className="row form-group">
                    <label
                      htmlFor="newPassword"
                      className="col-sm-3 col-form-label input-label"
                    >
                      {" "}
                      Old Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="js-pwstrength form-control"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter new password"
                        aria-label="Enter new password"
                        value={mainState.oldPassword}
                        onChange={handleInputChange}
                      />
                      {mainState?.errors?.oldPassword && (
                        <small style={{ color: "red" }}>
                          {mainState?.errors?.oldPassword}
                        </small>
                      )}
                      <p
                        id="passwordStrengthVerdict"
                        className="form-text mb-2"
                      />
                      <div id="passwordStrengthProgress" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="confirmNewPasswordLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      {" "}
                      New Password{" "}
                    </label>
                    <div className="col-sm-9">
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          id="confirmNewPasswordLabel"
                          placeholder="Confirm your new password"
                          aria-label="Confirm your new password"
                          value={mainState.newPassword}
                          onChange={handleInputChange}
                        />
                        <div>
                          <small
                            style={{
                              color:
                                mainState?.newPasswordpasswordStrength ===
                                "Strong"
                                  ? "green"
                                  : mainState?.newPasswordpasswordStrength ===
                                    "Medium"
                                  ? "yellow"
                                  : "red",
                            }}
                          >
                            {mainState?.newPasswordpasswordStrength}
                          </small>
                        </div>
                        {mainState?.errors?.newPassword && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.newPassword}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="confirmNewPasswordLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      {" "}
                      Confirm Password{" "}
                    </label>
                    <div className="col-sm-9">
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          id="confirmNewPasswordLabel"
                          placeholder="Confirm your new password"
                          aria-label="Confirm your new password"
                          value={mainState.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {/* <div>
                          <small
                            style={{
                              color:
                                mainState?.confirmPasswordpasswordStrength ===
                                "Strong"
                                  ? "green"
                                  : mainState?.confirmPasswordpasswordStrength ===
                                    "Medium"
                                  ? "yellow"
                                  : "red",
                            }}
                          >
                            {mainState?.confirmPasswordpasswordStrength}
                          </small>
                        </div> */}
                        {mainState?.errors?.confirmPassword && (
                          <small style={{ color: "red" }}>
                            {mainState?.errors?.confirmPassword}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      // onclick="call_demo()"
                      className="btn btn-primary"
                      onClick={(e) => handleChangePasswordAPI(e)}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="stickyBlockEndPoint" />
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

export default UserAccounts;
