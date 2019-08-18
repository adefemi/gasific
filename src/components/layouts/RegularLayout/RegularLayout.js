import React, { useState } from "react";
import "./regularLayout.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logos/logo7.png";
import { USERDATA, USERTOKEN } from "../../utils/data";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/" },
  { name: "Pricing", link: "/" },
  { name: "Contact Us", link: "/" }
];

const navLinksOpt = [
  { name: "Login", link: "/login" },
  { name: "Support", link: "/", type: "opt" }
];

function RegularLayout(props) {
  const getStatus = () => {
    return !!localStorage.getItem(USERTOKEN);
  };

  const onLogout = e => {
    e.preventDefault();
    localStorage.removeItem(USERTOKEN);
    localStorage.removeItem(USERDATA);
    props.history.push("/");
    setStatus(false);
  };

  const [status, setStatus] = useState(getStatus());

  return (
    <div className="regular-container">
      <div className="regular-nav">
        <div className="max-width-1200">
          <div className="navbar-reg">
            <NavLink to="/" className="brand">
              <img src={logo} alt="logo" />
            </NavLink>

            <div className="nav-right">
              {status ? (
                <NavLink to="/" className="opt" onClick={onLogout}>
                  Logout
                </NavLink>
              ) : (
                <>
                  <div className="nav-content-reg">
                    {navLinks.map((item, key) => (
                      <NavLink to={item.link} key={key}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <div style={{ paddingLeft: "30px" }} />
                  <div className="nav-content-reg">
                    {navLinksOpt.map((item, key) => (
                      <NavLink
                        className={item.type ? item.type : ""}
                        to={item.link}
                        key={key}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {props.title && <div className="reg-title">{props.title}</div>}
        </div>
      </div>
      <div className="content-reg">
        <div className="max-width-1200">{props.children}</div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default RegularLayout;
