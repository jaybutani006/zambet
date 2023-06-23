import React from "react";
import { Link } from "react-router-dom";

function AdminTransactionList() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid ">
        <div className="col-md-4" style={{ marginBottom: "20px" }}>
          <h3 className="text-capitalize">
            Transaction table
            <span className="badge badge-soft-dark mx-2">21</span>
          </h3>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex-between justify-content-between align-items-center flex-grow-1">
              <div className="col-md-5 ">
                <form>
                  <div className="input-group input-group-merge input-group-flush">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="tio-search" />
                      </div>
                    </div>
                    <input
                      id="datatableSearch_"
                      type="search"
                      name="search"
                      className="form-control"
                      placeholder="Search by orders id or transaction id"
                      aria-label="Search orders"
                      defaultValue
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-8">
                    <select className="form-control" name="status">
                      <option
                        className="text-center"
                        value={0}
                        selected
                        disabled
                      >
                        ---Select status---
                      </option>
                      <option className="text-left text-capitalize" value="all">
                        All{" "}
                      </option>
                      <option
                        className="text-left text-capitalize"
                        value="disburse"
                      >
                        Disburse{" "}
                      </option>
                      <option
                        className="text-left text-capitalize"
                        value="hold"
                      >
                        Hold
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success">
                      Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
                    <th>Seller name</th>
                    <th>Customer name</th>
                    <th>Order id</th>
                    <th>Transaction id</th>
                    <th>Order amount</th>
                    <th>Seller amount</th>
                    <th>Admin commission</th>
                    <th>Received by</th>
                    <th>Delivered by</th>
                    <th>Delivery charge</th>
                    <th>Payment method</th>
                    <th>Tax</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Fatema subarna</td>
                    <td>100050</td>
                    <td>3300-jhyHm-1644060191</td>
                    <td>49.00$</td>
                    <td>44.10$</td>
                    <td>4.90$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>2.00$</td>
                    <td>cash on delivery</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>6Valley</td>
                    <td>Al Khandakar</td>
                    <td>100052</td>
                    <td>4916-eaGIo-1644060070</td>
                    <td>38.00$</td>
                    <td>38.00$</td>
                    <td>0.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>sslcommerz</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100051</td>
                    <td>1074-vWoAc-1644060070</td>
                    <td>145.90$</td>
                    <td>131.31$</td>
                    <td>14.59$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>sslcommerz</td>
                    <td>5.10$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>John Doe</td>
                    <td>Fatema subarna</td>
                    <td>100049</td>
                    <td>4274-V0f5b-1644059411</td>
                    <td>96.90$</td>
                    <td>87.21$</td>
                    <td>9.69$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>sslcommerz</td>
                    <td>5.10$</td>
                    <td>
                      <span className="badge badge-soft-warning ">hold</span>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>John Doe</td>
                    <td>Marjhan Sultana</td>
                    <td>100039</td>
                    <td>2920-14qPu-1637556034</td>
                    <td>49.00$</td>
                    <td>44.10$</td>
                    <td>4.90$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>6Valley</td>
                    <td>Marjhan Sultana</td>
                    <td>100042</td>
                    <td>9353-lxhjW-1637555868</td>
                    <td>38.00$</td>
                    <td>38.00$</td>
                    <td>0.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>John Doe</td>
                    <td>Fatema subarna</td>
                    <td>100037</td>
                    <td>8089-LiWgR-1637555347</td>
                    <td>96.90$</td>
                    <td>87.21$</td>
                    <td>9.69$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>666.00$</td>
                    <td>cash on delivery</td>
                    <td>5.10$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>John Doe</td>
                    <td>Marjhan Sultana</td>
                    <td>100036</td>
                    <td>2753-hO9cE-1635831250</td>
                    <td>147.00$</td>
                    <td>132.30$</td>
                    <td>14.70$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>stripe</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-warning ">hold</span>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>6Valley</td>
                    <td>Marjhan Sultana</td>
                    <td>100035</td>
                    <td>7363-uNHLm-1635831250</td>
                    <td>517.90$</td>
                    <td>517.90$</td>
                    <td>0.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>stripe</td>
                    <td>10.60$</td>
                    <td>
                      <span className="badge badge-soft-warning ">hold</span>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100033</td>
                    <td>8429-oOub0-1635578331</td>
                    <td>484.50$</td>
                    <td>436.05$</td>
                    <td>48.45$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>25.50$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100032</td>
                    <td>3979-ldkhq-1635578087</td>
                    <td>343.00$</td>
                    <td>308.70$</td>
                    <td>34.30$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100031</td>
                    <td>3115-nxw0M-1635520052</td>
                    <td>196.00$</td>
                    <td>176.40$</td>
                    <td>19.60$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>sslcommerz</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100030</td>
                    <td>9213-Cr9Tm-1635519733</td>
                    <td>900.00$</td>
                    <td>810.00$</td>
                    <td>90.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>20.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100029</td>
                    <td>3794-cHG6U-1635503530</td>
                    <td>193.80$</td>
                    <td>174.42$</td>
                    <td>19.38$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>10.20$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100028</td>
                    <td>4125-Pm0IN-1635503275</td>
                    <td>193.80$</td>
                    <td>174.42$</td>
                    <td>19.38$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>sslcommerz</td>
                    <td>10.20$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>16</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100027</td>
                    <td>2418-k1Exa-1635502311</td>
                    <td>2,907.00$</td>
                    <td>2,616.30$</td>
                    <td>290.70$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>666.00$</td>
                    <td>sslcommerz</td>
                    <td>153.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>17</td>
                    <td>John Doe</td>
                    <td>Al Khandakar</td>
                    <td>100026</td>
                    <td>6552-TuTKG-1635494186</td>
                    <td>9,690.00$</td>
                    <td>8,721.00$</td>
                    <td>969.00$</td>
                    <td>seller</td>
                    <td>seller</td>
                    <td>666.00$</td>
                    <td>cash on delivery</td>
                    <td>510.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>18</td>
                    <td>6Valley</td>
                    <td>Ashek Elahe</td>
                    <td>100022</td>
                    <td>3215-aauuc-1634667060</td>
                    <td>20.00$</td>
                    <td>20.00$</td>
                    <td>0.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>2.00$</td>
                    <td>sslcommerz</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-warning ">hold</span>
                    </td>
                  </tr>
                  <tr>
                    <td>19</td>
                    <td>John Doe</td>
                    <td>Ashek Elahe</td>
                    <td>100023</td>
                    <td>9952-jMJCi-1634667060</td>
                    <td>49.00$</td>
                    <td>41.65$</td>
                    <td>7.35$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>2.00$</td>
                    <td>sslcommerz</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>20</td>
                    <td>John Doe</td>
                    <td>Marjhan Sultana</td>
                    <td>100020</td>
                    <td>3057-tRI0I-1634675414</td>
                    <td>2,700.00$</td>
                    <td>2,295.00$</td>
                    <td>405.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>60.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>21</td>
                    <td>6Valley</td>
                    <td>Ashek Elahe</td>
                    <td>100021</td>
                    <td>9878-t20K7-1634675138</td>
                    <td>38.00$</td>
                    <td>38.00$</td>
                    <td>0.00$</td>
                    <td>admin</td>
                    <td>admin</td>
                    <td>5.00$</td>
                    <td>cash on delivery</td>
                    <td>0.00$</td>
                    <td>
                      <span className="badge badge-soft-success  ">
                        disburse
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </main>
  );
}

export default AdminTransactionList;
