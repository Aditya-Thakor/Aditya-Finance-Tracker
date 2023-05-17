import { createContext, useState } from "react";

export const AuthContext = createContext({
  key: "",
  token: false,
  setKey: () => {},
  setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [key, setKey] = useState("");
  const [token, setToken] = useState(false);

  return (
    <AuthContext.Provider value={{ key, setKey, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
