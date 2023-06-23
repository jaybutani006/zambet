import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AdminHeader from "../../components/AdminHeader";
// import AdminFooter from "../../components/AdminFooter";
// import { Helmet } from "react-helmet";
// import "../../index.css";
import productImage from "assets/productImage.jpg";
import { defaultAPIErrorHandler } from "api/api";

function AdminDashboard() {
  // useEffect(() => {
  //   document.body.classList.add(
  //     "footer-offset",
  //     "footer-offset",
  //     "has-navbar-vertical-aside",
  //     "navbar-vertical-aside-show-xl"
  //   );

  //   return () => {
  //     document.body.classList.remove(
  //       "footer-offset",
  //       "footer-offset",
  //       "has-navbar-vertical-aside",
  //       "navbar-vertical-aside-show-xl"
  //     );
  //   };
  // });

  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [mainState, setMainState] = useState({
    resAdminDashboard: {},
  });

  const apiGetAdminDashboard = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/admin/dashboard",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAdminDashboard: {
            ...response.data.data,
          },
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetAdminDashboard();
  }, []);

  return (
    <>
      {/* <div className="footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl"> */}
      {/* <AdminHeader /> */}
      <main
        id="content"
        role="main"
        className="main pointer-event manage"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="content container-fluid">
          <div
            className="page-header"
            style={{
              paddingBottom: "0!important",
              borderBottom: "0!important",
              marginBottom: "1.25rem!important",
            }}
          >
            <div className="flex-between align-items-center">
              <div>
                <h1 className="page-header-title" style={{ textAlign: "left" }}>
                  Dashboard
                </h1>
                <p>Welcome message.</p>
              </div>
              <div style={{ height: "25px" }}>
                <label className="badge badge-soft-success">
                  Software version : 8.0
                </label>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="row flex-between gx-2 gx-lg-3 mb-2">
                <div>
                  <h4>
                    <i
                      style={{ fontSize: "30px" }}
                      className="tio-chart-bar-4"
                    />
                    Dashboard order statistics
                  </h4>
                </div>
                <div className="col-12 col-md-4" style={{ width: "20vw" }}>
                  <select
                    className="custom-select"
                    name="statistics_type"
                    onchange="order_stats_update(this.value)"
                  >
                    <option value="overall">Overall statistics</option>
                    <option value="today">Todays Statistics</option>
                    <option value="this_month">This Months Statistics</option>
                  </select>
                </div>
              </div>
              <div className="row gx-2 gx-lg-3" id="order_stats">
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <Link
                    className="card Admincards card-hover-shadow h-100"
                    to=""
                    // to="/admin/orders/list/pending"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16!important" }}
                          >
                            Pending
                          </h6>
                          <span
                            className="card-title h2 "
                            style={{ color: "#F14A16!important" }}
                          >
                            {mainState?.resAdminDashboard
                              ?.total_pending_order || 0}
                          </span>
                        </div>
                        <div className="mt-2">
                          <i
                            className="tio-shopping-cart"
                            style={{ fontSize: "30px", color: "#F14A16" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <Link
                    className="card Admincards card-hover-shadow h-100"
                    to=""
                    // to="/admin/orders/list/confirmed"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16!important" }}
                          >
                            Confirmed
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16!important" }}
                          >
                            {mainState?.resAdminDashboard
                              ?.total_confirmed_Order || 0}
                          </span>
                        </div>
                        <div className="mt-2">
                          <i
                            className="tio-checkmark-circle"
                            style={{ fontSize: "30px", color: "#F14A16" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <Link
                    className="card Admincards card-hover-shadow h-100"
                    to=""
                    // to="/admin/orders/list/processing"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center gx-2 mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16!important" }}
                          >
                            Processing
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16!important" }}
                          >
                            {mainState?.resAdminDashboard
                              ?.total_processing_Order || 0}
                          </span>
                        </div>
                        <div className="mt-2">
                          <i
                            className="tio-time"
                            style={{ fontSize: "30px", color: "#F14A16" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <Link
                    className="card Admincards card-hover-shadow h-100"
                    to=""
                    // to="/admin/orders/list/out_for_delivery"
                    style={{ background: "#FFFFFFff" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center gx-2 mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16!important" }}
                          >
                            Out for delivery
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16!important" }}
                          >
                            {mainState?.resAdminDashboard
                              ?.total_out_for_delivery_Order || 0}
                          </span>
                        </div>
                        <div className="mt-2">
                          <i
                            className="tio-bike"
                            style={{ fontSize: "30px", color: "#F14A16" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-12">
                  <div
                    className="card card-body"
                    style={{ background: "#FFFFFF!important" }}
                  >
                    <div className="row gx-lg-4">
                      <div className="col-sm-6 col-lg-3">
                        <div
                          className="media flex-between align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Delivered</h6>
                            <span className="card-title h3">
                              {mainState?.resAdminDashboard
                                ?.total_delivered_order || 0}
                            </span>
                          </div>
                          <div>
                            <span className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                              <i className="tio-checkmark-circle-outlined" />
                            </span>
                          </div>
                        </div>
                        <div className="d-lg-none">
                          <hr />
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3 column-divider-sm">
                        <div
                          className="media flex-between align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Canceled</h6>
                            <span className="card-title h3">
                              {mainState?.resAdminDashboard
                                ?.total_cancel_order || 0}
                            </span>
                          </div>
                          <span className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                            <i className="tio-remove-from-trash" />
                          </span>
                        </div>
                        <div className="d-lg-none">
                          <hr />
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3 column-divider-lg">
                        <div
                          className="media flex-between align-items-center"
                          style={{ cursor: "pointer" }}
                          // onClick={() =>
                          //   navigate(
                          //     "/"
                          //     // , { replace: true }
                          //   )
                          // }
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Returned</h6>
                            <span className="card-title h3">
                              {mainState?.resAdminDashboard
                                ?.total_product_return || 0}
                            </span>
                          </div>
                          <span className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                            <i className="tio-history" />
                          </span>
                        </div>
                        <div className="d-lg-none">
                          <hr />
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3 column-divider-sm">
                        <div
                          className="media flex-between align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Failed</h6>
                            <span className="card-title h3">
                              {mainState?.resAdminDashboard
                                ?.total_failed_Order || 0}
                            </span>
                          </div>
                          <span className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                            <i className="tio-message-failed" />
                          </span>
                        </div>
                        <div className="d-lg-none">
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="flex-between gx-2 gx-lg-3 mb-2">
                <div>
                  <h4>
                    <i
                      style={{ fontSize: "30px" }}
                      className="tio-chart-line-up"
                    />
                    Admin wallet
                  </h4>
                </div>
              </div>
              <div className="row gx-2 gx-lg-3" id="order_stats">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .text-color-1 {\n        color: #041562;\n    }\n",
                  }}
                />
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1 text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">0₹</h1>
                    <div className="text-uppercase">Commission earned</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1 text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">0₹</h1>
                    <div className="text-uppercase">Delivery charge earned</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1 text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">0₹</h1>
                    <div className="text-uppercase">Pending amount</div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-6 col-12 mb-3 mb-lg-0">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1 text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">0₹</h1>
                    <div className="text-uppercase">In-house earning</div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-6 col-12 mb-3 mb-lg-0">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1 text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">0₹</h1>
                    <div className="text-uppercase">Total tax collected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-2 gx-lg-3">
            <div className="col-lg-12 mb-3 mb-lg-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-12 mb-3 border-bottom">
                      <h5 className="card-header-title float-left mb-2">
                        <i
                          style={{ fontSize: "30px" }}
                          className="tio-chart-pie-1"
                        />
                        Earning statistics for business analytics
                      </h5>
                      <h5 className="card-header-title float-right mb-2">
                        This year earning
                        <i
                          style={{ fontSize: "30px" }}
                          className="tio-chart-bar-2"
                        />
                      </h5>
                    </div>
                    <div className="col-md-4 col-12 graph-border-1">
                      <div className="mt-2 center-div">
                        <span className="h6 mb-0">
                          <i
                            className="legend-indicator bg-primary"
                            style={{ backgroundColor: "#FC9918!important" }}
                          />
                          In-house earning : 38.00₹
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4 col-12 graph-border-1">
                      <div className="mt-2 center-div">
                        <span className="h6 mb-0">
                          <i
                            className="legend-indicator bg-success"
                            style={{ backgroundColor: "#F14A16!important" }}
                          />
                          Seller earnings : 175.41₹
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4 col-12 graph-border-1">
                      <div className="mt-2 center-div">
                        <span className="h6 mb-0">
                          <i
                            className="legend-indicator bg-danger"
                            style={{ backgroundColor: "#35589A!important" }}
                          />
                          Commission earned : 19.49₹
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chartjs-custom">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className />
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className />
                      </div>
                    </div>
                    <canvas
                      id="updatingData"
                      style={{
                        height: "320px",
                        display: "block",
                        width: "1548px",
                      }}
                      data-hs-chartjs-options='{
                      "type": "bar",
                      "data": {
                        "labels": ["Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                        "datasets": [{
                          "data": [0,38.00,0,0,0,0,0,0,0,0,0,0],
                          "backgroundColor": "#FC9918",
                          "hoverBackgroundColor": "#FC9918",
                          "borderColor": "#FC9918"
                        },
                        {
                          "data": [0,175.41,0,0,0,0,0,0,0,0,0,0],
                          "backgroundColor": "#F14A16",
                          "borderColor": "#F14A16"
                        },
                        {
                          "data": [0,19.49,0,0,0,0,0,0,0,0,0,0],
                          "backgroundColor": "#35589A",
                          "borderColor": "#35589A"
                        }]
                      },
                      "options": {
                        "scales": {
                          "yAxes": [{
                            "gridLines": {
                              "color": "#e7eaf3",
                              "drawBorder": false,
                              "zeroLineColor": "#e7eaf3"
                            },
                            "ticks": {
                              "beginAtZero": true,
                              "stepSize": 50000,
                              "fontSize": 12,
                              "fontColor": "#97a4af",
                              "fontFamily": "Open Sans, sans-serif",
                              "padding": 10,
                              "postfix": " $"
                            }
                          }],
                          "xAxes": [{
                            "gridLines": {
                              "display": true,
                              "drawBorder": true
                            },
                            "ticks": {
                              "fontSize": 12,
                              "fontColor": "#97a4af",
                              "fontFamily": "Open Sans, sans-serif",
                              "padding": 5
                            },
                            "categoryPercentage": 0.5,
                            "maxBarThickness": "10"
                          }]
                        },
                        "cornerRadius": 2,
                        "tooltips": {
                          "prefix": " ",
                          "hasIndicator": true,
                          "mode": "index",
                          "intersect": false
                        },
                        "hover": {
                          "mode": "nearest",
                          "intersect": true
                        }
                      }
                    }'
                      width={1935}
                      height={400}
                      className="chartjs-render-monitor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-2 gx-lg-3 mt-2">
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-company" /> Total business overview
                  </h5>
                  <i className="tio-chart-pie-1" style={{ fontSize: "45px" }} />
                </div>
                <div
                  className="card-body"
                  id="business-overview-board"
                  style={{ direction: "ltr" }}
                >
                  <div className="chartjs-custom mx-auto">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className />
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className />
                      </div>
                    </div>
                    <canvas
                      id="business-overview"
                      className="mt-2 chartjs-render-monitor"
                      width={920}
                      height={460}
                      style={{
                        display: "block",
                        height: "368px",
                        width: "736px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-company" /> Top store by order received
                  </h5>
                  <i
                    className="tio-award-outlined"
                    style={{ fontSize: "45px" }}
                  />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div
                      className="col-6 col-md-4 mt-2"
                      style={{
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <div className="grid-card" style={{ minHeight: "170px" }}>
                        <div className="label_1 row-center">
                          <div className="px-1">Orders : </div>
                          <div>27</div>
                        </div>
                        <div className="text-center mt-3">
                          <img
                            style={{
                              borderRadius: "50%",
                              width: "60px",
                              height: "60px",
                              border: "2px solid #80808082",
                            }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span style={{ fontSize: "10px" }}>Shopinist</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-6 col-md-4 mt-2"
                      style={{
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <div className="grid-card" style={{ minHeight: "170px" }}>
                        <div className="label_1 row-center">
                          <div className="px-1">Orders : </div>
                          <div>2</div>
                        </div>
                        <div className="text-center mt-3">
                          <img
                            style={{
                              borderRadius: "50%",
                              width: "60px",
                              height: "60px",
                              border: "2px solid #80808082",
                            }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span style={{ fontSize: "10px" }}>
                            Converted Store
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-6 col-md-4 mt-2"
                      style={{
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <div className="grid-card" style={{ minHeight: "170px" }}>
                        <div className="label_1 row-center">
                          <div className="px-1">Orders : </div>
                          <div>1</div>
                        </div>
                        <div className="text-center mt-3">
                          <img
                            style={{
                              borderRadius: "50%",
                              width: "60px",
                              height: "60px",
                              border: "2px solid #80808082",
                            }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span style={{ fontSize: "10px" }}>Checked In</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-company" /> Top selling store
                  </h5>
                  <i
                    className="tio-dollar-outlined"
                    style={{ fontSize: "45px" }}
                  />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div
                      className="col-6 col-md-4 mt-2"
                      style={{
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <div className="grid-card" style={{ minHeight: "170px" }}>
                        <div className="label_1" style={{ width: "78px" }}>
                          898.35 ₹
                        </div>
                        <div className="text-center mt-3">
                          <img
                            style={{
                              borderRadius: "50%",
                              width: "60px",
                              height: "60px",
                              border: "2px solid #80808082",
                            }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span style={{ fontSize: "10px" }}>Shopinist</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-align-to-top" /> Top selling products
                  </h5>
                  <i className="tio-gift" style={{ fontSize: "45px" }} />
                </div>
                <div className="card-body">
                  <div className="row">
                    {!!mainState?.resAdminDashboard?.topten_selling_products
                      ?.length &&
                      mainState?.resAdminDashboard?.topten_selling_products?.map(
                        (item) => (
                          <div
                            className="col-md-4 col-6 mt-2"
                            style={{
                              cursor: "pointer",
                              paddingRight: "6px",
                              paddingLeft: "6px",
                            }}
                          >
                            <div className="grid-card">
                              <div className="label_1 row-center">
                                <div className="px-1">Sold : </div>
                                <div>{item?.count || 0}</div>
                              </div>
                              <div className="text-center mt-3">
                                <img
                                  style={{ height: "90px" }}
                                  src={item?.product?.pphoto || productImage}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = productImage;
                                  }}
                                  alt="Home decorators collection boswell quarter 14 in. image"
                                />
                              </div>
                              <div className="text-center mt-2">
                                <span className style={{ fontSize: "10px" }}>
                                  {item?.product?.pname}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-star" /> Most rated products
                  </h5>
                  <i className="tio-gift" style={{ fontSize: "45px" }} />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <table className="table">
                        <tbody>
                          {!!mainState?.resAdminDashboard?.most_rated_product
                            ?.length &&
                            mainState?.resAdminDashboard?.most_rated_product?.map(
                              (item) => (
                                <tr style={{ cursor: "pointer" }}>
                                  <td scope="row">
                                    <img
                                      height={35}
                                      style={{ borderRadius: "5px" }}
                                      src={
                                        item?.product?.[0]?.product
                                          ?.pphoto?.[0] || productImage
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = productImage;
                                      }}
                                      alt="Home decorators collection boswell quarter 14 in. image"
                                    />
                                    <span className="ml-2">
                                      {item?.product?.[0]?.product?.pname}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{ fontSize: "18px" }}>
                                      {item?.rate_count || 0}
                                      <i
                                        style={{ color: "gold" }}
                                        className="tio-star"
                                      />
                                    </span>
                                  </td>
                                  {/* <td>
                                  <span style={{ fontSize: "18px" }}>
                                    2--- <i className="tio-users-switch" />
                                  </span>
                                </td> */}
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-user" /> Top customer
                  </h5>
                  <i className="tio-poi-user" style={{ fontSize: "45px" }} />
                </div>
                <div className="card-body">
                  <div className="row">
                    {mainState?.resAdminDashboard?.top_hundread_customers
                      ?.length &&
                      mainState?.resAdminDashboard?.top_hundread_customers?.map(
                        (item) => (
                          <div
                            className="col-6 col-md-4 mt-2"
                            style={{
                              paddingLeft: "6px",
                              paddingRight: "6px",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              className="grid-card"
                              style={{ minHeight: "170px" }}
                            >
                              <div className="label_1 row-center">
                                <div className="mx-1">Orders : </div>
                                <div>{item?.total_order || 0}</div>
                              </div>
                              <div className="text-center mt-3">
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "60px",
                                    height: "60px",
                                    border: "2px solid #80808082",
                                  }}
                                  src={
                                    item?.customer_info?.user_detail?.photo ||
                                    productImage
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = productImage;
                                  }}
                                />
                              </div>
                              <div className="text-center mt-2">
                                <span style={{ fontSize: "10px" }}>
                                  {item?.customer_info?.user_detail?.first_name}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <AdminFooter /> */}
      {/* </div> */}
    </>
  );
}

export default AdminDashboard;
