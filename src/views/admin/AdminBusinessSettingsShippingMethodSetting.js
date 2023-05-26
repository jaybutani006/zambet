import React from "react";

function AdminBusinessSettingsShippingMethodSetting() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row pb-3">
          <div className="col-md-6">
            <div className="card" style={{ height: "200px" }}>
              <div className="card-header text-capitalize">
                <h5 className="text-center">
                  <i className="tio-settings-outlined" />
                  Shipping responsibility
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 pl-8 text-capitalize">
                    <div className="row">
                      <div className="form-check">
                        <input
                          onclick="shipping_responsibility(this.value);"
                          className="form-check-input"
                          type="radio"
                          name="shipping_res"
                          defaultValue="inhouse_shipping"
                          id="inhouse_shipping"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inhouse_shipping"
                        >
                          Inhouse shipping
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-check">
                        <input
                          onclick="shipping_responsibility(this.value);"
                          className="form-check-input"
                          type="radio"
                          name="shipping_res"
                          defaultValue="sellerwise_shipping"
                          id="sellerwise_shipping"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="sellerwise_shipping"
                        >
                          Seller wise shipping
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-sm-0">
            <div className="card" style={{ height: "200px" }}>
              <div className="card-header text-capitalize">
                <h4>Choose shipping method</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-12 text-capitalize"
                    style={{ textAlign: "left" }}
                  >
                    <label
                      htmlFor
                      id="for_inhouse_deliver"
                      style={{ display: "none" }}
                    >
                      For inhouse deliver
                    </label>
                    <select
                      className="form-control text-capitalize"
                      name="shippingCategory"
                      onchange="shipping_type(this.value);"
                      style={{ width: "100%" }}
                    >
                      <option value={0} selected disabled>
                        ---Select---
                      </option>
                      <option value="order_wise">Order wise </option>
                      <option value="category_wise" selected>
                        Category wise
                      </option>
                      <option value="product_wise">Product wise</option>
                    </select>
                  </div>
                  <div
                    className="col-12 mt-2"
                    id="product_wise_note"
                    style={{ display: "none" }}
                  >
                    <p className="m-2" style={{ color: "red" }}>
                      Note : Please, make sure all the products delivery charges
                      are up to date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card" id="update_category_shipping_cost">
          <div className="card-header text-capitalize">
            <h4>Update category shipping cost</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="col-12">
                <table
                  className="table table-bordered"
                  width="100%"
                  cellSpacing={0}
                  style={{ textAlign: "left" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Sl#</th>
                      <th scope="col">Category name</th>
                      <th scope="col">Cost per product</th>
                      <th scope="col">Multiply with QTY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <form />
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                    />{" "}
                    <tr>
                      <td>1</td>
                      <td>Women's Fashion</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={1}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={5}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={1}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Men's Fashion</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={2}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={2}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={2}
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Phones &amp; Telecom</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={3}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={4}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={3}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Computer, Office &amp; Security</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={4}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={3}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={4}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Jewelry &amp; Watches</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={5}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={10}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={5}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Home, Pet &amp; Appliances</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={6}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={10}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={6}
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Bags &amp; Shoes</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={7}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={4}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={7}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Toys , Kids &amp; Babies</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={8}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={4}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={8}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Outdoor Fun &amp; Sports</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={9}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={10}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={9}
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Home Improvement &amp; Tools</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={10}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={3}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={10}
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Beauty, Health &amp; Hair</td>
                      <td>
                        <input
                          type="hidden"
                          className="form-control"
                          name="ids[]"
                          defaultValue={11}
                        />
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          name="cost[]"
                          defaultValue={6}
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="multiplyQTY[]"
                            id
                            defaultValue={11}
                            defaultChecked
                          />
                          <span className="slider round" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <button
                          type="button"
                          onclick="call_demo()"
                          className="btn btn-primary mb-2"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div id="order_wise_shipping" style={{ display: "none" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header text-capitalize">
                  <h4>Add order wise shipping</h4>
                </div>
                <div className="card-body">
                  <form style={{ textAlign: "left" }}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                    />{" "}
                    <div className="form-group">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <label htmlFor="duration">Duration</label>
                          <input
                            type="text"
                            name="duration"
                            className="form-control"
                            placeholder="Ex : 4 to 6 days"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <label htmlFor="cost">Cost</label>
                          <input
                            type="number"
                            min={0}
                            max={1000000}
                            name="cost"
                            className="form-control"
                            placeholder="Ex : 10 "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary ">
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
                <div className="card-header text-capitalize">
                  <h4>
                    Order wise shipping method{" "}
                    <span style={{ color: "red" }}>(2)</span>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      width="100%"
                      cellSpacing={0}
                      style={{ textAlign: "left" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Sl#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Status</th>
                          <th scope="col" style={{ width: "50px" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Company Vehicle</td>
                          <td>2-3 Days</td>
                          <td>5.00$</td>
                          <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                className="status"
                                id={2}
                                defaultChecked
                              />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <div className="dropdown float-right">
                              <button
                                className="btn btn-seconary btn-sm dropdown-toggle"
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
                                  href="/admin/business-settings/shipping-method/edit/2"
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item delete"
                                  style={{ cursor: "pointer" }}
                                  id={2}
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Regular Shipping</td>
                          <td>10-15 days</td>
                          <td>2.00$</td>
                          <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                className="status"
                                id={4}
                                defaultChecked
                              />
                              <span className="slider round" />
                            </label>
                          </td>
                          <td>
                            <div className="dropdown float-right">
                              <button
                                className="btn btn-seconary btn-sm dropdown-toggle"
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
                                  href="/admin/business-settings/shipping-method/edit/4"
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item delete"
                                  style={{ cursor: "pointer" }}
                                  id={4}
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default AdminBusinessSettingsShippingMethodSetting;
