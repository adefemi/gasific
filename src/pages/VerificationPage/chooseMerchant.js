import React, { useEffect, useState } from "react";
import { Button, Card, Notification } from "../../components/common";
import AppIcon from "../../components/common/icons/Icon";
import {
  axiosFunc,
  errorHandler,
  getAllStates
} from "../../components/utils/helper";
import RegularLayout from "../../components/layouts/RegularLayout/RegularLayout";
import { Tooltip } from "antd";
import { CustomAddress } from "./pickup";
import Checkbox from "../../components/common/checkbox/Checkbox";
import { merchantUrl } from "../../components/utils/api";

function ChooseMerchant(props) {
  const [addressData, setAddressData] = useState({});
  const [states, setStates] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [checked, setChecked] = useState(null);
  const [merchants, setMerchants] = useState({
    data: [],
    fetching: true
  });
  const [nextUrl, setNextUrl] = useState(null);

  const onGetMerchant = (status, payload) => {
    if (status) {
      setNextUrl(payload.data.data.merchants.next_page_url);
      setMerchants({
        data: payload.data.data.merchants.data,
        fetching: false
      });
    } else {
      Notification.bubble({
        type: "error",
        content: payload
      });
    }
  };

  useEffect(() => {
    setStates(getAllStates("nigeria", true));
    axiosFunc("get", merchantUrl("s"), null, "yes", onGetMerchant);
  }, []);

  const onChange = e => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.name
    });
  };

  const onSubmit = () => {
    setSubmit(true);
    axiosFunc(
      "post",
      merchantUrl("/assign"),
      { merchant_id: checked.id },
      "yes",
      (status, data) => {
        setSubmit(false);
        if (status) {
          Notification.bubble({
            type: "success",
            content: "Mechant assigned successfully"
          });
          props.history.push("/dashboard/user");
        } else {
          Notification.bubble({
            type: "error",
            content: errorHandler(data)
          });
        }
      }
    );
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
          {merchants.data.map((item, key) => {
            let metaData = {};
            item.meta.map(j => {
              metaData[j.meta_key] = j.meta_value;
              return null;
            });
            return (
              <Card
                round
                className={
                  checked === item
                    ? "padding-20 position-relative card-active"
                    : "padding-20 position-relative"
                }
                key={key}
              >
                <div
                  className="padding-bottom-10 bolder-text link-btn"
                  style={{ textTransform: "capitalize" }}
                >
                  {metaData.businessName || ""}
                </div>
                <div className="padding-bottom-5">
                  <AppIcon name="user" type="feather" /> &nbsp;&nbsp;{" "}
                  <span
                    className="link-btn"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.name || ""}
                  </span>{" "}
                </div>
                <div className="padding-bottom-5">
                  <AppIcon name="phoneCall" type="feather" /> &nbsp;&nbsp;{" "}
                  <span className="link-btn">{item.phone || ""}</span>{" "}
                </div>
                <div>
                  <AppIcon name="mapPin" type="feather" /> &nbsp;&nbsp;{" "}
                  <span className="link-btn">{`${metaData.address ||
                    ""}, ${metaData.city || ""}, ${metaData.state ||
                    ""}`}</span>{" "}
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
            );
          })}
        </div>
        <br />
        <br />
        <div className="dflex align-center justify-between">
          {nextUrl ? (
            <div className="link-btn" onClick={() => null}>
              See More
            </div>
          ) : (
            <div />
          )}
          <Button
            disabled={!checked || submit}
            onClick={onSubmit}
            loading={submit}
          >
            Submit
          </Button>
        </div>
      </div>
    </RegularLayout>
  );
}

export default ChooseMerchant;
