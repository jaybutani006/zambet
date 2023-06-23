import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyShopBanner from "../../assets/dummyShopBanner.png";
import dummyShopLogo from "../../assets/dummyShopLogo.png";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { useEffect } from "react";
import { defaultAPIErrorHandler } from "api/api";

function AdminSellersView() {
  const location = useLocation();
  const itemId = location?.pathname?.substring(
    location?.pathname?.lastIndexOf("/") + 1
  );
  const [state, dispatch] = useContext(Context);
  const [mainState, setMainState] = useState({
    options: {
      default: [
        {
          id: "",
          name: "Payment Status : Pending",
          value: "pending",
        },
        {
          id: "",
          name: "Payment Status : Paid",
          value: "paid",
        },
        {
          id: "",
          name: "Order Status : Confirmed",
          value: "confirmed",
        },
        {
          id: "",
          name: "Order Status : Processing",
          value: "processing",
        },
        {
          id: "",
          name: "Order Status : Out For Delivery",
          value: "out_for_delivery",
        },
        {
          id: "",
          name: "Order Status : Delivered",
          value: "delivered",
        },
        {
          id: "",
          name: "Order Status : Returned",
          value: "returned",
        },
        {
          id: "",
          name: "Order Status : canceled",
          value: "canceled",
        },
      ],
    },
    ...location?.state,
    pendingCount: location?.state?.order_detail?.filter(
      (item) => item?.order_master?.payment_status === "pending"
    )?.length,
    paidCount: location?.state?.order_detail?.filter(
      (item) => item?.order_master?.payment_status === "paid"
    )?.length,
    allCount: location?.state?.order_detail?.length,
    selected: {},
    resAllReviews: location?.state?.stock || [],
    resAllTransactions: location?.state?.transactions || [],
  });
  const [disableActiveDeactiveButton, setDisableActiveDeactiveButton] =
    useState(false);
  const [key, setKey] = useState("shop");

  // serach
  const [resOrderList, setResOrderList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [search, setSearch] = useState("");
  //

  const handleOrderFilter = (orgArr, filterField) => {
    const copArr = [...orgArr];

    if (filterField === "pending" || filterField === "paid") {
      return (
        copArr?.filter(
          (item) => item?.order_master?.payment_status === filterField
        ) || []
      );
    } else if (
      filterField === "confirmed" ||
      filterField === "processing" ||
      filterField === "out_for_delivery" ||
      filterField === "delivered" ||
      filterField === "returned" ||
      filterField === "failed" ||
      filterField === "canceled"
    ) {
      return copArr?.filter((item) => item?.order_status === filterField) || [];
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "search_reviews") {
      setMainState((prev) => ({
        ...prev,
        // allReviews: searchFor(value, prev.resAllReviews),
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    } else if (name === "filter") {
      setOrderList((prev) => handleOrderFilter(resOrderList, value));
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmitActiveDeactiveStatus = (
    activeDeactiveStatus,
    seller_type
  ) => {
    console.log(activeDeactiveStatus);
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/admin/upadatevendordata",
      params: {
        _id: mainState?._id,
      },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: activeDeactiveStatus,
        seller_type: seller_type,
      }),
    })
      .then((response) => {
        console.log(response.data);
        // alert("Updated Seller Type");
        setMainState((prev) => ({
          ...prev,
          status: activeDeactiveStatus,
          seller_type: seller_type,
        }));
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
      });
  };

  const apiGetSellerDetails = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/admin/venderdetails",
      params: {
        _id: itemId,
      },
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          ...response?.data?.data?.[0],
          pendingCount: response?.data?.data?.[0]?.order_detail?.filter(
            (item) => item?.order_master?.payment_status === "pending"
          )?.length,
          paidCount: response?.data?.data?.[0]?.order_detail?.filter(
            (item) => item?.order_master?.payment_status === "paid"
          )?.length,
          allCount: response?.data?.data?.[0]?.order_detail?.length,
          selected: {},
          resAllReviews: response?.data?.data?.[0]?.stock || [],
          resAllTransactions: response?.data?.data?.[0]?.transactions || [],
        }));
        setResOrderList(response?.data?.data?.[0]?.order_detail);
        setOrderList(response?.data?.data?.[0]?.order_detail);
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteItem = (itemId, index) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${
          mainState?.stock?.[index]?.Product?.pname || ""
        }`
      )
    ) {
      axios({
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/product",
        params: { _id: itemId },
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
        // data: formData,
      })
        .then((response) => {
          console.log(response.data);
          apiGetSellerDetails();
        })
        .catch((error) => {
          defaultAPIErrorHandler(error);
        });
    }
  };

  const handleToggleProductActiveStatus = (isChecked, productId, index) => {
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/product",
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: isChecked,
      }),
    })
      .then((response) => {
        console.log(response.data);
        apiGetSellerDetails();
        // alert("Success");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
        // console.log(error);
        // alert("Something went wrong");
        // setProductList((prev) => [
        //   ...productList.slice(0, index),
        //   { ...productList[index], product_status: !isChecked },
        //   ...productList.slice(index + 1),
        // ]);
      });
  };

  useEffect(() => {
    apiGetSellerDetails();
  }, []);

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
              Seller Details
            </li>
          </ol>
        </nav>
        <div className="flex-between d-sm-flex row align-items-center justify-content-between mb-2 mx-1">
          <div>
            <Link
              to="/admin/sellers/seller-list"
              className="btn btn-primary mt-3 mb-3"
            >
              Back to seller list
            </Link>
          </div>
          <div></div>
        </div>
        <div className="page-header">
          <div className="flex-between row mx-1">
            <div>
              <h1 className="page-header-title">Deluxe Online</h1>
            </div>
          </div>
          <div className="js-nav-scroller hs-nav-scroller-horizontal">
            <ul className="nav nav-tabs page-header-tabs">
              <li className="nav-item">
                <Link
                  className={key === "shop" ? "nav-link active" : "nav-link"}
                  onClick={() => setKey("shop")}
                  to=""
                  //   href="/admin/sellers/view/1"
                >
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={key === "order" ? "nav-link active" : "nav-link"}
                  onClick={() => setKey("order")}
                  to=""
                  //   href="/admin/sellers/view/1/order"
                >
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={key === "product" ? "nav-link active" : "nav-link"}
                  onClick={() => setKey("product")}
                  to=""
                  //   href="/admin/sellers/view/1/product"
                >
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={key === "setting" ? "nav-link active" : "nav-link"}
                  onClick={() => setKey("setting")}
                  to=""
                  //   href="/admin/sellers/view/1/setting"
                >
                  Setting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    key === "transaction" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setKey("transaction")}
                  to=""
                  //   href="/admin/sellers/view/1/transaction"
                >
                  Transaction
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={key === "review" ? "nav-link active" : "nav-link"}
                  onClick={() => setKey("review")}
                  to=""
                //   href="/admin/sellers/view/1/review"
                >
                  Review
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        {key === "shop" && (
          <>
            <div className="card mb-3">
              <div className="card-body">
                <div className=" gx-2 gx-lg-3 mb-2">
                  <div>
                    <h4>
                      <i style={{ fontSize: "30px" }} className="tio-wallet" />
                      Seller wallet
                    </h4>
                  </div>
                  <div className="row gx-2 gx-lg-3 " id="order_stats">
                    <div
                      className="flex-between row no-gutters align-items-center"
                      style={{ width: "100%" }}
                    >
                      <div className="mb-3 mb-lg-0 seller-wallet">
                        <div
                          className="card card-body card-hover-shadow h-100 text-white text-center"
                          style={{ backgroundColor: "#22577A" }}
                        >
                          <h1 className="p-2 text-white">₹0</h1>
                          <div className="text-uppercase">Commission given</div>
                        </div>
                      </div>
                      <div className="mb-3 mb-lg-0 seller-wallet">
                        <div
                          className="card card-body card-hover-shadow h-100 text-white text-center"
                          style={{ backgroundColor: "#595260" }}
                        >
                          <h1 className="p-2 text-white">₹0</h1>
                          <div className="text-uppercase">Pending withdraw</div>
                        </div>
                      </div>
                      <div className="mb-3 mb-lg-0 seller-wallet">
                        <div
                          className="card card-body card-hover-shadow h-100 text-white text-center"
                          style={{ backgroundColor: "#a66f2e" }}
                        >
                          <h1 className="p-2 text-white">₹0</h1>
                          <div className="text-uppercase">
                            Delivery charge earned
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 mb-lg-0 seller-wallet">
                        <div
                          className="card card-body card-hover-shadow h-100 text-white text-center"
                          style={{ backgroundColor: "#6E85B2" }}
                        >
                          <h1 className="p-2 text-white">₹0</h1>
                          <div className="text-uppercase">Collected cash</div>
                        </div>
                      </div>
                      <div className="mb-3 mb-lg-0 seller-wallet">
                        <div
                          className="card card-body card-hover-shadow h-100 text-white text-center"
                          style={{ backgroundColor: "#6D9886" }}
                        >
                          <h1 className="p-2 text-white">₹0</h1>
                          <div className="text-uppercase">
                            Total collected tax
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 for-card col-md-6 mt-4">
                      <div
                        className="card for-card-body-2 shadow h-100  badge-primary"
                        style={{ background: "#362222!important" }}
                      >
                        <div className="card-body text-light">
                          <div className="flex-between row no-gutters align-items-center">
                            <div>
                              <div className="font-weight-bold text-uppercase for-card-text mb-1">
                                Withdrawable balance
                              </div>
                              <div className="for-card-count">₹0</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-6 for-card col-md-6 mt-4"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="card  shadow h-100 for-card-body-3 badge-info"
                        style={{ background: "#171010!important" }}
                      >
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className=" font-weight-bold for-card-text text-uppercase mb-1">
                                Withdrawn
                              </div>
                              <div className="for-card-count">₹0</div>
                            </div>
                            <div className="col-auto for-margin">
                              <i className="tio-money-vs" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header text-capitalize">
                    Seller Account <br />
                    <div class="d-inline-block">
                      <div className="row">
                        <div className="col-6">
                          {" "}
                          <label className="input-label" htmlFor="priority">
                            Status
                            <span>
                              {/* <i
                                className="m-1 tio-info-outined"
                                title="The lowest number will get the highest priority"
                              /> */}
                            </span>
                          </label>
                          <button
                            className={`btn ${
                              mainState?.status === "active"
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            }`}
                            onClick={(e) =>
                              handleSubmitActiveDeactiveStatus(
                                mainState?.status === "active"
                                  ? "deactive"
                                  : "active"
                              )
                            }
                            disabled={mainState?.disableActiveDeactiveButton}
                          >
                            {mainState?.status === "active"
                              ? "Suspend"
                              : "Activate"}
                          </button>
                        </div>
                        <div className="col-6">
                          {" "}
                          <label className="input-label" htmlFor="priority">
                            Seller Type
                            {/* <span>
                              <i
                                className="m-1 tio-info-outined"
                                title="Select Seller Type"
                              />
                            </span> */}
                          </label>
                          <select
                            className="form-control"
                            name="type"
                            onChange={(e) =>
                              handleSubmitActiveDeactiveStatus(
                                undefined,
                                e.target.value
                              )
                            }
                            disabled={mainState?.disableActiveDeactiveButton}
                          >
                            <option value="" selected disabled>
                              ---Select---
                            </option>
                            {["store", "seller"].map((item) => (
                              <option
                                value={item}
                                selected={mainState?.seller_type === item}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    {/* <div className="col-md-8 mt-2"> */}
                    <div className="flex-start">
                      <div>
                        <h4>Status : </h4>
                      </div>
                      <div className="mx-1">
                        <h4>
                          <label className="badge badge-success">
                            {mainState?.status === "active"
                              ? "Active"
                              : "Deactive"}
                          </label>
                        </h4>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div className="w-50">
                        <div
                          className="flex-center"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={
                              mainState?.vendor_details?.[0]?.vendor_photo ||
                              dummyShopLogo
                            }
                            style={{
                              display: "block",
                              maxWidth: "150px",
                              maxHeight: "150px",
                              width: "auto",
                              height: "auto",
                            }}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="flex-start">
                          <div>
                            <h5>
                              Name :{" "}
                              {`${
                                mainState?.vendor_details?.[0]?.first_name ||
                                "...."
                              } ${
                                mainState?.vendor_details?.[0]?.last_name ||
                                "...."
                              }`}
                            </h5>
                          </div>
                        </div>
                        <div className="flex-start">
                          <div>
                            <h5>
                              Email : {mainState?.email_address || "...."}
                            </h5>
                          </div>
                        </div>
                        <div className="flex-start">
                          <div>
                            <h5>Phone : {mainState?.contect_no || "...."}</h5>
                          </div>
                        </div>
                        <div className="flex-start">
                          <div>
                            <h5>
                              Vendor Type :{" "}
                              {mainState?.vendor_details?.[0]?.vendor_type ||
                                "...."}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-2 mt-md-0">
                <div className="card">
                  <div className="card-header">Shop Info</div>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    {/* <div className="col-md-8 mt-2"> */}
                    <div className="flex-start">
                      <img
                        src={
                          mainState?.vendor_details?.[0]?.shop_banner ||
                          dummyShopLogo
                        }
                        style={{
                          width: "100%",
                          maxHeight: "100px",
                          marginTop: "8px",
                          marginBottom: "8px",
                          flex: "50%",
                        }}
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div className="w-50">
                        <div
                          className="flex-center"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={
                              mainState?.vendor_details?.[0]?.company_logo ||
                              dummyShopLogo
                            }
                            style={{
                              display: "block",
                              maxWidth: "150px",
                              maxHeight: "150px",
                              width: "auto",
                              height: "auto",
                            }}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="flex-start">
                          <div>
                            <h5>
                              Shop Name :{" "}
                              {mainState?.vendor_details?.[0]?.company_name ||
                                "...."}
                            </h5>
                          </div>
                        </div>
                        {/* <div className="flex-start">
                          <div>
                            <h5>
                              Shop Phone :{" "}
                              {mainState?.vendor_details?.[0]?.vendor_contact ||
                                "...."}
                            </h5>
                          </div>
                        </div> */}
                        <div className="flex-start">
                          <div>
                            <h5>
                              Shop Address :{" "}
                              {mainState?.vendor_details?.[0]
                                ?.company_address || "...."}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="card">
                  <div className="card-header">Bank info</div>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    {/* <div className="col-md-8 mt-2"> */}
                    <div className="flex-start">
                      <div>
                        <h4>
                          Bank name :{" "}
                          {mainState?.bank_details?.[0]?.bank_name || "..."}
                        </h4>
                      </div>
                    </div>
                    <div className="flex-start">
                      <div>
                        <h6>
                          Branch :{" "}
                          {mainState?.bank_details?.[0]?.branch_name || "..."}
                        </h6>
                      </div>
                    </div>
                    <div className="flex-start">
                      <div>
                        <h6>
                          Holder name :{" "}
                          {mainState?.bank_details?.[0]?.holder_name || "..."}
                        </h6>
                      </div>
                    </div>
                    <div className="flex-start">
                      <div>
                        <h6>
                          Account no :{" "}
                          {mainState?.bank_details?.[0]?.account_no || "..."}
                        </h6>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {key === "order" && (
          <>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="order">
                <div className="row pt-2">
                  <div className="col-md-12">
                    <div className="card w-100">
                      <div className="card-header">Order Info</div>
                      <div className="card-body">
                        <div className="row gx-lg-4">
                          <div className="col-sm-6 col-lg-4">
                            <div className="flex-between align-items-center">
                              <div
                                className="media-body"
                                style={{ textAlign: "left" }}
                              >
                                <h6 className="card-subtitle">Pending</h6>
                                <span className="card-title h3">
                                  {mainState?.pendingCount || 0}
                                </span>
                              </div>
                              {/* <div className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                                <i className="tio-airdrop" />
                              </div> */}
                            </div>
                            <div className="d-lg-none">
                              <hr />
                            </div>
                          </div>
                          <div className="col-sm-6 col-lg-4 column-divider-sm">
                            <div className="flex-between align-items-center">
                              <div
                                className="media-body"
                                style={{ textAlign: "left" }}
                              >
                                <h6 className="card-subtitle">Paid</h6>
                                <span className="card-title h3">
                                  {mainState?.paidCount || 0}
                                </span>
                              </div>
                              {/* <div className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                                <i className="tio-checkmark-circle" />
                              </div> */}
                            </div>
                            <div className="d-lg-none">
                              <hr />
                            </div>
                          </div>
                          <div className="col-sm-6 col-lg-4 column-divider-sm">
                            <div className="flex-between align-items-center">
                              <div
                                className="media-body"
                                style={{ textAlign: "left" }}
                              >
                                <h6 className="card-subtitle">All</h6>
                                <span className="card-title h3">
                                  {mainState?.allCount || 0}
                                </span>
                              </div>
                              {/* <div className="icon icon-sm icon-soft-secondary icon-circle ml-3">
                                <i className="tio-table" />
                              </div> */}
                            </div>
                            <div className="d-lg-none">
                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row gx-lg-4">
                          <div className="col-6 col-sm-12 col-md-4">
                            <form>
                              <div className="input-group input-group-merge input-group-flush">
                                <div className="input-group-prepend">
                                  <div className="input-group-text">
                                    <i className="tio-search" />
                                  </div>
                                </div>
                                <input
                                  id="datatableSearch_"
                                  type="search"
                                  name="search"
                                  className="form-control"
                                  placeholder="Search"
                                  aria-label="Search orders"
                                  onChange={(e) => {
                                    setSearch(e.target.value);
                                    // FIXME : cant search with number types and nested arrays
                                    setOrderList(
                                      searchFor(e.target.value, resOrderList)
                                    );
                                  }}
                                  value={search}
                                />
                                <button
                                  onClick={(e) => e.preventDefault()}
                                  className="btn btn-primary"
                                >
                                  Search
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="col-6 col-sm-12 col-md-4">
                            <div className="form-group">
                              {/* <label className="input-label" htmlFor="priority">
                              Filter By
                              <span>
                                <i
                                  className="tio-info-outined m-1"
                                  title="The lowest number will get the highest priority"
                                />
                              </span>
                            </label> */}
                              <select
                                className="form-control"
                                name="filter"
                                onChange={handleInputChange}
                              >
                                <option value="" selected disabled>
                                  ---Default Sort---
                                </option>
                                {mainState?.options?.default?.length &&
                                  mainState?.options?.default.map((item) => (
                                    <option value={item?.value}>
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="table-responsive datatable-custom"
                        style={{ maxHeight: "50vh", overflowY: "scroll" }}
                      >
                        <table
                          id="datatable"
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                          data-hs-datatables-options='{
                          "columnDefs": [{
                              "targets": [0],
                              "orderable": false
                          }],
                          "order": [],
                          "info": {
                          "totalQty": "#datatableWithPaginationInfoTotalQty"
                          },
                          "search": "#datatableSearch",
                          "entries": "#datatableEntries",
                          "pageLength": 25,
                          "isResponsive": false,
                          "isShowPaging": false,
                          "pagination": "datatablePagination"
                      }'
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className>SL</th>
                              <th className="table-column-pl-0">Order</th>
                              <th>ProductName</th>
                              <th>Date</th>
                              <th>Customer</th>
                              <th>Payment Status</th>
                              <th>Total</th>
                              <th>Order Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody id="set-rows">
                            {orderList?.length
                              ? orderList?.map((item, index) => (
                                  <tr className="status class-all">
                                    <td className>{index + 1}</td>
                                    <td className="table-column-pl-0">
                                      {/* <Link to="/admin/sellers/order-details/100115/1"> */}
                                      {/* <Link to={`/admin/orders/details/${item?._id}`} state={item}> */}
                                      {item?._id || "...."}
                                      {/* </Link> */}
                                    </td>
                                    <td>
                                      {item?.pname?.slice(0, 20) || "..."}
                                    </td>
                                    <td>
                                      {ISOToIST(
                                        item?.order_master?.order_date_time
                                      ) || "...."}
                                    </td>
                                    <td>
                                      <Link
                                        className="text-body text-capitalize"
                                        to={`/admin/customer/view/${item?.order_master?.regid}`}
                                      >
                                        {item?.order_master?.customer_name ||
                                          "...."}
                                      </Link>
                                    </td>
                                    <td>
                                      <span className="badge badge-soft-danger text-capitalize">
                                        <span
                                          className="legend-indicator bg-danger"
                                          style={{
                                            marginLeft: 0,
                                            marginRight: ".4375rem",
                                          }}
                                        ></span>
                                        {item?.order_master?.payment_status ||
                                          "...."}
                                      </span>
                                    </td>
                                    <td>
                                      {item?.order_master?.paidamount || "...."}
                                    </td>
                                    <td className="text-capitalize">
                                      <span className="badge badge-soft-info ml-2 ml-sm-3">
                                        <span
                                          className="legend-indicator bg-info"
                                          style={{
                                            marginLeft: 0,
                                            marginRight: ".4375rem",
                                          }}
                                        ></span>
                                        {item?.order_status || "...."}
                                      </span>
                                    </td>
                                    <td>
                                      <Link
                                        title="View"
                                        className="btn btn-info btn-sm"
                                        // to="/admin/sellers/order-details/100115/2"
                                        // to={`/admin/orders/details/${item?._id}`}
                                        to={`/admin/sellers/orders/details/${item?._id}`}
                                        state={item}
                                      >
                                        <i className="tio-visible" />
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              : null}
                          </tbody>
                        </table>
                      </div>
                      <div className="card-footer">
                        <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
                          <div className="col-sm-auto">
                            <div className="d-flex justify-content-center justify-content-sm-end"></div>
                          </div>
                        </div>
                      </div>
                      {!mainState?.order_detail?.length && (
                        <div className="text-center p-4">
                          <img
                            className="mb-3"
                            alt="Image Description"
                            style={{ width: "7rem" }}
                          />
                          <p className="mb-0">No data to show</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {key === "product" && (
          <>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="product">
                <div className="row pt-2">
                  <div className="col-md-12">
                    <div className="card h-100">
                      <div className="card-header">
                        <div className="flex-start">
                          <div className="mx-1">
                            <h3>Products</h3>
                          </div>
                          <div>
                            <h3>
                              <span style={{ color: "red" }}>
                                ({mainState?.stock?.length || 0})
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive datatable-custom">
                        <table
                          id="columnSearchDatatable"
                          style={{ textAlign: "left" }}
                          className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                          data-hs-datatables-options='{
                                  "order": [],
                                  "orderCellsTop": true,
                                  "paging": false
                              }'
                        >
                          <thead className="thead-light">
                            <tr>
                              <th style={{ width: "10%" }}>SL#</th>
                              <th style={{ width: "40%" }}>Product Name</th>
                              <th style={{ width: "10%" }}>MRP</th>
                              <th style={{ width: "10%" }}>Selling price</th>
                              <th style={{ width: "10%" }}>Active Status</th>
                              <th
                                style={{ width: "10%" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody id="set-rows">
                            {!!mainState?.stock?.length
                              ? mainState?.stock?.map((item, index) => (
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        whiteSpace: "unset",
                                      }}
                                    >
                                      <Link
                                        to={`/admin/product/view/${item?._id}`}
                                      >
                                        {item?.Product?.pname || "...."}
                                      </Link>
                                    </td>
                                    <td>₹{item?.display_price || "..."}</td>
                                    <td>₹{item?.selling_price || "..."}</td>
                                    <td>
                                      <label className="switch switch-status">
                                        <input
                                          type="checkbox"
                                          className="status"
                                          checked={
                                            !!item?.Product?.product_status
                                              ? true
                                              : false
                                          }
                                          onChange={(e) => {
                                            handleToggleProductActiveStatus(
                                              e.target.checked,
                                              item?.product_id,
                                              index
                                            );
                                          }}
                                        />
                                        <span className="slider round" />
                                      </label>
                                    </td>
                                    <td>
                                      {/* <Link
                                      className="btn btn-primary btn-sm"
                                      to="/admin/product/edit/30"
                                    >
                                      <i className="tio-edit" />
                                      Edit
                                    </Link> */}
                                      {item?.Product?.manage_by == "admin" ? (
                                        <Link
                                          className="btn btn-primary btn-sm m-1"
                                          to={`/admin/sellers/product/edit/${
                                            index + 1
                                          }`}
                                          // to={`/admin/product/edit/${index + 1}`}
                                          state={item}
                                        >
                                          <i className="tio-edit" />
                                          Edit
                                        </Link>
                                      ) : (
                                        <Link
                                          className="btn btn-secondary btn-sm m-1"
                                          // to={`/admin/product/edit/${index + 1}`}
                                          to=""
                                          state={item}
                                        >
                                          <i className="tio-edit" />
                                          Edit
                                        </Link>
                                      )}
                                      {item?.Product?.manage_by == "admin" ? (
                                        <Link
                                          className="btn btn-danger btn-sm"
                                          to=""
                                          onClick={() => {
                                            handleDeleteItem(
                                              item?.product_id,
                                              index
                                            );
                                          }}
                                        >
                                          <i className="tio-add-to-trash" />{" "}
                                          Delete
                                        </Link>
                                      ) : (
                                        <Link
                                          className="btn btn-secondary btn-sm m-1"
                                          to=""
                                          // onClick={() => { handleDeleteItem(item?.product_id, index) }}
                                        >
                                          <i className="tio-add-to-trash" />{" "}
                                          Delete
                                        </Link>
                                      )}

                                      <form id="product-30">
                                        <input
                                          type="hidden"
                                          name="_method"
                                          defaultValue="delete"
                                        />{" "}
                                      </form>
                                    </td>
                                  </tr>
                                ))
                              : null}
                          </tbody>
                        </table>
                      </div>
                      <div className="card-footer"></div>
                      {!mainState?.stock?.length && (
                        <div className="text-center p-4">
                          <img
                            className="mb-3"
                            alt="Image Description"
                            style={{ width: "7rem" }}
                          />
                          <p className="mb-0">No data to show</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {key === "setting" && (
          <>
            <div className="row">
              <div className="col-md-6 mt-3">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                  />{" "}
                  <div className="card">
                    <div className="card-header">
                      <label> Sales Commission : </label>
                      <label className="switch ml-3">
                        <input
                          type="checkbox"
                          name="commission_status"
                          className="status"
                          defaultValue={1}
                        />
                        <span className="slider round" />
                      </label>
                    </div>
                    <div className="card-body" style={{ overflowX: "scroll" }}>
                      <small className="badge badge-soft-danger mb-3">
                        If sales commission is disabled here the system default
                        commission will be applied.
                      </small>
                      <div className="form-group">
                        <label>Commission ( % )</label>
                        <input
                          type="number"
                          defaultValue
                          className="form-control"
                          name="commission"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6 mt-3">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                  />{" "}
                  <div className="card">
                    <div className="card-header">
                      <label> GST Number : </label>
                      <label className="switch ml-3">
                        <input
                          type="checkbox"
                          name="gst_status"
                          className="status"
                          defaultValue={1}
                        />
                        <span className="slider round" />
                      </label>
                    </div>
                    <div className="card-body" style={{ overflowX: "scroll" }}>
                      <small className="badge badge-soft-danger mb-3">
                        If GST number is disabled here it will not show in
                        invoice.
                      </small>
                      <div className="form-group">
                        <label> Number </label>
                        <input
                          type="text"
                          defaultValue
                          className="form-control"
                          name="gst"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Update{" "}
                      </button>
                    </div>
                  </div>
                </form>
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
                        defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                      />{" "}
                      <label>Seller POS permission on/off</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          name="seller_pos"
                          type="radio"
                          defaultValue={1}
                          id="seller_pos1"
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
                          defaultChecked
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
            </div>
          </>
        )}

        {key === "transaction" && (
          <>
            <div className="content container-fluid p-0">
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row d-flex justify-content-between align-items-center flex-grow-1">
                        <div className="col-md-3 col-12">
                          <h3 className="text-capitalize">
                            Transaction table
                            <span className="badge badge-soft-dark mx-2">
                              0
                            </span>
                          </h3>
                        </div>
                        <div className="col-md-4 col-12">
                          <form>
                            <div className="input-group input-group-merge input-group-flush">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <i className="tio-search" />
                                </div>
                              </div>
                              <input
                                id="datatableSearch_"
                                type="search"
                                // FIXME
                                name="search_transactions"
                                className="form-control"
                                placeholder="Search by orders id or transaction id"
                                aria-label="Search orders"
                              />
                              <button type="submit" className="btn btn-primary">
                                Search
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="col-md-4 col-12 mt-2 mt-md-0">
                          <form>
                            <div className="row ">
                              <div className="col-md-8">
                                <select className="form-control" name="status">
                                  <option
                                    className="text-center"
                                    value={0}
                                    selected
                                    disabled
                                  >
                                    ---Select status---
                                  </option>
                                  <option
                                    className="text-left text-capitalize"
                                    value="all"
                                  >
                                    All{" "}
                                  </option>
                                  <option
                                    className="text-left text-capitalize"
                                    value="disburse"
                                  >
                                    Disburse{" "}
                                  </option>
                                  <option
                                    className="text-left text-capitalize"
                                    value="hold"
                                  >
                                    Hold
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-2 mt-2 mt-md-0 ">
                                <button
                                  type="submit"
                                  className="btn btn-success float-right"
                                >
                                  Filter
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                      <div className="table-responsive">
                        <table
                          id="datatable"
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>SL#</th>
                              <th>Seller name</th>
                              <th>Customer name</th>
                              <th>Order id</th>
                              <th>Transaction id</th>
                              <th>Order amount</th>
                              <th>Seller amount</th>
                              <th>Admin commission</th>
                              <th>Received by</th>
                              <th>Delivered by</th>
                              <th>Delivery charge</th>
                              <th>Payment method</th>
                              <th>Tax</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                        <div className="text-center p-4">
                          <img
                            className="mb-3"
                            alt="Image Description"
                            style={{ width: "7rem" }}
                          />
                          <p className="mb-0">No data to show</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* {key === "review" && (
          <>
            <div className="content container-fluid p-0">
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-sm mb-2 mb-sm-0">
                    <h1 className="page-header-title">Review list</h1>
                  </div>
                </div>
              </div>
              <div className="row gx-2 gx-lg-3">
                <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
                  <div className="card">
                    <div className="row card-header">
                      <div className="flex-start">
                        <div className="mx-1">
                          <h5>Review Table</h5>
                        </div>
                        <div>
                          <h5>
                            <span style={{ color: "red" }}>
                              ({mainState?.stock?.length || "0"})
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="row justify-content-between align-items-center flex-grow-1">
                        <div className="col-lg-3" />
                        <div className="col-lg-6 mb-3 mb-lg-0">
                          <form>
                            <div className="input-group input-group-merge input-group-flush">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <i className="tio-search" />
                                </div>
                              </div>
                              <input
                                id="datatableSearch_"
                                type="search"
                                // FIXME
                                name="search_reviews"
                                className="form-control"
                                placeholder="Search by product name"
                                aria-label="Search orders"
                              />
                              <button type="submit" className="btn btn-primary">
                                Search
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                      <div className="table-responsive datatable-custom">
                        <table
                          id="columnSearchDatatable"
                          style={{ textAlign: "left" }}
                          className="table table-borderless table-thead-bordered table-align-middle card-table"
                          data-hs-datatables-options='{
                           "order": [],
                           "orderCellsTop": true
                         }'
                        >
                          <thead className="thead-light">
                            <tr>
                              <th style={{ width: "10%" }}>#SL</th>
                              <th style={{ width: "40%" }}>Product</th>
                              <th style={{ width: "40%" }}>Review</th>
                              <th style={{ width: "10%" }}>Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!!mainState?.stock?.length
                              ? mainState.stock.map((item, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    <span className="d-block font-size-sm text-body">
                                      <Link to="/admin/product/view/3">
                                        {item?.Product?.pname || "...."}
                                      </Link>
                                    </span>
                                  </td>
                                  <td>
                                    <p style={{ wordWrap: "break-word" }}>
                                      {item?.Product?.pname || "...."}
                                    </p>
                                    <Link
                                      className="float-left"
                                      to="/storage/app/public/review/2022-04-21-6260ee542ad0f.png"
                                      data-lightbox="mygallery"
                                    >
                                      <img
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          padding: "10px",
                                        }}
                                        alt=""
                                      />
                                    </Link>
                                    <Link
                                      className="float-left"
                                      to="/storage/app/public/review/2022-04-21-6260ee5432db4.png"
                                      data-lightbox="mygallery"
                                    >
                                      <img
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          padding: "10px",
                                        }}
                                        alt=""
                                      />
                                    </Link>
                                    <Link
                                      className="float-left"
                                      to="/storage/app/public/review/2022-04-21-6260ee5432e3b.png"
                                      data-lightbox="mygallery"
                                    >
                                      <img
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          padding: "10px",
                                        }}
                                        alt=""
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <label className="badge badge-soft-info">
                                      5 <i className="tio-star" />
                                    </label>
                                  </td>
                                </tr>
                              ))
                              : null}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer"></div>
                    <div className="text-center p-4">
                      <img
                        className="mb-3"
                        alt="Image Description"
                        style={{ width: "7rem" }}
                      />
                      <p className="mb-0">No data to show</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )} */}
      </div>
    </main>
  );
}

export default AdminSellersView;
