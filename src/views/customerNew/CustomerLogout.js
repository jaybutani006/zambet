import React, { useContext, useEffect } from "react";
import { Context } from "context/newContext";
import { Navigate, useNavigate } from "react-router-dom";

function CustomerLogout() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "SET_USER_WISHLIST_COUNT",
      userWishlistCount: 0,
    });
    dispatch({
      type: "SET_USER_CART_COUNT",
      userCartCount: 0,
    });
    dispatch({
      type: "USER_LOGOUT",
    });
    navigate("/customer/auth/login", { replace: true });
  }, []);

  return null;
}

export default CustomerLogout;
