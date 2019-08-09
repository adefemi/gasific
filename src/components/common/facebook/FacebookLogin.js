import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import PropTypes from "prop-types";
import { Button } from "../button";
import AppIcon from "../icons/Icon";

const propTypes = {
  appId: PropTypes.string,
  redirect: PropTypes.string,
  buttonText: PropTypes.any,
  callback: PropTypes.func.isRequired
};

const AppFacebookLogin = props => {
  return (
    <FacebookLogin
      appId="298997581049031"
      version={"v3.2"}
      autoLoad
      fields="name,email"
      redirectUri={props.redirect}
      callback={props.callback}
      render={renderProps => (
        <Button
          style={{
            backgroundColor: "#3C5A99",
            border: "0"
          }}
          className={props.className}
          icon={<AppIcon name={"facebook"} />}
          onClick={renderProps.onClick}
          block
        >
          <b>{props.buttonText || ""}</b>
        </Button>
      )}
    />
  );
};

AppFacebookLogin.propTypes = propTypes;

export default AppFacebookLogin;
