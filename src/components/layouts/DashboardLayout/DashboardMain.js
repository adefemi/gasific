import React from "react";
import "./dashboard.css";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function DashboardMain(props) {
  return (
    <div className="dashboard-main">
      <SideBar {...props} />
      <div className="mainContainer">
        <NavBar {...props} />
        <div className="contentMain">{props.children}</div>
      </div>
    </div>
  );
}

export default DashboardMain;
