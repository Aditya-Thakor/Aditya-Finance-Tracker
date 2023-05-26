import * as yup from "yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerField } from "../../utils/const";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import FormInputs from "../../components/formfields/FormInputs";
import FormButton from "../../components/formfields/FormButton";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { validRegsiter } from "../../utils/yupValidations";
import { TRegister } from "../../modals/register";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema: yup.ObjectSchema<TRegister> = validRegsiter;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FieldValues> = (data): void => {
    delete data?.confirm;
    dispatch(addUser(data as TRegister));
    navigate("/login");
  };

  return (
    <div>
      <div className="nav-link">
        <Link to="/login">Login</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {registerField.map((field, i) => (
          <FormInputs
            className="form-control"
            errors={errors}
            register={register}
            {...field}
            key={i}
          />
        ))}
        <FormButton
          name="register"
          className="form-control"
          type="submit"
          label="Register"
        />
      </form>
    </div>
  );
};

export default Register;
