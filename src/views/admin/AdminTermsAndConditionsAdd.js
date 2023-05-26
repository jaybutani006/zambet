import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminTermsAndConditionsAdd(props) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const policyId =
    location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
    "";
  const [policyName, setPolicyName] = useState("");
  const [policyContent, setPolicyContent] = useState("");

  const handleQuillChange = (val) => {
    setPolicyContent(val);
  };

  const handleAddPolicy = () => {
    if (!policyName) {
      return alert(`TermsAndConditions title can not be empty`);
    }
    if (!policyContent) {
      return alert(`TermsAndConditions content can not be empty`);
    }
    const config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/term_condition",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        title: policyName,
        content: policyContent,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/admin/dashboard", { replace: true });
        // setPolicyList(Object.entries(response.data.data?.[0]));
        // setResPolicyList({ ...response.data.data?.[0] });
        // setPolicyContent(response.data.data?.[0]?.[policyType]);
        alert(`TermsandConditions Added Successfully`);
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
      });
  };

  const getPolicyList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/policy",
      params: {
        policyId: policyId,
      },
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/admin/dashboard", { replace: true });
        // setPolicyList(Object.entries(response.data.data?.[0]));
        // setResPolicyList({ ...response.data.data?.[0] });
        // setPolicyContent();
        // setPolicyName();
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getPolicyList();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {"Add T&Cs"}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>{"Add T&Cs"}</h2>
                  </div>
                </div>
              </div>
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setPolicyName(e.target.value)}
                      value={policyName}
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <ReactQuill
                        theme="snow"
                        value={policyContent}
                        onChange={handleQuillChange}
                        // onChange={(editor) => console.log(editor)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        className="form-control btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddPolicy();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminTermsAndConditionsAdd;
