import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminPoliciesEdit(props) {
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

  const handleUpdatePolicy = () => {
    if (!policyName) {
      return alert(`Policy Name can not be empty`);
    }
    if (!policyContent) {
      return alert(`Policy Name can not be empty`);
    }
    const config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/policy",
      params: {
        policyId: policyId,
      },
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        name: policyName,
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
        alert(`Policy Updated Successfully`);
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
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
        "Content-Type": "application/json",
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
        // setPolicyContent(response.data.data?.[0]?.[policyType]);
        setPolicyName(response.data?.data?.name);
        setPolicyContent(response.data?.data?.content);
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
              {"Policy"}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>{"Policy"}</h2>
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
                      Name
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
                          handleUpdatePolicy();
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

export default AdminPoliciesEdit;
