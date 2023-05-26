import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";

function SellerStaffAttendanceView() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const initialState = {
    staffAttendanceList: [],
    resStaffAttendanceList: [],
    staffId: location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    ),
    ...location?.state,
  };
  const [mainState, setMainState] = useState(initialState);

  const getStaffAttendanceList = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/staff/attendance",
      params: {
        staffId: mainState?.staffId,
      },
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

  useEffect(() => {
    getStaffAttendanceList();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Seller
            </li>
            <li className="breadcrumb-item">Staff</li>
          </ol>
        </nav>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-header">
                <h3 className="h3 mb-0">Staff Details </h3>
              </div>
              <div className="card-body">
                <div className="col-md-8">
                  <div className="flex-start">
                    <h6>Full Name : </h6>
                    <h6 className="mx-1">{mainState?.fullname || "..."}</h6>
                  </div>
                  <div className="flex-start">
                    <h6>Email : </h6>
                    <h6 className="mx-1">{mainState?.email || "..."}</h6>
                  </div>
                  <div className="flex-start">
                    <h6>Phone : </h6>
                    <h6 className="mx-1">{mainState?.phone || "..."}</h6>
                  </div>
                  {/* <div className="flex-start">
                    <h6>City : </h6>
                    <h6 className="mx-1">{mainState?.fullname || "..."}</h6>
                  </div> */}
                  {/* <div className="flex-start">
                    <h6>Branch : </h6>
                    <h6 className="mx-1">Ahmedabad</h6>
                  </div>
                  <div className="flex-start">
                    <h6>Designation : </h6>
                    <h6 className="mx-1">Manager</h6>
                  </div> */}
                  {/* <a
                    className="btn btn-primary"
                    href="/seller/profile/bank-edit/1"
                  >
                    Edit
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div>
                    <div className="flex-start">
                      <div>
                        <h5>Attendance History</h5>
                      </div>
                      {/* <div className="mx-1">
                    <h5 style={{ color: "red" }}>(9)</h5>
                  </div> */}
                    </div>
                  </div>
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
                      {/* <th className="table-column-pl-0">Date</th> */}
                      {/* <th>Presence</th> */}
                      <th>Login</th>
                      <th>Logout</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {!!mainState?.staffAttendanceList?.length &&
                      mainState?.staffAttendanceList?.map((item, index) => (
                        <tr>
                          <td style={{ width: "10px" }}>{index + 1}</td>
                          <td className="table-column-pl-0">
                            {/* <Link to="/seller/staff/view/:id">29/08/222</Link> */}
                            {ISOToIST(item?.login_time) || "..."}
                          </td>
                          <td>{ISOToIST(item?.logout_time) || "..."}</td>
                          {/* <td> */}
                          {/* <Link
                          title="View"
                          className="btn btn-info btn-sm"
                          to="/seller/staff/attendance/view/:id"
                          // to="/seller/staff/edit/:id"
                        >
                          <i className="tio-visible" />
                        </Link> */}
                          {/* <Link
                      title="Delete"
                      className="btn btn-danger btn-sm delete"
                      to=""
                      onclick="form_alert('customer-11','Want to delete this customer ?')"
                    >
                      <i className="tio-delete" />
                    </Link> */}
                          {/* </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerStaffAttendanceView;
