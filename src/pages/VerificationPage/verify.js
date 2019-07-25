import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "../../components/common/card";
import { Button, FormGroup, Input } from "../../components/common";

function Verify(props) {
  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <NavLink to="/" className="fixed-brand">
        Gasific
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

              <form action="">
                <FormGroup>
                  <Input placeholder="Enter ssid" />
                </FormGroup>

                <Button>Submit</Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Verify;
