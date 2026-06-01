"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { NewActivityDialog } from "@/components/aop/create-dialogs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Edit2, Trash2, Search, Filter, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react"

interface Activity {
  id: string
  title: string
  description: string
  priority: string
  mos: string
  assignedPersons: string[]
  term: string
  status: "completed" | "in-progress" | "review" | "upcoming"
  reviewFlag: boolean
  remarks: string
  lastUpdated: string
}

const mockActivities: Activity[] = [
  {
    id: "act-1",
    title: "Q1 Sales Campaign",
    description: "Launch targeted sales campaign for enterprise clients",
    priority: "Revenue Growth",
    mos: "Annual Revenue",
    assignedPersons: ["John D.", "Sarah M."],
    term: "Q1 2026",
    status: "completed",
    reviewFlag: true,
    remarks: "Successfully exceeded target by 15%",
    lastUpdated: "2026-03-28",
  },
  {
    id: "act-2",
    title: "Customer Feedback Integration",
    description: "Implement automated customer feedback collection system",
    priority: "Customer Satisfaction",
    mos: "NPS Score",
    assignedPersons: ["Mike R."],
    term: "Q2 2026",
    status: "in-progress",
    reviewFlag: false,
    remarks: "Integration 60% complete",
    lastUpdated: "2026-05-10",
  },
  {
    id: "act-3",
    title: "Process Automation Phase 1",
    description: "Automate manual workflows in operations department",
    priority: "Operational Excellence",
    mos: "Process Efficiency",
    assignedPersons: ["Lisa K.", "Tom W.", "Amy S."],
    term: "Q2 2026",
    status: "review",
    reviewFlag: true,
    remarks: "Pending manager review",
    lastUpdated: "2026-05-08",
  },
  {
    id: "act-4",
    title: "New Feature Development",
    description: "Develop and launch 3 new product features",
    priority: "Innovation & Development",
    mos: "New Features Released",
    assignedPersons: ["David L."],
    term: "Q2 2026",
    status: "in-progress",
    reviewFlag: false,
    remarks: "2 features completed, 1 in development",
    lastUpdated: "2026-05-12",
  },
  {
    id: "act-5",
    title: "Cost Optimization Review",
    description: "Comprehensive review of operational costs and optimization opportunities",
    priority: "Operational Excellence",
    mos: "Cost Reduction",
    assignedPersons: ["Robert P.", "Jennifer H."],
    term: "Q3 2026",
    status: "upcoming",
    reviewFlag: false,
    remarks: "",
    lastUpdated: "2026-04-15",
  },
]

interface ActivitiesSectionProps {
  userRole: "owner" | "lead" | "supervisor"
  viewType: "all" | "my"
}

export function ActivitiesSection({ userRole, viewType }: ActivitiesSectionProps) {
  const [activities] = useState(mockActivities)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.mos.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-info" />
      case "review":
        return <AlertCircle className="h-4 w-4 text-warning" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: Activity["status"]) => {
    const styles = {
      completed: "bg-success/10 text-success border-success/30",
      "in-progress": "bg-info/10 text-info border-info/30",
      review: "bg-warning/10 text-warning border-warning/30",
      upcoming: "bg-muted text-muted-foreground border-muted",
    }
    return styles[status]
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {viewType === "all" ? "All Activities" : "My Activities"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {viewType === "all"
              ? "View and manage all AOP activities across the organization"
              : "Manage your assigned activities and track progress"}
          </p>
        </div>
        {(userRole === "owner" || userRole === "lead") && (
          <NewActivityDialog>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </NewActivityDialog>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold text-foreground">{activities.length}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold text-success">
                {activities.filter((a) => a.status === "completed").length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-info" />
              <div className="text-2xl font-bold text-info">
                {activities.filter((a) => a.status === "in-progress").length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div className="text-2xl font-bold text-warning">
                {activities.filter((a) => a.reviewFlag).length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary pl-9 border-border text-foreground"
              />
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Activity</TableHead>
                  <TableHead className="text-muted-foreground">Priority / MoS</TableHead>
                  <TableHead className="text-muted-foreground">Assigned</TableHead>
                  <TableHead className="text-muted-foreground">Term</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Review</TableHead>
                  {(userRole === "owner" || userRole === "lead") && (
                    <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {activity.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">{activity.priority}</p>
                        <p className="text-xs text-muted-foreground">{activity.mos}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {activity.assignedPersons.map((person) => (
                          <Badge
                            key={person}
                            variant="outline"
                            className="text-xs border-border text-muted-foreground"
                          >
                            {person}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{activity.term}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(activity.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(activity.status)}
                          {activity.status === "in-progress"
                            ? "In Progress"
                            : activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {activity.reviewFlag ? (
                        <Badge className="bg-warning/10 text-warning border border-warning/30">
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-muted text-muted-foreground">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    {(userRole === "owner" || userRole === "lead") && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
