import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const ManageAdvertisement = () => {
  const [getAdPhoto, setGetAdPhoto] = useState([]);
  const [status, setStatus] = useState({
    approve: "",
    cancel: "",
  });

  const handleButtonClick = (value) => {
    setStatus(value);
  };

  const DisplayAdPhotos = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/advertising_preferences/admin",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log(data.data);
    setGetAdPhoto(data.data);
  };

  const updateStatus = async (id) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      process.env.REACT_APP_BASEURL + `/api/advertising_preferences?_id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    DisplayAdPhotos();
  };

  useEffect(() => {
    DisplayAdPhotos();
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
                          <h5>Manage Advertisement</h5>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-12 col-sm-2 mt-2 mt-sm-0 p-3">
                      <button
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   handleExport();
                        // }}
                        className="btn btn-success float-right float-sm-none"
                      >
                        Export
                      </button>
                    </div> */}
                    <div className="card-body" style={{ padding: 0 }}>
                      <div
                        className="table-responsive"
                        style={{ maxHeight: "50vh", overflowY: "scroll" }}
                      >
                        <table
                          id="datatable"
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-center"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>SL#</th>
                              <th>ADVERTISEMENT PHOTO</th>
                              <th>VANDOR ID</th>
                              <th>STATUS</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getAdPhoto.map((ele, i) => {
                              return (
                                <>
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                      <img src={ele.photo} />
                                    </td>
                                    <td>{ele.vendor_id}</td>
                                    <td>{ele.status}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => {
                                          updateStatus(ele._id);
                                          handleButtonClick("approve");
                                        }}
                                        name="approve"
                                        value="approve"
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        variant="danger"
                                        onClick={() => {
                                          updateStatus(ele._id);
                                          handleButtonClick("cancel");
                                        }}
                                        name="cancel"
                                        value="cancel"
                                      >
                                        Cancel
                                      </Button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* {!expiryList?.length && (
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

export default ManageAdvertisement;
