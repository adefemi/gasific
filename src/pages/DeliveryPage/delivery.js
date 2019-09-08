import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Notification, Loader, Modal, Spinner } from "../../components/common";
import logo from "../../assets/logos/logo1.png";
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import { PaymentUrl, UserUrl } from "../../components/utils/api";
import { MainContext } from "../../stateManagement/contextProvider";
import qs from "query-string";

function Payment(props) {
  const [loading, setLoading] = useState(true);
  const { state } = useContext(MainContext);
  const [showVerify, setShowVerify] = useState(false);

  const onProfileUpdated = (status, data) => {
    if (status) {
      Notification.bubble({
        type: "success",
        content: "Payment successful"
      });
      let queryData = qs.parse(props.location.search);
      if (queryData.redirect) {
        props.history.push(queryData.redirect);
      } else {
        props.history.push("/verification");
      }
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  const verifyPayment = (response, data) => {
    setShowVerify(true);
    axiosFunc(
      "get",
      PaymentUrl(`verify?reference=${data.reference}`),
      null,
      "yes",
      onSubmitCompleted
    );
  };

  const onSubmitCompleted = (status, data) => {
    if (status) {
      let user_info = localStorage.getItem("user_info");
      if (user_info) {
        let userData = JSON.parse(user_info);
        let meta = {
          delivery_address: userData.delivery_address,
          delivery_city: userData.delivery_city,
          delivery_state: userData.delivery_state,
          plan_id: userData.plan_id
        };
        let data = {
          ...state.user,
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
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  const payWithPaystack = data => {
    let handler = window.PaystackPop.setup({
      key: data.paystack_key,
      email: state.user.email,
      amount: data.total * 100,
      currency: "NGN",
      ref: data.reference,
      metadata: {
        custom_fields: [
          {
            display_name: state.user.name,
            variable_name: state.user.name,
            value: state.phone
          }
        ]
      },
      callback: function(response) {
        verifyPayment(response, data);
      },
      onClose: function() {
        props.history.push("/");
      }
    });

    handler.openIframe();
  };

  useEffect(() => {
    initializePayment();
  }, []);

  const onPaymentInitialized = (status, data) => {
    if (status) {
      payWithPaystack(data.data.data);
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  const initializePayment = () => {
    axiosFunc(
      "get",
      PaymentUrl(`init?callback_url=${window.location.href}`),
      null,
      "yes",
      onPaymentInitialized
    );
  };

  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <Modal
        visible={showVerify}
        closable={false}
        footer={false}
        onClose={() => null}
      >
        <center>
          <Spinner color="#999999" size={30} />
          <br />
          <span>Verifying payment, please wait...</span>
        </center>
      </Modal>
      <NavLink to="/" className="fixed-brand">
        <img src={logo} height="40px" alt="" />
      </NavLink>

      {loading && !showVerify && <Loader />}
    </div>
  );
}

export default Payment;
