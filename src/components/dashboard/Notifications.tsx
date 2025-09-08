import { useState } from "react";
import { Bell, Check, Clock, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAsUnread?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onShowMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export function Notifications({
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onMarkAllAsRead,
  onShowMore,
  hasMore,
  isLoadingMore
}: NotificationsProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && onMarkAllAsRead && (
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>

      <ScrollArea className="h-80">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <div className="p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 p-3 rounded-lg border mb-2 cursor-pointer transition-colors hover:bg-accent/50",
                  !notification.read && "bg-accent/30 border-brand-orange/20"
                )}
                onClick={() => !notification.read && onMarkAsRead?.(notification.id)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      "text-sm font-medium",
                      !notification.read && "font-semibold"
                    )}>
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-brand-orange rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  
                  {notification.actionUrl && (
                    <Button variant="ghost" size="sm" className="p-0 h-auto mt-2 text-brand-orange hover:text-brand-orange-dark">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {hasMore && (
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={onShowMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Show more"}
                </Button>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}