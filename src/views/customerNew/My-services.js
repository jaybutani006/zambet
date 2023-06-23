// import "App.css";
import axios from "axios";
import { Context } from "context/newContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISOToIST } from "utils/DateTime";
import Rating from "react-rating";
import dummyProductImage from "assets/dummyProductImage.png";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

function ContactUs() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [mainState, setMainState] = useState({
    resAllMyOrder: [],
    allMyOrder: [],
    // productId: location?.pathname?.substring(location?.pathname?.lastIndexOf("/") + 1) || "",
  });
    const [serviceList, setServiceList] = useState();
  const apiGetAllOrder = () => {
    setLoader(true);
    // let data = "62567c080c134686e839876b";

    let config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/service_booking",
      headers: {
        Authorization: state.userToken,
        // "Content-Type": "text/plain",
      },
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllMyOrder: response?.data?.data,
          allMyOrder: response?.data?.data,
        }));
          setServiceList(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const sortBy = (value) => {
    if (value === "old_first") {
      setMainState((prev) => ({
        ...prev,
        allMyOrder: prev.allMyOrder?.sort((a, b) => {
          return (
            new Date(a?.Master?.order_date_time) -
            new Date(b?.Master?.order_date_time)
          );
        }),
      }));
    } else if (value === "new_first") {
      setMainState((prev) => ({
        ...prev,
        allMyOrder: prev.allMyOrder?.sort((a, b) => {
          return (
            new Date(b?.Master?.order_date_time) -
            new Date(a?.Master?.order_date_time)
          );
        }),
      }));
    }
  };

  useEffect(() => {
    if (!state.isUserLoggedIn) {
      navigate("/customer/auth/login", { replace: true });
      return;
    }
    apiGetAllOrder();
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        .widget-categories .accordion-heading > a:hover {\n            color: #FFD5A4 !important;\n        }\n\n        .widget-categories .accordion-heading > a {\n            color: #FFD5A4;\n        }\n\n        body {\n            font-family: 'Titillium Web', sans-serif;\n        }\n\n        .card {\n            border: none\n        }\n\n        .totals tr td {\n            font-size: 13px\n        }\n\n        .product-qty span {\n            font-size: 14px;\n            color: #6A6A6A;\n        }\n\n        .spandHeadO {\n            color: #FFFFFF !important;\n            font-weight: 600 !important;\n            font-size: 14px;\n\n        }\n\n        .tdBorder {\n            border- right: 1px solid #f7f0f0;\n            text-align: center;\n        }\n\n        .bodytr {\n            text-align: center;\n            vertical-align: middle !important;\n        }\n\n        .sidebar h3:hover + .divider-role {\n            border-bottom: 3px solid #3b71de                                   !important;\n            transition: .2s ease-in-out;\n        }\n\n        tr td {\n            padding: 10px 8px !important;\n        }\n\n        td button {\n            padding: 3px 13px !important;\n        }\n\n        @media (max-width: 600px) {\n            .sidebar_heading {\n                background: #3b71de;\n            }\n\n            .orderDate {\n                display: none;\n            }\n\n            .sidebar_heading h1 {\n                text-align: center;\n                color: aliceblue;\n                padding-bottom: 17px;\n                font-size: 19px;\n            }\n        }\n    ",
        }}
      />

      <div className="container">
        <div className="row">
          <div
            className="col-12"
            style={{
              width: "93%",
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div id="loading" style={{ display: "none" }}>
              <img width={200} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container rtl" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-9 sidebar_heading">
            <h1 className="h3  mb-0 float-left headerTitle">My order</h1>
          </div>
        </div>
      </div> */}

      <div
        className="container pb-5 mb-2 mb-md-4 mt-3 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n        font-family: 'Titillium Web', sans-serif\n    }\n\n    .footer span {\n        font-size: 12px\n    }\n\n    .product-qty span {\n        font-size: 12px;\n        color: #6A6A6A;\n    }\n\n    label {\n        font-size: 16px;\n    }\n\n    .divider-role {\n        border-bottom: 1px solid whitesmoke;\n    }\n\n    .sidebarL h3:hover + .divider-role {\n        border-bottom: 3px solid #f7931e    !important;\n        transition: .2s ease-in-out;\n    }\n\n    .price_sidebar {\n        padding: 20px;\n    }\n\n    @media (max-width: 600px) {\n\n        .sidebar_heading h1 {\n            text-align: center;\n            color: aliceblue;\n            padding-bottom: 17px;\n            font-size: 19px;\n        }\n\n        .sidebarR {\n            padding: 24px;\n        }\n\n        .price_sidebar {\n            padding: 20px;\n        }\n    }\n\n",
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
              <div className="sidebarL">
                <h3 className="widget-title btnF" style={{ fontWeight: 700 }}>
                  <Link className="active-menu" to="/account-service">
                    My Services
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
              <div className="pb-0">
                <div className="sidebarL">
                  <h3
                    className="widget-title btnF "
                    style={{ fontWeight: 700 }}
                  >
                    <Link className to="/wishlists">
                      {" "}
                      Wish List{" "}
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
                    <Link className to="/account-address">
                      Address{" "}
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
            </div>
          </div>
          <section className="col-lg-9 mt-2 col-md-9">
            {/* <div className="row m-2">
              <div className="col-md-6">
                <select
                  title="sort by"
                  name="sortby"
                  className="form-control"
                  onChange={(e) => {
                    sortBy(e.target.value);
                  }}
                >
                  <option value="">Select Sort</option>
                  <option value="old_first">Oldest First</option>
                  <option value="new_first">Newest First</option>
                </select>
              </div>
              <div className="col-md-6">
                <select title="filter by" className="form-control">
                  <option value="">Select Year</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div> */}
            <div className="card box-shadow-sm">
              <div style={{ overflow: "auto" }}>
                <table
                  id="datatable"
                  className="table text-center table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                >
                  <thead>
                    <tr style={{ backgroundColor: "#6b6b6b" }}>
                      <td className="tdBorder">
                        <div className="py-2">
                          <span className="d-block spandHeadO ">
                            service_provider_id
                          </span>
                        </div>
                      </td>
                      <td className="tdBorder">
                        <div className="py-2">
                          <span className="d-block spandHeadO">
                            ocation_name
                          </span>
                        </div>
                      </td>
                      <td className="tdBorder">
                        <div className="py-2">
                          <span className="d-block spandHeadO">
                            {" "}
                            oction_time
                          </span>
                        </div>
                      </td>
                      <td className="tdBorder">
                        <div className="py-2">
                          <span className="d-block spandHeadO">
                            {" "}
                            oction_date
                          </span>
                        </div>
                      </td>
                      <td className="tdBorder">
                        <div className="py-2">
                          <span className="d-block spandHeadO">
                            {" "}
                            ocation_place
                          </span>
                        </div>
                      </td>
                      <td className="tdBorder">
                        <div className="py-2">
                          <span className="d-block spandHeadO"> status</span>
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceList?.length > 0 &&
                      serviceList.map((item) => (
                        <tr key={item._id} className="text-center">
                          <td>{item.service_provider_id}</td>
                          <td>{item.ocation_name}</td>
                          <td>{item.oction_time}</td>
                          <td>{item.oction_date}</td>
                          <td>{item.ocation_place}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {loader && (
                  <>
                    <div className="col-12">
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
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default ContactUs;
