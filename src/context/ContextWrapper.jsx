import React from "react";
import { AuthContextProvider } from "./AuthContext";
import { TransactionContextProvider } from "./TransactionContext";
import { UsersContextProvider } from "./UsersContext";

const ContextWrapper = ({ children }) => {
  return (
    <AuthContextProvider>
      <TransactionContextProvider>
        <UsersContextProvider>
          <TransactionContextProvider>{children}</TransactionContextProvider>
        </UsersContextProvider>
      </TransactionContextProvider>
    </AuthContextProvider>
  );
};

export { ContextWrapper };
