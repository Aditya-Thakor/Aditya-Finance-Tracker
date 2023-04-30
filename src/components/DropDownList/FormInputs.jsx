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
  } = props;
  return (
    <div className={className}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        name={name}
        id={id || ""}
        placeholder={placeholder || ""}
        onChange={handleChange}
      />
      <span className="errmsg">{errmsg[name]}</span>
    </div>
  );
};

export default FormInputs;
