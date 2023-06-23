import dummyProductImage from "assets/dummyProductImage.png";
// import "./styles.css";
// import { div, Image } from "theme-ui";
import React, { useState } from "react";

// interface MagnifierProps {
//   imgSrc: string;
//   imgWidth?: number;
//   imgHeight?: number;
//   magnifierRadius: number;
// }

function Magnifier({ imgSrc, imgWidth, imgHeight, magnifierRadius }) {
  // Store the position of the magnifier and position of the large image relative to the magnifier.
  const [magnifierState, setMagnifierState] = useState({
    top: 0,
    left: 0,
    offsetX: 0,
    offsetY: 0,
  });

  // Store whether the magnifier is currently visible.
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // new
        maxHeight: "323px",
        width: "100%",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = dummyProductImage;
          }}
          src={imgSrc}
          // Set the intrinsic width of the element (optional).
          width={imgWidth}
          height={imgHeight}
          // Image can be a maximum of 50% of the viewport in either direction.
          style={{
            // maxHeight: "50vh",
            maxWidth: "50vh",
            height: "auto",
            width: "auto",
            // new
            maxHeight: "323px",
          }}
          // Set the magnifier state on every move of the mouse over the image.
          onMouseMove={(e) => {
            setIsVisible(true);
            const smallImage = e.currentTarget;
            // mouse position on the small image.
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            setMagnifierState({
              top: y - magnifierRadius,
              left: x - magnifierRadius,
              // scale up to get position relative to the large image.
              offsetX:
                (x / smallImage.width) * smallImage.naturalWidth -
                magnifierRadius,
              offsetY:
                (y / smallImage.height) * smallImage.naturalHeight -
                magnifierRadius,
            });
          }}
          // Hide the magnifier when leaving the image.
          onMouseLeave={() => setIsVisible(false)}
        />
        <div
          style={{
            // Constants:
            boxShadow: "0 5px 10px -2px rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
            position: "absolute",
            border: "4px solid #efefef",
            zIndex: 99,
            display: "block",
            transition: "opacity 0.2s",
            // Set background to the image from props:
            background: `url("${imgSrc}") no-repeat #fff`,
            // Set sizing based on the magnifierRadius from props:
            width: 2 * magnifierRadius,
            height: 2 * magnifierRadius,
            borderRadius: magnifierRadius,
            // Set position based on on the magnifier state:
            top: magnifierState.top + "px",
            left: magnifierState.left + "px",
            backgroundPositionX: -1 * magnifierState.offsetX,
            backgroundPositionY: -1 * magnifierState.offsetY,
            // Toggle opacity based on the isVisible state:
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

export default Magnifier;

// function App() {
//   return (
//     <Magnifier
//       imgSrc="https://images.unsplash.com/photo-1542856204-00101eb6def4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
//       imgWidth={975}
//       imgHeight={1300}
//       magnifierRadius={100}
//     />
//   );
// }
