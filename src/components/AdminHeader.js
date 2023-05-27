// Firebase Push Notification
import { fetchToken, onMessageListener } from "config/firebase";
// NOTE: don't import css like below, it will impact whole project instead if you want to apply css to only specific react component then you should not use style.css file instead style.module.css or import style from "style.css"
// import "bootstrap/dist/css/bootstrap.min.css";
//
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defaultAPIErrorHandler } from "api/api";
//

function AdminHeader({ toggleSideBar, isOpen }) {
  const location = useLocation();
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  const [mainState, setMainState] = useState({
    num: 0,
  });

  // Firebase Push Notification
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [webNotifToken, setWebNotifToken] = useState(null);
  const [profileWebToken, setProfileWebToken] = useState(null);
  const [tabHasFocus, setTabHasFocus] = useState(false);

  fetchToken(setTokenFound)
    .then((token) => setWebNotifToken(token))
    .catch((err) => {
      setWebNotifToken(null);
      console.log(err);
      return null;
    });

  onMessageListener()
    .then((payload) => {
      // setNotification({
      //   title: payload.notification.title,
      //   body: payload.notification.body,
      // });
      // setShow(true);
      console.log(payload);
      // toast.info(payload?.data?.body)
      // toast.success(payload?.data?.body)
      // toast.warn(payload?.data?.body)
      // toast.warning(payload?.data?.body)
      // toast(payload?.data?.body)

      // toast(payload.data?.message || payload?.notification?.title);
      // toast(
      //   <>
      //     {!!payload?.data ? (
      //       <>
      //         <h6>{payload?.data?.title}</h6>
      //         <p>{payload?.data?.body}</p>
      //       </>
      //     ) : (
      //       <>
      //         <h6>{payload?.notification?.title}</h6>
      //         <p>{payload?.notification?.body}</p>
      //       </>
      //     )}
      //   </>
      // );
    })
    .catch((err) => console.log("failed: ", err));

  const onShowNotificationClicked = () => {
    setNotification({
      title: "Notification",
      body: "This is a test notification",
    });
    setShow(true);
  };
  //

  const refreshThePage = () => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    // if (reloadCount < 2) {
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
    console.log("run UseEffect");
  };

  const getAdminProfile = () => {
    if (state.isAdminLoggedIn) {
      axios({
        method: "get",
        url: process.env.REACT_APP_BASEURL + "/api/admin",
        headers: {
          Authorization: state.adminToken,
        },
      })
        .then(function (response) {
          dispatch({
            type: "ADMIN_PROFILE",
            full_name: response.data.data[0].AdminDetails[0].full_name,
            contect_No: response.data.data[0].contect_no,
            email_Address: response.data.data[0].email_address,
            web_notif_token:
              response.data.data[0]?.notificationTokens?.deviceToken,
            web_notif_last_updated_on:
              response.data.data[0]?.notificationTokens?.lastUpdatedOn,
          });
          setProfileWebToken(
            response.data.data[0]?.notificationTokens?.deviceToken
          );
        })
        .catch(function (error) {
          // defaultAPIErrorHandler(error)
        });
    }
  };

  useEffect(() => {
    refreshThePage();
    getAdminProfile();
  }, []);

  const updateNotificationTokens = () => {
    console.log("updateNotificationTOkens API called");
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user/updateNotificationTokens",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        deviceToken: webNotifToken,
        deviceType: "web",
      }),
    })
      .then((response) => {
        console.log("updateNotificationTokens API", response.data);
        getAdminProfile();
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    console.log("CHECK FOR updateNotificationTOkens condition");
    if (state.isAdminLoggedIn && webNotifToken !== profileWebToken) {
      updateNotificationTokens();
    }
  }, [location.pathname, webNotifToken, profileWebToken, tabHasFocus]);

  useEffect(() => {
    const handleFocus = () => {
      console.log("Tab has focus");
      setTabHasFocus((prev) => !prev);
      getAdminProfile();
      // updateNotificationTokens()
    };

    // const handleBlur = () => {
    //   console.log('Tab lost focus');
    //   setTabHasFocus(false);
    // };

    window.addEventListener("focus", handleFocus);
    // window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      // window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <header
        id="header"
        style={{ backgroundColor: "rgba(59, 113, 222, 1)" }}
        className="navbar AdminHeader navbar-expand-sm navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered"
      >
        <div className="navbar-nav-wrap">
          <div className="navbar-brand-wrapper">
            <Link
              to="#"
              className="navbar-brand"
              aria-label
              style={{
                backgroundColor: "rgb(59, 113, 222)",
              }}
            >
              <img
                className="navbar-brand-logo"
                style={{ maxHeight: "42px" }}
                onerror="this.src='/public/assets/front-end/img/image-place-holder.png'"
                // src={process.env.PUBLIC_URL + "/assets/back-end/img/new.png"}
                src="/zambet_logo.png"
                alt="Logo"
              />
              <img
                className="navbar-brand-logo-mini"
                style={{ maxHeight: "42px" }}
                onerror="this.src='/public/assets/front-end/img/image-place-holder.png'"
                // src={process.env.PUBLIC_URL + "/assets/back-end/img/new.png"}
                src="/zambet_logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="navbar-nav-wrap-content-left">
            <button
              type="button"
              className="js-navbar-vertical-aside-toggle-invoker close mr-3"
            >
              {isOpen ? (
                <i
                  className="tio-first-page navbar-vertical-aside-toggle-short-align"
                  data-toggle="tooltip"
                  data-placement="right"
                  title
                  data-original-title="Collapse"
                  onClick={() => toggleSideBar()}
                  style={{
                    display: "block",
                  }}
                />
              ) : (
                <i
                  className="tio-last-page navbar-vertical-aside-toggle-short-align"
                  data-toggle="tooltip"
                  data-placement="right"
                  title
                  data-original-title="Expand"
                  style={{
                    display: "block",
                  }}
                  onClick={() => toggleSideBar()}
                />
              )}
              {/* <i
                className="tio-first-page navbar-vertical-aside-toggle-short-align"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="Collapse"
              />
              <i
                className="tio-last-page navbar-vertical-aside-toggle-full-align"
                data-template='<div class="tooltip d-none d-sm-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="Expand"
              /> */}
            </button>
            {/* <div className="d-none d-md-block">
              <div className="input-group input-group-merge input-group-borderless input-group-hover-light navbar-input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="tio-search" />
                  </div>
                </div>
                <input
                  type="search"
                  className="js-form-search form-control"
                  id="search-bar-input"
                  placeholder="Search"
                  aria-label="Search in front"
                />
                <div className="input-group">
                  <div
                    className="card"
                    id="search-card"
                    style={{
                      position: "absolute",
                      background: "white",
                      zIndex: 999,
                      width: "100%",
                      display: "none",
                      textAlign: "left",
                    }}
                  >
                    <div
                      className="card-body"
                      id="search-result-box"
                      style={{
                        overflow: "scroll",
                        height: "400px",
                        overflowX: "hidden",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div
            className="navbar-nav-wrap-content-right"
            style={{ marginRight: "unset", marginLeft: "auto" }}
          >
            <ul className="navbar-nav align-items-center flex-row">
              {/* <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <div
                    style={{
                      background: "white",
                      padding: "9px",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="topbar-text dropdown disable-autohide mr-3 text-capitalize">
                      <Link
                        to="#"
                        className="topbar-link dropdown-toggle"
                        data-toggle="dropdown"
                        style={{ color: "black!important" }}
                      >
                        <img
                          className="mr-2"
                          width={20}
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/front-end/img/flags/en.png"
                          }
                          alt="Eng"
                        />
                        english
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/lang/en" className="dropdown-item pb-1">
                            <img
                              className="mr-2"
                              width={20}
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/front-end/img/flags/en.png"
                              }
                              alt="english"
                            />
                            <span style={{ textTransform: "capitalize" }}>
                              english
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/lang/sa" className="dropdown-item pb-1">
                            <img
                              className="mr-2"
                              width={20}
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/front-end/img/flags/sa.png"
                              }
                              alt="عربي"
                            />
                            <span style={{ textTransform: "capitalize" }}>
                              عربي
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <Link
                    to="/"
                    title="Website home"
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    target="_blank"
                    data-hs-unfold-invoker
                  >
                    <i className="tio-globe" />
                  </Link>
                </div>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <Link
                    to="/admin/contact/list"
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    data-hs-unfold-invoker
                  >
                    <i className="tio-email" />
                  </Link>
                </div>
              </li> */}
              {/* <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <Link
                    to="/admin/orders/list/pending"
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    data-hs-unfold-invoker
                  >
                    <i className="tio-shopping-cart-outlined" />
                  </Link>
                </div>
              </li> */}
              <li className="nav-item">
                <div className="hs-unfold">
                  <Link
                    className="js-hs-unfold-invoker navbar-dropdown-account-wrapper"
                    to="#"
                    data-hs-unfold-options='{
                               "target": "#accountNavbarDropdown",
                               "type": "css-animation"
                             }'
                    data-hs-unfold-target="#accountNavbarDropdown"
                    data-hs-unfold-invoker
                  >
                    <div className="avatar avatar-sm avatar-circle">
                      <img
                        className="avatar-img"
                        onerror="this.src='/public/assets/front-end/img/image-place-holder.png'"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/front-end/img/image-place-holder.png"
                        }
                        alt="Image Description"
                      />
                      <span className="avatar-status avatar-sm-status avatar-status-success" />
                    </div>
                  </Link>
                  <div
                    id="accountNavbarDropdown"
                    className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-hidden hs-unfold-content-initialized hs-unfold-css-animation animated"
                    style={{ width: "16rem", animationDuration: "300ms" }}
                    data-hs-target-height="178.6"
                    data-hs-unfold-content
                    data-hs-unfold-content-animation-in="slideInUp"
                    data-hs-unfold-content-animation-out="fadeOut"
                  >
                    <div className="dropdown-item-text">
                      <div className="media align-items-center text-break">
                        <div className="avatar avatar-sm avatar-circle mr-2">
                          <img
                            className="avatar-img"
                            onerror="this.src='/public/assets/front-end/img/image-place-holder.png'"
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/front-end/img/image-place-holder.png"
                            }
                            alt="Image Description"
                          />
                        </div>
                        <div className="media-body">
                          <span className="card-title h5" />
                          <span className="card-text">
                            {state?.adminProfile?.full_name || "..."}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link
                      to="/admin/profile/update/1"
                      className="dropdown-item"
                    >
                      <span className="text-truncate pr-2" title="Settings">
                        My Profile
                      </span>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link
                      className="dropdown-item"
                      to="/admin/auth/logout"
                      replace
                      onclick="Swal.fire({
                              title: 'Do you want to logout?',
                              showDenyButton: true,
                              showCancelButton: true,
                              confirmButtonColor: '#377dff',
                              cancelButtonColor: '#363636',
                              confirmButtonText: `Yes`,
                              denyButtonText: `Don't Logout`,
                              }).then((result) => {
                              if (result.value) {
                              location.to='/admin/auth/logout';
                              } else{
                              Swal.fire('Canceled', '', 'info')
                              }
                              })"
                    >
                      <span className="text-truncate pr-2" title="Sign out">
                        Sign out
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <aside
        style={{ background: "#ffffff!important", textAlign: "left" }}
        className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered default navbar-vertical-aside-initialized"
      >
        <div className="navbar-vertical-container">
          <div className="navbar-vertical-footer-offset pb-0">
            <div className="navbar-brand-wrapper justify-content-between side-logo">
              <Link
                to="/admin/dashboard"
                className="navbar-brand"
                aria-label="Front"
                style={{
                  backgroundColor: "rgb(59, 113, 222)",
                }}
              >
                <img
                  style={{ maxHeight: "38px" }}
                  onerror="this.src='/public/assets/back-end/img/900x400/img1.jpg'"
                  className="navbar-brand-logo-mini for-web-logo"
                  src="/zambet_logo.png"
                  // src={process.env.PUBLIC_URL + "/assets/back-end/img/new.png"}
                  alt="Logo"
                />
              </Link>
              <button
                type="button"
                className="js-navbar-vertical-aside-toggle-invoker navbar-vertical-aside-toggle btn btn-icon btn-xs btn-ghost-dark"
              >
                <i className="tio-clear tio-lg" onClick={toggleSideBar} />
              </button>
            </div>
            <div className="navbar-vertical-content mt-2">
              <ul className="navbar-nav navbar-nav-lg nav-tabs">
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    to="/admin/dashboard"
                    className="js-navbar-vertical-aside-menu-link nav-link"
                  >
                    <i className="tio-home-vs-1-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Dashboard
                    </span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <small className="nav-subtitle">Pos System</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    to="#"
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                  >
                    <i className="tio-shopping nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      POS
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item">
                      <Link title="Pos" to="/admin/pos" className="nav-link">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Pos</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        to="/admin/pos/orders"
                        className="nav-link "
                        title="Orders"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Orders
                          <span className="badge badge-info badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Order management</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-shopping-cart-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Orders
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link" to="/admin/orders/list/all">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          All
                          <span className="badge badge-info badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/admin/orders/list/pending"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Pending
                          <span className="badge badge-soft-info badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/confirmed"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Confirmed
                          <span className="badge badge-soft-success badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/processing"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Processing
                          <span className="badge badge-warning badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/out_for_delivery"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Out for delivery
                          <span className="badge badge-warning badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/delivered"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Delivered
                          <span className="badge badge-success badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/returned"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Returned
                          <span className="badge badge-soft-danger badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/failed"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Failed
                          <span className="badge badge-danger badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/orders/list/canceled"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Canceled
                          <span className="badge badge-danger badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li className="nav-item ">
                  <small className="nav-subtitle">Product management</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/brand/list">
                    <span className="tio-premium-outlined nav-icon" />
                    <span className="text-truncate">Brands </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/product/list">
                    <span className="tio-premium-outlined nav-icon" />
                    <span className="text-truncate">Products </span>
                  </Link>
                </li>

                {/* <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-apple-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Brands
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/admin/brand/add-new">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Add new</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link " to="/admin/brand/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">List</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-filter-list nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Categories
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/admin/category/view">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Category</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link " to="/admin/sub-category/view">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Sub category</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/sub-sub-category/view"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Sub sub category</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/attribute/view"
                  >
                    <i className="tio-category-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Attribute
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-shop nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      <span className="text-truncate">InHouse Products</span>
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/list/in_house"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Products</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/stock-limit-list/in_house"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Stock limit products
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/bulk-import"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Bulk import</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/bulk-export"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Bulk export</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {/* <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-airdrop nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Seller Products
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/updated-product-list"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Updated products </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/list/seller?status=0"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">New Products</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/list/seller?status=1"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Approved Products</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin/product/list/seller?status=2"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Denied Products</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Marketing Section</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/banner/list"
                  >
                    <i className="tio-photo-square-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Banners
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/coupon/add-new"
                  >
                    <i className="tio-credit-cards nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Coupons
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/notification/add-new"
                  >
                    <i className="tio-notifications-on-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Push notification
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/deal/flash"
                  >
                    <i className="tio-flash nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Flash deals
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/deal/day"
                  >
                    <i className="tio-crown-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Deal of the day
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/deal/feature"
                  >
                    <i className="tio-flag-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Featured deal
                    </span>
                  </Link>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Business section</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/stock/product-stock"
                  >
                    <i className="tio-fullscreen-1-1 nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Product Stock
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/reviews/list"
                  >
                    <i className="tio-star nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Customer Reviews
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/stock/product-in-wishlist"
                  >
                    <i className="tio-heart-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Product In Wish List
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/transaction/list"
                  >
                    <i className="tio-money nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Order Transactions
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/transaction/refund-list"
                  >
                    <i className="tio-money nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Refund Transactions
                    </span>
                  </Link>
                </li> */}

                <li className="nav-item ">
                  <small className="nav-subtitle">User section</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/sellers/seller-list">
                    <span className="tio-users-switch nav-icon" />
                    <span className="text-truncate">Sellers </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/customer/list">
                    <span className="tio-poi-user nav-icon" />
                    <span className="text-truncate">Customers </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/sub-admin/list">
                    <span className="tio-poi-user nav-icon" />
                    <span className="text-truncate">Sub-Admins</span>
                  </Link>
                </li>

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Support section</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/contact/list"
                  >
                    <i className="tio-messages nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Messages
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/support-ticket/view"
                  >
                    <i className="tio-chat nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Support Ticket
                    </span>
                  </Link>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Business settings</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-receipt-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Refund request list
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/refund/list/pending"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Pending
                          <span className="badge badge-soft-danger badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/refund/list/approved"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Approved
                          <span className="badge badge-soft-info badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/refund/list/refunded"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Refunded
                          <span className="badge badge-success badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/refund/list/rejected"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Rejected
                          <span className="badge badge-danger badge-pill ml-1">
                            {mainState.num || 0}
                          </span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/seller-settings"
                  >
                    <i className="tio-user-big-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Seller settings
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/payment-method"
                  >
                    <i className="tio-money-vs nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Payment method
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="nav-link "
                    to="/admin/business-settings/sms-module"
                    title="Sms Module"
                  >
                    <i className="tio-sms-active-outlined nav-icon" />
                    <span className="text-truncate">Sms Module</span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="nav-link "
                    to="/admin/business-settings/shipping-method/setting"
                    title="Shipping"
                  >
                    <i className="tio-car nav-icon" />
                    <span className="text-truncate">Shipping</span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="nav-link "
                    to="/admin/business-settings/language"
                    title="Languages"
                  >
                    <i className="tio-book-opened nav-icon" />
                    <span className="text-truncate">Languages</span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/social-login/view"
                  >
                    <i className="tio-top-security-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Social login
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/currency/view"
                  >
                    <i className="tio-dollar-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Currencies
                    </span>
                  </Link>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Web &amp; app settings</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/web-config"
                  >
                    <i className="tio-globe nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Web config
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/web-config/db-index"
                  >
                    <i className="tio-cloud nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Clean database
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/web-config/environment-setup"
                  >
                    <i className="tio-labels nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Environment setup
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/web-config/refund-index"
                  >
                    <i className="tio-money nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Refund settings
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/captcha"
                  >
                    <i className="tio-panorama-image nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Recaptcha
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/analytics-index"
                  >
                    <i className="tio-chart-pie-2 nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Analytics
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/mail"
                  >
                    <i className="tio-email nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Mail config
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/fcm-index"
                  >
                    <i className="tio-notifications-alert nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Notification
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-pages-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Page setup
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/terms-condition"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Terms and conditions
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/privacy-policy"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Privacy Policy</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/business-settings/about-us"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">About Us</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link" to="/admin/helpTopic/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">FAQ</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/business-settings/social-media"
                  >
                    <i className="tio-twitter nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Social media
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="nav-link "
                    to="/admin/business-settings/map-api"
                    title="Third party apis"
                  >
                    <span className="tio-key nav-icon" />
                    <span className="text-truncate">Third party apis</span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/file-manager/index"
                  >
                    <i className="tio-album nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Gallery
                    </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <small className="nav-subtitle">Report&amp; Analytics</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/report/earning"
                  >
                    <i className="tio-chart-pie-1 nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Earning Report
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/report/order"
                  >
                    <i className="tio-chart-bar-1 nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Order Report
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-chart-bar-4 nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Sale report
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/report/inhoue-product-sale"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Inhouse Sale</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/report/seller-product-sale"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate text-capitalize">
                          Seller Sale
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Employee section</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/admin/custom-role/create"
                  >
                    <i className="tio-incognito nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Employee role
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    to="#"
                  >
                    <i className="tio-user nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Employees
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/admin/employee/add-new">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Add new</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link" to="/admin/employee/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">List</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                <li className="nav-item ">
                  <small className="nav-subtitle">
                    Delivery man management
                  </small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/delivery-man/list">
                    <span className="tio-user nav-icon" />
                    <span className="text-truncate">Delivery-mans </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <small className="nav-subtitle">Miscellaneous</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/blogs/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Blogs </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/policies/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Policies </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/pricingpolicy">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Pricing Policies</span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/replacepolicy">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Replace Policies</span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    to="/admin/termsAndConditions/list"
                  >
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Terms And Conditions </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/deal/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Deals </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/contact-center/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Contact-Center </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    to="/admin/business-settings/mail"
                  >
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Mail Config </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    to="/admin/business-settings/fcm-index"
                  >
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Notification </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-receipt-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Refund request list
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/refund/list/pending"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Pending
                          <span className="badge badge-soft-danger badge-pill ml-1">
                            {mainState.num}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/refund/list/approved"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Approved
                          <span className="badge badge-soft-info badge-pill ml-1">
                            {mainState.num}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/refund/list/refunded"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Refunded
                          <span className="badge badge-success badge-pill ml-1">
                            {mainState.num}
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/admin/refund/list/rejected"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Rejected
                          <span className="badge badge-danger badge-pill ml-1">
                            {mainState.num}
                          </span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li className="nav-item ">
                  <Link className="nav-link " to="/admin/subscribers/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Subscribers </span>
                  </Link>
                </li> */}
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/newsletters/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Newsletter </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/manage-homepage">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">
                      Manage Customer HomePage
                    </span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/coupons/list">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Manage Coupons</span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admin/manageadvertisement">
                    <span className="tio-filter-list nav-icon" />
                    <span className="text-truncate">Manage advertisement</span>
                  </Link>
                </li>

                <li className="nav-item" style={{ paddingTop: "50px" }}>
                  <div className="nav-divider" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div className="js-navbar-vertical-aside-toggle-invoker navbar-vertical-aside-mobile-overlay" />
      <div className="container">
        <div className="row">
          <div
            className="col-12"
            style={{
              width: "94%",
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(59, 113, 222)",
            }}
          >
            <div id="loading" style={{ display: "none" }}>
              <img
                width={200}
                src="/zambet_logo.png"
                onerror="this.src='/public/assets/front-end/img/loader.gif'"
              />
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .navbar-vertical .nav-link {\n        color: #041562;\n        font-weight: bold;\n    }\n\n    .navbar .nav-link:hover {\n        color: #041562;\n    }\n\n    .navbar .active > .nav-link, .navbar .nav-link.active, .navbar .nav-link.show, .navbar .show > .nav-link {\n        color: #F14A16;\n    }\n\n    .navbar-vertical .active .nav-indicator-icon, .navbar-vertical .nav-link:hover .nav-indicator-icon, .navbar-vertical .show > .nav-link > .nav-indicator-icon {\n        color: #F14A16;\n    }\n\n    .nav-subtitle {\n        display: block;\n        color: #041562;\n        font-weight: 600;\n        text-transform: uppercase;\n        letter-spacing: .03125rem;\n    }\n\n    .side-logo {\n        background-color: #ffffff;\n    }\n\n    .nav-sub {\n        background-color: #ffffff!important;\n    }\n\n    .nav-indicator-icon {\n        margin-left: ;\n    }\n",
        }}
      />
    </>
  );
}

export default AdminHeader;
