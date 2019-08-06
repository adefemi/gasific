import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Notification } from "../../components/common";
import logo from "../../assets/logos/logo1.png";

function Payment(props) {
  const onSubmit = e => {
    payWithPaystack();
  };

  const onSubmitCompleted = () => {
    Notification.bubble({
      type: "success",
      content: "Payment successful"
    });
    props.history.push("/verification");
  };

  const payWithPaystack = () => {
    var handler = window.PaystackPop.setup({
      key: "pk_test_3f76b7ddac49c6e97f490292425c14708df96c68",
      email: "customer@email.com",
      amount: 5500 * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678"
          }
        ]
      },
      callback: function(response) {
        onSubmitCompleted(response);
      },
      onClose: function() {
        props.history.goBack();
      }
    });
    handler.openIframe();
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <NavLink to="/" className="fixed-brand">
        <img src={logo} height="40px" alt="" />
      </NavLink>
    </div>
  );
}

export default Payment;
