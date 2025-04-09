
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Users",
      icon: Users,
      path: "/dashboard/users",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar flex flex-col h-screen border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div
          className={cn(
            "text-sidebar-foreground font-semibold flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && <span>Boilerplate</span>}
          {isCollapsed && <LayoutDashboard className="h-6 w-6" />}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed && "absolute right-0 top-5 transform translate-x-1/2 h-6 w-6"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={cn(
              "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground",
              isCollapsed && "justify-center"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
            {!isCollapsed && <span>{item.title}</span>}
          </Button>
        ))}
      </nav>

      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
