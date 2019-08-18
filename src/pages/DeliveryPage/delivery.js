import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Notification, Loader } from "../../components/common";
import logo from "../../assets/logos/logo1.png";
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import { UserUrl } from "../../components/utils/api";
import { USERDATA } from "../../components/utils/data";

function Payment(props) {
  const [loading, setLoading] = useState(true);

  const onSubmit = e => {
    setLoading(false);
    payWithPaystack();
  };

  const onProfileUpdated = (status, data) => {
    if (status) {
      Notification.bubble({
        type: "success",
        content: "Payment successful"
      });
      props.history.push("/verification");
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  const onSubmitCompleted = () => {
    let user_info = localStorage.getItem("user_info");
    if (user_info) {
      let userData = JSON.parse(user_info);
      let userInfo = JSON.parse(localStorage.getItem(USERDATA));
      let meta = {
        delivery_address: userData.address,
        delivery_city: userData.city,
        delivery_state: userData.state,
        plan_id: userData.plan_id
      };
      let data = {
        ...userInfo,
        meta
      };
      setLoading(true);
      axiosFunc("post", UserUrl(), data, "yes", onProfileUpdated);
    } else {
      Notification.bubble({
        type: "success",
        content: "Payment successful"
      });
      props.history.push("/verification");
    }
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
        props.history.push("/");
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

      {loading && <Loader />}
    </div>
  );
}

export default Payment;
