import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/newContext";

const StaffProfile = () => {
  const [staff, setStaff] = useState();
  const [state, dispatch] = useContext(Context);

  const staffGet = async () => {
    const res = await fetch(
      "https://zambet-ecommerce.onrender.com/api/staff/profile",
      {
        method: "GET",
        headers: {
          Authorization: state.sellerToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setStaff(data.data);
  };

  useEffect(() => {
    staffGet();
  }, []);
  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <h1 className="page-header-title">Settings</h1>
              </div>
              <div className="col-sm-auto">
                <Link className="btn btn-primary" to="/seller/dashboard">
                  <i className="tio-home mr-1" /> Dashboard
                </Link>
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
              <form id="seller-profile-form">
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="fhfTIqKRNJeagVR38JekWGl1atNfhYCrDkMKCl2A"
                />
                <div className="card mb-3 mb-lg-5" id="generalDiv">
                  <div className="profile-cover">
                    <div className="profile-cover-img-wrapper" />
                  </div>
                  <label
                    className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar"
                    htmlFor="avatarUploader"
                  >
                    {/* <img
                      id="viewer"
                      className="avatar-img"
                      src={resUserProfileDetails?.imageURL}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = productImage;
                      }}
                      alt="Image"
                    /> */}
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
                          {/* <label htmlFor="name">
                          First Name <span className="text-danger">*</span>
                        </label> */}
                          <input
                            type="text"
                            name="first_name"
                            // defaultValue="John"
                            className="form-control"
                            placeholder="First Name"
                            id="name"
                            required
                            value={staff[0].fullname}
                            // onChange={handleInputChange}
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
                        {/* <small className="text-danger">
                        ( * Country code is must Like for BD 880 )
                      </small> */}
                        <input
                          type="number"
                          className="js-masked-input form-control"
                          name="phone"
                          id="phoneLabel"
                          // placeholder="+x(xxx)xxx-xx-xx"
                          aria-label="+(xxx)xx-xxx-xxxxx"
                          defaultValue={+6400000000}
                          data-hs-mask-options='{
                                       "template": "+(880)00-000-00000"
                                     }'
                          value={staff[0].phone}
                          // onChange={handleInputChange}
                        />
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
                          name="email_address"
                          id="newEmailLabel"
                          // defaultValue="test.seller@gmail.com"
                          placeholder="Enter new email address"
                          aria-label="Enter new email address"
                          value={staff[0].email}
                          // onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-form-label"></div>
                      <div className="form-group col-md-9" id="select-img">
                        <div className="custom-file">
                          <input
                            type="file"
                            name="vendor_photo"
                            id="customFileUpload"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            // onChange={handleInputChange}
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
                        // onClick={handleUpdateProfile}
                        className="btn btn-primary"
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
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="fhfTIqKRNJeagVR38JekWGl1atNfhYCrDkMKCl2A"
                    />
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
                          name="password"
                          id="newPassword"
                          placeholder="Enter old password"
                          aria-label="Enter old password"
                          data-hs-pwstrength-options='{
                                       "ui": {
                                         "container": "#changePasswordForm",
                                         "viewports": {
                                           "progress": "#passwordStrengthProgress",
                                           "verdict": "#passwordStrengthVerdict"
                                         }
                                       }
                                     }'
                          // value={resUserProfileDetails.password}
                          // onChange={handleInputChange}
                        />
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
                            name="confirm_password"
                            id="confirmNewPasswordLabel"
                            placeholder="Enter new password"
                            aria-label="Confirm your new password"
                            // value={resUserProfileDetails.confirm_password}
                            // onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        onclick="call_demo()"
                        className="btn btn-primary"
                        // onClick={handleChangePassword}
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
    </>
  );
};

export default StaffProfile;
