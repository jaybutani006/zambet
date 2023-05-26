import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

// routes config
import { customerRoutes } from "routes";
//
import { isUserLoggedIn } from "utils/Common";

const CustomerContent = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <RotatingLines strokeColor="#FF5733" />
          </div>
        }
      >
        <Routes>
          {customerRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  // exact={route.exact}
                  // name={route.name}
                  element={<route.element />}
                  // element={
                  //   isUserLoggedIn() ? (
                  //     <route.element />
                  //   ) : (
                  //     <Navigate to="/customer/auth/login" />
                  //   )
                  // }
                />
              )
            );
          })}
          {/* <Route
            path="*"
            element={<Navigate to="/admin/pos/orders" replace />}
          /> */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

// export default React.memo(CustomerContent);
export default CustomerContent;
