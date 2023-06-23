import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminTermsAndConditionsView(props) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const policyId =
    location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
    "";
  const [policyName, setPolicyName] = useState("");
  const [policyContent, setPolicyContent] = useState("");

  const getPolicyList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/term_condition",
      params: {
        _id: policyId,
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
        setPolicyName(response.data?.data?.[0]?.title);
        setPolicyContent(response.data?.data?.[0]?.content);
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
              {policyName || ""}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>{policyName || ""}</h2>
                  </div>
                </div>
              </div>
              <form
                action="/admin/business-settings/terms-condition"
                method="post"
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="KSypVlXgERlHl2QtOrLlx2wIU3e4ZYY3ydFQ0dPg"
                />{" "}
                <div className="card-body">
                  <div className="form-group">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: policyContent || "",
                      }}
                    ></div>
                  </div>
                  {/* <div className="form-group">
                    <div className="col-md-12">
                      <input
                        className="form-control btn-primary"
                        // type="submit"
                        // title="Submit"
                        onClick={(e) => e.preventDefault()}
                        value="Submit"
                      />
                    </div>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminTermsAndConditionsView;
