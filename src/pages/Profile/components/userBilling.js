import React from "react";

function UserBilling(props) {
  return (
    <div>
      <div className="heading">Billing Information</div>
      <i>
        You currently do not have a means through which you can be billed.
      </i>{" "}
      <span className="link-btn">Set up now</span>
    </div>
  );
}

export default UserBilling;
