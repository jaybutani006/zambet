import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function RefundDetails() {
  const location = useLocation();
  const [state, dispatch] = useContext(Context);
  const [orderDetails, setOrderDetails] = useState(
    location?.state?.orderDetails
  );
  const [isRefundExist, setIsRefundExist] = useState(
    location?.state?.orderDetails?.product?.review.length === 0 ? false : true
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .gallery{\n        margin: 10px 50px;\n    }\n    .gallery img{\n        width:100px;\n        height: 100px;\n        padding: 5px;\n        filter: grayscale(100%);\n        transition: 1s;\n    }\n    .gallery img:hover{\n        filter: grayscale(0);\n        transform: scale(1.1);\n    }\n",
        }}
      />
      <div
        className="container pb-5 mb-2 mb-md-4 mt-3 rtl"
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
                    <Link to="/account-oder ">My order</Link>
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
                    <Link to="/user-account">Profile Info</Link>
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
          <section className="col-lg-9 mt-2 col-md-9">
            <div className="card box-shadow-sm">
              <div style={{ overflow: "auto" }}>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3 col-sm-2">
                        <img
                          className="d-block"
                          src={orderDetails?.product?.pphoto}
                          // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                          alt="VR Collection"
                          width={60}
                        />
                      </div>
                      <div className="col-9 col-sm-7 text-left">
                        <p>
                          {orderDetails?.product?.pname?.slice(0, 15) || "..."}
                        </p>
                        {/* <span>Variant : </span>
                        Amethyst-s */}
                      </div>
                      <div className="col-4 col-sm-3 text-left d-flex flex-column pl-0 mt-2 mt-sm-0 pl-sm-5">
                        <span>QTY : {orderDetails?.product?.qty || "..."}</span>
                        <span>
                          Price : ₹{orderDetails?.product?.pprice || "..."}
                        </span>
                        <span>Discount : ₹0</span>
                        <span>Tax : ₹0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <div className="row text-center">
                      <span className="col-sm-2">Subtotal: ₹0</span>
                      <span className="col-sm-5">Coupon discount: ₹0</span>
                      <span className="col-sm-5">
                        Total refundable amount:₹0
                      </span>
                    </div>
                  </div>
                </div>
                {isRefundExist && (
                  <div className="card mt-2">
                    <div className="card-body">
                      <div className="col-12">
                        <b>Refund id</b> :<span>8</span>
                      </div>
                      <div className="col-12">
                        <b>Refund status</b> :
                        <span
                          className="text-capitalize"
                          style={{ color: "coral" }}
                        >
                          {" "}
                          pending
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {!isRefundExist && (
                  <div className="card mt-2">
                    <div className="card-body">
                      <div className="row">
                        <form>
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="vSOPZsKzxJ1q2avVSWNuDuQiatO11S2NEY623H4M"
                          />
                          <input
                            type="hidden"
                            name="order_details_id"
                            defaultValue={142}
                          />
                          <input
                            type="hidden"
                            name="amount"
                            defaultValue={475}
                          />
                          <div className="col-12">
                            <div className="form-group">
                              <label className="input-label" htmlFor="name">
                                Refund reason
                              </label>
                              <textarea
                                className="form-control"
                                name="refund_reason"
                                cols={120}
                                required
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Attachment
                              </label>
                              <div className="row coba">
                                <div
                                  className="col-md-4 spartan_item_wrapper"
                                  data-spartanindexrow={0}
                                  style={{ marginBottom: "20px" }}
                                >
                                  <div style={{ position: "relative" }}>
                                    <div
                                      className="spartan_item_loader"
                                      data-spartanindexloader={0}
                                      style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "150px",
                                        background: "rgba(255,255,255, 0.7)",
                                        zIndex: 22,
                                        textAlign: "center",
                                        alignItems: "center",
                                        margin: "auto",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        display: "none",
                                        fontSize: "1.7em",
                                        color: "#CECECE",
                                      }}
                                    >
                                      <i className="fas fa-sync fa-spin" />
                                    </div>
                                    <label
                                      className="file_upload"
                                      style={{
                                        width: "100%",
                                        height: "150px",
                                        border: "2px dashed #ddd",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        overflow: "hidden",
                                        padding: "5px",
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "auto",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <a
                                        href="javascript:void(0)"
                                        data-spartanindexremove={0}
                                        style={{
                                          right: "3px",
                                          top: "3px",
                                          background: "rgb(229, 228, 237)",
                                          borderRadius: "3px",
                                          width: "30px",
                                          height: "30px",
                                          lineHeight: "30px",
                                          textAlign: "center",
                                          textDecoration: "none",
                                          color: "rgb(255, 7, 0)",
                                          position: "absolute !important",
                                        }}
                                        className="spartan_remove_row"
                                      >
                                        <i className="czi-close" />
                                      </a>
                                      <img
                                        style={{
                                          width: "100%",
                                          margin: "0px auto",
                                          verticalAlign: "middle",
                                          display: "none",
                                        }}
                                        data-spartanindexi={0}
                                        src="/assets/front-end/img/image-place-holder.png"
                                        className="spartan_image_placeholder"
                                      />{" "}
                                      <p
                                        data-spartanlbldropfile={0}
                                        style={{
                                          color: "#5FAAE1",
                                          display: "none",
                                          width: "auto",
                                        }}
                                      >
                                        Drop here
                                      </p>
                                      <img
                                        style={{
                                          width: "100%",
                                          verticalAlign: "middle",
                                        }}
                                        className="img_"
                                        data-spartanindeximage={0}
                                        src="data:image/jpeg;base64,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"
                                      />
                                      <input
                                        className="form-control spartan_image_input"
                                        accept="image/*"
                                        data-spartanindexinput={0}
                                        style={{ display: "none" }}
                                        name="images[]"
                                        type="file"
                                      />
                                    </label>{" "}
                                  </div>
                                </div>
                                <div
                                  className="col-md-4 spartan_item_wrapper"
                                  data-spartanindexrow={2}
                                  style={{ marginBottom: "20px" }}
                                >
                                  <div style={{ position: "relative" }}>
                                    <div
                                      className="spartan_item_loader"
                                      data-spartanindexloader={2}
                                      style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "150px",
                                        background: "rgba(255,255,255, 0.7)",
                                        zIndex: 22,
                                        textAlign: "center",
                                        alignItems: "center",
                                        margin: "auto",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        display: "none",
                                        fontSize: "1.7em",
                                        color: "#CECECE",
                                      }}
                                    >
                                      <i className="fas fa-sync fa-spin" />
                                    </div>
                                    <label
                                      className="file_upload"
                                      style={{
                                        width: "100%",
                                        height: "150px",
                                        border: "2px dashed #ddd",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        overflow: "hidden",
                                        padding: "5px",
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "auto",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <a
                                        href="javascript:void(0)"
                                        data-spartanindexremove={2}
                                        style={{
                                          right: "3px",
                                          top: "3px",
                                          background: "rgb(229, 228, 237)",
                                          borderRadius: "3px",
                                          width: "30px",
                                          height: "30px",
                                          lineHeight: "30px",
                                          textAlign: "center",
                                          textDecoration: "none",
                                          color: "rgb(255, 7, 0)",
                                          position: "absolute !important",
                                        }}
                                        className="spartan_remove_row"
                                      >
                                        <i className="czi-close" />
                                      </a>
                                      <img
                                        style={{
                                          width: "100%",
                                          margin: "0px auto",
                                          verticalAlign: "middle",
                                          display: "none",
                                        }}
                                        data-spartanindexi={2}
                                        src="/assets/front-end/img/image-place-holder.png"
                                        className="spartan_image_placeholder"
                                      />{" "}
                                      <p
                                        data-spartanlbldropfile={2}
                                        style={{
                                          color: "#5FAAE1",
                                          display: "none",
                                          width: "auto",
                                        }}
                                      >
                                        Drop here
                                      </p>
                                      <img
                                        style={{
                                          width: "100%",
                                          verticalAlign: "middle",
                                        }}
                                        className="img_"
                                        data-spartanindeximage={2}
                                        src="data:image/jpeg;base64,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"
                                      />
                                      <input
                                        className="form-control spartan_image_input"
                                        accept="image/*"
                                        data-spartanindexinput={2}
                                        style={{ display: "none" }}
                                        name="images[]"
                                        type="file"
                                      />
                                    </label>{" "}
                                  </div>
                                </div>
                                <div
                                  className="col-md-4 spartan_item_wrapper"
                                  data-spartanindexrow={3}
                                  style={{ marginBottom: "20px" }}
                                >
                                  <div style={{ position: "relative" }}>
                                    <div
                                      className="spartan_item_loader"
                                      data-spartanindexloader={3}
                                      style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "150px",
                                        background: "rgba(255,255,255, 0.7)",
                                        zIndex: 22,
                                        textAlign: "center",
                                        alignItems: "center",
                                        margin: "auto",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        display: "none",
                                        fontSize: "1.7em",
                                        color: "#CECECE",
                                      }}
                                    >
                                      <i className="fas fa-sync fa-spin" />
                                    </div>
                                    <label
                                      className="file_upload"
                                      style={{
                                        width: "100%",
                                        height: "150px",
                                        border: "2px dashed #ddd",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        overflow: "hidden",
                                        padding: "5px",
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "auto",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <a
                                        href="javascript:void(0)"
                                        data-spartanindexremove={3}
                                        style={{
                                          position: "absolute !important",
                                          right: "3px",
                                          top: "3px",
                                          display: "none",
                                          background: "#e5e4ed",
                                          borderRadius: "3px",
                                          width: "30px",
                                          height: "30px",
                                          lineHeight: "30px",
                                          textAlign: "center",
                                          textDecoration: "none",
                                          color: "#ff0700",
                                        }}
                                        className="spartan_remove_row"
                                      >
                                        <i className="czi-close" />
                                      </a>
                                      <img
                                        style={{
                                          width: "100%",
                                          margin: "0 auto",
                                          verticalAlign: "middle",
                                        }}
                                        data-spartanindexi={3}
                                        src="/assets/front-end/img/image-place-holder.png"
                                        className="spartan_image_placeholder"
                                      />{" "}
                                      <p
                                        data-spartanlbldropfile={3}
                                        style={{
                                          color: "#5FAAE1",
                                          display: "none",
                                          width: "auto",
                                        }}
                                      >
                                        Drop here
                                      </p>
                                      <img
                                        style={{
                                          width: "100%",
                                          verticalAlign: "middle",
                                          display: "none",
                                        }}
                                        className="img_"
                                        data-spartanindeximage={3}
                                      />
                                      <input
                                        className="form-control spartan_image_input"
                                        accept="image/*"
                                        data-spartanindexinput={3}
                                        style={{ display: "none" }}
                                        name="images[]"
                                        type="file"
                                      />
                                    </label>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {isRefundExist && (
                  <div className="row">
                    <div className="col-12">
                      <div className="card box-shadow-sm ">
                        <div style={{ overflow: "auto" }}>
                          <div className="card">
                            <div className="card-header">
                              <div
                                className="row"
                                style={{
                                  width: "100%",
                                }}
                              >
                                <div className="col-6">
                                  <h5>Refund reason</h5>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <p>adasd</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isRefundExist && (
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div style={{}}>
                          <div className="card">
                            <div className="card-header">
                              <h5>Attachment</h5>
                            </div>
                            <div className="row">
                              <div className="card-body">
                                <div className="gallery">
                                  <Link
                                    to="/storage/app/public/refund/2022-06-27-62b96ac9136c4.png"
                                    data-lightbox="mygallery"
                                  >
                                    <img
                                      src="https://6valley.6amtech.com/storage/app/public/refund/2022-06-27-62b96ac9136c4.png"
                                      alt=""
                                    />
                                  </Link>
                                  <Link
                                    to="/storage/app/public/refund/2022-06-27-62b96ac9138d4.png"
                                    data-lightbox="mygallery"
                                  >
                                    <img
                                      src="https://6valley.6amtech.com/storage/app/public/refund/2022-06-27-62b96ac9138d4.png"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default RefundDetails;
