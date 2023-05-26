import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyShopLogo from "assets/dummyShopLogo.png";
import dummyShopBanner from "assets/dummyShopBanner.png";
import { defaultAPIErrorHandler } from "api/api";

function SellerMyShop() {
  const [state, dispatch] = useContext(Context);
  const initialState = {
    shopLogo: "",
    shopBanner: "",
    shopName: "",
    shopPhoneNum: "",
    shopAddress: "",
    //
    shopEmail: "",
    shopWebsite: "",
    shopGSTNum: "",
    shopState: "",
    shopCity: "",
    //
    bankName: "",
    bankBranchName: "",
    bankAccHolderName: "",
    bankAccNum: "",
    //
    bankIFSCCode: "",
    bankBranchCode: "",
    bankCIFNum: "",
  };
  const [mainState, setMainState] = useState(initialState);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/bankdetail",
      headers: {
        Authorization: state.sellerToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.data && response.data.data.length) {
          setMainState((prev) => ({
            ...prev,
            shopLogo: response.data.data[0]?.company_logo,
            shopBanner: response.data.data[0]?.shop_banner,
            shopName: response.data.data[0]?.company_name,
            shopPhoneNum: response.data.data[0]?.company_phone,
            shopAddress: response.data.data[0]?.company_address,
            //
            shopEmail: response.data.data[0]?.company_email_address,
            shopWebsite: response.data.data[0]?.company_website,
            shopGSTNum: response.data.data[0]?.gst_no,
            shopState: response.data.data[0]?.state,
            shopCity: response.data.data[0]?.city,
            //
            bankName: response.data.data[0]?.Bankdetail?.bank_name,
            bankBranchName: response.data.data[0]?.Bankdetail?.branch_name,
            bankAccHolderName: response.data.data[0]?.Bankdetail?.holder_name,
            bankAccNum: response.data.data[0]?.Bankdetail?.account_no,
            //
            bankIFSCCode: response.data.data[0]?.Bankdetail?.ifsc_code,
            bankBranchCode: response.data.data[0]?.Bankdetail?.branch_code,
            bankCIFNum: response.data.data[0]?.Bankdetail?.cif_no,
          }));
        }
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   setMainState((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleEditBankInfo = () => {};
  // const handleEditShopInfo = () => {};

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
                <h3 className="h3 mb-0  ">My shop Info </h3>
              </div>
              <div className="card-body">
                <div className="row mt-2">
                  <div className="col-12">
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
                        src={mainState?.shopBanner || dummyShopBanner}
                        onError={({ currentTarget }) => {
                          currentTarget.src = dummyShopBanner;
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 align-items-center justify-content-center d-flex">
                    <img
                      src={mainState?.shopLogo || dummyShopLogo}
                      onError={({ currentTarget }) => {
                        currentTarget.src = dummyShopLogo;
                      }}
                      className="rounded-circle border"
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                  <div className="col-md-6 text-left mt-4">
                    <div className="flex-start">
                      <h4 style={{ display: "inline-block" }}>Name : </h4>
                      <h4 className="mx-1" style={{ display: "inline-block" }}>
                        {mainState.shopName ? mainState.shopName : "..."}
                      </h4>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Phone : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopPhoneNum
                          ? mainState.shopPhoneNum
                          : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Email : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopEmail ? mainState.shopEmail : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Website : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopWebsite ? mainState.shopWebsite : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>GST No. : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopGSTNum ? mainState.shopGSTNum : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>Address : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopAddress ? mainState.shopAddress : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>State : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopState ? mainState.shopState : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <h6 style={{ display: "inline-block" }}>City : </h6>
                      <h6 style={{ display: "inline-block" }} className="mx-1">
                        {mainState.shopCity ? mainState.shopCity : "..."}
                      </h6>
                    </div>
                    <div className="flex-start">
                      <Link
                        className="btn btn-primary"
                        to="/seller/shop/edit/1"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                  {/* <div className="col-md-5" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-header">
                <h3 className="h3 mb-0  ">My bank info </h3>
              </div>
              <div className="card-body">
                <div className="col-md-8 mt-4">
                  <div className="flex-start">
                    <h4 style={{ display: "inline-block" }}>Bank name : </h4>
                    <h4 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankName ? mainState.bankName : "..."}
                    </h4>
                  </div>
                  <div className="flex-start">
                    <h6 style={{ display: "inline-block" }}>Branch : </h6>
                    <h6 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankBranchName
                        ? mainState.bankBranchName
                        : "..."}
                    </h6>
                  </div>
                  <div className="flex-start">
                    <h6 style={{ display: "inline-block" }}>Holder name : </h6>
                    <h6 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankAccHolderName
                        ? mainState.bankAccHolderName
                        : "..."}
                    </h6>
                  </div>
                  <div className="flex-start">
                    <h6 style={{ display: "inline-block" }}>Account no : </h6>
                    <h6 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankAccNum ? mainState.bankAccNum : "..."}
                    </h6>
                  </div>
                  <div className="flex-start">
                    <h6 style={{ display: "inline-block" }}>IFSC Code : </h6>
                    <h6 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankIFSCCode ? mainState.bankIFSCCode : "..."}
                    </h6>
                  </div>
                  <div className="flex-start">
                    <h6 style={{ display: "inline-block" }}>Branch Code : </h6>
                    <h6 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankBranchCode
                        ? mainState.bankBranchCode
                        : "..."}
                    </h6>
                  </div>
                  <div className="flex-start">
                    <h6 style={{ display: "inline-block" }}>CIF No. : </h6>
                    <h6 style={{ display: "inline-block" }} className="mx-1">
                      {mainState.bankCIFNum ? mainState.bankCIFNum : "..."}
                    </h6>
                  </div>
                  <Link
                    className="btn btn-primary"
                    to="/seller/profile/bank-edit/1"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerMyShop;
