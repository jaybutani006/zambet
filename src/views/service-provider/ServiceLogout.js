import React, { useContext, useEffect } from "react";
import { Context } from "context/newContext";

function ServiceLogout() {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({
            type: "SERVICE_LOGOUT",
        });
    }, []);

    return null;
}

export default ServiceLogout;