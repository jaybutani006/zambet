import React from "react";

function AdminReportOrder() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="media mb-3">
            <div className="avatar avatar-xl avatar-4by3 mr-2">
              <img
                className="avatar-img"
                alt="Image Description"
              />
            </div>
            <div className="media-body">
              <div className="row">
                <div
                  className="col-lg mb-3 mb-lg-0 ml-2"
                  style={{ display: "block", textAlign: "left" }}
                >
                  <div>
                    <h1 className="page-header-title">Order Report Overview</h1>
                  </div>
                  <div className="row align-items-center">
                    <div className="flex-between col-auto">
                      <h5 className="text-muted mr-1">Admin :</h5>
                      <h5 className="text-muted" />
                    </div>
                    <div className="col-auto">
                      <div className="row align-items-center g-0">
                        <h5 className="text-muted col-auto pr-2">Date</h5>
                        <h5 className="text-muted">
                          ( 2022-04-01 - 2022-04-30 )
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto">
                  <div className="d-flex">
                    <a
                      className="btn btn-icon btn-primary rounded-circle"
                      href="/admin"
                    >
                      <i className="tio-home-outlined" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="js-nav-scroller hs-nav-scroller-horizontal">
            <span
              className="hs-nav-scroller-arrow-prev"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-left" />
              </a>
            </span>
            <span
              className="hs-nav-scroller-arrow-next"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-right" />
              </a>
            </span>
            <ul
              className="nav nav-tabs page-header-tabs"
              id="projectsTab"
              role="tablist"
            >
              <li className="nav-item">
                <a className="nav-link active" href="javascript:">
                  Overview
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row border-bottom border-right border-left border-top">
          <div className="col-lg-12">
            <form>
              <input
                type="hidden"
                name="_token"
                defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
              />{" "}
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Show data by date range
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <input
                      type="date"
                      defaultValue="2022-04-01"
                      name="from"
                      id="from_date"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <input
                      type="date"
                      name="to"
                      defaultValue="2022-04-30"
                      id="to_date"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary btn-block">
                      Show
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="media">
                      <i className="tio-shopping-cart nav-icon" />
                      <div className="media-body">
                        <h4 className="mb-1">Delivered</h4>
                        <span className="font-size-sm text-success">
                          <i className="tio-trending-up" /> 0
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div
                      className="js-circle"
                      data-hs-circles-options='{
                                 "value": 0,
                                 "maxValue": 100,
                                 "duration": 2000,
                                 "isViewportInit": true,
                                 "colors": ["#e7eaf3", "green"],
                                 "radius": 25,
                                 "width": 3,
                                 "fgStrokeLinecap": "round",
                                 "textFontSize": 14,
                                 "additionalText": "%",
                                 "textClass": "circle-custom-text",
                                 "textColor": "green"
                               }'
                      id="circle-7842641652441804"
                    >
                      <div
                        className="circles-wrap"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                        >
                          <path
                            fill="transparent"
                            stroke="#e7eaf3"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 1 1 24.96735897145532 1.5000226688778362 Z"
                            className="circles-maxValueStroke"
                          />
                          <path
                            fill="transparent"
                            stroke="green"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 0 1 24.971713686510416 1.5000170237408632 "
                            className="circles-valueStroke"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          className="circle-custom-text"
                          style={{
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                            fontSize: "14px",
                            height: "auto",
                            lineHeight: "normal",
                            color: "green",
                          }}
                        >
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="media">
                      <i className="tio-shopping-cart-off nav-icon" />
                      <div className="media-body">
                        <h4 className="mb-1">Returned</h4>
                        <span className="font-size-sm text-warning">
                          <i className="tio-trending-up" /> 0
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div
                      className="js-circle"
                      data-hs-circles-options='{
                     "value": 0,
                     "maxValue": 100,
                     "duration": 2000,
                     "isViewportInit": true,
                     "colors": ["#e7eaf3", "#ec9a3c"],
                     "radius": 25,
                     "width": 3,
                     "fgStrokeLinecap": "round",
                     "textFontSize": 14,
                     "additionalText": "%",
                     "textClass": "circle-custom-text",
                     "textColor": "#ec9a3c"
                   }'
                      id="circle-7071697045744665"
                    >
                      <div
                        className="circles-wrap"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                        >
                          <path
                            fill="transparent"
                            stroke="#e7eaf3"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 1 1 24.96735897145532 1.5000226688778362 Z"
                            className="circles-maxValueStroke"
                          />
                          <path
                            fill="transparent"
                            stroke="#ec9a3c"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 0 1 24.971713686510416 1.5000170237408632 "
                            className="circles-valueStroke"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          className="circle-custom-text"
                          style={{
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                            fontSize: "14px",
                            height: "auto",
                            lineHeight: "normal",
                            color: "rgb(236, 154, 60)",
                          }}
                        >
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="media">
                      <i className="tio-message-failed nav-icon" />
                      <div className="media-body">
                        <h4 className="mb-1">Failed</h4>
                        <span className="font-size-sm text-danger">
                          <i className="tio-trending-up" /> 0
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div
                      className="js-circle"
                      data-hs-circles-options='{
                     "value": 0,
                     "maxValue": 100,
                     "duration": 2000,
                     "isViewportInit": true,
                     "colors": ["#e7eaf3", "darkred"],
                     "radius": 25,
                     "width": 3,
                     "fgStrokeLinecap": "round",
                     "textFontSize": 14,
                     "additionalText": "%",
                     "textClass": "circle-custom-text",
                     "textColor": "darkred"
                   }'
                      id="circle-19618765262930515"
                    >
                      <div
                        className="circles-wrap"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                        >
                          <path
                            fill="transparent"
                            stroke="#e7eaf3"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 1 1 24.96735897145532 1.5000226688778362 Z"
                            className="circles-maxValueStroke"
                          />
                          <path
                            fill="transparent"
                            stroke="darkred"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 0 1 24.971713686510416 1.5000170237408632 "
                            className="circles-valueStroke"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          className="circle-custom-text"
                          style={{
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                            fontSize: "14px",
                            height: "auto",
                            lineHeight: "normal",
                            color: "darkred",
                          }}
                        >
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="media">
                      <i className="tio-flight-cancelled nav-icon" />
                      <div className="media-body">
                        <h4 className="mb-1">Processing</h4>
                        <span className="font-size-sm text-muted">
                          <i className="tio-trending-up" /> 0
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div
                      className="js-circle"
                      data-hs-circles-options='{
                     "value": 0,
                     "maxValue": 100,
                     "duration": 2000,
                     "isViewportInit": true,
                     "colors": ["#e7eaf3", "gray"],
                     "radius": 25,
                     "width": 3,
                     "fgStrokeLinecap": "round",
                     "textFontSize": 14,
                     "additionalText": "%",
                     "textClass": "circle-custom-text",
                     "textColor": "gray"
                   }'
                      id="circle-6816044046093717"
                    >
                      <div
                        className="circles-wrap"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                        >
                          <path
                            fill="transparent"
                            stroke="#e7eaf3"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 1 1 24.96735897145532 1.5000226688778362 Z"
                            className="circles-maxValueStroke"
                          />
                          <path
                            fill="transparent"
                            stroke="gray"
                            strokeWidth={3}
                            d="M 24.995213679713164 1.5000004874226 A 23.5 23.5 0 0 1 24.971713686510416 1.5000170237408632 "
                            className="circles-valueStroke"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          className="circle-custom-text"
                          style={{
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                            fontSize: "14px",
                            height: "auto",
                            lineHeight: "normal",
                            color: "gray",
                          }}
                        >
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="card mb-3 mb-lg-5 border-bottom border-right border-left border-top">
          <div className="card-header">
            <div className="flex-start">
              <h6 className="card-subtitle mt-1">Total orders of 2022 : </h6>
              <h6 className="h3 ml-sm-2">12</h6>
            </div>
            <div className="hs-unfold">
              <a
                className="js-hs-unfold-invoker btn btn-white"
                href="/admin/orders/list/all"
                data-hs-unfold-invoker
              >
                <i className="tio-shopping-cart-outlined mr-1" /> Orders
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="chartjs-custom" style={{ height: "18rem" }}>
              <div className="chartjs-size-monitor">
                <div className="chartjs-size-monitor-expand">
                  <div className />
                </div>
                <div className="chartjs-size-monitor-shrink">
                  <div className />
                </div>
              </div>
              <canvas
                className="js-chart chartjs-render-monitor"
                data-hs-chartjs-options='{
                  "type": "line",
                  "data": {
                     "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                     "datasets": [{
                      "data": [0,3,0,0,0,0,0,0,0,0,0,0],
                      "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
                      "borderColor": "green",
                      "borderWidth": 2,
                      "pointRadius": 0,
                      "pointBorderColor": "#fff",
                      "pointBackgroundColor": "green",
                      "pointHoverRadius": 0,
                      "hoverBorderColor": "#fff",
                      "hoverBackgroundColor": "#377dff"
                    },
                    {
                      "data": [0,0,0,0,0,0,0,0,0,0,0,0],
                      "backgroundColor": ["rgba(0, 201, 219, 0)", "rgba(255, 255, 255, 0)"],
                      "borderColor": "#ec9a3c",
                      "borderWidth": 2,
                      "pointRadius": 0,
                      "pointBorderColor": "#fff",
                      "pointBackgroundColor": "#ec9a3c",
                      "pointHoverRadius": 0,
                      "hoverBorderColor": "#fff",
                      "hoverBackgroundColor": "#00c9db"
                    },
                    {
                      "data": [0,0,0,0,0,0,0,0,0,0,0,0],
                      "backgroundColor": ["rgba(0, 201, 219, 0)", "rgba(255, 255, 255, 0)"],
                      "borderColor": "darkred",
                      "borderWidth": 2,
                      "pointRadius": 0,
                      "pointBorderColor": "#fff",
                      "pointBackgroundColor": "darkred",
                      "pointHoverRadius": 0,
                      "hoverBorderColor": "#fff",
                      "hoverBackgroundColor": "#00c9db"
                    },
                    {
                      "data": [0,0,0,0,0,0,0,0,0,0,0,0],
                      "backgroundColor": ["rgba(0, 201, 219, 0)", "rgba(255, 255, 255, 0)"],
                      "borderColor": "gray",
                      "borderWidth": 2,
                      "pointRadius": 0,
                      "pointBorderColor": "#fff",
                      "pointBackgroundColor": "gray",
                      "pointHoverRadius": 0,
                      "hoverBorderColor": "#fff",
                      "hoverBackgroundColor": "#00c9db"
                    }]
                  },
                  "options": {
                    "gradientPosition": {"y1": 200},
                     "scales": {
                        "yAxes": [{
                          "gridLines": {
                            "color": "#e7eaf3",
                            "drawBorder": false,
                            "zeroLineColor": "#e7eaf3"
                          },
                          "ticks": {
                            "min": 0,
                            "max": 3,
                            "stepSize": 1,
                            "fontColor": "#97a4af",
                            "fontFamily": "Open Sans, sans-serif",
                            "padding": 10,
                            "postfix": ""
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
                          }
                        }]
                    },
                    "tooltips": {
                      "prefix": "",
                      "postfix": "",
                      "hasIndicator": true,
                      "mode": "index",
                      "intersect": false,
                      "lineMode": true,
                      "lineWithLineColor": "rgba(19, 33, 68, 0.075)"
                    },
                    "hover": {
                      "mode": "nearest",
                      "intersect": true
                    }
                  }
                }'
                style={{ display: "block", height: "288px", width: "1550px" }}
                width={1937}
                height={360}
              ></canvas>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-3 mb-lg-12">
            <div className="card h-100">
              <div className="card-header">
                <h4 className="card-header-title">Weekly Report </h4>
                <ul className="nav nav-segment" id="eventsTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="this-week-tab"
                      data-toggle="tab"
                      href="#this-week"
                      role="tab"
                    >
                      This Week
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="last-week-tab"
                      data-toggle="tab"
                      href="#last-week"
                      role="tab"
                    >
                      Last Week
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body card-body-height">
                <div className="tab-content" id="eventsTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="this-week"
                    role="tabpanel"
                    aria-labelledby="this-week-tab"
                  >
                    <div className="card">
                      <div className="card-footer"></div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="last-week"
                    role="tabpanel"
                    aria-labelledby="last-week-tab"
                  >
                    <div className="card">
                      <div className="card-footer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminReportOrder;
