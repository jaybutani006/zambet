import React from "react";

function AdminBusinessSettingsCaptcha() {
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
            <div className="col-sm mb-sm-0">
              <h1 className="page-header-title">ReCaptcha Credentials Setup</h1>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <div className="flex-between">
                  <h3>ReCaptcha</h3>
                  <div
                    className="btn-sm btn-dark p-2"
                    data-toggle="modal"
                    data-target="#recaptcha-modal"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="tio-info-outined" /> Credentials SetUp
                  </div>
                </div>
                <div className="mt-4">
                  <form action="javascript:" method="post">
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                    />
                    <div className="form-group mb-2 mt-2">
                      <input
                        type="radio"
                        name="status"
                        defaultValue={1}
                        defaultChecked
                      />
                      <label style={{ paddingLeft: "10px" }}>Active</label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <input type="radio" name="status" defaultValue={0} />
                      <label style={{ paddingLeft: "10px" }}>Inactive </label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <label
                        className="text-capitalize"
                        style={{ paddingLeft: "10px" }}
                      >
                        Site Key
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="site_key"
                        defaultValue
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label
                        className="text-capitalize"
                        style={{ paddingLeft: "10px" }}
                      >
                        Secret Key
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="secret_key"
                        defaultValue
                      />
                    </div>
                    <button
                      type="button"
                      onclick="call_demo()"
                      className="btn btn-primary mb-2"
                    >
                      Save
                    </button>
                  </form>
                  <div
                    className="modal fade"
                    id="recaptcha-modal"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div
                        className="modal-content"
                        style={{ textAlign: "left" }}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">
                            ReCaptcha credential Set up Instructions
                          </h5>
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
                          <ol>
                            <li>
                              Go to the Credentials page (Click{" "}
                              <a
                                href="https://www.google.com/recaptcha/admin/create"
                                target="_blank"
                              >
                                Here
                              </a>
                              )
                            </li>
                            <li>
                              Add a<b>Label</b> (Ex: Test Label)
                            </li>
                            <li>
                              Select reCAPTCHA v2 as
                              <b>ReCAPTCHA Type</b>
                              (Sub type: I m not a robot Checkbox )
                            </li>
                            <li>
                              Add
                              <b>Domain</b>
                              (For ex: demo.com)
                            </li>
                            <li>
                              Check in
                              <b>Accept the reCAPTCHA Terms of Service</b>
                            </li>
                            <li>
                              Press
                              <b>Submit</b>
                            </li>
                            <li>
                              Copy <b>Site Key</b> And <b>Secret Key</b>, Paste
                              in the input filed below and
                              <b>Save</b>.
                            </li>
                          </ol>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
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

export default AdminBusinessSettingsCaptcha;
