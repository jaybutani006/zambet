import React from "react";
import { Route, Navigate } from "react-router-dom";

import { getAdminSessionToken } from "utils/Common";

const PrivateRouteAdmin = ({ component: Component, ...res }) => {
  return (
    <Route
      {...res}
      render={(props) => {
        return getAdminSessionToken() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/admin/auth/login" replace />
        );
      }}
    />
  );
};

export default PrivateRouteAdmin;
