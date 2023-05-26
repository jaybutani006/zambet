import React, { useState } from "react";

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        {/* <div>{title}</div> */}
        <div
          className="mb-4"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.title}</span>

          <span>
            {isActive ? (
              <i
                className="fa fa-arrow-circle-up"
                // style={{ fontSize: 24 }}
              />
            ) : (
              <i
                className="fa fa-arrow-circle-down"
                // style={{ fontSize: 24 }}
              />
            )}
          </span>
        </div>
      </div>
      {isActive && (
        <div className="accordion-content" style={{ padding: "0px 10px" }}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
