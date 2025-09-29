import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  currentPosition: z.string().min(2, "Please enter your current position"),
  company: z.string().min(2, "Please enter your company/organization"),
  yearsExperience: z.string().min(1, "Please select your years of experience"),
  expertise: z.string().min(1, "Please select your area of expertise"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  availability: z.string().min(1, "Please select your availability"),
  additionalComments: z.string().optional()
});

type ApplicationForm = z.infer<typeof applicationSchema>;

interface PartnershipApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityTitle: string;
  opportunityType: string;
}

const expertiseAreas = [
  "Business Strategy",
  "Leadership & Management", 
  "Entrepreneurship",
  "Marketing & Sales",
  "Finance & Investment",
  "Technology & Innovation",
  "Operations Management",
  "Human Resources",
  "Strategic Planning",
  "Product Development",
  "Digital Transformation",
  "Other"
];

const availabilityOptions = [
  "5-10 hours per week",
  "10-15 hours per week", 
  "15-20 hours per week",
  "20-25 hours per week",
  "25+ hours per week",
  "Flexible based on project"
];

const experienceYears = [
  "1-2 years",
  "3-5 years",
  "5-10 years", 
  "10-15 years",
  "15+ years"
];

export function PartnershipApplicationDialog({ open, onOpenChange, opportunityTitle, opportunityType }: PartnershipApplicationDialogProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema)
  });

  const watchedValues = watch();

  const onSubmit = async (data: ApplicationForm) => {
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to complete the application.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Application Submitted",
      description: `Your application for ${opportunityTitle} has been submitted successfully. We'll review it and get back to you within 5-7 business days.`
    });
    
    reset();
    setResumeFile(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    reset();
    setResumeFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {opportunityTitle}</DialogTitle>
          <DialogDescription>
            Complete this application to apply for the {opportunityType} position. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value="john.doe@example.com"
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This application is linked to your account
              </p>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="currentPosition">Current Position/Title *</Label>
              <Input
                id="currentPosition"
                {...register("currentPosition")}
                placeholder="e.g., Senior Product Manager"
              />
              {errors.currentPosition && (
                <p className="text-sm text-destructive mt-1">{errors.currentPosition.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company">Company/Organization *</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="e.g., Tech Startup Inc."
              />
              {errors.company && (
                <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="yearsExperience">Years of Experience *</Label>
              <Select onValueChange={(value) => setValue("yearsExperience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceYears.map((years) => (
                    <SelectItem key={years} value={years}>
                      {years}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.yearsExperience && (
                <p className="text-sm text-destructive mt-1">{errors.yearsExperience.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="expertise">Area of Expertise *</Label>
              <Select onValueChange={(value) => setValue("expertise", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your expertise" />
                </SelectTrigger>
                <SelectContent>
                  {expertiseAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expertise && (
                <p className="text-sm text-destructive mt-1">{errors.expertise.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="availability">Availability *</Label>
              <Select onValueChange={(value) => setValue("availability", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.availability && (
                <p className="text-sm text-destructive mt-1">{errors.availability.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
            <Input
              id="linkedinUrl"
              {...register("linkedinUrl")}
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
            {errors.linkedinUrl && (
              <p className="text-sm text-destructive mt-1">{errors.linkedinUrl.message}</p>
            )}
          </div>

          <div>
            <Label>Resume/CV Upload *</Label>
            <FileUpload
              accept=".pdf,.doc,.docx"
              onFileSelect={setResumeFile}
              className="mt-2"
            />
            {resumeFile && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {resumeFile.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="coverLetter">Cover Letter/Motivation *</Label>
            <Textarea
              id="coverLetter"
              {...register("coverLetter")}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              className="min-h-[120px]"
            />
            {errors.coverLetter && (
              <p className="text-sm text-destructive mt-1">{errors.coverLetter.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="additionalComments">Additional Comments</Label>
            <Textarea
              id="additionalComments"
              {...register("additionalComments")}
              placeholder="Any additional information you'd like to share..."
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}