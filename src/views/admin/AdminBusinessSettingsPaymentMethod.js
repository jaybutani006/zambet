import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminBusinessSettingsPaymentMethod() {
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
              Payment method
            </li>
          </ol>
        </nav>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">System default Payment method</h5>
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Cash on delivery</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Digital payment</h5>
                <form style={{ textAlign: "left" }}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Digital payment</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">SSLCOMMERZ</h5>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Ssl commerz payment</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Store ID </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="store_id"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Store Password
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="store_password"
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Paypal</h5>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Paypal Payment</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Paypal ClientID{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="paypal_client_id"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Paypal Secret{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="paypal_secret"
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Stripe</h5>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Stripe</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>PublishedKey </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="published_key"
                      defaultValue
                    />
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Razor pay</h5>
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Razor pay</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Key </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="razor_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Secret</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="razor_secret"
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Senang pay</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Senang pay</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Callback URI</label>
                    <span
                      className="btn btn-secondary btn-sm m-2"
                      onclick="copyToClipboard('#id_senang_pay')"
                    >
                      <i className="tio-copy" /> Copy URI
                    </span>
                    <br />
                    <p className="form-control" id="id_senang_pay">
                      https://6valley.6amtech.com/return-senang-pay
                    </p>
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Secret Key</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="secret_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Merchant ID</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="merchant_id"
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
          <div className="col-md-6" style={{ marginTop: "26px!important" }}>
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Paystack</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Paystack</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Inactive</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Callback URI</label>
                    <span
                      className="btn btn-secondary btn-sm m-2"
                      onclick="copyToClipboard('#id_paystack')"
                    >
                      <i className="tio-copy" /> Copy URI
                    </span>
                    <br />
                    <p className="form-control" id="id_paystack">
                      https://6valley.6amtech.com/paystack-callback
                    </p>
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>PublicKey</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="publicKey"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>SecretKey </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="secretKey"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>PaymentUrl </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="paymentUrl"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      MerchantEmail{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="merchantEmail"
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
          <div className="col-md-6 mt-4" style={{ display: "block" }}>
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Paymob accept</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Paymob accept</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="radio"
                      name="status"
                      defaultValue={0}
                      defaultChecked
                    />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Callback URI</label>
                    <span
                      className="btn btn-secondary btn-sm m-2"
                      onclick="copyToClipboard('#id_paymob_accept')"
                    >
                      <i className="tio-copy" /> Copy URI
                    </span>
                    <br />
                    <p className="form-control" id="id_paymob_accept">
                      https://6valley.6amtech.com/paymob-callback
                    </p>
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
                    <label style={{ paddingLeft: "10px" }}>Iframe id</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="iframe_id"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Integration id
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="integration_id"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>HMAC</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="hmac"
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
          <div className="col-md-6 mt-4" style={{ display: "block" }}>
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Bkash</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Bkash</label>
                  </div>
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
                    <label style={{ paddingLeft: "10px" }}>Username</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Password</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="password"
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
          <div className="col-md-6 mt-4" style={{ display: "block" }}>
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Paytabs</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Paytabs</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="radio"
                      name="status"
                      defaultValue={0}
                      defaultChecked
                    />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Profile id</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="profile_id"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Server key</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="server_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Base url by region
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="base_url"
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
          <div className="col-md-6 mt-4" style={{ display: "none" }}>
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Fawry pay</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Fawry pay</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="radio"
                      name="status"
                      defaultValue={0}
                      defaultChecked
                    />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Merchant code</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="merchant_code"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>Security key</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="security_key"
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
          <div className="col-md-6 pt-4">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Mercadopago</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Mercadopago</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="radio"
                      name="status"
                      defaultValue={0}
                      defaultChecked
                    />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      PublicKey
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="public_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      Access token
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="access_token"
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
          <div className="col-md-6 pt-4">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Flutterwave</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Flutterwave</label>
                  </div>
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
                      PublicKey
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="public_key"
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
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      Hash
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="hash"
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
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Paytm</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Paytm</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="radio"
                      name="status"
                      defaultValue={0}
                      defaultChecked
                    />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Paytm merchant key
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="paytm_merchant_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Paytm merchant mid
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="paytm_merchant_mid"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label style={{ paddingLeft: "10px" }}>
                      Paytm merchant website
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="paytm_merchant_website"
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
          <div className="col-md-6 pt-4">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="text-center">Liqpay</h5>
                <form action="javascript:" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "}
                  <div className="form-group mb-2">
                    <label className="control-label">Liqpay</label>
                  </div>
                  <div className="form-group mb-2 mt-2">
                    <input type="radio" name="status" defaultValue={1} />
                    <label style={{ paddingLeft: "10px" }}>Active</label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="radio"
                      name="status"
                      defaultValue={0}
                      defaultChecked
                    />
                    <label style={{ paddingLeft: "10px" }}>Inactive </label>
                    <br />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      PublicKey
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="public_key"
                      defaultValue
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="text-capitalize"
                      style={{ paddingLeft: "10px" }}
                    >
                      PrivateKey
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      name="private_key"
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

export default AdminBusinessSettingsPaymentMethod;
