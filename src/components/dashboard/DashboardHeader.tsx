import { Bell, Home, Zap, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Notifications, Notification } from "./Notifications";
import { Cart } from "./Cart";
import { useOrders } from "@/contexts/OrderContext";

interface DashboardHeaderProps {
  notifications: Notification[];
  unreadNotifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onShowMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export function DashboardHeader({ 
  notifications, 
  unreadNotifications, 
  onMarkAsRead,
  onMarkAsUnread,
  onMarkAllAsRead,
  onShowMore,
  hasMore,
  isLoadingMore
}: DashboardHeaderProps) {
  const { cartItems } = useOrders();
  
  // Calculate cart count: bundles count as 1, individual items count as 1 each
  const getCartItemCount = () => {
    const bundleIds = new Set();
    let individualCount = 0;
    
    cartItems.forEach(item => {
      if (item.bundleId) {
        bundleIds.add(item.bundleId);
      } else {
        individualCount++;
      }
    });
    
    return bundleIds.size + individualCount;
  };
  
  const cartItemCount = getCartItemCount();
  
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard">
            <Home className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:block">Quick Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/dashboard/orders/new" className="w-full">
                Order New Assessment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a 
                href="https://supshub.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                SupsHub
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/reports" className="w-full">
                View Reports
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {unreadNotifications.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                  {unreadNotifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 sm:w-96 max-w-[90vw] p-0">
            <Notifications 
              notifications={notifications}
              onMarkAsRead={onMarkAsRead}
              onMarkAsUnread={onMarkAsUnread}
              onMarkAllAsRead={onMarkAllAsRead}
              onShowMore={onShowMore}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
            />
          </PopoverContent>
        </Popover>

        {/* Shopping Cart Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 sm:w-96 max-w-[90vw] p-0">
            <Cart />
          </PopoverContent>
        </Popover>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:block">John Doe</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/dashboard/support">Support</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}