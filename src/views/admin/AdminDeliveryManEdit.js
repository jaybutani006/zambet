import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import productImage from "assets/productImage.jpg";
import { defaultAPIErrorHandler } from "api/api";

function AdminDeliveryManEdit() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const [mainState, setMainState] = useState({
    ...location?.state,
    // dob: location?.state?.dob.split("-").reverse().join("-"),
    db_proof_url: location?.state?.db_proof,
    db_photo_url: location?.state?.db_photo,
    email_address: location?.state?.users_data?.[0]?.email_address
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "db_photo" || name === "db_proof") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            // selected: {
            //   ...prev.selected,
            [name]: e.target.files,
            [`${name}imageURLObj`]: imageURLObj,
            // },
            // selectedError: {
            //   ...prev.selectedError,
            //   [name]: !e.target.files ? "Invalid or Empty" : "",
            // },
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 1)].map((item) =>
            URL.createObjectURL(item)
          );

          setMainState((prev) => ({
            ...prev,
            // selected: {
            //   ...prev.selected,
            [name]: e.target.files?.slice(0, 1),
            [`${name}imageURLObj`]: imageURLObj,
            // },
            // selectedError: {
            //   ...prev.selectedError,
            //   [name]: !e.target.files ? "Invalid or Empty" : "",
            // },
          }));

          window.alert("At Max 1 Images are allowed");
        }
      }
    } else if (name === "contect_no") {
      if (value.toString().length > 10) {
        alert("Phone Number must be of 10 digits");
        return;
      }
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      console.log(name, value)
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkValidation = () => {
    return true;
  };

  const handleUpdateDeliveryBoyInfo = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("fullname", mainState.fullname);
    formData.append("gender", mainState.gender);
    formData.append("dob", mainState.dob);
    formData.append("address", mainState.address);
    formData.append("city", mainState.city);
    formData.append("email_address", mainState.email_address);
    if (!!mainState.db_photo?.length && mainState.db_photo instanceof FileList) {
      [...mainState.db_photo]?.map(item =>
        formData.append("db_photo", item)
      )
    }
    if (!!mainState.db_proof?.length && mainState.db_proof instanceof FileList) {
      [...mainState.db_proof]?.map(item =>
        formData.append("db_proof", item)
      )
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/deliveryboy",
      params: {
        _id: mainState?._id,
      },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        alert("Successfully Update Delivery Boy Profile");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">
                <i className="tio-edit" /> Update Deliveryman
              </h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          className="form-control"
                          placeholder="New delivery-man"
                          value={mainState?.fullname}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email_address"
                          className="form-control"
                          placeholder="Ex : ex@example.com"
                          // value={mainState?.email_address}
                          value={mainState?.users_data?.[0]?.email_address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          name="contect_no"
                          className="form-control"
                          placeholder="Ex : 017********"
                          value={mainState?.users_data?.[0]?.contect_no}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">Date Of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dob"
                          onChange={handleInputChange}
                          value={mainState?.dob}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">Gender</label>
                        <select
                          name="gender"
                          className="form-control"
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled>
                            --Select--
                          </option>
                          {[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" },
                          ].map((item) => (
                            <option
                              value={item.value}
                              selected={item.value === mainState?.gender}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          onChange={handleInputChange}
                          value={mainState.address}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          onChange={handleInputChange}
                          value={mainState.city}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Identity Type
                        </label>
                        <select
                          name="identity_type"
                          className="form-control"
                          value={mainState?.identityType}
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled>--Select--</option>
                          <option value="passport" selected>
                            Passport
                          </option>
                          <option value="driving_license">
                            Driving License
                          </option>
                          <option value="nid">Nid</option>
                          <option value="company_id">Company Id</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Identity Number
                        </label>
                        <input
                          type="text"
                          name="identity_number"
                          className="form-control"
                          placeholder="Ex : DH-23434-LS"
                          value={mainState?.identityNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Identity Image Proof
                        </label>
                        <div>
                          {/* <div className="row" id="coba">
                            <div
                              className="col-2 spartan_item_wrapper"
                              data-spartanindexrow={0}
                              style={{ marginBottom: "20px" }}
                            > */}
                          <div style={{ position: "relative" }}>
                            <div
                              className="spartan_item_loader"
                              data-spartanindexloader={0}
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "120px",
                                background: "rgba(255,255,255, 0.7)",
                                zIndex: 22,
                                textAlign: "center",
                                alignItems: "center",
                                margin: "auto",
                                justifyContent: "center",
                                flexDirection: "column",
                                display: "none",
                                fontSize: "1.7em",
                                color: "#CECECE",
                              }}
                            >
                              <i className="fas fa-sync fa-spin" />
                            </div>
                            <label
                              className="file_upload"
                              style={{
                                width: "100%",
                                height: "120px",
                                border: "2px dashed #ddd",
                                borderRadius: "3px",
                                cursor: "pointer",
                                textAlign: "center",
                                overflow: "hidden",
                                padding: "5px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                margin: "auto",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <a
                                href="javascript:void(0)"
                                data-spartanindexremove={0}
                                style={{
                                  position: "absolute !important",
                                  right: "3px",
                                  top: "3px",
                                  display: "none",
                                  background: "transparent",
                                  borderRadius: "3px",
                                  width: "30px",
                                  height: "30px",
                                  lineHeight: "30px",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  color: "#ff0700",
                                }}
                                className="spartan_remove_row"
                              >
                                <i className="tio-add-to-trash" />
                              </a>
                              <img
                                style={{
                                  width: "100%",
                                  margin: "0 auto",
                                  verticalAlign: "middle",
                                }}
                                src={
                                  mainState?.db_proofimageURLObj || mainState?.db_proof || productImage
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                                className="spartan_image_placeholder"
                              />
                              <p
                                data-spartanlbldropfile={0}
                                style={{
                                  color: "#5FAAE1",
                                  display: "none",
                                  width: "auto",
                                }}
                              >
                                Drop Here
                              </p>
                              <img
                                style={{
                                  width: "100%",
                                  verticalAlign: "middle",
                                  display: "none",
                                }}
                                className="img_"
                                src={mainState?.db_proof_url || productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                              />
                              <input
                                className="form-control spartan_image_input"
                                accept="image/*"
                                data-spartanindexinput={0}
                                style={{ display: "none" }}
                                name="db_proof"
                                type="file"
                                onChange={handleInputChange}
                              />
                            </label>
                          </div>
                          {/* </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <br />
                    <hr />
                  </div>
                  {/* <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      name="password"
                      className="form-control"
                      placeholder="Ex : password"
                    />
                  </div> */}
                  <div className="form-group">
                    <label>Deliveryman Image</label>
                    <small style={{ color: "red" }}>* ( Ratio 1:1 )</small>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="db_photo"
                        id="customFileEg1"
                        className="custom-file-input"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        onChange={handleInputChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileEg1"
                      >
                        Choose File
                      </label>
                    </div>
                    <hr />
                    <center>
                      <img
                        style={{
                          height: "200px",
                          border: "1px solid",
                          borderRadius: "10px",
                        }}
                        id="viewer"
                        src={mainState?.db_photoimageURLObj || mainState?.db_photo || productImage}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = productImage;
                        }}
                        alt="delivery-man image"
                      />
                    </center>
                  </div>
                  <hr />
                  <button
                    className="btn btn-primary float-right"
                    onClick={(e) => handleUpdateDeliveryBoyInfo(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDeliveryManEdit;
