import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function SellerMyBankInfo() {
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
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Seller
            </li>
            <li className="breadcrumb-item">My bank info</li>
          </ol>
        </nav>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-header">
                <h3 className="h3 mb-0  ">My bank info </h3>
              </div>
              <div className="card-body">
                <div className="col-md-8 mt-4">
                  <div className="flex-start">
                    <h4>Bank name : </h4>
                    <h4 className="mx-1">ABC Bank</h4>
                  </div>
                  <div className="flex-start">
                    <h6>Branch : </h6>
                    <h6 className="mx-1">Aukland</h6>
                  </div>
                  <div className="flex-start">
                    <h6>Holder name : </h6>
                    <h6 className="mx-1">John Doe</h6>
                  </div>
                  <div className="flex-start">
                    <h6>Account no : </h6>
                    <h6 className="mx-1">00000000000</h6>
                  </div>
                  <a
                    className="btn btn-primary"
                    href="/seller/profile/bank-edit/1"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerMyBankInfo;
