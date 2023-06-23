import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SellerStaffEdit() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();

  const initialState = {
    selected: {
      ...location?.state,
    },
  };
  const [mainState, setMainState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name } = e.target;

    if (name === "photo") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 8) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files,
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 8)].map((item) =>
            URL.createObjectURL(item)
          );

          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: e.target.files,
              [`${name}imageURLObj`]: imageURLObj,
            },
            selectedError: {
              ...prev.selectedError,
              [name]: !e.target.files ? "Invalid or Empty" : "",
            },
          }));

          window.alert("At Max 8 Images are allowed");
        }
      }
    } else {
      if (name === "phone") {
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: e.target.value.slice(0, 10),
          },
          selectedError: {
            ...prev.selectedError,
            [name]: !e.target.value ? "Invalid or Empty" : "",
          },
        }));
      } else {
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: e.target.value,
          },
          selectedError: {
            ...prev.selectedError,
            [name]: !e.target.value ? "Invalid or Empty" : "",
          },
        }));
      }
    }
  };

  const handleUpdateStaffValidation = () => {
    let isValid = true;

    if (!mainState?.selected?.fullname) {
      alert("fullname can't be Empty");
      isValid = false;
    } else if (!mainState?.selected?.phone) {
      alert("phone can't be Empty");
      isValid = false;
    } else if (!mainState?.selected?.email) {
      alert("email can't be Empty");
      isValid = false;
    } else if (!mainState?.selected?.photo) {
      // alert("photo can't be Empty");
      // isValid = false;
    }

    return isValid;
  };

  const handleUpdateStaffAPI = () => {
    const formData = new FormData();
    formData.append("fullname", mainState.selected.fullname);
    formData.append("phone", mainState.selected.phone);
    formData.append("email", mainState.selected.email);
    if (!!mainState?.selected?.photo?.length) {
      formData.append("photo", mainState.selected.photo[0]);
    }

    // Object.keys(productDetails).forEach((key) => {
    //   console.log(key, productDetails[key]);
    //   if (key === "pphoto") {
    //     if (!!Array.from(productDetails[key]).length) {
    //       Array.from(productDetails[key]).map((item) =>
    //         formData.append(key, item)
    //       );
    //     }
    //     // console.log([...productDetails[key]]);
    //   } else if (
    //     key === "p_quantity" ||
    //     key === "display_price" ||
    //     key === "selling_price"
    //   ) {
    //     formData.append(key, parseInt(productDetails[key]));
    //   } else {
    //     formData.append(key, productDetails[key]);
    //   }
    // });
    //

    const config = {
      method: "put",
      url: process.env.REACT_APP_BASEURL + "/api/staff",
      params: {
        _id: location?.state?._id,
      },
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      data: JSON.stringify({
        fullname: mainState?.selected?.fullname,
        phone: mainState?.selected?.phone,
        email: mainState?.selected?.email,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        alert("Staff Updated Successfully");
        // navigate("/seller/dashboard", { replace: true });
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  const handleUpdateStaff = (e) => {
    e?.preventDefault();
    if (handleUpdateStaffValidation() === true) {
      handleUpdateStaffAPI();
    }
  };

  useEffect(() => {
    console.log(location.state);
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">
                <i className="tio-edit" /> Update Staff
              </h1>
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          className="form-control"
                          value={mainState?.selected?.fullname}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          // value={mainState?.city}
                          // onChange={handleInputChange}
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={mainState?.selected?.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          name="phone"
                          className="form-control"
                          value={mainState?.selected?.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      handleUpdateStaff(e);
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerStaffEdit;
