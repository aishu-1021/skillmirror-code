import { createContext, useContext, useState, ReactNode } from "react";
//Import User from shared types
import { User } from "@/types";

// Define what AuthContext provides to components
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider — wraps the app and provides auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // Initialize from localStorage so refresh doesn't log user out
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // Called after successful login
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Called on logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Called when user data changes (e.g. after passing a round)
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoggedIn: !!token && !!user,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — components use this to access auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};