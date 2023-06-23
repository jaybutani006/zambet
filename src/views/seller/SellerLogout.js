import React, { useContext, useEffect } from "react";
import { Context } from "context/newContext";
import axios from "axios";
import { defaultAPIErrorHandler } from "api/api";

function SellerLogout() {
  const [state, dispatch] = useContext(Context);

  const sellerLogout = async () => {
    if (state?.sellerRole === "staff") {
      axios({
        method: "post",
        url: process.env.REACT_APP_BASEURL + "/api/staff/logout",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.sellerToken,
        },
      })
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: "SELLER_LOGOUT",
          });
        })
        .catch((error) => {
          defaultAPIErrorHandler(error)
        });
    } else {
      dispatch({
        type: "SELLER_LOGOUT",
      });
    }
  };

  useEffect(() => {
    sellerLogout();
  }, []);

  return null;
}

export default SellerLogout;
