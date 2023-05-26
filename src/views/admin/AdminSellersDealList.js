import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import dummyHomeBanner2 from "assets/dummyHomeBanner2.png";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminSellersDealList() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  //

  const initialState = {
    resDealList: [],
    dealList: [],
    selected: {
      name: "",
      description: "",
      type: "",
      photo: null,
    },
    options: [
      {
        id: "",
        name: "Default",
        value: "default",
      },
      {
        id: "",
        name: "Lightning Deal",
        value: "lightning_deal",
      },
      {
        id: "",
        name: "Best Deal",
        value: "best_deal",
      },
      {
        id: "",
        name: "Deal of the day",
        value: "deal_of_the_day",
      },
    ],
  };
  const [mainState, setMainState] = useState(initialState);

  const handleFilter = (field) => {
    const copArr = [...mainState?.resDealList];
    if (field === "default") {
      setMainState((prev) => ({
        ...prev,
        dealList: mainState?.resDealList,
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        dealList: copArr?.filter((item) => item?.type === field),
      }));
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value, checked } = e.target;
    console.log(name, value);

    if (name === "photo") {
      const imageURLObj = [...e.target.files].map((item) =>
        URL.createObjectURL(item)
      );
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: e.target.files,
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
        dealList: searchFor(value, mainState.resDealList),
      }));
    } else if (name === "status") {
      setMainState((prev) => ({
        ...prev,
        dealList: [
          ...prev.dealList.slice(0, index),
          {
            ...prev.dealList[index],
            status: !!checked ? "active" : "inactive",
          },
          ...prev.dealList.slice(index + 1),
        ],
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

  const handleStatusChange = (e, index, dealId) => {
    const { name, value, checked } = e.target;

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/deal",
      params: { _id: dealId },
      headers: {
        "Content-Type": "application/json",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        status: !!checked ? "active" : "inactive",
      }),
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          dealList: [
            ...prev.dealList.slice(0, index),
            {
              ...prev.dealList[index],
              status: !!checked ? "active" : "inactive",
            },
            ...prev.dealList.slice(index + 1),
          ],
        }));
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const getDealListAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/deal",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resDealList: response.data.data,
          dealList: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error);
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Deals" },
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
    getDealListAPI();
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
              Deals
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }} id="cate-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-sm-6 col-md-6">
                    <h5>
                      Deals{" "}
                      <span style={{ color: "red" }}>
                        {/* ({mainState?.allCategories?.length || "0"}) */}
                        {/* Deals (1) */}
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
                            */}

                        <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => e.preventDefault()}
                            // type="submit"
                            className="btn btn-primary float-right float-sm-none"
                            onclick="formUrlChange(this)"
                          >
                            Filter
                          </button>
                        </div>
                        <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                          <div className="form-group">
                            {/* <label className="input-label" htmlFor="priority">
                              Filter By
                              <span>
                                <i
                                  className="tio-info-outined m-1"
                                  title="The lowest number will get the highest priority"
                                />
                              </span>
                            </label> */}
                            <select
                              className="form-control"
                              name="filter"
                              onChange={(e) => handleFilter(e.target.value)}
                            >
                              <option value="" selected disabled>
                                ---Default Filter---
                              </option>
                              {mainState?.options?.length &&
                                mainState?.options.map((item) => (
                                  <option value={item?.value}>
                                    {item.name}
                                  </option>
                                ))}
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
                        {/* <th style={{ width: "100px" }}>Category ID</th> */}
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Approve/Reject</th>
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
                      {!!mainState?.dealList?.length &&
                        mainState.dealList.map((item, index) => (
                          <tr>
                            {/* <td className="text-center">
                                {item?._id || "..."}
                              </td> */}
                            <td
                              style={{
                                width: "50%",
                              }}
                            >
                              <img
                                width={"80%"}
                                style={{
                                  maxWidth: "400px",
                                  maxHeight: "300px",
                                }}
                                src={
                                  item?.image ||
                                  "/assets/back-end/img/900x400/img1.jpg"
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src =
                                    "/assets/back-end/img/900x400/img1.jpg";
                                }}
                              />
                            </td>
                            <td>{item?.name || "..."}</td>
                            <td>{item?.type || "..."}</td>
                            {/* <td>{item?.slug || "..."}</td> */}
                            {/* <td>{item?.sequence || "..."}</td> */}
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
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  className="status"
                                  id={27}
                                  name="status"
                                  // checked={
                                  //   item?.status === "active" ? true : false
                                  // }
                                  checked={
                                    item?.status === "active" ? true : false
                                  }
                                  onChange={(e) =>
                                    handleStatusChange(e, index, item?._id)
                                  }
                                />
                                <span className="slider round" />
                              </label>
                            </td>
                            {/* <td>
                                <Link
                                  className="btn btn-primary btn-sm edit mr-1"
                                  style={{ cursor: "pointer" }}
                                  to={"/seller/deal/edit/" + item._id}
                                  state={item}
                                >
                                  <i className="tio-edit" />
                                  Edit
                                </Link>
                                <Link
                                  to=""
                                  className="btn btn-danger btn-sm delete"
                                  style={{ cursor: "pointer" }}
                                  onClick={
                                    (e) => {}
                                    // handleDeleteCategory(e, index, item._id)
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
              {!mainState?.dealList?.length && (
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

export default AdminSellersDealList;
