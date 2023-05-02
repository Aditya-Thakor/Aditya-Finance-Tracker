import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AddTransaction from "../AddTransaction/AddTransaction";
import ViewTransaction from "../ViewTransaction/ViewTransaction";
import Transaction from "../ViewTransaction/Transaction";

const ProtectedRoute = () => {
  const gettingToken = JSON.parse(localStorage.getItem("token"));

  let navigate = useNavigate();
  useEffect(() => {
    if (!gettingToken) {
      navigate("/public/login");
    }
  }, []);
  return (
    <>
      {gettingToken && (
        <Routes>
          <Route key={1} path="/add-transaction" element={<AddTransaction />} />
          <Route
            key={2}
            path="/view-transactions"
            element={<ViewTransaction />}
          />
          <Route
            key={3}
            path="/transaction/:number"
            element={<Transaction />}
          />
          <Route
            key={4}
            path="/update-transaction/:id"
            element={<AddTransaction />}
          />
          <Route
            key={5}
            path="*"
            element={<Navigate to="/view-transactions" replace />}
          />
        </Routes>
      )}
    </>
  );
};

export default ProtectedRoute;
