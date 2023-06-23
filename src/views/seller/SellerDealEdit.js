import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import dummyCategoryLogo from "assets/dummyCategoryLogo.png";
import dummyHomeBanner2 from "assets/dummyHomeBanner2.png";
import ClipLoader from "react-spinners/ClipLoader";
import SellerDashboardBreadCrumb from "components/header/SellerDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function SellerDealEdit() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const dealId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  //

  const initialState = {
    resDeal: { ...location?.state },
    selected: {
      name: "",
      description: "",
      type: "",
      photo: null,
      ...location?.state,
    },
    options: [
      {
        id: "",
        name: "Lightning Deal",
        value: "lightning_deal",
      },
      {
        id: "",
        name: "Best Deal",
        value: "best_deal",
      },
      {
        id: "",
        name: "Deal of the day",
        value: "deal_of_the_day",
      },
    ],
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "photo") {
      const imageURLObj = [...e.target.files].map((item) =>
        URL.createObjectURL(item)
      );
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: e.target.files,
          [`${name}ImageURLObj`]: imageURLObj,
        },
      }));
    } else if (name === "search") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
        dealList: searchFor(value, mainState.resDealList),
      }));
    } else {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [name]: value,
        },
      }));
    }
  };

  const getDealAPI = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/deal",
      headers: {
        Authorization: state.adminToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resDealList: response.data.data,
          dealList: response.data.data,
        }));
      })
      .catch(function (error) {
        // defaultAPIErrorHandler(error)
      });
  };

  const handleUpdateDeal = () => {
    if (!mainState.selected.name) {
      alert("name can't be empty");
      return;
    } else if (!mainState.selected.description) {
      alert("description can't be empty");
      return;
    } else if (!mainState.selected.type) {
      alert("type can't be empty");
      return;
    } else if (!(mainState.selected.photo instanceof FileList)) {
      // } else if (!(mainState.selected.photo instanceof File)) {
      // alert("photo is Invalid File");
      // return;
    }
    // console.log(1,mainState.selected.photo instanceof File);
    // console.log(2,!(mainState.selected.photo instanceof File));

    const formData = new FormData();
    if (mainState?.resDeal?.name != mainState?.selected?.name) {
      formData.append("name", mainState.selected.name);
    }
    if (mainState?.resDeal?.description != mainState?.selected?.description) {
      formData.append("description", mainState.selected.description);
    }
    if (mainState?.resDeal?.type != mainState?.selected?.type) {
      formData.append("type", mainState.selected.type);
    }
    if (mainState?.selected?.photo instanceof FileList) {
      formData.append("photo", mainState.selected.photo?.[0]);
    }

    axios({
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/deal",
      params: { _id: dealId },
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
        // Authorization: state.adminToken,
        // Authorization: state.userToken,
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
        setMainState((prev) => ({ ...prev, selected: {} }));
        alert("Deal Updated Successfully");
        // getDealAPI();
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    // getDealAPI();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <SellerDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Deals
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Deals form</div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a
                      className="nav-link lang_link active"
                      href="#"
                      id="en-link"
                    >
                      english(EN)
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder=""
                        onChange={handleInputChange}
                        value={mainState.selected.name || ""}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-5">
                    <div className="form-group  lang_form" id="en-form">
                      <label
                        className="input-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder=""
                        onChange={handleInputChange}
                        value={mainState.selected.description || ""}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="form-group">
                      <label className="input-label" htmlFor="priority">
                        Type
                        <span>
                          <i
                            className="m-1 tio-info-outined"
                            title="The lowest number will get the highest priority"
                          />
                        </span>
                      </label>
                      <select
                        className="form-control"
                        name="type"
                        onChange={handleInputChange}
                        value={mainState?.selected?.type || ""}
                      >
                        <option value="" selected disabled>
                          ---Select---
                        </option>
                        {mainState?.options?.length &&
                          mainState?.options.map((item) => (
                            <option
                              value={item?.value}
                              selected={
                                item?.value === mainState?.selected?.type
                              }
                            >
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 from_part_2">
                    <label>Image</label>
                    <small style={{ color: "red" }}>* ( Ratio 9:16 )</small>
                    <div className="custom-file" style={{ textAlign: "left" }}>
                      <input
                        type="file"
                        name="photo"
                        id="customFileEg1"
                        className="custom-file-input"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        onChange={handleInputChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileEg1"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>
                  <div className="col-12 from_part_2">
                    <div className="form-group">
                      <hr />
                      <center>
                        <img
                          style={{
                            maxWidth: "80vw",
                            maxHeight: "30vh",
                            aspectRatio: "16/9",
                            border: "1px solid",
                            borderRadius: "10px",
                          }}
                          id="viewer"
                          src={
                            mainState.selected.photoImageURLObj ||
                            mainState.selected.image ||
                            "/assets/back-end/img/900x400/img1.jpg"
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                              "/assets/back-end/img/900x400/img1.jpg";
                          }}
                          alt="image"
                        />
                      </center>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  className="btn btn-primary"
                  // onClick={handleAddCategory}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateDeal();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerDealEdit;
