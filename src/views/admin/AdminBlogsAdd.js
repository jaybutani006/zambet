import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminBlogsAdd(props) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  const location = useLocation();

  const initialState = {
    ...location?.state,
    title: "",
    description: "",
    content: "",
    photo: null,
    photoimageURLObj: null,
    // ...location?.state,
  };
  const [mainState, setMainState] = useState(initialState);

  const handleQuillChange = (val) => {
    setMainState((prev) => ({
      ...prev,
      selected: {
        ...prev.selected,
        content: val,
      },
    }));
  };

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
              [name]: e.target.files?.slice(0, 8),
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
  };

  const handleAddBlogValidation = () => {
    let isValid = true;

    if (!mainState?.selected?.title) {
      alert("title can't be Empty");
      isValid = false;
    } else if (!mainState?.selected?.description) {
      alert("description can't be Empty");
      isValid = false;
    } else if (!mainState?.selected?.content) {
      alert("content can't be Empty");
      isValid = false;
    } else if (!mainState?.selected?.photo) {
      alert("photo can't be Empty");
      isValid = false;
    }

    return isValid;
  };
  const handleAddBlogAPI = () => {
    const formData = new FormData();
    formData.append("title", mainState.selected.title);
    formData.append("description", mainState.selected.description);
    formData.append("content", mainState.selected.content);
    formData.append("photo", mainState.selected.photo[0]);

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
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/blog",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState({ ...initialState });
        alert("Blog Added Successfully");
        // navigate("/seller/dashboard", { replace: true });
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };
  const handleAddBlog = (e) => {
    e.preventDefault();

    if (handleAddBlogValidation() === true) {
      handleAddBlogAPI();
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
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {"Blog"}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between pl-4 pr-4">
                  <div>
                    <h2>{"Blog"}</h2>
                  </div>
                </div>
              </div>
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label
                      className="input-label"
                      htmlFor="exampleFormControlInput1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="title"
                      onChange={handleInputChange}
                      value={mainState?.selected?.title || ""}
                    />
                  </div>
                  <div className="form-group">
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
                      placeholder="description"
                      onChange={handleInputChange}
                      value={mainState?.selected?.description || ""}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-6">
                        <label>Image</label>
                        <small style={{ color: "red" }}>* ( Ratio 3:1 )</small>
                        <div
                          className="custom-file"
                          style={{ textAlign: "left" }}
                        >
                          <input
                            type="file"
                            name="photo"
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
                      <div className="col-6">
                        <center>
                          <img
                            style={{
                              width: "100%",
                              maxWidth: "400px",
                              border: "1px solid",
                              borderRadius: "10px",
                            }}
                            id="viewer"
                            src={
                              mainState?.selected?.photoimageURLObj ||
                              "/assets/back-end/img/900x400/img1.jpg"
                            }
                            alt="image"
                          />
                        </center>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    {/* <div className="col-md-12"> */}
                    <ReactQuill
                      theme="snow"
                      value={mainState?.selected?.content}
                      onChange={handleQuillChange}
                    // onChange={(editor) => console.log(editor)}
                    />
                    {/* </div> */}
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        className="form-control btn-primary"
                        onClick={(e) => handleAddBlog(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBlogsAdd;
