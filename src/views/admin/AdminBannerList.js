import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";
import { Link } from "react-router-dom";

function AdminBannerList() {
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
              Banner
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12" id="banner-btn">
            <button id="main-banner-add" className="btn btn-primary">
              <i className="tio-add-circle" /> Add banner
            </button>
          </div>
        </div>
        <div
          className="row pt-4"
          id="main-banner"
          style={{ display: "none", textAlign: "left" }}
        >
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Banner form</div>
              <div className="card-body">
                <form className="banner_form">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="hidden" id="id" name="id" />
                          <label htmlFor="name">Banner url</label>
                          <input
                            type="text"
                            name="url"
                            className="form-control"
                            id="url"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Banner type</label>
                          <select
                            style={{ width: "100%" }}
                            className="js-example-responsive form-control select2-hidden-accessible"
                            name="banner_type"
                            required
                            data-select2-id={1}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="Main Banner" data-select2-id={3}>
                              Main Banner
                            </option>
                            <option value="Footer Banner">Footer Banner</option>
                            <option value="Popup Banner">Popup Banner</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={2}
                            style={{ width: "100%" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-disabled="false"
                                aria-labelledby="select2-banner_type-kx-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-banner_type-kx-container"
                                  role="textbox"
                                  aria-readonly="true"
                                  title="Main Banner"
                                >
                                  Main Banner
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
                        <div className="form-group">
                          <label htmlFor="resource_id">Resource type</label>
                          <select
                            style={{ width: "100%" }}
                            onchange="display_data(this.value)"
                            className="js-example-responsive form-control select2-hidden-accessible"
                            name="resource_type"
                            required
                            data-select2-id={4}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="product" data-select2-id={6}>
                              Product
                            </option>
                            <option value="category">Category</option>
                            <option value="shop">Shop</option>
                            <option value="brand">Brand</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={5}
                            style={{ width: "100%" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-disabled="false"
                                aria-labelledby="select2-resource_type-5a-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-resource_type-5a-container"
                                  role="textbox"
                                  aria-readonly="true"
                                  title="Product"
                                >
                                  Product
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
                        <div className="form-group" id="resource-product">
                          <label htmlFor="product_id">Product</label>
                          <select
                            style={{ width: "100%" }}
                            className="js-example-responsive form-control select2-hidden-accessible"
                            name="product_id"
                            data-select2-id={7}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} data-select2-id={9}>
                              Ledger nano s - the best crypto hardware wallet
                            </option>
                            <option value={2}>
                              iOttie easy one touch 4 dash &amp; windshield car
                              mount phone holder desk
                            </option>
                            <option value={3}>
                              Subrtex 1-piece knit jacquard spandex stretch ,
                              sofa, milky
                            </option>
                            <option value={4}>
                              Progress lighting P4009-10 5-light chandelier,
                              polished brass
                            </option>
                            <option value={6}>
                              Hardside carry-on spinner suitcase luggage
                            </option>
                            <option value={7}>
                              Dual alarm clock with bed shaker
                            </option>
                            <option value={8}>
                              Timex marlin stainless steel hand-wound movement
                            </option>
                            <option value={10}>
                              The school of life - emotional baggage tote bag -
                              canvas tote bag (navy)
                            </option>
                            <option value={12}>
                              Teifoc house tile roof brick construction set toy
                            </option>
                            <option value={13}>
                              Home decorators collection boswell quarter 14 in.
                            </option>
                            <option value={14}>
                              OXO good grips 11-pound stainless steel food scale
                              with pull-out display
                            </option>
                            <option value={15}>
                              Advanced elements stash pak roll top dry bag
                            </option>
                            <option value={16}>
                              Munchkin snack catcher, 2 pack, blue/green
                            </option>
                            <option value={18}>
                              Women's long-sleeve lightweight french terry
                              fleece quarter-zip top
                            </option>
                            <option value={22}>
                              Ultimate Lightest Wireless Gaming Mouse: Fastest
                              Gaming Switches - 20K DPI
                            </option>
                            <option value={23}>
                              Coated Cast Iron Kettlebell Weight
                            </option>
                            <option value={24}>
                              2 Slice, Extra-Wide Slot Toaster with 6 Shade
                              Settings, Black
                            </option>
                            <option value={25}>
                              Carry-On Travel Backpack - Black
                            </option>
                            <option value={26}>
                              Nylon USB-A to Lightning Cable Cord, MFi Certified
                              Charger for Apple iPhone, iPa
                            </option>
                            <option value={27}>
                              Lodge L8SK3 10-1/4-Inch Pre-Seasoned Skillet
                            </option>
                            <option value={28}>
                              Nordic Ware Natural Aluminum Commercial Baker's
                              Half Sheet, 2-Pack, Silver
                            </option>
                            <option value={29}>
                              Universal Laptop Docking Station Dual Monitor for
                              Windows and Mac (Dual Video: H
                            </option>
                            <option value={30}>
                              Basics Replacement Water Filters for Water
                              Pitchers, Compatible with Brita - 3-P
                            </option>
                            <option value={31}>
                              Foldable, 14" Black Metal Platform Bed Frame with
                              Tool-Free Assembly, No Box Spr
                            </option>
                            <option value={32}>
                              Non-Slip Microfiber Shag Bathroom Rug Mat, 21" x
                              34", Platinum
                            </option>
                            <option value={33}>
                              Charging Station Dock for 4 Nintendo Switch
                              Joy-con Controllers - 2.6 Foot Cable
                            </option>
                            <option value={34}>
                              75W Equivalent, Soft White, Dimmable, 10,000 Hour
                              Lifetime, A19 LED Light Bulb |
                            </option>
                            <option value={35}>
                              Plastic Fridge Storage Bin - Medium (2-Pack)
                            </option>
                            <option value={36}>
                              Rayovac AAA Batteries, Alkaline Triple A Batteries
                              (48 Battery Count)
                            </option>
                            <option value={37}>
                              5-Shelf Adjustable, Heavy Duty Storage Shelving
                              Unit (350 lbs loading capacity p
                            </option>
                            <option value={38}>
                              Plastic Stackable Kids Chairs, Blue Pig, 2-Pack
                            </option>
                            <option value={39}>
                              Stackable Kids Chairs, Premium Plastic, 2-Pack
                            </option>
                            <option value={40}>
                              Faux Leather Kids/Youth Recliner with Armrest
                              Storage, 3+ Age Group, Beige
                            </option>
                            <option value={41}>
                              Kids Bookcase with Reading Nook and Storage
                              Shelves - Natural
                            </option>
                            <option value={42}>
                              Kids Wood Table and 4 Chair Set, Natural Table,
                              Assorted Color Chairs
                            </option>
                            <option value={43}>
                              Kids Chair Set with Dry-Erasable Seat Top, White,
                              19.9-Inch, 2-Pack
                            </option>
                            <option value={44}>
                              Solid Wood Kid Activity Chair Set, 23.8-Inch
                              Height - 2-Pack, Espresso
                            </option>
                            <option value={45}>
                              Girls' Raglan Sweater Dress
                            </option>
                            <option value={46}>
                              Handmade Girls Tutu Dresses Girls Tulle Dress for
                              Birthday Party, Photography Pr
                            </option>
                            <option value={48}>
                              SOLY HUX Girl's Spaghetti Strap Ditsy Floral Print
                              Ruffle Trim Tie Side Mini Dre
                            </option>
                            <option value={49}>
                              Little &amp; Big Girls' Kids Check Plaid Long
                              Sleeve Collar Neck Casual Button Down{" "}
                            </option>
                            <option value={50}>
                              Toddler Baby Girl's Fall Dress Outfit Knit Long
                              Sleeve Fluffy Gold Wire Decorati
                            </option>
                            <option value={51}>
                              Tommy Hilfiger Girls Solid Short Sleeve Flag Logo
                              Dress, Drop-Waist &amp; Flounce Si
                            </option>
                            <option value={52}>
                              GRACE KARIN Girls Ruffle Cotton Dress Girls Long
                              Sleeve Crew Neck Tiered A-Line{" "}
                            </option>
                            <option value={53}>
                              Toddler Black Dress Baby Girl Fall Dress Outfits
                              Sleeveless Tutu Dress Princess{" "}
                            </option>
                            <option value={54}>
                              Boys' Long Sleeve Dress Shirt and Tie Set
                            </option>
                            <option value={55}>
                              Boys' Long Sleeve Classic Dress Shirt (Standard
                              &amp; Husky)
                            </option>
                            <option value={56}>
                              Boys' Saltwater 1/4-zip Pullover Sweatshirt
                            </option>
                            <option value={57}>
                              Republic Boys’ Wool Dress Coat with Zipper Closure
                              with Bib Insert
                            </option>
                            <option value={58}>
                              Men's Dress Shirt Slim Fit Non-Iron Herringbone
                            </option>
                            <option value={59}>
                              Men's Casual Cotton Long Sleeve Dress Shirt Plaid
                              Collar Button Down Shirt
                            </option>
                            <option value={60}>
                              Boys' Bi-Stretch Blazer Jacket
                            </option>
                            <option value={61}>
                              iPhone 11, 64GB, Purple - Unlocked (Renewed
                              Premium)
                            </option>
                            <option value={62}>
                              Mens Floral Rose Printed Long Sleeve Dress Shirts
                              Prom Wedding Party Button Down
                            </option>
                            <option value={63}>
                              Pro Max, 512GB, Space Gray - Unlocked (Renewed
                              Premium)
                            </option>
                            <option value={64}>
                              Simple Mobile Carrier-Locked Galaxy A50 4G LTE
                              Prepaid Smartphone - Blac
                            </option>
                            <option value={65}>
                              S20 FE 5G Factory Unlocked Android Cell Phone
                              128GB US Version
                            </option>
                            <option value={66}>
                              Galaxy S21 Ultra 5G Factory Unlocked Android Cell
                              Phone 128GB US Version
                            </option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={8}
                            style={{ width: "100%" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-disabled="false"
                                aria-labelledby="select2-product_id-4i-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-product_id-4i-container"
                                  role="textbox"
                                  aria-readonly="true"
                                  title="Ledger nano s - the best crypto hardware wallet"
                                >
                                  Ledger nano s - the best crypto hardware
                                  wallet
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
                        <div
                          className="form-group"
                          id="resource-category"
                          style={{ display: "none" }}
                        >
                          <label htmlFor="name">Category</label>
                          <select
                            style={{ width: "100%" }}
                            className="js-example-responsive form-control select2-hidden-accessible"
                            name="category_id"
                            data-select2-id={10}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={37} data-select2-id={12}>
                              Women's Fashion
                            </option>
                            <option value={38}>Men's Fashion</option>
                            <option value={39}>Phones &amp; Telecom</option>
                            <option value={40}>
                              Computer, Office &amp; Security
                            </option>
                            <option value={43}>Jewelry &amp; Watches</option>
                            <option value={44}>
                              Home, Pet &amp; Appliances
                            </option>
                            <option value={45}>Bags &amp; Shoes</option>
                            <option value={46}>Toys , Kids &amp; Babies</option>
                            <option value={47}>Outdoor Fun &amp; Sports</option>
                            <option value={114}>
                              Home Improvement &amp; Tools
                            </option>
                            <option value={116}>
                              Beauty, Health &amp; Hair
                            </option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={11}
                            style={{ width: "100%" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-disabled="false"
                                aria-labelledby="select2-category_id-pu-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-category_id-pu-container"
                                  role="textbox"
                                  aria-readonly="true"
                                  title="Women's Fashion"
                                >
                                  Women's Fashion
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
                        <div
                          className="form-group"
                          id="resource-shop"
                          style={{ display: "none" }}
                        >
                          <label htmlFor="shop_id">Shop</label>
                          <select
                            style={{ width: "100%" }}
                            className="js-example-responsive form-control select2-hidden-accessible"
                            name="shop_id"
                            data-select2-id={13}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} data-select2-id={15}>
                              Shopinist
                            </option>
                            <option value={4}>Super Store Online</option>
                            <option value={5}>Click to Cart</option>
                            <option value={6}>Deluxe Online</option>
                            <option value={7}>MegaPlex</option>
                            <option value={8}>One Click Shopping</option>
                            <option value={9}>Go Shop Now</option>
                            <option value={10}>Checked In</option>
                            <option value={11}>Converted Store</option>
                            <option value={12}>TEST</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={14}
                            style={{ width: "100%" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-disabled="false"
                                aria-labelledby="select2-shop_id-1s-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-shop_id-1s-container"
                                  role="textbox"
                                  aria-readonly="true"
                                  title="Shopinist"
                                >
                                  Shopinist
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
                        <div
                          className="form-group"
                          id="resource-brand"
                          style={{ display: "none" }}
                        >
                          <label htmlFor="brand_id">All Brands</label>
                          <select
                            style={{ width: "100%" }}
                            className="js-example-responsive form-control select2-hidden-accessible"
                            name="brand_id"
                            data-select2-id={16}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} data-select2-id={18}>
                              Tell Us
                            </option>
                            <option value={2}>The Wall</option>
                            <option value={3}>Dynamova</option>
                            <option value={4}>Crave</option>
                            <option value={5}>Arkohub</option>
                            <option value={6}>Axxelus</option>
                            <option value={7}>Market Miracle</option>
                            <option value={8}>Vivatiqo</option>
                            <option value={9}>TrueMake</option>
                            <option value={10}>Hexanate</option>
                            <option value={11}>Modentum</option>
                            <option value={12}>Framerce</option>
                            <option value={13}>Center Point</option>
                            <option value={14}>Yo Merce</option>
                            <option value={15}>Great Hall</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={17}
                            style={{ width: "100%" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-disabled="false"
                                aria-labelledby="select2-brand_id-kp-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-brand_id-kp-container"
                                  role="textbox"
                                  aria-readonly="true"
                                  title="Tell Us"
                                >
                                  Tell Us
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
                        <label htmlFor="name">Image</label>
                        <span className="badge badge-soft-danger">
                          ( Ratio 4:1 )
                        </span>
                        <br />
                        <div
                          className="custom-file"
                          style={{ textAlign: "left" }}
                        >
                          <input
                            type="file"
                            name="image"
                            id="mbimageFileUploader"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="mbimageFileUploader"
                          >
                            Choose File
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <center>
                          <img
                            style={{
                              width: "auto",
                              border: "1px solid",
                              borderRadius: "10px",
                              maxWidth: "400px",
                            }}
                            id="mbImageviewer"
                            src="https://6valley.6amtech.com/public\assets\back-end\img\400x400\img1.jpg"
                            alt="banner image"
                          />
                        </center>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <a className="btn btn-secondary text-white cancel">
                      Cancel
                    </a>
                    <button id="add" type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <a
                      id="update"
                      className="btn btn-primary"
                      style={{ display: "none", color: "#fff" }}
                    >
                      Update
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }} id="banner-table">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div className="flex-between">
                    <div>
                      <h5>Banner table</h5>
                    </div>
                    <div className="mx-1">
                      <h5 style={{ color: "red" }}>(8)</h5>
                    </div>
                  </div>
                  <div style={{ width: "30vw" }}>
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
                          placeholder="Search by Banner Type"
                          aria-label="Search orders"
                          defaultValue
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
                    id="columnSearchDatatable"
                    style={{ textAlign: "left" }}
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>Sl</th>
                        <th>Image</th>
                        <th>Banner type</th>
                        <th>Published</th>
                        <th style={{ width: "50px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc5683da8a.png"
                          />
                        </td>
                        <td>Footer Banner</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={9}
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
                                className="dropdown-item"
                                href="/admin/banner/edit/9"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Edit
                              </a>
                              <a
                                className="dropdown-item delete"
                                style={{ cursor: "pointer" }}
                                id={9}
                              >
                                {" "}
                                Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc55ae4e57.png"
                          />
                        </td>
                        <td>Footer Banner</td>
                        <td>
                          <label className="switch">
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
                                className="dropdown-item"
                                href="/admin/banner/edit/8"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">3</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abc52cc38e0.png"
                          />
                        </td>
                        <td>Footer Banner</td>
                        <td>
                          <label className="switch">
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
                                className="dropdown-item"
                                href="/admin/banner/edit/7"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">4</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb557b353a.png"
                          />
                        </td>
                        <td>Main Banner</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              className="status"
                              id={5}
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
                                className="dropdown-item"
                                href="/admin/banner/edit/5"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">5</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb56516532.png"
                          />
                        </td>
                        <td>Main Banner</td>
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
                                className="dropdown-item"
                                href="/admin/banner/edit/4"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">6</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb572615c5.png"
                          />
                        </td>
                        <td>Main Banner</td>
                        <td>
                          <label className="switch">
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
                                className="dropdown-item"
                                href="/admin/banner/edit/3"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">7</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60abb5a25c0aa.png"
                          />
                        </td>
                        <td>Main Banner</td>
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
                                className="dropdown-item"
                                href="/admin/banner/edit/2"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
                    </tbody>
                    <tbody>
                      <tr>
                        <th scope="row">8</th>
                        <td>
                          <img
                            width={80}
                            src="https://6valley.6amtech.com/storage/app/public/banner/2021-05-24-60aba73e86fcb.png"
                          />
                        </td>
                        <td>Popup Banner</td>
                        <td>
                          <label className="switch">
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
                                className="dropdown-item"
                                href="/admin/banner/edit/1"
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
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
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBannerList;
