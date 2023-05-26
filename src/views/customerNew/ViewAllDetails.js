import React, { useState, useEffect } from "react";

const ViewAllDetails = () => {
  const [deals, setDeals] = useState([]);

  const flash_deal = async () => {
    const res = await fetch(process.env.REACT_APP_BASEURL + "/api/deal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    setDeals(data.data);
  };

  useEffect(() => {
    flash_deal();
  }, []);
  return (
    <>
      <div className="col-md-9 pl-md-4 container">
        <div className="carousel-wrap">
          <div
            className="owl-carousel owl-theme mt-2 owl-loaded owl-drag"
            id="flash-deal-slider"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: "1535px",
                }}
              >
                {deals?.slice(0, 3)?.map((ele) => {
                  return (
                    <>
                      <div
                        className="owl-item active"
                        style={{ width: "302px", marginRight: "5px" }}
                      >
                        <div
                          className="flash_deal_product rtl"
                          style={{
                            cursor: "pointer",
                            height: "150px",
                            marginLeft: "6px",
                          }}
                          // onClick={() =>
                          //   navigate(`/product/${item?.product_id}`)
                          // }
                        >
                          <div className=" d-flex">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                paddingLeft: "12px",
                                paddingTop: "12px",
                              }}
                            >
                              <div className="flash-deals-background-image">
                                <img
                                  style={{
                                    height: "125px",
                                    width: "125px",
                                    borderRadius: "5px",
                                  }}
                                  src={ele.image}
                                />
                              </div>
                              <div className="flash_deal_product_details pl-3 pr-3 pr-1 d-flex align-items-center">
                                <div>
                                  <div
                                    style={{
                                      marginBottom: "20px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <span className="flash-product-title">
                                      {ele.name}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="flash-product-title">
                                      {ele.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllDetails;
