"use client"

import { useMemo, useState } from "react"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Plus,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NewMeasureDialog } from "@/components/aop/create-dialogs"
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
  activityPlans,
  getMeasurePlans,
  getMeasureProgress,
  getPriorityName,
  measuresOfSuccess,
  strategicPriorities,
  type ActivityPlanStatus,
  type MeasureStatus,
} from "@/lib/aop-data"
import { cn } from "@/lib/utils"

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

const statusLabels: Record<MeasureStatus | ActivityPlanStatus, string> = {
  "on-track": "On Track",
  watch: "Watch",
  behind: "Behind",
  complete: "Complete",
  completed: "Completed",
  "in-progress": "In Progress",
  review: "Review",
  upcoming: "Upcoming",
  blocked: "Blocked",
}

function formatMeasureValue(value: number, unit: string) {
  return unit === "%" ? `${value}%` : `${value} ${unit}`
}

export function Measure() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedMeasureId, setSelectedMeasureId] = useState(measuresOfSuccess[0]?.id ?? "")

  const filteredMeasures = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return measuresOfSuccess.filter((measure) => {
      const matchesPriority = priorityFilter === "all" || measure.priorityId === priorityFilter
      const matchesSearch = !query
        || [measure.name, measure.owner, measure.cadence, getPriorityName(measure.priorityId)]
          .join(" ")
          .toLowerCase()
          .includes(query)

      return matchesPriority && matchesSearch
    })
  }, [priorityFilter, searchQuery])

  const selectedMeasure =
    measuresOfSuccess.find((measure) => measure.id === selectedMeasureId)
    ?? filteredMeasures[0]
    ?? measuresOfSuccess[0]
  const selectedPlans = selectedMeasure ? getMeasurePlans(selectedMeasure.id) : []
  const averageProgress = Math.round(
    measuresOfSuccess.reduce((total, measure) => total + getMeasureProgress(measure), 0) / measuresOfSuccess.length,
  )
  const measuresNeedingAttention = measuresOfSuccess.filter((measure) =>
    ["watch", "behind"].includes(measure.status),
  ).length
  const activePlanCount = activityPlans.filter((plan) =>
    ["in-progress", "review", "blocked"].includes(plan.status),
  ).length

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-foreground">Measures of Success</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Define measurable outcomes, track current values against targets, and connect each MoS to activity plans.
          </p>
        </div>
        <NewMeasureDialog>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-fit">
            <Plus className="mr-2 h-4 w-4" />
            New MoS
          </Button>
        </NewMeasureDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total MoS</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{measuresOfSuccess.length}</div>
            <p className="text-xs text-muted-foreground">Across {strategicPriorities.length} priorities</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Normalized baseline to target</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Needs Attention</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{measuresNeedingAttention}</div>
            <p className="text-xs text-muted-foreground">Watch or behind status</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Plans</CardTitle>
            <ClipboardList className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activePlanCount}</div>
            <p className="text-xs text-muted-foreground">Currently moving MoS forward</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="border-border bg-card">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <CardTitle className="text-foreground">MoS Registry</CardTitle>
                <CardDescription>Targets, baselines, owners, cadence, and linked activity coverage.</CardDescription>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search measures"
                    className="border-border bg-secondary pl-9"
                  />
                </div>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full border-border bg-secondary sm:w-56">
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] text-sm">
                  <thead className="border-b border-border bg-secondary/70 text-left text-xs text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Measure</th>
                      <th className="px-4 py-3 font-medium">Priority</th>
                      <th className="px-4 py-3 font-medium">Target</th>
                      <th className="px-4 py-3 font-medium">Progress</th>
                      <th className="px-4 py-3 font-medium">Owner</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Plans</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMeasures.map((measure) => {
                      const progress = getMeasureProgress(measure)
                      const isSelected = selectedMeasure?.id === measure.id

                      return (
                        <tr
                          key={measure.id}
                          onClick={() => setSelectedMeasureId(measure.id)}
                          className={cn(
                            "cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-secondary/50",
                            isSelected && "bg-primary/5",
                          )}
                        >
                          <td className="px-4 py-4 align-top">
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{measure.name}</p>
                              <p className="text-xs text-muted-foreground">Updated {measure.lastUpdated}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <span className="text-foreground">{getPriorityName(measure.priorityId)}</span>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <div className="space-y-1">
                              <p className="text-foreground">
                                {formatMeasureValue(measure.current, measure.unit)} /{" "}
                                {formatMeasureValue(measure.target, measure.unit)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Baseline {formatMeasureValue(measure.baseline, measure.unit)}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <div className="w-36 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Complete</span>
                                <span className="font-medium text-foreground">{progress}%</span>
                              </div>
                              <Progress value={progress} className="h-2 bg-secondary" />
                            </div>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <div className="space-y-1">
                              <p className="text-foreground">{measure.owner}</p>
                              <p className="text-xs text-muted-foreground">{measure.cadence}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <Badge variant="outline" className={measureStatusStyles[measure.status]}>
                              {statusLabels[measure.status]}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-right align-top">
                            <span className="font-medium text-foreground">{getMeasurePlans(measure.id).length}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card xl:sticky xl:top-6 xl:self-start">
          <CardHeader>
            <CardTitle className="text-foreground">MoS Detail</CardTitle>
            <CardDescription>Target path, reporting cadence, and activity support.</CardDescription>
          </CardHeader>
          {selectedMeasure && (
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-foreground">{selectedMeasure.name}</h2>
                    <p className="text-sm text-muted-foreground">{getPriorityName(selectedMeasure.priorityId)}</p>
                  </div>
                  <Badge variant="outline" className={measureStatusStyles[selectedMeasure.status]}>
                    {statusLabels[selectedMeasure.status]}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Target progress</span>
                    <span className="font-semibold text-foreground">{getMeasureProgress(selectedMeasure)}%</span>
                  </div>
                  <Progress value={getMeasureProgress(selectedMeasure)} className="h-2 bg-secondary" />
                </div>
                <div className="grid grid-cols-3 overflow-hidden rounded-md border border-border text-center">
                  <div className="border-r border-border bg-secondary/40 p-3">
                    <p className="text-xs text-muted-foreground">Baseline</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {formatMeasureValue(selectedMeasure.baseline, selectedMeasure.unit)}
                    </p>
                  </div>
                  <div className="border-r border-border bg-background p-3">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {formatMeasureValue(selectedMeasure.current, selectedMeasure.unit)}
                    </p>
                  </div>
                  <div className="bg-secondary/40 p-3">
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {formatMeasureValue(selectedMeasure.target, selectedMeasure.unit)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-secondary/40 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    Owner
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedMeasure.owner}</p>
                </div>
                <div className="rounded-md border border-border bg-secondary/40 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarClock className="h-3.5 w-3.5" />
                    Cadence
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedMeasure.cadence}</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-info" />
                    <span className="text-sm font-medium text-foreground">Trend</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-semibold",
                      selectedMeasure.trend >= 0 ? "text-success" : "text-destructive",
                    )}
                  >
                    {selectedMeasure.trend >= 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {selectedMeasure.trend >= 0 ? "+" : ""}
                    {selectedMeasure.trend}
                    {selectedMeasure.unit === "%" ? " pts" : ""}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Linked Activity Plans</h3>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {selectedPlans.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {selectedPlans.map((plan) => (
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
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{plan.owner}</span>
                          <span className="font-medium text-foreground">{plan.progress}%</span>
                        </div>
                        <Progress value={plan.progress} className="h-1.5 bg-secondary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark Review Complete
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
