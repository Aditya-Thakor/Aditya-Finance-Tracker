import React from "react";
import "./inputFields.css";
export const InputFields = (props) => {
  const { label, ...attributes } = props;
  return (
    <div className="section-row">
      <label htmlFor="">{label}</label>
      <div className="inputComp">
        <input className="inputs" {...attributes} />
      </div>
    </div>
  );
};
