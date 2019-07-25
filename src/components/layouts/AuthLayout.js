import React from "react";
import { NavLink } from "react-router-dom";

function AuthLayout(props) {
  return (
    <div className="container">
      <NavLink to="/" className="fixed-brand">
        Gasific
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
