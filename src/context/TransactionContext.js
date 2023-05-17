import React, { createContext, useState } from "react";

export const TransactionContext = createContext({
  transactionsData: [],
  setTransactionsData: () => {},
});

export const TransactionContextProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);

  return (
    <TransactionContext.Provider
      value={{ transactionsData, setTransactionsData }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
