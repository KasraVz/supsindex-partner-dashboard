import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
  CreditCard,
  GraduationCap,
  HelpCircle,
  Zap,
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
  { title: "Dashboard", url: "/individual/dashboard", icon: LayoutDashboard },
  { title: "Fast Track", url: "/individual/fast-track", icon: Zap },
];

const affiliationAnalyticsItems = [
  { title: "Affiliated Candidates", url: "/individual/candidates", icon: Users },
  { title: "Affiliations & Earnings", url: "/individual/earnings", icon: TrendingUp },
  { title: "Money Claims", url: "/individual/claims", icon: CreditCard },
];

const scholarshipItems = [
  { title: "My Scholarships", url: "/individual/scholarships", icon: GraduationCap },
];

const profileItems = [
  { title: "My Profile", url: "/individual/profile", icon: User },
  { title: "Partnership Opportunities", url: "/individual/opportunities", icon: Briefcase },
];

const supportItems = [
  { title: "Support Center", url: "/individual/support", icon: HelpCircle },
];

export function PartnerIndividualSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar variant="sidebar" className="w-64" collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <NavLink 
            to="/individual/dashboard"
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
          <SidebarGroupLabel>Affiliation Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {affiliationAnalyticsItems.map((item) => (
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
          <SidebarGroupLabel>Scholarship Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {scholarshipItems.map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel>Support & Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
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