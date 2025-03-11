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
  deleteLayout: (layoutId: string) => void
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
    const existingIndex = currentLayout.visualizations.findIndex((v: KPIVisualization) => v.kpiId === selectedKpiId)

    if (existingIndex !== -1) {
      // Update existing visualization
      set((state) => ({
        currentLayout: {
          ...state.currentLayout,
          visualizations: state.currentLayout.visualizations.map((vis: KPIVisualization, index: number) =>
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
        visualizations: state.currentLayout.visualizations.filter((v: KPIVisualization) => v.kpiId !== kpiId),
      },
    }))
  },

  updateVisualizationPosition: (kpiId, position) => {
    set((state) => ({
      currentLayout: {
        ...state.currentLayout,
        visualizations: state.currentLayout.visualizations.map((v: KPIVisualization) =>
          v.kpiId === kpiId ? { ...v, position } : v,
        ),
      },
    }))
  },

  addAnnotation: (kpiId, annotation) => {
    set((state) => ({
      annotations: {
        ...state.annotations,
        [kpiId]: [...(state.annotations[kpiId] || []), annotation],
      },
    }))
  },

  removeAnnotation: (kpiId, index) => {
    set((state) => ({
      annotations: {
        ...state.annotations,
        [kpiId]: state.annotations[kpiId].filter((_, i) => i !== index),
      },
    }))
  },

  saveLayout: (name) => {
    const { currentLayout } = get()
    const newLayout: DashboardLayout = {
      id: Date.now().toString(),
      name,
      visualizations: currentLayout.visualizations,
    }

    set((state) => ({
      layouts: [...state.layouts, newLayout],
      currentLayout: {
        id: "default",
        name: "Default Layout",
        visualizations: [],
      },
    }))
  },

  loadLayout: (layoutId) => {
    const { layouts } = get()
    const layout = layouts.find((l) => l.id === layoutId)
    if (layout) {
      set({ currentLayout: { ...layout } })
    }
  },

  deleteLayout: (layoutId) => {
    set((state) => ({
      layouts: state.layouts.filter((l) => l.id !== layoutId),
    }))
  },
}))

