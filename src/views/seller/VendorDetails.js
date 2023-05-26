import React, { useEffect, useState } from "react";

const VendorDetails = () => {
  const [vandorList, setVandorList] = useState([]);

  const getVandor = async () => {
    const token = localStorage.getItem("sellerToken");

    const res = await fetch(
      "https://zambet-ecommerce.onrender.com/api/subvender",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data[0].subvender);
    setVandorList(data.data[0].subvender);
  };

  useEffect(() => {
    getVandor();
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
                          <h5>Vandor Details</h5>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
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
                                placeholder="Search"
                                aria-label="Search orders"
                                onChange={(e) => {
                                  //   setSearch(e.target.value);
                                  //   // FIXME : cant search with number types and nested arrays
                                  //   setExpiryList(
                                  //     searchFor(e.target.value, expiryList)
                                  //   );
                                }}
                                // value={search}
                              />
                              <button
                                onClick={(e) => e.preventDefault()}
                                className="btn btn-primary"
                              >
                                Search
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-2 mt-2 mt-sm-0 p-3">
                      <button
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   handleExport();
                        // }}
                        className="btn btn-success float-right float-sm-none"
                      >
                        Export
                      </button>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                      <div
                        className="table-responsive"
                        style={{ maxHeight: "50vh", overflowY: "scroll" }}
                      >
                        <table
                          id="datatable"
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>SL#</th>
                              <th>COMPANY NAME</th>
                              <th>SUBVENDER NAME</th>
                              <th>BANK NAME</th>
                              <th>BANK ACCOUNT NO</th>
                              <th>CONTACT NO.</th>
                              <th>website</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vandorList.map((ele, i) => {
                              return (
                                <>
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{ele.company_name}</td>
                                    <td>{ele.subvender_name}</td>
                                    <td>{ele.bank_details.bank_name}</td>
                                    <td>{ele.bank_details.bank_account_no}</td>
                                    <td>{ele.contact}</td>
                                    <td>{ele.soical_profile.website}</td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {!vandorList?.length && (
                      <div className="text-center p-4">
                        <img
                          className="mb-3"
                          src="/assets/back-end/svg/illustrations/sorry.svg"
                          alt="Image Description"
                          style={{ width: "7rem" }}
                        />
                        <p className="mb-0">No data to show</p>
                      </div>
                    )}
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

export default VendorDetails;
