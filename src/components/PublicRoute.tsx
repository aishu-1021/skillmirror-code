import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
// Blocks logged-in users from seeing login/register pages
// If already logged in → redirect to /dashboard
// If not logged in → show the page normally

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;