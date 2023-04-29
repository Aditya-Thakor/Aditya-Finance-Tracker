import React from "react";

export const DropDownlist = (props) => {
  const { label, name, errmsg, onChange, optionValue } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className="inputComp">
        <select className="inputs" name={name} id="" onChange={onChange}>
          <option value="">{label}</option>
          {optionValue.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <label className="errmsg" htmlFor="">
        {errmsg[name]}
      </label>
    </>
  );
};
