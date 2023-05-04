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
    <div className={className}>
      <label htmlFor="">{label}</label>
      {value ? (
        name !== "transactionReceipt" ? (
          <input
            onChange={handleChange || null}
            value={() => value[name]}
            type={type}
            name={name}
            id={id || ""}
            placeholder={placeholder || ""}
          />
        ) : (
          <img src={value[name]} alt="imgas" width="120px" height="80px" />
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
      <span className="errmsg">{errmsg ? errmsg[name] : null}</span>
    </div>
  );
};

export default FormInputs;
