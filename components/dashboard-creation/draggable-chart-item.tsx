"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useDrag } from "react-dnd"
import { Grip, X, Edit, Check } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { DashboardItem, Position } from "@/types/dashboard"
import ChartRenderer from "@/components/dashboard-creation/chart-renderer"
import { getKpiById } from "@/services/kpi-data"

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
  const [currentSize, setCurrentSize] = useState(item.size)
  const startResizePos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ width: 0, height: 0 })
  const itemRef = useRef<HTMLDivElement>(null)
  const kpi = getKpiById(item.kpiId)

  useEffect(() => {
    setTitle(item.title)
  }, [item.title])

  useEffect(() => {
    setCurrentSize(item.size)
  }, [item.size])

  // Configure drag behavior
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "DASHBOARD_ITEM",
      item: () => ({
        id: item.id,
        type: "move",
        originalPosition: item.position,
        width: item.size.width,
        height: item.size.height,
      }),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (draggedItem, monitor) => {
        const didDrop = monitor.didDrop()

        // If the item wasn't dropped in a valid drop target, we can handle it here
        if (!didDrop) {
          const clientOffset = monitor.getClientOffset()
          if (clientOffset) {
            const position = getGridPosition(clientOffset.x, clientOffset.y)
            onMove(item.id, position)
          }
        }
      },
    }),
    [item.id, item.position, item.size, onMove, getGridPosition],
  )

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setResizing(true)
    startResizePos.current = { x: e.clientX, y: e.clientY }
    startSize.current = { width: item.size.width, height: item.size.height }

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return

      // Calculate the delta in grid units (100px per grid unit)
      const deltaX = Math.floor((e.clientX - startResizePos.current.x) / 100)
      const deltaY = Math.floor((e.clientY - startResizePos.current.y) / 100)

      // Calculate new width and height, ensuring minimum size
      const newWidth = Math.max(1, startSize.current.width + deltaX)
      const newHeight = Math.max(1, startSize.current.height + deltaY)

      // Update local state for visual feedback during resize
      setCurrentSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      if (resizing) {
        // Only update if the size has actually changed
        if (currentSize.width !== item.size.width || currentSize.height !== item.size.height) {
          onResize(item.id, currentSize.width, currentSize.height)
        }
        setResizing(false)
      }

      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleTitleSubmit = () => {
    onUpdateTitle(item.id, title)
    setEditingTitle(false)
  }

  return (
    <div
      ref={dragPreview}
      className={`absolute transition-all ${isDragging ? "opacity-50 ring-2 ring-primary" : "opacity-100"}`}
      style={{
        left: `${item.position.x * 100}px`,
        top: `${item.position.y * 100}px`,
        width: `${currentSize.width * 100}px`,
        height: `${currentSize.height * 100}px`,
        zIndex: isDragging || resizing ? 100 : 1,
      }}
    >
      <Card className="w-full h-full overflow-hidden shadow-sm py-1">
        <CardHeader className="flex flex-row items-center px-2 bg-muted/10">
        <div className="flex flex-row p-0">
            <Button
              size="icon"
              variant="ghost"
              className="h-3 w-3 hover:bg-background hover:text-destructive"
              onClick={() => onRemove(item.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div ref={drag} className="flex-1 flex items-center cursor-move px-2" data-item-id={item.id}>
            <Grip className="h-4 w-4 text-muted-foreground" />
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 hover:bg-background"
              onClick={() => setEditingTitle(true)}
            >
              <Edit className="h-3 w-3" />
            </Button>

            {editingTitle ? (
              <div className="flex items-center space-x-1">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-7 text-xs"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTitleSubmit()
                  }}
                />
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleTitleSubmit}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-xs font-medium truncate">
                {item.title}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0 h-[calc(100%-32px)]">
          <ChartRenderer type={item.type} data={item.data} />
          <div
            className="absolute bottom-0 right-0 w-10 h-10 cursor-se-resize flex items-center justify-center bg-background/50 hover:bg-background/80 rounded-tl-md border-t border-l transition-colors"
            onMouseDown={handleResizeStart}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path
                d="M22 22L12 22M22 22L22 12M22 22L18.5 18.5M22 22L15 15M22 22L8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

