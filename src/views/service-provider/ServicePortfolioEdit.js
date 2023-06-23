import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dummyShopLogo from "assets/dummyShopLogo.png";
import dummyShopBanner from "assets/dummyShopBanner.png";
import { defaultAPIErrorHandler } from "api/api";

function SellerMyShopEdit() {
  const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);
    const { _id } = useParams();
  const [services, setServices] = useState();
  const initialState = {
    service_provider_portfolio_name: "",
    service_id: "",
    service_provider_portfolio_photo: null,
    description: "",
  };
  const apiGetAllCategories = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/services",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setServices(response.data.data);
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };
  
    const portfolioinfo = () => {
      console.log("called");
      axios({
        method: "get",
        url:
          process.env.REACT_APP_BASEURL +
          "/api/service_provider_portfolio/detail?_id=" +
          _id,
        headers: {
          Authorization: state.serviceToken,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          const shopInfo = response.data.data[0];

          setMyShopDetails({
            service_provider_portfolio_name:
              shopInfo.service_provider_portfolio_name,
            service_id: shopInfo.service_id,
            //   service_provider_portfolio_photo: null,
            description: shopInfo.description,
          });
        })
        .catch(function (error) {
          // Handle the error here
          alert(error);
        });
    };
    useEffect(() => {
      apiGetAllCategories();
      portfolioinfo();
    }, []);
  const [resMyShopDetails, setResMyShopDetails] = useState(initialState);
  const [myShopDetails, setMyShopDetails] = useState(initialState);
    const [porstfolioDetail, setPortfolioDetails] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "service_provider_portfolio_photo") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 1) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMyShopDetails((prev) => ({
            ...prev,
            [name]: e.target.files,
            [`${name}imageURLObj`]: imageURLObj,
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 1)].map((item) =>
            URL.createObjectURL(item)
          );

          setMyShopDetails((prev) => ({
            ...prev,
            [name]: e.target.files?.slice(0, 1),
            [`${name}imageURLObj`]: imageURLObj,
          }));

          window.alert("At Max 1 Images are allowed");
        }
      }
    } else {
      setMyShopDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(myShopDetails);
  };

  const handleEditPortfolio = (e) => {
    e.preventDefault();
    console.log(myShopDetails);

    const formData = new FormData();

    formData.append(
      "service_provider_portfolio_name",
      myShopDetails.service_provider_portfolio_name
    );
    formData.append("service_id", myShopDetails.service_id);
    formData.append("description", myShopDetails.description);
    if (myShopDetails.service_provider_portfolio_photo instanceof FileList) {
      formData.append(
        "service_provider_portfolio_photo",
        myShopDetails.service_provider_portfolio_photo?.[0]
      );
    }

    axios({
      method: "put",
      url:
        process.env.REACT_APP_BASEURL +
        `/api/service_provider_portfolio?_id=${_id}`,
      headers: {
        Authorization: state.serviceToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        // apiGetMyShopInfo();
        alert("Successfully added Portfolio");
        navigate("/service/shop/view");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
      });
  };

  //   useEffect(() => {
  //     apiGetMyShopInfo();
  //   }, []);

  return (
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
                <h1 className="h3 mb-0 ">Insert Portfolio</h1>
              </div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="service_provider_portfolio_name">
                          Portfolio Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="service_provider_portfolio_name"
                          defaultValue="Mart Morning"
                          className="form-control form-control-input"
                          id="service_provider_portfolio_name"
                          onChange={handleInputChange}
                          value={myShopDetails.service_provider_portfolio_name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">
                          Description <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="description"
                          defaultValue="Mart Morning"
                          className="form-control form-control-input"
                          id="description"
                          onChange={handleInputChange}
                          value={myShopDetails.description}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="service_id">
                          Service <span className="text-danger">*</span>
                        </label>
                        <select
                          name="service_id"
                          className="form-control form-control-input"
                          id="service_id"
                          onChange={handleInputChange}
                          value={myShopDetails.service_id}
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {services &&
                            services.map((service) => (
                              <option key={service._id} value={service._id}>
                                {service.service_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* <div className="form-group">
                        <label htmlFor="company_website">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control form-control-input"
                          id="last_name"
                          onChange={handleInputChange}
                          value={myShopDetails.last_name}
                        />
                      </div> */}
                      {/* <div className="form-group">
                        <label htmlFor="company_email_address">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email_address"
                          className="form-control form-control-input"
                          id="email_address"
                          onChange={handleInputChange}
                          value={myShopDetails.email_address}
                        />
                      </div> */}
                      {/* <div className="form-group">
                        <label htmlFor="company_website">
                          Website
                        </label>
                        <input
                          type="text"
                          name="company_website"
                          className="form-control form-control-input"
                          id="company_website"
                          onChange={handleInputChange}
                          value={myShopDetails.company_website}
                        />
                      </div> */}

                      {/* <div className="form-group">
                        <label htmlFor="gst_no">
                          GST No.
                        </label>
                        <input
                          type="text"
                          name="gst_no"
                          className="form-control form-control-input"
                          id="gst_no"
                          onChange={handleInputChange}
                          value={myShopDetails.gst_no}
                        />
                      </div> */}
                      <div className="form-group">
                        <label htmlFor="name">Upload Logo</label>
                        <div className="custom-file text-left">
                          <input
                            type="file"
                            name="service_provider_portfolio_photo"
                            id="service_provider_portfolio_photo"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg"
                            // accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            onChange={handleInputChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="service_provider_portfolio_photo"
                          >
                            Choose File
                          </label>
                        </div>
                      </div>
                      <div className="text-center">
                        <img
                          style={{
                            width: "auto",
                            border: "1px solid",
                            borderRadius: "10px",
                            maxHeight: "200px",
                          }}
                          id="viewer"
                          src={
                            myShopDetails?.service_provider_portfolio_photoimageURLObj ||
                            dummyShopLogo
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyShopLogo;
                          }}
                          alt=""
                        />
                      </div>
                      {/* <div className="form-group">
                        <label htmlFor="name">Upload Vendor</label>
                        <div className="custom-file text-left">
                          <input
                            type="file"
                            name="vendor_photo"
                            id="vendor_photo"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg"
                            // accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            onChange={handleInputChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="vendor_photo"
                          >
                            Choose File
                          </label>
                        </div>
                      </div> */}
                      {/* <div className="text-center">
                        <img
                          style={{
                            width: "auto",
                            border: "1px solid",
                            borderRadius: "10px",
                            maxHeight: "200px",
                          }}
                          id="viewer"
                          src={
                            myShopDetails?.vendor_photoimageURLObj ||
                            dummyShopLogo
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyShopLogo;
                          }}
                          alt=""
                        />
                      </div>
                    </div> */}

                      {/* <div className="col-md-6 mb-4 mt-2">
                      <div className="form-group">
                        <div className="flex-start">
                          <div htmlFor="name">Upload Banner </div>
                          <div className="mx-1" htmlFor="ratio">
                            <small style={{ color: "red" }}>
                              Ratio : ( 6:1 )
                            </small>
                          </div>
                        </div>
                        <div className="custom-file text-left">
                          <input
                            type="file"
                            name="banner"
                            id="BannerUpload"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="BannerUpload"
                          >
                            Choose File
                          </label>
                        </div>
                      </div>
                      <div className="text-center">
                        <img
                          style={{
                            width: "auto",
                            height: "auto",
                            border: "1px solid",
                            borderRadius: "10px",
                            maxHeight: "200px",
                          }}
                          id="viewerBanner"
                          alt="Product thumbnail"
                        />
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <hr />
                  <button
                    onClick={handleEditPortfolio}
                    // type="submit"
                    className="btn btn-primary float-right"
                    // id="btn_update"
                  >
                    Submit
                  </button>
                  <Link className="btn btn-danger" to="/service/shop/view">
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footer">
        <div className="row justify-content-between align-items-center">
          <div className="col mt-3">
            <span>Copyright © Zambet 2022</span>
          </div>
        </div>
      </div> */}
    </main>
  );
}

export default SellerMyShopEdit;
