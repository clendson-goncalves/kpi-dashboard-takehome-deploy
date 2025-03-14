"use client"

import { PieChart } from "lucide-react"

export default function LibraryFeatured() {
    return (
        <div className="min-h-screen bg-slate-50 w-full">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-semibold text-slate-900 mb-1">Featured</h2>
                    <p className="text-slate-500 mb-12 text-sm">Curated top picks from this week</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 p-5 rounded-md">
                                        <PieChart className="h-11 w-11 text-slate-400 stroke-1" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">Item Name</h3>
                                        <p className="text-slate-700 text-sm max-w-[80%]">Short description of the item goes nicely here.</p>
                                        <p className="text-slate-400 text-xs mt-1">06/27/2024</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-semibold text-slate-900 mb-1">Trending</h2>
                    <p className="text-slate-500 mb-12 text-sm">Most popular by community</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 p-5 rounded-md">
                                        <PieChart className="h-11 w-11 text-slate-400 stroke-1" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">Item Name</h3>
                                        <p className="text-slate-700 text-sm max-w-[80%]">Short description of the item goes nicely here.</p>
                                        <p className="text-slate-400 text-xs mt-1">06/27/2024</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}           