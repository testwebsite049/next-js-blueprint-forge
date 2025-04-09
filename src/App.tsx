
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AuthGuard } from "@/lib/guards/AuthGuard";
import { GuestGuard } from "@/lib/guards/GuestGuard";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            
            {/* Guest-only routes */}
            <Route 
              path="/login" 
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              } 
            />
            <Route 
              path="/register" 
              element={
                <GuestGuard>
                  <Register />
                </GuestGuard>
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
