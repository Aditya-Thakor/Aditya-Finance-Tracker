import React from "react";

const FormTextarea = (props) => {
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
    value,
  } = props;
  return (
    <div className={className}>
      <label htmlFor="">{label}</label>
      {value ? (
        <textarea
          name={name}
          id={id || ""}
          cols={cols || "30"}
          rows={rows || "5"}
          defaultValue={value[name]}
          placeholder={placeholder || ""}
          onChange={handleChange}
        ></textarea>
      ) : (
        <textarea
          name={name}
          id={id || ""}
          cols={cols || "30"}
          rows={rows || "5"}
          placeholder={placeholder || ""}
          onChange={handleChange}
        ></textarea>
      )}

      <span className="errmsg">{errmsg[name]}</span>
    </div>
  );
};

export default FormTextarea;
