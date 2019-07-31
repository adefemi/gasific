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
import Slider from "react-slick";
import { assingHardwareURl } from "../../components/utils/api";
import { axiosFunc } from "../../components/utils/helper";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

function Verify(props) {
  const [submit, setSubmit] = useState(false);
  const [deliveryData, setDeliveryData] = useState({});
  console.log("ssid", deliveryData)

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    sendSsid(deliveryData.ssid)
  };

  const onChange = e => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };

  // sending hardware SSID
  const sendSsid = (hardSsid) => {
    axiosFunc("POST", assingHardwareURl, {ssid: hardSsid},  "yes", onAssigned )
  }

  // callback for assigned hardware
  const onAssigned = () => {
    setSubmit(false);
    Notification.bubble({
      type: "success",
      content: "Whats left now is to place you hardware on you Gas Cylinder",
      title: "Process Completed"
    });
   
  
    props.history.push("/dashboard/user");
  }

  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <NavLink to="/" className="fixed-brand">
        <img src={logo} height="40px" alt="" />
      </NavLink>

      <div
        className="center-content-main max-width-1400"
        style={{ paddingTop: "50px" }}
      >
        <div className="max-width-1000 grid-2-v">
          <Card heading="Hardware Information">
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
          <Card>
            <div className="padding-10" style={{ width: 300 }}>
              <h3>Setup Information</h3>
              <Slider {...settings}>
                {[1, 2, 3].map((i, ind) => {
                  return (
                    <div className={"banner-con"} key={ind}>
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
    </div>
  );
}

export default Verify;
