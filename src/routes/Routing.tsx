import { Suspense } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import route from "./route";

const Routing = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      {route.map((info) => (
        <Route
          path={info.path}
          element={
            <Suspense fallback={<h1>...</h1>}>
              {info.element ? (
                <info.element />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default Routing;
