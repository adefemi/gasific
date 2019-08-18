import React, { useEffect, useState } from "react";

import { USERTOKEN } from "../utils/data";
import { Spinner } from "../common/spinner";

const LoginController = component => {
  const Authenticate = props => {
    const RenderComponent = props.component;
    const token = localStorage.getItem(USERTOKEN);
    const [canView, setCanView] = useState(false);

    useEffect(() => {
      if (!token) {
        setCanView(true);
      } else {
        props.history.push("");
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

export default LoginController;
