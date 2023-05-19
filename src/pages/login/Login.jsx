import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginField } from "../../utils/const";
import FormButton from "../../components/FormFields/FormButton";
import FormInput from "../../components/FormFields/FormInput";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const users = useSelector((state) => state.users);

  const schema = Yup.object().shape({
    email: Yup.string().required("Email Field is Empty"),
    pass: Yup.string().required("Password Field is Required"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    users.map((item) => {
      if (item["email"] === data["email"] && item["pass"] === data["pass"]) {
        cookie.set("auth", "shadjkhasjkdasdhjkagsfjkjkasdfglkjasdlkgjl", {
          maxAge: 60 * 60 * 1024,
        });
        navigate("/view-transactions");
      }
      return 0;
    });
    setError(
      "pass",
      { type: "custome", message: "email/password incorrect" },
      { shouldFocus: false }
    );
  };

  return (
    <>
      <div className="nav">
        <Link className="anchor" to="/register">
          Register Here
        </Link>
      </div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginField.map((item, index) => (
            <FormInput
              key={index}
              className="form-inputs"
              register={register}
              errors={errors}
              {...item}
            />
          ))}
          <div className="submit-data">
            <FormButton name="Login" type="submit" className="inputs" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
