import React, { useEffect, useState } from "react";
import AppIcon from "../../common/icons/Icon";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logos/logo1.png";

const menuItem = activeUser => [
  {
    link: `/dashboard/${activeUser === "customer" ? "user" : "merchant"}`,
    name: "Dashboard",
    icon: (
      <AppIcon
        name={activeUser === "customer" ? "user" : "home"}
        type="feather"
        size={20}
      />
    )
  },
  {
    link: "/dashboard/merchant/users",
    name: "Users",
    icon: <AppIcon name="users" type="feather" size={20} />
  },
  {
    link: "/dashboard/transactions",
    name: activeUser === "customer" ? "Transactions" : "Finance",
    icon: <AppIcon name="trendingUp" type="feather" size={20} />
  },
  {
    link: "/dashboard/profile",
    name: "Profile",
    icon: <AppIcon name="folder" type="feather" size={20} />
  },
  {
    link: "/dashboard/gas-usage",
    name: "Gas Usage",
    icon: <AppIcon name="activity" type="feather" size={20} />
  },
  {
    link: "/dashboard/help",
    name: "Help",
    icon: <AppIcon name="shield" type="feather" size={20} />
  }
];

export const setUpTawkTo = () => {
  let s1 = document.createElement("script");
  let s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/5d4569f3e5ae967ef80e4176/default";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
};

function SideBar(props) {
  const splitLocation = () => {
    return props.location.pathname;
  };

  const [activeTab, setActiveTab] = useState(splitLocation);

  useEffect(() => {
    setActiveTab(splitLocation());

    setUpTawkTo();
  }, [props.location]);

  return (
    <div className="sideBar">
      <div>
        <div className="brand">
          <NavLink to="/dashboard/user">
            <img src={logo} height="40px" alt="" />
          </NavLink>
        </div>
        <ul>
          {menuItem(props.activeUser).map((item, key) => {
            if (
              props.activeUser === "customer" &&
              item.link === "/dashboard/merchant/users"
            ) {
              return null;
            } else if (
              props.activeUser !== "customer" &&
              item.link === "/dashboard/gas-usage"
            ) {
              return null;
            } else {
              return (
                <NavLink to={item.link} key={key}>
                  <li className={activeTab.includes(item.link) ? "active" : ""}>
                    <div className="icon">{item.icon}</div>
                    <div className="name">{item.name}</div>
                  </li>
                </NavLink>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
