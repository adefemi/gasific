import React from "react";
import { Card, FormGroup, Input, Select } from "../../components/common";
import { Switch } from "antd";

export const Delivery = props => {
  let { state, onChange, referralSwitch, onChangeSwitch, states } = props;
  return (
    <Card style={{ width: "100%" }}>
      <div className="padding-20">
        <div className="heading">Delivery Information</div>

        <FormGroup title="Home Address">
          <Input
            required
            name="delivery_address"
            value={state.delivery_address || ""}
            type="text"
            onChange={onChange}
          />
        </FormGroup>
        <div className="grid-2">
          <FormGroup title="City">
            <Input
              required
              name="delivery_city"
              value={state.delivery_city || ""}
              type="text"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup title="State">
            <Select
              required
              name="delivery_state"
              value={state.delivery_state || ""}
              onChange={onChange}
              defaultOption
            >
              <Select.Option value="">--select state--</Select.Option>
              {states && states.length > 1
                ? states.map((item, ind) => {
                    return (
                      <Select.Option key={ind} value={item.value}>
                        {item.name}
                      </Select.Option>
                    );
                  })
                : []}
            </Select>
          </FormGroup>
        </div>

        <div className="grid-2">
          <FormGroup
            title={
              <div className="dflex align-center">
                <span> Referral/Discount Code</span>
                <div className="margin-left-10" />
                <Switch checked={referralSwitch} onChange={onChangeSwitch} />
              </div>
            }
          >
            {referralSwitch && (
              <Input
                name="referral"
                value={state.referral || ""}
                type="text"
                onChange={onChange}
              />
            )}
          </FormGroup>
        </div>
      </div>
    </Card>
  );
};
