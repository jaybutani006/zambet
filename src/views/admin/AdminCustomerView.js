import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";

function AdminCustomerView() {
  const location = useLocation();

  const [state, dispatch] = useContext(Context)

  const itemId = location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1);

  const [mainState, setMainState] = useState({
    ...location?.state,
    selected: {},
    resAllUserOrders: location?.state?.order_master,
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        order_master: searchFor(value, mainState.resAllUserOrders),
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

  const downloadInvoice = (item) => {
    console.log(mainState)
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/order/downloadInvoice",
      params: {
        // orderdetail_id: orderdetail_id,
        order_id: item?.order_detail?.[0]?.oid
      },
      headers: {
        Authorization: state.adminToken,
      },
      responseType: "blob",
    })
      .then((response) => {
        console.log("Successfully Exported");
        console.log(response.headers);
        // console.log(response.headers?.filename);
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        console.log(contentDisposition)
        let fileName = "unknown";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          console.log(fileNameMatch)
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
          console.log(fileName)
        }
        link.setAttribute("download", fileName);
        // link.setAttribute("download", "invoice11.pdf");

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

  const apiGetCustomerOrders = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + `/api/admin/user_details`,
      params: { _id: itemId },
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          ...response?.data?.data?.[0],
          resAllUserOrders: response?.data?.data?.[0]?.order_master
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetCustomerOrders()
  }, [])

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="d-print-none pb-2">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter">
                  <li className="breadcrumb-item">
                    <AdminDashboardBreadCrumb />
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Customer details
                  </li>
                </ol>
              </nav>
              <div className="d-sm-flex align-items-sm-center">
                <h1 className="page-header-title">
                  Customer ID #{mainState?._id}
                </h1>
                {/* <span className="ml-2 ml-sm-3">
                  <i className="tio-date-range"></i> Joined At :{" "}
                  {mainState?.joinedAt || ""}
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="printableArea">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="card">
              <div className="card-header">
                <h5 className="card-header-title" />
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
                      placeholder="Search orders"
                      aria-label="Search orders"
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
              <div
                className="table-responsive datatable-custom"
                style={{ maxHeight: "50vh", overflowY: "scroll" }}
              >
                <table
                  className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  data-hs-datatables-options='{
                             "order": [],
                             "orderCellsTop": true
                           }'
                >
                  <thead className="thead-light">
                    <tr>
                      <th>Sl#</th>
                      <th style={{ width: "50%" }} className="text-center">
                        Order ID
                      </th>
                      <th style={{ width: "50%" }}>Total</th>
                      <th style={{ width: "10%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!mainState?.order_master?.length
                      ? mainState.order_master.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td className="table-column-pl-0 text-center">
                            {item?._id}
                          </td>
                          <td>₹{item?.grandtotal}</td>
                          <td>
                            <Link
                              className="btn btn-primary btn-sm edit"
                              title="View"
                              to={"/admin/orders/details/" + item?._id}
                              state={{ ...item, allUserOrders: mainState }}
                            >
                              <i className="tio-visible" />
                            </Link>
                            <Link
                              className="btn btn-info btn-sm"
                              title="Invoice"
                              // target="_blank"
                              // to={
                              //   "/admin/orders/generate-invoice/" + item?._id
                              // }
                              to={""}
                              onClick={() => { downloadInvoice(item) }}
                            >
                              <i className="tio-download" />
                            </Link>
                          </td>
                        </tr>
                      ))
                      : <tr>
                        <td colSpan={"100%"}><center>No Data Found</center></td>
                      </tr>}
                  </tbody>
                </table>
                <div className="card-footer"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">Customer</h4>
              </div>
              <div className="card-body">
                <div className="media align-items-center" href="javascript:">
                  <div className="icon icon-soft-info icon-circle mr-3">
                    <i className="tio-shopping-basket-outlined" />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">{` ${mainState?.order_master?.length} Orders`}</span>
                  </div>
                  <div className="media-body text-right"></div>
                </div>
                <hr />
                <div className="media align-items-center" href="javascript:">
                  <div className="avatar avatar-circle mr-3">
                    <img
                      className="avatar-img"
                      src="/assets/front-end/img/image-place-holder.png"
                      alt="Image Description"
                    />
                  </div>
                  <div className="media-body">
                    <span className="text-body text-hover-primary">
                      {`${mainState?.user_details?.[0]?.first_name} ${mainState?.user_details?.[0]?.last_name}`}
                    </span>
                  </div>
                  <div className="media-body text-right"></div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Contact info</h5>
                </div>
                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    <i className="tio-online mr-2" />
                    {mainState?.email_address}
                  </li>
                  <li>
                    <i className="tio-android-phone-vs mr-2" />
                    {mainState?.contect_no}
                  </li>
                </ul>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminCustomerView;
