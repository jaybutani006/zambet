import "App.css";
import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import dummyProductImage from "assets/dummyProductImage.png";
import { defaultAPIErrorHandler } from "api/api";

function Wishlists() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  //
  const [loader, setLoader] = useState(false);
  const [mainState, setMainState] = useState({
    resDisplayWishList: [],
    resDeleteWishList: [],
  });
  console.log("=======================================" + state.userToken);

  const apiGetDisplayWishList = () => {
    setLoader(true);
    let data = "";

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/wishlists",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resDisplayWishList: response.data.data,
        }));
        dispatch({
          type: "SET_USER_WISHLIST_COUNT",
          userWishlistCount: response.data.data.length || 0,
        });
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const apiHandleDeleteWishList = (pid, index) => {
    let config = {
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "/api/wishlists",
      params: { product_id: pid },
      headers: {
        Authorization: state.userToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const newWishList = mainState.resDisplayWishList.slice();
        newWishList.splice(index, 1);
        setMainState((prev) => ({
          ...prev,
          resDisplayWishList: newWishList,
        }));
        dispatch({
          type: "SET_USER_WISHLIST_COUNT",
          userWishlistCount: (+state?.userWishlistCount || 0) - 1,
        });
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
      });
  };

  const handleDeleteWishList = (e, index, pid) => {
    console.log(index);
    if (
      !window.confirm(
        `Are you sure you want to delete : ${
          mainState?.resDisplayWishList?.[index]?.Product?.pname || ""
        }`
      )
    ) {
      return;
    }

    apiHandleDeleteWishList(pid, index);
  };

  const apiHandleAddToCart = (e, pid) => {
    let data = {
      product_id: pid,
      quantity: "1",
    };

    let config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      headers: {
        Authorization: state.userToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resCarts: response.data,
        }));
        alert("Added to Cart Successfully");
        dispatch({
          type: "SET_USER_CART_COUNT",
          userCartCount: (+state.userCartCount || 0) + 1,
        });
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
      });
  };

  useEffect(() => {
    if (!state.isUserLoggedIn) {
      navigate("/customer/auth/login", { replace: true });
      return;
    }
    apiGetDisplayWishList();
  }, []);

  return (
    <>
      <div
        className="modal-quick-view modal fade "
        id="quick-view"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content" id="quick-view-modal"></div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div
            className="col-12"
            style={{
              width: "93%",
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div id="loading" style={{ display: "none" }}>
              <img width={200} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container rtl" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-9 sidebar_heading">
            <h1 className="h3  mb-0 float-left headerTitle">WISHLIST</h1>
          </div>
        </div>
      </div> */}

      <div
        className="container pb-5 mb-2 mb-md-4 mt-3 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n        font-family: 'Titillium Web', sans-serif\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    label {\n        font-size: 16px;\n    }\n\n    .divider-role {\n        border-bottom: 1px solid whitesmoke;\n    }\n\n    .sidebarL h3:hover + .divider-role {\n        border-bottom: 3px solid #f7931e    !important;\n        transition: .2s ease-in-out;\n    }\n\n    .price_sidebar {\n        padding: 20px;\n    }\n\n    @media (max-width: 600px) {\n\n        .sidebar_heading h1 {\n            text-align: center;\n            color: aliceblue;\n            padding-bottom: 17px;\n            font-size: 19px;\n        }\n\n        .sidebarR {\n            padding: 24px;\n        }\n\n        .price_sidebar {\n            padding: 20px;\n        }\n    }\n\n",
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
                    <Link className="" to="/account-oder">
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
              <div className="sidebarL">
                <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                  <Link to="/account-service">My Services</Link>
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
              <div className="pb-0">
                <div className="sidebarL">
                  <h3
                    className="widget-title btnF "
                    style={{ fontWeight: 700 }}
                  >
                    <Link className="active-menu" to="/wishlists">
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
          <section className="col-lg-9 col-md-9 mt-2" id="set-wish-list">
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n\n    body {\n        font-family: 'Titillium Web', sans-serif\n    }\n\n    .card {\n        border: none\n    }\n\n    .totals tr td {\n        font-size: 13px\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    .font-name {\n        font-weight: 600;\n        font-size: 15px;\n        color: #030303;\n    }\n\n    .sellerName {\n\n        font-weight: 600;\n        font-size: 14px;\n        color: #030303;\n    }\n\n    .wishlist_product_img img {\n        margin: 15px;\n    }\n\n    @media (max-width: 600px) {\n        .font-name {\n            font-size: 12px;\n            font-weight: 400;\n        }\n\n        .amount {\n            font-size: 12px;\n        }\n    }\n\n    @media (max-width: 600px) {\n        .wishlist_product_img {\n            width: 20%;\n        }\n\n        .forPadding {\n            padding: 6px;\n        }\n\n        .sellerName {\n\n            font-weight: 400;\n            font-size: 12px;\n            color: #030303;\n        }\n\n        .wishlist_product_desc {\n            width: 50%;\n            margin-top: 0px !important;\n        }\n\n        .wishlist_product_icon {\n            margin-left: 1px !important;\n        }\n\n        .wishlist_product_btn {\n            width: 30%;\n            margin-top: 10px !important;\n        }\n\n        .wishlist_product_img img {\n            margin: 8px;\n        }\n    }\n",
              }}
            />
            {!!mainState?.resDisplayWishList?.length &&
              mainState?.resDisplayWishList?.map((item, index) => (
                <div className="card box-shadow-sm mt-2">
                  <div className="product mb-2">
                    <div className="card">
                      <div className="row forPadding">
                        <div className="wishlist_product_img col-md-2 col-lg-2 col-sm-2">
                          <Link to={`/product/${item?.pid}`}>
                            <img
                              src={item?.Product?.pphoto || dummyProductImage}
                              onError={({ currentTarget }) => {
                                currentTarget.src = dummyProductImage;
                              }}
                              width={100}
                            />
                          </Link>
                        </div>
                        <div className="wishlist_product_desc col-md-4 mt-4">
                          <span className="font-name">
                            <Link to={`/product/${item?.pid}`}>
                              {item?.Product?.pname.slice(0, 18) || "...."}
                              {/* Boys' Long Sleeve Dress Shirt and Tie Set */}
                            </Link>
                          </span>
                          <br />
                          {/* <span className="sellerName">Brand : </span> */}
                          <div>
                            <span className="font-weight-bold amount">
                              {/* 110.00₹ */}₹{" "}
                              {item?.Product?.selling_price || "...."}
                            </span>
                          </div>
                          <div>
                            <button
                              className="btn"
                              style={{
                                background: "#EEE",
                                width: "auto",
                              }}
                              onClick={(e) => {
                                if (!state.isUserLoggedIn) {
                                  // alert("Please Login to continue");
                                  navigate("/customer/auth/login");
                                } else {
                                  apiHandleAddToCart(e, item?.pid);
                                }
                              }}
                            >
                              Add to Cart
                            </button>
                            <button
                              className="btn"
                              style={{
                                background: "#EEE",
                                width: "auto",
                                marginLeft: "2px",
                                marginTop: "2px",
                                // overflow: "hidden",
                                // textOverflow: "ellipsis",
                                // whiteSpace: "nowrap",
                                // wordWrap: "break-word",
                              }}
                              onClick={() => navigate("/shop-cart")}
                            >
                              View in Cart
                            </button>
                          </div>
                          <div></div>
                        </div>
                        <div
                          className="wishlist_product_btn col-md-6 col-lg-6 col-sm-6 mt-5 float-right bodytr font-weight-bold"
                          style={{ color: "#92C6FF" }}
                        >
                          <a
                            href="javascript:"
                            className="wishlist_product_icon ml-2 pull-right mr-3"
                          >
                            <i
                              className="czi-close-circle"
                              // onclick="removeWishlist('54')"
                              // onClick={apiHandleDeleteWishList}
                              onClick={(e) => {
                                console.log(index);
                                handleDeleteWishList(e, index, item.pid);
                              }}
                              style={{ color: "red" }}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {loader && (
              <div>
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
          </section>
        </div>
      </div>

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default Wishlists;
