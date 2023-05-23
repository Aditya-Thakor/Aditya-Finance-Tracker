import * as yup from "yup";
import { useForm } from "react-hook-form";
import { registerField } from "../../utils/const";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import FormInputs from "../../components/formfields/FormInputs";
import FormButton from "../../components/formfields/FormButton";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type TRegister = {
    username?: string;
    password?: string;
    confirm?: string;
    email?: string;
  };

  const schema: yup.ObjectSchema<TRegister> = yup.object().shape({
    username: yup.string().required("Username is Required"),
    password: yup
      .string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters"),
    email: yup
      .string()
      .required("Email is Required")
      .email("Invalid Email Address"),
    confirm: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref("password")], "Password & Confirm Password not Match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: TRegister): void => {
    delete data?.confirm;
    dispatch(addUser(data));
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
