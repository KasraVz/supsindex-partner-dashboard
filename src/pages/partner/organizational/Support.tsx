import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { HelpCircle, MessageSquare, Clock, CheckCircle, AlertCircle, ExternalLink, Building } from "lucide-react";

const mockTickets = [
  {
    id: "TKT-ORG-001",
    subject: "Team member access issue",
    status: "open",
    priority: "high",
    createdAt: "2024-01-15",
    lastUpdate: "2024-01-16",
    category: "account",
    assignedTo: "John Doe"
  },
  {
    id: "TKT-ORG-002",
    subject: "Custom test integration",
    status: "resolved",
    priority: "medium", 
    createdAt: "2024-01-10",
    lastUpdate: "2024-01-12",
    category: "technical",
    assignedTo: "Sarah Smith"
  },
  {
    id: "TKT-ORG-003",
    subject: "Bulk scholarship creation",
    status: "in_progress",
    priority: "high",
    createdAt: "2024-01-08",
    lastUpdate: "2024-01-14",
    category: "feature_request",
    assignedTo: "Mike Johnson"
  }
];

const organizationalFaqCategories = [
  {
    title: "Organization Setup",
    questions: [
      "How do I add team members to my organization?",
      "What are the different permission levels?",
      "How to configure organization settings?"
    ]
  },
  {
    title: "Team Management",
    questions: [
      "How to assign roles to team members?",
      "How to track team performance?",
      "What reports are available for managers?"
    ]
  },
  {
    title: "Custom Tests & Assessments",
    questions: [
      "How to create custom tests for my organization?",
      "Can I integrate with existing HR systems?",
      "How to analyze test results across teams?"
    ]
  },
  {
    title: "Billing & Subscriptions",
    questions: [
      "How does organizational billing work?",
      "Can I get volume discounts?",
      "How to manage multiple payment methods?"
    ]
  }
];

export default function Support() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      resolved: "default",
      in_progress: "secondary",
      open: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline"
    } as const;
    
    return (
      <Badge variant={variants[priority as keyof typeof variants]} className="text-xs">
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Support Center</h1>
        <p className="text-muted-foreground">
          Enterprise support for your organization's needs
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Organization FAQs</h3>
                <p className="text-sm text-muted-foreground">
                  Common questions for organizations
                </p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Priority Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get dedicated enterprise support
                </p>
              </div>
              <Button size="sm">
                New Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Account Manager</h3>
                <p className="text-sm text-muted-foreground">
                  Contact your dedicated support
                </p>
              </div>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList>
          <TabsTrigger value="tickets">Organization Tickets</TabsTrigger>
          <TabsTrigger value="new-ticket">Create Ticket</TabsTrigger>
          <TabsTrigger value="faq">Organization FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Support Tickets</CardTitle>
              <CardDescription>
                Track support requests for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell className="capitalize">{ticket.category.replace('_', ' ')}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell>{ticket.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.status)}
                          {getStatusBadge(ticket.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-ticket" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Organization Support Ticket</CardTitle>
              <CardDescription>
                Get enterprise-level support for your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                      <SelectItem value="integration">Integration Support</SelectItem>
                      <SelectItem value="training">Training & Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="affected-users">Affected Users/Team</Label>
                <Input id="affected-users" placeholder="Which team members are affected?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-impact">Business Impact</Label>
                <Textarea
                  id="business-impact"
                  placeholder="How is this affecting your organization's operations?"
                  className="min-h-[80px]"
                />
              </div>

              <Button className="w-full">
                Submit Priority Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          {organizationalFaqCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">{question}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}