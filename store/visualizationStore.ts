import { create } from "zustand"
import type { ChartType } from "../types/kpi"

interface VisualizationState {
  selectedKpiId: string | null
  selectedChartType: ChartType | null
  annotations: Record<string, string[]>

  // Actions
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

}))

