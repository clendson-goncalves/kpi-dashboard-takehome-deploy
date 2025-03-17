"use client"

import { useRef, useCallback, useState } from "react"
import { useDrop } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import type { DashboardItem, Position, ChartType } from "@/types/dashboard"
import DraggableChartItem from "@/components/dashboard-creation/DraggableChartItem"
import { LayoutGrid } from "lucide-react"

// Grid configuration that will be used across components
export const GRID = {
  // Core settings
  SIZE: 10, // Base grid size in pixels
  MIN_CHART_WIDTH: 100, // Minimum chart width in pixels
  MIN_CHART_HEIGHT: 100, // Minimum chart height in pixels
  COLUMNS: 32, // Number of columns in the grid
  ROWS: 24, // Default number of rows

  // Derived settings
  get UNITS_PER_100PX() {
    return Math.floor(100 / this.SIZE)
  },
  get MIN_UNITS() {
    return Math.ceil(this.MIN_CHART_WIDTH / this.SIZE)
  },

  // Utility functions
  toPixels: function(units: number) {
    return units * this.SIZE
  },
  toGridUnits: function(pixels: number) {
    return Math.floor(pixels / this.SIZE)
  },
  snapToGrid: function(pixels: number) {
    return Math.round(pixels / this.SIZE) * this.SIZE
  },
  snapPositionToGrid: function(position: Position): Position {
    return {
      x: Math.max(0, Math.round(position.x)),
      y: Math.max(0, Math.round(position.y))
    }
  }
} as const

interface DashboardEditorProps {
  items: DashboardItem[]
  onUpdateItem: (item: DashboardItem) => void
  onRemoveItem: (id: string) => void
  onAddItem: (type: ChartType, kpiId: string, position: Position) => void
}

export default function DashboardEditor({ items, onUpdateItem, onRemoveItem, onAddItem }: DashboardEditorProps) {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [dropIndicator, setDropIndicator] = useState<Position | null>(null)

  // Calculate grid position from mouse coordinates
  const getGridPosition = useCallback((clientX: number, clientY: number): Position => {
    if (!gridRef.current) return { x: 0, y: 0 }

    const rect = gridRef.current.getBoundingClientRect()
    const x = Math.floor((clientX - rect.left) / GRID.SIZE)
    const y = Math.floor((clientY - rect.top) / GRID.SIZE)

    return GRID.snapPositionToGrid({ x, y })
  }, [])

  // Check if a position would cause a collision with existing items
  const checkCollision = useCallback(
    (position: Position, width: number, height: number, excludeId?: string): boolean => {
      return items.some((item) => {
        if (excludeId && item.id === excludeId) return false

        // Convert sizes to grid units for comparison
        const itemWidth = item.size.width * GRID.UNITS_PER_100PX
        const itemHeight = item.size.height * GRID.UNITS_PER_100PX
        const itemX = item.position.x
        const itemY = item.position.y

        return (
          position.x < itemX + itemWidth &&
          position.x + width > itemX &&
          position.y < itemY + itemHeight &&
          position.y + height > itemY
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
          const existingItem = items.find(i => i.id === item.id)
          if (!existingItem) return undefined

          // Check for collisions with other items
          const hasCollision = checkCollision(
            position,
            existingItem.size.width * GRID.UNITS_PER_100PX,
            existingItem.size.height * GRID.UNITS_PER_100PX,
            item.id
          )

          if (!hasCollision) {
            onUpdateItem({
              ...existingItem,
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
      const hasCollision = checkCollision(
        position,
        item.size.width * GRID.UNITS_PER_100PX,
        item.size.height * GRID.UNITS_PER_100PX,
        id
      )

      if (!hasCollision) {
        onUpdateItem({ ...item, position })
      }
    }
  }

  const handleResizeItem = (id: string, width: number, height: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      // Check for collisions with the new size
      const hasCollision = checkCollision(
        item.position,
        width * GRID.UNITS_PER_100PX,
        height * GRID.UNITS_PER_100PX,
        id
      )

      if (!hasCollision) {
        onUpdateItem({
          ...item,
          size: { width, height },
        })
      }
    }
  }

  const handleUpdateItemWrapper = (id: string, updates: Partial<DashboardItem>) => {
    const existingItem = items.find(item => item.id === id);
    if (existingItem) {
      onUpdateItem({ ...existingItem, ...updates });
    }
  };

  // Calculate grid dimensions based on items
  const calculateGridDimensions = () => {
    if (items.length === 0) return { 
      width: GRID.COLUMNS * GRID.SIZE, 
      height: GRID.ROWS * GRID.SIZE 
    }

    const maxY = Math.max(...items.map((item) => 
      item.position.y + item.size.height * GRID.UNITS_PER_100PX
    ))

    return {
      width: GRID.COLUMNS * GRID.SIZE,
      height: Math.max(GRID.ROWS * GRID.SIZE, GRID.toPixels(maxY + 1)),
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
            className="relative border border-dashed rounded-md overflow-auto bg-muted/5"
            style={{
              height: `${Math.max(600, height)}px`,
              width: `${width}px`,
              minWidth: '100%',
              maxWidth: '100%',
              backgroundSize: `${GRID.SIZE}px ${GRID.SIZE}px`,
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            }}
          >
            {/* Drop indicator */}
            {isOver && canDrop && dropIndicator && (
              <div
                className="absolute border-2 border-primary rounded-md pointer-events-none opacity-50 bg-primary/10"
                style={{
                  left: `${GRID.toPixels(dropIndicator.x)}px`,
                  top: `${GRID.toPixels(dropIndicator.y)}px`,
                  width: `${GRID.toPixels(2 * GRID.UNITS_PER_100PX)}px`,
                  height: `${GRID.toPixels(2 * GRID.UNITS_PER_100PX)}px`,
                }}
              />
            )}

            {items.map((item) => (
              <DraggableChartItem
                key={item.id}
                item={item}
                onMove={handleMoveItem}
                onResize={handleResizeItem}
                onUpdateItem={handleUpdateItemWrapper}
                onRemove={onRemoveItem}
                getGridPosition={getGridPosition}
                grid={GRID}
              />
            ))}
          </div>          
        )}
      </CardContent>
    </Card>
  )
} 