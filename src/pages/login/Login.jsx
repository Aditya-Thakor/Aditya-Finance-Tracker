import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { credits, loginField } from "../../utils/const";
import FormButton from "../../components/FormFields/FormButton";
import FormInput from "../../components/FormFields/FormInput";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);
  const [credentials, setCredentials] = useState(credits);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onClick = (e) => {
    users.map((item) => {
      if (
        item["email"] === credentials["email"].toLowerCase() &&
        item["pass"] === credentials["pass"]
      ) {
        navigate("/view-transactions");
      }
      return 0;
    });
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = (data) => {
    console.log(data);
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
              errors={errors}
              register={register}
              {...item}
            />
          ))}
        </form>
        <div className="submit-data">
          <FormButton name="Login" type="button" handleClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default Login;
