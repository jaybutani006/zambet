import React from "react";
import { Link } from "react-router-dom";

function AdminStockProductStock() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="js-nav-scroller hs-nav-scroller-horizontal">
            <ul
              className="nav nav-tabs page-header-tabs"
              id="projectsTab"
              role="tablist"
            >
              <li className="nav-item">
                <a className="nav-link active" href="javascript:">
                  Product stock report
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <form style={{ width: "100%" }}>
                  <div className="row text-left">
                    <div className="col-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Seller</label>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="form-group">
                        <select
                          className="js-select2-custom form-control select2-hidden-accessible"
                          name="seller_id"
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="all" selected data-select2-id={3}>
                            All
                          </option>
                          <option value="in_house" data-select2-id={4}>
                            In-House
                          </option>
                          <option value={1} data-select2-id={5}>
                            John Doe
                          </option>
                          <option value={4} data-select2-id={6}>
                            Test Seller 10
                          </option>
                          <option value={5} data-select2-id={7}>
                            Test Seller 11
                          </option>
                          <option value={6} data-select2-id={8}>
                            Test Seller 12
                          </option>
                          <option value={7} data-select2-id={9}>
                            Test Seller 14
                          </option>
                          <option value={8} data-select2-id={10}>
                            Test Seller 15
                          </option>
                          <option value={9} data-select2-id={11}>
                            Test Seller 16
                          </option>
                          <option value={10} data-select2-id={12}>
                            Test Seller 17
                          </option>
                          <option value={11} data-select2-id={13}>
                            Test Seller 18
                          </option>
                          <option value={12} data-select2-id={14}>
                            fatema subarna
                          </option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={2}
                          style={{ width: "100%" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection custom-select"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-seller_id-ok-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-seller_id-ok-container"
                                role="textbox"
                                aria-readonly="true"
                                title="All"
                              >
                                <span>All</span>
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
                    <div className="col-6 col-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="card-body"
                id="products-table"
                style={{ textAlign: "left" }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        Product Name{" "}
                        <label
                          className="badge badge-success ml-3"
                          style={{ cursor: "pointer" }}
                        >
                          ASE/DESC
                        </label>
                      </th>
                      <th scope="col">
                        Total Stock{" "}
                        <label
                          className="badge badge-success ml-3"
                          style={{ cursor: "pointer" }}
                        >
                          ASE/DESC
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Ledger nano s - the best crypto hardware wallet</td>
                      <td>999</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        iOttie easy one touch 4 dash &amp; windshield car mount
                        phone holder desk
                      </td>
                      <td>994</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        Subrtex 1-piece knit jacquard spandex stretch , sofa,
                        milky
                      </td>
                      <td>994</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>
                        Progress lighting P4009-10 5-light chandelier, polished
                        brass
                      </td>
                      <td>351</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>
                        Dove body wash with pump with skin natural nourishers
                      </td>
                      <td>999</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Hardside carry-on spinner suitcase luggage</td>
                      <td>499</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Dual alarm clock with bed shaker</td>
                      <td>498</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Timex marlin stainless steel hand-wound movement</td>
                      <td>299</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>
                        Dove advanced care antiperspirant deodorant stick for
                        women
                      </td>
                      <td>2996</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>
                        The school of life - emotional baggage tote bag - canvas
                        tote bag (navy)
                      </td>
                      <td>1997</td>
                    </tr>
                    <tr>
                      <th scope="row">11</th>
                      <td>Samsung Galaxy S20 FE 5G</td>
                      <td>1297</td>
                    </tr>
                    <tr>
                      <th scope="row">12</th>
                      <td>Teifoc house tile roof brick construction set toy</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <th scope="row">13</th>
                      <td>Home decorators collection boswell quarter 14 in.</td>
                      <td>1715</td>
                    </tr>
                    <tr>
                      <th scope="row">14</th>
                      <td>
                        OXO good grips 11-pound stainless steel food scale with
                        pull-out display
                      </td>
                      <td>979</td>
                    </tr>
                    <tr>
                      <th scope="row">15</th>
                      <td>Advanced elements stash pak roll top dry bag</td>
                      <td>695</td>
                    </tr>
                    <tr>
                      <th scope="row">16</th>
                      <td>Munchkin snack catcher, 2 pack, blue/green</td>
                      <td>1999</td>
                    </tr>
                    <tr>
                      <th scope="row">17</th>
                      <td>
                        Kodak PIXPRO astro zoom AZ421-RD 16MP digital camera
                      </td>
                      <td>995</td>
                    </tr>
                    <tr>
                      <th scope="row">18</th>
                      <td>
                        Women's long-sleeve lightweight french terry fleece
                        quarter-zip top
                      </td>
                      <td>1991</td>
                    </tr>
                    <tr>
                      <th scope="row">19</th>
                      <td>Apple iPhone XS max, 256GB, gold - fully unlocked</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <th scope="row">20</th>
                      <td>
                        Ultimate Lightest Wireless Gaming Mouse: Fastest Gaming
                        Switches - 20K DPI
                      </td>
                      <td>10000</td>
                    </tr>
                    <tr>
                      <th scope="row">21</th>
                      <td>Coated Cast Iron Kettlebell Weight</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <th scope="row">22</th>
                      <td>
                        2 Slice, Extra-Wide Slot Toaster with 6 Shade Settings,
                        Black
                      </td>
                      <td>10000</td>
                    </tr>
                    <tr>
                      <th scope="row">23</th>
                      <td>Carry-On Travel Backpack - Black</td>
                      <td>4000</td>
                    </tr>
                    <tr>
                      <th scope="row">24</th>
                      <td>
                        Nylon USB-A to Lightning Cable Cord, MFi Certified
                        Charger for Apple iPhone, iPa
                      </td>
                      <td>800</td>
                    </tr>
                    <tr>
                      <th scope="row">25</th>
                      <td>Lodge L8SK3 10-1/4-Inch Pre-Seasoned Skillet</td>
                      <td>10000</td>
                    </tr>
                  </tbody>
                </table>
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
                      <a
                        className="page-link"
                        href="/admin/stock/product-stock?page=2"
                      >
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="/admin/stock/product-stock?page=3"
                      >
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="/admin/stock/product-stock?page=2"
                        rel="next"
                        aria-label="Next »"
                      >
                        ›
                      </a>
                    </li>
                  </ul>
                </nav>
                <table>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminStockProductStock;
