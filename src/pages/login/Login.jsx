import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInputs from "../../components/DropDownList/FormInputs";
import FormButton from "../../components/DropDownList/FormButton";
import { credits } from "../../utils/const";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState(credits);
  const [errmsg, setErrmsg] = useState(credits);

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

  let count = 1;
  const handleClick = (e) => {
    const users = JSON.parse(localStorage.getItem("user"));
    users.map((item) => {
      if (
        item["email"] === credentials["email"] &&
        item["pass"] === credentials["pass"]
      ) {
        navigate("/view-transactions");
        console.log(count++);
      }
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
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
      <Link to="/register"> Register Here </Link>
      <FormButton name="Login" handleClick={handleClick} />
    </div>
  );
};

export default Login;
