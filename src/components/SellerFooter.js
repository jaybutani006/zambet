import React from "react";

function SellerFooter() {
  return (
    <>
      <div
        id="lightboxOverlay"
        tabIndex={-1}
        className="lightboxOverlay"
        style={{ display: "none" }}
      />
      <div
        id="lightbox"
        tabIndex={-1}
        className="lightbox"
        style={{ display: "none" }}
      >
        <div className="lb-outerContainer">
          <div className="lb-container">
            <img
              className="lb-image"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt=""
            />
            <div className="lb-nav">
              <a className="lb-prev" aria-label="Previous image" href />
              <a className="lb-next" aria-label="Next image" href />
            </div>
            <div className="lb-loader">
              <a className="lb-cancel" />
            </div>
          </div>
        </div>
        <div className="lb-dataContainer">
          <div className="lb-data">
            <div className="lb-details">
              <span className="lb-caption" />
              <span className="lb-number" />
            </div>
            <div className="lb-closeContainer">
              <a className="lb-close" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerFooter;
