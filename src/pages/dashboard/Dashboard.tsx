import { BarChart3, Users, Award, TrendingUp, BookOpen, Calendar, Trophy, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      title: "Assessments Completed",
      value: "12",
      change: "+2 this month",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Certifications Earned",
      value: "3",
      change: "+1 this month",
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Study Hours",
      value: "47",
      change: "+12 this week",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Rank",
      value: "#24",
      change: "↑ 3 positions",
      icon: Trophy,
      color: "text-brand-orange",
    },
  ];

  const recentAssessments = [
    { name: "React Development", score: 95, status: "completed", date: "2 days ago" },
    { name: "Node.js Backend", score: 88, status: "completed", date: "1 week ago" },
    { name: "Database Design", score: null, status: "in-progress", date: "Started today" },
  ];

  const upcomingDeadlines = [
    { name: "Advanced JavaScript", dueIn: "3 days", type: "assessment" },
    { name: "System Design Course", dueIn: "1 week", type: "course" },
    { name: "DevOps Certification", dueIn: "2 weeks", type: "certification" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning journey.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-orange-dark hover:to-brand-orange">
            <Link to="/dashboard/fast-trak">
              <Star className="h-4 w-4 mr-2" />
              Fast Trak
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/orders/new">New Assessment</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Assessments
            </CardTitle>
            <CardDescription>Your latest assessment results and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{assessment.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={assessment.status === 'completed' ? 'default' : 'secondary'}>
                      {assessment.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{assessment.date}</span>
                  </div>
                </div>
                {assessment.score && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-brand-orange">{assessment.score}%</p>
                  </div>
                )}
                {assessment.status === 'in-progress' && (
                  <div className="w-16">
                    <Progress value={35} className="h-2" />
                  </div>
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/exams/history">View All Assessments</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {item.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-brand-orange">Due in {item.dueIn}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/exams/booked">View All Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these popular actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link to="/dashboard/orders/new">
                <BookOpen className="h-6 w-6" />
                <span>Book Assessment</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link to="/dashboard/reports">
                <BarChart3 className="h-6 w-6" />
                <span>View Reports</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link to="/dashboard/community">
                <Users className="h-6 w-6" />
                <span>Join Community</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link to="/dashboard/certifications">
                <Award className="h-6 w-6" />
                <span>Certifications</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}