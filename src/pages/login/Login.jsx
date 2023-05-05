import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { credits } from "../../utils/const";
import FormInputs from "../../components/FormFields/FormInputs";
import FormButton from "../../components/FormFields/FormButton";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(credits);

  const inputFields = [
    {
      label: "Enter Your Email Address : ",
      name: "email",
      placeholder: "Email Address",
      type: "text",
    },
    {
      label: "Enter Your Password : ",
      name: "pass",
      placeholder: "Password",
      type: "password",
    },
  ];

  const handleClick = async (e) => {
    const users = JSON.parse(localStorage.getItem("user"));

    users.map((item) => {
      if (
        item["email"] === credentials["email"].toLowerCase() &&
        item["pass"] === credentials["pass"]
      ) {
        const gettingToken = {
          key: Math.floor(Math.random() * 999999999999999),
          token: true,
        };
        localStorage.setItem("token", JSON.stringify(gettingToken));
        navigate("/view-transactions");
      }
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className="nav">
        <Link className="anchor" to="/public/register">
          Register Here
        </Link>
      </div>
      <div>
        <h1>Login</h1>
        {inputFields.map((item, index) => (
          <FormInputs
            key={index}
            className="form-inputs"
            {...item}
            handleChange={handleChange}
          />
        ))}
        <div className="submit-data">
          <FormButton name="Login" type="button" handleClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default Login;
