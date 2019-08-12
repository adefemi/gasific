import React, { useEffect, useState } from "react";

import { USERTOKEN, USERDATA } from "../utils/data";
import { Spinner } from "../common/spinner";

const AuthController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const token = localStorage.getItem(USERTOKEN);
    const [canView, setCanView] = useState(false);

    const onFetchData = (status, payload) => {
      if (status) {
        setCanView(true);
        localStorage.removeItem("gasific_redirect");
      } else {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERDATA);
        localStorage.setItem(
          "gasific_redirect",
          `redirect=${encodeURIComponent(props.location.pathname)}`
        );
        props.history.push(`/login?redirect=${props.location.pathname}`);

        return null;
      }
    };

    useEffect(() => {
      if (!token) {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERDATA);
        localStorage.setItem(
          "gasific_redirect",
          `redirect=${encodeURIComponent(props.location.pathname)}`
        );
        props.history.push(
          `/login?redirect=${encodeURIComponent(props.location.pathname)}`
        );
      } else {
        localStorage.removeItem("gasific_redirect");
        setCanView(true);
        // axiosFunc("get", baseURL("hardware"), null, "yes", onFetchData);
      }
    }, [RenderComponent]);
    if (!canView) return <Spinner color={"#666"} />;
    return <RenderComponent {...props} />;
  };

  Authenticate.defaultProps = {
    component
  };

  return Authenticate;
};

export default AuthController;
