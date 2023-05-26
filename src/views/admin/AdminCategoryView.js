import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminCategoryView() {
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
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files,
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 1)].map((item) =>
            URL.createObjectURL(item)
          );

          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files?.slice(0, 1),
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));

          window.alert("At Max 1 Images are allowed");
        }
      }
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
    } else if (!mainState.selected.category_icon instanceof FileList) {
      alert("category_icon is Invalid File");
      return;
    }
    console.log(mainState.selected);

    const formData = new FormData();
    formData.append("category_name", mainState.selected.category_name);
    formData.append("sequence", mainState.selected.sequence);
    formData.append("gst", "123456");
    formData.append("photo", mainState.selected.category_icon?.[0]);

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
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

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Categories" },
      headers: {
        Authorization: state.adminToken,
      },
      responseType: "blob",
    })
      .then((response) => {
        console.log("Successfully Exported");
        console.log(response.headers?.filename);
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "unknown";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
        }
        link.setAttribute("download", fileName);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
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
                        Name (EN)
                      </label>
                      <input
                        type="text"
                        name="category_name"
                        className="form-control"
                        placeholder="New Category"
                        onChange={handleInputChange}
                        value={mainState.selected.category_name}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        Choose Sequence number
                        {/* <span>
                          <i
                            className="tio-info-outined"
                            title="The lowest number will get the highest priority"
                          />
                        </span> */}
                      </label>
                      <select
                        className="form-control"
                        name="sequence"
                        onChange={handleInputChange}
                      >
                        <option value="" selected disabled>
                          ---Select---
                        </option>
                        {
                          Array.from({ length: Number(mainState?.allCategories?.length) + 1 || 0 + 1 }, (_, i) => i + 1).map(item => (
                            <option
                              value={item}
                              selected={
                                item === mainState.selected.sequence
                              }
                            >
                              {item}
                            </option>
                          ))
                        }
                        {/* {mainState.options.length
                          ? mainState.options.map((item) => (
                            <option
                              value={item.value}
                              selected={
                                item.value === mainState.selected.sequence
                              }
                            >
                              {item.value}
                            </option>
                          ))
                          : null} */}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 from_part_2">
                    <label>Image</label>
                    <small style={{ color: "red" }}>* ( Ratio 3:1 )</small>
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
                            width: "20%",
                            border: "1px solid",
                            borderRadius: "10px",
                          }}
                          src={
                            mainState?.selected?.category_iconimageURLObj ||
                            productImage
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = productImage;
                          }}
                          id="viewer"
                          alt="image"
                        />
                      </center>
                    </div>
                  </div>
                </div>
                <hr />
                <button onClick={handleAddCategory} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }} id="cate-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-sm-6 col-md-6">
                    <h5>
                      Category table{" "}
                      <span style={{ color: "red" }}>
                        ({mainState?.allCategories?.length || "0"})
                      </span>
                    </h5>
                  </div>
                  <div
                    className="col-12 col-sm-6 col-md-4"
                    style={{ width: "30vw" }}
                  >
                    <form>
                      <div className="input-group input-group-merge input-group-flush">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="tio-search" />
                          </div>
                        </div>
                        <input
                          type="search"
                          name="search"
                          className="form-control"
                          placeholder="Search here"
                          onChange={handleInputChange}
                          value={mainState?.selected?.search}
                        />
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="btn btn-primary"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-header">
                <div className="row flex-between justify-content-between flex-grow-1">
                  {/* <div className="col-12 col-md-4">
                    <form action method="GET">
                      <div className="input-group input-group-merge input-group-flush">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="tio-search" />
                          </div>
                        </div>
                        <input
                          id="datatableSearch_"
                          type="search"
                          name="search"
                          className="form-control"
                          placeholder="Search orders"
                          aria-label="Search orders"
                       
                        />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div> */}
                  <div className="col-12 col-md-5 mt-2 mt-sm-0">
                    <form id="form-data">
                      <div className="row">
                        {/* <div className="col-12 col-sm-4">
                          <input
                            type="date"
                            name="from"
                            id="from_date"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 col-sm-4 mt-2 mt-sm-0">
                          <input
                            type="date"
                            name="to"
                            id="to_date"
                            className="form-control"
                          />
                        </div> */}
                        {/* <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                          <select
                            name="qty_ordr_sort"
                            className="form-control"
                          >
                            <option value="default">Default Filter</option>
                            {[].map((item) => (
                              <option value="">{item}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => e.preventDefault()}
                            // type="submit"
                            className="btn btn-primary float-right float-sm-none"
                            onclick="formUrlChange(this)"
                          >
                            Filter
                          </button>
                        </div> */}
                        <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleExport();
                            }}
                            className="btn btn-success float-right float-sm-none"
                          >
                            Export
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="float-right">
                      <label> Inhouse orders only : </label>
                      <label className="switch ml-3">
                        <input
                          type="checkbox"
                          className="status"
                          onclick="filter_order()"
                          defaultChecked
                        />
                        <span className="slider round" />
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="card-body p-0">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <table
                    style={{ textAlign: "left" }}
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "100px" }}>Category ID</th>
                        <th>Name</th>
                        {/* <th>Slug</th> */}
                        <th>Icon</th>
                        <th>Priority</th>
                        {/* <th>Home status</th> */}
                        <th className="text-center" style={{ width: "15%" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (
                        <tr>
                          <td colSpan={"100%"}>
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
                      {!!mainState?.allCategories?.length &&
                        mainState.allCategories.map((item, index) => (
                          <tr>
                            <td className="text-center">
                              {item?._id || "..."}
                            </td>
                            <td>{item?.category_name || "..."}</td>
                            {/* <td>{item?.slug || "..."}</td> */}
                            <td>
                              <img
                                width={64}
                                src={item?.category_icon || dummyCategoryLogo}
                                onError={({ currentTarget }) => {
                                  currentTarget.src = dummyCategoryLogo;
                                }}
                              />
                            </td>
                            <td>{item?.sequence || "..."}</td>
                            {/* <td> */}
                            {/* <div
                                style={{
                                  padding: "10px",
                                  border: "1px solid",
                                  cursor: "pointer",
                                }}
                                onclick="location.href='/admin/category/status/116/1'"
                              >
                                <span
                                  className="legend-indicator bg-danger"
                                  style={{
                                    marginLeft: 0,
                                    marginRight: ".4375rem",
                                  }}
                                />
                                Disabled
                              </div> */}
                            {/* <div
                            style={{
                              padding: "10px",
                              border: "1px solid",
                              cursor: "pointer",
                            }}
                            onclick="location.href='/admin/category/status/114/0'"
                          >
                            <span
                              className="legend-indicator bg-success"
                              style={{
                                marginLeft: 0,
                                marginRight: ".4375rem",
                              }}
                            />
                            Active
                          </div> */}
                            {/* </td> */}
                            <td>
                              <Link
                                className="btn btn-primary btn-sm edit"
                                style={{ cursor: "pointer" }}
                                to={"/admin/category/edit/" + item._id}
                                state={item}
                              >
                                <i className="tio-edit" />
                                Edit
                              </Link>
                              <Link
                                to=""
                                className="btn btn-danger btn-sm delete"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleDeleteCategory(e, index, item._id)
                                }
                              >
                                <i className="tio-add-to-trash" />
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.allCategories?.length && (
                <div className="text-center p-4">
                  <img
                    className="mb-3"
                    src="/assets/back-end/svg/illustrations/sorry.svg"
                    alt="Image Description"
                    style={{ width: "7rem" }}
                  />
                  <p className="mb-0">No data to show</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminCategoryView;
