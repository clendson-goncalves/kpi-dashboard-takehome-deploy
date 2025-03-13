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

export default function DashboardCreator() {
  const [items, setItems] = useState<DashboardItem[]>([])
  const [layouts, setLayouts] = useState<DashboardLayout[]>([])
  const [currentLayout, setCurrentLayout] = useState<DashboardLayout | null>(null)
  const [layoutName, setLayoutName] = useState("New Dashboard")
  const [showNewLayoutConfirm, setShowNewLayoutConfirm] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Find the next available position in the grid
  const findNextAvailablePosition = (): Position => {
    if (items.length === 0) return { x: 0, y: 0 }

    // Find all occupied positions
    const occupiedPositions = new Set<string>()
    items.forEach((item) => {
      for (let x = item.position.x; x < item.position.x + item.size.width; x++) {
        for (let y = item.position.y; y < item.position.y + item.size.height; y++) {
          occupiedPositions.add(`${x},${y}`)
        }
      }
    })

    // Find the bottom-most item
    const maxY = Math.max(...items.map((item) => item.position.y + item.size.height))

    // Try positions at the next row
    for (let x = 0; x < 10; x++) {
      if (!occupiedPositions.has(`${x},${maxY}`)) {
        return { x, y: maxY }
      }
    }

    // If all positions in the next row are occupied, place at the beginning of the row after
    return { x: 0, y: maxY + 1 }
  }

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

  const handleAddChart = (type: ChartType, kpiId: string) => {
    const kpi = kpiData.find(k => k.id === kpiId)
    if (!kpi) return

    const chartData = mockChartData[kpiId as keyof typeof mockChartData]
    if (!chartData) return

    const position = findNextAvailablePosition()

    let data: any[] = []
    switch (type) {
      case "line":
        data = chartData.lineData || []
        break
      case "bar":
        data = chartData.barData || []
        break
      case "pie":
        data = chartData.pieData || []
        break
      default:
        data = []
    }

    const newItem: DashboardItem = {
      id: `item-${Date.now()}`,
      type,
      position,
      size: { width: 2, height: 2 },
      title: `${kpi.name} (${type})`,
      kpiId,
      data,
    }

    setItems([...items, newItem])
    setHasUnsavedChanges(true)
  }

  const handleAddChartAtPosition = (type: ChartType, kpiId: string, position: Position) => {
    const kpi = kpiData.find(k => k.id === kpiId)
    if (!kpi) return

    const chartData = mockChartData[kpiId as keyof typeof mockChartData]
    if (!chartData) return

    // Check if position is already occupied
    const isOccupied = items.some((item) => {
      return (
        position.x < item.position.x + item.size.width &&
        position.x + 2 > item.position.x &&
        position.y < item.position.y + item.size.height &&
        position.y + 2 > item.position.y
      )
    })

    // If occupied, find next available position
    const finalPosition = isOccupied ? findNextAvailablePosition() : position

    let data: any[] = []
    switch (type) {
      case "line":
        data = chartData.lineData || []
        break
      case "bar":
        data = chartData.barData || []
        break
      case "pie":
        data = chartData.pieData || []
        break
      default:
        data = []
    }

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

  const handleUpdateItem = (updatedItem: DashboardItem) => {
    const hasCollision = checkCollision(
      updatedItem.position,
      updatedItem.size.width,
      updatedItem.size.height,
      updatedItem.id
    )

    if (hasCollision) {
      // If there's a collision, don't update the position/size
      return
    }

    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setHasUnsavedChanges(true)
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    setHasUnsavedChanges(true)
  }

  const handleSaveLayout = () => {
    if (!layoutName.trim()) {
      return
    }

    const newLayout: DashboardLayout = {
      id: currentLayout?.id || `layout-${Date.now()}`,
      name: layoutName,
      items: [...items],
      createdAt: currentLayout?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    let updatedLayouts: DashboardLayout[]

    if (currentLayout) {
      updatedLayouts = layouts.map((layout) => (layout.id === currentLayout.id ? newLayout : layout))
    } else {
      updatedLayouts = [...layouts, newLayout]
    }

    setLayouts(updatedLayouts)
    setCurrentLayout(newLayout)
    setHasUnsavedChanges(false)
  }

  const handleLoadLayout = (layout: DashboardLayout) => {
    if (hasUnsavedChanges) {
      // Ask for confirmation before loading a different layout
      setShowNewLayoutConfirm(true)
      // Store the layout to load after confirmation
      sessionStorage.setItem("layout-to-load", JSON.stringify(layout))
    } else {
      loadLayout(layout)
    }
  }

  const loadLayout = (layout: DashboardLayout) => {
    setItems([...layout.items])
    setCurrentLayout(layout)
    setLayoutName(layout.name)
    setHasUnsavedChanges(false)
  }

  const handleNewLayout = () => {
    if (hasUnsavedChanges) {
      setShowNewLayoutConfirm(true)
    } else {
      resetLayout()
    }
  }

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
                    <Badge variant="secondary" className="align-middle">
                      Unsaved
                    </Badge>
                  )}
                </div>
                {currentLayout && (
                  <div className="flex mt-1 text-[10px] text-muted-foreground justify-start pl-2">Last updated: {new Date(currentLayout.updatedAt).toLocaleString()}</div>
                )}
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
