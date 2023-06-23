import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminCouponsEdit(props) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const policyId =
    location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
    "";
  const [policyName, setPolicyName] = useState("");
  const [policyContent, setPolicyContent] = useState("");
  const [name, setName] = useState(location?.state?.name || "");
  const [type, setType] = useState(location?.state?.type || "");
  const [value, setValue] = useState(location?.state?.value || "");
  const [validFrom, setValidFrom] = useState(location?.state?.validFrom || "");
  const [validUpto, setValidUpto] = useState(location?.state?.validUpto || "");

  const handleQuillChange = (val) => {
    setPolicyContent(val);
  };

  const handleUpdatePolicy = () => {
    if (!name) {
      return alert(`name can not be empty`);
    }
    if (!type) {
      return alert(`type can not be empty`);
    }
    if (!value) {
      return alert(`value can not be empty`);
    }
    if (!validFrom) {
      return alert(`validFrom can not be empty`);
    }
    if (!validUpto) {
      return alert(`validUpto can not be empty`);
    }
    const config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/coupon_code",
      params: { _id: policyId },
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        name: name,
        type: type,
        value: value,
        validFrom: validFrom,
        validUpto: validUpto,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/admin/dashboard", { replace: true });
        // setPolicyList(Object.entries(response.data.data?.[0]));
        // setResPolicyList({ ...response.data.data?.[0] });
        // setPolicyContent(response.data.data?.[0]?.[policyType]);
        alert(`Coupon Updated Successfully`);
        navigate("/admin/coupons/list");
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
              {"Coupon"}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>{"Edit Coupon"}</h2>
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
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Type
                    </label>
                    <select
                      name="type"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      <option value="">Select</option>
                      <option value="flat">Flat</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Value
                    </label>
                    <input
                      type="number"
                      name="value"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Valid From
                    </label>
                    <input
                      type="date"
                      name="validFrom"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setValidFrom(e.target.value)}
                      value={validFrom}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Valid Upto
                    </label>
                    <input
                      type="date"
                      name="name"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setValidUpto(e.target.value)}
                      value={validUpto}
                    />
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

export default AdminCouponsEdit;
