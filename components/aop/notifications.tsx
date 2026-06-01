"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Check, Clock, AlertCircle, Settings, Trash2 } from "lucide-react"

interface Notification {
  id: string
  type: "reminder" | "alert" | "info" | "success"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "alert",
    title: "Review Required",
    message: "Q2 Customer Satisfaction activities require your review before term end.",
    timestamp: "2026-05-14T10:30:00",
    read: false,
    actionUrl: "/activities",
  },
  {
    id: "notif-2",
    type: "reminder",
    title: "Term Ending Soon",
    message: "Q2 2026 term ends in 45 days. Ensure all activities are on track.",
    timestamp: "2026-05-13T14:00:00",
    read: false,
  },
  {
    id: "notif-3",
    type: "success",
    title: "Activity Completed",
    message: "Q1 Sales Campaign has been marked as completed by John D.",
    timestamp: "2026-05-12T09:15:00",
    read: true,
  },
  {
    id: "notif-4",
    type: "info",
    title: "New Lead Assigned",
    message: "Lisa K. has been assigned to Operational Excellence priority.",
    timestamp: "2026-05-11T16:45:00",
    read: true,
  },
  {
    id: "notif-5",
    type: "reminder",
    title: "Weekly Progress Update",
    message: "Time to submit your weekly progress update for assigned activities.",
    timestamp: "2026-05-10T08:00:00",
    read: true,
  },
  {
    id: "notif-6",
    type: "alert",
    title: "Activity Overdue",
    message: "Process Automation Phase 1 is overdue for review submission.",
    timestamp: "2026-05-09T11:30:00",
    read: true,
  },
]

export function NotificationsSection() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case "reminder":
        return <Clock className="h-5 w-5 text-warning" />
      case "success":
        return <Check className="h-5 w-5 text-success" />
      default:
        return <Bell className="h-5 w-5 text-info" />
    }
  }

  const getNotificationBadge = (type: Notification["type"]) => {
    const styles = {
      alert: "bg-destructive/10 text-destructive border-destructive/30",
      reminder: "bg-warning/10 text-warning border-warning/30",
      success: "bg-success/10 text-success border-success/30",
      info: "bg-info/10 text-info border-info/30",
    }
    return styles[type]
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Stay updated with alerts and reminders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="border-border text-foreground hover:bg-secondary"
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
          <Button variant="outline" size="icon" className="border-border text-foreground hover:bg-secondary">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-foreground">{notifications.length}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Notifications</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div className="text-2xl font-bold text-destructive">{unreadCount}</div>
            </div>
            <p className="text-sm text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div className="text-2xl font-bold text-warning">
                {notifications.filter((n) => n.type === "reminder").length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Reminders</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold text-success">
                {notifications.filter((n) => n.type === "success").length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Notifications</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your latest alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                  notification.read
                    ? "border-border bg-secondary/30"
                    : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{notification.title}</p>
                    <Badge variant="outline" className={getNotificationBadge(notification.type)}>
                      {notification.type}
                    </Badge>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteNotification(notification.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
