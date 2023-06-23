import productImage from "assets/productImage.jpg";
import React, { useEffect, useState, useContext, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminSellerViewProductEdit(props) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  const location = useLocation();

  const [productDetails, setProductDetails] = useState({
    ...location.state,
    pname: location.state?.Product?.pname || "",
    pdesc: location.state?.Product?.pdesc || "",
    display_price: location.state?.display_price || "",
    selling_price: location.state?.selling_price || "",
    subsubcategory_id: location.state?.Product?.subsubcategory_id || "",
    p_quantity: location.state?.product_stock || "",
    // p_quantity: location.state?.p_quantity || "",
    hsncode: location.state?.Product?.hsncode || "",
    barcode: location.state?.Product?.barcode || "",
    brand_id: location.state?.Product?.brand_id || "",
    pphoto: [] || "",
    _pphoto: location.state?.Product?.pphoto || "",
    //
    category_id: location.state?.Product?.category_id || "",
    subcategory_id: location.state?.Product?.subcategory_id || "",
    imageURLObj: [],
  });

  const handleQuillChange = (val) => {
    setProductDetails((prev) => ({
      ...prev,
      pdesc: val,
    }));
  };

  const handleInputChange = (e) => {
    const { name } = e.target;

    if (name === "pphoto") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 8) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          if (!e?.target?.multiple) {
            setProductDetails((prev) => ({
              ...prev,
              [name]: [
                ...prev?.[name],
                ...e.target.files
              ],
              imageURLObj: [
                ...prev?.imageURLObj,
                ...imageURLObj
              ]
            }))
          } else {
            setProductDetails((prev) => ({
              ...prev,
              [name]: e.target.files,
              imageURLObj: imageURLObj,
            }));
          }
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 8)].map((item) =>
            URL.createObjectURL(item)
          );

          setProductDetails((prev) => ({
            ...prev,
            [name]: e.target.files,
            imageURLObj: imageURLObj,
          }));

          window.alert("At Max 8 Images are allowed");
        }
      }
    } else {
      setProductDetails((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const validateBeforeUpdateProduct = () => {
    let isValid = true
    // 
    if (!productDetails?.pname) {
      isValid = false
      return alert("Product Name is empty or invalid")
    } else if (!productDetails?.pdesc) {
      isValid = false
      return alert("Product Description is empty or invalid")
    } else if (!productDetails?.category_id) {
      isValid = false
      return alert("Product Category is empty or invalid")
    } else if (!productDetails?.subcategory_id) {
      isValid = false
      return alert("Product Sub Category is empty or invalid")
    } else if (!productDetails?.hsncode) {
      isValid = false
      return alert("Product HSNCODE is empty or invalid")
    } else if (!productDetails?.barcode) {
      isValid = false
      return alert("Product BARCODE is empty or invalid")
    } else if (!productDetails?.brand_id) {
      isValid = false
      return alert("Product Brand is empty or invalid")
    }
    // else if (!productDetails?.pphoto?.length) {
    //   isValid = false
    //   return alert("Product Photos are empty or invalid")
    // }
    // 
    return isValid
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (validateBeforeUpdateProduct() === true) {
      const formData = new FormData();

      Object.keys(productDetails).forEach((key) => {
        console.log(key, productDetails[key]);
        if (key === "pphoto") {
          if (!!Array.from(productDetails[key]).length) {
            Array.from(productDetails[key]).map((item) =>
              formData.append(key, item)
            );
          }
          // console.log([...productDetails[key]]);
        } else if (
          key === "p_quantity" ||
          key === "display_price" ||
          key === "selling_price"
        ) {
          // formData.append(key, parseInt(productDetails[key]));
        } else if (
          key === "_pphoto"
        ) {
          formData.append(key, JSON.stringify(productDetails[key]));
        } else {
          formData.append(key, productDetails[key]);
        }
      });
      //

      const config = {
        method: "put",
        url:
          // process.env.REACT_APP_BASEURL + "/api/product/" + location.state._id,
          process.env.REACT_APP_BASEURL + "/api/product/" + location.state.product_id,
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
        data: formData,
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          alert("Product Updated Successfully");
          // navigate("/seller/dashboard", { replace: true });
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    }
  };

  useEffect(() => {
    console.log(location.state);
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
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Product
            </li>
            {/* <li className="breadcrumb-item">Add new</li> */}
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <form
              className="product-form"
              style={{ textAlign: "left" }}
              id="product_form"
            >
              <input
                type="hidden"
                name="_token"
                defaultValue="3UwJSwxnQZ6vnxNM80NSGaRBk9FC7fLyCkx1E5uO"
              />{" "}
              <div className="card">
                <div className="card-header">
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
                </div>
                <div className="card-body">
                  <div className=" lang_form" id="en-form">
                    <div className="form-group">
                      <label className="input-label" htmlFor="en_name">
                        Name (EN)
                      </label>
                      <input
                        type="text"
                        required
                        // name="name[]"
                        name="pname"
                        id="en_name"
                        className="form-control"
                        placeholder="New Product"
                        onChange={handleInputChange}
                        value={productDetails.pname}
                      />
                    </div>
                    <input type="hidden" name="lang[]" defaultValue="en" />
                    <div className="form-group pt-4">
                      <label className="input-label" htmlFor="en_description">
                        Description (EN)
                      </label>
                      {/* <textarea
                        // name="description[]"
                        name="pdesc"
                        className="editor textarea"
                        // cols={30}
                        // rows={10}
                        // style={{ visibility: "hidden", display: "none" }}
                        style={{ width: "100%" }}
                        defaultValue={""}
                        onChange={handleInputChange}
                        value={productDetails.pdesc}
                      /> */}
                      <ReactQuill
                        theme="snow"
                        value={productDetails.pdesc}
                        onChange={handleQuillChange}
                      // onChange={(editor) => console.log(editor)}
                      />
                      {/* <div
                        id="cke_description[]"
                        className="cke_1 cke cke_reset cke_chrome cke_editor_description[] cke_ltr cke_browser_webkit"
                        dir="ltr"
                        lang="en"
                        role="application"
                        aria-labelledby="cke_description[]_arialbl"
                      >
                        <span
                          id="cke_description[]_arialbl"
                          className="cke_voice_label"
                        >
                          Rich Text Editor, description[]
                        </span>
                        <div
                          className="cke_inner cke_reset"
                          role="presentation"
                        >
                          <span
                            id="cke_1_top"
                            className="cke_top cke_reset_all"
                            role="presentation"
                            style={{ height: "auto", userSelect: "none" }}
                          >
                            <span id="cke_21" className="cke_voice_label">
                              Editor toolbars
                            </span>
                            <span
                              id="cke_1_toolbox"
                              className="cke_toolbox"
                              role="group"
                              aria-labelledby="cke_21"
                              onmousedown="return false;"
                            >
                              <span
                                id="cke_24"
                                className="cke_toolbar"
                                aria-labelledby="cke_24_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_24_label"
                                  className="cke_voice_label"
                                >
                                  Clipboard/Undo
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_25"
                                    className="cke_button cke_button__cut cke_button_disabled "
                                    href="javascript:void('Cut')"
                                    title="Cut (Ctrl+X)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_25_label"
                                    aria-describedby="cke_25_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(2,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(3,event);"
                                    onclick="CKEDITOR.tools.callFunction(4,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__cut_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -312px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_25_label"
                                      className="cke_button_label cke_button__cut_label"
                                      aria-hidden="false"
                                    >
                                      Cut
                                    </span>
                                    <span
                                      id="cke_25_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+X
                                    </span>
                                  </a>
                                  <a
                                    id="cke_26"
                                    className="cke_button cke_button__copy cke_button_disabled "
                                    href="javascript:void('Copy')"
                                    title="Copy (Ctrl+C)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_26_label"
                                    aria-describedby="cke_26_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(5,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(6,event);"
                                    onclick="CKEDITOR.tools.callFunction(7,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__copy_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -264px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_26_label"
                                      className="cke_button_label cke_button__copy_label"
                                      aria-hidden="false"
                                    >
                                      Copy
                                    </span>
                                    <span
                                      id="cke_26_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+C
                                    </span>
                                  </a>
                                  <a
                                    id="cke_27"
                                    className="cke_button cke_button__paste cke_button_off"
                                    href="javascript:void('Paste')"
                                    title="Paste (Ctrl+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_27_label"
                                    aria-describedby="cke_27_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(8,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(9,event);"
                                    onclick="CKEDITOR.tools.callFunction(10,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__paste_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -360px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_27_label"
                                      className="cke_button_label cke_button__paste_label"
                                      aria-hidden="false"
                                    >
                                      Paste
                                    </span>
                                    <span
                                      id="cke_27_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_28"
                                    className="cke_button cke_button__pastetext cke_button_off"
                                    href="javascript:void('Paste as plain text')"
                                    title="Paste as plain text (Ctrl+Shift+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_28_label"
                                    aria-describedby="cke_28_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(11,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(12,event);"
                                    onclick="CKEDITOR.tools.callFunction(13,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__pastetext_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1872px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_28_label"
                                      className="cke_button_label cke_button__pastetext_label"
                                      aria-hidden="false"
                                    >
                                      Paste as plain text
                                    </span>
                                    <span
                                      id="cke_28_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Shift+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_29"
                                    className="cke_button cke_button__pastefromword cke_button_off"
                                    href="javascript:void('Paste from Word')"
                                    title="Paste from Word"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_29_label"
                                    aria-describedby="cke_29_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(14,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(15,event);"
                                    onclick="CKEDITOR.tools.callFunction(16,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__pastefromword_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1824px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_29_label"
                                      className="cke_button_label cke_button__pastefromword_label"
                                      aria-hidden="false"
                                    >
                                      Paste from Word
                                    </span>
                                    <span
                                      id="cke_29_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_30"
                                    className="cke_button cke_button__undo cke_button_disabled "
                                    href="javascript:void('Undo')"
                                    title="Undo (Ctrl+Z)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_30_label"
                                    aria-describedby="cke_30_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(17,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(18,event);"
                                    onclick="CKEDITOR.tools.callFunction(19,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__undo_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -2448px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_30_label"
                                      className="cke_button_label cke_button__undo_label"
                                      aria-hidden="false"
                                    >
                                      Undo
                                    </span>
                                    <span
                                      id="cke_30_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Z
                                    </span>
                                  </a>
                                  <a
                                    id="cke_31"
                                    className="cke_button cke_button__redo cke_button_disabled "
                                    href="javascript:void('Redo')"
                                    title="Redo (Ctrl+Y)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_31_label"
                                    aria-describedby="cke_31_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(20,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(21,event);"
                                    onclick="CKEDITOR.tools.callFunction(22,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__redo_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -2400px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_31_label"
                                      className="cke_button_label cke_button__redo_label"
                                      aria-hidden="false"
                                    >
                                      Redo
                                    </span>
                                    <span
                                      id="cke_31_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Y
                                    </span>
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_32"
                                className="cke_toolbar"
                                aria-labelledby="cke_32_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_32_label"
                                  className="cke_voice_label"
                                >
                                  Editing
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_33"
                                    className="cke_button cke_button__scayt cke_button_off cke_button_expandable"
                                    href="javascript:void('Spell Check As You Type')"
                                    title="Spell Check As You Type"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_33_label"
                                    aria-describedby="cke_33_description"
                                    aria-haspopup="menu"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(23,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(24,event);"
                                    onclick="CKEDITOR.tools.callFunction(25,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__scayt_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -2040px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_33_label"
                                      className="cke_button_label cke_button__scayt_label"
                                      aria-hidden="false"
                                    >
                                      Spell Check As You Type
                                    </span>
                                    <span
                                      id="cke_33_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                    <span className="cke_button_arrow" />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_34"
                                className="cke_toolbar"
                                aria-labelledby="cke_34_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_34_label"
                                  className="cke_voice_label"
                                >
                                  Links
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_35"
                                    className="cke_button cke_button__link cke_button_off"
                                    href="javascript:void('Link')"
                                    title="Link (Ctrl+K)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_35_label"
                                    aria-describedby="cke_35_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(26,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(27,event);"
                                    onclick="CKEDITOR.tools.callFunction(28,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__link_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1512px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_35_label"
                                      className="cke_button_label cke_button__link_label"
                                      aria-hidden="false"
                                    >
                                      Link
                                    </span>
                                    <span
                                      id="cke_35_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+K
                                    </span>
                                  </a>
                                  <a
                                    id="cke_36"
                                    className="cke_button cke_button__unlink cke_button_disabled "
                                    href="javascript:void('Unlink')"
                                    title="Unlink"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_36_label"
                                    aria-describedby="cke_36_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(29,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(30,event);"
                                    onclick="CKEDITOR.tools.callFunction(31,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__unlink_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1536px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_36_label"
                                      className="cke_button_label cke_button__unlink_label"
                                      aria-hidden="false"
                                    >
                                      Unlink
                                    </span>
                                    <span
                                      id="cke_36_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_37"
                                    className="cke_button cke_button__anchor cke_button_off"
                                    href="javascript:void('Anchor')"
                                    title="Anchor"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_37_label"
                                    aria-describedby="cke_37_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(32,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(33,event);"
                                    onclick="CKEDITOR.tools.callFunction(34,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__anchor_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1488px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_37_label"
                                      className="cke_button_label cke_button__anchor_label"
                                      aria-hidden="false"
                                    >
                                      Anchor
                                    </span>
                                    <span
                                      id="cke_37_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_38"
                                className="cke_toolbar"
                                aria-labelledby="cke_38_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_38_label"
                                  className="cke_voice_label"
                                >
                                  Insert
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_39"
                                    className="cke_button cke_button__image cke_button_off"
                                    href="javascript:void('Image')"
                                    title="Image"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_39_label"
                                    aria-describedby="cke_39_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(35,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(36,event);"
                                    onclick="CKEDITOR.tools.callFunction(37,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__image_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1224px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_39_label"
                                      className="cke_button_label cke_button__image_label"
                                      aria-hidden="false"
                                    >
                                      Image
                                    </span>
                                    <span
                                      id="cke_39_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_40"
                                    className="cke_button cke_button__table cke_button_off"
                                    href="javascript:void('Table')"
                                    title="Table"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_40_label"
                                    aria-describedby="cke_40_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(38,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(39,event);"
                                    onclick="CKEDITOR.tools.callFunction(40,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__table_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -2280px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_40_label"
                                      className="cke_button_label cke_button__table_label"
                                      aria-hidden="false"
                                    >
                                      Table
                                    </span>
                                    <span
                                      id="cke_40_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_41"
                                    className="cke_button cke_button__horizontalrule cke_button_off"
                                    href="javascript:void('Insert Horizontal Line')"
                                    title="Insert Horizontal Line"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_41_label"
                                    aria-describedby="cke_41_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(41,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(42,event);"
                                    onclick="CKEDITOR.tools.callFunction(43,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__horizontalrule_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1176px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_41_label"
                                      className="cke_button_label cke_button__horizontalrule_label"
                                      aria-hidden="false"
                                    >
                                      Insert Horizontal Line
                                    </span>
                                    <span
                                      id="cke_41_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_42"
                                    className="cke_button cke_button__specialchar cke_button_off"
                                    href="javascript:void('Insert Special Character')"
                                    title="Insert Special Character"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_42_label"
                                    aria-describedby="cke_42_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(44,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(45,event);"
                                    onclick="CKEDITOR.tools.callFunction(46,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__specialchar_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -2256px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_42_label"
                                      className="cke_button_label cke_button__specialchar_label"
                                      aria-hidden="false"
                                    >
                                      Insert Special Character
                                    </span>
                                    <span
                                      id="cke_42_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_43"
                                className="cke_toolbar"
                                aria-labelledby="cke_43_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_43_label"
                                  className="cke_voice_label"
                                >
                                  Tools
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_44"
                                    className="cke_button cke_button__maximize cke_button_off"
                                    href="javascript:void('Maximize')"
                                    title="Maximize"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_44_label"
                                    aria-describedby="cke_44_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(47,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(48,event);"
                                    onclick="CKEDITOR.tools.callFunction(49,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__maximize_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1680px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_44_label"
                                      className="cke_button_label cke_button__maximize_label"
                                      aria-hidden="false"
                                    >
                                      Maximize
                                    </span>
                                    <span
                                      id="cke_44_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_45"
                                className="cke_toolbar"
                                aria-labelledby="cke_45_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_45_label"
                                  className="cke_voice_label"
                                >
                                  Document
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_46"
                                    className="cke_button cke_button__source cke_button_off"
                                    href="javascript:void('Source')"
                                    title="Source"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_46_label"
                                    aria-describedby="cke_46_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(50,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(51,event);"
                                    onclick="CKEDITOR.tools.callFunction(52,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__source_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -2184px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_46_label"
                                      className="cke_button_label cke_button__source_label"
                                      aria-hidden="false"
                                    >
                                      Source
                                    </span>
                                    <span
                                      id="cke_46_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span className="cke_toolbar_break" />
                              <span
                                id="cke_47"
                                className="cke_toolbar"
                                aria-labelledby="cke_47_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_47_label"
                                  className="cke_voice_label"
                                >
                                  Basic Styles
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_48"
                                    className="cke_button cke_button__bold cke_button_off"
                                    href="javascript:void('Bold')"
                                    title="Bold (Ctrl+B)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_48_label"
                                    aria-describedby="cke_48_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(53,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(54,event);"
                                    onclick="CKEDITOR.tools.callFunction(55,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__bold_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -24px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_48_label"
                                      className="cke_button_label cke_button__bold_label"
                                      aria-hidden="false"
                                    >
                                      Bold
                                    </span>
                                    <span
                                      id="cke_48_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+B
                                    </span>
                                  </a>
                                  <a
                                    id="cke_49"
                                    className="cke_button cke_button__italic cke_button_off"
                                    href="javascript:void('Italic')"
                                    title="Italic (Ctrl+I)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_49_label"
                                    aria-describedby="cke_49_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(56,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(57,event);"
                                    onclick="CKEDITOR.tools.callFunction(58,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__italic_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -48px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_49_label"
                                      className="cke_button_label cke_button__italic_label"
                                      aria-hidden="false"
                                    >
                                      Italic
                                    </span>
                                    <span
                                      id="cke_49_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+I
                                    </span>
                                  </a>
                                  <a
                                    id="cke_50"
                                    className="cke_button cke_button__strike cke_button_off"
                                    href="javascript:void('Strikethrough')"
                                    title="Strikethrough"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_50_label"
                                    aria-describedby="cke_50_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(59,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(60,event);"
                                    onclick="CKEDITOR.tools.callFunction(61,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__strike_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -72px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_50_label"
                                      className="cke_button_label cke_button__strike_label"
                                      aria-hidden="false"
                                    >
                                      Strikethrough
                                    </span>
                                    <span
                                      id="cke_50_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_51"
                                    className="cke_button cke_button__removeformat cke_button_off"
                                    href="javascript:void('Remove Format')"
                                    title="Remove Format"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_51_label"
                                    aria-describedby="cke_51_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(62,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(63,event);"
                                    onclick="CKEDITOR.tools.callFunction(64,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__removeformat_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1992px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_51_label"
                                      className="cke_button_label cke_button__removeformat_label"
                                      aria-hidden="false"
                                    >
                                      Remove Format
                                    </span>
                                    <span
                                      id="cke_51_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_52"
                                className="cke_toolbar"
                                aria-labelledby="cke_52_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_52_label"
                                  className="cke_voice_label"
                                >
                                  Paragraph
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_53"
                                    className="cke_button cke_button__numberedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Numbered List')"
                                    title="Insert/Remove Numbered List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_53_label"
                                    aria-describedby="cke_53_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(65,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(66,event);"
                                    onclick="CKEDITOR.tools.callFunction(67,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__numberedlist_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1632px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_53_label"
                                      className="cke_button_label cke_button__numberedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Numbered List
                                    </span>
                                    <span
                                      id="cke_53_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_54"
                                    className="cke_button cke_button__bulletedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Bulleted List')"
                                    title="Insert/Remove Bulleted List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_54_label"
                                    aria-describedby="cke_54_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(68,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(69,event);"
                                    onclick="CKEDITOR.tools.callFunction(70,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__bulletedlist_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1584px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_54_label"
                                      className="cke_button_label cke_button__bulletedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Bulleted List
                                    </span>
                                    <span
                                      id="cke_54_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_55"
                                    className="cke_button cke_button__outdent cke_button_disabled "
                                    href="javascript:void('Decrease Indent')"
                                    title="Decrease Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_55_label"
                                    aria-describedby="cke_55_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(71,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(72,event);"
                                    onclick="CKEDITOR.tools.callFunction(73,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__outdent_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1320px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_55_label"
                                      className="cke_button_label cke_button__outdent_label"
                                      aria-hidden="false"
                                    >
                                      Decrease Indent
                                    </span>
                                    <span
                                      id="cke_55_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_56"
                                    className="cke_button cke_button__indent cke_button_off"
                                    href="javascript:void('Increase Indent')"
                                    title="Increase Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_56_label"
                                    aria-describedby="cke_56_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(74,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(75,event);"
                                    onclick="CKEDITOR.tools.callFunction(76,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__indent_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -1272px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_56_label"
                                      className="cke_button_label cke_button__indent_label"
                                      aria-hidden="false"
                                    >
                                      Increase Indent
                                    </span>
                                    <span
                                      id="cke_56_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_57"
                                    className="cke_button cke_button__blockquote cke_button_off"
                                    href="javascript:void('Block Quote')"
                                    title="Block Quote"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_57_label"
                                    aria-describedby="cke_57_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(77,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(78,event);"
                                    onclick="CKEDITOR.tools.callFunction(79,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__blockquote_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 -216px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_57_label"
                                      className="cke_button_label cke_button__blockquote_label"
                                      aria-hidden="false"
                                    >
                                      Block Quote
                                    </span>
                                    <span
                                      id="cke_57_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_58"
                                className="cke_toolbar"
                                aria-labelledby="cke_58_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_58_label"
                                  className="cke_voice_label"
                                >
                                  Styles
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  id="cke_22"
                                  className="cke_combo cke_combo__styles cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_22_label"
                                    className="cke_combo_label"
                                  >
                                    Styles
                                  </span>
                                  <a
                                    className="cke_combo_button"
                                    title="Formatting Styles"
                                    tabIndex={-1}
                                    href="javascript:void('Formatting Styles')"
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_22_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(81,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(82,event);"
                                    onclick="CKEDITOR.tools.callFunction(80,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_22_text"
                                      className="cke_combo_text cke_combo_inlinelabel"
                                    >
                                      Styles
                                    </span>
                                    <span className="cke_combo_open">
                                      <span className="cke_combo_arrow" />
                                    </span>
                                  </a>
                                </span>
                                <span
                                  id="cke_23"
                                  className="cke_combo cke_combo__format cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_23_label"
                                    className="cke_combo_label"
                                  >
                                    Format
                                  </span>
                                  <a
                                    className="cke_combo_button"
                                    title="Paragraph Format"
                                    tabIndex={-1}
                                    href="javascript:void('Paragraph Format')"
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_23_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(84,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(85,event);"
                                    onclick="CKEDITOR.tools.callFunction(83,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_23_text"
                                      className="cke_combo_text cke_combo_inlinelabel"
                                    >
                                      Format
                                    </span>
                                    <span className="cke_combo_open">
                                      <span className="cke_combo_arrow" />
                                    </span>
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_59"
                                className="cke_toolbar cke_toolbar_last"
                                aria-labelledby="cke_59_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_59_label"
                                  className="cke_voice_label"
                                >
                                  about
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  className="cke_toolgroup"
                                  role="presentation"
                                >
                                  <a
                                    id="cke_60"
                                    className="cke_button cke_button__about cke_button_off"
                                    href="javascript:void('About CKEditor 4')"
                                    title="About CKEditor 4"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_60_label"
                                    aria-describedby="cke_60_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(86,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(87,event);"
                                    onclick="CKEDITOR.tools.callFunction(88,this);return false;"
                                  >
                                    <span
                                      className="cke_button_icon cke_button__about_icon"
                                      style={{
                                        backgroundImage:
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=LAHF")',
                                        backgroundPosition: "0 0px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_60_label"
                                      className="cke_button_label cke_button__about_label"
                                      aria-hidden="false"
                                    >
                                      About CKEditor 4
                                    </span>
                                    <span
                                      id="cke_60_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                            </span>
                          </span>
                          <div
                            id="cke_1_contents"
                            className="cke_contents cke_reset"
                            role="presentation"
                            style={{ height: "200px" }}
                          >
                            <span id="cke_64" className="cke_voice_label">
                              Press ALT 0 for help
                            </span>
                            <iframe
                              src
                              frameBorder={0}
                              className="cke_wysiwyg_frame cke_reset"
                              style={{ width: "100%", height: "100%" }}
                              title="Rich Text Editor, description[]"
                              aria-describedby="cke_64"
                              tabIndex={0}
                              allowTransparency="true"
                            />
                          </div>
                          <span
                            id="cke_1_bottom"
                            className="cke_bottom cke_reset_all"
                            role="presentation"
                            style={{ userSelect: "none" }}
                          >
                            <span
                              id="cke_1_resizer"
                              className="cke_resizer cke_resizer_vertical cke_resizer_ltr"
                              title="Resize"
                              onmousedown="CKEDITOR.tools.callFunction(1, event)"
                            >
                              ◢
                            </span>
                            <span
                              id="cke_1_path_label"
                              className="cke_voice_label"
                            >
                              Elements path
                            </span>
                            <span
                              id="cke_1_path"
                              className="cke_path"
                              role="group"
                              aria-labelledby="cke_1_path_label"
                            >
                              <span className="cke_path_empty">&nbsp;</span>
                            </span>
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-2 rest-part">
                <div className="card-header">
                  <h4>General info</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="name">Category</label>
                        <select
                          className="js-example-basic-multiple form-control"
                          // name="category_id"
                          name="category_id"
                          // onchange="getRequest('https://6valley.6amtech.com/seller/product/get-categories?parent_id='+this.value,'sub-category-select','select')"
                          // required
                          onChange={handleInputChange}
                          value={productDetails.category_id}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {!!state.allCategories?.length &&
                            state.allCategories?.map((item) => (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={
                                  item._id === productDetails.category_id
                                }
                              >
                                {item.category_name}
                              </option>
                            ))}
                          {/* 
                          <option value={37}>Women's Fashion</option>
                          <option value={38}>Men's Fashion</option>
                          <option value={39}>Phones &amp; Telecom</option>
                          <option value={40}>
                            Computer, Office &amp; Security
                          </option>
                          <option value={43}>Jewelry &amp; Watches</option>
                          <option value={44}>Home, Pet &amp; Appliances</option>
                          <option value={45}>Bags &amp; Shoes</option>
                          <option value={46}>Toys , Kids &amp; Babies</option>
                          <option value={47}>Outdoor Fun &amp; Sports</option>
                          <option value={114}>
                            Home Improvement &amp; Tools
                          </option>
                          <option value={116}>Beauty, Health &amp; Hair</option> */}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="name">Sub category</label>
                        <select
                          className="js-example-basic-multiple form-control"
                          // name="sub_category_id"
                          name="subcategory_id"
                          // id="sub-category-select"
                          // onchange="getRequest('https://6valley.6amtech.com/seller/product/get-categories?parent_id='+this.value,'sub-sub-category-select','select')"
                          onChange={handleInputChange}
                          value={productDetails.subcategory_id}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {!!productDetails.category_id &&
                            !!state?.allCategories?.length &&
                            state?.allCategories
                              ?.filter(
                                (item) =>
                                  item._id === productDetails.category_id
                              )
                              ?.map((item) =>
                                item.Subcategory?.map((item) => (
                                  <option key={item._id} value={item._id}>
                                    {item.subcategory_name}
                                  </option>
                                ))
                              )}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="name">Sub sub category</label>
                        <select
                          className="js-example-basic-multiple form-control"
                          // name="sub_sub_category_id"
                          name="subsubcategory_id"
                          id="sub-sub-category-select"
                          onChange={handleInputChange}
                          value={productDetails.subsubcategory_id}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {!!productDetails?.category_id &&
                            !!productDetails?.subcategory_id &&
                            !!state?.allCategories?.length &&
                            state?.allCategories
                              ?.filter(
                                (item) =>
                                  item._id === productDetails.category_id
                              )
                              ?.map((item) =>
                                item.Subcategory?.filter(
                                  (item1) =>
                                    item1._id === productDetails.subcategory_id
                                )?.map((item) =>
                                  item.Subsubcategory?.map((item) => (
                                    <option key={item._id} value={item._id}>
                                      {item.subsubcategory_name}
                                    </option>
                                  ))
                                )
                              )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="name">Product Quantity</label>
                        <input
                          type="number"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          name="p_quantity"
                          className="form-control"
                          onChange={handleInputChange}
                          value={productDetails.p_quantity}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="name">Selling Price:</label>
                        <input
                          type="number"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          name="selling_price"
                          className="form-control"
                          onChange={handleInputChange}
                          value={productDetails.selling_price}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="name">MRP:</label>
                        <input
                          type="number"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          name="display_price"
                          className="form-control"
                          onChange={handleInputChange}
                          value={productDetails.display_price}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="control-label">HSNCODE</label>
                        <input
                          type="text"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          placeholder="A137HSDG245"
                          name="hsncode"
                          className="form-control"
                          required
                          onChange={handleInputChange}
                          value={productDetails.hsncode}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="control-label">BARCODE</label>
                        <input
                          type="text"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          placeholder="AUJ67BUI88"
                          name="barcode"
                          className="form-control"
                          required
                          onChange={handleInputChange}
                          value={productDetails.barcode}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="name">Brand</label>
                        <select
                          // className="js-example-basic-multiple js-states js-example-responsive form-control select2-hidden-accessible"
                          className="js-example-basic-multiple js-states js-example-responsive form-control"
                          name="brand_id"
                          onChange={handleInputChange}
                        >
                          <option value="" selected data-select2-id={3}>
                            ---Select---
                          </option>
                          {!!state.allBrands?.length &&
                            state.allBrands?.map((item) => (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={item._id === productDetails.brand_id}
                              >
                                {item.brand_name}
                              </option>
                            ))}
                          {/* <option value={5}>Arkohub</option>
                          <option value={6}>Axxelus</option>
                          <option value={13}>Center Point</option>
                          <option value={4}>Crave</option>
                          <option value={3}>Dynamova</option>
                          <option value={12}>Framerce</option>
                          <option value={15}>Great Hall</option>
                          <option value={10}>Hexanate</option>
                          <option value={7}>Market Miracle</option>
                          <option value={11}>Modentum</option>
                          <option value={1}>Tell Us</option>
                          <option value={2}>The Wall</option>
                          <option value={9}>TrueMake</option>
                          <option value={8}>Vivatiqo</option>
                          <option value={14}>Yo Merce</option> */}
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={2}
                          // style={{ width: "759.8px" }}
                          style={{ width: "759.8px", display: "none" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--single"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-brand_id-tu-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-brand_id-tu-container"
                                role="textbox"
                                aria-readonly="true"
                                title="---Select---"
                              >
                                ---Select---
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
                      {/* <div className="col-md-6">
                        <label htmlFor="name">Unit</label>
                        <select
                          className="js-example-basic-multiple form-control"
                          name="unit"
                        >
                          <option value="kg">kg</option>
                          <option value="pc">pc</option>
                          <option value="gms">gms</option>
                          <option value="ltrs">ltrs</option>
                        </select>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card mt-2 rest-part">
                <div className="card-header">
                  <h4>Variations</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="colors">Colors :</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            className="status"
                            name="colors_active"
                            defaultValue
                          />
                          <span className="slider round" />
                        </label>
                        <select
                          className="js-example-basic-multiple js-states js-example-responsive form-control color-var-select select2-hidden-accessible"
                          name="colors[]"
                          multiple
                          id="colors-selector"
                          disabled
                          tabIndex={-1}
                          aria-hidden="true"
                          data-select2-id="colors-selector"
                        >
                          <option value="#F0F8FF">AliceBlue</option>
                          <option value="#9966CC">Amethyst</option>
                          <option value="#FAEBD7">AntiqueWhite</option>
                          <option value="#00FFFF">Aqua</option>
                          <option value="#7FFFD4">Aquamarine</option>
                          <option value="#F0FFFF">Azure</option>
                          <option value="#F5F5DC">Beige</option>
                          <option value="#FFE4C4">Bisque</option>
                          <option value="#000000">Black</option>
                          <option value="#FFEBCD">BlanchedAlmond</option>
                          <option value="#0000FF">Blue</option>
                          <option value="#8A2BE2">BlueViolet</option>
                          <option value="#A52A2A">Brown</option>
                          <option value="#DEB887">BurlyWood</option>
                          <option value="#5F9EA0">CadetBlue</option>
                          <option value="#7FFF00">Chartreuse</option>
                          <option value="#D2691E">Chocolate</option>
                          <option value="#FF7F50">Coral</option>
                          <option value="#6495ED">CornflowerBlue</option>
                          <option value="#FFF8DC">Cornsilk</option>
                          <option value="#DC143C">Crimson</option>
                          <option value="#00008B">DarkBlue</option>
                          <option value="#008B8B">DarkCyan</option>
                          <option value="#B8860B">DarkGoldenrod</option>
                          <option value="#A9A9A9">DarkGray</option>
                          <option value="#006400">DarkGreen</option>
                          <option value="#BDB76B">DarkKhaki</option>
                          <option value="#8B008B">DarkMagenta</option>
                          <option value="#556B2F">DarkOliveGreen</option>
                          <option value="#FF8C00">DarkOrange</option>
                          <option value="#9932CC">DarkOrchid</option>
                          <option value="#8B0000">DarkRed</option>
                          <option value="#E9967A">DarkSalmon</option>
                          <option value="#8FBC8F">DarkSeaGreen</option>
                          <option value="#483D8B">DarkSlateBlue</option>
                          <option value="#2F4F4F">DarkSlateGray</option>
                          <option value="#00CED1">DarkTurquoise</option>
                          <option value="#9400D3">DarkViolet</option>
                          <option value="#FF1493">DeepPink</option>
                          <option value="#00BFFF">DeepSkyBlue</option>
                          <option value="#696969">DimGray</option>
                          <option value="#1E90FF">DodgerBlue</option>
                          <option value="#B22222">FireBrick</option>
                          <option value="#FFFAF0">FloralWhite</option>
                          <option value="#228B22">ForestGreen</option>
                          <option value="#FF00FF">Fuchsia</option>
                          <option value="#DCDCDC">Gainsboro</option>
                          <option value="#F8F8FF">GhostWhite</option>
                          <option value="#FFD700">Gold</option>
                          <option value="#DAA520">Goldenrod</option>
                          <option value="#808080">Gray</option>
                          <option value="#008000">Green</option>
                          <option value="#ADFF2F">GreenYellow</option>
                          <option value="#F0FFF0">Honeydew</option>
                          <option value="#FF69B4">HotPink</option>
                          <option value="#CD5C5C">IndianRed</option>
                          <option value="#4B0082">Indigo</option>
                          <option value="#FFFFF0">Ivory</option>
                          <option value="#F0E68C">Khaki</option>
                          <option value="#E6E6FA">Lavender</option>
                          <option value="#FFF0F5">LavenderBlush</option>
                          <option value="#7CFC00">LawnGreen</option>
                          <option value="#FFFACD">LemonChiffon</option>
                          <option value="#ADD8E6">LightBlue</option>
                          <option value="#F08080">LightCoral</option>
                          <option value="#E0FFFF">LightCyan</option>
                          <option value="#FAFAD2">LightGoldenrodYellow</option>
                          <option value="#90EE90">LightGreen</option>
                          <option value="#D3D3D3">LightGrey</option>
                          <option value="#FFB6C1">LightPink</option>
                          <option value="#FFA07A">LightSalmon</option>
                          <option value="#FFA07A">LightSalmon</option>
                          <option value="#20B2AA">LightSeaGreen</option>
                          <option value="#87CEFA">LightSkyBlue</option>
                          <option value="#778899">LightSlateGray</option>
                          <option value="#B0C4DE">LightSteelBlue</option>
                          <option value="#FFFFE0">LightYellow</option>
                          <option value="#00FF00">Lime</option>
                          <option value="#32CD32">LimeGreen</option>
                          <option value="#FAF0E6">Linen</option>
                          <option value="#FF00FF">Magenta</option>
                          <option value="#800000">Maroon</option>
                          <option value="#66CDAA">MediumAquamarine</option>
                          <option value="#0000CD">MediumBlue</option>
                          <option value="#BA55D3">MediumOrchid</option>
                          <option value="#9370DB">MediumPurple</option>
                          <option value="#3CB371">MediumSeaGreen</option>
                          <option value="#7B68EE">MediumSlateBlue</option>
                          <option value="#7B68EE">MediumSlateBlue</option>
                          <option value="#00FA9A">MediumSpringGreen</option>
                          <option value="#48D1CC">MediumTurquoise</option>
                          <option value="#C71585">MediumVioletRed</option>
                          <option value="#191970">MidnightBlue</option>
                          <option value="#F5FFFA">MintCream</option>
                          <option value="#FFE4E1">MistyRose</option>
                          <option value="#FFE4B5">Moccasin</option>
                          <option value="#FFDEAD">NavajoWhite</option>
                          <option value="#000080">Navy</option>
                          <option value="#FDF5E6">OldLace</option>
                          <option value="#808000">Olive</option>
                          <option value="#6B8E23">OliveDrab</option>
                          <option value="#FFA500">Orange</option>
                          <option value="#FF4500">OrangeRed</option>
                          <option value="#DA70D6">Orchid</option>
                          <option value="#EEE8AA">PaleGoldenrod</option>
                          <option value="#98FB98">PaleGreen</option>
                          <option value="#AFEEEE">PaleTurquoise</option>
                          <option value="#DB7093">PaleVioletRed</option>
                          <option value="#FFEFD5">PapayaWhip</option>
                          <option value="#FFDAB9">PeachPuff</option>
                          <option value="#CD853F">Peru</option>
                          <option value="#FFC0CB">Pink</option>
                          <option value="#DDA0DD">Plum</option>
                          <option value="#B0E0E6">PowderBlue</option>
                          <option value="#800080">Purple</option>
                          <option value="#FF0000">Red</option>
                          <option value="#BC8F8F">RosyBrown</option>
                          <option value="#4169E1">RoyalBlue</option>
                          <option value="#8B4513">SaddleBrown</option>
                          <option value="#FA8072">Salmon</option>
                          <option value="#F4A460">SandyBrown</option>
                          <option value="#2E8B57">SeaGreen</option>
                          <option value="#FFF5EE">Seashell</option>
                          <option value="#A0522D">Sienna</option>
                          <option value="#C0C0C0">Silver</option>
                          <option value="#87CEEB">SkyBlue</option>
                          <option value="#6A5ACD">SlateBlue</option>
                          <option value="#708090">SlateGray</option>
                          <option value="#FFFAFA">Snow</option>
                          <option value="#00FF7F">SpringGreen</option>
                          <option value="#4682B4">SteelBlue</option>
                          <option value="#D2B48C">Tan</option>
                          <option value="#008080">Teal</option>
                          <option value="#D8BFD8">Thistle</option>
                          <option value="#FF6347">Tomato</option>
                          <option value="#40E0D0">Turquoise</option>
                          <option value="#EE82EE">Violet</option>
                          <option value="#F5DEB3">Wheat</option>
                          <option value="#FFFFFF">White</option>
                          <option value="#F5F5F5">WhiteSmoke</option>
                          <option value="#FFFF00">Yellow</option>
                          <option value="#9ACD32">YellowGreen</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default select2-container--disabled"
                          dir="ltr"
                          data-select2-id={152}
                          style={{ width: "759.8px" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--multiple"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={-1}
                              aria-disabled="true"
                            >
                              <ul className="select2-selection__rendered">
                                <li className="select2-search select2-search--inline">
                                  <input
                                    className="select2-search__field"
                                    type="search"
                                    tabIndex={0}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    role="searchbox"
                                    aria-autocomplete="list"
                                    placeholder
                                    disabled
                                    style={{ width: "0.75em" }}
                                  />
                                </li>
                              </ul>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="attributes"
                          style={{ paddingBottom: "3px" }}
                        >
                          Attributes :
                        </label>
                        <select
                          className="js-example-basic-multiple js-states js-example-responsive form-control select2-hidden-accessible"
                          name="choice_attributes[]"
                          id="choice_attributes"
                          multiple
                          data-select2-id="choice_attributes"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value={1}>Size</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={5}
                          style={{ width: "759.8px" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--multiple"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={-1}
                              aria-disabled="false"
                            >
                              <ul className="select2-selection__rendered">
                                <li className="select2-search select2-search--inline">
                                  <input
                                    className="select2-search__field"
                                    type="search"
                                    tabIndex={0}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    role="searchbox"
                                    aria-autocomplete="list"
                                    placeholder
                                    style={{ width: "0.75em" }}
                                  />
                                </li>
                              </ul>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="col-md-12 mt-2 mb-2">
                        <div
                          className="customer_choice_options"
                          id="customer_choice_options"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="card mt-2 rest-part">
                <div className="card-header">
                  <h4>Product price &amp; stock</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="control-label">Unit price</label>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          step="0.01"
                          placeholder="Unit price"
                          name="unit_price"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="control-label">Purchase price</label>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          step="0.01"
                          placeholder="Purchase price"
                          name="purchase_price"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col-md-6">
                        <label className="control-label">Tax</label>
                        <label className="badge badge-info">
                          Percent ( % )
                        </label>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          step="0.01"
                          placeholder="Tax"
                          name="tax"
                          className="form-control"
                        />
                        <input
                          name="tax_type"
                          defaultValue="percent"
                          style={{ display: "none" }}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="control-label">Discount type</label>
                        <select
                          className="form-control js-select2-custom select2-hidden-accessible"
                          name="discount_type"
                          data-select2-id={6}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="flat" data-select2-id={8}>
                            Flat
                          </option>
                          <option value="percent" data-select2-id={9}>
                            Percent
                          </option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={7}
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
                              aria-labelledby="select2-discount_type-d7-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-discount_type-d7-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Flat"
                              >
                                <span>Flat</span>
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
                      <div className="col-md-4">
                        <label className="control-label">Discount</label>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          step="0.01"
                          placeholder="Discount"
                          name="discount"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="sku_combination" id="sku_combination"></div>
                    <div className="row pt-4">
                      <div className="col-sm-6 col-md-6 col-lg-4" id="quantity">
                        <label className="control-label">Total Quantity</label>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          step={1}
                          placeholder="Quantity"
                          name="current_stock"
                          className="form-control"
                          required
                        />
                      </div>
                      <div
                        className="col-sm-6 col-md-6 col-lg-4"
                        id="shipping_cost"
                      >
                        <label className="control-label">Shipping cost </label>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          step={1}
                          placeholder="Shipping cost"
                          name="shipping_cost"
                          className="form-control"
                          required
                        />
                      </div>
                      <div
                        className="col-md-6 col-lg-4 mt-sm-1"
                        id="shipping_cost_multy"
                      >
                        <div>
                          <label className="control-label">
                            Shipping cost multiply with quantity{" "}
                          </label>
                        </div>
                        <div>
                          <label className="switch">
                            <input type="checkbox" name="multiplyQTY" id />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="card mt-2 mb-2 rest-part">
                <div className="card-header">
                  <h4>Seo section</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <label className="control-label">Meta title</label>
                      <input
                        type="text"
                        name="meta_title"
                        placeholder
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-8 mb-4">
                      <label className="control-label">Meta description</label>
                      <textarea
                        rows={10}
                        type="text"
                        name="meta_description"
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-0">
                        <label>Meta image</label>
                      </div>
                      <div className="border border-dashed">
                        <div className="row" id="meta_img">
                          <div
                            className="col-12 spartan_item_wrapper"
                            data-spartanindexrow={0}
                            style={{ marginBottom: "20px" }}
                          >
                            <div style={{ position: "relative" }}>
                              <div
                                className="spartan_item_loader"
                                data-spartanindexloader={0}
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "280px",
                                  background: "rgba(255,255,255, 0.7)",
                                  zIndex: 22,
                                  textAlign: "center",
                                  alignItems: "center",
                                  margin: "auto",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  display: "none",
                                  fontSize: "1.7em",
                                  color: "#CECECE",
                                }}
                              >
                                <i className="fas fa-sync fa-spin" />
                              </div>
                              <label
                                className="file_upload"
                                style={{
                                  width: "100%",
                                  height: "280px",
                                  border: "2px dashed #ddd",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  padding: "5px",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  position: "relative",
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "auto",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <a
                                  href="javascript:void(0)"
                                  data-spartanindexremove={0}
                                  style={{
                                    position: "absolute !important",
                                    right: "3px",
                                    top: "3px",
                                    display: "none",
                                    background: "transparent",
                                    borderRadius: "3px",
                                    width: "30px",
                                    height: "30px",
                                    lineHeight: "30px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    color: "#ff0700",
                                  }}
                                  className="spartan_remove_row"
                                >
                                  <i className="tio-add-to-trash" />
                                </a>
                                <img
                                  style={{
                                    width: "90%",
                                    margin: "0 auto",
                                    verticalAlign: "middle",
                                  }}
                                  data-spartanindexi={0}
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/400x400/img2.jpg"
                                  className="spartan_image_placeholder"
                                />{" "}
                                <p
                                  data-spartanlbldropfile={0}
                                  style={{
                                    color: "#5FAAE1",
                                    display: "none",
                                    width: "auto",
                                  }}
                                >
                                  Drop Here
                                </p>
                                <img
                                  style={{
                                    width: "100%",
                                    verticalAlign: "middle",
                                    display: "none",
                                  }}
                                  className="img_"
                                  data-spartanindeximage={0}
                                />
                                <input
                                  className="form-control spartan_image_input"
                                  accept="image/*"
                                  data-spartanindexinput={0}
                                  style={{ display: "none" }}
                                  name="meta_image"
                                  type="file"
                                />
                              </label>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="card mt-2 rest-part">
                <div className="card-body">
                  <div className="row">
                    {/* <div className="col-md-12 mb-4">
                      <label className="control-label">
                        Youtube video link
                      </label>
                      <small className="badge badge-soft-danger">
                        {" "}
                        ( Optional please provide embed link not direct link. )
                      </small>
                      <input
                        type="text"
                        name="video_link"
                        placeholder="EX : https://www.youtube.com/embed/5R06LRdUCSE"
                        className="form-control"
                        required
                      />
                    </div> */}
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Add Product Image</label>
                        <small style={{ color: "red" }}>* ( Ratio 1:1 )</small>
                      </div>
                      <div
                        className="p-2 border border-dashed"
                        style={{ maxWidth: "430px" }}
                      >
                        <div className="row" id="coba">
                          <div
                            className="col-6 spartan_item_wrapper"
                            data-spartanindexrow={0}
                            style={{ marginBottom: "20px" }}
                          >
                            <div style={{ position: "relative" }}>
                              <div
                                className="spartan_item_loader"
                                data-spartanindexloader={0}
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "auto",
                                  background: "rgba(255,255,255, 0.7)",
                                  zIndex: 22,
                                  textAlign: "center",
                                  alignItems: "center",
                                  margin: "auto",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  display: "none",
                                  fontSize: "1.7em",
                                  color: "#CECECE",
                                }}
                              >
                                <i className="fas fa-sync fa-spin" />
                              </div>
                              <label
                                className="file_upload"
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  border: "2px dashed #ddd",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  padding: "5px",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  position: "relative",
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "auto",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <a
                                  href="javascript:void(0)"
                                  data-spartanindexremove={0}
                                  style={{
                                    position: "absolute !important",
                                    right: "3px",
                                    top: "3px",
                                    display: "none",
                                    background: "transparent",
                                    borderRadius: "3px",
                                    width: "30px",
                                    height: "30px",
                                    lineHeight: "30px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    color: "#ff0700",
                                  }}
                                  className="spartan_remove_row"
                                >
                                  <i className="tio-add-to-trash" />
                                </a>
                                <img
                                  style={{
                                    width: "100%",
                                    margin: "0 auto",
                                    verticalAlign: "middle",
                                  }}
                                  data-spartanindexi={0}
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/400x400/img2.jpg"
                                  className="spartan_image_placeholder"
                                />{" "}
                                <p
                                  data-spartanlbldropfile={0}
                                  style={{
                                    color: "#5FAAE1",
                                    display: "none",
                                    width: "auto",
                                  }}
                                >
                                  Drop Here
                                </p>
                                <img
                                  style={{
                                    width: "100%",
                                    verticalAlign: "middle",
                                    display: "none",
                                  }}
                                  className="img_"
                                  data-spartanindeximage={0}
                                />
                                <input
                                  className="form-control spartan_image_input"
                                  accept="image/*"
                                  data-spartanindexinput={0}
                                  style={{ display: "none" }}
                                  // name="images[]"
                                  name="pphoto"
                                  type="file"
                                  // multiple
                                  onChange={handleInputChange}
                                />
                              </label>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Upload thumbnail</label>
                        <small style={{ color: "red" }}>* ( Ratio 1:1 )</small>
                      </div>
                      <div style={{ maxWidth: "200px" }}>
                        <div className="row" id="thumbnail">
                          <div
                            className="col-12 spartan_item_wrapper"
                            data-spartanindexrow={0}
                            style={{ marginBottom: "20px" }}
                          >
                            <div style={{ position: "relative" }}>
                              <div
                                className="spartan_item_loader"
                                data-spartanindexloader={0}
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "auto",
                                  background: "rgba(255,255,255, 0.7)",
                                  zIndex: 22,
                                  textAlign: "center",
                                  alignItems: "center",
                                  margin: "auto",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  display: "none",
                                  fontSize: "1.7em",
                                  color: "#CECECE",
                                }}
                              >
                                <i className="fas fa-sync fa-spin" />
                              </div>
                              <label
                                className="file_upload"
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  border: "2px dashed #ddd",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  padding: "5px",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  position: "relative",
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "auto",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <a
                                  href="javascript:void(0)"
                                  data-spartanindexremove={0}
                                  style={{
                                    position: "absolute !important",
                                    right: "3px",
                                    top: "3px",
                                    display: "none",
                                    background: "transparent",
                                    borderRadius: "3px",
                                    width: "30px",
                                    height: "30px",
                                    lineHeight: "30px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    color: "#ff0700",
                                  }}
                                  className="spartan_remove_row"
                                >
                                  <i className="tio-add-to-trash" />
                                </a>
                                <img
                                  style={{
                                    width: "100%",
                                    margin: "0 auto",
                                    verticalAlign: "middle",
                                  }}
                                  data-spartanindexi={0}
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/400x400/img2.jpg"
                                  className="spartan_image_placeholder"
                                />{" "}
                                <p
                                  data-spartanlbldropfile={0}
                                  style={{
                                    color: "#5FAAE1",
                                    display: "none",
                                    width: "auto",
                                  }}
                                >
                                  Drop Here
                                </p>
                                <img
                                  style={{
                                    width: "100%",
                                    verticalAlign: "middle",
                                    display: "none",
                                  }}
                                  className="img_"
                                  data-spartanindeximage={0}
                                />
                                <input
                                  className="form-control spartan_image_input"
                                  accept="image/*"
                                  data-spartanindexinput={0}
                                  style={{ display: "none" }}
                                  name="image"
                                  type="file"
                                />
                              </label>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/*  */}
              {/* <div className="card mt-2 rest-part">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <img
                        src={productDetails?.pphoto}
                        style={{
                          // maxWidth: "25%",
                          // maxHeight: "25%",
                          // minWidth: "25%",
                          // minHeight: "25%",
                          width: "25%",
                          height: "25vh",
                          objectFit: "cover",
                          padding: "2px",
                        }}
                        // className="spartan_image_placeholder"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              {/*  */}
              {
                !!productDetails?._pphoto?.length &&
                (
                  <div className="card mt-2 rest-part">
                    <div className="card-header">Existing Images:</div>
                    <div className="card-body">
                      <div className="row">
                        {!!productDetails?._pphoto?.length
                          && productDetails?._pphoto?.map((item, index) =>
                            <div className="col-md-4 col-lg-2 justify-content-center align-items-center" style={{
                              // backgroundColor: "orange"
                            }}>
                              <div
                                onClick={() => {
                                  setProductDetails((prev) => ({
                                    ...prev,
                                    _pphoto: [
                                      ...prev?._pphoto?.slice(0, index),
                                      ...prev?._pphoto?.slice(index + 1),
                                    ]
                                  })
                                  );
                                }}
                                style={{
                                  // backgroundColor: "greenyellow",
                                  cursor: "pointer",
                                  position: "absolute",
                                  float: "right",
                                  top: 0,
                                  right: 0
                                }}>
                                <i className="fa fa-times"></i>
                              </div>
                              <div style={{
                                textAlign: "center", verticalAlign: 'middle',
                                //  backgroundColor: 'red' 
                              }}>
                                <img
                                  src={item || productImage}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = productImage;
                                  }}
                                  style={{
                                    // maxWidth: "25%",
                                    // maxHeight: "25%",
                                    // minWidth: "25%",
                                    // minHeight: "25%",
                                    // width: "25%",
                                    // height: "25vh",
                                    width: "10rem",
                                    height: '10rem',
                                    objectFit: "cover",
                                    padding: "2px",
                                    display: 'block',
                                    margin: "auto"
                                  }}
                                  className="spartan_image_placeholder"
                                  alt=""
                                />
                              </div>
                            </div>
                          )}
                        {!!productDetails?.imageURLObj?.length
                          && productDetails?.imageURLObj?.map((item, index) =>
                            <div className="col-md-4 col-lg-2 justify-content-center align-items-center" style={{
                              // backgroundColor: "orange"
                            }}>
                              <div
                                onClick={() => {
                                  setProductDetails((prev) => ({
                                    ...prev,
                                    imageURLObj: [
                                      ...prev?.imageURLObj?.slice(0, index),
                                      ...prev?.imageURLObj?.slice(index + 1),
                                    ],
                                    pphoto: [
                                      ...prev?.pphoto?.slice(0, index),
                                      ...prev?.pphoto?.slice(index + 1),
                                    ]
                                  })
                                  );
                                }}
                                style={{
                                  // backgroundColor: "greenyellow",
                                  cursor: "pointer",
                                  position: "absolute",
                                  float: "right",
                                  top: 0,
                                  right: 0
                                }}>
                                <i className="fa fa-times"></i>
                              </div>
                              <div style={{
                                textAlign: "center", verticalAlign: 'middle',
                                //  backgroundColor: 'red' 
                              }}>
                                <img
                                  src={item || productImage}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = productImage;
                                  }}
                                  style={{
                                    // maxWidth: "25%",
                                    // maxHeight: "25%",
                                    // minWidth: "25%",
                                    // minHeight: "25%",
                                    // width: "25%",
                                    // height: "25vh",
                                    width: "10rem",
                                    height: '10rem',
                                    objectFit: "cover",
                                    padding: "2px",
                                    display: 'block',
                                    margin: "auto"
                                  }}
                                  className="spartan_image_placeholder"
                                  alt=""
                                />
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="card mt-2 rest-part">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="button"
                        // onclick="check()"
                        className="btn btn-primary"
                        onClick={handleUpdateProduct}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSellerViewProductEdit;
