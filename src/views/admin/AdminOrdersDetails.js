import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";
import productImage from "assets/productImage.jpg";
import axios from "axios";
import { useContext } from "react";
import { Context } from "context/newContext";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminOrdersDetails() {
  const location = useLocation();
  const [state, dispatch] = useContext(Context)
  const [orderDetails, setOrderDetails] = useState({ ...location?.state });

  const downloadInvoice = () => {
    console.log(orderDetails)
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/order/downloadInvoice",
      params: {
        // orderdetail_id: orderdetail_id,
        order_id: orderDetails?.order_detail?.[0]?.oid
      },
      headers: {
        Authorization: state.adminToken,
      },
      responseType: "blob",
    })
      .then((response) => {
        console.log("Successfully Exported");
        console.log(response.headers);
        // console.log(response.headers?.filename);
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        console.log(contentDisposition)
        let fileName = "unknown";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          console.log(fileNameMatch)
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
          console.log(fileName)
        }
        link.setAttribute("download", fileName);
        // link.setAttribute("download", "invoice11.pdf");

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };


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
                    <AdminDashboardBreadCrumb />
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
                <span className="badge badge-soft-danger ml-sm-3 text-capitalize">
                  <span className="legend-indicator bg-danger" />
                  {orderDetails?.payment_status || "..."}
                </span>
                <span className="badge badge-soft-info ml-2 ml-sm-3 text-capitalize">
                  <span className="legend-indicator bg-info text" />
                  {orderDetails?.order_type || "..."}
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
                  onClick={() => { downloadInvoice() }}
                >
                  <i className="tio-print mr-1" /> Print Invoice
                </Link>
                {/* <button
                  className="btn btn-xs btn-secondary"
                  // data-toggle="modal"
                  // data-target="#locationModal"
                >
                  <i className="tio-map" /> Show locations on map
                </button> */}
              </div>
              <div className="row">
                {/* <div className="col-12 col-md-6 mt-4">
                  <label className="badge badge-info">Linked orders : 0</label>
                  <br />
                </div> */}
                {/* <div className="col-12 col-md-6">
                  <div className="hs-unfold float-right col-6">
                    <div className="dropdown">
                      <select
                        name="order_status"
                        onchange="order_status(this.value)"
                        className="status form-control"
                        data-id={100119}
                      >
                        {[
                          { name: "Pending", value: "pending" },
                          { name: "Confirmed", value: "confirmed" },
                          { name: "Processing", value: "processing" },
                          {
                            name: "Out for delivery",
                            value: "out_for_delivery",
                          },
                          { name: "Delivered", value: "delivered" },
                          { name: "Returned", value: "returned" },
                          { name: "Failed", value: "failed" },
                          { name: "Canceled", value: "canceled" },
                        ].map((item) => (
                          <option
                            value={item.value}
                            selected={orderDetails?.order_status === item.value}
                            disabled
                          >
                            {item.name}
                          </option>
                        ))}

                        {/* <option value="pending" selected>
                          Pending
                        </option>
                        <option value="confirmed"> Confirmed</option>
                        <option value="processing">Processing </option>
                        <option className="text-capitalize" value="out_for_delivery">
                          Out for delivery
                        </option>
                        <option value="delivered">Delivered </option>
                        <option value="returned"> Returned</option>
                        <option value="failed">Failed </option>
                        <option value="canceled">Canceled </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6 hs-unfold float-right pr-2">
                    <div className="dropdown">
                      <select
                        name="payment_status"
                        className="payment_status form-control"
                        data-id={100119}
                      >
                        {[
                          { name: "Paid", value: "paid" },
                          { name: "UnPaid", value: "unpaid" },
                        ].map((item) => (
                          <option
                            value={item.value}
                            selected={
                              orderDetails?.payment_status === item.value
                            }
                            disabled
                          >
                            {item.name}
                          </option>
                        ))}

                        {/* <option
                          onclick="route_alert('/admin/orders/payment-status?id=100119&payment_status=paid','Change status to paid ?')"
                          href="javascript:"
                          value="paid"
                        >
                          Paid
                        </option>
                        <option value="unpaid" selected>
                          Unpaid
                        </option>
                      </select>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="printableArea">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="card mb-3 mb-lg-5">
              <div
                className="card-header"
                style={{ display: "block!important" }}
              >
                <div className="row">
                  <div className="col-12 pb-2 border-bottom">
                    <h4 className="card-header-title">
                      Order Details
                      <span className="badge badge-soft-dark rounded-circle ml-1">
                        {orderDetails?.order_detail?.length || "...."}
                      </span>
                    </h4>
                  </div>
                  <div className="col-12 pt-2">
                    <div>
                      <h6 className style={{ color: "#8a8a8a" }}>
                        Payment Method :{" "}
                        <span className="text-capitalize">
                          {orderDetails?.payment_status || "..."}
                        </span>
                      </h6>
                      <h6 className style={{ color: "#8a8a8a" }}>
                        Payment Reference :
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

                {/* <div className="row">
                  <img
                    className="avatar-img"
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                    }}
                    alt="Image"
                  />
                  <p className="sellerName">
                    <a style={{ color: "black" }} href="javascript:">
                      6valley
                    </a>
                  </p>
                </div> */}

                {!!orderDetails && !!orderDetails?.order_detail?.length
                  ? orderDetails?.order_detail.map((item, index) => (
                    <div className="media pb-2">
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
                            <p>{item?.pname || "...."}</p>
                            <strong>
                              <u>Brand Name : </u>
                              <span className="font-size-sm text-body font-weight-bold">
                                {"...."}
                              </span>
                            </strong>
                            {/* <div className="font-size-sm text-body">
                                <span className="font-weight-bold">{"...."}</span>
                              </div> */}
                          </div>
                          <div className="col col-md-2 align-self-center p-0 ">
                            <h6>
                              {item.pprice || "...."} {"\u20B9"}
                            </h6>
                          </div>
                          <div className="col col-md-1 align-self-center">
                            <h5>{item.qty || "...."}</h5>
                          </div>
                          <div className="col col-md-1 align-self-center  p-0 product-name">
                            <h5>
                              {"0"} {"\u20B9"}
                            </h5>
                          </div>
                          <div className="col col-md-2 align-self-center  p-0 product-name">
                            <h5>
                              {"0"} {"\u20B9"}
                            </h5>
                          </div>
                          <div className="col col-md-2 align-self-center text-right  ">
                            <h5 style={{ fontSize: "12px" }}>
                              {item.pprice * item.qty || "...."} {"\u20B9"}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  : null}

                {/* <div className="media">
                  <div className="avatar avatar-xl mr-3">
                    <img
                      className="img-fluid"
                      alt="Image Description"
                    />
                  </div>
                  <div className="media-body">
                    <div className="row">
                      <div className="col-md-4 mb-3 mb-md-0 product-name">
                        <p>Hot Selling Sneakers, Sneakers...</p>
                        <strong>
                          <u>Variation : </u>
                        </strong>
                        <div className="font-size-sm text-body">
                          <span className="font-weight-bold">AliceBlue-s-a</span>
                        </div>
                      </div>
                      <div className="col col-md-2 align-self-center p-0 ">
                        <h6>$5,000.0</h6>
                      </div>
                      <div className="col col-md-1 align-self-center">
                        <h5>1</h5>
                      </div>
                      <div className="col col-md-1 align-self-center  p-0 product-name">
                        <h5>$250.0</h5>
                      </div>
                      <div className="col col-md-2 align-self-center  p-0 product-name">
                        <h5>$500.0</h5>
                      </div>
                      <div className="col col-md-2 align-self-center text-right  ">
                        <h5 style={{ fontSize: "12px" }}>$4,750.0</h5>
                      </div>
                    </div>
                  </div>
                </div> */}

                <hr />
                <div className="row justify-content-md-end mb-3">
                  <div className="col-md-9 col-lg-8">
                    <dl className="row text-sm-right">
                      <dt className="col-sm-6">Shipping</dt>
                      <dd className="col-sm-6 border-bottom">
                        {/* <strong>₹{orderDetails?.delivery_charge || "...."}</strong> */}
                        <strong>{`- 0 \u20B9`}</strong>
                      </dd>
                      <dt className="col-sm-6">Coupon discount</dt>
                      <dd className="col-sm-6 border-bottom">
                        {/* <strong>- {orderDetails?.cc_discount || "...."}</strong> */}
                        <strong>{`- 0 \u20B9`}</strong>
                      </dd>
                      <dt className="col-sm-6">Total</dt>
                      <dd className="col-sm-6">
                        <strong>
                          {`${orderDetails?.order_detail?.reduce(
                            (acc, item) => {
                              acc += +item?.qty * +item?.pprice;
                              return acc;
                            },
                            0
                          )} \u20B9`}
                        </strong>
                        {/* <strong>₹{orderDetails?.grandtotal || "...."}</strong> */}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            {/* <div className="card mb-2">
              <div className="card-header">
                <h4>Shipping info</h4>
              </div>
              <div className="card-body text-capitalize">
                <ul className="list-unstyled list-unstyled-py-2">
                  {/* <li>
                    <h6 className style={{ color: "#8a8a8a" }}>
                      Shipping type : category wise
                    </h6>
                  </li> */}
            {/* <li>
                    <select
                      className="form-control text-capitalize"
                      name="delivery_type"
                      onchange="choose_delivery_type(this.value)"
                    >
                      <option value={0}>Choose delivery type</option>
                      <option value="self_delivery">By self delivery man</option>
                      <option value="third_party_delivery">By third party delivery service</option>
                    </select>
                  </li> 
                  <li id="choose_delivery_man">
                    <label htmlFor>Choose delivery man</label>
                    <select
                      className="form-control text-capitalize js-select2-custom"
                      name="delivery_man_id"
                      onchange="addDeliveryMan(this.value)"
                      data-select2-id={1}
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ width: "100%" }}
                    >
                      <option value="" data-select2-id={3}>
                        --Select--
                      </option>
                      {[
                        { _id: "1", name: "FullName1", value: "Value1" },
                        { _id: "2", name: "FullName2", value: "Value2" },
                      ].map((item) => (
                        <option
                          value={item.value}
                        >{`${item.name} (+8801515242928 )`}</option>
                      ))}

                      {/* <option value={1} data-select2-id={4}>
                        Md.Safayet Hossain (+8801515242928 )
                      </option>
                      <option value={3} data-select2-id={5}>
                        fatema subarna (+8801885576624 )
                      </option>
                      <option value={5} data-select2-id={6}>
                        Test test (000000345 )
                      </option>
                    </select>

                    {/* <span
                      className="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id={2}
                      style={{ width: "100%" }}
                    >
                      <span className="selection">
                        <span
                          className="select2-selection custom-select"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabIndex={0}
                          aria-disabled="false"
                          aria-labelledby="select2-delivery_man_id-mt-container"
                        >
                          <span
                            className="select2-selection__rendered"
                            id="select2-delivery_man_id-mt-container"
                            role="textbox"
                            aria-readonly="true"
                            title="Select"
                          >
                            <span>Select</span>
                          </span>
                          <span className="select2-selection__arrow" role="presentation">
                            <b role="presentation" />
                          </span>
                        </span>
                      </span>
                      <span className="dropdown-wrapper" aria-hidden="true" />
                    </span>
                  </li>
                  <li
                    className=" mt-2"
                    id="by_third_party_delivery_service_info"
                    style={{ display: "none" }}
                  >
                    <span>Delivery service name :</span>
                    <span style={{ float: "right" }}>
                      <a
                        href="javascript:"
                        onclick="choose_delivery_type('third_party_delivery')"
                      >
                        <i className="tio-edit" />
                      </a>
                    </span>
                    <br />
                    <span>Tracking id :</span>
                  </li>
                </ul>
              </div>
            </div> */}
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
                      {` ${orderDetails?.allUserOrders?.order_master?.length ||
                        "...."
                        } Orders`}
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
                      src={orderDetails?.pphoto || productImage}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = productImage;
                      }}
                      alt="Image"
                    />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">
                      {orderDetails?.customer_name || "...."}
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
                    {orderDetails?.allUserOrders?.email_address || "...."}
                  </li>
                  <li>
                    <i className="tio-android-phone-vs mr-2" />
                    {orderDetails?.customer_mobile || "...."}
                  </li>
                </ul>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Shipping address</h5>
                </div>
                <span className="d-block">
                  Name :<strong>{orderDetails?.customer_name || "...."}</strong>
                  <br />
                  City:
                  <strong>{orderDetails?.order_city || "...."}</strong>
                  <br />
                  Zip code :
                  <strong>{orderDetails?.order_pincode || "...."}</strong>
                  <br />
                  Address :
                  <strong>{orderDetails?.order_address || "...."}</strong>
                  <br />
                  Phone:
                  <strong>{orderDetails?.customer_mobile || "...."}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminOrdersDetails;
