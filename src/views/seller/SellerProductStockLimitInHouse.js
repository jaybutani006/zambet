import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import { truncate } from "utils/truncateText";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

function SellerProductStockLimitInHouse() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);

  const [productDetails, setProductDetails] = useState({
    resAllProducts: [],
    allProducts: [],
    category_id: "",
    subcategory_id: "",
    subsubcategory_id: "",
    product_id: "",
    current_stock: "",
    display_price: "",
    selling_price: "",
    search: "",
  });

  const [mainState, setMainState] = useState({
    resAllCategories: [],
    allCategories: [],
  });

  const getAllCat_SubCat_SubSubCat = () => {
    const config3 = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      // data: formData,
    };
    axios(config3)
      .then((response) => {
        console.log(
          "🌊subsubcategory api called"
          // , JSON.stringify(response.data)
        );
        // initialState["allCategories"] = response.data.data;
        // localStorage.setItem(
        //   "allCategories",
        //   JSON.stringify(response.data.data)
        // );
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
          allCategories: response.data.data,
        }));

        return response.data.data;

        // navigate("/seller/dashboard", { replace: true });
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
        return [];
      });
  };

  const resetForm = () => {
    setProductDetails((prev) => ({
      ...prev,
      category_id: "",
      subcategory_id: "",
      subsubcategory_id: "",
      product_id: "",
      current_stock: "",
      display_price: "",
      selling_price: "",
      search: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "p_quantity" ||
      name === "display_price" ||
      name === "selling_price"
    ) {
      setProductDetails((prev) => ({
        ...prev,
        [name]: e.target.value.replace(/^0+/, ""),
      }));
    } else if (name === "category_id") {
      setProductDetails((prev) => ({
        ...prev,

        subcategory_id: "",
        subsubcategory_id: "",
        product_id: "",

        [name]: e.target.value,
      }));
    } else if (name === "subcategory_id") {
      setProductDetails((prev) => ({
        ...prev,
        subsubcategory_id: "",
        product_id: "",
        [name]: e.target.value,
      }));
    } else if (name === "search") {
      setProductDetails((prev) => ({
        ...prev,
        [name]: e.target.value,
        allProducts: searchFor(value, prev.resAllProducts),
      }));
    } else {
      setProductDetails((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const apiGetSelectionProducts = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/getpurchaseproduct",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        setProductDetails((prev) => ({
          ...prev,
          resSelectionProducts: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllVendorProducts = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        setProductDetails((prev) => ({
          ...prev,
          resAllProducts: response.data.data,
          allProducts: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAddStock = () => {
    if (+productDetails.selling_price > +productDetails.display_price) {
      return alert("Selling Price can not be greater than MRP");
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/stockandprice",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        product_id: productDetails.product_id,
        product_stock: productDetails.current_stock,
        display_price: productDetails.display_price,
        selling_price: productDetails.selling_price,
      }),
    })
      .then((response) => {
        console.log(response.data);
        resetForm();
        apiGetAllVendorProducts();
        alert("Success : New Product Stock Added");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
        // alert(error.response.data.message);
        // alert("Something went wrong");
      });
  };

  const handleEditStock = (item) => {
    setProductDetails((prev) => ({
      ...prev,
      product_id: item._id,
      current_stock: item.product_stock,
      display_price: item.display_price,
      selling_price: item.selling_price,
    }));
  };

  const handleUpdateStock = () => {
    if (+productDetails.selling_price > +productDetails.display_price) {
      return alert("Selling Price can not be greater than MRP");
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/stockandprice",
      params: {
        id: productDetails.product_id,
      },
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        product_stock: +productDetails.current_stock,
        display_price: +productDetails.display_price,
        selling_price: +productDetails.selling_price,
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Success : Stock Updated");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteStock = () => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "/api/stockandprice",
      params: {
        id: productDetails.product_id,
      },
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        alert("Product Stock Deleted");
        apiGetAllVendorProducts();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleFilter = (field) => {
    console.log(2, field);
    if (field === "default") {
      setProductDetails((prev) => ({
        ...prev,
        allProducts: prev?.resAllProducts,
      }));
    } else {
      setProductDetails((prev) => ({
        ...prev,
        allProducts: prev?.resAllProducts?.filter(
          (item) => !!item?.isStockExpired
        ),
      }));
    }
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Seller_Stocks" },
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
    getAllCat_SubCat_SubSubCat();
    apiGetAllVendorProducts();
    apiGetSelectionProducts();
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
            <div className="col-12 mb-2 mb-sm-0">
              <h1 className="page-header-title text-capitalize">
                <i className="tio-files" /> Manage Stock
                <span className="badge badge-soft-dark ml-2">
                  {productDetails?.allProducts?.length || 0}
                </span>
              </h1>
              {/* <span>
                The products are shown in this list which quantity is below 10
              </span> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-md-12 col-lg-3">
                    <h5>
                      Product table{" "}
                      <span>( {productDetails?.allProducts?.length || 0})</span>
                    </h5>
                  </div>
                  <div className="col-12 mt-1 col-md-6 col-lg-4">
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
                          value={productDetails?.search}
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
                  <div className="col-12 mt-1 col-md-6 col-lg-3">
                    <select
                      name="filter"
                      className="form-control"
                      onChange={(e) => handleFilter(e.target.value)}
                    >
                      <option value="default">Default Filter</option>
                      <option value="expiry">Filter By Expiry</option>
                      {/* <option value="quantity_asc">
                        Quantity sort by (low to high)
                      </option>
                      <option value="quantity_desc">
                        Quantity sort by (high to low)
                      </option> */}
                      {/* <option value="order_asc">
                        Order sort by (low to high)
                      </option>
                      <option value="order_desc">
                        Order sort by (high to low)
                      </option> */}
                    </select>
                  </div>
                  <div className="col-12 mt-1 col-md-6 col-lg-2">
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#add-new-product"
                    >
                      Add New
                    </button>
                    <div
                      className="modal fade"
                      id="add-new-product"
                      tabIndex={-1}
                      style={{ display: "none" }}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <form className="row">
                              <div
                                className="card mt-2 rest-part"
                                style={{ width: "100%" }}
                              >
                                <div className="card-header">
                                  <h4>Add Product</h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <div className="row">
                                      {/*                         
                        <div
                          className="col-12 pt-4 sku_combination"
                          id="sku_combination"
                        >
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Variant
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Variant Price
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    SKU
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Quantity
                                  </label>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-s-a
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-s-a"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-s-a"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-s-a"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-s-a"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-s-a"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-s-b
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-s-b"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-s-b"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-s-b"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-s-b"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-s-b"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-l-a
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-l-a"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-l-a"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-l-a"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-l-a"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-l-a"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-l-b
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-l-b"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-l-b"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-l-b"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-l-b"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-l-b"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
 */}
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          Select Category
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <select
                                          className="js-example-basic-multiple form-control form-control-input"
                                          // name="category_id"
                                          name="category_id"
                                          // required
                                          onChange={handleInputChange}
                                          value={productDetails.category_id}
                                        >
                                          <option value="" selected>
                                            ---Select---
                                          </option>
                                          {!!mainState.allCategories &&
                                            !!mainState.allCategories.length &&
                                            mainState.allCategories?.map(
                                              (item) => (
                                                <option
                                                  key={item._id}
                                                  value={item._id}
                                                >
                                                  {item.category_name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          Select SubCategory
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <select
                                          className="js-example-basic-multiple form-control form-control-input"
                                          // name="sub_category_id"
                                          name="subcategory_id"
                                          // id="sub-category-select"
                                          onChange={handleInputChange}
                                          value={productDetails.subcategory_id}
                                        >
                                          <option value="" selected>
                                            ---Select---
                                          </option>
                                          {!!productDetails.category_id &&
                                            !!mainState.allCategories.length &&
                                            mainState.allCategories
                                              ?.filter(
                                                (item) =>
                                                  item._id ===
                                                  productDetails.category_id
                                              )
                                              ?.map((item) =>
                                                item.Subcategory?.map(
                                                  (item) => (
                                                    <option
                                                      key={item._id}
                                                      value={item._id}
                                                    >
                                                      {item.subcategory_name}
                                                    </option>
                                                  )
                                                )
                                              )}
                                        </select>
                                      </div>
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          Select SubSubCategory
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <select
                                          className="js-example-basic-multiple form-control form-control-input"
                                          // name="sub_sub_category_id"
                                          name="subsubcategory_id"
                                          id="sub-sub-category-select"
                                          onChange={handleInputChange}
                                          value={
                                            productDetails.subsubcategory_id
                                          }
                                        >
                                          <option value="" selected>
                                            ---Select---
                                          </option>
                                          {!!productDetails.category_id &&
                                            !!productDetails.subcategory_id &&
                                            !!mainState.allCategories.length &&
                                            mainState.allCategories
                                              ?.filter(
                                                (item) =>
                                                  item._id ===
                                                  productDetails.category_id
                                              )
                                              ?.map((item) =>
                                                item.Subcategory?.filter(
                                                  (item1) =>
                                                    item1._id ===
                                                    productDetails.subcategory_id
                                                )?.map((item) =>
                                                  item.Subsubcategory?.map(
                                                    (item) => (
                                                      <option
                                                        key={item._id}
                                                        value={item._id}
                                                      >
                                                        {
                                                          item.subsubcategory_name
                                                        }
                                                      </option>
                                                    )
                                                  )
                                                )
                                              )}
                                        </select>
                                      </div>
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          Select Product
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <select
                                          name="product_id"
                                          className="form-control form-control-input"
                                          onChange={handleInputChange}
                                          value={productDetails.product_id}
                                        >
                                          <option value="">---Select---</option>
                                          {!!productDetails
                                            ?.resSelectionProducts?.length
                                            ? productDetails.resSelectionProducts
                                                ?.filter((item) =>
                                                  !!productDetails.category_id
                                                    ? item.category_id ===
                                                      productDetails.category_id
                                                    : true
                                                )
                                                ?.filter((item) =>
                                                  !!productDetails.subcategory_id
                                                    ? item.subcategory_id ===
                                                      productDetails.subcategory_id
                                                    : true
                                                )
                                                ?.filter((item) =>
                                                  !!productDetails.subsubcategory_id
                                                    ? item.subsubcategory_id ===
                                                      productDetails.subsubcategory_id
                                                    : true
                                                )
                                                .map((item) => (
                                                  <option
                                                    key={item._id}
                                                    value={item._id}
                                                  >
                                                    {`${
                                                      item.manage_by ===
                                                      "vendor"
                                                        ? "*"
                                                        : ""
                                                    }${truncate(
                                                      item.pname,
                                                      20
                                                    )}`}
                                                  </option>
                                                ))
                                            : null}
                                        </select>
                                      </div>
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          Total Stock
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <input
                                          type="number"
                                          min={0}
                                          defaultValue={4}
                                          step={1}
                                          placeholder="Quantity"
                                          name="current_stock"
                                          className="form-control form-control-input"
                                          onChange={handleInputChange}
                                          value={productDetails.current_stock}
                                        />
                                      </div>
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          MRP
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <input
                                          type="number"
                                          min={0}
                                          defaultValue={4}
                                          step={1}
                                          placeholder="Quantity"
                                          name="display_price"
                                          className="form-control form-control-input"
                                          onChange={handleInputChange}
                                          value={productDetails.display_price}
                                        />
                                      </div>
                                      <div className="col-6 p-2">
                                        <label className="control-label">
                                          Selling Price
                                        </label>
                                      </div>
                                      <div className="col-6 p-2">
                                        <input
                                          type="number"
                                          min={0}
                                          defaultValue={4}
                                          step={1}
                                          placeholder="Quantity"
                                          name="selling_price"
                                          className="form-control form-control-input"
                                          onChange={handleInputChange}
                                          value={productDetails.selling_price}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                </div>
                              </div>
                              <div className="form-group col-sm-12 card card-footer">
                                <button
                                  className="ml-1 btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#add-new-product"
                                  // type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddStock();
                                  }}
                                >
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  className="ml-1 btn btn-danger"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  Close
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
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
                        <th>Product Name</th>
                        <th>MRP</th>
                        <th>Selling price</th>
                        {/* <th>Quantity</th> */}
                        {/* <th>Verify status</th> */}
                        {/* <th>Active Status</th> */}
                        <th
                          style={{ width: "5px" }}
                          // className="text-center"
                        >
                          Stock
                        </th>
                        <th>Expiry Status</th>
                        {/* <th>Orders</th> */}
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
                      {!!productDetails?.allProducts?.length &&
                        productDetails.allProducts.map((item, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <Link to={"/seller/product/view/" + item._id}>
                                {item.pname.slice(0, 20)}
                              </Link>
                            </td>
                            <td>₹{item.display_price || 0}</td>
                            <td>₹{item.selling_price || 0}</td>
                            {/* <td>20</td>
                              <td>
                                <label className="badge badge-success">
                                  Approved
                                </label>
                              </td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status"
                                    id={9}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
                              </td> */}
                            <td>
                              <button
                                className="btn btn-sm"
                                id={9}
                                onclick="update_quantity(9)"
                                type="button"
                                data-toggle="modal"
                                data-target="#update-quantity"
                                title="Update quantity"
                                onClick={() => handleEditStock(item)}
                              >
                                <i className="tio-add-circle" />
                              </button>
                              {item.product_stock}
                            </td>
                            <td className="text-capitalize">
                              <span
                                // className="badge badge-soft-danger"
                                className={`badge badge-soft-${
                                  // item.pickup_status !== "delivered"
                                  !!item?.isStockExpired ? "success" : "danger"
                                }`}
                              >
                                <span
                                  // className="legend-indicator bg-danger"
                                  className={`legend-indicator bg-${
                                    // item.pickup_status !== "delivered"
                                    !!item?.isStockExpired
                                      ? "success"
                                      : "danger"
                                  }`}
                                  style={{
                                    marginLeft: 0,
                                    marginRight: ".4375rem",
                                  }}
                                />
                                {!!item?.isStockExpired
                                  ? "Expired"
                                  : "Not Expired"}
                              </span>
                            </td>
                            {/* <td>2***</td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!productDetails?.allProducts?.length && (
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
      <div
        className="modal fade"
        id="update-quantity"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form className="row">
                <div className="card mt-2 rest-part" style={{ width: "100%" }}>
                  <div className="card-header">
                    <h4>Product price &amp; stock</h4>
                    <input
                      name="product_id"
                      defaultValue={18}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <div className="row">
                        {/*                         
                        <div
                          className="col-12 pt-4 sku_combination"
                          id="sku_combination"
                        >
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Variant
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Variant Price
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    SKU
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label htmlFor className="control-label">
                                    Quantity
                                  </label>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-s-a
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-s-a"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-s-a"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-s-a"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-s-a"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-s-a"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-s-b
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-s-b"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-s-b"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-s-b"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-s-b"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-s-b"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-l-a
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-l-a"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-l-a"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-l-a"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-l-a"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-l-a"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor className="control-label">
                                    AliceBlue-l-b
                                  </label>
                                  <input
                                    defaultValue="AliceBlue-l-b"
                                    name="type[]"
                                    style={{ display: "none" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price_AliceBlue-l-b"
                                    defaultValue={5000}
                                    min={0}
                                    step="0.01"
                                    className="form-control"
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="sku_AliceBlue-l-b"
                                    defaultValue="Tsol-ebtb-ctb(-AliceBlue-l-b"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    onkeyup="update_qty()"
                                    name="qty_AliceBlue-l-b"
                                    defaultValue={1}
                                    min={1}
                                    max={100000}
                                    step={1}
                                    className="form-control"
                                    required
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
 */}
                        <div className="col-6 p-2">
                          <label className="control-label">Total Stock</label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="number"
                            min={0}
                            defaultValue={4}
                            step={1}
                            placeholder="Quantity"
                            name="current_stock"
                            className="form-control"
                            onChange={handleInputChange}
                            value={productDetails.current_stock}
                          />
                        </div>
                        <div className="col-6 p-2">
                          <label className="control-label">MRP</label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="number"
                            min={0}
                            defaultValue={4}
                            step={1}
                            placeholder="Quantity"
                            name="display_price"
                            className="form-control"
                            onChange={handleInputChange}
                            value={productDetails.display_price}
                          />
                        </div>
                        <div className="col-6 p-2">
                          <label className="control-label">Selling Price</label>
                        </div>
                        <div className="col-6 p-2">
                          <input
                            type="number"
                            min={0}
                            defaultValue={4}
                            step={1}
                            placeholder="Quantity"
                            name="selling_price"
                            className="form-control"
                            onChange={handleInputChange}
                            value={productDetails.selling_price}
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
                <div className="form-group col-sm-12 card card-footer">
                  <div className="row">
                    <div
                      className="col-6"
                      style={{ justifyContent: "space-around" }}
                    >
                      <button
                        className="ml-1 btn btn-primary"
                        //  type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUpdateStock();
                        }}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="ml-1 btn btn-danger"
                        // data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => handleDeleteStock()}
                      >
                        Delete
                      </button>
                    </div>
                    <div
                      className="col-6"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        type="button"
                        className="ml-1 btn btn-danger"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerProductStockLimitInHouse;
