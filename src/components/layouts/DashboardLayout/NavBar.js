import React from "react";
import { DropDown, Input } from "../../common";
import AppIcon from "../../common/icons/Icon";
import battery from "../../../assets/battery.png";
import { NavLink } from "react-router-dom";
import { USERDATA, USERTOKEN } from "../../utils/data";

const onLogout = () => {
  localStorage.removeItem(USERDATA);
  localStorage.removeItem(USERTOKEN);
  window.location.href = window.location.origin + "/login";
};

function NavBar(props) {
  let activeUser = JSON.parse(localStorage.getItem(USERDATA));
  console.log(activeUser);
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
        <DropDown
          staticContent={true}
          onChange={() => null}
          active={
            <>
              <div className="user-name">{activeUser.name}</div>
              <div className="img-con">
                <img src="" alt="" />
              </div>
            </>
          }
          options={[
            {
              id: 1,
              content: <NavLink to="/dashboard/profile">Profile</NavLink>
            },
            {
              id: 1,
              content: <span onClick={onLogout}>Logout</span>
            }
          ]}
        />
      </div>
    </div>
  );
}

export default NavBar;
