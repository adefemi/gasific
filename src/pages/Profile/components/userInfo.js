import { FormGroup } from "../../../components/common/formGroup";
import { Input } from "../../../components/common/input";
import { Select } from "../../../components/common/select";
import { getAllStates } from "../../../components/utils/helper";
import { Button } from "../../../components/common/button";
import React from "react";

const UserInfo = props => {
  const { state, onChange, onSubmit, updating } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <FormGroup title="Name">
          <Input
            name="name"
            value={state.name || ""}
            required
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Email Address">
          <Input
            type="email"
            name="email"
            value={state.email || ""}
            required
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input
            type="number"
            name="phone"
            value={state.phone || ""}
            required
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Home Address">
          <Input
            name="address"
            value={state.address || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="State">
          <Select name="state" value={state.state || ""} onChange={onChange}>
            {getAllStates("nigeria", true).map((item, id) => (
              <Select.Option key={id} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </FormGroup>
      </div>
      <FormGroup title="Referral Code">
        <Input
          name="referral_code"
          value={state.referral_code || ""}
          onChange={onChange}
        />
      </FormGroup>
      <br />
      <Button type="submit" loading={updating} disabled={updating}>
        Update
      </Button>
    </form>
  );
};

export default UserInfo;
