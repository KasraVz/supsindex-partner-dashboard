import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GraduationCap, Users, DollarSign, Calendar, Eye, Edit, Plus, Building, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockScholarships = [
  {
    id: "SCH-001",
    title: "Tech Founders Assessment Sponsorship",
    associatedTests: ["FPA", "EEA"],
    description: "Sponsored assessment program for early-stage tech founders to evaluate their entrepreneurial potential and receive comprehensive feedback.",
    rules: "Open to founders with tech startups in pre-seed to seed stage. Must have a functional prototype or MVP.",
    acceptanceCriteria: "Strong technical background, clear product-market fit evidence, scalable business model potential.",
    status: "active",
    applications: 24,
    maxApplications: 50,
    createdAt: "2024-01-01"
  },
  {
    id: "SCH-002", 
    title: "Growth Stage Leadership Program",
    associatedTests: ["GEB", "All-in-One Package"],
    description: "Comprehensive assessment sponsorship for growth-stage startup leaders looking to scale their organizations.",
    rules: "For founders leading startups with 10+ employees and $1M+ in revenue. Series A or later preferred.",
    acceptanceCriteria: "Proven leadership experience, clear growth trajectory, strong team and culture development focus.",
    status: "inactive",
    applications: 18,
    maxApplications: 25,
    createdAt: "2023-12-01"
  },
  {
    id: "SCH-003",
    title: "All-in-One Founder Assessment",
    associatedTests: ["All-in-One Package"],
    description: "Complete entrepreneurial assessment covering all aspects of founder readiness and potential for any stage startup.",
    rules: "Open to all founders regardless of startup stage. Preference given to first-time founders seeking comprehensive evaluation.",
    acceptanceCriteria: "Demonstrated commitment to entrepreneurship, clear business concept, willingness to act on assessment insights.",
    status: "active",
    applications: 12,
    maxApplications: 30,
    createdAt: "2024-01-10"
  }
];

const mockApplications = [
  {
    id: "APP-001",
    scholarshipId: "SCH-001",
    scholarshipTitle: "Tech Founders Assessment Sponsorship",
    applicant: {
      name: "Sarah Johnson",
      email: "sarah.j@techstartup.com",
      avatar: "/placeholder.svg",
      startupName: "CloudFlow Analytics",
      pitch: "AI-powered data analytics platform for SMBs to make data-driven decisions without technical expertise.",
      website: "https://cloudflow.io",
      industry: "SaaS",
      stage: "Pre-seed",
      teamSize: "3 co-founders"
    },
    submittedAt: "2024-01-18",
    status: "pending"
  },
  {
    id: "APP-002", 
    scholarshipId: "SCH-001",
    scholarshipTitle: "Tech Founders Assessment Sponsorship",
    applicant: {
      name: "Michael Chen",
      email: "mike@greentech.io",
      avatar: "/placeholder.svg",
      startupName: "GreenTech Solutions",
      pitch: "IoT platform for optimizing energy consumption in commercial buildings, reducing costs by 30%.",
      website: "https://greentech-solutions.com",
      industry: "CleanTech",
      stage: "Seed",
      teamSize: "5 employees"
    },
    submittedAt: "2024-01-16",
    status: "pending"
  },
  {
    id: "APP-003",
    scholarshipId: "SCH-003", 
    scholarshipTitle: "All-in-One Founder Assessment",
    applicant: {
      name: "Emily Davis",
      email: "emily@healthtech.startup",
      avatar: "/placeholder.svg",
      startupName: "HealthTech Innovations",
      pitch: "Telemedicine platform connecting rural patients with specialist doctors through AI-assisted diagnostics.",
      website: "https://pitch.com/healthtech-deck",
      industry: "HealthTech",
      stage: "Pre-seed",
      teamSize: "2 co-founders"
    },
    submittedAt: "2024-01-12",
    status: "accepted"
  },
  {
    id: "APP-004",
    scholarshipId: "SCH-001",
    scholarshipTitle: "Tech Founders Assessment Sponsorship",
    applicant: {
      name: "David Rodriguez",
      email: "david@fintech.dev",
      avatar: "/placeholder.svg",
      startupName: "NextGen Payments",
      pitch: "Blockchain-based payment infrastructure for emerging markets with instant settlement and low fees.",
      website: "https://nextgenpayments.tech",
      industry: "FinTech",
      stage: "Seed", 
      teamSize: "8 employees"
    },
    submittedAt: "2024-01-10",
    status: "rejected"
  }
];

