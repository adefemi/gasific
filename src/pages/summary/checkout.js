import React from "react";
import { Card, Button } from "../../components/common";
import { numberWithCommas } from "../../components/utils/helper";
import verve from "./images/verve2.png";
import master from "./images/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg";
import visa from "./images/visa3.png";
import lock from "./images/lock.ico";

export const CheckOutCard = props => {
  const { activePlan, loading, referralSwitch, total } = props;

  return (
    <Card
      heading={
        <div className="dflex align-center justify-between padding-10">
          <div className="heading-2">Checkout</div>
          <div className="heading-2">Items</div>
        </div>
      }
    >
      <div className="dflex align-center justify-between padding-20">
        <div className="">
          <span>Delivery:</span>
        </div>
        <div>₦ {numberWithCommas(500)}</div>
      </div>
      <div className="dflex align-center justify-between padding-20">
        <div className="">
          <span>
            {activePlan ? activePlan.name || "Subscription" : "Subscription"}
          </span>
        </div>
        <div>₦ {numberWithCommas(activePlan && activePlan.price)}</div>
      </div>
      <div className="dflex align-center justify-between padding-20">
        <div className="">
          <span>Hardware:</span>
        </div>
        <div>₦ {numberWithCommas(5000)}</div>
      </div>
      {referralSwitch && (
        <div className="dflex align-center justify-between padding-20">
          <div className="">
            <span>Discount:</span>
          </div>
          <div>-0.0</div>
        </div>
      )}

      <div className="divider" />

      <div className="dflex align-center justify-between padding-20">
        <div className="bolder-text">Total </div>
        <div className="bolder-text">
          ₦ {activePlan ? numberWithCommas(total) : null}
        </div>
      </div>
      <div className="divider" />
      <div className="padding-20">
        <div
          style={{
            color: "#b87300",
            fontSize: ".6875rem"
          }}
        >
          Excluding delivery charges
        </div>
        <p />
        <Button
          block
          color={"success"}
          type="submit"
          disabled={loading || !activePlan}
          loading={loading}
        >
          Continue to Payment
        </Button>
      </div>

      <div className="divider" />

      <div className="dflex align-center padding-10">
        <span className="security-text ">We accept</span>
        <div className="margin-left-10">
          <img width={50} src={verve} alt="fin-service" />
        </div>
        <div className="margin-left-10">
          <img width={50} src={master} alt="fin-service" />
        </div>
        <div className="margin-left-10">
          <img width={50} src={visa} alt="fin-service" />
        </div>
      </div>

      <div className="dflex align-center padding-10">
        <img width={30} height={30} src={lock} alt="fin-service" />
        <span className="security-text">
          Transactions are 100% Safe and Secure
        </span>
      </div>
    </Card>
  );
};
