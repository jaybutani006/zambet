import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import productImage from "assets/productImage.jpg";
import { defaultAPIErrorHandler } from "api/api";

function AdminDeliveryManAdd() {
  const [state, dispatch] = useContext(Context);
  const [mainState, setMainState] = useState({});

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
        alert("Phone number must be of 10 digits");
        return;
      }
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const apiAddNewDeliveryBoy = () => {};

  const checkValidation = () => {
    if (!mainState.fullname) {
      alert("Full name can't be empty");
      return false;
    } else if (!mainState.email) {
      alert("Email can't be empty");
      return false;
    } else if (!mainState.password) {
      alert("Password can't be empty");
      return false;
    } else if (!mainState.contect_no) {
      alert("Phone can't be empty");
      return false;
    } else if (!mainState.gender) {
      alert("Gender can't be empty");
      return false;
    } else if (!mainState.dob) {
      alert("Date Of Birth can't be empty");
      return false;
    } else if (!mainState.address) {
      alert("Address can't be empty");
      return false;
    } else if (!mainState.city) {
      alert("City can't be empty");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = checkValidation();

    if (isValid) {
      const formData = new FormData();
      const newState = { ...mainState };

      formData.append("fullname", newState.fullname);
      formData.append("email", newState.email);
      formData.append("password", newState.password);
      formData.append("contect_no", newState.contect_no);
      formData.append("gender", newState.gender);
      formData.append("dob", newState.dob);
      formData.append("address", newState.address);
      formData.append("city", newState.city);
      formData.append("db_proof", newState.db_proof?.[0]);
      formData.append("db_photo", newState.db_photo?.[0]);

      axios({
        method: "post",
        url: process.env.REACT_APP_BASEURL + "/api/deliveryboy",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
        data: formData,
      })
        .then((response) => {
          console.log(response.data);
          alert("Successfully Added Delivery Boy");
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    }
  };

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="align-items-center">
                  <div className="col-sm mb-2 mb-sm-0">
                    <h1 className="page-header-title">
                      <i className="tio-add-circle-outlined" /> Add New
                      Deliveryman
                    </h1>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-12 col-12">
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
                          placeholder="Full Name"
                          onChange={handleInputChange}
                          value={mainState.fullname}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="l_name"
                          className="form-control"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div> */}
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
                          name="email"
                          className="form-control"
                          placeholder="Ex : ex@example.com"
                          onChange={handleInputChange}
                          value={mainState.email}
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
                          onChange={handleInputChange}
                          value={mainState.contect_no}
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
                          value={mainState.dob}
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
                          <option value={""} selected disabled>{`--Select--`}</option>
                          {[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" },
                          ].map((item) => (
                            <option value={item.value}>{item.name}</option>
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
                          onChange={handleInputChange}
                          value={mainState.identity_type}
                        >
                          <option value="" selected disabled>--Select--</option>
                          <option value="passport">Passport</option>
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
                          onChange={handleInputChange}
                          value={mainState.identity_number}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Identity Image
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
                                data-spartanindexi={0}
                                src={
                                  mainState?.db_photoimageURLObj || productImage
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                                className="spartan_image_placeholder"
                              />{" "}
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
                                data-spartanindeximage={0}
                              />
                              <input
                                className="form-control spartan_image_input"
                                accept="image/*"
                                data-spartanindexinput={0}
                                style={{ display: "none" }}
                                name="db_photo"
                                type="file"
                                onChange={handleInputChange}
                              />
                            </label>{" "}
                          </div>
                          {/* </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-12">
                      <div className="form-group">
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
                          onChange={handleInputChange}
                          value={mainState.password}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-12">
                      <div className="form-group">
                        <label>Deliveryman Image</label>
                        <small style={{ color: "red" }}>* ( Ratio 1:1 )</small>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="db_proof"
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
                      </div>
                      <div className="text-center">
                        <img
                          style={{
                            width: "auto",
                            border: "1px solid",
                            borderRadius: "10px",
                            maxHeight: "200px",
                          }}
                          id="viewer"
                          src={mainState?.db_proofimageURLObj || productImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = productImage;
                          }}
                          alt="Product thumbnail"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
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

export default AdminDeliveryManAdd;
