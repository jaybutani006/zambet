import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

// routes config
import { adminRoutes } from "routes";
//
import { isAdminLoggedIn } from "utils/Common";

const AdminContent = () => {
  const location = useLocation();
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
          {adminRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  // exact={route.exact}
                  // name={route.name}
                  // element={<route.element />}
                  element={
                    isAdminLoggedIn() ? (
                      <route.element />
                    ) : (
                      <Navigate
                        to="/admin/auth/login"
                        state={{ prevPath: location.pathname }}
                        replace
                      />
                    )
                  }
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

// export default React.memo(AdminContent);
export default AdminContent;
