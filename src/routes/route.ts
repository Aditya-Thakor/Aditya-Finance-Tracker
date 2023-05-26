import { lazy } from "react";

interface RouteInterface {
  path: string;
  element?: React.LazyExoticComponent<() => JSX.Element>;
  protected?: boolean;
}

const unProtectedRoutes: RouteInterface[] = [
  {
    path: "/",
  },
  {
    path: "/register",
    element: lazy(() => import("../pages/register/Register")),
    protected: false,
  },
  {
    path: "/login",
    element: lazy(() => import("../pages/login/Login")),
    protected: false,
  },
];

const protectedRoutes = [
  {
    path: "/add-transaction",
    element: lazy(() => import("../pages/transactions/AddTransaction")),
    protected: true,
  },
  {
    path: "/view-transactions",
    element: lazy(() => import("../pages/transactions/ViewTransaction")),
    protected: true,
  },
  {
    path: "/update-transaction/:id",
    element: lazy(() => import("../pages/transactions/AddTransaction")),
    protected: true,
  },
];
const route = [...protectedRoutes, ...unProtectedRoutes];
export default route;
