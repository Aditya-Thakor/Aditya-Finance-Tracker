import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ViewTransaction from "./pages/ViewTransaction/ViewTransaction";
import AddTransaction from "./pages/AddTransaction/AddTransaction";
import Error404 from "./pages/404/Error404";
import Transaction from "./pages/ViewTransaction/Transaction";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { AuthoriseRoutes } from "./routes/AuthoriseRoutes";
import { UnAuthoriseRoutes } from "./routes/UnAuthoriseRoutes";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import UnProtectedRoute from "./pages/protected/UnProtectedRoute";

function App() {
  const gettingToken = JSON.parse(localStorage.getItem("token"));

  let name = true;
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/add-transaction" />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/view-transactions" element={<ViewTransaction />} />
          <Route path="/transaction/:number" element={<Transaction />} />
          <Route path="/update-transaction/:id" element={<AddTransaction />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
          {/* <Routes>{name ? AuthoriseRoutes : UnAuthoriseRoutes}</Routes> */}

          <Route path="/public/*" element={<UnProtectedRoute />} />
          <Route path="*" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
