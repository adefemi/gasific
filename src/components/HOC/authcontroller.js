import React, { useEffect, useState } from "react";

import { USERTOKEN, USERDATA, providerUrl, productUrl } from "../utils/data";
import { axiosFunc } from "../utils/helper";
import { Spinner } from "../common/spinner";
import { baseURL } from "../utils/api";

const AuthController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const token = localStorage.getItem(USERTOKEN);
    const [canView, setCanView] = useState(false);

    const onFetchData = (status, payload) => {
      if (status) {
        setCanView(true);
      } else {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERDATA);
        props.history.push(`/login?redirect=${props.location.pathname}`);

        return null;
      }
    };

    useEffect(() => {
      if (!token) {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERDATA);
        props.history.push(
          `/login?redirect=${encodeURIComponent(props.location.pathname)}`
        );
      } else {
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
