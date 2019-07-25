import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FormGroup, Input, Button } from "../../components/common";
import { NavLink } from "react-router-dom";

function ForgotPassword(props) {
  return (
    <AuthLayout>
      <div className="heading primary-text">Provide your sign up email!</div>
      <form action="">
        <FormGroup title="Email Address">
          <Input />
        </FormGroup>
        <Button block>Verify Email</Button>
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
