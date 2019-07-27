import React from "react";
import { Input } from "../../common";
import AppIcon from "../../common/icons/Icon";

function NavBar(props) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Input
          placeholder="search"
          className="search_input"
          iconRight={<AppIcon name="search" type="feather" />}
        />
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
