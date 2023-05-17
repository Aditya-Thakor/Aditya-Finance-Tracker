import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInput } from "../../components/formFields/FormInput";
import { FormButton } from "../../components/formFields/FormButton";
import { UsersContext } from "../../context/UsersContext";
import { registerField } from "../../utils/const";

const Register = () => {
  const { userData, setUserData } = useContext(UsersContext);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email("Invalid Email Address"),
    password: yup
      .string()
      .required()
      .min(8, "More than 8 digits")
      .max(15, "Less than 15 digits"),

    confirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitted = (data) => {
    if (userData.length === 0) {
      setUserData(() => [data]);
    } else {
      userData.push(data);
      setUserData((userData) => userData);
    }
    navigate("/login");
  };

  return (
    <>
      <div className="nav">
        <Link className="anchor" to="/login">
          Login Here
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit(submitted)}>
          <h1>Register : </h1>
          {registerField.map((item, index) => (
            <div key={index}>
              <FormInput
                register={register}
                className="form-inputs"
                {...item}
                errors={errors}
              />
            </div>
          ))}
          <FormButton
            type="submit"
            className="inputs"
            name="Register"
            value="Register"
          />
        </form>
      </div>
    </>
  );
};
export default Register;
