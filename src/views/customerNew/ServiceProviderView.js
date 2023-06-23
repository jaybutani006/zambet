import {
    Button,
    Dropdown,
    DropdownButton,
    FormControl,
    InputGroup,
    Modal,
  } from "react-bootstrap";
  //
  import axios from "axios";
  import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "context/newContext";
import "./ServiceProviderView.css";
  import dummyShopBanner from "assets/dummyShopBanner.png";
  import dummyShopLogo from "assets/dummyShopLogo.png";
  import dummyProductImage from "assets/dummyProductImage.png";
  import ClipLoader from "react-spinners/ClipLoader";
  import { truncate } from "utils/truncateText";
  import Rating from "react-rating";
  import { defaultAPIErrorHandler } from "api/api";
  
  function ShopView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [portfolioDetails, setPortfolioDetails] = useState();
    const portfolioinfo = () => {
      console.log("called");
      axios({
        method: "get",
        url:
          process.env.REACT_APP_BASEURL +
          "/api/service_provider_portfolio/portfolio_detail?_id=" +
          mainState.sellerId,
        headers: {
          Authorization: state.userToken,
        },
      })
        .then((response) => {
          // if (response.data.data && response.data.data.length) {
          console.log(response.data.data);
          // Handle the response data here
          setPortfolioDetails(response.data.data);
          // }
        })
        .catch(function (error) {
          // Handle the error here
          alert(error);
        });
    };
    const handleModalOpen = (productState) => {
      setIsModalOpen(true);
      setModalState(productState);
    };
    //
    const location = useLocation();
    const navigate = useNavigate();
  
    const [mainState, setMainState] = useState({
      resSeller: {},
      sellerId:
        location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
        "",
    });
  
    const apiGetResSeller = () => {
      axios({
        method: "get",
        url:
          process.env.REACT_APP_BASEURL + "/api/service_provider/detail",
        params: { _id: mainState.sellerId },
        // headers: {
        //   Authorization: state.userToken,
        // },
      })
        .then(function (response) {
          console.log(response.data);
          setMainState((prev) => ({
            ...prev,
            resSeller: response.data.data,
          }));
        })
        .catch(function (error) {
          // defaultAPIErrorHandler(error)
        });
    };
  
    useEffect(() => {
      apiGetResSeller();
      portfolioinfo();
    }, []);
    console.log(mainState.resSeller);
    return (
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row rtl">
          <div className="col-lg-12 mt-2">
            <div style={{ background: "white" }}>
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "13.75rem",
                  borderRadius: "10px",
                }}
                src={mainState?.resSeller?.[0]?.shop_banner || dummyShopBanner}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = dummyShopBanner;
                }}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-12 rtl" style={{ textAlign: "left" }}>
            <div
              style={{
                borderRadius: "10px",
                background: "#ffffff",
                paddingLeft: "5px",
              }}
            >
              <div
                className="row d-flex justify-content-between seller-details"
                style={{}}
              >
                <div className="newClass">
                  <div className="d-flex" style={{ padding: "8px" }}>
                    <div className>
                      <img
                        style={{
                          maxHeight: "115px",
                          width: "120px",
                          borderRadius: "5px",
                        }}
                        src={mainState?.resSeller?.shop_logo || dummyShopLogo}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyShopLogo;
                        }}
                        // src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png"
                        alt=""
                      />
                    </div>
                    <div
                      className="row col-8 mx-1 align-items-center"
                      style={{ display: "inline-block" }}
                    >
                      <span className="ml-4 font-weight-bold ">{`${
                        mainState?.resSeller?.[0]?.shop_name || "..."
                      }`}</span>
                      <div className="row ml-4 flex-start">
                        <div className="mr-3">
                          <i
                            className="sr-star czi-star active"
                            style={{ color: "#fea569" }}
                          />
                          <i
                            className="sr-star czi-star active"
                            style={{ color: "#fea569" }}
                          />
                          <i
                            className="sr-star czi-star active"
                            style={{ color: "#fea569" }}
                          />
                          <i
                            className="sr-star czi-star active"
                            style={{ color: "#fea569" }}
                          />
                          <i
                            className="sr-star czi-star active"
                            style={{ color: "#fea569" }}
                          />
                          <span className="ml-1">(0.0)</span>
                        </div>
                        <div className="d-flex" style={{ fontSize: "12px" }}>
                          <span>0 Reviews </span>
                          <span
                            style={{
                              borderLeft: "1px solid #C4C4C4",
                              margin: "5px",
                            }}
                          />
                          <span>0 Orders</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="newClass2" style={{ padding: "8px" }}>
                    {/* <div className>
                      <img
                        style={{
                          maxHeight: "115px",
                          width: "120px",
                          borderRadius: "5px",
                        }}
                        src={mainState?.resSeller?.shop_logo || dummyShopLogo}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyShopLogo;
                        }}
                        // src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png"
                        alt=""
                      />
                    </div> */}

                    <div
                      className="row col-8 mx-1 align-items-center"
                      style={{ display: "inline-block" }}
                    >
                      <div
                        className="row flex-start"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span className="ml-4 font-weight-bold ">{`${
                          `${mainState?.resSeller?.[0]?.first_name} ${mainState?.resSeller?.[0]?.last_name}` ||
                          "..."
                        }`}</span>
                        <span className="ml-4 font-weight-bold ">{`${
                          mainState?.resSeller?.[0]?.email_address || "..."
                        }`}</span>
                        <span className="ml-4 font-weight-bold ">{`${
                          mainState?.resSeller?.[0]?.contect_no || "..."
                        }`}</span>
                      </div>
                    </div>
                    <div
                      className="row col-8 mx-1 align-items-center"
                      style={{ display: "inline-block" }}
                    >
                      <div
                        className="row flex-start d-flex"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span className="ml-4 font-weight-bold ">{`${
                          mainState?.resSeller?.[0]?.shop_address || "..."
                        }`}</span>
                        {/* mainState?.resSeller?.city */}
                        <span className="ml-4 font-weight-bold ">{`${mainState?.resSeller?.[0]?.city}, ${mainState?.resSeller?.[0]?.state}`}</span>
                        {/* <span className="ml-4 font-weight-bold ">{`${
                          mainState?.resSeller?.state || "..."
                        }`}</span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="mr-4">
                    <div className="d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="card-header">Write something</div>
                  <div className="modal-body">
                    <form id="chat-form">
                      <input
                        type="hidden"
                        name="_token"
                        defaultValue="BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz"
                      />{" "}
                      <input defaultValue={1} name="shop_id" hidden />
                      <input defaultValue="1}" name="seller_id" hidden />
                      <textarea
                        name="message"
                        className="form-control"
                        required
                        defaultValue={""}
                      />
                      <br />
                      <button
                        className="btn btn-primary"
                        style={{ color: "white" }}
                      >
                        Send
                      </button>
                    </form>
                  </div>
                  <div className="card-footer">
                    <a
                      href="/chat-with-seller"
                      className="btn btn-primary mx-1"
                    >
                      Go to Chatbox
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary pull-right"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1 mr-0 rtl">
          {/* <div className="col-lg-3 mt-3  mr-0 pr-4">
            <aside className=" hidden-xs SearchParameters" id="SearchParameters">
              <div className=" rounded-lg " id="shop-sidebar">
                <div className>
                  <div className="widget widget-categories mb-4 ">
                    <div>
                      <div style={{ display: "inline" }}>
                        <h3
                          className="widget-title"
                          style={{
                            fontWeight: 700,
                            fontSize: "18px",
                            display: "inline",
                          }}
                        >
                          Categories
                        </h3>
                      </div>
                    </div>
                    <div className="accordion mt-2" id="shop-categories">
                      <div
                        className="card"
                        style={{
                          borderBottom: "2px solid #EEF6FF",
                          background: "none !important",
                        }}
                      >
                        <div className="card-header p-1 flex-between">
                          <div className="d-flex ">
                            <img
                              className="mr-2"
                              style={{
                                width: "20px",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b4deaba6.png"
                            />
                            <label
                              className="for-hover-lable"
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=11'"
                            >
                              Women's fashion
                            </label>
                          </div>
                          <strong
                            className="pull-right for-brand-hover"
                            style={{ cursor: "pointer" }}
                            onclick="$('#collapse-11').toggle(400)"
                          >
                            +
                          </strong>
                        </div>
                        <div
                          className="card-body ml-2"
                          id="collapse-11"
                          style={{ display: "none" }}
                        >
                          <div className=" for-hover-lable card-header p-1 flex-between">
                            <label
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=18'"
                            >
                              Dress
                            </label>
                            <strong
                              className="pull-right"
                              style={{ cursor: "pointer" }}
                              onclick="$('#collapse-18').toggle(400)"
                            ></strong>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapse-18"
                            style={{ display: "none" }}
                          ></div>
                          <div className=" for-hover-lable card-header p-1 flex-between">
                            <label
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=17'"
                            >
                              shoes
                            </label>
                            <strong
                              className="pull-right"
                              style={{ cursor: "pointer" }}
                              onclick="$('#collapse-17').toggle(400)"
                            >
                              +
                            </strong>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapse-17"
                            style={{ display: "none" }}
                          >
                            <div className="card-header p-1 flex-between">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=21'"
                              >
                                regular wear
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{
                          borderBottom: "2px solid #EEF6FF",
                          background: "none !important",
                        }}
                      >
                        <div className="card-header p-1 flex-between">
                          <div className="d-flex ">
                            <img
                              className="mr-2"
                              style={{
                                width: "20px",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566b6cd3e60.png"
                            />
                            <label
                              className="for-hover-lable"
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=12'"
                            >
                              Men's fashion
                            </label>
                          </div>
                          <strong
                            className="pull-right for-brand-hover"
                            style={{ cursor: "pointer" }}
                            onclick="$('#collapse-12').toggle(400)"
                          ></strong>
                        </div>
                        <div
                          className="card-body ml-2"
                          id="collapse-12"
                          style={{ display: "none" }}
                        ></div>
                      </div>
                      <div
                        className="card"
                        style={{
                          borderBottom: "2px solid #EEF6FF",
                          background: "none !important",
                        }}
                      >
                        <div className="card-header p-1 flex-between">
                          <div className="d-flex ">
                            <img
                              className="mr-2"
                              style={{
                                width: "20px",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566d207d809.png"
                            />
                            <label
                              className="for-hover-lable"
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=26'"
                            >
                              Phones &amp; Telecom
                            </label>
                          </div>
                          <strong
                            className="pull-right for-brand-hover"
                            style={{ cursor: "pointer" }}
                            onclick="$('#collapse-26').toggle(400)"
                          ></strong>
                        </div>
                        <div
                          className="card-body ml-2"
                          id="collapse-26"
                          style={{ display: "none" }}
                        ></div>
                      </div>
                      <div
                        className="card"
                        style={{
                          borderBottom: "2px solid #EEF6FF",
                          background: "none !important",
                        }}
                      >
                        <div className="card-header p-1 flex-between">
                          <div className="d-flex ">
                            <img
                              className="mr-2"
                              style={{
                                width: "20px",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              src="https://6valley.6amtech.com/storage/app/public/category/2022-04-13-62566c1958ba3.png"
                            />
                            <label
                              className="for-hover-lable"
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=15'"
                            >
                              Jewelry &amp; Watches
                            </label>
                          </div>
                          <strong
                            className="pull-right for-brand-hover"
                            style={{ cursor: "pointer" }}
                            onclick="$('#collapse-15').toggle(400)"
                          >
                            +
                          </strong>
                        </div>
                        <div
                          className="card-body ml-2"
                          id="collapse-15"
                          style={{ display: "none" }}
                        >
                          <div className=" for-hover-lable card-header p-1 flex-between">
                            <label
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=19'"
                            >
                              jewelry
                            </label>
                            <strong
                              className="pull-right"
                              style={{ cursor: "pointer" }}
                              onclick="$('#collapse-19').toggle(400)"
                            >
                              +
                            </strong>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapse-19"
                            style={{ display: "none" }}
                          >
                            <div className="card-header p-1 flex-between">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=22'"
                              >
                                test 1
                              </label>
                            </div>
                            <div className="card-header p-1 flex-between">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=23'"
                              >
                                test 2
                              </label>
                            </div>
                          </div>
                          <div className=" for-hover-lable card-header p-1 flex-between">
                            <label
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=20'"
                            >
                              watches
                            </label>
                            <strong
                              className="pull-right"
                              style={{ cursor: "pointer" }}
                              onclick="$('#collapse-20').toggle(400)"
                            ></strong>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapse-20"
                            style={{ display: "none" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div
            id="mySidepanel"
            className="sidepanel"
            style={{ textAlign: "right:auto", left: 0 }}
          >
            <a
              href="javascript:void(0)"
              className="closebtn"
              onclick="closeNav()"
            >
              ×
            </a>
            <div className="cz-sidebar-body">
              <div className="widget widget-categories mb-4 pb-4 border-bottom">
                <div>
                  <div style={{ display: "inline" }}>
                    <h3
                      className="widget-title"
                      style={{ fontWeight: 700, display: "inline" }}
                    >
                      Categories
                    </h3>
                  </div>
                </div>
                <div
                  className="divider-role"
                  style={{
                    border: "1px solid whitesmoke",
                    marginBottom: "14px",
                    marginTop: "5px",
                  }}
                />
                <div
                  className="accordion mt-n1"
                  id="shop-categories"
                  style={{ textAlign: "left" }}
                >
                  <div className="card">
                    <div className="card-header p-1 flex-between">
                      <label
                        className="for-hover-lable"
                        style={{ cursor: "pointer" }}
                        onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=11'"
                      >
                        Women's fashion
                      </label>
                      <strong
                        className="pull-right for-brand-hover"
                        style={{ cursor: "pointer" }}
                        onclick="$('#collapse-m-11').toggle(400)"
                      >
                        +
                      </strong>
                    </div>
                    <div
                      className="card-body ml-2"
                      id="collapse-m-11"
                      style={{ display: "none" }}
                    >
                      <div className=" for-hover-lable card-header p-1 flex-between">
                        <label
                          style={{ cursor: "pointer" }}
                          onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=18'"
                        >
                          Dress
                        </label>
                        <strong
                          className="pull-right"
                          style={{ cursor: "pointer" }}
                          onclick="$('#collapse-m-18').toggle(400)"
                        ></strong>
                      </div>
                      <div
                        className="card-body ml-2"
                        id="collapse-m-18"
                        style={{ display: "none" }}
                      ></div>
                      <div className=" for-hover-lable card-header p-1 flex-between">
                        <label
                          style={{ cursor: "pointer" }}
                          onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=17'"
                        >
                          shoes
                        </label>
                        <strong
                          className="pull-right"
                          style={{ cursor: "pointer" }}
                          onclick="$('#collapse-m-17').toggle(400)"
                        >
                          +
                        </strong>
                      </div>
                      <div
                        className="card-body ml-2"
                        id="collapse-m-17"
                        style={{ display: "none" }}
                      >
                        <div className="card-header p-1 flex-between">
                          <label
                            className="for-hover-lable"
                            style={{ cursor: "pointer" }}
                            onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=21'"
                          >
                            regular wear
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header p-1 flex-between">
                      <label
                        className="for-hover-lable"
                        style={{ cursor: "pointer" }}
                        onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=12'"
                      >
                        Men's fashion
                      </label>
                      <strong
                        className="pull-right for-brand-hover"
                        style={{ cursor: "pointer" }}
                        onclick="$('#collapse-m-12').toggle(400)"
                      ></strong>
                    </div>
                    <div
                      className="card-body ml-2"
                      id="collapse-m-12"
                      style={{ display: "none" }}
                    ></div>
                  </div>
                  <div className="card">
                    <div className="card-header p-1 flex-between">
                      <label
                        className="for-hover-lable"
                        style={{ cursor: "pointer" }}
                        onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=26'"
                      >
                        Phones &amp; Telecom
                      </label>
                      <strong
                        className="pull-right for-brand-hover"
                        style={{ cursor: "pointer" }}
                        onclick="$('#collapse-m-26').toggle(400)"
                      ></strong>
                    </div>
                    <div
                      className="card-body ml-2"
                      id="collapse-m-26"
                      style={{ display: "none" }}
                    ></div>
                  </div>
                  <div className="card">
                    <div className="card-header p-1 flex-between">
                      <label
                        className="for-hover-lable"
                        style={{ cursor: "pointer" }}
                        onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=15'"
                      >
                        Jewelry &amp; Watches
                      </label>
                      <strong
                        className="pull-right for-brand-hover"
                        style={{ cursor: "pointer" }}
                        onclick="$('#collapse-m-15').toggle(400)"
                      >
                        +
                      </strong>
                    </div>
                    <div
                      className="card-body ml-2"
                      id="collapse-m-15"
                      style={{ display: "none" }}
                    >
                      <div className=" for-hover-lable card-header p-1 flex-between">
                        <label
                          style={{ cursor: "pointer" }}
                          onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=19'"
                        >
                          jewelry
                        </label>
                        <strong
                          className="pull-right"
                          style={{ cursor: "pointer" }}
                          onclick="$('#collapse-m-19').toggle(400)"
                        >
                          +
                        </strong>
                      </div>
                      <div
                        className="card-body ml-2"
                        id="collapse-m-19"
                        style={{ display: "none" }}
                      >
                        <div className="card-header p-1 flex-between">
                          <label
                            className="for-hover-lable"
                            style={{ cursor: "pointer" }}
                            onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=22'"
                          >
                            test 1
                          </label>
                        </div>
                        <div className="card-header p-1 flex-between">
                          <label
                            className="for-hover-lable"
                            style={{ cursor: "pointer" }}
                            onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=23'"
                          >
                            test 2
                          </label>
                        </div>
                      </div>
                      <div className=" for-hover-lable card-header p-1 flex-between">
                        <label
                          style={{ cursor: "pointer" }}
                          onclick="location.href='https://6valley.6amtech.com/shopView/1?category_id=20'"
                        >
                          watches
                        </label>
                        <strong
                          className="pull-right"
                          style={{ cursor: "pointer" }}
                          onclick="$('#collapse-m-20').toggle(400)"
                        ></strong>
                      </div>
                      <div
                        className="card-body ml-2"
                        id="collapse-m-20"
                        style={{ display: "none" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-lg-12 product-div">
            {/* <div className="row d-flex justify-content-end">
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-12 pt-2"
                style={{ direction: "ltr" }}
              >
                <form className=" md-form form-sm mt-0">
                  <div className="input-group input-group-sm mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="product_name"
                      style={{ textAlign: "left" }}
                      placeholder="Search products from this store"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="input-group-text"
                        id="basic-addon2"
                        style={{ background: "#F3F5F9" }}
                      >
                        <i className="fa fa-search" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
            <div className="row" id="ajax-products">
              {portfolioDetails &&
                portfolioDetails.map((item) => (
                  <div
                    id={item._id}
                    className="col-lg-3 col-md-4 col-sm-4 col-6 mb-2"
                  >
                    <div
                      className="product-card card"
                      style={{
                        marginBottom: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                          marginRight: "2rem",
                        }}
                      ></div>
                      <div
                        className="card-header inline_product clickable"
                        style={{
                          cursor: "pointer",
                          maxHeight: "193px",
                          minHeight: "193px",
                        }}
                      >
                        <div
                          className="d-flex d-block center-div element-center"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={item.company_logo || ""}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src =
                                "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png";
                            }}
                            style={{ width: "100%", maxHeight: "180px" }}
                          />
                        </div>
                      </div>
                      <div
                        className="card-body inline_product text-center p-1 clickable"
                        style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                      >
                        <div className="text-center text-dark">
                          <span className="text-center font-weight-bold small p-1">
                            {`${item.service_provider_portfolio_name}`}
                          </span>
                        </div>
                      </div>
                      <div
                        className="card-body inline_product text-center p-1 clickable"
                        style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                      >
                        <div className="text-center text-dark">
                          <span className="text-center font-weight-bold small p-1">
                            {`${item.description}`}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/book/service/${item.service_provider_id}/${item.service_id}`}
                      >
                        <button
                          // onClick={handleEditPortfolio}
                          // type="submit"
                          className="btn btn-primary float-right"
                          style={{ marginBottom: "1rem" }}
                          // id="btn_update"
                        >
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              {!portfolioDetails?.length && (
                <div className="col-12">
                  <center>
                    {/* <ClipLoader
                      // color={"#ffffff"}
                      // loading={!!camps}
                      loading
                      // cssOverride={override}
                      // size={150}
                    /> */}
                    <span style={{ color: "red" }}>No Data To Show</span>
                  </center>
                </div>
              )}
              {/* <div className=" col-lg-2 col-md-3 col-sm-4 col-6 col-lg-3 col-md-4 col-sm-4 col-6 mb-2 p-2">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    \n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover" style={{}}>
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                      <a href="/product/test-3-ibgkHB">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-62636369a0855.png"
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
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
                      <a href="/product/test-3-ibgkHB">
                        Ladies Winter Long Slee...
                      </a>
                    </div>
                    <div className="rating-show justify-content-between text-center">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <i className="sr-star czi-star-filled active" />
                        <label className="badge-style">( 3 )</label>
                      </span>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">₹5,000.0</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-center quick-view"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <a
                      className="btn btn-primary btn-sm"
                      style={{
                        marginTop: "0px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                      href="javascript:"
                      onclick="quickView('3')"
                    >
                      <i className="czi-eye align-middle mr-1" />
                      Quick View
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-lg-2 col-md-3 col-sm-4 col-6 col-lg-3 col-md-4 col-sm-4 col-6 mb-2 p-2">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    \n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover" style={{}}>
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{ left: "8px", top: "8px", position: "absolute" }}
                    >
                      <span className="for-discoutn-value p-1 pl-2 pr-2">
                        10% Off
                      </span>
                    </div>
                    <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                      <a href="/product/test-6-Pg6Hpj">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-6263633d3b0a6.png"
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
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
                      <a href="/product/test-6-Pg6Hpj">
                        Exclusive &amp; Fashionable...
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
                  <div
                    className="text-center quick-view"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <a
                      className="btn btn-primary btn-sm"
                      style={{
                        marginTop: "0px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                      href="javascript:"
                      onclick="quickView('5')"
                    >
                      <i className="czi-eye align-middle mr-1" />
                      Quick View
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-lg-2 col-md-3 col-sm-4 col-6 col-lg-3 col-md-4 col-sm-4 col-6 mb-2 p-2">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    \n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover" style={{}}>
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                      <a href="/product/test-7-3spYrs">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-16-625a26a3dfe7b.png"
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
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
                      <a href="/product/test-7-3spYrs">
                        Sneakers man new design...
                      </a>
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
                        <span className="text-accent">₹500.0</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-center quick-view"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <a
                      className="btn btn-primary btn-sm"
                      style={{
                        marginTop: "0px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                      href="javascript:"
                      onclick="quickView('6')"
                    >
                      <i className="czi-eye align-middle mr-1" />
                      Quick View
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-lg-2 col-md-3 col-sm-4 col-6 col-lg-3 col-md-4 col-sm-4 col-6 mb-2 p-2">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    \n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover" style={{}}>
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{ left: "8px", top: "8px", position: "absolute" }}
                    >
                      <span className="for-discoutn-value p-1 pl-2 pr-2">
                        10% Off
                      </span>
                    </div>
                    <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                      <a href="/product/test-1-w3PUfR">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-626362bcdbc49.png"
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
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
                      <a href="/product/test-1-w3PUfR">
                        The school of life - em...
                      </a>
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
                  <div
                    className="text-center quick-view"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <a
                      className="btn btn-primary btn-sm"
                      style={{
                        marginTop: "0px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                      href="javascript:"
                      onclick="quickView('12')"
                    >
                      <i className="czi-eye align-middle mr-1" />
                      Quick View
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-lg-2 col-md-3 col-sm-4 col-6 col-lg-3 col-md-4 col-sm-4 col-6 mb-2 p-2">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    \n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover" style={{}}>
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{ left: "8px", top: "8px", position: "absolute" }}
                    >
                      <span className="for-discoutn-value p-1 pl-2 pr-2">
                        10% Off
                      </span>
                    </div>
                    <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                      <a href="/product/test-2-IoKmGU">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-62640a15585e7.png"
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
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
                      <a href="/product/test-2-IoKmGU">
                        Kids Wood Table and 4 C...
                      </a>
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
                  <div
                    className="text-center quick-view"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <a
                      className="btn btn-primary btn-sm"
                      style={{
                        marginTop: "0px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                      href="javascript:"
                      onclick="quickView('13')"
                    >
                      <i className="czi-eye align-middle mr-1" />
                      Quick View
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-lg-2 col-md-3 col-sm-4 col-6 col-lg-3 col-md-4 col-sm-4 col-6 mb-2 p-2">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .quick-view{\n        display: none;\n        padding-bottom: 8px;\n    }\n    \n    .quick-view , .single-product-details{\n        background: #ffffff;\n    }\n    .product-single-hover:hover > .single-product-details {\n        \n        margin-top:-39px;\n    }\n    .product-single-hover:hover >  .quick-view{\n        display: block;\n    }\n",
                  }}
                />
                <div className="product-single-hover" style={{}}>
                  <div
                    className=" inline_product clickable d-flex justify-content-center"
                    style={{
                      cursor: "pointer",
                      background: "#3b71de10",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{ left: "8px", top: "8px", position: "absolute" }}
                    >
                      <span className="for-discoutn-value p-1 pl-2 pr-2">
                        10% Off
                      </span>
                    </div>
                    <div className="d-flex d-block" style={{ cursor: "pointer" }}>
                      <a href="/product/test-20-c1xeH7">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-16-625a271b671e8.png"
                          style={{
                            width: "100%",
                            borderRadius: "5px 5px 0px 0px",
                          }}
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
                  <div
                    className="text-center quick-view"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <a
                      className="btn btn-primary btn-sm"
                      style={{
                        marginTop: "0px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                      href="javascript:"
                      onclick="quickView('16')"
                    >
                      <i className="czi-eye align-middle mr-1" />
                      Quick View
                    </a>
                  </div>
                </div>
              </div> */}
              <div className="col-12">
                <nav
                  className="d-flex justify-content-between pt-2"
                  aria-label="Page navigation"
                  id="paginator-ajax"
                ></nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ShopView;
  