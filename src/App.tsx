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
import NotFound from "./pages/NotFound";
import TechnicalTest from "./pages/TechnicalTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ❌ NO Router here */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aptitude-test/:companyId" element={<AptitudeTest />} />
        <Route path="/technical-round/:companyName" element={<TechnicalTest />} />
      </Routes>

    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
