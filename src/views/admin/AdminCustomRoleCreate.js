import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminCustomRoleCreate() {
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
              Custom role
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Role form</div>
              <div className="card-body">
                <form id="submit-create-role" style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                  />{" "}
                  <div className="form-group">
                    <label htmlFor="name">Role name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      aria-describedby="emailHelp"
                      placeholder="Ex : Store"
                      required
                    />
                  </div>
                  <label htmlFor="name">Module permission : </label>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="order_management"
                          className="form-check-input"
                          id="order"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="order"
                        >
                          Order Management
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="product_management"
                          className="form-check-input"
                          id="product"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="product"
                        >
                          Product Management
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="marketing_section"
                          className="form-check-input"
                          id="marketing"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="marketing"
                        >
                          Marketing Section
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="business_section"
                          className="form-check-input"
                          id="business_section"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="business_section"
                        >
                          Business Section
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="user_section"
                          className="form-check-input"
                          id="user_section"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="user_section"
                        >
                          User Section
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="support_section"
                          className="form-check-input"
                          id="support_section"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="support_section"
                        >
                          Support Section
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="business_settings"
                          className="form-check-input"
                          id="business_settings"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="business_settings"
                        >
                          Business Settings
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="web_&_app_settings"
                          className="form-check-input"
                          id="web_&_app_settings"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="web_&_app_settings"
                        >
                          Web &amp; App Settings
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="report"
                          className="form-check-input"
                          id="report"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="report"
                        >
                          Report &amp; Analytics
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="employee_section"
                          className="form-check-input"
                          id="employee_section"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="employee_section"
                        >
                          Employee Section
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="dashboard"
                          className="form-check-input"
                          id="dashboard"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="dashboard"
                        >
                          Dashboard
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="modules[]"
                          defaultValue="pos_management"
                          className="form-check-input"
                          id="pos_management"
                        />
                        <label
                          className="form-check-label"
                          style={{}}
                          htmlFor="pos_management"
                        >
                          Pos management
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Roles table</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="dataTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div
                          className="dataTables_length"
                          id="dataTable_length"
                        >
                          <label>
                            Show{" "}
                            <select
                              name="dataTable_length"
                              aria-controls="dataTable"
                              className="custom-select custom-select-sm form-control form-control-sm"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>{" "}
                            entries
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div
                          id="dataTable_filter"
                          className="dataTables_filter"
                        >
                          <label>
                            Search:
                            <input
                              type="search"
                              className="form-control form-control-sm"
                              placeholder
                              aria-controls="dataTable"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table table-bordered dataTable no-footer"
                          id="dataTable"
                          width="100%"
                          cellSpacing={0}
                          style={{ textAlign: "left", width: "100%" }}
                          role="grid"
                          aria-describedby="dataTable_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                scope="col"
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="SL#: activate to sort column descending"
                                style={{ width: "141.837px" }}
                              >
                                SL#
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Role name: activate to sort column ascending"
                                style={{ width: "357.75px" }}
                              >
                                Role name
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Modules: activate to sort column ascending"
                                style={{ width: "249.375px" }}
                              >
                                Modules
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Created at: activate to sort column ascending"
                                style={{ width: "284.025px" }}
                              >
                                Created at
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Status: activate to sort column ascending"
                                style={{ width: "207.613px" }}
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                style={{ width: "50px" }}
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Action: activate to sort column ascending"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr role="row" className="odd">
                              <th scope="row" className="sorting_1">
                                1
                              </th>
                              <td>banner manager</td>
                              <td className="text-capitalize">
                                messages <br />
                                banner <br />
                              </td>
                              <td>08-Mar-21</td>
                              <td>active</td>
                              <td>
                                <a
                                  href="/admin/custom-role/update/4"
                                  className="btn btn-primary btn-sm"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr role="row" className="even">
                              <th scope="row" className="sorting_1">
                                2
                              </th>
                              <td>product manager</td>
                              <td className="text-capitalize">
                                product <br />
                                order <br />
                                category <br />
                              </td>
                              <td>05-Dec-20</td>
                              <td>active</td>
                              <td>
                                <a
                                  href="/admin/custom-role/update/3"
                                  className="btn btn-primary btn-sm"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr role="row" className="odd">
                              <th scope="row" className="sorting_1">
                                3
                              </th>
                              <td>Employee</td>
                              <td className="text-capitalize">
                                product <br />
                                order <br />
                                category <br />
                                brand <br />
                                employee <br />
                                coupon <br />
                                messages <br />
                                banner <br />
                                attribute <br />
                              </td>
                              <td>31-Dec-69</td>
                              <td>active</td>
                              <td>
                                <a
                                  href="/admin/custom-role/update/2"
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
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          id="dataTable_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to 3 of 3 entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="dataTable_paginate"
                        >
                          <ul className="pagination">
                            <li
                              className="paginate_button page-item previous disabled"
                              id="dataTable_previous"
                            >
                              <a
                                href="#"
                                aria-controls="dataTable"
                                data-dt-idx={0}
                                tabIndex={0}
                                className="page-link"
                              >
                                Previous
                              </a>
                            </li>
                            <li className="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="dataTable"
                                data-dt-idx={1}
                                tabIndex={0}
                                className="page-link"
                              >
                                1
                              </a>
                            </li>
                            <li
                              className="paginate_button page-item next disabled"
                              id="dataTable_next"
                            >
                              <a
                                href="#"
                                aria-controls="dataTable"
                                data-dt-idx={2}
                                tabIndex={0}
                                className="page-link"
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
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

export default AdminCustomRoleCreate;
