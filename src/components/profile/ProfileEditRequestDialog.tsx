import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, FileEdit } from "lucide-react";

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

interface ProfileEditRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingRequest?: EditRequest | null;
}

const PROFILE_SECTIONS = {
  personal: "Personal Profile",
  business: "Business Profile"
};

const PROFILE_FIELDS = {
  personal: [
    { value: "fullName", label: "Full Name" },
    { value: "email", label: "Email Address" },
    { value: "passportId", label: "Passport ID" },
    { value: "profilePhoto", label: "Profile Photo" }
  ],
  business: [
    { value: "startupName", label: "Startup Name" },
    { value: "startupWebsite", label: "Startup Website" },
    { value: "primaryIndustry", label: "Primary Industry" },
    { value: "developmentStage", label: "Development Stage" },
    { value: "targetEcosystem", label: "Target Ecosystem" }
  ]
};

const MOCK_CURRENT_VALUES = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  passportId: "ABC123456789",
  profilePhoto: "Current profile photo",
  startupName: "TechFlow Solutions",
  startupWebsite: "https://www.techflowsolutions.com",
  primaryIndustry: "Software & SaaS",
  developmentStage: "Building Initial Traction/Early Customers",
  targetEcosystem: "Silicon Valley"
};

export function ProfileEditRequestDialog({ open, onOpenChange, editingRequest }: ProfileEditRequestDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileSection, setProfileSection] = useState<string>("");
  const [selectedField, setSelectedField] = useState<string>("");
  const [requestedValue, setRequestedValue] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const { toast } = useToast();

  // Pre-populate form when editing an existing request
  useEffect(() => {
    if (editingRequest) {
      // Map the profile section names to the form values
      const sectionMap: Record<string, string> = {
        "Personal Profile": "personal",
        "Business Profile": "business"
      };
      
      // Map field names to form values
      const fieldMap: Record<string, string> = {
        "Full Name": "fullName",
        "Email Address": "email",
        "Passport ID": "passportId",
        "Profile Photo": "profilePhoto",
        "Startup Name": "startupName",
        "Startup Website": "startupWebsite",
        "Primary Industry": "primaryIndustry",
        "Development Stage": "developmentStage",
        "Target Ecosystem": "targetEcosystem"
      };

      setProfileSection(sectionMap[editingRequest.profileSection] || "");
      setSelectedField(fieldMap[editingRequest.field] || "");
      setRequestedValue(editingRequest.requestedValue);
      setReason(editingRequest.reason);
      setPriority(editingRequest.priority);
    } else {
      // Reset form when not editing
      setProfileSection("");
      setSelectedField("");
      setRequestedValue("");
      setReason("");
      setPriority("");
      setUploadedFile(null);
    }
  }, [editingRequest, open]);

  const getCurrentValue = (fieldKey: string) => {
    return MOCK_CURRENT_VALUES[fieldKey as keyof typeof MOCK_CURRENT_VALUES] || "Not set";
  };

  const getAvailableFields = () => {
    if (profileSection === "personal") return PROFILE_FIELDS.personal;
    if (profileSection === "business") return PROFILE_FIELDS.business;
    return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileSection || !selectedField || !requestedValue || !reason || !priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check if file upload is required for passport ID changes
    if (selectedField === "passportId" && !uploadedFile) {
      toast({
        title: "Document Required",
        description: "Please upload your passport or ID document for verification.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: editingRequest ? "Edit Request Updated" : "Edit Request Submitted",
      description: editingRequest 
        ? "Your profile edit request has been updated successfully."
        : "Your profile edit request has been submitted for admin review. You'll be notified once it's processed.",
    });
    
    // Reset form only if not editing
    if (!editingRequest) {
      setProfileSection("");
      setSelectedField("");
      setRequestedValue("");
      setReason("");
      setPriority("");
      setUploadedFile(null);
    }
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleProfileSectionChange = (value: string) => {
    setProfileSection(value);
    setSelectedField(""); // Reset selected field when profile section changes
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileEdit className="w-5 h-5" />
            {editingRequest ? "Edit Profile Request" : "Request Profile Edit"}
          </DialogTitle>
          <DialogDescription>
            {editingRequest 
              ? "Modify your existing profile edit request. Changes will be re-submitted for admin approval."
              : "Submit a request to modify your profile information. All changes require admin approval for security purposes."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profileSection">Profile Section *</Label>
            <Select value={profileSection} onValueChange={handleProfileSectionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select profile section to edit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Profile</SelectItem>
                <SelectItem value="business">Business Profile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {profileSection && (
            <div className="space-y-2">
              <Label htmlFor="field">Field to Change *</Label>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field to edit" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableFields().map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedField && (
            <div className="space-y-2">
              <Label>Current Value</Label>
              <div className="text-sm p-3 bg-muted rounded-md text-muted-foreground">
                {getCurrentValue(selectedField)}
              </div>
            </div>
          )}

          {selectedField && (
            <div className="space-y-2">
              <Label htmlFor="requestedValue">Requested New Value *</Label>
              <Input
                id="requestedValue"
                value={requestedValue}
                onChange={(e) => setRequestedValue(e.target.value)}
                placeholder="Enter the new value you want"
              />
            </div>
          )}

          {selectedField === "passportId" && (
            <div className="space-y-2">
              <Label>Upload Passport/ID Document *</Label>
              <FileUpload 
                accept="image/*,.pdf"
                required 
                onFileSelect={setUploadedFile}
              />
              <p className="text-xs text-muted-foreground">
                Please upload a clear photo of your passport or ID card for verification purposes.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level *</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General update</SelectItem>
                <SelectItem value="medium">Medium - Important change</SelectItem>
                <SelectItem value="high">High - Urgent correction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Change *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why this change is needed..."
              rows={3}
            />
          </div>

          <div className="bg-muted/50 p-3 rounded-md flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p><strong>Review Process:</strong> All profile edit requests are manually reviewed by our admin team. 
              Typical response time is 1-3 business days. You'll receive an email notification once your request is processed.</p>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !profileSection || !selectedField || !requestedValue || !reason || !priority}
          >
            {isLoading ? "Submitting..." : editingRequest ? "Update Request" : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}