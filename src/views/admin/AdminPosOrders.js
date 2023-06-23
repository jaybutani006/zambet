import React from "react";

function AdminPosOrders() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header mb-1">
          <div className="flex-between align-items-center">
            <div>
              <h1 className="page-header-title">
                Pos orders <span className="badge badge-soft-dark mx-2">7</span>
              </h1>
            </div>
            <div>
              <i className="tio-shopping-cart" style={{ fontSize: "30px" }} />
            </div>
          </div>
          <div className="js-nav-scroller hs-nav-scroller-horizontal">
            <span
              className="hs-nav-scroller-arrow-prev"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-left" />
              </a>
            </span>
            <span
              className="hs-nav-scroller-arrow-next"
              style={{ display: "none" }}
            >
              <a className="hs-nav-scroller-arrow-link" href="javascript:;">
                <i className="tio-chevron-right" />
              </a>
            </span>
            <ul className="nav nav-tabs page-header-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Order list
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex-between justify-content-between align-items-center flex-grow-1">
              <div>
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
                      defaultValue
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="table-responsive datatable-custom">
            <table
              className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
              style={{ width: "100%", textAlign: "left" }}
            >
              <thead className="thead-light">
                <tr>
                  <th className>SL#</th>
                  <th className=" ">Order</th>
                  <th>Date</th>
                  <th>Customer name</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Order Status </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="status-delivered class-all">
                  <td className>1</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100064">100064</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100064"
                    >
                      walking customer
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 28.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100064"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100064"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="status-delivered class-all">
                  <td className>2</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100060">100060</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100060"
                    >
                      walking customer
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 66.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100060"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100060"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="status-delivered class-all">
                  <td className>3</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100059">100059</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100059"
                    >
                      Piyush Narola
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 792.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100059"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100059"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="status-delivered class-all">
                  <td className>4</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100056">100056</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100056"
                    >
                      Piyush Narola
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 223.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100056"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100056"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="status-delivered class-all">
                  <td className>5</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100055">100055</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100055"
                    >
                      Piyush Narola
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 59.40$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100055"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100055"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="status-delivered class-all">
                  <td className>6</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100054">100054</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100054"
                    >
                      Piyush Narola
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 40.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100054"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100054"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="status-delivered class-all">
                  <td className>7</td>
                  <td className="table-column-pl-0">
                    <a href="/admin/pos/order-details/100053">100053</a>
                  </td>
                  <td>05 Feb 2022</td>
                  <td>
                    <a
                      className="text-body text-capitalize"
                      href="/admin/orders/details/100053"
                    >
                      walking customer
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Paid
                    </span>
                  </td>
                  <td> 40.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-success ml-2 ml-sm-3">
                      <span
                        className="legend-indicator bg-success"
                        style={{ marginLeft: 0, marginRight: ".4375rem" }}
                      />
                      Delivered
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
                        <a
                          className="dropdown-item"
                          href="/admin/pos/order-details/100053"
                        >
                          <i className="tio-visible" /> View
                        </a>
                        <a
                          className="dropdown-item"
                          target="_blank"
                          href="/admin/orders/generate-invoice/100053"
                        >
                          <i className="tio-download" /> Invoice
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
              <div className="col-sm-auto">
                <div className="d-flex justify-content-center justify-content-sm-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminPosOrders;
