import React, { useContext, useState } from "react";
import { UserData } from "../types/userData";

type Credentials = {
  username: string;
  password: string;
};

type AuthContextValue = {
  user: number | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<number | null>(null);

  const login = async (credentials: Credentials) => {
    try {
      console.log("aaaaaaaaaaaaaaaaaaaaaaa");
      console.log(JSON.stringify(credentials));
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUser(data.id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      // handle login error
    }
  };

  const logout = () => {
    // clear user session and set isAuthenticated to false
    console.log("logout");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
