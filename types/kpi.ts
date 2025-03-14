/**
 * Access level type for KPIs
 * @type {string}
 */
export type AccessLevel = "public" | "restricted"

/**
 * Color palette for chart visualizations
 * @constant
 */
export const COLORS = ["#091E42", "#0057B8", "#63AEE8", "#5B2C6F", "#B0BEC5"]

/**
 * Data point structure for line charts
 * @interface LineDataPoint
 * @property {string} [month] - Month label
 * @property {string} [quarter] - Quarter label
 * @property {string} [year] - Year label
 * @property {number} [value] - Generic value
 * @property {number} [success] - Success rate
 * @property {number} [efficiency] - Efficiency metric
 * @property {number} [share] - Share percentage
 */
export interface LineDataPoint {
  month?: string
  quarter?: string
  year?: string
  value?: number
  success?: number
  efficiency?: number
  share?: number
}

/**
 * Data point structure for bar charts
 * @interface BarDataPoint
 * @property {string} [area] - Business area
 * @property {string} [phase] - Project phase
 * @property {string} [region] - Geographic region
 * @property {string} [metric] - Metric name
 * @property {number} value - Numeric value
 * @property {number} [count] - Count metric
 * @property {number} [share] - Share percentage
 */
export interface BarDataPoint {
  area?: string
  phase?: string
  region?: string
  metric?: string
  value: number
  count?: number
  share?: number
}

/**
 * Data point structure for pie charts
 * @interface PieDataPoint
 * @property {string} [area] - Business area
 * @property {string} [region] - Geographic region
 * @property {string} [competitor] - Competitor name
 * @property {number} value - Numeric value
 * @property {number} [count] - Count metric
 * @property {number} [share] - Share percentage
 */
export interface PieDataPoint {
  area?: string
  region?: string
  competitor?: string
  value: number
  count?: number
  share?: number
}

/**
 * Combined chart data structure
 * @interface ChartData
 * @property {LineDataPoint[]} [lineData] - Data for line charts
 * @property {BarDataPoint[]} [barData] - Data for bar charts
 * @property {PieDataPoint[]} [pieData] - Data for pie charts
 */
export interface ChartData {
  lineData?: LineDataPoint[]
  barData?: BarDataPoint[]
  pieData?: PieDataPoint[]
}

/**
 * KPI data structure
 * @interface KPI
 * @property {string} id - Unique identifier
 * @property {string} name - KPI name
 * @property {string} description - Detailed description
 * @property {string} category - KPI category
 * @property {AccessLevel} accessLevel - Access level (public/restricted)
 * @property {number} target - Target value
 * @property {string[]} keyQuestions - Business questions addressed
 * @property {string[]} dataSources - Data sources used
 * @property {string} calculation - Calculation methodology
 * @property {string} industryContext - Industry context and relevance
 * @property {boolean} hasAccess - User access flag
 */
export interface KPI {
  id: string
  name: string
  description: string
  category: string
  accessLevel: AccessLevel
  target: number
  keyQuestions: string[]
  dataSources: string[]
  calculation: string
  industryContext: string
  hasAccess: boolean
}