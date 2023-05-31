import React, { useEffect, useState } from "react";

const AdminAreaWiseSeller = () => {
  const [seller, setSeller] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const CityWishVendor = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/admin/venderdata",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setSeller(data.data);
  };

  useEffect(() => {
    CityWishVendor();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSellers = seller.filter((ele) => {
    const vendorDetails = ele.vendor_details[0].city || "...";
    return vendorDetails.toLowerCase().includes(searchQuery.toLowerCase());     
  });

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
                    <div className="col-12 mb-1 col-md-5">
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
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                          <button className="btn btn-primary">Search</button>
                        </div>
                      </form>
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
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    >
                      <thead className="thead-light">
                        <tr className="text-center">
                          <th style={{ width: "10%" }}>SL#</th>
                          <th style={{ width: "40%" }}>Seller Name</th>
                          <th style={{ width: "40%" }}>Seller City</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSellers.length ? (
                          filteredSellers.map((ele, i) => (
                            <tr className="text-center" key={i}>
                              <td>{i + 1}</td>
                              <td>{ele.vendor_details[0].first_name}</td>
                              <td>{ele.vendor_details[0].city || "..."}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">
                              <img
                                className="mb-3"
                                src="/assets/back-end/svg/illustrations/sorry.svg"
                                alt="Image Description"
                                style={{ width: "7rem" }}
                              />
                              <p className="mb-0">No data to show</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default AdminAreaWiseSeller;
