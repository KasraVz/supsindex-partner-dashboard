import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Scale, Clock, MapPin, DollarSign } from "lucide-react";

const opportunities = [
  {
    id: 1,
    title: "Faculty Member - Business Strategy",
    type: "Faculty",
    icon: GraduationCap,
    description: "Teach and mentor founders in business strategy and planning. Develop curriculum and lead workshops.",
    requirements: ["5+ years business experience", "Previous teaching/mentoring experience", "MBA or equivalent"],
    commitment: "10-15 hours per week",
    compensation: "Competitive salary + equity",
    location: "Remote + Quarterly in-person",
    deadline: "April 15, 2024",
    status: "Open"
  },
  {
    id: 2,
    title: "Ambassador - West Coast Region",
    type: "Ambassador", 
    icon: Users,
    description: "Represent Supsindex at industry events, build partnerships with VCs and accelerators in the region.",
    requirements: ["Strong network in startup ecosystem", "Event speaking experience", "Available for travel"],
    commitment: "20-25 hours per week",
    compensation: "Base salary + performance bonuses",
    location: "San Francisco, Los Angeles, Seattle",
    deadline: "March 30, 2024",
    status: "Urgent"
  },
  {
    id: 3,
    title: "Judge - Investment Readiness Panel",
    type: "Judge",
    icon: Scale,
    description: "Evaluate founder applications and assessments. Provide feedback and recommendations for program placement.",
    requirements: ["Investment experience", "Due diligence background", "Available for monthly reviews"],
    commitment: "5-8 hours per month",
    compensation: "Per-review compensation",
    location: "Remote",
    deadline: "May 1, 2024",
    status: "Open"
  }
];

export default function PartnershipOpportunities() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Partnership Opportunities</h1>
        <p className="text-muted-foreground">
          Expand your role on the platform by applying for Faculty, Ambassador, or Judge positions.
        </p>
      </div>

      <div className="grid gap-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <opportunity.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {opportunity.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={opportunity.status === 'Urgent' ? 'destructive' : 'default'}>
                  {opportunity.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {opportunity.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid gap-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.commitment}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.compensation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Application Deadline</span>
                    <p className="font-medium">{opportunity.deadline}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Opportunity Type</span>
                    <p className="font-medium">{opportunity.type}</p>
                  </div>
                  
                  <Button className="w-full">
                    Apply for Position
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Process</CardTitle>
          <CardDescription>
            What to expect when applying for partnership opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-sm font-medium text-primary">1</span>
              </div>
              <h4 className="font-medium">Submit Application</h4>
              <p className="text-sm text-muted-foreground">
                Complete the application form with your experience and qualifications
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-sm font-medium text-primary">2</span>
              </div>
              <h4 className="font-medium">Review Process</h4>
              <p className="text-sm text-muted-foreground">
                Our team will review your application and conduct interviews if needed
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-sm font-medium text-primary">3</span>
              </div>
              <h4 className="font-medium">Onboarding</h4>
              <p className="text-sm text-muted-foreground">
                Successful candidates will go through orientation and training
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}