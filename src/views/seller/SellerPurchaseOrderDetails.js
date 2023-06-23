import React, { useEffect, useContext, useState } from "react";
import Helmet from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { ISOToIST } from "utils/DateTime";
import { Context } from "context/newContext";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { truncate } from "utils/truncateText";
import Accordion from "utils/Accordion";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";

function SellerPurchaseOrderDetails() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const initialState = {
    options: {
      gst_type: [
        { name: "TaxInvoice", value: "tax-invoice" },
        { name: "Import", value: "import" },
        { name: "ReverseCharges", value: "reverse-charges" },
        { name: "BillOfSupply_Compounding", value: "billofsupply-compounding" },
        {
          name: "BillOfSupply_UnRegistered",
          value: "billofsupply-unregistered",
        },
        { name: "BillOfSupply_Exempted", value: "billofsupply-exempted" },
        { name: "BillOfSupply_NilRated", value: "billofsupply-nilrated" },
        { name: "BillOfSupply_NonGST", value: "billofsupply-nongst" },
        { name: "BranchTransfer", value: "branch-transfer" },
      ],
      subvendors: [],
      agents: [
        {
          code: "0001",
          name: "Default",
          value: "default",
        },
      ],
      tax: [
        {
          name: "Exclusive",
          value: "exclusive",
        },
      ],
      ship_to: [
        {
          name: "test",
          value: "test",
        },
      ],
      payment_terms: [
        {
          code: "0001",
          name: "Default",
          value: "default",
        },
      ],
      advance_ledger: [
        {
          code: "23100002",
          name: "Balances With Bank",
          value: "Cash And Cash Equivalents",
        },
        {
          code: "23100001",
          name: "Cash In Hand",
          value: "Cash And Cash Equivalents",
        },
      ],
      pack_unit: [
        { code: "0007", name: "BOX", value: "box", qty: 12 },
        { code: "0029", name: "PCS", value: "pcs", qty: 1 },
        { code: "0002", name: "BAG", value: "bag", qty: 6 },
        { code: "0047", name: "1NOS", value: "1nos", qty: 1 },
      ],
      item_unit: [
        { code: "0029", name: "PCS", value: "pcs", qty: 1 },
        { code: "0002", name: "BAG", value: "bag", qty: 12 },
        { code: "0047", name: "1NOS", value: "1nos", qty: 1 },
      ],
      tax_code: [
        { code: "0", name: "0.05", value: "0" },
        { code: "Ex", name: "Exempted", value: "ex" },
        { code: "NA", name: "NIL Rated", value: "na" },
        { code: "NonGST", name: "Non-GST", value: "non-gst" },
      ],
    },
    vendorProducts: [],
    items: [],
    itemsErrors: {},
    selected: {
      gst_type: "",
      email: "",
      subvendor_id: "",
      delivery_date: "",
      order_date: new Date().toISOString().slice(0, 10),
      // NOTE order_no generate from backend
      order_no: "",
      ref_no: "",
      ref_date: "",
      agent: "",
      tax: "",
      billing_address: "",
      billing_gst_no: "",
      billing_contact_person: "",
      delivery_ship_to: "",
      delivery_payment_terms: "",
      order_remark: "",
      order_advance_ledger: "",
      order_brokerage: 0.0,
      order_advance_amount: 0.0,
      order_items_total_value: 0.0,
      order_items_total_discount_amount: 0.0,
      order_taxable_amount: 0.0,
      order_tax_amount: 0.0,
      order_cess_amount: 0.0,
      order_extra_discount_amount: 0.0,
      order_roundoff: 0.0,
      order_final_amount: 0.0,
    },
    selectedErrors: {},
    purchaseAndCollection: {
      vender_name: "",
      company_name: "",
      contact: +"",
      address: "",
      code: +"",
      under_ledger: "",
      is_common: "",
      under_vendor: "",
      firm_type: "",
      territory: "",
      party_category: "",
      gst: "",
      cin: "",
      tds_section: "",
      billing_address: "",
      billing_country: "",
      billing_state: "",
      billing_city: "",
      billing_pincode: +"",
      billing_phone: "",
      billing_email: "",
      billing_longitude: +"",
      billing_latitude: +"",
      shipping_address: "",
      shipping_country: "",
      shipping_state: "",
      shipping_city: "",
      shipping_pincode: +"",
      shipping_phone: "",
      shipping_email: "",
      shipping_longitude: +"",
      shipping_latitude: +"",
      root_map: "",
      website: "",
      facebook: "",
      skype: "",
      twitter: "",
      linkedin: "",
      payment_term: "",
      price_category: "",
      agent: "",
      transporter: "",
      credit_limit: "",
      bank_name: "",
      bank_branch: "",
      bank_account_no: "",
      bank_ifsc_or_rtgs_no: "",
    },
    purchaseAndCollectionErrors: {},
  };

  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = () => {};

  useEffect(() => {
    const pODetails = location?.state;

    setMainState((prev) => ({
      ...prev,
      items: [...pODetails?.Details],
      selected: {
        gst_type: pODetails?.gst_type,
        email: pODetails?.email,
        subvendor_id: pODetails?.subvendor_id,
        delivery_date: pODetails?.delivery_date,
        order_date: pODetails?.order_date,
        // NOTE order_no generate from backend
        order_no: pODetails?.order_no,
        ref_no: pODetails?.ref_no,
        ref_date: pODetails?.ref_date,
        agent: pODetails?.agent,
        tax: pODetails?.tax,
        billing_address: pODetails?.billing_address,
        billing_gst_no: pODetails?.billing_gst_no,
        billing_contact_person: pODetails?.billing_contact_person,
        delivery_ship_to: pODetails?.delivery_ship_to,
        delivery_payment_terms: pODetails?.delivery_payment_terms,
        order_remark: pODetails?.order_remark,
        order_advance_ledger: pODetails?.order_advance_ledger,
        order_brokerage: pODetails?.order_brokerage,
        order_advance_amount: pODetails?.order_advance_amount,
        order_items_total_value: pODetails?.order_items_total_value,
        order_items_total_discount_amount:
          pODetails?.order_items_total_discount_amount,
        order_taxable_amount: pODetails?.order_taxable_amount,
        order_tax_amount: pODetails?.order_tax_amount,
        order_cess_amount: pODetails?.order_cess_amount,
        order_extra_discount_amount: pODetails?.order_extra_discount_amount,
        order_roundoff: pODetails?.order_roundoff,
        order_final_amount: pODetails?.order_final_amount,
      },
      state: pODetails,
    }));
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Purchase Order
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row" style={{ width: "100%" }}>
                  <div
                    className="col-md-6"
                    style={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-folder" />
                      {" Open"}
                    </button>
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-trash" />
                      {" Delete"}
                    </button>
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-clone" />
                      {" Copy"}
                    </button>
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-times" />
                      {" Cancel"}
                    </button>
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-undo" />
                      {" Restore"}
                    </button>
                  </div>
                  <div
                    className="col-md-6"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-calculator" />
                      {" Calculator"}
                    </button>
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-question-circle" />
                      {" Help"}
                    </button>
                    <button class="ml-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-gear" />
                      <span>{" Configuration"}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-1">
                      <label htmlFor="name">GST Type</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Sub Vendor ★</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Email</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Delivery Date ★</label>
                      <div className="mb-4" />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="js-example-basic-multiple form-control form-control-input"
                        // name="category_id"
                        name="gst_type"
                        //
                        onChange={(e) => handleInputChange(e)}
                        // value={mainState.selected.gst_type}
                      >
                        <option value="" selected>
                          ---Select---
                        </option>
                        {mainState.options.gst_type.length
                          ? mainState.options.gst_type.map((item) => (
                              <option value={item.value}>{item.name}</option>
                            ))
                          : null}
                      </select>
                      <div className="mb-4" />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{ width: "80%" }}
                          className="js-example-basic-multiple form-control form-control-input"
                          // name="sub_category_id"
                          name="subvendor_id"
                          // id="sub-category-select"
                          onChange={(e) => handleInputChange(e)}
                          // value={mainState.selected.subvendor}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {!!mainState.options.subvendors.length
                            ? mainState.options.subvendors.map((item) => (
                                <option
                                  value={item._id}
                                >{`${item.code} | ${item.subvender_name}`}</option>
                              ))
                            : null}
                        </select>
                        <i
                          className="ml-1 fa fa-pencil-square"
                          // onClick={handleChangesPurchaseAndCollection}
                          style={{
                            fontSize: 30,
                            // height: "100%",
                            // width: "10%",
                          }}
                        />

                        <div class="dropdown">
                          <i
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            className="ml-1 fa fa-bar-chart"
                            style={{
                              fontSize: 30,
                              // height: "100%",
                              // width: "10%",
                            }}
                          />

                          <div
                            class="dropdown-menu"
                            style={{
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <button
                              class="dropdown-item"
                              type="button"
                              // onClick={() => setModalShow1(true)}
                            >
                              <i
                                // onClick={
                                //   handleChangesLast6MonthPuchaseAndCollection
                                // }
                                className="ml-1 fa fa-pencil-square"
                                style={{
                                  fontSize: 30,
                                }}
                              />

                              {` Last 6 Months Purchase & Collection`}
                            </button>
                            <button
                              class="dropdown-item"
                              type="button"
                              // onClick={handleChanges1}
                            >
                              <i
                                // onClick={handleChangesTop6ItemInLast6Months}
                                className="ml-1 fa fa-pencil-square"
                                style={{
                                  fontSize: 30,
                                  // height: "100%",
                                  // width: "10%",
                                }}
                              />

                              {" Top 6 Items In Last 6 Months"}
                            </button>
                            <button
                              class="dropdown-item"
                              type="button"
                              // onClick={handleChanges3}
                            >
                              <i
                                className="ml-1 fa fa-pencil-square"
                                style={{
                                  fontSize: 30,
                                  // height: "100%",
                                  // width: "10%",
                                }}
                              />

                              {" Purchase History"}
                            </button>
                            <button
                              class="dropdown-item"
                              type="button"
                              // onClick={handleChanges4}
                            >
                              <i
                                // onClick={handleChangesPurchaseHistory}
                                className="ml-1 fa fa-pencil-square"
                                style={{
                                  fontSize: 30,
                                  // height: "100%",
                                  // width: "10%",
                                }}
                              />

                              {" Outstanding"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4" />
                      <input
                        type="email"
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        placeholder=""
                        name="email"
                        className="form-control form-control-input"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.email}
                      />
                      <div className="mb-4"></div>
                      <input
                        type="date"
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        name="delivery_date"
                        className="form-control form-control-input"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.delivery_date}
                      />
                    </div>
                    <div className="col-md-1">
                      <label htmlFor="name">Order Date ★</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Order No ★</label>
                      <div className="mb-4" />
                      <label className="control-label">Ref No</label>
                      <div className="mb-4" />
                      <label className="control-label">Ref_Date ★</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Agent</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Tax</label>
                      <div className="mb-4" />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="date"
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        placeholder=""
                        name="order_date"
                        className="form-control form-control-input"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.order_date}
                      />
                      <div className="mb-4" />
                      <input
                        type="number"
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        placeholder=""
                        name="order_no"
                        className="form-control form-control-input"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.order_no}
                        // disabled
                      />
                      <div className="mb-4" />
                      <input
                        type="text"
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        placeholder=""
                        name="ref_no"
                        className="form-control form-control-input"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.ref_no}
                      />
                      <div className="mb-4" />
                      <input
                        type="date"
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        placeholder=""
                        name="ref_date"
                        className="form-control form-control-input"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.ref_date}
                      />
                      <div className="mb-4" />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <select
                          // className="js-example-basic-multiple js-states js-example-responsive form-control-input select2-hidden-accessible"
                          className="js-example-basic-multiple js-states js-example-responsive form-control form-control-input"
                          name="agent"
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                          onChange={(e) => handleInputChange(e)}
                        >
                          <option value selected disabled data-select2-id={3}>
                            ---Select---
                          </option>
                          {mainState.options.agents.length
                            ? mainState.options.agents.map((item) => (
                                <option
                                  value={item.value}
                                >{`${item.code} | ${item.name}}`}</option>
                              ))
                            : null}
                        </select>
                        <i
                          className="ml-1 fa fa-pencil-square"
                          // onClick={handleShowAgentBroker}
                          style={{
                            fontSize: 30,
                            // height: "100%",
                            // width: "10%",
                          }}
                        />
                      </div>

                      <div className="mb-4" />
                      <select
                        className="js-example-basic-multiple form-control form-control-input"
                        name="tax"
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value="" selected>
                          {`---Select---`}
                        </option>
                        {mainState.options.tax.length
                          ? mainState.options.tax.map((item) => (
                              <option
                                value={item.value}
                              >{`${item.name}`}</option>
                            ))
                          : null}
                      </select>
                    </div>
                    <div className="col-md-4">
                      {/* <label htmlFor="name">Billing Address</label> */}
                      <Accordion title={"Billing Address"}>
                        <textarea
                          className="form-control-input"
                          name="billing_address"
                          onChange={(e) => handleInputChange(e)}
                          value={mainState.selected.billing_address}
                        ></textarea>
                        <div className="row">
                          <div className="col-md-4">
                            <label className="control-label">GST No</label>
                          </div>
                          <div
                            className="col-md-8"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              className="form-control"
                              name="billing_gst_no"
                              type={"text"}
                              onChange={(e) => handleInputChange(e)}
                              value={mainState.selected.billing_gst_no}
                            />
                          </div>
                        </div>
                        <div className="mb-1" />
                        <div className="row">
                          <div className="col-md-4">
                            <label className="control-label">
                              Contact Person
                            </label>
                          </div>
                          <div
                            className="col-md-8"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              className="form-control"
                              name="billing_contact_person"
                              type={"text"}
                              onChange={(e) => handleInputChange(e)}
                              value={mainState.selected.billing_contact_person}
                            />
                          </div>
                        </div>
                        <div className="mb-1" />
                      </Accordion>
                      <hr />
                      <div className="mb-4" />
                      <Accordion title={"Delivery At"}>
                        <div className="row">
                          <div className="col-md-4">
                            <label className="control-label">Ship To</label>
                          </div>
                          <div
                            className="col-md-8"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <select
                              style={{
                                width: "90%",
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                              className="js-example-basic-multiple form-control"
                              name="delivery_ship_to_2"
                              onChange={(e) => handleInputChange(e)}
                            >
                              <option value="" selected disabled>
                                ---Selected---
                              </option>
                              {mainState.options.ship_to.length
                                ? mainState.options.ship_to.map((item) => (
                                    <option value={item.value}>
                                      {item.name}
                                    </option>
                                  ))
                                : null}
                            </select>
                            <i
                              className="ml-1 fa fa-pencil-square"
                              style={{
                                fontSize: 30,
                                // height: "100%",
                                // width: "10%",
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-1" />
                        <textarea
                          className="form-control-input"
                          name="delivery_ship_to"
                          onChange={(e) => handleInputChange(e)}
                          value={mainState.selected.delivery_ship_to}
                        ></textarea>
                      </Accordion>
                      {/* <label htmlFor="name">Delivery At</label> */}
                      <hr />
                      <div className="mb-4" />
                      <div className="row">
                        <div className="col-md-4">
                          <label className="control-label">Payment Terms</label>
                        </div>
                        <div
                          className="col-md-8"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <select
                            style={{
                              width: "90%",
                              paddingTop: 0,
                              paddingBottom: 0,
                            }}
                            className="js-example-basic-multiple form-control form-control-input"
                            name="delivery_payment_terms"
                            onChange={(e) => handleInputChange(e)}
                          >
                            <option value="" selected>
                              ---Select---
                            </option>
                            {mainState.options.payment_terms.length
                              ? mainState.options.payment_terms.map((item) => (
                                  <option
                                    value={item.value}
                                  >{`${item.code} | ${item.name}`}</option>
                                ))
                              : null}
                          </select>
                          <i
                            className="ml-1 fa fa-pencil-square"
                            // onClick={handleShowPaymentTerms}
                            style={{
                              fontSize: 30,
                              // height: "100%",
                              // width: "10%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <div className="card-body">
                <div className="form-group">
                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{
                        display: "flex",
                        //alignItems for vertical axis
                        alignItems: "center",
                        // justifyContent: "end",
                      }}
                    >
                      <i
                        className="ml-1 fa fa-barcode"
                        style={{
                          fontSize: 30,
                          // height: "100%",
                          width: "10%",
                        }}
                      />
                      {/* <label htmlFor="name">Barcode</label> */}
                      <input
                        type="text"
                        style={{ width: "90%" }}
                        // min={0}
                        // defaultValue={0}
                        // step="0.01"
                        placeholder="Scan"
                        name="barcode"
                        className="form-control"
                        onChange={(e) => handleInputChange(e)}
                        value={mainState.selected.barcode}
                      />
                    </div>
                    <div
                      className="col-md-4"
                      style={{
                        display: "flex",
                        // alignItems: "center",
                        justifyItems: "end",
                      }}
                    >
                      <button className="form-control">
                        Pull From Requisition
                      </button>
                      <button
                        className="form-control ml-4"
                        // onClick={handleShowItemWithBalance}
                      >
                        ...
                      </button>

                      <button
                        className="form-control ml-4"
                        // onClick={handleShowFastBilling}
                      >
                        ...
                      </button>
                    </div>
                    <div
                      className="col-md-2"
                      style={{
                        display: "flex",
                        //alignItems for vertical axis
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      {/* <i
                      className="ml-1 fa fa-gear"
                      style={{
                        fontSize: 30,
                      }}
                    /> */}
                      <div class="dropdown">
                        <i
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          className="ml-1  fa fa-gear"
                          style={{
                            fontSize: 30,
                            // height: "100%",
                            // width: "10%",
                          }}
                        />
                        <div
                          class="dropdown-menu"
                          style={{
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <button class="dropdown-item" type="button">
                            <i
                              className="ml-1 fa fa-pencil-square"
                              style={{
                                fontSize: 30,
                                // height: "100%",
                                // width: "10%",
                              }}
                            />
                            {` Last 6 Months Purchase & Collection`}
                          </button>
                          <button class="dropdown-item" type="button">
                            <i
                              className="ml-1 fa fa-pencil-square"
                              style={{
                                fontSize: 30,
                                // height: "100%",
                                // width: "10%",
                              }}
                            />
                            {" Top 6 Items In Last 6 Months"}
                          </button>
                          <button class="dropdown-item" type="button">
                            <i
                              className="ml-1 fa fa-pencil-square"
                              style={{
                                fontSize: 30,
                                // height: "100%",
                                // width: "10%",
                              }}
                            />
                            {" Purchase History"}
                          </button>
                          <button class="dropdown-item" type="button">
                            <i
                              className="ml-1 fa fa-pencil-square"
                              style={{
                                fontSize: 30,
                                // height: "100%",
                                // width: "10%",
                              }}
                            />
                            {" Outstanding"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>SL#</th>
                        {/* <th>
                        PPhoto
                      </th> */}
                        <th>
                          {/* <i
                          className="ml-1 fa fa-plus"
                          style={{ color: "green" }}
                        /> */}
                        </th>
                        <th>
                          {/* <i
                          className="ml-1 fa fa-times"
                          style={{ color: "red" }}
                        /> */}
                        </th>
                        <th>
                          {/* <i
                          className="ml-1 fa fa-search"
                          style={{ color: "green" }}
                        /> */}
                        </th>
                        <th>Item Code(hsn)</th>
                        {/* <th>item_id</th>
                      <th>item_name</th> */}
                        <th>Select Item</th>
                        <th>Description</th>
                        {/* <th>Bundle Detail</th> */}
                        {/* <th>Widget</th> */}
                        {/* <th>Dimension</th> */}
                        <th>Pack Unit</th>
                        <th>Pack Qty</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Free Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        {/* <th>Disc Rate</th> */}
                        <th>Disc Amount</th>
                        <th>TaxCode</th>
                        <th>TaxRate</th>
                        <th>Taxable</th>
                        <th>TaxAmount</th>
                        <th>Cess Rate</th>
                        <th>Cess Amount</th>
                        <th>MRP</th>
                        <th>Net Rate</th>
                        <th>Remark</th>
                        <th>Req VNo</th>
                        <th>Req Ref No</th>
                        <th>Req Ref Date</th>
                        <th>Req VDate</th>
                        <th>ItemBalance</th>
                        <th>Barcode</th>
                        <th>IGST</th>
                        <th>CGST(%)</th>
                        <th>SGST(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mainState.items.length
                        ? mainState.items.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              {/* <td>
                              <img src={"https://"}></img>
                            </td> */}
                              <td>
                                <i
                                  // onClick={handleAddItem}
                                  className="ml-1 fa fa-plus"
                                  style={{ color: "green" }}
                                />
                              </td>
                              <td>
                                <i
                                  // onClick={(e) => handleRemoveItem(e, index)}
                                  className="ml-1 fa fa-times"
                                  style={{ color: "red" }}
                                />
                              </td>
                              <td>
                                <i
                                  className="ml-1 fa fa-search"
                                  style={{ color: "green" }}
                                />
                              </td>
                              <td>
                                {/* item_code */}
                                <input
                                  style={{ width: "7vw" }}
                                  className="form-control form-control-input"
                                  name="item_code"
                                  type="text"
                                  value={item.item_code}
                                  disabled
                                />
                              </td>
                              {/* <td>item_id</td>
                          <td>item_name</td> */}
                              <td>
                                {/* select_item */}
                                <select
                                  className="js-example-basic-multiple form-control form-control-input"
                                  name="select_item"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  style={{ width: "10vw" }}
                                >
                                  <option value="" selected>
                                    ---Select---
                                  </option>
                                  {mainState.vendorProducts.length
                                    ? mainState.vendorProducts.map((item) => (
                                        <option
                                          value={item._id}
                                          selected={
                                            mainState.items[index].item_id ===
                                            item._id
                                          }
                                        >
                                          {`${
                                            item.manage_by === "vendor"
                                              ? "*"
                                              : ""
                                          }${truncate(item.pname, 20)}`}
                                        </option>
                                      ))
                                    : null}
                                </select>
                              </td>
                              <td>
                                {/* item_description */}
                                <input
                                  style={{ width: "20vw" }}
                                  className="form-control form-control-input"
                                  name="item_description"
                                  type="text"
                                  value={item.item_description}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_pack_unit */}
                                <select
                                  style={{ width: "10vw" }}
                                  className="js-example-basic-multiple form-control form-control-input"
                                  name="item_pack_unit"
                                  // onChange={(e) => handleEditItem(e, index)}
                                >
                                  <option value="" selected>
                                    ---Select---
                                  </option>
                                  {mainState.options.pack_unit.length
                                    ? mainState.options.pack_unit.map(
                                        (item) => (
                                          <option
                                            value={item.value}
                                            selected={
                                              mainState.items[index]
                                                .item_pack_unit === item.value
                                            }
                                          >
                                            {item.code} {" | "} {item.value}
                                          </option>
                                        )
                                      )
                                    : null}
                                </select>
                              </td>
                              <td>
                                {/* item_pack_qty */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_pack_qty"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_pack_qty}
                                />
                              </td>
                              <td>
                                {/* item_unit */}
                                <select
                                  style={{ width: "10vw" }}
                                  className="js-example-basic-multiple form-control form-control-input"
                                  name="item_unit"
                                  // onChange={(e) => handleEditItem(e, index)}
                                >
                                  <option value="" selected>
                                    ---Select---
                                  </option>
                                  {mainState.options.item_unit.length
                                    ? mainState.options.item_unit.map(
                                        (item) => (
                                          <option
                                            value={item.value}
                                            selected={
                                              mainState.items[index]
                                                .item_unit === item.value
                                            }
                                          >
                                            {item.code} {" | "} {item.value}
                                          </option>
                                        )
                                      )
                                    : null}
                                </select>
                              </td>
                              <td>
                                {/* item_qty */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_qty"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_qty}
                                />
                              </td>
                              <td>
                                {/* item_free_qty */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_free_qty"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_free_qty}
                                />
                              </td>
                              <td>
                                {/* item_rate */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_rate"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_rate}
                                />
                              </td>
                              <td>
                                {/* item_amount */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_amount"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_amount}
                                />
                              </td>
                              {/* <td>
                              <input
                                // item_discount_rate
                                style={{ width: "7vw" }}
                                type="number"
                                className="js-data-example-ajax form-control form-control-input"
                                name="item_discount_rate"
                                onChange={(e) => handleEditItem(e, index)}
                                value={item.item_discount_rate}
                              />
                            </td> */}
                              <td>
                                {/* item_discount_amount */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_discount_amount"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_discount_amount}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_tax_code */}
                                <select
                                  style={{ width: "10vw" }}
                                  className="js-example-basic-multiple form-control form-control-input"
                                  name="item_tax_code"
                                  // onChange={(e) => handleEditItem(e, index)}
                                >
                                  <option value="" selected>
                                    ---Select---
                                  </option>
                                  {mainState.options.tax_code.length
                                    ? mainState.options.tax_code.map((item) => (
                                        <option
                                          value={item.value}
                                          // selected={
                                          //   mainState.items[index]
                                          //     .item_tax_code === item.value
                                          // }
                                        >
                                          {item.code} {" | "} {item.value}
                                        </option>
                                      ))
                                    : null}
                                </select>
                              </td>
                              <td>
                                {/* item_tax_rate */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_tax_rate"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_tax_rate}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_taxable */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_taxable"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_taxable}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_tax_amount */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_tax_amount"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_tax_amount}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_cess_rate */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_cess_rate"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_cess_rate}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_cess_amount */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_cess_amount"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_cess_amount}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_mrp */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_mrp"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_mrp}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_net_rate */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_net_rate"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_net_rate}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_remark */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_remark"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_remark}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_req_vno */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_req_vno"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_req_vno}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_req_ref_no */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_req_ref_no"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_req_ref_no}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_req_ref_date */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_req_ref_date"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_req_ref_date}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_req_vdate */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_req_vdate"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_req_vdate}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_balance */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="number"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_balance"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_balance}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_barcode */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_barcode"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_barcode}
                                  disabled
                                />
                              </td>
                              <td>
                                {/* item_igst */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_igst"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_igst}
                                />
                              </td>
                              <td>
                                {/* item_cgst */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_cgst"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_cgst}
                                />
                              </td>
                              <td>
                                {/* item_sgst */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_sgst"
                                  // onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_sgst}
                                />
                              </td>
                            </tr>
                          ))
                        : "No Items"}
                    </tbody>
                    <thead className="thead-light">
                      <tr>
                        <th></th>
                        {/* <th></th> */}
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        {/* <th></th>
                      <th></th> */}
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                          Sum:
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_pack_qty + acc,
                                0.0
                              )
                            : null}
                        </th>
                        <th></th>
                        <th>
                          Sum:
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_qty + acc,
                                0
                              )
                            : null}
                        </th>
                        <th>
                          Sum:
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_free_qty + acc,
                                0
                              )
                            : null}
                        </th>
                        <th></th>
                        <th>
                          Sum: ₹
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_amount + acc,
                                0
                              )
                            : null}
                        </th>
                        {/* <th></th> */}
                        <th>
                          Sum: ₹
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_discount_amount + acc,
                                0
                              )
                            : null}
                        </th>
                        <th></th>
                        <th></th>
                        <th>
                          Sum: ₹
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_taxable + acc,
                                0
                              )
                            : null}
                        </th>
                        <th>
                          Sum: ₹
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_tax_amount + acc,
                                0
                              )
                            : null}
                        </th>
                        <th></th>
                        <th>
                          Sum: ₹
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_cess_amount + acc,
                                0
                              )
                            : null}
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                          Sum:
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_igst + acc,
                                0
                              )
                            : null}
                        </th>
                        <th>
                          Sum:
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_cgst + acc,
                                0
                              )
                            : null}
                        </th>
                        <th>
                          Sum:
                          {!!mainState.items.length
                            ? mainState.items.reduce(
                                (acc, item) => +item.item_sgst + acc,
                                0
                              )
                            : null}
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              {/* <hr /> */}
              <div className="card-body">
                <div className="form-group">
                  <div className="row">
                    <div
                      className="col-md-12"
                      style={{
                        display: "flex",
                        //alignItems for vertical axis
                        alignItems: "center",
                        // justifyContent: "end",
                      }}
                    >
                      <i
                        // onClick={handleAddItem}
                        className="ml-1 fa fa-plus"
                        style={
                          {
                            // fontSize: 30,
                            // height: "100%",
                            // width: "10%",
                          }
                        }
                      />
                      <i
                        className="ml-4 fa fa-search"
                        style={
                          {
                            // fontSize: 30,
                            // height: "100%",
                            // width: "10%",
                          }
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <div className="card-body">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Remarks</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control form-control-input"
                            name="order_remark"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_remark}
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Attachment</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="file"
                            className="form-control form-control-input"
                            name="order_attachment"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_attachment}
                          ></input>
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Brokerage</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            className="form-control form-control-input"
                            name="order_brokerage"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_brokerage}
                          ></input>
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Advance amount</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            name="order_advance_amount"
                            className="form-control form-control-input"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_advance_amount}
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Advance Ledger</label>
                        </div>
                        <div
                          className="col-md-10"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <select
                            // className="js-example-basic-multiple js-states js-example-responsive form-control-input select2-hidden-accessible"
                            className="js-example-basic-multiple js-states js-example-responsive form-control form-control-input"
                            name="order_advance_ledger"
                            data-select2-id={1}
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value selected disabled data-select2-id={3}>
                              ---Select---
                            </option>
                            {!!mainState.options.advance_ledger.length
                              ? mainState.options.advance_ledger.map((item) => (
                                  <option
                                    value={item.value}
                                  >{`${item.code} | ${item.name} | ${item.value}`}</option>
                                ))
                              : null}
                          </select>
                          <i
                            className="ml-1 fa fa-pencil-square"
                            // onClick={handleShowChartOfAccounts}
                            style={{
                              fontSize: 30,
                              // height: "100%",
                              // width: "10%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Item Value</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            name="order_items_total_value"
                            className="form-control form-control-input"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_items_total_value}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Disc%</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            name="order_items_total_discount_amount"
                            className="form-control form-control-input"
                            onChange={(e) => handleInputChange(e)}
                            value={
                              mainState.selected
                                .order_items_total_discount_amount
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label className="control-label">Taxable</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            name="order_taxable_amount"
                            className="form-control form-control-input"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_taxable_amount}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label className="control-label">Tax Amount</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            name="order_tax_amount"
                            className="form-control form-control-input"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_tax_amount}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Cess Amount</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            className="form-control form-control-input"
                            name="order_cess_amount"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_cess_amount}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Discount</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            className="form-control form-control-input"
                            name="order_extra_discount_amount"
                            onChange={(e) => handleInputChange(e)}
                            value={
                              mainState.selected.order_extra_discount_amount
                            }
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Round Off</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            className="form-control form-control-input"
                            name="order_roundoff"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_roundoff}
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-2">
                          <label htmlFor="name">Doc Amount</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="number"
                            className="form-control form-control-input"
                            name="order_final_amount"
                            onChange={(e) => handleInputChange(e)}
                            value={mainState.selected.order_final_amount}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="form-group">
                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{
                        display: "flex",
                        justifyContent: "start",
                      }}
                    >
                      <button
                        class="ml-1 btn btn-secondary btn-sm"
                        type="button"
                        // onClick={() => handleSavePurchaseOrder()}
                        // onClick={() => console.log(mainState)}
                      >
                        <i className="fa fa-save" />
                        {" Save"}
                      </button>
                      <div class="ml-1 btn-group">
                        <button class="btn btn-secondary btn-sm" type="button">
                          <i className="fa fa-print" />
                          {" Print"}
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">
                            <i className="fa fa-save"></i>
                            {" Preview"}
                          </a>
                          <a class="dropdown-item" href="#">
                            <i className="fa fa-pencil" />
                            {" Export"}
                          </a>
                          <a class="dropdown-item" href="#">
                            <i className="fa fa-list"></i>
                            {" Configuration"}
                          </a>
                          {/* <div class="dropdown-divider"></div> */}
                        </div>
                      </div>
                      <button
                        class="ml-1 btn btn-secondary btn-sm"
                        type="button"
                      >
                        <i className="fa fa-times" />
                        {" Clear"}
                      </button>
                    </div>
                    <div
                      className="col-md-6"
                      style={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <div class="ml-1 btn-group">
                        <button class="btn btn-secondary btn-sm" type="button">
                          <i className="fa fa-envelope" />
                          {" Mail"}
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">
                            <i className="fa fa-save"></i>
                            {" Mail Link"}
                          </a>
                          <a class="dropdown-item" href="#">
                            <i className="fa fa-pencil"></i>
                            {" SMS"}
                          </a>
                        </div>
                      </div>
                      <button
                        class="ml-1 btn btn-secondary btn-sm"
                        type="button"
                      >
                        <i className="fa fa-clock-o" />
                        {" Schedule"}
                      </button>
                      <button
                        class="ml-1 btn btn-secondary btn-sm"
                        type="button"
                      >
                        <i className="fa fa-info-circle" />
                      </button>
                      <div class="ml-1 btn-group">
                        <button class="btn btn-secondary btn-sm" type="button">
                          <i className="fa fa-download" />
                          {` Import`}
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">
                            <i className="fa fa-download"></i>
                            {" Download Format"}
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
    </main>
  );
}

export default SellerPurchaseOrderDetails;
