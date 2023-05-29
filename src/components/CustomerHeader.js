// Firebase Push Notification
import { fetchToken, onMessageListener } from "config/firebase";
// NOTE: don't import css like below, it will impact whole project instead if you want to apply css to only specific react component then you should not use style.css file instead style.module.css or import style from "style.css"
// import "bootstrap/dist/css/bootstrap.min.css";
//
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserProfile, isUserLoggedIn } from "utils/Common";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { truncate } from "utils/truncateText";
import dummyProductImage from "assets/dummyProductImage.png";
import ClipLoader from "react-spinners/ClipLoader";
import profileImage from "assets/profileImage.jpg";
import { defaultAPIErrorHandler } from "api/api";
//
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function CustomerHeader() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [search, setSearch] = useState("");

  // Firebase Push Notification
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [webNotifToken, setWebNotifToken] = useState(null);
  const [profileWebToken, setProfileWebToken] = useState(null);
  const [tabHasFocus, setTabHasFocus] = useState(false);
  const [mainState, setMainState] = useState({
    resAllCategories: [],
    resAllBrands: [],
  });

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
      // toast(
      //   <>
      //     hello
      //     <p>
      //       <small>bye</small>
      //     </p>
      //   </>
      // );
      // toast.info(payload?.data?.body)
      // toast.success(payload?.data?.body)
      // toast.warn(payload?.data?.body)
      // toast.warning(payload?.data?.body)
      // toast(payload?.data?.body)

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

      // toast(payload.data?.message || payload?.notification?.title);
      // toast(payload?.notification?.body || payload.data?.message, {
      //   data: {
      //     title: "Hello",
      //     text: "Lorem ipsum dolor...",
      //   },
      // });
      // return;
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

  const getUserProfile = () => {
    if (state.isUserLoggedIn) {
      axios({
        method: "get",
        url: process.env.REACT_APP_BASEURL + "/api/user",
        headers: {
          Authorization: state.userToken,
        },
      })
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          dispatch({
            type: "USER_PROFILE",
            email_address: response.data.data[0].email_address,
            contect_no: response.data.data[0].contect_no,
            first_name: response.data.data[0].User_Details.first_name,
            last_name: response.data.data[0].User_Details.last_name,
            user_photo: response.data.data[0].User_Details.user_photo,
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

  const apiGetAllCategories = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllBrands = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/brand",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllBrands: response.data.data?.slice(0, 10),
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetDisplayWishList = () => {
    let data = "";

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/wishlists",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch({
          type: "SET_USER_WISHLIST_COUNT",
          userWishlistCount: response.data.data.length || 0,
        });
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllCart = () => {
    let data = "";

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "SET_USER_CART_COUNT",
          userCartCount: response?.data?.data?.cart?.length || 0,
        });
        console.log(mainState);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetHome = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/home",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resHome: {
            topcategoryproduct: response.data.data?.topcategoryproduct || [],
          },
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetHome();
    apiGetAllCategories();
    apiGetAllBrands();
    if (location.pathname == "/") {
      getUserProfile();
      apiGetDisplayWishList();
      apiGetAllCart();
    }
    // refreshThePage();
  }, [location.pathname]);

  const updateNotificationTokens = () => {
    console.log("updateNotificationTOkens API called");
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/user/updateNotificationTokens",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.userToken,
      },
      data: JSON.stringify({
        deviceToken: webNotifToken,
        deviceType: "web",
      }),
    })
      .then((response) => {
        console.log(response.data);
        getUserProfile();
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    console.log("CHECK FOR updateNotificationTOkens condition");
    if (state.isUserLoggedIn && webNotifToken !== profileWebToken) {
      updateNotificationTokens();
    }
  }, [location.pathname, webNotifToken, , profileWebToken, tabHasFocus]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      console.log("Tab has focus");
      setTabHasFocus((prev) => !prev);
      getUserProfile();
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
    <header className="box-shadow-sm rtl">
      {/* <>
        <h5>Width: {windowSize.innerWidth}</h5>
        <h5>Height: {windowSize.innerHeight}</h5>
        <h5>Height: {location.pathname}</h5>
      </> */}
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
      <Helmet>
        <link
          rel="stylesheet"
          media="screen"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/simplebar/dist/simplebar.min.css"
          }
        />
        <link
          rel="stylesheet"
          media="screen"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/tiny-slider/dist/tiny-slider.css"
          }
        />
        <link
          rel="stylesheet"
          media="screen"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/drift-zoom/dist/drift-basic.min.css"
          }
        />
        <link
          rel="stylesheet"
          media="screen"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/lightgallery.js/dist/css/lightgallery.min.css"
          }
        />
        <link
          rel="stylesheet"
          href={process.env.PUBLIC_URL + "/assets/back-end/css/toastr.css"}
        />
        <link
          rel="stylesheet"
          media="screen"
          href={process.env.PUBLIC_URL + "/assets/front-end/css/theme.min.css"}
        />
        <link
          rel="stylesheet"
          media="screen"
          href={process.env.PUBLIC_URL + "/assets/front-end/css/slick.css"}
        />
        <link
          rel="stylesheet"
          media="screen"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/css/font-awesome.min.css"
          }
        />
        <link
          rel="stylesheet"
          href={process.env.PUBLIC_URL + "/assets/back-end/css/toastr.css"}
        />
        <link
          rel="stylesheet"
          href={process.env.PUBLIC_URL + "/assets/front-end/css/master.css"}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Titillium+Web:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href={process.env.PUBLIC_URL + "/css/lightbox.css"}
        />
        <link
          rel="stylesheet"
          href={
            process.env.PUBLIC_URL +
            "/assets/back-end/vendor/icon-set/style.css"
          }
        />
        {/*  */}
        <link
          rel="stylesheet"
          href={process.env.PUBLIC_URL + "/assets/front-end/css/home.css"}
        />
        <style type="text/css">
          {`
                .media {
                  background: white;
              }
      
              .section-header {
                  display: flex;
                  justify-content: space-between;
              }
      
              .cz-countdown-days {
                  color: white !important;
                  background-color: #ffffff30;
                  border: .5px solid#3b71de;
                  padding: 0px 6px;
                  border-radius: 3px;
                  margin-right: 0px !important;
                  display: flex;
                flex-direction: column;
                  -ms-flex: .4;  /* IE 10 */  
                  flex: 1;
                  
              }
      
              .cz-countdown-hours {
                  color: white !important;
                  background-color: #ffffff30;
                  border: .5px solid#3b71de;
                  padding: 0px 6px;
                  border-radius: 3px;
                  margin-right: 0px !important;
                  display: flex;
                flex-direction: column;
                  -ms-flex: .4;  /* IE 10 */  
                  flex: 1;
              }
      
              .cz-countdown-minutes {
                  color: white !important;
                  background-color: #ffffff30;
                  border: .5px solid#3b71de;
                  padding: 0px 6px;
                  border-radius: 3px;
                  margin-right: 0px !important;
                  display: flex;
                flex-direction: column;
                  -ms-flex: .4;  /* IE 10 */  
                  flex: 1;
              }
      
              .cz-countdown-seconds {
                  color: white !important;
                  background-color: #ffffff30;
                  border: .5px solid#3b71de;
                  padding: 0px 6px;
                  border-radius: 3px;
                  display: flex;
                flex-direction: column;
                  -ms-flex: .4;  /* IE 10 */  
                  flex: 1;
              }
      
              .flash_deal_product_details .flash-product-price {
                  font-weight: 700;
                  font-size: 18px;
                  color: #3b71de;
              }
      
              .featured_deal_left {
                  height: 130px;
                  background: #3b71de 0% 0% no-repeat padding-box;
                  padding: 10px 13px;
                  text-align: center;
              }
      
              .category_div:hover {
                  color: #f58300;
              }
      
              .deal_of_the_day {
                  /* filter: grayscale(0.5); */
                  /* opacity: .8; */
                  background: #f58300;
                  border-radius: 3px;
              }
      
              .deal-title {
                  font-size: 12px;
      
              }
      
              .for-flash-deal-img img {
                  max-width: none;
              }
              .best-selleing-image {
                  background:#3b71de10;
                  width:30%;
                  display:flex;
                  align-items:center;
                  border-radius: 5px;
              }
              .best-selling-details {
                  padding:10px;
                  width:50%;
              }
              .top-rated-image{
                  background:#3b71de10;
                  width:30%;
                  display:flex;
                  align-items:center;
                  border-radius: 5px;
              }
              .top-rated-details {
                  padding:10px;width:70%;
              }
      
              @media (max-width: 375px) {
                  .cz-countdown {
                      display: flex !important;
      
                  }
      
                  .cz-countdown .cz-countdown-seconds {
      
                      margin-top: -5px !important;
                  }
      
                  .for-feature-title {
                      font-size: 20px !important;
                  }
              }
      
              @media (max-width: 600px) {
                  .flash_deal_title {
                      /*font-weight: 600;*/
                      /*font-size: 18px;*/
                      /*text-transform: uppercase;*/
      
                      font-weight: 700;
                      font-size: 25px;
                      text-transform: uppercase;
                  }
      
                  .cz-countdown .cz-countdown-value {
                      /* font-family: "Roboto", sans-serif; */
                      font-size: 11px !important;
                      font-weight: 700 !important;
                  
                  }
      
                  .featured_deal {
                      opacity: 1 !important;
                  }
      
                  .cz-countdown {
                      display: inline-block;
                      flex-wrap: wrap;
                      font-weight: normal;
                      margin-top: 4px;
                      font-size: smaller;
                  }
      
                  .view-btn-div-f {
      
                      margin-top: 6px;
                      float: right;
                  }
      
                  .view-btn-div {
                      float: right;
                  }
      
                  .viw-btn-a {
                      font-size: 10px;
                      font-weight: 600;
                  }
      
      
                  .for-mobile {
                      display: none;
                  }
      
                  .featured_for_mobile {
                      max-width: 100%;
                      margin-top: 20px;
                      margin-bottom: 20px;
                  }
                  .best-selleing-image {
                      width: 50%;
                      border-radius: 5px;
                  }
                  .best-selling-details {
                      width:50%;
                  }
                  .top-rated-image {
                      width: 50%;
                  }
                  .top-rated-details {
                  width:50%;
              }
              }
      
              
              @media (max-width: 360px) {
                  .featured_for_mobile {
                      max-width: 100%;
                      margin-top: 10px;
                      margin-bottom: 10px;
                  }
      
                  .featured_deal {
                      opacity: 1 !important;
                  }
              }
      
              @media (max-width: 375px) {
                  .featured_for_mobile {
                      max-width: 100%;
                      margin-top: 10px;
                      margin-bottom: 10px;
                  }
      
                  .featured_deal {
                      opacity: 1 !important;
                  }
                  
              }
      
              @media (min-width: 768px) {
                  .displayTab {
                      display: block !important;
                  }
                  
              }
      
              @media (max-width: 800px) {
      
                  .latest-product-margin {
                      margin-left: 0px !important;
                      }
                  .for-tab-view-img {
                      width: 40%;
                  }
      
                  .for-tab-view-img {
                      width: 105px;
                  }
      
                  .widget-title {
                      font-size: 19px !important;
                  }
                  .flash-deal-view-all-web {
                      display: none !important;
                  }
                  .categories-view-all {
                      margin-right: 6px;
                  }
                  .categories-title {
                      margin-left: 6px;
                  }
                  .seller-list-title{
                      margin-left: 10px;
                  }
                  .seller-list-view-all { 
                      margin-right: 10px;
                  }
                  .seller-card {
                      padding-left: 0px !important;
                  }
                  .category-product-view-title {
                      margin-left: -8px;
                  }
                  .category-product-view-all {
                      margin-right: 5px;
                  }
                  .recomanded-product-card {
                      background: #F8FBFD;margin:20px;height: 535px; border-radius: 5px;
                  }
                  .recomanded-buy-button {
                      text-align: center;
                      margin-top: 30px;
                  }
              }
              @media(min-width:801px){
                  .flash-deal-view-all-mobile{
                      display: none !important;
                  }
                  .categories-view-all {
                      margin-right: 27px;
                  }
                  .categories-title {
                      margin-left: 25px;
                  }
                  .seller-list-title{
                      margin-left: 10px;
                  }
                  .seller-list-view-all { 
                      margin-right: 10px;
                  }
                  .seller-card {
                      padding-right:0px !important;
                  }
                  .category-product-view-title {
                      margin-left: -12px;
                  }
                  .category-product-view-all {
                      margin-right: 0px;
                  }
                  .recomanded-product-card {
                      background: #F8FBFD;margin:20px;height: 475px; border-radius: 5px;
                  }
                  .recomanded-buy-button {
                      text-align: center;
                      margin-top: 63px;
                  }
                  
              }
      
              .featured_deal_carosel .carousel-inner {
                  width: 100% !important;
              }
      
              .badge-style2 {
                  color: black !important;
                  background: transparent !important;
                  font-size: 11px;
              }
              .countdown-card{
                  background:#3b71de10;
                  height: 150px!important;
                  border-radius:5px;
                  
              }
              .flash-deal-text{
                  color: #3b71de;
                  text-transform: uppercase;
                  text-align:center;
                  font-weight:700;
                  font-size:20px;
                  border-radius:5px;
                  margin-top:25px;
              }
              .countdown-background{
                  background: #3b71de;
                  padding: 5px 5px;
                  border-radius:5px;
                  margin-top:15px;
              }
              .carousel-wrap{
                  position: relative;
              }
              .owl-nav{
                  top: 40%;
                  position: absolute;
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
              }
           }  
           .owl-prev{
               float: left;
               
           } 
           .owl-next{
               float: right;
           }
           .czi-arrow-left{
              color: #3b71de;
              background: #3b71de10;
              padding: 5px;
              border-radius: 50%;
              margin-left: -12px;
              font-weight: bold;
              font-size: 12px;
           }
           .czi-arrow-right{
              color: #3b71de;
              background: #3b71de10;
              padding: 5px;
              border-radius: 50%;
              margin-right: -15px;
              font-weight: bold;
              font-size: 12px;
           }
          .owl-carousel .nav-btn .czi-arrow-left{
            height: 47px;
            position: absolute;
            width: 26px;
            cursor: pointer;
            top: 100px !important;
        }
        .flash-deals-background-image{
          background: #3b71de10;
          border-radius:5px;
          width:125px;
          height:125px;
        }
        .view-all-text{
          color:#f58300 !important;
          font-size:14px;
        }
        .feature-product-title {
          text-align: center;
          font-size: 22px;
          margin-top: 15px;
          font-style: normal;
          font-weight: 700;
        }
        .feature-product .czi-arrow-left{
              color: #3b71de;
              background: #3b71de10;
              padding: 5px;
              border-radius: 50%;
              margin-left: -80px;
              font-weight: bold;
              font-size: 12px;
           }
           
           .feature-product .owl-nav{
              top: 40%;
              position: absolute;
              display: flex;
              justify-content: space-between;
              /* width: 100%; */
          }
           .feature-product .czi-arrow-right{
              color: #3b71de;
              background: #3b71de10;
              padding: 5px;
              border-radius: 50%;
              margin-right: -80px;
              font-weight: bold;
              font-size: 12px;
           }
           .shipping-policy-web{
              background: #ffffff;width:100%; border-radius:5px;
           }
           .shipping-method-system{
              height: 130px;width: 70%;margin-top: 15px;
           }
      
           .flex-between {
               display: flex;
               justify-content: space-between;
           }      
        `}
        </style>
        <link
          rel="stylesheet"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/css/owl.carousel.min.css"
          }
        />
        <link
          rel="stylesheet"
          href={
            process.env.PUBLIC_URL +
            "/assets/front-end/css/owl.theme.default.min.css"
          }
        />
        <link
          rel="stylesheet"
          href={process.env.PUBLIC_URL + "/assets/front-end/css/home.css"}
        />
        <link
          rel="stylesheet"
          href={
            process.env.PUBLIC_URL + "/assets/front-end/css/responsive1.css"
          }
        />
        <style type="text/css">{`
                body {
                  background-color: #f7f8fa94;
              }
      
              .rtl {
                  direction: ltr;
              }
      
              .password-toggle-btn .password-toggle-indicator:hover {
                  color: #3b71de;
              }
      
              .password-toggle-btn .custom-control-input:checked ~ .password-toggle-indicator {
                  color: #f58300;
              }
      
              .dropdown-item:hover, .dropdown-item:focus {
                  color: #3b71de;
                  text-decoration: none;
                  background-color: rgba(0, 0, 0, 0)
              }
      
              .dropdown-item.active, .dropdown-item:active {
                  color: #f58300;
                  text-decoration: none;
                  background-color: rgba(0, 0, 0, 0)
              }
      
              .topbar a {
                  color: black !important;
              }
      
              .navbar-light .navbar-tool-icon-box {
                  color: #3b71de;
              }
      
              .search_button {
                  background-color: #3b71de;
                  border: none;
              }
      
              .nav-link {
                  // color: white;
                  color: white !important;
              }
      
              .navbar-stuck-menu {
                  background-color: #3b71de;
                  min-height: 0;
                  padding-top: 0;
                  padding-bottom: 0;
              }
      
              .mega-nav {
                  background: white;
                  position: relative;
                  margin-top: 6px;
                  line-height: 17px;
                  width: 304px;
                  border-radius: 3px;
              }
      
              .mega-nav .nav-item .nav-link {
                  padding-top: 11px !important;
                  color: #3b71de                           !important;
                  font-size: 20px;
                  font-weight: 600;
                  padding-left: 20px !important;
              }
      
              .nav-item .dropdown-toggle::after {
                  margin-left: 20px !important;
              }
      
              .navbar-tool-text {
                  padding-left: 5px !important;
                  font-size: 16px;
              }
      
              .navbar-tool-text > small {
                  color: #4b566b !important;
              }
      
              .modal-header .nav-tabs .nav-item .nav-link {
                  color: black !important;
                  /*border: 1px solid #E2F0FF;*/
              }
      
              .checkbox-alphanumeric::after,
              .checkbox-alphanumeric::before {
                  content: '';
                  display: table;
              }
      
              .checkbox-alphanumeric::after {
                  clear: both;
              }
      
              .checkbox-alphanumeric input {
                  left: -9999px;
                  position: absolute;
              }
      
              .checkbox-alphanumeric label {
                  width: 2.25rem;
                  height: 2.25rem;
                  float: left;
                  padding: 0.375rem 0;
                  margin-right: 0.375rem;
                  display: block;
                  color: #818a91;
                  font-size: 0.875rem;
                  font-weight: 400;
                  text-align: center;
                  background: transparent;
                  text-transform: uppercase;
                  border: 1px solid #e6e6e6;
                  border-radius: 2px;
                  -webkit-transition: all 0.3s ease;
                  -moz-transition: all 0.3s ease;
                  -o-transition: all 0.3s ease;
                  -ms-transition: all 0.3s ease;
                  transition: all 0.3s ease;
                  transform: scale(0.95);
              }
      
              .checkbox-alphanumeric-circle label {
                  border-radius: 100%;
              }
      
              .checkbox-alphanumeric label > img {
                  max-width: 100%;
              }
      
              .checkbox-alphanumeric label:hover {
                  cursor: pointer;
                  border-color: #3b71de;
              }
      
              .checkbox-alphanumeric input:checked ~ label {
                  transform: scale(1.1);
                  border-color: red !important;
              }
      
              .checkbox-alphanumeric--style-1 label {
                  width: auto;
                  padding-left: 1rem;
                  padding-right: 1rem;
                  border-radius: 2px;
              }
      
              .d-table.checkbox-alphanumeric--style-1 {
                  width: 100%;
              }
      
              .d-table.checkbox-alphanumeric--style-1 label {
                  width: 100%;
              }
      
              /* CUSTOM COLOR INPUT */
              .checkbox-color::after,
              .checkbox-color::before {
                  content: '';
                  display: table;
              }
      
              .checkbox-color::after {
                  clear: both;
              }
      
              .checkbox-color input {
                  left: -9999px;
                  position: absolute;
              }
      
              .checkbox-color label {
                  width: 2.25rem;
                  height: 2.25rem;
                  float: left;
                  padding: 0.375rem;
                  margin-right: 0.375rem;
                  display: block;
                  font-size: 0.875rem;
                  text-align: center;
                  opacity: 0.7;
                  border: 2px solid #d3d3d3;
                  border-radius: 50%;
                  -webkit-transition: all 0.3s ease;
                  -moz-transition: all 0.3s ease;
                  -o-transition: all 0.3s ease;
                  -ms-transition: all 0.3s ease;
                  transition: all 0.3s ease;
                  transform: scale(0.95);
              }
      
              .checkbox-color-circle label {
                  border-radius: 100%;
              }
      
              .checkbox-color label:hover {
                  cursor: pointer;
                  opacity: 1;
              }
      
              .checkbox-color input:checked ~ label {
                  transform: scale(1.1);
                  opacity: 1;
                  border-color: red !important;
              }
      
              .checkbox-color input:checked ~ label:after {
                  font-family: "Ionicons";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: rgba(255, 255, 255, 0.7);
                  font-size: 14px;
              }
      
              .card-img-top img, figure {
                  max-width: 200px;
                  max-height: 200px !important;
                  vertical-align: middle;
              }
      
              .product-card {
                  box-shadow: 1px 1px 6px #00000014;
                  border-radius: 5px;
              }
      
              .product-card .card-header {
                  text-align: center;
                  background: white 0% 0% no-repeat padding-box;
                  border-radius: 5px 5px 0px 0px;
                  border-bottom: white !important;
              }
      
              .product-title {
                  font-family: 'Roboto', sans-serif !important;
                  font-weight: 400 !important;
                  font-size: 22px !important;
                  color: #000000 !important;
              }
      
              .feature_header span {
                  font-weight: 700;
                  font-size: 25px;
                  text-transform: uppercase;
              }
      
              html[dir="ltr"] .feature_header span {
                  padding-right: 15px;
              }
      
              html[dir="rtl"] .feature_header span {
                  padding-left: 15px;
              }
      
              @media (max-width: 768px ) {
                  .feature_header {
                      margin-top: 0;
                      display: flex;
                      justify-content: flex-start !important;
      
                  }
      
                  .store-contents {
                      justify-content: center;
                  }
      
                  .feature_header span {
                      padding-right: 0;
                      padding-left: 0;
                      font-weight: 700;
                      font-size: 25px;
                      text-transform: uppercase;
                  }
      
                  .view_border {
                      margin: 16px 0px;
                      border-top: 2px solid #E2F0FF !important;
                  }
      
              }
      
              .scroll-bar {
                  max-height: calc(100vh - 100px);
                  overflow-y: auto !important;
              }
      
              ::-webkit-scrollbar-track {
                  box-shadow: inset 0 0 5px white;
                  border-radius: 5px;
              }
      
              ::-webkit-scrollbar {
                  width: 3px;
              }
      
              ::-webkit-scrollbar-thumb {
                  background: rgba(194, 194, 194, 0.38) !important;
                  border-radius: 5px;
              }
      
              ::-webkit-scrollbar-thumb:hover {
                  background: #f58300        !important;
              }
      
              .mobileshow {
                  display: none;
              }
      
              @media  screen and (max-width: 500px) {
                  .mobileshow {
                      display: block;
                  }
              }
      
              [type="radio"] {
                  border: 0;
                  clip: rect(0 0 0 0);
                  height: 1px;
                  margin: -1px;
                  overflow: hidden;
                  padding: 0;
                  position: absolute;
                  width: 1px;
              }
      
              [type="radio"] + span:after {
                  content: '';
                  display: inline-block;
                  width: 1.1em;
                  height: 1.1em;
                  vertical-align: -0.10em;
                  border-radius: 1em;
                  border: 0.35em solid #fff;
                  box-shadow: 0 0 0 0.10em#f58300;
                  margin-left: 0.75em;
                  transition: 0.5s ease all;
              }
      
              [type="radio"]:checked + span:after {
                  background: #f58300;
                  box-shadow: 0 0 0 0.10em#f58300;
              }
      
              [type="radio"]:focus + span::before {
                  font-size: 1.2em;
                  line-height: 1;
                  vertical-align: -0.125em;
              }
      
      
              .checkbox-color label {
                  box-shadow: 0px 3px 6px #0000000D;
                  border: none;
                  border-radius: 3px !important;
                  max-height: 35px;
              }
      
              .checkbox-color input:checked ~ label {
                  transform: scale(1.1);
                  opacity: 1;
                  border: 1px solid #ffb943 !important;
              }
      
              .checkbox-color input:checked ~ label:after {
                  font-family: "Ionicons", serif;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: rgba(255, 255, 255, 0.7);
                  font-size: 14px;
              }
      
              .navbar-tool .navbar-tool-label {
                  position: absolute;
                  top: -.3125rem;
                  right: -.3125rem;
                  width: 1.25rem;
                  height: 1.25rem;
                  border-radius: 50%;
                  background-color: #f58300!important;
                  color: #fff;
                  font-size: .75rem;
                  font-weight: 500;
                  text-align: center;
                  line-height: 1.25rem;
              }
      
              .btn-primary {
                  color: #fff;
                  background-color: #3b71de!important;
                  border-color: #3b71de!important;
              }
      
              .btn-primary:hover {
                  color: #fff;
                  background-color: #3b71de!important;
                  border-color: #3b71de!important;
              }
      
              .btn-secondary {
                  background-color: #f58300!important;
                  border-color: #f58300!important;
              }
      
              .btn-outline-accent:hover {
                  color: #fff;
                  background-color: #3b71de;
                  border-color: #3b71de;
              }
      
              .btn-outline-accent {
                  color: #3b71de;
                  border-color: #3b71de;
              }
      
              .text-accent {
                  font-family: 'Roboto', sans-serif;
                  font-weight: 700;
                  font-size: 18px;
                  color: #3b71de;
              }
      
              a:hover {
                  color: #f58300;
                  text-decoration: none
              }
      
              .active-menu {
                  color: #f58300!important;
              }
      
              .page-item.active > .page-link {
                  box-shadow: 0 0.5rem 1.125rem -0.425rem#3b71de
      
      
              }
      
              .page-item.active .page-link {
                  z-index: 3;
                  color: #fff;
                  background-color: #3b71de;
                  border-color: rgba(0, 0, 0, 0)
              }
      
              .btn-outline-accent:not(:disabled):not(.disabled):active, .btn-outline-accent:not(:disabled):not(.disabled).active, .show > .btn-outline-accent.dropdown-toggle {
                  color: #fff;
                  background-color: #f58300;
                  border-color: #f58300;
              }
      
              .btn-outline-primary {
                  color: #3b71de;
                  border-color: #3b71de;
              }
      
              .btn-outline-primary:hover {
                  color: #fff;
                  background-color: #f58300;
                  border-color: #f58300;
              }
      
              .btn-outline-primary:focus, .btn-outline-primary.focus {
                  box-shadow: 0 0 0 0#f58300;
              }
      
              .btn-outline-primary.disabled, .btn-outline-primary:disabled {
                  color: #6f6f6f;
                  background-color: transparent
              }
      
              .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
                  color: #fff;
                  background-color: #3b71de;
                  border-color: #3b71de;
              }
      
              .btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-primary.dropdown-toggle:focus {
                  box-shadow: 0 0 0 0#3b71de;
              }
      
              .feature_header span {
                  background-color: #fafafc !important
              }
      
              .discount-top-f {
                  position: absolute;
              }
      
              html[dir="ltr"] .discount-top-f {
                  left: 0;
              }
      
              html[dir="rtl"] .discount-top-f {
                  right: 0;
              }
      
              .for-discoutn-value {
                  background: #3b71de;
      
              }
      
              .czi-star-filled {
                  color: #fea569 !important;
              }
      
              .flex-start {
                  display: flex;
                  justify-content: flex-start;
              }
      
              .flex-center {
                  display: flex;
                  justify-content: center;
              }
      
              .flex-around {
                  display: flex;
                  justify-content: space-around;
              }
      
              .flex-between {
                  display: flex;
                  justify-content: space-between;
              }
      
              .row-reverse {
                  display: flex;
                  flex-direction: row-reverse;
              }
      
              .count-value {
                  width: 1.25rem;
                  height: 1.25rem;
                  border-radius: 50%;
                  color: #fff;
                  font-size: 0.75rem;
                  font-weight: 500;
                  text-align: center;
                  line-height: 1.25rem;
              }
      
        `}</style>
        <style type="text/css">
          {`
          .stock-out {
              position: absolute;
              top: 40% !important;
              color: white !important;
              font-weight: 900;
              font-size: 15px;
          }
  
          html[dir="ltr"] .stock-out {
              left: 35% !important;
          }
  
          html[dir="rtl"] .stock-out {
              right: 35% !important;
          }
  
          .product-card {
              height: 100%;
          }
  
          .badge-style {
              left: 75% !important;
              margin-top: -2px !important;
              background: transparent !important;
              color: black !important;
          }
  
          html[dir="ltr"] .badge-style {
              right: 0 !important;
          }
  
          html[dir="rtl"] .badge-style {
              left: 0 !important;
          }
          `}
        </style>
        <style type="text/css">{`
        .dropdown-menu {
            min-width: 304px !important;
            margin-left: -8px !important;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
        }`}</style>
        <style type="text/css">
          {`@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;box-shadow:0 0 .625em #d9d9d9;overflow-y:hidden}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon-text{font-size:2em;font-weight:700;line-height:1em}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:10px;background-color:transparent;z-index:1060;overflow-x:hidden;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem;box-sizing:border-box}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{flex-wrap:wrap;align-items:center;justify-content:center;margin:1.25em auto 0;z-index:1}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{width:2.5em;height:2.5em;margin:.46875em;padding:0;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;box-sizing:border-box;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{display:inline-block;width:15px;height:15px;margin-left:5px;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff;content:'';-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal}.swal2-popup .swal2-styled{margin:.3125em;padding:.625em 2em;font-weight:500;box-shadow:none}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer;overflow:hidden}.swal2-popup .swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;z-index:1;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;font-size:1.125em;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);box-sizing:border-box}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file::-webkit-input-placeholder,.swal2-popup .swal2-input::-webkit-input-placeholder,.swal2-popup .swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::-ms-input-placeholder,.swal2-popup .swal2-input::-ms-input-placeholder,.swal2-popup .swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;margin:1em auto;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:0 .75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;background:#f0f0f0;color:#666;font-size:1em;font-weight:300;overflow:hidden}.swal2-popup .swal2-validation-message::before{display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center;content:'!';zoom:normal}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;zoom:normal}.swal2-icon-text{font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;top:-.25em;left:-.25em;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%;z-index:2;box-sizing:content-box}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);z-index:1}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;height:.3125em;border-radius:.125em;background-color:#a5dc86;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progresssteps{align-items:center;margin:0 0 1.25em;padding:0;font-weight:600}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center;z-index:20}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle{background:#add8e6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{width:2.5em;height:.4em;margin:0 -1px;background:#3085d6;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:initial!important}}`}
        </style>
        {/* BODY PART BELOW */}
        <style type="text/css">{`
        .close {
            z-index: 99;
            background: white !important;
            padding: 3px 8px !important;
            margin: -23px -12px -1rem auto !important;
            border-radius: 50%;
        }
        `}</style>
        <style type="text/css">{`
        .card-body.search-result-box {
            overflow: scroll;
            height: 400px;
            overflow-x: hidden;
        }
    
        .active .seller {
            font-weight: 700;
        }
    
        .for-count-value {
            position: absolute;
    
            right: 0.6875rem;;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            color: #3b71de;
    
            font-size: .75rem;
            font-weight: 500;
            text-align: center;
            line-height: 1.25rem;
        }
    
        .count-value {
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            color: #3b71de;
    
            font-size: .75rem;
            font-weight: 500;
            text-align: center;
            line-height: 1.25rem;
        }
    
        @media (min-width: 992px) {
            .navbar-sticky.navbar-stuck .navbar-stuck-menu.show {
                display: block;
                height: 55px !important;
            }
        }
    
        @media (min-width: 768px) {
            .navbar-stuck-menu {
                background-color: #3b71de;
                line-height: 15px;
                padding-bottom: 6px;
            }
    
        }
    
        @media (max-width: 767px) {
            .search_button {
                background-color: transparent !important;
            }
    
            .search_button .input-group-text i {
                color: #3b71de                              !important;
            }
    
            .navbar-expand-md .dropdown-menu > .dropdown > .dropdown-toggle {
                position: relative;
                padding- right: 1.95rem;
            }
    
            .mega-nav1 {
                background: white;
                color: #3b71de                              !important;
                border-radius: 3px;
            }
    
            .mega-nav1 .nav-link {
                color: #3b71de                              !important;
            }
        }
    
        @media (max-width: 768px) {
            .tab-logo {
                width: 10rem;
            }
        }
    
        @media (max-width: 360px) {
            .mobile-head {
                padding: 3px;
            }
        }
    
        @media (max-width: 471px) {
            .navbar-brand img {
    
            }
    
            .mega-nav1 {
                background: white;
                color: #3b71de                              !important;
                border-radius: 3px;
            }
    
            .mega-nav1 .nav-link {
                color: #3b71de !important;
            }
        }
        #anouncement {
            width: 100%;
            padding: 2px 0;
            text-align: center;
            color:white;
        }`}</style>
        <style type="text/css">{``}</style>
        <script>
          {`
          function myFunction(){" "}
          {$("#anouncement").addClass("d-none").removeClass("d-flex")}
        `}
        </script>
        <style type="text/css">
          {`
            .social-media :hover {
              color: #f58300 !important;
          }
          .widget-list-link{
              color: white !important;
          }
      
          .widget-list-link:hover{
              color: #999898 !important;
          }
          .subscribe-border{
              border-radius: 5px;
          }
          .subscribe-button{
              background: #1B7FED;
              position: absolute;
              top: 0;
              color: white;
              padding: 11px;
              padding-left: 15px;
              padding-right: 15px;
              text-transform: capitalize;
              border: none;
          }
          .start_address{
              display: flex;
              justify-content: space-between;
          }
          .start_address_under_line{
              width: 331px;
          }
          .address_under_line{
              width: 299px;
          }
          .end-footer{
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          @media  only screen and (max-width: 500px) {
              .start_address {
                  display: block;
              }
              .footer-web-logo {
                  justify-content: center !important;
                  padding-bottom: 25px;
              }
              .footer-padding-bottom {
                  padding-bottom: 15px;
              }
              .mobile-view-center-align {
                  justify-content: center !important;
                  padding-bottom: 15px;
              }
              .last-footer-content-align {
                  display: flex !important;
                  justify-content: center !important;
                  padding-bottom: 10px;
              }
          }
          @media  only screen and (max-width: 800px) {
              .end-footer{
                  
                  display: block;
                  
                  align-items: center;
              }
          }
          @media  only screen and (max-width: 1200px) {
              .start_address_under_line {
                  display: none;
              }
              .address_under_line{
                  display: none;
              }
          }`}
        </style>
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/jquery/dist/jquery-2.2.4.min.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/bs-custom-file-input/dist/bs-custom-file-input.min.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/simplebar/dist/simplebar.min.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/tiny-slider/dist/min/tiny-slider.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"
          }
          type="text/javascript"
        />
        <script
          src={process.env.PUBLIC_URL + "/js/lightbox.min.js"}
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/drift-zoom/dist/Drift.min.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/lightgallery.js/dist/js/lightgallery.min.js"
          }
          type="text/javascript"
        />
        <script
          src={
            process.env.PUBLIC_URL +
            "/assets/front-end/vendor/lg-video.js/dist/lg-video.min.js"
          }
          type="text/javascript"
        />
        <script
          src={process.env.PUBLIC_URL + "/assets/back-end/js/toastr.js"}
          type="text/javascript"
        />
        <script
          src={process.env.PUBLIC_URL + "/assets/front-end/js/theme.min.js"}
          type="text/javascript"
        />
        <script
          src={process.env.PUBLIC_URL + "/assets/front-end/js/slick.min.js"}
          type="text/javascript"
        />
        <script
          src={process.env.PUBLIC_URL + "/assets/front-end/js/sweet_alert.js"}
          type="text/javascript"
        />
        <script
          src={process.env.PUBLIC_URL + "/assets/back-end/js/toastr.js"}
          type="text/javascript"
        />
        <script type="text/javascript"></script>
        <script>{`
            function addWishlist(product_id) {
              $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  }
              });
              $.ajax({
                  url: "https://6valley.6amtech.com/store-wishlist",
                  method: 'POST',
                  data: {
                      product_id: product_id
                  },
                  success: function (data) {
                      if (data.value == 1) {
                          Swal.fire({
                              position: 'top-end',
                              type: 'success',
                              title: data.success,
                              showConfirmButton: false,
                              timer: 1500
                          });
                          $('.countWishlist').html(data.count);
                          $('.countWishlist-' + product_id).text(data.product_count);
                          $('.tooltip').html('');
      
                      } else if (data.value == 2) {
                          Swal.fire({
                              type: 'info',
                              title: 'WishList',
                              text: data.error
                          });
                      } else {
                          Swal.fire({
                              type: 'error',
                              title: 'WishList',
                              text: data.error
                          });
                      }
                  }
              });
          }
      
          function removeWishlist(product_id) {
              $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  }
              });
              $.ajax({
                  url: "https://6valley.6amtech.com/delete-wishlist",
                  method: 'POST',
                  data: {
                      id: product_id
                  },
                  beforeSend: function () {
                      $('#loading').show();
                  },
                  success: function (data) {
                      Swal.fire({
                          type: 'success',
                          title: 'WishList',
                          text: data.success
                      });
                      $('.countWishlist').html(data.count);
                      $('#set-wish-list').html(data.wishlist);
                      $('.tooltip').html('');
                  },
                  complete: function () {
                      $('#loading').hide();
                  },
              });
          }
      
          function quickView(product_id) {
              $.get({
                  url: 'https://6valley.6amtech.com/quick-view',
                  dataType: 'json',
                  data: {
                      product_id: product_id
                  },
                  beforeSend: function () {
                      $('#loading').show();
                  },
                  success: function (data) {
                      console.log("success...")
                      $('#quick-view').modal('show');
                      $('#quick-view-modal').empty().html(data.view);
                  },
                  complete: function () {
                      $('#loading').hide();
                  },
              });
          }
      
          function addToCart(form_id = 'add-to-cart-form', redirect_to_checkout=false) {
              if (checkAddToCartValidity()) {
                  $.ajaxSetup({
                      headers: {
                          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                      }
                  });
                  $.post({
                      url: 'https://6valley.6amtech.com/cart/add',
                      data: $('#' + form_id).serializeArray(),
                      beforeSend: function () {
                          $('#loading').show();
                      },
                      success: function (response) {
                          console.log(response);
                          if (response.status == 1) {
                              updateNavCart();
                              toastr.success(response.message, {
                                  CloseButton: true,
                                  ProgressBar: true
                              });
                              $('.call-when-done').click();
                              if(redirect_to_checkout)
                              {
                                  location.href = "https://6valley.6amtech.com/checkout-details";
                              }
                              return false;
                          } else if (response.status == 0) {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Cart',
                                  text: response.message
                              });
                              return false;
                          }
                      },
                      complete: function () {
                          $('#loading').hide();
      
                      }
                  });
              } else {
                  Swal.fire({
                      type: 'info',
                      title: 'Cart',
                      text: 'Please choose all the options'
                  });
              }
          }
      
          function buy_now() {
              addToCart('add-to-cart-form',true);
              /* location.href = "https://6valley.6amtech.com/checkout-details"; */
          }
      
          function currency_change(currency_code) {
              $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  }
              });
              $.ajax({
                  type: 'POST',
                  url: 'https://6valley.6amtech.com/currency',
                  data: {
                      currency_code: currency_code
                  },
                  success: function (data) {
                      toastr.success('Currency changed to' + data.name);
                      location.reload();
                  }
              });
          }
      
          function removeFromCart(key) {
              $.post('https://6valley.6amtech.com/cart/remove', {_token: 'FA6hjTxiS9v1nejluKHeY0imKV8JyjuMnub4tkPq', key: key}, function (response) {
                  console.log(response)
                  updateNavCart();
                  $('#cart-summary').empty().html(response.data);
                  toastr.info('Item has been removed from cart', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              });
          }
      
          function updateNavCart() {
              $.post('https://6valley.6amtech.com/cart/nav-cart-items', {_token: 'FA6hjTxiS9v1nejluKHeY0imKV8JyjuMnub4tkPq'}, function (response) {
                  $('#cart_items').html(response.data);
              });
          }
      
          function cartQuantityInitialize() {
              $('.btn-number').click(function (e) {
                  e.preventDefault();
      
                  fieldName = $(this).attr('data-field');
                  type = $(this).attr('data-type');
                  var input = $("input[name='" + fieldName + "']");
                  var currentVal = parseInt(input.val());
      
                  if (!isNaN(currentVal)) {
                      if (type == 'minus') {
      
                          if (currentVal > input.attr('min')) {
                              input.val(currentVal - 1).change();
                          }
                          if (parseInt(input.val()) == input.attr('min')) {
                              $(this).attr('disabled', true);
                          }
      
                      } else if (type == 'plus') {
      
                          if (currentVal < input.attr('max')) {
                              input.val(currentVal + 1).change();
                          }
                          if (parseInt(input.val()) == input.attr('max')) {
                              $(this).attr('disabled', true);
                          }
      
                      }
                  } else {
                      input.val(0);
                  }
              });
      
              $('.input-number').focusin(function () {
                  $(this).data('oldValue', $(this).val());
              });
      
              $('.input-number').change(function () {
      
                  minValue = parseInt($(this).attr('min'));
                  maxValue = parseInt($(this).attr('max'));
                  valueCurrent = parseInt($(this).val());
      
                  var name = $(this).attr('name');
                  if (valueCurrent >= minValue) {
                      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Cart',
                          text: 'Sorry  the minimum value was reached'
                      });
                      $(this).val($(this).data('oldValue'));
                  }
                  if (valueCurrent <= maxValue) {
                      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Cart',
                          text: 'Sorry  stock limit exceeded.'
                      });
                      $(this).val($(this).data('oldValue'));
                  }
      
      
              });
              $(".input-number").keydown(function (e) {
                  // Allow: backspace, delete, tab, escape, enter and .
                  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                      // Allow: Ctrl+A
                      (e.keyCode == 65 && e.ctrlKey === true) ||
                      // Allow: home, end, left, right
                      (e.keyCode >= 35 && e.keyCode <= 39)) {
                      // let it happen, don't do anything
                      return;
                  }
                  // Ensure that it is a number and stop the keypress
                  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                      e.preventDefault();
                  }
              });
          }
      
          function updateQuantity(key, element) {
              $.post('https://6valley.6amtech.com/cart/updateQuantity', {
                  _token: 'FA6hjTxiS9v1nejluKHeY0imKV8JyjuMnub4tkPq',
                  key: key,
                  quantity: element.value
              }, function (data) {
                  updateNavCart();
                  $('#cart-summary').empty().html(data);
              });
          }
      
          function updateCartQuantity(key) {
              var quantity = $("#cartQuantity" + key).children("option:selected").val();
              $.post('https://6valley.6amtech.com/cart/updateQuantity', {
                  _token: 'FA6hjTxiS9v1nejluKHeY0imKV8JyjuMnub4tkPq',
                  key: key,
                  quantity: quantity
              }, function (response) {
                  if (response.status == 0) {
                      toastr.error(response.message, {
                          CloseButton: true,
                          ProgressBar: true
                      });
                      $("#cartQuantity" + key).val(response['qty']);
                  } else {
                      updateNavCart();
                      $('#cart-summary').empty().html(response);
                  }
              });
          }
      
          $('#add-to-cart-form input').on('change', function () {
              getVariantPrice();
          });
      
          function getVariantPrice() {
              if ($('#add-to-cart-form input[name=quantity]').val() > 0 && checkAddToCartValidity()) {
                  $.ajaxSetup({
                      headers: {
                          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                      }
                  });
                  $.ajax({
                      type: "POST",
                      url: 'https://6valley.6amtech.com/cart/variant_price',
                      data: $('#add-to-cart-form').serializeArray(),
                      success: function (data) {
                          console.log(data)
                          $('#add-to-cart-form #chosen_price_div').removeClass('d-none');
                          $('#add-to-cart-form #chosen_price_div #chosen_price').html(data.price);
                          $('#set-tax-amount').html(data.tax);
                          $('#set-discount-amount').html(data.discount);
                          $('#available-quantity').html(data.quantity);
                          $('.cart-qty-field').attr('max', data.quantity);
                      }
                  });
              }
          }
      
          function checkAddToCartValidity() {
              var names = {};
              $('#add-to-cart-form input:radio').each(function () { // find unique names
                  names[$(this).attr('name')] = true;
              });
              var count = 0;
              $.each(names, function () { // then count them
                  count++;
              });
              if ($('input:radio:checked').length == count) {
                  return true;
              }
              return false;
          }
      
              $(document).ready(function () {
              // $('#popup-modal').appendTo("body").modal('show');
          });
              
          $(".clickable").click(function () {
              window.location = $(this).find("a").attr("href");
              return false;
          });
        `}</script>
        <script>{`
        function couponCode() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: 'https://6valley.6amtech.com/coupon/apply',
                data: $('#coupon-code-ajax').serializeArray(),
                success: function (data) {
                    /* console.log(data);
                    return false; */
                    if (data.status == 1) {
                        let ms = data.messages;
                        ms.forEach(
                            function (m, index) {
                                toastr.success(m, index, {
                                    CloseButton: true,
                                    ProgressBar: true
                                });
                            }
                        );
                    } else {
                        let ms = data.messages;
                        ms.forEach(
                            function (m, index) {
                                toastr.error(m, index, {
                                    CloseButton: true,
                                    ProgressBar: true
                                });
                            }
                        );
                    }
                    setInterval(function () {
                        location.reload();
                    }, 2000);
                }
            });
        }
    
        jQuery(".search-bar-input").keyup(function () {
            $(".search-card").css("display", "block");
            let name = $(".search-bar-input").val();
            if (name.length > 0) {
                $.get({
                    url: 'https://6valley.6amtech.com/searched-products',
                    dataType: 'json',
                    data: {
                        name: name
                    },
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        $('.search-result-box').empty().html(data.result)
                    },
                    complete: function () {
                        $('#loading').hide();
                    },
                });
            } else {
                $('.search-result-box').empty();
            }
        });
    
        jQuery(".search-bar-input-mobile").keyup(function () {
            $(".search-card").css("display", "block");
            let name = $(".search-bar-input-mobile").val();
            if (name.length > 0) {
                $.get({
                    url: 'https://6valley.6amtech.com/searched-products',
                    dataType: 'json',
                    data: {
                        name: name
                    },
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        $('.search-result-box').empty().html(data.result)
                    },
                    complete: function () {
                        $('#loading').hide();
                    },
                });
            } else {
                $('.search-result-box').empty();
            }
        });
    
        jQuery(document).mouseup(function (e) {
            var container = $(".search-card");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();
            }
        });
    
        const img = document.getElementByTagName("img")
        img.addEventListener("error", function (event) {
            event.target.src = {process.env.PUBLIC_URL + 
            
              '/assets/front-end/img/image-place-holder.png';
            }
            event.onerror = null
        })
    
        function route_alert(route, message) {
            Swal.fire({
                title: 'Are you sure?',
                text: message,
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: 'default',
                confirmButtonColor: '#3b71de',
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    location.href = route;
                }
            })
        }
        `}</script>
        <script
          src={
            process.env.PUBLIC_URL + "/assets/front-end/js/owl.carousel.min.js"
          }
          type="text/javascript"
        />
        <script>{`
        $('#flash-deal-slider').owlCarousel({
            loop: false,
            autoplay: false,
            margin: 5,
            nav: true,
            navText: ["<i class='czi-arrow-left'></i>", "<i class='czi-arrow-right'></i>"],
            dots: false,
            autoplayHoverPause: true,
            'ltr': false,
            // center: true,
            responsive: {
                //X-Small
                0: {
                    items: 1
                },
                360: {
                    items: 1
                },
                375: {
                    items: 1
                },
                540: {
                    items: 2
                },
                //Small
                576: {
                    items: 2
                },
                //Medium
                768: {
                    items: 2
                },
                //Large
                992: {
                    items: 2
                },
                //Extra large
                1200: {
                    items: 2
                },
                //Extra extra large
                1400: {
                    items: 3
                }
            }
        })

        $('#web-feature-deal-slider').owlCarousel({
            loop: false,
            autoplay: true,
            margin: 5,
            nav: false,
            //navText: ["<i class='czi-arrow-left'></i>", "<i class='czi-arrow-right'></i>"],
            dots: false,
            autoplayHoverPause: true,
            'ltr': true,
            // center: true,
            responsive: {
                //X-Small
                0: {
                    items: 1
                },
                360: {
                    items: 1
                },
                375: {
                    items: 1
                },
                540: {
                    items: 2
                },
                //Small
                576: {
                    items: 2
                },
                //Medium
                768: {
                    items: 2
                },
                //Large
                992: {
                    items: 2
                },
                //Extra large
                1200: {
                    items: 2
                },
                //Extra extra large
                1400: {
                    items: 2
                }
            }
        })

        $('#new-arrivals-product').owlCarousel({
            loop: true,
            autoplay: false,
            margin: 5,
            nav: true,
            navText: ["<i class='czi-arrow-left'></i>", "<i class='czi-arrow-right'></i>"],
            dots: false,
            autoplayHoverPause: true,
            'ltr': true,
            // center: true,
            responsive: {
                //X-Small
                0: {
                    items: 1
                },
                360: {
                    items: 1
                },
                375: {
                    items: 1
                },
                540: {
                    items: 2
                },
                //Small
                576: {
                    items: 2
                },
                //Medium
                768: {
                    items: 2
                },
                //Large
                992: {
                    items: 2
                },
                //Extra large
                1200: {
                    items: 4
                },
                //Extra extra large
                1400: {
                    items: 4
                }
            }
        })
        `}</script>
        <script>{`
        $('#featured_products_list').owlCarousel({
            loop: true,
                autoplay: false,
                margin: 5,
                nav: true,
                navText: ["<i class='czi-arrow-left'></i>", "<i class='czi-arrow-right'></i>"],
                dots: false,
                autoplayHoverPause: true,
                'ltr': false,
                // center: true,
                responsive: {
                    //X-Small
                    0: {
                        items: 1
                    },
                    360: {
                        items: 1
                    },
                    375: {
                        items: 1
                    },
                    540: {
                        items: 2
                    },
                    //Small
                    576: {
                        items: 2
                    },
                    //Medium
                    768: {
                        items: 3
                    },
                    //Large
                    992: {
                        items: 4
                    },
                    //Extra large
                    1200: {
                        items: 5
                    },
                    //Extra extra large
                    1400: {
                        items: 5
                    }
                }
            });
        `}</script>
        <script>{`
        $('#brands-slider').owlCarousel({
            loop: false,
            autoplay: false,
            margin: 10,
            nav: false,
            'ltr': true,
            //navText: ["<i class='czi-arrow-left'></i>","<i class='czi-arrow-right'></i>"],
            dots: true,
            autoplayHoverPause: true,
            // center: true,
            responsive: {
                //X-Small
                0: {
                    items: 2
                },
                360: {
                    items: 3
                },
                375: {
                    items: 3
                },
                540: {
                    items: 4
                },
                //Small
                576: {
                    items: 5
                },
                //Medium
                768: {
                    items: 7
                },
                //Large
                992: {
                    items: 9
                },
                //Extra large
                1200: {
                    items: 11
                },
                //Extra extra large
                1400: {
                    items: 12
                }
            }
        })
        `}</script>
        <script>{`
        $('#category-slider, #top-seller-slider').owlCarousel({
            loop: false,
            autoplay: false,
            margin: 5,
            nav: false,
            // navText: ["<i class='czi-arrow-left'></i>","<i class='czi-arrow-right'></i>"],
            dots: true,
            autoplayHoverPause: true,
            'ltr': true,
            // center: true,
            responsive: {
                //X-Small
                0: {
                    items: 2
                },
                360: {
                    items: 3
                },
                375: {
                    items: 3
                },
                540: {
                    items: 4
                },
                //Small
                576: {
                    items: 5
                },
                //Medium
                768: {
                    items: 6
                },
                //Large
                992: {
                    items: 8
                },
                //Extra large
                1200: {
                    items: 10
                },
                //Extra extra large
                1400: {
                    items: 11
                }
            }
        })
        `}</script>
      </Helmet>
      <div className="topbar">
        <div className="container">
          <div>
            <div className="topbar-text dropdown d-md-none ml-auto">
              <a
                className="topbar-link"
                href={`tel: ${process.env.REACT_APP_ZAMBET_PHONE || ""}`}
              >
                <i className="fa fa-phone" />
                +1 99999 99999
                {/* {`+${process.env.REACT_APP_ZAMBET_PHONE || ""}`} */}
              </a>
            </div>
            <div className="d-none d-md-block ml-2 text-nowrap">
              <a
                className="topbar-link d-none d-md-inline-block"
                // href={`tel: ${process.env.REACT_APP_ZAMBET_PHONE || ""}`}
              >
                <i className="fa fa-phone" /> +1 99999 99999
              </a>
            </div>
          </div>
          <div>
            {/* <div className="topbar-text dropdown disable-autohide mr-4">
              <a
                className="topbar-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
              >
                <span>USD $</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-left"
                style={{ minWidth: "160px!important", textAlign: "left" }}
              >
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('USD')"
                >
                  USD
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change(' INR')"
                >
                   INR
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('INR')"
                >
                  Indian Rupi
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('EUR')"
                >
                  Euro
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('JPY')"
                >
                  YEN
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('MYR')"
                >
                  Ringgit
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('ZAR')"
                >
                  Rand
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onclick="currency_change('QR')"
                >
                  Qatar
                </li>
              </ul>
            </div> */}
            <div className="topbar-text dropdown disable-autohide  text-capitalize">
              <a
                className="topbar-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
              >
                <img
                  className="mr-2"
                  width={20}
                  src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png"
                  alt="Eng"
                />
                english
              </a>
              <ul
                className="dropdown-menu dropdown-menu-left"
                style={{ textAlign: "left" }}
              >
                <li>
                  <Link className="dropdown-item pb-1" to="">
                    <img
                      className="mr-2"
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png"
                      alt="english"
                    />
                    <span style={{ textTransform: "capitalize" }}>english</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item pb-1" to="">
                    <img
                      className="mr-2"
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/front-end/img/flags/sa.png"
                      alt="Arabic"
                    />
                    <span style={{ textTransform: "capitalize" }}>Arabic</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-sticky bg-light mobile-head">
        <div className="navbar navbar-expand-md navbar-light">
          <div className="container ">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <Link
              className="navbar-brand d-none d-sm-block mr-3 flex-shrink-0"
              to="/"
              style={{
                minWidth: "7rem",
                backgroundColor: "rgb(59, 113, 222)",
              }}
            >
              <img
                style={{ height: "40px", width: "auto" }}
                src="/zambet_logo.png"
                // src="https://6valley.6amtech.com/storage/app/public/company/2022-04-20-625fa32105ddf.png"
                alt="6valley"
              />
            </Link>
            <Link
              className="navbar-brand d-sm-none mr-2"
              to="/"
              style={{
                backgroundColor: "rgb(59, 113, 222)",
              }}
            >
              <img
                style={{
                  height: "38px",
                  width: "auto",
                }}
                className="mobile-logo-img"
                src="/zambet_logo.png"
                // src="https://6valley.6amtech.com/storage/app/public/company/2022-04-20-625f9502c5933.png"
                alt="6valley"
              />
            </Link>
            <div
              className="input-group-overlay d-none d-md-block mx-4"
              style={{ textAlign: "left" }}
            >
              <input
                className="form-control appended-form-control search-bar-input"
                type="text"
                autoComplete="off"
                placeholder="Search"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="input-group-append-overlay search_button"
                style={{
                  borderRadius: "0px 7px 7px 0px",
                  left: "unset",
                  right: 0,
                  top: 0,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/products?search=${search}`);
                }}
              >
                <span className="input-group-text" style={{ fontSize: "20px" }}>
                  <i className="czi-search text-white" />
                </span>
              </button>
              <input name="data_from" defaultValue="search" hidden />
              <input name="page" defaultValue={1} hidden />
              <div
                className="card search-card"
                style={{
                  position: "absolute",
                  background: "white",
                  zIndex: 999,
                  width: "100%",
                  display: "none",
                }}
              >
                <div
                  className="card-body search-result-box"
                  style={{
                    overflow: "scroll",
                    height: "400px",
                    overflowX: "hidden",
                  }}
                />
              </div>
            </div>
            <div
              className="navbar-toolbar d-flex flex-shrink-0 align-items-center"
              style={{ marginRight: "10px" }}
            >
              <a className="navbar-tool navbar-stuck-toggler" href="#">
                <span className="navbar-tool-tooltip">Expand menu</span>
                <div className="navbar-tool-icon-box">
                  <i className="navbar-tool-icon czi-menu" />
                </div>
              </a>
              <div className="navbar-tool dropdown ml-3">
                <Link
                  className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                  to="/wishlists"
                >
                  <span className="navbar-tool-label">
                    <span className="countWishlist">
                      {state?.userWishlistCount || 0}
                    </span>
                  </span>
                  <i className="navbar-tool-icon czi-heart" />
                </Link>
              </div>
              <div className="dropdown">
                <a
                  className="navbar-tool ml-3"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="navbar-tool-icon-box bg-secondary">
                    <div className="navbar-tool-icon-box bg-secondary">
                      {!!state?.userProfile?.user_photo ? (
                        <img
                          id="viewer"
                          className="avatar-img"
                          src={state?.userProfile?.user_photo || profileImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = profileImage;
                          }}
                          style={{
                            borderRadius: "50%",
                          }}
                          alt="Image"
                        />
                      ) : (
                        <i className="navbar-tool-icon czi-user" />
                      )}
                    </div>
                  </div>
                  {state.isUserLoggedIn ? (
                    <div className="navbar-tool-text">
                      <small>
                        Hello, {state?.userProfile?.first_name || "..."}
                      </small>
                      Dashboard
                    </div>
                  ) : null}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-left"
                  aria-labelledby="dropdownMenuButton"
                  style={{ textAlign: "left" }}
                >
                  {state.isUserLoggedIn ? (
                    <>
                      <Link className="dropdown-item" to="/account-oder">
                        My Order
                      </Link>
                      <Link className="dropdown-item" to="/user-account">
                        My Profile
                      </Link>
                      {/* <Link className="dropdown-item" to="/subscriptions/list">
                        My Subscriptions
                      </Link> */}
                      <div className="dropdown-divider" />
                      <Link
                        className="dropdown-item"
                        to="/customer/auth/logout"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="dropdown-item" to="/customer/auth/login">
                        <i className="fa fa-sign-in mr-2" /> Sign in
                      </Link>

                      <div className="dropdown-divider" />
                      <Link
                        className="dropdown-item"
                        to="/customer/auth/register"
                      >
                        <i className="fa fa-user-circle mr-2" />
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div id="cart_items">
                <div
                  className="navbar-tool dropdown ml-3"
                  style={{ marginRight: "6px" }}
                >
                  <Link
                    className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                    to="/shop-cart"
                    // onClick={(e) => {
                    //   if (!state.isUserLoggedIn) {
                    //     alert("Login to Continue");
                    //     e.preventDefault();
                    //     // e.stopPropagation();
                    //   }
                    // }}
                  >
                    <span className="navbar-tool-label">
                      {state?.userCartCount || 0}
                    </span>
                    <i className="navbar-tool-icon czi-cart" />
                  </Link>
                  <Link className="navbar-tool-text ml-2" to="/shop-cart">
                    <small>My cart</small>
                    ₹0.0
                  </Link>

                  {/* {isCartEmpty ? (
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      style={{ width: "20rem" }}
                    >
                      <div className="widget widget-cart px-3 pt-2 pb-3">
                        <div className="widget-cart-item">
                          <h6 className="text-danger text-center">
                            <i className="fa fa-cart-arrow-down" /> Empty Cart
                          </h6>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      style={{ width: "20rem" }}
                    >
                      <div className="widget widget-cart px-3 pt-2 pb-3">
                        <div
                          style={{ height: "15rem" }}
                          data-simplebar="init"
                          data-simplebar-auto-hide="false"
                        >
                          <div
                            className="simplebar-wrapper"
                            style={{ margin: "0px" }}
                          >
                            <div className="simplebar-height-auto-observer-wrapper">
                              <div className="simplebar-height-auto-observer" />
                            </div>
                            <div className="simplebar-mask">
                              <div
                                className="simplebar-offset"
                                style={{ right: "0px", bottom: "0px" }}
                              >
                                <div
                                  className="simplebar-content-wrapper"
                                  style={{ height: "auto", overflow: "hidden" }}
                                >
                                  <div
                                    className="simplebar-content"
                                    style={{ padding: "0px" }}
                                  >
                                    <div className="widget-cart-item pb-2">
                                      <button
                                        className="close text-danger "
                                        type="button"
                                        onclick="removeFromCart(1652363602)"
                                        aria-label="Remove"
                                      >
                                        <span aria-hidden="true">×</span>
                                      </button>
                                      <div className="media">
                                        <a
                                          className="d-block mr-2"
                                          href="/product/product-1-9x9CNa"
                                        >
                                          <img
                                            width={64}
                                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625f76257cdf2.png"
                                            alt="Product"
                                          />
                                        </a>
                                        <div className="media-body">
                                          <h6 className="widget-product-title">
                                            <a href="/product/product-1-9x9CNa">
                                              Classic Sneakers For Men
                                            </a>
                                          </h6>
                                          <span style={{ fontSize: "14px" }}>
                                            color : Amethyst
                                          </span>
                                          <br />
                                          <span style={{ fontSize: "14px" }}>
                                            type : a
                                          </span>
                                          <br />
                                          <div className="widget-product-meta">
                                            <span className="text-muted mr-2">
                                              x 1
                                            </span>
                                            <span className="text-accent mr-2">
                                              ₹450.0
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="simplebar-placeholder"
                              style={{ width: "0px", height: "0px" }}
                            />
                          </div>
                          <div
                            className="simplebar-track simplebar-horizontal"
                            style={{ visibility: "hidden" }}
                          >
                            <div
                              className="simplebar-scrollbar simplebar-visible"
                              style={{ width: "0px", display: "none" }}
                            />
                          </div>
                          <div
                            className="simplebar-track simplebar-vertical"
                            style={{ visibility: "hidden" }}
                          >
                            <div
                              className="simplebar-scrollbar simplebar-visible"
                              style={{ height: "0px", display: "none" }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
                          <div className="font-size-sm mr-2 float-right py-2 ">
                            <span className>Subtotal :</span>
                            <span className="text-accent font-size-base ml-1">
                              ₹450.0
                            </span>
                          </div>
                          <a
                            className="btn btn-outline-secondary btn-sm"
                            href="/shop-cart"
                          >
                            Expand cart
                            <i className="czi-arrow-right ml-1 mr-n1" />
                          </a>
                        </div>
                        <a
                          className="btn btn-primary btn-sm btn-block"
                          href="/checkout-details"
                        >
                          <i className="czi-card mr-2 font-size-base align-middle" />
                          Checkout
                        </a>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-expand-md navbar-stuck-menu">
          <div
            className="container"
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
            <div
              className="collapse navbar-collapse"
              id="navbarCollapse"
              style={{ textAlign: "left", backgroundColor: "#3b71de" }}
            >
              <div className="input-group-overlay d-md-none my-3">
                <form className="search_form">
                  <input
                    className="form-control appended-form-control search-bar-input-mobile"
                    type="text"
                    autoComplete="off"
                    placeholder="Search"
                    name="name"
                  />
                  <input name="data_from" defaultValue="search" hidden />
                  <input name="page" defaultValue={1} hidden />
                  <button
                    className="input-group-append-overlay search_button"
                    type="submit"
                    style={{
                      borderRadius: "0px 7px 7px 0px",
                      left: "unset",
                      right: 0,
                    }}
                  >
                    <span
                      className="input-group-text"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="czi-search text-white" />
                    </span>
                  </button>
                  <div
                    className="card search-card"
                    style={{
                      position: "absolute",
                      background: "white",
                      zIndex: 999,
                      width: "100%",
                      display: "none",
                    }}
                  >
                    <div
                      className="card-body search-result-box"
                      id
                      style={{
                        overflow: "scroll",
                        height: "400px",
                        overflowX: "hidden",
                      }}
                    />
                  </div>
                </form>
              </div>
              <ul className="navbar-nav mega-nav pr-2 pl-2 mr-2 d-none d-xl-block ">
                <li className="nav-item ">
                  <a
                    className="nav-link pl-0"
                    href="#"
                    data-toggle="dropdown"
                    style={{ pointerEvents: "none" }}
                  >
                    <i className="czi-menu align-middle mt-n1 mr-2" />
                    <span
                      style={{
                        marginLeft: "40px !important",
                        marginRight: "50px",
                      }}
                    >
                      Categories
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    style={{
                      right: "0%",
                      // display: "none",
                      display:
                        location.pathname === "/" &&
                        windowSize.innerWidth > 1024
                          ? "block"
                          : "none",
                      marginTop: "8px",
                      // marginRight: "11px",
                      border: "1px solid #ccccccb3",
                      borderBottomLeftRadius: "5px",
                      borderBottomRightRadius: "5px",
                      boxShadow: "none",
                      minWidth: "303px ",
                      marginLeft: "1px",
                      textAlign: "left",
                      paddingBottom: "0px",
                    }}
                  >
                    {mainState?.resHome?.topcategoryproduct?.length ? (
                      mainState?.resHome?.topcategoryproduct
                        ?.slice(0, 8)
                        ?.map((item2) => (
                          <li id={item2._id} className="dropdown">
                            <Link
                              className="dropdown-item flex-between"
                              data-toggle="dropdown"
                              to={`/products?categoryId=${item2?._id}`}
                            >
                              <div>
                                <img
                                  src={
                                    item2?.category_icon || dummyProductImage
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = dummyProductImage;
                                  }}
                                  // src={item2?.category_icon}
                                  style={{ width: "18px", height: "18px" }}
                                />
                                <span className="pl-3">{`${truncate(
                                  item2?.category_name
                                )}`}</span>
                              </div>
                              {/* <div>
                              <i
                                className="czi-arrow-right"
                                style={{
                                  fontSize: "8px !important",
                                  background: "none !important",
                                  color: "#4B5864",
                                }}
                              />
                            </div> */}
                            </Link>
                            {/* <ul
                            className="dropdown-menu"
                            style={{ right: "100%", textAlign: "left" }}
                          >
                            <li className="dropdown">
                              <a
                                className="dropdown-item flex-between"
                                href="javascript:"
                                onclick="location.href='https://6valley.6amtech.com/products?id=18&data_from=category&page=1'"
                              >
                                <div>
                                  <span className="pl-3">Dress</span>
                                </div>
                              </a>
                            </li>
                            <li className="dropdown">
                              <a
                                className="dropdown-item flex-between"
                                data-toggle="dropdown"
                                href="javascript:"
                                onclick="location.href='https://6valley.6amtech.com/products?id=17&data_from=category&page=1'"
                              >
                                <div>
                                  <span className="pl-3">shoes</span>
                                </div>
                                <div>
                                  <i
                                    className="czi-arrow-right"
                                    style={{
                                      fontSize: "8px !important",
                                      background: "none !important",
                                      color: "#4B5864",
                                    }}
                                  />
                                </div>
                              </a>
                              <ul
                                className="dropdown-menu"
                                style={{ right: "100%", textAlign: "left" }}
                              >
                                <li>
                                  <Link
                                    className="dropdown-item"
                                    to="/products?id=21&data_from=category&page=1"
                                  >
                                    regular wear
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          </ul> */}
                          </li>
                        ))
                    ) : (
                      <li className="dropdown">
                        <center>
                          <ClipLoader
                            // color={"#ffffff"}
                            // loading={!!camps}
                            loading
                            // cssOverride={override}
                            // size={150}
                          />
                        </center>
                      </li>
                    )}
                    {/* <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=27&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566cf5b061b.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Bags &amp; Shoes</span>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=28&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566ccdee31c.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Home, Pet &amp; Appliances
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=26&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d207d809.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Phones &amp; Telecom</span>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=25&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d467ae3c.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Computer, Office &amp; Security
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=16&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c96e5edc.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Beauty, Health &amp; Hair
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        data-toggle="dropdown"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=15&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c1958ba3.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Jewelry &amp; Watches</span>
                        </div>
                        <div>
                          <i
                            className="czi-arrow-right"
                            style={{
                              fontSize: "8px !important",
                              background: "none !important",
                              color: "#4B5864",
                            }}
                          />
                        </div>
                      </a>
                      <ul
                        className="dropdown-menu"
                        style={{ right: "100%", textAlign: "left" }}
                      >
                        <li className="dropdown">
                          <a
                            className="dropdown-item flex-between"
                            data-toggle="dropdown"
                            href="javascript:"
                            onclick="location.href='https://6valley.6amtech.com/products?id=19&data_from=category&page=1'"
                          >
                            <div>
                              <span className="pl-3">jewelry</span>
                            </div>
                            <div>
                              <i
                                className="czi-arrow-right"
                                style={{
                                  fontSize: "8px !important",
                                  background: "none !important",
                                  color: "#4B5864",
                                }}
                              />
                            </div>
                          </a>
                          <ul
                            className="dropdown-menu"
                            style={{ right: "100%", textAlign: "left" }}
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/products?id=22&data_from=category&page=1"
                              >
                                test 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/products?id=23&data_from=category&page=1"
                              >
                                test 2
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown">
                          <a
                            className="dropdown-item flex-between"
                            href="javascript:"
                            onclick="location.href='https://6valley.6amtech.com/products?id=20&data_from=category&page=1'"
                          >
                            <div>
                              <span className="pl-3">watches</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        data-toggle="dropdown"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=11&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b4deaba6.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Women's fashion</span>
                        </div>
                        <div>
                          <i
                            className="czi-arrow-right"
                            style={{
                              fontSize: "8px !important",
                              background: "none !important",
                              color: "#4B5864",
                            }}
                          />
                        </div>
                      </a>
                      <ul
                        className="dropdown-menu"
                        style={{ right: "100%", textAlign: "left" }}
                      >
                        <li className="dropdown">
                          <a
                            className="dropdown-item flex-between"
                            href="javascript:"
                            onclick="location.href='https://6valley.6amtech.com/products?id=18&data_from=category&page=1'"
                          >
                            <div>
                              <span className="pl-3">Dress</span>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown">
                          <a
                            className="dropdown-item flex-between"
                            data-toggle="dropdown"
                            href="javascript:"
                            onclick="location.href='https://6valley.6amtech.com/products?id=17&data_from=category&page=1'"
                          >
                            <div>
                              <span className="pl-3">shoes</span>
                            </div>
                            <div>
                              <i
                                className="czi-arrow-right"
                                style={{
                                  fontSize: "8px !important",
                                  background: "none !important",
                                  color: "#4B5864",
                                }}
                              />
                            </div>
                          </a>
                          <ul
                            className="dropdown-menu"
                            style={{ right: "100%", textAlign: "left" }}
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/products?id=21&data_from=category&page=1"
                              >
                                regular wear
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item flex-between"
                        href="javascript:"
                        onclick="location.href='https://6valley.6amtech.com/products?id=13&data_from=category&page=1'"
                      >
                        <div>
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566bd73a8d3.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Outdoor Fun &amp; Sports</span>
                        </div>
                      </a>
                    </li> */}
                    <Link
                      className="dropdown-item text-capitalize"
                      to="/categories"
                      style={{ color: "#3b71de !important", left: "29%" }}
                    >
                      View more
                      <i
                        className="czi-arrow-right"
                        style={{
                          fontSize: "8px !important",
                          background: "none !important",
                          color: "#4B5864",
                        }}
                      />
                    </Link>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav mega-nav1 pr-2 pl-2 d-block d-xl-none">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle pl-0"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <i className="czi-menu align-middle mt-n1 mr-2" />
                    <span style={{ marginLeft: "20px !important" }}>
                      Categories
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    style={{ right: "0%", textAlign: "left" }}
                  >
                    {mainState?.resHome?.topcategoryproduct?.length ? (
                      mainState?.resHome?.topcategoryproduct?.map((item2) => (
                        <li className="dropdown">
                          <Link
                            className="dropdown-item"
                            to={`/products?categoryId=${item2?._id}`}
                          >
                            <img
                              src={item2?.category_icon || dummyProductImage}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = dummyProductImage;
                              }}
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">{`${truncate(
                              item2?.category_name
                            )}`}</span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                    {/* 
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=27&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566cf5b061b.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Bags &amp; Shoes</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=28&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566ccdee31c.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Home, Pet &amp; Appliances</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=26&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d207d809.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Phones &amp; Telecom</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=25&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d467ae3c.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">
                          Computer, Office &amp; Security
                        </span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=16&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c96e5edc.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Beauty, Health &amp; Hair</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item dropdown-toggle "
                        data-toggle="dropdown"
                        to="/products?id=15&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c1958ba3.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Jewelry &amp; Watches</span>
                      </Link>
                      <ul
                        className="dropdown-menu"
                        style={{ right: "100%", textAlign: "left" }}
                      >
                        <li className="dropdown">
                          <Link
                            className="dropdown-item dropdown-toggle "
                            data-toggle="dropdown"
                            to="/products?id=19&data_from=category&page=1"
                          >
                            <span className="pl-3">jewelry</span>
                          </Link>
                          <ul
                            className="dropdown-menu"
                            style={{ right: "100%", textAlign: "left" }}
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/products?id=22&data_from=category&page=1"
                              >
                                test 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/products?id=23&data_from=category&page=1"
                              >
                                test 2
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown">
                          <Link
                            className="dropdown-item  "
                            to="/products?id=20&data_from=category&page=1"
                          >
                            <span className="pl-3">watches</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item dropdown-toggle "
                        data-toggle="dropdown"
                        to="/products?id=11&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b4deaba6.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Women's fashion</span>
                      </Link>
                      <ul
                        className="dropdown-menu"
                        style={{ right: "100%", textAlign: "left" }}
                      >
                        <li className="dropdown">
                          <Link
                            className="dropdown-item  "
                            to="/products?id=18&data_from=category&page=1"
                          >
                            <span className="pl-3">Dress</span>
                          </Link>
                        </li>
                        <li className="dropdown">
                          <Link
                            className="dropdown-item dropdown-toggle "
                            data-toggle="dropdown"
                            to="/products?id=17&data_from=category&page=1"
                          >
                            <span className="pl-3">shoes</span>
                          </Link>
                          <ul
                            className="dropdown-menu"
                            style={{ right: "100%", textAlign: "left" }}
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/products?id=21&data_from=category&page=1"
                              >
                                regular wear
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=13&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566bd73a8d3.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Outdoor Fun &amp; Sports</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=12&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b6cd3e60.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Men's fashion</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=14&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566bf812223.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">Toys , Kids &amp; Babies</span>
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        className="dropdown-item  "
                        to="/products?id=24&data_from=category&page=1"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566cb386b60.png"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="pl-3">
                          Home Improvement &amp; Tools
                        </span>
                      </Link>
                    </li>
                     */}
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav" style={{}}>
                <li className="nav-item dropdown active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    data-toggle="dropdown"
                  >
                    All Brands
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-left scroll-bar"
                    style={{ textAlign: "left" }}
                  >
                    {mainState?.resAllBrands?.length ? (
                      mainState?.resAllBrands?.map((item) => (
                        <li
                          style={{
                            borderBottom: "1px solid #e3e9ef",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <Link
                              className="dropdown-item"
                              to={`/products?brandId=${item?._id}`}
                            >
                              {`${item?.brand_name}`}
                            </Link>
                          </div>
                          <div className="align-baseline"></div>
                        </li>
                      ))
                    ) : (
                      <li>Loading...</li>
                    )}
                    {/*                     
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=16&data_from=brand&page=1"
                        >
                          test
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=15&data_from=brand&page=1"
                        >
                          abc
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=14&data_from=brand&page=1"
                        >
                          Vivatiqo
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=13&data_from=brand&page=1"
                        >
                          Axxelus
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=12&data_from=brand&page=1"
                        >
                          Modentum
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=11&data_from=brand&page=1"
                        >
                          Framerce
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=10&data_from=brand&page=1"
                        >
                          Crave
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=9&data_from=brand&page=1"
                        >
                          Dynamova
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=8&data_from=brand&page=1"
                        >
                          The Wall
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=7&data_from=brand&page=1"
                        >
                          TrueMake
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=6&data_from=brand&page=1"
                        >
                          Centre Point
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=5&data_from=brand&page=1"
                        >
                          Arkohub
                        </Link>
                      </div>
                      <div className="align-baseline">
                        <span className="count-value px-2">( 6 )</span>
                      </div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=4&data_from=brand&page=1"
                        >
                          Tell us
                        </Link>
                      </div>
                      <div className="align-baseline"></div>
                    </li>
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/products?id=1&data_from=brand&page=1"
                        >
                          Great Hall
                        </Link>
                      </div>
                      <div className="align-baseline">
                        <span className="count-value px-2">( 14 )</span>
                      </div>
                    </li> */}
                    <li
                      style={{
                        borderBottom: "1px solid #e3e9ef",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <Link
                          className="dropdown-item"
                          to="/brands"
                          style={{ color: "#3b71de !important" }}
                        >
                          View more
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown active">
                  <Link
                    className="nav-link text-capitalize"
                    // to="/products?data_from=discounted&page=1"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item dropdown active">
                  <Link className="nav-link" to="sellers">
                    All Sellers
                  </Link>
                </li>
                <li className="nav-item dropdown open">
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{
                        color: "white",
                        marginTop: "5px",
                        // paddingLeft: 0,
                      }}
                    >
                      Seller Zone
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        minWidth: "165px !important",
                        textAlign: "left",
                      }}
                    >
                      <Link className="dropdown-item" to="/shop/apply">
                        Become a Seller
                      </Link>
                      <div className="dropdown-divider" />
                      <Link className="dropdown-item" to="/seller/auth/login">
                        Seller Login
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown active">
                  <Link className="nav-link text-capitalize" to="/blogs/list">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CustomerHeader;
