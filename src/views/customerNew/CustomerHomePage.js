import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";

import { createSearchParams, Link, useNavigate } from "react-router-dom";

// import $ from "jquery";

// function myFunction() {
//   $("#anouncement").addClass("d-none").removeClass("d-flex");
// }

import { Helmet } from "react-helmet";
import axios from "axios";
import Rating from "react-rating";
import dummyProductImage from "assets/dummyProductImage.png";
import dummySliderImage2 from "assets/dummySliderImage2.png";
import dummyHomeBanner1 from "assets/dummyHomeBanner1.png";
import dummyHomeBanner2 from "assets/dummyHomeBanner2.png";
import ClipLoader from "react-spinners/ClipLoader";
import { truncate } from "utils/truncateText";
import { Context } from "context/newContext";
import FlashDealTimer from "./FlashDealTimer";
import { defaultAPIErrorHandler } from "api/api";
import { getPercentageOff } from "utils/utility";
import Carousel from "react-bootstrap/Carousel";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function CustomerHomePage() {
  const [ads, setAds] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState([]);
  const [modalState, setModalState] = useState({
    quantity: 1,
  });
  const handleModalOpen = (productState) => {
    setIsModalOpen(true);
    setModalState((prev) => ({
      ...prev,
      ...productState,
      totalPrice: productState?.selling_price,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setModalState((prev) => ({
        ...prev,
        [name]: +value <= 0 ? 0 : +value,
        totalPrice: +value <= 0 ? 0 : +value * (prev?.selling_price || 1),
      }));
    }
  };
  const increaseQuantity = () => {
    console.log("+++++++++++++");
    setModalState((prev) => ({
      ...prev,
      quantity: +prev.quantity + 1,
      totalPrice: (+prev.quantity + 1) * prev.selling_price,
    }));
  };
  const decreaseQuantity = () => {
    console.log("------------------");
    setModalState((prev) => ({
      ...prev,
      quantity: +prev.quantity <= 1 ? 1 : prev.quantity - 1,
      totalPrice:
        +prev.quantity <= 1
          ? +prev.selling_price
          : (+prev.quantity - 1) * +prev.selling_price,
    }));
  };
  const apiHandleAddToCart = () => {
    let data = {
      product_id: modalState.product_id,
      quantity: modalState.quantity,
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
        // setMainState((prev) => ({
        //   ...prev,
        //   resCarts: response.data,
        // }));
        alert("Added to Cart Successfully");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
      });
  };

  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [mainState, setMainState] = useState({
    resAllSellers: [],
    resAllCategories: [],
    resAllBrands: [],
    resHome: {
      sliderImages: [],
      banners: [],
      brand: [],
      latestProducts: [],
      topcategoryproduct: [],
    },
  });

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
          resAllBrands: response.data.data,
        }));
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

        if (windowSize.innerWidth < 480) {
          console.log(
            "9999999999999999999"
            // response.data.data.brand.slice(0, 3)
          );
          setMainState((prev) => ({
            ...prev,
            resHome: {
              sliderImages: response.data.data?.sliderImages || [],
              banners: response.data.data?.banners || [],
              brand: response.data.data?.brand || [],
              latestProducts: response.data.data?.latestProducts || [],
              topcategoryproduct: response.data.data?.topcategoryproduct || [],
              recommended_products:
                response.data.data?.recommended_products || [],
            },
            resAllBrands: response.data.data?.brand?.slice(0, 3) || [],
            resAllSellers: response.data.data?.all_seller_data || [],
          }));
        } else if (windowSize.innerWidth > 480 && window.innerWidth < 1024) {
          setMainState((prev) => ({
            ...prev,
            resHome: {
              sliderImages: response.data.data?.sliderImages || [],
              banners: response.data.data?.banners || [],
              brand: response.data.data?.brand || [],
              latestProducts: response.data.data?.latestProducts || [],
              topcategoryproduct: response.data.data?.topcategoryproduct || [],
              recommended_products:
                response.data.data?.recommended_products || [],
            },
            resAllBrands: response.data.data?.brand?.slice(0, 6) || [],
            resAllSellers: response.data.data?.all_seller_data || [],
          }));
        } else {
          setMainState((prev) => ({
            ...prev,
            resHome: {
              sliderImages: response.data.data?.sliderImages || [],
              banners: response.data.data?.banners || [],
              brand: response.data.data?.brand || [],
              latestProducts: response.data.data?.latestProducts || [],
              topcategoryproduct: response.data.data?.topcategoryproduct || [],
              recommended_products:
                response.data.data?.recommended_products || [],
            },
            resAllBrands: response.data.data?.brand || [],
            resAllSellers: response.data.data?.all_seller_data || [],
          }));
        }
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    if (windowSize.innerWidth < 480) {
      setMainState((prev) => ({
        ...prev,
        resAllBrands: prev?.resHome?.brand?.slice(0, 3) || [],
        // resAllSellers: response.data.data?.all_seller_data || [],
      }));
    } else if (windowSize.innerWidth > 480 && window.innerWidth < 1024) {
      setMainState((prev) => ({
        ...prev,
        resAllBrands: prev?.resHome?.brand?.slice(0, 6) || [],
        // resAllSellers: response.data.data?.all_seller_data || [],
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        resAllBrands: prev?.resHome?.brand || [],
        // resAllSellers: response.data.data?.all_seller_data || [],
      }));
    }
  }, [windowSize]);

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

  useEffect(() => {
    // apiGetAllBrands();
    apiGetAllCategories();
    apiGetHome();
    // toast.info(<>Got it</>, {
    //   autoClose: 3000,
    // });
    // toast.dark(<>Got it</>);
    // toast.error(<>Oops! Something went wrong.</>);
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [FlashDealDeadlineDate, setFlashDealDeadlineDate] = useState("");

  const apiGetFlashDealForCustomer = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal/customer",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setFlashDealDeadlineDate(response?.data?.data?.[0]?.end_date || "");
        // setMainState((prev) => ({
        //   ...prev,
        //   resAllBrands: response.data.data,
        // }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    responsive: [
      // Responsive breakpoints for different screen sizes
      {
        breakpoint: 768, // Breakpoint at 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Breakpoint at 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const advertisement = async () => {
    const usertoken = localStorage.getItem("userToken");

    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/advertising_preferences/customer",
      {
        method: "GET",
        headers: {
          Authorization: usertoken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setAds(data.data);
  };

  const flash_deal = async () => {
    const res = await fetch(process.env.REACT_APP_BASEURL + "/api/deal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    setDeals(data.data);
  };

  useEffect(() => {
    advertisement();
    apiGetFlashDealForCustomer();
    flash_deal();
  }, []);

  return (
    <div className="toolbar-enabled">
      <section className="bg-transparent mb-3">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n    .just-padding {\n        padding: 15px;\n        border: 1px solid #ccccccb3;\n        border-bottom-left-radius: 5px;\n        border-bottom-right-radius: 5px;\n        height: 100%;\n        background-color: white;\n    }\n    .carousel-control-prev, .carousel-control-next{\n        width: 7% !important;\n    }\n",
                }}
              />
              <div className="row rtl">
                <div className="col-xl-3 d-none d-xl-block">
                  <div />
                </div>
                <div
                  className="col-xl-9 col-md-12"
                  style={{ marginTop: "3px", paddingLeft: "10px" }}
                >
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={0}
                        className
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={1}
                        className="active"
                      ></li>
                    </ol>
                    <div className="carousel-inner">
                      {!!mainState?.resHome?.sliderImages?.length ? (
                        mainState?.resHome?.sliderImages.map((item, index) => (
                          <div
                            className={
                              // index === 0
                              // ?
                              "carousel-item active"
                              // : "carousel-item"
                            }
                          >
                            <Link to={`/products?productId=${index}`}>
                              <img
                                className="d-block w-100"
                                style={{ maxHeight: "372px" }}
                                src={item?.image || dummySliderImage2}
                                onError={({ currentTarget }) => {
                                  currentTarget.src = dummySliderImage2;
                                }}
                                alt=""
                              />
                            </Link>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="carousel-item active">
                            <Link to="/">
                              <img
                                className="d-block w-100"
                                style={{ maxHeight: "372px" }}
                                src="assets/bannerHome.png"
                                alt=""
                              />
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div
          className="flash-deal-view-all-web row d-flex justify-content-end"
          style={{ marginRight: "2px" }}
        >
          <Link className="text-capitalize view-all-text" to="/viewalldetails">
            View all
            <i className="czi-arrow-right-circle ml-1 mr-n1" />
          </Link>
        </div>
        <div className="row d-flex flex-row">
          <div className="col-md-3 mt-2 countdown-card">
            <div className="m-2">
              <div className="flash-deal-text">
                <span>Flash deal</span>
              </div>
              <div style={{ textAlign: "center", color: "#ffffff" }}>
                <div className="countdown-background">
                  <FlashDealTimer deadline={FlashDealDeadlineDate || ""} />
                  {/* <span className="cz-countdown d-flex justify-content-center align-items-center">
                    <span className="cz-countdown-days">
                      <span className="cz-countdown-value">Coming Soon</span>
                    </span>
                  </span> */}
                  {/* <span
                    className="cz-countdown d-flex justify-content-center align-items-center"
                    data-countdown="07/08/2022 11:59:00 PM"
                  >
                    <span className="cz-countdown-days">
                      <span className="cz-countdown-value">75</span>
                      <span>Day</span>
                    </span>
                    <span className="cz-countdown-value p-1">:</span>
                    <span className="cz-countdown-hours">
                      <span className="cz-countdown-value">02</span>
                      <span>Hrs</span>
                    </span>
                    <span className="cz-countdown-value p-1">:</span>
                    <span className="cz-countdown-minutes">
                      <span className="cz-countdown-value">38</span>
                      <span>Min</span>
                    </span>
                    <span className="cz-countdown-value p-1">:</span>
                    <span className="cz-countdown-seconds">
                      <span className="cz-countdown-value">04</span>
                      <span>Sec</span>
                    </span>
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="flash-deal-view-all-mobile col-md-12"
            style={{ marginRight: "2px" }}
          >
            <Link
              className="float-right mt-2 text-capitalize view-all-text"
              to="/viewalldetails"
            >
              View all
              <i className="czi-arrow-right-circle ml-1 mr-n1" />
            </Link>
          </div> */}
          <div className="col-md-9 pl-md-4">
            <div className="carousel-wrap">
              <div
                className="owl-carousel owl-theme mt-2 owl-loaded owl-drag"
                id="flash-deal-slider"
              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(0px, 0px, 0px)",
                      transition: "all 0s ease 0s",
                      width: "1535px",
                    }}
                  >
                    {/* {!!mainState?.resHome?.latestProducts?.length &&
                      mainState?.resHome?.latestProducts
                        ?.slice(0, 3)
                        ?.map((item) => (
                          <div
                            className="owl-item active"
                            style={{ width: "302px", marginRight: "5px" }}
                          >
                            <div
                              className="flash_deal_product rtl"
                              style={{
                                cursor: "pointer",
                                height: "150px",
                                marginLeft: "6px",
                              }}
                              onClick={() =>
                                navigate(`/product/${item?.product_id}`)
                              }
                            >
                              <div
                                className="d-flex"
                                style={{ top: 0, position: "absolute" }}
                              >
                                <span
                                  className="for-discoutn-value p-1 pl-2 pr-2"
                                  style={{ borderRadius: "5px 0px" }}
                                >
                                  {`${Number(
                                    getPercentageOff(
                                      item?.display_price,
                                      item?.selling_price
                                    )
                                  ).toFixed(0)}% Off`}
                                </span>
                              </div>
                              <div className=" d-flex">
                                <div
                                  className="d-flex align-items-center justify-content-center"
                                  style={{
                                    paddingLeft: "12px",
                                    paddingTop: "12px",
                                  }}
                                >
                                  <div className="flash-deals-background-image">
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
                                <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
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
                                      />
                                      <label className="badge-style2">
                                        ( {item?.review_count || "0"} )
                                      </label>
                                    </div>
                                    <div>
                                      <strike
                                        style={{
                                          fontSize: "12px!important",
                                          color: "#E96A6A!important",
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
                          </div>
                        ))} */}
                    {deals?.slice(0, 3)?.map((ele) => {
                      return (
                        <>
                          <div
                            className="owl-item active"
                            style={{ width: "302px", marginRight: "5px" }}
                          >
                            <div
                              className="flash_deal_product rtl"
                              style={{
                                cursor: "pointer",
                                height: "150px",
                                marginLeft: "6px",
                              }}
                              // onClick={() =>
                              //   navigate(`/product/${item?.product_id}`)
                              // }
                            >
                              <div className=" d-flex">
                                <div
                                  className="d-flex align-items-center justify-content-center"
                                  style={{
                                    paddingLeft: "12px",
                                    paddingTop: "12px",
                                  }}
                                >
                                  <div className="flash-deals-background-image">
                                    <img
                                      style={{
                                        height: "125px",
                                        width: "125px",
                                        borderRadius: "5px",
                                      }}
                                      src={ele.image}
                                    />
                                  </div>
                                  <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                                    <div>
                                      <div
                                        style={{
                                          marginBottom: "20px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        <span className="flash-product-title">
                                          {ele.name}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="flash-product-title">
                                          {ele.description}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    {/* <div
                      className="owl-item active"
                      style={{ width: "302px", marginRight: "5px" }}
                    >
                      <div
                        className="flash_deal_product rtl"
                        style={{
                          cursor: "pointer",
                          height: "150px",
                          marginLeft: "6px",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{ top: 0, position: "absolute" }}
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
                            className="d-flex align-items-center justify-content-center"
                            style={{ paddingLeft: "12px", paddingTop: "12px" }}
                          >
                            <div className="flash-deals-background-image">
                              <img
                                style={{
                                  height: "125px!important",
                                  width: "125px!important",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                            <div>
                              <div>
                                <span className="flash-product-title">
                                  Women's long-sleeve lightweight french terry
                                  fleece quarter-zip top
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
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "302px", marginRight: "5px" }}
                    >
                      <div
                        className="flash_deal_product rtl"
                        style={{
                          cursor: "pointer",
                          height: "150px",
                          marginLeft: "6px",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{ top: 0, position: "absolute" }}
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
                            className="d-flex align-items-center justify-content-center"
                            style={{ paddingLeft: "12px", paddingTop: "12px" }}
                          >
                            <div className="flash-deals-background-image">
                              <img
                                style={{
                                  height: "125px!important",
                                  width: "125px!important",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                            <div>
                              <div>
                                <span className="flash-product-title">
                                  Exclusive &amp; Fashionable Suit For Men
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
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "302px", marginRight: "5px" }}
                    >
                      <div
                        className="flash_deal_product rtl"
                        style={{
                          cursor: "pointer",
                          height: "150px",
                          marginLeft: "6px",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{ top: 0, position: "absolute" }}
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
                            className="d-flex align-items-center justify-content-center"
                            style={{ paddingLeft: "12px", paddingTop: "12px" }}
                          >
                            <div className="flash-deals-background-image">
                              <img
                                style={{
                                  height: "125px!important",
                                  width: "125px!important",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                            <div>
                              <div>
                                <span className="flash-product-title">
                                  Fashionable bag for women
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
                                  ₹50.0
                                </strike>
                              </div>
                              <div className="flash-product-price">₹45.0</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item"
                      style={{ width: "302px", marginRight: "5px" }}
                    >
                      <div
                        className="flash_deal_product rtl"
                        style={{
                          cursor: "pointer",
                          height: "150px",
                          marginLeft: "6px",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{ top: 0, position: "absolute" }}
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
                            className="d-flex align-items-center justify-content-center"
                            style={{ paddingLeft: "12px", paddingTop: "12px" }}
                          >
                            <div className="flash-deals-background-image">
                              <img
                                style={{
                                  height: "125px!important",
                                  width: "125px!important",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                            <div>
                              <div>
                                <span className="flash-product-title">
                                  Hot Selling Sneakers, Sneakers Men Casual
                                  Shoes Men Fashion Sneakers Fly knit Li
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
                              <div className="flash-product-price">
                                ₹4,500.0
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item"
                      style={{ width: "302px", marginRight: "5px" }}
                    >
                      <div
                        className="flash_deal_product rtl"
                        style={{
                          cursor: "pointer",
                          height: "150px",
                          marginLeft: "6px",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{ top: 0, position: "absolute" }}
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
                            className="d-flex align-items-center justify-content-center"
                            style={{ paddingLeft: "12px", paddingTop: "12px" }}
                          >
                            <div className="flash-deals-background-image">
                              <img
                                style={{
                                  height: "125px!important",
                                  width: "125px!important",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                            <div>
                              <div>
                                <span className="flash-product-title">
                                  Latest Cool headphone with Bluetooth version
                                  5.0
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
                    </div> */}
                  </div>
                </div>
                <div className="owl-nav">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev disabled"
                  >
                    {/* <i className="czi-arrow-left" /> */}
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    {/* <i className="czi-arrow-right" /> */}
                  </button>
                </div>
                <div className="owl-dots disabled" />
                {!mainState?.resHome?.latestProducts?.length && (
                  <div
                    className="owl-item active"
                    style={{ width: "100%", marginRight: "5px" }}
                  >
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container rtl mt-3">
        <div className="section-header">
          <div style={{ color: "black", fontWeight: 700, fontSize: "22px" }}>
            <span> Brands</span>
          </div>
          <div style={{ marginRight: "2px" }}>
            <Link className="text-capitalize view-all-text" to="/brands">
              View all
              <i className="czi-arrow-right-circle ml-1 mr-n1" />
            </Link>
          </div>
        </div>
        <div className="mt-3 mb-3 brand-slider">
          <div
            className="owl-carousel owl-theme p-2 owl-loaded owl-drag"
            id="brands-slider"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  // width: "1452px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!!mainState.resAllBrands.length ? (
                  mainState.resAllBrands.slice(0, 12).map((item) => (
                    <div
                      className="owl-item active"
                      style={{ width: "93.667px", marginRight: "10px" }}
                    >
                      <div className="text-center">
                        <Link to={`/products?brandId=${item?._id}`}>
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ height: "100px", margin: "5px" }}
                          >
                            <img
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                                width: "100%",
                                height: "80px",
                              }}
                              src={item?.brand_photo || dummyProductImage}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = dummyProductImage;
                              }}
                              // onMouseOver={item?.brand_name || "...."}
                              alt={item?.brand_name || "...."}
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="owl-item active"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <ClipLoader
                      // color={"#ffffff"}
                      // loading={!!camps}
                      loading
                      // cssOverride={override}
                      // size={150}
                    />
                  </div>
                )}

                {/* <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=4&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          alt="Tell us"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=5&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          alt="Arkohub"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=6&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          alt="Centre Point"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=7&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          alt="TrueMake"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=8&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-16-625a468e11386.png"
                          alt="The Wall"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=9&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-13-62566ad879288.png"
                          alt="Dynamova"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=10&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-13-62566ac36e4cd.png"
                          alt="Crave"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=11&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-13-62566aaad1d50.png"
                          alt="Framerce"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=12&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-13-62566a9764bbf.png"
                          alt="Modentum"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=13&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-13-62566a7e9e163.png"
                          alt="Axxelus"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=14&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-13-62566a6b87e0f.png"
                          alt="Vivatiqo"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=15&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-19-625e5e370a343.png"
                          alt="abc"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "93.667px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <Link to="/products?id=16&data_from=brand&page=1">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100px", margin: "5px" }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          src="https://6valley.6amtech.com/storage/app/public/brand/2022-04-19-625e5e440ab22.png"
                          alt="test"
                        />
                      </div>
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="owl-nav disabled">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            {/* <div className="owl-dots">
              <button role="button" className="owl-dot active">
                <span />
              </button>
              <button role="button" className="owl-dot">
                <span />
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* <div className="container mb-4">
        <div
          className="row"
          style={{
            background: "white",
            boxShadow: "0px 3px 6px #0000000d",
            borderRadius: "5px",
          }}
        >
          <div className="col-md-12">
            <div className="feature-product-title">Featured Products</div>
          </div>
          <div className="col-md-12">
            <div
              className="feature-product"
              style={{
                paddingLeft: "55px",
                paddingRight: "55px",
                paddingTop: "10px",
              }}
            >
              <div className="carousel-wrap p-1">
                <div
                  className="owl-carousel owl-theme owl-loaded owl-drag"
                  id="featured_products_list"
                >
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(-1364px, 0px, 0px)",
                        transition: "all 0s ease 0s",
                        width: "5231px",
                      }}
                    >
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-w3PUfR">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-626362bcdbc49.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-w3PUfR">
                                  The school of life - em...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <label className="badge-style">( 5 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('12')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-21-6260fd9161efe.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                                  Quartz wrist watch wate...
                                </Link>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('36')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-10-LQArPe">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-13-62566e1a35a9c.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-10-LQArPe">
                                  Progress lighting P4009...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('7')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-H27JWE">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fea103fa22.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-H27JWE">
                                  Latest Cool headphone w...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('15')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/demo-product-1-DuHk4E">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fdf2fbb9.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/demo-product-1-DuHk4E">
                                  Fashionable bag for wom...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                                    ₹50.0
                                  </strike>
                                  <br />
                                  <span className="text-accent">₹45.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('23')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/product-111-s6WUwV">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe611c0c72.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/product-111-s6WUwV">
                                  Timex marlin stainless...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                                    ₹5,000.0
                                  </strike>
                                  <br />
                                  <span className="text-accent">₹4,500.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('18')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-6-Pg6Hpj">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-6263633d3b0a6.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-6-Pg6Hpj">
                                  Exclusive &amp; Fashionable...
                                </Link>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('5')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-DcD1hE">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-DcD1hE">
                                  Women's long-sleeve lig...
                                </Link>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('1')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  ₹10.0 Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-ujoAgo">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-13-62566ecb47876.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-ujoAgo">
                                  The school of life - em...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                                  <span className="text-accent">₹490.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('4')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/product-1-9x9CNa">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625f76257cdf2.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/product-1-9x9CNa">
                                  Classic Sneakers For Me...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i
                                    className="sr-star czi-star"
                                    style={{ color: "#fea569 !important" }}
                                  />
                                  <i
                                    className="sr-star czi-star"
                                    style={{ color: "#fea569 !important" }}
                                  />
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('8')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe4bc22bd3.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j">
                                  Hot Selling Sneakers, S...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i
                                    className="sr-star czi-star"
                                    style={{ color: "#fea569 !important" }}
                                  />
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
                                    ₹5,000.0
                                  </strike>
                                  <br />
                                  <span className="text-accent">₹4,500.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('29')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-w3PUfR">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-626362bcdbc49.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-w3PUfR">
                                  The school of life - em...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <label className="badge-style">( 5 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('12')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-21-6260fd9161efe.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                                  Quartz wrist watch wate...
                                </Link>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('36')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-10-LQArPe">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-13-62566e1a35a9c.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-10-LQArPe">
                                  Progress lighting P4009...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('7')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-H27JWE">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fea103fa22.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-H27JWE">
                                  Latest Cool headphone w...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('15')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/demo-product-1-DuHk4E">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fdf2fbb9.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/demo-product-1-DuHk4E">
                                  Fashionable bag for wom...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                                    ₹50.0
                                  </strike>
                                  <br />
                                  <span className="text-accent">₹45.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('23')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/product-111-s6WUwV">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe611c0c72.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/product-111-s6WUwV">
                                  Timex marlin stainless...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                                    ₹5,000.0
                                  </strike>
                                  <br />
                                  <span className="text-accent">₹4,500.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('18')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-6-Pg6Hpj">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-6263633d3b0a6.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-6-Pg6Hpj">
                                  Exclusive &amp; Fashionable...
                                </Link>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('5')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-DcD1hE">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-DcD1hE">
                                  Women's long-sleeve lig...
                                </Link>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('1')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  ₹10.0 Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-ujoAgo">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-13-62566ecb47876.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-ujoAgo">
                                  The school of life - em...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
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
                                  <label className="badge-style">( 0 )</label>
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
                                  <span className="text-accent">₹490.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('4')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/product-1-9x9CNa">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625f76257cdf2.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/product-1-9x9CNa">
                                  Classic Sneakers For Me...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i
                                    className="sr-star czi-star"
                                    style={{ color: "#fea569 !important" }}
                                  />
                                  <i
                                    className="sr-star czi-star"
                                    style={{ color: "#fea569 !important" }}
                                  />
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('8')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe4bc22bd3.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j">
                                  Hot Selling Sneakers, S...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i
                                    className="sr-star czi-star"
                                    style={{ color: "#fea569 !important" }}
                                  />
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
                                    ₹5,000.0
                                  </strike>
                                  <br />
                                  <span className="text-accent">₹4,500.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('29')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "222.4px", marginRight: "5px" }}
                      >
                        <div style={{ margin: "5px", marginBottom: "30px" }}>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                            }}
                          />
                          <div className="product-single-hover">
                            <div
                              className="inline_product clickable d-flex justify-content-center"
                              style={{
                                cursor: "pointer",
                                maxHeight: "193px",
                                minHeight: "193px",
                                background: "#3b71de10",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "5px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  10% Off
                                </span>
                              </div>
                              <div
                                className="d-flex d-block center-div element-center"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to="/product/test-1-w3PUfR">
                                  <img
                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-626362bcdbc49.png"
                                    style={{
                                      width: "100%",
                                      borderRadius: "5px",
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
                                <Link to="/product/test-1-w3PUfR">
                                  The school of life - em...
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span className="d-inline-block font-size-sm text-body">
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <i className="sr-star czi-star-filled active" />
                                  <label className="badge-style">( 5 )</label>
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
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onclick="quickView('12')"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-nav">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev"
                    >
                      <i className="czi-arrow-left" />
                    </button>
                    <button
                      type="button"
                      role="presentation"
                      className="owl-next"
                    >
                      <i className="czi-arrow-right" />
                    </button>
                  </div>
                  <div className="owl-dots disabled" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <section className="container featured_deal rtl mb-2">
        <div
          className="row"
          style={{
            background: "#3b71de",
            padding: "5px",
            paddingBottom: "25px",
            borderRadius: "5px",
          }}
        >
          <div className="col-12 pb-2">
            <Link
              className="text-capitalize mt-2 mt-md-0 float-right"
              to="/products?data_from=featured_deal"
              style={{ color: "white !important", marginRight: "21px" }}
            >
              View all
              <i className="czi-arrow-right-circle ml-1 mr-n1" />
            </Link>
          </div>
          <div className="col-xl-3 col-md-4 d-flex align-items-center justify-content-center right">
            <div className="m-4">
              <span
                className="featured_deal_title"
                style={{ paddingTop: "12px" }}
              >
                Featured deal
              </span>
              <br />
              <span style={{ color: "white", textAlign: "left !important" }}>
                See the latest deals and exciting new offers !
              </span>
            </div>
          </div>
          <div className="col-xl-9 col-md-8 d-flex align-items-center justify-content-center pr-4">
            <div
              className="owl-carousel owl-theme owl-loaded owl-drag"
              id="web-feature-deal-slider"
            >
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(-1371px, 0px, 0px)",
                    transition: "all 0.25s ease 0s",
                    width: "2285px",
                  }}
                >
                  <div
                    className="owl-item"
                    style={{ width: "452px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/test-1-DcD1hE'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
                      >
                        <span
                          className="for-discoutn-value p-1 pl-2 pr-2"
                          style={{
                            borderRadius: "5px 0px",
                            background: "#FF5555 !important",
                          }}
                        >
                          10% Off
                        </span>
                      </div>
                      <div className=" d-flex" style={{}}>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Women's long-sleeve lightweight french terry
                                fleece quarter-zip top
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
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "452px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/test-6-Pg6Hpj'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
                      >
                        <span
                          className="for-discoutn-value p-1 pl-2 pr-2"
                          style={{
                            borderRadius: "5px 0px",
                            background: "#FF5555 !important",
                          }}
                        >
                          10% Off
                        </span>
                      </div>
                      <div className=" d-flex" style={{}}>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-6263633d3b0a6.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Exclusive &amp; Fashionable Suit For Men
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
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "452px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/test-3-ibgkHB'"
                    >
                      <div className=" d-flex" style={{}}>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-62636369a0855.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Ladies Winter Long Sleeve Sweater
                              </span>
                            </div>
                            <div className="flash-product-review">
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <label className="badge-style2">( 3 )</label>
                            </div>
                            <div></div>
                            <div className="flash-product-price">₹5,000.0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "452px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/product-1-9x9CNa'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
                      >
                        <span
                          className="for-discoutn-value p-1 pl-2 pr-2"
                          style={{
                            borderRadius: "5px 0px",
                            background: "#FF5555 !important",
                          }}
                        >
                          10% Off
                        </span>
                      </div>
                      <div className=" d-flex" style={{}}>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625f76257cdf2.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Classic Sneakers For Men
                              </span>
                            </div>
                            <div className="flash-product-review">
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i
                                className="sr-star czi-star"
                                style={{ color: "#fea569 !important" }}
                              />
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
                                ₹500.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹450.0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "452px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/test-7-3spYrs'"
                    >
                      <div className=" d-flex" style={{}}>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-16-625a26a3dfe7b.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Sneakers man new design fabrics shoes with high
                                lace up design and rubber materi
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
                            <div></div>
                            <div className="flash-product-price">₹500.0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots disabled" />
            </div>
          </div>
        </div>
      </section> */}

      <div className="container rtl">
        <div className="row">
          <div className="col-xl-3 col-md-4 pb-4 mt-3 pl-0 pr-0">
            <div
              className="deal_of_the_day"
              style={{ background: "#3b71de", height: "784px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <h1 style={{ color: "white" }}> Recommended product</h1>
              </div>
              <div className="recomanded-product-card">
                {!!mainState?.resHome?.recommended_products?.[0]?.pphoto ? (
                  <>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        margin: "20px 20px -20px 20px",
                        paddingTop: "20px",
                      }}
                    >
                      <img
                        src={
                          mainState?.resHome?.recommended_products?.[0]
                            ?.pphoto || dummyProductImage
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyProductImage;
                        }}
                        // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        background: "#ffffff",
                        margin: "20px",
                        paddingTop: "10px",
                        height: "200px",
                        borderRadius: "0px 0px 5px 5px",
                      }}
                    >
                      <div style={{ textAlign: "left", padding: "20px" }}>
                        <div
                          className="rating-show"
                          style={{ height: "125px" }}
                        >
                          <h5 style={{ fontWeight: 600, color: "#3b71de" }}>
                            {truncate(
                              mainState?.resHome?.recommended_products?.[0]
                                ?.pname,
                              50
                            ) || "..."}
                          </h5>
                          <span className="d-inline-block font-size-sm text-body">
                            <Rating
                              readonly
                              fractions={2}
                              initialRating={
                                mainState?.resHome?.recommended_products?.[0]
                                  ?.review_avg || 0
                              }
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
                              (
                              {mainState?.resHome?.recommended_products?.[0]
                                ?.review_count || 0}
                              )
                            </label>
                          </span>
                        </div>
                        <div className="float-right">
                          <strike
                            style={{
                              fontSize: "12px",
                              color: "#E96A6A",
                            }}
                          >
                            ₹
                            {mainState?.resHome?.recommended_products?.[0]
                              ?.display_price || 0.0}
                          </strike>
                          <span
                            className="text-accent"
                            style={{ margin: "10px", fontSize: "22px" }}
                          >
                            ₹{" "}
                            {mainState?.resHome?.recommended_products?.[0]
                              ?.selling_price || 0.0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
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
              </div>
              <div className="recomanded-buy-button">
                <button
                  className="buy_btn"
                  style={{ color: "#3b71de" }}
                  onClick={() =>
                    navigate(
                      `/product/${mainState?.resHome?.recommended_products?.[0]?._id}`
                    )
                  }
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-md-8 mt-2 pl-0 pr-0">
            <div
              className="latest-product-margin"
              style={{ marginLeft: "30px" }}
            >
              <div className="d-flex justify-content-between">
                <div className style={{ textAlign: "center" }}>
                  <span
                    className="for-feature-title"
                    style={{
                      textAlign: "center",
                      fontSize: "22px !important",
                      fontWeight: 700,
                    }}
                  >
                    Latest Products
                  </span>
                </div>
                <div style={{ marginRight: "4px" }}>
                  <Link
                    className="text-capitalize view-all-text"
                    to="/products"
                  >
                    View all
                    <i className="czi-arrow-right-circle ml-1 mr-n1" />
                  </Link>
                </div>
              </div>
              <div
                className="row mt-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!!mainState?.resHome?.latestProducts?.length ? (
                  mainState?.resHome?.latestProducts
                    ?.slice(0, 8)
                    .map((item, index) => (
                      <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                        <div style={{ margin: "2px" }}>
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
                                style={{
                                  left: "7px",
                                  top: "2px",
                                  position: "absolute",
                                }}
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
                                <Link
                                  to={`/product/${item?.product_id}`}
                                  style={{
                                    aspectRatio: "1/1",
                                  }}
                                >
                                  <img
                                    src={item?.pphoto || dummyProductImage}
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src = dummyProductImage;
                                    }}
                                    style={{
                                      // objectFit: "contain",
                                      // aspectRatio:"1/1",
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
                                <Link to={`/product/${item?.product_id}`}>
                                  {`${truncate(item?.pname, 20) || "..."}`}
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
                                  {/* <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" /> */}
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
                                    {`₹ ${item?.display_price || 0}`}
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
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onClick={() => {
                                  handleModalOpen(item);
                                }}
                                // data-toggle="modal"
                                // data-target="#quick-view"
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <>
                    <div
                      className="col-12 mb-4"
                      style={{ textAlign: "center" }}
                    >
                      <ClipLoader
                        // color={"#ffffff"}
                        // loading={!!camps}
                        loading
                        // cssOverride={override}
                        // size={150}
                      />
                    </div>
                  </>

                  // <>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                  //               <img
                  //                 src="https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png"
                  //                 // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-21-6260fd9161efe.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g">
                  //               ...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹0.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹0.0</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('36')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/test-asdf-ZEYzZC">
                  //               <img
                  //                 src="https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png"
                  //                 // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625f9fa1dbcfe.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/test-asdf-ZEYzZC">
                  //               ...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹0.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹0.0</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('32')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j">
                  //               <img
                  //                 src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe4bc22bd3.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j">
                  //               Hot Selling Sneakers, S...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i className="sr-star czi-star-filled active" />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 1 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹5,000.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹4,500.0</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('29')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/product-test-LoiBIu">
                  //               <img
                  //                 src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe5a872824.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/product-test-LoiBIu">
                  //               New Fashionable Box Bal...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹500.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹450.0</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('27')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/demo-product-1-DuHk4E">
                  //               <img
                  //                 src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fdf2fbb9.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/demo-product-1-DuHk4E">
                  //               Fashionable bag for wom...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹50.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹45.0</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('23')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/demo-product-23-iLZaLC">
                  //               <img
                  //                 src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fb8d4217.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/demo-product-23-iLZaLC">
                  //               Artificial Leather Shoe...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹55.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹49.5</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('22')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/demo-product-22-683ZUQ">
                  //               <img
                  //                 src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6f7c06567.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/demo-product-22-683ZUQ">
                  //               Demo Product 22
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹55.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹49.5</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('21')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="col-xl-3 col-sm-6 col-md-6 col-6 mb-4">
                  //     <div style={{ margin: "2px" }}>
                  //       <style
                  //         dangerouslySetInnerHTML={{
                  //           __html:
                  //             "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    .product-single-hover{\n        box-shadow: 0px 0px 5px rgba(0, 113, 220, 0.15);\n        border-radius: 5px;\n    }\n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  //         }}
                  //       />
                  //       <div className="product-single-hover">
                  //         <div
                  //           className=" inline_product clickable d-flex justify-content-center"
                  //           style={{
                  //             cursor: "pointer",
                  //             background: "#3b71de10",
                  //           }}
                  //         >
                  //           <div
                  //             className="d-flex"
                  //             style={{
                  //               left: "7px",
                  //               top: "2px",
                  //               position: "absolute",
                  //             }}
                  //           >
                  //             <span className="for-discoutn-value p-1 pl-2 pr-2">
                  //               10% Off
                  //             </span>
                  //           </div>
                  //           <div
                  //             className="d-flex d-block"
                  //             style={{ cursor: "pointer" }}
                  //           >
                  //             <Link to="/product/product-111-s6WUwV">
                  //               <img
                  //                 src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe611c0c72.png"
                  //                 style={{
                  //                   width: "100%",
                  //                   borderRadius: "5px 5px 0px 0px",
                  //                 }}
                  //               />
                  //             </Link>
                  //           </div>
                  //         </div>
                  //         <div
                  //           className="single-product-details"
                  //           style={{
                  //             position: "relative",
                  //             height: "145px",
                  //             paddingTop: "10px",
                  //             borderRadius: "0px 0px 5px 5px",
                  //           }}
                  //         >
                  //           <div className="text-left pl-3">
                  //             <Link to="/product/product-111-s6WUwV">
                  //               Timex marlin stainless...
                  //             </Link>
                  //           </div>
                  //           <div className="rating-show justify-content-between text-center">
                  //             <span className="d-inline-block font-size-sm text-body">
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <i
                  //                 className="sr-star czi-star"
                  //                 style={{ color: "#fea569 !important" }}
                  //               />
                  //               <label className="badge-style">( 0 )</label>
                  //             </span>
                  //           </div>
                  //           <div className="justify-content-between text-center">
                  //             <div className="product-price text-center">
                  //               <strike
                  //                 style={{
                  //                   fontSize: "12px!important",
                  //                   color: "#E96A6A!important",
                  //                 }}
                  //               >
                  //                 ₹5,000.0
                  //               </strike>
                  //               <br />
                  //               <span className="text-accent">₹4,500.0</span>
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="text-center quick-view">
                  //           <Link
                  //             className="btn btn-primary btn-sm"
                  //             style={{
                  //               marginTop: "0px",
                  //               paddingTop: "5px",
                  //               paddingBottom: "5px",
                  //               paddingLeft: "10px",
                  //               paddingRight: "10px",
                  //             }}
                  //             to="#"
                  //             onclick="quickView('18')"
                  //           >
                  //             <i className="czi-eye align-middle mr-1" />
                  //             Quick View
                  //           </Link>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container rtl mb-3">
        <div className="row">
          <div className="col-12 pl-0 pr-0">
            <Link to="/products" style={{ cursor: "pointer" }}>
              <img
                className="d-block footer_banner_img"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  height: "auto !important",
                }}
                src={
                  mainState?.resHome?.banners?.[0]?.banner || dummyHomeBanner1
                }
                onError={({ currentTarget }) => {
                  currentTarget.src = dummyHomeBanner1;
                }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="container rtl">
        <div className="row">
          <div className="col-md-6 pl-0">
            <div className="card" style={{ minHeight: "380px" }}>
              <div className="card-body">
                <div className="row d-flex justify-content-between">
                  <div className="categories-title">
                    <span style={{ fontWeight: 600, fontSize: "16px" }}>
                      Categories
                    </span>
                  </div>
                  <div className="categories-view-all">
                    <Link
                      className="text-capitalize view-all-text"
                      to="/categories"
                    >
                      View all
                      <i className="czi-arrow-right-circle ml-1 mr-n1" />
                    </Link>
                  </div>
                </div>
                <div className="row d-flex justify-content-center mt-3">
                  {mainState.resAllCategories.length ? (
                    mainState.resAllCategories.slice(0, 9).map((item) => (
                      <div className="text-center" style={{ margin: "5px" }}>
                        <Link to={`/products?categoryId=${item?._id}`}>
                          <img
                            style={{
                              verticalAlign: "middle",
                              height: "100px",
                              width: "100px",
                              borderRadius: "5px",
                            }}
                            src={item?.category_icon || dummyProductImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = dummyProductImage;
                            }}
                            alt="..."
                          />
                          <p
                            className="text-center small "
                            style={{ marginTop: "5px" }}
                          >
                            {`${truncate(item?.category_name, 15)}`}
                          </p>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div>
                      <ClipLoader
                        // color={"#ffffff"}
                        // loading={!!camps}
                        loading
                        // cssOverride={override}
                        // size={150}
                      />
                    </div>
                  )}
                  {/* <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=28&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566ccdee31c.png"
                        alt="Home, Pet & Appliances"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Home, Pet &amp;...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=26&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d207d809.png"
                        alt="Phones & Telecom"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Phones &amp; Tel...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=25&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d467ae3c.png"
                        alt="Computer, Office & Security"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Computer, Of...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=16&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c96e5edc.png"
                        alt="Beauty, Health & Hair"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Beauty, Heal...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=15&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c1958ba3.png"
                        alt="Jewelry & Watches"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Jewelry &amp; Wa...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=11&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b4deaba6.png"
                        alt="Women's fashion"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Women's fash...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=13&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566bd73a8d3.png"
                        alt="Outdoor Fun & Sports"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Outdoor Fun...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=12&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b6cd3e60.png"
                        alt="Men's fashion"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Men's fashio...
                      </p>
                    </Link>
                  </div>
                  <div className="text-center" style={{ margin: "5px" }}>
                    <Link to="/products?id=14&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          height: "100px",
                          borderRadius: "5px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566bf812223.png"
                        alt="Toys , Kids & Babies"
                      />
                      <p
                        className="text-center small "
                        style={{ marginTop: "5px" }}
                      >
                        Toys , Kids...
                      </p>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2 mt-md-0 seller-card">
            <div className="card" style={{ minHeight: "383px" }}>
              <div className="card-body">
                <div className="row d-flex justify-content-between">
                  <div className="seller-list-title">
                    <span style={{ fontWeight: 600, fontSize: "18px" }}>
                      Sellers
                    </span>
                  </div>
                  <div className="seller-list-view-all">
                    <Link
                      className="text-capitalize view-all-text"
                      to="/sellers"
                    >
                      View all
                      <i className="czi-arrow-right-circle ml-1 mr-n1" />
                    </Link>
                  </div>
                </div>
                <div className="row d-flex justify-content-between mt-3">
                  {mainState.resAllSellers.length ? (
                    mainState.resAllSellers.slice(0, 9).map((item) => (
                      <div style={{ margin: "5px" }}>
                        <center>
                          <Link to={`/shopView/${item._id}`}>
                            <img
                              style={{
                                verticalAlign: "middle",
                                padding: "2%",
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                              }}
                              src={
                                item?.vendor_detail?.[0]?.vendor_logo ||
                                dummyProductImage
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = dummyProductImage;
                              }}
                              alt="..."
                            />
                            <p className="text-center small ">
                              {`${truncate(
                                item?.vendor_detail?.[0]?.company_name,
                                15
                              )}`}
                            </p>
                          </Link>
                        </center>
                      </div>
                    ))
                  ) : (
                    <div className="w-100" style={{ margin: "5px" }}>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container rtl mt-3">
        <div className="row d-flex justify-content-center">
          <div style={{ height: "90px", width: "90px" }}>
            <img
              src="https://6valley.6amtech.com/public/assets/front-end/png/new-arrivals.png"
              alt=""
            />
          </div>
          <div style={{ marginTop: "24px", fontWeight: 700, fontSize: "26px" }}>
            <p style={{ float: "right" }}>ARRIVALS</p>
          </div>
        </div>
      </div>

      <div
        className="container rtl mb-3"
        style={{
          paddingLeft: "5px !important",
          paddingRight: "11px !important",
        }}
      >
        <div className="col-md-12">
          <div className="carousel-wrap">
            <div
              className="owl-carousel owl-theme mt-2 owl-loaded owl-drag"
              id="new-arrivals-product"
            >
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(-1259px, 0px, 0px)",
                    transition: "all 0s ease 0s",
                    width: "5036px",
                  }}
                >
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/demo-product-1-DuHk4E'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fdf2fbb9.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Fashionable bag for women
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
                                ₹50.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹45.0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/demo-product-23-iLZaLC'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fb8d4217.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Artificial Leather Shoes for Men by Mosharrof
                                Shoes
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
                                ₹55.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹49.5</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/demo-product-22-683ZUQ'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6f7c06567.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Demo Product 22
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
                                ₹55.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹49.5</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/product-111-s6WUwV'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
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
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Quartz wrist watch waterproof watch for Men and
                                Women
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
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/test-asdf-ZEYzZC'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                New Design Trendy Casual Sneakers for Men
                                Lightweight &amp; Comfortable For Party We
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
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Hot Selling Sneakers, Sneakers Men Casual Shoes
                                Men Fashion Sneakers Fly knit Li
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
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/product-test-LoiBIu'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
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
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/demo-product-1-DuHk4E'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fdf2fbb9.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Fashionable bag for women
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
                                ₹50.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹45.0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/demo-product-23-iLZaLC'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6fb8d4217.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Artificial Leather Shoes for Men by Mosharrof
                                Shoes
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
                                ₹55.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹49.5</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/demo-product-22-683ZUQ'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
                            <img
                              style={{
                                height: "125px!important",
                                width: "125px!important",
                                borderRadius: "5px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-19-625e6f7c06567.png"
                            />
                          </div>
                        </div>
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Demo Product 22
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
                                ₹55.0
                              </strike>
                            </div>
                            <div className="flash-product-price">₹49.5</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/product-111-s6WUwV'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
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
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/timex-marlin-stainless-steel-hand-wound-movement-Czd48g'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Quartz wrist watch waterproof watch for Men and
                                Women
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
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/test-asdf-ZEYzZC'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                New Design Trendy Casual Sneakers for Men
                                Lightweight &amp; Comfortable For Party We
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
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                          <div>
                            <div>
                              <span className="flash-product-title">
                                Hot Selling Sneakers, Sneakers Men Casual Shoes
                                Men Fashion Sneakers Fly knit Li
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
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "309.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        marginLeft: "6px",
                      }}
                      onclick="location.href='https://6valley.6amtech.com/product/product-test-LoiBIu'"
                    >
                      <div
                        className="d-flex"
                        style={{ top: 0, position: "absolute" }}
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
                          className="d-flex align-items-center justify-content-center"
                          style={{ paddingLeft: "12px", paddingTop: "12px" }}
                        >
                          <div className="flash-deals-background-image">
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
                        <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
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
                  </div>
                </div>
              </div>
              <div className="owl-nav">
                <button type="button" role="presentation" className="owl-prev">
                  <i className="czi-arrow-left" />
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <i className="czi-arrow-right" />
                </button>
              </div>
              <div className="owl-dots disabled" />
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="container rtl mt-3">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="row d-flex justify-content-between m-3">
                  <div>
                    <img
                      style={{ height: "30px", width: "30px" }}
                      src="https://6valley.6amtech.com/public/assets/front-end/png/best sellings.png"
                      alt=""
                    />
                    <span
                      style={{
                        marginLeft: "10px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      Best sellings
                    </span>
                  </div>
                  <div>
                    <Link
                      className="text-capitalize view-all-text"
                      to="/products?data_from=best-selling&page=1"
                    >
                      View all
                      <i className="czi-arrow-right-circle ml-1 mr-n1" />
                    </Link>
                  </div>
                </div>
                <div className="row ml-2 mr-3 mb-2">
                  <div
                    className="col-12 m-1"
                    style={{
                      borderStyle: "solid",
                      borderColor: "#0000000d",
                      borderRadius: "5px",
                    }}
                    data-href="/product/test-6-Pg6Hpj"
                  >
                    <div
                      className="d-flex"
                      style={{ top: 0, position: "absolute", left: 0 }}
                    >
                      <span
                        className="for-discoutn-value p-1 pl-2 pr-2"
                        style={{ borderRadius: "5px 0px" }}
                      >
                        10% Off
                      </span>
                    </div>
                    <div className="row" style={{ padding: "8px" }}>
                      <div className="best-selleing-image">
                        <Link
                          className="d-block d-flex justify-content-center"
                          style={{ width: "100%", height: "100%" }}
                          to="/product/test-6-Pg6Hpj"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-6263633d3b0a6.png"
                            alt="Product"
                          />
                        </Link>
                      </div>
                      <div className="best-selling-details" style={{}}>
                        <h6 className="widget-product-title">
                          <Link className="ptr" to="/product/test-6-Pg6Hpj">
                            Exclusive &amp; Fashionable Suit For Men
                          </Link>
                        </h6>
                        <div className="rating-show">
                          <span className="d-inline-block font-size-sm text-body">
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <label className="badge-style">( 1 )</label>
                          </span>
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
                        <div className="widget-product-meta">
                          <span className="text-accent">₹450.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 m-1"
                    style={{
                      borderStyle: "solid",
                      borderColor: "#0000000d",
                      borderRadius: "5px",
                    }}
                    data-href="/product/test-1-DcD1hE"
                  >
                    <div
                      className="d-flex"
                      style={{ top: 0, position: "absolute", left: 0 }}
                    >
                      <span
                        className="for-discoutn-value p-1 pl-2 pr-2"
                        style={{ borderRadius: "5px 0px" }}
                      >
                        10% Off
                      </span>
                    </div>
                    <div className="row" style={{ padding: "8px" }}>
                      <div className="best-selleing-image">
                        <Link
                          className="d-block d-flex justify-content-center"
                          style={{ width: "100%", height: "100%" }}
                          to="/product/test-1-DcD1hE"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                            alt="Product"
                          />
                        </Link>
                      </div>
                      <div className="best-selling-details" style={{}}>
                        <h6 className="widget-product-title">
                          <Link className="ptr" to="/product/test-1-DcD1hE">
                            Women's long-sleeve lightweight french terry fleece
                            quarter-zip top
                          </Link>
                        </h6>
                        <div className="rating-show">
                          <span className="d-inline-block font-size-sm text-body">
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <label className="badge-style">( 1 )</label>
                          </span>
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
                        <div className="widget-product-meta">
                          <span className="text-accent">₹450.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 m-1"
                    style={{
                      borderStyle: "solid",
                      borderColor: "#0000000d",
                      borderRadius: "5px",
                    }}
                    data-href="/product/test-3-ibgkHB"
                  >
                    <div className="row" style={{ padding: "8px" }}>
                      <div className="best-selleing-image">
                        <Link
                          className="d-block d-flex justify-content-center"
                          style={{ width: "100%", height: "100%" }}
                          to="/product/test-3-ibgkHB"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-62636369a0855.png"
                            alt="Product"
                          />
                        </Link>
                      </div>
                      <div className="best-selling-details" style={{}}>
                        <h6 className="widget-product-title">
                          <Link className="ptr" to="/product/test-3-ibgkHB">
                            Ladies Winter Long Sleeve Sweater
                          </Link>
                        </h6>
                        <div className="rating-show">
                          <span className="d-inline-block font-size-sm text-body">
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <label className="badge-style">( 3 )</label>
                          </span>
                        </div>
                        <div></div>
                        <div className="widget-product-meta">
                          <span className="text-accent">₹5,000.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2 mt-md-0">
            <div className="card">
              <div className="card-body">
                <div className="row d-flex justify-content-between m-3">
                  <div>
                    <img
                      style={{ height: "30px", width: "30px" }}
                      src="https://6valley.6amtech.com/public/assets/front-end/png/top-rated.png"
                      alt=""
                    />
                    <span
                      style={{
                        marginLeft: "10px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      Top rated
                    </span>
                  </div>
                  <div>
                    <Link
                      className="text-capitalize view-all-text"
                      to="/products?data_from=top-rated&page=1"
                    >
                      View all
                      <i className="czi-arrow-right-circle ml-1 mr-n1" />
                    </Link>
                  </div>
                </div>
                <div className="row ml-2 mr-3 mb-2">
                  <div
                    className="col-12 m-1"
                    style={{
                      borderStyle: "solid",
                      borderColor: "#0000000d",
                      borderRadius: "5px",
                    }}
                    data-href="/product/product-123-6fJ1ft"
                  >
                    <div
                      className="d-flex"
                      style={{ top: 0, position: "absolute", left: 0 }}
                    >
                      <span
                        className="for-discoutn-value p-1 pl-2 pr-2"
                        style={{ borderRadius: "5px 0px" }}
                      >
                        10% Off
                      </span>
                    </div>
                    <div className="row" style={{ padding: "8px" }}>
                      <div className="top-rated-image">
                        <Link
                          className="d-block d-flex justify-content-center"
                          style={{ width: "100%", height: "100%" }}
                          to="/product/product-123-6fJ1ft"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png"
                            alt="Product"
                          />
                        </Link>
                      </div>
                      <div className="top-rated-details">
                        <h6 className="widget-product-title">
                          <Link
                            className="ptr"
                            to="/product/product-123-6fJ1ft"
                          >
                            Simple Mobile Carrier-Locked Galaxy A50 4G LTE
                            Prepaid Smartphone - Blac
                          </Link>
                        </h6>
                        <div className="rating-show">
                          <span className="d-inline-block font-size-sm text-body">
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <label className="badge-style">( 2 )</label>
                          </span>
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
                        <div className="widget-product-meta">
                          <span className="text-accent">₹450.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 m-1"
                    style={{
                      borderStyle: "solid",
                      borderColor: "#0000000d",
                      borderRadius: "5px",
                    }}
                    data-href="/product/test-3-ibgkHB"
                  >
                    <div className="row" style={{ padding: "8px" }}>
                      <div className="top-rated-image">
                        <Link
                          className="d-block d-flex justify-content-center"
                          style={{ width: "100%", height: "100%" }}
                          to="/product/test-3-ibgkHB"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-62636369a0855.png"
                            alt="Product"
                          />
                        </Link>
                      </div>
                      <div className="top-rated-details">
                        <h6 className="widget-product-title">
                          <Link className="ptr" to="/product/test-3-ibgkHB">
                            Ladies Winter Long Sleeve Sweater
                          </Link>
                        </h6>
                        <div className="rating-show">
                          <span className="d-inline-block font-size-sm text-body">
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <label className="badge-style">( 3 )</label>
                          </span>
                        </div>
                        <div></div>
                        <div className="widget-product-meta">
                          <span className="text-accent">₹5,000.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 m-1"
                    style={{
                      borderStyle: "solid",
                      borderColor: "#0000000d",
                      borderRadius: "5px",
                    }}
                    data-href="/product/test-6-Pg6Hpj"
                  >
                    <div
                      className="d-flex"
                      style={{ top: 0, position: "absolute", left: 0 }}
                    >
                      <span
                        className="for-discoutn-value p-1 pl-2 pr-2"
                        style={{ borderRadius: "5px 0px" }}
                      >
                        10% Off
                      </span>
                    </div>
                    <div className="row" style={{ padding: "8px" }}>
                      <div className="top-rated-image">
                        <Link
                          className="d-block d-flex justify-content-center"
                          style={{ width: "100%", height: "100%" }}
                          to="/product/test-6-Pg6Hpj"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-6263633d3b0a6.png"
                            alt="Product"
                          />
                        </Link>
                      </div>
                      <div className="top-rated-details">
                        <h6 className="widget-product-title">
                          <Link className="ptr" to="/product/test-6-Pg6Hpj">
                            Exclusive &amp; Fashionable Suit For Men
                          </Link>
                        </h6>
                        <div className="rating-show">
                          <span className="d-inline-block font-size-sm text-body">
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <i className="sr-star czi-star-filled active" />
                            <label className="badge-style">( 1 )</label>
                          </span>
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
                        <div className="widget-product-meta">
                          <span className="text-accent">₹450.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container rtl mt-3 mb-3">
        <div className="categories-view-all">
          <Link
            className="text-capitalize view-all-text"
            to="/allads"
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "20px",
            }}
          >
            View all
            <i className="czi-arrow-right-circle ml-1 mr-n1" />
          </Link>
        </div>

        <Carousel style={{ marginBottom: "50px", maxHeight: "350px" }}>
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              // src={ele.photo}
              src="/abc/fav2.jpg"
              alt="First slide"
              style={{ maxHeight: "400px", width: "100%" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              // src={ele.photo}
              src="/abc/fav2.jpg"
              alt="First slide"
              style={{ maxHeight: "400px", width: "100%" }}
            />
          </Carousel.Item> */}
          {ads?.slice(0, 3)?.map((ele) => {
            return (
              <>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={ele.photo}
                    alt="First slide"
                    style={{ maxHeight: "400px", width: "100%" }}
                  />
                </Carousel.Item>
              </>
            );
          })}
        </Carousel>
      </div>

      {!!mainState?.resHome?.topcategoryproduct?.length ? (
        mainState.resHome.topcategoryproduct.map((item) => (
          <section className="container rtl mb-3">
            <div
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div className="flex-between pl-4">
                <div className="category-product-view-title">
                  <span
                    className="for-feature-title float-left"
                    style={{
                      fontWeight: 700,
                      fontSize: "20px",
                      textTransform: "uppercase",
                      textAlign: "left",
                    }}
                  >
                    {/* Bags &amp; Shoes */}
                    {item?.category_name}
                  </span>
                </div>
                <div className="category-product-view-all">
                  <Link
                    className="text-capitalize view-all-text "
                    to={`/products?categoryId=${item?._id}`}
                  >
                    View all
                    <i className="czi-arrow-right-circle ml-1 mr-n1" />
                  </Link>
                </div>
              </div>
              <div className="row mt-2 mb-3 d-flex justify-content-between">
                <div className="col-md-3 col-12 pl-3 pr-3">
                  <Link
                    to={`/products?categoryId=${item?._id}`}
                    style={{ cursor: "pointer", aspectRatio: "1/1" }}
                  >
                    <img
                      className
                      style={{
                        width: "100%",
                        borderRadius: "5px 5px 0px 0px",
                        // borderRadius: "5px",
                        // height: "300px",
                        aspectRatio: "1/1",
                      }}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png";
                      }}
                      src={item?.category_icon || ""}
                      // src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566cf5b061b.png"
                    />
                  </Link>
                </div>
                <div className="col-md-9 col-12 ">
                  <div className="row d-flex">
                    {!!item?.products?.length &&
                      item.products.slice(0, 4).map((item2) => (
                        <div className="col-md-3 col-6 mt-2 mt-md-0" style={{}}>
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
                                // maxHeight: "195px",
                                aspectRatio: "1/1",
                              }}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  left: "5px",
                                  top: "0px",
                                  position: "absolute",
                                }}
                              >
                                <span className="for-discoutn-value p-1 pl-2 pr-2">
                                  {`${(
                                    ((item2.display_price -
                                      item2.selling_price) *
                                      100) /
                                    item2.selling_price
                                  ).toFixed(0)}% Off`}
                                </span>
                              </div>
                              <div
                                className="d-flex d-block "
                                style={{ cursor: "pointer" }}
                              >
                                <Link
                                  to={`/product/${item2?.product_id}`}
                                  style={{
                                    aspectRatio: "1/1",
                                  }}
                                >
                                  <img
                                    src={item2?.pphoto}
                                    // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe4bc22bd3.png"
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src =
                                        "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png";
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
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
                                minHeight: "105px",
                                borderRadius: "0px 0px 5px 5px",
                              }}
                            >
                              <div className="text-center">
                                <Link
                                  to="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-0uKU4j"
                                  style={{ fontWeight: 400, fontSize: "13px" }}
                                >
                                  {item2?.pname?.slice(0, 15) || "..."}
                                </Link>
                              </div>
                              <div className="rating-show justify-content-between text-center">
                                <span
                                  className="d-inline-block font-size-sm text-body"
                                  style={{ fontWeight: 400, fontSize: "10px" }}
                                >
                                  <Rating
                                    readonly
                                    fractions={2}
                                    initialRating={
                                      item2?.product_review_avg || 0
                                    }
                                    style={{ color: "#fea569" }}
                                    emptySymbol="fa fa-star-o mr-1"
                                    fullSymbol="fa fa-star mr-1"
                                    // emptySymbol="fa fa-star-o fa-2x"
                                    // fullSymbol="fa fa-star fa-2x"
                                    // onClick={(val) => setStar(val)}
                                    // onHover={(val) => setStar(val)}
                                  />
                                  {/* <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" />
                                  <i className="sr-star czi-star-filled active mr-1" />
                                  <i
                                    className="sr-star czi-star mr-1"
                                    style={{ color: "#fea569 !important" }}
                                  /> */}
                                  <label className="badge-style">
                                    ( {item2?.product_review_count} )
                                  </label>
                                </span>
                              </div>
                              <div className="justify-content-between text-center">
                                <div
                                  className="product-price text-center"
                                  style={{ fontWeight: 400, fontSize: "12px" }}
                                >
                                  <strike
                                    style={{
                                      fontSize: "12px!important",
                                      color: "#E96A6A!important",
                                    }}
                                  >
                                    ₹{item2?.display_price || "..."}
                                  </strike>
                                  <br />
                                  <span className="text-accent">
                                    {" "}
                                    ₹{item2?.selling_price || "..."}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center quick-view">
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                                to="#"
                                onClick={() => {
                                  handleModalOpen(item2);
                                }}
                              >
                                <i className="czi-eye align-middle mr-1" />
                                Quick View
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <ClipLoader
            // color={"#ffffff"}
            // loading={!!camps}
            loading
            // cssOverride={override}
            // size={150}
          />
        </div>
      )}

      <div className="container rtl mb-3">
        <div
          className="row shipping-policy-web"
          style={{ marginRight: "0px", marginLeft: "0px" }}
        >
          <div className="col-md-3 d-flex justify-content-center">
            <div className="shipping-method-system">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="assets/front-end/png/delivery.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <p>Fast Delivery all accross the country</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-center">
            <div className="shipping-method-system">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="assets/front-end/png/Payment.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <p>Safe Payment</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-center">
            <div className="shipping-method-system">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="assets/front-end/png/money.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <p>7 Days Return Policy</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-center">
            <div className="shipping-method-system">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="assets/front-end/png/Genuine.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <p>100% Authentic Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: finish this */}
      {/* <div>
        <button
          onClick={() =>
            navigate({
              pathname: "/products",
              // search:"?brandId=xyz&categoryId=abc",
              // search: `?${createSearchParams({
              //     brandId: "ABSADJ2718391231237192",
              //     categoryId: "asdas78asASBDAa6sd8",
              //   })}`,
              search: createSearchParams({
                brandId: "ABSADJ2718391231237192",
                categoryId: "asdas78asASBDAa6sd8",
              }).toString(),
            })
          }
        >
          Test
        </button>
      </div> */}

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>

      <Modal
        size="xl"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "white",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>{modalState?.pname}</Modal.Title>
          <Button onClick={() => setIsModalOpen(false)} variant="outline-dark">
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-lg-6 col-md-6">
              <div className="cz-product-gallery">
                <div className="cz-preview">
                  <div className="cz-preview-item d-flex align-items-center justify-content-center  active">
                    <img
                      className="show-imag img-responsive"
                      style={{ maxHeight: "500px!important" }}
                      src={modalState?.pphoto || dummyProductImage}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyProductImage;
                      }}
                      alt="Product image"
                      width
                    />
                  </div>
                  {/* <div className="cz-preview-item d-flex align-items-center justify-content-center  ">
                    <img
                      className="show-imag img-responsive"
                      style={{ maxHeight: "500px!important" }}
                      src={modalState?.pphoto || dummyProductImage}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyProductImage;
                      }}
                      alt="Product image"
                      width
                    />
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "515px", padding: "0px" }}
                >
                  <div className="d-flex">
                    <div className="cz-thumblist">
                      <a
                        href="javascript:"
                        className=" cz-thumblist-item d-flex align-items-center justify-content-center"
                      >
                        <img
                          className="click-img"
                          src={modalState?.pphoto || dummyProductImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyProductImage;
                          }}
                          alt="Product thumb"
                        />
                      </a>
                    </div>
                    <div className="cz-thumblist">
                      <a
                        href="javascript:"
                        className=" cz-thumblist-item d-flex align-items-center justify-content-center"
                      >
                        <img
                          className="click-img"
                          src={modalState?.pphoto || dummyProductImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyProductImage;
                          }}
                          alt="Product thumb"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Product details*/}
            <div className="col-lg-6 col-md-6 mt-md-0 mt-sm-3">
              <div className="details" style={{ textAlign: "left" }}>
                <Link
                  to={`/product/${modalState?.product_id}`}
                  className="h3 mb-2 product-title"
                >
                  {modalState?.pname}
                </Link>
                <div className="d-flex align-items-center mb-2 pro">
                  <span className="d-inline-block font-size-sm text-body align-middle mt-1 mr-2 pr-2">
                    {modalState?.review_avg || "0.0"}
                  </span>
                  <div className="star-rating">
                    <Rating
                      readonly
                      fractions={2}
                      initialRating={modalState?.review_avg || 0}
                      style={{ color: "#fea569" }}
                      emptySymbol="fa fa-star-o mr-1"
                      fullSymbol="fa fa-star mr-1"
                      // emptySymbol="fa fa-star-o fa-2x"
                      // fullSymbol="fa fa-star fa-2x"
                    />
                    {/* <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" /> */}
                  </div>
                  <div>
                    <span className="d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-2 pl-2 pr-2">
                      {`${modalState?.review_count || "0"} Reviews`}
                    </span>
                    <span
                      style={{
                        width: "0px",
                        height: "10px",
                        border: "0.5px solid #707070",
                        marginTop: "6px",
                      }}
                    />
                    <span className="d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-2 pl-2 pr-2">
                      {`${modalState?.totalOrders || "0"} Orders`}
                    </span>
                    <span
                      style={{
                        width: "0px",
                        height: "10px",
                        border: "0.5px solid #707070",
                        marginTop: "6px",
                      }}
                    >
                      {" "}
                    </span>
                    <span className="d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-2 pl-2 pr-2">
                      {" "}
                      {`${modalState?.totalwishlisted || "0"} Wish`}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="h3 font-weight-normal text-accent mr-1">
                    ₹{modalState?.selling_price}
                  </span>
                </div>
                <div className="flex-start mb-3">
                  <div>
                    <strong>Tax : </strong>
                  </div>
                  <div>
                    <strong id="set-tax-amount" className="mx-2">
                      ₹{0}
                    </strong>
                  </div>
                </div>
                <form id="add-to-cart-form" className="mb-2">
                  {/* Quantity + Add to cart */}
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="product-description-label mt-2">
                        Quantity:
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="product-quantity d-flex align-items-center">
                        <div
                          className="input-group input-group--style-2 pr-3"
                          style={{ width: "160px" }}
                        >
                          <span className="input-group-btn">
                            <button
                              className="btn btn-number"
                              type="button"
                              data-type="minus"
                              data-field="quantity"
                              // disabled="disabled"
                              style={{ padding: "10px" }}
                              onClick={() => {
                                decreaseQuantity();
                              }}
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
                            // product-type="physical"
                            // min={1}
                            // max={1}
                            value={modalState?.quantity}
                            onChange={handleInputChange}
                          />
                          <span className="input-group-btn">
                            <button
                              className="btn btn-number"
                              product-type="physical"
                              type="button"
                              data-type="plus"
                              data-field="quantity"
                              style={{ padding: "10px" }}
                              onClick={() => {
                                increaseQuantity();
                              }}
                            >
                              +
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters mt-2" id="chosen_price_div">
                    <div className="col-2">
                      <div className="product-description-label">
                        Total Price:
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="product-price">
                        <strong id="chosen_price">
                          ₹{modalState?.totalPrice}
                        </strong>
                      </div>
                    </div>
                    <div className="col-12"></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-secondary"
                      onclick="buy_now()"
                      type="button"
                      style={{ width: "37%", height: "45px" }}
                    >
                      Buy now
                    </button>
                    <button
                      className="btn btn--primary string-limit"
                      onclick="addToCart()"
                      type="button"
                      style={{
                        width: "37%",
                        height: "45px",
                        color: "#fff",
                        backgroundColor: "#3b71de",
                        borderColor: "#3b71de",
                      }}
                      disabled={modalState.quantity < 1}
                      onClick={(e) => {
                        if (!state.isUserLoggedIn) {
                          // alert("Please Login to continue");
                          navigate("/customer/auth/login");
                        } else {
                          apiHandleAddToCart(e);
                        }
                      }}
                    >
                      Add to cart
                    </button>
                    {/* <button
                      type="button"
                      onclick="addWishlist('3')"
                      className="btn btn-dark for-hover-bg string-limit"
                      style={{}}
                      onClick={(e) => {
                        if (!state.isUserLoggedIn) {
                          navigate("/customer/auth/login");
                        } else {
                          apiHandleWishList(e);
                        }
                      }}
                    >
                      <i
                        className={
                          modalState.isWishList
                            ? "fa fa-heart"
                            : "fa fa-heart-o mr-2"
                        }
                        aria-hidden="true"
                      />
                    </button> */}
                  </div>
                </form>
                {/* Product panels*/}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CustomerHomePage;
