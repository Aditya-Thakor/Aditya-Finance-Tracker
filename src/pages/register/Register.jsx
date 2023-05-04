import React, { useState } from "react";

import { credits } from "../../utils/const";
import { Link, useNavigate } from "react-router-dom";
import FormInputs from "../../components/FormFields/FormInputs";
import FormButton from "../../components/FormFields/FormButton";
const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(credits);
  const [errmsg, setErrmsg] = useState(credits);

  const inputFields = [
    {
      label: "Enter Your Username : ",
      name: "username",
      placeholder: "Username",
      type: "text",
    },
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
    {
      label: "Enter Your Confirm Password : ",
      name: "confirm",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const emptyField = (name, value) => {
      value === ""
        ? setErrmsg({
            ...errmsg,
            [name]:
              name.charAt(0).toUpperCase() + name.slice(1) + " field is Empty",
          })
        : setErrmsg({ ...errmsg, [name]: "" });
    };

    switch (name) {
      case "username":
        emptyField(name, value);

        break;

      case "email":
        if (value === "") {
          emptyField(name, value);
        } else if (!/[a-z0-9]+@[a-z]+.[a-z]{2,3}$/.test(value)) {
          setErrmsg({ ...errmsg, [name]: "Invalid Email Address" });
        } else {
          setErrmsg({ ...errmsg, [name]: "" });
        }

        break;

      case "pass":
        emptyField(name, value);
        break;

      case "confirm":
        emptyField(name, value);
        credentials["pass"] !== value
          ? setErrmsg({
              ...errmsg,
              [name]: "Password & Confirm Password not Match",
            })
          : setErrmsg({ ...errmsg, [name]: "" });
        break;

      default:
    }
    name === "email"
      ? setCredentials({ ...credentials, [name]: value.toLowerCase() })
      : setCredentials({ ...credentials, [name]: value.toLowerCase() });
  };

  const handleClick = () => {
    let obj = {};

    Object.keys(credentials).map((item, index) => {
      if (credentials[item] === "") {
        obj = { ...obj, [item]: "Field is Empty" };
      }
    });

    setErrmsg({ ...errmsg, ...obj });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let arr = [];

    Object.values(errmsg).map((msg, index) => {
      if (!(msg === "")) arr.push("err");
      return 0;
    });

    if (!(arr.length > 0)) {
      let getvalue = JSON.parse(localStorage.getItem("user"));

      getvalue != null
        ? getvalue.push(credentials)
        : (getvalue = [credentials]);
      localStorage.setItem("user", JSON.stringify(getvalue));
      navigate("/login");
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {inputFields.map((item, index) => (
          <FormInputs
            key={index}
            className="form-inputs"
            handleChange={handleChange}
            errmsg={errmsg}
            {...item}
          />
        ))}
        <FormButton
          type="submit"
          className="inputs"
          name="Register"
          handleClick={handleClick}
        />
      </form>
      <Link to="/login">Login Here!</Link>
    </div>
  );
};

export default Register;
