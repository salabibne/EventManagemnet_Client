import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      // Check if the values exist and are not "undefined" string
      if (storedUser && storedUser !== "undefined" && storedToken && storedToken !== "undefined") {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error loading auth data from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (userData, jwtToken) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);
      setUser(userData);
      setToken(jwtToken);
    } catch (error) {
      console.error("Error saving auth data to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken("");
    } catch (error) {
      console.error("Error clearing auth data from localStorage:", error);
      localStorage.clear();
      setUser(null);
      setToken("");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};