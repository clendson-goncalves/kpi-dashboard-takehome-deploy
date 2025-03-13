"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useDrag } from "react-dnd"
import type { DragSourceMonitor } from "react-dnd"
import { Grip, X, Edit, Check, Move, Expand } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { DashboardItem, Position } from "@/types/dashboard"
import ChartRenderer from "@/components/dashboard-creation/ChartRenderer"
import { kpiData } from "@/data/mockData"

const GRID_SIZE = 25 // Grid size in pixels
const MIN_WIDTH_UNITS = 4 // Minimum width in grid units (100px)
const MIN_HEIGHT_UNITS = 4 // Minimum height in grid units (100px)

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
    width: item.size.width * 4,
    height: item.size.height * 4
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
      width: item.size.width * 4,
      height: item.size.height * 4
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
      width: item.size.width * 4,
      height: item.size.height * 4
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return

      // Calculate the delta in grid units (25px per grid unit)
      const deltaX = Math.floor((e.clientX - startResizePos.current.x) / GRID_SIZE)
      const deltaY = Math.floor((e.clientY - startResizePos.current.y) / GRID_SIZE)

      // Calculate new width and height, ensuring minimum size
      const newWidth = Math.max(MIN_WIDTH_UNITS, startSize.current.width + deltaX)
      const newHeight = Math.max(MIN_HEIGHT_UNITS, startSize.current.height + deltaY)

      // Update local state for visual feedback during resize
      setCurrentSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      if (resizing) {
        // Convert back to 100px units when updating parent
        if (currentSize.width !== item.size.width * 4 || currentSize.height !== item.size.height * 4) {
          onResize(item.id, Math.floor(currentSize.width / 4), Math.floor(currentSize.height / 4))
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
        left: `${item.position.x * GRID_SIZE * 4}px`,
        top: `${item.position.y * GRID_SIZE * 4}px`,
        width: `${currentSize.width * GRID_SIZE}px`,
        height: `${currentSize.height * GRID_SIZE}px`,
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.2s',
        zIndex: resizing ? 100 : 1,
      }}
    >
      <Card className="w-full h-full relative gap-0 py-0 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div
            ref={dragRef}
            className="cursor-move flex items-center gap-2 flex-1 min-w-0"
          >
            <Grip className="h-4 w-4 text-muted-foreground/50" />
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
        <CardContent className="p-2 h-[calc(100%-40px)] bg-background/50">
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

