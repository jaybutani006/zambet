import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSubSubCategoryEdit() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();

  const [mainState, setMainState] = useState({
    selected: {
      ...location?.state,
    },
    options: [
      { name: 1, value: 1 },
      { name: 2, value: 2 },
      { name: 3, value: 3 },
      { name: 4, value: 4 },
      { name: 5, value: 5 },
      { name: 6, value: 6 },
      { name: 7, value: 7 },
      { name: 8, value: 8 },
      { name: 9, value: 9 },
      { name: 10, value: 10 },
    ],
    resAllCategories: [],
  });

  const apiGetAllCategories = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_icon") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: e.target.files[0],
        },
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    }
  };

  const handleUpdateSubSubCategoryInfo = (e) => {
    e.preventDefault();
    console.log(mainState.selected);

    if (!mainState.selected.subsubcategory_name) {
      alert("Sub Sub Category Name can't be empty");
      return;
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      params: {
        _id: mainState.selected._id,
      },
      data: JSON.stringify({
        subsubcategory_name: mainState.selected.subsubcategory_name,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        alert("Successfully Edited");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetAllCategories();
  }, []);

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
              Category
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Category form</div>
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
                    {/* <li className="nav-item">
                      <a className="nav-link lang_link " href="#" id="sa-link">
                        Arabic(SA)
                      </a>
                    </li> */}
                  </ul>
                  <div className="row">
                    <div className="col-12 col-md-5">
                      <div className="form-group  lang_form" id="en-form">
                        <label className="input-label">Name (EN)</label>
                        <input
                          type="text"
                          name="subsubcategory_name"
                          className="form-control"
                          placeholder="New Category"
                          value={mainState?.selected?.subsubcategory_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-3">
                      <div className="form-group">
                        <label className="input-label" htmlFor="priority">
                          Choose Category
                        </label>
                        <select
                          className="form-control"
                          name="category_id"
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {mainState?.resAllCategories.length
                            ? mainState.resAllCategories.map((item) => (
                                <option
                                  value={item._id}
                                  selected={
                                    item._id ===
                                    mainState?.selected?.category_id
                                  }
                                >
                                  {item.category_name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div> */}
                    {/* <div className="col-12 col-md-3">
                      <div className="form-group">
                        <label className="input-label" htmlFor="priority">
                          Choose priority number
                        </label>
                        <select
                          className="form-control"
                          name="sequence"
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {mainState?.options.length
                            ? mainState.options.map((item) => (
                                <option
                                  value={item.value}
                                  selected={
                                    item.value === mainState?.selected?.sequence
                                  }
                                >
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div> */}
                    {/* Image Section */}
                    {/* <div className="col-12 col-md-4 from_part_2">
                      <label>Image</label>
                      <small style={{ color: "red" }}>( Ratio 1:1 )</small>
                      <div
                        className="custom-file"
                        style={{ textAlign: "left" }}
                      >
                        <input
                          type="file"
                          name="category_icon"
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
                    </div>
                    <div className="col-12 from_part_2">
                      <div className="form-group">
                        <hr />
                        <center>
                          <img
                            style={{
                              width: "20%",
                              border: "1px solid",
                              borderRadius: "10px",
                            }}
                            id="viewer"
                            src={mainState?.selected?.category_icon_url || ""}
                            alt=""
                          />
                        </center>
                      </div>
                    </div> */}
                  </div>
                  <button
                    onClick={handleUpdateSubSubCategoryInfo}
                    className="btn btn-primary float-right"
                  >
                    Update
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

export default AdminSubSubCategoryEdit;
