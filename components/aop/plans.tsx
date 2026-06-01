"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Columns3,
  DollarSign,
  FileText,
  ListFilter,
  Plus,
  Search,
  Table2,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NewActivityPlanDialog } from "@/components/aop/create-dialogs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  activityPlans,
  getMeasureName,
  getPriorityName,
  strategicPriorities,
  type ActivityPlan,
  type ActivityPlanStatus,
  type RiskLevel,
} from "@/lib/aop-data"
import { cn } from "@/lib/utils"

interface PlansSectionProps {
  userRole: "owner" | "lead" | "supervisor"
  viewType: "all" | "my"
}

type ViewMode = "board" | "table"

const statusOrder: ActivityPlanStatus[] = ["in-progress", "review", "blocked", "upcoming", "completed"]

const statusLabels: Record<ActivityPlanStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  review: "Review",
  upcoming: "Upcoming",
  blocked: "Blocked",
}

const statusStyles: Record<ActivityPlanStatus, string> = {
  completed: "border-success/30 bg-success/10 text-success",
  "in-progress": "border-info/30 bg-info/10 text-info",
  review: "border-warning/40 bg-warning/10 text-warning",
  upcoming: "border-border bg-secondary text-muted-foreground",
  blocked: "border-destructive/30 bg-destructive/10 text-destructive",
}

