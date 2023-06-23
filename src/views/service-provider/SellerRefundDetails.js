import React from "react";
import { Link } from "react-router-dom";

function SellerRefundDetails() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card m-3">
              <div className="card-header">
                <div className="row flex-between justify-content-between  flex-grow-1">
                  <div className="col-12 col-md-4">
                    <h3>Refund details</h3>
                    <span>Refund id : 8</span>
                  </div>
                  <div className="col-6 col-md-4 mt-2 mt-md-0 text-capitalize">
                    Refund status:
                    <span style={{ color: "rgb(21, 115, 255)" }}>
                      {" "}
                      approved
                    </span>
                  </div>
                  <div className="col-6 col-md-4 mt-2 mt-md-0">
                    <button
                      className="btn btn-primary float-right"
                      data-toggle="modal"
                      data-target="#refund-status"
                    >
                      Change refund status
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-2">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      alt="VR Collection"
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 mt-2 mt-md-0 text-left">
                    <span
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      <Link to="/seller/product/view/9">
                        test seller product
                      </Link>
                    </span>
                    <br />
                    <span>QTY : 3</span>
                    <br />
                    <span>Price : $500.0</span>
                    <br />
                  </div>
                  <div className="col-12 col-sm-10 col-md-4 text-center d-flex flex-column pl-0 mt-4 mt-sm-4 pl-sm-5">
                    <div className="row justify-content-md-end mb-3">
                      <div className="col-md-10 col-lg-10">
                        <dl className="row text-sm-right">
                          <dt className="col-sm-7">Total price : </dt>
                          <dd className="col-sm-5 ">
                            <strong>$1,500.0</strong>
                          </dd>
                          <dt className="col-sm-7">Total discount :</dt>
                          <dd className="col-sm-5 ">
                            <strong>$0.0</strong>
                          </dd>
                          <dt className="col-sm-7">Total tax :</dt>
                          <dd className="col-sm-5">
                            <strong>$75.0</strong>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row text-center">
                  <span className="col-sm-2">Subtotal : $1,575.0</span>
                  <span className="col-sm-5">Coupon discount : $0.0</span>
                  <span className="col-sm-5">
                    Total refund amount : $1,575.0
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <div className="card m-3">
              <div className="card-header">
                <div className="row flex-between justify-content-between  flex-grow-1">
                  <div className="col-12">
                    <h3>Additional information</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row p-1">
                  <div className="col-12 col-sm-6">
                    <h5>Deliveryman info : </h5>
                    <span>Deliveryman name : fatema subarna</span>
                    <br />
                    <span>Deliveryman email : fatema01@gmail.com</span>
                    <br />
                    <span>Deliveryman phone : +8801885576624</span>
                    <br />
                  </div>
                  <div className="col-12 col-sm-6 text-capitalize">
                    <span>Payment method : stripe</span>
                    <br />
                    <span>Order details : </span>{" "}
                    <Link
                      className="btn btn-primary btn-sm"
                      to="/seller/orders/details/100120"
                    >
                      Click here
                    </Link>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card m-3">
              <div className="card-header">
                <h3>Refund status changed log</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive datatable-custom">
                  <table
                    className="table table-hover table-borderless table-thead-bordered table-align-middle card-table"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "10%" }}>SL#</th>
                        <th style={{ width: "15%" }}>Changed by </th>
                        <th style={{ width: "15%" }}>Status</th>
                        <th style={{ width: "60%" }}>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>seller</td>
                        <td>approved</td>
                        <td className="text-break">Temp Approved</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>seller</td>
                        <td>pending</td>
                        <td className="text-break"></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>seller</td>
                        <td>rejected</td>
                        <td className="text-break">Reject Note</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>seller</td>
                        <td>approved</td>
                        <td className="text-break">Approved Note</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card m-3">
              <div className="card-header">
                <h3>Refund reason</h3>
              </div>
              <div className="card-body">
                <div className="col-12">
                  <p>Defective</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card m-3">
              <div className="card-header">
                <h4>Attachment</h4>
              </div>
              <div className="card-body">
                <div className="col-12">
                  <div className="gallery">
                    <Link
                      to="/storage/app/public/refund/2022-05-27-629086221ab08.png"
                      data-lightbox="mygallery"
                    >
                      <img
                        src="https://com/storage/app/public/refund/2022-05-27-629086221ab08.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="refund-status" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change refund status</h5>
              <button
                id="payment_close"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="order_place" className="row">
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="eQnrEtIFxY6V0f3yraZiefJuFiNOolMDa5z3D0Xy"
                />{" "}
                <input type="hidden" name="id" defaultValue={8} />
                <div className="form-group col-12">
                  <label className="input-label" htmlFor>
                    Refund status
                  </label>
                  <select
                    name="refund_status"
                    className="form-control"
                    onchange="refund_status_change(this.value)"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved" selected>
                      Approved
                    </option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div
                  className="form-group col-12"
                  id="approved"
                  style={{ display: "none" }}
                >
                  <label className="input-label" htmlFor>
                    Approved note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="approved_note"
                    name="approved_note"
                  />
                </div>
                <div
                  className="form-group col-12"
                  id="rejected"
                  style={{ display: "none" }}
                >
                  <label className="input-label" htmlFor>
                    Rejected note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rejected_note"
                    name="rejected_note"
                  />
                </div>
                <div className="form-group col-12">
                  <button className="btn btn-primary float-right" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerRefundDetails;
