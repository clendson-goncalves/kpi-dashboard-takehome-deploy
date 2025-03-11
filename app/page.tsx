"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPIList } from "@/components/kpi-selection/KPIList"
import { LayoutsView } from "@/components/layouts/LayoutsView"

export default function Home() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-center">Library</h1>
        <p className="text-center text-muted-foreground">
          Browse for assets needed to report and present analysis.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <Input
          type="search"
          placeholder="Type to search..."
          className="w-full"
        />
      </div>

      <Tabs defaultValue="kpi" className="w-full">
        <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="kpi">KPI</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
          <TabsTrigger value="storyboards">Storyboards</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="mt-6">
          <div className="text-center text-muted-foreground py-8">
            Featured content coming soon
          </div>
        </TabsContent>

        <TabsContent value="kpi" className="mt-6">
          <KPIList />
        </TabsContent>

        <TabsContent value="layouts" className="mt-6">
          <LayoutsView />
        </TabsContent>

        <TabsContent value="storyboards" className="mt-6">
          <div className="text-center text-muted-foreground py-8">
            Storyboards content coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

