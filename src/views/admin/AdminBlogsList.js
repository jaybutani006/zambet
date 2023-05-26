import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { Context } from "context/newContext";
import productImage from "assets/productImage.jpg";
import { searchFor } from "utils/search-through-all-values-in-objects";
import ClipLoader from "react-spinners/ClipLoader";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { defaultAPIErrorHandler } from "api/api";

function AdminBlogsList() {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(Context);
  const [blogList, setBlogList] = useState([]);
  const [resBlogList, setResBlogList] = useState([]);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => { };

  const handleDeleteBlog = (blogId, index) => {
    if (
      window.confirm(
        `Are you sure you want to delete blog ${blogList?.[index]?.title || ""}`
      )
    ) {
      const config = {
        method: "delete",
        url: process.env.REACT_APP_BASEURL + "/api/blog",
        params: {
          _id: blogId,
        },
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: state.adminToken,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data);
          // alert("Blog Added Successfully");
          // navigate("/seller/dashboard", { replace: true });
          getBlogList();
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    } else {
      console.log("Cancel");
    }
  };

  const getBlogList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/blog",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
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
              Blogs
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                  <div className="col-12 mb-1 col-md-4">
                    <h5>Blogs</h5>
                  </div>
                  <div className="col-12 mb-1 col-md-5">
                    <form>
                      <div className="input-group input-group-merge input-group-flush">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="tio-search" />
                          </div>
                        </div>
                        <input
                          id="datatableSearch_"
                          type="search"
                          name="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          onChange={handleInputChange}
                          value={search}
                        />
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="btn btn-primary"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 mb-1 col-md-3">
                    <Link to={"/admin/blogs/add"} className="btn btn-primary">
                      Add Blog
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <table
                    id="datatable"
                    // style={{
                    //   textAlign: "center",
                    //   tableLayout: "fixed",
                    //   display: "block",
                    //   height: "50vh",
                    //   overflowY: "scroll",
                    // }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "10%" }}>SL#</th>
                        <th style={{ width: "40%" }}>Blog Title</th>
                        <th style={{ width: "40%" }}>Blog Photo</th>
                        {/* <th style={{ width: "10%" }}>Active Status</th> */}
                        <th style={{ width: "10%" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (
                        <tr>
                          <td colSpan={"100%"}>
                            <center>
                              <ClipLoader
                                // color={"#ffffff"}
                                // loading={!!camps}
                                loading
                              // cssOverride={override}
                              // size={150}
                              />
                            </center>
                          </td>
                        </tr>
                      )}
                      {!!blogList.length &&
                        blogList.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            {/* <td
                              style={{
                                width: "2vw",
                                textAlign: "center",
                              }}
                            >
                              <label
                                className={`badge badge-${
                                  item.verifyStatus === "Approved"
                                    ? "success"
                                    : item.verifyStatus === "Denied"
                                    ? "danger"
                                    : "warning"
                                }`}
                              >
                                {item.verifyStatus}
                              </label>
                              <img
                                src={item.pphoto}
                                style={{
                                  width: "2vw",
                                }}
                              ></img>
                            </td> */}
                            <td
                              style={{
                                textAlign: "left",
                                whiteSpace: "unset",
                              }}
                            >
                              {item?.title}
                              {/* <Link
                                to={`/admin/blogs/view/${index + 1}`}
                                state={item}
                              >
                                {item.pname}
                              </Link> */}
                            </td>
                            <td>
                              <img
                                // width={"80%"}
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                  width: "100%",
                                  // margin: "10px",
                                }}
                                src={item?.image || productImage}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = productImage;
                                }}
                              />
                            </td>
                            {/* <td>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  className="status"
                                  id={13}
                                  name="status"
                                  // defaultChecked
                                  // checked={
                                  //   !!item?.product_status ? true : false
                                  // }
                                  // onChange={(e) => handleInputChange(e, index)}
                                />
                                <span className="slider round" />
                              </label>
                            </td> */}
                            <td>
                              <Link
                                className="btn btn-primary btn-sm m-1"
                                to={`/admin/blogs/view/${item?._id}`}
                                state={item}
                              >
                                <i className="tio-visible" />
                                View
                              </Link>
                              <Link
                                className="btn btn-primary btn-sm m-1"
                                to={`/admin/blogs/edit/${item?._id}`}
                                state={item}
                              >
                                <i className="tio-edit" />
                                Edit
                              </Link>
                              <Link
                                className="btn btn-danger btn-sm m-1"
                                to="#"
                                onClick={() => {
                                  handleDeleteBlog(item?._id, index);
                                }}
                              >
                                <i className="tio-add-to-trash" /> Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer"></div>
              {!blogList?.length && (
                <div className="text-center p-4">
                  <img
                    className="mb-3"
                    src="/assets/back-end/svg/illustrations/sorry.svg"
                    alt="Image Description"
                    style={{ width: "7rem" }}
                  />
                  <p className="mb-0">No data to show</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBlogsList;
