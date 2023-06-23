import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyShopLogo from "assets/dummyShopLogo.png";
import dummyShopBanner from "assets/dummyShopBanner.png";
import { defaultAPIErrorHandler } from "api/api";

function SellerMyShopEdit() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const initialState = {
    first_name: "",
    last_name: "",
    shop_name: "",
    shop_email: "",
    phone: "",
    company_phone: "",
    email_address: "",
    company_website: "",
    gst_no: "",
    shop_address: "",
    state: "",
    city: "",
    password: "",
    company_logo: null,
    company_logo_url: "",
    shop_banner: null,
    shop_banner_url: "",
    vendor_photo: null,
    vendor_photo_url: "",
  };
  const [resMyShopDetails, setResMyShopDetails] = useState(initialState);
  const [myShopDetails, setMyShopDetails] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "company_logo" ||
      name === "shop_banner" ||
      name === "vendor_photo"
    ) {
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
    } else if (name === "company_phone") {
      if (value.toString().length > 10) {
        alert("Phone Number must be of 10 digits");
        return;
      }
      setMyShopDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setMyShopDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(myShopDetails);
  };

  // const apiGetMyShopInfo = () => {
  //   axios({
  //     method: "get",
  //     url: process.env.REACT_APP_BASEURL + "/api/service_provider/profile",
  //     headers: {
  //       Authorization: state.serviceToken,
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response.data.data[0]);
  //       const myObj = {
  //         shop_name: response.data.shop_name,
  //         company_phone: response.data.data[0].company_phone,
  //         company_email_address: response.data.data[0].company_email_address,
  //         company_website: response.data.data[0].company_website,
  //         gst_no: response.data.data[0].gst_no,
  //         company_address: response.data.data[0].company_address,
  //         state: response.data.data[0].state,
  //         city: response.data.data[0].city,
  //         company_logo: null,
  //         company_logo_url: response.data.data[0].company_logo,
  //         shop_banner: null,
  //         shop_banner_url: response.data.data[0].shop_banner,
  //       };
  //       setMyShopDetails({ ...myObj });
  //       setResMyShopDetails({ ...myObj });
  //     })
  //     .catch(function (error) {
  //       // defaultAPIErrorHandler(error)
  //     });
  // };

  const apiGetMyShopInfo = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/service_provider/profile",
      headers: {
        Authorization: state.serviceToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        const shopInfo = response.data.data;
        setMyShopDetails({
          first_name: shopInfo.first_name,
          last_name: shopInfo.last_name,
          shop_name: shopInfo.shop_name,
          // shop_email: shopInfo.company_email_address,
          company_phone: shopInfo.company_phone,
          phone: shopInfo.contect_no,
          email_address: shopInfo.email_address,
          company_website: shopInfo.company_website,
          gst_no: shopInfo.gst_no,
          shop_address: shopInfo.shop_address,
          state: shopInfo.state,
          city: shopInfo.city,
          company_logo: null,
          company_logo_url: "",
          shop_banner: null,
          shop_banner_url: "",
          vendor_photo: null,
          vendor_photo_url: "",
          password: shopInfo.password,
        });
      })
      .catch(function (error) {
        // Handle the error here
      });
  };

  const handleUpdateMyShopInfo = (e) => {
    e.preventDefault();
    console.log(myShopDetails);

    if (myShopDetails.company_phone.toString().length !== 10) {
      alert("Phone Number must be of 10 digits");
      return;
    }

    const formData = new FormData();

    formData.append("first_name", myShopDetails.first_name);
    formData.append("last_name", myShopDetails.last_name);
    formData.append("shop_name", myShopDetails.shop_name);
    formData.append("company_email_address", myShopDetails.shop_email);
    formData.append("email_address", myShopDetails.email_address);
    formData.append("password", myShopDetails.password);
    formData.append("contect_no", myShopDetails.phone);
    formData.append("company_website", myShopDetails.company_website);
    formData.append("gst_no", myShopDetails.gst_no);
    formData.append("company_phone", myShopDetails.company_phone);
    // formData.append("contect_no", myShopDetails.company_phone);
    formData.append("shop_address", myShopDetails.shop_address);
    formData.append("state", myShopDetails.state);
    formData.append("city", myShopDetails.city);
    if (myShopDetails.company_logo instanceof FileList) {
      formData.append("company_logo", myShopDetails.company_logo?.[0]);
    }
    if (myShopDetails.shop_banner instanceof FileList) {
      formData.append("shop_banner", myShopDetails.shop_banner?.[0]);
    }
    if (myShopDetails.shop_banner instanceof FileList) {
      formData.append("vendor_photo", myShopDetails.vendor_photo?.[0]);
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/service_provider",
      headers: {
        Authorization: state.serviceToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        apiGetMyShopInfo();
        alert("Successfully Updated Shop Info");
        navigate("/service/shop/view");
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error);
      });
  };

  useEffect(() => {
    apiGetMyShopInfo();
  }, []);

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
                <h1 className="h3 mb-0 ">Edit Shop Info</h1>
              </div>
              <div className="card-body">
                <form style={{ textAlign: "left" }}>
                  {/* <input
                    type="hidden"
                    name="_token"
                    defaultValue="FvnFmgIzJXN15mYSlUSR8D6kvHhuMkLV7rGjuBDd"
                  />{" "} */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="company_name">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          defaultValue="Mart Morning"
                          className="form-control form-control-input"
                          id="company_name"
                          onChange={handleInputChange}
                          value={myShopDetails.first_name}
                        />
                      </div>
                      {/* <div className="form-group">
                        <label htmlFor="company_name">
                          Shop Email Address{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="shop_email"
                          defaultValue="Mart Morning"
                          className="form-control form-control-input"
                          id="shop_email"
                          onChange={handleInputChange}
                          value={myShopDetails.shop_email}
                        />
                      </div> */}
                      <div className="form-group">
                        <label htmlFor="company_name">
                          Shop Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="shop_name"
                          defaultValue="Mart Morning"
                          className="form-control form-control-input"
                          id="shop_name"
                          onChange={handleInputChange}
                          value={myShopDetails.shop_name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="company_phone">
                          Comapny Contact{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="number"
                          name="company_phone"
                          defaultValue={"1234567890"}
                          className="form-control form-control-input"
                          id="company_phone"
                          onChange={handleInputChange}
                          value={myShopDetails.company_phone}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="company_phone">
                          Contact{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="number"
                          name="phone"
                          defaultValue={"1234567890"}
                          className="form-control form-control-input"
                          id="phone"
                          onChange={handleInputChange}
                          value={myShopDetails.phone}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="company_address">
                          Address <span className="text-danger">*</span>
                        </label>
                        <textarea
                          type="text"
                          rows={4}
                          name="shop_address"
                          className="form-control form-control-input"
                          id="shop_address"
                          onChange={handleInputChange}
                          value={myShopDetails.shop_address}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">
                          State{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="text"
                          name="state"
                          className="form-control form-control-input"
                          id="state"
                          onChange={handleInputChange}
                          value={myShopDetails.state}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">
                          City{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="form-control form-control-input"
                          id="city"
                          onChange={handleInputChange}
                          value={myShopDetails.city}
                        />
                      </div>
                      {/* <div className="col-md-6 mb-4 mt-2"> */}
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
                            name="shop_banner"
                            id="BannerUpload"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            // className="form-control form-control-input"
                            onChange={handleInputChange}
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
                            width: "100%",
                            height: "auto",
                            border: "1px solid",
                            borderRadius: "10px",
                            maxHeight: "200px",
                          }}
                          id="viewerBanner"
                          src={
                            myShopDetails?.shop_bannerimageURLObj ||
                            dummyShopBanner
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyShopBanner;
                          }}
                          alt=""
                        />
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="company_website">
                          Last Name{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control form-control-input"
                          id="last_name"
                          onChange={handleInputChange}
                          value={myShopDetails.last_name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="company_email_address">
                          Email{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="text"
                          name="email_address"
                          className="form-control form-control-input"
                          id="email_address"
                          onChange={handleInputChange}
                          value={myShopDetails.email_address}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="company_website">
                          Website{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="text"
                          name="company_website"
                          className="form-control form-control-input"
                          id="company_website"
                          onChange={handleInputChange}
                          value={myShopDetails.company_website}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gst_no">
                          GST No.{" "}
                          {/* <small className="text-danger">
                            ( * Country code is must Like for BD 880 )
                          </small> */}
                        </label>
                        <input
                          type="text"
                          name="gst_no"
                          className="form-control form-control-input"
                          id="gst_no"
                          onChange={handleInputChange}
                          value={myShopDetails.gst_no}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Upload Logo</label>
                        <div className="custom-file text-left">
                          <input
                            type="file"
                            name="company_logo"
                            id="company_logo"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg"
                            // accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            onChange={handleInputChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="company_logo"
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
                            myShopDetails?.company_logoimageURLObj ||
                            dummyShopLogo
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyShopLogo;
                          }}
                          alt=""
                        />
                      </div>
                      <div className="form-group">
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
                    </div>

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
                  <hr />
                  <button
                    onClick={handleUpdateMyShopInfo}
                    // type="submit"
                    className="btn btn-primary float-right"
                    // id="btn_update"
                  >
                    Update
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
      <div className="footer">
        <div className="row justify-content-between align-items-center">
          <div className="col mt-3">
            <span>Copyright © Zambet 2022</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerMyShopEdit;
