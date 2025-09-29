import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { FileText, Mail, ExternalLink, CreditCard, AlertCircle } from "lucide-react";
import { AssessmentDetail } from "@/types/assessment";
import { canAccessReport, getReportInaccessibleReason, getPaymentStatusInfo } from "@/lib/assessment-utils";

interface CandidateAssessmentDetailsProps {
  assessmentDetails: AssessmentDetail[];
  candidateName: string;
  candidateEmail: string;
}

export function CandidateAssessmentDetails({ 
  assessmentDetails, 
  candidateName, 
  candidateEmail
}: CandidateAssessmentDetailsProps) {
  const getAssessmentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>;
      case 'not_started':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: 'unpaid' | 'paid', paidBy?: 'candidate' | 'partner') => {
    const { text, variant } = getPaymentStatusInfo(status, paidBy);
    return (
      <Badge variant={variant} className={
        variant === 'destructive' ? "bg-red-100 text-red-800 border-red-200" :
        variant === 'secondary' ? "bg-blue-100 text-blue-800 border-blue-200" :
        "bg-green-100 text-green-800 border-green-200"
      }>
        {text}
      </Badge>
    );
  };

  const getReportStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">Sent</Badge>;
      case 'generated':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">Generated</Badge>;
      case 'not_generated':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600">Not Generated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const completedAssessments = assessmentDetails.filter(a => a.assessmentStatus === 'completed').length;
  const progressPercentage = (completedAssessments / assessmentDetails.length) * 100;

  return (
    <div className="space-y-6">
      {/* Contact Info and Progress Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Contact Information</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{candidateEmail}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Assessment Progress</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Completed</span>
              <span>{completedAssessments} of {assessmentDetails.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            All Reports
          </Button>
        </div>
      </div>

      {/* Assessment Details Table */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Assessment Details</h4>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Assessment Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Report Status</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessmentDetails.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{assessment.testName}</div>
                      <div className="text-xs text-muted-foreground">{assessment.testType}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getAssessmentStatusBadge(assessment.assessmentStatus)}
                  </TableCell>
                   <TableCell>
                     {getPaymentStatusBadge(assessment.paymentStatus, assessment.paidBy)}
                   </TableCell>
                  <TableCell>
                    {getReportStatusBadge(assessment.reportStatus)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {assessment.usedAt.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </TableCell>
                   <TableCell>
                     <div className="flex gap-2">
                       {canAccessReport(assessment.paymentStatus, assessment.assessmentStatus, assessment.reportStatus) ? (
                         <>
                           <Button variant="outline" size="sm">
                             <FileText className="h-4 w-4 mr-1" />
                             View Report
                           </Button>
                           {assessment.reportUrl && (
                             <Button variant="outline" size="sm">
                               <ExternalLink className="h-4 w-4 mr-1" />
                               External Link
                             </Button>
                           )}
                         </>
                       ) : (
                         <div className="flex flex-col gap-2">
                           {assessment.paymentStatus === 'unpaid' && (
                             <div className="flex gap-2">
                               <Button variant="outline" size="sm">
                                 <Mail className="h-4 w-4 mr-1" />
                                 Remind Candidate
                               </Button>
                               <Button variant="default" size="sm">
                                 <CreditCard className="h-4 w-4 mr-1" />
                                 Pay on Behalf
                               </Button>
                             </div>
                           )}
                           <div className="flex items-center text-sm text-muted-foreground">
                             <AlertCircle className="h-4 w-4 mr-1" />
                             {getReportInaccessibleReason(assessment.paymentStatus, assessment.assessmentStatus)}
                           </div>
                         </div>
                       )}
                     </div>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}