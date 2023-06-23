import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminHelpTopicList() {
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
              Help topic
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Help topic Table </h5>
                <button
                  className="btn btn-primary btn-icon-split for-addFaq"
                  data-toggle="modal"
                  data-target="#addModal"
                >
                  <i className="tio-add-circle" />
                  <span className="text">Add FAQ </span>
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="dataTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div
                          className="dataTables_length"
                          id="dataTable_length"
                        >
                          <label>
                            Show{" "}
                            <select
                              name="dataTable_length"
                              aria-controls="dataTable"
                              className="custom-select custom-select-sm form-control form-control-sm"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>{" "}
                            entries
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div
                          id="dataTable_filter"
                          className="dataTables_filter"
                        >
                          <label>
                            Search:
                            <input
                              type="search"
                              className="form-control form-control-sm"
                              placeholder
                              aria-controls="dataTable"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table table-bordered dataTable no-footer"
                          id="dataTable"
                          width="100%"
                          cellSpacing={0}
                          style={{ textAlign: "left", width: "100%" }}
                          role="grid"
                          aria-describedby="dataTable_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                scope="col"
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="SL#: activate to sort column descending"
                                style={{ width: "20.875px" }}
                              >
                                SL#
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Question: activate to sort column ascending"
                                style={{ width: "144.475px" }}
                              >
                                Question
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Answer: activate to sort column ascending"
                                style={{ width: "978.463px" }}
                              >
                                Answer
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Ranking: activate to sort column ascending"
                                style={{ width: "54.425px" }}
                              >
                                Ranking
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Status : activate to sort column ascending"
                                style={{ width: "43.6px" }}
                              >
                                Status{" "}
                              </th>
                              <th
                                scope="col"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Action: activate to sort column ascending"
                                style={{ width: "48.7625px" }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr role="row" className="odd">
                              <td scope="row" className="sorting_1">
                                1
                              </td>
                              <td>
                                How do I remove an item from my shopping cart?
                              </td>
                              <td>
                                To remove an item from your shopping cart,
                                please follow these steps: Desktop: Step 1 - Go
                                to your “Cart”. Step 2 - Click on the “Bin”
                                button to delete your item from your cart or you
                                can add to your "Wishlist".
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={8}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={8}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={8}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="even">
                              <td scope="row" className="sorting_1">
                                2
                              </td>
                              <td>
                                Why am I having trouble placing products in the
                                cart?
                              </td>
                              <td>
                                If you are having trouble placing products in
                                your cart, the reasons could be - The selected
                                color/size is not available to purchase The item
                                is not available in stock right now.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={7}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={7}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={7}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="odd">
                              <td scope="row" className="sorting_1">
                                3
                              </td>
                              <td>
                                How do I know if a product comes with free
                                installation?
                              </td>
                              <td>
                                Free installation is offered for selected
                                products only. Be sure to check the product
                                description of products to get more details
                                about installation.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={6}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={6}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={6}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="even">
                              <td scope="row" className="sorting_1">
                                4
                              </td>
                              <td>
                                Why do I see different prices for the same
                                product?
                              </td>
                              <td>
                                Zambet is a marketplace. We have a huge seller
                                base and each one sources their product
                                differently due to which prices vary for the
                                same product but you can choose depending on
                                your preference as the product quality remains
                                the same.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={5}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={5}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={5}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="odd">
                              <td scope="row" className="sorting_1">
                                5
                              </td>
                              <td>
                                What is the overseas products return policy?
                              </td>
                              <td>
                                The following return policy applies to overseas
                                products and supersedes all other terms and
                                conditions of sales on Zambet and the Zambet
                                Return Policy: Returns for overseas products are
                                only accepted for the reasons listed below: Item
                                is defective or damaged upon delivery. Item is
                                not according to the seller’s specifications
                                mentioned on the website. Item is wrong: the
                                item delivered is not the item you ordered.
                                Note: Returns for overseas products on any other
                                basis will not be accepted.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={4}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={4}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={4}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="even">
                              <td scope="row" className="sorting_1">
                                6
                              </td>
                              <td>
                                How do I know if my product has a warranty?
                              </td>
                              <td>
                                If a warranty is offered on a product, the
                                warranty period will be displayed on the product
                                page, to the right of the product image below
                                “Delivery”. If a product is sold by multiple
                                vendors, the warranty period offered by each
                                vendor will be displayed to the right of the
                                page. Just click on the more information icon on
                                the right side of the Return and Warranty tab to
                                find the detailed warranty information.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={3}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={3}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={3}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="odd">
                              <td scope="row" className="sorting_1">
                                7
                              </td>
                              <td>
                                What are the exciting campaigns on Zambet?
                              </td>
                              <td>
                                Valentines Day Campaign. FataFati Friday
                                Campaign. 12.12” Campaign. Happy New Year
                                Campaign.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={2}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={2}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={2}
                                    >
                                      {" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr role="row" className="even">
                              <td scope="row" className="sorting_1">
                                8
                              </td>
                              <td>What kind of questions can I ask on IM?</td>
                              <td>
                                Do’s Asking product-based queries Asking queries
                                pertaining to product’s warranty, installation,
                                etc. Dont's Sharing contact details Using
                                indecent, impolite language Asking irrelevant
                                queries Using IM for lodging complaints.
                              </td>
                              <td>1</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    className="status status_id"
                                    data-id={1}
                                    defaultChecked
                                  />
                                  <span className="slider round" />
                                </label>
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
                                      className="dropdown-item edit"
                                      style={{ cursor: "pointer" }}
                                      data-toggle="modal"
                                      data-target="#editModal"
                                      data-id={1}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item delete"
                                      style={{ cursor: "pointer" }}
                                      id={1}
                                    >
                                      {" "}
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
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          id="dataTable_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to 8 of 8 entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="dataTable_paginate"
                        >
                          <ul className="pagination">
                            <li
                              className="paginate_button page-item previous disabled"
                              id="dataTable_previous"
                            >
                              <a
                                href="#"
                                aria-controls="dataTable"
                                data-dt-idx={0}
                                tabIndex={0}
                                className="page-link"
                              >
                                Previous
                              </a>
                            </li>
                            <li className="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="dataTable"
                                data-dt-idx={1}
                                tabIndex={0}
                                className="page-link"
                              >
                                1
                              </a>
                            </li>
                            <li
                              className="paginate_button page-item next disabled"
                              id="dataTable_next"
                            >
                              <a
                                href="#"
                                aria-controls="dataTable"
                                data-dt-idx={2}
                                tabIndex={0}
                                className="page-link"
                              >
                                Next
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
          </div>
        </div>
        <div className="modal fade" tabIndex={-1} role="dialog" id="addModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Help Topic</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  {" "}
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form id="addForm">
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                />{" "}
                <div className="modal-body" style={{ textAlign: "left" }}>
                  <div className="form-group">
                    <label>Question</label>
                    <input
                      type="text"
                      className="form-control"
                      name="question"
                      placeholder="Type Question"
                    />
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <textarea
                      className="form-control"
                      name="answer"
                      cols={5}
                      rows={5}
                      placeholder="Type Answer"
                      defaultValue={""}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="control-label">Status</div>
                        <label
                          className="custom-switch"
                          style={{
                            marginLeft: "-2.25rem",
                            marginTop: "10px",
                          }}
                        >
                          <input
                            type="checkbox"
                            name="status"
                            id="e_status"
                            defaultValue={1}
                            className="custom-switch-input"
                          />
                          <span className="custom-switch-indicator" />
                          <span className="custom-switch-description">
                            Active
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="ranking">Ranking</label>
                      <input
                        type="number"
                        name="ranking"
                        className="form-control"
                        autofoucs
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-whitesmoke br">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" tabIndex={-1} role="dialog" id="editModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Modal Help Topic</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  {" "}
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form
                action
                method="post"
                id="editForm"
                style={{ textAlign: "left" }}
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                />
                <div className="modal-body">
                  <div className="form-group">
                    <label>Question</label>
                    <input
                      type="text"
                      className="form-control"
                      name="question"
                      placeholder="Type Question"
                      id="e_question"
                    />
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <textarea
                      className="form-control"
                      name="answer"
                      cols={5}
                      rows={5}
                      placeholder="Type Answer"
                      id="e_answer"
                      defaultValue={""}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <label htmlFor="ranking">Ranking</label>
                      <input
                        type="number"
                        name="ranking"
                        className="form-control"
                        id="e_ranking"
                        required
                        autofoucs
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
                <div className="modal-footer bg-whitesmoke br">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
          <div className="footer">
            <div className="row justify-content-between align-items-center">
              <div className="col">
                <p className="font-size-sm mb-0">
                  {" "}
                  <span className="d-none d-sm-inline-block">
                    Copyright © 2022 Zambet
                  </span>
                </p>
              </div>
              <div className="col-auto">
                <div className="d-flex justify-content-end">
                  <ul className="list-inline list-separator">
                    <li className="list-inline-item">
                      <a
                        className="list-separator-link"
                        href="/admin/business-settings/web-config"
                      >
                        {" "}
                        Settings
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        className="list-separator-link"
                        href="/admin/helpTopic/list"
                      >
                        FAQ
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <div className="hs-unfold">
                        <a
                          className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                          href="/admin/dashboard"
                          data-hs-unfold-invoker
                        >
                          <i className="tio-home-outlined" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="logoutModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ready to Leave?
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select Logout below if you are ready to end your current
                  session.
                </div>
                <div className="modal-footer">
                  <form>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                    />{" "}
                    <button
                      className="btn btn-danger"
                      type="button"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" id="popup-modal">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <center>
                        <h2 style={{ color: "rgba(96,96,96,0.68)" }}>
                          <i className="tio-shopping-cart-outlined" /> You have
                          new order, Check Please.
                        </h2>
                        <hr />
                        <button
                          onclick="check_order()"
                          className="btn btn-primary"
                        >
                          Ok, let me check
                        </button>
                      </center>
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

export default AdminHelpTopicList;
