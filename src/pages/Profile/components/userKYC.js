import { FormGroup } from "../../../components/common/formGroup";
import { Input } from "../../../components/common/input";
import { Select } from "../../../components/common/select";
import { Button } from "../../../components/common/button";
import React from "react";

const UserKYC = props => {
  const { state, onChange, onSubmit, updating } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className="grid-auto">
        <FormGroup title="Family/home size">
          <Input
            name="home_size"
            value={state.home_size || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Gas Cylinder Code (Size)">
          <Select
            name="cylinder_code"
            value={state.cylinder_code}
            onChange={onChange}
          >
            <Select.Option value={5}>5kg</Select.Option>
            <Select.Option value={12}>12kg</Select.Option>
            <Select.Option value={25}>25kg</Select.Option>
            <Select.Option value={50}>50kg</Select.Option>
            <Select.Option value={75}>75kg</Select.Option>
            <Select.Option value={100}>100kg</Select.Option>
          </Select>
        </FormGroup>
      </div>
      <div className="grid-auto">
        <FormGroup title="Gender">
          <Select name="gender" value={state.gender || ""} onChange={onChange}>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="prefer_not_to_say">
              Prefer not to say
            </Select.Option>
          </Select>
        </FormGroup>
        <FormGroup title="Date of birth">
          <Input
            name="dob"
            value={state.dob || ""}
            onChange={onChange}
            type="date"
          />
        </FormGroup>
        <FormGroup title="Type of use">
          <Select
            name="type_of_use"
            value={state.type_of_use}
            onChange={onChange}
          >
            <Select.Option value={"commercial"}>Commercial</Select.Option>
            <Select.Option value={"household"}>Household</Select.Option>
          </Select>
        </FormGroup>
      </div>
      <br />
      <Button type="submit" loading={updating} disabled={updating}>
        Update
      </Button>
    </form>
  );
};

export default UserKYC;
