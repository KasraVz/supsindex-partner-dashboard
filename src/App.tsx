import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "@/contexts/OrderContext";
import { PartnerProvider } from "@/contexts/PartnerContext";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PartnerLayout } from "@/components/layouts/PartnerLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";
import FastTrak from "./pages/dashboard/FastTrak";
import Orders from "./pages/dashboard/Orders";

// Partner pages - Individual
import IndividualPartnerDashboard from "@/pages/partner/individual/Dashboard";
import MyFounders from "@/pages/partner/individual/Founders";
import FounderReports from "@/pages/partner/individual/Reports"; 
import ReferralsAndEarnings from "@/pages/partner/individual/Earnings";
import IndividualProfile from "@/pages/partner/individual/Profile";
import PartnershipOpportunities from "@/pages/partner/individual/Opportunities";

// Partner pages - Organizational
import OrganizationalPartnerDashboard from "@/pages/partner/organizational/Dashboard";
import TeamManagement from "@/pages/partner/organizational/TeamManagement";
import StrategicReports from "@/pages/partner/organizational/StrategicReports";
import CustomTestRequests from "@/pages/partner/organizational/CustomTests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OrderProvider>
      <PartnerProvider>
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
              
              {/* Individual Partner Routes */}
              <Route path="/partners/individual" element={<PartnerLayout />}>
                <Route path="dashboard" element={<IndividualPartnerDashboard />} />
                <Route path="founders" element={<MyFounders />} />
                <Route path="reports" element={<FounderReports />} />
                <Route path="earnings" element={<ReferralsAndEarnings />} />
                <Route path="profile" element={<IndividualProfile />} />
                <Route path="opportunities" element={<PartnershipOpportunities />} />
              </Route>
              
              {/* Organizational Partner Routes */}
              <Route path="/partners/organizational" element={<PartnerLayout />}>
                <Route path="dashboard" element={<OrganizationalPartnerDashboard />} />
                <Route path="founders" element={<MyFounders />} />
                <Route path="reports" element={<FounderReports />} />
                <Route path="earnings" element={<ReferralsAndEarnings />} />
                <Route path="profile" element={<IndividualProfile />} />
                <Route path="opportunities" element={<PartnershipOpportunities />} />
                <Route path="team" element={<TeamManagement />} />
                <Route path="strategic-reports" element={<StrategicReports />} />
                <Route path="custom-tests" element={<CustomTestRequests />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PartnerProvider>
    </OrderProvider>
  </QueryClientProvider>
);

export default App;
