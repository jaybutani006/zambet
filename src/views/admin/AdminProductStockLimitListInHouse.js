import React from "react";

function AdminProductStockLimitListInHouse() {
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
            <div className="col-12 mb-2 mb-sm-0">
              <h1 className="page-header-title text-capitalize">
                <i className="tio-files" /> Stock limit products list
                <span className="badge badge-soft-dark ml-2">0</span>
              </h1>
              <span>
                The products are shown in this list which quantity is below 10
              </span>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-md-12 col-lg-4">
                    <h5>Product table (0)</h5>
                  </div>
                  <div className="col-12 mt-1 col-md-6 col-lg-4">
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
                        <input type="hidden" defaultValue name="status" />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 mt-1 col-md-6 col-lg-3">
                    <select
                      name="qty_ordr_sort"
                      className="form-control"
                    >
                      <option value="default">Default sort</option>
                      <option value="quantity_asc">
                        Quantity sort by (low to high)
                      </option>
                      <option value="quantity_desc">
                        Quantity sort by (high to low)
                      </option>
                      <option value="order_asc">
                        Order sort by (low to high)
                      </option>
                      <option value="order_desc">
                        Order sort by (high to low)
                      </option>
                    </select>
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
                        <th>Purchase price</th>
                        <th>Selling price</th>
                        <th>Quantity</th>
                        <th>Orders</th>
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
      <div className="modal fade" id="update-quantity" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form className="row">
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                />{" "}
                <div
                  className="card mt-2 rest-part"
                  style={{ width: "100%" }}
                />
                <div className="form-group col-sm-12 card card-footer">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminProductStockLimitListInHouse;
