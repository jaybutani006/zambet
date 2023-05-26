import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

import GoogleMapReact from "google-map-react";
import { defaultAPIErrorHandler } from "api/api";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function UserAddressAdd() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
      // lat: 20.593683,
      // lng: 78.962883,
    },
    zoom: 1,
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);

  const initialState = {
    options: {
      countries: Country.getAllCountries().map((item) => ({
        ...item,
        label: item.name,
        value: item.isoCode,
      })),
      states: [],
      cities: [],
    },
    zip_code: "",
    city: "",
    delivery_address: "",
    contect_person_number: "",
    contect_person_name: "",
    Comment_box: "",
    country: "IN",
    state: "GJ",
    errors: {},
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contect_person_number" && value.toString().length > 10) {
      return;
    } else if (name === "zip_code" && value.toString().length > 6) {
      return;
    } else {
      setMainState((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  const handleAddUserAddress = (e) => {
    e.preventDefault();

    // Check Validation
    let isValid = true;
    let errors = {};
    if (!mainState?.contect_person_name) {
      errors.contect_person_name = "Contact Person Name can't be empty";
      isValid = false;
    }
    if (!mainState?.contect_person_number) {
      errors.contect_person_number = "Contact Person Phone can't be empty";
      isValid = false;
    }
    if (`${mainState?.contect_person_number}`?.length !== 10) {
      errors.contect_person_number =
        "Contact Person Phone must be of 10 digits";
      isValid = false;
    }
    if (!mainState?.country) {
      errors.country = "select country";
      isValid = false;
    }
    if (!mainState?.state) {
      errors.state = "select state";
      isValid = false;
    }
    if (!mainState?.city) {
      errors.city = "select city";
      isValid = false;
    }
    if (!mainState?.zip_code) {
      errors.zip_code = "zip_code cant be empty";
      isValid = false;
    }
    if (`${mainState?.zip_code}`?.length !== 6) {
      errors.zip_code = "zip_code must be of 6 digits";
      isValid = false;
    }
    if (!mainState?.delivery_address) {
      errors.delivery_address = "Delivery Address can't be empty";
      isValid = false;
    }
    setMainState((prev) => ({ ...prev, errors: errors }));
    if (!isValid) {
      return;
    }
    // Validation Ends

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/useraddress",
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        zip_code: mainState?.zip_code,
        city: mainState?.city,
        delivery_address: mainState?.delivery_address,
        contect_person_number: +mainState?.contect_person_number,
        contect_person_name: mainState?.contect_person_name,
        Comment_box: mainState?.Comment_box,
        country: mainState?.country,
        state: mainState?.state,
        is_default: mainState?.is_default,
      }),
    })
      .then((response) => {
        console.log(response.data);
        setMainState(initialState);
        alert("Successfully Added New User Address");
        navigate("/account-address");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
        // alert("Failed to Add New User Address");
      });
  };

  useEffect(() => {
    console.log(location.state);
  }, []);

  return (
    <>
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
                    <Link className="active-menu" to="/user-account">
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
                    <Link className to="/account-address">
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
          <section className="col-lg-9 mt-3 col-md-9">
            <div className="row">
              <div className="col-lg-12 col-md-12  d-flex justify-content-between overflow-hidden">
                <div className="col-md-4">
                  <h1 className="h3  mb-0 folot-left headerTitle">
                    Add New Address
                  </h1>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="col-12">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="person_name">Contact person name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="person_name"
                          name="contect_person_name"
                          value={mainState?.contect_person_name}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.contect_person_name}
                        </small>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="own_phone">Phone</label>
                        <input
                          className="form-control"
                          type="tel"
                          name="contect_person_number"
                          value={mainState?.contect_person_number}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.contect_person_number}
                        </small>
                      </div>
                    </div>
                    <div className="form-row">
                      {/* <div className="form-group col-md-6">
                        <label htmlFor="city">Country</label>
                        <select
                          className="form-control"
                          label="Country*"
                          name="country"
                          onChange={(e) => handleInputChange(e)}
                          // value={mainState?.selected?.country}
                        >
                          <option>Choose Country...</option>
                          {mainState?.options?.countries?.map((item) => (
                            <option
                              key={item.isoCode}
                              value={item?.isoCode}
                              selected={item?.isoCode == mainState?.country}
                            >
                              {item?.name || "..."}
                            </option>
                          ))}
                        </select>
                      </div> */}
                      <div className="form-group col-md-6">
                        <label htmlFor="city">State</label>
                        <select
                          className="form-control"
                          label="State*"
                          name="state"
                          onChange={(e) => handleInputChange(e)}
                          // value={mainState?.state}
                        >
                          <option>Choose State...</option>
                          {State.getStatesOfCountry(mainState?.country).map(
                            (item) => (
                              <option
                                key={item.isoCode}
                                value={item?.isoCode}
                                selected={item?.isoCode == mainState?.state}
                              >
                                {item?.name || "..."}
                              </option>
                            )
                          )}
                        </select>
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.state}
                        </small>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="zip_code">Comment Box</label>
                        <input
                          className="form-control"
                          type="text"
                          name="Comment_box"
                          value={mainState?.Comment_box}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.Comment_box}
                        </small>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="city">City</label>
                        <select
                          label="City*"
                          name="city"
                          className="form-control"
                          onChange={(e) => handleInputChange(e)}
                          // value={mainState?.selected?.city}
                        >
                          <option>Choose City...</option>
                          {City.getCitiesOfState(
                            mainState?.country,
                            mainState?.state
                          ).map((item) => (
                            <option
                              key={item.isoCode}
                              value={item?.isoCode}
                              selected={item?.isoCode == mainState?.state}
                            >
                              {item?.name || "..."}
                            </option>
                          ))}
                        </select>
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.city}
                        </small>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="zip_code">Zip code</label>
                        <input
                          className="form-control"
                          type="number"
                          name="zip_code"
                          value={mainState?.zip_code}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.zip_code}
                        </small>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="own_address">Address</label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="delivery_address"
                          value={mainState?.delivery_address}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <small
                          style={{
                            color: "red",
                          }}
                        >
                          {mainState?.errors?.delivery_address}
                        </small>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="own_address"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          {`Default : `}
                        </label>
                        <input
                          style={{
                            marginTop: "10px",
                          }}
                          type="checkbox"
                          name="is_default"
                          title="Default Address"
                          checked={mainState?.is_default}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <div style={{ height: "30vh", width: "100%" }}>
                          <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                          >
                            {/* <AnyReactComponent
                              lat={59.955413}
                              lng={30.337844}
                              text="My Marker"
                            /> */}
                          </GoogleMapReact>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        onClick={(e) => handleAddUserAddress(e)}
                        className="btn btn-primary"
                      >
                        Submit{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default UserAddressAdd;
