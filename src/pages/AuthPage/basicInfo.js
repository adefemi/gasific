import { FormGroup } from "../../components/common/formGroup";
import { Input } from "../../components/common/input";
import { Radio } from "antd";
import { Button } from "../../components/common/button";
import React from "react";

const BasicInfo = props => {
  return (
    <>
      <div className="grid-2">
        <FormGroup title="First Name">
          <Input
            required
            name="firstName"
            value={props.registerData.firstName || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="Last Name">
          <Input
            required
            name="lastName"
            value={props.registerData.lastName || ""}
            onChange={props.onChange}
          />
        </FormGroup>
      </div>
      <div className="grid-2">
        <FormGroup title="Email Address">
          <Input
            required
            name="email"
            type="email"
            value={props.registerData.email || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input
            required
            name="phone"
            type="number"
            value={props.registerData.phone || ""}
            onChange={props.onChange}
          />
        </FormGroup>
      </div>

      <div className="grid-2">
        <FormGroup title="Password">
          <Input
            required
            name="password"
            type="password"
            value={props.registerData.password || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input
            required
            name="cpassword"
            type="password"
            value={props.registerData.cpassword || ""}
            onChange={props.onChange}
          />
        </FormGroup>
      </div>

      <FormGroup title="Register as" className="label-inline">
        <br />
        <Radio.Group
          name="role"
          defaultValue={"customer"}
          onChange={props.onChange}
        >
          <Radio value="customer">Customer</Radio>
          <Radio value="merchant">Merchant</Radio>
        </Radio.Group>
      </FormGroup>

      <Button
        block
        type="submit"
        loading={props.submit}
        disabled={props.submit}
      >
        {props.registerData.role && props.registerData.role === "merchant"
          ? "Continue"
          : "Register"}
      </Button>
    </>
  );
};

export default BasicInfo;
