import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminReviewsList() {
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
              Reviews
            </li>
          </ol>
        </nav>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-header">
                <div className="flex-between row justify-content-between flex-grow-1 mx-1">
                  <div className="col-12 col-sm-6">
                    <div className="flex-start">
                      <div>
                        <h5>Review Table</h5>
                      </div>
                      <div className="mx-1">
                        <h5 style={{ color: "rgb(252, 59, 10)" }}>(5)</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-5">
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
                          placeholder="Search by Product or Customer"
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
                <div className="table-responsive datatable-custom">
                  <table
                    id="columnSearchDatatable"
                    style={{ textAlign: "left" }}
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    data-hs-datatables-options='{
                              "order": [],
                              "orderCellsTop": true
                          }'
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>#Sl</th>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Review</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <span className="d-block font-size-sm text-body">
                            <a href="/admin/product/view/14">
                              OXO good grips 11-pound stainless steel food scale
                              with pull-out display
                            </a>
                          </span>
                        </td>
                        <td>
                          <a href="/admin/customer/view/12">Marjhan Sultana</a>
                        </td>
                        <td>
                          <p>Very Good</p>
                        </td>
                        <td>
                          <label className="badge badge-soft-info">
                            5 <i className="tio-star" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <span className="d-block font-size-sm text-body">
                            <a href="/admin/product/view/3">
                              Subrtex 1-piece knit jacquard spandex stretch ,
                              sofa, milky
                            </a>
                          </span>
                        </td>
                        <td>
                          <a href="/admin/customer/view/12">Marjhan Sultana</a>
                        </td>
                        <td>
                          <p>
                            Gooooooooooooooooooooooooooooooooooooooooooodddddd...
                          </p>
                        </td>
                        <td>
                          <label className="badge badge-soft-info">
                            5 <i className="tio-star" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <span className="d-block font-size-sm text-body">
                            <a href="/admin/product/view/13">
                              Home decorators collection boswell quarter 14 in.
                            </a>
                          </span>
                        </td>
                        <td>
                          <a href="/admin/customer/view/20">Fatema subarna</a>
                        </td>
                        <td>
                          <p>abc</p>
                        </td>
                        <td>
                          <label className="badge badge-soft-info">
                            5 <i className="tio-star" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          <span className="d-block font-size-sm text-body">
                            <a href="/admin/product/view/13">
                              Home decorators collection boswell quarter 14 in.
                            </a>
                          </span>
                        </td>
                        <td>
                          <a href="/admin/customer/view/3">Nipon Doe</a>
                        </td>
                        <td>
                          <p>One of the best product</p>
                        </td>
                        <td>
                          <label className="badge badge-soft-info">
                            5 <i className="tio-star" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          <span className="d-block font-size-sm text-body">
                            <a href="/admin/product/view/19">
                              Apple iPhone XS max, 256GB, gold - fully unlocked
                            </a>
                          </span>
                        </td>
                        <td>
                          <a href="/admin/customer/view/5">Sabrina Proma</a>
                        </td>
                        <td>
                          <p>good</p>
                        </td>
                        <td>
                          <label className="badge badge-soft-info">
                            5 <i className="tio-star" />
                          </label>
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

export default AdminReviewsList;
