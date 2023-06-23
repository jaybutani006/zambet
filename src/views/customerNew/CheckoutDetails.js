import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function CheckoutDetails() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [showModalUserAddress, setShowModalUserAddress] = useState(false);
  const handleShowModalUserAddress = () => setShowModalUserAddress(true);
  const handleCloseModalUserAddress = () => setShowModalUserAddress(false);

  const [orderDetails, setOrderDetails] = useState({
    ...location.state.orderDetails,
  });

  const [pincodes, setPincodes] = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer_mobile") {
      if (value.length > 10) {
        return;
      }
      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    } else if (name === "order_pincode") {
      if (value.length > 6) {
        return;
      }
      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
        customer_name: "customer_name",
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    } else if (name === "deliveryAddresses") {
      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
        customer_name: deliveryAddresses[+e.target.value].contect_person_name,
        customer_mobile:
          deliveryAddresses[+e.target.value].contect_person_number,
        order_pincode: deliveryAddresses[+e.target.value].zip_code,
        order_city: deliveryAddresses[+e.target.value].city,
        order_address: deliveryAddresses[+e.target.value].delivery_address,
      }));
    } else if (name === "Delivery_date") {
      console.log(value);
      const tempCurrentDate = new Date();
      const currentDate = new Date(tempCurrentDate.toISOString().split("T")[0]);
      const selectedDate = new Date(value);

      if (selectedDate.getTime() < currentDate.getTime()) {
        alert("Please select valid date");
        return;
      }

      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    } else {
      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  const validateBeforeProceedPayment = () => {
    let errors = {};
    let formIsValid = true;
    const {
      customer_name,
      customer_mobile,
      order_address,
      order_city,
      // order_state,
      // order_country,
      order_pincode,
      delivery_time_slot,
      Delivery_date,
    } = orderDetails;

    if (!customer_name) {
      formIsValid = false;
      errors["customer_name"] = "Cannot be empty or invalid";
    }
    if (!customer_mobile) {
      formIsValid = false;
      errors["customer_mobile"] = "Cannot be empty or invalid";
    }
    if (!order_address) {
      formIsValid = false;
      errors["order_address"] = "Cannot be empty or invalid";
    }
    if (!order_city) {
      formIsValid = false;
      errors["order_city"] = "Cannot be empty or invalid";
    }
    // if (!order_state) {
    //   formIsValid = false;
    //   errors["order_state"] = "Cannot be empty or invalid";
    // }
    // if (!order_country) {
    //   formIsValid = false;
    //   errors["order_country"] = "Cannot be empty or invalid";
    // }
    if (!order_pincode) {
      formIsValid = false;
      errors["order_pincode"] = "Cannot be empty or invalid";
    }
    if (!delivery_time_slot) {
      formIsValid = false;
      errors["delivery_time_slot"] = "Cannot be empty or invalid";
    }
    if (!Delivery_date) {
      formIsValid = false;
      errors["Delivery_date"] = "Cannot be empty or invalid";
    }

    setOrderDetails((prev) => ({ ...prev, errors }));

    return formIsValid;
  };

  const handleCheckout = () => {
    const order_pincode = orderDetails?.order_pincode;
    const validated = validateBeforeProceedPayment();

    if (!validated) {
      // alert("Validation Failed");
      return;
    }

    if (!order_pincode || `${order_pincode}`.length !== 6) {
      alert("Invalid Pincode");
    }

    let isDeliverableToPinCode = false;
    for (let index = 0; index < pincodes.length; index++) {
      const element = pincodes[index];
      if (element?.pincode == order_pincode) {
        isDeliverableToPinCode = true;
        break;
      }
    }

    if (isDeliverableToPinCode) {
      navigate("/checkout-payment", {
        state: { ...orderDetails },
      });
    } else {
      alert(
        `Currently we are not available at this pincode : ${order_pincode}`
      );
    }
  };

  const getUserAddressesAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/useraddress",
      headers: {
        Authorization: state.userToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        setDeliveryAddresses(response.data.data);
        if (response.data.data?.length) {
          const defaultAddress = response.data.data?.filter(
            (item) => !!item?.is_default
          );
          // console.log(defaultAddress);
          if (!!defaultAddress?.length) {
            setOrderDetails((prev) => ({
              ...prev,
              customer_name: defaultAddress?.[0].contect_person_name,
              customer_mobile: defaultAddress?.[0].contect_person_number,
              order_pincode: defaultAddress?.[0].zip_code,
              order_city: defaultAddress?.[0].city,
              order_address: defaultAddress?.[0].delivery_address,
            }));
          }
        }
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const deleteUserAddressAPI = (index, userAddressId) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "/api/useraddress",
      params: {
        _id: userAddressId,
      },
      headers: {
        Authorization: state.userToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        getUserAddressesAPI();
        alert("Successfully Delete the Address");
      })
      .catch((error) => {
        // console.log(error);
        // alert("Failed to Delete the Address");
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteUserAddress = (e, index, userAddressId) => {
    if (
      window.confirm(
        `Are you sure you want to Delete ${deliveryAddresses[index].Comment_box}?`
      )
    ) {
      deleteUserAddressAPI(index, userAddressId);
    }
  };

  const apiGetPincode = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/pincode",
    })
      .then((response) => {
        console.log(response.data);
        setPincodes(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getUserAddressesAPI();
    apiGetPincode();
  }, []);

  return (
    <div
      className="container pb-5 mb-2 mb-md-4 rtl"
      style={{ textAlign: "left" }}
    >
      <div className="row">
        <div className="col-md-12 mb-5 pt-5">
          <div className="feature_header">
            <span>Shipping and billing address</span>
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
              <a className="step-item active " href="/checkout-details">
                <div className="step-progress">
                  <span className="step-count">
                    <i className="czi-user-circle" />
                  </span>
                </div>
                <div className="step-label">Sign in / Sign up</div>
              </a>
              <a className="step-item active current" href="/checkout-details">
                <div className="step-progress">
                  <span className="step-count">
                    <i className="czi-package" />
                  </span>
                </div>
                <div className="step-label">Shipping and billing</div>
              </a>
              <a className="step-item  " href="/checkout-payment">
                <div className="step-progress">
                  <span className="step-count">
                    <i className="czi-card" />
                  </span>
                </div>
                <div className="step-label">Payment</div>
              </a>
            </div>
            <Modal
              show={showModalUserAddress}
              size="xl"
              onHide={() => {
                handleCloseModalUserAddress();
              }}
              centered
            >
              <Modal.Header
                style={{
                  backgroundColor: "#71869d",
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Modal.Title>User Address</Modal.Title>
                <Button
                  onClick={() => {
                    handleCloseModalUserAddress();
                  }}
                  variant="outline-light"
                >
                  X
                </Button>
              </Modal.Header>
              <Modal.Body>
                {/*  */}
                <div className="row">
                  {!!deliveryAddresses.length &&
                    deliveryAddresses.map((item, index) => (
                      <section className="col-lg-6 col-md-6 mb-4 mt-5">
                        <div
                          className="card"
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          <div
                            className="card-header d-flex justify-content-between"
                            style={{ padding: "5px" }}
                          >
                            <div>
                              <i
                                className="fa fa-thumb-tack fa-2x iconHad"
                                aria-hidden="true"
                              />
                            </div>
                            <div>
                              <span>
                                {!!item?.is_default ? "Default Address" : ""}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <Link
                                className
                                id="edit"
                                to={`/account-address-edit/${item._id}`}
                                state={item}
                              >
                                <i className="fa fa-edit fa-lg" />
                              </Link>
                              <a
                                className
                                href="#"
                                // onclick="return confirm('Are you sure you want to Delete?');"
                                onClick={(e) =>
                                  handleDeleteUserAddress(e, index, item._id)
                                }
                                id="delete"
                              >
                                <i className="fa fa-trash fa-lg" />
                              </a>
                            </div>
                          </div>
                          <div
                            className="modal fade"
                            id="editAddress_35"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog  modal-lg"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <div className="row">
                                    <div className="col-md-12">
                                      {" "}
                                      <h5 className="modal-title font-name ">
                                        Update Address{" "}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-body">
                                  <form id="updateForm">
                                    <input
                                      type="hidden"
                                      name="_token"
                                      defaultValue="rYJydBe2cb7GUfjpnDdJsBk9BlL7vQqolwVns1a9"
                                    />{" "}
                                    <div className="row pb-1">
                                      <div
                                        className="col-md-6"
                                        style={{ display: "flex" }}
                                      >
                                        <input
                                          type="hidden"
                                          id="defaultValue"
                                          className="add_type"
                                          defaultValue="office"
                                        />
                                        <ul className="donate-now">
                                          <li className="address_type_li">
                                            <input
                                              type="radio"
                                              className="address_type"
                                              id="a25"
                                              name="addressAs"
                                              defaultValue="permanent"
                                            />
                                            <label
                                              htmlFor="a25"
                                              className="component"
                                            >
                                              Permanent
                                            </label>
                                          </li>
                                          <li className="address_type_li">
                                            <input
                                              type="radio"
                                              className="address_type"
                                              id="a50"
                                              name="addressAs"
                                              defaultValue="home"
                                            />
                                            <label
                                              htmlFor="a50"
                                              className="component"
                                            >
                                              Home
                                            </label>
                                          </li>
                                          <li className="address_type_li">
                                            <input
                                              type="radio"
                                              className="address_type"
                                              id="a75"
                                              name="addressAs"
                                              defaultValue="office"
                                              defaultChecked
                                            />
                                            <label
                                              htmlFor="a75"
                                              className="component"
                                            >
                                              Office
                                            </label>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="form-row">
                                      <div className="form-group col-md-6">
                                        <label htmlFor="person_name">
                                          Contact person name
                                        </label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          id="person_name"
                                          name="name"
                                        />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="own_phone">Phone</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          id="own_phone"
                                          name="phone"
                                          defaultValue="asdasd"
                                          required="required"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-row">
                                      <div className="form-group col-md-6">
                                        <label htmlFor="city">City</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          id="city"
                                          name="city"
                                          defaultValue="asdasd"
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="zip_code">
                                          Zip code
                                        </label>
                                        <input
                                          className="form-control"
                                          type="number"
                                          id="zip_code"
                                          name="zip"
                                          defaultValue={2222}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div className="form-row">
                                      <div className="form-group col-md-6">
                                        <label htmlFor="own_state">State</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="state"
                                          defaultValue
                                          id="own_state"
                                          placeholder
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="own_country">
                                          Country
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="own_country"
                                          name="country"
                                          defaultValue
                                          placeholder
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div className="form-row">
                                      <div className="form-group col-md-12">
                                        <label htmlFor="own_address">
                                          Address
                                        </label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          id="own_address"
                                          name="address"
                                          defaultValue="Unnamed Road, Bhairopani, Madhya Pradesh 480106, India"
                                          required
                                        />
                                      </div>
                                    </div>
                                    <input
                                      type="hidden"
                                      id="latitude"
                                      name="latitude"
                                      className="form-control d-inline"
                                      placeholder="Ex : -94.22213"
                                      defaultValue="21.7679"
                                      required
                                      readOnly
                                    />
                                    <input
                                      type="hidden"
                                      name="longitude"
                                      className="form-control"
                                      placeholder="Ex : 103.344322"
                                      id="longitude"
                                      defaultValue="78.8718"
                                      required
                                      readOnly
                                    />
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="closeB btn btn-secondary"
                                        data-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        id="addressUpdate"
                                        data-id={35}
                                      >
                                        Update{" "}
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              setOrderDetails((prev) => ({
                                ...prev,
                                deliveryAddresses: index,
                                customer_name:
                                  deliveryAddresses[index].contect_person_name,
                                customer_mobile:
                                  deliveryAddresses[index]
                                    .contect_person_number,
                                order_pincode:
                                  deliveryAddresses[index].zip_code,
                                order_city: deliveryAddresses[index].city,
                                order_address:
                                  deliveryAddresses[index].delivery_address,
                              }));
                              handleCloseModalUserAddress();
                            }}
                            className="card-body"
                            style={{ padding: "0 15px 15px 13px" }}
                          >
                            <div className="font-name">
                              <span>{item.Comment_box}</span>
                            </div>
                            <div>
                              <span className="font-nameA">
                                {" "}
                                <strong>Phone :</strong>{" "}
                                {item.contect_person_number}
                              </span>
                            </div>
                            <div>
                              <span className="font-nameA">
                                {" "}
                                <strong>City :</strong> {item.city}
                              </span>
                            </div>
                            <div>
                              <span className="font-nameA">
                                {" "}
                                <strong> Zip code :</strong> {item.zip_code}
                              </span>
                            </div>
                            <div>
                              <span className="font-nameA">
                                {" "}
                                <strong>Address :</strong>{" "}
                                {item.delivery_address}
                              </span>
                            </div>
                          </div>
                        </div>
                      </section>
                    ))}
                  {!deliveryAddresses.length && (
                    <section>No Delivery Addresses</section>
                  )}
                </div>
                {/*  */}
              </Modal.Body>
              {/* <Modal.Footer
                style={{
                  backgroundColor: "#71869d",
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Button type="button" variant="outline-light">
                  Save
                </Button>
                <Button type="button" variant="outline-light">
                  Delete
                </Button>
              </Modal.Footer> */}
            </Modal>
            <h2 className="h4 pb-3 mb-2 mt-5">Choose Delivery Address</h2>
            <form id="address-form">
              <div className="card-body" style={{ padding: "0!important" }}>
                <ul className="list-group">
                  <li
                    className="list-group-item mb-2 mt-2"
                    onclick="anotherAddress()"
                  >
                    <input
                      type="radio"
                      name="shipping_method_id"
                      id="sh-0"
                      defaultValue={0}
                      // data-toggle="collapse"
                      // data-target="#collapseThree"
                      defaultChecked
                    />
                    <span
                      className="checkmark"
                      style={{ marginRight: "10px" }}
                    />
                    <span
                      className="checkmark"
                      style={{ marginRight: "10px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline"
                      // data-toggle="collapse"
                      // data-target="#collapseThree"
                    >
                      Address
                    </button>
                    <div id="accordion">
                      <div
                        id="collapseThree"
                        className="collapse show"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <button
                              className="btn btn-primary btn-block"
                              onClick={(e) => {
                                handleShowModalUserAddress();
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              Choose From an Existing Address
                            </button>
                            {/* <select
                              name="deliveryAddresses"
                              className="form-control"
                              onChange={(e) => handleInputChange(e)}
                            >
                              <option value="" selected disabled>
                                --Select--
                              </option>
                              {!!deliveryAddresses.length &&
                                deliveryAddresses.map((item, index) => (
                                  <option value={index}>
                                    {item.Comment_box}
                                  </option>
                                ))}
                            </select> */}
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Contact Person Name
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="customer_name"
                              value={orderDetails.customer_name}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.customer_name && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.customer_name}
                              </small>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Phone
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="customer_mobile"
                              value={orderDetails.customer_mobile}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.customer_mobile && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.customer_mobile}
                              </small>
                            )}
                          </div>
                          {/* <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Address Type
                            </label>
                            <select
                              className="form-control"
                              name="address_type"
                            >
                              <option value="permanent">Permanent</option>
                              <option value="home">Home</option>
                              <option value="others">Others</option>
                            </select>
                          </div> */}
                          {/*  */}
                          {/* <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Country<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="order_country"
                              value={orderDetails.order_country}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.order_country && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.order_country}
                              </small>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              State<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="order_state"
                              value={orderDetails.order_state}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.order_state && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.order_state}
                              </small>
                            )}
                          </div> */}
                          {/*  */}
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              City<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="order_city"
                              value={orderDetails.order_city}
                              onChange={(e) => handleInputChange(e)}
                            />{" "}
                            {!!orderDetails?.errors?.order_city && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.order_city}
                              </small>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Pin code
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="order_pincode"
                              value={orderDetails.order_pincode}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.order_pincode && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.order_pincode}
                              </small>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Address<span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              className="form-control"
                              id="address"
                              type="text"
                              name="order_address"
                              value={orderDetails.order_address}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.order_address && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.order_address}
                              </small>
                            )}
                          </div>
                          {/* <div className="form-group">
                            <div
                              style={{
                                height: "200px",
                                position: "relative",
                                overflow: "hidden",
                              }}
                              id="location_map_canvas"
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  position: "absolute",
                                  top: "0px",
                                  left: "0px",
                                  backgroundColor: "rgb(229, 227, 223)",
                                }}
                              >
                                <div
                                  className="gm-style"
                                  style={{
                                    position: "absolute",
                                    zIndex: 0,
                                    left: "0px",
                                    top: "0px",
                                    height: "100%",
                                    width: "100%",
                                    padding: "0px",
                                    borderWidth: "0px",
                                    margin: "0px",
                                  }}
                                >
                                  <div>
                                    <button
                                      draggable="false"
                                      aria-label="Keyboard shortcuts"
                                      title="Keyboard shortcuts"
                                      type="button"
                                      style={{
                                        background: "none transparent",
                                        display: "block",
                                        border: "none",
                                        margin: "0px",
                                        padding: "0px",
                                        textTransform: "none",
                                        appearance: "none",
                                        position: "absolute",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        zIndex: 1000002,
                                        left: "-100000px",
                                        top: "-100000px",
                                      }}
                                    />
                                  </div>
                                  <div
                                    tabIndex={0}
                                    aria-label="Map"
                                    aria-roledescription="map"
                                    role="group"
                                    style={{
                                      position: "absolute",
                                      zIndex: 0,
                                      left: "0px",
                                      top: "0px",
                                      height: "100%",
                                      width: "100%",
                                      padding: "0px",
                                      borderWidth: "0px",
                                      margin: "0px",
                                      cursor:
                                        'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                                      touchAction: "pan-x pan-y",
                                    }}
                                  >
                                    <div
                                      style={{
                                        zIndex: 1,
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        width: "100%",
                                        transform: "translate(0px, 0px)",
                                      }}
                                    >
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                          zIndex: 100,
                                          width: "100%",
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 0,
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              zIndex: 987,
                                              transform:
                                                "matrix(1, 0, 0, 1, -198, -75)",
                                            }}
                                          >
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "256px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "0px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "0px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "256px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "512px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "512px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "-256px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "-256px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                          zIndex: 101,
                                          width: "100%",
                                        }}
                                      />
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                          zIndex: 102,
                                          width: "100%",
                                        }}
                                      />
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                          zIndex: 103,
                                          width: "100%",
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: -1,
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              zIndex: 987,
                                              transform:
                                                "matrix(1, 0, 0, 1, -198, -75)",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "256px",
                                                top: "0px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "0px",
                                                top: "0px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "0px",
                                                top: "-256px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "256px",
                                                top: "-256px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "512px",
                                                top: "-256px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "512px",
                                                top: "0px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "-256px",
                                                top: "0px",
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "-256px",
                                                top: "-256px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            width: "27px",
                                            height: "43px",
                                            overflow: "hidden",
                                            position: "absolute",
                                            left: "-14px",
                                            top: "-43px",
                                            zIndex: 0,
                                          }}
                                        >
                                          <img
                                            alt=""
                                            src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
                                            draggable="false"
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              width: "27px",
                                              height: "43px",
                                              userSelect: "none",
                                              border: "0px",
                                              padding: "0px",
                                              margin: "0px",
                                              maxWidth: "none",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                          zIndex: 0,
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            zIndex: 987,
                                            transform:
                                              "matrix(1, 0, 0, 1, -198, -75)",
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "256px",
                                              top: "0px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5891!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=30413"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5890!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=13259"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "-256px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5890!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=112823"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "256px",
                                              top: "-256px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5891!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=129977"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "512px",
                                              top: "-256px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5892!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=16060"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "512px",
                                              top: "0px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5892!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=47567"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "-256px",
                                              top: "0px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5889!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=130425"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "-256px",
                                              top: "-256px",
                                              width: "256px",
                                              height: "256px",
                                              transition:
                                                "opacity 200ms linear 0s",
                                            }}
                                          >
                                            <img
                                              draggable="false"
                                              alt=""
                                              role="presentation"
                                              src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5889!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=98918"
                                              style={{
                                                width: "256px",
                                                height: "256px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="gm-style-pbc"
                                      style={{
                                        zIndex: 2,
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        padding: "0px",
                                        borderWidth: "0px",
                                        margin: "0px",
                                        left: "0px",
                                        top: "0px",
                                        opacity: 0,
                                      }}
                                    >
                                      <p className="gm-style-pbt" />
                                    </div>
                                    <div
                                      style={{
                                        zIndex: 3,
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        padding: "0px",
                                        borderWidth: "0px",
                                        margin: "0px",
                                        left: "0px",
                                        top: "0px",
                                        touchAction: "pan-x pan-y",
                                      }}
                                    >
                                      <div
                                        style={{
                                          zIndex: 4,
                                          position: "absolute",
                                          left: "50%",
                                          top: "50%",
                                          width: "100%",
                                          transform: "translate(0px, 0px)",
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 104,
                                            width: "100%",
                                          }}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 105,
                                            width: "100%",
                                          }}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 106,
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            tabIndex={-1}
                                            style={{
                                              width: "27px",
                                              height: "43px",
                                              overflow: "hidden",
                                              position: "absolute",
                                              left: "-14px",
                                              top: "-43px",
                                              zIndex: 0,
                                            }}
                                          >
                                            <img
                                              alt=""
                                              src="https://maps.gstatic.com/mapfiles/transparent.png"
                                              draggable="false"
                                              useMap="#gmimap1"
                                              style={{
                                                width: "27px",
                                                height: "43px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                            <map name="gmimap1" id="gmimap1">
                                              <area
                                                log="miw"
                                                coords="13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75"
                                                shape="poly"
                                                tabIndex={-1}
                                                title
                                                style={{
                                                  cursor: "pointer",
                                                  touchAction: "none",
                                                }}
                                              />
                                            </map>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 107,
                                            width: "100%",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <iframe
                                    aria-hidden="true"
                                    frameBorder={0}
                                    tabIndex={-1}
                                    style={{
                                      zIndex: -1,
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",
                                      top: "0px",
                                      left: "0px",
                                      border: "none",
                                    }}
                                  />
                                  <div
                                    style={{
                                      pointerEvents: "none",
                                      width: "100%",
                                      height: "100%",
                                      boxSizing: "border-box",
                                      position: "absolute",
                                      zIndex: 1000002,
                                      opacity: 0,
                                      border: "2px solid rgb(26, 115, 232)",
                                    }}
                                  />
                                  <div>
                                    <div
                                      className="gmnoprint"
                                      style={{
                                        margin: "10px",
                                        zIndex: 0,
                                        position: "absolute",
                                        cursor: "pointer",
                                        left: "0px",
                                        top: "0px",
                                      }}
                                    >
                                      <div
                                        className="gm-style-mtc"
                                        style={{
                                          float: "left",
                                          position: "relative",
                                        }}
                                      >
                                        <button
                                          draggable="false"
                                          aria-label="Show street map"
                                          title="Show street map"
                                          type="button"
                                          aria-pressed="true"
                                          style={{
                                            background:
                                              "none padding-box rgb(255, 255, 255)",
                                            display: "table-cell",
                                            border: "0px",
                                            margin: "0px",
                                            padding: "0px 17px",
                                            textTransform: "none",
                                            appearance: "none",
                                            position: "relative",
                                            cursor: "pointer",
                                            userSelect: "none",
                                            direction: "ltr",
                                            overflow: "hidden",
                                            textAlign: "center",
                                            height: "40px",
                                            verticalAlign: "middle",
                                            color: "rgb(0, 0, 0)",
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "18px",
                                            borderBottomLeftRadius: "2px",
                                            borderTopLeftRadius: "2px",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            minWidth: "36px",
                                            fontWeight: 500,
                                          }}
                                          id="C39C68DC-6B0A-4516-BBD8-882D5E3852C0"
                                          aria-expanded="false"
                                        >
                                          Map
                                        </button>
                                        <ul
                                          role="menu"
                                          aria-labelledby="C39C68DC-6B0A-4516-BBD8-882D5E3852C0"
                                          style={{
                                            backgroundColor: "white",
                                            listStyle: "none",
                                            padding: "2px",
                                            margin: "0px",
                                            zIndex: -1,
                                            borderBottomLeftRadius: "2px",
                                            borderBottomRightRadius: "2px",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            position: "absolute",
                                            left: "0px",
                                            top: "40px",
                                            textAlign: "left",
                                            display: "none",
                                          }}
                                        >
                                          <li
                                            tabIndex={-1}
                                            role="menuitemcheckbox"
                                            aria-label="Show street map with terrain"
                                            draggable="false"
                                            title="Show street map with terrain"
                                            aria-checked="false"
                                            style={{
                                              color: "black",
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              userSelect: "none",
                                              fontSize: "18px",
                                              backgroundColor:
                                                "rgb(255, 255, 255)",
                                              padding: "5px 8px 5px 5px",
                                              direction: "ltr",
                                              textAlign: "left",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <span>
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "1em",
                                                  width: "1em",
                                                  transform:
                                                    "translateY(0.15em)",
                                                  display: "none",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "1em",
                                                  width: "1em",
                                                  transform:
                                                    "translateY(0.15em)",
                                                }}
                                              />
                                            </span>
                                            <label
                                              style={{ cursor: "inherit" }}
                                            >
                                              Terrain
                                            </label>
                                          </li>
                                        </ul>
                                      </div>
                                      <div
                                        className="gm-style-mtc"
                                        style={{
                                          float: "left",
                                          position: "relative",
                                        }}
                                      >
                                        <button
                                          draggable="false"
                                          aria-label="Show satellite imagery"
                                          title="Show satellite imagery"
                                          type="button"
                                          aria-pressed="false"
                                          style={{
                                            background:
                                              "none padding-box rgb(255, 255, 255)",
                                            display: "table-cell",
                                            border: "0px",
                                            margin: "0px",
                                            padding: "0px 17px",
                                            textTransform: "none",
                                            appearance: "none",
                                            position: "relative",
                                            cursor: "pointer",
                                            userSelect: "none",
                                            direction: "ltr",
                                            overflow: "hidden",
                                            textAlign: "center",
                                            height: "40px",
                                            verticalAlign: "middle",
                                            color: "rgb(86, 86, 86)",
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "18px",
                                            borderBottomRightRadius: "2px",
                                            borderTopRightRadius: "2px",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            minWidth: "64px",
                                          }}
                                          id="D05A686E-0E11-4603-B98C-7FE18FB351F5"
                                          aria-expanded="false"
                                        >
                                          Satellite
                                        </button>
                                        <ul
                                          role="menu"
                                          aria-labelledby="D05A686E-0E11-4603-B98C-7FE18FB351F5"
                                          style={{
                                            backgroundColor: "white",
                                            listStyle: "none",
                                            padding: "2px",
                                            margin: "0px",
                                            zIndex: -1,
                                            borderBottomLeftRadius: "2px",
                                            borderBottomRightRadius: "2px",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            position: "absolute",
                                            right: "0px",
                                            top: "40px",
                                            textAlign: "left",
                                            display: "none",
                                          }}
                                        >
                                          <li
                                            tabIndex={-1}
                                            role="menuitemcheckbox"
                                            aria-label="Show imagery with street names"
                                            draggable="false"
                                            title="Show imagery with street names"
                                            aria-checked="true"
                                            style={{
                                              color: "black",
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              userSelect: "none",
                                              fontSize: "18px",
                                              backgroundColor:
                                                "rgb(255, 255, 255)",
                                              padding: "5px 8px 5px 5px",
                                              direction: "ltr",
                                              textAlign: "left",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <span>
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "1em",
                                                  width: "1em",
                                                  transform:
                                                    "translateY(0.15em)",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "1em",
                                                  width: "1em",
                                                  transform:
                                                    "translateY(0.15em)",
                                                  display: "none",
                                                }}
                                              />
                                            </span>
                                            <label
                                              style={{ cursor: "inherit" }}
                                            >
                                              Labels
                                            </label>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <input
                                      id="pac-input"
                                      className="controls rounded pac-target-input"
                                      style={{
                                        height: "3em",
                                        width: "fit-content",
                                        zIndex: 0,
                                        position: "absolute",
                                        top: "0px",
                                        left: "307px",
                                      }}
                                      title="Search your location here"
                                      type="text"
                                      placeholder="Search here"
                                      autoComplete="off"
                                    />
                                  </div>
                                  <div />
                                  <div />
                                  <div>
                                    <button
                                      draggable="false"
                                      aria-label="Toggle fullscreen view"
                                      title="Toggle fullscreen view"
                                      type="button"
                                      className="gm-control-active gm-fullscreen-control"
                                      style={{
                                        background: "none rgb(255, 255, 255)",
                                        border: "0px",
                                        margin: "10px",
                                        padding: "0px",
                                        textTransform: "none",
                                        appearance: "none",
                                        position: "absolute",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        borderRadius: "2px",
                                        height: "40px",
                                        width: "40px",
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                        overflow: "hidden",
                                        top: "0px",
                                        right: "0px",
                                      }}
                                    >
                                      <img
                                        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E"
                                        alt=""
                                        style={{
                                          height: "18px",
                                          width: "18px",
                                        }}
                                      />
                                      <img
                                        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E"
                                        alt=""
                                        style={{
                                          height: "18px",
                                          width: "18px",
                                        }}
                                      />
                                      <img
                                        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E"
                                        alt=""
                                        style={{
                                          height: "18px",
                                          width: "18px",
                                        }}
                                      />
                                    </button>
                                  </div>
                                  <div />
                                  <div />
                                  <div />
                                  <div />
                                  <div>
                                    <div
                                      className="gmnoprint gm-bundled-control gm-bundled-control-on-bottom"
                                      draggable="false"
                                      controlwidth={40}
                                      controlheight={153}
                                      style={{
                                        margin: "10px",
                                        userSelect: "none",
                                        position: "absolute",
                                        bottom: "167px",
                                        right: "40px",
                                      }}
                                    >
                                      <div
                                        className="gmnoprint"
                                        controlwidth={40}
                                        controlheight={40}
                                        style={{
                                          display: "none",
                                          position: "absolute",
                                        }}
                                      >
                                        <div
                                          style={{
                                            backgroundColor:
                                              "rgb(255, 255, 255)",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "40px",
                                          }}
                                        >
                                          <button
                                            draggable="false"
                                            aria-label="Rotate map clockwise"
                                            title="Rotate map clockwise"
                                            type="button"
                                            className="gm-control-active"
                                            style={{
                                              background: "none",
                                              display: "none",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              left: "0px",
                                              top: "0px",
                                              overflow: "hidden",
                                              width: "40px",
                                              height: "40px",
                                            }}
                                          >
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                          </button>
                                          <div
                                            style={{
                                              position: "relative",
                                              overflow: "hidden",
                                              width: "30px",
                                              height: "1px",
                                              margin: "0px 5px",
                                              backgroundColor:
                                                "rgb(230, 230, 230)",
                                              display: "none",
                                            }}
                                          />
                                          <button
                                            draggable="false"
                                            aria-label="Rotate map counterclockwise"
                                            title="Rotate map counterclockwise"
                                            type="button"
                                            className="gm-control-active"
                                            style={{
                                              background: "none",
                                              display: "none",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              left: "0px",
                                              top: "0px",
                                              overflow: "hidden",
                                              width: "40px",
                                              height: "40px",
                                              transform: "scaleX(-1)",
                                            }}
                                          >
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                          </button>
                                          <div
                                            style={{
                                              position: "relative",
                                              overflow: "hidden",
                                              width: "30px",
                                              height: "1px",
                                              margin: "0px 5px",
                                              backgroundColor:
                                                "rgb(230, 230, 230)",
                                              display: "none",
                                            }}
                                          />
                                          <button
                                            draggable="false"
                                            aria-label="Tilt map"
                                            title="Tilt map"
                                            type="button"
                                            className="gm-tilt gm-control-active"
                                            style={{
                                              background: "none",
                                              display: "block",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              top: "0px",
                                              left: "0px",
                                              overflow: "hidden",
                                              width: "40px",
                                              height: "40px",
                                            }}
                                          >
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E"
                                              style={{ width: "18px" }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E"
                                              style={{ width: "18px" }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E"
                                              style={{ width: "18px" }}
                                            />
                                          </button>
                                        </div>
                                      </div>
                                      <div
                                        className="gm-svpc"
                                        dir="ltr"
                                        title="Drag Pegman onto the map to open Street View"
                                        controlwidth={40}
                                        controlheight={40}
                                        style={{
                                          backgroundColor: "rgb(255, 255, 255)",
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                          borderRadius: "2px",
                                          width: "40px",
                                          height: "40px",
                                          cursor:
                                            'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                                          touchAction: "none",
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                          }}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                          }}
                                        >
                                          <img
                                            src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2023%2038%22%3E%3Cpath%20d%3D%22M16.6%2038.1h-5.5l-.2-2.9-.2%202.9h-5.5L5%2025.3l-.8%202a1.53%201.53%200%2001-1.9.9l-1.2-.4a1.58%201.58%200%2001-1-1.9v-.1c.3-.9%203.1-11.2%203.1-11.2a2.66%202.66%200%20012.3-2l.6-.5a6.93%206.93%200%20014.7-12%206.8%206.8%200%20014.9%202%207%207%200%20012%204.9%206.65%206.65%200%2001-2.2%205l.7.5a2.78%202.78%200%20012.4%202s2.9%2011.2%202.9%2011.3a1.53%201.53%200%2001-.9%201.9l-1.3.4a1.63%201.63%200%2001-1.9-.9l-.7-1.8-.1%2012.7zm-3.6-2h1.7L14.9%2020.3l1.9-.3%202.4%206.3.3-.1c-.2-.8-.8-3.2-2.8-10.9a.63.63%200%2000-.6-.5h-.6l-1.1-.9h-1.9l-.3-2a4.83%204.83%200%20003.5-4.7A4.78%204.78%200%200011%202.3H10.8a4.9%204.9%200%2000-1.4%209.6l-.3%202h-1.9l-1%20.9h-.6a.74.74%200%2000-.6.5c-2%207.5-2.7%2010-3%2010.9l.3.1L4.8%2020l1.9.3.2%2015.8h1.6l.6-8.4a1.52%201.52%200%20011.5-1.4%201.5%201.5%200%20011.5%201.4l.9%208.4zm-10.9-9.6zm17.5-.1z%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23333%22%20opacity%3D%22.7%22/%3E%3Cpath%20d%3D%22M5.9%2013.6l1.1-.9h7.8l1.2.9%22%20fill%3D%22%23ce592c%22/%3E%3Cellipse%20cx%3D%2210.9%22%20cy%3D%2213.1%22%20rx%3D%222.7%22%20ry%3D%22.3%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23ce592c%22%20opacity%3D%22.5%22/%3E%3Cpath%20d%3D%22M20.6%2026.1l-2.9-11.3a1.71%201.71%200%2000-1.6-1.2H5.699999999999999a1.69%201.69%200%2000-1.5%201.3l-3.1%2011.3a.61.61%200%2000.3.7l1.1.4a.61.61%200%2000.7-.3l2.7-6.7.2%2016.8h3.6l.6-9.3a.47.47%200%2001.44-.5h.06c.4%200%20.4.2.5.5l.6%209.3h3.6L15.7%2020.3l2.5%206.6a.52.52%200%2000.66.31l1.2-.4a.57.57%200%2000.5-.7z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M7%2013.6l3.9%206.7%203.9-6.7%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Ccircle%20cx%3D%2210.9%22%20cy%3D%227%22%20r%3D%225.9%22%20fill%3D%22%23fdbf2d%22/%3E%3C/svg%3E"
                                            aria-label="Street View Pegman Control"
                                            style={{
                                              height: "30px",
                                              width: "30px",
                                              position: "absolute",
                                              transform:
                                                "translate(-50%, -50%)",
                                              pointerEvents: "none",
                                            }}
                                          />
                                          <img
                                            src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2038%22%3E%3Cpath%20d%3D%22M22%2026.6l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3l-2.5-6.6-.2%2016.8h-9.4L6.6%2021l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7z%22%20fill%3D%22%23333%22%20fill-opacity%3D%22.2%22/%3E%26quot%3B%3C/svg%3E"
                                            aria-label="Pegman is on top of the Map"
                                            style={{
                                              display: "none",
                                              height: "30px",
                                              width: "30px",
                                              position: "absolute",
                                              transform:
                                                "translate(-50%, -50%)",
                                              pointerEvents: "none",
                                            }}
                                          />
                                          <img
                                            src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2040%2050%22%3E%3Cpath%20d%3D%22M34-30.4l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3L28.4-36l-.2%2016.8h-9.4L18.6-36l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7zM34%2029.6l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3L28.4%2024l-.2%2016.8h-9.4L18.6%2024l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7z%22%20fill%3D%22%23333%22%20fill-opacity%3D%22.2%22/%3E%3Cpath%20d%3D%22M15.4%2038.8h-4a1.64%201.64%200%2001-1.4-1.1l-3.1-8a.9.9%200%2001-.5.1l-1.4.1a1.62%201.62%200%2001-1.6-1.4L2.3%2015.4l1.6-1.3a6.87%206.87%200%2001-3-4.6A7.14%207.14%200%20012%204a7.6%207.6%200%20014.7-3.1A7.14%207.14%200%200112.2%202a7.28%207.28%200%20012.3%209.6l2.1-.1.1%201c0%20.2.1.5.1.8a2.41%202.41%200%20011%201s1.9%203.2%202.8%204.9c.7%201.2%202.1%204.2%202.8%205.9a2.1%202.1%200%2001-.8%202.6l-.6.4a1.63%201.63%200%2001-1.5.2l-.6-.3a8.93%208.93%200%2000.5%201.3%207.91%207.91%200%20001.8%202.6l.6.3v4.6l-4.5-.1a7.32%207.32%200%2001-2.5-1.5l-.4%203.6zm-10-19.2l3.5%209.8%202.9%207.5h1.6V35l-1.9-9.4%203.1%205.4a8.24%208.24%200%20003.8%203.8h2.1v-1.4a14%2014%200%2001-2.2-3.1%2044.55%2044.55%200%2001-2.2-8l-1.3-6.3%203.2%205.6c.6%201.1%202.1%203.6%202.8%204.9l.6-.4c-.8-1.6-2.1-4.6-2.8-5.8-.9-1.7-2.8-4.9-2.8-4.9a.54.54%200%2000-.4-.3l-.7-.1-.1-.7a4.33%204.33%200%2000-.1-.5l-5.3.3%202.2-1.9a4.3%204.3%200%2000.9-1%205.17%205.17%200%2000.8-4%205.67%205.67%200%2000-2.2-3.4%205.09%205.09%200%2000-4-.8%205.67%205.67%200%2000-3.4%202.2%205.17%205.17%200%2000-.8%204%205.67%205.67%200%20002.2%203.4%203.13%203.13%200%20001%20.5l1.6.6-3.2%202.6%201%2011.5h.4l-.3-8.2z%22%20fill%3D%22%23333%22/%3E%3Cpath%20d%3D%22M3.35%2015.9l1.1%2012.5a.39.39%200%2000.36.42h.14l1.4-.1a.66.66%200%2000.5-.4l-.2-3.8-3.3-8.6z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M5.2%2028.8l1.1-.1a.66.66%200%2000.5-.4l-.2-3.8-1.2-3.1z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3Cpath%20d%3D%22M21.4%2035.7l-3.8-1.2-2.7-7.8L12%2015.5l3.4-2.9c.2%202.4%202.2%2014.1%203.7%2017.1%200%200%201.3%202.6%202.3%203.1v2.9m-8.4-8.1l-2-.3%202.5%2010.1.9.4v-2.9%22%20fill%3D%22%23e5892b%22/%3E%3Cpath%20d%3D%22M17.8%2025.4c-.4-1.5-.7-3.1-1.1-4.8-.1-.4-.1-.7-.2-1.1l-1.1-2-1.7-1.6s.9%205%202.4%207.1a19.12%2019.12%200%20001.7%202.4z%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Cpath%20d%3D%22M14.4%2037.8h-3a.43.43%200%2001-.4-.4l-3-7.8-1.7-4.8-3-9%208.9-.4s2.9%2011.3%204.3%2014.4c1.9%204.1%203.1%204.7%205%205.8h-3.2s-4.1-1.2-5.9-7.7a.59.59%200%2000-.6-.4.62.62%200%2000-.3.7s.5%202.4.9%203.6a34.87%2034.87%200%20002%206z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M15.4%2012.7l-3.3%202.9-8.9.4%203.3-2.7%22%20fill%3D%22%23ce592b%22/%3E%3Cpath%20d%3D%22M9.1%2021.1l1.4-6.2-5.9.5%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Cpath%20d%3D%22M12%2013.5a4.75%204.75%200%2001-2.6%201.1c-1.5.3-2.9.2-2.9%200s1.1-.6%202.7-1%22%20fill%3D%22%23bb3d19%22/%3E%3Ccircle%20cx%3D%227.92%22%20cy%3D%228.19%22%20r%3D%226.3%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M4.7%2013.6a6.21%206.21%200%20008.4-1.9v-.1a8.89%208.89%200%2001-8.4%202z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3Cpath%20d%3D%22M21.2%2027.2l.6-.4a1.09%201.09%200%2000.4-1.3c-.7-1.5-2.1-4.6-2.8-5.8-.9-1.7-2.8-4.9-2.8-4.9a1.6%201.6%200%2000-2.17-.65l-.23.15a1.68%201.68%200%2000-.4%202.1s2.3%203.9%203.1%205.3c.6%201%202.1%203.7%202.9%205.1a.94.94%200%20001.24.49l.16-.09z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M19.4%2019.8c-.9-1.7-2.8-4.9-2.8-4.9a1.6%201.6%200%2000-2.17-.65l-.23.15-.3.3c1.1%201.5%202.9%203.8%203.9%205.4%201.1%201.8%202.9%205%203.8%206.7l.1-.1a1.09%201.09%200%2000.4-1.3%2057.67%2057.67%200%2000-2.7-5.6z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3C/svg%3E"
                                            aria-label="Street View Pegman Control"
                                            style={{
                                              display: "none",
                                              height: "40px",
                                              width: "40px",
                                              position: "absolute",
                                              transform:
                                                "translate(-60%, -45%)",
                                              pointerEvents: "none",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="gmnoprint"
                                        controlwidth={40}
                                        controlheight={81}
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "72px",
                                        }}
                                      >
                                        <div
                                          draggable="false"
                                          style={{
                                            userSelect: "none",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            borderRadius: "2px",
                                            cursor: "pointer",
                                            backgroundColor:
                                              "rgb(255, 255, 255)",
                                            width: "40px",
                                            height: "81px",
                                          }}
                                        >
                                          <button
                                            draggable="false"
                                            aria-label="Zoom in"
                                            title="Zoom in"
                                            type="button"
                                            className="gm-control-active"
                                            style={{
                                              background: "none",
                                              display: "block",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              overflow: "hidden",
                                              width: "40px",
                                              height: "40px",
                                              top: "0px",
                                              left: "0px",
                                            }}
                                          >
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E"
                                              alt=""
                                              style={{
                                                height: "18px",
                                                width: "18px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E"
                                              alt=""
                                              style={{
                                                height: "18px",
                                                width: "18px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E"
                                              alt=""
                                              style={{
                                                height: "18px",
                                                width: "18px",
                                              }}
                                            />
                                          </button>
                                          <div
                                            style={{
                                              position: "relative",
                                              overflow: "hidden",
                                              width: "30px",
                                              height: "1px",
                                              margin: "0px 5px",
                                              backgroundColor:
                                                "rgb(230, 230, 230)",
                                              top: "0px",
                                            }}
                                          />
                                          <button
                                            draggable="false"
                                            aria-label="Zoom out"
                                            title="Zoom out"
                                            type="button"
                                            className="gm-control-active"
                                            style={{
                                              background: "none",
                                              display: "block",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              overflow: "hidden",
                                              width: "40px",
                                              height: "40px",
                                              top: "0px",
                                              left: "0px",
                                            }}
                                          >
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E"
                                              alt=""
                                              style={{
                                                height: "18px",
                                                width: "18px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E"
                                              alt=""
                                              style={{
                                                height: "18px",
                                                width: "18px",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E"
                                              alt=""
                                              style={{
                                                height: "18px",
                                                width: "18px",
                                              }}
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div
                                      style={{
                                        marginLeft: "5px",
                                        marginRight: "5px",
                                        zIndex: 1000000,
                                        position: "absolute",
                                        left: "0px",
                                        bottom: "0px",
                                      }}
                                    >
                                      <a
                                        target="_blank"
                                        rel="noopener"
                                        href="https://maps.google.com/maps?ll=21.7679,78.8718&z=13&t=m&hl=en-US&gl=US&mapclient=apiv3"
                                        title="Open this area in Google Maps (opens a new window)"
                                        style={{
                                          position: "static",
                                          overflow: "visible",
                                          float: "none",
                                          display: "inline",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "66px",
                                            height: "26px",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <img
                                            alt=""
                                            src="https://maps.gstatic.com/mapfiles/api-3/images/google4_hdpi.png"
                                            draggable="false"
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              width: "66px",
                                              height: "26px",
                                              userSelect: "none",
                                              border: "0px",
                                              padding: "0px",
                                              margin: "0px",
                                            }}
                                          />
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div />
                                  <div>
                                    <div
                                      className="gmnoprint"
                                      style={{
                                        zIndex: 1000001,
                                        position: "absolute",
                                        right: "253px",
                                        bottom: "0px",
                                      }}
                                    >
                                      <div
                                        draggable="false"
                                        className="gm-style-cc"
                                        style={{
                                          userSelect: "none",
                                          height: "14px",
                                          lineHeight: "14px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            opacity: "0.7",
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                          }}
                                        >
                                          <div style={{ width: "1px" }} />
                                          <div
                                            style={{
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              width: "auto",
                                              height: "100%",
                                              marginLeft: "1px",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            position: "relative",
                                            paddingRight: "6px",
                                            paddingLeft: "6px",
                                            boxSizing: "border-box",
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "10px",
                                            color: "rgb(0, 0, 0)",
                                            whiteSpace: "nowrap",
                                            direction: "ltr",
                                            textAlign: "right",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                          }}
                                        >
                                          <button
                                            draggable="false"
                                            aria-label="Keyboard shortcuts"
                                            title="Keyboard shortcuts"
                                            type="button"
                                            style={{
                                              background: "none",
                                              display: "inline-block",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              color: "rgb(0, 0, 0)",
                                              fontFamily: "inherit",
                                              lineHeight: "normal",
                                            }}
                                          >
                                            Keyboard shortcuts
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="gmnoprint"
                                      style={{
                                        zIndex: 1000001,
                                        position: "absolute",
                                        right: "166px",
                                        bottom: "0px",
                                        width: "87px",
                                      }}
                                    >
                                      <div
                                        draggable="false"
                                        className="gm-style-cc"
                                        style={{
                                          userSelect: "none",
                                          height: "14px",
                                          lineHeight: "14px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            opacity: "0.7",
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                          }}
                                        >
                                          <div style={{ width: "1px" }} />
                                          <div
                                            style={{
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              width: "auto",
                                              height: "100%",
                                              marginLeft: "1px",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            position: "relative",
                                            paddingRight: "6px",
                                            paddingLeft: "6px",
                                            boxSizing: "border-box",
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "10px",
                                            color: "rgb(0, 0, 0)",
                                            whiteSpace: "nowrap",
                                            direction: "ltr",
                                            textAlign: "right",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                          }}
                                        >
                                          <button
                                            draggable="false"
                                            aria-label="Map Data"
                                            title="Map Data"
                                            type="button"
                                            style={{
                                              background: "none",
                                              display: "none",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              color: "rgb(0, 0, 0)",
                                              fontFamily: "inherit",
                                              lineHeight: "normal",
                                            }}
                                          >
                                            Map Data
                                          </button>
                                          <span>CopyRight © Zambet 2022</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="gmnoprint gm-style-cc"
                                      draggable="false"
                                      style={{
                                        zIndex: 1000001,
                                        userSelect: "none",
                                        height: "14px",
                                        lineHeight: "14px",
                                        position: "absolute",
                                        right: "95px",
                                        bottom: "0px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          opacity: "0.7",
                                          width: "100%",
                                          height: "100%",
                                          position: "absolute",
                                        }}
                                      >
                                        <div style={{ width: "1px" }} />
                                        <div
                                          style={{
                                            backgroundColor:
                                              "rgb(245, 245, 245)",
                                            width: "auto",
                                            height: "100%",
                                            marginLeft: "1px",
                                          }}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          position: "relative",
                                          paddingRight: "6px",
                                          paddingLeft: "6px",
                                          boxSizing: "border-box",
                                          fontFamily:
                                            "Roboto, Arial, sans-serif",
                                          fontSize: "10px",
                                          color: "rgb(0, 0, 0)",
                                          whiteSpace: "nowrap",
                                          direction: "ltr",
                                          textAlign: "right",
                                          verticalAlign: "middle",
                                          display: "inline-block",
                                        }}
                                      >
                                        <a
                                          href="https://www.google.com/intl/en-US_US/help/terms_maps.html"
                                          target="_blank"
                                          rel="noopener"
                                          style={{
                                            textDecoration: "none",
                                            cursor: "pointer",
                                            color: "rgb(0, 0, 0)",
                                          }}
                                        >
                                          Terms of Use
                                        </a>
                                      </div>
                                    </div>
                                    <div
                                      draggable="false"
                                      className="gm-style-cc"
                                      style={{
                                        userSelect: "none",
                                        height: "14px",
                                        lineHeight: "14px",
                                        position: "absolute",
                                        right: "0px",
                                        bottom: "0px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          opacity: "0.7",
                                          width: "100%",
                                          height: "100%",
                                          position: "absolute",
                                        }}
                                      >
                                        <div style={{ width: "1px" }} />
                                        <div
                                          style={{
                                            backgroundColor:
                                              "rgb(245, 245, 245)",
                                            width: "auto",
                                            height: "100%",
                                            marginLeft: "1px",
                                          }}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          position: "relative",
                                          paddingRight: "6px",
                                          paddingLeft: "6px",
                                          boxSizing: "border-box",
                                          fontFamily:
                                            "Roboto, Arial, sans-serif",
                                          fontSize: "10px",
                                          color: "rgb(0, 0, 0)",
                                          whiteSpace: "nowrap",
                                          direction: "ltr",
                                          textAlign: "right",
                                          verticalAlign: "middle",
                                          display: "inline-block",
                                        }}
                                      >
                                        <a
                                          target="_blank"
                                          rel="noopener"
                                          title="Report errors in the road map or imagery to Google"
                                          dir="ltr"
                                          href="https://www.google.com/maps/@21.7679,78.8718,13z/data=!10m1!1e1!12b1?source=apiv3&rapsrc=apiv3"
                                          style={{
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "10px",
                                            color: "rgb(0, 0, 0)",
                                            textDecoration: "none",
                                            position: "relative",
                                          }}
                                        >
                                          Report a map error
                                        </a>
                                      </div>
                                    </div>
                                    <div
                                      className="gmnoscreen"
                                      style={{
                                        position: "absolute",
                                        right: "0px",
                                        bottom: "0px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily:
                                            "Roboto, Arial, sans-serif",
                                          fontSize: "11px",
                                          color: "rgb(0, 0, 0)",
                                          direction: "ltr",
                                          textAlign: "right",
                                          backgroundColor: "rgb(245, 245, 245)",
                                        }}
                                      >
                                        CopyRight © Zambet 2022
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          {/* <div
                            className="form-check"
                            style={{ paddingLeft: "1.25rem" }}
                          >
                            <input
                              type="checkbox"
                              name="save_address"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                              style={{ paddingLeft: "1.09rem" }}
                            >
                              Save this address
                            </label>
                          </div> */}
                          <input
                            type="hidden"
                            id="latitude"
                            name="latitude"
                            className="form-control d-inline"
                            placeholder="Ex : -94.22213"
                            defaultValue="21.7679"
                            required
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="longitude"
                            className="form-control"
                            placeholder="Ex : 103.344322"
                            id="longitude"
                            defaultValue="78.8718"
                            required
                            readOnly
                          />
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ display: "none" }}
                            id="address_submit"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
            <form id="delivery-form">
              <div className="card-body" style={{ padding: "0!important" }}>
                <ul className="list-group">
                  <li
                    className="list-group-item mb-2 mt-2"
                    onclick="anotherAddress()"
                  >
                    <input
                      type="radio"
                      name="shipping_method_id"
                      id="sh-0"
                      defaultValue={0}
                      // data-toggle="collapse"
                      // data-target="#collapseThree"
                      defaultChecked
                    />
                    <span
                      className="checkmark"
                      style={{ marginRight: "10px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline"
                      // data-toggle="collapse"
                      // data-target="#collapseThree"
                    >
                      Delivery Info
                    </button>
                    <div id="accordion">
                      <div
                        id="collapseThree"
                        className="collapse show"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Delivery Date
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              name="Delivery_date"
                              value={orderDetails.Delivery_date}
                              onChange={(e) => handleInputChange(e)}
                            />
                            {!!orderDetails?.errors?.Delivery_date && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.Delivery_date}
                              </small>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Delivery Time Slot
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              name="delivery_time_slot"
                              className="form-control"
                              onChange={(e) => handleInputChange(e)}
                            >
                              <option value="" selected disabled>
                                Select Delivery Time Slot
                              </option>
                              {[
                                {
                                  name: "09-12",
                                  value: "09-12",
                                },
                                {
                                  name: "12-15",
                                  value: "12-15",
                                },
                                {
                                  name: "15-18",
                                  value: "15-18",
                                },
                                {
                                  name: "18-23",
                                  value: "18-23",
                                },
                              ].map((item) => (
                                <option value={item.value}>{item.name}</option>
                              ))}
                            </select>
                            {!!orderDetails?.errors?.delivery_time_slot && (
                              <small style={{ color: "red" }}>
                                {orderDetails?.errors?.delivery_time_slot}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
            {/* <div style={{ display: "none" }}>
              <h2 className="h4 pb-3 mb-2 mt-5">Choose billing address</h2>
              <form method="post" action id="billing-address-form">
                <div className="form-check" style={{ paddingLeft: "1.25rem" }}>
                  <input
                    type="checkbox"
                    id="same_as_shipping_address"
                    onclick="hide_billingAddress()"
                    name="same_as_shipping_address"
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label"
                    style={{ paddingLeft: "1.09rem" }}
                  >
                    Same as shipping address
                  </label>
                </div>
                <div
                  id="hide_billing_address"
                  className="card-body"
                  style={{ padding: "0!important" }}
                >
                  <ul className="list-group">
                    <li
                      className="list-group-item mb-2 mt-2"
                      onclick="billingAddress()"
                    >
                      <input
                        type="radio"
                        name="billing_method_id"
                        id="bh-0"
                        defaultValue={0}
                        // data-toggle="collapse"
                        // data-target="#billing_model"
                        defaultChecked
                      />
                      <span
                        className="checkmark"
                        style={{ marginRight: "10px" }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline"
                        // data-toggle="collapse"
                        // data-target="#billing_model"
                      >
                        Another Address
                      </button>
                      <div id="accordion">
                        <div
                          id="billing_model"
                          className="collapse show"
                          aria-labelledby="headingThree"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Contact person name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="billing_contact_person_name"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Phone
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="billing_phone"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Address Type
                              </label>
                              <select
                                className="form-control"
                                name="billing_address_type"
                              >
                                <option value="permanent">Permanent</option>
                                <option value="home">Home</option>
                                <option value="others">Others</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                City<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="billing_city"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Zip code
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="billing_zip"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Address<span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                className="form-control"
                                id="billing_address"
                                type="billing_text"
                                name="billing_address"
                                required
                                defaultValue={""}
                              />
                            </div>
                            <div className="form-group">
                              <div
                                style={{
                                  height: "200px",
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                                id="location_map_canvas_billing"
                              >
                                <div
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
                                    top: "0px",
                                    left: "0px",
                                    backgroundColor: "rgb(229, 227, 223)",
                                  }}
                                >
                                  <div
                                    className="gm-style"
                                    style={{
                                      position: "absolute",
                                      zIndex: 0,
                                      left: "0px",
                                      top: "0px",
                                      height: "100%",
                                      width: "100%",
                                      padding: "0px",
                                      borderWidth: "0px",
                                      margin: "0px",
                                    }}
                                  >
                                    <div>
                                      <button
                                        draggable="false"
                                        aria-label="Keyboard shortcuts"
                                        title="Keyboard shortcuts"
                                        type="button"
                                        style={{
                                          background: "none transparent",
                                          display: "block",
                                          border: "none",
                                          margin: "0px",
                                          padding: "0px",
                                          textTransform: "none",
                                          appearance: "none",
                                          position: "absolute",
                                          cursor: "pointer",
                                          userSelect: "none",
                                          zIndex: 1000002,
                                          left: "-100000px",
                                          top: "-100000px",
                                        }}
                                      />
                                    </div>
                                    <div
                                      tabIndex={0}
                                      aria-label="Map"
                                      aria-roledescription="map"
                                      role="group"
                                      style={{
                                        position: "absolute",
                                        zIndex: 0,
                                        left: "0px",
                                        top: "0px",
                                        height: "100%",
                                        width: "100%",
                                        padding: "0px",
                                        borderWidth: "0px",
                                        margin: "0px",
                                        cursor:
                                          'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                                        touchAction: "pan-x pan-y",
                                      }}
                                    >
                                      <div
                                        style={{
                                          zIndex: 1,
                                          position: "absolute",
                                          left: "50%",
                                          top: "50%",
                                          width: "100%",
                                          transform: "translate(0px, 0px)",
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 100,
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              zIndex: 0,
                                            }}
                                          >
                                            <div
                                              style={{
                                                position: "absolute",
                                                zIndex: 987,
                                                transform:
                                                  "matrix(1, 0, 0, 1, -198, -75)",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "256px",
                                                  top: "0px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "0px",
                                                  top: "0px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "0px",
                                                  top: "-256px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "256px",
                                                  top: "-256px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "512px",
                                                  top: "-256px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "512px",
                                                  top: "0px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "-256px",
                                                  top: "0px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "-256px",
                                                  top: "-256px",
                                                  width: "256px",
                                                  height: "256px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "256px",
                                                    height: "256px",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 101,
                                            width: "100%",
                                          }}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 102,
                                            width: "100%",
                                          }}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 103,
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              zIndex: -1,
                                            }}
                                          >
                                            <div
                                              style={{
                                                position: "absolute",
                                                zIndex: 987,
                                                transform:
                                                  "matrix(1, 0, 0, 1, -198, -75)",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "256px",
                                                  top: "0px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "0px",
                                                  top: "0px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "0px",
                                                  top: "-256px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "256px",
                                                  top: "-256px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "512px",
                                                  top: "-256px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "512px",
                                                  top: "0px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "-256px",
                                                  top: "0px",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  overflow: "hidden",
                                                  position: "absolute",
                                                  left: "-256px",
                                                  top: "-256px",
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              width: "27px",
                                              height: "43px",
                                              overflow: "hidden",
                                              position: "absolute",
                                              left: "-14px",
                                              top: "-43px",
                                              zIndex: 0,
                                            }}
                                          >
                                            <img
                                              alt=""
                                              src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
                                              draggable="false"
                                              style={{
                                                position: "absolute",
                                                left: "0px",
                                                top: "0px",
                                                width: "27px",
                                                height: "43px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                                maxWidth: "none",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            zIndex: 0,
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              zIndex: 987,
                                              transform:
                                                "matrix(1, 0, 0, 1, -198, -75)",
                                            }}
                                          >
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "256px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5891!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=30413"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "0px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5890!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=13259"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "0px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5890!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=112823"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "256px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5891!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=129977"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "512px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5892!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=16060"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "512px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5892!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=47567"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "-256px",
                                                top: "0px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5889!3i3588!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=130425"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                position: "absolute",
                                                left: "-256px",
                                                top: "-256px",
                                                width: "256px",
                                                height: "256px",
                                                transition:
                                                  "opacity 200ms linear 0s",
                                              }}
                                            >
                                              <img
                                                draggable="false"
                                                alt=""
                                                role="presentation"
                                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i13!2i5889!3i3587!4i256!2m3!1e0!2sm!3i602332444!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyCHACZDbbx4Vf5SyeJtNtMlDIFCbA4A9rs&token=98918"
                                                style={{
                                                  width: "256px",
                                                  height: "256px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="gm-style-pbc"
                                        style={{
                                          zIndex: 2,
                                          position: "absolute",
                                          height: "100%",
                                          width: "100%",
                                          padding: "0px",
                                          borderWidth: "0px",
                                          margin: "0px",
                                          left: "0px",
                                          top: "0px",
                                          opacity: 0,
                                        }}
                                      >
                                        <p className="gm-style-pbt" />
                                      </div>
                                      <div
                                        style={{
                                          zIndex: 3,
                                          position: "absolute",
                                          height: "100%",
                                          width: "100%",
                                          padding: "0px",
                                          borderWidth: "0px",
                                          margin: "0px",
                                          left: "0px",
                                          top: "0px",
                                          touchAction: "pan-x pan-y",
                                        }}
                                      >
                                        <div
                                          style={{
                                            zIndex: 4,
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            width: "100%",
                                            transform: "translate(0px, 0px)",
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              zIndex: 104,
                                              width: "100%",
                                            }}
                                          />
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              zIndex: 105,
                                              width: "100%",
                                            }}
                                          />
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              zIndex: 106,
                                              width: "100%",
                                            }}
                                          >
                                            <div
                                              tabIndex={-1}
                                              style={{
                                                width: "27px",
                                                height: "43px",
                                                overflow: "hidden",
                                                position: "absolute",
                                                left: "-14px",
                                                top: "-43px",
                                                zIndex: 0,
                                              }}
                                            >
                                              <img
                                                alt=""
                                                src="https://maps.gstatic.com/mapfiles/transparent.png"
                                                draggable="false"
                                                useMap="#gmimap0"
                                                style={{
                                                  width: "27px",
                                                  height: "43px",
                                                  userSelect: "none",
                                                  border: "0px",
                                                  padding: "0px",
                                                  margin: "0px",
                                                  maxWidth: "none",
                                                }}
                                              />
                                              <map name="gmimap0" id="gmimap0">
                                                <area
                                                  log="miw"
                                                  coords="13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75"
                                                  shape="poly"
                                                  tabIndex={-1}
                                                  title
                                                  style={{
                                                    cursor: "pointer",
                                                    touchAction: "none",
                                                  }}
                                                />
                                              </map>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
                                              zIndex: 107,
                                              width: "100%",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <iframe
                                      aria-hidden="true"
                                      frameBorder={0}
                                      tabIndex={-1}
                                      style={{
                                        zIndex: -1,
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        top: "0px",
                                        left: "0px",
                                        border: "none",
                                      }}
                                    />
                                    <div
                                      style={{
                                        pointerEvents: "none",
                                        width: "100%",
                                        height: "100%",
                                        boxSizing: "border-box",
                                        position: "absolute",
                                        zIndex: 1000002,
                                        opacity: 0,
                                        border: "2px solid rgb(26, 115, 232)",
                                      }}
                                    />
                                    <div>
                                      <div
                                        className="gmnoprint"
                                        style={{
                                          margin: "10px",
                                          zIndex: 0,
                                          position: "absolute",
                                          cursor: "pointer",
                                          left: "0px",
                                          top: "0px",
                                        }}
                                      >
                                        <div
                                          className="gm-style-mtc"
                                          style={{
                                            float: "left",
                                            position: "relative",
                                          }}
                                        >
                                          <button
                                            draggable="false"
                                            aria-label="Show street map"
                                            title="Show street map"
                                            type="button"
                                            aria-pressed="true"
                                            style={{
                                              background:
                                                "none padding-box rgb(255, 255, 255)",
                                              display: "table-cell",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px 17px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              direction: "ltr",
                                              overflow: "hidden",
                                              textAlign: "center",
                                              height: "40px",
                                              verticalAlign: "middle",
                                              color: "rgb(0, 0, 0)",
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              fontSize: "18px",
                                              borderBottomLeftRadius: "2px",
                                              borderTopLeftRadius: "2px",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                              minWidth: "36px",
                                              fontWeight: 500,
                                            }}
                                            id="C0C97583-E0CC-4A0C-93F9-224CCC65F00A"
                                            aria-expanded="false"
                                          >
                                            Map
                                          </button>
                                          <ul
                                            role="menu"
                                            aria-labelledby="C0C97583-E0CC-4A0C-93F9-224CCC65F00A"
                                            style={{
                                              backgroundColor: "white",
                                              listStyle: "none",
                                              padding: "2px",
                                              margin: "0px",
                                              zIndex: -1,
                                              borderBottomLeftRadius: "2px",
                                              borderBottomRightRadius: "2px",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                              position: "absolute",
                                              left: "0px",
                                              top: "40px",
                                              textAlign: "left",
                                              display: "none",
                                            }}
                                          >
                                            <li
                                              tabIndex={-1}
                                              role="menuitemcheckbox"
                                              aria-label="Show street map with terrain"
                                              draggable="false"
                                              title="Show street map with terrain"
                                              aria-checked="false"
                                              style={{
                                                color: "black",
                                                fontFamily:
                                                  "Roboto, Arial, sans-serif",
                                                userSelect: "none",
                                                fontSize: "18px",
                                                backgroundColor:
                                                  "rgb(255, 255, 255)",
                                                padding: "5px 8px 5px 5px",
                                                direction: "ltr",
                                                textAlign: "left",
                                                whiteSpace: "nowrap",
                                              }}
                                            >
                                              <span>
                                                <img
                                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22/%3E%3C/svg%3E"
                                                  alt=""
                                                  style={{
                                                    height: "1em",
                                                    width: "1em",
                                                    transform:
                                                      "translateY(0.15em)",
                                                    display: "none",
                                                  }}
                                                />
                                                <img
                                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E"
                                                  alt=""
                                                  style={{
                                                    height: "1em",
                                                    width: "1em",
                                                    transform:
                                                      "translateY(0.15em)",
                                                  }}
                                                />
                                              </span>
                                              <label
                                                style={{ cursor: "inherit" }}
                                              >
                                                Terrain
                                              </label>
                                            </li>
                                          </ul>
                                        </div>
                                        <div
                                          className="gm-style-mtc"
                                          style={{
                                            float: "left",
                                            position: "relative",
                                          }}
                                        >
                                          <button
                                            draggable="false"
                                            aria-label="Show satellite imagery"
                                            title="Show satellite imagery"
                                            type="button"
                                            aria-pressed="false"
                                            style={{
                                              background:
                                                "none padding-box rgb(255, 255, 255)",
                                              display: "table-cell",
                                              border: "0px",
                                              margin: "0px",
                                              padding: "0px 17px",
                                              textTransform: "none",
                                              appearance: "none",
                                              position: "relative",
                                              cursor: "pointer",
                                              userSelect: "none",
                                              direction: "ltr",
                                              overflow: "hidden",
                                              textAlign: "center",
                                              height: "40px",
                                              verticalAlign: "middle",
                                              color: "rgb(86, 86, 86)",
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              fontSize: "18px",
                                              borderBottomRightRadius: "2px",
                                              borderTopRightRadius: "2px",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                              minWidth: "64px",
                                            }}
                                            id="26059BFD-53A9-4014-8F2B-C34D38543176"
                                            aria-expanded="false"
                                          >
                                            Satellite
                                          </button>
                                          <ul
                                            role="menu"
                                            aria-labelledby="26059BFD-53A9-4014-8F2B-C34D38543176"
                                            style={{
                                              backgroundColor: "white",
                                              listStyle: "none",
                                              padding: "2px",
                                              margin: "0px",
                                              zIndex: -1,
                                              borderBottomLeftRadius: "2px",
                                              borderBottomRightRadius: "2px",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                              position: "absolute",
                                              right: "0px",
                                              top: "40px",
                                              textAlign: "left",
                                              display: "none",
                                            }}
                                          >
                                            <li
                                              tabIndex={-1}
                                              role="menuitemcheckbox"
                                              aria-label="Show imagery with street names"
                                              draggable="false"
                                              title="Show imagery with street names"
                                              aria-checked="true"
                                              style={{
                                                color: "black",
                                                fontFamily:
                                                  "Roboto, Arial, sans-serif",
                                                userSelect: "none",
                                                fontSize: "18px",
                                                backgroundColor:
                                                  "rgb(255, 255, 255)",
                                                padding: "5px 8px 5px 5px",
                                                direction: "ltr",
                                                textAlign: "left",
                                                whiteSpace: "nowrap",
                                              }}
                                            >
                                              <span>
                                                <img
                                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22/%3E%3C/svg%3E"
                                                  alt=""
                                                  style={{
                                                    height: "1em",
                                                    width: "1em",
                                                    transform:
                                                      "translateY(0.15em)",
                                                  }}
                                                />
                                                <img
                                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E"
                                                  alt=""
                                                  style={{
                                                    height: "1em",
                                                    width: "1em",
                                                    transform:
                                                      "translateY(0.15em)",
                                                    display: "none",
                                                  }}
                                                />
                                              </span>
                                              <label
                                                style={{ cursor: "inherit" }}
                                              >
                                                Labels
                                              </label>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <input
                                        id="pac-input-billing"
                                        className="controls rounded pac-target-input"
                                        style={{
                                          height: "3em",
                                          width: "fit-content",
                                          zIndex: 0,
                                          position: "absolute",
                                          top: "0px",
                                          left: "307px",
                                        }}
                                        title="Search your location here"
                                        type="text"
                                        placeholder="Search here"
                                        autoComplete="off"
                                      />
                                    </div>
                                    <div />
                                    <div />
                                    <div>
                                      <button
                                        draggable="false"
                                        aria-label="Toggle fullscreen view"
                                        title="Toggle fullscreen view"
                                        type="button"
                                        className="gm-control-active gm-fullscreen-control"
                                        style={{
                                          background: "none rgb(255, 255, 255)",
                                          border: "0px",
                                          margin: "10px",
                                          padding: "0px",
                                          textTransform: "none",
                                          appearance: "none",
                                          position: "absolute",
                                          cursor: "pointer",
                                          userSelect: "none",
                                          borderRadius: "2px",
                                          height: "40px",
                                          width: "40px",
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                          overflow: "hidden",
                                          top: "0px",
                                          right: "0px",
                                        }}
                                      >
                                        <img
                                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E"
                                          alt=""
                                          style={{
                                            height: "18px",
                                            width: "18px",
                                          }}
                                        />
                                        <img
                                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E"
                                          alt=""
                                          style={{
                                            height: "18px",
                                            width: "18px",
                                          }}
                                        />
                                        <img
                                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E"
                                          alt=""
                                          style={{
                                            height: "18px",
                                            width: "18px",
                                          }}
                                        />
                                      </button>
                                    </div>
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                    <div>
                                      <div
                                        className="gmnoprint gm-bundled-control gm-bundled-control-on-bottom"
                                        draggable="false"
                                        controlwidth={40}
                                        controlheight={153}
                                        style={{
                                          margin: "10px",
                                          userSelect: "none",
                                          position: "absolute",
                                          bottom: "167px",
                                          right: "40px",
                                        }}
                                      >
                                        <div
                                          className="gmnoprint"
                                          controlwidth={40}
                                          controlheight={40}
                                          style={{
                                            display: "none",
                                            position: "absolute",
                                          }}
                                        >
                                          <div
                                            style={{
                                              backgroundColor:
                                                "rgb(255, 255, 255)",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                              borderRadius: "2px",
                                              width: "40px",
                                              height: "40px",
                                            }}
                                          >
                                            <button
                                              draggable="false"
                                              aria-label="Rotate map clockwise"
                                              title="Rotate map clockwise"
                                              type="button"
                                              className="gm-control-active"
                                              style={{
                                                background: "none",
                                                display: "none",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                left: "0px",
                                                top: "0px",
                                                overflow: "hidden",
                                                width: "40px",
                                                height: "40px",
                                              }}
                                            >
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                                style={{
                                                  width: "20px",
                                                  height: "20px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                                style={{
                                                  width: "20px",
                                                  height: "20px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                                style={{
                                                  width: "20px",
                                                  height: "20px",
                                                }}
                                              />
                                            </button>
                                            <div
                                              style={{
                                                position: "relative",
                                                overflow: "hidden",
                                                width: "30px",
                                                height: "1px",
                                                margin: "0px 5px",
                                                backgroundColor:
                                                  "rgb(230, 230, 230)",
                                                display: "none",
                                              }}
                                            />
                                            <button
                                              draggable="false"
                                              aria-label="Rotate map counterclockwise"
                                              title="Rotate map counterclockwise"
                                              type="button"
                                              className="gm-control-active"
                                              style={{
                                                background: "none",
                                                display: "none",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                left: "0px",
                                                top: "0px",
                                                overflow: "hidden",
                                                width: "40px",
                                                height: "40px",
                                                transform: "scaleX(-1)",
                                              }}
                                            >
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                                style={{
                                                  width: "20px",
                                                  height: "20px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                                style={{
                                                  width: "20px",
                                                  height: "20px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E"
                                                style={{
                                                  width: "20px",
                                                  height: "20px",
                                                }}
                                              />
                                            </button>
                                            <div
                                              style={{
                                                position: "relative",
                                                overflow: "hidden",
                                                width: "30px",
                                                height: "1px",
                                                margin: "0px 5px",
                                                backgroundColor:
                                                  "rgb(230, 230, 230)",
                                                display: "none",
                                              }}
                                            />
                                            <button
                                              draggable="false"
                                              aria-label="Tilt map"
                                              title="Tilt map"
                                              type="button"
                                              className="gm-tilt gm-control-active"
                                              style={{
                                                background: "none",
                                                display: "block",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                top: "0px",
                                                left: "0px",
                                                overflow: "hidden",
                                                width: "40px",
                                                height: "40px",
                                              }}
                                            >
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E"
                                                style={{ width: "18px" }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E"
                                                style={{ width: "18px" }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E"
                                                style={{ width: "18px" }}
                                              />
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="gm-svpc"
                                          dir="ltr"
                                          title="Drag Pegman onto the map to open Street View"
                                          controlwidth={40}
                                          controlheight={40}
                                          style={{
                                            backgroundColor:
                                              "rgb(255, 255, 255)",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "40px",
                                            cursor:
                                              'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                                            touchAction: "none",
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "50%",
                                              top: "50%",
                                            }}
                                          />
                                          <div
                                            style={{
                                              position: "absolute",
                                              left: "50%",
                                              top: "50%",
                                            }}
                                          >
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2023%2038%22%3E%3Cpath%20d%3D%22M16.6%2038.1h-5.5l-.2-2.9-.2%202.9h-5.5L5%2025.3l-.8%202a1.53%201.53%200%2001-1.9.9l-1.2-.4a1.58%201.58%200%2001-1-1.9v-.1c.3-.9%203.1-11.2%203.1-11.2a2.66%202.66%200%20012.3-2l.6-.5a6.93%206.93%200%20014.7-12%206.8%206.8%200%20014.9%202%207%207%200%20012%204.9%206.65%206.65%200%2001-2.2%205l.7.5a2.78%202.78%200%20012.4%202s2.9%2011.2%202.9%2011.3a1.53%201.53%200%2001-.9%201.9l-1.3.4a1.63%201.63%200%2001-1.9-.9l-.7-1.8-.1%2012.7zm-3.6-2h1.7L14.9%2020.3l1.9-.3%202.4%206.3.3-.1c-.2-.8-.8-3.2-2.8-10.9a.63.63%200%2000-.6-.5h-.6l-1.1-.9h-1.9l-.3-2a4.83%204.83%200%20003.5-4.7A4.78%204.78%200%200011%202.3H10.8a4.9%204.9%200%2000-1.4%209.6l-.3%202h-1.9l-1%20.9h-.6a.74.74%200%2000-.6.5c-2%207.5-2.7%2010-3%2010.9l.3.1L4.8%2020l1.9.3.2%2015.8h1.6l.6-8.4a1.52%201.52%200%20011.5-1.4%201.5%201.5%200%20011.5%201.4l.9%208.4zm-10.9-9.6zm17.5-.1z%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23333%22%20opacity%3D%22.7%22/%3E%3Cpath%20d%3D%22M5.9%2013.6l1.1-.9h7.8l1.2.9%22%20fill%3D%22%23ce592c%22/%3E%3Cellipse%20cx%3D%2210.9%22%20cy%3D%2213.1%22%20rx%3D%222.7%22%20ry%3D%22.3%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23ce592c%22%20opacity%3D%22.5%22/%3E%3Cpath%20d%3D%22M20.6%2026.1l-2.9-11.3a1.71%201.71%200%2000-1.6-1.2H5.699999999999999a1.69%201.69%200%2000-1.5%201.3l-3.1%2011.3a.61.61%200%2000.3.7l1.1.4a.61.61%200%2000.7-.3l2.7-6.7.2%2016.8h3.6l.6-9.3a.47.47%200%2001.44-.5h.06c.4%200%20.4.2.5.5l.6%209.3h3.6L15.7%2020.3l2.5%206.6a.52.52%200%2000.66.31l1.2-.4a.57.57%200%2000.5-.7z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M7%2013.6l3.9%206.7%203.9-6.7%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Ccircle%20cx%3D%2210.9%22%20cy%3D%227%22%20r%3D%225.9%22%20fill%3D%22%23fdbf2d%22/%3E%3C/svg%3E"
                                              aria-label="Street View Pegman Control"
                                              style={{
                                                height: "30px",
                                                width: "30px",
                                                position: "absolute",
                                                transform:
                                                  "translate(-50%, -50%)",
                                                pointerEvents: "none",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2038%22%3E%3Cpath%20d%3D%22M22%2026.6l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3l-2.5-6.6-.2%2016.8h-9.4L6.6%2021l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7z%22%20fill%3D%22%23333%22%20fill-opacity%3D%22.2%22/%3E%26quot%3B%3C/svg%3E"
                                              aria-label="Pegman is on top of the Map"
                                              style={{
                                                display: "none",
                                                height: "30px",
                                                width: "30px",
                                                position: "absolute",
                                                transform:
                                                  "translate(-50%, -50%)",
                                                pointerEvents: "none",
                                              }}
                                            />
                                            <img
                                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2040%2050%22%3E%3Cpath%20d%3D%22M34-30.4l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3L28.4-36l-.2%2016.8h-9.4L18.6-36l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7zM34%2029.6l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3L28.4%2024l-.2%2016.8h-9.4L18.6%2024l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7z%22%20fill%3D%22%23333%22%20fill-opacity%3D%22.2%22/%3E%3Cpath%20d%3D%22M15.4%2038.8h-4a1.64%201.64%200%2001-1.4-1.1l-3.1-8a.9.9%200%2001-.5.1l-1.4.1a1.62%201.62%200%2001-1.6-1.4L2.3%2015.4l1.6-1.3a6.87%206.87%200%2001-3-4.6A7.14%207.14%200%20012%204a7.6%207.6%200%20014.7-3.1A7.14%207.14%200%200112.2%202a7.28%207.28%200%20012.3%209.6l2.1-.1.1%201c0%20.2.1.5.1.8a2.41%202.41%200%20011%201s1.9%203.2%202.8%204.9c.7%201.2%202.1%204.2%202.8%205.9a2.1%202.1%200%2001-.8%202.6l-.6.4a1.63%201.63%200%2001-1.5.2l-.6-.3a8.93%208.93%200%2000.5%201.3%207.91%207.91%200%20001.8%202.6l.6.3v4.6l-4.5-.1a7.32%207.32%200%2001-2.5-1.5l-.4%203.6zm-10-19.2l3.5%209.8%202.9%207.5h1.6V35l-1.9-9.4%203.1%205.4a8.24%208.24%200%20003.8%203.8h2.1v-1.4a14%2014%200%2001-2.2-3.1%2044.55%2044.55%200%2001-2.2-8l-1.3-6.3%203.2%205.6c.6%201.1%202.1%203.6%202.8%204.9l.6-.4c-.8-1.6-2.1-4.6-2.8-5.8-.9-1.7-2.8-4.9-2.8-4.9a.54.54%200%2000-.4-.3l-.7-.1-.1-.7a4.33%204.33%200%2000-.1-.5l-5.3.3%202.2-1.9a4.3%204.3%200%2000.9-1%205.17%205.17%200%2000.8-4%205.67%205.67%200%2000-2.2-3.4%205.09%205.09%200%2000-4-.8%205.67%205.67%200%2000-3.4%202.2%205.17%205.17%200%2000-.8%204%205.67%205.67%200%20002.2%203.4%203.13%203.13%200%20001%20.5l1.6.6-3.2%202.6%201%2011.5h.4l-.3-8.2z%22%20fill%3D%22%23333%22/%3E%3Cpath%20d%3D%22M3.35%2015.9l1.1%2012.5a.39.39%200%2000.36.42h.14l1.4-.1a.66.66%200%2000.5-.4l-.2-3.8-3.3-8.6z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M5.2%2028.8l1.1-.1a.66.66%200%2000.5-.4l-.2-3.8-1.2-3.1z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3Cpath%20d%3D%22M21.4%2035.7l-3.8-1.2-2.7-7.8L12%2015.5l3.4-2.9c.2%202.4%202.2%2014.1%203.7%2017.1%200%200%201.3%202.6%202.3%203.1v2.9m-8.4-8.1l-2-.3%202.5%2010.1.9.4v-2.9%22%20fill%3D%22%23e5892b%22/%3E%3Cpath%20d%3D%22M17.8%2025.4c-.4-1.5-.7-3.1-1.1-4.8-.1-.4-.1-.7-.2-1.1l-1.1-2-1.7-1.6s.9%205%202.4%207.1a19.12%2019.12%200%20001.7%202.4z%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Cpath%20d%3D%22M14.4%2037.8h-3a.43.43%200%2001-.4-.4l-3-7.8-1.7-4.8-3-9%208.9-.4s2.9%2011.3%204.3%2014.4c1.9%204.1%203.1%204.7%205%205.8h-3.2s-4.1-1.2-5.9-7.7a.59.59%200%2000-.6-.4.62.62%200%2000-.3.7s.5%202.4.9%203.6a34.87%2034.87%200%20002%206z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M15.4%2012.7l-3.3%202.9-8.9.4%203.3-2.7%22%20fill%3D%22%23ce592b%22/%3E%3Cpath%20d%3D%22M9.1%2021.1l1.4-6.2-5.9.5%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Cpath%20d%3D%22M12%2013.5a4.75%204.75%200%2001-2.6%201.1c-1.5.3-2.9.2-2.9%200s1.1-.6%202.7-1%22%20fill%3D%22%23bb3d19%22/%3E%3Ccircle%20cx%3D%227.92%22%20cy%3D%228.19%22%20r%3D%226.3%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M4.7%2013.6a6.21%206.21%200%20008.4-1.9v-.1a8.89%208.89%200%2001-8.4%202z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3Cpath%20d%3D%22M21.2%2027.2l.6-.4a1.09%201.09%200%2000.4-1.3c-.7-1.5-2.1-4.6-2.8-5.8-.9-1.7-2.8-4.9-2.8-4.9a1.6%201.6%200%2000-2.17-.65l-.23.15a1.68%201.68%200%2000-.4%202.1s2.3%203.9%203.1%205.3c.6%201%202.1%203.7%202.9%205.1a.94.94%200%20001.24.49l.16-.09z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M19.4%2019.8c-.9-1.7-2.8-4.9-2.8-4.9a1.6%201.6%200%2000-2.17-.65l-.23.15-.3.3c1.1%201.5%202.9%203.8%203.9%205.4%201.1%201.8%202.9%205%203.8%206.7l.1-.1a1.09%201.09%200%2000.4-1.3%2057.67%2057.67%200%2000-2.7-5.6z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3C/svg%3E"
                                              aria-label="Street View Pegman Control"
                                              style={{
                                                display: "none",
                                                height: "40px",
                                                width: "40px",
                                                position: "absolute",
                                                transform:
                                                  "translate(-60%, -45%)",
                                                pointerEvents: "none",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="gmnoprint"
                                          controlwidth={40}
                                          controlheight={81}
                                          style={{
                                            position: "absolute",
                                            left: "0px",
                                            top: "72px",
                                          }}
                                        >
                                          <div
                                            draggable="false"
                                            style={{
                                              userSelect: "none",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                              borderRadius: "2px",
                                              cursor: "pointer",
                                              backgroundColor:
                                                "rgb(255, 255, 255)",
                                              width: "40px",
                                              height: "81px",
                                            }}
                                          >
                                            <button
                                              draggable="false"
                                              aria-label="Zoom in"
                                              title="Zoom in"
                                              type="button"
                                              className="gm-control-active"
                                              style={{
                                                background: "none",
                                                display: "block",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                overflow: "hidden",
                                                width: "40px",
                                                height: "40px",
                                                top: "0px",
                                                left: "0px",
                                              }}
                                            >
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                            </button>
                                            <div
                                              style={{
                                                position: "relative",
                                                overflow: "hidden",
                                                width: "30px",
                                                height: "1px",
                                                margin: "0px 5px",
                                                backgroundColor:
                                                  "rgb(230, 230, 230)",
                                                top: "0px",
                                              }}
                                            />
                                            <button
                                              draggable="false"
                                              aria-label="Zoom out"
                                              title="Zoom out"
                                              type="button"
                                              className="gm-control-active"
                                              style={{
                                                background: "none",
                                                display: "block",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                overflow: "hidden",
                                                width: "40px",
                                                height: "40px",
                                                top: "0px",
                                                left: "0px",
                                              }}
                                            >
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                              <img
                                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E"
                                                alt=""
                                                style={{
                                                  height: "18px",
                                                  width: "18px",
                                                }}
                                              />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div
                                        style={{
                                          marginLeft: "5px",
                                          marginRight: "5px",
                                          zIndex: 1000000,
                                          position: "absolute",
                                          left: "0px",
                                          bottom: "0px",
                                        }}
                                      >
                                        <a
                                          target="_blank"
                                          rel="noopener"
                                          href="https://maps.google.com/maps?ll=21.7679,78.8718&z=13&t=m&hl=en-US&gl=US&mapclient=apiv3"
                                          title="Open this area in Google Maps (opens a new window)"
                                          style={{
                                            position: "static",
                                            overflow: "visible",
                                            float: "none",
                                            display: "inline",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: "66px",
                                              height: "26px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <img
                                              alt=""
                                              src="https://maps.gstatic.com/mapfiles/api-3/images/google4_hdpi.png"
                                              draggable="false"
                                              style={{
                                                position: "absolute",
                                                left: "0px",
                                                top: "0px",
                                                width: "66px",
                                                height: "26px",
                                                userSelect: "none",
                                                border: "0px",
                                                padding: "0px",
                                                margin: "0px",
                                              }}
                                            />
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                    <div />
                                    <div>
                                      <div
                                        className="gmnoprint"
                                        style={{
                                          zIndex: 1000001,
                                          position: "absolute",
                                          right: "253px",
                                          bottom: "0px",
                                        }}
                                      >
                                        <div
                                          draggable="false"
                                          className="gm-style-cc"
                                          style={{
                                            userSelect: "none",
                                            height: "14px",
                                            lineHeight: "14px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              opacity: "0.7",
                                              width: "100%",
                                              height: "100%",
                                              position: "absolute",
                                            }}
                                          >
                                            <div style={{ width: "1px" }} />
                                            <div
                                              style={{
                                                backgroundColor:
                                                  "rgb(245, 245, 245)",
                                                width: "auto",
                                                height: "100%",
                                                marginLeft: "1px",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "relative",
                                              paddingRight: "6px",
                                              paddingLeft: "6px",
                                              boxSizing: "border-box",
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              fontSize: "10px",
                                              color: "rgb(0, 0, 0)",
                                              whiteSpace: "nowrap",
                                              direction: "ltr",
                                              textAlign: "right",
                                              verticalAlign: "middle",
                                              display: "inline-block",
                                            }}
                                          >
                                            <button
                                              draggable="false"
                                              aria-label="Keyboard shortcuts"
                                              title="Keyboard shortcuts"
                                              type="button"
                                              style={{
                                                background: "none",
                                                display: "inline-block",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                color: "rgb(0, 0, 0)",
                                                fontFamily: "inherit",
                                                lineHeight: "normal",
                                              }}
                                            >
                                              Keyboard shortcuts
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="gmnoprint"
                                        style={{
                                          zIndex: 1000001,
                                          position: "absolute",
                                          right: "166px",
                                          bottom: "0px",
                                          width: "87px",
                                        }}
                                      >
                                        <div
                                          draggable="false"
                                          className="gm-style-cc"
                                          style={{
                                            userSelect: "none",
                                            height: "14px",
                                            lineHeight: "14px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              opacity: "0.7",
                                              width: "100%",
                                              height: "100%",
                                              position: "absolute",
                                            }}
                                          >
                                            <div style={{ width: "1px" }} />
                                            <div
                                              style={{
                                                backgroundColor:
                                                  "rgb(245, 245, 245)",
                                                width: "auto",
                                                height: "100%",
                                                marginLeft: "1px",
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              position: "relative",
                                              paddingRight: "6px",
                                              paddingLeft: "6px",
                                              boxSizing: "border-box",
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              fontSize: "10px",
                                              color: "rgb(0, 0, 0)",
                                              whiteSpace: "nowrap",
                                              direction: "ltr",
                                              textAlign: "right",
                                              verticalAlign: "middle",
                                              display: "inline-block",
                                            }}
                                          >
                                            <button
                                              draggable="false"
                                              aria-label="Map Data"
                                              title="Map Data"
                                              type="button"
                                              style={{
                                                background: "none",
                                                display: "none",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                textTransform: "none",
                                                appearance: "none",
                                                position: "relative",
                                                cursor: "pointer",
                                                userSelect: "none",
                                                color: "rgb(0, 0, 0)",
                                                fontFamily: "inherit",
                                                lineHeight: "normal",
                                              }}
                                            >
                                              Map Data
                                            </button>
                                            <span>CopyRight © Zambet 2022</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="gmnoprint gm-style-cc"
                                        draggable="false"
                                        style={{
                                          zIndex: 1000001,
                                          userSelect: "none",
                                          height: "14px",
                                          lineHeight: "14px",
                                          position: "absolute",
                                          right: "95px",
                                          bottom: "0px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            opacity: "0.7",
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                          }}
                                        >
                                          <div style={{ width: "1px" }} />
                                          <div
                                            style={{
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              width: "auto",
                                              height: "100%",
                                              marginLeft: "1px",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            position: "relative",
                                            paddingRight: "6px",
                                            paddingLeft: "6px",
                                            boxSizing: "border-box",
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "10px",
                                            color: "rgb(0, 0, 0)",
                                            whiteSpace: "nowrap",
                                            direction: "ltr",
                                            textAlign: "right",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                          }}
                                        >
                                          <a
                                            href="https://www.google.com/intl/en-US_US/help/terms_maps.html"
                                            target="_blank"
                                            rel="noopener"
                                            style={{
                                              textDecoration: "none",
                                              cursor: "pointer",
                                              color: "rgb(0, 0, 0)",
                                            }}
                                          >
                                            Terms of Use
                                          </a>
                                        </div>
                                      </div>
                                      <div
                                        draggable="false"
                                        className="gm-style-cc"
                                        style={{
                                          userSelect: "none",
                                          height: "14px",
                                          lineHeight: "14px",
                                          position: "absolute",
                                          right: "0px",
                                          bottom: "0px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            opacity: "0.7",
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                          }}
                                        >
                                          <div style={{ width: "1px" }} />
                                          <div
                                            style={{
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              width: "auto",
                                              height: "100%",
                                              marginLeft: "1px",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            position: "relative",
                                            paddingRight: "6px",
                                            paddingLeft: "6px",
                                            boxSizing: "border-box",
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "10px",
                                            color: "rgb(0, 0, 0)",
                                            whiteSpace: "nowrap",
                                            direction: "ltr",
                                            textAlign: "right",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                          }}
                                        >
                                          <a
                                            target="_blank"
                                            rel="noopener"
                                            title="Report errors in the road map or imagery to Google"
                                            dir="ltr"
                                            href="https://www.google.com/maps/@21.7679,78.8718,13z/data=!10m1!1e1!12b1?source=apiv3&rapsrc=apiv3"
                                            style={{
                                              fontFamily:
                                                "Roboto, Arial, sans-serif",
                                              fontSize: "10px",
                                              color: "rgb(0, 0, 0)",
                                              textDecoration: "none",
                                              position: "relative",
                                            }}
                                          >
                                            Report a map error
                                          </a>
                                        </div>
                                      </div>
                                      <div
                                        className="gmnoscreen"
                                        style={{
                                          position: "absolute",
                                          right: "0px",
                                          bottom: "0px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontFamily:
                                              "Roboto, Arial, sans-serif",
                                            fontSize: "11px",
                                            color: "rgb(0, 0, 0)",
                                            direction: "ltr",
                                            textAlign: "right",
                                            backgroundColor:
                                              "rgb(245, 245, 245)",
                                          }}
                                        >
                                            CopyRight © Zambet 2022
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="form-check"
                              style={{ paddingLeft: "1.25rem" }}
                            >
                              <input
                                type="checkbox"
                                name="save_address_billing"
                                className="form-check-input"
                                id="save_address_billing"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="save_address_billing"
                                style={{ paddingLeft: "1.09rem" }}
                              >
                                Save this address
                              </label>
                            </div>
                            <input
                              type="hidden"
                              id="billing_latitude"
                              name="billing_latitude"
                              className="form-control d-inline"
                              placeholder="Ex : -94.22213"
                              defaultValue="21.7679"
                              required
                              readOnly
                            />
                            <input
                              type="hidden"
                              name="billing_longitude"
                              className="form-control"
                              placeholder="Ex : 103.344322"
                              id="billing_longitude"
                              defaultValue="78.8718"
                              required
                              readOnly
                            />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ display: "none" }}
                              id="address_submit"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            </div> */}
            <div className="row">
              <div className="col-6">
                <a className="btn btn-secondary btn-block" href="/shop-cart">
                  <i className="czi-arrow-left mt-sm-0 mx-1" />
                  <span className="d-none d-sm-inline">Shop cart</span>
                  <span className="d-inline d-sm-none">Shop cart</span>
                </a>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handleCheckout()}
                  // href="javascript:"
                  // onclick="proceed_to_next()"
                  // state={{ ...orderDetails }}
                >
                  <span className="d-none d-sm-inline">Proceed payment</span>
                  <span className="d-inline d-sm-none">Next</span>
                  <i className="czi-arrow-right mt-sm-0 mx-1" />
                </button>
              </div>
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
              <span className="cart_title">Delivery Charge</span>
              <span className="cart_value">{`₹ ${orderDetails.delivery_charge}`}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="cart_title">Discount on product</span>
              <span className="cart_value">{`- ₹ ${orderDetails.discount}`}</span>
            </div>
            {/* <div className="mt-2">
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
            </div> */}
            <hr className="mt-2 mb-2" />
            <div className="d-flex justify-content-between">
              <span className="cart_title">Total</span>
              <span className="cart_value">{`₹ ${orderDetails.orderTotal}`}</span>
            </div>
          </div>
          <div className="container mt-2">
            <div className="row p-0">
              <div className="col-md-3 p-0 text-center mobile-padding">
                <img
                  className="order-summery-footer-image"
                  src="assets/front-end/png/delivery.png"
                  alt=""
                />
                <div className="deal-title">3 Days free delivery </div>
              </div>
              <div className="col-md-3 p-0 text-center">
                <img
                  className="order-summery-footer-image"
                  src="assets/front-end/png/money.png"
                  alt=""
                />
                <div className="deal-title">Money back guarantee</div>
              </div>
              <div className="col-md-3 p-0 text-center">
                <img
                  className="order-summery-footer-image"
                  src="assets/front-end/png/Genuine.png"
                  alt=""
                />
                <div className="deal-title">100% Genuine Product</div>
              </div>
              <div className="col-md-3 p-0 text-center">
                <img
                  className="order-summery-footer-image"
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
  );
}

export default CheckoutDetails;
