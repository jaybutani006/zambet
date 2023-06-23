import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminBusinessSettingsPrivacyPolicy() {
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
              Privacy Policy
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>Privacy Policy</h2>
                  </div>
                </div>
              </div>
              <form>
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                />{" "}
                <div className="card-body">
                  <div className="form-group">
                    <div className="col-md-12">
                      <label htmlFor="editor">Privacy Policy</label>
                      <textarea
                        className="form-control"
                        id="editor"
                        name="value"
                        style={{ visibility: "hidden", display: "none" }}
                        defaultValue={
                          "<p>Your Privacy Policy will be here.&nbsp;</p>"
                        }
                      />
                      <div
                        id="cke_editor"
                        className="cke_1 cke cke_reset cke_chrome cke_editor_editor cke_ltr cke_browser_webkit"
                        dir="ltr"
                        lang="en"
                        role="application"
                        aria-labelledby="cke_editor_arialbl"
                      >
                        <span
                          id="cke_editor_arialbl"
                          className="cke_voice_label"
                        >
                          Rich Text Editor, editor
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
                            <span id="cke_9" className="cke_voice_label">
                              Editor toolbars
                            </span>
                            <span
                              id="cke_1_toolbox"
                              className="cke_toolbox"
                              role="group"
                              aria-labelledby="cke_9"
                              onmousedown="return false;"
                            >
                              <span
                                id="cke_12"
                                className="cke_toolbar"
                                aria-labelledby="cke_12_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_12_label"
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
                                    id="cke_13"
                                    className="cke_button cke_button__cut cke_button_disabled "
                                    href="javascript:void('Cut')"
                                    title="Cut (Ctrl+X)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_13_label"
                                    aria-describedby="cke_13_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -312px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_13_label"
                                      className="cke_button_label cke_button__cut_label"
                                      aria-hidden="false"
                                    >
                                      Cut
                                    </span>
                                    <span
                                      id="cke_13_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+X
                                    </span>
                                  </a>
                                  <a
                                    id="cke_14"
                                    className="cke_button cke_button__copy cke_button_disabled "
                                    href="javascript:void('Copy')"
                                    title="Copy (Ctrl+C)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_14_label"
                                    aria-describedby="cke_14_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -264px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_14_label"
                                      className="cke_button_label cke_button__copy_label"
                                      aria-hidden="false"
                                    >
                                      Copy
                                    </span>
                                    <span
                                      id="cke_14_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+C
                                    </span>
                                  </a>
                                  <a
                                    id="cke_15"
                                    className="cke_button cke_button__paste cke_button_off"
                                    href="javascript:void('Paste')"
                                    title="Paste (Ctrl+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_15_label"
                                    aria-describedby="cke_15_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -360px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_15_label"
                                      className="cke_button_label cke_button__paste_label"
                                      aria-hidden="false"
                                    >
                                      Paste
                                    </span>
                                    <span
                                      id="cke_15_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_16"
                                    className="cke_button cke_button__pastetext cke_button_off"
                                    href="javascript:void('Paste as plain text')"
                                    title="Paste as plain text (Ctrl+Shift+V)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_16_label"
                                    aria-describedby="cke_16_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1872px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_16_label"
                                      className="cke_button_label cke_button__pastetext_label"
                                      aria-hidden="false"
                                    >
                                      Paste as plain text
                                    </span>
                                    <span
                                      id="cke_16_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Shift+V
                                    </span>
                                  </a>
                                  <a
                                    id="cke_17"
                                    className="cke_button cke_button__pastefromword cke_button_off"
                                    href="javascript:void('Paste from Word')"
                                    title="Paste from Word"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_17_label"
                                    aria-describedby="cke_17_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1824px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_17_label"
                                      className="cke_button_label cke_button__pastefromword_label"
                                      aria-hidden="false"
                                    >
                                      Paste from Word
                                    </span>
                                    <span
                                      id="cke_17_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_18"
                                    className="cke_button cke_button__undo cke_button_disabled "
                                    href="javascript:void('Undo')"
                                    title="Undo (Ctrl+Z)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_18_label"
                                    aria-describedby="cke_18_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -2448px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_18_label"
                                      className="cke_button_label cke_button__undo_label"
                                      aria-hidden="false"
                                    >
                                      Undo
                                    </span>
                                    <span
                                      id="cke_18_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+Z
                                    </span>
                                  </a>
                                  <a
                                    id="cke_19"
                                    className="cke_button cke_button__redo cke_button_disabled "
                                    href="javascript:void('Redo')"
                                    title="Redo (Ctrl+Y)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_19_label"
                                    aria-describedby="cke_19_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -2400px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_19_label"
                                      className="cke_button_label cke_button__redo_label"
                                      aria-hidden="false"
                                    >
                                      Redo
                                    </span>
                                    <span
                                      id="cke_19_description"
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
                                id="cke_20"
                                className="cke_toolbar"
                                aria-labelledby="cke_20_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_20_label"
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
                                    id="cke_21"
                                    className="cke_button cke_button__scayt cke_button_off cke_button_expandable"
                                    href="javascript:void('Spell Check As You Type')"
                                    title="Spell Check As You Type"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_21_label"
                                    aria-describedby="cke_21_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -2040px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_21_label"
                                      className="cke_button_label cke_button__scayt_label"
                                      aria-hidden="false"
                                    >
                                      Spell Check As You Type
                                    </span>
                                    <span
                                      id="cke_21_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                    <span className="cke_button_arrow" />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_22"
                                className="cke_toolbar"
                                aria-labelledby="cke_22_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_22_label"
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
                                    id="cke_23"
                                    className="cke_button cke_button__link cke_button_off"
                                    href="javascript:void('Link')"
                                    title="Link (Ctrl+K)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_23_label"
                                    aria-describedby="cke_23_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1512px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_23_label"
                                      className="cke_button_label cke_button__link_label"
                                      aria-hidden="false"
                                    >
                                      Link
                                    </span>
                                    <span
                                      id="cke_23_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+K
                                    </span>
                                  </a>
                                  <a
                                    id="cke_24"
                                    className="cke_button cke_button__unlink cke_button_disabled "
                                    href="javascript:void('Unlink')"
                                    title="Unlink"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_24_label"
                                    aria-describedby="cke_24_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1536px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_24_label"
                                      className="cke_button_label cke_button__unlink_label"
                                      aria-hidden="false"
                                    >
                                      Unlink
                                    </span>
                                    <span
                                      id="cke_24_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_25"
                                    className="cke_button cke_button__anchor cke_button_off"
                                    href="javascript:void('Anchor')"
                                    title="Anchor"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_25_label"
                                    aria-describedby="cke_25_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1488px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_25_label"
                                      className="cke_button_label cke_button__anchor_label"
                                      aria-hidden="false"
                                    >
                                      Anchor
                                    </span>
                                    <span
                                      id="cke_25_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_26"
                                className="cke_toolbar"
                                aria-labelledby="cke_26_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_26_label"
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
                                    id="cke_27"
                                    className="cke_button cke_button__image cke_button_off"
                                    href="javascript:void('Image')"
                                    title="Image"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_27_label"
                                    aria-describedby="cke_27_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1224px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_27_label"
                                      className="cke_button_label cke_button__image_label"
                                      aria-hidden="false"
                                    >
                                      Image
                                    </span>
                                    <span
                                      id="cke_27_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_28"
                                    className="cke_button cke_button__table cke_button_off"
                                    href="javascript:void('Table')"
                                    title="Table"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_28_label"
                                    aria-describedby="cke_28_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -2280px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_28_label"
                                      className="cke_button_label cke_button__table_label"
                                      aria-hidden="false"
                                    >
                                      Table
                                    </span>
                                    <span
                                      id="cke_28_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_29"
                                    className="cke_button cke_button__horizontalrule cke_button_off"
                                    href="javascript:void('Insert Horizontal Line')"
                                    title="Insert Horizontal Line"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_29_label"
                                    aria-describedby="cke_29_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1176px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_29_label"
                                      className="cke_button_label cke_button__horizontalrule_label"
                                      aria-hidden="false"
                                    >
                                      Insert Horizontal Line
                                    </span>
                                    <span
                                      id="cke_29_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_30"
                                    className="cke_button cke_button__specialchar cke_button_off"
                                    href="javascript:void('Insert Special Character')"
                                    title="Insert Special Character"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_30_label"
                                    aria-describedby="cke_30_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -2256px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_30_label"
                                      className="cke_button_label cke_button__specialchar_label"
                                      aria-hidden="false"
                                    >
                                      Insert Special Character
                                    </span>
                                    <span
                                      id="cke_30_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_31"
                                className="cke_toolbar"
                                aria-labelledby="cke_31_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_31_label"
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
                                    id="cke_32"
                                    className="cke_button cke_button__maximize cke_button_off"
                                    href="javascript:void('Maximize')"
                                    title="Maximize"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_32_label"
                                    aria-describedby="cke_32_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1680px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_32_label"
                                      className="cke_button_label cke_button__maximize_label"
                                      aria-hidden="false"
                                    >
                                      Maximize
                                    </span>
                                    <span
                                      id="cke_32_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_33"
                                className="cke_toolbar"
                                aria-labelledby="cke_33_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_33_label"
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
                                    id="cke_34"
                                    className="cke_button cke_button__source cke_button_off"
                                    href="javascript:void('Source')"
                                    title="Source"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_34_label"
                                    aria-describedby="cke_34_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -2184px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_34_label"
                                      className="cke_button_label cke_button__source_label"
                                      aria-hidden="false"
                                    >
                                      Source
                                    </span>
                                    <span
                                      id="cke_34_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span className="cke_toolbar_break" />
                              <span
                                id="cke_35"
                                className="cke_toolbar"
                                aria-labelledby="cke_35_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_35_label"
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
                                    id="cke_36"
                                    className="cke_button cke_button__bold cke_button_off"
                                    href="javascript:void('Bold')"
                                    title="Bold (Ctrl+B)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_36_label"
                                    aria-describedby="cke_36_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -24px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_36_label"
                                      className="cke_button_label cke_button__bold_label"
                                      aria-hidden="false"
                                    >
                                      Bold
                                    </span>
                                    <span
                                      id="cke_36_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+B
                                    </span>
                                  </a>
                                  <a
                                    id="cke_37"
                                    className="cke_button cke_button__italic cke_button_off"
                                    href="javascript:void('Italic')"
                                    title="Italic (Ctrl+I)"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_37_label"
                                    aria-describedby="cke_37_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -48px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_37_label"
                                      className="cke_button_label cke_button__italic_label"
                                      aria-hidden="false"
                                    >
                                      Italic
                                    </span>
                                    <span
                                      id="cke_37_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    >
                                      &nbsp;Keyboard shortcut Ctrl+I
                                    </span>
                                  </a>
                                  <a
                                    id="cke_38"
                                    className="cke_button cke_button__strike cke_button_off"
                                    href="javascript:void('Strikethrough')"
                                    title="Strikethrough"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_38_label"
                                    aria-describedby="cke_38_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -72px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_38_label"
                                      className="cke_button_label cke_button__strike_label"
                                      aria-hidden="false"
                                    >
                                      Strikethrough
                                    </span>
                                    <span
                                      id="cke_38_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_39"
                                    className="cke_button cke_button__removeformat cke_button_off"
                                    href="javascript:void('Remove Format')"
                                    title="Remove Format"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_39_label"
                                    aria-describedby="cke_39_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1992px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_39_label"
                                      className="cke_button_label cke_button__removeformat_label"
                                      aria-hidden="false"
                                    >
                                      Remove Format
                                    </span>
                                    <span
                                      id="cke_39_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_40"
                                className="cke_toolbar"
                                aria-labelledby="cke_40_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_40_label"
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
                                    id="cke_41"
                                    className="cke_button cke_button__numberedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Numbered List')"
                                    title="Insert/Remove Numbered List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_41_label"
                                    aria-describedby="cke_41_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1632px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_41_label"
                                      className="cke_button_label cke_button__numberedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Numbered List
                                    </span>
                                    <span
                                      id="cke_41_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_42"
                                    className="cke_button cke_button__bulletedlist cke_button_off"
                                    href="javascript:void('Insert/Remove Bulleted List')"
                                    title="Insert/Remove Bulleted List"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_42_label"
                                    aria-describedby="cke_42_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1584px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_42_label"
                                      className="cke_button_label cke_button__bulletedlist_label"
                                      aria-hidden="false"
                                    >
                                      Insert/Remove Bulleted List
                                    </span>
                                    <span
                                      id="cke_42_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_43"
                                    className="cke_button cke_button__outdent cke_button_disabled "
                                    href="javascript:void('Decrease Indent')"
                                    title="Decrease Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_43_label"
                                    aria-describedby="cke_43_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1320px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_43_label"
                                      className="cke_button_label cke_button__outdent_label"
                                      aria-hidden="false"
                                    >
                                      Decrease Indent
                                    </span>
                                    <span
                                      id="cke_43_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <a
                                    id="cke_44"
                                    className="cke_button cke_button__indent cke_button_off"
                                    href="javascript:void('Increase Indent')"
                                    title="Increase Indent"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_44_label"
                                    aria-describedby="cke_44_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -1272px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_44_label"
                                      className="cke_button_label cke_button__indent_label"
                                      aria-hidden="false"
                                    >
                                      Increase Indent
                                    </span>
                                    <span
                                      id="cke_44_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                  <span
                                    className="cke_toolbar_separator"
                                    role="separator"
                                  />
                                  <a
                                    id="cke_45"
                                    className="cke_button cke_button__blockquote cke_button_off"
                                    href="javascript:void('Block Quote')"
                                    title="Block Quote"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_45_label"
                                    aria-describedby="cke_45_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 -216px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_45_label"
                                      className="cke_button_label cke_button__blockquote_label"
                                      aria-hidden="false"
                                    >
                                      Block Quote
                                    </span>
                                    <span
                                      id="cke_45_description"
                                      className="cke_button_label"
                                      aria-hidden="false"
                                    />
                                  </a>
                                </span>
                                <span className="cke_toolbar_end" />
                              </span>
                              <span
                                id="cke_46"
                                className="cke_toolbar"
                                aria-labelledby="cke_46_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_46_label"
                                  className="cke_voice_label"
                                >
                                  Styles
                                </span>
                                <span className="cke_toolbar_start" />
                                <span
                                  id="cke_10"
                                  className="cke_combo cke_combo__styles cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_10_label"
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
                                    aria-labelledby="cke_10_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(81,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(82,event);"
                                    onclick="CKEDITOR.tools.callFunction(80,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_10_text"
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
                                  id="cke_11"
                                  className="cke_combo cke_combo__format cke_combo_off"
                                  role="presentation"
                                >
                                  <span
                                    id="cke_11_label"
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
                                    aria-labelledby="cke_11_label"
                                    aria-haspopup="listbox"
                                    onkeydown="return CKEDITOR.tools.callFunction(84,event,this);"
                                    onfocus="return CKEDITOR.tools.callFunction(85,event);"
                                    onclick="CKEDITOR.tools.callFunction(83,this);return false;"
                                    aria-expanded="false"
                                  >
                                    <span
                                      id="cke_11_text"
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
                                id="cke_47"
                                className="cke_toolbar cke_toolbar_last"
                                aria-labelledby="cke_47_label"
                                role="toolbar"
                              >
                                <span
                                  id="cke_47_label"
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
                                    id="cke_48"
                                    className="cke_button cke_button__about cke_button_off"
                                    href="javascript:void('About CKEditor 4')"
                                    title="About CKEditor 4"
                                    tabIndex={-1}
                                    hidefocus="true"
                                    role="button"
                                    aria-labelledby="cke_48_label"
                                    aria-describedby="cke_48_description"
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
                                          'url("https://6valley.6amtech.com/vendor/ckeditor/ckeditor/plugins/icons.png?t=M2GA")',
                                        backgroundPosition: "0 0px",
                                        backgroundSize: "auto",
                                      }}
                                    >
                                      &nbsp;
                                    </span>
                                    <span
                                      id="cke_48_label"
                                      className="cke_button_label cke_button__about_label"
                                      aria-hidden="false"
                                    >
                                      About CKEditor 4
                                    </span>
                                    <span
                                      id="cke_48_description"
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
                            <span id="cke_52" className="cke_voice_label">
                              Press ALT 0 for help
                            </span>
                            <iframe
                              src
                              frameBorder={0}
                              className="cke_wysiwyg_frame cke_reset"
                              style={{ width: "100%", height: "100%" }}
                              title="Rich Text Editor, editor"
                              aria-describedby="cke_52"
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
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <input
                        className="form-control btn-primary"
                        type="submit"
                        name="btn"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsPrivacyPolicy;
