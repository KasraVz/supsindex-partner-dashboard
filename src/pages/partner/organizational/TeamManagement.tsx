import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { UserPlus, Mail, MoreHorizontal, Edit, Save, X, Activity, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialTeamMembers = [
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

const mockActivityData = {
  1: [
    { date: "2024-01-15", action: "Created new scholarship program 'FinTech Founders 2024'" },
    { date: "2024-01-14", action: "Approved application from TechCorp Solutions" },
    { date: "2024-01-13", action: "Updated team permissions for Evaluator role" }
  ],
  2: [
    { date: "2024-01-15", action: "Reviewed application for NextGen AI" },
    { date: "2024-01-14", action: "Accepted founder application from Jane Smith" },
    { date: "2024-01-13", action: "Rejected application from StartupX due to incomplete assessment" }
  ],
  3: [
    { date: "2024-01-15", action: "Generated strategic report for Q1 2024" },
    { date: "2024-01-14", action: "Analyzed founder assessment data" },
    { date: "2024-01-13", action: "Requested custom test for blockchain assessment" }
  ],
  4: [
    { date: "2024-01-10", action: "Reviewed applications batch #47" },
    { date: "2024-01-09", action: "Updated founder evaluation criteria" },
    { date: "2024-01-08", action: "Logged in to review pending applications" }
  ]
};

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
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  
  // Form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  
  // Modal states
  const [isEditingPermissions, setIsEditingPermissions] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [viewingActivity, setViewingActivity] = useState(null);
  const [removingMember, setRemovingMember] = useState(null);
  
  // Permissions state
  const [rolePermissions, setRolePermissions] = useState(defaultRolePermissions);
  const [tempRolePermissions, setTempRolePermissions] = useState(defaultRolePermissions);
  const [memberPermissions, setMemberPermissions] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInviteMember = () => {
    if (!validateEmail(inviteEmail) || !inviteRole) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid email address and select a role.",
        variant: "destructive",
      });
      return;
    }

    const newMember = {
      id: Math.max(...teamMembers.map(m => m.id)) + 1,
      name: inviteEmail.split('@')[0].replace(/[._]/g, ' ').split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      email: inviteEmail,
      role: inviteRole,
      permissions: Object.entries(defaultRolePermissions[inviteRole])
        .filter(([, enabled]) => enabled)
        .map(([permission]) => permission),
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      lastActive: "Never",
      status: "Pending Invite"
    };

    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail("");
    setInviteRole("");
    
    toast({
      title: "Invitation Sent",
      description: `Successfully sent invitation to ${inviteEmail}`,
    });
  };

  const handleEditPermissions = () => {
    setTempRolePermissions({ ...rolePermissions });
    setIsEditingPermissions(true);
  };

  const handleSavePermissions = () => {
    setRolePermissions({ ...tempRolePermissions });
    setIsEditingPermissions(false);
    toast({
      title: "Permissions Updated",
      description: "Role permissions have been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setTempRolePermissions({ ...rolePermissions });
    setIsEditingPermissions(false);
  };

  const handlePermissionChange = (role, permission, checked) => {
    setTempRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: checked
      }
    }));
  };

  const handleEditMember = (member) => {
    setEditingMember({
      ...member,
      tempRole: member.role,
      tempPermissions: { ...defaultRolePermissions[member.role] }
    });
  };

  const handleSaveMemberEdit = () => {
    setTeamMembers(prev => prev.map(member => 
      member.id === editingMember.id 
        ? {
            ...member,
            role: editingMember.tempRole,
            permissions: Object.entries(editingMember.tempPermissions)
              .filter(([, enabled]) => enabled)
              .map(([permission]) => permission)
          }
        : member
    ));
    
    setEditingMember(null);
    toast({
      title: "Member Updated",
      description: `Successfully updated ${editingMember.name}'s role and permissions.`,
    });
  };

  const handleMemberPermissionChange = (permission, checked) => {
    setEditingMember(prev => ({
      ...prev,
      tempPermissions: {
        ...prev.tempPermissions,
        [permission]: checked
      }
    }));
  };

  const handleRemoveMember = () => {
    setTeamMembers(prev => prev.filter(member => member.id !== removingMember.id));
    toast({
      title: "Member Removed",
      description: `Successfully removed ${removingMember.name} from the team.`,
    });
    setRemovingMember(null);
  };

  const getActiveMembers = () => teamMembers.filter(member => member.status === 'Active').length;
  const getPendingInvites = () => teamMembers.filter(member => member.status === 'Pending Invite').length;

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
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {getActiveMembers()} active, {teamMembers.length - getActiveMembers()} inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingInvites()}</div>
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
                      <Badge variant={
                        member.status === 'Active' ? 'default' : 
                        member.status === 'Pending Invite' ? 'secondary' : 'outline'
                      }>
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
                      <DropdownMenuItem onClick={() => handleEditMember(member)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setViewingActivity(member)}>
                        <Activity className="mr-2 h-4 w-4" />
                        View Activity
                      </DropdownMenuItem>
                      {member.role !== 'Admin' && (
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => setRemovingMember(member)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Member
                        </DropdownMenuItem>
                      )}
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
              <Input 
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
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
            <Button 
              className="w-full" 
              onClick={handleInviteMember}
              disabled={!validateEmail(inviteEmail) || !inviteRole}
            >
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
                                    handlePermissionChange(role, permission, checked)
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

      {/* Edit Member Modal */}
      <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Modify {editingMember?.name}'s role and permissions
            </DialogDescription>
          </DialogHeader>
          
          {editingMember && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {editingMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{editingMember.name}</p>
                  <p className="text-sm text-muted-foreground">{editingMember.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select 
                  value={editingMember.tempRole} 
                  onValueChange={(value) => setEditingMember(prev => ({ 
                    ...prev, 
                    tempRole: value,
                    tempPermissions: { ...defaultRolePermissions[value] }
                  }))}
                  disabled={editingMember.role === 'Admin'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Evaluator">Evaluator</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Permissions</h4>
                {Object.entries(permissionCategories).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-2">
                    <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {category}
                    </h5>
                    <div className="space-y-2 pl-2">
                      {categoryPermissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-${permission}`}
                            checked={editingMember.tempPermissions[permission]}
                            onCheckedChange={(checked) => 
                              handleMemberPermissionChange(permission, checked)
                            }
                          />
                          <label 
                            htmlFor={`edit-${permission}`}
                            className="text-sm cursor-pointer"
                          >
                            {permission}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setEditingMember(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveMemberEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Activity Modal */}
      <Dialog open={!!viewingActivity} onOpenChange={() => setViewingActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Log</DialogTitle>
            <DialogDescription>
              Recent activity for {viewingActivity?.name}
            </DialogDescription>
          </DialogHeader>
          
          {viewingActivity && (
            <div className="space-y-4">
              {mockActivityData[viewingActivity.id]?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove Member Confirmation */}
      <AlertDialog open={!!removingMember} onOpenChange={() => setRemovingMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {removingMember?.name} from your team? 
              This action cannot be undone and they will lose access to all organizational resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemoveMember}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}