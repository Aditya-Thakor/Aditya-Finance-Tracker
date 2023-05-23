import * as yup from "yup";
import FormInputs from "../../components/formfields/FormInputs";
import FormButton from "../../components/formfields/FormButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Login = () => {
  const users = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  type TLogin = {
    email?: string;
    password?: string;
  };

  const loginSchema: yup.ObjectSchema<TLogin> = yup.object().shape({
    email: yup.string().required("Email Field is Empty"),
    password: yup.string().required("Password Field is Empty"),
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: TLogin): void => {
    users.map((user, i) => {
      if (user.email === data.email && user.password === data.password) {
        navigate("/view-transactions");
      }
      return 0;
    });

    setError(
      "password",
      { message: "Email/Password Incorrect" },
      { shouldFocus: false }
    );
  };

  return (
    <div>
      <div className="nav-link">
        <Link to="/">Register</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputs
          name="email"
          label="Enter Your Email  Adddress : "
          className="form-control"
          type="text"
          register={register}
          errors={errors}
        />
        <FormInputs
          name="password"
          className="form-control"
          label="Enter Your Password : "
          type="password"
          register={register}
          errors={errors}
        />
        <FormButton
          name="login"
          className="form-control"
          type="submit"
          label="Login"
        />
      </form>
    </div>
  );
};

export default Login;
