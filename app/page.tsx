"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { KPIList } from "@/components/kpi-selection/KPIList"
import { ChartSelector } from "@/components/chart-visualization/ChartSelector"
import { ChartVisualization } from "@/components/chart-visualization/ChartVisualization"
import { AccessRequestForm } from "@/components/access-request/AcessRequestForm"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function Home() {
  return (
    <DashboardLayout>
      <Tabs defaultValue="kpi-selection">
        <TabsContent value="kpi-selection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <KPIList />
            </div>
            <div className="lg:col-span-1">
              <ChartSelector />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visualization">
          <ChartVisualization />
        </TabsContent>

        <TabsContent value="access-request">
          <AccessRequestForm />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

