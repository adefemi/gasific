import React, { useContext, useEffect, useState } from "react";

import { axiosFunc, errorHandler } from "../utils/helper";
import { hardwareUrl } from "../utils/api";
import { withRouter } from "react-router";
import { Notification, Loader } from "../common";
import { MainContext } from "../../stateManagement/contextProvider";
import { SET_HARDWARE_DATA } from "../../stateManagement/reducers/reducerActions";

const DashboardController = props => {
  const RenderComponent = props.children;
  const [canView, setCanView] = useState(false);
  const { dispatch } = useContext(MainContext);

  const onGetHardware = (status, data) => {
    if (status) {
      setCanView(true);
      console.log(data.data.data.hardware);
      dispatch({ type: SET_HARDWARE_DATA, payload: data.data.data.hardware });
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
