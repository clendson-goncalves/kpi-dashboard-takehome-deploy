import { create } from "zustand"
import type { ChartType, KPIVisualization, DashboardLayout } from "../types/kpi"
import { availableChartTypes } from "../data/mockData"

interface VisualizationState {
  selectedKpiId: string | null
  selectedChartType: ChartType | null
  currentLayout: DashboardLayout
  layouts: DashboardLayout[]
  annotations: Record<string, string[]>

  // Actions
  selectKpi: (kpiId: string) => void
  selectChartType: (chartType: ChartType) => void
  addToLayout: () => void
  removeFromLayout: (kpiId: string) => void
  updateVisualizationPosition: (
    kpiId: string,
    position: { x: number; y: number; width: number; height: number },
  ) => void
  addAnnotation: (kpiId: string, annotation: string) => void
  removeAnnotation: (kpiId: string, index: number) => void
  saveLayout: (name: string) => void
  loadLayout: (layoutId: string) => void
}

export const useVisualizationStore = create<VisualizationState>((set, get) => ({
  selectedKpiId: null,
  selectedChartType: null,
  currentLayout: {
    id: "default",
    name: "Default Layout",
    visualizations: [],
  },
  layouts: [],
  annotations: {},

  selectKpi: (kpiId) => {
    const chartTypes = availableChartTypes[kpiId] || []
    set({
      selectedKpiId: kpiId,
      selectedChartType: chartTypes.length > 0 ? chartTypes[0] : null,
    })
  },

  selectChartType: (chartType) => {
    set({ selectedChartType: chartType })
  },

  addToLayout: () => {
    const { selectedKpiId, selectedChartType, currentLayout } = get()

    if (!selectedKpiId || !selectedChartType) return

    // Check if KPI is already in layout
    const existingIndex = currentLayout.visualizations.findIndex((v) => v.kpiId === selectedKpiId)

    if (existingIndex !== -1) {
      // Update existing visualization
      set((state) => ({
        currentLayout: {
          ...state.currentLayout,
          visualizations: state.currentLayout.visualizations.map((vis, index) =>
            index === existingIndex ? { ...vis, chartConfig: { ...vis.chartConfig, type: selectedChartType } } : vis,
          ),
        },
      }))
    } else {
      // Add new visualization
      const newVisualization: KPIVisualization = {
        kpiId: selectedKpiId,
        chartConfig: {
          type: selectedChartType,
          title: `KPI Visualization`,
        },
        position: {
          x: 0,
          y: currentLayout.visualizations.length * 300, // Stack vertically
          width: 600,
          height: 300,
        },
      }

      set((state) => ({
        currentLayout: {
          ...state.currentLayout,
          visualizations: [...state.currentLayout.visualizations, newVisualization],
        },
      }))
    }
  },

  removeFromLayout: (kpiId) => {
    set((state) => ({
      currentLayout: {
        ...state.currentLayout,
        visualizations: state.currentLayout.visualizations.filter((v) => v.kpiId !== kpiId),
      },
    }))
  },

  updateVisualizationPosition: (kpiId, position) => {
    set((state) => ({
      currentLayout: {
        ...state.currentLayout,
        visualizations: state.currentLayout.visualizations.map((vis) =>
          vis.kpiId === kpiId ? { ...vis, position } : vis,
        ),
      },
    }))
  },

  addAnnotation: (kpiId, annotation) => {
    set((state) => {
      const currentAnnotations = state.annotations[kpiId] || []
      return {
        annotations: {
          ...state.annotations,
          [kpiId]: [...currentAnnotations, annotation],
        },
      }
    })
  },

  removeAnnotation: (kpiId, index) => {
    set((state) => {
      const currentAnnotations = state.annotations[kpiId] || []
      return {
        annotations: {
          ...state.annotations,
          [kpiId]: currentAnnotations.filter((_, i) => i !== index),
        },
      }
    })
  },

  saveLayout: (name) => {
    const { currentLayout } = get()
    const newLayout: DashboardLayout = {
      ...currentLayout,
      id: `layout-${Date.now()}`,
      name,
    }

    set((state) => ({
      layouts: [...state.layouts, newLayout],
      currentLayout: newLayout,
    }))
  },

  loadLayout: (layoutId) => {
    const { layouts } = get()
    const layout = layouts.find((l) => l.id === layoutId)
    if (layout) {
      set({ currentLayout: layout })
    }
  },
}))

