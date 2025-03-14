import { create } from "zustand"

interface VisualizationState {
  selectedKpiId: string | null
}

export const useVisualizationStore = create<VisualizationState>(() => ({
  selectedKpiId: null,
}))

