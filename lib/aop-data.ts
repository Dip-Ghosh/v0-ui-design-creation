export type PriorityStatus = "active" | "at-risk" | "completed"
export type MeasureStatus = "on-track" | "watch" | "behind" | "complete"
export type ActivityPlanStatus = "completed" | "in-progress" | "review" | "upcoming" | "blocked"
export type RiskLevel = "low" | "medium" | "high"

export interface StrategicPriority {
  id: string
  name: string
  description: string
  outcome: string
  weight: number
  lead: string
  dueTerm: string
  status: PriorityStatus
}

export interface MeasureOfSuccess {
  id: string
  priorityId: string
  name: string
  baseline: number
  target: number
  current: number
  unit: string
  owner: string
  cadence: string
  dueTerm: string
  status: MeasureStatus
  trend: number
  lastUpdated: string
}

export interface ActivityPlan {
  id: string
  title: string
  description: string
  priorityId: string
  measureId: string
  owner: string
  collaborators: string[]
  term: string
  startDate: string
  dueDate: string
  status: ActivityPlanStatus
  progress: number
  risk: RiskLevel
  nextMilestone: string
  reviewRequired: boolean
  budget: string
  lastUpdated: string
}

export const strategicPriorities: StrategicPriority[] = [
  {
    id: "sp-1",
    name: "Revenue Growth",
    description: "Expand priority segments and improve sales conversion across enterprise accounts.",
    outcome: "Grow sustainable revenue while keeping acquisition cost within plan.",
    weight: 30,
    lead: "P1 - Growth Lead",
    dueTerm: "Q4 2026",
    status: "active",
  },
  {
    id: "sp-2",
    name: "Customer Experience",
    description: "Raise customer satisfaction through faster service recovery and product quality loops.",
    outcome: "Increase loyalty, renewal rates, and advocacy in core customer groups.",
    weight: 25,
    lead: "P2 - CX Lead",
    dueTerm: "Q4 2026",
    status: "active",
  },
  {
    id: "sp-3",
    name: "Operational Excellence",
    description: "Simplify high-volume workflows and remove avoidable cost from delivery operations.",
    outcome: "Deliver faster cycle times with fewer handoffs and lower operating expense.",
    weight: 25,
    lead: "P3 - Operations Lead",
    dueTerm: "Q3 2026",
    status: "at-risk",
  },
  {
    id: "sp-4",
    name: "Innovation Pipeline",
    description: "Ship validated product enhancements that create measurable adoption gains.",
    outcome: "Build a healthier roadmap from customer-backed product experiments.",
    weight: 20,
    lead: "P4 - Product Lead",
    dueTerm: "Q4 2026",
    status: "active",
  },
]

