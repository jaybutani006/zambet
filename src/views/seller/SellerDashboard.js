import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import productImage from "assets/productImage.jpg";

function SellerDashboard() {
  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div
            className="page-header pb-0"
            style={{ borderBottom: "0 !important" }}
          >
            <div
              className="flex-between row align-items-center mx-1"
              style={{ justifyContent: "space-between" }}
            >
              <h1 className="page-header-title">Dashboard</h1>
              <div>
                <Link className="btn btn-primary" to="/seller/product/list">
                  <i className="tio-premium-outlined mr-1" /> Products
                </Link>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="flex-between row gx-2 gx-lg-3 mb-2">
                <div className="col-12 col-md-6" style={{}}>
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
                    <option value="overall">Overall Statistics</option>
                    <option value="today">Todays Statistics</option>
                    <option value="this_month">This Months Statistics</option>
                  </select>
                </div>
              </div>
              <div className="row gx-2 gx-lg-3" id="order_stats">
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <a
                    className="card Admincards card-hover-shadow h-100"
                    href="/seller/orders/list/pending"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16 !important" }}
                          >
                            Pending
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16 !important" }}
                          >
                            0
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
                  </a>
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <a
                    className="card Admincards card-hover-shadow h-100"
                    href="/seller/orders/list/confirmed"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16 !important" }}
                          >
                            Confirmed
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16 !important" }}
                          >
                            0
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
                  </a>
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <a
                    className="card Admincards card-hover-shadow h-100"
                    href="/seller/orders/list/processing"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center gx-2 mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16 !important" }}
                          >
                            Processing
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16 !important" }}
                          >
                            0
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
                  </a>
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                  <a
                    className="card Admincards card-hover-shadow h-100"
                    href="/seller/orders/list/out_for_delivery"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="card-body">
                      <div className="flex-between align-items-center gx-2 mb-1">
                        <div style={{ textAlign: "left" }}>
                          <h6
                            className="card-subtitle"
                            style={{ color: "#F14A16 !important" }}
                          >
                            Out for delivery
                          </h6>
                          <span
                            className="card-title h2"
                            style={{ color: "#F14A16 !important" }}
                          >
                            0
                          </span>
                        </div>
                        <div className="mt-2">
                          <i
                            className="tio-bike"
                            style={{ fontSize: "30px", color: "white" }}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-12">
                  <div
                    className="card card-body"
                    style={{ background: "#FFFFFF !important" }}
                  >
                    <div className="row gx-lg-4">
                      <div className="col-sm-6 col-lg-3">
                        <div
                          className="media flex-between align-items-center"
                          style={{ cursor: "pointer" }}
                          onclick="location.href='https://6valley.6amtech.com/seller/orders/list/delivered'"
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Delivered</h6>
                            <span className="card-title h3">0</span>
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
                          onclick="location.href='https://6valley.6amtech.com/seller/orders/list/canceled'"
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Canceled</h6>
                            <span className="card-title h3">0</span>
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
                          onclick="location.href='https://6valley.6amtech.com/seller/orders/list/returned'"
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Returned</h6>
                            <span className="card-title h3">0</span>
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
                          onclick="location.href='https://6valley.6amtech.com/seller/orders/list/failed'"
                        >
                          <div
                            className="media-body"
                            style={{ textAlign: "left" }}
                          >
                            <h6 className="card-subtitle">Failed</h6>
                            <span className="card-title h3">0</span>
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
                    <i style={{ fontSize: "30px" }} className="tio-wallet" />
                    Seller wallet
                  </h4>
                </div>
              </div>
              <div className="row flex-between gx-2 gx-lg-3" id="order_stats">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n    .text-color-1 {\n        color: #041562;\n    }\n",
                  }}
                />
                <div className="mb-3  col-12 col-md-6 col-lg-4">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1  text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">₹0</h1>
                    <div className="text-uppercase">Commission given</div>
                  </div>
                </div>
                <div className="mb-3  col-12 col-md-6 col-lg-4">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1  text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">₹0</h1>
                    <div className="text-uppercase">Pending withdraw</div>
                  </div>
                </div>
                <div className="mb-3  col-12 col-md-6 col-lg-4">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1  text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">₹0</h1>
                    <div className="text-uppercase">Delivery charge earned</div>
                  </div>
                </div>
                <div className="mb-3 mb-lg-0  col-12 col-md-6">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1  text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">₹0</h1>
                    <div className="text-uppercase">Collected cash</div>
                  </div>
                </div>
                <div className="mb-3 mb-lg-0  col-12 col-md-6">
                  <div
                    className="card card-body card-hover-shadow h-100 text-color-1  text-center"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <h1 className="p-2 text-color-1">₹0</h1>
                    <div className="text-uppercase">Total collected tax</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 for-card col-md-6 mt-4">
                  <div
                    className="card for-card-body-2 shadow h-100  badge-primary"
                    style={{ background: "#EEEEEE !important" }}
                  >
                    <div className="card-body text-color-1">
                      <div className="flex-between row no-gutters align-items-center">
                        <div>
                          <div className="font-weight-bold text-uppercase for-card-text mb-1">
                            Withdrawable balance
                          </div>
                          <div className="for-card-count">₹0</div>
                        </div>
                        <div>
                          <a
                            href="javascript:"
                            style={{ background: "#d1cfcf !important" }}
                            className="btn btn-primary text-color-1"
                            data-toggle="modal"
                            data-target="#balance-modal"
                          >
                            <i className="tio-wallet-outlined" /> Withdraw
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-6 for-card col-md-6 mt-4"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="card  shadow h-100 for-card-body-3 badge-info"
                    style={{ background: "#EEEEEE !important" }}
                  >
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-color-1 font-weight-bold for-card-text text-uppercase mb-1">
                            Withdrawn
                          </div>
                          <div className="text-color-1 for-card-count">₹0</div>
                        </div>
                        <div className="col-auto for-margin">
                          <i className="tio-money-vs" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="balance-modal"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content" style={{ textAlign: "left" }}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Withdraw Request
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="9MwZveTgMo0uPqMjzJMJ6iptaS1V3eI3RwcrHfin"
                    />
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Amount:
                      </label>
                      <input
                        type="number"
                        name="amount"
                        step=".01"
                        defaultValue="577.51"
                        className="form-control"
                        id
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Request
                    </button>
                  </div>
                </form>
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
                        This Year Earning
                        <i
                          style={{ fontSize: "30px" }}
                          className="tio-chart-bar-2"
                        />
                      </h5>
                    </div>
                    <div className="col-6 graph-border-1">
                      <div className="mt-2 center-div">
                        <span className="h6 mb-0">
                          <i
                            className="legend-indicator bg-success"
                            style={{ backgroundColor: "#B6C867 !important" }}
                          />
                          Your Earnings : 0₹
                        </span>
                      </div>
                    </div>
                    <div className="col-6 graph-border-1">
                      <div className="mt-2 center-div">
                        <span className="h6 mb-0">
                          <i
                            className="legend-indicator bg-danger"
                            style={{ backgroundColor: "#01937C !important" }}
                          />
                          Commission Given : 0₹
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
                          "data": [0,175.41,0,0,0,0,0,0,0,0,0,0],
                          "backgroundColor": "#B6C867",
                          "borderColor": "#B6C867"
                        },
                        {
                          "data": [0,19.49,0,0,0,0,0,0,0,0,0,0],
                          "backgroundColor": "#01937C",
                          "borderColor": "#01937C"
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
                              "postfix": " ₹"
                            }
                          }],
                          "xAxes": [{
                            "gridLines": {
                              "display": false,
                              "drawBorder": false
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
            <div className="col-lg-6 mt-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-align-to-top" /> Top selling products
                  </h5>
                  <i className="tio-gift" style={{ fontSize: "45px" }} />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div
                      className="col-md-4 col-sm-6 mt-2"
                      onclick="location.href='https://6valley.6amtech.com/seller/product/view/13'"
                      style={{
                        cursor: "pointer",
                        paddingRight: "6px",
                        paddingLeft: "6px",
                      }}
                    >
                      <div className="grid-card">
                        <label className="label_1">Sold : 147</label>
                        <div className="text-center mt-3">
                          <img
                            style={{ height: "90px" }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                            // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb14631096a.png"
                            alt="Home decorators collection boswell quarter 14 in. image"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className style={{ fontSize: "10px" }}>
                            Home decorators coll ...
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-6 mt-2"
                      onclick="location.href='https://6valley.6amtech.com/seller/product/view/14'"
                      style={{
                        cursor: "pointer",
                        paddingRight: "6px",
                        paddingLeft: "6px",
                      }}
                    >
                      <div className="grid-card">
                        <label className="label_1">Sold : 22</label>
                        <div className="text-center mt-3">
                          <img
                            style={{ height: "90px" }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                            alt="OXO good grips 11-pound stainless steel food scale with pull-out display image"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className style={{ fontSize: "10px" }}>
                            OXO good grips 11-po ...
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-6 mt-2"
                      onclick="location.href='https://6valley.6amtech.com/seller/product/view/4'"
                      style={{
                        cursor: "pointer",
                        paddingRight: "6px",
                        paddingLeft: "6px",
                      }}
                    >
                      <div className="grid-card">
                        <label className="label_1">Sold : 8</label>
                        <div className="text-center mt-3">
                          <img
                            style={{ height: "90px" }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                            alt="Progress lighting P4009-10 5-light chandelier, polished brass image"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className style={{ fontSize: "10px" }}>
                            Progress lighting P4 ...
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-6 mt-2"
                      onclick="location.href='https://6valley.6amtech.com/seller/product/view/2'"
                      style={{
                        cursor: "pointer",
                        paddingRight: "6px",
                        paddingLeft: "6px",
                      }}
                    >
                      <div className="grid-card">
                        <label className="label_1">Sold : 6</label>
                        <div className="text-center mt-3">
                          <img
                            style={{ height: "90px" }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                            alt="iOttie easy one touch 4 dash & windshield car mount phone holder desk image"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className style={{ fontSize: "10px" }}>
                            iOttie easy one touc ...
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-6 mt-2"
                      onclick="location.href='https://6valley.6amtech.com/seller/product/view/18'"
                      style={{
                        cursor: "pointer",
                        paddingRight: "6px",
                        paddingLeft: "6px",
                      }}
                    >
                      <div className="grid-card">
                        <label className="label_1">Sold : 5</label>
                        <div className="text-center mt-3">
                          <img
                            style={{ height: "90px" }}
                            src={productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                            alt="Women's long-sleeve lightweight french terry fleece quarter-zip top image"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className style={{ fontSize: "10px" }}>
                            Women's long-sleeve ...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-3">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-header-title">
                    <i className="tio-star" /> Most rated products
                  </h5>
                  <i
                    className="tio-crown-outlined"
                    style={{ fontSize: "45px" }}
                  />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <table className="table">
                        <tbody>
                          <tr
                            onclick="location.href='https://6valley.6amtech.com/seller/product/view/13'"
                            style={{ cursor: "pointer" }}
                          >
                            <td scope="row">
                              <img
                                height={35}
                                style={{ borderRadius: "5px" }}
                                src={productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                                alt="Home decorators collection boswell quarter 14 in. image"
                              />
                              <span className="ml-2">
                                Home decorators collection bos...
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                5
                                <i
                                  style={{ color: "gold" }}
                                  className="tio-star"
                                />
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                2 <i className="tio-users-switch" />
                              </span>
                            </td>
                          </tr>
                          <tr
                            onclick="location.href='https://6valley.6amtech.com/seller/product/view/19'"
                            style={{ cursor: "pointer" }}
                          >
                            <td scope="row">
                              <img
                                height={35}
                                style={{ borderRadius: "5px" }}
                                src={productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                                alt="Apple iPhone XS max, 256GB, gold - fully unlocked image"
                              />
                              <span className="ml-2">
                                Apple iPhone XS max, 256GB, go...
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                5
                                <i
                                  style={{ color: "gold" }}
                                  className="tio-star"
                                />
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                1 <i className="tio-users-switch" />
                              </span>
                            </td>
                          </tr>
                          <tr
                            onclick="location.href='https://6valley.6amtech.com/seller/product/view/3'"
                            style={{ cursor: "pointer" }}
                          >
                            <td scope="row">
                              <img
                                height={35}
                                style={{ borderRadius: "5px" }}
                                src={productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                                alt="Subrtex 1-piece knit jacquard spandex stretch , sofa, milky image"
                              />
                              <span className="ml-2">
                                Subrtex 1-piece knit jacquard ...
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                5
                                <i
                                  style={{ color: "gold" }}
                                  className="tio-star"
                                />
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                1 <i className="tio-users-switch" />
                              </span>
                            </td>
                          </tr>
                          <tr
                            onclick="location.href='https://6valley.6amtech.com/seller/product/view/14'"
                            style={{ cursor: "pointer" }}
                          >
                            <td scope="row">
                              <img
                                height={35}
                                style={{ borderRadius: "5px" }}
                                src={productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                                alt="OXO good grips 11-pound stainless steel food scale with pull-out display image"
                              />
                              <span className="ml-2">
                                OXO good grips 11-pound stainl...
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                5
                                <i
                                  style={{ color: "gold" }}
                                  className="tio-star"
                                />
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: "18px" }}>
                                1 <i className="tio-users-switch" />
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SellerDashboard;
