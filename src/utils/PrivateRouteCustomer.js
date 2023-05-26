import React from "react";
import { Redirect, Route } from "react-router";
import { getUserSessionToken } from "./Common";

const PrivateRoute = ({ component: Component, ...res }) => {
  return (
    <Route
      {...res}
      render={(props) => {
        return getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/AdminLogin" />
        );
      }}
    />
  );
};

export default PrivateRoute;
