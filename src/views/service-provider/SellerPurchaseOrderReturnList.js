import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { ISOToIST } from "utils/DateTime";
import { searchFor } from "utils/search-through-all-values-in-objects";
import { Context } from "context/newContext";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

function SellerPurchaseOrderReturnList() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [resOrderList, setResOrderList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [search, setSearch] = useState("");

  const handleInputChange = (e, index) => {
    const { name } = e.target;

    setOrderList((prev) => [
      ...orderList.slice(0, index),
      { ...orderList[index], activeStatus: e.target.checked },
      ...orderList.slice(index + 1),
    ]);

    // if (name === "pphoto") {
    //   setProductDetails((prev) => ({ ...prev, [name]: e.target.files[0] }));
    // } else {
    //   setProductDetails((prev) => ({ ...prev, [name]: e.target.value }));
    // }
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Seller_PurchaseOrderReturns" },
      headers: {
        Authorization: state.sellerToken,
      },
      responseType: "blob",
    })
      .then((response) => {
        console.log("Successfully Exported");
        console.log(response.headers?.filename);
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "unknown";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
        }
        link.setAttribute("download", fileName);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/purchase/return",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/seller/dashboard", { replace: true });
        // setOrderList(
        //   response.data.data.map((item) => ({
        //     ...item,
        //     orderNumber: item._id,
        //     customerName: item.customer_name,
        //     phone: item.customer_mobile,
        //     paymentStatus: item.payment_status,
        //     orderStatus: item.order_status || "CONFIRMED⭐",
        //   }))
        // );

        // setResOrderList(response.data.data);

        setResOrderList(response.data.data);
        setOrderList(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <div className="row align-items-center mb-3">
          <div className="col-sm">
            <h1 className="page-header-title text-capitalize">
              {/* {location.pathname.substring(
                location.pathname.lastIndexOf("/") + 1
              )}{" "} */}
              Purchase Order Return List
              <span className="badge badge-soft-dark ml-2">
                {orderList.length}
              </span>
            </h1>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row  justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-sm-6 col-md-4">
                    <h5>Return table </h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
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
                </div>
              </div>
              <div className="card-header">
                <div className="row flex-between justify-content-between flex-grow-1">
                  {/* <div className="col-12 col-md-4">
                    <form action method="GET">
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
                          placeholder="Search orders"
                          aria-label="Search orders"
                       
                        />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div> */}
                  <div className="col-12 col-md-5 mt-2 mt-sm-0">
                    <form id="form-data">
                      <div className="row">
                        {/* <div className="col-12 col-sm-4">
                          <input
                            type="date"
                            name="from"
                            id="from_date"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 col-sm-4 mt-2 mt-sm-0">
                          <input
                            type="date"
                            name="to"
                            id="to_date"
                            className="form-control"
                          />
                        </div> */}
                        {/* <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                          <select
                            name="qty_ordr_sort"
                            className="form-control"
                          >
                            <option value="default">Default Filter</option>
                            {[].map((item) => (
                              <option value="">{item}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => e.preventDefault()}
                            // type="submit"
                            className="btn btn-primary float-right float-sm-none"
                            onclick="formUrlChange(this)"
                          >
                            Filter
                          </button>
                        </div> */}
                        <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleExport();
                            }}
                            className="btn btn-success float-right float-sm-none"
                          >
                            Export
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="float-right">
                      <label> Inhouse orders only : </label>
                      <label className="switch ml-3">
                        <input
                          type="checkbox"
                          className="status"
                          onclick="filter_order()"
                          defaultChecked
                        />
                        <span className="slider round" />
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>SL#</th>
                        {/* <th>Purchase Order Id</th> */}
                        <th>Purchase Order Return DateTime</th>
                        <th>Contact Person Name</th>
                        <th>Email</th>
                        {/* <th>Payment Status</th> */}
                        {/* <th>Order Status </th> */}
                        {/* <th>Delivery Location</th> */}
                        <th>Return Status</th>
                        <th>Final Amount</th>
                        <th style={{ width: "30px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (
                        <tr>
                          <td colSpan={"100%"}>
                            <center>
                              <ClipLoader
                                // color={"#ffffff"}
                                // loading={!!camps}
                                loading
                                // cssOverride={override}
                                // size={150}
                              />
                            </center>
                          </td>
                        </tr>
                      )}
                      {!!orderList.length &&
                        orderList
                          .slice(0)
                          .reverse()
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              {/* <td> */}
                              {/* <Link to={"/seller/orders/details/" + item._id} state={item}> */}
                              {/* {item._id} */}
                              {/* </Link> */}
                              {/* </td> */}
                              <td>{ISOToIST(item.order_date)}</td>
                              <td>
                                {item?.billing_info?.billing_contact_person}
                              </td>
                              <td>{item.email}</td>
                              <td className="text-capitalize">
                                <span
                                  // className="badge badge-soft-danger"
                                  className={`badge badge-soft-${
                                    item?.return_status === "returned"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  <span
                                    // className="legend-indicator bg-danger"
                                    className={`legend-indicator bg-${
                                      item?.return_status === "returned"
                                        ? "success"
                                        : "danger"
                                    }`}
                                    style={{
                                      marginLeft: 0,
                                      marginRight: ".4375rem",
                                    }}
                                  />
                                  {item?.return_status || "..."}
                                </span>
                              </td>
                              {/*
                            <td className="text-capitalize">
                              <label
                                className={`badge badge-${
                                  item?.OrderDetails?.[0]?.order_status ===
                                  "pending"
                                    ? "primary"
                                    : item?.OrderDetails?.[0]?.order_status ===
                                        "confirmed" ||
                                      item?.OrderDetails?.[0]?.order_status ===
                                        "delivered"
                                    ? "success"
                                    : item?.OrderDetails?.[0]?.order_status ===
                                      "processing"
                                    ? "warning"
                                    : "primary"
                                }`}
                              >
                                {item?.OrderDetails?.[0]?.order_status}
                              </label>
                            </td>
                            <td>{item?.order_address?.slice(0, 20)}</td> */}
                              <td>₹{`${item.order_final_amount}`}</td>
                              <td>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-outline-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <i className="tio-settings" />
                                  </button>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <Link
                                      className="dropdown-item"
                                      to={`/seller/purchase-order/${item._id}`}
                                      // to={`/seller/orders/details/${item._id}`}
                                      state={item}
                                    >
                                      <i className="tio-visible" /> View
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      // target="_blank"
                                      // to={`/seller/orders/generate-invoice/${item.orderNumber}`}
                                      // state={item}
                                      to={""}
                                    >
                                      <i className="tio-download" /> Invoice
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}

                      {/* 
                      <>
                        <tr>
                          <td>1</td>
                          <td>
                            <Link to="/seller/orders/details/100066">
                              100066
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-primary">
                              Pending
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100066"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100066"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <Link to="/seller/orders/details/100065">
                              100065
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-warning">
                              Processing
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100065"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100065"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <Link to="/seller/orders/details/100063">
                              100063
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-warning">
                              Processing
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100063"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100063"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <Link to="/seller/orders/details/100062">
                              100062
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Confirmed
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100062"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100062"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <Link to="/seller/orders/details/100057">
                              100057
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-primary">
                              Pending
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100057"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100057"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>
                            <Link to="/seller/orders/details/100051">
                              100051
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100051"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100051"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>
                            <Link to="/seller/orders/details/100050">
                              100050
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100050"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100050"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>
                            <Link to="/seller/orders/details/100049">
                              100049
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Confirmed
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100049"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100049"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>
                            <Link to="/seller/orders/details/100048">
                              100048
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Confirmed
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100048"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100048"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>
                            <Link to="/seller/orders/details/100046">
                              100046
                            </Link>
                          </td>
                          <td> Marjhan Sultana</td>
                          <td>01712251697</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-primary">
                              Pending
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100046"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100046"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>11</td>
                          <td>
                            <Link to="/seller/orders/details/100044">
                              100044
                            </Link>
                          </td>
                          <td> Marjhan Sultana</td>
                          <td>01712251697</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-primary">
                              Pending
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100044"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100044"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>12</td>
                          <td>
                            <Link to="/seller/orders/details/100039">
                              100039
                            </Link>
                          </td>
                          <td> Marjhan Sultana</td>
                          <td>01712251697</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100039"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100039"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>13</td>
                          <td>
                            <Link to="/seller/orders/details/100037">
                              100037
                            </Link>
                          </td>
                          <td> Fatema subarna</td>
                          <td>01885576624</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-primary">
                              Pending
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100037"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100037"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>14</td>
                          <td>
                            <Link to="/seller/orders/details/100036">
                              100036
                            </Link>
                          </td>
                          <td> Marjhan Sultana</td>
                          <td>01712251697</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Confirmed
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100036"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100036"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>15</td>
                          <td>
                            <Link to="/seller/orders/details/100033">
                              100033
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100033"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100033"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>16</td>
                          <td>
                            <Link to="/seller/orders/details/100032">
                              100032
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100032"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100032"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>17</td>
                          <td>
                            <Link to="/seller/orders/details/100031">
                              100031
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100031"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100031"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>18</td>
                          <td>
                            <Link to="/seller/orders/details/100030">
                              100030
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100030"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100030"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>19</td>
                          <td>
                            <Link to="/seller/orders/details/100029">
                              100029
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-danger">
                              <span
                                className="legend-indicator bg-danger"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Unpaid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100029"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100029"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>20</td>
                          <td>
                            <Link to="/seller/orders/details/100028">
                              100028
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100028"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100028"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>21</td>
                          <td>
                            <Link to="/seller/orders/details/100027">
                              100027
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100027"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100027"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>
                            <Link to="/seller/orders/details/100026">
                              100026
                            </Link>
                          </td>
                          <td> Al Khandakar</td>
                          <td>0000000000</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100026"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100026"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>23</td>
                          <td>
                            <Link to="/seller/orders/details/100023">
                              100023
                            </Link>
                          </td>
                          <td> Ashek Elahe</td>
                          <td>01879762951</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100023"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100023"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>24</td>
                          <td>
                            <Link to="/seller/orders/details/100020">
                              100020
                            </Link>
                          </td>
                          <td> Marjhan Sultana</td>
                          <td>01712251697</td>
                          <td>
                            <span className="badge badge-soft-success">
                              <span
                                className="legend-indicator bg-success"
                                style={{
                                  marginLeft: 0,
                                  marginRight: ".4375rem",
                                }}
                              />
                              Paid
                            </span>
                          </td>
                          <td className="text-capitalize ">
                            <label className="badge badge-success">
                              Delivered
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/seller/orders/details/100020"
                                >
                                  <i className="tio-visible" /> View
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  target="_blank"
                                  to="/seller/orders/generate-invoice/100020"
                                >
                                  <i className="tio-download" /> Invoice
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                      */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!orderList?.length && (
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
        </div>
      </div>
    </main>
  );
}

export default SellerPurchaseOrderReturnList;
