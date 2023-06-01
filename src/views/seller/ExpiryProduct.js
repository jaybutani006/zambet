import React, { useState, useContext, useEffect } from "react";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import { Context } from "context/newContext";
import { defaultAPIErrorHandler } from "api/api";
import { Link, useLocation } from "react-router-dom";

const ExpiryProduct = () => {
  const [loading, setLoading] = useState(false);
  const [expiryList, setExpiryList] = useState([]);
  const [search, setSearch] = useState("");

  const expiryData = async () => {
    const token = localStorage.getItem("sellerToken");

    const res = await fetch(
      "https://zambet-ecommerce.onrender.com/api/stockandprice/expiryproduct",
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
    setExpiryList(data.data);
  };

  useEffect(() => {
    expiryData();
  }, []);
  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row  justify-content-between align-items-center flex-grow-1">
                        <div className="col-12 col-sm-6 col-md-4">
                          <h5>Expiry Product</h5>
                        </div>
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
                          className="table text-center table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>SL#</th>
                              <th>PRODUCT PHOTO</th>
                              <th>PRODUCT NAME</th>
                              <th>BRAND NAME</th>
                              <th>PRODUCT ID</th>
                              <th>PRODUCT STOCK</th>
                              <th>STOCK_EXPIRY_DATE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expiryList.map((ele, i) => {
                              return (
                                <>
                                  <tr>
                                    <td>{i + 1}</td>
                                    {ele.product.map((ele) => {
                                      return (
                                        <>
                                          <td>
                                            <img src={ele.pphoto} />
                                          </td>
                                          <td>{ele.pname}</td>
                                          <td>{ele.brand_name}</td>
                                        </>
                                      );
                                    })}
                                    <td>{ele.product_id}</td>
                                    <td>{ele.product_stock}</td>
                                    <td>{ele.stock_expiry_date}</td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {!expiryList?.length && (
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
          </div>
        </div>
      </main>
    </>
  );
};

export default ExpiryProduct;
