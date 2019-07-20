import React from "react";
import { Button, FormGroup, Input } from "../common";
import AppFacebookLogin from "../common/facebook/FacebookLogin";
import AppGoogleLogin from "../common/google/GoogleLogin";
import { NavLink } from "react-router-dom";

function AuthLayout(props) {
  return (
    <div className="container">
      <div className="fixed-brand">Gasific</div>
      <br />
      <br />
      <br />
      <br />
      <div className="max-width-500">
        <div className="heading primary-text">
          Welcome Back, Please login to your account
        </div>
        <div className="dflex">
          <AppFacebookLogin
            buttonText="Login with facebook"
            callback={() => null}
          />
          <div style={{ width: "50px" }} />
          <AppGoogleLogin
            buttonText="Login with google"
            clientId={""}
            onSuccess={() => null}
          />
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
        <div className="text-center">
          <span className="text-info">
            You don't have an account yet! <NavLink to="/">Sign Up</NavLink>
          </span>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default AuthLayout;
