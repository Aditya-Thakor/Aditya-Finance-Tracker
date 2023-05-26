import { ButtonProps } from "../../modals/formButton";

const FormButton = (props: ButtonProps) => {
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
