import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function SellerRefundRequestList() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const [resRefundList, setResRefundList] = useState([]);
  const [refundList, setRefundList] = useState([]);

  const locPathNamelastSlice = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const handleInputChange = (e, index) => {
    const { name } = e.target;

    setRefundList((prev) => [
      ...refundList.slice(0, index),
      { ...refundList[index], activeStatus: e.target.checked },
      ...refundList.slice(index + 1),
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
      params: { queryType: "Seller_ProductReturns" },
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
    // FIXME
    setRefundList(
      resRefundList.filter(
        (item) => item?.payment_refund_status === locPathNamelastSlice
      )
    );
  }, [location.pathname]);

  const getRefundRequestListAPI = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/productReturn/productreturn",
      // params: { pickup_status: "processing" },
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
        setResRefundList(response.data.data);
        setRefundList(
          response.data.data.filter(
            (item) => item?.payment_refund_status === locPathNamelastSlice
          )
        );
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const updateRefundMode = (productreturnId, payment_refund_mode) => {
    const config = {
      method: "put",
      url:
        process.env.REACT_APP_BASEURL + "/api/productReturn/refundstatusmode",
      params: { productreturn_id: productreturnId },
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      data: JSON.stringify({
        payment_refund_mode: payment_refund_mode,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        getRefundRequestListAPI();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };
  const updateRefundStatus = (productreturnId, payment_refund_status) => {
    const config = {
      method: "put",
      url:
        process.env.REACT_APP_BASEURL + "/api/productReturn/refundstatusmode",
      params: { productreturn_id: productreturnId },
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      data: JSON.stringify({
        payment_refund_status: payment_refund_status,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        getRefundRequestListAPI();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getRefundRequestListAPI();
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
                {/* IMP */}
                {locPathNamelastSlice.charAt(0).toUpperCase() +
                  locPathNamelastSlice.slice(1) +
                  " Request List"}
                <span className="badge badge-soft-dark mx-2">
                  {refundList?.length || 0}
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
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex-between justify-content-between align-items-center flex-grow-1">
              <div className="col-12 col-md-6">
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
                      placeholder="Search by order id or refund id"
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
                  <th className>SL#</th>
                  <th>Refund id</th>
                  <th>Order id </th>
                  {/* <th>Customer name</th> */}
                  <th>Returned Status</th>
                  <th>Refund Status</th>
                  <th>Refund Mode</th>
                  <th>Amount</th>
                  <th>Product name</th>
                  {/* <th>Action</th> */}
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
                {!!refundList.length &&
                  refundList.map((item) => (
                    <tr>
                      <td>1</td>
                      <td>
                        {/* <Link to="/admin/refund/details/8"> */}
                        {item?._id || "..."}
                        {/* </Link> */}
                      </td>
                      <td>
                        {/* <Link to="/admin/orders/details/100120"> */}
                        {item?.oid || "..."}
                        {/* </Link> */}
                      </td>
                      <td>{item?.pickup_status || "..."}</td>
                      <td>
                        {/* {item?.payment_refund_status || "pending"} */}
                        <select
                          className="js-example-basic-multiple form-control form-control-input"
                          // name="category_id"
                          name="payment_refund_mode"
                          //
                          onChange={(e) =>
                            updateRefundMode(item?._id, e.target.value)
                          }
                          // value={mainState.selected.payment_refund_mode}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {[
                            { name: "UPI", value: "upi" },
                            { name: "Bank Transfer", value: "banktransfer" },
                          ].map((item2, index) => (
                            <option
                              key={index}
                              value={item2?.value}
                              selected={
                                item2?.value === item?.payment_refund_mode
                              }
                            >
                              {item2?.name}
                            </option>
                          ))}
                          {/* {mainState.options.gst_type.length
                          ? mainState.options.gst_type.map((item) => (
                              <option value={item.value}>{item.name}</option>
                            ))
                          : null} */}
                        </select>
                      </td>
                      <td>
                        <select
                          className="js-example-basic-multiple form-control form-control-input"
                          // name="category_id"
                          name="payment_refund_status"
                          //updateRefundStatus
                          onChange={(e) =>
                            updateRefundStatus(item?._id, e.target.value)
                          }
                          // value={mainState.selected.payment_refund_status}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {[
                            { name: "Pending", value: "pending" },
                            { name: "Refunded", value: "refunded" },
                          ].map((item2, index) => (
                            <option
                              key={index}
                              value={item2?.value}
                              selected={
                                item2?.value == item?.payment_refund_status
                              }
                            >
                              {item2?.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* <td>{item?.payment_refund_status || ""}</td> */}
                      {/* <td>{item?.payment_refund_mode || ""}</td> */}
                      <td>₹{item?.pprice || ""}</td>
                      <td>
                        {/* <Link to="/admin/product/view/9"> */}
                        {item?.pname.slice(0, 25) || "..."}
                        {/* </Link> */}
                      </td>
                      {/* <td>
                        <Link
                          className="btn btn-primary btn-sm mr-1"
                          title="View"
                          to="/admin/refund/details/8"
                        >
                        <i className="tio-visible" />
                        </Link>
                      </td> */}
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
          {!refundList?.length && (
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

export default SellerRefundRequestList;
