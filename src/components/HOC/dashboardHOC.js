import React, { useEffect, useState } from "react";

import { axiosFunc, errorHandler } from "../utils/helper";
import { hardwareUrl } from "../utils/api";
import { withRouter } from "react-router";
import { Notification, Loader } from "../common";

const DashboardController = props => {
  const RenderComponent = props.children;
  const [canView, setCanView] = useState(false);

  const onGetHardware = (status, data) => {
    if (status) {
      setCanView(true);
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
      props.history.push("/login");
    }
  };

  useEffect(() => {
    axiosFunc("get", hardwareUrl(), null, "yes", onGetHardware);
  }, [RenderComponent]);

  if (!canView) return <Loader />;

  return RenderComponent;
};

export default withRouter(DashboardController);
