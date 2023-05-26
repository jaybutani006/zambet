// import "App.css";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import dummyProductImage from "assets/dummyProductImage.png";

import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import ClipLoader from "react-spinners/ClipLoader";
import { searchFor } from "utils/search-through-all-values-in-objects";
import { defaultAPIErrorHandler } from "api/api";

function CustomerProducts() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    quantity: 1,
  });
  const handleModalOpen = (productState) => {
    setIsModalOpen(true);
    setModalState((prev) => ({
      ...prev,
      ...productState,
      totalPrice: productState?.selling_price,
    }));
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setModalState((prev) => ({
        ...prev,
        [name]: +value <= 0 ? 0 : +value,
        totalPrice: +value <= 0 ? 0 : +value * (prev?.selling_price || 1),
      }));
    }
  };
  const increaseQuantity = () => {
    console.log("+++++++++++++");
    setModalState((prev) => ({
      ...prev,
      quantity: +prev.quantity + 1,
      totalPrice: (+prev.quantity + 1) * prev.selling_price,
    }));
  };
  const decreaseQuantity = () => {
    console.log("------------------");
    setModalState((prev) => ({
      ...prev,
      quantity: +prev.quantity <= 1 ? 1 : prev.quantity - 1,
      totalPrice:
        +prev.quantity <= 1
          ? +prev.selling_price
          : (+prev.quantity - 1) * +prev.selling_price,
    }));
  };
  const apiHandleAddToCart = () => {
    let data = {
      product_id: modalState.product_id,
      quantity: modalState.quantity,
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
        dispatch({
          type: "SET_USER_CART_COUNT",
          userCartCount: (+state.userCartCount || 0) + 1,
        });
        // setMainState((prev) => ({
        //   ...prev,
        //   resCarts: response.data,
        // }));
        alert("Added to Cart Successfully");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };
  //
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  for (let pair of searchParams.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const [openNav, setOpenNav] = useState(false);

  const [mainState, setMainState] = useState({
    resHome: {},
    resBrands: [],
    brands: [],
    resCategories: [],
    categories: [],
    resProducts: [],
    products: [],
    selected: {
      brands: [],
      categories: [],
      sortBy: "",
      filterBy: "",
      min_price: 0,
      max_price: 99999999999,
    },
  });

  const apiGetAllProducts = (type) => {
    let params = {};
    const lPathName =
      location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
      "";

    if (lPathName === "best_selling_products") {
      params.type = "best_selling_products";
    } else if (lPathName === "top_rated_products") {
      params.type = "top_rated_products";
    } else if (lPathName === "featured_products") {
      params.type = "featured_products";
    }

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/getProducts",
      params: params,
      headers: {
        Authorization: state.userToken,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        const brandId = searchParams.get("brandId");
        const categoryId = searchParams.get("categoryId");
        const search = searchParams.get("search");
        if (!search) {
          setMainState((prev) => ({
            ...prev,
            resProducts: response.data.data.products,
            products: categoryId
              ? brandId
                ? response.data.data.products.filter(
                    (item) =>
                      item.brand_id === brandId ||
                      item.category_id === categoryId
                  )
                : response.data.data.products.filter(
                    (item) => item.category_id === categoryId
                  )
              : brandId
              ? response.data.data.products.filter(
                  (item) => item.brand_id === brandId
                )
              : response.data.data.products,
          }));
        } else {
          setMainState((prev) => ({
            ...prev,
            resProducts: response.data.data.products,
            products: !!search
              ? searchFor(search, response.data.data.products)
              : response.data.data.products,
          }));
        }
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetHome = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/home",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resHome: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllBrands = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/brand",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        let brandId = "";
        for (let pair of searchParams.entries()) {
          console.log(pair[0] + ", " + pair[1]);
          if (pair[0] === "brandId") {
            brandId = pair[1];
          }
        }

        setMainState((prev) => ({
          ...prev,
          resBrands: response.data.data,
          brands: !!brandId
            ? response.data.data.filter((item) => item.brandId === brandId)
            : response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetAllCategories = () => {
    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/category",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resCategories: response.data.data,
          categories: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleInputChange = (e, Id) => {
    const { name, value, checked } = e.target;
    if (name === "min_price" || name === "max_price") {
      if (name === "min_price") {
        if (value > mainState.selected.max_price) {
          alert("Min Price must be less than Max Price");
          return;
        }

        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: +value,
          },
        }));
      }
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: +value,
        },
      }));
    } else if (name === "brands") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          brands: !!checked
            ? [...prev.selected.brands.filter((item) => item !== Id), Id]
            : [...prev.selected.brands.filter((item) => item !== Id)],
        },
      }));
    } else if (name === "categories") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          categories: !!checked
            ? [...prev.selected.categories.filter((item) => item !== Id), Id]
            : [...prev.selected.categories.filter((item) => item !== Id)],
        },
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: +value,
        },
      }));
    }
  };

  const filterByBrand = () => {
    if (mainState.selected.brands.length) {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts.filter((item) => {
          for (let index = 0; index < prev.selected.brands.length; index++) {
            const element = prev.selected.brands[index];

            if (item.brand_id === element) {
              return true;
            }
          }
          return false;

          // return prev.selected.brands.map((item2) => item.brand_id === item2)
          //   .length === 0
          //   ? false
          //   : true;

          // return prev.selected.products.reduce((acc, item2) => {
          //   return item2 === item ? item2 : acc;
          // }, "");
        }),
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts,
      }));
    }
  };

  const filterByCategory = () => {
    if (mainState.selected.categories.length) {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts.filter((item) => {
          for (
            let index = 0;
            index < prev.selected.categories.length;
            index++
          ) {
            const element = prev.selected.categories[index];

            if (item.category_id === element) {
              return true;
            }
          }
          return false;

          // return prev.selected.categories.map(
          //   (item2) => item.category_id === item2
          // ).length === 0
          //   ? false
          //   : true;

          // return prev.selected.products.reduce((acc, item2) => {
          //   return item2 === item ? item2 : acc;
          // }, "");
        }),
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts,
      }));
    }
  };

  const sortBy = (sortParams) => {
    if (sortParams === 1) {
      // Latest
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts.slice(0),
      }));
      return;
    } else if (sortParams === 2) {
      // Low to High Price
      setMainState((prev) => ({
        ...prev,
        products: prev.products.slice(0).sort((a, b) => {
          return a.selling_price - b.selling_price;
        }),
      }));
      return;
    } else if (sortParams === 3) {
      //High to Low Price
      setMainState((prev) => ({
        ...prev,
        products: prev.products.slice(0).sort((a, b) => {
          return b.selling_price - a.selling_price;
        }),
      }));
      return;
    } else if (sortParams === 4) {
      // A to Z Order
      setMainState((prev) => ({
        ...prev,
        products: prev.products.slice(0).sort((a, b) => {
          let x = a.pname.toLowerCase();
          let y = b.pname.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        }),
      }));
      return;
    } else if (sortParams === 5) {
      // Z to A Order
      setMainState((prev) => ({
        ...prev,
        products: prev.products.slice(0).sort((a, b) => {
          let x = a.pname.toLowerCase();
          let y = b.pname.toLowerCase();
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        }),
      }));
      return;
    } else {
      return mainState.products;
    }
  };

  const filterByPrice = () => {
    setMainState((prev) => ({
      ...prev,
      products: prev.resProducts.filter((item) => {
        if (
          item.selling_price >= prev.selected.min_price &&
          item.selling_price < prev.selected.max_price
        ) {
          return true;
        }
        return false;
      }),
    }));
  };

  const filterByOther = (filterParams) => {
    if (filterParams === 1) {
      setMainState((prev) => ({
        ...prev,
        products: prev.products,
      }));
    } else if (filterParams === 2) {
      setMainState((prev) => ({
        ...prev,
        products: prev?.resHome?.top_three_rated_product || prev.products,
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        products: prev.products,
      }));
    }
  };

  useEffect(() => {
    // console.log(searchParams);
    // ▶ URLSearchParams {}
    // console.log(searchParams.entries());
    // ▶ Iterator {}
    apiGetHome();
    // apiGetAllProducts();
    apiGetAllCategories();
    apiGetAllBrands();
  }, []);

  useEffect(() => {
    apiGetAllProducts();
  }, [location.pathname]);
  // useEffect(() => {
  //   const brandId = searchParams.get("brandId");
  //   setMainState((prev) => ({
  //     ...prev,
  //     products: brandId
  //       ? prev.resProducts.products.filter((item) => item.brand_id === brandId)
  //       : prev.resProducts.products,
  //   }));
  // }, [location.pathname]);

  useEffect(() => {
    filterByBrand();
  }, [mainState.selected.brands]);

  useEffect(() => {
    filterByCategory();
  }, [mainState.selected.categories]);

  useEffect(() => {
    let brandId = searchParams.get("brandId");
    let categoryId = searchParams.get("categoryId");
    let search = searchParams.get("search");
    //
    let featuredProducts = searchParams.get("featuredProducts");
    let latestProducts = searchParams.get("latestProducts");
    let topSellingProducts = searchParams.get("topSellingProducts");
    let topRatedProducts = searchParams.get("topRatedProducts");
    console.log(brandId, categoryId, search);

    if (!search) {
      setMainState((prev) => ({
        ...prev,
        products: categoryId
          ? brandId
            ? prev.resProducts.filter(
                (item) =>
                  item.brand_id === brandId || item.category_id === categoryId
              )
            : prev.resProducts.filter((item) => item.category_id === categoryId)
          : brandId
          ? prev.resProducts.filter((item) => item.brand_id === brandId)
          : prev.resProducts,
      }));
    } else if (!!featuredProducts) {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts,
      }));
    } else if (!!latestProducts) {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts,
      }));
    } else if (!!topSellingProducts) {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts,
      }));
    } else if (!!topRatedProducts) {
      setMainState((prev) => ({
        ...prev,
        products: prev.resProducts,
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        products: !!search
          ? searchFor(search, prev.resProducts)
          : prev.resProducts,
      }));
    }
  }, [location.search, location.brandId, location.categoryId]);

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

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        .headerTitle {\n            font-size: 26px;\n            font-weight: bolder;\n            margin-top: 3rem;\n        }\n\n        .for-count-value {\n            position: absolute;\n\n        right: 0.6875 rem;;\n            width: 1.25rem;\n            height: 1.25rem;\n            border-radius: 50%;\n\n            color: black;\n            font-size: .75rem;\n            font-weight: 500;\n            text-align: center;\n            line-height: 1.25rem;\n        }\n\n        .for-count-value {\n            position: absolute;\n\n        right: 0.6875 rem;\n            width: 1.25rem;\n            height: 1.25rem;\n            border-radius: 50%;\n            color: #fff;\n            font-size: 0.75rem;\n            font-weight: 500;\n            text-align: center;\n            line-height: 1.25rem;\n        }\n\n        .for-brand-hover:hover {\n            color: #3b71de;\n        }\n\n        .for-hover-lable:hover {\n            color: #3b71de       !important;\n        }\n\n        .page-item.active .page-link {\n            background-color: #3b71de      !important;\n        }\n\n        .page-item.active > .page-link {\n            box-shadow: 0 0 black !important;\n        }\n\n        .for-shoting {\n            font-weight: 600;\n            font-size: 14px;\n            padding- right: 9px;\n            color: #030303;\n        }\n\n        .sidepanel {\n            width: 0;\n            position: fixed;\n            z-index: 6;\n            height: 500px;\n            top: 0;\n        left: 0;\n            background-color: #ffffff;\n            overflow-x: hidden;\n            transition: 0.5s;\n            padding-top: 40px;\n        }\n\n        .sidepanel a {\n            padding: 8px 8px 8px 32px;\n            text-decoration: none;\n            font-size: 25px;\n            color: #818181;\n            display: block;\n            transition: 0.3s;\n        }\n\n        .sidepanel a:hover {\n            color: #f1f1f1;\n        }\n\n        .sidepanel .closebtn {\n            position: absolute;\n            top: 0;\n        right: 25 px;\n            font-size: 36px;\n        }\n\n        .openbtn {\n            font-size: 18px;\n            cursor: pointer;\n            background-color: transparent !important;\n            color: #373f50;\n            width: 40%;\n            border: none;\n        }\n\n        .openbtn:hover {\n            background-color: #444;\n        }\n\n        .for-display {\n            display: block !important;\n        }\n\n        @media (max-width: 360px) {\n            .openbtn {\n                width: 59%;\n            }\n\n            .for-shoting-mobile {\n                margin- right: 0% !important;\n            }\n\n            .for-mobile {\n\n                margin- left: 10% !important;\n            }\n\n        }\n\n        @media (max-width: 500px) {\n            .for-mobile {\n\n                margin- left: 27%;\n            }\n\n            .openbtn:hover {\n                background-color: #fff;\n            }\n\n            .for-display {\n                display: flex !important;\n            }\n\n            .for-tab-display {\n                display: none !important;\n            }\n\n            .openbtn-tab {\n                margin-top: 0 !important;\n            }\n\n        }\n\n        @media  screen and (min-width: 500px) {\n            .openbtn {\n                display: none !important;\n            }\n\n\n        }\n\n        @media  screen and (min-width: 800px) {\n\n\n            .for-tab-display {\n                display: none !important;\n            }\n\n        }\n\n        @media (max-width: 768px) {\n            .headerTitle {\n                font-size: 23px;\n\n            }\n\n            .openbtn-tab {\n                margin-top: 3rem;\n                display: inline-block !important;\n            }\n\n            .for-tab-display {\n                display: inline;\n            }\n        }\n    ",
        }}
      />

      <div
        className="d-flex justify-content-center align-items-center mb-3"
        style={{ minHeight: "70px", background: "#3b71de10", width: "100%" }}
      >
        <div className="row text-capitalize">
          <span style={{ fontWeight: 600, fontSize: "18px" }}>
            {location.pathname.substring(
              location.pathname.lastIndexOf("/") + 1
            )}
          </span>
        </div>
      </div>

      {/* <div className="container rtl" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-3">
            <a className="openbtn-tab mt-5" onclick="openNav()">
              <div
                style={{ fontSize: "20px", fontWeight: 600 }}
                className="for-tab-display mt-5"
              >
                <i className="fa fa-filter" />
                Filter
              </div>
            </a>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <h1 className="h3 text-dark mb-3 headerTitle text-uppercase">
                  Products
                  <label>( {mainState.products.length} Items found )</label>
                </h1>
              </div>
              <div className="row col-md-6 for-display mx-0">
                <button className="openbtn text-left" onclick="openNav()">
                  <div style={{ marginBottom: "-30%" }}>
                    <i className="fa fa-filter" />
                    Filter
                  </div>
                </button>
                <div className="d-flex flex-wrap mt-5 float-right for-shoting-mobile">
                  <form
                    id="search-form"
                  >
                    <input hidden name="data_from" defaultValue="brand" />
                    <div className="form-inline flex-nowrap pb-3 for-mobile">
                      <label
                        className="opacity-75 text-nowrap mr-2 for-shoting"
                        htmlFor="sorting"
                      >
                        <span className="mr-2">Sort by</span>
                      </label>
                      <select
                        style={{ background: "white", appearance: "auto" }}
                        className="form-control custom-select"
                        // onchange="filter(this.value)"
                        name="sortBy"
                        // value={}
                        onChange={(e) => {
                          // alert(+e.target.value);
                          sortBy(+e.target.value);
                        }}
                      >
                        <option value={0} disabled>
                          Choose
                        </option>
                        <option value={1}>Latest</option>
                        <option value={2}>Low to High Price </option>
                        <option value={3}>High to Low Price</option>
                        <option value={4}>A to Z Order</option>
                        <option value={5}>Z to A Order</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="container pb-5 mb-2 mb-md-4 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <aside
            className="col-lg-3 hidden-xs col-md-3 col-sm-4 SearchParameters pr-0"
            id="SearchParameters"
          >
            {/* <div
              className="cz-sidebar rounded-lg box-shadow-lg"
              id="shop-sidebar"
              style={{ marginBottom: "-10px" }}
            >
              <div className="cz-sidebar-header box-shadow-sm">
                <button
                  className="close ml-auto"
                  type="button"
                  data-dismiss="sidebar"
                  aria-label="Close"
                >
                  <span className="d-inline-block font-size-xs font-weight-normal align-middle">
                    DashboardClose sidebar
                  </span>
                  <span
                    className="d-inline-block align-middle ml-2"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                </button>
              </div>
              <div
                className="cz-sidebar-body pb-0"
                style={{ paddingTop: "12px" }}
              >
                <div className="widget cz-filter mb-4 pb-4 mt-2">
                  <h3 className="widget-title" style={{ fontWeight: 700 }}>
                    Filter
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  />
                  <div
                    className="form-inline flex-nowrap mr-sm-4 pb-3 for-mobile"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="opacity-75 text-nowrap for-shoting"
                      htmlFor="sorting"
                      style={{ width: "100%", paddingRight: 0 }}
                    >
                      <select
                        style={{
                          background: "whitesmoke",
                          appearance: "auto",
                          width: "100%",
                        }}
                        className="form-control custom-select"
                        id="searchByFilterValue"
                        name="searchByFilterValue"
                        // value={}
                        onChange={(e) => {
                          // alert(+e.target.value);
                          filterByOther(+e.target.value);
                        }}
                      >
                        <option selected disabled>
                          Choose
                        </option>
                        <option value={1}>Best Selling Products</option>
                        <option value={2}>Top rated</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
            <div
              className="cz-sidebar rounded-lg box-shadow-lg"
              id="shop-sidebar"
              style={{ marginBottom: "-10px" }}
            >
              <div className="cz-sidebar-header box-shadow-sm">
                <button
                  className="close ml-auto"
                  type="button"
                  data-dismiss="sidebar"
                  aria-label="Close"
                >
                  <span className="d-inline-block font-size-xs font-weight-normal align-middle">
                    DashboardClose sidebar
                  </span>
                  <span
                    className="d-inline-block align-middle ml-2"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                </button>
              </div>
              <div
                className="cz-sidebar-body pb-0"
                style={{ paddingTop: "12px" }}
              >
                <div className="widget cz-filter mb-4 pb-4 mt-2">
                  <h3 className="widget-title" style={{ fontWeight: 700 }}>
                    Price
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  />
                  <div className="input-group-overlay input-group-sm mb-1">
                    <input
                      style={{ background: "aliceblue" }}
                      className="cz-filter-search form-control form-control-sm appended-form-control"
                      type="number"
                      // id="min_price"
                      name="min_price"
                      value={mainState.selected.min_price}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <div className="input-group-append-overlay">
                      <span
                        style={{ color: "#3498db" }}
                        className="input-group-text"
                      >
                        ₹
                      </span>
                    </div>
                  </div>
                  <div>
                    <p style={{ textAlign: "center", marginBottom: "1px" }}>
                      To
                    </p>
                  </div>
                  <div className="input-group-overlay input-group-sm mb-2">
                    <input
                      style={{ background: "aliceblue" }}
                      className="cz-filter-search form-control form-control-sm appended-form-control"
                      type="number"
                      // id="max_price"
                      name="max_price"
                      value={mainState.selected.max_price}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <div className="input-group-append-overlay">
                      <span
                        style={{ color: "#3498db" }}
                        className="input-group-text"
                      >
                        ₹
                      </span>
                    </div>
                  </div>
                  <div className="input-group-overlay input-group-sm mb-2">
                    <button
                      className="btn btn-primary btn-block"
                      // onclick="searchByPrice()"
                      onClick={() => filterByPrice()}
                    >
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="cz-sidebar rounded-lg box-shadow-lg"
              id="shop-sidebar"
              style={{ marginBottom: "11px" }}
            >
              <div className="cz-sidebar-header box-shadow-sm">
                <button
                  className="close ml-auto"
                  type="button"
                  data-dismiss="sidebar"
                  aria-label="Close"
                >
                  <span className="d-inline-block font-size-xs font-weight-normal align-middle">
                    DashboardClose sidebar
                  </span>
                  <span
                    className="d-inline-block align-middle ml-2"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                </button>
              </div>
              <div className="cz-sidebar-body">
                <div className="widget cz-filter mb-4 pb-4 border-bottom mt-2">
                  <h3 className="widget-title" style={{ fontWeight: 700 }}>
                    Brands
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  />
                  <div className="input-group-overlay input-group-sm mb-2">
                    <input
                      style={{ background: "aliceblue" }}
                      placeholder="Search brand"
                      className="cz-filter-search form-control form-control-sm appended-form-control"
                      type="text"
                      id="search-brand"
                    />
                    <div className="input-group-append-overlay">
                      <span
                        style={{ color: "#3498db" }}
                        className="input-group-text"
                      >
                        <i className="czi-search" />
                      </span>
                    </div>
                  </div>
                  <ul
                    id="lista1"
                    className="widget-list cz-filter-list list-unstyled pt-1"
                    style={{ maxHeight: "12rem" }}
                    data-simplebar="init"
                    data-simplebar-auto-hide="false"
                  >
                    <div
                      className="simplebar-wrapper"
                      style={{ margin: "-4px 0px 0px" }}
                    >
                      <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer" />
                      </div>
                      <div className="simplebar-mask">
                        <div
                          className="simplebar-offset"
                          style={{ right: "0px", bottom: "0px" }}
                        >
                          <div
                            className="simplebar-content-wrapper"
                            style={{
                              height: "auto",
                              overflow: "hidden scroll",
                            }}
                          >
                            <div
                              className="simplebar-content"
                              style={{ padding: "4px 0px 0px" }}
                            >
                              {!!mainState?.resBrands?.length ? (
                                mainState.resBrands.map((item) => (
                                  <div
                                    className="brand mt-4 for-brand-hover "
                                    id="brand"
                                  >
                                    <li
                                      style={{
                                        cursor: "pointer",
                                        padding: "2px",
                                      }}
                                      className="flex-between"
                                      onclick="location.href='https://6valley.6amtech.com/products?id=15&data_from=brand&page=1'"
                                    >
                                      {item?.brand_name || "...."}
                                      <div>
                                        {/* <span className="count-value">0</span> */}
                                        <span className="count-value">
                                          <input
                                            type="checkbox"
                                            name="brands"
                                            onChange={(e) => {
                                              console.log(item._id);
                                              handleInputChange(e, item._id);
                                            }}
                                            // checked={
                                            //   searchParams.get("brandId") ===
                                            //   item._id
                                            // }
                                          />
                                        </span>
                                      </div>
                                    </li>
                                  </div>
                                ))
                              ) : (
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="simplebar-placeholder"
                        style={{ width: "247px", height: "784px" }}
                      />
                    </div>
                    <div
                      className="simplebar-track simplebar-horizontal"
                      style={{ visibility: "hidden" }}
                    >
                      <div
                        className="simplebar-scrollbar simplebar-visible"
                        style={{ width: "0px", display: "none" }}
                      />
                    </div>
                    <div
                      className="simplebar-track simplebar-vertical"
                      style={{ visibility: "visible" }}
                    >
                      <div
                        className="simplebar-scrollbar simplebar-visible"
                        style={{
                          height: "47px",
                          transform: "translate3d(0px, 0px, 0px)",
                          display: "block",
                        }}
                      />
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="cz-sidebar rounded-lg box-shadow-lg"
              id="shop-sidebar"
            >
              <div className="cz-sidebar-header box-shadow-sm">
                <button
                  className="close ml-auto"
                  type="button"
                  data-dismiss="sidebar"
                  aria-label="Close"
                >
                  <span className="d-inline-block font-size-xs font-weight-normal align-middle">
                    Close sidebar
                  </span>
                  <span
                    className="d-inline-block align-middle ml-2"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                </button>
              </div>
              <div className="cz-sidebar-body">
                <div className="widget widget-categories mb-4 pb-4 border-bottom">
                  <h3 className="widget-title" style={{ fontWeight: 700 }}>
                    Categories
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  />

                  <div className="accordion mt-n1" id="shop-categories">
                    {!!mainState?.resCategories?.length ? (
                      mainState.resCategories.map((item) => (
                        <div className="card">
                          <div className="card-header p-1 flex-between">
                            <div>
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=37&data_from=category&page=1'"
                              >
                                {item?.category_name || "...."}
                              </label>
                            </div>
                            <div>
                              <strong
                                className="pull-right for-brand-hover"
                                style={{ cursor: "pointer" }}
                                onclick="$('#collapse-37').toggle(400)"
                              >
                                {/* + */}
                                <input
                                  type="checkbox"
                                  name="categories"
                                  onChange={(e) => {
                                    console.log(item._id);
                                    handleInputChange(e, item._id);
                                  }}
                                  // checked={
                                  //   searchParams.get("categoryId") === item._id
                                  // }
                                />
                              </strong>
                            </div>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapse-37"
                            style={{ display: "none" }}
                          >
                            <div className=" for-hover-lable card-header p-1 flex-between">
                              <div>
                                <label
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=50&data_from=category&page=1'"
                                >
                                  Women's Fashion
                                </label>
                              </div>
                              <div>
                                <strong
                                  className="pull-right"
                                  style={{ cursor: "pointer" }}
                                  onclick="$('#collapse-50').toggle(400)"
                                >
                                  +
                                </strong>
                              </div>
                            </div>
                            <div
                              className="card-body ml-2"
                              id="collapse-50"
                              style={{ display: "none" }}
                            >
                              <div className="card-header p-1">
                                <label
                                  className="for-hover-lable"
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=54&data_from=category&page=1'"
                                >
                                  Dresses
                                </label>
                              </div>
                            </div>
                            <div className=" for-hover-lable card-header p-1 flex-between">
                              <div>
                                <label
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=52&data_from=category&page=1'"
                                >
                                  Bottoms
                                </label>
                              </div>
                              <div>
                                <strong
                                  className="pull-right"
                                  style={{ cursor: "pointer" }}
                                  onclick="$('#collapse-52').toggle(400)"
                                >
                                  +
                                </strong>
                              </div>
                            </div>
                            <div
                              className="card-body ml-2"
                              id="collapse-52"
                              style={{ display: "none" }}
                            >
                              <div className="card-header p-1">
                                <label
                                  className="for-hover-lable"
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=60&data_from=category&page=1'"
                                >
                                  Leggings
                                </label>
                              </div>
                              <div className="card-header p-1">
                                <label
                                  className="for-hover-lable"
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=61&data_from=category&page=1'"
                                >
                                  Skirts
                                </label>
                              </div>
                              <div className="card-header p-1">
                                <label
                                  className="for-hover-lable"
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=62&data_from=category&page=1'"
                                >
                                  Jeans
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
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
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div
            id="mySidepanel"
            className="sidepanel"
            style={
              openNav
                ? {
                    width: "100%",
                    height: "100vh",
                  }
                : {}
            }
          >
            <a
              href="javascript:void(0)"
              className="closebtn"
              // onclick="closeNav()"
              onClick={() => setOpenNav(!openNav)}
            >
              ×
            </a>
            <aside className style={{ paddingRight: "5%", paddingLeft: "5%" }}>
              {/* <div
                className
                id="shop-sidebar"
                style={{ marginBottom: "-10px" }}
              >
                <div className=" box-shadow-sm"></div>
                <div className style={{ paddingTop: "12px" }}>
                  <div className="widget cz-filter">
                    <h3
                      className="widget-title"
                      style={{ fontWeight: 700, textAlign: "center" }}
                    >
                      Filter
                    </h3>
                    <div className style={{ width: "100%" }}>
                      <label
                        className="opacity-75 text-nowrap for-shoting"
                        htmlFor="sorting"
                        style={{ width: "100%", paddingRight: 0 }}
                      >
                        <select
                          style={{
                            background: "whitesmoke",
                            appearance: "auto",
                            width: "100%",
                          }}
                          className="form-control custom-select"
                          id="searchByFilterValue"
                          name="searchByFilterValue"
                          // value={}
                          onChange={(e) => {
                            // alert(+e.target.value);
                            filterByOther(+e.target.value);
                          }}
                        >
                          <option selected disabled>
                            Choose
                          </option>
                          <option value={1}>Best Selling Products</option>
                          <option value={2}>Top rated</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
              <div
                className
                id="shop-sidebar"
                style={{ marginBottom: "-10px" }}
              >
                <div className=" box-shadow-sm"></div>
                <div className style={{ paddingTop: "12px" }}>
                  <div className="widget cz-filter mb-4 pb-4 mt-2">
                    <h3 className="widget-title" style={{ fontWeight: 700 }}>
                      Price
                    </h3>
                    <div
                      className="divider-role"
                      style={{
                        border: "1px solid whitesmoke",
                        marginBottom: "14px",
                        marginTop: "-6px",
                      }}
                    />
                    <div className="input-group-overlay input-group-sm mb-1">
                      <input
                        style={{ background: "aliceblue" }}
                        className="cz-filter-search form-control form-control-sm appended-form-control"
                        type="number"
                        // id="min_price"
                        name="min_price"
                        value={mainState.selected.min_price}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <div className="input-group-append-overlay">
                        <span
                          style={{ color: "#3498db" }}
                          className="input-group-text"
                        >
                          ₹
                        </span>
                      </div>
                    </div>
                    <div>
                      <p style={{ textAlign: "center", marginBottom: "1px" }}>
                        To
                      </p>
                    </div>
                    <div className="input-group-overlay input-group-sm mb-2">
                      <input
                        style={{ background: "aliceblue" }}
                        className="cz-filter-search form-control form-control-sm appended-form-control"
                        type="number"
                        // id="max_price"
                        name="max_price"
                        value={mainState.selected.max_price}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <div className="input-group-append-overlay">
                        <span
                          style={{ color: "#3498db" }}
                          className="input-group-text"
                        >
                          ₹
                        </span>
                      </div>
                    </div>
                    <div className="input-group-overlay input-group-sm mb-2">
                      <button
                        className="btn btn-primary btn-block"
                        // onclick="searchByPrice()"
                        onClick={() => filterByPrice()}
                      >
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className id="shop-sidebar" style={{ marginBottom: "11px" }}>
                <div className>
                  <div className="widget cz-filter mb-4 pb-4 border-bottom mt-2">
                    <h3 className="widget-title" style={{ fontWeight: 700 }}>
                      Brands
                    </h3>
                    <div
                      className="divider-role"
                      style={{
                        border: "1px solid whitesmoke",
                        marginBottom: "14px",
                        marginTop: "-6px",
                      }}
                    />
                    <div className="input-group-overlay input-group-sm mb-2">
                      <input
                        style={{ background: "aliceblue" }}
                        className="cz-filter-search form-control form-control-sm appended-form-control"
                        type="text"
                        id="search-brand-m"
                      />
                      <div className="input-group-append-overlay">
                        <span
                          style={{ color: "#3498db" }}
                          className="input-group-text"
                        >
                          <i className="czi-search" />
                        </span>
                      </div>
                    </div>
                    <ul
                      id="lista1"
                      className="widget-list cz-filter-list list-unstyled pt-1"
                      style={{ maxHeight: "12rem" }}
                      data-simplebar="init"
                      data-simplebar-auto-hide="false"
                    >
                      <div
                        className="simplebar-wrapper"
                        style={{ margin: "-4px 0px 0px" }}
                      >
                        <div className="simplebar-height-auto-observer-wrapper">
                          <div className="simplebar-height-auto-observer" />
                        </div>
                        <div className="simplebar-mask">
                          <div
                            className="simplebar-offset"
                            style={{ right: "0px", bottom: "0px" }}
                          >
                            <div
                              className="simplebar-content-wrapper"
                              style={{
                                height: "auto",
                                overflow: "hidden scroll",
                              }}
                            >
                              <div
                                className="simplebar-content"
                                style={{ padding: "4px 0px 0px" }}
                              >
                                <div
                                  className="brand mt-4 for-brand-hover"
                                  id="brand"
                                >
                                  <li
                                    style={{
                                      cursor: "pointer",
                                      padding: "2px",
                                    }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=15&data_from=brand&page=1'"
                                  >
                                    Great Hall
                                    <span
                                      className="for-count-value"
                                      style={{ float: "right" }}
                                    >
                                      8
                                    </span>
                                  </li>
                                </div>
                                {!!mainState?.resBrands?.length ? (
                                  mainState.resBrands.map((item) => (
                                    <div
                                      className="brand mt-4 for-brand-hover "
                                      id="brand"
                                    >
                                      <li
                                        style={{
                                          cursor: "pointer",
                                          padding: "2px",
                                        }}
                                        className="flex-between"
                                        onclick="location.href='https://6valley.6amtech.com/products?id=15&data_from=brand&page=1'"
                                      >
                                        {item?.brand_name || "...."}
                                        <div>
                                          {/* <span className="count-value">0</span> */}
                                          <span className="count-value">
                                            <input
                                              type="checkbox"
                                              name="brands"
                                              onChange={(e) => {
                                                console.log(item._id);
                                                handleInputChange(e, item._id);
                                              }}
                                              // checked={
                                              //   searchParams.get("brandId") ===
                                              //   item._id
                                              // }
                                            />
                                          </span>
                                        </div>
                                      </li>
                                    </div>
                                  ))
                                ) : (
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
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="simplebar-placeholder"
                          style={{ width: "76px", height: "928px" }}
                        />
                      </div>
                      <div
                        className="simplebar-track simplebar-horizontal"
                        style={{ visibility: "hidden" }}
                      >
                        <div
                          className="simplebar-scrollbar simplebar-visible"
                          style={{ width: "0px", display: "none" }}
                        />
                      </div>
                      <div
                        className="simplebar-track simplebar-vertical"
                        style={{ visibility: "visible" }}
                      >
                        <div
                          className="simplebar-scrollbar simplebar-visible"
                          style={{
                            height: "39px",
                            transform: "translate3d(0px, 0px, 0px)",
                            display: "block",
                          }}
                        />
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div className id="shop-sidebar">
                <div className>
                  <div className="widget widget-categories mb-4 pb-4 border-bottom">
                    <h3 className="widget-title" style={{ fontWeight: 700 }}>
                      Categories
                    </h3>
                    <div
                      className="divider-role"
                      style={{
                        border: "1px solid whitesmoke",
                        marginBottom: "14px",
                        marginTop: "-6px",
                      }}
                    />
                    <div className="accordion mt-n1" id="shop-categories">
                      <div className="card">
                        <div className="card-header p-1 flex-between">
                          <div>
                            <label
                              className="for-hover-lable"
                              style={{ cursor: "pointer" }}
                              onclick="location.href='https://6valley.6amtech.com/products?id=37&data_from=category&page=1'"
                            >
                              Women's Fashion
                            </label>
                          </div>
                          <div>
                            <strong
                              className="pull-right for-brand-hover"
                              style={{ cursor: "pointer" }}
                              onclick="$('#collapsem-37').toggle(300)"
                            >
                              +
                            </strong>
                          </div>
                        </div>
                        <div
                          className="card-body ml-2"
                          id="collapsem-37"
                          style={{ display: "none" }}
                        >
                          <div className="card-header p-1 flex-between">
                            <div>
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=50&data_from=category&page=1'"
                              >
                                Women's Fashion
                              </label>
                            </div>
                            <div>
                              <strong
                                className="pull-right for-brand-hover"
                                style={{ cursor: "pointer" }}
                                onclick="$('#collapsem-50').toggle(300)"
                              >
                                +
                              </strong>
                            </div>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapsem-50"
                            style={{ display: "none" }}
                          >
                            <div className="card-header p-1">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=54&data_from=category&page=1'"
                              >
                                Dresses
                              </label>
                            </div>
                          </div>
                          <div className="card-header p-1 flex-between">
                            <div>
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=52&data_from=category&page=1'"
                              >
                                Bottoms
                              </label>
                            </div>
                            <div>
                              <strong
                                className="pull-right for-brand-hover"
                                style={{ cursor: "pointer" }}
                                onclick="$('#collapsem-52').toggle(300)"
                              >
                                +
                              </strong>
                            </div>
                          </div>
                          <div
                            className="card-body ml-2"
                            id="collapsem-52"
                            style={{ display: "none" }}
                          >
                            <div className="card-header p-1">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=60&data_from=category&page=1'"
                              >
                                Leggings
                              </label>
                            </div>
                            <div className="card-header p-1">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=61&data_from=category&page=1'"
                              >
                                Skirts
                              </label>
                            </div>
                            <div className="card-header p-1">
                              <label
                                className="for-hover-lable"
                                style={{ cursor: "pointer" }}
                                onclick="location.href='https://6valley.6amtech.com/products?id=62&data_from=category&page=1'"
                              >
                                Jeans
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!!mainState?.resCategories?.length ? (
                        mainState.resCategories.map((item) => (
                          <div className="card">
                            <div className="card-header p-1 flex-between">
                              <div>
                                <label
                                  className="for-hover-lable"
                                  style={{ cursor: "pointer" }}
                                  onclick="location.href='https://6valley.6amtech.com/products?id=37&data_from=category&page=1'"
                                >
                                  {item?.category_name || "...."}
                                </label>
                              </div>
                              <div>
                                <strong
                                  className="pull-right for-brand-hover"
                                  style={{ cursor: "pointer" }}
                                  onclick="$('#collapse-37').toggle(400)"
                                >
                                  {/* + */}
                                  <input
                                    type="checkbox"
                                    name="categories"
                                    onChange={(e) => {
                                      console.log(item._id);
                                      handleInputChange(e, item._id);
                                    }}
                                    // checked={
                                    //   searchParams.get("categoryId") === item._id
                                    // }
                                  />
                                </strong>
                              </div>
                            </div>
                            <div
                              className="card-body ml-2"
                              id="collapse-37"
                              style={{ display: "none" }}
                            >
                              <div className=" for-hover-lable card-header p-1 flex-between">
                                <div>
                                  <label
                                    style={{ cursor: "pointer" }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=50&data_from=category&page=1'"
                                  >
                                    Women's Fashion
                                  </label>
                                </div>
                                <div>
                                  <strong
                                    className="pull-right"
                                    style={{ cursor: "pointer" }}
                                    onclick="$('#collapse-50').toggle(400)"
                                  >
                                    +
                                  </strong>
                                </div>
                              </div>
                              <div
                                className="card-body ml-2"
                                id="collapse-50"
                                style={{ display: "none" }}
                              >
                                <div className="card-header p-1">
                                  <label
                                    className="for-hover-lable"
                                    style={{ cursor: "pointer" }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=54&data_from=category&page=1'"
                                  >
                                    Dresses
                                  </label>
                                </div>
                              </div>
                              <div className=" for-hover-lable card-header p-1 flex-between">
                                <div>
                                  <label
                                    style={{ cursor: "pointer" }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=52&data_from=category&page=1'"
                                  >
                                    Bottoms
                                  </label>
                                </div>
                                <div>
                                  <strong
                                    className="pull-right"
                                    style={{ cursor: "pointer" }}
                                    onclick="$('#collapse-52').toggle(400)"
                                  >
                                    +
                                  </strong>
                                </div>
                              </div>
                              <div
                                className="card-body ml-2"
                                id="collapse-52"
                                style={{ display: "none" }}
                              >
                                <div className="card-header p-1">
                                  <label
                                    className="for-hover-lable"
                                    style={{ cursor: "pointer" }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=60&data_from=category&page=1'"
                                  >
                                    Leggings
                                  </label>
                                </div>
                                <div className="card-header p-1">
                                  <label
                                    className="for-hover-lable"
                                    style={{ cursor: "pointer" }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=61&data_from=category&page=1'"
                                  >
                                    Skirts
                                  </label>
                                </div>
                                <div className="card-header p-1">
                                  <label
                                    className="for-hover-lable"
                                    style={{ cursor: "pointer" }}
                                    onclick="location.href='https://6valley.6amtech.com/products?id=62&data_from=category&page=1'"
                                  >
                                    Jeans
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
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
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="col-lg-9">
            <div
              className="row"
              style={{
                background: "white",
                margin: "0px",
                borderRadius: "5px",
              }}
            >
              <div className="col-md-6 d-flex  align-items-center">
                <h1 className="ml-3">
                  <label id="price-filter-count">
                    {" "}
                    {mainState.products.length} Items found{" "}
                  </label>
                </h1>
              </div>
              <div className="col-md-6 m-2 m-md-0 d-flex  align-items-center ">
                <button
                  className="openbtn text-left"
                  //  onclick="openNav()"
                  onClick={() => setOpenNav(!openNav)}
                >
                  <div>
                    <i className="fa fa-filter" />
                    Filter
                  </div>
                </button>
                <div className style={{ width: "100%" }}>
                  <form id="search-form">
                    <input hidden name="data_from" defaultValue="latest" />
                    <div className=" mr-2 float-right">
                      <label className=" mr-1 for-shoting" htmlFor="sorting">
                        <span className="mr-2">Sort by</span>
                      </label>
                      <select
                        style={{
                          background: "white",
                          appearance: "auto",
                          borderRadius: "5px",
                          border: "1px solid rgba(27, 127, 237, 0.5)",
                          padding: "5px",
                        }}
                        // onchange="filter(this.value)"
                        name="sortBy"
                        // value={}
                        onChange={(e) => {
                          // alert(+e.target.value);
                          sortBy(+e.target.value);
                        }}
                      >
                        <option value={0} disabled>
                          Choose
                        </option>
                        <option value={1}>Latest</option>
                        <option value={2}>Low to High Price </option>
                        <option value={3}>High to Low Price</option>
                        <option value={4}>A to Z Order</option>
                        <option value={5}>Z to A Order</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="row mt-3" id="ajax-products">
              {!!mainState.products.length &&
                mainState.products.map((item) => (
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
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                  "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png";
                              }}
                              // onError={
                              //   "https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png"
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
                      <div
                        className="card-body card-body-hidden"
                        style={{ paddingBottom: "5px!important" }}
                      >
                        <div className="text-center">
                          <a
                            className="btn btn-primary btn-sm btn-block mb-2"
                            href="javascript:"
                            onClick={() => {
                              handleModalOpen(item);
                            }}
                          >
                            <i className="czi-eye align-middle mr-1" />
                            Quick View
                          </a>
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

              <div className="col-12">
                <nav
                  className="d-flex justify-content-between pt-2"
                  aria-label="Page navigation"
                  id="paginator-ajax"
                ></nav>
              </div>
            </div>
          </section>
        </div>
      </div>

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
      <Modal
        size="xl"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "white",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>{modalState?.pname}</Modal.Title>
          <Button onClick={() => setIsModalOpen(false)} variant="outline-dark">
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-lg-6 col-md-6">
              <div className="cz-product-gallery">
                <div className="cz-preview">
                  <div className="cz-preview-item d-flex align-items-center justify-content-center  active">
                    <img
                      className="show-imag img-responsive"
                      style={{ maxHeight: "500px!important" }}
                      src={modalState?.pphoto || dummyProductImage}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyProductImage;
                      }}
                      alt="Product image"
                      width
                    />
                  </div>
                  {/* <div className="cz-preview-item d-flex align-items-center justify-content-center  ">
                    <img
                      className="show-imag img-responsive"
                      style={{ maxHeight: "500px!important" }}
                      src={modalState?.pphoto || dummyProductImage}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyProductImage;
                      }}
                      alt="Product image"
                      width
                    />
                  </div> */}
                </div>
                {/* <div className="row">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "515px", padding: "0px" }}
                  >
                    <div className="d-flex">
                      <div className="cz-thumblist">
                        <a
                          href="javascript:"
                          className=" cz-thumblist-item d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="click-img"
                            src={modalState?.pphoto || dummyProductImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = dummyProductImage;
                            }}
                            alt="Product thumb"
                          />
                        </a>
                      </div>
                      <div className="cz-thumblist">
                        <a
                          href="javascript:"
                          className=" cz-thumblist-item d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="click-img"
                            src={modalState?.pphoto || dummyProductImage}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = dummyProductImage;
                            }}
                            alt="Product thumb"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* Product details*/}
            <div className="col-lg-6 col-md-6 mt-md-0 mt-sm-3">
              <div className="details" style={{ textAlign: "left" }}>
                <Link
                  to={`/product/${modalState?.product_id}`}
                  className="h3 mb-2 product-title"
                >
                  {modalState?.pname}
                </Link>
                <div className="d-flex align-items-center mb-2 pro">
                  <span className="d-inline-block font-size-sm text-body align-middle mt-1 mr-2 pr-2">
                    {modalState?.review_avg || "0.0"}
                  </span>
                  <div className="star-rating">
                    <Rating
                      readonly
                      fractions={2}
                      initialRating={modalState?.review_avg || 0}
                      style={{ color: "#fea569" }}
                      emptySymbol="fa fa-star-o mr-1"
                      fullSymbol="fa fa-star mr-1"
                      // emptySymbol="fa fa-star-o fa-2x"
                      // fullSymbol="fa fa-star fa-2x"
                    />
                    {/* <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" /> */}
                  </div>
                  <div>
                    <span className="d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-2 pl-2 pr-2">
                      {`${modalState?.review_count || "0"} Reviews`}
                    </span>
                    <span
                      style={{
                        width: "0px",
                        height: "10px",
                        border: "0.5px solid #707070",
                        marginTop: "6px",
                      }}
                    />
                    <span className="d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-2 pl-2 pr-2">
                      {`${modalState?.totalOrders || "0"} Orders`}
                    </span>
                    <span
                      style={{
                        width: "0px",
                        height: "10px",
                        border: "0.5px solid #707070",
                        marginTop: "6px",
                      }}
                    >
                      {" "}
                    </span>
                    <span className="d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-2 pl-2 pr-2">
                      {" "}
                      {`${modalState?.totalwishlisted || "0"} Wish`}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="h3 font-weight-normal text-accent mr-1">
                    ₹{modalState?.selling_price}
                  </span>
                </div>
                <div className="flex-start mb-3">
                  <div>
                    <strong>Tax : </strong>
                  </div>
                  <div>
                    <strong id="set-tax-amount" className="mx-2">
                      ₹{0}
                    </strong>
                  </div>
                </div>
                <form id="add-to-cart-form" className="mb-2">
                  {/* Quantity + Add to cart */}
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="product-description-label mt-2">
                        Quantity:
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="product-quantity d-flex align-items-center">
                        <div
                          className="input-group input-group--style-2 pr-3"
                          style={{ width: "160px" }}
                        >
                          <span className="input-group-btn">
                            <button
                              className="btn btn-number"
                              type="button"
                              data-type="minus"
                              data-field="quantity"
                              // disabled="disabled"
                              style={{ padding: "10px" }}
                              onClick={() => {
                                decreaseQuantity();
                              }}
                            >
                              -
                            </button>
                          </span>
                          <input
                            type="number"
                            name="quantity"
                            className="form-control input-number text-center cart-qty-field"
                            // placeholder={1}
                            // defaultValue={1}
                            // product-type="physical"
                            // min={1}
                            // max={1}
                            value={modalState?.quantity}
                            onChange={handleInputChange1}
                          />
                          <span className="input-group-btn">
                            <button
                              className="btn btn-number"
                              product-type="physical"
                              type="button"
                              data-type="plus"
                              data-field="quantity"
                              style={{ padding: "10px" }}
                              onClick={() => {
                                increaseQuantity();
                              }}
                            >
                              +
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters mt-2" id="chosen_price_div">
                    <div className="col-2">
                      <div className="product-description-label">
                        Total Price:
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="product-price">
                        <strong id="chosen_price">
                          ₹{modalState?.totalPrice}
                        </strong>
                      </div>
                    </div>
                    <div className="col-12"></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-secondary"
                      onclick="buy_now()"
                      type="button"
                      style={{ width: "37%", height: "45px" }}
                    >
                      Buy now
                    </button>
                    <button
                      className="btn btn--primary string-limit"
                      onclick="addToCart()"
                      type="button"
                      style={{
                        width: "37%",
                        height: "45px",
                        color: "#fff",
                        backgroundColor: "#3b71de",
                        borderColor: "#3b71de",
                      }}
                      disabled={modalState.quantity < 1}
                      onClick={(e) => {
                        if (!state.isUserLoggedIn) {
                          // alert("Please Login to continue");
                          navigate("/customer/auth/login");
                        } else {
                          apiHandleAddToCart(e);
                        }
                      }}
                    >
                      Add to cart
                    </button>
                    {/* <button
                      type="button"
                      onclick="addWishlist('3')"
                      className="btn btn-dark for-hover-bg string-limit"
                      style={{}}
                      onClick={(e) => {
                        if (!state.isUserLoggedIn) {
                          navigate("/customer/auth/login");
                        } else {
                          apiHandleWishList(e);
                        }
                      }}
                    >
                      <i
                        className={
                          modalState.isWishList
                            ? "fa fa-heart"
                            : "fa fa-heart-o mr-2"
                        }
                        aria-hidden="true"
                      />
                    </button> */}
                  </div>
                </form>
                {/* Product panels*/}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomerProducts;
