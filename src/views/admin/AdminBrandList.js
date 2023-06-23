import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyBrandLogo from "assets/dummyBrandLogo.png";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminBrandList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);

  const initialState = {
    resAllBrands: [],
    allBrands: [],
    selected: {
      brand_name: "",
      brand_photo: "",
      // sequence: "",
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

    if (name === "brand_photo") {
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
        allBrands: searchFor(value, mainState.resAllBrands),
      }));
    } else {
      const validNumberRegex = /^[a-zA-Z0-9 ]+$/;
      console.log(3, validNumberRegex.test(value));
      if (validNumberRegex.test(value)) {
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: value,
          },
        }));
      } else if (value === "") {
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: value,
          },
        }));
      }
    }
  };

  const apiGetAllBrands = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/brand",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllBrands: response.data.data,
          allBrands: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleAddBrand = (e) => {
    e.preventDefault();

    if (!mainState.selected.brand_name) {
      alert("brand name can't be empty");
      return;
      // } else if (!mainState.selected.sequence) {
      //   alert("sequence can't be empty");
      //   return;
    } else if (!mainState.selected.brand_photo instanceof FileList) {
      alert("brand photo is Invalid File");
      return;
    }
    console.log(mainState.selected);

    const formData = new FormData();
    formData.append("brand_name", mainState.selected.brand_name);
    // formData.append("sequence", mainState.selected.sequence);
    // formData.append("gst", "123456");
    formData.append("brand_photo", mainState.selected.brand_photo?.[0]);

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/brand",
      headers: {
        // "Content-Type": "application/json",
        Authorization: state.adminToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            brand_name: "",
            brand_photo: null,
            brand_photoimageURLObj: null,
          },
        }));
        alert("Brand Added");
        apiGetAllBrands();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  const apiToggleStatus = (isChecked, itemId, index) => {
    // console.log(isChecked,itemId,index);
    // return;
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/brand/status",
      params: {
        _id: itemId,
      },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        // status: isChecked ? "active" : "deactive",
        status: !!isChecked,
      }),
    })
      .then((response) => {
        console.log(response.data);
        apiGetAllBrands();
        // alert("Status Updated");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteBrand = (e, index, brandId) => {
    if (
      window.confirm(
        `Are you sure you want to delete Brand :- ${mainState?.allBrands?.[index]?.brand_name}`,
      )
    ) {
      // --------- STATIC CATEGORY REMOVAL
      // const newCategories = mainState.resAllBrands.slice();
      // newCategories.splice(index, 1);

      // setMainState((prev) => ({
      //   ...prev,
      //   resAllBrands: newCategories,
      // }));
      // console.log(index, newCategories);
      // --------- STATIC CATEGORY REMOVAL

      axios({
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/brand",
        params: {
          _id: brandId,
        },
        headers: {
          Authorization: state.adminToken,
        },
      })
        .then(function (response) {
          console.log(response.data);
          apiGetAllBrands();
          alert("Deleted Successfully");
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
      params: { queryType: "Admin_Brands" },
      headers: {
        Authorization: state.adminToken,
      },
      responseType: "blob",
    })
      .then((response) => {
        console.log("Successfully Exported");
        console.log(response.headers?.filename);
        console.log(response.headers["content-disposition"]);
        console.log(response.headers);

        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // link.target = "_blank"
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "unknown";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          console.log(fileNameMatch)
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
          console.log(fileName)
        }
        link.setAttribute("download", fileName);
        // link.setAttribute("download", "Admin_BrandList.xlsx");

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
    apiGetAllBrands();
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
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Brand
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Brand Form</div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <form>
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
                    <div className="col-md-6">
                      <div className="form-group  lang_form" id="en-form">
                        <label htmlFor="name">Name (EN)</label>
                        <input
                          type="text"
                          name="brand_name"
                          className="form-control"
                          // placeholder="Ex : LUX"
                          onChange={handleInputChange}
                          value={mainState.selected.brand_name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Brand logo</label>
                        <span className="badge badge-soft-danger">
                          ( Ratio 1:1 )
                        </span>
                        <div
                          className="custom-file"
                          style={{ textAlign: "left" }}
                          required
                        >
                          <input
                            type="file"
                            name="brand_photo"
                            id="customFileUpload"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            onChange={handleInputChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileUpload"
                          >
                            Choose File
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <center>
                        <img
                          style={{ borderRadius: "10px", maxHeight: "200px" }}
                          id="viewer"
                          src={
                            mainState?.selected?.brand_photoimageURLObj ||
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
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={handleAddBrand}
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 col-sm-6 col-md-6">
                    <h5>
                      Brand table{" "}
                      <span style={{ color: "red" }}>
                        ({mainState?.allBrands?.length || "0"})
                      </span>
                    </h5>
                  </div>
                  <div
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
                            onchange="location.href='https://6valley.6amtech.com/admin/product/stock-limit-list/in_house/?sort_oqrderQty='+this.value"
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
                            data-action="https://6valley.6amtech.com/admin/orders/list/pending"
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
                <div className="table-responsive">
                  <table
                    style={{ textAlign: "left" }}
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ width: "100px" }}>
                          All Brands ID
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                        <th
                          scope="col"
                          style={{ width: "100px" }}
                          className="text-center"
                        >
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
                      {!!mainState?.allBrands?.length &&
                        mainState.allBrands.map((item, index) => (
                          <tr key={item?._id}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item?.brand_name || "..."}</td>
                            <td>
                              <img
                                style={{ width: "60px", height: "60px" }}
                                src={item?.brand_photo || productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                              />
                            </td>
                            <td>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  className="status"
                                  name="status"
                                  checked={!!item?.status}
                                  // checked={item?.status === "active" ? true : false}
                                  // onClick={(e) => handleInputChange(e, index)}
                                  onChange={e => { apiToggleStatus(e.target.checked, item?._id) }}
                                />
                                <span className="slider round" />
                              </label>
                              {/* {`${item?.status}`} */}
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary btn-sm"
                                style={{ cursor: "pointer" }}
                                to={"/admin/brand/edit/" + item._id}
                                state={item}
                              >
                                <i className="tio-edit" /> Edit
                              </Link>
                              <Link
                                to=""
                                className="btn btn-danger btn-sm delete"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleDeleteBrand(e, index, item._id)
                                }
                              >
                                <i className="tio-add-to-trash" /> Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!mainState?.allBrands?.length && (
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

export default AdminBrandList;
