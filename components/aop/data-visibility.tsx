"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, Users, Shield, CheckCircle } from "lucide-react"

interface DataVisibilityRule {
  id: string
  role: string
  dataType: string
  access: "full" | "own" | "restricted" | "hidden"
  description: string
}

const visibilityRules: DataVisibilityRule[] = [
  {
    id: "rule-1",
    role: "Owner",
    dataType: "All MoS & Activities",
    access: "full",
    description: "Full access to all data across the organization",
  },
  {
    id: "rule-2",
    role: "Owner",
    dataType: "Global Reports",
    access: "full",
    description: "Generate and view comprehensive reports",
  },
  {
    id: "rule-3",
    role: "Lead P1/P2",
    dataType: "Own MoS & Activities",
    access: "own",
    description: "Can view and edit only their assigned measures of success",
  },
  {
    id: "rule-4",
    role: "Lead P1/P2",
    dataType: "Other Leads' Data",
    access: "hidden",
    description: "Cannot access data assigned to other leads",
  },
  {
    id: "rule-5",
    role: "Supervisor",
    dataType: "Subordinate Activities",
    access: "restricted",
    description: "Read-only access to subordinate activities",
  },
  {
    id: "rule-6",
    role: "Supervisor",
    dataType: "Activity Logs",
    access: "restricted",
    description: "Can view activity logs for monitoring purposes",
  },
]

const accessMatrix = {
  "Strategic Priorities": { Owner: "full", "Lead P1": "own", "Lead P2": "own", Supervisor: "restricted" },
  "Measures of Success": { Owner: "full", "Lead P1": "own", "Lead P2": "own", Supervisor: "restricted" },
  "All Activities": { Owner: "full", "Lead P1": "hidden", "Lead P2": "hidden", Supervisor: "restricted" },
  "Own Activities": { Owner: "full", "Lead P1": "full", "Lead P2": "full", Supervisor: "hidden" },
  "Global Reports": { Owner: "full", "Lead P1": "hidden", "Lead P2": "hidden", Supervisor: "hidden" },
  "Activity Logs": { Owner: "full", "Lead P1": "own", "Lead P2": "own", Supervisor: "full" },
}

export function DataVisibilitySection() {
  const getAccessBadge = (access: DataVisibilityRule["access"]) => {
    const styles = {
      full: { class: "bg-success/10 text-success border-success/30", icon: CheckCircle },
      own: { class: "bg-info/10 text-info border-info/30", icon: Eye },
      restricted: { class: "bg-warning/10 text-warning border-warning/30", icon: EyeOff },
      hidden: { class: "bg-destructive/10 text-destructive border-destructive/30", icon: Lock },
    }
    return styles[access]
  }

  const getMatrixBadge = (access: string) => {
    const styles = {
      full: "bg-success text-success-foreground",
      own: "bg-info text-info-foreground",
      restricted: "bg-warning text-warning-foreground",
      hidden: "bg-muted text-muted-foreground",
    }
    return styles[access as keyof typeof styles]
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Data Visibility</h1>
        <p className="text-sm text-muted-foreground">
          Configure data access rules based on user roles
        </p>
      </div>

      {/* Access Legend */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Access Levels</CardTitle>
          <CardDescription className="text-muted-foreground">
            Understanding different access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Full Access</p>
                <p className="text-xs text-muted-foreground">View, edit, delete</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <Eye className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="font-medium text-foreground">Own Data</p>
                <p className="text-xs text-muted-foreground">Only assigned items</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <EyeOff className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-foreground">Restricted</p>
                <p className="text-xs text-muted-foreground">Read-only access</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Lock className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">Hidden</p>
                <p className="text-xs text-muted-foreground">No access</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Matrix */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Access Matrix</CardTitle>
          <CardDescription className="text-muted-foreground">
            Overview of data access by role and data type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Data Type
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Owner
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Lead P1
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Lead P2
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Supervisor
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(accessMatrix).map(([dataType, access]) => (
                  <tr key={dataType} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{dataType}</td>
                    {Object.values(access).map((level, index) => (
                      <td key={index} className="px-4 py-3 text-center">
                        <Badge className={getMatrixBadge(level)}>
                          {level === "full"
                            ? "Full"
                            : level === "own"
                              ? "Own"
                              : level === "restricted"
                                ? "Read"
                                : "None"}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Rules */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Visibility Rules</CardTitle>
          <CardDescription className="text-muted-foreground">
            Detailed access rules for each role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visibilityRules.map((rule) => {
              const accessStyle = getAccessBadge(rule.access)
              const Icon = accessStyle.icon
              return (
                <div
                  key={rule.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {rule.role === "Owner" ? (
                        <Shield className="h-5 w-5 text-primary" />
                      ) : (
                        <Users className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{rule.role}</p>
                        <span className="text-muted-foreground">→</span>
                        <p className="text-foreground">{rule.dataType}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={accessStyle.class}>
                    <Icon className="mr-1 h-3 w-3" />
                    {rule.access === "full"
                      ? "Full Access"
                      : rule.access === "own"
                        ? "Own Data"
                        : rule.access === "restricted"
                          ? "Restricted"
                          : "Hidden"}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
