import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SellerMyBankInfoEdit() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const initialState = {
    bank_name: "",
    branch_name: "",
    holder_name: "",
    account_no: "",
    //
    ifsc_code: "",
    branch_code: "",
    cif_no: "",
  };
  const [resMyBankDetails, setResMyBankDetails] = useState(initialState);
  const [myBankDetails, setMyBankDetails] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setMyBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const apiGetMyBankInfo = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/bankdetail",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.data && response.data.data.length) {
          setMyBankDetails(() => ({
            bank_name: response.data.data[0]?.Bankdetail?.bank_name,
            branch_name: response.data.data[0]?.Bankdetail?.branch_name,
            holder_name: response.data.data[0]?.Bankdetail?.holder_name,
            account_no: response.data.data[0]?.Bankdetail?.account_no,
            //
            ifsc_code: response.data.data[0]?.Bankdetail?.ifsc_code,
            branch_code: response.data.data[0]?.Bankdetail?.branch_code,
            cif_no: response.data.data[0]?.Bankdetail?.cif_no,
          }));
        }
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleUpdateMyBankInfo = (e) => {
    e.preventDefault();
    console.log(myBankDetails);

    for (const [key, value] of Object.entries(myBankDetails)) {
      console.log(`${key}: ${value}`);
      if (!value) {
        alert(`${key} can't be empty`);
        return;
      }
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/bankdetail/updatebankdetail",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        bank_name: myBankDetails.bank_name,
        branch_name: myBankDetails.branch_name,
        holder_name: myBankDetails.holder_name,
        account_no: myBankDetails.account_no,
        branch_code: myBankDetails.branch_code,
        cif_no: myBankDetails.cif_no,
        ifsc_code: myBankDetails.ifsc_code,
      }),
    })
      .then(function (response) {
        console.log(response.data);
        apiGetMyBankInfo();
        alert("Successfully Updated Bank Info");
        navigate("/seller/shop/view");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetMyBankInfo();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid" style={{ textAlign: "left" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Seller
            </li>
            <li className="breadcrumb-item">Bank info</li>
          </ol>
        </nav>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1 className="h3 mb-0 ">Edit Bank Info</h1>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label htmlFor="bank_name">
                          Bank Name <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="bank_name"
                          className="form-control"
                          id="bank_name"
                          onChange={handleInputChange}
                          value={myBankDetails.bank_name}
                        />
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="branch_name">
                          Branch Name <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="branch_name"
                          className="form-control"
                          id="branch_name"
                          onChange={handleInputChange}
                          value={myBankDetails.branch_name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label htmlFor="holder_name">
                          Holder Name <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="holder_name"
                          className="form-control"
                          id="holder_name"
                          onChange={handleInputChange}
                          value={myBankDetails.holder_name}
                        />
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="account_no">
                          Account No <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="account_no"
                          className="form-control"
                          id="account_no"
                          onChange={handleInputChange}
                          value={myBankDetails.account_no}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label htmlFor="branch_code">
                          Branch Code <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="branch_code"
                          className="form-control"
                          id="branch_code"
                          onChange={handleInputChange}
                          value={myBankDetails.branch_code}
                        />
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="cif_no">
                          CIF No <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="cif_no"
                          className="form-control"
                          id="cif_no"
                          onChange={handleInputChange}
                          value={myBankDetails.cif_no}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label htmlFor="ifsc_code">
                          IFSC Code <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="ifsc_code"
                          className="form-control"
                          id="ifsc_code"
                          onChange={handleInputChange}
                          value={myBankDetails.ifsc_code}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    // type="submit"
                    className="btn btn-primary float-right"
                    // id="btn_update"
                    onClick={handleUpdateMyBankInfo}
                  >
                    Update
                  </button>
                  <Link className="btn btn-danger" to="/seller/shop/view">
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerMyBankInfoEdit;