export const measuresOfSuccess: MeasureOfSuccess[] = [
  {
    id: "mos-1",
    priorityId: "sp-1",
    name: "Annual Revenue",
    baseline: 6.8,
    target: 10,
    current: 7.8,
    unit: "M USD",
    owner: "P1",
    cadence: "Monthly",
    dueTerm: "Q4 2026",
    status: "on-track",
    trend: 7,
    lastUpdated: "2026-05-24",
  },
  {
    id: "mos-2",
    priorityId: "sp-1",
    name: "New Enterprise Customers",
    baseline: 280,
    target: 500,
    current: 392,
    unit: "customers",
    owner: "P1",
    cadence: "Monthly",
    dueTerm: "Q4 2026",
    status: "on-track",
    trend: 5,
    lastUpdated: "2026-05-22",
  },
  {
    id: "mos-3",
    priorityId: "sp-2",
    name: "NPS Score",
    baseline: 58,
    target: 70,
    current: 65,
    unit: "points",
    owner: "P2",
    cadence: "Quarterly",
    dueTerm: "Q4 2026",
    status: "watch",
    trend: 2,
    lastUpdated: "2026-05-18",
  },
  {
    id: "mos-4",
    priorityId: "sp-2",
    name: "Customer Retention",
    baseline: 88,
    target: 95,
    current: 92,
    unit: "%",
    owner: "P2",
    cadence: "Monthly",
    dueTerm: "Q4 2026",
    status: "on-track",
    trend: 3,
    lastUpdated: "2026-05-20",
  },
  {
    id: "mos-5",
    priorityId: "sp-3",
    name: "Process Efficiency",
    baseline: 68,
    target: 90,
    current: 78,
    unit: "%",
    owner: "P3",
    cadence: "Monthly",
    dueTerm: "Q3 2026",
    status: "watch",
    trend: 1,
    lastUpdated: "2026-05-16",
  },
  {
    id: "mos-6",
    priorityId: "sp-3",
    name: "Cost Reduction",
    baseline: 0,
    target: 15,
    current: 9,
    unit: "%",
    owner: "P3",
    cadence: "Monthly",
    dueTerm: "Q3 2026",
    status: "behind",
    trend: -2,
    lastUpdated: "2026-05-15",
  },
  {
    id: "mos-7",
    priorityId: "sp-4",
    name: "Validated Features Released",
    baseline: 3,
    target: 12,
    current: 8,
    unit: "features",
    owner: "P4",
    cadence: "Monthly",
    dueTerm: "Q4 2026",
    status: "on-track",
    trend: 4,
    lastUpdated: "2026-05-21",
  },
  {
    id: "mos-8",
    priorityId: "sp-4",
    name: "Pilot Adoption",
    baseline: 18,
    target: 45,
    current: 31,
    unit: "%",
    owner: "P4",
    cadence: "Biweekly",
    dueTerm: "Q4 2026",
    status: "watch",
    trend: 6,
    lastUpdated: "2026-05-23",
  },
]

