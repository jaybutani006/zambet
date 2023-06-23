import React, { Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

// routes config
import { sellerRoutes } from "routes";
//
import { isSellerLoggedIn } from "utils/Common";
import { Context } from "context/newContext";

const SellerContent = () => {
  const [state, dispatch] = useContext(Context);

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
          {sellerRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  // exact={route.exact}
                  // name={route.name}
                  // element={<route.element />}
                  element={
                    state.isSellerLoggedIn ? (
                      <route.element />
                    ) : (
                      <Navigate to="/seller/auth/login" replace />
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

// export default React.memo(SellerContent);
export default SellerContent;
