import React from "react";
import { Link } from "react-router-dom";

function NotFound404() {
  return (
    <>
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
                  style={{ width: "100%" }}
                  // src="/fav2.jpg"
                  src="https://6valley.6amtech.com/storage/app/public/png/404.png"
                  alt=""
                />
                {/* TODO: ATTACH HERE NOT FOUND LOGO FROM 6valley website */}
              </div>
              <h2 className="page-not-found">Page Not found</h2>
              <p style={{ textAlign: "center" }}>
                We are sorry the page you requested could not be found <br />{" "}
                {/* Please go back to the homepage */}
              </p>
              <div style={{ textAlign: "center" }}>
                <Link
                  className="btn btn-primary"
                  to={-1}
                  // onClick={() => navigate(-1)}
                >
                  {/* {"HOME"} */}
                  BACK
                </Link>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound404;
