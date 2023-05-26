import React from "react";
import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <>
      <div className="footer">
        <div className="row justify-content-between align-items-center">
          <div className="col mt-3">
            <span>Copyright © Zambet 2022</span>
          </div>
        </div>
        {/* <div className="row justify-content-between align-items-center">
          <div className="col">
            <p className="font-size-sm mb-0">
              {" "}
              <span className="d-none d-sm-inline-block">
                CopyRight Zambet@2022
              </span>
            </p>
          </div>
          <div className="col-auto">
            <div className="d-flex justify-content-end">
              <ul className="list-inline list-separator">
                <li className="list-inline-item">
                  <Link
                    className="list-separator-link"
                    to="/admin/business-settings/web-config"
                  >
                    {" "}
                    Settings
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    className="list-separator-link"
                    to="/admin/helpTopic/list"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="list-inline-item">
                  <div className="hs-unfold">
                    <Link
                      className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                      to="/admin/dashboard"
                    >
                      <i className="tio-home-outlined" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default AdminFooter;
