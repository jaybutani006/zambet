import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function SellerProductBulkImport() {
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
              <Link to="/seller/product/list">Product</Link>
            </li>
            <li className="breadcrumb-item">Bulk import </li>
          </ol>
        </nav>
        <div className="row" style={{ textAlign: "left" }}>
          <div className="col-12">
            <div className="jumbotron" style={{ background: "white" }}>
              <h1 className="display-4">Instructions : </h1>
              <p> 1. Download the format file and fill it with proper data.</p>
              <p>
                2. You can download the example file to understand how the data
                must be filled.
              </p>
              <p>
                3. Once you have downloaded and filled the format file upload it
                in the form below and submit.
              </p>
              <p>
                {" "}
                4. After uploading products you need to edit them and set
                products images and choices.
              </p>
              <p>
                {" "}
                5. You can get brand and category id from their list please
                input the right ids.
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <form className="product-form">
              <input
                type="hidden"
                name="_token"
                defaultValue="9MwZveTgMo0uPqMjzJMJ6iptaS1V3eI3RwcrHfin"
              />{" "}
              <div className="card mt-2 rest-part">
                <div className="card-header">
                  <h4>Import Products File</h4>
                  <a
                    href="/public/assets/product_bulk_format.xlsx"
                    download
                    className="btn btn-secondary"
                  >
                    Download Format
                  </a>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <input type="file" name="products_file" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-footer">
                <div className="row">
                  <div className="col-md-12" style={{ paddingTop: "20px" }}>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerProductBulkImport;
