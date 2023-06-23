import { Context } from "context/newContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function CheckoutComplete() {
  const [state, dispatch] = useContext(Context);

  return (
    <div className="container mt-5 mb-5 rtl" style={{ textAlign: "left" }}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-10">
          <div className="card">
            <div className=" p-5">
              <div className="row">
                <div className="col-md-6">
                  <h5 style={{ fontSize: "20px", fontWeight: 900 }}>
                    Your order has been placed successfully! !
                  </h5>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <center>
                    <i
                      style={{ fontSize: "100px", color: "#0f9d58" }}
                      className="fa fa-check-circle"
                    />
                  </center>
                </div>
              </div>
              <span
                className="font-weight-bold d-block mt-4"
                style={{ fontSize: "17px" }}
              >
                Hello, {state?.userProfile?.first_name}
              </span>
              <span>
                You order has been confirmed and will be shipped according to
                the method you selected!
              </span>
              <div className="row mt-4">
                <div className="col-6">
                  <Link to="/" className="btn btn-primary">
                    Go to shopping
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/account-oder"
                    className="btn btn-secondary pull-right"
                  >
                    Check orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComplete;
