import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "../../components/common/card";
import { Switch } from "antd";
import {
  Button,
  FormGroup,
  Input,
  Notification
} from "../../components/common";
import logo from "../../assets/logos/logo1.png";

function Delivery(props) {
  const [submit, setSubmit] = useState(false);
  const [deliveryData, setDeliveryData] = useState({});
  const [referralSwitch, setReferralSwitch] = useState(true);

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    payWithPaystack();
  };

  const onSubmitCompleted = res => {
    setSubmit(false);
    Notification.bubble({
      type: "success",
      content: "Payment successful"
    });
    props.history.push("/verification");
  };

  const onChange = e => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };

  const onChangeSwitch = checked => {
    setReferralSwitch(checked);
  };

  const payWithPaystack = () => {
    var handler = window.PaystackPop.setup({
      key: "pk_test_3f76b7ddac49c6e97f490292425c14708df96c68",
      email: "customer@email.com",
      amount: 10000,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678"
          }
        ]
      },
      callback: function(response) {
        onSubmitCompleted(response);
      },
      onClose: function() {
        setSubmit(false);
      }
    });
    handler.openIframe();
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
        <form
          onSubmit={onSubmit}
          className="grid-2-v"
          style={{ width: "100%" }}
        >
          <Card style={{ width: "100%" }}>
            <div className="padding-20">
              <div className="heading">Delivery Information</div>

              <FormGroup title="Home Address">
                <Input
                  required
                  name="address"
                  value={deliveryData.address || ""}
                  type="text"
                  onChange={onChange}
                />
              </FormGroup>
              <div className="grid-2">
                <FormGroup title="City">
                  <Input
                    required
                    name="city"
                    value={deliveryData.city || ""}
                    type="text"
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup title="State">
                  <Input
                    required
                    name="state"
                    value={deliveryData.state || ""}
                    type="text"
                    onChange={onChange}
                  />
                </FormGroup>
              </div>

              <div className="grid-2">
                <FormGroup
                  title={
                    <div className="dflex align-center">
                      <span> Referral/Discount Code</span>
                      <div className="margin-left-10" />
                      <Switch defaultChecked onChange={onChangeSwitch} />
                    </div>
                  }
                >
                  {referralSwitch && (
                    <Input
                      name="referral"
                      value={deliveryData.referral || ""}
                      type="text"
                      onChange={onChange}
                    />
                  )}
                </FormGroup>
              </div>
            </div>
          </Card>
          <Card style={{ width: "100%" }}>
            <div className="padding-20">
              <div className="heading">Order Summary</div>
              <br />
              <div className="black-text bolder-text font-14">Email</div>
              <small>email@email.com</small>
              <br />
              <br />

              <div className="black-text bolder-text font-14">Membership</div>
              <small>Sapphire (Quarterly)</small>
              <br />
              <br />

              <div className="black-text bolder-text font-14">Full name</div>
              <small>Firstname Lastname</small>
              <br />
              <br />
              <br />
              <div className="dflex justify-between align-center">
                <div className="font-14">Membership</div>
                <div className="black-text bolder-text font-14">N1,200.00</div>
              </div>
              <div className="dflex justify-between align-center">
                <div className="font-14">Device Price</div>
                <div className="black-text bolder-text font-14">N5,500.00</div>
              </div>
              {referralSwitch && (
                <div className="dflex justify-between align-center">
                  <div className="font-14">Discount</div>
                  <div className="black-text bolder-text font-14">-N0.00</div>
                </div>
              )}
              <br />
              <div className="dflex justify-between align-center">
                <div className="black-text bolder-text font-18">Total</div>
                <div className="black-text bolder-text font-18">N6,700.00</div>
              </div>
              <br />
              <Button block type="submit" loading={submit} disabled={submit}>
                Place Order
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Delivery;
