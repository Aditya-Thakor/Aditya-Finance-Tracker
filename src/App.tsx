import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import ViewTransaction from "./pages/transactions/ViewTransaction";
import AddTransaction from "./pages/transactions/AddTransaction";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-transactions" element={<ViewTransaction />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
