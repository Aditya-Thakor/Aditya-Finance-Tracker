import React from "react";

export const InputFields = (props) => {
  const { label, name, errmsg, ...attributes } = props;

  return (
    <div className="section-row">
      <label htmlFor={name}>{label}</label>
      <div className="inputComp">
        <input className="inputs" name={name} {...attributes} />
      </div>
      <label className="errmsg" htmlFor="">
        {errmsg}
      </label>
    </div>
  );
};
