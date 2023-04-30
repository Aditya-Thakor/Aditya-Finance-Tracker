import React from "react";

export const FormTextarea = (props) => {
  const {
    label,
    name,
    className,
    id,
    cols,
    rows,
    placeholder,
    errmsg,
    handleChange,
  } = props;
  return (
    <div className={className}>
      <label htmlFor="">{label}</label>
      <textarea
        name={name}
        id={id || ""}
        cols={cols || "30"}
        rows={rows || "5"}
        placeholder={placeholder || ""}
        onChange={handleChange}
      ></textarea>
      <span className="errmsg">{errmsg[name]}</span>
    </div>
  );
};

export const FormSelect = (props) => {
  const { label, name, id, className, errmsg, handleChange, options } = props;
  return (
    <div className={className}>
      <label htmlFor="">{label}</label>
      <select name={name} id={id || ""} onChange={handleChange}>
        <option value="">--- SELECT ---</option>
        {Object.entries(options).map(([value, option], index) => (
          <option key={index} value={value}>
            {option}
          </option>
        ))}
      </select>
      <span className="errmsg">{errmsg[name]}</span>
    </div>
  );
};

export const FormInputs = (props) => {
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

export const FormButton = (props) => {
  const { name, type, handleClick, className } = props;
  return (
    <div>
      <button className={className} type={type} onClick={handleClick}>
        {name}
      </button>
    </div>
  );
};
