import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";
import productImage from "assets/productImage.jpg";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";

function SellerPosOrderDetails() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(location.state);

  useEffect(() => {
    // console.log(location.state);
    console.log(orderDetails);
    // setOrderDetails(location.state);
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div
          className="page-header d-print-none p-3"
          style={{ background: "white" }}
        >
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter">
                  <li className="breadcrumb-item">
                    <SellerDashboardBreadCrumb />
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Order Details{" "}
                  </li>
                </ol>
              </nav>
              <div className="d-sm-flex align-items-sm-center">
                <h1 className="page-header-title">
                  Order #{orderDetails?._id || "..."}
                </h1>
                <span className="badge badge-soft-success ml-sm-3 text-capitalize">
                  <span className="legend-indicator bg-success" />
                  {orderDetails?.payment_status || "...."}
                </span>
                <span className="badge badge-soft-success ml-2 ml-sm-3 text-capitalize">
                  <span className="legend-indicator bg-success" />
                  {orderDetails?.OrderDetails?.[0]?.order_status || "...."}
                </span>
                <span className="ml-2 ml-sm-3">
                  <i className="tio-date-range" />
                  {ISOToIST(orderDetails?.order_date_time) || "...."}
                </span>
              </div>
              <div className="col-md-6 mt-2">
                <Link
                  className="text-body mr-3"
                  // target="_blank"
                  // to={"/seller/orders/generate-invoice/" + orderDetails?._id}
                  to=""
                >
                  <i className="tio-print mr-1" /> Print Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="printableArea">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="card mb-3 mb-lg-5">
              <div className="card-header" style={{ display: "block" }}>
                <div className="row">
                  <div className="col-12 pb-2 border-bottom">
                    <h4 className="card-header-title">
                      Order details
                      <span className="badge badge-soft-dark rounded-circle ml-1">
                        {orderDetails?.OrderDetails?.length || "...."}
                      </span>
                    </h4>
                  </div>
                  <div className="col-6 pt-2"></div>
                  <div className="col-6 pt-2">
                    <div className="flex-end">
                      <h6
                        className="text-capitalize"
                        style={{ color: "#8a8a8a" }}
                      >
                        Payment method :
                      </h6>
                      <h6 className="mx-1" style={{ color: "#8a8a8a" }}>
                        {`${orderDetails?.payment_status || "razor pay"}`}
                      </h6>
                    </div>
                    <div className="flex-end">
                      <h6 style={{ color: "#8a8a8a" }}>Payment Reference :</h6>
                      <h6 className="mx-1" style={{ color: "#8a8a8a" }}>
                        {`${
                          orderDetails?.payment_status || "pay K3pkdGVqAmWcH5"
                        }`}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="media">
                  <div className="avatar avatar-xl mr-3">
                    <p>Image</p>
                  </div>
                  <div className="media-body">
                    <div className="row">
                      <div className="col-md-4 product-name">
                        <p> Name</p>
                      </div>
                      <div className="col col-md-2 align-self-center p-0 ">
                        <p> Price</p>
                      </div>
                      <div className="col col-md-1 align-self-center">
                        <p> Qty</p>
                      </div>
                      <div className="col col-md-1 align-self-center  p-0 product-name">
                        <p> TAX</p>
                      </div>
                      <div className="col col-md-2 align-self-center  p-0 product-name">
                        <p> Discount</p>
                      </div>
                      <div className="col col-md-2 align-self-center text-right  ">
                        <p> Subtotal</p>
                      </div>
                    </div>
                  </div>
                </div>

                {!!orderDetails && !!orderDetails?.OrderDetails?.length
                  ? orderDetails?.OrderDetails.map((item, index) => (
                      <div className="media">
                        <div className="avatar avatar-xl mr-3">
                          <img
                            className="img-fluid"
                            src={item?.pphoto || productImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = productImage;
                            }}
                            alt="Image Description"
                          />
                        </div>
                        <div className="media-body">
                          <div className="row">
                            <div className="col-md-4 mb-3 mb-md-0 product-name">
                              <p>{item.pname || "...."}</p>
                              <strong>
                                <u>Brand Name : </u>
                              </strong>
                              <div className="font-size-sm text-body">
                                <span className="font-weight-bold">
                                  {item?.brand_name || "...."}
                                </span>
                              </div>
                            </div>
                            <div className="col col-md-2 align-self-center p-0 ">
                              <h6>{`\u20B9${item.pprice || "..."} `}</h6>
                            </div>
                            <div className="col col-md-1 align-self-center">
                              <h5>{item.qty || "...."}</h5>
                            </div>
                            <div className="col col-md-1 align-self-center  p-0 product-name">
                              <h5>{`\u20B9${"0" || "..."}`}</h5>
                            </div>
                            <div className="col col-md-2 align-self-center  p-0 product-name">
                              <h5>{`\u20B9${"0" || "..."}`}</h5>
                            </div>
                            <div className="col col-md-2 align-self-center text-right  ">
                              <h5 style={{ fontSize: "12px" }}>
                                {`\u20B9${item.pprice * item.qty || "...."}`}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}

                <hr />
                <div className="row justify-content-md-end mb-3">
                  <div className="col-md-9 col-lg-8">
                    <dl className="row text-sm-right">
                      <dt className="col-sm-6">Extra discount</dt>
                      <dd className="col-sm-6 border-bottom">
                        <strong>
                          {/* {orderDetails?.cc_discount || "0"} {"\u20B9"} */}
                          {"0"} {"\u20B9"}
                        </strong>
                      </dd>
                      <dt className="col-sm-6">Coupon discount</dt>
                      <dd className="col-sm-6 border-bottom">
                        <strong>
                          {"0"} {"\u20B9"}
                        </strong>
                      </dd>
                      <dt className="col-sm-6">Total</dt>
                      <dd className="col-sm-6">
                        <strong>
                          {`${orderDetails?.OrderDetails?.reduce(
                            (acc, item) => {
                              acc += +item?.qty * +item?.pprice;
                              return acc;
                            },
                            0
                          )} \u20B9`}
                          {/* {orderDetails?.grandtotal || "0"} {"\u20B9"} */}
                        </strong>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">Customer</h4>
              </div>
              <div className="card-body">
                <div className="media align-items-center" href="javascript:">
                  <div className="icon icon-soft-info icon-circle mr-3">
                    <i className="tio-shopping-basket-outlined" />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">
                      14 Orders
                    </span>
                  </div>
                  <div className="media-body text-right"></div>
                </div>
                <hr />
                <div className="media align-items-center" href="javascript:">
                  <div className="avatar avatar-circle mr-3">
                    <img
                      className="avatar-img"
                      style={{ width: "75px", height: "42px" }}
                      src="/assets/front-end/img/image-place-holder.png"
                      alt="Image"
                    />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">
                      {orderDetails?.customer_name || "walking customer⭐"}
                    </span>
                  </div>
                  <div className="media-body text-right"></div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Contact Info </h5>
                </div>
                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    <i className="tio-online mr-2" />
                    walking@customer.com
                  </li>
                  <li>
                    <i className="tio-android-phone-vs mr-2" />
                    {orderDetails?.customer_mobile || "000000000000⭐"}
                  </li>
                </ul>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerPosOrderDetails;
