import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerIndividualSidebar } from "@/components/partner/PartnerIndividualSidebar";
import { PartnerOrganizationalSidebar } from "@/components/partner/PartnerOrganizationalSidebar";
import { PartnerHeader } from "@/components/partner/PartnerHeader";
import { usePartner } from "@/contexts/PartnerContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  isRead: boolean;
  type: "info" | "warning" | "success" | "error";
  createdAt: string;
}

// Mock notification data for partners
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Founder Application",
    message: "A new founder has applied through your referral link",
    time: "2 minutes ago",
    read: false,
    isRead: false,
    type: "success",
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2", 
    title: "Commission Earned",
    message: "You've earned $150 commission from a successful referral",
    time: "1 hour ago",
    read: false,
    isRead: false,
    type: "success",
    createdAt: "2024-03-15T09:00:00Z"
  },
  {
    id: "3",
    title: "Partnership Opportunity",
    message: "New Faculty Member position available",
    time: "3 hours ago",
    read: true,
    isRead: true,
    type: "info",
    createdAt: "2024-03-15T07:00:00Z"
  },
  {
    id: "4",
    title: "Report Generated",
    message: "Monthly founder progress report is ready",
    time: "1 day ago",
    read: true,
    isRead: true,
    type: "info",
    createdAt: "2024-03-14T10:00:00Z"
  }
];

export function PartnerLayout() {
  const { isOrganizational } = usePartner();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadNotifications = notifications.filter(n => !n.isRead);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
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