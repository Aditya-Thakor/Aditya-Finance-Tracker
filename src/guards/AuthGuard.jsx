import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthGuard = ({ children }) => {
  const cookie = new Cookies();
  const isAuthorized = cookie.get("auth");

  return isAuthorized ? children : <Navigate to="/login" replace={true} />;
};

export default AuthGuard;
