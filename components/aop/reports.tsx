"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  Calendar,
  Target,
  Activity,
  Users,
  TrendingUp,
  PieChart,
} from "lucide-react"

const reportSummary = {
  totalPriorities: 4,
  totalMoS: 8,
  totalActivities: 45,
  completedActivities: 28,
  activeLeads: 12,
  avgProgress: 72,
}

const priorityBreakdown = [
  { name: "Revenue Growth", progress: 75, weight: 30, activities: 15 },
  { name: "Customer Satisfaction", progress: 85, weight: 25, activities: 12 },
  { name: "Operational Excellence", progress: 68, weight: 25, activities: 10 },
  { name: "Innovation & Development", progress: 60, weight: 20, activities: 8 },
]

const termSummary = [
  { term: "Q1 2026", status: "completed", activities: 12, completed: 12, progress: 100 },
  { term: "Q2 2026", status: "in-progress", activities: 15, completed: 10, progress: 67 },
  { term: "Q3 2026", status: "upcoming", activities: 10, completed: 4, progress: 40 },
  { term: "Q4 2026", status: "upcoming", activities: 8, completed: 2, progress: 25 },
]

export function ReportsSection() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Global Reports</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive view of AOP performance across all priorities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-foreground">{reportSummary.totalPriorities}</div>
            </div>
            <p className="text-sm text-muted-foreground">Priorities</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-info" />
              <div className="text-2xl font-bold text-foreground">{reportSummary.totalMoS}</div>
            </div>
            <p className="text-sm text-muted-foreground">Measures of Success</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-warning" />
              <div className="text-2xl font-bold text-foreground">{reportSummary.totalActivities}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold text-success">{reportSummary.completedActivities}</div>
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-foreground">{reportSummary.activeLeads}</div>
            </div>
            <p className="text-sm text-muted-foreground">Active Leads</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold text-success">{reportSummary.avgProgress}%</div>
            </div>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Priority Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Priority Performance</CardTitle>
            <CardDescription className="text-muted-foreground">
              Progress breakdown by strategic priority
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {priorityBreakdown.map((priority) => (
              <div key={priority.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{priority.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Weight: {priority.weight}%</span>
                      <span>•</span>
                      <span>{priority.activities} activities</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      priority.progress >= 75
                        ? "bg-success/10 text-success border border-success/30"
                        : priority.progress >= 50
                          ? "bg-info/10 text-info border border-info/30"
                          : "bg-warning/10 text-warning border border-warning/30"
                    }
                  >
                    {priority.progress}%
                  </Badge>
                </div>
                <Progress value={priority.progress} className="h-2 bg-secondary" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Term Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Term Summary</CardTitle>
            <CardDescription className="text-muted-foreground">
              Activity completion by term
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {termSummary.map((term) => (
              <div
                key={term.term}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{term.term}</p>
                    <Badge
                      className={
                        term.status === "completed"
                          ? "bg-success/10 text-success border border-success/30"
                          : term.status === "in-progress"
                            ? "bg-info/10 text-info border border-info/30"
                            : "bg-muted text-muted-foreground border border-muted"
                      }
                    >
                      {term.status === "in-progress"
                        ? "In Progress"
                        : term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {term.completed} of {term.activities} activities completed
                  </p>
                </div>
                <div className="w-24">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{term.progress}%</span>
                  </div>
                  <Progress value={term.progress} className="h-2 bg-secondary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Export Options */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Export Options</CardTitle>
          <CardDescription className="text-muted-foreground">
            Generate and download detailed reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-border p-4 hover:bg-secondary">
              <FileText className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Full AOP Report</p>
                <p className="text-xs text-muted-foreground">All priorities & activities</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-border p-4 hover:bg-secondary">
              <Target className="h-6 w-6 text-info" />
              <div className="text-left">
                <p className="font-medium text-foreground">Priority Report</p>
                <p className="text-xs text-muted-foreground">By strategic priority</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-border p-4 hover:bg-secondary">
              <Users className="h-6 w-6 text-warning" />
              <div className="text-left">
                <p className="font-medium text-foreground">Lead Report</p>
                <p className="text-xs text-muted-foreground">Performance by lead</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-border p-4 hover:bg-secondary">
              <Calendar className="h-6 w-6 text-success" />
              <div className="text-left">
                <p className="font-medium text-foreground">Term Report</p>
                <p className="text-xs text-muted-foreground">Activities by term</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
