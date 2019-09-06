import React, { useEffect, useState } from "react";
import { getAllStates } from "../../components/utils/helper";
import { FormGroup } from "../../components/common/formGroup";
import { Input } from "../../components/common/input";
import { Select } from "../../components/common/select";
import { Button } from "../../components/common/button";

const BusinessInfo = props => {
  const [states, setStates] = useState(null);
  useEffect(() => {
    setStates(getAllStates("nigeria", true));
  }, []);
  return (
    <>
      <FormGroup title="Business Name">
        <Input
          required
          name="businessName"
          placeholder="Provide your business name"
          value={props.merchantData.businessName || ""}
          onChange={props.onChange}
        />
      </FormGroup>
      <FormGroup title="Contact Name">
        <Input
          required
          name="contactName"
          placeholder="What's you contact name"
          value={props.merchantData.contactName || ""}
          onChange={props.onChange}
        />
      </FormGroup>
      <FormGroup title="Address">
        <Input
          required
          name="address"
          placeholder="Enter you business address"
          value={props.merchantData.address || ""}
          onChange={props.onChange}
        />
      </FormGroup>
      <div className="grid-2">
        <FormGroup title="City">
          <Input
            required
            name="city"
            placeholder="What city are you located"
            value={props.merchantData.city || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="State">
          <Select
            required
            name="state"
            value={props.merchantData.state || ""}
            onChange={props.onChange}
          >
            {states &&
              states.length > 1 &&
              states.map((item, ind) => {
                return (
                  <Select.Option key={ind} value={item.value}>
                    {item.name}
                  </Select.Option>
                );
              })}
          </Select>
        </FormGroup>
      </div>
      <Button
        block
        type="submit"
        loading={props.submit}
        disabled={props.submit}
      >
        Register
      </Button>
    </>
  );
};

export default BusinessInfo;
