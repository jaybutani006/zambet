import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  //
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";
import { RWebShare } from "react-web-share";
import Helmet from "react-helmet";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//
import { Context } from "context/newContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomerLogin from "./customer-login";
import { NavItem } from "react-bootstrap";
import bannerImage from "./bannerImage.png";
import dummyProductImage from "assets/dummyProductImage.png";
import dummyCompanyLogo from "assets/dummyCompanyLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import { truncate } from "utils/truncateText";
import Rating from "react-rating";
// import ReactQuill from "components/editor/QuillEditor";
import ReactQuill from "react-quill";
import ReactImageMagnify from "react-image-magnify";
import Magnifier from "./CustomerMagnifier";
import { defaultAPIErrorHandler } from "api/api";

//

function Product() {
  const handleSharing = async () => {
    const canonical = document.querySelector("link[rel=canonical]");
    let url = canonical ? canonical.href : document.location.href;
    let title = "My Web Share Adventures";
    let text = "Hello World! I shared this content via Web Share";

    const shareDetails = { url, title, text };

    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };
  //
  const [quillText, setQuillText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  //
  const [mainState, setMainState] = useState({
    resProduct: {
      pdesc: "",
    },
    productId:
      location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
      "",
    quantity: 1,
    totalPrice: 0,
    resWishList: [],
    resWishListDelete: [],
    isWishList: false,
    review: 0,
    stock: 0,
  });

  const [avgCount, setAvgCount] = useState(0);
  const [resReviews, setResReviews] = useState([]);

  const [currentTab, setCurrentTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setMainState((prev) => ({
        ...prev,
        [name]: +value <= 0 ? 0 : +value,
        totalPrice: +value <= 0 ? 0 : +value * prev.resProduct.selling_price,
      }));
    }
  };

  const increaseQuantity = () => {
    setMainState((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
      totalPrice: (prev.quantity + 1) * prev.resProduct.selling_price,
    }));
  };

  const decreaseQuantity = () => {
    setMainState((prev) => ({
      ...prev,
      quantity: +prev.quantity <= 1 ? 1 : prev.quantity - 1,
      totalPrice:
        +prev.quantity <= 1
          ? prev.resProduct.selling_price
          : (prev.quantity - 1) * prev.resProduct.selling_price,
    }));
  };

  const apiHandleAddToCart = () => {
    let data = {
      product_id: mainState.productId,
      quantity: mainState.quantity,
    };

    let config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch({
          type: "SET_USER_CART_COUNT",
          userCartCount: (+state.userCartCount || 0) + 1,
        });
        setMainState((prev) => ({
          ...prev,
          resCarts: response.data,
        }));
        alert("Added to Cart Successfully");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const apiGetResProductReviews = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/Reviews/productReview",
      headers: {
        Authorization: state.userToken,
      },
      params: {
        product_id:
          location?.pathname?.substring(
            location?.pathname?.lastIndexOf("/") + 1
          ) || "",
      },
    })
      .then((response) => {
        console.log(response.data);
        setResReviews(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetResProduct = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/productdetail",
      params: {
        product_id:
          location?.pathname?.substring(
            location?.pathname?.lastIndexOf("/") + 1
          ) || "",
      },
      headers: {
        Authorization: state?.userToken || "",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resProduct: response.data.data[0],
          totalPrice: response.data.data[0]?.selling_price || 0,
          quantity: 1,
          isWishList: response.data.data[0]?.wishlist || false,
          review: response.data.data[0]?.Review || 0,
          stock: 1,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error);
      });
  };

  const apiHandleWishList = () => {
    let config = {};

    if (!!mainState.isWishList) {
      config = {
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/wishlists",
        headers: {
          Authorization: state.userToken,
          "Content-Type": "application/json",
        },
        params: {
          product_id: mainState.productId,
        },
      };
    } else {
      config = {
        method: "post",
        url: process.env.REACT_APP_BASEURL + "/api/wishlists",
        headers: {
          Authorization: state.userToken,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          pid: mainState.productId,
        }),
      };
    }

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const newIsWishList = !!mainState.isWishList;
        setMainState((prev) => ({
          ...prev,
          resWishList: response.data,
          isWishList: !prev.isWishList,
        }));

        dispatch({
          type: "SET_USER_WISHLIST_COUNT",
          userWishlistCount: !newIsWishList
            ? +state.userWishlistCount + 1
            : +state.userWishlistCount - 1,
        });

        alert(
          `${!newIsWishList
            ? "Success: Added to Wishlist"
            : "Success: Removed from Wishlist"
          }`
        );
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    setMainState((prev) => ({
      ...prev,
      productId:
        location?.pathname?.substring(
          location?.pathname?.lastIndexOf("/") + 1
        ) || "",
    }));
    apiGetResProduct();
    apiGetResProductReviews();
  }, [location.pathname]);

  useEffect(() => {
    setAvgCount(
      resReviews.reduce((acc, item) => (acc += +item.Star), 0) /
      (+resReviews.length || 1)
    );
  }, [resReviews]);

  return (
    <>
      <div className="container mt-4 rtl" style={{ textAlign: "left" }}>
        <Helmet>
          <link
            rel="stylesheet"
            media="screen"
            href={
              process.env.PUBLIC_URL +
              "/assets/front-end/css/product-details.css"
            }
          />
        </Helmet>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        .msg-option {\n            display: none;\n        }\n\n        .chatInputBox {\n            width: 100%;\n        }\n\n        .go-to-chatbox {\n            width: 100%;\n            text-align: center;\n            padding: 5px 0px;\n            display: none;\n        }\n\n        .feature_header {\n            display: flex;\n            justify-content: center;\n        }\n\n        .btn-number:hover {\n            color: #f58300;\n\n        }\n\n        .for-total-price {\n            margin- left: -30%;\n        }\n\n        .feature_header span {\n            padding- left: 15px;\n            font-weight: 700;\n            font-size: 25px;\n            background-color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .flash-deals-background-image{\n            background: #3b71de10;\n            border-radius:5px;\n            width:125px;\n            height:125px;\n        }\n\n        @media (max-width: 768px) {\n            .feature_header span {\n                margin-bottom: -40px;\n            }\n\n            .for-total-price {\n                padding- left: 30%;\n            }\n\n            .product-quantity {\n                padding- left: 4%;\n            }\n\n            .for-margin-bnt-mobile {\n                margin- right: 7px;\n            }\n\n            .font-for-tab {\n                font-size: 11px !important;\n            }\n\n            .pro {\n                font-size: 13px;\n            }\n        }\n\n        @media (max-width: 375px) {\n            .for-margin-bnt-mobile {\n                margin- right: 3px;\n            }\n\n            .for-discount {\n                margin- left: 10% !important;\n            }\n\n            .for-dicount-div {\n                margin-top: -5%;\n                margin- right: -7%;\n            }\n\n            .product-quantity {\n                margin- left: 4%;\n            }\n\n        }\n\n        @media (max-width: 500px) {\n            .for-dicount-div {\n                margin-top: -4%;\n                margin- right: -5%;\n            }\n\n            .for-total-price {\n                margin- left: -20%;\n            }\n\n            .view-btn-div {\n\n                margin-top: -9%;\n                float: right;\n            }\n\n            .for-discount {\n                margin- left: 7%;\n            }\n\n            .viw-btn-a {\n                font-size: 10px;\n                font-weight: 600;\n            }\n\n            .feature_header span {\n                margin-bottom: -7px;\n            }\n\n            .for-mobile-capacity {\n                margin- left: 7%;\n            }\n        }\n    ",
          }}
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "#st-1 {\n  font-family: \"Helvetica Neue\", Verdana, Helvetica, Arial, sans-serif;;\n  direction: ltr;\n  display: block;\n  opacity: 1;\n  text-align: center;\n  z-index: 94034;\n}\n#st-1.st-animated {\n  -moz-transition: o 0.2s ease-in, p 0.2s ease-in, a 0.2s ease-in, c 0.2s ease-in, i 0.2s ease-in, t 0.2s ease-in, y 0.2s ease-in; -ms-transition: o 0.2s ease-in, p 0.2s ease-in, a 0.2s ease-in, c 0.2s ease-in, i 0.2s ease-in, t 0.2s ease-in, y 0.2s ease-in; -o-transition: o 0.2s ease-in, p 0.2s ease-in, a 0.2s ease-in, c 0.2s ease-in, i 0.2s ease-in, t 0.2s ease-in, y 0.2s ease-in; -webkit-transition: o 0.2s ease-in, p 0.2s ease-in, a 0.2s ease-in, c 0.2s ease-in, i 0.2s ease-in, t 0.2s ease-in, y 0.2s ease-in; transition: o 0.2s ease-in, p 0.2s ease-in, a 0.2s ease-in, c 0.2s ease-in, i 0.2s ease-in, t 0.2s ease-in, y 0.2s ease-in;\n}\n#st-1.st-hidden {\n  opacity: 0;\n}\n#st-1.st-hide {\n  display: none;\n}\n#st-1 .st-btn {\n  -moz-box-sizing: border-box;\n-webkit-box-sizing: border-box;\nbox-sizing: border-box;\n  -moz-transition: opacity 0.2s ease-in, top 0.2s ease-in; -ms-transition: opacity 0.2s ease-in, top 0.2s ease-in; -o-transition: opacity 0.2s ease-in, top 0.2s ease-in; -webkit-transition: opacity 0.2s ease-in, top 0.2s ease-in; transition: opacity 0.2s ease-in, top 0.2s ease-in;\n  -moz-border-radius: 4px;\n-webkit-border-radius: 4px;\nborder-radius: 4px;\n  border: none;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 12px;\n  height: 32px;\n  line-height: 32px;\n  margin-right: 8px;\n  padding: 0 10px;\n  position: relative;\n  text-align: center;\n  top: 0;\n  vertical-align: top;\n  white-space: nowrap;\n}\n#st-1 .st-btn:last-child {\n  margin-right: 0;\n}\n#st-1 .st-btn > svg {\n  height: 16px;\n  width: 16px;\n  position: relative;\n  top: 8px;\n  vertical-align: top;\n}\n#st-1 .st-btn > img {\n  display: inline-block;\n  height: 16px;\n  width: 16px;\n  position: relative;\n  top: 8px;\n  vertical-align: top;\n}\n#st-1 .st-btn > span {\n  -moz-transition: all 0.2s ease-in; -ms-transition: all 0.2s ease-in; -o-transition: all 0.2s ease-in; -webkit-transition: all 0.2s ease-in; transition: all 0.2s ease-in;\n  color: #fff;\n  display: inline-block;\n  font-weight: 500;\n  letter-spacing: 0.5px;\n  min-width: 60px;\n  opacity: 1;\n  padding: 0 6px;\n  position: relative;\n  vertical-align: top;\n}\n#st-1.st-has-labels .st-btn {\n  min-width: 120px;\n}\n#st-1.st-has-labels .st-btn.st-remove-label {\n  min-width: 50px;\n}\n#st-1.st-has-labels .st-btn.st-remove-label > span {\n  display: none;\n}\n#st-1.st-has-labels .st-btn.st-hide-label > span {\n  display: none;\n}\n#st-1 .st-total {\n  color: #555;\n  display: inline-block;\n  font-weight: 500;\n  line-height: 12px;\n  margin-right: 0;\n  max-width: 80px;\n  padding: 4px 8px;\n  text-align: center;\n}\n#st-1 .st-total.st-hidden {\n  display: none;\n}\n#st-1 .st-total > span {\n  font-size: 16px;\n  line-height: 17px;\n  display: block;\n  padding: 0;\n}\n#st-1 .st-total > span.st-shares {\n  font-size: 9px;\n  line-height: 9px;\n}\n#st-1.st-justified {\n  display: flex;\n  text-align: center;\n}\n#st-1.st-justified .st-btn {\n  -moz-flex: 1;\n-ms-flex: 1;\n-webkit-flex: 1;\nflex: 1;\n}#st-1 .st-btn:hover {\n  opacity: .8;\n  top: -4px;\n}#st-1 .st-btn[data-network='facebook'] {\n  background-color: #4267B2\n}\n#st-1 .st-btn[data-network='facebook'] img {\n  filter: \n}\n#st-1 .st-btn[data-network='facebook'] > span {\n  color: #fff\n}\n#st-1 .st-btn[data-network='twitter'] {\n  background-color: #55acee\n}\n#st-1 .st-btn[data-network='twitter'] img {\n  filter: \n}\n#st-1 .st-btn[data-network='twitter'] > span {\n  color: #fff\n}\n#st-1 .st-btn[data-network='pinterest'] {\n  background-color: #CB2027\n}\n#st-1 .st-btn[data-network='pinterest'] img {\n  filter: \n}\n#st-1 .st-btn[data-network='pinterest'] > span {\n  color: #fff\n}\n#st-1 .st-btn[data-network='email'] {\n  background-color: #7d7d7d\n}\n#st-1 .st-btn[data-network='email'] img {\n  filter: \n}\n#st-1 .st-btn[data-network='email'] > span {\n  color: #fff\n}\n#st-1 .st-btn[data-network='sms'] {\n  background-color: #ffbd00\n}\n#st-1 .st-btn[data-network='sms'] img {\n  filter: \n}\n#st-1 .st-btn[data-network='sms'] > span {\n  color: #fff\n}\n#st-1 .st-btn[data-network='sharethis'] {\n  background-color: #95D03A\n}\n#st-1 .st-btn[data-network='sharethis'] img {\n  filter: \n}\n#st-1 .st-btn[data-network='sharethis'] > span {\n  color: #fff\n}#st-1 .st-btn[data-network='snapchat'] > span {\n  color: #333};\n}",
          }}
        />
        <div className="row" style={{ direction: "ltr" }}>
          <div className="col-md-9 col-12">
            {/* <div className="row">
              <div className="col-lg-5 col-md-4 col-12">
                <div className="cz-product-gallery">
                  <div className="cz-preview">
                    <div className="cz-preview-item d-flex align-items-center justify-content-center active">
                      <Magnifier
                        className="cz-image-zoom img-responsive"
                        imgSrc="https://images.unsplash.com/photo-1542856204-00101eb6def4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                        imgWidth={975}
                        imgHeight={1300}
                        magnifierRadius={100}
                      />
                      <Zoom>
                        <img
                          alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                          src="https://images.unsplash.com/photo-1444065381814-865dc9da92c0"
                          width="100%"
                        />
                      </Zoom>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            isFluidWidth: true,
                            src: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0",
                          },
                          largeImage: {
                            src: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0",
                            width: 1200,
                            height: 1800,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-lg-5 col-md-4 col-12">
                <div className="cz-product-gallery">
                  <div className="cz-preview">
                    <div
                      className="cz-preview-item d-flex align-items-center justify-content-center active"
                      id="image0"
                    >
                      <Magnifier
                        className="cz-image-zoom img-responsive"
                        imgSrc={
                          mainState?.resProduct?.pphoto?.[currentImageIndex || 0]?.image ||
                          dummyProductImage
                        }
                        imgWidth={"100%"}
                        imgHeight={"100%"}
                        magnifierRadius={150}
                      />
                      {/* <img
                        className="cz-image-zoom img-responsive"
                        style={{ width: "100%", maxHeight: "323px" }}
                        src={
                          mainState?.resProduct?.pphoto?.[0]?.image ||
                          dummyProductImage
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyProductImage;
                        }}
                        data-zoom={mainState?.resProduct?.pphoto?.[0]?.image}
                        alt="Product image"
                        width
                      /> */}
                    </div>
                  </div>
                  <div className="cz">
                    <div>
                      <div className="row">
                        <div
                          className="table-responsive"
                          data-simplebar="init"
                          style={{ maxHeight: "515px", padding: "1px" }}
                        >
                          <div
                            className="simplebar-wrapper"
                            style={{ margin: "-1px 0px -1px -1px" }}
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
                                // style={{ height: "auto", overflow: "hidden" }}
                                >
                                  <div
                                    className="simplebar-content"
                                    style={{ padding: "1px 0px 1px 1px" }}
                                  >
                                    <div
                                      className="d-flex"
                                      style={{ paddingLeft: "3px" }}
                                    >
                                      {
                                        !!mainState?.resProduct?.pphoto?.length &&
                                        mainState?.resProduct?.pphoto?.map((item, index) =>
                                          <div className="cz-thumblist">
                                            <a
                                              className={currentImageIndex === index ? "cz-thumblist-item  active d-flex align-items-center justify-content-center" :
                                                "cz-thumblist-item  d-flex align-items-center justify-content-center"}
                                            // href="#image0"
                                              onClick={e => {
                                                e.preventDefault()
                                                setCurrentImageIndex(index)
                                              }}
                                            >
                                              <img
                                                src={
                                                  item?.image || dummyProductImage
                                                }
                                                onError={({ currentTarget }) => {
                                                  currentTarget.onerror = null; // prevents looping
                                                  currentTarget.src =
                                                    dummyProductImage;
                                                }}
                                                alt="Product thumb"
                                              />
                                            </a>

                                          </div>
                                        )
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="simplebar-placeholder"
                              style={{ width: "394px", height: "86px" }}
                            />
                          </div>
                          <div
                            className="simplebar-track simplebar-horizontal"
                            style={{ visibility: "hidden" }}
                          >
                            <div
                              className="simplebar-scrollbar"
                              style={{ width: "0px", display: "none" }}
                            />
                          </div>
                          <div
                            className="simplebar-track simplebar-vertical"
                            style={{ visibility: "hidden" }}
                          >
                            <div
                              className="simplebar-scrollbar"
                              style={{ height: "0px", display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}
                {/* <div className="cz-product-gallery">
                  <div className="cz-preview">
                    <div
                      className="cz-preview-item d-flex align-items-center justify-content-center active"
                      id="image0"
                    >
                      <div
                        className="d-flex"
                        style={{
                          top: "0px",
                          position: "absolute",
                          left: "0px",
                          background: "#3b71de",
                        }}
                      >
                        <span
                          className="for-discoutn-value p-1 pl-2 pr-2"
                          style={{
                            borderRadius: "5px 0px",
                            color: "white",
                            fontSize: "10px",
                          }}
                        >
                          {mainState?.product_stock <= 0
                            ? "Out Of Stock"
                            : `${(
                                (((+mainState?.resProduct?.display_price || 0) -
                                  (+mainState?.resProduct?.selling_price ||
                                    0)) *
                                  100) /
                                (+mainState?.resProduct?.selling_price || 1)
                              ).toFixed(0)}% Off`}
                        </span>
                      </div>
                      <img
                        className="cz-image-zoom img-responsive"
                        style={{ width: "100%", height: "auto" }}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyProductImage;
                        }}
                        src={mainState?.resProduct?.pphoto?.[0]?.image}
                        // src="https://6valley.6amtech.com/storage/app/public/product/2022-04-13-62566ecb46b07.png"
                        data-zoom="https://6valley.6amtech.com/storage/app/public/product/2022-04-13-62566ecb46b07.png"
                        alt=""
                        width
                      />

                      <div className="cz-image-zoom-pane" />
                    </div>
                  </div>
                  <div className="cz">
                    <div>
                      <div className="row">
                        <div
                          className="table-responsive"
                          data-simplebar="init"
                          style={{ maxHeight: "515px", padding: "1px" }}
                        >
                          <div
                            className="simplebar-wrapper"
                            style={{ margin: "-1px 0px -1px -1px" }}
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
                                    style={{ padding: "1px 0px 1px 1px" }}
                                  >
                                    <div
                                      className="d-flex"
                                      style={{ paddingLeft: "3px" }}
                                    >
                                      <div className="cz-thumblist">
                                        <a
                                          className="cz-thumblist-item  active d-flex align-items-center justify-content-center "
                                          href="#image0"
                                        >
                                          <img
                                            src={
                                              mainState?.resProduct?.pphoto?.[0]
                                                ?.image
                                            }
                                            onError={({ currentTarget }) => {
                                              currentTarget.onerror = null; // prevents looping
                                              currentTarget.src =
                                                "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png";
                                            }}
                                            // src="https://6valley.6amtech.com/storage/app/public/product/2022-04-13-62566ecb46b07.png"
                                            alt="Product thumb"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="simplebar-placeholder"
                              style={{ width: "394px", height: "86px" }}
                            />
                          </div>
                          <div
                            className="simplebar-track simplebar-horizontal"
                            style={{ visibility: "hidden" }}
                          >
                            <div
                              className="simplebar-scrollbar"
                              style={{ width: "0px", display: "none" }}
                            />
                          </div>
                          <div
                            className="simplebar-track simplebar-vertical"
                            style={{ visibility: "hidden" }}
                          >
                            <div
                              className="simplebar-scrollbar"
                              style={{ height: "0px", display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div
                className="col-lg-7 col-md-8 col-12 mt-md-0 mt-sm-3"
                style={{ direction: "ltr" }}
              >
                <div className="details">
                  <span
                    className="mb-2"
                    style={{ fontSize: "22px", fontWeight: 700 }}
                  >
                    {mainState?.resProduct?.pname || "...."}
                  </span>
                  <div className="d-flex align-items-center mb-2 pro">
                    <span
                      className="d-inline-block  align-middle mt-1 mr-md-2 mr-sm-0 pr-2"
                      style={{ color: "#FE961C" }}
                    >
                      {avgCount.toFixed(0)}
                      {/* {Math.round((avgCount || 1) * 2) / 2} */}
                    </span>
                    <div
                      className="star-rating"
                      style={{ marginRight: "25px" }}
                    >
                      {[0, 0, 0, 0, 0].map((item, index) => (
                        <i
                          className={
                            index + 1 < avgCount
                              ? "sr-star czi-star-filled font-size-sm mr-1"
                              : "sr-star czi-star font-size-sm mr-1"
                          }
                        // style={{
                        //   color: "#fea569",
                        // }}
                        />
                      ))}
                      {/* <i className="sr-star czi-star" />
                      <i className="sr-star czi-star" />
                      <i className="sr-star czi-star" />
                      <i className="sr-star czi-star" />
                      <i className="sr-star czi-star" /> */}
                    </div>
                    <span
                      style={{ fontWeight: 400 }}
                      className="font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-1 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1"
                    >
                      {mainState?.resProduct?.review || 0} Reviews
                    </span>
                    <span
                      style={{
                        width: "0px",
                        height: "10px",
                        border: "0.5px solid #707070",
                        marginTop: "6px",
                        fontWeight: "400 !important",
                      }}
                    />
                    <span
                      style={{ fontWeight: 400 }}
                      className="font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-1 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1"
                    >
                      {0} Orders
                    </span>
                    <span
                      style={{
                        width: "0px",
                        height: "10px",
                        border: "0.5px solid #707070",
                        marginTop: "6px",
                        fontWeight: 400,
                      }}
                    >
                      {" "}
                    </span>
                    <span
                      style={{ fontWeight: 400 }}
                      className=" font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-0 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1 text-capitalize"
                    >
                      {0} Wish listed
                    </span>
                  </div>
                  <div className="mb-3">
                    <strike style={{ color: "#E96A6A" }} className="mr-3">
                      ₹{mainState?.resProduct?.display_price}
                    </strike>
                    <span className="h3 font-weight-normal text-accent ">
                      ₹{mainState?.resProduct?.selling_price}
                    </span>
                    <span
                      className="ml-2"
                      style={{ fontSize: "12px", fontWeight: 400 }}
                    >
                      (<span>Tax : </span>
                      <span id="set-tax-amount">₹0.0</span>)
                    </span>
                  </div>
                  <form id="add-to-cart-form" className="mb-2">
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz"
                    />{" "}
                    <input type="hidden" name="id" defaultValue={4} />
                    <div>

                    </div>
                    {/* <div className="position-relative mr-n4 mb-2">
                      <div className="flex-start">
                        <div className="product-description-label mt-2 text-body">
                          Color:
                        </div>
                        <div>
                          <ul
                            className="list-inline checkbox-color mb-1 flex-start ml-2"
                            style={{ paddingLeft: 0 }}
                          >
                            <div>
                              <li>
                                <input
                                  type="radio"
                                  id="4-color-0"
                                  name="color"
                                  defaultValue="#00FFFF"
                                  defaultChecked
                                />
                                <label
                                  style={{ background: "#00FFFF" }}
                                  htmlFor="4-color-0"
                                  data-toggle="tooltip"
                                  data-original-title
                                  title
                                />
                              </li>
                            </div>
                            <div>
                              <li>
                                <input
                                  type="radio"
                                  id="4-color-1"
                                  name="color"
                                  defaultValue="#7FFFD4"
                                />
                                <label
                                  style={{ background: "#7FFFD4" }}
                                  htmlFor="4-color-1"
                                  data-toggle="tooltip"
                                  data-original-title
                                  title
                                />
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-start mx-0">
                      <div className="product-description-label text-body mt-2 pr-2">
                        type :
                      </div>
                      <div>
                        <ul
                          className="list-inline checkbox-alphanumeric checkbox-alphanumeric--style-1 mb-2 mx-1 flex-start row"
                          style={{ paddingLeft: 0 }}
                        >
                          <div>
                            <li className="for-mobile-capacity">
                              <input
                                type="radio"
                                id="choice_2-s"
                                name="choice_2"
                                defaultValue="s"
                                defaultChecked
                              />
                              <label
                                style={{ fontSize: "12px" }}
                                htmlFor="choice_2-s"
                              >
                                s
                              </label>
                            </li>
                          </div>
                          <div>
                            <li className="for-mobile-capacity">
                              <input
                                type="radio"
                                id="choice_2-              l"
                                name="choice_2"
                                defaultValue="              l"
                              />
                              <label
                                style={{ fontSize: "12px" }}
                                htmlFor="choice_2-              l"
                              >
                                {" "}
                                l
                              </label>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div> */}
                    <div className="row no-gutters">
                      <div>
                        <div
                          className="product-description-label text-body"
                          style={{ marginTop: "10px" }}
                        >
                          Quantity:
                        </div>
                      </div>
                      <div>
                        <div className="product-quantity d-flex justify-content-between align-items-center">
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ width: "160px", color: "#3b71de" }}
                          >
                            <span className="input-group-btn" style={{}}>
                              <button
                                className="btn btn-number"
                                type="button"
                                data-type="minus"
                                data-field="quantity"
                                style={{ padding: "10px", color: "#3b71de" }}
                                onClick={decreaseQuantity}
                              >
                                -
                              </button>
                            </span>
                            <input
                              type="number"
                              name="quantity"
                              className="form-control input-number text-center cart-qty-field"
                              // placeholder={1}
                              // defaultValue={1}
                              // min={1}
                              // max={3}
                              style={{
                                padding: "0px !important",
                                width: "40%",
                                height: "25px",
                              }}
                              value={mainState.quantity}
                              onChange={handleInputChange}
                            />
                            <span className="input-group-btn">
                              <button
                                className="btn btn-number"
                                type="button"
                                data-type="plus"
                                data-field="quantity"
                                style={{ padding: "10px", color: "#3b71de" }}
                                onClick={increaseQuantity}
                              >
                                +
                              </button>
                            </span>
                          </div>
                          <div className="float-right" id="chosen_price_div">
                            <div className="d-flex justify-content-center align-items-center mr-2">
                              <div className="product-description-label">
                                <strong>Total price</strong> :{" "}
                              </div>
                              <strong id="chosen_price">
                                ₹{mainState?.totalPrice}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-start no-gutters d-none mt-2">
                      <div className="col-12"></div>
                    </div>
                    <div className="d-flex justify-content-start mt-2 mb-3">
                      <button
                        className="btn element-center btn-gap-right"
                        onclick="buy_now()"
                        type="button"
                        style={{
                          width: "37%",
                          height: "45px",
                          background: "#FFA825",
                          color: "#ffffff",
                        }}
                      >
                        <span className="string-limit">Book now</span>
                      </button>
                      <button
                        className="btn btn-primary element-center btn-gap-right"
                        name="addtocart"
                        onclick="addToCart()"
                        type="button"
                        disabled={mainState?.resProduct?.product_stock < 1}
                        // disabled={mainState?.stock < 1}
                        onClick={(e) => {
                          if (!state.isUserLoggedIn) {
                            // alert("Please Login to continue");
                            navigate("/customer/auth/login");
                          } else {
                            apiHandleAddToCart(e);
                          }
                        }}
                        style={{
                          width: "37%",
                          height: "45px",
                          marginLeft: "20px",
                        }}
                      >
                        <span className="string-limit">
                          {mainState?.resProduct?.product_stock < 1 ? "Out Of Stock" : "Add to cart"}
                          {/* {mainState?.stock < 1 ? "Out Of Stock" : "Add to cart"} */}
                        </span>
                      </button>
                      <button
                        type="button"
                        onclick="addWishlist('4')"
                        // onClick={() => console.log("Honey")}
                        onClick={(e) => {
                          if (!state.isUserLoggedIn) {
                            // alert("Please Login to continue");
                            navigate("/customer/auth/login");
                          } else {
                            apiHandleWishList(e);
                          }
                        }}
                        className="btn for-hover-bg"
                        style={{ color: "#f58300", fontSize: "18px" }}
                      >
                        <i
                          className={
                            mainState.isWishList
                              ? "fa fa-heart"
                              : "fa fa-heart-o"
                          }
                          aria-hidden="true"
                        />
                        {/* <span className="countWishlist-4">1</span> */}
                      </button>
                    </div>
                  </form>
                  <div
                    style={{ textAlign: "left" }}
                    className="sharethis-inline-share-buttons st-center st-has-labels  st-inline-share-buttons st-animated"
                    id="st-1"
                  >
                    {/* <div className="st-total st-hidden">
                      <span className="st-label" />
                      <span className="st-shares">Shares</span>
                    </div> */}

                    <FacebookShareButton
                      className="mr-1"
                      children={
                        <div
                          className="st-btn st-first st-remove-label"
                          data-network="facebook"
                          style={{ display: "inline-block" }}
                        >
                          <img
                            alt="facebook sharing button"
                            src="https://platform-cdn.sharethis.com/img/facebook.svg"
                          />
                          <span className="st-label">Share</span>
                        </div>
                      }
                      url={window.location.href}
                    />
                    <PinterestShareButton
                      className="mr-1"
                      children={
                        <div
                          className="st-btn st-remove-label"
                          data-network="pinterest"
                          style={{ display: "inline-block" }}
                        >
                          <img
                            alt="pinterest sharing button"
                            src="https://platform-cdn.sharethis.com/img/pinterest.svg"
                          />
                          <span className="st-label">Pin</span>
                        </div>
                      }
                      url={window.location.href}
                      media={window.location.href}
                    />
                    <EmailShareButton
                      className="mr-1"
                      children={
                        <div
                          className="st-btn st-remove-label"
                          data-network="email"
                          style={{ display: "inline-block" }}
                        >
                          <img
                            alt="email sharing button"
                            src="https://platform-cdn.sharethis.com/img/email.svg"
                          />
                          <span className="st-label">Email</span>
                        </div>
                      }
                      url={window.location.href}
                    />
                    <RWebShare
                      className="mr-1"
                      data={{
                        text: "",
                        url: `${window.location.href || ""}`,
                        title: "",
                      }}
                      onClick={() => console.log("shared successfully!")}
                      disableNative
                    >
                      {/* <button>Share 🔗</button> */}
                      <div
                        className="st-btn st-last st-remove-label"
                        data-network="sharethis"
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          handleSharing();
                        }}
                      >
                        <img
                          alt="sharethis sharing button"
                          src="https://platform-cdn.sharethis.com/img/sharethis.svg"
                        />
                        <span className="st-label">Share</span>
                      </div>
                    </RWebShare>
                    {/* <div
                      className="st-btn st-remove-label"
                      data-network="twitter"
                      style={{ display: "inline-block" }}
                    >
                      <img
                        alt="twitter sharing button"
                        src="https://platform-cdn.sharethis.com/img/twitter.svg"
                      />
                      <span className="st-label">Tweet</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mt-4 rtl col-12" style={{ textAlign: "left" }}>
                <div className="row">
                  <div className="col-12">
                    <div className=" mt-1">
                      <ul
                        className="nav nav-tabs d-flex justify-content-center"
                        role="tablist"
                        style={{
                          marginTop: "35px",
                          border: "none",
                          marginBottom: "1.25rem",
                        }}
                      >
                        <li className="nav-item mr-2">
                          <a
                            // className={
                            //   currentTab === "overview"
                            //     ? "nav-link active"
                            //     : "nav-link"
                            // }
                            // href="#overview"
                            // data-toggle="tab"
                            // role="tab"
                            style={
                              currentTab === "overview"
                                ? {
                                  color: "black !important",
                                  fontWeight: 400,
                                  fontSize: "24px",
                                  padding: "12px 20px",
                                  // marginBottom: "16px",
                                  borderBottom:
                                    "2px solid rgb(254, 105, 106)",
                                }
                                : {
                                  color: "black",
                                  fontWeight: 400,
                                  fontSize: "24px",
                                  padding: "12px 20px",
                                  // marginBottom: "16px",
                                  // borderBottomColor: "rgb(254, 105, 106)",
                                }
                            }
                            onClick={() => setCurrentTab("overview")}
                          >
                            Overview
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            // className={
                            //   currentTab === "reviews"
                            //     ? "nav-link active"
                            //     : "nav-link"
                            // }
                            // href="#reviews"
                            // data-toggle="tab"
                            // role="tab"
                            style={
                              currentTab === "reviews"
                                ? {
                                  color: "black !important",
                                  fontWeight: 400,
                                  fontSize: "24px",
                                  padding: "12px 20px",
                                  // marginBottom: "16px",
                                  borderBottom:
                                    "2px solid rgb(254, 105, 106)",
                                }
                                : {
                                  color: "black",
                                  fontWeight: 400,
                                  fontSize: "24px",
                                  padding: "12px 20px",
                                  // marginBottom: "16px",
                                  // borderBottomColor: "rgb(254, 105, 106)",
                                }
                            }
                            onClick={() => setCurrentTab("reviews")}
                          >
                            Reviews
                          </a>
                        </li>
                      </ul>
                      <div
                        className="px-4 pt-lg-3 pb-3 mb-3 mr-0 mr-md-2"
                        style={{
                          background: "#ffffff",
                          borderRadius: "10px",
                          minHeight: "817px",
                        }}
                      >
                        <div className="tab-content px-lg-3">
                          {currentTab === "overview" && (
                            <div
                              className="tab-pane fade show active"
                              id="overview"
                              role="tabpanel"
                            >
                              <div className="row pt-2 specification">
                                <div
                                  className="text-body col-lg-12 col-md-12"
                                  style={{ overflow: "auto" }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        mainState?.resProduct?.pdesc || "",
                                    }}
                                  ></div>
                                  {/* <ReactQuill
                                    placeholder={"Start Posting Something"}
                                    onChange={(val) =>
                                      setMainState((prev) => ({
                                        ...prev,
                                        resProduct: {
                                          ...prev.resProduct,
                                          pdesc: val,
                                        },
                                      }))
                                    }
                                  /> */}

                                  {/* <h3>
                                    Specifications of OLEVS 5563{" "}
                                    {mainState?.resProduct?.pname || "...."}
                                  </h3>
                                  <ul>
                                    <li>Brand - OLEVS</li>
                                    <li>SKU - 183922704_BD-1128752672</li>
                                    <li>Strap Material - Alloy</li>
                                    <li>Model - 5563</li>
                                    <li>Dial Size -40mm</li>
                                    <li>Watch Type - Analouge</li>
                                    <li>Movement - Japanese Quartz</li>
                                    <li>Watch Movement Country - China</li>
                                    <li>Watch's Water Resistance - 300m</li>
                                  </ul>
                                  <p>60% Cotton, 40% Polyester</p>
                                  <ul>
                                    <li>Imported</li>
                                    <li>Zipper closure</li>
                                    <li>Machine Wash</li>
                                    <li>
                                      This quarter-zip up top in incredibly soft
                                      and comfortable French terry fleece is a
                                      go-to for an easy, casual look
                                    </li>
                                    <li>
                                      Features long-sleeves, patch front
                                      kangaroo pocket, high collar, and ribbing
                                      at the neck, cuffs and hem
                                    </li>
                                    <li>
                                      Everyday made better: we listen to
                                      customer feedback and fine-tune every
                                      detail to ensure quality, fit, and comfort
                                    </li>
                                  </ul>
                                  <h2>Product details</h2>
                                  <ul>
                                    <li>
                                      Package Dimensions :&nbsp;12.44 x 11.89 x
                                      1.89 inches; 10.58 Ounces
                                    </li>
                                    <li>Item model number :&nbsp;AE18111988</li>
                                    <li>Department :&nbsp;Womens</li>
                                    <li>
                                      Date First Available :&nbsp;February 6,
                                      2020
                                    </li>
                                    <li>
                                      Manufacturer :&nbsp;Amazon Essentials
                                    </li>
                                    <li>ASIN :&nbsp;B07W6NPBVV</li>
                                  </ul> */}
                                </div>
                              </div>
                            </div>
                          )}
                          {currentTab === "reviews" && (
                            <div
                              className="tab-pane fade show active"
                              id="reviews"
                              role="tabpanel"
                            >
                              <div className="row pt-2 pb-3">
                                <div className="col-lg-4 col-md-5 ">
                                  <div className=" row d-flex justify-content-center align-items-center">
                                    <div className="col-12 d-flex justify-content-center align-items-center">
                                      <h2
                                        className="overall_review mb-2"
                                        style={{
                                          fontWeight: 500,
                                          fontSize: "50px",
                                        }}
                                      >
                                        {resReviews?.length}
                                      </h2>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center star-rating ">
                                      {[0, 0, 0, 0, 0].map((item, index) => (
                                        <i
                                          className={
                                            index + 1 < avgCount
                                              ? "sr-star czi-star-filled font-size-sm mr-1"
                                              : "sr-star czi-star font-size-sm mr-1"
                                          }
                                        // style={{
                                        //   color: "#fea569",
                                        // }}
                                        />
                                      ))}
                                      {/* {[, , , ,].map((item, index) => {
                                        const avgCount =
                                          resReviews.reduce(
                                            (acc, item) => (acc += +item.Star),
                                            0
                                          ) / +resReviews.length || 1;

                                        return (
                                        );
                                      })} */}
                                      {/* <i className="czi-star font-size-sm text-muted mr-1" />
                                      <i className="czi-star font-size-sm text-muted mr-1" />
                                      <i className="czi-star font-size-sm text-muted mr-1" />
                                      <i className="czi-star font-size-sm text-muted mr-1" />
                                      <i className="czi-star font-size-sm text-muted mr-1" /> */}
                                    </div>
                                    <div className="col-12 d-flex justify-content-center align-items-center mt-2">
                                      <span className="text-center">
                                        {resReviews?.length} Ratings
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-8 col-md-7 pt-sm-3 pt-md-0">
                                  <div className="row d-flex align-items-center mb-2 font-size-sm">
                                    <div className="col-3 text-nowrap ">
                                      <span className="d-inline-block align-middle text-body">
                                        Excellent
                                      </span>
                                    </div>
                                    <div className="col-8">
                                      <div
                                        className="progress text-body"
                                        style={{ height: "5px" }}
                                      >
                                        <div
                                          className="progress-bar "
                                          role="progressbar"
                                          style={{
                                            backgroundColor:
                                              "#3b71de !important",
                                            width: resReviews?.length
                                              ? `${(resReviews.reduce(
                                                (acc, item) =>
                                                  +item.Star > 4 &&
                                                    +item.Star <= 5
                                                    ? (acc += 1)
                                                    : acc,
                                                0
                                              ) *
                                                100) /
                                              resReviews?.length || 1
                                              }%`
                                              : "0%",
                                          }}
                                          aria-valuenow={60}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1 text-body">
                                      <span className=" ml-3 float-right ">
                                        {resReviews?.length
                                          ? resReviews.reduce(
                                            (acc, item) =>
                                              +item.Star > 4 &&
                                                +item.Star <= 5
                                                ? (acc += 1)
                                                : acc,
                                            0
                                          )
                                          : 0}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mb-2 text-body font-size-sm">
                                    <div className="col-3 text-nowrap ">
                                      <span className="d-inline-block align-middle ">
                                        Good
                                      </span>
                                    </div>
                                    <div className="col-8">
                                      <div
                                        className="progress"
                                        style={{ height: "5px" }}
                                      >
                                        <div
                                          className="progress-bar"
                                          role="progressbar"
                                          style={{
                                            backgroundColor: "#a7e453",
                                            width: resReviews?.length
                                              ? `${(resReviews.reduce(
                                                (acc, item) =>
                                                  +item.Star > 3 &&
                                                    +item.Star <= 4
                                                    ? (acc += 1)
                                                    : acc,
                                                0
                                              ) *
                                                100) /
                                              resReviews?.length || 1
                                              }%`
                                              : "0%",
                                          }}
                                          aria-valuenow={27}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1">
                                      <span className="ml-3 float-right">
                                        {resReviews?.length
                                          ? resReviews.reduce(
                                            (acc, item) =>
                                              +item.Star > 3 &&
                                                +item.Star <= 4
                                                ? (acc += 1)
                                                : acc,
                                            0
                                          )
                                          : 0}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mb-2 text-body font-size-sm">
                                    <div className="col-3 text-nowrap">
                                      <span className="d-inline-block align-middle ">
                                        Average
                                      </span>
                                    </div>
                                    <div className="col-8">
                                      <div
                                        className="progress"
                                        style={{ height: "5px" }}
                                      >
                                        <div
                                          className="progress-bar"
                                          role="progressbar"
                                          style={{
                                            backgroundColor: "#ffda75",
                                            width: resReviews?.length
                                              ? `${(resReviews.reduce(
                                                (acc, item) =>
                                                  +item.Star > 2 &&
                                                    +item.Star <= 3
                                                    ? (acc += 1)
                                                    : acc,
                                                0
                                              ) *
                                                100) /
                                              resReviews?.length || 1
                                              }%`
                                              : "0%",
                                          }}
                                          aria-valuenow={17}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1">
                                      <span className="ml-3 float-right">
                                        {resReviews?.length
                                          ? resReviews.reduce(
                                            (acc, item) =>
                                              +item.Star > 2 &&
                                                +item.Star <= 3
                                                ? (acc += 1)
                                                : acc,
                                            0
                                          )
                                          : 0}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mb-2 text-body font-size-sm">
                                    <div className="col-3 text-nowrap ">
                                      <span className="d-inline-block align-middle">
                                        Below Average
                                      </span>
                                    </div>
                                    <div className="col-8">
                                      <div
                                        className="progress"
                                        style={{ height: "5px" }}
                                      >
                                        <div
                                          className="progress-bar"
                                          role="progressbar"
                                          style={{
                                            backgroundColor: "#fea569",
                                            width: resReviews?.length
                                              ? `${(resReviews.reduce(
                                                (acc, item) =>
                                                  +item.Star > 1 &&
                                                    +item.Star <= 2
                                                    ? (acc += 1)
                                                    : acc,
                                                0
                                              ) *
                                                100) /
                                              resReviews?.length || 1
                                              }%`
                                              : "0%",
                                          }}
                                          aria-valuenow={9}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1">
                                      <span className="ml-3 float-right">
                                        {resReviews?.length
                                          ? resReviews.reduce(
                                            (acc, item) =>
                                              +item.Star > 1 &&
                                                +item.Star <= 2
                                                ? (acc += 1)
                                                : acc,
                                            0
                                          )
                                          : 0}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center text-body font-size-sm">
                                    <div className="col-3 text-nowrap">
                                      <span className="d-inline-block align-middle ">
                                        Poor
                                      </span>
                                    </div>
                                    <div className="col-8">
                                      <div
                                        className="progress"
                                        style={{ height: "5px" }}
                                      >
                                        <div
                                          className="progress-bar"
                                          role="progressbar"
                                          style={{
                                            backgroundColor:
                                              "#3b71de !important",
                                            backbroundColor: "#3b71de",
                                            width: resReviews?.length
                                              ? `${(resReviews.reduce(
                                                (acc, item) =>
                                                  +item.Star > 0 &&
                                                    +item.Star <= 1
                                                    ? (acc += 1)
                                                    : acc,
                                                0
                                              ) *
                                                100) /
                                              resReviews?.length || 1
                                              }%`
                                              : "0%",
                                          }}
                                          aria-valuenow={4}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1">
                                      <span className="ml-3 float-right">
                                        {resReviews?.length
                                          ? resReviews.reduce(
                                            (acc, item) =>
                                              +item.Star > 0 &&
                                                +item.Star <= 1
                                                ? (acc += 1)
                                                : acc,
                                            0
                                          )
                                          : 0}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row pb-4 mb-3">
                                <div
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    textAlign: "center",
                                    background: "#F3F4F5",
                                    borderRadius: "5px",
                                    padding: "5px",
                                  }}
                                >
                                  <span className="text-capitalize">
                                    Product Review
                                  </span>
                                </div>
                              </div>
                              <div className="row pb-4">
                                {resReviews?.length ? (
                                  <>
                                    {resReviews.map((item) => (
                                      <div
                                        className="col-12"
                                        id="product-review-list"
                                      >
                                        <div
                                          className="p-2"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="row product-review d-flex ">
                                            <div className="col-md-3 d-flex mb-3 pr-5">
                                              <div className="media media-ie-fix  mr-4 pr-2">
                                                <img
                                                  style={{ maxHeight: "64px" }}
                                                  className="rounded-circle"
                                                  width={64}
                                                  src="https://6valley.6amtech.com/storage/app/public/profile/2022-04-20-625fa7d513aa5.png"
                                                  alt="fatema"
                                                />
                                                <div className="media-body pl-3 text-body">
                                                  <span
                                                    className="font-size-sm mb-0 text-body"
                                                    style={{
                                                      fontWeight: 700,
                                                      fontSize: "12px",
                                                    }}
                                                  >
                                                    {`${item?.User?.first_name} ${item?.User?.last_name}`}
                                                  </span>
                                                  <div className="d-flex ">
                                                    <div className="mr-2">
                                                      <i className="sr-star czi-star-filled active" />
                                                    </div>
                                                    <div
                                                      className="text-body"
                                                      style={{
                                                        fontWeight: 400,
                                                        fontSize: "15px",
                                                      }}
                                                    >
                                                      {`${item?.Star}`}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-7">
                                              <p
                                                className="mb-2 text-body"
                                                style={{
                                                  wordWrap: "break-word",
                                                }}
                                              >
                                                {`${item?.Review}`}
                                              </p>
                                              {!!item?.review_image?.length &&
                                                item?.review_image?.map(
                                                  (item) => (
                                                    <img
                                                      style={{
                                                        cursor: "pointer",
                                                        borderRadius: "5px",
                                                        border: "1px",
                                                        borderColor: "#7a6969",
                                                        height: "67px",
                                                        marginRight: "5px",
                                                      }}
                                                      src={
                                                        item ||
                                                        dummyProductImage
                                                      }
                                                      onError={({
                                                        currentTarget,
                                                      }) => {
                                                        currentTarget.onerror =
                                                          null; // prevents looping
                                                        currentTarget.src =
                                                          dummyProductImage;
                                                      }}
                                                      // onclick="showInstaImage('https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7ede63.png')"
                                                      className="cz-image-zoom"
                                                      // src="https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7ede63.png"
                                                      alt=""
                                                      width={67}
                                                    />
                                                  )
                                                )}
                                              {/* <img
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: "5px",
                                                  border: "1px",
                                                  borderColor: "#7a6969",
                                                  height: "67px",
                                                  marginRight: "5px",
                                                }}
                                                onclick="showInstaImage('https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7ede63.png')"
                                                className="cz-image-zoom"
                                                src="https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7ede63.png"
                                                alt="Product review"
                                                width={67}
                                              />
                                              <img
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: "5px",
                                                  border: "1px",
                                                  borderColor: "#7a6969",
                                                  height: "67px",
                                                  marginRight: "5px",
                                                }}
                                                onclick="showInstaImage('https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7eede3.png')"
                                                className="cz-image-zoom"
                                                src="https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7eede3.png"
                                                alt="Product review"
                                                width={67}
                                              />
                                              <img
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: "5px",
                                                  border: "1px",
                                                  borderColor: "#7a6969",
                                                  height: "67px",
                                                  marginRight: "5px",
                                                }}
                                                onclick="showInstaImage('https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7eee8e.png')"
                                                className="cz-image-zoom"
                                                src="https://6valley.6amtech.com/storage/app/public/review/2022-04-23-6263cbf7eee8e.png"
                                                alt="Product review"
                                                width={67}
                                              /> */}
                                            </div>
                                            <div className="col-md-2 text-body">
                                              <span
                                                style={{
                                                  float: "right",
                                                  fontWeight: 400,
                                                  fontSize: "13px",
                                                }}
                                              >
                                                {`${item?.createdAt}`}
                                                {/* Apr-23-2022 */}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div
                                    className="col-12"
                                    id="product-review-list"
                                  >
                                    <div className="card">
                                      <div className="card-body">
                                        <h6 className="text-danger text-center">
                                          Product review not available
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="col-12">
                                  <div className="card-footer d-flex justify-content-center align-items-center">
                                    <button
                                      className="btn"
                                      style={{
                                        background: "#3b71de",
                                        color: "#ffffff",
                                      }}
                                      onclick="load_review()"
                                    >
                                      View more
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="product-details-shipping-details">
              <div className="shipping-details-bottom-border">
                <div style={{ padding: "25px" }}>
                  <img
                    className="mr-2"
                    style={{ height: "20px", width: "20px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/Payment.png"
                    alt=""
                  />
                  <span>Safe Payment</span>
                </div>
              </div>
              <div className="shipping-details-bottom-border">
                <div style={{ padding: "25px" }}>
                  <img
                    className="mr-2"
                    style={{ height: "20px", width: "20px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/money.png"
                    alt=""
                  />
                  <span>7 Days Return Policy</span>
                </div>
              </div>
              <div className="shipping-details-bottom-border">
                <div style={{ padding: "25px" }}>
                  <img
                    className="mr-2"
                    style={{ height: "20px", width: "20px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/Genuine.png"
                    alt=""
                  />
                  <span>100% Authentic Products</span>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "5px",
                fontWeight: 400,
                color: "#212629",
                marginTop: "10px",
              }}
            >
              <div className="row d-flex justify-content-between">
                <div className="col-9 ">
                  <div className="row d-flex ">
                    <div>
                      <img
                        style={{
                          height: "65px",
                          width: "65px",
                          // borderRadius: "50%",
                          backgroundColor: "rgb(59, 113, 222)",
                        }}
                        src={"/zambet_logo.png" || dummyCompanyLogo}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyCompanyLogo;
                        }}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <span style={{ fontWeight: 700, fontSize: "16px" }}>
                        Zambet
                      </span>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className="row d-flex justify-content-between">
                    <div className="col-6 ">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          height: "79px",
                          background: "#3b71de10",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="text-center">
                          <span
                            style={{
                              color: "#3b71de",
                              fontWeight: 700,
                              fontSize: "26px",
                            }}
                          >
                            {mainState?.resProduct?.review}
                          </span>
                          <br />
                          <span style={{ fontSize: "12px" }}>Reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          height: "79px",
                          background: "#3b71de10",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="text-center">
                          <span
                            style={{
                              color: "#3b71de",
                              fontWeight: 700,
                              fontSize: "26px",
                            }}
                          >
                            {0}
                          </span>
                          <br />
                          <span style={{ fontSize: "12px" }}>Products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className="row">
                    <Link
                      // to="/shopView/00"
                      to="/sellers"
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <button
                        className="btn"
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                          background: "#3b71de",
                          color: "#ffffff",
                        }}
                      >
                        <i className="fa fa-shopping-bag" aria-hidden="true" />
                        Visit Store
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "25px" }}>
              <div className="row d-flex justify-content-center">
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  More From The Store
                </span>
              </div>
            </div>
            <div style={{}}>
              {!!state?.allProducts?.length &&
                state?.allProducts?.slice(0, 5)?.map((item) => (
                  <div
                    className="flash_deal_product rtl"
                    style={{
                      cursor: "pointer",
                      height: "155px",
                      marginBottom: "10px",
                    }}
                    onClick={() => navigate(`/product/${item?._id}`)}
                  >
                    <div
                      className="d-flex"
                      style={{ position: "absolute", zIndex: 2 }}
                    >
                      <span
                        className="for-discoutn-value p-1 pl-2 pr-2"
                        style={{ borderRadius: "5px 0px" }}
                      >
                        {`${(
                          (((+item?.display_price || 0) -
                            (+item?.selling_price || 0)) *
                            100) /
                          (+item?.selling_price || 1)
                        ).toFixed(0)}% Off`}
                      </span>
                    </div>
                    <div className=" d-flex" style={{}}>
                      <div
                        className=" d-flex align-items-center justify-content-center"
                        style={{ paddingLeft: "14px", paddingTop: "14px" }}
                      >
                        <div
                          className="flash-deals-background-image"
                          style={{ background: "#3b71de10" }}
                        >
                          <img
                            style={{
                              height: "125px",
                              width: "125px",
                              borderRadius: "5px",
                            }}
                            src={item?.pphoto || dummyProductImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = dummyProductImage;
                            }}
                          />
                        </div>
                      </div>
                      <div className=" flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                        <div>
                          <div>
                            <span className="flash-product-title">
                              {truncate(item?.pname, 30) || "..."}
                            </span>
                          </div>
                          <div className="flash-product-review">
                            <Rating
                              readonly
                              fractions={2}
                              initialRating={item?.review_avg || 0}
                              style={{ color: "#fea569" }}
                              emptySymbol="fa fa-star-o mr-1"
                              fullSymbol="fa fa-star mr-1"
                            // emptySymbol="fa fa-star-o fa-2x"
                            // fullSymbol="fa fa-star fa-2x"
                            // onClick={(val) => setStar(val)}
                            // onHover={(val) => setStar(val)}
                            />
                            {/* <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" /> */}
                            <label className="badge-style2">
                              ( {item?.review_count || "0"} )
                            </label>
                          </div>
                          <div>
                            <strike
                              style={{
                                fontSize: "12px",
                                color: "#E96A6A",
                              }}
                            >
                              {`₹ ${item?.display_price || 0}`}
                            </strike>
                          </div>
                          <div className="flash-product-price">
                            {`₹ ${item?.selling_price || 0}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* <div
                className="flash_deal_product rtl"
                style={{
                  cursor: "pointer",
                  height: "155px",
                  marginBottom: "10px",
                }}
                onclick="location.href='https://6valley.6amtech.com/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g'"
              >
                <div
                  className="d-flex"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <span
                    className="for-discoutn-value p-1 pl-2 pr-2"
                    style={{ borderRadius: "5px 0px" }}
                  >
                    10% Off
                  </span>
                </div>
                <div className=" d-flex" style={{}}>
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    style={{ paddingLeft: "14px", paddingTop: "14px" }}
                  >
                    <div
                      className="flash-deals-background-image"
                      style={{ background: "#3b71de10" }}
                    >
                      <img
                        style={{
                          height: "125px!important",
                          width: "125px!important",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-21-6260fd9161efe.png"
                      />
                    </div>
                  </div>
                  <div className=" flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                    <div>
                      <div>
                        <span className="flash-product-title">
                          Quartz wrist watch waterproof watch for Men and Women
                        </span>
                      </div>
                      <div className="flash-product-review">
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <label className="badge-style2">( 1 )</label>
                      </div>
                      <div>
                        <strike
                          style={{
                            fontSize: "12px!important",
                            color: "#E96A6A!important",
                          }}
                        >
                          ₹500.0
                        </strike>
                      </div>
                      <div className="flash-product-price">₹450.0</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flash_deal_product rtl"
                style={{
                  cursor: "pointer",
                  height: "155px",
                  marginBottom: "10px",
                }}
                onclick="location.href='https://6valley.6amtech.com/product/test-asdf-ZEYzZC'"
              >
                <div
                  className="d-flex"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <span
                    className="for-discoutn-value p-1 pl-2 pr-2"
                    style={{ borderRadius: "5px 0px" }}
                  >
                    10% Off
                  </span>
                </div>
                <div className=" d-flex" style={{}}>
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    style={{ paddingLeft: "14px", paddingTop: "14px" }}
                  >
                    <div
                      className="flash-deals-background-image"
                      style={{ background: "#3b71de10" }}
                    >
                      <img
                        style={{
                          height: "125px!important",
                          width: "125px!important",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625f9fa1dbcfe.png"
                      />
                    </div>
                  </div>
                  <div className=" flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                    <div>
                      <div>
                        <span className="flash-product-title">
                          New Design Trendy Casual Sneakers for Men Lightweight
                          &amp; Comfortable For Party We
                        </span>
                      </div>
                      <div className="flash-product-review">
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <label className="badge-style2">( 0 )</label>
                      </div>
                      <div>
                        <strike
                          style={{
                            fontSize: "12px!important",
                            color: "#E96A6A!important",
                          }}
                        >
                          ₹500.0
                        </strike>
                      </div>
                      <div className="flash-product-price">₹450.0</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flash_deal_product rtl"
                style={{
                  cursor: "pointer",
                  height: "155px",
                  marginBottom: "10px",
                }}
                onclick="location.href='https://6valley.6amtech.com/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j'"
              >
                <div
                  className="d-flex"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <span
                    className="for-discoutn-value p-1 pl-2 pr-2"
                    style={{ borderRadius: "5px 0px" }}
                  >
                    10% Off
                  </span>
                </div>
                <div className=" d-flex" style={{}}>
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    style={{ paddingLeft: "14px", paddingTop: "14px" }}
                  >
                    <div
                      className="flash-deals-background-image"
                      style={{ background: "#3b71de10" }}
                    >
                      <img
                        style={{
                          height: "125px!important",
                          width: "125px!important",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe4bc22bd3.png"
                      />
                    </div>
                  </div>
                  <div className=" flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                    <div>
                      <div>
                        <span className="flash-product-title">
                          Hot Selling Sneakers, Sneakers Men Casual Shoes Men
                          Fashion Sneakers Fly knit Li
                        </span>
                      </div>
                      <div className="flash-product-review">
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <label className="badge-style2">( 1 )</label>
                      </div>
                      <div>
                        <strike
                          style={{
                            fontSize: "12px!important",
                            color: "#E96A6A!important",
                          }}
                        >
                          ₹5,000.0
                        </strike>
                      </div>
                      <div className="flash-product-price">₹4,500.0</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flash_deal_product rtl"
                style={{
                  cursor: "pointer",
                  height: "155px",
                  marginBottom: "10px",
                }}
                onclick="location.href='https://6valley.6amtech.com/product/product-test-LoiBIu'"
              >
                <div
                  className="d-flex"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <span
                    className="for-discoutn-value p-1 pl-2 pr-2"
                    style={{ borderRadius: "5px 0px" }}
                  >
                    10% Off
                  </span>
                </div>
                <div className=" d-flex" style={{}}>
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    style={{ paddingLeft: "14px", paddingTop: "14px" }}
                  >
                    <div
                      className="flash-deals-background-image"
                      style={{ background: "#3b71de10" }}
                    >
                      <img
                        style={{
                          height: "125px!important",
                          width: "125px!important",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe5a872824.png"
                      />
                    </div>
                  </div>
                  <div className=" flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                    <div>
                      <div>
                        <span className="flash-product-title">
                          New Fashionable Box Balance Heel shoes for Women
                        </span>
                      </div>
                      <div className="flash-product-review">
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <label className="badge-style2">( 0 )</label>
                      </div>
                      <div>
                        <strike
                          style={{
                            fontSize: "12px!important",
                            color: "#E96A6A!important",
                          }}
                        >
                          ₹500.0
                        </strike>
                      </div>
                      <div className="flash-product-price">₹450.0</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flash_deal_product rtl"
                style={{
                  cursor: "pointer",
                  height: "155px",
                  marginBottom: "10px",
                }}
                onclick="location.href='https://6valley.6amtech.com/product/product-111-s6WUwV'"
              >
                <div
                  className="d-flex"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <span
                    className="for-discoutn-value p-1 pl-2 pr-2"
                    style={{ borderRadius: "5px 0px" }}
                  >
                    10% Off
                  </span>
                </div>
                <div className=" d-flex" style={{}}>
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    style={{ paddingLeft: "14px", paddingTop: "14px" }}
                  >
                    <div
                      className="flash-deals-background-image"
                      style={{ background: "#3b71de10" }}
                    >
                      <img
                        style={{
                          height: "125px!important",
                          width: "125px!important",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe611c0c72.png"
                      />
                    </div>
                  </div>
                  <div className=" flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                    <div>
                      <div>
                        <span className="flash-product-title">
                          Timex marlin stainless steel hand-wound movement
                        </span>
                      </div>
                      <div className="flash-product-review">
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <i
                          className="sr-star czi-star"
                          style={{ color: "#fea569 !important" }}
                        />
                        <label className="badge-style2">( 0 )</label>
                      </div>
                      <div>
                        <strike
                          style={{
                            fontSize: "12px!important",
                            color: "#E96A6A!important",
                          }}
                        >
                          ₹5,000.0
                        </strike>
                      </div>
                      <div className="flash-product-price">₹4,500.0</div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container  mb-3 rtl" style={{ textAlign: "left" }}>
        <div className="row flex-between">
          <div
            className="text-capitalize"
            style={{ fontWeight: 700, fontSize: "30px", marginLeft: "5px" }}
          >
            <span>Similar products</span>
          </div>
          <div className="view_all d-flex justify-content-center align-items-center">
            <div>
              <Link
                className="text-capitalize view-all-text"
                style={{ color: "#3b71de !important", marginRight: "8px" }}
                to="/products"
              >
                View all
                <i className="czi-arrow-right-circle ml-1 mr-n1" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {!!state?.allProducts?.length &&
            state?.allProducts?.slice(0, 10)?.map((item) => (
              <div
                className="col-xl-2 col-sm-3 col-6"
                style={{ marginBottom: "20px" }}
              >
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover">
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      aspectRatio: "1/1",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{ left: "7px", top: "2px", position: "absolute" }}
                    >
                      <span className="for-discoutn-value p-1 pl-2 pr-2">
                        {`${(
                          (((+item?.display_price || 0) -
                            (+item?.selling_price || 0)) *
                            100) /
                          (+item?.selling_price || 1)
                        ).toFixed(0)}% Off`}
                      </span>
                    </div>
                    <div
                      className="d-flex d-block"
                      style={{ cursor: "pointer" }}
                    >
                      <Link to={`/product/${item?._id}`}>
                        <img
                          src={item?.pphoto || dummyProductImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyProductImage;
                          }}
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div
                    className="single-product-details"
                    style={{
                      position: "relative",
                      height: "145px",
                      paddingTop: "10px",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    <div className="text-left pl-3">
                      <Link to={`/product/${item?._id}`}>
                        {truncate(item?.pname, 30) || "..."}
                      </Link>
                    </div>
                    <div className="rating-show justify-content-between text-center">
                      <span className="d-inline-block font-size-sm text-body">
                        <Rating
                          readonly
                          fractions={2}
                          initialRating={item?.review_avg || 0}
                          style={{ color: "#fea569" }}
                          emptySymbol="fa fa-star-o mr-1"
                          fullSymbol="fa fa-star mr-1"
                        // emptySymbol="fa fa-star-o fa-2x"
                        // fullSymbol="fa fa-star fa-2x"
                        // onClick={(val) => setStar(val)}
                        // onHover={(val) => setStar(val)}
                        />
                        {/* <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" /> */}
                        <label className="badge-style">
                          ( {item?.review_count || "0"} )
                        </label>
                      </span>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <strike
                          style={{
                            fontSize: "12px!important",
                            color: "#E96A6A!important",
                          }}
                        >
                          {`₹ ${item?.display_price || 0}`}{" "}
                        </strike>
                        <br />
                        <span className="text-accent">
                          {`₹ ${item?.selling_price || 0}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center quick-view">
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/product/${item?._id}`}
                    >
                      <i className="czi-forward align-middle mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          {!state?.allProducts?.length && (
            <div className="col-12">
              <center>
                <ClipLoader
                  // color={"#ffffff"}
                  // loading={!!camps}
                  loading
                // cssOverride={override}
                // size={150}
                />
              </center>
            </div>
          )}
          {/* <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "20px" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
              }}
            />
            <div className="product-single-hover">
              <div
                className=" inline_product clickable d-flex justify-content-center"
                style={{ cursor: "pointer", background: "#3b71de10" }}
              >
                <div
                  className="d-flex"
                  style={{ left: "7px", top: "2px", position: "absolute" }}
                >
                  <span className="for-discoutn-value p-1 pl-2 pr-2">
                    10% Off
                  </span>
                </div>
                <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                  <a href="/product/test-20-c1xeH7">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-16-625a271b671e8.png"
                      style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="single-product-details"
                style={{
                  position: "relative",
                  height: "145px",
                  paddingTop: "10px",
                  borderRadius: "0px 0px 5px 5px",
                }}
              >
                <div className="text-left pl-3">
                  <a href="/product/test-20-c1xeH7">London Beauty Soap Bar</a>
                </div>
                <div className="rating-show justify-content-between text-center">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <label className="badge-style">( 1 )</label>
                  </span>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <strike
                      style={{
                        fontSize: "12px!important",
                        color: "#E96A6A!important",
                      }}
                    >
                      ₹500.0
                    </strike>
                    <br />
                    <span className="text-accent">₹450.0</span>
                  </div>
                </div>
              </div>
              <div className="text-center quick-view">
                <a
                  className="btn btn-primary btn-sm"
                  href="/product/test-20-c1xeH7"
                >
                  <i className="czi-forward align-middle mr-1" />
                  View
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "20px" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
              }}
            />
            <div className="product-single-hover">
              <div
                className=" inline_product clickable d-flex justify-content-center"
                style={{ cursor: "pointer", background: "#3b71de10" }}
              >
                <div
                  className="d-flex"
                  style={{ left: "7px", top: "2px", position: "absolute" }}
                >
                  <span className="for-discoutn-value p-1 pl-2 pr-2">
                    10% Off
                  </span>
                </div>
                <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                  <a href="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-21-6260fd9161efe.png"
                      style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="single-product-details"
                style={{
                  position: "relative",
                  height: "145px",
                  paddingTop: "10px",
                  borderRadius: "0px 0px 5px 5px",
                }}
              >
                <div className="text-left pl-3">
                  <a href="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                    Quartz wrist watch wate...
                  </a>
                </div>
                <div className="rating-show justify-content-between text-center">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <label className="badge-style">( 1 )</label>
                  </span>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <strike
                      style={{
                        fontSize: "12px!important",
                        color: "#E96A6A!important",
                      }}
                    >
                      ₹500.0
                    </strike>
                    <br />
                    <span className="text-accent">₹450.0</span>
                  </div>
                </div>
              </div>
              <div className="text-center quick-view">
                <a
                  className="btn btn-primary btn-sm"
                  href="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g"
                >
                  <i className="czi-forward align-middle mr-1" />
                  View
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Product;
