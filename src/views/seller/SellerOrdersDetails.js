import React, { useEffect, useContext, useState } from "react";
import Helmet from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { ISOToIST } from "utils/DateTime";
import { Context } from "context/newContext";
import dummyProductImage from "assets/dummyProductImage.png";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";

// firebase
import { authentication } from "firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
//
import productImage from "assets/productImage.jpg";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function SellerOrdersDetails() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(location.state);
  const [resDeliveryBoys, setResDeliveryBoys] = useState([]);
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [selectedDeliveryBoyId, setSelectedDeliveryBoyId] = useState("");
  const [selectedDeliveryBoyPhone, setSelectedDeliveryBoyPhone] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  //firebase
  const [disableOTP, setDisableOTP] = useState(false);
  const [disableOTPPhone, setDisableOTPPhone] = useState(false);
  const [showOTPPhoneDiv, setShowOTPPhoneDiv] = useState(true);
  const [showOTPDiv, setShowOTPDiv] = useState(false);
  const [showNewPasswordDiv, setShowNewPasswordDiv] = useState(false);

  const resetModalState = () => {
    setDisableOTP(false);
    setDisableOTPPhone(false);
    setShowNewPasswordDiv(false);
    setShowOTPDiv(false);
    setShowOTPPhoneDiv(true);
  };

  const verifyOTP = (e) => {
    if (userDetails.otp.toString().length === 6) {
      setDisableOTP(true);
      let confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(userDetails.otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          // setShowNewPasswordDiv(true);
          // setShowOTPDiv(false);
          // setShowOTPPhoneDiv(false);
          resetModalState();
          setIsOpenModal1(false);
          handleUpdateOrderStatus(selectedOrderStatus);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    } else {
      alert("OTP Code must be of 6 digits");
    }
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      },
      authentication
    );
  };

  const requestOTP = () => {
    if (selectedDeliveryBoyPhone.toString().length === 10) {
      setDisableOTPPhone(true);
      setShowOTPDiv(true);

      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(
        authentication,
        `+91${selectedDeliveryBoyPhone}`,
        appVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          // Error sms not sent
          console.log(error);
        });
    } else {
      alert("Phone Number must be of 10 digits");
    }
  };

  const [userDetails, setUserDetails] = useState({
    otp: "",
    mobile: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name } = e.target;

    if (name === "mobile" && e.target.value.toString().length > 10) {
      alert("Mobile No. must be of 10 digits");
      return;
    } else if (name === "otp" && e.target.value.toString().length > 6) {
      alert("OTP No. must be of 6 digits");
      return;
    } else {
      if (name == "is_staff") {
        setUserDetails((previous) => {
          return {
            ...previous,
            [name]: e.target.checked,
          };
        });
      } else {
        setUserDetails((previous) => {
          return {
            ...previous,
            [name]: e.target.value,
          };
        });
      }
    }
  };
  //

  const handleUpdateOrderStatus = (orderStatus) => {
    //below code is changing delivery status
    if (
      window.confirm(
        "Are you sure you want to change the order status to : " +
          orderStatus +
          " ?"
      )
    ) {
      const config = {
        method: "put",
        url:
          process.env.REACT_APP_BASEURL +
          `/api/order/orderstatus?oid=${orderDetails?._id}`,
        // "/api/order/vendorchnagestatus/" +
        // orderDetails?.orderdetail[0]._id,
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: state.sellerToken,
        },
        data: JSON.stringify({
          order_status: orderStatus,
        }),
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setSelectedOrderStatus(orderStatus);
          setIsOpenModal1(false);
          alert("Order Status Updated Successfully");
          // navigate("/seller/dashboard", { replace: true });
        })
        .catch((error) => {
          defaultAPIErrorHandler(error);
        });
    }
  };

  const getAllDeliveryBoysAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/deliveryboy",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        // console.log(response.data);
        setResDeliveryBoys(response.data.data);
        setSelectedDeliveryBoyPhone(
          orderDetails?.OrderDetails?.[0]?.deliveryboy?.[0]?.contect_no
            ? orderDetails?.OrderDetails?.[0]?.deliveryboy?.[0]?.contect_no
            : ""
        );
        setSelectedDeliveryBoyId(
          orderDetails?.OrderDetails?.[0]?.deliveryboy?.[0]?._id
            ? orderDetails?.OrderDetails?.[0]?.deliveryboy?.[0]?._id
            : ""
        );
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAssignDeliveryMan = (e) => {
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/order/asigndeliveryboy",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.sellerToken,
      },
      params: {
        oid: orderDetails?._id,
      },
      data: JSON.stringify({
        db_id: e.target.value,
        in_which: "order",
      }),
    })
      .then((response) => {
        console.log(response.data);
        setSelectedDeliveryBoyId(e.target.value);
        alert("Successfully assigned delivery man to order.");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
        // alert("Failed to assign delivery man. Try again!");
      });
  };

  useEffect(() => {
    console.log(location.state);
    // setOrderDetails?(location.state);
    getAllDeliveryBoysAPI();
    console.log(orderDetails);
  }, []);
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <Helmet>
        <script>
          {`
  $(document).on("change", ".payment_status", function () {
    var id = $(this).attr("data-id");
    var value = $(this).val();
    Swal.fire({
      title: "Are you sure Change this ",
      text: "You wont be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#377dff",
      cancelButtonColor: "secondary",
      confirmButtonText: "Yes  Change it!",
    }).then((result) => {
      if (result.value) {
        $.ajaxSetup({
          headers: {
            "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content"),
          },
        });
        $.ajax({
          url: "https://6valley.6amtech.com/seller/orders/payment-status",
          method: "POST",
          data: {
            id: id,
            payment_status: value,
          },
          success: function (data) {
            toastr.success("Status Change successfully");
            location.reload();
          },
        });
      }
    });
  });

  function order_status(status) {
    var value = status;
    Swal.fire({
      title: "Are you sure Change this ",
      text: "You wont be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#377dff",
      cancelButtonColor: "secondary",
      confirmButtonText: "Yes  Change it!",
    }).then((result) => {
      if (result.value) {
        $.ajaxSetup({
          headers: {
            "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content"),
          },
        });
        $.ajax({
          url: "https://6valley.6amtech.com/seller/orders/status",
          method: "POST",
          data: {
            id: "100062",
            order_status: value,
          },
          success: function (data) {
            if (data.success == 0) {
              toastr.success(
                "Order is already delivered  You can not change it !!"
              );
              location.reload();
            } else {
              toastr.success("Status Change successfully !");
              location.reload();
            }
          },
        });
      }
    });
  }
  `}
        </script>
      </Helmet>
      <Modal show={isOpenModal1} onHide={() => setIsOpenModal1(false)} centered>
        <Modal.Body>
          <form className="row">
            <div className="card mt-2 rest-part" style={{ width: "100%" }}>
              <div className="card-header">
                <h4>OTP Validation</h4>
              </div>
              <div className="card-body">
                <div className="form-group">
                  {showOTPPhoneDiv && (
                    <>
                      <div className="row">
                        <div className="col-6 p-2">
                          <label className="control-label">
                            Delivery Boy Phone No.
                          </label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="number"
                            // min={0}
                            // defaultValue={4}
                            // step={1}
                            placeholder="Enter Phone No."
                            name="otp_phone"
                            className="form-control"
                            // onChange={handleInputChange}
                            // value={userDetails.otp_phone}
                            // disabled={disableOTPPhone}
                            value={selectedDeliveryBoyPhone}
                            disabled
                          />
                        </div>
                      </div>
                      <div
                        className="row"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div className="col-6">
                          <button
                            className="ml-1 btn btn-primary"
                            // type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              requestOTP();
                              // window.alert("Success");
                            }}
                          >
                            Request OTP
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {/* its important to have div for recaptcha */}

                  <div id="recaptcha-container" className="row pt-4"></div>

                  {showOTPDiv && (
                    <>
                      <div className="row pt-4">
                        <div className="col-6 p-2">
                          <label className="control-label">Enter OTP</label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="number"
                            // min={0}
                            // defaultValue={4}
                            // step={1}
                            placeholder="Enter OTP"
                            name="otp"
                            className="form-control"
                            onChange={handleInputChange}
                            value={userDetails.otp}
                            disabled={disableOTP}
                          />
                        </div>
                      </div>
                      <div
                        className="row"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div className="col-6">
                          <button
                            className="ml-1 btn btn-primary"
                            // type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              verifyOTP();
                              // window.alert("Success");
                            }}
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {showNewPasswordDiv && (
                    <>
                      <div className="row pt-4">
                        <div className="col-6 p-2">
                          <label className="control-label">New Password</label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="text"
                            // min={0}
                            // defaultValue={4}
                            // step={1}
                            placeholder="Enter New Password"
                            name="newPassword"
                            className="form-control"
                            // onChange={handleInputChange}
                            // value={userDetails.newPassword}
                          />
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col-6 p-2">
                          <label className="control-label">
                            Confirm Password
                          </label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="text"
                            // min={0}
                            // defaultValue={4}
                            // step={1}
                            placeholder="Enter Confirm Password"
                            name="confirmNewPassword"
                            className="form-control"
                            // onChange={handleInputChange}
                            // value={userDetails.confirmNewPassword}
                          />
                        </div>
                      </div>
                      <div
                        className="row pt-4"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div className="col-12">
                          <button
                            className="ml-1 btn btn-primary w-100"
                            // type="submit"
                            onClick={(e) => {
                              // handleForgotPassword(e);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <br />
              </div>
            </div>
            <div className="form-group col-sm-12 card card-footer">
              <button
                type="button"
                className="ml-1 btn btn-danger"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setIsOpenModal1(false);
                  resetModalState();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
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
                    Order details
                  </li>
                </ol>
              </nav>
              <div className="d-sm-flex align-items-sm-center">
                <h1 className="page-header-title">
                  Order #{orderDetails?._id || "..."}
                </h1>
                <span className="badge badge-soft-danger ml-sm-3 text-capitalize">
                  <span
                    className="legend-indicator bg-danger"
                    style={{ marginLeft: 0, marginRight: ".4375rem" }}
                  />
                  {orderDetails?.payment_status || "..."}
                </span>
                <span className="badge badge-soft-info ml-2 ml-sm-3 text-capitalize">
                  <span
                    className="legend-indicator bg-info text"
                    style={{ marginLeft: 0, marginRight: ".4375rem" }}
                  />
                  {orderDetails?.order_type || "..."}
                </span>
                <span className="ml-2 ml-sm-3">
                  <i className="tio-date-range" />
                  {ISOToIST(orderDetails?.order_date_time) || "..."}
                </span>
              </div>
              <div className="col-md-6 mt-2">
                <Link
                  className="text-body"
                  // target="_blank"
                  // to="/seller/orders/generate-invoice/100066"
                  to=""
                >
                  <i className="tio-print" /> Print invoice
                </Link>
                <button
                  className="btn btn-xs btn-secondary"
                  // data-toggle="modal"
                  // data-target="#locationModal"
                >
                  <i className="tio-map" /> Show locations on map
                </button>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 mt-4"></div>
                <div className="col-12 col-md-6">
                  <div className="col-6 col-sm-6 hs-unfold float-right">
                    <div className="dropdown">
                      <h6>Order Status</h6>
                      <select
                        name="order_status"
                        onChange={(e) => {
                          if (e.target.value === "out_for_delivery") {
                            setIsOpenModal1(true);
                            setSelectedOrderStatus(e.target.value);
                          } else {
                            handleUpdateOrderStatus(e.target.value);
                          }
                        }}
                        className="status form-control"
                        value={
                          selectedOrderStatus ||
                          orderDetails?.OrderDetails?.[0]?.order_status
                        }
                      >
                        {[
                          // { name: "Pending", value: "pending" },
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
                        ].map((itemX) => (
                          <option
                            value={itemX.value}
                            selected={
                              itemX.value === selectedOrderStatus ||
                              itemX.value ===
                                orderDetails?.OrderDetails?.[0]?.order_status
                            }
                          >
                            {itemX.name}
                          </option>
                        ))}
                        {/* <option
                          value="pending"
                          selected={item.value === orderDetails?.order_status}
                        >
                          Pending
                        </option> */}
                        {/* <option value="confirmed"> Confirmed</option>
                        <option value="processing">Processing </option>
                        <option value="out_for_delivery">
                          Out for delivery
                        </option>
                        <option value="delivered">Delivered </option>
                        <option value="returned"> Returned</option>
                        <option value="failed">Failed </option>
                        <option value="canceled">Canceled </option> */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="printableArea">
          <div className="col-lg-8 mb-3  mb-lg-0">
            <div className="card mb-3  mb-lg-5" style={{ textAlign: "left" }}>
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
                          {orderDetails?.cc_discount || "0"} {"\u20B9"}
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
            {(orderDetails?.OrderDetails?.[0]?.order_status === "confirmed" ||
              orderDetails?.OrderDetails?.[0]?.order_status === "processing") && (
                <div className="card mb-2">
                  <div className="card-header">
                    <h4>Shipping info</h4>
                  </div>
                  <div className="card-body text-capitalize">
                    <ul className="list-unstyled list-unstyled-py-2">
                      <li id="choose_delivery_man">
                        <label htmlFor>Choose delivery man</label>
                        <select
                          className="form-control text-capitalize js-select2-custom"
                          name="delivery_man_id"
                          style={{
                            width: "100%",
                            // display: "none"
                          }}
                          onChange={(e) => {
                            setSelectedDeliveryBoyPhone(
                              resDeliveryBoys?.length &&
                                resDeliveryBoys.filter(
                                  (item) => item.user_id == e.target.value
                                )?.[0]?.users_data?.[0]?.contect_no
                            );
                            handleAssignDeliveryMan(e);
                          }}
                        >
                          <option value="">--Select--</option>
                          {console.log(
                            orderDetails?.OrderDetails?.[0]?.deliveryboy?.[0]
                              ?._id
                          )}
                          {!!resDeliveryBoys?.length &&
                            resDeliveryBoys.map((item) => (
                              <option
                                value={item.user_id}
                                selected={
                                  item.user_id ===
                                    orderDetails?.OrderDetails?.[0]
                                      ?.deliveryboy?.[0]?._id ||
                                  item.user_id == selectedDeliveryBoyId
                                }
                              >{`${item.fullname} (+91-${item.users_data?.[0]?.contect_no} )`}</option>
                            ))}
                        </select>
                      </li>
                      <li
                        className=" mt-2"
                        id="by_third_party_delivery_service_info"
                        style={{ display: "none" }}
                      >
                        <span>Delivery service name :</span>
                        <span style={{ float: "right" }}>
                          <Link to="">
                            <i className="tio-edit" />
                          </Link>
                        </span>
                        <br />
                        <span>Tracking id :</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">Customer</h4>
              </div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <div className="media align-items-center" href="javascript:">
                  <div className="icon icon-soft-info icon-circle mr-3">
                    <i className="tio-shopping-basket-outlined" />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">
                      {"0 Orders"}
                    </span>
                  </div>
                  <div className="media-body text-right"></div>
                </div>
                <hr />
                <div className="media align-items-center" href="javascript:">
                  <div className="avatar avatar-circle mr-3">
                    <img
                      className="avatar-img"
                      src="/assets/front-end/img/image-place-holder.png"
                      alt="Image Description"
                    />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">
                      {orderDetails?.customer_name || "..."}
                    </span>
                  </div>
                  <div className="media-body text-right"></div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Contact info</h5>
                </div>
                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    {console.log(orderDetails)}
                    <i className="tio-online mr-2" />
                    {orderDetails?.customer_name || "...."}
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
                  Name :<strong>{orderDetails?.order_address || "..."}</strong>
                  {/* <br />
                  Country:
                  <strong>{orderDetails?.country || "..."}</strong> */}
                  <br />
                  City:
                  <strong>{orderDetails?.order_city || "..."}</strong>
                  <br />
                  Zip code :
                  <strong>{orderDetails?.order_pincode || "..."}</strong>
                  <br />
                  Address :
                  <strong>{orderDetails?.order_address || "..."}</strong>
                  <br />
                  Phone:
                  <strong>{orderDetails?.customer_mobile || "..."}</strong>
                </span>
                <hr />
                {/* Removed Billing Address as sir said */}
                {/* <div className="d-flex justify-content-between align-items-center">
                  <h5>Billing address</h5>
                </div>
                <span className="d-block">
                  Name :
                  <strong>{orderDetails?.order_address || "..."}</strong>
                  <br />
                  Country:
                  <strong>{orderDetails?.country || "..."}</strong>
                  <br />
                  City:
                  <strong>{orderDetails?.city || "..."}</strong>
                  <br />
                  Zip code :
                  <strong>{orderDetails?.order_pincode || "..."}</strong>
                  <br />
                  Address :
                  <strong>
                    {orderDetails?.order_address ||
                      "..."}
                  </strong>
                  <br />
                  Phone:
                  <strong>
                    {orderDetails?.customer_mobile || "..."}
                  </strong>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerOrdersDetails;
