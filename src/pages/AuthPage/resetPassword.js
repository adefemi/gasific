import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {
  FormGroup,
  Input,
  Button,
  Notification
} from "../../components/common";
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import { passwordUrl } from "../../components/utils/api";
import jwt from "jwt-simple";
import qs from "query-string";
import { secret } from "../../components/utils/data";

function ResetPassword(props) {
  const [submit, setSubmit] = useState(false);
  const [resetData, setResetData] = useState({});
  const [email, setEmail] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    let token = props.match.params.token;
    try {
      let decoded = jwt.decode(token, secret);
      let auth_token = qs.parse(props.location.search);
      setAuthToken(auth_token.token);
      setEmail(decoded.email);
    } catch (e) {
      Notification.bubble({
        type: "error",
        content: e
      });
      props.history.push("/login");
    }
  }, []);

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
      setTimeout(() => props.history.push("/login"), 500);
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  const retrieveUser = e => {
    e.preventDefault();
    if (resetData.password !== resetData.cpassword) {
      Notification.bubble({
        type: "error",
        content: "Error: Passwords do not match!"
      });
      return;
    }
    setSubmit(true);
    axiosFunc(
      "post",
      passwordUrl("reset"),
      { email, password: resetData.password },
      { Authorization: `Bearer ${authToken}` },
      onResetCompleted
    );
  };
  return (
    <AuthLayout>
      <div className="heading primary-text">Enter your new credentials</div>
      <form onSubmit={retrieveUser}>
        <FormGroup title="New password">
          <Input
            required
            name="password"
            type="password"
            value={resetData.password || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Confirm password">
          <Input
            required
            name="cpassword"
            type="password"
            value={resetData.cpassword || ""}
            onChange={onChange}
          />
        </FormGroup>
        <Button block type="submit" loading={submit} disabled={submit}>
          Reset Password
        </Button>
      </form>
      <br />
    </AuthLayout>
  );
}

export default ResetPassword;
