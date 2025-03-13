export const GRID_BASE_SIZE = 25 // Base grid size in pixels

// Derived grid configurations
export const GRID_CONFIG = {
  BASE_SIZE: GRID_BASE_SIZE,
  UNITS_PER_100PX: Math.floor(100 / GRID_BASE_SIZE), // How many grid units make up 100px
  MIN_CHART_SIZE: {
    WIDTH: Math.floor(100 / GRID_BASE_SIZE), // Minimum width in grid units (100px)
    HEIGHT: Math.floor(100 / GRID_BASE_SIZE), // Minimum height in grid units (100px)
  },
  COLUMNS: 32, // Number of columns in the grid
  ROWS: 24, // Default number of rows
} as const

// Helper functions for grid calculations
export const gridUtils = {
  toPixels: (units: number) => units * GRID_CONFIG.BASE_SIZE,
  toGridUnits: (pixels: number) => Math.floor(pixels / GRID_CONFIG.BASE_SIZE),
  snapToGrid: (value: number) => Math.floor(value / GRID_CONFIG.BASE_SIZE) * GRID_CONFIG.BASE_SIZE,
} 