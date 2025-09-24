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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GraduationCap, Users, DollarSign, Calendar, Eye, Edit, Plus, Building, ExternalLink, BarChart3, TrendingUp, Clock, Award, Info } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

// Form validation schema
const scholarshipFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  associatedTests: z.array(z.string()).min(1, "At least one test must be selected"),
  description: z.string().trim().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  rules: z.string().trim().min(1, "Rules are required").max(500, "Rules must be less than 500 characters"),
  acceptanceCriteria: z.string().trim().min(1, "Acceptance criteria are required").max(300, "Acceptance criteria must be less than 300 characters"),
  maxApplications: z.number().min(1, "Must allow at least 1 application").max(1000, "Cannot exceed 1000 applications")
});

type ScholarshipFormData = z.infer<typeof scholarshipFormSchema>;

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
    status: "pending",
    source: "Social Media",
    decisionTime: null
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
    status: "pending",
    source: "Partner Referral",
    decisionTime: null
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
    status: "accepted",
    source: "Direct Traffic",
    decisionTime: 3
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
    status: "rejected",
    source: "Social Media", 
    decisionTime: 2
  },
  {
    id: "APP-005",
    scholarshipId: "SCH-001",
    scholarshipTitle: "Tech Founders Assessment Sponsorship",
    applicant: {
      name: "Lisa Wang",
      email: "lisa@edtech.co",
      avatar: "/placeholder.svg",
      startupName: "EduTech Solutions",
      pitch: "AI-powered personalized learning platform for K-12 students.",
      website: "https://edutech.co",
      industry: "EdTech",
      stage: "Seed",
      teamSize: "6 employees"
    },
    submittedAt: "2024-01-08",
    status: "accepted",
    source: "Partner Referral",
    decisionTime: 4
  }
];

// Mock founder-centric analytics data
const foundersEnrolledData = [
  { founderId: "F-001", name: "Sarah Johnson", scholarshipId: "SCH-001", assessmentStarted: true, assessmentCompleted: true, assessmentScore: 87, enrolledAt: "2024-01-18", source: "Social Media" },
  { founderId: "F-002", name: "Michael Chen", scholarshipId: "SCH-001", assessmentStarted: true, assessmentCompleted: true, assessmentScore: 92, enrolledAt: "2024-01-16", source: "Partner Referral" },
  { founderId: "F-003", name: "Emily Davis", scholarshipId: "SCH-003", assessmentStarted: true, assessmentCompleted: true, assessmentScore: 85, enrolledAt: "2024-01-12", source: "Direct Application" },
  { founderId: "F-004", name: "David Rodriguez", scholarshipId: "SCH-001", assessmentStarted: true, assessmentCompleted: false, assessmentScore: null, enrolledAt: "2024-01-10", source: "Online Ad" },
  { founderId: "F-005", name: "Lisa Wang", scholarshipId: "SCH-001", assessmentStarted: true, assessmentCompleted: true, assessmentScore: 89, enrolledAt: "2024-01-08", source: "Partner Referral" },
  { founderId: "F-006", name: "Alex Thompson", scholarshipId: "SCH-002", assessmentStarted: false, assessmentCompleted: false, assessmentScore: null, enrolledAt: "2024-01-05", source: "Community Event" },
  { founderId: "F-007", name: "Maria Garcia", scholarshipId: "SCH-003", assessmentStarted: true, assessmentCompleted: true, assessmentScore: 91, enrolledAt: "2024-01-02", source: "Partner Referral" },
  { founderId: "F-008", name: "James Wilson", scholarshipId: "SCH-001", assessmentStarted: true, assessmentCompleted: false, assessmentScore: null, enrolledAt: "2023-12-28", source: "Social Media" },
];

const sourceChannelData = [
  { name: "Partner Referral", acceptedFounders: 12, totalFounders: 18, color: "#3b82f6" },
  { name: "Social Media", acceptedFounders: 8, totalFounders: 15, color: "#8b5cf6" },
  { name: "Direct Application", acceptedFounders: 6, totalFounders: 12, color: "#f59e0b" },
  { name: "Community Event", acceptedFounders: 4, totalFounders: 8, color: "#10b981" },
  { name: "Online Ad", acceptedFounders: 2, totalFounders: 5, color: "#ef4444" }
];

const assessmentTimelineData = [
  { month: "Aug", assessmentsStarted: 25, assessmentsCompleted: 18 },
  { month: "Sep", assessmentsStarted: 32, assessmentsCompleted: 24 },
  { month: "Oct", assessmentsStarted: 28, assessmentsCompleted: 22 },
  { month: "Nov", assessmentsStarted: 35, assessmentsCompleted: 28 },
  { month: "Dec", assessmentsStarted: 30, assessmentsCompleted: 25 },
  { month: "Jan", assessmentsStarted: 38, assessmentsCompleted: 32 }
];

