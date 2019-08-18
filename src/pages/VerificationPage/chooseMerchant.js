import React, { useEffect, useState } from "react";
import { Button, Card } from "../../components/common";
import AppIcon from "../../components/common/icons/Icon";
import { getAllStates } from "../../components/utils/helper";
import AnimateHeight from "react-animate-height";
import RegularLayout from "../../components/layouts/RegularLayout/RegularLayout";
import { Radio, Tooltip } from "antd";
import { CustomAddress } from "./pickup";

function ChooseMerchant(props) {
  const array = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [showAddress, setShowAddress] = useState(false);
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
    setShowAddress(false);
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
            Use current location |{" "}
            <span onClick={() => setShowAddress(!showAddress)}>
              Custom Address
            </span>
          </div>
        </div>
        <br />
        <AnimateHeight height={showAddress ? "auto" : 0}>
          <div className="dflex align-center justify-between">
            <div />
            <div className="max-width-500" style={{ margin: 0 }}>
              <div className="divider" />
              <CustomAddress
                states={states}
                onSubmit={onSubmit}
                onChange={onChange}
                addressData={addressData}
              />
            </div>
          </div>
        </AnimateHeight>
        <br />
        <div className="grid-auto">
          {array.map((item, key) => (
            <Card round className="padding-20 position-relative" key={key}>
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
                <Radio name="merchant" id="merchant" />
              </div>
            </Card>
          ))}
        </div>
        <br />
        <br />
        <div className="dflex align-center justify-between">
          <div className="link-btn">See More</div>
          <Button onClick={() => props.history.push("/dashboard/user")}>
            Submit
          </Button>
        </div>
      </div>
    </RegularLayout>
  );
}

export default ChooseMerchant;
