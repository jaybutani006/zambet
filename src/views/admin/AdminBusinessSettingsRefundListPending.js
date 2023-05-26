import React from "react";

function AdminBusinessSettingsRefundListPending() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header mb-1">
          <div className="flex-between align-items-center">
            <div>
              <h1 className="page-header-title">
                Refund request list{" "}
                <span className="badge badge-soft-dark mx-2">0</span>
              </h1>
            </div>
            <div>
              <i className="tio-shopping-cart" style={{ fontSize: "30px" }} />
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
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="row flex-between justify-content-between flex-grow-1">
                <div className="col-12 col-md-4">
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
                        placeholder="Search by order id or refund id"
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
                <div className="col-12 mt-2 col-md-8">
                  <div className="float-right">
                    <label> Inhouse orders only : </label>
                    <label className="switch ml-3">
                      <input
                        type="checkbox"
                        className="status"
                        onclick="filter_order()"
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive datatable-custom">
              <table
                className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                style={{ width: "100%", textAlign: "left" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th className>SL#</th>
                    <th>Refund id</th>
                    <th>Order id </th>
                    <th>Customer name</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Product name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div className="card-footer">
              <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
                <div className="col-sm-auto">
                  <div className="d-flex justify-content-center justify-content-sm-end"></div>
                </div>
              </div>
            </div>
            <div className="text-center p-4">
              <img
                className="mb-3"
                src="https://6valley.6amtech.com/public/assets/back-end/svg/illustrations/sorry.svg"
                alt="Image Description"
                style={{ width: "7rem" }}
              />
              <p className="mb-0">No data to show</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsRefundListPending;
