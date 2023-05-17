import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./route";
import AuthGuard from "../guards/AuthGuard";
import { ContextWrapper } from "../context/ContextWrapper";

const routing = () => {
  return (
    <ContextWrapper>
      <Routes>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                {route.protected ? (
                  <AuthGuard>
                    <route.component />
                  </AuthGuard>
                ) : (
                  <route.component />
                )}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </ContextWrapper>
  );
};

export { routing };
