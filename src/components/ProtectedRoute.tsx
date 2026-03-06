import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
// Blocks unauthenticated users from accessing protected pages
// If not logged in → redirect to /login
// If logged in → show the page normally

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;