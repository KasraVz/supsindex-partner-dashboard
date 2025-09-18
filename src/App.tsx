import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "@/contexts/OrderContext";
import { PartnerProvider } from "@/contexts/PartnerContext";
import { PartnerLayout } from "@/components/layouts/PartnerLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Partner pages - Individual
import IndividualPartnerDashboard from "@/pages/partner/individual/Dashboard";
import MyCandidates from "@/pages/partner/individual/Candidates";
import CandidateReports from "@/pages/partner/individual/Reports"; 
import AffiliationsAndEarnings from "@/pages/partner/individual/Earnings";
import OrganizationalAffiliations from "@/pages/partner/organizational/Affiliations";
import IndividualProfile from "@/pages/partner/individual/Profile";
import PartnershipOpportunities from "@/pages/partner/individual/Opportunities";

// Partner pages - Organizational
import OrganizationalPartnerDashboard from "@/pages/partner/organizational/Dashboard";
import OrganizationalProfile from "@/pages/partner/organizational/Profile";
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
              
              {/* Individual Partner Routes */}
              <Route path="/individual" element={<PartnerLayout />}>
                <Route path="dashboard" element={<IndividualPartnerDashboard />} />
                <Route path="candidates" element={<MyCandidates />} />
                <Route path="reports" element={<CandidateReports />} />
                <Route path="earnings" element={<AffiliationsAndEarnings />} />
                <Route path="profile" element={<IndividualProfile />} />
                <Route path="opportunities" element={<PartnershipOpportunities />} />
              </Route>
              
              {/* Organizational Partner Routes */}
              <Route path="/organizational" element={<PartnerLayout />}>
                <Route path="dashboard" element={<OrganizationalPartnerDashboard />} />
                <Route path="candidates" element={<MyCandidates />} />
                <Route path="reports" element={<CandidateReports />} />
                <Route path="affiliations" element={<OrganizationalAffiliations />} />
                <Route path="profile" element={<OrganizationalProfile />} />
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
