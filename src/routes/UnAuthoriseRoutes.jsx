import React from "react";
import { Navigate, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error404 from "../pages/404/Error404";
import ViewTransaction from "../pages/ViewTransaction/ViewTransaction";
import ProtectedRoute from "../pages/protected/ProtectedRoute";

export const UnAuthoriseRoutes = [
  <Route path="/register" element={<Register />} />,
  <Route path="/login" element={<Login />} />,
  // <Route path="/view-transactions" element={<ViewTransaction />} />,
  <Route path="*" element={<Navigate to="/login" replace />} />,
];
