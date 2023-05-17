import React from "react";

const FormTextarea = (props) => {
  const {
    label,
    name,
    className,
    cols,
    rows,
    placeholder,
    errors,
    value,
    register,
  } = props;
  return (
    <div className={className}>
      <span className="errmsg"></span>
      <div>
        <div className="errmsg"></div>
        <div>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="inputPassword6" className="col-form-label">
                {label}
              </label>
            </div>
            <div className="col-auto">
              {value ? (
                <textarea
                  name={name}
                  cols={cols || "30"}
                  rows={rows || "5"}
                  defaultValue={value[name]}
                  placeholder={placeholder || ""}
                ></textarea>
              ) : (
                <textarea
                  name={name}
                  cols={cols || "30"}
                  rows={rows || "5"}
                  placeholder={placeholder || ""}
                  {...register(name)}
                ></textarea>
              )}
            </div>
            <div className="col-auto">
              <span id="passwordHelpInline" className="form-text">
                {errors && errors[name] && errors[name].message}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTextarea;
