import React from "react";

function AdminCouponAddNew() {
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
                <i className="tio-add-circle-outlined" /> Add New Coupon
              </h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-body">
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <div className="row">
                    <div className="col-4">
                      <div className="form-group">
                        <label htmlFor="name">Type</label>
                        <select
                          className="form-control"
                          name="coupon_type"
                          style={{ width: "100%" }}
                          required
                        >
                          <option value="discount_on_purchase">
                            Discount on Purchase
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          id="title"
                          placeholder="Title"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label htmlFor="name">Code</label>
                        <input
                          type="text"
                          name="code"
                          defaultValue="u3dmhwyklO"
                          className="form-control"
                          id="code"
                          placeholder
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 col-6">
                      <div className="form-group">
                        <label htmlFor="name">Start date</label>
                        <input
                          id="start_date"
                          type="date"
                          name="start_date"
                          className="form-control"
                          placeholder="Start date"
                          required
                          min="2022-04-13"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="form-group">
                        <label htmlFor="name">Expire date</label>
                        <input
                          id="expire_date"
                          type="date"
                          name="expire_date"
                          className="form-control"
                          placeholder="Expire date"
                          required
                          min="2022-04-13"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Limit For Same User
                        </label>
                        <input
                          type="number"
                          name="limit"
                          id="coupon_limit"
                          className="form-control"
                          placeholder="EX: 10"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="form-group">
                        <label htmlFor="name">Discount type</label>
                        <select
                          id="discount_type"
                          className="form-control"
                          name="discount_type"
                          onchange="checkDiscountType(this.value)"
                          style={{ width: "100%" }}
                        >
                          <option value="amount">Amount</option>
                          <option value="percentage">Percentage</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 col-6">
                      <div className="form-group">
                        <label htmlFor="name">Discount</label>
                        <input
                          type="number"
                          min={1}
                          max={1000000}
                          name="discount"
                          className="form-control"
                          id="discount"
                          placeholder="Discount"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <label htmlFor="name">Minimum purchase</label>
                      <input
                        type="number"
                        min={1}
                        max={1000000}
                        name="min_purchase"
                        className="form-control"
                        id="minimum purchase"
                        placeholder="Minimum purchase"
                        required
                      />
                    </div>
                    <div
                      id="max-discount"
                      className="col-md-3 col-6"
                      style={{ display: "none" }}
                    >
                      <div className="form-group">
                        <label htmlFor="name">Maximum discount</label>
                        <input
                          type="number"
                          min={1}
                          max={1000000}
                          name="max_discount"
                          className="form-control"
                          id="maximum discount"
                          placeholder="Maximum discount"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
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
                <div className="row justify-content-between align-items-center flex-grow-1">
                  <div className="col-lg-3 mb-3 mb-lg-0">
                    <h5>
                      Coupons table <span style={{ color: "red" }}>(1)</span>
                    </h5>
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
                          placeholder="Search by Title or Code or Discount Type"
                          defaultValue
                          aria-label="Search orders"
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
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table
                    id="datatable"
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    style={{ width: "100%" }}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>SL#</th>
                        <th>Coupon type</th>
                        <th>Title</th>
                        <th>Code</th>
                        <th>User Limit</th>
                        <th>Minimum purchase</th>
                        <th>Maximum discount</th>
                        <th>Discount</th>
                        <th>Discount type</th>
                        <th>Start date</th>
                        <th>Expire date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td style={{ textTransform: "capitalize" }}>
                          discount on purchase
                        </td>
                        <td className="text-capitalize">test 3</td>
                        <td>1234</td>
                        <td />
                        <td>10.00$</td>
                        <td>10.00$</td>
                        <td>10.00$</td>
                        <td>amount</td>
                        <td>05-Jun-21</td>
                        <td>07-Jun-21</td>
                        <td>
                          <label className="toggle-switch toggle-switch-sm">
                            <input
                              type="checkbox"
                              className="toggle-switch-input"
                              defaultChecked
                            />
                            <span className="toggle-switch-label">
                              <span className="toggle-switch-indicator" />
                            </span>
                          </label>
                        </td>
                        <td>
                          <a
                            href="/admin/coupon/update/1"
                            className="btn btn-primary btn-sm w-100 d-inline-block"
                          >
                            Update
                          </a>
                          <br />
                          <a
                            href="javascript:"
                            onclick="form_alert('coupon-1','Want to delete this coupon ?')"
                            className="btn btn-danger btn-sm w-100 d-inline-block"
                          >
                            Delete
                          </a>
                          <form id="coupon-1">
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                            />{" "}
                            <input
                              type="hidden"
                              name="_method"
                              defaultValue="delete"
                            />{" "}
                          </form>
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

export default AdminCouponAddNew;
