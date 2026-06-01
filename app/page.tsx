"use client"

import { useState } from "react"
import { Sidebar } from "@/components/aop/sidebar"
import { Header } from "@/components/aop/header"
import { Dashboard } from "@/components/aop/dashboard"
import { PlansSection } from "@/components/aop/plans"
// import { create } from "@/components/aop/mos-create"
import { AOPConfigSection } from "@/components/aop/aop-config"
import { StrategicPrioritiesSection } from "@/components/aop/strategic-priorities"
import { ActivitiesSection } from "@/components/aop/activities"
import { LeadsSection } from "@/components/aop/leads"
import { Measure } from "@/components/aop/measure-success"
import { DataVisibilitySection } from "@/components/aop/data-visibility"
import { NotificationsSection } from "@/components/aop/notifications"
import { ReportsSection } from "@/components/aop/reports"
import { SupervisorDashboard } from "@/components/aop/supervisor-dashboard"

export default function AOPDashboard() {
  const [userRole, setUserRole] = useState<"owner" | "lead" | "supervisor">("owner")
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    console.log(activeSection);

    // Handle role-specific sections
    if (userRole === "supervisor") {
      switch (activeSection) {
        case "dashboard":
          return <Dashboard userRole={userRole} />
        case "subordinates":
          return <SupervisorDashboard />
        case "activities":
          return <ActivitiesSection userRole={userRole} viewType="all" />
        case "plans":
          return <PlansSection userRole={userRole} viewType={"all"}/>
        case "notifications":
          return <NotificationsSection />
        default:
          return <Dashboard userRole={userRole} />
      }
    }

    if (userRole === "lead") {
      switch (activeSection) {
        case "dashboard":
          return <Dashboard userRole={userRole} />
        case "my-mos":
          return <Measure />
        case "my-activities":
          return <ActivitiesSection userRole={userRole} viewType="my" />
        case "plans":
          return <PlansSection userRole={userRole} viewType={"all"}/>
        case "notifications":
          return <NotificationsSection />
        default:
          return <Dashboard userRole={userRole} />
      }
    }

    // Owner sections
    switch (activeSection) {
      case "dashboard":
        return <Dashboard userRole={userRole} />
      case "config":
        return <AOPConfigSection />
      case "priorities":
        return <StrategicPrioritiesSection />
      case "mos":
        return <Measure />
      case "activities":
        return <ActivitiesSection userRole={userRole} viewType="all" />
      case "plans":
        return <PlansSection userRole={userRole} viewType={"all"}/>
      case "leads":
        return <LeadsSection />
      case "visibility":
        return <DataVisibilitySection />
      case "notifications":
        return <NotificationsSection />
      case "reports":
        return <ReportsSection />
      default:
        return <Dashboard userRole={userRole} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userRole={userRole}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userRole={userRole} onRoleChange={setUserRole} />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
