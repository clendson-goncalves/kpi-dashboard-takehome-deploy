import { create } from "zustand"

/**
 * Interface defining the state shape for visualization management
 */
interface VisualizationState {
  /** Currently selected KPI identifier */
  selectedKpiId: string | null
}

/**
 * Store for managing visualization state
 * Handles the selected KPI state across components
 */
export const useVisualizationStore = create<VisualizationState>(() => ({
  selectedKpiId: null,
}))

