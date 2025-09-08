import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Eye, Calendar, TrendingUp, Building, Users } from "lucide-react";

const strategicReports = [
  {
    id: 1,
    title: "Q1 2024 Portfolio Performance Analysis",
    description: "Comprehensive analysis of all portfolio companies' performance metrics and growth indicators",
    type: "Portfolio Analysis",
    status: "Complete",
    date: "Mar 31, 2024",
    fileSize: "12.3 MB",
    companies: 28,
    insights: 15
  },
  {
    id: 2,
    title: "Ecosystem Trend Report - AI/ML Startups",
    description: "Market analysis and benchmarking data for AI/ML startups in your portfolio",
    type: "Market Intelligence",
    status: "Processing",
    date: "Mar 25, 2024",
    fileSize: "8.7 MB",
    companies: 12,
    insights: 8
  },
  {
    id: 3,
    title: "Investment Readiness Assessment Summary",
    description: "Aggregated readiness scores and recommendations for portfolio companies seeking next round",
    type: "Investment Analysis",
    status: "Complete",
    date: "Mar 15, 2024",
    fileSize: "6.4 MB",
    companies: 15,
    insights: 12
  },
  {
    id: 4,
    title: "Competitive Landscape Analysis - FinTech",
    description: "Detailed competitive positioning analysis for FinTech companies in your portfolio",
    type: "Competitive Intelligence",
    status: "Scheduled",
    date: "Apr 10, 2024",
    fileSize: "TBD",
    companies: 8,
    insights: 0
  }
];

const reportTypes = [
  {
    name: "Portfolio Analysis",
    description: "Comprehensive performance metrics across all portfolio companies",
    frequency: "Quarterly",
    price: "$2,500"
  },
  {
    name: "Market Intelligence",
    description: "Industry trends and benchmarking data for specific sectors",
    frequency: "Monthly",
    price: "$1,800"
  },
  {
    name: "Investment Analysis",
    description: "Due diligence insights and investment readiness assessments",
    frequency: "On-demand",
    price: "$3,200"
  },
  {
    name: "Competitive Intelligence",
    description: "Competitive positioning and market opportunity analysis",
    frequency: "Bi-annual",
    price: "$2,200"
  }
];

export default function StrategicReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategic Reports</h1>
          <p className="text-muted-foreground">
            Request high-level portfolio reports and purchase ecosystem-level data insights.
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Request New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Generated this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies Covered</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              In latest portfolio report
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Key Insights</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              Actionable insights delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Report Value</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$52K</div>
            <p className="text-xs text-muted-foreground">
              Total reports purchased
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Strategic Reports</CardTitle>
          <CardDescription>
            Your organization's strategic intelligence reports and analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategicReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{report.title}</h3>
                      <Badge variant={
                        report.status === 'Complete' ? 'default' : 
                        report.status === 'Processing' ? 'secondary' : 'outline'
                      }>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Type: {report.type}</span>
                      <span>Date: {report.date}</span>
                      <span>Companies: {report.companies}</span>
                      <span>Size: {report.fileSize}</span>
                      {report.insights > 0 && <span>Insights: {report.insights}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" disabled={report.status !== 'Complete'}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" disabled={report.status !== 'Complete'}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Report Types</CardTitle>
          <CardDescription>
            Choose from our strategic intelligence offerings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((type) => (
              <div key={type.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{type.name}</h3>
                  <div className="text-right">
                    <div className="font-medium text-primary">{type.price}</div>
                    <div className="text-xs text-muted-foreground">{type.frequency}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Request Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise Data Packages</CardTitle>
          <CardDescription>
            Access ecosystem-level data and benchmarking insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium mb-1">Sector Benchmarks</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Performance metrics across industry sectors
              </p>
              <div className="text-lg font-medium text-primary mb-2">$5,000</div>
              <Button size="sm" variant="outline" className="w-full">Purchase</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium mb-1">Market Intelligence</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive market trends and forecasts
              </p>
              <div className="text-lg font-medium text-primary mb-2">$8,500</div>
              <Button size="sm" variant="outline" className="w-full">Purchase</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <Building className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium mb-1">Ecosystem Data</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complete startup ecosystem analytics
              </p>
              <div className="text-lg font-medium text-primary mb-2">$12,000</div>
              <Button size="sm" variant="outline" className="w-full">Purchase</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}