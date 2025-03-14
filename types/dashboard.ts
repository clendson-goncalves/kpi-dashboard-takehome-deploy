/**
 * Available chart types for dashboard visualization
 * @type {string}
 */
export type ChartType = "bar" | "line" | "pie" 

/**
 * Position coordinates for dashboard items
 * @interface Position
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 */
export interface Position {
    x: number
    y: number
  }
  
  /**
   * Size dimensions for dashboard items
   * @interface Size
   * @property {number} width - Width in pixels
   * @property {number} height - Height in pixels
   */
  export interface Size {
    width: number
    height: number
  }
  
  /**
   * Dashboard item representing a chart or visualization
   * @interface DashboardItem
   * @property {string} id - Unique identifier
   * @property {ChartType} type - Type of chart
   * @property {string} title - Item title
   * @property {Position} position - Position on dashboard
   * @property {Size} size - Item dimensions
   * @property {string} kpiId - Associated KPI identifier
   * @property {any} data - Chart data
   * @property {string} [comment] - Optional comment
   */
  export interface DashboardItem {
    id: string
    type: ChartType
    title: string
    position: Position
    size: Size
    kpiId: string
    data: any
    comment?: string
  }
  
  /**
   * Dashboard layout configuration
   * @interface DashboardLayout
   * @property {string} id - Unique identifier
   * @property {string} name - Layout name
   * @property {DashboardItem[]} items - Array of dashboard items
   * @property {string} createdAt - Creation timestamp
   * @property {string} updatedAt - Last update timestamp
   */
  export interface DashboardLayout {
    id: string
    name: string
    items: DashboardItem[]
    createdAt: string
    updatedAt: string
  }
  
  