import "App.css";

function ContactUs() {
  return (
    <>
      <div
        className="modal-quick-view modal fade "
        id="quick-view"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content" id="quick-view-modal"></div>
        </div>
      </div>

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
          ></div>
        </div>
      </div>

      <div className="container rtl">
        <div className="row">
          <div className="col-md-12 sidebar_heading text-center mb-2">
            <h1 className="h3  mb-0 folot-left headerTitle">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="container rtl" style={{ textAlign: "left" }}>
        <div className="row no-gutters">
          <div className="col-lg-6 iframe-full-height-wrap ">
            <img
              style={{}}
              className="for-contac-image"
              src="assets/front-end/png/contact.png"
              alt=""
            />
          </div>
          <div className="col-lg-6 for-send-message px-4 px-xl-5  box-shadow-sm">
            <h2
              className="h4 mb-4 text-center"
              style={{ color: "#030303", fontWeight: 600 }}
            >
              Send us a message
            </h2>
            <form>
              <input
                type="hidden"
                name="_token"
                defaultValue="lKQaOLCt7L3ErEurcvsZb2LAkaiPsURnj8EpB69h"
              />{" "}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Your name</label>
                    <input
                      className="form-control name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="cf-email">Email address</label>
                    <input
                      className="form-control email"
                      name="email"
                      type="email"
                      placeholder="johndoe@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="cf-phone">Your phone</label>
                    <input
                      className="form-control mobile_number"
                      type="text"
                      name="mobile_number"
                      placeholder="Contact Number"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="cf-subject">Subject:</label>
                    <input
                      className="form-control subject"
                      type="text"
                      name="subject"
                      placeholder="Short title"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="cf-message">Message</label>
                    <textarea
                      className="form-control message"
                      name="message"
                      rows={6}
                      required
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className=" ">
                <button className="btn btn-primary" type="submit" id="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
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

export default ContactUs;
