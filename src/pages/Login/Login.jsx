import React, { useContext, useEffect } from "react";
import { FormInput } from "../../components/formFields/FormInput";
import { useForm } from "react-hook-form";
import { FormButton } from "../../components/formFields/FormButton";
import { defaultUsers } from "../../utils/const";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";

const Login = () => {
  const { userData } = useContext(UsersContext);
  console.log(userData);
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputFields = [
    {
      name: "email",
      label: "Email : ",
      placeholder: "Enter Your Email Address",
      type: "text",
    },
    {
      name: "password",
      label: "Password : ",
      placeholder: "Enter Password",
      type: "text",
    },
  ];

  const checkUser = (data) => {
    if (userData.length > 0) {
      if (
        userData[0].email !== data.email ||
        userData[0].password !== data.password
      ) {
        setError(
          "password",
          { type: "custome", message: "username/password incorrect" },
          { shouldFocus: false }
        );
      } else {
        navigate("/view-transactions");
      }
    } else {
      setError(
        "password",
        { type: "custome", message: "There is no data in Context" },
        { shouldFocus: false }
      );
    }
  };

  return (
    <div>
      <div className="nav">
        <Link className="anchor" to="/">
          Register Here
        </Link>
      </div>
      <h1>Login : </h1>
      <form onSubmit={handleSubmit(checkUser)}>
        {inputFields.map((item, index) => (
          <div key={index}>
            <FormInput
              {...item}
              className="form-inputs"
              register={register}
              errors={errors}
            />
          </div>
        ))}
        <FormButton
          type="submit"
          className="inputs"
          name="login"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
