// import "App.css";
import flashdealPlaceholderImage from "assets/flashdealPlaceholderImage.png";
import dummyProductImage from "assets/dummyProductImage.png";

import { useEffect } from "react";
import FlashDealTimer from "./FlashDealTimer";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "context/newContext";
import axios from "axios";
import { getPercentageOff } from "utils/utility";
import { useNavigate } from "react-router-dom";
import { truncate } from "utils/truncateText";
import Rating from "react-rating";

const { Helmet } = require("react-helmet");

function FlashDeals() {
  const initialState = {}
  const navigate = useNavigate()
  const [mainState, setMainState] = useState(initialState)
  const [state, dispatch] = useContext(Context)
  const [FlashDealDeadlineDate, setFlashDealDeadlineDate] = useState("")

  const apiGetFlashDealForCustomer = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal/customer",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          ...response?.data?.data?.[0]
        }));
        setFlashDealDeadlineDate(response?.data?.data?.[0]?.end_date || "")
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetFlashDealForCustomer()
  }, [])

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          // media="screen"
          href={
            process.env.PUBLIC_URL +
            "/flashdeal.css"
            // "https://6valley.6amtech.com/public/assets/front-end/css/style.css"
          }
        />
      </Helmet>



      <style dangerouslySetInnerHTML={{ __html: "\n        .rtl {\n            direction: ltr;\n        }\n\n        .password-toggle-btn .password-toggle-indicator:hover {\n            color: #3b71de;\n        }\n\n        .password-toggle-btn .custom-control-input:checked ~ .password-toggle-indicator {\n            color: #f58300;\n        }\n\n        .dropdown-item:hover, .dropdown-item:focus {\n            color: #3b71de;\n        }\n\n        .dropdown-item.active, .dropdown-item:active {\n            color: #f58300;\n        }\n\n        .navbar-light .navbar-tool-icon-box {\n            color: #3b71de;\n        }\n\n        .search_button {\n            background-color: #3b71de;\n        }\n\n\n        .navbar-stuck-menu {\n            background-color: #3b71de;\n        }\n\n        .mega-nav .nav-item .nav-link {\n            color: #3b71de                           !important;\n        }\n        .checkbox-alphanumeric label:hover {\n            border-color: #3b71de;\n        }\n\n        ::-webkit-scrollbar-thumb:hover {\n            background: #f58300        !important;\n        }\n\n        [type=\"radio\"] {\n            border: 0;\n            clip: rect(0 0 0 0);\n            height: 1px;\n            margin: -1px;\n            overflow: hidden;\n            padding: 0;\n            position: absolute;\n            width: 1px;\n        }\n\n        [type=\"radio\"] + span:after {\n            box-shadow: 0 0 0 0.10em#f58300;\n        }\n\n        [type=\"radio\"]:checked + span:after {\n            background: #f58300;\n            box-shadow: 0 0 0 0.10em#f58300;\n        }\n        .navbar-tool .navbar-tool-label {\n            background-color: #f58300!important;\n        }\n\n        .btn--primary {\n            color: #fff;\n            background-color: #3b71de!important;\n            border-color: #3b71de!important;\n        }\n\n        .btn--primary:hover {\n            color: #fff;\n            background-color: #3b71de!important;\n            border-color: #3b71de!important;\n        }\n\n        .btn-secondary {\n            background-color: #f58300!important;\n            border-color: #f58300!important;\n        }\n\n        .btn-outline-accent:hover {\n            color: #fff;\n            background-color: #3b71de;\n            border-color: #3b71de;\n        }\n\n        .btn-outline-accent {\n            color: #3b71de;\n            border-color: #3b71de;\n        }\n\n        .text-accent {\n            color: #3b71de;\n        }\n\n        a:hover {\n            color: #f58300;\n        }\n\n        .active-menu {\n            color: #f58300!important;\n        }\n\n        .page-item.active > .page-link {\n            box-shadow: 0 0.5rem 1.125rem -0.425rem#3b71de\n\n\n        }\n\n        .page-item.active .page-link {\n            background-color: #3b71de;\n        }\n\n        .btn-outline-accent:not(:disabled):not(.disabled):active, .btn-outline-accent:not(:disabled):not(.disabled).active, .show > .btn-outline-accent.dropdown-toggle {\n            background-color: #f58300;\n            border-color: #f58300;\n        }\n\n        .btn-outline-primary {\n            color: #3b71de;\n            border-color: #3b71de;\n        }\n\n        .btn-outline-primary:hover {\n            background-color: #f58300;\n            border-color: #f58300;\n        }\n\n        .btn-outline-primary:focus, .btn-outline-primary.focus {\n            box-shadow: 0 0 0 0#f58300;\n        }\n\n        .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {\n            background-color: #3b71de;\n            border-color: #3b71de;\n        }\n\n        .btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-primary.dropdown-toggle:focus {\n            box-shadow: 0 0 0 0#3b71de;\n        }\n        .for-discoutn-value {\n            background: #3b71de;\n        }\n        .dropdown-menu {\n            margin-left: -8px !important;\n        }\n    " }} />

      <div className="__inline-59">
        <div className="for-banner container">
          <img className="d-block for-image"
            alt=""
            src={mainState?.banner || flashdealPlaceholderImage}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = flashdealPlaceholderImage;
            }}
          />
        </div>
        <div className="container md-4 mt-3 rtl" style={{ textAlign: 'left' }}>
          <div className="row g-3 flex-center align-items-center">
            <div className="col-sm-auto text-center text-sm-left">
              <span className="flash_deal_title ">
                Flash deal
              </span>
            </div>
            <div className="col-sm-auto ">
              <div className="countdown-background __countdown mx-auto">
                <FlashDealTimer deadline={FlashDealDeadlineDate || ""} />
                {/* <span className="cz-countdown d-flex justify-content-center align-items-center" data-countdown="08/08/2023 11:59:00 PM">
                  <span className="cz-countdown-days align-items-center">
                    <span className="cz-countdown-value">224</span>
                    <span>Day</span>
                  </span>
                  <span className="cz-countdown-value p-1">:</span>
                  <span className="cz-countdown-hours align-items-center">
                    <span className="cz-countdown-value">04</span>
                    <span>Hrs</span>
                  </span>
                  <span className="cz-countdown-value p-1">:</span>
                  <span className="cz-countdown-minutes align-items-center">
                    <span className="cz-countdown-value">54</span>
                    <span>Min</span>
                  </span>
                  <span className="cz-countdown-value p-1">:</span>
                  <span className="cz-countdown-seconds align-items-center">
                    <span className="cz-countdown-value">53</span>
                    <span>Sec</span>
                  </span>
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container pb-5 mb-2 mb-md-4 mt-3 rtl" style={{ textAlign: 'left' }}>
          <div className="row">
            <section className="col-lg-12">
              <div className="row mt-4">
                {!!mainState?.stockandprices?.length &&
                  mainState?.stockandprices?.map((item, index) =>
                    <div className="col-xl-2 col-sm-3 col-6 __mb-10px">
                      <div className="product-single-hover"
                        onClick={() =>
                          navigate(`/product/${item?._id}`)
                        }
                      >
                        <div className="overflow-hidden position-relative">
                          <div className=" inline_product clickable d-flex justify-content-center" style={{ background: '#3b71de10' }}>
                            <div className="d-flex">
                              <span className="for-discoutn-value p-1 pl-2 pr-2">
                                {`${Number(getPercentageOff(item?.display_price, item?.selling_price)).toFixed(0)}% Off`}
                              </span>
                            </div>
                            <div className="d-flex d-block">
                              {/* <a href="https://6valley.6amtech.com/product/test-1-DcD1hE"> */}
                              <img
                                src={item?.products?.[0]?.pphoto?.[0] || dummyProductImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = dummyProductImage;
                                }}
                              />
                              {/* </a> */}
                            </div>
                          </div>
                          <div className="single-product-details">
                            <div className="text-left pl-3">
                              {/* <a href="https://6valley.6amtech.com/product/test-1-DcD1hE"> */}
                              {/* Women's long-sleeve lig... */}
                              {/* </a> */}

                              {truncate(item?.products?.[0]?.pname, 15) || "..."}
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
                                <strike style={{ fontSize: '12px!important', color: '#E96A6A!important' }}>
                                  {`₹ ${item?.display_price || 0}`}
                                </strike><br />
                                <span className="text-accent">
                                  {`₹ ${item?.selling_price || 0}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* <div className="text-center quick-view">
                            <a className="btn btn--primary btn-sm" style={{ marginTop: '0px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px' }} href="javascript:" onclick="quickView('1')">
                              <i className="czi-eye align-middle mr-1" />
                              Quick View
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
              {
                !mainState?.stockandprices?.length &&
                <center>
                  NO PRODUCTS FOUND
                </center>
              }
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlashDeals;
