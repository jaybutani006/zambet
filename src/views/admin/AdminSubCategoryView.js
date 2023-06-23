import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminSubCategoryView() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllCategories: [],
    allCategories: [],
    resAllSubCategories: [],
    allSubCategories: [],
    selected: {
      category_id: "",
      subcategory_name: "",
      sub_category_icon: "",
      sequence: "",
      // priority: "",
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

    if (name === "sub_category_icon") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: e.target.files[0],
        },
      }));
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        allSubCategories: searchFor(value, mainState.resAllSubCategories),
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
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllSubCategories = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subcategory/all",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllSubCategories: response.data.data,
          allSubCategories: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAddSubCategory = (e) => {
    e.preventDefault();

    if (!mainState.selected.subcategory_name) {
      alert("subcategory_name can't be empty");
      return;
    } else if (!mainState.selected.category_id) {
      alert("category_id can't be empty");
      return;
    }

    console.log(mainState.selected);

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/subcategory",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        subcategory_name: mainState.selected.subcategory_name,
        category_id: mainState.selected.category_id,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            subcategory_name: "",
            category_id: "",
          },
        }));
        alert("Successfully SubCategory Added");
        apiGetAllSubCategories();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteSubCategory = (e, index, subCatId) => {
    if (window.confirm(`product-${index + 1}`, "Want to delete this item ?")) {
      // STATIC DELETION
      // const newSubCategories = mainState.resAllSubCategories.slice();
      // newSubCategories.splice(index, 1);

      // setMainState((prev) => ({
      //   ...prev,
      //   resAllSubCategories: newSubCategories,
      // }));
      // console.log(index, newSubCategories);
      // STATIC DELETION

      axios({
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/subcategory/" + subCatId,
        headers: {
          Authorization: state.adminToken,
        },
      })
        .then(function (response) {
          console.log(response.data);
          alert("Successfully Deleted");
          apiGetAllSubCategories();
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
      params: { queryType: "Admin_SubCategories" },
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
    apiGetAllSubCategories();
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
              <div className="card-header">Sub category form</div>
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
                        عربي(SA)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link lang_link " href="#" id="bd-link">
                        বাংলা(BD)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link lang_link " href="#" id="in-link">
                        हिंदी(IN)
                      </a>
                    </li> */}
                  </ul>
                  <div className="row">
                    <div className="col-12 col-md-5">
                      <div className="form-group  lang_form" id="en-form">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Sub category Name (EN)
                        </label>
                        <input
                          type="text"
                          name="subcategory_name"
                          className="form-control"
                          placeholder="New Sub Category"
                          onChange={handleInputChange}
                          value={mainState.selected.subcategory_name}
                        />
                      </div>
                      {/* <input type="hidden" name="lang[]" defaultValue="en" />
                      <div className="form-group d-none lang_form" id="sa-form">
                        <label className="input-label" htmlFor="exampleFormControlInput1">
                          Sub category Name (SA)
                        </label>
                        <input type="text" name="name[]" className="form-control" placeholder="New Sub Category" />
                      </div>
                      <input type="hidden" name="lang[]" defaultValue="sa" />
                      <div className="form-group d-none lang_form" id="bd-form">
                        <label className="input-label" htmlFor="exampleFormControlInput1">
                          Sub category Name (BD)
                        </label>
                        <input type="text" name="name[]" className="form-control" placeholder="New Sub Category" />
                      </div>
                      <input type="hidden" name="lang[]" defaultValue="bd" />
                      <div className="form-group d-none lang_form" id="in-form">
                        <label className="input-label" htmlFor="exampleFormControlInput1">
                          Sub category Name (IN)
                        </label>
                        <input type="text" name="name[]" className="form-control" placeholder="New Sub Category" />
                      </div>
                      <input type="hidden" name="lang[]" defaultValue="in" />
                      <input name="position" defaultValue={1} style={{ display: "none" }} /> */}
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlSelect1"
                        >
                          Main Category
                          <span className="input-label-secondary">*</span>
                        </label>
                        <select
                          id="exampleFormControlSelect1"
                          name="category_id"
                          className="form-control"
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {!!mainState?.resAllCategories?.length
                            ? mainState.resAllCategories.map((item) => (
                                <option
                                  value={item._id}
                                  selected={
                                    item._id === mainState.selected.category_id
                                  }
                                >
                                  {item.category_name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-3">
                      <div className="form-group">
                        <label className="input-label" htmlFor="priority">
                          Choose priority number
                          <span>
                            <i
                              className="tio-info-outined"
                              title="The lowest number will get the highest priority"
                            />
                          </span>
                        </label>
                        <select
                          className="form-control"
                          name="priority"
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {mainState?.options?.length
                            ? mainState.options.map((item) => (
                                <option value={item.value}>{item.name}</option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div> */}
                  </div>
                  <button
                    onClick={handleAddSubCategory}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }} id="cate-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className=" row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-md-7">
                    <h5>
                      Sub category table{" "}
                      <span style={{ color: "red" }}>
                        ({mainState?.allSubCategories?.length || "0"})
                      </span>
                    </h5>
                  </div>
                  <div className="col-12 col-md-5" style={{ width: "40vw" }}>
                    <form>
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
                          placeholder="Search by Sub Category"
                          aria-label="Search orders"
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
              <div className="card-body" style={{ padding: 0 }}>
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
                        <th scope="col" style={{ width: "100px" }}>
                          SubCategory ID
                        </th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Slug</th> */}
                        {/* <th scope="col">Priority</th> */}
                        <th
                          scope="col"
                          className="text-center"
                          style={{ width: "80px" }}
                        >
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
                      {!!mainState?.allSubCategories?.length &&
                        mainState.allSubCategories.map((item, index) => (
                          <tr>
                            <td className="text-center">
                              {item?._id || "..."}
                            </td>
                            <td>{item.subcategory_name || "..."}</td>
                            {/* <td>mobile-phones</td> */}
                            {/* <td>2</td> */}
                            <td>
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{ cursor: "pointer" }}
                                to={
                                  "/admin/sub-category/edit/" + item.category_id
                                }
                                state={item}
                              >
                                <i className="tio-edit" /> Edit
                              </Link>
                              <Link
                                to=""
                                className="btn btn-danger btn-sm delete"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleDeleteSubCategory(e, index, item._id)
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
              {!mainState?.allSubCategories?.length && (
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

export default AdminSubCategoryView;
