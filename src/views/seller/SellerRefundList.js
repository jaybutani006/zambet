import React, { useEffect, useState } from "react";

const SellerRefundList = () => {
  const [refundList, setRefundList] = useState([]);
  const [customer, setCustomer] = useState([]);

  const Refund = async () => {
    const token = localStorage.getItem("sellerToken");
    const res = await fetch(
      process.env.REACT_APP_BASEURL +
        "/api/productReturn/refundproductstatus?=&refund_status",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setRefundList(data.data);
  };

  useEffect(() => {
    Refund();
  }, []);

  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <h1>Refund Request List</h1>
        <div className="content container-fluid">
          <div className="card">
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
                    <th>ORDER ID</th>
                    <th>ORDER NAME</th>
                    <th>PAIDAMOUNT</th>
                    <th>CUSTOMER NAME</th>
                    <th>PHONE NUMBER</th>
                    <th>ADDRESS</th>
                    <th>PAYMENT STATUS</th>
                    <th>PICKUP STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {refundList.map((ele, i) => {
                    return (
                      <>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{ele.oid}</td>
                          <td>{ele.pname}</td>
                          <td>{ele.Order_master[0].paidamount}</td>
                          <td>{ele.Order_master[0].customer_name}</td>
                          <td>{ele.Order_master[0].customer_mobile}</td>
                          <td>{ele.Order_master[0].order_address}</td>
                          <td>{ele.Order_master[0].payment_status}</td>
                          <td>{ele.pickup_status}</td>
                        </tr>
                      </>
                    );
                  })}
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
            {/* {!refundList?.length && (
              <div className="text-center p-4">
                <img
                  className="mb-3"
                  src="/assets/back-end/svg/illustrations/sorry.svg"
                  alt="Image Description"
                  style={{ width: "7rem" }}
                />
                <p className="mb-0">No data to show</p>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default SellerRefundList;
