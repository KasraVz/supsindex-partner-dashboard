import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, CalendarDays } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Sarah Johnson - Quarterly Progress Report",
    candidate: "Sarah Johnson",
    company: "TechStartup Inc.",
    type: "Progress Report",
    status: "Complete",
    date: "Mar 15, 2024",
    fileSize: "2.4 MB"
  },
  {
    id: 2,
    title: "Mike Chen - Assessment Summary",
    candidate: "Mike Chen", 
    company: "InnovaCorp",
    type: "Assessment",
    status: "Processing",
    date: "Mar 12, 2024",
    fileSize: "1.8 MB"
  },
  {
    id: 3,
    title: "Lisa Wang - Annual Performance Review",
    candidate: "Lisa Wang",
    company: "FutureTech Solutions",
    type: "Annual Review",
    status: "Complete",
    date: "Mar 8, 2024",
    fileSize: "5.2 MB"
  },
  {
    id: 4,
    title: "Cohort Analysis - Q1 2024",
    candidate: "Multiple Candidates",
    company: "Batch Report",
    type: "Cohort Analysis",
    status: "Complete",
    date: "Mar 1, 2024",
    fileSize: "8.7 MB"
  }
];

export default function CandidateReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidate Reports</h1>
          <p className="text-muted-foreground">
            Access and download detailed reports for all your referred candidates.
          </p>
        </div>
        <Button>
          <CalendarDays className="mr-2 h-4 w-4" />
          Request New Report
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>
                      {report.candidate} • {report.company}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={report.status === 'Complete' ? 'default' : 'secondary'}>
                  {report.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                  <div>
                    <span className="text-sm text-muted-foreground">Report Type</span>
                    <p className="font-medium">{report.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Generated</span>
                    <p className="font-medium">{report.date}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">File Size</span>
                    <p className="font-medium">{report.fileSize}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    disabled={report.status !== 'Complete'}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Request Guidelines</CardTitle>
          <CardDescription>
            Important information about requesting and accessing candidate reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Available Report Types</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Progress Reports (Monthly/Quarterly)</li>
                <li>• Assessment Summaries</li>
                <li>• Performance Reviews (Annual)</li>
                <li>• Cohort Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Processing Times</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Standard Reports: 2-3 business days</li>
                <li>• Custom Reports: 5-7 business days</li>
                <li>• Bulk Reports: 7-10 business days</li>
                <li>• Rush Orders: 24-48 hours (additional fee)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}