import React from "react";

const FormSelect = (props) => {
  const { label, name, id, className, errmsg, handleChange, options, value } =
    props;
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
          ? Object.entries(options).map(([getvalue, option], index) =>
              value ? (
                value[name] === getvalue ? (
                  <option key={index} value={getvalue} selected={true}>
                    {option}
                  </option>
                ) : (
                  <option key={index} value={getvalue}>
                    {option}
                  </option>
                )
              ) : (
                <option key={index} value={getvalue}>
                  {option}
                </option>
              )
            )
          : null}
      </select>
      <span className="errmsg">{errmsg ? errmsg[name] : null}</span>
    </div>
  );
};

export default FormSelect;
