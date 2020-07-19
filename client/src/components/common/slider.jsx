import React from "react";

const Slider = ({ name, label, error, ...rest }) => {
  return (
    <div className="custom-control custom-switch">
    <input
      {...rest}
      type="checkbox"
      className="custom-control-input"
      id={name}
      name={name}
    ></input>
    <label className="custom-control-label" htmlFor={name}>
      {label}
    </label>
  </div>
  );
};

export default Slider;
