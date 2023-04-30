import React from "react";

const FormSelect = (props) => {
  const { label, name, id, className, errmsg, handleChange, options } = props;
  return (
    <div className={className || null}>
      <label htmlFor="">{label || null}</label>
      <select
        name={name || null}
        id={id || null}
        onChange={handleChange || null}
      >
        <option value="">--- SELECT ---</option>

        {options
          ? Object.entries(options).map(([value, option], index) => (
              <option key={index} value={value}>
                {option}
              </option>
            ))
          : null}
      </select>
      <span className="errmsg">{errmsg ? errmsg[name] : null}</span>
    </div>
  );
};

export default FormSelect;
