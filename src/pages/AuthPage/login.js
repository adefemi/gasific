import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FormGroup, Input, Button } from "../../components/common";
import AppFacebookLogin from "../../components/common/facebook/FacebookLogin";
import AppGoogleLogin from "../../components/common/google/GoogleLogin";
import { NavLink } from "react-router-dom";
import { Notification } from "../../components/common";
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import { authUrl } from "../../components/utils/api";
import { USERDATA, USERTOKEN } from "../../components/utils/data";
import qs from "query-string";

function Login(props) {
  const [submit, setSubmit] = useState(false);
  const [loginData, setLoginData] = useState({});

  const onLoginCompleted = (status, payload) => {
    setSubmit(false);
    if (status) {
      let activeData = payload.data.data;
      localStorage.setItem(USERTOKEN, activeData.access_token);
      localStorage.setItem(USERDATA, JSON.stringify(activeData.user));
      let query = qs.parse(props.location.search);
      if (!query.redirect) {
        query = qs.parse(localStorage.getItem("gasific_redirect"));
      }
      if (query.redirect) {
        props.history.push(`${query.redirect}`);
      } else {
        props.history.push("/dashboard/user");
      }
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    axiosFunc("post", authUrl("login"), loginData, null, onLoginCompleted);
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
