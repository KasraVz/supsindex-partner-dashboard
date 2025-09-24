import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Download, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";

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
  // Simulate current affiliation count - in real app this would come from an API/context
  const affiliatedCandidates = 35; // Change this to 50+ to see unlocked state
  const requiredAffiliations = 50;
  const progressPercentage = (affiliatedCandidates / requiredAffiliations) * 100;
  
  // State for report selection in unlocked preview
  const [selectedReport, setSelectedReport] = useState<string>("");

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Unlock Your Strategic Reports
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Strategic reports are a premium feature unlocked for our most engaged partners. Refer 50 affiliated candidates who complete an assessment to gain access to our library of pre-made data insight reports.
        </p>
      </div>

      {/* Locked State View */}
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-dashed">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">Progress Towards Unlocking</CardTitle>
            <CardDescription>
              Keep referring affiliated candidates to unlock exclusive strategic reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {affiliatedCandidates} / {requiredAffiliations}
              </div>
              <p className="text-sm text-muted-foreground">Affiliated Candidates</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                You need <span className="font-medium text-foreground">{requiredAffiliations - affiliatedCandidates} more affiliated candidates</span> to unlock strategic reports
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Separator */}
      <div className="flex items-center justify-center">
        <div className="flex-1 border-t border-muted"></div>
        <div className="px-4 text-sm text-muted-foreground font-medium">Unlocked View Preview</div>
        <div className="flex-1 border-t border-muted"></div>
      </div>

      {/* Unlocked State Preview */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl">Your Report Library</CardTitle>
            <CardDescription>
              Congratulations on unlocking strategic reports! Select a report from the library below to download.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Report</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a report to download..." />
                  </SelectTrigger>
                  <SelectContent>
                    {strategicReports.map((report) => (
                      <SelectItem key={report.id} value={report.id.toString()}>
                        {report.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                disabled={!selectedReport}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
            
            {selectedReport && (
              <div className="bg-muted/50 p-4 rounded-lg">
                {(() => {
                  const report = strategicReports.find(r => r.id.toString() === selectedReport);
                  return report ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">{report.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Type: {report.type}</span>
                        <span>Date: {report.date}</span>
                        <span>Companies: {report.companies}</span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}