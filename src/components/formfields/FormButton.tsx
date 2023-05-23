import React, { FC } from "react";
import { MouseEventHandler } from "react";

type ButtonProps = {
  name: string;
  type: "submit" | "reset" | "button";
  label: string;
  value?: string;
  className?: string;
  onClick?: MouseEventHandler<any>;
};

const FormButton: FC<ButtonProps> = (props) => {
  const { label, className, value, name, type, onClick } = props;

  return (
    <div className="component">
      <div className="col-md-4">
        <button
          type={type}
          className={className}
          name={name}
          value={value}
          onClick={onClick}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default FormButton;
