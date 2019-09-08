import React, { useContext, useEffect, useState } from "react";

import { Spinner, Notification } from "../common";
import { axiosFunc, errorHandler } from "../utils/helper";
import { hardwareUrl, subscriptionUrl, UserUrl } from "../utils/api";
import { USERDATA, USERTOKEN } from "../utils/data";
import { MainContext } from "../../stateManagement/contextProvider";
import { SET_SUBSCRIPTION_DATA } from "../../stateManagement/reducers/reducerActions";

const UserAuthController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const [canView, setCanView] = useState(false);
    const token = localStorage.getItem(USERTOKEN);
    const { dispatch } = useContext(MainContext);

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
        axiosFunc(
          "get",
          subscriptionUrl("?status=active"),
          null,
          "yes",
          (status, data) => {
            let subscriptions = [];
            if (status) {
              subscriptions = data.data.data.subscriptions;
            } else {
              Notification.bubble({
                type: "error",
                content: errorHandler(data)
              });
            }
            dispatch({
              type: SET_SUBSCRIPTION_DATA,
              payload: subscriptions
            });
          }
        );
        axiosFunc("get", hardwareUrl(), null, "yes", (status, data) => {
          if (status) {
            if (data.data.data.user_hardware.hardware_id) {
              setCanView(true);
            } else {
              props.history.push("/verification");
            }
          } else {
            Notification.bubble({
              type: "error",
              content: errorHandler(data)
            });
            props.history.push("/verification");
          }
        });
      }
    }, []);
    if (!canView) return <Spinner color={"#666"} />;
    return <RenderComponent {...props} />;
  };

  Authenticate.defaultProps = {
    component
  };

  return Authenticate;
};

export default UserAuthController;
