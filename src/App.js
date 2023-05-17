import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useContext, useState } from "react";
import { UsersContext, UsersContextProvider } from "./context/UsersContext";
import Login from "./pages/Login/Login";
import AddTransaction from "./pages/transactions/AddTransaction";
import Transaction from "./pages/transactions/Transaction";
import ViewTransaction from "./pages/transactions/ViewTransaction";
import { TransactionContextProvider } from "./context/TransactionContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  return (
    <AuthContext.Provider value={{}}>
      <UsersContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UsersContextProvider>
      <TransactionContextProvider>
        <Router>
          <Routes>
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/view-transactions" element={<ViewTransaction />} />
            <Route path="/transaction/:number" element={<Transaction />} />
            <Route
              path="/update-transaction/:id"
              element={<AddTransaction />}
            />
          </Routes>
        </Router>
      </TransactionContextProvider>
    </AuthContext.Provider>
  );
}

export default App;
