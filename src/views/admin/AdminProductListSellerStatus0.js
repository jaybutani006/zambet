import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminProductListSellerStatus0() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Products
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 mb-1 col-md-4">
                    <h5 className="flex-between">
                      <div>Product table (2)</div>
                    </h5>
                  </div>
                  <div
                    className="col-12 mb-1 col-md-5"
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
                        <input type="hidden" defaultValue={0} name="status" />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 col-md-3">
                    <a
                      href="/admin/product/add-new"
                      className="btn btn-primary  float-right"
                    >
                      <i className="tio-add-circle" />
                      <span className="text">Add new product</span>
                    </a>
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
                        <th>Featured</th>
                        <th>Active Status</th>
                        <th style={{ width: "5px" }} className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <a href="/admin/product/view/68">
                            BLU VIVO X6 | 2021 |...
                          </a>
                        </td>
                        <td>80.00$</td>
                        <td>89.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('68')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input type="checkbox" className="status" id={68} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/68"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/68"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-68','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-68">
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                            />{" "}
                            <input
                              type="hidden"
                              name="_method"
                              defaultValue="delete"
                            />{" "}
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          <a href="/admin/product/view/67">
                            Electronics Galaxy A...
                          </a>
                        </td>
                        <td>390.00$</td>
                        <td>399.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('67')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input type="checkbox" className="status" id={67} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/67"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/67"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-67','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-67">
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
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
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminProductListSellerStatus0;
