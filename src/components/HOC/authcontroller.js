import React, { useContext, useEffect, useState } from "react";

import { USERTOKEN, USERDATA } from "../utils/data";
import { Spinner } from "../common/spinner";
import { MainContext } from "../../stateManagement/contextProvider";
import { SET_USER_DATA } from "../../stateManagement/reducers/reducerActions";

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
        dispatch({
          type: SET_USER_DATA,
          payload: JSON.parse(localStorage.getItem(USERDATA))
        });
        setCanView(true);
        localStorage.removeItem("gasific_redirect");
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
