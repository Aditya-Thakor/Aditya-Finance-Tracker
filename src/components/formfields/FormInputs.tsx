import React, { FC } from "react";
import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

type InputProps = {
  label?: string;
  name: string;
  type: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  errors?: FieldErrors;
  options?: object;
  onchange?: React.ChangeEventHandler<unknown>;
  register?: UseFormRegister<FieldValues>;
};

// const onchagetTesting = (e: any) => {
//   type a = ReturnType<typeof e>;
//   console.log(typeof a);
// };
const FormInputs = (props: InputProps) => {
  const {
    name,
    type,
    placeholder,
    options,
    register,
    errors,
    className,
    rows,
    cols,
    label,
    onchange,
  } = props;

  const errmsg = (errors && errors[name] && errors[name]?.message) as string;

  const returnField = (): JSX.Element => {
    switch (type) {
      case "text":
        return (
          <input
            type={type}
            className={className}
            name={name}
            placeholder={placeholder}
            {...(register ? register(name) : null)}
            onChange={onchange}
          />
        );

      case "select":
        return (
          <select
            className="form-select"
            {...(register ? register(name) : null)}
            onChange={onchange}
          >
            <option value="">Select Option</option>
            {Object.entries(options as object).map(
              ([val, opt], i) =>
                val !== "transactionReceipt" && (
                  <option key={i} value={val}>
                    {opt}
                  </option>
                )
            )}
          </select>
        );

      case "password":
        return (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={className}
            {...(register ? register(name) : null)}
          />
        );

      case "number":
        return (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={className}
            {...(register ? register(name) : null)}
          />
        );

      case "date":
        return (
          <input
            type={type}
            name={name}
            className={className}
            {...(register ? register(name) : null)}
          />
        );

      case "textarea":
        return (
          <textarea
            cols={cols}
            rows={rows}
            name={name}
            className={className}
            {...(register ? register(name) : null)}
          />
        );

      case "file":
        return (
          <input
            type={type}
            name={name}
            className={className}
            {...(register ? register(name) : null)}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="component">
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">
          {label}
        </label>
        <div className="fields">
          <div>{returnField()}</div>
          <div className="error-message">{errmsg}</div>
        </div>
      </div>
    </div>
  );
};

export default FormInputs;
