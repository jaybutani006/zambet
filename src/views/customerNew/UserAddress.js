import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function UserAddress() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);

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
        defaultAPIErrorHandler(error);
        // alert("Failed to Delete the Address");
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
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
        // alert("Could not fetch delivery addresses");
      });
  };

  useEffect(() => {
    if (!state.isUserLoggedIn) {
      navigate("/customer/auth/login", { replace: true });
      return;
    }
    getUserAddressesAPI();
  }, []);

  return (
    <>
      <div
        className="modal fade rtl"
        style={{ textAlign: "left" }}
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="modal-title font-name ">Add new address</h5>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="rYJydBe2cb7GUfjpnDdJsBk9BlL7vQqolwVns1a9"
                />
                <div className="row">
                  <div className="col-md-6" style={{ display: "flex" }}>
                    <ul className="donate-now">
                      <li>
                        <input
                          type="radio"
                          id="a25"
                          name="addressAs"
                          defaultValue="permanent"
                        />
                        <label htmlFor="a25" className="component">
                          Permanent
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="a50"
                          name="addressAs"
                          defaultValue="home"
                        />
                        <label htmlFor="a50" className="component">
                          Home
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="a75"
                          name="addressAs"
                          defaultValue="office"
                          defaultChecked="checked"
                        />
                        <label htmlFor="a75" className="component">
                          Office
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6" style={{ display: "flex" }}>
                    <ul className="donate-now">
                      <li>
                        <input
                          type="radio"
                          name="is_billing"
                          id="b25"
                          defaultValue={0}
                        />
                        <label htmlFor="b25" className="billing_component">
                          Shipping
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="is_billing"
                          id="b50"
                          defaultValue={1}
                        />
                        <label htmlFor="b50" className="billing_component">
                          Billing
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tab-content">
                  <div id="home" className="container tab-pane active">
                    <br />
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Contact person name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="firstName">Phone</label>
                        <input
                          className="form-control"
                          type="text"
                          id="phone"
                          name="phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="address-city">City</label>
                        <input
                          className="form-control"
                          type="text"
                          id="address-city"
                          name="city"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="zip">Zip code</label>
                        <input
                          className="form-control"
                          type="number"
                          id="zip"
                          name="zip"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="address">Address</label>
                        <textarea
                          className="form-control"
                          id="address"
                          type="text"
                          name="address"
                          required
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          id="pac-input"
                          className="controls rounded pac-target-input"
                          style={{ height: "3em", width: "fit-content" }}
                          title="Search your location here"
                          type="text"
                          placeholder="Search here"
                          autoComplete="off"
                        />
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
                            <div style={{ overflow: "hidden" }} />
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
                              <div
                                tabIndex={0}
                                aria-label="Map"
                                aria-roledescription="map"
                                role="region"
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
                                            left: "0px",
                                            top: "0px",
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
                                  />
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
                                      <span
                                        id="2EA6D5FF-616B-4EF9-8696-1C57406C92F2"
                                        style={{ display: "none" }}
                                      >
                                        To navigate, press the arrow keys.
                                      </span>
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
                                              display: "inline",
                                              position: "absolute",
                                              left: "0px",
                                              top: "0px",
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
                                <div
                                  className="gm-style-moc"
                                  style={{
                                    zIndex: 4,
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
                                  <p className="gm-style-mot" />
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
                            </div>
                          </div>
                        </div>
                      </div>
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
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Informations{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container rtl" style={{ textAlign: "left" }}>
        <div className="row mt-2">
          <div className="col-lg-3 col-md-3 col-sm-12" />
        </div>
      </div>
      <div
        className="container pb-5 mb-2 mb-md-4 mt-3 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n        font-family: sans-serif;\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    label {\n        font-size: 16px;\n    }\n\n    .divider-role {\n        border-bottom: 1px solid whitesmoke;\n    }\n\n    .sidebarL h3:hover + .divider-role {\n        border-bottom: 3px solid #f58300    !important;\n        transition: .2s ease-in-out;\n    }\n\n    .price_sidebar {\n        padding: 20px;\n    }\n\n    @media (max-width: 600px) {\n\n        .sidebar_heading h1 {\n            text-align: center;\n            color: aliceblue;\n            padding-bottom: 17px;\n            font-size: 19px;\n        }\n\n        .sidebarR {\n            padding: 24px;\n        }\n\n        .price_sidebar {\n            padding: 20px;\n        }\n    }\n\n",
            }}
          />
          <div className="sidebarR col-lg-3 col-md-3">
            <div
              className="price_sidebar rounded-lg box-shadow-sm"
              id="shop-sidebar"
              style={{ marginBottom: "-10px", background: "white" }}
            >
              <div className="box-shadow-sm"></div>
              <div className="pb-0" style={{ paddingTop: "12px" }}>
                <div className="sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link to="/account-oder ">My order</Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className="sidebarL">
                  <h3
                    className="widget-title btnF "
                    style={{ fontWeight: 700 }}
                  >
                    <Link to="/wishlists"> Wish List </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className="" to="/user-account">
                      Profile Info
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className="active-menu" to="/account-address">
                      Address{" "}
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <section className="col-lg-9 col-md-9">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 className="h3  mb-0 float-left headerTitle">ADDRESSES</h1>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <button
                  type="submit"
                  className="btn btn-primary float-right"
                  onClick={() => navigate("/account-address-store")}
                  // data-toggle="modal"
                  // data-target="#exampleModal"
                  id="add_new_address"
                >
                  Add new address
                </button>
              </div>
            </div>
            <div className="row">
              {!deliveryAddresses?.length && (
                <div className="col-12">
                  <center>
                    <ClipLoader
                      // color={"#ffffff"}
                      // loading={!!camps}
                      loading
                      // cssOverride={override}
                      // size={150}
                    />
                  </center>
                </div>
              )}
              {!!deliveryAddresses.length &&
                deliveryAddresses.map((item, index) => (
                  <section className="col-lg-6 col-md-6 mb-4 mt-3">
                    <div
                      className="card"
                      style={{ textTransform: "capitalize" }}
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
                        {/* <div>
                          <span> office Address (Billing address) </span>
                        </div> */}
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
                            href="javascript:"
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
                        <div className="modal-dialog  modal-lg" role="document">
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
                                    <label htmlFor="zip_code">Zip code</label>
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
                                    <label htmlFor="own_country">Country</label>
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
                                    <label htmlFor="own_address">Address</label>
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
                            <strong>Address :</strong> {item.delivery_address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default UserAddress;
