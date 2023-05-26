import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { MyVerticallyCenteredModal } from "components/modals/myVerticalCenteredModal";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "test.css";
import Accordion from "utils/Accordion";
import { getCurrentDateDDMMYYYY } from "utils/DateTime";
import { truncate } from "utils/truncateText";

function SellerPurchaseOrder() {
  const [state, dispatch] = useContext(Context);
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
      // address: "",
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
      // billing_phone: "",
      billing_email: "",
      billing_longitude: +"",
      billing_latitude: +"",
      shipping_address: "",
      shipping_country: "",
      shipping_state: "",
      shipping_city: "",
      shipping_pincode: +"",
      // shipping_phone: "",
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
  const initialModalState = {
    seller: false,
    language: false,
    last6MonthsPuchaseAndCollection: false,
    top6ItemsInLast6Months: false,
    purchaseHistory: false,
    outStanding: false,
    itemWithBalance: false,
    fastBilling: false,
    purchaseAndCollection: false,
    chartOfAccounts: false,
    territory: false,
    partyCategorySupplier: false,
    state: false,
    city: false,
    underCity: false,
    routeMap: false,
    paymentTerms: false,
    priceCategoryPurchase: false,
    agentBroker: false,
    transporter: false,
  };
  // setModalState("state",false)
  const [mainState, setMainState] = useState(initialState);
  const [mainModalState, setMainModalState] = useState(initialModalState);
  const setModalState = (fieldName, fieldValue) => {
    if (fieldName === "seller") {
      setMainModalState((prev) => ({ ...prev, [fieldName]: !!fieldValue }));
    }
  };

  const handleAddItem = (e, index) => {
    const newItems = mainState.items.slice();
    newItems.push({
      item_code: "",
      item_id: "",
      item_name: "",
      item_description: "",
      item_pack_unit: "box",
      item_pack_unit_multiplier: 1,
      item_pack_qty: 0,
      item_unit: "pcs",
      item_unit_multiplier: 1,
      item_qty: 0,
      item_free_qty: 0,
      item_rate: "",
      item_amount: 0,
      item_discount_rate: 0, //percentage
      item_discount_amount: 0,
      // item_discount_amount:
      //   +"" - +"", //percentage
      item_tax_code: "",
      item_tax_rate: 0,
      item_taxable: 0,
      item_tax_amount: 0,
      item_cess_rate: 0,
      item_cess_amount: 0,
      item_mrp: "",
      item_expiry_date: "",
      item_net_rate: 0,
      item_remark: "",
      item_req_vno: "",
      item_req_ref_no: "",
      item_req_ref_date: "",
      item_req_vdate: "",
      item_balance: 0,
      item_barcode: "",
      item_barcode: "",
      item_igst: 0,
      item_cgst: 0,
      item_sgst: 0,
    });

    setMainState((prev) => ({ ...prev, items: newItems }));
  };

  const handleEditItem = (e, index) => {
    const { name, value } = e.target;
    console.log(name, value);

    const newItems = mainState.items.slice();
    const newSelected = {
      ...mainState.selected,
    };
    //
    newItems[index] = { ...newItems[index], [name]: value };
    //

    const recalculateEveryThing = (items2) => {
      console.log(items2);

      return items2;
    };

    if (name === "select_item") {
      const productDetails = mainState.vendorProducts.filter(
        (item1) => item1._id === value
      );

      if (!productDetails.length) {
        alert("#1 Error");
        return;
      }

      newItems[index] = {
        ...newItems[index],
        item_code: productDetails[0].hsncode,
        item_id: productDetails[0]._id,
        item_name: productDetails[0].pname,
        item_description: productDetails[0].pdesc,
        item_pack_unit: "box",
        item_pack_qty: 0,
        item_unit: "pcs",
        item_qty: 0,
        item_free_qty: 0,
        item_rate: "1",
        item_amount: 0,
        item_discount_rate: 0, //percentage
        item_discount_amount: 0,
        // item_discount_amount:
        //   +productDetails[0].display_price - +productDetails[0].selling_price, //percentage
        item_tax_code: "",
        item_tax_rate: 0,
        item_taxable: 0,
        item_tax_amount: 0,
        item_cess_rate: 0,
        item_cess_amount: 0,
        item_mrp: productDetails[0].display_price,
        item_expiry_date: "",
        item_net_rate: 0,
        item_remark: "",
        item_req_vno: "",
        item_req_ref_no: "",
        item_req_ref_date: "",
        item_req_vdate: "",
        item_balance: 0,
        item_barcode: "",
        item_barcode: productDetails[0].hsncode,
        item_igst: 0,
        item_cgst: 0,
        item_sgst: 0,
      };

      setMainState((prev) => ({
        ...prev,
        items: newItems,
      }));
    } else if (name === "item_qty") {
      // recalculateEveryThing();
      newItems[index].item_amount = +value * +newItems[index].item_rate;
      newItems[index].item_taxable =
        +newItems[index].item_amount - +newItems[index].item_discount_amount;

      newSelected.order_items_total_value = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_amount + acc, 0)
        : 0;
      newSelected.order_items_total_discount_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_discount_amount + acc, 0)
        : 0;
      newSelected.order_taxable_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_taxable + acc, 0)
        : 0;
      newSelected.order_final_amount =
        +newSelected.order_taxable_amount +
        +newSelected.order_cess_amount -
        +newSelected.order_extra_discount_amount +
        +newSelected.order_roundoff;

      // newSelected.order_tax_amount;
      // newSelected.order_cess_amount;
      // newSelected.order_extra_discount_amount;
      // newSelected.order_roundoff;
      // newSelected.order_final_amount;

      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    } else if (name === "item_rate") {
      newItems[index].item_net_rate = +value;
      newItems[index].item_amount =
        +newItems[index].item_qty * +newItems[index].item_rate;
      newItems[index].item_taxable =
        +newItems[index].item_amount - +newItems[index].item_discount_amount;

      newSelected.order_items_total_value = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_amount + acc, 0)
        : 0;
      newSelected.order_items_total_discount_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_discount_amount + acc, 0)
        : 0;
      newSelected.order_taxable_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_taxable + acc, 0)
        : 0;
      newSelected.order_final_amount =
        +newSelected.order_taxable_amount +
        +newSelected.order_cess_amount -
        +newSelected.order_extra_discount_amount +
        +newSelected.order_roundoff;

      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    } else if (name === "item_discount_amount") {
      // item_discount_rate
      // newItems[index].item_discount_amount =
      //   (+newItems[index].item_amount * +newItems[index].item_discount_rate) /
      //   100;
      newItems[index].item_taxable =
        +newItems[index].item_amount - +newItems[index].item_discount_amount;

      newSelected.order_items_total_value = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_amount + acc, 0)
        : 0;
      newSelected.order_items_total_discount_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_discount_amount + acc, 0)
        : 0;
      newSelected.order_taxable_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_taxable + acc, 0)
        : 0;
      newSelected.order_final_amount =
        +newSelected.order_taxable_amount +
        +newSelected.order_cess_amount -
        +newSelected.order_extra_discount_amount +
        +newSelected.order_roundoff;

      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    } else if (name === "item_cess_rate") {
      newItems[index].item_cess_amount =
        (+value * newItems[index].item_taxable) / 100;

      newSelected.order_cess_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_cess_amount + acc, 0)
        : 0;

      newSelected.order_final_amount =
        +newSelected.order_taxable_amount +
        +newSelected.order_cess_amount -
        +newSelected.order_extra_discount_amount +
        +newSelected.order_roundoff;

      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    } else if (name === "item_pack_unit") {
      // recalculateEveryThing();
      newItems[index].item_pack_unit_multiplier =
        initialState.options.pack_unit.filter(
          (item) => item.value === value
        )[0].qty;

      newItems[index].item_qty =
        +newItems[index].item_pack_unit_multiplier *
        +newItems[index].item_pack_qty;

      newItems[index].item_amount =
        +newItems[index].item_qty * +newItems[index].item_rate;

      newItems[index].item_taxable =
        +newItems[index].item_amount - +newItems[index].item_discount_amount;

      newSelected.order_items_total_value = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_amount + acc, 0)
        : 0;
      newSelected.order_items_total_discount_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_discount_amount + acc, 0)
        : 0;
      newSelected.order_taxable_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_taxable + acc, 0)
        : 0;
      newSelected.order_final_amount =
        +newSelected.order_taxable_amount +
        +newSelected.order_cess_amount -
        +newSelected.order_extra_discount_amount +
        +newSelected.order_roundoff;

      // newSelected.order_tax_amount;
      // newSelected.order_cess_amount;
      // newSelected.order_extra_discount_amount;
      // newSelected.order_roundoff;
      // newSelected.order_final_amount;

      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    } else if (name === "item_pack_qty") {
      // recalculateEveryThing();
      newItems[index].item_qty =
        +newItems[index].item_pack_unit_multiplier *
        +newItems[index].item_pack_qty;

      newItems[index].item_amount =
        +newItems[index].item_qty * +newItems[index].item_rate;

      newItems[index].item_taxable =
        +newItems[index].item_amount - +newItems[index].item_discount_amount;

      newSelected.order_items_total_value = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_amount + acc, 0)
        : 0;
      newSelected.order_items_total_discount_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_discount_amount + acc, 0)
        : 0;
      newSelected.order_taxable_amount = !!newItems.length
        ? newItems.reduce((acc, item) => +item.item_taxable + acc, 0)
        : 0;
      newSelected.order_final_amount =
        +newSelected.order_taxable_amount +
        +newSelected.order_cess_amount -
        +newSelected.order_extra_discount_amount +
        +newSelected.order_roundoff;

      // newSelected.order_tax_amount;
      // newSelected.order_cess_amount;
      // newSelected.order_extra_discount_amount;
      // newSelected.order_roundoff;
      // newSelected.order_final_amount;

      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    } else {
      console.log(newItems[index][name]);
      console.log(newItems);
      setMainState((prev) => ({
        ...prev,
        items: newItems,
        selected: newSelected,
      }));
    }
  };

  const handleRemoveItem = (e, index) => {
    const newItems = mainState.items.slice();

    if (
      !window.confirm(
        `Are you sure you want to delete ${newItems[index].item_name} record?`
      )
    ) {
      return;
    }

    newItems.splice(index, 1);
    setMainState((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "order_extra_discount_amount") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
          order_final_amount:
            +prev.selected.order_taxable_amount +
            +prev.selected.order_cess_amount -
            +value,
        },
      }));
    } else if (name === "order_roundoff") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
          order_final_amount:
            +prev.selected.order_taxable_amount +
            +prev.selected.order_cess_amount -
            +prev.selected.order_extra_discount_amount +
            +value,
        },
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    }
  };

  const validateSavePurchaseOrder = () => {
    let selectedErrors = {};
    let itemsErrors = {};
    let formIsValid = true;

    const newState = { ...mainState };

    Object.entries(newState.selected).forEach((item) => {
      if (!item[1]) {
        if (
          item[0] === "order_advance_ledger" ||
          item[0] === "order_brokerage" ||
          item[0] === "order_tax_amount" ||
          item[0] === "order_cess_amount" ||
          item[0] === "order_roundoff" ||
          item[0] === "order_extra_discount_amount" ||
          item[0] === "order_items_total_discount_amount" ||
          item[0] === "order_remark" ||
          item[0] === "order_advance_amount"
        ) {
          console.log(item[0]);
        } else {
          console.log(item[0]);
          formIsValid = false;
          selectedErrors[item[0]] = "Cannot be empty";
        }
      }
    });

    if (!newState.items.length) {
      formIsValid = false;
      itemsErrors["items"] = "items are empty";
    } else {
      newState.items.map((item2) => {
        Object.entries(item2).forEach((item3) => {
          if (!item3[1]) {
            if (
              item3[0] === "item_discount_rate" ||
              item3[0] === "item_tax_amount" ||
              item3[0] === "item_cess_rate" ||
              item3[0] === "item_cess_amount" ||
              item3[0] === "item_free_qty" ||
              item3[0] === "item_discount_amount" ||
              item3[0] === "item_remark" ||
              item3[0] === "item_req_vno" ||
              item3[0] === "item_req_ref_no" ||
              item3[0] === "item_req_ref_date" ||
              item3[0] === "item_req_vdate" ||
              item3[0] === "item_balance" ||
              item3[0] === "item_cgst" ||
              item3[0] === "item_sgst" ||
              item3[0] === "item_igst" ||
              item3[0] === "item_tax_rate"
            ) {
              console.log(item3[0]);
            } else {
              console.log(item3[0]);
              formIsValid = false;
              itemsErrors[item3[0]] = "Cannot be empty";
            }
          }
        });
      });
    }

    setMainState((prev) => ({
      ...prev,
      selectedErrors,
      itemsErrors,
    }));

    if (!formIsValid) {
      if (Object.keys(selectedErrors)[0]) {
        alert(
          `${Object.keys(selectedErrors)[0]}-${
            selectedErrors[Object.keys(selectedErrors)[0]]
          }`
        );
      }
      alert(
        `${Object.keys(itemsErrors)[0]}-${
          itemsErrors[Object.keys(itemsErrors)[0]]
        }`
      );
      return;
    }

    return formIsValid;
  };

  const handleSavePurchaseOrder = () => {
    const validated = validateSavePurchaseOrder();
    const newState = { ...mainState };

    if (!validated) {
      // alert("Invalid");
      return;
    }

    const myData = JSON.stringify({
      gst_type: newState.selected.gst_type,
      email: newState.selected.email,
      subvendor_id: newState.selected.subvendor_id,
      delivery_date: newState.selected.delivery_date,
      order_date: newState.selected.order_date,
      order_no: newState.selected.order_no,
      ref_no: newState.selected.ref_no,
      ref_date: newState.selected.ref_date,
      agent: newState.selected.agent,
      tax: newState.selected.tax,
      billing_address: newState.selected.billing_address,
      billing_gst_no: newState.selected.billing_gst_no,
      billing_contact_person: newState.selected.billing_contact_person,
      delivery_ship_to: newState.selected.delivery_ship_to,
      delivery_payment_terms: newState.selected.delivery_payment_terms,
      product: newState.items.map((item) => ({
        item_code: item.item_code,
        item_id: item.item_id,
        item_name: item.item_name,
        item_description: item.item_description,
        item_pack_unit: item.item_pack_unit,
        item_pack_qty: item.item_pack_qty,
        item_unit: item.item_unit,
        item_qty: item.item_qty,
        item_free_qty: item.item_free_qty,
        item_rate: item.item_rate,
        item_amount: item.item_amount,
        item_discount_rate: item.item_discount_rate,
        item_discount_amount: item.item_discount_amount,
        item_tax_code: item.item_tax_code,
        item_tax_rate: item.item_tax_rate,
        item_taxable: item.item_taxable,
        item_tax_amount: item.item_tax_amount,
        item_cess_rate: item.item_cess_rate,
        item_cess_amount: item.item_cess_amount,
        item_mrp: item.item_mrp,
        item_expiry_date: item.item_expiry_date,
        item_net_rate: item.item_net_rate,
        item_remark: item.item_remark,
        item_req_vno: item.item_req_vno,
        item_req_ref_no: item.item_req_ref_no,
        item_req_ref_date: item.item_req_ref_date,
        item_req_vdate: item.item_req_vdate,
        item_balance: item.item_balance,
        item_barcode: item.item_barcode,
        item_igst: item.item_igst,
        item_cgst: item.item_cgst,
        item_sgst: item.item_sgst,
      })),
      order_remark: newState.selected.order_remark,
      order_brokerage: newState.selected.order_brokerage,
      order_advance_amount: newState.selected.order_advance_amount,
      order_advance_ledger: newState.selected.order_advance_ledger,
      order_items_total_value: newState.selected.order_items_total_value,
      order_items_total_discount_amount:
        newState.selected.order_items_total_discount_amount,
      order_taxable_amount: newState.selected.order_taxable_amount,
      order_tax_amount: newState.selected.order_tax_amount,
      order_cess_amount: newState.selected.order_cess_amount,
      order_extra_discount_amount:
        newState.selected.order_extra_discount_amount,
      order_roundoff: newState.selected.order_roundoff,
      order_final_amount: newState.selected.order_final_amount,
    });

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/purchase",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
        // ...formData.getHeaders(),
      },
      data: myData,
    })
      .then(function (response) {
        console.log(response.data);
        setMainState(initialState);
        alert("Successfully Placed Purchase Order");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
        // alert("Failed to place Purchase Order");
      });
  };

  const handleInputChangePurchaseAndCollection = (e) => {
    const { name, value } = e.target;

    if (name === "is_common" || name === "under_vendor") {
      setMainState((prev) => ({
        ...prev,
        purchaseAndCollection: {
          ...prev.purchaseAndCollection,
          [name]: e.target.checked,
        },
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        purchaseAndCollection: {
          ...prev.purchaseAndCollection,
          [name]: value,
        },
      }));
    }
  };

  const apiGetAllSubVendors = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subvender",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          options: {
            ...prev.options,
            subvendors: response.data.data[0].subvender,
          },
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const emptyAddNewSubVendorForm = () => {
    setMainState((prev) => ({
      ...prev,
      purchaseAndCollection: {
        ...prev.purchaseAndCollection,
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
    }));
  };

  const validateAddNewSubVendor = () => {
    let errors = {};
    let formIsValid = true;

    const newState = { ...mainState.purchaseAndCollection };

    Object.entries(newState).forEach((item) => {
      console.log(item);
      if (!item[1]) {
        formIsValid = false;
        errors[item[0]] = "Cannot be empty";
      }
    });

    setMainState((prev) => ({
      ...prev,
      purchaseAndCollectionErrors: errors,
    }));

    return {
      errors,
      isValid: formIsValid,
    };
  };

  const handleAddNewSubVendor = () => {
    const validated = validateAddNewSubVendor();

    if (!validated?.isValid) {
      const firstEntry = Object.entries(validated?.errors)[0];
      alert((firstEntry?.[0] || "") + " " + (firstEntry?.[1] || "")); // returns 'someVal'
      // alert("Please fill all fields");
      // alert(mainState.purchaseAndCollectionErrors);
      return;
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/subvender",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      // data:JSON.stringify(mainState.purchaseAndCollection)
      data: JSON.stringify({
        gst: mainState?.purchaseAndCollection?.gst,
        vender_name: mainState?.purchaseAndCollection?.vender_name,
        company_name: mainState?.purchaseAndCollection?.company_name,
        code: +mainState?.purchaseAndCollection?.code,
        under_ledger: mainState?.purchaseAndCollection?.under_ledger,
        is_common: "" + mainState?.purchaseAndCollection?.is_common,
        under_vendor: mainState?.purchaseAndCollection?.under_vendor,
        firm_type: mainState?.purchaseAndCollection?.firm_type,
        territory: mainState?.purchaseAndCollection?.territory,
        party_category: mainState?.purchaseAndCollection?.party_category,
        contact: +mainState?.purchaseAndCollection?.contact,
        cin: mainState?.purchaseAndCollection?.cin,
        tds_section: mainState?.purchaseAndCollection?.tds_section,
        //
        address: mainState?.purchaseAndCollection?.billing_address,
        //
        billing_address: mainState?.purchaseAndCollection?.billing_address,
        billing_country: mainState?.purchaseAndCollection?.billing_country,
        billing_state: mainState?.purchaseAndCollection?.billing_state,
        billing_city: mainState?.purchaseAndCollection?.billing_city,
        billing_pincode: +mainState?.purchaseAndCollection?.billing_pincode,
        billing_phone: mainState?.purchaseAndCollection?.billing_phone,
        billing_email: mainState?.purchaseAndCollection?.billing_email,
        billing_longitude: +mainState?.purchaseAndCollection?.billing_longitude,
        billing_latitude: +mainState?.purchaseAndCollection?.billing_latitude,
        shipping_address: mainState?.purchaseAndCollection?.shipping_address,
        shipping_country: mainState?.purchaseAndCollection?.shipping_country,
        shipping_state: mainState?.purchaseAndCollection?.shipping_state,
        shipping_city: mainState?.purchaseAndCollection?.shipping_city,
        shipping_pincode: +mainState?.purchaseAndCollection?.shipping_pincode,
        shipping_phone: mainState?.purchaseAndCollection?.shipping_phone,
        shipping_email: mainState?.purchaseAndCollection?.shipping_email,
        shipping_longitude:
          +mainState?.purchaseAndCollection?.shipping_longitude,
        shipping_latitude: +mainState?.purchaseAndCollection?.shipping_latitude,
        //
        root_map: mainState?.purchaseAndCollection?.root_map,
        website: mainState?.purchaseAndCollection?.website,
        facebook: mainState?.purchaseAndCollection?.facebook,
        skype: mainState?.purchaseAndCollection?.skype,
        twitter: mainState?.purchaseAndCollection?.twitter,
        linkedin: mainState?.purchaseAndCollection?.linkedin,
        //
        payment_term: mainState?.purchaseAndCollection?.payment_term,
        price_category: mainState?.purchaseAndCollection?.price_category,
        agent: mainState?.purchaseAndCollection?.agent,
        transporter: mainState?.purchaseAndCollection?.transporter,
        credit_limit: mainState?.purchaseAndCollection?.credit_limit,
        bank_ifsc_or_rtgs_no:
          mainState?.purchaseAndCollection?.bank_ifsc_or_rtgs_no,
        bank_account_no: mainState?.purchaseAndCollection?.bank_account_no,
        bank_name: mainState?.purchaseAndCollection?.bank_name,
        bank_branch: mainState?.purchaseAndCollection?.bank_branch,
      }),
    })
      .then((response) => {
        console.log(response.data);
        emptyAddNewSubVendorForm();
        alert("Successsfully Added New Seller/Sub-Vendor");
        apiGetAllSubVendors();
      })
      .catch((error) => {
        defaultAPIErrorHandler(error);
      });
  };

  const handleCopyFromBilling = () => {
    setMainState((prev) => ({
      ...prev,
      purchaseAndCollection: {
        ...prev.purchaseAndCollection,
        shipping_address: prev.purchaseAndCollection.billing_address,
        shipping_country: prev.purchaseAndCollection.billing_country,
        shipping_state: prev.purchaseAndCollection.billing_state,
        shipping_city: prev.purchaseAndCollection.billing_city,
        shipping_pincode: prev.purchaseAndCollection.billing_pincode,
        shipping_email: prev.purchaseAndCollection.billing_email,
        shipping_phone: prev.purchaseAndCollection.billing_phone,
        shipping_longitude: prev.purchaseAndCollection.billing_longitude,
        shipping_latitude: prev.purchaseAndCollection.billing_latitude,
      },
    }));
  };

  const apiGetPurchaseProducts = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product/getpurchaseproduct",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          vendorProducts: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetAllSubVendors();
    apiGetPurchaseProducts();
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
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-folder" />
                      {" Open"}
                    </button>
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-trash" />
                      {" Delete"}
                    </button>
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-clone" />
                      {" Copy"}
                    </button>
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-times" />
                      {" Cancel"}
                    </button>
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
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
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-calculator" />
                      {" Calculator"}
                    </button>
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-question-circle" />
                      {" Help"}
                    </button>
                    <button class="m-1 btn btn-secondary btn-sm" type="button">
                      <i className="fa fa-gear" />
                      <span>{" Configuration"}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-1 col-6">
                      <label htmlFor="name">GST Type</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Sub Vendor ★</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Email</label>
                      <div className="mb-4" />
                      <label htmlFor="name">Delivery Date ★</label>
                      <div className="mb-4" />
                    </div>
                    <div className="col-md-3 col-6">
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
                          className="m-1 fa fa-plus"
                          onClick={() => setModalState("seller", true)}
                          style={{
                            fontSize: 20,
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
                              onClick={() =>
                                setModalState(
                                  "last6MonthsPuchaseAndCollection",
                                  true
                                )
                              }
                            >
                              <i
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
                              onClick={() =>
                                setModalState("top6ItemsInLast6Months", true)
                              }
                            >
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
                            <button
                              class="dropdown-item"
                              type="button"
                              onClick={() =>
                                setModalState("purchaseHistory", true)
                              }
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
                              onClick={() => setModalState("outStanding", true)}
                            >
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
                    <hr />
                    <div className="col-md-1 col-6">
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
                    <div className="col-md-3 col-6">
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
                          onClick={() => setModalState("agentBroker", true)}
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
                    <hr />
                    <div className="col-md-4 col-12">
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
                            onClick={() => setModalState("paymentTerms", true)}
                            style={{
                              fontSize: 30,
                              // height: "100%",
                              // width: "10%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
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
                        onClick={() => setModalState("itemWithBalance", true)}
                      >
                        ...
                      </button>

                      <button
                        className="form-control ml-4"
                        onClick={() => setModalState("fastBilling", true)}
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
                        <th>Expiry Date</th>
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
                                  onClick={handleAddItem}
                                  className="ml-1 fa fa-plus"
                                  style={{ color: "green" }}
                                />
                              </td>
                              <td>
                                <i
                                  onClick={(e) => handleRemoveItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_pack_qty}
                                />
                              </td>
                              <td>
                                {/* item_unit */}
                                <select
                                  style={{ width: "10vw" }}
                                  className="js-example-basic-multiple form-control form-control-input"
                                  name="item_unit"
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_mrp}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_expiry_date */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="date"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_expiry_date"
                                  onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_expiry_date}
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
                                  onChange={(e) => handleEditItem(e, index)}
                                  value={item.item_net_rate}
                                  // disabled
                                />
                              </td>
                              <td>
                                {/* item_remark */}
                                <input
                                  style={{ width: "7vw" }}
                                  type="text"
                                  className="js-data-example-ajax form-control form-control-input"
                                  name="item_remark"
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                                  onChange={(e) => handleEditItem(e, index)}
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
                        onClick={handleAddItem}
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
                            onClick={() =>
                              setModalState("chartOfAccounts", true)
                            }
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
                        onClick={() => handleSavePurchaseOrder()}
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
                          <a class="dropdown-item">
                            <i className="fa fa-save"></i>
                            {" Preview"}
                          </a>
                          <a class="dropdown-item">
                            <i className="fa fa-pencil" />
                            {" Export"}
                          </a>
                          <a class="dropdown-item">
                            <i className="fa fa-list"></i>
                            {" Configuration"}
                          </a>
                          {/* <div class="dropdown-divider"></div> */}
                        </div>
                      </div>
                      <button
                        class="m-1 btn btn-secondary btn-sm"
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
                      <div class="m-1 btn-group">
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
                          <a class="dropdown-item">
                            <i className="fa fa-save"></i>
                            {" Mail Link"}
                          </a>
                          <a class="dropdown-item">
                            <i className="fa fa-pencil"></i>
                            {" SMS"}
                          </a>
                        </div>
                      </div>
                      <button
                        class="m-1 btn btn-secondary btn-sm"
                        type="button"
                      >
                        <i className="fa fa-clock-o" />
                        {" Schedule"}
                      </button>
                      <button
                        class="m-1 btn btn-secondary btn-sm"
                        type="button"
                      >
                        <i className="fa fa-info-circle" />
                      </button>
                      <div class="m-1 btn-group">
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
                          <a class="dropdown-item">
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
      {/* Add Seller/Sub-Vendor */}
      <Modal
        show={mainModalState?.seller}
        onHide={() => setMainState((prev) => ({ ...prev, seller: false }))}
        centered
        size="xl"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Add Seller/Sub-Vendor</Modal.Title>
          <Button
            onClick={() => setModalState("seller", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <h5>
            {" "}
            <i className="fa fa-book " />
            Basic
          </h5>
          <div className="row">
            <div className="col-md-4">GST No*</div>
            <div
              className="col-md-4 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <input
                className=" form-control w-100"
                type="text"
                name="gst"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.gst}
              />
              <>
                <i
                  className="fa fa-pencil-square"
                  onClick={() => setModalState("language", true)}
                  style={{ fontSize: 30 }}
                />
              </>
              {/* <Button>
                                <i className="fa fa-pencil-globe" style={{fontSize: 30}} />
                                  <i className="fa fa-globe" />
                                  </Button> */}
            </div>
            <div className="col-md-4">
              <img class="defaultimageid" src=""></img>
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-4" P-1>
              Seller Name*
            </div>
            <div className="col-md-4">
              <input
                className=" form-control w-100"
                type="text"
                name="vender_name"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.vender_name}
              />
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row p-1">
            <div className="col-md-4" P-1>
              Company Name*
            </div>
            <div className="col-md-4">
              <input
                className=" form-control w-100"
                type="text"
                name="company_name"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.company_name}
              />
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row p-1">
            <div className="col-md-4">Code*</div>
            <div className="col-md-4 d-flex">
              <input
                className=" form-control w-100"
                type="number"
                name="code"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.code}
              />
              <Button variant="outline-light">C</Button>
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row p-1">
            <div className="col-md-4 ">Under Ledger*</div>
            <div
              className="col-md-4 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className=" form-control w-100"
                name="under_ledger"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.under_ledger}
              >
                <option value={""} selected disabled>
                  --Select Option--
                </option>
                <option value={1}>Ledger1</option>
                <option value={2}>Ledger2</option>
                <option value={3}>Ledger3</option>
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("chartOfAccounts", true)}
                style={{ fontSize: 30 }}
              />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-4">Vendor common for sales purpose*</div>
            <div
              className="col-md-4"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <input
                type="checkbox"
                name="is_common"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.is_common}
              />
            </div>
            <div className="col-md-4">{/* <button type="">ON</button> */}</div>
          </div>
          <div className="row p-1">
            <div className="col-md-4">Is sub vendor*</div>
            <div
              className="col-md-4"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <input
                type="checkbox"
                name="under_vendor"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.under_vendor}
              />
            </div>
            <div className="col-md-4">
              <div />
            </div>
          </div>
          {/* <div className="row p-1">
                              <div className="col-md-4">Inactive</div>
                              <div
                                className="col-md-4"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <input type="checkbox" />{" "}
                              </div>
                              <div className="col-md-4" />
                            </div> */}

          <div className="row p-1">
            <div className="col-md-4">FirmStatus</div>
            <div className="col-md-4 d-flex">
              <select
                className=" form-control w-100"
                name="firm_type"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.firm_type}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                {[
                  "pvt-ltd",
                  "individual",
                  "propritary",
                  "partner",
                  "llp",
                  "company",
                  "overseas",
                  "cooperative-society",
                ].map((item) => (
                  <option
                    value={item}
                    className="text-capitalize"
                    selected={
                      item === mainState.purchaseAndCollection.firm_type
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row p-1">
            <div className="col-md-4">Territory</div>
            <div
              className="col-md-4 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className=" form-control w-100"
                name="territory"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.territory}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("territory", true)}
                style={{ fontSize: 30 }}
              />

              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-4">Vendor Category</div>
            <div
              className="col-md-4 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className=" form-control w-100"
                name="party_category"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.party_category}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("partyCategorySupplier", true)}
                style={{ fontSize: 30 }}
              />

              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-4">Contact </div>
            <div className="col-md-4">
              <input
                className=" form-control w-100"
                type="number"
                name="contact"
                onChange={(e) => {
                  e.target.value = e.target.value?.slice(0, 10);
                  handleInputChangePurchaseAndCollection(e);
                }}
                value={mainState?.purchaseAndCollection?.contact}
              />
            </div>
            <div className="col-md-4" />
          </div>
          <h5>
            <i className="fa fa-book" />
            Statutory
          </h5>
          {/* <div className="row p-1">
            <div className="col-md-3">GST</div>
            <div className="col-md-3">
              <input className=" form-control w-100" type="text" />
            </div>
            <div className="col-md-3">GST Category</div>
            <div className="col-md-3">
              <input className=" form-control w-100" type="text" />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Registration Date</div>
            <div className="col-md-3">
              <input className="form-control w-100" type="date" />
            </div>
            <div className="col-md-3">GST Suspend</div>
            <div
              className="col-md-3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <input type="checkbox" />
            </div>
          </div> */}
          <div className="row p-1">
            <div className="col-md-3">CIN</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="text"
                name="cin"
                onChange={(e) => {
                  // e.target.value = e.target.value?.slice(0, 10);
                  handleInputChangePurchaseAndCollection(e);
                }}
                value={mainState?.purchaseAndCollection?.cin}
              />
            </div>
            {/* <div className="col-md-3">Distance</div>
            <div className="col-md-3">
              <input className=" form-control w-100" type="text" />
            </div> */}
          </div>
          <div className="row p-1">
            {/* <div className="col-md-3">PAN</div>
            <div className="col-md-3">
              <input className=" form-control w-100" type="text" />
            </div> */}
            <div className="col-md-3">TDS on GST applicable</div>
            <div
              className="col-md-3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <input
                type="checkbox"
                name="tds_section"
                onChange={(e) => {
                  // e.target.value = e.target.value?.slice(0, 10);
                  handleInputChangePurchaseAndCollection(e);
                }}
                checked={mainState?.purchaseAndCollection?.tds_section}
              />
            </div>
          </div>
          {/* <div className="row p-1"> */}
          {/* <div className="col-md-3" /> */}
          {/* <div className="col-md-3" /> */}
          {/* <div className="col-md-3">TDS applicable</div>
            <div className="col-md-3">
              <Button variant="outline-dark">On</Button>
            </div> */}
          {/* </div> */}
          <h5>
            {" "}
            <i className="fa fa-book" />
            Communication
          </h5>
          <div className="row p-1">
            <div className="col-md-3">
              <h4>Billing Information</h4>
            </div>
            <div className="col-md-3" />
            <div className="col-md-3">
              <h4>Shipping Information</h4>
            </div>
            <div className="col-md-3">
              <Button
                variant="outline-dark"
                onClick={() => handleCopyFromBilling()}
              >
                CopyFromBilling
              </Button>
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Address</div>
            <div className="col-md-3">
              <textarea
                defaultValue={""}
                name="billing_address"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_address}
              />
            </div>
            <div className="col-md-3">Address</div>
            <div className="col-md-3 ">
              <textarea
                defaultValue={""}
                name="shipping_address"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_address}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Country</div>
            <div className="col-md-3">
              <input
                className=" form-control w-100"
                type="text"
                name="billing_country"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_country}
              />
            </div>
            <div className="col-md-3">Country</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="text"
                name="shipping_country"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_country}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">State</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="billing_state"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_state}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>State1</option>
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("state", true)}
                style={{ fontSize: 30 }}
              />

              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3">State</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="shipping_state"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_state}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>State1</option>
              </select>
              <i className="fa fa-pencil-square" style={{ fontSize: 30 }} />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">City</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="billing_city"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_city}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>City1</option>
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("city", true)}
                style={{ fontSize: 30 }}
              />

              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3">City</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="shipping_city"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_city}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>City1</option>
              </select>
              <i className="fa fa-pencil-square" style={{ fontSize: 30 }} />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Pincode</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="number"
                name="billing_pincode"
                onChange={(e) => {
                  e.target.value = e.target.value?.slice(0, 6);
                  handleInputChangePurchaseAndCollection(e);
                }}
                value={mainState?.purchaseAndCollection?.billing_pincode}
              />
            </div>
            <div className="col-md-3">Pincode</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="number"
                name="shipping_pincode"
                onChange={(e) => {
                  e.target.value = e.target.value?.slice(0, 6);
                  handleInputChangePurchaseAndCollection(e);
                }}
                value={mainState?.purchaseAndCollection?.shipping_pincode}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3"> Phone</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <input
                className="form-control w-100"
                type="number"
                name="billing_phone"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_phone}
              />
            </div>
            <div className="col-md-3"> Phone</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <input
                className="form-control w-30"
                type="number"
                name="shipping_phone"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_phone}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3"> Email</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <i className="fa fa-envelope mr-2" />
              <input
                className="form-control w-100"
                type="text"
                name="billing_email"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_email}
              />
            </div>
            <div className="col-md-3"> Email</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <i className="fa fa-envelope mr-2" />
              <input
                className="form-control w-30"
                type="text"
                name="shipping_email"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_email}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Longitude</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="number"
                name="billing_longitude"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_longitude}
              />
            </div>
            <div className="col-md-3">Longitude</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="number"
                name="shipping_longitude"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_longitude}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Latitude</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="number"
                name="billing_latitude"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.billing_latitude}
              />
            </div>
            <div className="col-md-3">Latitude</div>
            <div className="col-md-3">
              <input
                className="form-control w-100"
                type="number"
                name="shipping_latitude"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.shipping_latitude}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Route Map</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="root_map"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.root_map}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>Route1</option>
                {/* <option value={2}>Route2</option> */}
                {/* <option value={3}>Route3</option> */}
              </select>

              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("routeMap", true)}
                style={{ fontSize: 30 }}
              />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3 d-flex" />
          </div>
          <h5>
            <i className="fa fa-book" />
            Social Profile
          </h5>
          <div className="row p-1">
            <div className="col-md-3">website</div>
            <div className="col-md-3 d-flex">
              <a href="#" className="fa fa-google mr-2" />
              <input
                className="form-control w-100"
                type="text"
                name="website"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.website}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Facebook</div>
            <div className="col-md-3 d-flex">
              <a href="#" className="fa fa-facebook mr-2" />
              <input
                className="form-control w-100"
                type="text"
                name="facebook"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.facebook}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Skype</div>
            <div className="col-md-3 d-flex">
              <a href="#" className="fa fa-skype mr-2" />
              <input
                className="form-control w-100"
                type="text"
                name="skype"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.skype}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">Twitter</div>
            <div className="col-md-3 d-flex">
              <a href="#" className="fa fa-twitter mr-2" />
              <input
                className="form-control w-100"
                type="text"
                name="twitter"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.twitter}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-3">LinkedIn</div>
            <div className="col-md-3 d-flex">
              <a href="#" className="fa fa-linkedin mr-2" />
              <input
                className="form-control w-100"
                type="text"
                name="linkedin"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.linkedin}
              />
            </div>
          </div>
          <h5>
            {" "}
            <i className="fa fa-book" />
            Defaults
          </h5>
          <div className="row p-1">
            <div className="col-md-3">Payment Term</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="payment_term"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.payment_term}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>PaymentTerm1</option>
                {/* <option value={2}>PaymentTerm2</option> */}
                {/* <option value={3}>PaymentTerm3</option> */}
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("paymentTerms", true)}
                style={{ fontSize: 30 }}
              />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3 d-flex" />
          </div>
          <div className="row p-1">
            <div className="col-md-3">Price Category</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="price_category"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.price_category}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>PriceCategory1</option>
                {/* <option value={2}>PriceCategory2</option>
                <option value={3}>PriceCategory3</option> */}
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("priceCategoryPurchase", true)}
                style={{ fontSize: 30 }}
              />

              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3 d-flex" />
          </div>
          <div className="row p-1">
            <div className="col-md-3">Agent Broker</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="agent"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.agent}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>Agent1</option>
                {/* <option value={2}>Agent2</option>
                <option value={3}>Agent3</option> */}
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("agentBroker", true)}
                style={{ fontSize: 30 }}
              />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3 d-flex" />
          </div>
          <div className="row p-1">
            <div className="col-md-3">Transporter</div>
            <div
              className="col-md-3 d-flex"
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <select
                className="form-control w-100"
                name="transporter"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.transporter}
              >
                <option value="" selected disabled>
                  --Select--
                </option>
                <option value={1}>Transporter1</option>
                {/* <option value={2}>Transporter2</option>
                <option value={3}>Transporter3</option> */}
              </select>
              <i
                className="fa fa-pencil-square"
                onClick={() => setModalState("transporter", true)}
                style={{ fontSize: 30 }}
              />
              {/* <button><i className="fa fa-pencil" /></button> */}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3 d-flex" />
          </div>
          <div className="row p-1">
            <div className="col-md-3">Credit Limit</div>
            <div className="col-md-3 ">
              <input
                className="form-control w-100"
                type="text"
                name="credit_limit"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.credit_limit}
              />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div>
          {/* <div className="row p-1">
            <div className="col-md-3">Max Credit Days</div>
            <div className="col-md-3 ">
              <input className="form-control w-100" type="text" />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div> */}
          {/* <div className="row p-1">
            <div className="col-md-3">Invest Rate Yearly</div>
            <div className="col-md-3 ">
              <input className="form-control w-100" type="text" />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div> */}
          {/* <div className="row p-1">
            <div className="col-md-3">Allow CVSS Access</div>

            <div
              className="col-md-3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <input type="checkbox" />
            </div>
          </div> */}
          {/* <div className="row p-1">
            <div className="col-md-3">DL No</div>
            <div className="col-md-3 ">
              <input className="form-control w-100" type="text" />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div> */}
          <h5>
            {" "}
            <i className="fa fa-book" />
            Bank Details
          </h5>
          <div className="row p-1">
            <div className="col-md-3">IFSC CODE</div>
            <div className="col-md-3 d-flex">
              <input
                className=" form-control w-100"
                type="text"
                name="bank_ifsc_or_rtgs_no"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.bank_ifsc_or_rtgs_no}
              />{" "}
              <Button variant="outline-light">Fetch</Button>{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div>
          <div className="row p-1">
            <div className="col-md-3">Account Number</div>
            <div className="col-md-3 ">
              <input
                className=" form-control w-100"
                type="text"
                name="bank_account_no"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.bank_account_no}
              />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div>
          <div className="row p-1">
            <div className="col-md-3">Bank Name</div>
            <div className="col-md-3 ">
              <input
                className="form-control w-100"
                type="text"
                name="bank_name"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.bank_name}
              />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div>
          <div className="row p-1">
            <div className="col-md-3"> Branch Name</div>
            <div className="col-md-3 ">
              <input
                className="form-control w-100"
                type="text"
                name="bank_branch"
                onChange={(e) => handleInputChangePurchaseAndCollection(e)}
                value={mainState?.purchaseAndCollection?.bank_branch}
              />{" "}
            </div>
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div>
          {/* <h5>
            {" "}
            <i className="fa fa-book" />
            Custom Fields
          </h5>
          <h5>
            <i className="fa fa-book" />
            Attachments
          </h5>
          <div style={{ width: "100px", alignItems: "center" }}>
            <input type="file" />
          </div> */}
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <div>
            <Button
              variant="outline-light"
              onClick={(e) => handleAddNewSubVendor(e)}
            >
              Save
            </Button>
            {/* <Button variant="outline-light">Clear</Button>
            <Button variant="outline-light">Print</Button>
            <Button variant="outline-light">Delete</Button>
            <Button
              onClick={() => setModalState("seller", false)}
              variant="outline-light"
            >
              Exit
            </Button> */}
            {/* <button>Save</button>
  <button>Clear</button>
  <button>Print</button>
  <button>Delete</button> */}
            {/* <button onClick={handleClosenew}>Exit</button> */}
          </div>
          {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">
  <i style={{fontSize: '24px'}} className="fa"></i>Import</button> */}
          {/* <Button variant="outline-light">
            <i style={{ fontSize: "24px" }} className="fa"></i>
            Import
          </Button> */}
          {/* <div>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              &nbsp;
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Download
              </a>
            </div>
          </div> */}
        </Modal.Footer>
      </Modal>
      {/* Last 6 Months Purchase & Collection */}
      <Modal
        show={mainModalState?.last6MonthsPuchaseAndCollection}
        onHide={() => setModalState("last6MonthsPuchaseAndCollection", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>last6MonthsPuchaseAndCollection</Modal.Title>

          <Button
            onClick={() =>
              setModalState("last6MonthsPuchaseAndCollection", false)
            }
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6 style={{ textAlign: "Center" }}>
              Last 6 Months Purchase/Payment
            </h6>
            <div
              className="dropdown"
              style={{
                paddingLeft: "400px",
                top: "4px",
                position: "absolute",
              }}
            >
              <div>
                <InputGroup className="mb-3">
                  <DropdownButton variant="outline-secondary" title="☰">
                    <Dropdown.Item>PNG File</Dropdown.Item>
                    <Dropdown.Item>JPG File</Dropdown.Item>
                    <Dropdown.Item>SVG File</Dropdown.Item>
                    <Dropdown.Item>PDF File</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Print</Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <div style={{ paddingRight: "460px" }}>
            <Button
              onClick={() =>
                setModalState("last6MonthsPuchaseAndCollection", false)
              }
              variant="outline-light"
            >
              OK
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Top 6 items in last 6 months  */}
      <Modal
        show={mainModalState?.top6ItemsInLast6Months}
        onHide={() => setModalState("top6ItemsInLast6Months", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>top6ItemsInLast6Months</Modal.Title>
          <Button
            onClick={() => setModalState("top6ItemsInLast6Months", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6 style={{ textAlign: "Center" }}>Top 6 Purchase</h6>
            <div
              className="dropdown"
              style={{
                paddingLeft: "400px",
                top: "4px",
                position: "absolute",
              }}
            >
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                ☰<span className="caret" />
              </button>
              <ul className="dropdown-menu" style={{ textAlign: "Center" }}>
                <li>
                  <a href="#">Print</a>
                </li>
                <li className="divider" />
                <li>
                  <a href="#">PNG File</a>
                </li>
                <li>
                  <a href="#">JPG File</a>
                </li>
                <li>
                  <a href="#">PDF File </a>
                </li>
                <li>
                  <a href="#">PDF SVG File</a>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {/* <Button variant="primary" onClick={handleClose1}>
            OK
          </Button> */}
          <div style={{ paddingRight: "460px" }}>
            <Button
              onClick={() => setModalState("top6ItemsInLast6Months", false)}
              variant="outline-light"
            >
              OK
            </Button>
          </div>

          {/* <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
      {/* Outstanding */}
      <Modal
        show={mainModalState?.outStanding}
        size="lg"
        onHide={() => setModalState("outStanding", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>outStanding</Modal.Title>
          <Button
            onClick={() => setModalState("outStanding", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h3 style={{ textAlign: "Center" }}>Outstanding</h3>
              <div style={{ float: "right" }}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {/* <i className="fas fa-file-export" /> */}
                    <>
                      <i
                        className="fa fa-pencil-square"
                        style={{ fontSize: 30 }}
                      />
                    </>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Export all Data
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Export selected rows
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* <divpadding-right: 100px;  position: absolute;" ><button  >&#9776;</button></div>
         </div> */}
            </div>
            <div
              style={{
                width: "100%",
                height: "120px",
                paddingTop: "40px",
                paddingLeft: "80px",
              }}
            >
              <div className="row ">
                <div className="col-md-2  form-control form-control-input">
                  {" "}
                  Bill Date
                </div>
                <div className="col-md-2  form-control form-control-input">
                  Bill No
                </div>
                <div className="col-md-2  form-control form-control-input">
                  Amount
                </div>
                <div className="col-md-2 form-control form-control-input">
                  Due Dtae
                </div>
                <div className="col-md-2  form-control form-control-input">
                  Outstanding
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2  form-control form-control-input">
                  {" "}
                </div>
                <div className="col-md-2  form-control form-control-input"></div>
                <div className="col-md-2  form-control form-control-input">
                  Sum 0.00
                </div>
                <div className="col-md-2  form-control form-control-input"></div>
                <div className="col-md-2  form-control form-control-input">
                  Sum 0.00
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "flex-start",
          }}
        >
          {/* <Button variant="primary" onClick={handleClose3}>
      OK
    </Button> */}
          <div style={{ paddingRight: "450px" }}>
            <Button
              onClick={() => setModalState("outStanding", false)}
              variant="outline-light"
            >
              OK
            </Button>
          </div>

          {/* <Button variant="secondary" onClick={handleClose2}>
      Close
    </Button> */}
        </Modal.Footer>
      </Modal>
      {/* Purchase History */}
      <Modal
        show={mainModalState?.purchaseHistory}
        onHide={() => setModalState("purchaseHistory", false)}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Purchase History</Modal.Title>
          <Button
            onClick={() => setModalState("purchaseHistory", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h3 style={{ textAlign: "Center" }}>Outstanding</h3>
              <div style={{ float: "right" }}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {/* <i className="fas fa-file-export" /> */}
                    <>
                      <i
                        className="fa fa-pencil-square"
                        style={{ fontSize: 30 }}
                      />
                    </>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Export all Data
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Export selected rows
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* <divpadding-right: 100px;  position: absolute;" ><button  >&#9776;</button></div>
         </div> */}
            </div>
            <div
              style={{
                width: "100%",
                height: "120px",
                paddingTop: "40px",
                paddingLeft: "80px",
              }}
            >
              <div className="row">
                <div className="col-md-2  form-control form-control-input">
                  {" "}
                  Bill Date
                </div>
                <div className="col-md-2  form-control form-control-input">
                  Bill No
                </div>
                <div className="col-md-2  form-control form-control-input">
                  Amount
                </div>
                <div className="col-md-2 form-control form-control-input">
                  Due Dtae
                </div>
                <div className="col-md-2  form-control form-control-input">
                  Outstanding
                </div>
              </div>
              <div className="row">
                <div className="col-md-2  form-control form-control-input">
                  {" "}
                </div>
                <div className="col-md-2  form-control form-control-input"></div>
                <div className="col-md-2  form-control form-control-input">
                  Sum 0.00
                </div>
                <div className="col-md-2  form-control form-control-input"></div>
                <div className="col-md-2  form-control form-control-input">
                  Sum 0.00
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "flex-start",
          }}
        >
          <div className="col-md-6">
            <Button
              onClick={() => setModalState("purchaseHistory", false)}
              variant="outline-light"
            >
              OK
            </Button>
          </div>
          <div className="col-md-6"></div>
        </Modal.Footer>
      </Modal>
      {/* Agenct Broker */}
      <Modal
        show={mainModalState?.agentBroker}
        onHide={() => setMainModalState("agentBroker", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Agent-Broker</Modal.Title>
          <Button
            onClick={() => setMainModalState("agentBroker", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="agent_broker_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.agent_broker_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="agent_broker_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.agent_broker_name}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Payment Terms */}
      <Modal
        show={mainModalState?.paymentTerms}
        onHide={() => setMainModalState("paymentTerms", false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onClick={() => setMainModalState("paymentTerms", false)}
        >
          <Modal.Title>Payment Terms</Modal.Title>
          <Button
            onClick={() => setMainModalState("paymentTerms", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-1">
            <div className="col-md-6">1Name</div>
            <div className="col-md-6">
              <input
                className="form-control w-100"
                type="text"
                name="name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.name}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control w-85"
                type="text"
                name="code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Fixed Days</div>
            <input
              type="radio"
              id="html"
              name="fav_language"
              onChange={(e) => handleInputChange(e)}
              value={mainState.selected.fav_language}
            />
            <label htmlFor="html" className="mr-1">
              on
            </label>
            <br />
            <input
              type="radio"
              id="css"
              name="fav_language"
              onChange={(e) => handleInputChange(e)}
              value={mainState.selected.fav_language}
            />
            <label htmlFor="css">off</label>
            <br />
          </div>
          <div className="row p-1">
            <div className="col-md-6">No. of Fixed Days</div>
            <div className="col-md-6">
              <input
                className="form-control w-100"
                type="text"
                name="no_of_fixed_days"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.no_of_fixed_days}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Payment Cycle</div>
            <input
              type="radio"
              id="html"
              name="fav_language"
              onChange={(e) => handleInputChange(e)}
              value={mainState.selected.fav_language}
            />
            <label htmlFor="html" className="mr-1">
              on
            </label>
            <br />
            <input
              type="radio"
              id="css"
              name="fav_language"
              onChange={(e) => handleInputChange(e)}
              value={mainState.selected.fav_language}
            />
            <label htmlFor="css">off</label>
            <br />
          </div>
          <div className="row p-1">
            <div className="col-md-6">Run On</div>
            <div className="col-md-6">
              <select
                className="form-control w-100"
                name="run_on"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.run_on}
              >
                <option value={1}>None</option>
                <option value={2}>Weekly</option>
                <option value={3}>Bi_monthly</option>
                <option value={3}>Monthly</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Items With Balance */}
      <Modal
        show={mainModalState?.itemWithBalance}
        onHide={() => setModalState("itemWithBalance", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Item with balance</Modal.Title>
          <Button
            onClick={() => setModalState("itemWithBalance", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div
                className="col-md-6"
                style={{ marginLeft: "50%", width: "150px" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search.."
                />
              </div>
            </div>
            <div className="table p-2">
              <table>
                <tbody>
                  <tr>
                    <th style={{ width: "205px" }}>Code</th>
                    <th style={{ width: "205px" }}>Item</th>
                    <th style={{ width: "205px" }}>HSN</th>
                    <th style={{ width: "205px" }}>Quntity</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Fast Billing */}
      <Modal
        show={mainModalState?.fastBilling}
        onHide={() => setModalState("fastBilling", false)}
        size="xl"
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Fast Billing</Modal.Title>
          <Button
            onClick={() => setModalState("fastBilling", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div
                className="col-md-6"
                style={{ marginLeft: "50%", width: "150px" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search.."
                />
              </div>
            </div>
            <div className="table p-2">
              <table>
                <tbody>
                  <tr>
                    <th style={{ width: "205px" }} />
                    <th style={{ width: "205px" }}>Code</th>
                    <th style={{ width: "205px" }}>NAme</th>
                    <th style={{ width: "205px" }}>Balance</th>
                    <th style={{ width: "205px" }}>Last sales rate</th>
                    <th style={{ width: "205px" }}>Group</th>
                    <th style={{ width: "205px" }}>Brand</th>
                    <th style={{ width: "205px" }}>Catagory</th>
                    <th style={{ width: "205px" }}>TimeStamp</th>
                    <th style={{ width: "205px" }}>HSN code</th>
                    <th style={{ width: "205px" }}>Unit</th>
                    <th style={{ width: "205px" }}>MRP</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ChartOfAccounts */}
      <Modal
        show={mainModalState?.chartOfAccounts}
        onHide={() => setModalState("chartOfAccounts", false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onClick={() => setModalState("chartOfAccounts", false)}
        >
          <Modal.Title>Chart of Accounts</Modal.Title>
          <Button
            onClick={() => setModalState("chartOfAccounts", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row p-1" style={{ marginBottom: "5px" }}>
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Name
              </div>
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  className="form-control w-75"
                  type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.name}
                />
                <i
                  className="fa fa-pencil-square"
                  style={{
                    fontSize: 30,
                  }}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Code</div>
              <div className="col-md-6">
                <input
                  className="form-control w-98"
                  type="text"
                  name="code"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.code}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Is Subledger</div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.fav_language}
                defaultValue="HTML"
                style={{
                  marginTop: "8px",
                  marginLeft: "150px",
                }}
              />
              <label htmlFor="html" className="mr-1">
                on
              </label>
              <br />
              <input
                type="radio"
                id="css"
                name="fav_language"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.fav_language}
                defaultValue="CSS"
                style={{ marginTop: "8px" }}
              />
              <label htmlFor="css">off</label>
              <br />
            </div>
            <div className="row p-1">
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Under Group ★
              </div>
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  className="form-control w-75"
                  type="text"
                  name="under"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.under}
                />
                <>
                  <i
                    className="fa fa-pencil-square"
                    style={{
                      fontSize: 30,
                    }}
                  />
                </>
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Type</div>
              <div className="col-md-6">
                <select className="form-control w-100" name="run-on">
                  <option value={1}>Genaral</option>
                  <option value={2}>Cash</option>
                  <option value={3}>bank</option>
                  Account No
                </select>
                <input
                  className="form-control w-100"
                  type="text"
                  name="under_account"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.under_account}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">RTGS/IFSC Code</div>
              <div className="col-md-6">
                <input
                  className="form-control w-100"
                  type="text"
                  name="rtgs"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.rtgs}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Classification</div>
              <div className="col-md-6">
                <input
                  className="form-control w-100"
                  type="text"
                  name="classification"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.classification}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Is Loan Account</div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.fav_language}
                defaultValue="HTML"
                style={{
                  marginTop: "8px",
                  marginLeft: "150px",
                }}
              />
              <label htmlFor="html" className="mr-1">
                on
              </label>
              <br />
              <input
                type="radio"
                id="css"
                name="fav_language"
                defaultValue="CSS"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.fav_language}
                style={{ marginTop: "8px" }}
              />
              <label htmlFor="css">off</label>
              <br />
            </div>
            <div className="row p-1">
              <div className="col-md-6">TDS Applicable</div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.fav_language}
                defaultValue="HTML"
                style={{
                  marginTop: "8px",
                  marginLeft: "150px",
                }}
              />
              <label htmlFor="html" className="mr-1">
                on
              </label>
              <br />
              <input
                type="radio"
                id="css"
                name="fav_language"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.fav_language}
                defaultValue="CSS"
                style={{ marginTop: "8px" }}
              />
              <label htmlFor="css">off</label>
              <br />
            </div>
            <div className="row p-1">
              <div className="col-md-6">Address</div>
              <textarea
                className="col-md-6 form-control"
                name="message"
                rows={5}
                cols={30}
                defaultValue={""}
                // name="add"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.add}
              />
            </div>
            <div className="row p-1">
              <div className="col-md-6">PAN </div>
              <div className="col-md-6">
                <input
                  className="form-control w-100"
                  type="text"
                  name="pan"
                  value={mainState.selected.pan}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Language  */}
      <Modal
        show={mainModalState?.language}
        onHide={() => setModalState("language", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Language</Modal.Title>
          <Button
            onClick={() => setModalState("language", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  marginLeft: "50%",
                  width: "150px",
                }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search.."
                />
              </div>
            </div>
            <div className="table p-2">
              <table>
                <tbody>
                  <tr>
                    <th style={{ width: "205px" }}>Language</th>
                    <th style={{ width: "205px" }}>Value</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ChartsOfAccounts */}
      <Modal
        show={mainModalState?.chartOfAccounts}
        onHide={() => setModalState("chartOfAccounts", false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onClick={() => setModalState("chartOfAccounts", false)}
        >
          <Modal.Title>Chart of Accounts</Modal.Title>
          <Button
            onClick={() => setModalState("chartOfAccounts", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row p-1" style={{ marginBottom: "5px" }}>
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Name
              </div>
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  className="form-control w-75"
                  type="text"
                  name="chart_of_account_name"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.chart_of_account_name}
                />
                <i
                  className="fa fa-pencil-square"
                  style={{
                    fontSize: 30,
                  }}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Code</div>
              <div className="col-md-6">
                <input
                  className="form-control w-98"
                  type="text"
                  name="chart_of_account_code"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.chart_of_account_code}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Is Subledger</div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                defaultValue="HTML"
                style={{
                  marginTop: "8px",
                  marginLeft: "150px",
                }}
              />
              <label htmlFor="html" className="mr-1">
                on
              </label>
              <br />
              <input
                type="radio"
                id="css"
                name="fav_language"
                defaultValue="CSS"
                style={{ marginTop: "8px" }}
              />
              <label htmlFor="css">off</label>
              <br />
            </div>
            <div className="row p-1">
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Under Group ★
              </div>
              <div
                className="col-md-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  className="form-control w-75"
                  type="text"
                  name="under_group_name"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.under_group_name}
                />
                <>
                  <i
                    className="fa fa-pencil-square"
                    style={{
                      fontSize: 30,
                    }}
                  />
                </>
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Type</div>
              <div className="col-md-6">
                <select className="form-control w-100" name="run-on">
                  <option value={1}>Genaral</option>
                  <option value={2}>Cash</option>
                  <option value={3}>bank</option>
                  Account No
                </select>
                <input className="form-control w-100" type="text" />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">RTGS/IFSC Code</div>
              <div className="col-md-6">
                <input
                  className="form-control w-100"
                  type="text"
                  name="rtgs_ifsc_name"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.rtgs_ifsc_name}
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Classification</div>
              <div className="col-md-6">
                <input className="form-control w-100" type="text" />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-md-6">Is Loan Account</div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                defaultValue="HTML"
                style={{
                  marginTop: "8px",
                  marginLeft: "150px",
                }}
              />
              <label htmlFor="html" className="mr-1">
                on
              </label>
              <br />
              <input
                type="radio"
                id="css"
                name="fav_language"
                defaultValue="CSS"
                style={{ marginTop: "8px" }}
              />
              <label htmlFor="css">off</label>
              <br />
            </div>
            <div className="row p-1">
              <div className="col-md-6">TDS Applicable</div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                defaultValue="HTML"
                style={{
                  marginTop: "8px",
                  marginLeft: "150px",
                }}
              />
              <label htmlFor="html" className="mr-1">
                on
              </label>
              <br />
              <input
                type="radio"
                id="css"
                name="fav_language"
                defaultValue="CSS"
                style={{ marginTop: "8px" }}
              />
              <label htmlFor="css">off</label>
              <br />
            </div>
            <div className="row p-1">
              <div className="col-md-6">Address</div>
              <textarea
                className="col-md-6 form-control"
                name="message"
                rows={5}
                cols={30}
                defaultValue={""}
              />
            </div>
            <div className="row p-1">
              <div className="col-md-6">PAN </div>
              <div className="col-md-6">
                <input
                  className="form-control w-100"
                  type="text"
                  name="pan_name"
                  onChange={(e) => handleInputChange(e)}
                  value={mainState.selected.pan_name}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Territory */}
      <Modal
        show={mainModalState?.territory}
        onHide={() => setModalState("territory", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Territory</Modal.Title>
          <Button
            onClick={() => setModalState("territory", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="territory_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.territory_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="territory_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.territory_name}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* PartyCategorySupplier */}
      <Modal
        show={mainModalState?.partyCategorySupplier}
        onHide={() => setModalState("partyCategorySupplier", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Party Catagory Supplier</Modal.Title>
          <Button
            onClick={() => setModalState("partyCategorySupplier", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="party_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.party_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="party_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.party_name}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* State */}
      <Modal
        show={mainModalState?.state}
        onHide={() => setModalState("state", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>State</Modal.Title>
          <Button
            onClick={() => setModalState("state", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input className="form-control form-control w-100" type="text" />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Under Country</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* UnderCity */}
      <Modal
        show={mainModalState?.underCity}
        onHide={() => setModalState("underCity", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Under City</Modal.Title>
          <Button
            onClick={() => setModalState("underCity", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="city_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.city_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="city_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.city_name}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Under Country</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* City */}
      <Modal
        show={mainModalState?.city}
        onHide={() => setModalState("city", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>City</Modal.Title>
          <Button
            onClick={() => setModalState("city", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="under_city_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.under_city_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="under_city_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.under_city_name}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Under State</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="Guj"
                type="text"
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* RouteMap */}
      <Modal
        show={mainModalState?.routeMap}
        onHide={() => setMainModalState("routeMap", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Route Map</Modal.Title>
          <Button
            onClick={() => setMainModalState("routeMap", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="route_map_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.route_map_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="route_code_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.route_code_name}
              />
            </div>
          </div>

          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Payment Terms */}
      <Modal
        show={mainModalState?.paymentTerms}
        onHide={() => setMainModalState("paymentTerms", false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onClick={() => setMainModalState("paymentTerms", false)}
        >
          <Modal.Title>Payment Terms</Modal.Title>
          <Button
            onClick={() => setMainModalState("paymentTerms", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control w-100"
                type="text"
                name="payment_terms_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.payment_terms_name}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control w-85"
                type="text"
                name="payment_terms_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.payment_terms_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Fixed Days</div>
            <input
              type="radio"
              id="html"
              name="fav_language"
              defaultValue="HTML"
              style={{
                // marginTop: "8px",
                marginLeft: "150px",
              }}
            />
            <label htmlFor="html" className="mr-1">
              on
            </label>
            <br />
            <input
              type="radio"
              id="css"
              name="fav_language"
              defaultValue="CSS"
              // style={{ marginTop: "8px" }}
            />
            <label htmlFor="css">off</label>
            <br />
          </div>
          <div className="row p-1">
            <div className="col-md-6">No. of Fixed Days</div>
            <div className="col-md-6">
              <input
                className="form-control w-100"
                type="text"
                name="payment_terms_no_of_fixed_days"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.payment_terms_no_of_fixed_days}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Payment Cycle</div>
            <input
              type="radio"
              id="html"
              name="fav_language"
              defaultValue="HTML"
              style={{
                marginTop: "8px",
                marginLeft: "150px",
              }}
            />
            <label htmlFor="html" className="mr-1">
              on
            </label>
            <br />
            <input
              type="radio"
              id="css"
              name="fav_language"
              defaultValue="CSS"
              style={{ marginTop: "8px" }}
            />
            <label htmlFor="css">off</label>
            <br />
          </div>
          <div className="row p-1">
            <div className="col-md-6">Run On</div>
            <div className="col-md-6">
              <select className="form-control w-100" name="run-on">
                <option value={1}>None</option>
                <option value={2}>Weekly</option>
                <option value={3}>Bi_monthly</option>
                <option value={3}>Monthly</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* PriceCategoryPurchase */}
      <Modal
        show={mainModalState?.priceCategoryPurchase}
        onHide={() => setMainModalState("priceCategoryPurchase", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Price catagory purchase</Modal.Title>
          <Button
            onClick={() => setMainModalState("priceCategoryPurchase", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="price_catagory_purchase_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.price_catagory_purchase_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="price_catagory_purchase_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.price_catagory_purchase_name}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Agent Broker */}
      <Modal
        show={mainModalState?.agentBroker}
        onHide={() => setMainModalState("agentBroker", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Agent-Broker</Modal.Title>
          <Button
            onClick={() => setMainModalState("agentBroker", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="broker_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.broker_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="broker_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.broker_name}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Transporter */}
      <Modal
        show={mainModalState?.transporter}
        onHide={() => setModalState("transporter", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Transporter</Modal.Title>
          <Button
            onClick={() => setModalState("transporter", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="transporter_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.transporter_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="transportar_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.transportar_name}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Gst number</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="transportar_gst_number"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.transportar_gst_number}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default SellerPurchaseOrder;
