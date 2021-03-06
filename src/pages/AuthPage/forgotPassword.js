import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {
  FormGroup,
  Input,
  Button,
  Notification
} from "../../components/common";
import { NavLink } from "react-router-dom";
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import { passwordUrl } from "../../components/utils/api";
import jwt from "jwt-simple";
import { secret } from "../../components/utils/data";

function ForgotPassword(props) {
  const [submit, setSubmit] = useState(false);
  const [resetData, setResetData] = useState({});

  const onChange = e => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value
    });
  };

  const onResetCompleted = (status, payload) => {
    setSubmit(false);
    if (status) {
      Notification.bubble({
        type: "success",
        content: payload.data.message
      });
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  const getCallback = () => {
    let payload = {
      email: resetData.email
    };
    let token = jwt.encode(payload, secret);
    return window.location.origin + `/reset-password/${token}`;
  };

  const retrieveUser = e => {
    e.preventDefault();
    setSubmit(true);
    let callback_url = getCallback();
    axiosFunc(
      "post",
      passwordUrl("verify"),
      { ...resetData, callback_url },
      null,
      onResetCompleted
    );
  };
  return (
    <AuthLayout>
      <div className="heading primary-text">Provide your sign up email!</div>
      <form onSubmit={retrieveUser}>
        <FormGroup title="Email Address">
          <Input
            required
            name="email"
            type="email"
            value={resetData.email || ""}
            onChange={onChange}
          />
        </FormGroup>
        <Button block type="submit" loading={submit} disabled={submit}>
          Verify Email
        </Button>
      </form>
      <br />
      <div className="text-center">
        <span className="text-info">
          <NavLink to="/login">Back to Login</NavLink>
        </span>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
