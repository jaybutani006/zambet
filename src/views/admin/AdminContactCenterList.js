import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminContactCenterList() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [contactCenterList, setContactCenterList] = useState([]);
  const [resContactCenterList, resSetContactCenterList] = useState([]);

  const handleFilter = (field) => {
    const copArr = [...resContactCenterList];
    if (field === "default") {
      setContactCenterList(resContactCenterList);
    } else {
      setContactCenterList(copArr?.filter((item) => item?.type === field));
    }
  };

  const getContactCenterList = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/contectcenter",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setContactCenterList(response.data.data);
        resSetContactCenterList(response.data.data);
      })
      .catch(function (error) {
       // defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_ContactCenters" },
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
    getContactCenterList();
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
              Contact-Center
            </li>
          </ol>
        </nav>
        {/* <div className="row">
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
                        Text
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
                        <option value="" selected>
                          Suggestion
                        </option>
                        <option value="" selected>
                          Complaint
                        </option>
                        <option value="" selected>
                          Contact-Center
                        </option>
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
                          : null}
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
                          id="viewer"
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
        </div> */}
        <div className="row" style={{ marginTop: "20px" }} id="cate-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-sm-6 col-md-6">
                    <h5>
                      Contact-Center
                      <span style={{ color: "red" }}>
                        ({contactCenterList?.length || "0"})
                      </span>
                    </h5>
                  </div>
                  <div
                    className="col-12 col-sm-6 col-md-6"
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
                        // onChange={handleInputChange}
                        // value={mainState?.selected?.search}
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
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        Filter By
                        <span>
                          <i
                            className="tio-info-outined m-1"
                            title="The lowest number will get the highest priority"
                          />
                        </span>
                      </label>
                      <select
                        className="form-control"
                        name="filter"
                        onChange={(e) => handleFilter(e.target.value)}
                      >
                        <option value="" selected disabled>
                          ---Select---
                        </option>
                        {true
                          ? [
                            {
                              id: "",
                              name: "Defaullt",
                              value: "default",
                            },
                            {
                              id: "",
                              name: "Suggestion",
                              value: "suggestion",
                            },
                            { id: "", name: "Complaint", value: "complaint" },
                            {
                              id: "",
                              name: "Contact-Center",
                              value: "contactcenter",
                            },
                          ].map((item) => (
                            <option
                              value={item?.value}
                            // selected={
                            //   item === mainState.selected.sequence
                            // }
                            >
                              {item?.name}
                            </option>
                          ))
                          : null}
                      </select>
                    </div>
                  </div>
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
                        <th style={{ width: "60%" }}>Message</th>
                        {/* <th>Text</th> */}
                        {/* <th>Slug</th> */}
                        <th>Type</th>
                        {/* <th>Priority</th> */}
                        {/* <th>Home status</th> */}
                        {/* <th className="text-center" style={{ width: "15%" }}>
                          Action
                        </th> */}
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
                      {!!contactCenterList?.length &&
                        contactCenterList.map((item, index) => (
                          <tr>
                            {/* <td className="text-center">
                                {item?._id || "..."}
                              </td> */}
                            {/* <td>{item?.category_name || "..."}</td> */}
                            <td>{item?.message || "..."} </td>
                            {/* <td>{item?.slug || "..."}</td> */}
                            {/* <td>
                                <img
                                  width={64}
                                  src={item?.category_icon || dummyCategoryLogo}
                                  onError={({ currentTarget }) => {
                                    currentTarget.src = dummyCategoryLogo;
                                  }}
                                />
                              </td> */}
                            {/* <td>{item?.sequence || "..."}</td> */}
                            {/* <td> */}
                            <td className="text-capitalize">
                              {item?.type || "..."}
                            </td>
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
                            {/* <td>
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
                              </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!contactCenterList?.length && (
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

export default AdminContactCenterList;
