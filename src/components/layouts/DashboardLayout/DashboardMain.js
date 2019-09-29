import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { withRouter } from "react-router";
import { Button, Checkbox } from "antd";
import { MainContext } from "../../../stateManagement/contextProvider";
import { Modal, Spinner, Notification } from "../../common";
import { axiosFunc, errorHandler, numberWithCommas } from "../../utils/helper";
import { getPlanUrl, subscriptionUrl } from "../../utils/api";

function DashboardMain(props) {
  const {
    state: { subscriptions, activeUser }
  } = useContext(MainContext);

  const checkActive = sub => {
    let active = null;
    sub.map(item => {
      if (item.status === 1) {
        active = 1;
      }
      return numberWithCommas();
    });
    return !active;
  };

  return (
    <div className="dashboard-main">
      <SideBar {...props} activeUser={activeUser} />
      <div className="mainContainer">
        <NavBar
          {...props}
          showStatus={!(subscriptions && checkActive(subscriptions))}
          activeUser={activeUser}
        />
        <div className="contentMain">
          {props.children}
          <br />
          <br />
          {subscriptions && checkActive(subscriptions) && (
            <ActivateSub {...props} />
          )}
        </div>
      </div>
    </div>
  );
}

const ActivateSub = props => {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeSub, setActiveSub] = useState(null);

  useEffect(() => {
    axiosFunc("get", getPlanUrl, null, null, (status, data) => {
      if (status) {
        setPlans(data.data.data.plans);
        setFetching(false);
      } else {
        Notification.bubble({
          type: "error",
          content: errorHandler(data)
        });
      }
    });
  }, []);

  const proceedToPayment = () => {
    if (!activeSub) {
      Notification.bubble({
        type: "error",
        content: "You need to choose a subscription"
      });
      return;
    }
    setLoading(true);
    axiosFunc(
      "post",
      subscriptionUrl(),
      { plan_id: activeSub.id },
      "yes",
      (status, data) => {
        if (status) {
          props.history.push(
            `/payment?redirect=${props.location.pathname}&type=sub`
          );
        } else {
          setLoading(false);
          Notification.bubble({
            type: "error",
            content: errorHandler(data)
          });
        }
      }
    );
  };

  return (
    <div className="activate-subscription">
      <Modal
        onClose={() => setShowModal(false)}
        title="Choose Subscription"
        visible={showModal}
      >
        {fetching ? (
          <div>
            <br />
            <center>
              <Spinner color="#999" />
            </center>
            <br />
          </div>
        ) : (
          <div>
            <div className="padding-20">
              {plans.map((item, key) => (
                <div key={key} className="padding-bottom-10">
                  <Checkbox
                    checked={activeSub && activeSub.price === item.price}
                    onChange={() => setActiveSub(item)}
                  >
                    {item.name} - ₦ {numberWithCommas(item.price)}
                  </Checkbox>
                </div>
              ))}
            </div>
            <br />
            <Button
              type="ghost"
              onClick={proceedToPayment}
              loading={loading}
              disabled={loading}
            >
              Proceed to payment
            </Button>
          </div>
        )}
      </Modal>
      <div className="sub-headline">
        <center>
          You currently don't have an active <b>Subscription</b>. All activities
          are disabled until activation.{" "}
          <Button type="dashed" onClick={() => setShowModal(true)}>
            Activate Now
          </Button>
        </center>
      </div>
    </div>
  );
};

export default withRouter(DashboardMain);
