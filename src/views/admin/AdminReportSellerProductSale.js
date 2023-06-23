import React from "react";

function AdminReportSellerProductSale() {
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
                  Seller product sale report
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
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                  />{" "}
                  <div className="row">
                    <div className="col-6 col-md-1">
                      <div className="form-group text-center">
                        <label htmlFor="exampleInputEmail1">Seller</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-group">
                        <select
                          className="js-select2-custom form-control select2-hidden-accessible"
                          name="seller_id"
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="all" data-select2-id={3}>
                            All
                          </option>
                          <option value={1} data-select2-id={4}>
                            John Doe
                          </option>
                          <option value={4} data-select2-id={5}>
                            Test Seller 10
                          </option>
                          <option value={5} data-select2-id={6}>
                            Test Seller 11
                          </option>
                          <option value={6} data-select2-id={7}>
                            Test Seller 12
                          </option>
                          <option value={7} data-select2-id={8}>
                            Test Seller 14
                          </option>
                          <option value={8} data-select2-id={9}>
                            Test Seller 15
                          </option>
                          <option value={9} data-select2-id={10}>
                            Test Seller 16
                          </option>
                          <option value={10} data-select2-id={11}>
                            Test Seller 17
                          </option>
                          <option value={11} data-select2-id={12}>
                            Test Seller 18
                          </option>
                          <option value={12} data-select2-id={13}>
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
                              aria-labelledby="select2-seller_id-6d-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-seller_id-6d-container"
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
                    <div className="col-6 col-md-1 text-center">
                      <div className="form-group ">
                        <label htmlFor="exampleInputEmail1">Category</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-group">
                        <select
                          className="js-select2-custom form-control select2-hidden-accessible"
                          name="category_id"
                          data-select2-id={14}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="all" data-select2-id={16}>
                            All
                          </option>
                          <option value={37} data-select2-id={17}>
                            Women's Fashion
                          </option>
                          <option value={38} data-select2-id={18}>
                            Men's Fashion
                          </option>
                          <option value={39} data-select2-id={19}>
                            Phones &amp; Telecom
                          </option>
                          <option value={40} data-select2-id={20}>
                            Computer, Office &amp; Security
                          </option>
                          <option value={43} data-select2-id={21}>
                            Jewelry &amp; Watches
                          </option>
                          <option value={44} data-select2-id={22}>
                            Home, Pet &amp; Appliances
                          </option>
                          <option value={45} data-select2-id={23}>
                            Bags &amp; Shoes
                          </option>
                          <option value={46} data-select2-id={24}>
                            Toys , Kids &amp; Babies
                          </option>
                          <option value={47} data-select2-id={25}>
                            Outdoor Fun &amp; Sports
                          </option>
                          <option value={114} data-select2-id={26}>
                            Home Improvement &amp; Tools
                          </option>
                          <option value={116} data-select2-id={27}>
                            Beauty, Health &amp; Hair
                          </option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={15}
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
                              aria-labelledby="select2-category_id-pc-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-category_id-pc-container"
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
                    <div className="col-12 col-md-2">
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
              <div className="card-body" style={{ textAlign: "left" }}>
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
                        Total Sale{" "}
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
                      <td>Home decorators collection boswell quarter 14 in.</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        OXO good grips 11-pound stainless steel food scale with
                        pull-out display
                      </td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        Kodak PIXPRO astro zoom AZ421-RD 16MP digital camera
                      </td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>
                        Ultimate Lightest Wireless Gaming Mouse: Fastest Gaming
                        Switches - 20K DPI
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Coated Cast Iron Kettlebell Weight</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>
                        2 Slice, Extra-Wide Slot Toaster with 6 Shade Settings,
                        Black
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Carry-On Travel Backpack - Black</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>
                        Nylon USB-A to Lightning Cable Cord, MFi Certified
                        Charger for Apple iPhone, iPa
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Lodge L8SK3 10-1/4-Inch Pre-Seasoned Skillet</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>
                        Nordic Ware Natural Aluminum Commercial Baker's Half
                        Sheet, 2-Pack, Silver
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">11</th>
                      <td>
                        Universal Laptop Docking Station Dual Monitor for
                        Windows and Mac (Dual Video: H
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">12</th>
                      <td>
                        Basics Replacement Water Filters for Water Pitchers,
                        Compatible with Brita - 3-P
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">13</th>
                      <td>
                        Foldable, 14" Black Metal Platform Bed Frame with
                        Tool-Free Assembly, No Box Spr
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">14</th>
                      <td>
                        Non-Slip Microfiber Shag Bathroom Rug Mat, 21" x 34",
                        Platinum
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">15</th>
                      <td>
                        Charging Station Dock for 4 Nintendo Switch Joy-con
                        Controllers - 2.6 Foot Cable
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">16</th>
                      <td>
                        75W Equivalent, Soft White, Dimmable, 10,000 Hour
                        Lifetime, A19 LED Light Bulb |
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">17</th>
                      <td>Plastic Fridge Storage Bin - Medium (2-Pack)</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">18</th>
                      <td>
                        Rayovac AAA Batteries, Alkaline Triple A Batteries (48
                        Battery Count)
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">19</th>
                      <td>
                        5-Shelf Adjustable, Heavy Duty Storage Shelving Unit
                        (350 lbs loading capacity p
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">20</th>
                      <td>Plastic Stackable Kids Chairs, Blue Pig, 2-Pack</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">21</th>
                      <td>Stackable Kids Chairs, Premium Plastic, 2-Pack</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">22</th>
                      <td>
                        Faux Leather Kids/Youth Recliner with Armrest Storage,
                        3+ Age Group, Beige
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">23</th>
                      <td>
                        Kids Bookcase with Reading Nook and Storage Shelves -
                        Natural
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">24</th>
                      <td>
                        Kids Wood Table and 4 Chair Set, Natural Table, Assorted
                        Color Chairs
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">25</th>
                      <td>
                        Kids Chair Set with Dry-Erasable Seat Top, White,
                        19.9-Inch, 2-Pack
                      </td>
                      <td>0</td>
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
                        href="/admin/report/seller-product-sale?page=2"
                      >
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="/admin/report/seller-product-sale?page=2"
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

export default AdminReportSellerProductSale;
