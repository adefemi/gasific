import React, { useState } from "react";
import AppIcon from "../../components/common/icons/Icon";
import { Card } from "../../components/common/card";
import { FormGroup } from "../../components/common/formGroup";
import { Input } from "../../components/common/input";
import { Button } from "../../components/common/button";

function NewUser(props) {
  const [registerData, setRegisterData] = useState({});
  const [submit, setSubmit] = useState(false);
  const onChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    props.history.push("/dashboard/merchant/user-config");
  };

  return (
    <div>
      <div onClick={() => props.history.goBack()} className="link-btn">
        <AppIcon name="arrowLeft" type="feather" />
      </div>
      <br />

      <Card round className="max-width-600" heading="Add User">
        <form onSubmit={onSubmit} className="padding-20">
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
          <div className="grid-2">
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
                name="phone"
                type="number"
                value={registerData.phone || ""}
                onChange={onChange}
              />
            </FormGroup>
          </div>
          <div className="grid-2">
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
          </div>
          <Button block type="submit" loading={submit} disabled={submit}>
            Create User
          </Button>{" "}
        </form>
      </Card>
    </div>
  );
}

export default NewUser;
