import React from "react";

function TrackOrderResult() {
  return (
    <>
      <div className="container">
        <div className="pt-3 pb-3">
          <h2>messages.My Order</h2>
        </div>
        <div className="btn-primary">
          <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
            <div className="order-lg-1 pr-lg-4 text-center text-lg-left">
              <h4 className="text-light mb-0">
                Order ID :{" "}
                <span className="h4 font-weight-normal text-light">100120</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-md-3">
        <div
          className="row"
          style={{ background: "#e2f0ff", margin: 0, width: "100%" }}
        >
          <div className="col-sm-4">
            <div className="pt-2 pb-2 text-center rounded-lg">
              <span className="font-weight-medium text-dark mr-2">
                messages.Order Status:
              </span>
              <br />
              <span className="text-uppercase ">pending</span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="pt-2 pb-2 text-center rounded-lg">
              <span className="font-weight-medium text-dark mr-2">
                messages.Payment Status:
              </span>{" "}
              <br />
              <span className="text-uppercase">unpaid</span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="pt-2 pb-2 text-center rounded-lg">
              <span className="font-weight-medium text-dark mr-2">
                {" "}
                messages.Estimated Delivary Date:{" "}
              </span>{" "}
              <br />
              <span
                className="text-uppercase"
                style={{ fontWeight: 600, color: "#3b71de" }}
              >
                2022-06-27
              </span>
            </div>
          </div>
        </div>
        <div className="card border-0 box-shadow-lg mt-5">
          <div className="card-body pb-2">
            <ul className="nav nav-tabs media-tabs nav-justified">
              <li className="nav-item">
                <div className="nav-link">
                  <div className="align-items-center">
                    <div
                      className="media-tab-media"
                      style={{
                        margin: "0 auto",
                        background: "#4bcc02",
                        color: "white",
                      }}
                    >
                      <i className="czi-check" />
                    </div>
                    <div className="media-body" style={{ textAlign: "center" }}>
                      <div className="media-tab-subtitle text-muted font-size-xs mb-1">
                        messages.First step
                      </div>
                      <h6 className="media-tab-title text-nowrap mb-0">
                        messages.Order placed
                      </h6>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item ">
                <div className="nav-link ">
                  <div className="align-items-center">
                    <div
                      className="media-tab-media"
                      style={{ margin: "0 auto" }}
                    ></div>
                    <div className="media-body" style={{ textAlign: "center" }}>
                      <div className="media-tab-subtitle text-muted font-size-xs mb-1">
                        messages.Second step
                      </div>
                      <h6 className="media-tab-title text-nowrap mb-0">
                        messages.Processing order
                      </h6>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link  ">
                  <div className="align-items-center">
                    <div
                      className="media-tab-media"
                      style={{ margin: "0 auto" }}
                    ></div>
                    <div className="media-body" style={{ textAlign: "center" }}>
                      <div className="media-tab-subtitle text-muted font-size-xs mb-1">
                        messages.Third step
                      </div>
                      <h6 className="media-tab-title text-nowrap mb-0">
                        messages.Preparing Shipment
                      </h6>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link ">
                  <div className="align-items-center">
                    <div
                      className="media-tab-media"
                      style={{ margin: "0 auto" }}
                    ></div>
                    <div className="media-body" style={{ textAlign: "center" }}>
                      <div className="media-tab-subtitle text-muted font-size-xs mb-1">
                        messages.Fourth step
                      </div>
                      <h6 className="media-tab-title text-nowrap mb-0">
                        messages.Order Shipped
                      </h6>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-sm-flex flex-wrap justify-content-between align-items-center text-center pt-3">
          <div className="custom-control custom-checkbox mt-1 mr-3"></div>
          <a
            className="btn btn-primary btn-sm mt-2 mb-2"
            href="#order-details"
            data-toggle="modal"
          >
            messages.View Order Details
          </a>
        </div>
      </div>
    </>
  );
}

export default TrackOrderResult;
