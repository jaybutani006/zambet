import React from "react";
import { Link } from "react-router-dom";

function AdminSellersOrderList() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row align-items-center mb-3">
          <div className="col-sm">
            <h1 className="page-header-title">
              Orders <span className="badge badge-soft-dark ml-2">50</span>
            </h1>
          </div>
        </div>
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h1 className="h3 mb-0 text-black-50">
            Seller : fatema subarna , ID : 1
          </h1>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Order Table</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    width="100%"
                    cellSpacing={0}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>SL#</th>
                        <th>Order</th>
                        <th>Customer name</th>
                        <th>Phone</th>
                        <th>Status </th>
                        <th>Payment</th>
                        <th style={{ width: "30px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100120/1">
                            100120
                          </Link>
                        </td>
                        <td>Muthu Kumar</td>
                        <td>+919865147123</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100120/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                // target="_blank"
                                // to="/admin/orders/generate-invoice/100120"
                                to={""}
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100115/1">
                            100115
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100115/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100115"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>
                          <a to="/admin/sellers/order-details/100113/1">
                            100113
                          </a>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100113/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100113"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100110/1">
                            100110
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100110/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100110"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100109/1">
                            100109
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            delivered
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100109/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100109"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100108/1">
                            100108
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            delivered
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-success">
                            <span className="legend-indicator bg-success" />
                            Paid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100108/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100108"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100107/1">
                            100107
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            delivered
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-success">
                            <span className="legend-indicator bg-success" />
                            Paid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100107/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100107"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">8</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100106/1">
                            100106
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            delivered
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100106/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100106"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">9</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100104/1">
                            100104
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100104/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100104"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">10</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100103/1">
                            100103
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            confirmed
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-success">
                            <span className="legend-indicator bg-success" />
                            Paid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100103/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100103"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">11</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100101/1">
                            100101
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            delivered
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100101/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100101"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">12</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100100/1">
                            100100
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100100/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100100"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">13</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100098/1">
                            100098
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100098/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100098"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">14</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100097/1">
                            100097
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-success">
                            confirmed
                          </label>
                        </td>
                        <td>
                          <span className="badge badge-soft-success">
                            <span className="legend-indicator bg-success" />
                            Paid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100097/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100097"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">15</th>
                        <td>
                          <Link to="/admin/sellers/order-details/100092/1">
                            100092
                          </Link>
                        </td>
                        <td>fatema subarna</td>
                        <td>018855</td>
                        <td className="text-capitalize ">
                          <label className="badge badge-primary">pending</label>
                        </td>
                        <td>
                          <span className="badge badge-soft-danger">
                            <span className="legend-indicator bg-danger" />
                            Unpaid
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
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
                                to="/admin/sellers/order-details/100092/1"
                              >
                                <i className="tio-visible" /> View
                              </Link>
                              <Link
                                className="dropdown-item"
                                target="_blank"
                                to="/admin/orders/generate-invoice/100092"
                              >
                                <i className="tio-download" /> Invoice
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
                  <div className="col-sm-auto">
                    <div className="d-flex justify-content-center justify-content-sm-end">
                      <nav>
                        <ul className="pagination">
                          <li
                            className="page-item disabled"
                            aria-disabled="true"
                            aria-label="« Previous"
                          >
                            <span className="page-link" aria-hidden="true">
                              ‹
                            </span>
                          </li>
                          <li className="page-item active" aria-current="page">
                            <span className="page-link">1</span>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="/admin/sellers/order-list/1?page=2"
                            >
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="/admin/sellers/order-list/1?page=3"
                            >
                              3
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="/admin/sellers/order-list/1?page=4"
                            >
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="/admin/sellers/order-list/1?page=2"
                              rel="next"
                              aria-label="Next »"
                            >
                              ›
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSellersOrderList;
