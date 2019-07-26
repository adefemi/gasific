import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/logo5.png";

function AuthLayout(props) {
  return (
    <div className="container">
      <NavLink to="/" className="fixed-brand">
        <img src={logo} height="40px" alt="" />
      </NavLink>
      <br />
      <br />
      <br />
      <br />
      <div className="max-width-500">{props.children}</div>
    </div>
  );
}

export default AuthLayout;
