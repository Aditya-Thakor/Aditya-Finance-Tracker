import React, { Suspense } from "react";

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
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label">
          {label}
        </label>
      </div>
      <div className="col-auto">
        {value ? (
          name !== "transactionReceipt" ? (
            <input
              className={className}
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
      <div className="col-auto">
        <span id="passwordHelpInline" className="form-text">
          {errmsg ? errmsg[name] : null}
        </span>
      </div>
    </div>
  );
};

export default FormInputs;
