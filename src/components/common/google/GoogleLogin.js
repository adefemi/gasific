import React from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";

import { Button } from "../button";
import AppIcon from "../icons/Icon";

import "./GoogleLogin.css";

const propTypes = {
  clientId: PropTypes.string.isRequired,
  buttonText: PropTypes.any,
  onSuccess: PropTypes.func.isRequired
};

const AppGoogleLogin = props => {
  return (
    <GoogleLogin
      clientId={props.clientId}
      buttonText="Login"
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
      cookiePolicy={"single_host_origin"}
      render={renderProps => (
        <Button
          style={{ border: "1px solid #c3c3c3" }}
          className={`GoogleLogin ${props.className}`}
          icon={<AppIcon style={{ color: "#DB4437" }} name={"google"} />}
          onClick={renderProps.onClick}
          block
        >
          <b>{props.buttonText || ""}</b>
        </Button>
      )}
    />
  );
};

AppGoogleLogin.propTypes = propTypes;

export default AppGoogleLogin;
