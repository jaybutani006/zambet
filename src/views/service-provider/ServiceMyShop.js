import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyShopLogo from "assets/dummyShopLogo.png";
import dummyShopBanner from "assets/dummyShopBanner.png";
import { defaultAPIErrorHandler } from "api/api";

function ServiceMyShop() {
  const [state, dispatch] = useContext(Context);
  const initialState = {
    shopLogo: "",
    shopBanner: "",
    shopName: "",
    shopPhoneNum: "",
    shopAddress: "",
    //
    shopEmail: "",
    shopWebsite: "",
    shopGSTNum: "",
    shopState: "",
    shopCity: "",
    //
    bankName: "",
    bankBranchName: "",
    bankAccHolderName: "",
    bankAccNum: "",
    //
    bankIFSCCode: "",
    bankBranchCode: "",
    bankCIFNum: "",
  };
  const [mainState, setMainState] = useState(initialState);
  const [shopDetail, setShopDetail] = useState();
  const [portfolioDetails, setPortfolioDetails] = useState();
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete API call using axios
    axios({
      method: "delete",
      url:
        process.env.REACT_APP_BASEURL +
        `/api/service_provider_portfolio?_id=${deleteItemId}`,
      headers: {
        Authorization: state.serviceToken,
      },
    })
      .then((response) => {
        // Handle the response data here
        alert("Deleted");
        portfolioinfo();
      })
      .catch(function (error) {
        // Handle the error here
        alert(error);
      });

    // Close the delete dialog
    setDeleteDialogOpen(false);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const shopinfo = () => {
    console.log("called");
    // console.log(state.sellerToken);
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/service_provider/profile",
      headers: {
        Authorization: state.serviceToken,
      },
    })
      .then((response) => {
        // if (response.data.data && response.data.data.length) {
        console.log(response.data.data);
        // Handle the response data here
        setShopDetail(response.data.data);
        // }
      })
      .catch(function (error) {
        // Handle the error here
        alert(error);
      });
  };
  const portfolioinfo = () => {
    console.log("called");
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/service_provider_portfolio",
      headers: {
        Authorization: state.serviceToken,
      },
    })
      .then((response) => {
        // if (response.data.data && response.data.data.length) {
        console.log(response.data.data);
        // Handle the response data here
        setPortfolioDetails(response.data.data);
        // }
      })
      .catch(function (error) {
        // Handle the error here
        alert(error);
      });
  };
  useEffect(() => {
    shopinfo();
    portfolioinfo();
  }, []);
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="h3 mb-0">My shop Info</h3>
              </div>
              <div className="card-body">
                <div className="row mt-2">
                  <div className="col-12">
                    <div className="text-center">
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                          border: "1px solid",
                          borderRadius: "10px",
                          maxHeight: "200px",
                        }}
                        id="viewerBanner"
                        src={
                          (shopDetail?.shop_banner && shopDetail.shop_banner) ||
                          dummyShopBanner
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.src = dummyShopBanner;
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <div
                      className="flex-start"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <Link
                        className="btn btn-primary"
                        to="/service/add/portfolio"
                      >
                        Add Portfolio
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 align-items-center justify-content-center d-flex">
                    <img
                      src={
                        (shopDetail?.shopLogo && shopDetail.shopLogo) ||
                        dummyShopLogo
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.src = dummyShopLogo;
                      }}
                      className="rounded-circle border"
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                  <div className="col-md-6 text-left mt-4">
                    <div className="flex-start">
                      <h4 style={{ display: "inline-block" }}>Name : </h4>
                      <h4 className="mx-1" style={{ display: "inline-block" }}>
                        {shopDetail?.shop_name ? shopDetail.shop_name : "..."}
                      </h4>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Phone : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.contect_no ? shopDetail.contect_no : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Email : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.email_address
                          ? shopDetail.email_address
                          : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Website : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.company_website
                          ? shopDetail.company_website
                          : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>GST No. : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.gst_no ? shopDetail.gst_no : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Address : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.shop_address
                          ? shopDetail.shop_address
                          : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>State : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.shop_name ? shopDetail.shop_name : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>City : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {shopDetail?.city ? shopDetail.city : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <Link
                        className="btn btn-primary"
                        to="/service/shop/edit/1"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row mt-3" id="ajax-products">
                  {portfolioDetails &&
                    portfolioDetails.map((item) => (
                      <div
                        id={item._id}
                        className="col-lg-3 col-md-4 col-sm-4 col-6 mb-2"
                      >
                        <div
                          className="product-card card"
                          style={{
                            marginBottom: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              marginBottom: "1rem",
                              display: "flex",
                              justifyContent: "end",
                              width: "100%",
                              marginRight: "2rem",
                            }}
                          >
                            <Link to={`/service/edit/portfolio/${item._id}`}>
                              <div>
                                <img
                                  src="https://www.pdfzorro.com/Images/IconsFunktionen/pdf-edit.webp"
                                  alt=""
                                  style={{
                                    height: "1rem",
                                    width: "1rem",
                                    marginRight: "1rem",
                                  }}
                                />
                              </div>
                            </Link>
                            <div>
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
                                alt=""
                                style={{ height: "1rem", width: "1rem" , cursor: "pointer"}}
                                onClick={() => handleDelete(item._id)}
                              />
                            </div>
                          </div>
                          <div
                            className="card-header inline_product clickable"
                            style={{
                              cursor: "pointer",
                              maxHeight: "193px",
                              minHeight: "193px",
                            }}
                          >
                            <div
                              className="d-flex d-block center-div element-center"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={item.company_logo || ""}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png";
                                }}
                                style={{ width: "100%", maxHeight: "180px" }}
                              />
                            </div>
                          </div>
                          <div
                            className="card-body inline_product text-center p-1 clickable"
                            style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                          >
                            <div className="text-center text-dark">
                              <span className="text-center font-weight-bold small p-1">
                                {`${item.service_provider_portfolio_name}`}
                              </span>
                            </div>
                          </div>
                          <div
                            className="card-body inline_product text-center p-1 clickable"
                            style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                          >
                            <div className="text-center text-dark">
                              <span className="text-center font-weight-bold small p-1">
                                {`${item.description}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="col-12">
                    <nav
                      className="d-flex justify-content-between pt-2"
                      aria-label="Page navigation"
                      id="paginator-ajax"
                    ></nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              padding: "20px",
              borderRadius: "4px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              zIndex: 1000,
            }}
          >
            <h6 style={{ fontWeight: "bold", marginBottom: "3rem" }}>
              Confirm Deletion
            </h6>
            <p style={{ marginBottom: "3rem" }}>
              Are you sure you want to change the status?
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  marginRight: "10px",
                  backgroundColor: "red",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                OK
              </button>
              <button
                type="button"
                onClick={closeDeleteDialog}
                style={{
                  backgroundColor: "green",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ServiceMyShop;
