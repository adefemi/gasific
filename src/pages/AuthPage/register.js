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
import { authUrl } from "../../components/utils/api";

function Register(props) {
  const [submit, setSubmit] = useState(false);
  const [registerData, setRegisterData] = useState({});
  if (!localStorage.getItem("gas_plan")) {
    props.history.push("/");
  }

  const onChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const onRegister = (status, payload) => {
    setSubmit(false);

    if (status) {
      Notification.bubble({
        type: "success",
        content: "Registration Successful"
      });
      setRegisterData({});
      setSubmit(false);
      props.history.push("/login");
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  const register = e => {
    e.preventDefault();
    setSubmit(true);

    if (registerData.password !== registerData.cpassword) {
      Notification.bubble({
        type: "error",
        content: "Password do not match!"
      });
      setSubmit(false);
      return;
    }

    let data = {
      email: registerData.email,
      password: registerData.password,
      name: `${registerData.firstName} ${registerData.lastName}`,
      plan_id: localStorage.getItem("gas_plan"),
      callback_url: "http://web2.gasific.ng/confirm"
      // phoneNumber: registerData.phoneNumber
    };
    axiosFunc("post", authUrl("register"), data, null, onRegister);
  };
  return (
    <AuthLayout>
      <div className="heading primary-text">
        Hi, Set up your Gasific account!
      </div>
      <form onSubmit={register}>
        <div className="grid-2">
          <FormGroup title="First Name">
            <Input
              required
              name="firstName"
              value={registerData.firstName || ""}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup title="Last Name">
            <Input
              required
              name="lastName"
              value={registerData.lastName || ""}
              onChange={onChange}
            />
          </FormGroup>
        </div>
        <FormGroup title="Email Address">
          <Input
            required
            name="email"
            type="email"
            value={registerData.email || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input
            required
            name="phoneNumber"
            type="number"
            value={registerData.phoneNumber || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Password">
          <Input
            required
            name="password"
            type="password"
            value={registerData.password || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input
            required
            name="cpassword"
            type="password"
            value={registerData.cpassword || ""}
            onChange={onChange}
          />
        </FormGroup>

        <Button block type="submit" loading={submit} disabled={submit}>
          Register
        </Button>
      </form>
      <br />
      <div className="text-center">
        <span className="text-info">
          Already have an account! <NavLink to="/login">Sign in</NavLink>
        </span>
      </div>
    </AuthLayout>
  );
}

export default Register;
