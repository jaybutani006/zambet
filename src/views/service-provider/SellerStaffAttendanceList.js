import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

function SellerStaffAttendanceList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);
  const initialState = {
    resStaffAttendanceList: [],
    staffAttendanceList: [],
    selected: {},
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "status") {
      // setMainState((prev) => ({
      //   ...prev,
      //   staffAttendanceList: [
      //     ...prev.staffAttendanceList.slice(0, index),
      //     {
      //       ...prev.staffAttendanceList[index],
      //       status: e.target.checked ? "active" : "deactive",
      //     },
      //     ...prev.staffAttendanceList.slice(index + 1),
      //   ],
      // }));

      apiToggleStaffActiveStatus(
        e.target.checked,
        mainState.staffAttendanceList[index]._id,
        index
      );
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        staffAttendanceList: searchFor(value, prev.resStaffAttendanceList),
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

  const apiToggleStaffActiveStatus = (isChecked, staffId, index) => {
    // console.log(isChecked,staffId,index);
    // return;
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/staff",
      params: {
        _id: staffId,
      },
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: isChecked ? "active" : "deactive",
      }),
    })
      .then((response) => {
        console.log(response.data);
        getStaffAttendanceList();
        alert("Staff Status Updated");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
        // setMainState((prev) => ({
        //   ...prev,
        //   resStaffAttendanceList: [
        //     ...prev.resStaffAttendanceList.slice(0, index),
        //     {
        //       ...prev.resStaffAttendanceList[index],
        //       status: !isChecked ? "active" : "deactive",
        //     },
        //     ...prev.resStaffAttendanceList.slice(index + 1),
        //   ],
        //   staffAttendanceList: [
        //     ...prev.staffAttendanceList.slice(0, index),
        //     {
        //       ...prev.staffAttendanceList[index],
        //       status: !isChecked ? "active" : "deactive",
        //     },
        //     ...prev.staffAttendanceList.slice(index + 1),
        //   ],
        // }));
      });
  };

  const getStaffAttendanceList = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/attendance",
      headers: {
        Authorization: state.sellerToken,
        // Authorization:
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzNhNTk3NmNhMTM0MDE3NDU0NmMxMyIsInJvbGUiOiJ2ZW5kb3IiLCJlbWFpbF9hZGRyZXNzIjoidGVzdC5zZWxsZXJAZ21haWxsLmNvbSIsImlhdCI6MTY2NDM1Njk2NSwiZXhwIjoxNjk1ODkyOTY1fQ.8Ffj_odYbXoTEl38OubdWrkX5nLI1S-pavdUEgjvpLY",
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resStaffAttendanceList: response.data.data,
          staffAttendanceList: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    // THIS UI is REMOVED
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: {},
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
    getStaffAttendanceList();
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
          {/* <div className="row align-items-center mb-3">
            <div className="col-sm">
              <h1 className="page-header-title">
                Staff List
                {` ${!!vendorsList?.length ? vendorsList.length : 0}`}
                <span className="badge badge-soft-dark ml-2">{}</span>
              </h1>
            </div>
          </div> */}
          {/* <div className="js-nav-scroller hs-nav-scroller-horizontal">
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
                  Vendor List{" "}
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
              <div>
                <div className="flex-start">
                  <div>
                    <h5>Staffs Attendance Table</h5>
                  </div>
                  {/* <div className="mx-1">
                    <h5 style={{ color: "red" }}>(9)</h5>
                  </div> */}
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
          <div className="table-responsive datatable-custom">
            <table
              style={{ textAlign: "left" }}
              className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
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
                  <th>#</th>
                  <th className="table-column-pl-0"> Name</th>
                  <th> Status</th>
                  <th> Email</th>
                  <th> Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!!mainState?.staffAttendanceList?.length &&
                  mainState?.staffAttendanceList
                    .slice(0, 1)
                    .map((item, index) => (
                      <tr>
                        <td className>1</td>
                        <td className="table-column-pl-0">
                          <Link to={`/seller/staff/view/`}>
                            {item?.fullname || "Saurav Kumar"}
                          </Link>
                        </td>
                        <td>
                          {!!item?.attendance_status ? "Present" : "Absent"}
                        </td>
                        <td> {item?.email || "suarav@gmail.com"}</td>
                        <td> {item?.phone || "+91823182318"}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              onclick="filter_order()"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <Link
                            title="View"
                            className="btn btn-info btn-sm"
                            to={`/seller/staff/attendance/view/${item?.staff_id}`}
                            // to="/seller/staff/edit/:id"
                          >
                            <i className="tio-visible" />
                          </Link>
                          {/* <Link
                    title="Delete"
                    className="btn btn-danger btn-sm delete"
                    to=""
                    onclick="form_alert('customer-11','Want to delete this customer ?')"
                  >
                    <i className="tio-delete" />
                  </Link> */}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </main>
  );
}

export default SellerStaffAttendanceList;
