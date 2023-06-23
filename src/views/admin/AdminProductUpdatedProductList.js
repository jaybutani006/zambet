import React from "react";

function AdminProductUpdatedProductList() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 mb-1 col-md-4">
                    <h5 className="flex-between">
                      <div>Product table (0)</div>
                    </h5>
                  </div>
                  <div
                    className="col-12 mb-1 col-md-3"
                    style={{ width: "40vw" }}
                  >
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
                          placeholder="Search Product Name"
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
                        <th>Product Name</th>
                        <th>Previous shipping cost</th>
                        <th>New shipping cost</th>
                        <th style={{ width: "5px" }} className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
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
        </div>
      </div>
    </main>
  );
}

export default AdminProductUpdatedProductList;
