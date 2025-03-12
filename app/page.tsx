"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPIList } from "@/components/kpi-selection/KPIList"
import { LayoutsView } from "@/components/layouts/LayoutsView"
import { Button } from "@/components/ui/button"
import { PackagePlus, Search } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/data/mockData"

export default function Home() {
  return (
    <div className="container mx-auto py-8 space-y-8 bg-slate-50">

      <div className="flex justify-end max-w-[1280px] mx-auto px-4 py-2">
        <Button
          variant="outline"
          size="sm"
          className="h-11 w-30 gap-2 bg-slate-500 text-white hover:bg-slate-700 border-0 rounded-md"
        >
          <PackagePlus className="h-4 w-4" />
          Request
        </Button>
      </div>

      <div className="mx-auto max-w-[768px]">
        <h1 className="text-5xl font-extrabold mx-auto py-2 text-center space-y-5">Library</h1>
        <p className="text-slate-700 text-center">
          Browse for assets needed to report and present analysis.
        </p>
      </div>

      <Tabs defaultValue="kpi" className="flex">
        <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4">
          <TabsTrigger value="featured" className="min-h-9">Featured</TabsTrigger>
          <TabsTrigger value="kpi" className="min-h-9">KPI</TabsTrigger>
          <TabsTrigger value="layouts" className="min-h-9">Layouts</TabsTrigger>
          <TabsTrigger value="storyboards" className="min-h-9">Storyboards</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="px-4 py-8 space-y-10">
          <div className="text-center text-muted-foreground py-8">
            Featured content coming soon
          </div>
        </TabsContent>

        <TabsContent value="kpi" className="px-4 py-8 space-y-10">
          <KPIList />
        </TabsContent>

        <TabsContent value="layouts" className="px-4 py-8 space-y-10">
          <LayoutsView />
        </TabsContent>

        <TabsContent value="storyboards" className="px-4 py-8 space-y-10">
          <div className="text-center text-muted-foreground py-8">
            Storyboards content coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

