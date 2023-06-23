import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminCurrencyView() {
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
              Currency
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger mb-3" role="alert">
              Changing some settings will take time to show effect please clear
              session or wait for 60 minutes else browse from incognito mode
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="text-center">
                  <i className="tio-money" />
                  Add New Currency
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Enter currency Name"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="symbol"
                          className="form-control"
                          id="symbol"
                          placeholder="Enter currency symbol"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="code"
                          className="form-control"
                          id="code"
                          placeholder="Enter currency code"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          min={0}
                          max={1000000}
                          name="exchange_rate"
                          step="0.00000001"
                          className="form-control"
                          id="exchange_rate"
                          placeholder="Enter currency exchange rate"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      id="add"
                      className="btn btn-primary text-capitalize"
                      style={{ color: "white" }}
                    >
                      <i className="tio-add" /> Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="text-center">
                  <i className="tio-settings" />
                  System default currency
                </h5>
              </div>
              <div className="card-body">
                <form className="form-inline_">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group mb-2">
                        <select
                          style={{ width: "100%" }}
                          className="form-control js-example-responsive select2-hidden-accessible"
                          name="currency_id"
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value={1} selected data-select2-id={3}>
                            USD
                          </option>
                          <option value={2}> INR</option>
                          <option value={3}>Indian Rupi</option>
                          <option value={4}>ZAR</option>
                          <option value={5}>Ringgit</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={2}
                          style={{ width: "100%" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--single"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-currency_id-o6-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-currency_id-o6-container"
                                role="textbox"
                                aria-readonly="true"
                                title="USD"
                              >
                                USD
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
                      <div className="form-group mb-2">
                        <button type="submit" className="btn btn-primary mb-2">
                          Save
                        </button>
                      </div>
                    </div>
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
                <div className="row justify-content-between align-items-center flex-grow-1">
                  <div className="col-lg-3 mb-3 mb-lg-0">
                    <div className="flex-start">
                      <div>
                        <h5>Currency Table</h5>
                      </div>
                      <div className="mx-1">
                        <h5 style={{ color: "red" }}>(5)</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
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
                          placeholder="Search Currency Name or Currency Code"
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
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                    <thead className="thead-light">
                      <tr className="text-center">
                        <th scope="col">SL#</th>
                        <th scope="col">Currency name</th>
                        <th scope="col">Currency symbol</th>
                        <th scope="col">Currency code</th>
                        <th scope="col">Exchange rate (1 USD= ?)</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td>1</td>
                        <td>USD</td>
                        <td>$</td>
                        <td>USD</td>
                        <td>1</td>
                        <td>
                          <label className="badge badge-info">Default</label>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm btn-xs edit"
                            disabled
                          >
                            <i className="tio-edit" /> Edit
                          </button>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>2</td>
                        <td> INR</td>
                        <td>৳</td>
                        <td> INR</td>
                        <td>84</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={2}
                              defaultChecked
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-sm btn-xs edit"
                            href="/admin/currency/edit/2"
                          >
                            <i className="tio-edit" /> Edit
                          </a>
                          <a
                            type="button"
                            className="btn btn-danger btn-sm btn-xs"
                            href="/admin/currency/delete/2"
                          >
                            <i className="tio-edit" /> Delete
                          </a>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>3</td>
                        <td>Indian Rupi</td>
                        <td>₹</td>
                        <td>INR</td>
                        <td>60</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={3}
                              defaultChecked
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-sm btn-xs edit"
                            href="/admin/currency/edit/3"
                          >
                            <i className="tio-edit" /> Edit
                          </a>
                          <a
                            type="button"
                            className="btn btn-danger btn-sm btn-xs"
                            href="/admin/currency/delete/3"
                          >
                            <i className="tio-edit" /> Delete
                          </a>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>4</td>
                        <td>ZAR</td>
                        <td>R</td>
                        <td>ZAR</td>
                        <td>16</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={4}
                              defaultChecked
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-sm btn-xs edit"
                            href="/admin/currency/edit/4"
                          >
                            <i className="tio-edit" /> Edit
                          </a>
                          <a
                            type="button"
                            className="btn btn-danger btn-sm btn-xs"
                            href="/admin/currency/delete/4"
                          >
                            <i className="tio-edit" /> Delete
                          </a>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>5</td>
                        <td>Ringgit</td>
                        <td>RM</td>
                        <td>MYR</td>
                        <td>4</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={5}
                              defaultChecked
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <a
                            type="button"
                            className="btn btn-primary btn-sm btn-xs edit"
                            href="/admin/currency/edit/5"
                          >
                            <i className="tio-edit" /> Edit
                          </a>
                          <a
                            type="button"
                            className="btn btn-danger btn-sm btn-xs"
                            href="/admin/currency/delete/5"
                          >
                            <i className="tio-edit" /> Delete
                          </a>
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

export default AdminCurrencyView;
