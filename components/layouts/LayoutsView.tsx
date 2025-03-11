"use client"

import { useState } from "react"
import { useVisualizationStore } from "@/store/visualizationStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Copy } from "lucide-react"
import { VisualizationLayout } from "@/components/kpi-selection/VisualizationLayout"
import type { KPIVisualization } from "@/types/kpi"

export function LayoutsView() {
  const { layouts, loadLayout, deleteLayout } = useVisualizationStore()
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  if (isCreatingNew) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Layout</h2>
          <Button variant="ghost" onClick={() => setIsCreatingNew(false)}>
            Back to Layouts
          </Button>
        </div>
        <VisualizationLayout onSave={() => setIsCreatingNew(false)} />
      </div>
    )
  }

  if (layouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-8">Create Your First Layout</h2>
        <Card className="w-full max-w-md">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Start by creating a new layout to visualize your KPIs</p>
              <Button onClick={() => setIsCreatingNew(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Layout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Layouts</h2>
        <Button onClick={() => setIsCreatingNew(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Layout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {layouts.map((layout) => (
          <Card key={layout.id} className="group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{layout.name}</CardTitle>
                  <CardDescription>
                    {layout.visualizations.length} visualizations
                  </CardDescription>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => loadLayout(layout.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteLayout(layout.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {layout.visualizations.slice(0, 4).map((vis) => (
                  <div
                    key={vis.kpiId}
                    className="aspect-video bg-muted rounded-md"
                  />
                ))}
              </div>
              {layout.visualizations.length > 4 && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  +{layout.visualizations.length - 4} more
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 