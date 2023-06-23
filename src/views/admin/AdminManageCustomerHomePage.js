import React, { useContext, useEffect, useState } from "react";
import productImage from "assets/productImage.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { Context } from "context/newContext";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
//
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//
import Select from "react-select";
import { defaultAPIErrorHandler } from "api/api";

function AdminManageCustomerHomePage() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);
  const [purchaseProductsList, setPurchaseProductsList] = useState([]);
  const [purchaseProductsOptionsList, setPurchaseProductsOptionsList] =
    useState([]);
  const [newsLetterList, setNewsLetterList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [resProductList, setResProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [mainState, setMainState] = useState({
    selected: {
      slider: [],
      banner: [],
      recommended_product: "",
      best_selling_products: [],
      featured_products: [],
      top_rated_products: [],
    },
  });

  const handleSelectedInputChange = (e, val) => {
    let name;
    let value;
    let checked;
    let files;
    let type;

    if (!!e?.target) {
      name = e?.target?.name;
      value = e?.target?.value;
      checked = e?.target?.checked;
      files = e?.target?.files;
      type = e?.target?.type;
    } else {
      name = e;
      value = val;
    }

    console.log(type, value);

    // radio,file,select-one,text,checkbox
    if (type == "file") {
      if (name === "pancard_image") {
        if (!e.target.files || !e.target.files.length) {
          return;
        }

        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files[0],
              [`${name}ImageURLObj`]: imageURLObj,
            },
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 1)].map((item) =>
            URL.createObjectURL(item)
          );

          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files[0],
              imageURLObj: imageURLObj,
            },
          }));

          window.alert("At Max 1 Images are allowed");
        }
      } else {
        const imageURLObj = [...e.target.files].map((item) =>
          URL.createObjectURL(item)
        );
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: e.target.files,
            [`${name}ImageURLObj`]: imageURLObj,
          },
        }));
      }
    } else if (type == "checkbox" || type == "radio") {
      // if (name === 's') {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: checked,
        },
      }));
      // }
    } else if (type === "select-multiple") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    } else {
      if (
        name === "GST_pincode" ||
        name === "agency_pincode" ||
        name === "pincode"
      ) {
        // 6 Digits
        const validNumberRegex = /^\d*$/;
        const validSixNumberRegex = /^\d{6}$/;
        console.log(2, validSixNumberRegex.test(value));
        console.log(3, validNumberRegex.test(value));
        !!validNumberRegex.test(value) &&
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: value.slice(0, 6),
            },
            selectedErrors: {
              ...prev.selectedErrors,
              [name]: !validSixNumberRegex.test(value.slice(0, 6))
                ? "Must be a Valid 6 digit Pincode"
                : "",
            },
          }));
      } else if (
        name === "phoneNum" ||
        name === "agency_phone_no" ||
        name === "mobile_number" ||
        name === "GST_PhoneNum" ||
        name === "GST_MobileNum"
      ) {
        // 10 Digits
        const validNumberRegex = /^\d*$/;
        const validTenNumberRegex = /^\d{10}$/;
        console.log(2, validTenNumberRegex.test(value));
        console.log(3, validNumberRegex.test(value));
        console.log(4, value);
        !!validNumberRegex.test(value) &&
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: value.slice(0, 10),
            },
            selectedErrors: {
              ...prev.selectedErrors,
              [name]: !validTenNumberRegex.test(value.slice(0, 10))
                ? "Must be a valid 10 digit Phone"
                : "",
            },
          }));
      } else if (
        name === "normalAnyDigitsNumber" ||
        name === "total_days" ||
        name === "total_nights"
      ) {
        const validNumberRegex = /^\d*$/;
        console.log(3, validNumberRegex.test(value));

        if (!!validNumberRegex.test(value)) {
          if (name === "total_days") {
            console.log(
              Math.max(+value, +mainState?.selected?.total_nights) <
              +mainState?.selected?.itinerie?.length
            );
            if (
              Math.max(
                +value,
                +mainState?.selected?.total_nights +
                (+value - +mainState?.selected?.total_days)
              ) < +mainState?.selected?.itinerie?.length
            ) {
              return alert("Please remove itinerie first.");
            } else {
              return setMainState((prev) => ({
                ...prev,
                selected: {
                  ...prev.selected,
                  [name]: value,
                  total_nights:
                    +mainState?.selected?.total_nights +
                      (+value - +mainState?.selected?.total_days) >
                      0
                      ? +mainState?.selected?.total_nights +
                      (+value - +mainState?.selected?.total_days)
                      : 0,
                },
                selectedErrors: {
                  ...prev.selectedErrors,
                  [name]: "",
                },
              }));
            }
          } else if (name === "total_nights") {
            if (
              +value === +mainState?.selected?.total_days ||
              +value === +mainState?.selected?.total_days + 1 ||
              +value === +mainState?.selected?.total_days - 1
            ) {
              if (
                Math.max(+value, +mainState?.selected?.total_days) <
                +mainState?.selected?.itinerie?.length
              ) {
                return alert("Please remove itinerie first.");
              } else {
                return setMainState((prev) => ({
                  ...prev,
                  selected: {
                    ...prev.selected,
                    [name]: value,
                  },
                  selectedErrors: {
                    ...prev.selectedErrors,
                    [name]: "",
                  },
                }));
              }
            } else {
              return alert("Value must be adjusted according to Total days");
            }
          } else {
            setMainState((prev) => ({
              ...prev,
              selected: {
                ...prev.selected,
                [name]: value,
              },
              selectedErrors: {
                ...prev.selectedErrors,
                [name]: "",
              },
            }));
          }
        }
      } else if (name === "email_address" || name === "GST_EmailID") {
        // EMAIL
        const validEmailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        console.log(1, validEmailRegex.test(value));

        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: value,
          },
          selectedErrors: {
            ...prev.selectedErrors,
            [name]: !validEmailRegex.test(value) ? "Must be a valid Email" : "",
          },
        }));
      } else {
        // TEXT
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: value,
          },
          selectedErrors: {
            ...prev.selectedErrors,
            [name]: !value ? "Invalid or Empty Value" : "",
          },
        }));
      }
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
        alert("Success");
      })
      .catch((error) => {
        // console.log(error);
        // alert("Something went wrong");
        defaultAPIErrorHandler(error)
        // setProductList((prev) => [
        //   ...productList.slice(0, index),
        //   { ...productList[index], product_status: !isChecked },
        //   ...productList.slice(index + 1),
        // ]);
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Subscribers" },
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

  const handleDeleteItem = (email, index) => {
    if (
      window.confirm(
        `Are you sure you want to delete: ${newsLetterList?.[index]?.email || ""
        }`
      )
    ) {
      const config = {
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/newsletter",
        params: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data);
          // alert("Blog Added Successfully");
          // navigate("/seller/dashboard", { replace: true });
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Cancel");
    }
  };

  const getHomeSettings = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/home/settings",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state?.adminToken,
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/admin/dashboard", { replace: true });
        setMainState(prev => ({
          ...prev,
          selected: {
            ...response.data.data,
            best_selling_products: response.data.data?.best_selling_products?.map((item) => ({
              value: item?._id,
              label: item?.product_id?.pname,
            })),
            // recommended_product: response.data.data?.recommended_products?.map((item) => ({
            //   value: item?._id,
            //   label: item?.pname,
            // })),
            recommended_product: {
              value: response.data.data?.recommended_product?._id,
              label: response.data.data?.recommended_product?.product_id?.pname,
            },
            top_rated_products: response.data.data?.top_rated_products?.map((item) => ({
              value: item?._id,
              label: item?.product_id?.pname,
            })),
            featured_products: response.data.data?.featured_products?.map((item) => ({
              value: item?._id,
              label: item?.product_id?.pname,
            })),
          }
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiGetProductsList = () => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_BASEURL +
        "/api/product/getstockandpricesproductlist",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setPurchaseProductsList((prev) => response.data.data);
        setPurchaseProductsOptionsList(
          response.data.data?.map((item) => ({
            value: item?._id,
            label: item?.Product?.[0]?.pname,
          }))
        );
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleUpdateCustomerHomePage = () => {
    const formData = new FormData();

    if (!!mainState.selected.best_selling_products?.length) {
      formData.append(
        "best_selling_products",
        JSON.stringify(
          mainState.selected.best_selling_products?.map((item) => item?.value)
        )
      );
    }
    // if (!!mainState.selected.recommended_product?.length) {
    //   formData.append(
    //     "recommended_product",
    //     JSON.stringify(
    //       mainState.selected.recommended_product?.map((item) => item?.value)
    //     )
    //   );
    // }
    formData.append(
      "recommended_product",
      JSON.stringify(mainState.selected.recommended_product)
    );
    if (!!mainState.selected.top_rated_products?.length) {
      formData.append(
        "top_rated_products",
        JSON.stringify(
          mainState.selected.top_rated_products?.map((item) => item?.value)
        )
      );
    }
    if (!!mainState.selected.featured_products?.length) {
      formData.append(
        "featured_products",
        JSON.stringify(
          mainState.selected.featured_products?.map((item) => item?.value)
        )
      );
    }

    if (!!mainState?.selected?.banner?.length) {
      [...mainState?.selected?.banner]?.map(item =>
        formData.append("banner", item)
      )
      // mainState?.selected?.banner?.map((item) => {
      //   formData.append("banner", item);
      // });
    }
    if (!!mainState?.selected?.slider?.length) {
      [...mainState?.selected?.slider]?.map(item =>
        formData.append("slider", item)
      )
      // mainState?.selected?.slider?.map((item) => {
      //   formData.append("slider", item);
      // });
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/home",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        alert("Updated HomePage Successfully")
        // setPurchaseProductsList((prev) => response.data.data);
        // setPurchaseProductsOptionsList(
        //   response.data.data?.map((item) => ({
        //     value: item?._id,
        //     label: item?.Product?.[0]?.pname,
        //   }))
        // );
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getHomeSettings();
    apiGetProductsList();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>{"Manage Home Page"}</h2>
                  </div>
                </div>
              </div>
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Select Banners (min 3)
                    </label>
                    <input
                      type="file"
                      multiple
                      name="banner"
                      className="form-control"
                      onChange={(e) => handleSelectedInputChange(e)}
                    // value={policyName}
                    />
                  </div>
                  <div className="row">
                    {!!mainState?.selected?.banner?.length &&
                      [...mainState?.selected?.banner].map((item, index) =>
                        <div className="col m-2">
                          <center>
                            <img
                              style={{ borderRadius: "10px", maxHeight: "200px" }}
                              id="viewer"
                              src={
                                mainState?.selected?.bannerImageURLObj?.[index] || mainState?.selected?.banner?.[index] ||
                                productImage
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = productImage;
                              }}
                              alt=""
                            />
                          </center>
                        </div>
                      )
                    }
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Select Slider
                    </label>
                    <input
                      type="file"
                      multiple
                      name="slider"
                      className="form-control"
                      onChange={(e) => handleSelectedInputChange(e)}
                    // value={policyName}
                    />
                  </div>
                  <div className="row">
                    {!!mainState?.selected?.slider?.length &&
                      [...mainState?.selected?.slider].map((item, index) =>
                        <div className="col m-2">
                          <center>
                            <img
                              style={{ borderRadius: "10px", maxHeight: "200px" }}
                              id="viewer"
                              src={
                                mainState?.selected?.sliderImageURLObj?.[index] || mainState?.selected?.slider?.[index] ||
                                productImage
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = productImage;
                              }}
                              alt=""
                            />
                          </center>
                        </div>
                      )
                    }
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Select Recommended Product
                    </label>
                    <Select
                      options={purchaseProductsOptionsList}
                      onChange={(e) => {
                        console.log(e);
                        handleSelectedInputChange("recommended_product", e);
                      }}
                      value={mainState?.selected?.recommended_product || []}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Select Best Selling Products
                    </label>
                    <Select
                      isMulti
                      options={purchaseProductsOptionsList}
                      onChange={(e) => {
                        console.log(e);
                        handleSelectedInputChange("best_selling_products", e);
                      }}
                      value={mainState?.selected?.best_selling_products || []}
                    // value={!!mainState?.selected?.best_selling_products?.length && mainState?.selected?.best_selling_products?.map(item => (purchaseProductsOptionsList?.filter(item2 => item?.filter(item2?._id === item)?.[0])))}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Select Top Rated Products
                    </label>
                    <Select
                      isMulti
                      options={purchaseProductsOptionsList}
                      onChange={(e) => {
                        console.log(e);
                        handleSelectedInputChange("top_rated_products", e);
                      }}
                      value={mainState?.selected?.top_rated_products || []}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Select Featured Products
                    </label>
                    <Select
                      isMulti
                      options={purchaseProductsOptionsList}
                      onChange={(e) => {
                        console.log(e);
                        handleSelectedInputChange("featured_products", e);
                      }}
                      value={mainState?.selected?.featured_products || []}
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        className="form-control btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUpdateCustomerHomePage();
                        }}
                      >
                        Submit
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

export default AdminManageCustomerHomePage;