const riskStyles: Record<RiskLevel, string> = {
  low: "border-success/30 bg-success/10 text-success",
  medium: "border-warning/40 bg-warning/10 text-warning",
  high: "border-destructive/30 bg-destructive/10 text-destructive",
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatShortDate(date: string) {
  const [year, month, day] = date.split("-")
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`
}

function planMatchesQuery(plan: ActivityPlan, query: string) {
  if (!query) {
    return true
  }

  return [
    plan.title,
    plan.description,
    plan.owner,
    plan.term,
    getPriorityName(plan.priorityId),
    getMeasureName(plan.measureId),
    plan.collaborators.join(" "),
  ]
    .join(" ")
    .toLowerCase()
    .includes(query)
}

export function PlansSection({ userRole, viewType }: PlansSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<ViewMode>("board")
  const [selectedPlanId, setSelectedPlanId] = useState(activityPlans[0]?.id ?? "")

  const visiblePlans = viewType === "my"
    ? activityPlans.filter((plan) => plan.owner === "John D." || plan.collaborators.includes("P1"))
    : activityPlans

  const filteredPlans = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return visiblePlans.filter((plan) => {
      const matchesPriority = priorityFilter === "all" || plan.priorityId === priorityFilter
      const matchesStatus = statusFilter === "all" || plan.status === statusFilter

      return matchesPriority && matchesStatus && planMatchesQuery(plan, query)
    })
  }, [priorityFilter, searchQuery, statusFilter, visiblePlans])

  const selectedPlan =
    activityPlans.find((plan) => plan.id === selectedPlanId)
    ?? filteredPlans[0]
    ?? activityPlans[0]
  const activePlans = visiblePlans.filter((plan) =>
    ["in-progress", "review", "blocked"].includes(plan.status),
  ).length
  const highRiskPlans = visiblePlans.filter((plan) => plan.risk === "high" || plan.status === "blocked").length
  const completedPlans = visiblePlans.filter((plan) => plan.status === "completed").length
  const reviewPlans = visiblePlans.filter((plan) => plan.reviewRequired).length

  const plansByStatus = statusOrder.map((status) => ({
    status,
    plans: filteredPlans.filter((plan) => plan.status === status),
  }))

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-foreground">
            {viewType === "all" ? "Activity Plans" : "My Activity Plans"}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Plan the execution work that moves each measure of success and priority from target to outcome.
          </p>
        </div>
        {(userRole === "owner" || userRole === "lead") && (
          <NewActivityPlanDialog>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-fit">
              <Plus className="mr-2 h-4 w-4" />
              New Plan
            </Button>
          </NewActivityPlanDialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Plans</CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{visiblePlans.length}</div>
            <p className="text-xs text-muted-foreground">Linked to MoS targets</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            <CalendarDays className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activePlans}</div>
            <p className="text-xs text-muted-foreground">In progress, review, or blocked</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{highRiskPlans}</div>
            <p className="text-xs text-muted-foreground">Blocked or high risk</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedPlans}</div>
            <p className="text-xs text-muted-foreground">{reviewPlans} pending review checkpoints</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle className="text-foreground">Plan Controls</CardTitle>
              <CardDescription>Filter by priority and execution status.</CardDescription>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative lg:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search plans"
                  className="border-border bg-secondary pl-9"
                />
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full border-border bg-secondary lg:w-56">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {strategicPriorities.map((priority) => (
                    <SelectItem key={priority.id} value={priority.id}>
                      {priority.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full border-border bg-secondary lg:w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOrder.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex rounded-md border border-border bg-secondary p-1">
                <Button
                  type="button"
                  size="sm"
                  variant={viewMode === "board" ? "default" : "ghost"}
                  onClick={() => setViewMode("board")}
                  className={cn("h-8 flex-1 gap-2", viewMode === "board" && "bg-primary text-primary-foreground")}
                >
                  <Columns3 className="h-4 w-4" />
                  Board
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={viewMode === "table" ? "default" : "ghost"}
                  onClick={() => setViewMode("table")}
                  className={cn("h-8 flex-1 gap-2", viewMode === "table" && "bg-primary text-primary-foreground")}
                >
                  <Table2 className="h-4 w-4" />
                  Table
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">
              {viewMode === "board" ? "Execution Board" : "Execution Table"}
            </CardTitle>
            <CardDescription>
              {filteredPlans.length} plan{filteredPlans.length === 1 ? "" : "s"} match current filters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {viewMode === "board" ? (
              <div className="grid gap-4 xl:grid-cols-5">
                {plansByStatus.map(({ status, plans }) => (
                  <section key={status} className="rounded-lg border border-border bg-secondary/40 p-3">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <ListFilter className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">{statusLabels[status]}</h3>
                      </div>
                      <Badge variant="outline" className="border-border bg-background text-muted-foreground">
                        {plans.length}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={cn(
                            "w-full rounded-lg border bg-card p-3 text-left shadow-sm transition-colors hover:border-primary/40",
                            selectedPlan?.id === plan.id ? "border-primary" : "border-border",
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-5 text-foreground">{plan.title}</p>
                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                                {plan.description}
                              </p>
                            </div>
                            <Badge variant="outline" className={riskStyles[plan.risk]}>
                              {plan.risk}
                            </Badge>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium text-foreground">{plan.progress}%</span>
                            </div>
                            <Progress value={plan.progress} className="h-1.5 bg-secondary" />
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{plan.owner}</span>
                            <span>{plan.term}</span>
                          </div>
                        </button>
                      ))}
                      {plans.length === 0 && (
                        <div className="rounded-md border border-dashed border-border bg-background p-4 text-center text-xs text-muted-foreground">
                          No plans
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="min-w-64 text-muted-foreground">Plan</TableHead>
                        <TableHead className="min-w-56 text-muted-foreground">Priority / MoS</TableHead>
                        <TableHead className="text-muted-foreground">Owner</TableHead>
                        <TableHead className="text-muted-foreground">Term</TableHead>
                        <TableHead className="text-muted-foreground">Progress</TableHead>
                        <TableHead className="text-muted-foreground">Risk</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlans.map((plan) => (
                        <TableRow
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={cn(
                            "cursor-pointer border-border hover:bg-secondary/50",
                            selectedPlan?.id === plan.id && "bg-primary/5",
                          )}
                        >
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{plan.title}</p>
                              <p className="line-clamp-1 text-xs text-muted-foreground">{plan.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm text-foreground">{getPriorityName(plan.priorityId)}</p>
                              <p className="text-xs text-muted-foreground">{getMeasureName(plan.measureId)}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground">{plan.owner}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground">{plan.term}</span>
                          </TableCell>
                          <TableCell>
                            <div className="w-28 space-y-1">
                              <div className="text-xs font-medium text-foreground">{plan.progress}%</div>
                              <Progress value={plan.progress} className="h-1.5 bg-secondary" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={riskStyles[plan.risk]}>
                              {plan.risk}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusStyles[plan.status]}>
                              {statusLabels[plan.status]}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card xl:sticky xl:top-6 xl:self-start">
          <CardHeader>
            <CardTitle className="text-foreground">Plan Detail</CardTitle>
            <CardDescription>Ownership, dates, budget, and execution checkpoints.</CardDescription>
          </CardHeader>
          {selectedPlan && (
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-foreground">{selectedPlan.title}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">{selectedPlan.description}</p>
                  </div>
                  <Badge variant="outline" className={statusStyles[selectedPlan.status]}>
                    {statusLabels[selectedPlan.status]}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Execution progress</span>
                    <span className="font-semibold text-foreground">{selectedPlan.progress}%</span>
                  </div>
                  <Progress value={selectedPlan.progress} className="h-2 bg-secondary" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-md border border-border bg-secondary/40 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Target className="h-3.5 w-3.5" />
                    Strategic Priority
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{getPriorityName(selectedPlan.priorityId)}</p>
                </div>
                <div className="rounded-md border border-border bg-secondary/40 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    Measure of Success
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{getMeasureName(selectedPlan.measureId)}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    Owner
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedPlan.owner}</p>
                </div>
                <div className="rounded-md border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    Budget
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedPlan.budget}</p>
                </div>
                <div className="rounded-md border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Start
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {formatShortDate(selectedPlan.startDate)}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Due
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{formatShortDate(selectedPlan.dueDate)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Collaborators</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.collaborators.map((person) => (
                    <Badge key={person} variant="outline" className="border-border text-muted-foreground">
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-border bg-background p-3">
                <p className="text-xs text-muted-foreground">Next Milestone</p>
                <p className="mt-1 text-sm font-medium text-foreground">{selectedPlan.nextMilestone}</p>
              </div>

              <div className="flex items-center justify-between rounded-md border border-border bg-secondary/40 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Review Required</p>
                  <p className="text-xs text-muted-foreground">Last updated {selectedPlan.lastUpdated}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedPlan.reviewRequired
                      ? "border-warning/40 bg-warning/10 text-warning"
                      : "border-success/30 bg-success/10 text-success"
                  }
                >
                  {selectedPlan.reviewRequired ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
