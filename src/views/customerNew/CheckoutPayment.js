import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getYYYYMMDD } from "utils/DateTime";
import { Context } from "context/newContext";
import axios from "axios";
import { defaultAPIErrorHandler } from "api/api";

function CheckoutPayment() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const [orderDetails, setOrderDetails] = useState({
    ...location.state,
  });

  const initPayment = (data) => {
    console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);
    console.log(process.env.NODE_ENV);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Zambet",
      description:
        process.env.NODE_ENV === "development" ? "Test Transaction" : "",
      image: "/zambet_logo.png",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl =
            process.env.REACT_APP_BASEURL + "/api/payment/verify";
          const res = await axios.post(verifyUrl, response);
          if (res.status >= 200 && res.status < 300) {
            handleSubmitOrder("card", "paid");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3b71de",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      if (!orderDetails?.orderTotal) {
        alert("No OrderTotal Amount");
        return;
      }

      const orderUrl = process.env.REACT_APP_BASEURL + "/api/payment/orders";
      const { data } = await axios.post(orderUrl, {
        amount: orderDetails?.orderTotal,
      });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitOrder = async (
    paymentMode,
    paymentStatus,
    transactionId
  ) => {
    const oDetails = { ...orderDetails };
    let data = {
      paymentmode: paymentMode,
      customer_name: oDetails.customer_name,
      customer_mobile: oDetails.customer_mobile,
      payment_status: paymentStatus,
      order_address: oDetails.order_address,
      order_city: oDetails.order_city,
      // order_state: oDetails.order_state,
      // order_country: oDetails.order_country,
      order_pincode: oDetails.order_pincode,
      cc_discount: oDetails.cc_discount + "",
      delivery_charge: oDetails.delivery_charge + "",
      order_type: "online",
      transaction_id: transactionId || "TID1234567890",
      delivery_time_slot: oDetails.delivery_time_slot + "",
      Delivery_date: oDetails.Delivery_date + "",
    };

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/order",
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.data);
        // setMainState((prev) => ({
        //   ...prev,
        //   resProduct: response.data,
        // }));
        navigate("/checkout-complete");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
        // alert(error?.response?.data?.message);
      });
  };

  const handlePaymentMode = async (paymentMode) => {
    if (paymentMode === "cod") {
      handleSubmitOrder(paymentMode, "pending");
    } else if (paymentMode === "razorpay") {
      handlePayment();
    }
  };

  return (
    <div
      className="container pb-5 mb-2 mb-md-4 rtl"
      style={{ textAlign: "left" }}
    >
      <div className="row">
        <div className="col-md-12 mb-5 pt-5">
          <div
            className="feature_header"
            style={{ background: "#dcdcdc", lineHeight: "1px" }}
          >
            <span>Payment method</span>
          </div>
        </div>
        <section className="col-lg-8">
          <hr />
          <div className="checkout_details mt-3">
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n    .steps-light .step-item.active .step-count, .steps-light .step-item.active .step-progress {\n        color: #fff;\n        background-color: #3b71de;\n    }\n\n    .steps-light .step-count, .steps-light .step-progress {\n        color: #4f4f4f;\n        background-color: rgba(225, 225, 225, 0.67);\n    }\n\n    .steps-light .step-item.active.current {\n        color: #3b71de  !important;\n        pointer-events: none;\n    }\n\n    .steps-light .step-item {\n        color: #4f4f4f;\n        font-size: 14px;\n        font-weight: 400;\n    }\n",
              }}
            />
            <div className="steps steps-light pt-2 pb-2">
              <Link className="step-item active " to="/checkout-details">
                <div className="step-progress">
                  <span className="step-count">
                    <i className="czi-user-circle" />
                  </span>
                </div>
                <div className="step-label">Sign in / Sign up</div>
              </Link>
              <Link className="step-item active " to="/checkout-details">
                <div className="step-progress">
                  <span className="step-count">
                    <i className="czi-package" />
                  </span>
                </div>
                <div className="step-label">Shipping And Billing</div>
              </Link>
              <Link className="step-item active current" to="/checkout-payment">
                <div className="step-progress">
                  <span className="step-count">
                    <i className="czi-card" />
                  </span>
                </div>
                <div className="step-label">Payment</div>
              </Link>
            </div>
            <h2 className="h6 pb-3 mb-2 mt-5">Choose payment</h2>
            <div className="row">
              <div className="col-md-6 mb-4" style={{ cursor: "pointer" }}>
                <div className="card">
                  <div className="card-body" style={{ height: "100px" }}>
                    <form className="needs-validation">
                      <button
                        className="btn btn-block click-if-alone"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePaymentMode("cod");
                        }}
                      >
                        <img
                          width={150}
                          style={{ marginTop: "-10px" }}
                          src="/assets/front-end/img/cod.png"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4" style={{ cursor: "pointer" }}>
                <div className="card">
                  <div className="card-body" style={{ height: "100px" }}>
                    <button
                      className="btn btn-block click-if-alone"
                      type="button"
                      onclick="$('.razorpay-payment-button').click()"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePaymentMode("razorpay");
                      }}
                    >
                      <img
                        width={150}
                        src="/assets/front-end/img/razor.png"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4" />
              <div className="col-4">
                <Link
                  className="btn btn-secondary btn-block"
                  to="/checkout-details"
                >
                  <span className="d-none d-sm-inline">Back to Shipping</span>
                  <span className="d-inline d-sm-none">Back</span>
                </Link>
              </div>
              <div className="col-4" />
            </div>
          </div>
        </section>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .cart_title {\n        font-weight: 400 !important;\n        font-size: 16px;\n    }\n\n    .cart_value {\n        font-weight: 600 !important;\n        font-size: 16px;\n    }\n\n    .cart_total_value {\n        font-weight: 700 !important;\n        font-size: 25px !important;\n        color: #3b71de     !important;\n    }\n",
          }}
        />
        <aside className="col-lg-4 pt-4 pt-lg-0">
          <div className="cart_total">
            <div className="d-flex justify-content-between">
              <span className="cart_title">Sub total</span>
              <span className="cart_value">{`₹ ${orderDetails.subTotal}`}</span>
            </div>
            {/* <div className="d-flex justify-content-between">
              <span className="cart_title">Tax</span>
              <span className="cart_value">{`₹ ${orderDetails.tax}`}</span>
            </div> */}
            <div className="d-flex justify-content-between">
              <span className="cart_title">Shipping</span>
              <span className="cart_value">{`₹ ${orderDetails.delivery_charge}`}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="cart_title">Discount on product</span>
              <span className="cart_value">{`- ₹ ${orderDetails.discount}`}</span>
            </div>
            <div className="mt-2">
              <form
                className="needs-validation"
                noValidate
                id="coupon-code-ajax"
              >
                <div className="form-group">
                  <input
                    className="form-control input_code"
                    type="text"
                    name="code"
                    placeholder="Coupon code"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide coupon code
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  type="button"
                  onclick="couponCode()"
                >
                  Apply code
                </button>
              </form>
            </div>
            <hr className="mt-2 mb-2" />
            <div className="d-flex justify-content-between">
              <span className="cart_title">Total</span>
              <span className="cart_value">
                {`₹ ${orderDetails.orderTotal}`}
              </span>
            </div>
          </div>
          <div className="container mt-2">
            <div className="row p-0">
              <div className="col-md-3 p-0 text-center mobile-padding">
                <img
                  className="order-summery-footer-image"
                  src="/assets/front-end/png/delivery.png"
                  alt=""
                />
                <div className="deal-title">3 Days free delivery </div>
              </div>
              <div className="col-md-3 p-0 text-center">
                <img
                  className="order-summery-footer-image"
                  src="/assets/front-end/png/money.png"
                  alt=""
                />
                <div className="deal-title">Money back guarantee</div>
              </div>
              <div className="col-md-3 p-0 text-center">
                <img
                  className="order-summery-footer-image"
                  src="/assets/front-end/png/Genuine.png"
                  alt=""
                />
                <div className="deal-title">100% Genuine Product</div>
              </div>
              <div className="col-md-3 p-0 text-center">
                <img
                  className="order-summery-footer-image"
                  src="/assets/front-end/png/Payment.png"
                  alt=""
                />
                <div className="deal-title">Authentic payment</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPayment;
