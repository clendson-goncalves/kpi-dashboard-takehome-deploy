"use client"

import { useRef, useCallback, useState } from "react"
import { useDrop } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import type { DashboardItem, Position, ChartType } from "@/types/dashboard"
import DraggableChartItem from "@/components/dashboard-creation/draggable-chart-item"
import { LayoutGrid } from "lucide-react"

interface DashboardEditorProps {
  items: DashboardItem[]
  onUpdateItem: (item: DashboardItem) => void
  onRemoveItem: (id: string) => void
  onAddItem: (type: ChartType, kpiId: string, position: Position) => void
}

export default function DashboardEditor({ items, onUpdateItem, onRemoveItem, onAddItem }: DashboardEditorProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [dropIndicator, setDropIndicator] = useState<Position | null>(null)

  // Calculate grid position from mouse coordinates
  const getGridPosition = useCallback((clientX: number, clientY: number): Position => {
    if (!gridRef.current) return { x: 0, y: 0 }

    const rect = gridRef.current.getBoundingClientRect()
    const x = Math.floor((clientX - rect.left) / 100)
    const y = Math.floor((clientY - rect.top) / 100)

    return { x: Math.max(0, x), y: Math.max(0, y) }
  }, [])

  // Check if a position would cause a collision with existing items
  const checkCollision = useCallback(
    (position: Position, width: number, height: number, excludeId?: string): boolean => {
      return items.some((item) => {
        if (excludeId && item.id === excludeId) return false

        return (
          position.x < item.position.x + item.size.width &&
          position.x + width > item.position.x &&
          position.y < item.position.y + item.size.height &&
          position.y + height > item.position.y
        )
      })
    },
    [items],
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ["CHART", "DASHBOARD_ITEM"],
      hover: (item: any, monitor) => {
        const clientOffset = monitor.getClientOffset()
        if (clientOffset && gridRef.current) {
          const position = getGridPosition(clientOffset.x, clientOffset.y)
          setDropIndicator(position)
        }
      },
      drop: (item: any, monitor) => {
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset || !gridRef.current) return undefined

        const position = getGridPosition(clientOffset.x, clientOffset.y)

        // If it's a chart being added from the palette
        if (item.type && item.kpiId && !item.id) {
          onAddItem(item.type, item.kpiId, position)
          setDropIndicator(null)
          return { moved: true }
        }

        // If it's an existing chart being moved
        if (item.id) {
          const width = item.width || 2
          const height = item.height || 2

          // Check for collisions with other items
          const hasCollision = checkCollision(position, width, height, item.id)

          if (!hasCollision) {
            onUpdateItem({
              ...items.find((i) => i.id === item.id)!,
              position,
            })
          }

          setDropIndicator(null)
          return { moved: true }
        }

        return undefined
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [onAddItem, onUpdateItem, getGridPosition, items, checkCollision],
  )

  const handleMoveItem = (id: string, position: Position) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      // Check for collisions with other items
      const hasCollision = checkCollision(position, item.size.width, item.size.height, id)

      if (!hasCollision) {
        onUpdateItem({ ...item, position })
      }
    }
  }

  const handleResizeItem = (id: string, width: number, height: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      // Check for collisions with the new size
      const hasCollision = checkCollision(item.position, width, height, id)

      if (!hasCollision) {
        onUpdateItem({
          ...item,
          size: { width, height },
        })
      }
    }
  }

  const handleUpdateTitle = (id: string, title: string) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      onUpdateItem({ ...item, title })
    }
  }

  // Calculate grid dimensions based on items
  const calculateGridDimensions = () => {
    if (items.length === 0) return { width: 10, height: 6 } // Default size

    const maxX = Math.max(...items.map((item) => item.position.x + item.size.width))
    const maxY = Math.max(...items.map((item) => item.position.y + item.size.height))

    return {
      width: Math.max(10, maxX + 2), // Add some extra space
      height: Math.max(6, maxY + 2),
    }
  }

  const { width, height } = calculateGridDimensions()

  return (
    <Card className="border-0 p-0 shadow-none">
      <CardContent className="border-0 p-0">
        {items.length === 0 ? (
          <div
            ref={(el) => {
              drop(el)
              gridRef.current = el
            }}
            className="flex flex-col items-center justify-center h-[600px] shadow-none text-center border-2 border-dashed rounded-md bg-muted/10"
          >
            <LayoutGrid className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">Your dashboard is empty</h3>
            <p className="text-xs text-muted-foreground w-1/2">
              Select a KPI from the left panel, drag and drop chart types to visualize your data.
            </p>
          </div>
        ) : (
          <div
            ref={(el) => {
              drop(el)
              gridRef.current = el
            }}
            className="relative w-full border border-dashed rounded-md overflow-auto bg-muted/5"
            style={{
              height: `${Math.max(600, height * 100)}px`,
              width: `${width * 100}px`,
              backgroundSize: "100px 100px",
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            }}
          >
            {/* Drop indicator */}
            {isOver && canDrop && dropIndicator && (
              <div
                className="absolute border-2 border-primary rounded-md pointer-events-none opacity-50 bg-primary/10"
                style={{
                  left: `${dropIndicator.x * 100}px`,
                  top: `${dropIndicator.y * 100}px`,
                  width: "200px",
                  height: "200px",
                }}
              />
            )}

            {items.map((item) => (
              <DraggableChartItem
                key={item.id}
                item={item}
                onMove={handleMoveItem}
                onResize={handleResizeItem}
                onUpdateTitle={handleUpdateTitle}
                onRemove={onRemoveItem}
                getGridPosition={getGridPosition}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

