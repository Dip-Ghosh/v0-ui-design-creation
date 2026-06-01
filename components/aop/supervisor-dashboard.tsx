"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Activity, CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"

interface Subordinate {
  id: string
  name: string
  role: string
  activitiesTotal: number
  activitiesCompleted: number
  activitiesInProgress: number
  activitiesOverdue: number
  lastActivity: string
}

const mockSubordinates: Subordinate[] = [
  {
    id: "sub-1",
    name: "John Davidson",
    role: "Lead P1",
    activitiesTotal: 15,
    activitiesCompleted: 10,
    activitiesInProgress: 4,
    activitiesOverdue: 1,
    lastActivity: "2026-05-14T09:30:00",
  },
  {
    id: "sub-2",
    name: "Sarah Mitchell",
    role: "Lead P2",
    activitiesTotal: 12,
    activitiesCompleted: 8,
    activitiesInProgress: 4,
    activitiesOverdue: 0,
    lastActivity: "2026-05-14T11:15:00",
  },
  {
    id: "sub-3",
    name: "Michael Roberts",
    role: "Lead P3",
    activitiesTotal: 8,
    activitiesCompleted: 5,
    activitiesInProgress: 2,
    activitiesOverdue: 1,
    lastActivity: "2026-05-13T16:45:00",
  },
  {
    id: "sub-4",
    name: "Lisa Kim",
    role: "Lead P4",
    activitiesTotal: 10,
    activitiesCompleted: 7,
    activitiesInProgress: 3,
    activitiesOverdue: 0,
    lastActivity: "2026-05-14T08:00:00",
  },
]

export function SupervisorDashboard() {
  const totalActivities = mockSubordinates.reduce((sum, s) => sum + s.activitiesTotal, 0)
  const completedActivities = mockSubordinates.reduce((sum, s) => sum + s.activitiesCompleted, 0)
  const inProgressActivities = mockSubordinates.reduce((sum, s) => sum + s.activitiesInProgress, 0)
  const overdueActivities = mockSubordinates.reduce((sum, s) => sum + s.activitiesOverdue, 0)

  const formatLastActivity = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Supervisor Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor subordinate progress and activity status
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-foreground">{mockSubordinates.length}</div>
            </div>
            <p className="text-sm text-muted-foreground">Subordinates</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold text-success">{completedActivities}</div>
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-info" />
              <div className="text-2xl font-bold text-info">{inProgressActivities}</div>
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div className="text-2xl font-bold text-destructive">{overdueActivities}</div>
            </div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Overall Progress</CardTitle>
          <CardDescription className="text-muted-foreground">
            Aggregate progress across all subordinates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {completedActivities} of {totalActivities} activities completed
                </span>
                <span className="font-medium text-foreground">
                  {Math.round((completedActivities / totalActivities) * 100)}%
                </span>
              </div>
              <Progress
                value={(completedActivities / totalActivities) * 100}
                className="h-3 bg-secondary"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">{completedActivities}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-info" />
                  <span className="text-sm text-muted-foreground">In Progress</span>
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">{inProgressActivities}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">Overdue</span>
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">{overdueActivities}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subordinates List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Subordinate Progress</CardTitle>
          <CardDescription className="text-muted-foreground">
            Individual progress tracking for each team member
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSubordinates.map((subordinate) => (
              <div
                key={subordinate.id}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-secondary">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {subordinate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{subordinate.name}</p>
                    <p className="text-sm text-muted-foreground">{subordinate.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="w-48 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {subordinate.activitiesCompleted}/{subordinate.activitiesTotal}
                      </span>
                      <span className="text-foreground">
                        {Math.round(
                          (subordinate.activitiesCompleted / subordinate.activitiesTotal) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (subordinate.activitiesCompleted / subordinate.activitiesTotal) * 100
                      }
                      className="h-2 bg-secondary"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-success/10 text-success border border-success/30">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {subordinate.activitiesCompleted}
                      </Badge>
                      <Badge className="bg-info/10 text-info border border-info/30">
                        <Clock className="mr-1 h-3 w-3" />
                        {subordinate.activitiesInProgress}
                      </Badge>
                      {subordinate.activitiesOverdue > 0 && (
                        <Badge className="bg-destructive/10 text-destructive border border-destructive/30">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          {subordinate.activitiesOverdue}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Last activity</p>
                    <p className="text-sm text-foreground">
                      {formatLastActivity(subordinate.lastActivity)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
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
