"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Layers3,
  Plus,
  Search,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { NewStrategicPriorityDialog } from "@/components/aop/create-dialogs"
import {
  activityPlans,
  getMeasureProgress,
  getPriorityMeasures,
  getPriorityPlans,
  getPriorityProgress,
  strategicPriorities,
  type ActivityPlanStatus,
  type MeasureStatus,
  type PriorityStatus,
} from "@/lib/aop-data"
import { cn } from "@/lib/utils"

const priorityStatusStyles: Record<PriorityStatus, string> = {
  active: "border-info/30 bg-info/10 text-info",
  "at-risk": "border-warning/40 bg-warning/10 text-warning",
  completed: "border-success/30 bg-success/10 text-success",
}

const measureStatusStyles: Record<MeasureStatus, string> = {
  "on-track": "border-success/30 bg-success/10 text-success",
  watch: "border-warning/40 bg-warning/10 text-warning",
  behind: "border-destructive/30 bg-destructive/10 text-destructive",
  complete: "border-success/30 bg-success/10 text-success",
}

const planStatusStyles: Record<ActivityPlanStatus, string> = {
  completed: "border-success/30 bg-success/10 text-success",
  "in-progress": "border-info/30 bg-info/10 text-info",
  review: "border-warning/40 bg-warning/10 text-warning",
  upcoming: "border-border bg-secondary text-muted-foreground",
  blocked: "border-destructive/30 bg-destructive/10 text-destructive",
}

const statusLabels: Record<PriorityStatus | MeasureStatus | ActivityPlanStatus, string> = {
  active: "Active",
  "at-risk": "At Risk",
  completed: "Completed",
  "on-track": "On Track",
  watch: "Watch",
  behind: "Behind",
  complete: "Complete",
  "in-progress": "In Progress",
  review: "Review",
  upcoming: "Upcoming",
  blocked: "Blocked",
}

