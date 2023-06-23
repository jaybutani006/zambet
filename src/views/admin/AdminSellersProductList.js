import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function AdminSellersProductList() {
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
              Products
            </li>
          </ol>
        </nav>
        <div className="d-md-flex_ align-items-center justify-content-between mb-0">
          <div className="row text-center">
            <div className="col-12">
              <h3 className="h3 mt-2 text-black-50">Product list</h3>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  Product table
                  <span className="badge badge-soft-dark ml-2">9</span>
                </h5>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>SL#</th>
                        <th>Product Name</th>
                        <th>Purchase price</th>
                        <th>Selling price</th>
                        <th>Featured</th>
                        <th>Status</th>
                        <th style={{ width: "5px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <Link to="/admin/product/view/30">
                            test product abc
                          </Link>
                        </td>
                        <td>4000$</td>
                        <td>5000$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('30')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" className="status" id={30} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/30"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-30','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-30">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          <Link to="/admin/product/view/28">test product</Link>
                        </td>
                        <td>900$</td>
                        <td>1000$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('28')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" className="status" id={28} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/28"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-28','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-28">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>
                          <Link to="/admin/product/view/16">
                            London Beauty Soap B...
                          </Link>
                        </td>
                        <td>400$</td>
                        <td>500$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('16')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={16}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/16"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-16','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-16">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>
                          <Link to="/admin/product/view/13">
                            Kids Wood Table and ...
                          </Link>
                        </td>
                        <td>400$</td>
                        <td>500$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('13')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={13}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/13"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-13','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-13">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>
                          <Link to="/admin/product/view/12">
                            The school of life -...
                          </Link>
                        </td>
                        <td>400$</td>
                        <td>500$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('12')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={12}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/12"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-12','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-12">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>
                          <Link to="/admin/product/view/6">
                            Sneakers man new des...
                          </Link>
                        </td>
                        <td>400$</td>
                        <td>500$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('6')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={6}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/6"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-6','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-6">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>
                          <Link to="/admin/product/view/5">
                            Exclusive &amp; Fashiona...
                          </Link>
                        </td>
                        <td>400$</td>
                        <td>500$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('5')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={5}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/5"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-5','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-5">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">8</th>
                        <td>
                          <Link to="/admin/product/view/3">
                            Ladies Winter Long S...
                          </Link>
                        </td>
                        <td>4000$</td>
                        <td>5000$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('3')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={3}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/3"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-3','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-3">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">9</th>
                        <td>
                          <Link to="/admin/product/view/26">
                            Demo Product Demo Pr...
                          </Link>
                        </td>
                        <td>59$</td>
                        <td>55$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('26')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" className="status" id={26} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
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
                                to="/admin/product/edit/26"
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="javascript:"
                                onclick="form_alert('product-26','Want to delete this item ?')"
                              >
                                Delete
                              </a>
                              <form id="product-26">
                                <input
                                  type="hidden"
                                  name="_token"
                                  defaultValue="ujBq5UdIbry88AkeQFnRylYxkoQhIvKJkL8EoMFM"
                                />{" "}
                                <input
                                  type="hidden"
                                  name="_method"
                                  defaultValue="delete"
                                />{" "}
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSellersProductList;
