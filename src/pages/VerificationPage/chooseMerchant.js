import React, { useEffect, useState } from "react";
import { Button, Card } from "../../components/common";
import AppIcon from "../../components/common/icons/Icon";
import { getAllStates } from "../../components/utils/helper";
import RegularLayout from "../../components/layouts/RegularLayout/RegularLayout";
import { Tooltip } from "antd";
import { CustomAddress } from "./pickup";
import Checkbox from "../../components/common/checkbox/Checkbox";

function ChooseMerchant(props) {
  const array = [1, 2, 3, 4, 5, 6];
  const [addressData, setAddressData] = useState({});
  const [states, setStates] = useState(null);
  const [checked, setChecked] = useState(null);

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
    <RegularLayout title="Choose Merchant" {...props}>
      <br />
      <br />
      <div>
        <div className="dflex align-center justify-between">
          <h3>
            Merchant close to you{" "}
            <Tooltip
              title={
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusantium cumque dolorem, facere obcaecati quis temporibus!
                  A alias, blanditiis consequuntur corporis dicta dolor in
                  laudantium, nisi perspiciatis quam, quisquam temporibus
                  voluptates.
                </span>
              }
            >
              <span className="link-btn">
                <AppIcon name="helpCircle" type="feather" />
              </span>
            </Tooltip>
          </h3>
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
            <Card
              round
              className={
                checked === item
                  ? "padding-20 position-relative card-active"
                  : "padding-20 position-relative"
              }
              key={key}
            >
              <div className="padding-bottom-10 bolder-text link-btn">
                TOTAL FILLING STATION
              </div>
              <div className="padding-bottom-5">
                <AppIcon name="user" type="feather" /> &nbsp;&nbsp;{" "}
                <span className="link-btn">Mr Lateef Lawal</span>{" "}
              </div>
              <div className="padding-bottom-5">
                <AppIcon name="phoneCall" type="feather" /> &nbsp;&nbsp;{" "}
                <span className="link-btn">+234 803 3333</span>{" "}
              </div>
              <div>
                <AppIcon name="mapPin" type="feather" /> &nbsp;&nbsp;{" "}
                <span className="link-btn">6, fatai street, ikeja</span>{" "}
              </div>

              <div className="merchantRadio">
                <Checkbox
                  name="merchant"
                  id={key}
                  checked={checked === item}
                  onClick={() =>
                    checked === item ? setChecked(null) : setChecked(item)
                  }
                />
              </div>
            </Card>
          ))}
        </div>
        <br />
        <br />
        <div className="dflex align-center justify-between">
          <div className="link-btn">See More</div>
          <Button
            disabled={!checked}
            onClick={() => props.history.push("/dashboard/user")}
          >
            Submit
          </Button>
        </div>
      </div>
    </RegularLayout>
  );
}

export default ChooseMerchant;
