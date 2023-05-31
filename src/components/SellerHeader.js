// Firebase Push Notification
import { fetchToken, onMessageListener } from "config/firebase";
// NOTE: don't import css like below, it will impact whole project instead if you want to apply css to only specific react component then you should not use style.css file instead style.module.css or import style from "style.css"
// import "bootstrap/dist/css/bootstrap.min.css";
//
import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { removeSellerSessionToken } from "utils/Common";
import { Context } from "context/newContext";
import axios from "axios";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileImage from "assets/profileImage.jpg";
import { defaultAPIErrorHandler } from "api/api";
//

function SellerHeader({ toggleSideBar, isOpen }) {
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
  const [staff, setStaff] = useState();

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
      // Page Refreshed so call APIs
      getSellerProfile();
      checkStockExpiry();
    }
    console.log("run UseEffect");
  };

  const getSellerProfile = () => {
    if (state.isSellerLoggedIn) {
      axios({
        method: "get",
        url: process.env.REACT_APP_BASEURL + "/api/vendor",
        headers: {
          Authorization: state.sellerToken,
        },
      })
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          dispatch({
            type: "SELLER_PROFILE",
            email_address: response.data.data[0].email_address,
            contect_no: response.data.data[0].contect_no,
            first_name: response.data.data[0].vendor_detail.first_name,
            last_name: response.data.data[0].vendor_detail.last_name,
            vendor_photo: response.data.data[0].vendor_detail.vendor_photo,
            company_name: response.data.data[0].vendor_detail.company_name,
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

  const checkStockExpiry = () => {
    if (state.isSellerLoggedIn) {
      axios({
        method: "get",
        url: process.env.REACT_APP_BASEURL + "/api/product/checkStockExpiry",
        headers: {
          Authorization: state.sellerToken,
        },
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          // defaultAPIErrorHandler(error)
        });
    }
  };

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
    refreshThePage();
    staffGet();
  }, []);

  const updateNotificationTokens = () => {
    console.log("updateNotificationTOkens API called");
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user/updateNotificationTokens",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.sellerToken,
      },
      data: JSON.stringify({
        deviceToken: webNotifToken,
        deviceType: "web",
      }),
    })
      .then((response) => {
        console.log(response.data);
        getSellerProfile();
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    console.log("CHECK FOR updateNotificationTOkens condition");
    if (state.isSellerLoggedIn && webNotifToken !== profileWebToken) {
      updateNotificationTokens();
    }
  }, [location.pathname, webNotifToken, profileWebToken]);

  useEffect(() => {
    const handleFocus = () => {
      console.log("Tab has focus");
      setTabHasFocus((prev) => !prev);
      getSellerProfile();
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

  var role = localStorage.getItem("sellerRole");
  if (role == "seller") {
    var PATH = "/seller/profile/update/1";
  } else if (role == "staff") {
    var PATH = "/seller/staff/profile/update";
  }

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
        className="navbar AdminHeader navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered"
      >
        {/* <ToastContainer position="top-center">
        <Toast>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>See? Just like this.</Toast.Body>
        </Toast>
        <Toast>
          <Toast.Header style={{ backgroundColor: "white" }}>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">2 seconds ago</small>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "#3b71de" }}>Heads up, toasts will stack automatically</Toast.Body>
        </Toast>
      </ToastContainer> */}

        {/*       
      {isTokenFound && <p> Notification permission enabled 👍🏻 </p>}
      {!isTokenFound && <p> Need notification permission ❗️ </p>}
      <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button>
       */}
        <div className="navbar-nav-wrap">
          <div className="navbar-brand-wrapper">
            <Link
              className="navbar-brand"
              to="/seller/dashboard"
              aria-label
              style={{
                backgroundColor: "rgb(59, 113, 222)",
              }}
            >
              <img
                className="navbar-brand-logo"
                style={{ maxHeight: "42px" }}
                src="/zambet_logo.png"
                alt="Logo"
                height={40}
                width={40}
              />
              <img
                className="navbar-brand-logo-mini"
                style={{ maxHeight: "42px" }}
                src="/zambet_logo.png"
                alt="Logo"
                height={40}
                width={40}
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
                  title
                  data-original-title="Collapse"
                  onClick={() => toggleSideBar()}
                />
                <i
                  className="tio-last-page navbar-vertical-aside-toggle-full-align"
                  data-template='<div class="tooltip d-sm-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
                  data-toggle="tooltip"
                  data-placement="right"
                  title
                  data-original-title="Expand"
                  onClick={() => toggleSideBar()}
                /> */}
            </button>
            <div className="d-none d-md-block">
              <form className="position-relative"></form>
            </div>
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
                      padding: "2px",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="topbar-text dropdown disable-autohide m-1 text-capitalize">
                      <Link
                        className="topbar-link dropdown-toggle"
                        to="#"
                        data-toggle="dropdown"
                        style={{ color: "black!important" }}
                      >
                        <img
                          className="mr-2"
                          width={20}
                          src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png"
                          alt="Eng"
                        />
                        english
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item pb-1" to="/lang/en">
                            <img
                              className="mr-2"
                              width={20}
                              src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png"
                              alt="english"
                            />
                            <span style={{ textTransform: "capitalize" }}>
                              english
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item pb-1" to="/lang/sa">
                            <img
                              className="mr-2"
                              width={20}
                              src="https://6valley.6amtech.com/public/assets/front-end/img/flags/sa.png"
                              alt="Arabic"
                            />
                            <span style={{ textTransform: "capitalize" }}>
                              Arabic
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
                    title="Website Home"
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    to="/"
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
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    to="/seller/messages/chat"
                    data-hs-unfold-invoker
                  >
                    <i className="tio-email" />
                    <span className="btn-status btn-sm-status btn-status-danger" />
                  </Link>
                </div>
              </li> */}
              {/* <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <Link
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    to="/seller/orders/list/pending"
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
                    // to="javascript:;"
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
                        src={state.sellerProfile?.vendor_photo || profileImage}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = profileImage;
                        }}
                        style={{
                          borderRadius: "50%",
                        }}
                        alt="Image"
                      />
                      {/* <img
                        className="avatar-img"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                        alt="Image Description"
                      /> */}
                      <span className="avatar-status avatar-sm-status avatar-status-success" />
                    </div>
                  </Link>
                  <div
                    id="accountNavbarDropdown"
                    className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-hidden hs-unfold-content-initialized hs-unfold-css-animation animated"
                    style={{ width: "16rem", animationDuration: "300ms" }}
                    data-hs-target-height="185.6"
                    data-hs-unfold-content
                    data-hs-unfold-content-animation-in="slideInUp"
                    data-hs-unfold-content-animation-out="fadeOut"
                  >
                    <div className="dropdown-item-text">
                      <div className="media align-items-center text-break">
                        <div className="avatar avatar-sm avatar-circle mr-2">
                          <img
                            className="avatar-img"
                            // src="https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                            src={
                              state.sellerProfile?.vendor_photo
                                ? state.sellerProfile?.vendor_photo
                                : "https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="media-body">
                          <span className="card-title h6">
                            {state.sellerProfile
                              ? `${state.sellerProfile?.first_name}` +
                                `${state.sellerProfile?.last_name}`
                              : "..."}
                          </span>
                          <span className="card-text">
                            {state.sellerProfile
                              ? state.sellerProfile?.email_address
                              : "..."}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link className="dropdown-item" to={PATH}>
                      <span className="text-truncate pr-2" title="Settings">
                        My Profile
                      </span>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link
                      className="dropdown-item"
                      // to="javascript:"
                      to="/seller/auth/logout"
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
                              location.href='https://6valley.6amtech.com/seller/auth/logout';
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
        style={{ background: "#ffffff", textAlign: "left" }}
        className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered default navbar-vertical-aside-initialized"
      >
        <div className="navbar-vertical-container">
          <div
            className="navbar-vertical-footer-offset"
            style={{ paddingBottom: 0 }}
          >
            <div className="navbar-brand-wrapper justify-content-between side-logo">
              <Link
                className="navbar-brand"
                to="/seller/dashboard"
                aria-label="Front"
                style={{
                  backgroundColor: "rgb(59, 113, 222)",
                }}
              >
                <img
                  // className="navbar-brand-logo-mini for-seller-logo"
                  className="navbar-brand-logo-mini for-web-logo"
                  src="/zambet_logo.png"
                  // src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f6e190f4c.png"
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
            <div className="navbar-vertical-content">
              <ul className="navbar-nav navbar-nav-lg nav-tabs">
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/dashboard"
                  >
                    <i className="tio-home-vs-1-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <small className="nav-subtitle">Pos System</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu">
                  <a
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    href="javascript:"
                  >
                    <i className="tio-shopping nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      POS
                    </span>
                  </a>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none", top: "159.113px" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/seller/pos" title="Pos">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Pos</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/pos/orders"
                        title="Orders"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Orders
                          <span className="badge badge-info badge-pill ml-1">
                            {mainState.num}
                          </span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <small className="nav-subtitle">Order management</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-shopping-cart nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Orders
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/all"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">All</span>
                        <span className="badge badge-info badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/pending"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Pending</span>
                        <span className="badge badge-soft-info badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/confirmed"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Confirmed</span>
                        <span className="badge badge-soft-info badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/processing"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Processing</span>
                        <span className="badge badge-warning badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/out_for_delivery"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Out for delivery</span>
                        <span className="badge badge-warning badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/delivered"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Delivered</span>
                        <span className="badge badge-success badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/returned"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Returned</span>
                        <span className="badge badge-soft-danger badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/failed"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Failed</span>
                        <span className="badge badge-danger badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/orders/list/canceled"
                        title
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Canceled</span>
                        <span className="badge badge-danger badge-pill ml-1">
                          {mainState.num}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/customersnames"
                  >
                    <i className="tio-receipt-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Customer Name
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <small className="nav-subtitle">Purchase Order</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-shopping nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Purchase Order
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/seller/purchase-order">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Purchase Order</span>
                        {/* <span className="badge badge-info badge-pill ml-1">
                          {mainState.num}
                        </span> */}
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/purchase-order/list"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Purchase Order History
                        </span>
                        {/* <span className="badge badge-info badge-pill ml-1">
                          {mainState.num}
                        </span> */}
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/purchase-order/return/list"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Purchase Order Return
                        </span>
                        {/* <span className="badge badge-info badge-pill ml-1">
                          {mainState.num}
                        </span> */}
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/purchase-order/vendordetails"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Vendor Details</span>
                        {/* <span className="badge badge-info badge-pill ml-1">
                          {mainState.num}
                        </span> */}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <small className="nav-subtitle">Product management</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-premium-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Products
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/seller/product/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Products</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/product/stock-limit-list/in_house"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Manage Stock</span>
                      </Link>
                    </li>
                    {/* <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/product/bulk-import"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Bulk import</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/product/bulk-export"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Bulk export</span>
                      </Link>
                    </li> */}

                    <li className="nav-item ">
                      <Link className="nav-link " to="/seller/reviews/list">
                        <span className="tio-star nav-indicator-icon" />
                        <span className="text-truncate">Product Reviews</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/product-returns/list"
                      >
                        <span className="tio-star nav-indicator-icon" />
                        <span className="text-truncate">Product Returns</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/seller/purchase-order/expity-order"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Expiry Product</span>
                        {/* <span className="badge badge-info badge-pill ml-1">
                          {mainState.num}
                        </span> */}
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/reviews/list"
                  >
                    <i className="tio-star nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Product Reviews
                    </span>
                  </Link>
                </li> */}

                {/* <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/messages/chat"
                  >
                    <i className="tio-email nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Messages
                    </span>
                  </Link>
                </li> */}

                {/* <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/profile/view"
                  >
                    <i className="tio-shop nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      My bank info
                    </span>
                  </Link>
                </li> */}
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/shop/view"
                  >
                    <i className="tio-home nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      My shop
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/seller-refund-list"
                  >
                    <i className="tio-filter-list nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      RefundDetails
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <small className="nav-subtitle">Manage Staff</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-receipt-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Manage Staff
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link" to="/seller/staff/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Staff List
                          {/* <span className="badge badge-soft-danger badge-pill ml-1">
                            {mainState.num}
                          </span> */}
                        </span>
                      </Link>
                    </li>
                    {/* <li className="nav-item ">
                      <Link
                        className="nav-link"
                        to="/seller/staff/attendance/list"
                      >
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">
                          Staff Attendance
                          <span className="badge badge-soft-danger badge-pill ml-1">
                            {mainState.num}
                          </span>
                        </span>
                      </Link>
                    </li> */}
                  </ul>
                </li>
                <li className="nav-item">
                  <small className="nav-subtitle">Miscellaneous</small>
                  {/* <small className="tio-more-horizontal nav-subtitle-replacer" /> */}
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/deal/list"
                  >
                    <i className="tio-filter-list nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Deals
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/contact-center/add"
                  >
                    <i className="tio-filter-list nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Contact-Center
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/seller-advertisement"
                  >
                    <i className="tio-filter-list nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Advertisement
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/Margin-policy"
                  >
                    <i className="tio-filter-list nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      margin policies
                    </span>
                  </Link>
                </li>

                {/* <li className="nav-item ">
                  <small className="nav-subtitle" title>
                    Business section
                  </small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/business-settings/shipping-method/add"
                  >
                    <i className="tio-settings nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate text-capitalize">
                      Shipping method
                    </span>
                  </Link>
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link"
                    to="/seller/business-settings/withdraw/list"
                  >
                    <i className="tio-wallet-outlined nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate text-capitalize">
                      Withdraws
                    </span>
                  </Link>
                </li> */}

                {/* <li className="nav-item ">
                  <small className="nav-subtitle">
                    Delivery man management
                  </small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-user nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Delivery-man
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/seller/delivery-man/add">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Add new</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link" to="/seller/delivery-man/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">List</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {/* <li className="nav-item ">
                  <small className="nav-subtitle">Vendor Management</small>
                  <small className="tio-more-horizontal nav-subtitle-replacer" />
                </li>
                <li className="navbar-vertical-aside-has-menu ">
                  <Link
                    className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle"
                    // to="javascript:"
                    to="#"
                  >
                    <i className="tio-user nav-icon" />
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                      Vendor
                    </span>
                  </Link>
                  <ul
                    className="js-navbar-vertical-aside-submenu nav nav-sub"
                    style={{ display: "none" }}
                  >
                    <li className="nav-item ">
                      <Link className="nav-link " to="/seller/vendor/add-new">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">Add new</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link" to="/seller/vendor/list">
                        <span className="tio-circle nav-indicator-icon" />
                        <span className="text-truncate">List</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <div className="js-navbar-vertical-aside-toggle-invoker navbar-vertical-aside-mobile-overlay" />

      <div className="row">
        <div
          className="col-12"
          style={{ marginTop: "10rem", position: "fixed", zIndex: 9999 }}
        >
          <div id="loading" style={{ display: "none" }}>
            <center
              style={{
                backgroundColor: "rgb(59, 113, 222)",
              }}
            >
              <img
                width={200}
                src="/zambet_logo.png"
                // src="https://6valley.6amtech.com/storage/app/public/company/2022-04-23-62640d298e373.png"
              />
            </center>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .navbar-vertical .nav-link {\n        color: #041562;\n        \n    }\n\n    .navbar .nav-link:hover {\n        color: #041562;\n    }\n\n    .navbar .active > .nav-link, .navbar .nav-link.active, .navbar .nav-link.show, .navbar .show > .nav-link {\n        color: #F14A16;\n    }\n\n    .navbar-vertical .active .nav-indicator-icon, .navbar-vertical .nav-link:hover .nav-indicator-icon, .navbar-vertical .show > .nav-link > .nav-indicator-icon {\n        color: #F14A16;\n    }\n\n    .nav-subtitle {\n        display: block;\n        color: #041562;\n        font-weight: 600;\n        text-transform: uppercase;\n        letter-spacing: .03125rem;\n    }\n\n    .side-logo {\n        background-color: #ffffff;\n    }\n\n    .nav-sub {\n        background-color: #ffffff!important;\n    }\n\n    .nav-indicator-icon {\n        margin-left: ;\n    }\n",
        }}
      />
    </>
  );
}

export default SellerHeader;
