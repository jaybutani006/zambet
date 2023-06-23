import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const AdminPricingPolicy = () => {
  const [policy, setPolicy] = useState([]);

  const getPolicy = async () => {
    const res = await fetch(
      "https://zambet-ecommerce.onrender.com/api/pricing_policy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setPolicy(data.data);
  };

  useEffect(() => {
    getPolicy();
  }, []);
  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row  justify-content-between align-items-center flex-grow-1">
                        <div className="col-12 col-sm-6 col-md-4">
                          <h5>Pricing Policy</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-2 mt-2 mt-sm-0 p-3"></div>
                    <div className="card-body" style={{ padding: 0 }}>
                      <div
                        className="table-responsive"
                        style={{ maxHeight: "50vh", overflowY: "scroll" }}
                      >
                        <table
                          id="datatable"
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle text-center card-table"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>SL#</th>
                              <th>Title</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {policy.map((ele, i) => {
                              return (
                                <>
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{ele.title}</td>
                                    <td>
                                      <NavLink
                                        to={`/pricing-policy-edit/${ele._id}`}
                                      >
                                        <Button variant="primary">Edit</Button>
                                      </NavLink>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* {!vandorList?.length && (
                      <div className="text-center p-4">
                        <img
                          className="mb-3"
                          src="/assets/back-end/svg/illustrations/sorry.svg"
                          alt="Image Description"
                          style={{ width: "7rem" }}
                        />
                        <p className="mb-0">No data to show</p>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminPricingPolicy;