const scholarshipPerformanceData = [
  { 
    title: "Tech Founders Assessment Sponsorship",
    foundersAccepted: 32,
    foundersCompleted: 28,
    completionRate: 87.5
  },
  {
    title: "All-in-One Founder Assessment", 
    foundersAccepted: 18,
    foundersCompleted: 15,
    completionRate: 83.3
  },
  {
    title: "Growth Stage Leadership Program",
    foundersAccepted: 12,
    foundersCompleted: 8,
    completionRate: 66.7
  }
];

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

export default function Scholarships() {
  const [scholarships, setScholarships] = useState(mockScholarships);
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<typeof mockScholarships[0] | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: {
      title: "",
      associatedTests: [],
      description: "",
      rules: "",
      acceptanceCriteria: "",
      maxApplications: 25
    }
  });

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
        app.id === applicationId ? { ...app, status: 'accepted', decisionTime: Math.floor(Math.random() * 5) + 1 } : app
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
        app.id === applicationId ? { ...app, status: 'rejected', decisionTime: Math.floor(Math.random() * 5) + 1 } : app
      )
    );
    toast({
      title: "Application rejected",
      description: "The applicant has been notified of the decision.",
    });
    setSelectedApplication(null);
  };

  const onCreateScholarship = (data: ScholarshipFormData) => {
    const newScholarship = {
      id: `SCH-${String(scholarships.length + 1).padStart(3, '0')}`,
      ...data,
      status: "active" as const,
      applications: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setScholarships(prev => [...prev, newScholarship]);
    setIsCreateModalOpen(false);
    form.reset();
    
    toast({
      title: "Scholarship created successfully!",
      description: "Your new sponsorship program is now active and accepting applications.",
    });
  };

  const filteredApplicationsBySource = selectedSource 
    ? applications.filter(app => app.source === selectedSource)
    : applications;

  // Founder-centric analytics calculations
  const totalFoundersEnrolled = foundersEnrolledData.length;
  
  const averageCompletionRate = foundersEnrolledData.length > 0
    ? ((foundersEnrolledData.filter(f => f.assessmentCompleted).length / foundersEnrolledData.length) * 100).toFixed(1)
    : "0";

  const topPerformingSource = sourceChannelData.reduce((top, current) => 
    current.acceptedFounders > top.acceptedFounders ? current : top
  ).name;

  const averageAssessmentScore = foundersEnrolledData.filter(f => f.assessmentScore !== null).length > 0
    ? (foundersEnrolledData.filter(f => f.assessmentScore !== null).reduce((sum, f) => sum + (f.assessmentScore || 0), 0) / 
       foundersEnrolledData.filter(f => f.assessmentScore !== null).length).toFixed(1)
    : "0";

  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string | null>(null);
  const [selectedScholarshipFilter, setSelectedScholarshipFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'accepted' | 'completed'>('accepted');

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
          <h1 className="text-3xl font-bold">Scholarships</h1>
          <p className="text-muted-foreground">
            Sponsor assessments for promising startup founders and manage your talent pipeline
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Sponsorship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Sponsorship Program</DialogTitle>
              <DialogDescription>
                Define a new assessment sponsorship program for startup founders
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCreateScholarship)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Early Stage Founder Assessment Program" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="associatedTests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Associated Assessment Tests</FormLabel>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {["FPA", "EEA", "GEB", "All-in-One Package"].map((test) => (
                          <div key={test} className="flex items-center space-x-2">
                            <Checkbox
                              id={test}
                              checked={field.value?.includes(test)}
                              onCheckedChange={(checked) => {
                                const updatedTests = checked
                                  ? [...(field.value || []), test]
                                  : field.value?.filter(t => t !== test) || [];
                                field.onChange(updatedTests);
                              }}
                            />
                            <Label htmlFor={test} className="text-sm font-medium">
                              {test}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe this program for potential applicants..."
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Rules & Eligibility</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Define eligibility criteria and application rules..."
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptanceCriteria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internal Acceptance Criteria</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Internal guidelines for evaluating applications..."
                          rows={2}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxApplications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Applications</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Program
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
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
                    <TableHead>Status & Actions</TableHead>
                    <TableHead>Details</TableHead>
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
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={scholarship.status === 'active'}
                            onCheckedChange={(checked) => 
                              toggleScholarshipStatus(scholarship.id, checked ? 'active' : 'inactive')
                            }
                          />
                          <span className="text-sm">{scholarship.status === 'active' ? 'Active' : 'Inactive'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog open={isDetailsModalOpen && selectedScholarship?.id === scholarship.id} 
                                onOpenChange={(open) => {
                                  setIsDetailsModalOpen(open);
                                  if (!open) setSelectedScholarship(null);
                                }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedScholarship(scholarship)}
                            >
                              <Info className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{scholarship.title}</DialogTitle>
                              <DialogDescription>
                                Complete program details and acceptance criteria
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-3">
                                  <h4 className="font-medium">Program Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><strong>Program ID:</strong> {scholarship.id}</p>
                                    <p><strong>Status:</strong> {getStatusBadge(scholarship.status)}</p>
                                    <p><strong>Applications:</strong> {scholarship.applications}/{scholarship.maxApplications}</p>
                                    <p><strong>Created:</strong> {scholarship.createdAt}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <h4 className="font-medium">Associated Tests</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {scholarship.associatedTests.map((test) => (
                                      <Badge key={test} variant="secondary">
                                        {test}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Description</h4>
                                  <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Application Rules</h4>
                                  <p className="text-sm text-muted-foreground">{scholarship.rules}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Acceptance Criteria (Internal)</h4>
                                  <p className="text-sm text-muted-foreground">{scholarship.acceptanceCriteria}</p>
                                </div>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Program
                              </Button>
                            </DialogFooter>
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

        <TabsContent value="analytics" className="space-y-6">
          {/* Founder-Centric KPI Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Founders Enrolled</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFoundersEnrolled}</div>
                <p className="text-xs text-muted-foreground">
                  Paid assessments for founders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Assessment Completion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageCompletionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {foundersEnrolledData.filter(f => f.assessmentCompleted).length} of {totalFoundersEnrolled} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performing Source</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{topPerformingSource}</div>
                <p className="text-xs text-muted-foreground">
                  {sourceChannelData.find(s => s.name === topPerformingSource)?.acceptedFounders} accepted founders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Assessment Score</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageAssessmentScore}</div>
                <p className="text-xs text-muted-foreground">
                  For accepted founders only
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Founder Origin / Sourcing Channel Effectiveness */}
            <Card>
              <CardHeader>
                <CardTitle>Founder Origin / Sourcing Channel Effectiveness</CardTitle>
                <CardDescription>Breakdown of accepted founders by source channel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceChannelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="acceptedFounders"
                      onClick={(data) => {
                        setSelectedSourceFilter(selectedSourceFilter === data.name ? null : data.name);
                      }}
                      className="cursor-pointer"
                    >
                      {sourceChannelData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke={selectedSourceFilter === entry.name ? "#000" : "none"}
                          strokeWidth={selectedSourceFilter === entry.name ? 2 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} founders`, 'Accepted Founders']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                {selectedSourceFilter && (
                  <div className="text-sm text-center mt-2">
                    <p className="font-medium">Source: {selectedSourceFilter}</p>
                    <p className="text-muted-foreground">
                      {sourceChannelData.find(s => s.name === selectedSourceFilter)?.acceptedFounders} accepted / {' '}
                      {sourceChannelData.find(s => s.name === selectedSourceFilter)?.totalFounders} total founders
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Scholarships by Enrollment & Engagement */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Scholarships by Enrollment & Engagement</CardTitle>
                  <CardDescription>Performance comparison across programs</CardDescription>
                </div>
                <Select value={sortBy} onValueChange={(value: 'accepted' | 'completed') => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted">By Accepted</SelectItem>
                    <SelectItem value="completed">By Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={[...scholarshipPerformanceData].sort((a, b) => 
                      sortBy === 'accepted' ? b.foundersAccepted - a.foundersAccepted : b.foundersCompleted - a.foundersCompleted
                    )} 
                    layout="horizontal"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="title" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="foundersAccepted" fill="#3b82f6" name="Founders Accepted" />
                    <Bar dataKey="foundersCompleted" fill="#10b981" name="Assessments Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Engagement Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assessment Engagement Timeline</CardTitle>
                <CardDescription>Track assessment activity for sponsored founders over time</CardDescription>
              </div>
              <Select value={selectedScholarshipFilter || "all"} onValueChange={(value) => setSelectedScholarshipFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by scholarship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scholarships</SelectItem>
                  {scholarships.map((scholarship) => (
                    <SelectItem key={scholarship.id} value={scholarship.id}>{scholarship.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={assessmentTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="assessmentsStarted" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Assessments Started" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="assessmentsCompleted" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Assessments Completed" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Filtered Founder Details */}
          {selectedSourceFilter && (
            <Card>
              <CardHeader>
                <CardTitle>Founders from {selectedSourceFilter}</CardTitle>
                <CardDescription>
                  Detailed view of founders sourced through {selectedSourceFilter}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Founder Name</TableHead>
                      <TableHead>Scholarship Program</TableHead>
                      <TableHead>Assessment Status</TableHead>
                      <TableHead>Assessment Score</TableHead>
                      <TableHead>Enrolled Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foundersEnrolledData
                      .filter(founder => founder.source === selectedSourceFilter)
                      .map((founder) => (
                        <TableRow key={founder.founderId}>
                          <TableCell className="font-medium">{founder.name}</TableCell>
                          <TableCell>
                            {scholarships.find(s => s.id === founder.scholarshipId)?.title || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={founder.assessmentCompleted ? "default" : founder.assessmentStarted ? "secondary" : "outline"}>
                              {founder.assessmentCompleted ? "Completed" : founder.assessmentStarted ? "In Progress" : "Not Started"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {founder.assessmentScore ? (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{founder.assessmentScore}/100</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Award 
                                      key={i} 
                                      className={`h-3 w-3 ${
                                        i < Math.floor(founder.assessmentScore / 20) ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>{founder.enrolledAt}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}