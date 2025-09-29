import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EyeOff, Eye, UserX, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AccountSettings() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [acceptedDeactivateRules, setAcceptedDeactivateRules] = useState(false);
  const [showPrivateConfirm, setShowPrivateConfirm] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState<string>("");
  const [deactivateComments, setDeactivateComments] = useState<string>("");

  const handleVisibilityChange = (checked: boolean) => {
    if (checked) {
      // Show confirmation when switching to private
      setShowPrivateConfirm(true);
    } else {
      // Allow switching back to visible without confirmation
      setIsPrivate(false);
    }
  };

  const confirmPrivateProfile = () => {
    setIsPrivate(true);
    setShowPrivateConfirm(false);
  };

  const handleDeactivateAccount = () => {
    if (acceptedDeactivateRules && deactivateReason) {
      // Handle account deactivation logic
      console.log("Account deactivation confirmed", { reason: deactivateReason, comments: deactivateComments });
      // Reset form
      setAcceptedDeactivateRules(false);
      setDeactivateReason("");
      setDeactivateComments("");
    }
  };

  const resetDeactivateForm = () => {
    setAcceptedDeactivateRules(false);
    setDeactivateReason("");
    setDeactivateComments("");
  };

  const deactivateReasons = [
    "Taking a break",
    "Privacy concerns", 
    "Found alternative platform",
    "Technical issues",
    "Too many notifications",
    "Account security concerns",
    "Other"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <h4 className="text-sm font-medium">Profile Visibility</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                {isPrivate ? "Your profile is private and hidden from other users" : "Your profile is visible to other users"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{isPrivate ? "Private" : "Visible"}</span>
              <Switch 
                checked={isPrivate}
                onCheckedChange={handleVisibilityChange}
              />
            </div>
          </div>
          
          {isPrivate && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Warning: Making your profile private will hide it from other users and may limit some platform features.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {/* Private Profile Confirmation Dialog */}
        <AlertDialog open={showPrivateConfirm} onOpenChange={setShowPrivateConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Make Profile Private?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to make your profile private? This will hide your profile from other users and may limit some platform features.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmPrivateProfile}>
                Make Private
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h4 className="text-sm font-medium">Account Deactivation</h4>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <UserX className="w-4 h-4 mr-2" />
                Deactivate Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Deactivate Your Account?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                  <p>
                    Deactivating your account will temporarily hide your profile and data. 
                    You can reactivate your account at any time by logging back in.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="deactivate-reason" className="text-sm font-medium">
                        Reason for deactivation *
                      </Label>
                      <Select value={deactivateReason} onValueChange={setDeactivateReason}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {deactivateReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {(deactivateReason === "Other" || deactivateReason) && (
                      <div>
                        <Label htmlFor="deactivate-comments" className="text-sm font-medium">
                          Additional comments {deactivateReason === "Other" ? "*" : "(optional)"}
                        </Label>
                        <Textarea
                          id="deactivate-comments"
                          placeholder={deactivateReason === "Other" ? "Please specify your reason..." : "Tell us more about your decision..."}
                          value={deactivateComments}
                          onChange={(e) => setDeactivateComments(e.target.value)}
                          className="mt-1 min-h-[80px]"
                        />
                      </div>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="deactivate-rules" 
                        checked={acceptedDeactivateRules}
                        onCheckedChange={(checked) => setAcceptedDeactivateRules(checked === true)}
                      />
                      <Label 
                        htmlFor="deactivate-rules" 
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        I have read and agree to the{" "}
                        <a 
                          href="/deactivate-account-rules" 
                          className="text-primary underline hover:no-underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Account Deactivation Policy
                        </a>
                      </Label>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={resetDeactivateForm}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-destructive text-destructive-foreground"
                  onClick={handleDeactivateAccount}
                  disabled={!acceptedDeactivateRules || !deactivateReason || (deactivateReason === "Other" && !deactivateComments.trim())}
                >
                  Deactivate Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <p className="text-xs text-muted-foreground">
            Your account will be temporarily deactivated and can be reactivated by logging in again.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}