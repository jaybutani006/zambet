import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminProductListInHouse() {
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
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 mb-1 col-md-4">
                    <h5 className="flex-between">
                      <div>Product table (16)</div>
                    </h5>
                  </div>
                  <div
                    className="col-12 mb-1 col-md-5"
                    style={{ width: "40vw" }}
                  >
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
                          placeholder="Search Product Name"
                          aria-label="Search orders"
                          defaultValue
                          required
                        />
                        <input type="hidden" defaultValue name="status" />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 col-md-3">
                    <a
                      href="/admin/product/add-new"
                      className="btn btn-primary  float-right"
                    >
                      <i className="tio-add-circle" />
                      <span className="text">Add new product</span>
                    </a>
                  </div>
                </div>
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
                        <th>Active Status</th>
                        <th style={{ width: "5px" }} className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <a href="/admin/product/view/19">
                            Apple iPhone XS max,...
                          </a>
                        </td>
                        <td>750.00$</td>
                        <td>800.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('19')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input type="checkbox" className="status" id={19} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/19"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/19"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-19','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-19">
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
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          <a href="/admin/product/view/18">
                            Women's long-sleeve...
                          </a>
                        </td>
                        <td>15.00$</td>
                        <td>20.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('18')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input
                              type="checkbox"
                              className="status"
                              id={18}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/18"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/18"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-18','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-18">
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
                      <tr>
                        <th scope="row">3</th>
                        <td>
                          <a href="/admin/product/view/16">
                            Munchkin snack catch...
                          </a>
                        </td>
                        <td>3.00$</td>
                        <td>5.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('16')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
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
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/16"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/16"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-16','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-16">
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
                      <tr>
                        <th scope="row">4</th>
                        <td>
                          <a href="/admin/product/view/15">
                            Advanced elements st...
                          </a>
                        </td>
                        <td>45.00$</td>
                        <td>50.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('15')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input
                              type="checkbox"
                              className="status"
                              id={15}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/15"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/15"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-15','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-15">
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
                      <tr>
                        <th scope="row">5</th>
                        <td>
                          <a href="/admin/product/view/12">
                            Teifoc house tile ro...
                          </a>
                        </td>
                        <td>60.00$</td>
                        <td>65.00$</td>
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
                          <label className="switch switch-status">
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
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/12"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/12"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-12','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-12">
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
                      <tr>
                        <th scope="row">6</th>
                        <td>
                          <a href="/admin/product/view/11">
                            Samsung Galaxy S20 F...
                          </a>
                        </td>
                        <td>500.00$</td>
                        <td>530.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('11')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input type="checkbox" className="status" id={11} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/11"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/11"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-11','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-11">
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
                      <tr>
                        <th scope="row">7</th>
                        <td>
                          <a href="/admin/product/view/10">
                            The school of life -...
                          </a>
                        </td>
                        <td>3.00$</td>
                        <td>5.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('10')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input
                              type="checkbox"
                              className="status"
                              id={10}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/10"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/10"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-10','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-10">
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
                      <tr>
                        <th scope="row">8</th>
                        <td>
                          <a href="/admin/product/view/9">
                            Dove advanced care a...
                          </a>
                        </td>
                        <td>40.00$</td>
                        <td>60.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('9')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input type="checkbox" className="status" id={9} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/9"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/9"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-9','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-9">
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
                      <tr>
                        <th scope="row">9</th>
                        <td>
                          <a href="/admin/product/view/8">
                            Timex marlin stainle...
                          </a>
                        </td>
                        <td>40.00$</td>
                        <td>48.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('8')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input
                              type="checkbox"
                              className="status"
                              id={8}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/8"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/8"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-8','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-8">
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
                      <tr>
                        <th scope="row">10</th>
                        <td>
                          <a href="/admin/product/view/7">
                            Dual alarm clock wit...
                          </a>
                        </td>
                        <td>25.00$</td>
                        <td>33.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('7')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input
                              type="checkbox"
                              className="status"
                              id={7}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/7"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/7"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-7','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-7">
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
                      <tr>
                        <th scope="row">11</th>
                        <td>
                          <a href="/admin/product/view/6">
                            Hardside carry-on sp...
                          </a>
                        </td>
                        <td>75.00$</td>
                        <td>81.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('6')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
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
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/6"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/6"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-6','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-6">
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
                      <tr>
                        <th scope="row">12</th>
                        <td>
                          <a href="/admin/product/view/5">
                            Dove body wash with...
                          </a>
                        </td>
                        <td>11.00$</td>
                        <td>13.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('5')"
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input type="checkbox" className="status" id={5} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/5"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/5"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-5','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-5">
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
                      <tr>
                        <th scope="row">13</th>
                        <td>
                          <a href="/admin/product/view/4">
                            Progress lighting P4...
                          </a>
                        </td>
                        <td>90.00$</td>
                        <td>99.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('4')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
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
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/4"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/4"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-4','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-4">
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
                      <tr>
                        <th scope="row">14</th>
                        <td>
                          <a href="/admin/product/view/3">
                            Subrtex 1-piece knit...
                          </a>
                        </td>
                        <td>35.00$</td>
                        <td>41.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('3')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
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
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/3"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/3"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-3','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-3">
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
                      <tr>
                        <th scope="row">15</th>
                        <td>
                          <a href="/admin/product/view/2">
                            iOttie easy one touc...
                          </a>
                        </td>
                        <td>20.00$</td>
                        <td>23.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('2')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
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
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/2"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/2"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-2','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-2">
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
                      <tr>
                        <th scope="row">16</th>
                        <td>
                          <a href="/admin/product/view/1">
                            Ledger nano s - the...
                          </a>
                        </td>
                        <td>20.00$</td>
                        <td>25.00$</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onclick="featured_status('1')"
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <label className="switch switch-status">
                            <input
                              type="checkbox"
                              className="status"
                              id={1}
                              defaultChecked
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            className="btn btn-info btn-sm"
                            href="/admin/product/view/1"
                          >
                            <i className="tio-visible" />
                            View
                          </a>
                          <a
                            className="btn btn-primary btn-sm"
                            href="/admin/product/edit/1"
                          >
                            <i className="tio-edit" />
                            Edit
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            href="javascript:"
                            onclick="form_alert('product-1','Want to delete this item ?')"
                          >
                            <i className="tio-add-to-trash" /> Delete
                          </a>
                          <form id="product-1">
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

export default AdminProductListInHouse;
