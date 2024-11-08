import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
