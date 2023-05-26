import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

function AdminSubAdminList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);
  const initialState = {
    resAllSubAdmins: [],
    allSubAdmins: [],
    selected: {},
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "status") {
      // setMainState((prev) => ({
      //   ...prev,
      //   allSubAdmins: [
      //     ...prev.allSubAdmins.slice(0, index),
      //     {
      //       ...prev.allSubAdmins[index],
      //       status: e.target.checked ? "active" : "deactive",
      //     },
      //     ...prev.allSubAdmins.slice(index + 1),
      //   ],
      // }));

      apiToggleSubAdminActiveStatus(
        e.target.checked,
        mainState.allSubAdmins[index]._id,
        index
      );
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        allSubAdmins: searchFor(value, prev.resAllSubAdmins),
      }));
    } else {
    }
  };

  const apiToggleSubAdminActiveStatus = (isChecked, subadminId, index) => {
    // console.log(isChecked,subadminId,index);
    // return;
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/admin/subadmin/permissions",
      params: {
        _id: subadminId,
      },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: isChecked ? "active" : "deactive",
      }),
    })
      .then((response) => {
        console.log(response.data);
        apiGetAllSubAdmins();
        alert("Sub Admin Status Updated");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
        // console.log(error);
        // setMainState((prev) => ({
        //   ...prev,
        //   resAllSubAdmins: [
        //     ...prev.resAllSubAdmins.slice(0, index),
        //     {
        //       ...prev.resAllSubAdmins[index],
        //       status: !isChecked ? "active" : "deactive",
        //     },
        //     ...prev.resAllSubAdmins.slice(index + 1),
        //   ],
        //   allSubAdmins: [
        //     ...prev.allSubAdmins.slice(0, index),
        //     {
        //       ...prev.allSubAdmins[index],
        //       status: !isChecked ? "active" : "deactive",
        //     },
        //     ...prev.allSubAdmins.slice(index + 1),
        //   ],
        // }));
        // alert("Something went wrong");
      });
  };

  const apiGetAllSubAdmins = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/admin/subadmin",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllSubAdmins: response.data.data,
          allSubAdmins: response.data.data,
        }));
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteSubAdmin = (subadminId) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "/api/admin/subadmin",
      params: { _id: subadminId },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: "deactive",
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Success");
        apiGetAllSubAdmins();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_SubAdmins" },
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
    apiGetAllSubAdmins();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">
                <i className="tio-filter-list" />
                Sub-Admin List ( {mainState?.allSubAdmins?.length} )
              </h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-header">
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-12 mb-1 col-md-4">
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
                          placeholder="Search"
                          aria-label="Search"
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
                  <div className="col-12 col-md-8 text-right">
                    <Link
                      to="/admin/sub-admin/add"
                      className="btn btn-primary pull-right"
                    >
                      <i className="tio-add-circle" /> Add Sub-admin
                    </Link>
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
                      <th className="table-column-pl-0">Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City </th>
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
                    {!!mainState.allSubAdmins?.length &&
                      mainState.allSubAdmins.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td className="table-column-pl-0">
                            <span className="d-block font-size-sm text-body">
                              {item?.user_data?.[0]?.full_name || "..."}
                            </span>
                          </td>
                          <td>{item?.user_data?.[0]?.email_address || "..."}</td>
                          <td>{item?.user_data?.[0]?.contect_no || "..."}</td>
                          <td>{item?.user_data?.[0]?.city || "0"}</td>
                          <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                className="status"
                                name="status"
                                checked={
                                  item?.status === "active" ? true : false
                                }
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <Link
                              title="View"
                              className="btn btn-info btn-sm mr-1"
                              to={`/admin/sub-admin/edit/${item?._id}`}
                              state={item}
                            >
                              <i className="tio-edit" />
                              {/* <i className="tio-visible" /> */}
                            </Link>
                            <Link
                              title="Delete"
                              className="btn btn-danger btn-sm delete mr-1"
                              to=""
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${
                                      item?.user_data?.[0]?.full_name || ""
                                    }`
                                  )
                                ) {
                                  handleDeleteSubAdmin(item._id);
                                }
                              }}
                            >
                              <i className="tio-delete" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!mainState?.allSubAdmins?.length && (
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

export default AdminSubAdminList;
