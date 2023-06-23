import React, { useContext, useEffect } from "react";
import { Context } from "context/newContext";

function AdminLogout() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({
      type: "ADMIN_LOGOUT",
    });
  }, []);

  return null;
}

export default AdminLogout;
