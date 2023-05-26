import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminContactList() {
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
              Customer Message
            </li>
          </ol>
        </nav>
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h1 className="h3 mb-0 text-black-50">Customer Message List</h1>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between align-items-center flex-grow-1">
                  <div className="flex-start col-lg-3 mb-3 mb-lg-0">
                    <h5>Customer Message Table </h5>
                    <h5 style={{ color: "red", marginLeft: "5px" }}>(1)</h5>
                  </div>
                  <div className="col-lg-6">
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
                          placeholder="Search by Name or Mobile No or Email"
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
                        <th>Name</th>
                        <th>Mobile no</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Al Imrun Khandakar</td>
                        <td>+8801759412381</td>
                        <td>md.alimrun@gmail.com</td>
                        <td>Electronics not working</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="tio-settings" />
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <a
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                href="/admin/contact/view/1"
                              >
                                {" "}
                                View
                              </a>
                              <a
                                className="dropdown-item delete"
                                style={{ cursor: "pointer" }}
                                id={1}
                              >
                                {" "}
                                Delete
                              </a>
                            </div>
                          </div>
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

export default AdminContactList;
