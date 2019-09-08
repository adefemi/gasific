import React from "react";
import { DropDown, Input } from "../../common";
import AppIcon from "../../common/icons/Icon";
import battery from "../../../assets/battery.png";
import { NavLink } from "react-router-dom";
import { USERDATA, USERTOKEN } from "../../utils/data";
import { Tag } from "antd";

const onLogout = () => {
  localStorage.removeItem(USERDATA);
  localStorage.removeItem(USERTOKEN);
  window.location.href = window.location.origin + "/login";
};

function NavBar(props) {
  let activeUser = JSON.parse(localStorage.getItem(USERDATA));
  return (
    <div className="navbar">
      <div className="nav-left dflex align-center">
        <div className="battery-guage">
          <img src={battery} alt="battery_guage" />
          <div className="guage-meter">40%</div>
        </div>
      </div>
      <div className="nav-right dflex align-center">
        <div
          className="nav-content-reg black-text bolder-text "
          style={{ margin: "0 10px" }}
        >
          <Tag> ₦ 20.00</Tag>
        </div>
        <DropDown
          staticContent={true}
          onChange={() => null}
          active={
            <>
              <div className="user-name bolder-text">{activeUser.name}</div>
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
