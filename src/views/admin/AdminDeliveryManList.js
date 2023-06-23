import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import { defaultAPIErrorHandler } from "api/api";

function AdminDeliveryManList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);
  const initialState = {
    resAllDeliveryBoys: [],
    allDeliveryBoys: [],
    selected: {},
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "status") {
      // setMainState((prev) => ({
      //   ...prev,
      //   allDeliveryBoys: [
      //     ...prev.allDeliveryBoys.slice(0, index),
      //     {
      //       ...prev.allDeliveryBoys[index],
      //       status: e.target.checked ? "active" : "deactive",
      //     },
      //     ...prev.allDeliveryBoys.slice(index + 1),
      //   ],
      // }));

      apiToggleDeliveryBoyActiveStatus(
        e.target.checked,
        mainState.allDeliveryBoys[index]._id,
        index
      );
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        allDeliveryBoys: searchFor(value, prev.resAllDeliveryBoys),
      }));
    } else {
    }
  };

  const apiToggleDeliveryBoyActiveStatus = (
    isChecked,
    deliveryBoyId,
    index
  ) => {
    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/deliveryboy/statuschenge",
      params: {
        _id: deliveryBoyId,
      },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: isChecked ? "active" : "deactive",
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Delivery Boy Status Updated");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
        // console.log(error);
        // setMainState((prev) => ({
        //   ...prev,
        //   resAllDeliveryBoys: [
        //     ...prev.resAllDeliveryBoys.slice(0, index),
        //     {
        //       ...prev.resAllDeliveryBoys[index],
        //       status: !isChecked ? "active" : "deactive",
        //     },
        //     ...prev.resAllDeliveryBoys.slice(index + 1),
        //   ],
        //   allDeliveryBoys: [
        //     ...prev.allDeliveryBoys.slice(0, index),
        //     {
        //       ...prev.allDeliveryBoys[index],
        //       status: !isChecked ? "active" : "deactive",
        //     },
        //     ...prev.allDeliveryBoys.slice(index + 1),
        //   ],
        // }));
        // alert("Something went wrong");
      });
  };

  const apiGetAllDeliveryBoy = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/deliveryboy",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllDeliveryBoys: response.data.data,
          allDeliveryBoys: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleDeleteDeliveryBoy = (db_id) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "/api/deliveryboy",
      params: { _id: db_id },
      headers: {
        Authorization: state.adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        status: "deactive",
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Success");
        apiGetAllDeliveryBoy();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Admin_DeliveryBoys" },
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
    apiGetAllDeliveryBoy();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">
                <i className="tio-filter-list" />
                Deliveryman List ( {mainState?.allDeliveryBoys?.length} )
              </h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-header">
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-12 mb-1 col-md-4">
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
                          placeholder="Search"
                          aria-label="Search"
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
                  <div className="col-12 col-md-8 text-right">
                    <Link
                      to="/admin/delivery-man/add"
                      className="btn btn-primary pull-right"
                    >
                      <i className="tio-add-circle" /> Add Deliveryman
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
              <div
                className="table-responsive datatable-custom"
                style={{ maxHeight: "50vh", overflowY: "scroll" }}
              >
                <table
                  className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  style={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th style={{ width: "30%" }}>Name</th>
                      <th style={{ width: "25%" }}>Image</th>
                      <th>Gender</th>
                      <th>DOB</th>
                      <th>City</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
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
                    {!!mainState?.allDeliveryBoys?.length &&
                      mainState.allDeliveryBoys.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <span className="d-block font-size-sm text-body">
                              {item?.fullname}
                            </span>
                          </td>
                          <td>
                            <div
                              style={{
                                overflowX: "hidden",
                                overflowY: "hidden",
                              }}
                            >
                              <img
                                width={60}
                                style={{
                                  borderRadius: "50%",
                                  height: "60px",
                                  width: "60px",
                                }}
                                src={item?.db_photo || productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                              />
                            </div>
                          </td>
                          <td>{item?.gender}</td>
                          <td>{item?.dob}</td>
                          <td>{item?.city}</td>
                          <td>{item?.users_data?.[0]?.contect_no}</td>
                          <td>{item?.users_data?.[0]?.email_address}</td>
                          <td>
                            <label className="switch switch-status">
                              <input
                                type="checkbox"
                                className="status"
                                name="status"
                                id={2}
                                checked={
                                  item?.status === "active" ? true : false
                                }
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="tio-settings" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to="/admin/delivery-man/edit/2"
                                  state={item}
                                >
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to=""
                                  onclick="form_alert('delivery-man-2','Want to remove this information ?')"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Are you sure you want to delete ${item.fullname}`
                                      )
                                    ) {
                                      handleDeleteDeliveryBoy(item._id);
                                    }
                                  }}
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!mainState?.allDeliveryBoys?.length && (
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

export default AdminDeliveryManList;
