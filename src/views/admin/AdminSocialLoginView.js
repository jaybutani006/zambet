import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminSocialLoginView() {
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
              Social login
            </li>
          </ol>
        </nav>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <div className="flex-between">
                  <h4 className="text-center">Google</h4>
                  <div
                    className="btn btn-dark p-2"
                    data-toggle="modal"
                    data-target="#google-modal"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="tio-info-outined" /> Credentials SetUp
                  </div>
                </div>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2 mt-5">
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Callback URI</label>
                    <span
                      className="btn btn-secondary btn-sm m-2"
                      onclick="copyToClipboard('#id_google')"
                    >
                      <i className="tio-copy" /> Copy URI
                    </span>
                    <br />
                    <span
                      className="form-control"
                      id="id_google"
                      style={{ height: "unset" }}
                    >
                    </span>
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Store Client id{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="client_id"
                      defaultValue="238482712182-6rhfbqqnksblpga846sh3c3ohqh664bl.apps.googleusercontent.com"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Store Client secret
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="client_secret"
                      defaultValue="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"
                    />
                  </div>
                  <button type="button" className="btn btn-primary mb-2">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <div className="flex-between">
                  <h4 className="text-center">Facebook</h4>
                  <div
                    className="btn btn-dark p-2"
                    data-toggle="modal"
                    data-target="#facebook-modal"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="tio-info-outined" /> Credentials SetUp
                  </div>
                </div>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2 mt-5">
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Callback URI</label>
                    <span
                      className="btn btn-secondary btn-sm m-2"
                      onclick="copyToClipboard('#id_facebook')"
                    >
                      <i className="tio-copy" /> Copy URI
                    </span>
                    <br />
                    <span
                      className="form-control"
                      id="id_facebook"
                      style={{ height: "unset" }}
                    >
                    </span>
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Store Client id{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="client_id"
                      defaultValue={1334750483597021}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Store Client secret
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="client_secret"
                      defaultValue="1dc31b75970443cbc41ac70e75f772c4"
                    />
                  </div>
                  <button type="button" className="btn btn-primary mb-2">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="google-modal"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ textAlign: "left" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Google API Set up Instructions
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
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                    >
                      Here
                    </a>
                    )
                  </li>
                  <li>
                    Click <b>Create credentials</b> &gt; <b>OAuth client ID</b>.
                  </li>
                  <li>
                    Select the <b>Web application</b> Type.
                  </li>
                  <li>Name your OAuth 2.0 client</li>
                  <li>
                    Click <b>ADD URI</b> From <b>Authorized redirect URIs</b> ,
                    Provide the <code>Callback URI</code> From below and click{" "}
                    <b>Create</b>
                  </li>
                  <li>
                    Copy <b>Client ID</b> And <b>Client Secret</b>, Paste in the
                    input filed below and <b>Save</b>.
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
        <div
          className="modal fade"
          id="facebook-modal"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ textAlign: "left" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Facebook API Set up Instructions
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
                <b />
                <ol>
                  <li>
                    Go to the facebook developer page (
                    <a
                      href="https://developers.facebook.com/apps/"
                      target="_blank"
                    >
                      Click Here
                    </a>
                    )
                  </li>
                  <li>
                    Go to <b>Get Started</b> From Navbar
                  </li>
                  <li>
                    From Register tab press <b>Continue</b>{" "}
                    <small>(If needed)</small>
                  </li>
                  <li>
                    Provide Primary Email and press <b>Confirm Email</b>{" "}
                    <small>(If needed)</small>
                  </li>
                  <li>
                    In about section select <b>Other</b> And press{" "}
                    <b>Complete Registration</b>
                  </li>
                  <li>
                    <b>Create App</b> &gt; Select an app type and press{" "}
                    <b>Next</b>
                  </li>
                  <li>
                    Complete the add details form and press <b>Create App</b>
                  </li>
                  <br />
                  <li>
                    From <b>Facebook Login</b> Press <b>Set Up</b>
                  </li>
                  <li>
                    Select <b>Web</b>
                  </li>
                  <li>
                    Provide <b>Site URL</b>{" "}
                    <small>
                      (Base URL of the site ex: https://example.com)
                    </small>{" "}
                    &gt; <b>Save</b>
                  </li>
                  <br />
                  <li>
                    Now go to <b>Setting</b> From <b>Facebook Login</b> (Left
                    sidebar)
                  </li>
                  <li>
                    Make sure to check <b>Client OAuth Login</b>{" "}
                    <small>(Must on)</small>
                  </li>
                  <li>
                    Provide <code>Valid OAuth Redirect URIs</code> From below
                    and click <b>Save Changes</b>
                  </li>
                  <li>
                    Now go to <b>Setting</b> (From left sidebar) &gt;{" "}
                    <b>Basic</b>
                  </li>
                  <li>
                    Fill the form and press <b>Save Changes</b>
                  </li>
                  <li>
                    Now copy <b>Client ID</b> &amp; <b>Client Secret</b>, Paste
                    in the input filed below and <b>Save</b>.
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
        <div
          className="modal fade"
          id="twitter-modal"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ textAlign: "left" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Twitter API Set up Instructions
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
                <b />
                Instruction will be available very soon
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
    </main>
  );
}

export default AdminSocialLoginView;
