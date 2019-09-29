import React, { useContext, useEffect, useState } from "react";

import { USERTOKEN, USERDATA } from "../utils/data";
import { Spinner } from "../common/spinner";
import { MainContext } from "../../stateManagement/contextProvider";
import {
  SET_ACTIVE_USER,
  SET_USER_DATA
} from "../../stateManagement/reducers/reducerActions";
import { axiosFunc, errorHandler } from "../utils/helper";
import { UserUrl } from "../utils/api";
import { Notification } from "../common/notification";

const AuthController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const token = localStorage.getItem(USERTOKEN);
    const [canView, setCanView] = useState(false);
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
        axiosFunc("get", UserUrl(), null, "yes", (status, payload) => {
          if (status) {
            dispatch({
              type: SET_ACTIVE_USER,
              payload: payload.data.data.user.roles[0].name
            });
            dispatch({
              type: SET_USER_DATA,
              payload: JSON.parse(localStorage.getItem(USERDATA))
            });
            setCanView(true);
            localStorage.removeItem("gasific_redirect");
          } else {
            Notification.bubble({
              type: "error",
              content: errorHandler(payload)
            });
          }
        });
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
