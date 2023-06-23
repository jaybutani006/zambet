import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const SellerAdvertisement = () => {
  const [getAdPhoto, setGetAdPhoto] = useState([]);
  const [adPhoto, setAdPhoto] = useState({
    photo: "",
  });

  const pic = (e) => {
    const { name, value } = e.target;
    setAdPhoto({ ...adPhoto, [name]: value });
  };

  const btnn = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("sellerToken");

    const { photo } = adPhoto;
    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/advertising_preferences",
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const DisplayAdPhotos = async () => {
    const token = localStorage.getItem("sellerToken");
    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/advertising_preferences/vendor",
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
    setGetAdPhoto(data.data);
  };

  const deleteAdPhoto = async (id) => {
    const token = localStorage.getItem("sellerToken");

    const res = await fetch(
      process.env.REACT_APP_BASEURL + `/api/advertising_preferences?_id=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    DisplayAdPhotos();
  };

  useEffect(() => {
    DisplayAdPhotos();
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
              <form
                className="product-form"
                style={{ textAlign: "left" }}
                id="product_form"
              >
                <div className="card mt-2 rest-part">
                  <div className="card-header">Advertisement</div>
                  <div className="card-body">
                    <div>
                      <div style={{ marginBottom: "30px" }}>
                        <h3>Add image for advertisement</h3>
                      </div>
                      <div>
                        <input type="file" name="photo" onChange={pic} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="content container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row  justify-content-between align-items-center flex-grow-1">
                        <div className="col-12 col-sm-6 col-md-4">
                          <h5>Advertisements</h5>
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
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>SL#</th>
                              <th>ADVERTISEMENT PHOTO</th>
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
                                    <td>{ele.status}</td>
                                    <td>
                                      <Button
                                        variant="danger"
                                        onClick={() => deleteAdPhoto(ele._id)}
                                      >
                                        Delete
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
                    {!getAdPhoto?.length && (
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

export default SellerAdvertisement;
