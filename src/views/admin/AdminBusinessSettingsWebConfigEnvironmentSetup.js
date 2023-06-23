import React from "react";

function AdminBusinessSettingsWebConfigEnvironmentSetup() {
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
              <h1 className="page-header-title">Environment Setup</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="alert alert-danger mx-2" role="alert">
              This page is having sensitive data.Make sure before changing.
            </div>
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <form method="post">
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                />{" "}
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        APP NAME
                      </label>
                      <input
                        type="text"
                        defaultValue="6valley-123"
                        name="app_name"
                        className="form-control"
                        placeholder="Ex : EFood"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        APP DEBUG
                      </label>
                      <select
                        name="app_debug"
                        className="form-control js-select2-custom select2-hidden-accessible"
                        data-select2-id={1}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value="true" data-select2-id={3}>
                          True
                        </option>
                        <option value="false" selected data-select2-id={4}>
                          False
                        </option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={2}
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
                            aria-labelledby="select2-app_debug-os-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-app_debug-os-container"
                              role="textbox"
                              aria-readonly="true"
                              title="
False
"
                            >
                              <span>False</span>
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
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        APP MODE
                      </label>
                      <select
                        name="app_mode"
                        className="form-control js-select2-custom select2-hidden-accessible"
                        data-select2-id={5}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value="live" data-select2-id={7}>
                          Live
                        </option>
                        <option value="dev" data-select2-id={8}>
                          Dev
                        </option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={6}
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
                            aria-labelledby="select2-app_mode-bw-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-app_mode-bw-container"
                              role="textbox"
                              aria-readonly="true"
                              title="
Live
"
                            >
                              <span>Live</span>
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
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        APP URL
                      </label>
                      <input
                        type="text"
                        defaultValue="http://localhost"
                        name="app_url"
                        className="form-control"
                        placeholder="Ex : http://localhost"
                        required
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        DB CONNECTION
                      </label>
                      <input
                        type="text"
                        defaultValue="---"
                        name="db_connection"
                        className="form-control"
                        placeholder="Ex : mysql"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        DB HOST
                      </label>
                      <input
                        type="text"
                        defaultValue="---"
                        name="db_host"
                        className="form-control"
                        placeholder="Ex : http://localhost/"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        DB PORT
                      </label>
                      <input
                        type="text"
                        defaultValue="---"
                        name="db_port"
                        className="form-control"
                        placeholder="Ex : 3306"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        DB DATABASE
                      </label>
                      <input
                        type="text"
                        defaultValue="---"
                        name="db_database"
                        className="form-control"
                        placeholder="Ex : demo_db"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        DB USERNAME
                      </label>
                      <input
                        type="text"
                        defaultValue="---"
                        name="db_username"
                        className="form-control"
                        placeholder="Ex : root"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        DB PASSWORD
                      </label>
                      <input
                        type="text"
                        defaultValue="---"
                        name="db_password"
                        className="form-control"
                        placeholder="Ex : password"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        BUYER USERNAME
                      </label>
                      <input
                        type="text"
                        defaultValue="6valley-admin-demo-upuG"
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group" id="purchase_code_div">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        PURCHASE CODE
                      </label>
                      <div className="input-icons">
                        <input
                          type="password"
                          className="form-control input-field"
                          id="purchase_code"
                          style={{ display: "inline" }}
                          disabled
                        />
                        <i className="fa fa-eye icon align-middle" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  type="button"
                  onclick="call_demo()"
                  className="btn btn-primary mb-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsWebConfigEnvironmentSetup;
