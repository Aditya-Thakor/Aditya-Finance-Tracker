import React from "react";

const FormSelect = (props) => {
  const { label, name, id, className, errmsg, handleChange, options, value } =
    props;
  return (
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label for="inputPassword6" class="col-form-label">
          {label}
        </label>
      </div>
      <div class="col-auto">
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
      </div>
      <div class="col-auto">
        <span id="passwordHelpInline" class="form-text">
          {errmsg ? errmsg[name] : null}
        </span>
      </div>
    </div>
  );
};

export default FormSelect;
