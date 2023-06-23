import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import dummyHomeBanner2 from "assets/dummyHomeBanner2.png";
import ClipLoader from "react-spinners/ClipLoader";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function SellerDealList() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  //

  const initialState = {
    resDealList: [],
    dealList: [],
    selected: {
      name: "",
      description: "",
      type: "",
      photo: null,
    },
    options: [
      // {
      //   id: "",
      //   name: "Default",
      //   value: "default",
      // },
      {
        id: "",
        name: "Lightning Deal",
        value: "lightning_deal",
      },
      {
        id: "",
        name: "Best Deal",
        value: "best_deal",
      },
      {
        id: "",
        name: "Deal of the day",
        value: "deal_of_the_day",
      },
    ],
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "photo") {
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
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        dealList: searchFor(value, mainState.resDealList),
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    }
  };

  const handleAddDeal = () => {
    if (!mainState.selected.name) {
      alert("name can't be empty");
      return;
    } else if (!mainState.selected.description) {
      alert("description can't be empty");
      return;
    } else if (!mainState.selected.type) {
      alert("type can't be empty");
      return;
    } else if (!(mainState.selected.photo instanceof FileList)) {
      // } else if (!(mainState.selected.photo instanceof File)) {
      alert("photo is Invalid File");
      return;
    }
    // console.log(1,mainState.selected.photo instanceof File);
    // console.log(2,!(mainState.selected.photo instanceof File));

    const formData = new FormData();
    formData.append("name", mainState.selected.name);
    formData.append("description", mainState.selected.description);
    formData.append("type", mainState.selected.type);
    formData.append("photo", mainState.selected.photo?.[0]);

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/deal",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
        // Authorization: state.adminToken,
        // Authorization: state.userToken,
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({ ...prev, selected: {} }));
        alert("Deal Added Successfully");
        getDealListAPI();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteDeal = (dealId, index) => {
    if (
      window.confirm(
        `Are you sure you want to delete deal : ${
          mainState?.dealList?.[index]?.name || ""
        }`
      )
    ) {
      // --------- STATIC CATEGORY REMOVAL
      // const newCategories = mainState.resDealList.slice();
      // newCategories.splice(index, 1);

      // setMainState((prev) => ({
      //   ...prev,
      //   resDealList: newCategories,
      // }));
      // console.log(index, newCategories);
      // --------- STATIC CATEGORY REMOVAL

      axios({
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/deal",
        params: {
          _id: dealId,
        },
        headers: {
          Authorization: state.adminToken,
        },
      })
        .then(function (response) {
          console.log(response.data);
          getDealListAPI();
        })
        .catch(function (error) {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Dont Delete");
    }
  };

  const handleFilter = (field) => {
    console.log(2, field);
    if (field === "default") {
      setMainState((prev) => ({
        ...prev,
        dealList: prev?.resDealList,
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        dealList: prev?.resDealList?.filter((item) => item?.type === field),
      }));
    }
  };

  const getDealListAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/deal",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resDealList: response.data.data,
          dealList: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Deals" },
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
    getDealListAPI();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Deals
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Deals form</div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a
                      className="nav-link lang_link active"
                      href="#"
                      id="en-link"
                    >
                      english(EN)
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder=""
                        onChange={handleInputChange}
                        value={mainState?.selected?.name || ""}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-5">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder=""
                        onChange={handleInputChange}
                        value={mainState?.selected?.description || ""}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        Type
                        <span>
                          <i
                            className="m-1 tio-info-outined"
                            title="The lowest number will get the highest priority"
                          />
                        </span>
                      </label>
                      <select
                        className="form-control"
                        name="type"
                        onChange={handleInputChange}
                        value={mainState?.selected?.type || ""}
                      >
                        <option value="" selected disabled>
                          ---Select---
                        </option>
                        {mainState?.options?.length &&
                          mainState?.options?.map((item) => (
                            <option value={item?.value}>{item?.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 from_part_2">
                    <label>Image</label>
                    <small style={{ color: "red" }}>* ( Ratio 9:16 )</small>
                    <div className="custom-file" style={{ textAlign: "left" }}>
                      <input
                        type="file"
                        name="photo"
                        id="customFileEg1"
                        className="custom-file-input"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        onChange={handleInputChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileEg1"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>
                  <div className="col-12 from_part_2">
                    <div className="form-group">
                      <hr />
                      <center>
                        <img
                          style={{
                            maxWidth: "80vw",
                            maxHeight: "30vh",
                            aspectRatio: "16/9",
                            border: "1px solid",
                            borderRadius: "10px",
                          }}
                          id="viewer"
                          // src="https:///public/assets/back-end/img/900x400/img1.jpg"
                          src={
                            mainState.selected.photoImageURLObj ||
                            mainState.selected.photo ||
                            "/assets/back-end/img/900x400/img1.jpg"
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                              "/assets/back-end/img/900x400/img1.jpg";
                          }}
                          alt="image"
                        />
                      </center>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  className="btn btn-primary"
                  // onClick={handleAddCategory}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddDeal();
                  }}
                >
                  Submit
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
                  <div className="col-12 col-md-12 col-lg-4">
                    <h5>Deals table (1)</h5>
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
                          placeholder="Search Product Name"
                          aria-label="Search orders"
                        />
                        <input type="hidden" defaultValue name="status" />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 mt-1 col-md-6 col-lg-3">
                    <select name="qty_ordr_sort" className="form-control">
                      <option value="default">Default sort</option>
                      <option value="quantity_asc">
                        Quantity sort by (low to high)
                      </option>
                      <option value="quantity_desc">
                        Quantity sort by (high to low)
                      </option>
                      <option value="order_asc">
                        Order sort by (low to high)
                      </option>
                      <option value="order_desc">
                        Order sort by (high to low)
                      </option>
                    </select>
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
                        <div className="col-12 col-sm-4 mt-2 mt-sm-0">
                          <select
                            name="qty_ordr_sort"
                            className="form-control"
                            onChange={(e) => handleFilter(e.target.value)}
                          >
                            <option value="default" disabled>
                              ---Default Filter---
                            </option>
                            {mainState?.options?.length &&
                              mainState?.options.map((item) => (
                                <option value={item?.value || ""}>
                                  {item?.name || ""}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-12 col-sm-2 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => e.preventDefault()}
                            // type="submit"
                            className="btn btn-primary float-right float-sm-none"
                            onclick="formUrlChange(this)"
                            data-action="https:///admin/orders/list/pending"
                          >
                            Filter
                          </button>
                        </div>
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
                        {/* <div className="col-12 col-sm-4 mt-2 mt-sm-0  ">
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="btn btn-primary float-right float-sm-none"
                          >
                            Add Deal
                          </button>
                        </div> */}
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
                        {/* <th style={{ width: "100px" }}>Category ID</th> */}
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Type</th>
                        {/* <th>Slug</th> */}
                        {/* <th>Priority</th> */}
                        {/* <th>Home status</th> */}
                        <th>Action</th>
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
                      {!!mainState?.dealList?.length &&
                        mainState.dealList.map((item, index) => (
                          <tr>
                            {/* <td className="text-center">
                                {item?._id || "..."}
                              </td> */}
                            <td
                              style={{
                                width: "50%",
                              }}
                            >
                              <img
                                width={"80%"}
                                style={{
                                  maxWidth: "400px",
                                  maxHeight: "300px",
                                }}
                                src={
                                  item?.image ||
                                  "/assets/back-end/img/900x400/img1.jpg"
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src =
                                    "/assets/back-end/img/900x400/img1.jpg";
                                }}
                              />
                            </td>
                            <td>{item?.name || "..."}</td>
                            <td>{item?.type || "..."}</td>
                            {/* <td>{item?.slug || "..."}</td> */}
                            {/* <td>{item?.type || "..."}</td> */}
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
                              <Link
                                className="btn btn-primary btn-sm edit mr-1"
                                style={{ cursor: "pointer" }}
                                to={"/seller/deal/edit/" + item._id}
                                state={item}
                              >
                                <i className="tio-edit" />
                                Edit
                              </Link>
                              <Link
                                to=""
                                className="btn btn-danger btn-sm delete"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteDeal(item._id, index);
                                }}
                              >
                                <i className="tio-add-to-trash" />
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.dealList?.length && (
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

export default SellerDealList;
