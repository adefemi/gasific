import React, { useState, useEffect } from "react";
import { Card, DropDown, Notification } from "../../components/common";
import "./summary.css";
import basic from "./images/saphire.jpg";
import premium from "./images/onyx1.jpg";
import platinum from "./images/gold.jpg";
import {
  axiosFunc,
  errorHandler,
  getAllStates,
  numberWithCommas
} from "../../components/utils/helper";

import hardwareImg from "../../assets/hardware.jpg";
import RegularLayout from "../../components/layouts/RegularLayout/RegularLayout";
import { Delivery } from "./delivery";
import { CheckOutCard } from "./checkout";
import { getPlanUrl } from "../../components/utils/api";

const Summary = props => {
  const [plans, setPlans] = useState({
    data: [],
    fetching: true
  });
  const [activePlan, setActivePlan] = useState(null);
  const [states, setStates] = useState(null);
  const [referralSwitch, setReferral] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState({});

  const onGetPlans = (status, payload) => {
    if (status) {
      try {
        setActivePlan(payload.data.data.plans[0]);
        setPlans({
          data: payload.data.data.plans,
          fetching: false
        });
      } catch (e) {
        Notification.bubble({
          type: "error",
          content: e
        });
      }
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  useEffect(() => {
    getPlans();
    setStates(getAllStates("nigeria", true));
  }, []);

  const getPlans = () => {
    axiosFunc("GET", getPlanUrl, {}, {}, onGetPlans);
  };

  const productChanger = obj => {
    let activePlan = plans.data.filter(item => item.id === obj.id)[0];
    setActivePlan(activePlan);
  };

  const onSubmit = e => {
    e.preventDefault();
    localStorage.setItem(
      "user_info",
      JSON.stringify({
        deliveryData,
        plan_id: activePlan.id
      })
    );
    setLoading(true);
    setTimeout(() => {
      props.history.push("/payment");
    }, 2000);
  };

  const onChange = e => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };

  const onChangeSwitch = checked => {
    setReferral(checked);
  };

  return (
    <RegularLayout title="Summary" {...props}>
      <br />
      <br />
      <form onSubmit={onSubmit} className="grid-2-v">
        <div>
          {plans.fetching ? (
            "Please wait..."
          ) : (
            <ProductList
              plans={plans.data}
              activePlan={activePlan}
              productChanger={productChanger}
            />
          )}
          <br />
          <Delivery
            state={deliveryData}
            referralSwitch={referralSwitch}
            onChange={onChange}
            onChangeSwitch={onChangeSwitch}
            states={states}
          />
        </div>
        <div>
          <CheckOutCard
            referralSwitch={referralSwitch}
            activePlan={activePlan}
            loading={loading}
          />
        </div>
      </form>
    </RegularLayout>
  );
};

const formatPlans = plans => {
  let newPlans = [];

  plans.map(item => {
    newPlans.push({
      id: item.id,
      value: item.id,
      content: item.name,
      price: item.price
    });
    return null;
  });
  return newPlans;
};

export const ProductList = props => {
  const { plans, activePlan, productChanger } = props;
  let image = basic;

  if (activePlan.name.toLowerCase().includes("onyx")) {
    image = basic;
  } else if (activePlan.name.toLowerCase().includes("gold")) {
    image = platinum;
  } else {
    image = premium;
  }

  return (
    <Card
      heading={
        <div className="dflex align-center">
          <div className="heading-2" style={{ flex: 3 }}>
            Product
          </div>
          <div className="heading-2 text-center" style={{ flex: 1 }}>
            Item Price
          </div>
        </div>
      }
    >
      <div className="dflex align-center padding-20">
        <div className="dflex align-center" style={{ flex: 3 }}>
          <img
            style={{
              width: "100px",
              height: "100px"
            }}
            src={image}
          />

          <div style={{ paddingLeft: "20px" }}>
            <DropDown
              dropLogo
              dropDownWidth={"200px"}
              onChange={productChanger}
              active={activePlan.id}
              options={formatPlans(plans)}
            />
          </div>
        </div>

        <div className="text-center" style={{ flex: 1 }}>
          ₦ {numberWithCommas(activePlan.price)} <br />
        </div>
      </div>
      <div className="divider" />
      <div className="dflex padding-20">
        <div className="dflex align-center" style={{ flex: 3 }}>
          <img
            style={{
              width: "100px",
              height: "100px"
            }}
            src={hardwareImg}
          />

          <div className="padding-20 bolder-text">Hardware</div>
        </div>

        <div className="text-center" style={{ flex: 1 }}>
          ₦ {numberWithCommas(5000)} <br />
        </div>
      </div>
    </Card>
  );
};

export default Summary;
