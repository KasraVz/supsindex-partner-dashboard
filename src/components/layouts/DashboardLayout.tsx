import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Notification } from "@/components/dashboard/Notifications";

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Assessment Completed",
    message: "Your Software Engineering assessment has been completed successfully.",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    actionUrl: "/dashboard/exams/history"
  },
  {
    id: "2",
    title: "New Course Available",
    message: "Advanced React Development course is now available for enrollment.",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    actionUrl: "/dashboard/courses"
  },
  {
    id: "3",
    title: "Payment Processed",
    message: "Your payment for Premium Assessment Bundle has been processed.",
    type: "success",
    read: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "4",
    title: "Deadline Reminder",
    message: "Your Database Design assessment is due in 2 days.",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  }
];

export function DashboardLayout() {
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
      <div className="min-h-screen flex w-full bg-dashboard-bg">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader
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