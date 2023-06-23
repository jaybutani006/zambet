import "App.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "context/newContext";
import { Link, useNavigate } from "react-router-dom";
import { truncate } from "utils/truncateText";
import ClipLoader from "react-spinners/ClipLoader";
import dummyProductImage from "assets/dummyProductImage.png";
import { defaultAPIErrorHandler } from "api/api";

function Cart() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponCodeInvalid, setIsCouponCodeInvalid] = useState(false);
  const [mainState, setMainState] = useState({
    resAllCartItem: [],
    resCartItem: [],
    quantity: 0,
    resCartDelete: [],
    resCartPlus: [],
    resCartMinus: [],
    resProduct: {},
  });

  const [orderDetails, setOrderDetails] = useState({
    paymentmode: "",
    customer_name: "",
    customer_mobile: "",
    payment_status: "",
    order_address: "",
    order_city: "",
    order_state: "",
    order_country: "",
    order_pincode: "",
    cc_discount: 0,
    delivery_charge: 0,
    order_type: "online",
    transaction_id: "",
    delivery_time_slot: "",
    Delivery_date: "",
    // extra react fields but not in api
    subTotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    orderTotal: 0,
  });

  const apiGetAllCart = () => {
    setLoader(true);
    let data = "";

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "SET_USER_CART_COUNT",
          userCartCount: response?.data?.data?.cart?.length || 0,
        });
        setMainState((prev) => ({
          ...prev,
          resAllCartItem: response?.data?.data?.cart,
          resCartItem: response?.data?.data?.cart,
        }));
        console.log(mainState);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const apiGetMinus = (cartId, index) => {
    let data = {
      action: "minus",
    };

    let config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      params: { cart_id: cartId },
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        //
        const newCartItems = mainState.resAllCartItem.slice();
        newCartItems[index].quantity -= 1;

        if (newCartItems[index].quantity < 1) {
          newCartItems.splice(index, 1);
          dispatch({
            type: "SET_USER_CART_COUNT",
            userCartCount: (+state.userCartCount || 0) - 1,
          });
          setMainState((prev) => ({
            ...prev,
            resAllCartItem: newCartItems,
          }));
        } else {
          setMainState((prev) => ({
            ...prev,
            resAllCartItem: newCartItems,
          }));
        }
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const resCartPlus = (cartId, index) => {
    let data = {
      action: "plus",
    };

    let config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      params: { cart_id: cartId },
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        const newCartItems = mainState.resAllCartItem.slice();
        newCartItems[index].quantity += 1;

        if (newCartItems[index].quantity < 0) {
          return;
        }

        setMainState((prev) => ({
          ...prev,
          resAllCartItem: newCartItems,
        }));
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const apiGetDelete = (cartId, index) => {
    let data = {
      action: "delete",
    };

    let config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      params: { cart_id: cartId },
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        const newCartItems = mainState.resAllCartItem.slice();
        newCartItems.splice(index, 1);
        dispatch({
          type: "SET_USER_CART_COUNT",
          userCartCount: (+state.userCartCount || 0) - 1,
        });

        setMainState((prev) => ({
          ...prev,
          resAllCartItem: newCartItems,
        }));
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleRemoveFromCart = (e, index) => {
    if (
      !window.confirm(
        `Are you sure you want to remove item : ${mainState?.resAllCartItem?.[index]?.Product?.pname}}`
      )
    ) {
      return;
    }
    // const newCartItems = mainState.resAllCartItem.slice();
    // newCartItems.splice(index, 1);
    // setMainState((prev) => ({
    //   ...prev,
    //   resAllCartItem: newCartItems,
    // }));

    apiGetDelete(mainState.resAllCartItem[index]._id, index);
  };

  const handleChangeQtyOfCartItem = (e, index) => {
    const newCartItems = mainState.resAllCartItem.slice();
    newCartItems[index].quantity = e.target.value;

    if (+newCartItems[index].product_stock < +e.target.value) {
      alert("Not Enough Stock Available for this Product");
      return;
    }
    if (+newCartItems[index].p_quantity < +e.target.value) {
      alert("Not Enough Stock Available for this Product");
      return;
    }

    setMainState((prev) => ({
      ...prev,
      resAllCartItem: newCartItems,
    }));
  };

  const handleIncreaseQtyOfCartItem = (e, index) => {
    // const newCartItems = mainState.resAllCartItem.slice();
    // newCartItems[index].quantity += 1;

    // setMainState((prev) => ({
    //   ...prev,
    //   resAllCartItem: newCartItems,
    // }));

    resCartPlus(mainState.resAllCartItem[index]._id, index);
  };

  const handleDecreaseQtyOfCartItem = (e, index) => {
    // if (+mainState.resAllCartItem[index].quantity - 1 <= 0) {
    //   alert("You can not decrease quantity of this product anymore");
    //   return;
    // }

    // setMainState((prev) => ({
    //   ...prev,
    //   resAllCartItem: newCartItems,
    // }));

    apiGetMinus(mainState.resAllCartItem[index]._id, index);
  };

  const handleApplyCouponCode = () => {
    setLoader(true);

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/coupon_code/apply",
      headers: {
        Authorization: state.userToken,
      },
      params: {
        coupon_name: couponCode,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response);
        if (!response?.data?.data?.length) {
          setIsCouponCodeInvalid(true);
        } else {
          setIsCouponCodeInvalid(false);
          if (response?.data?.data?.[0]?.type === "flat") {
            setOrderDetails((prev) => ({
              ...prev,
              cc_discount: prev.cc_discount + +response?.data?.data?.[0]?.value,
              discount: prev.discount + +response?.data?.data?.[0]?.value,
              orderTotal: prev.orderTotal - +response?.data?.data?.[0]?.value,
            }));
          } else {
            setOrderDetails((prev) => ({
              ...prev,
              cc_discount:
                prev.cc_discount +
                +((+response?.data?.data?.[0]?.value / 100) * +prev.orderTotal),
              discount:
                prev.discount +
                +((+response?.data?.data?.[0]?.value / 100) * +prev.orderTotal),
              orderTotal:
                prev.orderTotal -
                +((+response?.data?.data?.[0]?.value / 100) * +prev.orderTotal),
            }));
          }
        }
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (!state.isUserLoggedIn) {
      navigate("/customer/auth/login", { replace: true });
      return;
    }
    apiGetAllCart();
  }, []);

  useEffect(() => {
    setOrderDetails((prev) => ({
      ...prev,
      subTotal:
        mainState.resAllCartItem.reduce((acc, item) => {
          acc += +item.quantity * +item.Product.selling_price;
          return acc;
        }, 0) || 0,
      discount:
        mainState.resAllCartItem.reduce((acc, item) => {
          acc += +item.quantity * (+item.Product.selling_price * 0);
          return acc;
        }, 0) || 0,
    }));
  }, [mainState.resAllCartItem]);

  useEffect(() => {
    setOrderDetails((prev) => ({
      ...prev,
      orderTotal: +prev.subTotal + +prev.tax + +prev.shipping - +prev.discount,
    }));
  }, [orderDetails.subTotal]);

  return (
    <>
      <div
        className="modal-quick-view modal fade "
        id="quick-view"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content" id="quick-view-modal"></div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div
            className="col-12"
            style={{
              width: "93%",
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        </div>
      </div>

      <div
        className="container pb-5 mb-2 mt-3 rtl"
        style={{ textAlign: "left" }}
        id="cart-summary"
      >
        <div className="feature_header">
          <span>Shopping cart</span>
        </div>
        <hr className="view_border" />
        <div className="row">
          <section className="col-lg-8">
            <div className="cart_information mb-3">
              <div className="table-responsive">
                <table
                  className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  style={{ width: "100%" }}
                >
                  <thead className>
                    <tr className>
                      <th className="font-weight-bold" style={{ width: "5%" }}>
                        SL#
                      </th>
                      <th className="font-weight-bold" style={{ width: "30%" }}>
                        Product details
                      </th>
                      <th className="font-weight-bold" style={{ width: "15%" }}>
                        Unit price
                      </th>
                      <th
                        className="font-weight-bold text-center"
                        style={{ width: "15%" }}
                      >
                        Qty
                      </th>
                      <th className="font-weight-bold" style={{ width: "15%" }}>
                        Price
                      </th>
                      <th className="font-weight-bold" style={{ width: "15%" }}>
                        Shipping cost{" "}
                      </th>
                      <th
                        className="font-weight-bold"
                        style={{ width: "5%" }}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {!!mainState.resAllCartItem.length &&
                      mainState?.resAllCartItem?.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <div className="row">
                              <div className="col-12">
                                <Link to={`/product/${item?.Product?._id}`}>
                                  <img
                                    style={{ height: "62px" }}
                                    src={
                                      item?.Product?.pphoto || dummyProductImage
                                    }
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src = dummyProductImage;
                                    }}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <span>
                                  {truncate(item?.Product?.pname, 20) || "...."}
                                </span>
                              </div>
                            </div>
                            {/* <div className="d-flex">
                              <div style={{ width: "30%" }}>
                                <a href="/product/universal-laptop-docking-station-dual-monitor-for-windows-and-mac-dual-video-hdmi-and-dvivgahdmi-gigabit-ethernet-audio-">
                                  <img
                                    style={{ height: "62px" }}
                                    src={item?.Product?.pphoto || "...."}
                                    alt="Product"
                                  />
                                </a>
                              </div>
                              <div
                                className="ml-2 text-break"
                                style={{ width: "70%" }}
                              >
                                <a href="/product/universal-laptop-docking-station-dual-monitor-for-windows-and-mac-dual-video-hdmi-and-dvivgahdmi-gigabit-ethernet-audio-">
                                  {item?.Product?.pname || "...."}
                                </a>
                              </div>
                            </div>
                            <div className="d-flex"></div> */}
                          </td>
                          <td>
                            <div className=" text-accent">
                              ₹{item?.Product?.selling_price || "...."}
                            </div>
                            <strike
                              style={{
                                fontSize: "12px!important",
                                color: "grey!important",
                              }}
                            >
                              {/* 100.00₹ */}
                            </strike>
                          </td>
                          <td>
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ width: "160px", color: "#3b71de" }}
                            >
                              <span className="input-group-btn" style={{}}>
                                <button
                                  className="btn btn-number"
                                  type="button"
                                  data-type="minus"
                                  data-field="quantity"
                                  style={{ padding: "10px", color: "#3b71de" }}
                                  value={item?.quantity}
                                  onClick={(e) =>
                                    handleDecreaseQtyOfCartItem(e, index)
                                  }
                                  // onClick={(e) => apiGetMinus(e, index)}
                                >
                                  -
                                </button>
                              </span>
                              <input
                                type="number"
                                name="quantity"
                                className="form-control input-number text-center cart-qty-field"
                                // placeholder={1}
                                // defaultValue={1}
                                // min={1}
                                // max={3}
                                style={{
                                  padding: "0px !important",
                                  width: "40%",
                                  height: "25px",
                                }}
                                disabled
                                value={item?.quantity}
                                onChange={(e) =>
                                  handleChangeQtyOfCartItem(e, index)
                                }
                              />
                              <span className="input-group-btn">
                                <button
                                  name="plus"
                                  className="btn btn-number"
                                  type="button"
                                  data-type="plus"
                                  data-field="quantity"
                                  style={{ padding: "10px", color: "#3b71de" }}
                                  onClick={(e) =>
                                    handleIncreaseQtyOfCartItem(e, index)
                                  }
                                  // value={item?.quantity}
                                  // onClick={(e) => resCartPlus(e, index)}
                                >
                                  +
                                </button>
                              </span>
                            </div>
                          </td>
                          <td>
                            <div>
                              ₹
                              {item?.Product?.selling_price * item?.quantity ||
                                "...."}
                            </div>
                          </td>
                          <td>₹00.00</td>
                          <td>
                            <button
                              className="btn btn-link px-0 text-danger"
                              onclick="removeFromCart(75)"
                              type="button"
                              onClick={(e) => handleRemoveFromCart(e, index)}
                              // onClick={(e) => apiGetDelete(e, index)}
                            >
                              <i className="czi-close-circle mr-2" />
                            </button>
                          </td>
                        </tr>
                      ))}

                    {loader && (
                      <tr>
                        <td colSpan={6}>
                          <center>
                            <ClipLoader
                              // color={"#ffffff"}
                              // loading={!!camps}
                              loading
                              // cssOverride={override}
                              // size={150}
                            />
                          </center>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="mt-3" />
              </div>
            </div>
            {/* <form>
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <label
                      htmlFor="phoneLabel"
                      className="form-label input-label"
                    >
                      Order note{" "}
                      <span className="input-label-secondary">(Optional)</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="order_note"
                      name="order_note"
                      style={{ width: "100%" }}
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </form> */}
            <div className="row pt-2">
              <div className="col-6">
                <a href="/" className="btn btn-primary">
                  <i className="fa fa-backward px-1" /> Continue shopping
                </a>
              </div>
              <div className="col-6">
                <Link
                  // onclick="checkout()"
                  onClick={(e) => {
                    if (!state.isUserLoggedIn) {
                      alert("Please Login First.");
                      e.stopPropagation();
                    }
                  }}
                  to={state.isUserLoggedIn ? "/checkout-details" : ""}
                  className="btn btn-primary pull-right"
                  state={{ orderDetails: orderDetails }}
                >
                  Checkout
                  <i className="fa fa-forward px-1" />
                </Link>
              </div>
            </div>
          </section>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    .cart_title {\n        font-weight: 400 !important;\n        font-size: 16px;\n    }\n\n    .cart_value {\n        font-weight: 600 !important;\n        font-size: 16px;\n    }\n\n    .cart_total_value {\n        font-weight: 700 !important;\n        font-size: 25px !important;\n        color: #1b7fed     !important;\n    }\n",
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
                <span className="cart_value">{`₹ ${orderDetails.shipping}`}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cart_title">Discount on products</span>
                <span className="cart_value">{`- ₹ ${orderDetails.discount}`}</span>
              </div>
              <div className="mt-2">
                <form
                  className="needs-validation"
                  // action="javascript:"
                  // method="post"
                  noValidate
                  id="coupon-code-ajax"
                >
                  <div className="form-group">
                    <input
                      className="form-control input_code"
                      type="text"
                      name="coupon_code"
                      placeholder="Coupon code"
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                      }}
                      value={couponCode}
                    />
                    {isCouponCodeInvalid && (
                      <div
                        style={{
                          color: "red",
                        }}
                      >
                        Please provide valid coupon code
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={() => {
                      handleApplyCouponCode();
                    }}
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
              {/* <div className="d-flex justify-content-center">
                <span className="cart_total_value mt-2">
                  {`₹ ${orderDetails.orderTotal}`}
                </span>
              </div> */}
            </div>
            <div className="container mt-2">
              <div className="row p-0">
                <div className="col-md-3 p-0 text-center mobile-padding">
                  <img
                    style={{ height: "29px" }}
                    src="assets/front-end/png/delivery.png"
                    alt=""
                  />
                  <div className="deal-title">
                    3 Days <br />
                    <span>Free delivery</span>
                  </div>
                </div>
                <div className="col-md-3 p-0 text-center">
                  <img
                    style={{ height: "29px" }}
                    src="assets/front-end/png/money.png"
                    alt=""
                  />
                  <div className="deal-title">Money back guarantee</div>
                </div>
                <div className="col-md-3 p-0 text-center">
                  <img
                    style={{ height: "29px" }}
                    src="assets/front-end/png/Genuine.png"
                    alt=""
                  />
                  <div className="deal-title">
                    100% Genuine
                    <br />
                    <span>Product</span>
                  </div>
                </div>
                <div className="col-md-3 p-0 text-center">
                  <img
                    style={{ height: "29px" }}
                    src="assets/front-end/png/Payment.png"
                    alt=""
                  />
                  <div className="deal-title">Authentic payment</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default Cart;
