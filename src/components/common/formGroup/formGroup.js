import React from "react";
import "./formGroup.css";
import Proptypes from "prop-types";

const FormGroup = props => {
  return (
    <div className={`form-group ${props.className}`} style={props.style}>
      <label htmlFor={props.name}>{props.title}</label>
      {props.children}
    </div>
  );
};

FormGroup.propTypes = {
  title: Proptypes.string,
  className: Proptypes.string,
  style: Proptypes.string
};

export default FormGroup;
