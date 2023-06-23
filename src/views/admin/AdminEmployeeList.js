import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminEmployeeList() {
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
              Employee
            </li>
            <li className="breadcrumb-item" aria-current="page">
              List
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div>
                  <h5>
                    Employee table
                    <span style={{ color: "red", padding: "0 .4375rem" }}>
                      (0)
                    </span>
                  </h5>
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
                        type="search"
                        name="search"
                        className="form-control"
                        placeholder="Search by name or email or phone"
                        defaultValue
                        required
                      />
                      <button type="submit" className="btn btn-primary">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <a
                    href="/admin/employee/add-new"
                    className="btn btn-primary  float-right"
                  >
                    <i className="tio-add-circle" />
                    <span className="text">Add New</span>
                  </a>
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
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th style={{ width: "50px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
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

export default AdminEmployeeList;