export function StrategicPrioritiesSection() {
  const [selectedPriorityId, setSelectedPriorityId] = useState(strategicPriorities[0]?.id ?? "")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPriorities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return strategicPriorities
    }

    return strategicPriorities.filter((priority) =>
      [priority.name, priority.description, priority.outcome, priority.lead]
        .join(" ")
        .toLowerCase()
        .includes(query),
    )
  }, [searchQuery])

  const selectedPriority =
    strategicPriorities.find((priority) => priority.id === selectedPriorityId) ?? strategicPriorities[0]
  const totalWeight = strategicPriorities.reduce((total, priority) => total + priority.weight, 0)
  const weightedProgress = Math.round(
    strategicPriorities.reduce(
      (total, priority) => total + getPriorityProgress(priority.id) * (priority.weight / 100),
      0,
    ),
  )
  const plansInMotion = activityPlans.filter((plan) =>
    ["in-progress", "review", "blocked"].includes(plan.status),
  ).length
  const priorityMeasures = selectedPriority ? getPriorityMeasures(selectedPriority.id) : []
  const priorityPlans = selectedPriority ? getPriorityPlans(selectedPriority.id) : []

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-foreground">Strategic Priorities</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Set the annual focus areas, confirm weight allocation, and keep every measure and activity plan tied to a
            priority.
          </p>
        </div>
        <NewStrategicPriorityDialog>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-fit">
            <Plus className="mr-2 h-4 w-4" />
            New Priority
          </Button>
        </NewStrategicPriorityDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Priorities</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{strategicPriorities.length}</div>
            <p className="text-xs text-muted-foreground">Active annual focus areas</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weight Allocated</CardTitle>
            <Layers3 className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalWeight}%</div>
            <p className="text-xs text-muted-foreground">Across strategic priorities</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weighted Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{weightedProgress}%</div>
            <p className="text-xs text-muted-foreground">Based on linked MoS progress</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Plans In Motion</CardTitle>
            <ClipboardList className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{plansInMotion}</div>
            <p className="text-xs text-muted-foreground">In progress, review, or blocked</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="border-border bg-card">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-foreground">Priority Portfolio</CardTitle>
                <CardDescription>Review focus, ownership, weight, and execution health.</CardDescription>
              </div>
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search priorities"
                  className="border-border bg-secondary pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredPriorities.map((priority) => {
              const progress = getPriorityProgress(priority.id)
              const measures = getPriorityMeasures(priority.id)
              const plans = getPriorityPlans(priority.id)
              const isSelected = selectedPriority?.id === priority.id

              return (
                <button
                  key={priority.id}
                  type="button"
                  onClick={() => setSelectedPriorityId(priority.id)}
                  className={cn(
                    "w-full rounded-lg border p-4 text-left transition-colors",
                    "hover:border-primary/40 hover:bg-secondary/50",
                    isSelected ? "border-primary bg-primary/5" : "border-border bg-background",
                  )}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground">{priority.name}</h3>
                          <Badge variant="outline" className={priorityStatusStyles[priority.status]}>
                            {statusLabels[priority.status]}
                          </Badge>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">{priority.description}</p>
                        <p className="text-sm text-foreground">{priority.outcome}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-left lg:w-64">
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="text-sm font-semibold text-foreground">{priority.weight}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">MoS</p>
                        <p className="text-sm font-semibold text-foreground">{measures.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Plans</p>
                        <p className="text-sm font-semibold text-foreground">{plans.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">MoS progress</span>
                      <span className="font-medium text-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-secondary" />
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-border bg-card xl:sticky xl:top-6 xl:self-start">
          <CardHeader>
            <CardTitle className="text-foreground">Priority Detail</CardTitle>
            <CardDescription>Selected priority context and execution links.</CardDescription>
          </CardHeader>
          {selectedPriority && (
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedPriority.name}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">{selectedPriority.outcome}</p>
                  </div>
                  <Badge variant="outline" className={priorityStatusStyles[selectedPriority.status]}>
                    {statusLabels[selectedPriority.status]}
                  </Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-border bg-secondary/40 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      Owner
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">{selectedPriority.lead}</p>
                  </div>
                  <div className="rounded-md border border-border bg-secondary/40 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Due Term
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">{selectedPriority.dueTerm}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Measures Of Success</h3>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {priorityMeasures.length} linked
                  </Badge>
                </div>
                <div className="space-y-3">
                  {priorityMeasures.map((measure) => {
                    const progress = getMeasureProgress(measure)

                    return (
                      <div key={measure.id} className="rounded-md border border-border bg-background p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{measure.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {measure.current}
                              {measure.unit.startsWith("%") ? measure.unit : ` ${measure.unit}`} of {measure.target}
                              {measure.unit.startsWith("%") ? measure.unit : ` ${measure.unit}`}
                            </p>
                          </div>
                          <Badge variant="outline" className={measureStatusStyles[measure.status]}>
                            {statusLabels[measure.status]}
                          </Badge>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-1.5 bg-secondary" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Activity Plans</h3>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {priorityPlans.length} linked
                  </Badge>
                </div>
                <div className="space-y-3">
                  {priorityPlans.map((plan) => (
                    <div key={plan.id} className="rounded-md border border-border bg-background p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{plan.title}</p>
                          <p className="text-xs text-muted-foreground">{plan.nextMilestone}</p>
                        </div>
                        <Badge variant="outline" className={planStatusStyles[plan.status]}>
                          {statusLabels[plan.status]}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{plan.owner}</span>
                        <span>{plan.term}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Open Planning Review
              </Button>
            </CardContent>
          )}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {strategicPriorities.map((priority) => {
          const isAtRisk = priority.status === "at-risk"

          return (
            <div key={priority.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {isAtRisk ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                  <p className="text-sm font-medium text-foreground">{priority.name}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{getPriorityProgress(priority.id)}%</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {isAtRisk ? "Needs owner attention in the next review cycle." : "Execution is moving within plan."}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
