import React, { useState } from "react";
import AppIcon from "../../components/common/icons/Icon";
import { Card } from "../../components/common/card";
import { FormGroup } from "../../components/common/formGroup";
import { Input } from "../../components/common/input";
import { Button } from "../../components/common/button";
import Slider from "react-slick";
import logo from "../../assets/logos/logo1.png";
import { sliderSettings } from "../VerificationPage/verify";

function ActivateHardware(props) {
  const [deliveryData, setDeliveryData] = useState({});
  const [submit, setSubmit] = useState(false);
  const onChange = e => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    props.history.push("/dashboard/merchant/users");
  };
  return (
    <div>
      <div onClick={() => props.history.goBack()} className="link-btn">
        <AppIcon name="arrowLeft" type="feather" />
      </div>
      <br />
      <div className="max-width-1000 grid-2-v">
        <Card heading="Hardware Information" className="min-width-300">
          <div className="padding-20">
            <div className="heading">
              Please provide your hardware SSID
              <br />
              <small>
                <i style={{ color: "#999999", fontWeight: "400" }}>
                  NB. This information can be found in the hardware pack sent to
                  you.
                </i>
              </small>
            </div>

            <form onSubmit={onSubmit}>
              <FormGroup>
                <Input
                  placeholder="Enter SSID"
                  required
                  name="ssid"
                  value={deliveryData.ssid || ""}
                  type="text"
                  onChange={onChange}
                />
              </FormGroup>

              <Button type="submit" disabled={submit} loading={submit}>
                Submit
              </Button>
            </form>
          </div>
        </Card>
        <Card>
          <div className="padding-10 setup-description">
            <h3>Setup Information</h3>
            <Slider {...sliderSettings}>
              {[1, 2, 3].map((i, ind) => {
                return (
                  <div className="banner-con" key={ind}>
                    <img
                      src={""}
                      alt=""
                      style={{ backgroundImage: `url("${logo}")` }}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ActivateHardware;
