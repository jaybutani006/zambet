import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminCategoryEdit() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const [service, setService] = useState("");
  const navigate = useNavigate();
  const [mainState, setMainState] = useState({
    selected: {
      ...location?.state,
    //   category_icon_url: location?.state?.category_icon,
    },
    options: [
      { name: 1, value: 1 },
      { name: 2, value: 2 },
      { name: 3, value: 3 },
      { name: 4, value: 4 },
      { name: 5, value: 5 },
      { name: 6, value: 6 },
      { name: 7, value: 7 },
      { name: 8, value: 8 },
      { name: 9, value: 9 },
      { name: 10, value: 10 },
    ],
  });
  const getServiceName = () => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_BASEURL +
        "/api/services/detail?service_id=" +
        mainState.selected._id,
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data.data.service_name);
        setService(response.data.data.service_name);
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_icon") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files,
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 1)].map((item) =>
            URL.createObjectURL(item)
          );

          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files?.slice(0, 1),
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));

          window.alert("At Max 1 Images are allowed");
        }
      }
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    }
  };

  const handleUpdateServiceInfo = (e) => {
    e.preventDefault();
    console.log(mainState.selected);
    if (!service) {
      alert("Service Name can't be empty");
      return;
    }

    axios({
      method: "put",
      url:
        process.env.REACT_APP_BASEURL +
        "/api/services?service_id=" +
        mainState.selected._id,
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: { service_name: service },
    })
      .then(function (response) {
        console.log(response.data);
        alert("Successfully Edited");
        navigate("/admin/service/view");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
      });
  };

  const apiGetAllCategories = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
          allCategories: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => { apiGetAllCategories(); getServiceName(); }, [])

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
              Service
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Service form</div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <form>
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
                  <div className="row">
                    <div className="col-12 col-md-5">
                      <div className="form-group  lang_form" id="en-form">
                        <label className="input-label">Name (EN)</label>
                        <input
                          type="text"
                          name="category_name"
                          className="form-control"
                          placeholder="New Category"
                          value={service}
                          onChange={(event) => setService(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleUpdateServiceInfo}
                    className="btn btn-primary float-right"
                  >
                    Update
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

export default AdminCategoryEdit;
