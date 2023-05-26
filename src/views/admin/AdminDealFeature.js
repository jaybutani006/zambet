import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";
function AdminDealFeature() {
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
              {" "}
              Feature deal
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Deal form</div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <a
                        className="nav-link lang_link active"
                        href="#"
                        id="en-link"
                      >
                        english(EN)
                      </a>
                    </li>
                  </ul>
                  <div className="form-group">
                    <div className="row">
                      <input
                        type="text"
                        name="deal_type"
                        defaultValue="feature_deal"
                        className="d-none"
                      />
                      <div className="col-md-12  lang_form" id="en-form">
                        <label htmlFor="name">Title (EN)</label>
                        <input
                          type="text"
                          name="title[]"
                          className="form-control"
                          id="title"
                          placeholder="Ex : LUX"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="name">Start date</label>
                        <input
                          type="date"
                          name="start_date"
                          required
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="name">End date</label>
                        <input
                          type="date"
                          name="end_date"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary ">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div className="flex-between">
                    <div>
                      <h5>Feature deal Table</h5>
                    </div>
                    <div className="mx-1">
                      <h5 style={{ color: "red" }}>(1)</h5>
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
                          placeholder="Search by Title"
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
                        <th>Title</th>
                        <th>Start</th>
                        <th>End</th>
                        <th />
                        <th>Status</th>
                        <th style={{ width: "50px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mega Deal</td>
                        <td>01-Jun-21</td>
                        <td>05-Dec-21</td>
                        <td>
                          <a
                            href="/admin/deal/add-product/2"
                            className="btn btn-primary btn-sm"
                          >
                            Add Product
                          </a>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={2}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            href="/admin/deal/edit/2"
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </a>
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

export default AdminDealFeature;
