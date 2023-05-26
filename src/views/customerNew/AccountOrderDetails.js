import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dummyProductImage from "assets/dummyProductImage.png";
import { ISOToIST, ISOToMilliSeconds } from "utils/DateTime";
import { defaultAPIErrorHandler } from "api/api";

function AccountOrderDetails() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderdetail_id, setOrderdetail_id] = useState(
    location?.state?.orderdetail_id
  );

  const returnProduct = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/productReturn",
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        order_details_id: orderdetail_id,
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Success : Product Return Request");
        getOrderDetails();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };
  const cancelProduct = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/productReturn",
      headers: {
        Authorization: state.userToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        order_details_id: orderdetail_id,
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Success : Product Cancelled");
        getOrderDetails();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };
  const getOrderDetails = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/order/orderinfo",
      headers: {
        Authorization: state.userToken,
      },
      params: {
        orderdetail_id: orderdetail_id,
      },
    })
      .then((response) => {
        setOrderDetails(response.data?.data?.[0]);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const downloadInvoice = () => {
    console.log(orderDetails)
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/order/downloadInvoice",
      params: {
        orderdetail_id: orderdetail_id,
        // order_id: orderDetails?.order?._id
      },
      headers: {
        Authorization: state.userToken,
      },
      responseType: "blob",
    })
      .then((response) => {
        console.log("Successfully Exported");
        console.log(response.headers);
        // console.log(response.headers?.filename);
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        console.log(contentDisposition)
        let fileName = "unknown";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          console.log(fileNameMatch)
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
          console.log(fileName)
        }
        link.setAttribute("download", fileName);
        // link.setAttribute("download", "invoice11.pdf");

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
    getOrderDetails();
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        .page-item.active .page-link {\n            background-color: #3b71de            !important;\n        }\n\n        .page-item.active > .page-link {\n            box-shadow: 0 0 black !important;\n        }\n\n        .widget-categories .accordion-heading > a:hover {\n            color: #FFD5A4 !important;\n        }\n\n        .widget-categories .accordion-heading > a {\n            color: #FFD5A4;\n        }\n\n        body {\n            font-family: 'Titillium Web', sans-serif\n        }\n\n        .card {\n            border: none\n        }\n\n\n        .totals tr td {\n            font-size: 13px\n        }\n\n        .footer span {\n            font-size: 12px\n        }\n\n        .product-qty span {\n            font-size: 14px;\n            color: #6A6A6A;\n        }\n\n        .spanTr {\n            color: #FFFFFF;\n            font-weight: 900;\n            font-size: 13px;\n\n        }\n\n        .spandHeadO {\n            color: #FFFFFF !important;\n            font-weight: 400;\n            font-size: 13px;\n\n        }\n\n        .font-name {\n            font-weight: 600;\n            font-size: 12px;\n            color: #030303;\n        }\n\n        .amount {\n            font-size: 15px;\n            color: #030303;\n            font-weight: 600;\n            margin- left: 60px;\n\n        }\n\n        a {\n            color: #3b71de;\n            cursor: pointer;\n            text-decoration: none;\n            background-color: transparent;\n        }\n\n        a:hover {\n            cursor: pointer;\n        }\n\n        @media (max-width: 600px) {\n            .sidebar_heading {\n                background: #1B7FED;\n            }\n\n            .sidebar_heading h1 {\n                text-align: center;\n                color: aliceblue;\n                padding-bottom: 17px;\n                font-size: 19px;\n            }\n        }\n\n        @media (max-width: 768px) {\n            .for-tab-img {\n                width: 100% !important;\n            }\n\n            .for-glaxy-name {\n                display: none;\n            }\n        }\n\n        @media (max-width: 360px) {\n            .for-mobile-glaxy {\n                display: flex !important;\n            }\n\n            .for-glaxy-mobile {\n                margin- right: 6px;\n            }\n\n            .for-glaxy-name {\n                display: none;\n            }\n        }\n\n        @media (max-width: 600px) {\n            .for-mobile-glaxy {\n                display: flex !important;\n            }\n\n            .for-glaxy-mobile {\n                margin- right: 6px;\n            }\n\n            .for-glaxy-name {\n                display: none;\n            }\n\n            .order_table_tr {\n                display: grid;\n            }\n\n            .order_table_td {\n                border-bottom: 1px solid #fff !important;\n            }\n\n            .order_table_info_div {\n                width: 100%;\n                display: flex;\n            }\n\n            .order_table_info_div_1 {\n                width: 50%;\n            }\n\n            .order_table_info_div_2 {\n                width: 49%;\n                text-align: right        !important;\n            }\n\n            .spandHeadO {\n                font-size: 16px;\n                margin- left: 16px;\n            }\n\n            .spanTr {\n                font-size: 16px;\n                margin- right: 16px;\n                margin-top: 10px;\n            }\n\n            .amount {\n                font-size: 13px;\n                margin- left: 0px;\n\n            }\n\n        }\n    ",
        }}
      />
      <div
        className="container pb-5 mb-2 mb-md-4 mt-3 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n        font-family: sans-serif;\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    label {\n        font-size: 16px;\n    }\n\n    .divider-role {\n        border-bottom: 1px solid whitesmoke;\n    }\n\n    .sidebarL h3:hover + .divider-role {\n        border-bottom: 3px solid #f58300    !important;\n        transition: .2s ease-in-out;\n    }\n\n    .price_sidebar {\n        padding: 20px;\n    }\n\n    @media (max-width: 600px) {\n\n        .sidebar_heading h1 {\n            text-align: center;\n            color: aliceblue;\n            padding-bottom: 17px;\n            font-size: 19px;\n        }\n\n        .sidebarR {\n            padding: 24px;\n        }\n\n        .price_sidebar {\n            padding: 20px;\n        }\n    }\n\n",
            }}
          />
          <div className="sidebarR col-lg-3 col-md-3">
            <div
              className="price_sidebar rounded-lg box-shadow-sm"
              id="shop-sidebar"
              style={{ marginBottom: "-10px", background: "white" }}
            >
              <div className="box-shadow-sm"></div>
              <div className="pb-0" style={{ paddingTop: "12px" }}>
                <div className="sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className="active-menu" to="/account-oder">
                      My order
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className="sidebarL">
                  <h3
                    className="widget-title btnF "
                    style={{ fontWeight: 700 }}
                  >
                    <Link className to="/wishlists">
                      Wish List
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className to="/user-account">
                      Profile Info
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className to="/account-address">
                      Address{" "}
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <section className="col-lg-9 col-md-9">
            <div className="row">
              <div className="col-md-6 mb-4">
                <Link
                  className="page-link"
                  to="/account-oder"
                  style={{ textAlign: "left" }}
                >
                  <i className="czi-arrow-left mr-2" />
                  Back
                </Link>
              </div>
            </div>
            <div className="card box-shadow-sm">
              <div className="payment mb-3  table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr
                      className="order_table_tr"
                      style={{ background: "#3b71de" }}
                    >
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Order no:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr">
                              {orderDetails?.order?._id || "..."}{" "}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Order date:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr">
                              {" "}
                              {/* 27 Jun, 2022... */}
                              {ISOToIST(orderDetails?.order?.createdAt)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Delivery address:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr">
                              {`${orderDetails?.order?.order_address} ${orderDetails?.order?.order_pincode}`}
                              <br />
                              {`${orderDetails?.order?.order_city} ${!orderDetails?.order?.order_state ||
                                !orderDetails?.order?.order_country
                                  ? ""
                                  : "," +
                                orderDetails?.order?.order_state +
                                "," +
                                orderDetails?.order?.order_country
                                }`}
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Billing address:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr">
                              A1 Chirag,
                              <br />
                              Ahmedabad , 380027
                            </span>
                          </div>
                        </div>
                      </td> */}
                    </tr>
                    <tr
                      className="order_table_tr"
                      style={{ background: "#3b71de" }}
                    >
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Order Status:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr text-capitalize">
                              {orderDetails?.product?.order_status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Delivery Status:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr text-capitalize">
                              {orderDetails?.product?.delivery_status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Payment Mode:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr text-capitalize">
                              {orderDetails?.order?.paymentmode}
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              Billing address:{" "}
                            </span>
                          </div>
                          <div className="order_table_info_div_2">
                            <span className="spanTr">
                              A1 Chirag,
                              <br />
                              Ahmedabad , 380027
                            </span>
                          </div>
                        </div>
                      </td> */}
                    </tr>
                    <tr
                      className="order_table_tr"
                      style={{ background: "#3b71de" }}
                    >
                      <td className="order_table_td">
                        <div className="order_table_info_div">
                          <div className="order_table_info_div_1 py-2">
                            <span className="d-block spandHeadO">
                              {"Download Invoice "}
                              <i
                                className="fa fa-download"
                                onClick={() => {
                                  downloadInvoice();
                                }}
                              ></i>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                </table>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="col-2 for-tab-img">
                        <img
                          className="d-block"
                          src={
                            orderDetails?.product?.pphoto || dummyProductImage
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyProductImage;
                          }}
                          alt=""
                          width={60}
                        />
                      </td>
                      <td
                        className="col-10 for-glaxy-name"
                        style={{ verticalAlign: "middle" }}
                      >
                        <Link to={`/product/${orderDetails?.product?.pid}`}>
                          {orderDetails?.product?.pname || "..."}
                        </Link>
                        {orderDetails?.product?.order_status === "return" && (
                          <small> (Return processing) </small>
                        )}
                        <br />
                        <br />
                        {/* <span>Variant : </span> */}
                        {/* Amethyst-s */}
                      </td>
                      <td width="100%">
                        <div className="text-right">
                          <span className="font-weight-bold amount">
                            ₹{orderDetails?.product?.pprice || "..."}
                          </span>
                          <br />
                          <span>{`Qty:${orderDetails?.product?.qty || "..."
                            }`}</span>
                        </div>
                      </td>
                      <td>
                        {orderDetails?.product?.review?.length === 0 &&
                          orderDetails?.product?.order_status ===
                          "delivered" && (
                            <Link
                              to={`/submit-review/${orderDetails?.product?.pid}`}
                              state={{
                                pid: orderDetails?.product?.pid,
                              }}
                              // to=""
                              className="btn btn-primary btn-sm d-inline-block w-100 mb-2"
                            >
                              Review Product
                            </Link>
                          )}
                        {orderDetails?.product?.order_status === "delivered" &&
                          Date.now() <
                          ISOToMilliSeconds(orderDetails?.order?.createdAt) +
                          +orderDetails?.product?.return_period *
                          24 *
                          60 *
                          60 *
                          1000 && (
                            <Link
                              // to={`/refund-details/${orderdetail_id}`}
                              to=""
                              onClick={() => returnProduct()}
                              state={{
                                orderDetails,
                              }}
                              className="btn btn-primary btn-sm d-inline-block w-100 mb-2"
                            >
                              Return Product
                              {/* Refund details */}
                            </Link>
                          )}
                        {orderDetails?.product?.delivery_status === "pending" &&
                          orderDetails?.product?.order_status ===
                          "confirmed" && (
                            <Link
                              // to="/refund-details/143"
                              to
                              onClick={() => cancelProduct()}
                              className="btn btn-primary btn-sm d-inline-block w-100 mb-2"
                            >
                              Cancel Order
                            </Link>
                          )}
                      </td>
                    </tr>
                    {/* <tr style={{ borderBottom: "1px solid #d3d3d3" }} /> */}
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          width: "50%",
                        }}
                      >
                        <div className="row d-flex justify-content-end">
                          <div className="col-md-8 col-lg-5">
                            <table className="table table-borderless">
                              <tbody className="totals">
                                <tr>
                                  <td>
                                    <div className="text-left">
                                      <span className="font-weight-bold">
                                        Item
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-right">
                                      <span className="font-weight-bold amount ">
                                        {`${orderDetails?.product?.qty || "..."
                                          }`}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-left">
                                      <span className="font-weight-bold">
                                        Unit Price
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-right">
                                      <span className="font-weight-bold amount ">
                                        {`₹${orderDetails?.product?.pprice || "..."
                                          }`}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-left">
                                      <span className="font-weight-bold">
                                        Sub Total
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-right">
                                      <span className="font-weight-bold amount ">
                                        {`₹${(+orderDetails?.product?.pprice ||
                                            0) *
                                          (+orderDetails?.product?.qty || 0)
                                          }`}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-left">
                                      <span className="font-weight-bold">
                                        Tax
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-right">
                                      <span className="font-weight-bold amount ">
                                        {`₹0`}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="border-top border-bottom">
                                  <td>
                                    <div className="text-left">
                                      <span className="font-weight-bold">
                                        Total
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-right">
                                      <span className="font-weight-bold amount ">
                                        ₹
                                        {(+orderDetails?.product?.pprice || 0) *
                                          (+orderDetails?.product?.qty || 0)}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="row d-flex justify-content-end">
              <div className="col-md-8 col-lg-5">
                <table className="table table-borderless">
                  <tbody className="totals">
                    <tr className="border-top border-bottom">
                      <td>
                        <div className="text-left">
                          <span className="font-weight-bold">Total</span>
                        </div>
                      </td>
                      <td>
                        <div className="text-right">
                          <span className="font-weight-bold amount ">
                            ₹
                            {(+orderDetails?.product?.pprice || 0) *
                              (+orderDetails?.product?.qty || 0)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            {/*  */}
            {/* <div className="justify-content mt-4 for-mobile-glaxy ">
              <Link
                to="/generate-invoice/100120"
                className="btn btn-primary for-glaxy-mobile"
                style={{ width: "49%" }}
              >
                Generate invoice
              </Link>
              <Link
                className="btn btn-secondary"
                type="button"
                to="/track-order/result?order_id=100120&from_order_details=1"
                style={{ width: "50%", color: "white" }}
              >
                Track Order
              </Link>
            </div> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default AccountOrderDetails;
