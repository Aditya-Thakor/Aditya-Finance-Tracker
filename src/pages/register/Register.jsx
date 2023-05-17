import React, { useState } from "react";
import { credits, registerField } from "../../utils/const";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/FormFields/FormButton";
import FormInput from "../../components/FormFields/FormInput";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux-dux/slices/userSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schemas = yup.object().shape({
    username: yup
      .string()
      .required("Username is Required")
      .min(3, "Username must be at least 3 characters"),
    email: yup
      .string()
      .required("Email Address is Required")
      .email("Invalid Email Address"),
    pass: yup.string().required("Password is Required"),
    confirm: yup
      .string()
      .required()
      .oneOf([yup.ref("pass")], "not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas),
  });

  const onSubmit = (data) => {
    dispatch(addUsers(data));
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
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>

          {registerField.map((item, index) => (
            <FormInput
              key={index}
              className="form-inputs"
              errors={errors}
              register={register}
              {...item}
            />
          ))}

          <div className="submit-data">
            <FormButton type="submit" className="inputs" name="Register" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
