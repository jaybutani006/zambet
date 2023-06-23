import "App.css";

function AboutUs() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-12"
            style={{
              width: "93%",
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div id="loading" style={{ display: "none" }}>
              <img
                width={200}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="container for-container rtl"
        style={{ textAlign: "left" }}
      >
        <h2 className="text-center mt-3 headerTitle">About Our Company</h2>
        <div className="for-padding">
          <p>
            Zambet is the largest one-stop shopping destination in India.
            Launched in 2021, the online store offers the widest range of
            products in categories ranging from electronics to household
            appliances, latest smart phones, Camera, Computing &amp; accessories
            fashion, health equipment, and makeup.
          </p>
        </div>
      </div>

      <a className="btn-scroll-top show" href="#top" data-scroll>
        <span className="btn-scroll-top-tooltip text-muted font-size-sm mr-2">
          Top
        </span>
        <i className="btn-scroll-top-icon czi-arrow-up"> </i>
      </a>
    </>
  );
}

export default AboutUs;
