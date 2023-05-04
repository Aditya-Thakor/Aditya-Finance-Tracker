import React from "react";

const FormButton = (props) => {
  const { name, type, handleClick, className } = props;

  return (
    <div>
      <button className={className} type={type} onClick={handleClick}>
        {name}
      </button>
    </div>
  );
};

export default FormButton;
