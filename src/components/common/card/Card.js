import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

export const Card = props => {
  return (
    <div
      className={`card-main ${props.className} ${props.round && "round"}`}
      style={props.style}
    >
      {props.heading && <div className={"card-heading"}>{props.heading}</div>}
      {props.children}
    </div>
  );
};

Card.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  round: PropTypes.bool
};

Card.defaultProps = {
  style: {},
  round: false
};

export const SmallCard = props => {
  return (
    <div
      className={`card-main ${props.className} ${props.round && "round"}`}
      style={props.style}
    >
      {props.heading && (
        <div className={"card-heading-small"}>{props.heading}</div>
      )}
      {props.children}
    </div>
  );
};

Card.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  round: PropTypes.bool
};

Card.defaultProps = {
  style: {},
  round: false
};
