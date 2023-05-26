import React from "react";

function AdminBusinessSettingsAnalyticsIndex() {
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
              <h1 className="page-header-title">Analytics script</h1>
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
                <div className="col-md-12">
                  <div className="form-group mb-2">
                    <label
                      className="input-label"
                      style={{ paddingLeft: "10px" }}
                    >
                      Pixel analytics script
                    </label>
                    <textarea
                      type="text"
                      placeholder="Pixel analytics script from facebook"
                      className="form-control"
                      name="pixel_analytics"
                      defaultValue={""}
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

export default AdminBusinessSettingsAnalyticsIndex;
