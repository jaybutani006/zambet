import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CustomerFooter() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [state, dispatch] = useContext(Context);

  const handleSubscribe = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/newsletter",
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email,
        referrer: "",
        source: "",
      }),
    })
      .then((response) => {
        console.log(response.data);
        // alert("Check Your email to confirm you subscription");
        alert("You are successfully subscribed to our newsletter");
        setIsValidEmail(true);
        setEmail("");
      })
      .catch((error) => {
        // alert("You are already registered");
        defaultAPIErrorHandler(error);
      });
  };

  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    // EMAIL

    console.log(1, validEmailRegex.test(email));

    if (email === "") {
      // nothing
    } else {
    }
  }, [email]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        .headerTitle {\n            font-size: 25px;\n            font-weight: 700;\n            margin-top: 2rem;\n        }\n\n        body {\n            font-family: 'Titillium Web', sans-serif\n        }\n\n        .product-qty span {\n            font-size: 14px;\n            color: #6A6A6A;\n        }\n\n        .btn-link {\n            color: #4c5056e3;\n        }\n\n        .btnF {\n            display: inline-block;\n            font-weight: normal;\n            margin-top: 4%;\n            color: #4b566b;\n            text-align: center;\n            vertical-align: middle;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            background-color: transparent;\n            border: 1px solid transparent;\n            font-size: .9375rem;\n            transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, box-shadow 0.2s ease-in-out;\n        }\n\n        @media (max-width: 600px) {\n            .sidebar_heading {\n                background: #3b71de\n            }\n\n            .sidebar_heading h1 {\n                text-align: center;\n                color: aliceblue;\n                padding-bottom: 17px;\n                font-size: 19px;\n            }\n\n            .headerTitle {\n\n                font-weight: 700;\n                margin-top: 1rem;\n            }\n        }\n\n    ",
        }}
      />
      <div
        className="d-flex justify-content-center text-center text-md-left mt-3"
        style={{ background: "rgba(59, 113, 222, 1)", padding: "20px" }}
      >
        <div className="col-md-3 d-flex justify-content-center">
          <div>
            <Link to="/about-us">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="/assets/front-end/png/aboutcompany.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center", color: "#ffffff" }}>
                <p>About Company</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center">
          <div>
            <Link to="/contacts">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="/assets/front-end/png/contactus.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center", color: "#ffffff" }}>
                <p>Contact Us</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center">
          <div>
            <Link to="/helpTopic">
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src="/assets/front-end/png/faq.png"
                  alt=""
                />
              </div>
              <div style={{ textAlign: "center", color: "#ffffff" }}>
                <p>FAQ</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <footer className="page-footer font-small mdb-colorrtl">
        <div
          style={{ background: "rgba(59, 113, 222, 1)", paddingTop: "30px" }}
        >
          <div
            className="container text-center"
            style={{ paddingBottom: "13px" }}
          >
            <div className="row text-center text-md-left mt-3 pb-3 ">
              <div className="col-md-3 d-flex justify-content-start align-items-center footer-web-logo">
                <Link
                  className="d-inline-block mt-n1"
                  to="/"
                  style={{
                    backgroundColor: "rgb(59, 113, 222)",
                  }}
                >
                  <img
                    style={{ height: "46px", width: "180px" }}
                    src="/zambet_logo.png"
                    alt="Zambet"
                  />
                </Link>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-3 footer-padding-bottom">
                    <h6 className="text-uppercase mb-4 font-weight-bold footer-heder">
                      Special
                    </h6>
                    <ul
                      className="widget-list"
                      style={{ paddingBottom: "10px" }}
                    >
                      <li className="widget-list-item">
                        <Link className="widget-list-link" to="/flash-deals/4">
                          Flash Deal
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link
                          className="widget-list-link"
                          to="/products/featured_products"
                        >
                          Featured Products
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link
                          className="widget-list-link"
                          to="/products/latest-products"
                        >
                          Latest Products
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link
                          className="widget-list-link"
                          to="/products/best_selling_products"
                        >
                          Best Selling Products
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link
                          className="widget-list-link"
                          to="/products/top_rated_products"
                        >
                          Top Rated Products
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 footer-padding-bottom" style={{}}>
                    <h6 className="text-uppercase mb-4 font-weight-bold footer-heder">
                      Account &amp; shipping info
                    </h6>
                    <ul
                      className="widget-list"
                      style={{ paddingBottom: "10px" }}
                    >
                      <li className="widget-list-item">
                        <Link className="widget-list-link" to="/user-account">
                          Profile Info
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link className="widget-list-link" to="/wishlists">
                          Wish List
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link className="widget-list-link" to="/account-oder">
                          Track Order
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link
                          className="widget-list-link"
                          to="/account-address"
                        >
                          Address
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link className="widget-list-link" to="/pricing-policy">
                          Pricing Policy
                        </Link>
                      </li>
                      <li className="widget-list-item">
                        <Link className="widget-list-link" to="/replace-policy">
                          Replacement Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-5 footer-padding-bottom">
                    <div className="d-flex justify-content-center">
                      <h6 className="text-uppercase font-weight-bold footer-heder align-items-center">
                        Download our app
                      </h6>
                    </div>
                    <div className="store-contents d-flex justify-content-center">
                      <div className="mr-2 mb-2">
                        <a
                          className
                          href={process.env.REACT_APP_ZAMBET_IOSAPPLINK}
                          role="button"
                          target={"_blank"}
                        >
                          <img
                            src="/assets/front-end/png/apple_app.png"
                            alt=""
                            style={{ height: "51px!important" }}
                          />
                        </a>
                      </div>
                      <div className="mr-2 mb-2">
                        <a
                          href={process.env.REACT_APP_ZAMBET_ANDROIDAPPLINK}
                          role="button"
                          target={"_blank"}
                        >
                          <img
                            src="/assets/front-end/png/google_app.png"
                            alt=""
                            style={{ height: "51px!important" }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="text-nowrap mb-2">
                      <span style={{ fontWeight: 700, fontSize: "14.3208px" }}>
                        NEWS LETTER
                      </span>
                      <br />
                      <span style={{ fontWeight: 400, fontSize: "11.066px" }}>
                        Subscribe to our new channel to get latest updates
                      </span>
                    </div>
                    <div
                      className="text-nowrap mb-4"
                      style={{ position: "relative" }}
                    >
                      <form>
                        <input
                          type="email"
                          name="subscription_email"
                          className="form-control subscribe-border"
                          placeholder="Your Email Address"
                          style={{ padding: "11px", textAlign: "left" }}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setIsValidEmail(
                              e.target.value === ""
                                ? ""
                                : !validEmailRegex.test(email)
                                ? "Must be a valid Email"
                                : ""
                            );
                          }}
                        />
                        <small>{isValidEmail}</small>
                        <button
                          className="subscribe-button"
                          // type="submit"
                          style={{
                            float: "right",
                            right: "0px",
                            borderRadius: "0px 5px 5px 0px",
                            fontSize: ".94rem",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleSubscribe();
                          }}
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="row d-flex align-items-center mobile-view-center-align ">
                      <div style={{}}>
                        <span className="mb-4 font-weight-bold footer-heder">
                          Start a conversation
                        </span>
                      </div>
                      <div className="ml-3">
                        <hr
                          className="start_address_under_line"
                          style={{ border: "1px solid #E0E0E0" }}
                        />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-11 start_address ">
                        <div style={{ color: "" }}>
                          <a
                            className="widget-list-link"
                            href={`tel: ${
                              process.env.REACT_APP_ZAMBET_PHONE || ""
                            }`}
                          >
                            <span>
                              <i className="fa fa-phone m-2" />
                              {`+${process.env.REACT_APP_ZAMBET_PHONE || ""}`}
                            </span>
                          </a>
                        </div>
                        <div style={{}} className>
                          <a className="widget-list-link" href="email:">
                            <span>
                              <i className="fa fa-envelope m-2" />{" "}
                              info@zambet.in{" "}
                            </span>
                          </a>
                        </div>
                        <div style={{}} className>
                          <Link
                            className="widget-list-link"
                            to="/customer/auth/login"
                          >
                            <span>
                              <i className="fa fa-user-o m-2" /> Support Ticket{" "}
                            </span>
                          </Link>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 ">
                    <div className="row pl-2 d-flex align-items-center mobile-view-center-align ">
                      <div>
                        <span className="mb-4 font-weight-bold footer-heder">
                          Address
                        </span>
                      </div>
                      <div className="ml-3">
                        <hr
                          className="address_under_line"
                          style={{ border: "1px solid #E0E0E0" }}
                        />
                      </div>
                    </div>
                    <div className="row pl-2">
                      <span style={{ fontSize: "14px" }}>
                        <i className="fa fa-map-marker m-2" />
                        {process.env.REACT_APP_ZAMBET_ADDRESS || ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "rgba(59, 113, 222, 1)" }}>
          <div className="container">
            <div className="row end-footer footer-end last-footer-content-align">
              <div className=" mt-3">
                <p className="text-left" style={{ fontSize: "16px" }}>
                  CopyRight @2022 Zambet
                </p>
              </div>
              <div className="mt-md-3 mt-0 mb-md-3 text-left">
                <span className="social-media ">
                  <a
                    className="social-btn sb-light sb-twitter mr-2 mb-2"
                    target="_blank"
                    href="https://www.twitter.com/"
                    style={{ color: "white!important" }}
                  >
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </span>
                <span className="social-media ">
                  <a
                    className="social-btn sb-light sb-linkedin mr-2 mb-2"
                    target="_blank"
                    href="https://www.linkedin.com/"
                    style={{ color: "white!important" }}
                  >
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                </span>
                <span className="social-media ">
                  <a
                    className="social-btn sb-light sb-google-plus mr-2 mb-2"
                    target="_blank"
                    href="https://www.google.com/"
                    style={{ color: "white!important" }}
                  >
                    <i
                      className="fa fa-google-plus-square"
                      aria-hidden="true"
                    />
                  </a>
                </span>
                <span className="social-media ">
                  <a
                    className="social-btn sb-light sb-pinterest mr-2 mb-2"
                    target="_blank"
                    href="https://www.pinterest.com/"
                    style={{ color: "white!important" }}
                  >
                    <i className="fa fa-pinterest" aria-hidden="true" />
                  </a>
                </span>
                <span className="social-media ">
                  <a
                    className="social-btn sb-light sb-instagram mr-2 mb-2"
                    target="_blank"
                    href="https://www.instagram.com/"
                    style={{ color: "white!important" }}
                  >
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </span>
                <span className="social-media ">
                  <a
                    className="social-btn sb-light sb-facebook mr-2 mb-2"
                    target="_blank"
                    href="https://facebook.com"
                    style={{ color: "white!important" }}
                  >
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                </span>
              </div>
              <div className="d-flex" style={{ fontSize: "14px" }}>
                <div className="mr-3">
                  <Link className="widget-list-link" to="/terms">
                    Terms &amp; Conditions
                  </Link>
                </div>
                <div>
                  <Link className="widget-list-link" to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CustomerFooter;
