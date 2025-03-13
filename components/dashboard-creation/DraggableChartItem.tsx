"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useDrag } from "react-dnd"
import type { DragSourceMonitor } from "react-dnd"
import { Grip, X, Edit, Check } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { DashboardItem, Position } from "@/types/dashboard"
import ChartRenderer from "@/components/dashboard-creation/ChartRenderer"
import { kpiData } from "@/data/mockData"
import { GRID } from "@/components/dashboard-creation/DashboardEditor"

interface DraggableChartItemProps {
  item: DashboardItem
  onMove: (id: string, position: Position) => void
  onResize: (id: string, width: number, height: number) => void
  onUpdateTitle: (id: string, title: string) => void
  onRemove: (id: string) => void
  getGridPosition: (clientX: number, clientY: number) => Position
}

export default function DraggableChartItem({
  item,
  onMove,
  onResize,
  onUpdateTitle,
  onRemove,
  getGridPosition,
}: DraggableChartItemProps) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [resizing, setResizing] = useState(false)
  const [currentSize, setCurrentSize] = useState({
    width: item.size.width * GRID.UNITS_PER_100PX,
    height: item.size.height * GRID.UNITS_PER_100PX
  })
  const startResizePos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ width: 0, height: 0 })
  const itemRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const kpi = kpiData.find(k => k.id === item.kpiId)

  useEffect(() => {
    setTitle(item.title)
  }, [item.title])

  useEffect(() => {
    setCurrentSize({
      width: item.size.width * GRID.UNITS_PER_100PX,
      height: item.size.height * GRID.UNITS_PER_100PX
    })
  }, [item.size])

  const [{ isDragging }, drag] = useDrag<
    { id: string; type: string },
    void,
    { isDragging: boolean }
  >(() => ({
    type: "CHART",
    item: { id: item.id, type: item.type },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      const didDrop = monitor.didDrop()

      if (!didDrop && monitor.getClientOffset()) {
        const { x, y } = monitor.getClientOffset()!
        const position = getGridPosition(x, y)
        onMove(item.id, position)
      }
    }
  }), [onMove, getGridPosition])

  useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current)
    }
  }, [drag])

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setResizing(true)
    startResizePos.current = { x: e.clientX, y: e.clientY }
    startSize.current = {
      width: item.size.width * GRID.UNITS_PER_100PX,
      height: item.size.height * GRID.UNITS_PER_100PX
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return

      // Calculate the delta in grid units
      const deltaX = Math.floor((e.clientX - startResizePos.current.x) / GRID.SIZE)
      const deltaY = Math.floor((e.clientY - startResizePos.current.y) / GRID.SIZE)

      // Calculate new width and height in grid units, ensuring minimum size
      const newWidth = Math.max(GRID.MIN_UNITS, startSize.current.width + deltaX)
      const newHeight = Math.max(GRID.MIN_UNITS, startSize.current.height + deltaY)

      // Snap to grid
      const snappedWidth = Math.round(newWidth)
      const snappedHeight = Math.round(newHeight)

      // Update local state for visual feedback during resize
      setCurrentSize({ width: snappedWidth, height: snappedHeight })
    }

    const handleMouseUp = () => {
      if (resizing) {
        // Convert back to larger grid units when updating parent
        if (currentSize.width !== item.size.width * GRID.UNITS_PER_100PX || currentSize.height !== item.size.height * GRID.UNITS_PER_100PX) {
          onResize(
            item.id, 
            Math.floor(currentSize.width / GRID.UNITS_PER_100PX), 
            Math.floor(currentSize.height / GRID.UNITS_PER_100PX)
          )
        }
        setResizing(false)
      }

      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateTitle(item.id, title)
    setEditingTitle(false)
  }

  return (
    <div
      ref={itemRef}
      style={{
        position: 'absolute',
        left: `${GRID.toPixels(item.position.x)}px`,
        top: `${GRID.toPixels(item.position.y)}px`,
        width: `${GRID.toPixels(currentSize.width)}px`,
        height: `${GRID.toPixels(currentSize.height)}px`,
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.2s',
        zIndex: resizing ? 100 : 1,
      }}
    >
      <Card className="w-full h-full relative gap-0 py-0 bg-background/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center p-0 px-1 justify-between border-b">
          <div
            ref={dragRef}
            className="cursor-move flex items-center gap-2 flex-1 min-w-0"
          >
            <Grip className="h-4 w-4 text-muted-foreground" />
            {editingTitle ? (
              <form onSubmit={handleTitleSubmit} className="flex items-center gap-1 flex-1 min-w-0">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-6 text-xs bg-background"
                />
                <Button type="submit" size="icon" variant="ghost" className="h-6 w-6">
                  <Check className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="flex items-center flex-1 min-w-0 text-xs font-medium truncate">{title}</div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setEditingTitle(true)}
              size="icon"
              variant="ghost"
              className="h-6 w-6"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => onRemove(item.id)}
              size="icon"
              variant="ghost"
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2 h-[calc(100%-40px)] w-full bg-background/50">
          <ChartRenderer type={item.type} data={item.data} />
        </CardContent>
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground"
        >
          <svg
            viewBox="5 5 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7L17 17" />
            <path d="M17 7V17H7" />
          </svg>
        </div>
      </Card>
    </div>
  )
} 