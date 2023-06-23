import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminSubSubCategoryView() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllCategories: [],
    resAllSubCategories: [],
    resAllSubSubCategories: [],
    allSubSubCategories: [],
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
        // FIXME : searchFor function can't search inside nested arrays of an object.
        allSubSubCategories: searchFor(value, mainState.resAllSubSubCategories),
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
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllSubSubCategories = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllSubSubCategories: response.data.data,
          allSubSubCategories: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAddSubSubCategory = (e) => {
    e.preventDefault();

    if (!mainState.selected.subsubcategory_name) {
      alert("subsubcategory_name can't be empty");
      return;
      // } else if (!mainState.selected.category_id) {
      //   alert("category_id can't be empty");
      //   return;
    } else if (!mainState.selected.subcategory_id) {
      alert("subcategory_id can't be empty");
      return;
    }

    console.log(mainState.selected);

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        subsubcategory_name: mainState.selected.subsubcategory_name,
        subcategory_id: mainState.selected.subcategory_id,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        alert("Successfully SubSubCategory Added");
        apiGetAllSubSubCategories();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteSubSubCategory = (e, subSubCatId, subSubCatName) => {
    if (
      window.confirm(`product-${subSubCatName}`, "Want to delete this item ?")
    ) {
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
        url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
        headers: {
          Authorization: state.adminToken,
        },
        params: {
          _id: subSubCatId,
        },
      })
        .then(function (response) {
          console.log(response.data);
          alert("Successfully Deleted");
          apiGetAllSubSubCategories();
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
      params: { queryType: "Admin_SubSubCategories" },
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
    apiGetAllSubSubCategories();
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
              <div className="card-header">Sub sub category form</div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
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
                    <div className="col-12 form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Sub sub category Name (EN)
                      </label>
                      <input
                        type="text"
                        name="subsubcategory_name"
                        className="form-control w-100"
                        placeholder="New Sub Sub Category"
                        onChange={handleInputChange}
                        value={mainState.selected.subsubcategory_name}
                      />
                    </div>

                    {/* <div className="col-12 col-md-4">
                      <div className="form-group">
                        <label className="input-label">
                          Main Category
                          <span className="input-label-secondary">*</span>
                        </label>
                        <select
                          className="form-control w-100"
                          id="category_id"
                          name="category_id"
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
                    </div> */}
                    <div className="col-12 col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Sub category Name</label>
                        <select
                          name="subcategory_id"
                          id="subcategory_id"
                          className="form-control w-100"
                          onChange={handleInputChange}
                        >
                          <option value="" selected disabled defaultChecked>
                            ---Select---
                          </option>
                          {!!mainState?.resAllSubCategories?.length
                            ? mainState.resAllSubCategories
                                // .filter(
                                //   (item) =>
                                //     item.category_id ===
                                //     mainState.selected.category_id
                                // )
                                .map((item) => (
                                  <option
                                    value={item._id}
                                    selected={
                                      item._id ===
                                      mainState.selected.subcategory_id
                                    }
                                  >
                                    {item.subcategory_name}
                                  </option>
                                ))
                            : null}
                        </select>
                      </div>
                    </div>

                    {/* <div className="col-12 col-md-4">
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
                    <div className="col-12 mt-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleAddSubSubCategory}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }} id="cate-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-md-6">
                    <h5>
                      Sub sub category table
                      <span style={{ color: "red" }}>
                        ({mainState?.allSubSubCategories?.length || "0"})
                        {/* (mainState?.allSubSubCategories?.map((item1, index) =>
                        (item1?.Subcategory?.length ?
                        item1.Subcategory.map((item2) =>
                        item2?.Subsubcategory?.length ) : null ) ) || "0") */}
                      </span>
                    </h5>
                  </div>
                  <div className="col-12 col-md-6" style={{ width: "40vw" }}>
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
                          placeholder="Search by Sub Sub Category"
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
                        <th scope="col" style={{ width: "120px" }}>
                          SubSubCategory ID
                        </th>
                        <th scope="col">Sub sub category name</th>
                        {/* <th scope="col">Slug</th> */}
                        {/* <th scope="col">Priority</th> */}
                        <th
                          scope="col"
                          className="text-center"
                          style={{ width: "120px" }}
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
                      {!!mainState?.allSubSubCategories?.length &&
                        mainState.allSubSubCategories.map((item1, index) =>
                          item1?.Subcategory?.length
                            ? item1.Subcategory.map((item2) =>
                                item2?.Subsubcategory?.length
                                  ? item2.Subsubcategory.map((item3) => (
                                      <tr>
                                        <td className="text-center">
                                          {item3?._id || "..."}
                                        </td>
                                        <td>
                                          {item3.subsubcategory_name || "..."}
                                        </td>
                                        {/* <td>iphones</td> */}
                                        {/* <td /> */}
                                        <td>
                                          <Link
                                            className="btn btn-primary btn-sm edit"
                                            style={{ cursor: "pointer" }}
                                            to={
                                              "/admin/sub-sub-category/edit/" +
                                              item3._id
                                            }
                                            state={item3}
                                          >
                                            <i className="tio-edit" />
                                            Edit
                                          </Link>
                                          <Link
                                            to=""
                                            className="btn btn-danger btn-sm delete"
                                            style={{ cursor: "pointer" }}
                                            id={88}
                                            onClick={(e) =>
                                              handleDeleteSubSubCategory(
                                                e,
                                                item3._id,
                                                item3.subsubcategory_name
                                              )
                                            }
                                          >
                                            <i className="tio-add-to-trash" />
                                            Delete
                                          </Link>
                                        </td>
                                      </tr>
                                    ))
                                  : null
                              )
                            : null
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.allSubSubCategories?.length && (
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

export default AdminSubSubCategoryView;
