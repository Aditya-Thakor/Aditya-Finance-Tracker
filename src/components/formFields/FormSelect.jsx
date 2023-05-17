import React from "react";

const FormSelect = (props) => {
  const { label, name, errors, register, options, value, handleChange } = props;

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
          {...(register && !handleChange ? register(name) : null)}
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
      </div>
      <div className="col-auto">
        <span id="passwordHelpInline" className="form-text">
          {errors && errors[name] && errors[name].message}
        </span>
      </div>
    </div>
  );
};

export default FormSelect;
