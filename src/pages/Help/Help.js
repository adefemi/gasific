import React from "react";
import { Card, Modal } from "../../components/common";
import AppIcon from "../../components/common/icons/Icon";
import { NavLink } from "react-router-dom";

function Help(props) {
  const onChatClick = () => {
    Modal.info({
      content:
        "Click on the blue bubble with envelop located at the bottom left of this screen to start chatting"
    });
  };

  return (
    <div>
      {" "}
      <div className="dflex align-center justify-between">
        <div className="dashboard-heading">Help</div>
      </div>
      <br />
      <div className="grid-3">
        <Card
          round
          className="padding-20 dflex flex-d-v align-center justify-center help-card"
        >
          <div className="help-icon">
            <AppIcon name="arrows_circle_check" type="linea" size={80} />
          </div>
          <div className="help-text">Contact Us</div>
        </Card>
        <Card
          round
          className="padding-20 dflex flex-d-v align-center justify-center help-card"
          onClick={onChatClick}
        >
          <div className="help-icon">
            <AppIcon
              name="basic_elaboration_message_check"
              type="linea"
              size={80}
            />
          </div>
          <div className="help-text">Chat Us</div>
        </Card>
        <NavLink to="/dashboard/help/FAQ">
          <Card
            round
            className="padding-20 dflex flex-d-v align-center justify-center help-card"
          >
            <div className="help-icon">
              <AppIcon name="basic_todo_txt" type="linea" size={80} />
            </div>
            <div className="help-text">See FAQ</div>
          </Card>
        </NavLink>
      </div>
    </div>
  );
}

export default Help;
