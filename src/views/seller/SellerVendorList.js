import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerVendorList() {
  const [state, dispatch] = useContext(Context);
  const [vendorsList, setVendorsList] = useState([]);

  const apiGetAllVendors = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subvender",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        setVendorsList(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetAllVendors();
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
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <h1 className="page-header-title">
                Vendor List
                {` ${!!vendorsList?.length ? vendorsList.length : 0}`}
                <span className="badge badge-soft-dark ml-2">{}</span>
              </h1>
            </div>
          </div>
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
                    <h5>Vendor Table</h5>
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
                  <th className="table-column-pl-0">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className>1</td>
                  <td className="table-column-pl-0">
                    <Link to="/admin/customer/view/11">chandran 98</Link>
                  </td>
                  <td>chandranjc3@gmail.com</td>
                  <td>823182318</td>
                  <td>
                    <Link
                      title="View"
                      className="btn btn-info btn-sm"
                      to="/seller/vendor/edit/:id"
                    >
                      <i className="tio-visible" />
                    </Link>
                    <Link
                      title="Delete"
                      className="btn btn-danger btn-sm delete"
                      to=""
                      onclick="form_alert('customer-11','Want to delete this customer ?')"
                    >
                      <i className="tio-delete" />
                    </Link>
                    <form>
                      <input
                        type="hidden"
                        name="_token"
                        defaultValue="eQnrEtIFxY6V0f3yraZiefJuFiNOolMDa5z3D0Xy"
                      />{" "}
                      <input
                        type="hidden"
                        name="_method"
                        defaultValue="delete"
                      />{" "}
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </main>
  );
}

export default SellerVendorList;
