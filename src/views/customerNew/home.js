import React from "react";
// import $ from "jquery";

// function myFunction() {
//   $("#anouncement").addClass("d-none").removeClass("d-flex");
// }

function Home1() {
  return (
    <>
      <header className="box-shadow-sm rtl">
        <div className="topbar">
          <div className="container ">
            <div>
              <div className="topbar-text dropdown disable-autohide mr-3 text-capitalize">
                <a
                  className="topbar-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                >
                  <img
                    className="mr-2"
                    width={20}
                    src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png"
                    alt="Eng"
                  />
                  english
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-left"
                  style={{ textAlign: "left" }}
                >
                  <li>
                    <a className="dropdown-item pb-1" href="/lang/en">
                      <img
                        className="mr-2"
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png"
                        alt="english"
                      />
                      <span style={{ textTransform: "capitalize" }}>
                        english
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item pb-1" href="/lang/sa">
                      <img
                        className="mr-2"
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/front-end/img/flags/sa.png"
                        alt="عربي"
                      />
                      <span style={{ textTransform: "capitalize" }}>عربي</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topbar-text dropdown disable-autohide">
                <a
                  className="topbar-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                >
                  <span>USD ₹</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-left"
                  style={{ minWidth: "160px!important", textAlign: "left" }}
                >
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onclick="currency_change('USD')"
                  >
                    USD
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onclick="currency_change(' INR')"
                  >
                    INR
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onclick="currency_change('INR')"
                  >
                    Indian Rupi
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onclick="currency_change('ZAR')"
                  >
                    ZAR
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onclick="currency_change('MYR')"
                  >
                    Ringgit
                  </li>
                </ul>
              </div>
            </div>
            <div className="topbar-text dropdown d-md-none ml-auto">
              <a className="topbar-link" href="tel: +88017 00000000">
                <i className="fa fa-phone" /> +88017 00000000
              </a>
            </div>
            <div className="d-none d-md-block ml-3 text-nowrap">
              <a
                className="topbar-link d-none d-md-inline-block"
                href="tel:+88017 00000000"
              >
                <i className="fa fa-phone" /> +88017 00000000
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-sticky bg-light mobile-head">
          <div className="navbar navbar-expand-md navbar-light">
            <div className="container ">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <a
                className="navbar-brand d-none d-sm-block mr-3 flex-shrink-0"
                href="/"
                style={{ minWidth: "7rem" }}
              >
                <img
                  width={250}
                  height={60}
                  style={{ height: "60px!important" }}
                  src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b218f20766.png"
                  alt="6Valley"
                />
              </a>
              <a className="navbar-brand d-sm-none mr-2" href="/">
                <img
                  width={100}
                  height={60}
                  style={{ height: "38px!important" }}
                  className="mobile-logo-img"
                  src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b21aa4c126.png"
                  alt="6Valley"
                />
              </a>
              <div
                className="input-group-overlay d-none d-md-block mx-4"
                style={{ textAlign: "left" }}
              >
                <form className="search_form">
                  <input
                    className="form-control appended-form-control search-bar-input"
                    type="text"
                    autoComplete="off"
                    placeholder="Search"
                    name="name"
                  />
                  <button
                    className="input-group-append-overlay search_button"
                    type="submit"
                    style={{
                      borderRadius: "0px 7px 7px 0px",
                      left: "unset",
                      right: 0,
                    }}
                  >
                    <span
                      className="input-group-text"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="czi-search text-white" />
                    </span>
                  </button>
                  <input name="data_from" defaultValue="search" hidden />
                  <input name="page" defaultValue={1} hidden />
                  <div
                    className="card search-card"
                    style={{
                      position: "absolute",
                      background: "white",
                      zIndex: 999,
                      width: "100%",
                      display: "none",
                    }}
                  >
                    <div
                      className="card-body search-result-box"
                      style={{
                        overflow: "scroll",
                        height: "400px",
                        overflowX: "hidden",
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="navbar-toolbar d-flex flex-shrink-0 align-items-center">
                <a className="navbar-tool navbar-stuck-toggler" href="#">
                  <span className="navbar-tool-tooltip">Expand menu</span>
                  <div className="navbar-tool-icon-box">
                    <i className="navbar-tool-icon czi-menu" />
                  </div>
                </a>
                <div className="navbar-tool dropdown ml-3">
                  <a
                    className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                    href="/wishlists"
                  >
                    <span className="navbar-tool-label">
                      <span className="countWishlist">0</span>
                    </span>
                    <i className="navbar-tool-icon czi-heart" />
                  </a>
                </div>
                <div className="dropdown">
                  <a
                    className="navbar-tool ml-3"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="navbar-tool-icon-box bg-secondary">
                      <div className="navbar-tool-icon-box bg-secondary">
                        <i className="navbar-tool-icon czi-user" />
                      </div>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-left"
                    aria-labelledby="dropdownMenuButton"
                    style={{ textAlign: "left" }}
                  >
                    <a className="dropdown-item" href="/customer/auth/login">
                      <i className="fa fa-sign-in mr-2" /> Sign in
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="/customer/auth/register">
                      <i className="fa fa-user-circle mr-2" />
                      Sign up
                    </a>
                  </div>
                </div>
                <div id="cart_items">
                  <div
                    className="navbar-tool dropdown ml-3"
                    style={{ marginRight: "6px" }}
                  >
                    <a
                      className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                      href="/shop-cart"
                    >
                      <span className="navbar-tool-label">0</span>
                      <i className="navbar-tool-icon czi-cart" />
                    </a>
                    <a className="navbar-tool-text" href="/shop-cart">
                      <small>My cart</small>
                      0.00₹
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      style={{ width: "20rem" }}
                    >
                      <div className="widget widget-cart px-3 pt-2 pb-3">
                        <div className="widget-cart-item">
                          <h6 className="text-danger text-center">
                            <i className="fa fa-cart-arrow-down" /> Empty Cart
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar navbar-expand-md navbar-stuck-menu">
            <div className="container">
              <div
                className="collapse navbar-collapse"
                id="navbarCollapse"
                style={{ textAlign: "left" }}
              >
                <div className="input-group-overlay d-md-none my-3">
                  <form className="search_form">
                    <input
                      className="form-control appended-form-control search-bar-input-mobile"
                      type="text"
                      autoComplete="off"
                      placeholder="Search"
                      name="name"
                    />
                    <input name="data_from" defaultValue="search" hidden />
                    <input name="page" defaultValue={1} hidden />
                    <button
                      className="input-group-append-overlay search_button"
                      type="submit"
                      style={{
                        borderRadius: "0px 7px 7px 0px",
                        left: "unset",
                        right: 0,
                      }}
                    >
                      <span
                        className="input-group-text"
                        style={{ fontSize: "20px" }}
                      >
                        <i className="czi-search text-white" />
                      </span>
                    </button>
                    <div
                      className="card search-card"
                      style={{
                        position: "absolute",
                        background: "white",
                        zIndex: 999,
                        width: "100%",
                        display: "none",
                      }}
                    >
                      <div
                        className="card-body search-result-box"
                        id
                        style={{
                          overflow: "scroll",
                          height: "400px",
                          overflowX: "hidden",
                        }}
                      />
                    </div>
                  </form>
                </div>
                <ul className="navbar-nav mega-nav pr-2 pl-2 mr-2 d-none d-xl-block ">
                  <li className="nav-item ">
                    <a
                      className="nav-link dropdown-toggle pl-0"
                      href="#"
                      data-toggle="dropdown"
                      style={{ pointerEvents: "none" }}
                    >
                      <i className="czi-menu align-middle mt-n1 mr-2" />
                      <span
                        style={{
                          marginLeft: "40px !important",
                          marginRight: "50px",
                        }}
                      >
                        Categories
                      </span>
                    </a>
                    <ul
                      className="dropdown-menu"
                      style={{
                        right: "0%",
                        display: "block!important",
                        marginTop: "7px",
                        boxShadow: "none",
                        minWidth: "303px !important",
                        marginLeft: "1px!important",
                        textAlign: "left",
                        paddingBottom: "0px!important",
                      }}
                    >
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          data-toggle="dropdown"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=37&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005824487f2a.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">Women's Fashion</span>
                          </div>
                          <div>
                            <i className="czi-arrow-right" />
                          </div>
                        </a>
                        <ul
                          className="dropdown-menu"
                          style={{ right: "100%", textAlign: "left" }}
                        >
                          <li className="dropdown">
                            <a
                              className="dropdown-item flex-between"
                              data-toggle="dropdown"
                              href="javascript:"
                              onclick="location.href='https://6valley.6amtech.com/products?id=50&data_from=category&page=1'"
                            >
                              <div>
                                <span className="pl-3">Women's Fashion</span>
                              </div>
                              <div>
                                <i className="czi-arrow-right" />
                              </div>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=54&data_from=category&page=1"
                                >
                                  Dresses
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item flex-between"
                              data-toggle="dropdown"
                              href="javascript:"
                              onclick="location.href='https://6valley.6amtech.com/products?id=52&data_from=category&page=1'"
                            >
                              <div>
                                <span className="pl-3">Bottoms</span>
                              </div>
                              <div>
                                <i className="czi-arrow-right" />
                              </div>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=60&data_from=category&page=1"
                                >
                                  Leggings
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=61&data_from=category&page=1"
                                >
                                  Skirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=62&data_from=category&page=1"
                                >
                                  Jeans
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          data-toggle="dropdown"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=38&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-60058875d2cc0.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">Men's Fashion</span>
                          </div>
                          <div>
                            <i className="czi-arrow-right" />
                          </div>
                        </a>
                        <ul
                          className="dropdown-menu"
                          style={{ right: "100%", textAlign: "left" }}
                        >
                          <li className="dropdown">
                            <a
                              className="dropdown-item flex-between"
                              data-toggle="dropdown"
                              href="javascript:"
                              onclick="location.href='https://6valley.6amtech.com/products?id=70&data_from=category&page=1'"
                            >
                              <div>
                                <span className="pl-3">Hot Sale</span>
                              </div>
                              <div>
                                <i className="czi-arrow-right" />
                              </div>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=73&data_from=category&page=1"
                                >
                                  Hoodies &amp; Sweatshirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=74&data_from=category&page=1"
                                >
                                  T-Shirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=75&data_from=category&page=1"
                                >
                                  Shirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=76&data_from=category&page=1"
                                >
                                  Casual Shorts
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item flex-between"
                              href="javascript:"
                              onclick="location.href='https://6valley.6amtech.com/products?id=72&data_from=category&page=1'"
                            >
                              <div>
                                <span className="pl-3">
                                  Outerwear &amp; Jackets
                                </span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          data-toggle="dropdown"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=39&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005895a1a598.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">Phones &amp; Telecom</span>
                          </div>
                          <div>
                            <i className="czi-arrow-right" />
                          </div>
                        </a>
                        <ul
                          className="dropdown-menu"
                          style={{ right: "100%", textAlign: "left" }}
                        >
                          <li className="dropdown">
                            <a
                              className="dropdown-item flex-between"
                              data-toggle="dropdown"
                              href="javascript:"
                              onclick="location.href='https://6valley.6amtech.com/products?id=79&data_from=category&page=1'"
                            >
                              <div>
                                <span className="pl-3">Hot Brands</span>
                              </div>
                              <div>
                                <i className="czi-arrow-right" />
                              </div>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=85&data_from=category&page=1"
                                >
                                  Realme
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=86&data_from=category&page=1"
                                >
                                  OnePlus
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=87&data_from=category&page=1"
                                >
                                  Huawei
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=88&data_from=category&page=1"
                                >
                                  iPhones
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item flex-between"
                              href="javascript:"
                              onclick="location.href='https://6valley.6amtech.com/products?id=80&data_from=category&page=1'"
                            >
                              <div>
                                <span className="pl-3">Mobile Phones</span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=40&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-60058ae151ac8.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">
                              Computer, Office &amp; Security
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=43&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-60058fe5da3e9.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">Jewelry &amp; Watches</span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=44&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-600592ae7f7a2.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">
                              Home, Pet &amp; Appliances
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=45&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-600593b1655ba.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">Bags &amp; Shoes</span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=46&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-600594d3c0c2e.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">
                              Toys , Kids &amp; Babies
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=47&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005963dddfd4.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">
                              Outdoor Fun &amp; Sports
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=114&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-22-600a98a5137e6.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">
                              Home Improvement &amp; Tools
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item flex-between"
                          href="javascript:"
                          onclick="location.href='https://6valley.6amtech.com/products?id=116&data_from=category&page=1'"
                        >
                          <div>
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/category/2021-01-22-600a98d6862ce.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span className="pl-3">
                              Beauty, Health &amp; Hair
                            </span>
                          </div>
                        </a>
                      </li>
                      <a
                        className="dropdown-item"
                        href="/categories"
                        style={{ left: "29%" }}
                      >
                        View more
                      </a>
                    </ul>
                  </li>
                </ul>
                <ul className="navbar-nav mega-nav1 pr-2 pl-2 d-block d-xl-none">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle pl-0"
                      href="#"
                      data-toggle="dropdown"
                    >
                      <i className="czi-menu align-middle mt-n1 mr-2" />
                      <span style={{ marginLeft: "20px !important" }}>
                        Categories
                      </span>
                    </a>
                    <ul
                      className="dropdown-menu"
                      style={{ right: "0%", textAlign: "left" }}
                    >
                      <li className="dropdown">
                        <a
                          className="dropdown-item dropdown-toggle "
                          data-toggle="dropdown"
                          href="/products?id=37&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005824487f2a.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Women's Fashion</span>
                        </a>
                        <ul
                          className="dropdown-menu"
                          style={{ right: "100%", textAlign: "left" }}
                        >
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle "
                              data-toggle="dropdown"
                              href="/products?id=50&data_from=category&page=1"
                            >
                              <span className="pl-3">Women's Fashion</span>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=54&data_from=category&page=1"
                                >
                                  Dresses
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle "
                              data-toggle="dropdown"
                              href="/products?id=52&data_from=category&page=1"
                            >
                              <span className="pl-3">Bottoms</span>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=60&data_from=category&page=1"
                                >
                                  Leggings
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=61&data_from=category&page=1"
                                >
                                  Skirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=62&data_from=category&page=1"
                                >
                                  Jeans
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item dropdown-toggle "
                          data-toggle="dropdown"
                          href="/products?id=38&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-60058875d2cc0.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Men's Fashion</span>
                        </a>
                        <ul
                          className="dropdown-menu"
                          style={{ right: "100%", textAlign: "left" }}
                        >
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle "
                              data-toggle="dropdown"
                              href="/products?id=70&data_from=category&page=1"
                            >
                              <span className="pl-3">Hot Sale</span>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=73&data_from=category&page=1"
                                >
                                  Hoodies &amp; Sweatshirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=74&data_from=category&page=1"
                                >
                                  T-Shirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=75&data_from=category&page=1"
                                >
                                  Shirts
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=76&data_from=category&page=1"
                                >
                                  Casual Shorts
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item  "
                              href="/products?id=72&data_from=category&page=1"
                            >
                              <span className="pl-3">
                                Outerwear &amp; Jackets
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item dropdown-toggle "
                          data-toggle="dropdown"
                          href="/products?id=39&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005895a1a598.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Phones &amp; Telecom</span>
                        </a>
                        <ul
                          className="dropdown-menu"
                          style={{ right: "100%", textAlign: "left" }}
                        >
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle "
                              data-toggle="dropdown"
                              href="/products?id=79&data_from=category&page=1"
                            >
                              <span className="pl-3">Hot Brands</span>
                            </a>
                            <ul
                              className="dropdown-menu"
                              style={{ right: "100%", textAlign: "left" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=85&data_from=category&page=1"
                                >
                                  Realme
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=86&data_from=category&page=1"
                                >
                                  OnePlus
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=87&data_from=category&page=1"
                                >
                                  Huawei
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/products?id=88&data_from=category&page=1"
                                >
                                  iPhones
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item  "
                              href="/products?id=80&data_from=category&page=1"
                            >
                              <span className="pl-3">Mobile Phones</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=40&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-60058ae151ac8.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Computer, Office &amp; Security
                          </span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=43&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-60058fe5da3e9.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Jewelry &amp; Watches</span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=44&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-600592ae7f7a2.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Home, Pet &amp; Appliances
                          </span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=45&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-600593b1655ba.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Bags &amp; Shoes</span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=46&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-600594d3c0c2e.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Toys , Kids &amp; Babies</span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=47&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005963dddfd4.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">Outdoor Fun &amp; Sports</span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=114&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-22-600a98a5137e6.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Home Improvement &amp; Tools
                          </span>
                        </a>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-item  "
                          href="/products?id=116&data_from=category&page=1"
                        >
                          <img
                            src="https://6valley.6amtech.com/storage/app/public/category/2021-01-22-600a98d6862ce.png"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="pl-3">
                            Beauty, Health &amp; Hair
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="navbar-nav" style={{}}>
                  <li className="nav-item dropdown active">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                    >
                      All Brands
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-left scroll-bar"
                      style={{ textAlign: "left" }}
                    >
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=15&data_from=brand&page=1"
                          >
                            Great Hall
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 8 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=14&data_from=brand&page=1"
                          >
                            Yo Merce
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 4 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=13&data_from=brand&page=1"
                          >
                            Center Point
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 8 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=12&data_from=brand&page=1"
                          >
                            Framerce
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 4 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=11&data_from=brand&page=1"
                          >
                            Modentum
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 3 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=10&data_from=brand&page=1"
                          >
                            Hexanate
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 2 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=9&data_from=brand&page=1"
                          >
                            TrueMake
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 1 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=8&data_from=brand&page=1"
                          >
                            Vivatiqo
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 4 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=7&data_from=brand&page=1"
                          >
                            Market Miracle
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 2 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=6&data_from=brand&page=1"
                          >
                            Axxelus
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 4 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=5&data_from=brand&page=1"
                          >
                            Arkohub
                          </a>
                        </div>
                        <div className="align-baseline"></div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=4&data_from=brand&page=1"
                          >
                            Crave
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 5 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=3&data_from=brand&page=1"
                          >
                            Dynamova
                          </a>
                        </div>
                        <div className="align-baseline"></div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=2&data_from=brand&page=1"
                          >
                            The Wall
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 10 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            href="/products?id=1&data_from=brand&page=1"
                          >
                            Tell Us
                          </a>
                        </div>
                        <div className="align-baseline">
                          <span className="count-value px-2">( 3 )</span>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottom: "1px solid #e3e9ef",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <a className="dropdown-item" href="/brands">
                            View more
                          </a>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown active">
                    <a
                      className="nav-link text-capitalize"
                      href="/products?data_from=discounted&page=1"
                    >
                      Discounted products
                    </a>
                  </li>
                  <li className="nav-item dropdown active">
                    <a className="nav-link" href="/sellers">
                      All Sellers
                    </a>
                  </li>
                  <li className="nav-item">
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{
                          color: "white",
                          marginTop: "5px",
                          paddingLeft: 0,
                        }}
                      >
                        Seller Zone
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                        style={{
                          minWidth: "165px !important",
                          textAlign: "left",
                        }}
                      >
                        <a className="dropdown-item" href="/shop/apply">
                          Become a Seller
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="/seller/auth/login">
                          Seller Login
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-transparent mb-3">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <div className="row rtl">
                <div className="col-xl-3 d-none d-xl-block">
                  <div className="just-padding" />
                </div>
                <div
                  className="col-xl-9 col-md-12"
                  style={{ marginTop: "11px" }}
                >
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={0}
                        className="active"
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={1}
                        className
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={2}
                        className
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={3}
                        className
                      ></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <a href="https://demo.6amtech.com/6valley/">
                          <img
                            className="d-block w-100"
                            style={{ maxHeight: "350px" }}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb557b353a.png"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="carousel-item">
                        <a href="https://demo.6amtech.com/6valley/">
                          <img
                            className="d-block w-100"
                            style={{ maxHeight: "350px" }}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb56516532.png"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="carousel-item">
                        <a href="https://demo.6amtech.com/6valley/">
                          <img
                            className="d-block w-100"
                            style={{ maxHeight: "350px" }}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb572615c5.png"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="carousel-item">
                        <a href="https://demo.6amtech.com/6valley/">
                          <img
                            className="d-block w-100"
                            style={{ maxHeight: "350px" }}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb5a25c0aa.png"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <div className="row mt-2">
                    <div className="col-4">
                      <a
                        data-toggle="modal"
                        data-target="#quick_banner9"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          className="d-block footer_banner_img"
                          style={{ width: "100%" }}
                          src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc5683da8a.png"
                        />
                      </a>
                    </div>
                    <div
                      className="modal fade"
                      id="quick_banner9"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="exampleModalLongTitle"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <p
                              className="modal-title"
                              id="exampleModalLongTitle"
                            >
                              Banner photo
                            </p>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <img
                              className="d-block mx-auto"
                              src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc5683da8a.png"
                            />
                            <div className="text-center mt-2">
                              <a
                                href="https://demo.6amtech.com/6valley/"
                                className="btn btn-outline-accent"
                              >
                                Explore Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <a
                        data-toggle="modal"
                        data-target="#quick_banner8"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          className="d-block footer_banner_img"
                          style={{ width: "100%" }}
                          src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc55ae4e57.png"
                        />
                      </a>
                    </div>
                    <div
                      className="modal fade"
                      id="quick_banner8"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="exampleModalLongTitle"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <p
                              className="modal-title"
                              id="exampleModalLongTitle"
                            >
                              Banner photo
                            </p>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <img
                              className="d-block mx-auto"
                              src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc55ae4e57.png"
                            />
                            <div className="text-center mt-2">
                              <a
                                href="https://demo.6amtech.com/6valley/product/advanced-elements-stash-pak-roll-top-dry-bag-yIebrm"
                                className="btn btn-outline-accent"
                              >
                                Explore Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <a
                        data-toggle="modal"
                        data-target="#quick_banner7"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          className="d-block footer_banner_img"
                          style={{ width: "100%" }}
                          src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc52cc38e0.png"
                        />
                      </a>
                    </div>
                    <div
                      className="modal fade"
                      id="quick_banner7"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="exampleModalLongTitle"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <p
                              className="modal-title"
                              id="exampleModalLongTitle"
                            >
                              Banner photo
                            </p>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <img
                              className="d-block mx-auto"
                              src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc52cc38e0.png"
                            />
                            <div className="text-center mt-2">
                              <a
                                href="https://demo.6amtech.com/6valley/"
                                className="btn btn-outline-accent"
                              >
                                Explore Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row section-header fd rtl mx-0">
              <div className style={{ paddingLeft: 0 }}>
                <div className="d-inline-flex displayTab">
                  <span className="flash_deal_title ">Flash Deal</span>
                </div>
              </div>
              <div className style={{ paddingRight: 0 }}>
                <div className="row view_all view-btn-div-f float-right mx-0">
                  <div className="pr-2">
                    <span
                      className="cz-countdown"
                      data-countdown="06/07/2023 11:59:00 PM"
                    >
                      <span className="cz-countdown-days">
                        <span className="cz-countdown-value">422</span>
                      </span>
                      <span className="cz-countdown-value">:</span>
                      <span className="cz-countdown-hours">
                        <span className="cz-countdown-value">06</span>
                      </span>
                      <span className="cz-countdown-value">:</span>
                      <span className="cz-countdown-minutes">
                        <span className="cz-countdown-value">49</span>
                      </span>
                      <span className="cz-countdown-value">:</span>
                      <span className="cz-countdown-seconds">
                        <span className="cz-countdown-value">32</span>
                      </span>
                    </span>
                  </div>
                  <div className>
                    <a
                      className="btn btn-outline-accent btn-sm viw-btn-a"
                      href="/flash-deals/1"
                    >
                      View all
                      <i className="czi-arrow-right ml-1 mr-n1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="owl-carousel owl-theme mt-2 owl-loaded owl-drag"
              id="flash-deal-slider"
            >
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(-3137px, 0px, 0px)",
                    transition: "all 0.25s ease 0s",
                    width: "7217px",
                  }}
                >
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/iottie-easy-one-touch-4-dash-windshield-car-mount-phone-holder-desk-RIYkNs'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbf645f07b.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              iOttie easy one touch 4 dash &amp; windshield car
                              mount phone holder desk
                            </h6>
                            <div className="flash-product-price">23.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/hardside-carry-on-spinner-suitcase-luggage-3TtnI7'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b122d9b7dc8.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Hardside carry-on spinner suitcase luggage
                            </h6>
                            <div className="flash-product-price">81.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/nylon-usb-a-to-lightning-cable-cord-mfi-certified-charger-for-apple-iphone-ipad-dark-gray-6-ft-2-pack-a1v9uQ'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e6bfc765f.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Nylon USB-A to Lightning Cable Cord, MFi Certified
                              Charger for Apple iPhone, iPa
                            </h6>
                            <div className="flash-product-price">10.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/universal-laptop-docking-station-dual-monitor-for-windows-and-mac-dual-video-hdmi-and-dvivgahdmi-gigabit-ethernet-audio-'"
                    >
                      <div className="discount-top-f">
                        <span className="for-discoutn-value pl-1 pr-1">
                          10% Off
                        </span>
                      </div>
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e9c51ed78.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Universal Laptop Docking Station Dual Monitor for
                              Windows and Mac (Dual Video: H
                            </h6>
                            <div className="flash-product-price">
                              90.00₹
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                100.00₹
                              </strike>
                            </div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/the-school-of-life-emotional-baggage-tote-bag-canvas-tote-bag-navy-A8DmRl'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b12a949e4c0.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              The school of life - emotional baggage tote bag -
                              canvas tote bag (navy)
                            </h6>
                            <div className="flash-product-price">5.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/ultimate-lightest-wireless-gaming-mouse-fastest-gaming-switches-20k-dpi-3ZcJ9B'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e30d84ce6.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Ultimate Lightest Wireless Gaming Mouse: Fastest
                              Gaming Switches - 20K DPI
                            </h6>
                            <div className="flash-product-price">25.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf'"
                    >
                      <div className="discount-top-f">
                        <span className="for-discoutn-value pl-1 pr-1">
                          3.00₹ Off
                        </span>
                      </div>
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abca58607c9.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Subrtex 1-piece knit jacquard spandex stretch ,
                              sofa, milky
                            </h6>
                            <div className="flash-product-price">
                              38.00₹
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                41.00₹
                              </strike>
                            </div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <label className="badge-style2">( 1 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/timex-marlin-stainless-steel-hand-wound-movement-aR1p9K'"
                    >
                      <div className="discount-top-f">
                        <span className="for-discoutn-value pl-1 pr-1">
                          10.00₹ Off
                        </span>
                      </div>
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b127b2ebb07.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Timex marlin stainless steel hand-wound movement
                            </h6>
                            <div className="flash-product-price">
                              38.00₹
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                48.00₹
                              </strike>
                            </div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/lodge-l8sk3-10-14-inch-pre-seasoned-skillet-38fD1l'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e86c5ef75.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Lodge L8SK3 10-1/4-Inch Pre-Seasoned Skillet
                            </h6>
                            <div className="flash-product-price">20.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/2-slice-extra-wide-slot-toaster-with-6-shade-settings-black-2r6da5'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e4e0b9055.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              2 Slice, Extra-Wide Slot Toaster with 6 Shade
                              Settings, Black
                            </h6>
                            <div className="flash-product-price">40.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/advanced-elements-stash-pak-roll-top-dry-bag-yIebrm'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb1a31bea5c.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Advanced elements stash pak roll top dry bag
                            </h6>
                            <div className="flash-product-price">50.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/iottie-easy-one-touch-4-dash-windshield-car-mount-phone-holder-desk-RIYkNs'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbf645f07b.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              iOttie easy one touch 4 dash &amp; windshield car
                              mount phone holder desk
                            </h6>
                            <div className="flash-product-price">23.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/hardside-carry-on-spinner-suitcase-luggage-3TtnI7'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b122d9b7dc8.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Hardside carry-on spinner suitcase luggage
                            </h6>
                            <div className="flash-product-price">81.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/nylon-usb-a-to-lightning-cable-cord-mfi-certified-charger-for-apple-iphone-ipad-dark-gray-6-ft-2-pack-a1v9uQ'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e6bfc765f.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Nylon USB-A to Lightning Cable Cord, MFi Certified
                              Charger for Apple iPhone, iPa
                            </h6>
                            <div className="flash-product-price">10.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/universal-laptop-docking-station-dual-monitor-for-windows-and-mac-dual-video-hdmi-and-dvivgahdmi-gigabit-ethernet-audio-'"
                    >
                      <div className="discount-top-f">
                        <span className="for-discoutn-value pl-1 pr-1">
                          10% Off
                        </span>
                      </div>
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e9c51ed78.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Universal Laptop Docking Station Dual Monitor for
                              Windows and Mac (Dual Video: H
                            </h6>
                            <div className="flash-product-price">
                              90.00₹
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                100.00₹
                              </strike>
                            </div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/the-school-of-life-emotional-baggage-tote-bag-canvas-tote-bag-navy-A8DmRl'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b12a949e4c0.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              The school of life - emotional baggage tote bag -
                              canvas tote bag (navy)
                            </h6>
                            <div className="flash-product-price">5.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/ultimate-lightest-wireless-gaming-mouse-fastest-gaming-switches-20k-dpi-3ZcJ9B'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e30d84ce6.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Ultimate Lightest Wireless Gaming Mouse: Fastest
                              Gaming Switches - 20K DPI
                            </h6>
                            <div className="flash-product-price">25.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf'"
                    >
                      <div className="discount-top-f">
                        <span className="for-discoutn-value pl-1 pr-1">
                          3.00₹ Off
                        </span>
                      </div>
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abca58607c9.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Subrtex 1-piece knit jacquard spandex stretch ,
                              sofa, milky
                            </h6>
                            <div className="flash-product-price">
                              38.00₹
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                41.00₹
                              </strike>
                            </div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <i className="sr-star czi-star-filled active" />
                              <label className="badge-style2">( 1 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/timex-marlin-stainless-steel-hand-wound-movement-aR1p9K'"
                    >
                      <div className="discount-top-f">
                        <span className="for-discoutn-value pl-1 pr-1">
                          10.00₹ Off
                        </span>
                      </div>
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b127b2ebb07.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Timex marlin stainless steel hand-wound movement
                            </h6>
                            <div className="flash-product-price">
                              38.00₹
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                48.00₹
                              </strike>
                            </div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/lodge-l8sk3-10-14-inch-pre-seasoned-skillet-38fD1l'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e86c5ef75.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Lodge L8SK3 10-1/4-Inch Pre-Seasoned Skillet
                            </h6>
                            <div className="flash-product-price">20.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/2-slice-extra-wide-slot-toaster-with-6-shade-settings-black-2r6da5'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180e4e0b9055.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              2 Slice, Extra-Wide Slot Toaster with 6 Shade
                              Settings, Black
                            </h6>
                            <div className="flash-product-price">40.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/advanced-elements-stash-pak-roll-top-dry-bag-yIebrm'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb1a31bea5c.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Advanced elements stash pak roll top dry bag
                            </h6>
                            <div className="flash-product-price">50.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.75px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/iottie-easy-one-touch-4-dash-windshield-car-mount-phone-holder-desk-RIYkNs'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbf645f07b.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              iOttie easy one touch 4 dash &amp; windshield car
                              mount phone holder desk
                            </h6>
                            <div className="flash-product-price">23.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots">
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot active">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container rtl">
        <div className="section-header">
          <div className="feature_header" style={{ color: "black" }}>
            <span> Brands</span>
          </div>
          <div>
            <a
              className="btn btn-outline-accent btn-sm viw-btn-a"
              href="/brands"
            >
              View all
              <i className="czi-arrow-right ml-1 mr-n1" />
            </a>
          </div>
        </div>
        <div className="mt-2 mb-3 brand-slider">
          <div
            className="owl-carousel owl-theme owl-loaded owl-drag"
            id="brands-slider"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0.75s ease 0s",
                  width: "1575px",
                }}
              >
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=1&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc0276d5f6.png"
                          alt="Tell Us"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=2&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc010711e8.png"
                          alt="The Wall"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=3&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbff8c9b3a.png"
                          alt="Dynamova"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=4&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbfdf21a46.png"
                          alt="Crave"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=5&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbfc8aa2ab.png"
                          alt="Arkohub"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=6&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbfae55b5d.png"
                          alt="Axxelus"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=7&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbf958ea62.png"
                          alt="Market Miracle"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=8&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbf64a5c67.png"
                          alt="Vivatiqo"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=9&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bbec6c5729.png"
                          alt="TrueMake"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=10&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc216aa62e.png"
                          alt="Hexanate"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=11&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc22c4398a.png"
                          alt="Modentum"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=12&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc23b9ea8d.png"
                          alt="Framerce"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=13&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc249c1fda.png"
                          alt="Center Point"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=14&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc25a6acfd.png"
                          alt="Yo Merce"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "95px", marginRight: "10px" }}
                >
                  <div className="text-center">
                    <a href="/products?id=15&data_from=brand&page=1">
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "100px" }}
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/brand/2021-10-29-617bc26d522ad.png"
                          alt="Great Hall"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav disabled">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots">
              <button role="button" className="owl-dot active">
                <span />
              </button>
              <button role="button" className="owl-dot">
                <span />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container rtl">
        <div className="section-header">
          <div className="feature_header">
            <span className="for-feature-title">Featured Products</span>
          </div>
          <div>
            <a
              className="btn btn-outline-accent btn-sm viw-btn-a"
              href="/products?data_from=featured&page=1"
            >
              View all
              <i className="czi-arrow-right ml-1 mr-n1" />
            </a>
          </div>
        </div>
        <div className="row mt-2 mb-3">
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div
                  className="d-flex"
                  style={{ right: 0, top: 0, position: "absolute" }}
                >
                  <span className="for-discoutn-value pr-1 pl-1">5% Off</span>
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb14631096a.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <label className="badge-style">( 2 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf">
                    Home decorators collectio...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <strike
                      style={{
                        fontSize: "12px!important",
                        color: "grey!important",
                      }}
                    >
                      102.00₹
                    </strike>
                    <br />
                    <span className="text-accent">96.90₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('13')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb167820035.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <label className="badge-style">( 1 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r">
                    OXO good grips 11-pound s...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">49.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('14')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div
                  className="d-flex"
                  style={{ right: 0, top: 0, position: "absolute" }}
                >
                  <span className="for-discoutn-value pr-1 pl-1">
                    3.00₹ Off
                  </span>
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abca58607c9.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <i className="sr-star czi-star-filled active" />
                    <label className="badge-style">( 1 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf">
                    Subrtex 1-piece knit jacq...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <strike
                      style={{
                        fontSize: "12px!important",
                        color: "grey!important",
                      }}
                    >
                      41.00₹
                    </strike>
                    <br />
                    <span className="text-accent">38.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('3')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/womens-long-sleeve-lightweight-french-terry-fleece-quarter-zip-top-dLAZRE">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb276239631.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/womens-long-sleeve-lightweight-french-terry-fleece-quarter-zip-top-dLAZRE">
                    Women's long-sleeve light...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">20.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('18')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/iottie-easy-one-touch-4-dash-windshield-car-mount-phone-holder-desk-RIYkNs">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbf645f07b.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/iottie-easy-one-touch-4-dash-windshield-car-mount-phone-holder-desk-RIYkNs">
                    iOttie easy one touch 4 d...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">23.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('2')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/the-school-of-life-emotional-baggage-tote-bag-canvas-tote-bag-navy-A8DmRl">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b12a949e4c0.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/the-school-of-life-emotional-baggage-tote-bag-canvas-tote-bag-navy-A8DmRl">
                    The school of life - emot...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">5.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('10')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812eb6916d3.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu">
                    Simple Mobile Carrier-Loc...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">167.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('64')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/ledger-nano-s-the-best-crypto-hardware-wallet-cNCtmU">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbe1379626.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/ledger-nano-s-the-best-crypto-hardware-wallet-cNCtmU">
                    Ledger nano s - the best...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">25.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('1')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/advanced-elements-stash-pak-roll-top-dry-bag-yIebrm">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb1a31bea5c.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/advanced-elements-stash-pak-roll-top-dry-bag-yIebrm">
                    Advanced elements stash p...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">50.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('15')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/progress-lighting-p4009-10-5-light-chandelier-polished-brass-uYXCf7">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abd0a01b3d1.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/progress-lighting-p4009-10-5-light-chandelier-polished-brass-uYXCf7">
                    Progress lighting P4009-1...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">99.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('4')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div
                  className="d-flex"
                  style={{ right: 0, top: 0, position: "absolute" }}
                >
                  <span className="for-discoutn-value pr-1 pl-1">
                    10.00₹ Off
                  </span>
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/timex-marlin-stainless-steel-hand-wound-movement-aR1p9K">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b127b2ebb07.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/timex-marlin-stainless-steel-hand-wound-movement-aR1p9K">
                    Timex marlin stainless st...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <strike
                      style={{
                        fontSize: "12px!important",
                        color: "grey!important",
                      }}
                    >
                      48.00₹
                    </strike>
                    <br />
                    <span className="text-accent">38.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('8')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/dual-alarm-clock-with-bed-shaker-zQxlb4">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b124237b06e.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/dual-alarm-clock-with-bed-shaker-zQxlb4">
                    Dual alarm clock with bed...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">33.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('7')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container featured_deal rtl">
        <div className="row">
          <div className="col-xl-3 col-md-4 right">
            <div className="d-flex align-items-center justify-content-center featured_deal_left">
              <h1
                className="featured_deal_title"
                style={{ paddingTop: "12px" }}
              >
                Featured deal
              </h1>
            </div>
          </div>
          <div className="col-xl-9 col-md-8">
            <div
              className="owl-carousel owl-theme owl-loaded owl-drag"
              id="web-feature-deal-slider"
            >
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(-1253px, 0px, 0px)",
                    transition: "all 0.25s ease 0s",
                    width: "2507px",
                  }}
                >
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/ledger-nano-s-the-best-crypto-hardware-wallet-cNCtmU'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbe1379626.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Ledger nano s - the best crypto hardware wallet
                            </h6>
                            <div className="flash-product-price">25.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/dual-alarm-clock-with-bed-shaker-zQxlb4'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b124237b06e.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Dual alarm clock with bed shaker
                            </h6>
                            <div className="flash-product-price">33.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/ledger-nano-s-the-best-crypto-hardware-wallet-cNCtmU'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbe1379626.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Ledger nano s - the best crypto hardware wallet
                            </h6>
                            <div className="flash-product-price">25.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/dual-alarm-clock-with-bed-shaker-zQxlb4'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b124237b06e.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Dual alarm clock with bed shaker
                            </h6>
                            <div className="flash-product-price">33.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/ledger-nano-s-the-best-crypto-hardware-wallet-cNCtmU'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbe1379626.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Ledger nano s - the best crypto hardware wallet
                            </h6>
                            <div className="flash-product-price">25.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned active"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/dual-alarm-clock-with-bed-shaker-zQxlb4'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b124237b06e.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Dual alarm clock with bed shaker
                            </h6>
                            <div className="flash-product-price">33.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned active"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/ledger-nano-s-the-best-crypto-hardware-wallet-cNCtmU'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbe1379626.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Ledger nano s - the best crypto hardware wallet
                            </h6>
                            <div className="flash-product-price">25.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: "308.333px", marginRight: "5px" }}
                  >
                    <div
                      className="flash_deal_product rtl"
                      style={{ cursor: "pointer" }}
                      onclick="location.href='https://6valley.6amtech.com/product/dual-alarm-clock-with-bed-shaker-zQxlb4'"
                    >
                      <div className=" d-flex">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ minWidth: "110px" }}
                        >
                          <img
                            style={{ height: "130px!important" }}
                            src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b124237b06e.png"
                          />
                        </div>
                        <div className="flash_deal_product_details pl-2 pr-1 d-flex align-items-center">
                          <div>
                            <h6 className="flash-product-title">
                              Dual alarm clock with bed shaker
                            </h6>
                            <div className="flash-product-price">33.00₹</div>
                            <h6 className="flash-product-review">
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <i className="sr-star czi-star" />
                              <label className="badge-style2">( 0 )</label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots disabled">
                <button role="button" className="owl-dot active">
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container rtl">
        <div className="row">
          <div className="col-xl-3 col-md-4 pb-4 mt-3">
            <div className="deal_of_the_day">
              <h1 style={{ color: "white" }}> Recommended product</h1>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ paddingTop: "55px" }}
              >
                <img
                  style={{ height: "206px" }}
                  src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6180f047b96b0.png"
                  alt=""
                />
              </div>
              <div
                style={{ textAlign: "center", paddingTop: "60px" }}
                className="pb-2"
              >
                <button
                  className="buy_btn"
                  onclick="location.href='https://6valley.6amtech.com/product/5-shelf-adjustable-heavy-duty-storage-shelving-unit-350-lbs-loading-capacity-per-shelf-steel-organizer-wire-rack-black-b'"
                >
                  Buy now
                </button>
              </div>
            </div>
            <div className="container mt-2">
              <div className="row p-0">
                <div className="col-md-3 p-0 text-center mobile-padding mt-1 mt-md-0">
                  <img
                    style={{ height: "29px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/delivery.png"
                    alt=""
                  />
                  <div className="deal-title">
                    3 Days
                    <br />
                    <span>Free delivery</span>
                  </div>
                </div>
                <div className="col-md-3 p-0 text-center mt-1 mt-md-0">
                  <img
                    style={{ height: "29px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/money.png"
                    alt=""
                  />
                  <div className="deal-title">Money back guarantee</div>
                </div>
                <div className="col-md-3 p-0 text-center mt-1 mt-md-0">
                  <img
                    style={{ height: "29px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/Genuine.png"
                    alt=""
                  />
                  <div className="deal-title">
                    100% Genuine
                    <br />
                    <span>Product</span>
                  </div>
                </div>
                <div className="col-md-3 p-0 text-center mt-1 mt-md-0">
                  <img
                    style={{ height: "29px" }}
                    src="https://6valley.6amtech.com/public/assets/front-end/png/Payment.png"
                    alt=""
                  />
                  <div className="deal-title">Authentic payment</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-md-8">
            <div className="section-header">
              <div className="feature_header">
                <span className="for-feature-title">Latest Products</span>
              </div>
              <div>
                <a
                  className="btn btn-outline-accent btn-sm viw-btn-a"
                  href="/products?data_from=latest"
                >
                  View all
                  <i className="czi-arrow-right ml-1 mr-n1" />
                </a>
              </div>
            </div>
            <div className="row mt-2 mb-3">
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/samsung-galaxy-s21-ultra-5g-factory-unlocked-android-cell-phone-128gb-us-version-Jv0PYH">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812ff7852d6.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/samsung-galaxy-s21-ultra-5g-factory-unlocked-android-cell-phone-128gb-us-version-Jv0PYH">
                        Galaxy S21 Ultra 5G Facto...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">1,186.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('66')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/samsung-galaxy-s20-fe-5g-factory-unlocked-android-cell-phone-128gb-us-version-tHNtKG">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812f2fe6be5.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/samsung-galaxy-s20-fe-5g-factory-unlocked-android-cell-phone-128gb-us-version-tHNtKG">
                        S20 FE 5G Factory Unlocke...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">699.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('65')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812eb6916d3.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu">
                        Simple Mobile Carrier-Loc...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">167.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('64')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/apple-iphone-11-pro-max-512gb-space-gray-unlocked-renewed-premium-kbEXCs">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812e1821ccf.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/apple-iphone-11-pro-max-512gb-space-gray-unlocked-renewed-premium-kbEXCs">
                        Pro Max, 512GB, Space Gra...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">849.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('63')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/mens-floral-rose-printed-long-sleeve-dress-shirts-prom-wedding-party-button-down-shirts-ZU9Ecm">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812d4b96561.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/mens-floral-rose-printed-long-sleeve-dress-shirts-prom-wedding-party-button-down-shirts-ZU9Ecm">
                        Mens Floral Rose Printed...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">300.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('62')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/apple-iphone-11-64gb-purple-unlocked-renewed-premium-5sq1Yo">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812cd538c4c.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/apple-iphone-11-64gb-purple-unlocked-renewed-premium-5sq1Yo">
                        iPhone 11, 64GB, Purple -...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">479.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('61')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/boys-bi-stretch-blazer-jacket-HiO3tf">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812cb6bb98f.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/boys-bi-stretch-blazer-jacket-HiO3tf">
                        Boys' Bi-Stretch Blazer J...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">1,500.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('60')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-4 col-6 mb-2">
                <div
                  className="product-card card "
                  style={{
                    marginBottom: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card-header inline_product clickable"
                    style={{
                      cursor: "pointer",
                      maxHeight: "193px",
                      minHeight: "193px",
                    }}
                  >
                    <div className="d-flex justify-content-end for-dicount-div-null">
                      <span className="for-discoutn-value-null" />
                    </div>
                    <div
                      className="d-flex d-block center-div element-center"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="/product/mens-casual-cotton-long-sleeve-dress-shirt-plaid-collar-button-down-shirt-XKk4uM">
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812bb6d5a00.png"
                          style={{
                            width: "100%",
                            maxHeight: "215px!important",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-body inline_product text-center p-1 clickable"
                    style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                  >
                    <div className="rating-show">
                      <span className="d-inline-block font-size-sm text-body">
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <i className="sr-star czi-star" />
                        <label className="badge-style">( 0 )</label>
                      </span>
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="product-title1"
                    >
                      <a href="/product/mens-casual-cotton-long-sleeve-dress-shirt-plaid-collar-button-down-shirt-XKk4uM">
                        Men's Casual Cotton Long...
                      </a>
                    </div>
                    <div className="justify-content-between text-center">
                      <div className="product-price text-center">
                        <span className="text-accent">700.00₹</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body card-body-hidden"
                    style={{ paddingBottom: "5px!important" }}
                  >
                    <div className="text-center">
                      <a
                        className="btn btn-primary btn-sm btn-block mb-2"
                        href="javascript:"
                        onclick="quickView('59')"
                      >
                        <i className="czi-eye align-middle mr-1" />
                        Quick View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container rtl">
        <div className="section-header">
          <div className="feature_header">
            <span>Categories</span>
          </div>
          <div>
            <a
              className="btn btn-outline-accent btn-sm viw-btn-a"
              href="/categories"
            >
              View all
              <i className="czi-arrow-right ml-1 mr-n1" />
            </a>
          </div>
        </div>
        <div className="mt-2 mb-3 brand-slider">
          <div
            className="owl-carousel owl-theme owl-loaded owl-drag"
            id="category-slider"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: "115px",
                }}
              >
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    className="category_div"
                    style={{ height: "132px", width: "100%" }}
                  >
                    <a href="/products?id=37&data_from=category&page=1">
                      <img
                        style={{
                          verticalAlign: "middle",
                          padding: "16%",
                          height: "100px",
                        }}
                        src="https://6valley.6amtech.com/storage/app/public/category/2021-01-18-6005824487f2a.png"
                        alt="Ziarat"
                      />
                      <p
                        className="text-center small"
                        style={{ marginTop: "-20px" }}
                      >
                        Ziarat
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav disabled">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots disabled">
              <button role="button" className="owl-dot active">
                <span />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container rtl">
        <div className="section-header">
          <div className="feature_header">
            <span>Sellers</span>
          </div>
          <div>
            <a
              className="btn btn-outline-accent btn-sm viw-btn-a"
              href="/sellers"
            >
              View all
              <i className="czi-arrow-right ml-1 mr-n1" />
            </a>
          </div>
        </div>
        <div className="mt-2 mb-3 brand-slider">
          <div
            className="owl-carousel owl-theme owl-loaded owl-drag"
            id="top-seller-slider"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: "1141px",
                }}
              >
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/1">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-10-30-617d12eeef188.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Shopinist
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/11">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-11-02-6180dd23ad4b6.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Converted Stor...
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/10">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-11-02-6180dcdab34cc.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Checked In
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/4">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-10-30-617d1318b22b3.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Super Store On...
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/5">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-10-30-617d133dccc8f.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Click to Cart
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/6">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-10-30-617d136cce2cb.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Deluxe Online
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/7">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-11-02-6180dc00d3c4f.png"
                        />
                        <p className="text-center small font-weight-bold">
                          MegaPlex
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/8">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-11-02-6180dc5b9f22d.png"
                        />
                        <p className="text-center small font-weight-bold">
                          One Click Shop...
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/9">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/storage/app/public/shop/2021-11-02-6180dc9a93d8c.png"
                        />
                        <p className="text-center small font-weight-bold">
                          Go Shop Now
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "109.091px", marginRight: "5px" }}
                >
                  <div
                    style={{
                      height: "100px",
                      padding: "2%",
                      background: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>
                      <a href="/shopView/12">
                        <img
                          style={{
                            verticalAlign: "middle",
                            padding: "2%",
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                          }}
                          src="https://6valley.6amtech.com/public/assets/front-end/img/image-place-holder.png"
                        />
                        <p className="text-center small font-weight-bold">
                          TEST
                        </p>
                      </a>
                    </center>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav disabled">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots disabled">
              <button role="button" className="owl-dot active">
                <span />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container rtl">
        <div className="section-header">
          <div className="feature_header">
            <span className="for-feature-title">Ziarat</span>
          </div>
          <div>
            <a
              className="btn btn-outline-accent btn-sm viw-btn-a"
              href="/products?id=37&data_from=category&page=1"
            >
              View all
              <i className="czi-arrow-right ml-1 mr-n1" />
            </a>
          </div>
        </div>
        <div className="row mt-2 mb-3">
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/grace-karin-girls-ruffle-cotton-dress-girls-long-sleeve-crew-neck-tiered-a-line-dress-WfIXz7">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-618124c3bc565.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/grace-karin-girls-ruffle-cotton-dress-girls-long-sleeve-crew-neck-tiered-a-line-dress-WfIXz7">
                    GRACE KARIN Girls Ruffle...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">20.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('52')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/tommy-hilfiger-girls-solid-short-sleeve-flag-logo-dress-drop-waist-flounce-silhouette-pull-on-style-crewneck-neckline-N7">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-618122b18a2dc.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/tommy-hilfiger-girls-solid-short-sleeve-flag-logo-dress-drop-waist-flounce-silhouette-pull-on-style-crewneck-neckline-N7">
                    Tommy Hilfiger Girls Soli...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">26.44₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('51')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/girls-raglan-sweater-dress-4HWiGc">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61811e38a26ab.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/girls-raglan-sweater-dress-4HWiGc">
                    Girls' Raglan Sweater Dre...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">23.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('45')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/toddler-black-dress-baby-girl-fall-dress-outfits-sleeveless-tutu-dress-princess-skirt-long-sleeve-plaid-coat-winter-clot">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6181253ea2345.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/toddler-black-dress-baby-girl-fall-dress-outfits-sleeveless-tutu-dress-princess-skirt-long-sleeve-plaid-coat-winter-clot">
                    Toddler Black Dress Baby...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">17.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('53')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/toddler-baby-girls-fall-dress-outfit-knit-long-sleeve-fluffy-gold-wire-decoration-tulle-dress-princess-dress-5UhSIb">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812206ee485.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/toddler-baby-girls-fall-dress-outfit-knit-long-sleeve-fluffy-gold-wire-decoration-tulle-dress-princess-dress-5UhSIb">
                    Toddler Baby Girl's Fall...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">26.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('50')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/soly-hux-girls-spaghetti-strap-ditsy-floral-print-ruffle-trim-tie-side-mini-dress-r0QrPb">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812075648c9.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/soly-hux-girls-spaghetti-strap-ditsy-floral-print-ruffle-trim-tie-side-mini-dress-r0QrPb">
                    SOLY HUX Girl's Spaghetti...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">18.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('48')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/womens-long-sleeve-lightweight-french-terry-fleece-quarter-zip-top-dLAZRE">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb276239631.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/womens-long-sleeve-lightweight-french-terry-fleece-quarter-zip-top-dLAZRE">
                    Women's long-sleeve light...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">20.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('18')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/little-big-girls-kids-check-plaid-long-sleeve-collar-neck-casual-button-down-shirt-dress-PvE8lG">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-6181216be6ce6.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/little-big-girls-kids-check-plaid-long-sleeve-collar-neck-casual-button-down-shirt-dress-PvE8lG">
                    Little &amp; Big Girls' Kids...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">17.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('49')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-2 col-sm-3 col-6"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="product-card card "
              style={{
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-header inline_product clickable"
                style={{
                  cursor: "pointer",
                  maxHeight: "193px",
                  minHeight: "193px",
                }}
              >
                <div className="d-flex justify-content-end for-dicount-div-null">
                  <span className="for-discoutn-value-null" />
                </div>
                <div
                  className="d-flex d-block center-div element-center"
                  style={{ cursor: "pointer" }}
                >
                  <a href="/product/handmade-girls-tutu-dresses-girls-tulle-dress-for-birthday-party-photography-prop-special-occasion-ojCerT">
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61811f975335f.png"
                      style={{ width: "100%", maxHeight: "215px!important" }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="card-body inline_product text-center p-1 clickable"
                style={{ cursor: "pointer", maxHeight: "7.5rem" }}
              >
                <div className="rating-show">
                  <span className="d-inline-block font-size-sm text-body">
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <i className="sr-star czi-star" />
                    <label className="badge-style">( 0 )</label>
                  </span>
                </div>
                <div
                  style={{ position: "relative" }}
                  className="product-title1"
                >
                  <a href="/product/handmade-girls-tutu-dresses-girls-tulle-dress-for-birthday-party-photography-prop-special-occasion-ojCerT">
                    Handmade Girls Tutu Dress...
                  </a>
                </div>
                <div className="justify-content-between text-center">
                  <div className="product-price text-center">
                    <span className="text-accent">18.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="card-body card-body-hidden"
                style={{ paddingBottom: "5px!important" }}
              >
                <div className="text-center">
                  <a
                    className="btn btn-primary btn-sm btn-block mb-2"
                    href="javascript:"
                    onclick="quickView('46')"
                  >
                    <i className="czi-eye align-middle mr-1" />
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-4 pb-md-5 rtl">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 mb-2 py-3">
            <div className="widget">
              <div className="d-flex justify-content-between">
                <h3 className="widget-title">Best sellings</h3>
                <div>
                  <a
                    className="btn btn-outline-accent btn-sm"
                    href="/products?data_from=best-selling&page=1"
                  >
                    View all
                    <i className="czi-arrow-right ml-1 mr-n1" />
                  </a>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf"
              >
                <a
                  className="d-block mr-2"
                  href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb14631096a.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/handmade-girls-tutu-dresses-girls-tulle-dress-for-birthday-party-photography-prop-special-occasion-ojCerT"
                    >
                      Home decorators collection bos...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">
                      96.90₹
                      <strike
                        style={{
                          fontSize: "12px!important",
                          color: "grey!important",
                        }}
                      >
                        102.00₹
                      </strike>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r"
              >
                <a
                  className="d-block mr-2"
                  href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb167820035.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/handmade-girls-tutu-dresses-girls-tulle-dress-for-birthday-party-photography-prop-special-occasion-ojCerT"
                    >
                      OXO good grips 11-pound stainl...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">49.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf"
              >
                <a
                  className="d-block mr-2"
                  href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abca58607c9.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/handmade-girls-tutu-dresses-girls-tulle-dress-for-birthday-party-photography-prop-special-occasion-ojCerT"
                    >
                      Subrtex 1-piece knit jacquard...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">
                      38.00₹
                      <strike
                        style={{
                          fontSize: "12px!important",
                          color: "grey!important",
                        }}
                      >
                        41.00₹
                      </strike>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/womens-long-sleeve-lightweight-french-terry-fleece-quarter-zip-top-dLAZRE"
              >
                <a
                  className="d-block mr-2"
                  href="/product/womens-long-sleeve-lightweight-french-terry-fleece-quarter-zip-top-dLAZRE"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb276239631.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/handmade-girls-tutu-dresses-girls-tulle-dress-for-birthday-party-photography-prop-special-occasion-ojCerT"
                    >
                      Women's long-sleeve lightweigh...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">20.00₹</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-2 py-3">
            <div className="widget">
              <div className="d-flex justify-content-between">
                <h3 className="widget-title">New arrivals</h3>
                <div>
                  <a
                    className="btn btn-outline-accent btn-sm"
                    href="/products?data_from=latest&page=1"
                  >
                    View all
                    <i className="czi-arrow-right ml-1 mr-n1" />
                  </a>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/samsung-galaxy-s21-ultra-5g-factory-unlocked-android-cell-phone-128gb-us-version-Jv0PYH"
              >
                <a
                  className="d-block mr-2"
                  href="/product/samsung-galaxy-s21-ultra-5g-factory-unlocked-android-cell-phone-128gb-us-version-Jv0PYH"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812ff7852d6.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/samsung-galaxy-s21-ultra-5g-factory-unlocked-android-cell-phone-128gb-us-version-Jv0PYH"
                    >
                      Galaxy S21 Ultra 5G Factory Un...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">1,186.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/samsung-galaxy-s20-fe-5g-factory-unlocked-android-cell-phone-128gb-us-version-tHNtKG"
              >
                <a
                  className="d-block mr-2"
                  href="/product/samsung-galaxy-s20-fe-5g-factory-unlocked-android-cell-phone-128gb-us-version-tHNtKG"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812f2fe6be5.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/samsung-galaxy-s20-fe-5g-factory-unlocked-android-cell-phone-128gb-us-version-tHNtKG"
                    >
                      S20 FE 5G Factory Unlocked And...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">699.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu"
              >
                <a
                  className="d-block mr-2"
                  href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812eb6916d3.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/simple-mobile-carrier-locked-samsung-galaxy-a50-4g-lte-prepaid-smartphone-black-64gb-sim-card-included-gsm-f7LoWu"
                    >
                      Simple Mobile Carrier-Locked G...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">167.00₹</span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/apple-iphone-11-pro-max-512gb-space-gray-unlocked-renewed-premium-kbEXCs"
              >
                <a
                  className="d-block mr-2"
                  href="/product/apple-iphone-11-pro-max-512gb-space-gray-unlocked-renewed-premium-kbEXCs"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-11-02-61812e1821ccf.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/apple-iphone-11-pro-max-512gb-space-gray-unlocked-renewed-premium-kbEXCs"
                    >
                      Pro Max, 512GB, Space Gray - U...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">849.00₹</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-2 py-3">
            <div className="widget">
              <div className="d-flex justify-content-between">
                <h3 className="widget-title">Top rated</h3>
                <div>
                  <a
                    className="btn btn-outline-accent btn-sm"
                    href="/products?data_from=top-rated&page=1"
                  >
                    View all
                    <i className="czi-arrow-right ml-1 mr-n1" />
                  </a>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf"
              >
                <a
                  className="d-block mr-2"
                  href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb14631096a.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/home-decorators-collection-boswell-quarter-14-in-WcXRCf"
                    >
                      Home decorators collection bos...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">
                      96.90₹
                      <strike
                        style={{
                          fontSize: "12px!important",
                          color: "grey!important",
                        }}
                      >
                        102.00₹
                      </strike>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf"
              >
                <a
                  className="d-block mr-2"
                  href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abca58607c9.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/subrtex-1-piece-knit-jacquard-spandex-stretch-sofa-milky-xtqmXf"
                    >
                      Subrtex 1-piece knit jacquard...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">
                      38.00₹
                      <strike
                        style={{
                          fontSize: "12px!important",
                          color: "grey!important",
                        }}
                      >
                        41.00₹
                      </strike>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="media align-items-center pt-2 pb-2 mb-1"
                data-href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r"
              >
                <a
                  className="d-block mr-2"
                  href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r"
                >
                  <img
                    style={{ height: "54px", width: "54px" }}
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb167820035.png"
                    alt="Product"
                  />
                </a>
                <div className="media-body">
                  <h6 className="widget-product-title">
                    <a
                      className="ptr"
                      href="/product/oxo-good-grips-11-pound-stainless-steel-food-scale-with-pull-out-display-TUsm8r"
                    >
                      OXO good grips 11-pound stainl...
                    </a>
                  </h6>
                  <div className="widget-product-meta">
                    <span className="text-accent">49.00₹</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer font-small mdb-color pt-3 rtl">
        <div
          className="container text-center"
          style={{ paddingBottom: "13px" }}
        >
          <div className="row text-center text-md-left mt-3 pb-3">
            <div className="col-md-3 col-lg-3 col-xl-3 mt-3">
              <div className="text-nowrap mb-4">
                <a className="d-inline-block mt-n1" href="/">
                  <img
                    width={250}
                    style={{ height: "60px!important" }}
                    src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b22b07a7d9.png"
                    alt="6Valley"
                  />
                </a>
              </div>
              <span className="social-media">
                <a
                  className="social-btn sb-light sb-twitter mr-2 mb-2"
                  target="_blank"
                  href="https://twitter.com/?lang=en"
                  style={{ color: "white!important" }}
                >
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
              </span>
              <span className="social-media">
                <a
                  className="social-btn sb-light sb-linkedin mr-2 mb-2"
                  target="_blank"
                  href="https://www.linkedin.com/"
                  style={{ color: "white!important" }}
                >
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </span>
              <span className="social-media">
                <a
                  className="social-btn sb-light sb-google-plus mr-2 mb-2"
                  target="_blank"
                  href="https://www.google.com/"
                  style={{ color: "white!important" }}
                >
                  <i className="fa fa-google-plus-square" aria-hidden="true" />
                </a>
              </span>
              <span className="social-media">
                <a
                  className="social-btn sb-light sb-pinterest mr-2 mb-2"
                  target="_blank"
                  href="https://www.pinterest.com/"
                  style={{ color: "white!important" }}
                >
                  <i className="fa fa-pinterest" aria-hidden="true" />
                </a>
              </span>
              <span className="social-media">
                <a
                  className="social-btn sb-light sb-instagram mr-2 mb-2"
                  target="_blank"
                  href="https://www.instagram.com/"
                  style={{ color: "white!important" }}
                >
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
              </span>
              <span className="social-media">
                <a
                  className="social-btn sb-light sb-facebook mr-2 mb-2"
                  target="_blank"
                  href="https://www.facebook.com/"
                  style={{ color: "white!important" }}
                >
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
              </span>
              <div className="widget mb-4 for-margin">
                <h6 className="text-uppercase font-weight-bold footer-heder">
                  Download our app
                </h6>
                <div className="store-contents" style={{ display: "flex" }}>
                  <div className="mr-2 mb-2">
                    <a
                      className
                      href="https://www.apple.com/app-store/"
                      role="button"
                    >
                      <img
                        src="https://6valley.6amtech.com/public/assets/front-end/png/apple_app.png"
                        alt=""
                        style={{ height: "40px!important" }}
                      />
                    </a>
                  </div>
                  <div className="mr-2 mb-2">
                    <a href="https://play.google.com/store/apps" role="button">
                      <img
                        src="https://6valley.6amtech.com/public/assets/front-end/png/google_app.png"
                        alt=""
                        style={{ height: "40px!important" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold footer-heder">
                Special
              </h6>
              <ul className="widget-list" style={{ paddingBottom: "10px" }}>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/flash-deals/1">
                    Flash Deal
                  </a>
                </li>
                <li className="widget-list-item">
                  <a
                    className="widget-list-link"
                    href="/products?data_from=featured&page=1"
                  >
                    Featured Products
                  </a>
                </li>
                <li className="widget-list-item">
                  <a
                    className="widget-list-link"
                    href="/products?data_from=latest&page=1"
                  >
                    Latest Products
                  </a>
                </li>
                <li className="widget-list-item">
                  <a
                    className="widget-list-link"
                    href="/products?data_from=best-selling&page=1"
                  >
                    Best Selling Products
                  </a>
                </li>
                <li className="widget-list-item">
                  <a
                    className="widget-list-link"
                    href="/products?data_from=top-rated&page=1"
                  >
                    Top Rated Products
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/brands">
                    All Brands
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/categories">
                    All Categories
                  </a>
                </li>
              </ul>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold footer-heder">
                Account &amp; shipping info
              </h6>
              <ul className="widget-list" style={{ paddingBottom: "10px" }}>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/customer/auth/login">
                    Profile Info
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/customer/auth/login">
                    Wish List
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/track-order">
                    Track Order
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/customer/auth/login">
                    Address
                  </a>
                </li>
              </ul>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold footer-heder">
                About Us
              </h6>
              <ul className="widget-list" style={{ paddingBottom: "10px" }}>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/about-us">
                    About Company
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="/helpTopic">
                    FAQ
                  </a>
                </li>
                <li className="widget-list-item ">
                  <a className="widget-list-link" href="/terms">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="widget-list-item ">
                  <a className="widget-list-link" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li className="widget-list-item ">
                  <a className="widget-list-link" href="/contacts">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="container text-center">
          <div className="row d-flex align-items-center footer-end">
            <div className="col-md-12 mt-3">
              <p className="text-center" style={{ fontSize: "12px" }}>
                Copyright © 2022 Zambet
              </p>
            </div>
          </div>
        </div>
      </footer>

      <a class="btn-scroll-top show" href="#top" data-scroll="">
        <span class="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i class="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default Home1;
