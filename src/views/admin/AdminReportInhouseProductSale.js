import React from "react";

function AdminReportInhouseProductSale() {
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
                  InHouse product sale report
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
                  <div className="flex-between row">
                    <div className="col-2 text-center">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Category</label>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="form-group">
                        <select
                          className="js-select2-custom form-control select2-hidden-accessible"
                          name="category_id"
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="all" data-select2-id={3}>
                            All
                          </option>
                          <option value={37} data-select2-id={4}>
                            Women's Fashion
                          </option>
                          <option value={38} data-select2-id={5}>
                            Men's Fashion
                          </option>
                          <option value={39} data-select2-id={6}>
                            Phones &amp; Telecom
                          </option>
                          <option value={40} data-select2-id={7}>
                            Computer, Office &amp; Security
                          </option>
                          <option value={43} data-select2-id={8}>
                            Jewelry &amp; Watches
                          </option>
                          <option value={44} data-select2-id={9}>
                            Home, Pet &amp; Appliances
                          </option>
                          <option value={45} data-select2-id={10}>
                            Bags &amp; Shoes
                          </option>
                          <option value={46} data-select2-id={11}>
                            Toys , Kids &amp; Babies
                          </option>
                          <option value={47} data-select2-id={12}>
                            Outdoor Fun &amp; Sports
                          </option>
                          <option value={114} data-select2-id={13}>
                            Home Improvement &amp; Tools
                          </option>
                          <option value={116} data-select2-id={14}>
                            Beauty, Health &amp; Hair
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
                              aria-labelledby="select2-category_id-g4-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-category_id-g4-container"
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
                    <div className="col-12 col-md-3">
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
                      <td>Ledger nano s - the best crypto hardware wallet</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        iOttie easy one touch 4 dash &amp; windshield car mount
                        phone holder desk
                      </td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        Subrtex 1-piece knit jacquard spandex stretch , sofa,
                        milky
                      </td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>
                        Progress lighting P4009-10 5-light chandelier, polished
                        brass
                      </td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>
                        Dove body wash with pump with skin natural nourishers
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Hardside carry-on spinner suitcase luggage</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Dual alarm clock with bed shaker</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Timex marlin stainless steel hand-wound movement</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>
                        Dove advanced care antiperspirant deodorant stick for
                        women
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>
                        The school of life - emotional baggage tote bag - canvas
                        tote bag (navy)
                      </td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th scope="row">11</th>
                      <td>Samsung Galaxy S20 FE 5G</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">12</th>
                      <td>Teifoc house tile roof brick construction set toy</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">13</th>
                      <td>Advanced elements stash pak roll top dry bag</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <th scope="row">14</th>
                      <td>Munchkin snack catcher, 2 pack, blue/green</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">15</th>
                      <td>
                        Women's long-sleeve lightweight french terry fleece
                        quarter-zip top
                      </td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <th scope="row">16</th>
                      <td>Apple iPhone XS max, 256GB, gold - fully unlocked</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
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

export default AdminReportInhouseProductSale;
