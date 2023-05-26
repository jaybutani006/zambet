import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const PricingPolicy = () => {
  const [policy, setPolicy] = useState([]);

  const getPolicy = async () => {
    const res = await fetch(
      "https://zambet-ecommerce.onrender.com/api/pricing_policy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
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
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-md-12">
              <div className="card" style={{ height: "400px" }}>
                <div
                  className="card-body"
                  style={{
                    width: "100%",
                  }}
                >
                  <h1
                    style={{
                      marginBottom: "30px",
                      textAlign: "center",
                    }}
                  >
                    {policy.title}
                  </h1>
                  <h6
                    style={{
                      marginBottom: "30px",
                    }}
                  >
                    {policy.description}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PricingPolicy;
