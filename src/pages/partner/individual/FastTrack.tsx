import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Play, BookOpen, Users, DollarSign, Award, ArrowRight } from "lucide-react";

const fastTrackSteps = [
  {
    id: "setup-profile",
    title: "Complete Your Profile",
    description: "Set up your partner profile with all necessary information",
    status: "completed" as const,
    duration: "5 min",
    icon: Users
  },
  {
    id: "create-affiliation",
    title: "Create Your First Affiliation Code",
    description: "Generate your first code to start referring candidates",
    status: "current" as const,
    duration: "3 min",
    icon: DollarSign
  },
  {
    id: "understand-earnings",
    title: "Understand Your Earnings",
    description: "Learn how commissions work and when you get paid",
    status: "pending" as const,
    duration: "5 min",
    icon: BookOpen
  },
  {
    id: "first-scholarship",
    title: "Create Your First Scholarship",
    description: "Set up a scholarship to attract high-quality candidates",
    status: "pending" as const,
    duration: "10 min",
    icon: Award
  }
];

const quickActions = [
  {
    title: "Generate Affiliation Code",
    description: "Create a new code to start referring candidates",
    icon: DollarSign,
    action: "Create Code",
    href: "/individual/dashboard"
  },
  {
    title: "View Dashboard",
    description: "See your earnings and candidate statistics",
    icon: BookOpen,
    action: "Open Dashboard",
    href: "/individual/dashboard"
  },
  {
    title: "Browse Opportunities",
    description: "Find new partnership opportunities to grow",
    icon: Users,
    action: "Explore",
    href: "/individual/opportunities"
  },
  {
    title: "Create Scholarship",
    description: "Start attracting candidates with scholarships",
    icon: Award,
    action: "Get Started",
    href: "/individual/scholarships"
  }
];

const tips = [
  {
    title: "Maximize Your Earnings",
    content: "Share your affiliation codes on social media and professional networks to reach more candidates."
  },
  {
    title: "Quality Over Quantity",
    content: "Focus on referring qualified candidates who are likely to succeed in assessments."
  },
  {
    title: "Track Performance",
    content: "Regularly check your analytics to understand which channels work best for you."
  },
  {
    title: "Engage with Candidates", 
    content: "Provide support and guidance to candidates using your codes to improve success rates."
  }
];

export default function FastTrack() {
  const completedSteps = fastTrackSteps.filter(step => step.status === 'completed').length;
  const totalSteps = fastTrackSteps.length;
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
        <h1 className="text-3xl font-bold">Fast Track Setup</h1>
        <p className="text-muted-foreground">
          Get up and running quickly with our guided setup process
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Your Progress
            <Badge variant="secondary">{completedSteps}/{totalSteps} Complete</Badge>
          </CardTitle>
          <CardDescription>
            Complete these steps to get the most out of your partnership
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
          <CardTitle>Setup Steps</CardTitle>
          <CardDescription>
            Follow these steps to complete your partner setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fastTrackSteps.map((step, index) => {
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
                        Start Now
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
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump directly to important features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action, index) => {
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

      {/* Pro Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Pro Tips for Success</CardTitle>
          <CardDescription>
            Maximize your partnership potential with these insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, index) => (
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