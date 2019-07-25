import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const Test = props => {
  return (
    <div>
      <NavLink to="/login">
        <h2 className="link-btn">Simulate</h2>
      </NavLink>
      <br />
      <br />
      <br />
      <br />
      <h3>Quick Links</h3>
      <NavLink to="/login">Login Screen</NavLink>
      <br />
      <NavLink to="/register">Register Screen</NavLink>
      <br />
      <NavLink to="/forgot-password">Forgot password Screen</NavLink>
      <br />
      <NavLink to="/verification">Verification Screen</NavLink>
      <br />
      <NavLink to="/delivery">Delivery Screen</NavLink>
      <br />
      <NavLink to="/dashboard">Dashboard</NavLink>
      <br />
    </div>
  );
};

export default Test;
