import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from "react";
import { Context } from "context/newContext";
import productImage from "assets/productImage.jpg";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SellerProductReturnList() {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [resProductList, setResProductList] = useState([]);
  const [search, setSearch] = useState("");
  //
  const [resDeliveryBoys, setResDeliveryBoys] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [productIdBoy, setProductIdBoy] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [boy, setBoy] = useState("");

  const handleChange = (event, productId) => {
    const newOption = event.target.value;
    setSelectedOptions(newOption);
    setProductIdBoy(productId);
    // Show alert for the specific product
    setModalShow(true);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    setProductList((prev) => [
      ...productList.slice(0, index),
      { ...productList[index], activeStatus: e.target.checked },
      ...productList.slice(index + 1),
    ]);

    // if (name === "pphoto") {
    //   setProductDetails((prev) => ({ ...prev, [name]: e.target.files[0] }));
    // } else {
    //   setProductDetails((prev) => ({ ...prev, [name]: e.target.value }));
    // }
  };

  function MyVerticallyCenteredModal(props) {
    const DelBoy = async () => {
      const token = localStorage.getItem("sellerToken");
      const res = await fetch(
        process.env.REACT_APP_BASEURL +
          `/api/order/asigndeliveryboy?oid=${productIdBoy}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            db_id: selectedOptions,
            in_which: "productreturn",
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      setBoy(data);
      setModalShow(false);
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Are You Want To Sure Selete This Delivery Boy</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={DelBoy}>Yes</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleExport = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/export",
      params: { queryType: "Seller_ProductReturns" },
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
        defaultAPIErrorHandler(error);
      });
  };

  const getAllDeliveryBoysAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/deliveryboy",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        // console.log(response.data);
        setResDeliveryBoys(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/productReturn/productreturn",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
        // Authorization:
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2VmM2NlZTliMmI5M2FmYzZlYzA1YSIsImVtYWlsX2FkZHJlc3MiOiJhc0BnbWFpbC5jb20iLCJpYXQiOjE2NDkwNTc2ODgsImV4cCI6MTY4MDU5MzY4OH0.HzFBGMqpVJsvUSdGRbnLH-qFItEcWXc4Wdgn_hlaciI",
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/seller/dashboard", { replace: true });
        setProductList(
          response.data.data.map((item) => ({
            ...item,
          }))
        );
        setResProductList(
          response.data.data.map((item) => ({
            ...item,
          }))
        );
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  }, []);

  useEffect(() => {
    getAllDeliveryBoysAPI();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Product Returns
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 mb-1 col-md-4">
                    <h5>Product Return Table ({productList.length})</h5>
                  </div>
                  <div className="col-12 mb-1 col-md-5">
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
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setProductList(
                              searchFor(e.target.value, resProductList)
                            );
                          }}
                          value={search}
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
                  {/* <div className="col-12 col-md-3">
                    <Link
                      to="/seller/product/add-new"
                      className="btn btn-primary float-right"
                    >
                      <i className="tio-add-circle" />
                      <span className="text">Add new product</span>
                    </Link>
                  </div> */}
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
                        <th>
                          {/* Verify status */}
                          Product Photo
                        </th>
                        <th>Product Name</th>
                        <th>
                          Order Id
                          {/* Purchase price */}
                        </th>
                        {/* <th>Delivery Status</th> */}
                        <th>PickUp Status</th>
                        <th>Payment Status</th>
                        <th>Product Qty</th>
                        <th>Assigned DeliveryBoy</th>
                        {/* <th>Active Status</th>
                        <th style={{ width: "5px" }} className="text-center">
                          Action
                        </th> */}
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
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                      {!!productList.length &&
                        productList.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td
                              style={{
                                width: "2vw",
                                textAlign: "center",
                              }}
                            >
                              {/* <label
                                  className={`badge badge-${
                                    item.verifyStatus === "Approved"
                                      ? "success"
                                      : item.verifyStatus === "Denied"
                                      ? "danger"
                                      : "warning"
                                  }`}
                                >
                                  {item.verifyStatus}
                                </label> */}
                              <img
                                src={item?.pphoto || productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.src = productImage;
                                }}
                                style={{ width: "30px", height: "30px" }}
                                alt=""
                              ></img>
                            </td>
                            <td>
                              <Link
                                to={`/seller/product/view/${item?.pid}`}
                                state={item}
                              >
                                {item.pname.slice(0, 20)}
                              </Link>
                            </td>
                            <td>{item.oid}</td>
                            <td className="text-capitalize">
                              <span
                                // className="badge badge-soft-danger"
                                className={`badge badge-soft-${
                                  item.pickup_status === "delivered"
                                    ? "success"
                                    : "danger"
                                }`}
                              >
                                <span
                                  // className="legend-indicator bg-danger"
                                  className={`legend-indicator bg-${
                                    item.pickup_status === "delivered"
                                      ? "success"
                                      : "danger"
                                  }`}
                                  style={{
                                    marginLeft: 0,
                                    marginRight: ".4375rem",
                                  }}
                                />
                                {item.pickup_status}
                              </span>
                            </td>
                            <td className="text-capitalize">
                              <span
                                // className="badge badge-soft-danger"
                                className={`badge badge-soft-${
                                  item.payment_status === "paid"
                                    ? "success"
                                    : "danger"
                                }`}
                              >
                                <span
                                  // className="legend-indicator bg-danger"
                                  className={`legend-indicator bg-${
                                    item.payment_status === "paid"
                                      ? "success"
                                      : "danger"
                                  }`}
                                  style={{
                                    marginLeft: 0,
                                    marginRight: ".4375rem",
                                  }}
                                />
                                {item.payment_status}
                              </span>
                            </td>
                            <td>{item.qty}</td>
                            <td>
                              <select
                                className="form-control form-control-input"
                                name="db_selected"
                                value={
                                  selectedOptions[item.pid] || item.fullname
                                }
                                onChange={(e) => {
                                  handleChange(e, item.oid);
                                }}
                              >
                                <option value="" selected disabled>
                                  ---Select---
                                </option>
                                {resDeliveryBoys?.length &&
                                  resDeliveryBoys.map((item2, index) => (
                                    <option
                                      key={index}
                                      value={item2?._id}
                                      selected={
                                        item2?._id === selectedOptions[item.pid]
                                      }
                                    >
                                      {item2?.fullname}
                                    </option>
                                  ))}
                              </select>
                            </td>
                            {/* <td>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  className="status"
                                  id={13}
                                  // defaultChecked
                                  checked={item.activeStatus}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                <span className="slider round" />
                              </label>
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary btn-sm"
                                to={`/seller/product/edit/${index + 1}`}
                                state={item}
                              >
                                <i className="tio-edit" />
                                Edit
                              </Link>
                              <Link
                                className="btn btn-danger btn-sm"
                                to="#"
                                onclick="form_alert('product-13','Want to delete this item ?')"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `product-${index + 1}`,
                                      "Want to delete this item ?"
                                    )
                                  ) {
                                    const newArr = productList.slice();
                                    newArr.splice(index, 1);

                                    setProductList(newArr);
                                    console.log(index, newArr);
                                  } else {
                                    console.log("Dont Delete");
                                  }
                                }}
                              >
                                <i className="tio-add-to-trash" /> Delete
                              </Link>
                              <form
                                id="product-13"
                              >
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="9MwZveTgMo0uPqMjzJMJ6iptaS1V3eI3RwcrHfin"
                                />
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />
                              </form>
                            </td> */}
                          </tr>
                        ))}
                      {/* <tr>
                          <th scope="row">1</th>
                          <td>
                            <a href="/seller/product/view/11">
                              zzz
                            </a>
                          </td>
                          <td>₹11.0</td>
                          <td>₹111.0</td>
                          <td>
                            <label className="badge badge-danger">Denied</label>
                          </td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" className="status" id={11} />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <a
                              className="btn btn-info btn-sm"
                              title="View"
                              href="/seller/product/view/11"
                            >
                              <i className="tio-visible" />
                            </a>
                            <a
                              className="btn btn-primary btn-sm"
                              title="Edit"
                              href="/seller/product/edit/11"
                            >
                              <i className="tio-edit" />
                            </a>
                            <a
                              className="btn btn-danger btn-sm"
                              href="javascript:"
                              title="Delete"
                              onclick="form_alert('product-11','Want to delete this item ?')"
                            >
                              <i className="tio-add-to-trash" />
                            </a>
                            <form
                              id="product-11"
                            >
                              <input
                                type="hidden"
                                name="_token"
                                defaultValue="XxajdEIBnyW7pN3OD42T3A9fKYsFsWhoq5fKjJgg"
                              />{" "}
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="delete"
                              />{" "}
                            </form>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>
                            <a href="/seller/product/view/10">
                              test seller product 2
                            </a>
                          </td>
                          <td>₹400.0</td>
                          <td>₹600.0</td>
                          <td>
                            <label className="badge badge-warning">
                              New Request
                            </label>
                          </td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" className="status" id={10} />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <a
                              className="btn btn-info btn-sm"
                              title="View"
                              href="/seller/product/view/10"
                            >
                              <i className="tio-visible" />
                            </a>
                            <a
                              className="btn btn-primary btn-sm"
                              title="Edit"
                              href="/seller/product/edit/10"
                            >
                              <i className="tio-edit" />
                            </a>
                            <a
                              className="btn btn-danger btn-sm"
                              href="javascript:"
                              title="Delete"
                              onclick="form_alert('product-10','Want to delete this item ?')"
                            >
                              <i className="tio-add-to-trash" />
                            </a>
                            <form
                              id="product-10"
                            >
                              <input
                                type="hidden"
                                name="_token"
                                defaultValue="XxajdEIBnyW7pN3OD42T3A9fKYsFsWhoq5fKjJgg"
                              />{" "}
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="delete"
                              />{" "}
                            </form>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>
                            <a href="/seller/product/view/9">
                              test seller product
                            </a>
                          </td>
                          <td>₹400.0</td>
                          <td>₹500.0</td>
                          <td>
                            <label className="badge badge-success">
                              Approved
                            </label>
                          </td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" className="status" id={9} />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <a
                              className="btn btn-info btn-sm"
                              title="View"
                              href="/seller/product/view/9"
                            >
                              <i className="tio-visible" />
                            </a>
                            <a
                              className="btn btn-primary btn-sm"
                              title="Edit"
                              href="/seller/product/edit/9"
                            >
                              <i className="tio-edit" />
                            </a>
                            <a
                              className="btn btn-danger btn-sm"
                              href="javascript:"
                              title="Delete"
                              onclick="form_alert('product-9','Want to delete this item ?')"
                            >
                              <i className="tio-add-to-trash" />
                            </a>
                            <form
                              id="product-9"
                            >
                              <input
                                type="hidden"
                                name="_token"
                                defaultValue="XxajdEIBnyW7pN3OD42T3A9fKYsFsWhoq5fKjJgg"
                              />{" "}
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="delete"
                              />{" "}
                            </form>
                          </td>
                        </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!productList?.length && (
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

export default SellerProductReturnList;
