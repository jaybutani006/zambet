import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function SellerBusinessSettingsWithdrawList() {
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
              Withdraw{" "}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  Withdraw Request Table
                  <span style={{ color: "red" }}>(8)</span>
                </h5>
                <select
                  name="withdraw_status_filter"
                  onchange="status_filter(this.value)"
                  className="custom-select float-right"
                  style={{ width: "200px" }}
                >
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>SL#</th>
                        <th>Amount</th>
                        <th>Request time</th>
                        <th>Status</th>
                        <th style={{ width: "5px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">1</td>
                        <td>646.41₹</td>
                        <td>February 5th, 2022</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <button
                            id="https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/9"
                            onclick="close_request('https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/9')"
                            className="btn btn-primary btn-sm"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">2</td>
                        <td>343.00₹</td>
                        <td>October 30th, 2021</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <button
                            id="https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/8"
                            onclick="close_request('https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/8')"
                            className="btn btn-primary btn-sm"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">3</td>
                        <td>397.00₹</td>
                        <td>October 30th, 2021</td>
                        <td>
                          <label className="badge badge-danger">Denied</label>
                        </td>
                        <td>
                          <span className="btn btn-primary btn-sm disabled">
                            Close
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">4</td>
                        <td>920.00₹</td>
                        <td>October 29th, 2021</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <button
                            id="https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/6"
                            onclick="close_request('https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/6')"
                            className="btn btn-primary btn-sm"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">5</td>
                        <td>7,350.00₹</td>
                        <td>October 29th, 2021</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <button
                            id="https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/5"
                            onclick="close_request('https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/5')"
                            className="btn btn-primary btn-sm"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">6</td>
                        <td>878.35₹</td>
                        <td>October 19th, 2021</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <button
                            id="https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/4"
                            onclick="close_request('https://6valley.6amtech.com/seller/business-settings/withdraw/cancel/4')"
                            className="btn btn-primary btn-sm"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">7</td>
                        <td>15.00₹</td>
                        <td>June 5th, 2021</td>
                        <td>
                          <label className="badge badge-danger">Denied</label>
                        </td>
                        <td>
                          <span className="btn btn-primary btn-sm disabled">
                            Close
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">8</td>
                        <td>20.00₹</td>
                        <td>June 5th, 2021</td>
                        <td>
                          <label className="badge badge-success">
                            Approved
                          </label>
                        </td>
                        <td>
                          <span className="btn btn-primary btn-sm disabled">
                            Close
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerBusinessSettingsWithdrawList;
