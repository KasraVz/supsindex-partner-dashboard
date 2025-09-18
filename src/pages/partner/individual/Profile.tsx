import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Briefcase, Award, ExternalLink, Eye } from "lucide-react";
import { ProfileEditRequestDialog } from "@/components/profile/ProfileEditRequestDialog";
export default function IndividualProfile() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Your partner embassy on the platform. This is how founders and organizations see you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">P</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Request Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Full Name</span>
                  </div>
                  <p className="font-medium">John Doe</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ExternalLink className="h-4 w-4" />
                    <span>Email Address</span>
                  </div>
                  <p className="font-medium">john.doe@example.com</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>Passport ID</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">ABC123456789</p>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>Verification Status</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Partner Information</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Partner Level:</p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active Partner</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since:</p>
                    <p className="font-medium">January 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Affiliations:</p>
                    <p className="font-medium">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Affiliation Codes:</p>
                    <p className="font-medium">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Candidates Referred:</p>
                    <p className="font-medium">28</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Successful Referrals:</p>
                    <p className="font-medium">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Commission Earned:</p>
                    <p className="font-medium">$2,450</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
              <CardDescription>
                Share your expertise and background with potential founders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" defaultValue="Senior Business Consultant" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Current Company</Label>
                <Input id="company" defaultValue="Innovation Partners LLC" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} defaultValue="Experienced business consultant with 15+ years in startup mentoring and venture capital. Specialized in helping early-stage companies develop scalable business models and secure funding." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Input id="expertise" defaultValue="Business Strategy, Fundraising, Product Development" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website/LinkedIn</Label>
                <Input id="website" defaultValue="https://linkedin.com/in/johnpartner" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements & Certifications</CardTitle>
              <CardDescription>
                Showcase your credentials and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Certified Business Advisor</p>
                      <p className="text-sm text-muted-foreground">Small Business Administration</p>
                    </div>
                  </div>
                  <Badge variant="outline">2023</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Top Mentor Award</p>
                      <p className="text-sm text-muted-foreground">Startup Accelerator Network</p>
                    </div>
                  </div>
                  <Badge variant="outline">2022</Badge>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" />
                  Add New Achievement
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>

      <ProfileEditRequestDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}