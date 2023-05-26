import React from "react";
import { Redirect, Route } from "react-router";
import { getToken } from "./Common";

const PublicRoute = ({ component: Component, ...res }) => {
  return (
    <Route
      {...res}
      render={(props) => {
        return !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/AdminDashboard" />
        );
      }}
    />
  );
};

export default PublicRoute;
