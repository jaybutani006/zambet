import React from "react";

function AdminBusinessSettingsSMSModule() {
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
              <h1 className="page-header-title">Sms Gateway Setup</h1>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <h5 className="text-center">Releans sms</h5>
                <span className="badge badge-soft-info mb-3">
                  NB : #OTP# will be replace with otp
                </span>
                <form
                  action="javascript:"
                  style={{ textAlign: "left" }}
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <div className="form-group mb-2">
                    <label className="control-label">Releans sms</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input type="radio" name="status" defaultValue={0} />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Api key</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="api_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>From</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="from"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Otp template</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="otp_template"
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
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <h5 className="text-center">Twilio sms</h5>
                <span className="badge badge-soft-info mb-3">
                  NB : #OTP# will be replace with otp
                </span>
                <form
                  action="javascript:"
                  style={{ textAlign: "left" }}
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <div className="form-group mb-2">
                    <label className="control-label">Twilio sms</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
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
                      Sid
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="sid"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      Messaging service sid
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="messaging_service_sid"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Token</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="token"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>From</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="from"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Otp template</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="otp_template"
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
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <h5 className="text-center">Nexmo sms</h5>
                <span className="badge badge-soft-info mb-3">
                  NB : #OTP# will be replace with otp
                </span>
                <form
                  action="javascript:"
                  style={{ textAlign: "left" }}
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <div className="form-group mb-2">
                    <label className="control-label">Nexmo sms</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
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
                      Api key
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="api_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Api secret</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="api_secret"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>From</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="from"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Otp template</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="otp_template"
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
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <h5 className="text-center">2factor sms</h5>
                <span className="badge badge-soft-info">
                  EX of SMS provider s template : your OTP is XXXX here please
                  check.
                </span>
                <br />
                <span className="badge badge-soft-info mb-3">
                  NB : XXXX will be replace with otp
                </span>
                <form
                  action="javascript:"
                  style={{ textAlign: "left" }}
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <div className="form-group mb-2">
                    <label className="control-label">2factor sms</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
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
                      Api key
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="api_key"
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
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body text-left" style={{ padding: "20px" }}>
                <h5 className="text-center">Msg91 sms</h5>
                <span className="badge badge-soft-info mb-3">
                  NB : Keep an OTP variable in your SMS providers OTP Template.
                </span>
                <br />
                <form
                  action="javascript:"
                  style={{ textAlign: "left" }}
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />
                  <div className="form-group mb-2">
                    <label className="control-label">Msg91 sms</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
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
                      Template id
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="template_id"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      Authkey
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="authkey"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsSMSModule;
