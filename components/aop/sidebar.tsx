"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Target,
  Activity,
  Users,
  Eye,
  Bell,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  userRole: "owner" | "lead" | "supervisor"
}

const menuItems = {
  owner: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "config", label: "AOP Config", icon: Settings },
    { id: "priorities", label: "Strategic Priorities", icon: Target },
    { id: "mos", label: "Measures of Success", icon: Activity },
    { id: "activities", label: "All Activities", icon: FileText },
    { id: "plans", label: "Activity Plans", icon: FileText },
    { id: "leads", label: "Manage Leads", icon: Users },
    { id: "visibility", label: "Data Visibility", icon: Eye },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "reports", label: "Global Reports", icon: FileText },
  ],
  lead: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "my-mos", label: "My MoS", icon: Target },
    { id: "my-activities", label: "My Activities", icon: Activity },
    { id: "plans", label: "Activity Plans", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
  ],
  supervisor: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "subordinates", label: "Subordinate Progress", icon: Users },
    { id: "activities", label: "Activity Logs", icon: FileText },
    { id: "plans", label: "Activity Plans", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
  ],
}

export function Sidebar({ activeSection, onSectionChange, userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const items = menuItems[userRole]

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Target className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AOP System</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
              {userRole === "owner" ? "O" : userRole === "lead" ? "L" : "S"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {userRole === "owner" ? "Owner" : userRole === "lead" ? "Lead P1" : "Supervisor"}
              </span>
              <span className="text-xs text-muted-foreground capitalize">{userRole} Access</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
