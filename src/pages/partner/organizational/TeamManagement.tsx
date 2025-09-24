import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, MoreHorizontal, Edit, Save, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@venture-capital.com",
    role: "Admin",
    permissions: ["View All", "Edit All", "Team Management"],
    joinDate: "Jan 2024",
    lastActive: "2 hours ago",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@venture-capital.com", 
    role: "Evaluator",
    permissions: ["View Scholarships", "Accept/Reject Applications"],
    joinDate: "Feb 2024",
    lastActive: "1 day ago",
    status: "Active"
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@venture-capital.com",
    role: "Analyst",
    permissions: ["View Strategic Reports", "View Custom Tests"],
    joinDate: "Dec 2023",
    lastActive: "3 hours ago",
    status: "Active"
  },
  {
    id: 4,
    name: "Lisa Wang",
    email: "lisa@venture-capital.com",
    role: "Evaluator",
    permissions: ["View Applications", "View Scholarships"],
    joinDate: "Mar 2024",
    lastActive: "1 week ago",
    status: "Inactive"
  }
];

const defaultRolePermissions = {
  "Admin": {
    "View Profile": true,
    "Edit Profile": true,
    "View Team Members": true,
    "Invite & Manage Team Members": true,
    "View Scholarships": true,
    "Create & Edit Scholarships": true,
    "View Applications": true,
    "Accept/Reject Applications": true,
    "View Custom Tests": true,
    "Request Custom Tests": true,
    "View Strategic Reports": true,
    "Request Strategic Reports": true
  },
  "Evaluator": {
    "View Profile": true,
    "Edit Profile": false,
    "View Team Members": true,
    "Invite & Manage Team Members": false,
    "View Scholarships": true,
    "Create & Edit Scholarships": false,
    "View Applications": true,
    "Accept/Reject Applications": true,
    "View Custom Tests": true,
    "Request Custom Tests": false,
    "View Strategic Reports": true,
    "Request Strategic Reports": false
  },
  "Analyst": {
    "View Profile": true,
    "Edit Profile": false,
    "View Team Members": true,
    "Invite & Manage Team Members": false,
    "View Scholarships": true,
    "Create & Edit Scholarships": false,
    "View Applications": true,
    "Accept/Reject Applications": false,
    "View Custom Tests": true,
    "Request Custom Tests": false,
    "View Strategic Reports": true,
    "Request Strategic Reports": false
  }
};

const permissionCategories = {
  "Profile": ["View Profile", "Edit Profile"],
  "Team Management": ["View Team Members", "Invite & Manage Team Members"],
  "Scholarships": ["View Scholarships", "Create & Edit Scholarships", "View Applications", "Accept/Reject Applications"],
  "Custom Tests": ["View Custom Tests", "Request Custom Tests"],
  "Strategic Reports": ["View Strategic Reports", "Request Strategic Reports"]
};

export default function TeamManagement() {
  const [isEditingPermissions, setIsEditingPermissions] = useState(false);
  const [rolePermissions, setRolePermissions] = useState(defaultRolePermissions);
  const [tempRolePermissions, setTempRolePermissions] = useState(defaultRolePermissions);

  const handleEditPermissions = () => {
    setTempRolePermissions({ ...rolePermissions });
    setIsEditingPermissions(true);
  };

  const handleSavePermissions = () => {
    setRolePermissions({ ...tempRolePermissions });
    setIsEditingPermissions(false);
  };

  const handleCancelEdit = () => {
    setTempRolePermissions({ ...rolePermissions });
    setIsEditingPermissions(false);
  };

  const handlePermissionChange = (role: string, permission: string, checked: boolean) => {
    setTempRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: checked
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Invite and manage your organization's team members and their permissions.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              3 active, 1 inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Awaiting acceptance
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your organization's team members and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{member.name}</p>
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Role: {member.role}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Joined: {member.joinDate}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Last active: {member.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex flex-wrap gap-1 max-w-48">
                    {member.permissions.slice(0, 2).map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {member.permissions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.permissions.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>View Activity</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invite New Member</CardTitle>
            <CardDescription>
              Send an invitation to join your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input placeholder="colleague@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Evaluator">Evaluator</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                {isEditingPermissions ? "Customize permissions for each role" : "Overview of what each role can access"}
              </CardDescription>
            </div>
            {!isEditingPermissions ? (
              <Button variant="outline" size="sm" onClick={handleEditPermissions}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            ) : null}
          </CardHeader>
          <CardContent>
            {!isEditingPermissions ? (
              <div className="space-y-4">
                {Object.entries(rolePermissions).map(([role, permissions]) => (
                  <div key={role} className="space-y-2">
                    <h4 className="font-medium">{role}</h4>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(permissions)
                        .filter(([, enabled]) => enabled)
                        .map(([permission]) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(tempRolePermissions).map(([role, permissions]) => (
                  <div key={role} className="space-y-3">
                    <h4 className="font-medium text-sm">{role}</h4>
                    <div className="space-y-4 pl-2">
                      {Object.entries(permissionCategories).map(([category, categoryPermissions]) => (
                        <div key={category} className="space-y-2">
                          <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {category}
                          </h5>
                          <div className="space-y-2 pl-2">
                            {categoryPermissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${role}-${permission}`}
                                  checked={permissions[permission]}
                                  disabled={role === 'Admin'}
                                  onCheckedChange={(checked) => 
                                    handlePermissionChange(role, permission, checked as boolean)
                                  }
                                />
                                <label 
                                  htmlFor={`${role}-${permission}`}
                                  className={`text-sm ${role === 'Admin' ? 'text-muted-foreground' : 'cursor-pointer'}`}
                                >
                                  {permission}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button onClick={handleSavePermissions}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}