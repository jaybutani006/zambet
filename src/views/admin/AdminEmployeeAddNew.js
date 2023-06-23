import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminEmployeeAddNew() {
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
              Employee add
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Employee form</div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                  />{" "}
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Ex : Md. Al Imrun"
                          defaultValue
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="name">Phone</label>
                        <input
                          type="number"
                          name="phone"
                          defaultValue
                          className="form-control"
                          id="phone"
                          placeholder="Ex : +88017********"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="name">Email</label>
                        <input
                          type="email"
                          name="email"
                          defaultValue
                          className="form-control"
                          id="email"
                          placeholder="Ex : ex@gmail.com"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="name">Role</label>
                        <select
                          className="form-control"
                          name="role_id"
                          style={{ width: "100%" }}
                        >
                          <option value={0} selected disabled>
                            ---Select---
                          </option>
                          <option value={2}>Employee</option>
                          <option value={3}>product manager</option>
                          <option value={4}>banner manager</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="name">Password</label>
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="name">Employee image</label>
                        <span className="badge badge-soft-danger">
                          ( Ratio 1:1 )
                        </span>
                        <br />
                        <div className="form-group">
                          <div className="custom-file text-left">
                            <input
                              type="file"
                              name="image"
                              id="customFileUpload"
                              className="custom-file-input"
                              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                              required
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFileUpload"
                            >
                              Choose File
                            </label>
                          </div>
                        </div>
                        <div className="text-center">
                          <img
                            style={{
                              width: "auto",
                              border: "1px solid",
                              borderRadius: "10px",
                              maxHeight: "200px",
                            }}
                            id="viewer"
                            src="https://6valley.6amtech.com/public\assets\back-end\img\400x400\img2.jpg"
                            alt="Product thumbnail"
                          />
                        </div>
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
      </div>
    </main>
  );
}

export default AdminEmployeeAddNew;
