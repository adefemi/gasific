import React, { useEffect, useState } from "react";
import AppIcon from "../../common/icons/Icon";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logos/logo7.png";

const menuItem = [
  {
    link: "/dashboard/merchant",
    name: "Merchant Dashboard",
    icon: <AppIcon name="home" type="feather" size={20} />
  },
  {
    link: "/dashboard/user",
    name: "User Dashboard",
    icon: <AppIcon name="user" type="feather" size={20} />
  },
  {
    link: "/dashboard/transactions",
    name: "Transactions",
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
    link: "/dashboard/FAQ",
    name: "FAQ",
    icon: <AppIcon name="messageSquare" type="feather" size={20} />
  }
];

function SideBar(props) {
  const splitLocation = () => {
    return props.location.pathname;
  };

  const [activeTab, setActiveTab] = useState(splitLocation);

  useEffect(() => {
    setActiveTab(splitLocation());
  }, [props.location]);

  return (
    <div className="sideBar">
      <div>
        <div className="brand">
          <img src={logo} height="40px" alt="" />
        </div>
        <ul>
          {menuItem.map((item, key) => (
            <NavLink to={item.link} key={key}>
              <li className={activeTab.includes(item.link) ? "active" : ""}>
                <div className="icon">{item.icon}</div>
                <div className="name">{item.name}</div>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="support">
        <div>
          <AppIcon
            className="icon"
            name="messageCircle"
            type="feather"
            size={25}
          />
        </div>
        Support
      </div>
    </div>
  );
}

export default SideBar;
