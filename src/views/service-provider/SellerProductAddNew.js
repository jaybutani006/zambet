import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { getSellerSessionToken } from "utils/Common";

//
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//

import { Context } from "context/newContext";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

function SellerProductAddNew() {
  const [state, dispatch] = useContext(Context);

  const navigate = useNavigate();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const initialState = {
    pname: "",
    pdesc: "",
    display_price: "0",
    selling_price: "0",
    subsubcategory_id: "",
    p_quantity: "0",
    hsncode: "",
    barcode: "",
    brand_id: "",
    pphoto: [],
    //
    category_id: "",
    subcategory_id: "",
    imageURLObj: [],
  };

  const [productDetails, setProductDetails] = useState({
    pname: "",
    pdesc: "",
    display_price: "0",
    selling_price: "0",
    subsubcategory_id: "",
    p_quantity: "0",
    hsncode: "",
    barcode: "",
    brand_id: "",
    pphoto: [],
    //
    category_id: "",
    subcategory_id: "",
    imageURLObj: [],
  });

  const [wysiwygState, setWysiwygState] = useState();

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
          setProductDetails((prev) => ({
            ...prev,
            [name]: e.target.files,
            imageURLObj: imageURLObj,
          }));
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
    } else if (
      name === "p_quantity" ||
      name === "display_price" ||
      name === "selling_price"
    ) {
      setProductDetails((prev) => ({
        ...prev,
        [name]: e.target.value.replace(/^0+/, ""),
      }));
    } else {
      setProductDetails((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const validateBeforeAddProduct = () => {
    return true || false;
  };

  const apiAddStockToProduct = (productId) => {
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/stockandprice",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        product_id: productId,
        product_stock: productDetails.p_quantity,
        display_price: productDetails.display_price,
        selling_price: productDetails.selling_price,
      }),
    })
      .then((response) => {
        console.log(response.data);
        alert("Stock Added Success");
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);

    if (validateBeforeAddProduct() === true) {
      const formData = new FormData();

      Object.keys(productDetails).forEach((key) => {
        // console.log(key, productDetails[key]);
        if (key === "pphoto") {
          Array.from(productDetails[key]).map((item) =>
            formData.append(key, item)
          );
          // console.log([...productDetails[key]]);
        } else if (
          key === "p_quantity" ||
          key === "display_price" ||
          key === "selling_price"
        ) {
          // formData.append(key, parseInt(productDetails[key]));
        } else if (key == "subsubcategory_id") {
          if (!!productDetails[key]) {
            console.log(key, productDetails[key]);
            formData.append(key, productDetails[key]);
          }
        } else {
          console.log(key, productDetails[key]);
          formData.append(key, productDetails[key]);
        }
      });
      //

      const config = {
        method: "post",
        url: process.env.REACT_APP_BASEURL + "/api/product",
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: state.sellerToken,
        },
        data: formData,
      };
      axios(config)
        .then((response) => {
          console.log(response.data);
          setProductDetails({ ...initialState });
          alert("Product Added Successfully");
          // apiAddStockToProduct(response.data.data._id);
          // navigate("/seller/dashboard", { replace: true });
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        })
        .finally(() => {
          setIsSubmitDisabled(false);
        });
    }
  };

  useEffect(() => {
    console.log(
      // state,
      // state.allBrands,
      // state.allCategories,
      state.allCategories?.map((item) => (
        <option key={item._id} value={item._id}>
          {item.category_name}
        </option>
      )),
      state.allCategories
        ?.filter((item) => item._id === productDetails.category_id)
        ?.map((item) =>
          item.Subcategory?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.subcategory_name}
            </option>
          ))
        ),
      state.allCategories
        ?.filter((item) => item._id === productDetails.category_id)
        ?.map((item) =>
          item.Subcategory?.filter(
            (item1) => item1._id === productDetails.subcategory_id
          )?.map((item) =>
            item.Subsubcategory?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.subsubcategory_name}
              </option>
            ))
          )
        )
    );
    console.log(state);
    // console.log(
    //   !!state && !!state.allSubSubCategories
    //     ? state.allSubSubCategories
    //         .filter(
    //           (item) => item._id === "62540cecbe27d2c5ae347156"
    //           //categoryid
    //         )
    //         .map((item) => ({
    //           ...item,
    //           Subcategory: item.Subcategory.filter(
    //             (item) => item._id === "624298cd886c789505ad87b8"
    //           ),
    //         }))
    //     : null
    // );

    // const filter1 =
    //   !!state && !!state.allSubSubCategories
    //     ? state.allSubSubCategories.filter(
    //         (item) => item._id === productDetails.category_id
    //         //categoryid
    //       )
    //     : null;

    // const map1 =
    //   !!filter1 && !!filter1.length
    //     ? filter1.map((item) => ({
    //         ...item,
    //         Subcategory: item.Subcategory.filter(
    //           (item) => item._id === productDetails.subcategory_id
    //         ),
    //       }))
    //     : [];

    // const y1 =
    //   !!map1.length && !!map1[0].Subcategory.length
    //     ? map1[0].Subcategory[0].Subsubcategory?.map(
    //         (item) => item.subsubcategory_name
    //       )
    //     : [];
    // console.log(map1, y1);
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
              <Link to="/seller/product/list">Product</Link>
            </li>
            <li className="breadcrumb-item">Add new</li>
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
                    {/* <li className="nav-item">
                      <a className="nav-link lang_link " href="#" id="sa-link">
                        عربي(SA)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link lang_link " href="#" id="bd-link">
                        বাংলা(BD)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link lang_link " href="#" id="in-link">
                        हिंदी(IN)
                      </a>
                    </li> */}
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
                      {/* <ReactQuill
                        theme="snow"
                        value={setWysiwygState}
                        readOnly={true}
                        onChange={(editor) => console.log(editor)}
                      /> */}

                    </div>
                  </div>
                  {/* <div className="d-none lang_form" id="sa-form">
                    <div className="form-group">
                      <label className="input-label" htmlFor="sa_name">
                        Name (SA)
                      </label>
                      <input
                        type="text"
                        name="name[]"
                        id="sa_name"
                        className="form-control"
                        placeholder="New Product"
                        required
                      />
                    </div>
                    <input type="hidden" name="lang[]" defaultValue="sa" />
                    <div className="form-group pt-4">
                      <label className="input-label" htmlFor="sa_description">
                        Description (SA)
                      </label>
                      <textarea
                        name="description[]"
                        className="editor textarea"
                        cols={30}
                        rows={10}
                        style={{ visibility: "hidden", display: "none" }}
                        defaultValue={""}
                      />
                      <div
                        id="cke_description[]"
                        className="cke_2 cke cke_reset cke_chrome cke_editor_description[] cke_ltr cke_browser_webkit"
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
                            id="cke_2_top"
                            className="cke_top cke_reset_all"
                            role="presentation"
                            style={{ height: "auto", userSelect: "none" }}
                          >
                            <span id="cke_71" className="cke_voice_label">
                              Editor toolbars
                            </span>
                            <span
                              id="cke_2_toolbox"
                              className="cke_toolbox"
                              role="group"
                              aria-labelledby="cke_71"
                              onmousedown="return false;"
                            >
                              <span
                                id="cke_74"
                                className="cke_toolbar"
                                aria-labelledby="cke_74_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_74_label"
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
                                    id="cke_75"
                                    className="cke_button cke_button__cut cke_button_disabled "
                                    href="javascript:void('Cut')"
                                    title="Cut (Ctrl+X)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_75_label"
                                    aria-describedby="cke_75_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(94,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(95,event);"
                                    onclick="CKEDITOR.tools.callFunction(96,this);return false;"
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
                                      id="cke_75_label"
                                      className="cke_button_label cke_button__cut_label"
                                      aria-hidden="false"
                                    >
                                      Cut
                                    </span>
                                    <span
                                      id="cke_75_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+X
                                    </span>
                                  </a>
                                  <a
                                    id="cke_76"
                                    className="cke_button cke_button__copy cke_button_disabled "
                                    href="javascript:void('Copy')"
                                    title="Copy (Ctrl+C)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_76_label"
                                    aria-describedby="cke_76_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(97,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(98,event);"
                                    onclick="CKEDITOR.tools.callFunction(99,this);return false;"
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
                                      id="cke_76_label"
                                      className="cke_button_label cke_button__copy_label"
                                      aria-hidden="false"
                                    >
                                      Copy
                                    </span>
                                    <span
                                      id="cke_76_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+C
                                    </span>
                                  </a>
                                  <a
                                    id="cke_77"
                                    className="cke_button cke_button__paste cke_button_off"
                                    href="javascript:void('Paste')"
                                    title="Paste (Ctrl+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_77_label"
                                    aria-describedby="cke_77_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(100,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(101,event);"
                                    onclick="CKEDITOR.tools.callFunction(102,this);return false;"
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
                                      id="cke_77_label"
                                      className="cke_button_label cke_button__paste_label"
                                      aria-hidden="false"
                                    >
                                      Paste
                                    </span>
                                    <span
                                      id="cke_77_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_78"
                                    className="cke_button cke_button__pastetext cke_button_off"
                                    href="javascript:void('Paste as plain text')"
                                    title="Paste as plain text (Ctrl+Shift+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_78_label"
                                    aria-describedby="cke_78_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(103,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(104,event);"
                                    onclick="CKEDITOR.tools.callFunction(105,this);return false;"
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
                                      id="cke_78_label"
                                      className="cke_button_label cke_button__pastetext_label"
                                      aria-hidden="false"
                                    >
                                      Paste as plain text
                                    </span>
                                    <span
                                      id="cke_78_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Shift+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_79"
                                    className="cke_button cke_button__pastefromword cke_button_off"
                                    href="javascript:void('Paste from Word')"
                                    title="Paste from Word"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_79_label"
                                    aria-describedby="cke_79_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(106,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(107,event);"
                                    onclick="CKEDITOR.tools.callFunction(108,this);return false;"
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
                                      id="cke_79_label"
                                      className="cke_button_label cke_button__pastefromword_label"
                                      aria-hidden="false"
                                    >
                                      Paste from Word
                                    </span>
                                    <span
                                      id="cke_79_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_80"
                                    className="cke_button cke_button__undo cke_button_disabled "
                                    href="javascript:void('Undo')"
                                    title="Undo (Ctrl+Z)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_80_label"
                                    aria-describedby="cke_80_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(109,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(110,event);"
                                    onclick="CKEDITOR.tools.callFunction(111,this);return false;"
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
                                      id="cke_80_label"
                                      className="cke_button_label cke_button__undo_label"
                                      aria-hidden="false"
                                    >
                                      Undo
                                    </span>
                                    <span
                                      id="cke_80_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Z
                                    </span>
                                  </a>
                                  <a
                                    id="cke_81"
                                    className="cke_button cke_button__redo cke_button_disabled "
                                    href="javascript:void('Redo')"
                                    title="Redo (Ctrl+Y)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_81_label"
                                    aria-describedby="cke_81_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(112,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(113,event);"
                                    onclick="CKEDITOR.tools.callFunction(114,this);return false;"
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
                                      id="cke_81_label"
                                      className="cke_button_label cke_button__redo_label"
                                      aria-hidden="false"
                                    >
                                      Redo
                                    </span>
                                    <span
                                      id="cke_81_description"
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
                                id="cke_82"
                                className="cke_toolbar"
                                aria-labelledby="cke_82_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_82_label"
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
                                    id="cke_83"
                                    className="cke_button cke_button__scayt cke_button_off cke_button_expandable"
                                    href="javascript:void('Spell Check As You Type')"
                                    title="Spell Check As You Type"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_83_label"
                                    aria-describedby="cke_83_description"
                                    aria-haspopup="menu"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(115,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(116,event);"
                                    onclick="CKEDITOR.tools.callFunction(117,this);return false;"
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
                                      id="cke_83_label"
                                      className="cke_button_label cke_button__scayt_label"
                                      aria-hidden="false"
                                    >
                                      Spell Check As You Type
                                    </span>
                                    <span
                                      id="cke_83_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                    <span className="cke_button_arrow" />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_84"
                                className="cke_toolbar"
                                aria-labelledby="cke_84_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_84_label"
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
                                    id="cke_85"
                                    className="cke_button cke_button__link cke_button_off"
                                    href="javascript:void('Link')"
                                    title="Link (Ctrl+K)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_85_label"
                                    aria-describedby="cke_85_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(118,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(119,event);"
                                    onclick="CKEDITOR.tools.callFunction(120,this);return false;"
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
                                      id="cke_85_label"
                                      className="cke_button_label cke_button__link_label"
                                      aria-hidden="false"
                                    >
                                      Link
                                    </span>
                                    <span
                                      id="cke_85_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+K
                                    </span>
                                  </a>
                                  <a
                                    id="cke_86"
                                    className="cke_button cke_button__unlink cke_button_disabled "
                                    href="javascript:void('Unlink')"
                                    title="Unlink"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_86_label"
                                    aria-describedby="cke_86_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(121,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(122,event);"
                                    onclick="CKEDITOR.tools.callFunction(123,this);return false;"
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
                                      id="cke_86_label"
                                      className="cke_button_label cke_button__unlink_label"
                                      aria-hidden="false"
                                    >
                                      Unlink
                                    </span>
                                    <span
                                      id="cke_86_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_87"
                                    className="cke_button cke_button__anchor cke_button_off"
                                    href="javascript:void('Anchor')"
                                    title="Anchor"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_87_label"
                                    aria-describedby="cke_87_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(124,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(125,event);"
                                    onclick="CKEDITOR.tools.callFunction(126,this);return false;"
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
                                      id="cke_87_label"
                                      className="cke_button_label cke_button__anchor_label"
                                      aria-hidden="false"
                                    >
                                      Anchor
                                    </span>
                                    <span
                                      id="cke_87_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_88"
                                className="cke_toolbar"
                                aria-labelledby="cke_88_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_88_label"
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
                                    id="cke_89"
                                    className="cke_button cke_button__image cke_button_off"
                                    href="javascript:void('Image')"
                                    title="Image"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_89_label"
                                    aria-describedby="cke_89_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(127,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(128,event);"
                                    onclick="CKEDITOR.tools.callFunction(129,this);return false;"
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
                                      id="cke_89_label"
                                      className="cke_button_label cke_button__image_label"
                                      aria-hidden="false"
                                    >
                                      Image
                                    </span>
                                    <span
                                      id="cke_89_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_90"
                                    className="cke_button cke_button__table cke_button_off"
                                    href="javascript:void('Table')"
                                    title="Table"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_90_label"
                                    aria-describedby="cke_90_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(130,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(131,event);"
                                    onclick="CKEDITOR.tools.callFunction(132,this);return false;"
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
                                      id="cke_90_label"
                                      className="cke_button_label cke_button__table_label"
                                      aria-hidden="false"
                                    >
                                      Table
                                    </span>
                                    <span
                                      id="cke_90_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_91"
                                    className="cke_button cke_button__horizontalrule cke_button_off"
                                    href="javascript:void('Insert Horizontal Line')"
                                    title="Insert Horizontal Line"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_91_label"
                                    aria-describedby="cke_91_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(133,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(134,event);"
                                    onclick="CKEDITOR.tools.callFunction(135,this);return false;"
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
                                      id="cke_91_label"
                                      className="cke_button_label cke_button__horizontalrule_label"
                                      aria-hidden="false"
                                    >
                                      Insert Horizontal Line
                                    </span>
                                    <span
                                      id="cke_91_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_92"
                                    className="cke_button cke_button__specialchar cke_button_off"
                                    href="javascript:void('Insert Special Character')"
                                    title="Insert Special Character"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_92_label"
                                    aria-describedby="cke_92_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(136,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(137,event);"
                                    onclick="CKEDITOR.tools.callFunction(138,this);return false;"
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
                                      id="cke_92_label"
                                      className="cke_button_label cke_button__specialchar_label"
                                      aria-hidden="false"
                                    >
                                      Insert Special Character
                                    </span>
                                    <span
                                      id="cke_92_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_93"
                                className="cke_toolbar"
                                aria-labelledby="cke_93_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_93_label"
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
                                    id="cke_94"
                                    className="cke_button cke_button__maximize cke_button_off"
                                    href="javascript:void('Maximize')"
                                    title="Maximize"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_94_label"
                                    aria-describedby="cke_94_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(139,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(140,event);"
                                    onclick="CKEDITOR.tools.callFunction(141,this);return false;"
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
                                      id="cke_94_label"
                                      className="cke_button_label cke_button__maximize_label"
                                      aria-hidden="false"
                                    >
                                      Maximize
                                    </span>
                                    <span
                                      id="cke_94_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_95"
                                className="cke_toolbar"
                                aria-labelledby="cke_95_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_95_label"
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
                                    id="cke_96"
                                    className="cke_button cke_button__source cke_button_off"
                                    href="javascript:void('Source')"
                                    title="Source"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_96_label"
                                    aria-describedby="cke_96_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(142,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(143,event);"
                                    onclick="CKEDITOR.tools.callFunction(144,this);return false;"
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
                                      id="cke_96_label"
                                      className="cke_button_label cke_button__source_label"
                                      aria-hidden="false"
                                    >
                                      Source
                                    </span>
                                    <span
                                      id="cke_96_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span className="cke_toolbar_break" />
                              <span
                                id="cke_97"
                                className="cke_toolbar"
                                aria-labelledby="cke_97_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_97_label"
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
                                    id="cke_98"
                                    className="cke_button cke_button__bold cke_button_off"
                                    href="javascript:void('Bold')"
                                    title="Bold (Ctrl+B)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_98_label"
                                    aria-describedby="cke_98_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(145,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(146,event);"
                                    onclick="CKEDITOR.tools.callFunction(147,this);return false;"
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
                                      id="cke_98_label"
                                      className="cke_button_label cke_button__bold_label"
                                      aria-hidden="false"
                                    >
                                      Bold
                                    </span>
                                    <span
                                      id="cke_98_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+B
                                    </span>
                                  </a>
                                  <a
                                    id="cke_99"
                                    className="cke_button cke_button__italic cke_button_off"
                                    href="javascript:void('Italic')"
                                    title="Italic (Ctrl+I)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_99_label"
                                    aria-describedby="cke_99_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(148,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(149,event);"
                                    onclick="CKEDITOR.tools.callFunction(150,this);return false;"
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
                                      id="cke_99_label"
                                      className="cke_button_label cke_button__italic_label"
                                      aria-hidden="false"
                                    >
                                      Italic
                                    </span>
                                    <span
                                      id="cke_99_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+I
                                    </span>
                                  </a>
                                  <a
                                    id="cke_100"
                                    className="cke_button cke_button__strike cke_button_off"
                                    href="javascript:void('Strikethrough')"
                                    title="Strikethrough"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_100_label"
                                    aria-describedby="cke_100_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(151,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(152,event);"
                                    onclick="CKEDITOR.tools.callFunction(153,this);return false;"
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
                                      id="cke_100_label"
                                      className="cke_button_label cke_button__strike_label"
                                      aria-hidden="false"
                                    >
                                      Strikethrough
                                    </span>
                                    <span
                                      id="cke_100_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_101"
                                    className="cke_button cke_button__removeformat cke_button_off"
                                    href="javascript:void('Remove Format')"
                                    title="Remove Format"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_101_label"
                                    aria-describedby="cke_101_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(154,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(155,event);"
                                    onclick="CKEDITOR.tools.callFunction(156,this);return false;"
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
                                      id="cke_101_label"
                                      className="cke_button_label cke_button__removeformat_label"
                                      aria-hidden="false"
                                    >
                                      Remove Format
                                    </span>
                                    <span
                                      id="cke_101_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_102"
                                className="cke_toolbar"
                                aria-labelledby="cke_102_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_102_label"
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
                                    id="cke_103"
                                    className="cke_button cke_button__numberedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Numbered List')"
                                    title="Insert/Remove Numbered List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_103_label"
                                    aria-describedby="cke_103_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(157,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(158,event);"
                                    onclick="CKEDITOR.tools.callFunction(159,this);return false;"
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
                                      id="cke_103_label"
                                      className="cke_button_label cke_button__numberedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Numbered List
                                    </span>
                                    <span
                                      id="cke_103_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_104"
                                    className="cke_button cke_button__bulletedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Bulleted List')"
                                    title="Insert/Remove Bulleted List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_104_label"
                                    aria-describedby="cke_104_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(160,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(161,event);"
                                    onclick="CKEDITOR.tools.callFunction(162,this);return false;"
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
                                      id="cke_104_label"
                                      className="cke_button_label cke_button__bulletedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Bulleted List
                                    </span>
                                    <span
                                      id="cke_104_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_105"
                                    className="cke_button cke_button__outdent cke_button_disabled "
                                    href="javascript:void('Decrease Indent')"
                                    title="Decrease Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_105_label"
                                    aria-describedby="cke_105_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(163,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(164,event);"
                                    onclick="CKEDITOR.tools.callFunction(165,this);return false;"
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
                                      id="cke_105_label"
                                      className="cke_button_label cke_button__outdent_label"
                                      aria-hidden="false"
                                    >
                                      Decrease Indent
                                    </span>
                                    <span
                                      id="cke_105_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_106"
                                    className="cke_button cke_button__indent cke_button_off"
                                    href="javascript:void('Increase Indent')"
                                    title="Increase Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_106_label"
                                    aria-describedby="cke_106_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(166,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(167,event);"
                                    onclick="CKEDITOR.tools.callFunction(168,this);return false;"
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
                                      id="cke_106_label"
                                      className="cke_button_label cke_button__indent_label"
                                      aria-hidden="false"
                                    >
                                      Increase Indent
                                    </span>
                                    <span
                                      id="cke_106_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_107"
                                    className="cke_button cke_button__blockquote cke_button_off"
                                    href="javascript:void('Block Quote')"
                                    title="Block Quote"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_107_label"
                                    aria-describedby="cke_107_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(169,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(170,event);"
                                    onclick="CKEDITOR.tools.callFunction(171,this);return false;"
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
                                      id="cke_107_label"
                                      className="cke_button_label cke_button__blockquote_label"
                                      aria-hidden="false"
                                    >
                                      Block Quote
                                    </span>
                                    <span
                                      id="cke_107_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_108"
                                className="cke_toolbar"
                                aria-labelledby="cke_108_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_108_label"
                                  className="cke_voice_label"
                                >
                                  Styles
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  id="cke_72"
                                  className="cke_combo cke_combo__styles cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_72_label"
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
                                    aria-labelledby="cke_72_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(173,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(174,event);"
                                    onclick="CKEDITOR.tools.callFunction(172,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_72_text"
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
                                  id="cke_73"
                                  className="cke_combo cke_combo__format cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_73_label"
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
                                    aria-labelledby="cke_73_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(176,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(177,event);"
                                    onclick="CKEDITOR.tools.callFunction(175,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_73_text"
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
                                id="cke_109"
                                className="cke_toolbar cke_toolbar_last"
                                aria-labelledby="cke_109_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_109_label"
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
                                    id="cke_110"
                                    className="cke_button cke_button__about cke_button_off"
                                    href="javascript:void('About CKEditor 4')"
                                    title="About CKEditor 4"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_110_label"
                                    aria-describedby="cke_110_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(178,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(179,event);"
                                    onclick="CKEDITOR.tools.callFunction(180,this);return false;"
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
                                      id="cke_110_label"
                                      className="cke_button_label cke_button__about_label"
                                      aria-hidden="false"
                                    >
                                      About CKEditor 4
                                    </span>
                                    <span
                                      id="cke_110_description"
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
                            id="cke_2_contents"
                            className="cke_contents cke_reset"
                            role="presentation"
                            style={{ height: "200px" }}
                          >
                            <span id="cke_114" className="cke_voice_label">
                              Press ALT 0 for help
                            </span>
                            <iframe
                              src
                              frameBorder={0}
                              className="cke_wysiwyg_frame cke_reset"
                              title="Rich Text Editor, description[]"
                              aria-describedby="cke_114"
                              tabIndex={0}
                              allowTransparency="true"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                          <span
                            id="cke_2_bottom"
                            className="cke_bottom cke_reset_all"
                            role="presentation"
                            style={{ userSelect: "none" }}
                          >
                            <span
                              id="cke_2_resizer"
                              className="cke_resizer cke_resizer_vertical cke_resizer_ltr"
                              title="Resize"
                              onmousedown="CKEDITOR.tools.callFunction(93, event)"
                            >
                              ◢
                            </span>
                            <span
                              id="cke_2_path_label"
                              className="cke_voice_label"
                            >
                              Elements path
                            </span>
                            <span
                              id="cke_2_path"
                              className="cke_path"
                              role="group"
                              aria-labelledby="cke_2_path_label"
                            >
                              <span className="cke_path_empty">&nbsp;</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-none lang_form" id="bd-form">
                    <div className="form-group">
                      <label className="input-label" htmlFor="bd_name">
                        Name (BD)
                      </label>
                      <input
                        type="text"
                        name="name[]"
                        id="bd_name"
                        className="form-control"
                        placeholder="New Product"
                        required
                      />
                    </div>
                    <input type="hidden" name="lang[]" defaultValue="bd" />
                    <div className="form-group pt-4">
                      <label className="input-label" htmlFor="bd_description">
                        Description (BD)
                      </label>
                      <textarea
                        name="description[]"
                        className="editor textarea"
                        cols={30}
                        rows={10}
                        style={{ visibility: "hidden", display: "none" }}
                        defaultValue={""}
                      />
                      <div
                        id="cke_description[]"
                        className="cke_3 cke cke_reset cke_chrome cke_editor_description[] cke_ltr cke_browser_webkit"
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
                            id="cke_3_top"
                            className="cke_top cke_reset_all"
                            role="presentation"
                            style={{ height: "auto", userSelect: "none" }}
                          >
                            <span id="cke_121" className="cke_voice_label">
                              Editor toolbars
                            </span>
                            <span
                              id="cke_3_toolbox"
                              className="cke_toolbox"
                              role="group"
                              aria-labelledby="cke_121"
                              onmousedown="return false;"
                            >
                              <span
                                id="cke_124"
                                className="cke_toolbar"
                                aria-labelledby="cke_124_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_124_label"
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
                                    id="cke_125"
                                    className="cke_button cke_button__cut cke_button_disabled "
                                    href="javascript:void('Cut')"
                                    title="Cut (Ctrl+X)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_125_label"
                                    aria-describedby="cke_125_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(186,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(187,event);"
                                    onclick="CKEDITOR.tools.callFunction(188,this);return false;"
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
                                      id="cke_125_label"
                                      className="cke_button_label cke_button__cut_label"
                                      aria-hidden="false"
                                    >
                                      Cut
                                    </span>
                                    <span
                                      id="cke_125_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+X
                                    </span>
                                  </a>
                                  <a
                                    id="cke_126"
                                    className="cke_button cke_button__copy cke_button_disabled "
                                    href="javascript:void('Copy')"
                                    title="Copy (Ctrl+C)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_126_label"
                                    aria-describedby="cke_126_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(189,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(190,event);"
                                    onclick="CKEDITOR.tools.callFunction(191,this);return false;"
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
                                      id="cke_126_label"
                                      className="cke_button_label cke_button__copy_label"
                                      aria-hidden="false"
                                    >
                                      Copy
                                    </span>
                                    <span
                                      id="cke_126_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+C
                                    </span>
                                  </a>
                                  <a
                                    id="cke_127"
                                    className="cke_button cke_button__paste cke_button_off"
                                    href="javascript:void('Paste')"
                                    title="Paste (Ctrl+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_127_label"
                                    aria-describedby="cke_127_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(192,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(193,event);"
                                    onclick="CKEDITOR.tools.callFunction(194,this);return false;"
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
                                      id="cke_127_label"
                                      className="cke_button_label cke_button__paste_label"
                                      aria-hidden="false"
                                    >
                                      Paste
                                    </span>
                                    <span
                                      id="cke_127_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_128"
                                    className="cke_button cke_button__pastetext cke_button_off"
                                    href="javascript:void('Paste as plain text')"
                                    title="Paste as plain text (Ctrl+Shift+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_128_label"
                                    aria-describedby="cke_128_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(195,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(196,event);"
                                    onclick="CKEDITOR.tools.callFunction(197,this);return false;"
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
                                      id="cke_128_label"
                                      className="cke_button_label cke_button__pastetext_label"
                                      aria-hidden="false"
                                    >
                                      Paste as plain text
                                    </span>
                                    <span
                                      id="cke_128_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Shift+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_129"
                                    className="cke_button cke_button__pastefromword cke_button_off"
                                    href="javascript:void('Paste from Word')"
                                    title="Paste from Word"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_129_label"
                                    aria-describedby="cke_129_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(198,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(199,event);"
                                    onclick="CKEDITOR.tools.callFunction(200,this);return false;"
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
                                      id="cke_129_label"
                                      className="cke_button_label cke_button__pastefromword_label"
                                      aria-hidden="false"
                                    >
                                      Paste from Word
                                    </span>
                                    <span
                                      id="cke_129_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_130"
                                    className="cke_button cke_button__undo cke_button_disabled "
                                    href="javascript:void('Undo')"
                                    title="Undo (Ctrl+Z)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_130_label"
                                    aria-describedby="cke_130_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(201,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(202,event);"
                                    onclick="CKEDITOR.tools.callFunction(203,this);return false;"
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
                                      id="cke_130_label"
                                      className="cke_button_label cke_button__undo_label"
                                      aria-hidden="false"
                                    >
                                      Undo
                                    </span>
                                    <span
                                      id="cke_130_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Z
                                    </span>
                                  </a>
                                  <a
                                    id="cke_131"
                                    className="cke_button cke_button__redo cke_button_disabled "
                                    href="javascript:void('Redo')"
                                    title="Redo (Ctrl+Y)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_131_label"
                                    aria-describedby="cke_131_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(204,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(205,event);"
                                    onclick="CKEDITOR.tools.callFunction(206,this);return false;"
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
                                      id="cke_131_label"
                                      className="cke_button_label cke_button__redo_label"
                                      aria-hidden="false"
                                    >
                                      Redo
                                    </span>
                                    <span
                                      id="cke_131_description"
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
                                id="cke_132"
                                className="cke_toolbar"
                                aria-labelledby="cke_132_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_132_label"
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
                                    id="cke_133"
                                    className="cke_button cke_button__scayt cke_button_off cke_button_expandable"
                                    href="javascript:void('Spell Check As You Type')"
                                    title="Spell Check As You Type"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_133_label"
                                    aria-describedby="cke_133_description"
                                    aria-haspopup="menu"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(207,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(208,event);"
                                    onclick="CKEDITOR.tools.callFunction(209,this);return false;"
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
                                      id="cke_133_label"
                                      className="cke_button_label cke_button__scayt_label"
                                      aria-hidden="false"
                                    >
                                      Spell Check As You Type
                                    </span>
                                    <span
                                      id="cke_133_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                    <span className="cke_button_arrow" />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_134"
                                className="cke_toolbar"
                                aria-labelledby="cke_134_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_134_label"
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
                                    id="cke_135"
                                    className="cke_button cke_button__link cke_button_off"
                                    href="javascript:void('Link')"
                                    title="Link (Ctrl+K)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_135_label"
                                    aria-describedby="cke_135_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(210,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(211,event);"
                                    onclick="CKEDITOR.tools.callFunction(212,this);return false;"
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
                                      id="cke_135_label"
                                      className="cke_button_label cke_button__link_label"
                                      aria-hidden="false"
                                    >
                                      Link
                                    </span>
                                    <span
                                      id="cke_135_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+K
                                    </span>
                                  </a>
                                  <a
                                    id="cke_136"
                                    className="cke_button cke_button__unlink cke_button_disabled "
                                    href="javascript:void('Unlink')"
                                    title="Unlink"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_136_label"
                                    aria-describedby="cke_136_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(213,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(214,event);"
                                    onclick="CKEDITOR.tools.callFunction(215,this);return false;"
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
                                      id="cke_136_label"
                                      className="cke_button_label cke_button__unlink_label"
                                      aria-hidden="false"
                                    >
                                      Unlink
                                    </span>
                                    <span
                                      id="cke_136_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_137"
                                    className="cke_button cke_button__anchor cke_button_off"
                                    href="javascript:void('Anchor')"
                                    title="Anchor"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_137_label"
                                    aria-describedby="cke_137_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(216,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(217,event);"
                                    onclick="CKEDITOR.tools.callFunction(218,this);return false;"
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
                                      id="cke_137_label"
                                      className="cke_button_label cke_button__anchor_label"
                                      aria-hidden="false"
                                    >
                                      Anchor
                                    </span>
                                    <span
                                      id="cke_137_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_138"
                                className="cke_toolbar"
                                aria-labelledby="cke_138_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_138_label"
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
                                    id="cke_139"
                                    className="cke_button cke_button__image cke_button_off"
                                    href="javascript:void('Image')"
                                    title="Image"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_139_label"
                                    aria-describedby="cke_139_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(219,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(220,event);"
                                    onclick="CKEDITOR.tools.callFunction(221,this);return false;"
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
                                      id="cke_139_label"
                                      className="cke_button_label cke_button__image_label"
                                      aria-hidden="false"
                                    >
                                      Image
                                    </span>
                                    <span
                                      id="cke_139_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_140"
                                    className="cke_button cke_button__table cke_button_off"
                                    href="javascript:void('Table')"
                                    title="Table"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_140_label"
                                    aria-describedby="cke_140_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(222,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(223,event);"
                                    onclick="CKEDITOR.tools.callFunction(224,this);return false;"
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
                                      id="cke_140_label"
                                      className="cke_button_label cke_button__table_label"
                                      aria-hidden="false"
                                    >
                                      Table
                                    </span>
                                    <span
                                      id="cke_140_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_141"
                                    className="cke_button cke_button__horizontalrule cke_button_off"
                                    href="javascript:void('Insert Horizontal Line')"
                                    title="Insert Horizontal Line"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_141_label"
                                    aria-describedby="cke_141_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(225,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(226,event);"
                                    onclick="CKEDITOR.tools.callFunction(227,this);return false;"
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
                                      id="cke_141_label"
                                      className="cke_button_label cke_button__horizontalrule_label"
                                      aria-hidden="false"
                                    >
                                      Insert Horizontal Line
                                    </span>
                                    <span
                                      id="cke_141_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_142"
                                    className="cke_button cke_button__specialchar cke_button_off"
                                    href="javascript:void('Insert Special Character')"
                                    title="Insert Special Character"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_142_label"
                                    aria-describedby="cke_142_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(228,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(229,event);"
                                    onclick="CKEDITOR.tools.callFunction(230,this);return false;"
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
                                      id="cke_142_label"
                                      className="cke_button_label cke_button__specialchar_label"
                                      aria-hidden="false"
                                    >
                                      Insert Special Character
                                    </span>
                                    <span
                                      id="cke_142_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_143"
                                className="cke_toolbar"
                                aria-labelledby="cke_143_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_143_label"
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
                                    id="cke_144"
                                    className="cke_button cke_button__maximize cke_button_off"
                                    href="javascript:void('Maximize')"
                                    title="Maximize"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_144_label"
                                    aria-describedby="cke_144_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(231,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(232,event);"
                                    onclick="CKEDITOR.tools.callFunction(233,this);return false;"
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
                                      id="cke_144_label"
                                      className="cke_button_label cke_button__maximize_label"
                                      aria-hidden="false"
                                    >
                                      Maximize
                                    </span>
                                    <span
                                      id="cke_144_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_145"
                                className="cke_toolbar"
                                aria-labelledby="cke_145_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_145_label"
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
                                    id="cke_146"
                                    className="cke_button cke_button__source cke_button_off"
                                    href="javascript:void('Source')"
                                    title="Source"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_146_label"
                                    aria-describedby="cke_146_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(234,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(235,event);"
                                    onclick="CKEDITOR.tools.callFunction(236,this);return false;"
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
                                      id="cke_146_label"
                                      className="cke_button_label cke_button__source_label"
                                      aria-hidden="false"
                                    >
                                      Source
                                    </span>
                                    <span
                                      id="cke_146_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span className="cke_toolbar_break" />
                              <span
                                id="cke_147"
                                className="cke_toolbar"
                                aria-labelledby="cke_147_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_147_label"
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
                                    id="cke_148"
                                    className="cke_button cke_button__bold cke_button_off"
                                    href="javascript:void('Bold')"
                                    title="Bold (Ctrl+B)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_148_label"
                                    aria-describedby="cke_148_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(237,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(238,event);"
                                    onclick="CKEDITOR.tools.callFunction(239,this);return false;"
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
                                      id="cke_148_label"
                                      className="cke_button_label cke_button__bold_label"
                                      aria-hidden="false"
                                    >
                                      Bold
                                    </span>
                                    <span
                                      id="cke_148_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+B
                                    </span>
                                  </a>
                                  <a
                                    id="cke_149"
                                    className="cke_button cke_button__italic cke_button_off"
                                    href="javascript:void('Italic')"
                                    title="Italic (Ctrl+I)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_149_label"
                                    aria-describedby="cke_149_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(240,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(241,event);"
                                    onclick="CKEDITOR.tools.callFunction(242,this);return false;"
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
                                      id="cke_149_label"
                                      className="cke_button_label cke_button__italic_label"
                                      aria-hidden="false"
                                    >
                                      Italic
                                    </span>
                                    <span
                                      id="cke_149_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+I
                                    </span>
                                  </a>
                                  <a
                                    id="cke_150"
                                    className="cke_button cke_button__strike cke_button_off"
                                    href="javascript:void('Strikethrough')"
                                    title="Strikethrough"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_150_label"
                                    aria-describedby="cke_150_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(243,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(244,event);"
                                    onclick="CKEDITOR.tools.callFunction(245,this);return false;"
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
                                      id="cke_150_label"
                                      className="cke_button_label cke_button__strike_label"
                                      aria-hidden="false"
                                    >
                                      Strikethrough
                                    </span>
                                    <span
                                      id="cke_150_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_151"
                                    className="cke_button cke_button__removeformat cke_button_off"
                                    href="javascript:void('Remove Format')"
                                    title="Remove Format"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_151_label"
                                    aria-describedby="cke_151_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(246,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(247,event);"
                                    onclick="CKEDITOR.tools.callFunction(248,this);return false;"
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
                                      id="cke_151_label"
                                      className="cke_button_label cke_button__removeformat_label"
                                      aria-hidden="false"
                                    >
                                      Remove Format
                                    </span>
                                    <span
                                      id="cke_151_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_152"
                                className="cke_toolbar"
                                aria-labelledby="cke_152_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_152_label"
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
                                    id="cke_153"
                                    className="cke_button cke_button__numberedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Numbered List')"
                                    title="Insert/Remove Numbered List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_153_label"
                                    aria-describedby="cke_153_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(249,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(250,event);"
                                    onclick="CKEDITOR.tools.callFunction(251,this);return false;"
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
                                      id="cke_153_label"
                                      className="cke_button_label cke_button__numberedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Numbered List
                                    </span>
                                    <span
                                      id="cke_153_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_154"
                                    className="cke_button cke_button__bulletedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Bulleted List')"
                                    title="Insert/Remove Bulleted List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_154_label"
                                    aria-describedby="cke_154_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(252,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(253,event);"
                                    onclick="CKEDITOR.tools.callFunction(254,this);return false;"
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
                                      id="cke_154_label"
                                      className="cke_button_label cke_button__bulletedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Bulleted List
                                    </span>
                                    <span
                                      id="cke_154_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_155"
                                    className="cke_button cke_button__outdent cke_button_disabled "
                                    href="javascript:void('Decrease Indent')"
                                    title="Decrease Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_155_label"
                                    aria-describedby="cke_155_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(255,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(256,event);"
                                    onclick="CKEDITOR.tools.callFunction(257,this);return false;"
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
                                      id="cke_155_label"
                                      className="cke_button_label cke_button__outdent_label"
                                      aria-hidden="false"
                                    >
                                      Decrease Indent
                                    </span>
                                    <span
                                      id="cke_155_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_156"
                                    className="cke_button cke_button__indent cke_button_off"
                                    href="javascript:void('Increase Indent')"
                                    title="Increase Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_156_label"
                                    aria-describedby="cke_156_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(258,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(259,event);"
                                    onclick="CKEDITOR.tools.callFunction(260,this);return false;"
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
                                      id="cke_156_label"
                                      className="cke_button_label cke_button__indent_label"
                                      aria-hidden="false"
                                    >
                                      Increase Indent
                                    </span>
                                    <span
                                      id="cke_156_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_157"
                                    className="cke_button cke_button__blockquote cke_button_off"
                                    href="javascript:void('Block Quote')"
                                    title="Block Quote"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_157_label"
                                    aria-describedby="cke_157_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(261,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(262,event);"
                                    onclick="CKEDITOR.tools.callFunction(263,this);return false;"
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
                                      id="cke_157_label"
                                      className="cke_button_label cke_button__blockquote_label"
                                      aria-hidden="false"
                                    >
                                      Block Quote
                                    </span>
                                    <span
                                      id="cke_157_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_158"
                                className="cke_toolbar"
                                aria-labelledby="cke_158_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_158_label"
                                  className="cke_voice_label"
                                >
                                  Styles
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  id="cke_122"
                                  className="cke_combo cke_combo__styles cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_122_label"
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
                                    aria-labelledby="cke_122_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(265,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(266,event);"
                                    onclick="CKEDITOR.tools.callFunction(264,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_122_text"
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
                                  id="cke_123"
                                  className="cke_combo cke_combo__format cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_123_label"
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
                                    aria-labelledby="cke_123_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(268,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(269,event);"
                                    onclick="CKEDITOR.tools.callFunction(267,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_123_text"
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
                                id="cke_159"
                                className="cke_toolbar cke_toolbar_last"
                                aria-labelledby="cke_159_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_159_label"
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
                                    id="cke_160"
                                    className="cke_button cke_button__about cke_button_off"
                                    href="javascript:void('About CKEditor 4')"
                                    title="About CKEditor 4"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_160_label"
                                    aria-describedby="cke_160_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(270,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(271,event);"
                                    onclick="CKEDITOR.tools.callFunction(272,this);return false;"
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
                                      id="cke_160_label"
                                      className="cke_button_label cke_button__about_label"
                                      aria-hidden="false"
                                    >
                                      About CKEditor 4
                                    </span>
                                    <span
                                      id="cke_160_description"
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
                            id="cke_3_contents"
                            className="cke_contents cke_reset"
                            role="presentation"
                            style={{ height: "200px" }}
                          >
                            <span id="cke_164" className="cke_voice_label">
                              Press ALT 0 for help
                            </span>
                            <iframe
                              src
                              frameBorder={0}
                              className="cke_wysiwyg_frame cke_reset"
                              title="Rich Text Editor, description[]"
                              aria-describedby="cke_164"
                              tabIndex={0}
                              allowTransparency="true"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                          <span
                            id="cke_3_bottom"
                            className="cke_bottom cke_reset_all"
                            role="presentation"
                            style={{ userSelect: "none" }}
                          >
                            <span
                              id="cke_3_resizer"
                              className="cke_resizer cke_resizer_vertical cke_resizer_ltr"
                              title="Resize"
                              onmousedown="CKEDITOR.tools.callFunction(185, event)"
                            >
                              ◢
                            </span>
                            <span
                              id="cke_3_path_label"
                              className="cke_voice_label"
                            >
                              Elements path
                            </span>
                            <span
                              id="cke_3_path"
                              className="cke_path"
                              role="group"
                              aria-labelledby="cke_3_path_label"
                            >
                              <span className="cke_path_empty">&nbsp;</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-none lang_form" id="in-form">
                    <div className="form-group">
                      <label className="input-label" htmlFor="in_name">
                        Name (IN)
                      </label>
                      <input
                        type="text"
                        name="name[]"
                        id="in_name"
                        className="form-control"
                        placeholder="New Product"
                        required
                      />
                    </div>
                    <input type="hidden" name="lang[]" defaultValue="in" />
                    <div className="form-group pt-4">
                      <label className="input-label" htmlFor="in_description">
                        Description (IN)
                      </label>
                      <textarea
                        name="description[]"
                        className="editor textarea"
                        cols={30}
                        rows={10}
                        style={{ visibility: "hidden", display: "none" }}
                        defaultValue={""}
                      />
                      <div
                        id="cke_description[]"
                        className="cke_4 cke cke_reset cke_chrome cke_editor_description[] cke_ltr cke_browser_webkit"
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
                            id="cke_4_top"
                            className="cke_top cke_reset_all"
                            role="presentation"
                            style={{ height: "auto", userSelect: "none" }}
                          >
                            <span id="cke_171" className="cke_voice_label">
                              Editor toolbars
                            </span>
                            <span
                              id="cke_4_toolbox"
                              className="cke_toolbox"
                              role="group"
                              aria-labelledby="cke_171"
                              onmousedown="return false;"
                            >
                              <span
                                id="cke_174"
                                className="cke_toolbar"
                                aria-labelledby="cke_174_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_174_label"
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
                                    id="cke_175"
                                    className="cke_button cke_button__cut cke_button_disabled "
                                    href="javascript:void('Cut')"
                                    title="Cut (Ctrl+X)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_175_label"
                                    aria-describedby="cke_175_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(278,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(279,event);"
                                    onclick="CKEDITOR.tools.callFunction(280,this);return false;"
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
                                      id="cke_175_label"
                                      className="cke_button_label cke_button__cut_label"
                                      aria-hidden="false"
                                    >
                                      Cut
                                    </span>
                                    <span
                                      id="cke_175_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+X
                                    </span>
                                  </a>
                                  <a
                                    id="cke_176"
                                    className="cke_button cke_button__copy cke_button_disabled "
                                    href="javascript:void('Copy')"
                                    title="Copy (Ctrl+C)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_176_label"
                                    aria-describedby="cke_176_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(281,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(282,event);"
                                    onclick="CKEDITOR.tools.callFunction(283,this);return false;"
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
                                      id="cke_176_label"
                                      className="cke_button_label cke_button__copy_label"
                                      aria-hidden="false"
                                    >
                                      Copy
                                    </span>
                                    <span
                                      id="cke_176_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+C
                                    </span>
                                  </a>
                                  <a
                                    id="cke_177"
                                    className="cke_button cke_button__paste cke_button_off"
                                    href="javascript:void('Paste')"
                                    title="Paste (Ctrl+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_177_label"
                                    aria-describedby="cke_177_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(284,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(285,event);"
                                    onclick="CKEDITOR.tools.callFunction(286,this);return false;"
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
                                      id="cke_177_label"
                                      className="cke_button_label cke_button__paste_label"
                                      aria-hidden="false"
                                    >
                                      Paste
                                    </span>
                                    <span
                                      id="cke_177_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_178"
                                    className="cke_button cke_button__pastetext cke_button_off"
                                    href="javascript:void('Paste as plain text')"
                                    title="Paste as plain text (Ctrl+Shift+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_178_label"
                                    aria-describedby="cke_178_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(287,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(288,event);"
                                    onclick="CKEDITOR.tools.callFunction(289,this);return false;"
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
                                      id="cke_178_label"
                                      className="cke_button_label cke_button__pastetext_label"
                                      aria-hidden="false"
                                    >
                                      Paste as plain text
                                    </span>
                                    <span
                                      id="cke_178_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Shift+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_179"
                                    className="cke_button cke_button__pastefromword cke_button_off"
                                    href="javascript:void('Paste from Word')"
                                    title="Paste from Word"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_179_label"
                                    aria-describedby="cke_179_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(290,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(291,event);"
                                    onclick="CKEDITOR.tools.callFunction(292,this);return false;"
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
                                      id="cke_179_label"
                                      className="cke_button_label cke_button__pastefromword_label"
                                      aria-hidden="false"
                                    >
                                      Paste from Word
                                    </span>
                                    <span
                                      id="cke_179_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_180"
                                    className="cke_button cke_button__undo cke_button_disabled "
                                    href="javascript:void('Undo')"
                                    title="Undo (Ctrl+Z)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_180_label"
                                    aria-describedby="cke_180_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(293,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(294,event);"
                                    onclick="CKEDITOR.tools.callFunction(295,this);return false;"
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
                                      id="cke_180_label"
                                      className="cke_button_label cke_button__undo_label"
                                      aria-hidden="false"
                                    >
                                      Undo
                                    </span>
                                    <span
                                      id="cke_180_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Z
                                    </span>
                                  </a>
                                  <a
                                    id="cke_181"
                                    className="cke_button cke_button__redo cke_button_disabled "
                                    href="javascript:void('Redo')"
                                    title="Redo (Ctrl+Y)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_181_label"
                                    aria-describedby="cke_181_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(296,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(297,event);"
                                    onclick="CKEDITOR.tools.callFunction(298,this);return false;"
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
                                      id="cke_181_label"
                                      className="cke_button_label cke_button__redo_label"
                                      aria-hidden="false"
                                    >
                                      Redo
                                    </span>
                                    <span
                                      id="cke_181_description"
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
                                id="cke_182"
                                className="cke_toolbar"
                                aria-labelledby="cke_182_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_182_label"
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
                                    id="cke_183"
                                    className="cke_button cke_button__scayt cke_button_off cke_button_expandable"
                                    href="javascript:void('Spell Check As You Type')"
                                    title="Spell Check As You Type"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_183_label"
                                    aria-describedby="cke_183_description"
                                    aria-haspopup="menu"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(299,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(300,event);"
                                    onclick="CKEDITOR.tools.callFunction(301,this);return false;"
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
                                      id="cke_183_label"
                                      className="cke_button_label cke_button__scayt_label"
                                      aria-hidden="false"
                                    >
                                      Spell Check As You Type
                                    </span>
                                    <span
                                      id="cke_183_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                    <span className="cke_button_arrow" />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_184"
                                className="cke_toolbar"
                                aria-labelledby="cke_184_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_184_label"
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
                                    id="cke_185"
                                    className="cke_button cke_button__link cke_button_off"
                                    href="javascript:void('Link')"
                                    title="Link (Ctrl+K)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_185_label"
                                    aria-describedby="cke_185_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(302,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(303,event);"
                                    onclick="CKEDITOR.tools.callFunction(304,this);return false;"
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
                                      id="cke_185_label"
                                      className="cke_button_label cke_button__link_label"
                                      aria-hidden="false"
                                    >
                                      Link
                                    </span>
                                    <span
                                      id="cke_185_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+K
                                    </span>
                                  </a>
                                  <a
                                    id="cke_186"
                                    className="cke_button cke_button__unlink cke_button_disabled "
                                    href="javascript:void('Unlink')"
                                    title="Unlink"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_186_label"
                                    aria-describedby="cke_186_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(305,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(306,event);"
                                    onclick="CKEDITOR.tools.callFunction(307,this);return false;"
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
                                      id="cke_186_label"
                                      className="cke_button_label cke_button__unlink_label"
                                      aria-hidden="false"
                                    >
                                      Unlink
                                    </span>
                                    <span
                                      id="cke_186_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_187"
                                    className="cke_button cke_button__anchor cke_button_off"
                                    href="javascript:void('Anchor')"
                                    title="Anchor"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_187_label"
                                    aria-describedby="cke_187_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(308,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(309,event);"
                                    onclick="CKEDITOR.tools.callFunction(310,this);return false;"
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
                                      id="cke_187_label"
                                      className="cke_button_label cke_button__anchor_label"
                                      aria-hidden="false"
                                    >
                                      Anchor
                                    </span>
                                    <span
                                      id="cke_187_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_188"
                                className="cke_toolbar"
                                aria-labelledby="cke_188_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_188_label"
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
                                    id="cke_189"
                                    className="cke_button cke_button__image cke_button_off"
                                    href="javascript:void('Image')"
                                    title="Image"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_189_label"
                                    aria-describedby="cke_189_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(311,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(312,event);"
                                    onclick="CKEDITOR.tools.callFunction(313,this);return false;"
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
                                      id="cke_189_label"
                                      className="cke_button_label cke_button__image_label"
                                      aria-hidden="false"
                                    >
                                      Image
                                    </span>
                                    <span
                                      id="cke_189_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_190"
                                    className="cke_button cke_button__table cke_button_off"
                                    href="javascript:void('Table')"
                                    title="Table"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_190_label"
                                    aria-describedby="cke_190_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(314,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(315,event);"
                                    onclick="CKEDITOR.tools.callFunction(316,this);return false;"
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
                                      id="cke_190_label"
                                      className="cke_button_label cke_button__table_label"
                                      aria-hidden="false"
                                    >
                                      Table
                                    </span>
                                    <span
                                      id="cke_190_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_191"
                                    className="cke_button cke_button__horizontalrule cke_button_off"
                                    href="javascript:void('Insert Horizontal Line')"
                                    title="Insert Horizontal Line"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_191_label"
                                    aria-describedby="cke_191_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(317,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(318,event);"
                                    onclick="CKEDITOR.tools.callFunction(319,this);return false;"
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
                                      id="cke_191_label"
                                      className="cke_button_label cke_button__horizontalrule_label"
                                      aria-hidden="false"
                                    >
                                      Insert Horizontal Line
                                    </span>
                                    <span
                                      id="cke_191_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_192"
                                    className="cke_button cke_button__specialchar cke_button_off"
                                    href="javascript:void('Insert Special Character')"
                                    title="Insert Special Character"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_192_label"
                                    aria-describedby="cke_192_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(320,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(321,event);"
                                    onclick="CKEDITOR.tools.callFunction(322,this);return false;"
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
                                      id="cke_192_label"
                                      className="cke_button_label cke_button__specialchar_label"
                                      aria-hidden="false"
                                    >
                                      Insert Special Character
                                    </span>
                                    <span
                                      id="cke_192_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_193"
                                className="cke_toolbar"
                                aria-labelledby="cke_193_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_193_label"
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
                                    id="cke_194"
                                    className="cke_button cke_button__maximize cke_button_off"
                                    href="javascript:void('Maximize')"
                                    title="Maximize"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_194_label"
                                    aria-describedby="cke_194_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(323,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(324,event);"
                                    onclick="CKEDITOR.tools.callFunction(325,this);return false;"
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
                                      id="cke_194_label"
                                      className="cke_button_label cke_button__maximize_label"
                                      aria-hidden="false"
                                    >
                                      Maximize
                                    </span>
                                    <span
                                      id="cke_194_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_195"
                                className="cke_toolbar"
                                aria-labelledby="cke_195_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_195_label"
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
                                    id="cke_196"
                                    className="cke_button cke_button__source cke_button_off"
                                    href="javascript:void('Source')"
                                    title="Source"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_196_label"
                                    aria-describedby="cke_196_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(326,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(327,event);"
                                    onclick="CKEDITOR.tools.callFunction(328,this);return false;"
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
                                      id="cke_196_label"
                                      className="cke_button_label cke_button__source_label"
                                      aria-hidden="false"
                                    >
                                      Source
                                    </span>
                                    <span
                                      id="cke_196_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span className="cke_toolbar_break" />
                              <span
                                id="cke_197"
                                className="cke_toolbar"
                                aria-labelledby="cke_197_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_197_label"
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
                                    id="cke_198"
                                    className="cke_button cke_button__bold cke_button_off"
                                    href="javascript:void('Bold')"
                                    title="Bold (Ctrl+B)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_198_label"
                                    aria-describedby="cke_198_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(329,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(330,event);"
                                    onclick="CKEDITOR.tools.callFunction(331,this);return false;"
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
                                      id="cke_198_label"
                                      className="cke_button_label cke_button__bold_label"
                                      aria-hidden="false"
                                    >
                                      Bold
                                    </span>
                                    <span
                                      id="cke_198_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+B
                                    </span>
                                  </a>
                                  <a
                                    id="cke_199"
                                    className="cke_button cke_button__italic cke_button_off"
                                    href="javascript:void('Italic')"
                                    title="Italic (Ctrl+I)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_199_label"
                                    aria-describedby="cke_199_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(332,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(333,event);"
                                    onclick="CKEDITOR.tools.callFunction(334,this);return false;"
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
                                      id="cke_199_label"
                                      className="cke_button_label cke_button__italic_label"
                                      aria-hidden="false"
                                    >
                                      Italic
                                    </span>
                                    <span
                                      id="cke_199_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+I
                                    </span>
                                  </a>
                                  <a
                                    id="cke_200"
                                    className="cke_button cke_button__strike cke_button_off"
                                    href="javascript:void('Strikethrough')"
                                    title="Strikethrough"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_200_label"
                                    aria-describedby="cke_200_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(335,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(336,event);"
                                    onclick="CKEDITOR.tools.callFunction(337,this);return false;"
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
                                      id="cke_200_label"
                                      className="cke_button_label cke_button__strike_label"
                                      aria-hidden="false"
                                    >
                                      Strikethrough
                                    </span>
                                    <span
                                      id="cke_200_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_201"
                                    className="cke_button cke_button__removeformat cke_button_off"
                                    href="javascript:void('Remove Format')"
                                    title="Remove Format"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_201_label"
                                    aria-describedby="cke_201_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(338,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(339,event);"
                                    onclick="CKEDITOR.tools.callFunction(340,this);return false;"
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
                                      id="cke_201_label"
                                      className="cke_button_label cke_button__removeformat_label"
                                      aria-hidden="false"
                                    >
                                      Remove Format
                                    </span>
                                    <span
                                      id="cke_201_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_202"
                                className="cke_toolbar"
                                aria-labelledby="cke_202_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_202_label"
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
                                    id="cke_203"
                                    className="cke_button cke_button__numberedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Numbered List')"
                                    title="Insert/Remove Numbered List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_203_label"
                                    aria-describedby="cke_203_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(341,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(342,event);"
                                    onclick="CKEDITOR.tools.callFunction(343,this);return false;"
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
                                      id="cke_203_label"
                                      className="cke_button_label cke_button__numberedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Numbered List
                                    </span>
                                    <span
                                      id="cke_203_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_204"
                                    className="cke_button cke_button__bulletedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Bulleted List')"
                                    title="Insert/Remove Bulleted List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_204_label"
                                    aria-describedby="cke_204_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(344,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(345,event);"
                                    onclick="CKEDITOR.tools.callFunction(346,this);return false;"
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
                                      id="cke_204_label"
                                      className="cke_button_label cke_button__bulletedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Bulleted List
                                    </span>
                                    <span
                                      id="cke_204_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_205"
                                    className="cke_button cke_button__outdent cke_button_disabled "
                                    href="javascript:void('Decrease Indent')"
                                    title="Decrease Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_205_label"
                                    aria-describedby="cke_205_description"
                                    aria-haspopup="false"
                                    aria-disabled="true"
                                    onkeydown="return CKEDITOR.tools.callFunction(347,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(348,event);"
                                    onclick="CKEDITOR.tools.callFunction(349,this);return false;"
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
                                      id="cke_205_label"
                                      className="cke_button_label cke_button__outdent_label"
                                      aria-hidden="false"
                                    >
                                      Decrease Indent
                                    </span>
                                    <span
                                      id="cke_205_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_206"
                                    className="cke_button cke_button__indent cke_button_off"
                                    href="javascript:void('Increase Indent')"
                                    title="Increase Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_206_label"
                                    aria-describedby="cke_206_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(350,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(351,event);"
                                    onclick="CKEDITOR.tools.callFunction(352,this);return false;"
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
                                      id="cke_206_label"
                                      className="cke_button_label cke_button__indent_label"
                                      aria-hidden="false"
                                    >
                                      Increase Indent
                                    </span>
                                    <span
                                      id="cke_206_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_207"
                                    className="cke_button cke_button__blockquote cke_button_off"
                                    href="javascript:void('Block Quote')"
                                    title="Block Quote"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_207_label"
                                    aria-describedby="cke_207_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(353,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(354,event);"
                                    onclick="CKEDITOR.tools.callFunction(355,this);return false;"
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
                                      id="cke_207_label"
                                      className="cke_button_label cke_button__blockquote_label"
                                      aria-hidden="false"
                                    >
                                      Block Quote
                                    </span>
                                    <span
                                      id="cke_207_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_208"
                                className="cke_toolbar"
                                aria-labelledby="cke_208_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_208_label"
                                  className="cke_voice_label"
                                >
                                  Styles
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  id="cke_172"
                                  className="cke_combo cke_combo__styles cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_172_label"
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
                                    aria-labelledby="cke_172_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(357,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(358,event);"
                                    onclick="CKEDITOR.tools.callFunction(356,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_172_text"
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
                                  id="cke_173"
                                  className="cke_combo cke_combo__format cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_173_label"
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
                                    aria-labelledby="cke_173_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(360,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(361,event);"
                                    onclick="CKEDITOR.tools.callFunction(359,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_173_text"
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
                                id="cke_209"
                                className="cke_toolbar cke_toolbar_last"
                                aria-labelledby="cke_209_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_209_label"
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
                                    id="cke_210"
                                    className="cke_button cke_button__about cke_button_off"
                                    href="javascript:void('About CKEditor 4')"
                                    title="About CKEditor 4"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_210_label"
                                    aria-describedby="cke_210_description"
                                    aria-haspopup="false"
                                    aria-disabled="false"
                                    onkeydown="return CKEDITOR.tools.callFunction(362,event);"
                                    onfocus="return CKEDITOR.tools.callFunction(363,event);"
                                    onclick="CKEDITOR.tools.callFunction(364,this);return false;"
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
                                      id="cke_210_label"
                                      className="cke_button_label cke_button__about_label"
                                      aria-hidden="false"
                                    >
                                      About CKEditor 4
                                    </span>
                                    <span
                                      id="cke_210_description"
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
                            id="cke_4_contents"
                            className="cke_contents cke_reset"
                            role="presentation"
                            style={{ height: "200px" }}
                          >
                            <span id="cke_214" className="cke_voice_label">
                              Press ALT 0 for help
                            </span>
                            <iframe
                              src
                              frameBorder={0}
                              className="cke_wysiwyg_frame cke_reset"
                              title="Rich Text Editor, description[]"
                              aria-describedby="cke_214"
                              tabIndex={0}
                              allowTransparency="true"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                          <span
                            id="cke_4_bottom"
                            className="cke_bottom cke_reset_all"
                            role="presentation"
                            style={{ userSelect: "none" }}
                          >
                            <span
                              id="cke_4_resizer"
                              className="cke_resizer cke_resizer_vertical cke_resizer_ltr"
                              title="Resize"
                              onmousedown="CKEDITOR.tools.callFunction(277, event)"
                            >
                              ◢
                            </span>
                            <span
                              id="cke_4_path_label"
                              className="cke_voice_label"
                            >
                              Elements path
                            </span>
                            <span
                              id="cke_4_path"
                              className="cke_path"
                              role="group"
                              aria-labelledby="cke_4_path_label"
                            >
                              <span className="cke_path_empty">&nbsp;</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                          className="js-example-basic-multiple form-control w-100"
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
                          {!!state.allCategories &&
                            !!state.allCategories.length &&
                            state.allCategories?.map((item) => (
                              <option key={item._id} value={item._id}>
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
                          className="js-example-basic-multiple form-control w-100"
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
                            !!state.allCategories.length &&
                            state.allCategories
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
                          className="js-example-basic-multiple form-control w-100"
                          // name="sub_sub_category_id"
                          name="subsubcategory_id"
                          id="sub-sub-category-select"
                          onChange={handleInputChange}
                          value={productDetails.subsubcategory_id}
                        >
                          <option value="" selected>
                            ---Select---
                          </option>
                          {!!productDetails.category_id &&
                            !!productDetails.subcategory_id &&
                            !!state.allCategories.length &&
                            state.allCategories
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
                  {/* <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="name">Product Quantity</label>
                        <input
                          type="number"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          placeholder="300"
                          name="p_quantity"
                          className="form-control "
                          onChange={handleInputChange}
                          value={productDetails.p_quantity}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="name">Selling Price:</label>
                        <input
                          type="number"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          placeholder="1500"
                          name="selling_price"
                          className="form-control"
                          onChange={handleInputChange}
                          value={productDetails.selling_price}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="name">MRP:</label>
                        <input
                          type="number"
                          // min={0}
                          // defaultValue={0}
                          // step="0.01"
                          placeholder="3000"
                          name="display_price"
                          className="form-control"
                          onChange={handleInputChange}
                          value={productDetails.display_price}
                        />
                      </div>
                    </div>
                  </div> */}
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
                          required
                          data-select2-id={1}
                          tabIndex={-1}
                          aria-hidden="true"
                          onChange={handleInputChange}
                        >
                          <option value selected disabled data-select2-id={3}>
                            ---Select---
                          </option>
                          {!!state.allBrands &&
                            !!state.allBrands.length &&
                            state.allBrands.map((item) => (
                              <option key={item._id} value={item._id}>
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
                                />
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
                        <label>Upload product images</label>
                        <small style={{ color: "red" }}>* ( Ratio 1:1 )</small>
                        <input
                          className="mt-2"
                          // className="form-control spartan_image_input"
                          accept="image/*"
                          // data-spartanindexinput={0}
                          style={{ display: "block" }}
                          // name="images[]"
                          placeholder="Choose Product Images"
                          name="pphoto"
                          type="file"
                          multiple
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* <div
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
                                />
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
                                  multiple
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> */}
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
              {!!productDetails && !!productDetails.imageURLObj.length ? (
                <div className="card mt-2 rest-part">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        {!!productDetails && !!productDetails.imageURLObj.length
                          ? productDetails.imageURLObj.map((item, index) => (
                            // <div
                            //   style={{
                            //     width: "64px",
                            //     height: "64px",
                            //     border: "solid",
                            //   }}
                            // >
                            <img
                              src={item}
                              // style={{
                              //   width: "100%",
                              //   height: "100%",
                              //   objectFit: "contain",

                              //   width: "90px",
                              //   // margin: "0 auto",
                              //   // verticalAlign: "middle",
                              // }}

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
                              key={index}
                            />
                            // </div>
                          ))
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="card card-footer">
                <div className="row">
                  <div className="col-md-12" style={{ paddingTop: "20px" }}>
                    <button
                      type="button"
                      // onclick="check()"
                      className="btn btn-primary"
                      onClick={handleAddProduct}
                      disabled={isSubmitDisabled}
                    >
                      Submit
                    </button>
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

export default SellerProductAddNew;
