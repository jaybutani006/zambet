import React, { useEffect } from "react";

function AdminPOS() {
  return (
    <div className="footer-offset">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="loading" style={{ display: "none" }} className="d-none">
              <div
                style={{
                  position: "fixed",
                  zIndex: 9999,
                  left: "40%",
                  top: "37%",
                  width: "100%",
                }}
              >
                <img
                  width={200}
                  src="https://6valley.6amtech.com/public/assets/admin/img/loader.gif"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <header
        id="header"
        className="col-12 navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered"
      >
        <div className="navbar-nav-wrap">
          <div className="navbar-brand-wrapper">
            <a
              className="navbar-brand"
              href="/admin"
              aria-label="Front"
              style={{
                paddingTop: "0!important",
                paddingBottom: "0!important",
              }}
            >
              <img
                className
                style={{ height: "55px" }}
                src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b218f20766.png"
                alt="Logo"
              />
            </a>
          </div>
          <div className="navbar-nav-wrap-content-right">
            <ul className="navbar-nav align-items-center flex-row">
              <li className="nav-item d-sm-inline-block">
                <div className="hs-unfold">
                  <a
                    id="short-cut"
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    data-toggle="modal"
                    data-target="#short-cut-keys"
                    title="Short cut keys"
                    data-hs-unfold-invoker
                  >
                    <i className="tio-keyboard" />
                  </a>
                </div>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <a
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    href
                    data-hs-unfold-invoker
                  >
                    <i className="tio-shopping-cart-outlined" />
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <div className="hs-unfold">
                  <a
                    className="js-hs-unfold-invoker navbar-dropdown-account-wrapper"
                    href="javascript:;"
                    data-hs-unfold-options='{
                               "target": "#accountNavbarDropdown",
                               "type": "css-animation"
                             }'
                    data-hs-unfold-target="#accountNavbarDropdown"
                    data-hs-unfold-invoker
                  >
                    <div className="avatar avatar-sm avatar-circle">
                      <img
                        className="avatar-img"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                        alt="Image"
                      />
                      <span className="avatar-status avatar-sm-status avatar-status-success" />
                    </div>
                  </a>
                  <div
                    id="accountNavbarDropdown"
                    className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-hidden hs-unfold-content-initialized hs-unfold-css-animation animated"
                    style={{ width: "16rem", animationDuration: "300ms" }}
                    data-hs-target-height="128.8"
                    data-hs-unfold-content
                    data-hs-unfold-content-animation-in="slideInUp"
                    data-hs-unfold-content-animation-out="fadeOut"
                  >
                    <div className="dropdown-item-text">
                      <div className="media align-items-center text-break">
                        <div className="avatar avatar-sm avatar-circle mr-2">
                          <img
                            className="avatar-img"
                            src="https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                            alt="Owner image"
                          />
                        </div>
                        <div className="media-body">
                          <span className="card-title h5" />
                          <span className="card-text">admin@admin.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <a
                      className="dropdown-item"
                      href="javascript:"
                      onclick="Swal.fire({
                              title: 'Do you want to logout?',
                              showDenyButton: true,
                              showCancelButton: true,
                              confirmButtonColor: '#FC6A57',
                              cancelButtonColor: '#363636',
                              confirmButtonText: `Yes`,
                              denyButtonText: `Don't Logout`,
                              }).then((result) => {
                              if (result.value) {
                              location.href='https://6valley.6amtech.com/admin/auth/logout';
                              } else{
                              Swal.fire('Canceled', '', 'info')
                              }
                              })"
                    >
                      <span className="text-truncate pr-2" title="Sign out">
                        Sign out
                      </span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main id="content" role="main" className="main pointer-event">
        <section className="section-content padding-y-sm bg-default mt-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 card padding-y-sm ">
                <div className="card-header">
                  <div className="row w-100 d-flex justify-content-between">
                    <div className="col-sm-6 col-md-12 col-lg-5 mb-2">
                      <form className="col-sm-12 col-md-12 col-lg-12">
                        <div className="input-group-overlay input-group-merge input-group-flush">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="tio-search" />
                            </div>
                          </div>
                          <input
                            id="search"
                            autoComplete="off"
                            type="text"
                            defaultValue
                            name="search"
                            className="form-control search-bar-input"
                            placeholder="Search here"
                            aria-label="Search here"
                          />
                          <div
                            className="card search-card w-4"
                            style={{
                              position: "absolute",
                              zIndex: 1,
                              width: "100%",
                            }}
                          >
                            <div
                              id="search-box"
                              className="card-body search-result-box"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-5">
                      <div className="input-group float-right">
                        <select
                          name="category"
                          id="category"
                          className="form-control js-select2-custom mx-1 select2-hidden-accessible"
                          title="select category"
                          onchange="set_category_filter(this.value)"
                          data-select2-id="category"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value data-select2-id={2}>
                            All Categories
                          </option>
                          <option value={116} data-select2-id={3}>
                            Beauty, Health &amp; Hair
                          </option>
                          <option value={114} data-select2-id={4}>
                            Home Improvement &amp; Tools
                          </option>
                          <option value={47} data-select2-id={5}>
                            Outdoor Fun &amp; Sports
                          </option>
                          <option value={46} data-select2-id={6}>
                            Toys , Kids &amp; Babies
                          </option>
                          <option value={45} data-select2-id={7}>
                            Bags &amp; Shoes
                          </option>
                          <option value={44} data-select2-id={8}>
                            Home, Pet &amp; Appliances
                          </option>
                          <option value={43} data-select2-id={9}>
                            Jewelry &amp; Watches
                          </option>
                          <option value={40} data-select2-id={10}>
                            Computer, Office &amp; Security
                          </option>
                          <option value={39} data-select2-id={11}>
                            Phones &amp; Telecom
                          </option>
                          <option value={38} data-select2-id={12}>
                            Men's Fashion
                          </option>
                          <option value={37} data-select2-id={13}>
                            Women's Fashion
                          </option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={1}
                          style={{ width: "100%" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection custom-select"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              title="select category"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-category-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-category-container"
                                role="textbox"
                                aria-readonly="true"
                                title="All Categories"
                              >
                                <span>All Categories</span>
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
                  </div>
                </div>
                <div className="card-body" id="items">
                  <div
                    className="d-flex flex-wrap mt-2 mb-3"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('18')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb276239631.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Women's long-...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              20.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('16')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb1f3170d43.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Munchkin snac...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              5.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('15')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb1a31bea5c.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Advanced elem...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              50.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('12')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-06-05-60bb0fd23e989.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Teifoc house...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              55.00$
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                65.00$
                              </strike>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('10')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b12a949e4c0.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            The school of...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              5.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('8')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b127b2ebb07.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Timex marlin...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              38.00$
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                48.00$
                              </strike>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('7')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b124237b06e.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Dual alarm cl...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              33.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('6')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-28-60b122d9b7dc8.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Hardside carr...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              81.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('4')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abd0a01b3d1.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Progress ligh...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              99.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('3')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abca58607c9.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Subrtex 1-pie...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              38.00$
                              <strike
                                style={{
                                  fontSize: "12px!important",
                                  color: "grey!important",
                                }}
                              >
                                41.00$
                              </strike>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('2')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbf645f07b.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            iOttie easy o...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              23.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-box">
                      <style dangerouslySetInnerHTML={{ __html: "\n\n" }} />
                      <div
                        className="product-card card"
                        onclick="quickView('1')"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="card-header inline_product clickable p-0"
                          style={{
                            height: "134px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center d-block">
                            <img
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2021-05-24-60abbe1379626.png"
                              style={{ width: "100%", borderRadius: "5%" }}
                            />
                          </div>
                        </div>
                        <div
                          className="card-body inline_product text-center p-1 clickable"
                          style={{ height: "3.5rem", maxHeight: "3.5rem" }}
                        >
                          <div
                            style={{ position: "relative" }}
                            className="product-title1 text-dark font-weight-bold"
                          >
                            Ledger nano s...
                          </div>
                          <div className="justify-content-between text-center">
                            <div className="product-price text-center">
                              25.00$
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div
                      className="col-12"
                      style={{ overflowX: "scroll" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 padding-y-sm mt-2">
                <div className="card pr-1 pl-1">
                  <div className="row mt-2">
                    <div className="form-group mt-1 col-12 w-i6">
                      <select
                        onchange="customer_change(this.value);"
                        id="customer"
                        name="customer_id"
                        data-placeholder="Walk In Customer"
                        className="js-data-example-ajax form-control select2-hidden-accessible"
                        data-select2-id="customer"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value={0} data-select2-id={16}>
                          Walking customer
                        </option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={15}
                        style={{ width: "588.662px" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2-customer-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-customer-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Walking customer"
                            >
                              Walking customer
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-1 col-12 col-lg-6 mb-0">
                      <button
                        className="w-100 d-inline-block btn btn-success rounded"
                        id="add_new_customer"
                        type="button"
                        data-toggle="modal"
                        data-target="#add-customer"
                        title="Add Customer"
                      >
                        <i className="tio-add-circle-outlined" /> Customer
                      </button>
                    </div>
                    <div className="form-group mt-1 col-12 col-lg-6 mb-0">
                      <a
                        className="w-100 d-inline-block btn btn-warning rounded"
                        onclick="new_order()"
                      >
                        New order
                      </a>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-12 mb-0">
                      <label className="input-label text-capitalize border p-1">
                        Current customer :{" "}
                        <span
                          className="style-i4 mb-0 p-1"
                          id="current_customer"
                        >
                          Walking Customer
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="form-group mt-1 col-12 col-lg-6 mt-2 mb-0">
                      <select
                        id="cart_id"
                        name="cart_id"
                        className="form-control js-select2-custom select2-hidden-accessible"
                        onchange="cart_change(this.value);"
                        data-select2-id="cart_id"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value="wc-308" selected data-select2-id={17}>
                          wc-308
                        </option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={14}
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
                            aria-labelledby="select2-cart_id-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-cart_id-container"
                              role="textbox"
                              aria-readonly="true"
                              title="wc-308"
                            >
                              <span>wc-308</span>
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="form-group mt-1 col-12 col-lg-6 mt-2 mb-0">
                      <a
                        className="w-100 d-inline-block btn btn-danger rounded"
                        onclick="clear_cart()"
                      >
                        Clear cart
                      </a>
                    </div>
                  </div>
                  <div className="w-100" id="cart">
                    <div
                      className="d-flex flex-row"
                      style={{ maxHeight: "300px", overflowY: "scroll" }}
                    >
                      <table className="table table-bordered">
                        <thead className="text-muted">
                          <tr>
                            <th scope="col">Item</th>
                            <th scope="col" className="text-center">
                              Qty
                            </th>
                            <th scope="col">Price</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                    <div className="box p-3">
                      <dl className="row text-sm-right">
                        <dt className="col-sm-6">Sub total : </dt>
                        <dd className="col-sm-6 text-right">0.00$</dd>
                        <dt className="col-sm-6">Product Discount :</dt>
                        <dd className="col-sm-6 text-right">0.00$</dd>
                        <dt className="col-sm-6">Extra Discount :</dt>
                        <dd className="col-sm-6 text-right">
                          <button
                            id="extra_discount"
                            className="btn btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#add-discount"
                          >
                            <i className="tio-edit" />
                          </button>
                          0.00$
                        </dd>
                        <dt className="col-sm-6">Coupon Discount :</dt>
                        <dd className="col-sm-6 text-right">
                          <button
                            id="coupon_discount"
                            className="btn btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#add-coupon-discount"
                          >
                            <i className="tio-edit" />
                          </button>
                          0.00$
                        </dd>
                        <dt className="col-sm-6">Tax : </dt>
                        <dd className="col-sm-6 text-right">0.00$</dd>
                        <dt className="col-sm-6">Total : </dt>
                        <dd className="col-sm-6 text-right h4 b">0.00$</dd>
                      </dl>
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <a
                            href="#"
                            className="btn btn-danger btn-lg btn-block"
                            onclick="emptyCart()"
                          >
                            <i className="fa fa-times-circle " /> Cancel{" "}
                          </a>
                        </div>
                        <div className="col-md-6">
                          <button
                            id="submit_order"
                            type="button"
                            className="btn btn-primary btn-lg btn-block"
                            data-toggle="modal"
                            data-target="#paymentModal"
                          >
                            <i className="fa fa-shopping-bag" />
                            Order{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="add-discount" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Update discount</h5>
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
                            <div className="row">
                              <div className="form-group col-sm-6">
                                <label htmlFor>Discount</label>
                                <input
                                  type="number"
                                  id="dis_amount"
                                  className="form-control"
                                  name="discount"
                                />
                              </div>
                              <div className="form-group col-sm-6">
                                <label htmlFor>Type</label>
                                <select
                                  name="type"
                                  id="type_ext_dis"
                                  className="form-control"
                                >
                                  <option value="amount" selected>
                                    Amount()
                                  </option>
                                  <option value="percent">Percent(%)</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-12">
                                <button
                                  className="btn btn-primary"
                                  onclick="extra_discount();"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="add-coupon-discount"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Coupon discount</h5>
                            <button
                              id="coupon_close"
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="form-group col-sm-12">
                              <label htmlFor>Coupon code</label>
                              <input
                                type="text"
                                id="coupon_code"
                                className="form-control"
                                name="coupon_code"
                              />
                            </div>
                            <div className="form-group col-sm-12">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                onclick="coupon_discount();"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="add-tax" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Update tax</h5>
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
                            <form className="row">
                              <input
                                type="hidden"
                                name="_token"
                                defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                              />{" "}
                              <div className="form-group col-12">
                                <label htmlFor>Tax (%)</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="tax"
                                  min={0}
                                />
                              </div>
                              <div className="form-group col-sm-12">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="paymentModal" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Payment</h5>
                            <button
                              id="payment_close"
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form id="order_place" className="row">
                              <input
                                type="hidden"
                                name="_token"
                                defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                              />{" "}
                              <div className="form-group col-12">
                                <label className="input-label" htmlFor>
                                  Amount($)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="amount"
                                  min={0}
                                  step="0.01"
                                  defaultValue={0}
                                  readOnly
                                />
                              </div>
                              <div className="form-group col-12">
                                <label className="input-label" htmlFor>
                                  Type
                                </label>
                                <select name="type" className="form-control">
                                  <option value="cash">Cash</option>
                                  <option value="card">Card</option>
                                </select>
                              </div>
                              <div className="form-group col-12">
                                <button
                                  className="btn btn-primary"
                                  id="order_complete"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="short-cut-keys"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Short cut keys</h5>
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
                            <span>To click order : alt + O</span>
                            <br />
                            <span>To click payment submit : alt + S</span>
                            <br />
                            <span>To close payment submit : alt + Z</span>
                            <br />
                            <span>To click cancel cart item all : alt + C</span>
                            <br />
                            <span>
                              To click add new customer : alt + A
                            </span>{" "}
                            <br />
                            <span>
                              To submit add new customer form : alt + N
                            </span>
                            <br />
                            <span>To click short cut keys : alt + K</span>
                            <br />
                            <span>To print invoice : alt + P</span> <br />
                            <span>To cancel invoice : alt + B</span> <br />
                            <span>To focus search input : alt + Q</span> <br />
                            <span>To click extra discount : alt + E</span>{" "}
                            <br />
                            <span>To click coupon discount : alt + D</span>{" "}
                            <br />
                            <span>To click clear cart : alt + X</span> <br />
                            <span>To click new order : alt + R</span> <br />
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
        <div className="modal fade" id="quick-view" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content" id="quick-view-modal"></div>
          </div>
        </div>
        <div className="modal fade" id="add-customer" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new customer</h5>
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
                <form id="product_form">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="row pl-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          First name{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="f_name"
                          className="form-control"
                          defaultValue
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Last name{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="l_name"
                          className="form-control"
                          defaultValue
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row pl-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Email
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          defaultValue
                          placeholder="Ex : ex@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Phone
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          defaultValue
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row pl-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Country{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          className="form-control"
                          defaultValue
                          placeholder="Country"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          City{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          defaultValue
                          placeholder="City"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Zip code{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="zip_code"
                          className="form-control"
                          defaultValue
                          placeholder="Zip code"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Address{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          defaultValue
                          placeholder="Address"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    id="submit_new_customer"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPOS;
