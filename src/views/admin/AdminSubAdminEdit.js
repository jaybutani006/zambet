import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSubAdminEdit() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const initialState = {};
  const [mainState, setMainState] = useState({
    ...location?.state,
    full_name: location?.state?.user_data?.[0]?.full_name,
    city: location?.state?.user_data?.[0]?.city,
    email_address: location?.state?.user_data?.[0]?.email_address,
    contect_no: location?.state?.user_data?.[0]?.contect_no,
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "is_subadmin" || name === "status") {
      setMainState((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "contect_no") {
      if (value.toString().length > 10) {
        alert("phone must be of 10 digits");
        return;
      }
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkValidation = () => {
    if (!mainState.full_name) {
      alert("Full name can't be empty");
      return false;
    } else if (!mainState.email_address) {
      alert("Email can't be empty");
      return false;
      // } else if (!mainState.password) {
      //   alert("Password can't be empty");
      //   return false;
      // } else if (!mainState.conpassword) {
      //   alert("Confirm Password can't be empty");
      //   return false;
      // } else if (mainState.conpassword !== mainState.password) {
      //   alert("Confirm Password does not match with Password");
      //   return false;
    } else if (!mainState.contect_no) {
      alert("Phone can't be empty");
      return false;
    } else if (!mainState.city) {
      alert("City can't be empty");
      return false;
    }

    return true;
  };

  const handleUpdateSubAdminProfile = (e) => {
    e.preventDefault();

    const isValid = checkValidation();

    if (isValid) {
      const newState = { ...mainState };

      axios({
        method: "put",
        url: process.env.REACT_APP_BASEURL + "/api/admin/subadmin",
        params: {
          _id: mainState?._id,
        },
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: state.adminToken,
        },
        data: JSON.stringify({
          full_name: newState.full_name,
          email_address: newState.email_address,
          // password: newState.password,
          contect_no: newState.contect_no,
          // status: !!newState ? "active" : "deactive",
          // is_subadmin: !!newState,
          city: newState.city,
        }),
      })
        .then((response) => {
          console.log(response.data);
          alert("Successfully Added Sub Admin");
          setMainState(initialState);
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    }
  };

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">
                <i className="tio-edit" /> Update Sub-Admin
              </h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          className="form-control"
                          value={mainState?.full_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={mainState?.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email_address"
                          className="form-control"
                          value={mainState?.email_address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          name="contect_no"
                          className="form-control"
                          value={mainState?.contect_no}
                          // onChange={handleInputChange}
                          onChange={() => { }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleUpdateSubAdminProfile}
                  >
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

export default AdminSubAdminEdit;
