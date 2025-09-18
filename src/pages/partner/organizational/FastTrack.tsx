import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Play, BookOpen, Users, Building, Award, Settings, ArrowRight } from "lucide-react";

const organizationalFastTrackSteps = [
  {
    id: "organization-setup",
    title: "Set Up Organization Profile",
    description: "Configure your organization details and branding",
    status: "completed" as const,
    duration: "10 min",
    icon: Building
  },
  {
    id: "team-setup",
    title: "Add Team Members",
    description: "Invite team members and assign appropriate roles",
    status: "current" as const,
    duration: "15 min",
    icon: Users
  },
  {
    id: "custom-tests",
    title: "Create Custom Tests",
    description: "Design assessments specific to your organization's needs",
    status: "pending" as const,
    duration: "20 min",
    icon: BookOpen
  },
  {
    id: "scholarship-programs",
    title: "Launch Scholarship Programs",
    description: "Set up talent acquisition through scholarships",
    status: "pending" as const,
    duration: "15 min",
    icon: Award
  },
  {
    id: "integration-setup",
    title: "Configure Integrations",
    description: "Connect with your existing HR and assessment tools",
    status: "pending" as const,
    duration: "25 min",
    icon: Settings
  }
];

const organizationalQuickActions = [
  {
    title: "Team Management",
    description: "Add members, assign roles, and manage permissions",
    icon: Users,
    action: "Manage Team",
    href: "/organizational/team-management"
  },
  {
    title: "Custom Assessments",
    description: "Create tailored tests for your organization",
    icon: BookOpen,
    action: "Create Tests",
    href: "/organizational/custom-tests"
  },
  {
    title: "Scholarship Programs",
    description: "Launch talent acquisition scholarships",
    icon: Award,
    action: "Start Program",
    href: "/organizational/scholarships"
  },
  {
    title: "Strategic Reports",
    description: "View organization-wide analytics and insights",
    icon: Building,
    action: "View Reports",
    href: "/organizational/strategic-reports"
  }
];

const organizationalTips = [
  {
    title: "Leverage Team Collaboration",
    content: "Assign different roles to team members to efficiently manage assessments, scholarships, and candidate reviews."
  },
  {
    title: "Custom Assessment Strategy",
    content: "Create role-specific tests that align with your organization's unique requirements and culture."
  },
  {
    title: "Scholarship as Recruitment Tool",
    content: "Use scholarships strategically to attract top talent and build your organization's brand in educational institutions."
  },
  {
    title: "Data-Driven Decisions",
    content: "Utilize strategic reports to understand hiring patterns and optimize your talent acquisition process."
  },
  {
    title: "Integration Benefits",
    content: "Connect with existing HR systems to streamline workflows and maintain consistent candidate data."
  },
  {
    title: "Brand Building",
    content: "Use your organization profile to showcase company culture and attract candidates who align with your values."
  }
];

export default function FastTrack() {
  const completedSteps = organizationalFastTrackSteps.filter(step => step.status === 'completed').length;
  const totalSteps = organizationalFastTrackSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "current":
        return <Play className="h-5 w-5 text-primary" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStepBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "current":
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Fast Track Setup</h1>
        <p className="text-muted-foreground">
          Get your organization up and running with our comprehensive setup guide
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Organization Setup Progress
            <Badge variant="secondary">{completedSteps}/{totalSteps} Complete</Badge>
          </CardTitle>
          <CardDescription>
            Complete these steps to maximize your organization's potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Setup Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Setup Steps</CardTitle>
          <CardDescription>
            Follow these steps to fully configure your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizationalFastTrackSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getStepIcon(step.status)}
                  </div>
                  
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    <StepIcon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      {getStepBadge(step.status)}
                      <Badge variant="outline" className="text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {step.status === 'current' ? (
                      <Button size="sm">
                        Continue Setup
                      </Button>
                    ) : step.status === 'pending' ? (
                      <Button variant="outline" size="sm" disabled>
                        Coming Next
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Quick Actions</CardTitle>
          <CardDescription>
            Jump directly to key organizational features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {organizationalQuickActions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ActionIcon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      {action.action}
                    </Button>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Organization Success Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Success Tips</CardTitle>
          <CardDescription>
            Best practices for maximizing your organization's effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {organizationalTips.map((tip, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}