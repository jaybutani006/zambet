import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSellerSessionToken } from "utils/Common";
import { ISOToIST } from "utils/DateTime";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from "react";
import { Context } from "context/newContext";
import { defaultAPIErrorHandler } from "api/api";

function SellerPosOrders() {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [resOrdersList, setResOrdersList] = useState([]);
  const [search, setSearch] = useState("");

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Seller_Orders", limit: "offline" },
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
        defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/order/venderorder",
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
        setOrdersList(
          response.data.data.filter((order) => order.order_type === "offline")
        );
        setResOrdersList(
          response.data.data.filter((order) => order.order_type === "offline")
        );
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
        <div className="page-header mb-1">
          <div className="flex-between align-items-center">
            <div>
              <h1 className="page-header-title">
                Pos orders{" "}
                <span className="badge badge-soft-dark mx-2">
                  {ordersList?.length || 0}
                </span>
              </h1>
            </div>
            <div>
              <i className="tio-shopping-cart" style={{ fontSize: "30px" }} />
            </div>
          </div>
          <div className="js-nav-scroller hs-nav-scroller-horizontal">
            <span
              className="hs-nav-scroller-arrow-prev"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-left" />
              </a>
            </span>
            <span
              className="hs-nav-scroller-arrow-next"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-right" />
              </a>
            </span>
            <ul className="nav nav-tabs page-header-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Order list
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex-between justify-content-between align-items-center flex-grow-1">
              <div>
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
                      placeholder="Search orders"
                      aria-label="Search orders"
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setOrdersList(searchFor(e.target.value, resOrdersList));
                      }}
                      value={search}
                    />
                    <button
                      //  type="submit"
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
          <div
            className="table-responsive datatable-custom"
            style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            <table
              className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
              style={{ width: "100%", textAlign: "left" }}
            >
              <thead className="thead-light">
                <tr>
                  {/* <th>SL#</th>
                  <th>Order Id</th>
                  <th>Order DateTime</th>
                  <th>Customer name</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Order Status </th>
                  <th>Action</th> */}

                  <th>SL#</th>
                  <th>Order Id</th>
                  <th>Order DateTime</th>
                  <th>Customer name</th>
                  <th>Phone</th>
                  <th>Payment Status</th>
                  <th>Order Status </th>
                  <th>Delivery Location</th>
                  <th>Total Amount</th>
                  <th>Action</th>
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
                {!!ordersList?.length &&
                  ordersList.map((item, index) => (
                    <tr className="status-delivered class-all">
                      <td className>{index + 1 || 1}</td>
                      <td className="table-column-pl-0">
                        {/* <Link
                            to={"/seller/pos/order-details/" + item._id}
                            state={item}
                          > */}
                        {item._id || "100067"}
                        {/* </Link> */}
                      </td>
                      <td>{ISOToIST(item.order_date_time) || "20 Mar 2022"}</td>
                      <td>
                        <a
                          className="text-body text-capitalize"
                          href="/seller/orders/details/100067"
                        >
                          {item.customer_name || "walking customer"}
                        </a>
                      </td>
                      <td>{item.customer_mobile}</td>
                      <td className="text-capitalize">
                        <span
                          // className="badge badge-soft-danger"
                          className={`badge badge-soft-${
                            item.payment_status === "paid"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          <span
                            // className="legend-indicator bg-danger"
                            className={`legend-indicator bg-${
                              item.payment_status === "paid"
                                ? "success"
                                : "danger"
                            }`}
                            style={{
                              marginLeft: 0,
                              marginRight: ".4375rem",
                            }}
                          />
                          {item.payment_status}
                        </span>
                      </td>
                      <td className="text-capitalize">
                        <label
                          className={`badge badge-${
                            item?.OrderDetails?.[0]?.order_status === "pending"
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
                      <td>{item.order_address.slice(0, 20)}</td>
                      <td>₹{`${item.grandtotal}`}</td>
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
                              to={"/seller/pos/order-details/" + item._id}
                              state={item}
                            >
                              <i className="tio-visible" /> View
                            </Link>
                            <Link
                              className="dropdown-item"
                              to=""
                              // target="_blank"
                              // to={"/seller/orders/generate-invoice/" + item._id}
                            >
                              <i className="tio-download" /> Invoice
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
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
          {!ordersList?.length && (
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

export default SellerPosOrders;
