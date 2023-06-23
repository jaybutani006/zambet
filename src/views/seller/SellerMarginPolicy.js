import React, { useState, useEffect } from "react";

const SellerMarginPolicy = () => {
  const [policy, setPolicy] = useState([]);

  const getPolicy = async () => {
    const res = await fetch(
      "https://zambet-ecommerce.onrender.com/api/margin_policy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data[0]);
    setPolicy(data.data[0]);
  };

  useEffect(() => {
    getPolicy();
  }, []);
  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row  justify-content-between align-items-center flex-grow-1">
                        <div className="col-12 col-sm-6 col-md-4">
                          <h5>Margin Policy</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-2 mt-2 mt-sm-0 p-3"></div>
                    <p
                      style={{
                        padding: "10px 50px",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                    >
                      {policy.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SellerMarginPolicy;
