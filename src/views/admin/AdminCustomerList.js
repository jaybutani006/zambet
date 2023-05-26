import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import "./AdminCustomerList.css";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminCustomerList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllCustomers: [],
    allCustomers: [],
    selected: {},
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "status") {
      setMainState((prev) => ({
        ...prev,
        allCustomers: [
          ...prev.allCustomers.slice(0, index),
          { ...prev.allCustomers[index], status: "deactive" },
          ...prev.allCustomers.slice(index + 1),
        ],
      }));
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        allCustomers: searchFor(value, mainState.resAllCustomers),
        selected: {
          ...prev.selected,
          [name]: value,
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

  const apiGetAllCustomers = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/admin/userdata",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCustomers: response.data.data,
          allCustomers: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Customers" },
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

  const handleDeleteItem = (itemId, index) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${mainState?.allCustomers?.[index]?.user_details?.[0]?.first_name || ""}`
      )
    ) {
      const config = {
        method: "delete",
        url: process.env.REACT_APP_BASEURL + `/api/user/${itemId}`,
        // params: { _id: itemId },
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
        // data: formData,
      };
      axios(config)
        .then((response) => {
          console.log(response.data.data);
          apiGetAllCustomers();
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Cancel");
    }
  };

  const handleUpdateStatus = (policyId, index, status) => {
    if (
      window.confirm(
        `Are you sure you want to update status of ${mainState?.allCustomers?.[index]?.user_details?.[0]?.first_name || ""} to ${status}`
      )
    ) {
      const config = {
        method: "put",
        url: process.env.REACT_APP_BASEURL + "/api/admin/customerstatus",
        params: { _id: policyId },
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
        data: {
          status: status
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data.data);
          apiGetAllCustomers();
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Cancel");
    }
  };

  useEffect(() => {
    apiGetAllCustomers();
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
              All Customers
            </li>
          </ol>
        </nav>
        {/*  */}
        <div className="page-header">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <h1 className="page-header-title">
                Customer
                <span className="badge badge-soft-dark ml-2">
                  {mainState?.resAllCustomers?.length}
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
                  Customer List{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*  */}
        <div className="card">
          <div className="card-header">
            <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
              <div>
                <div className="flex-start">
                  <div>
                    <h5>Customer Table</h5>
                  </div>
                  <div className="mx-1">
                    <h5 style={{ color: "red" }}>
                      ({mainState?.allCustomers?.length})
                    </h5>
                  </div>
                </div>
              </div>
              <div style={{ width: "40vw" }}>
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
                      placeholder="Search by Name or Email or Phone"
                      aria-label="Search orders"
                      value={mainState?.selected?.search}
                      onChange={handleInputChange}
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
          <div
            className="table-responsive datatable-custom"
            style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            <table
              className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
              // Below solution does not work , so gave the height and overflow Y to the parent div tag
              // style={{
              //   textAlign: "left",
              //   display: "block",
              //   height: "50vh",
              //   overflowY: "scroll",
              // }}
              data-hs-datatables-options='{
               "columnDefs": [{
                  "targets": [0],
                  "orderable": false
                }],
               "order": [],
               "info": {
                 "totalQty": "#datatableWithPaginationInfoTotalQty"
               },
               "search": "#datatableSearch",
               "entries": "#datatableEntries",
               "pageLength": 25,
               "isResponsive": false,
               "isShowPaging": false,
               "pagination": "datatablePagination"
             }'
            >
              <thead className="thead-light">
                <tr>
                  <th className>#</th>
                  <th className="table-column-pl-0">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Total Order </th>
                  <th>Block / Unblock</th>
                  <th>Action</th>
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
                {!!mainState.allCustomers?.length &&
                  mainState.allCustomers.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td className="table-column-pl-0">
                        {`${item?.user_details?.[0]?.first_name} ${item?.user_details?.[0]?.last_name}`}
                      </td>
                      <td>{item?.email_address || "..."}</td>
                      <td>{item?.contect_no || "..."}</td>
                      <td>
                        <label className="badge badge-soft-info">
                          {item?.order_master?.length || "0"}
                        </label>
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            className="status"
                            id={27}
                            name="status"
                            checked={item?.status === "active" ? true : false}
                            // checked={item?.status === "active" ? true : false}
                            // onClick={(e) => handleInputChange(e, index)}
                            onChange={(e) => { handleUpdateStatus(item?._id, index, !!e.target.checked ? "active" : "deactive") }}
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                      <td>
                        <Link
                          title="View"
                          className="btn btn-info btn-sm"
                          to={`/admin/customer/view/${item?._id}`}
                          state={item}
                        >
                          <i className="tio-visible" />
                        </Link>
                        <Link
                          title="Delete"
                          className="btn btn-danger btn-sm delete"
                          to=""
                          onClick={() => { handleDeleteItem(item?._id, index) }}
                        >
                          <i className="tio-delete" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!mainState?.allCustomers?.length && (
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
          {/* <div className="card-footer">
            <nav>
              <ul className="pagination">
                <li
                  className="page-item disabled"
                  aria-disabled="true"
                  aria-label="« Previous"
                >
                  <span className="page-link" aria-hidden="true">
                    ‹
                  </span>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                  // href="/admin/customer/list?page=2"
                  >
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    // href="/admin/customer/list?page=2"
                    rel="next"
                    aria-label="Next »"
                  >
                    ›
                  </a>
                </li>
              </ul>
            </nav>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default AdminCustomerList;
