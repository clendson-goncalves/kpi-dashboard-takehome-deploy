import { create } from "zustand"
import type { KPI } from "../types/kpi"
import { kpiData } from "../data/mockData"
import { toast } from "sonner"

/**
 * Interface defining the state and actions for KPI management
 */
interface KPIState {
  /** List of all available KPIs */
  kpis: KPI[]
  /** Filtered list of KPIs based on search and category */
  filteredKpis: KPI[]
  /** Currently selected category filter */
  selectedCategory: string
  /** Current search query */
  searchQuery: string

  // Actions
  /** Updates the category filter and filters KPIs accordingly */
  setSelectedCategory: (category: string) => void
  /** Updates the search query and filters KPIs accordingly */
  setSearchQuery: (query: string) => void
  /** Requests access to a specific KPI */
  requestAccess: (kpiId: string, reason: string) => void
  /** Grants access to a specific KPI */
  grantAccess: (kpiId: string) => void
}

/**
 * Store for managing KPI state and operations
 * Handles KPI filtering, access requests, and access management
 */
export const useKpiStore = create<KPIState>((set, get) => ({
  // Initial state
  kpis: kpiData,
  filteredKpis: kpiData,
  selectedCategory: "all",
  searchQuery: "",

  /**
   * Updates category filter and filters KPIs based on category and existing search query
   * @param category - The category to filter by
   */
  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
    const { kpis, searchQuery } = get()

    const filtered = kpis.filter((kpi) => {
      const matchesCategory = category === "all" || kpi.category === category
      const matchesSearch =
        kpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kpi.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    set({ filteredKpis: filtered })
  },

  /**
   * Updates search query and filters KPIs based on query and existing category
   * @param query - The search query to filter by
   */
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    const { kpis, selectedCategory } = get()

    const filtered = kpis.filter((kpi) => {
      const matchesCategory = selectedCategory === "all" || kpi.category === selectedCategory
      const matchesSearch =
        kpi.name.toLowerCase().includes(query.toLowerCase()) ||
        kpi.description.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesSearch
    })

    set({ filteredKpis: filtered })
  },

  /**
   * Requests access to a KPI with a reason
   * In a real app, this would make an API call
   * @param kpiId - The ID of the KPI to request access for
   * @param reason - The reason for requesting access
   */
  requestAccess: (kpiId, reason) => {
    console.log(`Access requested for KPI ${kpiId} with reason: ${reason}`)
    setTimeout(() => {
      get().grantAccess(kpiId)
      toast.success("Access granted!", {
        description: "You can access the KPI and use it in your dashboard.",
        duration: 5000,
        position: "top-right",
      })
    }, 1000)
  },

  /**
   * Grants access to a specific KPI
   * Updates both the main KPIs list and filtered list
   * @param kpiId - The ID of the KPI to grant access to
   */
  grantAccess: (kpiId) => {
    set((state) => ({
      kpis: state.kpis.map((kpi) => (kpi.id === kpiId ? { ...kpi, hasAccess: true } : kpi)),
      filteredKpis: state.filteredKpis.map((kpi) => (kpi.id === kpiId ? { ...kpi, hasAccess: true } : kpi)),
    }))
  },
}))

