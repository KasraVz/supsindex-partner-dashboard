import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  FileText,
  DollarSign,
  Briefcase,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/partners/individual/dashboard", icon: LayoutDashboard },
  { title: "My Founders", url: "/partners/individual/founders", icon: Users },
  { title: "Founder Reports", url: "/partners/individual/reports", icon: FileText },
  { title: "Referrals & Earnings", url: "/partners/individual/earnings", icon: DollarSign },
];

const profileItems = [
  { title: "My Profile", url: "/partners/individual/profile", icon: User },
  { title: "Partnership Opportunities", url: "/partners/individual/opportunities", icon: Briefcase },
];

export function PartnerIndividualSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar variant="sidebar" className="w-64" collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <NavLink 
            to="/partners/individual/dashboard"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/lovable-uploads/186bfc82-f0f1-42d6-b18b-8ae9cdc2a1f0.png" 
              alt="Supsindex" 
              className="h-8 w-auto"
            />
          </NavLink>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>My Profile & Growth</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}