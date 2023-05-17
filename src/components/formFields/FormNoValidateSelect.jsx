import React from "react";

const FormNoValidateSelect = (props) => {
  const { label, name, options, handleChange } = props;

  return (
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label">
          {label}
        </label>
      </div>
      <div className="col-auto">
        <select
          className="form-select"
          name={name || null}
          onChange={handleChange}
        >
          <option value="">--- SELECT ---</option>

          {options
            ? Object.entries(options).map(([getvalue, option], index) => (
                <option key={index} value={getvalue}>
                  {option}
                </option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
};

export default FormNoValidateSelect;
