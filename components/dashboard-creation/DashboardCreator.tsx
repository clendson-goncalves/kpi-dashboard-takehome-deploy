"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import DashboardEditor from "@/components/dashboard-creation/DashboardEditor"
import ChartPalette from "@/components/dashboard-creation/ChartPalette"
import SavedLayouts from "@/components/dashboard-creation/SavedLayouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Save } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { ChartType, DashboardItem, DashboardLayout, Position } from "@/types/dashboard"
import { kpiData, mockChartData } from "@/data/mockData"

/**
 * DashboardCreator component
 * Main component for creating and managing KPI dashboards
 * Handles chart placement, layout management, and dashboard interactions
 */
export default function DashboardCreator() {
  // Dashboard state
  const [items, setItems] = useState<DashboardItem[]>([])
  const [layouts, setLayouts] = useState<DashboardLayout[]>([])
  const [currentLayout, setCurrentLayout] = useState<DashboardLayout | null>(null)
  const [layoutName, setLayoutName] = useState("New Dashboard")
  const [showNewLayoutConfirm, setShowNewLayoutConfirm] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  /**
   * Finds the next available position in the grid for a new chart
   * Avoids overlapping with existing charts
   */
  const findNextAvailablePosition = (): Position => {
    if (items.length === 0) return { x: 0, y: 0 }

    const occupiedPositions = new Set<string>()
    items.forEach((item) => {
      for (let x = item.position.x; x < item.position.x + item.size.width; x++) {
        for (let y = item.position.y; y < item.position.y + item.size.height; y++) {
          occupiedPositions.add(`${x},${y}`)
        }
      }
    })

    const maxY = Math.max(...items.map((item) => item.position.y + item.size.height))

    for (let x = 0; x < 10; x++) {
      if (!occupiedPositions.has(`${x},${maxY}`)) {
        return { x, y: maxY }
      }
    }

    return { x: 0, y: maxY + 1 }
  }

  /**
   * Checks if a chart position would collide with existing charts
   * @param position - The position to check
   * @param width - Width of the chart
   * @param height - Height of the chart
   * @param excludeId - ID of the chart to exclude from collision check
   */
  const checkCollision = (
    position: Position,
    width: number,
    height: number,
    excludeId: string
  ): boolean => {
    const otherItems = items.filter((item) => item.id !== excludeId)
    return otherItems.some((item) => {
      return (
        position.x < item.position.x + item.size.width &&
        position.x + width > item.position.x &&
        position.y < item.position.y + item.size.height &&
        position.y + height > item.position.y
      )
    })
  }

  /**
   * Adds a new chart to the dashboard
   * @param type - Type of chart to add
   * @param kpiId - ID of the KPI to visualize
   */
  const handleAddChart = (type: ChartType, kpiId: string) => {
    const kpi = kpiData.find(k => k.id === kpiId)
    if (!kpi) return

    const chartData = mockChartData[kpiId as keyof typeof mockChartData]
    if (!chartData) return

    const position = findNextAvailablePosition()
    const data = getChartData(type, chartData)

    const newItem: DashboardItem = {
      id: `item-${Date.now()}`,
      type,
      position,
      size: { width: 2, height: 2 },
      title: `${kpi.name} (${type})`,
      kpiId,
      data,
      comment: "",
    }

    setItems([...items, newItem])
    setHasUnsavedChanges(true)
  }

  /**
   * Gets the appropriate data for a chart type
   * @param type - Type of chart
   * @param chartData - Available chart data
   */
  const getChartData = (type: ChartType, chartData: any) => {
    switch (type) {
      case "line": return chartData.lineData || []
      case "bar": return chartData.barData || []
      case "pie": return chartData.pieData || []
      default: return []
    }
  }

  /**
   * Adds a new chart at a specific position
   * @param type - Type of chart to add
   * @param kpiId - ID of the KPI to visualize
   * @param position - Position to place the chart
   */
  const handleAddChartAtPosition = (type: ChartType, kpiId: string, position: Position) => {
    const kpi = kpiData.find(k => k.id === kpiId)
    if (!kpi) return

    const chartData = mockChartData[kpiId as keyof typeof mockChartData]
    if (!chartData) return

    const isOccupied = items.some((item) => {
      return (
        position.x < item.position.x + item.size.width &&
        position.x + 2 > item.position.x &&
        position.y < item.position.y + item.size.height &&
        position.y + 2 > item.position.y
      )
    })

    const finalPosition = isOccupied ? findNextAvailablePosition() : position
    const data = getChartData(type, chartData)

    const newItem: DashboardItem = {
      id: `item-${Date.now()}`,
      type,
      position: finalPosition,
      size: { width: 2, height: 2 },
      title: `${kpi.name} (${type})`,
      kpiId,
      data,
    }

    setItems([...items, newItem])
    setHasUnsavedChanges(true)
  }

  /**
   * Updates an existing chart's properties
   * @param updatedItem - The updated chart item
   */
  const handleUpdateItem = (updatedItem: DashboardItem) => {
    const hasCollision = checkCollision(
      updatedItem.position,
      updatedItem.size.width,
      updatedItem.size.height,
      updatedItem.id
    )

    if (!hasCollision) {
      setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
      setHasUnsavedChanges(true)
    }
  }

  /**
   * Removes a chart from the dashboard
   * @param id - ID of the chart to remove
   */
  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    setHasUnsavedChanges(true)
  }

  /**
   * Saves the current dashboard layout
   */
  const handleSaveLayout = () => {
    if (!layoutName.trim()) return

    const newLayout: DashboardLayout = {
      id: currentLayout?.id || `layout-${Date.now()}`,
      name: layoutName,
      items: [...items],
      createdAt: currentLayout?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedLayouts = currentLayout
      ? layouts.map((layout) => (layout.id === currentLayout.id ? newLayout : layout))
      : [...layouts, newLayout]

    setLayouts(updatedLayouts)
    setCurrentLayout(newLayout)
    setHasUnsavedChanges(false)
  }

  /**
   * Loads a saved dashboard layout
   * @param layout - The layout to load
   */
  const handleLoadLayout = (layout: DashboardLayout) => {
    if (hasUnsavedChanges) {
      setShowNewLayoutConfirm(true)
      sessionStorage.setItem("layout-to-load", JSON.stringify(layout))
    } else {
      loadLayout(layout)
    }
  }

  /**
   * Applies a layout to the dashboard
   * @param layout - The layout to apply
   */
  const loadLayout = (layout: DashboardLayout) => {
    setItems([...layout.items])
    setCurrentLayout(layout)
    setLayoutName(layout.name)
    setHasUnsavedChanges(false)
  }

  /**
   * Initiates creation of a new layout
   */
  const handleNewLayout = () => {
    if (hasUnsavedChanges) {
      setShowNewLayoutConfirm(true)
    } else {
      resetLayout()
    }
  }

  /**
   * Resets the dashboard to its initial state
   */
  const resetLayout = () => {
    setItems([])
    setCurrentLayout(null)
    setLayoutName("New Dashboard")
    setHasUnsavedChanges(false)
  }

  const handleConfirmAction = () => {
    // Check if we have a layout to load
    const layoutToLoad = sessionStorage.getItem("layout-to-load")

    if (layoutToLoad) {
      loadLayout(JSON.parse(layoutToLoad))
      sessionStorage.removeItem("layout-to-load")
    } else {
      resetLayout()
    }

    setShowNewLayoutConfirm(false)
  }

  const handleDeleteLayout = (layoutId: string) => {
    const updatedLayouts = layouts.filter((layout) => layout.id !== layoutId)
    setLayouts(updatedLayouts)

    if (currentLayout?.id === layoutId) {
      resetLayout()
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="shadow-lg border-slate-200">
        <CardContent className="px-4">
          <div className="space-y-2">
            {/* Dashboard Header */}
            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <div className="flex text-4xl">
                  <Input
                    value={layoutName}
                    onChange={(e) => setLayoutName(e.target.value)}
                    className="text-2xl font-semibold h-auto py-1 px-2 bg-transparent border-0 border-b border-slate-200 focus-visible:border-input focus-visible:ring-0 rounded-none"
                    placeholder="Dashboard Title"
                  />
                  {hasUnsavedChanges && (
                    <Badge variant="outline" className="text-[10px] font-bold h-6 bg-slate-50 hover:bg-slate-50 text-slate-700">
                      Unsaved
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleNewLayout}
                  disabled={items.length === 0 && !currentLayout}
                  className="gap-1 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Plus className="h-4 w-4" /> New
                </Button>
                <Button onClick={handleSaveLayout} className=" bg-slate-500 text-white hover:bg-slate-700 hover:text-white gap-1">
                  <Save className="h-4 w-4 " /> Save
                </Button>
              </div>
            </div>

            {/* Dashboard Editor Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 ">
              <div className="lg:col-span-1">
                <ChartPalette onAddChart={handleAddChart} />
              </div>
              <div className="lg:col-span-3">
                <DashboardEditor
                  items={items}
                  onUpdateItem={handleUpdateItem}
                  onRemoveItem={handleRemoveItem}
                  onAddItem={handleAddChartAtPosition}
                />
              </div>
            </div>

            {/* Saved Layouts Section */}
            <div className="mt-4">
              <SavedLayouts layouts={layouts} onLoadLayout={handleLoadLayout} onDeleteLayout={handleDeleteLayout} />
            </div>

            <AlertDialog open={showNewLayoutConfirm} onOpenChange={setShowNewLayoutConfirm}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes in your current dashboard. Proceeding will discard these changes. Do you
                    want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => sessionStorage.removeItem("layout-to-load")}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction>
                    Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  )
}
