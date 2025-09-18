import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Users, DollarSign, Calendar, Eye, Edit, Plus, Building, Target } from "lucide-react";

const mockOrganizationalScholarships = [
  {
    id: "SCH-ORG-001",
    title: "Corporate Leadership Excellence Program",
    amount: 15000,
    status: "active",
    applications: 42,
    maxApplications: 100,
    deadline: "2024-04-15",
    createdAt: "2024-01-01",
    category: "Leadership",
    department: "HR Development",
    targetRole: "Management Trainee"
  },
  {
    id: "SCH-ORG-002",
    title: "Technical Innovation Scholarship",
    amount: 10000,
    status: "active",
    applications: 28,
    maxApplications: 50,
    deadline: "2024-03-30",
    createdAt: "2024-01-05",
    category: "Technology",
    department: "Engineering",
    targetRole: "Software Developer"
  },
  {
    id: "SCH-ORG-003",
    title: "Marketing Excellence Award",
    amount: 8000,
    status: "closed",
    applications: 35,
    maxApplications: 40,
    deadline: "2024-02-15",
    createdAt: "2023-12-15",
    category: "Marketing",
    department: "Marketing",
    targetRole: "Marketing Specialist"
  }
];

const mockOrganizationalApplications = [
  {
    id: "APP-ORG-001",
    scholarshipId: "SCH-ORG-001",
    scholarshipTitle: "Corporate Leadership Excellence Program",
    applicant: {
      name: "Alexandra Johnson",
      email: "alex.j@email.com",
      avatar: "/placeholder.svg",
      gpa: 3.9,
      major: "Business Administration",
      university: "Stanford University",
      expectedGraduation: "2024"
    },
    submittedAt: "2024-01-20",
    status: "pending",
    score: 92,
    targetRole: "Management Trainee"
  },
  {
    id: "APP-ORG-002", 
    scholarshipId: "SCH-ORG-002",
    scholarshipTitle: "Technical Innovation Scholarship",
    applicant: {
      name: "David Chen",
      email: "d.chen@email.com",
      avatar: "/placeholder.svg",
      gpa: 3.8,
      major: "Computer Science",
      university: "MIT",
      expectedGraduation: "2024"
    },
    submittedAt: "2024-01-18",
    status: "reviewed",
    score: 88,
    targetRole: "Software Developer"
  },
  {
    id: "APP-ORG-003",
    scholarshipId: "SCH-ORG-001", 
    scholarshipTitle: "Corporate Leadership Excellence Program",
    applicant: {
      name: "Maria Rodriguez",
      email: "maria.r@email.com",
      avatar: "/placeholder.svg",
      gpa: 3.7,
      major: "International Business",
      university: "Harvard Business School",
      expectedGraduation: "2024"
    },
    submittedAt: "2024-01-15",
    status: "approved",
    score: 90,
    targetRole: "Management Trainee"
  }
];

export default function Scholarships() {
  const totalScholarships = mockOrganizationalScholarships.length;
  const activeScholarships = mockOrganizationalScholarships.filter(s => s.status === 'active').length;
  const totalApplications = mockOrganizationalApplications.length;
  const totalBudget = mockOrganizationalScholarships.reduce((sum, s) => sum + s.amount, 0);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      closed: "secondary",
      draft: "outline"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getApplicationStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      reviewed: "outline",
      approved: "default",
      rejected: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organization Scholarship Dashboard</h1>
          <p className="text-muted-foreground">
            Manage corporate scholarships and talent acquisition programs
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Scholarship Program
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeScholarships}</div>
            <p className="text-xs text-muted-foreground">
              of {totalScholarships} total programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Potential hires
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Investment in talent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              Application to hire
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs" className="w-full">
        <TabsList>
          <TabsTrigger value="programs">Scholarship Programs</TabsTrigger>
          <TabsTrigger value="applications">Candidate Applications</TabsTrigger>
          <TabsTrigger value="analytics">Talent Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Corporate Scholarship Programs</CardTitle>
              <CardDescription>
                Manage your organization's talent acquisition scholarships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Title</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrganizationalScholarships.map((scholarship) => (
                    <TableRow key={scholarship.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{scholarship.title}</p>
                          <p className="text-sm text-muted-foreground">{scholarship.category}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${scholarship.amount.toLocaleString()}</TableCell>
                      <TableCell>{scholarship.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{scholarship.targetRole}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{scholarship.applications}</span>
                            <span>/{scholarship.maxApplications}</span>
                          </div>
                          <Progress 
                            value={(scholarship.applications / scholarship.maxApplications) * 100} 
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{scholarship.deadline}</TableCell>
                      <TableCell>{getStatusBadge(scholarship.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
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
              <CardTitle>Candidate Applications</CardTitle>
              <CardDescription>
                Review and evaluate scholarship applicants for potential hiring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrganizationalApplications.map((application) => (
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
                            <p className="text-sm text-muted-foreground">{application.applicant.major}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{application.scholarshipTitle}</p>
                          <p className="text-xs text-muted-foreground">{application.scholarshipId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{application.applicant.university}</p>
                          <p className="text-xs text-muted-foreground">Class of {application.applicant.expectedGraduation}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{application.targetRole}</Badge>
                      </TableCell>
                      <TableCell>{application.applicant.gpa}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{application.score}/100</Badge>
                      </TableCell>
                      <TableCell>{getApplicationStatusBadge(application.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            Interview
                          </Button>
                        </div>
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
                <CardDescription>Track candidates through the hiring process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Applications Received</span>
                    <span className="font-bold">105</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Initial Review Passed</span>
                    <span className="font-bold">78</span>
                  </div>
                  <Progress value={74} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interviews Scheduled</span>
                    <span className="font-bold">45</span>
                  </div>
                  <Progress value={43} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Offers Extended</span>
                    <span className="font-bold">12</span>
                  </div>
                  <Progress value={11} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Scholarship success by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Engineering</p>
                      <p className="text-sm text-muted-foreground">28 applications</p>
                    </div>
                    <Badge variant="default">92% success</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">HR Development</p>
                      <p className="text-sm text-muted-foreground">42 applications</p>
                    </div>
                    <Badge variant="secondary">76% success</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-sm text-muted-foreground">35 applications</p>
                    </div>
                    <Badge variant="outline">68% success</Badge>
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