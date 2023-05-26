import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";
import { toast } from "react-toastify";
import { ISOToIST } from "utils/DateTime";

function AdminDealList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllCategories: [],
    allCategories: [],
    selected: {
      title: "",
      start_date: "",
      end_date: "",
      banner: null,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "category_icon" || name === 'banner') {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files,
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
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
              [name]: e.target.files?.slice(0, 1),
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));

          window.alert("At Max 1 Images are allowed");
        }
      }
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        allCategories: searchFor(value, mainState.resAllCategories),
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

  const apiGetAllFlashDeals = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal/displayadmin",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllCategories: response.data.data,
          allCategories: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const apiUpdatePublish = (itemId) => {
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal/is_public",
      params: { _id: itemId },
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        apiGetAllFlashDeals()
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAddFlashDealAPI = (e) => {
    e.preventDefault();

    if (!mainState.selected.title) {
      alert("title can't be empty");
      return;
    } else if (!mainState.selected.start_date) {
      alert("start_date can't be empty");
      return;
    } else if (!mainState.selected.end_date) {
      alert("end_date can't be empty");
      return;
    } else if (!(mainState.selected.banner instanceof FileList)) {
      alert("banner is Invalid File");
      return;
    }
    console.log(mainState.selected);

    const formData = new FormData();
    formData.append("title", mainState.selected.title);
    formData.append("start_date", mainState.selected.start_date);
    formData.append("end_date", mainState.selected.end_date);
    if (mainState?.selected?.banner?.length) {
      [...mainState?.selected?.banner]?.map(item => {
        formData.append("banner", item);
      })
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/flash_deal",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        // toast.info("FlashDeal Added");
        alert("Flashdeal Added Successfully")
        apiGetAllFlashDeals();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteFlashDealAPI = (e, index, catId) => {
    if (window.confirm(`product-${index + 1}`, "Want to delete this item ?")) {
      // --------- STATIC CATEGORY REMOVAL
      // const newCategories = mainState.resAllCategories.slice();
      // newCategories.splice(index, 1);

      // setMainState((prev) => ({
      //   ...prev,
      //   resAllCategories: newCategories,
      // }));
      // console.log(index, newCategories);
      // --------- STATIC CATEGORY REMOVAL

      axios({
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/category/" + catId,
        headers: {
          Authorization: state.adminToken,
        },
      })
        .then(function (response) {
          console.log(response.data);
          apiGetAllFlashDeals();
        })
        .catch(function (error) {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Dont Delete");
    }
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_Categories" },
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

  useEffect(() => {
    apiGetAllFlashDeals();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row">
          <div class="mb-3">
            <h2 class="ml-2 h1 mb-0 text-capitalize d-flex gap-2">
              {/* <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/flash_deal.png" alt="" /> */}
              Flash deals
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
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
                  <div className="col-12 col-md-4">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Title (EN)
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={handleInputChange}
                        value={mainState?.selected?.title}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        Start Date
                      </label>
                      <input type="date" className="form-control"
                        name="start_date"
                        value={mainState?.selected?.start_date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        End Date
                      </label>
                      <input type="date" className="form-control"
                        name="end_date"
                        value={mainState?.selected?.end_date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4 from_part_2">
                    <label>Image</label>
                    <small style={{ color: "red" }}>* ( Ratio 3:1 )</small>
                    <div className="custom-file" style={{ textAlign: "left" }}>
                      <input
                        type="file"
                        name="banner"
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
                            width: "20%",
                            border: "1px solid",
                            borderRadius: "10px",
                          }}
                          src={
                            mainState?.selected?.bannerimageURLObj ||
                            productImage
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = productImage;
                          }}
                          id="viewer"
                          alt="image"
                        />
                      </center>
                    </div>
                  </div>
                </div>
                <hr />
                <button onClick={handleAddFlashDealAPI} className="btn btn-primary">
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
                  <div className="col-12 col-sm-6 col-md-6">
                    <h5>
                      Flash Deal Table
                      <span style={{ color: "red" }}>
                        ({mainState?.allCategories?.length || "0"})
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
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Active Products</th>
                        {/* <th>Slug</th> */}
                        <th>Publish</th>
                        {/* <th>Priority</th> */}
                        {/* <th>Home status</th> */}
                        <th className="text-center">
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
                      {!!mainState?.allCategories?.length &&
                        mainState.allCategories.map((item, index) => (
                          <tr>
                            <td className="text-center">
                              {/* {item?._id || "..."} */}
                              {index + 1}
                            </td>
                            <td>{item?.title}</td>
                            <td>
                              {ISOToIST(item?.start_date)} - {ISOToIST(item?.end_date)}
                            </td>
                            <td>{item?.status}</td>
                            <td>{item?.products?.length || 0}</td>
                            <td>
                              <label className="switch switch-status">
                                <input
                                  type="checkbox"
                                  className="status"
                                  name="is_publish"
                                  checked={
                                    // item?.is_publish === "active" ? true : false
                                    !!item?.is_publish
                                  }
                                  onChange={(e) => {
                                    apiUpdatePublish(item?._id)
                                  }}
                                />
                                <span className="slider round" />
                              </label>
                            </td>
                            <td>
                              <Link to={"/admin/deal/addproduct/" + item?._id}
                                state={item}
                                className="h-30 m-1 gap-2 align-items-center btn btn-soft-info btn-sm border-info btn btn-primary btn-sm" href="https://6valley.6amtech.com/admin/deal/add-product/6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" class="svg replaced-svg">
                                  <path d="M9 3.9375H5.0625V0H3.9375V3.9375H0V5.0625H3.9375V9H5.0625V5.0625H9V3.9375Z" fill="#00A3AD"></path>
                                </svg>
                                Add Product
                              </Link>
                              <Link
                                className="btn btn-primary btn-sm edit"
                                style={{ cursor: "pointer" }}
                                to={"/admin/deal/update/" + item?._id}
                                state={item}
                              >
                                <i className="tio-edit" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.allCategories?.length && (
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

export default AdminDealList;
