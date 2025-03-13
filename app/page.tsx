"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPIList } from "@/components/kpi-selection/KPIList"
import { useState } from "react"
import DashboardCreator from "@/components/dashboard-creation/DashboardCreator"
import LibraryHeader from "@/components/library-dashboard/LibraryHeader"

type TabType = "featured" | "kpi" | "layouts" | "storyboards"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("kpi")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="mx-auto bg-slate-50 w-full min-h-screen">
      <LibraryHeader 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      <div className="mx-auto max-w-[768px]">
        <div className="rounded-md px-4 py-3">
          <Tabs defaultValue="kpi" onValueChange={(value) => setActiveTab(value as TabType)}>
            <div className="flex justify-center items-center px-4 mb-6">
              <TabsList className="w-full rounded-md">
                <TabsTrigger value="featured" className="min-h-9">Featured</TabsTrigger>
                <TabsTrigger value="kpi" className="min-h-9">KPI</TabsTrigger>
                <TabsTrigger value="layouts" className="min-h-9">Layouts</TabsTrigger>
                <TabsTrigger value="storyboards" className="min-h-9">Storyboards</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured" className="px-4 py-8 space-y-10">
              <div className="text-center text-muted-foreground py-8">
                Featured content coming soon
              </div>
            </TabsContent>

            <TabsContent value="kpi" className="px-4 py-8 space-y-10">
              <KPIList searchQuery={searchQuery} selectedCategory={selectedCategory} />
            </TabsContent>

            <TabsContent value="layouts" className="px-4 py-0">
              <div className="text-center text-muted-foreground py-8">
                <DashboardCreator />
              </div>
            </TabsContent>

            <TabsContent value="storyboards" className="px-4 py-8 space-y-10">
              <div className="text-center text-muted-foreground py-8">
                Storyboards content coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
