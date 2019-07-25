import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "../../components/common/card";
import { Button, FormGroup, Input } from "../../components/common";

function Delivery(props) {
  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <NavLink to="/" className="fixed-brand">
        Gasific
      </NavLink>

      <div
        className="center-content-main max-width-1400"
        style={{ paddingTop: "50px" }}
      >
        <div className="grid-2-v" style={{ width: "100%" }}>
          <Card style={{ width: "100%" }}>
            <div className="padding-20">
              <div className="heading">Delivery Information</div>
              <form action="">
                <FormGroup title="Home Address">
                  <Input />
                </FormGroup>
                <div className="grid-2">
                  <FormGroup title="City">
                    <Input />
                  </FormGroup>
                  <FormGroup title="State">
                    <Input />
                  </FormGroup>
                </div>
                <div className="grid-2">
                  <FormGroup title="Referral/Discount Code">
                    <Input />
                  </FormGroup>
                </div>
              </form>
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
              <div className="dflex justify-between align-center">
                <div className="font-14">Discount</div>
                <div className="black-text bolder-text font-14">-N0.00</div>
              </div>
              <br />
              <div className="dflex justify-between align-center">
                <div className="black-text bolder-text font-18">Total</div>
                <div className="black-text bolder-text font-18">N6,700.00</div>
              </div>
              <br />
              <Button block>Place Order</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
