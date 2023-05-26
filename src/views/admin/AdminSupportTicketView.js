import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function AdminSupportTicketView() {
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
              Support Ticket
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div className="flex-start">
                    <div>
                      <h5>Support Ticket</h5>
                    </div>
                    <div className="mx-1">
                      <h5 style={{ color: "red" }}>(3)</h5>
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
                          placeholder="Search by Subject"
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
                      <tr className="text-center">
                        <th>SL#</th>
                        <th>Subject</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td>1</td>
                        <td>hfghh</td>
                        <td>low</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={3}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            href="/admin/support-ticket/single-ticket/3"
                            className="btn btn-primary   btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>2</td>
                        <td>test 1</td>
                        <td>low</td>
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
                            href="/admin/support-ticket/single-ticket/2"
                            className="btn btn-primary   btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>3</td>
                        <td>test</td>
                        <td>low</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={1}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            href="/admin/support-ticket/single-ticket/1"
                            className="btn btn-primary   btn-sm"
                          >
                            View
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
          <div className="footer">
            <div className="row justify-content-between align-items-center">
              <div className="col">
                <p className="font-size-sm mb-0">
                  {" "}
                  <span className="d-none d-sm-inline-block">
                    Copyright © 2022 Zambet
                  </span>
                </p>
              </div>
              <div className="col-auto">
                <div className="d-flex justify-content-end">
                  <ul className="list-inline list-separator">
                    <li className="list-inline-item">
                      <a
                        className="list-separator-link"
                        href="/admin/business-settings/web-config"
                      >
                        {" "}
                        Settings
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        className="list-separator-link"
                        href="/admin/helpTopic/list"
                      >
                        FAQ
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <div className="hs-unfold">
                        <Link
                          className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                          to="/admin/dashboard"
                        >
                          <i className="tio-home-outlined" />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="logoutModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ready to Leave?
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select Logout below if you are ready to end your current
                  session.
                </div>
                <div className="modal-footer">
                  <form>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                    />{" "}
                    <button
                      className="btn btn-danger"
                      type="button"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" id="popup-modal">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <center>
                        <h2 style={{ color: "rgba(96,96,96,0.68)" }}>
                          <i className="tio-shopping-cart-outlined" /> You have
                          new order, Check Please.
                        </h2>
                        <hr />
                        <button
                          onclick="check_order()"
                          className="btn btn-primary"
                        >
                          Ok, let me check
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSupportTicketView;
