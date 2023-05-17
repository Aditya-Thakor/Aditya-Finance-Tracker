import React from "react";

export const FormButton = (props) => {
  const { type, name, value, className } = props;

  return (
    <div>
      <button className={className} type={type} name={name}>
        {value}
      </button>
    </div>
  );
};
