import React, { useEffect, useState } from "react";
import {
  CustomerHeader,
  CustomerContent,
  CustomerFooter,
} from "components/index";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const DefaultLayoutAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const getClassNameForToggle = () => {
    if (windowSize.innerWidth < 480) {
      console.log(window.innerWidth, "0000");

      return isOpen
        ? "footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl"
        : "footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl navbar-vertical-aside-closed-mode";
    } else {
      return isOpen
        ? "footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl"
        : "footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl navbar-vertical-aside-mini-mode";
    }
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);
    // window.addEventListener("contextmenu", (event) => event.preventDefault());

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      // window.removeEventListener("contextmenu", (event) =>
      //   event.preventDefault()
      // );
    };
  }, []);

  return (
    <div className="toolbar-enabled">
      <CustomerHeader />
      <CustomerContent />
      <CustomerFooter />
    </div>
  );
};

export default DefaultLayoutAdmin;
