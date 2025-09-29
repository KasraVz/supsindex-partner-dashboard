import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Beaker, BarChart3, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificateSearchWidget } from "@/components/certificates/CertificateSearchWidget";

// Mock data from other organizational pages
const mockScholarships = [
  { id: "SCH-001", status: "active", applications: 24 },
  { id: "SCH-002", status: "closed", applications: 18 },
  { id: "SCH-003", status: "draft", applications: 0 }
];

const customTestRequests = [
  { id: 1, status: "In Development" },
  { id: 2, status: "Requirements Review" },
  { id: 3, status: "Testing" },
  { id: 4, status: "Complete" }
];

const strategicReports = [
  { id: 1, status: "Complete" },
  { id: 2, status: "Processing" },
  { id: 3, status: "Complete" },
  { id: 4, status: "Scheduled" }
];

export default function OrganizationalPartnerDashboard() {
  // Calculate metrics from mock data
  const activeScholarships = mockScholarships.filter(s => s.status === 'active').length;
  const totalApplications = mockScholarships.reduce((sum, s) => sum + s.applications, 0);
  
  const activeCustomTests = customTestRequests.filter(t => 
    t.status === 'In Development' || t.status === 'Testing'
  ).length;
  const completedCustomTests = customTestRequests.filter(t => t.status === 'Complete').length;
  
  const completeReports = strategicReports.filter(r => r.status === 'Complete').length;
  const processingReports = strategicReports.filter(r => 
    r.status === 'Processing' || r.status === 'Scheduled'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organizational Partner Dashboard</h1>
        <p className="text-muted-foreground">
          Your home base for managing scholarships, custom tests, strategic reports, and team collaboration.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Scholarships</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeScholarships}</div>
            <p className="text-xs text-muted-foreground">
              {totalApplications} applications received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Test Requests</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomTests}</div>
            <p className="text-xs text-muted-foreground">
              {completedCustomTests} completed tests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strategic Reports Generated</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completeReports}</div>
            <p className="text-xs text-muted-foreground">
              {processingReports} currently processing
            </p>
          </CardContent>
        </Card>
      </div>

      <CertificateSearchWidget />

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Access your organization's core partnership features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link 
              to="/organizational/scholarships" 
              className="block p-6 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            >
              <GraduationCap className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium mb-2">Create Scholarship</h3>
              <p className="text-sm text-muted-foreground">
                Launch new scholarship programs to support talented individuals
              </p>
            </Link>

            <Link 
              to="/organizational/custom-tests" 
              className="block p-6 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            >
              <Beaker className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium mb-2">Request Custom Test</h3>
              <p className="text-sm text-muted-foreground">
                Create custom assessments tailored to your organization's needs
              </p>
            </Link>

            <Link 
              to="/organizational/strategic-reports" 
              className="block p-6 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            >
              <BarChart3 className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium mb-2">Order Strategic Report</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive portfolio insights and market intelligence
              </p>
            </Link>

            <Link 
              to="/organizational/team" 
              className="block p-6 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            >
              <Users className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium mb-2">Manage Team</h3>
              <p className="text-sm text-muted-foreground">
                Add team members and configure permissions and access levels
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}