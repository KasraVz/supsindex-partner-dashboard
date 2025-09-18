import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Users, DollarSign, Calendar, Eye, Edit, Plus } from "lucide-react";

const mockScholarships = [
  {
    id: "SCH-001",
    title: "Excellence in Technology Scholarship",
    amount: 5000,
    status: "active",
    applications: 24,
    maxApplications: 50,
    deadline: "2024-03-15",
    createdAt: "2024-01-01",
    category: "Technology"
  },
  {
    id: "SCH-002",
    title: "Leadership Development Award",
    amount: 3000,
    status: "closed",
    applications: 18,
    maxApplications: 25,
    deadline: "2024-01-20",
    createdAt: "2023-12-01",
    category: "Leadership"
  },
  {
    id: "SCH-003",
    title: "Innovation in Science Grant",
    amount: 7500,
    status: "draft",
    applications: 0,
    maxApplications: 30,
    deadline: "2024-06-01",
    createdAt: "2024-01-10",
    category: "Science"
  }
];

const mockApplications = [
  {
    id: "APP-001",
    scholarshipId: "SCH-001",
    scholarshipTitle: "Excellence in Technology Scholarship",
    applicant: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "/placeholder.svg",
      gpa: 3.8,
      major: "Computer Science"
    },
    submittedAt: "2024-01-18",
    status: "pending",
    score: 85
  },
  {
    id: "APP-002", 
    scholarshipId: "SCH-001",
    scholarshipTitle: "Excellence in Technology Scholarship",
    applicant: {
      name: "Michael Chen",
      email: "m.chen@email.com",
      avatar: "/placeholder.svg",
      gpa: 3.9,
      major: "Software Engineering"
    },
    submittedAt: "2024-01-16",
    status: "reviewed",
    score: 92
  },
  {
    id: "APP-003",
    scholarshipId: "SCH-002", 
    scholarshipTitle: "Leadership Development Award",
    applicant: {
      name: "Emily Davis",
      email: "emily.d@email.com",
      avatar: "/placeholder.svg",
      gpa: 3.7,
      major: "Business Administration"
    },
    submittedAt: "2024-01-12",
    status: "approved",
    score: 88
  }
];

export default function Scholarships() {
  const totalScholarships = mockScholarships.length;
  const activeScholarships = mockScholarships.filter(s => s.status === 'active').length;
  const totalApplications = mockApplications.length;
  const totalAmount = mockScholarships.reduce((sum, s) => sum + s.amount, 0);

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
          <h1 className="text-3xl font-bold">Scholarship Dashboard</h1>
          <p className="text-muted-foreground">
            Create and manage scholarships to support talented individuals
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Scholarship
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scholarships</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScholarships}</div>
            <p className="text-xs text-muted-foreground">
              {activeScholarships} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Across all scholarships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Award Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Available funding
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              New applications
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scholarships" className="w-full">
        <TabsList>
          <TabsTrigger value="scholarships">My Scholarships</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Management</CardTitle>
              <CardDescription>
                Manage your published scholarships and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockScholarships.map((scholarship) => (
                    <TableRow key={scholarship.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{scholarship.title}</p>
                          <p className="text-sm text-muted-foreground">{scholarship.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${scholarship.amount.toLocaleString()}</TableCell>
                      <TableCell>{scholarship.category}</TableCell>
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
              <CardTitle>Scholarship Applications</CardTitle>
              <CardDescription>
                Review and manage applications for your scholarships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Scholarship</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((application) => (
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
                            <p className="text-sm text-muted-foreground">{application.applicant.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{application.scholarshipTitle}</p>
                          <p className="text-xs text-muted-foreground">{application.scholarshipId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{application.applicant.gpa}</TableCell>
                      <TableCell>{application.applicant.major}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{application.score}/100</Badge>
                      </TableCell>
                      <TableCell>{application.submittedAt}</TableCell>
                      <TableCell>{getApplicationStatusBadge(application.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
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
                <CardTitle>Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics charts will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scholarship Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Performance metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}