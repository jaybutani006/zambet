import React from "react";

function AdminBusinessSettingsWebConfigDBIndex() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">Clean Database</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="alert alert-danger mx-2" role="alert">
              This page contains sensitive information.Make sure before
              changing.
            </div>
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <form method="post">
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                />{" "}
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="admin_wallet_histories"
                        className="form-check-input"
                        id="business_section_0"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_0"
                      >
                        admin_wallet_histori...
                      </label>
                      <span className="badge-pill badge-secondary mx-2">5</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="admin_wallets"
                        className="form-check-input"
                        id="business_section_1"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_1"
                      >
                        admin_wallets
                      </label>
                      <span className="badge-pill badge-secondary mx-2">1</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="attributes"
                        className="form-check-input"
                        id="business_section_2"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_2"
                      >
                        attributes
                      </label>
                      <span className="badge-pill badge-secondary mx-2">1</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="banners"
                        className="form-check-input"
                        id="business_section_3"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_3"
                      >
                        banners
                      </label>
                      <span className="badge-pill badge-secondary mx-2">8</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="billing_addresses"
                        className="form-check-input"
                        id="business_section_4"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_4"
                      >
                        billing_addresses
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="brands"
                        className="form-check-input"
                        id="business_section_5"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_5"
                      >
                        brands
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        15
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="cart_shippings"
                        className="form-check-input"
                        id="business_section_6"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_6"
                      >
                        cart_shippings
                      </label>
                      <span className="badge-pill badge-secondary mx-2">9</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="carts"
                        className="form-check-input"
                        id="business_section_7"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_7"
                      >
                        carts
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        12
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="categories"
                        className="form-check-input"
                        id="business_section_8"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_8"
                      >
                        categories
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        29
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="category_shipping_costs"
                        className="form-check-input"
                        id="business_section_9"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_9"
                      >
                        category_shipping_co...
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        22
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="chattings"
                        className="form-check-input"
                        id="business_section_10"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_10"
                      >
                        chattings
                      </label>
                      <span className="badge-pill badge-secondary mx-2">8</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="contacts"
                        className="form-check-input"
                        id="business_section_11"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_11"
                      >
                        contacts
                      </label>
                      <span className="badge-pill badge-secondary mx-2">1</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="coupons"
                        className="form-check-input"
                        id="business_section_12"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_12"
                      >
                        coupons
                      </label>
                      <span className="badge-pill badge-secondary mx-2">1</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="customer_wallet_histories"
                        className="form-check-input"
                        id="business_section_13"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_13"
                      >
                        customer_wallet_hist...
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="customer_wallets"
                        className="form-check-input"
                        id="business_section_14"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_14"
                      >
                        customer_wallets
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="deal_of_the_days"
                        className="form-check-input"
                        id="business_section_15"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_15"
                      >
                        deal_of_the_days
                      </label>
                      <span className="badge-pill badge-secondary mx-2">1</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="delivery_histories"
                        className="form-check-input"
                        id="business_section_16"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_16"
                      >
                        delivery_histories
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="delivery_men"
                        className="form-check-input"
                        id="business_section_17"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_17"
                      >
                        delivery_men
                      </label>
                      <span className="badge-pill badge-secondary mx-2">3</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="feature_deals"
                        className="form-check-input"
                        id="business_section_18"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_18"
                      >
                        feature_deals
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="flash_deal_products"
                        className="form-check-input"
                        id="business_section_19"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_19"
                      >
                        flash_deal_products
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        13
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="flash_deals"
                        className="form-check-input"
                        id="business_section_20"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_20"
                      >
                        flash_deals
                      </label>
                      <span className="badge-pill badge-secondary mx-2">2</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="help_topics"
                        className="form-check-input"
                        id="business_section_21"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_21"
                      >
                        help_topics
                      </label>
                      <span className="badge-pill badge-secondary mx-2">8</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="notifications"
                        className="form-check-input"
                        id="business_section_22"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_22"
                      >
                        notifications
                      </label>
                      <span className="badge-pill badge-secondary mx-2">1</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="order_details"
                        className="form-check-input"
                        id="business_section_23"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_23"
                      >
                        order_details
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        81
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="order_transactions"
                        className="form-check-input"
                        id="business_section_24"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_24"
                      >
                        order_transactions
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        21
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="orders"
                        className="form-check-input"
                        id="business_section_25"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_25"
                      >
                        orders
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        67
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="paytabs_invoices"
                        className="form-check-input"
                        id="business_section_26"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_26"
                      >
                        paytabs_invoices
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="product_stocks"
                        className="form-check-input"
                        id="business_section_27"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_27"
                      >
                        product_stocks
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="products"
                        className="form-check-input"
                        id="business_section_28"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_28"
                      >
                        products
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        65
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="refund_requests"
                        className="form-check-input"
                        id="business_section_29"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_29"
                      >
                        refund_requests
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="refund_statuses"
                        className="form-check-input"
                        id="business_section_30"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_30"
                      >
                        refund_statuses
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="refund_transactions"
                        className="form-check-input"
                        id="business_section_31"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_31"
                      >
                        refund_transactions
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="reviews"
                        className="form-check-input"
                        id="business_section_32"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_32"
                      >
                        reviews
                      </label>
                      <span className="badge-pill badge-secondary mx-2">5</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="search_functions"
                        className="form-check-input"
                        id="business_section_33"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_33"
                      >
                        search_functions
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        33
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="seller_wallet_histories"
                        className="form-check-input"
                        id="business_section_34"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_34"
                      >
                        seller_wallet_histor...
                      </label>
                      <span className="badge-pill badge-secondary mx-2">3</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="seller_wallets"
                        className="form-check-input"
                        id="business_section_35"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_35"
                      >
                        seller_wallets
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        13
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="sellers"
                        className="form-check-input"
                        id="business_section_36"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_36"
                      >
                        sellers
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        13
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="shipping_addresses"
                        className="form-check-input"
                        id="business_section_37"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_37"
                      >
                        shipping_addresses
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        21
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="shipping_methods"
                        className="form-check-input"
                        id="business_section_38"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_38"
                      >
                        shipping_methods
                      </label>
                      <span className="badge-pill badge-secondary mx-2">4</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="shipping_types"
                        className="form-check-input"
                        id="business_section_39"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_39"
                      >
                        shipping_types
                      </label>
                      <span className="badge-pill badge-secondary mx-2">2</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="shops"
                        className="form-check-input"
                        id="business_section_40"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_40"
                      >
                        shops
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        13
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="support_ticket_convs"
                        className="form-check-input"
                        id="business_section_41"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_41"
                      >
                        support_ticket_convs
                      </label>
                      <span className="badge-pill badge-secondary mx-2">6</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="support_tickets"
                        className="form-check-input"
                        id="business_section_42"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_42"
                      >
                        support_tickets
                      </label>
                      <span className="badge-pill badge-secondary mx-2">3</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="transactions"
                        className="form-check-input"
                        id="business_section_43"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_43"
                      >
                        transactions
                      </label>
                      <span className="badge-pill badge-secondary mx-2">0</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="translations"
                        className="form-check-input"
                        id="business_section_44"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_44"
                      >
                        translations
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        365
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="wishlists"
                        className="form-check-input"
                        id="business_section_45"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_45"
                      >
                        wishlists
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        11
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="tables[]"
                        defaultValue="withdraw_requests"
                        className="form-check-input"
                        id="business_section_46"
                      />
                      <label
                        className="form-check-label text-dark"
                        style={{}}
                        htmlFor="business_section_46"
                      >
                        withdraw_requests
                      </label>
                      <span className="badge-pill badge-secondary mx-2">9</span>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  type="button"
                  onclick="call_demo()"
                  className="btn btn-primary mb-2"
                >
                  Clear
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsWebConfigDBIndex;
