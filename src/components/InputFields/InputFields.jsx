import React from "react";

export const InputFields = (props) => {
  const { label, name, ...attributes } = props;

  return (
    <div className="section-row">
      <label htmlFor={name}>{label}</label>
      <div className="inputComp">
        <input className="inputs" name={name} {...attributes} />
      </div>
      <label htmlFor="">a</label>
    </div>
  );
};
