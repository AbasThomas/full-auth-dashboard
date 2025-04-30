import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    // Make sure the name is part of the userData passed in here
    const cleanUserData = {
      fullName: userData.fullName,
      email: userData.email,
      token: userData.token || "", // optional
    };
    localStorage.setItem("user", JSON.stringify(cleanUserData));
    setUser(cleanUserData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
