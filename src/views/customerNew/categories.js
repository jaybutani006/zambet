// import "App.css";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { Context } from "context/newContext";
import { defaultAPIErrorHandler } from "api/api";

function Categories() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);

  const [mainState, setMainState] = useState({
    resAllCategories: [],
    resProducts: [],
    products: [],
    selectedIndex: 0,
  });

  const apiGetAllCategories = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {},
    })
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const getAllCat_SubCat_SubSubCat = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // Authorization: ,
      },
      // data: formData,
    })
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllProducts = () => {
    let data = "";

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/getProducts",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resProducts: response.data.data.products,
          products: response.data.data.products,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    // apiGetAllCategories();
    getAllCat_SubCat_SubSubCat();
    apiGetAllProducts();
  }, []);

  return (
    <>
      <div className="container p-3 rtl" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-9">
            <h4>Category</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            {!!mainState?.resAllCategories?.length &&
              mainState?.resAllCategories?.map((item, index) => (
                <div
                  className="card-header mb-2 p-2 side-category-bar"
                  onClick={() => {
                    setMainState((prev) => ({
                      ...prev,
                      products: prev.resProducts.filter(
                        (item2) => item2?.category_id === item?._id
                      ),
                    }));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item?.category_icon || dummyCategoryLogo}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = dummyCategoryLogo;
                    }}
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "5px",
                    }}
                  />
                  {`${item.category_name}`}
                </div>
              ))}
            {!mainState?.resAllCategories?.length && (
              <center>
                <ClipLoader
                  // color={"#ffffff"}
                  // loading={!!camps}
                  loading
                  // cssOverride={override}
                  // size={150}
                />
              </center>
            )}
          </div>
          <div className="col-lg-9 col-md-8">
            <hr />
            {/* <div className="row" id="ajax-categories">
              {!!mainState.resAllCategories?.[mainState?.selectedIndex]
                ?.Subcategory?.length &&
                mainState.resAllCategories?.[
                  mainState?.selectedIndex
                ]?.Subcategory?.map((item) => (
                  <div className="col-md-3 mt-4">
                    <label
                      className="text-center"
                      onClick={() =>
                        navigate(`/products?categoryId=${item?.category_id}`)
                      }
                      style={{
                        padding: "10px",
                        border: "1px solid #0000001f",
                        width: "100%",
                        cursor: "pointer",
                        background: "white",
                      }}
                    >
                      {`${item.subcategory_name}`}
                    </label>
                    <ul className="list-group">
                      {!!item?.Subsubcategory?.length &&
                        item?.Subsubcategory?.map((item2) => (
                          <li
                            className="list-group-item"
                            style={{ cursor: "pointer" }}
                          >
                            {`${item2.subsubcategory_name}`}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}

              {!mainState.resAllCategories?.[mainState?.selectedIndex]
                ?.Subcategory?.length && (
                <center>
                  <ClipLoader
                    // color={"#ffffff"}
                    // loading={!!camps}
                    loading
                    // cssOverride={override}
                    // size={150}
                  />
                </center>
              )}
            </div> */}
            <div className="row mt-3" id="ajax-products">
              {!!mainState?.products?.length &&
                mainState?.products?.map((item) => (
                  <div
                    id={item._id}
                    className="col-lg-3 col-md-4 col-sm-4 col-6  mb-2"
                  >
                    <div
                      className="product-card card "
                      style={{
                        marginBottom: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="card-header inline_product clickable"
                        style={{
                          cursor: "pointer",
                          maxHeight: "193px",
                          minHeight: "193px",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{
                            top: "0px",
                            position: "absolute",
                            left: "0px",
                            background: "#3b71de",
                          }}
                        >
                          <span
                            className="for-discoutn-value p-1 pl-2 pr-2"
                            style={{
                              borderRadius: "5px 0px",
                              color: "white",
                            }}
                          >
                            {item?.product_stock < 1
                              ? "Out Of Stock"
                              : `${(
                                  (((+item?.display_price || 0) -
                                    (+item?.selling_price || 0)) *
                                    100) /
                                  (+item?.selling_price || 1)
                                ).toFixed(0)}% Off`}
                          </span>
                        </div>

                        {/* <div className="d-flex justify-content-end for-dicount-div-null">
                          <span className="for-discoutn-value-null" />
                        </div> */}
                        <div
                          className="d-flex d-block center-div element-center"
                          style={{ cursor: "pointer" }}
                        >
                          <Link to={"/product/" + item?._id}>
                            <img
                              src={item?.pphoto || ""}
                              // onError={({ currentTarget }) => {
                              //   currentTarget.onerror = null; // prevents looping
                              //   currentTarget.src = ""
                              // }}
                              // onError={
                              // }
                              style={{
                                width: "100%",
                                maxHeight: "215px",
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                      <div
                        className="card-body inline_product text-center p-1 clickable"
                        style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                      >
                        <div
                          className="rating-show justify-content-between text-center"
                          style={{
                            textAlign: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="d-inline-block font-size-sm text-body">
                            <Rating
                              readonly
                              fractions={2}
                              initialRating={item?.Review || 0}
                              style={{ color: "#fea569" }}
                              emptySymbol="fa fa-star-o mr-1"
                              fullSymbol="fa fa-star mr-1"
                              // emptySymbol="fa fa-star-o fa-2x"
                              // fullSymbol="fa fa-star fa-2x"
                            />
                            {/* <i className="sr-star czi-star mr-1" />
                            <i className="sr-star czi-star mr-1" />
                            <i className="sr-star czi-star-filled active mr-1" />
                            <i className="sr-star czi-star mr-1" />
                            <i className="sr-star czi-star mr-1" /> */}
                            <label className="badge-style">
                              ( {item?.product_review_count || 0} )
                            </label>
                          </span>
                        </div>
                        <div
                          style={{ position: "relative" }}
                          className="product-title1"
                        >
                          <Link to={"/product/" + item?._id}>
                            {(item?.pname && item?.pname.slice(0, 15)) || ""}
                          </Link>
                        </div>
                        <div className="justify-content-between text-center">
                          <div className="product-price text-center">
                            <strike
                              style={{
                                fontSize: "12px",
                                color: "#E96A6A",
                              }}
                            >
                              ₹{item?.display_price || ""}
                            </strike>
                            <br />
                            <span className="text-accent">
                              ₹{item?.selling_price || ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {!mainState.resProducts.length && (
                <div className="col-md-12">
                  <center>
                    <ClipLoader
                      // color={"#ffffff"}
                      // loading={!!camps}
                      loading
                      // cssOverride={override}
                      // size={150}
                    />
                  </center>
                </div>
              )}

              {!mainState.products.length && (
                <div className="col-md-12">
                  <center>No Products Found</center>
                </div>
              )}

              <div className="col-12">
                <nav
                  className="d-flex justify-content-between pt-2"
                  aria-label="Page navigation"
                  id="paginator-ajax"
                ></nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
