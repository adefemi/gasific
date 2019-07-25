import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FormGroup, Input, Button } from "../../components/common";
import { NavLink } from "react-router-dom";

function Register(props) {
  return (
    <AuthLayout>
      <div className="heading primary-text">
        Hi, Set up your Gasific account!
      </div>
      <form action="">
        <div className="grid-2">
          <FormGroup title="First Name">
            <Input />
          </FormGroup>
          <FormGroup title="Last Name">
            <Input />
          </FormGroup>
        </div>
        <FormGroup title="Email Address">
          <Input />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input />
        </FormGroup>
        <FormGroup title="Password">
          <Input />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input />
        </FormGroup>

        <Button block>Register</Button>
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
