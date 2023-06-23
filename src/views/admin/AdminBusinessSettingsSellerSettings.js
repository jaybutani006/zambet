import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminBusinessSettingsSellerSettings() {
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
              Seller settings
            </li>
          </ol>
        </nav>
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0 text-black-50">Sales Comission Informations </h4>
        </div>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Sales Commission</h5>
              </div>
              <div className="card-body" style={{ padding: "20px" }}>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <label>Default Sales Commission ( % )</label>
                  <input
                    className="form-control"
                    name="commission"
                    defaultValue={10}
                    min={0}
                    max={100}
                  />
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary float-right ml-3"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Seller Registration</h5>
              </div>
              <div className="card-body" style={{ padding: "20px" }}>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <label>Seller Registration on/off</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="seller_registration"
                      type="radio"
                      defaultValue={1}
                      id="defaultCheck1"
                      defaultChecked
                    />
                    <label
                      className="form-check-label ml-3"
                      htmlFor="defaultCheck1"
                    >
                      Turn on
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="seller_registration"
                      type="radio"
                      defaultValue={0}
                      id="defaultCheck2"
                    />
                    <label
                      className="form-check-label ml-3"
                      htmlFor="defaultCheck2"
                    >
                      Turn off
                    </label>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary float-right ml-3"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div className="card">
              <div className="card-header">
                <h5>Seller POS</h5>
              </div>
              <div className="card-body" style={{ padding: "20px" }}>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <label>Seller POS permission on/off</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="seller_pos"
                      type="radio"
                      defaultValue={1}
                      id="seller_pos1"
                      defaultChecked
                    />
                    <label
                      className="form-check-label ml-3"
                      htmlFor="seller_pos1"
                    >
                      Turn on
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="seller_pos"
                      type="radio"
                      defaultValue={0}
                      id="seller_pos2"
                    />
                    <label
                      className="form-check-label ml-3"
                      htmlFor="seller_pos2"
                    >
                      Turn off
                    </label>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary float-right ml-3"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div className="card" style={{ height: "250px" }}>
              <div className="card-header">
                <h5 className="text-center text-capitalize"> Business mode</h5>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="col-sm mb-2 mb-sm-0">
                    <div className="form-control">
                      <div
                        className="custom-control custom-radio custom-radio-reverse"
                        onclick="business_mode('https://6valley.6amtech.com/admin/business-settings/seller-settings/business-mode-settings/single','For single vendor operation  deactive all seller!!')"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="projectViewNewProjectTypeRadio"
                          id="projectViewNewProjectTypeRadio1"
                        />
                        <label
                          className="custom-control-label media align-items-center"
                          htmlFor="projectViewNewProjectTypeRadio1"
                        >
                          <span className="media-body">Single vendor</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm mb-2 mb-sm-0">
                    <div className="form-control">
                      <div
                        className="custom-control custom-radio custom-radio-reverse"
                        onclick="business_mode('https://6valley.6amtech.com/admin/business-settings/seller-settings/business-mode-settings/multi','Now  your multi vendor business mode is opening  you can add new seller !!')"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="projectViewNewProjectTypeRadio"
                          id="projectViewNewProjectTypeRadio2"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label media align-items-center"
                          htmlFor="projectViewNewProjectTypeRadio2"
                        >
                          <span className="media-body">Multi vendor</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div className="card">
              <div className="card-header">
                <h5>Admin approval for products</h5>
              </div>
              <div className="card-body" style={{ padding: "20px" }}>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <label>Approval for products</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="new_product_approval"
                      type="checkbox"
                      id="new_product_approval"
                      defaultChecked
                    />
                    <label
                      className="form-check-label ml-3"
                      htmlFor="new_product_approval"
                    >
                      New product
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="product_wise_shipping_cost_approval"
                      type="checkbox"
                      id="product_wise_shipping_cost_approval"
                      defaultChecked
                    />
                    <label
                      className="form-check-label ml-3"
                      htmlFor="product_wise_shipping_cost_approval"
                    >
                      Product wise shipping cost
                      <span style={{ color: "red" }}>
                        ( If the shipping responsibility is inhouse and product
                        wise shipping is activated then this function will work
                        )
                      </span>
                    </label>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary float-right ml-3"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    input[type="file"] {\n        display: none;\n    }\n\n    .custom-file-upload {\n        margin-left: 38%;\n        border: 1px solid #ccc;\n        display: inline-block;\n        padding: 6px 12px;\n        cursor: pointer;\n    }\n',
          }}
        />
        <div
          className="modal fade"
          id="company-web-Logo"
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{ width: "582px", marginLeft: "0%" }}
            >
              <div className="modal-header">
                <h5 className="modal-title text-capitalize" id>
                  company web Logo
                </h5>
              </div>
              <div className="modal-body">
                <div
                  className="alert alert-block alert-success"
                  id="img-suc-company-web-Logo"
                  style={{ display: "none" }}
                >
                  <i className="ace-icon fa fa-check green" />
                  <strong className="green">
                    Image uploaded successfully.
                  </strong>
                </div>
                <div
                  className="alert alert-block alert-danger"
                  id="img-err-company-web-Logo"
                  style={{ display: "none" }}
                >
                  <strong className="red">Error Something went wrong !</strong>
                </div>
                <div className="row" id="show-images-company-web-Logo"></div>
                <form>
                  <div
                    className="form-group"
                    style={{ display: "none" }}
                    id="crop-company-web-Logo"
                  >
                    <div
                      id="upload-image-div-company-web-Logo"
                      className="croppie-container"
                    >
                      <div
                        className="cr-boundary"
                        aria-dropeffect="none"
                        style={{ width: "794px", height: "210px" }}
                      >
                        <canvas
                          className="cr-image"
                          alt="preview"
                          aria-grabbed="false"
                        />
                        <div
                          className="cr-viewport cr-vp-square"
                          tabIndex={0}
                          style={{ width: "784px", height: "200px" }}
                        />
                        <div className="cr-overlay" />
                      </div>
                      <div className="cr-slider-wrap">
                        <input
                          className="cr-slider"
                          type="range"
                          step="0.0001"
                          aria-label="zoom"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group" id="select-img-company-web-Logo">
                    <label
                      htmlFor="image-set-company-web-Logo"
                      className="custom-file-upload"
                    >
                      Choose Image <i className="fa fa-plus-circle" />
                    </label>
                    <input
                      type="file"
                      name="image"
                      onchange="cropView('company-web-Logo')"
                      id="image-set-company-web-Logo"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-upload-image-company-web-Logo"
                  style={{ display: "none" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    input[type="file"] {\n        display: none;\n    }\n\n    .custom-file-upload {\n        margin-left: 38%;\n        border: 1px solid #ccc;\n        display: inline-block;\n        padding: 6px 12px;\n        cursor: pointer;\n    }\n',
          }}
        />
        <div
          className="modal fade"
          id="company-mobile-Logo"
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{ width: "582px", marginLeft: "0%" }}
            >
              <div className="modal-header">
                <h5 className="modal-title text-capitalize" id>
                  company mobile Logo
                </h5>
              </div>
              <div className="modal-body">
                <div
                  className="alert alert-block alert-success"
                  id="img-suc-company-mobile-Logo"
                  style={{ display: "none" }}
                >
                  <i className="ace-icon fa fa-check green" />
                  <strong className="green">
                    Image uploaded successfully.
                  </strong>
                </div>
                <div
                  className="alert alert-block alert-danger"
                  id="img-err-company-mobile-Logo"
                  style={{ display: "none" }}
                >
                  <strong className="red">Error Something went wrong !</strong>
                </div>
                <div className="row" id="show-images-company-mobile-Logo"></div>
                <form>
                  <div
                    className="form-group"
                    style={{ display: "none" }}
                    id="crop-company-mobile-Logo"
                  >
                    <div
                      id="upload-image-div-company-mobile-Logo"
                      className="croppie-container"
                    >
                      <div
                        className="cr-boundary"
                        aria-dropeffect="none"
                        style={{ width: "794px", height: "210px" }}
                      >
                        <canvas
                          className="cr-image"
                          alt="preview"
                          aria-grabbed="false"
                        />
                        <div
                          className="cr-viewport cr-vp-square"
                          tabIndex={0}
                          style={{ width: "784px", height: "200px" }}
                        />
                        <div className="cr-overlay" />
                      </div>
                      <div className="cr-slider-wrap">
                        <input
                          className="cr-slider"
                          type="range"
                          step="0.0001"
                          aria-label="zoom"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group"
                    id="select-img-company-mobile-Logo"
                  >
                    <label
                      htmlFor="image-set-company-mobile-Logo"
                      className="custom-file-upload"
                    >
                      Choose Image <i className="fa fa-plus-circle" />
                    </label>
                    <input
                      type="file"
                      name="image"
                      onchange="cropView('company-mobile-Logo')"
                      id="image-set-company-mobile-Logo"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-upload-image-company-mobile-Logo"
                  style={{ display: "none" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    input[type="file"] {\n        display: none;\n    }\n\n    .custom-file-upload {\n        margin-left: 38%;\n        border: 1px solid #ccc;\n        display: inline-block;\n        padding: 6px 12px;\n        cursor: pointer;\n    }\n',
          }}
        />
        <div
          className="modal fade"
          id="company-footer-Logo"
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{ width: "582px", marginLeft: "0%" }}
            >
              <div className="modal-header">
                <h5 className="modal-title text-capitalize" id>
                  company footer Logo
                </h5>
              </div>
              <div className="modal-body">
                <div
                  className="alert alert-block alert-success"
                  id="img-suc-company-footer-Logo"
                  style={{ display: "none" }}
                >
                  <i className="ace-icon fa fa-check green" />
                  <strong className="green">
                    Image uploaded successfully.
                  </strong>
                </div>
                <div
                  className="alert alert-block alert-danger"
                  id="img-err-company-footer-Logo"
                  style={{ display: "none" }}
                >
                  <strong className="red">Error Something went wrong !</strong>
                </div>
                <div className="row" id="show-images-company-footer-Logo"></div>
                <form>
                  <div
                    className="form-group"
                    style={{ display: "none" }}
                    id="crop-company-footer-Logo"
                  >
                    <div
                      id="upload-image-div-company-footer-Logo"
                      className="croppie-container"
                    >
                      <div
                        className="cr-boundary"
                        aria-dropeffect="none"
                        style={{ width: "794px", height: "210px" }}
                      >
                        <canvas
                          className="cr-image"
                          alt="preview"
                          aria-grabbed="false"
                        />
                        <div
                          className="cr-viewport cr-vp-square"
                          tabIndex={0}
                          style={{ width: "784px", height: "200px" }}
                        />
                        <div className="cr-overlay" />
                      </div>
                      <div className="cr-slider-wrap">
                        <input
                          className="cr-slider"
                          type="range"
                          step="0.0001"
                          aria-label="zoom"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group"
                    id="select-img-company-footer-Logo"
                  >
                    <label
                      htmlFor="image-set-company-footer-Logo"
                      className="custom-file-upload"
                    >
                      Choose Image <i className="fa fa-plus-circle" />
                    </label>
                    <input
                      type="file"
                      name="image"
                      onchange="cropView('company-footer-Logo')"
                      id="image-set-company-footer-Logo"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-upload-image-company-footer-Logo"
                  style={{ display: "none" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    input[type="file"] {\n        display: none;\n    }\n\n    .custom-file-upload {\n        margin-left: 38%;\n        border: 1px solid #ccc;\n        display: inline-block;\n        padding: 6px 12px;\n        cursor: pointer;\n    }\n',
          }}
        />
        <div
          className="modal fade"
          id="company-fav-icon"
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{ width: "582px", marginLeft: "0%" }}
            >
              <div className="modal-header">
                <h5 className="modal-title text-capitalize" id>
                  company fav icon
                </h5>
              </div>
              <div className="modal-body">
                <div
                  className="alert alert-block alert-success"
                  id="img-suc-company-fav-icon"
                  style={{ display: "none" }}
                >
                  <i className="ace-icon fa fa-check green" />
                  <strong className="green">
                    Image uploaded successfully.
                  </strong>
                </div>
                <div
                  className="alert alert-block alert-danger"
                  id="img-err-company-fav-icon"
                  style={{ display: "none" }}
                >
                  <strong className="red">Error Something went wrong !</strong>
                </div>
                <div className="row" id="show-images-company-fav-icon"></div>
                <form>
                  <div
                    className="form-group"
                    style={{ display: "none" }}
                    id="crop-company-fav-icon"
                  >
                    <div
                      id="upload-image-div-company-fav-icon"
                      className="croppie-container"
                    >
                      <div
                        className="cr-boundary"
                        aria-dropeffect="none"
                        style={{ width: "110px", height: "110px" }}
                      >
                        <canvas
                          className="cr-image"
                          alt="preview"
                          aria-grabbed="false"
                        />
                        <div
                          className="cr-viewport cr-vp-square"
                          tabIndex={0}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <div className="cr-overlay" />
                      </div>
                      <div className="cr-slider-wrap">
                        <input
                          className="cr-slider"
                          type="range"
                          step="0.0001"
                          aria-label="zoom"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group" id="select-img-company-fav-icon">
                    <label
                      htmlFor="image-set-company-fav-icon"
                      className="custom-file-upload"
                    >
                      Choose Image <i className="fa fa-plus-circle" />
                    </label>
                    <input
                      type="file"
                      name="image"
                      onchange="cropView('company-fav-icon')"
                      id="image-set-company-fav-icon"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-upload-image-company-fav-icon"
                  style={{ display: "none" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsSellerSettings;
