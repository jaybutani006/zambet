import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminBrandEdit() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();

  const [mainState, setMainState] = useState({
    ...location?.state,
    imageURLObj: [location?.state?.brand_photo],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand_photo") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            [name]: e.target.files[0],
            imageURLObj: imageURLObj,
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 1)].map((item) =>
            URL.createObjectURL(item)
          );

          setMainState((prev) => ({
            ...prev,
            [name]: e.target.files[0],
            imageURLObj: imageURLObj,
          }));

          window.alert("At Max 1 Images are allowed");
        }
      }
    } else {
      const validNumberRegex = /^[a-zA-Z0-9 ]+$/;
      console.log(3, validNumberRegex.test(value));
      if (validNumberRegex.test(value)) {
        setMainState((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else if (value === "") {
        setMainState((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleUpdateBrandInfo = (e) => {
    e.preventDefault();
    console.log(mainState);

    if (!mainState.brand_photo instanceof File) {
      alert("Invalid Brand Icon File");
      return;
    } else if (!mainState.brand_name) {
      alert("Brand Name can't be empty");
      return;
      // } else if (!mainState.sequence) {
      //   alert("Sequence No. is Invalid");
      //   return;
    } else if (!mainState._id) {
      alert("Brand Id is Invalid");
      return;
    }

    const formData = new FormData();
    formData.append("brand_photo", mainState?.brand_photo);
    formData.append("brand_name", mainState?.brand_name);

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/brand",
      params: {
        _id: mainState._id,
      },
      headers: {
        Authorization: state.adminToken,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
      },
      // data: JSON.stringify({
      //   brand_name: mainState.brand_name,
      // }),
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        alert("Successfully Edited");
      })
      .catch(function (error) {
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
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              All Brands
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Add New All Brands</div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <form>
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <a
                        className="nav-link lang_link active"
                        href="#"
                        id="en-link"
                      >
                        english(EN)
                      </a>
                    </li>
                  </ul>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group  lang_form" id="en-form">
                        <label htmlFor="name">Name (EN)</label>
                        <input
                          type="text"
                          name="brand_name"
                          className="form-control"
                          value={mainState?.brand_name || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Brand logo</label>
                        <span className="badge badge-soft-danger">
                          ( Ratio 1:1 )
                        </span>
                        <div
                          className="custom-file"
                          style={{ textAlign: "left" }}
                          required
                        >
                          <input
                            type="file"
                            name="brand_photo"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            onChange={handleInputChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileUpload"
                          >
                            Choose File
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <center>
                        <img
                          style={{ borderRadius: "10px", maxHeight: "200px" }}
                          id="viewer"
                          src={mainState?.imageURLObj || productImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = productImage;
                          }}
                          alt="banner image"
                        />
                      </center>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={handleUpdateBrandInfo}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBrandEdit;
