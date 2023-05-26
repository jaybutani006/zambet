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
                                  setExpiryList(
                                    searchFor(e.target.value, expiryList)
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
                    <div className="col-12 col-sm-2 mt-2 mt-sm-0 p-3">
                      <button
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   handleExport();
                        // }}
                        className="btn btn-success float-right float-sm-none"
                      >
                        Export
                      </button>
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
