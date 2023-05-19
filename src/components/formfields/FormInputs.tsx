import React, { FC } from "react";

interface FormProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  errors?: object;
  register?: object;
  className?: string;
}

const FormInputs: FC<FormProps> = (props) => {
  const { name, type, placeholder, register, errors, className, label } = props;

  return <div>aasd</div>;
};

export default FormInputs;
