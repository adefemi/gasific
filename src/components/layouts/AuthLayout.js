import React from "react";
import { Button, FormGroup, Input } from "../common";
import AppFacebookLogin from "../common/facebook/FacebookLogin";
import AppGoogleLogin from "../common/google/GoogleLogin";
import { NavLink } from "react-router-dom";

function AuthLayout(props) {
  return (
    <div>
      <h1>Gasific</h1>
      <div className="max-width-600 centralized">
        <div className="heading">
          Welcome Back, Please login to your account
        </div>
        <div className="dflex">
          <AppFacebookLogin callback={() => null} />
          <AppGoogleLogin clientId={""} onSuccess={() => null} />
        </div>
        <div className="auth-seperator">OR</div>
        <form action="">
          <FormGroup title="Email Address">
            <Input />
          </FormGroup>
          <FormGroup title="Password">
            <Input />
          </FormGroup>
          <Button block>Login</Button>
        </form>
        <br />
        You don't have an account yet! <NavLink to="/">Sign Up</NavLink>
        {props.children}
      </div>
    </div>
  );
}

export default AuthLayout;
