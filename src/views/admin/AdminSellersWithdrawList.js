import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminSellersWithdrawList() {
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
              Withdraw{" "}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  Withdraw Request Table
                  <span style={{ color: "red" }}>(9)</span>
                </h5>
                <select
                  name="withdraw_status_filter"
                  onchange="status_filter(this.value)"
                  className="custom-select float-right"
                  style={{ width: "200px" }}
                >
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                  <option value="pending">Pending</option>
                </select>
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
                        <th>Amount</th>
                        <th>Name</th>
                        <th>Request time</th>
                        <th>Status</th>
                        <th style={{ width: "5px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">1</td>
                        <td>577.51$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2022-04-13 06:09:15</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/10/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">2</td>
                        <td>646.41$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2022-02-05 05:02:24</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/9/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">3</td>
                        <td>343.00$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-10-30 07:16:18</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/8/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">4</td>
                        <td>397.00$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-10-30 07:12:33</td>
                        <td>
                          <label className="badge badge-danger">Denied</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/7/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">5</td>
                        <td>920.00$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-10-29 15:04:16</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/6/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">6</td>
                        <td>7,350.00$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-10-29 10:45:25</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/5/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">7</td>
                        <td>878.35$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-10-19 20:24:34</td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/4/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">8</td>
                        <td>15.00$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-06-05 14:17:29</td>
                        <td>
                          <label className="badge badge-danger">Denied</label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/2/1"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">9</td>
                        <td>20.00$</td>
                        <td>
                          <a href="/admin/sellers/view/1">John Doe</a>
                        </td>
                        <td>2021-06-05 14:14:14</td>
                        <td>
                          <label className="badge badge-success">
                            Approved
                          </label>
                        </td>
                        <td>
                          <a
                            href="/admin/sellers/withdraw-view/1/1"
                            className="btn btn-primary btn-sm"
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
        </div>
      </div>
    </main>
  );
}

export default AdminSellersWithdrawList;
