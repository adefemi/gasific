import { Tag } from "antd";
import React from "react";

const HardwareInfo = props => {
  const { state } = props;
  return (
    <div className="padding-20">
      <h4>Hardware Information</h4>
      <br />
      <p>
        <small className="black-text bolder-text">
          SSID: {state.ssid || "N/A"}
        </small>
      </p>
      <p>
        <small className="black-text bolder-text">Model: {state.model}</small>
      </p>
      <div>
        <small className="black-text bolder-text">
          Status:{" "}
          {state.status === 1 ? (
            <Tag color="green">True</Tag>
          ) : (
            <Tag color="orange">False</Tag>
          )}
        </small>
      </div>
      <p>
        <small className="black-text bolder-text">DESC: {state.desc}</small>
      </p>
    </div>
  );
};

export default HardwareInfo;
