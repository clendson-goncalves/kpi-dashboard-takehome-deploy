import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Pharma KPI Dashboard</h1>
        <p className="text-muted-foreground">Monitor key performance indicators for pharmaceutical operations</p>
      </header>

      {children}
    </div>
  )
}

