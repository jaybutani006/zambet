// import './App.css';
import React, {
  Suspense,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";

// routes config
import routes from "./routes";

// Containers
// const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
import DefaultLayoutAdmin from "layout/DefaultLayoutAdmin";
import DefaultLayoutSeller from "layout/DefaultLayoutSeller";
import DefaultLayoutCustomer from "layout/DefaultLayoutCustomer";

// Pages
import AdminDashboard from "views/admin/AdminDashboard";
import SellerLogin from "views/seller/SellerLogin";
import AdminLogin from "views/admin/AdminLogin";

import NotFound404 from "views/NotFound404";
// const AdminDashboard = React.lazy(() => import("views/admin/AdminDashboard"));

import AdminPos from "views/admin/AdminPos";
import SellerPos from "views/seller/SellerPos";
import SellerTermsAndConditions from "views/seller/SellerTermsAndConditions";

// Auths
import {
  isAdminLoggedIn,
  isUserLoggedIn,
  isSellerLoggedIn,
} from "utils/Common";

import { initialState, reducer } from "context/contextAPI";
import { Context } from "context/newContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MainComp />
    </Context.Provider>
  );
}

function MainComp() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(22222, location);
    console.log("🎁🎁🎁", location.pathname, state);
  }, [location.pathname]);

  return (
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
        {/* <Route
      exact
      // no need to write exact keyword in v6 of ReactRouterDom
      path="/direct"
      name="Login Page"
      element={<AdminDashboard />}
    /> */}
        <Route
          // no need to write exact keyword in v6 of ReactRouterDom
          path="/admin"
          name="Admin Login Page"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* ============================= ADMIN ============================= */}

        <Route
          path="/admin/pos"
          name="Home"
          element={
            state.isAdminLoggedIn ? (
              <AdminPos />
            ) : (
              <Navigate
                to="/admin/auth/login"
                state={{ prevPath: "/admin/pos" }}
              />
            )
          }
        />
        <Route
          path="/admin/auth/login"
          name="Home"
          element={
            // state.isAdminLoggedIn ? (
            //   <Navigate to="/admin/dashboard" replace />
            // ) : (
            <AdminLogin />
            // )
          }
        />
        <Route path="/admin/*" name="Home" element={<DefaultLayoutAdmin />} />

        {/* ============================= SELLER ============================= */}

        <Route path="/seller" name="Home" element={<NotFound404 />} />
        <Route
          path="/seller/pos"
          name="Home"
          element={
            state.isSellerLoggedIn ? (
              <SellerPos />
            ) : (
              <Navigate to="/seller/auth/login" />
            )
          }
        />
        <Route
          path="/seller/auth/login"
          name="Home"
          element={
            // state.isSellerLoggedIn ? (
            //   <Navigate to="/seller/dashboard" replace />
            // ) : (
            <SellerLogin />
            // )
          }
        />
        <Route
          path="/seller/termsAndConditions"
          name="TermsAndConditions"
          element={<SellerTermsAndConditions />}
        />
        <Route path="/seller/*" name="Home" element={<DefaultLayoutSeller />} />

        {/* ============================= CUSTOMER ============================= */}
        <Route path="*" name="Home" element={<DefaultLayoutCustomer />} />

        {/* {routes.map((route, idx) => {
      return (
        route.element && (
          <Route
            key={idx}
            path={route.path}
            // exact={route.exact}
            // name={route.name}
            element={<route.element />}
          />
        )
      );
    })} */}
        {/* <Route path="/*" element={<h1>Invalid PATH Return</h1>} /> */}
        {/* <Route path="/*" element={<Navigate to="home" replace />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
