import React from "react";

export const FormInput = (props) => {
  const { label, name, placeholder, type, register, errors, className } = props;

  return (
    <div>
      <div>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">
              {label}
            </label>
          </div>
          <div className="col-auto">
            <input
              type={type}
              name={name}
              className={className?.className}
              placeholder={placeholder?.placeholder}
              {...(register ? register(name) : null)}
            />
          </div>
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
      </div>
    </div>
  );
};
