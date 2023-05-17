import React, { Children, createContext, useState } from "react";

export const UsersContext = createContext({
  userData: [],
  setUserData: () => {},
});

export const UsersContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  return (
    <UsersContext.Provider value={{ userData, setUserData }}>
      {children}
    </UsersContext.Provider>
  );
};
