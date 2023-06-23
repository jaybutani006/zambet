import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

function SellerContactCenterAdd() {
  const [state, dispatch] = useContext(Context);
  const initialState = {};
  const [mainState, setMainState] = useState(initialState);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleAddContactCenter = () => {
    let isValid = true;

    if (!message) {
      isValid = false;
      return alert("Message Can not be empty or invalid");
    }
    if (!type) {
      isValid = false;
      return alert("Type can not be empty or invalid");
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/contectcenter",
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: state.sellerToken,
      },
      data: JSON.stringify({
        message: message,
        type: type,
      }),
    })
      .then((response) => {
        console.log(response.data);
        setMessage("");
        setType("");
        alert("Successfully Submitted to Contact-Center");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
        // alert("Something went wrong");
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
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="align-items-center">
                  <div className="col-sm mb-2 mb-sm-0">
                    <h1 className="page-header-title">
                      <i className="tio-add-circle-outlined" /> Add New
                    </h1>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Message
                        </label>
                        <input
                          type="text"
                          name="message"
                          className="form-control"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="form-group">
                        <label className="input-label" htmlFor="priority">
                          Type
                          <span>
                            <i
                              className="tio-info-outined m-1"
                              title="The lowest number will get the highest priority"
                            />
                          </span>
                        </label>
                        <select
                          className="form-control"
                          name="type"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {true || mainState.options.length
                            ? [
                                {
                                  id: "",
                                  name: "Suggestion",
                                  value: "suggestion",
                                },
                                {
                                  id: "",
                                  name: "Complaint",
                                  value: "complaint",
                                },
                                {
                                  id: "",
                                  name: "Contact-Center",
                                  value: "contactcenter",
                                },
                              ].map((item) => (
                                <option
                                  value={item?.value}
                                  selected={item?.value == type}
                                >
                                  {item?.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
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
                          Password
                        </label>
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          value={mainState?.password}
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
                          Confirm Password
                        </label>
                        <input
                          type="text"
                          name="conpassword"
                          className="form-control"
                          value={mainState?.conpassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Status
                        </label>
                        <input
                          type="checkbox"
                          name="status"
                          // className="form-control"
                          checked={mainState?.status}
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
                          IsSubAdmin
                        </label>
                        <input
                          type="checkbox"
                          name="is_subadmin"
                          // className="form-control"
                          checked={mainState?.is_subadmin}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div> */}
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddContactCenter();
                    }}
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

export default SellerContactCenterAdd;
