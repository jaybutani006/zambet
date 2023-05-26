import React from "react";
import { Link } from "react-router-dom";

function AdminStockProductInWishList() {
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
                  Product in wishlist report
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <form style={{ width: "100%" }} id="filter-form">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                    className="form-control"
                  />{" "}
                  <div className="row text-left">
                    <div className="col-2">
                      <div className="form-group ">
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
                          <option value="all" data-select2-id={3}>
                            All
                          </option>
                          <option value="in_house" selected data-select2-id={4}>
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
                              aria-labelledby="select2-seller_id-b3-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-seller_id-b3-container"
                                role="textbox"
                                aria-readonly="true"
                                title="In-House"
                              >
                                <span>In-House</span>
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
                        type="button"
                        onclick="filter_form()"
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
                <div
                  id="datatable_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <div className="dt-buttons">
                    {" "}
                    <button
                      className="dt-button buttons-copy buttons-html5 d-none"
                      tabIndex={0}
                      aria-controls="datatable"
                      type="button"
                    >
                      <span>Copy</span>
                    </button>{" "}
                    <button
                      className="dt-button buttons-excel buttons-html5 d-none"
                      tabIndex={0}
                      aria-controls="datatable"
                      type="button"
                    >
                      <span>Excel</span>
                    </button>{" "}
                    <button
                      className="dt-button buttons-csv buttons-html5 d-none"
                      tabIndex={0}
                      aria-controls="datatable"
                      type="button"
                    >
                      <span>CSV</span>
                    </button>{" "}
                    <button
                      className="dt-button buttons-pdf buttons-html5 d-none"
                      tabIndex={0}
                      aria-controls="datatable"
                      type="button"
                    >
                      <span>PDF</span>
                    </button>{" "}
                    <button
                      className="dt-button buttons-print d-none"
                      tabIndex={0}
                      aria-controls="datatable"
                      type="button"
                    >
                      <span>Print</span>
                    </button>{" "}
                  </div>
                  <div id="datatable_filter" className="dataTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control"
                        placeholder
                        aria-controls="datatable"
                      />
                    </label>
                  </div>
                  <table
                    className="table dataTable no-footer"
                    id="datatable"
                    role="grid"
                    aria-describedby="datatable_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          scope="col"
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="datatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-sort="ascending"
                          aria-label="#: activate to sort column descending"
                          style={{ width: "60.425px" }}
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="sorting"
                          tabIndex={0}
                          aria-controls="datatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="
      Product Name Asc/Dsc
  : activate to sort column ascending"
                          style={{ width: "1018.25px" }}
                        >
                          Product Name{" "}
                          <label
                            className="badge badge-success ml-3"
                            style={{ cursor: "pointer" }}
                          >
                            Asc/Dsc
                          </label>
                        </th>
                        <th
                          scope="col"
                          className="sorting"
                          tabIndex={0}
                          aria-controls="datatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="
      Total in Wishlist Asc/Dsc
  : activate to sort column ascending"
                          style={{ width: "398.925px" }}
                        >
                          Total in Wishlist{" "}
                          <label
                            className="badge badge-success ml-3"
                            style={{ cursor: "pointer" }}
                          >
                            Asc/Dsc
                          </label>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row" className="odd">
                        <th scope="row" className="sorting_1">
                          1
                        </th>
                        <td>Ledger nano s - the best crypto hardware wallet</td>
                        <td>0</td>
                      </tr>
                      <tr role="row" className="even">
                        <th scope="row" className="sorting_1">
                          2
                        </th>
                        <td>
                          iOttie easy one touch 4 dash &amp; windshield car
                          mount phone holder desk
                        </td>
                        <td>1</td>
                      </tr>
                      <tr role="row" className="odd">
                        <th scope="row" className="sorting_1">
                          3
                        </th>
                        <td>
                          Subrtex 1-piece knit jacquard spandex stretch , sofa,
                          milky
                        </td>
                        <td>0</td>
                      </tr>
                      <tr role="row" className="even">
                        <th scope="row" className="sorting_1">
                          4
                        </th>
                        <td>
                          Progress lighting P4009-10 5-light chandelier,
                          polished brass
                        </td>
                        <td>0</td>
                      </tr>
                      <tr role="row" className="odd">
                        <th scope="row" className="sorting_1">
                          5
                        </th>
                        <td>
                          Dove body wash with pump with skin natural nourishers
                        </td>
                        <td>1</td>
                      </tr>
                      <tr role="row" className="even">
                        <th scope="row" className="sorting_1">
                          6
                        </th>
                        <td>Hardside carry-on spinner suitcase luggage</td>
                        <td>1</td>
                      </tr>
                      <tr role="row" className="odd">
                        <th scope="row" className="sorting_1">
                          7
                        </th>
                        <td>Dual alarm clock with bed shaker</td>
                        <td>0</td>
                      </tr>
                      <tr role="row" className="even">
                        <th scope="row" className="sorting_1">
                          8
                        </th>
                        <td>
                          Timex marlin stainless steel hand-wound movement
                        </td>
                        <td>0</td>
                      </tr>
                      <tr role="row" className="odd">
                        <th scope="row" className="sorting_1">
                          9
                        </th>
                        <td>
                          Dove advanced care antiperspirant deodorant stick for
                          women
                        </td>
                        <td>0</td>
                      </tr>
                      <tr role="row" className="even">
                        <th scope="row" className="sorting_1">
                          10
                        </th>
                        <td>
                          The school of life - emotional baggage tote bag -
                          canvas tote bag (navy)
                        </td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className="dataTables_info"
                    id="datatable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 10 of 16 entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="datatable_paginate"
                  >
                    <ul
                      id="datatable_pagination"
                      className="pagination datatable-custom-pagination"
                    >
                      <li className="paginate_item page-item disabled">
                        <a
                          className="paginate_button previous page-link"
                          aria-controls="datatable"
                          data-dt-idx={0}
                          tabIndex={0}
                          id="datatable_previous"
                        >
                          <span aria-hidden="true">Prev</span>
                        </a>
                      </li>
                      <li className="paginate_item page-item active">
                        <a
                          className="paginate_button page-link"
                          aria-controls="datatable"
                          data-dt-idx={1}
                          tabIndex={0}
                        >
                          1
                        </a>
                      </li>
                      <li className="paginate_item page-item">
                        <a
                          className="paginate_button page-link"
                          aria-controls="datatable"
                          data-dt-idx={2}
                          tabIndex={0}
                        >
                          2
                        </a>
                      </li>
                      <li className="paginate_item page-item">
                        <a
                          className="paginate_button next page-link"
                          aria-controls="datatable"
                          data-dt-idx={3}
                          tabIndex={0}
                          id="datatable_next"
                        >
                          <span aria-hidden="true">Next</span>
                        </a>
                      </li>
                    </ul>
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

export default AdminStockProductInWishList;
