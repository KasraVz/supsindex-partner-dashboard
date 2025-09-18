import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Briefcase, Building, Globe, Calendar, Users, CheckCircle, AlertCircle, ExternalLink, Eye } from "lucide-react";
import { ProfileEditRequestDialog } from "@/components/profile/ProfileEditRequestDialog";

export default function OrganizationalProfile() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
        <p className="text-muted-foreground">
          Manage your organization's profile and representative information.
        </p>
      </div>

      {/* Organization Profile Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Organization Profile</CardTitle>
            <CardDescription>Primary organization information displayed to partners</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Request Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>Organization Name</span>
              </div>
              <p className="font-medium">TechVenture Solutions Inc.</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>Industry</span>
              </div>
              <p className="font-medium">Technology Consulting</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <span>Organization Email</span>
              </div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">contact@techventure.com</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>Registration Number</span>
              </div>
              <p className="font-medium">REG-2019-1234567</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Address</span>
              </div>
              <p className="font-medium">123 Innovation Drive, Tech City, TC 12345</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>Website</span>
              </div>
              <p className="font-medium">www.techventure.com</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Founded</span>
              </div>
              <p className="font-medium">2019</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Number of Employees</span>
              </div>
              <p className="font-medium">50-100</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="org-description">Organization Description</Label>
            <Textarea 
              id="org-description" 
              rows={3} 
              defaultValue="Leading technology consulting firm specializing in digital transformation and innovative solutions for enterprises and startups." 
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Representative Profile Section */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Representative Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Organization Statistics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Organization Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Partner Level:</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active Partner</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since:</span>
                  <span className="text-sm font-medium">January 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Active Codes:</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Discount Provided:</span>
                  <span className="text-sm font-medium">$12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Candidates Referred:</span>
                  <span className="text-sm font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Successful Referrals:</span>
                  <span className="text-sm font-medium">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team Members:</span>
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Representative Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Representative Information</CardTitle>
                <CardDescription>Profile of the person registered on behalf of the organization</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
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
                  <p className="font-medium">john.doe@techventure.com</p>
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
                    <CheckCircle className="h-4 w-4" />
                    <span>Verification Status</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Representative Professional Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Representative Professional Profile</CardTitle>
              <CardDescription>
                Professional background of the organization representative
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" defaultValue="Chief Partnership Officer" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4} 
                  defaultValue="Experienced partnership executive with 12+ years in technology consulting and business development. Specialized in strategic partnerships and organizational growth initiatives." 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Input id="expertise" defaultValue="Strategic Partnerships, Business Development, Technology Consulting" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe-cpo" />
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