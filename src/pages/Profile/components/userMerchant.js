import React, { useEffect, useState } from "react";
import AppIcon from "../../../components/common/icons/Icon";
import { Button, Notification } from "../../../components/common";
import { NavLink } from "react-router-dom";
import { axiosFunc, errorHandler } from "../../../components/utils/helper";
import { merchantUrl } from "../../../components/utils/api";

function UserMerchant(props) {
  const [merchants, setMerchant] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axiosFunc("get", merchantUrl(), null, "yes", (status, data) => {
      if (status) {
        console.log(data.data.data);
      } else {
        Notification.bubble({
          type: "error",
          content: errorHandler(data)
        });
      }
    });
  }, []);
  return (
    <div>
      <div className="heading-2">Active Merchant</div>
      <br />
      <div className="divider" />
      <br />
      <div className="padding-bottom-10 link-btn">
        <AppIcon name="archive" type="feather" /> &nbsp;&nbsp;{" "}
        <span>TOTAL FILLING STATION</span>
      </div>
      <div className="padding-bottom-5">
        <AppIcon name="user" type="feather" /> &nbsp;&nbsp;{" "}
        <span className="link-btn">Mr Lateef Lawal</span>{" "}
      </div>
      <div className="padding-bottom-5">
        <AppIcon name="phoneCall" type="feather" /> &nbsp;&nbsp;{" "}
        <span className="link-btn">+234 803 3333</span>{" "}
      </div>
      <div>
        <AppIcon name="mapPin" type="feather" /> &nbsp;&nbsp;{" "}
        <span className="link-btn">6, fatai street, ikeja</span>{" "}
      </div>

      <br />
      <br />
      <div className="dflex align-center justify-between">
        <Button color="danger">Report Merchant</Button>
        <NavLink to="/select-merchant">
          <Button>Change Merchant</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default UserMerchant;
