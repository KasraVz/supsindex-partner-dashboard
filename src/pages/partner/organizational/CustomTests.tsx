import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Beaker, Clock, CheckCircle, AlertCircle, Plus, FileText } from "lucide-react";

const customTestRequests = [
  {
    id: 1,
    title: "FinTech Risk Assessment Index",
    description: "Custom assessment focusing on financial technology risk management and regulatory compliance",
    requestDate: "Mar 15, 2024",
    estimatedCompletion: "Apr 30, 2024",
    status: "In Development",
    priority: "High",
    modules: ["Risk Management", "Regulatory Compliance", "Financial Modeling"],
    budget: "$15,000",
    assignedTeam: "Product Development Team A"
  },
  {
    id: 2,
    title: "Healthcare Innovation Readiness",
    description: "Specialized assessment for healthcare startups focusing on FDA compliance and medical device regulations",
    requestDate: "Feb 28, 2024",
    estimatedCompletion: "May 15, 2024",
    status: "Requirements Review",
    priority: "Medium",
    modules: ["FDA Compliance", "Medical Device Regulations", "Clinical Trial Readiness"],
    budget: "$22,000",
    assignedTeam: "Healthcare Specialists"
  },
  {
    id: 3,
    title: "ESG Impact Measurement Tool",
    description: "Environmental, Social, and Governance assessment tool for impact-focused portfolio companies",
    requestDate: "Jan 10, 2024",
    estimatedCompletion: "Mar 20, 2024",
    status: "Testing",
    priority: "High",
    modules: ["Environmental Impact", "Social Metrics", "Governance Framework"],
    budget: "$18,500",
    assignedTeam: "ESG Assessment Team"
  },
  {
    id: 4,
    title: "AI Ethics & Bias Assessment",
    description: "Comprehensive evaluation tool for AI/ML startups focusing on ethical AI development and bias detection",
    requestDate: "Dec 5, 2023",
    estimatedCompletion: "Feb 15, 2024",
    status: "Complete",
    priority: "High",
    modules: ["AI Ethics", "Bias Detection", "Algorithmic Transparency"],
    budget: "$25,000",
    assignedTeam: "AI Research Division"
  }
];

const developmentStages = [
  { stage: "Request Submitted", description: "Initial request and requirements gathering", duration: "1-2 days" },
  { stage: "Requirements Review", description: "Detailed analysis and feasibility study", duration: "5-7 days" },
  { stage: "Design & Planning", description: "Assessment framework design and project planning", duration: "10-14 days" },
  { stage: "In Development", description: "Assessment creation and content development", duration: "30-45 days" },
  { stage: "Testing", description: "Quality assurance and pilot testing", duration: "10-15 days" },
  { stage: "Complete", description: "Ready for deployment and use", duration: "N/A" }
];

export default function CustomTestRequests() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'default';
      case 'In Development': return 'secondary';
      case 'Testing': return 'outline';
      case 'Requirements Review': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Custom Test (DI) Requests</h1>
          <p className="text-muted-foreground">
            Request the creation of new, custom-designed indices specifically for your organization.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Custom Test Request
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 active, 8 completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Development</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Currently being built
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Ready for deployment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$180K</div>
            <p className="text-xs text-muted-foreground">
              Total custom development
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Custom Test Requests</CardTitle>
          <CardDescription>
            Track the progress of your organization's custom assessment development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customTestRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-lg">{request.title}</h3>
                      <Badge variant={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <Badge variant={getPriorityColor(request.priority)}>
                        {request.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Request Date:</span>
                      <span className="font-medium">{request.requestDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. Completion:</span>
                      <span className="font-medium">{request.estimatedCompletion}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">{request.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assigned Team:</span>
                      <span className="font-medium">{request.assignedTeam}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Assessment Modules:</span>
                    <div className="flex flex-wrap gap-1">
                      {request.modules.map((module) => (
                        <Badge key={module} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Team
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request New Custom Test</CardTitle>
            <CardDescription>
              Submit a formal request for a custom assessment tailored to your needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testTitle">Assessment Title</Label>
              <Input id="testTitle" placeholder="e.g., Healthcare Innovation Readiness" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="testDescription">Description & Requirements</Label>
              <Textarea 
                id="testDescription" 
                rows={4}
                placeholder="Describe the specific assessment needs, target audience, and key evaluation criteria..."
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="targetSector">Target Sector</Label>
                <Input id="targetSector" placeholder="e.g., FinTech, HealthTech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget">Estimated Budget</Label>
                <Input id="estimatedBudget" placeholder="e.g., $15,000 - $25,000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Desired Timeline</Label>
              <Input id="timeline" placeholder="e.g., 8-10 weeks" />
            </div>
            
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Process</CardTitle>
            <CardDescription>
              Understanding our custom assessment development workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {developmentStages.map((stage, index) => (
                <div key={stage.stage} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{stage.stage}</h4>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                    <span className="text-xs text-muted-foreground">Duration: {stage.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Test Benefits</CardTitle>
          <CardDescription>
            Why invest in custom assessments for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <Beaker className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-medium">Tailored Evaluation</h3>
              <p className="text-sm text-muted-foreground">
                Assessments designed specifically for your investment thesis and portfolio needs
              </p>
            </div>
            <div className="text-center space-y-2">
              <CheckCircle className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-medium">Competitive Advantage</h3>
              <p className="text-sm text-muted-foreground">
                Unique evaluation criteria that differentiate your portfolio companies
              </p>
            </div>
            <div className="text-center space-y-2">
              <Clock className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-medium">Faster Decision Making</h3>
              <p className="text-sm text-muted-foreground">
                Streamlined evaluation process aligned with your investment workflow
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}