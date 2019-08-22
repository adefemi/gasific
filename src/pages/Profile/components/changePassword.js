import { FormGroup } from "../../../components/common/formGroup";
import { Input } from "../../../components/common/input";
import { Button } from "../../../components/common/button";
import React from "react";

const ChangePassword = props => {
  return (
    <form action="">
      <div className="max-width-600">
        <FormGroup title="Old Password">
          <Input type="password" />
        </FormGroup>
        <FormGroup title="New Password">
          <Input type="password" />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input type="password" />
        </FormGroup>

        <br />
        <Button>Update</Button>
      </div>
    </form>
  );
};

export default ChangePassword;
