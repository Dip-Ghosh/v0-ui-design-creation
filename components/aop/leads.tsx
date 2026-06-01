"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, Edit2, Trash2, User, Mail, Shield } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  role: "P1" | "P2" | "P3" | "P4"
  assignedPriorities: string[]
  activitiesCount: number
  completedActivities: number
  status: "active" | "inactive"
}

const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "John Davidson",
    email: "john.d@company.com",
    role: "P1",
    assignedPriorities: ["Revenue Growth", "Innovation & Development"],
    activitiesCount: 15,
    completedActivities: 10,
    status: "active",
  },
  {
    id: "lead-2",
    name: "Sarah Mitchell",
    email: "sarah.m@company.com",
    role: "P2",
    assignedPriorities: ["Customer Satisfaction", "Operational Excellence"],
    activitiesCount: 12,
    completedActivities: 8,
    status: "active",
  },
  {
    id: "lead-3",
    name: "Michael Roberts",
    email: "mike.r@company.com",
    role: "P3",
    assignedPriorities: ["Customer Satisfaction"],
    activitiesCount: 8,
    completedActivities: 5,
    status: "active",
  },
  {
    id: "lead-4",
    name: "Lisa Kim",
    email: "lisa.k@company.com",
    role: "P4",
    assignedPriorities: ["Operational Excellence"],
    activitiesCount: 10,
    completedActivities: 7,
    status: "active",
  },
  {
    id: "lead-5",
    name: "David Lee",
    email: "david.l@company.com",
    role: "P2",
    assignedPriorities: ["Innovation & Development"],
    activitiesCount: 6,
    completedActivities: 4,
    status: "inactive",
  },
]

export function LeadsSection() {
  const [leads] = useState(mockLeads)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadgeColor = (role: Lead["role"]) => {
    const colors = {
      P1: "bg-primary/10 text-primary border-primary/30",
      P2: "bg-info/10 text-info border-info/30",
      P3: "bg-warning/10 text-warning border-warning/30",
      P4: "bg-muted text-muted-foreground border-muted",
    }
    return colors[role]
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Manage Leads</h1>
          <p className="text-sm text-muted-foreground">
            Assign and manage leads for strategic priorities
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-foreground">{leads.length}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold text-success">
                {leads.filter((l) => l.status === "active").length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Active Leads</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-info">
              {leads.reduce((sum, l) => sum + l.activitiesCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning">
              {Math.round(
                (leads.reduce((sum, l) => sum + l.completedActivities, 0) /
                  leads.reduce((sum, l) => sum + l.activitiesCount, 0)) *
                  100
              )}
              %
            </div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary pl-9 border-border text-foreground"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Lead</TableHead>
                  <TableHead className="text-muted-foreground">Role</TableHead>
                  <TableHead className="text-muted-foreground">Assigned Priorities</TableHead>
                  <TableHead className="text-muted-foreground">Progress</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 bg-secondary">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(lead.role)}>
                        {lead.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {lead.assignedPriorities.map((priority) => (
                          <Badge
                            key={priority}
                            variant="outline"
                            className="text-xs border-border text-muted-foreground"
                          >
                            {priority}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-32 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {lead.completedActivities}/{lead.activitiesCount}
                          </span>
                          <span className="text-foreground">
                            {Math.round((lead.completedActivities / lead.activitiesCount) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(lead.completedActivities / lead.activitiesCount) * 100}
                          className="h-1.5 bg-secondary"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.status === "active"
                            ? "bg-success/10 text-success border border-success/30"
                            : "bg-muted text-muted-foreground border border-muted"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
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
