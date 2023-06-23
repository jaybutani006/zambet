import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";
import { getLocationPathNameLastSplit } from "utils/getLocationPathNameLastSplit.js";
import dummyProductImage from "assets/dummyProductImage.png";
import { defaultAPIErrorHandler } from "api/api";

function AdminProductView() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [mainState, setMainState] = useState(location.state);
  const [productId, setProductId] = useState(
    location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
  );
  const [resProductDetails, setResProductDetails] = useState(null);
  const [resProductReviews, setResProductReviews] = useState([]);

  const getProductDetailsAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/productdetail",
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then((response) => {
        // console.log(response.data);
        setResProductDetails(response.data.data[0]);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const getProductReviewsAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/Reviews/productReview",
      headers: {
        Authorization: state.adminToken,
      },
      params: {
        product_id: productId,
      },
    })
      .then((response) => {
        console.log(response.data);
        setResProductReviews(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getProductDetailsAPI();
    getProductReviewsAPI();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid" style={{ textAlign: "left" }}>
        <div className="page-header">
          <div
            className="flex-between row mx-1"
            style={{ justifyContent: "space-between" }}
          >
            <div className="col-6">
              <h1 className="page-header-title">
                {resProductDetails?.pname || "..."}
              </h1>
            </div>
            <div className="col-6">
              <Link
                // to="/seller/product/list"
                to=""
                onClick={() => navigate(-1)}
                className="btn btn-primary float-right"
              >
                <i className="tio-back-ui" /> Back
              </Link>
            </div>
          </div>
          <ul className="nav nav-tabs page-header-tabs">
            <li className="nav-item">
              <Link className="nav-link active" to="#">
                Product reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className="card mb-3 mb-lg-5">
          <div className="card-body">
            <div className="row align-items-md-center gx-md-5">
              <div className="col-md-auto mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <img
                    className="avatar avatar-xxl avatar-4by3 mr-4"
                    src={resProductDetails?.pphoto?.[0]?.image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = dummyProductImage;
                    }}
                    alt="Image Description"
                  />
                  <div className="d-block">
                    <h4 className="display-2 text-dark mb-0">
                      {resProductDetails?.avgRating || 0}
                    </h4>
                    <p>
                      of {resProductDetails?.totalReviews || 0} Reviews
                      <span className="badge badge-soft-dark badge-pill ml-1" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <ul className="list-unstyled list-unstyled-py-2 mb-0">
                  <li className="d-flex align-items-center font-size-sm">
                    <span className="mr-3">5 Star</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="ml-3">0</span>
                  </li>
                  <li className="d-flex align-items-center font-size-sm">
                    <span className="mr-3">4 Star</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="ml-3">0</span>
                  </li>
                  <li className="d-flex align-items-center font-size-sm">
                    <span className="mr-3">3 Star</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="ml-3">0</span>
                  </li>
                  <li className="d-flex align-items-center font-size-sm">
                    <span className="mr-3">2 Star</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="ml-3">0</span>
                  </li>
                  <li className="d-flex align-items-center font-size-sm">
                    <span className="mr-3">1 Star</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="ml-3">0</span>
                  </li>
                </ul>
              </div>
              <div className="col-12">
                <hr />
              </div>
              <div className="col-4 pt-2">
                <div className="flex-start">
                  <h4 className="border-bottom">
                    {resProductDetails?.pname || "..."}
                  </h4>
                </div>
                <div className="flex-start">
                  <span>MRP : </span>
                  <span className="mx-1">
                    ₹{resProductDetails?.display_price || 0}
                  </span>
                </div>
                <div className="flex-start">
                  <span>Selling Price : </span>
                  <span className="mx-1">
                    ₹{resProductDetails?.selling_price || 0}
                  </span>
                </div>
                <div className="flex-start">
                  <span>TAX : </span>
                  <span className="mx-1">0 % </span>
                </div>
                <div className="flex-start">
                  <span>Discount : </span>
                  <span className="mx-1">₹0</span>
                </div>
                <div className="flex-start">
                  <span>Shipping Cost : </span>
                  <span className="mx-1">₹0</span>
                </div>
                {/* <div className="flex-start">
                  <span>Current Stock : </span>
                  <span className="mx-1">{mainState?.p_quantity || 0}</span>
                </div> */}
              </div>
              <div className="col-8 pt-2 border-left">
                <span> </span>
                <br />
                <span>
                  Product Image
                  <div className="row">
                    {!!resProductDetails?.pphoto?.length ? (
                      resProductDetails?.pphoto.map((item) => (
                        <div className="col-md-3">
                          <div className="card">
                            <div className="card-body">
                              <img
                                style={{ width: "100%" }}
                                src={item?.image}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = dummyProductImage;
                                }}
                                alt="Product image"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-md-3">
                        <div className="card">
                          <div className="card-body">
                            <img
                              style={{ width: "100%" }}
                              src={dummyProductImage}
                              alt="Product image"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="table-responsive datatable-custom">
            <table
              className="table table-borderless table-thead-bordered table-nowrap card-table"
              style={{ textAlign: "left" }}
            >
              <thead className="thead-light">
                <tr>
                  <th>Reviewer</th>
                  <th>Review</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {!!resProductReviews?.length &&
                  resProductReviews?.map((item) => (
                    // <tr>
                    //   <td>{item.user_id}</td>
                    //   <td>{item.Review}</td>
                    //   <td>{ISOToIST(item.createdAt)}</td>
                    // </tr>
                    <tr>
                      {/* <Link
                          className="d-flex align-items-center"
                          // to="/admin/customer/view/11"
                        > */}

                      <td className="ml-3">
                        <div className="row" style={{ width: "28rem" }}>
                          <div className="col-2">
                            <div className="avatar avatar-circle">
                              <img
                                className="avatar-img"
                                src="/assets/front-end/img/image-place-holder.png"
                                alt="Image Description"
                              />
                            </div>
                          </div>
                          <div className="col-10">
                            <span className="d-block h5 text-hover-primary mb-0">
                              {`${item?.User?.first_name} ${item?.User?.last_name}` ||
                                "..."}
                              <i
                                className="tio-verified text-primary"
                                data-toggle="tooltip"
                                data-placement="top"
                                title
                                data-original-title="Verified Customer"
                              />
                            </span>
                            {/* <span className="d-block font-size-sm text-body">
                              {item?.email || "..."}
                            </span> */}
                          </div>
                        </div>
                      </td>
                      {/* </a> */}
                      <td className="text-wrap">
                        <div className="d-flex mb-2" style={{ width: "28rem" }}>
                          <label className="badge badge-soft-info">
                            {item?.Star || 0} <i className="tio-star" />
                          </label>
                        </div>
                        <p>{item?.Review || "..."}</p>
                        {/* <a
                          className="float-left"
                          data-lightbox="mygallery"
                        > */}
                        {item?.review_image?.length &&
                          item?.review_image?.map((item) => (
                            <img
                              style={{
                                width: "60px",
                                height: "60px",
                                padding: "10px",
                              }}
                              // src="/assets/front-end/img/image-place-holder.png"
                              src={item}
                              alt=""
                            />
                          ))}
                        {/* </a> */}
                      </td>
                      <td>
                        {ISOToIST(item?.createdAt) || "02 Jun 2022 10:53:55"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer"></div>
          {!resProductReviews?.length && (
            <div className="text-center p-4">
              <img
                className="mb-3"
                src="/assets/back-end/svg/illustrations/sorry.svg"
                alt="Image Description"
                style={{ width: "7rem" }}
              />
              <p className="mb-0">No data to show</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminProductView;