export const activityPlans: ActivityPlan[] = [
  {
    id: "plan-1",
    title: "Enterprise Sales Sprint",
    description: "Run a focused account-based selling motion for top-value enterprise prospects.",
    priorityId: "sp-1",
    measureId: "mos-1",
    owner: "John D.",
    collaborators: ["Sarah M.", "P1"],
    term: "Q2 2026",
    startDate: "2026-04-01",
    dueDate: "2026-06-28",
    status: "in-progress",
    progress: 72,
    risk: "medium",
    nextMilestone: "Pipeline review with sales leads",
    reviewRequired: false,
    budget: "120K",
    lastUpdated: "2026-05-26",
  },
  {
    id: "plan-2",
    title: "Partner Channel Launch",
    description: "Activate three partner channels with packaged offers and referral tracking.",
    priorityId: "sp-1",
    measureId: "mos-2",
    owner: "Sarah M.",
    collaborators: ["P1", "Finance"],
    term: "Q3 2026",
    startDate: "2026-06-15",
    dueDate: "2026-09-20",
    status: "upcoming",
    progress: 15,
    risk: "low",
    nextMilestone: "Finalize partner enablement kit",
    reviewRequired: false,
    budget: "85K",
    lastUpdated: "2026-05-19",
  },
  {
    id: "plan-3",
    title: "Service Recovery Loop",
    description: "Create a closed-loop workflow for detractor follow-up and service corrections.",
    priorityId: "sp-2",
    measureId: "mos-3",
    owner: "Mike R.",
    collaborators: ["Support Ops", "P2"],
    term: "Q2 2026",
    startDate: "2026-04-08",
    dueDate: "2026-06-18",
    status: "review",
    progress: 88,
    risk: "medium",
    nextMilestone: "Owner review for escalation rules",
    reviewRequired: true,
    budget: "40K",
    lastUpdated: "2026-05-25",
  },
  {
    id: "plan-4",
    title: "Renewal Health Dashboard",
    description: "Expose renewal risk signals and customer health scoring to account teams.",
    priorityId: "sp-2",
    measureId: "mos-4",
    owner: "Nadia K.",
    collaborators: ["Data Team", "P2"],
    term: "Q2 2026",
    startDate: "2026-04-15",
    dueDate: "2026-06-30",
    status: "in-progress",
    progress: 61,
    risk: "low",
    nextMilestone: "Complete health-score QA",
    reviewRequired: false,
    budget: "65K",
    lastUpdated: "2026-05-24",
  },
  {
    id: "plan-5",
    title: "Workflow Automation Phase 1",
    description: "Automate the highest-volume manual operations flows and measure cycle-time impact.",
    priorityId: "sp-3",
    measureId: "mos-5",
    owner: "Lisa K.",
    collaborators: ["Tom W.", "P3"],
    term: "Q2 2026",
    startDate: "2026-03-25",
    dueDate: "2026-06-25",
    status: "blocked",
    progress: 46,
    risk: "high",
    nextMilestone: "Resolve integration dependency",
    reviewRequired: true,
    budget: "150K",
    lastUpdated: "2026-05-22",
  },
  {
    id: "plan-6",
    title: "Vendor Cost Reset",
    description: "Renegotiate critical supplier agreements and standardize purchasing thresholds.",
    priorityId: "sp-3",
    measureId: "mos-6",
    owner: "Robert P.",
    collaborators: ["Procurement", "P3"],
    term: "Q3 2026",
    startDate: "2026-06-01",
    dueDate: "2026-08-18",
    status: "upcoming",
    progress: 20,
    risk: "medium",
    nextMilestone: "Complete supplier segmentation",
    reviewRequired: false,
    budget: "25K",
    lastUpdated: "2026-05-17",
  },
  {
    id: "plan-7",
    title: "Feature Validation Lab",
    description: "Run customer validation cycles for roadmap candidates before build commitment.",
    priorityId: "sp-4",
    measureId: "mos-7",
    owner: "David L.",
    collaborators: ["Research", "P4"],
    term: "Q2 2026",
    startDate: "2026-04-03",
    dueDate: "2026-06-12",
    status: "completed",
    progress: 100,
    risk: "low",
    nextMilestone: "Publish validation summary",
    reviewRequired: false,
    budget: "55K",
    lastUpdated: "2026-05-11",
  },
  {
    id: "plan-8",
    title: "Pilot Adoption Push",
    description: "Drive activation for pilot groups with guided onboarding and usage nudges.",
    priorityId: "sp-4",
    measureId: "mos-8",
    owner: "Amy S.",
    collaborators: ["Customer Success", "P4"],
    term: "Q2 2026",
    startDate: "2026-04-22",
    dueDate: "2026-06-27",
    status: "in-progress",
    progress: 58,
    risk: "medium",
    nextMilestone: "Launch adoption reminder sequence",
    reviewRequired: false,
    budget: "35K",
    lastUpdated: "2026-05-23",
  },
]

export function getMeasureProgress(measure: MeasureOfSuccess) {
  if (measure.target === measure.baseline) {
    return measure.current >= measure.target ? 100 : 0
  }

  return Math.max(
    0,
    Math.min(100, Math.round(((measure.current - measure.baseline) / (measure.target - measure.baseline)) * 100)),
  )
}

export function getPriorityProgress(priorityId: string) {
  const measures = measuresOfSuccess.filter((measure) => measure.priorityId === priorityId)

  if (!measures.length) {
    return 0
  }

  return Math.round(
    measures.reduce((total, measure) => total + getMeasureProgress(measure), 0) / measures.length,
  )
}

export function getPriorityMeasures(priorityId: string) {
  return measuresOfSuccess.filter((measure) => measure.priorityId === priorityId)
}

export function getPriorityPlans(priorityId: string) {
  return activityPlans.filter((plan) => plan.priorityId === priorityId)
}

export function getMeasurePlans(measureId: string) {
  return activityPlans.filter((plan) => plan.measureId === measureId)
}

export function getPriorityName(priorityId: string) {
  return strategicPriorities.find((priority) => priority.id === priorityId)?.name ?? "Unknown Priority"
}

export function getMeasureName(measureId: string) {
  return measuresOfSuccess.find((measure) => measure.id === measureId)?.name ?? "Unknown MoS"
}
