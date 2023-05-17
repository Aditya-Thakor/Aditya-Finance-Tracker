import React from "react";

const FormInput = (props) => {
  const {
    name,
    type,
    label,
    placeholder,
    id,
    onChange,
    options,
    cols,
    rows,
    errors,
    value,
    className,
    register,
  } = props;

  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <input
            defaultValue={value && value[name]}
            id={id}
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            {...(register ? register(name) : null)}
          />
        );

      case "password":
        return (
          <input
            id={id}
            type={type}
            className={className}
            name={name}
            placeholder={placeholder}
            defaultValue={value && value[name]}
            {...(register ? register(name) : null)}
          />
        );

      case "date":
        return (
          <input
            id={id}
            type={type}
            name={name}
            className={className}
            defaultValue={value && value[name]}
            {...(register ? register(name) : null)}
          />
        );

      case "number":
        return (
          <input
            id={id}
            type={type}
            className={className}
            name={name}
            placeholder={placeholder}
            defaultValue={value && value[name]}
            {...(register ? register(name) : null)}
          />
        );

      case "file":
        return (
          <input
            id={id}
            type={type}
            className={className}
            name={name}
            defaultValue={value && value[name]}
            {...(register ? register(name) : null)}
          />
        );

      case "textarea":
        return (
          <textarea
            name={name}
            className={className}
            id={id}
            cols={cols || "30"}
            rows={rows || "2"}
            placeholder={placeholder || ""}
            defaultValue={value && value[name]}
            {...(register ? register(name) : null)}
          />
        );

      case "select":
        return (
          <select
            className={className}
            name={name}
            id={id}
            {...(register ? register(name) : null)}
          >
            <option value="">Select Option</option>
            {Object.entries(options).map(([val, option], i) =>
              value && value[name] === val ? (
                <option key={i} value={val} selected={true}>
                  {option}
                </option>
              ) : (
                <option key={i} value={val}>
                  {option}
                </option>
              )
            )}
          </select>
        );
      default:
        break;
    }
  };

  return (
    <div className="row g-3 align-items-center spacing">
      <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label">
          {label}
        </label>
      </div>
      <div className="col-auto">{renderField()}</div>
      <div className="col-auto">
        <span id="passwordHelpInline" className="form-text">
          {errors && name !== "confirm"
            ? errors[name] && <p>{errors[name].message}</p>
            : errors["confirm"] && (
                <p>Password and Confirm Password not match</p>
              )}
        </span>
      </div>
    </div>
  );
};

export default FormInput;
