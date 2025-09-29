import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, MapPin, Briefcase, Building, Globe, Calendar, Users, CheckCircle, AlertCircle, ExternalLink, Eye } from "lucide-react";
import { ProfileEditRequestDialog } from "@/components/profile/ProfileEditRequestDialog";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { ProfileEditRequests } from "@/components/profile/ProfileEditRequests";

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

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="edit-requests">Edit Requests</TabsTrigger>
          <TabsTrigger value="account-settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Organization Profile Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
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
                      <p className="font-medium">Venture Capital & Investment</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <ExternalLink className="h-4 w-4" />
                        <span>Organization Email</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">contact@techventure.com</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Business Address</span>
                      </div>
                      <p className="font-medium">123 Innovation Drive, Tech Valley, CA 94025</p>
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
                      <p className="font-medium">2015</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Team Size</span>
                      </div>
                      <p className="font-medium">50-200 employees</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Organization Statistics */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Partner Level:</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Elite Partner</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member Since:</span>
                      <span className="text-sm font-medium">March 2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Codes:</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Discounts Provided:</span>
                      <span className="text-sm font-medium">$24,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Candidates:</span>
                      <span className="text-sm font-medium">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Successful Matches:</span>
                      <span className="text-sm font-medium">89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Representative Profile Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Representative Photo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">J</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Representative Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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

                    <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)} className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Request Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Representative Professional Profile</CardTitle>
                  <CardDescription>
                    Professional information about the organization's main representative
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input id="title" defaultValue="Chief Investment Officer" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" rows={4} defaultValue="Experienced venture capitalist with 20+ years in technology investments. Led successful rounds for 50+ startups with combined valuation of $2B+. Specialized in early-stage SaaS and AI companies." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Areas of Expertise</Label>
                    <Input id="expertise" defaultValue="Venture Capital, Technology Investments, SaaS, AI/ML" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe-cio" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="edit-requests">
          <ProfileEditRequests />
        </TabsContent>

        <TabsContent value="account-settings">
          <AccountSettings />
        </TabsContent>
      </Tabs>

      <ProfileEditRequestDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
      />
    </div>
  );
}