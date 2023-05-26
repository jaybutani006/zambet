import React from "react";
import { Link } from "react-router-dom";

function AdminTransactionRefundList() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid ">
        <div className="col-md-4" style={{ marginBottom: "20px" }}>
          <h3 className="text-capitalize">
            Refund transaction table
            <span className="badge badge-soft-dark mx-2">0</span>
          </h3>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex-between justify-content-between align-items-center flex-grow-1">
              <div className="col-md-5 ">
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
                      placeholder="Search by orders id  or refund id"
                      aria-label="Search orders"
                      defaultValue
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
                    <th>Refund id</th>
                    <th>Order id</th>
                    <th>Payment method</th>
                    <th>Payment status</th>
                    <th>Amount</th>
                    <th>Transaction type</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div className="text-center p-4">
                <img
                  className="mb-3"
                  alt="Image Description"
                  style={{ width: "7rem" }}
                />
                <p className="mb-0">No data to show</p>
              </div>
            </div>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </main>
  );
}

export default AdminTransactionRefundList;
