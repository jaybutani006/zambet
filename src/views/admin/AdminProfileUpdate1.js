import React, { useContext, useEffect, useState } from "react";
//
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "context/newContext";
import productImage from "assets/productImage.jpg";
import { defaultAPIErrorHandler } from "api/api";
//

function AdminProfileUpdate1() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const initialState = {
    full_name: "",
    contect_No: "",
    email_Address: "",
    photo: "",
    password: "",
    confirm_password: "",
    // extra field for frontend
    photo_url: "",
  };
  const [userProfileDetails, setUserProfileDetails] = useState(initialState);
  const [resUserProfileDetails, setResUserProfileDetails] =
    useState(initialState);

  const getUserProfile = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/admin",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then((response) => {
        console.log(response.data.data[0]);
        const res = response.data.data[0];
        const resObj = {
          full_name: res.AdminDetails[0].full_name,
          phone: res.AdminDetails[0].contect_no,
          email_address: res.AdminDetails[0].email_address,
          city: res.AdminDetails[0].city,
        };
        setUserProfileDetails((prev) => ({ ...prev, ...resObj }));
        setResUserProfileDetails((prev) => ({ ...prev, ...resObj }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (name === "vendor_photo") {
      setResUserProfileDetails((previous) => {
        return {
          ...previous,
          [name]: e.target.files[0],
        };
      });
    } else {
      setResUserProfileDetails((previous) => {
        return {
          ...previous,
          [name]: e.target.value,
        };
      });
    }
  };

  const handleChangePassword = () => {
    if (!resUserProfileDetails.password)
      return alert(`Password can't be empty.`);
    else if (resUserProfileDetails.password.length < 8)
      return alert(`Password length must be greater than 8 characters`);

    if (!resUserProfileDetails.confirm_password)
      return alert(`Confirm Password can't be empty.`);
    else if (resUserProfileDetails.confirm_password.length < 8)
      return alert(`Confirm Password length must be greater than 8 characters`);

    if (
      resUserProfileDetails.password === resUserProfileDetails.confirm_password
    )
      return alert("Old Password and New Password can't be the same.");

    if (
      resUserProfileDetails.password !== resUserProfileDetails.confirm_password
    ) {
      // api / user / changepassword;
      // return alert(`TEMP : SUCCESS CHANGE PASS`);

      const data = JSON.stringify({
        password: resUserProfileDetails.password,
        newPassword: resUserProfileDetails.confirm_password,
      });

      const config = {
        method: "put",
        url: process.env.REACT_APP_BASEURL + "/api/user/changepassword",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.adminToken,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          alert(response.data.message);
          navigate("/admin/auth/logout", { replace: "true" });
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    }
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();

    // for (const key in resUserProfileDetails) {
    //   if (Object.hasOwnProperty.call(resUserProfileDetails, key)) {
    //     if (resUserProfileDetails[key] !== userProfileDetails[key]) {
    //       formData.append(key, resUserProfileDetails[key]);
    //     }
    //   }
    // }

    Object.entries(resUserProfileDetails).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      if (
        key === "password" ||
        key === "confirm_password" ||
        key === "imageURL"
      )
        return console.log("*");

      if (resUserProfileDetails[key] !== userProfileDetails[key]) {
        formData.append(key, resUserProfileDetails[key]);
      }
    });

    for (let p of formData) {
      let name = p[0];
      let value = p[1];

      console.log(name, value);
    }

    const config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/admin/updateprofile",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        full_name: resUserProfileDetails.full_name,
        contect_no: resUserProfileDetails.phone,
        email_address: resUserProfileDetails.email_address,
      }),
    };

    console.log(config);
    // return;

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        getUserProfile();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">Settings</h1>
            </div>
            <div className="col-sm-auto">
              <a className="btn btn-primary" href="/admin">
                <i className="tio-home mr-1" /> Dashboard
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="navbar-vertical navbar-expand-lg mb-3 mb-lg-5">
              <button
                type="button"
                className="navbar-toggler btn btn-block btn-white mb-3"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navbarVerticalNavMenu"
                data-toggle="collapse"
                data-target="#navbarVerticalNavMenu"
              >
                <span className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">Nav menu</span>
                  <span className="navbar-toggle-default">
                    <i className="tio-menu-hamburger" />
                  </span>
                  <span className="navbar-toggle-toggled">
                    <i className="tio-clear" />
                  </span>
                </span>
              </button>
              <div
                id="navbarVerticalNavMenu"
                className="collapse navbar-collapse"
              >
                <ul
                  id="navbarSettings"
                  className="js-sticky-block js-scrollspy navbar-nav navbar-nav-lg nav-tabs card card-navbar-nav"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="javascript:"
                      id="generalSection"
                      style={{ color: "black" }}
                    >
                      <i className="tio-user-outlined nav-icon" />
                      Basic Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="javascript:"
                      id="passwordSection"
                      style={{ color: "black" }}
                    >
                      <i className="tio-lock-outlined nav-icon" /> Password
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <form id="admin-profile-form">
              <input
                type="hidden"
                name="_token"
                defaultValue="9MwZveTgMo0uPqMjzJMJ6iptaS1V3eI3RwcrHfin"
              />
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
                    className="avatar-img"
                    src={resUserProfileDetails?.imageURL || productImage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = productImage;
                    }}
                    alt="Image"
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
                      htmlFor="fullNameLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Full Name{" "}
                      <i
                        className="tio-help-outlined text-body ml-1"
                        data-toggle="tooltip"
                        data-placement="top"
                        title
                        data-original-title="Display name"
                      />
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-sm-down-break">
                        <input
                          type="text"
                          className="form-control"
                          name="full_name"
                          id="fullNameLabel"
                          placeholder="Your Full name"
                          aria-label="Your Full name"
                          value={resUserProfileDetails.full_name}
                          onChange={handleInputChange}
                        />
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
                      <div className="input-group input-group-sm-down-break">
                        <input
                          type="text"
                          className="js-masked-input form-control"
                          name="phone"
                          id="phoneLabel"
                          placeholder="+x(xxx)xxx-xx-xx"
                          aria-label="+(xxx)xx-xxx-xxxxx"
                          data-hs-mask-options='{
                                     "template": "+(880)00-000-00000"
                                   }'
                          value={resUserProfileDetails.phone}
                          onChange={handleInputChange}
                        />
                      </div>
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
                      <div className="input-group input-group-sm-down-break">
                        <input
                          type="email"
                          className="form-control"
                          name="email_address"
                          id="newEmailLabel"
                          // defaultValue="admin@admin.com"
                          placeholder="Enter new email address"
                          aria-label="Enter new email address"
                          value={resUserProfileDetails.email_address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 col-form-label"></div>
                    <div className="form-group col-md-9" id="select-img">
                      <span className="badge badge-soft-danger">
                        ( Ratio 1:1 )
                      </span>
                      <div className="custom-file">
                        <input
                          type="file"
                          name="admin_photo"
                          id="customFileUpload"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                          onChange={handleInputChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUpload"
                        >
                          Image Upload
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      onclick="call_demo()"
                      className="btn btn-primary"
                      onClick={handleUpdateProfile}
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
                      <div className="input-group input-group-sm-down-break">
                        <input
                          type="password"
                          className="js-pwstrength form-control"
                          name="password"
                          id="newPassword"
                          placeholder="Enter new password"
                          aria-label="Enter new password"
                          data-hs-pwstrength-options='{
                                     "ui": {
                                       "container": "#changePasswordForm",
                                       "viewports": {
                                         "progress": "#passwordStrengthProgress",
                                         "verdict": "#passwordStrengthVerdict"
                                       }
                                     }
                                   }'
                          value={resUserProfileDetails.password}
                          onChange={handleInputChange}
                        />
                        <p
                          id="passwordStrengthVerdict"
                          className="form-text mb-2"
                        />
                        <div id="passwordStrengthProgress" />
                      </div>
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
                        <div className="input-group input-group-sm-down-break">
                          <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            id="confirmNewPasswordLabel"
                            placeholder="Confirm your new password"
                            aria-label="Confirm your new password"
                            value={resUserProfileDetails.confirm_password}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      onclick="call_demo()"
                      className="btn btn-primary"
                      onClick={handleChangePassword}
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
    </main>
  );
}

export default AdminProfileUpdate1;
