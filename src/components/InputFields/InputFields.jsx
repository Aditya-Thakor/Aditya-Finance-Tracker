import React from "react";

export const InputFields = (props) => {
  const { label, name, ...attributes } = props;
  console.log(props.name);
  return (
    <div className="section-row">
      <label htmlFor={name}>{label}</label>
      <div className="inputComp">
        <input className="inputs" name={name} {...attributes} />
      </div>
    </div>
  );
};
