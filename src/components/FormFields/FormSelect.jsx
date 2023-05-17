import React from "react";

const FormSelect = (props) => {
  const { label, name, id, className, errmsg, handleChange, options, value } =
    props;

  return (
    <div className="row align-items">
      <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label">
          {label}
        </label>
      </div>
      <div className="col-auto">
        <select
          className="form-select"
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
      </div>
      <div className="col-auto">
        <span id="passwordHelpInline" className="form-text">
          {errmsg ? errmsg[name] : null}
        </span>
      </div>
    </div>
  );
};

export default FormSelect;
