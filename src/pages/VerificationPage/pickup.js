import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  Input,
  Select,
  Notification,
  Spinner
} from "../../components/common";
import AppIcon from "../../components/common/icons/Icon";
import {
  axiosFunc,
  getActiveAddress,
  getActivePosition,
  getAllStates
} from "../../components/utils/helper";
import { merchantUrl } from "../../components/utils/api";

const setupOptions = (data, name, value) => {
  let optionList = [];

  data.map((item, key) => {
    optionList.push(
      <Select.Option key={key} value={item[value]}>
        {item[name]}
      </Select.Option>
    );
    return null;
  });

  optionList.unshift(
    <Select.Option key={"main01"} value={""}>
      --make a selection--
    </Select.Option>
  );

  return optionList;
};

export const CustomAddress = props => (
  <form onSubmit={props.onSubmit}>
    <div className="grid-auto" style={{ gridRowGap: 10 }}>
      <FormGroup style={{ marginBottom: 15 }}>
        <Input
          placeholder="Enter Address"
          name="address"
          onChange={props.onChange}
          value={props.addressData.address || ""}
        />
      </FormGroup>
      <FormGroup style={{ marginBottom: 15 }}>
        <Input
          placeholder="Enter town"
          name="town"
          style={{ minWidth: "150px" }}
          onChange={props.onChange}
          value={props.addressData.town || ""}
        />
      </FormGroup>
      <FormGroup style={{ marginBottom: 15 }}>
        <div className="dflex align-center justify-between">
          <Select
            required
            name="state"
            value={props.addressData.state || ""}
            onChange={props.onChange}
          >
            {props.states &&
              props.states.length > 1 &&
              setupOptions(props.states, "name", "value")}
          </Select>
          <Button style={{ marginLeft: "10px" }} type="submit">
            Search
          </Button>
        </div>
      </FormGroup>
    </div>
  </form>
);

function Pickup(props) {
  const [addressData, setAddressData] = useState({});
  const [states, setStates] = useState(null);
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

  const onSubmit = e => {
    e.preventDefault();
  };

  const useCurrentLocation = async () => {
    getActivePosition((data, status) => {
      if (status) {
        getActiveAddress(
          data.lat,
          data.lng,
          (data, status) => {
            if (status) {
              setAddressData({ ...data });
            }
          },
          "single"
        );
      }
    });
  };

  return (
    <div>
      <div className="dflex align-center justify-between">
        <h3>Pickup Address near you</h3>
        <div className="link-btn" onClick={useCurrentLocation}>
          <AppIcon name="mapPin" type="feather" />
          Use current location
        </div>
      </div>
      <br />
      <Card round className="padding-10">
        <div style={{ margin: 0, padding: "0 10px" }}>
          <CustomAddress
            states={states}
            onSubmit={onSubmit}
            onChange={onChange}
            addressData={addressData}
          />
        </div>
      </Card>
      <br />
      {merchants.fetching ? (
        <>
          {" "}
          <center>
            <Spinner color="#999999" size={30} />
          </center>
        </>
      ) : (
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
                className="padding-20 dflex flex-d-v justify-between"
                key={key}
              >
                <div>
                  <div
                    className="text-center padding-bottom-10 bolder-text link-btn"
                    style={{ textTransform: "capitalize" }}
                  >
                    {metaData.businessName || ""}
                  </div>
                  <div>
                    <AppIcon name="phoneCall" type="feather" /> &nbsp;&nbsp;{" "}
                    <span className="link-btn">{item.phone || ""}</span>{" "}
                  </div>
                  <div>
                    <AppIcon name="mapPin" type="feather" /> &nbsp;&nbsp;{" "}
                    <span className="link-btn">{`${metaData.address ||
                      ""}, ${metaData.city || ""}, ${metaData.state ||
                      ""}`}</span>{" "}
                  </div>
                </div>
                <div className="send-details">Get Details</div>
              </Card>
            );
          })}
        </div>
      )}

      <br />
      <br />
      {!merchants.fetching && (
        <div className="dflex align-center justify-between">
          {nextUrl ? (
            <div className="link-btn" onClick={() => null}>
              See More
            </div>
          ) : (
            <div />
          )}
          <Button onClick={props.goNext}>
            Next <AppIcon name="chevronsRight" type="feather" />{" "}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Pickup;
