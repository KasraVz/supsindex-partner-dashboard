import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, ExternalLink, FileText } from "lucide-react";

const founders = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techstartup.com",
    phone: "+1 (555) 123-4567",
    company: "TechStartup Inc.",
    status: "Active",
    joinDate: "Jan 15, 2024",
    lastActivity: "2 hours ago",
    assessments: 3,
    reports: 2
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@innovacorp.com",
    phone: "+1 (555) 987-6543",
    company: "InnovaCorp",
    status: "Pending",
    joinDate: "Feb 3, 2024",
    lastActivity: "1 day ago",
    assessments: 1,
    reports: 0
  },
  {
    id: 3,
    name: "Lisa Wang",
    email: "lisa@futuretech.io",
    phone: "+1 (555) 456-7890",
    company: "FutureTech Solutions",
    status: "Active",
    joinDate: "Dec 20, 2023",
    lastActivity: "3 days ago",
    assessments: 5,
    reports: 4
  }
];

export default function MyFounders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Founders</h1>
          <p className="text-muted-foreground">
            Manage and track all the founders you've referred to the platform.
          </p>
        </div>
        <Button>
          <ExternalLink className="mr-2 h-4 w-4" />
          Share Referral Link
        </Button>
      </div>

      <div className="grid gap-4">
        {founders.map((founder) => (
          <Card key={founder.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{founder.name}</CardTitle>
                    <CardDescription>{founder.company}</CardDescription>
                  </div>
                </div>
                <Badge variant={founder.status === 'Active' ? 'default' : 'secondary'}>
                  {founder.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{founder.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{founder.phone}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Joined: {founder.joinDate}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last active: {founder.lastActivity}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Assessments Taken:</span>
                    <span className="text-sm font-medium">{founder.assessments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Reports Generated:</span>
                    <span className="text-sm font-medium">{founder.reports}</span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}