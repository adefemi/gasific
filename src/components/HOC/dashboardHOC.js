import React, { useEffect, useState } from "react";

import { USERTOKEN, USERDATA } from "../utils/data";
import { axiosFunc } from "../utils/helper";
import { hardwareUrl } from "../utils/api";
import { Spinner } from "../common/spinner";
import { withRouter } from "react-router";

const DashboardController = props => {
  const RenderComponent = props.children;
  // const token = localStorage.getItem(USERTOKEN);
  // const [canView, setCanView] = useState(false);
  //
  // const onFetchData = status => {
  //   if (status) {
  //     setCanView(true);
  //   } else {
  //     props.history.push(`/delivery`);
  //     return null;
  //   }
  // };
  //
  // useEffect(() => {
  //   if (!token) {
  //     localStorage.removeItem(USERTOKEN);
  //     localStorage.removeItem(USERDATA);
  //     props.history.push(
  //       `/login?redirect=${encodeURIComponent(props.location.pathname)}`
  //     );
  //   } else {
  //     axiosFunc("get", hardwareUrl(), null, "yes", onFetchData);
  //   }
  // }, [RenderComponent]);
  //
  // if (!canView) return <Spinner color={"#666"} />;

  return RenderComponent;
};

export default withRouter(DashboardController);
