import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./pages/protected/ProtectedRoute";
import UnProtectedRoute from "./pages/protected/UnProtectedRoute";

function App() {
  const gettingToken = JSON.parse(localStorage.getItem("token"));

  let name = true;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/public/*" element={<UnProtectedRoute />} />
          <Route path="*" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
