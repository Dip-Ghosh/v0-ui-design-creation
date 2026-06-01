"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Badge} from "@/components/ui/badge"
import {Calendar, Plus, Trash2, Save} from "lucide-react"

interface AOPConfig {
  id: string
  name: string
  program: string,
  inCharge: string,
  purpose: string,
  goal: string,
  startDate: string
  endDate: string
  termCount: number
  termDuration: string
  status: "draft" | "active" | "completed"
}

const mockConfig: AOPConfig = {
  id: "aop-2026",
  name: "Annual Operating Plan 2026",
  program: "Technology, Enterprise Resource Planning (ERP) & Data",
  inCharge: "Arinjoy Dhar",
  purpose: "In pursuit of our mission & long-term sustainability, we have established a clear goal: to prioritize both digital transformation & cybersecurity. We also aim for the legacy technology components to undergo revisions to ensure they remain both cost-effective & sustainable.",
  goal: "Utilize the appropriate Frugal Innovative Technology Enablers (FITE) to enable Brac to operate with efficiency, effectiveness, & a data-driven approach in decision-making & service design.",
  startDate: "2026-01-01",
  endDate: "2026-12-31",
  termCount: 4,
  termDuration: "quarterly",
  status: "active",
}

export function MosCreate() {
  const [config, setConfig] = useState(mockConfig)
  const [terms, setTerms] = useState([
    {id: 1, name: "Q1 2026", start: "2026-01-01", end: "2026-03-31"},
    {id: 2, name: "Q2 2026", start: "2026-04-01", end: "2026-06-30"},
    {id: 3, name: "Q3 2026", start: "2026-07-01", end: "2026-09-30"},
    {id: 4, name: "Q4 2026", start: "2026-10-01", end: "2026-12-31"},
  ])

  return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">AOP Configuration</h1>
            <p className="text-sm text-muted-foreground">
              Configure your Annual Operating Plan settings and terms
            </p>
          </div>
          <Badge
              variant={config.status === "active" ? "default" : "secondary"}
              className={
                config.status === "active"
                    ? "bg-success text-success-foreground"
                    : "bg-secondary text-secondary-foreground"
              }
          >
            {config.status.charAt(0).toUpperCase() + config.status.slice(1)}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Configuration */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calendar className="h-5 w-5 text-primary"/>
                Basic Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Define the core AOP parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">AOP Name</Label>
                <Input
                    id="name"
                    value={config.name}
                    onChange={(e) => setConfig({...config, name: e.target.value})}
                    className="bg-secondary border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name of Programme/Department</Label>
                <Input
                    id="name"
                    value={config.name}
                    onChange={(e) => setConfig({...config, name: e.target.value})}
                    className="bg-secondary border-border text-foreground"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Label htmlFor="name" className="text-foreground">In Charge</Label>
                <Input
                    id="inCharge"
                    value={config.inCharge}
                    onChange={(e) => setConfig({...config, inCharge: e.target.value})}
                    className="bg-secondary border-border text-foreground"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-foreground">Start Date</Label>
                  <Input
                      id="startDate"
                      type="date"
                      value={config.startDate}
                      onChange={(e) => setConfig({...config, startDate: e.target.value})}
                      className="bg-secondary border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-foreground">End Date</Label>
                  <Input
                      id="endDate"
                      type="date"
                      value={config.endDate}
                      onChange={(e) => setConfig({...config, endDate: e.target.value})}
                      className="bg-secondary border-border text-foreground"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="termCount" className="text-foreground">Number of Terms</Label>
                  <Input
                      id="termCount"
                      type="number"
                      min={1}
                      max={12}
                      value={config.termCount}
                      onChange={(e) => setConfig({...config, termCount: parseInt(e.target.value)})}
                      className="bg-secondary border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="termDuration" className="text-foreground">Term Duration</Label>
                  <select
                      id="termDuration"
                      value={config.termDuration}
                      onChange={(e) => setConfig({...config, termDuration: e.target.value})}
                      className="flex h-9 w-full rounded-md border border-border bg-secondary px-3 py-1 text-sm text-foreground"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="biannual">Bi-Annual</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4"/>
                Save Configuration
              </Button>
            </CardContent>
          </Card>

          {/* Terms Management */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Dynamic Terms</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage AOP terms and durations
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Plus className="mr-2 h-4 w-4"/>
                  Add Term
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {terms.map((term) => (
                    <div
                        key={term.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{term.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {term.start} → {term.end}
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Notification & Reminder Settings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Configure when and how reminders are sent to leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-foreground">Pre-Review Alert</Label>
                <div className="flex items-center gap-2">
                  <Input
                      type="number"
                      defaultValue={7}
                      className="w-20 bg-secondary border-border text-foreground"
                  />
                  <span className="text-sm text-muted-foreground">days before term end</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Reminder Frequency</Label>
                <select className="flex h-9 w-full rounded-md border border-border bg-secondary px-3 py-1 text-sm text-foreground">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-Weekly</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Send To</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" defaultChecked className="rounded border-border"/>
                    P1
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" defaultChecked className="rounded border-border"/>
                    P2
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" className="rounded border-border"/>
                    Supervisors
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
