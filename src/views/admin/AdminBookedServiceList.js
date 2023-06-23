import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminSellersSellerList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllSellers: [],
    allSellers: [],
    selected: {},
    options: {
      default: [
        {
          id: "",
          name: "Status : Pending",
          value: "pending",
        },
        {
          id: "",
          name: "Status : Active",
          value: "active",
        },
        {
          id: "",
          name: "Status : Deactive",
          value: "deactive",
        },
        {
          id: "",
          name: "Type : Store",
          value: "store",
        },
        {
          id: "",
          name: "Type : Seller",
          value: "seller",
        },
      ],
    },
  };
  const [mainState, setMainState] = useState(initialState);

  const apiGetAllSellers = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/service_booking/all",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllSellers: response.data.data,
          allSellers: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        allSellers: searchFor(value, mainState.resAllSellers),
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    } else if (name === "filter") {
      setMainState((prev) => ({
        ...prev,
        allSellers: handleSellerFilter(prev.resAllSellers, value),
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

  const handleSellerFilter = (orgArr, filterField) => {
    const copArr = [...orgArr];

    if (
      filterField === "pending" ||
      filterField === "active" ||
      filterField === "deactive"
    ) {
      return copArr?.filter((item) => item?.status === filterField);
    } else if (filterField === "store" || filterField === "seller") {
      return copArr?.filter((item) => item?.seller_type === filterField);
    }
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Sellers" },
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
        defaultAPIErrorHandler(error);
      });
  };

  useEffect(() => {
    apiGetAllSellers();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        {/*  */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Booked Services
            </li>
          </ol>
        </nav>
        {/*  */}
        <div className="page-header">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <h1 className="page-header-title">
                Booked Services
                <span className="badge badge-soft-dark ml-2">
                  {mainState?.resAllSellers?.length}
                </span>
              </h1>
            </div>
          </div>
          <div className="js-nav-scroller hs-nav-scroller-horizontal">
            <span
              className="hs-nav-scroller-arrow-prev"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-left" />
              </a>
            </span>
            <span
              className="hs-nav-scroller-arrow-next"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-right" />
              </a>
            </span>
            <ul className="nav nav-tabs page-header-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Book Services List{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*  */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div className="flex-between">
                    <div>
                      <h5>Booked Service table</h5>
                    </div>
                    <div className="mx-1">
                      <h5 style={{ color: "red" }}>
                        ({mainState?.allSellers?.length})
                      </h5>
                    </div>
                  </div>
                  {/* <div style={{ width: "40vw" }}>
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
                          placeholder="Search by Name or Phone or Email"
                          aria-label="Search orders"
                          onChange={handleInputChange}
                          value={mainState?.selected?.search}
                        />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div> */}
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
                        {/* <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
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
                        {/* <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                          <div className="form-group">
                            <select
                              className="form-control"
                              name="filter"
                              onChange={handleInputChange}
                            >
                              <option value="" selected disabled>
                                ---Default Filter---
                              </option>
                              {mainState?.options?.default?.length &&
                                mainState?.options?.default.map((item) => (
                                  <option value={item?.value}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div> */}
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
                        <th scope="col">SL#</th>
                        <th scope="col" style={{ width: "50px" }}>
                          Shop Name
                        </th>
                        <th scope="col">Shop Contact</th>
                        <th scope="col">User Email</th>
                        <th scope="col">User Contact</th>
                        <th scope="col">ocation_name</th>
                        <th scope="col">oction_time</th>
                        <th scope="col">oction_date</th>
                        <th scope="col">ocation_place</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Orders</th>
                        <th scope="col">Products</th> */}
                        {/* <th scope="col" style={{ width: "50px" }}>
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
                      {!!mainState?.allSellers?.length &&
                        mainState?.allSellers?.map((item, index) => (
                          <tr>
                            <td scope="col">{index + 1}</td>
                            <td
                              scope="col"
                              style={{ whiteSpace: "unset" }}
                            >{`${item?.service_provider?.[0]?.shop_name}`}</td>
                            <td scope="col">
                              {item?.service_provider?.[0]?.contect_no || "..."}
                            </td>
                            <td scope="col">
                              {item?.users?.[0]?.email_address || "..."}
                            </td>
                            <td scope="col">{item?.users?.[0]?.contect_no}</td>
                            <td scope="col">{item?.ocation_name}</td>
                            <td scope="col">{item?.oction_time}</td>
                            <td scope="col">{item?.oction_date}</td>
                            <td scope="col">{item?.ocation_place}</td>
                            <td scope="col">
                              <label
                                // className="badge badge-danger"
                                className={`text-capitalize badge badge-${
                                  item?.status === "confirm"
                                    ? "success"
                                    : "danger"
                                }`}
                              >
                                {item?.status}
                              </label>
                            </td>
                            {/* <td scope="col">
                              <Link
                                // to="/admin/sellers/order-list/13"
                                to=""
                                state={item}
                                className="btn btn-outline-primary btn-block"
                              >
                                <i className="tio-shopping-cart-outlined" />(
                                {item?.order_detail?.length || "0"})
                              </Link>
                            </td>
                            <td scope="col">
                              <Link
                                // to="/admin/sellers/product-list/13"
                                to=""
                                state={item}
                                className="btn btn-outline-primary btn-block"
                              >
                                <i className="tio-premium-outlined mr-1" />(
                                {item?.stock?.length || "0"})
                              </Link>
                            </td> */}
                            {/* <td>
                              <Link
                                title="View"
                                className="btn btn-info btn-sm"
                                state={item}
                                to={`/admin/service-provider/view/${item?._id}`}
                              >
                                <i className="tio-visible" />
                              </Link>
                            </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.allSellers?.length && (
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

export default AdminSellersSellerList;
