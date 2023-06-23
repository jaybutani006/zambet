import React from "react";

function AdminBusinessSettingsWebConfigRefundIndex() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="card">
          <div className="card-header">
            <h5 className="text-center">
              <i className="tio-settings-outlined" />
              Refund request day limit
            </h5>
          </div>
          <div className="card-body">
            <form>
              <input
                type="hidden"
                name="_token"
                defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
              />{" "}
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="input-label" htmlFor="name">
                      Day limit
                    </label>
                    <input
                      className="form-control col-12"
                      type="number"
                      name="refund_day_limit"
                      defaultValue={0}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsWebConfigRefundIndex;
