import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import dummyHomeBanner2 from "assets/dummyHomeBanner2.png";
import ClipLoader from "react-spinners/ClipLoader";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function SellerDealAdd() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllCategories: [],
    allCategories: [],
    selected: {
      category_name: "",
      category_icon: "",
      sequence: "",
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
  };
  const [mainState, setMainState] = useState(initialState);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "category_icon") {
      const imageURLObj = [...e.target.files].map((item) =>
        URL.createObjectURL(item)
      );
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: e.target.files[0],
          [`${name}ImageURLObj`]: imageURLObj,
        },
      }));
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        allCategories: searchFor(value, mainState.resAllCategories),
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
          allCategories: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!mainState.selected.category_name) {
      alert("category_name can't be empty");
      return;
    } else if (!mainState.selected.sequence) {
      alert("sequence can't be empty");
      return;
    } else if (!mainState.selected.category_icon instanceof File) {
      alert("category_icon is Invalid File");
      return;
    }
    console.log(mainState.selected);

    const formData = new FormData();
    formData.append("category_name", mainState.selected.category_name);
    formData.append("sequence", mainState.selected.sequence);
    formData.append("gst", "123456");
    formData.append("photo", mainState.selected.category_icon);

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {
        // "Content-Type": "application/json",
        Authorization: state.adminToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        alert("Category Added");
        apiGetAllCategories();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteCategory = (e, index, catId) => {
    if (window.confirm(`product-${index + 1}`, "Want to delete this item ?")) {
      // --------- STATIC CATEGORY REMOVAL
      // const newCategories = mainState.resAllCategories.slice();
      // newCategories.splice(index, 1);

      // setMainState((prev) => ({
      //   ...prev,
      //   resAllCategories: newCategories,
      // }));
      // console.log(index, newCategories);
      // --------- STATIC CATEGORY REMOVAL

      axios({
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/category/" + catId,
        headers: {
          Authorization: state.adminToken,
        },
      })
        .then(function (response) {
          console.log(response.data);
          apiGetAllCategories();
        })
        .catch(function (error) {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Dont Delete");
    }
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
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Deals
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Deals form</div>
              <div className="card-body" style={{ textAlign: "left" }}>
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
                  <div className="col-12 col-md-5">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="text"
                        className="form-control"
                        placeholder=""
                        onChange={handleInputChange}
                        value={mainState.selected.text}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        Type
                        <span>
                          <i
                            className="m-1 tio-info-outined"
                            title="The lowest number will get the highest priority"
                          />
                        </span>
                      </label>
                      <select
                        className="form-control"
                        name="type"
                        onChange={handleInputChange}
                      >
                        <option value="" selected disabled>
                          ---Select---
                        </option>
                        {["Lightning Deal", "Best Deal", "Deal of the day"].map(
                          (item) => (
                            <option value="">{item}</option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 from_part_2">
                    <label>Image</label>
                    <small style={{ color: "red" }}>* ( Ratio 9:16 )</small>
                    <div className="custom-file" style={{ textAlign: "left" }}>
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
                            maxWidth: "80vw",
                            maxHeight: "30vh",
                            aspectRatio: "16/9",
                            border: "1px solid",
                            borderRadius: "10px",
                          }}
                          id="viewer"
                          src={
                            mainState.selected.category_iconImageURLObj ||
                            mainState.selected.category_icon
                          }
                          // onError={({ currentTarget }) => {
                          //   currentTarget.onerror = null; // prevents looping
                          //   currentTarget.src =
                          // }}
                          alt="image"
                        />
                      </center>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  className="btn btn-primary"
                  // onClick={handleAddCategory}
                  onClick={(e) => {
                    e.preventDefault();
                    // alert("Added Successfully");
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerDealAdd;
