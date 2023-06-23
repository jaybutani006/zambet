import axios from "axios";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { defaultAPIErrorHandler } from "api/api";

function SubmitReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [star, setStar] = useState(0);
  const [productId, setProductId] = useState(location?.state?.pid);
  const [review, setReview] = useState("");
  const [tempState, setTempState] = useState({
    images: null,
    imageURLObj: [],
  });

  const handleInputChange = (e) => {
    const { name } = e.target;

    if (name === "images") {
      if (e.target.files && !!e.target.files.length) {
        if (e.target.files.length <= 8) {
          const imageURLObj = [...e.target.files].map((item) =>
            URL.createObjectURL(item)
          );
          setTempState((prev) => ({
            ...prev,
            [name]: e.target.files,
            imageURLObj: imageURLObj,
          }));
        } else {
          const imageURLObj = [...[...e.target.files].slice(0, 8)].map((item) =>
            URL.createObjectURL(item)
          );

          setTempState((prev) => ({
            ...prev,
            [name]: e.target.files,
            imageURLObj: imageURLObj,
          }));

          window.alert("At Max 8 Images are allowed");
        }
      }
    }
  };

  const handleSubmitReview = () => {
    const formData = new FormData();
    formData.append("Product_id", productId);
    formData.append("Star", star);
    formData.append("Review", review);
    if (tempState?.images) {
      Array.from(tempState.images).map((item) =>
        formData.append("review_image", item)
      );
      // formData.append("review_image", tempState.images);
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/reviews",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: state.userToken,
      },
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        if (window.confirm("Review Submitted Successfully")) {
          navigate(-1);
        }
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  return (
    <>
      <div
        className="container pb-5 mb-2 mb-md-4 mt-2 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n        font-family: sans-serif;\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    label {\n        font-size: 16px;\n    }\n\n    .divider-role {\n        border-bottom: 1px solid whitesmoke;\n    }\n\n    .sidebarL h3:hover + .divider-role {\n        border-bottom: 3px solid #d7b771    !important;\n        transition: .2s ease-in-out;\n    }\n\n    .price_sidebar {\n        padding: 20px;\n    }\n\n    @media (max-width: 600px) {\n\n        .sidebar_heading h1 {\n            text-align: center;\n            color: aliceblue;\n            padding-bottom: 17px;\n            font-size: 19px;\n        }\n\n        .sidebarR {\n            padding: 24px;\n        }\n\n        .price_sidebar {\n            padding: 20px;\n        }\n    }\n\n",
            }}
          />
          <div className="sidebarR col-lg-3 col-md-3">
            <div
              className="price_sidebar rounded-lg box-shadow-sm"
              id="shop-sidebar"
              style={{ marginBottom: "-10px", background: "white" }}
            >
              <div className="box-shadow-sm"></div>
              <div className="pb-0" style={{ paddingTop: "12px" }}>
                <div className="sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className to="/account-oder ">
                      My order
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className="sidebarL">
                  <h3
                    className="widget-title btnF "
                    style={{ fontWeight: 700 }}
                  >
                    <Link to="/wishlists"> Wish List </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link className to="/user-account">
                      Profile Info
                    </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="pb-0">
                <div className=" sidebarL">
                  <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                    <Link to="/account-address">Address </Link>
                  </h3>
                  <div
                    className="divider-role"
                    style={{
                      border: "1px solid whitesmoke",
                      marginBottom: "14px",
                      marginTop: "-6px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <section className="col-lg-9  col-md-9">
            <div className="card">
              <div className="card-header">
                <h5 style={{ marginLeft: "20px" }}>Submit a review</h5>
              </div>
              <div className="card-body">
                <form>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="vSOPZsKzxJ1q2avVSWNuDuQiatO11S2NEY623H4M"
                  />{" "}
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1 mb-4">Rating</label>
                      <br />
                      <Rating
                        fractions={2}
                        initialRating={star}
                        style={{ color: "#fea569" }}
                        // emptySymbol="fa fa-star-o mr-1"
                        // fullSymbol="fa fa-star mr-1"
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        onClick={(val) => setStar(val)}
                        // onHover={(val) => setStar(val)}
                      />
                      {/* <select
                        className="form-control"
                        name="rating"
                        onChange={(e) => setStar(e.target.value)}
                      >
                        <option value={"1.0"}>1</option>
                        <option value={"2.0"}>2</option>
                        <option value={"3.0"}>3</option>
                        <option value={"4.0"}>4</option>
                        <option value={"5.0"}>5</option>
                      </select> */}
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Comment</label>
                      <input name="product_id" defaultValue={1} hidden />
                      <input name="order_id" defaultValue={100120} hidden />
                      <textarea
                        className="form-control"
                        name="comment"
                        defaultValue={""}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Attachment</label>
                      <input
                        className="mt-2"
                        // className="form-control spartan_image_input"
                        accept="image/*"
                        // data-spartanindexinput={0}
                        style={{ display: "block" }}
                        // name="images[]"
                        placeholder="Choose Product Images"
                        name="images"
                        type="file"
                        multiple
                        onChange={handleInputChange}
                      />
                    </div>
                    {!!tempState && !!tempState.imageURLObj.length ? (
                      <div className="card mt-2 rest-part">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12 mb-4">
                              {!!tempState && !!tempState.imageURLObj.length
                                ? tempState.imageURLObj.map((item, index) => (
                                    // <div
                                    //   style={{
                                    //     width: "64px",
                                    //     height: "64px",
                                    //     border: "solid",
                                    //   }}
                                    // >
                                    <img
                                      src={item}
                                      // style={{
                                      //   width: "100%",
                                      //   height: "100%",
                                      //   objectFit: "contain",

                                      //   width: "90px",
                                      //   // margin: "0 auto",
                                      //   // verticalAlign: "middle",
                                      // }}

                                      style={{
                                        // maxWidth: "25%",
                                        // maxHeight: "25%",
                                        // minWidth: "25%",
                                        // minHeight: "25%",
                                        width: "25%",
                                        height: "25vh",
                                        objectFit: "cover",
                                        padding: "2px",
                                      }}
                                      // className="spartan_image_placeholder"
                                      alt=""
                                      key={index}
                                    />
                                    // </div>
                                  ))
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="modal-footer">
                    <Link
                      to="/account-order-details?id=100120"
                      className="btn btn-secondary"
                    >
                      Back
                    </Link>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmitReview();
                      }}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default SubmitReview;
