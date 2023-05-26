import React from "react";

function AdminBusinessSettingsMapApi() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">Third party apis</h1>
              <span className="badge badge-soft-dark">
                NB: Client key should have enable map javascript api and you can
                restrict it with http refere. Server key should have enable
                place api key and you can restrict it with ip.
              </span>
              <br />
              <span className="badge badge-soft-dark">Map api hint 2</span>
              <br />
            </div>
          </div>
        </div>
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <form
              action="javascript:"
              method="post"
              encType="multipart/form-data"
            >
              <input
                type="hidden"
                name="_token"
                defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
              />{" "}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-2">
                    <label
                      className="input-label"
                      style={{ paddingLeft: "10px" }}
                    >
                      Map api key (Client)
                    </label>
                    <input
                      type="text"
                      placeholder="Map api key (Client)"
                      className="form-control"
                      name="map_api_key"
                      defaultValue
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-2">
                    <label
                      className="input-label"
                      style={{ paddingLeft: "10px" }}
                    >
                      Map api key (Server)
                    </label>
                    <input
                      type="text"
                      placeholder="Map api key (Server)"
                      className="form-control"
                      name="map_api_key_server"
                      defaultValue
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onclick="call_demo()"
                className="btn btn-primary mb-2"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsMapApi;
