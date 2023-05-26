import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminBusinessSettingsSocialMedia() {
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
              Social Media
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Social media form</div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                  />{" "}
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="name" className>
                          Name
                        </label>
                        <select
                          className="form-control"
                          name="name"
                          id="name"
                          style={{ width: "100%" }}
                        >
                          <option>---Select---</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="twitter">Twitter</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="pinterest">Pinterest</option>
                          <option value="google-plus">Google plus</option>
                        </select>
                      </div>
                      <div className="col-md-12 mt-2">
                        <input type="hidden" id="id" />
                        <label htmlFor="link" className>
                          Social media link
                        </label>
                        <input
                          type="text"
                          name="link"
                          className="form-control"
                          id="link"
                          placeholder="Enter Social Media Link"
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        <input type="hidden" id="id" />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <a
                      id="add"
                      className="btn btn-primary"
                      style={{ color: "white" }}
                    >
                      Save
                    </a>
                    <a
                      id="update"
                      className="btn btn-primary"
                      style={{ display: "none", color: "#fff" }}
                    >
                      Update
                    </a>
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
                <h5>Social media table</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing={0}
                    style={{ textAlign: "left" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Sl</th>
                        <th scope="col">Name</th>
                        <th scope="col">Link</th>
                        <th scope="col">Status</th>
                        <th scope="col" style={{ width: "120px" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          className="column_name"
                          data-column_name="sl"
                          data-id={6}
                        >
                          1
                        </td>
                        <td
                          className="column_name"
                          data-column_name="name"
                          data-id={6}
                        >
                          facebook
                        </td>
                        <td
                          className="column_name"
                          data-column_name="slug"
                          data-id={6}
                        >
                          https://www.facebook.com/
                        </td>
                        <td
                          className="column_name"
                          data-column_name="status"
                          data-id={6}
                        >
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={6}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-xs edit"
                            id={6}
                          >
                            Edit
                          </a>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="column_name"
                          data-column_name="sl"
                          data-id={5}
                        >
                          2
                        </td>
                        <td
                          className="column_name"
                          data-column_name="name"
                          data-id={5}
                        >
                          instagram
                        </td>
                        <td
                          className="column_name"
                          data-column_name="slug"
                          data-id={5}
                        >
                          https://www.instagram.com/
                        </td>
                        <td
                          className="column_name"
                          data-column_name="status"
                          data-id={5}
                        >
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={5}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-xs edit"
                            id={5}
                          >
                            Edit
                          </a>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="column_name"
                          data-column_name="sl"
                          data-id={4}
                        >
                          3
                        </td>
                        <td
                          className="column_name"
                          data-column_name="name"
                          data-id={4}
                        >
                          pinterest
                        </td>
                        <td
                          className="column_name"
                          data-column_name="slug"
                          data-id={4}
                        >
                          https://www.pinterest.com/
                        </td>
                        <td
                          className="column_name"
                          data-column_name="status"
                          data-id={4}
                        >
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={4}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-xs edit"
                            id={4}
                          >
                            Edit
                          </a>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="column_name"
                          data-column_name="sl"
                          data-id={3}
                        >
                          4
                        </td>
                        <td
                          className="column_name"
                          data-column_name="name"
                          data-id={3}
                        >
                          google-plus
                        </td>
                        <td
                          className="column_name"
                          data-column_name="slug"
                          data-id={3}
                        >
                          https://www.google.com/
                        </td>
                        <td
                          className="column_name"
                          data-column_name="status"
                          data-id={3}
                        >
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
                            type="button"
                            className="btn btn-primary btn-xs edit"
                            id={3}
                          >
                            Edit
                          </a>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="column_name"
                          data-column_name="sl"
                          data-id={2}
                        >
                          5
                        </td>
                        <td
                          className="column_name"
                          data-column_name="name"
                          data-id={2}
                        >
                          linkedin
                        </td>
                        <td
                          className="column_name"
                          data-column_name="slug"
                          data-id={2}
                        >
                          https://www.linkedin.com/
                        </td>
                        <td
                          className="column_name"
                          data-column_name="status"
                          data-id={2}
                        >
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
                            type="button"
                            className="btn btn-primary btn-xs edit"
                            id={2}
                          >
                            Edit
                          </a>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="column_name"
                          data-column_name="sl"
                          data-id={1}
                        >
                          6
                        </td>
                        <td
                          className="column_name"
                          data-column_name="name"
                          data-id={1}
                        >
                          twitter
                        </td>
                        <td
                          className="column_name"
                          data-column_name="slug"
                          data-id={1}
                        >
                          https://twitter.com/?lang=en
                        </td>
                        <td
                          className="column_name"
                          data-column_name="status"
                          data-id={1}
                        >
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
                            type="button"
                            className="btn btn-primary btn-xs edit"
                            id={1}
                          >
                            Edit
                          </a>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsSocialMedia;
