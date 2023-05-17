import { lazy } from "react";

import Cookies from "universal-cookie";

const cookie = new Cookies();
const protectedRoutes = [
  {
    path: "/add-transaction",
    component: lazy(() => import("../pages/transactions/AddTransaction")),
    protected: true,
    canActive: () => {
      if (!cookie.length > 0) {
        // navigate("/login");
      }
    },
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
];

const unProtectedRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/login/Login.jsx")),
    protected: false,
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/register/Register.jsx")),
    protected: false,
  },
];

const routes = [...unProtectedRoutes, ...protectedRoutes];

export default routes;
