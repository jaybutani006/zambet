import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function AdminAttributeView() {
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
              Attribute
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "10px" }}>
            <div className="card">
              <div className="card-header">Add New Attribute</div>
              <div className="card-body" style={{ textAlign: "left" }}>
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
                <div className="form-group  lang_form" id="en-form">
                  <input type="hidden" id="id" />
                  <label htmlFor="name">Attribute Name (EN)</label>
                  <input
                    type="text"
                    name="name[]"
                    className="form-control"
                    id="name"
                    placeholder="Enter Attribute Name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-md-7">
                    <h5>
                      Attribute Table <span style={{ color: "red" }}>(1)</span>
                    </h5>
                  </div>
                  <div className="col-12 col-md-5" style={{ width: "30vw" }}>
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
                          placeholder="Search by Attribute Name"
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
              <div
                className="card-body"
                style={{ padding: 0, textAlign: "left" }}
              >
                <div className="table-responsive">
                  <table
                    id="datatable"
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    style={{ width: "100%" }}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "30px" }}>SL#</th>
                        <th>Name </th>
                        <th style={{ width: "60px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Size</td>
                        <td style={{ width: "100px" }}>
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
                                className="dropdown-item  edit"
                                style={{ cursor: "pointer" }}
                                href="/admin/attribute/edit/1"
                              >
                                {" "}
                                Edit
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

export default AdminAttributeView;
