import React, { useEffect, useState } from "react";
import { DropDown } from "../../common";
import { NavLink } from "react-router-dom";
import { USERDATA, USERTOKEN } from "../../utils/data";
import { Tag, Icon } from "antd";

const onLogout = () => {
  localStorage.removeItem(USERDATA);
  localStorage.removeItem(USERTOKEN);
  window.location.href = window.location.origin + "/login";
};

function NavBar(props) {
  let activeUser = JSON.parse(localStorage.getItem(USERDATA));
  const [showNotice, setShowNotice] = useState(true);
  useEffect(() => {
    let path = props.location.pathname.split("/");
    if (!path.includes("user") && showNotice) {
      setShowNotice(false);
    } else if (path.includes("user") && !showNotice) {
      setShowNotice(true);
    }
  }, [props.location.pathname]);
  return (
    <>
      <div className="navbar">
        <div className="nav-left dflex align-center">
          <div className="battery-guage danger">
            <div className="guage-meter">40%</div>
          </div>
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ marginLeft: 20, color: "#da2124" }}
          />
        </div>
        <div className="nav-right dflex align-center">
          {props.activeUser !== "customer" && (
            <div
              className="nav-content-reg black-text bolder-text "
              style={{ margin: "0 10px" }}
            >
              <Tag> ₦ 20.00</Tag>
            </div>
          )}

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
      {showNotice && props.showStatus && (
        <div className="navbar-status">Your gas would expire in 5days</div>
      )}
    </>
  );
}

export default NavBar;
