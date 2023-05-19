import { lazy } from "react";

const protectedRoutes = [
  {
    path: "/add-transaction",
    component: lazy(() => import("../pages/transactions/AddTransaction")),
    protected: true,
  },
  {
    path: "/view-transactions",
    component: lazy(() => import("../pages/transactions/ViewTransaction")),
    protected: true,
  },
  {
    path: "/transaction/:id",
    component: lazy(() => import("../pages/transactions/Transaction")),
    protected: true,
  },
  {
    path: "/update-transaction/:id",
    component: lazy(() => import("../pages/transactions/AddTransaction")),
    protected: true,
  },
];

const unProtectedRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/Login/Login.jsx")),
    protected: false,
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/register/Register.jsx")),
    protected: false,
  },
  {
    path: "/",
    component: lazy(() => import("../pages/Login/Login.jsx")),
    protected: false,
  },
];

const routes = [...unProtectedRoutes, ...protectedRoutes];

export default routes;
