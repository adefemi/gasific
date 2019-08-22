import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  Input,
  Select
} from "../../components/common";
import AppIcon from "../../components/common/icons/Icon";
import { getAllStates } from "../../components/utils/helper";

export const CustomAddress = props => (
  <form onSubmit={props.onSubmit}>
    <FormGroup>
      <Input
        placeholder="Enter Address"
        name="address"
        onChange={props.onChange}
        value={props.addressData.address || ""}
      />
    </FormGroup>
    <div className="grid-2">
      <FormGroup>
        <Input
          placeholder="Enter town"
          name="town"
          style={{ minWidth: "150px" }}
          onChange={props.onChange}
          value={props.addressData.town || ""}
        />
      </FormGroup>
      <FormGroup>
        <div className="dflex align-center justify-between">
          <Select
            required
            name="state"
            value={props.addressData.state || ""}
            onChange={props.onChange}
          >
            {props.states &&
              props.states.length > 1 &&
              props.states.map((item, ind) => {
                return (
                  <Select.Option key={ind} value={item.value}>
                    {item.name}
                  </Select.Option>
                );
              })}
          </Select>
          <Button style={{ marginLeft: "10px" }} type="submit">
            Update
          </Button>
        </div>
      </FormGroup>
    </div>
  </form>
);

function Pickup(props) {
  const array = [1, 2, 3, 4, 5, 6];
  const [addressData, setAddressData] = useState({});
  const [states, setStates] = useState(null);
  useEffect(() => {
    setStates(getAllStates("nigeria", true));
  }, []);

  const onChange = e => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.name
    });
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="dflex align-center justify-between">
        <h3>Pickup centers near you</h3>
        <div className="link-btn">
          <AppIcon name="mapPin" type="feather" />
          Use current location
        </div>
      </div>
      <br />
      <Card round className="padding-10" heading="Home Address">
        <br />
        <div className="max-width-500" style={{ margin: 0 }}>
          <CustomAddress
            states={states}
            onSubmit={onSubmit}
            onChange={onChange}
            addressData={addressData}
          />
        </div>
      </Card>
      <br />
      <div className="grid-auto">
        {array.map((item, key) => (
          <Card round className="padding-20" key={key}>
            <div className="text-center padding-bottom-10 bolder-text link-btn">
              TOTAL FILLING STATION
            </div>
            <div>
              <AppIcon name="phoneCall" type="feather" /> &nbsp;&nbsp;{" "}
              <span className="link-btn">+234 803 3333</span>{" "}
            </div>
            <div>
              <AppIcon name="mapPin" type="feather" /> &nbsp;&nbsp;{" "}
              <span className="link-btn">6, fatai street, ikeja</span>{" "}
            </div>
            <div>
              <AppIcon name="globe" type="feather" /> &nbsp;&nbsp;{" "}
              <small className="link-btn">click to view directions</small>{" "}
            </div>
          </Card>
        ))}
      </div>
      <br />
      <br />
      <div className="dflex align-center justify-between">
        <div className="link-btn">See More</div>
        <Button onClick={props.goNext}>
          Next <AppIcon name="chevronsRight" type="feather" />{" "}
        </Button>
      </div>
    </div>
  );
}

export default Pickup;