export default function Scholarships() {
  const [scholarships, setScholarships] = useState(mockScholarships);
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  const { toast } = useToast();

  const totalScholarships = scholarships.length;
  const activeScholarships = scholarships.filter(s => s.status === 'active').length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(a => a.status === 'pending').length;

  const toggleScholarshipStatus = (scholarshipId: string, newStatus: 'active' | 'inactive') => {
    setScholarships(prev => 
      prev.map(s => s.id === scholarshipId ? { ...s, status: newStatus } : s)
    );
    
    if (newStatus === 'inactive') {
      // Auto-reject all pending applications for this scholarship
      setApplications(prev => 
        prev.map(app => 
          app.scholarshipId === scholarshipId && app.status === 'pending' 
            ? { ...app, status: 'rejected' } 
            : app
        )
      );
      toast({
        title: "Scholarship deactivated",
        description: "All pending applications have been automatically rejected.",
      });
    }
  };

  const handleAcceptApplication = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: 'accepted' } : app
      )
    );
    toast({
      title: "Application accepted!",
      description: "Payment initiated for assessment. The founder will receive access to their sponsored assessment.",
    });
    setSelectedApplication(null);
  };

  const handleRejectApplication = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      )
    );
    toast({
      title: "Application rejected",
      description: "The applicant has been notified of the decision.",
    });
    setSelectedApplication(null);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getApplicationStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      accepted: "default",
      rejected: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status === 'pending' ? 'Pending Review' : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Founder Sponsorship Dashboard</h1>
          <p className="text-muted-foreground">
            Sponsor assessments for promising startup founders and manage your talent pipeline
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Sponsorship
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsorships</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeScholarships}</div>
            <p className="text-xs text-muted-foreground">
              {totalScholarships} total programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Founder Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {pendingApplications} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsored Assessments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter(a => a.status === 'accepted').length}</div>
            <p className="text-xs text-muted-foreground">
              Assessments funded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter(a => a.submittedAt.includes('2024-01')).length}</div>
            <p className="text-xs text-muted-foreground">
              New applications
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scholarships" className="w-full">
        <TabsList>
          <TabsTrigger value="scholarships">My Sponsorships</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Program Management</CardTitle>
              <CardDescription>
                Manage your founder assessment sponsorship programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Associated Tests</TableHead>
                    <TableHead>Description & Rules</TableHead>
                    <TableHead>Acceptance Criteria</TableHead>
                    <TableHead>Status & Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scholarships.map((scholarship) => (
                    <TableRow key={scholarship.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{scholarship.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {scholarship.applications}/{scholarship.maxApplications} applications
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {scholarship.associatedTests.map((test) => (
                            <Badge key={test} variant="outline" className="text-xs">
                              {test}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Description:</p>
                          <p className="text-xs text-muted-foreground">{scholarship.description}</p>
                          <p className="text-sm font-medium">Rules:</p>
                          <p className="text-xs text-muted-foreground">{scholarship.rules}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-xs text-muted-foreground">{scholarship.acceptanceCriteria}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={scholarship.status === 'active'}
                              onCheckedChange={(checked) => 
                                toggleScholarshipStatus(scholarship.id, checked ? 'active' : 'inactive')
                              }
                            />
                            <span className="text-sm">{scholarship.status === 'active' ? 'Active' : 'Inactive'}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Founder Applications</CardTitle>
              <CardDescription>
                Review and manage founder applications for your sponsorship programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant / Startup</TableHead>
                    <TableHead>Sponsorship Program</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={application.applicant.avatar} />
                            <AvatarFallback>
                              {application.applicant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{application.applicant.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {application.applicant.startupName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{application.scholarshipTitle}</p>
                          <p className="text-xs text-muted-foreground">{application.scholarshipId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{application.submittedAt}</TableCell>
                      <TableCell>{getApplicationStatusBadge(application.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Application
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Review the founder's application and make your decision
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedApplication && (
                              <div className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div className="space-y-3">
                                    <h4 className="font-medium">Founder Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Name:</strong> {selectedApplication.applicant.name}</p>
                                      <p><strong>Email:</strong> {selectedApplication.applicant.email}</p>
                                      <p><strong>Startup:</strong> {selectedApplication.applicant.startupName}</p>
                                      <p><strong>Industry:</strong> {selectedApplication.applicant.industry}</p>
                                      <p><strong>Stage:</strong> {selectedApplication.applicant.stage}</p>
                                      <p><strong>Team Size:</strong> {selectedApplication.applicant.teamSize}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="font-medium">Startup Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Pitch:</strong> {selectedApplication.applicant.pitch}</p>
                                      <div className="flex items-center gap-2">
                                        <strong>Website/Deck:</strong> 
                                        <a 
                                          href={selectedApplication.applicant.website} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline flex items-center gap-1"
                                        >
                                          View <ExternalLink className="h-3 w-3" />
                                        </a>
                                      </div>
                                      <p><strong>Submitted:</strong> {selectedApplication.submittedAt}</p>
                                      <p><strong>Program:</strong> {selectedApplication.scholarshipTitle}</p>
                                    </div>
                                  </div>
                                </div>

                                {selectedApplication.status === 'pending' && (
                                  <DialogFooter className="flex gap-3">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline">
                                          Reject Application
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Reject Application</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to reject this application? The founder will be notified and this action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => handleRejectApplication(selectedApplication.id)}
                                            className="bg-destructive text-destructive-foreground"
                                          >
                                            Reject
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>

                                    <Button 
                                      onClick={() => handleAcceptApplication(selectedApplication.id)}
                                      className="bg-primary text-primary-foreground"
                                    >
                                      Accept & Pay on Behalf
                                    </Button>
                                  </DialogFooter>
                                )}

                                {selectedApplication.status !== 'pending' && (
                                  <div className="text-center py-4">
                                    <Badge variant={selectedApplication.status === 'accepted' ? 'default' : 'destructive'}>
                                      Application {selectedApplication.status}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
                <CardDescription>Track applicants through the review process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Applications Received</span>
                    <span className="font-bold">42</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Initial Review Passed</span>
                    <span className="font-bold">32</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Final Review</span>
                    <span className="font-bold">18</span>
                  </div>
                  <Progress value={43} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Awards Granted</span>
                    <span className="font-bold">8</span>
                  </div>
                  <Progress value={19} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Scholarship success by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Technology</p>
                      <p className="text-sm text-muted-foreground">24 applications</p>
                    </div>
                    <Badge variant="default">85% success</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Leadership</p>
                      <p className="text-sm text-muted-foreground">18 applications</p>
                    </div>
                    <Badge variant="secondary">72% success</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Science</p>
                      <p className="text-sm text-muted-foreground">0 applications</p>
                    </div>
                    <Badge variant="outline">N/A</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}