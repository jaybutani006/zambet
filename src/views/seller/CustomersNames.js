import React, { useState, useEffect } from "react";

const CustomersNames = () => {
  const [name, setName] = useState([]);

  const CustomerName = async () => {
    const token = localStorage.getItem("sellerToken");
    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/order/customerdata",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setName(data.data);
  };

  useEffect(() => {
    CustomerName();
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
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                    <div className="col-12 mb-1 col-md-4">
                      <h5>Sellers</h5>
                    </div>
                    <div className="col-12 mb-1 col-md-3">
                      {/* <Link to={"/admin/blogs/add"} className="btn btn-primary">
                        Add Blog
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "50vh", overflowY: "scroll" }}
                  >
                    <table
                      id="datatable"
                      // style={{
                      //   textAlign: "center",
                      //   tableLayout: "fixed",
                      //   display: "block",
                      //   height: "50vh",
                      //   overflowY: "scroll",
                      // }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    >
                      <thead className="thead-light">
                        <tr className="text-center">
                          <th style={{ width: "10%" }}>SL#</th>
                          <th style={{ width: "40%" }}>Name</th>
                          <th style={{ width: "40%" }}>Contact Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr className="text-center">
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr> */}
                        {name.map((ele, i) => {
                          return (
                            <>
                              <tr className="text-center">
                                <td>{i + 1}</td>
                                {ele.ordermasters.map((e) => {
                                  return (
                                    <>
                                      <td>{e.customer_name}</td>
                                      <td>{e.customer_mobile}</td>
                                    </>
                                  );
                                })}
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer"></div>
                {/* {!blogList?.length && (
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
      </main>
    </>
  );
};

export default CustomersNames;
