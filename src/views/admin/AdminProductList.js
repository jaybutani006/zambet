import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { Context } from "context/newContext";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminProductList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);
  const [productList, setProductList] = useState([]);
  const [resProductList, setResProductList] = useState([]);
  const [search, setSearch] = useState("");

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "status") {
      setProductList((prev) => [
        ...productList.slice(0, index),
        { ...productList[index], product_status: e.target.checked },
        ...productList.slice(index + 1),
      ]);

      handleToggleProductActiveStatus(
        e.target.checked,
        productList[index]._id,
        index
      );

      // if (name === "pphoto") {
      //   setProductDetails((prev) => ({ ...prev, [name]: e.target.files[0] }));
      // } else {
      //   setProductDetails((prev) => ({ ...prev, [name]: e.target.value }));
      // }
    } else if (name === "search") {
      setSearch(value);
      setProductList(searchFor(value, resProductList));
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
        getPurchaseProductList()
        // alert("Success");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
        // console.log(error);
        // alert("Something went wrong");
        // setProductList((prev) => [
        //   ...productList.slice(0, index),
        //   { ...productList[index], product_status: !isChecked },
        //   ...productList.slice(index + 1),
        // ]);
      });
  };

  const handleDeleteItem = (itemId, index) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${productList?.[index]?.pname || ""}`
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
          getPurchaseProductList();
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    }
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Products" },
      headers: {
        Authorization: state.adminToken,
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

  const getPurchaseProductList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/getpurchaseproduct",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/admin/dashboard", { replace: true });
        setProductList(
          response.data.data.map((item) => ({
            ...item,
          }))
        );
        setResProductList(
          response.data.data.map((item) => ({
            ...item,
          }))
        );
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  }

  useEffect(() => {
    getPurchaseProductList()
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Products
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 mb-1 col-md-4">
                    <h5>Product Table ({productList.length})</h5>
                  </div>
                  <div className="col-12 mb-1 col-md-5">
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
                          placeholder="Search by Product Name"
                          aria-label="Search orders"
                          onChange={handleInputChange}
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
                  <div className="col-12 col-md-3">
                    <Link
                      to="/admin/product/add-new"
                      className="btn btn-primary float-right"
                    >
                      <i className="tio-add-circle" />
                      <span className="text">Add new product</span>
                    </Link>
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
                    // style={{
                    //   textAlign: "center",
                    //   tableLayout: "fixed",
                    //   display: "block",
                    //   height: "50vh",
                    //   overflowY: "scroll",
                    // }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "10%" }}>SL#</th>
                        <th style={{ width: "10%" }}>Product Photo</th>
                        <th style={{ width: "50%" }}>Product Name</th>
                        <th style={{ width: "10%" }}>Active Status</th>
                        <th style={{ width: "20%" }}>Action</th>
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
                      {!!productList.length &&
                        productList.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td
                              style={{
                                width: "2vw",
                                textAlign: "center",
                              }}
                            >
                              {/* <label
                                className={`badge badge-${
                                  item.verifyStatus === "Approved"
                                    ? "success"
                                    : item.verifyStatus === "Denied"
                                    ? "danger"
                                    : "warning"
                                }`}
                              >
                                {item.verifyStatus}
                              </label> */}
                              <img
                                style={{
                                  width: "2vw",
                                }}
                                src={item?.pphoto?.[0] || productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                              ></img>
                            </td>
                            <td
                              style={{ textAlign: "left", whiteSpace: "unset" }}
                            >
                              {/* <Link
                                to={`/admin/product/view/${item?.pid}`}
                                state={item}
                              > */}
                              {item.pname}
                              {/* </Link> */}
                            </td>
                            <td>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  className="status"
                                  id={13}
                                  name="status"
                                  // defaultChecked
                                  checked={
                                    !!item?.product_status ? true : false
                                  }
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                <span className="slider round" />
                              </label>
                            </td>
                            <td>
                              {item?.manage_by == "admin" ? (
                                <Link
                                  className="btn btn-primary btn-sm m-1"
                                  to={`/admin/product/edit/${index + 1}`}
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

                              {item?.manage_by == "admin" ? (
                                <Link
                                  className="btn btn-danger btn-sm"
                                  to=""
                                  onClick={() => { handleDeleteItem(item?._id, index) }}
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
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!productList?.length && (
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

export default AdminProductList;
