import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminNotificationAddNew() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [list, setList] = useState("");
  const [to, setTo] = useState("");
  const [scope, setScope] = useState("");

  const handleSendNotification = () => {
    const config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/bulk/notification",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        scope: scope,
        to: to,
        list: list,
        title: title,
        body: body,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        alert("Sent Notifications Successfully");
        // navigate("/seller/dashboard", { replace: true });
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

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
              Notification
            </li>
          </ol>
        </nav>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-header">
                <h1 className="page-header-title">Notification </h1>
              </div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Title{" "}
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="New notification"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Description{" "}
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image </label>
                    <small style={{ color: "red" }}> ( Ratio 3:1 )</small>
                    <div className="custom-file" style={{ textAlign: "left" }}>
                      <input
                        type="file"
                        name="image"
                        id="customFileEg1"
                        className="custom-file-input"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileEg1"
                      >
                        Choose file
                      </label>
                    </div>
                    <hr />
                    <center>
                      <img
                        style={{
                          width: "20%",
                          border: "1px solid",
                          borderRadius: "10px",
                        }}
                        id="viewer"
                        alt="image"
                      />
                    </center>
                  </div>
                  <hr />
                  <button type="submit" className="btn btn-primary">
                    Send Notification{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <hr />
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div className="flex-between">
                    <div>Notification Table</div>
                    <div className="mx-1">
                      <h5 style={{ color: "red" }}>(0)</h5>
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
              <div className="table-responsive datatable-custom">
                <table
                  style={{ textAlign: "left" }}
                  className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th>#Sl </th>
                      <th style={{ width: "50%" }}>Title </th>
                      <th>Description </th>
                      <th>Image </th>
                      <th>Status </th>
                      <th style={{ width: "10%" }}>Action </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
                <hr />
                <table>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminNotificationAddNew;
