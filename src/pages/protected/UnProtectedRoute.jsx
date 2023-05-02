import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AddTransaction from "../AddTransaction/AddTransaction";
import ViewTransaction from "../ViewTransaction/ViewTransaction";
import Transaction from "../ViewTransaction/Transaction";
import Register from "../register/Register";
import Login from "../login/Login";

const UnProtectedRoute = () => {
  const gettingToken = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (gettingToken) {
      navigate("/view-transactions");
    }
  }, []);
  return (
    <>
      {!gettingToken && (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/public/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default UnProtectedRoute;
