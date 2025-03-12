"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPIList } from "@/components/kpi-selection/KPIList"
import { Button } from "@/components/ui/button"
import { PackagePlus, Search } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/data/mockData"

type TabType = "featured" | "kpi" | "layouts" | "storyboards"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("kpi")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="mx-auto bg-slate-50 w-full min-h-screen">

      <div className="flex justify-end max-w-[1280px] mx-auto px-4 py-2">
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-28 gap-2 bg-slate-500 text-white hover:bg-slate-700 border-0 rounded-md"
        >
          <PackagePlus className="h-4 w-4" />
          Request
        </Button>
      </div>

      <div className="mx-auto max-w-[768px]">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold mx-auto py-2 text-center space-y-5">Library</h1>
          <p className="text-slate-700 text-center">Browse for assets needed to report and present analysis.</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="relative w-full max-w-[560px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <Input
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex justify-center items-center bg-white text-slate-500">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

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

            <TabsContent value="layouts" className="px-4 py-8 space-y-10">
              <div className="text-center text-muted-foreground py-8">
                Layouts content coming soon
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
