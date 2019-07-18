import React, { useEffect, useState } from "react";

import { USERTOKEN, USERDATA, providerUrl, productUrl } from "../utils/data";
import { Spinner } from "../../components/common";
import { axiosFunc } from "../utils/helper";

const AuthController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const token = localStorage.getItem(USERTOKEN);

    const onFetchData = (status, payload) => {
      if (status) {
      } else {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERDATA);
        props.history.push(`/login-admin?redirect=${props.location.pathname}`);

        return null;
      }
    };

    useEffect(() => {
      if (!token) {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERDATA);
        props.history.push(
          `/login-admin?redirect=${encodeURIComponent(props.location.pathname)}`
        );
      } else {
        axiosFunc(
          "get",
          productUrl(),
          null,
          {
            Authorization: `Bearer ${localStorage.getItem(USERTOKEN)}`
          },
          onFetchData
        );
      }
    }, [RenderComponent]);

    return <RenderComponent {...props} />;
  };

  Authenticate.defaultProps = {
    component
  };

  return Authenticate;
};

export default AuthController;
