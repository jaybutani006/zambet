import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

function SellerProductReviews() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);

  const [reviewsList, setReviewsList] = useState([]);
  const [resReviewsList, setResReviewsList] = useState([]);
  const [search, setSearch] = useState("");

  const apiGetAllReviews = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/Reviews/display",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then(function (response) {
        console.log(response.data);

        setReviewsList(response.data.data);
        setResReviewsList(response.data.data);
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Seller_Reviews" },
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
    apiGetAllReviews();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">Review List</h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-header">
                <div className="flex-between row justify-content-between flex-grow-1 mx-1">
                  <div className="col-12 col-sm-6">
                    <h5>
                      Review Table{" "}
                      <span style={{ color: "red" }}>
                        ({reviewsList.length})
                      </span>
                    </h5>
                  </div>
                  <div className="col-12 col-sm-5">
                    <form
                    >
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
                          placeholder="Search by Product Name"
                          aria-label="Search orders"
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setReviewsList(
                              searchFor(e.target.value, resReviewsList)
                            );
                          }}
                          value={search}
                        />
                        <button className="btn btn-primary">Search</button>
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
                  className="table-responsive datatable-custom"
                  style={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <table
                    style={{ textAlign: "left" }}
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "10%" }}>SL#</th>
                        <th style={{ width: "80%" }}>Product Name</th>
                        {/* <th>Review</th> */}
                        <th style={{ width: "10%" }}>Avg. Rating</th>
                        {/* <th>Name</th> */}
                        {/* <th>City</th> */}
                        {/* <th>DateTime</th> */}
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
                      {!!reviewsList.length
                        ? reviewsList.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <span className="d-block font-size-sm text-body">
                                  <Link
                                    to={"/seller/product/view/" + item?._id}
                                    state={item}
                                  >
                                    {item?.Product?.pname?.slice(0, 20)}
                                  </Link>
                                </span>
                              </td>
                              {/* <td>{item?.Review?.[0]?.Review || "..."}</td> */}
                              <td>
                                <label className="badge badge-soft-info">
                                  {(!!item?.Review?.length
                                    ? +item?.Review?.reduce((acc, item) => {
                                        acc += +item.Star;
                                        return acc;
                                      }, 0)
                                    : 0) /
                                    (!!item?.Review?.length
                                      ? +item?.Review?.length
                                      : 1)}{" "}
                                  <i className="tio-star" />
                                </label>
                              </td>
                              {/* <td>{item?.name}</td> <td>{item?.city}</td> */}
                              {/* <td>
                                {ISOToIST(
                                  !!item?.Review?.length
                                    ? item?.Review?.[0]?.createdAt
                                    : 0
                                )}
                              </td> */}
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!reviewsList?.length && (
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

export default SellerProductReviews;
