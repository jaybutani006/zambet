import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";

import { Context } from "context/newContext";

import ReactQuill from "react-quill";
import productImage from "assets/productImage.jpg";
import "./AdminBlogsView.css";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";

function AdminBlogsView(props) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const blogId =
    location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) ||
    "";
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const getBlog = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/blog",
      params: {
        blogId: blogId,
      },
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // Authorization: state.adminToken,
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        // navigate("/admin/dashboard", { replace: true });
        // setPolicyList(Object.entries(response.data.data?.[0]));
        // setResPolicyList({ ...response.data.data?.[0] });
        // setBlogContent(response.data.data?.[0]?.[policyType]);
        setBlogTitle(response.data?.data?.title);
        setBlogDescription(response.data?.data?.description);
        setBlogContent(response.data?.data?.content);
        setBlogImage(response.data?.data?.image);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <main
      id="content"
      role="main"
      className="pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {blogTitle || "..."}
            </li>
          </ol>
        </nav>

        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            <div className="card">
              <div
                className="card-body"
                style={{
                  width: "100%",
                }}
              >
                <h1
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  {blogTitle || "..."}
                </h1>
                <h6
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  {blogDescription || "..."}
                </h6>
                {/* <div className="flex-container"> */}
                <div className="flex-item">
                  <img
                    style={{
                      maxWidth: "100%",
                    }}
                    src={blogImage || productImage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = productImage;
                    }}
                    // src="https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
                  />
                  <div
                    className="info-container"
                    dangerouslySetInnerHTML={{
                      __html: blogContent || "",
                    }}
                  ></div>
                </div>
                {/* </div> */}

                {/* <div className="form-group">
                    <div className="col-md-12">
                      <input
                        className="form-control btn-primary"
                        // type="submit"
                        // title="Submit"
                        onClick={(e) => e.preventDefault()}
                        value="Submit"
                      />
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBlogsView;
