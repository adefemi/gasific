import React, { useEffect, useState } from "react";
import AppIcon from "../../components/common/icons/Icon";
import hardwareImg from "../../assets/hardware.jpg";
import { errorHandler, numberWithCommas } from "../../components/utils/helper";
import { Card } from "../../components/common/card";
import { CheckOutCard } from "../summary/checkout";
import { DropDown } from "../../components/common/dropdown";
import { formatPlans, getPlans } from "../summary/summary";
import { Notification } from "../../components/common/notification";
import basic from "../summary/images/saphire.jpg";
import platinum from "../summary/images/gold.jpg";
import premium from "../summary/images/onyx1.jpg";
import { Spinner } from "../../components/common/spinner";

function PaymentControl(props) {
  const [plans, setPlans] = useState({
    data: [],
    fetching: true
  });
  const [activePlan, setActivePlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(5500);

  const productChanger = obj => {
    let activePlan = plans.data.filter(item => item.id === obj.id)[0];
    setTotalPrice(5500 + parseFloat(activePlan.price));
    setActivePlan(activePlan);
  };

  const onGetPlans = (status, payload) => {
    if (status) {
      try {
        setActivePlan(payload.data.data.plans[0]);
        setTotalPrice(5500 + parseFloat(payload.data.data.plans[0].price));
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
    getPlans(onGetPlans);
  }, []);

  const getImage = () => {
    let image = basic;
    if (!activePlan) return image;

    if (activePlan.name.toLowerCase().includes("onyx")) {
      image = basic;
    } else if (activePlan.name.toLowerCase().includes("gold")) {
      image = platinum;
    } else {
      image = premium;
    }
    return image;
  };

  return (
    <div>
      <div className="dflex align-center">
        <div
          style={{ marginRight: 40, marginBottom: 3 }}
          onClick={() => props.history.push("/dashboard/merchant")}
          className="link-btn"
        >
          <AppIcon name="arrowLeft" type="feather" />
        </div>
        <div className="dashboard-heading-2">Setup User</div>
      </div>
      <br />

      <div className="max-width-1200 dflex">
        <div style={{ flex: 4 }}>
          <Card round heading="Hardware">
            <div className="dflex padding-20 align-center">
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

              <div className="text-center bolder-text" style={{ flex: 1 }}>
                ₦ {numberWithCommas(5000)} <br />
              </div>
            </div>
          </Card>
          <br />
          <Card round heading="Subscription">
            <div className="dflex padding-20 align-center">
              {plans.fetching ? (
                <Spinner color="#999999" />
              ) : (
                <>
                  <div className="dflex align-center" style={{ flex: 3 }}>
                    <img
                      style={{
                        width: "100px",
                        height: "100px"
                      }}
                      src={getImage()}
                    />

                    <div style={{ paddingLeft: "20px" }}>
                      <DropDown
                        dropLogo
                        dropDownWidth={"200px"}
                        onChange={productChanger}
                        active={activePlan.id}
                        options={formatPlans(plans.data)}
                      />
                    </div>
                  </div>

                  <div className="text-center" style={{ flex: 1 }}>
                    ₦ {numberWithCommas(activePlan.price)} <br />
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
        <div style={{ flex: 2, marginLeft: "1em" }}>
          <CheckOutCard
            total={totalPrice}
            activePlan={activePlan}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentControl;
