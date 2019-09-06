import React, { useContext, useEffect, useState } from "react";

import { Spinner } from "../common/spinner";
import { axiosFunc } from "../utils/helper";
import { hardwareUrl } from "../utils/api";
import { USERDATA, USERTOKEN } from "../utils/data";
import { SET_USER_DATA } from "../../stateManagement/reducers/reducerActions";
import { MainContext } from "../../stateManagement/contextProvider";

const VerificationController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const [canView, setCanView] = useState(false);
    const { dispatch } = useContext(MainContext);
    const token = localStorage.getItem(USERTOKEN);

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
        dispatch({
          type: SET_USER_DATA,
          payload: JSON.parse(localStorage.getItem(USERDATA))
        });
        setCanView(true);
        localStorage.removeItem("gasific_redirect");
        axiosFunc("get", hardwareUrl(), null, "yes", status => {
          if (status) {
            setCanView(true);
          } else {
            props.history.push("/");
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

export default VerificationController;
