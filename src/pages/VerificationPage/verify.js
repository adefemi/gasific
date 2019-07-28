import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "../../components/common/card";
import {
  Button,
  FormGroup,
  Input,
  Notification
} from "../../components/common";
import logo from "../../assets/logos/logo1.png";

function Verify(props) {
  const [submit, setSubmit] = useState(false);
  const [deliveryData, setDeliveryData] = useState({});

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
      Notification.bubble({
        type: "success",
        content: "Whats left now is to place you hardware on you Gas Cylinder",
        title: "Process Completed"
      });
      props.history.push("/dashboard/user");
    }, 2000);
  };

  const onChange = e => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <NavLink to="/" className="fixed-brand">
        <img src={logo} height="40px" alt="" />
      </NavLink>

      <div
        className="center-content-main max-width-1400"
        style={{ paddingTop: "50px" }}
      >
        <div className="max-width-600">
          <Card style={{ width: "100%" }} heading="Hardware Information">
            <div className="padding-20">
              <div className="heading">
                Please provide your hardware SSID
                <br />
                <small>
                  <i style={{ color: "#999999", fontWeight: "400" }}>
                    NB. This information can be found in the hardware pack sent
                    to you.
                  </i>
                </small>
              </div>

              <form onSubmit={onSubmit}>
                <FormGroup>
                  <Input
                    placeholder="Enter ssid"
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
        </div>
      </div>
    </div>
  );
}

export default Verify;
