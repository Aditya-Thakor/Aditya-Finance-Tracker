import React from "react";
import "./DropDown.css";
export const DropDownlist = (props) => {
  const { label, name, optionValue } = props;

  return (
    <>
      <label htmlFor="">{label}</label>
      <div className="inputComp">
        <select className="inputs" name={name} id="">
          {optionValue.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
