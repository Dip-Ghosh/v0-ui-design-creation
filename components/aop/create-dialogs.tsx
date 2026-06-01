"use client"

import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { activityPlans, measuresOfSuccess, strategicPriorities } from "@/lib/aop-data"

interface CreateDialogProps {
  children: ReactNode
}

const owners = ["P1", "P2", "P3", "P4", "John D.", "Sarah M.", "Mike R.", "Lisa K.", "David L."]
const terms = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"]

function Field({
  children,
  className,
  label,
}: {
  children: ReactNode
  className?: string
  label: string
}) {
  return (
    <div className={className ?? "space-y-2"}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function DialogActions({ actionLabel }: { actionLabel: string }) {
  return (
    <DialogFooter className="pt-2">
      <DialogClose asChild>
        <Button type="button" variant="outline" className="border-border text-foreground hover:bg-secondary">
          Cancel
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90">
          {actionLabel}
        </Button>
      </DialogClose>
    </DialogFooter>
  )
}

function FormDialog({
  actionLabel,
  children,
  description,
  title,
  trigger,
}: {
  actionLabel: string
  children: ReactNode
  description: string
  title: string
  trigger: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <DialogTitle>{title}</DialogTitle>
            <Badge variant="outline" className="border-border text-muted-foreground">
              Draft
            </Badge>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          {children}
          <DialogActions actionLabel={actionLabel} />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function NewStrategicPriorityDialog({ children }: CreateDialogProps) {
  return (
    <FormDialog
      trigger={children}
      title="New Strategic Priority"
      description="Create a strategic focus area with ownership, weight, expected outcome, and review timing."
      actionLabel="Create Priority"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Priority Name">
          <Input placeholder="Revenue Growth" className="border-border bg-secondary" />
        </Field>
        <Field label="Owner">
          <Select defaultValue={owners[0]}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.slice(0, 4).map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Weight">
          <Input type="number" min={0} max={100} placeholder="25" className="border-border bg-secondary" />
        </Field>
        <Field label="Due Term">
          <Select defaultValue="Q4 2026">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <Textarea
          placeholder="Describe the strategic focus and boundaries."
          className="min-h-24 border-border bg-secondary"
        />
      </Field>
      <Field label="Expected Outcome">
        <Textarea placeholder="Define the business outcome this priority should create." className="border-border bg-secondary" />
      </Field>
    </FormDialog>
  )
}

export function NewMeasureDialog({ children }: CreateDialogProps) {
  return (
    <FormDialog
      trigger={children}
      title="New Measure of Success"
      description="Define a measurable target and connect it to the strategic priority it supports."
      actionLabel="Create MoS"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="MoS Name">
          <Input placeholder="Customer Retention" className="border-border bg-secondary" />
        </Field>
        <Field label="Strategic Priority">
          <Select defaultValue={strategicPriorities[0]?.id}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {strategicPriorities.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  {priority.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Owner">
          <Select defaultValue={owners[0]}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.slice(0, 4).map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Reporting Cadence">
          <Select defaultValue="Monthly">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select cadence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Biweekly">Biweekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Baseline">
          <Input type="number" placeholder="88" className="border-border bg-secondary" />
        </Field>
        <Field label="Current">
          <Input type="number" placeholder="92" className="border-border bg-secondary" />
        </Field>
        <Field label="Target">
          <Input type="number" placeholder="95" className="border-border bg-secondary" />
        </Field>
        <Field label="Unit">
          <Input placeholder="%" className="border-border bg-secondary" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Due Term">
          <Select defaultValue="Q4 2026">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Starting Status">
          <Select defaultValue="on-track">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on-track">On Track</SelectItem>
              <SelectItem value="watch">Watch</SelectItem>
              <SelectItem value="behind">Behind</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Measurement Notes">
        <Textarea placeholder="Add source, calculation logic, or review notes." className="border-border bg-secondary" />
      </Field>
    </FormDialog>
  )
}

export function NewActivityPlanDialog({ children }: CreateDialogProps) {
  return (
    <FormDialog
      trigger={children}
      title="New Activity Plan"
      description="Create an execution plan with timeline, risk, budget, linked MoS, and accountable owners."
      actionLabel="Create Plan"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Plan Title">
          <Input placeholder="Partner Channel Launch" className="border-border bg-secondary" />
        </Field>
        <Field label="Owner">
          <Select defaultValue="John D.">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Strategic Priority">
          <Select defaultValue={strategicPriorities[0]?.id}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {strategicPriorities.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  {priority.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Measure of Success">
          <Select defaultValue={measuresOfSuccess[0]?.id}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select MoS" />
            </SelectTrigger>
            <SelectContent>
              {measuresOfSuccess.map((measure) => (
                <SelectItem key={measure.id} value={measure.id}>
                  {measure.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <Textarea placeholder="Describe the work to be delivered." className="min-h-24 border-border bg-secondary" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Term">
          <Select defaultValue="Q2 2026">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Start Date">
          <Input type="date" defaultValue="2026-06-01" className="border-border bg-secondary" />
        </Field>
        <Field label="Due Date">
          <Input type="date" defaultValue="2026-09-30" className="border-border bg-secondary" />
        </Field>
        <Field label="Budget">
          <Input placeholder="85K" className="border-border bg-secondary" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Status">
          <Select defaultValue="upcoming">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Risk">
          <Select defaultValue="medium">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Progress">
          <Input type="number" min={0} max={100} placeholder="0" className="border-border bg-secondary" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
        <Field label="Next Milestone">
          <Input placeholder="Finalize partner enablement kit" className="border-border bg-secondary" />
        </Field>
        <div className="flex items-end">
          <label className="flex h-10 w-full items-center gap-3 rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
            <Checkbox id="plan-review" />
            Review required
          </label>
        </div>
      </div>
      <Field label="Collaborators">
        <Input placeholder="Sarah M., Finance, P1" className="border-border bg-secondary" />
      </Field>
    </FormDialog>
  )
}

export function NewActivityDialog({ children }: CreateDialogProps) {
  return (
    <FormDialog
      trigger={children}
      title="New Activity"
      description="Add an activity log entry and connect it to a priority, MoS, and activity plan."
      actionLabel="Create Activity"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Activity Title">
          <Input placeholder="Customer feedback review" className="border-border bg-secondary" />
        </Field>
        <Field label="Activity Plan">
          <Select defaultValue={activityPlans[0]?.id}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select plan" />
            </SelectTrigger>
            <SelectContent>
              {activityPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Strategic Priority">
          <Select defaultValue={strategicPriorities[0]?.id}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {strategicPriorities.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  {priority.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Measure of Success">
          <Select defaultValue={measuresOfSuccess[0]?.id}>
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select MoS" />
            </SelectTrigger>
            <SelectContent>
              {measuresOfSuccess.map((measure) => (
                <SelectItem key={measure.id} value={measure.id}>
                  {measure.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <Textarea placeholder="Describe what happened or what will be done." className="min-h-24 border-border bg-secondary" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Assigned To">
          <Input placeholder="John D., Sarah M." className="border-border bg-secondary" />
        </Field>
        <Field label="Term">
          <Select defaultValue="Q2 2026">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Status">
          <Select defaultValue="in-progress">
            <SelectTrigger className="w-full border-border bg-secondary">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Last Updated">
          <Input type="date" defaultValue="2026-06-01" className="border-border bg-secondary" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
        <Field label="Remarks">
          <Input placeholder="Pending manager review" className="border-border bg-secondary" />
        </Field>
        <div className="flex items-end">
          <label className="flex h-10 w-full items-center gap-3 rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
            <Checkbox id="activity-review" />
            Needs review
          </label>
        </div>
      </div>
    </FormDialog>
  )
}
