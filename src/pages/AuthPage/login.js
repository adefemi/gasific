import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FormGroup, Input, Button } from "../../components/common";
import AppFacebookLogin from "../../components/common/facebook/FacebookLogin";
import AppGoogleLogin from "../../components/common/google/GoogleLogin";
import { NavLink } from "react-router-dom";

function Login(props) {
  return (
    <AuthLayout>
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
        <div className="dflex justify-between">
          <div />
          <NavLink to={"/forgot-password"}>Forgot Password</NavLink>
        </div>
        <br />
        <Button block>Login</Button>
      </form>
      <br />
      <div className="text-center">
        <span className="text-info">
          You don't have an account yet!{" "}
          <NavLink to="/register">Sign Up</NavLink>
        </span>
      </div>
    </AuthLayout>
  );
}

export default Login;
