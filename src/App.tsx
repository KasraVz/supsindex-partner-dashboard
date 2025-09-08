import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "@/contexts/OrderContext";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import FastTrak from "./pages/dashboard/FastTrak";
import Orders from "./pages/dashboard/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OrderProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="fast-trak" element={<FastTrak />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/new" element={<Orders />} />
              <Route path="profile" element={<div>Profile Page</div>} />
              <Route path="exams/booked" element={<div>Booked Tests</div>} />
              <Route path="exams/history" element={<div>Test History</div>} />
              <Route path="exams/feedback" element={<div>Feedback</div>} />
              <Route path="reports" element={<div>Reports</div>} />
              <Route path="certifications" element={<div>Certifications</div>} />
              <Route path="community" element={<div>SupsHub Community</div>} />
              <Route path="leaderboard" element={<div>Leaderboard</div>} />
              <Route path="referrals" element={<div>Referrals</div>} />
              <Route path="scholarship" element={<div>Scholarship</div>} />
              <Route path="support" element={<div>Support</div>} />
              <Route path="special-offer" element={<div>Special Offer</div>} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </OrderProvider>
  </QueryClientProvider>
);

export default App;
