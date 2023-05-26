import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminSellersSellerAdd() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="content container-fluid main-card rtl"
        style={{ textAlign: "left" }}
      >
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Add new seller
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-12">
            <div className="card o-hidden border-0 shadow-lg my-4">
              <div className="card-body ">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center mb-2 ">
                        <h3 className> Shop Application</h3>
                        <hr />
                      </div>
                      <form className="user">
                        <input
                          type="hidden"
                          name="_token"
                          defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                        />{" "}
                        <input
                          type="hidden"
                          name="status"
                          defaultValue="approved"
                        />
                        <h5 className="black">Seller Info </h5>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleFirstName"
                              name="f_name"
                              defaultValue
                              placeholder="First name"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleLastName"
                              name="l_name"
                              defaultValue
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0 mt-4">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              name="email"
                              defaultValue
                              placeholder="Email address"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            {/* <small className="text-danger">
                              ( * Country code is must Like for BD 880 )
                            </small> */}
                            <input
                              type="number"
                              className="form-control form-control-user"
                              id="exampleInputPhone"
                              name="phone"
                              defaultValue
                              placeholder="Phone number"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              minLength={6}
                              id="exampleInputPassword"
                              name="password"
                              placeholder="Password"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              minLength={6}
                              id="exampleRepeatPassword"
                              placeholder="Repeat password"
                              required
                            />
                            <div className="pass invalid-feedback">
                              Repeat Password Not match .
                            </div>
                          </div>
                        </div>
                        <div className>
                          <div className="pb-1">
                            <center>
                              <img
                                style={{
                                  width: "auto",
                                  border: "1px solid",
                                  borderRadius: "10px",
                                  maxHeight: "200px",
                                }}
                                id="viewer"
                                alt="banner image"
                              />
                            </center>
                          </div>
                          <div className="form-group">
                            <div
                              className="custom-file"
                              style={{ textAlign: "left" }}
                            >
                              <input
                                type="file"
                                name="image"
                                id="customFileUpload"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFileUpload"
                              >
                                Upload Image
                              </label>
                            </div>
                          </div>
                        </div>
                        <h5 className="black">Shop Info</h5>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0 ">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="shop_name"
                              name="shop_name"
                              placeholder="Shop name"
                              defaultValue
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <textarea
                              name="shop_address"
                              className="form-control"
                              id="shop_address"
                              rows={1}
                              placeholder="Shop address"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className>
                          <div className="pb-1">
                            <center>
                              <img
                                style={{
                                  width: "auto",
                                  border: "1px solid",
                                  borderRadius: "10px",
                                  maxHeight: "200px",
                                }}
                                id="viewerLogo"
                                alt="banner image"
                              />
                            </center>
                          </div>
                          <div className="form-group">
                            <div
                              className="custom-file"
                              style={{ textAlign: "left" }}
                            >
                              <input
                                type="file"
                                name="logo"
                                id="LogoUpload"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="LogoUpload"
                              >
                                Upload Logo
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className>
                          <div className="pb-1">
                            <center>
                              <img
                                style={{
                                  width: "auto",
                                  border: "1px solid",
                                  borderRadius: "10px",
                                  maxHeight: "200px",
                                }}
                                id="viewerBanner"
                                alt="banner image"
                              />
                            </center>
                          </div>
                          <div className="form-group">
                            <div
                              className="custom-file"
                              style={{ textAlign: "left" }}
                            >
                              <input
                                type="file"
                                name="banner"
                                id="BannerUpload"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                style={{ overflow: "hidden", padding: "2%" }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="BannerUpload"
                              >
                                Upload Banner
                              </label>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Apply Shop{" "}
                        </button>
                      </form>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSellersSellerAdd;
