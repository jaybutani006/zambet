import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminDealDay() {
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
              Deal of the day
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Deal of the day form</div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <a
                        className="nav-link lang_link active"
                        href="#"
                        id="en-link"
                      >
                        english(EN)
                      </a>
                    </li>
                  </ul>
                  <div className="form-group">
                    <div className="row  lang_form" id="en-form">
                      <div className="col-md-12">
                        <label htmlFor="name">Title (EN)</label>
                        <input
                          type="text"
                          name="title[]"
                          className="form-control"
                          id="title"
                          placeholder="Ex : LUX"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="name">Products</label>
                        <select
                          className="js-example-basic-multiple js-states js-example-responsive form-control select2-hidden-accessible"
                          name="product_id"
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value={24} data-select2-id={3}>
                            2 Slice, Extra-Wide Slot Toaster with 6 Shade
                            Settings, Black
                          </option>
                          <option value={37}>
                            5-Shelf Adjustable, Heavy Duty Storage Shelving Unit
                            (350 lbs loading capacity p
                          </option>
                          <option value={34}>
                            75W Equivalent, Soft White, Dimmable, 10,000 Hour
                            Lifetime, A19 LED Light Bulb |
                          </option>
                          <option value={15}>
                            Advanced elements stash pak roll top dry bag
                          </option>
                          <option value={19}>
                            Apple iPhone XS max, 256GB, gold - fully unlocked
                          </option>
                          <option value={30}>
                            Basics Replacement Water Filters for Water Pitchers,
                            Compatible with Brita - 3-P
                          </option>
                          <option value={68}>
                            BLU VIVO X6 | 2021 | All Day Battery | Unlocked |
                            6.1” HD+ Display | 64GB | Dual
                          </option>
                          <option value={60}>
                            Boys' Bi-Stretch Blazer Jacket
                          </option>
                          <option value={55}>
                            Boys' Long Sleeve Classic Dress Shirt (Standard
                            &amp; Husky)
                          </option>
                          <option value={54}>
                            Boys' Long Sleeve Dress Shirt and Tie Set
                          </option>
                          <option value={56}>
                            Boys' Saltwater 1/4-zip Pullover Sweatshirt
                          </option>
                          <option value={25}>
                            Carry-On Travel Backpack - Black
                          </option>
                          <option value={33}>
                            Charging Station Dock for 4 Nintendo Switch Joy-con
                            Controllers - 2.6 Foot Cable
                          </option>
                          <option value={23}>
                            Coated Cast Iron Kettlebell Weight
                          </option>
                          <option value={9}>
                            Dove advanced care antiperspirant deodorant stick
                            for women
                          </option>
                          <option value={5}>
                            Dove body wash with pump with skin natural
                            nourishers
                          </option>
                          <option value={7}>
                            Dual alarm clock with bed shaker
                          </option>
                          <option value={67}>
                            Electronics Galaxy A42 5G, Factory Unlocked
                            Smartphone
                          </option>
                          <option value={40}>
                            Faux Leather Kids/Youth Recliner with Armrest
                            Storage, 3+ Age Group, Beige
                          </option>
                          <option value={31}>
                            Foldable, 14" Black Metal Platform Bed Frame with
                            Tool-Free Assembly, No Box Spr
                          </option>
                          <option value={66}>
                            Galaxy S21 Ultra 5G Factory Unlocked Android Cell
                            Phone 128GB US Version
                          </option>
                          <option value={45}>
                            Girls' Raglan Sweater Dress
                          </option>
                          <option value={52}>
                            GRACE KARIN Girls Ruffle Cotton Dress Girls Long
                            Sleeve Crew Neck Tiered A-Line
                          </option>
                          <option value={46}>
                            Handmade Girls Tutu Dresses Girls Tulle Dress for
                            Birthday Party, Photography Pr
                          </option>
                          <option value={6}>
                            Hardside carry-on spinner suitcase luggage
                          </option>
                          <option value={13}>
                            Home decorators collection boswell quarter 14 in.
                          </option>
                          <option value={2}>
                            iOttie easy one touch 4 dash &amp; windshield car
                            mount phone holder desk
                          </option>
                          <option value={61}>
                            iPhone 11, 64GB, Purple - Unlocked (Renewed Premium)
                          </option>
                          <option value={41}>
                            Kids Bookcase with Reading Nook and Storage Shelves
                            - Natural
                          </option>
                          <option value={43}>
                            Kids Chair Set with Dry-Erasable Seat Top, White,
                            19.9-Inch, 2-Pack
                          </option>
                          <option value={42}>
                            Kids Wood Table and 4 Chair Set, Natural Table,
                            Assorted Color Chairs
                          </option>
                          <option value={17}>
                            Kodak PIXPRO astro zoom AZ421-RD 16MP digital camera
                          </option>
                          <option value={1}>
                            Ledger nano s - the best crypto hardware wallet
                          </option>
                          <option value={49}>
                            Little &amp; Big Girls' Kids Check Plaid Long Sleeve
                            Collar Neck Casual Button Down
                          </option>
                          <option value={27}>
                            Lodge L8SK3 10-1/4-Inch Pre-Seasoned Skillet
                          </option>
                          <option value={59}>
                            Men's Casual Cotton Long Sleeve Dress Shirt Plaid
                            Collar Button Down Shirt
                          </option>
                          <option value={58}>
                            Men's Dress Shirt Slim Fit Non-Iron Herringbone
                          </option>
                          <option value={62}>
                            Mens Floral Rose Printed Long Sleeve Dress Shirts
                            Prom Wedding Party Button Down
                          </option>
                          <option value={16}>
                            Munchkin snack catcher, 2 pack, blue/green
                          </option>
                          <option value={32}>
                            Non-Slip Microfiber Shag Bathroom Rug Mat, 21" x
                            34", Platinum
                          </option>
                          <option value={28}>
                            Nordic Ware Natural Aluminum Commercial Baker's Half
                            Sheet, 2-Pack, Silver
                          </option>
                          <option value={26}>
                            Nylon USB-A to Lightning Cable Cord, MFi Certified
                            Charger for Apple iPhone, iPa
                          </option>
                          <option value={14}>
                            OXO good grips 11-pound stainless steel food scale
                            with pull-out display
                          </option>
                          <option value={35}>
                            Plastic Fridge Storage Bin - Medium (2-Pack)
                          </option>
                          <option value={38}>
                            Plastic Stackable Kids Chairs, Blue Pig, 2-Pack
                          </option>
                          <option value={63}>
                            Pro Max, 512GB, Space Gray - Unlocked (Renewed
                            Premium)
                          </option>
                          <option value={4}>
                            Progress lighting P4009-10 5-light chandelier,
                            polished brass
                          </option>
                          <option value={36}>
                            Rayovac AAA Batteries, Alkaline Triple A Batteries
                            (48 Battery Count)
                          </option>
                          <option value={57}>
                            Republic Boys’ Wool Dress Coat with Zipper Closure
                            with Bib Insert
                          </option>
                          <option value={65}>
                            S20 FE 5G Factory Unlocked Android Cell Phone 128GB
                            US Version
                          </option>
                          <option value={11}>Samsung Galaxy S20 FE 5G</option>
                          <option value={64}>
                            Simple Mobile Carrier-Locked Galaxy A50 4G LTE
                            Prepaid Smartphone - Blac
                          </option>
                          <option value={44}>
                            Solid Wood Kid Activity Chair Set, 23.8-Inch Height
                            - 2-Pack, Espresso
                          </option>
                          <option value={48}>
                            SOLY HUX Girl's Spaghetti Strap Ditsy Floral Print
                            Ruffle Trim Tie Side Mini Dre
                          </option>
                          <option value={39}>
                            Stackable Kids Chairs, Premium Plastic, 2-Pack
                          </option>
                          <option value={3}>
                            Subrtex 1-piece knit jacquard spandex stretch ,
                            sofa, milky
                          </option>
                          <option value={12}>
                            Teifoc house tile roof brick construction set toy
                          </option>
                          <option value={10}>
                            The school of life - emotional baggage tote bag -
                            canvas tote bag (navy)
                          </option>
                          <option value={8}>
                            Timex marlin stainless steel hand-wound movement
                          </option>
                          <option value={50}>
                            Toddler Baby Girl's Fall Dress Outfit Knit Long
                            Sleeve Fluffy Gold Wire Decorati
                          </option>
                          <option value={53}>
                            Toddler Black Dress Baby Girl Fall Dress Outfits
                            Sleeveless Tutu Dress Princess
                          </option>
                          <option value={51}>
                            Tommy Hilfiger Girls Solid Short Sleeve Flag Logo
                            Dress, Drop-Waist &amp; Flounce Si
                          </option>
                          <option value={22}>
                            Ultimate Lightest Wireless Gaming Mouse: Fastest
                            Gaming Switches - 20K DPI
                          </option>
                          <option value={29}>
                            Universal Laptop Docking Station Dual Monitor for
                            Windows and Mac (Dual Video: H
                          </option>
                          <option value={18}>
                            Women's long-sleeve lightweight french terry fleece
                            quarter-zip top
                          </option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={2}
                          style={{ width: "1552px" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--single"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-product_id-pe-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-product_id-pe-container"
                                role="textbox"
                                aria-readonly="true"
                                title="
2 Slice, Extra-Wide Slot Toaster with 6 Shade Settings, Black
"
                              >
                                2 Slice, Extra-Wide Slot Toaster with 6 Shade
                                Settings, Black
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
                  <div className="card-footer pl-0">
                    <button type="submit" className="btn btn-primary ">
                      Save
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
              <div className="card-header">
                <div className="flex-between row justify-content-between align-items-center flex-grow-1 mx-1">
                  <div className="flex-between">
                    <div>
                      <h5>Deal of the day</h5>
                    </div>
                    <div className="mx-1">
                      <h5 style={{ color: "red" }}>(1)</h5>
                    </div>
                  </div>
                  <div style={{ width: "40vw" }}>
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
                          placeholder="Search by Title"
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
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Sl</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col" style={{ width: "100px" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Big Sale</td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" className="status" id={1} />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <a
                            href="/admin/deal/day-update/1"
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </a>
                          <a
                            href="/admin/deal/day-delete/1"
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </a>
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

export default AdminDealDay;
