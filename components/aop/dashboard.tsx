"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Activity, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface DashboardProps {
  userRole: "owner" | "lead" | "supervisor"
}

const mockStats = {
  owner: [
    { label: "Strategic Priorities", value: 8, icon: Target, color: "text-primary" },
    { label: "Total Activities", value: 142, icon: Activity, color: "text-info" },
    { label: "Active Leads", value: 12, icon: Users, color: "text-warning" },
    { label: "Completed", value: 67, icon: CheckCircle2, color: "text-success" },
  ],
  lead: [
    { label: "Assigned MoS", value: 5, icon: Target, color: "text-primary" },
    { label: "My Activities", value: 23, icon: Activity, color: "text-info" },
    { label: "Pending Review", value: 4, icon: Clock, color: "text-warning" },
    { label: "Completed", value: 12, icon: CheckCircle2, color: "text-success" },
  ],
  supervisor: [
    { label: "Subordinates", value: 6, icon: Users, color: "text-primary" },
    { label: "Activities Tracked", value: 89, icon: Activity, color: "text-info" },
    { label: "Needs Attention", value: 7, icon: AlertCircle, color: "text-destructive" },
    { label: "On Track", value: 76, icon: CheckCircle2, color: "text-success" },
  ],
}

const termProgress = [
  { term: "Q1 2026", progress: 100, status: "completed" },
  { term: "Q2 2026", progress: 75, status: "in-progress" },
  { term: "Q3 2026", progress: 25, status: "in-progress" },
  { term: "Q4 2026", progress: 0, status: "upcoming" },
]

const recentActivities = [
  { id: 1, title: "Revenue Growth Initiative", lead: "P1", status: "in-progress", term: "Q2 2026" },
  { id: 2, title: "Customer Retention Program", lead: "P2", status: "review", term: "Q2 2026" },
  { id: 3, title: "Product Launch Campaign", lead: "P1", status: "completed", term: "Q1 2026" },
  { id: 4, title: "Team Expansion Plan", lead: "P3", status: "in-progress", term: "Q2 2026" },
  { id: 5, title: "Technology Upgrade", lead: "P2", status: "upcoming", term: "Q3 2026" },
]

export function Dashboard({ userRole }: DashboardProps) {
  const stats = mockStats[userRole]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {userRole === "owner"
            ? "Overview of all strategic priorities and activities"
            : userRole === "lead"
              ? "Track your assigned measures of success and activities"
              : "Monitor subordinate progress and activities"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Term Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Term Progress</CardTitle>
            <CardDescription className="text-muted-foreground">
              AOP progress across defined terms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {termProgress.map((term) => (
              <div key={term.term} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{term.term}</span>
                  <Badge
                    variant={
                      term.status === "completed"
                        ? "default"
                        : term.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      term.status === "completed"
                        ? "bg-success text-success-foreground"
                        : term.status === "in-progress"
                          ? "bg-info text-info-foreground"
                          : "border-muted text-muted-foreground"
                    }
                  >
                    {term.status === "completed"
                      ? "Completed"
                      : term.status === "in-progress"
                        ? "In Progress"
                        : "Upcoming"}
                  </Badge>
                </div>
                <Progress value={term.progress} className="h-2 bg-secondary" />
                <span className="text-xs text-muted-foreground">{term.progress}% complete</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activities</CardTitle>
            <CardDescription className="text-muted-foreground">
              Latest activity updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Lead: {activity.lead}</span>
                      <span>•</span>
                      <span>{activity.term}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      activity.status === "completed"
                        ? "border-success text-success"
                        : activity.status === "in-progress"
                          ? "border-info text-info"
                          : activity.status === "review"
                            ? "border-warning text-warning"
                            : "border-muted text-muted-foreground"
                    }
                  >
                    {activity.status === "in-progress"
                      ? "In Progress"
                      : activity.status === "review"
                        ? "Review"
                        : activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
