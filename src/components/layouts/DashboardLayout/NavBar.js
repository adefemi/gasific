import React from "react";
import { Input } from "../../common";
import AppIcon from "../../common/icons/Icon";
import battery from "../../../assets/battery.png";

function NavBar(props) {
  return (
    <div className="navbar">
      <div className="nav-left dflex align-center">
        <Input
          placeholder="search"
          className="search_input"
          iconRight={<AppIcon name="search" type="feather" />}
        />
        <div className="battery-guage">
          <img src={battery} alt="battery_guage" />
          <div className="guage-meter">40%</div>
        </div>
      </div>
      <div className="nav-right dflex align-center">
        <div className="user-name">Admin</div>
        <div className="img-con">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
