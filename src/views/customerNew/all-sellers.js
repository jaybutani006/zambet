// import "App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import dummyProductImage from "assets/dummyProductImage.png";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { defaultAPIErrorHandler } from "api/api";

function AllSellers() {
  const [mainState, setMainState] = useState({
    resAllSellers: [],
  });

  const apiGetAllSellers = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/user/sellerdata",
      headers: {},
    })
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllSellers: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetAllSellers();
  }, []);

  return (
    <>
      <div
        className="modal-quick-view modal fade "
        id="quick-view"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content" id="quick-view-modal"></div>
        </div>
      </div>

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
              <img
                width={200}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-md-4">
        <div className="row mt-3 mb-3 border-bottom">
          <div className="col-md-8">
            <h4 className="mt-2">All Sellers</h4>
          </div>
          {/* <div className="col-md-4">
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Shop name"
                  name="shop_name"
                  required
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
        <div className="row">
          <section className="col-lg-12">
            <div className="row mx-n2" style={{ minHeight: "200px" }}>
              {mainState.resAllSellers.length ? (
                mainState.resAllSellers.map((item) => (
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6 px-2 pb-4 text-center">
                    <div className="card-body shadow">
                      <Link to={`/shopView/${item._id}`}>
                        <img
                          style={{
                            verticalAlign: "middle",
                            height: "6rem",
                            borderRadius: "3%",
                          }}
                          src={
                            item?.vendor_detail?.[0]?.company_logo ||
                            dummyProductImage
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyProductImage;
                          }}
                          alt=""
                        />
                        <div className="text-center text-dark">
                          <span className="text-center font-weight-bold small p-1">
                            {`${item?.vendor_detail?.[0]?.company_name}`}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
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
              )}
            </div>
            <div className="row mx-n2">
              <div className="col-md-12">
                <center></center>
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

export default AllSellers;
