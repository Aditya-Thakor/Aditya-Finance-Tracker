import React from "react";

const FormInputs = (props) => {
  const {
    name,
    label,
    type,
    placeholder,
    className,
    id,
    handleChange,
    errmsg,
    value,
  } = props;
  return (
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label for="inputPassword6" class="col-form-label">
          {label}
        </label>
      </div>
      <div class="col-auto">
        {value ? (
          name !== "transactionReceipt" ? (
            <input
              onChange={handleChange || null}
              defaultValue={value[name]}
              type={type}
              name={name}
              id={id || ""}
              placeholder={placeholder || ""}
            />
          ) : value.transactionReceipt !== "" ? (
            <img src={value[name]} alt="imgas" width="120px" height="80px" />
          ) : (
            <input
              onChange={handleChange || null}
              defaultValue={value[name]}
              type={type}
              name={name}
              id={id || ""}
              placeholder={placeholder || ""}
            />
          )
        ) : (
          <input
            defaultValue=""
            type={type}
            name={name}
            id={id || ""}
            placeholder={placeholder || ""}
            onChange={handleChange}
          />
        )}
      </div>
      <div class="col-auto">
        <span id="passwordHelpInline" class="form-text">
          {errmsg ? errmsg[name] : null}
        </span>
      </div>
    </div>
  );
};

export default FormInputs;
