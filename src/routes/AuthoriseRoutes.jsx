import React from "react";
import { Navigate, Route } from "react-router-dom";
import AddTransaction from "../pages/AddTransaction/AddTransaction";
import ViewTransaction from "../pages/ViewTransaction/ViewTransaction";
import Transaction from "../pages/ViewTransaction/Transaction";

export const AuthoriseRoutes = [
  <Route key={1} path="/add-transaction" element={<AddTransaction />} />,
  <Route key={2} path="/view-transactions" element={<ViewTransaction />} />,
  <Route key={3} path="/transaction/:number" element={<Transaction />} />,
  <Route key={4} path="/update-transaction/:id" element={<AddTransaction />} />,
  <Route
    key={5}
    path="*"
    element={<Navigate to="/view-transactions" replace />}
  />,
];
