import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, XCircle, AlertCircle, FileText, Edit } from "lucide-react";

interface EditRequest {
  id: string;
  profileSection: string;
  field: string;
  currentValue: string;
  requestedValue: string;
  reason: string;
  priority: string;
  status: string;
  submittedDate: string;
  adminResponse: string | null;
}

interface ViewEditRequestDetailsDialogProps {
  request: EditRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditRequest: (request: EditRequest) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "approved":
      return <CheckCircle className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
    case "approved":
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
    case "rejected":
      return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return <Badge variant="secondary">Unknown Status</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High Priority</Badge>;
    case "medium":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Medium Priority</Badge>;
    case "low":
      return <Badge variant="outline">Low Priority</Badge>;
    default:
      return <Badge variant="outline">Unknown Priority</Badge>;
  }
};

export function ViewEditRequestDetailsDialog({ 
  request, 
  open, 
  onOpenChange, 
  onEditRequest 
}: ViewEditRequestDetailsDialogProps) {
  if (!request) return null;

  const canEdit = request.status === "pending" || request.status === "rejected";

  const handleEditClick = () => {
    onEditRequest(request);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Edit Request Details
          </DialogTitle>
          <DialogDescription>
            View the complete details of your profile edit request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Request ID</p>
              <p className="font-mono text-sm">{request.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted Date</p>
              <p className="text-sm">{new Date(request.submittedDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(request.status)}
              {getStatusBadge(request.status)}
            </div>
            {getPriorityBadge(request.priority)}
          </div>

          <Separator />

          {/* Profile Change Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Change Details</h3>
            
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Section</p>
                <p className="text-sm">{request.profileSection}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Field to Change</p>
                <p className="text-sm">{request.field}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Value</p>
                <div className="text-sm p-3 bg-muted rounded-md">
                  {request.currentValue}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Requested New Value</p>
                <div className="text-sm p-3 bg-primary/5 border border-primary/20 rounded-md">
                  {request.requestedValue}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Reason */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Reason for Change</p>
            <div className="text-sm p-3 bg-muted rounded-md">
              {request.reason}
            </div>
          </div>

          {/* Admin Response */}
          {request.adminResponse && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Admin Response</p>
                <div className="text-sm p-3 bg-muted rounded-md border-l-4 border-l-primary">
                  {request.adminResponse}
                </div>
              </div>
            </>
          )}

          {/* Status Information */}
          {request.status === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Request Under Review</p>
                  <p className="text-yellow-700">
                    Your edit request is being reviewed by our admin team. 
                    You'll receive an email notification once it's processed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {request.status === "rejected" && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-red-800">Request Rejected</p>
                  <p className="text-red-700">
                    This edit request has been rejected. Please review the admin response above 
                    and submit a new request with the required information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {request.status === "approved" && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-green-800">Request Approved</p>
                  <p className="text-green-700">
                    Your edit request has been approved and the changes have been applied to your profile.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          
          {canEdit && (
            <Button onClick={handleEditClick} className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Request
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}