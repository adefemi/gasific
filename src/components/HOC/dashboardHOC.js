import React, { useEffect, useState } from "react";

import { axiosFunc, errorHandler } from "../utils/helper";
import { hardwareUrl } from "../utils/api";
import { withRouter } from "react-router";
import { Notification, Loader } from "../common";

const DashboardController = props => {
  const RenderComponent = props.children;
  const [canView, setCanView] = useState(false);

  const onGetHardware = (status, data) => {
    setCanView(true);
    if (status) {
      console.log(data);
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  useEffect(() => {
    axiosFunc("get", hardwareUrl(), null, "yes", onGetHardware);
  }, [RenderComponent]);

  if (!canView) return <Loader />;

  return RenderComponent;
};

export default withRouter(DashboardController);
