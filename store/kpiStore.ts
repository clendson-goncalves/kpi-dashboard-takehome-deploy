import { create } from "zustand"
import type { KPI } from "../types/kpi"
import { kpiData } from "../data/mockData"

interface KPIState {
  kpis: KPI[]
  filteredKpis: KPI[]
  selectedCategory: string
  searchQuery: string

  // Actions
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  requestAccess: (kpiId: string, reason: string) => void
  grantAccess: (kpiId: string) => void
}

export const useKpiStore = create<KPIState>((set, get) => ({
  kpis: kpiData,
  filteredKpis: kpiData,
  selectedCategory: "all",
  searchQuery: "",

  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
    const { kpis, searchQuery } = get()

    // Filter KPIs based on category and search query
    const filtered = kpis.filter((kpi) => {
      const matchesCategory = category === "all" || kpi.category === category
      const matchesSearch =
        kpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kpi.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    set({ filteredKpis: filtered })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    const { kpis, selectedCategory } = get()

    // Filter KPIs based on category and search query
    const filtered = kpis.filter((kpi) => {
      const matchesCategory = selectedCategory === "all" || kpi.category === selectedCategory
      const matchesSearch =
        kpi.name.toLowerCase().includes(query.toLowerCase()) ||
        kpi.description.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesSearch
    })

    set({ filteredKpis: filtered })
  },

  requestAccess: (kpiId, reason) => {
    // In a real app, this would send a request to the server
    console.log(`Access requested for KPI ${kpiId} with reason: ${reason}`)
    // For demo purposes, we'll automatically grant access after a request
    setTimeout(() => {
      get().grantAccess(kpiId)
    }, 2000)
  },

  grantAccess: (kpiId) => {
    set((state) => ({
      kpis: state.kpis.map((kpi) => (kpi.id === kpiId ? { ...kpi, hasAccess: true } : kpi)),
      filteredKpis: state.filteredKpis.map((kpi) => (kpi.id === kpiId ? { ...kpi, hasAccess: true } : kpi)),
    }))
  },
}))

