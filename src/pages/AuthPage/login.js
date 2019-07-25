import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FormGroup, Input, Button } from "../../components/common";
import AppFacebookLogin from "../../components/common/facebook/FacebookLogin";
import AppGoogleLogin from "../../components/common/google/GoogleLogin";
import { NavLink } from "react-router-dom";
import { Notification } from "../../components/common";

function Login(props) {
  const [submit, setSubmit] = useState(false);
  const [loginData, setLoginData] = useState({});

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
      Notification.bubble({
        type: "success",
        content: "Login successful"
      });
      props.history.push("/delivery");
    }, 2000);
  };

  const onChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
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
      <form onSubmit={onSubmit}>
        <FormGroup title="Email Address">
          <Input
            required
            name="email"
            value={loginData.email || ""}
            type="email"
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Password">
          <Input
            required
            name="password"
            value={loginData.password || ""}
            type="password"
            onChange={onChange}
          />
        </FormGroup>
        <div className="dflex justify-between">
          <div />
          <NavLink to={"/forgot-password"}>Forgot Password</NavLink>
        </div>
        <br />
        <Button loading={submit} disabled={submit} type="submit" block>
          Login
        </Button>
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
