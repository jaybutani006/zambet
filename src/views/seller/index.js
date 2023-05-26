import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

function Index() {
  const navigate = useNavigate();

  return (
    <>
      {/* <button onClick={() => navigate("/seller")}>HELLo</button>
      <Header />
      Seller Index Page
      <Footer /> */}
      <div className="flex-center position-ref full-height">
        <div className="code"></div>
        <div className="message" style={{ padding: "10px" }}>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        .for-margin {\n            margin: auto;\n\n            margin-bottom: 10%;\n        }\n\n        .for-margin {\n\n        }\n\n        .page-not-found {\n            margin-top: 30px;\n            font-weight: 600;\n            text-align: center;\n        }\n    ",
            }}
          />
          <div className="container ">
            <div className="col-md-3" />
            <div className="col-md-6 for-margin">
              <div className="for-image">
                <img
                  style={{}}
                  alt=""
                />
              </div>
              <h2 className="page-not-found">Page Not found</h2>
              <p style={{ textAlign: "center" }}>
                We are sorry the page you requested could not be found <br />{" "}
                Please go back to the homepage
              </p>
              <div style={{ textAlign: "center" }}>
                <a className="btn btn-primary" href="/">
                  {" "}
                  HOME
                </a>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
