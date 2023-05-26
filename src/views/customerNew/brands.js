// import "App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import dummyBrandLogo from "assets/image-place-holder.png";

import { Link } from "react-router-dom";
import { defaultAPIErrorHandler } from "api/api";

function Brands() {
  const [mainState, setMainState] = useState({
    resAllBrands: [],
  });

  const apiGetAllBrands = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/brand",
      headers: {},
    })
      .then((response) => {
        console.log(response.data);
        setMainState((prev) => ({
          ...prev,
          resAllBrands: response.data.data,
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    apiGetAllBrands();
  }, []);

  return (
    <>
      <div
        className="container pb-5 mb-2 mb-md-4 rtl"
        style={{ textAlign: "left" }}
      >
        <div className="row">
          <div className="col-md-12 p-3 feature_header">
            <span>Brands</span>
          </div>
        </div>
        <div className="row">
          <section className="col-lg-12">
            <div className="row mx-n2">
              {!!mainState.resAllBrands.length &&
                mainState.resAllBrands.map((item) => (
                  <div
                    id={item._id}
                    className="col-lg-2 col-md-3 col-sm-4 col-6 px-2 pb-4 text-center"
                  >
                    <Link
                      to={`/products?brandId=${item._id}&data_from=brand&page=1`}
                    >
                      <div
                        className="brand_div d-flex align-items-center justify-content-center"
                        style={{ height: "200px" }}
                      >
                        <img
                          src={item?.brand_photo || dummyBrandLogo}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = dummyBrandLogo;
                          }}
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            <hr className="my-3" />
            <div className="row mx-n2">
              <div className="col-md-12">
                <center>
                  {!mainState.resAllBrands.length && (
                    <ClipLoader
                      // color={"#ffffff"}
                      // loading={!!camps}
                      loading
                      // cssOverride={override}
                      // size={150}
                    />
                  )}
                </center>
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

export default Brands;
