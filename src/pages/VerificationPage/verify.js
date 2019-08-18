import React, { useState } from "react";
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
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import RegularLayout from "../../components/layouts/RegularLayout/RegularLayout";
import Pickup from "./pickup";
import AppIcon from "../../components/common/icons/Icon";

const settings = {
  dots: false,
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
  const [activePage, setActivePage] = useState(1);

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    axiosFunc("POST", assingHardwareURl, deliveryData, "yes", onAssigned);
  };

  const onChange = e => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };

  const goNext = () => {
    setActivePage(2);
  };

  // callback for assigned hardware
  const onAssigned = (status, payload) => {
    setSubmit(false);
    if (status) {
      Notification.bubble({
        type: "success",
        content: "Whats left now is to place you hardware on you Gas Cylinder",
        title: "Process Completed"
      });
      props.history.push("/select-merchant");
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  return (
    <RegularLayout
      {...props}
      title={activePage === 1 ? "Pickup Device" : "Activate Hardware"}
    >
      <br />
      <br />
      {activePage === 1 && <Pickup goNext={goNext} />}
      {activePage === 2 && (
        <div>
          <div className="max-width-1000 grid-2-v">
            <Card heading="Hardware Information" className="min-width-300">
              <div className="padding-20">
                <div className="heading">
                  Please provide your hardware SSID
                  <br />
                  <small>
                    <i style={{ color: "#999999", fontWeight: "400" }}>
                      NB. This information can be found in the hardware pack
                      sent to you.
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
                <Slider {...settings}>
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
          <br />
          <br />
          <div className="max-width-1000 dflex align-center justify-between">
            <div />
            <Button onClick={() => setActivePage(1)}>
              Back <AppIcon name="chevronsLeft" type="feather" />{" "}
            </Button>
          </div>
        </div>
      )}
    </RegularLayout>
  );
}

export default Verify;
