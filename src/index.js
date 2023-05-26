import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

// if (process.env.NODE_ENV === 'production') {
//   console.log = () => { }
//   console.error = () => { }
//   console.debug = () => { }
// }

ReactDOM.render(
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
