import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminDealAddProduct() {
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const flashDealId = location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1);
  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllCategories: [],
    allCategories: [],
    selected: {
      category_name: "",
      category_icon: "",
      sequence: "",
    },
    options: [
      { name: 1, value: 1 },
      { name: 2, value: 2 },
      { name: 3, value: 3 },
      { name: 4, value: 4 },
      { name: 5, value: 5 },
      { name: 6, value: 6 },
      { name: 7, value: 7 },
      { name: 8, value: 8 },
      { name: 9, value: 9 },
      { name: 10, value: 10 },
    ],
  };
  const [mainState, setMainState] = useState(initialState);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("")
  const handleAddSelectedProduct = (e, itemId, index) => {
    if (!selectedProduct) {
      return
    } else {
      handleUpdateFlashDealAPI([...((mainState?.products || [])?.filter(item => item !== selectedProduct)), selectedProduct])
    }
  }
  const handleDeleteSelectedProduct = (e, itemId, index) => {
    console.log("hello")
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete : ${mainState?.stockandprices?.[index]?.products?.[0]?.pname}`)) {
      const newObj = {
        ...mainState,
        stockandprices: [
          ...mainState?.stockandprices?.slice(0, index),
          ...mainState?.stockandprices?.slice(index + 1),
        ],
        products: [
          ...mainState?.products?.slice(0, index),
          ...mainState?.products?.slice(index + 1),
        ],
      }
      console.log("ok", newObj?.products)
      handleUpdateFlashDealAPI(newObj?.products)
    } else {
      console.log("cancel")
    }
  }

  const handleUpdateFlashDealAPI = (products) => {

    // if (!products?.length) {
    //   alert("products can't be empty");
    //   return;
    // }
    console.log(mainState.selected);

    const formData = new FormData();
    formData.append("products", JSON.stringify(products));

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal",
      params: {
        _id: flashDealId
      },
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        apiGetFlashDealAPI()
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const apiGetFlashDealAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal",
      params: {
        _id: flashDealId
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
          // selected: {
          //   ...prev?.selected,
          //   // start_date: getYYYYMMDD(response?.data?.data?.[0]?.start_date),
          //   // end_date: getYYYYMMDD(response?.data?.data?.[0]?.end_date),
          // }
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const getPurchaseProductList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/getstockandpricesproductlist",
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
        setMainState(prev => ({
          ...prev,
          options: {
            ...prev?.options,
            purchaseProductList: response?.data?.data
          }
        }))
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  }


  useEffect(() => {
    apiGetFlashDealAPI();
    getPurchaseProductList();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row mb-3">
          <h2 class="h1 mb-0 text-capitalize">
            <img src="https://6valley.6amtech.com/public/assets/back-end/img/inhouse-product-list.png" class="mb-1 mr-1" alt="" />
            Add new product
          </h2>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 class="mb-0 text-capitalize">flash deal 2</h3>
              </div>
              <div className="card-body" style={{ textAlign: "left" }}>
                {/* <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a
                      className="nav-link lang_link active"
                      href="#"
                      id="en-link"
                    >
                      english(EN)
                    </a>
                  </li>
                </ul> */}
                <div className="row">
                  <div className="col-12 col-md-12">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Add New Product
                      </label>
                      <select
                        type="text"
                        name="category_name"
                        className="form-control"
                        onChange={
                          e => {
                            setSelectedProduct(e?.target?.value)
                          }
                        }
                      // value={mainState.selected.category_name}
                      >
                        <option value="" selected>Select</option>
                        {!!mainState?.options?.purchaseProductList?.length &&
                          mainState?.options?.purchaseProductList?.map((item, index) =>
                            <option value={item?._id}
                              selected={item?._id === selectedProduct}
                            >{item?.Product?.[0]?.pname}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  onClick={handleAddSelectedProduct}
                  className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }} id="cate-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-sm-6 col-md-6">
                    <h5>
                      Product table{" "}
                      <span style={{ color: "red" }}>
                        ({mainState?.stockandprices?.length || "0"})
                      </span>
                    </h5>
                  </div>
                  {/* <div
                    className="col-12 col-sm-6 col-md-4"
                    style={{ width: "30vw" }}
                  >
                    <form>
                      <div className="input-group input-group-merge input-group-flush">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="tio-search" />
                          </div>
                        </div>
                        <input
                          type="search"
                          name="search"
                          className="form-control"
                          placeholder="Search here"
                          onChange={handleInputChange}
                          value={mainState?.selected?.search}
                        />
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="btn btn-primary"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div> */}
                </div>
              </div>
              <div className="card-body p-0">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <table
                    style={{ textAlign: "left" }}
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "100px" }}>SL</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th className="text-center" style={{ width: "15%" }}>
                          Action
                        </th>
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
                      {!!mainState?.stockandprices?.length &&
                        mainState.stockandprices.map((item, index) => (
                          <tr>
                            <td className="text-center">
                              {/* {item?._id || "..."} */}
                              {index + 1}
                            </td>
                            <td>{item?.products?.[0]?.pname || "..."}</td>
                            <td>{item?.display_price || "0"}</td>
                            {/* <td>{item?.slug || "..."}</td> */}
                            {/* <td>
                              <img
                                width={64}
                                src={item?.category_icon || dummyCategoryLogo}
                                onError={({ currentTarget }) => {
                                  currentTarget.src = dummyCategoryLogo;
                                }}
                              />
                            </td> */}
                            {/* <td>{item?.sequence || "..."}</td> */}
                            {/* <td> */}
                            {/* <div
                                style={{
                                  padding: "10px",
                                  border: "1px solid",
                                  cursor: "pointer",
                                }}
                                onclick="location.href='/admin/category/status/116/1'"
                              >
                                <span
                                  className="legend-indicator bg-danger"
                                  style={{
                                    marginLeft: 0,
                                    marginRight: ".4375rem",
                                  }}
                                />
                                Disabled
                              </div> */}
                            {/* <div
                            style={{
                              padding: "10px",
                              border: "1px solid",
                              cursor: "pointer",
                            }}
                            onclick="location.href='/admin/category/status/114/0'"
                          >
                            <span
                              className="legend-indicator bg-success"
                              style={{
                                marginLeft: 0,
                                marginRight: ".4375rem",
                              }}
                            />
                            Active
                          </div> */}
                            {/* </td> */}
                            <td>
                              <center>
                                {/* <Link
                                className="btn btn-primary btn-sm edit"
                                style={{ cursor: "pointer" }}
                                to={"/admin/category/edit/" + item._id}
                                state={item}
                              >
                                <i className="tio-edit" />
                                Edit
                              </Link> */}
                                <Link
                                  to=""
                                  className="btn btn-danger btn-sm delete"
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    handleDeleteSelectedProduct(e, item?._id, index)
                                  }}
                                >
                                  <i className="tio-add-to-trash" />
                                  {/* Delete */}
                                </Link>
                              </center>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.stockandprices?.length && (
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
      </div >
    </main >
  );
}

export default AdminDealAddProduct;
