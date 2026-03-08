import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AptitudeTest from "./pages/AptitudeTest";
import TechnicalTest from "./pages/TechnicalTest";
import AptitudeResults from "./pages/AptitudeResults";   // ✅ NEW
import TechnicalResults from "./pages/TechnicalResults"; // ✅ NEW
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        {/* Public page — accessible by everyone */}
        <Route path="/" element={<Index />} />

        {/* Public only — redirect to dashboard if already logged in */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Protected — redirect to login if not logged in */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/aptitude-test/:companyId" element={
          <ProtectedRoute>
            <AptitudeTest />
          </ProtectedRoute>
        } />
        <Route path="/technical-round/:companyName" element={
          <ProtectedRoute>
            <TechnicalTest />
          </ProtectedRoute>
        } />

        {/* ✅ NEW — Results pages */}
        <Route path="/results/aptitude/:companyId" element={
          <ProtectedRoute>
            <AptitudeResults />
          </ProtectedRoute>
        } />
        <Route path="/results/technical/:companyName" element={
          <ProtectedRoute>
            <TechnicalResults />
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </TooltipProvider>
  </QueryClientProvider>
);
export default App;