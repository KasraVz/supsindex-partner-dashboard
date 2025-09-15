import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerIndividualSidebar } from "@/components/partner/PartnerIndividualSidebar";
import { PartnerOrganizationalSidebar } from "@/components/partner/PartnerOrganizationalSidebar";
import { PartnerHeader } from "@/components/partner/PartnerHeader";
import { usePartner } from "@/contexts/PartnerContext";
import { Notification } from "@/components/dashboard/Notifications";

// Mock notification data for partners
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Founder Application",
    message: "A new founder has applied through your affiliation link",
    read: false,
    type: "success",
    createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
  },
  {
    id: "2", 
    title: "Commission Earned",
    message: "You've earned $150 commission from a successful affiliation",
    read: false,
    type: "success",
    createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: "3",
    title: "Partnership Opportunity",
    message: "New Faculty Member position available",
    read: true,
    type: "info",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    id: "4",
    title: "Report Generated",
    message: "Monthly founder progress report is ready",
    read: true,
    type: "info",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export function PartnerLayout() {
  const { isOrganizational } = usePartner();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isOrganizational ? <PartnerOrganizationalSidebar /> : <PartnerIndividualSidebar />}
        <div className="flex-1 flex flex-col">
          <PartnerHeader 
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAsUnread={handleMarkAsUnread}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}