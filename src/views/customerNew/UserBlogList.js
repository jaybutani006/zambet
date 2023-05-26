import "App.css";
import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import productImage from "assets/productImage.jpg";
import dummyBlogImage from "assets/dummyBlogImage.png";
import { defaultAPIErrorHandler } from "api/api";

function UserBlogList() {
  const [state, dispatch] = useContext(Context);
  const [blogList, setBlogList] = useState([]);
  const [resBlogList, setResBlogList] = useState([]);
  const [search, setSearch] = useState("");

  const getBlogList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/blog",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // Authorization: state.adminToken,
      },
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // alert("Blog Added Successfully");
        // navigate("/seller/dashboard", { replace: true });
        setBlogList(response.data.data || []);
        setResBlogList(response.data.data || []);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <div className="row mt-3" id="ajax-products">
        {!!blogList?.length &&
          blogList?.map((item) => (
            <div
              id={item._id}
              className="col-lg-3 col-md-4 col-sm-4 col-6  mb-2"
            >
              <div
                className="product-card card "
                style={{
                  marginBottom: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="card-header inline_product clickable"
                  style={{
                    cursor: "pointer",
                    maxHeight: "193px",
                    minHeight: "193px",
                  }}
                >
                  <div className="d-flex justify-content-end for-dicount-div-null">
                    <span className="for-discoutn-value-null" />
                  </div>
                  <div
                    className="d-flex d-block center-div element-center"
                    style={{ cursor: "pointer" }}
                  >
                    <Link to={`/blogs/view/${item?._id}`}>
                      <img
                        src={item?.image || productImage}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = productImage;
                        }}
                        style={{
                          width: "80%",
                          maxHeight: "215px",
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="card-body inline_product text-center p-1 clickable"
                  style={{ cursor: "pointer", maxHeight: "7.5rem" }}
                >
                  <div
                    style={{ position: "relative" }}
                    className="product-title1"
                  >
                    <Link to={`/blogs/view/${item?._id}`}>
                      {/* {(item?.pname && item?.pname.slice(0, 15)) || "3"} */}
                      <p
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {item?.title || "..."}
                      </p>
                    </Link>
                  </div>
                  <div className="justify-content-between text-center">
                    <p
                      style={{
                        color: "grey",
                        fontWeight: "500",
                        // wordBreak: "break-word",
                        // wordWrap: "break-word",
                        // whiteSpace: "nowrap",
                        overflow: "hidden",
                        // textOverflow: "clip",
                      }}
                    >
                      {item?.description?.slice(0, 50) || "..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!blogList?.length && (
          <div className="col-md-12">
            <center>
              <ClipLoader
                // color={"#ffffff"}
                // loading={!!camps}
                loading
                // cssOverride={override}
                // size={150}
              />
            </center>
          </div>
        )}

        <div className="col-12">
          <nav
            className="d-flex justify-content-between pt-2"
            aria-label="Page navigation"
            id="paginator-ajax"
          ></nav>
        </div>
      </div>
    </div>
  );
}

export default UserBlogList;
